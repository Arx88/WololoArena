-- =============================================
-- WOLOLO ARENA - Fix Draft Chat Permissions
-- Only participants of the draft and tournament admins can send messages
-- =============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Participants can send messages" ON draft_messages;
DROP POLICY IF EXISTS "Users can read draft messages" ON draft_messages;

-- Policy: Only participants (host/guest) of the draft can read messages
-- Or if they are tournament admins for a tournament-linked draft
CREATE POLICY "Draft participants and admins can read messages" ON draft_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM drafts d
      JOIN lobbies l ON l.id = d.lobby_id
      WHERE d.id = draft_messages.draft_id
      AND (
        -- Draft participants
        l.host_id = auth.uid() 
        OR l.guest_id = auth.uid()
        -- Tournament admins (check if this draft belongs to a tournament match)
        OR EXISTS (
          SELECT 1 FROM tournament_matches tm
          JOIN tournament_admins ta ON ta.tournament_id = tm.tournament_id
          WHERE tm.draft_id = d.id
          AND ta.user_id = auth.uid()
        )
      )
    )
  );

-- Policy: Only draft participants (host/guest) can send messages
-- Or tournament admins for tournament-linked drafts
CREATE POLICY "Draft participants and admins can send messages" ON draft_messages
  FOR INSERT WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM drafts d
      JOIN lobbies l ON l.id = d.lobby_id
      WHERE d.id = draft_messages.draft_id
      AND (
        -- Must be host or guest of the draft
        l.host_id = auth.uid() 
        OR l.guest_id = auth.uid()
        -- Or tournament admin
        OR EXISTS (
          SELECT 1 FROM tournament_matches tm
          JOIN tournament_admins ta ON ta.tournament_id = tm.tournament_id
          WHERE tm.draft_id = d.id
          AND ta.user_id = auth.uid()
        )
      )
    )
  );
