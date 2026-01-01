import json
import re

# Enhanced ground-truth data for unit availability and key late-game technologies.
TECH_DATA = {
    "armenians": {
        "archery": {"arbalester": False, "thumbRing": False, "bracer": True},
        "cavalry": {"paladin": False, "bloodlines": False, "plateBarding": False},
        "infantry": {"champion": True, "halberdier": True, "plateMail": True},
        "siege": {"siegeEngineers": False, "bombardCannon": False, "siegeOnager": False},
        "economy": {"cropRotation": True, "guilds": False, "twoManSaw": True}
    },
    "aztecs": {
        "archery": {"arbalester": True, "thumbRing": False, "bracer": True},
        "cavalry": {"paladin": False, "bloodlines": False, "plateBarding": False},
        "infantry": {"champion": True, "halberdier": False, "plateMail": True},
        "siege": {"siegeEngineers": True, "bombardCannon": False, "siegeOnager": True},
        "economy": {"cropRotation": True, "guilds": False, "twoManSaw": False}
    },
    "britons": {
        "archery": {"arbalester": True, "thumbRing": False, "bracer": True},
        "cavalry": {"paladin": False, "bloodlines": False, "plateBarding": True},
        "infantry": {"champion": True, "halberdier": True, "plateMail": True},
        "siege": {"siegeEngineers": True, "bombardCannon": False, "siegeOnager": False},
        "economy": {"cropRotation": False, "guilds": True, "twoManSaw": True}
    }
}

DEFAULT_TECH = {
    "archery": {"arbalester": True, "thumbRing": True, "bracer": True},
    "cavalry": {"paladin": True, "bloodlines": True, "plateBarding": True},
    "infantry": {"champion": True, "halberdier": True, "plateMail": True},
    "siege": {"siegeEngineers": True, "bombardCannon": True, "siegeOnager": True},
    "economy": {"cropRotation": True, "guilds": True, "twoManSaw": True}
}

file_path = "Wololo Arena/lib/data/civilizations.ts"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

def inject_tech(match):
    full_block = match.group(0)
    civ_id_match = re.search(r'id:\s*"([^"]+)"', full_block)
    if not civ_id_match: return full_block
    civ_id = civ_id_match.group(1)
    tech = TECH_DATA.get(civ_id, DEFAULT_TECH)
    
    if "techMatrix:" in full_block:
        return full_block

    # Use a simpler replacement string to avoid syntax errors in Python script
    injection = "    techMatrix: " + json.dumps(tech) + "\n"
    return full_block.replace("ratings:", injection + "    ratings:")

pattern = r'\{\s+id:\s*"[^"]+",\s*[\s\S]+?ratings:\s*\{[^}]+\}\s*\},?'
new_content = re.sub(pattern, inject_tech, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("TechMatrix injection complete.")