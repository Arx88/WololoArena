"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"
import { GraduationCap, Trophy, BookOpen, ChevronRight, Lock, Star, Shield, Swords, Crown, Target, Zap, Activity } from "lucide-react"
import { UNIVERSITY_LEVELS, UniversityLevel } from "@/lib/data/university-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col relative overflow-x-hidden">
      {/* Cinematic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.03)_0%,#020202_100%)]" />
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
        
        {/* Animated Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
      </div>

      <Navbar />

      <main className="relative z-10 flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20 border-l-4 border-primary pl-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span className="text-[10px] font-mono font-bold text-primary tracking-[0.5em] uppercase">Tactical Academy // Global</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-none">
                AOE2 <span className="gold-text-gradient pr-4 -mr-4">University</span>
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl max-w-2xl font-light italic leading-relaxed">
                Unlock ancient knowledge and master the competitive meta through our advanced combat simulation protocols.
              </p>
            </div>

            <div className="flex gap-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl">
               <div className="text-center">
                  <span className="block text-[10px] font-mono text-white/30 uppercase mb-1">Global Precedence</span>
                  <span className="text-3xl font-black text-white italic tracking-tighter">TOP 1%</span>
               </div>
               <div className="w-px bg-white/10 h-12" />
               <div className="text-center">
                  <span className="block text-[10px] font-mono text-white/30 uppercase mb-1">Certs Earned</span>
                  <span className="text-3xl font-black text-primary italic tracking-tighter">12/40</span>
               </div>
            </div>
          </div>

          {/* Level Selection Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {UNIVERSITY_LEVELS.map((level, idx) => (
              <LevelCard 
                key={level.id} 
                level={level} 
                index={idx}
                isHovered={hoveredLevel === level.id}
                onHover={() => setHoveredLevel(level.id)}
                onLeave={() => setHoveredLevel(null)}
              />
            ))}
          </div>

          {/* Bottom Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-20 relative p-1 rounded-[2.5rem] bg-gradient-to-r from-primary/20 via-primary/5 to-transparent overflow-hidden"
          >
            <div className="relative p-12 rounded-[2.4rem] bg-[#0a0a0b]/90 backdrop-blur-3xl flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden">
               <div className="absolute top-0 right-0 p-12 text-[120px] font-black text-white/[0.02] italic select-none pointer-events-none uppercase">Prestige</div>
               
               <div className="flex-1 space-y-6 relative z-10">
                  <Badge className="bg-primary text-black font-black uppercase text-[10px] tracking-widest px-4 py-1">New Milestone Available</Badge>
                  <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">The Conquistador Gauntlet</h3>
                  <p className="text-zinc-400 max-w-xl text-lg">Are you ready to test your knowledge against the legendary 100-question marathon? Only true masters survive the Imperial phase.</p>
                  <Button className="h-14 px-10 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-primary transition-all">
                    Initialize Assessment
                  </Button>
               </div>

               <div className="relative h-64 w-64 md:h-80 md:w-80 shrink-0">
                  <div className="absolute inset-0 bg-primary blur-[100px] opacity-10 animate-pulse" />
                  <div className="relative h-full w-full rounded-full border-2 border-primary/20 p-4 animate-spin-slow">
                     <div className="h-full w-full rounded-full border-4 border-dashed border-primary/40" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <Trophy className="h-24 w-24 text-primary drop-shadow-[0_0_30px_rgba(var(--primary),0.5)]" />
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
          filter: drop-shadow(0 0 10px rgba(234, 179, 8, 0.3));
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

function LevelCard({ level, index, isHovered, onHover, onLeave }: { 
  level: UniversityLevel, 
  index: number, 
  isHovered: boolean,
  onHover: () => void,
  onLeave: () => void
}) {
  const Icon = ICON_MAP[level.icon as keyof typeof ICON_MAP] || BookOpen

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative group h-full"
    >
      <Link href={`/university/${level.id}`} className="block h-full">
        <div className={cn(
          "h-full p-8 rounded-[2rem] bg-[#0a0a0b] border transition-all duration-500 flex flex-col relative overflow-hidden",
          isHovered ? "border-primary shadow-[0_0_40px_-10px_rgba(var(--primary),0.3)] -translate-y-2" : "border-white/5 shadow-2xl"
        )}>
          {/* Status Indicators */}
          <div className="flex justify-between items-center mb-10">
            <div className={cn(
              "p-3 rounded-2xl transition-all duration-500",
              isHovered ? "bg-primary text-black" : "bg-white/5 text-white/40"
            )}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Prestige</span>
              <div className="flex gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={cn(
                    "w-1 h-3 transform skew-x-[-12deg]",
                    i < (index + 1) ? "bg-primary" : "bg-white/10"
                  )} />
                ))}
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4 group-hover:text-primary transition-colors">
            {level.title}
          </h3>
          
          <p className="text-sm text-zinc-500 font-medium italic mb-10 leading-relaxed">
            {level.description}
          </p>

          <div className="mt-auto space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-white/40">
                <span>Core Progress</span>
                <span className="text-primary">0%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden p-[1px]">
                <div className="h-full bg-white/10 rounded-full w-[0%]" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/5">
               <div className="flex flex-col">
                  <span className="text-[8px] font-mono text-white/20 uppercase">Questions</span>
                  <span className="text-sm font-black text-white uppercase">{level.totalQuestions}</span>
               </div>
               <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                  <ChevronRight className="h-4 w-4 text-white/20 group-hover:text-primary" />
               </div>
            </div>
          </div>

          {/* Background Highlight */}
          <div className={cn(
            "absolute -right-10 -bottom-10 w-40 h-40 bg-primary blur-[100px] transition-opacity duration-1000",
            isHovered ? "opacity-10" : "opacity-0"
          )} />
        </div>
      </Link>
    </motion.div>
  )
}
