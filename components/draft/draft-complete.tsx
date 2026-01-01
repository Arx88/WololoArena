"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Swords, User, Home, RotateCcw, MapPin, Share2, History } from "lucide-react"
import { getCivilizationById } from "@/lib/data/civilizations"
import { getMapById } from "@/lib/data/maps"
import { getGameModeById } from "@/lib/data/game-modes"
import type { Draft, Lobby, Profile, MapSelectionMode } from "@/lib/types/draft"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/i18n/language-context"

interface DraftCompleteProps {
  draft: Draft
  lobby: Lobby
  hostProfile: Profile | null
  guestProfile: Profile | null
  isHost: boolean
  finalMap?: string | null
  mapMode?: MapSelectionMode
}

export function DraftComplete({ draft, hostProfile, guestProfile, finalMap, mapMode }: DraftCompleteProps) {
  const { toast } = useToast()
  const { t } = useLanguage()
  const hostCiv = getCivilizationById(draft.host_civ_picks?.[0])
  const guestCiv = getCivilizationById(draft.guest_civ_picks?.[0])
  const selectedMap = getMapById(finalMap || draft.host_map_picks?.[0] || draft.guest_map_picks?.[0])
  const gameMode = getGameModeById(draft.selected_game_mode || "")

  // For home/away mode, get both maps
  const hostHomeMap = mapMode === "home_away" ? getMapById(draft.host_map_picks?.[0]) : null
  const guestHomeMap = mapMode === "home_away" ? getMapById(draft.guest_map_picks?.[0]) : null

  const shareCode = (draft as any).share_code || draft.id

  const copyShareLink = async () => {
    const url = `${window.location.origin}/draft/replay/${shareCode}`
    await navigator.clipboard.writeText(url)
    toast({
      title: t("linkCopied"),
      description: t("shareDraftDesc"),
    })
  }

  return (
    <div className="h-screen bg-[#020202] text-foreground flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,20,30,0.4)_0%,#020202_100%)] pointer-events-none" />
      
      {/* Header */}
      <header className="relative z-30 w-full bg-[#0a0a0b]/95 border-b border-white/10 transition-all duration-500 backdrop-blur-2xl shrink-0 shadow-2xl px-6 py-2 space-y-2">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo-mini.png"
              alt="AOE2 Wololo Arena"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="font-semibold text-white">AOE2 Wololo Arena</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 min-h-0 relative z-10 overflow-y-auto px-4 py-12 custom-scrollbar">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="mb-2 text-5xl font-black italic uppercase tracking-tighter text-white drop-shadow-lg">
              {t("draftComplete")}
            </h1>
            <p className="text-lg text-yellow-200/60 font-medium uppercase tracking-widest">{t("goodLuckHaveFun")}</p>
          </div>

          {/* Matchup Card */}
          <div className="relative rounded-3xl bg-[#0a0a0b]/80 border border-white/10 backdrop-blur-xl overflow-hidden shadow-[0_0_100px_-20px_rgba(0,0,0,0.8)] mb-12 group">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-red-500/10 opacity-50" />
            
            <div className="relative z-10 grid md:grid-cols-[1fr_auto_1fr] items-stretch min-h-[400px]">
              {/* Host Side */}
              <div className="flex flex-col items-center justify-between p-8 border-b md:border-b-0 md:border-r border-white/5 relative bg-gradient-to-b from-blue-900/5 to-transparent">
                <div className="flex flex-col items-center w-full">
                   <div className="mb-6 relative">
                     <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 rounded-full" />
                     <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-blue-500/10 border-2 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                       {hostProfile?.avatar_url ? (
                         <Image src={hostProfile.avatar_url} alt={hostProfile.username} width={112} height={112} className="rounded-full object-cover" />
                       ) : <User className="h-12 w-12 text-blue-400" />}
                     </div>
                     <div className="absolute -top-3 -right-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded border border-blue-400 shadow-lg rotate-12">Host</div>
                   </div>
                   <h2 className="text-3xl font-black italic text-white mb-1 tracking-tight text-center">{hostProfile?.username || t("host")}</h2>
                   {hostHomeMap && <div className="flex items-center gap-1 text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full"><MapPin className="h-3 w-3" /> Home: {hostHomeMap.name}</div>}
                </div>

                {hostCiv ? (
                  <div className="w-full mt-8 relative group/civ">
                    <div className="aspect-[16/9] w-full relative rounded-xl overflow-hidden border border-blue-500/30 shadow-2xl">
                      <Image src={hostCiv.icon || "/placeholder.svg"} alt={hostCiv.name} fill className="object-cover transition-transform duration-700 group-hover/civ:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-1">Civilization</p>
                        <p className="text-3xl font-black text-white uppercase tracking-tighter leading-none">{hostCiv.name}</p>
                      </div>
                    </div>
                  </div>
                ) : <div className="w-full mt-8 h-32 rounded-xl border border-white/10 flex items-center justify-center bg-white/5"><span className="text-white/20 font-mono">NO CIV PICKED</span></div>}
              </div>

              {/* VS Center */}
              <div className="relative flex flex-col items-center justify-center py-8 px-4 md:w-32 bg-black/40 border-y md:border-y-0 border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] animate-pulse-slow" />
                <div className="relative z-10 flex flex-col items-center">
                  <Swords className="h-12 w-12 text-white/40 mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                  <span className="inline-block text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 italic tracking-tighter pr-4">VS</span>
                </div>
              </div>

              {/* Guest Side */}
              <div className="flex flex-col items-center justify-between p-8 border-t md:border-t-0 md:border-l border-white/5 relative bg-gradient-to-b from-red-900/5 to-transparent">
                <div className="flex flex-col items-center w-full">
                   <div className="mb-6 relative">
                     <div className="absolute inset-0 bg-red-500 blur-2xl opacity-20 rounded-full" />
                     <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-red-500/10 border-2 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                       {guestProfile?.avatar_url ? (
                         <Image src={guestProfile.avatar_url} alt={guestProfile.username} width={112} height={112} className="rounded-full object-cover" />
                       ) : <User className="h-12 w-12 text-red-400" />}
                     </div>
                     <div className="absolute -top-3 -left-3 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded border border-red-400 shadow-lg -rotate-12">Guest</div>
                   </div>
                   <h2 className="text-3xl font-black italic text-white mb-1 tracking-tight text-center">{guestProfile?.username || t("opponent")}</h2>
                   {guestHomeMap && <div className="flex items-center gap-1 text-xs font-bold text-red-400 uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-full"><MapPin className="h-3 w-3" /> Home: {guestHomeMap.name}</div>}
                </div>

                {guestCiv ? (
                  <div className="w-full mt-8 relative group/civ">
                    <div className="aspect-[16/9] w-full relative rounded-xl overflow-hidden border border-red-500/30 shadow-2xl">
                      <Image src={guestCiv.icon || "/placeholder.svg"} alt={guestCiv.name} fill className="object-cover transition-transform duration-700 group-hover/civ:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-xs font-bold text-red-300 uppercase tracking-widest mb-1">Civilization</p>
                        <p className="text-3xl font-black text-white uppercase tracking-tighter leading-none">{guestCiv.name}</p>
                      </div>
                    </div>
                  </div>
                ) : <div className="w-full mt-8 h-32 rounded-xl border border-white/10 flex items-center justify-center bg-white/5"><span className="text-white/20 font-mono">NO CIV PICKED</span></div>}
              </div>
            </div>

            {/* Battle Context Footer */}
            <div className="border-t border-white/10 bg-[#020202]/80 p-6 backdrop-blur-xl">
               <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
                  {selectedMap && mapMode !== "home_away" && (
                    <div className="flex items-center gap-4 group cursor-help">
                       <div className="h-12 w-12 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40 group-hover:bg-emerald-500/30 transition-colors">
                          <MapPin className="h-6 w-6 text-emerald-400" />
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/60">Battlefield</span>
                          <span className="text-xl font-black text-white uppercase tracking-tighter">{selectedMap.name}</span>
                       </div>
                    </div>
                  )}
                  {gameMode && (
                    <div className="flex items-center gap-4 group cursor-help">
                       <div className="h-12 w-12 rounded-lg bg-yellow-500/20 flex items-center justify-center border border-yellow-500/40 group-hover:bg-yellow-500/30 transition-colors">
                          <Swords className="h-6 w-6 text-yellow-400" />
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase tracking-widest text-yellow-500/60">Game Mode</span>
                          <span className="text-xl font-black text-white uppercase tracking-tighter">{gameMode.name}</span>
                       </div>
                    </div>
                  )}
               </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
            <Button variant="outline" className="h-12 border-white/10 bg-white/5 hover:bg-white/10 text-white gap-2 hover:border-yellow-500/50 transition-all" onClick={copyShareLink}>
              <Share2 className="h-4 w-4" />
              {t("shareDraft")}
            </Button>
            <Link href={`/draft/replay/${shareCode}`}>
              <Button variant="outline" className="h-12 w-full sm:w-auto border-white/10 bg-white/5 hover:bg-white/10 text-white gap-2 hover:border-yellow-500/50 transition-all">
                <History className="h-4 w-4" />
                {t("viewReplay")}
              </Button>
            </Link>
            <Link href="/lobby">
              <Button variant="outline" className="h-12 w-full sm:w-auto border-white/10 bg-white/5 hover:bg-white/10 text-white gap-2 hover:border-yellow-500/50 transition-all">
                <RotateCcw className="h-4 w-4" />
                {t("newDraft")}
              </Button>
            </Link>
            <Link href="/">
              <Button className="h-12 w-full sm:w-auto bg-yellow-600 hover:bg-yellow-500 text-black font-bold gap-2 border-0 shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] transition-all">
                <Home className="h-4 w-4" />
                {t("backToHome")}
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}