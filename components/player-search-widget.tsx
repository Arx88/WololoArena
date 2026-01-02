"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Globe, Activity, X, Loader2, Sword, Shield, Target, Crown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Badge } from "@/components/ui/badge"

const COLORS = ['#eab308', '#ef4444']; // Yellow (Win), Red (Loss)

interface PlayerData {
  profileId: string
  name: string
  country: string
  rating: number
  rank: number
  games: number
  wins: number
  losses: number
  lastMatch?: number
}

export function PlayerSearchWidget() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<PlayerData[]>([])
  const [loading, setLoading] = React.useState(false)
  const [selectedPlayer, setSelectedPlayer] = React.useState<PlayerData | null>(null)

  // Debounce search
  React.useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/aoe2/search?name=${encodeURIComponent(query)}`)
        if (res.ok) {
          const data = await res.json()
          setResults(data)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }, 400)
    return () => clearTimeout(timer)
  }, [query])

  const handleSelect = (player: PlayerData) => {
    setSelectedPlayer(player)
  }

  const winRate = selectedPlayer && selectedPlayer.games > 0 
    ? Math.round((selectedPlayer.wins / selectedPlayer.games) * 100) 
    : 0

  const chartData = selectedPlayer ? [
    { name: 'Wins', value: selectedPlayer.wins },
    { name: 'Losses', value: selectedPlayer.losses },
  ] : []

  return (
    <>
      {/* Botón Flotante Fijo */}
      <AnimatePresence>
        {!isOpen && (
            <motion.button
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-8 py-4 rounded-full bg-yellow-600 hover:bg-yellow-500 text-black font-black uppercase tracking-widest shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all hover:scale-105 active:scale-95 group"
            >
                <Search className="w-5 h-5" />
                <span>Player Search</span>
            </motion.button>
        )}
      </AnimatePresence>

      {/* Full Screen Overlay & Widget */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Main Interface - Scale Animation (No Morphing) */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                className="relative w-full max-w-5xl bg-[#0a0a0b] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh] max-h-[800px]"
            >
                {/* Left Panel: Search & List */}
                <div className="w-full md:w-[400px] flex flex-col border-r border-white/5 bg-[#050505]">
                    <div className="p-5 border-b border-white/5 flex items-center gap-3 bg-[#0a0a0b]">
                        <Search className="w-5 h-5 text-yellow-500 shrink-0" />
                        <input 
                            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/20 font-medium h-10 text-lg"
                            placeholder="Search player..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus
                        />
                        {loading && <Loader2 className="w-4 h-4 animate-spin text-white/40" />}
                        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors ml-2">
                            <X className="w-5 h-5 text-white/40" />
                        </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                        {results.length === 0 && query.length > 1 && !loading && (
                            <div className="p-8 text-center text-white/20 text-sm italic">
                                No records found.
                            </div>
                        )}
                        {results.map(player => (
                            <button
                                key={player.profileId}
                                onClick={() => handleSelect(player)}
                                className={cn(
                                    "w-full flex items-center gap-3 p-4 rounded-xl transition-all text-left group",
                                    selectedPlayer?.profileId === player.profileId 
                                        ? "bg-white/10 border border-white/5" 
                                        : "hover:bg-white/5 border border-transparent"
                                )}
                            >
                                <div className={cn(
                                    "h-10 w-10 rounded-lg border flex items-center justify-center shrink-0 font-bold text-xs transition-colors",
                                    selectedPlayer?.profileId === player.profileId ? "bg-yellow-500 text-black border-yellow-500" : "bg-black border-white/10 text-white/40 group-hover:border-white/30"
                                )}>
                                    {player.rank > 0 ? `#${player.rank}` : "-"}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className={cn("font-bold truncate text-base", selectedPlayer?.profileId === player.profileId ? "text-white" : "text-zinc-300 group-hover:text-white")}>{player.name}</span>
                                        <span className="text-[10px] text-white/30 uppercase">{player.country}</span>
                                    </div>
                                    <div className="text-[10px] font-mono text-white/30">ID: {player.profileId}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-black text-yellow-500 italic">{player.rating}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Panel: Data Visualization */}
                <div className="flex-1 relative bg-[#0c0c0e] p-8 overflow-y-auto custom-scrollbar flex flex-col">
                    {selectedPlayer ? (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1">
                            {/* Header */}
                            <div className="flex items-start justify-between border-b border-white/5 pb-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <Badge className="bg-yellow-500 text-black hover:bg-yellow-400 font-black text-[10px] tracking-widest uppercase">Verified</Badge>
                                        {selectedPlayer.rank <= 100 && selectedPlayer.rank > 0 && <Badge variant="outline" className="text-purple-400 border-purple-500/30 text-[10px] uppercase font-black tracking-widest"><Crown className="w-3 h-3 mr-1" /> Top 100</Badge>}
                                    </div>
                                    <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none mb-4">
                                        {selectedPlayer.name}
                                    </h2>
                                    <div className="flex items-center gap-6 text-sm text-white/40 font-mono">
                                        <span className="flex items-center gap-2"><Globe className="w-4 h-4" /> {selectedPlayer.country || "Unknown"}</span>
                                        <span className="flex items-center gap-2"><Target className="w-4 h-4" /> 1v1 Random Map</span>
                                    </div>
                                </div>
                                <div className="text-right bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <div className="text-5xl font-black text-yellow-500 italic tracking-tighter leading-none">
                                        {selectedPlayer.rating}
                                    </div>
                                    <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mt-1">Current ELO</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Chart Section */}
                                <div className="bg-black/20 rounded-3xl p-6 border border-white/5 relative flex flex-col justify-center min-h-[250px]">
                                    <h4 className="absolute top-6 left-6 text-xs font-bold text-white/50 uppercase tracking-widest flex items-center gap-2">
                                        <Activity className="w-3 h-3 text-yellow-500" /> Performance
                                    </h4>
                                    <div className="h-[180px] w-full relative mt-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={chartData}
                                                    innerRadius={55}
                                                    outerRadius={75}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                    stroke="none"
                                                >
                                                    {chartData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip 
                                                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                                                    itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                        {/* Center Text */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-2">
                                            <span className="text-4xl font-black text-white italic">{winRate}%</span>
                                            <span className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Win Rate</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-rows-2 gap-4">
                                    <div className="bg-gradient-to-r from-emerald-900/10 to-transparent border border-emerald-500/10 rounded-3xl p-6 flex items-center justify-between group hover:border-emerald-500/30 transition-colors">
                                        <div>
                                            <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-1 group-hover:text-emerald-400">Victories</p>
                                            <p className="text-4xl font-black text-white italic">{selectedPlayer.wins}</p>
                                        </div>
                                        <Sword className="w-12 h-12 text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors" />
                                    </div>
                                    <div className="bg-gradient-to-r from-red-900/10 to-transparent border border-red-500/10 rounded-3xl p-6 flex items-center justify-between group hover:border-red-500/30 transition-colors">
                                        <div>
                                            <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mb-1 group-hover:text-red-400">Defeats</p>
                                            <p className="text-4xl font-black text-white italic">{selectedPlayer.losses}</p>
                                        </div>
                                        <Shield className="w-12 h-12 text-red-500/10 group-hover:text-red-500/20 transition-colors" />
                                    </div>
                                </div>
                            </div>

                            {/* Total Games Bar */}
                            <div className="mt-auto">
                                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                                    <div className="flex justify-between items-end mb-3">
                                        <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Total Matches Played</p>
                                        <p className="text-xl font-black text-white">{selectedPlayer.games}</p>
                                    </div>
                                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 1.5, ease: "circOut" }}
                                            className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-30 select-none">
                            <Target className="w-24 h-24 mb-6 text-white/50" />
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Awaiting Target</h3>
                            <p className="max-w-xs mt-2 text-sm font-mono text-white/50">Select a profile from the database to retrieve tactical analysis.</p>
                        </div>
                    )}
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
