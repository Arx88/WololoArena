-- =============================================
-- WOLOLO ARENA - Draft History and Replay System
-- =============================================

-- Create draft_actions table to store every action in a draft for replay
CREATE TABLE IF NOT EXISTS draft_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  draft_id UUID NOT NULL REFERENCES drafts(id) ON DELETE CASCADE,
  action_number INTEGER NOT NULL,
  phase TEXT NOT NULL,
  action_type TEXT NOT NULL CHECK (action_type IN ('ban', 'pick', 'random', 'mode_roll')),
  item_type TEXT NOT NULL CHECK (item_type IN ('civ', 'map', 'mode')),
  item_id TEXT NOT NULL,
  player_role TEXT NOT NULL CHECK (player_role IN ('host', 'guest', 'system')),
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(draft_id, action_number)
);

-- Add shareable fields to drafts table
ALTER TABLE drafts ADD COLUMN IF NOT EXISTS share_code TEXT UNIQUE;
ALTER TABLE drafts ADD COLUMN IF NOT EXISTS is_shareable BOOLEAN DEFAULT true;
ALTER TABLE drafts ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- Create function to generate share code
CREATE OR REPLACE FUNCTION generate_draft_share_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.share_code IS NULL THEN
    NEW.share_code := upper(substring(md5(random()::text || NEW.id::text) from 1 for 8));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate share code
DROP TRIGGER IF EXISTS draft_share_code_trigger ON drafts;
CREATE TRIGGER draft_share_code_trigger
  BEFORE INSERT ON drafts
  FOR EACH ROW
  EXECUTE FUNCTION generate_draft_share_code();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_draft_actions_draft_id ON draft_actions(draft_id);
CREATE INDEX IF NOT EXISTS idx_draft_actions_order ON draft_actions(draft_id, action_number);
CREATE INDEX IF NOT EXISTS idx_drafts_share_code ON drafts(share_code);

-- Enable RLS
ALTER TABLE draft_actions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can read draft actions" ON draft_actions FOR SELECT USING (true);
CREATE POLICY "Participants can insert actions" ON draft_actions FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM drafts d
    JOIN lobbies l ON l.id = d.lobby_id
    WHERE d.id = draft_actions.draft_id
    AND (l.host_id = auth.uid() OR l.guest_id = auth.uid())
  )
);

-- View for draft statistics per user
CREATE OR REPLACE VIEW user_draft_stats AS
SELECT 
  p.id as user_id,
  p.username,
  COUNT(DISTINCT d.id) as total_drafts,
  COUNT(DISTINCT CASE WHEN l.host_id = p.id THEN d.id END) as drafts_as_host,
  COUNT(DISTINCT CASE WHEN l.guest_id = p.id THEN d.id END) as drafts_as_guest
FROM profiles p
LEFT JOIN lobbies l ON l.host_id = p.id OR l.guest_id = p.id
LEFT JOIN drafts d ON d.lobby_id = l.id AND d.current_phase = 'completed'
GROUP BY p.id, p.username;
