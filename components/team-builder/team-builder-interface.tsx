"use client"

import { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
} from "recharts"
import {
  CIVILIZATIONS,
  calculateTeamSynergy,
  getBestCivSynergies,
  getCounterComposition,
  getImprovementSuggestions,
  type Civilization,
  type TeamGameMode,
} from "@/lib/data/civilizations"
import { calculateAdvancedSynergy } from "@/lib/data/synergy-calculator"
import {
  Plus,
  X,
  Shield,
  Swords,
  TrendingUp,
  Target,
  Crown,
  Zap,
  RotateCcw,
  CheckCircle2,
  Search,
  ChevronRight,
  Ship,
  LayoutGrid
} from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// --- TYPES ---
interface TeamRatings {
  economy: number;
  rush: number;
  lateGame: number;
  defense: number;
  mobility: number;
}

// --- HELPER: ARCHETYPE DETECTION ---
function getTeamArchetype(civs: Civilization[]) {
  if (civs.length === 0) return null;
  const tags = civs.flatMap(c => c.synergyTags);
  const count = (tag: string) => tags.filter(t => t === tag).length;

  if (count('cavalry') >= 2 || count('knights') >= 2) return { name: "Cavalry Blitz", color: "text-blue-400", icon: Swords };
  if (count('archers') >= 2) return { name: "Archer Wall", color: "text-emerald-400", icon: Target };
  if (count('defense') >= 2) return { name: "Steel Fortress", color: "text-zinc-400", icon: Shield };
  if (count('navy') >= 2) return { name: "Ocean Sovereignty", color: "text-cyan-400", icon: Ship };
  
  return { name: "Balanced Alliance", color: "text-primary", icon: Zap };
}

// --- RADAR CHART COMPONENT ---
function TeamRadarChart({ ratings }: { ratings: TeamRatings }) {
  const data = [
    { subject: 'Economy', A: ratings.economy, fullMark: 10 },
    { subject: 'Rush', A: ratings.rush, fullMark: 10 },
    { subject: 'Late Game', A: ratings.lateGame, fullMark: 10 },
    { subject: 'Defense', A: ratings.defense, fullMark: 10 },
    { subject: 'Mobility', A: ratings.mobility, fullMark: 10 },
  ];

  return (
    <div className="h-[280px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#333" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 10, fontWeight: 'bold' }} />
          <Radar
            name="Team"
            dataKey="A"
            stroke="#eab308"
            fill="#eab308"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

