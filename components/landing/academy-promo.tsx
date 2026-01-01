"use client"

import { motion } from "framer-motion"
import { GraduationCap, Trophy, ArrowRight, BookOpen, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function AcademyPromo() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#020202]">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-[3rem] bg-[#0a0a0b] border border-white/5 overflow-hidden shadow-2xl group">
          {/* Main Grid */}
          <div className="grid lg:grid-cols-2 gap-0">
            
            {/* Left Content */}
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
                className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-[0.9] mb-8"
              >
                Master the <span className="gold-text-gradient pr-4 -mr-4">Arts of War</span>
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
              >
                <Link href="/university">
                  <Button className="h-20 px-12 rounded-none bg-yellow-600 hover:bg-yellow-500 text-black font-black text-base tracking-[0.2em] uppercase transition-all shadow-[0_0_50px_-10px_rgba(234,179,8,0.5)] border-r-8 border-black/20 hover:scale-105 active:scale-95 group">
                    Enroll in University <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right Visual Section */}
            <div className="relative min-h-[500px] overflow-hidden border-l border-white/5 bg-zinc-900">
              <Image 
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000" 
                alt="Academy Visual"
                fill
                className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b] via-transparent to-transparent" />
              
              {/* HUD Elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="relative">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      className="h-64 w-64 md:h-96 md:w-96 rounded-full border-2 border-dashed border-primary/20 flex items-center justify-center p-8"
                    >
                       <div className="h-full w-full rounded-full border border-primary/10" />
                    </motion.div>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="h-32 w-32 md:h-48 md:w-48 bg-black rounded-full border-2 border-primary/40 flex items-center justify-center shadow-[0_0_50px_rgba(var(--primary),0.2)]">
                          <GraduationCap className="h-16 w-16 md:h-24 md:w-24 text-primary animate-pulse" />
                       </div>
                    </div>
                 </div>
              </div>

              {/* Data Floating Elements */}
              <div className="absolute top-12 right-12 p-4 border-r-2 border-t-2 border-primary/20 bg-black/40 backdrop-blur-sm">
                 <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-mono text-primary uppercase tracking-widest">Prestige System</span>
                    <span className="text-[10px] font-black text-white uppercase tracking-tighter">Elite Certified</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
