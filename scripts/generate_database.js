const fs = require('fs');
const data = require('../lib/data/aoe2-data.json');

const unitDatabase = {};

const NAME_MAP = {
    "JAGUAR": "Jaguar Warrior",
    "LNGBW": "Longbowman",
    "TKNIT": "Teutonic Knight",
    "CHUKN": "Chu Ko Nu",
    "GBETO": "Gbeto",
    "SHOTEL": "Shotel Warrior",
    "ARAMBAI": "Arambai",
    "RATAN": "Rattan Archer",
    "BATELE": "Battle Elephant",
    "KONNIK": "Konnik",
    "KESHIK": "Keshik",
    "KIPCHAK": "Kipchak",
    "LEITIS": "Leitis",
    "SERJEANT": "Serjeant",
    "OBUCH": "Obuch",
    "HUSSITEWAGON": "Hussite Wagon",
    "URUMI": "Urumi Swordsman",
    "RATHA": "Ratha",
    "CHAKRAM": "Chakram Thrower",
    "GHULAM": "Ghulam",
    "SHRIVAMSHA": "Shrivamsha Rider",
    "CAMELSC": "Camel Scout",
    "CENTURION": "Centurion",
    "LEGIONARY": "Legionary",
    "COMPBOW": "Composite Bowman",
    "MONASPA": "Monaspa",
    "WARRIORPRIEST": "Warrior Priest",
    "SAVAR": "Savar",
    "IRONPAG": "Iron Pagoda",
    "WARGA": "War Galley",
    "WARGA_E": "Elite War Galley",
    "TARKAN": "Tarkan",
    "PLUME": "Plumed Archer",
    "CONQI": "Conquistador",
    "WAGON": "War Wagon",
    "TURTL": "Turtle Ship",
    "GENOE": "Genoese Crossbowman",
    "MAGYX": "Magyar Huszar",
    "ELEA": "Elephant Archer",
    "BOYA": "Boyar",
    "KAMAY": "Kamayuk",
    "CONDO": "Condottiero",
    "ORGAN": "Organ Gun",
    "CARAV": "Caravel",
    "CAMAR": "Camel Archer",
    "GENITO": "Genitour",
    "MAMEL": "Mameluke",
    "CATAP": "Cataphract",
    "GBRSK": "Berserk",
    "JANNI": "Janissary"
};

const DESC_MAP = {
    "Jaguar Warrior": "Aztec unique infantry unit. Strong vs other infantry.",
    "Longbowman": "British unique archer unit. Longest range in the game.",
    "Teutonic Knight": "Teuton unique infantry unit. Slow but incredibly powerful armor.",
    "Chu Ko Nu": "Chinese unique archer unit. Fires multiple arrows.",
    "Conquistador": "Spanish unique mounted gunpowder unit. Powerful at short range.",
    "Mameluke": "Saracen unique camel unit. Throws scimitars at distance.",
    "Cataphract": "Byzantine unique cavalry unit. Strong vs infantry.",
    "Berserk": "Viking unique infantry unit. Regenerates health over time.",
    "Janissary": "Turkish unique gunpowder unit. High damage and range.",
    "War Elephant": "Persian unique unit. Massive HP and trample damage.",
    "Samurai": "Japanese unique infantry. Attacks very fast and strong vs unique units.",
    "Mangudai": "Mongol unique horse archer. High fire rate and strong vs siege.",
    "Woad Raider": "Celt unique infantry. Very fast moving unit.",
    "Throwing Axeman": "Frank unique infantry. Ranged melee attack.",
    "Huskarl": "Goth unique infantry. Extremely high pierce armor.",
    "Longboat": "Viking unique ship. Fires multiple arrows.",
    "Turtle Ship": "Korean unique ship. Slow but heavily armored.",
    "War Wagon": "Korean unique horse archer. High HP and armor."
};

for (let id in data.data.units) {
    const u = data.data.units[id];
    let name = NAME_MAP[u.internal_name] || u.internal_name;
    if (u.internal_name.startsWith('U') && NAME_MAP[u.internal_name.substring(1)]) {
        name = "Elite " + NAME_MAP[u.internal_name.substring(1)];
    }
    
    unitDatabase[id] = {
        name: name,
        hp: u.HP,
        attack: u.Attack,
        cost: u.Cost,
        description: DESC_MAP[name] || `Official AoE2 ${name} statistics.`,
        upgrades: []
    };
}

for (let id in data.data.techs) {
    const t = data.data.techs[id];
    unitDatabase[id] = {
        name: t.internal_name.replace(/_/g, ' '),
        description: `Research ${t.internal_name.replace(/_/g, ' ')}.`,
        cost: t.Cost
    };
}

const content = `
/* AUTO-GENERATED DATABASE FROM OFFICIAL DATA - ENHANCED */
export const UNIT_DATABASE: Record<string, any> = ${JSON.stringify(unitDatabase, null, 2)};
`;

fs.writeFileSync('./Wololo Arena/components/techtree/unit-database.ts', content);
console.log('Successfully generated enhanced unit-database.ts');