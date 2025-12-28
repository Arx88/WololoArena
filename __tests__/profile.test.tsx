import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import ProfilePage from '@/app/profile/page'

// Mock dependencies
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() })
}))

vi.mock('@/lib/demo/auth', () => ({
  isDemoMode: () => false,
  getDemoUser: () => null,
  getDemoProfile: () => null
}))

vi.mock('@/lib/i18n/language-context', () => ({
  useLanguage: () => ({ t: (key: string) => key })
}))

// Mock Sub-components
vi.mock('@/components/navbar', () => ({ Navbar: () => <div data-testid="navbar" /> }))
vi.mock('@/components/footer', () => ({ Footer: () => <div data-testid="footer" /> }))
vi.mock('@/components/profile/profile-view', () => ({ ProfileView: (props: any) => (
  <div data-testid="profile-view">
    <span data-testid="username">{props.profile?.username}</span>
    <span data-testid="history-count">{props.matchHistory?.length}</span>
  </div>
) }))

// Mock Supabase
const mockUser = { id: 'user-1', email: 'test@example.com' }
const mockProfile = { id: 'user-1', username: 'TestUser', favorite_civs: [], favorite_maps: [] }
const mockHistory = [{ id: 'match-1' }, { id: 'match-2' }]

const mockFrom = vi.fn()

vi.mock('@/lib/supabase/client', () => ({
  getSupabaseClient: () => ({
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: mockUser } })
    },
    from: mockFrom
  })
}))

describe('ProfilePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should load profile and match history', async () => {
    // Setup Supabase mocks
    mockFrom.mockImplementation((table) => {
      if (table === 'profiles') {
        return {
          select: () => ({
            eq: () => ({
              single: () => Promise.resolve({ data: mockProfile, error: null })
            })
          })
        }
      }
      if (table === 'match_history') {
        return {
          select: () => ({
            or: () => ({
              order: () => ({
                limit: () => Promise.resolve({ data: mockHistory, error: null })
              })
            })
          })
        }
      }
      return {}
    })

    render(<ProfilePage />)

    // Initially loading
    expect(screen.getByText('loadingProfile...')).toBeInTheDocument()

    // Wait for data
    await waitFor(() => {
      expect(screen.getByTestId('profile-view')).toBeInTheDocument()
    })

    expect(screen.getByTestId('username')).toHaveTextContent('TestUser')
    expect(screen.getByTestId('history-count')).toHaveTextContent('2')
  })

  it('should create profile if not found', async () => {
    // Setup Supabase mocks for 404 profile
    const mockInsert = vi.fn().mockReturnValue({
        select: () => ({
            single: () => Promise.resolve({ data: mockProfile, error: null })
        })
    })

    mockFrom.mockImplementation((table) => {
      if (table === 'profiles') {
        return {
          select: () => ({
            eq: () => ({
              single: () => Promise.resolve({ data: null, error: { code: 'PGRST116' } })
            })
          }),
          insert: mockInsert
        }
      }
      if (table === 'match_history') {
        return {
          select: () => ({
            or: () => ({
              order: () => ({
                limit: () => Promise.resolve({ data: [], error: null })
              })
            })
          })
        }
      }
      return {}
    })

    render(<ProfilePage />)

    await waitFor(() => {
      expect(screen.getByTestId('profile-view')).toBeInTheDocument()
    })

    expect(mockInsert).toHaveBeenCalledWith({
      id: mockUser.id,
      username: 'test', // email split of test@example.com
      favorite_civs: [],
      favorite_maps: []
    })
  })
})
