"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Crown, Zap, ArrowRight, Star, TrendingUp, Shield, Swords, Sparkles, Anchor, Target } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { CIVILIZATIONS } from "@/lib/data/civilizations"
import { getAdvancedBestSynergies } from "@/lib/data/synergy-calculator"
import Image from "next/image"

export function BestSynergiesSection() {
  const router = useRouter()
  const { language } = useLanguage()

  const synergies = getAdvancedBestSynergies().slice(0, 6)

  const labels = {
    badge: language === "es" ? "Estrategias de Élite" : "Elite Strategies",
    title: language === "es" ? "Alianzas de Poder" : "Power Alliances",
    titleHighlight: language === "es" ? "Sinergias Imbatibles" : "Unbeatable Synergies",
    subtitle:
      language === "es"
        ? "Descubre las combinaciones de civilizaciones que dominan el campo de batalla competitivo. Análisis basado en bonos de equipo y win rates de alto nivel."
        : "Discover the civilization combinations that dominate the competitive battlefield. Analysis based on team bonuses and high-level win rates.",
    cta: language === "es" ? "Ver Matriz de Sinergias" : "View Synergy Matrix",
  }

  const getRankStyles = (index: number) => {
    switch (index) {
      case 0:
        return {
          card: "border-amber-500/50 bg-[#1a1610] shadow-[0_0_30px_-10px_rgba(212,175,55,0.3)]",
          badge: "bg-amber-500/20 text-amber-500 border-amber-500/40",
          icon: <Crown className="h-6 w-6 text-amber-500" />,
          title: "text-amber-500",
          border: "from-amber-600 via-amber-400 to-amber-600",
        }
      case 1:
        return {
          card: "border-slate-400/50 bg-[#15171a] shadow-[0_0_30px_-10px_rgba(148,163,184,0.3)]",
          badge: "bg-slate-400/20 text-slate-400 border-slate-400/40",
          icon: <Shield className="h-6 w-6 text-slate-400" />,
          title: "text-slate-300",
          border: "from-slate-500 via-slate-300 to-slate-500",
        }
      case 2:
        return {
          card: "border-orange-700/50 bg-[#1a1210] shadow-[0_0_30px_-10px_rgba(194,65,12,0.3)]",
          badge: "bg-orange-700/20 text-orange-600 border-orange-700/40",
          icon: <Swords className="h-6 w-6 text-orange-600" />,
          title: "text-orange-600",
          border: "from-orange-800 via-orange-600 to-orange-800",
        }
      default:
        return {
          card: "border-border/40 bg-card/40 backdrop-blur-sm",
          badge: "bg-muted text-muted-foreground border-border/50",
          icon: <Zap className="h-5 w-5 text-primary" />,
          title: "text-foreground",
          border: "from-border via-border/50 to-border",
        }
    }
  }

  return (
    <section className="py-24 relative overflow-hidden bg-[#0a0a0b]">
      {/* Background Medieval Decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[url('/stone-pattern.png')] bg-repeat opacity-10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-primary/30 bg-primary/5 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="h-3 w-3" />
            {labels.badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            {labels.title} <span className="text-primary">{labels.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed italic">
            "{labels.subtitle}"
          </p>
        </div>

        {/* Synergies Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {synergies.map((syn, index) => {
            const civ1 = CIVILIZATIONS.find((c) => c.id === syn.civs[0])
            const civ2 = CIVILIZATIONS.find((c) => c.id === syn.civs[1])
            const styles = getRankStyles(index)

            return (
              <Card
                key={index}
                className={`group relative overflow-hidden transition-all duration-500 hover:-translate-y-2 border-t-4 ${styles.card} ${index < 3 ? "border-x-2 border-b-2" : "border-border/20"}`}
                style={{ borderTopColor: 'transparent', borderImage: index < 3 ? `linear-gradient(to right, ${styles.border}) 1` : undefined }}
                onClick={() => router.push("/team-builder")}
              >
                {/* Decorative corners for top 3 */}
                {index < 3 && (
                  <>
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-500/30 rounded-tl-lg" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-500/30 rounded-tr-lg" />
                  </>
                )}

                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute inset-0 blur-sm opacity-50 bg-primary/20 rounded-full" />
                        {styles.icon}
                      </div>
                      <div className="h-8 w-px bg-border/50" />
                      <span className="text-2xl font-black tracking-tighter italic">#{index + 1}</span>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className={`font-black text-sm px-3 py-1 ${styles.badge}`}>
                        {syn.score}%
                      </Badge>
                      <div className="flex items-center justify-end gap-1 mt-1 text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">
                        <TrendingUp className="h-3 w-3" />
                        <span>+{syn.winRateBoost}% WR</span>
                      </div>
                    </div>
                  </div>

                  {/* Civ Display */}
                  <div className="relative flex items-center justify-between gap-4 mb-8">
                    {/* Connection Line */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-0" />
                    
                    {civ1 && (
                      <div className="relative z-10 text-center">
                        <div className="relative h-20 w-20 mx-auto mb-2 rounded-lg border-2 border-primary/20 bg-background/80 p-1 group-hover:border-primary/50 transition-colors shadow-lg shadow-black/50">
                          <Image
                            src={civ1.icon || "/placeholder.svg"}
                            alt={civ1.name}
                            fill
                            className="object-contain p-2"
                            unoptimized
                          />
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                          {civ1.name}
                        </p>
                      </div>
                    )}

                    <div className="relative z-20 flex flex-col items-center gap-1">
                      <div className="h-10 w-10 rounded-full bg-background border border-primary/30 flex items-center justify-center shadow-inner shadow-black">
                        <Zap className="h-5 w-5 text-primary animate-pulse" />
                      </div>
                      <span className="text-[8px] font-black text-primary/60 uppercase tracking-[0.3em]">Link</span>
                    </div>

                    {civ2 && (
                      <div className="relative z-10 text-center">
                        <div className="relative h-20 w-20 mx-auto mb-2 rounded-lg border-2 border-primary/20 bg-background/80 p-1 group-hover:border-primary/50 transition-colors shadow-lg shadow-black/50">
                          <Image
                            src={civ2.icon || "/placeholder.svg"}
                            alt={civ2.name}
                            fill
                            className="object-contain p-2"
                            unoptimized
                          />
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                          {civ2.name}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Strategic Analysis */}
                  <div className="relative mb-6">
                    <div className="absolute -left-2 top-0 bottom-0 w-1 bg-primary/20 rounded-full" />
                    <p className="pl-4 text-sm font-medium leading-relaxed text-muted-foreground italic">
                      "{syn.reason}"
                    </p>
                  </div>

                  {/* Synergy Tags */}
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {syn.tags.map((tag) => (
                      <div key={tag} className="flex items-center gap-1 px-2 py-0.5 rounded-sm bg-primary/5 border border-primary/10 text-[9px] font-bold uppercase tracking-wider text-primary/80">
                        {tag === "cavalry" && <Shield className="h-2.5 w-2.5" />}
                        {tag === "archers" && <Target className="h-2.5 w-2.5" />}
                        {tag === "navy" && <Anchor className="h-2.5 w-2.5" />}
                        {tag}
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Bottom Accents */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              </Card>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center relative">
          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 mb-10 opacity-30">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-primary" />
            <Crown className="h-4 w-4 text-primary" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-primary" />
          </div>

          <Button 
            size="lg" 
            onClick={() => router.push("/team-builder")} 
            className="group h-14 px-10 text-lg font-black uppercase tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground rounded-none border-x-4 border-primary-foreground/20 shadow-[0_10px_30px_-10px_rgba(var(--primary),0.5)] transition-all active:scale-95"
          >
            {labels.cta}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <p className="mt-8 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em]">
            Database Updated: 2025.12.28
          </p>
        </div>
      </div>
    </section>
  )
}


