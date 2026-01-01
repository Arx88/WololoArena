"use client"

import { useEffect, useState } from "react"
import { formatTime } from "@/lib/utils/lobby"
import { cn } from "@/lib/utils"
import { useSoundEffects } from "@/hooks/use-sound-effects"

interface DraftTimerProps {
  endTime: string | null
  isMyTurn: boolean
  onExpire?: () => void
}

export function DraftTimer({ endTime, isMyTurn, onExpire }: DraftTimerProps) {
  const [timeLeft, setTimeLeft] = useState(0)
  const { playSound } = useSoundEffects()

  useEffect(() => {
    if (!endTime) return

    const updateTimer = () => {
      const remaining = Math.max(0, Math.floor((new Date(endTime).getTime() - Date.now()) / 1000))
      
      // Play tick sound for the player during the last 10 seconds of THEIR turn
      if (remaining > 0 && remaining <= 10 && isMyTurn) {
          playSound("tick")
      }
      
      setTimeLeft(remaining)

      if (remaining === 0 && onExpire) {
        onExpire()
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [endTime, onExpire, isMyTurn, playSound])

  const isLow = timeLeft <= 10
  const isCritical = timeLeft <= 5

  return (
    <div className="relative group">
      {/* Decorative Outer Glow */}
      <div className={cn(
        "absolute -inset-1 rounded-sm blur opacity-20 transition-opacity duration-500",
        isMyTurn ? "bg-yellow-500 opacity-60" : "bg-transparent",
        isCritical && "bg-red-600 opacity-80"
      )} />
      
      {/* Main Timer Box */}
      <div
        className={cn(
          "relative flex h-16 w-32 items-center justify-center border-2 font-serif text-3xl font-bold tracking-widest transition-all shadow-inner",
          // Base styles mimicking stone/metal plate
          "bg-[#1a1614] border-[#8a7e68]", 
          
          isMyTurn && "border-[#d4af37] text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]",
          
          // Critical Time Styles
          isCritical
            ? "border-red-600/80 text-red-500 animate-pulse bg-red-950/30"
            : isLow
              ? "border-orange-500/60 text-orange-400"
              : "text-[#e8e6e3]", // Standard text color
        )}
      >
        {/* Inner corner accents */}
        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-current opacity-50" />
        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-current opacity-50" />
        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-current opacity-50" />
        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-current opacity-50" />

        {formatTime(timeLeft)}
      </div>
    </div>
  )
}
