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
import { GameModeRoll } from "./game-mode-roll"
import { DraftComplete } from "./draft-complete"
import { DraftChat } from "./draft-chat"
import { SpectatorPanel } from "./spectator-panel"
import { CoinFlip } from "./coin-flip"
import { DraftAssistPanel } from "./draft-assist-panel"
import { CIVILIZATIONS } from "@/lib/data/civilizations"
import { MAPS } from "@/lib/data/maps"
import type { Lobby, Draft, Profile, LobbySettings, DraftPhase, MapSelectionMode, Preset } from "@/lib/types/draft"
import { calculateDraftState, processSelection, getNextStep } from "@/lib/draft-engine"
import { isDemoMode } from "@/lib/demo/auth"
import { DEMO_OPPONENT } from "@/lib/demo/auth"
import { addDemoMatchHistoryEntry } from "@/lib/demo/demo-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shuffle, MapPin, Map } from "lucide-react"
import { useDraftNotifications } from "@/hooks/use-draft-notifications"
import type { NotificationSettingsState } from "./notification-settings"
import { areArraysEqual } from "@/lib/utils"

interface DraftInterfaceProps {
  lobby: Lobby
  initialDraft: Draft
  userId: string
  hostProfile: Profile | null
  guestProfile: Profile | null
  isHost: boolean
  preset?: Preset | null
}

