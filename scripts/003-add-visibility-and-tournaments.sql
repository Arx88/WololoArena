-- Add visibility to lobbies and drafts
ALTER TABLE public.lobbies ADD COLUMN IF NOT EXISTS visibility TEXT NOT NULL DEFAULT 'private' CHECK (visibility IN ('public', 'private'));

-- Add spectator tracking
ALTER TABLE public.drafts ADD COLUMN IF NOT EXISTS final_map TEXT;
ALTER TABLE public.drafts ADD COLUMN IF NOT EXISTS host_home_map TEXT;
ALTER TABLE public.drafts ADD COLUMN IF NOT EXISTS guest_home_map TEXT;

-- Spectators table
CREATE TABLE IF NOT EXISTS public.draft_spectators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  draft_id UUID NOT NULL REFERENCES public.drafts(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  last_seen TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(draft_id, session_id)
);

-- Tournaments table
CREATE TABLE IF NOT EXISTS public.tournaments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  format TEXT NOT NULL DEFAULT 'single_elimination' CHECK (format IN ('single_elimination', 'double_elimination', 'round_robin', 'swiss')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'registration', 'in_progress', 'completed', 'cancelled')),
  visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'private')),
  max_participants INT DEFAULT 8,
  settings JSONB NOT NULL DEFAULT '{}',
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tournament admins
CREATE TABLE IF NOT EXISTS public.tournament_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID NOT NULL REFERENCES public.tournaments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('owner', 'admin', 'moderator')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tournament_id, user_id)
);

-- Tournament participants
CREATE TABLE IF NOT EXISTS public.tournament_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID NOT NULL REFERENCES public.tournaments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  seed INT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'eliminated', 'winner')),
  invited_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tournament_id, user_id)
);

-- Tournament matches (brackets)
CREATE TABLE IF NOT EXISTS public.tournament_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID NOT NULL REFERENCES public.tournaments(id) ON DELETE CASCADE,
  round INT NOT NULL,
  match_number INT NOT NULL,
  bracket_type TEXT DEFAULT 'winners' CHECK (bracket_type IN ('winners', 'losers', 'finals', 'grand_finals')),
  player1_id UUID REFERENCES auth.users(id),
  player2_id UUID REFERENCES auth.users(id),
  winner_id UUID REFERENCES auth.users(id),
  draft_id UUID REFERENCES public.drafts(id),
  lobby_id UUID REFERENCES public.lobbies(id),
  player1_score INT DEFAULT 0,
  player2_score INT DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'ready', 'in_progress', 'completed')),
  scheduled_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tournament casters
CREATE TABLE IF NOT EXISTS public.tournament_casters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID NOT NULL REFERENCES public.tournaments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  youtube_url TEXT,
  twitch_url TEXT,
  kick_url TEXT,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tournament_id, user_id)
);

-- Enable RLS on new tables
ALTER TABLE public.draft_spectators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tournament_admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tournament_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tournament_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tournament_casters ENABLE ROW LEVEL SECURITY;

-- Spectators policies (anyone can view/join public drafts)
CREATE POLICY "spectators_select_all" ON public.draft_spectators FOR SELECT USING (true);
CREATE POLICY "spectators_insert" ON public.draft_spectators FOR INSERT WITH CHECK (true);
CREATE POLICY "spectators_update_own" ON public.draft_spectators FOR UPDATE USING (session_id = session_id);
CREATE POLICY "spectators_delete_own" ON public.draft_spectators FOR DELETE USING (session_id = session_id);

-- Tournament policies
CREATE POLICY "tournaments_select" ON public.tournaments FOR SELECT USING (
  visibility = 'public' OR 
  created_by = auth.uid() OR
  EXISTS (SELECT 1 FROM public.tournament_admins WHERE tournament_id = id AND user_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM public.tournament_participants WHERE tournament_id = id AND user_id = auth.uid())
);
CREATE POLICY "tournaments_insert" ON public.tournaments FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "tournaments_update" ON public.tournaments FOR UPDATE USING (
  created_by = auth.uid() OR
  EXISTS (SELECT 1 FROM public.tournament_admins WHERE tournament_id = id AND user_id = auth.uid() AND role IN ('owner', 'admin'))
);
CREATE POLICY "tournaments_delete" ON public.tournaments FOR DELETE USING (created_by = auth.uid());

-- Tournament admins policies
CREATE POLICY "tournament_admins_select" ON public.tournament_admins FOR SELECT USING (true);
CREATE POLICY "tournament_admins_insert" ON public.tournament_admins FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.tournaments WHERE id = tournament_id AND created_by = auth.uid())
);
CREATE POLICY "tournament_admins_delete" ON public.tournament_admins FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.tournaments WHERE id = tournament_id AND created_by = auth.uid())
);

-- Tournament participants policies
CREATE POLICY "tournament_participants_select" ON public.tournament_participants FOR SELECT USING (true);
CREATE POLICY "tournament_participants_insert" ON public.tournament_participants FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.tournaments WHERE id = tournament_id AND created_by = auth.uid()) OR
  EXISTS (SELECT 1 FROM public.tournament_admins WHERE tournament_id = tournament_id AND user_id = auth.uid())
);
CREATE POLICY "tournament_participants_update" ON public.tournament_participants FOR UPDATE USING (
  user_id = auth.uid() OR
  EXISTS (SELECT 1 FROM public.tournaments WHERE id = tournament_id AND created_by = auth.uid()) OR
  EXISTS (SELECT 1 FROM public.tournament_admins WHERE tournament_id = tournament_id AND user_id = auth.uid())
);

-- Tournament matches policies
CREATE POLICY "tournament_matches_select" ON public.tournament_matches FOR SELECT USING (true);
CREATE POLICY "tournament_matches_insert" ON public.tournament_matches FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.tournaments WHERE id = tournament_id AND created_by = auth.uid()) OR
  EXISTS (SELECT 1 FROM public.tournament_admins WHERE tournament_id = tournament_id AND user_id = auth.uid())
);
CREATE POLICY "tournament_matches_update" ON public.tournament_matches FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.tournaments WHERE id = tournament_id AND created_by = auth.uid()) OR
  EXISTS (SELECT 1 FROM public.tournament_admins WHERE tournament_id = tournament_id AND user_id = auth.uid())
);

-- Tournament casters policies
CREATE POLICY "tournament_casters_select" ON public.tournament_casters FOR SELECT USING (true);
CREATE POLICY "tournament_casters_manage" ON public.tournament_casters FOR ALL USING (
  EXISTS (SELECT 1 FROM public.tournaments WHERE id = tournament_id AND created_by = auth.uid()) OR
  EXISTS (SELECT 1 FROM public.tournament_admins WHERE tournament_id = tournament_id AND user_id = auth.uid())
);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.draft_spectators;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tournaments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tournament_matches;

-- Index for spectator cleanup
CREATE INDEX IF NOT EXISTS idx_spectators_last_seen ON public.draft_spectators(last_seen);
CREATE INDEX IF NOT EXISTS idx_spectators_draft_id ON public.draft_spectators(draft_id);
