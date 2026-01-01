"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy, Medal, Award, Crown, TrendingUp, Star, Users } from "lucide-react"
import { getTopPlayers } from "@/lib/demo/demo-data"
import { useLanguage } from "@/lib/i18n/language-context"
import type { Profile } from "@/lib/types/draft"

const RANK_ICONS = {
  1: { icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/30" },
  2: { icon: Medal, color: "text-gray-400", bg: "bg-gray-400/10 border-gray-400/30" },
  3: { icon: Award, color: "text-amber-600", bg: "bg-amber-600/10 border-amber-600/30" },
}

// Points awarded based on tournament position
const POINTS_SYSTEM = {
  1: 100, // 1st place
  2: 60, // 2nd place
  3: 40, // 3rd place
  4: 25, // 4th place
  5: 15, // 5th-8th place
  participation: 5, // participation points
}

export function TopPlayersSection() {
  const router = useRouter()
  const { t } = useLanguage()
  const [players, setPlayers] = useState<Profile[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTopPlayers = async () => {
      const topPlayers = getTopPlayers(8)
      setPlayers(topPlayers)
      setIsLoading(false)
    }

    fetchTopPlayers()
  }, [])

  if (isLoading) {
    return (
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        </div>
      </section>
    )
  }

  if (players.length === 0) {
    return null
  }

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 gap-2 border-primary/30 bg-primary/10 text-primary">
            <Crown className="h-4 w-4" />
            {t("topPlayers") || "Top Players"}
          </Badge>
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">{t("leaderboard") || "Leaderboard"}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("leaderboardDesc") ||
              "The best players based on tournament performance. Earn points by competing and winning!"}
          </p>
        </div>

        {/* Points System Info */}
        <Card className="bg-[#0a0a0b]/80 border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border-border/50 mb-8 max-w-2xl mx-auto">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              {t("pointsSystem") || "Points System"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span>1st: +{POINTS_SYSTEM[1]} pts</span>
              </div>
              <div className="flex items-center gap-2">
                <Medal className="h-4 w-4 text-gray-400" />
                <span>2nd: +{POINTS_SYSTEM[2]} pts</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-600" />
                <span>3rd: +{POINTS_SYSTEM[3]} pts</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-muted-foreground" />
                <span>
                  {t("participation") || "Play"}: +{POINTS_SYSTEM.participation} pts
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {players.slice(0, 3).map((player, index) => {
            const rank = (index + 1) as 1 | 2 | 3
            const rankConfig = RANK_ICONS[rank]
            const RankIcon = rankConfig.icon
            const order = index === 0 ? "md:order-2" : index === 1 ? "md:order-1" : "md:order-3"
            const scale = index === 0 ? "md:scale-105" : ""

            return (
              <Card
                key={player.id}
                className={`bg-[#0a0a0b]/80 border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border-2 ${rankConfig.bg} transition-all duration-300 hover:shadow-lg ${order} ${scale}`}
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className={`relative mb-4`}>
                      <Avatar className="h-20 w-20 border-4 border-background">
                        <AvatarFallback className={`text-2xl font-bold ${rankConfig.bg}`}>
                          {player.username?.charAt(0).toUpperCase() || "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 ${rankConfig.bg}`}
                      >
                        <RankIcon className={`h-4 w-4 ${rankConfig.color}`} />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-1">{player.username}</h3>
                    <p className={`text-2xl font-bold ${rankConfig.color} mb-2`}>
                      {player.total_points?.toLocaleString() || 0} pts
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Trophy className="h-3 w-3 text-yellow-500" />
                        {player.tournaments_won || 0} {t("wins") || "wins"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {player.tournaments_played || 0} {t("played") || "played"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Rest of the leaderboard */}
        {players.length > 3 && (
          <Card className="bg-[#0a0a0b]/80 border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border-border/50">
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {players.slice(3).map((player, index) => {
                  const rank = index + 4

                  return (
                    <div
                      key={player.id}
                      className="flex items-center justify-between p-4 hover:bg-card/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-8 text-center font-bold text-muted-foreground">#{rank}</span>
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {player.username?.charAt(0).toUpperCase() || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{player.username}</p>
                          <p className="text-xs text-muted-foreground">
                            {player.tournaments_won || 0} {t("wins") || "wins"} • {player.tournaments_played || 0}{" "}
                            {t("played") || "played"}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="font-bold">
                        {player.total_points?.toLocaleString() || 0} pts
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => router.push("/tournaments")} className="gap-2 bg-transparent">
            <Trophy className="h-4 w-4" />
            {t("joinTournament") || "Join a Tournament"}
          </Button>
        </div>
      </div>
    </section>
  )
}

