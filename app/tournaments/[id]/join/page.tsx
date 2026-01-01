"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, Calendar, Globe, Lock, Loader2, Check, AlertCircle, Gift } from "lucide-react"
import type { Tournament } from "@/lib/types/draft"
import { isDemoMode, getDemoUser } from "@/lib/demo/auth"
import { getDemoTournament, getDemoParticipants, addDemoParticipant } from "@/lib/demo/demo-data"
import { useLanguage } from "@/lib/i18n/language-context"
import { useToast } from "@/hooks/use-toast"

interface JoinTournamentPageProps {
  params: Promise<{ id: string }>
}

function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}

function isDemoTournamentId(id: string): boolean {
  return id.startsWith("demo-tournament-")
}

export default function JoinTournamentPage({ params }: JoinTournamentPageProps) {
  const router = useRouter()
  const supabase = createClient()
  const { t } = useLanguage()
  const { toast } = useToast()

  const [tournament, setTournament] = useState<Tournament | null>(null)
  const [participantCount, setParticipantCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isJoining, setIsJoining] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [alreadyJoined, setAlreadyJoined] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDemo, setIsDemo] = useState(false)
  const [tournamentId, setTournamentId] = useState<string>("")

  useEffect(() => {
    const init = async () => {
      const { id } = await params
      setTournamentId(id)

      const demoMode = isDemoMode()
      const isDemoId = isDemoTournamentId(id)

      if (demoMode || isDemoId) {
        setIsDemo(true)
        const demoUser = getDemoUser()
        setIsAuthenticated(!!demoUser)

        const demoTournament = getDemoTournament(id)
        if (!demoTournament) {
          setError(t("tournamentNotFound"))
          setIsLoading(false)
          return
        }

        setTournament(demoTournament)

        const demoParticipants = getDemoParticipants(id)
        const confirmedCount = demoParticipants.filter((p) => p.status === "confirmed" || p.status === "pending").length
        setParticipantCount(confirmedCount)

        if (demoUser) {
          const existingParticipant = demoParticipants.find((p) => p.user_id === demoUser.id)
          setAlreadyJoined(!!existingParticipant)
        }

        setIsLoading(false)
        return
      }

      if (!isValidUUID(id)) {
        console.error("[v0] Invalid tournament ID format:", id)
        setError(t("tournamentNotFound"))
        setIsLoading(false)
        return
      }

      // Real Supabase flow
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)

      const { data: tournamentData, error: tournamentError } = await supabase
        .from("tournaments")
        .select("*")
        .eq("id", id)
        .single()

      if (tournamentError || !tournamentData) {
        console.error("[v0] Tournament fetch error:", tournamentError)
        setError(t("tournamentNotFound"))
        setIsLoading(false)
        return
      }

      setTournament(tournamentData)

      const { count } = await supabase
        .from("tournament_participants")
        .select("*", { count: "exact", head: true })
        .eq("tournament_id", id)
        .eq("status", "confirmed")

      setParticipantCount(count || 0)

      if (user) {
        const { data: existingParticipant } = await supabase
          .from("tournament_participants")
          .select("*")
          .eq("tournament_id", id)
          .eq("user_id", user.id)
          .single()

        setAlreadyJoined(!!existingParticipant)
      }

      setIsLoading(false)
    }

    init()
  }, [params, supabase, t])

  const handleJoin = async () => {
    if (!tournament) return

    if (!isAuthenticated) {
      router.push(`/auth/login?redirect=/tournaments/${tournament.id}/join`)
      return
    }

    setIsJoining(true)

    if (isDemo) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const demoUser = getDemoUser()
      if (demoUser) {
        addDemoParticipant(tournament.id, demoUser.id, "pending")
        toast({
          title: t("joinRequestSent"),
          description: t("waitingForApproval"),
        })
        setAlreadyJoined(true)
        router.push(`/tournaments/${tournament.id}`)
      }
      setIsJoining(false)
      return
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("No autenticado")

      const { error: joinError } = await supabase.from("tournament_participants").insert({
        tournament_id: tournament.id,
        user_id: user.id,
        status: "pending",
        invited_at: new Date().toISOString(),
      })

      if (joinError) throw joinError

      setAlreadyJoined(true)
      router.push(`/tournaments/${tournament.id}`)
    } catch (err) {
      setError(t("errorJoining"))
    } finally {
      setIsJoining(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !tournament) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 pt-16 flex items-center justify-center">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="pt-6 text-center">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <p className="font-medium">{error || t("tournamentNotFound")}</p>
              <Button onClick={() => router.push("/tournaments")} className="mt-4">
                {t("viewTournaments")}
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  const isFull = participantCount >= tournament.max_participants
  const isRegistrationOpen = tournament.status === "registration"

  // Format prize for display
  const getPrizeText = () => {
    if (!tournament.prizes?.enabled || !tournament.prizes.prizes?.length) return null
    const firstPrize = tournament.prizes.prizes.find((p) => p.place === 1)
    if (!firstPrize) return null
    if (firstPrize.type === "money") {
      return `${firstPrize.currency} ${firstPrize.amount}`
    }
    return firstPrize.description
  }

  const prizeText = getPrizeText()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-16 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full stone-texture">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">{tournament.name}</CardTitle>
            <CardDescription>{tournament.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Tournament Info */}
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="gap-1">
                {tournament.visibility === "public" ? (
                  <>
                    <Globe className="h-3 w-3" />
                    {t("public")}
                  </>
                ) : (
                  <>
                    <Lock className="h-3 w-3" />
                    {t("private")}
                  </>
                )}
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <Users className="h-3 w-3" />
                {participantCount}/{tournament.max_participants}
              </Badge>
              {tournament.start_date && (
                <Badge variant="outline" className="gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(tournament.start_date).toLocaleDateString()}
                </Badge>
              )}
            </div>

            {/* Prize info */}
            {prizeText && (
              <div className="flex items-center justify-center gap-2 text-amber-500 font-medium">
                <Gift className="h-5 w-5" />
                <span>
                  {t("prize")}: {prizeText}
                </span>
              </div>
            )}

            {/* Status messages */}
            {alreadyJoined && (
              <div className="rounded-lg border border-green-500/50 bg-green-500/10 p-4 text-center">
                <Check className="h-6 w-6 text-green-500 mx-auto mb-2" />
                <p className="font-medium text-green-500">{t("alreadyJoined")}</p>
              </div>
            )}

            {!isRegistrationOpen && !alreadyJoined && (
              <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4 text-center">
                <AlertCircle className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                <p className="font-medium text-yellow-500">{t("registrationClosed")}</p>
              </div>
            )}

            {isFull && !alreadyJoined && (
              <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-center">
                <AlertCircle className="h-6 w-6 text-red-500 mx-auto mb-2" />
                <p className="font-medium text-red-500">{t("tournamentFull")}</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col gap-2">
              {alreadyJoined ? (
                <Button onClick={() => router.push(`/tournaments/${tournament.id}`)} className="w-full">
                  {t("viewTournament")}
                </Button>
              ) : (
                <Button onClick={handleJoin} disabled={isJoining || isFull || !isRegistrationOpen} className="w-full">
                  {isJoining ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : !isAuthenticated ? (
                    t("loginToJoin")
                  ) : (
                    t("joinTournament")
                  )}
                </Button>
              )}
              <Button variant="outline" onClick={() => router.push("/tournaments")} className="w-full bg-transparent">
                {t("viewOtherTournaments")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
