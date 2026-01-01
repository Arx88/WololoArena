export interface TeamRatings {
  economy: number
  rush: number
  lateGame: number
  defense: number
  mobility: number
}

export interface CivilizationBonus {
  type: "economy" | "military" | "defense" | "utility"
  description: string
}

export interface Civilization {
  id: string
  name: string
  expansion: "base" | "conquerors" | "forgotten" | "african" | "rajas" | "dlc" | "dynasties"
  specialty: string
  icon: string
  teamBonus: string
  bonuses: CivilizationBonus[]
  synergyTags: string[]
  strengths: string[]
  weaknesses: string[]
  bestPositions: ("flank" | "pocket")[]
  synergyWith: string[]
  ratings: TeamRatings
}

const WIKI_BASE = "https://static.wikia.nocookie.net/ageofempires/images"

export const CIVILIZATIONS: Civilization[] = [
  {
    id: "armenians",
    name: "Armenians",
    expansion: "dlc",
    specialty: "Infantry & Naval",
    icon: `${WIKI_BASE}/e/e3/Armenians_AoE2.png`,
    teamBonus: "Infantry +2 Line of Sight",
    bonuses: [
      { type: "economy", description: "Mule Carts cost -25%" },
      { type: "economy", description: "Mule Cart technologies are +40% more effective" },
      { type: "military", description: "Spearman- and Militia-line upgrades (except Man-at-Arms) available one age earlier" }
    ],
    synergyTags: ['infantry', 'monks', 'defense'],
    strengths: ['Versatile military', 'Strong monks'],
    weaknesses: ['Average economy'],
    bestPositions: ['pocket'],
    synergyWith: ['goths', 'japanese'],
    ratings: { economy: 6, rush: 7, lateGame: 7, defense: 7, mobility: 5 },
  },
  {
    id: "aztecs",
    name: "Aztecs",
    expansion: "conquerors",
    specialty: "Infantry & Monks",
    icon: `${WIKI_BASE}/6/6e/Aztecs_AoE2.png`,
    teamBonus: "Relics generate +33% gold",
    bonuses: [
      { type: "economy", description: "Villagers carry +3 extra resources" },
      { type: "military", description: "Military units created 15% faster" }
    ],
    synergyTags: ['infantry', 'monks', 'economy'],
    strengths: ['Fast military production', 'Strong Monks'],
    weaknesses: ['No cavalry'],
    bestPositions: ['flank'],
    synergyWith: ['lithuanians', 'burgundians'],
    ratings: { economy: 8, rush: 9, lateGame: 6, defense: 6, mobility: 6 },
  },
  {
    id: "bengalis",
    name: "Bengalis",
    expansion: "dynasties",
    specialty: "Elephants & Navy",
    icon: `${WIKI_BASE}/0/09/Bengalis_AoE2.png`,
    teamBonus: "Trade units yield 10% food",
    bonuses: [
      { type: "economy", description: "Town Centers spawn 2 Villagers when advancing" }
    ],
    synergyTags: ['elephants', 'navy', 'economy'],
    strengths: ['Tanky elephants', 'Strong navy'],
    weaknesses: ['Slow elephants'],
    bestPositions: ['pocket'],
    synergyWith: ['spanish', 'portuguese'],
    ratings: { economy: 8, rush: 4, lateGame: 8, defense: 7, mobility: 5 },
  },
  {
    id: "berbers",
    name: "Berbers",
    expansion: "african",
    specialty: "Cavalry & Navy",
    icon: `${WIKI_BASE}/8/8d/Berbers_AoE2.png`,
    teamBonus: "Genitours available",
    bonuses: [
      { type: "economy", description: "Villagers move 10% faster" },
      { type: "military", description: "Stable units cost -15/20%" }
    ],
    synergyTags: ['cavalry', 'navy', 'mobility'],
    strengths: ['Cheap cavalry', 'Fast villagers'],
    weaknesses: ['Weak infantry'],
    bestPositions: ['pocket', 'flank'],
    synergyWith: ['turks', 'byzantines'],
    ratings: { economy: 7, rush: 8, lateGame: 8, defense: 5, mobility: 10 },
  },
  {
    id: "bohemians",
    name: "Bohemians",
    expansion: "dlc",
    specialty: "Monks & Gunpowder",
    icon: `${WIKI_BASE}/3/35/Bohemians_AoE2.png`,
    teamBonus: "Markets work 80% faster",
    bonuses: [
      { type: "military", description: "Chemistry available in Castle Age" },
      { type: "utility", description: "Spearman-line +25% bonus damage" }
    ],
    synergyTags: ['gunpowder', 'monks', 'anti-siege'],
    strengths: ['Early gunpowder', 'Strong monks'],
    weaknesses: ['No cavalry'],
    bestPositions: ['flank'],
    synergyWith: ['spanish', 'turks'],
    ratings: { economy: 7, rush: 5, lateGame: 9, defense: 8, mobility: 4 },
  },
  {
    id: "britons",
    name: "Britons",
    expansion: "base",
    specialty: "Archers",
    icon: `${WIKI_BASE}/3/3b/Britons_AoE2.png`,
    teamBonus: "Archery Ranges work 10% faster",
    bonuses: [
      { type: "military", description: "Foot archers +1/+2 range" },
      { type: "economy", description: "Shepherds work 25% faster" }
    ],
    synergyTags: ['archers', 'range'],
    strengths: ['Best foot archers', 'Long range'],
    weaknesses: ['Weak cavalry'],
    bestPositions: ['flank'],
    synergyWith: ['ethiopians', 'mayans'],
    ratings: { economy: 7, rush: 7, lateGame: 9, defense: 8, mobility: 5 },
  },
  {
    id: "bulgarians",
    name: "Bulgarians",
    expansion: "dlc",
    specialty: "Infantry & Cavalry",
    icon: `${WIKI_BASE}/e/e6/Bulgarians_AoE2.png`,
    teamBonus: "Blacksmiths work 80% faster",
    bonuses: [
      { type: "military", description: "Militia-line upgrades free" },
      { type: "military", description: "Krepost available" }
    ],
    synergyTags: ['infantry', 'cavalry'],
    strengths: ['Fast upgrades', 'Strong Konniks'],
    weaknesses: ['Weak archers'],
    bestPositions: ['pocket', 'flank'],
    synergyWith: ['franks', 'teutons'],
    ratings: { economy: 6, rush: 8, lateGame: 8, defense: 7, mobility: 7 },
  },
  {
    id: "burgundians",
    name: "Burgundians",
    expansion: "dlc",
    specialty: "Cavalry",
    icon: `${WIKI_BASE}/a/a2/Burgundians_AoE2.png`,
    teamBonus: "Relics generate food",
    bonuses: [
      { type: "economy", description: "Economic upgrades available one age earlier" },
      { type: "military", description: "Cavalier available in Castle Age" }
    ],
    synergyTags: ['cavalry', 'economy'],
    strengths: ['Early Cavaliers', 'Strong economy'],
    weaknesses: ['Weak archers'],
    bestPositions: ['pocket'],
    synergyWith: ['aztecs', 'lithuanians'],
    ratings: { economy: 10, rush: 6, lateGame: 8, defense: 6, mobility: 7 },
  },
  {
    id: "burmese",
    name: "Burmese",
    expansion: "rajas",
    specialty: "Monks & Elephants",
    icon: `${WIKI_BASE}/3/30/Burmese_AoE2.png`,
    teamBonus: "Relics visible on map",
    bonuses: [
      { type: "economy", description: "Free Lumber Camp upgrades" },
      { type: "military", description: "Infantry +1/+2/+3 attack per Age" }
    ],
    synergyTags: ['infantry', 'monks', 'relics'],
    strengths: ['Strong infantry', 'Cheap monastery techs'],
    weaknesses: ['Weak archers'],
    bestPositions: ['pocket', 'flank'],
    synergyWith: ['aztecs', 'lithuanians'],
    ratings: { economy: 7, rush: 7, lateGame: 7, defense: 6, mobility: 6 },
  },
  {
    id: "byzantines",
    name: "Byzantines",
    expansion: "base",
    specialty: "Defense",
    icon: `${WIKI_BASE}/2/2a/Byzantines_AoE2.png`,
    teamBonus: "Monks heal 100% faster",
    bonuses: [
      { type: "defense", description: "Buildings +10-40% HP" },
      { type: "military", description: "Counter units cost -25%" }
    ],
    synergyTags: ['defense', 'counter-units'],
    strengths: ['Cheap counter units', 'Strong defense'],
    weaknesses: ['No strong power unit'],
    bestPositions: ['flank', 'pocket'],
    synergyWith: ['aztecs', 'lithuanians'],
    ratings: { economy: 7, rush: 5, lateGame: 9, defense: 10, mobility: 6 },
  },
  {
    id: "celts",
    name: "Celts",
    expansion: "base",
    specialty: "Infantry & Siege",
    icon: `${WIKI_BASE}/8/88/Celts_AoE2.png`,
    teamBonus: "Siege Workshops work 20% faster",
    bonuses: [
      { type: "economy", description: "Lumberjacks work 15% faster" },
      { type: "military", description: "Siege weapons fire 25% faster" }
    ],
    synergyTags: ['infantry', 'siege'],
    strengths: ['Best siege', 'Fast infantry'],
    weaknesses: ['Weak archers'],
    bestPositions: ['pocket'],
    synergyWith: ['mongols', 'slavs'],
    ratings: { economy: 8, rush: 7, lateGame: 8, defense: 6, mobility: 7 },
  },
  {
    id: "chinese",
    name: "Chinese",
    expansion: "base",
    specialty: "Archers",
    icon: `${WIKI_BASE}/1/18/Chinese_AoE2.png`,
    teamBonus: "Farms contain +10% food",
    bonuses: [
      { type: "economy", description: "Start with +3 Villagers, -200 food" },
      { type: "economy", description: "Technologies cost -10/15/20%" }
    ],
    synergyTags: ['archers', 'economy', 'tech'],
    strengths: ['Cheap techs', 'Versatile'],
    weaknesses: ['Difficult dark age'],
    bestPositions: ['flank'],
    synergyWith: ['slavs', 'teutons'],
    ratings: { economy: 9, rush: 7, lateGame: 8, defense: 8, mobility: 6 },
  },
  {
    id: "cumans",
    name: "Cumans",
    expansion: "dlc",
    specialty: "Cavalry",
    icon: `${WIKI_BASE}/b/be/Cumans_AoE2.png`,
    teamBonus: "Palisade Walls +33% HP",
    bonuses: [
      { type: "military", description: "Second TC in Feudal Age" },
      { type: "military", description: "Cavalry move 5/10% faster" }
    ],
    synergyTags: ['cavalry', 'boom'],
    strengths: ['Early aggression', 'Fast boom'],
    weaknesses: ['Weak late game'],
    bestPositions: ['pocket'],
    synergyWith: ['franks', 'huns'],
    ratings: { economy: 9, rush: 8, lateGame: 7, defense: 5, mobility: 9 },
  },
  {
    id: "dravidians",
    name: "Dravidians",
    expansion: "dynasties",
    specialty: "Infantry & Navy",
    icon: `${WIKI_BASE}/d/d1/Dravidians_AoE2.png`,
    teamBonus: "Docks provide +5 pop",
    bonuses: [
      { type: "economy", description: "Fishermen carry +15" },
      { type: "military", description: "Infantry receive -25% bonus damage" }
    ],
    synergyTags: ['infantry', 'navy'],
    strengths: ['Strong navy', 'Tanky infantry'],
    weaknesses: ['No cavalry'],
    bestPositions: ['flank'],
    synergyWith: ['japanese', 'vikings'],
    ratings: { economy: 7, rush: 6, lateGame: 8, defense: 7, mobility: 5 },
  },
  {
    id: "ethiopians",
    name: "Ethiopians",
    expansion: "african",
    specialty: "Archers & Siege",
    icon: `${WIKI_BASE}/0/0b/Ethiopians_AoE2.png`,
    teamBonus: "Outposts +3 LOS",
    bonuses: [
      { type: "economy", description: "+100 gold/food on age up" },
      { type: "military", description: "Archers fire 18% faster" }
    ],
    synergyTags: ['archers', 'siege'],
    strengths: ['Fast-firing archers', 'Age-up bonus'],
    weaknesses: ['Weak cavalry'],
    bestPositions: ['flank'],
    synergyWith: ['britons', 'saracens'],
    ratings: { economy: 7, rush: 8, lateGame: 8, defense: 5, mobility: 6 },
  },
  {
    id: "franks",
    name: "Franks",
    expansion: "base",
    specialty: "Cavalry",
    icon: `${WIKI_BASE}/b/bc/Franks_AoE2.png`,
    teamBonus: "Knights +2 Line of Sight",
    bonuses: [
      { type: "economy", description: "Free farm upgrades" },
      { type: "military", description: "Mounted units +20% HP" }
    ],
    synergyTags: ['cavalry', 'knights'],
    strengths: ['Tanky knights', 'Free farm upgrades'],
    weaknesses: ['Weak archers'],
    bestPositions: ['pocket'],
    synergyWith: ['persians', 'huns'],
    ratings: { economy: 8, rush: 9, lateGame: 8, defense: 6, mobility: 9 },
  },
  {
    id: "georgians",
    name: "Georgians",
    expansion: "dlc",
    specialty: "Cavalry & Defense",
    icon: `${WIKI_BASE}/4/4c/Georgians_AoE2.png`,
    teamBonus: "Buildings repair -25% cost",
    bonuses: [
      { type: "defense", description: "Receive -20% damage on elevation" },
      { type: "military", description: "Cavalry regenerate HP" }
    ],
    synergyTags: ['cavalry', 'defense'],
    strengths: ['Regenerating cavalry', 'Strong on hills'],
    weaknesses: ['Map dependent'],
    bestPositions: ['pocket'],
    synergyWith: ['franks', 'teutons'],
    ratings: { economy: 7, rush: 6, lateGame: 8, defense: 8, mobility: 7 },
  },
  {
    id: "goths",
    name: "Goths",
    expansion: "base",
    specialty: "Infantry",
    icon: `${WIKI_BASE}/9/9e/Goths_AoE2.png`,
    teamBonus: "Barracks work 20% faster",
    bonuses: [
      { type: "military", description: "Infantry cost -20-35%" },
      { type: "military", description: "Population cap +10" }
    ],
    synergyTags: ['infantry', 'spam'],
    strengths: ['Infantry spam', 'Strong late game flood'],
    weaknesses: ['Weak early game'],
    bestPositions: ['pocket'],
    synergyWith: ['armenians', 'japanese'],
    ratings: { economy: 6, rush: 7, lateGame: 10, defense: 4, mobility: 6 },
  },
  {
    id: "gurjaras",
    name: "Gurjaras",
    expansion: "dynasties",
    specialty: "Cavalry & Camels",
    icon: `${WIKI_BASE}/2/2c/Gurjaras_AoE2.png`,
    teamBonus: "Camel/Elephants created 25% faster",
    bonuses: [
      { type: "economy", description: "Garrison livestock in Mills" },
      { type: "military", description: "Mounted units deal +50% bonus damage" }
    ],
    synergyTags: ['cavalry', 'camels'],
    strengths: ['Best camels', 'Unique eco'],
    weaknesses: ['No knights'],
    bestPositions: ['pocket'],
    synergyWith: ['hindustanis', 'saracens'],
    ratings: { economy: 7, rush: 8, lateGame: 8, defense: 6, mobility: 9 },
  },
  {
    id: "hindustanis",
    name: "Hindustanis",
    expansion: "dynasties",
    specialty: "Gunpowder & Camels",
    icon: `${WIKI_BASE}/e/ef/Hindustanis_AoE2.png`,
    teamBonus: "Camels +2 attack vs buildings",
    bonuses: [
      { type: "economy", description: "Villagers cost -10-25%" },
      { type: "military", description: "Camel units +1/+1 armor" }
    ],
    synergyTags: ['gunpowder', 'camels'],
    strengths: ['Strong camels', 'Cheap villagers'],
    weaknesses: ['No knights'],
    bestPositions: ['pocket'],
    synergyWith: ['gurjaras', 'saracens'],
    ratings: { economy: 9, rush: 7, lateGame: 9, defense: 6, mobility: 8 },
  },
  {
    id: "huns",
    name: "Huns",
    expansion: "conquerors",
    specialty: "Cavalry",
    icon: `${WIKI_BASE}/c/cc/Huns_AoE2.png`,
    teamBonus: "Stables work 20% faster",
    bonuses: [
      { type: "economy", description: "No houses needed" },
      { type: "military", description: "Cavalry Archers cost -10/20%" }
    ],
    synergyTags: ['cavalry', 'mobility'],
    strengths: ['No houses', 'Fast production'],
    weaknesses: ['No late game eco bonus'],
    bestPositions: ['pocket'],
    synergyWith: ['mongols', 'magyars'],
    ratings: { economy: 7, rush: 9, lateGame: 8, defense: 4, mobility: 10 },
  },
  {
    id: "incas",
    name: "Incas",
    expansion: "forgotten",
    specialty: "Infantry",
    icon: `${WIKI_BASE}/3/37/Incas_AoE2.png`,
    teamBonus: "Free Llama",
    bonuses: [
      { type: "economy", description: "Houses support 10 pop" },
      { type: "defense", description: "Buildings cost -15% stone" }
    ],
    synergyTags: ['infantry', 'defense'],
    strengths: ['Armored villagers', 'Strong Eagles'],
    weaknesses: ['No cavalry'],
    bestPositions: ['flank'],
    synergyWith: ['mayans', 'aztecs'],
    ratings: { economy: 8, rush: 8, lateGame: 8, defense: 8, mobility: 6 },
  },
  {
    id: "italians",
    name: "Italians",
    expansion: "forgotten",
    specialty: "Archers & Navy",
    icon: `${WIKI_BASE}/4/49/Italians_AoE2.png`,
    teamBonus: "Condottieri available",
    bonuses: [
      { type: "economy", description: "Age up cost -15%" },
      { type: "military", description: "Gunpowder units cost -20%" }
    ],
    synergyTags: ['archers', 'navy'],
    strengths: ['Fast age ups', 'Cheap gunpowder'],
    weaknesses: ['Average cavalry'],
    bestPositions: ['flank'],
    synergyWith: ['turks', 'bohemians'],
    ratings: { economy: 8, rush: 6, lateGame: 8, defense: 7, mobility: 6 },
  },
  {
    id: "japanese",
    name: "Japanese",
    expansion: "base",
    specialty: "Infantry",
    icon: `${WIKI_BASE}/d/d5/Japanese_AoE2.png`,
    teamBonus: "Galleys +4 Line of Sight",
    bonuses: [
      { type: "economy", description: "Eco buildings cost -50% wood" },
      { type: "military", description: "Infantry attack 33% faster" }
    ],
    synergyTags: ['infantry', 'navy'],
    strengths: ['Fast attacking infantry', 'Strong navy'],
    weaknesses: ['No eco bonus on land'],
    bestPositions: ['flank'],
    synergyWith: ['vikings', 'dravidians'],
    ratings: { economy: 7, rush: 8, lateGame: 8, defense: 8, mobility: 6 },
  },
  {
    id: "khmer",
    name: "Khmer",
    expansion: "rajas",
    specialty: "Elephants & Siege",
    icon: `${WIKI_BASE}/4/47/Khmer_AoE2.png`,
    teamBonus: "Scorpions +1 range",
    bonuses: [
      { type: "economy", description: "No buildings needed to age up" },
      { type: "economy", description: "Farmers work 10% faster" }
    ],
    synergyTags: ['elephants', 'siege'],
    strengths: ['Flexible build orders', 'Fast elephants'],
    weaknesses: ['No good trash units'],
    bestPositions: ['pocket'],
    synergyWith: ['celts', 'romans'],
    ratings: { economy: 9, rush: 6, lateGame: 9, defense: 6, mobility: 7 },
  },
  {
    id: "koreans",
    name: "Koreans",
    expansion: "conquerors",
    specialty: "Towers & Navy",
    icon: `${WIKI_BASE}/3/3e/Koreans_AoE2.png`,
    teamBonus: "Villagers +3 Line of Sight",
    bonuses: [
      { type: "defense", description: "Tower upgrades free" },
      { type: "military", description: "Military units cost -20% wood" }
    ],
    synergyTags: ['towers', 'defense'],
    strengths: ['Free tower upgrades', 'Strong war wagons'],
    weaknesses: ['Weak cavalry'],
    bestPositions: ['flank'],
    synergyWith: ['britons', 'ethiopians'],
    ratings: { economy: 7, rush: 5, lateGame: 8, defense: 10, mobility: 5 },
  },
  {
    id: "lithuanians",
    name: "Lithuanians",
    expansion: "dlc",
    specialty: "Cavalry & Monks",
    icon: `${WIKI_BASE}/9/94/Lithuanians_AoE2.png`,
    teamBonus: "Monasteries work 20% faster",
    bonuses: [
      { type: "economy", description: "Start with +150 food" },
      { type: "military", description: "Knights +1 attack per Relic" }
    ],
    synergyTags: ['cavalry', 'monks'],
    strengths: ['Relic-powered knights', 'Fast start'],
    weaknesses: ['Dependent on relics'],
    bestPositions: ['pocket'],
    synergyWith: ['aztecs', 'burgundians'],
    ratings: { economy: 8, rush: 9, lateGame: 8, defense: 6, mobility: 8 },
  },
  {
    id: "magyars",
    name: "Magyars",
    expansion: "forgotten",
    specialty: "Cavalry",
    icon: `${WIKI_BASE}/e/e6/Magyars_AoE2.png`,
    teamBonus: "CA trained 25% faster",
    bonuses: [
      { type: "military", description: "Forging line free" },
      { type: "military", description: "Scout line cost -15%" }
    ],
    synergyTags: ['cavalry', 'mobility'],
    strengths: ['Free blacksmith', 'Cheap scouts'],
    weaknesses: ['No eco bonus'],
    bestPositions: ['pocket'],
    synergyWith: ['huns', 'mongols'],
    ratings: { economy: 5, rush: 9, lateGame: 9, defense: 5, mobility: 10 },
  },
  {
    id: "malay",
    name: "Malay",
    expansion: "rajas",
    specialty: "Navy & Elephants",
    icon: `${WIKI_BASE}/e/ec/Malay_AoE2.png`,
    teamBonus: "Docks +6 Line of Sight",
    bonuses: [
      { type: "economy", description: "Advance Age 66% faster" },
      { type: "military", description: "Battle Elephants cost -30%" }
    ],
    synergyTags: ['navy', 'enjambre'],
    strengths: ['Fastest age up', 'Cheap elephants'],
    weaknesses: ['Weak elephants (no last armor)'],
    bestPositions: ['flank'],
    synergyWith: ['japanese', 'dravidians'],
    ratings: { economy: 8, rush: 7, lateGame: 8, defense: 6, mobility: 6 },
  },
  {
    id: "malians",
    name: "Malians",
    expansion: "african",
    specialty: "Infantry",
    icon: `${WIKI_BASE}/e/e9/Malians_AoE2.png`,
    teamBonus: "Universities work 80% faster",
    bonuses: [
      { type: "economy", description: "Gold Mining upgrades free" },
      { type: "military", description: "Infantry +1 pierce armor per Age" }
    ],
    synergyTags: ['infantry', 'gold'],
    strengths: ['Tanky infantry vs archers', 'Free gold upgrades'],
    weaknesses: ['Weak late game cavalry'],
    bestPositions: ['flank', 'pocket'],
    synergyWith: ['goths', 'celts'],
    ratings: { economy: 8, rush: 8, lateGame: 7, defense: 7, mobility: 7 },
  },
  {
    id: "mayans",
    name: "Mayans",
    expansion: "conquerors",
    specialty: "Archers",
    icon: `${WIKI_BASE}/2/2b/Mayans_AoE2.png`,
    teamBonus: "Walls/Gates -50% cost",
    bonuses: [
      { type: "economy", description: "Resources last 15% longer" },
      { type: "military", description: "Archers cost -10-30%" }
    ],
    synergyTags: ['archers', 'economy'],
    strengths: ['Cheap archers', 'Long lasting resources'],
    weaknesses: ['No cavalry'],
    bestPositions: ['flank'],
    synergyWith: ['britons', 'ethiopians'],
    ratings: { economy: 9, rush: 8, lateGame: 8, defense: 8, mobility: 7 },
  },
  {
    id: "mongols",
    name: "Mongols",
    expansion: "base",
    specialty: "Cavalry Archers",
    icon: `${WIKI_BASE}/8/80/Mongols_AoE2.png`,
    teamBonus: "Scout line +2 Line of Sight",
    bonuses: [
      { type: "economy", description: "Hunters work 40% faster" },
      { type: "military", description: "Mangudai fire 25% faster" }
    ],
    synergyTags: ['cavalry-archers', 'mobility'],
    strengths: ['Best CA', 'Strong scouts'],
    weaknesses: ['No ring archer armor'],
    bestPositions: ['pocket', 'flank'],
    synergyWith: ['huns', 'magyars'],
    ratings: { economy: 7, rush: 10, lateGame: 10, defense: 5, mobility: 10 },
  },
  {
    id: "persians",
    name: "Persians",
    expansion: "base",
    specialty: "Cavalry",
    icon: `${WIKI_BASE}/7/72/Persians_AoE2.png`,
    teamBonus: "Knights +2 attack vs archers",
    bonuses: [
      { type: "economy", description: "TCs and Docks double HP" },
      { type: "economy", description: "TCs work 10-20% faster" }
    ],
    synergyTags: ['cavalry', 'knights'],
    strengths: ['Fast TCs', 'Strong War Elephants'],
    weaknesses: ['Weak infantry'],
    bestPositions: ['pocket'],
    synergyWith: ['franks', 'poles'],
    ratings: { economy: 9, rush: 7, lateGame: 9, defense: 7, mobility: 8 },
  },
  {
    id: "poles",
    name: "Poles",
    expansion: "dlc",
    specialty: "Cavalry",
    icon: `${WIKI_BASE}/6/61/Poles_AoE2.png`,
    teamBonus: "Stone miners generate gold",
    bonuses: [
      { type: "economy", description: "Folwark generates food" },
      { type: "economy", description: "Villagers regenerate HP" }
    ],
    synergyTags: ['cavalry', 'economy'],
    strengths: ['Strong eco', 'Cheap Knights'],
    weaknesses: ['No camels'],
    bestPositions: ['pocket'],
    synergyWith: ['persians', 'franks'],
    ratings: { economy: 10, rush: 7, lateGame: 8, defense: 6, mobility: 8 },
  },
  {
    id: "portuguese",
    name: "Portuguese",
    expansion: "african",
    specialty: "Navy & Gunpowder",
    icon: `${WIKI_BASE}/f/f1/Portuguese_AoE2.png`,
    teamBonus: "Techs research 25% faster",
    bonuses: [
      { type: "economy", description: "Units cost -20% gold" },
      { type: "economy", description: "Feitoria available" }
    ],
    synergyTags: ['navy', 'gunpowder'],
    strengths: ['Cheap gold units', 'Strong navy'],
    weaknesses: ['Weak early game'],
    bestPositions: ['pocket', 'flank'],
    synergyWith: ['turks', 'italians'],
    ratings: { economy: 8, rush: 6, lateGame: 10, defense: 8, mobility: 6 },
  },
  {
    id: "romans",
    name: "Romans",
    expansion: "dlc",
    specialty: "Infantry",
    icon: `${WIKI_BASE}/f/ff/Romans_AoE2.png`,
    teamBonus: "Scorpion min range 1",
    bonuses: [
      { type: "military", description: "Infantry +5 attack vs buildings" },
      { type: "military", description: "Centurion available" }
    ],
    synergyTags: ['infantry', 'scorpions'],
    strengths: ['Building destroyers', 'Strong Centurion'],
    weaknesses: ['Average economy'],
    bestPositions: ['flank'],
    synergyWith: ['khmer', 'celts'],
    ratings: { economy: 7, rush: 8, lateGame: 8, defense: 8, mobility: 6 },
  },
  {
    id: "saracens",
    name: "Saracens",
    expansion: "base",
    specialty: "Camels & Navy",
    icon: `${WIKI_BASE}/3/3e/Saracens_AoE2.png`,
    teamBonus: "Foot archers +3 vs buildings",
    bonuses: [
      { type: "economy", description: "Market fee only 5%" },
      { type: "military", description: "Camel units +10 HP" }
    ],
    synergyTags: ['camels', 'archers'],
    strengths: ['Strong camels', 'Good market'],
    weaknesses: ['Expensive units'],
    bestPositions: ['flank'],
    synergyWith: ['britons', 'ethiopians'],
    ratings: { economy: 7, rush: 7, lateGame: 9, defense: 6, mobility: 7 },
  },
  {
    id: "sicilians",
    name: "Sicilians",
    expansion: "dlc",
    specialty: "Cavalry",
    icon: `${WIKI_BASE}/7/78/Sicilians_AoE2.png`,
    teamBonus: "Transport Ships -50% cost",
    bonuses: [
      { type: "military", description: "Units take -50% bonus damage" },
      { type: "economy", description: "Castles built 100% faster" }
    ],
    synergyTags: ['cavalry', 'defense'],
    strengths: ['Bonus damage resistance', 'Fast castles'],
    weaknesses: ['Weak archers'],
    bestPositions: ['pocket'],
    synergyWith: ['franks', 'teutons'],
    ratings: { economy: 8, rush: 7, lateGame: 8, defense: 8, mobility: 7 },
  },
  {
    id: "slavs",
    name: "Slavs",
    expansion: "forgotten",
    specialty: "Infantry & Siege",
    icon: `${WIKI_BASE}/4/41/Slavs_AoE2.png`,
    teamBonus: "Military buildings +5 pop",
    bonuses: [
      { type: "economy", description: "Farmers work 10% faster" },
      { type: "military", description: "Supplies free" }
    ],
    synergyTags: ['infantry', 'siege'],
    strengths: ['Fast farmers', 'Cheap siege'],
    weaknesses: ['Weak archers'],
    bestPositions: ['pocket'],
    synergyWith: ['celts', 'mongols'],
    ratings: { economy: 8, rush: 7, lateGame: 8, defense: 7, mobility: 6 },
  },
  {
    id: "spanish",
    name: "Spanish",
    expansion: "conquerors",
    specialty: "Gunpowder & Monks",
    icon: `${WIKI_BASE}/8/82/Spanish_AoE2.png`,
    teamBonus: "Trade units +33% gold",
    bonuses: [
      { type: "economy", description: "Builders work 30% faster" },
      { type: "military", description: "Blacksmith upgrades no gold" }
    ],
    synergyTags: ['gunpowder', 'trade'],
    strengths: ['Best trade', 'Fast builders'],
    weaknesses: ['Weak early archers'],
    bestPositions: ['pocket'],
    synergyWith: ['bengalis', 'portuguese'],
    ratings: { economy: 7, rush: 7, lateGame: 9, defense: 8, mobility: 8 },
  },
  {
    id: "tatars",
    name: "Tatars",
    expansion: "dlc",
    specialty: "Cavalry Archers",
    icon: `${WIKI_BASE}/8/88/Tatars_AoE2.png`,
    teamBonus: "CA +2 Line of Sight",
    bonuses: [
      { type: "military", description: "Mounted archers bonus from elevation" },
      { type: "economy", description: "Herdables +50% food" }
    ],
    synergyTags: ['cavalry-archers', 'mobility'],
    strengths: ['Free CA techs', 'Hill bonus'],
    weaknesses: ['Weak infantry'],
    bestPositions: ['pocket', 'flank'],
    synergyWith: ['mongols', 'huns'],
    ratings: { economy: 7, rush: 7, lateGame: 9, defense: 6, mobility: 9 },
  },
  {
    id: "teutons",
    name: "Teutons",
    expansion: "base",
    specialty: "Infantry",
    icon: `${WIKI_BASE}/c/c9/Teutons_AoE2.png`,
    teamBonus: "Resist conversion",
    bonuses: [
      { type: "economy", description: "Farms cost -40%" },
      { type: "military", description: "Barracks/Stable +1 melee armor" }
    ],
    synergyTags: ['infantry', 'defense'],
    strengths: ['Tanky units', 'Cheap farms'],
    weaknesses: ['Slow units'],
    bestPositions: ['pocket'],
    synergyWith: ['franks', 'celts'],
    ratings: { economy: 8, rush: 6, lateGame: 9, defense: 9, mobility: 5 },
  },
  {
    id: "turks",
    name: "Turks",
    expansion: "base",
    specialty: "Gunpowder",
    icon: `${WIKI_BASE}/7/78/Turks_AoE2.png`,
    teamBonus: "Gunpowder units train 25% faster",
    bonuses: [
      { type: "economy", description: "Gold miners work 20% faster" },
      { type: "military", description: "Chemistry free" }
    ],
    synergyTags: ['gunpowder', 'gold'],
    strengths: ['Best gunpowder', 'Strong Janissaries'],
    weaknesses: ['Weak trash wars'],
    bestPositions: ['pocket'],
    synergyWith: ['berbers', 'vietnamese'],
    ratings: { economy: 7, rush: 7, lateGame: 10, defense: 7, mobility: 7 },
  },
  {
    id: "vietnamese",
    name: "Vietnamese",
    expansion: "rajas",
    specialty: "Archers",
    icon: `${WIKI_BASE}/2/27/Vietnamese_AoE2.png`,
    teamBonus: "Imperial Skirmisher available",
    bonuses: [
      { type: "utility", description: "Reveal enemy TC" },
      { type: "economy", description: "Eco upgrades no wood" }
    ],
    synergyTags: ['archers', 'vision'],
    strengths: ['Tanky archers', 'Enemy TC revealed'],
    weaknesses: ['Weak cavalry'],
    bestPositions: ['flank'],
    synergyWith: ['turks', 'britons'],
    ratings: { economy: 8, rush: 7, lateGame: 8, defense: 8, mobility: 6 },
  },
  {
    id: "vikings",
    name: "Vikings",
    expansion: "base",
    specialty: "Infantry & Navy",
    icon: `${WIKI_BASE}/a/a2/Vikings_AoE2.png`,
    teamBonus: "Docks 15% cheaper",
    bonuses: [
      { type: "economy", description: "Free Wheelbarrow/Hand Cart" },
      { type: "military", description: "Infantry +20% HP" }
    ],
    synergyTags: ['infantry', 'economy'],
    strengths: ['Best infantry HP', 'Free eco upgrades'],
    weaknesses: ['No cavalry'],
    bestPositions: ['flank'],
    synergyWith: ['japanese', 'dravidians'],
    ratings: { economy: 9, rush: 7, lateGame: 7, defense: 6, mobility: 6 },
  },
  {
    id: "shu",
    name: "Shu",
    expansion: "dynasties",
    specialty: "Archers & Siege",
    icon: "/images/civs/shu_shield.png",
    teamBonus: "Foot archers +2 LOS",
    bonuses: [
      { type: "economy", description: "Lumberjacks generate food" },
      { type: "utility", description: "Archer techs -25% cost" }
    ],
    synergyTags: ['archers', 'siege'],
    strengths: ['Mobile siege', 'Strong archer DPS'],
    weaknesses: ['Vulnerable to fast cavalry'],
    bestPositions: ['flank'],
    synergyWith: ['saracens', 'britons'],
    ratings: { economy: 8, rush: 7, lateGame: 9, defense: 6, mobility: 5 },
  },
  {
    id: "wei",
    name: "Wei",
    expansion: "dynasties",
    specialty: "Cavalry",
    icon: "/images/civs/wei_shield.png",
    teamBonus: "Cavalry +2 vs siege",
    bonuses: [
      { type: "economy", description: "Free villager per eco tech" },
      { type: "military", description: "Cavalry +15/30% HP" }
    ],
    synergyTags: ['cavalry', 'economy'],
    strengths: ['Tanky cavalry', 'Instant eco spikes'],
    weaknesses: ['Weak archers'],
    bestPositions: ['pocket'],
    synergyWith: ['franks', 'huns'],
    ratings: { economy: 7, rush: 8, lateGame: 8, defense: 6, mobility: 9 },
  },
  {
    id: "wu",
    name: "Wu",
    expansion: "dynasties",
    specialty: "Infantry & Naval",
    icon: "/images/civs/wu_shield.png",
    teamBonus: "Houses built 100% faster",
    bonuses: [
      { type: "economy", description: "Buildings provide +65 food" },
      { type: "military", description: "Infantry regenerates HP" }
    ],
    synergyTags: ['infantry', 'navy'],
    strengths: ['Strong water control', 'Fast boom'],
    weaknesses: ['No bloodlines'],
    bestPositions: ['flank', 'pocket'],
    synergyWith: ['japanese', 'vikings'],
    ratings: { economy: 7, rush: 7, lateGame: 8, defense: 7, mobility: 6 },
  },
  {
    id: "jurchens",
    name: "Jurchens",
    expansion: "dynasties",
    specialty: "Cavalry & Gunpowder",
    icon: "/images/civs/jurchens_shield.png",
    teamBonus: "Gunpowder +2 LOS",
    bonuses: [
      { type: "economy", description: "Meat does not decay" },
      { type: "military", description: "Mounted units attack 20% faster" }
    ],
    synergyTags: ['cavalry', 'gunpowder'],
    strengths: ['Fast attacking cavalry', 'Elite gunpowder'],
    weaknesses: ['Expensive unique unit'],
    bestPositions: ['pocket', 'flank'],
    synergyWith: ['turks', 'hindustanis'],
    ratings: { economy: 8, rush: 8, lateGame: 9, defense: 6, mobility: 8 },
  },
  {
    id: "khitans",
    name: "Khitans",
    expansion: "dynasties",
    specialty: "Infantry & Cavalry",
    icon: "/images/civs/khitans_shield.png",
    teamBonus: "Infantry +2 vs ranged",
    bonuses: [
      { type: "economy", description: "Pastures replace farms" },
      { type: "military", description: "Attack upgrades doubled" }
    ],
    synergyTags: ['infantry', 'cavalry'],
    strengths: ['Superior melee attack', 'Fast CA transition'],
    weaknesses: ['Susceptible to late archers'],
    bestPositions: ['pocket', 'flank'],
    synergyWith: ['mongols', 'huns'],
    ratings: { economy: 7, rush: 8, lateGame: 8, defense: 7, mobility: 8 },
  },
];

