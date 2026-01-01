"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Swords, Crown, TrendingUp, AlertTriangle, Users, Target, Coins, Castle, Shield, Zap, Star } from "lucide-react"
import Image from "next/image"
import type { Civilization } from "@/lib/data/civilizations"
import { TEAM_BONUS_RATINGS } from "@/lib/data/synergy-calculator"
import { useLanguage } from "@/lib/i18n/language-context"

interface CivDetailPanelProps {
  civ: Civilization
  language: string
}

export function CivDetailPanel({ civ }: CivDetailPanelProps) {
  const { t } = useLanguage()
  const bonusRating = TEAM_BONUS_RATINGS[civ.id]

  const getBonusTypeIcon = (type: string) => {
    switch (type) {
      case "economy":
        return <Coins className="h-3.5 w-3.5 text-yellow-500" />
      case "military":
        return <Swords className="h-3.5 w-3.5 text-red-500" />
      case "defense":
        return <Castle className="h-3.5 w-3.5 text-blue-500" />
      default:
        return <Target className="h-3.5 w-3.5 text-purple-500" />
    }
  }

  const getBonusTypeColor = (type: string) => {
    switch (type) {
      case "economy":
        return "border-yellow-500/30 bg-yellow-500/10"
      case "military":
        return "border-red-500/30 bg-red-500/10"
      case "defense":
        return "border-blue-500/30 bg-blue-500/10"
      default:
        return "border-purple-500/30 bg-purple-500/10"
    }
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 90) return "text-emerald-400 border-emerald-500/50 bg-emerald-500/10"
    if (rating >= 80) return "text-primary border-primary/50 bg-primary/10"
    if (rating >= 70) return "text-blue-400 border-blue-500/50 bg-blue-500/10"
    if (rating >= 60) return "text-yellow-400 border-yellow-500/50 bg-yellow-500/10"
    return "text-muted-foreground border-muted bg-muted/50"
  }

  const getRatingTier = (rating: number) => {
    if (rating >= 90) return "S"
    if (rating >= 80) return "A"
    if (rating >= 70) return "B"
    if (rating >= 60) return "C"
    return "D"
  }

  // Group bonuses by type
  const bonusesByType = civ.bonuses.reduce(
    (acc, bonus) => {
      if (!acc[bonus.type]) acc[bonus.type] = []
      acc[bonus.type].push(bonus)
      return acc
    },
    {} as Record<string, typeof civ.bonuses>,
  )

  const bonusTypeOrder = ["economy", "military", "defense", "utility"]

  return (
    <Card className="border-primary/30 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 border-primary/30 bg-card shadow-lg">
            <Image src={civ.icon || "/placeholder.svg"} alt={civ.name} fill className="object-cover" unoptimized />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-2xl text-primary mb-1">{civ.name}</CardTitle>
            <p className="text-sm text-muted-foreground mb-2">{civ.specialty}</p>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs">
                {civ.expansion}
              </Badge>
              {civ.bestPositions.map((pos) => (
                <Badge
                  key={pos}
                  variant="outline"
                  className={`text-xs ${pos === "flank" ? "border-blue-500/50 text-blue-400" : "border-orange-500/50 text-orange-400"}`}
                >
                  {pos === "flank" ? t("flank") : t("pocket")}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Team Bonus - Highlighted */}
        <div className="space-y-3">
          <h4 className="flex items-center gap-2 text-sm font-semibold">
            <Users className="h-4 w-4 text-primary" />
            {t("teamBonus")}
          </h4>
          <div className="rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/30 p-4">
            <p className="text-sm font-medium mb-3">{civ.teamBonus}</p>
            {bonusRating && (
              <div className="flex items-center justify-between pt-3 border-t border-primary/20">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{t("tbRating")}</span>
                  <Badge variant="outline" className={`text-sm font-bold ${getRatingColor(bonusRating.rating)}`}>
                    {bonusRating.rating}/100
                  </Badge>
                </div>
                <Badge className={`text-lg font-bold px-3 ${getRatingColor(bonusRating.rating)}`}>
                  {getRatingTier(bonusRating.rating)}
                </Badge>
              </div>
            )}
          </div>
          {bonusRating && bonusRating.bestWith.length > 0 && (
            <div className="text-xs text-muted-foreground">
              <span className="font-medium text-primary">{t("bestSynergyWith")}: </span>
              {bonusRating.bestWith.slice(0, 5).map((id, i) => (
                <span key={id} className="capitalize">
                  {id}
                  {i < Math.min(4, bonusRating.bestWith.length - 1) ? ", " : ""}
                </span>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* All Bonuses - Organized by Type */}
        <div className="space-y-3">
          <h4 className="flex items-center gap-2 text-sm font-semibold">
            <Crown className="h-4 w-4 text-primary" />
            {t("allCivilizationBonuses")}
            <Badge variant="secondary" className="text-xs ml-auto">
              {t("bonusesCount", { count: civ.bonuses.length })}
            </Badge>
          </h4>

          <Accordion type="multiple" defaultValue={["economy", "military"]} className="w-full">
            {bonusTypeOrder.map((type) => {
              const bonuses = bonusesByType[type]
              if (!bonuses || bonuses.length === 0) return null

              const typeLabels: Record<string, string> = {
                economy: t("economyBonuses"),
                military: t("militaryBonuses"),
                defense: t("defenseBonuses"),
                utility: t("utilityBonuses"),
              }

              return (
                <AccordionItem key={type} value={type} className="border-border/50">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <div className="flex items-center gap-2">
                      {getBonusTypeIcon(type)}
                      <span className="text-sm font-medium">{typeLabels[type]}</span>
                      <Badge variant="secondary" className="text-xs ml-2">
                        {bonuses.length}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-1">
                      {bonuses.map((bonus, i) => (
                        <div key={i} className={`rounded-lg border p-3 ${getBonusTypeColor(bonus.type)}`}>
                          <div className="flex items-start gap-2">
                            <Zap className="h-3.5 w-3.5 mt-0.5 text-primary shrink-0" />
                            <p className="text-sm leading-relaxed">{bonus.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>

        <Separator />

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <TrendingUp className="h-4 w-4" />
              {t("strengths")}
            </h4>
            <ul className="space-y-1.5">
              {civ.strengths.map((s, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                  <Star className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="flex items-center gap-1.5 text-xs font-semibold text-destructive">
              <AlertTriangle className="h-4 w-4" />
              {t("weaknesses")}
            </h4>
            <ul className="space-y-1.5">
              {civ.weaknesses.map((w, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                  <Shield className="h-3 w-3 text-destructive mt-0.5 shrink-0" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator />

        {/* Synergy Tags */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-muted-foreground">{t("synergyTags")}</h4>
          <div className="flex flex-wrap gap-1.5">
            {civ.synergyTags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs capitalize">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}