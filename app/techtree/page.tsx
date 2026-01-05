"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
    ChevronDown, LayoutGrid, X, Cross
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/language-context"
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

function getImagePath(civ: string, type: string, file: string, id: string): string[] {
    const baseUrl = `/images/techtree/${civ}`;
    const cleanId = id.toString().replace('b_', '').replace('t_', '');
    
    const paths: string[] = [];

    if (type === 'unique-unit' || type === 'unique_unit') {
        paths.push(`${baseUrl}/Units/unique_unit.png`);
        paths.push(`${baseUrl}/Units/${cleanId}.png`);
        paths.push(`${baseUrl}/Unidades/unique_unit.png`);
        paths.push(`${baseUrl}/Unidades/Unit_${cleanId}.png`);
    } else if (type === 'building') {
        paths.push(`${baseUrl}/Buildings/${file}`);
        paths.push(`${baseUrl}/Edificios/${file.includes('Building_') ? file : 'Building_' + file}`);
        paths.push(`${baseUrl}/Buildings/${cleanId}.png`);
        paths.push(`${baseUrl}/Edificios/Building_${cleanId}.png`);
    } else if (type === 'unit') {
        paths.push(`${baseUrl}/Units/${file}`);
        paths.push(`${baseUrl}/Unidades/${file.includes('Unit_') ? file : 'Unit_' + file}`);
        paths.push(`${baseUrl}/Units/${cleanId}.png`);
        paths.push(`${baseUrl}/Unidades/Unit_${cleanId}.png`);
    } else {
        paths.push(`${baseUrl}/Technologies/${file}`);
        paths.push(`${baseUrl}/Tecnologias/${file}`);
        // Some techs might also have prefixes in some folders
        paths.push(`${baseUrl}/Technologies/${cleanId}.png`);
    }

    return paths;
}

// Helper component for robust images
function SmartImage({ paths, alt, className }: { paths: string[], alt: string, className?: string }) {
    const [pathIdx, setPathIdx] = React.useState(0);
    
    const handleError = () => {
        if (pathIdx < paths.length - 1) {
            setPathIdx(pathIdx + 1);
        }
    };

    return (
        <img 
            src={paths[pathIdx]} 
            alt={alt} 
            className={className} 
            onError={handleError}
        />
    );
}

