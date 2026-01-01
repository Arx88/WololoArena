import { describe, it, expect } from 'vitest'
import { CIVILIZATIONS } from '@/lib/data/civilizations'
import fs from 'fs'
import path from 'path'

describe('Data Validation', () => {
  it('should have correct number of civilizations', () => {
    expect(CIVILIZATIONS.length).toBe(50)
  })

  it('should match names from civisINFO.md', () => {
    const mdPath = path.resolve(__dirname, '../civisINFO.md')
    const mdContent = fs.readFileSync(mdPath, 'utf-8')
    
    // Regex to match "3.1. Armenios (Armenians)"
    // We only care about section 3
    const matches = [...mdContent.matchAll(/^3\.\d+\.\s+[^\(]+\(([\w\s]+)\)/gm)]
    const mdNames = matches.map(m => m[1].trim())

    const dbNames = CIVILIZATIONS.map(c => c.name)
    
    // Check if all MD names exist in DB
    const missingInDb = mdNames.filter(name => !dbNames.includes(name))
    
    expect(missingInDb).toEqual([])
  })
})
