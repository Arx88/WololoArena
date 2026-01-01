"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Civilization } from "@/lib/data/civilizations"
import { getCivStats } from "@/lib/data/civ-stats"
import { getBuildOrdersForCiv } from "@/lib/data/build-orders"
import { useLanguage } from "@/lib/i18n/language-context"
import Image from "next/image"
import Link from "next/link"
import { Plus, BookOpen } from "lucide-react"

interface CivCardProps {
  civ: Civilization
  onSelect?: (civId: string) => void
  selected?: boolean
  disabled?: boolean
  showStats?: boolean
}

export function CivCard({ civ, onSelect, selected, disabled, showStats = true }: CivCardProps) {
  const { language } = useLanguage()
  const stats = getCivStats(civ.id)
  const buildOrders = getBuildOrdersForCiv(civ.id)

  return (
    <Card
      className={`relative overflow-hidden transition-all ${
        selected
          ? "border-primary bg-primary/10"
          : disabled
            ? "opacity-50"
            : "border-border/50 bg-card/50 hover:border-primary/50 hover:bg-card"
      }`}
    >
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-background">
            <Image
              src={civ.icon || "/placeholder.svg"}
              alt={civ.name}
              fill
              className="object-contain p-1"
              unoptimized
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate font-medium text-foreground">{civ.name}</p>
              {stats && showStats && (
                <span
                  className={`text-xs ${stats.winRate >= 51 ? "text-emerald-400" : stats.winRate >= 49 ? "text-yellow-400" : "text-red-400"}`}
                >
                  {stats.winRate}%
                </span>
              )}
            </div>
            <p className="truncate text-xs text-muted-foreground">{civ.specialty}</p>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            {buildOrders.length > 0 && (
              <Link href={`/civilizations/${civ.id}`}>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </Button>
              </Link>
            )}

            {onSelect && !disabled && (
              <Button
                variant={selected ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => onSelect(civ.id)}
              >
                <Plus className={`h-4 w-4 ${selected ? "rotate-45" : ""}`} />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