function CivButton({ civ, isSelected, isDisabled, onClick, teamBonusLabel }: any) {
  return (
    <TooltipProvider delayDuration={700}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            disabled={isDisabled && !isSelected}
            className={cn(
              "group relative flex flex-col items-center gap-1.5 rounded-lg border p-2 transition-all",
              isSelected
                ? "border-yellow-500 bg-yellow-500/20 ring-1 ring-yellow-500/30 shadow-md scale-105 z-10"
                : isDisabled
                  ? "cursor-not-allowed border-white/5 bg-card/10 opacity-20 grayscale"
                  : "border-white/10 bg-black/40 hover:border-yellow-500/50 hover:bg-zinc-900 shadow-sm"
            )}
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-white/10">
              <Image src={civ.icon || "/placeholder.svg"} alt={civ.name} fill className="object-cover transition-transform group-hover:scale-110" unoptimized />
            </div>
            <span className={cn("text-[9px] font-black uppercase tracking-tighter truncate max-w-full transition-colors", isSelected ? "text-yellow-500" : "text-zinc-500 group-hover:text-zinc-300")}>
              {civ.name}
            </span>
            {isSelected && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg border border-black/20">
                <CheckCircle2 className="h-2.5 w-2.5 text-black" />
              </motion.div>
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="max-w-xs bg-zinc-950 border-yellow-500/30 text-white shadow-[0_10px_40px_rgba(0,0,0,1)] backdrop-blur-xl p-4 rounded-xl"
        >
          <p className="font-black text-yellow-500 uppercase italic tracking-tighter text-base mb-1">{civ.name}</p>
          <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-3">{civ.specialty}</p>
          <div className="pt-3 border-t border-white/5">
             <div className="flex items-center gap-2 mb-1">
                <Shield className="h-3 w-3 text-yellow-600" />
                <span className="text-[9px] font-black text-yellow-600 uppercase tracking-widest">{teamBonusLabel}</span>
             </div>
             <p className="text-xs font-medium text-zinc-300 leading-snug italic">{civ.teamBonus}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function TeamBuilderInterface() {
  const { t } = useLanguage()
  const [selectedCivs, setSelectedCivs] = useState<string[]>([])
  const [teamSize, setTeamSize] = useState<2 | 3 | 4>(2)
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("builder")

  const gameMode: TeamGameMode = `${teamSize}v${teamSize}` as TeamGameMode

  const analysis = useMemo(() => {
    if (selectedCivs.length === 0) return null;
    const civs = selectedCivs.map(id => CIVILIZATIONS.find(c => c.id === id)!).filter(Boolean);
    
    const sum = civs.reduce((acc, civ) => ({
      economy: acc.economy + civ.ratings.economy,
      rush: acc.rush + civ.ratings.rush,
      lateGame: acc.lateGame + civ.ratings.lateGame,
      defense: acc.defense + civ.ratings.defense,
      mobility: acc.mobility + civ.ratings.mobility,
    }), { economy: 0, rush: 0, lateGame: 0, defense: 0, mobility: 0 });

    const teamRatings = {
      economy: Math.round(sum.economy / civs.length),
      rush: Math.round(sum.rush / civs.length),
      lateGame: Math.round(sum.lateGame / civs.length),
      defense: Math.round(sum.defense / civs.length),
      mobility: Math.round(sum.mobility / civs.length),
    };

    return {
      advanced: calculateAdvancedSynergy(selectedCivs, gameMode),
      synergy: calculateTeamSynergy(selectedCivs, gameMode),
      counter: getCounterComposition(selectedCivs),
      improvement: getImprovementSuggestions(selectedCivs, gameMode),
      teamRatings,
      archetype: getTeamArchetype(civs)
    };
  }, [selectedCivs, gameMode]);

  const selectedCivData = useMemo(() => 
    selectedCivs.map((id) => CIVILIZATIONS.find((c) => c.id === id)).filter(Boolean) as Civilization[]
  , [selectedCivs])

  const filteredCivs = useMemo(() => {
    return CIVILIZATIONS.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                           c.specialty.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = activeFilter === 'all' || c.specialty.toLowerCase().includes(activeFilter.toLowerCase());
      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  const addCiv = useCallback((civId: string) => {
    setSelectedCivs((prev) => {
      if (prev.length < teamSize && !prev.includes(civId)) return [...prev, civId];
      return prev;
    });
  }, [teamSize]);

  const removeCiv = useCallback((civId: string) => {
    setSelectedCivs((prev) => prev.filter((id) => id !== civId));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      
      <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
        
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(teamSize)].map((_, i) => {
              const civ = selectedCivData[i];
              return (
                <div 
                  key={i} 
                  className={cn(
                    "relative aspect-[4/5] rounded-3xl border-2 flex flex-col items-center justify-center transition-all duration-500 overflow-hidden",
                    civ ? "border-yellow-500/40 bg-zinc-900 shadow-2xl" : "border-white/5 bg-white/[0.02] border-dashed"
                  )}
                >
                  <AnimatePresence mode="wait">
                    {civ ? (
                      <motion.div 
                        key={civ.id}
                        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
                        className="flex flex-col items-center p-4 w-full h-full justify-between"
                      >
                        <Button 
                          variant="ghost" size="icon" 
                          className="absolute top-2 right-2 h-8 w-8 rounded-full hover:bg-red-500 hover:text-white text-white/20"
                          onClick={() => removeCiv(civ.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        
                        <div className="relative w-24 h-24 mt-4 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                          <Image src={civ.icon} alt="" fill className="object-contain" unoptimized />
                        </div>
                        
                        <div className="text-center pb-4">
                          <span className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.2em]">{t("player")} {i+1}</span>
                          <h4 className="text-xl font-black text-white italic font-cinzel uppercase leading-none mt-1">{civ.name}</h4>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex flex-col items-center gap-3 opacity-20">
                        <div className="h-16 w-16 rounded-full border-2 border-dashed border-white/40 flex items-center justify-center">
                           <Plus className="h-8 w-8" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Awaiting Command</span>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          <Card className="bg-[#0a0a0b]/60 border-white/5 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 flex flex-col md:flex-row gap-6 items-center justify-between border-b border-white/5">
               <div className="flex bg-black/40 p-1 rounded-xl border border-white/10 overflow-x-auto no-scrollbar max-w-full">
                  {[
                    { id: 'all', label: 'All', icon: LayoutGrid },
                    { id: 'cavalry', label: 'Cavalry', icon: Swords },
                    { id: 'archer', label: 'Archers', icon: Target },
                    { id: 'infantry', label: 'Infantry', icon: Shield },
                    { id: 'navy', label: 'Naval', icon: Ship },
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setActiveFilter(f.id)}
                      className={cn(
                        "flex items-center gap-2 px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                        activeFilter === f.id ? "bg-yellow-600 text-black shadow-lg" : "text-white/40 hover:text-white"
                      )}
                    >
                      <f.icon className="h-3.5 w-3.5" /> {f.label}
                    </button>
                  ))}
               </div>
               
               <div className="relative w-full md:w-64 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-yellow-500 transition-colors" />
                  <input 
                    placeholder="Search civ..." 
                    value={search} onChange={e => setSearch(e.target.value)}
                    className="w-full h-11 bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 text-xs font-bold text-white focus:border-yellow-500 outline-none transition-all"
                  />
               </div>
            </div>

            <CardContent className="p-6">
               <ScrollArea className="h-[400px] pr-4">
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                    {filteredCivs.map(civ => (
                      <CivButton 
                        key={civ.id} civ={civ} 
                        isSelected={selectedCivs.includes(civ.id)} 
                        isDisabled={selectedCivs.length >= teamSize}
                        onClick={() => selectedCivs.includes(civ.id) ? removeCiv(civ.id) : addCiv(civ.id)}
                        teamBonusLabel={t("teamBonus")}
                      />
                    ))}
                  </div>
               </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <aside className="lg:sticky lg:top-24 space-y-6">
          <Card className="bg-[#0a0a0b]/80 border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border-yellow-500/10">
            <CardHeader className="py-6 px-8 border-b border-white/5 bg-yellow-500/[0.02]">
               <div className="flex items-center justify-between">
                  <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-white/60 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-yellow-500" /> Tactical Analysis
                  </CardTitle>
                  <div className="flex gap-2">
                    {[2, 3, 4].map(s => (
                      <button key={s} onClick={() => { setTeamSize(s as any); setSelectedCivs(prev => prev.slice(0, s)); }} className={cn("text-[9px] font-black px-2 py-1 rounded border transition-all", teamSize === s ? "bg-yellow-600 border-yellow-500 text-black" : "border-white/10 text-white/20 hover:text-white")}>{s}v{s}</button>
                    ))}
                  </div>
               </div>
            </CardHeader>
            <CardContent className="p-8">
               {!analysis ? (
                 <div className="py-20 text-center flex flex-col items-center gap-4">
                    <div className="h-16 w-16 rounded-full border border-white/5 flex items-center justify-center animate-pulse">
                       <Zap className="h-8 w-8 text-white/5" />
                    </div>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Select Squad to Initialize</p>
                 </div>
               ) : (
                 <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                    <div className="flex items-center justify-between bg-white/5 p-5 rounded-2xl border border-white/5">
                       <div className="flex items-center gap-4">
                          <div className={cn("h-12 w-12 rounded-xl bg-black flex items-center justify-center border border-white/10 shadow-inner", analysis.archetype?.color)}>
                             {analysis.archetype && <analysis.archetype.icon className="h-6 w-6" />}
                          </div>
                          <div>
                             <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Formation</span>
                             <p className={cn("text-lg font-black uppercase italic leading-none", analysis.archetype?.color)}>{analysis.archetype?.name}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-3xl font-black text-white leading-none">{analysis.advanced.score}%</p>
                          <span className="text-[8px] font-black text-yellow-500 uppercase tracking-widest">Synergy Rank</span>
                       </div>
                    </div>

                    <div className="flex flex-col items-center">
                       <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] mb-2">Power Distribution</span>
                       <TeamRadarChart ratings={analysis.teamRatings} />
                    </div>

                    <div className="space-y-4">
                       <h5 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                          <Shield className="h-3 w-3" /> Combined Team Bonuses
                       </h5>
                       <div className="grid gap-2">
                          {analysis.synergy.teamBonuses.map((b, i) => (
                             <div key={i} className="text-[10px] font-bold text-zinc-400 py-2 px-3 bg-white/[0.02] border-l-2 border-yellow-600 rounded-r-lg italic">
                                {b}
                             </div>
                          ))}
                       </div>
                    </div>

                    <Button onClick={() => setActiveTab("synergies")} className="w-full h-12 bg-zinc-900 border border-white/10 hover:bg-white/5 text-white font-black text-[10px] uppercase tracking-[0.2em]">
                       View Full Tactical Veredict <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                 </div>
               )}
            </CardContent>
          </Card>
        </aside>

      </div>

      <div className="mt-12">
         {activeTab === 'synergies' && (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
               <div className="flex items-center gap-4 mb-8">
                  <Crown className="h-8 w-8 text-yellow-500" />
                  <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white">Elite Compendium</h3>
                  <Button variant="ghost" onClick={() => setActiveTab("builder")} className="ml-auto text-yellow-500 text-[10px] font-black uppercase tracking-widest"><RotateCcw className="mr-2 h-4 w-4" /> Return to Builder</Button>
               </div>
               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                 {getBestCivSynergies().map((syn, i) => (
                   <Card key={i} className="bg-[#0a0a0b]/80 border-white/10 backdrop-blur-xl rounded-3xl p-6 hover:border-yellow-500/30 transition-all group">
                     <div className="flex items-center justify-between mb-6">
                        <div className="flex -space-x-3">
                           {syn.civs.map(name => {
                             const c = CIVILIZATIONS.find(civ => civ.name.toLowerCase() === name.toLowerCase())
                             return <div key={name} className="h-12 w-12 rounded-xl border-2 border-black bg-zinc-900 relative overflow-hidden p-2 shadow-xl"><Image src={c?.icon || ""} alt="" fill className="object-contain p-2" /></div>
                           })}
                        </div>
                        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] font-black">{syn.score}% Synergy</Badge>
                     </div>
                     <h4 className="text-xl font-black text-white italic uppercase mb-2">{syn.civs.join(" + ")}</h4>
                     <p className="text-xs text-zinc-500 font-medium leading-relaxed italic">"{syn.reason}"</p>
                   </Card>
                 ))}
               </div>
            </div>
         )}
      </div>

    </div>
  )
}