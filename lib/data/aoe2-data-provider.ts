import fullData from './aoe2-data.json';

// Type definitions based on the SiegeEngineers data structure
interface Aoe2Data {
    civ_names: Record<string, string>;
    civ_helptexts: Record<string, string>;
    techtrees: Record<string, CivTechTree>;
    data: {
        buildings: Record<string, EntityData>;
        units: Record<string, EntityData>;
        techs: Record<string, EntityData>;
    };
    meta: any;
}

interface CivTechTree {
    buildings: number[];
    units: number[];
    techs: number[];
    unique: {
        castleAgeUniqueUnit: number;
        imperialAgeUniqueUnit: number;
        castleAgeUniqueTech: number;
        imperialAgeUniqueTech: number;
    };
}

interface EntityData {
    internal_name: string;
    ID: number;
    Cost: {
        Food?: number;
        Wood?: number;
        Gold?: number;
        Stone?: number;
    };
    HP?: number;
    Attack?: number;
    MeleeArmor?: number;
    PierceArmor?: number;
    Range?: number;
    LineOfSight?: number;
    Speed?: number;
    ReloadTime?: number;
    TrainTime?: number;
    AttackDelay?: number;
    FrameDelay?: number;
}

const DATA = fullData as unknown as Aoe2Data;

// --- PUBLIC API ---

/**
 * Checks if a specific tech/unit/building ID is available for a civilization.
 */
export function isIdAvailable(civName: string, id: string | number, type: 'unit' | 'tech' | 'building' | 'unique_unit' | 'unique_tech'): boolean {
    // Map lowercase app names to capitalized JSON keys
    const civKey = civName.charAt(0).toUpperCase() + civName.slice(1).toLowerCase();
    const tree = DATA.techtrees[civKey];
    
    if (!tree) return true; 

    // Extract numeric ID
    let numId = typeof id === 'string' ? parseInt(id.replace('b_', '').replace('_tech', '').replace('_sie', '').replace('_ship', '').replace('_farm', ''), 10) : id;
    if (isNaN(numId)) return true;

    // Strict category check to avoid ID collisions
    // The official JSON uses arrays of objects like [{ age: 1, id: 12 }, ...]
    if (type === 'building') return tree.buildings.some((b: any) => b.id === numId);
    if (type === 'unit' || type === 'unique_unit') return tree.units.some((u: any) => u.id === numId);
    if (type === 'tech' || type === 'unique_tech') return tree.techs.some((t: any) => t.id === numId);

    return true;
}

/**
 * Retrieves the full statistics for a unit, building, or technology.
 */
export function getEntityStats(id: string | number): EntityData | null {
    const numId = typeof id === 'string' ? parseInt(id.replace('b_', ''), 10) : id;
    
    if (DATA.data.units[numId]) return DATA.data.units[numId];
    if (DATA.data.buildings[numId]) return DATA.data.buildings[numId];
    if (DATA.data.techs[numId]) return DATA.data.techs[numId];
    
    return null;
}

/**
 * Gets the Unique Unit ID for a civ (Castle Age or Imperial Age).
 */
export function getUniqueUnitId(civName: string, elite: boolean = false): number | null {
    const civKey = civName.toLowerCase();
    const tree = DATA.techtrees[civKey];
    if (!tree) return null;
    return elite ? tree.unique.imperialAgeUniqueUnit : tree.unique.castleAgeUniqueUnit;
}

/**
 * Gets the Unique Tech ID for a civ (Castle or Imperial).
 */
export function getUniqueTechId(civName: string, imperial: boolean = false): number | null {
    const civKey = civName.toLowerCase();
    const tree = DATA.techtrees[civKey];
    if (!tree) return null;
    return imperial ? tree.unique.imperialAgeUniqueTech : tree.unique.castleAgeUniqueTech;
}
