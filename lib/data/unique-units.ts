export interface UnitStats {
  hp: number;
  attack: number;
  meleeArmor: number;
  pierceArmor: number;
  range?: number;
  speed: number;
  reloadTime: number;
  chargeDamage?: number;
  chargeCooldown?: number;
}

export interface UniqueUnit {
  id: string;
  name: string;
  civilization: string;
  type: 'infantry' | 'archer' | 'cavalry' | 'siege' | 'naval' | 'monk' | 'gunpowder';
  armorClasses: string[];
  image: string;
  description: string;
  specialAbility: string;
  stats: {
    castle: UnitStats;
    imperial: UnitStats;
  };
  bonuses: {
    target: string;
    value: number;
  }[];
  strengths: string[];
  weaknesses: string[];
}

export const UNIQUE_UNITS: UniqueUnit[] = [
  {
    id: "composite_bowman",
    name: "Composite Bowman",
    civilization: "Armenians",
    type: "archer",
    armorClasses: ["archer", "unique_unit"],
    image: "/images/units/unidad_Composite_Bowman.png",
    description: "Ignores pierce armor.",
    specialAbility: "Armor Penetration",
    stats: { 
      castle: { hp: 40, attack: 7, meleeArmor: 1, pierceArmor: 0, range: 4, speed: 0.96, reloadTime: 2.0 },
      imperial: { hp: 45, attack: 8, meleeArmor: 1, pierceArmor: 4, range: 4, speed: 0.96, reloadTime: 2.0 }
    },
    bonuses: [],
    strengths: ["High Armor Units", "Teutons"],
    weaknesses: ["Skirmishers", "Siege"]
  },
  {
    id: "jaguar_warrior",
    name: "Jaguar Warrior",
    civilization: "Aztecs",
    type: "infantry",
    armorClasses: ["infantry", "unique_unit"],
    image: "/images/units/unidad_Jaguar_Warrior.png",
    description: "Anti-infantry specialist.",
    specialAbility: "+11 vs Infantry",
    stats: { 
      castle: { hp: 50, attack: 12, meleeArmor: 2, pierceArmor: 2, speed: 1.0, reloadTime: 2.0 },
      imperial: { hp: 75, attack: 20, meleeArmor: 5, pierceArmor: 5, speed: 1.0, reloadTime: 2.0 }
    },
    bonuses: [{ target: 'infantry', value: 11 }],
    strengths: ["Champions", "Goths"],
    weaknesses: ["Archers", "Hand Cannoneers"]
  },
  {
    id: "ratha",
    name: "Ratha",
    civilization: "Bengalis",
    type: "cavalry",
    armorClasses: ["archer", "cavalry", "unique_unit"],
    image: "/images/units/unidad_Ratha.png",
    description: "Versatile chariot.",
    specialAbility: "Melee/Ranged Mode",
    stats: { 
      castle: { hp: 105, attack: 10, meleeArmor: 2, pierceArmor: 2, range: 4, speed: 1.3, reloadTime: 2.0 },
      imperial: { hp: 145, attack: 12, meleeArmor: 3, pierceArmor: 3, range: 4, speed: 1.3, reloadTime: 2.0 }
    },
    bonuses: [],
    strengths: ["Skirmishers", "Raiding"],
    weaknesses: ["Pikes", "Camels"]
  },
  {
    id: "camel_archer",
    name: "Camel Archer",
    civilization: "Berbers",
    type: "archer",
    armorClasses: ["archer", "cavalry_archer", "camel", "unique_unit"],
    image: "/images/units/unidad_Camel_Archer.png",
    description: "Anti-cavalry archer.",
    specialAbility: "Bonus vs Cav Archers",
    stats: { 
      castle: { hp: 75, attack: 10, meleeArmor: 0, pierceArmor: 1, range: 4, speed: 1.45, reloadTime: 2.0 },
      imperial: { hp: 80, attack: 12, meleeArmor: 1, pierceArmor: 5, range: 4, speed: 1.45, reloadTime: 1.7 }
    },
    bonuses: [{ target: 'cavalry_archer', value: 6 }],
    strengths: ["Mangudai", "Cav Archers"],
    weaknesses: ["Skirmishers", "Genitours"]
  },
  {
    id: "hussite_wagon",
    name: "Hussite Wagon",
    civilization: "Bohemians",
    type: "siege",
    armorClasses: ["siege", "gunpowder", "unique_unit"],
    image: "/images/units/unidad_Hussite_Wagon.png",
    description: "Mobile shield.",
    specialAbility: "Protects units behind",
    stats: { 
      castle: { hp: 200, attack: 11, meleeArmor: 0, pierceArmor: 7, range: 6, speed: 0.85, reloadTime: 3.45 },
      imperial: { hp: 250, attack: 13, meleeArmor: 0, pierceArmor: 10, range: 6, speed: 0.85, reloadTime: 3.45 }
    },
    bonuses: [],
    strengths: ["Archers", "Buildings"],
    weaknesses: ["Bombard Cannons", "Melee"]
  },
  {
    id: "longbowman",
    name: "Longbowman",
    civilization: "Britons",
    type: "archer",
    armorClasses: ["archer", "unique_unit"],
    image: "/images/units/unidad_Longbowman.png",
    description: "Supreme range.",
    specialAbility: "Up to 12 range",
    stats: { 
      castle: { hp: 35, attack: 6, meleeArmor: 0, pierceArmor: 0, range: 6, speed: 0.96, reloadTime: 2.0 },
      imperial: { hp: 40, attack: 7, meleeArmor: 0, pierceArmor: 1, range: 8, speed: 0.96, reloadTime: 2.0 }
    },
    bonuses: [],
    strengths: ["Infantry", "Archers"],
    weaknesses: ["Skirmishers", "Cavalry"]
  },
  {
    id: "konnik",
    name: "Konnik",
    civilization: "Bulgarians",
    type: "cavalry",
    armorClasses: ["cavalry", "unique_unit"],
    image: "/images/units/unidad_Konnik.png",
    description: "Resurrects as infantry.",
    specialAbility: "Second life",
    stats: { 
      castle: { hp: 120, attack: 12, meleeArmor: 2, pierceArmor: 1, speed: 1.35, reloadTime: 2.4 },
      imperial: { hp: 140, attack: 14, meleeArmor: 3, pierceArmor: 2, speed: 1.35, reloadTime: 2.4 }
    },
    bonuses: [],
    strengths: ["Infantry", "Sustained Fights"],
    weaknesses: ["Archers", "Pikes"]
  },
  {
    id: "coustillier",
    name: "Coustillier",
    civilization: "Burgundians",
    type: "cavalry",
    armorClasses: ["cavalry", "unique_unit"],
    image: "/images/units/unidad_Coustillier.png",
    description: "Charge attack.",
    specialAbility: "+25 Damage Charge",
    stats: { 
      castle: { hp: 135, attack: 12, meleeArmor: 2, pierceArmor: 2, speed: 1.35, reloadTime: 1.9, chargeDamage: 20 },
      imperial: { hp: 165, attack: 15, meleeArmor: 3, pierceArmor: 3, speed: 1.35, reloadTime: 1.9, chargeDamage: 25 }
    },
    bonuses: [],
    strengths: ["Archers", "Monks"],
    weaknesses: ["Camels", "Pikes"]
  },
  {
    id: "arambai",
    name: "Arambai",
    civilization: "Burmese",
    type: "archer",
    armorClasses: ["archer", "cavalry_archer", "unique_unit"],
    image: "/images/units/unidad_Arambai.png",
    description: "Dart thrower.",
    specialAbility: "High damage, low accuracy",
    stats: { 
      castle: { hp: 60, attack: 12, meleeArmor: 0, pierceArmor: 1, range: 5, speed: 1.3, reloadTime: 2.0 },
      imperial: { hp: 65, attack: 15, meleeArmor: 0, pierceArmor: 2, range: 5, speed: 1.3, reloadTime: 2.0 }
    },
    bonuses: [],
    strengths: ["Clumped Units"],
    weaknesses: ["Archers", "Skirmishers"]
  },
  {
    id: "cataphract",
    name: "Cataphract",
    civilization: "Byzantines",
    type: "cavalry",
    armorClasses: ["cavalry", "unique_unit"],
    image: "/images/units/unidad_Cataphract.png",
    description: "Anti-infantry cavalry.",
    specialAbility: "Trample, vs Infantry",
    stats: { 
      castle: { hp: 110, attack: 11, meleeArmor: 2, pierceArmor: 1, speed: 1.35, reloadTime: 1.8 },
      imperial: { hp: 150, attack: 14, meleeArmor: 2, pierceArmor: 1, speed: 1.35, reloadTime: 1.7 }
    },
    bonuses: [{ target: 'infantry', value: 12 }],
    strengths: ["Goths", "Infantry"],
    weaknesses: ["Archers", "Heavy Cavalry"]
  },
  {
    id: "woad_raider",
    name: "Woad Raider",
    civilization: "Celts",
    type: "infantry",
    armorClasses: ["infantry", "unique_unit"],
    image: "/images/units/unidad_Woad_Raider.png",
    description: "Fast infantry.",
    specialAbility: "High movement speed",
    stats: { 
      castle: { hp: 65, attack: 12, meleeArmor: 1, pierceArmor: 2, speed: 1.38, reloadTime: 2.0 },
      imperial: { hp: 80, attack: 17, meleeArmor: 2, pierceArmor: 4, speed: 1.38, reloadTime: 2.0 }
    },
    bonuses: [],
    strengths: ["Siege", "Skirmishers"],
    weaknesses: ["Heavy Cavalry", "Champions"]
  },
  {
    id: "chu_ko_nu",
    name: "Chu Ko Nu",
    civilization: "Chinese",
    type: "archer",
    armorClasses: ["archer", "unique_unit"],
    image: "/images/units/unidad_Chu_Ko_Nu.png",
    description: "Rapid fire archer.",
    specialAbility: "Multiple arrows",
    stats: { 
      castle: { hp: 45, attack: 11, meleeArmor: 0, pierceArmor: 1, range: 4, speed: 0.96, reloadTime: 3.0 },
      imperial: { hp: 50, attack: 14, meleeArmor: 0, pierceArmor: 4, range: 4, speed: 0.96, reloadTime: 3.0 }
    },
    bonuses: [],
    strengths: ["Rams", "Infantry"],
    weaknesses: ["Onagers", "Skirmishers"]
  },
  {
    id: "kipchak",
    name: "Kipchak",
    civilization: "Cumans",
    type: "archer",
    armorClasses: ["archer", "cavalry_archer", "unique_unit"],
    image: "/images/units/unidad_Kipchak.png",
    description: "Multi-arrow horse archer.",
    specialAbility: "Fast fire rate",
    stats: { 
      castle: { hp: 60, attack: 7, meleeArmor: 0, pierceArmor: 0, range: 4, speed: 1.45, reloadTime: 2.2 },
      imperial: { hp: 65, attack: 8, meleeArmor: 0, pierceArmor: 4, range: 4, speed: 1.45, reloadTime: 2.2 }
    },
    bonuses: [],
    strengths: ["Siege", "Villagers"],
    weaknesses: ["Camels", "Skirmishers"]
  },
  {
    id: "urumi_swordsman",
    name: "Urumi Swordsman",
    civilization: "Dravidians",
    type: "infantry",
    armorClasses: ["infantry", "unique_unit"],
    image: "/images/units/unidad_Urumi_Swordsman.png",
    description: "Whip-sword infantry.",
    specialAbility: "Blast attack charge",
    stats: { 
      castle: { hp: 55, attack: 12, meleeArmor: 1, pierceArmor: 1, speed: 1.2, reloadTime: 2.0, chargeDamage: 12 },
      imperial: { hp: 65, attack: 14, meleeArmor: 2, pierceArmor: 2, speed: 1.2, reloadTime: 2.0, chargeDamage: 15 }
    },
    bonuses: [],
    strengths: ["Infantry clusters"],
    weaknesses: ["Archers"]
  },
  {
    id: "shotel_warrior",
    name: "Shotel Warrior",
    civilization: "Ethiopians",
    type: "infantry",
    armorClasses: ["infantry", "unique_unit"],
    image: "/images/units/unidad_Shotel_Warrior.png",
    description: "High damage raider.",
    specialAbility: "Instant training",
    stats: { 
      castle: { hp: 40, attack: 18, meleeArmor: 0, pierceArmor: 1, speed: 1.2, reloadTime: 2.0 },
      imperial: { hp: 50, attack: 22, meleeArmor: 3, pierceArmor: 4, speed: 1.2, reloadTime: 2.0 }
    },
    bonuses: [],
    strengths: ["Buildings", "Villagers"],
    weaknesses: ["Archers", "Towers"]
  },
  {
    id: "throwing_axeman",
    name: "Throwing Axeman",
    civilization: "Franks",
    type: "infantry",
    armorClasses: ["infantry", "unique_unit"],
    image: "/images/units/unidad_Throwing_Axeman.png",
    description: "Ranged melee unit.",
    specialAbility: "Ranged melee attack",
    stats: { 
      castle: { hp: 60, attack: 11, meleeArmor: 1, pierceArmor: 1, range: 3, speed: 1.0, reloadTime: 2.0 },
      imperial: { hp: 70, attack: 12, meleeArmor: 4, pierceArmor: 4, range: 4, speed: 1.0, reloadTime: 2.0 }
    },
    bonuses: [],
    strengths: ["Pikemen", "Goths"],
    weaknesses: ["Archers", "Onagers"]
  },
  {
    id: "monaspa",
    name: "Monaspa",
    civilization: "Georgians",
    type: "cavalry",
    armorClasses: ["cavalry", "unique_unit"],
    image: "/images/units/unidad_Monaspa.png",
    description: "Stacking attack cavalry.",
    specialAbility: "Power in numbers",
    stats: { 
      castle: { hp: 95, attack: 16, meleeArmor: 5, pierceArmor: 4, speed: 1.35, reloadTime: 1.9 },
      imperial: { hp: 110, attack: 18, meleeArmor: 7, pierceArmor: 6, speed: 1.35, reloadTime: 1.9 }
    },
    bonuses: [],
    strengths: ["Late game pushes"],
    weaknesses: ["Halberdiers", "Monks"]
  },
  {
    id: "huskarl",
    name: "Huskarl",
    civilization: "Goths",
    type: "infantry",
    armorClasses: ["infantry", "unique_unit"],
    image: "/images/units/unidad_Huskarl.png",
    description: "Anti-archer infantry.",
    specialAbility: "Extreme pierce armor",
    stats: { 
      castle: { hp: 60, attack: 12, meleeArmor: 0, pierceArmor: 8, speed: 1.05, reloadTime: 2.0 },
      imperial: { hp: 70, attack: 16, meleeArmor: 2, pierceArmor: 10, speed: 1.05, reloadTime: 2.0 }
    },
    bonuses: [{ target: 'archer', value: 10 }],
    strengths: ["Archers", "Britons"],
    weaknesses: ["Melee Units", "Paladins"]
  },
  {
    id: "chakram_thrower",
    name: "Chakram Thrower",
    civilization: "Gurjaras",
    type: "infantry",
    armorClasses: ["infantry", "unique_unit"],
    image: "/images/units/unidad_Chakram_Thrower.png",
    description: "Pass-through melee damage.",
    specialAbility: "Slice through units",
    stats: { 
      castle: { hp: 40, attack: 4, meleeArmor: 0, pierceArmor: 1, range: 4, speed: 1.1, reloadTime: 2.0 },
      imperial: { hp: 40, attack: 5, meleeArmor: 0, pierceArmor: 1, range: 5, speed: 1.1, reloadTime: 2.0 }
    },
    bonuses: [],
    strengths: ["Massed units"],
    weaknesses: ["Archers", "Cavalry"]
  },
  {
    id: "ghulam",
    name: "Ghulam",
    civilization: "Hindustanis",
    type: "infantry",
    armorClasses: ["infantry", "unique_unit"],
    image: "/images/units/unidad_Ghulam.png",
    description: "Fast anti-archer infantry.",
    specialAbility: "Pass-through attack",
    stats: { 
      castle: { hp: 55, attack: 12, meleeArmor: 0, pierceArmor: 5, speed: 1.2, reloadTime: 2.0 },
      imperial: { hp: 65, attack: 14, meleeArmor: 2, pierceArmor: 8, speed: 1.2, reloadTime: 2.0 }
    },
    bonuses: [],
    strengths: ["Archers"],
    weaknesses: ["Heavy Cavalry"]
  },
  {
    id: "tarkan",
    name: "Tarkan",
    civilization: "Huns",
    type: "cavalry",
    armorClasses: ["cavalry", "unique_unit"],
    image: "/images/units/unidad_Tarkan.png",
    description: "Anti-building cavalry.",
    specialAbility: "Torch attack vs buildings",
    stats: { 
      castle: { hp: 120, attack: 12, meleeArmor: 4, pierceArmor: 5, speed: 1.35, reloadTime: 2.1 },
      imperial: { hp: 170, attack: 15, meleeArmor: 5, pierceArmor: 8, speed: 1.35, reloadTime: 2.1 }
    },
    bonuses: [{ target: 'building', value: 12 }],
    strengths: ["Buildings", "Walls"],
    weaknesses: ["Pikemen", "Camels"]
  },
  {
    id: "kamayuk",
    name: "Kamayuk",
    civilization: "Incas",
    type: "infantry",
    armorClasses: ["infantry", "unique_unit"],
    image: "/images/units/unidad_Kamayuk.png",
    description: "Spear infantry with range.",
    specialAbility: "1 Range attack",
    stats: { 
      castle: { hp: 60, attack: 9, meleeArmor: 1, pierceArmor: 1, range: 1, speed: 1.0, reloadTime: 2.0 },
      imperial: { hp: 80, attack: 12, meleeArmor: 5, pierceArmor: 6, range: 1, speed: 1.0, reloadTime: 2.0 }
    },
    bonuses: [{ target: 'cavalry', value: 12 }],
    strengths: ["Cavalry", "Melee Clusters"],
    weaknesses: ["Archers", "Siege"]
  },
  {
    id: "genoese_crossbowman",
    name: "Genoese Crossbowman",
    civilization: "Italians",
    type: "archer",
    armorClasses: ["archer", "unique_unit"],
    image: "/images/units/unidad_Genoese_Crossbowman.png",
    description: "Anti-cavalry archer.",
    specialAbility: "+7 vs Cavalry",
    stats: { 
      castle: { hp: 45, attack: 9, meleeArmor: 0, pierceArmor: 0, range: 4, speed: 0.96, reloadTime: 2.0 },
      imperial: { hp: 50, attack: 10, meleeArmor: 1, pierceArmor: 4, range: 4, speed: 0.96, reloadTime: 1.7 }
    },
    bonuses: [{ target: 'cavalry', value: 7 }],
    strengths: ["Cavalry", "Huns"],
    weaknesses: ["Skirmishers", "Archers"]
  },
  {
    id: "samurai",
    name: "Samurai",
    civilization: "Japanese",
    type: "infantry",
    armorClasses: ["infantry", "unique_unit"],
    image: "/images/units/unidad_Samurai.png",
    description: "Unique unit killer.",
    specialAbility: "vs Unique Units",
    stats: { 
      castle: { hp: 60, attack: 10, meleeArmor: 2, pierceArmor: 1, speed: 1.0, reloadTime: 1.45 },
      imperial: { hp: 80, attack: 16, meleeArmor: 4, pierceArmor: 4, speed: 1.0, reloadTime: 1.45 }
    },
    bonuses: [{ target: 'unique_unit', value: 12 }],
    strengths: ["Unique Units", "Cataphracts"],
    weaknesses: ["Archers", "Scorpions"]
  },
  {
    id: "ballista_elephant",
    name: "Ballista Elephant",
    civilization: "Khmer",
    type: "siege",
    armorClasses: ["siege", "cavalry", "elephant", "unique_unit"],
    image: "/images/units/unidad_Ballista_Elephant.png",
    description: "Mobile bolt thrower.",
    specialAbility: "Cuts trees",
    stats: { 
      castle: { hp: 270, attack: 8, meleeArmor: 0, pierceArmor: 3, range: 5, speed: 0.8, reloadTime: 2.5 },
      imperial: { hp: 310, attack: 9, meleeArmor: 0, pierceArmor: 3, range: 5, speed: 0.8, reloadTime: 2.5 }
    },
    bonuses: [],
    strengths: ["Infantry masses"],
    weaknesses: ["Onagers", "Pikes"]
  },
  {
    id: "war_wagon",
    name: "War Wagon",
    civilization: "Koreans",
    type: "archer",
    armorClasses: ["archer", "cavalry_archer", "cavalry", "unique_unit"],
    image: "/images/units/unidad_War_Wagon.png",
    description: "Tanky horse archer.",
    specialAbility: "High HP/Armor",
    stats: { 
      castle: { hp: 150, attack: 12, meleeArmor: 0, pierceArmor: 3, range: 4, speed: 1.2, reloadTime: 2.5 },
      imperial: { hp: 200, attack: 13, meleeArmor: 0, pierceArmor: 8, range: 5, speed: 1.2, reloadTime: 2.5 }
    },
    bonuses: [],
    strengths: ["Archers", "Raiders"],
    weaknesses: ["Monks", "Halberdiers"]
  },
  {
    id: "leitis",
    name: "Leitis",
    civilization: "Lithuanians",
    type: "cavalry",
    armorClasses: ["cavalry", "unique_unit"],
    image: "/images/units/unidad_Leitis.png",
    description: "Ignores armor.",
    specialAbility: "Armor Pierce",
    stats: { 
      castle: { hp: 120, attack: 16, meleeArmor: 3, pierceArmor: 3, speed: 1.35, reloadTime: 1.9 },
      imperial: { hp: 150, attack: 22, meleeArmor: 6, pierceArmor: 5, speed: 1.35, reloadTime: 1.9 }
    },
    bonuses: [],
    strengths: ["Teutonic Knights", "Boyars"],
    weaknesses: ["Archers"]
  },
  {
    id: "magyar_huszar",
    name: "Magyar Huszar",
    civilization: "Magyars",
    type: "cavalry",
    armorClasses: ["cavalry", "unique_unit"],
    image: "/images/units/unidad_Magyar_Huszar.png",
    description: "Anti-siege trash.",
    specialAbility: "Bonus vs Siege",
    stats: { 
      castle: { hp: 90, attack: 13, meleeArmor: 0, pierceArmor: 2, speed: 1.5, reloadTime: 1.9 },
      imperial: { hp: 105, attack: 14, meleeArmor: 3, pierceArmor: 6, speed: 1.5, reloadTime: 1.9 }
    },
    bonuses: [{ target: 'siege', value: 8 }],
    strengths: ["Onagers", "Trebuchets"],
    weaknesses: ["Pikes", "Heavy Cavalry"]
  },
  {
    id: "karambit_warrior",
    name: "Karambit Warrior",
    civilization: "Malay",
    type: "infantry",
    armorClasses: ["infantry", "unique_unit"],
    image: "/images/units/unidad_Karambit_Warrior.png",
    description: "Half-pop infantry.",
    specialAbility: "0.5 Pop space",
    stats: { 
      castle: { hp: 30, attack: 9, meleeArmor: 1, pierceArmor: 2, speed: 1.2, reloadTime: 2.0 },
      imperial: { hp: 40, attack: 12, meleeArmor: 2, pierceArmor: 3, speed: 1.2, reloadTime: 2.0 }
    },
    bonuses: [],
    strengths: ["Swarms", "Late game"],
    weaknesses: ["Splash damage"]
  },
  {
    id: "gbeto",
    name: "Gbeto",
    civilization: "Malians",
    type: "infantry",
    armorClasses: ["infantry", "unique_unit"],
    image: "/images/units/unidad_Gbeto.png",
    description: "Throwing knife infantry.",
    specialAbility: "High movement speed",
    stats: { 
      castle: { hp: 35, attack: 12, meleeArmor: 0, pierceArmor: 1, range: 5, speed: 1.25, reloadTime: 2.0 },
      imperial: { hp: 45, attack: 15, meleeArmor: 2, pierceArmor: 3, range: 6, speed: 1.25, reloadTime: 2.0 }
    },
    bonuses: [],
    strengths: ["Hit and Run", "Raiding"],
    weaknesses: ["Archers", "Siege"]
  },
  {
    id: "plumed_archer",
    name: "Plumed Archer",
    civilization: "Mayans",
    type: "archer",
    armorClasses: ["archer", "unique_unit"],
    image: "/images/units/unidad_Plumed_Archer.png",
    description: "Fast tanky archer.",
    specialAbility: "High HP/Speed",
    stats: { 
      castle: { hp: 50, attack: 8, meleeArmor: 0, pierceArmor: 1, range: 4, speed: 1.2, reloadTime: 1.9 },
      imperial: { hp: 65, attack: 9, meleeArmor: 0, pierceArmor: 6, range: 5, speed: 1.2, reloadTime: 1.7 }
    },
    bonuses: [{ target: 'infantry', value: 2 }],
    strengths: ["Infantry", "Kiting"],
    weaknesses: ["Huskarls", "Skirmishers"]
  },
  {
    id: "mangudai",
    name: "Mangudai",
    civilization: "Mongols",
    type: "archer",
    armorClasses: ["archer", "cavalry_archer", "unique_unit"],
    image: "/images/units/unidad_Mangudai.png",
    description: "Anti-siege horse archer.",
    specialAbility: "Bonus vs Siege",
    stats: { 
      castle: { hp: 70, attack: 10, meleeArmor: 0, pierceArmor: 1, range: 4, speed: 1.45, reloadTime: 1.68 },
      imperial: { hp: 80, attack: 12, meleeArmor: 1, pierceArmor: 4, range: 4, speed: 1.45, reloadTime: 1.68 }
    },
    bonuses: [{ target: 'siege', value: 5 }],
    strengths: ["Onagers", "Siege"],
    weaknesses: ["Camel Archers", "Skirmishers"]
  },
  {
    id: "war_elephant",
    name: "War Elephant",
    civilization: "Persians",
    type: "cavalry",
    armorClasses: ["cavalry", "elephant", "unique_unit"],
    image: "/images/units/unidad_War_Elephant.png",
    description: "Massive tank.",
    specialAbility: "Splash damage",
    stats: { 
      castle: { hp: 470, attack: 19, meleeArmor: 3, pierceArmor: 4, speed: 0.6, reloadTime: 2.0 },
      imperial: { hp: 620, attack: 24, meleeArmor: 5, pierceArmor: 7, speed: 0.78, reloadTime: 2.0 }
    },
    bonuses: [],
    strengths: ["Anything in melee"],
    weaknesses: ["Monks", "Halberdiers"]
  },
  {
    id: "obuch",
    name: "Obuch",
    civilization: "Poles",
    type: "infantry",
    armorClasses: ["infantry", "unique_unit"],
    image: "/images/units/unidad_Obuch.png",
    description: "Armor stripper.",
    specialAbility: "Lowers enemy armor",
    stats: { 
      castle: { hp: 75, attack: 12, meleeArmor: 3, pierceArmor: 2, speed: 0.9, reloadTime: 2.0 },
      imperial: { hp: 95, attack: 13, meleeArmor: 5, pierceArmor: 5, speed: 0.9, reloadTime: 2.0 }
    },
    bonuses: [],
    strengths: ["Paladins", "Teutonic Knights"],
    weaknesses: ["Archers", "Skirmishers"]
  },
  {
    id: "organ_gun",
    name: "Organ Gun",
    civilization: "Portuguese",
    type: "siege",
    armorClasses: ["siege", "gunpowder", "unique_unit"],
    image: "/images/units/unidad_Organ_Gun.png",
    description: "Multi-shot siege.",
    specialAbility: "Area damage",
    stats: { 
      castle: { hp: 60, attack: 16, meleeArmor: 2, pierceArmor: 4, range: 7, speed: 0.85, reloadTime: 3.45 },
      imperial: { hp: 70, attack: 21, meleeArmor: 2, pierceArmor: 10, range: 7, speed: 0.85, reloadTime: 3.45 }
    },
    bonuses: [{ target: 'infantry', value: 1 }],
    strengths: ["Infantry masses"],
    weaknesses: ["Onagers", "Bombard Cannons"]
  },
  {
    id: "centurion",
    name: "Centurion",
    civilization: "Romans",
    type: "cavalry",
    armorClasses: ["cavalry", "unique_unit"],
    image: "/images/units/unidad_Centurion.png",
    description: "Roman commander.",
    specialAbility: "Buffs Legionaries",
    stats: { 
      castle: { hp: 140, attack: 15, meleeArmor: 5, pierceArmor: 4, speed: 1.35, reloadTime: 1.9 },
      imperial: { hp: 175, attack: 17, meleeArmor: 6, pierceArmor: 7, speed: 1.35, reloadTime: 1.9 }
    },
    bonuses: [],
    strengths: ["Infantry stacks"],
    weaknesses: ["Camels", "Monks"]
  },
  {
    id: "mameluke",
    name: "Mameluke",
    civilization: "Saracens",
    type: "cavalry",
    armorClasses: ["cavalry", "camel", "unique_unit"],
    image: "/images/units/unidad_Mameluke.png",
    description: "Ranged camel.",
    specialAbility: "Ranged melee vs Cav",
    stats: { 
      castle: { hp: 85, attack: 11, meleeArmor: 0, pierceArmor: 0, range: 3, speed: 1.4, reloadTime: 2.0 },
      imperial: { hp: 100, attack: 14, meleeArmor: 4, pierceArmor: 4, range: 3, speed: 1.4, reloadTime: 2.0 }
    },
    bonuses: [{ target: 'cavalry', value: 12 }],
    strengths: ["Cavalry", "Francos"],
    weaknesses: ["Archers", "Skirmishers"]
  },
  {
    id: "serjeant",
    name: "Serjeant",
    civilization: "Sicilians",
    type: "infantry",
    armorClasses: ["infantry", "unique_unit"],
    image: "/images/units/unidad_Serjeant.png",
    description: "Builder infantry.",
    specialAbility: "Builds Donjons",
    stats: { 
      castle: { hp: 65, attack: 12, meleeArmor: 3, pierceArmor: 3, speed: 0.9, reloadTime: 2.0 },
      imperial: { hp: 85, attack: 15, meleeArmor: 8, pierceArmor: 8, speed: 0.9, reloadTime: 2.0 }
    },
    bonuses: [],
    strengths: ["Defense", "Archers"],
    weaknesses: ["Heavy Cavalry", "Leitis"]
  },
  {
    id: "boyar",
    name: "Boyar",
    civilization: "Slavs",
    type: "cavalry",
    armorClasses: ["cavalry", "unique_unit"],
    image: "/images/units/unidad_Boyar.png",
    description: "Heavily armored cavalry.",
    specialAbility: "Extreme Melee Armor",
    stats: { 
      castle: { hp: 120, attack: 16, meleeArmor: 7, pierceArmor: 2, speed: 1.35, reloadTime: 1.9 },
      imperial: { hp: 150, attack: 18, meleeArmor: 12, pierceArmor: 6, speed: 1.35, reloadTime: 1.9 }
    },
    bonuses: [],
    strengths: ["Paladins", "Champions"],
    weaknesses: ["Monks", "Leitis"]
  },
  {
    id: "conquistador",
    name: "Conquistador",
    civilization: "Spanish",
    type: "gunpowder",
    armorClasses: ["archer", "cavalry", "gunpowder", "unique_unit"],
    image: "/images/units/unidad_Conquistador.png",
    description: "Mounted gunner.",
    specialAbility: "High damage mobility",
    stats: { 
      castle: { hp: 75, attack: 16, meleeArmor: 4, pierceArmor: 4, range: 6, speed: 1.3, reloadTime: 2.9 },
      imperial: { hp: 90, attack: 19, meleeArmor: 5, pierceArmor: 6, range: 6, speed: 1.3, reloadTime: 2.9 }
    },
    bonuses: [],
    strengths: ["Infantry", "Raiding"],
    weaknesses: ["Skirmishers", "Genitours"]
  },
  {
    id: "keshik",
    name: "Keshik",
    civilization: "Tatars",
    type: "cavalry",
    armorClasses: ["cavalry", "unique_unit"],
    image: "/images/units/unidad_Keshik.png",
    description: "Gold raider.",
    specialAbility: "Generates Gold",
    stats: { 
      castle: { hp: 130, attack: 13, meleeArmor: 4, pierceArmor: 3, speed: 1.35, reloadTime: 1.9 },
      imperial: { hp: 160, attack: 15, meleeArmor: 5, pierceArmor: 7, speed: 1.35, reloadTime: 1.9 }
    },
    bonuses: [],
    strengths: ["Cost efficiency"],
    weaknesses: ["Halberdiers", "Paladins"]
  },
  {
    id: "teutonic_knight",
    name: "Teutonic Knight",
    civilization: "Teutons",
    type: "infantry",
    armorClasses: ["infantry", "unique_unit"],
    image: "/images/units/unidad_Teutonic_Knight.png",
    description: "Iron fortress.",
    specialAbility: "Extreme armor",
    stats: { 
      castle: { hp: 80, attack: 14, meleeArmor: 9, pierceArmor: 3, speed: 0.7, reloadTime: 2.0 },
      imperial: { hp: 100, attack: 21, meleeArmor: 17, pierceArmor: 5, speed: 0.7, reloadTime: 2.0 }
    },
    bonuses: [],
    strengths: ["Melee combat"],
    weaknesses: ["Archers", "Monks"]
  },
  {
    id: "janissary",
    name: "Janissary",
    civilization: "Turks",
    type: "gunpowder",
    armorClasses: ["archer", "gunpowder", "unique_unit"],
    image: "/images/units/unidad_Janissary.png",
    description: "Elite gunner.",
    specialAbility: "Long range gun",
    stats: { 
      castle: { hp: 35, attack: 17, meleeArmor: 1, pierceArmor: 0, range: 8, speed: 0.96, reloadTime: 3.45 },
      imperial: { hp: 44, attack: 23, meleeArmor: 1, pierceArmor: 0, range: 8, speed: 0.96, reloadTime: 3.45 }
    },
    bonuses: [],
    strengths: ["Infantry", "Cavalry"],
    weaknesses: ["Skirmishers", "Bombard Cannons"]
  },
  {
    id: "rattan_archer",
    name: "Rattan Archer",
    civilization: "Vietnamese",
    type: "archer",
    armorClasses: ["archer", "unique_unit"],
    image: "/images/units/unidad_Rattan_Archer.png",
    description: "Anti-archer archer.",
    specialAbility: "Extreme pierce armor",
    stats: { 
      castle: { hp: 40, attack: 9, meleeArmor: 0, pierceArmor: 4, range: 4, speed: 1.1, reloadTime: 2.0 },
      imperial: { hp: 54, attack: 11, meleeArmor: 0, pierceArmor: 10, range: 5, speed: 1.1, reloadTime: 1.7 }
    },
    bonuses: [],
    strengths: ["Archers", "Crossbowmen"],
    weaknesses: ["Cavalry", "Skirmishers"]
  },
  {
    id: "berserk",
    name: "Berserk",
    civilization: "Vikings",
    type: "infantry",
    armorClasses: ["infantry", "unique_unit"],
    image: "/images/units/unidad_Berserk.png",
    description: "Regenerating infantry.",
    specialAbility: "Regenerates HP",
    stats: { 
      castle: { hp: 61, attack: 13, meleeArmor: 2, pierceArmor: 2, speed: 1.05, reloadTime: 2.0 },
      imperial: { hp: 75, attack: 18, meleeArmor: 4, pierceArmor: 4, speed: 1.05, reloadTime: 2.0 }
    },
    bonuses: [{ target: 'cavalry', value: 5 }],
    strengths: ["Cavalry", "Infantry"],
    weaknesses: ["Archers", "Hand Cannoneers"]
  },
  {
    id: "white_feather_guard",
    name: "White Feather Guard",
    civilization: "Shu",
    type: "infantry",
    armorClasses: ["infantry", "unique_unit"],
    image: "/images/units/unidad_White_Feather.png",
    description: "Defensive infantry.",
    specialAbility: "Slows enemies on hit",
    stats: { 
      castle: { hp: 60, attack: 10, meleeArmor: 2, pierceArmor: 2, speed: 1.1, reloadTime: 2.0 },
      imperial: { hp: 75, attack: 14, meleeArmor: 4, pierceArmor: 4, speed: 1.1, reloadTime: 2.0 }
    },
    bonuses: [],
    strengths: ["Cavalry", "Archers"],
    weaknesses: ["Hand Cannoneers"]
  },
  {
    id: "tiger_cavalry",
    name: "Tiger Cavalry",
    civilization: "Wei",
    type: "cavalry",
    armorClasses: ["cavalry", "unique_unit"],
    image: "/images/units/unidad_Tiger_Cav.png",
    description: "Fast shock cavalry.",
    specialAbility: "Charge Attack +15",
    stats: { 
      castle: { hp: 120, attack: 12, meleeArmor: 2, pierceArmor: 2, speed: 1.45, reloadTime: 1.9 },
      imperial: { hp: 150, attack: 15, meleeArmor: 3, pierceArmor: 3, speed: 1.45, reloadTime: 1.9 }
    },
    bonuses: [],
    strengths: ["Siege", "Archers"],
    weaknesses: ["Halberdiers"]
  },
  {
    id: "jian_swordsman",
    name: "Jian Swordsman",
    civilization: "Wu",
    type: "infantry",
    armorClasses: ["infantry", "unique_unit"],
    image: "/images/units/unidad_Jian.png",
    description: "Berserker-style infantry.",
    specialAbility: "Move speed bonus when hit",
    stats: { 
      castle: { hp: 65, attack: 11, meleeArmor: 1, pierceArmor: 3, speed: 1.2, reloadTime: 2.0 },
      imperial: { hp: 80, attack: 14, meleeArmor: 2, pierceArmor: 5, speed: 1.2, reloadTime: 2.0 }
    },
    bonuses: [],
    strengths: ["Archers", "Skirmishers"],
    weaknesses: ["Heavy Cavalry"]
  },
  {
    id: "iron_pagoda",
    name: "Iron Pagoda",
    civilization: "Jurchens",
    type: "cavalry",
    armorClasses: ["cavalry", "unique_unit"],
    image: "/images/units/unidad_Iron_Pagoda.png",
    description: "Ultra-heavy cavalry.",
    specialAbility: "Blocks melee dmg %",
    stats: { 
      castle: { hp: 140, attack: 14, meleeArmor: 5, pierceArmor: 3, speed: 1.3, reloadTime: 2.1 },
      imperial: { hp: 180, attack: 18, meleeArmor: 7, pierceArmor: 5, speed: 1.3, reloadTime: 2.1 }
    },
    bonuses: [],
    strengths: ["Infantry", "Paladins"],
    weaknesses: ["Monks", "Halberdiers"]
  },
  {
    id: "liao_dao",
    name: "Liao Dao",
    civilization: "Khitans",
    type: "infantry",
    armorClasses: ["infantry", "unique_unit"],
    image: "/images/units/unidad_Liao_Dao.png",
    description: "Bleed infantry.",
    specialAbility: "Bleed Damage DOT",
    stats: { 
      castle: { hp: 60, attack: 9, meleeArmor: 1, pierceArmor: 1, speed: 1.15, reloadTime: 2.0 },
      imperial: { hp: 75, attack: 12, meleeArmor: 2, pierceArmor: 2, speed: 1.15, reloadTime: 2.0 }
    },
    bonuses: [],
    strengths: ["High HP Units"],
    weaknesses: ["Archers", "Scorpions"]
  }
];
