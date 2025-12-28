// Meta data for civilizations based on maps and matchups
// This represents competitive knowledge about civilization strengths

export interface CivMapMeta {
  civId: string
  mapId: string
  tier: "S" | "A" | "B" | "C" | "D"
  winRate: number // Approximate win rate on this map
  pickRate: number // How often picked on this map
  banRate: number // How often banned on this map
  notes?: string
}

export interface CivMatchup {
  civId: string
  opponentCivId: string
  advantage: "strong" | "slight" | "even" | "slight_disadvantage" | "weak"
  winRate: number
  notes?: string
}

export interface CivSuggestion {
  civId: string
  reason: string
  score: number // 0-100
  type: "recommended" | "counter" | "meta" | "synergy"
}

// Map tiers for each civilization on common maps
export const CIV_MAP_META: CivMapMeta[] = [
  // Arabia - Open map favorites
  {
    civId: "franks",
    mapId: "arabia",
    tier: "S",
    winRate: 54,
    pickRate: 18,
    banRate: 22,
    notes: "Knight rush dominant",
  },
  { civId: "mayans", mapId: "arabia", tier: "S", winRate: 53, pickRate: 15, banRate: 18, notes: "Plumed archer power" },
  { civId: "aztecs", mapId: "arabia", tier: "S", winRate: 52, pickRate: 12, banRate: 15, notes: "Eagle + monk combo" },
  {
    civId: "huns",
    mapId: "arabia",
    tier: "A",
    winRate: 51,
    pickRate: 10,
    banRate: 8,
    notes: "No house bonus aggression",
  },
  { civId: "mongols", mapId: "arabia", tier: "A", winRate: 51, pickRate: 9, banRate: 7, notes: "Mangudai late game" },
  { civId: "berbers", mapId: "arabia", tier: "A", winRate: 50, pickRate: 8, banRate: 6, notes: "Camel archers" },
  { civId: "chinese", mapId: "arabia", tier: "A", winRate: 50, pickRate: 7, banRate: 5, notes: "Versatile opener" },
  { civId: "britons", mapId: "arabia", tier: "B", winRate: 49, pickRate: 8, banRate: 4, notes: "Range advantage" },
  {
    civId: "vietnamese",
    mapId: "arabia",
    tier: "B",
    winRate: 48,
    pickRate: 5,
    banRate: 3,
    notes: "Reveal enemy position",
  },
  { civId: "turks", mapId: "arabia", tier: "C", winRate: 46, pickRate: 3, banRate: 1, notes: "Weak early game" },

  // Arena - Closed map specialists
  { civId: "aztecs", mapId: "arena", tier: "S", winRate: 55, pickRate: 20, banRate: 25, notes: "Monk rush king" },
  {
    civId: "turks",
    mapId: "arena",
    tier: "S",
    winRate: 54,
    pickRate: 18,
    banRate: 20,
    notes: "Fast Imperial + Janissary",
  },
  { civId: "spanish", mapId: "arena", tier: "A", winRate: 52, pickRate: 12, banRate: 10, notes: "Conq + monk" },
  { civId: "teutons", mapId: "arena", tier: "A", winRate: 51, pickRate: 10, banRate: 8, notes: "Castle age power" },
  { civId: "bohemians", mapId: "arena", tier: "A", winRate: 51, pickRate: 9, banRate: 7, notes: "Houfnice + monks" },
  { civId: "franks", mapId: "arena", tier: "B", winRate: 49, pickRate: 6, banRate: 3, notes: "Less open space" },
  { civId: "mayans", mapId: "arena", tier: "C", winRate: 45, pickRate: 3, banRate: 1, notes: "Struggles in closed" },

  // Black Forest - Chokepoint control
  {
    civId: "celts",
    mapId: "black_forest",
    tier: "S",
    winRate: 56,
    pickRate: 22,
    banRate: 28,
    notes: "Siege + infantry",
  },
  { civId: "goths", mapId: "black_forest", tier: "S", winRate: 55, pickRate: 18, banRate: 22, notes: "Infantry flood" },
  { civId: "teutons", mapId: "black_forest", tier: "A", winRate: 52, pickRate: 12, banRate: 10, notes: "Slow push" },
  { civId: "koreans", mapId: "black_forest", tier: "A", winRate: 51, pickRate: 8, banRate: 6, notes: "War wagons" },
  {
    civId: "ethiopians",
    mapId: "black_forest",
    tier: "A",
    winRate: 50,
    pickRate: 7,
    banRate: 5,
    notes: "Siege archers",
  },

  // Islands - Water map kings
  { civId: "italians", mapId: "islands", tier: "S", winRate: 58, pickRate: 25, banRate: 30, notes: "Dock discount" },
  {
    civId: "portuguese",
    mapId: "islands",
    tier: "S",
    winRate: 56,
    pickRate: 20,
    banRate: 25,
    notes: "Feitoria + ships",
  },
  { civId: "vikings", mapId: "islands", tier: "S", winRate: 55, pickRate: 18, banRate: 20, notes: "Free wheelbarrow" },
  { civId: "japanese", mapId: "islands", tier: "A", winRate: 52, pickRate: 12, banRate: 8, notes: "Fishing ships" },
  { civId: "malay", mapId: "islands", tier: "A", winRate: 51, pickRate: 10, banRate: 6, notes: "Cheap elephants" },

  // Gold Rush - Gold control
  {
    civId: "aztecs",
    mapId: "gold_rush",
    tier: "S",
    winRate: 54,
    pickRate: 18,
    banRate: 20,
    notes: "Monk gold control",
  },
  {
    civId: "spanish",
    mapId: "gold_rush",
    tier: "A",
    winRate: 51,
    pickRate: 10,
    banRate: 8,
    notes: "Gold income trade",
  },
  { civId: "mongols", mapId: "gold_rush", tier: "A", winRate: 51, pickRate: 9, banRate: 7, notes: "Hunt bonus" },

  // Nomad - Unique start
  { civId: "mongols", mapId: "nomad", tier: "S", winRate: 55, pickRate: 22, banRate: 25, notes: "Hunt bonus huge" },
  { civId: "persians", mapId: "nomad", tier: "S", winRate: 54, pickRate: 18, banRate: 20, notes: "TC bonus" },
  { civId: "chinese", mapId: "nomad", tier: "A", winRate: 52, pickRate: 12, banRate: 10, notes: "Extra villagers" },
  { civId: "spanish", mapId: "nomad", tier: "A", winRate: 51, pickRate: 10, banRate: 8, notes: "Build bonus" },
]

