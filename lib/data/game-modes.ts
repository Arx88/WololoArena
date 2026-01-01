export interface GameMode {
  id: string
  name: string
  description: string
  icon: string
}

export const GAME_MODES: GameMode[] = [
  {
    id: "random_map",
    name: "Random Map",
    description: "Standard game mode starting from Dark Age",
    icon: "/placeholder.svg?height=48&width=48",
  },
  {
    id: "empire_wars",
    name: "Empire Wars",
    description: "Start in Feudal Age with pre-built economy",
    icon: "/placeholder.svg?height=48&width=48",
  },
  {
    id: "death_match",
    name: "Death Match",
    description: "Maximum resources from the start",
    icon: "/placeholder.svg?height=48&width=48",
  },
  {
    id: "regicide",
    name: "Regicide",
    description: "Protect your King to survive",
    icon: "/placeholder.svg?height=48&width=48",
  },
  {
    id: "king_of_the_hill",
    name: "King of the Hill",
    description: "Control the monument to win",
    icon: "/placeholder.svg?height=48&width=48",
  },
  {
    id: "wonder_race",
    name: "Wonder Race",
    description: "First to build a Wonder wins",
    icon: "/placeholder.svg?height=48&width=48",
  },
]

export function getGameModeById(id: string): GameMode | undefined {
  return GAME_MODES.find((m) => m.id === id)
}
