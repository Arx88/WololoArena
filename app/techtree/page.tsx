"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, LayoutGrid, X, AlertTriangle, Zap, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/language-context"
import { CIVILIZATIONS } from "@/lib/data/civilizations"
import { UnitTooltip } from "@/components/techtree/unit-tooltip"
import { isIdAvailable, getUniqueUnitId, getUniqueTechId, getEntityAvailability } from "@/lib/data/aoe2-data-provider"

// THE ABSOLUTE TRUTH: Comprehensive Structure
const TECH_TREE_DATA = [
  {
    category: "Economía",
    id: "eco",
    buildings: [
      { id: "b_109", name: "Centro Urbano", file: "109.png", lines: [
          { nodes: [{ id: "83", name: "Aldeano", age: "dark", type: "unit" }] },
          { nodes: [{ id: "22", name: "Telar", age: "dark", type: "tech" }] },
          { nodes: [{ id: "213", name: "Carretilla", age: "feudal", type: "tech" }, { id: "249", name: "Carro de Mano", age: "castle", type: "tech" }] },
          { nodes: [{ id: "8", name: "Guardia Urbana", age: "feudal", type: "tech" }, { id: "280", name: "Patrulla Urbana", age: "castle", type: "tech" }] },
          { nodes: [{ id: "101", name: "Edad Feudal", age: "dark", type: "tech" }, { id: "102", name: "Edad Castillos", age: "feudal", type: "tech" }, { id: "103", name: "Edad Imperial", age: "castle", type: "tech" }] }
      ]},
      { id: "b_68", name: "Molino", file: "68.png", lines: [
          { nodes: [{ id: "14", name: "Collera", age: "feudal", type: "tech" }, { id: "13", name: "Arado Pesado", age: "castle", type: "tech" }, { id: "12", name: "Rotación de Cultivos", age: "imperial", type: "tech" }] },
          { nodes: [{ id: "b_50", name: "Granja", age: "dark", type: "building" }] }
      ]},
      { id: "b_1808", name: "Carro de Mulas", file: "1808.png", lines: [
           { nodes: [{ id: "1014", name: "Crianza de Animales", age: "castle", type: "tech" }] }
      ]}
    ]
  },
  {
    category: "Infantería",
    id: "inf",
    buildings: [
      { id: "b_12", name: "Cuarteles", file: "12.png", type: "building", lines: [
          { nodes: [{ id: "74", name: "Milicia", age: "dark", type: "unit" }, { id: "75", name: "Hombre de Armas", age: "feudal", type: "unit" }, { id: "77", name: "Espadachín", age: "castle", type: "unit" }, { id: "473", name: "Esp. Dos Manos", age: "imperial", type: "unit" }, { id: "567", name: "Campeón", age: "imperial", type: "unit" }, { id: "1793", name: "Legionario", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "93", name: "Lancero", age: "feudal", type: "unit" }, { id: "358", name: "Piquero", age: "castle", type: "unit" }, { id: "359", name: "Alabardero", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "751", name: "Explorador Águila", age: "feudal", type: "unit" }, { id: "753", name: "Guerrero Águila", age: "castle", type: "unit" }, { id: "752", name: "Guerrero Águila de Élite", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "882", name: "Condottiero", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1699", name: "Piquero Flamenco", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1570", name: "Invasor Azteca", age: "castle", type: "unit" }] },
          { nodes: [{ id: "1974", name: "Espadachín Jian", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1660", name: "Serjeant (D)", age: "castle", type: "unit" }, { id: "1661", name: "Serjeant Elite (D)", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "716", name: "Suministros", age: "feudal", type: "tech" }, { id: "875", name: "Gambesones", age: "castle", type: "tech" }, { id: "215", name: "Escuderos", age: "castle", type: "tech" }, { id: "602", name: "Incendio", age: "castle", type: "tech" }] }
      ]}
    ]
  },
  {
    category: "Rango",
    id: "arch",
    buildings: [
      { id: "b_87", name: "Arquería", file: "87.png", type: "building", lines: [
          { nodes: [{ id: "4", name: "Arquero", age: "feudal", type: "unit" }, { id: "24", name: "Ballestero", age: "castle", type: "unit" }, { id: "492", name: "Arbalestero", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "6", name: "Hostigador", age: "feudal", type: "unit" }, { id: "7", name: "Hostigador de Élite", age: "castle", type: "unit" }, { id: "1155", name: "Hostigador Imperial", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "39", name: "Arquero a Caballo", age: "castle", type: "unit" }, { id: "474", name: "Arquero a Caballo Pesado", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1007", name: "Genitour", age: "castle", type: "unit" }, { id: "1009", name: "Genitour de Élite", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "185", name: "Hondero", age: "castle", type: "unit" }] },
          { nodes: [{ id: "5", name: "Artillero Manual", age: "imperial", type: "unit" }, { id: "1911", name: "Granadero", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "437", name: "Anillo de Pulgar", age: "castle", type: "tech" }, { id: "436", name: "Tácticas Partas", age: "imperial", type: "tech" }] }
      ]}
    ]
  },
  {
    category: "Caballería",
    id: "cav",
    buildings: [
      { id: "b_101", name: "Establo", file: "101.png", type: "building", lines: [
          { nodes: [{ id: "448", name: "Explorador", age: "feudal", type: "unit" }, { id: "546", name: "Caballería Ligera", age: "castle", type: "unit" }, { id: "441", name: "Húsar", age: "imperial", type: "unit" }, { id: "1707", name: "Húsar Alado", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "38", name: "Caballero", age: "castle", type: "unit" }, { id: "283", name: "Cavalier", age: "imperial", type: "unit" }, { id: "569", name: "Paladín", age: "imperial", type: "unit" }, { id: "1813", name: "Savar", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "329", name: "Jinete de Camello", age: "castle", type: "unit" }, { id: "330", name: "Camello Pesado", age: "imperial", type: "unit" }, { id: "1105", name: "Camello Imperial", age: "imperial", type: "unit" }, { id: "1923", name: "Camello de Asedio", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1132", name: "Elefante de Batalla", age: "castle", type: "unit" }, { id: "1134", name: "Elefante de Batalla de Élite", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1370", name: "Lancero Estepario", age: "castle", type: "unit" }, { id: "1372", name: "Lancero Estepario de Élite", age: "imperial", type: "unit" }, { id: "1901", name: "Lancero Estepario (H)", age: "castle", type: "unit" }, { id: "1903", name: "Lancero Estepario Elite (H)", age: "imperial", type: "unit" }, { id: "207", name: "Lancero (H2)", age: "castle", type: "unit" }] },
          { nodes: [{ id: "1751", name: "Jinete Shrivamsha", age: "castle", type: "unit" }, { id: "1753", name: "Jinete Shrivamsha Elite", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1952", name: "Caballería Xianbei", age: "castle", type: "unit" }] },
          { nodes: [{ id: "1263", name: "Camello Flamígero", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1755", name: "Camello Explorador", age: "feudal", type: "unit" }] },
          { nodes: [{ id: "1944", name: "Caballería Pesada", age: "castle", type: "unit" }, { id: "1946", name: "Caballería Pesada Elite", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "435", name: "Pureza de Sangre", age: "feudal", type: "tech" }, { id: "216", name: "Ganadería", age: "castle", type: "tech" }, { id: "1014", name: "Crianza de Animales", age: "castle", type: "tech" }] }
      ]}
    ]
  },
  {
    category: "Asedio",
    id: "sie",
    buildings: [
      { id: "b_49", name: "Taller de Asedio", file: "49.png", type: "building", lines: [
          { nodes: [{ id: "1258", name: "Ariete", age: "castle", type: "unit" }, { id: "422", name: "Ariete Cubierto", age: "imperial", type: "unit" }, { id: "548", name: "Ariete de Asedio", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "280", name: "Catapulta", age: "castle", type: "unit" }, { id: "550", name: "Onagro", age: "imperial", type: "unit" }, { id: "588", name: "Onagro de Asedio", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "279", name: "Escorpión", age: "castle", type: "unit" }, { id: "542", name: "Escorpión Pesado", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "36", name: "Cañón de Bombardeo", age: "imperial", type: "unit" }, { id: "1709", name: "Houfnice", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1744", name: "Elefante con Armadura", age: "castle", type: "unit" }, { id: "1746", name: "Elefante de Asedio", age: "imperial", type: "unit" }, { id: "873", name: "Elefante Arm. (Alt)", age: "castle", type: "unit" }, { id: "875", name: "Elefante Arm. Elite (Alt)", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1904", name: "Carro de Cohetes", age: "castle", type: "unit" }, { id: "1907", name: "Carro de Cohetes Pesado", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1942", name: "Lanzapiedras de Tracción", age: "imperial", type: "unit" }] },
          { nodes: [{ id: "1105", name: "Torre de Asedio", age: "castle", type: "unit" }] }
      ]}
    ]
  },
  {
    category: "Muelle",
    id: "dock",
    buildings: [
       { id: "b_45", name: "Muelle", file: "45.png", type: "building", lines: [
            { nodes: [{ id: "13", name: "Pesquero", age: "dark", type: "unit" }, { id: "65", name: "Redes de Agalla", age: "castle", type: "tech" }] },
            { nodes: [{ id: "539", name: "Galera", age: "feudal", type: "unit" }, { id: "21", name: "Galera de Guerra", age: "castle", type: "unit" }, { id: "442", name: "Galeón", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "1103", name: "Balsa de Fuego", age: "feudal", type: "unit" }, { id: "529", name: "Barco de Fuego", age: "castle", type: "unit" }, { id: "532", name: "Barco de Fuego Rápido", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "1104", name: "Balsa de Demolición", age: "feudal", type: "unit" }, { id: "527", name: "Barco de Demolición", age: "castle", type: "unit" }, { id: "528", name: "Barco de Demolición Pesado", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "420", name: "Galeón Artillado", age: "imperial", type: "unit" }, { id: "691", name: "Galeón Artillado de Élite", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "1795", name: "Dromon", age: "castle", type: "unit" }, { id: "1302", name: "Barco Dragón", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "1750", name: "Thirisadai", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "831", name: "Barco Tortuga", age: "castle", type: "unit" }, { id: "832", name: "Barco Tortuga de Elite", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "1004", name: "Carabela", age: "castle", type: "unit" }, { id: "1006", name: "Carabela de Elite", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "1948", name: "Louchuan", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "545", name: "Transporte", age: "feudal", type: "unit" }] },
            { nodes: [{ id: "250", name: "Drakkar", age: "castle", type: "unit" }, { id: "533", name: "Drakkar de Elite", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "374_tech", name: "Carenado", age: "castle", type: "tech" }, { id: "375_tech", name: "Dique Seco", age: "imperial", type: "tech" }, { id: "376_tech", name: "Carpintero Naval", age: "imperial", type: "tech" }, { id: "373_tech", name: "Calafateo", age: "imperial", type: "tech" }] }
       ]}
    ]
  },
  {
    category: "Defensa",
    id: "defense",
    buildings: [
      { id: "b_79", name: "Torre", file: "79.png", type: "building", lines: [
          { nodes: [{ id: "598", name: "Puesto Avanzada", age: "dark", type: "building" }, { id: "234", name: "Torre Vigía", age: "feudal", type: "building" }, { id: "235", name: "Torre Guardia", age: "castle", type: "building" }, { id: "236", name: "Atalaya", age: "imperial", type: "building" }, { id: "64", name: "Torre Bombarda", age: "imperial", type: "tech" }] }
      ]},
      { id: "b_117", name: "Muros y Puertas", file: "117.png", type: "building", lines: [
          { nodes: [{ id: "72", name: "Empalizada", age: "dark", type: "building" }] },
          { nodes: [{ id: "117", name: "Muro de Piedra", age: "feudal", type: "building" }, { id: "155", name: "Muro Fortificado", age: "castle", type: "building" }] },
          { nodes: [{ id: "487", name: "Puerta", age: "feudal", type: "building" }, { id: "792", name: "Puerta de Piedra", age: "castle", type: "building" }] }
      ]}
    ]
  },
  {
    category: "Castillo",
    id: "castle",
    buildings: [
       { id: "b_82", name: "Castillo", file: "82.png", type: "building", lines: [
            { nodes: [{ id: "UNIQUE_UNIT", name: "Unidad Única", age: "castle", type: "unique_unit" }, { id: "UNIQUE_UNIT_ELITE", name: "Unidad Única (Élite)", age: "imperial", type: "unique_unit" }] },
            { nodes: [{ id: "UNIQUE_TECH_1", name: "Tecnología Única 1", age: "castle", type: "unique_tech" }, { id: "UNIQUE_TECH_2", name: "Tecnología Única 2", age: "imperial", type: "unique_tech" }] },
            { nodes: [{ id: "440", name: "Petardo", age: "castle", type: "unit" }] },
            { nodes: [{ id: "331", name: "Lanzapiedras", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "1254", name: "Konnik", age: "castle", type: "unit" }, { id: "1255", name: "Konnik Elite", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "1966", name: "Liu Bei", age: "imperial", type: "unit" }, { id: "1978", name: "Sun Jian", age: "imperial", type: "unit" }, { id: "1954", name: "Cao Cao", age: "imperial", type: "unit" }] },
            { nodes: [{ id: "1962", name: "Carro de Guerra", age: "castle", type: "unit" }] },
            { nodes: [{ id: "1251", name: "Krepost", age: "castle", type: "building" }] },
            { nodes: [{ id: "276", name: "Maravilla", age: "imperial", type: "building" }] }
       ]}
    ]
  },
  {
    category: "Investigación",
    id: "research",
    buildings: [
       { id: "b_209", name: "Universidad", file: "209.png", type: "building", lines: [
            { nodes: [{ id: "50", name: "Albañilería", age: "castle", type: "tech" }, { id: "51", name: "Arquitectura", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "194", name: "Muralla Fortificada", age: "castle", type: "tech" }] },
            { nodes: [{ id: "93", name: "Balística", age: "castle", type: "tech" }] },
            { nodes: [{ id: "380", name: "Disparo al Rojo", age: "castle", type: "tech" }] },
            { nodes: [{ id: "322", name: "Matacanes", age: "castle", type: "tech" }] },
            { nodes: [{ id: "47", name: "Química", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "377", name: "Ingenieros de Asedio", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "608", name: "Aspilleras", age: "imperial", type: "tech" }] }
       ]},
       { id: "b_104", name: "Monasterio", file: "104.png", type: "building", lines: [
            { nodes: [{ id: "125", name: "Monje", age: "castle", type: "unit" }] },
            { nodes: [{ id: "1811", name: "Sacerdote Guerrero", age: "castle", type: "unit" }] },
            { nodes: [{ id: "775", name: "Monje Misionero", age: "castle", type: "unit" }] },
            { nodes: [{ id: "46", name: "Devoción", age: "castle", type: "tech" }] },
            { nodes: [{ id: "316", name: "Redención", age: "castle", type: "tech" }, { id: "319", name: "Expiación", age: "castle", type: "tech" }] },
            { nodes: [{ id: "441", name: "Medicina Herbal", age: "castle", type: "tech" }, { id: "439", name: "Herejía", age: "castle", type: "tech" }] },
            { nodes: [{ id: "231", name: "Santidad", age: "castle", type: "tech" }, { id: "252", name: "Fervor", age: "castle", type: "tech" }] },
            { nodes: [{ id: "45", name: "Fe", age: "imperial", type: "tech" }, { id: "233", name: "Iluminación", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "230", name: "Imprenta", age: "imperial", type: "tech" }, { id: "438", name: "Teocracia", age: "imperial", type: "tech" }] }
       ]},
       { id: "b_103", name: "Herrería", file: "103.png", type: "building", lines: [
            { nodes: [{ id: "211", name: "Armadura Acolchada", age: "feudal", type: "tech" }, { id: "212", name: "Armadura de Cuero", age: "castle", type: "tech" }, { id: "219", name: "Armadura de Anillos", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "199", name: "Flecha", age: "feudal", type: "tech" }, { id: "200", name: "Punzon de Flecha", age: "castle", type: "tech" }, { id: "201", name: "Brazalete", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "67", name: "Forja", age: "feudal", type: "tech" }, { id: "68", name: "Fundición", age: "castle", type: "tech" }, { id: "75", name: "Alto Horno", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "74", name: "Láminas", age: "feudal", type: "tech" }, { id: "76", name: "Cota de Malla", age: "castle", type: "tech" }, { id: "77", name: "Placas", age: "imperial", type: "tech" }] },
            { nodes: [{ id: "81", name: "Barda", age: "feudal", type: "tech" }, { id: "82", name: "Cota de Malla (Cab)", age: "castle", type: "tech" }, { id: "80", name: "Placas (Cab)", age: "imperial", type: "tech" }] }
       ]}
    ]
  }
];

const CORE_STANDARDS = [
  { id: "24",  name: "Ballestero", type: "unit" },
  { id: "492", name: "Arbalesta", type: "unit" },
  { id: "283", name: "Cavalier", type: "unit" },
  { id: "569", name: "Paladín", type: "unit" },
  { id: "359", name: "Alabardero", type: "unit" },
  { id: "567", name: "Campeón", type: "unit" },
  { id: "548", name: "Ariete Asedio", type: "unit" },
  { id: "588", name: "Onagro Asedio", type: "unit" },
  { id: "36",  name: "Cañón Bombarda", type: "unit" },
  { id: "117", name: "Muro Piedra", type: "building" },
  { id: "155", name: "Muro Fort", type: "tech" },
  { id: "93",  name: "Balística", type: "tech" },
  { id: "47",  name: "Química", type: "tech" },
  { id: "201", name: "Brazalete", type: "tech" },
  { id: "77",  name: "Placas Inf", type: "tech" },
  { id: "80",  name: "Placas Cab", type: "tech" },
  { id: "219", name: "Anillo Arq", type: "tech" },
  { id: "437", name: "Anillo Pulgar", type: "tech" },
  { id: "435", name: "Sangre", type: "tech" },
  { id: "377", name: "Ing. Asedio", type: "tech" },
  { id: "316", name: "Redención", type: "tech" },
  { id: "230", name: "Imprenta", type: "tech" },
  { id: "442", name: "Galeón", type: "unit" }
];

const COMPENSATED_MISSING: Record<string, string[]> = {
  "Franks": ["435"], 
  "Aztecs": ["38", "283", "569", "448", "546", "441", "329", "1132"], 
  "Mayans": ["38", "283", "569", "448", "546", "441", "329", "1132"], 
  "Incas": ["38", "283", "569", "448", "546", "441", "329", "1132"],
};

function resolveNodeId(civName: string, node: any) {
    if (node.id === 'UNIQUE_UNIT') return getUniqueUnitId(civName, false)?.toString() || node.id;
    if (node.id === 'UNIQUE_UNIT_ELITE') return getUniqueUnitId(civName, true)?.toString() || node.id;
    if (node.id === 'UNIQUE_TECH_1') return getUniqueTechId(civName, false)?.toString() || node.id;
    if (node.id === 'UNIQUE_TECH_2') return getUniqueTechId(civName, true)?.toString() || node.id;
    return node.id;
}

function getImagePath(civ: string, type: string, file: string, id: string): string[] {
    const baseUrl = `/images/techtree/${civ}`;
    const baseUrlLower = `/images/techtree/${civ.toLowerCase()}`;
    const cleanId = id.toString().replace('b_', '').replace('t_', '').replace('_tech', '').replace('_sie', '').replace('_ship', '').replace('_farm', '');
    const cb = "?v=13";
    const paths: string[] = [];
    const addPath = (p: string) => { paths.push(`${baseUrl}${p}${cb}`); paths.push(`${baseUrlLower}${p}${cb}`); };

    if (type.includes('unique')) { addPath(`/Units/${cleanId}.png`); addPath(`/Units/unique_unit.png`); }
    else if (type === 'building') { addPath(`/Buildings/${cleanId}.png`); addPath(`/Buildings/${file}`); }
    else if (type === 'unit') { addPath(`/Units/${cleanId}.png`); addPath(`/Units/${file}`); addPath(`/Unidades/Unit_${cleanId}.png`); }
    else { addPath(`/Technologies/${cleanId}.png`); addPath(`/Technologies/${file}`); }
    return paths;
}

function SmartImage({ paths, alt, className }: { paths: string[], alt: string, className?: string }) {
    const [pathIdx, setPathIdx] = React.useState(0);
    const [hasError, setHasError] = React.useState(false);
    React.useEffect(() => { setPathIdx(0); setHasError(false); }, [paths.join(',')]);
    const handleError = () => { if (pathIdx < paths.length - 1) setPathIdx(pathIdx + 1); else setHasError(true); };
    if (hasError) return <div className={cn("flex items-center justify-center bg-zinc-800 border border-red-500/30", className)}><span className="text-[8px] text-red-400">?</span></div>;
    return <img src={paths[pathIdx]} alt={alt} className={className} onError={handleError} />;
}

const BUILDING_REPLACEMENTS: Record<string, Record<string, { id: string, name: string, file: string, lines?: any[] }>> = {
    "Armenians": {
        "b_104": { id: "b_1806", name: "Iglesia Fortificada", file: "1806.png" },
        "b_562": { id: "b_1808", name: "Carro de Mulas", file: "1808.png" },
        "b_584": { id: "b_1808", name: "Carro de Mulas", file: "1808.png" }
    },
    "Georgians": {
        "b_104": { id: "b_1806", name: "Iglesia Fortificada", file: "1806.png" },
        "b_562": { id: "b_1808", name: "Carro de Mulas", file: "1808.png" },
        "b_584": { id: "b_1808", name: "Carro de Mulas", file: "1808.png" }
    }
};

export default function TechTreePage() {
  const { t } = useLanguage()
  const [selectedCiv, setSelectedCiv] = useState(CIVILIZATIONS[0])
  const [isCivPickerOpen, setIsCivPickerOpen] = useState(false)
  const [hoveredNode, setHoveredNode] = useState<any | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ w: 1200, h: 800 })
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateSize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight })
    updateSize(); window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const missingItems = CORE_STANDARDS.filter(item => {
      const isAvailable = isIdAvailable(selectedCiv.name, item.id, item.type);
      const isCompensated = COMPENSATED_MISSING[selectedCiv.name]?.includes(item.id);
      return !isAvailable && !isCompensated;
  });

  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden font-sans selection:bg-yellow-500/30 pt-[120px]">
        <div className="flex flex-1 overflow-hidden relative">
            <aside className="w-[440px] border-r border-white/5 bg-zinc-950 flex flex-col shrink-0 z-[40] shadow-2xl relative overflow-hidden">
                <div className="p-8 space-y-8 flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar relative z-10">
                    <button onClick={() => setIsCivPickerOpen(true)} className="w-full group text-left">
                        <div className="p-6 bg-gradient-to-br from-zinc-900 to-black border-2 border-white/10 rounded-[2.5rem] shadow-2xl relative overflow-hidden transition-all group-hover:border-yellow-500/50">
                            <div className="flex items-center gap-6">
                                <div className="relative shrink-0">
                                    <div className="absolute inset-0 bg-yellow-500/30 blur-2xl rounded-full" />
                                    <img src={`/images/civs/${selectedCiv.id.toLowerCase()}_shield.png`} alt="" className="w-20 h-20 rounded-2xl border-2 border-yellow-500/40 object-cover relative z-10 shadow-2xl" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.3em] mb-1">{t("civilization")}</p>
                                    <h2 className="text-4xl font-black uppercase tracking-tighter text-white leading-none mb-2 truncate">{selectedCiv.name}</h2>
                                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{selectedCiv.specialty}</p>
                                </div>
                            </div>
                        </div>
                    </button>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 px-1 opacity-60">
                            <Zap className="w-3 h-3 text-emerald-500 fill-emerald-500/20" />
                            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">{t("strongIn") || "FUERTE EN:"}</p>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            {selectedCiv.strengths.map((s: string, i: number) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                    <span className="text-[11px] font-bold text-zinc-200 uppercase tracking-wide leading-tight">{s}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <RatingItem label={t("economy")} value={selectedCiv.ratings.economy} />
                        <RatingItem label={t("mobility")} value={selectedCiv.ratings.mobility} />
                        <RatingItem label={t("defense")} value={selectedCiv.ratings.defense} />
                        <RatingItem label={t("offense")} value={selectedCiv.ratings.rush} />
                    </div>

                    <div className="p-5 bg-blue-500/5 border border-blue-500/10 rounded-3xl text-left relative overflow-hidden">
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2">{t("teamBonus")}</p>
                        <p className="text-sm font-bold text-zinc-200">{selectedCiv.teamBonus}</p>
                    </div>

                    <div className="space-y-3 pt-2">
                        <p className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.2em] px-1">{t("civBonuses")}</p>
                        {selectedCiv.bonuses.map((bonus: any, i: number) => (
                            <div key={i} className="flex gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-left text-zinc-300 text-[13px]">
                                <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 shrink-0 mt-2" />
                                <span>{bonus.description}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* STICKY TOP AREA */}
                <div className="flex-none bg-zinc-950/80 border-b border-white/10 p-6 flex flex-col gap-4 sticky top-0 z-[60] backdrop-blur-3xl">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        <h4 className="text-sm font-black uppercase text-red-500 tracking-[0.3em]">{t("missing") || "FALTANTE:"}</h4>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {missingItems.length > 0 ? missingItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 px-5 py-3 bg-red-500/10 border border-red-500/20 rounded-xl group hover:bg-red-500/20 transition-all">
                                <div className="w-[38px] h-[38px] rounded-lg overflow-hidden bg-black/60 p-1.5 grayscale group-hover:grayscale-0">
                                    <SmartImage 
                                        paths={getImagePath(selectedCiv.name, item.type, `${item.id}.png`, item.id)} 
                                        alt="" 
                                        className="w-full h-full object-contain" 
                                    />
                                </div>
                                <span className="text-[12px] font-black text-zinc-300 group-hover:text-white uppercase tracking-tight">{item.name}</span>
                            </div>
                        )) : (
                            <div className="flex items-center gap-2 text-emerald-500 opacity-60">
                                <ShieldCheck className="w-4 h-4" />
                                <span className="text-[11px] font-black uppercase">Árbol optimizado</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* SCROLLABLE TREE AREA */}
                <main ref={mainRef} className="flex-1 overflow-auto custom-scrollbar relative bg-[#050505]">
                    <div className="min-w-[1400px] relative pb-32">
                        {/* AGE HEADER: STICKY TO MAIN SCROLL */}
                        <div className="sticky top-0 z-50 grid grid-cols-[140px_1fr_1fr_1fr_1fr] border-b border-white/10 bg-[#050505]/95 backdrop-blur-md shadow-2xl">
                            <div className="p-4 border-r border-white/5 flex items-center justify-center">
                                <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">{t("structure")}</span>
                            </div>
                            {[t("darkAge"), t("feudalAge"), t("castleAge"), t("imperialAge")].map((age, i) => (
                                <div key={age} className="p-4 border-r border-white/5 last:border-r-0 flex items-center justify-center relative overflow-hidden">
                                    <div className={cn("absolute inset-0 opacity-10", i === 0 ? "bg-blue-500" : i === 1 ? "bg-green-500" : i === 2 ? "bg-yellow-500" : "bg-red-500")} />
                                    <span className={cn("text-xs font-black uppercase tracking-[0.2em] relative z-10", i === 0 ? "text-blue-400" : i === 1 ? "text-green-400" : i === 2 ? "text-yellow-400" : "text-red-400")}>{age}</span>
                                </div>
                            ))}
                        </div>

                        <div className="p-8 space-y-24">
                            {TECH_TREE_DATA.map((section: any) => (
                                <div key={section.id} id={section.id} className="scroll-mt-32">
                                    <div className="flex items-center gap-4 mb-8 px-4">
                                        <h3 className="text-2xl font-black uppercase tracking-tighter text-zinc-500 italic">{section.category}</h3>
                                        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                                    </div>
                                    <div className="space-y-4">
                                        {section.buildings.map((originalBuilding: any) => {
                                            const replacement = BUILDING_REPLACEMENTS[selectedCiv.name]?.[originalBuilding.id];
                                            const building = replacement ? { ...originalBuilding, ...replacement } : originalBuilding;
                                            return (
                                            <div key={`${selectedCiv.id}-${building.id}`} className="grid grid-cols-[140px_1fr_1fr_1fr_1fr] bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden hover:bg-white/[0.02] transition-colors relative group/row">
                                                <div className="p-6 border-r border-white/5 flex flex-col items-center justify-center gap-4 bg-zinc-900/30">
                                                    <div className="relative group/bld">
                                                        <motion.div 
                                                            className={cn("w-16 h-16 rounded-xl flex items-center justify-center p-2 transition-all duration-300 bg-zinc-900 border border-white/10 shadow-xl z-20 relative", !isIdAvailable(selectedCiv.name, building.id, 'building') && "opacity-30 grayscale")}
                                                            onMouseEnter={(e) => { setHoveredNode({ id: building.id, name: building.name }); setMousePos({ x: e.clientX, y: e.clientY }); }}
                                                            onMouseLeave={() => setHoveredNode(null)}
                                                        >
                                                            <SmartImage key={`${selectedCiv.id}-${building.id}`} paths={getImagePath(selectedCiv.name, 'building', building.file, building.id)} alt="" className="w-full h-full object-contain" />
                                                            {!isIdAvailable(selectedCiv.name, building.id, 'building') && <div className="absolute inset-0 flex items-center justify-center"><X className="text-red-600/40 w-10 h-10" /></div>}
                                                        </motion.div>
                                                        <p className="mt-2 text-[9px] font-black uppercase text-zinc-500 text-center tracking-wider">{building.name}</p>
                                                    </div>
                                                </div>
                                                <div className="col-span-4 relative h-full">
                                                    <div className="absolute inset-0 grid grid-cols-4 pointer-events-none z-0">
                                                        {[0,1,2,3].map(i => <div key={i} className="border-r border-white/5 h-full" />)}
                                                    </div>
                                                    <div className="relative w-full h-full flex flex-col justify-center py-6 gap-10 z-10">
                                                        {building.lines.map((line: any, lIdx: number) => {
                                                            const ageCounts: Record<number, number> = {};
                                                            return (
                                                            <div key={lIdx} className="relative w-full h-14 flex items-center">
                                                                <div className="absolute inset-0 w-full h-full">
                                                                    {line.nodes.map((node: any, nIdx: number) => {
                                                                        const resolvedId = resolveNodeId(selectedCiv.name, node);
                                                                        const { available: isAvailable, age: dynamicAge } = getEntityAvailability(selectedCiv.name, resolvedId, node.type);
                                                                        const finalAge = dynamicAge !== null ? dynamicAge : (node.age === 'dark' ? 1 : node.age === 'feudal' ? 2 : node.age === 'castle' ? 3 : 4);
                                                                        const ageCol = finalAge - 1; 
                                                                        
                                                                        const count = ageCounts[ageCol] || 0;
                                                                        ageCounts[ageCol] = count + 1;
                                                                        const horizontalOffset = count * 60;
                                                                        return (
                                                                            <div key={`${selectedCiv.id}-${resolvedId}-${nIdx}`} className="absolute top-0 h-full flex items-center justify-center transition-all duration-500" style={{ left: `calc(${ageCol * 25}% + ${horizontalOffset}px)`, width: '25%' }}>
                                                                                <div className="relative group/node z-10">
                                                                                    <motion.div 
                                                                                        className={cn("w-12 h-12 rounded-lg flex items-center justify-center p-1.5 transition-all duration-300 bg-[#0A0A0A] border shadow-lg relative", isAvailable ? "border-white/20 hover:border-yellow-500 hover:scale-110" : "border-white/5 opacity-40 grayscale")}
                                                                                        onMouseEnter={(e) => { setHoveredNode({ id: resolvedId, name: node.name }); setMousePos({ x: e.clientX, y: e.clientY }); }}
                                                                                        onMouseLeave={() => setHoveredNode(null)}
                                                                                    >
                                                                                        <SmartImage key={`${selectedCiv.id}-${resolvedId}`} paths={getImagePath(selectedCiv.name, node.type, node.file, resolvedId)} alt="" className="w-full h-full object-contain" />
                                                                                        {!isAvailable && <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg"><X className="text-red-500 w-8 h-8" /></div>}
                                                                                    </motion.div>
                                                                                    <p className={cn("absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-tight whitespace-nowrap px-2 py-0.5 rounded-md transition-colors", isAvailable ? "text-zinc-400 group-hover:text-white" : "text-zinc-700")}>{node.name}</p>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>
                                                        )})}
                                                    </div>
                                                </div>
                                            </div>
                                        )})}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
        <AnimatePresence>
            {isCivPickerOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl p-12 overflow-y-auto">
                    <div className="max-w-7xl mx-auto space-y-16">
                        <div className="flex justify-between items-center border-b border-white/10 pb-8">
                            <h3 className="text-6xl font-black uppercase text-white">{t("selectCivilization")}</h3>
                            <button onClick={() => setIsCivPickerOpen(false)} className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-500"><X className="w-10 h-10 text-white" /></button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {CIVILIZATIONS.map(civ => (
                                <button key={civ.id} onClick={() => { setSelectedCiv(civ); setIsCivPickerOpen(false); }} className="p-6 rounded-[2.5rem] border-2 border-white/5 bg-zinc-900/50 hover:bg-yellow-500 flex flex-col items-center gap-4 transition-all group">
                                    <div className="h-20 w-20 rounded-2xl bg-zinc-950 flex items-center justify-center overflow-hidden">
                                        <img src={`/images/civs/${civ.id.toLowerCase()}_shield.png`} alt={civ.name} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-xs font-black uppercase text-zinc-500 group-hover:text-black">{civ.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
        <AnimatePresence>
            {hoveredNode && (
                <div className="fixed pointer-events-none z-[200]" style={{ left: mousePos.x > windowSize.w - 400 ? mousePos.x - 380 : mousePos.x + 20, top: mousePos.y > windowSize.h - 450 ? mousePos.y - 420 : Math.max(20, mousePos.y - 50) }}>
                    <UnitTooltip unitId={hoveredNode.id} civName={selectedCiv.name} />
                </div>
            )}
        </AnimatePresence>
    </div>
  )
}

function RatingItem({ label, value }: { label: string, value: number }) {
    return (
        <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-2xl space-y-2">
            <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{label}</p>
            <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-black rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(value / 10) * 100}%` }} className="h-full rounded-full bg-gradient-to-r from-yellow-700 to-yellow-400" />
                </div>
                <span className="text-xs font-black text-white">{value}</span>
            </div>
        </div>
    )
}
