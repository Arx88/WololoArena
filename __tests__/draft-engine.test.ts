import { describe, it, expect } from 'vitest'
import { calculateDraftState, processSelection, handleTimeout } from '@/lib/draft-engine'
import { Draft, Lobby, Preset, DraftStep } from '@/lib/types/draft'

// Mock Data
const mockLobby: Lobby = {
  id: 'lobby-1',
  code: '1234',
  host_id: 'host-1',
  guest_id: 'guest-1',
  status: 'drafting',
  visibility: 'public',
  settings: {
    ban_time: 30,
    pick_time: 30,
    civ_bans: 1,
    civ_picks: 1,
    map_bans: 0,
    map_picks: 0,
    civ_pool: 'all',
    map_pool: [],
    game_modes: [],
    enable_civ_bans: true,
    enable_civ_picks: true,
    enable_map_bans: false,
    enable_game_mode_roll: false,
    map_settings: {
        mode: 'disabled',
        pool: [],
        bans_per_player: 0,
        allow_same_home_map: false,
        enable_neutral_map: false,
        neutral_map_pool: []
    },
    enable_coin_flip: false,
    pre_draft_bans: 0
  },
  created_at: '',
  updated_at: ''
}

const mockPreset: Preset = {
  id: 'preset-captains',
  name: 'Captains Mode',
  is_official: true,
  steps: [
    { id: '1', phase: 'Host Ban', actor: 'host', action: 'ban', target: 'civ', count: 1 },
    { id: '2', phase: 'Guest Ban', actor: 'guest', action: 'ban', target: 'civ', count: 1 },
    { id: '3', phase: 'Host Pick', actor: 'host', action: 'pick', target: 'civ', count: 1 },
    { id: '4', phase: 'Guest Pick', actor: 'guest', action: 'pick', target: 'civ', count: 1 },
  ]
}

const initialDraft: Draft = {
  id: 'draft-1',
  lobby_id: 'lobby-1',
  current_phase: 'Host Ban' as any,
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

describe('Draft Engine - Captains Mode', () => {
  it('should calculate the correct initial state', () => {
    const state = calculateDraftState(initialDraft, mockLobby, mockPreset)
    expect(state.nextPhase).toBe('Host Ban')
    expect(state.nextTurn).toBe('host-1')
    expect(state.nextStep).toEqual(mockPreset.steps[0])
    expect(state.isComplete).toBe(false)
  })

  it('should process a Host Ban correctly', () => {
    const update = processSelection(initialDraft, mockLobby, mockPreset, 'Aztecs')
    
    expect(update).not.toBeNull()
    expect(update?.host_civ_bans).toContain('Aztecs')
    expect(update?.current_step_index).toBe(1)
    expect(update?.current_phase).toBe('Guest Ban')
    expect(update?.current_turn).toBe('guest-1')
  })

  it('should process a full sequence', () => {
    // Step 1: Host Ban
    let draft = { ...initialDraft }
    let update = processSelection(draft, mockLobby, mockPreset, 'Aztecs')
    draft = { ...draft, ...update } as Draft

    expect(draft.host_civ_bans).toEqual(['Aztecs'])
    expect(draft.current_turn).toBe('guest-1')

    // Step 2: Guest Ban
    update = processSelection(draft, mockLobby, mockPreset, 'Mayans')
    draft = { ...draft, ...update } as Draft

    expect(draft.guest_civ_bans).toEqual(['Mayans'])
    expect(draft.current_turn).toBe('host-1')

    // Step 3: Host Pick
    update = processSelection(draft, mockLobby, mockPreset, 'Franks')
    draft = { ...draft, ...update } as Draft

    expect(draft.host_civ_picks).toEqual(['Franks'])
    expect(draft.current_turn).toBe('guest-1')

    // Step 4: Guest Pick
    update = processSelection(draft, mockLobby, mockPreset, 'Huns')
    draft = { ...draft, ...update } as Draft

    expect(draft.guest_civ_picks).toEqual(['Huns'])
    
    // Check completion
    const nextState = calculateDraftState(draft, mockLobby, mockPreset)
    expect(nextState.isComplete).toBe(true)
  })

  it('should prevent selecting a previously banned civ', () => {
    // Host bans Aztecs
    let draft = { ...initialDraft }
    let update = processSelection(draft, mockLobby, mockPreset, 'Aztecs')
    draft = { ...draft, ...update } as Draft

    // Guest tries to Pick Aztecs (which was banned)
    // We expect this to fail. Current implementation might allow it, so this test should FAIL (Red)
    // or we decide that validation happens outside. 
    // The spec says "Verify Standard Draft Flow", which implies validation.
    
    // Let's assume processSelection SHOULD validate.
    const invalidUpdate = processSelection(draft, mockLobby, mockPreset, 'Aztecs')
    expect(invalidUpdate).toBeNull() // Or expect it to throw
  })

  it('should handle timeout by picking a random available option', () => {
    // Setup: Host needs to Ban. Aztecs is pool.
    // We need to provide a pool in the lobby settings for this to work effectively?
    // In our mockLobby, civ_pool is 'all'.
    // Real implementation needs to know what "all" means. 
    // Ideally, we pass the "availableOptions" to handleTimeout or it derives it.
    // For this test, let's assume handleTimeout relies on lobby settings.
    
    // We'll mock the civ pool in lobby settings for control
    const lobbyWithPool = { 
        ...mockLobby, 
        settings: { 
            ...mockLobby.settings, 
            civ_pool: 'custom' as any,
            custom_civ_pool: ['Aztecs', 'Mayans', 'Franks'] 
        } 
    }

    const draft = { ...initialDraft, lobby_id: lobbyWithPool.id }
    
    const update = handleTimeout(draft, lobbyWithPool, mockPreset)
    
    expect(update).not.toBeNull()
    // It should have picked one of the 3
    expect(['Aztecs', 'Mayans', 'Franks']).toContain(update?.host_civ_bans?.[0])
    expect(update?.current_step_index).toBe(1)
  })
})
