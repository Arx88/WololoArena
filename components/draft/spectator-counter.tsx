"use client"

import { useEffect, useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Badge } from "@/components/ui/badge"
import { Eye, Radio } from "lucide-react"

interface SpectatorCounterProps {
  draftId: string
  visibility: "public" | "private"
}

export function SpectatorCounter({ draftId, visibility }: SpectatorCounterProps) {
  const [count, setCount] = useState(0)
  const [isLive, setIsLive] = useState(true)
  const supabase = createClient()
  const sessionIdRef = useRef<string>("")

  useEffect(() => {
    // Only track for public drafts
    if (visibility !== "public") return

    // Generate or retrieve session ID
    let sessionId = sessionStorage.getItem("spectator_session_id")
    if (!sessionId) {
      sessionId = `spectator-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
      sessionStorage.setItem("spectator_session_id", sessionId)
    }
    sessionIdRef.current = sessionId

    // Register as spectator
    const registerSpectator = async () => {
      await supabase.from("draft_spectators").upsert(
        {
          draft_id: draftId,
          session_id: sessionId,
          last_seen: new Date().toISOString(),
        },
        { onConflict: "draft_id,session_id" },
      )
    }

    // Fetch initial count
    const fetchCount = async () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
      const { count: spectatorCount } = await supabase
        .from("draft_spectators")
        .select("*", { count: "exact", head: true })
        .eq("draft_id", draftId)
        .gte("last_seen", fiveMinutesAgo)

      setCount(spectatorCount || 0)
    }

    registerSpectator()
    fetchCount()

    // Keep alive every 30 seconds
    const keepAlive = setInterval(() => {
      registerSpectator()
      fetchCount()
    }, 30000)

    // Subscribe to realtime changes
    const channel = supabase
      .channel(`spectators-${draftId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "draft_spectators", filter: `draft_id=eq.${draftId}` },
        () => {
          fetchCount()
        },
      )
      .subscribe((status) => {
        setIsLive(status === "SUBSCRIBED")
      })

    // Cleanup on unmount
    return () => {
      clearInterval(keepAlive)
      supabase.removeChannel(channel)
      // Remove spectator entry
      supabase.from("draft_spectators").delete().eq("draft_id", draftId).eq("session_id", sessionIdRef.current)
    }
  }, [draftId, visibility, supabase])

  if (visibility !== "public") return null

  return (
    <Badge variant="secondary" className="flex items-center gap-1.5 bg-red-500/10 text-red-500 border-red-500/20">
      <Radio className={`h-3 w-3 ${isLive ? "animate-pulse" : ""}`} />
      <Eye className="h-3.5 w-3.5" />
      <span className="font-medium">{count}</span>
      <span className="text-[10px] opacity-80">EN VIVO</span>
    </Badge>
  )
}
