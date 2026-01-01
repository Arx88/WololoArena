"use client"

import { useLanguage } from "@/lib/i18n/language-context"
import { TrendingUp, Activity, Shield, Zap, Target, Crown } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const TOP_PLAYERS = [
  { rank: 1, name: "TheViper", points: 2850, winRate: 68, specialty: "Cavalry Master" },
  { rank: 2, name: "Hera", points: 2795, winRate: 65, specialty: "Archer Micro" },
  { rank: 3, name: "Liereyy", points: 2740, winRate: 64, specialty: "Fast Castle" },
]

export function LeaderboardCompactSection() {
  const { t } = useLanguage()

  return (
    <section className="py-24 bg-[#020202] relative border-t border-white/5 overflow-hidden">
      {/* Background Text Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.01] uppercase italic pointer-events-none select-none whitespace-nowrap">
        Elite Combatants
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="flex flex-col items-center mb-24">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-primary/20 bg-primary/5 mb-6">
            <Shield className="h-3.5 w-3.5 text-primary" />
            <span className="text-[10px] font-mono font-bold text-primary tracking-[0.4em] uppercase">IMPERIAL HALL OF HEROES</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase italic text-center leading-none overflow-visible">
            The <span className="inline-block gold-text-gradient pr-12 -mr-12">Pantheon</span>
          </h2>
        </div>

        {/* INNOVATIVE PODIUM LAYOUT */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-12 items-end max-w-5xl mx-auto">
          
          {/* Rank 2 */}
          <div className="order-2 lg:order-1 relative group animate-float-delayed">
             <div className="absolute -inset-4 bg-white/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="relative bg-white/[0.02] border border-white/10 p-8 pt-16">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                   <div className="relative h-24 w-24">
                      <svg className="absolute inset-0 h-full w-full rotate-[-90deg]">
                         <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/5" />
                         <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="2" fill="transparent" strokeDasharray="276" strokeDashoffset={276 - (276 * TOP_PLAYERS[1].winRate) / 100} className="text-white/20" />
                      </svg>
                      <Avatar className="h-20 w-20 absolute top-2 left-2 rounded-none border border-white/10">
                         <AvatarFallback className="bg-black text-white font-black">{TOP_PLAYERS[1].name.substring(0,2)}</AvatarFallback>
                      </Avatar>
                   </div>
                </div>
                <div className="text-center">
                   <span className="text-4xl font-black text-white/10 italic block mb-2">02</span>
                   <h3 className="text-2xl font-black text-white uppercase italic mb-1 group-hover:text-primary transition-colors">{TOP_PLAYERS[1].name}</h3>
                   <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-6">{TOP_PLAYERS[1].specialty}</p>
                   <div className="h-px w-12 bg-primary/30 mx-auto mb-6" />
                   <div className="flex justify-between items-center px-4">
                      <div className="text-left">
                         <p className="text-[8px] font-mono text-white/20 uppercase">Elo</p>
                         <p className="text-lg font-black text-white italic">{TOP_PLAYERS[1].points}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[8px] font-mono text-white/20 uppercase">WinRate</p>
                         <p className="text-lg font-black text-white italic">{TOP_PLAYERS[1].winRate}%</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Rank 1 - THE KING */}
          <div className="order-1 lg:order-2 relative group animate-float z-20">
             <div className="absolute -inset-8 bg-primary/10 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
             <div className="relative bg-[#0a0a0b] border-2 border-primary/40 p-10 pt-20 shadow-[0_0_50px_rgba(var(--primary),0.15)]">
                {/* HUD Elements */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary" />
                
                <div className="absolute -top-14 left-1/2 -translate-x-1/2">
                   <div className="relative h-32 w-32">
                      <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                      <svg className="absolute inset-0 h-full w-full rotate-[-90deg]">
                         <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
                         <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="377" strokeDashoffset={377 - (377 * TOP_PLAYERS[0].winRate) / 100} className="text-primary" />
                      </svg>
                      <Avatar className="h-28 w-28 absolute top-2 left-2 rounded-none border-2 border-primary/40">
                         <AvatarFallback className="bg-black text-primary font-black text-3xl italic">{TOP_PLAYERS[0].name.substring(0,2)}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-4 -right-2 bg-primary text-black p-1.5 shadow-xl">
                         <Crown className="h-5 w-5" />
                      </div>
                   </div>
                </div>

                <div className="text-center">
                   <span className="text-6xl font-black text-primary/10 italic block mb-2 leading-none">01</span>
                   <h3 className="text-4xl font-black text-white uppercase italic mb-2 tracking-tighter">{TOP_PLAYERS[0].name}</h3>
                   <p className="text-xs font-mono text-primary font-bold uppercase tracking-[0.3em] mb-8">{TOP_PLAYERS[0].specialty}</p>
                   
                   <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 mb-8">
                      <div className="bg-black p-4">
                         <p className="text-[9px] font-mono text-white/30 uppercase mb-1">Combat Power</p>
                         <p className="text-3xl font-black text-white italic">{TOP_PLAYERS[0].points}</p>
                      </div>
                      <div className="bg-black p-4">
                         <p className="text-[9px] font-mono text-white/30 uppercase mb-1">Efficiency</p>
                         <p className="text-3xl font-black text-primary italic">{TOP_PLAYERS[0].winRate}%</p>
                      </div>
                   </div>

                   <Button className="w-full h-14 rounded-none bg-primary text-black font-black uppercase text-xs tracking-widest border-r-4 border-black/40 hover:scale-105 transition-all">
                      Analyze Strategy
                   </Button>
                </div>
             </div>
          </div>

          {/* Rank 3 */}
          <div className="order-3 lg:order-3 relative group animate-float-delayed" style={{ animationDelay: '2s' }}>
             <div className="absolute -inset-4 bg-white/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="relative bg-white/[0.02] border border-white/10 p-8 pt-16">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                   <div className="relative h-24 w-24">
                      <svg className="absolute inset-0 h-full w-full rotate-[-90deg]">
                         <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/5" />
                         <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="2" fill="transparent" strokeDasharray="276" strokeDashoffset={276 - (276 * TOP_PLAYERS[2].winRate) / 100} className="text-white/20" />
                      </svg>
                      <Avatar className="h-20 w-20 absolute top-2 left-2 rounded-none border border-white/10">
                         <AvatarFallback className="bg-black text-white font-black">{TOP_PLAYERS[2].name.substring(0,2)}</AvatarFallback>
                      </Avatar>
                   </div>
                </div>
                <div className="text-center">
                   <span className="text-4xl font-black text-white/10 italic block mb-2">03</span>
                   <h3 className="text-2xl font-black text-white uppercase italic mb-1 group-hover:text-primary transition-colors">{TOP_PLAYERS[2].name}</h3>
                   <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-6">{TOP_PLAYERS[2].specialty}</p>
                   <div className="h-px w-12 bg-primary/30 mx-auto mb-6" />
                   <div className="flex justify-between items-center px-4">
                      <div className="text-left">
                         <p className="text-[8px] font-mono text-white/20 uppercase">Elo</p>
                         <p className="text-lg font-black text-white italic">{TOP_PLAYERS[2].points}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[8px] font-mono text-white/20 uppercase">WinRate</p>
                         <p className="text-lg font-black text-white italic">{TOP_PLAYERS[2].winRate}%</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* Global Action */}
        <div className="mt-20 flex justify-center">
           <div className="flex flex-col items-center">
              <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.5em] mb-6 animate-pulse">Scanning live competitive database...</p>
              <Button variant="ghost" className="text-white/40 hover:text-primary font-black uppercase text-xs tracking-[0.2em] gap-4 group">
                 Open Global Rankings <Activity className="h-4 w-4 group-hover:animate-spin" />
              </Button>
           </div>
        </div>
      </div>
    </section>
  )
}
