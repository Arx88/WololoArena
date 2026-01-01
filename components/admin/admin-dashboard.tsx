"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Map, Gamepad2, Settings } from "lucide-react"
import { CivilizationsManager } from "./civilizations-manager"
import { MapsManager } from "./maps-manager"
import { GameModesManager } from "./game-modes-manager"
import type { CivilizationConfig, MapConfig, GameModeConfig } from "@/lib/types/admin"
import { useLanguage } from "@/lib/i18n/language-context"

interface AdminDashboardProps {
  initialCivs: CivilizationConfig[]
  initialMaps: MapConfig[]
  initialModes: GameModeConfig[]
}

export function AdminDashboard({ initialCivs, initialMaps, initialModes }: AdminDashboardProps) {
  const { t } = useLanguage()
  const [civs, setCivs] = useState(initialCivs)
  const [maps, setMaps] = useState(initialMaps)
  const [modes, setModes] = useState(initialModes)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">{t("adminPanel")}</h1>
          <p className="text-muted-foreground">{t("adminPanelSubtitle")}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t("civilizations")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{civs.filter((c) => c.is_active).length}</div>
            <p className="text-xs text-muted-foreground">
              {t("total")}: {civs.length}, {civs.filter((c) => !c.is_active).length} {t("inactive")}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t("maps")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{maps.filter((m) => m.is_active).length}</div>
            <p className="text-xs text-muted-foreground">
              {t("total")}: {maps.length}, {maps.filter((m) => !m.is_active).length} {t("inactive")}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t("gameModes")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{modes.filter((m) => m.is_active).length}</div>
            <p className="text-xs text-muted-foreground">{t("total")}: {modes.length}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="civilizations" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="civilizations" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            {t("civilizations")}
          </TabsTrigger>
          <TabsTrigger value="maps" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            {t("maps")}
          </TabsTrigger>
          <TabsTrigger value="gamemodes" className="flex items-center gap-2">
            <Gamepad2 className="h-4 w-4" />
            {t("gameModes")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="civilizations">
          <CivilizationsManager civs={civs} onUpdate={setCivs} />
        </TabsContent>

        <TabsContent value="maps">
          <MapsManager maps={maps} onUpdate={setMaps} />
        </TabsContent>

        <TabsContent value="gamemodes">
          <GameModesManager modes={modes} onUpdate={setModes} />
        </TabsContent>
      </Tabs>
    </div>
  )
}