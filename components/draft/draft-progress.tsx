"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Map, Shield, Crown, Check, Loader2, Gamepad2 } from "lucide-react"
import type { DraftPhase, MapSelectionMode } from "@/lib/types/draft"
import { useLanguage } from "@/lib/i18n/language-context"
import { cn } from "@/lib/utils"

interface DraftProgressProps {
  currentPhase: DraftPhase
  mapMode: MapSelectionMode
  totalMapBans: number
  currentMapBans: number
  remainingMaps: number
  totalCivBans: number
  currentCivBans: number
  civBansEnabled: boolean
  civPicksEnabled: boolean
  gameModeEnabled: boolean
}

export function DraftProgress({
  currentPhase,
  mapMode,
  totalMapBans,
  currentMapBans,
  remainingMaps,
  totalCivBans,
  currentCivBans,
  civBansEnabled,
  civPicksEnabled,
  gameModeEnabled,
}: DraftProgressProps) {
  const { t } = useLanguage()
  
  const phases = [
    {
      id: "map",
      label: "Maps",
      icon: Map,
      enabled: mapMode !== "disabled",
      phases: ["map_ban", "map_pick", "map_random"],
    },
    {
      id: "civ_ban",
      label: "Bans",
      icon: Shield,
      enabled: civBansEnabled,
      phases: ["civ_ban"],
    },
    {
      id: "civ_pick",
      label: "Picks",
      icon: Crown,
      enabled: civPicksEnabled,
      phases: ["civ_pick"],
    },
    {
      id: "mode_roll",
      label: "Mode",
      icon: Gamepad2,
      enabled: gameModeEnabled,
      phases: ["mode_roll"],
    },
  ].filter((p) => p.enabled)

  const getPhaseStatus = (phase: (typeof phases)[number]) => {
    const phaseIndex = phases.findIndex((p) => p.phases.includes(currentPhase))
    const currentIndex = phases.indexOf(phase)

    if (currentPhase === "completed") return "completed"
    if (phase.phases.includes(currentPhase)) return "current"
    if (currentIndex < phaseIndex) return "completed"
    return "pending"
  }

  return (
    <div className="w-full flex items-center justify-between gap-6 py-3 border-t border-white/10 mt-2 bg-black/20 px-4 rounded-b-xl">
      {/* Steps Timeline */}
      <div className="flex items-center gap-2 flex-1">
        {phases.map((phase, index) => {
          const status = getPhaseStatus(phase)
          const Icon = phase.icon
          
          return (
            <div key={phase.id} className="flex items-center gap-2 group">
              <div className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300",
                status === "current" ? "bg-yellow-600/20 border-2 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)]" : "bg-white/5 border border-white/5",
                status === "completed" && "bg-emerald-500/10 border border-emerald-500/30"
              )}>
                <div className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full border",
                  status === "current" && "bg-yellow-500 border-yellow-400 animate-pulse shadow-[0_0_10px_rgba(234,179,8,0.5)]",
                  status === "completed" && "bg-emerald-500 border-emerald-400",
                  status === "pending" && "bg-white/10 border-white/10"
                )}>
                  {status === "completed" ? (
                    <Check className="h-3.5 w-3.5 text-black" />
                  ) : status === "current" ? (
                    <Loader2 className="h-3.5 w-3.5 text-black animate-spin" />
                  ) : (
                    <div className="h-1.5 w-1.5 bg-white/30 rounded-full" />
                  )}
                </div>
                
                <div className="flex flex-col leading-none">
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-[0.2em]",
                    status === "current" ? "text-yellow-500" : status === "completed" ? "text-emerald-400" : "text-white/30"
                  )}>
                    {phase.label}
                  </span>
                </div>
              </div>
              
              {index < phases.length - 1 && (
                <div className={cn(
                  "h-0.5 w-6 sm:w-12 rounded-full transition-colors duration-500",
                  status === "completed" ? "bg-emerald-500/40" : "bg-white/10"
                )} />
              )}
            </div>
          )
        })}
      </div>

      {/* Live Stats HUD */}
      <div className="flex items-center gap-8 border-l border-white/10 pl-8 h-10">
         {mapMode !== "disabled" && (
           <div className="flex flex-col items-end justify-center">
              <span className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-0.5">Map Bans</span>
              <span className="text-sm font-mono font-black text-yellow-500 leading-none">{currentMapBans} / {totalMapBans}</span>
           </div>
         )}
         
         {civBansEnabled && (
           <div className="flex flex-col items-end justify-center">
              <span className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-0.5">Civ Bans</span>
              <span className="text-sm font-mono font-black text-red-500 leading-none">{currentCivBans} / {totalCivBans}</span>
           </div>
         )}

         <div className="flex flex-col items-end justify-center">
            <span className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-0.5">Tactical State</span>
            <span className={cn(
              "text-sm font-black uppercase leading-none italic",
              currentPhase === "completed" ? "text-emerald-500" : "text-yellow-500"
            )}>
              {currentPhase === "completed" ? "Finalized" : currentPhase.replace("_", " ")}
            </span>
         </div>
      </div>
    </div>
  )
}