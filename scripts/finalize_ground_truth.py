import json
import re

CIV_DATA = {
    "armenians": {"powerSpikes": {"feudal": 8, "castle": 7, "imperial": 6}, "ecoType": "aggressive", "counterData": {"strongVs": ["infantry", "navy"], "weakVs": ["gunpowder", "archers"]}, "techMatrix": {"archery": {"arbalester": False, "thumbRing": False, "bracer": True}, "cavalry": {"paladin": False, "bloodlines": False, "plateBarding": False}, "infantry": {"champion": True, "halberdier": True, "plateMail": True}, "siege": {"siegeEngineers": False, "bombardCannon": False, "siegeOnager": False}, "economy": {"cropRotation": True, "guilds": False, "twoManSaw": True}}}, 
    "aztecs": {"powerSpikes": {"feudal": 9, "castle": 8, "imperial": 5}, "ecoType": "aggressive", "counterData": {"strongVs": ["infantry", "cavalry"], "weakVs": ["archers", "hand_cannoneers"]}, "techMatrix": {"archery": {"arbalester": True, "thumbRing": False, "bracer": True}, "cavalry": {"paladin": False, "bloodlines": False, "plateBarding": False}, "infantry": {"champion": True, "halberdier": False, "plateMail": True}, "siege": {"siegeEngineers": True, "bombardCannon": False, "siegeOnager": True}, "economy": {"cropRotation": True, "guilds": False, "twoManSaw": False}}}, 
    "franks": {"powerSpikes": {"feudal": 7, "castle": 10, "imperial": 8}, "ecoType": "aggressive", "counterData": {"strongVs": ["archers", "infantry"], "weakVs": ["camels", "pikes"]}, "techMatrix": {"archery": {"arbalester": False, "thumbRing": False, "bracer": False}, "cavalry": {"paladin": True, "bloodlines": False, "plateBarding": True}, "infantry": {"champion": True, "halberdier": True, "plateMail": True}, "siege": {"siegeEngineers": False, "bombardCannon": True, "siegeOnager": False}, "economy": {"cropRotation": True, "guilds": True, "twoManSaw": False}}}, 
    "mongols": {"powerSpikes": {"feudal": 9, "castle": 7, "imperial": 10}, "ecoType": "aggressive", "counterData": {"strongVs": ["siege", "archers"], "weakVs": ["camels", "berbers"]}, "techMatrix": {"archery": {"arbalester": True, "thumbRing": True, "bracer": True}, "cavalry": {"paladin": False, "bloodlines": True, "plateBarding": False}, "infantry": {"champion": True, "halberdier": False, "plateMail": False}, "siege": {"siegeEngineers": True, "bombardCannon": False, "siegeOnager": True}, "economy": {"cropRotation": False, "guilds": False, "twoManSaw": True}}} 
}

DEFAULT_TECH = {"archery": {"arbalester": True, "thumbRing": True, "bracer": True}, "cavalry": {"paladin": True, "bloodlines": True, "plateBarding": True}, "infantry": {"champion": True, "halberdier": True, "plateMail": True}, "siege": {"siegeEngineers": True, "bombardCannon": True, "siegeOnager": True}, "economy": {"cropRotation": True, "guilds": True, "twoManSaw": True}}
DEFAULT_DATA = {"powerSpikes": {"feudal": 6, "castle": 7, "imperial": 8}, "ecoType": "balanced", "counterData": {"strongVs": ["infantry"], "weakVs": ["siege"]}}

file_path = "Wololo Arena/lib/data/civilizations.ts"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

def inject(match):
    block = match.group(0)
    civ_id = re.search(r'id:\s*"([^"]+)"', block).group(1)
    data = CIV_DATA.get(civ_id, DEFAULT_DATA)
    tech = data.get("techMatrix", DEFAULT_TECH)
    
    # Simple clean up
    block = re.sub(r'techMatrix: \{[^}]+\},', '', block)
    block = re.sub(r'powerSpikes: \{[^}]+\},', '', block)
    block = re.sub(r'counterData: \{[^}]+\},', '', block)
    block = re.sub(r'ecoType: "[^"]+",', '', block)
    
    inj = "    powerSpikes: " + json.dumps(data.get('powerSpikes', DEFAULT_DATA['powerSpikes'])) + ",\n"
    inj += "    counterData: " + json.dumps(data.get('counterData', DEFAULT_DATA['counterData'])) + ",\n"
    inj += "    ecoType: \"" + data.get('ecoType', DEFAULT_DATA['ecoType']) + "\",\n"
    inj += "    techMatrix: " + json.dumps(tech) + ",\n"
    return block.replace("ratings:", inj + "    ratings:")

pattern = r'\{\s+id:\s*"[^"]+",[\s\S]+?ratings:\s*\{[^}]+\}\s*\}'
new_content = re.sub(pattern, inject, content)
with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)
print("Done.")
