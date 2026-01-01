"use client"

import { useEffect, useState, useCallback, useRef, useMemo } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { DraftHeader } from "./draft-header"
import { DraftTimer } from "./draft-timer"
import { DraftProgress } from "./draft-progress"
import { PlayerPanel } from "./player-panel"
import { CivilizationGrid } from "./civilization-grid"
import { MapGrid } from "./map-grid"
import { DraftComplete } from "./draft-complete"
import { DraftChat } from "./draft-chat"
import { CoinFlip } from "./coin-flip"
import { DraftAssistPanel } from "./draft-assist-panel"
import { CIVILIZATIONS } from "@/lib/data/civilizations"
import { MAPS } from "@/lib/data/maps"
import type { Lobby, Draft, Profile, LobbySettings, Preset, DraftStep } from "@/lib/types/draft"
import { isDemoMode } from "@/lib/demo/auth"
import { cn } from "@/lib/utils"
import { useSoundEffects } from "@/hooks/use-sound-effects"
import { calculateDraftState, processSelection } from "@/lib/draft-engine"

function generateDynamicPreset(settings: LobbySettings): Preset {
  const steps: DraftStep[] = [];
  if (settings.map_mode === "ban_until_one") {
    const totalMaps = settings.map_pool?.length || MAPS.length;
    for (let i = 0; i < totalMaps - 1; i++) {
      steps.push({ id: `map-ban-${i}`, phase: "map_ban", actor: i % 2 === 0 ? "winner" : "loser", action: "ban", target: "map", count: 1 });
    }
  }
  if (settings.enable_civ_bans && settings.civ_bans > 0) {
    for (let i = 0; i < settings.civ_bans * 2; i++) {
      steps.push({ id: `civ-ban-${i}`, phase: "civ_ban", actor: i % 2 === 0 ? "winner" : "loser", action: "ban", target: "civ", count: 1 });
    }
  }
  if (settings.enable_civ_picks) {
    const picks = settings.civ_picks || 1;
    for (let i = 0; i < picks * 2; i++) {
      steps.push({ id: `civ-pick-${i}`, phase: "civ_pick", actor: i % 2 === 0 ? "winner" : "loser", action: "pick", target: "civ", count: 1 });
    }
  }
  return { id: "dynamic", name: "Dynamic Preset", steps, is_official: false };
}

interface DraftInterfaceProps {
  lobby: Lobby
  initialDraft: Draft
  userId: string
  hostProfile: Profile | null
  guestProfile: Profile | null
  isHost: boolean
}

