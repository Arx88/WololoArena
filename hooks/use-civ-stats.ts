"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export interface CivStat {
  civ_id: string
  map_id: string | null
  total_picks: number
  total_bans: number
  total_wins: number
  total_losses: number
  win_rate: number
  pick_rate: number
  ban_rate: number
}

// Demo stats for offline mode
const DEMO_CIV_STATS: Record<string, Partial<CivStat>> = {
  Franks: { total_picks: 1250, total_bans: 890, total_wins: 680, total_losses: 570 },
  Britons: { total_picks: 1100, total_bans: 750, total_wins: 590, total_losses: 510 },
  Mayans: { total_picks: 980, total_bans: 1200, total_wins: 550, total_losses: 430 },
  Chinese: { total_picks: 850, total_bans: 650, total_wins: 480, total_losses: 370 },
  Mongols: { total_picks: 920, total_bans: 880, total_wins: 510, total_losses: 410 },
  Vikings: { total_picks: 780, total_bans: 420, total_wins: 430, total_losses: 350 },
  Aztecs: { total_picks: 890, total_bans: 950, total_wins: 520, total_losses: 370 },
  Huns: { total_picks: 1050, total_bans: 720, total_wins: 580, total_losses: 470 },
  Persians: { total_picks: 650, total_bans: 380, total_wins: 340, total_losses: 310 },
  Byzantines: { total_picks: 420, total_bans: 280, total_wins: 210, total_losses: 210 },
  Japanese: { total_picks: 380, total_bans: 250, total_wins: 200, total_losses: 180 },
  Turks: { total_picks: 290, total_bans: 180, total_wins: 140, total_losses: 150 },
}

export function useCivStats(mapId?: string, isDemo = false) {
  const supabase = createClient()
  const [stats, setStats] = useState<CivStat[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      if (isDemo) {
        // Generate demo stats
        const demoStats: CivStat[] = Object.entries(DEMO_CIV_STATS).map(([civId, data]) => {
          const totalGames = (data.total_wins || 0) + (data.total_losses || 0)
          const totalAll = Object.values(DEMO_CIV_STATS).reduce((sum, s) => sum + (s.total_picks || 0), 0)
          return {
            civ_id: civId,
            map_id: mapId || null,
            total_picks: data.total_picks || 0,
            total_bans: data.total_bans || 0,
            total_wins: data.total_wins || 0,
            total_losses: data.total_losses || 0,
            win_rate: totalGames > 0 ? Math.round(((data.total_wins || 0) / totalGames) * 100) : 0,
            pick_rate: totalAll > 0 ? Math.round(((data.total_picks || 0) / totalAll) * 100) : 0,
            ban_rate: totalAll > 0 ? Math.round(((data.total_bans || 0) / totalAll) * 100) : 0,
          }
        })
        setStats(demoStats.sort((a, b) => b.win_rate - a.win_rate))
        setIsLoading(false)
        return
      }

      try {
        let query = supabase.from("civ_stats").select("*")
        if (mapId) {
          query = query.eq("map_id", mapId)
        } else {
          query = query.is("map_id", null)
        }

        const { data } = await query

        if (data) {
          const totalPicks = data.reduce((sum, s) => sum + s.total_picks, 0)
          const formattedStats: CivStat[] = data.map((s) => {
            const totalGames = s.total_wins + s.total_losses
            return {
              ...s,
              win_rate: totalGames > 0 ? Math.round((s.total_wins / totalGames) * 100) : 0,
              pick_rate: totalPicks > 0 ? Math.round((s.total_picks / totalPicks) * 100) : 0,
              ban_rate: totalPicks > 0 ? Math.round((s.total_bans / totalPicks) * 100) : 0,
            }
          })
          setStats(formattedStats.sort((a, b) => b.win_rate - a.win_rate))
        }
      } catch (err) {
        console.error("Error loading civ stats:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [mapId, isDemo, supabase])

  const getStatForCiv = (civId: string): CivStat | undefined => {
    return stats.find((s) => s.civ_id.toLowerCase() === civId.toLowerCase())
  }

  return {
    stats,
    isLoading,
    getStatForCiv,
  }
}
