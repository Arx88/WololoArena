"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Crown, Copy, Check, User, Swords, Clock, Shield, Map, CheckCircle, Loader2 } from "lucide-react"
import type { Lobby, Draft, Profile, LobbySettings } from "@/lib/types/draft"
import { isDemoMode } from "@/lib/demo/auth"
import { useLanguage } from "@/lib/i18n/language-context"
import { DraftChat } from "@/components/draft/draft-chat"
import { useSoundEffects } from "@/hooks/use-sound-effects"

interface LobbyRoomProps {
  lobby: Lobby
  draft: Draft | null
  userId: string
  hostProfile: Profile | null
  guestProfile: Profile | null
  isHost: boolean
  username: string
}

interface ReadyState {
  host_ready?: boolean
  guest_ready?: boolean
}

export function LobbyRoom({
  lobby: initialLobby,
  draft: initialDraft,
  userId,
  hostProfile,
  guestProfile: initialGuestProfile,
  isHost,
  username
}: LobbyRoomProps) {
  const router = useRouter()
  const { t } = useLanguage()
  const supabase = createClient()
  const { playSound } = useSoundEffects()
  
  const [lobby, setLobby] = useState(initialLobby)
  const [draft, setDraft] = useState(initialDraft)
  const [guestProfile, setGuestProfile] = useState(initialGuestProfile)
  const [copied, setCopied] = useState(false)
  const [isStarting, setIsStarting] = useState(false)
  const [isTogglingReady, setIsTogglingReady] = useState(false)
  const isDemo = isDemoMode()

  const settings = lobby.settings as LobbySettings & ReadyState
  const [hostReady, setHostReady] = useState(settings.host_ready || false)
  const [guestReady, setGuestReady] = useState(isDemo ? false : settings.guest_ready || false)
  const [countdown, setCountdown] = useState<number | null>(null)

  const hasGuest = isDemo ? true : !!lobby.guest_id
  const bothReady = hostReady && guestReady
  const startingRef = useRef(false)

  useEffect(() => {
    const newSettings = lobby.settings as LobbySettings & ReadyState
    setHostReady(newSettings.host_ready || false)
    setGuestReady(newSettings.guest_ready || false)
  }, [lobby.settings])

  useEffect(() => {
    if (countdown === null) return
    if (countdown > 0) playSound("tick")
    if (countdown === 0) {
      playSound("turn_start") 
      if (!startingRef.current) { startingRef.current = true; startDraftAfterCountdown(); }
      return
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown, playSound])

  useEffect(() => {
    if (bothReady && countdown === null && !startingRef.current) setCountdown(5)
    else if (!bothReady && countdown !== null) { setCountdown(null); startingRef.current = false; }
  }, [bothReady])

  useEffect(() => {
    if (isDemo) return
    const lobbyChannel = supabase.channel(`lobby-${lobby.id}`).on("postgres_changes", { event: "UPDATE", schema: "public", table: "lobbies", filter: `id=eq.${lobby.id}` }, async (payload) => {
      const updatedLobby = payload.new as Lobby; setLobby(updatedLobby)
      if (updatedLobby.guest_id && !guestProfile) {
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", updatedLobby.guest_id).single()
        if (profile) setGuestProfile(profile)
      }
      if (updatedLobby.status === "drafting") router.push(`/draft/${lobby.id}`)
    }).subscribe()
    return () => { supabase.removeChannel(lobbyChannel) }
  }, [lobby.id, supabase, router, guestProfile, isDemo])

  const copyCode = async () => {
    await navigator.clipboard.writeText(lobby.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleReady = async () => {
    if (isTogglingReady) return
    setIsTogglingReady(true)
    const newReadyState = isHost ? !hostReady : !guestReady
    if (isHost) setHostReady(newReadyState)
    else setGuestReady(newReadyState)

    if (isDemo) {
      if (newReadyState && isHost) setTimeout(() => setGuestReady(true), 1500)
      setIsTogglingReady(false)
      return
    }

    try {
      const updatedSettings = { ...lobby.settings, ...(isHost ? { host_ready: newReadyState } : { guest_ready: newReadyState }) }
      await supabase.from("lobbies").update({ settings: updatedSettings }).eq("id", lobby.id)
    } finally { setIsTogglingReady(false) }
  }

  const startDraftAfterCountdown = useCallback(async () => {
    setIsStarting(true)
    if (isDemo) {
      localStorage.setItem(`demo_lobby_data_${lobby.id}`, JSON.stringify({ settings: lobby.settings, host_id: lobby.host_id, guest_id: lobby.guest_id }));
      router.push(`/draft/${lobby.id}`); return;
    }
    try {
      const clearedSettings = { ...lobby.settings, host_ready: false, guest_ready: false }
      const coinFlipWinner = settings.enable_coin_flip ? (Math.random() > 0.5 ? lobby.host_id : lobby.guest_id) : null
      await supabase.from("drafts").insert({ lobby_id: lobby.id, current_phase: settings.enable_coin_flip ? "coin_flip" : "map_ban", current_turn: lobby.host_id, coin_flip_winner: coinFlipWinner, phase_end_time: new Date(Date.now() + 30000).toISOString() })
      await supabase.from("lobbies").update({ status: "drafting", settings: clearedSettings }).eq("id", lobby.id)
    } catch (err) { setCountdown(null); setIsStarting(false); startingRef.current = false; }
  }, [isDemo, lobby, router, settings, supabase])

  const statusBadge = {
    waiting: { label: t("lobbyWaiting"), variant: "secondary" as const },
    ready: { label: t("lobbyReady"), variant: "default" as const },
    drafting: { label: t("lobbyDrafting"), variant: "default" as const },
    completed: { label: t("completed"), variant: "outline" as const },
  }

  const displayStatus = isDemo ? "ready" : lobby.status

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#020202] text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.05)_0%,#020202_100%)] pointer-events-none" />
      <Navbar />
      
      <main className="flex-1 flex flex-col pt-24 px-6 max-w-5xl mx-auto w-full relative z-10 pb-20">
        <div className="flex flex-col items-center mb-12 shrink-0">
          <Badge variant="outline" className="mb-4 bg-yellow-500/10 text-yellow-400 border-yellow-500/30 px-3 py-1 text-xs">
            {statusBadge[displayStatus].label}
          </Badge>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white drop-shadow-xl mb-6">{t("draftRoom")}</h1>
          
          <button onClick={copyCode} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-8 py-4 transition-all hover:border-yellow-500/50">
            <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Lobby Code:</span>
            <span className="font-mono text-3xl font-bold tracking-[0.2em] text-white">{lobby.code}</span>
            {copied ? <Check className="h-6 w-6 text-emerald-400" /> : <Copy className="h-6 w-6 text-white/40" />}
          </button>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 relative mb-16">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center w-20 h-20 bg-black border-2 border-white/5 rounded-full shadow-2xl">
             <span className="font-black italic text-white/50 text-3xl">VS</span>
          </div>

          <div className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-500 p-10 flex flex-col items-center ${hostReady ? "bg-emerald-900/20 border-emerald-500/80 shadow-[0_0_40px_-10px_rgba(16,185,129,0.4)]" : "bg-[#0a0a0b]/80 border-yellow-500/50"}`}>
            <div className="relative mb-6">
               <div className={`w-32 h-32 rounded-full border-4 p-1 ${hostReady ? "border-emerald-500" : "border-yellow-500/50"}`}>
                  <div className="w-full h-full rounded-full bg-black/50 overflow-hidden flex items-center justify-center">
                     <User className={`h-16 w-16 ${hostReady ? "text-emerald-400" : "text-yellow-400"}`} />
                  </div>
               </div>
               {hostReady && <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-black rounded-full p-2 border-4 border-[#0a0a0b]"><CheckCircle className="h-6 w-6" /></div>}
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">{hostProfile?.username || "Commander"}</h3>
            <div className="flex items-center gap-2 text-yellow-500/80"><Crown className="h-5 w-5" /><span className="text-xs font-black uppercase tracking-widest">HOST</span></div>
          </div>

          <div className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-500 p-10 flex flex-col items-center ${guestReady ? "bg-emerald-900/20 border-emerald-500/80 shadow-[0_0_40px_-10px_rgba(16,185,129,0.4)]" : "bg-[#0a0a0b]/80 border-white/10 border-dashed"}`}>
            {hasGuest && guestProfile ? (
              <>
                <div className="relative mb-6">
                   <div className={`w-32 h-32 rounded-full border-4 p-1 ${guestReady ? "border-emerald-500" : "border-red-500/50"}`}>
                      <div className="w-full h-full rounded-full bg-black/50 overflow-hidden flex items-center justify-center">
                         <User className={`h-12 w-12 ${guestReady ? "text-emerald-400" : "text-red-400"}`} />
                      </div>
                   </div>
                   {guestReady && <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-black rounded-full p-2 border-4 border-[#0a0a0b]"><CheckCircle className="h-6 w-6" /></div>}
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{guestProfile.username}</h3>
                <div className="flex items-center gap-2 text-red-400/80"><Swords className="h-4 w-4" /><span className="text-xs font-black uppercase tracking-widest">CHALLENGER</span></div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center py-10 text-center">
                 <p className="text-white/40 font-bold text-xl mb-2">{t("waitingForOpponent")}</p>
                 <p className="text-sm text-white/20 uppercase tracking-widest">Awaiting rival signal...</p>
              </div>
            )}
          </div>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-8 py-6 border-y border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-4 px-6">
            <Clock className="h-8 w-8 text-yellow-500" />
            <div className="text-left"><p className="text-xs font-black text-white/40 uppercase">Time Control</p><p className="text-xl font-bold text-white leading-none">{settings.ban_time}s / {settings.pick_time}s</p></div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-4 px-6">
            <Shield className="h-8 w-8 text-red-500" />
            <div className="text-left"><p className="text-xs font-black text-white/40 uppercase">Structure</p><p className="text-xl font-bold text-white leading-none">{settings.civ_bans} Bans</p></div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-4 px-6">
            <Map className="h-8 w-8 text-emerald-500" />
            <div className="text-left"><p className="text-xs font-black text-white/40 uppercase">Battlefield</p><p className="text-xl font-bold text-white leading-none capitalize">{settings.civ_pool}</p></div>
          </div>
        </div>

        <div className="shrink-0">
          {hasGuest && countdown === null && (
            <Button onClick={toggleReady} disabled={isStarting || isTogglingReady} className={`w-full h-24 text-4xl font-black italic uppercase tracking-widest transition-all ${ (isHost ? hostReady : guestReady) ? "bg-transparent border-4 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.3)]" : "bg-yellow-600 hover:bg-yellow-500 text-black shadow-[0_0_40px_rgba(234,179,8,0.4)]" }`}>
               {isStarting ? <Loader2 className="h-12 w-12 animate-spin" /> : (isHost ? hostReady : guestReady) ? "AWAITING RIVAL" : "DECLARE READINESS"}
            </Button>
          )}
          {countdown !== null && (
            <div className="text-center"><span className="text-8xl font-black italic text-yellow-500 animate-ping">{countdown}</span></div>
          )}
        </div>
      </main>

      <DraftChat 
        draftId={initialDraft?.id || `pre-draft-${lobby.id}`}
        userId={userId}
        username={username}
        avatarUrl={isHost ? hostProfile?.avatar_url : guestProfile?.avatar_url}
        isDemo={isDemo}
        isHost={isHost}
        isParticipant={true}
      />
      
      <Footer />
    </div>
  )
}