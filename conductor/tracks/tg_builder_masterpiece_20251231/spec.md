# Specification: Battlefield Intelligence Suite (BIS) - Masterpiece V7

This specification defines the most advanced strategic intelligence tool ever created for Age of Empires II, focused on actionable intelligence rather than static data visualization.

## 1. Intelligence Modules
- **The Stacking Engine:** Programmatic calculation of cumulative team bonuses. It simulates how one civ's bonus mathematically multipliers another's unit stats.
- **Transition Auditor:** Predicts the "Obsolescence Point" of a team composition. Identifies exactly when a team must win or pivot to avoid strategic collapse.
- **Synchronized Build Orders:** Generates a unified timeline for 2-4 players, ensuring team-wide power spikes (e.g., synchronized Castle Age timings).
- **Matchup Simulator:** Allows testing the selected team against "Meta Templates" to find tactical advantages and vulnerabilities.

## 2. Advanced Data Usage (Ground-Truth)
- Data from `AOE2_Complete_Database_By_Civilization.pdf` is used as the base layer for an **Inference Engine**.
- The system doesn't just show "Missing Paladin"; it calculates the **Damage Gap** caused by that missing unit in a Post-Imperial fight.

## 3. Revolutionary UX/UI
- **War Table Interface:** A holographic-style tactical board.
- **Decision Trees:** Instead of lists, show strategic paths (e.g., "If Opponent goes X -> Your Team pivots to Y").
- **High-Density Performance:** Fast, reactive, and professional. No gimmicks, only utility.

## 4. Success Criteria
- Provides advice that a pro-player would find "Insightful" or "Non-obvious".
- 100% stable under heavy simulation loads.
- Zero generic descriptions; every insight must be based on the current team's specific math.