// Matchup data for counter-pick suggestions
export const CIV_MATCHUPS: CivMatchup[] = [
  // Armenians matchups (from OCR)
  { civId: "armenians", opponentCivId: "teutons", advantage: "strong", winRate: 56.5, notes: "Anulan mecánicamente la mayor defensa de estas civilizaciones." },
  { civId: "armenians", opponentCivId: "slavs", advantage: "strong", winRate: 56.5, notes: "Anulan mecánicamente la mayor defensa de estas civilizaciones." },
  { civId: "armenians", opponentCivId: "vikings", advantage: "strong", winRate: 55, notes: "Limpian flotas enteras con una inversión de recursos significativamente menor." },
  { civId: "armenians", opponentCivId: "saracens", advantage: "strong", winRate: 55, notes: "Limpian flotas enteras con una inversión de recursos significativamente menor." },
  { civId: "armenians", opponentCivId: "turks", advantage: "weak", winRate: 42.5, notes: "Carecen de herramientas de movilidad y asedio de largo alcance. Turcos pueden kitear y destruir la infantería armenia." },
  { civId: "armenians", opponentCivId: "bohemians", advantage: "weak", winRate: 42.5, notes: "Carecen de herramientas de movilidad y asedio de largo alcance. Bohemios pueden kitear y destruir la infantería armenia." },
  { civId: "armenians", opponentCivId: "ethiopians", advantage: "weak", winRate: 40, notes: "Arqueros etíopes disparan más rápido, y sus Onagros con mayor área de efecto destrozan las formaciones compactas que los Armenios necesitan." },

  // Aztecs matchups (from OCR)
  { civId: "aztecs", opponentCivId: "goths", advantage: "strong", winRate: 55, notes: "Jaguar Guerrero es el contraataque definitivo para cualquier unidad de infantería." },
  { civId: "aztecs", opponentCivId: "franks", advantage: "strong", winRate: 55, notes: "Monjes aztecas con 95 HP son extremadamente difíciles de matar para los Scouts o Caballeros en números bajos. La conversión de unidades caras como Paladines invierte la ventaja económica." },
  { civId: "aztecs", opponentCivId: "huns", advantage: "strong", winRate: 55, notes: "Monjes aztecas con 95 HP son extremadamente difíciles de matar para los Scouts o Caballeros en números bajos. La conversión de unidades caras como Paladines invierte la ventaja económica." },
  { civId: "aztecs", opponentCivId: "bengalis", advantage: "weak", winRate: 40, notes: "Aztecas carecen de caballería para flanquear y destruir armas de asedio. Si un jugador Bengalí protege bien sus Onagros o Escorpiones, la infantería azteca será masacrada." },
  { civId: "aztecs", opponentCivId: "slavs", advantage: "weak", winRate: 40, notes: "Aztecas carecen de caballería para flanquear y destruir armas de asedio. Si un jugador Eslavo protege bien sus Onagros o Escorpiones, la infantería azteca será masacrada." },
  { civId: "aztecs", opponentCivId: "mayans", advantage: "weak", winRate: 40, notes: "Mayas tienen Plumed Archers (bonus vs infantería) y los Vietnamitas tienen arqueros con mucha HP. Falta de la última mejora de armadura y alabarderos se hace notar." },
  { civId: "aztecs", opponentCivId: "vietnamese", advantage: "weak", winRate: 40, notes: "Mayas tienen Plumed Archers (bonus vs infantería) y los Vietnamitas tienen arqueros con mucha HP. Falta de la última mejora de armadura y alabarderos se hace notar." },

  // Bengalis matchups (from OCR)
  { civId: "bengalis", opponentCivId: "britons", advantage: "strong", winRate: 52, notes: "Elefantes de Batalla bengalíes reciben una reducción de daño de bonificación, haciéndolos tanques formidables contra flechas. Ratha puede cambiar a modo melee para eliminar hostigadores." },
  { civId: "bengalis", opponentCivId: "vietnamese", advantage: "strong", winRate: 52, notes: "Elefantes de Batalla bengalíes reciben una reducción de daño de bonificación, haciéndolos tanques formidables contra flechas. Ratha puede cambiar a modo melee para eliminar hostigadores." },
  { civId: "bengalis", opponentCivId: "gurjaras", advantage: "weak", winRate: 39, notes: "Gurjaras poseen camellos con bonificaciones extremas y bonificaciones de daño contra elefantes. Bengalíes no tienen alabarderos completos ni camellos propios para defenderse." },
  { civId: "bengalis", opponentCivId: "berbers", advantage: "weak", winRate: 40, notes: "Bereberes poseen camellos con bonificaciones extremas y bonificaciones de daño contra elefantes. Bengalíes no tienen alabarderos completos ni camellos propios para defenderse." },
  { civId: "bengalis", opponentCivId: "goths", advantage: "weak", winRate: 40, notes: "Elefantes son lentos y vulnerables a la infantería masiva (Huskarls/Halbs) si no están protegidos por una composición perfecta." },

  // Berbers matchups (from OCR)
  { civId: "berbers", opponentCivId: "mongols", advantage: "strong", winRate: 55, notes: "Arquero a Camello es el contraataque específico diseñado para matar Arqueros a Caballo. Tienen bonificación de ataque contra ellos y es más rápido o igual de móvil. Los Genitours complementan esta ventaja." },
  { civId: "berbers", opponentCivId: "huns", advantage: "strong", winRate: 55, notes: "Arquero a Camello es el contraataque específico diseñado para matar Arqueros a Caballo. Tienen bonificación de ataque contra ellos y es más rápido o igual de móvil. Los Genitours complementan esta ventaja." },
  { civId: "berbers", opponentCivId: "tatars", advantage: "strong", winRate: 55, notes: "Arquero a Camello es el contraataque específico diseñado para matar Arqueros a Caballo. Tienen bonificación de ataque contra ellos y es más rápido o igual de móvil. Los Genitours complementan esta ventaja." },
  { civId: "berbers", opponentCivId: "franks", advantage: "strong", winRate: 55, notes: "Economía de guerra. Aunque el Paladín Franco es individualmente más fuerte, el Bereber puede producir muchos más camellos o caballeros por el mismo costo, ganando por saturación y contracaballería (Camellos pesados)." },
  { civId: "berbers", opponentCivId: "teutons", advantage: "weak", winRate: 40, notes: "Bereberes dependen casi totalmente de unidades montadas. Sufren contra la 'bola de la muerte' teutona de Alabarderos y Onagros, ya que carecen de buena infantería o artillería de largo alcance para romper esa formación defensiva." },
  { civId: "berbers", opponentCivId: "gurjaras", advantage: "weak", winRate: 40, notes: "En una guerra de camellos, el camello Gurjara es superior cualitativamente en combate cuerpo a cuerpo." },

  // Bohemians matchups (from OCR)
  { civId: "bohemians", opponentCivId: "britons", advantage: "strong", winRate: 55, notes: "Vagón Husita actúa como un escudo móvil que absorbe el 50% del daño de proyectil destinado a las unidades detrás de él. Esto neutraliza completamente el rango británico, permitiendo que los Artilleros Manuales y el Houfnice bohemio avancen y destruyan a los arqueros." },
  { civId: "bohemians", opponentCivId: "mayans", advantage: "strong", winRate: 55, notes: "Vagón Husita actúa como un escudo móvil que absorbe el 50% del daño de proyectil destinado a las unidades detrás de él. Esto neutraliza completamente el rango británico, permitiendo que los Artilleros Manuales y el Houfnice bohemio avancen y destruyan a los arqueros." },
  { civId: "bohemians", opponentCivId: "persians", advantage: "strong", winRate: 55, notes: "Alabarderos bohemios tienen un +25% de daño de bonificación. Esto significa que derriten a la caballería mucho más rápido que un alabardero genérico, protegiendo perfectamente a su artillería." },
  { civId: "bohemians", opponentCivId: "poles", advantage: "strong", winRate: 55, notes: "Alabarderos bohemios tienen un +25% de daño de bonificación. Esto significa que derriten a la caballería mucho más rápido que un alabardero genérico, protegiendo perfectamente a su artillería." },
  { civId: "bohemians", opponentCivId: "mongols", advantage: "weak", winRate: 40, notes: "Bohemios son extremadamente lentos. Mongoles con Mangudai (bonus vs asedio) y Onagros rápidos con taladro pueden flanquear y destruir los costosos Vagones Husitas y Houfnices antes de que puedan posicionarse." },
  { civId: "bohemians", opponentCivId: "ethiopians", advantage: "weak", winRate: 40, notes: "Bohemios son extremadamente lentos. Etíopes con Mangudai (bonus vs asedio) y Onagros rápidos con taladro pueden flanquear y destruir los costosos Vagones Husitas y Houfnices antes de que puedan posicionarse." },

  // Britons matchups
  { civId: "britons", opponentCivId: "japanese", advantage: "strong", winRate: 55, notes: "Mecánica de 'Kiting' (golpear y moverse) es perfecta aquí. La infantería lenta muere antes de llegar a la línea británica." },
  { civId: "britons", opponentCivId: "teutons", advantage: "strong", winRate: 55, notes: "Mecánica de 'Kiting' (golpear y moverse) es perfecta aquí. La infantería lenta muere antes de llegar a la línea británica. Los Teutones, en particular, carecen de Husbandry para sus jinetes, haciéndolos presas fáciles." },
  { civId: "britons", opponentCivId: "celts", advantage: "strong", winRate: 55, notes: "Mecánica de 'Kiting' (golpear y moverse) es perfecta aquí. La infantería lenta muere antes de llegar a la línea británica." },
  { civId: "britons", opponentCivId: "saracens", advantage: "strong", winRate: 55, notes: "Estas civilizaciones dependen de camellos o unidades con baja armadura de proyectil. El volumen de fuego de los Longbowmen las elimina rápidamente." },
  { civId: "britons", opponentCivId: "hindustanis", advantage: "strong", winRate: 55, notes: "Estas civilizaciones dependen de camellos o unidades con baja armadura de proyectil. El volumen de fuego de los Longbowmen las elimina rápidamente." },
  { civId: "britons", opponentCivId: "goths", advantage: "weak", winRate: 35, notes: "Hard Counter clásico. Los Huskarls godos tienen una armadura anti-proyectil tan alta (6-10) que las flechas británicas les hacen 1 de daño mínimo. Los Británicos no tienen Paladines ni Artilleros Manuales fuertes para detener la marea." },
  { civId: "britons", opponentCivId: "vietnamese", advantage: "weak", winRate: 35, notes: "Vietnamitas tienen el Rattan Archer (casi inmune a flechas) y Imperial Skirmisher. Los Malíes tienen infantería con +3 de armadura de proyectil, resistiendo el fuego británico el tiempo suficiente para cerrar la brecha." },
  { civId: "britons", opponentCivId: "malians", advantage: "weak", winRate: 35, notes: "Malíes tienen infantería con +3 de armadura de proyectil, resistiendo el fuego británico el tiempo suficiente para cerrar la brecha." },

  // Bulgarians matchups
  { civId: "bulgarians", opponentCivId: "goths", advantage: "strong", winRate: 55, notes: "Búlgaros tienen acceso a la tecnología única Bagains, que otorga +5 de armadura cuerpo a cuerpo a su línea de milicia. Sus Espadachines a Dos Manos se vuelven tanques físicos que trituran a los Huskarls y Águilas en combate directo." },
  { civId: "bulgarians", opponentCivId: "mayans", advantage: "strong", winRate: 55, notes: "Búlgaros tienen acceso a la tecnología única Bagains, que otorga +5 de armadura cuerpo a cuerpo a su línea de milicia. Sus Espadachines a Dos Manos se vuelven tanques físicos que trituran a los Huskarls y Águilas en combate directo." },
  { civId: "bulgarians", opponentCivId: "aztecs", advantage: "strong", winRate: 55, notes: "Búlgaros tienen acceso a la tecnología única Bagains, que otorga +5 de armadura cuerpo a cuerpo a su línea de milicia. Sus Espadachines a Dos Manos se vuelven tanques físicos que trituran a los Huskarls y Águilas en combate directo." },
  { civId: "bulgarians", opponentCivId: "byzantines", advantage: "strong", winRate: 55, notes: "Pueden transicionar instantáneamente de caballería a espadachines (gratis) para limpiar a los hostigadores enemigos." },
  { civId: "bulgarians", opponentCivId: "vietnamese", advantage: "strong", winRate: 55, notes: "Pueden transicionar instantáneamente de caballería a espadachines (gratis) para limpiar a los hostigadores enemigos." },
  { civId: "bulgarians", opponentCivId: "cumans", advantage: "weak", winRate: 40, notes: "Búlgaros carecen de la mejora de Crossbowman (Ballestero) en la Edad de los Castillos, lo que los deja sin una buena opción de rango. Si se enfrentan a Arqueros a Caballo que kitean a su infantería y Konniks, no tienen cómo forzar la pelea." },
  { civId: "bulgarians", opponentCivId: "tatars", advantage: "weak", winRate: 40, notes: "Búlgaros carecen de la mejora de Crossbowman (Ballestero) en la Edad de los Castillos, lo que los deja sin una buena opción de rango. Si se enfrentan a Arqueros a Caballo que kitean a su infantería y Konniks, no tienen cómo forzar la pelea." },

  // Burgundians matchups
  { civId: "burgundians", opponentCivId: "slavs", advantage: "strong", winRate: 55, notes: "El ataque cargado del Coustillier permite entrar, eliminar una unidad clave (como un monje o un onagro) de un solo golpe, y huir. La economía borgoñona permite llegar a Paladín mucho antes que el oponente." },
  { civId: "burgundians", opponentCivId: "teutons", advantage: "strong", winRate: 55, notes: "El ataque cargado del Coustillier permite entrar, eliminar una unidad clave (como un monje o un onagro) de un solo golpe, y huir. La economía borgoñona permite llegar a Paladín mucho antes que el oponente." },
  { civId: "burgundians", opponentCivId: "japanese", advantage: "strong", winRate: 55, notes: "Sus Artilleros Manuales tienen +25% de daño, destrozando infantería a distancia." },
  { civId: "burgundians", opponentCivId: "hindustanis", advantage: "weak", winRate: 39, notes: "Caballería borgoñona carece de Bloodlines. Contra camellos con alto daño de bonificación, sus Paladines mueren extremadamente rápido y no son rentables." },
  { civId: "burgundians", opponentCivId: "gurjaras", advantage: "weak", winRate: 39, notes: "Caballería borgoñona carece de Bloodlines. Contra camellos con alto daño de bonificación, sus Paladines mueren extremadamente rápido y no son rentables." },

  // Burmese matchups
  { civId: "burmese", opponentCivId: "vikings", advantage: "strong", winRate: 55, notes: "La infantería birmana obtiene +1 de ataque gratis por edad. Sus campeones trituran a otras infanterías. La unidad única Arambai tiene un daño bruto altísimo que destruye unidades sin armadura a corta distancia." },
  { civId: "burmese", opponentCivId: "malians", advantage: "strong", winRate: 55, notes: "La infantería birmana obtiene +1 de ataque gratis por edad. Sus campeones trituran a otras infanterías. La unidad única Arambai tiene un daño bruto altísimo que destruye unidades sin armadura a corta distancia." },
  { civId: "burmese", opponentCivId: "britons", advantage: "weak", winRate: 35, notes: "Debilidad Crítica. Los Birmanos carecen de la segunda mejora de armadura para arqueros y hostigadores. Sus unidades caen como moscas ante el fuego de flechas. Los Arambai tienen pésima defensa contra proyectiles. Es uno de los matchups más unilaterales del juego a favor del arquero." },
  { civId: "burmese", opponentCivId: "mayans", advantage: "weak", winRate: 35, notes: "Debilidad Crítica. Los Birmanos carecen de la segunda mejora de armadura para arqueros y hostigadores. Sus unidades caen como moscas ante el fuego de flechas. Los Arambai tienen pésima defensa contra proyectiles. Es uno de los matchups más unilaterales del juego a favor del arquero." },
  { civId: "burmese", opponentCivId: "vietnamese", advantage: "weak", winRate: 35, notes: "Debilidad Crítica. Los Birmanos carecen de la segunda mejora de armadura para arqueros y hostigadores. Sus unidades caen como moscas ante el fuego de flechas. Los Arambai tienen pésima defensa contra proyectiles. Es uno de los matchups más unilaterales del juego a favor del arquero." },

  // Byzantines matchups
  { civId: "byzantines", opponentCivId: "persians", advantage: "strong", winRate: 55, notes: "Camellos con 25% de descuento. Pueden producir 4 camellos por el precio de 3 del enemigo, ganando cualquier guerra de desgaste económica." },
  { civId: "byzantines", opponentCivId: "franks", advantage: "strong", winRate: 55, notes: "Camellos con 25% de descuento. Pueden producir 4 camellos por el precio de 3 del enemigo, ganando cualquier guerra de desgaste económica." },
  { civId: "byzantines", opponentCivId: "lithuanians", advantage: "strong", winRate: 55, notes: "Camellos con 25% de descuento. Pueden producir 4 camellos por el precio de 3 del enemigo, ganando cualquier guerra de desgaste económica." },
  { civId: "byzantines", opponentCivId: "goths", advantage: "strong", winRate: 55, notes: "La Catafracta es la única caballería diseñada para matar infantería. Tiene bonificación de ataque y anula el daño extra de los piqueros. Con la tecnología Logistica, hacen daño de área (trample), borrando ejércitos de Huskarls." },
  { civId: "byzantines", opponentCivId: "vikings", advantage: "weak", winRate: 40, notes: "Bizantinos no tienen bonificación eco temprana. Si se quedan atrás económicamente, sus unidades baratas no son suficientes para detener unidades de calidad superior totalmente mejoradas." },
  { civId: "byzantines", opponentCivId: "chinese", advantage: "weak", winRate: 40, notes: "Bizantinos no tienen bonificación eco temprana. Si se quedan atrás económicamente, sus unidades baratas no son suficientes para detener unidades de calidad superior totalmente mejoradas." },

  // Celts matchups
  { civId: "celts", opponentCivId: "britons", advantage: "strong", winRate: 55, notes: "Onagros con +40% HP (tecnología Furor Celtica) resisten el fuego de contrabatería y torres, permitiéndoles aplastar formaciones de arqueros o torres defensivas." },
  { civId: "celts", opponentCivId: "koreans", advantage: "strong", winRate: 55, notes: "Onagros con +40% HP (tecnología Furor Celtica) resisten el fuego de contrabatería y torres, permitiéndoles aplastar formaciones de arqueros o torres defensivas." },
  { civId: "celts", opponentCivId: "mongols", advantage: "weak", winRate: 35, notes: "Hard Counter. Los Mangudai tienen bonificación de ataque contra asedio. Son demasiado rápidos para la infantería celta y destruyen sus onagros en segundos. Los Celtas no tienen respuesta efectiva." },
  { civId: "celts", opponentCivId: "italians", advantage: "weak", winRate: 40, notes: "Condottiero y los arqueros italianos manejan bien la infantería celta, y sus propios cañones de bombardeo pueden snipear onagros." },

  // Chinese matchups
  { civId: "chinese", opponentCivId: "goths", advantage: "strong", winRate: 55, notes: "Chu Ko Nu dispara múltiples flechas. Aunque hace poco daño por flecha, el volumen total y el daño mínimo garantizado derriten arietes y unidades con alta armadura pero baja HP relativa como la infantería ligera." },
  { civId: "chinese", opponentCivId: "ethiopians", advantage: "weak", winRate: 40, notes: "Ejércitos chinos (Chu Ko Nu) deben agruparse para ser efectivos. Son extremadamente vulnerables a un disparo de Onagro bien colocado, que puede eliminar 30 unidades en un segundo." },
  { civId: "chinese", opponentCivId: "koreans", advantage: "weak", winRate: 40, notes: "Ejércitos chinos (Chu Ko Nu) deben agruparse para ser efectivos. Son extremadamente vulnerables a un disparo de Onagro bien colocado, que puede eliminar 30 unidades en un segundo." },

  // Cumans matchups
  { civId: "cumans", opponentCivId: "turks", advantage: "strong", winRate: 55, notes: "Si se les permite usar su segundo TC sin presión, su economía explota y superan en número a cualquiera en la Edad de los Castillos." },
  { civId: "cumans", opponentCivId: "mongols", advantage: "weak", winRate: 40, notes: "Invertir en el segundo TC cuesta recursos militares. Un Tower Rush o agresión feudal fuerte puede matarlos antes de que el boom pague." },
  { civId: "cumans", opponentCivId: "lithuanians", advantage: "weak", winRate: 40, notes: "Invertir en el segundo TC cuesta recursos militares. Un Tower Rush o agresión feudal fuerte puede matarlos antes de que el boom pague." },
  { civId: "cumans", opponentCivId: "berbers", advantage: "weak", winRate: 40, notes: "Camellos baratos contrarrestan su caballería." },

  // Dravidians matchups
  { civId: "dravidians", opponentCivId: "vikings", advantage: "strong", winRate: 55, notes: "Thirisadai es una nave monstruosa contra otras naves capitales." },
  { civId: "dravidians", opponentCivId: "britons", advantage: "weak", winRate: 40, notes: "Carecen de movilidad (sin Húsar, sin Bloodlines). No pueden cerrar la distancia contra arqueros de largo alcance ni flanquear onagros enemigos. Esta es una debilidad estructural severa en mapas abiertos como Arabia." },
  { civId: "dravidians", opponentCivId: "ethiopians", advantage: "weak", winRate: 40, notes: "Carecen de movilidad (sin Húsar, sin Bloodlines). No pueden cerrar la distancia contra arqueros de largo alcance ni flanquear onagros enemigos. Esta es una debilidad estructural severa en mapas abiertos como Arabia." },

  // Ethiopians matchups
  { civId: "ethiopians", opponentCivId: "teutons", advantage: "strong", winRate: 55, notes: "Combinación de arqueros de alto DPS y Onagros con Torsion Engines (área masiva) aniquila formaciones lentas de infantería y caballería pesada." },
  { civId: "ethiopians", opponentCivId: "slavs", advantage: "strong", winRate: 55, notes: "Combinación de arqueros de alto DPS y Onagros con Torsion Engines (área masiva) aniquila formaciones lentas de infantería y caballería pesada." },
  { civId: "ethiopians", opponentCivId: "romans", advantage: "strong", winRate: 55, notes: "Sus onagros destrozan las formaciones compactas romanas." },
  { civId: "ethiopians", opponentCivId: "huns", advantage: "weak", winRate: 40, notes: "Si la caballería logra flanquear y llegar a los arqueros/onagros, los Etíopes carecen de buena caballería propia para interceptar." },
  { civId: "ethiopians", opponentCivId: "berbers", advantage: "weak", winRate: 40, notes: "Si la caballería logra flanquear y llegar a los arqueros/onagros, los Etíopes carecen de buena caballería propia para interceptar." },

  // Franks matchups
  { civId: "franks", opponentCivId: "mayans", advantage: "strong", winRate: 55, notes: "Caballeros con +20% HP. Simplemente aguantan más flechas de las que deberían, permitiendo cerrar distancia y eliminar a los arqueros." },
  { civId: "franks", opponentCivId: "vietnamese", advantage: "strong", winRate: 55, notes: "Caballeros con +20% HP. Simplemente aguantan más flechas de las que deberían, permitiendo cerrar distancia y eliminar a los arqueros." },
  { civId: "franks", opponentCivId: "goths", advantage: "strong", winRate: 55, notes: "Lanzador de Hachas (Throwing Axeman) destruye piqueros desde lejos, protegiendo a los Paladines." },
  { civId: "franks", opponentCivId: "gurjaras", advantage: "weak", winRate: 35, notes: "Camellos de estas civs son superiores. El Camello Gurjara tiene armadura melee extra (aguanta al Paladín) y bonus masivo. Es estadísticamente uno de los peores matchups para Francos." },
  { civId: "franks", opponentCivId: "hindustanis", advantage: "weak", winRate: 35, notes: "Camellos de estas civs son superiores. El Camello Gurjara tiene armadura melee extra (aguanta al Paladín) y bonus masivo. Es estadísticamente uno de los peores matchups para Francos." },

  // Georgians matchups
  { civId: "georgians", opponentCivId: "japanese", advantage: "weak", winRate: 40, notes: "Monaspa (UU) necesita estar en grupos grandes para tener su bonus de ataque. Los piqueros con alto ataque o daño de área castigan severamente estas agrupaciones densas." },
  { civId: "georgians", opponentCivId: "aztecs", advantage: "weak", winRate: 40, notes: "Monaspa (UU) necesita estar en grupos grandes para tener su bonus de ataque. Los piqueros con alto ataque o daño de área castigan severamente estas agrupaciones densas." },

  // Goths matchups
  { civId: "goths", opponentCivId: "mayans", advantage: "strong", winRate: 55, notes: "Huskarl es prácticamente inmune a las flechas. Los Mayas no tienen jinetes ni campeones fuertes para detenerlos. Es una victoria casi asegurada en Imperial." },
  { civId: "goths", opponentCivId: "britons", advantage: "strong", winRate: 55, notes: "Huskarl es prácticamente inmune a las flechas. Los Mayas no tienen jinetes ni campeones fuertes para detenerlos. Es una victoria casi asegurada en Imperial." },
  { civId: "goths", opponentCivId: "ethiopians", advantage: "strong", winRate: 55, notes: "Huskarl es prácticamente inmune a las flechas. Los Mayas no tienen jinetes ni campeones fuertes para detenerlos. Es una victoria casi asegurada en Imperial." },
  { civId: "goths", opponentCivId: "japanese", advantage: "weak", winRate: 40, notes: "Samurai o Jaguar Warrior mata a 3-4 unidades godas. El Godo se queda sin recursos antes de ganar por número." },
  { civId: "goths", opponentCivId: "teutons", advantage: "weak", winRate: 40, notes: "Samurai o Jaguar Warrior mata a 3-4 unidades godas. El Godo se queda sin recursos antes de ganar por número." },
  { civId: "goths", opponentCivId: "aztecs", advantage: "weak", winRate: 40, notes: "Samurai o Jaguar Warrior mata a 3-4 unidades godas. El Godo se queda sin recursos antes de ganar por número." },

  // Gurjaras matchups
  { civId: "gurjaras", opponentCivId: "franks", advantage: "strong", winRate: 65, notes: "Sus camellos y jinetes Shrivamsha (esquivan flechas) dominan el mapa contra civs de caballos convencionales." },
  { civId: "gurjaras", opponentCivId: "huns", advantage: "strong", winRate: 65, notes: "Sus camellos y jinetes Shrivamsha (esquivan flechas) dominan el mapa contra civs de caballos convencionales." },
  { civId: "gurjaras", opponentCivId: "lithuanians", advantage: "strong", winRate: 65, notes: "Sus camellos y jinetes Shrivamsha (esquivan flechas) dominan el mapa contra civs de caballos convencionales." },
  { civId: "gurjaras", opponentCivId: "hindustanis", advantage: "weak", winRate: 35, notes: "El Camello Imperial Hindustani vence al Camello Gurjara." },

  // Hindustanis matchups
  { civId: "hindustanis", opponentCivId: "gurjaras", advantage: "strong", winRate: 65, notes: "El Camello Imperial es el rey de las batallas montadas." },
  { civId: "hindustanis", opponentCivId: "teutons", advantage: "weak", winRate: 40, notes: "El Ghulam y el Camello son débiles contra infantería pesada cuerpo a cuerpo (Campeones/Legionarios). Los Hindustanis dependen de Artilleros Manuales, que son frágiles y difíciles de micro-gestionar contra una masa de infantería con asedio." },
  { civId: "hindustanis", opponentCivId: "romans", advantage: "weak", winRate: 40, notes: "El Ghulam y el Camello son débiles contra infantería pesada cuerpo a cuerpo (Campeones/Legionarios). Los Hindustanis dependen de Artilleros Manuales, que son frágiles y difíciles de micro-gestionar contra una masa de infantería con asedio." },

  // Huns matchups
  { civId: "huns", opponentCivId: "goths", advantage: "strong", winRate: 55, notes: "Movilidad de Arqueros a Caballo (CA) baratos. Pueden kitear infantería eternamente." },
  { civId: "huns", opponentCivId: "celts", advantage: "strong", winRate: 55, notes: "Movilidad de Arqueros a Caballo (CA) baratos. Pueden kitear infantería eternamente." },
  { civId: "huns", opponentCivId: "gurjaras", advantage: "weak", winRate: 40, notes: "Sus CA y Paladines son anulados por Camellos y Shrivamshas/Arqueros a Camello." },
  { civId: "huns", opponentCivId: "berbers", advantage: "weak", winRate: 40, notes: "Sus CA y Paladines son anulados por Camellos y Shrivamshas/Arqueros a Camello." },

  // Incas matchups
  { civId: "incas", opponentCivId: "goths", advantage: "strong", winRate: 55, notes: "Tienen la unidad Slinger (Hondero) disponible en Castillos. Es un 'arquero' que hace daño bonus a infantería. Destroza Huskarls ignorando su armadura anti-flecha." },
  { civId: "incas", opponentCivId: "turks", advantage: "weak", winRate: 40, notes: "Slinger y el Kamayuk mueren ante Artilleros y cañones antes de hacer daño." },
  { civId: "incas", opponentCivId: "portuguese", advantage: "weak", winRate: 40, notes: "Slinger y el Kamayuk mueren ante Artilleros y cañones antes de hacer daño." },

  // Italians matchups
  { civId: "italians", opponentCivId: "turks", advantage: "strong", winRate: 55, notes: "Condottiero. Infantería rápida con bonus vs pólvora y resistencia. Anula Jenízaros y Conquistadores." },
  { civId: "italians", opponentCivId: "ethiopians", advantage: "weak", winRate: 40, notes: "Sus unidades únicas tienen corto alcance. Pierden en duelo de arqueros estándar." },
  { civId: "italians", opponentCivId: "britons", advantage: "weak", winRate: 40, notes: "Sus unidades únicas tienen corto alcance. Pierden en duelo de arqueros estándar." },

  // Japanese matchups (no explicit civ-to-civ matchups found in OCR)

  // Khmer matchups
  { civId: "khmer", opponentCivId: "aztecs", advantage: "weak", winRate: 40, notes: "Elefantes caros son convertidos fácilmente." },
  { civId: "khmer", opponentCivId: "koreans", advantage: "weak", winRate: 40, notes: "El Elefante Balista muere ante onagros." },

  // Koreans matchups
  { civId: "koreans", opponentCivId: "celts", advantage: "weak", winRate: 40, notes: "El asedio celta dispara más rápido y resiste más." },
  { civId: "koreans", opponentCivId: "mongols", advantage: "weak", winRate: 40, notes: "Los Mongoles son demasiado rápidos para la lenta 'deathball' coreana." },

  // Lithuanians matchups
  { civId: "lithuanians", opponentCivId: "teutons", advantage: "strong", winRate: 55, notes: "El Leitis ignora la armadura. Mata Caballeros Teutónicos de 2 golpes." },
  { civId: "lithuanians", opponentCivId: "slavs", advantage: "strong", winRate: 55, notes: "El Leitis ignora la armadura. Mata Caballeros Teutónicos de 2 golpes." },
  { civId: "lithuanians", opponentCivId: "aztecs", advantage: "weak", winRate: 40, notes: "Si el enemigo (Aztecas/Birmanos) roba las reliquias, pierden su bonus principal (+4 ataque)." },
  { civId: "lithuanians", opponentCivId: "burmese", advantage: "weak", winRate: 40, notes: "Si el enemigo (Aztecas/Birmanos) roba las reliquias, pierden su bonus principal (+4 ataque)." },

  // Magyars matchups
  { civId: "magyars", opponentCivId: "celts", advantage: "strong", winRate: 55, notes: "Húsar Magiar mata asedio de un golpe casi, y es barato." },

  // Malay matchups
  { civId: "malay", opponentCivId: "slavs", advantage: "weak", winRate: 40, notes: "Un espadazo de área mata 10 Karambits." },
  { civId: "malay", opponentCivId: "japanese", advantage: "weak", winRate: 40, notes: "Un espadazo de área mata 10 Karambits." },

  // Malians matchups (no explicit civ-to-civ matchups found in OCR)

  // Mayans matchups
  { civId: "mayans", opponentCivId: "goths", advantage: "weak", winRate: 35, notes: "Derrota casi segura. Huskarls invulnerables a flechas. Mayas no tienen caballería ni campeones fuertes." },

  // Mongols matchups
  { civId: "mongols", opponentCivId: "celts", advantage: "strong", winRate: 55, notes: "Mangudai tiene bonus de ataque vs Asedio. Rompe el counter natural de los arqueros." },
  { civId: "mongols", opponentCivId: "teutons", advantage: "strong", winRate: 55, notes: "Mangudai tiene bonus de ataque vs Asedio. Rompe el counter natural de los arqueros." },
  { civId: "mongols", opponentCivId: "berbers", advantage: "weak", winRate: 40, notes: "Arqueros a Camello los cazan." },

  // Persians matchups
  { civId: "persians", opponentCivId: "bohemians", advantage: "weak", winRate: 40, notes: "Elefantes/Savars son caros. Cambio de costo ineficiente." },

  // Poles matchups
  { civId: "poles", opponentCivId: "teutons", advantage: "strong", winRate: 55, notes: "Obuch quita armadura con cada golpe. Deja a los tanques enemigos como papel para los arqueros/húsares polacos." },

  // Portuguese matchups
  { civId: "portuguese", opponentCivId: "britons", advantage: "weak", winRate: 40, notes: "Poco rango en sus armas de oro." },

  // Romans matchups (no explicit civ-to-civ matchups found in OCR)

  // Saracens matchups
  { civId: "saracens", opponentCivId: "huns", advantage: "strong", winRate: 55, notes: "Mameluco lanza cimitarras a distancia. Kitea y destruye Paladines sin que estos puedan tocarlo." },
  { civId: "saracens", opponentCivId: "franks", advantage: "strong", winRate: 55, notes: "Mameluco lanza cimitarras a distancia. Kitea y destruye Paladines sin que estos puedan tocarlo." },
  { civId: "saracens", opponentCivId: "britons", advantage: "weak", winRate: 40, notes: "Mameluco tiene 0 armadura flecha. Muere instantáneo." },

  // Sicilians matchups
  { civId: "sicilians", opponentCivId: "franks", advantage: "weak", winRate: 40, notes: "Estadísticas base inferiores." },

  // Slavs matchups (no explicit civ-to-civ matchups found in OCR)

  // Spanish matchups
  { civId: "spanish", opponentCivId: "goths", advantage: "strong", winRate: 55, notes: "El Conquistador es una unidad de caballería con arma de fuego. Hit-and-run letal contra infantería y aldeanos." },
  { civId: "spanish", opponentCivId: "italians", advantage: "weak", winRate: 40, notes: "El Ballestero Genovés (anti-caballería) y el Condottiero (anti-pólvora) son el counter perfecto diseñado para matar Conquistadores y Artilleros españoles." },
  { civId: "spanish", opponentCivId: "britons", advantage: "weak", winRate: 40, notes: "El Conquistador tiene poco rango y sufre contra Longbows." },

  // Tatars matchups
  { civId: "tatars", opponentCivId: "berbers", advantage: "weak", winRate: 40, notes: "Camellos arqueros." },

  // Teutons matchups
  { civId: "teutons", opponentCivId: "huns", advantage: "strong", winRate: 55, notes: "Armadura melee extra gratis. Ganan el choque frontal." },
  { civId: "teutons", opponentCivId: "franks", advantage: "strong", winRate: 55, notes: "Armadura melee extra gratis. Ganan el choque frontal." },
  { civId: "teutons", opponentCivId: "britons", advantage: "weak", winRate: 40, notes: "Jinetes sin Husbandry. Son demasiado lentos para alcanzar a los arqueros." },
  { civId: "teutons", opponentCivId: "mayans", advantage: "weak", winRate: 40, notes: "Jinetes sin Husbandry. Son demasiado lentos para alcanzar a los arqueros." },

  // Turks matchups
  { civId: "turks", opponentCivId: "britons", advantage: "weak", winRate: 40, notes: "Debilidad Fatal. No tienen Elite Skirmisher. Si no tienen oro, pierden contra arqueros automáticamente." },
  { civId: "turks", opponentCivId: "vietnamese", advantage: "weak", winRate: 40, notes: "Debilidad Fatal. No tienen Elite Skirmisher. Si no tienen oro, pierden contra arqueros automáticamente." },

  // Vietnamese matchups
  { civId: "vietnamese", opponentCivId: "mayans", advantage: "strong", winRate: 55, notes: "Rattan Archer (casi inmune a flechas) y Imperial Skirmisher. Ganan cualquier duelo de arqueros." },
  { civId: "vietnamese", opponentCivId: "britons", advantage: "strong", winRate: 55, notes: "Rattan Archer (casi inmune a flechas) y Imperial Skirmisher. Ganan cualquier duelo de arqueros." },
  { civId: "vietnamese", opponentCivId: "goths", advantage: "weak", winRate: 40, notes: "Infantería rápida o Huskarls." },
  { civId: "vietnamese", opponentCivId: "slavs", advantage: "weak", winRate: 40, notes: "Infantería rápida o Huskarls." },

  // Vikings matchups
  { civId: "vikings", opponentCivId: "franks", advantage: "strong", winRate: 55, notes: "Piqueros con más HP y tecnología Chieftains (Berserks hacen daño a caballería)." },
];


