"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Flame, Users, Calendar, ArrowRight, Loader2, Trophy, Crown, Sparkles } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { isDemoMode } from "@/lib/demo/auth"
import { getDemoTournaments } from "@/lib/demo/demo-data"
import { HypeButton } from "@/components/tournament/hype-button"
import type { TournamentPrizes } from "@/lib/types/draft"

interface HypedTournament {
  id: string
  name: string
  description?: string
  format: string
  status: string
  max_participants: number
  start_date?: string
  hype_count: number
  participant_count: number
  prizes?: TournamentPrizes
}

const DEMO_HYPE_KEY = "demo_tournament_hype"

function getDemoHype(): Record<string, string[]> {
  if (typeof window === "undefined") return {}
  const stored = localStorage.getItem(DEMO_HYPE_KEY)
  if (!stored) return {}
  try {
    return JSON.parse(stored)
  } catch {
    return {}
  }
}

export let currentHypedTournamentIds: string[] = []

export function MostHypedSection() {
  const router = useRouter()
  const { t, language } = useLanguage()
  const [tournaments, setTournaments] = useState<HypedTournament[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadMostHyped = async () => {
      if (isDemoMode()) {
        const demoTournaments = getDemoTournaments()
        const demoHype = getDemoHype()

        // Create hyped tournaments with demo data
        const hypedTournaments: HypedTournament[] = demoTournaments
          .filter((t) => t.status === "registration" || t.status === "in_progress")
          .map((t) => ({
            ...t,
            hype_count: (demoHype[t.id] || []).length + Math.floor(Math.random() * 50), // Add some fake hype for demo
            participant_count: Math.floor(Math.random() * t.max_participants * 0.7) + 2,
          }))
          .sort((a, b) => b.hype_count - a.hype_count)
          .slice(0, 3)

        setTournaments(hypedTournaments)
        currentHypedTournamentIds = hypedTournaments.map((t) => t.id)
        setIsLoading(false)
        return
      }

      try {
        const supabase = createClient()

        // Get tournaments with hype counts
        const { data: tournamentsData } = await supabase
          .from("tournaments")
          .select("*")
          .in("status", ["registration", "in_progress"])
          .eq("visibility", "public")

        if (!tournamentsData || tournamentsData.length === 0) {
          setTournaments([])
          currentHypedTournamentIds = []
          setIsLoading(false)
          return
        }

        // Get hype counts for each tournament
        const tournamentsWithHype = await Promise.all(
          tournamentsData.map(async (t) => {
            const { count: hypeCount } = await supabase
              .from("tournament_hype")
              .select("*", { count: "exact", head: true })
              .eq("tournament_id", t.id)

            const { count: participantCount } = await supabase
              .from("tournament_participants")
              .select("*", { count: "exact", head: true })
              .eq("tournament_id", t.id)
              .in("status", ["confirmed", "pending"])

            return {
              ...t,
              hype_count: hypeCount || 0,
              participant_count: participantCount || 0,
            }
          }),
        )

        // Sort by hype count and take top 3
        const sortedTournaments = tournamentsWithHype.sort((a, b) => b.hype_count - a.hype_count).slice(0, 3)

        setTournaments(sortedTournaments)
        currentHypedTournamentIds = sortedTournaments.map((t) => t.id)
      } catch (err) {
        console.error("Error loading most hyped tournaments:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadMostHyped()
  }, []) // Removed supabase from dependency array since it's now created inside

  if (isLoading) {
    return (
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">{t("loading")}</p>
          </div>
        </div>
      </section>
    )
  }

  if (tournaments.length === 0) {
    return null
  }

  const statusConfig = {
    registration: {
      label: t("registrationOpen"),
      color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    },
    in_progress: {
      label: t("inProgress"),
      color: "bg-primary/10 text-primary border-primary/20",
    },
  }

  const [featuredTournament, ...otherTournaments] = tournaments

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-orange-500/10 via-red-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/3 left-0 w-[300px] h-[300px] bg-red-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 relative">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 gap-1.5 px-4 py-1.5 border-orange-500/50 bg-orange-500/10 text-orange-500 text-sm font-semibold"
          >
            <Flame className="h-4 w-4 fill-current animate-pulse" />
            {t("mostHyped")}
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent">
            {t("hotTournaments")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t("hotTournamentsDesc")}</p>
        </div>

        {featuredTournament && (
          <div
            className="mb-10 cursor-pointer group"
            onClick={() => router.push(`/tournaments/${featuredTournament.id}`)}
          >
            <Card className="relative overflow-hidden border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 via-background to-red-500/5 transition-all duration-500 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-1">
              {/* Animated top border */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite]" />

              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  {/* Left side - Main info */}
                  <div className="flex-1 p-8 lg:p-12">
                    {/* Badges row */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold shadow-lg shadow-orange-500/30">
                        <Crown className="h-5 w-5" />
                        <span>#1 MOST HYPED</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={statusConfig[featuredTournament.status as keyof typeof statusConfig]?.color}
                      >
                        {statusConfig[featuredTournament.status as keyof typeof statusConfig]?.label}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 group-hover:text-orange-500 transition-colors">
                      {featuredTournament.name}
                    </h3>

                    {featuredTournament.description && (
                      <p className="text-lg text-muted-foreground mb-8 max-w-2xl">{featuredTournament.description}</p>
                    )}

                    {/* Stats row */}
                    <div className="flex flex-wrap items-center gap-6 mb-8">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-orange-500/10">
                          <Flame className="h-5 w-5 text-orange-500 fill-orange-500" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-orange-500">{featuredTournament.hype_count}</p>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">Hype</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">
                            {featuredTournament.participant_count}/{featuredTournament.max_participants}
                          </p>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">Players</p>
                        </div>
                      </div>
                      {featuredTournament.start_date && (
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-muted">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-lg font-semibold">
                              {new Date(featuredTournament.start_date).toLocaleDateString(
                                language === "es" ? "es-ES" : "en-US",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                },
                              )}
                            </p>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">Start Date</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-4">
                      <Button
                        size="lg"
                        className="gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg shadow-orange-500/30"
                      >
                        <Trophy className="h-5 w-5" />
                        {t("viewTournament") || "View Tournament"}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <HypeButton
                        tournamentId={featuredTournament.id}
                        initialHypeCount={featuredTournament.hype_count}
                        size="lg"
                        showCount={false}
                      />
                    </div>
                  </div>

                  {/* Right side - Visual element */}
                  <div className="lg:w-80 p-8 lg:p-12 flex items-center justify-center bg-gradient-to-br from-orange-500/10 to-red-500/10 border-t lg:border-t-0 lg:border-l border-orange-500/20">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-full blur-2xl opacity-30 animate-pulse" />
                      <div className="relative flex flex-col items-center justify-center w-40 h-40 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 border-4 border-orange-500/30">
                        <Flame className="h-16 w-16 text-orange-500 fill-orange-500 animate-pulse" />
                        <span className="text-3xl font-black text-orange-500 mt-2">
                          {featuredTournament.hype_count}
                        </span>
                        <span className="text-xs uppercase tracking-widest text-muted-foreground">HYPE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {otherTournaments.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 mb-10">
            {otherTournaments.map((tournament, index) => {
              const status = statusConfig[tournament.status as keyof typeof statusConfig] || statusConfig.registration

              return (
                <Card
                  key={tournament.id}
                  className="group bg-[#0a0a0b]/80 border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border-border/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 cursor-pointer relative overflow-hidden"
                  onClick={() => router.push(`/tournaments/${tournament.id}`)}
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500/50 to-red-500/50" />

                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500/10 text-orange-500 font-semibold text-sm">
                          <Sparkles className="h-3.5 w-3.5" />#{index + 2}
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-orange-500/10 text-orange-500">
                          <Flame className="h-3.5 w-3.5 fill-current" />
                          <span className="text-sm font-semibold">{tournament.hype_count}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className={status.color}>
                        {status.label}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors">
                      {tournament.name}
                    </h3>
                    {tournament.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{tournament.description}</p>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>
                          {tournament.participant_count}/{tournament.max_participants}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {tournament.start_date && (
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(tournament.start_date).toLocaleDateString(
                                language === "es" ? "es-ES" : "en-US",
                                {
                                  day: "numeric",
                                  month: "short",
                                },
                              )}
                            </span>
                          </div>
                        )}
                        <HypeButton
                          tournamentId={tournament.id}
                          initialHypeCount={tournament.hype_count}
                          size="sm"
                          showCount={false}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* CTA */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={() => router.push("/tournaments")}
            className="gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg"
          >
            <Flame className="h-5 w-5" />
            {t("viewAllHyped")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

