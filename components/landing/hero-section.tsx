"use client"

import { useState, useEffect, useMemo, useRef, memo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Swords, Trophy, Sparkles, ChevronRight, X, Shield, ScrollText, Target, Flame, Star, Zap, Crown, Activity } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { CIVILIZATIONS } from "@/lib/data/civilizations"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const BATTLE_SEQUENCES = [
  { 
    pick: "britons", 
    bans: ["goths", "malians", "vietnamese"], 
    map: "ARENA", 
    advice: "Eliminating high-pierce armor threats like Huskarls and Rattans ensures your Longbowmen can fire with impunity from behind walls." 
  },
  { 
    pick: "franks", 
    bans: ["saracens", "hindustanis", "gurjaras"], 
    map: "ARABIA", 
    advice: "Banning the top-tier 'Camel Civilizations' is mandatory to allow Frankish Paladins to dominate the open battlefield." 
  },
  { 
    pick: "portuguese", 
    bans: ["italians", "vikings", "koreans"], 
    map: "ARCHIPELAGO", 
    advice: "Removing early water aggression civs secures the path for late-game Feitoria dominance and Caravel massing." 
  },
  { 
    pick: "mongols", 
    bans: ["berbers", "chinese", "mayans"], 
    map: "VALLEY", 
    advice: "Banning civs that can match your early eco speed or out-produce skirmishers protects the devastating Mangudai power spike." 
  },
  { 
    pick: "hindustanis", 
    bans: ["britons", "mayans", "ethiopians"], 
    map: "ARABIA", 
    advice: "By banning the strongest Archer civilizations, you force the opponent into a melee trade where your superior Camels and Ghulams prevail." 
  },
  { 
    pick: "goths", 
    bans: ["byzantines", "japanese", "aztecs"], 
    map: "ARENA", 
    advice: "Removing the 'Infantry Killers' (Cataphracts, Samurai, Jaguars) makes the Goth spam literally unstoppable in the late game." 
  },
  { 
    pick: "bohemians", 
    bans: ["huns", "mongols", "magyars"], 
    map: "ARENA", 
    advice: "Banning high-mobility raiding civs prevents the enemy from sniping your Houfnice and Hussite Wagon formations." 
  },
  { 
    pick: "lithuanians", 
    bans: ["teutons", "bohemians", "poles"], 
    map: "NOMAD", 
    advice: "Eliminating civilizations with heavy melee defenses or gunpowder allows Relic-boosted Leitis to ignore enemy armor entirely." 
  },
  { 
    pick: "poles", 
    bans: ["slavs", "teutons", "bulgarians"], 
    map: "GOLDRUSH", 
    advice: "Banning high-armor infantry competitors ensures your Obuch can strip defenses and secure the central gold mines effectively." 
  },
  { 
    pick: "berbers", 
    bans: ["britons", "mayans", "mongols"], 
    map: "ARABIA", 
    advice: "Banning the best foot-archer and CA civilizations secures your Camel Archers as the most dominant mobile unit on the field." 
  },
]

