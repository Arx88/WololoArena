"use client"

import { useState } from "react"
import { CreateLobbyForm } from "./create-lobby-form"
import { JoinLobbyForm } from "./join-lobby-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Crown, Users } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

interface LobbyHubProps {
  userId: string
  username: string
}

export function LobbyHub({ userId, username }: LobbyHubProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("create")

  return (
    <section className="py-4">
      <div className="mx-auto max-w-2xl px-4">
        <div className="rounded-xl border border-white/10 bg-black/20 p-1 backdrop-blur-md">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-transparent p-0">
              <TabsTrigger
                value="create"
                className="gap-2 rounded-lg py-3 text-white/60 data-[state=active]:bg-yellow-600 data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:shadow-lg transition-all"
              >
                <Crown className="h-4 w-4" />
                {t("createLobby")}
              </TabsTrigger>
              <TabsTrigger
                value="join"
                className="gap-2 rounded-lg py-3 text-white/60 data-[state=active]:bg-yellow-600 data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:shadow-lg transition-all"
              >
                <Users className="h-4 w-4" />
                {t("joinLobby")}
              </TabsTrigger>
            </TabsList>

            <div className="mt-6 px-4 pb-4">
               <TabsContent value="create">
                 <CreateLobbyForm userId={userId} username={username} />
               </TabsContent>

               <TabsContent value="join">
                 <JoinLobbyForm userId={userId} />
               </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
