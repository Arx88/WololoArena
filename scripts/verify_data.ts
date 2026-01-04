
import { getEntityStats, isIdAvailable, getUniqueUnitId } from '../lib/data/aoe2-data-provider';
import { CIVILIZATIONS } from '../lib/data/civilizations';

console.log("--- Verification Script ---");

const civName = "Britons";
const longbowmanId = 8; // Known ID for Longbowman

console.log(`Checking availability for ${civName}, Unit ID ${longbowmanId}...`);
const isAvailable = isIdAvailable(civName, longbowmanId, 'unit');
console.log(`Is Available: ${isAvailable}`);

console.log(`Getting Unique Unit ID for ${civName}...`);
const uuId = getUniqueUnitId(civName, false);
console.log(`Unique Unit ID (Castle): ${uuId}`);

const uuEliteId = getUniqueUnitId(civName, true);
console.log(`Unique Unit ID (Imperial): ${uuEliteId}`);

console.log(`Getting Entity Stats for ID ${longbowmanId}...`);
const stats = getEntityStats(longbowmanId);
if (stats) {
    console.log(`Stats found: Name=${stats.internal_name}, HP=${stats.HP}`);
} else {
    console.log("Stats NOT found via getEntityStats");
}

console.log("---------------------------");
