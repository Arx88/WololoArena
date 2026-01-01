"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { UNIQUE_UNITS, UniqueUnit } from "@/lib/data/unique-units"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Shield, 
  Swords, 
  Target, 
  Zap, 
  ArrowRight, 
  Info, 
  Move, 
  Activity, 
  Search,
  X,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

export function UnitShowcase() {
  const [selectedUnit, setSelectedUnit] = useState<UniqueUnit | null>(null)
  const [filter, setFilter] = useState<string>("all")
  const [search, setSearch] = useState("")

  const filteredUnits = useMemo(() => {
    return UNIQUE_UNITS.filter(u => {
      const matchesType = filter === "all" || u.type === filter
      const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || 
                           u.civilization.toLowerCase().includes(search.toLowerCase())
      return matchesType && matchesSearch
    })
  }, [filter, search])

  const unitTypes = [
    { id: "all", label: "All Units", icon: Swords },
    { id: "infantry", label: "Infantery", icon: Shield },
    { id: "archer", label: "Archery", icon: Target },
    { id: "cavalry", label: "Cavalry", icon: Move },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#020202] text-white">
      {/* Cinematic Background Header */}
      <div className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden border-b border-yellow-500/20 pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.15)_0%,#020202_100%)] z-10" />
        <Image 
          src="/images/Hero.png" 
          alt="Units Background" 
          fill 
          className="object-cover opacity-40 grayscale-[0.5] brightness-110"
          priority
        />
        <div className="relative z-20 text-center px-4 max-w-4xl mt-10">
          <Badge className="mb-6 bg-yellow-600 text-black font-black uppercase tracking-[0.3em] px-6 py-2">Tactical Encyclopedia</Badge>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,1)] leading-tight mb-6">
            Unique <span className="gold-text-gradient pr-6 -mr-6">Warriors</span>
          </h1>
          <p className="text-yellow-100/60 font-medium uppercase tracking-[0.2em] text-sm md:text-lg max-w-2xl mx-auto">Master the asymmetry. Analyze every civilization's special assets with precision.</p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 relative z-20">
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="flex bg-black/40 p-1 rounded-2xl border border-white/10 backdrop-blur-md overflow-x-auto no-scrollbar max-w-full">
            {unitTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setFilter(type.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                  filter === type.id 
                    ? "bg-yellow-600 text-black shadow-lg" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                <type.icon className="h-4 w-4" />
                {type.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-yellow-500 transition-colors" />
            <input 
              type="text"
              placeholder="Search by unit or civ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 text-sm text-white focus:border-yellow-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredUnits.map((unit) => (
              <motion.div
                key={unit.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card 
                  onClick={() => setSelectedUnit(unit)}
                  className="cursor-pointer border-white/10 bg-[#0a0a0b]/60 backdrop-blur-md overflow-hidden rounded-2xl hover:border-yellow-500/50 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(234,179,8,0.1)]"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image 
                      src={unit.image} 
                      alt={unit.name} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-3 left-4">
                      <p className="text-[10px] font-black uppercase text-yellow-500/80 tracking-widest leading-none mb-1">{unit.civilization}</p>
                      <h3 className="text-xl font-black italic uppercase tracking-tight text-white leading-none">{unit.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-4 flex items-center justify-between border-t border-white/5 bg-black/40">
                    <div className="flex gap-3">
                      <div className="flex flex-col">
                        <span className="text-[8px] text-white/30 uppercase font-bold">Attack</span>
                        <span className="text-xs font-black text-white">{unit.stats.imperial.attack}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] text-white/30 uppercase font-bold">HP</span>
                        <span className="text-xs font-black text-white">{unit.stats.imperial.hp}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-white/20 group-hover:text-yellow-500 group-hover:bg-yellow-500/10 transition-all">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Unit Modal Overlay */}
      <AnimatePresence>
        {selectedUnit && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedUnit(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-[#0a0a0b] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] grid lg:grid-cols-2"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedUnit(null)}
                className="absolute top-6 right-6 z-[110] h-10 w-10 flex items-center justify-center rounded-full bg-black/60 border border-white/10 text-white hover:text-red-500 hover:border-red-500 transition-all"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Image Side */}
              <div className="relative aspect-square lg:aspect-auto h-full min-h-[400px]">
                <Image 
                  src={selectedUnit.image} 
                  alt={selectedUnit.name} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0a0a0b]" />
                
                {/* Visual HUD decor */}
                <div className="absolute bottom-8 left-8 z-20 hidden sm:block">
                   <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full border-2 border-yellow-500 animate-spin-slow border-dashed" />
                      <div className="flex flex-col">
                         <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">Biological Class</span>
                         <span className="text-xl font-black text-white uppercase tracking-tighter italic">{selectedUnit.type} Unit</span>
                      </div>
                   </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="p-8 sm:p-12 flex flex-col justify-center overflow-y-auto max-h-[90vh]">
                <div className="mb-8">
                  <Badge className="bg-yellow-600/10 text-yellow-500 border-yellow-500/30 px-3 py-1 mb-4">{selectedUnit.civilization} Unique Asset</Badge>
                  <h2 className="text-4xl sm:text-6xl font-black italic uppercase tracking-tighter text-white leading-none mb-4">
                    {selectedUnit.name}
                  </h2>
                  <p className="text-lg text-white/60 font-light italic leading-relaxed">
                    "{selectedUnit.description}"
                  </p>
                </div>

                {/* Abilities & Stats */}
                <div className="grid gap-8 mb-10">
                  <div className="space-y-3">
                    <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-yellow-500/60">
                      <Zap className="h-3 w-3" /> Special Mechanic
                    </h4>
                    <p className="text-sm font-bold text-white leading-relaxed p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl italic">
                      {selectedUnit.specialAbility}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { icon: Activity, label: "HP", val: selectedUnit.stats.imperial.hp, color: "text-emerald-400" },
                      { icon: Swords, label: "Attack", val: selectedUnit.stats.imperial.attack, color: "text-red-400" },
                      { icon: Shield, label: "Melee Def", val: selectedUnit.stats.imperial.meleeArmor, color: "text-blue-400" },
                      { icon: Zap, label: "Pierce Def", val: selectedUnit.stats.imperial.pierceArmor, color: "text-yellow-400" },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white/5 border border-white/5 p-3 rounded-2xl flex flex-col items-center">
                        <stat.icon className={cn("h-4 w-4 mb-2 opacity-50", stat.color)} />
                        <span className="text-[8px] font-black text-white/30 uppercase mb-1">{stat.label}</span>
                        <span className="text-lg font-black text-white">{stat.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tactics */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400/60">Strategic Advantage</h4>
                    <div className="space-y-2">
                      {selectedUnit.strengths.map(s => (
                        <div key={s} className="flex items-center gap-2 text-xs font-bold text-white/80">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" /> {s}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400/60">Identified Weaknesses</h4>
                    <div className="space-y-2">
                      {selectedUnit.weaknesses.map(w => (
                        <div key={w} className="flex items-center gap-2 text-xs font-bold text-white/80">
                          <X className="h-3 w-3 text-red-500" /> {w}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
