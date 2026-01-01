// Tipos para el sistema de administración

export interface CivilizationConfig {
  id: string
  name: string
  expansion: string
  specialty: string | null
  icon: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface MapConfig {
  id: string
  name: string
  category: "land" | "water" | "hybrid" | "special"
  description: string | null
  image: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface GameModeConfig {
  id: string
  name: string
  description: string | null
  icon: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: string
  created_at: string
}
