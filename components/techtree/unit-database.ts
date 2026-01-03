
/* GENERATED DATA FILE - AoE2 DE Stats - Enhanced */
export const UNIT_DATABASE: Record<string, any> = {
  // --- BARRACKS ---
  "74": { // Militia
    hp: 40, attack: 4, armor: 0, pierceArmor: 1, range: 0, los: 4, speed: 0.9, buildTime: "21s", cost: {"food": 60, "gold": 20}, 
    description: "Basic infantry sword unit.", upgrades: ["Supplies", "Blacksmith"], 
    advancedAttacks: [], advancedArmors: [{ value: 0, type: "Infantry" }] 
  },
  "75": { // Man-at-Arms
    hp: 45, attack: 6, armor: 0, pierceArmor: 1, range: 0, los: 4, speed: 0.9, buildTime: "21s", cost: {"food": 60, "gold": 20}, 
    description: "Improved militia. Strong vs buildings and eagle warriors.", upgrades: ["Supplies", "Squires", "Arson"], 
    advancedAttacks: [{ value: 2, type: "Eagle Warrior" }, { value: 2, type: "Building" }], advancedArmors: [{ value: 0, type: "Infantry" }] 
  },
  "77": { // Long Swordsman
    hp: 60, attack: 9, armor: 1, pierceArmor: 1, range: 0, los: 4, speed: 0.9, buildTime: "21s", cost: {"food": 60, "gold": 20}, 
    description: "Powerful mid-game infantry.", upgrades: ["Supplies", "Squires", "Arson"], 
    advancedAttacks: [{ value: 4, type: "Eagle Warrior" }, { value: 3, type: "Building" }], advancedArmors: [{ value: 0, type: "Infantry" }] 
  },
  "473": { // Two-Handed Swordsman
    hp: 60, attack: 12, armor: 0, pierceArmor: 1, range: 0, los: 5, speed: 0.9, buildTime: "21s", cost: {"food": 60, "gold": 20}, 
    description: "Advanced infantry. Devastating in close combat.", upgrades: ["Supplies", "Squires", "Arson"], 
    advancedAttacks: [{ value: 8, type: "Eagle Warrior" }, { value: 4, type: "Building" }], advancedArmors: [{ value: 0, type: "Infantry" }] 
  },
  "567": { // Champion
    hp: 70, attack: 13, armor: 1, pierceArmor: 1, range: 0, los: 5, speed: 0.9, buildTime: "21s", cost: {"food": 60, "gold": 20}, 
    description: "The ultimate infantry unit.", upgrades: ["Supplies", "Squires", "Arson"], 
    advancedAttacks: [{ value: 8, type: "Eagle Warrior" }, { value: 4, type: "Building" }], advancedArmors: [{ value: 0, type: "Infantry" }] 
  },
  "93": { // Spearman
    hp: 45, attack: 3, armor: 0, pierceArmor: 0, range: 0, los: 4, speed: 1.0, buildTime: "22s", cost: {"food": 25, "wood": 35}, 
    description: "Weak vs infantry, but lethal against cavalry.", upgrades: ["Squires", "Arson"], 
    advancedAttacks: [{ value: 15, type: "Cavalry" }, { value: 15, type: "War Elephant" }], advancedArmors: [{ value: 0, type: "Infantry" }] 
  },
  "358": { // Pikeman
    hp: 55, attack: 4, armor: 0, pierceArmor: 0, range: 0, los: 4, speed: 1.0, buildTime: "22s", cost: {"food": 25, "wood": 35}, 
    description: "Upgraded anti-cavalry unit.", upgrades: ["Squires", "Arson"], 
    advancedAttacks: [{ value: 22, type: "Cavalry" }, { value: 25, type: "War Elephant" }], advancedArmors: [{ value: 0, type: "Infantry" }] 
  },
  "359": { // Halberdier
    hp: 60, attack: 6, armor: 0, pierceArmor: 0, range: 0, los: 4, speed: 1.0, buildTime: "22s", cost: {"food": 25, "wood": 35}, 
    description: "The ultimate anti-cavalry infantry.", upgrades: ["Squires", "Arson"], 
    advancedAttacks: [{ value: 32, type: "Cavalry" }, { value: 28, type: "War Elephant" }], advancedArmors: [{ value: 0, type: "Infantry" }] 
  },
  "751": { // Eagle Scout
    hp: 50, attack: 4, armor: 0, pierceArmor: 2, range: 0, los: 6, speed: 1.1, buildTime: "35s", cost: {"food": 20, "gold": 50}, 
    description: "Fast infantry with good pierce armor. Available for Meso civs.", upgrades: ["Squires", "Arson"], 
    advancedAttacks: [], advancedArmors: [{ value: 0, type: "Infantry" }, { value: 0, type: "Eagle Warrior" }] 
  },
  "753": { // Eagle Warrior
    hp: 55, attack: 7, armor: 0, pierceArmor: 3, range: 0, los: 6, speed: 1.15, buildTime: "32s", cost: {"food": 20, "gold": 50}, 
    description: "Stronger Eagle. Good against archers.", upgrades: ["Squires", "Arson"], 
    advancedAttacks: [{ value: 3, type: "Cavalry" }], advancedArmors: [{ value: 0, type: "Infantry" }, { value: 0, type: "Eagle Warrior" }] 
  },
  "752": { // Elite Eagle Warrior
    hp: 60, attack: 9, armor: 0, pierceArmor: 4, range: 0, los: 6, speed: 1.3, buildTime: "20s", cost: {"food": 20, "gold": 50}, 
    description: "Fast anti-archer infantry. Excellent raider.", upgrades: ["Squires", "Arson"], 
    advancedAttacks: [{ value: 5, type: "Cavalry" }], advancedArmors: [{ value: 0, type: "Infantry" }, { value: 0, type: "Eagle Warrior" }] 
  },

  // --- ARCHERY RANGE ---
  "4": { // Archer
    hp: 30, attack: 4, armor: 0, pierceArmor: 0, range: 4, los: 6, speed: 0.96, buildTime: "35s", cost: {"wood": 25, "gold": 45}, 
    description: "Standard ranged unit. Weak vs cavalry and skirmishers.", upgrades: ["Thumb Ring", "Ballistics"], 
    advancedAttacks: [{ value: 3, type: "Spearman" }], advancedArmors: [{ value: 0, type: "Archer" }] 
  },
  "24": { // Crossbowman
    hp: 35, attack: 5, armor: 0, pierceArmor: 0, range: 5, los: 7, speed: 0.96, buildTime: "27s", cost: {"wood": 25, "gold": 45}, 
    description: "Improved ranged unit.", upgrades: ["Thumb Ring", "Ballistics"], 
    advancedAttacks: [{ value: 3, type: "Spearman" }], advancedArmors: [{ value: 0, type: "Archer" }] 
  },
  "492": { // Arbalester
    hp: 40, attack: 6, armor: 0, pierceArmor: 0, range: 5, los: 8, speed: 0.96, buildTime: "27s", cost: {"wood": 25, "gold": 45}, 
    description: "High-speed firing elite archer.", upgrades: ["Thumb Ring", "Ballistics"], 
    advancedAttacks: [{ value: 3, type: "Spearman" }], advancedArmors: [{ value: 0, type: "Archer" }] 
  },
  "6": { // Skirmisher
    hp: 30, attack: 2, armor: 0, pierceArmor: 3, range: 4, los: 6, speed: 0.96, buildTime: "22s", cost: {"food": 25, "wood": 35}, 
    description: "Anti-archer unit with high pierce armor.", upgrades: ["Ballistics"], 
    advancedAttacks: [{ value: 3, type: "Archer" }], advancedArmors: [{ value: 0, type: "Archer" }] 
  },
  "7": { // Elite Skirmisher
    hp: 35, attack: 3, armor: 0, pierceArmor: 4, range: 5, los: 7, speed: 0.96, buildTime: "22s", cost: {"food": 25, "wood": 35}, 
    description: "Improved anti-archer unit.", upgrades: ["Ballistics"], 
    advancedAttacks: [{ value: 4, type: "Archer" }], advancedArmors: [{ value: 0, type: "Archer" }] 
  },
  "39": { // Cavalry Archer
    hp: 50, attack: 6, armor: 0, pierceArmor: 0, range: 4, los: 5, speed: 1.4, buildTime: "34s", cost: {"wood": 40, "gold": 60}, 
    description: "Fast mounted archer. Hit and run specialist.", upgrades: ["Thumb Ring", "Parthian Tactics", "Bloodlines", "Husbandry"], 
    advancedAttacks: [{ value: 2, type: "Spearman" }], advancedArmors: [{ value: 0, type: "Archer" }, { value: 0, type: "Cavalry" }, { value: 0, type: "Cavalry Archer" }] 
  },
  "474": { // Heavy Cavalry Archer
    hp: 60, attack: 7, armor: 1, pierceArmor: 0, range: 4, los: 6, speed: 1.4, buildTime: "27s", cost: {"wood": 40, "gold": 60}, 
    description: "Elite mounted archer.", upgrades: ["Thumb Ring", "Parthian Tactics", "Bloodlines", "Husbandry"], 
    advancedAttacks: [{ value: 2, type: "Spearman" }], advancedArmors: [{ value: 0, type: "Archer" }, { value: 0, type: "Cavalry" }, { value: 0, type: "Cavalry Archer" }] 
  },
  "5": { // Hand Cannoneer
    hp: 35, attack: 17, armor: 1, pierceArmor: 0, range: 7, los: 9, speed: 0.96, buildTime: "34s", cost: {"food": 45, "gold": 50}, 
    description: "Powerful close range gunpowder unit. Anti-infantry.", upgrades: ["Archer Armor"], 
    advancedAttacks: [{ value: 10, type: "Infantry" }], advancedArmors: [{ value: 0, type: "Archer" }, { value: 0, type: "Gunpowder" }] 
  },

  // --- STABLE ---
  "448": { // Scout Cavalry
    hp: 45, attack: 3, armor: 0, pierceArmor: 2, range: 0, los: 4, speed: 1.2, buildTime: "30s", cost: {"food": 80}, 
    description: "Fast exploration unit. Auto-upgrades in Castle Age.", upgrades: ["Bloodlines", "Husbandry"], 
    advancedAttacks: [{ value: 6, type: "Monk" }], advancedArmors: [{ value: 0, type: "Cavalry" }] 
  },
  "546": { // Light Cavalry
    hp: 60, attack: 7, armor: 0, pierceArmor: 2, range: 0, los: 8, speed: 1.5, buildTime: "30s", cost: {"food": 80}, 
    description: "Fast scout. Good against monks.", upgrades: ["Bloodlines", "Husbandry"], 
    advancedAttacks: [{ value: 10, type: "Monk" }], advancedArmors: [{ value: 0, type: "Cavalry" }] 
  },
  "441": { // Hussar
    hp: 75, attack: 7, armor: 0, pierceArmor: 2, range: 0, los: 10, speed: 1.5, buildTime: "30s", cost: {"food": 80}, 
    description: "Elite scout. Excellent trash unit.", upgrades: ["Bloodlines", "Husbandry"], 
    advancedAttacks: [{ value: 12, type: "Monk" }], advancedArmors: [{ value: 0, type: "Cavalry" }] 
  },
  "38": { // Knight
    hp: 100, attack: 10, armor: 2, pierceArmor: 2, range: 0, los: 4, speed: 1.35, buildTime: "30s", cost: {"food": 60, "gold": 75}, 
    description: "Powerful heavy cavalry.", upgrades: ["Bloodlines", "Husbandry"], 
    advancedAttacks: [], advancedArmors: [{ value: 0, type: "Cavalry" }] 
  },
  "283": { // Cavalier
    hp: 120, attack: 12, armor: 2, pierceArmor: 2, range: 0, los: 4, speed: 1.35, buildTime: "30s", cost: {"food": 60, "gold": 75}, 
    description: "Stronger knight.", upgrades: ["Bloodlines", "Husbandry"], 
    advancedAttacks: [], advancedArmors: [{ value: 0, type: "Cavalry" }] 
  },
  "569": { // Paladin
    hp: 160, attack: 14, armor: 2, pierceArmor: 3, range: 0, los: 5, speed: 1.35, buildTime: "30s", cost: {"food": 60, "gold": 75}, 
    description: "The king of the battlefield.", upgrades: ["Bloodlines", "Husbandry"], 
    advancedAttacks: [], advancedArmors: [{ value: 0, type: "Cavalry" }] 
  },
  "329": { // Camel Rider
    hp: 100, attack: 6, armor: 0, pierceArmor: 0, range: 0, los: 4, speed: 1.45, buildTime: "22s", cost: {"food": 55, "gold": 60}, 
    description: "Anti-cavalry mount. Weak vs archers.", upgrades: ["Bloodlines", "Husbandry"], 
    advancedAttacks: [{ value: 9, type: "Cavalry" }], advancedArmors: [{ value: 0, type: "Camel" }] 
  },
  "330": { // Heavy Camel Rider
    hp: 120, attack: 7, armor: 0, pierceArmor: 0, range: 0, los: 5, speed: 1.45, buildTime: "22s", cost: {"food": 55, "gold": 60}, 
    description: "Elite anti-cavalry unit.", upgrades: ["Bloodlines", "Husbandry"], 
    advancedAttacks: [{ value: 18, type: "Cavalry" }], advancedArmors: [{ value: 0, type: "Camel" }] 
  },
  "1132": { // Battle Elephant
    hp: 250, attack: 12, armor: 1, pierceArmor: 2, range: 0, los: 4, speed: 0.85, buildTime: "24s", cost: {"food": 120, "gold": 70}, 
    description: "Slow tanky unit. Causes trample damage.", upgrades: ["Bloodlines", "Husbandry"], 
    advancedAttacks: [{ value: 4, type: "Building" }], advancedArmors: [{ value: 0, type: "Cavalry" }, { value: 0, type: "Elephant" }] 
  },
  "1134": { // Elite Battle Elephant
    hp: 300, attack: 14, armor: 1, pierceArmor: 3, range: 0, los: 5, speed: 0.85, buildTime: "24s", cost: {"food": 120, "gold": 70}, 
    description: "Elite tank. Massive splash damage.", upgrades: ["Bloodlines", "Husbandry"], 
    advancedAttacks: [{ value: 7, type: "Building" }], advancedArmors: [{ value: 0, type: "Cavalry" }, { value: 0, type: "Elephant" }] 
  },
  "1370": { // Steppe Lancer
    hp: 60, attack: 9, armor: 0, pierceArmor: 1, range: 1, los: 5, speed: 1.45, buildTime: "24s", cost: {"food": 70, "gold": 40}, 
    description: "Melee cavalry with 1 range.", upgrades: ["Bloodlines", "Husbandry"], 
    advancedAttacks: [], advancedArmors: [{ value: 0, type: "Cavalry" }] 
  },
  "1372": { // Elite Steppe Lancer
    hp: 80, attack: 11, armor: 0, pierceArmor: 1, range: 1, los: 5, speed: 1.45, buildTime: "20s", cost: {"food": 70, "gold": 40}, 
    description: "Elite lancer. Stacks well in groups.", upgrades: ["Bloodlines", "Husbandry"], 
    advancedAttacks: [], advancedArmors: [{ value: 0, type: "Cavalry" }] 
  },

  // --- SIEGE ---
  "1258": { 
    hp: 175, attack: 2, armor: 0, pierceArmor: 180, range: 0, los: 3, speed: 0.5, buildTime: "36s", cost: {"wood": 160, "gold": 75}, 
    description: "Anti-building siege weapon. Resistant to arrows.", upgrades: [], 
    advancedAttacks: [{ value: 125, type: "Building" }], advancedArmors: [{ value: 0, type: "Siege Weapon" }, { value: 0, type: "Ram" }] 
  },
  "422": { 
    hp: 200, attack: 3, armor: 0, pierceArmor: 190, range: 0, los: 3, speed: 0.5, buildTime: "36s", cost: {"wood": 160, "gold": 75}, 
    description: "Improved ram.", upgrades: [], 
    advancedAttacks: [{ value: 150, type: "Building" }], advancedArmors: [{ value: 0, type: "Siege Weapon" }, { value: 0, type: "Ram" }] 
  },
  "548": { 
    hp: 270, attack: 4, armor: -3, pierceArmor: 195, range: 0, los: 3, speed: 0.6, buildTime: "36s", cost: {"wood": 160, "gold": 75}, 
    description: "Elite ram. Massive splash damage vs buildings.", upgrades: [], 
    advancedAttacks: [{ value: 200, type: "Building" }], advancedArmors: [{ value: 0, type: "Siege Weapon" }, { value: 0, type: "Ram" }] 
  },
  "280": { // Mangonel
    hp: 50, attack: 40, armor: 0, pierceArmor: 6, range: 7, los: 9, speed: 0.6, buildTime: "46s", cost: {"wood": 160, "gold": 135}, 
    description: "Area of effect siege. Good vs archers.", upgrades: ["Siege Engineers"], 
    advancedAttacks: [{ value: 35, type: "Building" }], advancedArmors: [{ value: 0, type: "Siege Weapon" }] 
  },
  "550": { // Onager
    hp: 60, attack: 50, armor: 0, pierceArmor: 7, range: 8, los: 10, speed: 0.6, buildTime: "46s", cost: {"wood": 160, "gold": 135}, 
    description: "Improved Mangonel. Can cut trees.", upgrades: ["Siege Engineers"], 
    advancedAttacks: [{ value: 45, type: "Building" }], advancedArmors: [{ value: 0, type: "Siege Weapon" }] 
  },
  "588": { // Siege Onager
    hp: 70, attack: 75, armor: 0, pierceArmor: 8, range: 8, los: 10, speed: 0.6, buildTime: "46s", cost: {"wood": 160, "gold": 135}, 
    description: "Devastating splash damage. Can cut trees.", upgrades: ["Siege Engineers"], 
    advancedAttacks: [{ value: 60, type: "Building" }], advancedArmors: [{ value: 0, type: "Siege Weapon" }] 
  },
  "279": { // Scorpion
    hp: 40, attack: 12, armor: 0, pierceArmor: 7, range: 7, los: 9, speed: 0.65, buildTime: "30s", cost: {"wood": 75, "gold": 75}, 
    description: "Anti-unit bolt thrower. Projectiles pass through units.", upgrades: ["Siege Engineers", "Rocketry"], 
    advancedAttacks: [{ value: 6, type: "War Elephant" }], advancedArmors: [{ value: 0, type: "Siege Weapon" }] 
  },
  "542": { // Heavy Scorpion (Corrected ID)
    hp: 50, attack: 16, armor: 0, pierceArmor: 7, range: 7, los: 9, speed: 0.65, buildTime: "30s", cost: {"wood": 75, "gold": 75}, 
    description: "Elite Scorpion.", upgrades: ["Siege Engineers", "Rocketry"], 
    advancedAttacks: [{ value: 8, type: "War Elephant" }], advancedArmors: [{ value: 0, type: "Siege Weapon" }] 
  },
  "36": { // Bombard Cannon
    hp: 80, attack: 40, armor: 2, pierceArmor: 5, range: 12, los: 14, speed: 0.7, buildTime: "56s", cost: {"wood": 225, "gold": 225}, 
    description: "Long range anti-building gunpowder unit.", upgrades: ["Siege Engineers"], 
    advancedAttacks: [{ value: 200, type: "Building" }, { value: 40, type: "Ship" }, { value: 40, type: "Stone Defense" }], advancedArmors: [{ value: 0, type: "Siege Weapon" }, { value: 0, type: "Gunpowder" }] 
  },
  "331": { // Trebuchet (Corrected ID)
    hp: 150, attack: 200, armor: 2, pierceArmor: 8, range: 16, los: 19, speed: 0.8, buildTime: "50s", cost: {"wood": 200, "gold": 200}, 
    description: "Ultimate siege weapon. Must pack/unpack to move/fire.", upgrades: ["Siege Engineers", "Geometry"], 
    advancedAttacks: [{ value: 250, type: "Building" }], advancedArmors: [{ value: 0, type: "Siege Weapon" }, { value: 0, type: "Ram" }] 
  },

  // --- DOCK ---
  "13": { 
    hp: 60, attack: 0, armor: 0, pierceArmor: 6, range: 0, los: 5, speed: 1.26, buildTime: "40s", cost: {"wood": 75}, 
    description: "Gathers fish from deep sea or shore.", upgrades: ["Gillnets"], 
    advancedAttacks: [], advancedArmors: [{ value: 0, type: "Ship" }] 
  },
  "539": { // Galley
    hp: 120, attack: 6, armor: 0, pierceArmor: 6, range: 5, los: 7, speed: 1.43, buildTime: "60s", cost: {"wood": 90, "gold": 30}, 
    description: "Basic war ship. Weak vs fire ships.", upgrades: ["Careening", "War Galley"], 
    advancedAttacks: [{ value: 8, type: "Ship" }, { value: 6, type: "Building" }], advancedArmors: [{ value: 0, type: "Ship" }] 
  },
  "21": { // War Galley
    hp: 135, attack: 7, armor: 0, pierceArmor: 6, range: 6, los: 8, speed: 1.43, buildTime: "36s", cost: {"wood": 90, "gold": 30}, 
    description: "Improved ship. Good range.", upgrades: ["Careening", "Galleon"], 
    advancedAttacks: [{ value: 9, type: "Ship" }, { value: 7, type: "Building" }], advancedArmors: [{ value: 0, type: "Ship" }] 
  },
  "442": { // Galleon
    hp: 165, attack: 8, armor: 0, pierceArmor: 8, range: 7, los: 9, speed: 1.43, buildTime: "36s", cost: {"wood": 90, "gold": 30}, 
    description: "Elite war ship.", upgrades: ["Careening", "Dry Dock"], 
    advancedAttacks: [{ value: 11, type: "Ship" }, { value: 8, type: "Building" }], advancedArmors: [{ value: 0, type: "Ship" }] 
  },
  "1103": { // Fire Galley
    hp: 100, attack: 1, armor: 0, pierceArmor: 4, range: 2, los: 5, speed: 1.3, buildTime: "60s", cost: {"wood": 75, "gold": 45}, 
    description: "Anti-ship melee ship. Fires fast.", upgrades: [], 
    advancedAttacks: [{ value: 3, type: "Ship" }, { value: 1, type: "Building" }], advancedArmors: [{ value: 0, type: "Ship" }] 
  },
  "529": { // Fire Ship
    hp: 120, attack: 2, armor: 0, pierceArmor: 6, range: 2, los: 6, speed: 1.35, buildTime: "36s", cost: {"wood": 75, "gold": 45}, 
    description: "Improved fire ship. Very strong vs Galleys.", upgrades: [], 
    advancedAttacks: [{ value: 4, type: "Ship" }, { value: 2, type: "Building" }], advancedArmors: [{ value: 0, type: "Ship" }] 
  },
  "532": { // Fast Fire Ship
    hp: 140, attack: 3, armor: 0, pierceArmor: 8, range: 2, los: 6, speed: 1.43, buildTime: "36s", cost: {"wood": 75, "gold": 45}, 
    description: "Elite fire ship.", upgrades: [], 
    advancedAttacks: [{ value: 5, type: "Ship" }, { value: 3, type: "Building" }], advancedArmors: [{ value: 0, type: "Ship" }] 
  },
  "1104": { // Demo Raft
    hp: 45, attack: 50, armor: 0, pierceArmor: 2, range: 0, los: 6, speed: 1.5, buildTime: "45s", cost: {"wood": 70, "gold": 50}, 
    description: "Suicide ship. Explodes on contact.", upgrades: [], 
    advancedAttacks: [{ value: 180, type: "Building" }], advancedArmors: [{ value: 0, type: "Ship" }] 
  },
  "527": { // Demo Ship
    hp: 60, attack: 110, armor: 0, pierceArmor: 3, range: 0, los: 6, speed: 1.6, buildTime: "31s", cost: {"wood": 70, "gold": 50}, 
    description: "Improved demo ship.", upgrades: [], 
    advancedAttacks: [{ value: 220, type: "Building" }], advancedArmors: [{ value: 0, type: "Ship" }] 
  },
  "528": { // Heavy Demo Ship
    hp: 70, attack: 140, armor: 0, pierceArmor: 5, range: 0, los: 6, speed: 1.6, buildTime: "31s", cost: {"wood": 70, "gold": 50}, 
    description: "Elite demo ship. Huge explosion.", upgrades: [], 
    advancedAttacks: [{ value: 280, type: "Building" }], advancedArmors: [{ value: 0, type: "Ship" }] 
  },
  "420": { // Cannon Galleon
    hp: 120, attack: 35, armor: 0, pierceArmor: 6, range: 13, los: 15, speed: 1.1, buildTime: "46s", cost: {"wood": 200, "gold": 150}, 
    description: "Long range coastal bombardment.", upgrades: [], 
    advancedAttacks: [{ value: 200, type: "Building" }, { value: 40, type: "Siege Weapon" }], advancedArmors: [{ value: 0, type: "Ship" }, { value: 0, type: "Gunpowder" }] 
  },
  "691": { // Elite Cannon Galleon
    hp: 150, attack: 45, armor: 0, pierceArmor: 8, range: 15, los: 17, speed: 1.1, buildTime: "46s", cost: {"wood": 200, "gold": 150}, 
    description: "Improved bombardment ship.", upgrades: [], 
    advancedAttacks: [{ value: 275, type: "Building" }, { value: 40, type: "Siege Weapon" }], advancedArmors: [{ value: 0, type: "Ship" }, { value: 0, type: "Gunpowder" }] 
  },

  // --- ECONOMY & OTHERS ---
  "128": { // Trade Cart
    hp: 70, attack: 0, armor: 0, pierceArmor: 0, range: 0, los: 7, speed: 1.0, buildTime: "51s", cost: {"wood": 100, "gold": 50}, 
    description: "Generates gold by traveling between Markets.", upgrades: ["Caravan"], 
    advancedAttacks: [], advancedArmors: [] 
  },
  "125": { // Monk
    hp: 30, attack: 0, armor: 0, pierceArmor: 0, range: 9, los: 11, speed: 0.7, buildTime: "51s", cost: {"gold": 100}, 
    description: "Heals friendly units and converts enemy units.", upgrades: ["Sanctity", "Fervor", "Redemption", "Atonement", "Block Printing", "Illumination", "Theocracy"], 
    advancedAttacks: [], advancedArmors: [] 
  },
  "440": { // Petard
    hp: 50, attack: 25, armor: 0, pierceArmor: 2, range: 0, los: 4, speed: 0.8, buildTime: "25s", cost: {"food": 65, "gold": 20}, 
    description: "Suicide siege unit. Effective against Walls and Castles.", upgrades: ["Siege Engineers"], 
    advancedAttacks: [{ value: 900, type: "Wall" }, { value: 500, type: "Building" }, { value: 60, type: "Siege Weapon" }], advancedArmors: [] 
  },

  // --- TECHNOLOGIES ---
  "22": { name: "Loom", cost: { gold: 50 }, description: "Villagers +15 HP, +1/+2 Armor." },
  "213": { name: "Wheelbarrow", cost: { food: 175, wood: 50 }, description: "Villagers move 10% faster and carry 25% more resources." },
  "249": { name: "Hand Cart", cost: { food: 300, wood: 200 }, description: "Villagers move 10% faster and carry 50% more resources." },
  "8": { name: "Town Watch", cost: { food: 75 }, description: "Buildings +4 Line of Sight." },
  "280_tech": { name: "Town Patrol", cost: { food: 300, gold: 100 }, description: "Buildings +4 Line of Sight." },
  "101": { name: "Feudal Age", cost: { food: 500 }, description: "Advance to Feudal Age." },
  "102": { name: "Castle Age", cost: { food: 800, gold: 200 }, description: "Advance to Castle Age." },
  "103": { name: "Imperial Age", cost: { food: 1000, gold: 800 }, description: "Advance to Imperial Age." },
  "14": { name: "Horse Collar", cost: { food: 75, wood: 75 }, description: "Farms carry +75 food." },
  "13_tech": { name: "Heavy Plow", cost: { food: 125, wood: 125 }, description: "Farms carry +125 food. Farmers carry +1." },
  "12_tech": { name: "Crop Rotation", cost: { food: 250, wood: 250 }, description: "Farms carry +175 food." },
  "202": { name: "Double-Bit Axe", cost: { food: 100, wood: 50 }, description: "Lumberjacks gather wood 20% faster." },
  "203": { name: "Bow Saw", cost: { food: 150, wood: 100 }, description: "Lumberjacks gather wood 20% faster." },
  "221": { name: "Two-Man Saw", cost: { food: 300, wood: 200 }, description: "Lumberjacks gather wood 10% faster." },
  "55": { name: "Gold Mining", cost: { food: 100, wood: 75 }, description: "Gold Miners work 15% faster." },
  "182": { name: "Gold Shaft Mining", cost: { food: 200, wood: 150 }, description: "Gold Miners work 15% faster." },
  "278": { name: "Stone Mining", cost: { food: 100, wood: 75 }, description: "Stone Miners work 15% faster." },
  "279_tech": { name: "Stone Shaft Mining", cost: { food: 200, wood: 150 }, description: "Stone Miners work 15% faster." },
  "23": { name: "Coinage", cost: { food: 200, gold: 100 }, description: "Tribute fee reduced to 20%." },
  "17": { name: "Banking", cost: { food: 300, gold: 200 }, description: "Tribute fee reduced to 0%." },
  "48": { name: "Caravan", cost: { food: 200, gold: 200 }, description: "Trade Carts and Trade Cogs move 50% faster." },
  "15": { name: "Guilds", cost: { food: 300, gold: 200 }, description: "Market exchange fee reduced to 15%." },
  "716": { name: "Supplies", cost: { food: 75, gold: 75 }, description: "Militia-line costs -15 food." },
  "875": { name: "Gambesons", cost: { food: 100, gold: 100 }, description: "Militia-line +1 Pierce Armor." },
  "215": { name: "Squires", cost: { food: 100 }, description: "Infantry moves 10% faster." },
  "602": { name: "Arson", cost: { food: 150, gold: 50 }, description: "Infantry +2 attack vs standard buildings." },
  "437": { name: "Thumb Ring", cost: { food: 300, wood: 250 }, description: "Archers fire faster and with 100% accuracy." },
  "436": { name: "Parthian Tactics", cost: { food: 200, gold: 250 }, description: "Cavalry Archers +1/+2 Armor, +4 attack vs Pikemen." },
  "435": { name: "Bloodlines", cost: { food: 150, gold: 100 }, description: "Mounted units +20 HP." },
  "216": { name: "Husbandry", cost: { food: 150 }, description: "Mounted units move 10% faster." },
  "211": { name: "Padded Archer Armor", cost: { food: 100 }, description: "Archers +1/+1 Armor." },
  "212": { name: "Leather Archer Armor", cost: { food: 150, gold: 150 }, description: "Archers +1/+1 Armor." },
  "219": { name: "Ring Archer Armor", cost: { food: 250, gold: 250 }, description: "Archers +1/+2 Armor." },
  "199": { name: "Fletching", cost: { food: 100, gold: 50 }, description: "Archers, Galleys, Town Centers, Castles, Towers +1 Attack, +1 Range." },
  "200": { name: "Bodkin Arrow", cost: { food: 200, gold: 100 }, description: "Archers, Galleys, Town Centers, Castles, Towers +1 Attack, +1 Range." },
  "201": { name: "Bracer", cost: { food: 300, gold: 200 }, description: "Archers, Galleys, Town Centers, Castles, Towers +1 Attack, +1 Range." },
  "74_tech": { name: "Forging", cost: { food: 150 }, description: "Infantry and Cavalry +1 Attack." },
  "76": { name: "Iron Casting", cost: { food: 220, gold: 120 }, description: "Infantry and Cavalry +1 Attack." },
  "77_tech": { name: "Blast Furnace", cost: { food: 275, gold: 225 }, description: "Infantry and Cavalry +2 Attack." },
  "75_tech": { name: "Scale Mail Armor", cost: { food: 100 }, description: "Infantry +1/+1 Armor." },
  "68_tech": { name: "Chain Mail Armor", cost: { food: 200, gold: 100 }, description: "Infantry +1/+1 Armor." },
  "67": { name: "Plate Mail Armor", cost: { food: 300, gold: 150 }, description: "Infantry +1/+2 Armor." },
  "81": { name: "Scale Barding Armor", cost: { food: 150 }, description: "Cavalry +1/+1 Armor." },
  "82": { name: "Chain Barding Armor", cost: { food: 250, gold: 150 }, description: "Cavalry +1/+1 Armor." },
  "80": { name: "Plate Barding Armor", cost: { food: 350, gold: 200 }, description: "Cavalry +1/+2 Armor." },
  "50": { name: "Masonry", cost: { food: 150, wood: 175 }, description: "Buildings +10% HP, +1/+1 Armor, +3 Building Armor." },
  "51": { name: "Architecture", cost: { food: 300, wood: 200 }, description: "Buildings +10% HP, +1/+1 Armor, +3 Building Armor." },
  "93_tech": { name: "Ballistics", cost: { wood: 300, gold: 175 }, description: "Archers, Town Centers, Castles, Galleys, Towers fire more accurately at moving targets." },
  "380": { name: "Heated Shot", cost: { food: 350, gold: 100 }, description: "Towers do +125% damage to ships. Castles do +25% damage to ships." },
  "322": { name: "Murder Holes", cost: { food: 200, stone: 100 }, description: "Removes minimum range from Towers and Castles." },
  "54": { name: "Treadmill Crane", cost: { food: 300, wood: 200 }, description: "Villagers construct buildings 20% faster." },
  "47": { name: "Chemistry", cost: { food: 300, gold: 200 }, description: "Missile units +1 Attack. Unlocks Gunpowder units." },
  "377": { name: "Siege Engineers", cost: { food: 500, wood: 600 }, description: "Siege weapons +20% damage to buildings and +1 range (except Rams)." },
  "608": { name: "Arrowslits", cost: { food: 150, wood: 150 }, description: "Towers +1/+2/+3 Attack." },
  "316": { name: "Redemption", cost: { gold: 475 }, description: "Monks can convert buildings and siege weapons." },
  "319": { name: "Atonement", cost: { gold: 325 }, description: "Monks can convert enemy Monks." },
  "441": { name: "Herbal Medicine", cost: { food: 350 }, description: "Units garrisoned in buildings heal 6x faster." },
  "439": { name: "Heresy", cost: { gold: 1000 }, description: "Units die instead of being converted." },
  "231": { name: "Sanctity", cost: { gold: 120 }, description: "Monks +15 HP." },
  "252": { name: "Fervor", cost: { gold: 140 }, description: "Monks move 15% faster." },
  "45_tech": { name: "Faith", cost: { food: 750, gold: 1000 }, description: "Units 50% harder to convert." },
  "233": { name: "Illumination", cost: { gold: 120 }, description: "Monks regain Faith 50% faster." },
  "230": { name: "Block Printing", cost: { gold: 200 }, description: "Monks +3 Conversion Range." },
  "438": { name: "Theocracy", cost: { food: 200, gold: 200 }, description: "Only one Monk rests after a group conversion." },
  "379": { name: "Hoardings", cost: { food: 400, wood: 400 }, description: "Castles +21% HP." },
  "321": { name: "Sappers", cost: { food: 400, gold: 200 }, description: "Villagers +15 attack vs buildings." },
  "315": { name: "Conscription", cost: { food: 150, gold: 150 }, description: "Military units created 33% faster." },
  "408": { name: "Spies", cost: { gold: 200 }, description: "See enemy line of sight. Cost depends on enemy villagers." },
  "65": { name: "Gillnets", cost: { food: 150, wood: 200 }, description: "Fishing Ships gather 25% faster." },
  "374": { name: "Careening", cost: { food: 250, gold: 150 }, description: "Ships +1 Pierce Armor, Transport Ships +5 capacity." },
  "375": { name: "Dry Dock", cost: { food: 600, gold: 400 }, description: "Ships move 15% faster, Transport Ships +10 capacity." },
  "376": { name: "Shipwright", cost: { food: 1000, gold: 300 }, description: "Ships cost -20% wood, build 35% faster." },
  
  // --- BUILDINGS ---
  "Building_109": { name: "Town Center", cost: { wood: 275 }, hp: 2400 },
  "Building_68": { name: "Mill", cost: { wood: 100 }, hp: 1000 },
  "Building_562": { name: "Lumber Camp", cost: { wood: 100 }, hp: 1000 },
  "Building_584": { name: "Mining Camp", cost: { wood: 100 }, hp: 1000 },
  "Building_84": { name: "Market", cost: { wood: 175 }, hp: 1800 },
  "Building_12": { name: "Barracks", cost: { wood: 175 }, hp: 1500 },
  "Building_87": { name: "Archery Range", cost: { wood: 175 }, hp: 1500 },
  "Building_101": { name: "Stable", cost: { wood: 175 }, hp: 1500 },
  "Building_49": { name: "Siege Workshop", cost: { wood: 200 }, hp: 2100 },
  "Building_19": { name: "Blacksmith", cost: { wood: 150 }, hp: 1800 },
  "Building_45": { name: "Dock", cost: { wood: 150 }, hp: 1800 },
  "Building_209": { name: "University", cost: { wood: 200 }, hp: 2100 },
  "Building_104": { name: "Monastery", cost: { wood: 175 }, hp: 2100 },
  "Building_82": { name: "Castle", cost: { stone: 650 }, hp: 4800 },
  "Building_50": { name: "Farm", cost: { wood: 60 }, hp: 480 },
  "140": { name: "Watch Tower", cost: { wood: 50, stone: 125 }, hp: 1020, attack: 5 },
  "63": { name: "Keep", cost: { wood: 50, stone: 125 }, hp: 2250, attack: 8 },
  "64": { name: "Bombard Tower", cost: { gold: 100, stone: 125 }, hp: 2220, attack: 120 },
};
