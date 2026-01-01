"use client"

import { useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, Target, Sparkles, Map as MapIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { getDraftSuggestions } from "@/lib/data/civ-meta"
import { CIVILIZATIONS, type Civilization } from "@/lib/data/civilizations"
import { MAPS } from "@/lib/data/maps"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DraftAssistPanelProps {
  currentPhase: string
  currentMap: string | null
  opponentCivs: string[]
  ownCivs: string[]
  bannedCivs: string[]
  isMyTurn: boolean
  onSuggestionClick?: (civId: string) => void
}

export function DraftAssistPanel({
  currentPhase,
  currentMap,
  opponentCivs,
  ownCivs,
  bannedCivs,
  isMyTurn,
  onSuggestionClick,
}: DraftAssistPanelProps) {
  const phase: "ban" | "pick" = currentPhase.includes("ban") ? "ban" : "pick"

  const suggestions = useMemo(() => {
    if (!currentPhase.includes("civ")) return []
    return getDraftSuggestions(currentMap, opponentCivs, ownCivs, bannedCivs, phase)
  }, [currentMap, opponentCivs, ownCivs, bannedCivs, phase, currentPhase])

  const getCivData = (civId: string): Civilization | undefined => {
    return CIVILIZATIONS.find((c) => c.id === civId)
  }

  const isMapPhase = currentPhase.includes("map")
  const foundMap = currentMap ? MAPS.find(m => m.id === currentMap) : null;

  return (
    <div className="w-full bg-yellow-500/5 border-y border-white/10 backdrop-blur-md overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-8 py-4 flex items-center gap-10">
        {/* Label - Taller and more defined */}
        <div className="flex items-center gap-3 shrink-0 border-r border-white/10 pr-10 mr-2">
          <TooltipProvider delayDuration={0}>
             <Tooltip>
               <TooltipTrigger asChild>
                 <div className="flex items-center gap-3 cursor-help group">
                   <Lightbulb className={cn("h-6 w-6 transition-colors", isMyTurn ? "text-yellow-500 animate-pulse" : "text-white/20 group-hover:text-white/60")} />
                   <div className="flex flex-col">
                     <span className="text-xs font-black uppercase tracking-[0.3em] text-white/80 text-shadow-sm group-hover:text-white transition-colors">Strategic Intelligence</span>
                     <span className="text-[10px] text-emerald-400 font-bold tracking-tight opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-4">LIVE ANALYTICS ACTIVE</span>
                   </div>
                 </div>
               </TooltipTrigger>
               <TooltipContent side="right" className="bg-black/90 border-white/10 text-xs max-w-xs p-3">
                 <p className="font-bold text-yellow-500 mb-1">Real-Time Data Analysis</p>
                 <p className="text-white/70">Suggestions are calculated live based on map win rates, civilization matchups, and team composition synergies.</p>
               </TooltipContent>
             </Tooltip>
          </TooltipProvider>
        </div>

        {/* Selected Map Highlight - Taller */}
        {foundMap && (
           <div className="flex items-center gap-4 px-4 py-2 rounded-xl border-2 border-yellow-500/30 bg-yellow-500/10 shadow-[0_0_20px_rgba(234,179,8,0.1)] animate-in fade-in slide-in-from-left-2 duration-500 shrink-0">
              <div className="relative w-14 h-8 rounded-lg overflow-hidden border border-white/10 shrink-0">
                 <Image src={foundMap.image} alt={foundMap.name} fill className="object-cover" />
              </div>
              <div className="flex flex-col leading-none">
                 <span className="text-[10px] font-black text-yellow-400/80 uppercase tracking-tighter mb-1 italic">Operational Area</span>
                 <span className="text-base font-black text-white uppercase tracking-widest">{foundMap.name}</span>
              </div>
           </div>
        )}

        {/* Horizontal Scroll Suggestions - Taller cards */}
        <div className="flex-1 flex items-center gap-6 overflow-x-auto scrollbar-hide py-2">
          {isMapPhase ? (
            <div className="flex items-center gap-4 opacity-40">
               <MapIcon className="h-5 w-5 text-yellow-500" />
               <span className="text-xs font-bold uppercase tracking-widest italic">Awaiting map confirmation for tactical analysis...</span>
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.slice(0, 3).map((suggestion, index) => {
              const civ = getCivData(suggestion.civId)
              if (!civ) return null
              return (
                <button
                  key={suggestion.civId}
                  onClick={() => onSuggestionClick?.(suggestion.civId)}
                  disabled={!isMyTurn}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-300 shrink-0",
                    isMyTurn ? "hover:bg-yellow-500/20 hover:border-yellow-500/40 border-white/10 bg-white/5 cursor-pointer" : "opacity-40 cursor-not-allowed border-transparent bg-transparent",
                    index === 0 && isMyTurn ? "border-yellow-500/40 bg-yellow-500/10 shadow-[0_0_20px_rgba(234,179,8,0.1)]" : ""
                  )}
                >
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10">
                    <Image src={civ.icon || "/placeholder.svg"} alt={civ.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-xs font-bold text-white leading-none">{civ.name}</span>
                    <span className="text-[10px] text-white/40 uppercase tracking-tighter mt-1">{suggestion.type}</span>
                  </div>
                  <div className="ml-3 pl-3 border-l border-white/10">
                     <span className={cn("text-xs font-black", suggestion.score >= 80 ? "text-emerald-400" : "text-yellow-500")}>{suggestion.score}%</span>
                  </div>
                </button>
              )
            })
          ) : (
            <span className="text-xs font-bold text-white/20 uppercase tracking-widest">Analysis complete or unavailable</span>
          )}
        </div>

        {/* Small Legend */}
        <div className="hidden lg:flex items-center gap-6 shrink-0 border-l border-white/10 pl-10 ml-2">
           <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-yellow-500" /><span className="text-[10px] font-bold text-white/40 uppercase">Meta</span></div>
           <div className="flex items-center gap-2"><Target className="h-4 w-4 text-red-500" /><span className="text-[10px] font-bold text-white/40 uppercase">Counter</span></div>
           <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-emerald-400" /><span className="text-[10px] font-bold text-white/40 uppercase">Synergy</span></div>
        </div>
      </div>
    </div>
  )
}