"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Zap, Target, ArrowRight, Sparkles, Shield, TrendingUp } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { CIVILIZATIONS, getBestCivSynergies } from "@/lib/data/civilizations"
import Image from "next/image"

export function TGBuilderPromoSection() {
  const router = useRouter()
  const { language } = useLanguage()

  const topSynergies = getBestCivSynergies().slice(0, 3)

  const labels = {
    badge: language === "es" ? "Herramienta de Team Game" : "Team Game Tool",
    title: language === "es" ? "Domina los Team Games" : "Master Team Games",
    subtitle:
      language === "es"
        ? "Construye el equipo perfecto con nuestro analizador de sinergias. Descubre las mejores combinaciones de civilizaciones para 2v2, 3v3 y 4v4."
        : "Build the perfect team with our synergy analyzer. Discover the best civilization combinations for 2v2, 3v3 and 4v4.",
    feature1Title: language === "es" ? "Análisis de Sinergias" : "Synergy Analysis",
    feature1Desc:
      language === "es"
        ? "Calcula la sinergia entre civilizaciones basándose en team bonuses reales"
        : "Calculate synergy between civilizations based on real team bonuses",
    feature2Title: language === "es" ? "Posiciones Óptimas" : "Optimal Positions",
    feature2Desc:
      language === "es"
        ? "Recomendaciones de flanco y pocket para cada civilización"
        : "Flank and pocket recommendations for each civilization",
    feature3Title: language === "es" ? "Mejores Combos" : "Best Combos",
    feature3Desc:
      language === "es"
        ? "Descubre las combinaciones más poderosas usadas por pros"
        : "Discover the most powerful combinations used by pros",
    cta: language === "es" ? "Abrir TG Builder" : "Open TG Builder",
    topSynergies: language === "es" ? "Top Sinergias" : "Top Synergies",
  }

  const features = [
    {
      icon: Zap,
      title: labels.feature1Title,
      desc: labels.feature1Desc,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: Target,
      title: labels.feature2Title,
      desc: labels.feature2Desc,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: TrendingUp,
      title: labels.feature3Title,
      desc: labels.feature3Desc,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ]

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="mx-auto max-w-7xl px-4 relative">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left side - Content */}
          <div>
            <Badge variant="outline" className="mb-4 gap-1.5 px-3 py-1">
              <Users className="h-3.5 w-3.5" />
              {labels.badge}
            </Badge>

            <h2 className="text-3xl sm:text-4xl font-bold mb-4 overflow-visible">
              {labels.title.split(" ")[0]}{" "}
              <span className="text-primary">{labels.title.split(" ").slice(1).join(" ")}</span>
            </h2>

            <p className="text-muted-foreground mb-8 text-lg">{labels.subtitle}</p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${feature.bg}`}>
                    <feature.icon className={`h-5 w-5 ${feature.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button size="lg" onClick={() => router.push("/team-builder")} className="gap-2">
              <Shield className="h-5 w-5" />
              {labels.cta}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Right side - Top Synergies Preview */}
          <div className="relative">
            <Card className="bg-[#0a0a0b]/80 border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border-border/50 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-lg">{labels.topSynergies}</h3>
                </div>

                <div className="space-y-4">
                  {topSynergies.map((syn, index) => {
                    const civ1 = CIVILIZATIONS.find((c) => c.name.toLowerCase() === syn.civs[0].toLowerCase())
                    const civ2 = CIVILIZATIONS.find((c) => c.name.toLowerCase() === syn.civs[1].toLowerCase())

                    return (
                      <div
                        key={index}
                        className={`relative p-4 rounded-xl border transition-all hover:border-primary/50 cursor-pointer ${
                          index === 0
                            ? "border-primary/30 bg-primary/5"
                            : index === 1
                              ? "border-amber-500/30 bg-amber-500/5"
                              : "border-blue-500/30 bg-blue-500/5"
                        }`}
                        onClick={() => router.push("/team-builder")}
                      >
                        {/* Rank badge */}
                        <div className="absolute -top-2 -right-2">
                          <Badge
                            className={`${
                              index === 0
                                ? "bg-primary text-primary-foreground"
                                : index === 1
                                  ? "bg-amber-500 text-white"
                                  : "bg-blue-500 text-white"
                            }`}
                          >
                            #{index + 1}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4">
                          {/* Civ icons */}
                          <div className="flex items-center -space-x-2">
                            {civ1 && (
                              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-background bg-card">
                                <Image
                                  src={civ1.icon || "/placeholder.svg"}
                                  alt={civ1.name}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              </div>
                            )}
                            {civ2 && (
                              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-background bg-card">
                                <Image
                                  src={civ2.icon || "/placeholder.svg"}
                                  alt={civ2.name}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              </div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm">
                                {syn.civs[0]} + {syn.civs[1]}
                              </span>
                              <Badge variant="outline" className="text-xs text-emerald-500 border-emerald-500/50">
                                {syn.score}%
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-1">{syn.reason}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* More synergies hint */}
                <div className="mt-4 text-center">
                  <Button variant="ghost" size="sm" onClick={() => router.push("/team-builder")} className="text-xs">
                    {language === "es" ? "Ver todas las sinergias" : "View all synergies"}
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Floating elements for visual interest */}
            <div className="absolute -top-4 -left-4 p-3 rounded-xl bg-card border border-border/50 shadow-lg animate-pulse-gold">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div className="absolute -bottom-4 -right-4 p-3 rounded-xl bg-card border border-border/50 shadow-lg">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

