"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
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

  const hostCiv = getCivilizationById(visibleHostCivPicks[0])
  const guestCiv = getCivilizationById(visibleGuestCivPicks[0])

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
        <div className="fixed bottom-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-xl border-t border-white/10 p-4">
           <div className="max-w-xl mx-auto flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => setCurrentStep(currentStep - 1)} className="text-[10px] font-bold uppercase tracking-widest border-white/10 bg-white/5">
                <SkipBack className="h-3 w-3 mr-2" /> Back to Replay
              </Button>
              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-primary" style={{ width: '100%' }} />
              </div>
              <span className="text-[10px] font-mono text-white/40 uppercase">Archived Review</span>
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
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,1)] leading-tight mb-4">
              Tactical <span className="gold-text-gradient pr-6 -mr-6">Review</span>
            </h1>
            <p className="text-yellow-100/40 font-medium uppercase tracking-[0.3em] text-sm md:text-lg italic max-w-2xl mx-auto">Step through the decisions. Master the art of the counter-pick.</p>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-6xl px-4">
            {/* Header Info */}
            <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-8">
              <div>
                <Link
                  href="/draft/history"
                  className="text-sm text-muted-foreground hover:text-primary mb-2 inline-flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" /> Back to History
                </Link>
                <h1 className="text-2xl font-bold">Draft Replay</h1>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {new Date(draft.created_at).toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={copyShareLink}>
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid gap-6 lg:grid-cols-[200px_1fr_200px]">
              {/* Host Panel */}
              <Card className="stone-texture">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span>{hostProfile?.username || "Host"}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Bans */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <Ban className="h-3 w-3" /> Bans
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {visibleHostCivBans.map((civId) => {
                        const civ = getCivilizationById(civId)
                        return (
                          <div
                            key={civId}
                            className="relative h-10 w-10 rounded opacity-50 overflow-hidden border border-red-500/50"
                          >
                            <Image
                              src={civ?.icon || "/placeholder.svg"}
                              alt={civ?.name || ""}
                              fill
                              className="object-cover grayscale"
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  {/* Picks */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <Check className="h-3 w-3" /> Picks
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {visibleHostCivPicks.map((civId) => {
                        const civ = getCivilizationById(civId)
                        return (
                          <div
                            key={civId}
                            className="relative h-12 w-12 rounded overflow-hidden border-2 border-primary"
                          >
                            <Image
                              src={civ?.icon || "/placeholder.svg"}
                              alt={civ?.name || ""}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Center - Civilization Grid */}
              <Card className="stone-texture">
                <CardContent className="p-6">
                  <div className="grid grid-cols-6 gap-2">
                    {CIVILIZATIONS.slice(0, 12).map((civ) => {
                      const isBanned = visibleHostCivBans.includes(civ.id) || visibleGuestCivBans.includes(civ.id)
                      const isPicked = visibleHostCivPicks.includes(civ.id) || visibleGuestCivPicks.includes(civ.id)
                      const isHostPick = visibleHostCivPicks.includes(civ.id)
                      const isGuestPick = visibleGuestCivPicks.includes(civ.id)

                      return (
                        <div
                          key={civ.id}
                          className={cn(
                            "relative aspect-square rounded-lg overflow-hidden border-2 transition-all",
                            isBanned && "opacity-30 grayscale border-red-500/50",
                            isHostPick && "border-primary ring-2 ring-primary/50",
                            isGuestPick && "border-accent ring-2 ring-accent/50",
                            !isBanned && !isPicked && "border-border/50 hover:border-border",
                          )}
                        >
                          <Image src={civ.icon || "/placeholder.svg"} alt={civ.name} fill className="object-cover" />
                          {isBanned && (
                            <div className="absolute inset-0 flex items-center justify-center bg-red-500/30">
                              <Ban className="h-6 w-6 text-red-500" />
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1">
                            <p className="text-[10px] text-white text-center truncate">{civ.name}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Current Action Indicator */}
                  {currentStep < actions.length && (
                    <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/30 text-center">
                      <p className="text-sm font-medium">
                        {actions[currentStep].player === "host" ? hostProfile?.username : guestProfile?.username}{" "}
                        {actions[currentStep].type === "ban" ? "bans" : "picks"}{" "}
                        <span className="text-primary">
                          {getCivilizationById(actions[currentStep].itemId)?.name ||
                            getMapById(actions[currentStep].itemId)?.name}
                        </span>
                      </p>
                    </div>
                  )}

                  {currentStep >= actions.length && (
                    <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-center">
                      <p className="text-sm font-medium text-emerald-500">Draft Complete!</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Guest Panel */}
              <Card className="stone-texture">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <User className="h-4 w-4 text-accent" />
                    </div>
                    <span>{guestProfile?.username || "Guest"}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Bans */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <Ban className="h-3 w-3" /> Bans
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {visibleGuestCivBans.map((civId) => {
                        const civ = getCivilizationById(civId)
                        return (
                          <div
                            key={civId}
                            className="relative h-10 w-10 rounded opacity-50 overflow-hidden border border-red-500/50"
                          >
                            <Image
                              src={civ?.icon || "/placeholder.svg"}
                              alt={civ?.name || ""}
                              fill
                              className="object-cover grayscale"
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  {/* Picks */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <Check className="h-3 w-3" /> Picks
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {visibleGuestCivPicks.map((civId) => {
                        const civ = getCivilizationById(civId)
                        return (
                          <div
                            key={civId}
                            className="relative h-12 w-12 rounded overflow-hidden border-2 border-accent"
                          >
                            <Image
                              src={civ?.icon || "/placeholder.svg"}
                              alt={civ?.name || ""}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Playback Controls */}
            <Card className="stone-texture mt-6">
              <CardContent className="py-4">
                <div className="flex flex-col items-center gap-4">
                  {/* Progress */}
                  <div className="w-full max-w-lg">
                    <Progress value={(currentStep / actions.length) * 100} className="h-2" />
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>Step {currentStep}</span>
                      <span>{actions.length} total</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={reset} className="bg-transparent">
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={stepBackward}
                      disabled={currentStep === 0}
                      className="bg-transparent"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button size="icon" onClick={togglePlay} className="h-12 w-12">
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={stepForward}
                      disabled={currentStep >= actions.length}
                      className="bg-transparent"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentStep(actions.length)}
                      className="bg-transparent"
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Speed Control */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Speed:</span>
                    <div className="flex gap-2">
                      {[0.5, 1, 2].map((speed) => (
                        <Button
                          key={speed}
                          variant={playbackSpeed === speed ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPlaybackSpeed(speed)}
                          className={playbackSpeed !== speed ? "bg-transparent" : ""}
                        >
                          {speed}x
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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

  // Interleave bans (host, guest, host, guest...)
  const maxBans = Math.max(draft.host_civ_bans?.length || 0, draft.guest_civ_bans?.length || 0)
  for (let i = 0; i < maxBans; i++) {
    if (draft.host_civ_bans?.[i]) {
      actions.push({ type: "ban", itemType: "civ", itemId: draft.host_civ_bans[i], player: "host", index: index++ })
    }
    if (draft.guest_civ_bans?.[i]) {
      actions.push({ type: "ban", itemType: "civ", itemId: draft.guest_civ_bans[i], player: "guest", index: index++ })
    }
  }

  // Map bans
  const maxMapBans = Math.max(draft.host_map_bans?.length || 0, draft.guest_map_bans?.length || 0)
  for (let i = 0; i < maxMapBans; i++) {
    if (draft.host_map_bans?.[i]) {
      actions.push({ type: "ban", itemType: "map", itemId: draft.host_map_bans[i], player: "host", index: index++ })
    }
    if (draft.guest_map_bans?.[i]) {
      actions.push({ type: "ban", itemType: "map", itemId: draft.guest_map_bans[i], player: "guest", index: index++ })
    }
  }

  // Picks (guest first typically)
  draft.guest_civ_picks?.forEach((civ) => {
    actions.push({ type: "pick", itemType: "civ", itemId: civ, player: "guest", index: index++ })
  })
  draft.host_civ_picks?.forEach((civ) => {
    actions.push({ type: "pick", itemType: "civ", itemId: civ, player: "host", index: index++ })
  })

  return actions
}