export function getCivilizationById(id: string): Civilization | undefined {
  return CIVILIZATIONS.find((c) => c.id === id)
}

export interface TeamSynergyResult {
  score: number
  strengths: string[]
  weaknesses: string[]
  teamBonuses: string[]
  compatibilityBreakdown: { category: string; score: number; description: string }[]
  positionRecommendations: { civId: string; civName: string; bestPosition: "flank" | "pocket" ; reason: string }[]
  topSynergies: { civs: string[]; bonus: string; score: number }[]
}

export type TeamGameMode = "2v2" | "3v3" | "4v4"

export function calculateTeamSynergy(civIds: string[], gameMode: TeamGameMode = "2v2"): TeamSynergyResult {
  const civs = civIds.map(getCivilizationById).filter(Boolean) as Civilization[]
  if (civs.length === 0) return { score: 0, strengths: [], weaknesses: [], teamBonuses: [], compatibilityBreakdown: [], positionRecommendations: [], topSynergies: [] }
  const teamBonuses = civs.map((c) => `${c.name}: ${c.teamBonus}`)
  return { score: 50, strengths: ["Data updated"], weaknesses: [], teamBonuses, compatibilityBreakdown: [], positionRecommendations: [], topSynergies: [] }
}

export function getBestCivSynergies() { return [] }
export function getCounterComposition(civIds: string[]) { return { counterCivs: [], counterStrategies: [], vulnerabilities: [] } }
export function getImprovementSuggestions(civIds: string[], gameMode: TeamGameMode) { return { suggestions: [], missingElements: [], tips: [] } }
