import React from "react"
import { Warehouse, Sword, Target, Zap, Box, Anchor, GraduationCap, Cross, Castle, Hammer } from "lucide-react"

// IDs mapped to aoe2-data.json (SiegeEngineers version)
export const TECH_TREE_STRUCTURE = [
  {
    category: "Economía",
    id: "eco",
    icon: <Warehouse className="w-4 h-4" />,
    buildings: [
      {
        id: "b_109", name: "Centro Urbano", file: "Building_109.png", type: "building",
        lines: [
          { nodes: [{ id: "83", name: "Aldeano", file: "Unit_83.png", age: "dark", type: "unit" }] },
          { nodes: [{ id: "22", name: "Telar", file: "22.png", age: "dark", type: "tech" }] },
          { nodes: [{ id: "213", name: "Carretilla", file: "213.png", age: "feudal", type: "tech" }, { id: "249", name: "Carro de Mano", file: "249.png", age: "castle", type: "tech" }] },
          { nodes: [{ id: "8", name: "Guardia Urbana", file: "8.png", age: "feudal", type: "tech" }, { id: "280_tech", name: "Patrulla Urbana", file: "280.png", age: "castle", type: "tech" }] },
          { nodes: [{ id: "101", name: "Edad Feudal", file: "101.png", age: "dark", type: "tech" }, { id: "102", name: "Edad Castillos", file: "102.png", age: "feudal", type: "tech" }, { id: "103", name: "Edad Imperial", file: "103.png", age: "castle", type: "tech" }] }
        ]
      },
      {
        id: "b_68", name: "Molino", file: "Building_68.png", type: "building",
        lines: [
          { nodes: [{ id: "14", name: "Collera", file: "14.png", age: "feudal", type: "tech" }, { id: "13_tech", name: "Arado Pesado", file: "13.png", age: "castle", type: "tech" }, { id: "12_tech", name: "Rotación de Cultivos", file: "12.png", age: "imperial", type: "tech" }] },
          { nodes: [{ id: "45_farm", name: "Granja", file: "Building_50.png", age: "dark", type: "building" }] }
        ]
      },
      {
        id: "b_562", name: "Camp. Maderero", file: "Building_562.png", type: "building",
        lines: [
           { nodes: [{ id: "202", name: "Hacha de Doble Filo", file: "202.png", age: "feudal", type: "tech" }, { id: "203", name: "Sierra de Arco", file: "203.png", age: "castle", type: "tech" }, { id: "221", name: "Sierra a Dos Manos", file: "221.png", age: "imperial", type: "tech" }] }
        ]
      },
      {
         id: "b_584", name: "Camp. Minero", file: "Building_584.png", type: "building",
         lines: [
            { nodes: [{ id: "55", name: "Minería de Oro", file: "55.png", age: "feudal", type: "tech" }, { id: "182", name: "Pozo Minero de Oro", file: "182.png", age: "castle", type: "tech" }] },
            { nodes: [{ id: "278", name: "Minería de Piedra", file: "278.png", age: "feudal", type: "tech" }, { id: "279_tech", name: "Pozo Minero de Piedra", file: "279.png", age: "castle", type: "tech" }] }
         ]
      },
      {
        id: "b_84", name: "Mercado", file: "Building_84.png", type: "building",
        lines: [
           { nodes: [{ id: "128", name: "Carreta de Mercancía", file: "Unit_128.png", age: "feudal", type: "unit" }] },
           { nodes: [{ id: "23", name: "Acuñación", file: "23.png", age: "feudal", type: "tech" }, { id: "17", name: "Banca", file: "17.png", age: "castle", type: "tech" }] },
           { nodes: [{ id: "48", name: "Caravana", file: "48.png", age: "castle", type: "tech" }, { id: "15", name: "Gremios", file: "15.png", age: "imperial", type: "tech" }] }
        ]
      }
    ]
  },
  {
    category: "Infantería",
    id: "inf",
    icon: <Sword className="w-4 h-4" />,
    buildings: [
      {
        id: "b_12", name: "Cuarteles", file: "Building_12.png", type: "building",
        lines: [
          { nodes: [{ id: "74", name: "Milicia", file: "Unit_74.png", age: "dark", type: "unit" }, { id: "75", name: "Hombre de Armas", file: "Unit_75.png", age: "feudal", type: "unit" }, { id: "77", name: "Espadachín", file: "Unit_77.png", age: "castle", type: "unit" }, { id: "473", name: "Esp. Dos Manos", file: "Unit_473.png", age: "imperial", type: "unit" }, { id: "567", name: "Campeón", file: "Unit_567.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "93", name: "Lancero", file: "Unit_93.png", age: "feudal", type: "unit" }, { id: "358", name: "Piquero", file: "Unit_358.png", age: "castle", type: "unit" }, { id: "359", name: "Alabardero", file: "Unit_359.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "751", name: "Explorador Águila", file: "Unit_751.png", age: "feudal", type: "unit" }, { id: "753", name: "Guerrero Águila", file: "Unit_753.png", age: "castle", type: "unit" }, { id: "752", name: "Guerrero Águila de Élite", file: "Unit_752.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "716", name: "Suministros", file: "716.png", age: "feudal", type: "tech" }, { id: "875", name: "Gambesones", file: "875.png", age: "castle", type: "tech" }, { id: "215", name: "Escuderos", file: "215.png", age: "castle", type: "tech" }, { id: "602", name: "Incendio", file: "602.png", age: "castle", type: "tech" }] }
        ]
      }
    ]
  },
  {
    category: "Rango",
    id: "arch",
    icon: <Target className="w-4 h-4" />,
    buildings: [
      {
        id: "b_87", name: "Arquería", file: "Building_87.png", type: "building",
        lines: [
          { nodes: [{ id: "4", name: "Arquero", file: "Unit_4.png", age: "feudal", type: "unit" }, { id: "24", name: "Ballestero", file: "Unit_24.png", age: "castle", type: "unit" }, { id: "492", name: "Arbalestero", file: "Unit_492.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "6", name: "Hostigador", file: "Unit_6.png", age: "feudal", type: "unit" }, { id: "7", name: "Hostigador de Élite", file: "Unit_7.png", age: "castle", type: "unit" }] },
          { nodes: [{ id: "39", name: "Arquero a Caballo", file: "Unit_39.png", age: "castle", type: "unit" }, { id: "474", name: "Arquero a Caballo Pesado", file: "Unit_474.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "5", name: "Artillero Manual", file: "Unit_5.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "437", name: "Anillo de Pulgar", file: "437.png", age: "castle", type: "tech" }, { id: "436", name: "Tácticas Partas", file: "436.png", age: "imperial", type: "tech" }] }
        ]
      }
    ]
  },
  {
    category: "Caballería",
    id: "cav",
    icon: <Zap className="w-4 h-4" />,
    buildings: [
      {
        id: "b_101", name: "Establo", file: "Building_101.png", type: "building",
        lines: [
          { nodes: [{ id: "448", name: "Explorador", file: "Unit_448.png", age: "feudal", type: "unit" }, { id: "546", name: "Caballería Ligera", file: "Unit_546.png", age: "castle", type: "unit" }, { id: "441", name: "Húsar", file: "Unit_441.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "38", name: "Caballero", file: "Unit_38.png", age: "castle", type: "unit" }, { id: "283", name: "Cavalier", file: "Unit_283.png", age: "imperial", type: "unit" }, { id: "569", name: "Paladín", file: "Unit_569.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "329", name: "Jinete de Camello", file: "Unit_329.png", age: "castle", type: "unit" }, { id: "330", name: "Camello Pesado", file: "Unit_330.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1132", name: "Elefante de Batalla", file: "Unit_1132.png", age: "castle", type: "unit" }, { id: "1134", name: "Elefante de Batalla de Élite", file: "Unit_1134.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1370", name: "Lancero Estepario", file: "Unit_1370.png", age: "castle", type: "unit" }, { id: "1372", name: "Lancero Estepario de Élite", file: "Unit_1372.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "435", name: "Pureza de Sangre", file: "435.png", age: "feudal", type: "tech" }, { id: "216", name: "Ganadería", file: "216.png", age: "castle", type: "tech" }] }
        ]
      }
    ]
  },
  {
    category: "Asedio",
    id: "sie",
    icon: <Box className="w-4 h-4" />,
    buildings: [
      {
        id: "b_49", name: "Taller de Asedio", file: "Building_49.png", type: "building",
        lines: [
          { nodes: [{ id: "1258", name: "Ariete", file: "Unit_1258.png", age: "castle", type: "unit" }, { id: "422", name: "Ariete Cubierto", file: "Unit_422.png", age: "imperial", type: "unit" }, { id: "548", name: "Ariete de Asedio", file: "Unit_548.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "280", name: "Catapulta", file: "Unit_280.png", age: "castle", type: "unit" }, { id: "550", name: "Onagro", file: "Unit_550.png", age: "imperial", type: "unit" }, { id: "588", name: "Onagro de Asedio", file: "Unit_588.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "279", name: "Escorpión", file: "Unit_279.png", age: "castle", type: "unit" }, { id: "542", name: "Escorpión Pesado", file: "Unit_542.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "36", name: "Cañón de Bombardeo", file: "Unit_36.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1105", name: "Torre de Asedio", file: "Unit_1105.png", age: "castle", type: "unit" }] }
        ]
      }
    ]
  },
  {
    category: "Herrería",
    id: "blacksmith",
    icon: <Hammer className="w-4 h-4" />,
    buildings: [
       {
         id: "b_19", name: "Herrería", file: "Building_19.png", type: "building",
         lines: [
            { nodes: [{ id: "211", name: "Armadura Acolchada", file: "211.png", age: "feudal", type: "tech" }, { id: "212", name: "Armadura de Cuero", file: "212.png", age: "castle", type: "tech" }, { id: "219", name: "Armadura de Anillos", file: "219.png", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "199", name: "Flecha", file: "199.png", age: "feudal", type: "tech" }, { id: "200", name: "Punzon de Flecha", file: "200.png", age: "castle", type: "tech" }, { id: "201", name: "Brazalete", file: "201.png", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "74_tech", name: "Láminas", file: "74.png", age: "feudal", type: "tech" }, { id: "76", name: "Cota de Malla", file: "76.png", age: "castle", type: "tech" }, { id: "77_tech", name: "Placas", file: "77.png", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "67", name: "Forja", file: "67.png", age: "feudal", type: "tech" }, { id: "68_tech", name: "Fundición", file: "68.png", age: "castle", type: "tech" }, { id: "75_tech", name: "Alto Horno", file: "75.png", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "81", name: "Barda", file: "81.png", age: "feudal", type: "tech" }, { id: "82", name: "Cota de Malla (Cab)", file: "82.png", age: "castle", type: "tech" }, { id: "80", name: "Placas (Cab)", file: "80.png", age: "imperial", type: "tech" }] }
         ]
       }
    ]
  },
  {
    category: "Muelle",
    id: "dock",
    icon: <Anchor className="w-4 h-4" />,
    buildings: [
       {
         id: "b_45", name: "Muelle", file: "Building_45.png", type: "building",
         lines: [
            { nodes: [{ id: "13", name: "Pesquero", file: "Unit_13.png", age: "dark", type: "unit" }, { id: "65", name: "Redes de Agalla", file: "65.png", age: "castle", type: "tech" }] },
            { nodes: [{ id: "539", name: "Galera", file: "Unit_539.png", age: "feudal", type: "unit" }, { id: "21", name: "Galera de Guerra", file: "Unit_21.png", age: "castle", type: "unit" }, { id: "442", name: "Galeón", file: "Unit_442.png", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "1103", name: "Balsa de Fuego", file: "Unit_1103.png", age: "feudal", type: "unit" }, { id: "529", name: "Barco de Fuego", file: "Unit_529.png", age: "castle", type: "unit" }, { id: "532", name: "Barco de Fuego Rápido", file: "Unit_532.png", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "1104", name: "Balsa de Demolición", file: "Unit_1104.png", age: "feudal", type: "unit" }, { id: "527", name: "Barco de Demolición", file: "Unit_527.png", age: "castle", type: "unit" }, { id: "528", name: "Barco de Demolición Pesado", file: "Unit_528.png", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "420", name: "Galeón Artillado", file: "Unit_420.png", age: "imperial", type: "unit" }, { id: "691", name: "Galeón Artillado de Élite", file: "Unit_691.png", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "374", name: "Carenado", file: "374.png", age: "castle", type: "tech" }, { id: "375", name: "Dique Seco", file: "375.png", age: "imperial", type: "tech" }, { id: "376", name: "Carpintero Naval", file: "376.png", age: "imperial", type: "tech" }] }
         ]
       }
    ]
  },
  {
    category: "Universidad",
    id: "university",
    icon: <GraduationCap className="w-4 h-4" />,
    buildings: [
       {
         id: "b_209", name: "Universidad", file: "Building_209.png", type: "building",
         lines: [
            { nodes: [{ id: "50", name: "Albañilería", file: "50.png", age: "castle", type: "tech" }, { id: "51", name: "Arquitectura", file: "51.png", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "194", name: "Muralla Fortificada", file: "194.png", age: "castle", type: "tech" }] },
            { nodes: [{ id: "93_tech", name: "Balística", file: "93.png", age: "castle", type: "tech" }] },
            { nodes: [{ id: "140", name: "Torre de Guardia", file: "140.png", age: "castle", type: "tech" }, { id: "63", name: "Torre del Homenaje", file: "63.png", age: "imperial", type: "tech" }, { id: "64", name: "Torre de Bombardeo", file: "64.png", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "380", name: "Disparo al Rojo", file: "380.png", age: "castle", type: "tech" }] },
            { nodes: [{ id: "322", name: "Matacanes", file: "322.png", age: "castle", type: "tech" }] },
            { nodes: [{ id: "54", name: "Grúa", file: "54.png", age: "castle", type: "tech" }] },
            { nodes: [{ id: "47", name: "Química", file: "47.png", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "377", name: "Ingenieros de Asedio", file: "377.png", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "608", name: "Aspilleras", file: "608.png", age: "imperial", type: "tech" }] }
         ]
       }
    ]
  },
  {
    category: "Monasterio",
    id: "monastery",
    icon: <Cross className="w-4 h-4" />,
    buildings: [
       {
         id: "b_104", name: "Monasterio", file: "Building_104.png", type: "building",
         lines: [
            { nodes: [{ id: "125", name: "Monje", file: "Unit_125.png", age: "castle", type: "unit" }] },
            { nodes: [{ id: "316", name: "Redención", file: "316.png", age: "castle", type: "tech" }, { id: "319", name: "Expiación", file: "319.png", age: "castle", type: "tech" }] },
            { nodes: [{ id: "441", name: "Medicina Herbal", file: "441.png", age: "castle", type: "tech" }, { id: "439", name: "Herejía", file: "439.png", age: "castle", type: "tech" }] },
            { nodes: [{ id: "231", name: "Santidad", file: "231.png", age: "castle", type: "tech" }, { id: "252", name: "Fervor", file: "252.png", age: "castle", type: "tech" }] },
            { nodes: [{ id: "45_tech", name: "Fe", file: "45.png", age: "imperial", type: "tech" }, { id: "233", name: "Iluminación", file: "233.png", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "230", name: "Imprenta", file: "230.png", age: "imperial", type: "tech" }, { id: "438", name: "Teocracia", file: "438.png", age: "imperial", type: "tech" }] }
         ]
       }
    ]
  },
  {
    category: "Castillo",
    id: "castle",
    icon: <Castle className="w-4 h-4" />,
    buildings: [
       {
         id: "b_82", name: "Castillo", file: "Building_82.png", type: "building",
         lines: [
            { nodes: [{ id: "UNIQUE_UNIT", name: "Unidad Única", file: "UNIQUE_UNIT", age: "castle", type: "unique_unit" }, { id: "UNIQUE_UNIT_ELITE", name: "Unidad Única (Élite)", file: "UNIQUE_UNIT", age: "imperial", type: "unique_unit" }] },
            { nodes: [{ id: "UNIQUE_TECH_1", name: "Tecnología Única 1", file: "unique_tech_1.png", age: "castle", type: "unique_tech" }, { id: "UNIQUE_TECH_2", name: "Tecnología Única 2", file: "unique_tech_2.png", age: "imperial", type: "unique_tech" }] },
            { nodes: [{ id: "440", name: "Petardo", file: "Unit_440.png", age: "castle", type: "unit" }] },
            { nodes: [{ id: "331", name: "Lanzapiedras", file: "Unit_331.png", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "321", name: "Zapadores", file: "321.png", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "315", name: "Levas", file: "315.png", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "379", name: "Matacanes (Castillo)", file: "379.png", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "408", name: "Espías", file: "408.png", age: "imperial", type: "tech" }] }
         ]
       }
    ]
  }
]