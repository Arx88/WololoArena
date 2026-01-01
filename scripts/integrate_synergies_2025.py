import re
import os

file_path = os.path.join(os.getcwd(), "lib/data/synergy-calculator.ts")

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# New Team Bonus Ratings for 2025 DLC Civs
new_ratings = """  // 2025 THREE KINGDOMS DLC BONUSES
  shu: {
    rating: 92,
    description: "Foot archers +2 LOS - excellent for early map control",
    bestWith: ["britons", "mayans", "saracens", "ethiopians"],
  },
  wei: {
    rating: 88,
    description: "Cavalry +2 attack vs siege - protects allied siege pushes",
    bestWith: ["celts", "slavs", "mongols", "khmer"],
  },
  wu: {
    rating: 85,
    description: "Houses built 100% faster - small but consistent tempo bonus",
    bestWith: ["huns", "chinese", "persians"],
  },
  jurchens: {
    rating: 90,
    description: "Gunpowder units +2 LOS - vital for bombard cannon micro",
    bestWith: ["turks", "italians", "portuguese", "bohemians"],
  },
  khitans: {
    rating: 91,
    description: "Cavalry Archers +2 LOS - supreme mobility vision",
    bestWith: ["mongols", "huns", "magyars", "tatars"],
  },"""

# New Pair Synergies for 2025 Meta
new_pairs = """  // 2025 DLC SYNERGIES
  {
    civs: ["shu", "saracens"],
    score: 96,
    reason: "Extra LOS + building damage bonus makes archer pressure impossible to stop",
    tags: ["archers", "vision", "siege"],
    winRateBoost: 6.5,
  },
  {
    civs: ["wei", "celts"],
    score: 94,
    reason: "Wei cavalry protects Celta fast siege from enemy counter-siege",
    tags: ["cavalry", "siege", "protection"],
    winRateBoost: 6.0,
  },
  {
    civs: ["khitans", "mongols"],
    score: 95,
    reason: "Double vision bonus for scouts and CA + fastest CA production",
    tags: ["cavalry-archers", "vision", "mobility"],
    winRateBoost: 6.2,
  },"""

# Insert Ratings
if "shu" not in content:
    content = content.replace("  bengalis: {", new_ratings + "\n  bengalis: {")

# Insert Pairs
if "shu" not in content:
    content = content.replace("  // E-TIER PAIRS", new_pairs + "\n  // E-TIER PAIRS")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Integrated Three Kingdoms DLC into Synergy Calculator.")
