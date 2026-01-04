"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
    ChevronDown, LayoutGrid, X, Cross
} from "lucide-react"
import { cn } from "@/lib/utils"
import { CIVILIZATIONS } from "@/lib/data/civilizations"
import { TECH_TREE_STRUCTURE } from "@/lib/data/techtree-structure"
import { UNIT_DATABASE } from "@/components/techtree/unit-database"
import { UnitTooltip } from "@/components/techtree/unit-tooltip"
import { isIdAvailable, getUniqueUnitId, getUniqueTechId } from "@/lib/data/aoe2-data-provider"

function resolveNodeId(civName: string, node: any) {
    if (node.id === 'UNIQUE_UNIT') {
        const id = getUniqueUnitId(civName, false);
        return id ? id.toString() : node.id;
    }
    if (node.id === 'UNIQUE_UNIT_ELITE') {
        const id = getUniqueUnitId(civName, true);
        return id ? id.toString() : node.id;
    }
    if (node.id === 'UNIQUE_TECH_1') {
        const id = getUniqueTechId(civName, false);
        return id ? id.toString() : node.id;
    }
    if (node.id === 'UNIQUE_TECH_2') {
        const id = getUniqueTechId(civName, true);
        return id ? id.toString() : node.id;
    }
    return node.id;
}

function getImagePath(civ: string, type: string, file: string, id: string) {
    // Unique Units have a placeholder file "UNIQUE_UNIT", so we must use the resolved ID
    if (type === 'unique-unit' || type === 'unique_unit') return `/images/techtree/${civ}/Unidades/Unit_${id}.png`;

    // For everything else, trust the 'file' property from the structure
    if (type === 'building') return `/images/techtree/${civ}/Edificios/${file}`;
    if (type === 'unit') return `/images/techtree/${civ}/Unidades/${file}`;
    
    // Technologies (Standard and Unique)
    return `/images/techtree/${civ}/Technologies/${file}`;
}

