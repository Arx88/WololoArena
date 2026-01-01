import re
import os

file_path = os.path.join(os.getcwd(), "lib/data/civilizations.ts")

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 2. ADD NEW CIVS (SHU, WEI, WU, JURCHENS, KHITANS)
# I'll use a single line string or join to avoid triple quote issues in some environments
new_civs = []

new_civs.append({
    "id": "shu", "name": "Shu", "expansion": "dynasties", "specialty": "Archers & Siege",
    "icon": "https://static.wikia.nocookie.net/ageofempires/images/placeholder_shu.png",
    "teamBonus": "Foot archers +2 extra line of sight",
    "bonuses": [
        {"type": "economy", "description": "Lumberjacks generate food in addition to wood"},
        {"type": "utility", "description": "Archer technologies at Archery Range and Blacksmith cost -25%"},
        {"type": "military", "description": "Siege weapons and siege warships move 10/15% faster in Castle/Imperial Age"}
    ],
    "synergyTags": ["archers", "siege", "economy"],
    "strengths": ["Strong archer DPS", "Mobile siege", "Robust economy"],
    "weaknesses": ["Vulnerable to fast cavalry", "Late game gold dependent"],
    "bestPositions": ["flank"],
    "synergyWith": ["saracens", "britons", "ethiopians"],
    "ratings": {"economy": 8, "rush": 7, "lateGame": 9, "defense": 6, "mobility": 5}
})

new_civs.append({
    "id": "wei", "name": "Wei", "expansion": "dynasties", "specialty": "Cavalry",
    "icon": "https://static.wikia.nocookie.net/ageofempires/images/placeholder_wei.png",
    "teamBonus": "Cavalry gain +2 attack versus siege weapons",
    "bonuses": [
        {"type": "economy", "description": "Receive one free villager for each Mill, Lumber Camp, and Mining Camp technology researched"},
        {"type": "military", "description": "Hei Guang Cavalry and Shan Bay Raider have +15/30% HP in Castle/Imperial Age"}
    ],
    "synergyTags": ["cavalry", "economy", "anti-siege"],
    "strengths": ["Tanky cavalry", "Instant eco spikes", "Anti-siege"],
    "weaknesses": ["Weak archers", "Average infantry"],
    "bestPositions": ["pocket"],
    "synergyWith": ["franks", "huns", "poles"],
    "ratings": {"economy": 7, "rush": 8, "lateGame": 8, "defense": 6, "mobility": 9}
})

new_civs.append({
    "id": "wu", "name": "Wu", "expansion": "dynasties", "specialty": "Infantry & Naval",
    "icon": "https://static.wikia.nocookie.net/ageofempires/images/placeholder_wu.png",
    "teamBonus": "Houses are built 100% faster",
    "bonuses": [
        {"type": "economy", "description": "Military production buildings and docks provide +65 food when built"},
        {"type": "military", "description": "Infantry regenerates 10/20/30 HP per minute in Feudal/Castle/Imperial Age"},
        {"type": "military", "description": "Jian Swordsman and Hei Guang Cavalry gain +2 attack in Imperial Age"},
        {"type": "utility", "description": "Careening and Dry Dock available one age earlier and cost -75%"}
    ],
    "synergyTags": ["infantry", "navy", "sustain"],
    "strengths": ["Regenerating infantry", "Strong water control", "Fast boom"],
    "weaknesses": ["No bloodlines", "Weak vs mass archers"],
    "bestPositions": ["flank", "pocket"],
    "synergyWith": ["japanese", "vikings", "dravidians"],
    "ratings": {"economy": 7, "rush": 7, "lateGame": 8, "defense": 7, "mobility": 6}
})

new_civs.append({
    "id": "jurchens", "name": "Jurchens", "expansion": "dynasties", "specialty": "Cavalry & Gunpowder",
    "icon": "https://static.wikia.nocookie.net/ageofempires/images/placeholder_jurchens.png",
    "teamBonus": "Gunpowder units have +2 line of sight",
    "bonuses": [
        {"type": "economy", "description": "Meat of hunted and livestock animals does not decay"},
        {"type": "military", "description": "Mounted units and Fire Lancers attack 20% faster starting in Feudal Age"},
        {"type": "utility", "description": "Siege Engineers available in Castle Age; siege and fortification upgrades cost -75% wood"},
        {"type": "military", "description": "Military units receive -50% friendly fire damage"}
    ],
    "synergyTags": ["cavalry", "gunpowder", "siege"],
    "strengths": ["Fast attacking cavalry", "Early siege engineers", "Elite gunpowder"],
    "weaknesses": ["Weak early game food control (except hunt)", "Expensive unique unit"],
    "bestPositions": ["pocket", "flank"],
    "synergyWith": ["turks", "hindustanis", "bohemians"],
    "ratings": {"economy": 8, "rush": 8, "lateGame": 9, "defense": 6, "mobility": 8}
})

new_civs.append({
    "id": "khitans", "name": "Khitans", "expansion": "dynasties", "specialty": "Infantry & Cavalry",
    "icon": "https://static.wikia.nocookie.net/ageofempires/images/placeholder_khitans.png",
    "teamBonus": "Infantry gain +2 attack versus ranged soldiers",
    "bonuses": [
        {"type": "economy", "description": "Pastures replace farms (worked by 2 villagers, central yurt drop-off)"},
        {"type": "economy", "description": "Shepherds and herders generate +10% additional food"},
        {"type": "military", "description": "Melee attack upgrade effects are doubled (Forging +2, etc.)"},
        {"type": "utility", "description": "Skirmishers, Spearmen, and Scout Cavalry train and upgrade 25% faster"},
        {"type": "military", "description": "Heavy Cavalry Archer upgrade available in Castle Age and costs -50%"}
    ],
    "synergyTags": ["infantry", "cavalry", "economy"],
    "strengths": ["Superior melee attack", "Unique farm mechanic", "Fast CA transition"],
    "weaknesses": ["Susceptible to late game archers", "Micro intensive eco"],
    "bestPositions": ["pocket", "flank"],
    "synergyWith": ["mongols", "huns", "tatars"],
    "ratings": {"economy": 7, "rush": 8, "lateGame": 8, "defense": 7, "mobility": 8}
})

def format_civ(civ):
    return f"""
  {{
    id: "{civ['id']}",
    name: "{civ['name']}",
    expansion: "{civ['expansion']}",
    specialty: "{civ['specialty']}",
    icon: "{civ['icon']}",
    teamBonus: "{civ['teamBonus']}",
    bonuses": {str(civ['bonuses']).replace("'type'", "type").replace("'description'", "description")},
    synergyTags": {civ['synergyTags']},
    strengths": {civ['strengths']},
    weaknesses": {civ['weaknesses']},
    bestPositions": {civ['bestPositions']},
    synergyWith": {civ['synergyWith']},
    ratings": {civ['ratings']},
  }},"""

new_civs_str = "\n".join([format_civ(c) for c in new_civs])

if "shu" not in content:
    # Use regex to find the end of the array
    # Looking for the last }, followed by ]
    content = re.sub(r'}}\\s*?,\\s*?]', '}} ,\n' + new_civs_str + '\n]', content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Added Shu, Wei, Wu, Jurchens, and Khitans.")