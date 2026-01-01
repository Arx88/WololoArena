export interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: "economy" | "military" | "meta" | "civilizations"
}

export interface UniversityLevel {
  id: string
  title: string
  difficulty: "beginner" | "intermediate" | "advanced" | "expert" | "master"
  description: string
  icon: string
  requiredScore: number
  totalQuestions: number
}

export const UNIVERSITY_LEVELS: UniversityLevel[] = [
  {
    id: "dark-age",
    title: "Dark Age Fundamentals",
    difficulty: "beginner",
    description: "Master build orders, resource management, and early scouting.",
    icon: "Shield",
    requiredScore: 80,
    totalQuestions: 15
  },
  {
    id: "feudal-warfare",
    title: "Feudal Age Combat",
    difficulty: "intermediate",
    description: "Unit counters, walling techniques, and effective harassment.",
    icon: "Swords",
    requiredScore: 85,
    totalQuestions: 15
  },
  {
    id: "castle-dominance",
    title: "Castle Age Strategy",
    difficulty: "advanced",
    description: "Macro, multiple TCs, and the introduction of siege and monks.",
    icon: "Trophy",
    requiredScore: 90,
    totalQuestions: 15
  },
  {
    id: "imperial-conquest",
    title: "Imperial Meta",
    difficulty: "expert",
    description: "Late game transitions, post-imp compositions, and win conditions.",
    icon: "Crown",
    requiredScore: 95,
    totalQuestions: 15
  }
]

