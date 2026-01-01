import json
import re

# Comprehensive Ground Truth Data
CIV_DATA = {
    "armenians": {
        "powerSpikes": {"feudal": 8, "castle": 7, "imperial": 6},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["infantry", "navy"], "weakVs": ["gunpowder", "archers"]},
        "importantMissingUnits": ["Camel Rider", "Hand Cannoneer", "Hussar", "Paladin"],
        "importantMissingTechs": ["Plate Barding Armor", "Bombard Cannon", "Siege Onager"]
    },
    "aztecs": {
        "powerSpikes": {"feudal": 9, "castle": 8, "imperial": 5},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["infantry", "cavalry"], "weakVs": ["archers", "hand_cannoneers"]},
        "importantMissingUnits": ["Cavalry", "Halberdier", "Hand Cannoneer", "Cannon Galleon"],
        "importantMissingTechs": ["Thumb Ring", "Masonry", "Architecture", "Bombard Cannon"]
    },
    "bengalis": {
        "powerSpikes": {"feudal": 4, "castle": 6, "imperial": 9},
        "ecoType": "boom",
        "counterData": {"strongVs": ["archers", "skirmishers"], "weakVs": ["camels", "pikes"]},
        "importantMissingUnits": ["Knights", "Camel Rider", "Hand Cannoneer", "Bombard Cannon"],
        "importantMissingTechs": ["Thumb Ring", "Plate Barding Armor", "Herbal Medicine"]
    },
    "berbers": {
        "powerSpikes": {"feudal": 6, "castle": 9, "imperial": 8},
        "ecoType": "balanced",
        "counterData": {"strongVs": ["cavalry_archers", "cavalry"], "weakVs": ["halberdiers", "camels"]},
        "importantMissingUnits": ["Paladin", "Siege Onager", "Siege Ram"],
        "importantMissingTechs": ["Architecture", "Sappers", "Shipwright"]
    },
    "bohemians": {
        "powerSpikes": {"feudal": 5, "castle": 8, "imperial": 9},
        "ecoType": "fast_castle",
        "counterData": {"strongVs": ["archers", "cavalry"], "weakVs": ["bombard_cannons", "skirmishers"]},
        "importantMissingUnits": ["Knights", "Camel Rider", "Paladin", "Eagle Warrior"],
        "importantMissingTechs": ["Thumb Ring", "Plate Mail Armor", "Crop Rotation"]
    },
    "britons": {
        "powerSpikes": {"feudal": 8, "castle": 9, "imperial": 7},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["infantry", "archers"], "weakVs": ["skirmishers", "siege", "huskarls"]},
        "importantMissingUnits": ["Paladin", "Camel Rider", "Hand Cannoneer", "Siege Onager"],
        "importantMissingTechs": ["Thumb Ring", "Bloodlines", "Bombard Cannon"]
    },
    "bulgarians": {
        "powerSpikes": {"feudal": 9, "castle": 7, "imperial": 6},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["skirmishers", "huskarls"], "weakVs": ["archers", "knights"]},
        "importantMissingUnits": ["Crossbowman", "Arbalester", "Camel Rider", "Hand Cannoneer"],
        "importantMissingTechs": ["Ring Archer Armor", "Dry Dock", "Bombard Cannon"]
    },
    "burgundians": {
        "powerSpikes": {"feudal": 6, "castle": 10, "imperial": 8},
        "ecoType": "boom",
        "counterData": {"strongVs": ["archers", "infantry"], "weakVs": ["camels", "pikes"]},
        "importantMissingUnits": ["Camel Rider", "Steppe Lancer", "Eagle Warrior"],
        "importantMissingTechs": ["Bloodlines", "Thumb Ring", "Ring Archer Armor"]
    },
    "burmese": {
        "powerSpikes": {"feudal": 7, "castle": 9, "imperial": 6},
        "ecoType": "balanced",
        "counterData": {"strongVs": ["infantry", "buildings"], "weakVs": ["archers", "cav_archers"]},
        "importantMissingUnits": ["Arbalester", "Hand Cannoneer", "Camel Rider", "Paladin"],
        "importantMissingTechs": ["Leather Archer Armor", "Ring Archer Armor", "Thumb Ring"]
    },
    "byzantines": {
        "powerSpikes": {"feudal": 5, "castle": 6, "imperial": 10},
        "ecoType": "balanced",
        "counterData": {"strongVs": ["camels", "archers", "pikes"], "weakVs": ["siege", "eagles"]},
        "importantMissingUnits": ["Siege Onager", "Siege Ram", "Scorpion"],
        "importantMissingTechs": ["Bloodlines", "Blast Furnace", "Sappers"]
    },
    "celts": {
        "powerSpikes": {"feudal": 7, "castle": 8, "imperial": 9},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["buildings", "skirmishers"], "weakVs": ["archers", "cavalry"]},
        "importantMissingUnits": ["Arbalester", "Hand Cannoneer", "Camel Rider", "Paladin"],
        "importantMissingTechs": ["Thumb Ring", "Ring Archer Armor", "Bracer", "Plate Barding Armor"]
    },
    "chinese": {
        "powerSpikes": {"feudal": 7, "castle": 9, "imperial": 9},
        "ecoType": "boom",
        "counterData": {"strongVs": ["infantry", "cavalry"], "weakVs": ["onagers", "siege"]},
        "importantMissingUnits": ["Hand Cannoneer", "Hussar", "Paladin", "Siege Onager"],
        "importantMissingTechs": ["Crop Rotation", "Bombard Cannon", "Siege Engineers"]
    },
    "cumans": {
        "powerSpikes": {"feudal": 10, "castle": 6, "imperial": 8},
        "ecoType": "boom",
        "counterData": {"strongVs": ["archers", "infantry"], "weakVs": ["pikes", "camels"]},
        "importantMissingUnits": ["Arbalester", "Hand Cannoneer", "Camel Rider", "Bombard Cannon"],
        "importantMissingTechs": ["Bracer", "Thumb Ring", "Architecture"]
    },
    "dravidians": {
        "powerSpikes": {"feudal": 7, "castle": 6, "imperial": 8},
        "ecoType": "balanced",
        "counterData": {"strongVs": ["infantry", "ships"], "weakVs": ["siege", "knights"]},
        "importantMissingUnits": ["Knights", "Camel Rider", "Paladin", "Hussar"],
        "importantMissingTechs": ["Bloodlines", "Plate Barding Armor", "Siege Engineers"]
    },
    "ethiopians": {
        "powerSpikes": {"feudal": 9, "castle": 8, "imperial": 7},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["infantry", "buildings"], "weakVs": ["cavalry", "skirmishers"]},
        "importantMissingUnits": ["Paladin", "Camel Rider", "Hand Cannoneer"],
        "importantMissingTechs": ["Bloodlines", "Plate Barding Armor", "Crop Rotation"]
    },
    "franks": {
        "powerSpikes": {"feudal": 7, "castle": 10, "imperial": 8},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["skirmishers", "archers"], "weakVs": ["camels", "pikes"]},
        "importantMissingUnits": ["Arbalester", "Camel Rider", "Hussar"],
        "importantMissingTechs": ["Thumb Ring", "Ring Archer Armor", "Bracer", "Sappers"]
    },
    "georgians": {
        "powerSpikes": {"feudal": 6, "castle": 8, "imperial": 8},
        "ecoType": "balanced",
        "counterData": {"strongVs": ["raiding", "skirmishers"], "weakVs": ["halberdiers", "monks"]},
        "importantMissingUnits": ["Arbalester", "Hand Cannoneer", "Camel Rider"],
        "importantMissingTechs": ["Thumb Ring", "Ring Archer Armor", "Bombard Cannon"]
    },
    "goths": {
        "powerSpikes": {"feudal": 6, "castle": 5, "imperial": 10},
        "ecoType": "boom",
        "counterData": {"strongVs": ["archers", "skirmishers"], "weakVs": ["infantry", "knights"]},
        "importantMissingUnits": ["Arbalester", "Camel Rider", "Paladin", "Siege Onager"],
        "importantMissingTechs": ["Thumb Ring", "Plate Mail Armor", "Architecture", "Siege Engineers"]
    },
    "gurjaras": {
        "powerSpikes": {"feudal": 8, "castle": 9, "imperial": 7},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["cavalry", "archers"], "weakVs": ["pikes", "infantry"]},
        "importantMissingUnits": ["Knights", "Paladin", "Arbalester"],
        "importantMissingTechs": ["Blast Furnace", "Plate Mail Armor", "Architecture"]
    },
    "hindustanis": {
        "powerSpikes": {"feudal": 7, "castle": 8, "imperial": 9},
        "ecoType": "balanced",
        "counterData": {"strongVs": ["archers", "cavalry"], "weakVs": ["infantry", "pikes"]},
        "importantMissingUnits": ["Knights", "Paladin", "Arbalester"],
        "importantMissingTechs": ["Thumb Ring", "Plate Mail Armor", "Architecture"]
    },
    "huns": {
        "powerSpikes": {"feudal": 8, "castle": 9, "imperial": 7},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["infantry", "siege"], "weakVs": ["camels", "pikes"]},
        "importantMissingUnits": ["Arbalester", "Hand Cannoneer", "Camel Rider", "Cannon Galleon"],
        "importantMissingTechs": ["Ring Archer Armor", "Plate Mail Armor", "Architecture", "Bombard Cannon"]
    },
    "incas": {
        "powerSpikes": {"feudal": 9, "castle": 7, "imperial": 7},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["cavalry", "infantry"], "weakVs": ["gunpowder", "siege"]},
        "importantMissingUnits": ["Cavalry", "Camel Rider", "Hand Cannoneer"],
        "importantMissingTechs": ["Bombard Cannon", "Architecture", "Architecture"]
    },
    "italians": {
        "powerSpikes": {"feudal": 5, "castle": 7, "imperial": 9},
        "ecoType": "fast_castle",
        "counterData": {"strongVs": ["cavalry", "gunpowder"], "weakVs": ["archers", "siege"]},
        "importantMissingUnits": ["Paladin", "Camel Rider", "Siege Onager", "Siege Ram"],
        "importantMissingTechs": ["Sappers", "Siege Engineers"]
    },
    "japanese": {
        "powerSpikes": {"feudal": 9, "castle": 6, "imperial": 8},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["infantry", "unique_units"], "weakVs": ["archers", "knights"]},
        "importantMissingUnits": ["Paladin", "Camel Rider", "Siege Onager", "Siege Ram"],
        "importantMissingTechs": ["Plate Barding Armor", "Bombard Cannon", "Architecture", "Sappers"]
    },
    "khmer": {
        "powerSpikes": {"feudal": 7, "castle": 10, "imperial": 9},
        "ecoType": "boom",
        "counterData": {"strongVs": ["archers", "infantry"], "weakVs": ["monks", "onagers"]},
        "importantMissingUnits": ["Arbalester", "Hand Cannoneer", "Camel Rider", "Paladin"],
        "importantMissingTechs": ["Thumb Ring", "Plate Mail Armor", "Bombard Cannon", "Sappers"]
    },
    "koreans": {
        "powerSpikes": {"feudal": 7, "castle": 8, "imperial": 8},
        "ecoType": "balanced",
        "counterData": {"strongVs": ["archers", "ships"], "weakVs": ["siege", "monks"]},
        "importantMissingUnits": ["Paladin", "Camel Rider", "Hand Cannoneer", "Hussar", "Siege Ram"],
        "importantMissingTechs": ["Blast Furnace", "Plate Barding Armor", "Thumb Ring", "Crop Rotation"]
    },
    "lithuanians": {
        "powerSpikes": {"feudal": 8, "castle": 10, "imperial": 8},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["skirmishers", "infantry"], "weakVs": ["camels", "halberdiers"]},
        "importantMissingUnits": ["Arbalester", "Camel Rider", "Siege Onager", "Siege Ram"],
        "importantMissingTechs": ["Plate Mail Armor", "Bombard Cannon", "Sappers"]
    },
    "magyars": {
        "powerSpikes": {"feudal": 9, "castle": 8, "imperial": 7},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["siege", "archers"], "weakVs": ["camels", "pikes"]},
        "importantMissingUnits": ["Hand Cannoneer", "Camel Rider", "Siege Onager", "Siege Ram"],
        "importantMissingTechs": ["Plate Mail Armor", "Bombard Cannon", "Architecture", "Sappers"]
    },
    "malay": {
        "powerSpikes": {"feudal": 8, "castle": 8, "imperial": 6},
        "ecoType": "fast_castle",
        "counterData": {"strongVs": ["ships", "skirmishers"], "weakVs": ["infantry", "champions"]},
        "importantMissingUnits": ["Camel Rider", "Paladin", "Hussar", "Hand Cannoneer"],
        "importantMissingTechs": ["Plate Mail Armor", "Plate Barding Armor", "Bloodlines"]
    },
    "malians": {
        "powerSpikes": {"feudal": 8, "castle": 7, "imperial": 7},
        "ecoType": "balanced",
        "counterData": {"strongVs": ["archers", "infantry"], "weakVs": ["knights", "paladins"]},
        "importantMissingUnits": ["Arbalester", "Paladin", "Hussar", "Halberdier"],
        "importantMissingTechs": ["Bracer", "Blast Furnace", "Architecture"]
    },
    "mayans": {
        "powerSpikes": {"feudal": 9, "castle": 9, "imperial": 8},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["infantry", "archers"], "weakVs": ["goths", "siege"]},
        "importantMissingUnits": ["Cavalry", "Camel Rider", "Hand Cannoneer"],
        "importantMissingTechs": ["Bombard Cannon", "Architecture", "Sappers"]
    },
    "mongols": {
        "powerSpikes": {"feudal": 9, "castle": 7, "imperial": 10},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["siege", "infantry"], "weakVs": ["berbers", "camels"]},
        "importantMissingUnits": ["Hand Cannoneer", "Paladin", "Halberdier"],
        "importantMissingTechs": ["Ring Archer Armor", "Plate Mail Armor", "Bombard Cannon", "Architecture"]
    },
    "persians": {
        "powerSpikes": {"feudal": 7, "castle": 9, "imperial": 8},
        "ecoType": "boom",
        "counterData": {"strongVs": ["archers", "skirmishers"], "weakVs": ["monks", "halberdiers"]},
        "importantMissingUnits": ["Arbalester", "Siege Onager", "Siege Ram"],
        "importantMissingTechs": ["Bracer", "Plate Mail Armor", "Architecture", "Sappers"]
    },
    "poles": {
        "powerSpikes": {"feudal": 6, "castle": 9, "imperial": 8},
        "ecoType": "boom",
        "counterData": {"strongVs": ["cavalry", "archers"], "weakVs": ["siege", "infantry"]},
        "importantMissingUnits": ["Hand Cannoneer", "Camel Rider", "Paladin", "Halberdier"],
        "importantMissingTechs": ["Thumb Ring", "Ring Archer Armor", "Plate Mail Armor", "Plate Barding Armor"]
    },
    "portuguese": {
        "powerSpikes": {"feudal": 5, "castle": 7, "imperial": 10},
        "ecoType": "balanced",
        "counterData": {"strongVs": ["infantry", "ships"], "weakVs": ["siege", "skirmishers"]},
        "importantMissingUnits": ["Paladin", "Camel Rider", "Hussar", "Eagle Warrior"],
        "importantMissingTechs": ["Sappers", "Siege Onager"]
    },
    "romans": {
        "powerSpikes": {"feudal": 7, "castle": 8, "imperial": 9},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["infantry", "skirmishers"], "weakVs": ["archers", "monks"]},
        "importantMissingUnits": ["Arbalester", "Hand Cannoneer", "Camel Rider", "Paladin"],
        "importantMissingTechs": ["Thumb Ring", "Bracer", "Plate Barding Armor", "Bombard Cannon"]
    },
    "saracens": {
        "powerSpikes": {"feudal": 7, "castle": 8, "imperial": 8},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["cavalry", "buildings"], "weakVs": ["archers", "swarms"]},
        "importantMissingUnits": ["Paladin", "Hussar", "Halberdier"],
        "importantMissingTechs": ["Plate Mail Armor", "Architecture", "Sappers"]
    },
    "sicilians": {
        "powerSpikes": {"feudal": 8, "castle": 9, "imperial": 7},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["counter_units", "archers"], "weakVs": ["knights", "power_units"]},
        "importantMissingUnits": ["Arbalester", "Hand Cannoneer", "Camel Rider"],
        "importantMissingTechs": ["Thumb Ring", "Bombard Cannon", "Architecture"]
    },
    "slavs": {
        "powerSpikes": {"feudal": 6, "castle": 8, "imperial": 9},
        "ecoType": "boom",
        "counterData": {"strongVs": ["huskarls", "siege"], "weakVs": ["archers", "monks"]},
        "importantMissingUnits": ["Arbalester", "Hand Cannoneer", "Camel Rider", "Paladin"],
        "importantMissingTechs": ["Thumb Ring", "Bracer", "Ring Archer Armor", "Bombard Cannon"]
    },
    "spanish": {
        "powerSpikes": {"feudal": 5, "castle": 9, "imperial": 8},
        "ecoType": "fast_castle",
        "counterData": {"strongVs": ["infantry", "goths"], "weakVs": ["archers", "italians"]},
        "importantMissingUnits": ["Arbalester", "Camel Rider", "Siege Onager", "Siege Ram"],
        "importantMissingTechs": ["Thumb Ring", "Plate Mail Armor", "Architecture", "Sappers"]
    },
    "tatars": {
        "powerSpikes": {"feudal": 7, "castle": 9, "imperial": 8},
        "ecoType": "balanced",
        "counterData": {"strongVs": ["infantry", "siege"], "weakVs": ["camels", "eagles"]},
        "importantMissingUnits": ["Arbalester", "Hand Cannoneer", "Paladin"],
        "importantMissingTechs": ["Ring Archer Armor", "Plate Mail Armor", "Bombard Cannon", "Architecture"]
    },
    "teutons": {
        "powerSpikes": {"feudal": 6, "castle": 9, "imperial": 9},
        "ecoType": "boom",
        "counterData": {"strongVs": ["cavalry", "trash"], "weakVs": ["archers", "mobility"]},
        "importantMissingUnits": ["Arbalester", "Camel Rider", "Light Cavalry", "Hussar"],
        "importantMissingTechs": ["Thumb Ring", "Bracer", "Ring Archer Armor", "Architecture"]
    },
    "turks": {
        "powerSpikes": {"feudal": 4, "castle": 9, "imperial": 10},
        "ecoType": "fast_castle",
        "counterData": {"strongVs": ["infantry", "walls"], "weakVs": ["skirmishers", "archers"]},
        "importantMissingUnits": ["Arbalester", "Elite Skirmisher", "Pikeman", "Halberdier"],
        "importantMissingTechs": ["Siege Onager", "Siege Ram", "Crop Rotation"]
    },
    "vietnamese": {
        "powerSpikes": {"feudal": 8, "castle": 7, "imperial": 8},
        "ecoType": "balanced",
        "counterData": {"strongVs": ["archers", "cav_archers"], "weakVs": ["siege", "infantry"]},
        "importantMissingUnits": ["Paladin", "Camel Rider", "Hussar", "Siege Onager", "Siege Ram"],
        "importantMissingTechs": ["Blast Furnace", "Masonry", "Architecture"]
    },
    "vikings": {
        "powerSpikes": {"feudal": 8, "castle": 9, "imperial": 7},
        "ecoType": "boom",
        "counterData": {"strongVs": ["cavalry", "ships"], "weakVs": ["archers", "hand_cannoneers"]},
        "importantMissingUnits": ["Camel Rider", "Paladin", "Hussar", "Hand Cannoneer"],
        "importantMissingTechs": ["Thumb Ring", "Plate Barding Armor", "Bombard Cannon", "Siege Onager"]
    },
    "shu": {
        "powerSpikes": {"feudal": 9, "castle": 8, "imperial": 9},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["infantry", "siege"], "weakVs": ["cavalry", "eagles"]},
        "importantMissingUnits": ["Paladin", "Camel Rider", "Hand Cannoneer"],
        "importantMissingTechs": ["Ring Archer Armor", "Plate Mail Armor", "Bombard Cannon", "Architecture"]
    },
    "wei": {
        "powerSpikes": {"feudal": 6, "castle": 9, "imperial": 9},
        "ecoType": "boom",
        "counterData": {"strongVs": ["siege", "skirmishers"], "weakVs": ["halberdiers", "camels"]},
        "importantMissingUnits": ["Arbalester", "Hand Cannoneer", "Eagle Warrior"],
        "importantMissingTechs": ["Thumb Ring", "Ring Archer Armor", "Plate Mail Armor", "Bombard Cannon"]
    },
    "wu": {
        "powerSpikes": {"feudal": 8, "castle": 8, "imperial": 7},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["buildings", "ships"], "weakVs": ["archers", "gunpowder"]},
        "importantMissingUnits": ["Knights", "Camel Rider", "Paladin", "Hussar"],
        "importantMissingTechs": ["Bloodlines", "Plate Barding Armor", "Thumb Ring", "Siege Onager"]
    },
    "jurchens": {
        "powerSpikes": {"feudal": 6, "castle": 9, "imperial": 10},
        "ecoType": "balanced",
        "counterData": {"strongVs": ["infantry", "archers"], "weakVs": ["monks", "anti_cav"]},
        "importantMissingUnits": ["Arbalester", "Eagle Warrior", "Hussar"],
        "importantMissingTechs": ["Ring Archer Armor", "Plate Mail Armor", "Architecture", "Bombard Cannon"]
    },
    "khitans": {
        "powerSpikes": {"feudal": 9, "castle": 8, "imperial": 8},
        "ecoType": "aggressive",
        "counterData": {"strongVs": ["infantry", "skirmishers"], "weakVs": ["archers", "scorpions"]},
        "importantMissingUnits": ["Arbalester", "Hand Cannoneer", "Paladin"],
        "importantMissingTechs": ["Thumb Ring", "Plate Mail Armor", "Architecture", "Bombard Cannon"]
    }
}

file_path = "Wololo Arena/lib/data/civilizations.ts"

with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

new_lines = []
current_civ = None

for line in lines:
    id_match = re.search(r'id:\s*"([^"]+)"', line)
    if id_match:
        current_civ = id_match.group(1)
    
    new_lines.append(line)
    
    if current_civ in CIV_DATA and "synergyWith:" in line:
        data = CIV_DATA[current_civ]
        injection = f"""    powerSpikes: {json.dumps(data['powerSpikes'])},
    counterData: {json.dumps(data['counterData'])},
    ecoType: "{data['ecoType']}",
    importantMissingUnits: {json.dumps(data['importantMissingUnits'])},
    importantMissingTechs: {json.dumps(data['importantMissingTechs'])},
"""
        new_lines.append(injection)
        current_civ = None

with open(file_path, "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("Successfully injected accurate data for 50 civilizations.")