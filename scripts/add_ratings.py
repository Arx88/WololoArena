import re
import sys
import os

file_path = os.path.join(os.getcwd(), "lib/data/civilizations.ts")

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

if "interface TeamRatings" not in content:
    content = content.replace("export interface CivilizationBonus {", 
"""export interface TeamRatings {
  economy: number
  rush: number
  lateGame: number
  defense: number
  mobility: number
}

export interface CivilizationBonus {""")

content = content.replace("synergyWith: string[] // Civ IDs that synergize well", 
                          "synergyWith: string[] // Civ IDs that synergize well\n  ratings: TeamRatings")

def calculate_ratings(civ_block):
    ratings = {"economy": 5, "rush": 5, "lateGame": 5, "defense": 5, "mobility": 5}
    
    if "economy" in civ_block or "boom" in civ_block.lower(): ratings["economy"] += 2
    if "Vikings" in civ_block: ratings["economy"] += 2 
    if "Chinese" in civ_block: ratings["economy"] += 2
    
    if "early-aggression" in civ_block or "rush" in civ_block.lower(): ratings["rush"] += 2
    if "Mongols" in civ_block: ratings["rush"] += 2
    if "Aztecs" in civ_block: ratings["rush"] += 1

    if "late game" in civ_block.lower() or "imperial" in civ_block.lower() or "gunpowder" in civ_block: ratings["lateGame"] += 2
    if "Bohemians" in civ_block: ratings["lateGame"] += 2
    if "Turks" in civ_block: ratings["lateGame"] += 2

    if "defense" in civ_block or "walls" in civ_block or "Towers" in civ_block: ratings["defense"] += 2
    if "Byzantines" in civ_block: ratings["defense"] += 3
    if "Teutons" in civ_block: ratings["defense"] += 2

    if "cavalry" in civ_block or "mobility" in civ_block or "faster" in civ_block: ratings["mobility"] += 2
    if "Huns" in civ_block: ratings["mobility"] += 2
    if "Mongols" in civ_block: ratings["mobility"] += 2
    if "Cumans" in civ_block: ratings["mobility"] += 2
    
    for k in ratings:
        ratings[k] = min(10, max(1, ratings[k]))
        
    return f"""    ratings: {{
      economy: {ratings['economy']},
      rush: {ratings['rush']},
      lateGame: {ratings['lateGame']},
      defense: {ratings['defense']},
      mobility: {ratings['mobility']},
    }},"""

def replacer(match):
    full_match = match.group(0)
    if "ratings:" in full_match:
        return full_match

    last_brace_index = full_match.rfind("}")
    if last_brace_index != -1:
        before_brace = full_match[:last_brace_index]
        after_brace = full_match[last_brace_index:]
        return before_brace + calculate_ratings(full_match) + "\n  " + after_brace
    
    return full_match

pattern = r"  \{[\s\S]*?\}(?:,|$)"
new_content = re.sub(pattern, replacer, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print(f"Updated {file_path}")