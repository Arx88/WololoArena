-- Create Presets Table
CREATE TABLE IF NOT EXISTS public.presets (
  id TEXT PRIMARY KEY, -- e.g., 'standard_v1', 'hidden_cup_v2'
  name TEXT NOT NULL,
  description TEXT,
  steps JSONB NOT NULL, -- Array of Step objects
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Admin/Creator
  is_official BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for presets
ALTER TABLE public.presets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Everyone can read presets" ON public.presets FOR SELECT USING (true);
CREATE POLICY "Admins can insert presets" ON public.presets FOR INSERT WITH CHECK (
    -- In a real app, check for admin role. For now, allow authenticated users for testing or restricted.
    auth.role() = 'authenticated' 
);

-- Add preset_id to lobbies
ALTER TABLE public.lobbies ADD COLUMN IF NOT EXISTS preset_id TEXT REFERENCES public.presets(id);

-- Add 'current_step_index' to drafts to track progress in the preset
ALTER TABLE public.drafts ADD COLUMN IF NOT EXISTS current_step_index INTEGER DEFAULT 0;

-- SEED DATA: Standard Preset (Mimics current hardcoded logic)
-- Flow: 
-- 1. Map Ban (Host)
-- 2. Map Ban (Guest) 
-- ... (Until map bans done)
-- 3. Map Pick (Host) -> Home Map
-- 4. Map Pick (Guest) -> Home Map
-- 5. Civ Ban (Host)
-- 6. Civ Ban (Guest)
-- ...
-- 7. Civ Pick (Host)
-- 8. Civ Pick (Guest)
-- ...

INSERT INTO public.presets (id, name, description, is_official, steps)
VALUES (
  'standard_1v1', 
  'Standard 1v1', 
  'Standard competitive settings: 3 Bans, 1 Pick, Home Maps',
  true,
  '[
    {"id": "map_ban_h_1", "phase": "map_ban", "actor": "host", "action": "ban", "target": "map", "count": 1},
    {"id": "map_ban_g_1", "phase": "map_ban", "actor": "guest", "action": "ban", "target": "map", "count": 1},
    {"id": "map_ban_h_2", "phase": "map_ban", "actor": "host", "action": "ban", "target": "map", "count": 1},
    {"id": "map_ban_g_2", "phase": "map_ban", "actor": "guest", "action": "ban", "target": "map", "count": 1},
    {"id": "map_pick_h", "phase": "map_pick", "actor": "host", "action": "pick", "target": "map", "count": 1},
    {"id": "map_pick_g", "phase": "map_pick", "actor": "guest", "action": "pick", "target": "map", "count": 1},
    {"id": "civ_ban_h_1", "phase": "civ_ban", "actor": "host", "action": "ban", "target": "civ", "count": 1},
    {"id": "civ_ban_g_1", "phase": "civ_ban", "actor": "guest", "action": "ban", "target": "civ", "count": 1},
    {"id": "civ_pick_h_1", "phase": "civ_pick", "actor": "host", "action": "pick", "target": "civ", "count": 1},
    {"id": "civ_pick_g_1", "phase": "civ_pick", "actor": "guest", "action": "pick", "target": "civ", "count": 1},
    {"id": "civ_pick_g_2", "phase": "civ_pick", "actor": "guest", "action": "pick", "target": "civ", "count": 1},
    {"id": "civ_pick_h_2", "phase": "civ_pick", "actor": "host", "action": "pick", "target": "civ", "count": 1}
  ]'::jsonb
) ON CONFLICT (id) DO UPDATE SET steps = EXCLUDED.steps;

-- SEED DATA: Hidden Cup Style (Example of flexibility)
INSERT INTO public.presets (id, name, description, is_official, steps)
VALUES (
  'hidden_cup_style', 
  'Hidden Picks Style', 
  'Civilizations are hidden until the draft ends.',
  true,
  '[
    {"id": "map_ban_h", "phase": "map_ban", "actor": "host", "action": "ban", "target": "map", "count": 1},
    {"id": "map_ban_g", "phase": "map_ban", "actor": "guest", "action": "ban", "target": "map", "count": 1},
    {"id": "civ_ban_h", "phase": "civ_ban", "actor": "host", "action": "ban", "target": "civ", "count": 1},
    {"id": "civ_ban_g", "phase": "civ_ban", "actor": "guest", "action": "ban", "target": "civ", "count": 1},
    {"id": "civ_pick_h_hidden", "phase": "civ_pick", "actor": "host", "action": "pick", "target": "civ", "count": 1, "hidden": true},
    {"id": "civ_pick_g_hidden", "phase": "civ_pick", "actor": "guest", "action": "pick", "target": "civ", "count": 1, "hidden": true},
    {"id": "reveal_all", "phase": "reveal", "actor": "system", "action": "reveal", "target": "civ", "count": 0}
  ]'::jsonb
) ON CONFLICT (id) DO NOTHING;
