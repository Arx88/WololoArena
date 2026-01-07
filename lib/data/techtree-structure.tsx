import React from "react"

export const TECH_TREE_STRUCTURE = [
  {
    category: "Economía",
    id: "eco",
    iconBuilding: "Building_109.png", 
    buildings: [
      {
        id: "b_109", name: "Centro Urbano", file: "109.png", type: "building",
        lines: [
          { nodes: [{ id: "83", name: "Aldeano", file: "Unit_83.png", age: "dark", type: "unit" }] },
          { nodes: [{ id: "22_tech", name: "Telar", file: "22.png", age: "dark", type: "tech" }] },
          { nodes: [{ id: "213_tech", name: "Carretilla", file: "213.png", age: "feudal", type: "tech" }, { id: "249_tech", name: "Carro de Mano", file: "249.png", age: "castle", type: "tech" }] },
          { nodes: [{ id: "8_tech", name: "Guardia Urbana", file: "8.png", age: "feudal", type: "tech" }, { id: "280_tech", name: "Patrulla Urbana", file: "280.png", age: "castle", type: "tech" }] },
          { nodes: [{ id: "101_tech", name: "Edad Feudal", file: "101.png", age: "dark", type: "tech" }, { id: "102_tech", name: "Edad Castillos", file: "102.png", age: "feudal", type: "tech" }, { id: "103_tech", name: "Edad Imperial", file: "103.png", age: "castle", type: "tech" }] }
        ]
      },
      {
        id: "b_68", name: "Molino", file: "68.png", type: "building",
        lines: [
          { nodes: [{ id: "14_tech", name: "Collera", file: "14.png", age: "feudal", type: "tech" }, { id: "13_tech", name: "Arado Pesado", file: "13.png", age: "castle", type: "tech" }, { id: "12_tech", name: "Rotación de Cultivos", file: "12.png", age: "imperial", type: "tech" }] },
          { nodes: [{ id: "b_50", name: "Granja", file: "50.png", age: "dark", type: "building" }] }
        ]
      },
      {
        id: "b_562", name: "Camp. Maderero", file: "562.png", type: "building",
        lines: [
           { nodes: [{ id: "202_tech", name: "Hacha de Doble Filo", file: "202.png", age: "feudal", type: "tech" }, { id: "203_tech", name: "Sierra de Arco", file: "203.png", age: "castle", type: "tech" }, { id: "221_tech", name: "Sierra a Dos Manos", file: "221.png", age: "imperial", type: "tech" }] }
        ]
      },
      {
         id: "b_584", name: "Camp. Minero", file: "584.png", type: "building",
         lines: [
            { nodes: [{ id: "55_tech", name: "Minería de Oro", file: "55.png", age: "feudal", type: "tech" }, { id: "182_tech", name: "Pozo Minero de Oro", file: "182.png", age: "castle", type: "tech" }] },
            { nodes: [{ id: "278_tech", name: "Minería de Piedra", file: "278.png", age: "feudal", type: "tech" }, { id: "279_tech", name: "Pozo Minero de Piedra", file: "279.png", age: "castle", type: "tech" }] }
         ]
      },
      {
        id: "b_1808", name: "Carro de Mulas", file: "1808.png", type: "building",
        lines: [
           { nodes: [{ id: "1014_tech", name: "Crianza de Animales", file: "1014.png", age: "castle", type: "tech" }] }
        ]
      }
    ]
  },
  {
    category: "Infantería",
    id: "inf",
    iconBuilding: "Building_12.png", 
    buildings: [
      {
        id: "b_12", name: "Cuarteles", file: "12.png", type: "building",
        lines: [
          { nodes: [{ id: "74", name: "Milicia", file: "Unit_74.png", age: "dark", type: "unit" }, { id: "75", name: "Hombre de Armas", file: "Unit_75.png", age: "feudal", type: "unit" }, { id: "77", name: "Espadachín", file: "Unit_77.png", age: "castle", type: "unit" }, { id: "473", name: "Esp. Dos Manos", file: "Unit_473.png", age: "imperial", type: "unit" }, { id: "567", name: "Campeón", file: "Unit_567.png", age: "imperial", type: "unit" }, { id: "1793", name: "Legionario", file: "Unit_1793.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "93", name: "Lancero", file: "Unit_93.png", age: "feudal", type: "unit" }, { id: "358", name: "Piquero", file: "Unit_358.png", age: "castle", type: "unit" }, { id: "359", name: "Alabardero", file: "Unit_359.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "751", name: "Explorador Águila", file: "Unit_751.png", age: "feudal", type: "unit" }, { id: "753", name: "Guerrero Águila", file: "Unit_753.png", age: "castle", type: "unit" }, { id: "752", name: "Guerrero Águila de Élite", file: "Unit_752.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "882", name: "Condottiero", file: "Unit_882.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1699", name: "Piquero Flamenco", file: "Unit_1699.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1570", name: "Invasor Azteca", file: "Unit_1570.png", age: "castle", type: "unit" }] },
          { nodes: [{ id: "1974", name: "Espadachín Jian", file: "Unit_1974.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1660", name: "Serjeant (D)", file: "Unit_1660.png", age: "castle", type: "unit" }, { id: "1661", name: "Serjeant Elite (D)", file: "Unit_1661.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1786", name: "Lancero (D)", file: "Unit_1786.png", age: "feudal", type: "unit" }, { id: "1787", name: "Piquero (D)", file: "Unit_1787.png", age: "castle", type: "unit" }, { id: "1788", name: "Alabardero (D)", file: "Unit_1788.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "716", name: "Suministros", file: "716.png", age: "feudal", type: "tech" }, { id: "875", name: "Gambesones", file: "875.png", age: "castle", type: "tech" }, { id: "215", name: "Escuderos", file: "215.png", age: "castle", type: "tech" }, { id: "602", name: "Incendio", file: "602.png", age: "castle", type: "tech" }] }
        ]
      }
    ]
  },
  {
    category: "Rango",
    id: "arch",
    iconBuilding: "Building_87.png", 
    buildings: [
      {
        id: "b_87", name: "Arquería", file: "87.png", type: "building",
        lines: [
          { nodes: [{ id: "4", name: "Arquero", file: "Unit_4.png", age: "feudal", type: "unit" }, { id: "24", name: "Ballestero", file: "Unit_24.png", age: "castle", type: "unit" }, { id: "492", name: "Arbalestero", file: "Unit_492.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "6", name: "Hostigador", file: "Unit_6.png", age: "feudal", type: "unit" }, { id: "7", name: "Hostigador de Élite", file: "Unit_7.png", age: "castle", type: "unit" }, { id: "1155", name: "Hostigador Imperial", file: "Unit_1155.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "39", name: "Arquero a Caballo", file: "Unit_39.png", age: "castle", type: "unit" }, { id: "474", name: "Arquero a Caballo Pesado", file: "Unit_474.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1010", name: "Genitour", file: "Unit_1010.png", age: "castle", type: "unit" }, { id: "1012", name: "Genitour de Élite", file: "Unit_1012.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "185", name: "Hondero", file: "Unit_185.png", age: "castle", type: "unit" }] },
          { nodes: [{ id: "5", name: "Artillero Manual", file: "Unit_5.png", age: "imperial", type: "unit" }, { id: "1911", name: "Granadero", file: "Unit_1911.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "437", name: "Anillo de Pulgar", file: "437.png", age: "castle", type: "tech" }, { id: "436", name: "Tácticas Partas", file: "436.png", age: "imperial", type: "tech" }] }
        ]
      }
    ]
  },
  {
    category: "Caballería",
    id: "cav",
    iconBuilding: "Building_101.png", 
    buildings: [
      {
        id: "b_101", name: "Establo", file: "101.png", type: "building",
        lines: [
          { nodes: [{ id: "448", name: "Explorador", file: "Unit_448.png", age: "feudal", type: "unit" }, { id: "546", name: "Caballería Ligera", file: "Unit_546.png", age: "castle", type: "unit" }, { id: "441", name: "Húsar", file: "Unit_441.png", age: "imperial", type: "unit" }, { id: "1707", name: "Húsar Alado", file: "Unit_1707.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "38", name: "Caballero", file: "Unit_38.png", age: "castle", type: "unit" }, { id: "283", name: "Cavalier", file: "Unit_283.png", age: "imperial", type: "unit" }, { id: "569", name: "Paladín", file: "Unit_569.png", age: "imperial", type: "unit" }, { id: "1813", name: "Savar", file: "Unit_1813.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "329", name: "Jinete de Camello", file: "Unit_329.png", age: "castle", type: "unit" }, { id: "330", name: "Camello Pesado", file: "Unit_330.png", age: "imperial", type: "unit" }, { id: "1105", name: "Camello Imperial", file: "Unit_1105.png", age: "imperial", type: "unit" }, { id: "1923", name: "Camello de Asedio", file: "Unit_1923.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1132", name: "Elefante de Batalla", file: "Unit_1132.png", age: "castle", type: "unit" }, { id: "1134", name: "Elefante de Batalla de Élite", file: "Unit_1134.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1370", name: "Lancero Estepario", file: "Unit_1370.png", age: "castle", type: "unit" }, { id: "1372", name: "Lancero Estepario de Élite", file: "Unit_1372.png", age: "imperial", type: "unit" }, { id: "1901", name: "Lancero Estepario (H)", file: "Unit_1901.png", age: "castle", type: "unit" }, { id: "1903", name: "Lancero Estepario Elite (H)", file: "Unit_1903.png", age: "imperial", type: "unit" }, { id: "207", name: "Lancero (H2)", file: "Unit_207.png", age: "castle", type: "unit" }] },
          { nodes: [{ id: "1751", name: "Jinete Shrivamsha", file: "Unit_1751.png", age: "castle", type: "unit" }, { id: "1753", name: "Jinete Shrivamsha Elite", file: "Unit_1753.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1952", name: "Caballería Xianbei", file: "Unit_1952.png", age: "castle", type: "unit" }] },
          { nodes: [{ id: "1263", name: "Camello Flamígero", file: "Unit_1263.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1755", name: "Camello Explorador", file: "Unit_1755.png", age: "feudal", type: "unit" }] },
          { nodes: [{ id: "1944", name: "Caballería Pesada", file: "Unit_1944.png", age: "castle", type: "unit" }, { id: "1946", name: "Caballería Pesada Elite", file: "Unit_1946.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "435", name: "Pureza de Sangre", file: "435.png", age: "feudal", type: "tech" }, { id: "216", name: "Ganadería", file: "216.png", age: "castle", type: "tech" }, { id: "1014", name: "Crianza de Animales", file: "1014.png", age: "castle", type: "tech" }] }
        ]
      }
    ]
  },
  {
    category: "Asedio",
    id: "sie",
    iconBuilding: "Building_49.png", 
    buildings: [
      {
        id: "b_49", name: "Taller de Asedio", file: "49.png", type: "building",
        lines: [
          { nodes: [{ id: "1258", name: "Ariete", file: "Unit_1258.png", age: "castle", type: "unit" }, { id: "422", name: "Ariete Cubierto", file: "Unit_422.png", age: "imperial", type: "unit" }, { id: "548", name: "Ariete de Asedio", file: "Unit_548.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "280", name: "Catapulta", file: "Unit_280.png", age: "castle", type: "unit" }, { id: "550", name: "Onagro", file: "Unit_550.png", age: "imperial", type: "unit" }, { id: "588", name: "Onagro de Asedio", file: "Unit_588.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "279", name: "Escorpión", file: "Unit_279.png", age: "castle", type: "unit" }, { id: "542", name: "Escorpión Pesado", file: "Unit_542.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "36", name: "Cañón de Bombardeo", file: "Unit_36.png", age: "imperial", type: "unit" }, { id: "1709", name: "Houfnice", file: "Unit_1709.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1744", name: "Elefante con Armadura", file: "Unit_1744.png", age: "castle", type: "unit" }, { id: "1746", name: "Elefante de Asedio", file: "Unit_1746.png", age: "imperial", type: "unit" }, { id: "873", name: "Elefante Arm. (Alt)", file: "Unit_873.png", age: "castle", type: "unit" }, { id: "875", name: "Elefante Arm. Elite (Alt)", file: "Unit_875.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1904", name: "Carro de Cohetes", file: "Unit_1904.png", age: "castle", type: "unit" }, { id: "1907", name: "Carro de Cohetes Pesado", file: "Unit_1907.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1942", name: "Lanzapiedras de Tracción", file: "Unit_1942.png", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1105", name: "Torre de Asedio", file: "Unit_1105.png", age: "castle", type: "unit" }] }
        ]
      }
    ]
  },
  {
    category: "Muelle",
    id: "dock",
    iconBuilding: "Building_45.png",
    buildings: [
       {
         id: "b_45", name: "Muelle", file: "45.png", type: "building",
         lines: [
            { nodes: [{ id: "13", name: "Pesquero", file: "Unit_13.png", age: "dark", type: "unit" }, { id: "65_tech", name: "Redes de Agalla", file: "65.png", age: "castle", type: "tech" }] },
            { nodes: [{ id: "539", name: "Galera", file: "Unit_539.png", age: "feudal", type: "unit" }, { id: "21", name: "Galera de Guerra", file: "Unit_21.png", age: "castle", type: "unit" }, { id: "442", name: "Galeón", file: "Unit_442.png", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "1103", name: "Balsa de Fuego", file: "Unit_1103.png", age: "feudal", type: "unit" }, { id: "529", name: "Barco de Fuego", file: "Unit_529.png", age: "castle", type: "unit" }, { id: "532", name: "Barco de Fuego Rápido", file: "Unit_532.png", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "1104", name: "Balsa de Demolición", file: "Unit_1104.png", age: "feudal", type: "unit" }, { id: "527", name: "Barco de Demolición", file: "Unit_527.png", age: "castle", type: "unit" }, { id: "528", name: "Barco de Demolición Pesado", file: "Unit_528.png", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "420", name: "Galeón Artillado", file: "Unit_420.png", age: "imperial", type: "unit" }, { id: "691", name: "Galeón Artillado de Élite", file: "Unit_691.png", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "1795", name: "Dromon", file: "Unit_1795.png", age: "castle", type: "unit" }, { id: "1302", name: "Barco Dragón", file: "Unit_1302.png", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "1750", name: "Thirisadai", file: "Unit_1750.png", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "831", name: "Barco Tortuga", file: "Unit_831.png", age: "castle", type: "unit" }, { id: "832", name: "Barco Tortuga de Elite", file: "Unit_832.png", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "1004", name: "Carabela", file: "Unit_1004.png", age: "castle", type: "unit" }, { id: "1006", name: "Carabela de Elite", file: "Unit_1006.png", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "1948", name: "Louchuan", file: "Unit_1948.png", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "545", name: "Transporte", file: "Unit_545.png", age: "feudal", type: "unit" }] },
            { nodes: [{ id: "250", name: "Drakkar", file: "Unit_250.png", age: "castle", type: "unit" }, { id: "533", name: "Drakkar de Elite", file: "Unit_533.png", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "374_tech", name: "Carenado", file: "374.png", age: "castle", type: "tech" }, { id: "375_tech", name: "Dique Seco", file: "375.png", age: "imperial", type: "tech" }, { id: "376_tech", name: "Carpintero Naval", file: "376.png", age: "imperial", type: "tech" }, { id: "373_tech", name: "Calafateo", file: "373.png", age: "imperial", type: "tech" }] }
         ]
       }
    ]
  },
  {
    category: "Defensa",
    id: "defense",
    iconBuilding: "Building_79.png", 
    buildings: [
      {
        id: "b_79", name: "Torre", file: "79.png", type: "building",
        lines: [
          { nodes: [{ id: "598", name: "Puesto Avanzada", file: "598.png", age: "dark", type: "building" }, { id: "234", name: "Torre Vigía", file: "234.png", age: "feudal", type: "building" }, { id: "235", name: "Torre Guardia", file: "235.png", age: "castle", type: "building" }, { id: "236", name: "Atalaya", file: "236.png", age: "imperial", type: "building" }, { id: "64", name: "Torre Bombarda", file: "64.png", age: "imperial", type: "tech" }] }
        ]
      },
      {
        id: "b_117", name: "Muros y Puertas", file: "117.png", type: "building",
        lines: [
          { nodes: [{ id: "72", name: "Empalizada", file: "72.png", age: "dark", type: "building" }] },
          { nodes: [{ id: "117", name: "Muro de Piedra", file: "117.png", age: "feudal", type: "building" }, { id: "155", name: "Muro Fortificado", file: "155.png", age: "castle", type: "building" }] },
          { nodes: [{ id: "487", name: "Puerta", file: "487.png", age: "feudal", type: "building" }, { id: "792", name: "Puerta de Piedra", file: "792.png", age: "castle", type: "building" }] }
        ]
      }
    ]
  },
  {
    category: "Investigación",
    id: "research",
    iconBuilding: "Building_209.png",
    buildings: [
       {
         id: "b_209", name: "Universidad", file: "209.png", type: "building",
         lines: [
            { nodes: [{ id: "50", name: "Albañilería", file: "50.png", age: "castle", type: "tech" }, { id: "51", name: "Arquitectura", file: "51.png", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "194", name: "Muralla Fortificada", file: "194.png", age: "castle", type: "tech" }] },
            { nodes: [{ id: "93", name: "Balística", file: "93.png", age: "castle", type: "tech" }] },
            { nodes: [{ id: "380", name: "Disparo al Rojo", file: "380.png", age: "castle", type: "tech" }] },
            { nodes: [{ id: "322", name: "Matacanes", file: "322.png", age: "castle", type: "tech" }] },
            { nodes: [{ id: "54", name: "Grúa", file: "54.png", age: "castle", type: "tech" }] },
            { nodes: [{ id: "47", name: "Química", file: "47.png", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "377", name: "Ingenieros de Asedio", file: "377.png", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "608", name: "Aspilleras", file: "608.png", age: "imperial", type: "tech" }] }
         ]
       },
       {
         id: "b_104", name: "Monasterio", file: "104.png", type: "building",
         lines: [
            { nodes: [{ id: "125", name: "Monje", file: "Unit_125.png", age: "castle", type: "unit" }] },
            { nodes: [{ id: "1811", name: "Sacerdote Guerrero", file: "Unit_1811.png", age: "castle", type: "unit" }] },
            { nodes: [{ id: "775", name: "Monje Misionero", file: "Unit_775.png", age: "castle", type: "unit" }] },
            { nodes: [{ id: "46", name: "Devoción", file: "46.png", age: "castle", type: "tech" }] },
            { nodes: [{ id: "316", name: "Redención", file: "316.png", age: "castle", type: "tech" }, { id: "319", name: "Expiación", file: "319.png", age: "castle", type: "tech" }] },
            { nodes: [{ id: "441", name: "Medicina Herbal", file: "441.png", age: "castle", type: "tech" }, { id: "439", name: "Herejía", file: "439.png", age: "castle", type: "tech" }] },
            { nodes: [{ id: "231", name: "Santidad", file: "231.png", age: "castle", type: "tech" }, { id: "252", name: "Fervor", file: "252.png", age: "castle", type: "tech" }] },
            { nodes: [{ id: "45", name: "Fe", file: "45.png", age: "imperial", type: "tech" }, { id: "233", name: "Iluminación", file: "233.png", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "230", name: "Imprenta", file: "230.png", age: "imperial", type: "tech" }, { id: "438", name: "Teocracia", file: "438.png", age: "imperial", type: "tech" }] }
         ]
       },
       {
         id: "b_103", name: "Herrería", file: "103.png", type: "building",
         lines: [
            { nodes: [{ id: "211", name: "Armadura Acolchada", file: "211.png", age: "feudal", type: "tech" }, { id: "212", name: "Armadura de Cuero", file: "212.png", age: "castle", type: "tech" }, { id: "219", name: "Armadura de Anillos", file: "219.png", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "199", name: "Flecha", file: "199.png", age: "feudal", type: "tech" }, { id: "200", name: "Punzon de Flecha", file: "200.png", age: "castle", type: "tech" }, { id: "201", name: "Brazalete", file: "201.png", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "67", name: "Forja", file: "67.png", age: "feudal", type: "tech" }, { id: "68", name: "Fundición", file: "68.png", age: "castle", type: "tech" }, { id: "75", name: "Alto Horno", file: "75.png", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "74", name: "Láminas", file: "74.png", age: "feudal", type: "tech" }, { id: "76", name: "Cota de Malla", file: "76.png", age: "castle", type: "tech" }, { id: "77", name: "Placas", file: "77.png", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "81", name: "Barda", file: "81.png", age: "feudal", type: "tech" }, { id: "82", name: "Cota de Malla (Cab)", file: "82.png", age: "castle", type: "tech" }, { id: "80", name: "Placas (Cab)", file: "80.png", age: "imperial", type: "tech" }] }
         ]
       }
    ]
  },
  {
    category: "Castillo",
    id: "castle",
    iconBuilding: "Building_82.png",
    buildings: [
       {
         id: "b_82", name: "Castillo", file: "82.png", type: "building",
         lines: [
            { nodes: [{ id: "UNIQUE_UNIT", name: "Unidad Única", file: "UNIQUE_UNIT", age: "castle", type: "unique_unit" }, { id: "UNIQUE_UNIT_ELITE", name: "Unidad Única (Élite)", file: "UNIQUE_UNIT", age: "imperial", type: "unique_unit" }] },
            { nodes: [{ id: "UNIQUE_TECH_1", name: "Tecnología Única 1", file: "unique_tech_1.png", age: "castle", type: "unique_tech" }, { id: "UNIQUE_TECH_2", name: "Tecnología Única 2", file: "unique_tech_2.png", age: "imperial", type: "unique_tech" }] },
            { nodes: [{ id: "440", name: "Petardo", file: "Unit_440.png", age: "castle", type: "unit" }, { id: "999440", name: "Petardo Especial", file: "Unit_440.png", age: "castle", type: "unit" }] },
            { nodes: [{ id: "331", name: "Lanzapiedras", file: "Unit_331.png", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "1944", name: "Caballería Pesada", file: "Unit_1944.png", age: "castle", type: "unit" }, { id: "1946", name: "Caballería Pesada Elite", file: "Unit_1946.png", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "1254", name: "Konnik", file: "Unit_1254.png", age: "castle", type: "unit" }, { id: "1255", name: "Konnik Elite", file: "Unit_1255.png", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "1966", name: "Liu Bei", file: "Unit_1966.png", age: "imperial", type: "unit" }, { id: "1978", name: "Sun Jian", file: "Unit_1978.png", age: "imperial", type: "unit" }, { id: "1954", name: "Cao Cao", file: "Unit_1954.png", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "1962", name: "Carro de Guerra", file: "Unit_1962.png", age: "castle", type: "unit" }] },
            { nodes: [{ id: "1251", name: "Krepost", file: "1251.png", age: "castle", type: "building" }] },
            { nodes: [{ id: "276", name: "Maravilla", file: "276.png", age: "imperial", type: "building" }] },
            { nodes: [{ id: "321", name: "Zapadores", file: "321.png", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "315", name: "Levas", file: "315.png", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "379", name: "Matacanes (Castillo)", file: "379.png", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "408", name: "Espías", file: "408.png", age: "imperial", type: "tech" }] }
         ]
       }
    ]
  }
]