export default function TechTreePage() {
  const { t } = useLanguage()
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
    <div className="flex flex-col h-screen bg-black overflow-hidden font-sans selection:bg-yellow-500/30 selection:text-yellow-200 pt-[120px]">
        <div className="flex flex-1 overflow-hidden">
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

                    <div className="grid grid-cols-2 gap-4">
                        <RatingItem label={t("economy")} value={selectedCiv.ratings.economy} />
                        <RatingItem label={t("mobility")} value={selectedCiv.ratings.mobility} />
                        <RatingItem label={t("defense")} value={selectedCiv.ratings.defense} />
                        <RatingItem label={t("offense")} value={selectedCiv.ratings.rush} />
                    </div>

                    {/* Team Bonus */}
                    <div className="p-5 bg-blue-500/5 border border-blue-500/10 rounded-3xl text-left relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity"><LayoutGrid className="w-12 h-12 text-blue-500" /></div>
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2 relative z-10">{t("teamBonus")}</p>
                        <p className="text-sm font-bold text-zinc-200 relative z-10">{selectedCiv.teamBonus}</p>
                    </div>

                    {/* Civ Bonuses */}
                    <div className="space-y-3 pt-2">
                        <p className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.2em] px-1">{t("civBonuses")}</p>
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
                             <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] px-1">{t("strengths")}</p>
                             {selectedCiv.strengths.map((s: string, i: number) => (
                                 <div key={i} className="text-[10px] uppercase tracking-wide text-zinc-400 font-bold px-3 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">{s}</div>
                             ))}
                        </div>
                        <div className="space-y-3">
                             <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] px-1">{t("weaknesses")}</p>
                             {selectedCiv.weaknesses.map((w: string, i: number) => (
                                 <div key={i} className="text-[10px] uppercase tracking-wide text-zinc-400 font-bold px-3 py-2 bg-red-500/5 border border-red-500/10 rounded-xl">{w}</div>
                             ))}
                        </div>
                    </div>
                </div>
            </aside>

            <main ref={mainRef} className="flex-1 overflow-auto custom-scrollbar relative bg-[#050505]">
                <div className="min-w-[1400px] relative pb-32">
                    
                    {/* Sticky Age Headers */}
                    <div className="sticky top-0 z-30 grid grid-cols-[140px_1fr_1fr_1fr_1fr] border-b border-white/10 bg-[#050505]/95 backdrop-blur-md shadow-2xl">
                        <div className="p-4 border-r border-white/5 flex items-center justify-center">
                            <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">{t("structure")}</span>
                        </div>
                        {[t("darkAge"), t("feudalAge"), t("castleAge"), t("imperialAge")].map((age, i) => (
                            <div key={age} className="p-4 border-r border-white/5 last:border-r-0 flex items-center justify-center gap-3 relative overflow-hidden group">
                                <div className={cn("absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20", 
                                    i === 0 ? "bg-blue-500" : i === 1 ? "bg-green-500" : i === 2 ? "bg-yellow-500" : "bg-red-500")} />
                                <span className={cn("text-xs font-black uppercase tracking-[0.2em] relative z-10",
                                     i === 0 ? "text-blue-400" : i === 1 ? "text-green-400" : i === 2 ? "text-yellow-400" : "text-red-400"
                                )}>{age}</span>
                            </div>
                        ))}
                    </div>

                    {/* Tech Tree Content */}
                    <div className="p-8 space-y-24">
                        {TECH_TREE_STRUCTURE.map((section) => (
                            <div key={section.id} id={section.id} className="scroll-mt-32">
                                {/* Section Header */}
                                <div className="flex items-center gap-4 mb-8 px-4">
                                    <h3 className="text-2xl font-black uppercase tracking-tighter text-zinc-500 italic">{section.category}</h3>
                                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                                </div>

                                {/* Buildings Rows */}
                                <div className="space-y-4">
                                    {section.buildings.map((building) => (
                                        <div key={building.id} className="grid grid-cols-[140px_1fr_1fr_1fr_1fr] bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden hover:bg-white/[0.02] transition-colors relative group/row">
                                            
                                            {/* Column 1: The Building Itself */}
                                            <div className="p-6 border-r border-white/5 flex flex-col items-center justify-center gap-4 bg-zinc-900/30">
                                                <div className="relative group/bld">
                                                    <motion.div 
                                                        className={cn(
                                                            "w-16 h-16 rounded-xl flex items-center justify-center p-2 transition-all duration-300 bg-zinc-900 border border-white/10 shadow-xl z-20 relative",
                                                            !isIdAvailable(selectedCiv.name, building.id, 'building') && "opacity-30 grayscale"
                                                        )}
                                                        onMouseEnter={(e) => { setHoveredNode({ id: building.id, name: building.name }); setMousePos({ x: e.clientX, y: e.clientY }); }}
                                                        onMouseLeave={() => setHoveredNode(null)}
                                                    >
                                                        <SmartImage 
                                                            paths={getImagePath(selectedCiv.name, 'building', building.file, building.id)} 
                                                            alt="" 
                                                            className="w-full h-full object-contain" 
                                                        />
                                                        {!isIdAvailable(selectedCiv.name, building.id, 'building') && <div className="absolute inset-0 flex items-center justify-center"><X className="text-red-600/40 w-10 h-10" /></div>}
                                                    </motion.div>
                                                    <p className="mt-2 text-[9px] font-black uppercase text-zinc-500 text-center tracking-wider">{building.name}</p>
                                                </div>
                                            </div>

                                            {/* Columns 2-5: The Ages & Units */}
                                            <div className="col-span-4 relative h-full">
                                                {/* Background Grid Lines (Absolute overlay) */}
                                                <div className="absolute inset-0 grid grid-cols-4 pointer-events-none z-0">
                                                    <div className="border-r border-white/5 h-full" />
                                                    <div className="border-r border-white/5 h-full" />
                                                    <div className="border-r border-white/5 h-full" />
                                                    <div className="h-full" />
                                                </div>

                                                {/* Render Lines Container */}
                                                <div className="relative w-full h-full flex flex-col justify-center py-6 gap-10 z-10">
                                                    {building.lines.map((line, lIdx) => (
                                                        <div key={lIdx} className="relative w-full h-14 flex items-center">
                                                             {/* Connector Lines Background (Full width of the line) */}
                                                            {/* We need to draw lines only between existing nodes. This is complex with absolute positioning.
                                                                Simplified: Draw a faint guide line for the whole row? No, looks messy.
                                                                Better: Draw lines strictly between nodes in the map loop.
                                                            */}
                                                            
                                                            <div className="absolute inset-0 w-full h-full">
                                                                {line.nodes.map((node, nIdx) => {
                                                                    const resolvedId = resolveNodeId(selectedCiv.name, node);
                                                                                                                                         const isAvailable = isIdAvailable(selectedCiv.name, resolvedId, node.type as any);                                                                    
                                                                    // Age Mapping
                                                                    const ageCol = node.age === 'dark' ? 0 : node.age === 'feudal' ? 1 : node.age === 'castle' ? 2 : 3;
                                                                    const leftPos = ageCol * 25; // 0%, 25%, 50%, 75%
                                                                    
                                                                    return (
                                                                        <div 
                                                                            key={node.id} 
                                                                            className="absolute top-0 h-full flex items-center justify-center"
                                                                            style={{ 
                                                                                left: `${leftPos}%`, 
                                                                                width: '25%' 
                                                                            }}
                                                                        >
                                                                             {/* Horizontal Connector to the LEFT (if previous node exists) */}
                                                                             {nIdx > 0 && line.nodes[nIdx - 1] && (
                                                                                 <div className={cn("absolute right-[50%] top-1/2 h-0.5 -translate-y-1/2 z-0")} 
                                                                                 style={{
                                                                                     width: `${(ageCol - (line.nodes[nIdx-1].age === 'dark' ? 0 : line.nodes[nIdx-1].age === 'feudal' ? 1 : line.nodes[nIdx-1].age === 'castle' ? 2 : 3)) * 100}%`,
                                                                                     background: isAvailable ? 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 100%)' : 'rgba(255,255,255,0.05)'
                                                                                 }}
                                                                                 />
                                                                             )}

                                                                            <div className="relative group/node z-10">
                                                                                                                                                                                        <motion.div 
                                                                                                                                                                                            className={cn(
                                                                                                                                                                                                "w-12 h-12 rounded-lg flex items-center justify-center p-1.5 transition-all duration-300 bg-[#0A0A0A] border shadow-lg relative",
                                                                                                                                                                                                isAvailable 
                                                                                                                                                                                                    ? "border-white/20 hover:border-yellow-500 hover:scale-110 hover:shadow-yellow-500/20" 
                                                                                                                                                                                                    : "border-white/5 opacity-40 grayscale"
                                                                                                                                                                                            )}
                                                                                                                                                                                            onMouseEnter={(e) => { setHoveredNode({ id: resolvedId, name: node.name }); setMousePos({ x: e.clientX, y: e.clientY }); }}
                                                                                                                                                                                            onMouseLeave={() => setHoveredNode(null)}
                                                                                                                                                                                        >
                                                                                                                                                                                            <SmartImage 
                                                                                                                                                                                                paths={getImagePath(selectedCiv.name, node.type, node.file, resolvedId)} 
                                                                                                                                                                                                alt="" 
                                                                                                                                                                                                className="w-full h-full object-contain" 
                                                                                                                                                                                            />                                                                                    {/* Type Indicators */}
                                                                                    {node.type.includes('tech') && <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500/20 rounded-full border border-blue-500/50" />}
                                                                                    {node.type.includes('unique') && <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500/20 rounded-full border border-yellow-500/50" />}

                                                                                    {!isAvailable && <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg"><X className="text-red-500 w-8 h-8" /></div>}
                                                                                </motion.div>
                                                                                <p className={cn("absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-tight whitespace-nowrap px-2 py-0.5 rounded-md transition-colors", 
                                                                                    isAvailable ? "text-zinc-400 group-hover:text-white" : "text-zinc-700"
                                                                                )}>{node.name}</p>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>

        <AnimatePresence>
            {isCivPickerOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl p-12 overflow-y-auto">
                    <div className="max-w-7xl mx-auto space-y-16">
                        <div className="flex justify-between items-center border-b border-white/10 pb-8 text-left">
                            <h3 className="text-6xl font-black uppercase text-white mb-2">{t("selectCivilization")}</h3>
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
                <div 
                    className="fixed pointer-events-none z-[200]" 
                    style={{ 
                        left: mousePos.x > windowSize.w - 400 ? mousePos.x - 380 : mousePos.x + 20, 
                        top: mousePos.y > windowSize.h - 450 ? mousePos.y - 420 : Math.max(20, mousePos.y - 50)
                    }}
                >
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