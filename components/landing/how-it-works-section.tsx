"use client"

import { useLanguage } from "@/lib/i18n/language-context"
import { Share2, Trophy, Terminal, Target, Zap, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function HowItWorksSection() {
  const { t, language } = useLanguage()

  const steps = [
    {
      number: "01",
      id: "INIT_LOBBY",
      icon: Terminal,
      title: t("createLobby"),
      description: t("createLobbyDesc"),
    },
    {
      number: "02",
      id: "SYNC_INTEL",
      icon: Share2,
      title: t("shareCode"),
      description: t("shareCodeDesc"),
    },
    {
      number: "03",
      id: "STRAT_DRAFT",
      icon: Target,
      title: t("banAndPick"),
      description: t("banAndPickDesc"),
    },
    {
      number: "04",
      id: "EXECUTE",
      icon: Trophy,
      title: t("battle"),
      description: t("battleDesc"),
    },
  ]

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-[#020202] border-t border-white/5">
      {/* Tactical Background Grid - Matching other sections */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] opacity-20 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative">
        {/* Section Header - Unified border-l-4 style */}
        <div className="flex flex-col items-start mb-20 border-l-4 border-primary pl-8">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-3.5 w-3.5 text-primary animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-primary tracking-[0.4em] uppercase">
              {language === "es" ? "ESTRATEGIA DE BATALLA // FASES" : "BATTLE STRATEGY // PHASES"}
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-white uppercase italic">
            {t("howItWorks")}
          </h2>
        </div>

        {/* Steps Grid - Unified Sharp Card Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
          {steps.map((step, index) => (
            <div key={step.number} className="group relative">
              <div className="relative h-full bg-[#0a0a0b]/40 border border-white/5 p-8 transition-all duration-500 hover:bg-primary/[0.02] hover:border-primary/30">
                {/* HUD Brackets - Consistentes con el resto del sitio */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/10 group-hover:border-primary/50 transition-colors" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/10 group-hover:border-primary/50 transition-colors" />
                
                {/* Step Number Background */}
                <div className="absolute top-4 right-6 text-6xl font-black text-white/[0.02] group-hover:text-primary/[0.05] transition-colors pointer-events-none">
                  {step.number}
                </div>

                <div className="relative z-10">
                  <div className="mb-8 inline-flex h-14 w-14 items-center justify-center bg-white/[0.02] border border-white/10 group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-500">
                    <step.icon className="h-6 w-6 text-white/40 group-hover:text-primary transition-colors" />
                  </div>
                  
                  <div className="text-[10px] font-mono font-bold text-primary/40 tracking-widest mb-2 uppercase">
                    Fase_{step.number}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 uppercase italic tracking-tight group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm text-white/40 leading-relaxed font-light italic">
                    {step.description}
                  </p>
                </div>

                {/* Connection Arrow Overlay (Only for desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="h-8 w-8 text-primary/50" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Unified Footer Line */}
        <div className="mt-20 flex items-center gap-4 text-primary/20">
           <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/20" />
           <span className="text-[9px] font-black uppercase tracking-[0.5em] italic">READY_FOR_BATTLE</span>
           <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/20" />
        </div>
      </div>
    </section>
  )
}
