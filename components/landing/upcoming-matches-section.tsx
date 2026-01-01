"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Swords, Calendar, Clock, Trophy, Radio, ArrowRight, Zap } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import type { TournamentMatch, Profile, Tournament } from "@/lib/types/draft"

interface MatchWithDetails extends TournamentMatch {
  tournament?: Tournament
  player1_profile?: Profile
  player2_profile?: Profile
}

const DEMO_MATCHES: MatchWithDetails[] = [
  {
    id: "demo-match-1",
    tournament_id: "demo-tournament-1",
    round: 2,
    match_number: 1,
    bracket_type: "winners",
    player1_id: "demo-user-1",
    player2_id: "demo-user-2",
    player1_score: 1,
    player2_score: 0,
    status: "in_progress",
    scheduled_at: new Date().toISOString(),
    tournament: {
      id: "demo-tournament-1",
      name: "AOE2 Pro League Season 5",
      status: "in_progress",
    } as Tournament,
    player1_profile: { id: "demo-user-1", username: "TheViper" } as Profile,
    player2_profile: { id: "demo-user-2", username: "Hera" } as Profile,
  },
  {
    id: "demo-match-2",
    tournament_id: "demo-tournament-1",
    round: 2,
    match_number: 2,
    bracket_type: "winners",
    player1_id: "demo-user-3",
    player2_id: "demo-user-4",
    player1_score: 0,
    player2_score: 0,
    status: "ready",
    scheduled_at: new Date(Date.now() + 3600000).toISOString(),
    tournament: {
      id: "demo-tournament-1",
      name: "AOE2 Pro League Season 5",
      status: "in_progress",
    } as Tournament,
    player1_profile: { id: "demo-user-3", username: "Liereyy" } as Profile,
    player2_profile: { id: "demo-user-4", username: "MbL" } as Profile,
  },
  {
    id: "demo-match-3",
    tournament_id: "demo-tournament-2",
    round: 1,
    match_number: 3,
    bracket_type: "winners",
    player1_id: "demo-user-5",
    player2_id: "demo-user-6",
    player1_score: 0,
    player2_score: 0,
    status: "ready",
    scheduled_at: new Date(Date.now() + 7200000).toISOString(),
    tournament: {
      id: "demo-tournament-2",
      name: "Wololo Arena Cup #12",
      status: "in_progress",
    } as Tournament,
    player1_profile: { id: "demo-user-5", username: "DauT" } as Profile,
    player2_profile: { id: "demo-user-6", username: "Tatoh" } as Profile,
  },
]

export function UpcomingMatchesSection() {
  const { language } = useLanguage()
  const [matches, setMatches] = useState<MatchWithDetails[]>(DEMO_MATCHES)
  const [isLoading, setIsLoading] = useState(false)

  // This prevents any network errors from crashing the component

  const liveMatches = matches.filter((m) => m.status === "in_progress")
  const upcomingMatches = matches.filter((m) => m.status === "ready")

  const formatTime = (dateString: string | null) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleTimeString(language === "es" ? "es-ES" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null
    const date = new Date(dateString)
    const now = new Date()
    const isToday = date.toDateString() === now.toDateString()
    const isTomorrow = date.toDateString() === new Date(now.getTime() + 86400000).toDateString()

    if (isToday) return language === "es" ? "Hoy" : "Today"
    if (isTomorrow) return language === "es" ? "Mañana" : "Tomorrow"

    return date.toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })
  }

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-5 w-96 mx-auto" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (matches.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 gap-2 px-4 py-1.5 text-sm border-primary/30">
            <Swords className="h-4 w-4 text-primary" />
            {language === "es" ? "Partidas en Vivo" : "Live Matches"}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl mb-3">
            {language === "es" ? "Próximas Partidas" : "Upcoming Matches"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === "es"
              ? "Sigue las partidas en vivo y descubre qué viene en los torneos activos"
              : "Follow live matches and discover what's coming in active tournaments"}
          </p>
        </div>

        {liveMatches.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
                <Radio className="h-4 w-4 text-red-500 animate-pulse" />
                <span className="text-sm font-medium text-red-500">{language === "es" ? "EN VIVO" : "LIVE NOW"}</span>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {liveMatches.map((match) => (
                <Link key={match.id} href={`/tournaments/${match.tournament_id}`} className="group block">
                  <Card className="relative overflow-hidden border-red-500/30 bg-gradient-to-br from-red-500/5 to-red-500/10 hover:border-red-500/50 transition-all hover:shadow-lg hover:shadow-red-500/10">
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-red-500 text-white gap-1 animate-pulse">
                        <Radio className="h-3 w-3" />
                        LIVE
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Trophy className="h-3 w-3" />
                        {match.tournament?.name || "Tournament"}
                      </p>
                      <CardTitle className="text-sm font-medium">
                        {language === "es" ? "Ronda" : "Round"} {match.round} -{" "}
                        {language === "es" ? "Partida" : "Match"} {match.match_number}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <Avatar className="h-10 w-10 border-2 border-primary/20">
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                              {match.player1_profile?.username?.charAt(0).toUpperCase() || "?"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="font-medium truncate text-sm">{match.player1_profile?.username || "TBD"}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-2xl font-bold text-primary">{match.player1_score}</span>
                          <span className="text-muted-foreground">-</span>
                          <span className="text-2xl font-bold">{match.player2_score}</span>
                        </div>

                        <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                          <div className="min-w-0 text-right">
                            <p className="font-medium truncate text-sm">{match.player2_profile?.username || "TBD"}</p>
                          </div>
                          <Avatar className="h-10 w-10 border-2 border-muted">
                            <AvatarFallback className="bg-muted font-semibold">
                              {match.player2_profile?.username?.charAt(0).toUpperCase() || "?"}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {upcomingMatches.length > 0 && (
          <div>
            {liveMatches.length > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  {language === "es" ? "Próximamente" : "Coming Up"}
                </span>
              </div>
            )}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingMatches.map((match) => (
                <Link key={match.id} href={`/tournaments/${match.tournament_id}`} className="group block">
                  <Card className="relative overflow-hidden bg-[#0a0a0b]/80 border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border-border/50 hover:border-primary/30 transition-all hover:shadow-lg group-hover:bg-card/80">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Trophy className="h-3 w-3" />
                          {match.tournament?.name || "Tournament"}
                        </p>
                        {match.scheduled_at && (
                          <Badge variant="outline" className="text-xs gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(match.scheduled_at)} {formatTime(match.scheduled_at)}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-sm font-medium">
                        {language === "es" ? "Ronda" : "Round"} {match.round} -{" "}
                        {language === "es" ? "Partida" : "Match"} {match.match_number}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <Avatar className="h-10 w-10 border-2 border-primary/20">
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                              {match.player1_profile?.username?.charAt(0).toUpperCase() || "?"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="font-medium truncate text-sm">{match.player1_profile?.username || "TBD"}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-center shrink-0">
                          <Zap className="h-5 w-5 text-primary" />
                        </div>

                        <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                          <div className="min-w-0 text-right">
                            <p className="font-medium truncate text-sm">{match.player2_profile?.username || "TBD"}</p>
                          </div>
                          <Avatar className="h-10 w-10 border-2 border-muted">
                            <AvatarFallback className="bg-muted font-semibold">
                              {match.player2_profile?.username?.charAt(0).toUpperCase() || "?"}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center mt-10">
          <Button asChild variant="outline" className="gap-2 bg-transparent">
            <Link href="/tournaments">
              {language === "es" ? "Ver Todos los Torneos" : "View All Tournaments"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