export default function TechTreePage() {
  const [selectedCiv, setSelectedCiv] = useState(CIVILIZATIONS[0])
  const [isCivPickerOpen, setIsCivPickerOpen] = useState(false)
  const [hoveredNode, setHoveredNode] = useState<any | null>(null)
  const [activeSection, setActiveSection] = useState(TECH_TREE_STRUCTURE[0].id)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ w: 1200, h: 800 })
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateSize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight })
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const scrollToSection = (id: string) => {
      const element = document.getElementById(id);
      if (element && mainRef.current) {
          setActiveSection(id);
          mainRef.current.scrollTo({
              top: element.offsetTop - 40,
              behavior: 'smooth'
          });
      }
  }

  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden font-sans selection:bg-yellow-500/30 selection:text-yellow-200">
        <div className="flex flex-1 overflow-hidden pt-32">
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
                                    <p className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.3em] mb-1">Civilización</p>
                                    <h2 className="text-4xl font-black uppercase tracking-tighter text-white leading-none mb-2 truncate">{selectedCiv.name}</h2>
                                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{selectedCiv.specialty}</p>
                                </div>
                            </div>
                        </div>
                    </button>

                    <div className="grid grid-cols-2 gap-4">
                        <RatingItem label="Economy" value={selectedCiv.ratings.economy} />
                        <RatingItem label="Mobility" value={selectedCiv.ratings.mobility} />
                        <RatingItem label="Defense" value={selectedCiv.ratings.defense} />
                        <RatingItem label="Offense" value={selectedCiv.ratings.rush} />
                    </div>

                    {/* Team Bonus */}
                    <div className="p-5 bg-blue-500/5 border border-blue-500/10 rounded-3xl text-left relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity"><LayoutGrid className="w-12 h-12 text-blue-500" /></div>
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2 relative z-10">Team Bonus</p>
                        <p className="text-sm font-bold text-zinc-200 relative z-10">{selectedCiv.teamBonus}</p>
                    </div>

                    {/* Civ Bonuses */}
                    <div className="space-y-3 pt-2">
                        <p className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.2em] px-1">Civilization Bonuses</p>
                        {selectedCiv.bonuses.map((bonus: any, i: number) => (
                            <div key={i} className="flex gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors text-left text-zinc-300 text-[13px]">
                                <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 shrink-0 mt-2 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                                <span>{bonus.description}</span>
                            </div>
                        ))}
                    </div>

                    {/* Strengths & Weaknesses */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-3">
                             <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] px-1">Fortalezas</p>
                             {selectedCiv.strengths.map((s: string, i: number) => (
                                 <div key={i} className="text-[10px] uppercase tracking-wide text-zinc-400 font-bold px-3 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">{s}</div>
                             ))}
                        </div>
                        <div className="space-y-3">
                             <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] px-1">Debilidades</p>
                             {selectedCiv.weaknesses.map((w: string, i: number) => (
                                 <div key={i} className="text-[10px] uppercase tracking-wide text-zinc-400 font-bold px-3 py-2 bg-red-500/5 border border-red-500/10 rounded-xl">{w}</div>
                             ))}
                        </div>
                    </div>
                </div>
            </aside>

            <main ref={mainRef} className="flex-1 overflow-auto custom-scrollbar relative bg-[#020202]">
                <div className="p-20 min-w-fit space-y-32">
                    {TECH_TREE_STRUCTURE.map((section) => (
                        <div key={section.id} id={section.id} className="scroll-mt-20">
                            <div className="flex items-center gap-8 mb-16 text-left">
                                <h3 className="text-6xl font-black uppercase tracking-tighter text-white/10 italic leading-none">{section.category}</h3>
                                <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                            </div>
                            <div className="flex gap-24">
                                {section.buildings.map((building) => (
                                    <div key={building.id} className="flex flex-col gap-16 items-center">
                                        <div className="relative group/node">
                                            <motion.div 
                                                className={cn(
                                                    "w-20 h-20 rounded-2xl flex items-center justify-center p-3 transition-all duration-300 bg-zinc-900 border-2 border-white/10 shadow-xl",
                                                    !isIdAvailable(selectedCiv.name, building.id, 'building') && "opacity-30 grayscale"
                                                )}
                                                onMouseEnter={(e) => { setHoveredNode({ id: building.id, name: building.name }); setMousePos({ x: e.clientX, y: e.clientY }); }}
                                                onMouseLeave={() => setHoveredNode(null)}
                                            >
                                                <img src={getImagePath(selectedCiv.name, 'building', building.file, building.id)} alt="" className="w-full h-full object-contain" />
                                                {!isIdAvailable(selectedCiv.name, building.id, 'building') && <div className="absolute inset-0 flex items-center justify-center"><X className="text-red-600/40 w-12 h-12" /></div>}
                                            </motion.div>
                                            <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase text-zinc-600 tracking-widest">{building.name}</p>
                                        </div>
                                        <div className="flex gap-8">
                                            {building.lines.map((line, lIdx) => (
                                                <div key={lIdx} className="flex flex-col gap-8">
                                                    {line.nodes.map((node) => {
                                                        const resolvedId = resolveNodeId(selectedCiv.name, node);
                                                        return (
                                                        <div key={node.id} className="relative group/node">
                                                            <motion.div 
                                                                className={cn(
                                                                    "w-14 h-14 rounded-xl flex items-center justify-center p-2 transition-all duration-300 bg-zinc-900 border border-white/10 shadow-lg",
                                                                    !isIdAvailable(selectedCiv.name, resolvedId, node.type) && "opacity-30 grayscale"
                                                                )}
                                                                onMouseEnter={(e) => { setHoveredNode({ id: resolvedId, name: node.name }); setMousePos({ x: e.clientX, y: e.clientY }); }}
                                                                onMouseLeave={() => setHoveredNode(null)}
                                                            >
                                                                <img src={getImagePath(selectedCiv.name, node.type, node.file, resolvedId)} alt="" className="w-full h-full object-contain" />
                                                                {!isIdAvailable(selectedCiv.name, resolvedId, node.type) && <div className="absolute inset-0 flex items-center justify-center"><X className="text-red-600/40 w-10 h-10" /></div>}
                                                            </motion.div>
                                                        </div>
                                                    )})}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>

        <AnimatePresence>
            {isCivPickerOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl p-12 overflow-y-auto">
                    <div className="max-w-7xl mx-auto space-y-16">
                        <div className="flex justify-between items-center border-b border-white/10 pb-8 text-left">
                            <h3 className="text-6xl font-black uppercase text-white mb-2">Selecciona Civilización</h3>
                            <button onClick={() => setIsCivPickerOpen(false)} className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-500"><X className="w-10 h-10 text-white" /></button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {CIVILIZATIONS.map(civ => (
                                <button key={civ.id} onClick={() => { setSelectedCiv(civ); setIsCivPickerOpen(false); }} className="p-6 rounded-[2.5rem] border-2 border-white/5 bg-zinc-900/50 hover:bg-yellow-500 flex flex-col items-center gap-4 transition-all group">
                                    <div className="h-20 w-20 rounded-2xl bg-zinc-950 flex items-center justify-center relative overflow-hidden">
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
                <div className="fixed pointer-events-none z-[200]" style={{ left: mousePos.x > windowSize.w - 450 ? mousePos.x - 420 : mousePos.x + 20, top: mousePos.y > windowSize.h - 500 ? mousePos.y - 400 : mousePos.y + 20 }}>
                    <UnitTooltip unitId={hoveredNode.id} civName={selectedCiv.name} />
                </div>
            )}
        </AnimatePresence>
    </div>
  )
}

function RatingItem({ label, value }: { label: string, value: number }) {
    return (
        <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-2xl space-y-2 text-left">
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