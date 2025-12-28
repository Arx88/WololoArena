import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, act } from '@testing-library/react'
import { DraftInterface } from '@/components/draft/draft-interface'
import { Lobby, Draft } from '@/lib/types/draft'

// Mock dependencies
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() })
}))

vi.mock('@/lib/demo/auth', () => ({
  isDemoMode: () => false,
  DEMO_OPPONENT: { id: 'demo-bot' }
}))

// Mock PlayerPanel to capture props
const { PlayerPanelMock } = vi.hoisted(() => ({
  PlayerPanelMock: vi.fn((props: any) => {
    console.log("PlayerPanel rendered with civBans:", props.civBans)
    return <div data-testid="player-panel" />
  })
}))
vi.mock('@/components/draft/player-panel', () => ({ PlayerPanel: (props: any) => PlayerPanelMock(props) }))

// Mock Sub-components to avoid deep rendering
vi.mock('@/components/draft/draft-header', () => ({ DraftHeader: () => <div data-testid="draft-header" /> }))
vi.mock('@/components/draft/civilization-grid', () => ({ CivilizationGrid: () => <div data-testid="civ-grid" /> }))
vi.mock('@/components/draft/map-grid', () => ({ MapGrid: () => <div data-testid="map-grid" /> }))
vi.mock('@/components/draft/game-mode-roll', () => ({ GameModeRoll: () => <div data-testid="mode-roll" /> }))
vi.mock('@/components/draft/draft-complete', () => ({ DraftComplete: () => <div data-testid="draft-complete" /> }))
vi.mock('@/components/draft/draft-chat', () => ({ DraftChat: () => <div data-testid="draft-chat" /> }))
vi.mock('@/components/draft/spectator-panel', () => ({ SpectatorPanel: () => <div data-testid="spectator-panel" /> }))
vi.mock('@/components/draft/draft-assist-panel', () => ({ DraftAssistPanel: () => <div data-testid="assist-panel" /> }))

// Mock Supabase
const mockSubscribe = vi.fn()
const mockOn = vi.fn().mockImplementation((event, filter, callback) => {
  // Store callback to trigger it later
  (global as any).supabaseCallback = callback
  return { subscribe: mockSubscribe }
})
const mockChannel = vi.fn().mockReturnValue({ on: mockOn })
const mockRemoveChannel = vi.fn()
const mockFrom = vi.fn().mockReturnValue({ update: vi.fn().mockResolvedValue({}) })

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    channel: mockChannel,
    removeChannel: mockRemoveChannel,
    from: mockFrom
  })
}))

const mockLobby: Lobby = {
  id: 'lobby-1',
  code: '1234',
  host_id: 'host-1',
  guest_id: 'guest-1',
  status: 'drafting',
  visibility: 'public',
  settings: {
    ban_time: 30, pick_time: 30, civ_bans: 1, civ_picks: 1, map_bans: 0, map_picks: 0,
    civ_pool: 'all', map_pool: [], game_modes: [],
    enable_civ_bans: true, enable_civ_picks: true, enable_map_bans: false, enable_game_mode_roll: false,
    map_settings: { mode: 'disabled', pool: [], bans_per_player: 0, allow_same_home_map: false, enable_neutral_map: false, neutral_map_pool: [] },
    enable_coin_flip: false, pre_draft_bans: 0
  },
  created_at: '', updated_at: ''
}

const initialDraft: Draft = {
  id: 'draft-1',
  lobby_id: 'lobby-1',
  current_phase: 'civ_ban',
  current_step_index: 0,
  current_turn: 'host-1',
  phase_end_time: null,
  host_civ_bans: [],
  guest_civ_bans: [],
  host_civ_picks: [],
  guest_civ_picks: [],
  host_map_bans: [],
  guest_map_bans: [],
  host_map_picks: [],
  guest_map_picks: [],
  host_home_map: null,
  guest_home_map: null,
  final_map: null,
  neutral_map: null,
  selected_game_mode: null,
  turn_number: 1,
  coin_flip_winner: null,
  first_picker: null,
  created_at: '',
  updated_at: ''
}

describe('DraftInterface - Realtime Sync', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(global as any).supabaseCallback = null
  })

  it('should subscribe to draft updates', () => {
    render(
      <DraftInterface 
        lobby={mockLobby} 
        initialDraft={initialDraft} 
        userId="host-1" 
        hostProfile={null} 
        guestProfile={null} 
        isHost={true} 
      />
    )

    expect(mockChannel).toHaveBeenCalledWith(`draft-updates-${initialDraft.id}`)
    expect(mockOn).toHaveBeenCalled()
    expect(mockSubscribe).toHaveBeenCalled()
  })

  it('should update local state when a realtime update is received', () => {
    render(
      <DraftInterface 
        lobby={mockLobby} 
        initialDraft={initialDraft} 
        userId="host-1" 
        hostProfile={null} 
        guestProfile={null} 
        isHost={true} 
      />
    )

    // Verify initial state (passed to PlayerPanel props)
    // Note: Since we mocked PlayerPanel, we can't easily check its props without more complex setup or component inspection.
    // But we know 'host_civ_bans' is empty.

    // Trigger update
    const updatedDraft = { ...initialDraft, host_civ_bans: ['Aztecs'] }
    
    act(() => {
      if ((global as any).supabaseCallback) {
        (global as any).supabaseCallback({ new: updatedDraft })
      }
    })

    // Verify PlayerPanel (Host) received the new bans
    const hostCalls = PlayerPanelMock.mock.calls.filter(args => args[0].role === 'host')
    const lastHostCall = hostCalls[hostCalls.length - 1][0]
    expect(lastHostCall.civBans).toContain('Aztecs')
  })
})
