import { Draft, Lobby, Preset, DraftStep, DraftActionType, DraftTarget } from "./types/draft";

/**
 * Retrieves the next step from the preset based on the current index.
 */
export function getNextStep(preset: Preset, currentIndex: number): DraftStep | null {
  if (!preset || !preset.steps || currentIndex >= preset.steps.length) {
    return null;
  }
  return preset.steps[currentIndex];
}

/**
 * Calculates the next state of the draft based on the preset and current progress.
 * Returns the next turn (user ID), phase name, and the step object.
 */
export function calculateDraftState(
  draft: Draft,
  lobby: Lobby,
  preset: Preset
): {
  nextPhase: string;
  nextTurn: string | null;
  nextStep: DraftStep | null;
  isComplete: boolean;
} {
  const currentStep = getNextStep(preset, draft.current_step_index);

  if (!currentStep) {
    return {
      nextPhase: "completed",
      nextTurn: null,
      nextStep: null,
      isComplete: true,
    };
  }

  // Determine who acts
  let turnUserId: string | null = null;
  
  // Logic to resolve 'host' | 'guest' | 'winner' | 'loser'
  // For MVP we handle host/guest. Coin flip support can be added later.
  switch (currentStep.actor) {
    case "host":
      turnUserId = lobby.host_id;
      break;
    case "guest":
      turnUserId = lobby.guest_id;
      break;
    case "system":
      turnUserId = null; // System actions (e.g. reveal) are automatic or triggered by server
      break;
    case "winner":
        // Fallback to host if coin flip not implemented
        turnUserId = draft.coin_flip_winner || lobby.host_id;
        break;
    case "loser":
        // Fallback to guest if coin flip not implemented
        turnUserId = draft.coin_flip_winner === lobby.host_id ? lobby.guest_id : lobby.host_id;
        if (!draft.coin_flip_winner) turnUserId = lobby.guest_id; 
        break;
  }

  return {
    nextPhase: currentStep.phase,
    nextTurn: turnUserId,
    nextStep: currentStep,
    isComplete: false,
  };
}

/**
 * Processes a selection (pick/ban) and returns the partial update for the draft.
 * Does NOT update the database.
 */
export function processSelection(
  draft: Draft,
  lobby: Lobby,
  preset: Preset,
  selectionId: string // The ID of the map or civ selected
): Partial<Draft> | null {
  const currentStep = getNextStep(preset, draft.current_step_index);
  if (!currentStep) return null;

  const actor = currentStep.actor;
  // Verify if the action is valid (e.g. checked by caller usually, but good to have)
  
  // Validation: Check if already selected (Global Uniqueness for Civs/Maps in this basic engine)
  const allSelected = [
    ...(draft.host_civ_bans || []),
    ...(draft.guest_civ_bans || []),
    ...(draft.host_civ_picks || []),
    ...(draft.guest_civ_picks || []),
    ...(draft.host_map_bans || []),
    ...(draft.guest_map_bans || []),
    ...(draft.host_map_picks || []),
    ...(draft.guest_map_picks || []),
  ];

  if (allSelected.includes(selectionId)) {
    return null;
  }

  // Map the abstract step to concrete database fields
  // This maintains backward compatibility with the existing schema
  const update: Partial<Draft> = {};
  
  // Helper to determine the key name in the draft object
  // e.g. 'host_civ_bans'
  let rolePrefix = "";
  if (actor === "host") rolePrefix = "host";
  else if (actor === "guest") rolePrefix = "guest";
  else if (actor === "winner") rolePrefix = draft.coin_flip_winner === lobby.host_id ? "host" : "guest";
  else if (actor === "loser") rolePrefix = draft.coin_flip_winner === lobby.host_id ? "guest" : "host";

  // Handle standard bans/picks
  if (currentStep.action === "ban" || currentStep.action === "pick") {
      const typeSuffix = currentStep.target === "civ" ? "civ" : "map";
      const actionSuffix = currentStep.action === "ban" ? "bans" : "picks";
      
      const key = `${rolePrefix}_${typeSuffix}_${actionSuffix}` as keyof Draft;
      
      // Ensure we are appending to an array
      const currentList = (draft[key] as string[]) || [];
      
      // Logic: If the step requires N selections, we might stay on this step?
      // For now, the Preset definition assumes 1 step = 1 atomic action (count: 1).
      // If count > 1, the UI should probably handle multiple selections before submitting, 
      // OR we break it down into multiple steps in the preset JSON (e.g. Ban 1, Ban 2).
      // The "Standard" preset I wrote has individual steps for each ban.
      
      update[key] = [...currentList, selectionId] as any;
  }
  
  // Special Case: Map Finalization
  // If we are banning maps and only 1 remains, we might want to auto-set final_map.
  // But that logic is complex to generalize. Let's stick to the preset steps.
  // If the preset has a specific "Pick Home Map" step, it fills `host_map_picks`.
  
  // Move to next step
  update.current_step_index = draft.current_step_index + 1;
  update.turn_number = (draft.turn_number || 0) + 1;

  // Calculate next state (phase, turn) for the update
  const nextState = calculateDraftState(
      { ...draft, ...update } as Draft, // speculative draft
      lobby,
      preset
  );

  update.current_phase = nextState.nextPhase as any;
  update.current_turn = nextState.nextTurn;

  return update;
}

/**
 * Handles a timeout by randomly selecting an available option.
 */
export function handleTimeout(
  draft: Draft,
  lobby: Lobby,
  preset: Preset
): Partial<Draft> | null {
  const currentStep = getNextStep(preset, draft.current_step_index);
  if (!currentStep) return null;

  let pool: string[] = [];

  if (currentStep.target === 'civ') {
      if (lobby.settings.civ_pool === 'custom' && lobby.settings.custom_civ_pool) {
          pool = lobby.settings.custom_civ_pool;
      } else {
          // If 'all' or others, we'd need the full list. 
          // For now, let's fallback to empty or handle gracefully.
          return null; 
      }
  } else if (currentStep.target === 'map') {
      pool = lobby.settings.map_pool;
  }

  // Filter available
  const allSelected = [
    ...(draft.host_civ_bans || []),
    ...(draft.guest_civ_bans || []),
    ...(draft.host_civ_picks || []),
    ...(draft.guest_civ_picks || []),
    ...(draft.host_map_bans || []),
    ...(draft.guest_map_bans || []),
    ...(draft.host_map_picks || []),
    ...(draft.guest_map_picks || []),
  ];

  const available = pool.filter(id => !allSelected.includes(id));

  if (available.length === 0) return null;

  const randomSelection = available[Math.floor(Math.random() * available.length)];

  return processSelection(draft, lobby, preset, randomSelection);
}