export function DraftInterface({ lobby, initialDraft, userId, hostProfile, guestProfile, isHost }: DraftInterfaceProps) {
  const router = useRouter()
  const supabase = createClient()
  const { playSound } = useSoundEffects()
  const [draft, setDraft] = useState(initialDraft)
  
  const settings = useMemo(() => ({
    ban_time: 30, pick_time: 30, civ_bans: 1, civ_picks: 1,
    enable_civ_bans: true, enable_civ_picks: true, map_mode: "ban_until_one",
    ...(lobby.settings || {})
  }) as LobbySettings, [lobby.settings])

  const isDemo = isDemoMode()
  const preset = useMemo(() => generateDynamicPreset(settings), [settings]);
  const mapPool = useMemo(() => {
    const poolIds = settings.map_settings?.pool || settings.map_pool || [];
    return poolIds.length > 0 ? MAPS.filter((m) => poolIds.includes(m.id)) : MAPS;
  }, [settings.map_settings, settings.map_pool]);

  const civilizationPool = useMemo(() => {
    if (settings.civ_pool === 'base') return CIVILIZATIONS.filter(c => c.expansion === 'base');
    if (settings.civ_pool === 'dlc') return CIVILIZATIONS.filter(c => c.expansion !== 'base');
    return CIVILIZATIONS;
  }, [settings.civ_pool]);

  const bannedMaps = useMemo(() => [...(draft.host_map_bans || []), ...(draft.guest_map_bans || [])], [draft.host_map_bans, draft.guest_map_bans]);
  const pickedMaps = useMemo(() => [...(draft.host_map_picks || []), ...(draft.guest_map_picks || [])], [draft.host_map_picks, draft.guest_map_picks]);
  const bannedCivs = [...(draft.host_civ_bans || []), ...(draft.guest_civ_bans || [])]
  const pickedCivs = [...(draft.host_civ_picks || []), ...(draft.guest_civ_picks || [])]

  const resolvedMapId = useMemo(() => {
    if (draft.final_map) return draft.final_map;
    if (pickedMaps.length > 0) return pickedMaps[0];
    const remaining = mapPool.filter(m => !bannedMaps.includes(m.id));
    return remaining.length === 1 ? remaining[0].id : null;
  }, [draft.final_map, pickedMaps, mapPool, bannedMaps]);

  const isMyTurn = draft.current_turn === userId
  const turnName = draft.current_turn === lobby.host_id ? (hostProfile?.username || "Host") : (guestProfile?.username || "Guest")

  useEffect(() => {
    if (isMyTurn && draft.current_phase !== "completed") playSound("turn_start")
  }, [isMyTurn, draft.current_phase, playSound])

  // Bot Logic
  useEffect(() => {
    if (!isDemo || isMyTurn || draft.current_phase === "completed" || draft.current_phase === "coin_flip") return
    const botTimer = setTimeout(() => {
      const alreadyTaken = [...bannedCivs, ...pickedCivs, ...bannedMaps, ...pickedMaps];
      const isMapPhase = (draft.current_phase || "").includes("map");
      const pool = isMapPhase ? mapPool : civilizationPool;
      const available = pool.filter(i => !alreadyTaken.includes(i.id));
      if (available.length > 0) handleSelection(available[0].id, true);
    }, 2000);
    return () => clearTimeout(botTimer);
  }, [draft.current_turn, draft.current_phase, isDemo, isMyTurn, bannedCivs, pickedCivs, bannedMaps, pickedMaps, civilizationPool, mapPool]);

  const handleSelection = async (id: string, isBot = false) => {
    if ((!isMyTurn && !isBot) || draft.current_phase === "completed") return
    if (!isBot) playSound("click")
    const updateData = processSelection(draft, lobby, preset, id)
    if (!updateData) return
    const nextPhase = updateData.current_phase || draft.current_phase || "completed";
    const timePerTurn = (nextPhase.includes("ban") ? (settings.ban_time || 30) : (settings.pick_time || 30))
    updateData.phase_end_time = new Date(Date.now() + (timePerTurn * 1000)).toISOString()
    if (isDemo) { setDraft(prev => ({ ...prev, ...updateData } as Draft)); if (!isBot) playSound("lock"); }
    else { await supabase.from("drafts").update(updateData).eq("id", draft.id); playSound("lock"); }
  }

  const handleCoinFlipComplete = useCallback(async (winnerId: string) => {
    if (!isHost && !isDemo) return
    const speculativeDraft = { ...draft, coin_flip_winner: winnerId } as Draft
    const nextState = calculateDraftState(speculativeDraft, lobby, preset)
    const updateData = { 
        current_phase: nextState.nextPhase, current_turn: nextState.nextTurn, 
        coin_flip_winner: winnerId,
        phase_end_time: new Date(Date.now() + (settings.ban_time || 30) * 1000).toISOString()
    }
    if (isDemo) setDraft(prev => ({ ...prev, ...updateData } as Draft))
    else await supabase.from("drafts").update(updateData).eq("id", draft.id)
  }, [draft, lobby, preset, settings.ban_time, isDemo, isHost, supabase])

  if (draft.current_phase === "completed") {
    return <DraftComplete draft={draft} lobby={lobby} hostProfile={hostProfile} guestProfile={guestProfile} isHost={isHost} finalMap={resolvedMapId} mapMode={settings.map_mode} />
  }

  const actionLabel = (draft.current_phase || "action").includes("_") ? (draft.current_phase || "").split("_")[1].toUpperCase() : (draft.current_phase || "").toUpperCase();

  return (
    <div className="h-screen w-full bg-[#020202] text-foreground flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.05)_0%,#020202_100%)] pointer-events-none" />
      
      <header className={cn("relative z-30 w-full bg-[#0a0a0b]/95 border-b transition-all duration-500 backdrop-blur-2xl shrink-0 shadow-2xl px-6 py-2 space-y-2", isMyTurn ? "border-yellow-500/40 shadow-[0_0_40px_rgba(234,179,8,0.15)]" : "border-white/10")}>
        <DraftHeader phase={(draft.current_phase || "").replace("_", " ").toUpperCase()} subtitle={isMyTurn ? "Action Required" : `${turnName}'s Decision`} isMyTurn={isMyTurn} currentTurnName={turnName} draftId={draft.id} visibility={lobby.visibility || "private"} finalMapId={resolvedMapId} />
        {settings.enable_suggestions && (
          <DraftAssistPanel currentPhase={draft.current_phase || ""} currentMap={resolvedMapId} opponentCivs={isHost ? (draft.guest_civ_picks||[]) : (draft.host_civ_picks||[])} ownCivs={isHost ? (draft.host_civ_picks||[]) : (draft.guest_civ_picks||[])} bannedCivs={bannedCivs} isMyTurn={isMyTurn} onSuggestionClick={handleSelection} />
        )}
        <div className="pt-1">
           <DraftProgress currentPhase={draft.current_phase as any} mapMode={settings.map_mode || "ban_until_one"} totalMapBans={mapPool.length - 1} currentMapBans={bannedMaps.length} remainingMaps={mapPool.length - bannedMaps.length} totalCivBans={(settings.civ_bans || 1) * 2} currentCivBans={bannedCivs.length} civBansEnabled={settings.enable_civ_bans !== false} civPicksEnabled={settings.enable_civ_picks !== false} gameModeEnabled={!!settings.enable_game_mode_roll} />
        </div>
      </header>

      <main className="flex-1 min-h-0 relative z-10 overflow-hidden px-10 py-6">
        <div className="h-full w-full grid lg:grid-cols-[340px_1fr_340px] gap-8">
          <PlayerPanel profile={hostProfile} role="host" isCurrentTurn={draft.current_turn === lobby.host_id} civBans={draft.host_civ_bans || []} civPicks={draft.host_civ_picks || []} mapBans={draft.host_map_bans || []} mapPicks={draft.host_map_picks || []} />
          
          <div className="flex flex-col gap-6 min-h-0">
             <div className={cn("flex items-center justify-between px-8 py-4 rounded-lg border transition-all duration-500 shadow-2xl shrink-0 relative overflow-hidden", isMyTurn ? "bg-yellow-900/20 border-yellow-500/50 shadow-yellow-500/10" : "bg-white/[0.02] border-white/5 opacity-60")}>
                <div className="relative z-10">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black mb-1">Tactical Protocol</p>
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">
                    {isMyTurn ? <span>YOUR TURN: <span className="text-yellow-400">{actionLabel}</span></span> : <span>Awaiting {turnName}...</span>}
                  </h2>
                </div>
                <DraftTimer endTime={draft.phase_end_time} isMyTurn={isMyTurn} />
             </div>
             
             <div className="flex-1 border border-white/10 bg-[#0a0a0b]/40 backdrop-blur-md relative flex flex-col min-h-0 overflow-hidden rounded-xl shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-500/20" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-yellow-500/20" />
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                  {draft.current_phase === "coin_flip" ? (
                    <CoinFlip hostName={hostProfile?.username||"Host"} guestName={guestProfile?.username||"Guest"} hostId={lobby.host_id} guestId={lobby.guest_id||""} winnerId={draft.coin_flip_winner} isHost={isHost} onCoinFlipComplete={handleCoinFlipComplete} />
                  ) : (draft.current_phase || "").includes("map") ? (
                    <MapGrid maps={mapPool} bannedMaps={bannedMaps} pickedMaps={pickedMaps} onSelect={handleSelection} disabled={!isMyTurn} action={(draft.current_phase || "").includes("ban") ? "ban" : "pick"} />
                  ) : (
                    <CivilizationGrid civilizations={civilizationPool} bannedCivs={bannedCivs} pickedCivs={pickedCivs} onSelect={handleSelection} disabled={!isMyTurn} action={(draft.current_phase || "").includes("ban") ? "ban" : "pick"} />
                  )}
                </div>
             </div>
          </div>

          <PlayerPanel profile={guestProfile} role="guest" isCurrentTurn={draft.current_turn === lobby.guest_id} civBans={draft.guest_civ_bans || []} civPicks={draft.guest_civ_picks || []} mapBans={draft.guest_map_bans || []} mapPicks={draft.guest_map_picks || []} />
        </div>
      </main>

      <DraftChat 
        draftId={draft.id}
        userId={userId}
        username={isHost ? hostProfile?.username || "Host" : guestProfile?.username || "Guest"}
        avatarUrl={isHost ? hostProfile?.avatar_url : guestProfile?.avatar_url}
        isDemo={isDemo}
        isHost={isHost}
        isParticipant={true}
      />
    </div>
  )
}
