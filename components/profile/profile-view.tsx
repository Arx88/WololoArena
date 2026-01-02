"use client"

import { useState } from "react"
import { ProfileHeader } from "./profile-header"
import { FavoriteCivs } from "./favorite-civs"
import { FavoriteMaps } from "./favorite-maps"
import { MatchHistoryList } from "./match-history-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, History } from "lucide-react"
import type { Profile, MatchHistory } from "@/lib/types/draft"
import { useLanguage } from "@/lib/i18n/language-context"

interface ProfileViewProps {
  userId: string
  profile: Profile | null
  matchHistory: MatchHistory[]
  isDemo?: boolean
  loadingHistory?: boolean
}

export function ProfileView({ userId, profile, matchHistory, isDemo = false, loadingHistory = false }: ProfileViewProps) {
  const [currentProfile, setCurrentProfile] = useState(profile)
  const { t } = useLanguage()

  return (
    <section className="py-12">
      <div className="mx-auto max-w-4xl px-4">
        <ProfileHeader userId={userId} profile={currentProfile} onProfileUpdate={setCurrentProfile} isDemo={isDemo} />

        <Tabs defaultValue="favorites" className="mt-8">
          <TabsList className="grid w-full grid-cols-2 bg-card">
            <TabsTrigger
              value="favorites"
              className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Star className="h-4 w-4" />
              {t("profile")}
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <History className="h-4 w-4" />
              {t("matchHistory")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="favorites" className="mt-6 space-y-6">
            <FavoriteCivs
              userId={userId}
              profile={currentProfile}
              onProfileUpdate={setCurrentProfile}
              isDemo={isDemo}
            />
            <FavoriteMaps
              userId={userId}
              profile={currentProfile}
              onProfileUpdate={setCurrentProfile}
              isDemo={isDemo}
            />
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <MatchHistoryList userId={userId} matches={matchHistory} isLoading={loadingHistory} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
