import { describe, it, expect } from 'vitest'
import { getCounterComposition } from '@/lib/data/civilizations'

describe('Counter Logic', () => {
  it('should suggest counters for Goths (Infantry)', () => {
    const result = getCounterComposition(['goths'])
    
    const counterNames = result.counterCivs.map(c => c.name)
    expect(counterNames).toContain('Ethiopians')
    expect(result.vulnerabilities).toContain('Archers kite infantry easily')
  })

  it('should suggest counters for Franks (Cavalry)', () => {
    const result = getCounterComposition(['franks'])
    
    const counterNames = result.counterCivs.map(c => c.name)
    expect(counterNames).toContain('Gurjaras') // Camels counter cavalry
    expect(result.vulnerabilities).toContain('Vulnerable to camel civilizations')
  })
})
