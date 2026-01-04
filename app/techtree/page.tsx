"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Warehouse, Sword, Target, Zap, Box, Anchor, GraduationCap, Cross, Castle, Hammer, ChevronRight, Info, Shield, Trophy, ChevronDown, X, Sparkles } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"
import { CIVILIZATIONS } from "@/lib/data/civilizations"
import { UnitTooltip } from "@/components/techtree/unit-tooltip"
import { TECH_TREE_STRUCTURE } from "@/lib/data/techtree-structure"
import { isIdAvailable, getUniqueUnitId, getUniqueTechId } from "@/lib/data/aoe2-data-provider"
import { UNIT_DATABASE } from "@/components/techtree/unit-database"

const AGES = [
  { id: "dark", name: "Oscura", label: "I", color: "text-zinc-500" },
  { id: "feudal", name: "Feudal", label: "II", color: "text-zinc-400" },
  { id: "castle", name: "Castillos", label: "III", color: "text-yellow-600" },
  { id: "imperial", name: "Imperial", label: "IV", color: "text-yellow-400" }
]

export default function TechTreePage() {
  const [selectedCiv, setSelectedCiv] = React.useState<any>(CIVILIZATIONS[0])
  const [searchQuery, setSearchQuery] = React.useState("")
  const [hoveredNode, setHoveredNode] = React.useState<any>(null)
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 })
  const [activeSection, setActiveSection] = React.useState("eco")
  const [isCivPickerOpen, setIsCivPickerOpen] = React.useState(false)
  const [windowSize, setWindowSize] = React.useState({ w: 1920, h: 1080 })
  const mainRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setWindowSize({ w: window.innerWidth, h: window.innerHeight })
    const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getImagePath = (civName: string, type: string, fileName: string, id: string) => {
      if (id === "UNIQUE_UNIT" || id === "UNIQUE_UNIT_ELITE") return selectedCiv.uniqueUnitImage;
      const folderName = civName.charAt(0).toUpperCase() + civName.slice(1).toLowerCase();
      let actualType = type;
      if (type === 'unit') actualType = 'Unidades';
      if (type === 'tech') actualType = 'Technologies';
      if (type === 'building') actualType = 'Edificios';
      if (type === 'unique_tech') actualType = 'Technologies';
      if (id === "UNIQUE_TECH_1" || id.includes("UNIQUE_TECH_1")) return `/images/techtree/${folderName}/Technologies/unique_tech_1.png`;
      if (id === "UNIQUE_TECH_2" || id.includes("UNIQUE_TECH_2")) return `/images/techtree/${folderName}/Technologies/unique_tech_2.png`;
      return `/images/techtree/${folderName}/${actualType}/${fileName}`;
  }

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
    <div className="flex h-screen flex-col bg-[#020202] text-white overflow-hidden font-sans selection:bg-yellow-500/30" onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}>
      <Navbar />
      
      <div className="flex flex-1 pt-[120px] overflow-hidden relative">
        
        {/* SIDEBAR - PROFESSIONAL DRAFT STYLE */}
        <aside className="w-[440px] border-r border-white/5 bg-zinc-950 flex flex-col shrink-0 z-[40] shadow-2xl relative overflow-hidden">
            
            <div className="p-8 space-y-8 flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar relative z-10">
                
                {/* CIV SELECTOR TRIGGER */}
                <button 
                    onClick={() => setIsCivPickerOpen(true)}
                    className="w-full group"
                >
                    <div className="p-6 bg-gradient-to-br from-zinc-900 to-black border-2 border-white/10 rounded-[2.5rem] shadow-2xl relative overflow-hidden transition-all group-hover:border-yellow-500/50">
                        <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex items-center gap-6">
                            <div className="relative shrink-0">
                                <div className="absolute inset-0 bg-yellow-500/30 blur-2xl rounded-full" />
                                <img src={selectedCiv.icon} alt="" className="w-20 h-20 rounded-2xl border-2 border-yellow-500/40 object-cover relative z-10 shadow-2xl" />
                            </div>
                            <div className="min-w-0 text-left">
                                <p className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.3em] mb-1">Civilización</p>
                                <h2 className="text-4xl font-black uppercase tracking-tighter text-white leading-none mb-2 truncate">{selectedCiv.name}</h2>
                                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{selectedCiv.specialty}</p>
                            </div>
                        </div>
                        <div className="absolute bottom-4 right-6 text-zinc-700">
                            <ChevronDown className="w-6 h-6" />
                        </div>
                    </div>
                </button>

                {/* QUICK NAV */}
                <div className="grid grid-cols-5 gap-3 p-2 bg-black/40 rounded-[2rem] border border-white/5 shadow-inner">
                    {TECH_TREE_STRUCTURE.map(section => (
                        <button 
                            key={section.id} 
                            onClick={() => scrollToSection(section.id)} 
                            className={cn(
                                "aspect-square rounded-2xl flex items-center justify-center transition-all border-2",
                                activeSection === section.id 
                                    ? "bg-yellow-500/10 border-yellow-500/50 shadow-lg shadow-yellow-500/10" 
                                    : "bg-transparent border-transparent hover:bg-white/5"
                            )}
                        >
                            <img 
                                src={`/images/techtree/${selectedCiv.name}/Edificios/${section.iconBuilding}`} 
                                className={cn("w-8 h-8 object-contain transition-all", activeSection !== section.id && "grayscale opacity-40 hover:opacity-100 hover:grayscale-0")} 
                                alt=""
                                onError={(e: any) => e.target.src = `/images/techtree/Britons/Edificios/${section.iconBuilding}`}
                            />
                        </button>
                    ))}
                </div>

                {/* POWER RATINGS */}
                <div className="grid grid-cols-2 gap-4">
                    <RatingItem label="Economy" value={selectedCiv.ratings.economy} />
                    <RatingItem label="Mobility" value={selectedCiv.ratings.mobility} />
                    <RatingItem label="Defense" value={selectedCiv.ratings.defense} />
                    <RatingItem label="Offense" value={selectedCiv.ratings.rush} />
                </div>

                {/* BONUSES */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-yellow-500/60 whitespace-nowrap">Bonificaciones Reales</p>
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-yellow-500/40 to-transparent" />
                        </div>
                        <div className="space-y-4">
                            {selectedCiv.bonuses.map((bonus: any, i: number) => (
                                <div key={i} className="p-5 bg-zinc-900/40 border border-white/5 rounded-[1.5rem] relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500/20 group-hover:bg-yellow-500 transition-all" />
                                    <p className="text-[14px] font-bold text-zinc-200 leading-relaxed group-hover:text-white transition-colors text-left">{bonus.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* PROS & CONS */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <p className="text-[9px] font-black uppercase text-emerald-500/60 tracking-widest pl-2">Fortalezas</p>
                            <div className="space-y-2 text-left">
                                {selectedCiv.strengths.map((s: string, i: number) => (
                                    <div key={i} className="px-3 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-[11px] font-bold text-emerald-200 flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" /> {s}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-3">
                            <p className="text-[9px] font-black uppercase text-red-500/60 tracking-widest pl-2">Debilidades</p>
                            <div className="space-y-2 text-left">
                                {selectedCiv.weaknesses.map((w: string, i: number) => (
                                    <div key={i} className="px-3 py-2 bg-red-500/5 border border-red-500/10 rounded-xl text-[11px] font-bold text-red-200 flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-red-500 shrink-0" /> {w}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 space-y-4 text-left">
                        <div className="flex items-center gap-3">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500/60 whitespace-nowrap">Dinámica de Equipo</p>
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-blue-500/40 to-transparent" />
                        </div>
                        <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-[2rem] text-left relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Shield size={60} /></div>
                            <p className="text-[14px] font-bold text-zinc-300 leading-snug italic relative z-10 pr-8">"{selectedCiv.teamBonus}"</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>

        {/* FULL SCREEN CIV PICKER OVERLAY */}
        <AnimatePresence>
            {isCivPickerOpen && (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-10 bg-black/90 backdrop-blur-2xl"
                >
                    <motion.div 
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        className="w-full max-w-6xl bg-zinc-950 border border-white/10 rounded-[4rem] shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden flex flex-col h-[85vh]"
                    >
                        <div className="p-12 bg-zinc-900/50 border-b border-white/5 flex items-center justify-between">
                            <div>
                                <h3 className="text-5xl font-black uppercase tracking-tighter text-white mb-2">Elegir Civilización</h3>
                                <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Explora las 45 naciones de Age of Empires II</p>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="relative w-80 group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-yellow-500" />
                                    <input 
                                        autoFocus
                                        className="w-full bg-black/40 border-2 border-white/5 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold uppercase outline-none focus:border-yellow-500/50 transition-all" 
                                        placeholder="Buscar..." 
                                        value={searchQuery} 
                                        onChange={(e) => setSearchQuery(e.target.value)} 
                                    />
                                </div>
                                <button onClick={() => setIsCivPickerOpen(false)} className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors group text-white">
                                    <X className="w-8 h-8 group-hover:scale-110 transition-transform" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                                {CIVILIZATIONS.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map(civ => (
                                    <button 
                                        key={civ.id} 
                                        onClick={() => { setSelectedCiv(civ); setIsCivPickerOpen(false); setSearchQuery(""); }}
                                        className={cn(
                                            "flex flex-col items-center gap-4 p-4 rounded-3xl transition-all duration-300 border-2 group/civ relative overflow-hidden",
                                            selectedCiv.id === civ.id ? "border-yellow-500 bg-yellow-500/10" : "border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10 hover:scale-105"
                                        )}
                                    >
                                        <div className="relative">
                                            <img src={civ.icon} className="w-20 h-20 object-cover rounded-2xl shadow-xl z-10 relative" alt={civ.name} />
                                            {selectedCiv.id === civ.id && <div className="absolute inset-0 bg-yellow-500/40 blur-xl rounded-full" />}
                                        </div>
                                        <span className="text-[11px] font-black uppercase text-center tracking-wider leading-none">{civ.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* MAIN AREA */}
        <main ref={mainRef} className="flex-1 overflow-auto custom-scrollbar relative bg-[#020202]">
            <div className="sticky top-0 z-30 bg-zinc-950/90 backdrop-blur-2xl border-b border-white/5 py-8 shadow-2xl">
                <div className="grid grid-cols-4 ml-[416px] mr-20 relative">
                    {AGES.map((age, i) => (
                        <div key={age.id} className="text-center">
                            <div className={cn("text-[11px] font-black uppercase tracking-[0.6em] mb-2", age.color)}>{age.name}</div>
                            <div className="text-4xl font-black italic text-zinc-900">{age.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-24 space-y-64 pb-[800px]">
                {TECH_TREE_STRUCTURE.map((section) => (
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} key={section.id} id={section.id} className="relative">
                        <div className="space-y-48">
                            {section.buildings.map((building) => {
                                const isBuildingAvailable = isIdAvailable(selectedCiv.name, building.id, 'building');
                                return (
                                    <div key={building.id} className={cn("flex items-center gap-32 relative")}>
                                        <div className="w-48 shrink-0 sticky left-0 z-[30] self-center">
                                            <div className={cn(
                                                "relative w-44 h-44 rounded-[3.5rem] flex flex-col items-center justify-center p-8 transition-all duration-700 border-4",
                                                isBuildingAvailable ? "bg-zinc-950 border-white/5 shadow-black hover:scale-110 hover:border-yellow-500/50 hover:bg-black group/building" : "bg-black border-zinc-900 opacity-10 grayscale scale-90"
                                            )}>
                                                <img src={getImagePath(selectedCiv.name, building.type || 'building', building.file, building.id)} alt="" className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,1)]" />
                                                {!isBuildingAvailable && <div className="absolute inset-0 flex items-center justify-center"><Cross className="w-24 h-24 text-red-600/30 stroke-[3]" /></div>}
                                                {isBuildingAvailable && <div className="absolute -right-24 top-1/2 w-24 h-[4px] bg-gradient-to-r from-zinc-800 to-transparent -translate-y-1/2" />}
                                            </div>
                                            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-700 text-center mt-8">{building.name}</p>
                                        </div>

                                        <div className="flex-1 space-y-24 relative py-8">
                                            {building.lines.length > 1 && isBuildingAvailable && <div className="absolute left-[-3rem] top-16 bottom-16 w-[4px] bg-zinc-900/80 rounded-full shadow-inner" />}
                                            {building.lines.map((line, lIdx) => (
                                                <div key={lIdx} className="grid grid-cols-4 gap-24 relative items-center min-h-[140px]">
                                                    {isBuildingAvailable && <div className="absolute left-[-3rem] top-1/2 w-12 h-[4px] bg-zinc-900/80 -translate-y-1/2" />}
                                                    {AGES.map((age, aIdx) => (
                                                        <div key={age.id} className="flex justify-center items-center relative z-10">
                                                            {line.nodes.filter(n => n.age === age.id).map(node => {
                                                                let actualId: string | number = node.id;
                                                                let effectiveType = node.type || 'unit';
                                                                if (node.id === "UNIQUE_UNIT") actualId = getUniqueUnitId(selectedCiv.name) || node.id;
                                                                if (node.id === "UNIQUE_UNIT_ELITE") actualId = getUniqueUnitId(selectedCiv.name, true) || node.id;
                                                                if (node.id === "UNIQUE_TECH_1") { actualId = (getUniqueTechId(selectedCiv.name) || node.id) + "_tech"; effectiveType = 'tech'; }
                                                                if (node.id === "UNIQUE_TECH_2") { actualId = (getUniqueTechId(selectedCiv.name, true) || node.id) + "_tech"; effectiveType = 'tech'; }
                                                                const isAvailable = isIdAvailable(selectedCiv.name, actualId, effectiveType as any);
                                                                const resolvedName = UNIT_DATABASE[actualId]?.name || node.name;
                                                                return (
                                                                    <div key={node.id} className="relative w-full flex justify-center group/node">
                                                                        {aIdx < 3 && line.nodes.some(next => next.age === AGES[aIdx+1].id) && isAvailable && <div className="absolute left-[50%] top-1/2 w-[calc(100%+96px)] h-[4px] bg-zinc-900 -translate-y-1/2 -z-10 group-hover/node:bg-yellow-500/30 transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.5)]" />}
                                                                        <motion.div
                                                                            viewport={{ once: true, margin: "-50px" }}
                                                                            data-testid={`node-${actualId}`}
                                                                            onMouseEnter={(e) => { setHoveredNode({ ...node, id: actualId, name: resolvedName }); setMousePos({ x: e.clientX, y: e.clientY }); }}
                                                                            onMouseLeave={() => setHoveredNode(null)}
                                                                            whileHover={isAvailable ? { scale: 1.25, y: -10, zIndex: 100 } : {}}
                                                                            className={cn("relative w-24 h-24 rounded-[2rem] flex items-center justify-center p-3 transition-all duration-500 border-4 cursor-pointer shadow-2xl", hoveredNode?.id === actualId && isAvailable ? "bg-zinc-800 border-yellow-500 shadow-[0_0_60px_rgba(234,179,8,0.4)] z-[100] scale-110" : "bg-black border-white/5 hover:border-white/20", !isAvailable && "opacity-20 grayscale border-red-950/20 bg-red-950/5")}
                                                                        >
                                                                            <img
                                                                                loading="lazy"
                                                                                src={getImagePath(selectedCiv.name, node.type || 'unit', node.file, node.id)}
                                                                                alt=""
                                                                                className="w-full h-full object-contain drop-shadow-[0_5px_15px_rgba(0,0,0,1)]"
                                                                            />
                                                                            {!isAvailable && <div className="absolute inset-0 z-20 flex items-center justify-center"><Cross className="w-14 h-14 text-red-600/40 stroke-[2.5]" /></div>}
                                                                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover/node:opacity-100 transition-all duration-300 pointer-events-none scale-90 group-hover/node:scale-100 z-[110]"><span className="text-[11px] font-black uppercase text-yellow-500 tracking-[0.2em] bg-black/95 px-4 py-2 rounded-full border border-yellow-500/30 whitespace-nowrap shadow-[0_10px_30px_rgba(0,0,0,1)]">{resolvedName}</span></div>
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
                    </motion.div>
                ))}
            </div>
        </main>
      </div>

      <AnimatePresence>
        {hoveredNode && (
            <div className="fixed pointer-events-none z-[200]" style={{ left: mousePos.x > windowSize.w - 450 ? mousePos.x - 420 : mousePos.x + 40, top: mousePos.y > windowSize.h - 500 ? mousePos.y - 400 : mousePos.y + 20 }}>
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
            <p className="text-[9px] font-black uppercase text-zinc-500 tracking-widest">{label}</p>
            <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-black rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(value / 10) * 100}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-yellow-700 to-yellow-400"
                    />
                </div>
                <span className="text-xs font-black text-white">{value}</span>
            </div>
        </div>
    )
}