"use client"

import { useLanguage } from "@/lib/i18n/language-context"
import { Swords, Trophy, Users, LayoutGrid, ArrowUpRight, Target, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function HowItWorksSection() {
  const { t } = useLanguage()

  const modules = [
    {
      id: "01",
      title: t("draftSimulator"),
      description: t("draftSimulatorDesc"),
      href: "/lobby",
      icon: Swords,
      color: "#EAB308",
      size: "md:col-span-8",
    },
    {
      id: "02",
      title: t("teamBuilder"),
      description: t("teamBuilderDesc"),
      href: "/team-builder",
      icon: Users,
      color: "#3B82F6",
      size: "md:col-span-4",
    },
    {
      id: "03",
      title: t("techTree"),
      description: t("techTreeDesc"),
      href: "/techtree",
      icon: LayoutGrid,
      color: "#10B981",
      size: "md:col-span-4",
    },
    {
      id: "04",
      title: t("tournamentsTitle"),
      description: t("tournamentsDesc"),
      href: "/tournaments",
      icon: Trophy,
      color: "#A855F7",
      size: "md:col-span-8",
    }
  ]

  return (
    <section className="py-32 bg-[#020202] relative overflow-hidden border-y border-white/5">
      <div className="mx-auto max-w-[1400px] px-6 relative z-10">
        
        {/* Clean Header */}
        <div className="mb-20 flex flex-col items-center text-center">
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white uppercase italic mb-4">
            {t("ourTools").split(' ')[0]} <span className="gold-text-gradient">{t("ourTools").split(' ').slice(1).join(' ')}</span>
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-4" />
          <p className="text-white/40 text-lg max-w-2xl italic">
            {t("ourToolsSubtitle")}
          </p>
        </div>

        {/* Bento Grid Clean */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-white/5 border border-white/5">
          {modules.map((mod, i) => (
            <Link 
              key={i} 
              href={mod.href}
              className={cn(
                "group relative bg-[#050505] p-10 md:p-12 transition-all duration-500 overflow-hidden",
                mod.size
              )}
            >
              {/* Subtle AoE2 Assets Layer */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04] group-hover:opacity-20 transition-all duration-1000">
                {mod.id === "01" && (
                  <>
                    <Image src="/images/civs/britons_shield.png" width={300} height={300} alt="" className="absolute -right-10 -top-10 rotate-12 grayscale brightness-150 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-[2000ms]" />
                    <Image src="/images/civs/franks_shield.png" width={250} height={250} alt="" className="absolute right-40 bottom-[-20%] -rotate-12 grayscale brightness-125 group-hover:-translate-x-4 transition-transform duration-[2000ms] delay-100" />
                  </>
                )}
                {mod.id === "02" && (
                  <>
                    <Image src="/images/civs/goths_shield.png" width={240} height={240} alt="" className="absolute -right-10 top-0 rotate-6 grayscale brightness-125 group-hover:translate-y-4 transition-transform duration-[2000ms]" />
                    <Image src="/images/civs/teutons_shield.png" width={200} height={200} alt="" className="absolute right-20 bottom-[-10%] -rotate-6 grayscale brightness-110 group-hover:-translate-y-4 transition-transform duration-[2000ms]" />
                  </>
                )}
                {mod.id === "03" && (
                  <>
                    <Image src="/images/civs/aztecs_shield.png" width={220} height={220} alt="" className="absolute -left-10 -bottom-10 -rotate-12 grayscale brightness-150 group-hover:-translate-x-4 transition-transform duration-[2000ms]" />
                    <Image src="/images/civs/mayans_shield.png" width={200} height={200} alt="" className="absolute left-20 top-[-5%] rotate-12 grayscale brightness-125 group-hover:translate-x-4 transition-transform duration-[2000ms]" />
                  </>
                )}
                {mod.id === "04" && (
                  <div className="absolute inset-0 flex items-center justify-around px-20 opacity-60 group-hover:opacity-100 transition-opacity duration-1000">
                    <Image src="/images/units/unidad_Cataphract.png" width={280} height={280} alt="" className="grayscale brightness-150 translate-x-[-10%] scale-x-[-1] group-hover:translate-x-[-20%] transition-transform duration-[2000ms]" />
                    <Image src="/images/units/unidad_Samurai.png" width={280} height={280} alt="" className="grayscale brightness-150 translate-x-[10%] group-hover:translate-x-[20%] transition-transform duration-[2000ms]" />
                  </div>
                )}
                {/* Gradient Mask to keep text readable */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/20 to-transparent" />
              </div>

              {/* Hover Light Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${mod.color}08 0%, transparent 70%)` }}
              />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between">
                
                <div className="flex justify-between items-start">
                  <div className="h-16 w-16 border border-white/5 flex items-center justify-center relative group-hover:border-white/20 transition-colors bg-white/[0.02]">
                     <mod.icon className="h-7 w-7 text-white/40 group-hover:text-white transition-all duration-500" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] font-mono text-white/10 group-hover:text-white/30 transition-colors uppercase tracking-widest">{mod.id}</span>
                </div>

                <div className="mt-16">
                  <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tight mb-4 group-hover:translate-x-2 transition-transform duration-500">
                    {mod.title}
                  </h3>
                  <p className="text-white/30 text-sm leading-relaxed max-w-sm group-hover:text-white/60 transition-colors">
                    {mod.description}
                  </p>
                </div>

                {/* Decorative Accent Line - Unified Yellow */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-700" style={{ background: 'linear-gradient(90deg, transparent, #EAB308, transparent)' }} />
              </div>

              {/* Corner Accent */}
              <ArrowUpRight className="absolute top-10 right-10 h-5 w-5 text-white/5 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </Link>
          ))}
        </div>

        {/* Simple Footer Decoration */}
        <div className="mt-16 flex items-center justify-center gap-4 opacity-10">
           <div className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent" />
        </div>
      </div>
    </section>
  )
}
