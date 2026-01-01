# Production Readiness Audit Log
**Date:** 2025-12-19
**Status:** In Progress / Beta

## 1. Core Architecture & Refactor
- [x] **Database Schema:** Defined `presets` table and `draft_steps` JSON structure.
- [x] **Draft Engine:** Implemented `lib/draft-engine.ts` to handle step-based drafting (replacing hardcoded phases).
- [x] **Type Definitions:** Updated `lib/types/draft.ts` to include `Preset`, `DraftStep`, and linked `Lobby` to `Preset`.
- [x] **UI Integration:** Updated `DraftInterface` to support the new `preset` prop and engine logic alongside legacy mode.

## 2. Identified Issues & Bugs
### Critical
- **Security (RLS):** Current RLS policies allow `SELECT *` on drafts. Hidden picks are visible to savvy users. *Mitigation Planned: RLS update pending.*
- **Build Failure:** `/lobby` page fails build due to missing `<Suspense>` boundary around `useSearchParams`.
- **Missing Imports:** `enableDemoMode` is missing from `@/lib/demo/auth`.

### Improvements Needed
- **Preset Management:** No UI yet to create/select presets (DB only).
- **SEO:** Missing OpenGraph images for draft sharing.
- **Mobile Performance:** `CivilizationGrid` needs optimization for low-end devices.

## 3. Next Steps
1.  **Fix Build:** Wrap `LobbyPage` in `<Suspense>`.
2.  **Apply SQL:** Run `scripts/007_create_presets_and_refactor.sql` in Supabase.
3.  **UI for Presets:** Add a selector in "Create Lobby".
4.  **Security:** Implement `security definer` functions for fetching draft state.

## 4. Manual Test Plan
- [ ] Create a Lobby with "Standard" preset (manual DB insert required for now).
- [ ] Verify Draft Flow: Map Ban -> Map Pick -> Civ Ban -> Civ Pick.
- [ ] Verify "Hidden" picks are actually hidden in UI (even if insecure in network tab for now).
