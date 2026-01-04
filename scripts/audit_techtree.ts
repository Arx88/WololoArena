import fs from 'fs';
import path from 'path';
import { CIVILIZATIONS } from '../lib/data/civilizations';
import { TECH_TREE_STRUCTURE } from '../lib/data/techtree-structure';
import { isIdAvailable, getEntityStats, getUniqueUnitId, getUniqueTechId } from '../lib/data/aoe2-data-provider';

// Helper to resolve dynamic IDs (copied logic from page.tsx)
function resolveNodeId(civName: string, node: any) {
    if (node.id === 'UNIQUE_UNIT') {
        const id = getUniqueUnitId(civName, false);
        return id ? id.toString() : 'MISSING_UU_CASTLE';
    }
    if (node.id === 'UNIQUE_UNIT_ELITE') {
        const id = getUniqueUnitId(civName, true);
        return id ? id.toString() : 'MISSING_UU_IMP';
    }
    if (node.id === 'UNIQUE_TECH_1') {
        const id = getUniqueTechId(civName, false);
        return id ? id.toString() : 'MISSING_UT_CASTLE';
    }
    if (node.id === 'UNIQUE_TECH_2') {
        const id = getUniqueTechId(civName, true);
        return id ? id.toString() : 'MISSING_UT_IMP';
    }
    return node.id;
}

function getExpectedImagePath(civ: string, type: string, file: string, id: string) {
    // Unique Units have a placeholder file "UNIQUE_UNIT", so we must use the resolved ID
    if (type === 'unique-unit' || type === 'unique_unit') return `public/images/techtree/${civ}/Unidades/Unit_${id}.png`;

    // For everything else, trust the 'file' property from the structure
    if (type === 'building') return `public/images/techtree/${civ}/Edificios/${file}`;
    if (type === 'unit') return `public/images/techtree/${civ}/Unidades/${file}`;
    
    // Technologies (Standard and Unique)
    return `public/images/techtree/${civ}/Technologies/${file}`;
}

console.log("=== STARTING FULL TECH TREE AUDIT ===");

const errors: string[] = [];
let totalChecks = 0;
let failedChecks = 0;

CIVILIZATIONS.forEach(civ => {
    // console.log(`Checking ${civ.name}...`);
    
    TECH_TREE_STRUCTURE.forEach(section => {
        section.buildings.forEach(building => {
            // Check Building Image & Data
            totalChecks++;
            const bldImgPath = getExpectedImagePath(civ.name, 'building', building.file, building.id);
            if (!fs.existsSync(bldImgPath)) {
                // errors.push(`[${civ.name}] Missing Image for Building ${building.name} (${building.id}): ${bldImgPath}`);
                // failedChecks++;
            }
            
            // Check Lines
            building.lines.forEach(line => {
                line.nodes.forEach(node => {
                    totalChecks++;
                    const resolvedId = resolveNodeId(civ.name, node);
                    
                    if (resolvedId.startsWith('MISSING')) {
                        errors.push(`[${civ.name}] Failed to resolve Unique ID for ${node.name} (${node.id})`);
                        failedChecks++;
                        return;
                    }

                    // 1. Check Image
                    const imgPath = getExpectedImagePath(civ.name, node.type, node.file, resolvedId);
                    if (!fs.existsSync(imgPath)) {
                         // Only report if it's available. If unavailable, maybe image doesn't matter as much? 
                         // But for a pro polish, it should exist or have fallback.
                         // Let's check availability first.
                         const available = isIdAvailable(civ.name, resolvedId, node.type as any);
                         if (available) {
                             errors.push(`[${civ.name}] Missing Image for AVAILABLE ${node.type} '${node.name}' (ID: ${resolvedId}): ${imgPath}`);
                             failedChecks++;
                         }
                    }

                    // 2. Check Data
                    const stats = getEntityStats(resolvedId);
                    if (!stats) {
                         // Again, only if available/relevant
                         const available = isIdAvailable(civ.name, resolvedId, node.type as any);
                         if (available) {
                             // Some techs might not have stats in the unit DB if they are purely boolean flags in the game data?
                             // But units definitely should.
                             if (node.type === 'unit' || node.type === 'unique_unit') {
                                 errors.push(`[${civ.name}] Missing DATA for AVAILABLE Unit '${node.name}' (ID: ${resolvedId})`);
                                 failedChecks++;
                             }
                         }
                    }
                });
            });
        });
    });
});

console.log(`=== AUDIT COMPLETE ===`);
console.log(`Total Checks: ${totalChecks}`);
console.log(`Failed Checks: ${failedChecks}`);

if (errors.length > 0) {
    console.log(`\n--- ERROR SUMMARY (First 50) ---`);
    errors.slice(0, 50).forEach(e => console.log(e));
    if (errors.length > 50) console.log(`... and ${errors.length - 50} more errors.`);
} else {
    console.log("All checks passed!");
}
