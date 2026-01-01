"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { History, Search, Play, Share2, Calendar, User, Swords, Loader2 } from "lucide-react"
import { getCivilizationById } from "@/lib/data/civilizations"
import { getMapById } from "@/lib/data/maps"
import { isDemoMode } from "@/lib/demo/auth"
import { useLanguage } from "@/lib/i18n/language-context"
import type { Draft, Lobby, Profile } from "@/lib/types/draft"
import Image from "next/image"
import Link from "next/link"

interface DraftHistoryItem {
  draft: Draft
  lobby: Lobby
  hostProfile: Profile | null
  guestProfile: Profile | null
}

// Demo drafts for offline mode
const DEMO_DRAFTS: DraftHistoryItem[] = [
  {
    draft: {
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
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      share_code: "DEMO1234",
    } as Draft & { share_code: string },
    lobby: {
      id: "demo-lobby-1",
      code: "DEMO01",
      host_id: "demo-user-001",
      guest_id: "demo-user-002",
      status: "completed",
      visibility: "public",
      settings: {} as any,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    hostProfile: { id: "demo-user-001", username: "Admin", avatar_url: null } as Profile,
    guestProfile: { id: "demo-user-002", username: "TheViper", avatar_url: null } as Profile,
  },
  {
    draft: {
      id: "demo-draft-2",
      lobby_id: "demo-lobby-2",
      current_phase: "completed",
      current_turn: null,
      phase_end_time: null,
      host_civ_bans: ["Aztecs", "Huns"],
      guest_civ_bans: ["Vikings", "Persians"],
      host_civ_picks: ["Franks"],
      guest_civ_picks: ["Britons"],
      host_map_bans: [],
      guest_map_bans: [],
      host_map_picks: ["Arabia"],
      guest_map_picks: ["Arena"],
      host_home_map: "Arabia",
      guest_home_map: "Arena",
      final_map: null,
      selected_game_mode: "Empire Wars",
      turn_number: 6,
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      share_code: "DEMO5678",
    } as Draft & { share_code: string },
    lobby: {
      id: "demo-lobby-2",
      code: "DEMO02",
      host_id: "demo-user-001",
      guest_id: "demo-user-003",
      status: "completed",
      visibility: "public",
      settings: {} as any,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    hostProfile: { id: "demo-user-001", username: "Admin", avatar_url: null } as Profile,
    guestProfile: { id: "demo-user-003", username: "Hera", avatar_url: null } as Profile,
  },
]

export default function DraftHistoryPage() {
  const router = useRouter()
  const { t, language } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [drafts, setDrafts] = useState<DraftHistoryItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("my-drafts")

  useEffect(() => {
    const loadDrafts = async () => {
      if (isDemoMode()) {
        setDrafts(DEMO_DRAFTS)
        setIsLoading(false)
        return
      }

      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      try {
        // Get all drafts where user was participant
        const { data: lobbies } = await supabase
          .from("lobbies")
          .select("*")
          .or(`host_id.eq.${user.id},guest_id.eq.${user.id}`)

        if (!lobbies) {
          setDrafts([])
          setIsLoading(false)
          return
        }

        const lobbyIds = lobbies.map((l) => l.id)

        const { data: draftsData } = await supabase
          .from("drafts")
          .select("*")
          .in("lobby_id", lobbyIds)
          .eq("current_phase", "completed")
          .order("created_at", { ascending: false })

        if (!draftsData) {
          setDrafts([])
          setIsLoading(false)
          return
        }

        // Get all user IDs for profiles
        const userIds = new Set<string>()
        lobbies.forEach((l) => {
          if (l.host_id) userIds.add(l.host_id)
          if (l.guest_id) userIds.add(l.guest_id)
        })

        const { data: profiles } = await supabase.from("profiles").select("*").in("id", Array.from(userIds))

        const profileMap = new Map(profiles?.map((p) => [p.id, p]) || [])
        const lobbyMap = new Map(lobbies.map((l) => [l.id, l]))

        const formattedDrafts: DraftHistoryItem[] = draftsData.map((d) => {
          const lobby = lobbyMap.get(d.lobby_id)!
          return {
            draft: d,
            lobby,
            hostProfile: profileMap.get(lobby.host_id) || null,
            guestProfile: profileMap.get(lobby.guest_id) || null,
          }
        })

        setDrafts(formattedDrafts)
      } catch (err) {
        console.error("Error loading draft history:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadDrafts()
  }, [router])

  const filteredDrafts = drafts.filter((d) => {
    const query = searchQuery.toLowerCase()
    return (
      d.hostProfile?.username.toLowerCase().includes(query) ||
      d.guestProfile?.username.toLowerCase().includes(query) ||
      d.draft.host_civ_picks?.some((c) => c.toLowerCase().includes(query)) ||
      d.draft.guest_civ_picks?.some((c) => c.toLowerCase().includes(query))
    )
  })

  const copyShareLink = async (shareCode: string) => {
    const url = `${window.location.origin}/draft/replay/${shareCode}`
    await navigator.clipboard.writeText(url)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#020202] text-white">
      <Navbar />
      <main className="flex-1">
        {/* Cinematic Header */}
        <section className="relative h-[45vh] flex items-center justify-center overflow-hidden border-b border-yellow-500/20 pt-20">
          <div className="absolute inset-0 z-0">
            <Image src="/images/Hero.png" alt="Draft History" fill className="object-cover opacity-40 grayscale-[0.5] brightness-110" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.15)_0%,#020202_100%)]" />
          </div>
          <div className="relative z-10 text-center px-6 max-w-4xl mt-10">
            <Badge variant="outline" className="mb-6 border-yellow-500/30 bg-yellow-500/5 text-yellow-500 px-6 py-2 uppercase tracking-[0.3em] text-[10px] font-black">Tactical Archive</Badge>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,1)] leading-tight mb-4">
              Draft <span className="gold-text-gradient pr-6 -mr-6">History</span>
            </h1>
            <p className="text-yellow-100/40 font-medium uppercase tracking-[0.3em] text-sm md:text-lg italic max-w-2xl mx-auto">Relive past battles. Analyze strategic choices. Learn from the past.</p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("searchDrafts") || "Search by player or civilization..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList>
                <TabsTrigger value="my-drafts" className="gap-2">
                  <User className="h-4 w-4" />
                  {t("myDrafts") || "My Drafts"}
                </TabsTrigger>
                <TabsTrigger value="stats" className="gap-2">
                  <Swords className="h-4 w-4" />
                  {t("statistics") || "Statistics"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="my-drafts">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                    <p className="text-muted-foreground">{t("loading")}</p>
                  </div>
                ) : filteredDrafts.length === 0 ? (
                  <Card className="bg-[#0a0a0b]/80 border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <History className="h-12 w-12 text-muted-foreground/50 mb-4" />
                      <p className="text-lg font-medium">{t("noDraftsYet") || "No drafts yet"}</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        {t("startDraftToSeeHistory") || "Complete a draft to see it here"}
                      </p>
                      <Button onClick={() => router.push("/lobby")}>{t("startDrafting")}</Button>
                    </CardContent>
                  </Card>
                ) : (
                  <ScrollArea className="h-[600px]">
                    <div className="space-y-4">
                      {filteredDrafts.map((item) => (
                        <DraftHistoryCard key={item.draft.id} item={item} onShare={copyShareLink} language={language} />
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </TabsContent>

              <TabsContent value="stats">
                <DraftStatistics drafts={drafts} />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function DraftHistoryCard({
  item,
  onShare,
  language,
}: {
  item: DraftHistoryItem
  onShare: (code: string) => void
  language: string
}) {
  const hostCiv = getCivilizationById(item.draft.host_civ_picks?.[0])
  const guestCiv = getCivilizationById(item.draft.guest_civ_picks?.[0])
  const map = getMapById(item.draft.final_map || item.draft.host_map_picks?.[0])
  const shareCode = (item.draft as any).share_code

  return (
    <Card className="bg-[#0a0a0b]/80 border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border-border/50 hover:border-primary/30 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Host */}
          <div className="flex items-center gap-3 flex-1">
            <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-primary/30">
              <Image
                src={hostCiv?.icon || "/placeholder.svg"}
                alt={hostCiv?.name || ""}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-sm">{item.hostProfile?.username || "Host"}</p>
              <p className="text-xs text-primary">{hostCiv?.name}</p>
            </div>
          </div>

          {/* VS */}
          <div className="flex flex-col items-center gap-1">
            <Swords className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">VS</span>
          </div>

          {/* Guest */}
          <div className="flex items-center gap-3 flex-1 justify-end text-right">
            <div>
              <p className="font-medium text-sm">{item.guestProfile?.username || "Guest"}</p>
              <p className="text-xs text-accent">{guestCiv?.name}</p>
            </div>
            <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-accent/30">
              <Image
                src={guestCiv?.icon || "/placeholder.svg"}
                alt={guestCiv?.name || ""}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Match Info */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {map && (
              <Badge variant="secondary" className="text-xs">
                {map.name}
              </Badge>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(item.draft.created_at).toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href={`/draft/replay/${shareCode || item.draft.id}`}>
              <Button variant="outline" size="sm" className="gap-1.5 bg-transparent">
                <Play className="h-3.5 w-3.5" />
                Replay
              </Button>
            </Link>
            {shareCode && (
              <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => onShare(shareCode)}>
                <Share2 className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function DraftStatistics({ drafts }: { drafts: DraftHistoryItem[] }) {
  // Calculate civ usage statistics
  const civStats: Record<string, { bans: number; picks: number }> = {}

  drafts.forEach((item) => {
    ;[...item.draft.host_civ_bans, ...item.draft.guest_civ_bans].forEach((civ) => {
      if (!civStats[civ]) civStats[civ] = { bans: 0, picks: 0 }
      civStats[civ].bans++
    })
    ;[...item.draft.host_civ_picks, ...item.draft.guest_civ_picks].forEach((civ) => {
      if (!civStats[civ]) civStats[civ] = { bans: 0, picks: 0 }
      civStats[civ].picks++
    })
  })

  const sortedByBans = Object.entries(civStats)
    .sort((a, b) => b[1].bans - a[1].bans)
    .slice(0, 5)

  const sortedByPicks = Object.entries(civStats)
    .sort((a, b) => b[1].picks - a[1].picks)
    .slice(0, 5)

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="bg-[#0a0a0b]/80 border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Most Banned Civilizations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sortedByBans.map(([civId, stats], index) => {
              const civ = getCivilizationById(civId)
              return (
                <div key={civId} className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-4">{index + 1}.</span>
                  <div className="relative h-8 w-8 rounded overflow-hidden">
                    <Image src={civ?.icon || "/placeholder.svg"} alt={civ?.name || ""} fill className="object-cover" />
                  </div>
                  <span className="flex-1 font-medium">{civ?.name || civId}</span>
                  <Badge variant="destructive" className="text-xs">
                    {stats.bans} bans
                  </Badge>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#0a0a0b]/80 border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Most Picked Civilizations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sortedByPicks.map(([civId, stats], index) => {
              const civ = getCivilizationById(civId)
              return (
                <div key={civId} className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-4">{index + 1}.</span>
                  <div className="relative h-8 w-8 rounded overflow-hidden">
                    <Image src={civ?.icon || "/placeholder.svg"} alt={civ?.name || ""} fill className="object-cover" />
                  </div>
                  <span className="flex-1 font-medium">{civ?.name || civId}</span>
                  <Badge variant="default" className="text-xs">
                    {stats.picks} picks
                  </Badge>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#0a0a0b]/80 border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-primary/10">
              <p className="text-3xl font-bold text-primary">{drafts.length}</p>
              <p className="text-sm text-muted-foreground">Total Drafts</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-destructive/10">
              <p className="text-3xl font-bold text-destructive">{Object.keys(civStats).length}</p>
              <p className="text-sm text-muted-foreground">Unique Civs</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-emerald-500/10">
              <p className="text-3xl font-bold text-emerald-500">
                {Object.values(civStats).reduce((sum, s) => sum + s.picks, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Total Picks</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-amber-500/10">
              <p className="text-3xl font-bold text-amber-500">
                {Object.values(civStats).reduce((sum, s) => sum + s.bans, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Total Bans</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

