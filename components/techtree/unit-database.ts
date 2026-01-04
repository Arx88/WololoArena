export const UNIT_DATABASE: Record<string, any> = {
  "4": {
    "name": "Arquero",
    "description": "Crear Arquero () Arquero a pie polivalente. Fuerte contra unidades a distancia. Débil contra guerrilleros, líneas de mangoneles y unidades a corta distancia. Mejoras: ataque, alcance, armadura (herrero); ataque, precisión (universidad); precisión, a ballestero (galería de tiro con arco); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 30,
    "attack": 4,
    "cost": {
      "Gold": 45,
      "Wood": 25
    },
    "trainTime": 35,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 3,
        "class": "Muros y puertas"
      },
      {
        "amount": 4,
        "class": "Unidades base"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "5": {
    "name": "Artillero manual",
    "description": "Crear artillero manual () Artillero a pie con un ataque potente pero impreciso a larga distancia. Excepcionalmente fuerte contra infantería. Débil contra soldados a distancia. Mejoras: armadura (herrero); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 40,
    "attack": 17,
    "cost": {
      "Food": 45,
      "Gold": 50
    },
    "trainTime": 34,
    "reloadTime": 3.45,
    "advancedAttacks": [
      {
        "amount": 1,
        "class": "Muros y puertas"
      },
      {
        "amount": 10,
        "class": "Infantería"
      },
      {
        "amount": 17,
        "class": "Unidades base"
      },
      {
        "amount": 2,
        "class": "Clase 17"
      }
    ],
    "advancedArmors": [
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Clase 23"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "6": {
    "name": "Hostigador de élite",
    "description": "Crear guerrillero de élite () Guerrillero antiarqueros que no puede atacar a corta distancia. Fuerte contra los soldados a distancia y la línea de lanceros. Débil contra unidades a corta distancia. Mejoras: ataque, alcance, armadura (herrero); ataque, precisión (universidad); a guerrillero imperial (galería de tiro con arco); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 35,
    "attack": 3,
    "cost": {
      "Food": 25,
      "Wood": 35
    },
    "trainTime": 22,
    "reloadTime": 3,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Monjes"
      },
      {
        "amount": 4,
        "class": "Muros y puertas"
      },
      {
        "amount": 4,
        "class": "Embarcaciones"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 4,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 38"
      }
    ]
  },
  "7": {
    "name": "Hostigador",
    "description": "Crear guerrillero () Hostigador antiarqueros que no puede atacar a corta distancia. Fuerte contra soldados a distancia y línea de lanceros. Débil contra unidades a corta distancia. Mejoras: ataque, alcance, armadura (herrero); ataque, precisión (universidad); a guerrillero de élite (galería de tiro con arco); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 30,
    "attack": 2,
    "cost": {
      "Food": 25,
      "Wood": 35
    },
    "trainTime": 26,
    "reloadTime": 3,
    "advancedAttacks": [
      {
        "amount": 3,
        "class": "Muros y puertas"
      },
      {
        "amount": 3,
        "class": "Embarcaciones"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 38"
      }
    ]
  },
  "8": {
    "name": "Arquero con arco largo",
    "description": "Crear arquero de tiro largo () Arquero a pie exclusivo de los ingleses con un alcance excepcional. Fuerte contra infantería. Débil contra caballería y guerrilleros.  Mejoras: ataque, alcance, armadura (herrero); ataque, precisión (universidad); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 35,
    "attack": 6,
    "cost": {
      "Gold": 40,
      "Wood": 35
    },
    "trainTime": 18,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Muros y puertas"
      },
      {
        "amount": 6,
        "class": "Unidades base"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "11": {
    "name": "Mangudai",
    "description": "Crear mangudai () Arquero de caballería único de los mongoles con ataque rápido. Fuerte contra armas de asedio e infantería. Débil contra guerrilleros, línea de lanceros y jinetes de camello Mejoras: ataque, alcance, armadura (herrero); velocidad, PR (establo); precisión, armadura (galería de tiro con arco); ataque, precisión (universidad); velocidad de creación, mejorar a mangudai de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 60,
    "attack": 6,
    "cost": {
      "Gold": 65,
      "Wood": 55
    },
    "trainTime": 26,
    "reloadTime": 2.1,
    "advancedAttacks": [
      {
        "amount": 1,
        "class": "Muros y puertas"
      },
      {
        "amount": 6,
        "class": "Unidades base"
      },
      {
        "amount": 3,
        "class": "Cañones de asedio"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Monjes"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "13": {
    "name": "Pesquero",
    "description": "Construir buque de pesca () Recoge comida a partir de peces y trampas para peces. Mejoras: armadura, velocidad, eficiencia, coste, velocidad de creación (muelle); mayor resistencia a los monjes (monasterio).",
    "hp": 60,
    "attack": 0,
    "cost": {
      "Wood": 75
    },
    "trainTime": 40,
    "reloadTime": 0,
    "advancedAttacks": [],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Clase 34"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 4,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "17": {
    "name": "Barca mercante",
    "description": "Construir urca mercante () Unidad de comercio que genera oro en el muelle de otro jugador. Para comerciar, selecciona la urca mercante y luego haz clic con el botón derecho en el muelle de otro jugador. La barca regresará con oro a tu muelle. Mejoras: armadura, velocidad, coste, velocidad de creación (muelle); velocidad (mercado); mayor resistencia a los monjes (monasterio).",
    "hp": 80,
    "attack": 0,
    "cost": {
      "Gold": 50,
      "Wood": 100
    },
    "trainTime": 36,
    "reloadTime": 0,
    "advancedAttacks": [],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Clase 16"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 6,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "21": {
    "name": "Galera de guerra",
    "description": "Construir galera de guerra () Barco de guerra multiusos con ataque a distancia. Fuerte contra unidades a larga distancia. Débil contra brulotes. Mejoras: armadura, velocidad, coste, velocidad de creación, a galeón (muelle); ataque, alcance (herrero); ataque, alcance (universidad); mayor resistencia a los monjes (monasterio).",
    "hp": 135,
    "attack": 7,
    "cost": {
      "Gold": 30,
      "Wood": 90
    },
    "trainTime": 36,
    "reloadTime": 3,
    "advancedAttacks": [
      {
        "amount": 7,
        "class": "Edificios"
      },
      {
        "amount": 9,
        "class": "Clase 16"
      },
      {
        "amount": 7,
        "class": "Unidades base"
      },
      {
        "amount": 4,
        "class": "Clase 17"
      },
      {
        "amount": 9,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Clase 16"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 6,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 60"
      }
    ]
  },
  "24": {
    "name": "Ballestero",
    "description": "Crear ballestero () Arquero a pie versátil. Fuerte contra unidades a distancia. Débil contra guerrilleros, línea de mangoneles y unidades a corta distancia. Mejoras: ataque, alcance, armadura (herrero); ataque, precisión (universidad); precisión; mejorar a arbalestero (galería de tiro con arco). Velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 35,
    "attack": 5,
    "cost": {
      "Gold": 45,
      "Wood": 25
    },
    "trainTime": 27,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 3,
        "class": "Muros y puertas"
      },
      {
        "amount": 5,
        "class": "Unidades base"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "25": {
    "name": "Cab. Orden Teutónica",
    "description": "Crear caballero de la Orden Teutónica () Infantería exclusiva de los teutones con una armadura cuerpo a cuerpo excepcional. Lento pero resistente a la conversión. Fuerte contra unidades cuerpo a cuerpo. Débil contra unidades arqueras y artilleros. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación, mejorar a caballero de la Orden Teutónica de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 90,
    "attack": 14,
    "cost": {
      "Food": 85,
      "Gold": 30
    },
    "trainTime": 12,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 4,
        "class": "Clase 29"
      },
      {
        "amount": 4,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 14,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 7,
        "class": "Lanzapicas"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "36": {
    "name": "Cañón de asedio",
    "description": "Construir cañón de asedio () Unidad de pólvora de asedio de largo alcance que no puede atacar a corta distancia. Fuerte contra edificios y maquinaria de asedio. Débil contra unidades a corta distancia. Mejoras: ataque, alcance (universidad), mejorar a obús (taller de maquinaria de asedio); mayor resistencia a los monjes (monasterio).",
    "hp": 80,
    "attack": 40,
    "cost": {
      "Gold": 225,
      "Wood": 225
    },
    "trainTime": 56,
    "reloadTime": 6.5,
    "advancedAttacks": [
      {
        "amount": 200,
        "class": "Edificios"
      },
      {
        "amount": 40,
        "class": "Clase 16"
      },
      {
        "amount": 40,
        "class": "Lanzapicas"
      },
      {
        "amount": 20,
        "class": "Cañones de asedio"
      },
      {
        "amount": 40,
        "class": "Armas de asedio"
      },
      {
        "amount": 40,
        "class": "Clase 34"
      },
      {
        "amount": 40,
        "class": "Clase 37"
      }
    ],
    "advancedArmors": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 5,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 0,
        "class": "Clase 23"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "38": {
    "name": "Caballero",
    "description": "Crear Caballero () Caballería pesada poderosa y polivalente. Fuerte contra infantería y arqueros a pie. Débil contra líneas de lanceros, jinetes de camello y monjes. Mejoras: ataque, armadura (herrero); velocidad, PR, a caballero (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 100,
    "attack": 10,
    "cost": {
      "Food": 60,
      "Gold": 75
    },
    "trainTime": 30,
    "reloadTime": 1.8,
    "advancedAttacks": [
      {
        "amount": 10,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "39": {
    "name": "Arquero a caballo",
    "description": "Crear arquero a caballo () Arquero montado de gran velocidad para tácticas de ataque y retirada. Fuerte contra unidades lentas a largo alcance. Débil contra guerrilleros, escorpiones y unidades a corta distancia. Mejoras: velocidad, PR (establo); ataque, alcance, armadura (herrero); ataque, precisión (universidad); precisión, armadura; mejorar a arquero de caballería pesada (galería de tiro con arco); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 50,
    "attack": 6,
    "cost": {
      "Gold": 60,
      "Wood": 40
    },
    "trainTime": 37,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Muros y puertas"
      },
      {
        "amount": 6,
        "class": "Unidades base"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Monjes"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "40": {
    "name": "Catafracta",
    "description": "Crear catafracta () Unidad de caballería pesada exclusiva de los bizantinos. Extraordinariamente fuerte contra infantería. Débil contra unidades de arqueros.  Mejoras: ataque, armadura (herrero); velocidad, puntos de resistencia (establo); velocidad de creación, a catafracta de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 110,
    "attack": 9,
    "cost": {
      "Food": 70,
      "Gold": 75
    },
    "trainTime": 20,
    "reloadTime": 1.8,
    "advancedAttacks": [
      {
        "amount": 9,
        "class": "Infantería"
      },
      {
        "amount": 9,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 12,
        "class": "Caballería"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "41": {
    "name": "Huscarle",
    "description": "Crear huscarle () Unidad de infantería exclusiva de los godos con una armadura antiperforación excepcional. Fuerte contra soldados a distancia y edificios. Débil contra caballería y línea de milicias. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación, a huscarle de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 60,
    "attack": 10,
    "cost": {
      "Food": 75,
      "Gold": 35
    },
    "trainTime": 13,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Clase 29"
      },
      {
        "amount": 2,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 10,
        "class": "Lanzapicas"
      },
      {
        "amount": 6,
        "class": "Embarcaciones"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 6,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "42": {
    "name": "Lanzapiedras",
    "description": "Construir lanzapiedras () Poderosa arma de asedio antiedificios con un alcance excepcional. Debes compactarlo para moverlo y luego desplegarlo para atacar. No puede atacar a enemigos a corta distancia. Fuerte contra edificios. Puede dirigir sus ataques al suelo y derribar árboles. Mejoras: ataque, alcance (universidad); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 150,
    "attack": 200,
    "cost": {
      "Gold": 200,
      "Wood": 200
    },
    "trainTime": 50,
    "reloadTime": 10,
    "advancedAttacks": [
      {
        "amount": 250,
        "class": "Edificios"
      },
      {
        "amount": 200,
        "class": "Unidades base"
      }
    ],
    "advancedArmors": [
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 150,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Clase 17"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "46": {
    "name": "Jenízaro",
    "description": "Crear jenízaro () Artillero a pie exclusivo de los turcos con ataque poderoso. Fuerte contra infantería. Débil contra unidades de arqueros y guerrilleros. Mejoras: armadura (herrero); velocidad de creación, a jenízaro de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 35,
    "attack": 17,
    "cost": {
      "Food": 60,
      "Gold": 55
    },
    "trainTime": 21,
    "reloadTime": 3.45,
    "advancedAttacks": [
      {
        "amount": 17,
        "class": "Unidades base"
      },
      {
        "amount": 2,
        "class": "Clase 17"
      }
    ],
    "advancedArmors": [
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Clase 23"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "73": {
    "name": "Chu ko nu",
    "description": "Crear Chu ko nu ()  Arquero a pie exclusivo de los chinos con ataque de disparo rápido. Fuerte contra infantería. Débil contra arqueros y armas de asedio. Mejoras: ataque, alcance, armadura (herrero); precisión (galería de tiro con arco); ataque, alcance (universidad); velocidad de creación, mejorar a Chu ko nu de élite: (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 45,
    "attack": 8,
    "cost": {
      "Gold": 35,
      "Wood": 40
    },
    "trainTime": 16,
    "reloadTime": 3,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Muros y puertas"
      },
      {
        "amount": 8,
        "class": "Unidades base"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "74": {
    "name": "Milicia",
    "description": "Crear milicia () Infantería versátil. Fuerte contra edificios, infantería, caballería de exploración y guerrilleros. Débil contra soldados a larga distancia. Mejoras: ataque, armadura (herrero); velocidad, armadura antiperforación, mejorar a hombre de armas (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 40,
    "attack": 4,
    "cost": {
      "Food": 50,
      "Gold": 20
    },
    "trainTime": 21,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 4,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "75": {
    "name": "Hombre de armas",
    "description": "Crear hombre de armas () Infantería versátil. Fuerte contra edificios, infantería, caballería de exploración y guerrilleros. Débil contra soldados a larga distancia. Mejoras: ataque, armadura (herrero); velocidad, armadura antiperforación, mejorar a espadachín de espada larga (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 45,
    "attack": 6,
    "cost": {
      "Food": 50,
      "Gold": 20
    },
    "trainTime": 21,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Clase 29"
      },
      {
        "amount": 2,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 6,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "77": {
    "name": "Espad. espada larga",
    "description": "Crear espadachín de espada larga () Infantería versátil. Fuerte contra edificios, infantería, caballería de exploración y guerrilleros. Débil contra soldados a larga distancia. Mejoras: ataque, armadura (herrero); velocidad, armadura antiperforación, mejorar a espadachín de mandoble o legionario (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 60,
    "attack": 9,
    "cost": {
      "Food": 50,
      "Gold": 20
    },
    "trainTime": 21,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 6,
        "class": "Clase 29"
      },
      {
        "amount": 3,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 9,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "83": {
    "name": "Aldeano",
    "description": "Crear aldeano () Reúne recursos. Construye y repara edificios. También repara barcos y armas de asedio. Mejoras: puntos de resistencia, armadura, eficiencia (centro urbano); recolección de recursos madereros (campamento maderero); recolección de recursos de piedra y oro (campamento minero); velocidad de construcción (universidad); ataque (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 25,
    "attack": 3,
    "cost": {
      "Food": 50
    },
    "trainTime": 25,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 3,
        "class": "Edificios"
      },
      {
        "amount": 3,
        "class": "Lanzapicas"
      },
      {
        "amount": 6,
        "class": "Armas de asedio"
      },
      {
        "amount": 6,
        "class": "Clase 37"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "93": {
    "name": "Lancero",
    "description": "Crear Lancero () Infantería anticaballería. Fuerte contra unidades montadas, especialmente elefantes. Débil contra soldados a distancia e infantería. Mejoras: ataque, armadura (herrero); velocidad, a piquero (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 45,
    "attack": 3,
    "cost": {
      "Food": 35,
      "Wood": 25
    },
    "trainTime": 22,
    "reloadTime": 3,
    "advancedAttacks": [
      {
        "amount": 1,
        "class": "Clase 29"
      },
      {
        "amount": 1,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 15,
        "class": "Clase 5"
      },
      {
        "amount": 3,
        "class": "Lanzapicas"
      },
      {
        "amount": 15,
        "class": "Caballería"
      },
      {
        "amount": 9,
        "class": "Clase 16"
      },
      {
        "amount": 12,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 9,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Muros y puertas"
      },
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "125": {
    "name": "Monje",
    "description": "Crear monje () Convierte unidades enemigas a tu civilización. Cura a las unidades aliadas (excepto barcos y armas de asedio). Fuerte contra unidades lentas y sin ataque a distancia. Débil contra caballería ligera, guerreros águila y soldados a distancia. Puede recoger reliquias y llevarlas a los monasterios. Mejoras: en el monasterio.",
    "hp": 30,
    "attack": 0,
    "cost": {
      "Food": 0,
      "Gold": 100
    },
    "trainTime": 51,
    "reloadTime": 1.6,
    "advancedAttacks": [],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Clase 25"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "128": {
    "name": "Carreta de mercancías",
    "description": "Construir carreta de mercancías () Unidad de comercio que genera oro en el mercado de otro jugador. Para comerciar, selecciona la carreta de mercancías y luego haz clic con el botón derecho en el mercado de otro jugador. La carreta regresará con oro a tu mercado. Mejoras: velocidad (mercado); mayor resistencia a los monjes (monasterio).",
    "hp": 70,
    "attack": 0,
    "cost": {
      "Gold": 50,
      "Wood": 100
    },
    "trainTime": 51,
    "reloadTime": 0,
    "advancedAttacks": [],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "185": {
    "name": "Hondero",
    "description": "Crear soldado con honda () Guerrillero antiinfantería exclusivo  los incas incapaz de atacar a corta distancia. Fuerte contra infantería. Débil contra soldados a distancia y caballería. Mejoras: ataque, alcance, armadura (herrero); precisión (galería de tiro con arco); ataque, precisión (universidad); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 40,
    "attack": 4,
    "cost": {
      "Food": 40,
      "Gold": 40
    },
    "trainTime": 25,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 1,
        "class": "Muros y puertas"
      },
      {
        "amount": 4,
        "class": "Unidades base"
      },
      {
        "amount": 3,
        "class": "Clase 17"
      },
      {
        "amount": 10,
        "class": "Infantería"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "207": {
    "name": "Jinete de camello imperial",
    "description": "Crear jinete de camello imperial () Caballería anticaballería de desplazamiento rápido exclusiva de los indostanos. Fuerte contra unidades montadas. Débil contra infantería, monjes y arqueros a pie. Mejoras: ataque, armadura (herrero); velocidad, PR (establo): velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 140,
    "attack": 8,
    "cost": {
      "Food": 55,
      "Gold": 60
    },
    "trainTime": 20,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 8,
        "class": "Lanzapicas"
      },
      {
        "amount": 18,
        "class": "Caballería"
      },
      {
        "amount": 9,
        "class": "Clase 16"
      },
      {
        "amount": 9,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 7,
        "class": "Clase 35"
      },
      {
        "amount": 9,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": -3,
        "class": "Clase 39"
      }
    ]
  },
  "232": {
    "name": "Incursor azul",
    "description": "Crear incursor azul () Infantería exclusiva de los celtas con velocidad de movimiento rápida. Fuerte contra infantería y armas de asedio. Débil contra unidades arqueras y caballería. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación, mejorar a incursor azul de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 70,
    "attack": 11,
    "cost": {
      "Food": 70,
      "Gold": 25
    },
    "trainTime": 10,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Clase 29"
      },
      {
        "amount": 2,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 11,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "239": {
    "name": "Elefante de guerra",
    "description": "Crear elefante de guerra () Unidad de caballería exclusiva de los persas que inflige daño de arrollamiento. Fuerte contra edificios y unidades a corta distancia. Débil contra línea de lanceros y monjes. Mejoras: ataque, armadura (herrero); velocidad, PR (establo); velocidad de creación, mejorar a elefante de guerra de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 450,
    "attack": 15,
    "cost": {
      "Food": 170,
      "Gold": 85
    },
    "trainTime": 25,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 30,
        "class": "Edificios"
      },
      {
        "amount": 15,
        "class": "Lanzapicas"
      },
      {
        "amount": 30,
        "class": "Armas de asedio"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Clase 5"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "250": {
    "name": "Drakkar",
    "description": "Construir drakkar () Barco de guerra exclusivo de los vikingos que dispara múltiples flechas. Fuerte contra galeras incendiarias, unidades de tierra y edificios. Mejoras: armadura, velocidad, coste, velocidad de creación, mejorar a drakkar de élite (muelle); ataque, alcance (herrero); ataque, alcance (universidad); mayor resistencia a los monjes (monasterio).",
    "hp": 130,
    "attack": 7,
    "cost": {
      "Gold": 50,
      "Wood": 100
    },
    "trainTime": 25,
    "reloadTime": 3,
    "advancedAttacks": [
      {
        "amount": 7,
        "class": "Edificios"
      },
      {
        "amount": 9,
        "class": "Clase 16"
      },
      {
        "amount": 7,
        "class": "Unidades base"
      },
      {
        "amount": 4,
        "class": "Clase 17"
      },
      {
        "amount": 9,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Clase 16"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 6,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 60"
      }
    ]
  },
  "279": {
    "name": "Escorpión",
    "description": "Construir escorpión () Arma de asedio con ataque de paso a distancia, pero no puede atacar a corta distancia. Fuerte contra grupos grandes de unidades. Débil contra armas de asedio y unidades a corta distancia. Mejoras: alcance, ataque y precisión (universidad); mejorar a escorpión pesado (taller de maquinaria de asedio); mayor resistencia a los monjes (monasterio).",
    "hp": 40,
    "attack": 11,
    "cost": {
      "Gold": 75,
      "Wood": 75
    },
    "trainTime": 30,
    "reloadTime": 3.6,
    "advancedAttacks": [
      {
        "amount": 3,
        "class": "Edificios"
      },
      {
        "amount": 7,
        "class": "Clase 5"
      },
      {
        "amount": 11,
        "class": "Unidades base"
      },
      {
        "amount": 1,
        "class": "Clase 17"
      },
      {
        "amount": 1,
        "class": "Infantería"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 7,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "280": {
    "name": "Mangana",
    "description": "Construir mangonel () Arma de asedio con ataque explosivo de largo alcance que no puede atacar a corta distancia. Fuerte contra grupos compactos de unidades. Débil contra unidades a corta distancia. Puede atacar terreno. Mejoras: ataque, alcance (universidad); mejorar a onagro (taller de maquinaria de asedio); mayor resistencia a los monjes (monasterio).",
    "hp": 50,
    "attack": 40,
    "cost": {
      "Gold": 135,
      "Wood": 160
    },
    "trainTime": 46,
    "reloadTime": 6,
    "advancedAttacks": [
      {
        "amount": 35,
        "class": "Edificios"
      },
      {
        "amount": 40,
        "class": "Lanzapicas"
      },
      {
        "amount": 12,
        "class": "Cañones de asedio"
      },
      {
        "amount": 40,
        "class": "Clase 37"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 6,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "281": {
    "name": "Lanzador de hachas",
    "description": "Crear lanzador de hachas () Infantería exclusiva de los francos con ataque de tipo cuerpo a cuerpo a distancia. Fuerte contra infantería. Débil contra unidades arqueras y armas de asedio. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación, mejorar a lanzador de hachas de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 60,
    "attack": 7,
    "cost": {
      "Food": 55,
      "Gold": 25
    },
    "trainTime": 13,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 1,
        "class": "Clase 29"
      },
      {
        "amount": 1,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 7,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "282": {
    "name": "Mameluco",
    "description": "Crear mameluco ()  Unidad de caballería exclusiva de los sarracenos con ataque cuerpo a cuerpo a distancia. Fuerte contra unidades montadas. Débil contra unidades de arqueros y línea de lanceros. Mejoras: ataque, armadura (herrero); velocidad, puntos de resistencia (establo); velocidad de creación, a mameluco de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 80,
    "attack": 8,
    "cost": {
      "Food": 55,
      "Gold": 85
    },
    "trainTime": 23,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 8,
        "class": "Lanzapicas"
      },
      {
        "amount": 9,
        "class": "Caballería"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Clase 35"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": -3,
        "class": "Clase 39"
      }
    ]
  },
  "283": {
    "name": "Caballero",
    "description": "Crear caballero () Caballería pesada poderosa y polivalente. Fuerte contra infantería y arqueros a pie. Débil contra línea de lanceros, jinetes de camello y monjes. Mejoras: ataque, armadura (herrero); velocidad, PR, a paladín o savar (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 120,
    "attack": 12,
    "cost": {
      "Food": 60,
      "Gold": 75
    },
    "trainTime": 30,
    "reloadTime": 1.8,
    "advancedAttacks": [
      {
        "amount": 12,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "291": {
    "name": "Samurai",
    "description": "Crear samurái () Infantería exclusiva de los japoneses que entra en combate rápidamente y que tiene un ataque rápido. Fuerte contra unidades exclusivas. Débil contra unidades de arqueros y artilleros. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación, mejorar a samurái de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 70,
    "attack": 10,
    "cost": {
      "Food": 45,
      "Gold": 30
    },
    "trainTime": 9,
    "reloadTime": 1.9,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Clase 29"
      },
      {
        "amount": 2,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 10,
        "class": "Lanzapicas"
      },
      {
        "amount": 10,
        "class": "Unidades únicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "329": {
    "name": "Jinete de camello",
    "description": "Crear jinete de camello () Caballería anticaballería de desplazamiento rápido. Fuerte contra unidades montadas. Débil contra infantería, monjes y arqueros a pie. Mejoras: ataque, armadura (herrero); velocidad, PR, a jinete de camello pesado: velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 100,
    "attack": 6,
    "cost": {
      "Food": 55,
      "Gold": 60
    },
    "trainTime": 22,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 6,
        "class": "Lanzapicas"
      },
      {
        "amount": 9,
        "class": "Caballería"
      },
      {
        "amount": 5,
        "class": "Clase 16"
      },
      {
        "amount": 5,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 5,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": -3,
        "class": "Clase 39"
      }
    ]
  },
  "330": {
    "name": "Jinete de camello pesado",
    "description": "Crear jinete de camello pesado () Caballería anticaballería de desplazamiento rápido. Fuerte contra unidades montadas. Débil contra infantería, monjes y arqueros a pie. Mejoras: ataque, armadura (herrero); velocidad, PR, a jinete de camello imperial (establo): velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 120,
    "attack": 7,
    "cost": {
      "Food": 55,
      "Gold": 60
    },
    "trainTime": 22,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 7,
        "class": "Lanzapicas"
      },
      {
        "amount": 18,
        "class": "Caballería"
      },
      {
        "amount": 9,
        "class": "Clase 16"
      },
      {
        "amount": 9,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 7,
        "class": "Clase 35"
      },
      {
        "amount": 9,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": -3,
        "class": "Clase 39"
      }
    ]
  },
  "331": {
    "name": "Lanzapiedras",
    "description": "Construir lanzapiedras () Poderosa arma de asedio antiedificios con un alcance excepcional. Debes compactarlo para moverlo y luego desplegarlo para atacar. No puede atacar a enemigos a corta distancia. Fuerte contra edificios. Puede dirigir sus ataques al suelo y derribar árboles. Mejoras: ataque, alcance (universidad); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 150,
    "attack": 200,
    "cost": {
      "Gold": 200,
      "Wood": 200
    },
    "trainTime": 50,
    "reloadTime": 10,
    "advancedAttacks": [
      {
        "amount": 250,
        "class": "Edificios"
      },
      {
        "amount": 200,
        "class": "Unidades base"
      }
    ],
    "advancedArmors": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 8,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "358": {
    "name": "Piquero",
    "description": "Crear piquero () Infantería anticaballería. Fuerte contra unidades montadas, especialmente elefantes. Débil contra soldados a distancia e infantería. Mejoras: ataque, armadura (herrero); velocidad, a alabardero (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 55,
    "attack": 4,
    "cost": {
      "Food": 35,
      "Wood": 25
    },
    "trainTime": 22,
    "reloadTime": 3,
    "advancedAttacks": [
      {
        "amount": 1,
        "class": "Clase 29"
      },
      {
        "amount": 1,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 25,
        "class": "Clase 5"
      },
      {
        "amount": 4,
        "class": "Lanzapicas"
      },
      {
        "amount": 22,
        "class": "Caballería"
      },
      {
        "amount": 16,
        "class": "Clase 16"
      },
      {
        "amount": 18,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 7,
        "class": "Clase 35"
      },
      {
        "amount": 16,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Muros y puertas"
      },
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "359": {
    "name": "Alabardero",
    "description": "Crear alabardero () Infantería anticaballería. Fuerte contra unidades montadas, especialmente elefantes. Débil contra soldados a distancia e infantería. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 60,
    "attack": 6,
    "cost": {
      "Food": 35,
      "Wood": 25
    },
    "trainTime": 22,
    "reloadTime": 3,
    "advancedAttacks": [
      {
        "amount": 1,
        "class": "Clase 29"
      },
      {
        "amount": 1,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 28,
        "class": "Clase 5"
      },
      {
        "amount": 6,
        "class": "Lanzapicas"
      },
      {
        "amount": 32,
        "class": "Caballería"
      },
      {
        "amount": 17,
        "class": "Clase 16"
      },
      {
        "amount": 26,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 7,
        "class": "Clase 35"
      },
      {
        "amount": 17,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Muros y puertas"
      },
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "420": {
    "name": "Galeón artillado",
    "description": "Construir galeón artillado () Barco de guerra de asedio de pólvora antiedificios con largo alcance, aunque no puede atacar a enemigos a corta distancia. Fuerte contra edificios. Débil contra unidades a corta distancia. Mejoras: armadura, velocidad, coste, velocidad de creación, mejorar a galeón artillado de élite (muelle); ataque, alcance (universidad); mayor resistencia a los monjes (monasterio).",
    "hp": 120,
    "attack": 50,
    "cost": {
      "Gold": 150,
      "Wood": 200
    },
    "trainTime": 46,
    "reloadTime": 10,
    "advancedAttacks": [
      {
        "amount": 200,
        "class": "Edificios"
      },
      {
        "amount": 50,
        "class": "Lanzapicas"
      },
      {
        "amount": 25,
        "class": "Cañones de asedio"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Clase 16"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 6,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Clase 23"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 60"
      }
    ]
  },
  "422": {
    "name": "Ariete cubierto",
    "description": "Construir ariete cubierto () Arma de asedio antiedificios. Resistente a la mayoría de ataques a distancia. Excepcionalmente fuerte contra edificios. Débil contra unidades cuerpo a cuerpo. Los monjes enemigos no pueden convertirlo desde la distancia. Aumenta la velocidad y el ataque de la infantería guarnecida. Mejoras: ataque (universidad); a ariete de asedio (taller de maquinaria de asedio); mayor resistencia a los monjes (monasterio).",
    "hp": 200,
    "attack": 3,
    "cost": {
      "Gold": 75,
      "Wood": 160
    },
    "trainTime": 36,
    "reloadTime": 5,
    "advancedAttacks": [
      {
        "amount": 160,
        "class": "Edificios"
      },
      {
        "amount": 3,
        "class": "Lanzapicas"
      },
      {
        "amount": 50,
        "class": "Cañones de asedio"
      }
    ],
    "advancedArmors": [
      {
        "amount": -2,
        "class": "Lanzapicas"
      },
      {
        "amount": 190,
        "class": "Unidades base"
      },
      {
        "amount": 1,
        "class": "Clase 17"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "440": {
    "name": "Petardo",
    "description": "Crear petardo () Unidad de asedio de demolición armada con explosivos. Fuerte contra edificios. Débil contra otras unidades. Se autodestruye al usarse. Mejoras: ataque (universidad); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 50,
    "attack": 25,
    "cost": {
      "Food": 65,
      "Gold": 20
    },
    "trainTime": 25,
    "reloadTime": 0,
    "advancedAttacks": [
      {
        "amount": 100,
        "class": "Clase 26"
      },
      {
        "amount": 500,
        "class": "Edificios"
      },
      {
        "amount": 25,
        "class": "Lanzapicas"
      },
      {
        "amount": 60,
        "class": "Cañones de asedio"
      },
      {
        "amount": 900,
        "class": "Clase 22"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "441": {
    "name": "Húsar",
    "description": "Crear húsar () Jinete rápido y ligero para explorar y realizar incursiones. Resistente a la conversión. Excepcionalmente fuerte contra las unidades del monasterio. Débil contra lanceros y jinetes de camello. Mejoras: ataque, armadura (herrero); velocidad, puntos de resistencia (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 75,
    "attack": 7,
    "cost": {
      "Food": 80
    },
    "trainTime": 30,
    "reloadTime": 1.9,
    "advancedAttacks": [
      {
        "amount": 12,
        "class": "Clase 25"
      },
      {
        "amount": 7,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "442": {
    "name": "Galeón",
    "description": "Construir galeón () Barco de guerra multiusos con ataque a distancia. Fuerte contra unidades a largo alcance. Débil contra brulotes. Mejoras: armadura, velocidad, coste, velocidad de creación (muelle); ataque, alcance (herrero); ataque, alcance (universidad); mayor resistencia a los monjes (monasterio).",
    "hp": 165,
    "attack": 8,
    "cost": {
      "Gold": 30,
      "Wood": 90
    },
    "trainTime": 36,
    "reloadTime": 3,
    "advancedAttacks": [
      {
        "amount": 8,
        "class": "Edificios"
      },
      {
        "amount": 11,
        "class": "Clase 16"
      },
      {
        "amount": 8,
        "class": "Unidades base"
      },
      {
        "amount": 4,
        "class": "Clase 17"
      },
      {
        "amount": 11,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Clase 16"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 8,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 60"
      }
    ]
  },
  "448": {
    "name": "Cab. de exploración",
    "description": "Crear caballería de exploración () Jinete ligero de desplazamiento rápido para explorar y saquear. Resistente a la conversión. Excepcionalmente fuerte contra unidades del monasterio. Débil contra línea de lanceros y jinetes de camello. Mejoras: ataque, armadura (herrero); velocidad, PR, a caballería ligera (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 45,
    "attack": 3,
    "cost": {
      "Food": 80
    },
    "trainTime": 30,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 6,
        "class": "Clase 25"
      },
      {
        "amount": 3,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "473": {
    "name": "Espad. de mandoble",
    "description": "Crear soldado con espada a dos manos () Infantería versátil. Fuerte contra edificios, infantería, caballería de exploración y línea de guerrilleros. Débil contra soldados a larga distancia. Mejoras: ataque, armadura (herrero); velocidad, armadura antiperforación, a campeón (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 65,
    "attack": 12,
    "cost": {
      "Food": 50,
      "Gold": 20
    },
    "trainTime": 21,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 8,
        "class": "Clase 29"
      },
      {
        "amount": 4,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 12,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "474": {
    "name": "Cab. pesada de arq.",
    "description": "Crear arquero de caballería pesada () Arquero montado de desplazamiento rápido para tácticas de ataque y retirada. Fuerte contra unidades lentas a larga distancia. Débil contra guerrilleros, escorpiones y unidades a corta distancia. Mejoras: ataque, alcance, armadura (herrero); precisión, armadura (galería de tiro con arco); ataque, precisión (universidad); velocidad, PR (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 60,
    "attack": 7,
    "cost": {
      "Gold": 60,
      "Wood": 40
    },
    "trainTime": 30,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 4,
        "class": "Muros y puertas"
      },
      {
        "amount": 7,
        "class": "Unidades base"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Monjes"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "492": {
    "name": "Arbalestero",
    "description": "Crear arbalestero () Arquero a pie versátil. Fuerte contra unidades a larga distancia. Débil contra guerrilleros, línea de mangoneles y unidades a corta distancia. Mejoras: ataque, alcance, armadura (herrero); precisión (galería de tiro con arco); ataque, precisión (universidad); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 40,
    "attack": 6,
    "cost": {
      "Gold": 45,
      "Wood": 25
    },
    "trainTime": 27,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 3,
        "class": "Muros y puertas"
      },
      {
        "amount": 6,
        "class": "Unidades base"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "527": {
    "name": "Buque de demolición",
    "description": "Construir barco de demolición () Barco de guerra de demolición armado con explosivos que se autodestruye cuando se usa. Fuerte contra galeras incendiarias y edificios. Mejoras: armadura, velocidad, coste, velocidad de creación, mejorar a barco de demolición pesado (muelle); ataque (universidad); mayor resistencia a los monjes (monasterio).",
    "hp": 60,
    "attack": 110,
    "cost": {
      "Gold": 50,
      "Wood": 70
    },
    "trainTime": 31,
    "reloadTime": 0,
    "advancedAttacks": [
      {
        "amount": 220,
        "class": "Edificios"
      },
      {
        "amount": 110,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 3,
        "class": "Clase 16"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "528": {
    "name": "Buque dem. pesado",
    "description": "Construir barco de demolición pesado () Barco de guerra de demolición armado con explosivos que se autodestruye cuando se usa. Fuerte contra brulotes y edificios. Mejoras: armadura, velocidad, coste, velocidad de creación (muelle); ataque (universidad); mayor resistencia a los monjes (monasterio).",
    "hp": 70,
    "attack": 140,
    "cost": {
      "Gold": 50,
      "Wood": 70
    },
    "trainTime": 31,
    "reloadTime": 0,
    "advancedAttacks": [
      {
        "amount": 280,
        "class": "Edificios"
      },
      {
        "amount": 140,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 5,
        "class": "Clase 16"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 5,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "529": {
    "name": "Barco incendiario",
    "description": "Construir brulote () Barco de guerra que lanza fuego a corta distancia. Fuerte contra línea de galeras. Débil contra barcos de demolición. Mejoras: armadura, velocidad, coste, velocidad de creación, mejorar a brulote rápido o barco dragón (muelle); mayor resistencia a los monjes (monasterio).",
    "hp": 120,
    "attack": 2,
    "cost": {
      "Gold": 45,
      "Wood": 75
    },
    "trainTime": 36,
    "reloadTime": 0.25,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Edificios"
      },
      {
        "amount": 3,
        "class": "Clase 16"
      },
      {
        "amount": 2,
        "class": "Arqueros"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 3,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 6,
        "class": "Clase 16"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 6,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "530": {
    "name": "Arq. tiro largo élite",
    "description": "Crear arquero de tiro largo de élite () Arquero a pie exclusivo inglés con un alcance excepcional. Fuerte contra infantería. Débil contra caballería y guerrilleros.  Mejoras: ataque, alcance, armadura (herrero); ataque, precisión (universidad); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 40,
    "attack": 7,
    "cost": {
      "Gold": 40,
      "Wood": 35
    },
    "trainTime": 18,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Muros y puertas"
      },
      {
        "amount": 7,
        "class": "Unidades base"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "531": {
    "name": "Lanzador hachas élite",
    "description": "Crear lanzador de hachas de élite () Infantería exclusiva de los francos con ataque de tipo cuerpo a cuerpo a distancia. Fuerte contra infantería. Débil contra unidades arqueras y armas de asedio. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 70,
    "attack": 8,
    "cost": {
      "Food": 55,
      "Gold": 25
    },
    "trainTime": 13,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Clase 29"
      },
      {
        "amount": 2,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 8,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "532": {
    "name": "Barco incendiario rápido",
    "description": "Construir brulote rápido () Barco de guerra que lanza fuego a corta distancia. Fuerte contra línea de galeras. Débil contra barcos de demolición. Mejoras: armadura, velocidad, coste, velocidad de creación (muelle); mayor resistencia a los monjes (monasterio).",
    "hp": 140,
    "attack": 3,
    "cost": {
      "Gold": 45,
      "Wood": 75
    },
    "trainTime": 36,
    "reloadTime": 0.25,
    "advancedAttacks": [
      {
        "amount": 3,
        "class": "Edificios"
      },
      {
        "amount": 4,
        "class": "Clase 16"
      },
      {
        "amount": 3,
        "class": "Arqueros"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 4,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 9,
        "class": "Clase 16"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 8,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "533": {
    "name": "Drakkar de élite",
    "description": "Construir drakkar de élite () Barco de guerra exclusivo de los vikingos que dispara múltiples flechas. Fuerte contra galeras de fuego, unidades terrestres y edificios. Mejoras: armadura, velocidad, coste, velocidad de creación (muelle); ataque, alcance (herrero); ataque, alcance (universidad); mayor resistencia a los monjes (monasterio).",
    "hp": 160,
    "attack": 8,
    "cost": {
      "Gold": 50,
      "Wood": 100
    },
    "trainTime": 25,
    "reloadTime": 3,
    "advancedAttacks": [
      {
        "amount": 7,
        "class": "Edificios"
      },
      {
        "amount": 10,
        "class": "Clase 16"
      },
      {
        "amount": 8,
        "class": "Unidades base"
      },
      {
        "amount": 4,
        "class": "Clase 17"
      },
      {
        "amount": 10,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Clase 16"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 8,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 60"
      }
    ]
  },
  "534": {
    "name": "Incursor azul de élite",
    "description": "Crear incursor azul de élite () Infantería exclusiva de los celtas con velocidad de movimiento rápida. Fuerte contra infantería y armas de asedio. Débil contra unidades arqueras y caballería. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 85,
    "attack": 15,
    "cost": {
      "Food": 70,
      "Gold": 25
    },
    "trainTime": 10,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 3,
        "class": "Clase 29"
      },
      {
        "amount": 3,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 15,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "539": {
    "name": "Galera",
    "description": "Construir galera () Buque de guerra versátil con ataque a distancia. Fuerte contra unidades a larga distancia. Débil contra brulotes. Mejoras: armadura, velocidad, coste, velocidad de creación, mejorar a galera de guerra (muelle); ataque, alcance (herrero); ataque, alcance (universidad); mayor resistencia a los monjes (monasterio).",
    "hp": 120,
    "attack": 6,
    "cost": {
      "Gold": 30,
      "Wood": 90
    },
    "trainTime": 60,
    "reloadTime": 3,
    "advancedAttacks": [
      {
        "amount": 6,
        "class": "Edificios"
      },
      {
        "amount": 8,
        "class": "Clase 16"
      },
      {
        "amount": 6,
        "class": "Unidades base"
      },
      {
        "amount": 3,
        "class": "Clase 17"
      },
      {
        "amount": 8,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Clase 16"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 6,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 60"
      }
    ]
  },
  "542": {
    "name": "Escorpión pesado",
    "description": "Construir escorpión pesado () Arma de asedio con ataque de paso a distancia, pero no puede atacar a corta distancia. Fuerte contra grupos grandes de unidades. Débil contra armas de asedio y unidades a corta distancia. Mejoras: alcance, ataque y precisión (universidad); mayor resistencia a los monjes (monasterio).",
    "hp": 60,
    "attack": 14,
    "cost": {
      "Gold": 75,
      "Wood": 75
    },
    "trainTime": 30,
    "reloadTime": 3.6,
    "advancedAttacks": [
      {
        "amount": 6,
        "class": "Edificios"
      },
      {
        "amount": 10,
        "class": "Clase 5"
      },
      {
        "amount": 14,
        "class": "Unidades base"
      },
      {
        "amount": 2,
        "class": "Clase 17"
      },
      {
        "amount": 2,
        "class": "Infantería"
      }
    ],
    "advancedArmors": [
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 8,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "545": {
    "name": "Barco transporte",
    "description": "Construir barco de transporte () Se usa para mover unidades por el agua. Selecciona las unidades que quieras transportar y luego haz clic con el botón derecho en el barco de transporte para que suban a bordo. Usa el botón de descargar para que las unidades bajen a tierra. Mejoras: armadura, velocidad, coste, velocidad de creación (muelle); mayor resistencia a los monjes (monasterio).",
    "hp": 100,
    "attack": 0,
    "cost": {
      "Wood": 125
    },
    "trainTime": 46,
    "reloadTime": 0,
    "advancedAttacks": [],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Clase 16"
      },
      {
        "amount": 4,
        "class": "Lanzapicas"
      },
      {
        "amount": 8,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "546": {
    "name": "Caballería ligera",
    "description": "Crear caballería ligera () Jinete rápido y ligero para explorar y realizar incursiones. Resistente a la conversión. Excepcionalmente fuerte contra las unidades monásticas. Débil contra lanceros y jinetes de camello. Mejoras: ataque, armadura (herrero); velocidad, PR. Mejorar a húsar o húsar alado (establos); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 60,
    "attack": 7,
    "cost": {
      "Food": 80
    },
    "trainTime": 30,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 10,
        "class": "Clase 25"
      },
      {
        "amount": 7,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "548": {
    "name": "Ariete de asedio",
    "description": "Construir ariete de asedio () Arma de asedio antiedificios. Resistente a la mayoría de ataques a distancia. Excepcionalmente fuerte contra los edificios. Débil contra las unidades cuerpo a cuerpo. Los monjes enemigos no pueden convertirla desde la distancia. La infantería guarnecida aumenta la velocidad. Mejoras: ataque (universidad); mayor resistencia a los monjes (monasterio).",
    "hp": 270,
    "attack": 4,
    "cost": {
      "Gold": 75,
      "Wood": 160
    },
    "trainTime": 36,
    "reloadTime": 5,
    "advancedAttacks": [
      {
        "amount": 200,
        "class": "Edificios"
      },
      {
        "amount": 4,
        "class": "Lanzapicas"
      },
      {
        "amount": 65,
        "class": "Cañones de asedio"
      }
    ],
    "advancedArmors": [
      {
        "amount": -1,
        "class": "Lanzapicas"
      },
      {
        "amount": 195,
        "class": "Unidades base"
      },
      {
        "amount": 2,
        "class": "Clase 17"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "550": {
    "name": "Onagro",
    "description": "Construir onagro () Arma de asedio con ataque explosivo de largo alcance que no puede atacar a corta distancia. Fuerte contra grupos compactos de unidades. Débil contra unidades a corta distancia. Puede atacar terreno y derribar árboles. Mejoras: ataque, alcance (universidad); mejorar a onagro de asedio (taller de maquinaria de asedio); mayor resistencia los monjes (monasterio).",
    "hp": 60,
    "attack": 50,
    "cost": {
      "Gold": 135,
      "Wood": 160
    },
    "trainTime": 46,
    "reloadTime": 6,
    "advancedAttacks": [
      {
        "amount": 45,
        "class": "Edificios"
      },
      {
        "amount": 50,
        "class": "Lanzapicas"
      },
      {
        "amount": 12,
        "class": "Cañones de asedio"
      },
      {
        "amount": 50,
        "class": "Clase 37"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 7,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "553": {
    "name": "Catafracta de élite",
    "description": "Crear catafracta de élite () Unidad de caballería pesada bizantina. Excepcionalmente fuerte contra infantería. Débil contra las unidades arqueras. Mejoras: ataque, armadura (herrero); velocidad, PR (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 150,
    "attack": 12,
    "cost": {
      "Food": 70,
      "Gold": 75
    },
    "trainTime": 20,
    "reloadTime": 1.7,
    "advancedAttacks": [
      {
        "amount": 12,
        "class": "Infantería"
      },
      {
        "amount": 12,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 16,
        "class": "Caballería"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "554": {
    "name": "Cab O. Teutónica élite",
    "description": "Crear caballero de la Orden Teutónica de élite () Infantería exclusiva de los teutones con armadura cuerpo a cuerpo excepcional. Lento, pero resistente a la conversión. Fuerte contra unidades cuerpo a cuerpo. Débil contra unidades arqueras y artilleros. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 110,
    "attack": 17,
    "cost": {
      "Food": 85,
      "Gold": 30
    },
    "trainTime": 12,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 4,
        "class": "Clase 29"
      },
      {
        "amount": 4,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 17,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 10,
        "class": "Lanzapicas"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "555": {
    "name": "Huscarle de élite",
    "description": "Crear huscarle de élite () Infantería exclusiva goda con una armadura antiperforación excepcional. Fuerte contra soldados a distancia y edificios. Débil contra caballería y líneas de milicia. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 70,
    "attack": 12,
    "cost": {
      "Food": 75,
      "Gold": 35
    },
    "trainTime": 13,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 3,
        "class": "Clase 29"
      },
      {
        "amount": 3,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 12,
        "class": "Lanzapicas"
      },
      {
        "amount": 10,
        "class": "Embarcaciones"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 8,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "556": {
    "name": "Mameluco de élite",
    "description": "Crear mameluco de élite () Unidad de caballería de los sarracenos. Fuerte contra las unidades montadas. Débil contra las unidades arqueras y los lanceros. Mejoras: ataque, armadura (herrero); velocidad, PR (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 80,
    "attack": 10,
    "cost": {
      "Food": 55,
      "Gold": 85
    },
    "trainTime": 23,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 10,
        "class": "Lanzapicas"
      },
      {
        "amount": 12,
        "class": "Caballería"
      }
    ],
    "advancedArmors": [
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Clase 35"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": -3,
        "class": "Clase 39"
      }
    ]
  },
  "557": {
    "name": "Jenízaro de élite",
    "description": "Crear jenízaro de élite () Artillero a pie exclusivo turco con un ataque muy potente. Fuerte contra infantería. Débil contra las unidades arqueras y los guerrilleros. Mejoras: armadura (herrero); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 40,
    "attack": 22,
    "cost": {
      "Food": 60,
      "Gold": 55
    },
    "trainTime": 21,
    "reloadTime": 3.45,
    "advancedAttacks": [
      {
        "amount": 22,
        "class": "Unidades base"
      },
      {
        "amount": 3,
        "class": "Clase 17"
      }
    ],
    "advancedArmors": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Clase 23"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "558": {
    "name": "Elefante guerra élite",
    "description": "Crear elefante de guerra de élite () Unidad de caballería exclusiva persa que inflige daño de arrollamiento. Fuerte contra edificios y unidades a corta distancia. Débil contra lanceros y monjes. Mejoras: ataque, armadura (herrero); velocidad, PR (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 600,
    "attack": 20,
    "cost": {
      "Food": 170,
      "Gold": 85
    },
    "trainTime": 25,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 30,
        "class": "Edificios"
      },
      {
        "amount": 20,
        "class": "Lanzapicas"
      },
      {
        "amount": 30,
        "class": "Armas de asedio"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Clase 5"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "559": {
    "name": "Chu ko nu de élite",
    "description": "Crear Chu Ko Nu de élite () Arquero a pie exclusivo chino con ataque de disparo rápido. Fuerte contra infantería. Débil contra unidades arqueras y armas de asedio. Mejoras: ataque, alcance, armadura (herrero); precisión (galería de tiro con arco); ataque, alcance (universidad); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 50,
    "attack": 10,
    "cost": {
      "Gold": 35,
      "Wood": 40
    },
    "trainTime": 13,
    "reloadTime": 3,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Muros y puertas"
      },
      {
        "amount": 10,
        "class": "Unidades base"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "560": {
    "name": "Samurai de élite",
    "description": "Crear samurái de élite () Infantería exclusiva de los japoneses que entra en combate rápidamente y que tiene ataque rápido. Fuerte contra unidades exclusivas. Débil contra unidades arqueras y artilleros. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 80,
    "attack": 12,
    "cost": {
      "Food": 45,
      "Gold": 30
    },
    "trainTime": 9,
    "reloadTime": 1.9,
    "advancedAttacks": [
      {
        "amount": 3,
        "class": "Clase 29"
      },
      {
        "amount": 3,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 12,
        "class": "Lanzapicas"
      },
      {
        "amount": 12,
        "class": "Unidades únicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "561": {
    "name": "Mangudai de élite",
    "description": "Crear magudai de élite () Arquero montado exclusivo de los mongoles con ataque rápido. Fuerte contra armas de asedio e infantería. Débil contra guerrilleros, lanceros y jinetes a camello. Mejoras: ataque, alcance, armadura (herrero); velocidad, PR (establo); precisión, armadura (galería de tiro con arco); ataque, precisión (universidad); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 60,
    "attack": 8,
    "cost": {
      "Gold": 65,
      "Wood": 55
    },
    "trainTime": 26,
    "reloadTime": 2.1,
    "advancedAttacks": [
      {
        "amount": 1,
        "class": "Muros y puertas"
      },
      {
        "amount": 8,
        "class": "Unidades base"
      },
      {
        "amount": 5,
        "class": "Cañones de asedio"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Monjes"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "567": {
    "name": "Campeón",
    "description": "Crear campeón () Infantería versátil. Fuerte contra edificios, infantería, caballería de exploración y guerrilleros. Débil contra soldados a larga distancia. Mejoras: ataque, armadura (herrero); velocidad, armadura antiperforación (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 70,
    "attack": 14,
    "cost": {
      "Food": 50,
      "Gold": 20
    },
    "trainTime": 21,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 8,
        "class": "Clase 29"
      },
      {
        "amount": 4,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 14,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "569": {
    "name": "Paladín",
    "description": "Crear paladín () Caballería pesada poderosa y polivalente. Fuerte contra infantería y arqueros a pie. Débil contra líneas de lanceros, jinetes de camello y monjes. Mejoras: ataque, armadura (herrero); velocidad, PR (establo); mayor resistencia a los monjes (monasterio).",
    "hp": 160,
    "attack": 14,
    "cost": {
      "Food": 60,
      "Gold": 75
    },
    "trainTime": 30,
    "reloadTime": 1.9,
    "advancedAttacks": [
      {
        "amount": 14,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "588": {
    "name": "Onagro de asedio",
    "description": "Construir onagro de asedio () Arma de asedio con ataque explosivo de largo alcance que no puede atacar a corta distancia. Fuerte contra grupos compactos de unidades. Débil contra unidades a corta distancia. Puede atacar terreno y derribar árboles. Mejoras: ataque, alcance (universidad); mayor resistencia los monjes (monasterio).",
    "hp": 70,
    "attack": 75,
    "cost": {
      "Gold": 135,
      "Wood": 160
    },
    "trainTime": 46,
    "reloadTime": 6,
    "advancedAttacks": [
      {
        "amount": 60,
        "class": "Edificios"
      },
      {
        "amount": 75,
        "class": "Lanzapicas"
      },
      {
        "amount": 12,
        "class": "Cañones de asedio"
      },
      {
        "amount": 50,
        "class": "Clase 37"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 8,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "691": {
    "name": "Galeón artillado élite",
    "description": "Construir galeón artillado de élite () Barco de guerra de asedio de pólvora antiedificios con largo alcance, aunque no puede atacar a los enemigos a corta distancia. Fuertes contra edificios. Débil contra otras unidades a corta distancia. Mejoras: armadura, velocidad, coste, velocidad de creación (muelle); ataque, alcance (universidad); mayor resistencia a los monjes (monasterio).",
    "hp": 150,
    "attack": 60,
    "cost": {
      "Gold": 150,
      "Wood": 200
    },
    "trainTime": 46,
    "reloadTime": 10,
    "advancedAttacks": [
      {
        "amount": 275,
        "class": "Edificios"
      },
      {
        "amount": 60,
        "class": "Lanzapicas"
      },
      {
        "amount": 25,
        "class": "Cañones de asedio"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Clase 16"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 8,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Clase 23"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 60"
      }
    ]
  },
  "692": {
    "name": "Berserker",
    "description": "Crear berserker () Infantería exclusiva de los vikingos que regenera PR. Fuerte contra infantería y armas de asedio. Débil contra unidades de arqueros y artilleros. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación, a berserker de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 54,
    "attack": 12,
    "cost": {
      "Food": 65,
      "Gold": 20
    },
    "trainTime": 14,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Clase 29"
      },
      {
        "amount": 2,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 12,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "694": {
    "name": "Berserker de élite",
    "description": "Crear berserker de élite () Infantería exclusiva de los vikingos que regenera PR. Fuerte contra infantería y armas de asedio. Débil contra unidades de arqueros y artilleros. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 62,
    "attack": 14,
    "cost": {
      "Food": 65,
      "Gold": 20
    },
    "trainTime": 12,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 3,
        "class": "Clase 29"
      },
      {
        "amount": 3,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 14,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "725": {
    "name": "Guerrero jaguar",
    "description": "Crear guerrero jaguar () Unidad de infantería exclusiva de los aztecas que inflige daño adicional al derrotar unidades militares. Excepcionalmente fuerte contra infantería. Débil contra caballería y unidades de arqueros. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación, a guerrero jaguar de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 65,
    "attack": 15,
    "cost": {
      "Food": 60,
      "Gold": 30
    },
    "trainTime": 12,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Clase 29"
      },
      {
        "amount": 2,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 5,
        "class": "Infantería"
      },
      {
        "amount": 15,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "726": {
    "name": "Guerrero jaguar de élite",
    "description": "Crear guerrero jaguar de élite () Unidad de infantería exclusiva de los aztecas que inflige daño adicional al derrotar unidades militares. Excepcionalmente fuerte contra infantería. Débil contra caballería y unidades de arqueros. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 75,
    "attack": 19,
    "cost": {
      "Food": 60,
      "Gold": 30
    },
    "trainTime": 12,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Clase 29"
      },
      {
        "amount": 2,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 6,
        "class": "Infantería"
      },
      {
        "amount": 19,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "751": {
    "name": "Explorador águila",
    "description": "Crear explorador águila () Infantería de choque rápida para explorar y saquear. Resistente a la conversión. Fuerte contra unidades del monasterio y unidades de arqueros. Débil contra milicia y caballería. Mejoras: ataque, armadura (herrero); velocidad, a guerrero águila (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 50,
    "attack": 4,
    "cost": {
      "Food": 20,
      "Gold": 50
    },
    "trainTime": 50,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 8,
        "class": "Clase 25"
      },
      {
        "amount": 4,
        "class": "Lanzapicas"
      },
      {
        "amount": 3,
        "class": "Cañones de asedio"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Clase 29"
      },
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "752": {
    "name": "Guerrero águila de élite",
    "description": "Crear guerrero águila de élite () Infantería de choque rápida para explorar y saquear. Resistente a la conversión. Fuerte contra unidades del monasterio y unidades de arqueros. Débil contra milicia y caballería. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 60,
    "attack": 9,
    "cost": {
      "Food": 20,
      "Gold": 50
    },
    "trainTime": 20,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 10,
        "class": "Clase 25"
      },
      {
        "amount": 9,
        "class": "Lanzapicas"
      },
      {
        "amount": 4,
        "class": "Caballería"
      },
      {
        "amount": 2,
        "class": "Clase 16"
      },
      {
        "amount": 5,
        "class": "Cañones de asedio"
      },
      {
        "amount": 3,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 2,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Clase 29"
      },
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 4,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "753": {
    "name": "Guerrero águila",
    "description": "Crear guerrero águila () Infantería de choque rápida para explorar y saquear. Resistente a la conversión. Fuerte contra unidades del monasterio y unidades de arqueros. Débil contra milicia y caballería. Mejoras: ataque, armadura (herrero); velocidad, a guerrero águila de élite (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 55,
    "attack": 7,
    "cost": {
      "Food": 20,
      "Gold": 50
    },
    "trainTime": 35,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 8,
        "class": "Clase 25"
      },
      {
        "amount": 7,
        "class": "Lanzapicas"
      },
      {
        "amount": 3,
        "class": "Caballería"
      },
      {
        "amount": 3,
        "class": "Cañones de asedio"
      },
      {
        "amount": 1,
        "class": "Clase 16"
      },
      {
        "amount": 2,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 1,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Clase 29"
      },
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "755": {
    "name": "Tarcano",
    "description": "Crear tarcano () Caballería pesada exclusiva de los hunos. Excepcionalmente fuerte contra edificios. Débil contra línea de lanceros y jinetes a camello. Mejoras: ataque, armadura (herrero); velocidad, puntos de resistencia (establo); velocidad de creación, mejorar a tarcano de élite (castillo), mayor resistencia a los monjes (monasterio).",
    "hp": 100,
    "attack": 8,
    "cost": {
      "Food": 60,
      "Gold": 60
    },
    "trainTime": 14,
    "reloadTime": 1.9,
    "advancedAttacks": [
      {
        "amount": 10,
        "class": "Clase 26"
      },
      {
        "amount": 8,
        "class": "Edificios"
      },
      {
        "amount": 8,
        "class": "Lanzapicas"
      },
      {
        "amount": 12,
        "class": "Armas de asedio"
      },
      {
        "amount": 8,
        "class": "Clase 22"
      }
    ],
    "advancedArmors": [
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "757": {
    "name": "Tarcano de élite",
    "description": "Crear tarcano de élite () Caballería pesada exclusiva de los hunos. Excepcionalmente fuerte contra edificios. Débil contra la línea de lanceros y los jinetes de camello. Mejoras: ataque, armadura (herrero); velocidad, puntos de resistencia (establo); velocidad de creación (castillo), mayor resistencia a los monjes (monasterio).",
    "hp": 150,
    "attack": 11,
    "cost": {
      "Food": 60,
      "Gold": 60
    },
    "trainTime": 14,
    "reloadTime": 1.9,
    "advancedAttacks": [
      {
        "amount": 10,
        "class": "Clase 26"
      },
      {
        "amount": 10,
        "class": "Edificios"
      },
      {
        "amount": 11,
        "class": "Lanzapicas"
      },
      {
        "amount": 12,
        "class": "Armas de asedio"
      },
      {
        "amount": 10,
        "class": "Clase 22"
      }
    ],
    "advancedArmors": [
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 4,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "763": {
    "name": "Arquero emplumado",
    "description": "Crear arquero emplumado () Arquero a pie exclusivo de los mayas de movimiento rápido. Fuerte contra unidades de arqueros e infantería. Débil contra caballería. Mejoras: ataque, alcance, armadura (herrero); precisión (galería de tiro con arco); ataque, precisión (universidad); velocidad de creación, a arquero emplumado de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 50,
    "attack": 5,
    "cost": {
      "Gold": 55,
      "Wood": 55
    },
    "trainTime": 16,
    "reloadTime": 1.9,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Muros y puertas"
      },
      {
        "amount": 1,
        "class": "Infantería"
      },
      {
        "amount": 5,
        "class": "Unidades base"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "765": {
    "name": "Arquero emplumado",
    "description": "Crear arquero emplumado de élite () Arquero a pie exclusivo de los mayas de movimiento rápido. Fuerte contra unidades de arqueros e infantería. Débil contra caballería. Mejoras: ataque, alcance, armadura (herrero); precisión (galería de tiro con arco); ataque, precisión (universidad); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 65,
    "attack": 5,
    "cost": {
      "Gold": 55,
      "Wood": 55
    },
    "trainTime": 16,
    "reloadTime": 1.9,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Muros y puertas"
      },
      {
        "amount": 2,
        "class": "Infantería"
      },
      {
        "amount": 5,
        "class": "Unidades base"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "771": {
    "name": "Conquistador",
    "description": "Crear conquistador () Artillero montado exclusivo de los españoles de ataque potente y alta movilidad. Fuerte contra unidades a distancia. Débil contra lanceros, guerrilleros y monjes. Mejoras: armadura (herrero); velocidad, puntos de resistencia (establo); velocidad de creación, a conquistador de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 55,
    "attack": 16,
    "cost": {
      "Food": 70,
      "Gold": 60
    },
    "trainTime": 24,
    "reloadTime": 2.9,
    "advancedAttacks": [
      {
        "amount": 16,
        "class": "Unidades base"
      },
      {
        "amount": 4,
        "class": "Clase 17"
      }
    ],
    "advancedArmors": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Clase 23"
      },
      {
        "amount": 0,
        "class": "Monjes"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "773": {
    "name": "Conquistador de élite",
    "description": "Crear conquistador de élite () Artillero montado exclusivo de los españoles de ataque poderoso y alta movilidad. Fuerte contra unidades a distancia. Débil contra lanceros, guerrilleros y monjes. Mejoras: armadura (herrero); velocidad, puntos de resistencia (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 70,
    "attack": 19,
    "cost": {
      "Food": 70,
      "Gold": 60
    },
    "trainTime": 24,
    "reloadTime": 2.9,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Edificios"
      },
      {
        "amount": 19,
        "class": "Unidades base"
      },
      {
        "amount": 6,
        "class": "Clase 17"
      }
    ],
    "advancedArmors": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Clase 23"
      },
      {
        "amount": 0,
        "class": "Monjes"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "775": {
    "name": "Misionero",
    "description": "Crear misionero () Monje a caballo exclusivo de los españoles. Convierte unidades enemigas y cura unidades aliadas. Más rápido que los monjes a pie, pero con menor alcance y campo visual. Fuerte contra unidades lentas y sin ataques a distancia. Débil contra caballería ligera, guerreros águila y soldados a distancia. No puede recoger reliquias. Mejoras: en el monasterio; armadura (herrero); velocidad, puntos de resistencia (establo).",
    "hp": 30,
    "attack": 0,
    "cost": {
      "Gold": 100
    },
    "trainTime": 51,
    "reloadTime": 1.6,
    "advancedAttacks": [],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Clase 25"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "827": {
    "name": "Carreta de guerra",
    "description": "Crear carromato de guerra () Arquero montado exclusivo de los coreanos. Lento pero duradero. Fuerte contra infantería y arqueros. Débil contra línea de lanceros, guerrilleros y jinetes de camello. Mejoras: ataque, alcance, armadura (herrero); velocidad (establo); precisión (galería de tiro con arco); ataque, precisión (universidad); velocidad de creación, a carromato de guerra de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 150,
    "attack": 9,
    "cost": {
      "Gold": 60,
      "Wood": 200
    },
    "trainTime": 21,
    "reloadTime": 2.5,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 9,
        "class": "Unidades base"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": -1,
        "class": "Monjes"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "829": {
    "name": "Carreta de guerra de élite",
    "description": "Crear carromato de guerra de élite () Arquero montado exclusivo de los coreanos. Lento pero duradero. Fuerte contra infantería y arqueros. Débil contra línea de lanceros, guerrilleros y jinetes de camello. Mejoras: ataque, alcance, armadura (herrero); velocidad (establo); precisión (galería de tiro con arco); ataque, precisión (universidad); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 200,
    "attack": 9,
    "cost": {
      "Gold": 60,
      "Wood": 200
    },
    "trainTime": 21,
    "reloadTime": 2.5,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 9,
        "class": "Unidades base"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 4,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": -1,
        "class": "Monjes"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "831": {
    "name": "Barco tortuga",
    "description": "Construir barco tortuga () Barco de guerra de asedio exclusivo de los coreanos con mucha armadura y ataque. Fuerte contra la mayoría de barcos de guerra y edificios. Mejoras: armadura, velocidad, coste, velocidad de creación, mejorar a barco tortuga de élite (muelle); ataque, alcance (universidad); mayor resistencia a los monjes (monasterio).",
    "hp": 200,
    "attack": 4,
    "cost": {
      "Gold": 180,
      "Wood": 190
    },
    "trainTime": 50,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 7,
        "class": "Edificios"
      },
      {
        "amount": 4,
        "class": "Lanzapicas"
      },
      {
        "amount": 7,
        "class": "Clase 26"
      },
      {
        "amount": 6,
        "class": "Clase 22"
      }
    ],
    "advancedArmors": [
      {
        "amount": 8,
        "class": "Clase 16"
      },
      {
        "amount": 0,
        "class": "Arqueros"
      },
      {
        "amount": 6,
        "class": "Lanzapicas"
      },
      {
        "amount": 7,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Clase 23"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 60"
      }
    ]
  },
  "832": {
    "name": "Barco tortuga de élite",
    "description": "Construir barco tortuga de élite () Barco de guerra de asedio exclusivo de los coreanos con mucha armadura y ataque. Fuerte contra la mayoría de barcos de guerra y edificios. Mejoras: armadura, velocidad, coste, velocidad de creación (muelle); ataque, alcance (universidad); mayor resistencia a los monjes (monasterio).",
    "hp": 300,
    "attack": 4,
    "cost": {
      "Gold": 180,
      "Wood": 190
    },
    "trainTime": 50,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 7,
        "class": "Edificios"
      },
      {
        "amount": 4,
        "class": "Lanzapicas"
      },
      {
        "amount": 7,
        "class": "Clase 26"
      },
      {
        "amount": 6,
        "class": "Clase 22"
      },
      {
        "amount": 1,
        "class": "Clase 16"
      },
      {
        "amount": 1,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 10,
        "class": "Clase 16"
      },
      {
        "amount": 0,
        "class": "Arqueros"
      },
      {
        "amount": 8,
        "class": "Lanzapicas"
      },
      {
        "amount": 8,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Clase 23"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 60"
      }
    ]
  },
  "866": {
    "name": "Genovés ballestero",
    "description": "Crear ballestero genovés ()   Arquero a pie exclusivo de los italianos. Excepcionalmente fuerte contra caballería. Débil contra unidades de arqueros y armas de asedio. Mejoras: ataque, alcance, armadura (herrero); precisión (galería de tiro con arco); ataque, precisión (universidad); velocidad de creación, mejorar a ballestero genovés de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 45,
    "attack": 6,
    "cost": {
      "Gold": 40,
      "Wood": 45
    },
    "trainTime": 14,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 6,
        "class": "Unidades base"
      },
      {
        "amount": 5,
        "class": "Caballería"
      },
      {
        "amount": 4,
        "class": "Clase 16"
      },
      {
        "amount": 5,
        "class": "Clase 5"
      },
      {
        "amount": 4,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 4,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "868": {
    "name": "Genovés ballestero de élite",
    "description": "Crear ballestero genovés de élite ()   Arquero a pie exclusivo de los italianos. Extremadamente fuerte contra caballería. Débil contra unidades de arqueros y armas de asedio. Mejoras: ataque, alcance, armadura (herrero); precisión (galería de tiro con arco); ataque, precisión (universidad); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 50,
    "attack": 6,
    "cost": {
      "Gold": 40,
      "Wood": 45
    },
    "trainTime": 14,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 6,
        "class": "Unidades base"
      },
      {
        "amount": 7,
        "class": "Caballería"
      },
      {
        "amount": 5,
        "class": "Clase 16"
      },
      {
        "amount": 7,
        "class": "Clase 5"
      },
      {
        "amount": 6,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 5,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "869": {
    "name": "Huszár magiar",
    "description": "Crear huszár magiar () Jinete ligero exclusivo de los magiares. Fuerte contra armas de asedio. Débil contra línea de lanceros y jinetes de camello. Mejoras: ataque, armadura (herrero); velocidad, puntos de resistencia (establo); velocidad de creación, a huszár magiar de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 80,
    "attack": 10,
    "cost": {
      "Food": 35,
      "Gold": 45
    },
    "trainTime": 12,
    "reloadTime": 1.8,
    "advancedAttacks": [
      {
        "amount": 10,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Clase 17"
      },
      {
        "amount": 5,
        "class": "Cañones de asedio"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "871": {
    "name": "Huszár magiar de élite",
    "description": "Crear huszár magiar de élite () Jinete ligero exclusivo de los magiares. Fuerte contra armas de asedio. Débil contra línea de lanceros y jinetes de camello. Mejoras: ataque, armadura (herrero); velocidad, puntos de resistencia (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 90,
    "attack": 11,
    "cost": {
      "Food": 35,
      "Gold": 45
    },
    "trainTime": 12,
    "reloadTime": 1.8,
    "advancedAttacks": [
      {
        "amount": 11,
        "class": "Lanzapicas"
      },
      {
        "amount": 2,
        "class": "Clase 17"
      },
      {
        "amount": 8,
        "class": "Cañones de asedio"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "873": {
    "name": "Arquero en elefante",
    "description": "Crear arquero en elefante () Unidad lenta y pesada de arquero montado. Fuerte contra unidades de arqueros e infantería. Débil contra lanceros, guerrilleros y jinetes de camello. Mejoras: ataque, alcance, armadura (herrero); velocidad, puntos de resistencia (establo); precisión, a arquero en elefante de élite (galería de tiro con arco); ataque, precisión (universidad); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 230,
    "attack": 6,
    "cost": {
      "Food": 60,
      "Gold": 80
    },
    "trainTime": 32,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 6,
        "class": "Unidades base"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Clase 5"
      },
      {
        "amount": -4,
        "class": "Monjes"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "875": {
    "name": "Arquero en elefante de élite",
    "description": "Crear arquero en elefante de élite () Unidad lenta y pesada de arquero montado. Fuerte contra unidades de arqueros e infantería. Débil contra lanceros, guerrilleros y jinetes de camello. Mejoras: ataque, alcance, armadura (herrero); velocidad, puntos de resistencia (establo); precisión (galería de tiro con arco); ataque, precisión (universidad); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 280,
    "attack": 7,
    "cost": {
      "Food": 60,
      "Gold": 80
    },
    "trainTime": 32,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 7,
        "class": "Unidades base"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Clase 5"
      },
      {
        "amount": -4,
        "class": "Monjes"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "876": {
    "name": "Boyardo",
    "description": "Crear boyardo () Unidad de caballería exclusiva eslava con una excepcional armadura cuerpo a cuerpo. Fuerte contra unidades a corta distancia. Débil contra lanceros y monjes. Mejoras: ataque, armadura (herrero); velocidad, PR (establo); velocidad de creación. Mejorar a boyardo de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 100,
    "attack": 12,
    "cost": {
      "Food": 60,
      "Gold": 70
    },
    "trainTime": 15,
    "reloadTime": 1.9,
    "advancedAttacks": [
      {
        "amount": 12,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 4,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "878": {
    "name": "Boyardo de élite",
    "description": "Crear boyardo de élite () Unidad de caballería exclusiva eslava con una excepcional armadura cuerpo a cuerpo. Fuerte contra unidades a corta distancia. Débil contra lanceros y monjes. Mejoras: ataque, armadura (herrería); velocidad, PR (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 130,
    "attack": 14,
    "cost": {
      "Food": 60,
      "Gold": 70
    },
    "trainTime": 15,
    "reloadTime": 1.9,
    "advancedAttacks": [
      {
        "amount": 14,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 8,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "879": {
    "name": "Kamayuk",
    "description": "Crear kamayuk () Infantería exclusiva de los incas con mayor alcance de ataque. Fuerte contra caballería e infantería. Débil contra unidades de arqueros y artilleros. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación, mejorar a kamayuk de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 70,
    "attack": 7,
    "cost": {
      "Food": 60,
      "Gold": 30
    },
    "trainTime": 10,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 7,
        "class": "Lanzapicas"
      },
      {
        "amount": 8,
        "class": "Caballería"
      },
      {
        "amount": 6,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 20,
        "class": "Clase 5"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "881": {
    "name": "Kamayuk de élite",
    "description": "Crear kamayuk de élite () Infantería exclusiva de los incas con mayor alcance de ataque. Fuerte contra caballería e infantería. Débil contra unidades de arqueros y artilleros. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 80,
    "attack": 8,
    "cost": {
      "Food": 60,
      "Gold": 30
    },
    "trainTime": 10,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 8,
        "class": "Lanzapicas"
      },
      {
        "amount": 12,
        "class": "Caballería"
      },
      {
        "amount": 10,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 20,
        "class": "Clase 5"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "882": {
    "name": "Condotiero",
    "description": "Crear condotiero () Infantería antipólvora de desplazamiento rápido. Fuerte contra unidades de pólvora. Débil contra caballería y unidades de arqueros. Lo entrenan los italianos y sus aliados. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 80,
    "attack": 10,
    "cost": {
      "Food": 50,
      "Gold": 35
    },
    "trainTime": 18,
    "reloadTime": 1.9,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 10,
        "class": "Lanzapicas"
      },
      {
        "amount": 10,
        "class": "Clase 23"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Arietes"
      }
    ]
  },
  "1001": {
    "name": "Cañón de salvas",
    "description": "Crear cañón de salvas () Unidad de pólvora de asedio exclusiva de los portugueses. Dispara una andanada de balas. Fuerte contra grupos grandes de unidades. Débil contra caballería y mangoneles. Mejoras: ataque, alcance (universidad); velocidad de creación, a cañón de salvas de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 50,
    "attack": 6,
    "cost": {
      "Gold": 70,
      "Wood": 80
    },
    "trainTime": 25,
    "reloadTime": 3.45,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Infantería"
      },
      {
        "amount": 6,
        "class": "Unidades base"
      },
      {
        "amount": 1,
        "class": "Clase 17"
      },
      {
        "amount": 2,
        "class": "Clase 38"
      }
    ],
    "advancedArmors": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 4,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Clase 23"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1003": {
    "name": "Cañón de salvas de élite",
    "description": "Crear cañón de salvas de élite () Unidad de pólvora de asedio exclusiva de los portugueses. Dispara una andanada de balas. Fuerte contra grupos grandes de unidades. Débil contra caballería y mangoneles. Mejoras: ataque, alcance (universidad); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 70,
    "attack": 8,
    "cost": {
      "Gold": 70,
      "Wood": 80
    },
    "trainTime": 21,
    "reloadTime": 3.45,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Infantería"
      },
      {
        "amount": 1,
        "class": "Edificios"
      },
      {
        "amount": 8,
        "class": "Unidades base"
      },
      {
        "amount": 1,
        "class": "Clase 17"
      },
      {
        "amount": 2,
        "class": "Clase 38"
      }
    ],
    "advancedArmors": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 6,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Clase 23"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1004": {
    "name": "Carabela",
    "description": "Crear carabela () Barco de guerra exclusivo de los portugueses con ataque de paso a distancia. Fuerte contra grandes grupos de barcos. Débil contra barcos incendiarios. Mejoras: armadura, velocidad, coste, velocidad de creación, a carabela de élite (muelle); ataque, alcance (herrero); ataque, alcance (universidad); mayor resistencia a los monjes (monasterio).",
    "hp": 130,
    "attack": 6,
    "cost": {
      "Gold": 43,
      "Wood": 90
    },
    "trainTime": 25,
    "reloadTime": 3,
    "advancedAttacks": [
      {
        "amount": 8,
        "class": "Edificios"
      },
      {
        "amount": 6,
        "class": "Clase 16"
      },
      {
        "amount": 6,
        "class": "Unidades base"
      },
      {
        "amount": 4,
        "class": "Clase 17"
      },
      {
        "amount": 6,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Clase 16"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 8,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 60"
      }
    ]
  },
  "1006": {
    "name": "Carabela de élite",
    "description": "Crear carabela de élite () Barco de guerra exclusivo de los portugueses con ataque de paso a distancia. Fuerte contra grandes grupos de barcos. Débil contra barcos incendiarios. Mejoras: armadura, velocidad, coste, velocidad de creación (muelle); ataque, alcance (herrero); ataque, alcance (universidad); mayor resistencia a los monjes (monasterio).",
    "hp": 150,
    "attack": 8,
    "cost": {
      "Gold": 43,
      "Wood": 90
    },
    "trainTime": 25,
    "reloadTime": 3,
    "advancedAttacks": [
      {
        "amount": 9,
        "class": "Edificios"
      },
      {
        "amount": 7,
        "class": "Clase 16"
      },
      {
        "amount": 8,
        "class": "Unidades base"
      },
      {
        "amount": 4,
        "class": "Clase 17"
      },
      {
        "amount": 7,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Clase 16"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 8,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 60"
      }
    ]
  },
  "1007": {
    "name": "Arquero en camello",
    "description": "Crear arquero a camello () Arquero montado exclusivo de los bereberes. Excepcionalmente fuerte contra arqueros a caballo. Débil contra línea de lanceros, guerrilleros y jinetes de camello. Mejoras: ataque, alcance, armadura (herrero); velocidad, puntos de resistencia (establo); precisión, armadura (galería de tiro con arco); ataque, precisión (universidad); velocidad de creación, a arquero a camello de élite (castillo); mayor resistencia a monjes (monasterio).",
    "hp": 55,
    "attack": 7,
    "cost": {
      "Gold": 60,
      "Wood": 50
    },
    "trainTime": 25,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 7,
        "class": "Unidades base"
      },
      {
        "amount": 4,
        "class": "Monjes"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Monjes"
      },
      {
        "amount": 0,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": -3,
        "class": "Clase 39"
      }
    ]
  },
  "1009": {
    "name": "Arquero en camello de élite",
    "description": "Crear arquero a camello de élite () Arquero montado exclusivo de los bereberes. Excepcionalmente fuerte contra arqueros a caballo. Débil contra línea de lanceros, guerrilleros y jinetes de camello. Mejoras: ataque, alcance, armadura (herrero); velocidad, puntos de resistencia (establo); precisión, armadura (galería de tiro con arco); ataque, precisión (universidad); velocidad de creación (castillo); mayor resistencia a monjes (monasterio).",
    "hp": 60,
    "attack": 8,
    "cost": {
      "Gold": 60,
      "Wood": 50
    },
    "trainTime": 25,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 8,
        "class": "Unidades base"
      },
      {
        "amount": 6,
        "class": "Monjes"
      }
    ],
    "advancedArmors": [
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Monjes"
      },
      {
        "amount": 0,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": -3,
        "class": "Clase 39"
      }
    ]
  },
  "1010": {
    "name": "Escaramuzador zenete",
    "description": "Crear escaramuzador zenete () Guerrillero montado antiarqueros que no puede atacar a corta distancia. Fuerte contra soldados a distancia. Débil contra unidades a corta distancia. Unidad de los bereberes y sus aliados. Mejoras: velocidad, puntos de resistencia (establo); ataque, alcance, armadura (herrero); ataque, precisión (universidad); precisión, a escaramuzador zenete de élite (galería de tiro con arco); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 50,
    "attack": 3,
    "cost": {
      "Food": 40,
      "Wood": 35
    },
    "trainTime": 25,
    "reloadTime": 3,
    "advancedAttacks": [
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 4,
        "class": "Embarcaciones"
      },
      {
        "amount": 3,
        "class": "Muros y puertas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 4,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Monjes"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 38"
      }
    ]
  },
  "1012": {
    "name": "Escaramuzador zenete de élite",
    "description": "Crear escaramuzador zenete de élite () Hostigador montado antiarqueros que no puede atacar a corta distancia. Fuerte contra soldados a distancia. Débil contra unidades a corta distancia. Unidad de los bereberes y sus aliados. Mejoras: velocidad, puntos de resistencia (establo); ataque, alcance, armadura (herrero); ataque, precisión (universidad); precisión (galería de tiro con arco); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 55,
    "attack": 4,
    "cost": {
      "Food": 40,
      "Wood": 35
    },
    "trainTime": 23,
    "reloadTime": 3,
    "advancedAttacks": [
      {
        "amount": 4,
        "class": "Unidades base"
      },
      {
        "amount": 5,
        "class": "Embarcaciones"
      },
      {
        "amount": 2,
        "class": "Monjes"
      },
      {
        "amount": 3,
        "class": "Muros y puertas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 4,
        "class": "Unidades base"
      },
      {
        "amount": 1,
        "class": "Monjes"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 38"
      }
    ]
  },
  "1013": {
    "name": "Guardiana gbeto",
    "description": "Crear guardiana gbeto () Infantería exclusiva de los malienses con ataque cuerpo a cuerpo a distancia. Desplazamiento rápido. Fuerte contra infantería y armas de asedio. Débil contra soldados a distancia. Mejoras: armadura (herrero); velocidad de creación, a guardiana gbeto de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 40,
    "attack": 10,
    "cost": {
      "Food": 50,
      "Gold": 40
    },
    "trainTime": 17,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 1,
        "class": "Clase 29"
      },
      {
        "amount": 10,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1015": {
    "name": "Guardiana gbeto de élite",
    "description": "Crear guardiana gbeto de élite () Infantería exclusiva de los malienses con ataque cuerpo a cuerpo a distancia. Desplazamiento rápido. Fuerte contra infantería y armas de asedio. Débil contra soldados a distancia. Mejoras: armadura (herrero); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 50,
    "attack": 13,
    "cost": {
      "Food": 50,
      "Gold": 40
    },
    "trainTime": 17,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 1,
        "class": "Clase 29"
      },
      {
        "amount": 13,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1016": {
    "name": "Shotelai",
    "description": "Crear shotelai () Unidad de infantería exclusiva de los etíopes, con ataque alto y velocidad de entrenamiento rápida. Desplazamiento rápido. Fuerte contra infantería. Débil contra unidades de arqueros. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación, a shotelai de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 45,
    "attack": 16,
    "cost": {
      "Food": 50,
      "Gold": 30
    },
    "trainTime": 8,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Clase 29"
      },
      {
        "amount": 16,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": -3,
        "class": "Clase 39"
      }
    ]
  },
  "1018": {
    "name": "Shotelai de élite",
    "description": "Crear shotelai de élite () Unidad de infantería exclusiva de los etíopes, con ataque alto y velocidad de entrenamiento rápida. Desplazamiento rápido. Fuerte contra infantería. Débil contra unidades de arqueros. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 50,
    "attack": 18,
    "cost": {
      "Food": 50,
      "Gold": 30
    },
    "trainTime": 4,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Clase 29"
      },
      {
        "amount": 1,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 18,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": -3,
        "class": "Clase 39"
      }
    ]
  },
  "1103": {
    "name": "Galera incendiaria",
    "description": "Construir galera incendiaria () Barco de guerra que lanza fuego a corta distancia. Fuerte contra línea de galeras. Débil contra barcos de demolición. Mejoras: armadura, velocidad, coste, velocidad de creación, mejorar a barco incendiario (muelle); mayor resistencia a los monjes (monasterio).",
    "hp": 100,
    "attack": 1,
    "cost": {
      "Gold": 45,
      "Wood": 75
    },
    "trainTime": 65,
    "reloadTime": 0.25,
    "advancedAttacks": [
      {
        "amount": 1,
        "class": "Edificios"
      },
      {
        "amount": 3,
        "class": "Clase 16"
      },
      {
        "amount": 1,
        "class": "Arqueros"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 1,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 6,
        "class": "Clase 16"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 4,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1104": {
    "name": "Balsa de demolición",
    "description": "Construir balsa de demolición () Barco de guerra de demolición armado con explosivos que se autodestruye cuando se usa. Fuerte contra galeras incendiarias y edificios. Mejoras: armadura, velocidad, coste, velocidad de creación, a barco de demolición (muelle); ataque (universidad); mayor resistencia a los monjes (monasterio).",
    "hp": 45,
    "attack": 90,
    "cost": {
      "Gold": 50,
      "Wood": 70
    },
    "trainTime": 45,
    "reloadTime": 0,
    "advancedAttacks": [
      {
        "amount": 180,
        "class": "Edificios"
      },
      {
        "amount": 90,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 1,
        "class": "Clase 16"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1105": {
    "name": "Torre de asedio",
    "description": "Construir torre de asedio () Transporte terrestre rápido que sirve para descargar unidades sobre las murallas enemigas. Resistente a la mayoría de ataques a distancia. Débil contra las unidades cuerpo a cuerpo. Los monjes enemigos no pueden convertirla desde la distancia. La infantería guarnecida aumenta la velocidad. Las unidades montadas no pueden utilizarla. Mejoras: mayor resistencia a los monjes (monasterio).",
    "hp": 220,
    "attack": 0,
    "cost": {
      "Gold": 120,
      "Wood": 100
    },
    "trainTime": 36,
    "reloadTime": 0,
    "advancedAttacks": [],
    "advancedArmors": [
      {
        "amount": -2,
        "class": "Lanzapicas"
      },
      {
        "amount": 100,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Clase 17"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1120": {
    "name": "Elefante con balista",
    "description": "Crear elefante con balista () Caballería de asedio exclusiva de los jemeres con ataque de paso a distancia. Puede derribar árboles. Fuerte contra infantería y soldados a distancia. Débil contra caballería y armas de asedio. Mejoras: armadura (herrero); velocidad, PR (establo); ataque, alcance, precisión (universidad); velocidad de creación, a elefante con balista de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 250,
    "attack": 9,
    "cost": {
      "Food": 100,
      "Gold": 80
    },
    "trainTime": 25,
    "reloadTime": 2.5,
    "advancedAttacks": [
      {
        "amount": 3,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 9,
        "class": "Unidades base"
      },
      {
        "amount": 3,
        "class": "Armas de asedio"
      },
      {
        "amount": 100,
        "class": "Clase 18"
      },
      {
        "amount": 2,
        "class": "Edificios"
      },
      {
        "amount": 8,
        "class": "Clase 16"
      },
      {
        "amount": 8,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Clase 5"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 10,
        "class": "Clase 37"
      }
    ]
  },
  "1122": {
    "name": "Elefante con balista de élite",
    "description": "Crear elefante con balista () Caballería de asedio exclusiva de los jemeres con ataque de paso a distancia. Puede derribar árboles. Fuerte contra infantería y soldados a distancia. Débil contra caballería y armas de asedio. Mejoras: armadura (herrero); velocidad, PR (establo); ataque, alcance, precisión (universidad); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 280,
    "attack": 10,
    "cost": {
      "Food": 100,
      "Gold": 80
    },
    "trainTime": 25,
    "reloadTime": 2.5,
    "advancedAttacks": [
      {
        "amount": 4,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 10,
        "class": "Unidades base"
      },
      {
        "amount": 4,
        "class": "Armas de asedio"
      },
      {
        "amount": 100,
        "class": "Clase 18"
      },
      {
        "amount": 4,
        "class": "Edificios"
      },
      {
        "amount": 8,
        "class": "Clase 16"
      },
      {
        "amount": 8,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Clase 5"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 10,
        "class": "Clase 37"
      }
    ]
  },
  "1123": {
    "name": "Recluta con karambit",
    "description": "Crear recluta con karambit () Infantería exclusiva de los malayos que solo ocupa medio espacio de población. Fuerte en gran número. Débil contra caballería y soldados a distancia. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación, a recluta con karambit de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 30,
    "attack": 7,
    "cost": {
      "Food": 25,
      "Gold": 15
    },
    "trainTime": 6,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Clase 29"
      },
      {
        "amount": 7,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1125": {
    "name": "Recluta con karambit de élite",
    "description": "Crear recluta con karambit de élite () Infantería exclusiva de los malayos que solo ocupa medio espacio de población. Fuerte en gran número. Débil contra caballería y soldados a distancia. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 40,
    "attack": 8,
    "cost": {
      "Food": 25,
      "Gold": 15
    },
    "trainTime": 6,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Clase 29"
      },
      {
        "amount": 1,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 8,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1126": {
    "name": "Arambai",
    "description": "Creararambai () Unidad montada a distancia exclusiva de los birmanos con un ataque potente pero impreciso. Fuerte contra unidades a media y corta distancia. Débil contra unidades de arqueros y armas de asedio. Mejoras: armadura (herrero); velocidad, PR (establo); armadura (galería de tiro con arco); ataque, precisión (universidad); velocidad de creación, a arambai de élite: (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 60,
    "attack": 12,
    "cost": {
      "Gold": 60,
      "Wood": 75
    },
    "trainTime": 18,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 12,
        "class": "Unidades base"
      },
      {
        "amount": 2,
        "class": "Clase 17"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Monjes"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1128": {
    "name": "Arambai de élite",
    "description": "Crear Arambai de élite () Unidad a distancia montada exclusiva de los birmanos con un ataque potente pero impreciso. Fuerte contra unidades a media y corta distancia. Débil contra unidades de arqueros y armas de asedio. Mejoras: armadura (herrero); velocidad, puntos de resistencia (establo); armadura (galería de tiro con arco); ataque, precisión (universidad); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 65,
    "attack": 14,
    "cost": {
      "Gold": 60,
      "Wood": 75
    },
    "trainTime": 18,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 14,
        "class": "Unidades base"
      },
      {
        "amount": 2,
        "class": "Clase 17"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Monjes"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1129": {
    "name": "Arquero de ratán",
    "description": "Crear arquero de ratán () Arquero a pie exclusivo de los vietnamitas con una excepcional armadura antiperforación. Fuerte contra unidades de arqueros e infantería. Débil contra caballería, guerrilleros y armas de asedio. Mejoras: ataque, alcance, armadura (herrero); precisión, armadura (galería de tiro con arco); ataque, precisión (universidad); velocidad de creación; a arquero de ratán de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 40,
    "attack": 6,
    "cost": {
      "Gold": 45,
      "Wood": 50
    },
    "trainTime": 16,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Muros y puertas"
      },
      {
        "amount": 6,
        "class": "Unidades base"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 4,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1131": {
    "name": "Arquero de ratán de élite",
    "description": "Crear arquero de ratán de élite () Arquero a pie exclusivo de los vietnamitas con una excepcional armadura antiperforación. Fuerte contra unidades de arqueros e infantería. Débil contra caballería, guerrilleros y armas de asedio. Mejoras: ataque, alcance, armadura (herrero); precisión, armadura (galería de tiro con arco); ataque, precisión (universidad); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 45,
    "attack": 7,
    "cost": {
      "Gold": 45,
      "Wood": 50
    },
    "trainTime": 16,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Muros y puertas"
      },
      {
        "amount": 7,
        "class": "Unidades base"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 6,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1132": {
    "name": "Elefante de combate",
    "description": "Crear elefante de combate () Infantería lenta pero duradera. Fuerte contra unidades a corta distancia. Débil contra monjes y línea de lanceros. Mejoras: ataque, armadura (herrero); velocidad, puntos de resistencia, a elefante de combate de élite (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 250,
    "attack": 12,
    "cost": {
      "Food": 100,
      "Gold": 70
    },
    "trainTime": 24,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 4,
        "class": "Edificios"
      },
      {
        "amount": 12,
        "class": "Lanzapicas"
      },
      {
        "amount": 4,
        "class": "Armas de asedio"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Clase 5"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1134": {
    "name": "Elefante de combate de élite",
    "description": "Crear elefante de combate de élite () Unidad de infantería lenta pero duradera. Fuerte contra unidades a corta distancia. Débil contra monjes y línea de lanceros. Mejoras: ataque, armadura (herrero); velocidad, puntos de resistencia (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 300,
    "attack": 14,
    "cost": {
      "Food": 100,
      "Gold": 70
    },
    "trainTime": 24,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 7,
        "class": "Edificios"
      },
      {
        "amount": 14,
        "class": "Lanzapicas"
      },
      {
        "amount": 7,
        "class": "Armas de asedio"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Clase 5"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1155": {
    "name": "Hostigador imperial",
    "description": "Crear guerrillero imperial () Guerrillero antiarqueros que no puede atacar a corta distancia. Fuerte contra soldados a distancia y línea de lanceros. Débil contra unidades a corta distancia. Unidad de los vietnamitas y sus aliados. Mejoras: ataque, alcance, armadura (herrero); ataque, precisión (universidad); precisión (galería de tiro con arco); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 35,
    "attack": 4,
    "cost": {
      "Food": 25,
      "Wood": 35
    },
    "trainTime": 22,
    "reloadTime": 3,
    "advancedAttacks": [
      {
        "amount": 3,
        "class": "Monjes"
      },
      {
        "amount": 4,
        "class": "Muros y puertas"
      },
      {
        "amount": 5,
        "class": "Embarcaciones"
      },
      {
        "amount": 4,
        "class": "Unidades base"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 5,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 38"
      }
    ]
  },
  "1225": {
    "name": "Konnik",
    "description": "Crear konnik () Unidad de caballería pesada exclusiva de los búlgaros que lucha como infantería tras ser derribada. Fuerte contra infantería y caballería. Débil contra línea de lanceros y monjes Mejoras: ataque, armadura (herrero); velocidad, puntos de resistencia (establo); velocidad de creación, a konnik de élite (castillo); mayor resistencia a los monjes (monasterio)",
    "hp": 100,
    "attack": 12,
    "cost": {
      "Food": 60,
      "Gold": 70
    },
    "trainTime": 16,
    "reloadTime": 2.4,
    "advancedAttacks": [
      {
        "amount": 12,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1227": {
    "name": "Konnik de élite",
    "description": "Crear konnik de élite () Unidad de caballería pesada exclusiva de los búlgaros que lucha como infantería tras ser derribada. Fuerte contra infantería y caballería. Débil contra línea de lanceros y monjes Mejoras: ataque, armadura (herrero); velocidad, puntos de resistencia (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio)",
    "hp": 120,
    "attack": 14,
    "cost": {
      "Food": 60,
      "Gold": 70
    },
    "trainTime": 16,
    "reloadTime": 2.4,
    "advancedAttacks": [
      {
        "amount": 14,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1228": {
    "name": "Keshik",
    "description": "Crear keshik () Unidad de caballería pesada exclusiva de los tártaros que genera oro al luchar contra otras unidades. Fuerte contra unidades de arqueros. Débil contra línea de lanceros, jinetes de camello y monjes. Mejoras: ataque, armadura (herrero); velocidad, puntos de resistencia (establo); velocidad de creación, a keshik de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 120,
    "attack": 9,
    "cost": {
      "Food": 60,
      "Gold": 40
    },
    "trainTime": 17,
    "reloadTime": 1.9,
    "advancedAttacks": [
      {
        "amount": 9,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1230": {
    "name": "Keshik de élite",
    "description": "Crear keshik de élite () Unidad de caballería exclusiva de los tártaros que genera oro al luchar contra otras unidades. Fuerte contra unidades de arqueros. Débil contra línea de lanceros, jinetes de camello y monjes. Mejoras: ataque, armadura (herrero); velocidad, PR (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 145,
    "attack": 11,
    "cost": {
      "Food": 60,
      "Gold": 40
    },
    "trainTime": 15,
    "reloadTime": 1.9,
    "advancedAttacks": [
      {
        "amount": 11,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1231": {
    "name": "Kipchak",
    "description": "Crear kipchak () Arquero montado exclusivo de los cumanos que dispara múltiples flechas. Fuerte contra infantería y armas de asedio. Débil contra arqueros a pie. Mejoras: ataque, alcance, armadura (herrero); velocidad, PR (establo); precisión, armadura (galería de tiro con arco); ataque, precisión (universidad); velocidad de creación, a kipchak de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 40,
    "attack": 4,
    "cost": {
      "Gold": 35,
      "Wood": 60
    },
    "trainTime": 20,
    "reloadTime": 2.2,
    "advancedAttacks": [
      {
        "amount": 1,
        "class": "Muros y puertas"
      },
      {
        "amount": 4,
        "class": "Unidades base"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Monjes"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1233": {
    "name": "Kipchak de élite",
    "description": "Crear kipchak de élite () Arquero montado exclusivo de los cumanos que dispara múltiples flechas. Fuerte contra infantería y armas de asedio. Débil contra arqueros a pie. Mejoras: ataque, alcance, armadura (herrero); velocidad, PR (establo); precisión, armadura (galería de tiro con arco); ataque, precisión (universidad); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 45,
    "attack": 5,
    "cost": {
      "Gold": 35,
      "Wood": 60
    },
    "trainTime": 20,
    "reloadTime": 2.2,
    "advancedAttacks": [
      {
        "amount": 1,
        "class": "Muros y puertas"
      },
      {
        "amount": 5,
        "class": "Unidades base"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Monjes"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1234": {
    "name": "Leitis",
    "description": "Crear leitis () Caballería pesada exclusiva de los lituanos que ignora la armadura. Fuertes contra caballería e infantería, especialmente con armadura alta. Débil contra unidades de arqueros. Mejoras: ataque, armadura (herrero); velocidad, PR (establo); velocidad de creación, a leitis de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 100,
    "attack": 13,
    "cost": {
      "Food": 70,
      "Gold": 50
    },
    "trainTime": 20,
    "reloadTime": 1.9,
    "advancedAttacks": [
      {
        "amount": 13,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1236": {
    "name": "Leitis de élite",
    "description": "Crear leitis de élite () Caballería pesada exclusiva de los lituanos que ignora la armadura. Fuertes contra caballería e infantería, especialmente con armadura alta. Débil contra unidades de arqueros. Mejoras: ataque, armadura (herrero); velocidad, PR (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 130,
    "attack": 16,
    "cost": {
      "Food": 70,
      "Gold": 50
    },
    "trainTime": 18,
    "reloadTime": 1.9,
    "advancedAttacks": [
      {
        "amount": 16,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1252": {
    "name": "Konnik (desmontado)",
    "description": "Crear konnik () Unidad de caballería pesada exclusiva de los búlgaros que lucha como infantería tras ser derribada. Fuerte contra infantería y caballería. Débil contra línea de lanceros y monjes Mejoras: ataque, armadura (herrero); velocidad, puntos de resistencia (establo); velocidad de creación, a konnik de élite (castillo); mayor resistencia a los monjes (monasterio)",
    "hp": 45,
    "attack": 12,
    "cost": {
      "Food": 0,
      "Gold": 0
    },
    "trainTime": 16,
    "reloadTime": 2.4,
    "advancedAttacks": [
      {
        "amount": 4,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 12,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1253": {
    "name": "Konnik de élite (desmontado)",
    "description": "Crear konnik de élite () Unidad de caballería pesada exclusiva de los búlgaros que lucha como infantería tras ser derribada. Fuerte contra infantería y caballería. Débil contra línea de lanceros y monjes Mejoras: ataque, armadura (herrero); velocidad, puntos de resistencia (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio)",
    "hp": 50,
    "attack": 13,
    "cost": {
      "Food": 0,
      "Gold": 0
    },
    "trainTime": 16,
    "reloadTime": 2.4,
    "advancedAttacks": [
      {
        "amount": 4,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 13,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1254": {
    "name": "Konnik",
    "description": "Crear konnik () Unidad de caballería pesada exclusiva de los búlgaros que lucha como infantería tras ser derribada. Fuerte contra infantería y caballería. Débil contra línea de lanceros y monjes Mejoras: ataque, armadura (herrero); velocidad, puntos de resistencia (establo); velocidad de creación, a konnik de élite (castillo); mayor resistencia a los monjes (monasterio)",
    "hp": 100,
    "attack": 12,
    "cost": {
      "Food": 60,
      "Gold": 70
    },
    "trainTime": 16,
    "reloadTime": 2.4,
    "advancedAttacks": [
      {
        "amount": 12,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1255": {
    "name": "Konnik de élite",
    "description": "Crear konnik de élite () Unidad de caballería pesada exclusiva de los búlgaros que lucha como infantería tras ser derribada. Fuerte contra infantería y caballería. Débil contra línea de lanceros y monjes Mejoras: ataque, armadura (herrero); velocidad, puntos de resistencia (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio)",
    "hp": 120,
    "attack": 14,
    "cost": {
      "Food": 60,
      "Gold": 70
    },
    "trainTime": 16,
    "reloadTime": 2.4,
    "advancedAttacks": [
      {
        "amount": 14,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1258": {
    "name": "Ariete",
    "description": "Construir ariete () Arma de asedio antiedificios. Resistente a la mayoría de ataques a distancia. Excepcionalmente fuerte contra los edificios. Débil contra las unidades cuerpo a cuerpo. Los monjes enemigos no pueden convertirla a distancia. Aumenta la velocidad y el ataque de la infantería guarnecida. Mejoras: ataque (universidad); mejorar a ariete cubierto (taller de maquinaria de asedio); mayor resistencia a los monjes (monasterio).",
    "hp": 175,
    "attack": 2,
    "cost": {
      "Gold": 75,
      "Wood": 160
    },
    "trainTime": 36,
    "reloadTime": 5,
    "advancedAttacks": [
      {
        "amount": 150,
        "class": "Edificios"
      },
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 40,
        "class": "Cañones de asedio"
      }
    ],
    "advancedArmors": [
      {
        "amount": -3,
        "class": "Lanzapicas"
      },
      {
        "amount": 180,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Clase 17"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1263": {
    "name": "Camello llameante",
    "description": "Crear camello llameante () Caballería de asedio de demolición exclusiva de los tártaros. Fuerte contra unidades montadas, especialmente elefantes. Débil contra arqueros a pie e infantería. Se autodestruye cuando se usa. Mejoras: ataque (universidad); velocidad, PR (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 55,
    "attack": 20,
    "cost": {
      "Food": 75,
      "Gold": 30
    },
    "trainTime": 30,
    "reloadTime": 0,
    "advancedAttacks": [
      {
        "amount": 200,
        "class": "Edificios"
      },
      {
        "amount": 20,
        "class": "Lanzapicas"
      },
      {
        "amount": 50,
        "class": "Caballería"
      },
      {
        "amount": 50,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 130,
        "class": "Clase 5"
      },
      {
        "amount": 25,
        "class": "Cañones de asedio"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": -3,
        "class": "Clase 39"
      }
    ]
  },
  "1302": {
    "name": "Bote dragón",
    "description": "Construir barco dragón () Barco de guerra exclusivo de los chinos que escupe fuego a corta distancia. Fuerte contra línea de galeras. Débil contra buques de demolición. Mejoras: armadura, velocidad, coste, velocidad de creación (muelle); mayor resistencia a monjes (monasterio).",
    "hp": 150,
    "attack": 4,
    "cost": {
      "Gold": 45,
      "Wood": 75
    },
    "trainTime": 36,
    "reloadTime": 0.25,
    "advancedAttacks": [
      {
        "amount": 4,
        "class": "Edificios"
      },
      {
        "amount": 4,
        "class": "Clase 16"
      },
      {
        "amount": 4,
        "class": "Arqueros"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 4,
        "class": "Unidades base"
      },
      {
        "amount": 4,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 9,
        "class": "Clase 16"
      },
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 8,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1370": {
    "name": "Lancero estepario",
    "description": "Crear Lancero estepario ()  Jinete ligero con mayor ataque a distancia. Fuerte en grupos. Débil contra caballería, jinetes de camello y arqueros. Mejoras: ataque, armadura (herrero); velocidad, PR (establo); velocidad de creación del lancero estepario de élite (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 60,
    "attack": 9,
    "cost": {
      "Food": 70,
      "Gold": 40
    },
    "trainTime": 24,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 9,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1372": {
    "name": "Lancero estepario de élite",
    "description": "Crear lancero estepario de élite () Jinete ligero con mayor ataque a distancia. Fuerte en grupos. Débil contra caballería, jinetes de camello y unidades de arqueros. Mejoras: ataque, armadura (herrero); velocidad, PR (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 80,
    "attack": 11,
    "cost": {
      "Food": 70,
      "Gold": 40
    },
    "trainTime": 20,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 11,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1570": {
    "name": "Guerrero Xólotl",
    "description": "Crear Guerrero xólotl () Unidad de caballería mesoamericana. Fuerte contra infantería y asedios. Débil contra piqueros y jinetes de camello. Mejoras: ataque (herrero); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 100,
    "attack": 10,
    "cost": {
      "Food": 60,
      "Gold": 75
    },
    "trainTime": 30,
    "reloadTime": 1.8,
    "advancedAttacks": [
      {
        "amount": 10,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1655": {
    "name": "Costiller",
    "description": "Crear Costiller () Unidad de caballería pesada exclusiva de los borgoñeses con un poderoso ataque cargado. Fuerte contra unidades de infantería y arqueros. Débil contra jinetes de camello y monjes. Mejoras: ataque, armadura (herrero); velocidad, puntos de resistencia (establo); velocidad de creación, a costiller de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 115,
    "attack": 8,
    "cost": {
      "Food": 55,
      "Gold": 55
    },
    "trainTime": 15,
    "reloadTime": 1.9,
    "advancedAttacks": [
      {
        "amount": 8,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1657": {
    "name": "Costiller de élite",
    "description": "Crear Costiller de élite () Unidad de caballería pesada exclusiva de los borgoñeses con un poderoso ataque cargado. Fuerte contra unidades de infantería y arqueros. Débil contra jinetes de camello y monjes. Mejoras: ataque, armadura (herrero); velocidad, puntos de resistencia (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 145,
    "attack": 11,
    "cost": {
      "Food": 55,
      "Gold": 55
    },
    "trainTime": 14,
    "reloadTime": 1.9,
    "advancedAttacks": [
      {
        "amount": 11,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1658": {
    "name": "Serjeant",
    "description": "Crear serjeant () Unidad de infantería exclusiva de los sicilianos que puede construir torres del homenaje. Fuerte contra infantería y jinetes de camellos. Débil contra arqueros montados y artilleros. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación, a serjeant de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 50,
    "attack": 5,
    "cost": {
      "Food": 55,
      "Gold": 25
    },
    "trainTime": 12,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Clase 29"
      },
      {
        "amount": 2,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 5,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1659": {
    "name": "Serjeant de élite",
    "description": "Crear serjeant de élite () Unidad de infantería exclusiva de los sicilianos que puede construir torres del homenaje. Fuerte contra infantería y jinetes de camellos. Débil contra arqueros montados y artilleros. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 85,
    "attack": 11,
    "cost": {
      "Food": 55,
      "Gold": 25
    },
    "trainTime": 12,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 3,
        "class": "Clase 29"
      },
      {
        "amount": 3,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 11,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 6,
        "class": "Lanzapicas"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1660": {
    "name": "Serjeant",
    "description": "Crear serjeant () Unidad de infantería exclusiva de los sicilianos que puede construir torres del homenaje. Fuerte contra infantería y jinetes de camellos. Débil contra arqueros montados y artilleros. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación, a serjeant de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 50,
    "attack": 5,
    "cost": {
      "Food": 55,
      "Gold": 25
    },
    "trainTime": 16,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Clase 29"
      },
      {
        "amount": 2,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 5,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1661": {
    "name": "Serjeant de élite",
    "description": "Crear serjeant de élite () Unidad de infantería exclusiva de los sicilianos que puede construir torres del homenaje. Fuerte contra infantería y jinetes de camellos. Débil contra arqueros montados y artilleros. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 85,
    "attack": 11,
    "cost": {
      "Food": 55,
      "Gold": 25
    },
    "trainTime": 12,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 3,
        "class": "Clase 29"
      },
      {
        "amount": 3,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 11,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 6,
        "class": "Lanzapicas"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1699": {
    "name": "Milicia flamenca",
    "description": "Crear Milicia flamenca () Unidad de infantería anticaballería exclusiva de los borgoñeses. Fuerte contra unidades montadas. Débil contra soldados a distancia. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo); más resistente a los monjes (monasterio).",
    "hp": 45,
    "attack": 5,
    "cost": {
      "Food": 30,
      "Gold": 25
    },
    "trainTime": 14,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Clase 29"
      },
      {
        "amount": 5,
        "class": "Lanzapicas"
      },
      {
        "amount": 6,
        "class": "Caballería"
      },
      {
        "amount": 4,
        "class": "Clase 16"
      },
      {
        "amount": 4,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 6,
        "class": "Clase 5"
      },
      {
        "amount": 4,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1701": {
    "name": "Martillo de guerra",
    "description": "Crear martillo de guerra () Unidad de infantería exclusiva de los polacos que destroza la armadura de las unidades contra las que lucha. Fuerte contra edificios, caballería e infantería. Débil contra unidades de arqueros y artilleros. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación, a martillo de guerra de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 80,
    "attack": 8,
    "cost": {
      "Food": 55,
      "Gold": 20
    },
    "trainTime": 12,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Clase 29"
      },
      {
        "amount": 4,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 8,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1703": {
    "name": "Martillo de guerra de élite",
    "description": "Crear martillo de guerra de élite () Unidad de infantería exclusiva de los polacos que destroza la armadura de las unidades contra las que lucha. Fuerte contra edificios, caballería e infantería. Débil contra unidades de arqueros y artilleros. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 95,
    "attack": 10,
    "cost": {
      "Food": 55,
      "Gold": 20
    },
    "trainTime": 12,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 3,
        "class": "Clase 29"
      },
      {
        "amount": 6,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 10,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1704": {
    "name": "Carro de guerra husita",
    "description": "Construir carreta husita () Unidad de pólvora de asedio exclusiva de los bohemios. Las unidades tras ella reciben un 50 % menos de daño con los proyectiles. Fuerte contra soldados a distancia. Débil contra línea de mangoneles. Mejoras: ataque, alcance (universidad); velocidad de creación, a carreta husita de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 160,
    "attack": 10,
    "cost": {
      "Gold": 70,
      "Wood": 110
    },
    "trainTime": 30,
    "reloadTime": 3.45,
    "advancedAttacks": [
      {
        "amount": 1,
        "class": "Edificios"
      },
      {
        "amount": 10,
        "class": "Unidades base"
      },
      {
        "amount": 3,
        "class": "Clase 17"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 7,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Clase 23"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 37"
      }
    ]
  },
  "1706": {
    "name": "Carro de guerra husita de élite",
    "description": "Construir carreta husita de élite () Unidad de pólvora de asedio exclusiva de los bohemios. Las unidades tras ella reciben un 50 % menos de daño con los proyectiles. Fuerte contra soldados a distancia. Débil contra línea de mangoneles. Mejoras: ataque, alcance (universidad); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 230,
    "attack": 13,
    "cost": {
      "Gold": 70,
      "Wood": 110
    },
    "trainTime": 26,
    "reloadTime": 3.45,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Edificios"
      },
      {
        "amount": 13,
        "class": "Unidades base"
      },
      {
        "amount": 3,
        "class": "Clase 17"
      }
    ],
    "advancedArmors": [
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 10,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Clase 23"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 37"
      }
    ]
  },
  "1707": {
    "name": "Húsar alado",
    "description": "Crear húsar alado () Jinete ligero y rápido exclusivo de los polacos y los lituanos para explorar y saquear. Resistente a la conversión. Extremadamente fuerte contra las unidades del monasterio. Débil contra línea de lanceros y jinetes de camello. Mejoras: ataque, armadura (herrero); velocidad, puntos de resistencia (establo); mayor resistencia a los monjes (monasterio).",
    "hp": 80,
    "attack": 9,
    "cost": {
      "Food": 80
    },
    "trainTime": 30,
    "reloadTime": 1.9,
    "advancedAttacks": [
      {
        "amount": 14,
        "class": "Clase 25"
      },
      {
        "amount": 9,
        "class": "Lanzapicas"
      },
      {
        "amount": 4,
        "class": "Clase 23"
      }
    ],
    "advancedArmors": [
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1709": {
    "name": "Obús",
    "description": "Construir obús () Unidad de pólvora de asedio exclusiva de los bohemios de largo alcance que no puede atacar a corta distancia. Fuerte contra edificios y armas de asedio. Débil contra unidades a corta distancia. Mejoras: ataque, alcance (universidad); mayor resistencia a los monjes (monasterio).",
    "hp": 90,
    "attack": 50,
    "cost": {
      "Gold": 225,
      "Wood": 225
    },
    "trainTime": 56,
    "reloadTime": 6.5,
    "advancedAttacks": [
      {
        "amount": 250,
        "class": "Edificios"
      },
      {
        "amount": 50,
        "class": "Clase 16"
      },
      {
        "amount": 50,
        "class": "Lanzapicas"
      },
      {
        "amount": 20,
        "class": "Cañones de asedio"
      },
      {
        "amount": 50,
        "class": "Armas de asedio"
      },
      {
        "amount": 50,
        "class": "Clase 34"
      },
      {
        "amount": 50,
        "class": "Clase 37"
      }
    ],
    "advancedArmors": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 6,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 0,
        "class": "Clase 23"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1735": {
    "name": "Espadachín urumi",
    "description": "Crear Espadachín urumi () Unidad de infantería exclusiva de los pueblos dravídicos con ataque de impacto cargado. Fuerte contra edificios y unidades a corta distancia. Débil contra soldados a distancia a larga distancia. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación, a espadachín urumi de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 55,
    "attack": 9,
    "cost": {
      "Food": 65,
      "Gold": 20
    },
    "trainTime": 9,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 9,
        "class": "Lanzapicas"
      },
      {
        "amount": 2,
        "class": "Clase 29"
      },
      {
        "amount": 1,
        "class": "Unidades de pólvora"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1737": {
    "name": "Espadachín urumi de élite",
    "description": "Crear Espadachín urumi de élite () Unidad de infantería exclusiva de los pueblos dravídicos con ataque de impacto cargado. Fuerte contra edificios y unidades a corta distancia. Débil contra soldados a distancia a larga distancia. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 65,
    "attack": 11,
    "cost": {
      "Food": 65,
      "Gold": 20
    },
    "trainTime": 9,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 11,
        "class": "Lanzapicas"
      },
      {
        "amount": 3,
        "class": "Clase 29"
      },
      {
        "amount": 2,
        "class": "Unidades de pólvora"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1738": {
    "name": "Ratha (cuerpo a cuerpo)",
    "description": "Crear ratha () Arquero montado exclusivo de los bengalíes que puede alternar entre ataques cuerpo a cuerpo y a distancia. Fuerte contra infantería. Débil contra guerrilleros y jinetes de camellos Mejoras: ataque, armadura (herrero); ataque, precisión (universidad); velocidad, puntos de resistencia (establo); velocidad de creación, a ratha de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 100,
    "attack": 10,
    "cost": {
      "Gold": 60,
      "Wood": 60
    },
    "trainTime": 20,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 10,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 3,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 1,
        "class": "Monjes"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1740": {
    "name": "Ratha de élite (cuerpo a cuerpo)",
    "description": "Crear ratha de élite () Arquero montado exclusivo de los bengalíes que puede alternar entre ataques cuerpo a cuerpo y a distancia. Fuerte contra infantería. Débil contra guerrilleros y jinetes de camellos. Mejoras: ataque, armadura (herrero); ataque, precisión (universidad); velocidad, puntos de resistencia (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 115,
    "attack": 12,
    "cost": {
      "Gold": 60,
      "Wood": 60
    },
    "trainTime": 18,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 12,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 3,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 1,
        "class": "Monjes"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1741": {
    "name": "Lanzador de chakrams",
    "description": "Crear lanzador de chakrams () Unidad de infantería exclusiva de los gurjaras con ataque cuerpo a cuerpo a distancia que inflige daño perforante. Fuerte contra infantería y grupos grandes de unidades. Débil contra caballería y armas de asedio. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación, a lanzador de chakrams de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 40,
    "attack": 3,
    "cost": {
      "Food": 65,
      "Gold": 30
    },
    "trainTime": 15,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 1,
        "class": "Clase 29"
      },
      {
        "amount": 1,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 3,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1743": {
    "name": "Lanzador de chakrams de élite",
    "description": "Crear lanzador de chakrams de élite () Unidad de infantería exclusiva de los gurjaras con ataque cuerpo a cuerpo a distancia que inflige daño perforante. Fuerte contra infantería y grupos grandes de unidades. Débil contra caballería y armas de asedio. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 50,
    "attack": 4,
    "cost": {
      "Food": 65,
      "Gold": 30
    },
    "trainTime": 15,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Clase 29"
      },
      {
        "amount": 2,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 4,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Infantería"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1744": {
    "name": "Elefante acorazado",
    "description": "Crear elefante acorazado () Caballería de asedio antiedificios resistente a la mayoría de ataques a distancia. Extremadamente fuerte contra edificios. Débil contra líneas de lanceros. Los monjes enemigos no pueden convertirlo desde la distancia. Mejoras: ataque, armadura (herrero); ataque (universidad); velocidad, puntos de resistencia (establo); a elefante de asedio (taller de maquinaria de asedio); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 180,
    "attack": 4,
    "cost": {
      "Food": 120,
      "Gold": 95
    },
    "trainTime": 36,
    "reloadTime": 3,
    "advancedAttacks": [
      {
        "amount": 90,
        "class": "Edificios"
      },
      {
        "amount": 4,
        "class": "Lanzapicas"
      },
      {
        "amount": 25,
        "class": "Cañones de asedio"
      }
    ],
    "advancedArmors": [
      {
        "amount": 17,
        "class": "Clase 5"
      },
      {
        "amount": -2,
        "class": "Lanzapicas"
      },
      {
        "amount": 7,
        "class": "Caballería"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 0,
        "class": "Clase 17"
      },
      {
        "amount": 140,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1746": {
    "name": "Elefante de asedio",
    "description": "Crear elefante de asedio () Caballería de asedio antiedificios resistente a la mayoría de ataques a distancia. Extremadamente fuerte contra edificios. Débil contra líneas de lanceros. Los monjes enemigos no pueden convertirlo desde la distancia. Mejoras: ataque, armadura (herrero); ataque (universidad); velocidad, puntos de resistencia (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 220,
    "attack": 4,
    "cost": {
      "Food": 120,
      "Gold": 95
    },
    "trainTime": 36,
    "reloadTime": 3,
    "advancedAttacks": [
      {
        "amount": 105,
        "class": "Edificios"
      },
      {
        "amount": 4,
        "class": "Lanzapicas"
      },
      {
        "amount": 35,
        "class": "Cañones de asedio"
      }
    ],
    "advancedArmors": [
      {
        "amount": 20,
        "class": "Clase 5"
      },
      {
        "amount": -2,
        "class": "Lanzapicas"
      },
      {
        "amount": 10,
        "class": "Caballería"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 0,
        "class": "Clase 17"
      },
      {
        "amount": 150,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1747": {
    "name": "Ghulam",
    "description": "Crear ghulam () Unidad de infantería exclusiva de los indostanos que ensarta a varios objetivos con su lanza. Extremadamente fuerte contra unidades de arqueros y línea de lanceros. Débil contra caballería. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación, a ghulam de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 60,
    "attack": 9,
    "cost": {
      "Food": 30,
      "Gold": 45
    },
    "trainTime": 12,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 9,
        "class": "Lanzapicas"
      },
      {
        "amount": 5,
        "class": "Embarcaciones"
      },
      {
        "amount": 2,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 2,
        "class": "Clase 29"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1749": {
    "name": "Ghulam de élite",
    "description": "Crear ghulam de élite () Unidad de infantería exclusiva de los indostanos que ensarta a varios objetivos con su lanza. Extremadamente fuerte contra unidades de arqueros y línea de lanceros. Débil contra caballería. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 70,
    "attack": 11,
    "cost": {
      "Food": 30,
      "Gold": 45
    },
    "trainTime": 12,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 11,
        "class": "Lanzapicas"
      },
      {
        "amount": 6,
        "class": "Embarcaciones"
      },
      {
        "amount": 2,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 2,
        "class": "Clase 29"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 6,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1750": {
    "name": "Thirisadai",
    "description": "Construir thirisadai () Barco de guerra de gran resistencia exclusivo de los dravídicos. Fuerte contra la mayoría de barcos de guerra. Débil contra brulotes. Mejoras: armadura, velocidad, coste, velocidad de creación (muelle); ataque, alcance (herrero); ataque, precisión (universidad); mayor resistencia a los monjes (monasterio).",
    "hp": 250,
    "attack": 9,
    "cost": {
      "Gold": 60,
      "Wood": 180
    },
    "trainTime": 40,
    "reloadTime": 3.45,
    "advancedAttacks": [
      {
        "amount": 9,
        "class": "Edificios"
      },
      {
        "amount": 9,
        "class": "Clase 16"
      },
      {
        "amount": 9,
        "class": "Unidades base"
      },
      {
        "amount": 4,
        "class": "Clase 17"
      },
      {
        "amount": 9,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 8,
        "class": "Clase 16"
      },
      {
        "amount": 0,
        "class": "Arqueros"
      },
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 10,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 60"
      }
    ]
  },
  "1751": {
    "name": "Jinete shrivamsha",
    "description": "Crear jinete shrivamsha () Jinete ligero y rápido exclusivo de los gurjaras que puede esquivar proyectiles. Fuerte contra soldados a distancia. Débil contra línea de lanceros y jinetes de camello. Mejoras: ataque, armadura (herrero); velocidad, puntos de resistencia, a jinete shrivamsha de élite (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 55,
    "attack": 8,
    "cost": {
      "Food": 70,
      "Gold": 30
    },
    "trainTime": 20,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 8,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1753": {
    "name": "Jinete shrivamsha de élite",
    "description": "Crear jinete shrivamsha de élite () Jinete ligero y rápido exclusivo de los gurjaras que puede esquivar proyectiles. Fuerte contra soldados a distancia. Débil contra línea de lanceros y jinetes de camello. Mejoras: ataque, armadura (herrero); velocidad, puntos de resistencia (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 70,
    "attack": 11,
    "cost": {
      "Food": 70,
      "Gold": 30
    },
    "trainTime": 20,
    "reloadTime": 1.9,
    "advancedAttacks": [
      {
        "amount": 11,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1755": {
    "name": "Explorador a camello",
    "description": "Crear explorador a camello () Caballería anticaballería de desplazamiento rápido exclusiva de los gurjaras. Fuerte contra unidades montadas. Débil contra infantería, monjes y arqueros a pie. Mejoras: ataque, armadura (herrero); velocidad, PR (establo): velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 70,
    "attack": 2,
    "cost": {
      "Food": 55,
      "Gold": 60
    },
    "trainTime": 22,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": -3,
        "class": "Clase 39"
      }
    ]
  },
  "1759": {
    "name": "Ratha",
    "description": "Crear ratha () Arquero montado exclusivo de los bengalíes que puede alternar entre ataques cuerpo a cuerpo y a distancia. Fuerte contra infantería. Débil contra guerrilleros y jinetes de camellos Mejoras: ataque, armadura (herrero); ataque, precisión (universidad); velocidad, puntos de resistencia (establo); velocidad de creación, a ratha de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 100,
    "attack": 5,
    "cost": {
      "Gold": 60,
      "Wood": 60
    },
    "trainTime": 20,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 5,
        "class": "Unidades base"
      },
      {
        "amount": 1,
        "class": "Muros y puertas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 3,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 1,
        "class": "Monjes"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1761": {
    "name": "Ratha de élite",
    "description": "Crear ratha de élite () Arquero montado exclusivo de los bengalíes que puede alternar entre ataques cuerpo a cuerpo y a distancia. Fuerte contra infantería. Débil contra guerrilleros y jinetes de camellos. Mejoras: ataque, armadura (herrero); ataque, precisión (universidad); velocidad, puntos de resistencia (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 115,
    "attack": 6,
    "cost": {
      "Gold": 60,
      "Wood": 60
    },
    "trainTime": 18,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 6,
        "class": "Unidades base"
      },
      {
        "amount": 2,
        "class": "Muros y puertas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 3,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 1,
        "class": "Monjes"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1786": {
    "name": "Lancero",
    "description": "Crear Lancero () Infantería anticaballería. Fuerte contra unidades montadas, especialmente elefantes. Débil contra soldados a distancia e infantería. Mejoras: ataque, armadura (herrero); velocidad, a piquero (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 45,
    "attack": 3,
    "cost": {
      "Food": 35,
      "Wood": 25
    },
    "trainTime": 22,
    "reloadTime": 3,
    "advancedAttacks": [
      {
        "amount": 1,
        "class": "Clase 29"
      },
      {
        "amount": 1,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 15,
        "class": "Clase 5"
      },
      {
        "amount": 3,
        "class": "Lanzapicas"
      },
      {
        "amount": 15,
        "class": "Caballería"
      },
      {
        "amount": 9,
        "class": "Clase 16"
      },
      {
        "amount": 12,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 9,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Muros y puertas"
      },
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1787": {
    "name": "Piquero",
    "description": "Crear piquero () Infantería anticaballería. Fuerte contra unidades montadas, especialmente elefantes. Débil contra soldados a distancia e infantería. Mejoras: ataque, armadura (herrero); velocidad, a alabardero (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 55,
    "attack": 4,
    "cost": {
      "Food": 35,
      "Wood": 25
    },
    "trainTime": 22,
    "reloadTime": 3,
    "advancedAttacks": [
      {
        "amount": 1,
        "class": "Clase 29"
      },
      {
        "amount": 1,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 25,
        "class": "Clase 5"
      },
      {
        "amount": 4,
        "class": "Lanzapicas"
      },
      {
        "amount": 22,
        "class": "Caballería"
      },
      {
        "amount": 16,
        "class": "Clase 16"
      },
      {
        "amount": 18,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 7,
        "class": "Clase 35"
      },
      {
        "amount": 16,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Muros y puertas"
      },
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1788": {
    "name": "Alabardero",
    "description": "Crear alabardero () Infantería anticaballería. Fuerte contra unidades montadas, especialmente elefantes. Débil contra soldados a distancia e infantería. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 60,
    "attack": 6,
    "cost": {
      "Food": 35,
      "Wood": 25
    },
    "trainTime": 22,
    "reloadTime": 3,
    "advancedAttacks": [
      {
        "amount": 1,
        "class": "Clase 29"
      },
      {
        "amount": 1,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 28,
        "class": "Clase 5"
      },
      {
        "amount": 6,
        "class": "Lanzapicas"
      },
      {
        "amount": 32,
        "class": "Caballería"
      },
      {
        "amount": 17,
        "class": "Clase 16"
      },
      {
        "amount": 26,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 7,
        "class": "Clase 35"
      },
      {
        "amount": 17,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Muros y puertas"
      },
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1790": {
    "name": "Centurión",
    "description": "Crear un centurión () Unidad de caballería pesada romana única que aumenta el movimiento y la velocidad de ataque de las unidades cercanas de la línea de milicia. Fuerte contra infantería y arqueros a pie. Débil contra lanceros y jinetes de camello. Mejoras: ataque, armadura (herrero); velocidad, PR (establos); velocidad de creación a centurión de élite (castillo); más resistente a los monjes (monasterio).",
    "hp": 110,
    "attack": 13,
    "cost": {
      "Food": 75,
      "Gold": 85
    },
    "trainTime": 24,
    "reloadTime": 1.9,
    "advancedAttacks": [
      {
        "amount": 13,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1792": {
    "name": "Centurión de élite",
    "description": "Crear un centurión de élite () Unidad de caballería pesada romana única que aumenta el movimiento y la velocidad de ataque de las unidades cercanas de la línea de milicia. Fuerte contra infantería y arqueros a pie. Débil contra lanceros y jinetes de camello. Mejoras: ataque, armadura (herrero); velocidad, PR (establo); velocidad de creación (castillo); más resistente a los monjes (monasterio).",
    "hp": 155,
    "attack": 15,
    "cost": {
      "Food": 75,
      "Gold": 85
    },
    "trainTime": 24,
    "reloadTime": 1.9,
    "advancedAttacks": [
      {
        "amount": 15,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 3,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1793": {
    "name": "Legionario",
    "description": "Crear legionario ()  Unidad de infantería romana versátil. Excepcionalmente fuerte contra infantería. Fuerte contra edificios, caballería de exploración y guerrilleros. Débil contra soldados a larga distancia. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 75,
    "attack": 12,
    "cost": {
      "Food": 50,
      "Gold": 20
    },
    "trainTime": 21,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 8,
        "class": "Clase 29"
      },
      {
        "amount": 4,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 4,
        "class": "Infantería"
      },
      {
        "amount": 12,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1795": {
    "name": "Dromón",
    "description": "Construir un dromón () Barco de guerra de asedio antiedificios de largo alcance y con un ataque explosivo de largo alcance, pero que no puede atacar a los enemigos a corta distancia. Fuerte contra edificios. Débil contra unidades en distancias cortas. Mejoras: armadura, velocidad, coste, velocidad de creación (muelle); ataque, alcance (universidad); más resistente a los monjes (monasterio).",
    "hp": 125,
    "attack": 8,
    "cost": {
      "Gold": 150,
      "Wood": 175
    },
    "trainTime": 65,
    "reloadTime": 8,
    "advancedAttacks": [
      {
        "amount": 8,
        "class": "Lanzapicas"
      },
      {
        "amount": 34,
        "class": "Edificios"
      },
      {
        "amount": 2,
        "class": "Cañones de asedio"
      },
      {
        "amount": 15,
        "class": "Clase 22"
      },
      {
        "amount": 9,
        "class": "Clase 26"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Clase 16"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 6,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 60"
      }
    ]
  },
  "1800": {
    "name": "Arquero con arco compuesto",
    "description": "Unidad de arquero exclusiva de los armenios que ignora la armadura. Fuerte contra infantería y caballería. Débil contra unidades de arquería y armas de asedio.",
    "hp": 40,
    "attack": 4,
    "cost": {
      "Wood": 25,
      "Gold": 45
    },
    "trainTime": 12,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 4,
        "class": "Perforante base"
      }
    ],
    "advancedArmors": [
      {
        "amount": 1,
        "class": "Cuerpo a cuerpo"
      }
    ]
  },
  "1802": {
    "name": "Arquero con arco compuesto de élite",
    "description": "Crear arquero con arco compuesto de élite () Arquero a pie exclusivo de los armenios que ignora la armadura. Fuerte contra infantería y caballería. Débil contra arqueros y armas de asedio. Mejoras: ataque, alcance, armadura (herrero); precisión, armadura (galería de tiro con arco); ataque, precisión (universidad); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 45,
    "attack": 4,
    "cost": {
      "Gold": 45,
      "Wood": 35
    },
    "trainTime": 10,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Muros y puertas"
      },
      {
        "amount": 4,
        "class": "Unidades base"
      }
    ],
    "advancedArmors": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1803": {
    "name": "Monaspa",
    "description": "Crear monaspa () Caballería pesada exclusiva de los georgianos que se vuelve más fuerte cuando hay otros monaspas o unidades de caballería cerca. Fuerte contra infantería y caballería. Débil contra la línea de lanceros y monjes. Mejoras: ataque, armadura (herrero); velocidad, PR (establo); velocidad de creación a monaspa de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 70,
    "attack": 12,
    "cost": {
      "Food": 60,
      "Gold": 45
    },
    "trainTime": 14,
    "reloadTime": 1.8,
    "advancedAttacks": [
      {
        "amount": 12,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 3,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1805": {
    "name": "Monaspa de élite",
    "description": "Crear monaspa de élite () Caballería pesada exclusiva de los georgianos que se vuelve más fuerte cuando hay otros monaspas o unidades de caballería cerca. Fuerte contra infantería y caballería. Débil contra lanceros y monjes. Mejoras: ataque, armadura (herrero); velocidad, PR (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 80,
    "attack": 14,
    "cost": {
      "Food": 60,
      "Gold": 45
    },
    "trainTime": 14,
    "reloadTime": 1.8,
    "advancedAttacks": [
      {
        "amount": 14,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 5,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1811": {
    "name": "Sacerdote guerrero",
    "description": "Crear sacerdote guerrero () Infantería monástica exclusiva de los armenios que puede curar a las unidades aliadas. Puede recoger reliquias y llevarlas a los monasterios. Fuerte contra infantería. Débil contra caballería de exploración y arqueros. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); PR, velocidad, mayor resistencia a los monjes (monasterio).",
    "hp": 80,
    "attack": 11,
    "cost": {
      "Food": 30,
      "Gold": 50
    },
    "trainTime": 30,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 11,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Clase 25"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1813": {
    "name": "Savar",
    "description": "Crear savar () Caballería pesada polivalente única de los persas. Excepcionalmente fuerte contra unidades a distancia. Débil contra lanceros, jinetes de camello y monjes. Mejoras: ataque, armadura (herrero); velocidad, PR (establo); mayor resistencia a los monjes (monasterio).",
    "hp": 145,
    "attack": 14,
    "cost": {
      "Food": 60,
      "Gold": 75
    },
    "trainTime": 30,
    "reloadTime": 1.8,
    "advancedAttacks": [
      {
        "amount": 14,
        "class": "Lanzapicas"
      },
      {
        "amount": 2,
        "class": "Embarcaciones"
      }
    ],
    "advancedArmors": [
      {
        "amount": 3,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 4,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1901": {
    "name": "Lancero incendiario",
    "description": "Crear lancero incendiario () Infantería de choque de pólvora que dispara un arma de fuego de corto alcance antes de entrar en combate cuerpo a cuerpo. Fuerte contra caballería y edificios. Débil contra línea de milicias y unidades de arqueros. Mejoras: ataque, armadura (herrero); velocidad, armadura antiperforación, a lancero incendiario de élite (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 65,
    "attack": 9,
    "cost": {
      "Gold": 45,
      "Wood": 40
    },
    "trainTime": 32,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 1,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 9,
        "class": "Lanzapicas"
      },
      {
        "amount": 5,
        "class": "Caballería"
      },
      {
        "amount": 4,
        "class": "Clase 16"
      },
      {
        "amount": 4,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 4,
        "class": "Clase 34"
      },
      {
        "amount": 5,
        "class": "Clase 5"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Clase 29"
      },
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 23"
      }
    ]
  },
  "1903": {
    "name": "Lancero incendiario de élite",
    "description": "Crear lancero incendiario de élite () Infantería de choque de pólvora que dispara un arma de fuego de corto alcance antes de entrar en combate cuerpo a cuerpo. Fuerte contra caballería y edificios. Débil contra línea de milicias y unidades de arqueros. Mejoras: ataque, armadura (herrero); velocidad, armadura antiperforación (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 85,
    "attack": 10,
    "cost": {
      "Gold": 45,
      "Wood": 40
    },
    "trainTime": 25,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 1,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 10,
        "class": "Lanzapicas"
      },
      {
        "amount": 15,
        "class": "Caballería"
      },
      {
        "amount": 12,
        "class": "Clase 16"
      },
      {
        "amount": 12,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 12,
        "class": "Clase 34"
      },
      {
        "amount": 15,
        "class": "Clase 5"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Clase 29"
      },
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 23"
      }
    ]
  },
  "1904": {
    "name": "Carro de cohetes",
    "description": "Crear carro de cohetes () Unidad de pólvora de asedio con ataque explosivo de largo alcance que no puede atacar a corta distancia. Fuerte contra grupos compactos de unidades. Débil contra unidades a corta distancia. Puede atacar terreno. Mejoras: ataque, alcance (universidad); a carro de cohetes pesado (taller de maquinaria de asedio); mayor resistencia a los monjes (monasterio).",
    "hp": 45,
    "attack": 5,
    "cost": {
      "Gold": 155,
      "Wood": 130
    },
    "trainTime": 40,
    "reloadTime": 5.5,
    "advancedAttacks": [
      {
        "amount": 7,
        "class": "Edificios"
      },
      {
        "amount": 5,
        "class": "Lanzapicas"
      },
      {
        "amount": 2,
        "class": "Cañones de asedio"
      },
      {
        "amount": 5,
        "class": "Clase 37"
      },
      {
        "amount": 7,
        "class": "Clase 26"
      },
      {
        "amount": 6,
        "class": "Clase 22"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 6,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 23"
      }
    ]
  },
  "1907": {
    "name": "Carro de cohetes pesado",
    "description": "Crear carro de cohetes pesado () Unidad de pólvora de asedio con ataque explosivo de largo alcance que no puede atacar a corta distancia. Fuerte contra grupos compactos de unidades. Débil contra unidades a corta distancia. Puede atacar terreno y derribar árboles. Mejoras: ataque, alcance (universidad); mayor resistencia a los monjes (monasterio).",
    "hp": 65,
    "attack": 5,
    "cost": {
      "Gold": 155,
      "Wood": 130
    },
    "trainTime": 40,
    "reloadTime": 5.35,
    "advancedAttacks": [
      {
        "amount": 12,
        "class": "Edificios"
      },
      {
        "amount": 5,
        "class": "Lanzapicas"
      },
      {
        "amount": 2,
        "class": "Cañones de asedio"
      },
      {
        "amount": 5,
        "class": "Clase 37"
      },
      {
        "amount": 7,
        "class": "Clase 26"
      },
      {
        "amount": 7,
        "class": "Clase 22"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 8,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 23"
      }
    ]
  },
  "1908": {
    "name": "Pagoda de hierro",
    "description": "Crear pagoda de hierro () Caballería pesada exclusiva de los yurchen con una armadura resistente que puede bloquear totalmente los ataques cuerpo a cuerpo. Fuerte contra infantería y soldados a distancia. Débil contra línea de lanceros y jinetes de camello. Mejoras: ataque, armadura (herrero); velocidad, puntos de resistencia (establo); velocidad de creación, a pagoda de hierro de élite (castillo), mayor resistencia a los monjes (monasterio).",
    "hp": 115,
    "attack": 12,
    "cost": {
      "Food": 80,
      "Gold": 55
    },
    "trainTime": 14,
    "reloadTime": 2.16,
    "advancedAttacks": [
      {
        "amount": 12,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1910": {
    "name": "Pagoda de hierro de élite",
    "description": "Crear pagoda de hierro de élite () Caballería pesada exclusiva de los yurchen con una armadura resistente que puede bloquear totalmente los ataques cuerpo a cuerpo. Fuerte contra infantería y soldados a distancia. Débil contra línea de lanceros y jinetes de camello. Mejoras: ataque, armadura (herrero); velocidad, puntos de resistencia (establo); velocidad de creación (castillo), mayor resistencia a los monjes (monasterio).",
    "hp": 140,
    "attack": 13,
    "cost": {
      "Food": 80,
      "Gold": 55
    },
    "trainTime": 14,
    "reloadTime": 2.16,
    "advancedAttacks": [
      {
        "amount": 13,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1911": {
    "name": "Granadero",
    "description": "Crear granadero () Unidad de pólvora exclusiva de los yurchen con ataque explosivo a distancia que no puede atacar a corta distancia. Fuerte contra infantería y grupos compactos de unidades. Débil contra soldados a distancia y unidades a corta distancia. Mejoras: armadura (herrero); precisión, alcance (universidad); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 40,
    "attack": 12,
    "cost": {
      "Food": 35,
      "Gold": 65
    },
    "trainTime": 21,
    "reloadTime": 3.45,
    "advancedAttacks": [
      {
        "amount": 1,
        "class": "Muros y puertas"
      },
      {
        "amount": 4,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 12,
        "class": "Unidades base"
      },
      {
        "amount": 3,
        "class": "Clase 17"
      },
      {
        "amount": 9,
        "class": "Infantería"
      }
    ],
    "advancedArmors": [
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 23"
      }
    ]
  },
  "1920": {
    "name": "Liao Dao",
    "description": "Crear Liao Dao () Infantería exclusiva de los kitán con un poderoso ataque que hiere a los enemigos y les inflige daño permanente. Fuerte contra caballería e infantería. Débil contra soldados a distancia a larga distancia. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación, a Liao Dao de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 75,
    "attack": 9,
    "cost": {
      "Food": 40,
      "Gold": 40
    },
    "trainTime": 12,
    "reloadTime": 2.4,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Clase 29"
      },
      {
        "amount": 2,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 9,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 3,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1922": {
    "name": "Liao Dao de élite",
    "description": "Crear Liao Dao de élite () Infantería exclusiva de los kitán con un poderoso ataque que hiere a los enemigos y les inflige daño permanente. Fuerte contra caballería e infantería. Débil contra soldados a distancia a larga distancia. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 85,
    "attack": 13,
    "cost": {
      "Food": 40,
      "Gold": 40
    },
    "trainTime": 12,
    "reloadTime": 2.4,
    "advancedAttacks": [
      {
        "amount": 3,
        "class": "Clase 29"
      },
      {
        "amount": 3,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 13,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 3,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1923": {
    "name": "Trebuchet montado",
    "description": "Crear trebuchet montado () Caballería de asedio exclusiva de los kitán de largo alcance que no puede atacar a corta distancia. Los proyectiles dejan unas llamas persistentes sobre el terreno. Fuerte contra armas de asedio y grupos compactos de unidades. Débil contra unidades a corta distancia. Mejoras: armadura (herrero); ataque, alcance (universidad); velocidad, puntos de resistencia (establo); mayor resistencia a los monjes (monasterio).",
    "hp": 75,
    "attack": 30,
    "cost": {
      "Food": 175,
      "Gold": 175
    },
    "trainTime": 46,
    "reloadTime": 6.5,
    "advancedAttacks": [
      {
        "amount": 10,
        "class": "Edificios"
      },
      {
        "amount": 30,
        "class": "Lanzapicas"
      },
      {
        "amount": 30,
        "class": "Cañones de asedio"
      },
      {
        "amount": 30,
        "class": "Clase 37"
      }
    ],
    "advancedArmors": [
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 4,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Clase 37"
      },
      {
        "amount": 0,
        "class": "Elefantes de guerra"
      },
      {
        "amount": -3,
        "class": "Clase 39"
      }
    ]
  },
  "1942": {
    "name": "Trebuchet de tracción",
    "description": "Construir mangonel () Poderosa arma de asedio antiedificios con gran alcance, pero que no puede atacar a corta distancia. Fuerte contra edificios. Puede atacar terreno y destruir árboles. Mejoras: ataque, alcance (universidad); mayor resistencia a los monjes (monasterio).",
    "hp": 115,
    "attack": 50,
    "cost": {
      "Gold": 210,
      "Wood": 175
    },
    "trainTime": 70,
    "reloadTime": 11,
    "advancedAttacks": [
      {
        "amount": 230,
        "class": "Edificios"
      },
      {
        "amount": 50,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 1,
        "class": "Lanzapicas"
      },
      {
        "amount": 8,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Clase 17"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1944": {
    "name": "Caballería de Hei Guang",
    "description": "Crear caballería de Hei Guang () Caballería pesada, poderosa y polivalente. Fuerte contra infantería y arqueros a pie. Débil contra líneas de lanceros, jinetes de camello y monjes. Mejoras: ataque, armadura (herrero); velocidad, PR, a caballería pesada de Hei Guang (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 60,
    "attack": 11,
    "cost": {
      "Food": 65,
      "Gold": 65
    },
    "trainTime": 28,
    "reloadTime": 1.8,
    "advancedAttacks": [
      {
        "amount": 11,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 4,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1946": {
    "name": "Caballería pesada de Hei Guang",
    "description": "Crear caballería pesada de Hei Guang () Caballería pesada, poderosa y polivalente. Fuerte contra infantería y arqueros a pie. Débil contra líneas de lanceros, jinetes de camello y monjes. Mejoras: ataque, armadura (herrero); velocidad, PR (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 90,
    "attack": 12,
    "cost": {
      "Food": 65,
      "Gold": 65
    },
    "trainTime": 28,
    "reloadTime": 1.8,
    "advancedAttacks": [
      {
        "amount": 12,
        "class": "Lanzapicas"
      },
      {
        "amount": 1,
        "class": "Infantería"
      }
    ],
    "advancedArmors": [
      {
        "amount": 4,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1948": {
    "name": "Lou Chuan",
    "description": "Construir Lou Chan () Poderoso barco de guerra de asedio que dispara flechas a las unidades y utiliza un trebuchet de largo alcance contra edificios y armas de asedio, pero que no puede atacar a corta distancia. Fuerte contra edificios. Débil contra brulotes. Mejoras: armadura, velocidad, coste, velocidad de creación (muelle); ataque, alcance (herrero); ataque, alcance, precisión (universidad); mayor resistencia a los monjes (monasterio).",
    "hp": 175,
    "attack": 25,
    "cost": {
      "Gold": 225,
      "Wood": 250
    },
    "trainTime": 60,
    "reloadTime": 5,
    "advancedAttacks": [
      {
        "amount": 25,
        "class": "Lanzapicas"
      },
      {
        "amount": 230,
        "class": "Edificios"
      },
      {
        "amount": 10,
        "class": "Cañones de asedio"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Clase 16"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 9,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 60"
      }
    ]
  },
  "1949": {
    "name": "Caballería tigresa",
    "description": "Crear caballería tigresa () Caballería exclusiva de los Wei que obtiene PR y ataque al derrotar ejércitos enemigos. Extraordinariamente fuerte contra soldados a distancia. Débil contra líneas de lanceros. Mejoras: ataque, armadura (herrero); velocidad, PR (establo); velocidad de creación, a caballería tigresa de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 115,
    "attack": 11,
    "cost": {
      "Food": 60,
      "Gold": 80
    },
    "trainTime": 15,
    "reloadTime": 1.9,
    "advancedAttacks": [
      {
        "amount": 11,
        "class": "Lanzapicas"
      },
      {
        "amount": 6,
        "class": "Embarcaciones"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 4,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1951": {
    "name": "Caballería tigresa de élite",
    "description": "Crear Caballería tigresa de elite () Caballería exclusiva de Wei que obtiene PR y ataque al derrotar a ejércitos enemigos. Extraordinariamente fuerte contra soldados a distancia. Débil contra líneas de lanceros. Mejoras: ataque, armadura (herrero); velocidad, PR (establo); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 130,
    "attack": 13,
    "cost": {
      "Food": 60,
      "Gold": 80
    },
    "trainTime": 15,
    "reloadTime": 1.9,
    "advancedAttacks": [
      {
        "amount": 13,
        "class": "Lanzapicas"
      },
      {
        "amount": 7,
        "class": "Embarcaciones"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 5,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1952": {
    "name": "Saqueador xianbei",
    "description": "Crear saqueador xianbei () Arquero montado exclusivo de los Wei con un ataque a distancia cargado. Fuerte contra la infantería. Débil contra los guerrilleros y los jinetes de camellos. Mejoras: ataque, alcance, armadura (herrería); velocidad, PR (establo); precisión, armadura (galería de tiro con arco); ataque, precisión (universidad); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 30,
    "attack": 5,
    "cost": {
      "Gold": 25,
      "Wood": 60
    },
    "trainTime": 26,
    "reloadTime": 1.8,
    "advancedAttacks": [
      {
        "amount": 3,
        "class": "Muros y puertas"
      },
      {
        "amount": 5,
        "class": "Unidades base"
      },
      {
        "amount": 1,
        "class": "Infantería"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Monjes"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1954": {
    "name": "Cao Cao",
    "description": "Crear a Cao Cao () Héroe de caballería exclusivo de los Wei que aumenta la velocidad de ataque de las unidades cercanas. Extremadamente poderoso. Solo se puede tener uno y no se puede convertir. Mejoras: ataque, armadura (herrero); velocidad, PR (establo); velocidad de creación (castillo).",
    "hp": 475,
    "attack": 14,
    "cost": {
      "Food": 500,
      "Gold": 500
    },
    "trainTime": 60,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 14,
        "class": "Lanzapicas"
      },
      {
        "amount": 3,
        "class": "Embarcaciones"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 3,
        "class": "Lanzapicas"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 36"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      }
    ]
  },
  "1959": {
    "name": "Guardia de la pluma blanca",
    "description": "Crear guardia de la pluma blanca () Infantería exclusiva de los Shu que ralentiza temporalmente a la unidad que ataca. Fuerte contra caballería. Débil contra soldados a distancia. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación, mejorar a guardia de la pluma blanca de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 95,
    "attack": 7,
    "cost": {
      "Food": 60,
      "Gold": 15
    },
    "trainTime": 11,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 4,
        "class": "Clase 29"
      },
      {
        "amount": 2,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 7,
        "class": "Lanzapicas"
      },
      {
        "amount": 8,
        "class": "Caballería"
      },
      {
        "amount": 6,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 8,
        "class": "Clase 5"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1961": {
    "name": "Guardia de la pluma blanca de élite",
    "description": "Crear guardia de la pluma blanca de élite () Infantería exclusiva de los Shu que ralentiza temporalmente a la unidad que ataca. Fuerte contra caballería. Débil contra soldados a distancia. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 100,
    "attack": 8,
    "cost": {
      "Food": 60,
      "Gold": 15
    },
    "trainTime": 11,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 4,
        "class": "Clase 29"
      },
      {
        "amount": 2,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 8,
        "class": "Lanzapicas"
      },
      {
        "amount": 8,
        "class": "Caballería"
      },
      {
        "amount": 7,
        "class": "Elefantes de guerra"
      },
      {
        "amount": 8,
        "class": "Clase 5"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1962": {
    "name": "Carro de guerra (disparo concentrado)",
    "description": "Construir carro de guerra () Caballería de asedio exclusiva de los Shu con ataque de disparo rápido, pero no puede atacar a corta distancia. Cuenta con un tiempo de recarga muy largo. Puede cambiar a un modo de bombardeo que cubre más área, pero es menos preciso. Fuerte contra soldados a distancia. Débil contra caballería y armas de asedio. Mejoras: armadura (herrero); velocidad, PR (establo); ataque, alcance (universidad); mayor resistencia a los monjes (monasterio).",
    "hp": 65,
    "attack": 8,
    "cost": {
      "Food": 65,
      "Gold": 90
    },
    "trainTime": 28,
    "reloadTime": 6.5,
    "advancedAttacks": [
      {
        "amount": 8,
        "class": "Unidades base"
      },
      {
        "amount": 2,
        "class": "Edificios"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 5,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 37"
      }
    ]
  },
  "1966": {
    "name": "Liu Bei",
    "description": "Crear a Liu Bei () Héroe de infantería exclusivo de los Shu que cura a todas las unidades cercanas. Extremadamente poderoso. Solo se puede tener uno y no se puede convertir. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo).",
    "hp": 425,
    "attack": 15,
    "cost": {
      "Food": 500,
      "Gold": 500
    },
    "trainTime": 60,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 15,
        "class": "Lanzapicas"
      },
      {
        "amount": 3,
        "class": "Clase 29"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 3,
        "class": "Lanzapicas"
      },
      {
        "amount": 3,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 36"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      }
    ]
  },
  "1968": {
    "name": "Arquero de fuego",
    "description": "Crear arquero de fuego () Arquero a pie exclusivo de los Wu que dispara múltiples flechas contra edificios. Fuerte contra infantería, armas de asedio y edificios. Débil contra caballería y guerrilleros. Mejoras: ataque, alcance, armadura (herrero); precisión (galería de tiro con arco); ataque, precisión (universidad); velocidad de creación, mejorar a arquero de fuego de élite (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 35,
    "attack": 4,
    "cost": {
      "Gold": 45,
      "Wood": 45
    },
    "trainTime": 17,
    "reloadTime": 3.5,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Muros y puertas"
      },
      {
        "amount": 4,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 4,
        "class": "Unidades base"
      },
      {
        "amount": 3,
        "class": "Clase 16"
      },
      {
        "amount": 3,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1970": {
    "name": "Arquero de fuego de élite",
    "description": "Crear arquero de fuego de élite () Arquero a pie exclusivo de los Wu que dispara múltiples flechas contra las unidades y usa un ataque de largo alcance contra los edificios. Fuerte contra infantería, armas de asedio y edificios. Débil contra caballería y guerrilleros. Mejoras: ataque, alcance, armadura (herrero); precisión (galería de tiro con arco); ataque, precisión (universidad); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 40,
    "attack": 5,
    "cost": {
      "Gold": 45,
      "Wood": 45
    },
    "trainTime": 17,
    "reloadTime": 3.5,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Muros y puertas"
      },
      {
        "amount": 4,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 5,
        "class": "Unidades base"
      },
      {
        "amount": 4,
        "class": "Clase 16"
      },
      {
        "amount": 4,
        "class": "Clase 34"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Embarcaciones"
      },
      {
        "amount": 0,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "1974": {
    "name": "Espadachín de Jian",
    "description": "Crear espadachín de Jian () Infantería de choque exclusiva de los Wu que obtiene velocidad de movimiento y ataque, pero pierde armadura cuando se alcanza un umbral de daño. Extremadamente fuerte contra arqueros. Débil contra milicia. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 70,
    "attack": 8,
    "cost": {
      "Food": 45,
      "Gold": 50
    },
    "trainTime": 35,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 2,
        "class": "Unidades de pólvora"
      },
      {
        "amount": 8,
        "class": "Lanzapicas"
      },
      {
        "amount": 4,
        "class": "Embarcaciones"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Infantería"
      },
      {
        "amount": 2,
        "class": "Lanzapicas"
      },
      {
        "amount": 5,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 29"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      }
    ]
  },
  "1978": {
    "name": "Sun Jian",
    "description": "Crear a Sun Jian () Héroe de caballería exclusivo de los Wu, que aumenta la velocidad de movimiento de las unidades cercanas. Extremadamente poderoso. Solo se puede tener uno y no se puede convertir. Mejoras: ataque, armadura (herrero); velocidad (cuarteles); velocidad de creación (castillo).",
    "hp": 400,
    "attack": 15,
    "cost": {
      "Food": 500,
      "Gold": 500
    },
    "trainTime": 60,
    "reloadTime": 2,
    "advancedAttacks": [
      {
        "amount": 15,
        "class": "Lanzapicas"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 4,
        "class": "Lanzapicas"
      },
      {
        "amount": 4,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 36"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      }
    ]
  },
  "1980": {
    "name": "Carro de guerra (barrera)",
    "description": "Construir carro de guerra () Caballería de asedio exclusiva de los Shu con ataque de disparo rápido, pero no puede atacar a corta distancia. Cuenta con un tiempo de recarga muy largo. Puede cambiar a un modo de bombardeo que cubre más área, pero es menos preciso. Fuerte contra soldados a distancia. Débil contra caballería y armas de asedio. Mejoras: armadura (herrero); velocidad, PR (establo); ataque, alcance (universidad); mayor resistencia a los monjes (monasterio).",
    "hp": 65,
    "attack": 8,
    "cost": {
      "Food": 65,
      "Gold": 90
    },
    "trainTime": 28,
    "reloadTime": 6.5,
    "advancedAttacks": [
      {
        "amount": 8,
        "class": "Unidades base"
      },
      {
        "amount": 2,
        "class": "Edificios"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 0,
        "class": "Caballería"
      },
      {
        "amount": 5,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Cañones de asedio"
      },
      {
        "amount": 0,
        "class": "Unidades únicas"
      },
      {
        "amount": 0,
        "class": "Camellos"
      },
      {
        "amount": 0,
        "class": "Clase 37"
      }
    ]
  },
  "999440": {
    "name": "Petardo",
    "description": "Crear petardo () Unidad de asedio de demolición armada con explosivos. Fuerte contra edificios. Débil contra otras unidades. Se autodestruye al usarse. Mejoras: ataque (universidad); velocidad de creación (castillo); mayor resistencia a los monjes (monasterio).",
    "hp": 50,
    "attack": 25,
    "cost": {
      "Food": 65,
      "Gold": 20
    },
    "trainTime": 25,
    "reloadTime": 0,
    "advancedAttacks": [
      {
        "amount": 100,
        "class": "Clase 26"
      },
      {
        "amount": 500,
        "class": "Edificios"
      },
      {
        "amount": 25,
        "class": "Lanzapicas"
      },
      {
        "amount": 60,
        "class": "Cañones de asedio"
      },
      {
        "amount": 900,
        "class": "Clase 22"
      }
    ],
    "advancedArmors": [
      {
        "amount": 0,
        "class": "Lanzapicas"
      },
      {
        "amount": 2,
        "class": "Unidades base"
      },
      {
        "amount": 0,
        "class": "Camellos"
      }
    ]
  },
  "3_tech": {
    "name": "Yeomen",
    "description": "Investigar Yeomen () Los arqueros a pie y la línea de guerrilleros obtienen +1 de alcance; la línea de atalayas obtiene +2 de ataque.",
    "cost": {
      "Gold": 450,
      "Wood": 750
    }
  },
  "4_tech": {
    "name": "El Dorado",
    "description": "Investigar El Dorado () Los guerreros águila obtienen +40 PR.",
    "cost": {
      "Food": 750,
      "Gold": 450
    }
  },
  "5_tech": {
    "name": "Furor celta",
    "description": "Investigar Furor celta () Las armas de asedio obtienen un 40 % más de PR.",
    "cost": {
      "Food": 750,
      "Gold": 450
    }
  },
  "6_tech": {
    "name": "Instrucción militar",
    "description": "Investigar Instrucción militar () Las unidades del taller de maquinaria de asedio se mueven un 50 % más rápido.",
    "cost": {
      "Gold": 450,
      "Wood": 500
    }
  },
  "7_tech": {
    "name": "Ciudadelas",
    "description": "Investigar Ciudadelas () Los castillos obtienen +4 de ataque, +3 contra arietes, +3 contra infantería, y reciben un 25 % menos de daño adicional.",
    "cost": {
      "Gold": 300,
      "Wood": 600
    }
  },
  "8_tech": {
    "name": "Guardia urbana",
    "description": "Investigar Guardia urbana () Los edificios obtienen +4 al campo de visión.",
    "cost": {
      "Food": 75
    }
  },
  "10_tech": {
    "name": "Artillería",
    "description": "Investigar Artillería () Torres de bombarda, cañones de asedio y galeones artillados obtienen +2 de alcance.",
    "cost": {
      "Food": 600,
      "Gold": 650
    }
  },
  "11_tech": {
    "name": "Almenas",
    "description": "Investigar Almenas () Los castillos obtienen +3 de alcance y la infantería guarnecida dispara flechas.",
    "cost": {
      "Food": 600,
      "Stone": 400
    }
  },
  "12_tech": {
    "name": "Rotación de cultivos",
    "description": "Investigar Rotación de cultivos () Las granjas nuevas proporcionan +175 de comida.",
    "cost": {
      "Food": 250,
      "Wood": 250
    }
  },
  "13_tech": {
    "name": "Arado pesado",
    "description": "Investigar Arado pesado () Las granjas nuevas proporcionan +125 de comida. Los granjeros obtienen +1 de capacidad de carga.",
    "cost": {
      "Food": 125,
      "Wood": 125
    }
  },
  "14_tech": {
    "name": "Collera",
    "description": "Investigar Collera () Las granjas nuevas proporcionan +75 de comida.",
    "cost": {
      "Food": 75,
      "Wood": 75
    }
  },
  "15_tech": {
    "name": "Gremios",
    "description": "Investigar Gremios () La tarifa de mercado se reduce al 15 %.",
    "cost": {
      "Food": 300,
      "Gold": 200
    }
  },
  "16_tech": {
    "name": "Anarquía",
    "description": "Investigar Anarquía () Los huscarles se pueden entrenar en los cuarteles.",
    "cost": {
      "Food": 450,
      "Gold": 250
    }
  },
  "17_tech": {
    "name": "Banca",
    "description": "Investigar Banca () Los tributos a otros jugadores son gratuitos.",
    "cost": {
      "Food": 300,
      "Gold": 200
    }
  },
  "19_tech": {
    "name": "Cartografía",
    "description": "Desarrollar Cartografía () Tú y tus aliados compartís el mismo campo de visión (ves lo que ellos ven).",
    "cost": {
      "Food": 0,
      "Gold": 0
    }
  },
  "21_tech": {
    "name": "Ateísmo",
    "description": "Investigar Ateísmo () Las reliquias enemigas generan un 50 % menos de recursos; las victorias por reliquia y maravilla tardan más de 100 años.",
    "cost": {
      "Food": 500,
      "Wood": 300
    }
  },
  "22_tech": {
    "name": "Telar",
    "description": "Investigar Telar () Los aldeanos obtienen +15 PR, +1 de armadura cuerpo a cuerpo y +2 de armadura antiperforación.",
    "cost": {
      "Gold": 50
    }
  },
  "23_tech": {
    "name": "Acuñación",
    "description": "Investigar Acuñación () Los tributos a otros jugadores solo cuestan un 20 %.",
    "cost": {
      "Food": 200,
      "Gold": 100
    }
  },
  "24_tech": {
    "name": "Guerras Floridas",
    "description": "Investigar Guerras florales () La infantería obtiene +4 de ataque.",
    "cost": {
      "Food": 450,
      "Gold": 750
    }
  },
  "28_tech": {
    "name": "Bimaristán",
    "description": "Investigar Bimaristán () Los monjes curan pasivamente a varias unidades cercanas.",
    "cost": {
      "Gold": 200,
      "Wood": 300
    }
  },
  "39_tech": {
    "name": "Ganadería",
    "description": "Investigar Ganadería () Las unidades montadas se mueven un 10 % más rápido.",
    "cost": {
      "Food": 150
    }
  },
  "45_tech": {
    "name": "Fe",
    "description": "Desarrollar Fe () Las unidades son un 50 % más difíciles de convertir por los monjes enemigos.",
    "cost": {
      "Food": 550,
      "Gold": 750
    }
  },
  "46_tech": {
    "name": "Devoción",
    "description": "Desarrollar Devoción () Las unidades son un 15 % más difíciles de convertir por los monjes enemigos.",
    "cost": {
      "Food": 100,
      "Gold": 200
    }
  },
  "47_tech": {
    "name": "Química",
    "description": "Investigar Química () Los arqueros a pie, guerrilleros, arqueros montados, barcos de guerra a distancia y fortificaciones a distancia obtienen +1 de ataque Se necesita para unidades de pólvora (artillero manual, galeón artillado, cañón de asedio, torre de bombarda).",
    "cost": {
      "Food": 300,
      "Gold": 200
    }
  },
  "48_tech": {
    "name": "Caravana",
    "description": "Investigar Caravana () Las unidades de comercio se mueven un 20% más rápido.",
    "cost": {
      "Food": 200,
      "Gold": 200
    }
  },
  "49_tech": {
    "name": "Bogsveigar",
    "description": "Investigar Bogsveigar () La línea de arqueros y drakkars obtienen +1 de ataque.",
    "cost": {
      "Food": 650,
      "Gold": 500
    }
  },
  "50_tech": {
    "name": "Albañilería",
    "description": "Investigar Albañilería () Los edificios obtienen +10 % PR, +1 de armadura de cuerpo a cuerpo y +1 de armadura antiperforación y +3 de armadura de edificios.",
    "cost": {
      "Food": 150,
      "Wood": 175
    }
  },
  "51_tech": {
    "name": "Arquitectura",
    "description": "Investigar Arquitectura () Los edificios obtienen +10 % PR, +1 de armadura de cuerpo a cuerpo y +1 de armadura antiperforación y +3 de armadura de edificios.",
    "cost": {
      "Food": 300,
      "Wood": 200
    }
  },
  "52_tech": {
    "name": "Cohetería",
    "description": "Investigar Cohetería () Los escorpiones, los carros de cohetes y las unidades de Lou Chuan obtienen un +25 % de ataque; las unidades de Lou Chuan disparan cohetes.",
    "cost": {
      "Food": 1100,
      "Gold": 900
    }
  },
  "54_tech": {
    "name": "Grúa",
    "description": "Investigar Grúa () Los aldeanos construyen edificios un 20 % más rápido.",
    "cost": {
      "Stone": 50,
      "Wood": 200
    }
  },
  "55_tech": {
    "name": "Minería aurífera",
    "description": "Investigar Minería de oro () Los aldeanos extraen oro un 15 % más rápido.",
    "cost": {
      "Food": 100,
      "Wood": 75
    }
  },
  "59_tech": {
    "name": "Kataparuto",
    "description": "Investigar Kataparuto () Los trebuchets disparan y se arman y desarman más rápido.",
    "cost": {
      "Gold": 300,
      "Wood": 550
    }
  },
  "61_tech": {
    "name": "Logística",
    "description": "Investigar Logística () Las catafractas infligen daño de arrollamiento y obtienen +6 de ataque contra la infantería.",
    "cost": {
      "Food": 800,
      "Gold": 600
    }
  },
  "63_tech": {
    "name": "Fortaleza",
    "description": "Mejorar a fortaleza () Mejora las torres de guardia a fortalezas, que son más fuertes.",
    "cost": {
      "Food": 500,
      "Wood": 350
    }
  },
  "64_tech": {
    "name": "Torre de bombardeo",
    "description": "Investigar Torre de bombarda () Desbloquea torres de bombarda.",
    "cost": {
      "Food": 800,
      "Wood": 400
    }
  },
  "65_tech": {
    "name": "Red agallera",
    "description": "Investigar Red agallera () Los buques de pesca recogen comida un 20 % más rápido.",
    "cost": {
      "Food": 150,
      "Wood": 200
    }
  },
  "67_tech": {
    "name": "Forja",
    "description": "Investigar Forja () La infantería y la caballería obtienen +1 de ataque.",
    "cost": {
      "Food": 150
    }
  },
  "68_tech": {
    "name": "Fundición de hierro",
    "description": "Investigar Fundición de hierro () La infantería y la caballería obtienen +1 de ataque.",
    "cost": {
      "Food": 220,
      "Gold": 120
    }
  },
  "74_tech": {
    "name": "Armadura de láminas",
    "description": "Investigar Armadura de láminas () La infantería obtiene +1 de armadura cuerpo a cuerpo y +1 de armadura antiperforación.",
    "cost": {
      "Food": 100
    }
  },
  "75_tech": {
    "name": "Alto horno",
    "description": "Investigar Alto horno () La infantería y la caballería obtienen +2 de ataque.",
    "cost": {
      "Food": 275,
      "Gold": 225
    }
  },
  "76_tech": {
    "name": "Arm. cota de malla",
    "description": "Investigar Armadura de cota de malla () La infantería obtiene +1 de armadura cuerpo a cuerpo y +1 de armadura antiperforación.",
    "cost": {
      "Food": 200,
      "Gold": 100
    }
  },
  "77_tech": {
    "name": "Arm. placas malla",
    "description": "Investigar Armadura de placas de malla () La infantería obtiene +1 de armadura cuerpo a cuerpo y +2 de armadura antiperforación.",
    "cost": {
      "Food": 300,
      "Gold": 150
    }
  },
  "80_tech": {
    "name": "Arm. placas caball.",
    "description": "Investigar Barda de placas () La caballería obtiene +1 de armadura cuerpo a cuerpo y +2 de armadura antiperforación.",
    "cost": {
      "Food": 350,
      "Gold": 200
    }
  },
  "81_tech": {
    "name": "Arm. láminas caball.",
    "description": "Investigar Barda de escamas () La caballería obtiene +1 de armadura cuerpo a cuerpo y +1 de armadura antiperforación.",
    "cost": {
      "Food": 150
    }
  },
  "82_tech": {
    "name": "Cota malla caball.",
    "description": "Investigar Barda de malla () La caballería obtiene +1 de armadura cuerpo a cuerpo y +1 de armadura antiperforación.",
    "cost": {
      "Food": 250,
      "Gold": 150
    }
  },
  "83_tech": {
    "name": "Hacha de arista",
    "description": "Investigar Hacha de arista () Los lanzadores de hachas obtienen +1 de alcance.",
    "cost": {
      "Food": 300,
      "Gold": 300
    }
  },
  "90_tech": {
    "name": "Rastreo",
    "description": "Desarrollar Rastreo () La infantería tienen obtiene +2 de campo de visión para ver a las unidades enemigas desde más lejos.",
    "cost": {}
  },
  "93_tech": {
    "name": "Balística",
    "description": "Investigar Balística () Los arqueros a pie, los guerrilleros, los arqueros montados, los barcos de guerra a distancia, las fortificaciones a distancia y algunas armas de asedio disparan con mayor precisión a los objetivos en movimiento.",
    "cost": {
      "Gold": 175,
      "Wood": 300
    }
  },
  "101_tech": {
    "name": "Edad Feudal",
    "description": "Avanzar a la Edad Feudal (; dos edificios de la Alta Edad Media)  Mejora tu civilización. Puedes acceder a distintos edificios, unidades militares más poderosas y tecnologías más potentes. Antes de poder avanzar, debes tener dos edificios de la Alta Edad Media: campamento maderero, campamento minero, molino, muelle o cuartel.",
    "cost": {
      "Food": 500
    }
  },
  "102_tech": {
    "name": "Edad de los Castillos",
    "description": "Avanzar a la Edad de los Castillos (; dos edificios de la Edad Feudal)  Mejora tu civilización. Puedes acceder a distintos edificios, unidades militares más poderosas y tecnologías más potentes. Antes de poder avanzar, debes tener dos edificios de la Edad Feudal: galería de tiro con arco, establo, herrería o mercado.",
    "cost": {
      "Food": 800,
      "Gold": 200
    }
  },
  "103_tech": {
    "name": "Edad Imperial",
    "description": "Avanzar a la Edad Imperial (; dos edificios de la Edad de los Castillos o un castillo)  Mejora tu civilización. Puedes acceder a distintos edificios, unidades militares más poderosas y tecnologías más potentes. Antes de poder avanzar, debes tener un castillo/krepost o dos edificios cualesquiera de la Edad de los Castillos: universidad, taller de asedio o monasterio.",
    "cost": {
      "Food": 1000,
      "Gold": 800
    }
  },
  "140_tech": {
    "name": "Torre de guardia",
    "description": "Mejorar a torre de guardia () Mejora las atalayas y te permite construir torres de guardia, que son más fuertes.",
    "cost": {
      "Food": 100,
      "Wood": 250
    }
  },
  "182_tech": {
    "name": "Pozo minero aurífero",
    "description": "Investigar Pozo minero aurífero () Los aldeanos extraen oro un 15 % más rápido.",
    "cost": {
      "Food": 175,
      "Wood": 75
    }
  },
  "194_tech": {
    "name": "Muralla fortificada",
    "description": "Mejorar a muralla fortificada () Mejora murallas de piedra y puertas de piedra a puertas y murallas fortificadas, que son más fuertes.",
    "cost": {
      "Food": 200,
      "Wood": 100
    }
  },
  "199_tech": {
    "name": "Emplumado de flechas",
    "description": "Investigar Emplumado de flechas () Las unidades de arqueros, guerrilleros, barcos de guerra a distancia, fortificaciones a distancia reciben +1 de ataque, +1 al alcance; los centros urbanos reciben +1 de ataque.",
    "cost": {
      "Food": 100,
      "Gold": 50
    }
  },
  "200_tech": {
    "name": "Flecha de punzón",
    "description": "Investigar Flecha de punzón () Las unidades de arqueros, guerrilleros, barcos de guerra a distancia, fortificaciones a distancia obtienen +1 de ataque, +1 de alcance; los centros urbanos obtienen +1 de ataque.",
    "cost": {
      "Food": 200,
      "Gold": 100
    }
  },
  "201_tech": {
    "name": "Brazal",
    "description": "Investigar Brazalete de cuero () Las unidades de arqueros, guerrilleros, barcos de guerra a distancia, fortificaciones a distancia obtienen +1 de ataque, +1 al alcance; los centros urbanos obtienen +1 de ataque.",
    "cost": {
      "Food": 300,
      "Gold": 200
    }
  },
  "202_tech": {
    "name": "Hacha de doble filo",
    "description": "Investigar Hacha de doble filo () Los aldeanos cortan madera un 20 % más rápido.",
    "cost": {
      "Food": 100,
      "Wood": 50
    }
  },
  "203_tech": {
    "name": "Sierra de arco",
    "description": "Investigar Sierra de arco () Los aldeanos cortan madera un 20 % más rápido.",
    "cost": {
      "Food": 150,
      "Wood": 100
    }
  },
  "211_tech": {
    "name": "Arm. acolchada arq.",
    "description": "Investigar Armadura acolchada de arquero () Los soldados a distancia obtienen +1 de armadura cuerpo a cuerpo y +1 de armadura antiperforación.",
    "cost": {
      "Food": 100
    }
  },
  "212_tech": {
    "name": "Arm. cuero arqueros",
    "description": "Investigar Armadura de cuero de arquero () Los soldados a distancia obtienen +1 de armadura cuerpo a cuerpo y +1 de armadura antiperforación.",
    "cost": {
      "Food": 150,
      "Gold": 150
    }
  },
  "213_tech": {
    "name": "Carretilla",
    "description": "Investigar Carretilla () Los aldeanos obtienen un 25 % más de capacidad de carga y se mueven un 10 % más rápido.",
    "cost": {
      "Food": 175,
      "Wood": 50
    }
  },
  "215_tech": {
    "name": "Escuderos",
    "description": "Investigar Escuderos () La infantería se mueve un 10 % más rápido.",
    "cost": {
      "Food": 100
    }
  },
  "219_tech": {
    "name": "Arm. anillos arqueros",
    "description": "Investigar Armadura de anillos de arquero () Los soldados a distancia obtienen +1 de armadura cuerpo a cuerpo y +2 de armadura antiperforación.",
    "cost": {
      "Food": 250,
      "Gold": 250
    }
  },
  "221_tech": {
    "name": "Sierra a dos",
    "description": "Investigar Sierra a dos () Los aldeanos cortan madera un 10 % más rápido.",
    "cost": {
      "Food": 300,
      "Wood": 200
    }
  },
  "230_tech": {
    "name": "Letras de imprenta",
    "description": "Investigar Letras de imprenta () Los monjes obtienen +3 al alcance de conversión.",
    "cost": {
      "Food": 0,
      "Gold": 200
    }
  },
  "231_tech": {
    "name": "Santidad",
    "description": "Investigar Santidad () Las unidades de monasterio obtienen +15 PR.",
    "cost": {
      "Food": 0,
      "Gold": 175
    }
  },
  "233_tech": {
    "name": "Iluminación",
    "description": "Investigar Iluminación () Las unidades del monasterio recuperan su fe un 100 % más rápido después de una conversión.",
    "cost": {
      "Food": 0,
      "Gold": 120
    }
  },
  "249_tech": {
    "name": "Carro de mano",
    "description": "Investigar Carro de mano () Los aldeanos obtienen un 50 % más de capacidad y se mueven un 10 % más rápido.",
    "cost": {
      "Food": 300,
      "Wood": 200
    }
  },
  "252_tech": {
    "name": "Fervor",
    "description": "Investigar Fervor () Las unidades del monasterio se mueven un +15 % más rápido.",
    "cost": {
      "Food": 0,
      "Gold": 140
    }
  },
  "278_tech": {
    "name": "Cantería",
    "description": "Investigar Cantería () Los aldeanos recogen piedra un +15 % más rápido.",
    "cost": {
      "Food": 100,
      "Wood": 75
    }
  },
  "279_tech": {
    "name": "Pozo de cantera",
    "description": "Investigar Pozo de cantera () Los aldeanos recogen piedra un 15 % más rápido.",
    "cost": {
      "Food": 175,
      "Wood": 75
    }
  },
  "280_tech": {
    "name": "Patrulla urbana",
    "description": "Investigar Patrulla urbana () Los edificios obtienen +4 de campo de visión.",
    "cost": {
      "Food": 300,
      "Gold": 100
    }
  },
  "315_tech": {
    "name": "Leva",
    "description": "Investigar Leva () Los edificios militares [excepto los talleres de maquinaria de asedio] funcionan un 33 % más rápido.",
    "cost": {
      "Food": 150,
      "Gold": 150
    }
  },
  "316_tech": {
    "name": "Redención",
    "description": "Investigar Redención () Los monjes pueden convertir armas de asedio y edificios enemigos (excepto centros urbanos, castillos, monasterios, granjas, trampas para peces, murallas, puertas y maravillas). Los monjes pueden convertir a la mayoría de las unidades enemigas a distancia, pero deben situarse al lado de edificios, arietes y trebuchets para poder hacerlo.",
    "cost": {
      "Food": 0,
      "Gold": 475
    }
  },
  "319_tech": {
    "name": "Expiación",
    "description": "Investigar Expiación () Los monjes pueden convertir unidades del monasterio enemigas.",
    "cost": {
      "Food": 0,
      "Gold": 325
    }
  },
  "321_tech": {
    "name": "Zapadores",
    "description": "Investigar Zapadores () Los aldeanos obtienen +15 de ataque contra edificios y +3 contra arietes.",
    "cost": {
      "Food": 400,
      "Wood": 200
    }
  },
  "322_tech": {
    "name": "Matacanes",
    "description": "Investigar Matacanes () Elimina el alcance mínimo de las fortificaciones para que puedan atacar a los enemigos en su base.",
    "cost": {
      "Food": 200,
      "Stone": 100
    }
  },
  "373_tech": {
    "name": "Carpintero naval",
    "description": "Investigar Carpintero naval () Los barcos cuestan un 20 % menos de madera y se construyen un 50 % más rápido.",
    "cost": {
      "Food": 1000,
      "Gold": 300
    }
  },
  "374_tech": {
    "name": "Carenado",
    "description": "Investigar Carenado () Los barcos obtienen +1 de armadura antiperforación.",
    "cost": {
      "Food": 250,
      "Gold": 150
    }
  },
  "375_tech": {
    "name": "Dique seco",
    "description": "Investigar Dique seco () Los barcos se mueven un 15 % más rápido.",
    "cost": {
      "Food": 600,
      "Gold": 400
    }
  },
  "377_tech": {
    "name": "Ingenieros de asedio",
    "description": "Investigar Ingenieros de asedio () Las armas de asedio a distancia y los barcos de guerra de asedio obtienen +1 de alcance. Todas las armas de asedio y los barcos de guerra de asedio obtienen un 20 % más de ataque contra edificios; las unidades de demolición obtienen un 40 % más de ataque contra edificios.",
    "cost": {
      "Food": 500,
      "Wood": 600
    }
  },
  "379_tech": {
    "name": "Ladronera",
    "description": "Investigar Ladronera () Castillos, kreposts y torres del homenaje obtienen +1000 PR.",
    "cost": {
      "Food": 400,
      "Wood": 400
    }
  },
  "380_tech": {
    "name": "Bala roja",
    "description": "Investigar Disparo cargado () Las torres obtienen un 125 % más de ataque contra los barcos; los castillos obtienen un 25 % más de ataque contra los barcos.",
    "cost": {
      "Food": 350,
      "Gold": 100
    }
  },
  "408_tech": {
    "name": "Espionaje y traición",
    "description": "Investigar Espionaje/Traición (Coste:  por cada aldeano enemigo para el espionaje/ por usar la traición)  Espionaje (partidas de mapa aleatorio) revela todas las unidades y edificios enemigos al mostrarte su campo de visión. Cuesta 200 de oro por cada aldeano enemigo; los aldeanos aliados quedan excluidos cuando se bloquean los equipos. Traición (partidas regicidas) revela a tu equipo la posición de todos los reyes enemigos durante unos pocos segundos. Los reyes aparecen en el minimapa con una X intermitente. Cada vez que elijas traición, se te quitarán 400 de oro inmediatamente de tus reservas.",
    "cost": {
      "Gold": 200
    }
  },
  "435_tech": {
    "name": "Pureza de sangre",
    "description": "Investigar Pureza de sangre () Las unidades montadas obtienen +20 PR.",
    "cost": {
      "Food": 150,
      "Gold": 100
    }
  },
  "436_tech": {
    "name": "Tácticas de los partias",
    "description": "Investigar Tácticas de los partias () Los arqueros montados obtienen +1 de armadura cuerpo a cuerpo, +2 de armadura antiperforación; +2 de ataque contra línea de lanceros.",
    "cost": {
      "Food": 200,
      "Gold": 250
    }
  },
  "437_tech": {
    "name": "Dactilera",
    "description": "Investigar Dactilera () Las unidades de arqueros atacan un 15 % más rápido. Las unidades de arqueros y los guerrilleros disparan con un 100 % de precisión.",
    "cost": {
      "Food": 300,
      "Wood": 250
    }
  },
  "438_tech": {
    "name": "Teocracia",
    "description": "Desarrollar Teocracia () Si un grupo de monjes convierte a una unidad enemiga, solo uno de los monjes debe descansar tras la acción.",
    "cost": {
      "Food": 0,
      "Gold": 200
    }
  },
  "439_tech": {
    "name": "Herejía",
    "description": "Investigar Herejía () Las unidades convertidas por un monje enemigo mueren en vez de cambiar al color enemigo.",
    "cost": {
      "Food": 0,
      "Gold": 1000
    }
  },
  "440_tech": {
    "name": "Supremacía",
    "description": "Investigar Supremacía () Los aldeanos obtienen +40 PR, +6 de ataque, +2 de armadura cuerpo a cuerpo, +2 de armadura antiperforación.",
    "cost": {
      "Food": 400,
      "Gold": 250
    }
  },
  "441_tech": {
    "name": "Hierbas medicinales",
    "description": "Investigar Hierba medicinal () Las unidades guarnecidas en los edificios se curan un 500 % más rápido.",
    "cost": {
      "Food": 0,
      "Gold": 200
    }
  },
  "445_tech": {
    "name": "Shinkichon",
    "description": "Investigar Shinkichon () Los carros de cohetes y los barcos tortuga obtienen +1 de alcance y disparan proyectiles adicionales.",
    "cost": {
      "Food": 1100,
      "Gold": 800
    }
  },
  "454_tech": {
    "name": "Contrapesos",
    "description": "Desarrollar contrapesos () Lanzapiedras y mangana: +15 % de ataque.",
    "cost": {
      "Food": 650,
      "Gold": 500
    }
  },
  "455_tech": {
    "name": "Detinets",
    "description": "Investigar Detinets () Sustituye el 40 % del coste en piedra de los castillos y la línea de atalayas por un coste adicional en madera.",
    "cost": {
      "Gold": 200,
      "Wood": 400
    }
  },
  "457_tech": {
    "name": "Movilización",
    "description": "Investigar Movilización ()  Los cuarteles funcionan un 100 % más rápido.",
    "cost": {
      "Gold": 600,
      "Wood": 400
    }
  },
  "460_tech": {
    "name": "Átlatl",
    "description": "Investigar Átlatl () Los guerrilleros obtienen +1 de ataque, +1 de alcance.",
    "cost": {
      "Food": 400,
      "Gold": 350
    }
  },
  "461_tech": {
    "name": "Warwolf",
    "description": "Investigar Lobo de guerra () Los trebuchets infligen ataque con área de efecto y son más precisos.",
    "cost": {
      "Gold": 400,
      "Wood": 800
    }
  },
  "462_tech": {
    "name": "Gran Muralla",
    "description": "Investigar La Gran Muralla () Las murallas, la línea de atalayas y las torres de bombarda obtienen un 30 % más de PR.",
    "cost": {
      "Stone": 200,
      "Wood": 400
    }
  },
  "463_tech": {
    "name": "Hérsires",
    "description": "Investigar Caudillos () La infantería obtiene +5 de ataque contra la caballería, +4 contra unidades de camellos; genera +5 de oro al derrotar a aldeanos, unidades de comercio y monjes.",
    "cost": {
      "Food": 600,
      "Gold": 450
    }
  },
  "464_tech": {
    "name": "Fuego griego",
    "description": "Investigar Fuego griego () Los brulotes obtienen +1 de alcance; dromones y torres de bombarda obtienen más radio de explosión.",
    "cost": {
      "Food": 250,
      "Gold": 300
    }
  },
  "482_tech": {
    "name": "Bastión",
    "description": "Investigar Bastión () Los castillos y la línea de atalayas atacan un 33 % más rápido; los castillos curan a la infantería aliada en un radio de 7 casillas.",
    "cost": {
      "Food": 250,
      "Gold": 200
    }
  },
  "483_tech": {
    "name": "Razias",
    "description": "Investigar Razias () Los tarcanos se pueden entrenar en los establos.",
    "cost": {
      "Gold": 200,
      "Wood": 300
    }
  },
  "484_tech": {
    "name": "Yasama",
    "description": "Investigar Yasama () Las líneas de atalayas disparan flechas adicionales.",
    "cost": {
      "Food": 300,
      "Wood": 300
    }
  },
  "485_tech": {
    "name": "Lanzadores de hul'che",
    "description": "Investigar Lanzadores de hul 'che () Los guerrilleros disparan un proyectil adicional.",
    "cost": {
      "Food": 300,
      "Gold": 300
    }
  },
  "486_tech": {
    "name": "Eupseong",
    "description": "Investigar Eupseong () La línea de atalayas obtiene +2 de alcance.",
    "cost": {
      "Food": 300,
      "Wood": 300
    }
  },
  "487_tech": {
    "name": "Nómadas",
    "description": "Investigar Nómadas () Las casas perdidas no reducen el espacio de población.",
    "cost": {
      "Gold": 150,
      "Wood": 300
    }
  },
  "488_tech": {
    "name": "Kamandaran",
    "description": "Investigar Kamandaran () El coste en oro de la línea de arqueros es reemplazado por un coste adicional en madera.",
    "cost": {
      "Food": 400,
      "Gold": 300
    }
  },
  "489_tech": {
    "name": "Blindaje",
    "description": "Investigar Acorazado primitivo () Las armas de asedio obtienen +4 de armadura cuerpo a cuerpo.",
    "cost": {
      "Gold": 350,
      "Wood": 400
    }
  },
  "491_tech": {
    "name": "Sipahi",
    "description": "Investigar Cipayos () Los arqueros montados obtienen +20 PR.",
    "cost": {
      "Food": 350,
      "Gold": 150
    }
  },
  "492_tech": {
    "name": "Inquisición",
    "description": "Investigar Inquisición () Los monjes y los misioneros convierten más rápido; los misioneros obtienen +1 de alcance.",
    "cost": {
      "Food": 100,
      "Gold": 300
    }
  },
  "493_tech": {
    "name": "Código caballeresco",
    "description": "Investigar Código caballeresco () Los establos funcionan un 40 % más rápido.",
    "cost": {
      "Gold": 500,
      "Wood": 600
    }
  },
  "499_tech": {
    "name": "Ruta de la Seda",
    "description": "Investigar Ruta de la seda () Las unidades de comercio cuestan un 50 % menos.",
    "cost": {
      "Food": 250,
      "Gold": 250
    }
  },
  "506_tech": {
    "name": "Camino del Gran Tronco",
    "description": "Investigar Camino del Gran Tronco () Toda forma de obtención de oro será un +10 % más rápida; la tarifa de mercado se reduce al 10 %.",
    "cost": {
      "Food": 250,
      "Wood": 200
    }
  },
  "507_tech": {
    "name": "Shatagni",
    "description": "Investigar Shatagni () Los artilleros manuales obtienen +2 de alcance.",
    "cost": {
      "Food": 500,
      "Gold": 650
    }
  },
  "513_tech": {
    "name": "Druzhina",
    "description": "Investigar Druzhina () La infantería inflige daño de arrollamiento.",
    "cost": {
      "Food": 900,
      "Gold": 500
    }
  },
  "514_tech": {
    "name": "Ejército corviniano",
    "description": "Desarrollar Ejército corviniano () Los huszár magiares dejan de costar oro y pasan a costar más comida.",
    "cost": {
      "Food": 200,
      "Gold": 300
    }
  },
  "515_tech": {
    "name": "Arco recurvo",
    "description": "Investigar Arco recurvo () Los arqueros a caballo obtienen +1 de ataque y +1 de alcance.",
    "cost": {
      "Gold": 400,
      "Wood": 600
    }
  },
  "516_tech": {
    "name": "Huaracas",
    "description": "Investigar Huaracas () Los guerrilleros y los soldados con honda no tienen alcance mínimo; los soldados con honda obtienen +1 de ataque.",
    "cost": {
      "Food": 200,
      "Gold": 300
    }
  },
  "517_tech": {
    "name": "Escudos de tela",
    "description": "Investigar Escudos de tela () Los kamayuks, los soldados con honda y los guerreros águila obtienen +1 de armadura cuerpo a cuerpo, +2 de armadura antiperforación.",
    "cost": {
      "Food": 600,
      "Gold": 600
    }
  },
  "572_tech": {
    "name": "Carracas",
    "description": "Investigar Carraca () Los barcos obtienen +1 de armadura cuerpo a cuerpo, +1 de armadura antiperforación.",
    "cost": {
      "Gold": 300,
      "Wood": 200
    }
  },
  "573_tech": {
    "name": "Arcabuz",
    "description": "Investigar Arcabuz () Las unidades de pólvora disparan con mayor precisión a los objetivos en movimiento.",
    "cost": {
      "Food": 700,
      "Gold": 400
    }
  },
  "574_tech": {
    "name": "Centralización",
    "description": "Investigar Herederos reales () Los shotelais y los jinetes de camello reciben 3 de daño menos de las unidades montadas.",
    "cost": {
      "Food": 300,
      "Gold": 300
    }
  },
  "575_tech": {
    "name": "Mecanismos de torsión",
    "description": "Investigar Mecanismos de torsión () Aumenta el radio de explosión de las unidades del taller de maquinaria de asedio.",
    "cost": {
      "Food": 1000,
      "Gold": 600
    }
  },
  "576_tech": {
    "name": "Gran asamblea",
    "description": "Investigar Gran asamblea () Los centros urbanos disparan flechas de fuego sin guarnición.",
    "cost": {
      "Food": 200,
      "Wood": 300
    }
  },
  "577_tech": {
    "name": "Farimba",
    "description": "Desarrollar Farimba () La caballería obtiene +5 de ataque.",
    "cost": {
      "Food": 650,
      "Gold": 400
    }
  },
  "578_tech": {
    "name": "Alcazabas",
    "description": "Investigar Alcazaba () Los castillos del equipo funcionan un +25 % más rápido.",
    "cost": {
      "Food": 250,
      "Gold": 250
    }
  },
  "579_tech": {
    "name": "Camellos magrebíes",
    "description": "Investigar Camellos magrebíes () Las unidades a camello regeneran 15 PR por minuto.",
    "cost": {
      "Food": 700,
      "Gold": 300
    }
  },
  "602_tech": {
    "name": "Incendiarismo",
    "description": "Investigar Incendiarismo () La infantería obtiene +2 de ataque contra edificios.",
    "cost": {
      "Food": 75,
      "Gold": 25
    }
  },
  "608_tech": {
    "name": "Aspillera en cruz",
    "description": "Investigar Aspilleras () Las atalayas obtienen +1 de ataque, las torres de guardia +2, y las fortalezas y las torres del homenaje +3.",
    "cost": {
      "Food": 250,
      "Wood": 250
    }
  },
  "622_tech": {
    "name": "Colmillos de acero",
    "description": "Investigar Colmillos de acero () Los elefantes de combate reciben +3 de ataque.",
    "cost": {
      "Gold": 450,
      "Wood": 300
    }
  },
  "623_tech": {
    "name": "Ballesta doble",
    "description": "Investigar Ballestas dobles () Los elefantes con balista y escorpiones disparan un proyectil adicional.",
    "cost": {
      "Food": 700,
      "Gold": 400
    }
  },
  "624_tech": {
    "name": "Talasocracia",
    "description": "Investigar Talasocracia () Los muelles mejoran a puertos.",
    "cost": {
      "Food": 300,
      "Gold": 300
    }
  },
  "625_tech": {
    "name": "Leva en masa",
    "description": "Desarrollar leva en masa () Milicia y subsiguientes dejan de costar oro, y pasan a costar más comida.",
    "cost": {
      "Food": 850,
      "Gold": 500
    }
  },
  "626_tech": {
    "name": "Howdah",
    "description": "Investigar howdah () Los elefantes de combate reciben +1 de armadura cuerpo a cuerpo y +1 de armadura antiperforación.",
    "cost": {
      "Food": 400,
      "Wood": 300
    }
  },
  "627_tech": {
    "name": "Caballería manipur",
    "description": "Investigar Caballería manipur () La caballería recibe +4 de ataque contra los soldados a distancia.",
    "cost": {
      "Food": 300,
      "Gold": 300
    }
  },
  "628_tech": {
    "name": "Chatras",
    "description": "Investigar Chatras () Los elefantes de combate obtienen +100 PR.",
    "cost": {
      "Food": 250,
      "Gold": 250
    }
  },
  "629_tech": {
    "name": "Papel moneda",
    "description": "Desarrollar Papel moneda () Además de madera, los leñadores generan oro gradualmente.",
    "cost": {
      "Food": 550,
      "Wood": 200
    }
  },
  "685_tech": {
    "name": "Estribos",
    "description": "Investigar Estribos () La caballería ataca un 33 % más rápido.",
    "cost": {
      "Food": 400,
      "Gold": 200
    }
  },
  "686_tech": {
    "name": "Bagains",
    "description": "Investigar Bagains () La línea de milicia obtiene +5 de armadura cuerpo a cuerpo.",
    "cost": {
      "Food": 900,
      "Gold": 450
    }
  },
  "687_tech": {
    "name": "Armadura de seda",
    "description": "Investigar Armadura de seda () Jinetes ligeros y arqueros a caballo obtienen +1 de armadura cuerpo a cuerpo, +1 de armadura antiperforación.",
    "cost": {
      "Gold": 300,
      "Wood": 400
    }
  },
  "688_tech": {
    "name": "Tácticas de asedio timúridas",
    "description": "Investigar Tácticas de asedio timúridas () Los trebuchets obtienen +2 de alcance.",
    "cost": {
      "Gold": 400,
      "Wood": 500
    }
  },
  "689_tech": {
    "name": "Ganadería de la estepa",
    "description": "InvestigarGanadería de la estepa () Jinetes ligeros y arqueros a caballo entrenan un 100 % más rápido.",
    "cost": {
      "Food": 200,
      "Wood": 300
    }
  },
  "690_tech": {
    "name": "Mercenarios cumanos",
    "description": "Investigar Mercenarios cumanos () Todos los miembros del equipo pueden entrenar 5 kipchaks de élite gratis por castillo.",
    "cost": {
      "Food": 650,
      "Gold": 400
    }
  },
  "691_tech": {
    "name": "Fuertes en las colinas",
    "description": "Investigar Fuertes de la colina () Los centros urbanos obtienen +3 de alcance.",
    "cost": {
      "Food": 250,
      "Gold": 250
    }
  },
  "692_tech": {
    "name": "Escudos rectangulares",
    "description": "Investigar Escudos rectangulares () Líneas de lanceros y guerrilleros obtienen +2 de armadura antiperforación.",
    "cost": {
      "Food": 500,
      "Gold": 200
    }
  },
  "754_tech": {
    "name": "Viñedos de Borgoña",
    "description": "Desarrollar viñedos de Borgoña () Además de comida, los agricultores generan oro gradualmente.",
    "cost": {
      "Food": 400,
      "Gold": 300
    }
  },
  "755_tech": {
    "name": "Revolución flamenca",
    "description": "Investigar Revolución flamenca () Todos los aldeanos existentes se transforman en milicia flamenca.",
    "cost": {
      "Food": 200,
      "Gold": 150
    }
  },
  "756_tech": {
    "name": "Primera cruzada",
    "description": "Investigar Primera cruzada () Hasta 5 centros urbanos generan 5 serjeants cada uno; las unidades son más resistentes a la conversión.",
    "cost": {
      "Food": 400,
      "Gold": 300
    }
  },
  "757_tech": {
    "name": "Cota de malla",
    "description": "Investigar Cota de malla () La línea de caballeros recibe +1 de armadura cuerpo a cuerpo y +2 de armadura antiperforación.",
    "cost": {
      "Food": 700,
      "Gold": 600
    }
  },
  "782_tech": {
    "name": "Privilegios de Szlachta",
    "description": "Investigar Privilegios de Szlachta () La línea de caballeros cuesta un 60 % menos de oro.",
    "cost": {
      "Food": 500,
      "Gold": 300
    }
  },
  "783_tech": {
    "name": "Legado lequítico",
    "description": "Investigar Legado lequítico () La línea de caballería de exploración inflige daño de arrollamiento.",
    "cost": {
      "Food": 750,
      "Gold": 550
    }
  },
  "784_tech": {
    "name": "Tácticas de fuerte de carretas",
    "description": "Investigar Tácticas de fuerte de carretas () Las unidades de pólvora se mueven un 15 % más rápido.",
    "cost": {
      "Food": 300,
      "Gold": 300
    }
  },
  "785_tech": {
    "name": "Reformas husitas",
    "description": "Investigar Reformas husitas () El coste de oro de los monjes y de las tecnologías del monasterio se reemplaza por comida.",
    "cost": {
      "Food": 500,
      "Gold": 450
    }
  },
  "831_tech": {
    "name": "Cuerpo de médicos",
    "description": "Investigar Cuerpo de médicos () Las unidades en elefante regeneran 30 PR por minuto.",
    "cost": {
      "Food": 300,
      "Gold": 200
    }
  },
  "832_tech": {
    "name": "Acero wootz",
    "description": "Investigar Acero wootz () Los ataques de infantería y caballería ignoran la armadura.",
    "cost": {
      "Food": 650,
      "Gold": 550
    }
  },
  "833_tech": {
    "name": "Paiks",
    "description": "Investigar Paiks () Las unidades de rathas y elefantes atacan un 20 % más rápido.",
    "cost": {
      "Gold": 275,
      "Wood": 375
    }
  },
  "834_tech": {
    "name": "Mahāyāna",
    "description": "Investigar Mahāyāna () Los aldeanos y los monjes ocupan un 10 % menos de espacio de población.",
    "cost": {
      "Gold": 650,
      "Wood": 800
    }
  },
  "835_tech": {
    "name": "Chatrias",
    "description": "Investigar Chatrias () Las unidades militares cuestan un 25 % menos de comida.",
    "cost": {
      "Food": 500,
      "Gold": 450
    }
  },
  "836_tech": {
    "name": "Guardas fronterizos",
    "description": "Investigar Guardas fronterizos () Los jinetes de camello y los arqueros en elefante reciben +4 de armadura cuerpo a cuerpo.",
    "cost": {
      "Food": 800,
      "Gold": 700
    }
  },
  "875_tech": {
    "name": "Gambesones",
    "description": "Investigar Gambesones()  La línea de milicias y los lanceros incendiarios reciben + 1 de armadura antiperforación.",
    "cost": {
      "Food": 50,
      "Gold": 100
    }
  },
  "883_tech": {
    "name": "Balistas",
    "description": "Investigar Balistas () (los escorpiones atacan un 33 % más rápido; la línea de galeras obtiene +2 de ataque)",
    "cost": {
      "Gold": 300,
      "Wood": 400
    }
  },
  "884_tech": {
    "name": "Comitatenses",
    "description": "Investigar Comitatenses () Las unidades de la línea de milicia, caballeros y centuriones entrenan un 50 % más rápido y obtienen un ataque de carga.",
    "cost": {
      "Food": 700,
      "Gold": 800
    }
  },
  "902_tech": {
    "name": "Pirotecnia",
    "description": "Investigar Pirotecnia () Los artilleros manuales infligen +15 % de daño de perforación y son más precisos.",
    "cost": {
      "Food": 650,
      "Gold": 500
    }
  },
  "921_tech": {
    "name": "Relicarios",
    "description": "Investigar Relicarios () La infantería, a excepción de la línea de lanceros, obtiene +30 PR, y los sacerdotes guerreros se curan un 100 % más rápido.",
    "cost": {
      "Food": 550,
      "Gold": 400
    }
  },
  "922_tech": {
    "name": "Flota cilicia",
    "description": "Investigar Flota de Cilicia () Aumenta el radio de explosión de los barcos de demolición un +20 %; las galeras y dromones obtienen +1 de alcance.",
    "cost": {
      "Gold": 300,
      "Wood": 350
    }
  },
  "923_tech": {
    "name": "Torres esvanas",
    "description": "Investigar Torres esvanas () Las fortificaciones ganan +2 de ataque; la línea de atalayas inflige daño cuando se atraviesan.",
    "cost": {
      "Food": 300,
      "Gold": 200
    }
  },
  "924_tech": {
    "name": "Caballería aznauri",
    "description": "Investigar Caballería aznauri () .Las unidades montadas ocupan un -20 % menos de espacio de población.",
    "cost": {
      "Food": 550,
      "Gold": 250
    }
  },
  "996_tech": {
    "name": "Bastiones fortificados",
    "description": "Investigar Bastiones fortificados() Las fortificaciones regeneran 500 PR por minuto.",
    "cost": {
      "Food": 350,
      "Wood": 250
    }
  },
  "997_tech": {
    "name": "Bombas trueno",
    "description": "Investigar Bombas trueno() Los carros de cohetes, los granaderos y las unidades de Lou Chuan las detonan cuando los derrotan, los proyectiles producen explosiones adicionales.",
    "cost": {
      "Food": 900,
      "Gold": 600
    }
  },
  "1006_tech": {
    "name": "Armadura laminada",
    "description": "Investigar Armadura laminada() La infantería y los guerrilleros devuelven un 25 % de daño cuerpo a cuerpo al atacante.",
    "cost": {
      "Food": 450,
      "Gold": 300
    }
  },
  "1007_tech": {
    "name": "Caballería ordo",
    "description": "Investigar Caballería ordo() La caballería regenera PR en combate.",
    "cost": {
      "Food": 600,
      "Gold": 300
    }
  },
  "1012_tech": {
    "name": "Trashumancia",
    "description": "Investigar Trashumancia() Las nuevas pasturas proporcionan +3 animales.",
    "cost": {
      "Food": 175,
      "Wood": 325
    }
  },
  "1013_tech": {
    "name": "Pastoreo",
    "description": "Investigar Pastoreo() Las nuevas pasturas proporcionan +2 animales.",
    "cost": {
      "Food": 100,
      "Wood": 150
    }
  },
  "1014_tech": {
    "name": "Domesticación",
    "description": "Investigar Domesticación() Las nuevas pasturas proporcionan +1 animal.",
    "cost": {
      "Food": 50,
      "Wood": 100
    }
  },
  "1061_tech": {
    "name": "Tuntian",
    "description": "Investigar Tuntian () Los soldados producen alimentos de forma pasiva.",
    "cost": {
      "Food": 250,
      "Wood": 300
    }
  },
  "1062_tech": {
    "name": "Armadura de Ming Guang",
    "description": "Investigar Armadura de Guang Ming ()  La caballería obtiene +4 de armadura cuerpo a cuerpo.",
    "cost": {
      "Food": 600,
      "Gold": 450
    }
  },
  "1069_tech": {
    "name": "Cargador",
    "description": "Investigar Cargador () La línea de arqueros, los carros de guerra y las unidades de Lou Chuan disparan más proyectiles.",
    "cost": {
      "Food": 650,
      "Gold": 750
    }
  },
  "1070_tech": {
    "name": "Arsenal de la serpiente enroscada",
    "description": "Investigar Arsenal de la serpiente enroscada () Los lanceros y los guardias de la pluma blanca obtienen PR adicionales cuando están cerca los unos de los otros.",
    "cost": {
      "Food": 350,
      "Gold": 300
    }
  },
  "1080_tech": {
    "name": "Tácticas de los Acantilados Rojos",
    "description": "Investigar Tácticas de los Acantilados Rojos () Los barcos de demolición y los arqueros de fuego infligen daño de fuego a los barcos y edificios.",
    "cost": {
      "Food": 400,
      "Gold": 250
    }
  },
  "1081_tech": {
    "name": "Tigre sentado",
    "description": "Investigar Tigre sentado () Los mangoneles y los trebuchets de Lou Chuan disparan proyectiles adicionales.",
    "cost": {
      "Gold": 300,
      "Wood": 600
    }
  }
};