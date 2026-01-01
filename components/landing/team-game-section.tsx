"use client"

import { useLanguage } from "@/lib/i18n/language-context"
import { Users, Zap, Shield, Target, Activity, Crown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function TeamGameSection() {
  const { t } = useLanguage()

  const synergyFeatures = [
    { title: t("feature1Title"), desc: t("feature1Desc"), icon: Activity },
    { title: t("feature2Title"), desc: t("feature2Desc"), icon: Target },
    { title: t("feature3Title"), desc: t("feature3Desc"), icon: Zap },
  ]

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-[#020202] border-t border-white/5">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />
      
      <div className="mx-auto max-w-7xl px-6 relative">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Visual Side: Synergy Visualization */}
          <div className="relative order-2 lg:order-1">
             <div className="relative aspect-square w-full max-w-[500px] mx-auto">
                {/* Rotating Glow */}
                <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse-slow blur-3xl" />
                
                {/* Synergy Core */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-primary/20 rounded-full flex flex-col items-center justify-center bg-[#0a0a0b]/80 backdrop-blur-xl z-10 shadow-[0_0_40px_rgba(var(--primary),0.1)]">
                   <Users className="h-10 w-10 text-primary mb-2 opacity-80" />
                   <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Sinergy Core</p>
                </div>

                {/* Floating Asset Icons (Representing Team Members) */}
                {[
                  { icon: Shield, label: "POCKET", pos: "top-0 left-1/2 -translate-x-1/2", color: "text-primary" },
                  { icon: Target, label: "FLANK_A", pos: "bottom-10 left-0", color: "text-primary/60" },
                  { icon: Crown, label: "FLANK_B", pos: "bottom-10 right-0", color: "text-primary/60" },
                ].map((member, i) => (
                  <div key={member.label} className={cn("absolute flex flex-col items-center gap-3 animate-float", member.pos)} style={{ animationDelay: `${i * 1.2}s` }}>
                     <div className="h-20 w-20 bg-[#0a0a0b] border border-white/10 flex items-center justify-center relative group">
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <member.icon className={cn("h-8 w-8", member.color)} />
                        {/* HUD Corners */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/40" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/40" />
                     </div>
                     <span className="text-[9px] font-mono font-bold text-white/30 uppercase tracking-widest">{member.label}</span>
                  </div>
                ))}

                {/* Connection Lines (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                   <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" className="text-primary" />
                   <line x1="50%" y1="50%" x2="15%" y2="85%" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" className="text-primary" />
                   <line x1="50%" y1="50%" x2="85%" y2="85%" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" className="text-primary" />
                </svg>
             </div>
          </div>

          {/* Info Side */}
          <div className="order-1 lg:order-2">
            <div className="flex flex-col items-start border-l-4 border-primary pl-8 mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-3.5 w-3.5 text-primary" />
                <span className="text-[10px] font-mono font-bold text-primary tracking-[0.4em] uppercase">SCOUTING INTEL // TEAM SYNERGY</span>
              </div>
              
              <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-white uppercase italic mb-6 overflow-visible">
                {t("teamGameSectionTitle")} <span className="inline-block gold-text-gradient pr-12 -mr-12">{t("teamGameSectionTitleHighlight")}</span>
              </h2>
              
              <p className="text-white/40 max-w-xl font-light text-lg italic leading-relaxed">
                {t("teamGameSectionSubtitle")}
              </p>
            </div>

            <div className="grid gap-6 mb-12">
               {synergyFeatures.map((f, i) => (
                 <div key={i} className="group relative bg-white/[0.01] border border-white/5 p-6 hover:border-primary/20 transition-all duration-500">
                    <div className="flex items-center gap-6">
                       <div className="h-12 w-12 bg-white/[0.02] border border-white/10 flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-500">
                          <f.icon className="h-5 w-5 text-white/40 group-hover:text-primary transition-colors" />
                       </div>
                       <div>
                          <h4 className="text-white font-bold uppercase italic tracking-wide group-hover:text-primary transition-colors">{f.title}</h4>
                          <p className="text-sm text-white/40 font-light">{f.desc}</p>
                       </div>
                    </div>
                 </div>
               ))}
            </div>

            <Button className="h-16 px-10 rounded-none bg-primary text-black font-black text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-[0_0_40px_rgba(var(--primary),0.2)] border-r-4 border-black/40">
               {t("openTGBuilder")} <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

        </div>
      </div>
    </section>
  )
}
