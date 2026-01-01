"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Shield, Zap, ArrowRight, Target, Crosshair, Swords, Trophy, RefreshCcw, Search, ChevronDown, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useRef, useState, useEffect, useMemo, memo, useCallback } from "react"
import { UNIQUE_UNITS, UniqueUnit } from "@/lib/data/unique-units"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// --- BATTLE LOGIC ---
const calculateDamage = (attacker: UniqueUnit, defender: UniqueUnit, attackerAge: 'castle' | 'imperial', defenderAge: 'castle' | 'imperial') => {
  let damage = 0
  const atkStats = attacker.stats[attackerAge];
  const defStats = defender.stats[defenderAge];

  const isRanged = attacker.type === 'archer' || attacker.type === 'naval' || (atkStats.range !== undefined && atkStats.range > 1);
  const ignoresArmor = attacker.id === 'leitis' || attacker.id === 'composite_bowman';
  const armor = ignoresArmor ? 0 : (isRanged ? defStats.pierceArmor : defStats.meleeArmor);
  
  damage = Math.max(1, atkStats.attack - armor);

  if (attacker.bonuses) {
    attacker.bonuses.forEach(bonus => {
      let bonusValue = bonus.value;

      // Special Case: Cataphracts resist Anti-Cavalry bonus damage
      if (defender.id === 'cataphract' && bonus.target === 'cavalry') {
         bonusValue = Math.max(0, bonusValue - 12);
      }

      // NEW: Check against all armor classes of the defender
      if (defender.armorClasses.includes(bonus.target)) {
         damage += bonusValue;
      }
    });
  }
  return damage;
}

// --- MEMOIZED SUB-COMPONENTS ---

