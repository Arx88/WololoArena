-- Fix tournament_casters table to allow multiple casters without user_id
-- The previous UNIQUE constraint on (tournament_id, user_id) caused issues when user_id is NULL

-- Drop the problematic unique constraint
ALTER TABLE public.tournament_casters DROP CONSTRAINT IF EXISTS tournament_casters_tournament_id_user_id_key;

-- Add a new index for performance (not unique, allows NULL user_ids)
CREATE INDEX IF NOT EXISTS idx_tournament_casters_tournament ON public.tournament_casters(tournament_id);

-- Fix the RLS policy for casters to allow proper insert/update/delete
DROP POLICY IF EXISTS "tournament_casters_manage" ON public.tournament_casters;

-- Create separate policies for better control
CREATE POLICY "tournament_casters_insert" ON public.tournament_casters 
FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.tournaments WHERE id = tournament_id AND created_by = auth.uid()) OR
  EXISTS (SELECT 1 FROM public.tournament_admins WHERE tournament_id = tournament_casters.tournament_id AND user_id = auth.uid())
);

CREATE POLICY "tournament_casters_update" ON public.tournament_casters 
FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.tournaments WHERE id = tournament_id AND created_by = auth.uid()) OR
  EXISTS (SELECT 1 FROM public.tournament_admins WHERE tournament_id = tournament_casters.tournament_id AND user_id = auth.uid())
);

CREATE POLICY "tournament_casters_delete" ON public.tournament_casters 
FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.tournaments WHERE id = tournament_id AND created_by = auth.uid()) OR
  EXISTS (SELECT 1 FROM public.tournament_admins WHERE tournament_id = tournament_casters.tournament_id AND user_id = auth.uid())
);

-- Ensure the select policy exists
DROP POLICY IF EXISTS "tournament_casters_select" ON public.tournament_casters;
CREATE POLICY "tournament_casters_select" ON public.tournament_casters 
FOR SELECT USING (true);
