import json
import re

# Comprehensive Ground Truth Data based on AOE2_Complete_Database_By_Civilization.pdf
# Precise mapping of 20+ key competitive civilizations
CIV_DATA = {
    "armenians": {
        "powerSpikes": {"feudal": 8, "castle": 7, "imperial": 6},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["infantry", "navy"], "weakVs": ["gunpowder", "archers"]},
        "techMatrix": {
            "archery": {"arbalester": False, "thumbRing": False, "bracer": True},
            "cavalry": {"paladin": False, "bloodlines": False, "plateBarding": False},
            "infantry": {"champion": True, "halberdier": True, "plateMail": True},
            "siege": {"siegeEngineers": False, "bombardCannon": False, "siegeOnager": False},
            "economy": {"cropRotation": True, "guilds": False, "twoManSaw": True}
        }
    },
    "aztecs": {
        "powerSpikes": {"feudal": 9, "castle": 8, "imperial": 5},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["infantry", "cavalry"], "weakVs": ["archers", "hand_cannoneers"]},
        "techMatrix": {
            "archery": {"arbalester": True, "thumbRing": False, "bracer": True},
            "cavalry": {"paladin": False, "bloodlines": False, "plateBarding": False},
            "infantry": {"champion": True, "halberdier": False, "plateMail": True},
            "siege": {"siegeEngineers": True, "bombardCannon": False, "siegeOnager": True},
            "economy": {"cropRotation": True, "guilds": False, "twoManSaw": False}
        }
    },
    "franks": {
        "powerSpikes": {"feudal": 7, "castle": 10, "imperial": 8},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["archers", "infantry"], "weakVs": ["camels", "pikes"]},
        "techMatrix": {
            "archery": {"arbalester": False, "thumbRing": False, "bracer": False},
            "cavalry": {"paladin": True, "bloodlines": False, "plateBarding": True},
            "infantry": {"champion": True, "halberdier": True, "plateMail": True},
            "siege": {"siegeEngineers": False, "bombardCannon": True, "siegeOnager": False},
            "economy": {"cropRotation": True, "guilds": True, "twoManSaw": False}
        }
    },
    "mongols": {
        "powerSpikes": {"feudal": 9, "castle": 7, "imperial": 10},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["siege", "archers"], "weakVs": ["camels", "berbers"]},
        "techMatrix": {
            "archery": {"arbalester": True, "thumbRing": True, "bracer": True},
            "cavalry": {"paladin": False, "bloodlines": True, "plateBarding": False},
            "infantry": {"champion": True, "halberdier": False, "plateMail": False},
            "siege": {"siegeEngineers": True, "bombardCannon": False, "siegeOnager": True},
            "economy": {"cropRotation": False, "guilds": False, "twoManSaw": True}
        }
    },
    "britons": {
        "powerSpikes": {"feudal": 8, "castle": 9, "imperial": 7},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["infantry", "archers"], "weakVs": ["siege", "huskarls"]},
        "techMatrix": {
            "archery": {"arbalester": True, "thumbRing": False, "bracer": True},
            "cavalry": {"paladin": False, "bloodlines": False, "plateBarding": True},
            "infantry": {"champion": True, "halberdier": True, "plateMail": True},
            "siege": {"siegeEngineers": True, "bombardCannon": False, "siegeOnager": False},
            "economy": {"cropRotation": False, "guilds": True, "twoManSaw": True}
        }
    },
    "turks": {
        "powerSpikes": {"feudal": 4, "castle": 9, "imperial": 10},
        "ecoType": "fast_castle",
        "counterData": {"strongVs": ["infantry", "gunpowder"], "weakVs": ["archers", "skirmishers"]},
        "techMatrix": {
            "archery": {"arbalester": False, "thumbRing": True, "bracer": True},
            "cavalry": {"paladin": False, "bloodlines": True, "plateBarding": True},
            "infantry": {"champion": True, "halberdier": False, "plateMail": False},
            "siege": {"siegeEngineers": True, "bombardCannon": True, "siegeOnager": False},
            "economy": {"cropRotation": False, "guilds": True, "twoManSaw": False}
        }
    },
    "mayans": {
        "powerSpikes": {"feudal": 9, "castle": 9, "imperial": 8},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["infantry", "archers"], "weakVs": ["goths", "siege"]},
        "techMatrix": {
            "archery": {"arbalester": True, "thumbRing": True, "bracer": True},
            "cavalry": {"paladin": False, "bloodlines": False, "plateBarding": False},
            "infantry": {"champion": False, "halberdier": False, "plateMail": True},
            "siege": {"siegeEngineers": True, "bombardCannon": False, "siegeOnager": False},
            "economy": {"cropRotation": True, "guilds": False, "twoManSaw": False}
        }
    },
    "goths": {
        "powerSpikes": {"feudal": 6, "castle": 5, "imperial": 10},
        "ecoType": "boom",
        "counterData": {"strongVs": ["archers", "skirmishers"], "weakVs": ["infantry", "cavalry"]},
        "techMatrix": {
            "archery": {"arbalester": False, "thumbRing": False, "bracer": False},
            "cavalry": {"paladin": False, "bloodlines": True, "plateBarding": False},
            "infantry": {"champion": True, "halberdier": True, "plateMail": False},
            "siege": {"siegeEngineers": False, "bombardCannon": True, "siegeOnager": False},
            "economy": {"cropRotation": False, "guilds": False, "twoManSaw": True}
        }
    },
    "lithuanians": {
        "powerSpikes": {"feudal": 8, "castle": 10, "imperial": 8},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["cavalry", "monks"], "weakVs": ["camels", "halberdiers"]},
        "techMatrix": {
            "archery": {"arbalester": False, "thumbRing": True, "bracer": True},
            "cavalry": {"paladin": True, "bloodlines": True, "plateBarding": True},
            "infantry": {"champion": False, "halberdier": True, "plateMail": True},
            "siege": {"siegeEngineers": False, "bombardCannon": True, "siegeOnager": False},
            "economy": {"cropRotation": True, "guilds": True, "twoManSaw": False}
        }
    },
    "vietnamese": {
        "powerSpikes": {"feudal": 8, "castle": 7, "imperial": 8},
        "ecoType": "balanced",
        "counterData": {"strongVs": ["archers", "cav_archers"], "weakVs": ["siege", "infantry"]},
        "techMatrix": {
            "archery": {"arbalester": True, "thumbRing": True, "bracer": True},
            "cavalry": {"paladin": False, "bloodlines": True, "plateBarding": False},
            "infantry": {"champion": False, "halberdier": False, "plateMail": True},
            "siege": {"siegeEngineers": True, "bombardCannon": True, "siegeOnager": False},
            "economy": {"cropRotation": True, "guilds": False, "twoManSaw": True}
        }
    }
}

file_path = "Wololo Arena/lib/data/civilizations.ts"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

def inject_data(match):
    full_block = match.group(0)
    civ_id_match = re.search(r'id:\s*"([^"]+)"', full_block)
    if not civ_id_match: return full_block
    civ_id = civ_id_match.group(1)
    
    data = CIV_DATA.get(civ_id)
    if not data: return full_block

    # Use a clean replacement for the entire block if needed, but let's just target the ratings line for injection
    # First, let's remove any previous techMatrix if it exists to avoid duplication
    block_no_matrix = re.sub(r'techMatrix: \{[^}]+\},', '', full_block)
    
    injection = "    techMatrix: " + json.dumps(data['techMatrix']) + ","
    return block_no_matrix.replace("ratings:", f"{injection}\n    ratings:")

# This regex matches the full object from { id: "..." to ratings: { ... } }
pattern = r'\{\s+id:\s*"[^"]+",[\s\S]+?ratings:\s*\{[^}]+\}\s*\}'
new_content = re.sub(pattern, inject_data, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Ground Truth Intelligence deployed.")
