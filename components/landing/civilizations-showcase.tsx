"use client"

import Image from "next/image"
import { CIVILIZATIONS } from "@/lib/data/civilizations"
import { useLanguage } from "@/lib/i18n/language-context"
import { Search, Database } from "lucide-react"
import { cn } from "@/lib/utils"

export function CivilizationsShowcase() {
  const { t } = useLanguage()
  const showcaseCivs = CIVILIZATIONS

  return (
    <section className="overflow-hidden py-24 bg-[#020202] relative border-t border-white/5">
      {/* Tactical Background Grid - Unified */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] opacity-20 pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 relative">
        {/* Section Header - Unified border-l-4 style */}
        <div className="flex flex-col items-start mb-16 border-l-4 border-primary pl-8">
          <div className="flex items-center gap-3 mb-4">
            <Database className="h-3.5 w-3.5 text-primary" />
            <span className="text-[10px] font-mono font-bold text-primary tracking-[0.4em] uppercase">Archivos de Civilizaciones // Global</span>
          </div>
          
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-white uppercase italic">
            {t("allCivs")}
          </h2>
        </div>

        {/* Scrolling civilizations - Unified Sharp Style */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 z-20 w-32 bg-gradient-to-r from-[#020202] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 z-20 w-32 bg-gradient-to-l from-[#020202] to-transparent pointer-events-none" />

          <div className="flex gap-1 overflow-hidden py-4">
            <div className="flex animate-[scroll_120s_linear_infinite] gap-1 hover:[animation-play-state:paused]">
              {[...showcaseCivs, ...showcaseCivs, ...showcaseCivs].map((civ, i) => (
                <div
                  key={`${civ.id}-${i}`}
                  className="group relative min-w-[220px] h-[300px] bg-[#0a0a0b]/60 border border-white/5 transition-all duration-500 hover:bg-primary/[0.02] hover:border-primary/30 overflow-hidden"
                >
                  {/* HUD Brackets - Consistentes */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/10 group-hover:border-primary/50 transition-colors" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/10 group-hover:border-primary/50 transition-colors" />
                  
                  {/* ID Header sutil */}
                  <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                    <span className="text-[9px] font-mono text-white/20 tracking-widest uppercase italic">REF_{civ.id.substring(0, 4).toUpperCase()}</span>
                    <Search className="h-3 w-3 text-primary/20 group-hover:text-primary/40 transition-colors" />
                  </div>

                  <div className="p-6 flex flex-col items-center">
                    <div className="relative h-24 w-24 mb-6 transition-transform duration-700 group-hover:scale-110">
                      <div className="absolute inset-0 border border-primary/10 rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="relative h-full w-full bg-black border border-white/10 p-1 group-hover:border-primary/30 transition-colors overflow-hidden">
                        <Image
                          src={civ.icon || "/placeholder.svg"}
                          alt={civ.name}
                          fill
                          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </div>

                    <div className="w-full space-y-4 text-center">
                      <h3 className="text-2xl font-bold text-white tracking-tighter uppercase italic group-hover:text-primary transition-colors">
                        {civ.name}
                      </h3>
                      
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-[8px] font-mono text-white/30 uppercase tracking-tighter">
                          <span>ESPECIALIDAD</span>
                          <span className="text-primary/50">{civ.specialty.split(' ')[0]}</span>
                        </div>
                        <div className="h-px bg-white/5 w-full" />
                        <div className="flex justify-between text-[8px] font-mono text-white/30 uppercase tracking-tighter">
                          <span>ESTADO</span>
                          <span className="text-green-500/50">VERIFICADO</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Database Footer - Unified */}
        <div className="mt-16 flex items-center gap-4 text-primary/20">
           <div className="h-px w-12 bg-primary/20" />
           <span className="text-[9px] font-mono uppercase tracking-[0.4em] animate-pulse">
             Exploring heritage... 100% Verified
           </span>
           <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-220px * ${CIVILIZATIONS.length} - 0.25rem * ${CIVILIZATIONS.length}));
          }
        }
      `}</style>
    </section>
  )
}