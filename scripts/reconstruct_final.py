import os

def run():
    SHIELD_MAP = {
        "armenians": "armenios.png", "aztecs": "aztecas.png", "bengalis": "bengali.png", "berbers": "berbers.png", 
        "bohemians": "bohemios.png", "britons": "bretones.png", "bulgarians": "bulgaros.png", "burgundians": "borgonones.png", 
        "burmese": "burmese.png", "byzantines": "bizantinos.png", "celts": "celtas.png", "chinese": "chinos.png", 
        "cumans": "cumanos.png", "dravidians": "dravidianos.png", "ethiopians": "etiopes.png", "franks": "francos.png", 
        "georgians": "georgianos.png", "goths": "gotos.png", "gurjaras": "gurjaras.png", "hindustanis": "indostanies.png", 
        "huns": "hunos.png", "incas": "incas.png", "italians": "italianos.png", "japanese": "japoneses.png", 
        "khmer": "jemeres.png", "koreans": "coreanos.png", "lithuanians": "lituanos.png", "magyars": "magiares.png", 
        "malay": "malay.png", "malians": "malies.png", "mayans": "mayas.png", "mongols": "mongoles.png", 
        "persians": "persas.png", "poles": "polacos.png", "portuguese": "portugueses.png", "romans": "romanos.png", 
        "saracens": "sarracenos.png", "sicilians": "sicilianos.png", "slavs": "eslavos.png", "spanish": "espanoles.png", 
        "tatars": "tartaros.png", "teutons": "teutones.png", "turks": "turcos.png", "vietnamese": "vietnamitas.png", 
        "vikings": "vikingos.png", "shu": "shu.png", "wei": "wei.png", "wu": "wu.png", "jurchens": "jurchens.png", 
        "khitans": "khitans.png"
    }

    CIVS = [
        ("armenians", "Armenians", "dlc", "Infantry & Naval"), ("aztecs", "Aztecs", "conquerors", "Infantry & Monks"),
        ("bengalis", "Bengalis", "dynasties", "Elephants & Navy"), ("berbers", "Berbers", "african", "Cavalry & Navy"),
        ("bohemians", "Bohemians", "dlc", "Monks & Gunpowder"), ("britons", "Britons", "base", "Archers"),
        ("bulgarians", "Bulgarians", "dlc", "Infantry & Cavalry"), ("burgundians", "Burgundians", "dlc", "Cavalry"),
        ("burmese", "Burmese", "rajas", "Monks & Elephants"), ("byzantines", "Byzantines", "base", "Defense"),
        ("celts", "Celts", "base", "Infantry & Siege"), ("chinese", "Chinese", "base", "Archers"),
        ("cumans", "Cumans", "dlc", "Cavalry"), ("dravidians", "Dravidians", "dynasties", "Infantry & Navy"),
        ("ethiopians", "Ethiopians", "african", "Archers & Siege"), ("franks", "Franks", "base", "Cavalry"),
        ("georgians", "Georgians", "dlc", "Cavalry & Defense"), ("goths", "Goths", "base", "Infantry"),
        ("gurjaras", "Gurjaras", "dynasties", "Cavalry & Camels"), ("hindustanis", "Hindustanis", "dynasties", "Gunpowder & Camels"),
        ("huns", "Huns", "conquerors", "Cavalry"), ("incas", "Incas", "forgotten", "Infantry"),
        ("italians", "Italians", "forgotten", "Archers & Navy"), ("japanese", "Japanese", "base", "Infantry"),
        ("khmer", "Khmer", "rajas", "Elephants & Siege"), ("koreans", "Koreans", "conquerors", "Towers & Navy"),
        ("lithuanians", "Lithuanians", "dlc", "Cavalry & Monks"), ("magyars", "Magyars", "forgotten", "Cavalry"),
        ("malay", "Malay", "rajas", "Navy & Elephants"), ("malians", "Malians", "african", "Infantry"),
        ("mayans", "Mayans", "conquerors", "Archers"), ("mongols", "Mongols", "base", "Cavalry Archers"),
        ("persians", "Persians", "base", "Cavalry"), ("poles", "Poles", "dlc", "Cavalry"),
        ("portuguese", "Portuguese", "african", "Navy & Gunpowder"), ("romans", "Romans", "dlc", "Infantry"),
        ("saracens", "Saracens", "base", "Camels & Navy"), ("sicilians", "Sicilians", "dlc", "Cavalry"),
        ("slavs", "Slavs", "forgotten", "Infantry & Siege"), ("spanish", "Spanish", "conquerors", "Gunpowder & Monks"),
        ("tatars", "Tatars", "dlc", "Cavalry Archers"), ("teutons", "Teutons", "base", "Infantry"),
        ("turks", "Turks", "base", "Gunpowder"), ("vietnamese", "Vietnamese", "rajas", "Archers"),
        ("vikings", "Vikings", "base", "Infantry & Navy"), ("shu", "Shu", "dynasties", "Archers & Siege"),
        ("wei", "Wei", "dynasties", "Cavalry"), ("wu", "Wu", "dynasties", "Infantry & Naval"),
        ("jurchens", "Jurchens", "dynasties", "Cavalry & Gunpowder"), ("khitans", "Khitans", "dynasties", "Infantry & Cavalry")
    ]

    header = """export interface TeamRatings {\n  economy: number;\n  rush: number;\n  lateGame: number;\n  defense: number;\n  mobility: number;\n}\n\nexport interface CivilizationBonus {\n  type: \"economy\" | \"military\" | \"defense\" | \"utility\";\n  description: string;\n}\n\nexport interface TechMatrix {\n  arbalester: boolean;\n  thumbRing: boolean;\n  bracer: boolean;\n  parthianTactics: boolean;\n  paladin: boolean;\n  bloodlines: boolean;\n  plateBarding: boolean;\n  hussar: boolean;\n  champion: boolean;\n  halberdier: boolean;\n  plateMail: boolean;\n  siegeEngineers: boolean;\n  bombardCannon: boolean;\n  siegeOnager: boolean;\n  cropRotation: boolean;\n  guilds: boolean;\n  twoManSaw: boolean;\n}\n\nexport interface Civilization {\n  id: string;\n  name: string;\n  expansion: \"base\" | \"conquerors\" | \"forgotten\" | \"african\" | \"rajas\" | \"dlc\" | \"dynasties\";\n  specialty: string;\n  icon: string;\n  teamBonus: string;\n  bonuses: CivilizationBonus[];\n  synergyTags: string[];\n  strengths: string[];\n  weaknesses: string[];\n  bestPositions: (\"flank\" | \"pocket\")[];\n  synergyWith: string[];\n  ratings: TeamRatings;\n  powerSpikes: { feudal: number; castle: number; imperial: number };\n  techMatrix: TechMatrix;\n}\n\nconst DEFAULT_TECH: TechMatrix = {\n  arbalester: true, thumbRing: true, bracer: true, parthianTactics: false,\n  paladin: false, bloodlines: true, plateBarding: true, hussar: true,\n  champion: true, halberdier: true, plateMail: true,\n  siegeEngineers: true, bombardCannon: true, siegeOnager: false,\n  cropRotation: true, guilds: true, twoManSaw: true\n};\n\nexport const CIVILIZATIONS: Civilization[] = [\n"

    with open('lib/data/civilizations.ts', 'w', encoding='utf-8') as f:
        f.write(header)
        for i, (cid, name, exp, spec) in enumerate(CIVS):
            shield = SHIELD_MAP.get(cid, cid + ".png")
            pos = "pocket" if "Cavalry" in spec else "flank"
            f.write('  {\n')
            f.write(f'    id: "{cid}",\n')
            f.write(f'    name: "{name}",\n')
            f.write(f'    expansion: "{exp}",\n')
            f.write(f'    specialty: "{spec}",\n')
            f.write(f'    icon: "/images/civs/{shield}",\n')
            f.write('    teamBonus: "Team Bonus",\n')
            f.write('    bonuses: [{ type: "military", description: "Strategic data" }],\n')
            f.write(f'    synergyTags: ["{spec.split(" ")[0].lower()}"],\n')
            f.write(f'    strengths: ["{spec}"],\n')
            f.write('    weaknesses: ["Strategic vulnerabilities"],\n')
            f.write(f'    bestPositions: ["{pos}"],\n')
            f.write('    synergyWith: [],\n')
            f.write('    ratings: { economy: 7, rush: 7, lateGame: 7, defense: 7, mobility: 7 },\n')
            f.write('    powerSpikes: { feudal: 7, castle: 7, imperial: 7 },\n')
            f.write('    techMatrix: { ...DEFAULT_TECH }\n')
            if i < len(CIVS)-1:
                f.write('  },\n')
            else:
                f.write('  }\n')
        f.write(