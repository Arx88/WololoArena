"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Timer, Users, Zap, Settings, History, Shield, Activity, Target, ShieldCheck } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export function FeaturesSection() {
  const { t } = useLanguage()

  const features = [
    { icon: Timer, title: t("timedPhases"), description: t("timedPhasesDesc") },
    { icon: Users, title: t("realTimeSync"), description: t("realTimeSyncDesc") },
    { icon: Zap, title: t("quickLobbies"), description: t("quickLobbiesDesc") },
    { icon: Settings, title: t("customizable"), description: t("customizableDesc") },
    { icon: History, title: t("matchHistory"), description: t("matchHistoryDesc") },
    { icon: ShieldCheck, title: t("fairPlay"), description: t("fairPlayDesc") },
  ]

  return (
    <section className="py-24 sm:py-32 relative bg-[#020202] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 relative">
        {/* Header - Consistent Left Alignment */}
        <div className="flex flex-col items-start mb-20 border-l-4 border-primary pl-8">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="h-3.5 w-3.5 text-primary" />
            <span className="text-[10px] font-mono font-bold text-primary tracking-[0.4em] uppercase">Core Capabilities // Specification</span>
          </div>
          
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-white uppercase italic">
            {t("everythingYouNeed")}
          </h2>
        </div>

        <div className="grid gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-3 border border-white/5">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative bg-[#0a0a0b] p-10 transition-all duration-500 hover:bg-primary/[0.02]"
            >
              {/* HUD Decoration */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 group-hover:border-primary/40 transition-colors" />
              
              <div className="relative z-10">
                <div className="mb-8 inline-flex h-12 w-12 items-center justify-center bg-white/[0.02] border border-white/10 group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-500">
                  <feature.icon className="h-5 w-5 text-white/40 group-hover:text-primary transition-colors" />
                </div>
                
                <h3 className="mb-4 text-xl font-bold text-white uppercase italic tracking-tight group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-sm text-white/40 leading-relaxed font-light italic">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}