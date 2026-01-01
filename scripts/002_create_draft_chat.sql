-- =============================================
-- WOLOLO ARENA - Draft Chat Messages Table
-- =============================================

-- Create draft_messages table for live chat during drafts
CREATE TABLE IF NOT EXISTS draft_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  draft_id UUID NOT NULL REFERENCES drafts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'text' CHECK (message_type IN ('text', 'emoji', 'system')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for fast message retrieval by draft
CREATE INDEX IF NOT EXISTS idx_draft_messages_draft_id ON draft_messages(draft_id);
CREATE INDEX IF NOT EXISTS idx_draft_messages_created_at ON draft_messages(created_at DESC);

-- Enable Row Level Security
ALTER TABLE draft_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read messages from drafts they're part of or spectating
CREATE POLICY "Users can read draft messages" ON draft_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM drafts d
      JOIN lobbies l ON l.id = d.lobby_id
      WHERE d.id = draft_messages.draft_id
      AND (
        l.host_id = auth.uid() 
        OR l.guest_id = auth.uid()
        OR l.visibility = 'public'
      )
    )
  );

-- Policy: Participants can insert messages
CREATE POLICY "Participants can send messages" ON draft_messages
  FOR INSERT WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM drafts d
      JOIN lobbies l ON l.id = d.lobby_id
      WHERE d.id = draft_messages.draft_id
      AND (l.host_id = auth.uid() OR l.guest_id = auth.uid())
    )
  );

-- Enable realtime for draft_messages
ALTER PUBLICATION supabase_realtime ADD TABLE draft_messages;
