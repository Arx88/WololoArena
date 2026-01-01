"use client"

import { Button } from "@/components/ui/button"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { DraftInterface } from "@/components/draft/draft-interface"
import { isDemoMode, DEMO_USER, DEMO_OPPONENT } from "@/lib/demo/auth"
import { DEMO_SETTINGS, DEMO_HOST_PROFILE, DEMO_GUEST_PROFILE } from "@/lib/demo/mock-data"
import type { Lobby, Draft, Profile, DraftPhase, MapSelectionMode } from "@/lib/types/draft"

interface DraftPageProps {
  params: Promise<{ id: string }>
}

function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}

function isDemoLobbyId(id: string): boolean {
  return id.startsWith("demo-lobby-") || id === "demo"
}

function getStartingPhase(settings: any): DraftPhase {
  // Coin flip comes FIRST if enabled
  if (settings.enable_coin_flip) {
    return "coin_flip"
  }

  const mapMode: MapSelectionMode = settings.map_mode || settings.map_settings?.mode || "ban_until_one"

  // Map phase comes FIRST now
  if (mapMode !== "disabled") {
    if (mapMode === "ban_until_one" || mapMode === "random_with_bans") {
      return "map_ban"
    } else if (mapMode === "random") {
      return "map_random"
    } else if (mapMode === "home_away") {
      return "map_pick"
    }
  }

  // Then civ phases
  if (settings.enable_civ_bans !== false && settings.civ_bans > 0) {
    return "civ_ban"
  }

  if (settings.enable_civ_picks !== false) {
    return "civ_pick"
  }

  // Then mode roll
  if (settings.enable_game_mode_roll !== false && settings.game_modes?.length > 0) {
    return "mode_roll"
  }

  return "completed"
}

export default function DraftPage({ params }: DraftPageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pageData, setPageData] = useState<{
    lobby: Lobby
    draft: Draft
    userId: string
    hostProfile: Profile | null
    guestProfile: Profile | null
    isHost: boolean
  } | null>(null)

  useEffect(() => {
    const loadData = async () => {
      const { id } = await params

      const demoMode = isDemoMode()
      const isDemoId = isDemoLobbyId(id)

      if (demoMode || isDemoId) {
        let settings = DEMO_SETTINGS
        const savedLobbyData = localStorage.getItem(`demo_lobby_data_${id}`) || localStorage.getItem("demo_lobby_data")
        if (savedLobbyData) {
          try {
            const parsed = JSON.parse(savedLobbyData)
            if (parsed.settings) {
              settings = parsed.settings
            }
          } catch (e) {
            console.log("[v0] DraftPage: Error parsing saved lobby data")
          }
        }

        const startPhase = getStartingPhase(settings)
        const coinFlipWinner = settings.enable_coin_flip ? (Math.random() > 0.5 ? DEMO_USER.id : DEMO_OPPONENT.id) : null

        let initialTurn: string | null = null
        if (startPhase === "coin_flip") {
          initialTurn = DEMO_USER.id // Host handles coin flip
        } else if (startPhase !== "map_random" && startPhase !== "mode_roll" && startPhase !== "completed") {
          // If no coin flip, host starts by default or based on first step
          initialTurn = DEMO_USER.id
        }

        const demoLobby: Lobby = {
          id,
          code: "AOE2GG",
          host_id: DEMO_USER.id,
          guest_id: DEMO_OPPONENT.id,
          status: "drafting",
          settings,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }

        const demoDraft: Draft = {
          id: `draft-${id}`,
          lobby_id: id,
          current_phase: startPhase,
          current_turn: initialTurn,
          phase_end_time: new Date(Date.now() + 30000).toISOString(),
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
          selected_game_mode: null,
          turn_number: 0,
          current_step_index: 0,
          coin_flip_winner: coinFlipWinner,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }

        setPageData({
          lobby: demoLobby,
          draft: demoDraft,
          userId: DEMO_USER.id,
          hostProfile: DEMO_HOST_PROFILE,
          guestProfile: DEMO_GUEST_PROFILE,
          isHost: true,
        })
        setIsLoading(false)
        return
      }

      if (!isValidUUID(id)) {
        console.error("[v0] Invalid lobby ID format:", id)
        setError("Invalid lobby ID")
        setIsLoading(false)
        return
      }

      // Real auth flow
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      const { data: lobby, error: lobbyError } = await supabase.from("lobbies").select("*").eq("id", id).single()

      if (lobbyError || !lobby) {
        console.error("[v0] Lobby fetch error:", lobbyError)
        setError("Lobby not found")
        setIsLoading(false)
        return
      }

      if (lobby.host_id !== user.id && lobby.guest_id !== user.id) {
        router.push("/lobby")
        return
      }

      const { data: draft, error: draftError } = await supabase.from("drafts").select("*").eq("lobby_id", id).single()

      if (draftError || !draft) {
        console.error("[v0] Draft fetch error:", draftError)
        setError("Draft not found. The draft may not have started yet.")
        setIsLoading(false)
        return
      }

      const userIds = [lobby.host_id, lobby.guest_id].filter(Boolean)
      const { data: profiles } = await supabase.from("profiles").select("*").in("id", userIds)

      const hostProfile = profiles?.find((p) => p.id === lobby.host_id) || null
      const guestProfile = profiles?.find((p) => p.id === lobby.guest_id) || null

      setPageData({
        lobby,
        draft,
        userId: user.id,
        hostProfile,
        guestProfile,
        isHost: lobby.host_id === user.id,
      })
      setIsLoading(false)
    }

    loadData()
  }, [params, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-destructive mb-2">Error</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => router.push("/lobby")}>Back to Lobby</Button>
        </div>
      </div>
    )
  }

  if (!pageData) {
    return null
  }

  return (
    <DraftInterface
      lobby={pageData.lobby}
      initialDraft={pageData.draft}
      userId={pageData.userId}
      hostProfile={pageData.hostProfile}
      guestProfile={pageData.guestProfile}
      isHost={pageData.isHost}
    />
  )
}
