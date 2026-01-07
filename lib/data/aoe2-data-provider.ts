
import fullData from './aoe2-data.json';

interface Aoe2Data {
    civ_names: Record<string, string>;
    techtrees: Record<string, CivTechTree>;
    data: {
        buildings: Record<string, any>;
        units: Record<string, any>;
        techs: Record<string, any>;
    };
}

interface CivTechTree {
    buildings: { id: number, age: number }[];
    units: { id: number, age: number }[];
    techs: { id: number, age: number }[];
    unique: {
        castleAgeUniqueUnit: number;
        imperialAgeUniqueUnit: number;
        castleAgeUniqueTech: number;
        imperialAgeUniqueTech: number;
    };
}

const DATA = fullData as unknown as Aoe2Data;

/**
 * Gets the availability AND the actual age of a unit/tech for a specific civ.
 */
export function getEntityAvailability(civName: string, id: string | number, type: string): { available: boolean, age: number | null } {
    const civKey = civName.charAt(0).toUpperCase() + civName.slice(1).toLowerCase();
    const tree = DATA.techtrees[civKey];
    
    if (!tree) return { available: true, age: null };

    let numId = typeof id === 'string' ? parseInt(id.replace('b_', '').replace('_tech', '').replace('_sie', '').replace('_ship', '').replace('_farm', ''), 10) : id;
    if (isNaN(numId)) return { available: true, age: null };

    // 1. Unique Units/Techs
    if (Object.values(tree.unique).includes(numId)) {
        const isElite = numId === tree.unique.imperialAgeUniqueUnit;
        const isImperialTech = numId === tree.unique.imperialAgeUniqueTech;
        return { available: true, age: (isElite || isImperialTech) ? 4 : 3 };
    }

    // 2. Check in specific arrays
    const findIn = (arr: { id: number, age: number }[]) => arr.find(i => i.id === numId);

    if (type === 'building') {
        const b = findIn(tree.buildings) || findIn(tree.units as any); // Some unique buildings are in units
        return { available: !!b, age: b ? b.age : null };
    }

    if (type.includes('unit')) {
        const u = findIn(tree.units);
        return { available: !!u, age: u ? u.age : null };
    }

    if (type.includes('tech')) {
        const t = findIn(tree.techs);
        return { available: !!t, age: t ? t.age : null };
    }

    return { available: true, age: null };
}

export function isIdAvailable(civName: string, id: string | number, type: string): boolean {
    return getEntityAvailability(civName, id, type).available;
}

export function getEntityStats(id: string | number): any | null {
    const numId = typeof id === 'string' ? parseInt(id.replace('b_', ''), 10) : id;
    return DATA.data.units[numId] || DATA.data.buildings[numId] || DATA.data.techs[numId] || null;
}

export function getUniqueUnitId(civName: string, elite: boolean = false): number | null {
    const civKey = civName.charAt(0).toUpperCase() + civName.slice(1).toLowerCase();
    const tree = DATA.techtrees[civKey];
    return tree ? (elite ? tree.unique.imperialAgeUniqueUnit : tree.unique.castleAgeUniqueUnit) : null;
}

export function getUniqueTechId(civName: string, imperial: boolean = false): number | null {
    const civKey = civName.charAt(0).toUpperCase() + civName.slice(1).toLowerCase();
    const tree = DATA.techtrees[civKey];
    return tree ? (imperial ? tree.unique.imperialAgeUniqueTech : tree.unique.castleAgeUniqueTech) : null;
}