export function DraftInterface({
  lobby,
  initialDraft,
  userId,
  hostProfile,
  guestProfile,
  isHost,
  preset,
}: DraftInterfaceProps) {
  const router = useRouter()
  const supabase = createClient()
  const [draft, setDraft] = useState(initialDraft)
  const settings = lobby.settings as LobbySettings
  const isDemo = isDemoMode()

  console.log("DEBUG: DraftInterface Render. Phase:", draft.current_phase, "CoinFlipEnabled:", settings.enable_coin_flip, "Winner:", draft.coin_flip_winner);

  const mapMode: MapSelectionMode = settings.map_mode || settings.map_settings?.mode || "ban_until_one"
  const mapPool = useMemo(() => {
    return settings.map_pool?.length > 0 ? MAPS.filter((m) => settings.map_pool.includes(m.id)) : MAPS
  }, [settings.map_pool]);

  const handleCoinFlipComplete = useCallback(async (winnerId: string) => {
    if (!isHost && !isDemo) return

    const { nextPhase, nextTurn, newTurnNumber } = calculateNextTurn(
      { ...draft, coin_flip_winner: winnerId },
      settings,
      lobby,
      mapPool.length,
      mapMode,
    )

    const updateData = {
      current_phase: nextPhase,
      current_turn: nextTurn,
      turn_number: newTurnNumber,
    }

    if (isDemo) {
      setDraft((prev) => ({ ...prev, ...updateData }))
    } else {
      await supabase.from("drafts").update(updateData).eq("id", draft.id)
    }
  }, [draft, settings, lobby, mapPool.length, mapMode, isDemo, supabase, isHost])

  const saveDemoMatchHistory = useCallback((completedDraft: Draft) => {
    // Construct MatchHistory object
    const hostCiv = completedDraft.host_civ_picks?.[0] || ""
    const guestCiv = completedDraft.guest_civ_picks?.[0] || ""
    const map = completedDraft.final_map || ""
    const gameMode = completedDraft.selected_game_mode || ""

    const newMatchHistoryEntry: MatchHistory = {
      id: `mh-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      created_at: new Date().toISOString(),
      draft_id: completedDraft.id,
      host_id: lobby.host_id,
      guest_id: lobby.guest_id || "", // Ensure guest_id is not null if possible, or handle
      host_civ: hostCiv,
      guest_civ: guestCiv,
      map: map,
      game_mode: gameMode,
    }
    addDemoMatchHistoryEntry(newMatchHistoryEntry)
    console.log("[DraftInterface] Demo Match History Saved:", newMatchHistoryEntry)
  }, [lobby.host_id, lobby.guest_id]);

  const visibility = lobby.visibility || "private"

  const isParticipant = userId === lobby.host_id || userId === lobby.guest_id

  const draftRef = useRef(draft)
  useEffect(() => {
    draftRef.current = draft
  }, [draft])

  // Effect to validate map selections when mapPool changes
  useEffect(() => {
    const validateMapSelections = () => {
      let needsUpdate = false
      const currentDraft = draftRef.current // Use ref to get latest draft without adding it to dependencies
      const updatedDraft = { ...currentDraft }

      // Filter host_map_bans
      const filteredHostMapBans = (currentDraft.host_map_bans || []).filter((mapId) =>
        mapPool.some((map) => map.id === mapId),
      )
      if (!areArraysEqual(filteredHostMapBans, currentDraft.host_map_bans)) {
        updatedDraft.host_map_bans = filteredHostMapBans
        needsUpdate = true
      }

      // Filter guest_map_bans
      const filteredGuestMapBans = (currentDraft.guest_map_bans || []).filter((mapId) =>
        mapPool.some((map) => map.id === mapId),
      )
      if (!areArraysEqual(filteredGuestMapBans, currentDraft.guest_map_bans)) {
        updatedDraft.guest_map_bans = filteredGuestMapBans
        needsUpdate = true
      }

      // Filter host_map_picks
      const filteredHostMapPicks = (currentDraft.host_map_picks || []).filter((mapId) =>
        mapPool.some((map) => map.id === mapId),
      )
      if (!areArraysEqual(filteredHostMapPicks, currentDraft.host_map_picks)) {
        updatedDraft.host_map_picks = filteredHostMapPicks
        needsUpdate = true
      }

      // Filter guest_map_picks
      const filteredGuestMapPicks = (currentDraft.guest_map_picks || []).filter((mapId) =>
        mapPool.some((map) => map.id === mapId),
      )
      if (!areArraysEqual(filteredGuestMapPicks, currentDraft.guest_map_picks)) {
        updatedDraft.guest_map_picks = filteredGuestMapPicks
        needsUpdate = true
      }

      if (needsUpdate) {
        if (isDemo) {
          setDraft(updatedDraft)
        } else {
          // Update Supabase if not in demo mode
          supabase.from("drafts").update(updatedDraft).eq("id", currentDraft.id).then(({ error }) => {
            if (error) console.error("Error updating draft after map pool change:", error)
          })
        }
      }
    }

    validateMapSelections()
  }, [mapPool, isDemo, draft.id, supabase, setDraft])

  const isMyTurn = draft.current_turn === userId

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettingsState>({
    enabled: true,
    soundEnabled: true,
    vibrationEnabled: true,
  })

  const { permission, requestPermission } = useDraftNotifications({
    isMyTurn,
    enabled: notificationSettings.enabled,
    soundEnabled: notificationSettings.soundEnabled,
    vibrationEnabled: notificationSettings.vibrationEnabled,
  })

  const handleNotificationSettingsChange = useCallback((settings: NotificationSettingsState) => {
    setNotificationSettings(settings)
  }, [])

  const getTotalMapBansNeeded = useCallback(() => {
    switch (mapMode) {
      case "ban_until_one":
        return mapPool.length - 1
      case "random_with_bans":
        return (settings.map_bans_per_player || settings.map_settings?.bans_per_player || 2) * 2
      case "random":
      case "home_away":
      case "disabled":
      default:
        return 0
    }
  }, [mapMode, mapPool.length, settings.map_bans_per_player, settings.map_settings?.bans_per_player])

  const totalMapBansNeeded = getTotalMapBansNeeded()

  // Calculate which civs/maps are banned or picked
  const bannedCivs = [...(draft.host_civ_bans || []), ...(draft.guest_civ_bans || [])]
  const pickedCivs = [...(draft.host_civ_picks || []), ...(draft.guest_civ_picks || [])]
  const bannedMaps = [...(draft.host_map_bans || []), ...(draft.guest_map_bans || [])]
  const pickedMaps = [...(draft.host_map_picks || []), ...(draft.guest_map_picks || [])]

  // Filter civilizations based on pool setting
  const availableCivs = CIVILIZATIONS.filter((civ) => {
    if (settings.civ_pool === "base") return civ.expansion === "base"
    if (settings.civ_pool === "dlc") return civ.expansion !== "base"
    if (settings.civ_pool === "custom" && settings.custom_civ_pool) {
      return settings.custom_civ_pool.includes(civ.id)
    }
    return true
  })

  const remainingMaps = mapPool.filter((m) => !bannedMaps.includes(m.id))
  const finalMap = remainingMaps.length === 1 ? remainingMaps[0] : null

  const [randomSelectedMap, setRandomSelectedMap] = useState<string | null>(null)
  const [isRollingMap, setIsRollingMap] = useState(false)

  const allowSameHomeMap = settings.allow_same_home_map ?? settings.map_settings?.allow_same_home_map ?? false

  const totalCivBansNeeded = (settings.enable_civ_bans !== false ? settings.civ_bans : 0) * 2
  const currentCivBans = bannedCivs.length

  const getRemainingBansInfo = useCallback(() => {
    const currentMapBans = bannedMaps.length
    const remaining = totalMapBansNeeded - currentMapBans
    return {
      current: currentMapBans,
      total: totalMapBansNeeded,
      remaining: Math.max(0, remaining),
      mapsLeft: remainingMaps.length,
    }
  }, [bannedMaps.length, totalMapBansNeeded, remainingMaps.length])

  const bansInfo = getRemainingBansInfo()

  const getPhaseInfo = useCallback(
    (currentDraft: Draft) => {
      // PRESET LOGIC SUPPORT
      if (preset) {
        const step = getNextStep(preset, currentDraft.current_step_index)
        if (!step) {
          return {
            title: "Draft Completado",
            subtitle: "¡Buena suerte!",
            action: "done",
            type: "complete",
          }
        }
        return {
          title: step.phase,
          subtitle: `Paso ${currentDraft.current_step_index + 1}/${preset.steps.length}`,
          action: step.action,
          type: step.target === "mode" ? "mode" : step.target,
        }
      }

      const phase = currentDraft.current_phase
      const hostBans = currentDraft.host_civ_bans?.length || 0
      const guestBans = currentDraft.guest_civ_bans?.length || 0
      const totalBansCompleted = hostBans + guestBans
      const totalCivBansNeeded = (settings.enable_civ_bans !== false ? settings.civ_bans : 0) * 2

      if (phase === "map_ban") {
        const hostMapBans = currentDraft.host_map_bans?.length || 0
        const guestMapBans = currentDraft.guest_map_bans?.length || 0
        const totalMapBans = hostMapBans + guestMapBans
        const mapsRemaining = mapPool.length - totalMapBans

        return {
          title: t("mapBanning"),
          subtitle: t("banCount", { current: totalMapBans + 1, total: totalMapBansNeeded }),
          action: "ban",
          type: "map",
        }
      }
      if (phase === "map_pick") {
        const hostPicks = currentDraft.host_map_picks?.length || 0
        const guestPicks = currentDraft.guest_map_picks?.length || 0
        const totalPicks = hostPicks + guestPicks
        return {
          title: t("mapPicking"),
          subtitle: t("pickCount", { current: totalPicks + 1, total: 2 }),
          action: "pick",
          type: "map",
        }
      }
      if (phase === "map_random") {
        return {
          title: t("mapRolling"),
          subtitle: t("loading"),
          action: "roll",
          type: "map_random",
        }
      }
      if (phase === "civ_ban") {
        return {
          title: t("civBanning"),
          subtitle: t("banCount", { current: Math.min(totalBansCompleted + 1, totalCivBansNeeded), total: totalCivBansNeeded }),
          action: "ban",
          type: "civ",
        }
      }
      if (phase === "civ_pick") {
        const hostPicks = currentDraft.host_civ_picks?.length || 0
        const guestPicks = currentDraft.guest_civ_picks?.length || 0
        const totalPicks = hostPicks + guestPicks
        return {
          title: t("civPicking"),
          subtitle: t("pickCount", { current: totalPicks + 1, total: 2 }),
          action: "pick",
          type: "civ",
        }
      }
      if (phase === "mode_roll") {
        return {
          title: t("gameModeRoulette"),
          subtitle: t("loading"),
          action: "roll",
          type: "mode",
        }
      }
      if (phase === "coin_flip") {
        return {
          title: t("pickPriority"),
          subtitle: t("determiningOrder"),
          action: "flip",
          type: "coin_flip",
        }
      }
      return {
        title: t("draftCompleted"),
        subtitle: t("fairPlay"),
        action: "done",
        type: "complete",
      }
    },
    [settings, mapPool.length, totalMapBansNeeded, mapMode, preset],
  )

  const handleMapRandomRoll = useCallback(() => {
    setIsRollingMap(true)
    const availableMaps = remainingMaps.length > 0 ? remainingMaps : mapPool

    let rollCount = 0
    const maxRolls = 20
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * availableMaps.length)
      setRandomSelectedMap(availableMaps[randomIndex].id)
      rollCount++

      if (rollCount >= maxRolls) {
        clearInterval(interval)
        const finalIndex = Math.floor(Math.random() * availableMaps.length)
        const finalMapId = availableMaps[finalIndex].id
        setRandomSelectedMap(finalMapId)
        setIsRollingMap(false)

        setTimeout(() => {
          setDraft((d) => {
            let nextPhase: DraftPhase = "completed"
            let nextTurn: string | null = null

            if (settings.enable_civ_bans !== false && settings.civ_bans > 0) {
              nextPhase = "civ_ban"
              nextTurn = lobby.host_id
            } else if (settings.enable_civ_picks !== false) {
              nextPhase = "civ_pick"
              nextTurn = lobby.guest_id
            } else if (settings.enable_game_mode_roll !== false && settings.game_modes?.length > 0) {
              nextPhase = "mode_roll"
              nextTurn = null
            }

            return {
              ...d,
              host_map_picks: [finalMapId],
              final_map: finalMapId,
              current_phase: nextPhase,
              current_turn: nextTurn,
            }
          })
        }, 1500)
      }
    }, 100)
  }, [remainingMaps, mapPool, settings, lobby.host_id, lobby.guest_id])

  const handleDemoSelection = useCallback(
    (id: string, currentDraftState: Draft) => {
      const phaseInfo = getPhaseInfo(currentDraftState)
      const currentPlayerIsHost = currentDraftState.current_turn === lobby.host_id
      const updateData: Partial<Draft> = {}

      if (phaseInfo.type === "civ" && phaseInfo.action === "ban") {
        const key = currentPlayerIsHost ? "host_civ_bans" : "guest_civ_bans"
        const currentBans = currentDraftState[key] || []
        const maxBans = settings.enable_civ_bans !== false ? settings.civ_bans : 0
        if (currentBans.length >= maxBans) return null
        updateData[key] = [...currentBans, id]
      } else if (phaseInfo.type === "civ" && phaseInfo.action === "pick") {
        const key = currentPlayerIsHost ? "host_civ_picks" : "guest_civ_picks"
        const currentPicks = currentDraftState[key] || []
        if (currentPicks.length >= settings.civ_picks) return null
        updateData[key] = [...currentPicks, id]
      } else if (phaseInfo.type === "map" && phaseInfo.action === "ban") {
        const key = currentPlayerIsHost ? "host_map_bans" : "guest_map_bans"
        const currentBans = currentDraftState[key] || []
        const allMapBans = [...(currentDraftState.host_map_bans || []), ...(currentDraftState.guest_map_bans || [])]
          .length
        if (allMapBans >= totalMapBansNeeded) return null
        updateData[key] = [...currentBans, id]
      } else if (phaseInfo.type === "map" && phaseInfo.action === "pick") {
        const key = currentPlayerIsHost ? "host_map_picks" : "guest_map_picks"
        const currentPicks = currentDraftState[key] || []
        if (currentPicks.length >= 1) return null
        updateData[key] = [...currentPicks, id]
      }

      const mergedDraft = { ...currentDraftState, ...updateData }
      const { nextPhase, nextTurn, newTurnNumber } = calculateNextTurn(
        mergedDraft,
        settings,
        lobby,
        mapPool.length,
        mapMode,
      )

      const newDraft: Draft = {
        ...currentDraftState,
        ...updateData,
        current_phase: nextPhase,
        current_turn: nextTurn,
        turn_number: newTurnNumber,
        phase_end_time: new Date(
          Date.now() + (nextPhase.includes("ban") ? settings.ban_time : settings.pick_time) * 1000,
        ).toISOString(),
      }

      return newDraft
    },
    [getPhaseInfo, settings, lobby, mapPool.length, totalMapBansNeeded, mapMode, allowSameHomeMap],
  )

  const simulateOpponentTurn = useCallback(
    (currentDraft: Draft) => {
      const phase = currentDraft.current_phase
      let selection: string | null = null

      if (phase === "map_ban") {
        const allBanned = [...(currentDraft.host_map_bans || []), ...(currentDraft.guest_map_bans || [])]
        const available = mapPool.filter((m) => !allBanned.includes(m.id))
        if (mapMode === "ban_until_one" && available.length <= 1) {
          // Skip
        } else if (available.length > 0) {
          selection = available[Math.floor(Math.random() * available.length)].id
        }
      } else if (phase === "map_pick") {
        const allPicked = [...(currentDraft.host_map_picks || []), ...(currentDraft.guest_map_picks || [])]
        let available = mapPool.filter((m) => !allPicked.includes(m.id))
        if (!allowSameHomeMap) {
          const hostPicks = currentDraft.host_map_picks || []
          available = available.filter((m) => !hostPicks.includes(m.id))
        }
        if (available.length > 0) {
          selection = available[Math.floor(Math.random() * available.length)].id
        }
      } else if (phase === "civ_ban" || phase === "civ_pick") {
        const allBanned = [...(currentDraft.host_civ_bans || []), ...(currentDraft.guest_civ_bans || [])]
        const allPicked = [...(currentDraft.host_civ_picks || []), ...(currentDraft.guest_civ_picks || [])]
        const available = availableCivs.filter((c) => !allBanned.includes(c.id) && !allPicked.includes(c.id))
        if (available.length > 0) {
          selection = available[Math.floor(Math.random() * available.length)].id
        }
      }

      if (!selection) {
        const { nextPhase, nextTurn, newTurnNumber } = calculateNextTurn(
          currentDraft,
          settings,
          lobby,
          mapPool.length,
          mapMode,
        )
        if (nextPhase !== currentDraft.current_phase) {
          const newDraft: Draft = {
            ...currentDraft,
            current_phase: nextPhase,
            current_turn: nextTurn,
            turn_number: newTurnNumber,
          }

          if (nextPhase === "map_random") {
            setDraft(newDraft)
            return
          }

          if (nextPhase === "mode_roll") {
            const randomMode = settings.game_modes[Math.floor(Math.random() * settings.game_modes.length)]
            const completedDemoDraft = { ...newDraft, selected_game_mode: randomMode, current_phase: "completed" };
            saveDemoMatchHistory(completedDemoDraft); // Save before setting to completed
            setDraft((d) => ({ ...d, selected_game_mode: randomMode })) // Set mode first
            setTimeout(() => {
              setDraft((d) => ({ ...d, current_phase: "completed" })) // Then set phase
            }, 3000)
            return
          }

          setDraft(newDraft)
        }
        return
      }

      const newDraft = handleDemoSelection(selection, currentDraft)
      if (!newDraft) return

      if (newDraft.current_phase === "map_random") {
        setDraft(newDraft)
        return
      }

      if (newDraft.current_turn === DEMO_OPPONENT.id && newDraft.current_phase !== "completed" && newDraft.current_phase !== "mode_roll" && newDraft.current_phase !== "map_random") {
        setDraft(newDraft)
        // The opponent's turn will now be handled by a separate useEffect
      } else if (newDraft.current_phase === "mode_roll") {
        const randomMode = settings.game_modes[Math.floor(Math.random() * settings.game_modes.length)]
        const finalDraft = { ...newDraft, selected_game_mode: randomMode }
        setDraft(finalDraft)
        setTimeout(() => {
          setDraft((d) => ({ ...d, current_phase: "completed" }))
        }, 3000)
      } else {
        setDraft(newDraft)
      }
    },
    [handleDemoSelection, availableCivs, settings, mapPool, mapMode, lobby, allowSameHomeMap],
  )

  useEffect(() => {
    if (isDemo && draftRef.current.current_turn === DEMO_OPPONENT.id && draftRef.current.current_phase !== "completed" && draftRef.current.current_phase !== "mode_roll" && draftRef.current.current_phase !== "map_random") {
      const timer = setTimeout(() => {
        simulateOpponentTurn(draftRef.current) // Pass the latest draft state
      }, 1500) // Simulate a slight delay for opponent's "thinking"
      return () => clearTimeout(timer)
    }
  }, [isDemo, draft.current_turn, draft.current_phase, simulateOpponentTurn, draftRef])

  useEffect(() => {
    if (draft.current_phase === "map_random" && !isRollingMap && !randomSelectedMap) {
      handleMapRandomRoll()
    }
  }, [draft.current_phase, isRollingMap, randomSelectedMap, handleMapRandomRoll])

  const handleSelection = async (id: string) => {
    if (
      !isMyTurn ||
      draft.current_phase === "completed" ||
      draft.current_phase === "mode_roll" ||
      draft.current_phase === "map_random"
    ) {
      return
    }

    if (isDemo) {
      const newDraft = handleDemoSelection(id, draft)
      if (!newDraft) return

      if (newDraft.current_phase === "map_random") {
        setDraft(newDraft)
        return
      }

      if (newDraft.current_turn === DEMO_OPPONENT.id &&
        newDraft.current_phase !== "completed" &&
        newDraft.current_phase !== "mode_roll" &&
        newDraft.current_phase !== "map_random"
      ) {
        setDraft(newDraft)
        setTimeout(() => {
          simulateOpponentTurn(newDraft)
        }, 1500)
      } else if (newDraft.current_phase === "mode_roll") {
        const randomMode = settings.game_modes[Math.floor(Math.random() * settings.game_modes.length)]
        const completedDemoDraft = { ...newDraft, selected_game_mode: randomMode, current_phase: "completed" };
        saveDemoMatchHistory(completedDemoDraft); // Save before setting to completed
        setDraft({ ...newDraft, selected_game_mode: randomMode }); // Set mode first
        setTimeout(() => {
          setDraft((d) => ({ ...d, current_phase: "completed" })) // Then set phase
        }, 3000)
      } else {
        setDraft(newDraft)
      }
      return
    }

    const phaseInfo = getPhaseInfo(draft)
    
    // PRESET LOGIC SUPPORT
    if (preset) {
      const updateData = processSelection(draft, lobby, preset, id)
      if (!updateData) return

      // Optimistic update
      setDraft((prev) => ({ ...prev, ...updateData }))
      
      if (!isDemo) {
         await supabase.from("drafts").update(updateData).eq("id", draft.id)
      }
      return
    }

    const updateData: Partial<Draft> = {}

    if (phaseInfo.type === "civ" && phaseInfo.action === "ban") {
      const key = isHost ? "host_civ_bans" : "guest_civ_bans"
      const currentBans = draft[key] || []
      const maxBans = settings.enable_civ_bans !== false ? settings.civ_bans : 0
      if (currentBans.length >= maxBans) return
      updateData[key] = [...currentBans, id]
    } else if (phaseInfo.type === "civ" && phaseInfo.action === "pick") {
      const key = isHost ? "host_civ_picks" : "guest_civ_picks"
      const currentPicks = draft[key] || []
      if (currentPicks.length >= settings.civ_picks) return
      updateData[key] = [...currentPicks, id]
    } else if (phaseInfo.type === "map" && phaseInfo.action === "ban") {
      const key = isHost ? "host_map_bans" : "guest_map_bans"
      const currentBans = draft[key] || []
      const allMapBans = [...(draft.host_map_bans || []), ...(draft.guest_map_bans || [])].length
      if (allMapBans >= totalMapBansNeeded) return
      updateData[key] = [...currentBans, id]
    } else if (phaseInfo.type === "map" && phaseInfo.action === "pick") {
      const key = isHost ? "host_map_picks" : "guest_map_picks"
      const currentPicks = draft[key] || []
      if (currentPicks.length >= 1) return
      updateData[key] = [...currentPicks, id]
    }

    const mergedDraft = { ...draft, ...updateData }
    const { nextPhase, nextTurn, newTurnNumber } = calculateNextTurn(
      mergedDraft,
      settings,
      lobby,
      mapPool.length,
      mapMode,
    )

    updateData.current_phase = nextPhase
    updateData.current_turn = nextTurn
    updateData.turn_number = newTurnNumber

    const timerDuration = nextPhase.includes("ban") ? settings.ban_time : settings.pick_time
    updateData.phase_end_time = new Date(Date.now() + timerDuration * 1000).toISOString()

    // If map banning phase just ended and only one map remains, set final_map
    console.log("DINT: handleSelection - Map Finalization Check. mapMode:", mapMode, "draft.current_phase:", draft.current_phase, "nextPhase:", nextPhase);
    if (mapMode === "ban_until_one" && draft.current_phase === "map_ban" && nextPhase !== "map_ban") {
        const remainingMapsAfterBans = mapPool.filter((m) => !bannedMaps.includes(m.id));
        console.log("DINT: handleSelection - Ban until one phase end. Remaining maps:", remainingMapsAfterBans);
        if (remainingMapsAfterBans.length === 1) {
            updateData.final_map = remainingMapsAfterBans[0].id;
            console.log("DINT: handleSelection - updateData.final_map SET to:", updateData.final_map);
        }
    }

    if (nextPhase === "mode_roll") {
      const randomMode = settings.game_modes[Math.floor(Math.random() * settings.game_modes.length)]
      updateData.selected_game_mode = randomMode
      updateData.phase_end_time = null

      setTimeout(async () => {
        await supabase.from("drafts").update({ current_phase: "completed" }).eq("id", draft.id)
      }, 3000)
    }

    console.log("DINT: handleSelection - Final updateData before persist:", updateData);
    await supabase.from("drafts").update(updateData).eq("id", draft.id)
  }

  useEffect(() => {
    if (isDemo) return

    const channel = supabase
      .channel(`draft-updates-${draft.id}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "drafts", filter: `id=eq.${draft.id}` },
        (payload) => {
          setDraft(payload.new as Draft)
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [draft.id, supabase, isDemo])

  const phaseInfo = getPhaseInfo(draft)

  const getFinalMapId = () => {
    if (mapMode === "random" || mapMode === "random_with_bans") {
      return randomSelectedMap || (draft.host_map_picks?.[0] ?? null)
    }
    if (mapMode === "ban_until_one") {
      return finalMap?.id || null
    }
    return null
  }

  if (draft.current_phase === "completed") {
    return (
      <DraftComplete
        draft={draft}
        lobby={lobby}
        hostProfile={hostProfile}
        guestProfile={guestProfile}
        isHost={isHost}
        finalMap={getFinalMapId()}
        mapMode={mapMode}
      />
    )
  }

  if (draft.current_phase === "coin_flip") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <DraftHeader
          phase="Lanzamiento de Moneda"
          subtitle="Decidiendo quién empieza"
          isMyTurn={isMyTurn}
          currentTurnName={draft.current_turn === lobby.host_id ? hostProfile?.username : guestProfile?.username}
          draftId={draft.id}
          visibility={visibility}
          finalMapId={null}
          onNotificationSettingsChange={handleNotificationSettingsChange}
          notificationPermissionGranted={permission.granted}
          onRequestNotificationPermission={requestPermission}
        />
        <main className="flex-1 flex items-center justify-center p-4">
          <CoinFlip
            hostName={hostProfile?.username || "Host"}
            guestName={guestProfile?.username || "Guest"}
            hostId={lobby.host_id}
            guestId={lobby.guest_id || ""}
            winnerId={draft.coin_flip_winner}
            isHost={isHost}
            onCoinFlipComplete={handleCoinFlipComplete}
          />
        </main>
        <DraftChat
          draftId={draft.id}
          userId={userId}
          username={isHost ? hostProfile?.username || "Host" : guestProfile?.username || "Guest"}
          avatarUrl={isHost ? hostProfile?.avatar_url : guestProfile?.avatar_url}
          isDemo={isDemo}
          isHost={isHost}
          isParticipant={isParticipant}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {console.log("DINT: Rendering DraftHeader. draft.final_map:", draft.final_map, "finalMapId prop:", draft.final_map)}
      <DraftHeader
        phase={phaseInfo.title}
        subtitle={phaseInfo.subtitle}
        isMyTurn={isMyTurn}
        currentTurnName={draft.current_turn === lobby.host_id ? hostProfile?.username : guestProfile?.username}
        draftId={draft.id}
        visibility={visibility}
        finalMapId={draft.final_map}
        onNotificationSettingsChange={handleNotificationSettingsChange}
        notificationPermissionGranted={permission.granted}
        onRequestNotificationPermission={requestPermission}
      />

      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-6">
          <DraftProgress
            currentPhase={draft.current_phase}
            mapMode={mapMode}
            totalMapBans={totalMapBansNeeded}
            currentMapBans={bannedMaps.length}
            remainingMaps={remainingMaps.length}
            totalCivBans={totalCivBansNeeded}
            currentCivBans={currentCivBans}
            civBansEnabled={settings.enable_civ_bans !== false && settings.civ_bans > 0}
            civPicksEnabled={settings.enable_civ_picks !== false}
            gameModeEnabled={settings.enable_game_mode_roll !== false && settings.game_modes?.length > 0}
          />
        </div>

        <div className="mb-6 flex justify-center">
          <DraftTimer
            endTime={draft.phase_end_time}
            isMyTurn={isMyTurn}
            onExpire={() => {
              if (isMyTurn) {
                if (phaseInfo.type === "civ") {
                  const available = availableCivs.filter(
                    (c) => !bannedCivs.includes(c.id) && !pickedCivs.includes(c.id),
                  )
                  if (available.length > 0) {
                    handleSelection(available[Math.floor(Math.random() * available.length)].id)
                  }
                } else if (phaseInfo.type === "map") {
                  const available = mapPool.filter((m) => !bannedMaps.includes(m.id) && !pickedMaps.includes(m.id))
                  if (available.length > 0) {
                    handleSelection(available[Math.floor(Math.random() * available.length)].id)
                  }
                }
              }
            }}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[200px_1fr_200px]">
          <PlayerPanel
            profile={hostProfile}
            role="host"
            isCurrentTurn={draft.current_turn === lobby.host_id}
            civBans={draft.host_civ_bans || []}
            civPicks={draft.host_civ_picks || []}
            mapBans={draft.host_map_bans || []}
            mapPicks={draft.host_map_picks || []}
          />

          <div className="space-y-6">
            {/* Map phases */}
            {phaseInfo.type === "map" && phaseInfo.action === "ban" && (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5">
                    <Map className="h-4 w-4" />
                    <span>Mapas restantes: {bansInfo.mapsLeft}</span>
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1.5">
                    Bans: {bansInfo.current} / {bansInfo.total}
                  </Badge>
                </div>
                <MapGrid
                  maps={mapPool}
                  bannedMaps={bannedMaps}
                  pickedMaps={pickedMaps}
                  onSelect={handleSelection}
                  disabled={!isMyTurn}
                  action="ban"
                />
                {mapMode === "ban_until_one" && remainingMaps.length === 1 && (
                  <div className="rounded-lg border border-primary/50 bg-primary/10 p-4 text-center">
                    <p className="text-lg font-semibold text-primary">Mapa Final: {remainingMaps[0].name}</p>
                  </div>
                )}
              </div>
            )}

            {phaseInfo.type === "map" && phaseInfo.action === "pick" && (
              <div className="space-y-4">
                <div className="rounded-lg border border-blue-500/50 bg-blue-500/10 p-4 text-center">
                  <MapPin className="mx-auto h-6 w-6 text-blue-500 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {isMyTurn
                      ? "Elige tu Home Map - el mapa donde jugarás como local"
                      : `${draft.current_turn === lobby.host_id ? hostProfile?.username : guestProfile?.username} está eligiendo su Home Map`}
                  </p>
                </div>
                <MapGrid
                  maps={mapPool}
                  bannedMaps={bannedMaps}
                  pickedMaps={pickedMaps}
                  onSelect={handleSelection}
                  disabled={!isMyTurn}
                  action="pick"
                  disabledMaps={!allowSameHomeMap ? pickedMaps : []}
                />
              </div>
            )}

            {draft.current_phase === "map_random" && (
              <Card className="mx-auto max-w-md">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Shuffle className={`h-5 w-5 ${isRollingMap ? "animate-spin" : ""}`} />
                    Sorteo de Mapa
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  {randomSelectedMap && (
                    <div className={`text-2xl font-bold ${isRollingMap ? "animate-pulse" : "text-primary"}`}>
                      {MAPS.find((m) => m.id === randomSelectedMap)?.name || randomSelectedMap}
                    </div>
                  )}
                  {!isRollingMap && randomSelectedMap && (
                    <p className="mt-2 text-sm text-muted-foreground">¡Mapa seleccionado!</p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Civ phases */}
            {(phaseInfo.type === "civ" || draft.current_phase === "civ_ban" || draft.current_phase === "civ_pick") &&
              draft.current_phase !== "map_ban" &&
              draft.current_phase !== "map_pick" &&
              draft.current_phase !== "map_random" && (
                <div className="space-y-4">
                  {isParticipant && (
                    <DraftAssistPanel
                      currentPhase={draft.current_phase}
                      currentMap={draft.final_map || null}
                      opponentCivs={isHost ? draft.guest_civ_picks || [] : draft.host_civ_picks || []}
                      ownCivs={isHost ? draft.host_civ_picks || [] : draft.guest_civ_picks || []}
                      bannedCivs={bannedCivs}
                      isMyTurn={isMyTurn}
                      onSuggestionClick={handleSelection}
                    />
                  )}
                  <CivilizationGrid
                    civilizations={availableCivs}
                    bannedCivs={bannedCivs}
                    pickedCivs={pickedCivs}
                    onSelect={handleSelection}
                    disabled={!isMyTurn || phaseInfo.type !== "civ"}
                    action={phaseInfo.action as "ban" | "pick"}
                  />
                </div>
              )}

            {draft.current_phase === "mode_roll" && (
              <GameModeRoll selectedMode={draft.selected_game_mode} gameModes={settings.game_modes} />
            )}

            {/* Spectator Panel - only show for spectators */}
            {!isParticipant && (
              <SpectatorPanel
                draft={draft}
                currentPhase={draft.current_phase}
                turnNumber={draft.turn_number}
                isParticipant={isParticipant}
                isDemo={isDemo}
                availableCivs={availableCivs}
                bannedCivs={bannedCivs}
                pickedCivs={pickedCivs}
              />
            )}
          </div>

          <PlayerPanel
            profile={guestProfile}
            role="guest"
            isCurrentTurn={draft.current_turn === lobby.guest_id}
            civBans={draft.guest_civ_bans || []}
            civPicks={draft.guest_civ_picks || []}
            mapBans={draft.guest_map_bans || []}
            mapPicks={draft.guest_map_picks || []}
          />
        </div>
      </main>

      {/* Draft Chat */}
      <DraftChat
        draftId={draft.id}
        userId={userId}
        username={isHost ? hostProfile?.username || "Host" : guestProfile?.username || "Guest"}
        avatarUrl={isHost ? hostProfile?.avatar_url : guestProfile?.avatar_url}
        isDemo={isDemo}
        isHost={isHost}
        isParticipant={isParticipant}
      />
    </div>
  )
}

function calculateNextTurn(
  draft: Draft,
  settings: LobbySettings,
  lobby: Lobby,
  mapPoolSize: number,
  mapMode: MapSelectionMode,
): { nextPhase: DraftPhase; nextTurn: string | null; newTurnNumber: number } {
  const hostCivBans = draft.host_civ_bans?.length || 0
  const guestCivBans = draft.guest_civ_bans?.length || 0
  const hostCivPicks = draft.host_civ_picks?.length || 0
  const guestCivPicks = draft.guest_civ_picks?.length || 0
  const hostMapBans = draft.host_map_bans?.length || 0
  const guestMapBans = draft.guest_map_bans?.length || 0
  const hostMapPicks = draft.host_map_picks?.length || 0
  const guestMapPicks = draft.guest_map_picks?.length || 0

  const civBansEnabled = settings.enable_civ_bans !== false && settings.civ_bans > 0
  const civPicksEnabled = settings.enable_civ_picks !== false
  const gameModeRollEnabled = settings.enable_game_mode_roll !== false

  const totalCivBansNeeded = civBansEnabled ? settings.civ_bans * 2 : 0
  const totalCivPicksNeeded = civPicksEnabled ? 2 : 0

  const currentCivBans = hostCivBans + guestCivBans
  const currentCivPicks = hostCivPicks + guestCivPicks
  const currentMapBans = hostMapBans + guestMapBans
  const currentMapPicks = hostMapPicks + guestMapPicks

  const newTurnNumber = currentCivBans + currentCivPicks + currentMapBans + currentMapPicks

  // Determine picker order based on coin flip
  const firstPickerId = draft.coin_flip_winner || lobby.host_id
  const secondPickerId = firstPickerId === lobby.host_id ? lobby.guest_id : lobby.host_id

  // COIN FLIP PHASE
  if (settings.enable_coin_flip && !draft.coin_flip_winner) {
    return { nextPhase: "coin_flip", nextTurn: lobby.host_id, newTurnNumber: 0 }
  }

  // MAP PHASE FIRST
  if (mapMode !== "disabled") {
    if (mapMode === "ban_until_one") {
      const totalMapBansNeeded = mapPoolSize - 1
      if (currentMapBans < totalMapBansNeeded) {
        const nextTurn = currentMapBans % 2 === 0 ? firstPickerId : secondPickerId
        return { nextPhase: "map_ban", nextTurn, newTurnNumber }
      }
    } else if (mapMode === "random_with_bans") {
      const bansPerPlayer = settings.map_bans_per_player || settings.map_settings?.bans_per_player || 2
      const totalMapBansNeeded = bansPerPlayer * 2
      if (currentMapBans < totalMapBansNeeded) {
        const nextTurn = currentMapBans % 2 === 0 ? firstPickerId : secondPickerId
        return { nextPhase: "map_ban", nextTurn, newTurnNumber }
      }
      if (currentMapPicks === 0 && !draft.final_map) {
        return { nextPhase: "map_random", nextTurn: null, newTurnNumber }
      }
    } else if (mapMode === "random") {
      if (currentMapPicks === 0 && !draft.final_map) {
        return { nextPhase: "map_random", nextTurn: null, newTurnNumber }
      }
    } else if (mapMode === "home_away") {
      if (currentMapPicks < 2) {
        const nextTurn = currentMapPicks === 0 ? firstPickerId : secondPickerId
        return { nextPhase: "map_pick", nextTurn, newTurnNumber }
      }
    }
  }

  // CIV BAN PHASE
  if (civBansEnabled && currentCivBans < totalCivBansNeeded) {
    const nextTurn = currentCivBans % 2 === 0 ? firstPickerId : secondPickerId
    return { nextPhase: "civ_ban", nextTurn, newTurnNumber }
  }

  // CIV PICK PHASE
  if (civPicksEnabled && currentCivPicks < totalCivPicksNeeded) {
    // In many draft formats, the second picker starts the picking phase if they banned last, 
    // but here we'll follow the coin flip winner starting the pick phase for consistency unless otherwise specified.
    const nextTurn = currentCivPicks === 0 ? firstPickerId : secondPickerId
    return { nextPhase: "civ_pick", nextTurn, newTurnNumber }
  }

  // Mode roll or completed
  if (gameModeRollEnabled && settings.game_modes?.length > 0) {
    return { nextPhase: "mode_roll", nextTurn: null, newTurnNumber }
  }

  return { nextPhase: "completed", nextTurn: null, newTurnNumber }
}
