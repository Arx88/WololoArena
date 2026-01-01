"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Eye,
  Target,
  TrendingUp,
  Trophy,
  ThumbsUp,
  Sparkles,
  ChevronRight,
  Crown,
  Flame,
  BarChart3,
} from "lucide-react"
import { useSpectatorPredictions } from "@/hooks/use-spectator-predictions"
import { useCivStats } from "@/hooks/use-civ-stats"
import { useLanguage } from "@/lib/i18n/language-context"
import { CIVILIZATIONS } from "@/lib/data/civilizations"
import type { Draft, DraftPhase } from "@/lib/types/draft"
import { cn } from "@/lib/utils"

interface SpectatorPanelProps {
  draft: Draft
  currentPhase: DraftPhase
  turnNumber: number
  isParticipant: boolean
  isDemo?: boolean
  availableCivs: typeof CIVILIZATIONS
  bannedCivs: string[]
  pickedCivs: string[]
}

export function SpectatorPanel({
  draft,
  currentPhase,
  turnNumber,
  isParticipant,
  isDemo = false,
  availableCivs,
  bannedCivs,
  pickedCivs,
}: SpectatorPanelProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("predict")

  const { myPrediction, allPredictions, stats, makePrediction, hasPredicted, isLoading } = useSpectatorPredictions({
    draftId: draft.id,
    currentPhase,
    turnNumber,
    isDemo,
  })

  const { stats: civStats, getStatForCiv } = useCivStats(draft.final_map || undefined, isDemo)

  // Get available items for prediction
  const getAvailableItems = () => {
    if (currentPhase === "civ_ban" || currentPhase === "civ_pick") {
      return availableCivs.filter((c) => !bannedCivs.includes(c.id) && !pickedCivs.includes(c.id))
    }
    return []
  }

  const availableItems = getAvailableItems()
  const totalPredictions = Object.values(allPredictions).reduce((sum, count) => sum + count, 0)

  // Don't show for participants
  if (isParticipant) return null

  // Only show during civ phases
  if (currentPhase !== "civ_ban" && currentPhase !== "civ_pick") return null

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Eye className="h-5 w-5 text-primary" />
          {t("spectator.title") || "Spectator Mode"}
          <Badge variant="secondary" className="ml-auto text-xs">
            {t("spectator.interactive") || "Interactive"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="predict" className="text-xs gap-1">
              <Target className="h-3.5 w-3.5" />
              {t("spectator.predict") || "Predict"}
            </TabsTrigger>
            <TabsTrigger value="stats" className="text-xs gap-1">
              <BarChart3 className="h-3.5 w-3.5" />
              {t("spectator.stats") || "Stats"}
            </TabsTrigger>
            <TabsTrigger value="vote" className="text-xs gap-1">
              <ThumbsUp className="h-3.5 w-3.5" />
              {t("spectator.vote") || "Vote"}
            </TabsTrigger>
          </TabsList>

          {/* Prediction Tab */}
          <TabsContent value="predict" className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {currentPhase === "civ_ban"
                  ? t("spectator.predictBan") || "What will they ban?"
                  : t("spectator.predictPick") || "What will they pick?"}
              </p>

              {/* My Stats */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="flex items-center gap-1.5">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium">
                    {stats.correct_predictions}/{stats.total_predictions}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-medium">{stats.accuracy}%</span>
                </div>
              </div>
            </div>

            {hasPredicted ? (
              <div className="text-center py-4">
                <Badge variant="outline" className="gap-1.5 px-3 py-1.5">
                  <Sparkles className="h-4 w-4" />
                  {t("spectator.predictionLocked") || "Prediction Locked!"}
                </Badge>
                <p className="text-xs text-muted-foreground mt-2">
                  {t("spectator.predicted") || "You predicted"}: {myPrediction?.predicted_item}
                </p>

                {/* Show community predictions */}
                {totalPredictions > 1 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-medium">
                      {t("spectator.communityPredictions") || "Community Predictions"}
                    </p>
                    {Object.entries(allPredictions)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 3)
                      .map(([item, count]) => {
                        const percentage = Math.round((count / totalPredictions) * 100)
                        const civ = CIVILIZATIONS.find((c) => c.id === item)
                        return (
                          <div key={item} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span>{civ?.name || item}</span>
                              <span className="text-muted-foreground">{percentage}%</span>
                            </div>
                            <Progress value={percentage} className="h-1.5" />
                          </div>
                        )
                      })}
                  </div>
                )}
              </div>
            ) : (
              <ScrollArea className="h-[200px]">
                <div className="grid grid-cols-3 gap-2">
                  {availableItems.slice(0, 12).map((civ) => {
                    const civStat = getStatForCiv(civ.id)
                    return (
                      <Button
                        key={civ.id}
                        variant="outline"
                        size="sm"
                        className="h-auto py-2 px-2 flex flex-col items-center gap-1 hover:border-primary hover:bg-primary/10 bg-transparent"
                        onClick={() => makePrediction(civ.id)}
                        disabled={isLoading}
                      >
                        <span className="text-xs font-medium truncate w-full text-center">{civ.name}</span>
                        {civStat && <span className="text-[10px] text-muted-foreground">{civStat.win_rate}% WR</span>}
                      </Button>
                    )
                  })}
                </div>
              </ScrollArea>
            )}
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-sm font-medium">{t("spectator.topCivs") || "Top Civilizations"}</p>
              <p className="text-xs text-muted-foreground">
                {draft.final_map
                  ? `${t("spectator.onMap") || "On"} ${draft.final_map}`
                  : t("spectator.overall") || "Overall Stats"}
              </p>
            </div>

            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {civStats.slice(0, 10).map((stat, index) => {
                  const civ = CIVILIZATIONS.find((c) => c.id.toLowerCase() === stat.civ_id.toLowerCase())
                  const isBanned = bannedCivs.includes(stat.civ_id)
                  const isPicked = pickedCivs.includes(stat.civ_id)

                  return (
                    <div
                      key={stat.civ_id}
                      className={cn(
                        "flex items-center gap-3 p-2 rounded-lg transition-colors",
                        isBanned && "opacity-50 bg-red-500/10",
                        isPicked && "bg-emerald-500/10",
                        !isBanned && !isPicked && "hover:bg-muted/50",
                      )}
                    >
                      <div className="flex items-center justify-center w-6">
                        {index === 0 ? (
                          <Crown className="h-4 w-4 text-amber-500" />
                        ) : index === 1 ? (
                          <span className="text-sm font-bold text-slate-400">2</span>
                        ) : index === 2 ? (
                          <span className="text-sm font-bold text-amber-700">3</span>
                        ) : (
                          <span className="text-xs text-muted-foreground">{index + 1}</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{civ?.name || stat.civ_id}</p>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                          <span>{stat.total_picks} picks</span>
                          <span>{stat.total_bans} bans</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p
                          className={cn(
                            "text-sm font-bold",
                            stat.win_rate >= 55 && "text-emerald-500",
                            stat.win_rate < 45 && "text-red-500",
                          )}
                        >
                          {stat.win_rate}%
                        </p>
                        <p className="text-[10px] text-muted-foreground">win rate</p>
                      </div>

                      {(isBanned || isPicked) && (
                        <Badge variant={isBanned ? "destructive" : "default"} className="text-[10px] px-1.5">
                          {isBanned ? "BAN" : "PICK"}
                        </Badge>
                      )}
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Vote Tab */}
          <TabsContent value="vote" className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                {t("spectator.voteDesc") || "Vote for the best plays in this draft!"}
              </p>

              <div className="space-y-3">
                <VoteOption
                  icon={<Flame className="h-4 w-4" />}
                  label={t("spectator.bestPick") || "Best Pick"}
                  description={t("spectator.bestPickDesc") || "Most impactful pick"}
                />
                <VoteOption
                  icon={<Target className="h-4 w-4" />}
                  label={t("spectator.bestBan") || "Best Ban"}
                  description={t("spectator.bestBanDesc") || "Most strategic ban"}
                />
                <VoteOption
                  icon={<Trophy className="h-4 w-4" />}
                  label={t("spectator.mvpMoment") || "MVP Moment"}
                  description={t("spectator.mvpMomentDesc") || "Draft-defining moment"}
                />
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                {t("spectator.voteAfter") || "Voting available after draft completes"}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function VoteOption({
  icon,
  label,
  description,
}: {
  icon: React.ReactNode
  label: string
  description: string
}) {
  return (
    <Button variant="outline" className="w-full justify-between h-auto py-3 px-4 bg-transparent" disabled>
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-muted">{icon}</div>
        <div className="text-left">
          <p className="font-medium text-sm">{label}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </Button>
  )
}
