"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Crown, Zap, Info, ChevronRight, Filter, Shield, Sword, Anchor, Landmark, Warehouse, GraduationCap, Cross, Hammer, Box, Target, ZapOff, Eye, Waves } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"
import { CIVILIZATIONS } from "@/lib/data/civilizations"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { UnitTooltip } from "@/components/techtree/unit-tooltip"
import { TECH_TREE_STRUCTURE } from "@/lib/data/techtree-structure"
import { isIdAvailable, getUniqueUnitId, getUniqueTechId } from "@/lib/data/aoe2-data-provider"

const AGES = [
  { id: "dark", name: "Oscura", label: "I" },
  { id: "feudal", name: "Feudal", label: "II" },
  { id: "castle", name: "Castillos", label: "III" },
  { id: "imperial", name: "Imperial", label: "IV" }
]

export default function TechTreePage() {
  const [selectedCiv, setSelectedCiv] = React.useState<any>(CIVILIZATIONS[0])
  const [searchQuery, setSearchQuery] = React.useState("")
  const [hoveredNode, setHoveredNode] = React.useState<any>(null)
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = React.useState({ w: 1920, h: 1080 })

  React.useEffect(() => {
    setWindowSize({ w: window.innerWidth, h: window.innerHeight })
    const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getImagePath = (civName: string, type: string, fileName: string, id: string) => {
      // Handle Unique Units
      if (id === "UNIQUE_UNIT") {
          return selectedCiv.uniqueUnitImage;
      }
      if (id === "UNIQUE_UNIT_ELITE") {
          return selectedCiv.uniqueUnitImage; // For now use same image
      }

      const folderName = civName.charAt(0).toUpperCase() + civName.slice(1).toLowerCase();
      let actualType = type;

      // Map types to folder names
      if (type === 'unit') actualType = 'Unidades';
      if (type === 'tech') actualType = 'Technologies';
      if (type === 'building') actualType = 'Edificios';
      if (type === 'unique_tech') actualType = 'Technologies';

      // Fallback for Unique Tech Icons (they are named unique_tech_1.png in folders but ID is numeric)
      if (id === "UNIQUE_TECH_1") return `/images/techtree/${folderName}/Technologies/unique_tech_1.png`;
      if (id === "UNIQUE_TECH_2") return `/images/techtree/${folderName}/Technologies/unique_tech_2.png`;

      return `/images/techtree/${folderName}/${actualType}/${fileName}`;
  }

  const handleMouseMove = (e: React.MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
  }

  const scrollToSection = (id: string) => {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="flex h-screen flex-col bg-[#020202] text-white overflow-hidden" onMouseMove={handleMouseMove}>
      <Navbar />
      
      <div className="flex flex-1 pt-[120px] overflow-hidden relative">
        <aside className="w-64 border-r border-white/5 bg-[#050505] flex flex-col shrink-0 z-[20] shadow-2xl relative">
            <div className="p-6 space-y-6">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                    <input className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-[10px] font-black uppercase outline-none focus:border-yellow-500/50" placeholder="SEARCH CIV..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className="flex items-center gap-4 p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl">
                    <img src={selectedCiv.icon} alt="" className="w-10 h-10 rounded-lg border border-yellow-500/50 shadow-lg" />
                    <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase truncate">{selectedCiv.name}</p>
                        <p className="text-[8px] font-bold text-yellow-500/60 uppercase truncate">{selectedCiv.specialty}</p>
                    </div>
                </div>
                
                {/* CIV BONUSES PANEL */}
                <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-2xl space-y-3">
                    <div className="space-y-1">
                        <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Team Bonus</p>
                        <p className="text-[10px] text-zinc-300 leading-tight">{selectedCiv.teamBonus}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Civilization Bonuses</p>
                        <ul className="space-y-1.5 overflow-y-auto max-h-[300px] custom-scrollbar">
                            {selectedCiv.bonuses.map((bonus: any, i: number) => (
                                <li key={i} className="text-[10px] text-zinc-400 leading-tight flex gap-2">
                                    <span className="text-yellow-500">•</span>
                                    {bonus.description}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
                {CIVILIZATIONS.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map(civ => (
                    <button 
                        key={civ.id} 
                        onClick={() => setSelectedCiv(civ)}
                        className={cn(
                            "w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/5 transition-all group text-left",
                            selectedCiv.id === civ.id ? "bg-yellow-500/10 text-yellow-500" : "text-zinc-500"
                        )}
                    >
                        <img src={civ.icon} className="w-6 h-6 rounded object-cover grayscale group-hover:grayscale-0 transition-all" />
                        <span className={cn("text-[10px] font-black uppercase tracking-widest group-hover:text-white", selectedCiv.id === civ.id ? "text-yellow-500" : "text-zinc-400")}>{civ.name}</span>
                    </button>
                ))}
            </nav>
        </aside>

        <main className="flex-1 overflow-auto custom-scrollbar relative bg-[#020202]">
            <div className="sticky top-0 z-40 bg-[#020202]/95 backdrop-blur-md border-b border-white/5 py-8 shadow-2xl">
                <div className="grid grid-cols-4 ml-64 mr-20">
                    {AGES.map(age => (
                        <div key={age.id} className="text-center">
                            <div className="text-[11px] font-black text-yellow-500/60 uppercase tracking-[0.6em] mb-1">{age.name}</div>
                            <div className="text-2xl font-black italic text-zinc-800">{age.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-20 space-y-48 pb-96">
                {TECH_TREE_STRUCTURE.map((section) => (
                    <div key={section.id} id={section.id} className="space-y-32 scroll-mt-40">
                        {section.buildings.map((building) => {
                            // Building availability check
                            const isBuildingAvailable = isIdAvailable(selectedCiv.name, building.id, 'building');
                            
                            return (
                                <div key={building.id} className={cn("flex items-center gap-24 relative min-h-[300px]", !isBuildingAvailable && "opacity-30 grayscale")}>
                                    <div className="w-40 shrink-0 sticky left-0 z-[30] self-center">
                                        <div className="relative w-40 h-40 bg-[#0a0a0b] border-2 border-white/5 rounded-3xl flex flex-col items-center justify-center p-6 shadow-2xl hover:border-yellow-500/50 transition-all group">
                                            <img src={getImagePath(selectedCiv.name, building.type || 'building', building.file, building.id)} alt="" className="w-full h-full object-contain mb-3" />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 text-center">{building.name}</span>
                                            {isBuildingAvailable && <div className="absolute right-[-24px] top-1/2 w-6 h-[2px] bg-yellow-500/20" />}
                                            {!isBuildingAvailable && (
                                                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 rounded-3xl">
                                                    <Cross className="w-24 h-24 text-red-600 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] stroke-[3]" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-12 relative">
                                        <div className="absolute left-[-3.1rem] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-yellow-500/10 to-transparent" />
                                        {building.lines.map((line, lIdx) => (
                                            <div key={lIdx} className="grid grid-cols-4 gap-20 relative items-center h-24">
                                                <div className="absolute left-[-3rem] top-1/2 w-12 h-[2px] bg-yellow-500/10 -translate-y-1/2" />
                                                {AGES.map((age, aIdx) => (
                                                    <div key={age.id} className="flex justify-center items-center relative z-10">
                                                        {line.nodes.filter(n => n.age === age.id).map(node => {
                                                            // Determine actual ID if it's a unique slot
                                                            let actualId: string | number = node.id;
                                                            let effectiveType = node.type || 'unit';

                                                            if (node.id === "UNIQUE_UNIT") actualId = getUniqueUnitId(selectedCiv.name) || node.id;
                                                            if (node.id === "UNIQUE_UNIT_ELITE") actualId = getUniqueUnitId(selectedCiv.name, true) || node.id;
                                                            if (node.id === "UNIQUE_TECH_1") {
                                                                actualId = getUniqueTechId(selectedCiv.name) || node.id;
                                                                effectiveType = 'tech';
                                                            }
                                                            if (node.id === "UNIQUE_TECH_2") {
                                                                actualId = getUniqueTechId(selectedCiv.name, true) || node.id;
                                                                effectiveType = 'tech';
                                                            }

                                                            const isAvailable = isIdAvailable(selectedCiv.name, actualId, effectiveType as any);
                                                            
                                                            return (
                                                                <div key={node.id} className="relative">
                                                                    {aIdx < 3 && line.nodes.some(next => next.age === AGES[aIdx+1].id) && isAvailable && (
                                                                        <div className="absolute left-full top-1/2 w-20 h-[2px] bg-gradient-to-r from-yellow-500/30 to-transparent -translate-y-1/2" />
                                                                    )}
                                                                    <motion.div
                                                                        onMouseEnter={() => setHoveredNode({ ...node, id: actualId })}
                                                                        onMouseLeave={() => setHoveredNode(null)}
                                                                        whileHover={isAvailable ? { scale: 1.25, y: -5, zIndex: 100 } : {}}
                                                                        className={cn(
                                                                            "relative w-20 h-20 rounded-2xl cursor-pointer flex items-center justify-center p-2 shadow-2xl transition-all border-2",
                                                                            hoveredNode?.id === actualId && isAvailable ? "bg-[#111] border-yellow-500" : "bg-black border-white/10",
                                                                            !isAvailable && "opacity-50 grayscale border-red-500/50 bg-red-900/10"
                                                                        )}
                                                                    >
                                                                        <img src={getImagePath(selectedCiv.name, node.type || 'unit', node.file, node.id)} alt="" className="w-full h-full object-contain" />
                                                                        {!isAvailable && (
                                                                            <div className="absolute inset-0 z-20 flex items-center justify-center">
                                                                                 <Cross className="w-16 h-16 text-red-600 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] stroke-[3]" />
                                                                            </div>
                                                                        )}
                                                                        <div className={cn("absolute -bottom-1 -right-1 w-5 h-5 text-black text-[9px] font-black rounded-md flex items-center justify-center border-2 border-black z-30", isAvailable ? "bg-yellow-500" : "bg-zinc-800 text-zinc-500")}>
                                                                            {age.label}
                                                                        </div>
                                                                    </motion.div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </main>
      </div>

      {/* INTELLIGENT TOOLTIP POSITIONING */}
      <AnimatePresence>
        {hoveredNode && (
            <div 
                className="fixed pointer-events-none z-[200]" 
                style={{ 
                    left: mousePos.x > windowSize.w / 2 ? mousePos.x - 525 : mousePos.x + 25, 
                    top: mousePos.y > windowSize.h - 600 ? mousePos.y - 400 : mousePos.y + 25,
                    maxHeight: '80vh',
                    overflowY: 'auto'
                }}
            >
                <UnitTooltip unitId={hoveredNode.id} civName={selectedCiv.name} />
            </div>
        )}
      </AnimatePresence>
    </div>
  )
}