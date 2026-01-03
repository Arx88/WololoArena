
const d = require('./Wololo Arena/lib/data/aoe2-data.json');
const units = d.data.units;
const techs = d.data.techs;
const buildings = d.data.buildings;

// Helper to find ID by internal name
function findUnitId(name) {
    for (let k in units) if (units[k].internal_name === name) return k;
    return null;
}

function findTechId(name) {
    for (let k in techs) if (techs[k].internal_name === name) return k;
    return null;
}

// Map the correct IDs from this specific JSON
const MAP = {
    // Units
    MILITIA: "74", // SPRMN? Yes, cost 50/20
    MAA: "75",
    LS: "77",
    THS: "473",
    CHAMP: "567",
    SPEAR: "93", // PKEMN?
    PIKE: "358",
    HALB: "359",
    ARCHER: "4",
    XBOW: "24",
    ARB: "492",
    SKIRM: "6",
    ESKIRM: "7",
    CA: "39",
    HCA: "474", // HCVAR? Let's check HCVAR stats
    HC: "5",
    SCOUT: "448",
    LTCAV: "546",
    HUSSAR: "441",
    KNIGHT: "38",
    CAVALIER: "283",
    PALADIN: "569",
    CAMEL: "329",
    HCAMEL: "330",
    RAM: "1258", // BTRAM?
    CAPPED: "422",
    SGRAM: "548",
    MANGO: "280",
    ONAGER: "550",
    SNAGR: "588",
    SCORP: "279",
    HSCORP: "542",
    BBC: "36",
    TREB: "331", // PTREB?
    PETARD: "440",
    VILLAGER: "83",
    
    // Buildings
    B_BARRACKS: "12",
    B_ARCHERY: "87",
    B_STABLE: "101",
    B_SIEGE: "49",
    B_DOCK: "45",
    B_CASTLE: "82",
    B_TC: "109",
    B_MARKET: "84",
    B_MILL: "68",
    B_LUMBER: "562",
    B_MINING: "584",
    B_UNIVERSITY: "209",
    B_MONASTERY: "104",
    B_BLACKSMITH: "19"
};

// Check 474 stats
console.log('ID 474:', units[474].internal_name); // HCVAR = Heavy Cav Archer?
console.log('ID 441:', units[441].internal_name); // HUSSAR?
console.log('ID 546:', units[546].internal_name); // LTCAV?
console.log('ID 1258:', units[1258].internal_name); // BTRAM?
