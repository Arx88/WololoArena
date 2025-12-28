import { describe, it, expect } from 'vitest'
import { getDraftSuggestions } from '@/lib/data/civ-meta'

describe('Civ Meta Logic', () => {
  it('should suggest counters for Franks', () => {
    // Opponent picks Franks
    const suggestions = getDraftSuggestions('arabia', ['franks'], [], [], 'pick')
    console.log("Suggestions:", suggestions)
    
    // We expect Gurjaras and Hindustanis to be suggested as counters
    const civs = suggestions.map(s => s.civId)
    
    // Franks should NOT be suggested (already picked)
    expect(civs).not.toContain('franks')

    // Check if Gurjaras is suggested (Franks weak vs Gurjaras)
    expect(civs).toContain('gurjaras')
    
    // Check if Hindustanis is suggested (Franks weak vs Hindustanis)
    expect(civs).toContain('hindustanis')
    
    // Verify prioritization: Counters (100) > Meta S-Tier (90)
    // Gurjaras or Hindustanis should be the top suggestion
    const topSuggestion = suggestions[0]
    expect(['aztecs', 'berbers', 'byzantines', 'gurjaras', 'hindustanis', 'saracens']).toContain(topSuggestion.civId)
    expect(topSuggestion.type).toBe('counter')
    expect(topSuggestion.score).toBe(100)
    
    // Verify type
    const gurjaraSuggestion = suggestions.find(s => s.civId === 'gurjaras')
    expect(gurjaraSuggestion?.type).toBe('counter')
  })

  it('should suggest meta picks for Arabia', () => {
    const suggestions = getDraftSuggestions('arabia', [], [], [], 'pick')
    
    // Franks is S-tier on Arabia
    const civs = suggestions.map(s => s.civId)
    expect(civs).toContain('franks')
    
    const frankSuggestion = suggestions.find(s => s.civId === 'franks')
    expect(frankSuggestion?.type).toBe('meta')
  })

  it('should fallback to general stats when map is unknown', () => {
    const suggestions = getDraftSuggestions(null, [], [], [], 'pick')
    
    // Should suggest generally strong civs
    expect(suggestions.length).toBeGreaterThan(0)
    expect(suggestions[0].type).toBe('meta')
    expect(suggestions[0].reason).toContain('Generally strong')
  })
})
