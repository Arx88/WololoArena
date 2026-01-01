"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProfileView } from "@/components/profile/profile-view"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle, UserX } from "lucide-react"
import type { Profile, MatchHistory } from "@/lib/types/draft"
import { isDemoMode, getDemoUser, getDemoProfileById } from "@/lib/demo/auth" // Assuming getDemoProfileById exists or will be created
import { getDemoProfile, getDemoMatchHistory } from "@/lib/demo/demo-data"
import { useLanguage } from "@/lib/i18n/language-context"

interface DynamicProfilePageProps {
  params: Promise<{ id: string }>;
}

export default function DynamicProfilePage({ params }: DynamicProfilePageProps) {
  const resolvedParams = React.use(params);
  const { id: profileId } = resolvedParams; // Use 'id' from resolvedParams and assign to profileId

  const router = useRouter()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pageData, setPageData] = useState<{
    userId: string
    profile: Profile | null
    matchHistory: MatchHistory[]
    isDemo: boolean
  } | null>(null)

  useEffect(() => {
    const loadData = async () => {
      if (isDemoMode()) {
        const demoProfile = getDemoProfile(profileId); // Use profileId from URL
        if (demoProfile) {
          const demoMatchHistory = getDemoMatchHistory(profileId); // Assuming this function exists or will be created
          setPageData({
            userId: profileId,
            profile: demoProfile,
            matchHistory: demoMatchHistory,
            isDemo: true,
          })
          setIsLoading(false)
          return;
        } else {
          setError(t("profileNotFound")); // Demo profile not found
          setIsLoading(false);
          return;
        }
      }

      const supabase = getSupabaseClient()
      if (!supabase) {
        setError(t("databaseConnectionError"))
        setIsLoading(false)
        return
      }

      try {
        // Fetch profile for the ID from the URL
        let { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", profileId)
          .single()

        if (profileError || !profile) {
          if (profileError && profileError.code === "PGRST116") { // No rows found
             // This case means profile not found for the given ID, which is fine for public profiles.
             // We don't want to create it automatically here.
            setError(t("profileNotFound"))
            setIsLoading(false);
            return;
          }
          console.error("Profile load error:", profileError);
          setError(t("errorLoadingProfile"));
          setIsLoading(false);
          return;
        }

        const { data: matchHistory } = await supabase
          .from("match_history")
          .select("*")
          .or(`host_id.eq.${profileId},guest_id.eq.${profileId}`)
          .order("created_at", { ascending: false })
          .limit(20)

        setPageData({
          userId: profileId,
          profile,
          matchHistory: matchHistory || [],
          isDemo: false,
        })
      } catch (err) {
        console.error("Profile load error:", err)
        setError(t("errorLoadingProfile"))
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [profileId, t]) // Depend on profileId from params

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 pt-16 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-muted-foreground">{t("loadingProfile")}...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 pt-16 flex items-center justify-center px-4">
          <Card className="stone-texture border-destructive/50 max-w-md w-full">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <AlertCircle className="h-16 w-16 text-destructive/50 mb-4" />
              <p className="text-lg font-medium text-destructive">{error}</p>
              <p className="text-sm text-muted-foreground mb-4 text-center">{t("tryReloading")}</p>
              <div className="flex gap-2">
                <Button onClick={() => window.location.reload()} variant="outline">
                  {t("reload")}
                </Button>
                <Button onClick={() => router.push("/")}>{t("goHome")}</Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  if (!pageData || !pageData.profile) { // Check pageData.profile as well
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 pt-16 flex items-center justify-center px-4">
          <Card className="stone-texture max-w-md w-full">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <UserX className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <p className="text-lg font-medium">{t("profileNotFound")}</p>
              <p className="text-sm text-muted-foreground mb-4">{t("profileNotFoundDesc") || "The requested profile could not be found."}</p>
              <Button onClick={() => router.push("/")}>{t("goHome")}</Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <ProfileView
          userId={pageData.userId}
          profile={pageData.profile}
          matchHistory={pageData.matchHistory}
          isDemo={pageData.isDemo}
        />
      </main>
      <Footer />
    </div>
  )
}
