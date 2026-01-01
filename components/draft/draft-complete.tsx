"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Swords, User, Home, RotateCcw, MapPin, Share2, History, Ban, ShieldAlert, Zap, Trophy, TrendingUp, X } from "lucide-react"
import { getCivilizationById } from "@/lib/data/civilizations"
import { getMapById } from "@/lib/data/maps"
import { getGameModeById } from "@/lib/data/game-modes"
import type { Draft, Lobby, Profile, MapSelectionMode } from "@/lib/types/draft"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/i18n/language-context"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

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
  const [showBans, setShowBans] = useState(false)

  const hostCiv = getCivilizationById(draft.host_civ_picks?.[0])
  const guestCiv = getCivilizationById(draft.guest_civ_picks?.[0])
  const selectedMap = getMapById(finalMap || draft.final_map || draft.host_map_picks?.[0] || draft.guest_map_picks?.[0])
  const gameMode = getGameModeById(draft.selected_game_mode || "")

  const hostCivBans = (draft.host_civ_bans || []).map(id => getCivilizationById(id)).filter(Boolean)
  const guestCivBans = (draft.guest_civ_bans || []).map(id => getCivilizationById(id)).filter(Boolean)
  const hostMapBans = (draft.host_map_bans || []).map(id => getMapById(id)).filter(Boolean)
  const guestMapBans = (draft.guest_map_bans || []).map(id => getMapById(id)).filter(Boolean)

  const shareCode = (draft as any).share_code || draft.id

  const copyShareLink = async () => {
    const url = `${window.location.origin}/draft/replay/${shareCode}`
    await navigator.clipboard.writeText(url)
    toast({ title: t("linkCopied"), description: t("shareDraftDesc") })
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col relative overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.05)_0%,transparent_70%)] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0a0a0b] via-transparent to-[#020202]" />
      </div>
      
      {/* Epic Header */}
      <header className="relative z-50 w-full border-b border-white/5 backdrop-blur-md bg-black/40">
        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-primary/20 bg-primary/5 p-2 transition-all group-hover:border-primary/50">
              <Image src="/images/logo-mini.png" alt="Logo" width={40} height={40} className="object-contain" />
            </div>
            <span className="font-black uppercase tracking-[0.2em] text-sm text-white/90 group-hover:text-primary transition-colors">Wololo Arena</span>
          </Link>
          
          <div className="flex items-center gap-4">
             <Badge variant="outline" className="border-primary/20 text-primary font-mono text-[10px] px-4 py-1 uppercase tracking-widest">
               Draft Archived // {new Date().toLocaleTimeString()}
             </Badge>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 overflow-y-auto custom-scrollbar pt-12 pb-24">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto px-6"
        >
          {/* Main Title Section */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-none mb-4">
              Draft <span className="gold-text-gradient pr-4 -mr-4">Complete</span>
            </h1>
            <div className="flex items-center justify-center gap-4">
               <div className="h-px w-12 bg-primary/20" />
               <p className="text-sm font-bold text-primary uppercase tracking-[0.4em] italic">{t("goodLuckHaveFun")}</p>
               <div className="h-px w-12 bg-primary/20" />
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: Combatant Info */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* The Battle Card */}
              <motion.div variants={itemVariants} className="relative rounded-[2.5rem] bg-[#0a0a0b] border border-white/5 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />
                
                <div className="relative grid md:grid-cols-2">
                  
                  {/* Player 1 / Host */}
                  <div className="p-10 border-b md:border-b-0 md:border-r border-white/5 relative group">
                    <div className="flex flex-col items-center mb-10">
                      <div className="relative mb-6">
                        <div className="absolute -inset-4 bg-blue-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative h-32 w-32 rounded-3xl overflow-hidden border-2 border-blue-500/30 bg-blue-500/5 p-1 shadow-2xl">
                          {hostProfile?.avatar_url ? (
                            <Image src={hostProfile.avatar_url} alt="Host" fill className="object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-blue-500/10 text-blue-400">
                              <User className="h-12 w-12" />
                            </div>
                          )}
                        </div>
                        <div className="absolute -top-3 -right-3 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-blue-400 shadow-xl">Host</div>
                      </div>
                      <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">{hostProfile?.username || "Commander 1"}</h2>
                      <div className="flex items-center gap-2 text-blue-400/60 font-mono text-[10px] uppercase tracking-widest">
                        <Zap className="h-3 w-3" /> Ready for Deployment
                      </div>
                    </div>

                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-blue-500/20 group/pick">
                      <Image src={hostCiv?.icon || "/placeholder.svg"} alt="Civ" fill className="object-cover transition-transform duration-1000 group-hover/pick:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/20 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-1 block">Active Selection</span>
                        <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">{hostCiv?.name || "No Pick"}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Player 2 / Guest */}
                  <div className="p-10 relative group bg-white/[0.01]">
                    <div className="flex flex-col items-center mb-10">
                      <div className="relative mb-6">
                        <div className="absolute -inset-4 bg-red-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative h-32 w-32 rounded-3xl overflow-hidden border-2 border-red-500/30 bg-red-500/5 p-1 shadow-2xl">
                          {guestProfile?.avatar_url ? (
                            <Image src={guestProfile.avatar_url} alt="Guest" fill className="object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-red-500/10 text-red-400">
                              <User className="h-12 w-12" />
                            </div>
                          )}
                        </div>
                        <div className="absolute -top-3 -left-3 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-red-400 shadow-xl italic">Opponent</div>
                      </div>
                      <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">{guestProfile?.username || "Commander 2"}</h2>
                      <div className="flex items-center gap-2 text-red-400/60 font-mono text-[10px] uppercase tracking-widest">
                        <Zap className="h-3 w-3" /> Combat Initialized
                      </div>
                    </div>

                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-red-500/20 group/pick">
                      <Image src={guestCiv?.icon || "/placeholder.svg"} alt="Civ" fill className="object-cover transition-transform duration-1000 group-hover/pick:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-red-950 via-red-950/20 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <span className="text-[10px] font-black text-red-400 uppercase tracking-[0.3em] mb-1 block">Active Selection</span>
                        <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">{guestCiv?.name || "No Pick"}</h3>
                      </div>
                    </div>
                  </div>

                  {/* VS Middle Badge */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
                    <div className="h-16 w-16 rounded-full bg-primary border-4 border-black flex items-center justify-center shadow-[0_0_30px_rgba(var(--primary),0.5)]">
                      <span className="text-black font-black italic text-xl">VS</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* BANS SECTION (AESTHETIC) */}
              <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
                
                {/* Host Bans */}
                <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20"><ShieldAlert className="h-4 w-4 text-blue-400" /></div>
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-blue-400/80">Host Containment</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-2">
                      {hostCivBans.map((civ, i) => (
                        <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-red-500/30 grayscale hover:grayscale-0 transition-all group/ban cursor-help">
                          <Image src={civ.icon} alt={civ.name} fill className="object-cover opacity-40 group-hover/ban:opacity-100" />
                          <div className="absolute inset-0 flex items-center justify-center bg-red-900/40"><X className="h-6 w-6 text-red-500 drop-shadow-md" /></div>
                        </div>
                      ))}
                    </div>
                    {hostMapBans.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {hostMapBans.map((m, i) => (
                          <Badge key={i} variant="outline" className="bg-red-500/5 text-red-400 border-red-500/20 text-[9px] uppercase font-black px-3 py-1">
                            <Ban className="h-2.5 w-2.5 mr-1.5" /> Map: {m.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Guest Bans */}
                <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20"><ShieldAlert className="h-4 w-4 text-red-400" /></div>
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-red-400/80">Opponent Containment</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-2">
                      {guestCivBans.map((civ, i) => (
                        <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-red-500/30 grayscale hover:grayscale-0 transition-all group/ban cursor-help">
                          <Image src={civ.icon} alt={civ.name} fill className="object-cover opacity-40 group-hover/ban:opacity-100" />
                          <div className="absolute inset-0 flex items-center justify-center bg-red-900/40"><X className="h-6 w-6 text-red-500 drop-shadow-md" /></div>
                        </div>
                      ))}
                    </div>
                    {guestMapBans.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {guestMapBans.map((m, i) => (
                          <Badge key={i} variant="outline" className="bg-red-500/5 text-red-400 border-red-500/20 text-[9px] uppercase font-black px-3 py-1">
                            <Ban className="h-2.5 w-2.5 mr-1.5" /> Map: {m.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT: Battlefield Analytics */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Map Card */}
              <motion.div variants={itemVariants} className="p-8 rounded-[2.5rem] bg-[#0a0a0b] border border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 blur-[80px] -right-20 -top-20 opacity-30" />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform">
                    <MapPin className="h-8 w-8 text-emerald-400" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500/60 mb-2">Battleground</span>
                  <h4 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-6 leading-none">
                    {selectedMap?.name || "TBD"}
                  </h4>
                  
                  {selectedMap?.image && (
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/10 mb-6 shadow-inner">
                      <Image src={selectedMap.image} alt={selectedMap.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 w-full pt-6 border-t border-white/5">
                    <div className="flex flex-col gap-1">
                      <span className="text-[8px] font-mono text-white/20 uppercase">Environment</span>
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">{selectedMap?.type || "Land"}</span>
                    </div>
                    <div className="flex flex-col gap-1 border-l border-white/5">
                      <span className="text-[8px] font-mono text-white/20 uppercase">Tactical Node</span>
                      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Active</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Match Rules Card */}
              <motion.div variants={itemVariants} className="p-8 rounded-[2.5rem] bg-[#0a0a0b] border border-white/5 relative group overflow-hidden">
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20"><TrendingUp className="h-4 w-4 text-yellow-400" /></div>
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-yellow-500/80">Ruleset</h4>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] uppercase font-black tracking-widest">Official</Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Game Mode</span>
                      <span className="text-xs font-black text-white uppercase italic">{gameMode?.name || "Standard RM"}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Draft Phase</span>
                      <span className="text-xs font-black text-white uppercase italic">Synchronized</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Main Actions */}
              <motion.div variants={itemVariants} className="flex flex-col gap-3 pt-4">
                <Button className="h-16 rounded-2xl bg-yellow-600 hover:bg-yellow-500 text-black font-black uppercase italic tracking-[0.2em] shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95" onClick={copyShareLink}>
                  <Share2 className="mr-3 h-5 w-5" /> Copy Share Protocol
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold uppercase text-[10px] tracking-widest" asChild>
                    <Link href="/lobby"><RotateCcw className="mr-2 h-4 w-4" /> New Draft</Link>
                  </Button>
                  <Button variant="outline" className="h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold uppercase text-[10px] tracking-widest" asChild>
                    <Link href="/"><Home className="mr-2 h-4 w-4" /> Exit Hub</Link>
                  </Button>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </main>

      <style jsx global>{`
        .gold-text-gradient {
          background: linear-gradient(to right, #facc15, #eab308, #ca8a04);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 10px rgba(234, 179, 8, 0.3));
        }
        .animate-pulse-slow {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }
      `}</style>
    </div>
  )
}
