"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import type { GameMap } from "@/lib/data/maps"
import { Ban, Check, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface MapGridProps {
  maps: GameMap[]
  bannedMaps: string[]
  pickedMaps: string[]
  onSelect: (id: string) => void
  disabled: boolean
  action: "ban" | "pick"
}

export function MapGrid({ maps, bannedMaps, pickedMaps, onSelect, disabled, action }: MapGridProps) {
  if (!maps || maps.length === 0) {
    return (
      <div className="rounded-xl border border-border/50 bg-card/50 p-4">
        <h3 className="mb-4 text-center text-sm font-medium text-muted-foreground">No maps available</h3>
      </div>
    )
  }

  return (
    <div className="p-2">
      <h3 className="mb-6 text-center text-lg font-bold tracking-[0.2em] text-white/90 uppercase drop-shadow-sm">
        {action === "ban" ? "Select a map to ban" : "Select the battleground"}
      </h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {maps.map((map) => {
          if (!map || !map.id) return null

          const isBanned = bannedMaps?.includes(map.id) ?? false
          const isPicked = pickedMaps?.includes(map.id) ?? false
          const isUnavailable = isBanned || isPicked

          return (
            <motion.button
              key={map.id}
              onClick={() => !isUnavailable && !disabled && onSelect(map.id)}
              disabled={isUnavailable || disabled}
              initial={false}
              animate={isBanned ? { 
                x: [0, -5, 5, -5, 5, 0],
                transition: { duration: 0.4 }
              } : {}}
              whileHover={!isUnavailable && !disabled ? { scale: 1.02, zIndex: 10 } : {}}
              className={cn(
                "group relative overflow-hidden rounded-xl border-2 transition-all duration-300",
                "bg-zinc-900",
                isUnavailable ? "cursor-not-allowed opacity-40 grayscale" : "cursor-pointer",
                isBanned ? "border-red-900/50" : isPicked ? "border-yellow-500" : "border-white/10",
                !isUnavailable && !disabled && (action === "ban" ? "hover:border-red-500" : "hover:border-yellow-500"),
              )}
            >
              <div className="relative aspect-[16/9]">
                <Image src={map.image || "/placeholder.svg"} alt={map.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                {/* EPIC BAN STAMP EFFECT */}
                <AnimatePresence>
                  {isBanned && (
                    <motion.div 
                      initial={{ scale: 4, opacity: 0, rotate: -45 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-red-600/20 backdrop-blur-[1px] z-20"
                    >
                      <X className="w-16 h-16 text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,1)]" strokeWidth={5} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* PICK STATUS */}
                {isPicked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-yellow-500/10 z-20">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <Check className="h-12 w-12 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,1)]" strokeWidth={4} />
                    </motion.div>
                  </div>
                )}

                {/* Hover overlay */}
                {!isUnavailable && !disabled && (
                  <div className={cn(
                    "absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100",
                    action === "ban" ? "bg-red-500/20" : "bg-yellow-500/20",
                  )}>
                    {action === "ban" ? <Ban className="h-8 w-8 text-white" /> : <Check className="h-8 w-8 text-white" />}
                  </div>
                )}
              </div>
              
              <div className="p-3 text-center">
                <p className="text-sm font-black uppercase italic tracking-tight text-white leading-none mb-1">{map.name}</p>
                <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">{map.category}</p>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}