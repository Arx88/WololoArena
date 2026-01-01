"use client"

import React, { useMemo, useState } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MAPS } from "@/lib/data/maps"
import type { MapSettings, MapSelectionMode } from "@/lib/types/draft"
import { Map, Ban, Shuffle, Home, HelpCircle, Dices, X, Globe, Plus } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

interface MapSettingsPanelProps {
  settings: MapSettings
  onChange: (settings: MapSettings) => void
  view?: "mode" | "pool"
}

export function MapSettingsPanel({ settings, onChange, view = "mode" }: MapSettingsPanelProps) {
  const { t } = useLanguage()
  const [customMapName, setCustomMapName] = useState("")
  
  const MAP_MODES: { id: MapSelectionMode; name: string; description: string; icon: React.ReactNode; example: string; }[] = useMemo(() => [
    { id: "ban_until_one", name: t("banUntilOneName"), description: t("banUntilOneDesc"), icon: <Ban className="h-4 w-4" />, example: t("banUntilOneExample") },
    { id: "random", name: t("randomName"), description: t("randomDesc"), icon: <Dices className="h-4 w-4" />, example: t("randomExample") },
    { id: "random_with_bans", name: t("randomWithBansName"), description: t("randomWithBansDesc"), icon: <Shuffle className="h-4 w-4" />, example: t("randomWithBansExample") },
    { id: "home_away", name: t("homeAwayName"), description: t("homeAwayDesc"), icon: <Home className="h-4 w-4" />, example: t("homeAwayExample") },
    { id: "home_away_neutral", name: t("homeAwayNeutralName"), description: t("homeAwayNeutralDesc"), icon: <Globe className="h-4 w-4" />, example: t("homeAwayNeutralExample") },
    { id: "disabled", name: t("noMapsName"), description: t("noMapsDesc"), icon: <X className="h-4 w-4" />, example: t("noMapsExample") },
  ], [t])

  const safeSettings = useMemo<MapSettings>(() => ({
    mode: settings?.mode || "ban_until_one",
    pool: Array.isArray(settings?.pool) ? settings.pool : [],
    bans_per_player: settings?.bans_per_player ?? 1,
    allow_same_home_map: settings?.allow_same_home_map ?? false,
    enable_neutral_map: settings?.enable_neutral_map ?? false,
    neutral_map_pool: Array.isArray(settings?.neutral_map_pool) ? settings.neutral_map_pool : [],
  }), [settings])

  const activeMapCount = safeSettings.pool.length
  const maxBansPerPlayer = Math.max(0, Math.floor((activeMapCount - 1) / 2))

  const handleMapToggle = (mapId: string, checked: boolean) => {
    const newPool = checked 
      ? [...safeSettings.pool, mapId]
      : safeSettings.pool.filter(id => id !== mapId)
    onChange({ ...safeSettings, pool: newPool })
  }

  const handleBulkSelect = (filter: (map: any) => boolean) => {
    const newPool = MAPS.filter(filter).map(m => m.id)
    onChange({ ...safeSettings, pool: newPool })
  }

  const handleAddCustomMap = () => {
    if (!customMapName.trim()) return
    const newId = customMapName.toLowerCase().replace(/\s+/g, "_")
    if (!safeSettings.pool.includes(newId)) {
      onChange({ ...safeSettings, pool: [...safeSettings.pool, newId] })
    }
    setCustomMapName("")
  }

  const allDisplayMaps = useMemo(() => {
    const staticIds = MAPS.map(m => m.id)
    const customOnes = safeSettings.pool
      .filter(id => !staticIds.includes(id))
      .map(id => ({ id, name: id.replace(/_/g, " ").toUpperCase(), type: "custom" }))
    return [...MAPS, ...customOnes]
  }, [safeSettings.pool])

  return (
    <div className="space-y-6">
      {view === "mode" && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="pb-2 border-b border-white/5">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-yellow-500/80 flex items-center gap-3">
              <Map className="h-5 w-5" />
              {t("selectionMode")}
            </h3>
          </div>

          <RadioGroup value={safeSettings.mode} onValueChange={(v) => onChange({ ...safeSettings, mode: v as MapSelectionMode })} className="grid gap-2">
            {MAP_MODES.map((mode) => (
              <div 
                key={mode.id}
                className={`flex items-center gap-3 rounded-xl border p-3 transition-all duration-200 ${safeSettings.mode === mode.id ? "border-yellow-500 bg-yellow-500/5 shadow-[0_0_15px_rgba(234,179,8,0.1)]" : "border-white/5 bg-black/40"}`}
              >
                <RadioGroupItem value={mode.id} id={mode.id} className="border-white/20 text-yellow-500 shrink-0" />
                <div className={`flex items-center gap-2 ${safeSettings.mode === mode.id ? "text-yellow-400" : "text-white/40"}`}>{mode.icon}</div>
                <div className="flex-1 min-w-0">
                  <Label htmlFor={mode.id} className="cursor-pointer font-bold block text-sm text-white">{mode.name}</Label>
                  <p className="text-[10px] text-white/30 truncate">{mode.description}</p>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild><HelpCircle className="h-3.5 w-3.5 text-white/10 shrink-0 cursor-help" /></TooltipTrigger>
                    <TooltipContent side="right" className="bg-black border-white/10 text-white text-[10px] p-2 max-w-[200px]">{mode.example}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
          </RadioGroup>

          {safeSettings.mode === "random_with_bans" && (
            <div className="space-y-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 animate-in zoom-in-95">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-bold text-white/60 uppercase tracking-tight">{t("bansPerPlayerLabel")}</Label>
                <Badge className="bg-yellow-600 text-black font-bold h-5 px-2 text-[10px]">{safeSettings.bans_per_player}</Badge>
              </div>
              <Slider 
                value={[safeSettings.bans_per_player]} 
                onValueChange={([v]) => onChange({ ...safeSettings, bans_per_player: v })} 
                min={0} 
                max={maxBansPerPlayer} 
                step={1} 
                className="w-full [&_.bg-primary]:bg-yellow-600" 
              />
            </div>
          )}

          {(safeSettings.mode === "home_away" || safeSettings.mode === "home_away_neutral") && (
            <div className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-4">
              <div className="flex items-center justify-between">
                <div><Label className="text-sm font-bold text-white">Allow Same Home Map</Label><p className="text-[10px] text-white/30">{t("allowSameHomeMapDesc")}</p></div>
                <Switch checked={safeSettings.allow_same_home_map} onCheckedChange={(v) => onChange({ ...safeSettings, allow_same_home_map: v })} className="data-[state=checked]:bg-yellow-600" />
              </div>
            </div>
          )}
        </div>
      )}

      {view === "pool" && safeSettings.mode !== "disabled" && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="pb-2 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-yellow-500/80 flex items-center gap-3">
              <Map className="h-5 w-5" />
              {t("mapPool")}
            </h3>
            <span className="text-[10px] font-mono text-yellow-500/60 font-bold">{activeMapCount} SELECTED</span>
          </div>

          <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
            <input 
              type="text" 
              value={customMapName}
              onChange={(e) => setCustomMapName(e.target.value)}
              placeholder="Type custom map name..."
              className="flex-1 bg-transparent px-4 py-2 text-xs text-white outline-none"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomMap())}
            />
            <Button type="button" onClick={handleAddCustomMap} size="sm" className="bg-yellow-600 hover:bg-yellow-500 text-black font-black text-[10px] uppercase rounded-lg px-4 h-8 transition-all">
              <Plus className="h-3 w-3 mr-1" /> Add Map
            </Button>
          </div>

          <div className="grid gap-2 grid-cols-2 sm:grid-cols-4 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
            {allDisplayMaps.map((map) => (
              <div key={map.id} className={`flex flex-col gap-2 rounded-xl border p-3 transition-all ${safeSettings.pool.includes(map.id) ? "border-yellow-500/40 bg-yellow-500/10 shadow-inner" : "border-white/5 bg-black/40 opacity-60 hover:opacity-100"}`}>
                <div className="flex items-center justify-between">
                  <Checkbox 
                    id={`map-${map.id}`}
                    checked={safeSettings.pool.includes(map.id)} 
                    onCheckedChange={(checked) => handleMapToggle(map.id, !!checked)}
                    className="h-4 w-4 border-white/20 data-[state=checked]:bg-yellow-600 data-[state=checked]:border-black" 
                  />
                  <Badge variant="secondary" className="text-[8px] h-4 px-1 bg-white/5 text-white/40 border-0">{ (map.type || "land").toUpperCase() }</Badge>
                </div>
                <Label htmlFor={`map-${map.id}`} className="text-[10px] font-black cursor-pointer text-white truncate leading-none uppercase tracking-tighter">{map.name}</Label>
              </div>
            ))}
          </div>

          <div className="flex gap-2 flex-wrap pt-2 justify-center">
            {[{label: "ALL", f: () => true}, {label: "LAND", f: (m:any)=>m.type==="land"}, {label: "WATER", f: (m:any)=>m.type!=="land"}].map(b => (
              <Button key={b.label} type="button" variant="outline" size="sm" onClick={() => handleBulkSelect(b.f)} 
                className="h-8 px-4 text-[10px] font-black uppercase border-white/10 bg-white/5 hover:bg-yellow-600 hover:text-black transition-all">
                {b.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