// Get meta tier for a civ on a map
export function getCivMapTier(civId: string, mapId: string): CivMapMeta | undefined {
  return CIV_MAP_META.find((m) => m.civId === civId && m.mapId === mapId)
}

// Get matchup data for two civs
export function getCivMatchup(civId: string, opponentCivId: string): CivMatchup | undefined {
  return (
    CIV_MATCHUPS.find((m) => m.civId === civId && m.opponentCivId === opponentCivId) ||
    CIV_MATCHUPS.find((m) => m.civId === opponentCivId && m.opponentCivId === civId)
  )
}

// Get all civs sorted by tier for a map
export function getCivsForMap(mapId: string): CivMapMeta[] {
  return CIV_MAP_META.filter((m) => m.mapId === mapId).sort((a, b) => {
    const tierOrder = { S: 0, A: 1, B: 2, C: 3, D: 4 }
    return tierOrder[a.tier] - tierOrder[b.tier]
  })
}

import { CIVILIZATIONS } from "./civilizations"

export interface CivMapMeta {
  civId: string
  mapId: string
  tier: "S" | "A" | "B" | "C" | "D"
  winRate: number // Approximate win rate on this map
  pickRate: number // How often picked on this map
  banRate: number // How often banned on this map
  notes?: string
}

// ... existing interfaces ...

