-- =============================================
-- WOLOLO ARENA - Spectator Predictions System
-- =============================================

-- Create spectator_predictions table for "What will they pick?" feature
CREATE TABLE IF NOT EXISTS spectator_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  draft_id UUID NOT NULL REFERENCES drafts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  phase TEXT NOT NULL, -- 'civ_ban', 'civ_pick', 'map_ban', 'map_pick'
  turn_number INTEGER NOT NULL,
  predicted_item TEXT NOT NULL, -- civ or map id
  actual_item TEXT, -- filled after reveal
  is_correct BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  UNIQUE(draft_id, session_id, phase, turn_number)
);

-- Create spectator_votes table for favorite picks voting
CREATE TABLE IF NOT EXISTS spectator_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  draft_id UUID NOT NULL REFERENCES drafts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('best_pick', 'best_ban', 'mvp_moment')),
  item_id TEXT NOT NULL, -- civ/map id or specific pick
  player_id TEXT NOT NULL, -- host or guest
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(draft_id, session_id, vote_type)
);

-- Create civ_stats table for win rates and popularity
CREATE TABLE IF NOT EXISTS civ_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  civ_id TEXT NOT NULL,
  map_id TEXT, -- null for overall stats
  total_picks INTEGER DEFAULT 0,
  total_bans INTEGER DEFAULT 0,
  total_wins INTEGER DEFAULT 0,
  total_losses INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(civ_id, map_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_predictions_draft ON spectator_predictions(draft_id);
CREATE INDEX IF NOT EXISTS idx_predictions_session ON spectator_predictions(session_id);
CREATE INDEX IF NOT EXISTS idx_votes_draft ON spectator_votes(draft_id);
CREATE INDEX IF NOT EXISTS idx_civ_stats_civ ON civ_stats(civ_id);

-- Enable RLS
ALTER TABLE spectator_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE spectator_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE civ_stats ENABLE ROW LEVEL SECURITY;

-- Policies for predictions
CREATE POLICY "Anyone can read predictions" ON spectator_predictions FOR SELECT USING (true);
CREATE POLICY "Anyone can insert predictions" ON spectator_predictions FOR INSERT WITH CHECK (true);
CREATE POLICY "System can update predictions" ON spectator_predictions FOR UPDATE USING (true);

-- Policies for votes
CREATE POLICY "Anyone can read votes" ON spectator_votes FOR SELECT USING (true);
CREATE POLICY "Anyone can insert votes" ON spectator_votes FOR INSERT WITH CHECK (true);

-- Policies for civ_stats (read-only for users)
CREATE POLICY "Anyone can read civ_stats" ON civ_stats FOR SELECT USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE spectator_predictions;
ALTER PUBLICATION supabase_realtime ADD TABLE spectator_votes;
