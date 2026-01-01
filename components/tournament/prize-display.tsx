"use client"

import { Trophy, Medal, Award, DollarSign, Gift } from "lucide-react"
import type { TournamentPrizes, Currency } from "@/lib/types/draft"
import { useLanguage } from "@/lib/i18n/language-context"

interface PrizeDisplayProps {
  prizes: TournamentPrizes
  compact?: boolean
}

const CURRENCIES: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  ARS: "$",
  BRL: "R$",
  MXN: "$",
  CLP: "$",
  COP: "$",
  PEN: "S/",
}

function TrophyIcon({ place, size = "default" }: { place: 1 | 2 | 3; size?: "small" | "default" }) {
  const sizeClass = size === "small" ? "h-4 w-4" : "h-6 w-6"
  if (place === 1) return <Trophy className={`${sizeClass} text-yellow-500`} />
  if (place === 2) return <Medal className={`${sizeClass} text-gray-400`} />
  return <Award className={`${sizeClass} text-amber-600`} />
}

export function PrizeDisplay({ prizes, compact = false }: PrizeDisplayProps) {
  const { t } = useLanguage()
  
  if (!prizes.enabled || !prizes.prizes || prizes.prizes.length === 0) return null

  const PLACE_LABELS: Record<number, string> = {
    1: t("place1"),
    2: t("place2"),
    3: t("place3"),
  }

  const PLACE_COLORS: Record<number, string> = {
    1: "text-yellow-500",
    2: "text-gray-400",
    3: "text-amber-600",
  }

  const PLACE_BGS: Record<number, string> = {
    1: "bg-yellow-500/10 border-yellow-500/20",
    2: "bg-gray-400/10 border-gray-400/20",
    3: "bg-amber-600/10 border-amber-600/20",
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {prizes.prizes.map((prize) => (
          <div
            key={prize.place}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-full border ${PLACE_BGS[prize.place] || "bg-muted border-border"}`}
          >
            <TrophyIcon place={prize.place as 1 | 2 | 3} size="small" />
            <span className="text-xs font-medium">
              {prize.type === "money" && prize.amount
                ? `${CURRENCIES[prize.currency || "USD"]}${prize.amount.toLocaleString()}`
                : prize.description?.slice(0, 15) || t("prize")}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Trophy className="h-4 w-4 text-primary" />
        {t("tournamentPrizes")}
      </div>
      <div className="grid gap-3">
        {prizes.prizes.map((prize) => (
          <div
            key={prize.place}
            className={`flex items-center gap-4 p-3 rounded-xl border ${PLACE_BGS[prize.place] || "border-border/50 bg-card/50"}`}
          >
            <div className={`p-2 rounded-lg bg-background/50`}>
              <TrophyIcon place={prize.place as 1 | 2 | 3} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">{PLACE_LABELS[prize.place] || `${prize.place}º Place`}</p>
              <p className="text-sm text-muted-foreground truncate">
                {prize.type === "money" && prize.amount ? (
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3.5 w-3.5" />
                    {CURRENCIES[prize.currency || "USD"]}
                    {prize.amount.toLocaleString()} {prize.currency || "USD"}
                  </span>
                ) : (
                  prize.description || t("tbd")
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}