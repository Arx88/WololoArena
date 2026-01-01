// Demo data storage for full functionality in demo mode
// All data is stored in localStorage and simulates real database operations

import type { Profile, Tournament, TournamentParticipant, TournamentMatch, TournamentPrizes, TournamentCaster } from "@/lib/types/draft"
import type { CivilizationConfig, MapConfig, GameModeConfig } from "@/lib/types/admin"

const DEMO_TOURNAMENTS_KEY = "demo_tournaments"
const DEMO_PROFILES_KEY = "demo_profiles"
const DEMO_PARTICIPANTS_KEY = "demo_participants"
const DEMO_MATCHES_KEY = "demo_matches"
const DEMO_CIVS_KEY = "demo_civs"
const DEMO_MAPS_KEY = "demo_maps"
const DEMO_MODES_KEY = "demo_modes"
const DEMO_HYPE_KEY = "demo_tournament_hype"
const DEMO_MATCH_HISTORY_KEY = "demo_match_history"
const DEMO_CASTERS_KEY = "demo_casters"

const DEFAULT_PRIZES: TournamentPrizes = {
  enabled: true,
  prize_count: 3,
  prizes: [
    { place: 1, type: "money", currency: "USD", amount: 500 },
    { place: 2, type: "money", currency: "USD", amount: 200 },
    { place: 3, type: "other", description: "DLC Pack de tu elección" },
  ],
}

export const DEFAULT_DEMO_MATCH_HISTORY: MatchHistory[] = [
  // Matches for demo-user-001
  {
    id: `mh-${Date.now()}-1`,
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    draft_id: "demo-draft-1",
    host_id: "demo-user-001",
    host_civ: "Britons",
    guest_id: "demo-user-002",
    guest_civ: "Mayans",
    map: "Arabia",
    game_mode: "Random Map",
  },
  {
    id: `mh-${Date.now()}-2`,
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    draft_id: "demo-draft-2",
    host_id: "demo-user-003",
    host_civ: "Huns",
    guest_id: "demo-user-001",
    guest_civ: "Franks",
    map: "Arena",
    game_mode: "Empire Wars",
  },
  // Matches for demo-user-002
  {
    id: `mh-${Date.now()}-3`,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    draft_id: "demo-draft-3",
    host_id: "demo-user-002",
    host_civ: "Chinese",
    guest_id: "demo-user-004",
    guest_civ: "Persians",
    map: "Hideout",
    game_mode: "Random Map",
  },
  {
    id: `mh-${Date.now()}-4`,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    draft_id: "demo-draft-4",
    host_id: "demo-user-002",
    host_civ: "Vikings",
    guest_id: "demo-user-005",
    guest_civ: "Aztecs",
    map: "Black Forest",
    game_mode: "Death Match",
  },
];

