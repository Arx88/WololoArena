export interface GameMap {
  id: string
  name: string
  category: "land" | "water" | "hybrid" | "special"
  type: "land" | "water" | "hybrid" | "special"
  description: string
  image: string
}

const WIKI_BASE = "https://static.wikia.nocookie.net/ageofempires/images"

function createMap(
  id: string,
  name: string,
  mapType: "land" | "water" | "hybrid" | "special",
  description: string,
  imagePath: string,
): GameMap {
  return {
    id,
    name,
    category: mapType,
    type: mapType, // Alias for compatibility
    description,
    image: `${WIKI_BASE}${imagePath}`,
  }
}

export const MAPS: GameMap[] = [
  createMap("arabia", "Arabia", "land", "Open land map with scattered resources", "/4/4a/Arabia_mini.png"),
  createMap("arena", "Arena", "land", "Walled starting positions", "/6/66/Arena_mini.png"),
  createMap("black_forest", "Black Forest", "land", "Dense forest with chokepoints", "/d/d0/Black_Forest_mini.png"),
  createMap("islands", "Islands", "water", "Separated islands requiring navy", "/7/71/Islands_mini.png"),
  createMap("nomad", "Nomad", "special", "No starting town center", "/a/a9/Nomad_mini.png"),
  createMap("team_islands", "Team Islands", "water", "Team-based island warfare", "/5/50/Team_Islands_mini.png"),
  createMap("gold_rush", "Gold Rush", "land", "Central gold deposit", "/8/8e/Gold_Rush_mini.png"),
  createMap("hideout", "Hideout", "land", "Forest hideouts with openings", "/5/54/Hideout_mini.png"),
  createMap("four_lakes", "Four Lakes", "hybrid", "Four lakes in corners", "/0/09/Four_Lakes_mini.png"),
  createMap("megarandom", "MegaRandom", "special", "Completely random generation", "/1/14/MegaRandom_mini.png"),
  createMap("runestones", "Runestones", "land", "Viking-themed with stone relics", "/2/2d/Runestones_mini.png"),
  createMap("socotra", "Socotra", "land", "Aggressive close-quarters map", "/8/8c/Socotra_mini.png"),
  createMap(
    "african_clearing",
    "African Clearing",
    "land",
    "Savanna with clearings",
    "/a/a0/African_Clearing_mini.png",
  ),
  createMap("baltic", "Baltic", "hybrid", "Central sea with land bridges", "/e/e2/Baltic_mini.png"),
  createMap("continental", "Continental", "hybrid", "Large landmass with coastal waters", "/9/97/Continental_mini.png"),
  createMap("coastal", "Coastal", "hybrid", "Land with coastal access", "/e/e4/Coastal_mini.png"),
  createMap("fortress", "Fortress", "land", "Pre-built stone walls and castles", "/4/4d/Fortress_mini.png"),
  createMap("ghost_lake", "Ghost Lake", "hybrid", "Frozen central lake", "/6/66/Ghost_Lake_mini.png"),
  createMap("golden_pit", "Golden Pit", "land", "Gold in central pit", "/5/5e/Golden_Pit_mini.png"),
  createMap(
    "mediterranean",
    "Mediterranean",
    "hybrid",
    "Central sea surrounded by land",
    "/b/b9/Mediterranean_mini.png",
  ),
  createMap(
    "migration",
    "Migration",
    "water",
    "Start on small island, migrate to mainland",
    "/8/8a/Migration_mini.png",
  ),
  createMap("oasis", "Oasis", "land", "Desert with central oasis", "/c/ce/Oasis_mini.png"),
  createMap("serengeti", "Serengeti", "land", "African savanna with wildlife", "/3/35/Serengeti_mini.png"),
  createMap("steppe", "Steppe", "land", "Open grassland map", "/b/b3/Steppe_mini.png"),
  createMap("valley", "Valley", "land", "Players in valley surrounded by cliffs", "/f/f2/Valley_mini.png"),
]

export function getMapById(id: string): GameMap | undefined {
  return MAPS.find((m) => m.id === id)
}
