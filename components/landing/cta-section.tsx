"use client"

import { useMemo } from "react"
import { useLanguage } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import { Swords, ArrowRight, Activity, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { CIVILIZATIONS } from "@/lib/data/civilizations"

// --- OPTIMIZED BACKGROUND COMPONENT (From Hero) ---
function MatrixBackground() {
  const icons = useMemo(() => CIVILIZATIONS.slice(0, 15).map(c => c.icon).filter(Boolean), [])
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none opacity-30">
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.05] z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_85%)] z-20" />
      <div className="absolute inset-0 flex justify-between mask-gradient-vertical transform skew-x-12 scale-125">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="flex flex-col gap-24 animate-infinite-scroll"
            style={{
              animationDuration: `${30 + i * 10}s`,
              animationDelay: `-${i * 4}s`
            }}
          >
            {[...icons, ...icons, ...icons].map((icon, j) => (
              <div key={j} className="relative w-20 h-20 grayscale brightness-75 opacity-60">
                <Image 
                  src={icon || ""} 
                  alt="" 
                  width={80} 
                  height={80} 
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function CTASection() {
  const { t } = useLanguage()

  return (
    <section className="relative py-32 sm:py-48 overflow-hidden bg-[#050505] border-t border-yellow-500/10">
      <MatrixBackground />
      
      {/* Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Status Badge */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-3 px-5 py-2 border border-yellow-500/20 bg-yellow-500/5 backdrop-blur-md rounded-full shadow-[0_0_20px_rgba(234,179,8,0.1)]">
              <Sparkles className="h-4 w-4 text-yellow-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-yellow-500">READY FOR BATTLE</span>
            </div>
          </div>

          <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.8] mb-10 font-cinzel">
            <span className="block opacity-40">{t("readyToDraft")}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              {t("joinNow")}
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-zinc-400 font-light mb-14 max-w-2xl leading-relaxed italic border-x border-yellow-500/10 px-8 py-2">
            {t("ctaSubtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <Link href="/auth/sign-up">
              <Button size="lg" className="h-20 px-16 rounded-sm bg-yellow-600 hover:bg-yellow-500 text-black font-black text-xl tracking-widest uppercase hover:scale-105 transition-all shadow-[0_0_60px_-10px_rgba(234,179,8,0.5)] border-b-4 border-yellow-800 active:translate-y-1 group relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center">
                  {t("createFreeAccount")}
                  <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </Button>
            </Link>
          </div>

          {/* Tactical Disclaimer */}
          <div className="mt-24 flex items-center gap-6 opacity-20">
             <div className="h-px w-24 bg-gradient-to-r from-transparent to-white" />
             <span className="text-[10px] font-mono uppercase tracking-[0.6em] text-white whitespace-nowrap">WOLOLO ARENA // 2025 EDITION</span>
             <div className="h-px w-24 bg-gradient-to-l from-transparent to-white" />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes infinite-scroll {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        .animate-infinite-scroll {
          animation-name: infinite-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        .mask-gradient-vertical {
          mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
        }
      `}</style>
    </section>
  )
}