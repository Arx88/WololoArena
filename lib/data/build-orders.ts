// Build orders data extracted from AoE Companion, AoE Builds, and Age of Notes
export interface BuildOrderStep {
  villagerCount: number
  task: string
  details?: string
  subSteps?: string[]
}

export interface BuildOrder {
  id: string
  name: string
  nameEs: string
  type: "rush" | "boom" | "fast-castle" | "all-in"
  difficulty: "beginner" | "intermediate" | "advanced"
  description: string
  descriptionEs: string
  recommendedCivs: string[]
  targetAge: "feudal" | "castle" | "imperial"
  popCount: number
  steps: {
    darkAge: BuildOrderStep[]
    feudalAge?: BuildOrderStep[]
    castleAge?: BuildOrderStep[]
  }
  tips: string[]
  tipsEs: string[]
}

export const BUILD_ORDERS: BuildOrder[] = [
  {
    id: "scout-rush-20",
    name: "Scout Rush (20 Pop)",
    nameEs: "Rush de Scouts (20 Pob)",
    type: "rush",
    difficulty: "beginner",
    description: "Fast scout rush that is easily executed. Perfect to surprise your opponents and get an early lead.",
    descriptionEs: "Rush de scouts rápido y fácil de ejecutar. Perfecto para sorprender a tus oponentes.",
    recommendedCivs: ["franks", "huns", "magyars", "mongols", "berbers", "lithuanians", "persians", "poles", "cumans"],
    targetAge: "feudal",
    popCount: 20,
    steps: {
      darkAge: [
        { villagerCount: 3, task: "Build 2 Houses", details: "Two villagers build one, one builds the other" },
        { villagerCount: 7, task: "Sheep", details: "Send villagers to sheep under TC" },
        { villagerCount: 8, task: "Wood", details: "Build lumber camp and send to wood" },
        { villagerCount: 9, task: "Wood", details: "Continue sending to wood" },
        { villagerCount: 10, task: "Lure Boar", details: "Lure first boar with new villager" },
        { villagerCount: 11, task: "Berries", details: "Build mill at berries" },
        { villagerCount: 13, task: "Lure 2nd Boar", details: "Send boar villager to lure second boar" },
        { villagerCount: 14, task: "Berries", details: "Send to berries (4 total)" },
        { villagerCount: 17, task: "Wood", details: "Build 2nd lumber camp at new woodline" },
        { villagerCount: 18, task: "Build Barracks", details: "Send one villager to build barracks" },
        { villagerCount: 19, task: "Research Loom", details: "Queue Feudal Age after loom" },
      ],
      feudalAge: [
        { villagerCount: 20, task: "Build Stable", details: "Immediately build stable" },
        { villagerCount: 21, task: "Farm", details: "Build farms with food villagers" },
        { villagerCount: 22, task: "Farm", details: "Continue farms, train scouts non-stop" },
      ],
    },
    tips: [
      "Keep TC producing villagers constantly",
      "Attack opponent's woodlines and gold mines",
      "Don't lose your scouts to TC fire",
      "Transition to knights in Castle Age",
    ],
    tipsEs: [
      "Mantén el TC produciendo aldeanos constantemente",
      "Ataca las líneas de madera y minas de oro enemigas",
      "No pierdas tus scouts al fuego del TC",
      "Transiciona a caballeros en Edad de los Castillos",
    ],
  },
  {
    id: "archer-rush-22",
    name: "Archer Rush (22 Pop)",
    nameEs: "Rush de Arqueros (22 Pob)",
    type: "rush",
    difficulty: "beginner",
    description: "Classic archer rush for continuous pressure in Feudal Age. Best for archer civilizations.",
    descriptionEs: "Rush clásico de arqueros para presión continua en Feudal. Mejor para civilizaciones de arqueros.",
    recommendedCivs: [
      "britons",
      "mayans",
      "ethiopians",
      "vietnamese",
      "chinese",
      "japanese",
      "koreans",
      "italians",
      "saracens",
    ],
    targetAge: "feudal",
    popCount: 22,
    steps: {
      darkAge: [
        { villagerCount: 3, task: "Build 2 Houses", details: "Standard opening" },
        { villagerCount: 6, task: "Sheep", details: "6 on sheep" },
        { villagerCount: 10, task: "Wood", details: "4 on wood (build lumber camp)" },
        { villagerCount: 11, task: "Lure Boar", details: "Lure first boar" },
        { villagerCount: 13, task: "Berries", details: "Build mill, 3 on berries" },
        { villagerCount: 14, task: "Lure 2nd Boar", details: "Lure second boar" },
        { villagerCount: 16, task: "Boar", details: "Food under TC" },
        { villagerCount: 18, task: "Gold", details: "Build mining camp, 3 on gold" },
        { villagerCount: 20, task: "Wood", details: "More to wood" },
        { villagerCount: 21, task: "Build Barracks", details: "While researching loom" },
        { villagerCount: 21, task: "Click Feudal", details: "Should have 500 food" },
      ],
      feudalAge: [
        { villagerCount: 22, task: "Build 2 Archery Ranges", details: "Immediately" },
        { villagerCount: 23, task: "Research Fletching", details: "Build blacksmith first" },
        { villagerCount: 24, task: "Produce Archers", details: "Non-stop from both ranges" },
      ],
    },
    tips: [
      "Get Fletching ASAP",
      "Micro archers away from scouts",
      "Target villagers on resources",
      "Add more ranges as economy grows",
    ],
    tipsEs: [
      "Investiga Emplumado lo antes posible",
      "Micro los arqueros lejos de los scouts",
      "Apunta a los aldeanos en recursos",
      "Añade más rangos según crece la economía",
    ],
  },
  {
    id: "fast-castle-knights",
    name: "Fast Castle Knights",
    nameEs: "Castillos Rápidos Caballeros",
    type: "fast-castle",
    difficulty: "intermediate",
    description: "Rush to Castle Age for powerful knights. Great for team games pocket position.",
    descriptionEs: "Rush a Edad de los Castillos para caballeros poderosos. Excelente para pocket en TG.",
    recommendedCivs: [
      "franks",
      "teutons",
      "burgundians",
      "persians",
      "berbers",
      "poles",
      "huns",
      "lithuanians",
      "cumans",
    ],
    targetAge: "castle",
    popCount: 27,
    steps: {
      darkAge: [
        { villagerCount: 6, task: "Sheep", details: "Standard start" },
        { villagerCount: 10, task: "Wood", details: "4 on wood" },
        { villagerCount: 11, task: "Boar", details: "Lure boar" },
        { villagerCount: 13, task: "Berries", details: "3 on berries" },
        { villagerCount: 16, task: "2nd Boar", details: "Lure and gather" },
        { villagerCount: 20, task: "Farms", details: "Start building farms" },
        { villagerCount: 22, task: "Gold", details: "2 on gold" },
        { villagerCount: 23, task: "Click Feudal", details: "800 food" },
      ],
      feudalAge: [
        { villagerCount: 24, task: "Blacksmith + Stable", details: "Immediately" },
        { villagerCount: 26, task: "More Gold", details: "5 total on gold" },
        { villagerCount: 27, task: "Click Castle Age", details: "With 800 food 200 gold" },
      ],
      castleAge: [
        { villagerCount: 28, task: "2nd Stable", details: "Start knight production" },
        { villagerCount: 30, task: "More Farms", details: "Support knight production" },
      ],
    },
    tips: [
      "Get Bloodlines and +1 armor quickly",
      "Support your flank teammate",
      "Keep knight production non-stop",
      "Add 3rd stable when economy allows",
    ],
    tipsEs: [
      "Investiga Linaje y +1 armadura rápido",
      "Apoya a tu compañero de flank",
      "Mantén producción de caballeros constante",
      "Añade 3er establo cuando la economía lo permita",
    ],
  },
  {
    id: "men-at-arms-archers",
    name: "Men-at-Arms into Archers",
    nameEs: "Hombres de Armas hacia Arqueros",
    type: "rush",
    difficulty: "advanced",
    description: "Early Men-at-Arms pressure followed by archer transition. Very popular in competitive play.",
    descriptionEs: "Presión temprana con Hombres de Armas seguido de arqueros. Muy popular en competitivo.",
    recommendedCivs: ["aztecs", "vikings", "japanese", "bulgarians", "goths", "celts", "romans", "malians"],
    targetAge: "feudal",
    popCount: 21,
    steps: {
      darkAge: [
        { villagerCount: 6, task: "Sheep", details: "Under TC" },
        { villagerCount: 10, task: "Wood", details: "4 on wood" },
        { villagerCount: 11, task: "Boar", details: "Lure first boar" },
        { villagerCount: 13, task: "Berries", details: "Mill + berries" },
        { villagerCount: 15, task: "2nd Boar", details: "Lure and gather" },
        { villagerCount: 16, task: "Barracks", details: "Queue 3 militia" },
        { villagerCount: 18, task: "More Food", details: "For militias + loom" },
        { villagerCount: 19, task: "Click Feudal", details: "With 3 militia ready" },
      ],
      feudalAge: [
        { villagerCount: 20, task: "Research M@A", details: "Immediately" },
        { villagerCount: 21, task: "Send M@A to attack", details: "Target woodlines" },
        { villagerCount: 22, task: "Build 2 Archery Ranges", details: "While M@A are fighting" },
        { villagerCount: 23, task: "Transition to Archers", details: "Constant production" },
      ],
    },
    tips: [
      "M@A should do damage, not trade evenly",
      "Target villagers, not buildings",
      "Transition smoothly to archers",
      "Keep military production constant",
    ],
    tipsEs: [
      "Los M@A deben hacer daño, no tradear igual",
      "Apunta a aldeanos, no edificios",
      "Transiciona suavemente a arqueros",
      "Mantén producción militar constante",
    ],
  },
  {
    id: "drush-fc",
    name: "Drush Fast Castle",
    nameEs: "Drush Castle Rápido",
    type: "fast-castle",
    difficulty: "intermediate",
    description: "Dark Age militia rush to delay opponent, then boom to Castle Age.",
    descriptionEs: "Rush de milicia en Dark para retrasar al oponente, luego boom a Castle.",
    recommendedCivs: ["aztecs", "mayans", "incas", "vikings", "japanese", "goths", "celts", "malians"],
    targetAge: "castle",
    popCount: 26,
    steps: {
      darkAge: [
        { villagerCount: 6, task: "Sheep", details: "Standard" },
        { villagerCount: 8, task: "Wood", details: "2 on wood" },
        { villagerCount: 10, task: "Barracks", details: "With wood villager" },
        { villagerCount: 11, task: "Boar", details: "Lure boar" },
        { villagerCount: 13, task: "Berries", details: "Mill + berries" },
        { villagerCount: 14, task: "Queue 3 Militia", details: "Send to enemy" },
        { villagerCount: 15, task: "2nd Boar", details: "Continue food" },
        { villagerCount: 20, task: "Wood + Gold", details: "Balance resources" },
        { villagerCount: 23, task: "Click Feudal", details: "800 food" },
      ],
      feudalAge: [
        { villagerCount: 24, task: "Market + Blacksmith", details: "For Castle Age" },
        { villagerCount: 26, task: "Click Castle Age", details: "800 food 200 gold" },
      ],
      castleAge: [
        { villagerCount: 27, task: "Build TCs", details: "Boom economy" },
        { villagerCount: 30, task: "Military Production", details: "Based on situation" },
      ],
    },
    tips: [
      "Militia should harass, not fight to death",
      "Target villagers walking to resources",
      "Focus on smooth eco, not max damage",
      "Scout what opponent is doing",
    ],
    tipsEs: [
      "La milicia debe hostigar, no pelear hasta morir",
      "Apunta aldeanos caminando a recursos",
      "Enfócate en eco suave, no daño máximo",
      "Explora qué hace el oponente",
    ],
  },
  {
    id: "fc-boom",
    name: "Fast Castle Boom",
    nameEs: "Castle Rápido Boom",
    type: "boom",
    difficulty: "beginner",
    description: "Safe Fast Castle into economic boom. Good for closed maps or team games.",
    descriptionEs: "Castle Rápido seguro hacia boom económico. Bueno para mapas cerrados o TG.",
    recommendedCivs: ["byzantines", "chinese", "persians", "khmer", "malians", "portuguese", "spanish", "italians"],
    targetAge: "castle",
    popCount: 28,
    steps: {
      darkAge: [
        { villagerCount: 6, task: "Sheep", details: "Under TC" },
        { villagerCount: 10, task: "Wood", details: "4 to lumber camp" },
        { villagerCount: 11, task: "Boar", details: "Lure boar" },
        { villagerCount: 14, task: "Berries", details: "Mill + berries" },
        { villagerCount: 17, task: "2nd Boar + Farms", details: "Transition to farms" },
        { villagerCount: 20, task: "Gold", details: "2 on gold" },
        { villagerCount: 22, task: "More Farms", details: "6-8 farms total" },
        { villagerCount: 24, task: "Click Feudal", details: "800 food" },
      ],
      feudalAge: [
        { villagerCount: 25, task: "Market + Blacksmith", details: "Required for Castle" },
        { villagerCount: 27, task: "More Gold", details: "5 on gold" },
        { villagerCount: 28, task: "Click Castle Age", details: "800 food 200 gold" },
      ],
      castleAge: [
        { villagerCount: 29, task: "Build 2 TCs", details: "Boom hard" },
        { villagerCount: 30, task: "Balance Economy", details: "For late game army" },
      ],
    },
    tips: [
      "Wall your base for safety",
      "Keep TC production non-stop in Castle",
      "Research eco upgrades",
      "Scout enemy to prepare counter units",
    ],
    tipsEs: [
      "Muralla tu base por seguridad",
      "Mantén producción de TC constante en Castle",
      "Investiga mejoras económicas",
      "Explora al enemigo para preparar contra-unidades",
    ],
  },
  {
    id: "tower-rush",
    name: "Tower Rush (Trush)",
    nameEs: "Rush de Torres (Trush)",
    type: "all-in",
    difficulty: "advanced",
    description: "Aggressive tower rush to deny opponent's resources. High risk, high reward.",
    descriptionEs: "Rush de torres agresivo para negar recursos al oponente. Alto riesgo, alta recompensa.",
    recommendedCivs: ["koreans", "incas", "teutons", "spanish", "byzantines"],
    targetAge: "feudal",
    popCount: 20,
    steps: {
      darkAge: [
        { villagerCount: 6, task: "Sheep", details: "Standard" },
        { villagerCount: 10, task: "Wood", details: "4 on wood" },
        { villagerCount: 11, task: "Boar", details: "Lure boar" },
        { villagerCount: 13, task: "Stone", details: "2-3 on stone mining" },
        { villagerCount: 15, task: "2nd Boar", details: "Continue food" },
        { villagerCount: 18, task: "More Stone", details: "4-5 on stone total" },
        { villagerCount: 19, task: "Click Feudal", details: "With 150+ stone" },
      ],
      feudalAge: [
        { villagerCount: 20, task: "Build Towers", details: "Near enemy resources" },
        { villagerCount: 21, task: "Forward Vills", details: "Send 4-5 to forward" },
        { villagerCount: 22, task: "Chain Towers", details: "Deny gold/stone" },
      ],
    },
    tips: [
      "Scout enemy base before committing",
      "Build towers within range of resources",
      "Bring backup villagers to repair",
      "Transition to archers if towers succeed",
    ],
    tipsEs: [
      "Explora la base enemiga antes de comprometerte",
      "Construye torres al alcance de recursos",
      "Trae aldeanos de reserva para reparar",
      "Transiciona a arqueros si las torres funcionan",
    ],
  },
  {
    id: "eagle-rush",
    name: "Eagle Rush",
    nameEs: "Rush de Águilas",
    type: "rush",
    difficulty: "intermediate",
    description: "Fast Eagle Scout rush for Meso civilizations. Excellent raiding potential.",
    descriptionEs: "Rush rápido de Águilas para civilizaciones Meso. Excelente potencial de raid.",
    recommendedCivs: ["aztecs", "mayans", "incas"],
    targetAge: "feudal",
    popCount: 21,
    steps: {
      darkAge: [
        { villagerCount: 6, task: "Sheep", details: "Under TC" },
        { villagerCount: 10, task: "Wood", details: "4 on wood" },
        { villagerCount: 11, task: "Boar", details: "Lure boar" },
        { villagerCount: 13, task: "Berries", details: "Mill + berries" },
        { villagerCount: 16, task: "2nd Boar", details: "Continue food" },
        { villagerCount: 17, task: "Barracks", details: "For Eagles" },
        { villagerCount: 19, task: "Gold", details: "3 on gold" },
        { villagerCount: 20, task: "Click Feudal", details: "With barracks done" },
      ],
      feudalAge: [
        { villagerCount: 21, task: "Queue Eagles", details: "From barracks" },
        { villagerCount: 22, task: "2nd Barracks", details: "Increase production" },
        { villagerCount: 24, task: "Raid Economy", details: "Target woodlines" },
      ],
    },
    tips: [
      "Eagles are fast - use them to raid",
      "Avoid M@A and towers early",
      "Mix with archers for balanced comp",
      "El Dorado Eagles (Mayans) have 100 HP",
    ],
    tipsEs: [
      "Las águilas son rápidas - úsalas para raids",
      "Evita M@A y torres al principio",
      "Mezcla con arqueros para comp balanceado",
      "Águilas El Dorado (Mayas) tienen 100 HP",
    ],
  },
]

export function getBuildOrdersForCiv(civId: string): BuildOrder[] {
  return BUILD_ORDERS.filter((bo) => bo.recommendedCivs.includes(civId))
}

export function getBuildOrderById(id: string): BuildOrder | undefined {
  return BUILD_ORDERS.find((bo) => bo.id === id)
}

export function getAllBuildOrders(): BuildOrder[] {
  return BUILD_ORDERS
}
