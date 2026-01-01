"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/language-context"
import { Github, Twitter, Youtube, Trophy, Shield, Info } from "lucide-react"

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#020202] border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      {/* Back-glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <Image src="/images/logo-mini.png" alt="Wololo Arena" width={40} height={40} className="h-10 w-auto grayscale group-hover:grayscale-0 transition-all" />
              <span className="text-2xl font-black tracking-tighter text-white uppercase italic">Wololo Arena</span>
            </Link>
            <p className="text-white/40 text-sm font-light italic leading-relaxed max-w-sm mb-8">
              La plataforma de mando definitiva para la competición profesional de Age of Empires II. 
              Estrategia, análisis y torneos en un ecosistema táctico unificado.
            </p>
            <div className="flex gap-5">
              {[Twitter, Github, Youtube].map((Icon, i) => (
                <Link key={i} href="#" className="h-10 w-10 border border-white/10 flex items-center justify-center text-white/40 hover:border-primary/40 hover:text-primary transition-all">
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Operaciones</span>
              <div className="flex flex-col gap-4">
                {[
                  { label: t("draft"), href: "/lobby" },
                  { label: t("tournaments"), href: "/tournaments" },
                  { label: t("tgBuilder"), href: "/team-builder" }
                ].map(link => (
                  <Link key={link.href} href={link.href} className="text-xs font-mono text-white/30 hover:text-white transition-colors uppercase tracking-widest italic">
                    // {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Plataforma</span>
              <div className="flex flex-col gap-4">
                {[
                  { label: t("profile"), href: "/profile" },
                  { label: "Estadísticas", href: "/civilizations" },
                  { label: "Leaderboard", href: "/lobby" }
                ].map(link => (
                  <Link key={link.label} href={link.href} className="text-xs font-mono text-white/30 hover:text-white transition-colors uppercase tracking-widest italic">
                    // {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 col-span-2 sm:col-span-1">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Estado</span>
              <div className="px-4 py-3 bg-white/[0.02] border border-white/5 flex flex-col gap-2">
                 <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]" />
                    <span className="text-[9px] font-mono text-green-500/80 uppercase">All Systems Live</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary/50 rounded-full" />
                    <span className="text-[9px] font-mono text-white/30 uppercase">v2.4.0 Competitive</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Bottom */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">
            <span>© {currentYear} Wololo Arena</span>
            <span className="hidden sm:block opacity-50">|</span>
            <span className="hidden sm:block">Tactical Strategic Hub</span>
          </div>
          <div className="flex items-center gap-6">
             <span className="text-[9px] font-mono text-white/10 uppercase italic">
               {t("notAffiliated")}
             </span>
          </div>
        </div>
      </div>
    </footer>
  )
}