const UnitSelector = memo(({ selected, onSelect, side }: { selected: UniqueUnit, onSelect: (u: UniqueUnit) => void, side: 'left' | 'right' }) => {
   const [search, setSearch] = useState("")
   const [open, setOpen] = useState(false)
   
   const filtered = useMemo(() => UNIQUE_UNITS.filter(u => 
      u.name.toLowerCase().includes(search.toLowerCase()) || 
      u.civilization.toLowerCase().includes(search.toLowerCase())
   ), [search])

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Button variant="outline" className={cn("w-full h-20 justify-between bg-zinc-950/80 border-white/10 text-left relative overflow-hidden group px-6", side === 'left' ? "hover:border-yellow-500/50" : "hover:border-red-500/50")}>
               <div className="flex items-center gap-4 z-10">
                  <div className="relative w-12 h-12 rounded-lg bg-zinc-900 border border-white/10 overflow-hidden shadow-2xl">
                     <Image src={selected.image} alt={selected.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                     <span className="font-black text-white uppercase italic tracking-tighter text-lg leading-none">{selected.name}</span>
                     <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{selected.civilization}</span>
                  </div>
               </div>
               <ChevronDown className="h-5 w-5 opacity-30 group-hover:opacity-100 transition-opacity" />
               <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity", side === 'left' ? "bg-yellow-500" : "bg-red-500")} />
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-[90vw] max-w-[450px] p-0 bg-[#0a0a0b] border-white/10 shadow-[0_20px_50px_rgba(0,0,0,1)]" align={side === 'left' ? 'start' : 'end'}>
            <div className="p-4 border-b border-white/5 bg-white/[0.02]">
               <div className="relative">
                  <Search className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />
                  <Input 
                     placeholder="Search specialized unit..." 
                     className="h-11 pl-10 bg-zinc-900 border-white/10 text-sm focus:ring-yellow-500/50" 
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                  />
               </div>
            </div>
            <div className="max-h-[400px] overflow-y-auto p-3 grid grid-cols-3 gap-3 custom-scrollbar">
               {filtered.map(unit => (
                  <button 
                     key={unit.id} 
                     onClick={() => { onSelect(unit); setOpen(false); }}
                     className={cn(
                        "relative aspect-square rounded-xl border border-white/5 bg-zinc-900 hover:border-yellow-500/50 transition-all overflow-hidden group",
                        selected.id === unit.id && "ring-2 ring-yellow-500 border-transparent"
                     )}
                  >
                     <Image 
                        src={unit.image} 
                        alt={unit.name} 
                        fill 
                        className="object-cover opacity-60 group-hover:opacity-100 transition-opacity" 
                        sizes="120px"
                        loading="lazy"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                     <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                        <p className="text-[9px] font-black text-white uppercase truncate">{unit.name}</p>
                     </div>
                  </button>
               ))}
            </div>
         </PopoverContent>
      </Popover>
   )
})
UnitSelector.displayName = "UnitSelector"

const StatBar = memo(({ label, valA, valB, max, inverse = false }: { label: string, valA: number, valB: number, max: number, inverse?: boolean }) => {
   const isABetter = inverse ? valA < valB : valA > valB
   const isBBetter = inverse ? valB < valA : valB > valA
   
   // For the progress bar filling (always 0-100% of max)
   const pctA = (valA / max) * 100
   const pctB = (valB / max) * 100
   
   return (
      <div className="flex flex-col gap-1">
         <div className="flex justify-between text-[9px] font-bold uppercase text-zinc-500">
            <span className={cn(isABetter && "text-yellow-500")}>{valA}{label === "Atk. Rate" ? "s" : ""}</span>
            <span>{label}</span>
            <span className={cn(isBBetter && "text-red-500")}>{valB}{label === "Atk. Rate" ? "s" : ""}</span>
         </div>
         <div className="flex items-center gap-2 h-1.5">
            <div className="flex-1 h-full bg-zinc-900 rounded-full overflow-hidden flex justify-end">
               <motion.div initial={{ width: 0 }} animate={{ width: `${pctA}%` }} className={cn("h-full", isABetter ? "bg-yellow-500" : "bg-zinc-700")} />
            </div>
            <div className="w-[1px] h-full bg-zinc-800" />
            <div className="flex-1 h-full bg-zinc-900 rounded-full overflow-hidden flex justify-start">
               <motion.div initial={{ width: 0 }} animate={{ width: `${pctB}%` }} className={cn("h-full", isBBetter ? "bg-red-500" : "bg-zinc-700")} />
            </div>
         </div>
      </div>
   )
})
StatBar.displayName = "StatBar"

function BattleSimulator() {
  const [unitA, setUnitA] = useState<UniqueUnit>(UNIQUE_UNITS[0])
  const [unitB, setUnitB] = useState<UniqueUnit>(UNIQUE_UNITS[4])
  const [ageA, setAgeA] = useState<'castle' | 'imperial'>('imperial')
  const [ageB, setAgeB] = useState<'castle' | 'imperial'>('imperial')
  const [hpA, setHpA] = useState(100)
  const [hpB, setHpB] = useState(100)
  const [isFighting, setIsFighting] = useState(false)
  const [winner, setWinner] = useState<UniqueUnit | null>(null)
  
  const fightIdRef = useRef(0)
  const hpARef = useRef(0)
  const hpBRef = useRef(0)
  const [shakeA, setShakeA] = useState(false)
  const [shakeB, setShakeB] = useState(false)
  const [dmgTextA, setDmgTextA] = useState<number | null>(null)
  const [dmgTextB, setDmgTextB] = useState<number | null>(null)

  const resetBattle = useCallback(() => {
    fightIdRef.current += 1
    setIsFighting(false); setWinner(null); setHpA(100); setHpB(100);
    setDmgTextA(null); setDmgTextB(null)
    hpARef.current = unitA.stats[ageA].hp
    hpBRef.current = unitB.stats[ageB].hp
  }, [unitA, unitB, ageA, ageB])

  useEffect(() => { resetBattle() }, [resetBattle])

  const startBattle = async () => {
    if (isFighting) return
    setIsFighting(true)
    const currentFightId = fightIdRef.current
    const statsA = unitA.stats[ageA]
    const statsB = unitB.stats[ageB]
    let chargeReadyA = true; let chargeReadyB = true;

    const runAttackA = () => {
      if (fightIdRef.current !== currentFightId || hpARef.current <= 0 || hpBRef.current <= 0) return
      let dmg = calculateDamage(unitA, unitB, ageA, ageB)
      if (chargeReadyA && statsA.chargeDamage) {
         dmg += statsA.chargeDamage; chargeReadyA = false;
         setTimeout(() => { if (fightIdRef.current === currentFightId) chargeReadyA = true }, (statsA.chargeCooldown || 20) * 1000)
      }
      hpBRef.current -= dmg
      setDmgTextB(dmg); setTimeout(() => setDmgTextB(null), 600)
      setShakeB(true); setTimeout(() => setShakeB(false), 100)
      setHpB(Math.max(0, (hpBRef.current / statsB.hp) * 100))
      if (hpBRef.current <= 0) { setWinner(unitA); setIsFighting(false) }
      else { setTimeout(runAttackA, statsA.reloadTime * 1000) }
    }

    const runAttackB = () => {
      if (fightIdRef.current !== currentFightId || hpARef.current <= 0 || hpBRef.current <= 0) return
      let dmg = calculateDamage(unitB, unitA, ageB, ageA)
      if (chargeReadyB && statsB.chargeDamage) {
         dmg += statsB.chargeDamage; chargeReadyB = false;
         setTimeout(() => { if (fightIdRef.current === currentFightId) chargeReadyB = true }, (statsB.chargeCooldown || 20) * 1000)
      }
      hpARef.current -= dmg
      setDmgTextA(dmg); setTimeout(() => setDmgTextA(null), 600)
      setShakeA(true); setTimeout(() => setShakeA(false), 100)
      setHpA(Math.max(0, (hpARef.current / statsA.hp) * 100))
      if (hpARef.current <= 0) { setWinner(unitB); setIsFighting(false) }
      else { setTimeout(runAttackB, statsB.reloadTime * 1000) }
    }
    setTimeout(() => { if (fightIdRef.current === currentFightId) { runAttackA(); runAttackB() } }, 300)
  }

  return (
    <div className="flex flex-col h-[85vh] w-full bg-black text-white relative rounded-xl overflow-hidden shadow-2xl">
       <div className="h-20 border-b border-white/5 bg-zinc-950/90 flex items-center justify-between px-6 z-50 absolute top-0 left-0 right-0">
          <div className="flex items-center gap-3 text-yellow-500 w-1/3">
             <Swords className="h-6 w-6" />
             <span className="font-black tracking-[0.3em] text-sm uppercase hidden lg:inline">Battle Lab</span>
          </div>
          <div className="flex justify-center w-1/3">
             <Button onClick={startBattle} disabled={isFighting || !!winner} className="h-14 bg-red-600 hover:bg-red-500 text-white font-black text-lg md:text-xl uppercase tracking-[0.2em] px-10 md:px-16 shadow-[0_0_30px_rgba(220,38,38,0.5)] border-b-4 border-red-800 clip-path-slant">
                {isFighting ? "SIMULATING..." : winner ? "ENDED" : "FIGHT"}
             </Button>
          </div>
          <div className="flex items-center justify-end gap-4 w-1/3"> 
             {winner && <Button onClick={resetBattle} variant="outline" size="icon" className="h-10 w-10 border-white/10 hover:bg-white/5 rounded-full mr-2"><RefreshCcw className="h-4 w-4" /></Button>}
             <DialogClose asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-white/10 text-white/50 border border-white/5"><XIcon className="h-6 w-6" /></Button>
             </DialogClose>
          </div>
       </div>

       <div className="flex-1 flex flex-col md:flex-row relative pt-20">
          {/* LEFT */}
          <div className="flex-1 relative group overflow-hidden bg-black border-r border-white/5">
             <motion.div className={cn("absolute inset-0 flex items-center justify-center transition-all duration-300 origin-bottom", shakeA && "rotate-1")} animate={{ scale: winner?.id === unitA.id ? 1.05 : 1, filter: winner?.id === unitB.id ? "grayscale(100%) brightness(0.3)" : "none" }}>
                <div className="relative w-full h-full max-w-[600px] mt-10">
                   <div className="absolute bottom-0 left-0 right-0 h-[90%] bg-gradient-to-t from-black via-black/80 to-transparent z-20" />
                   <Image src={unitA.image} alt={unitA.name} fill className="object-cover object-top md:object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
             </motion.div>
             <div className="absolute top-6 left-6 z-30 flex flex-col gap-2">
                <UnitSelector selected={unitA} onSelect={setUnitA} side="left" />
                <div className="flex bg-zinc-950/80 rounded-lg p-1 border border-white/10 w-fit">
                   {['castle', 'imperial'].map(a => (
                      <button key={a} onClick={() => setAgeA(a as any)} className={cn("px-4 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-md transition-all", ageA === a ? "bg-yellow-600 text-black" : "text-white/40 hover:text-white")}>{a}</button>
                   ))}
                </div>
             </div>
             <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 pt-52 bg-gradient-to-t from-black via-black/90 to-transparent z-20">
                <div className="flex flex-col-reverse md:flex-row md:items-end justify-between mb-4 gap-y-2">
                   <div className="flex-1 min-w-0">
                      <p className="text-yellow-500 text-[10px] md:text-xs font-black tracking-widest uppercase mb-1">{unitA.civilization} • {ageA === 'castle' ? 'BASE' : 'ELITE'}</p>
                      <h2 className="text-2xl sm:text-4xl md:text-6xl font-black italic uppercase leading-none text-white truncate md:whitespace-normal">{unitA.name}</h2>
                   </div>
                   <div className="shrink-0"><span className="text-4xl sm:text-5xl md:text-7xl font-black tabular-nums text-white leading-none">{Math.ceil((hpA/100)*unitA.stats[ageA].hp)}</span></div>
                </div>
                <Progress value={hpA} className="h-2 md:h-3 bg-zinc-900 border border-white/5 rounded-sm" indicatorClassName="bg-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.6)]" />
             </div>
             <AnimatePresence>{dmgTextA && <motion.div initial={{ y: 0, opacity: 1, scale: 0.5 }} animate={{ y: -100, opacity: 0, scale: 1.5 }} exit={{ opacity: 0 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] text-8xl md:text-[10rem] font-black text-red-600 italic drop-shadow-[0_0_10px_rgba(0,0,0,1)] pointer-events-none">-{dmgTextA}</motion.div>}</AnimatePresence>
          </div>

          {/* CENTER */}
          <div className="hidden md:flex w-[1px] bg-white/5 relative z-40 flex-col items-center justify-center pointer-events-none">
             <div className="absolute top-1/2 -translate-y-1/2 w-72 bg-zinc-950/95 border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col gap-5 pointer-events-auto backdrop-blur-md">
                <div className="text-center border-b border-white/5 pb-4 mb-2"><span className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.4em]">STATS</span></div>
                <StatBar label="Attack" valA={unitA.stats[ageA].attack} valB={unitB.stats[ageB].attack} max={25} />
                <StatBar label="Atk. Rate" valA={unitA.stats[ageA].reloadTime} valB={unitB.stats[ageB].reloadTime} max={5} inverse />
                <StatBar label="Melee Arm." valA={unitA.stats[ageA].meleeArmor} valB={unitB.stats[ageB].meleeArmor} max={15} />
                <StatBar label="Pierce Arm." valA={unitA.stats[ageA].pierceArmor} valB={unitB.stats[ageB].pierceArmor} max={15} />
                {winner && (
                   <motion.div 
                     initial={{ scale: 0.9, opacity: 0 }} 
                     animate={{ scale: 1, opacity: 1 }} 
                     className="mt-4 pt-6 border-t border-white/10 flex flex-col items-center text-center w-full"
                   >
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-bold w-full text-center">Winner</p>
                      <p className={cn(
                        "text-3xl font-black uppercase italic w-full text-center px-2 break-words leading-tight", 
                        winner.id === unitA.id ? "text-yellow-500" : "text-red-500"
                      )}>
                        {winner.name}
                      </p>
                   </motion.div>
                )}
             </div>
          </div>

          {/* RIGHT */}
          <div className="flex-1 relative group overflow-hidden bg-black">
             <motion.div className={cn("absolute inset-0 flex items-center justify-center transition-all duration-300 origin-bottom", shakeB && "rotate-[-1deg]")} animate={{ scale: winner?.id === unitB.id ? 1.05 : 1, filter: winner?.id === unitA.id ? "grayscale(100%) brightness(0.3)" : "none" }}>
                <div className="relative w-full h-full max-w-[600px] mt-10">
                   <div className="absolute bottom-0 left-0 right-0 h-[90%] bg-gradient-to-t from-black via-black/80 to-transparent z-20" />
                   <Image src={unitB.image} alt={unitB.name} fill className="object-cover object-top md:object-contain" style={{ transform: 'scaleX(-1)' }} sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
             </motion.div>
             <div className="absolute top-6 right-6 z-30 flex flex-col items-end gap-2">
                <UnitSelector selected={unitB} onSelect={setUnitB} side="right" />
                <div className="flex bg-zinc-950/80 rounded-lg p-1 border border-white/10 w-fit">
                   {['castle', 'imperial'].map(a => (
                      <button key={a} onClick={() => setAgeB(a as any)} className={cn("px-4 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-md transition-all", ageB === a ? "bg-red-600 text-white" : "text-white/40 hover:text-white")}>{a}</button>
                   ))}
                </div>
             </div>
             <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 pt-52 bg-gradient-to-t from-black via-black/90 to-transparent z-20">
                <div className="flex flex-col-reverse md:flex-row md:items-end justify-between mb-4 gap-y-2">
                   <div className="shrink-0 md:order-2"><span className="text-4xl sm:text-5xl md:text-7xl font-black tabular-nums text-white leading-none">{Math.ceil((hpB/100)*unitB.stats[ageB].hp)}</span></div>
                   <div className="text-right flex-1 md:order-1 min-w-0">
                      <p className="text-red-500 text-[10px] md:text-xs font-black tracking-widest uppercase mb-1">{unitB.civilization} • {ageB === 'castle' ? 'BASE' : 'ELITE'}</p>
                      <h2 className="text-2xl sm:text-4xl md:text-6xl font-black italic uppercase leading-none text-white truncate md:whitespace-normal">{unitB.name}</h2>
                   </div>
                </div>
                <Progress value={hpB} className="h-2 md:h-3 bg-zinc-900 border border-white/5 rounded-sm" indicatorClassName="bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]" />
             </div>
             <AnimatePresence>{dmgTextB && <motion.div initial={{ y: 0, opacity: 1, scale: 0.5 }} animate={{ y: -100, opacity: 0, scale: 1.5 }} exit={{ opacity: 0 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] text-8xl md:text-[10rem] font-black text-red-600 italic drop-shadow-[0_0_10px_rgba(0,0,0,1)] pointer-events-none">-{dmgTextB}</motion.div>}</AnimatePresence>
          </div>
       </div>
    </div>
  )
}

// Parallax isolated component to prevent parent re-renders on scroll
const ParallaxBackground = memo(({ yParallax }: { yParallax: any }) => (
  <motion.div style={{ y: yParallax }} className="absolute inset-0 border border-white/5 rounded-full border-dashed opacity-20 pointer-events-none" />
))
ParallaxBackground.displayName = "ParallaxBackground"

function PromoContent({ displayUnits }: { displayUnits: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] })
  const yParallax = useTransform(scrollYProgress, [0, 1], [-50, 50])

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-[#020202] border-y border-white/5">
      <div className="absolute inset-0 z-0">
        <Image src="/images/Hero3.png" alt="BG" fill className="object-cover opacity-5 grayscale scale-110" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/90 to-transparent" />
      </div>
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-20 items-center">
          <div className="flex flex-col items-start order-2 lg:order-1">
            <Badge variant="outline" className="mb-8 gap-2 border-yellow-500/40 bg-yellow-500/10 text-yellow-500 px-5 py-1.5 uppercase tracking-[0.4em] text-[10px] font-black"><Target className="h-3.5 w-3.5" /> Intelligence Database</Badge>
            <h2 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-[0.8] mb-10"><span className="block opacity-50">UNVEIL THE</span><span className="block gold-text-gradient pr-12 -mr-12">UNIQUE META</span></h2>
            <p className="text-2xl text-white/40 font-light italic leading-relaxed mb-12 max-w-xl">Knowledge is power. Analyze hidden mechanics, passive stats, and the math behind every unique soldier.</p>
            <div className="flex flex-col gap-4 mb-12 w-full max-w-md">
               <div className="flex items-center gap-6 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-yellow-500/30 transition-all group cursor-default">
                  <div className="h-12 w-12 rounded-xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20"><Zap className="h-6 w-6 text-yellow-500" /></div>
                  <div><span className="block text-sm font-black text-white uppercase italic tracking-wider">Dynamic Stats</span><span className="text-[11px] text-white/30 uppercase font-bold">Real Winrates & Hidden Classes</span></div>
               </div>
               <Dialog>
                 <DialogTrigger asChild>
                   <div className="flex items-center gap-6 p-5 rounded-2xl bg-red-900/10 border border-red-500/20 hover:border-red-500 hover:bg-red-900/20 transition-all group cursor-pointer shadow-[0_0_30px_-10px_rgba(220,38,38,0.2)]">
                      <div className="h-12 w-12 rounded-xl bg-red-500/20 flex items-center justify-center border border-red-500/30 group-hover:scale-110 transition-transform"><Swords className="h-6 w-6 text-red-500" /></div>
                      <div><span className="block text-sm font-black text-white uppercase italic tracking-wider group-hover:text-red-400 transition-colors">Battle Simulator </span><span className="text-[11px] text-red-400/60 uppercase font-bold">Test 1v1 Scenarios</span></div>
                      <ArrowRight className="ml-auto h-5 w-5 text-red-500 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                   </div>
                 </DialogTrigger>
                 <DialogContent className="max-w-[98vw] lg:max-w-7xl h-[85vh] bg-black border-white/10 text-white p-0 overflow-hidden shadow-2xl border-0 sm:rounded-3xl">
                    <DialogTitle className="sr-only">Unit Battle Simulator</DialogTitle>
                    <BattleSimulator />
                 </DialogContent>
               </Dialog>
            </div>
            <Link href="/civilizations/units"><Button size="lg" className="h-20 px-12 rounded-none bg-yellow-600 hover:bg-yellow-500 text-black font-black text-base tracking-[0.2em] uppercase transition-all shadow-[0_0_50px_-10px_rgba(234,179,8,0.5)] border-r-8 border-black/20 hover:scale-105 group">Explore Encyclopedia<ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform" /></Button></Link>
          </div>
          <div className="relative h-[750px] w-full flex items-center justify-center order-1 lg:order-2" style={{ perspective: '2000px' }}>
             <div className="relative w-full h-full flex items-center justify-center">
                {displayUnits.map((unit, idx) => (
                  <motion.div 
                    key={unit.id} 
                    onClick={() => setActiveIndex(idx)} 
                    animate={{ 
                      x: idx === activeIndex ? 0 : (idx === activeIndex - 1 || (activeIndex === 0 && idx === 2)) ? -160 : 160, 
                      y: idx === activeIndex ? 0 : 60, 
                      z: idx === activeIndex ? 100 : -150, 
                      rotateY: idx === activeIndex ? 0 : (idx === activeIndex - 1 || (activeIndex === 0 && idx === 2)) ? 30 : -30, 
                      scale: idx === activeIndex ? 1.1 : 0.85, 
                      opacity: idx === activeIndex ? 1 : 0.3 
                    }} 
                    transition={{ type: "spring", stiffness: 200, damping: 25 }} 
                    className={cn(
                      "absolute w-80 sm:w-[400px] h-[550px] rounded-[3rem] border-2 bg-[#0a0a0b] shadow-2xl overflow-hidden cursor-pointer", 
                      idx === activeIndex ? "z-30 border-yellow-500/60 shadow-[0_0_100px_rgba(234,179,8,0.2)]" : "z-10 border-white/10 grayscale"
                    )}
                  >
                    <Image src={unit.image} alt={unit.name} fill className="object-cover" sizes="400px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                    {idx === activeIndex && (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-12 left-10 right-10">
                        <p className="text-xs font-black text-yellow-500 uppercase tracking-widest mb-2">{unit.civilization}</p>
                        <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none mb-6">{unit.name}</h3>
                        <div className="flex gap-2"><div className="px-3 py-1 bg-yellow-600 text-black text-[10px] font-black uppercase italic">Mastery Intel</div></div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
             </div>
             <ParallaxBackground yParallax={yParallax} />
          </div>
        </div>
      </div>
    </section>
  )
}

export function UniqueUnitsPromo() {
  const displayUnits = useMemo(() => UNIQUE_UNITS.slice(0, 3), [])
  return <PromoContent displayUnits={displayUnits} />
}
