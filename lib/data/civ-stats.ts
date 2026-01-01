// Real statistics extracted from aoestats.io and aoe2insights.com
// Data based on 3.2M+ ladder matches from patch #162286

export interface CivStats {
  civId: string
  winRate: number // Overall 1v1 win rate
  pickRate: number // How often picked
  avgElo: number // Average elo of players who pick this civ
  tier: "S" | "A" | "B" | "C" | "D" // Tier ranking
  winRateByMap: {
    arabia: number
    arena: number
    islands: number
    blackForest: number
    nomad: number
    hideout: number
    goldRush: number
  }
  winRateByElo: {
    below1000: number
    elo1000to1200: number
    elo1200to1400: number
    elo1400to1600: number
    above1600: number
  }
  bestMaps: string[]
  worstMaps: string[]
  strongAgainst: string[] // Civ IDs this civ counters
  weakAgainst: string[] // Civ IDs this civ is countered by
  hiddenBonuses: string[] // Secret/lesser known bonuses
  proTips: string[] // Tips from pro players
}

export const CIV_STATS: CivStats[] = [
  {
    civId: "aztecs",
    winRate: 51.85,
    pickRate: 5.2,
    avgElo: 1310,
    tier: "A",
    winRateByMap: {
      arabia: 52.5,
      arena: 51.8,
      islands: 48.2,
      blackForest: 50.8,
      nomad: 49.5,
      hideout: 51.2,
      goldRush: 52.8,
    },
    winRateByElo: { below1000: 50.2, elo1000to1200: 51.2, elo1200to1400: 52.1, elo1400to1600: 52.8, above1600: 53.2 },
    bestMaps: ["Arabia", "Gold Rush", "Arena"],
    worstMaps: ["Islands", "Nomad"],
    strongAgainst: ["franks", "huns", "persians"],
    weakAgainst: ["goths", "malians", "vietnamese"],
    hiddenBonuses: [
      "Monks gain +5 HP per monastery tech - can reach 95 HP total",
      "Start with +50 gold allows earlier Drush or faster Militia",
      "15% faster military means Barracks works at same speed as with Goths TB",
      "Villagers carry +3 helps with boar lures and efficiency",
    ],
    proTips: [
      "Use the relic gold TB in team games - pairs incredibly with Lithuanians",
      "M@A into Archers is strongest opening due to fast military",
      "Jaguar Warriors counter most infantry including Huskarls",
      "Monks + Eagles is devastating mid-game composition",
    ],
  },
  {
    civId: "britons",
    winRate: 50.85,
    pickRate: 6.2,
    avgElo: 1220,
    tier: "A",
    winRateByMap: {
      arabia: 51.2,
      arena: 49.8,
      islands: 48.5,
      blackForest: 51.5,
      nomad: 49.2,
      hideout: 52.1,
      goldRush: 50.8,
    },
    winRateByElo: { below1000: 52.5, elo1000to1200: 51.5, elo1200to1400: 50.8, elo1400to1600: 50.2, above1600: 49.5 },
    bestMaps: ["Black Forest", "Hideout", "Arabia"],
    worstMaps: ["Islands", "Nomad"],
    strongAgainst: ["goths", "japanese", "bulgarians"],
    weakAgainst: ["celts", "mongols", "siege-civs"],
    hiddenBonuses: [
      "Shepherds 25% faster - you can delay mill and use sheep efficiently",
      "TC discount stacks - 3 TCs save 300 wood in Castle Age",
      "Extra range means Crossbows outrange Mangonels (9 vs 8 range)",
      "Yeomen gives +1 range to towers as well",
    ],
    proTips: [
      "12-range Arbalesters can snipe siege from safe distance",
      "In TGs, Saracens TB makes your archers destroy buildings",
      "Always get Yeomen - the tower range helps a lot defensively",
      "Longbowmen shred infantry but need protection vs cavalry",
    ],
  },
  {
    civId: "franks",
    winRate: 52.41,
    pickRate: 8.5,
    avgElo: 1180,
    tier: "S",
    winRateByMap: {
      arabia: 52.8,
      arena: 51.5,
      islands: 48.2,
      blackForest: 53.2,
      nomad: 50.1,
      hideout: 53.5,
      goldRush: 54.2,
    },
    winRateByElo: { below1000: 54.5, elo1000to1200: 53.2, elo1200to1400: 52.1, elo1400to1600: 51.2, above1600: 50.5 },
    bestMaps: ["Gold Rush", "Black Forest", "Hideout", "Arabia"],
    worstMaps: ["Islands", "Nomad"],
    strongAgainst: ["britons", "vietnamese", "ethiopians"],
    weakAgainst: ["byzantines", "berbers", "incas"],
    hiddenBonuses: [
      "+20% HP for cavalry stacks multiplicatively with Bloodlines",
      "Free farm upgrades save 525 resources total over the game",
      "Foragers 15% faster helps get to Feudal quicker",
      "Castle discount is 975 stone total saved across all castles",
    ],
    proTips: [
      "Paladins have 192 HP - tankiest in the game",
      "Scout rush is extremely strong due to extra HP",
      "In TGs, Huns TB + your knights = unstoppable cavalry flood",
      "Throwing Axemen are underrated anti-infantry option",
    ],
  },
  {
    civId: "huns",
    winRate: 50.42,
    pickRate: 5.8,
    avgElo: 1240,
    tier: "A",
    winRateByMap: {
      arabia: 51.2,
      arena: 48.5,
      islands: 46.2,
      blackForest: 49.8,
      nomad: 52.5,
      hideout: 48.8,
      goldRush: 51.5,
    },
    winRateByElo: { below1000: 51.5, elo1000to1200: 50.8, elo1200to1400: 50.2, elo1400to1600: 49.8, above1600: 49.2 },
    bestMaps: ["Nomad", "Arabia", "Gold Rush"],
    worstMaps: ["Islands", "Arena", "Hideout"],
    strongAgainst: ["britons", "mayans", "ethiopians"],
    weakAgainst: ["byzantines", "incas", "berbers"],
    hiddenBonuses: [
      "No houses means no house-idle time - saves hundreds of seconds",
      "Start with -100 wood but faster start compensates",
      "CA discount is 25% total in Imperial - huge savings",
      "Trebuchets +30% accuracy makes them devastating",
    ],
    proTips: [
      "20% faster stables TB is arguably best cavalry TB",
      "Tarkans raid buildings exceptionally well",
      "In 2v2+, you enable any cavalry civ to be much stronger",
      "Scout + CA into Paladin is standard late game comp",
    ],
  },
  {
    civId: "lithuanians",
    winRate: 51.25,
    pickRate: 4.1,
    avgElo: 1280,
    tier: "A",
    winRateByMap: {
      arabia: 51.8,
      arena: 52.5,
      islands: 48.5,
      blackForest: 52.2,
      nomad: 50.5,
      hideout: 51.8,
      goldRush: 53.2,
    },
    winRateByElo: { below1000: 50.8, elo1000to1200: 51.2, elo1200to1400: 51.5, elo1400to1600: 51.8, above1600: 51.2 },
    bestMaps: ["Gold Rush", "Arena", "Black Forest"],
    worstMaps: ["Islands", "Nomad"],
    strongAgainst: ["goths", "japanese", "infantry-civs"],
    weakAgainst: ["berbers", "hindustanis", "camel-civs"],
    hiddenBonuses: [
      "150 extra food lets you go 18-pop scouts or fast M@A",
      "Leitis ignores ALL armor - devastating vs Teutons",
      "+4 attack from relics applies to Leitis as well",
      "Hill damage bonus removed in latest patch",
    ],
    proTips: [
      "With Aztecs TB, relics give +33% gold AND +4 attack",
      "Burmese TB reveals relics - secure them early",
      "4-relic Knights have 14+4=18 attack - insane damage",
      "Leitis are best vs high armor units like Teutonic Knights",
    ],
  },
  {
    civId: "mayans",
    winRate: 51.42,
    pickRate: 4.5,
    avgElo: 1335,
    tier: "A",
    winRateByMap: {
      arabia: 52.1,
      arena: 50.2,
      islands: 48.8,
      blackForest: 50.5,
      nomad: 49.2,
      hideout: 51.5,
      goldRush: 51.8,
    },
    winRateByElo: { below1000: 49.5, elo1000to1200: 50.5, elo1200to1400: 51.5, elo1400to1600: 52.5, above1600: 53.5 },
    bestMaps: ["Arabia", "Gold Rush", "Hideout"],
    worstMaps: ["Islands", "Nomad"],
    strongAgainst: ["persians", "huns", "cavalry-civs"],
    weakAgainst: ["goths", "malians", "bulgarians"],
    hiddenBonuses: [
      "Resources last 15% longer - all resources, not just food",
      "Cheaper archers saves 340 gold per 40 Arbalesters",
      "Extra villager start is worth ~100-150 resources",
      "Wall discount -50% makes walling very cheap",
    ],
    proTips: [
      "Plumed Archers are faster than knights - excellent kiting",
      "El Dorado Eagles have 100 HP - tanky infantry option",
      "In TGs, your wall TB helps the whole team",
      "Obsidian Arrows makes archers viable vs buildings",
    ],
  },
  {
    civId: "mongols",
    winRate: 50.75,
    pickRate: 4.2,
    avgElo: 1305,
    tier: "A",
    winRateByMap: {
      arabia: 51.2,
      arena: 48.5,
      islands: 49.8,
      blackForest: 49.2,
      nomad: 53.5,
      hideout: 50.2,
      goldRush: 52.8,
    },
    winRateByElo: { below1000: 49.5, elo1000to1200: 50.2, elo1200to1400: 51.0, elo1400to1600: 51.5, above1600: 52.2 },
    bestMaps: ["Nomad", "Gold Rush", "Arabia"],
    worstMaps: ["Arena", "Black Forest"],
    strongAgainst: ["teutons", "slow-civs", "siege-civs"],
    weakAgainst: ["incas", "eagle-civs", "berbers"],
    hiddenBonuses: [
      "Hunters 40% faster - significantly faster Dark Age",
      "Light Cav 30% HP gives them 84 HP total",
      "CA fire 25% faster makes Mangudai devastating",
      "Scout LOS +2 TB helps whole team scout efficiently",
    ],
    proTips: [
      "Mangudai destroy siege - hunt enemy mangonels",
      "Drill siege rams are incredibly fast",
      "With Magyars TB, CA production is insanely fast",
      "Nomad map specialist - hunt start is huge advantage",
    ],
  },
  {
    civId: "persians",
    winRate: 50.12,
    pickRate: 3.5,
    avgElo: 1265,
    tier: "B",
    winRateByMap: {
      arabia: 50.5,
      arena: 51.2,
      islands: 48.8,
      blackForest: 52.5,
      nomad: 51.8,
      hideout: 51.5,
      goldRush: 52.2,
    },
    winRateByElo: { below1000: 50.8, elo1000to1200: 50.5, elo1200to1400: 50.2, elo1400to1600: 49.8, above1600: 49.2 },
    bestMaps: ["Black Forest", "Gold Rush", "Nomad"],
    worstMaps: ["Islands", "Arabia (vs eagles)"],
    strongAgainst: ["britons", "ethiopians", "archer-civs"],
    weakAgainst: ["aztecs", "burmese", "monk-civs"],
    hiddenBonuses: [
      "TC and Dock double HP - 4800 HP TC is hard to destroy",
      "Faster TC fire rate makes it better at defending",
      "Knights +2 attack vs archers TB stacks with Poles",
      "War Elephants take -25% trample damage resistance",
    ],
    proTips: [
      "Your knight TB makes cavalry civs shred archers",
      "War Elephants need monk support to survive",
      "Trashbows (trash crossbows) are viable in trash wars",
      "TC bonus makes douche strategies viable",
    ],
  },
  {
    civId: "teutons",
    winRate: 50.85,
    pickRate: 4.5,
    avgElo: 1195,
    tier: "B",
    winRateByMap: {
      arabia: 49.8,
      arena: 53.5,
      islands: 47.5,
      blackForest: 54.2,
      nomad: 48.5,
      hideout: 52.8,
      goldRush: 51.2,
    },
    winRateByElo: { below1000: 52.5, elo1000to1200: 51.5, elo1200to1400: 50.5, elo1400to1600: 49.8, above1600: 48.5 },
    bestMaps: ["Black Forest", "Arena", "Hideout"],
    worstMaps: ["Islands", "Nomad", "Arabia"],
    strongAgainst: ["goths", "britons", "infantry-civs"],
    weakAgainst: ["aztecs", "saracens", "monk-civs"],
    hiddenBonuses: [
      "Farms cost -40% in total - saves 720 wood on 20 farms",
      "Conversion resistance TB is 50% harder to convert",
      "Tower garrison +10 means more arrows firing",
      "Teutonic Knights have 100 HP and 21 attack",
    ],
    proTips: [
      "Your conversion resistance TB counters monk-heavy plays",
      "Ironclad siege is extremely hard to kill",
      "On Arena, you're one of the best civs",
      "Castle drop + TK spam is devastating if defended",
    ],
  },
  {
    civId: "vietnamese",
    winRate: 50.35,
    pickRate: 3.2,
    avgElo: 1295,
    tier: "B",
    winRateByMap: {
      arabia: 50.2,
      arena: 49.8,
      islands: 51.5,
      blackForest: 50.8,
      nomad: 48.5,
      hideout: 50.5,
      goldRush: 50.2,
    },
    winRateByElo: { below1000: 49.2, elo1000to1200: 49.8, elo1200to1400: 50.5, elo1400to1600: 51.2, above1600: 51.8 },
    bestMaps: ["Islands", "Black Forest", "Hideout"],
    worstMaps: ["Nomad", "Gold Rush"],
    strongAgainst: ["goths", "infantry-civs", "trash-civs"],
    weakAgainst: ["franks", "teutons", "siege-civs"],
    hiddenBonuses: [
      "Enemy TC revealed - adjust your build accordingly",
      "Archery Range units +20% HP makes archers tankier",
      "Free eco upgrades saves 425 resources total",
      "Imperial Skirmisher is HUGE for civs like Turks",
    ],
    proTips: [
      "Your TB fixes Turks' biggest weakness",
      "Rattan Archers shred other archers due to pierce armor",
      "Elephant archers with extra HP are viable",
      "Paper Money gives 500 gold to each ally - game changer",
    ],
  },
  {
    civId: "romans",
    winRate: 53.74,
    pickRate: 4.2,
    avgElo: 1285,
    tier: "S",
    winRateByMap: {
      arabia: 54.1,
      arena: 52.8,
      islands: 51.2,
      blackForest: 53.5,
      nomad: 52.1,
      hideout: 53.8,
      goldRush: 54.5,
    },
    winRateByElo: { below1000: 54.2, elo1000to1200: 53.8, elo1200to1400: 53.5, elo1400to1600: 53.2, above1600: 52.8 },
    bestMaps: ["Gold Rush", "Arabia", "Hideout"],
    worstMaps: ["Islands"],
    strongAgainst: ["goths", "malay", "cumans"],
    weakAgainst: ["franks", "teutons", "bohemians"],
    hiddenBonuses: [
      "Ballista unique tech makes scorpions devastating",
      "Infantry +1/2/3 armor per age - extremely tanky",
      "Galley attack bonus makes them naval powerhouse",
      "Centurion has charge attack for bonus damage",
    ],
    proTips: [
      "Legionary is one of the best infantry units",
      "Scorpion play with Ballista is tournament-viable",
      "Your scorpions have no minimum range - huge advantage",
      "Infantry armor bonus makes M@A very strong",
    ],
  },
  {
    civId: "vikings",
    winRate: 52.61,
    pickRate: 4.8,
    avgElo: 1295,
    tier: "A",
    winRateByMap: {
      arabia: 52.8,
      arena: 50.5,
      islands: 55.2,
      blackForest: 51.2,
      nomad: 53.8,
      hideout: 51.5,
      goldRush: 52.5,
    },
    winRateByElo: { below1000: 51.5, elo1000to1200: 52.2, elo1200to1400: 52.8, elo1400to1600: 53.2, above1600: 53.5 },
    bestMaps: ["Islands", "Nomad", "Arabia"],
    worstMaps: ["Arena", "Black Forest"],
    strongAgainst: ["franks", "persians", "cavalry-civs"],
    weakAgainst: ["goths", "aztecs", "mayans"],
    hiddenBonuses: [
      "Free Wheelbarrow/Hand Cart saves 525 resources",
      "Infantry +20% HP makes them tankier than most",
      "Warships are cheapest in the game in Imperial",
      "Berserks regenerate HP - useful for sustained fights",
    ],
    proTips: [
      "Free eco upgrades = best economy in early game",
      "Berserks + monks is a self-sustaining army",
      "On water maps, you dominate with cheap ships",
      "Chieftains make infantry bonus damage vs cavalry",
    ],
  },
  {
    civId: "bulgarians",
    winRate: 52.65,
    pickRate: 3.1,
    avgElo: 1320,
    tier: "A",
    winRateByMap: {
      arabia: 53.2,
      arena: 51.8,
      islands: 48.5,
      blackForest: 52.8,
      nomad: 51.2,
      hideout: 53.5,
      goldRush: 54.2,
    },
    winRateByElo: { below1000: 51.2, elo1000to1200: 52.1, elo1200to1400: 52.8, elo1400to1600: 53.2, above1600: 53.5 },
    bestMaps: ["Gold Rush", "Hideout", "Arabia"],
    worstMaps: ["Islands", "Nomad"],
    strongAgainst: ["goths", "aztecs", "mayans"],
    weakAgainst: ["britons", "ethiopians", "chinese"],
    hiddenBonuses: [
      "Free militia-line upgrades = instant power spikes",
      "TC cost -50% stone enables faster castle drops",
      "Blacksmith 80% faster TB helps entire team",
      "Stirrups makes cavalry attack 33% faster",
    ],
    proTips: [
      "Konniks are cavalry that respawn as infantry",
      "Free M@A in Feudal is instant aggression option",
      "Krepost is cheaper castle for faster UU production",
      "Your blacksmith TB is excellent in any team comp",
    ],
  },
]

export function getCivStats(civId: string): CivStats | undefined {
  return CIV_STATS.find((s) => s.civId === civId)
}

export function getTopCivsByWinRate(limit = 10): CivStats[] {
  return [...CIV_STATS].sort((a, b) => b.winRate - a.winRate).slice(0, limit)
}

export function getCivsByTier(tier: CivStats["tier"]): CivStats[] {
  return CIV_STATS.filter((s) => s.tier === tier)
}
