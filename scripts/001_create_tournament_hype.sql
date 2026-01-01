-- Create tournament_hype table for tracking user hype on tournaments
CREATE TABLE IF NOT EXISTS tournament_hype (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tournament_id UUID NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one hype per user per tournament
  UNIQUE(tournament_id, user_id)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_tournament_hype_tournament_id ON tournament_hype(tournament_id);
CREATE INDEX IF NOT EXISTS idx_tournament_hype_user_id ON tournament_hype(user_id);

-- Enable RLS
ALTER TABLE tournament_hype ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read hype counts
CREATE POLICY "tournament_hype_select" ON tournament_hype
  FOR SELECT USING (true);

-- Policy: Authenticated users can insert their own hype
CREATE POLICY "tournament_hype_insert" ON tournament_hype
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own hype
CREATE POLICY "tournament_hype_delete" ON tournament_hype
  FOR DELETE USING (auth.uid() = user_id);
