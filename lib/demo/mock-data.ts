import type { Lobby, Draft, Profile, MatchHistory, LobbySettings } from "@/lib/types/draft"
import { DEMO_USER, DEMO_OPPONENT } from "./auth"

export const DEMO_SETTINGS: LobbySettings = {
  ban_time: 30,
  pick_time: 45,
  civ_bans: 3,
  civ_picks: 1,
  map_bans: 2,
  map_picks: 1,
  civ_pool: "all",
  game_modes: ["random_map", "empire_wars"],
  enable_civ_bans: true,
  enable_civ_picks: true,
  enable_game_mode_roll: true,
  enable_coin_flip: true,
  map_mode: "ban_until_one",
}

export const DEMO_LOBBY: Lobby = {
  id: "demo-lobby-001",
  code: "AOE2GG",
  host_id: DEMO_USER.id,
  guest_id: DEMO_OPPONENT.id,
  status: "ready",
  settings: DEMO_SETTINGS,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export const DEMO_DRAFT: Draft = {
  id: "demo-draft-001",
  lobby_id: DEMO_LOBBY.id,
  current_phase: "civ_ban",
  current_turn: DEMO_USER.id,
  phase_end_time: new Date(Date.now() + 30000).toISOString(),
  host_civ_bans: [],
  guest_civ_bans: [],
  host_civ_picks: [],
  guest_civ_picks: [],
  host_map_bans: [],
  guest_map_bans: [],
  host_map_picks: [],
  guest_map_picks: [],
  selected_game_mode: null,
  turn_number: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export const DEMO_HOST_PROFILE: Profile = {
  id: DEMO_USER.id,
  username: DEMO_USER.username,
  avatar_url: null,
  favorite_civs: ["franks", "britons", "mayans"],
  favorite_maps: ["arabia", "arena", "black_forest"],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export const DEMO_GUEST_PROFILE: Profile = {
  id: DEMO_OPPONENT.id,
  username: DEMO_OPPONENT.username,
  avatar_url: null,
  favorite_civs: ["mongols", "aztecs", "chinese"],
  favorite_maps: ["arabia", "islands", "nomad"],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export const DEMO_MATCH_HISTORY: MatchHistory[] = [
  {
    id: "match-001",
    draft_id: "draft-001",
    host_id: DEMO_USER.id,
    guest_id: DEMO_OPPONENT.id,
    host_civ: "franks",
    guest_civ: "mongols",
    map: "arabia",
    game_mode: "random_map",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "match-002",
    draft_id: "draft-002",
    host_id: DEMO_OPPONENT.id,
    guest_id: DEMO_USER.id,
    host_civ: "britons",
    guest_civ: "chinese",
    map: "arena",
    game_mode: "empire_wars",
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "match-003",
    draft_id: "draft-003",
    host_id: DEMO_USER.id,
    guest_id: DEMO_OPPONENT.id,
    host_civ: "mayans",
    guest_civ: "aztecs",
    map: "black_forest",
    game_mode: "random_map",
    created_at: new Date(Date.now() - 259200000).toISOString(),
  },
]
