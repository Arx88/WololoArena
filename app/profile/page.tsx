"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProfileView } from "@/components/profile/profile-view"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, UserX } from "lucide-react"
import type { Profile, MatchHistory } from "@/lib/types/draft"
import { isDemoMode, getDemoUser } from "@/lib/demo/auth"
import { getDemoProfile } from "@/lib/demo/demo-data"
import { useLanguage } from "@/lib/i18n/language-context"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [isLoadingProfile, setIsLoadingProfile] = useState(true)
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [pageData, setPageData] = useState<{
    userId: string
    profile: Profile | null
    matchHistory: MatchHistory[]
    isDemo: boolean
  } | null>(null)

  useEffect(() => {
    const loadProfile = async () => {
      if (isDemoMode()) {
        const demoUser = getDemoUser()
        if (demoUser) {
          const profile = getDemoProfile(demoUser.id)
          setPageData({
            userId: demoUser.id,
            profile,
            matchHistory: [],
            isDemo: true,
          })
          setIsLoadingProfile(false)
          setIsLoadingHistory(false)
          return
        }
      }

      const supabase = getSupabaseClient()
      if (!supabase) {
        setError(t("databaseConnectionError"))
        setIsLoadingProfile(false)
        return
      }

      try {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          router.push("/auth/login?redirect=/profile")
          return
        }

        // STEP 1: LOAD BASIC PROFILE (FAST)
        let { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        if (profileError && profileError.code === "PGRST116") {
          const { data: newProfile } = await supabase
            .from("profiles")
            .insert({
              id: user.id,
              username: user.email?.split("@")[0] || "User",
              favorite_civs: [],
              favorite_maps: [],
            })
            .select().single()
          profile = newProfile
        }

        setPageData({
          userId: user.id,
          profile,
          matchHistory: [],
          isDemo: false,
        })
        setIsLoadingProfile(false)

        // STEP 2: LOAD HISTORY (BACKGROUND)
        const { data: matchHistory } = await supabase
          .from("match_history")
          .select("*")
          .or(`host_id.eq.${user.id},guest_id.eq.${user.id}`)
          .order("created_at", { ascending: false })
          .limit(20)

        setPageData(prev => prev ? ({
            ...prev,
            matchHistory: matchHistory || []
        }) : null)
        setIsLoadingHistory(false)

      } catch (err) {
        console.error("Profile load error:", err)
        setError(t("errorLoadingProfile"))
        setIsLoadingProfile(false)
      }
    }

    loadProfile()
  }, [router, t])

  if (error) {
    return (
      <div className="flex min-h-screen flex-col bg-[#020202]">
        <Navbar />
        <main className="flex-1 pt-32 flex items-center justify-center px-4">
          <Card className="bg-[#0a0a0b]/80 border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border-destructive/50 max-w-md w-full">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <AlertCircle className="h-16 w-16 text-destructive/50 mb-4" />
              <p className="text-lg font-medium text-destructive">{error}</p>
              <p className="text-sm text-muted-foreground mb-4 text-center">{t("tryReloading")}</p>
              <div className="flex gap-2">
                <Button onClick={() => window.location.reload()} variant="outline">{t("reload")}</Button>
                <Button onClick={() => router.push("/")}>{t("goHome")}</Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  if (!isLoadingProfile && !pageData) {
    return (
      <div className="flex min-h-screen flex-col bg-[#020202]">
        <Navbar />
        <main className="flex-1 pt-32 flex items-center justify-center px-4">
          <Card className="bg-[#0a0a0b]/80 border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <UserX className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <p className="text-lg font-medium">{t("profileNotFound")}</p>
              <p className="text-sm text-muted-foreground mb-4">{t("loginToViewProfile")}</p>
              <Button onClick={() => router.push("/auth/login")}>{t("login")}</Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#020202] text-white">
      <Navbar />
      <main className="flex-1">
        {/* Cinematic Header */}
        <section className="relative h-[45vh] flex items-center justify-center overflow-hidden border-b border-yellow-500/20 pt-20">
          <div className="absolute inset-0 z-0">
            <Image src="/images/Hero.png" alt="Profile" fill className="object-cover opacity-40 grayscale-[0.5] brightness-110" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.15)_0%,#020202_100%)]" />
          </div>
          <div className="relative z-10 text-center px-6 max-w-4xl mt-10">
            <Badge variant="outline" className="mb-6 border-yellow-500/30 bg-yellow-500/5 text-yellow-500 px-6 py-2 uppercase tracking-[0.3em] text-[10px] font-black">Perfil</Badge>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,1)] leading-tight mb-4">
              Estadísticas de <span className="gold-text-gradient pr-6 -mr-6">Usuario</span>
            </h1>
            <p className="text-yellow-100/40 font-medium uppercase tracking-[0.3em] text-sm md:text-lg italic max-w-2xl mx-auto">Revisa tu progreso y prepárate para el siguiente draft.</p>
          </div>
        </section>

        <div className="py-12">
          {pageData && (
            <ProfileView
                userId={pageData.userId}
                profile={pageData.profile}
                matchHistory={pageData.matchHistory}
                isDemo={pageData.isDemo}
                loadingHistory={isLoadingHistory}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}