// Default demo tournaments to show in home
export const DEFAULT_DEMO_TOURNAMENTS: Tournament[] = [
  {
    id: "demo-tournament-1",
    name: "AOE2 World Championship 2025",
    description: "The biggest tournament of the year. Top players from around the world compete for glory.",
    format: "double_elimination",
    visibility: "public",
    status: "registration",
    max_participants: 32,
    created_by: "demo-user-001",
    start_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    settings: { ban_time: 30, pick_time: 45, civ_bans: 3, civ_picks: 1 },
    prizes: DEFAULT_PRIZES,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-tournament-2",
    name: "Community Cup - Spring Edition",
    description: "Open tournament for all skill levels. Fun games and great prizes!",
    format: "single_elimination",
    visibility: "public",
    status: "registration",
    max_participants: 16,
    created_by: "demo-user-001",
    start_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    settings: { ban_time: 30, pick_time: 45, civ_bans: 2, civ_picks: 1 },
    prizes: {
      enabled: true,
      prize_count: 2,
      prizes: [
        { place: 1, type: "money", currency: "EUR", amount: 100 },
        { place: 2, type: "other", description: "Merchandise exclusivo" },
      ],
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-tournament-3",
    name: "Pro League Season 5",
    description: "Competitive league with weekly matches. Only for serious players!",
    format: "round_robin",
    visibility: "public",
    status: "in_progress",
    max_participants: 8,
    created_by: "demo-user-001",
    start_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    settings: { ban_time: 45, pick_time: 60, civ_bans: 4, civ_picks: 2 },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const DEFAULT_DEMO_PARTICIPANTS: Record<string, TournamentParticipant[]> = {
  "demo-tournament-1": [
    {
      id: "p1",
      tournament_id: "demo-tournament-1",
      user_id: "demo-user-001",
      status: "confirmed",
      seed: 1,
      invited_at: new Date().toISOString(),
      confirmed_at: new Date().toISOString(),
    },
    {
      id: "p2",
      tournament_id: "demo-tournament-1",
      user_id: "demo-user-002",
      status: "confirmed",
      seed: 2,
      invited_at: new Date().toISOString(),
      confirmed_at: new Date().toISOString(),
    },
    {
      id: "p3",
      tournament_id: "demo-tournament-1",
      user_id: "demo-user-003",
      status: "confirmed",
      seed: 3,
      invited_at: new Date().toISOString(),
      confirmed_at: new Date().toISOString(),
    },
    {
      id: "p4",
      tournament_id: "demo-tournament-1",
      user_id: "demo-user-004",
      status: "pending",
      seed: 4,
      invited_at: new Date().toISOString(),
    },
  ],
  "demo-tournament-2": [
    {
      id: "p5",
      tournament_id: "demo-tournament-2",
      user_id: "demo-user-001",
      status: "confirmed",
      seed: 1,
      invited_at: new Date().toISOString(),
      confirmed_at: new Date().toISOString(),
    },
    {
      id: "p6",
      tournament_id: "demo-tournament-2",
      user_id: "demo-user-002",
      status: "confirmed",
      seed: 2,
      invited_at: new Date().toISOString(),
      confirmed_at: new Date().toISOString(),
    },
  ],
  "demo-tournament-3": [
    {
      id: "p7",
      tournament_id: "demo-tournament-3",
      user_id: "demo-user-001",
      status: "confirmed",
      seed: 1,
      invited_at: new Date().toISOString(),
      confirmed_at: new Date().toISOString(),
    },
    {
      id: "p8",
      tournament_id: "demo-tournament-3",
      user_id: "demo-user-002",
      status: "confirmed",
      seed: 2,
      invited_at: new Date().toISOString(),
      confirmed_at: new Date().toISOString(),
    },
    {
      id: "p9",
      tournament_id: "demo-tournament-3",
      user_id: "demo-user-003",
      status: "confirmed",
      seed: 3,
      invited_at: new Date().toISOString(),
      confirmed_at: new Date().toISOString(),
    },
    {
      id: "p10",
      tournament_id: "demo-tournament-3",
      user_id: "demo-user-004",
      status: "confirmed",
      seed: 4,
      invited_at: new Date().toISOString(),
      confirmed_at: new Date().toISOString(),
    },
  ],
}

export const DEFAULT_DEMO_PROFILES: Profile[] = [
  {
    id: "demo-user-001",
    username: "Admin",
    avatar_url: null,
    favorite_civs: ["Britons", "Franks", "Mayans"],
    favorite_maps: ["Arabia", "Arena"],
    total_points: 850,
    tournaments_played: 12,
    tournaments_won: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-user-002",
    username: "TheViper",
    avatar_url: null,
    favorite_civs: ["Mayans", "Chinese", "Vikings"],
    favorite_maps: ["Arabia", "Runestones"],
    total_points: 1250,
    tournaments_played: 25,
    tournaments_won: 8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-user-003",
    username: "Hera",
    avatar_url: null,
    favorite_civs: ["Huns", "Mongols", "Aztecs"],
    favorite_maps: ["Arabia", "Serengeti"],
    total_points: 1100,
    tournaments_played: 20,
    tournaments_won: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-user-004",
    username: "DauT",
    avatar_url: null,
    favorite_civs: ["Persians", "Saracens", "Turks"],
    favorite_maps: ["Arena", "Hideout"],
    total_points: 950,
    tournaments_played: 18,
    tournaments_won: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-user-005",
    username: "Liereyy",
    avatar_url: null,
    favorite_civs: ["Vikings", "Aztecs", "Mayans"],
    favorite_maps: ["Arabia", "Acropolis"],
    total_points: 1050,
    tournaments_played: 15,
    tournaments_won: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-user-006",
    username: "MbL",
    avatar_url: null,
    favorite_civs: ["Franks", "Teutons", "Britons"],
    favorite_maps: ["Arabia", "Four Lakes"],
    total_points: 900,
    tournaments_played: 14,
    tournaments_won: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-user-007",
    username: "TaToH",
    avatar_url: null,
    favorite_civs: ["Spanish", "Italians", "Portuguese"],
    favorite_maps: ["Arena", "Hideout"],
    total_points: 780,
    tournaments_played: 10,
    tournaments_won: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-user-008",
    username: "Yo",
    avatar_url: null,
    favorite_civs: ["Chinese", "Mayans", "Vikings"],
    favorite_maps: ["Arabia", "Ghost Lake"],
    total_points: 720,
    tournaments_played: 8,
    tournaments_won: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const DEFAULT_DEMO_CIVS: CivilizationConfig[] = [
  { id: "civ-1", name: "Britons", icon_url: "/britons-medieval-castle.jpg", is_active: true },
  { id: "civ-2", name: "Franks", icon_url: "/franks-knight-cavalry.jpg", is_active: true },
  { id: "civ-3", name: "Mayans", icon_url: "/mayan-pyramid-temple.jpg", is_active: true },
  { id: "civ-4", name: "Chinese", icon_url: "/chinese-dynasty-pagoda.jpg", is_active: true },
  { id: "civ-5", name: "Mongols", icon_url: "/mongol-warrior-horse.jpg", is_active: true },
  { id: "civ-6", name: "Vikings", icon_url: "/viking-longship-warrior.jpg", is_active: true },
  { id: "civ-7", name: "Aztecs", icon_url: "/aztec-eagle-warrior-temple.jpg", is_active: true },
  { id: "civ-8", name: "Huns", icon_url: "/hun-cavalry-warrior.jpg", is_active: true },
  { id: "civ-9", name: "Persians", icon_url: "/persian-war-elephant.jpg", is_active: true },
  { id: "civ-10", name: "Byzantines", icon_url: "/byzantine-cataphract.jpg", is_active: true },
  { id: "civ-11", name: "Japanese", icon_url: "/samurai-warrior-castle.jpg", is_active: true },
  { id: "civ-12", name: "Turks", icon_url: "/turkish-janissary-cannon.jpg", is_active: true },
]

export const DEFAULT_DEMO_MAPS: MapConfig[] = [
  { id: "map-1", name: "Arabia", icon_url: "/desert-oasis-map.jpg", is_active: true, pool: "standard" },
  { id: "map-2", name: "Arena", icon_url: "/walled-arena-map.jpg", is_active: true, pool: "standard" },
  { id: "map-3", name: "Black Forest", icon_url: "/dense-forest-map.jpg", is_active: true, pool: "standard" },
  { id: "map-4", name: "Islands", icon_url: "/placeholder.svg?height=64&width=64", is_active: true, pool: "water" },
  { id: "map-5", name: "Nomad", icon_url: "/placeholder.svg?height=64&width=64", is_active: true, pool: "special" },
  {
    id: "map-6",
    name: "Runestones",
    icon_url: "/placeholder.svg?height=64&width=64",
    is_active: true,
    pool: "standard",
  },
]

export const DEFAULT_DEMO_MODES: GameModeConfig[] = [
  { id: "mode-1", name: "Random Map", is_active: true },
  { id: "mode-2", name: "Empire Wars", is_active: true },
  { id: "mode-3", name: "Death Match", is_active: true },
  { id: "mode-4", name: "Regicide", is_active: true },
]

// Helper functions for localStorage operations
function getItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue
  const stored = localStorage.getItem(key)
  if (!stored) return defaultValue
  try {
    return JSON.parse(stored)
  } catch {
    return defaultValue
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(value))
}

// Tournament operations
export function getDemoTournaments(): Tournament[] {
  const stored = getItem<Tournament[]>(DEMO_TOURNAMENTS_KEY, [])
  if (stored.length === 0) {
    setItem(DEMO_TOURNAMENTS_KEY, DEFAULT_DEMO_TOURNAMENTS)
    return DEFAULT_DEMO_TOURNAMENTS
  }
  return stored
}

export function getDemoTournament(id: string): Tournament | null {
  const tournaments = getDemoTournaments()
  return tournaments.find((t) => t.id === id) || null
}

export function createDemoTournament(tournament: Partial<Tournament>): Tournament {
  const tournaments = getDemoTournaments()
  const newTournament: Tournament = {
    id: `demo-tournament-${Date.now()}`,
    name: tournament.name || "New Tournament",
    description: tournament.description || "",
    format: tournament.format || "single_elimination",
    visibility: tournament.visibility || "public",
    status: "registration",
    max_participants: tournament.max_participants || 8,
    created_by: tournament.created_by || "demo-user-001",
    start_date: tournament.start_date || null,
    settings: tournament.settings || { ban_time: 30, pick_time: 45, civ_bans: 3, civ_picks: 1 },
    prizes: tournament.prizes,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  tournaments.unshift(newTournament)
  setItem(DEMO_TOURNAMENTS_KEY, tournaments)

  // Add creator as first participant
  const participants = getDemoParticipants(newTournament.id)
  participants.push({
    id: `p-${Date.now()}`,
    tournament_id: newTournament.id,
    user_id: newTournament.created_by,
    status: "confirmed",
    seed: 1,
    invited_at: new Date().toISOString(),
    confirmed_at: new Date().toISOString(),
  })
  setDemoParticipants(newTournament.id, participants)

  return newTournament
}

export function updateDemoTournament(id: string, updates: Partial<Tournament>): Tournament | null {
  const tournaments = getDemoTournaments()
  const index = tournaments.findIndex((t) => t.id === id)
  if (index === -1) return null
  tournaments[index] = { ...tournaments[index], ...updates, updated_at: new Date().toISOString() }
  setItem(DEMO_TOURNAMENTS_KEY, tournaments)
  return tournaments[index]
}

// Participants operations
export function getDemoParticipants(tournamentId: string): TournamentParticipant[] {
  const allParticipants = getItem<Record<string, TournamentParticipant[]>>(
    DEMO_PARTICIPANTS_KEY,
    DEFAULT_DEMO_PARTICIPANTS,
  )
  return allParticipants[tournamentId] || []
}

export function setDemoParticipants(tournamentId: string, participants: TournamentParticipant[]): void {
  const allParticipants = getItem<Record<string, TournamentParticipant[]>>(
    DEMO_PARTICIPANTS_KEY,
    DEFAULT_DEMO_PARTICIPANTS,
  )
  allParticipants[tournamentId] = participants
  setItem(DEMO_PARTICIPANTS_KEY, allParticipants)
}

export function addDemoParticipant(
  tournamentId: string,
  userId: string,
  status: "pending" | "confirmed" = "pending",
): TournamentParticipant {
  const participants = getDemoParticipants(tournamentId)
  const newParticipant: TournamentParticipant = {
    id: `p-${Date.now()}`,
    tournament_id: tournamentId,
    user_id: userId,
    status,
    seed: participants.length + 1,
    invited_at: new Date().toISOString(),
    confirmed_at: status === "confirmed" ? new Date().toISOString() : undefined,
  }
  participants.push(newParticipant)
  setDemoParticipants(tournamentId, participants)
  return newParticipant
}

export function updateDemoParticipant(
  tournamentId: string,
  participantId: string,
  updates: Partial<TournamentParticipant>,
): void {
  const participants = getDemoParticipants(tournamentId)
  const index = participants.findIndex((p) => p.id === participantId)
  if (index !== -1) {
    participants[index] = { ...participants[index], ...updates }
    setDemoParticipants(tournamentId, participants)
  }
}

export function removeDemoParticipant(tournamentId: string, participantId: string): void {
  const participants = getDemoParticipants(tournamentId)
  const filtered = participants.filter((p) => p.id !== participantId)
  setDemoParticipants(tournamentId, filtered)
}

// Profiles operations
export function getDemoProfiles(): Profile[] {
  const stored = getItem<Profile[]>(DEMO_PROFILES_KEY, [])
  if (stored.length === 0) {
    setItem(DEMO_PROFILES_KEY, DEFAULT_DEMO_PROFILES)
    return DEFAULT_DEMO_PROFILES
  }
  return stored
}

export function getDemoProfile(id: string): Profile | null {
  const profiles = getDemoProfiles()
  return profiles.find((p) => p.id === id) || null
}

export function updateDemoProfile(id: string, updates: Partial<Profile>): Profile | null {
  const profiles = getDemoProfiles()
  const index = profiles.findIndex((p) => p.id === id)
  if (index === -1) return null
  profiles[index] = { ...profiles[index], ...updates }
  setItem(DEMO_PROFILES_KEY, profiles)
  return profiles[index]
}

export function getTopPlayers(limit = 10): Profile[] {
  const profiles = getDemoProfiles()
  return profiles
    .filter((p) => (p.total_points || 0) > 0)
    .sort((a, b) => (b.total_points || 0) - (a.total_points || 0))
    .slice(0, limit)
}

// Matches operations
export function getDemoMatches(tournamentId: string): TournamentMatch[] {
  const allMatches = getItem<Record<string, TournamentMatch[]>>(DEMO_MATCHES_KEY, {})
  return allMatches[tournamentId] || []
}

export function setDemoMatches(tournamentId: string, matches: TournamentMatch[]): void {
  const allMatches = getItem<Record<string, TournamentMatch[]>>(DEMO_MATCHES_KEY, {})
  allMatches[tournamentId] = matches
  setItem(DEMO_MATCHES_KEY, allMatches)
}

// Admin data operations
export function getDemoCivs(): CivilizationConfig[] {
  const stored = getItem<CivilizationConfig[]>(DEMO_CIVS_KEY, [])
  if (stored.length === 0) {
    setItem(DEMO_CIVS_KEY, DEFAULT_DEMO_CIVS)
    return DEFAULT_DEMO_CIVS
  }
  return stored
}

export function setDemoCivs(civs: CivilizationConfig[]): void {
  setItem(DEMO_CIVS_KEY, civs)
}

export function getDemoMaps(): MapConfig[] {
  const stored = getItem<MapConfig[]>(DEMO_MAPS_KEY, [])
  if (stored.length === 0) {
    setItem(DEMO_MAPS_KEY, DEFAULT_DEMO_MAPS)
    return DEFAULT_DEMO_MAPS
  }
  return stored
}

export function setDemoMaps(maps: MapConfig[]): void {
  setItem(DEMO_MAPS_KEY, maps)
}

export function getDemoModes(): GameModeConfig[] {
  const stored = getItem<GameModeConfig[]>(DEMO_MODES_KEY, [])
  if (stored.length === 0) {
    setItem(DEMO_MODES_KEY, DEFAULT_DEMO_MODES)
    return DEFAULT_DEMO_MODES
  }
  return stored
}

export function setDemoModes(modes: GameModeConfig[]): void {
  setItem(DEMO_MODES_KEY, modes)
}

// Hype operations
export function getDemoHypeCount(tournamentId: string): number {
  const allHype = getItem<Record<string, number>>(DEMO_HYPE_KEY, {})
  // Return some default hype for demo tournaments
  if (tournamentId === "demo-tournament-1") return 42
  if (tournamentId === "demo-tournament-2") return 18
  if (tournamentId === "demo-tournament-3") return 67
  return allHype[tournamentId] || 0
}

export function setDemoHypeCount(tournamentId: string, count: number): void {
  const allHype = getItem<Record<string, number>>(DEMO_HYPE_KEY, {})
  allHype[tournamentId] = count
  setItem(DEMO_HYPE_KEY, allHype)
}

export function toggleDemoHype(tournamentId: string, userId: string): { count: number; hasHyped: boolean } {
  const hypedKey = `demo_hyped_${tournamentId}_${userId}`
  const hasHyped = getItem<boolean>(hypedKey, false)
  const currentCount = getDemoHypeCount(tournamentId)

  if (hasHyped) {
    setDemoHypeCount(tournamentId, Math.max(0, currentCount - 1))
    setItem(hypedKey, false)
    return { count: currentCount - 1, hasHyped: false }
  } else {
    setDemoHypeCount(tournamentId, currentCount + 1)
    setItem(hypedKey, true)
    return { count: currentCount + 1, hasHyped: true }
  }
}

export function hasDemoHyped(tournamentId: string, userId: string): boolean {
  const hypedKey = `demo_hyped_${tournamentId}_${userId}`
  return getItem<boolean>(hypedKey, false)
}

// Caster operations
export function getDemoCasters(tournamentId: string): TournamentCaster[] {
  const allCasters = getItem<Record<string, TournamentCaster[]>>(DEMO_CASTERS_KEY, {})
  return allCasters[tournamentId] || []
}

export function addDemoCaster(tournamentId: string, caster: TournamentCaster): void {
  const allCasters = getItem<Record<string, TournamentCaster[]>>(DEMO_CASTERS_KEY, {})
  if (!allCasters[tournamentId]) {
    allCasters[tournamentId] = []
  }
  
  // Ensure we have a created_at date
  const newCaster = {
    ...caster,
    created_at: caster.created_at || new Date().toISOString()
  }
  
  allCasters[tournamentId].push(newCaster)
  setItem(DEMO_CASTERS_KEY, allCasters)
}

export function updateDemoCaster(tournamentId: string, casterId: string, updates: Partial<TournamentCaster>): void {
  const allCasters = getItem<Record<string, TournamentCaster[]>>(DEMO_CASTERS_KEY, {})
  if (!allCasters[tournamentId]) return

  const index = allCasters[tournamentId].findIndex(c => c.id === casterId)
  if (index !== -1) {
    // If setting as primary, unset others
    if (updates.is_primary) {
      allCasters[tournamentId].forEach(c => c.is_primary = false)
    }
    
    allCasters[tournamentId][index] = { ...allCasters[tournamentId][index], ...updates }
    setItem(DEMO_CASTERS_KEY, allCasters)
  }
}

export function deleteDemoCaster(tournamentId: string, casterId: string): void {
  const allCasters = getItem<Record<string, TournamentCaster[]>>(DEMO_CASTERS_KEY, {})
  if (!allCasters[tournamentId]) return

  allCasters[tournamentId] = allCasters[tournamentId].filter(c => c.id !== casterId)
  setItem(DEMO_CASTERS_KEY, allCasters)
}

// Reset all demo data
export function resetDemoData(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(DEMO_TOURNAMENTS_KEY)
  localStorage.removeItem(DEMO_PROFILES_KEY)
  localStorage.removeItem(DEMO_PARTICIPANTS_KEY)
  localStorage.removeItem(DEMO_MATCHES_KEY)
  localStorage.removeItem(DEMO_CIVS_KEY)
  localStorage.removeItem(DEMO_MAPS_KEY)
  localStorage.removeItem(DEMO_MODES_KEY)
  localStorage.removeItem(DEMO_HYPE_KEY)
  localStorage.removeItem(DEMO_MATCH_HISTORY_KEY)
  localStorage.removeItem(DEMO_CASTERS_KEY)
}

export function getDemoMatchHistory(profileId: string): MatchHistory[] {
  const stored = getItem<MatchHistory[]>(DEMO_MATCH_HISTORY_KEY, [])
  if (stored.length === 0) {
    setItem(DEMO_MATCH_HISTORY_KEY, DEFAULT_DEMO_MATCH_HISTORY)
    // Refilter in case the default data is used for the first time
    return DEFAULT_DEMO_MATCH_HISTORY.filter(
      (match) => match.host_id === profileId || match.guest_id === profileId
    ).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }
  return stored.filter(
    (match) => match.host_id === profileId || match.guest_id === profileId
  ).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function addDemoMatchHistoryEntry(entry: MatchHistory): void {
  const currentHistory = getItem<MatchHistory[]>(DEMO_MATCH_HISTORY_KEY, DEFAULT_DEMO_MATCH_HISTORY)
  currentHistory.unshift(entry) // Add to the beginning for most recent first
  setItem(DEMO_MATCH_HISTORY_KEY, currentHistory)
}
