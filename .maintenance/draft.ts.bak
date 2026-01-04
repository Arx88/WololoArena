export type LobbyStatus = "waiting" | "ready" | "drafting" | "completed"
export type DraftPhase =
  | "coin_flip"
  | "civ_ban"
  | "civ_pick"
  | "map_ban"
  | "map_pick"
  | "map_random"
  | "mode_roll"
  | "completed"
export type PlayerRole = "host" | "guest"
export type Visibility = "public" | "private"

export type MapSelectionMode =
  | "ban_until_one" // Ban alternado hasta que quede 1 mapa
  | "random" // Sorteo aleatorio del pool (sin bans)
  | "random_with_bans" // Bans opcionales + sorteo del resto
  | "home_away" // Cada jugador elige su home map
  | "home_away_neutral" // Home maps + neutral map randomly selected
  | "disabled" // Sin selección de mapa

export interface MapSettings {
  mode: MapSelectionMode
  pool: string[] // Mapas disponibles
  bans_per_player: number // Para random_with_bans
  allow_same_home_map: boolean // Para home_away - si pueden elegir el mismo mapa
  enable_neutral_map: boolean // For home_away_neutral - add a random neutral map
  neutral_map_pool: string[] // Pool for neutral map selection
}

export interface LobbySettings {
  ban_time: number
  pick_time: number
  civ_bans: number
  civ_picks: number
  map_bans: number
  map_picks: number
  civ_pool: "all" | "base" | "dlc" | "custom"
  custom_civ_pool?: string[]
  map_pool: string[]
  game_modes: string[]
  enable_civ_bans: boolean
  enable_civ_picks: boolean
  enable_map_bans: boolean // Deprecado - usar map_settings.mode
  enable_game_mode_roll: boolean
  enable_suggestions: boolean // Toggle for Strategic Intelligence
  is_admin_created?: boolean // True if a non-participant is creating this
  host_player_id?: string // Selected host if is_admin_created is true
  guest_player_id?: string // Selected guest if is_admin_created is true
  map_settings: MapSettings
  map_mode?: MapSelectionMode
  map_bans_per_player?: number
  allow_same_home_map?: boolean
  enable_coin_flip: boolean
  pre_draft_bans: number // Number of civ bans before draft starts (configurable)
}

export interface Lobby {
  id: string
  code: string
  host_id: string
  guest_id: string | null
  status: LobbyStatus
  visibility: Visibility
  settings: LobbySettings
  preset_id?: string // Link to the preset used
  created_at: string
  updated_at: string
}

export interface Draft {
  id: string
  lobby_id: string
  current_phase: DraftPhase
  current_step_index: number // Tracking the progress in the preset steps
  current_turn: string | null
  phase_end_time: string | null
  host_civ_bans: string[]
  guest_civ_bans: string[]
  host_civ_picks: string[]
  guest_civ_picks: string[]
  host_map_bans: string[]
  guest_map_bans: string[]
  host_map_picks: string[]
  guest_map_picks: string[]
  host_home_map: string | null
  guest_home_map: string | null
  final_map: string | null
  neutral_map: string | null // Added neutral map for home_away_neutral mode
  selected_game_mode: string | null
  turn_number: number
  coin_flip_winner: string | null // ID of the player who won the coin flip
  first_picker: string | null // ID of the player who picks first
  created_at: string
  updated_at: string
}

export interface DraftSpectator {
  id: string
  draft_id: string
  session_id: string
  user_id: string | null
  last_seen: string
  created_at: string
}

export interface Profile {
  id: string
  username: string
  avatar_url: string | null
  favorite_civs: string[]
  favorite_maps: string[]
  created_at: string
  updated_at: string
  total_points?: number
  tournaments_played?: number
  tournaments_won?: number
}

export interface MatchHistory {
  id: string
  draft_id: string
  host_id: string
  guest_id: string
  host_civ: string
  guest_civ: string
  map: string
  game_mode: string
  created_at: string
}

export type PrizeType = "money" | "other"
export type Currency = "USD" | "EUR" | "GBP" | "ARS" | "BRL" | "MXN" | "CLP" | "COP" | "PEN"

export interface Prize {
  place: 1 | 2 | 3
  type: PrizeType
  currency?: Currency
  amount?: number
  description?: string
}

export interface TournamentPrizes {
  enabled: boolean
  prize_count: 1 | 2 | 3
  prizes: Prize[]
}

// Tournament types
export type TournamentFormat = "single_elimination" | "double_elimination" | "round_robin" | "swiss"
export type TournamentStatus = "draft" | "registration" | "in_progress" | "completed" | "cancelled"
export type BracketType = "winners" | "losers" | "finals" | "grand_finals"
export type ParticipantStatus = "pending" | "confirmed" | "eliminated" | "winner" | "disqualified"
export type MatchStatus = "pending" | "ready" | "in_progress" | "completed"

export interface Tournament {
  id: string
  name: string
  description: string | null
  format: TournamentFormat
  status: TournamentStatus
  visibility: Visibility
  max_participants: number
  settings: LobbySettings
  created_by: string
  start_date: string | null
  end_date: string | null
  created_at: string
  updated_at: string
  prizes?: TournamentPrizes
  banner_image?: string
  hype_count?: number
}

export interface TournamentAdmin {
  id: string
  tournament_id: string
  user_id: string
  role: "owner" | "admin" | "moderator"
  created_at: string
}

export interface TournamentParticipant {
  id: string
  tournament_id: string
  user_id: string
  seed: number | null
  status: ParticipantStatus
  invited_at: string
  confirmed_at: string | null
  created_at: string
  profile?: Profile
  final_position?: number
}

export interface TournamentMatch {
  id: string
  tournament_id: string
  round: number
  match_number: number
  bracket_type: BracketType
  player1_id: string | null
  player2_id: string | null
  winner_id: string | null
  draft_id: string | null
  lobby_id: string | null
  player1_score: number
  player2_score: number
  status: MatchStatus
  scheduled_at: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
  player1?: Profile
  player2?: Profile
  draft?: Draft
}

export interface TournamentCaster {
  id: string
  tournament_id: string
  user_id: string | null
  name: string
  youtube_url: string | null
  twitch_url: string | null
  kick_url: string | null
  is_primary: boolean
  created_at: string
}

// Preset & Engine Types
export type DraftActor = "host" | "guest" | "winner" | "loser" | "system"
export type DraftActionType = "ban" | "pick" | "snipe" | "steal" | "reveal" | "wait"
export type DraftTarget = "civ" | "map" | "mode"

export interface DraftStep {
  id: string
  phase: string // Display name for the phase (e.g. "Civilization Ban")
  actor: DraftActor
  action: DraftActionType
  target: DraftTarget
  count: number // How many selections? Usually 1
  hidden?: boolean
  scope?: "global" | "team"
}

export interface Preset {
  id: string
  name: string
  description?: string
  steps: DraftStep[]
  is_official: boolean
  created_by?: string
  created_at?: string
}

// Extended types for Lobby and Draft to support Presets
// Note: We use interface merging or you can manually update the interfaces above
// For now, I will ask you to assume these fields exist in the database even if not strictly in the legacy type yet
// But correct approach is to update the interfaces above.

// Let's update Lobby and Draft interfaces above in a separate operation or here if I could editing the whole file.
// Since 'replace' works on exact string, I will just append these types. 
// Ideally I would edit the interfaces above, but I will do that in a next step to avoid massive token usage/context issues.
