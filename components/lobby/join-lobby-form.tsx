"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users } from "lucide-react"
import { isDemoMode } from "@/lib/demo/auth"
import { useLanguage } from "@/lib/i18n/language-context"

interface JoinLobbyFormProps {
  userId: string
}

export function JoinLobbyForm({ userId }: JoinLobbyFormProps) {
  const router = useRouter()
  const { t } = useLanguage()
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleJoinLobby = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (isDemoMode()) {
      await new Promise((r) => setTimeout(r, 500))
      // In demo mode, redirect to a demo lobby
      const demoLobbyId = `demo-join-${Date.now()}`
      localStorage.setItem(
        "demo_lobby_data",
        JSON.stringify({
          settings: {
            ban_time: 30,
            pick_time: 45,
            civ_bans: 3,
            civ_picks: 1,
            enable_civ_bans: true,
            enable_civ_picks: true,
            enable_game_mode_roll: true,
          },
          visibility: "private",
          isGuest: true,
        }),
      )
      router.push(`/lobby/${demoLobbyId}`)
      return
    }

    const supabase = createClient()

    try {
      // Find lobby by code
      const { data: lobby, error: findError } = await supabase
        .from("lobbies")
        .select("*")
        .eq("code", code.toUpperCase())
        .single()

      if (findError || !lobby) {
        throw new Error(t("lobbyNotFound"))
      }

      if (lobby.host_id === userId) {
        // Host is rejoining their own lobby
        router.push(`/lobby/${lobby.id}`)
        return
      }

      if (lobby.guest_id && lobby.guest_id !== userId) {
        throw new Error(t("lobbyFull"))
      }

      if (lobby.status === "completed") {
        throw new Error(t("draftCompleted"))
      }

      // Join as guest
      const { error: updateError } = await supabase
        .from("lobbies")
        .update({
          guest_id: userId,
          status: lobby.status === "waiting" ? "ready" : lobby.status,
        })
        .eq("id", lobby.id)

      if (updateError) throw updateError

      router.push(`/lobby/${lobby.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : t("failedToJoin"))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-white/10 bg-[#0a0a0b]/60 backdrop-blur-md shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Users className="h-5 w-5 text-yellow-500" />
          {t("joinExistingLobby")}
        </CardTitle>
        <CardDescription className="text-white/40">{t("enterLobbyCode")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleJoinLobby} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="lobby-code" className="text-white/80">{t("lobbyCode")}</Label>
            <Input
              id="lobby-code"
              type="text"
              placeholder={isDemoMode() ? t("demoLobbyCode") : "ABC123"}
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              maxLength={6}
              className="bg-black/20 border-white/10 text-center text-2xl font-bold tracking-[0.5em] uppercase text-white placeholder:text-white/20 focus-visible:ring-yellow-500"
              required
            />
            <p className="text-xs text-white/40 text-center">{t("enterSixChar")}</p>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button
            type="submit"
            className="w-full h-12 text-lg font-bold uppercase tracking-wider bg-yellow-600 hover:bg-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:shadow-[0_0_30px_rgba(234,179,8,0.6)] transition-all duration-300"
            disabled={isLoading || code.length < 4}
          >
            {isLoading ? t("joiningLobby") : t("joinLobby")}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
