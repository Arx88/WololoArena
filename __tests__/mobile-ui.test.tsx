import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Navbar } from '@/components/navbar'

// Mock dependencies
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn() })
}))

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => null
}))

vi.mock('@/lib/demo/auth', () => ({
  isDemoMode: () => false,
  getDemoUser: () => null,
  setDemoMode: vi.fn()
}))

vi.mock('@/lib/i18n/language-context', () => ({
  useLanguage: () => ({ t: (key: string) => key }),
  LanguageProvider: ({ children }: any) => <div>{children}</div>
}))

// Mock Sub-components
vi.mock('@/components/language-switcher', () => ({ LanguageSwitcher: () => <div /> }))

// Mock Image
vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />
}))

describe('Navbar Mobile UI', () => {
  it('should toggle mobile menu on click', () => {
    render(<Navbar />)
    
    // Menu content should not be visible initially
    expect(screen.queryByTestId('mobile-menu-content')).not.toBeInTheDocument()
    
    // Find toggle button
    const toggleButton = screen.getByTestId('mobile-menu-toggle')
    
    // Click to open
    fireEvent.click(toggleButton)
    expect(screen.getByTestId('mobile-menu-content')).toBeInTheDocument()
    
    // Click to close
    fireEvent.click(toggleButton)
    expect(screen.queryByTestId('mobile-menu-content')).not.toBeInTheDocument()
  })
})
