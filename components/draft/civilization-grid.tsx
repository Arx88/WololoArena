"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Civilization } from "@/lib/data/civilizations"
import { Ban, Check, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/i18n/language-context"

interface CivilizationGridProps {
  civilizations: Civilization[]
  bannedCivs: string[]
  pickedCivs: string[]
  onSelect: (id: string) => void
  disabled: boolean
  action: "ban" | "pick"
}

export function CivilizationGrid({
  civilizations,
  bannedCivs,
  pickedCivs,
  onSelect,
  disabled,
  action,
}: CivilizationGridProps) {
  const { t } = useLanguage()

  return (
    <div className="p-2">
      <h3 className="mb-6 text-center text-lg font-bold tracking-[0.2em] text-white/90 uppercase drop-shadow-sm">
        {action === "ban" ? t("civBanning") : t("civPicking")}
      </h3>
      <div className="grid grid-cols-6 gap-3 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12">
        {civilizations.map((civ) => {
          const isBanned = bannedCivs.includes(civ.id)
          const isPicked = pickedCivs.includes(civ.id)
          const isUnavailable = isBanned || isPicked

          return (
            <motion.button
              key={civ.id}
              onClick={() => !isUnavailable && !disabled && onSelect(civ.id)}
              disabled={isUnavailable || disabled}
              initial={false}
              animate={isBanned ? { 
                x: [0, -5, 5, -5, 5, 0],
                transition: { duration: 0.4 }
              } : {}}
              whileHover={!isUnavailable && !disabled ? { scale: 1.05, zIndex: 10 } : {}}
              className={cn(
                "group relative aspect-square overflow-hidden rounded-md transition-all duration-300",
                "bg-white/5 border border-white/10",
                
                isUnavailable ? "cursor-not-allowed grayscale opacity-40" : "cursor-pointer hover:bg-white/10 hover:border-white/30",
                
                isBanned && "border-red-900/50 bg-red-950/20",
                isPicked && "border-yellow-500/50 bg-yellow-900/20 shadow-[0_0_15px_rgba(234,179,8,0.2)]",
                
                !isUnavailable && !disabled && [
                  action === "ban" ? "hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]" : "hover:border-yellow-500/50 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)]"
                ],
              )}
              title={`${civ.name} - ${civ.specialty}`}
            >
              <Image 
                src={civ.icon || "/placeholder.svg"} 
                alt={civ.name} 
                fill 
                className={cn("object-cover transition-transform duration-500", !isUnavailable && "group-hover:scale-110")} 
                sizes="64px"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-0 w-full p-1 text-[8px] font-black text-white text-center opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
                  {civ.name}
              </div>

              {/* EPIC BAN STAMP EFFECT */}
              <AnimatePresence>
                {isBanned && (
                  <motion.div 
                    initial={{ scale: 4, opacity: 0, rotate: -45 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-red-600/10 backdrop-blur-[1px] z-20"
                  >
                    <X className="w-10 h-10 md:w-14 md:h-14 text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,1)]" strokeWidth={4} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* PICK STATUS */}
              {isPicked && (
                <div className="absolute inset-0 flex items-center justify-center bg-yellow-500/10 z-20">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="relative"
                  >
                    <Check className="h-8 w-8 text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,1)]" strokeWidth={4} />
                  </motion.div>
                </div>
              )}

              {!isUnavailable && !disabled && (
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100",
                    action === "ban" ? "bg-red-500/10" : "bg-yellow-500/10",
                  )}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}