"use client"

import { useState, useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"
import { GraduationCap, Trophy, BookOpen, ChevronRight, Lock, Star, Shield, Swords, Crown, Target, Zap, Activity, ScrollText, Sparkles, ArrowRight } from "lucide-react"
import { UNIVERSITY_LEVELS, UniversityLevel } from "@/lib/data/university-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

const ICON_MAP = {
  Shield: Shield,
  Swords: Swords,
  Trophy: Trophy,
  Crown: Crown
}

export default function UniversityPage() {
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null)
  
  // Parallax Header Effect
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col relative overflow-x-hidden">
      {/* --- CINEMATIC BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.05)_0%,#020202_100%)]" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] opacity-20" />
        
        {/* Floating "Knowledge" Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           {[...Array(15)].map((_, i) => (
             <motion.div
               key={i}
               initial={{ y: "110%", x: `${Math.random() * 100}%`, opacity: 0 }}
               animate={{ 
                 y: "-10%", 
                 opacity: [0, 0.3, 0],
                 rotate: 360 
               }}
               transition={{ 
                 duration: 15 + Math.random() * 20, 
                 repeat: Infinity, 
                 delay: Math.random() * 10,
                 ease: "linear"
               }}
               className="absolute text-primary/20"
             >
               {i % 2 === 0 ? <ScrollText size={12 + Math.random() * 20} /> : <Zap size={10 + Math.random() * 15} />}
             </motion.div>
           ))}
        </div>
      </div>

      <Navbar />

      <main className="relative z-10 flex-1 pt-32 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* --- HERO HEADER: 3D REVEAL --- */}
          <motion.div 
            style={{ y: y1, opacity }}
            className="flex flex-col items-center text-center mb-32"
          >
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 15, delay: 0.2 }}
              className="mb-8 p-4 rounded-3xl bg-primary/10 border border-primary/20 shadow-[0_0_50px_rgba(var(--primary),0.2)]"
            >
              <GraduationCap className="h-12 w-12 text-primary animate-pulse" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <span className="text-[10px] font-mono font-black text-primary tracking-[0.8em] uppercase block mb-4">
                Elite Training Protocol // Established
              </span>
              <h1 className="text-7xl md:text-[120px] font-black italic uppercase tracking-tighter text-white leading-[0.8] font-cinzel">
                WOLOLO <br />
                <span className="gold-text-gradient pr-6 -mr-6 drop-shadow-[0_0_30px_rgba(234,179,8,0.3)]">UNIVERSITY</span>
              </h1>
              <p className="text-zinc-500 text-lg md:text-2xl max-w-3xl mx-auto font-light italic leading-relaxed mt-8">
                Transcend basic tactics. Enter the most advanced combat academy in the Age of Empires history and claim your legacy.
              </p>
            </motion.div>
          </motion.div>

          {/* --- LEVEL SELECTION: 3D GRID --- */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {UNIVERSITY_LEVELS.map((level, idx) => (
              <LevelCard 
                key={level.id} 
                level={level} 
                index={idx}
              />
            ))}
          </div>

          {/* --- PRESTIGE BANNER: CINEMATIC --- */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 relative"
          >
            {/* Ambient Light */}
            <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full" />
            
            <div className="relative p-1 rounded-[3rem] bg-gradient-to-br from-white/10 via-primary/20 to-transparent">
              <div className="relative p-12 md:p-20 rounded-[2.9rem] bg-[#050506]/90 backdrop-blur-3xl overflow-hidden border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-16">
                
                {/* Visual Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

                <div className="flex-1 space-y-8 relative z-10 text-center lg:text-left">
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Prestige Achievement Available</span>
                  </div>
                  
                  <h3 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter font-cinzel leading-none">
                    THE <span className="text-primary">CONQUISTADOR</span> <br /> GAUNTLET
                  </h3>
                  
                  <p className="text-zinc-400 max-w-xl text-lg md:text-xl font-light italic leading-relaxed">
                    Test your resolve in the ultimate 100-question imperial trial. Only 0.1% of commanders hold this certification.
                  </p>

                  <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4">
                    <Button className="h-20 px-12 rounded-none bg-white text-black font-black uppercase tracking-[0.2em] text-sm hover:bg-primary transition-all border-r-8 border-black/20 hover:scale-105 active:scale-95 shadow-2xl">
                      Initialize Trial <ArrowRight className="ml-4 h-6 w-6" />
                    </Button>
                  </div>
                </div>

                {/* Trophy 3D Composition */}
                <div className="relative h-80 w-80 shrink-0 lg:mr-10">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-primary/10 border-dashed"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 -m-8 rounded-full border-2 border-white/5"
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      animate={{ y: [0, -20, 0], filter: ["drop-shadow(0 0 20px rgba(var(--primary),0.3))", "drop-shadow(0 0 60px rgba(var(--primary),0.6))", "drop-shadow(0 0 20px rgba(var(--primary),0.3))"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="relative z-20"
                    >
                      <Trophy className="h-40 w-40 text-primary" />
                    </motion.div>
                    
                    {/* Glowing Aura */}
                    <div className="absolute inset-0 bg-primary blur-[100px] opacity-20 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        .gold-text-gradient {
          background: linear-gradient(to right, #facc15, #eab308, #ca8a04);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .font-cinzel { font-family: var(--font-cinzel), serif; }
      `}</style>
    </div>
  )
}

function LevelCard({ level, index }: { level: UniversityLevel, index: number }) {
  const Icon = ICON_MAP[level.icon as keyof typeof ICON_MAP] || BookOpen
  
  // 3D Tilt State
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 20 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: 0.6 + index * 0.1, type: "spring", stiffness: 100 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
      className="h-full"
    >
      <Link href={`/university/${level.id}`} className="block h-full group">
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="h-full p-10 rounded-[2.5rem] bg-[#0a0a0b]/90 border border-white/5 transition-all duration-500 flex flex-col relative overflow-hidden group-hover:border-primary/40 group-hover:bg-[#0d0d0e]"
        >
          {/* Shine Sweep Effect */}
          <div className="absolute inset-0 z-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none" />

          {/* Icon Header */}
          <div className="flex justify-between items-start mb-12" style={{ transform: "translateZ(40px)" }}>
            <div className="relative">
               <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="relative p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all duration-500">
                 <Icon className="h-8 w-8" />
               </div>
            </div>
            
            <div className="flex flex-col items-end gap-1">
               <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Prestige Rank</span>
               <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={cn(
                      "w-1 h-4 transform skew-x-[-15deg] transition-colors",
                      i <= index ? "bg-primary" : "bg-white/5"
                    )} />
                  ))}
               </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4 mb-12" style={{ transform: "translateZ(30px)" }}>
            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white group-hover:text-primary transition-colors leading-none font-cinzel">
              {level.title}
            </h3>
            <p className="text-zinc-500 font-medium italic leading-relaxed text-base group-hover:text-zinc-400 transition-colors">
              {level.description}
            </p>
          </div>

          {/* Footer Metrics */}
          <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between" style={{ transform: "translateZ(20px)" }}>
             <div className="flex flex-col">
                <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Assessment Count</span>
                <span className="text-lg font-black text-white italic tracking-tighter">{level.totalQuestions} Protocols</span>
             </div>
             <div className="h-10 w-10 rounded-full border border-white/5 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all">
                <ChevronRight className="h-5 w-5 text-white/20 group-hover:text-primary" />
             </div>
          </div>

          {/* Depth Layers Decor */}
          <div className="absolute top-4 left-4 p-2 border-l border-t border-white/5 opacity-40" />
          <div className="absolute bottom-4 right-4 p-2 border-r border-b border-white/5 opacity-40" />
        </motion.div>
      </Link>
    </motion.div>
  )
}