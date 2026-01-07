
/**
 * AOE2 DYNAMIC COST CALCULATOR
 * Applies civilization-specific bonuses to unit/tech costs.
 */

export interface ResourceCost {
    Food?: number;
    Wood?: number;
    Gold?: number;
    Stone?: number;
}

export function calculateDynamicCost(civName: string, baseCost: any, unitId: string): ResourceCost {
    if (!baseCost) return {};
    
    let cost: ResourceCost = {
        Food: baseCost.Food || 0,
        Wood: baseCost.Wood || 0,
        Gold: baseCost.Gold || 0,
        Stone: baseCost.Stone || 0
    };

    const civ = civName.charAt(0).toUpperCase() + civName.slice(1).toLowerCase();
    const id = unitId.toString().replace('b_', '');

    // 1. MAYANS: Archers cost -10% Feudal, -20% Castle, -30% Imperial
    const archerIds = ["4", "24", "492", "39", "474", "73", "559"]; // Archer, Xbow, Arbalester, CA, HCA, Chu Ko Nu...
    if (civ === "Mayans" && archerIds.includes(id)) {
        const discount = 0.7; // Assuming Imperial for simplicity or current age logic
        applyDiscount(cost, discount);
    }

    // 2. GOTHS: Infantry cost -20% starting in Feudal, -25% Castle, -35% Imperial
    const infantryIds = ["74", "75", "77", "473", "567", "93", "358", "359", "725", "726", "882", "1699"];
    if (civ === "Goths" && infantryIds.includes(id)) {
        const discount = 0.65; // -35% Imperial
        applyDiscount(cost, discount);
    }

    // 3. BERBERS: Stable units cost -15% Castle, -20% Imperial
    const stableIds = ["448", "546", "441", "38", "283", "569", "329", "330", "1132", "1134", "1370", "1372"];
    if (civ === "Berbers" && stableIds.includes(id)) {
        const discount = 0.8; // -20% Imperial
        applyDiscount(cost, discount);
    }

    // 4. PORTUGUESE: All units cost -20% Gold
    if (civ === "Portuguese" && cost.Gold) {
        cost.Gold = Math.floor(cost.Gold * 0.8);
    }

    // 5. HUNS: Cavalry Archers cost -10% Castle, -20% Imperial
    if (civ === "Huns" && ["39", "474"].includes(id)) {
        applyDiscount(cost, 0.8);
    }

    // 6. MAGYARS: Scout-line costs -15%
    if (civ === "Magyars" && ["448", "546", "441"].includes(id)) {
        applyDiscount(cost, 0.85);
    }

    // 7. TEUTONS: Farms cost -40%
    if (civ === "Teutons" && id === "50") {
        cost.Wood = Math.floor((cost.Wood || 60) * 0.6);
    }

    // 8. BENGALIS: Elephants take -25% less damage (not cost, ignoring)
    
    // 9. MALAY: Elephants cost -30% / -40%
    if (civ === "Malay" && ["1132", "1134"].includes(id)) {
        applyDiscount(cost, 0.6);
    }

    // 10. INCAS: Military units cost -15/20/25/30% food (Historical patches vary, using DE standard)
    // Actually Incas have cheap food for all military units.
    if (civ === "Incas" && (archerIds.includes(id) || infantryIds.includes(id) || id === "185")) {
        if (cost.Food) cost.Food = Math.floor(cost.Food * 0.85);
    }

    return cost;
}

function applyDiscount(cost: ResourceCost, multiplier: number) {
    if (cost.Food) cost.Food = Math.floor(cost.Food * multiplier);
    if (cost.Wood) cost.Wood = Math.floor(cost.Wood * multiplier);
    if (cost.Gold) cost.Gold = Math.floor(cost.Gold * multiplier);
    if (cost.Stone) cost.Stone = Math.floor(cost.Stone * multiplier);
}
