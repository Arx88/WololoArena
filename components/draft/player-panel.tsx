import Image from "next/image"
import { Crown, Swords, User, Ban, Check, Shield } from "lucide-react"
import { getCivilizationById } from "@/lib/data/civilizations"
import { getMapById } from "@/lib/data/maps"
import type { Profile } from "@/lib/types/draft"
import { cn } from "@/lib/utils"

interface PlayerPanelProps {
  profile: Profile | null
  role: "host" | "guest"
  isCurrentTurn: boolean
  civBans: string[]
  civPicks: string[]
  mapBans: string[]
  mapPicks: string[]
}

export function PlayerPanel({ profile, role, isCurrentTurn, civBans, civPicks, mapBans, mapPicks }: PlayerPanelProps) {
  const isHost = role === "host"
  // Colors aligned with AOE2 DE UI: Blue/Cyan for P1 (Host), Red for P2 (Guest)
  const roleColor = isHost ? "text-blue-400" : "text-red-500"
  const borderColor = isHost ? "border-blue-500/30" : "border-red-500/30"
  const glowClass = isHost ? "shadow-[0_0_30px_-5px_rgba(59,130,246,0.2)]" : "shadow-[0_0_30px_-5px_rgba(239,68,68,0.2)]"

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Player Header Card */}
      <div className={cn(
        "relative overflow-hidden rounded-xl border bg-[#0a0a0b]/80 backdrop-blur-md transition-all duration-300",
        isCurrentTurn ? `${borderColor} border-opacity-100 ${glowClass}` : "border-white/5",
        "p-6 flex flex-col items-center text-center group"
      )}>
        {/* Background gradient hint */}
        <div className={cn(
          "absolute inset-0 opacity-10 bg-gradient-to-b",
          isHost ? "from-blue-500/20 to-transparent" : "from-red-500/20 to-transparent"
        )} />

        {/* Avatar */}
        <div className={cn(
          "relative mb-4 h-24 w-24 rounded-full border-2 p-1 transition-transform duration-500 group-hover:scale-105",
          isCurrentTurn ? "border-[#d4af37]" : "border-white/10"
        )}>
          <div className="relative h-full w-full rounded-full overflow-hidden bg-black/50">
             {profile?.avatar_url ? (
              <Image
                src={profile.avatar_url || "/placeholder.svg"}
                alt={profile.username}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <User className="h-10 w-10 text-white/50" />
              </div>
            )}
          </div>
          
          {/* Role Badge */}
          <div className={cn(
            "absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border border-black/50 bg-[#151515] shadow-lg",
            roleColor
          )}>
            {isHost ? <Crown className="h-4 w-4" /> : <Swords className="h-4 w-4" />}
          </div>
        </div>

        {/* Name & Status */}
        <h3 className="text-xl font-bold tracking-tight text-white mb-1">
            {profile?.username || (isHost ? "Host" : "Guest")}
        </h3>
        <p className={cn("text-xs font-medium uppercase tracking-widest opacity-70", roleColor)}>
            {isHost ? "Player 1" : "Player 2"}
        </p>
      </div>

      {/* Stats/Lists Container */}
      <div className="flex-1 space-y-4 rounded-xl border border-white/5 bg-[#0a0a0b]/40 p-4">
          
          {/* MAIN PICK - Highlighted */}
          {civPicks.length > 0 && (
            <div className="text-center pb-4 border-b border-white/5">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3 block">Selected Civilization</span>
              <div className="flex justify-center">
                {civPicks.map((civId) => {
                  const civ = getCivilizationById(civId)
                  return (
                    <div key={civId} className="group relative h-20 w-20">
                      <div className="absolute inset-0 rounded-lg border border-[#d4af37]/50 shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all group-hover:border-[#d4af37] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]" />
                      <div className="absolute inset-[2px] rounded-md overflow-hidden bg-black">
                        <Image
                          src={civ?.icon || "/placeholder.svg"}
                          alt={civ?.name || civId}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[120%] text-center">
                        <span className="text-xs font-bold text-[#d4af37] drop-shadow-md">{civ?.name}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* BANS Grid - Scaled Up */}
          {(civBans.length > 0 || mapBans.length > 0) && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-red-500/80 font-semibold border-b border-red-900/20 pb-1">
                <Ban className="h-3 w-3" /> Bans
              </div>
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                {[...civBans].map((civId) => {
                   const civ = getCivilizationById(civId)
                   return (
                     <div key={civId} className="relative h-12 w-12 rounded-md border border-red-900/40 bg-red-950/20 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all group" title={`Banned: ${civ?.name}`}>
                       <Image src={civ?.icon || "/placeholder.svg"} alt={civ?.name || civId} fill className="rounded-[4px] object-cover" />
                       <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-black/30 transition-colors">
                         <Ban className="h-6 w-6 text-red-500 drop-shadow-md" />
                       </div>
                     </div>
                   )
                })}
                {mapBans.map((mapId) => {
                   const map = getMapById(mapId)
                   return (
                     <div key={mapId} className="h-12 px-3 flex items-center justify-center text-[10px] font-bold text-red-400 bg-red-950/30 border border-red-900/30 rounded-md relative overflow-hidden" title={`Banned Map: ${map?.name}`}>
                        <span className="relative z-10 line-through decoration-red-500/50 decoration-2">{map?.name}</span>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10" />
                     </div>
                   )
                })}
              </div>
            </div>
          )}

           {/* MAP PICKS List - Enhanced */}
           {mapPicks.length > 0 && (
            <div className="space-y-3 pt-4">
               <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-blue-400/80 font-semibold border-b border-blue-900/20 pb-1">
                <Check className="h-3 w-3" /> Map Pool
              </div>
              <div className="grid grid-cols-1 gap-2">
                {mapPicks.map((mapId) => {
                  const map = getMapById(mapId)
                  return (
                    <div key={mapId} className="flex items-center justify-between px-4 py-3 rounded-md border border-white/5 bg-gradient-to-r from-white/5 to-transparent hover:border-blue-500/30 transition-colors group">
                      <div className="flex items-center gap-3">
                         <div className="h-2 w-2 rounded-full bg-blue-500 group-hover:animate-pulse" />
                         <span className="text-sm font-bold text-gray-200 tracking-wide">{map?.name}</span>
                      </div>
                      <Shield className="h-4 w-4 text-blue-500/30 group-hover:text-blue-400 transition-colors" />
                    </div>
                  )
                })}
              </div>
            </div>
          )}
      </div>
    </div>
  )
}
