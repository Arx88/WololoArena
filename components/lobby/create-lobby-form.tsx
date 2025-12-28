"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { generateLobbyCode } from "@/lib/utils/lobby"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { GAME_MODES } from "@/lib/data/game-modes"
import { MAPS } from "@/lib/data/maps"
import { CIVILIZATIONS } from "@/lib/data/civilizations"
import { MapSettingsPanel } from "@/components/lobby/map-settings-panel"
import { Crown, Timer, Shield, ChevronDown, Gamepad2, Settings2, Globe, Lock } from "lucide-react"
import type { LobbySettings, MapSettings, Visibility } from "@/lib/types/draft"
import { isDemoMode } from "@/lib/demo/auth"
import { useLanguage } from "@/lib/i18n/language-context"

interface CreateLobbyFormProps {
  userId: string
  username: string
}

const DEFAULT_MAP_SETTINGS: MapSettings = {
  mode: "ban_until_one",
      pool: MAPS ? MAPS.map((m) => m.id) : [],  bans_per_player: 1,
  allow_same_home_map: false,
  enable_neutral_map: false,
  neutral_map_pool: [],
}

export function CreateLobbyForm({ userId }: CreateLobbyFormProps) {
  const router = useRouter()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [visibility, setVisibility] = useState<Visibility>("private")

  const [settings, setSettings] = useState<LobbySettings>({
    ban_time: 30,
    pick_time: 45,
    civ_bans: 3,
    civ_picks: 1,
    map_bans: 2,
    map_picks: 1,
    civ_pool: "all",
    custom_civ_pool: [],
    map_pool: MAPS.map((m) => m.id),
    game_modes: ["random_map", "empire_wars"],
    enable_civ_bans: true,
    enable_civ_picks: true,
    enable_map_bans: true,
    enable_game_mode_roll: true,
    enable_coin_flip: true, // Enabled by default as requested
    map_settings: DEFAULT_MAP_SETTINGS,
  })

  const [selectedModes, setSelectedModes] = useState<Record<string, boolean>>({
    random_map: true,
    empire_wars: true,
    death_match: false,
    regicide: false,
    king_of_the_hill: false,
    wonder_race: false,
  })

  const handleMapSettingsChange = (mapSettings: MapSettings) => {
    setSettings((s) => {
      const updatedSettings = {
        ...s,
        map_settings: mapSettings,
        map_pool: mapSettings.pool,
        // Removed enable_map_bans: mapSettings.mode !== "disabled",
      };
      return updatedSettings;
    });
  }

  const handleCreateLobby = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const activeModes = Object.entries(selectedModes)
      .filter(([, active]) => active)
      .map(([id]) => id)

    if (settings.enable_game_mode_roll && activeModes.length === 0) {
      setError(t("selectGameMode"))
      setIsLoading(false)
      return
    }

    const { map_settings } = settings
    if (map_settings.mode !== "disabled") {
      const minMaps = getMinMapsRequired(map_settings)
      if (map_settings.pool.length < minMaps) {
        setError(t("selectMinMaps").replace("{count}", minMaps.toString()))
        setIsLoading(false)
        return
      }
    }

    const finalSettings: LobbySettings = {
      ...settings,
      map_pool: map_settings.pool,
      game_modes: activeModes,
      map_mode: map_settings.mode,
      map_bans_per_player: map_settings.bans_per_player,
      allow_same_home_map: map_settings.allow_same_home_map,
      enable_neutral_map: map_settings.enable_neutral_map,
      neutral_map_pool: map_settings.neutral_map_pool,
    }

    const isDemo = isDemoMode()

    if (isDemo) {
      // Simulate lobby creation and then redirect to the lobby room,
      // allowing the 'Ready' state to be shown/simulated.
      await new Promise((r) => setTimeout(r, 500))
      const fakeLobbyId = `demo-${Date.now()}`
      // Store demo lobby data with its unique fake ID
      localStorage.setItem(`demo_lobby_data_${fakeLobbyId}`, JSON.stringify({ id: fakeLobbyId, host_id: userId, status: "waiting", visibility, settings: finalSettings }));
      router.push(`/lobby?id=${fakeLobbyId}`); // Redirect to the lobby room with ID as search param
      return
    }

    const supabase = createClient()

    try {
      const code = generateLobbyCode()

      const { data: lobby, error: lobbyError } = await supabase
        .from("lobbies")
        .insert({
          code,
          host_id: userId,
          status: "waiting",
          visibility,
          settings: finalSettings,
        })
        .select()
        .single()

      if (lobbyError) throw lobbyError

      router.push(`/lobby/${lobby.id}`)
    } catch (err) {
      console.error("[v0] CreateLobbyForm: Error:", err)
      setError(err instanceof Error ? err.message : t("failedToJoin"))
    } finally {
      setIsLoading(false)
    }
  }

  const activeModeCount = Object.values(selectedModes).filter(Boolean).length

  return (
    <Card className="stone-texture border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-primary" />
          {t("createNewLobby")}
        </CardTitle>
        <CardDescription>{t("configureAndInvite")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateLobby} className="space-y-6">
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-medium">
              {visibility === "public" ? (
                <Globe className="h-4 w-4 text-primary" />
              ) : (
                <Lock className="h-4 w-4 text-primary" />
              )}
              {t("draftVisibility")}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setVisibility("private")}
                className={`flex items-center gap-3 rounded-lg border p-4 transition-colors ${
                  visibility === "private"
                    ? "border-primary bg-primary/10"
                    : "border-border/50 bg-card/50 hover:border-border"
                }`}
              >
                <Lock className={`h-5 w-5 ${visibility === "private" ? "text-primary" : "text-muted-foreground"}`} />
                <div className="text-left">
                  <p className="font-medium">{t("privateVisibility")}</p>
                  <p className="text-xs text-muted-foreground">{t("privateDesc")}</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setVisibility("public")}
                className={`flex items-center gap-3 rounded-lg border p-4 transition-colors ${
                  visibility === "public"
                    ? "border-primary bg-primary/10"
                    : "border-border/50 bg-card/50 hover:border-border"
                }`}
              >
                <Globe className={`h-5 w-5 ${visibility === "public" ? "text-primary" : "text-muted-foreground"}`} />
                <div className="text-left">
                  <p className="font-medium">{t("publicVisibility")}</p>
                  <p className="text-xs text-muted-foreground">{t("publicDesc")}</p>
                </div>
              </button>
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-medium">
              <Settings2 className="h-4 w-4 text-primary" />
              {t("draftPhases")}
            </h3>
            <p className="text-xs text-muted-foreground">{t("enableDisablePhases")}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-lg border border-border/50 bg-card/50 p-3">
                <div>
                  <p className="text-sm font-medium">{t("civBans")}</p>
                  <p className="text-xs text-muted-foreground">{t("banBeforePick")}</p>
                </div>
                <Switch
                  checked={settings.enable_civ_bans}
                  onCheckedChange={(checked) => setSettings((s) => ({ ...s, enable_civ_bans: checked }))}
                />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/50 bg-card/50 p-3">
                <div>
                  <p className="text-sm font-medium">{t("civPicks")}</p>
                  <p className="text-xs text-muted-foreground">{t("pickCivToPlay")}</p>
                </div>
                <Switch
                  checked={settings.enable_civ_picks}
                  onCheckedChange={(checked) => setSettings((s) => ({ ...s, enable_civ_picks: checked }))}
                />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/50 bg-card/50 p-3">
                <div>
                  <p className="text-sm font-medium">{t("gameModeRoulette")}</p>
                  <p className="text-xs text-muted-foreground">{t("randomModeSelection")}</p>
                </div>
                <Switch
                  checked={settings.enable_game_mode_roll}
                  onCheckedChange={(checked) => setSettings((s) => ({ ...s, enable_game_mode_roll: checked }))}
                />
              </div>
            </div>
          </div>

          {/* Timer Settings */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-medium">
              <Timer className="h-4 w-4 text-primary" />
              {t("timeSettings")}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>
                  {t("banTime")}: {settings.ban_time}s
                </Label>
                <Slider
                  value={[settings.ban_time]}
                  onValueChange={([value]) => setSettings((s) => ({ ...s, ban_time: value }))}
                  min={15}
                  max={60}
                  step={5}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label>
                  {t("pickTime")}: {settings.pick_time}s
                </Label>
                <Slider
                  value={[settings.pick_time]}
                  onValueChange={([value]) => setSettings((s) => ({ ...s, pick_time: value }))}
                  min={15}
                  max={90}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Ban/Pick Settings - only show if enabled */}
          {settings.enable_civ_bans && (
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-medium">
                <Shield className="h-4 w-4 text-primary" />
                {t("civSettings")}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="civ-bans">{t("bansPerPlayer")}</Label>
                  <Select
                    value={settings.civ_bans.toString()}
                    onValueChange={(v) => setSettings((s) => ({ ...s, civ_bans: Number.parseInt(v) }))}
                  >
                    <SelectTrigger id="civ-bans" className="bg-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 1, 2, 3, 4, 5].map((n) => (
                        <SelectItem key={n} value={n.toString()}>
                          {n === 0 ? t("noBans") : `${n} ban${n > 1 ? "s" : ""}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="civ-pool">{t("civPool")}</Label>
                  <Select
                    value={settings.civ_pool}
                    onValueChange={(v) => setSettings((s) => ({ ...s, civ_pool: v as "all" | "base" | "dlc" }))}
                  >
                    <SelectTrigger id="civ-pool" className="bg-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        {t("allCivs")} ({CIVILIZATIONS.length})
                      </SelectItem>
                      <SelectItem value="base">
                        {t("baseGameOnly")} ({CIVILIZATIONS.filter((c) => c.expansion === "base").length})
                      </SelectItem>
                      <SelectItem value="dlc">
                        {t("dlcOnly")} ({CIVILIZATIONS.filter((c) => c.expansion !== "base").length})
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          <MapSettingsPanel settings={settings.map_settings} onChange={handleMapSettingsChange} />

          {/* Game Modes - only show if enabled */}
          {settings.enable_game_mode_roll && (
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-medium">
                <Gamepad2 className="h-4 w-4 text-primary" />
                {t("gameModes")} ({activeModeCount} {t("selected")})
              </h3>
              <p className="text-xs text-muted-foreground">{t("randomModeDesc")}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {GAME_MODES.map((mode) => (
                  <div
                    key={mode.id}
                    className={`flex items-center justify-between rounded-lg border p-3 transition-colors ${selectedModes[mode.id] ? "border-primary/50 bg-primary/10" : "border-border/50 bg-card/50"}`}
                  >
                    <div>
                      <p className="text-sm font-medium">{mode.name}</p>
                      <p className="text-xs text-muted-foreground">{mode.description}</p>
                    </div>
                    <Switch
                      checked={selectedModes[mode.id]}
                      onCheckedChange={(checked) => setSelectedModes((s) => ({ ...s, [mode.id]: checked }))}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Advanced Settings */}
          <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" type="button" className="w-full justify-between">
                <span className="text-sm text-muted-foreground">{t("advancedSettings")}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${advancedOpen ? "rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 pt-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center justify-between rounded-lg border border-border/50 bg-card/50 p-3">
                  <div>
                    <p className="text-sm font-medium">{t("enableCoinFlip") || "Enable Coin Flip"}</p>
                    <p className="text-xs text-muted-foreground">
                      {t("coinFlipDesc") || "Randomly determine who starts first"}
                    </p>
                  </div>
                  <Switch
                    checked={settings.enable_coin_flip}
                    onCheckedChange={(checked) => setSettings((s) => ({ ...s, enable_coin_flip: checked }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="civ-picks">{t("civPicksLabel")}</Label>
                  <Select
                    value={settings.civ_picks.toString()}
                    onValueChange={(v) => setSettings((s) => ({ ...s, civ_picks: Number.parseInt(v) }))}
                  >
                    <SelectTrigger id="civ-picks" className="bg-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3].map((n) => (
                        <SelectItem key={n} value={n.toString()}>
                          {n} pick{n > 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? t("creatingLobby") : t("createLobby")}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function getMinMapsRequired(mapSettings: MapSettings): number {
  switch (mapSettings.mode) {
    case "ban_until_one":
      return 2
    case "random":
      return 1
    case "random_with_bans":
      return mapSettings.bans_per_player * 2 + 1
    case "home_away":
      return mapSettings.allow_same_home_map ? 1 : 2
    case "disabled":
      return 0
  }
}