function MatrixBackground() {
  const allIcons = useMemo(() => CIVILIZATIONS.map(c => c.icon).filter(Boolean), [])
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-black antialiased">
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] z-10" />
      <div className="absolute inset-0 flex justify-between opacity-10 md:opacity-15 mask-gradient-vertical transform -skew-x-6 scale-110">
        {[...Array(8)].map((_, i) => {
          const rotatedIcons = [...allIcons.slice(i * 5), ...allIcons.slice(0, i * 5)].slice(0, 15)
          return (
            <div key={i} className="flex flex-col animate-infinite-scroll" style={{ animationDuration: `${30 + i * 5}s`, animationDelay: `-${i * 3}s` }}>
              <div className="flex flex-col gap-20 py-10">
                {rotatedIcons.map((icon, j) => (
                  <div key={`a-${j}`} className="relative w-12 h-12 grayscale brightness-50 opacity-40">
                    <Image src={icon || ""} alt="" width={48} height={48} className="object-contain" quality={100} />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-20 py-10">
                {rotatedIcons.map((icon, j) => (
                  <div key={`b-${j}`} className="relative w-12 h-12 grayscale brightness-50 opacity-40">
                    <Image src={icon || ""} alt="" width={48} height={48} className="object-contain" quality={100} />
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function HeroSection() {
  const { t } = useLanguage()
  return (
    <section className="relative min-h-[95vh] flex items-center bg-[#050505] overflow-hidden pt-32 pb-10 select-none">
      <MatrixBackground />
      <div className="container relative z-30 mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 flex flex-col items-start text-left pt-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 text-[10px] font-black tracking-[0.2em] uppercase mb-6">
            <Sparkles className="w-3 h-3" /><span>Next Gen Drafting</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl lg:text-[82px] font-black text-white tracking-tighter leading-[0.9] mb-6 font-cinzel">
            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500">{t("heroTitle1")}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 drop-shadow-sm pb-2">{t("heroTitle2")}</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-8 max-w-lg border-l-2 border-yellow-500/20 pl-5 font-light italic">{t("heroSubtitle")}</p>
          <div className="flex flex-wrap gap-6 w-full">
            <Link href="/lobby" className="flex-1 sm:flex-none">
              <Button className="w-full h-16 px-8 rounded-none bg-yellow-600 hover:bg-yellow-500 text-black font-black uppercase tracking-[0.2em] text-sm transition-all shadow-[0_0_30px_rgba(234,179,8,0.2)] border-r-4 border-black/20 hover:scale-105 active:scale-95 group">
                <Swords className="mr-3 h-5 w-5 transition-transform group-hover:rotate-12" />{t("startDrafting")}
              </Button>
            </Link>
            <Link href="/tournaments" className="flex-1 sm:flex-none">
              <Button variant="outline" className="w-full h-16 px-8 rounded-none border-2 border-white/10 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-[0.2em] text-sm backdrop-blur-sm transition-all hover:border-yellow-500/30 border-r-4 border-white/10 hover:scale-105 active:scale-95 group">
                <Trophy className="mr-3 h-5 w-5 transition-transform group-hover:scale-110 group-hover:text-yellow-500" />{t("tournaments")}
              </Button>
            </Link>
          </div>
        </div>
        <div className="lg:col-span-6 relative h-[700px] flex items-center justify-center perspective-2000">
           <BattleDraftSimulator />
        </div>
      </div>
      <style jsx global>{`
        @keyframes infinite-scroll { from { transform: translateY(0); } to { transform: translateY(-50%); } }
        .animate-infinite-scroll { animation-name: infinite-scroll; animation-timing-function: linear; animation-iteration-count: infinite; }
        .mask-gradient-vertical { mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent); }
        .gold-text-gradient { background: linear-gradient(to right, #facc15, #eab308, #ca8a04); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .font-cinzel { font-family: var(--font-cinzel), serif; }
      `}</style>
    </section>
  )
}

function BattleDraftSimulator() {
  const [mounted, setMounted] = useState(false)
  const [roundIdx, setRoundIdx] = useState(0)
  const [states, setStates] = useState<Record<number, 'hidden' | 'reveal' | 'ban' | 'pick'>>({})
  const [shake, setShake] = useState(false)
  
  useEffect(() => { setMounted(true) }, [])

  const current = BATTLE_SEQUENCES[roundIdx]
  const grid = useMemo(() => {
    const pickCiv = CIVILIZATIONS.find(c => c.id === current.pick)!
    const banCivs = current.bans.map(bid => CIVILIZATIONS.find(c => c.id === bid)!).filter(Boolean)
    const fillers = CIVILIZATIONS.slice(15, 35).filter(c => c.id !== pickCiv.id && !current.bans.includes(c.id)).slice(0, 8)
    const pool = [ { id: 'pick', civ: pickCiv, type: 'pick' }, ...banCivs.map((c, i) => ({ id: `ban-${i}`, civ: c, type: 'ban' })), ...fillers.map((c, i) => ({ id: `f-${i}`, civ: c, type: 'filler' })) ]
    return pool.sort((a, b) => (a.civ.name.length * 7) % 11 - (b.civ.name.length * 7) % 11)
  }, [roundIdx])

  useEffect(() => {
    if (!mounted) return
    let active = true
    const runSequence = async () => {
      setStates({}); await new Promise(r => setTimeout(r, 1500))
      for(let i=0; i<3; i++) { setStates(prev => ({ ...prev, [Math.floor(Math.random() * 12)]: 'reveal' })); await new Promise(r => setTimeout(r, 200)) }
      const banPositions = grid.map((item, idx) => item.type === 'ban' ? idx : -1).filter(i => i !== -1)
      for (const pos of banPositions) {
        if (!active) return
        setStates(prev => ({ ...prev, [pos]: 'reveal' })); await new Promise(r => setTimeout(r, 700))
        setShake(true); setTimeout(() => setShake(false), 250)
        setStates(prev => ({ ...prev, [pos]: 'ban' })); await new Promise(r => setTimeout(r, 900))
      }
      const pickPos = grid.findIndex(c => c.type === 'pick')
      setStates(prev => ({ ...prev, [pickPos]: 'reveal' })); await new Promise(r => setTimeout(r, 1200))
      setStates(prev => ({ ...prev, [pickPos]: 'pick' }))
      await new Promise(r => setTimeout(r, 7000))
      if(active) setRoundIdx(prev => (prev + 1) % BATTLE_SEQUENCES.length)
    }
    runSequence(); return () => { active = false }
  }, [grid, mounted])

  return (
    <motion.div animate={shake ? { x: [-12, 12, -12, 6, -6, 0], y: [2, -2, 2, 0] } : {}} className="relative w-full h-full flex flex-col items-center justify-center p-4">
       <div className="absolute inset-0 pointer-events-none">
          {mounted && [...Array(20)].map((_, i) => (
             <motion.div key={i} animate={{ y: [0, -600], opacity: [0, 1, 0] }} transition={{ duration: 8, repeat: Infinity, delay: i * 0.5 }} className="absolute bottom-0 w-1 h-1 bg-yellow-500/20 rounded-full blur-[1px]" style={{ left: `${(i * 5) % 100}%` }} />
          ))}
       </div>

       <div className="relative z-10 grid grid-cols-4 gap-6 md:gap-10 mb-20">
          {grid.map((item, i) => (
             <div key={`${roundIdx}-${i}`} className="relative w-20 h-28 md:w-32 md:h-44" style={{ perspective: "1500px" }}>
                <motion.div animate={{ rotateY: states[i] ? 180 : 0, z: states[i] === 'pick' ? 300 : states[i] === 'ban' ? -80 : 0, scale: states[i] === 'pick' ? 1.3 : 1, opacity: Object.values(states).includes('pick') && states[i] !== 'pick' ? 0.2 : 1 }} transition={{ type: "spring", stiffness: 90, damping: 12 }} style={{ transformStyle: "preserve-3d" }} className="w-full h-full relative" >
                   <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-zinc-800 to-black border-2 border-white/10 flex items-center justify-center shadow-2xl overflow-hidden" style={{ backfaceVisibility: "hidden" }}>
                      <Shield className="w-10 h-10 text-white/5" />
                   </div>
                   <div className={cn("absolute inset-0 rounded-2xl border-2 flex flex-col items-center justify-center p-4 transition-all duration-1000", states[i] === 'ban' ? "bg-red-950/20 border-red-500/40 grayscale" : "bg-zinc-950 border-white/10", states[i] === 'pick' ? "bg-black border-yellow-500 shadow-[0_0_100px_rgba(234,179,8,0.3)]" : "" )} style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                      <div className="relative w-14 h-14 md:w-24 md:h-24"><Image src={item.civ.icon || ""} alt="" fill className="object-contain" quality={100} /></div>
                      <span className={cn("mt-4 text-[10px] md:text-[13px] font-black uppercase tracking-widest italic font-cinzel", states[i] === 'pick' ? "text-yellow-500" : "text-zinc-600")}>{item.civ.name}</span>
                      <AnimatePresence>{states[i] === 'ban' && ( <motion.div initial={{ scale: 5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute inset-0 flex items-center justify-center z-20"><X className="w-24 h-24 md:w-32 md:h-32 text-red-600" strokeWidth={6} /></motion.div> )}</AnimatePresence>
                   </div>
                </motion.div>
             </div>
          ))}
       </div>

       <div className="absolute bottom-4 left-0 right-0 z-[100] flex justify-center pointer-events-none px-10">
          <AnimatePresence mode="wait">
             {Object.values(states).includes('pick') && (
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="relative w-full max-w-2xl bg-black/90 backdrop-blur-2xl p-8 rounded-3xl border border-primary/30 shadow-[0_0_80px_rgba(0,0,0,1)]">
                   <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                      <div className="flex-1 text-center md:text-left">
                         <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Strategy Advice</span>
                         </div>
                         <p className="text-xl md:text-2xl font-bold text-white uppercase italic leading-tight font-cinzel tracking-tight">"{current.advice}"</p>
                      </div>
                      <div className="shrink-0 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-10 text-center md:text-right">
                         <span className="block text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Map</span>
                         <span className="text-2xl font-black text-primary uppercase italic font-cinzel leading-none">{current.map}</span>
                      </div>
                   </div>
                </motion.div>
             )}
          </AnimatePresence>
       </div>
    </motion.div>
  )
}