export const MOCK_QUESTIONS: Record<string, Question[]> = {
  "dark-age": [
    {
      id: "da1",
      text: "What is the standard number of villagers sent to wood in a generic 21-pop Fast Castle build?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 0,
      explanation: "For a generic FC (Fast Castle), you typically send only 2 villagers to wood early to maximize food intake for a faster age up.",
      category: "economy"
    },
    {
      id: "da2",
      text: "Which civilization starts with a free Eagle Scout instead of a Horse Scout?",
      options: ["Mayans, Aztecs, Incas", "Incas only", "Mayans and Aztecs only", "All American civilizations"],
      correctAnswer: 0,
      explanation: "The three American civilizations (Mayans, Aztecs, Incas) start with an Eagle Scout for better early protection and scouting.",
      category: "civilizations"
    },
    {
      id: "da3",
      text: "What is the maximum number of sheep typically found in a standard Arabia map start?",
      options: ["4", "6", "8", "10"],
      correctAnswer: 2,
      explanation: "Players start with 4 sheep near the TC and 4 more scattered in pairs nearby, for a total of 8.",
      category: "meta"
    },
    {
      id: "da4",
      text: "How much extra food do Lithuanians start with in Definitive Edition?",
      options: ["+100 Food", "+150 Food", "+200 Food", "No extra food"],
      after: "Update: In current DE meta, Lithuanians start with +150 food.",
      correctAnswer: 1,
      explanation: "Lithuanians receive +150 food at the start, allowing for faster villager production or earlier scouting tech.",
      category: "civilizations"
    },
    {
      id: "da5",
      text: "Pushing a deer to the Town Center is most effective for...",
      options: ["Saving wood on farms", "Faster food gathering", "Denying enemy scout info", "Increasing scout LoS"],
      correctAnswer: 1,
      explanation: "Deer gather significantly faster than berries or sheep, providing a huge early game boost.",
      category: "economy"
    },
    {
      id: "da6",
      text: "Which animal provides the most food when harvested?",
      options: ["Boar", "Elephant", "Rhino", "Ostrich"],
      correctAnswer: 1,
      explanation: "Elephants (found on certain maps) provide 400 food, while Boars and Rhinos provide 340-350.",
      category: "economy"
    },
    {
      id: "da7",
      text: "What is the wood cost of a Lumber Camp?",
      options: ["50", "75", "100", "125"],
      correctAnswer: 2,
      explanation: "Building a Lumber Camp, Mill, or Mining Camp costs 100 wood.",
      category: "economy"
    }
  ],
  "feudal-warfare": [
    {
      id: "fw1",
      text: "How much bonus damage do Spearmen deal against Scout Cavalry?",
      options: ["+10", "+15", "+25", "+30"],
      correctAnswer: 1,
      explanation: "Spearmen deal +15 bonus damage against cavalry, making them an extremely cost-effective counter to scouts.",
      category: "military"
    },
    {
      id: "fw2",
      text: "What is the prerequisite building for an Archery Range?",
      options: ["Barracks", "Stable", "Blacksmith", "Market"],
      correctAnswer: 0,
      explanation: "You must complete a Barracks before being allowed to build an Archery Range or Stable.",
      category: "meta"
    },
    {
      id: "fw3",
      text: "Which technology increases the armor of both Archers and Skirmishers?",
      options: ["Fletching", "Padded Archer Armor", "Leather Archer Armor", "Forging"],
      correctAnswer: 1,
      explanation: "Padded Archer Armor is the first blacksmith tech for ranged unit defense.",
      category: "military"
    },
    {
      id: "fw4",
      text: "In Feudal Age, which unit has the highest base movement speed?",
      options: ["Scout Cavalry", "Eagle Scout", "Archer", "Man-at-Arms"],
      correctAnswer: 0,
      explanation: "Scout Cavalry move at 1.55 tiles/sec, significantly faster than any other Feudal unit.",
      category: "military"
    },
    {
      id: "fw5",
      text: "How many villagers are required to sustain constant production from 2 Archery Ranges?",
      options: ["6 on wood, 8 on gold", "8 on wood, 10 on gold", "10 on wood, 12 on gold", "14 on wood, 16 on gold"],
      correctAnswer: 1,
      explanation: "Ideally, you need around 18 villagers distributed between wood and gold to keep 2 ranges working without idling.",
      category: "economy"
    }
  ],
  "castle-dominance": [
    {
      id: "cd1",
      text: "What is the base attack range of a Mangonel?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 2,
      explanation: "Mangonels start with 7 range, allowing them to outrange most archers without upgrades.",
      category: "military"
    },
    {
      id: "cd2",
      text: "How many Relics are typically spawned on a 1v1 Arabia map?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 2,
      explanation: "Standard maps spawn 5 relics, making them a crucial late-game gold source.",
      category: "meta"
    },
    {
      id: "cd3",
      text: "Which technology is required to build a Town Center in Castle Age?",
      options: ["University", "Town Watch", "No tech required", "Wheelbarrow"],
      correctAnswer: 2,
      explanation: "Once you reach Castle Age, you can build extra Town Centers immediately, provided you have the resources.",
      category: "meta"
    },
    {
      id: "cd4",
      text: "How much gold does a Monk cost?",
      options: ["75", "100", "125", "150"],
      correctAnswer: 1,
      explanation: "Monks cost 100 gold and are essential for relic collection and healing.",
      category: "economy"
    }
  ],
  "imperial-conquest": [
    {
      id: "ic1",
      text: "Which civilization's Trebuchets can pack and unpack twice as fast?",
      options: ["Japanese", "Britons", "Huns", "Mongols"],
      correctAnswer: 0,
      explanation: "Japanese Trebuchets have the 'Kataparuto' unique tech, allowing them to fire, pack, and move extremely quickly.",
      category: "civilizations"
    },
    {
      id: "ic2",
      text: "What is the maximum pierce armor a fully upgraded Paladin can reach (non-unique)?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 2,
      explanation: "Generic Paladins with Plate Barding Armor reach 7 pierce armor (3 base + 4 upgrade).",
      category: "military"
    },
    {
      id: "ic3",
      text: "How much health does a Bombard Cannon have?",
      options: ["50", "60", "80", "100"],
      correctAnswer: 2,
      explanation: "Bombard Cannons have 80 HP, making them vulnerable to cavalry snipes if left unprotected.",
      category: "military"
    }
  ]
}
