"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Share2,
  User,
  Ban,
  Check,
  Loader2,
  Clock,
  ChevronLeft,
  ChevronRight,
  Trophy,
  X,
} from "lucide-react"
import { getCivilizationById, CIVILIZATIONS } from "@/lib/data/civilizations"
import { getMapById } from "@/lib/data/maps"
import { useLanguage } from "@/lib/i18n/language-context"
import type { Draft, Lobby, Profile } from "@/lib/types/draft"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { DraftComplete } from "@/components/draft/draft-complete"

interface DraftAction {
  type: "ban" | "pick"
  itemType: "civ" | "map"
  itemId: string
  player: "host" | "guest"
  index: number
}

interface ReplayPageProps {
  params: Promise<{ code: string }>
}

export default function DraftReplayPage({ params }: ReplayPageProps) {
  const router = useRouter()
  const { t, language } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [draft, setDraft] = useState<Draft | null>(null)
  const [lobby, setLobby] = useState<Lobby | null>(null)
  const [hostProfile, setHostProfile] = useState<Profile | null>(null)
  const [guestProfile, setGuestProfile] = useState<Profile | null>(null)

  // Replay state
  const [actions, setActions] = useState<DraftAction[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)

  useEffect(() => {
    const loadDraft = async () => {
      const { code } = await params

      // Check for demo draft
      if (code.startsWith("DEMO")) {
        // Load demo data
        const demoDraft: Draft = {
          id: "demo-draft-1",
          lobby_id: "demo-lobby-1",
          current_phase: "completed",
          current_turn: null,
          phase_end_time: null,
          host_civ_bans: ["Franks", "Mayans"],
          guest_civ_bans: ["Britons", "Chinese"],
          host_civ_picks: ["Vikings"],
          guest_civ_picks: ["Mongols"],
          host_map_bans: ["Arabia"],
          guest_map_bans: ["Arena"],
          host_map_picks: [],
          guest_map_picks: [],
          host_home_map: null,
          guest_home_map: null,
          final_map: "Black Forest",
          selected_game_mode: "Random Map",
          turn_number: 8,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }

        setDraft(demoDraft)
        setLobby({
          id: "demo-lobby-1",
          code: "DEMO01",
          host_id: "demo-user-001",
          guest_id: "demo-user-002",
          status: "completed",
          visibility: "public",
          settings: {} as any,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        setHostProfile({ id: "demo-user-001", username: "Admin", avatar_url: null } as Profile)
        setGuestProfile({ id: "demo-user-002", username: "TheViper", avatar_url: null } as Profile)

        // Generate actions from draft data
        const generatedActions = generateActionsFromDraft(demoDraft)
        setActions(generatedActions)
        setIsLoading(false)
        return
      }

      // Load from database
      const supabase = createClient()

      try {
        const { data: draftData } = await supabase
          .from("drafts")
          .select("*, lobbies(*)")
          .or(`share_code.eq.${code},id.eq.${code}`)
          .single()

        if (!draftData) {
          router.push("/draft/history")
          return
        }

        setDraft(draftData)
        setLobby(draftData.lobbies)

        // Load profiles
        const userIds = [draftData.lobbies.host_id, draftData.lobbies.guest_id].filter(Boolean)
        const { data: profiles } = await supabase.from("profiles").select("*").in("id", userIds)

        if (profiles) {
          setHostProfile(profiles.find((p) => p.id === draftData.lobbies.host_id) || null)
          setGuestProfile(profiles.find((p) => p.id === draftData.lobbies.guest_id) || null)
        }

        // Generate actions
        const generatedActions = generateActionsFromDraft(draftData)
        setActions(generatedActions)

        // Increment view count
        await supabase
          .from("drafts")
          .update({ view_count: (draftData.view_count || 0) + 1 })
          .eq("id", draftData.id)
      } catch (err) {
        console.error("Error loading draft replay:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadDraft()
  }, [params, router])

  // Playback logic
  useEffect(() => {
    if (!isPlaying || currentStep >= actions.length) {
      setIsPlaying(false)
      return
    }

    const timer = setTimeout(() => {
      setCurrentStep((prev) => Math.min(prev + 1, actions.length))
    }, 1500 / playbackSpeed)

    return () => clearTimeout(timer)
  }, [isPlaying, currentStep, actions.length, playbackSpeed])

  const togglePlay = useCallback(() => {
    if (currentStep >= actions.length) {
      setCurrentStep(0)
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying, currentStep, actions.length])

  const stepForward = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, actions.length))
    setIsPlaying(false)
  }, [actions.length])

  const stepBackward = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
    setIsPlaying(false)
  }, [])

  const reset = useCallback(() => {
    setCurrentStep(0)
    setIsPlaying(false)
  }, [])

  const copyShareLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
  }

  // Get visible actions up to current step
  const visibleActions = actions.slice(0, currentStep)
  const visibleHostCivBans = visibleActions
    .filter((a) => a.player === "host" && a.type === "ban" && a.itemType === "civ")
    .map((a) => a.itemId)
  const visibleGuestCivBans = visibleActions
    .filter((a) => a.player === "guest" && a.type === "ban" && a.itemType === "civ")
    .map((a) => a.itemId)
  const visibleHostCivPicks = visibleActions
    .filter((a) => a.player === "host" && a.type === "pick" && a.itemType === "civ")
    .map((a) => a.itemId)
  const visibleGuestCivPicks = visibleActions
    .filter((a) => a.player === "guest" && a.type === "pick" && a.itemType === "civ")
    .map((a) => a.itemId)
  const visibleHostMapBans = visibleActions
    .filter((a) => a.player === "host" && a.type === "ban" && a.itemType === "map")
    .map((a) => a.itemId)
  const visibleGuestMapBans = visibleActions
    .filter((a) => a.player === "guest" && a.type === "ban" && a.itemType === "map")
    .map((a) => a.itemId)

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 pt-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    )
  }

  if (!draft || !lobby) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 pt-16 flex items-center justify-center">
          <Card className="stone-texture max-w-md">
            <CardContent className="py-12 text-center">
              <p className="text-lg font-medium">Draft not found</p>
              <Button className="mt-4" onClick={() => router.push("/draft/history")}>
                Go to History
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  // If replay is complete, show the epic summary component
  if (currentStep >= actions.length && actions.length > 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <DraftComplete 
          draft={draft} 
          lobby={lobby} 
          hostProfile={hostProfile} 
          guestProfile={guestProfile} 
          isHost={false} 
          finalMap={draft.final_map}
          mapMode={lobby.settings?.map_settings?.mode}
        />
        {/* Playback Control Bar at the bottom to allow going back */}
        <div className="fixed bottom-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-xl border-t border-white/10 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
           <div className="max-w-xl mx-auto flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => setCurrentStep(currentStep - 1)} className="text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 h-10 px-6 rounded-xl hover:bg-white hover:text-black transition-all">
                <SkipBack className="h-3 w-3 mr-2" /> Back to Replay
              </Button>
              <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-primary" style={{ width: '100%' }} />
              </div>
              <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Review Complete</span>
           </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#020202] text-white">
      <Navbar />
      <main className="flex-1">
        {/* Cinematic Header */}
        <section className="relative h-[45vh] flex items-center justify-center overflow-hidden border-b border-yellow-500/20 pt-20">
          <div className="absolute inset-0 z-0">
            <Image src="/images/Hero.png" alt="Draft Replay" fill className="object-cover opacity-40 grayscale-[0.5] brightness-110" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.15)_0%,#020202_100%)]" />
          </div>
          <div className="relative z-10 text-center px-6 max-w-4xl mt-10">
            <Badge variant="outline" className="mb-6 border-yellow-500/30 bg-yellow-500/5 text-yellow-500 px-6 py-2 uppercase tracking-[0.3em] text-[10px] font-black">Combat Replay System</Badge>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,1)] leading-tight mb-4 font-cinzel">
              Tactical <span className="gold-text-gradient pr-6 -mr-6">Review</span>
            </h1>
            <p className="text-yellow-100/40 font-medium uppercase tracking-[0.3em] text-sm md:text-lg italic max-w-2xl mx-auto">Step through the decisions. Master the art of the counter-pick.</p>
          </div>
        </section>

        <section className="py-12 pb-32">
          <div className="mx-auto max-w-6xl px-4">
            {/* Main Content */}
            <div className="grid gap-6 lg:grid-cols-[200px_1fr_200px]">
              {/* Host Panel */}
              <Card className="bg-[#0a0a0b]/80 border-white/5 backdrop-blur-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="flex flex-col items-center gap-2 text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-xs uppercase font-black tracking-widest">{hostProfile?.username || "Host"}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Bans */}
                  <div>
                    <p className="text-[10px] font-black uppercase text-white/20 mb-3 tracking-widest flex items-center gap-2">
                      <Ban className="h-3 w-3" /> Bans
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {visibleHostCivBans.map((civId) => {
                        const civ = getCivilizationById(civId)
                        return (
                          <div key={civId} className="relative aspect-square rounded-lg overflow-hidden border border-red-500/20 grayscale">
                            <Image src={civ?.icon || "/placeholder.svg"} alt="" fill className="object-cover opacity-40" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  {/* Picks */}
                  <div>
                    <p className="text-[10px] font-black uppercase text-white/20 mb-3 tracking-widest flex items-center gap-2">
                      <Check className="h-3 w-3" /> Picks
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {visibleHostCivPicks.map((civId) => {
                        const civ = getCivilizationById(civId)
                        return (
                          <div key={civId} className="relative aspect-square rounded-lg overflow-hidden border-2 border-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                            <Image src={civ?.icon || "/placeholder.svg"} alt="" fill className="object-cover" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Center - Civilization Grid */}
              <div className="space-y-6">
                <Card className="bg-[#0a0a0b]/80 border-white/5 backdrop-blur-xl p-8">
                  <div className="grid grid-cols-6 gap-3">
                    {CIVILIZATIONS.slice(0, 24).map((civ) => {
                      const isBanned = visibleHostCivBans.includes(civ.id) || visibleGuestCivBans.includes(civ.id)
                      const isHostPick = visibleHostCivPicks.includes(civ.id)
                      const isGuestPick = visibleGuestCivPicks.includes(civ.id)

                      return (
                        <div key={civ.id} className={cn(
                            "relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-500",
                            isBanned && "opacity-20 grayscale border-red-500/50 scale-95",
                            isHostPick && "border-primary ring-4 ring-primary/20 scale-105 z-10 shadow-[0_0_30px_rgba(var(--primary),0.4)]",
                            isGuestPick && "border-accent ring-4 ring-accent/20 scale-105 z-10 shadow-[0_0_30px_rgba(var(--accent),0.4)]",
                            !isBanned && !isHostPick && !isGuestPick && "border-white/5 hover:border-white/20",
                          )}>
                          <Image src={civ.icon} alt={civ.name} fill className="object-cover" />
                          {isBanned && <div className="absolute inset-0 flex items-center justify-center"><X className="h-8 w-8 text-red-500/50" /></div>}
                        </div>
                      )
                    })}
                  </div>

                  {/* Playback Progress */}
                  <div className="mt-10 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                       <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Transmission Status</span>
                       <span className="text-[10px] font-mono text-primary">{Math.round((currentStep / actions.length) * 100)}% ANALYZED</span>
                    </div>
                    <Progress value={(currentStep / actions.length) * 100} className="h-1.5 bg-white/5" />
                  </div>
                </Card>

                {/* Playback Controls */}
                <div className="flex items-center justify-center gap-4">
                    <Button variant="outline" size="icon" onClick={reset} className="h-12 w-12 rounded-xl border-white/5 bg-white/5 hover:bg-primary hover:text-black">
                      <SkipBack className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={stepBackward} disabled={currentStep === 0} className="h-12 w-12 rounded-xl border-white/5 bg-white/5">
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button onClick={togglePlay} className="h-16 w-16 rounded-2xl bg-primary text-black shadow-[0_0_30px_rgba(var(--primary),0.3)] hover:scale-105 transition-all">
                      {isPlaying ? <Pause className="h-8 w-8 fill-current" /> : <Play className="h-8 w-8 fill-current ml-1" />}
                    </Button>
                    <Button variant="outline" size="icon" onClick={stepForward} disabled={currentStep >= actions.length} className="h-12 w-12 rounded-xl border-white/5 bg-white/5">
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                    <div className="flex gap-1 ml-4 bg-white/5 p-1 rounded-xl border border-white/5">
                      {[0.5, 1, 2].map((speed) => (
                        <button key={speed} onClick={() => setPlaybackSpeed(speed)} className={cn("px-3 py-1.5 rounded-lg text-[10px] font-black transition-all", playbackSpeed === speed ? "bg-primary text-black shadow-lg" : "text-white/20 hover:text-white")}>
                          {speed}X
                        </button>
                      ))}
                    </div>
                </div>
              </div>

              {/* Guest Panel */}
              <Card className="bg-[#0a0a0b]/80 border-white/5 backdrop-blur-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="flex flex-col items-center gap-2 text-center">
                    <div className="h-12 w-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <User className="h-6 w-6 text-accent" />
                    </div>
                    <span className="text-xs uppercase font-black tracking-widest">{guestProfile?.username || "Opponent"}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Bans */}
                  <div>
                    <p className="text-[10px] font-black uppercase text-white/20 mb-3 tracking-widest flex items-center gap-2">
                      <Ban className="h-3 w-3" /> Bans
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {visibleGuestCivBans.map((civId) => {
                        const civ = getCivilizationById(civId)
                        return (
                          <div key={civId} className="relative aspect-square rounded-lg overflow-hidden border border-red-500/20 grayscale">
                            <Image src={civ?.icon || "/placeholder.svg"} alt="" fill className="object-cover opacity-40" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  {/* Picks */}
                  <div>
                    <p className="text-[10px] font-black uppercase text-white/20 mb-3 tracking-widest flex items-center gap-2">
                      <Check className="h-3 w-3" /> Picks
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {visibleGuestCivPicks.map((civId) => {
                        const civ = getCivilizationById(civId)
                        return (
                          <div key={civId} className="relative aspect-square rounded-lg overflow-hidden border-2 border-accent shadow-[0_0_15px_rgba(var(--accent),0.3)]">
                            <Image src={civ?.icon || "/placeholder.svg"} alt="" fill className="object-cover" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function generateActionsFromDraft(draft: Draft): DraftAction[] {
  const actions: DraftAction[] = []
  let index = 0

  const maxBans = Math.max(draft.host_civ_bans?.length || 0, draft.guest_civ_bans?.length || 0)
  for (let i = 0; i < maxBans; i++) {
    if (draft.host_civ_bans?.[i]) actions.push({ type: "ban", itemType: "civ", itemId: draft.host_civ_bans[i], player: "host", index: index++ })
    if (draft.guest_civ_bans?.[i]) actions.push({ type: "ban", itemType: "civ", itemId: draft.guest_civ_bans[i], player: "guest", index: index++ })
  }

  const maxMapBans = Math.max(draft.host_map_bans?.length || 0, draft.guest_map_bans?.length || 0)
  for (let i = 0; i < maxMapBans; i++) {
    if (draft.host_map_bans?.[i]) actions.push({ type: "ban", itemType: "map", itemId: draft.host_map_bans[i], player: "host", index: index++ })
    if (draft.guest_map_bans?.[i]) actions.push({ type: "ban", itemType: "map", itemId: draft.guest_map_bans[i], player: "guest", index: index++ })
  }

  draft.guest_civ_picks?.forEach((civ) => actions.push({ type: "pick", itemType: "civ", itemId: civ, player: "guest", index: index++ }))
  draft.host_civ_picks?.forEach((civ) => actions.push({ type: "pick", itemType: "civ", itemId: civ, player: "host", index: index++ }))

  return actions
}