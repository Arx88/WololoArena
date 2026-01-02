"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Globe, Activity, X, Loader2, Sword, Shield, Target, Crown, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCivilizationById } from "@/lib/data/civilizations"
import Image from "next/image"
import { format } from "date-fns"

const COLORS = ['#eab308', '#ef4444']; // Yellow (Win), Red (Loss)

interface PlayerData {
  profileId: string
  name: string
  country: string
  clan?: string
  rating: number
  rank: number
  games: number
  wins: number
  losses: number
  lastMatch?: number
}

export function PlayerSearchWidget() {
  const [mounted, setMounted] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<PlayerData[]>([])
  const [loading, setLoading] = React.useState(false)
  const [selectedProfile, setSelectedProfile] = React.useState<any | null>(null)
  const [activeTab, setActiveTab] = React.useState("rm_1v1")
  const [isLoadingProfile, setIsLoadingProfile] = React.useState(false)
  const [expandedMatchId, setExpandedMatchId] = React.useState<string | null>(null)

  // Hydration fix
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Debounce search
  React.useEffect(() => {
    if (!mounted || query.length < 2) {
      setResults([])
      return
    }
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/aoe2/search?name=${encodeURIComponent(query)}`)
        if (res.ok) {
          const data = await res.json()
          setResults(Array.isArray(data) ? data : [])
        }
      } catch (e) {
        console.error("Search fetch failed", e)
      } finally {
        setLoading(false)
      }
    }, 400)
    return () => clearTimeout(timer)
  }, [query, mounted])

  if (!mounted) return null;

  const handleSelect = async (player: PlayerData) => {
    // 1. Set basic info immediately from search results (INSTANT UI TRANSITION)
    setSelectedProfile({
        profileId: player.profileId,
        name: player.name,
        country: player.country,
        clan: player.clan,
        modes: {
            [activeTab]: { 
                rating: player.rating, 
                rank: player.rank,
                wins: 0, losses: 0, games: player.games,
                topCivs: [], topMaps: [], recentMatches: []
            }
        }
    });
    
    setIsLoadingProfile(true);
    setExpandedMatchId(null);

    try {
      const res = await fetch(`/api/aoe2/profile/${player.profileId}`)
      if (res.ok) {
        const data = await res.json()
        setSelectedProfile(data)
        // Reset loading after full data is in
        setIsLoadingProfile(false);
      }
    } catch (e) {
      console.error("Profile fetch failed", e)
      setIsLoadingProfile(false);
    }
  }

  const renderDashboardContent = (mode: string) => {
    const modeStats = selectedProfile?.modes?.[mode] || {
        rating: 0, maxRating: 0, wins: 0, losses: 0, games: 0, rank: 0, topCivs: [], topMaps: [], recentMatches: []
    };

    // If we are loading and have no match data, show skeleton/loading for the stats part
    const isFetchingStats = isLoadingProfile && (!modeStats.recentMatches || modeStats.recentMatches.length === 0);

    const winRate = modeStats.games > 0 ? Math.round((modeStats.wins / modeStats.games) * 100) : 0;

    if (isFetchingStats) {
        return (
            <div className="h-96 flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-500">
                <Loader2 className="w-10 h-10 animate-spin text-yellow-500/40" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Cargando estadísticas</p>
            </div>
        )
    }

    // Filter and format rating history
    const history = selectedProfile?.ratingHistory?.find((r: any) => r.leaderboardId === mode)?.ratings || [];
    // Take last 6 months (approx 180 days)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setDate(sixMonthsAgo.getDate() - 180);
    
    const chartData = history
        .filter((r: any) => new Date(r.date) >= sixMonthsAgo)
        .map((r: any) => ({
            date: format(new Date(r.date), "MMM d"),
            rating: r.rating
        }))
        .reverse(); // API suele devolver lo más nuevo primero

    const civMaster = modeStats.topCivs?.[0];
    const mapMaster = modeStats.topMaps?.[0];
    const cm = civMaster ? getCivilizationById(civMaster.id) : null;

    return (
        <div className="mt-4 space-y-16 animate-in fade-in zoom-in-95 duration-500 pb-12">
            {/* Master Highlights */}
            {(civMaster || mapMaster) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {civMaster && cm && (
                        <div className="relative group overflow-hidden rounded-3xl bg-[#0a0a0b] border border-yellow-500/20 h-80 flex flex-col justify-end p-8 transition-all hover:border-yellow-500/40">
                            {/* Background Glow Effect */}
                            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none" />
                            
                            {/* Epic Unit Image - Using Mask for perfect edge integration */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                <div className="relative w-full h-full">
                                    <Image 
                                        src={cm.uniqueUnitImage} 
                                        alt="" 
                                        fill 
                                        className="object-cover object-center scale-110 group-hover:scale-125 transition-transform duration-1000 opacity-60 group-hover:opacity-100"
                                        style={{
                                            maskImage: 'linear-gradient(to left, black 30%, transparent 95%), linear-gradient(to top, black 30%, transparent 95%)',
                                            WebkitMaskImage: 'linear-gradient(to left, black 30%, transparent 95%), linear-gradient(to top, black 30%, transparent 95%)'
                                        }}
                                    />
                                    {/* Overlay Gradient to protect text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-80" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b] via-[#0a0a0b]/40 to-transparent" />
                                </div>
                            </div>

                            <div className="relative z-10 space-y-4 max-w-[60%]">
                                <Badge className="bg-yellow-500 text-black font-black text-[9px] uppercase tracking-[0.2em] px-3 py-1 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                                    Civilization Master
                                </Badge>
                                <div>
                                    <h3 className="text-5xl font-black text-white italic leading-none drop-shadow-2xl">{cm.name}</h3>
                                    <div className="text-yellow-500 font-bold text-sm uppercase tracking-[0.3em] mt-3 flex items-center gap-2">
                                        <div className="h-px w-4 bg-yellow-500" /> {civMaster.winRate}% PROFICIENCY
                                    </div>
                                </div>
                                <div className="flex gap-8 items-center pt-2">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Battles</p>
                                        <p className="text-2xl font-black text-white italic leading-none">{civMaster.games}</p>
                                    </div>
                                    <div className="h-10 w-px bg-white/10" />
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Specialist</p>
                                        <p className="text-lg font-black text-yellow-500/90 italic leading-none uppercase tracking-tight">{cm.uniqueUnit}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {mapMaster && (
                        <div className="relative group overflow-hidden rounded-3xl bg-white/[0.02] border border-white/5 p-8 h-80 flex flex-col justify-end transition-all hover:bg-white/[0.04]">
                            <div className="relative z-10 space-y-6">
                                <Badge className="w-fit bg-white/10 text-white/60 font-black text-[9px] uppercase tracking-widest px-3 py-1 border border-white/5">Terrain Master</Badge>
                                <div>
                                    <h3 className="text-5xl font-black text-white italic leading-none uppercase tracking-tighter">{mapMaster.name}</h3>
                                    <div className="text-white/40 font-bold text-xs uppercase tracking-[0.3em] mt-4 flex items-center gap-2">
                                        <div className="h-px w-4 bg-white/20" /> Strategic Stronghold
                                    </div>
                                </div>
                                
                                <div className="pt-4 flex gap-12">
                                    <div>
                                        <span className="block text-[9px] font-black text-white/20 uppercase tracking-widest mb-2">Win Rate</span>
                                        <span className="text-4xl font-black text-emerald-500 italic leading-none">{mapMaster.winRate}%</span>
                                    </div>
                                    <div className="h-10 w-px bg-white/10 mt-auto" />
                                    <div>
                                        <span className="block text-[9px] font-black text-white/20 uppercase tracking-widest mb-2">Engagements</span>
                                        <span className="text-4xl font-black text-white italic leading-none">{mapMaster.games}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -right-16 -bottom-16 opacity-5 group-hover:opacity-10 transition-all duration-1000 group-hover:scale-110">
                                <Globe size={320} className="text-white" />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center text-center">
                    <div className="relative h-36 w-36 mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={[{ value: modeStats.wins || 0 }, { value: modeStats.losses || 0 }]} 
                                    innerRadius={55} 
                                    outerRadius={65} 
                                    startAngle={90}
                                    endAngle={-270}
                                    paddingAngle={4} 
                                    dataKey="value" 
                                    stroke="none"
                                >
                                    {COLORS.map((c, i) => <Cell key={i} fill={c} className="drop-shadow-[0_0_5px_rgba(0,0,0,0.5)]" />)}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                            <span className="text-3xl font-black text-white italic">{winRate}%</span>
                            <span className="text-[8px] text-white/30 uppercase font-black">Win Rate</span>
                        </div>
                    </div>
                    <div className="flex gap-6 text-[10px] font-black uppercase italic tracking-tighter">
                        <span className="text-yellow-500">{modeStats.wins || 0} Victories</span>
                        <span className="text-red-500">{modeStats.losses || 0} Defeats</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-5 flex justify-between items-center group hover:bg-emerald-500/10 transition-all">
                        <div className="flex items-center gap-3">
                            <Sword className="w-5 h-5 text-emerald-500" />
                            <span className="text-[10px] font-black text-white/60 uppercase">Total Matches</span>
                        </div>
                        <span className="text-2xl font-black text-white italic">{modeStats.games || 0}</span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex justify-between items-center group hover:border-yellow-500/30 transition-all">
                        <div className="flex items-center gap-3">
                            <Target className="w-5 h-5 text-yellow-500/50 group-hover:text-yellow-500" />
                            <span className="text-[10px] font-black text-white/60 uppercase">Global Rank</span>
                        </div>
                        <span className="text-2xl font-black text-white italic">#{modeStats.rank || "-"}</span>
                    </div>

                    {/* Worst Matchup Section */}
                    <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-5 flex justify-between items-center group hover:bg-red-500/10 transition-all">
                        <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-red-500/50 group-hover:text-red-500" />
                            <span className="text-[10px] font-black text-white/60 uppercase">Worst Matchup</span>
                        </div>
                        {modeStats.worstCiv ? (() => {
                            const wc = getCivilizationById(modeStats.worstCiv);
                            return (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-black text-white uppercase italic">{wc?.name || modeStats.worstCiv}</span>
                                    {wc?.icon && <div className="relative w-6 h-6 rounded-md overflow-hidden"><Image src={wc.icon} alt="" fill className="object-cover opacity-80" /></div>}
                                </div>
                            )
                        })() : <span className="text-xs font-bold text-white/20 italic">NONE FOUND</span>}
                    </div>
                </div>
            </div>

            {/* ELO History Chart */}
            {chartData.length > 1 && (
                <div className="h-64 w-full bg-white/[0.02] border border-white/5 rounded-3xl p-6 relative group hover:border-yellow-500/20 transition-all">
                    <p className="absolute top-6 left-6 text-[10px] font-black text-white/30 uppercase tracking-widest z-10">Performance Trajectory (6 Months)</p>
                    <div className="h-full w-full pt-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis dataKey="date" hide />
                                <YAxis domain={['auto', 'auto']} hide />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                                    itemStyle={{ color: '#eab308', fontWeight: 'bold', fontSize: '12px' }}
                                    labelStyle={{ color: '#666', fontSize: '10px', marginBottom: '4px' }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="rating" 
                                    stroke="#eab308" 
                                    strokeWidth={2}
                                    fillOpacity={1} 
                                    fill="url(#colorRating)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* Civs & Maps Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.4em] flex items-center gap-3">
                        <div className="h-px w-8 bg-yellow-500/30" /> Civilization Mastery
                    </h4>
                    <div className="space-y-3">
                        {modeStats.topCivs?.length > 0 ? modeStats.topCivs.map((civ: any, i: number) => {
                            const c = getCivilizationById(civ.id);
                            return (
                                <div key={civ.id || `civ-${i}`} className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-yellow-500/30 transition-all">
                                    <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-white/10 group-hover:scale-110 transition-transform">
                                        {c?.icon ? <Image src={c.icon} alt="" fill className="object-cover" /> : <Shield className="w-full h-full p-2 opacity-20" />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-end mb-1.5">
                                            <span className="text-sm font-black text-white uppercase italic">{c?.name || `Civ ${civ.id}`}</span>
                                            <span className="text-[10px] font-black text-yellow-500">{civ.winRate}% WR</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: `${civ.winRate}%` }} className="h-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                                        </div>
                                    </div>
                                    <div className="text-right pl-4">
                                        <p className="text-[10px] font-black text-white/20 uppercase leading-none">{civ.games}</p>
                                        <p className="text-[8px] font-bold text-white/10 uppercase">Matches</p>
                                    </div>
                                </div>
                            )
                        }) : <p className="text-[10px] text-white/20 italic uppercase tracking-widest text-center py-10 border border-white/5 rounded-2xl">No match data found</p>}
                    </div>
                </div>

                <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] flex items-center gap-3">
                        <div className="h-px w-8 bg-white/10" /> Terrain Performance
                    </h4>
                    <div className="space-y-3">
                        {modeStats.topMaps?.length > 0 ? modeStats.topMaps.map((map: any, i: number) => (
                            <div key={map.id || map.name || `map-${i}`} className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/5 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="h-2 w-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                                    <span className="text-sm font-black text-white/80 uppercase italic tracking-tight">{map.name}</span>
                                </div>
                                <div className="flex items-center gap-8">
                                    <span className="text-[10px] font-bold text-white/30 uppercase">{map.games} Battles</span>
                                    <span className={cn("text-base font-black italic", map.winRate >= 50 ? "text-emerald-500" : "text-red-500")}>{map.winRate}%</span>
                                </div>
                            </div>
                        )) : <p className="text-[10px] text-white/20 italic uppercase tracking-widest text-center py-10 border border-white/5 rounded-2xl">No terrain intel available</p>}
                    </div>
                </div>
            </div>

            {/* Recent Matchups Section */}
            <div className="space-y-6">
                <h4 className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.4em] flex items-center gap-3">
                    <div className="h-px w-8 bg-yellow-500/30" /> Recent Engagements
                </h4>
                <div className="grid grid-cols-1 gap-4">
                    {modeStats.recentMatches?.length > 0 ? modeStats.recentMatches.map((match: any, idx: number) => {
                        const matchId = match.matchId || `match-${idx}`;
                        const isExpanded = expandedMatchId === matchId;
                        const isTG = match.myTeam?.length > 1 || match.opponentTeam?.length > 1;
                        
                        return (
                            <div 
                                key={matchId} 
                                onClick={() => isTG && setExpandedMatchId(isExpanded ? null : matchId)}
                                className={cn(
                                    "relative group overflow-hidden bg-white/[0.02] border rounded-2xl transition-all",
                                    isTG ? "cursor-pointer" : "cursor-default",
                                    isExpanded ? "border-yellow-500/40 bg-white/[0.05]" : "border-white/5 hover:bg-white/[0.04]"
                                )}
                            >
                                <div className="relative z-10 flex items-center justify-between gap-4 p-6">
                                    {/* My Team Side */}
                                    <div className="flex items-center gap-3 w-[40%]">
                                        <div className="flex -space-x-3 shrink-0">
                                            {match.myTeam.map((p: any, pIdx: number) => {
                                                const c = getCivilizationById(p.civ);
                                                return (
                                                    <div key={pIdx} className="relative h-9 w-9 rounded-lg overflow-hidden border-2 border-[#0c0c0e] shadow-xl z-[1]">
                                                        {c?.icon ? <Image src={c.icon} alt="" fill className="object-cover" /> : <Shield className="w-full h-full p-2 opacity-20 bg-black" />}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[7px] font-black text-yellow-500/50 uppercase tracking-widest leading-none mb-1">
                                                {isTG ? "TU EQUIPO" : match.myTeam[0]?.name || "TÚ"}
                                            </p>
                                            <p className="text-[10px] font-bold text-white/60 uppercase truncate italic">
                                                {match.myTeam.map((p: any) => getCivilizationById(p.civ)?.name || "Civ").join(" / ")}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Versus Info */}
                                    <div className="flex flex-col items-center gap-1 shrink-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[8px] font-black text-white/20 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">{match.modeLabel}</span>
                                            <div className={cn(
                                                "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg border",
                                                match.won ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                                            )}>
                                                {match.won ? "Victoria" : "Derrota"}
                                            </div>
                                        </div>
                                        <p className="text-[9px] font-black text-white/30 uppercase italic tracking-tighter mt-1">{match.map}</p>
                                    </div>

                                    {/* Opponent Team Side */}
                                    <div className="flex items-center gap-3 justify-end w-[40%] text-right">
                                        <div className="min-w-0">
                                            <p className="text-[7px] font-black text-white/30 uppercase tracking-widest leading-none mb-1">
                                                {isTG ? "OPONENTES" : match.opponentTeam[0]?.name || "RIVAL"}
                                            </p>
                                            <p className="text-[10px] font-bold text-white/60 uppercase truncate italic">
                                                {match.opponentTeam.map((p: any) => getCivilizationById(p.civ)?.name || "Civ").join(" / ")}
                                            </p>
                                        </div>
                                        <div className="flex -space-x-3 shrink-0">
                                            {match.opponentTeam.map((p: any, pIdx: number) => {
                                                const c = getCivilizationById(p.civ);
                                                return (
                                                    <div key={pIdx} className="relative h-9 w-9 rounded-lg overflow-hidden border-2 border-[#0c0c0e] shadow-xl z-[1]">
                                                        {c?.icon ? <Image src={c.icon} alt="" fill className="object-cover" /> : <Shield className="w-full h-full p-2 opacity-20 bg-black" />}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Roster Details */}
                                <AnimatePresence>
                                    {isExpanded && isTG && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden border-t border-white/5 bg-black/20"
                                        >
                                            <div className="p-6 grid grid-cols-2 gap-12">
                                                {/* Left Team Names */}
                                                <div className="space-y-3">
                                                    {match.myTeam.map((p: any, pIdx: number) => (
                                                        <div key={pIdx} className="flex items-center gap-3">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                                            <span className={cn("text-xs font-bold uppercase tracking-tight", p.name === selectedProfile.name ? "text-yellow-500" : "text-white/60")}>
                                                                {p.name}
                                                            </span>
                                                            <span className="text-[10px] font-black text-white/20 italic">({getCivilizationById(p.civ)?.name})</span>
                                                            {isTG && match.myTeamMvpName === p.name && (
                                                                <div className="flex items-center gap-1 bg-yellow-500/10 px-1.5 py-0.5 rounded border border-yellow-500/20">
                                                                    <Crown className="w-2.5 h-2.5 text-yellow-500" />
                                                                    <span className="text-[8px] font-black text-yellow-500 uppercase">MVP</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                                {/* Right Team Names */}
                                                <div className="space-y-3 text-right">
                                                    {match.opponentTeam.map((p: any, pIdx: number) => (
                                                        <div key={pIdx} className="flex items-center gap-3 justify-end">
                                                            {isTG && match.opponentTeamMvpName === p.name && (
                                                                <div className="flex items-center gap-1 bg-yellow-500/10 px-1.5 py-0.5 rounded border border-yellow-500/20">
                                                                    <span className="text-[8px] font-black text-yellow-500 uppercase">MVP</span>
                                                                    <Crown className="w-2.5 h-2.5 text-yellow-500" />
                                                                </div>
                                                            )}
                                                            <span className="text-[10px] font-black text-white/20 italic">({getCivilizationById(p.civ)?.name})</span>
                                                            <span className="text-xs font-bold text-white/60 uppercase tracking-tight">{p.name}</span>
                                                            <div className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Progress bar representation of the win/loss */}
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
                                    <div className={cn("h-full transition-all duration-1000", match.won ? "bg-emerald-500 w-full" : "bg-red-500 w-full opacity-20")} />
                                </div>
                            </div>
                        );
                    }) : (
                        <div className="py-12 border border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center opacity-20">
                            <Activity className="w-8 h-8 mb-3" />
                            <p className="text-[10px] font-black uppercase tracking-[0.3em]">No recent combat logs</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
  }

  return (
    <>
      {/* Floating Trigger Button - Restored Name PLAYER SEARCH */}
      <AnimatePresence mode="wait">
        {!isOpen && (
            <motion.button
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 px-10 py-5 bg-black border-2 border-yellow-600/30 text-yellow-500 font-black uppercase tracking-[0.3em] text-xs transition-all shadow-[0_0_50px_-10px_rgba(234,179,8,0.4)] border-r-8 border-yellow-600 group rounded-none"
            >
                <div className="relative">
                    <Search className="w-5 h-5 transition-transform group-hover:rotate-12" />
                    <div className="absolute inset-0 bg-yellow-500 blur-lg opacity-0 group-hover:opacity-40 transition-opacity" />
                </div>
                <span className="font-cinzel tracking-[0.2em]">PLAYER SEARCH</span>
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-yellow-500/50" />
                <div className="absolute bottom-0 right-8 w-2 h-2 border-b border-r border-yellow-500/50" />
            </motion.button>
        )}
      </AnimatePresence>

      {/* Pop-up Dashboard */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />

            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-6xl bg-[#0a0a0b] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh] max-h-[850px]"
            >
                {/* Left: Search Panel */}
                <div className="w-full md:w-[380px] flex flex-col border-r border-white/5 bg-[#050505] shrink-0">
                    <div className="p-6 border-b border-white/5 bg-[#0a0a0b]">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0">
                                <Search className="w-5 h-5 text-yellow-500" />
                            </div>
                            <input 
                                className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/10 font-bold h-12 text-lg tracking-tight"
                                placeholder="IDENTIFY PLAYER..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                autoFocus
                            />
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 text-white/20 rounded-lg"><X className="w-5 h-5" /></button>
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
                        {loading && <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-yellow-500/50" /></div>}
                        {!loading && results.length === 0 && query.length > 1 && (
                            <div className="text-center py-10 opacity-20 italic text-sm">No records found</div>
                        )}
                        {results.map(player => (
                            <button key={player.profileId} onClick={() => handleSelect(player)} className={cn("w-full flex items-center gap-3 p-4 rounded-xl transition-all text-left border border-transparent", selectedProfile?.profileId === player.profileId ? "bg-white/10 border-white/10" : "hover:bg-white/5")}>
                                <div className={cn("h-10 w-10 rounded-lg border flex items-center justify-center shrink-0 font-black text-lg relative", selectedProfile?.profileId === player.profileId ? "bg-yellow-500 text-black border-yellow-500" : "bg-black border-white/10 text-white/40")}>
                                    {player.name.charAt(0).toUpperCase()}
                                    {player.rank > 0 && player.rank <= 100 && (
                                        <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-0.5 shadow-lg">
                                            <Crown className="w-2.5 h-2.5 text-black" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={cn("font-bold truncate", selectedProfile?.profileId === player.profileId ? "text-white" : "text-zinc-300")}>{player.name}</p>
                                    <p className="text-[10px] text-white/30 uppercase font-mono">
                                        {player.country} {player.clan ? `// [${player.clan}]` : ""} // ID: {player.profileId}
                                    </p>
                                </div>
                                <div className="text-right"><p className="text-sm font-black text-yellow-500 italic">{player.rating}</p></div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Dashboard */}
                <div className="flex-1 relative bg-[#0c0c0e] overflow-hidden flex flex-col">
                    {selectedProfile ? (
                        <div className="h-full flex flex-col">
                            <div className="p-8 border-b border-white/5 bg-gradient-to-b from-black/40 to-transparent">
                                <div className="flex justify-between items-end">
                                    <div className="space-y-4">
                                        <Badge className="bg-yellow-500 text-black font-black text-[10px] uppercase">Verified Profile</Badge>
                                        <h2 className="text-5xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none font-cinzel">
                                            {selectedProfile.name}
                                        </h2>
                                        <div className="flex flex-wrap items-center gap-6 text-white/40 text-[10px] font-black uppercase tracking-widest">
                                            <span className="flex items-center gap-2"><Globe className="w-3 h-3" /> {selectedProfile.country || "GLOBAL"}</span>
                                            <span className="flex items-center gap-2"><Crown className="w-3 h-3 text-yellow-500" /> ID: {selectedProfile.profileId}</span>
                                            {selectedProfile.clan && (
                                                <span className="flex items-center gap-2 text-yellow-500 font-black bg-yellow-500/10 px-2 py-1 rounded-md border border-yellow-500/20">
                                                    <Sword className="w-3 h-3" /> CLAN: {selectedProfile.clan}
                                                </span>
                                            )}
                                            {selectedProfile.nameHistory?.length > 0 && (
                                                <span className="flex items-center gap-2 text-emerald-400 font-bold italic bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
                                                    <Activity className="w-3 h-3" /> AKA: {selectedProfile.nameHistory.join(", ")}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Prominent ELO Display */}
                                    <div className="text-right pb-1">
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-[10px] font-black text-yellow-500/50 uppercase tracking-[0.3em] mb-1">CURRENT ELO</p>
                                                <div className="flex items-baseline gap-2 justify-end">
                                                    <span className="text-6xl font-black text-yellow-500 italic leading-none drop-shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                                                        {selectedProfile.modes?.[activeTab]?.rating || 0}
                                                    </span>
                                                    <span className="text-xl font-black text-white/20 italic uppercase tracking-tighter">PTS</span>
                                                </div>
                                            </div>
                                            <div className="pt-2 border-t border-white/5">
                                                <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mb-0.5">PEAK PERFORMANCE</p>
                                                <p className="text-xl font-black text-white/60 italic leading-none">
                                                    {selectedProfile.modes?.[activeTab]?.maxRating || 0} <span className="text-[10px] text-white/10 not-italic font-bold ml-1">MAX ELO</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
                                <div className="px-8 bg-black/20 border-b border-white/5">
                                    <TabsList className="bg-transparent p-0 gap-2 h-14 justify-start rounded-none">
                                        {["rm_1v1", "rm_team", "unranked"].map(m => (
                                            <TabsTrigger 
                                                key={m} 
                                                value={m} 
                                                className="bg-transparent data-[state=active]:bg-white/5 hover:bg-white/[0.02] border-b-2 border-transparent data-[state=active]:border-yellow-500 rounded-none h-14 px-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 data-[state=active]:text-yellow-500 transition-all cursor-pointer relative"
                                            >
                                                {m === "rm_1v1" ? "1v1 Ranked" : m === "rm_team" ? "Team Games" : "Unranked"}
                                                {activeTab === m && (
                                                    <motion.div 
                                                        layoutId="activeTab"
                                                        className="absolute inset-0 border-b-2 border-yellow-500 shadow-[0_4px_20px_-2px_rgba(234,179,8,0.3)]"
                                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                    />
                                                )}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>
                                </div>

                                <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                                    {["rm_1v1", "rm_team", "unranked"].map(mode => (
                                        <TabsContent key={mode} value={mode} className="mt-0">
                                            {renderDashboardContent(mode)}
                                        </TabsContent>
                                    ))}
                                </div>
                            </Tabs>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-30 select-none">
                            <Target className="w-24 h-24 mb-6 text-white/50" />
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white font-cinzel">Awaiting Selection</h3>
                            <p className="max-w-xs mt-2 text-sm font-mono text-white/50 tracking-wider">Select a profile from the search results to retrieve full player statistics.</p>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Bottom Dismissal Arrow */}
            <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onClick={() => setIsOpen(false)}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 group"
            >
                <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] group-hover:text-yellow-500/50 transition-colors">Dismiss</span>
                <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md group-hover:bg-yellow-500/20 group-hover:border-yellow-500/30 transition-all">
                    <ChevronDown className="w-5 h-5 text-white/40 group-hover:text-yellow-500 group-hover:translate-y-0.5 transition-all" />
                </div>
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}