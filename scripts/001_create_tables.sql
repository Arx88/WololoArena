-- AOE2 Draft Application Database Schema

-- Profiles table for user data
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  avatar_url TEXT,
  favorite_civs TEXT[] DEFAULT '{}',
  favorite_maps TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lobbies table for draft rooms
CREATE TABLE IF NOT EXISTS public.lobbies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  host_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  guest_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'ready', 'drafting', 'completed')),
  settings JSONB NOT NULL DEFAULT '{
    "ban_time": 30,
    "pick_time": 45,
    "civ_bans": 3,
    "civ_picks": 1,
    "map_bans": 2,
    "map_picks": 1,
    "civ_pool": "all",
    "game_modes": ["random_map", "empire_wars"]
  }',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Drafts table for draft state
CREATE TABLE IF NOT EXISTS public.drafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lobby_id UUID NOT NULL REFERENCES public.lobbies(id) ON DELETE CASCADE,
  current_phase TEXT NOT NULL DEFAULT 'civ_ban' CHECK (current_phase IN ('civ_ban', 'civ_pick', 'map_ban', 'map_pick', 'mode_roll', 'completed')),
  current_turn UUID,
  phase_end_time TIMESTAMPTZ,
  host_civ_bans TEXT[] DEFAULT '{}',
  guest_civ_bans TEXT[] DEFAULT '{}',
  host_civ_picks TEXT[] DEFAULT '{}',
  guest_civ_picks TEXT[] DEFAULT '{}',
  host_map_bans TEXT[] DEFAULT '{}',
  guest_map_bans TEXT[] DEFAULT '{}',
  host_map_picks TEXT[] DEFAULT '{}',
  guest_map_picks TEXT[] DEFAULT '{}',
  selected_game_mode TEXT,
  turn_number INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Match history
CREATE TABLE IF NOT EXISTS public.match_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  draft_id UUID NOT NULL REFERENCES public.drafts(id) ON DELETE CASCADE,
  host_id UUID NOT NULL,
  guest_id UUID NOT NULL,
  host_civ TEXT NOT NULL,
  guest_civ TEXT NOT NULL,
  map TEXT NOT NULL,
  game_mode TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lobbies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_history ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "profiles_select_all" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Lobbies policies
CREATE POLICY "lobbies_select_all" ON public.lobbies FOR SELECT USING (true);
CREATE POLICY "lobbies_insert_own" ON public.lobbies FOR INSERT WITH CHECK (auth.uid() = host_id);
CREATE POLICY "lobbies_update_participants" ON public.lobbies FOR UPDATE USING (auth.uid() = host_id OR auth.uid() = guest_id);
CREATE POLICY "lobbies_delete_host" ON public.lobbies FOR DELETE USING (auth.uid() = host_id);

-- Drafts policies
CREATE POLICY "drafts_select_all" ON public.drafts FOR SELECT USING (true);
CREATE POLICY "drafts_insert_lobby_host" ON public.drafts FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.lobbies WHERE id = lobby_id AND host_id = auth.uid())
);
CREATE POLICY "drafts_update_participants" ON public.drafts FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.lobbies WHERE id = lobby_id AND (host_id = auth.uid() OR guest_id = auth.uid()))
);

-- Match history policies
CREATE POLICY "match_history_select_all" ON public.match_history FOR SELECT USING (true);
CREATE POLICY "match_history_insert" ON public.match_history FOR INSERT WITH CHECK (
  auth.uid() = host_id OR auth.uid() = guest_id
);

-- Enable realtime for lobbies and drafts
ALTER PUBLICATION supabase_realtime ADD TABLE public.lobbies;
ALTER PUBLICATION supabase_realtime ADD TABLE public.drafts;
