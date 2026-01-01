import json
import re

# Comprehensive Ground Truth Data based on PDF analysis
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
        },
        "importantMissingUnits": ["Camel", "Paladin", "Hussar", "Hand Cannon"],
        "importantMissingTechs": ["Thumb Ring", "Siege Engineers", "Plate Barding"]
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
        },
        "importantMissingUnits": ["Arbalester", "Camel", "Hussar"],
        "importantMissingTechs": ["Thumb Ring", "Bracer", "Ring Archer Armor"]
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
        },
        "importantMissingUnits": ["Paladin", "Halberdier", "Hand Cannon"],
        "importantMissingTechs": ["Plate Barding Armor", "Plate Mail Armor", "Ring Archer Armor"]
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
        },
        "importantMissingUnits": ["Paladin", "Camel", "Hand Cannon", "Hussar"],
        "importantMissingTechs": ["Thumb Ring", "Bloodlines", "Plate Mail Armor"]
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
        },
        "importantMissingUnits": ["Arbalester", "Elite Skirmisher", "Pikeman", "Paladin"],
        "importantMissingTechs": ["Siege Onager", "Crop Rotation", "Plate Mail Armor"]
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

def inject_data(match):
    full_block = match.group(0)
    civ_id_match = re.search(r'id:\s*"([^"]+)"', full_block)
    if not civ_id_match: return full_block
    civ_id = civ_id_match.group(1)
    
    data = CIV_DATA.get(civ_id)
    if not data: return full_block

    # Replace existing fields if they exist, or inject before ratings
    new_block = full_block
    
    # Inject TechMatrix
    tech_str = "    techMatrix: " + json.dumps(data['techMatrix']) + ","
    if "techMatrix:" in new_block:
        new_block = re.sub(r'techMatrix: \{[^}]+\},', tech_str, new_block)
    else:
        new_block = new_block.replace("ratings:", tech_str + "\n    ratings:")

    return new_block

pattern = r'\{\s+id:\s*"[^"]+",\s*[\s\S]+?\s+ratings:\s*\{[^}]+\}\s*\}'
new_content = re.sub(pattern, inject_data, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Deep intelligence data injected successfully.")
