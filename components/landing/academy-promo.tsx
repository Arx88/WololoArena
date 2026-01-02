"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GraduationCap, ArrowRight, Star, Zap, Shield, Swords, Target, CheckCircle2, XCircle, Clock, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Sample questions for the live animation
const PREVIEW_QUESTIONS = [
  {
    q: "Best counter to Longbowmen?",
    options: ["Pikes", "Skirmishers", "Paladins", "Siege Rams"],
    correct: 1,
    category: "Military"
  },
  {
    q: "Standard 21-pop wood count?",
    options: ["2 Vills", "4 Vills", "6 Vills", "8 Vills"],
    correct: 1,
    category: "Economy"
  },
  {
    q: "Lithuanians start bonus?",
    options: ["+100 Food", "+150 Food", "+200 Food", "Free Horse"],
    correct: 1,
    category: "Civ Stats"
  }
]

export function AcademyPromo() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#020202]">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.05)_0%,#020202_100%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="relative rounded-[3rem] bg-[#0a0a0b] border border-white/5 overflow-hidden shadow-2xl group">
          
          <div className="grid lg:grid-cols-2 gap-0">
            
            {/* LEFT CONTENT: RESTORED & OPTIMIZED */}
            <div className="p-12 md:p-20 flex flex-col justify-center relative z-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Academy Protocol</span>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-[0.9] mb-8 font-cinzel"
              >
                WOLOLO <br />
                <span className="gold-text-gradient pr-4 -mr-4">UNIVERSITY</span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-zinc-400 text-lg md:text-xl max-w-xl font-light italic leading-relaxed mb-12"
              >
                From Dark Age fundamentals to Imperial conquest. Take our specialized multiple-choice gauntlet and earn elite certifications for your profile.
              </motion.p>

              <div className="grid grid-cols-2 gap-8 mb-12 border-y border-white/5 py-8">
                 <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary">
                       <Star className="h-4 w-4 fill-primary" />
                       <span className="text-sm font-black uppercase tracking-widest italic">100+ Questions</span>
                    </div>
                    <p className="text-[10px] text-white/30 uppercase font-bold">Per academic level</p>
                 </div>
                 <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary">
                       <Zap className="h-4 w-4 fill-primary" />
                       <span className="text-sm font-black uppercase tracking-widest italic">Live Feedback</span>
                    </div>
                    <p className="text-[10px] text-white/30 uppercase font-bold">Real-time debriefing</p>
                 </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-6 items-center"
              >
                <Link href="/university">
                  <Button className="h-20 px-12 rounded-none bg-yellow-600 hover:bg-yellow-500 text-black font-black text-base tracking-[0.2em] uppercase transition-all shadow-[0_0_50px_-10px_rgba(234,179,8,0.5)] border-r-8 border-black/20 hover:scale-105 active:scale-95 group">
                    Enrollment Protocol <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>

                <div className="flex -space-x-3">
                   {[...Array(4)].map((_, i) => (
                     <div key={i} className="h-10 w-10 rounded-full border-2 border-[#0a0a0b] bg-zinc-800 overflow-hidden relative">
                        <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" fill className="grayscale opacity-50" />
                     </div>
                   ))}
                   <div className="h-10 px-4 rounded-full border-2 border-[#0a0a0b] bg-zinc-900 flex items-center justify-center text-[10px] font-black text-white/40 uppercase tracking-widest">
                      +2.4k Enrolled
                   </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT SIDE: LIVE QUIZ SIMULATOR (NON-GENERIC ANIMATION) */}
            <div className="relative min-h-[600px] overflow-hidden bg-zinc-900/50 flex items-center justify-center p-12">
               {/* Background Grid Accent */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
               
               <QuizAnimation />

               {/* Ambient Glows */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full" />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

function QuizAnimation() {
  const [qIdx, setQIdx] = useState(0)
  const [state, setState] = useState<'idle' | 'selecting' | 'result'>('idle')
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)

  const current = PREVIEW_QUESTIONS[qIdx]

  useEffect(() => {
    let timeout: NodeJS.Timeout
    
    const runCycle = async () => {
      // 1. Wait a bit
      await new Promise(r => setTimeout(r, 1500))
      
      // 2. Select correct option
      setState('selecting')
      setSelectedIdx(current.correct)
      
      // 3. Show result
      await new Promise(r => setTimeout(r, 800))
      setState('result')
      
      // 4. Move to next
      await new Promise(r => setTimeout(r, 2000))
      setQIdx(prev => (prev + 1) % PREVIEW_QUESTIONS.length)
      setState('idle')
      setSelectedIdx(null)
    }

    runCycle()
  }, [qIdx])

  return (
    <motion.div 
      style={{ rotateY: -15, rotateX: 10 }}
      className="relative w-full max-w-md perspective-1000"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={qIdx}
          initial={{ opacity: 0, x: 20, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 1.1 }}
          className="bg-[#050506] border-2 border-white/10 rounded-3xl p-8 shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative overflow-hidden"
        >
          {/* Scanning line */}
          <motion.div 
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-px bg-primary/20 blur-sm z-20 pointer-events-none"
          />

          <div className="flex items-center justify-between mb-8">
             <Badge className="bg-primary/10 text-primary border-primary/20 text-[8px] font-black tracking-widest px-3">
               LEVEL: {current.category.toUpperCase()}
             </Badge>
             <div className="flex items-center gap-2 text-white/20">
                <Clock className="h-3.5 w-3.5" />
                <span className="text-[10px] font-mono">00:14</span>
             </div>
          </div>

          <h4 className="text-xl font-black text-white uppercase italic tracking-tight mb-8 leading-tight">
            {current.q}
          </h4>

          <div className="space-y-3">
            {current.options.map((opt, i) => {
              const isSelected = selectedIdx === i
              const showCorrect = state === 'result' && i === current.correct

              return (
                <div 
                  key={i}
                  className={cn(
                    "relative p-4 rounded-xl border-2 transition-all duration-500 flex items-center justify-between",
                    isSelected && state === 'selecting' ? "border-primary/50 bg-primary/5 scale-[1.02]" : "border-white/5 bg-white/[0.02]",
                    showCorrect ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.2)] scale-[1.05]" : ""
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "h-7 w-7 rounded-lg border-2 flex items-center justify-center text-[10px] font-black",
                      showCorrect ? "bg-emerald-500 border-emerald-400 text-black" : "bg-white/5 border-white/10 text-white/40"
                    )}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className={cn(
                      "text-sm font-bold uppercase italic",
                      showCorrect ? "text-emerald-400" : "text-white/60"
                    )}>{opt}</span>
                  </div>
                  
                  {showCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                </div>
              )
            })}
          </div>

          {/* System Feedback Overlay */}
          {state === 'result' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 flex items-center gap-3"
            >
               <Zap className="h-4 w-4 text-emerald-500" />
               <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">Correct Answer</span>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Decorative floating elements */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -top-6 -right-6 h-12 w-12 bg-primary/20 rounded-2xl border border-primary/40 backdrop-blur-xl flex items-center justify-center shadow-2xl z-30"
      >
        <Trophy className="h-6 w-6 text-primary" />
      </motion.div>
    </motion.div>
  )
}