// Helper to get general stats
function getGeneralCivStats(civId: string): { tier: string, winRate: number } | null {
  const entries = CIV_MAP_META.filter(m => m.civId === civId)
  if (entries.length === 0) return null
  
  const avgWinRate = entries.reduce((sum, m) => sum + m.winRate, 0) / entries.length
  let tier = 'C'
  if (avgWinRate >= 53) tier = 'S'
  else if (avgWinRate >= 51) tier = 'A'
  else if (avgWinRate >= 49) tier = 'B'
  
  return { tier, winRate: Math.round(avgWinRate) }
}

// Generate suggestions based on current draft state
export function getDraftSuggestions(
  mapId: string | null,
  opponentCivs: string[],
  ownCivs: string[],
  bannedCivs: string[],
  phase: "ban" | "pick",
): CivSuggestion[] {
  console.log("[DraftAssist] getDraftSuggestions called with:", { mapId, opponentCivs, ownCivs, bannedCivs, phase });
  const suggestions: CivSuggestion[] = []

  const unavailableCivs = [...bannedCivs, ...opponentCivs, ...ownCivs]

  // META SUGGESTIONS
  let metaAdded = false
  if (mapId) {
    const mapCivs = getCivsForMap(mapId).filter((m) => !unavailableCivs.includes(m.civId))
    if (mapCivs.length > 0) {
      metaAdded = true
      // Sort by tier for this map
      const topCivs = phase === "ban" 
        ? mapCivs.filter(m => m.tier === "S" || m.tier === "A") 
        : mapCivs

      topCivs.forEach((meta) => {
        const tierScore = { S: 95, A: 85, B: 60, C: 45, D: 30 }[meta.tier] || 50
        // For bans, we prioritize high tier more. For picks, we verify counters too.
        suggestions.push({
          civId: meta.civId,
          reason: `${meta.tier}-tier on this map (${meta.winRate}% win rate)`,
          score: phase === "ban" ? tierScore : (tierScore - 5), // Slightly lower priority than direct counters for picking
          type: "meta",
        })
      })
    }
  }

  // Fallback to General Stats if no map specific data found or map is null
  if (!metaAdded) {
     CIVILIZATIONS.forEach(civ => {
        if (unavailableCivs.includes(civ.id)) return
        
        const stats = getGeneralCivStats(civ.id)
        if (stats && (stats.tier === 'S' || stats.tier === 'A' || (phase === 'pick' && stats.tier === 'B'))) {
            const tierScore = { S: 90, A: 80, B: 60, C: 45, D: 30 }[stats.tier as any] || 50
            suggestions.push({
                civId: civ.id,
                reason: `Generally strong (${stats.tier}-tier, ~${stats.winRate}% WR)`,
                score: phase === "ban" ? tierScore : (tierScore - 5),
                type: "meta"
            })
        }
     })
  }

  // COUNTER SUGGESTIONS (Only for Picks or if we want to ban counters to our potential picks?)
  // Currently logic suggests banning counters to opponent? No, current logic suggests picks based on counter.
  // "phase" argument controls if we are banning or picking.
  
  if (phase === "pick") {
    // Add counter-pick suggestions against opponent
    opponentCivs.forEach((oppCiv) => {
      CIV_MATCHUPS.forEach((matchup) => {
        if (matchup.opponentCivId === oppCiv) {
          if (
            (matchup.advantage === "strong" || matchup.advantage === "slight") &&
            !unavailableCivs.includes(matchup.civId)
          ) {
            const counterScore = matchup.advantage === "strong" ? 85 : 70
            suggestions.push({
              civId: matchup.civId,
              reason: `Counters ${oppCiv} (${matchup.winRate}% win rate)`,
              score: counterScore,
              type: "counter",
            })
          }
        } else if (matchup.civId === oppCiv) {
          if (
            (matchup.advantage === "weak" || matchup.advantage === "slight_disadvantage") &&
            !unavailableCivs.includes(matchup.opponentCivId)
          ) {
            const counterScore = matchup.advantage === "weak" ? 85 : 70
            suggestions.push({
              civId: matchup.opponentCivId,
              reason: `Counters ${oppCiv} (${100 - matchup.winRate}% win rate)`,
              score: counterScore,
              type: "counter",
            })
          }
        }
      })
    })
  } else if (phase === "ban") {
      // Suggest banning civs that counter ME? 
      // Or suggest banning civs that are strong on map (already done in meta).
      // Or suggest banning civs that are strong against my potential picks? (Complex)
      // For now, simple ban suggestions (Meta) are enough.
  }

  // Remove duplicates and sort by score
  const uniqueSuggestions = suggestions.reduce((acc, curr) => {
    const existing = acc.find((s) => s.civId === curr.civId)
    if (!existing || existing.score < curr.score) {
      return [...acc.filter((s) => s.civId !== curr.civId), curr]
    }
    return acc
  }, [] as CivSuggestion[])

  return uniqueSuggestions.sort((a, b) => b.score - a.score).slice(0, 6)
}
