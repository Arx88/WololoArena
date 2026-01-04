"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Globe, X, Loader2, Sword, Shield, Target, Crown, ChevronDown, ChevronRight, History as HistoryIcon, Trophy, Flame, Swords, Timer, Calendar, Zap, LayoutGrid, Activity, SwordsIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { getCivilizationById } from "@/lib/data/civilizations"
import NextImage from "next/image"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface VersusHistoryWidgetProps {
  p1: any // Base player profile
  onClose: () => void
}

export function VersusHistoryWidget({ p1: initialP1, onClose }: VersusHistoryWidgetProps) {
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<any[]>([])
  const [loadingSearch, setLoadingSearch] = React.useState(false)
  const [p1, setP1] = React.useState<any | null>(initialP1?.profileId ? initialP1 : null)
  const [p2, setP2] = React.useState<any | null>(null)
  const [versusData, setVersusData] = React.useState<any | null>(null)
  const [loadingHistory, setLoadingHistory] = React.useState(false)

  React.useEffect(() => {
    if (query.length < 2) { setResults([]); return; }
    const timer = setTimeout(async () => {
      setLoadingSearch(true)
      try {
        const res = await fetch(`/api/aoe2/search?name=${encodeURIComponent(query)}`)
        if (res.ok) { const data = await res.json(); setResults(Array.isArray(data) ? data : []); }
      } catch (e) { console.error("Search failed", e); } finally { setLoadingSearch(false); }
    }, 400)
    return () => clearTimeout(timer)
  }, [query])

  const handlePlayerSelect = async (player: any) => {
    if (!p1) { setP1({ ...player, modes: {} }); setQuery(""); return; }
    if (player.profileId === p1.profileId) return;
    setP2(player); setLoadingHistory(true);
    try {
      const res = await fetch(`/api/aoe2/versus/${p1.profileId}/${player.profileId}`)
      if (res.ok) { const data = await res.json(); setVersusData(data); }
    } catch (e) { console.error("Versus failed", e); } finally { setLoadingHistory(false); }
  }

  const p1Wins = versusData?.matches?.filter((m: any) => m.won).length || 0;
  const p2Wins = (versusData?.totalGames || 0) - p1Wins;
  const dominance = versusData?.totalGames > 0 ? (p1Wins / versusData.totalGames) * 100 : 50;

  return (
    <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 20 }}
        className="relative w-full max-w-6xl bg-[#050506] border border-white/10 rounded-[3rem] shadow-[0_50px_150px_rgba(0,0,0,1)] overflow-hidden flex flex-col md:flex-row h-[85vh] max-h-[850px] z-[210] ring-1 ring-white/5"
    >
        {/* SIDEBAR: SELECTION */}
        <div className="w-full md:w-[380px] flex flex-col border-r border-white/5 bg-[#050505] shrink-0">
            <div className="p-6 border-b border-white/5 bg-[#0a0a0b]">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0">
                        <Search className="w-5 h-5 text-yellow-500" />
                    </div>
                    <input 
                        className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/10 font-bold h-12 text-lg tracking-tight uppercase"
                        placeholder={!p1 ? "IDENTIFY PLAYER 1..." : "IDENTIFY RIVAL..."}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                    <button onClick={onClose} className="p-2 hover:bg-white/10 text-white/20 rounded-lg"><X className="w-5 h-5" /></button>
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-1">
                {loadingSearch && <div className="flex justify-center py-10"><Loader2 className="animate-spin text-zinc-700 w-6 h-6" /></div>}
                {results.map(player => (
                    <button key={player.profileId} onClick={() => handlePlayerSelect(player)} className={cn("w-full flex items-center gap-4 p-3 rounded-xl transition-all text-left group", (p1?.profileId === player.profileId || p2?.profileId === player.profileId) ? "bg-white/5 border border-white/5" : "hover:bg-white/[0.02]")}>
                        <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center font-black text-sm transition-all uppercase border", p1?.profileId === player.profileId ? "bg-yellow-500 text-black border-yellow-400" : p2?.profileId === player.profileId ? "bg-red-600 text-white border-red-500" : "bg-zinc-900 border-white/5 text-zinc-600")}>{player.name.charAt(0)}</div>
                        <div className="flex-1 min-w-0">
                            <p className={cn("font-bold truncate text-[13px] uppercase italic transition-colors", (p1?.profileId === player.profileId || p2?.profileId === player.profileId) ? "text-white" : "text-zinc-500 group-hover:text-zinc-300")}>{player.name}</p>
                            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-tight">{player.rating} ELO</p>
                        </div>
                    </button>
                ))}
            </div>

            <div className="p-6 bg-black/40 border-t border-white/5 space-y-2">
                <div className={cn("flex items-center justify-between p-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all", p1 ? "bg-yellow-500/5 border-yellow-500/20 text-yellow-500" : "bg-white/[0.02] border-white/5 opacity-20")}>
                    <span className="truncate max-w-[180px]">P1: {p1?.name || "???"}</span>
                    {p1 && <button onClick={() => { setP1(null); setP2(null); setVersusData(null); }} className="hover:text-white transition-colors"><X size={12} /></button>}
                </div>
                <div className={cn("flex items-center justify-between p-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all", p2 ? "bg-red-500/5 border-red-500/20 text-red-500" : "bg-white/[0.02] border-white/5 opacity-20")}>
                    <span className="truncate max-w-[180px]">P2: {p2?.name || "???"}</span>
                    {p2 && <button onClick={() => { setP2(null); setVersusData(null); }} className="hover:text-white transition-colors"><X size={12} /></button>}
                </div>
            </div>
        </div>

        {/* MAIN ARENA */}
        <div className="flex-1 relative bg-[#050506] overflow-hidden flex flex-col">
            <AnimatePresence mode="wait">
                {loadingHistory ? (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center space-y-6 relative z-10">
                        <div className="h-1 w-48 bg-zinc-900 rounded-full overflow-hidden">
                            <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="h-full w-1/2 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">Retrieving War Logs...</p>
                    </motion.div>
                ) : p1 && p2 && versusData ? (
                    <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col min-h-0 text-left">
                        {/* SCOREBOARD - OPTIMIZED HIERARCHY */}
                        <div className="p-8 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent shrink-0 relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
                                <span className="text-[12rem] font-black italic text-white">HISTORY</span>
                            </div>

                            <div className="flex items-center justify-between gap-8 max-w-5xl mx-auto relative z-10">
                                {/* P1 Pillar */}
                                <div className="text-center space-y-3 w-32 shrink-0">
                                    <div className="h-20 w-20 mx-auto rounded-2xl bg-zinc-900 border border-yellow-500/30 shadow-2xl flex items-center justify-center text-3xl font-black text-white uppercase relative">{p1.name.charAt(0)}</div>
                                    <p className="text-[11px] font-black text-yellow-500 uppercase tracking-[0.2em] truncate">{p1.name}</p>
                                </div>

                                {/* Center: The Power Axis */}
                                <div className="flex-1 flex flex-col items-center min-w-0">
                                    <div className="flex items-baseline gap-10 mb-4">
                                        <span className="text-7xl font-black text-yellow-500 italic tracking-tighter drop-shadow-[0_0_30px_rgba(234,179,8,0.3)]">{p1Wins}</span>
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="flex gap-1.5 opacity-20">
                                                <div className="w-1 h-1 rounded-full bg-white" />
                                                <div className="w-1.5 h-1.5 rounded-full bg-white scale-125" />
                                                <div className="w-1 h-1 rounded-full bg-white" />
                                            </div>
                                            <span className="text-[9px] font-black text-zinc-600 tracking-[0.5em] uppercase">VERSUS</span>
                                        </div>
                                        <span className="text-7xl font-black text-white italic tracking-tighter opacity-90">{p2Wins}</span>
                                    </div>
                                    
                                    {/* Integrated Dominance Bar */}
                                    <div className="w-full max-w-sm space-y-2.5">
                                        <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5 flex">
                                            <motion.div 
                                                initial={{ width: "0%" }} 
                                                animate={{ width: `${dominance}%` }} 
                                                transition={{ duration: 1, ease: "easeOut" }}
                                                className="h-full bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)]" 
                                            />
                                            <div className="flex-1 bg-zinc-800" />
                                        </div>
                                        <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 italic">
                                            <span className={cn(dominance > 50 && "text-yellow-500")}>{Math.round(dominance)}% Power</span>
                                            <span className="opacity-30">{versusData.totalGames} Matches</span>
                                            <span className={cn(dominance < 50 && "text-white")}>{100 - Math.round(dominance)}%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* P2 Pillar */}
                                <div className="text-center space-y-3 w-32 shrink-0">
                                    <div className="h-20 w-20 mx-auto rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl flex items-center justify-center text-3xl font-black text-white uppercase relative">{p2.name.charAt(0)}</div>
                                    <p className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em] truncate">{p2.name}</p>
                                </div>
                            </div>
                        </div>

                        {/* LISTA DE PARTIDAS: PREMIUM STAGGERED LIST */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-6 bg-black/20">
                            <div className="flex items-center gap-4 mb-4">
                                <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">Chronicles of War // {versusData.totalGames} Matches</h4>
                                <div className="h-px flex-1 bg-white/5" />
                            </div>
                            
                            <motion.div 
                                initial="hidden" animate="show" 
                                variants={{ show: { transition: { staggerChildren: 0.05 } } }} 
                                className="grid grid-cols-1 gap-4 pb-10"
                            >
                                {versusData.matches.map((match: any, idx: number) => (
                                    <motion.div 
                                        key={idx} 
                                        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} 
                                        className="relative overflow-hidden bg-zinc-900/40 border border-white/5 rounded-3xl p-6 flex items-center justify-between shadow-xl"
                                    >
                                        {/* Winner & Meta */}
                                        <div className="w-[180px] shrink-0 min-w-0">
                                            <div className={cn(
                                                "flex items-center gap-2.5 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all shadow-lg", 
                                                match.won ? "bg-yellow-500 text-black border-yellow-400" : "bg-red-600 text-white border-red-500"
                                            )}>
                                                <Trophy size={12} className="shrink-0" />
                                                <span className="truncate flex-1 leading-none">{match.won ? p1.name : p2.name}</span>
                                            </div>
                                            <div className="mt-3 flex flex-col gap-1 px-1 text-[9px] font-bold text-zinc-600 uppercase tracking-tight">
                                                <span className="flex items-center gap-1.5"><Calendar size={10} className="text-zinc-700" /> {format(new Date(match.date), "MMM d, yyyy")}</span>
                                                <span className="flex items-center gap-1.5 text-emerald-500/50"><Timer size={10} /> {match.duration}</span>
                                            </div>
                                        </div>

                                        {/* CLASH VISUAL */}
                                        <div className="flex-1 flex items-center justify-center gap-12 px-8 border-x border-white/5 min-w-0">
                                            <div className="flex flex-col items-center gap-3 min-w-0">
                                                <div className="relative h-14 w-14 rounded-2xl overflow-hidden border-2 border-yellow-500/30 bg-black shadow-xl group-hover:border-yellow-500 transition-all">
                                                    {getCivilizationById(match.p1Civ)?.icon && <NextImage src={getCivilizationById(match.p1Civ)!.icon} alt="" fill className="object-contain p-1" />}
                                                </div>
                                                <span className="text-[10px] font-black text-yellow-500/60 uppercase tracking-widest truncate w-24 text-center group-hover:text-yellow-500 transition-colors">{getCivilizationById(match.p1Civ)?.name || "???"}</span>
                                            </div>

                                            <div className="flex flex-col items-center">
                                                <span className="text-xl font-black text-white/10 italic tracking-tighter">VS</span>
                                                <div className="h-10 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                                            </div>

                                            <div className="flex flex-col items-center gap-3 min-w-0">
                                                <div className="relative h-14 w-14 rounded-2xl overflow-hidden border-2 border-red-500/30 bg-black shadow-xl group-hover:border-red-500 transition-all">
                                                    {getCivilizationById(match.p2Civ)?.icon && <NextImage src={getCivilizationById(match.p2Civ)!.icon} alt="" fill className="object-contain p-1" />}
                                                </div>
                                                <span className="text-[10px] font-black text-red-500/60 uppercase tracking-widest truncate w-24 text-center group-hover:text-red-500 transition-colors">{getCivilizationById(match.p2Civ)?.name || "???"}</span>
                                            </div>
                                        </div>

                                        {/* Map Context */}
                                        <div className="w-[160px] shrink-0 text-right space-y-1.5 min-w-0">
                                            <p className="text-lg font-black text-white italic uppercase tracking-tighter leading-none group-hover:text-yellow-500 transition-colors truncate">{match.map}</p>
                                            <Badge className="bg-white/5 text-zinc-600 text-[8px] font-black uppercase border-none px-2 h-4 tracking-tighter">{match.mode === "rm_1v1" ? "Competitive" : "Casual Match"}</Badge>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="empty" className="h-full flex flex-col items-center justify-center opacity-20 text-center space-y-8">
                        <HistoryIcon size={100} className="text-white animate-pulse" />
                        <div className="space-y-2">
                            <h3 className="text-4xl font-black uppercase italic tracking-tighter text-white font-cinzel">Versus History</h3>
                            <p className="max-w-sm mx-auto text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] leading-relaxed">Select combatants to cross-reference historical data and dominance.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </motion.div>
  )
}