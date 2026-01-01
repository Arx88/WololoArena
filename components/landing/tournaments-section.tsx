"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, Calendar, ArrowRight, Crown, Globe, Loader2, Plus, Gift, Flame } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { DEFAULT_DEMO_TOURNAMENTS } from "@/lib/demo/demo-data"
import { PrizeDisplay } from "@/components/tournament/prize-display"
import type { TournamentPrizes } from "@/lib/types/draft"
import { currentHypedTournamentIds } from "@/components/landing/most-hyped-section"
import { useToast } from "@/hooks/use-toast"

interface Tournament {
  id: string
  name: string
  description?: string
  format: string
  visibility: string
  max_participants: number
  status: string
  start_date?: string
  participants_count: number
  prizes?: TournamentPrizes
}

export function TournamentsSection() {
  const router = useRouter()
  const { t, language } = useLanguage()
  const { toast } = useToast()
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadTournaments = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))

      let showcaseTournaments: Tournament[] = []

      const demoTournaments = DEFAULT_DEMO_TOURNAMENTS
      showcaseTournaments = demoTournaments
        .filter((t) => t.visibility === "public" && (t.status === "registration" || t.status === "in_progress"))
        .filter((t) => !currentHypedTournamentIds.includes(t.id))
        .slice(0, 3)
        .map((t) => ({
          ...t,
          participants_count: Math.floor(Math.random() * t.max_participants * 0.7) + 2,
        }))

      setTournaments(showcaseTournaments)
      setIsLoading(false)
    }

    loadTournaments()
  }, [])

  const statusConfig = {
    registration: {
      label: t("registrationOpen"),
      color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      icon: Users,
    },
    in_progress: {
      label: t("inProgress"),
      color: "bg-primary/20 text-primary border-primary/30",
      icon: Flame,
    },
    completed: {
      label: t("completed"),
      color: "bg-muted text-muted-foreground border-muted",
      icon: Trophy,
    },
  }

  const formatLabels: Record<string, string> = {
    single_elimination: t("singleElimination"),
    double_elimination: t("doubleElimination"),
    round_robin: t("roundRobin"),
    swiss: t("swissSystem"),
  }

  const handleTournamentClick = (tournament: Tournament) => {
    if (tournament.id.startsWith("demo-")) {
      toast({
        title: "Torneo de demostración",
        description: "Este es un torneo de ejemplo. Crea tu cuenta para participar en torneos reales.",
      })
    } else {
      router.push(`/tournaments/${tournament.id}`)
    }
  }

  if (isLoading) {
    return (
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="mx-auto max-w-7xl px-4 relative">
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">{t("loadingTournaments")}</p>
          </div>
        </div>
      </section>
    )
  }

  if (tournaments.length === 0) {
    return (
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="mx-auto max-w-7xl px-4 relative">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-4">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">{t("activeTournaments")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">{t("competeInEpic")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("tournamentsSubtitle")}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={() => router.push("/tournaments")} className="gap-2 min-w-[200px]">
              <Trophy className="h-5 w-5" />
              {t("viewAllTournaments")}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/tournaments/create")}
              className="gap-2 min-w-[200px] bg-transparent"
            >
              <Plus className="h-5 w-5" />
              {t("createTournament")}
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-4 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-4">
            <Trophy className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t("activeTournaments")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">{t("competeInEpic")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("tournamentsSubtitle")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {tournaments.map((tournament, index) => {
            const status = statusConfig[tournament.status as keyof typeof statusConfig] || statusConfig.registration
            const isInProgress = tournament.status === "in_progress"
            const StatusIcon = status.icon
            const fillPercent = Math.min(100, (tournament.participants_count / tournament.max_participants) * 100)

            return (
              <Card
                key={tournament.id}
                className={`group bg-[#0a0a0b]/80 border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border-border/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 cursor-pointer overflow-hidden ${
                  isInProgress ? "ring-2 ring-primary/40" : ""
                }`}
                onClick={() => handleTournamentClick(tournament)}
              >
                <CardContent className="p-0">
                  {/* Top accent bar */}
                  <div
                    className={`h-1 ${isInProgress ? "bg-primary" : "bg-gradient-to-r from-primary/50 to-primary/20"}`}
                  />

                  {/* Header */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${isInProgress ? "bg-primary/20" : "bg-muted/50"}`}>
                        {index === 0 ? (
                          <Crown className={`h-6 w-6 ${isInProgress ? "text-primary" : "text-primary/70"}`} />
                        ) : (
                          <Trophy className={`h-6 w-6 ${isInProgress ? "text-primary" : "text-muted-foreground"}`} />
                        )}
                      </div>
                      <Badge variant="outline" className={`${status.color} flex items-center gap-1.5`}>
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                      {tournament.name}
                    </h3>
                    {tournament.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{tournament.description}</p>
                    )}

                    {/* Prizes */}
                    {tournament.prizes?.enabled && (
                      <div className="flex items-center gap-2 text-sm p-3 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 mb-4">
                        <Gift className="h-4 w-4 text-primary shrink-0" />
                        <PrizeDisplay prizes={tournament.prizes} compact />
                      </div>
                    )}

                    {/* Stats row */}
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span className="font-medium">
                            {tournament.participants_count}/{tournament.max_participants}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Globe className="h-4 w-4" />
                          <span>{t("public")}</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {formatLabels[tournament.format] || tournament.format}
                      </Badge>
                    </div>

                    {/* Date and Progress */}
                    <div className="space-y-3">
                      {tournament.start_date && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(tournament.start_date).toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
                              weekday: "short",
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        </div>
                      )}

                      {tournament.status === "registration" && (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-muted-foreground">{t("spotsAvailable")}</span>
                            <span className="font-medium text-primary">
                              {tournament.max_participants - tournament.participants_count}
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                              style={{ width: `${fillPercent}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" onClick={() => router.push("/tournaments")} className="gap-2 min-w-[200px]">
            <Trophy className="h-5 w-5" />
            {t("viewAllTournaments")}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push("/tournaments/create")}
            className="gap-2 min-w-[200px] bg-transparent border-primary/50 text-primary hover:bg-primary/10"
          >
            <Plus className="h-5 w-5" />
            {t("createTournament")}
          </Button>
        </div>
      </div>
    </section>
  )
}

