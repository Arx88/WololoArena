import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
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

vi.mock('@/lib/i18n/language-context', () => ({
  useLanguage: () => ({ t: (key: string) => key })
}))

// Mock Supabase
const mockSubscribe = vi.fn()
const mockOn = vi.fn().mockReturnValue({ subscribe: mockSubscribe })
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

// Mock Sub-components to isolate DraftInterface logic
vi.mock('@/components/draft/draft-header', () => ({ DraftHeader: (props: any) => <div data-testid="draft-header">{props.phase}</div> }))
vi.mock('@/components/draft/draft-timer', () => ({ DraftTimer: () => <div data-testid="draft-timer" /> }))
vi.mock('@/components/draft/draft-progress', () => ({ DraftProgress: () => <div data-testid="draft-progress" /> }))
vi.mock('@/components/draft/player-panel', () => ({ PlayerPanel: () => <div data-testid="player-panel" /> }))
vi.mock('@/components/draft/civilization-grid', () => ({ CivilizationGrid: () => <div data-testid="civ-grid" /> }))
vi.mock('@/components/draft/map-grid', () => ({ MapGrid: () => <div data-testid="map-grid" /> }))
vi.mock('@/components/draft/game-mode-roll', () => ({ GameModeRoll: () => <div data-testid="mode-roll" /> }))
vi.mock('@/components/draft/draft-complete', () => ({ DraftComplete: () => <div data-testid="draft-complete" /> }))
vi.mock('@/components/draft/draft-chat', () => ({ DraftChat: () => <div data-testid="draft-chat" /> }))
vi.mock('@/components/draft/spectator-panel', () => ({ SpectatorPanel: () => <div data-testid="spectator-panel" /> }))
vi.mock('@/components/draft/draft-assist-panel', () => ({ DraftAssistPanel: () => <div data-testid="assist-panel" /> }))
vi.mock('@/components/draft/coin-flip', () => ({ CoinFlip: () => <div data-testid="coin-flip-component" /> }))

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
    enable_coin_flip: true, pre_draft_bans: 0
  },
  created_at: '', updated_at: ''
}

const initialDraft: Draft = {
  id: 'draft-1',
  lobby_id: 'lobby-1',
  current_phase: 'coin_flip', // Start in coin flip
  current_step_index: 0,
  current_turn: 'host-1',
  phase_end_time: null,
  host_civ_bans: [], guest_civ_bans: [], host_civ_picks: [], guest_civ_picks: [],
  host_map_bans: [], guest_map_bans: [], host_map_picks: [], guest_map_picks: [],
  host_home_map: null, guest_home_map: null, final_map: null, neutral_map: null,
  selected_game_mode: null,
  turn_number: 0,
  coin_flip_winner: null,
  first_picker: null,
  created_at: '', updated_at: ''
}

describe('DraftInterface - Coin Flip Flow', () => {
  it('should render Coin Flip phase correctly', () => {
    render(
      <DraftInterface 
        lobby={mockLobby} 
        initialDraft={initialDraft} 
        userId="host-1" 
        hostProfile={{ id: 'host-1', username: 'Host' } as any} 
        guestProfile={{ id: 'guest-1', username: 'Guest' } as any} 
        isHost={true} 
      />
    )

    // Check header
    expect(screen.getByTestId('draft-header')).toHaveTextContent('Lanzamiento de Moneda')
    
    // Check component
    expect(screen.getByTestId('coin-flip-component')).toBeInTheDocument()

    // Check that draft interface elements are NOT present (dedicated view)
    expect(screen.queryByTestId('player-panel')).not.toBeInTheDocument()
    expect(screen.queryByTestId('civ-grid')).not.toBeInTheDocument()
    expect(screen.queryByTestId('draft-progress')).not.toBeInTheDocument()
  })
})
