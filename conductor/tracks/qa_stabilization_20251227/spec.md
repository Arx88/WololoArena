# Track Specification: Comprehensive QA and Stabilization

## Overview
The goal of this track is to audit, stabilize, and finalize the existing features of the Wololo Arena application. While much of the core functionality is implemented, many parts are considered "basic" or "incomplete" and require rigorous testing and refinement to ensure a professional, bug-free experience.

## Scope
- **Drafting Engine:** Verify all drafting modes (Captains, Hidden, Custom), timer accuracy, and synchronization between players.
- **Tournament System:** Audit the tournament creation, lifecycle, and hype systems.
- **Civilization Database:** Ensure all data in the database (win rates, counters) matches the provided `civisINFO.md` and is correctly displayed.
- **User Profiles:** Verify profile creation, persistence, and match history tracking.
- **Internationalization:** Confirm that all UI strings are correctly localized and the switcher works seamlessly.
- **UI/UX Polish:** Identify and fix layout issues, particularly on mobile, and ensure adherence to the product guidelines.

## Success Criteria
- All core user flows (drafting, profile management, tournament browsing) are tested and bug-free.
- Unit and integration tests cover at least 80% of the core logic.
- UI is responsive and follows the dark-mode/minimalist aesthetic defined in the guidelines.
- The drafting engine handles edge cases (disconnects, timeouts) gracefully.

## Technical Considerations
- **Testing Framework:** Use Vitest/Jest for unit tests and Playwright/Cypress for E2E tests (verify which is already in use).
- **Supabase Realtime:** Monitor and optimize realtime channels for drafting synchronization.
- **Next.js 15 Features:** Ensure correct usage of Server/Client components and hydration.
