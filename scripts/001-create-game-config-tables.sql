-- Tablas de configuración global para el Admin Panel
-- Estas tablas permiten gestionar civilizaciones, mapas y modos de juego desde la DB

-- Tabla de civilizaciones
CREATE TABLE IF NOT EXISTS civilizations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  expansion TEXT NOT NULL DEFAULT 'base',
  specialty TEXT,
  icon TEXT DEFAULT '/placeholder.svg?height=64&width=64',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de mapas
CREATE TABLE IF NOT EXISTS maps (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'land',
  description TEXT,
  image TEXT DEFAULT '/placeholder.svg?height=120&width=200',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de modos de juego
CREATE TABLE IF NOT EXISTS game_modes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT '/placeholder.svg?height=48&width=48',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de usuarios admin
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS policies
ALTER TABLE civilizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE maps ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_modes ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Todos pueden leer las configuraciones
CREATE POLICY "Anyone can read civilizations" ON civilizations FOR SELECT USING (true);
CREATE POLICY "Anyone can read maps" ON maps FOR SELECT USING (true);
CREATE POLICY "Anyone can read game_modes" ON game_modes FOR SELECT USING (true);

-- Solo admins pueden modificar
CREATE POLICY "Admins can insert civilizations" ON civilizations FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));
CREATE POLICY "Admins can update civilizations" ON civilizations FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));
CREATE POLICY "Admins can delete civilizations" ON civilizations FOR DELETE 
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Admins can insert maps" ON maps FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));
CREATE POLICY "Admins can update maps" ON maps FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));
CREATE POLICY "Admins can delete maps" ON maps FOR DELETE 
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Admins can insert game_modes" ON game_modes FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));
CREATE POLICY "Admins can update game_modes" ON game_modes FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));
CREATE POLICY "Admins can delete game_modes" ON game_modes FOR DELETE 
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Admin users policies  
CREATE POLICY "Admins can read admin_users" ON admin_users FOR SELECT 
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));
