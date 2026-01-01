"use client"

import type React from "react"
import { useState, useEffect, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { generateLobbyCode } from "@/lib/utils/lobby"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { GAME_MODES } from "@/lib/data/game-modes"
import { MAPS } from "@/lib/data/maps"
import { MapSettingsPanel } from "@/components/lobby/map-settings-panel"
import { Crown, Timer, Shield, Globe, Lock, Map, ChevronRight, ChevronLeft, User, Search, CheckCircle2, Users, Info } from "lucide-react"
import type { LobbySettings, MapSettings, Visibility, Profile } from "@/lib/types/draft"
import { isDemoMode } from "@/lib/demo/auth"
import { useLanguage } from "@/lib/i18n/language-context"
import { cn } from "@/lib/utils"

interface CreateLobbyFormProps {
  userId: string
  username: string
}

const DEFAULT_MAP_SETTINGS: MapSettings = {
  mode: "ban_until_one",
  pool: MAPS.map((m) => m.id),
  bans_per_player: 1,
  allow_same_home_map: false,
  enable_neutral_map: false,
  neutral_map_pool: [],
}

const MOCK_USERS = [
  { id: "user-1", username: "TheViper" },
  { id: "user-2", username: "Hera" },
  { id: "user-3", username: "Liereyy" },
  { id: "user-4", username: "Tatoh" },
  { id: "user-5", username: "Daut" },
]

export function CreateLobbyForm({ userId }: CreateLobbyFormProps) {
  const router = useRouter()
  const { t } = useLanguage()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [visibility, setVisibility] = useState<Visibility>("private")

  const [searchQuery, setSearchQuery] = useState({ host: "", guest: "" })
  const [searchResults, setSearchResults] = useState<{ host: any[], guest: any[] }>({ host: [], guest: [] })

  const [settings, setSettings] = useState<LobbySettings>({
    ban_time: 30, pick_time: 45, civ_bans: 3, civ_picks: 1, map_bans: 2, map_picks: 1,
    civ_pool: "all", custom_civ_pool: [], map_pool: MAPS.map((m) => m.id),
    game_modes: ["random_map", "empire_wars"], enable_civ_bans: true, enable_civ_picks: true,
    enable_map_bans: true, enable_game_mode_roll: true, enable_coin_flip: true,
    enable_suggestions: true, is_admin_created: false, map_settings: DEFAULT_MAP_SETTINGS, pre_draft_bans: 0
  })

  const [selectedModes, setSelectedModes] = useState<Record<string, boolean>>({
    random_map: true, empire_wars: true, death_match: false, regicide: false, king_of_the_hill: false, wonder_race: false,
  })

  const skipMapPool = settings.map_settings.mode === "disabled"
  const isAdmin = settings.is_admin_created

  const nextStep = useCallback(() => {
    if (step === 1 && !isAdmin) setStep(3)
    else if (step === 4 && !skipMapPool) setStep(4.5)
    else if ((step === 4 && skipMapPool) || step === 4.5) setStep(5)
    else setStep(s => Math.min(s + 1, 5))
  }, [step, isAdmin, skipMapPool])

  const prevStep = useCallback(() => {
    if (step === 3 && !isAdmin) setStep(1)
    else if (step === 4.5) setStep(4)
    else if (step === 5 && skipMapPool) setStep(4) // Skip pool view
    else setStep(s => Math.max(s - 1, 1))
  }, [step, isAdmin, skipMapPool])

  useEffect(() => {
    const searchPlayers = async (query: string, type: 'host' | 'guest') => {
      if (query.length < 2) { setSearchResults(prev => ({ ...prev, [type]: [] })); return; }
      if (isDemoMode()) {
        const filtered = MOCK_USERS.filter(u => u.username.toLowerCase().includes(query.toLowerCase()))
        setSearchResults(prev => ({ ...prev, [type]: filtered }))
      } else {
        const supabase = createClient()
        const { data } = await supabase.from("profiles").select("id, username").ilike("username", `%${query}%`).limit(5)
        setSearchResults(prev => ({ ...prev, [type]: data || [] }))
      }
    }
    const timerHost = setTimeout(() => searchPlayers(searchQuery.host, 'host'), 300)
    const timerGuest = setTimeout(() => searchPlayers(searchQuery.guest, 'guest'), 300)
    return () => { clearTimeout(timerHost); clearTimeout(timerGuest); }
  }, [searchQuery])

  const handleCreateLobby = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 5) {
      if (step === 2 && isAdmin && (!settings.host_player_id || !settings.guest_player_id)) {
        setError("Both rival selections are required for Arbitration"); return;
      }
      setError(null); nextStep(); return;
    }
    
    setIsLoading(true)
    const activeModes = Object.entries(selectedModes).filter(([, active]) => active).map(([id]) => id)
    const finalSettings = { ...settings, map_pool: settings.map_settings.pool, game_modes: activeModes, map_mode: settings.map_settings.mode }

    if (isDemoMode()) {
      const fakeId = `demo-${Date.now()}`
      localStorage.setItem(`demo_lobby_data_${fakeId}`, JSON.stringify({ id: fakeId, host_id: isAdmin ? settings.host_player_id : userId, status: "waiting", visibility, settings: finalSettings }))
      router.push(`/lobby?id=${fakeId}`); return
    }

    try {
      const supabase = createClient()
      const { data: lobby, error: err } = await supabase.from("lobbies").insert({ 
        code: generateLobbyCode(), host_id: isAdmin ? settings.host_player_id : userId,
        guest_id: isAdmin ? settings.guest_player_id : null, status: "waiting", visibility, settings: finalSettings 
      }).select().single()
      if (err) throw err
      router.push(`/lobby/${lobby.id}`)
    } catch (err) { setError("Lobby creation failed"); setIsLoading(false); }
  }

  const totalSteps = (isAdmin ? 5 : 4) + (skipMapPool ? 0 : 0) // Logical segments
  const displayStep = step === 1 ? 1 : (!isAdmin && step >= 3 ? step - 1 : step)

  return (
    <Card className="border-white/10 bg-[#0a0a0b]/80 backdrop-blur-xl shadow-2xl overflow-hidden rounded-2xl">
      <div className="h-1.5 w-full bg-white/5 flex">
        {[1, 2, 3, 4, 5].map(i => {
          if (i === 2 && !isAdmin) return null;
          return <div key={i} className={`h-full flex-1 transition-all duration-500 ${step >= i ? "bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]" : "bg-transparent"}`} />
        })}
      </div>
      
      <CardHeader className="p-8 pb-4">
        <div className="flex justify-between items-center mb-4">
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-yellow-500/60">Phase 0{Math.floor(displayStep)} / 0{isAdmin ? 5 : 4}</span>
           <Badge variant="outline" className="border-white/10 text-[10px] uppercase font-bold text-white/40 tracking-widest px-3">
             {step === 1 ? "Creation" : step === 2 ? "Combatants" : step === 3 ? "Logistics" : step === 4 ? "Battlefield" : "Finalize"}
           </Badge>
        </div>
        <CardTitle className="text-2xl text-white font-black italic uppercase tracking-tight flex items-center gap-3 leading-none">
          {step === 1 && <Lock className="h-6 w-6 text-yellow-500" />}
          {step === 2 && <Users className="h-6 w-6 text-yellow-500" />}
          {step === 3 && <Timer className="h-6 w-6 text-yellow-500" />}
          {step === 4 && <Map className="h-6 w-6 text-yellow-500" />}
          {step === 4.5 && <Map className="h-6 w-6 text-yellow-500" />}
          {step === 5 && <Crown className="h-6 w-6 text-yellow-500" />}
          <span className="mt-1">{step === 1 ? "Creation Mode" : step === 2 ? "Assign Rivals" : step === 3 ? "Draft Rules" : step === 4 ? "Map Mode" : step === 4.5 ? "Map Pool" : "Final Protocol"}</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="px-8 pb-8 pt-4 min-h-[500px] flex flex-col">
        <form onSubmit={handleCreateLobby} className="flex-1 flex flex-col">
          <div className="flex-1 space-y-8">
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="grid gap-4 sm:grid-cols-2">
                  <button type="button" onClick={() => setSettings(s => ({...s, is_admin_created: false}))} className={`group flex flex-col gap-2 rounded-2xl border-2 p-6 transition-all h-32 justify-center ${!isAdmin ? "border-yellow-500 bg-yellow-500/5 shadow-[0_0_30px_rgba(234,179,8,0.1)]" : "border-white/5 bg-black/40"}`}>
                    <div className="flex items-center gap-3"><User className={cn("h-6 w-6", !isAdmin ? "text-yellow-500" : "text-white/20")} /><p className="text-lg font-black uppercase italic text-white tracking-tight">Participate</p></div>
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">You will be Player 1</p>
                  </button>
                  <button type="button" onClick={() => setSettings(s => ({...s, is_admin_created: true}))} className={`group flex flex-col gap-2 rounded-2xl border-2 p-6 transition-all h-32 justify-center ${isAdmin ? "border-yellow-500 bg-yellow-500/5 shadow-[0_0_30px_rgba(234,179,8,0.1)]" : "border-white/5 bg-black/40"}`}>
                    <div className="flex items-center gap-3"><Shield className={cn("h-6 w-6", isAdmin ? "text-yellow-500" : "text-white/20")} /><p className="text-lg font-black uppercase italic text-white tracking-tight">Arbitrate</p></div>
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Create for two rivals</p>
                  </button>
                </div>
                <div className="p-6 rounded-2xl border border-white/5 bg-black/40 space-y-6">
                  <div className="flex items-center justify-between"><div><p className="text-sm font-bold text-white uppercase tracking-tight">Strategic Intelligence</p><p className="text-[10px] text-white/30 uppercase font-bold">Recommendations during draft</p></div><Switch checked={settings.enable_suggestions} onCheckedChange={c => setSettings(s => ({...s, enable_suggestions: c}))} className="data-[state=checked]:bg-yellow-600" /></div>
                  <div className="h-px bg-white/5 w-full" />
                  <div className="flex items-center justify-between"><p className="text-sm font-bold text-white uppercase tracking-tight">Visibility</p><div className="flex bg-black/60 p-1 rounded-xl border border-white/10"><button type="button" onClick={() => setVisibility("private")} className={cn("px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", visibility === 'private' ? "bg-yellow-600 text-black shadow-lg" : "text-white/40 hover:text-white")}>Private</button><button type="button" onClick={() => setVisibility("public")} className={cn("px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", visibility === 'public' ? "bg-yellow-600 text-black shadow-lg" : "text-white/40 hover:text-white")}>Public</button></div></div>
                </div>
              </div>
            )}

            {step === 2 && isAdmin && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-6">
                  {['host', 'guest'].map((role) => (
                    <div key={role} className="space-y-3 relative">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500/60 ml-1">Select {role === 'host' ? 'Player 1' : 'Player 2'}</Label>
                      <div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20" /><input type="text" placeholder="Search player..." className="w-full h-14 bg-black/60 border-2 border-white/10 rounded-2xl pl-12 pr-4 text-sm text-white focus:border-yellow-500 outline-none transition-all shadow-inner" value={searchQuery[role as keyof typeof searchQuery]} onChange={e => setSearchQuery(prev => ({ ...prev, [role]: e.target.value }))} />{settings[role === 'host' ? 'host_player_id' : 'guest_player_id'] && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500" />}</div>
                      {searchResults[role as keyof typeof searchResults].length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-[#151515] border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl">{searchResults[role as keyof typeof searchResults].map(user => (<button key={user.id} type="button" onClick={() => { setSettings(s => ({ ...s, [role === 'host' ? 'host_player_id' : 'guest_player_id']: user.id })); setSearchQuery(prev => ({ ...prev, [role]: user.username })); setSearchResults(prev => ({ ...prev, [role]: [] })); }} className="w-full flex items-center gap-3 p-4 hover:bg-yellow-600 hover:text-black transition-colors border-b border-white/5 last:border-0"><span className="font-bold text-sm uppercase italic">{user.username}</span></button>))}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-4 p-6 rounded-2xl bg-black/40 border-2 border-white/5"><div className="flex justify-between items-baseline"><Label className="text-white/60 text-[10px] font-black uppercase">{t("banTime")}</Label><span className="text-xl font-mono font-black text-yellow-500">{settings.ban_time}s</span></div><Slider value={[settings.ban_time]} onValueChange={([v]) => setSettings(s => ({...s, ban_time: v}))} min={15} max={60} step={5} className="[&_.bg-primary]:bg-yellow-600" /></div>
                  <div className="space-y-4 p-6 rounded-2xl bg-black/40 border-2 border-white/5"><div className="flex justify-between items-baseline"><Label className="text-white/60 text-[10px] font-black uppercase">{t("pickTime")}</Label><span className="text-xl font-mono font-black text-yellow-500">{settings.pick_time}s</span></div><Slider value={[settings.pick_time]} onValueChange={([v]) => setSettings(s => ({...s, pick_time: v}))} min={15} max={90} step={5} className="[&_.bg-primary]:bg-yellow-600" /></div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-3"><Label className="text-white/40 text-[10px] font-black uppercase ml-1">{t("bansPerPlayer")}</Label><Select value={settings.civ_bans.toString()} onValueChange={v => setSettings(s => ({...s, civ_bans: parseInt(v)}))}><SelectTrigger className="w-full h-14 bg-black/60 border-2 border-white/10 rounded-2xl font-bold text-white px-6"><SelectValue /></SelectTrigger><SelectContent className="bg-[#0a0a0b] border-white/10 text-white">{[0,1,2,3,4,5].map(n => <SelectItem key={n} value={n.toString()} className="h-12 focus:bg-yellow-600 focus:text-black font-bold">{n} Civilization Bans</SelectItem>)}</SelectContent></Select></div>
                  <div className="space-y-3"><Label className="text-white/40 text-[10px] font-black uppercase ml-1">{t("civPool")}</Label><Select value={settings.civ_pool} onValueChange={v => setSettings(s => ({...s, civ_pool: v as any}))}><SelectTrigger className="w-full h-14 bg-black/60 border-2 border-white/10 rounded-2xl font-bold text-white px-6"><SelectValue /></SelectTrigger><SelectContent className="bg-[#0a0a0b] border-white/10 text-white"><SelectItem value="all" className="h-12 focus:bg-yellow-600 focus:text-black font-bold">All Civilizations</SelectItem><SelectItem value="base" className="h-12 focus:bg-yellow-600 focus:text-black font-bold">Base Game</SelectItem><SelectItem value="dlc" className="h-12 focus:bg-yellow-600 focus:text-black font-bold">DLC Expansions</SelectItem></SelectContent></Select></div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <MapSettingsPanel view="mode" settings={settings.map_settings} onChange={m => setSettings(s => ({...s, map_settings: m}))} />
              </div>
            )}

            {step === 4.5 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <MapSettingsPanel view="pool" settings={settings.map_settings} onChange={m => setSettings(s => ({...s, map_settings: m}))} />
              </div>
            )}

            {step === 5 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="grid gap-4 sm:grid-cols-2">{GAME_MODES.slice(0, 4).map((mode) => (<div key={mode.id} className={`flex items-center justify-between rounded-2xl border-2 p-5 transition-all h-24 ${selectedModes[mode.id] ? "border-yellow-500 bg-yellow-500/5" : "border-white/5 bg-black/40"}`}><span className="text-sm font-black uppercase italic text-white">{mode.name}</span><Switch checked={selectedModes[mode.id]} onCheckedChange={c => setSelectedModes(s => ({...s, [mode.id]: c}))} className="data-[state=checked]:bg-yellow-600" /></div>))}</div>
                <div className="flex items-center justify-between p-6 rounded-2xl border-2 border-yellow-500/20 bg-yellow-500/5"><div className="flex items-center gap-4"><div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/30"><Crown className="h-6 w-6 text-yellow-500" /></div><div><p className="text-lg font-black uppercase italic text-white leading-none mb-1">Coin Flip</p><p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Random turn sequence</p></div></div><Switch checked={settings.enable_coin_flip} onCheckedChange={c => setSettings(s => ({...s, enable_coin_flip: c}))} className="data-[state=checked]:bg-yellow-600" /></div>
              </div>
            )}
          </div>

          <div className="pt-10 mt-auto flex gap-4">
            {step > 1 && (<Button type="button" variant="outline" onClick={() => step === 4.5 ? setStep(4) : prevStep()} className="flex-1 border-white/10 text-white hover:bg-white/5 h-16 rounded-2xl uppercase font-black tracking-widest"><ChevronLeft className="mr-2 h-5 w-5" /> Back</Button>)}
            <Button type={step === 5 ? "submit" : "button"} onClick={(e) => { if(step < 5) { e.preventDefault(); if(step === 4 && !skipMapPool) setStep(4.5); else nextStep(); } }} className="flex-[2] bg-yellow-600 hover:bg-yellow-500 text-black font-black italic uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(234,179,8,0.3)] h-16 rounded-2xl transition-all hover:scale-[1.02]">{isLoading ? "PROCESING..." : step === 5 ? "START ARENA" : "NEXT PHASE"}{step < 5 && <ChevronRight className="ml-2 h-5 w-5" />}</Button>
          </div>
          {error && <p className="text-[10px] font-black text-red-500 text-center mt-4 uppercase tracking-[0.3em]">{error}</p>}
        </form>
      </CardContent>
    </Card>
  )
}

function getMinMapsRequired(mapSettings: MapSettings): number {
  switch (mapSettings.mode) {
    case "ban_until_one": return 2
    case "random": return 1
    case "random_with_bans": return mapSettings.bans_per_player * 2 + 1
    case "home_away": return mapSettings.allow_same_home_map ? 1 : 2
    case "disabled": return 0
    default: return 1
  }
}