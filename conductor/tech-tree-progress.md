# Tech Tree & Database Progress Tracker

## Status Overview
- **Visual Structure:** Complete (Red crosses added, layout robust).
- **Data Accuracy:** IMPROVING (45/45 civ availability parsed from raw data). Stats database (50+ units) implemented but needs more detail.
- **Assets:** Resource icons FIXED. Some unit/tech images still missing from folders.

## Missing Assets (Priority High)
- [x] Resource Icons (Food, Wood, Gold, Stone)
- [ ] `Unit_35.png` (Battering Ram)
- [ ] `Unit_42.png` (Trebuchet)
- [ ] `716.png` (Supplies?)
- [ ] `216.png` (Husbandry?)
- [ ] `Building_19.png` (Blacksmith - check path)

## Current Achievements
1.  **Corrected TypeScript Crash:** Fixed syntax error in `civ-availability.ts` (Python comments were used by mistake).
2.  **Visual Clarity:** Added prominent Red Cross (X) over unavailable items.
3.  **Real Icons:** Integrated PNGs from `RECURSOS` for Food, Wood, Gold, and Stone.
4.  **45 Civs Support:** Full allow-list generated for all 45 civilizations.
5.  **Bonus Panel:** Civilization and Team bonuses now visible in Sidebar.


## Data Verification Queue (Unit Stats)
**Source:** `AOE2_Complete_Database_By_Civilization.pdf` / Wiki

### Barracks (Infantería)
- [ ] Militia (HP, Atk, Armor, Pierce, Speed, Reload, LOS)
- [ ] Man-at-Arms
- [ ] Long Swordsman
- [ ] Two-Handed Swordsman
- [ ] Champion
- [ ] Spearman
- [ ] Pikeman
- [ ] Halberdier
- [ ] Eagle Scout/Warrior/Elite

### Archery Range (Rango)
- [ ] Archer/Xbow/Arbalester
- [ ] Skirmisher/Elite
- [ ] Cav Archer/Heavy
- [ ] Hand Cannoneer

### Stable (Caballería)
- [ ] Scout/Light/Hussar
- [ ] Knight/Cavalier/Paladin
- [ ] Camel/Heavy
- [ ] Battle Elephant/Elite
- [ ] Steppe Lancer/Elite

### Siege Workshop (Asedio)
- [ ] Rams (Ram, Capped, Siege)
- [ ] Mangonel line
- [ ] Scorpion line
- [ ] Bombard Cannon
- [ ] Siege Tower

### Dock (Muelle)
- [ ] Fishing Ship
- [ ] Transport
- [ ] Galley line
- [ ] Fire line
- [ ] Demo line
- [ ] Cannon Galleon line

## Action Plan
1.  Locate/Create Resource Icons.
2.  Read PDF/Docs to get EXACT stats for Barracks units first.
3.  Update `unit-database.ts` with Barracks data.
4.  Verify visual update.
5.  Repeat for other buildings.
