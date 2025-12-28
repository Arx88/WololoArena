"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Lightbulb,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Shield,
  Target,
  AlertTriangle,
  Sparkles,
  Info,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/language-context"
import { getDraftSuggestions, getCivMapTier, type CivSuggestion } from "@/lib/data/civ-meta"
import { CIVILIZATIONS, type Civilization } from "@/lib/data/civilizations"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DraftAssistPanelProps {
  currentPhase: "civ_ban" | "civ_pick" | "map_ban" | "map_pick" | string
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
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(true)
  const [showDetails, setShowDetails] = useState(false)

  const phase: "ban" | "pick" = currentPhase.includes("ban") ? "ban" : "pick"

  const suggestions = useMemo(() => {
    if (currentPhase !== "civ_ban" && currentPhase !== "civ_pick") {
      return []
    }
    return getDraftSuggestions(currentMap, opponentCivs, ownCivs, bannedCivs, phase)
  }, [currentMap, opponentCivs, ownCivs, bannedCivs, phase, currentPhase])

  const getCivData = (civId: string): Civilization | undefined => {
    return CIVILIZATIONS.find((c) => c.id === civId)
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "S":
        return "text-amber-400 bg-amber-500/10 border-amber-500/30"
      case "A":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
      case "B":
        return "text-blue-400 bg-blue-500/10 border-blue-500/30"
      case "C":
        return "text-muted-foreground bg-muted border-border"
      default:
        return "text-muted-foreground bg-muted border-border"
    }
  }

  const getTypeIcon = (type: CivSuggestion["type"]) => {
    switch (type) {
      case "meta":
        return <TrendingUp className="h-3 w-3" />
      case "counter":
        return <Target className="h-3 w-3" />
      case "synergy":
        return <Sparkles className="h-3 w-3" />
      default:
        return <Lightbulb className="h-3 w-3" />
    }
  }

  const getTypeColor = (type: CivSuggestion["type"]) => {
    switch (type) {
      case "meta":
        return "text-primary"
      case "counter":
        return "text-orange-500"
      case "synergy":
        return "text-emerald-500"
      default:
        return "text-muted-foreground"
    }
  }

  // Don't show during non-civ phases
  if (currentPhase !== "civ_ban" && currentPhase !== "civ_pick") {
    return null
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CollapsibleTrigger asChild>
          <CardHeader className="py-3 px-4 cursor-pointer hover:bg-muted/30 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                {t("draftAssist") || "Draft Assist"}
                {isMyTurn && (
                  <Badge variant="outline" className="text-xs border-primary/50 text-primary animate-pulse">
                    <Zap className="h-3 w-3 mr-1" />
                    {t("yourTurn") || "Your Turn"}
                  </Badge>
                )}
              </CardTitle>
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0 pb-4 px-4 space-y-4">
            {/* Map Context */}
            {currentMap && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Info className="h-4 w-4" />
                <span>
                  {t("suggestionsFor") || "Suggestions for"}: <strong className="text-foreground">{currentMap}</strong>
                </span>
              </div>
            )}

            {/* Opponent Warning */}
            {opponentCivs.length > 0 && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <AlertTriangle className="h-4 w-4 text-orange-500 shrink-0" />
                <span className="text-xs text-orange-500">
                  {t("opponentPicked") || "Opponent picked"}:{" "}
                  <strong>{opponentCivs.map((c) => getCivData(c)?.name).join(", ")}</strong>
                </span>
              </div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 ? (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {phase === "ban" ? t("suggestedBans") || "Suggested Bans" : t("suggestedPicks") || "Suggested Picks"}
                </p>

                <div className="grid gap-2">
                  {suggestions.slice(0, showDetails ? 6 : 3).map((suggestion, index) => {
                    const civ = getCivData(suggestion.civId)
                    const mapMeta = currentMap ? getCivMapTier(suggestion.civId, currentMap) : null

                    if (!civ) return null

                    return (
                      <TooltipProvider key={suggestion.civId}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => onSuggestionClick?.(suggestion.civId)}
                              disabled={!isMyTurn}
                              className={cn(
                                "flex items-center gap-3 p-2.5 rounded-lg border transition-all duration-200 text-left w-full",
                                isMyTurn
                                  ? "hover:bg-primary/10 hover:border-primary/50 cursor-pointer"
                                  : "opacity-60 cursor-not-allowed",
                                index === 0 && isMyTurn
                                  ? "border-primary/30 bg-primary/5"
                                  : "border-border/50 bg-card/50",
                              )}
                            >
                              {/* Rank indicator */}
                              <div
                                className={cn(
                                  "flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0",
                                  index === 0 ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground",
                                )}
                              >
                                {index + 1}
                              </div>

                              {/* Civ icon */}
                              <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0">
                                <Shield className="h-4 w-4 text-muted-foreground" />
                              </div>

                              {/* Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm truncate">{civ.name}</span>
                                  {mapMeta && (
                                    <Badge
                                      variant="outline"
                                      className={cn("text-[10px] px-1.5", getTierColor(mapMeta.tier))}
                                    >
                                      {mapMeta.tier}
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                  <span className={getTypeColor(suggestion.type)}>{getTypeIcon(suggestion.type)}</span>
                                  <span className="truncate">{suggestion.reason}</span>
                                </div>
                              </div>

                              {/* Score */}
                              <div
                                className={cn(
                                  "text-xs font-semibold px-2 py-0.5 rounded shrink-0",
                                  suggestion.score >= 80
                                    ? "bg-emerald-500/10 text-emerald-500"
                                    : suggestion.score >= 60
                                      ? "bg-blue-500/10 text-blue-500"
                                      : "bg-muted text-muted-foreground",
                                )}
                              >
                                {suggestion.score}%
                              </div>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent side="left" className="max-w-xs">
                            <div className="space-y-2">
                              <p className="font-semibold">{civ.name}</p>
                              <p className="text-xs text-muted-foreground">{civ.specialty}</p>
                              {mapMeta && (
                                <div className="text-xs">
                                  <p>
                                    Win Rate: <strong>{mapMeta.winRate}%</strong>
                                  </p>
                                  <p>
                                    Pick Rate: <strong>{mapMeta.pickRate}%</strong>
                                  </p>
                                  {mapMeta.notes && <p className="text-muted-foreground mt-1">{mapMeta.notes}</p>}
                                </div>
                              )}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )
                  })}
                </div>

                {suggestions.length > 3 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setShowDetails(!showDetails)}
                  >
                    {showDetails
                      ? t("showLess") || "Show Less"
                      : `${t("showMore") || "Show"} ${suggestions.length - 3} ${t("more") || "more"}`}
                  </Button>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                {t("noSuggestions") || "No suggestions available for this phase"}
              </p>
            )}

            {/* Legend */}
            <div className="flex flex-wrap gap-3 pt-2 border-t border-border/50">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-primary" />
                <span>{t("metaPick") || "Meta"}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Target className="h-3 w-3 text-orange-500" />
                <span>{t("counterPick") || "Counter"}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Sparkles className="h-3 w-3 text-emerald-500" />
                <span>{t("synergy") || "Synergy"}</span>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}
