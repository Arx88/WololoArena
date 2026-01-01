"use client"

import { useEffect, useState } from "react"
import { getGameModeById } from "@/lib/data/game-modes"
import { Dices } from "lucide-react"

interface GameModeRollProps {
  selectedMode: string | null
  gameModes: string[]
}

export function GameModeRoll({ selectedMode, gameModes }: GameModeRollProps) {
  const [displayMode, setDisplayMode] = useState(gameModes[0])
  const [isRolling, setIsRolling] = useState(true)

  useEffect(() => {
    if (!selectedMode) return

    // Animate through modes
    let index = 0
    const interval = setInterval(() => {
      setDisplayMode(gameModes[index % gameModes.length])
      index++
    }, 100)

    // Stop rolling after 2 seconds and show final result
    const timeout = setTimeout(() => {
      clearInterval(interval)
      setDisplayMode(selectedMode)
      setIsRolling(false)
    }, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [selectedMode, gameModes])

  const mode = getGameModeById(displayMode)

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border/50 bg-card/50 p-12">
      <div className={`mb-6 ${isRolling ? "animate-bounce" : "animate-pulse-gold"}`}>
        <Dices className="h-16 w-16 text-primary" />
      </div>
      <h2 className={`text-3xl font-bold ${isRolling ? "animate-pulse" : ""}`}>{mode?.name || displayMode}</h2>
      {!isRolling && <p className="mt-2 text-muted-foreground">{mode?.description}</p>}
    </div>
  )
}
