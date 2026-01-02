"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, User, Trophy, TrendingUp, Activity, Shield, Swords, Loader2, X, ChevronRight, MapPin, Globe, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getCivilizationById } from "@/lib/data/civilizations"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

export function PlayerSearchSection() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null)
  const [playerStats, setPlayerStats] = useState<any>(null)
  const [isLoadingStats, setIsLoadingStats] = useState(false)

  const handleSearch = async () => {
    if (query.length < 3) return
    setIsSearching(true)
    setSelectedPlayer(null)
    setPlayerStats(null)
    
    try {
      // USAMOS EL PROXY LOCAL PARA EVITAR CORS Y BLOQUEOS
      const response = await fetch(`/api/aoe2/search?name=${encodeURIComponent(query)}`)
      if (!response.ok) throw new Error("API fail")
      const data = await response.json()
      setResults(data)
    } catch (err) {
      console.error("Search failed:", err)
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleSelectPlayer = async (player: any) => {
    setSelectedPlayer(player)
    setIsLoadingStats(true)
    
    try {
      const response = await fetch(`/api/aoe2/profile/${player.profileId}`)
      if (!response.ok) throw new Error("Stats fail")
      const data = await response.json()
      setPlayerStats(data)
    } catch (err) {
      console.error("Stats failed:", err)
    } finally {
      setIsLoadingStats(false)
    }
  }

  const CIV_ID_MAP: Record<number, string> = {
    1: "britons", 2: "franks", 3: "goths", 4: "teutons", 5: "japanese", 6: "chinese", 
    7: "byzantines", 8: "persians", 9: "saracens", 10: "turks", 11: "vikings", 
    12: "mongols", 13: "celts", 14: "spanish", 15: "aztecs", 16: "mayans", 
    17: "huns", 18: "koreans", 19: "italians", 20: "hindustanis", 21: "incas", 
    22: "magyars", 23: "slavs", 24: "portuguese", 25: "ethiopians", 26: "malians", 
    27: "berbers", 28: "khmer", 29: "malay", 30: "burmese", 31: "vietnamese", 
    32: "bulgarians", 33: "tatars", 34: "cumans", 35: "lithuanians", 36: "burgundians", 
    37: "sicilians", 38: "poles", 39: "bohemians", 40: "dravidians", 41: "bengalis", 
    42: "gurjaras", 43: "romans", 44: "armenians", 45: "georgians"
  }

  return (
    <section className="py-24 relative overflow-hidden bg-[#020202]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.03)_0%,#020202_100%)]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="outline" className="border-yellow-500/20 text-yellow-500 px-6 py-1 uppercase tracking-[0.4em] text-[10px] font-black">Global Database Search</Badge>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-none font-cinzel">Player <span className="gold-text-gradient">Insights</span></h2>
          <p className="text-zinc-500 text-lg md:text-xl font-light italic max-w-2xl mx-auto">Retrieve real-time combat data and civilization mastery from official registries.</p>
        </div>

        <div className="max-w-3xl mx-auto mb-16 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 via-yellow-500/40 to-yellow-500/20 rounded-2xl blur opacity-25 group-focus-within:opacity-100 transition-opacity" />
          <div className="relative flex gap-2 p-2 bg-[#0a0a0b] border border-white/10 rounded-2xl shadow-2xl">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20" />
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} placeholder="Search by Player Name (e.g. Hera, Viper)..." className="w-full h-14 bg-transparent pl-12 pr-4 text-white placeholder:text-white/10 outline-none text-lg font-medium" />
            </div>
            <Button onClick={handleSearch} disabled={isSearching || query.length < 3} className="h-14 px-8 bg-yellow-600 text-black font-black uppercase tracking-widest rounded-xl hover:bg-yellow-500 transition-all">
              {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : "Identify"}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 min-h-[500px]">
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-[10px] font-black uppercase text-white/20 tracking-[0.3em] mb-6 flex items-center gap-2"><Activity className="h-3 w-3" /> Results</h4>
            <div className="space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
              {results.map((p) => (
                <button key={p.profileId} onClick={() => handleSelectPlayer(p)} className={cn("w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 text-left", selectedPlayer?.profileId === p.profileId ? "bg-yellow-500/10 border-yellow-500/40" : "bg-white/[0.02] border-white/5 hover:border-white/20")}>
                  <div className="flex items-center gap-4">
                    <div className={cn("h-10 w-10 rounded-lg border flex items-center justify-center", selectedPlayer?.profileId === p.profileId ? "bg-yellow-500 text-black border-yellow-500" : "bg-white/5 border-white/10 text-white/40")}>
                      <User className="h-5 w-5" />
                    </div>
                    <div><p className="font-bold text-white uppercase italic tracking-tight">{p.name}</p><p className="text-[10px] font-mono text-white/20">ELO: {p.rating}</p></div>
                  </div>
                  <ChevronRight className={cn("h-4 w-4 transition-transform", selectedPlayer?.profileId === p.profileId ? "text-yellow-500 translate-x-1" : "text-white/10")} />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {selectedPlayer ? (
                <motion.div key={selectedPlayer.profileId} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full rounded-[2.5rem] bg-[#0a0a0b] border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none"><Shield size={300} /></div>
                  <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12 relative z-10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-yellow-500 animate-ping" /><span className="text-[10px] font-mono font-bold text-yellow-500 uppercase tracking-[0.4em]">Active Profile Data</span></div>
                      <h3 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none font-cinzel">{selectedPlayer.name}</h3>
                      <div className="flex flex-wrap gap-4">
                         <Badge variant="outline" className="bg-yellow-500/5 text-yellow-500 border-yellow-500/20 px-4 py-1 font-mono text-[10px] uppercase">Rank #{selectedPlayer.rank}</Badge>
                         <Badge variant="outline" className="bg-white/5 text-white/40 border-white/10 px-4 py-1 font-mono text-[10px] uppercase">ID: {selectedPlayer.profileId}</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 bg-white/[0.02] border border-white/5 p-6 rounded-3xl backdrop-blur-xl shrink-0">
                       <div className="text-center md:text-right px-4"><span className="block text-[9px] font-mono text-white/30 uppercase mb-1">Current ELO</span><span className="text-4xl font-black text-white italic tracking-tighter leading-none">{selectedPlayer.rating}</span></div>
                       <div className="text-center md:text-right border-l border-white/10 px-4"><span className="block text-[9px] font-mono text-white/30 uppercase mb-1">Max ELO</span><span className="text-4xl font-black text-yellow-500 italic tracking-tighter leading-none">{selectedPlayer.highRating || selectedPlayer.rating}</span></div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6 mb-12 relative z-10">
                     <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="flex items-center gap-3 mb-4 opacity-40"><Swords className="h-4 w-4" /><span className="text-[10px] font-black uppercase tracking-widest">Performance</span></div>
                        <div className="flex items-end gap-2"><span className="text-3xl font-black text-white italic">{selectedPlayer.games > 0 ? Math.round((selectedPlayer.wins / selectedPlayer.games) * 100) : 0}%</span><span className="text-xs font-bold text-zinc-500 mb-1">Win Rate</span></div>
                        <Progress value={selectedPlayer.games > 0 ? (selectedPlayer.wins / selectedPlayer.games) * 100 : 0} className="h-1 mt-4 bg-white/5" />
                     </div>
                     <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="flex items-center gap-3 mb-4 opacity-40"><Activity className="h-4 w-4" /><span className="text-[10px] font-black uppercase tracking-widest">Matches</span></div>
                        <div className="flex items-end gap-2"><span className="text-3xl font-black text-white italic">{selectedPlayer.games}</span><span className="text-xs font-bold text-zinc-500 mb-1">Total</span></div>
                        <p className="text-[10px] font-mono text-white/20 mt-4 uppercase">{selectedPlayer.wins} Wins // {selectedPlayer.losses} Losses</p>
                     </div>
                     <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="flex items-center gap-3 mb-4 opacity-40"><Globe className="h-4 w-4" /><span className="text-[10px] font-black uppercase tracking-widest">Environment</span></div>
                        <span className="text-xl font-black text-white uppercase italic">RM 1v1</span>
                        <p className="text-[10px] font-mono text-white/20 mt-2 uppercase tracking-tighter">Last Match: {selectedPlayer.lastMatch ? new Date(selectedPlayer.lastMatch * 1000).toLocaleDateString() : 'Unknown'}</p>
                     </div>
                  </div>
                  <div className="mt-auto pt-8 border-t border-white/5 relative z-10">
                     <h4 className="text-[10px] font-black uppercase text-yellow-500 tracking-[0.4em] mb-8">Civilization Mastery // Recent Data</h4>
                     {isLoadingStats ? (
                       <div className="flex items-center gap-4 py-4"><Loader2 className="h-5 w-5 animate-spin text-yellow-500" /><span className="text-xs font-mono text-white/20 uppercase tracking-widest animate-pulse">Scanning...</span></div>
                     ) : playerStats?.topCivs ? (
                       <div className="flex flex-wrap gap-6">
                          {playerStats.topCivs.map((s: any) => {
                            const c = getCivilizationById(CIV_ID_MAP[s.id])
                            return (
                              <div key={s.id} className="flex items-center gap-4 group/civ">
                                 <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-white/10 group-hover/civ:border-yellow-500/50 transition-all">
                                    {c?.icon ? <Image src={c.icon} alt="" fill className="object-cover" /> : <div className="w-full h-full bg-white/5 flex items-center justify-center"><Shield className="w-4 h-4 opacity-20" /></div>}
                                 </div>
                                 <div><p className="text-xs font-black text-white uppercase italic tracking-tighter">{c?.name || 'Unknown'}</p><p className="text-[9px] font-mono text-white/20 uppercase">{s.count} Matches</p></div>
                              </div>
                            )
                          })}
                       </div>
                     ) : (
                       <div className="p-4 rounded-xl bg-white/5 text-center"><p className="text-xs text-white/20 font-medium italic">Detailed data unavailable.</p></div>
                     )}
                  </div>
                </motion.div>
              ) : (
                <div className="h-full rounded-[2.5rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center p-12 bg-white/[0.01]">
                   <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mb-6 opacity-20"><Target className="h-10 w-10 text-white" /></div>
                   <h3 className="text-2xl font-black text-white/20 uppercase italic tracking-tighter">No Signature Locked</h3>
                   <p className="text-zinc-600 text-sm max-w-xs mt-2">Search and select a commander to retrieve tactical intelligence.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}