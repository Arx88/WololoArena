"use client"

import { useState, use, useEffect } from "react"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCivilizationById, CIVILIZATIONS } from "@/lib/data/civilizations"
import { getBuildOrdersForCiv, type BuildOrder } from "@/lib/data/build-orders"
import { getCivStats } from "@/lib/data/civ-stats"
import { useLanguage } from "@/lib/i18n/language-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Shield,
  Target,
  TrendingUp,
  Users,
  Map,
  Crown,
  Zap,
  BookOpen,
  ChevronRight,
  Star,
  Clock,
  AlertTriangle,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

// --- PREMIUM COMPONENTS ---

function PremiumStatBar({ value, label, color = "primary" }: { value: number, label: string, color?: string }) {
  const [width, setWidth] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => setWidth(value), 100)
    return () => clearTimeout(timer)
  }, [value])

  const barColor = value >= 50 ? "bg-emerald-500" : "bg-red-500"
  const glowColor = value >= 50 ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
        <span className={cn("text-lg font-black tracking-tighter", value >= 50 ? "text-emerald-400" : "text-red-400")}>
          {value}%
        </span>
      </div>
      <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
        <div 
          className={cn("h-full transition-all duration-1000 ease-out rounded-full relative", barColor)}
          style={{ 
            width: `${width}%`,
            boxShadow: `0 0 15px ${glowColor}`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
        </div>
      </div>
    </div>
  )
}

function MagicalSynergyGaugeSmall({ score, label }: { score: number, label: string }) {
  const [animatedScore, setAnimatedScore] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 100)
    return () => clearTimeout(timer)
  }, [score])

  const size = 80
  const strokeWidth = 6
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (animatedScore / 100) * circumference
  
  const color = score >= 50 ? "#10b981" : "#ef4444"

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <div className="absolute inset-0 rounded-full blur-xl opacity-10" style={{ backgroundColor: color }} />
        <svg className="w-full h-full -rotate-90 transform" viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={strokeWidth} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <span className="absolute text-sm font-black text-white">{animatedScore}%</span>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-center line-clamp-1 w-20">
        {label}
      </span>
    </div>
  )
}

export default function CivilizationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t, language } = useLanguage()
  const [selectedBuildOrder, setSelectedBuildOrder] = useState<BuildOrder | null>(null)

  const civ = getCivilizationById(id)
  const buildOrders = getBuildOrdersForCiv(id)
  const stats = getCivStats(id)

  if (!civ) {
    notFound()
  }

  const synergyPartners = civ.synergyWith
    .map((id) => CIVILIZATIONS.find((c) => c.id === id))
    .filter(Boolean)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Cinematic Header */}
        <section className="relative h-[45vh] flex items-center justify-center overflow-hidden border-b border-yellow-500/20 pt-20">
          <div className="absolute inset-0 z-0">
            <Image src="/images/Hero.png" alt={civ.name} fill className="object-cover opacity-40 grayscale-[0.5] brightness-110" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.15)_0%,#020202_100%)]" />
          </div>
          <div className="relative z-10 text-center px-6 max-w-4xl mt-10">
            <Badge variant="outline" className="mb-6 border-yellow-500/30 bg-yellow-500/5 text-yellow-500 px-6 py-2 uppercase tracking-[0.3em] text-[10px] font-black">Civilization Intelligence</Badge>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,1)] leading-tight mb-4">
              {civ.name.split(" ").map((word, i) => (
                <span key={i} className={cn(i === civ.name.split(" ").length - 1 && "gold-text-gradient pr-6 -mr-6")}>{word}{" "}</span>
              ))}
            </h1>
            <p className="text-yellow-100/40 font-medium uppercase tracking-[0.3em] text-sm md:text-lg italic max-w-2xl mx-auto">"{civ.specialty}"</p>
          </div>
        </section>

        <div className="container mx-auto px-6 py-12 max-w-7xl">
          {/* Back Button */}
          <Link href="/team-builder">
            <Button variant="ghost" className="mb-10 gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              {t("backToTeamBuilder")}
            </Button>
          </Link>

          {/* Stats Summary Bar */}
          {stats && (
            <div className="mb-12 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/[0.03] p-6 rounded-3xl border border-white/5 backdrop-blur-xl shadow-xl flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t("winRate")}</span>
                </div>
                <p className="text-4xl font-black text-emerald-400">{stats.winRate}%</p>
              </div>
              <div className="bg-white/[0.03] p-6 rounded-3xl border border-white/5 backdrop-blur-xl shadow-xl flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t("pickRate")}</span>
                </div>
                <p className="text-4xl font-black text-blue-400">{stats.pickRate}%</p>
              </div>
              <div className="bg-white/[0.03] p-6 rounded-3xl border border-white/5 backdrop-blur-xl shadow-xl flex flex-col items-center col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="h-4 w-4 text-yellow-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t("avgElo")}</span>
                </div>
                <p className="text-4xl font-black text-yellow-400">{stats.avgElo}</p>
              </div>
            </div>
          )}

        <Tabs defaultValue="overview" className="space-y-10">
          <TabsList className="bg-[#1a1a1c] border border-white/5 p-1.5 h-auto rounded-2xl shadow-xl w-full flex-wrap justify-start">
            <TabsTrigger value="overview" className="gap-2.5 rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold uppercase tracking-wide text-xs">
              <Shield className="h-4 w-4" />
              {t("general")}
            </TabsTrigger>
            <TabsTrigger value="build-orders" className="gap-2.5 rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold uppercase tracking-wide text-xs">
              <BookOpen className="h-4 w-4" />
              Build Orders
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-2.5 rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold uppercase tracking-wide text-xs">
              <BarChart3 className="h-4 w-4" />
              {t("statistics")}
            </TabsTrigger>
            <TabsTrigger value="synergies" className="gap-2.5 rounded-xl px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold uppercase tracking-wide text-xs">
              <Sparkles className="h-4 w-4" />
              {t("synergies")}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-10 animate-in fade-in duration-500">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Bonuses */}
              <Card className="border-white/5 bg-[#121214] rounded-3xl overflow-hidden relative group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-50" />
                <CardHeader className="pt-8 px-8">
                  <CardTitle className="flex items-center gap-3 text-2xl font-black">
                    <Zap className="h-6 w-6 text-primary" />
                    {t("civilizationBonuses")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8 space-y-4">
                  {civ.bonuses.map((bonus, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:bg-white/[0.04] transition-colors">
                      <Badge
                        variant="outline"
                        className={cn(
                          "mt-0.5 uppercase text-[9px] font-black tracking-widest",
                          bonus.type === "economy" ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/5" :
                          bonus.type === "military" ? "border-red-500/50 text-red-400 bg-red-500/5" :
                          bonus.type === "defense" ? "border-blue-500/50 text-blue-400 bg-blue-500/5" :
                          "border-yellow-500/50 text-yellow-400 bg-yellow-500/5"
                        )}
                      >
                        {bonus.type}
                      </Badge>
                      <span className="text-sm text-gray-300 leading-relaxed font-medium">{bonus.description}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="space-y-8">
                {/* Team Bonus */}
                <Card className="border-primary/20 bg-primary/5 rounded-3xl overflow-hidden relative">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-primary/30" />
                  <CardHeader className="pt-8 px-8 pb-4">
                    <CardTitle className="flex items-center gap-3 text-2xl font-black text-primary">
                      <Users className="h-6 w-6" />
                      {t("teamBonus")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <p className="text-xl font-bold text-white leading-snug">{civ.teamBonus}</p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-primary/70 font-bold uppercase tracking-widest">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {t("appliesToAllAllies")}
                    </div>
                  </CardContent>
                </Card>

                {/* Strengths & Weaknesses Grid */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <Card className="border-emerald-500/20 bg-emerald-500/5 rounded-3xl">
                    <CardHeader className="p-6">
                      <CardTitle className="flex items-center gap-2 text-emerald-400 text-lg font-black uppercase tracking-tight">
                        <Swords className="h-5 w-5" />
                        {t("strengths")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <ul className="space-y-3">
                        {civ.strengths.map((strength, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-300 font-medium leading-tight">
                            <ChevronRight className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-red-500/20 bg-red-500/5 rounded-3xl">
                    <CardHeader className="p-6">
                      <CardTitle className="flex items-center gap-2 text-red-400 text-lg font-black uppercase tracking-tight">
                        <AlertTriangle className="h-5 w-5" />
                        {t("weaknesses")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <ul className="space-y-3">
                        {civ.weaknesses.map((weakness, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-300 font-medium leading-tight">
                            <ChevronRight className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Build Orders Tab */}
          <TabsContent value="build-orders" className="space-y-10 animate-in fade-in duration-500">
            {selectedBuildOrder ? (
              <div className="space-y-8">
                <Button variant="ghost" onClick={() => setSelectedBuildOrder(null)} className="gap-2 text-muted-foreground hover:text-white">
                  <ArrowLeft className="h-4 w-4" />
                  {t("backToBuildOrders")}
                </Button>

                <Card className="border-white/5 bg-[#121214] rounded-3xl overflow-hidden">
                  <div className="bg-white/[0.02] border-b border-white/5 p-8">
                    <div className="flex flex-wrap items-start justify-between gap-6">
                      <div>
                        <h2 className="text-3xl font-black tracking-tight text-white mb-2">
                          {language === "es" ? selectedBuildOrder.nameEs : selectedBuildOrder.name}
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
                          {language === "es" ? selectedBuildOrder.descriptionEs : selectedBuildOrder.description}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <Badge className="bg-primary text-primary-foreground font-bold px-4 py-1.5">{selectedBuildOrder.type}</Badge>
                        <Badge className="bg-[#1a1a1c] border border-white/10 font-bold px-4 py-1.5">
                          {selectedBuildOrder.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-8 space-y-12">
                    {/* Dark Age Steps */}
                    <div>
                      <h3 className="mb-6 flex items-center gap-3 text-xl font-black uppercase tracking-wider text-gray-400">
                        <div className="h-4 w-4 rounded-full bg-gray-600 shadow-[0_0_10px_rgba(75,85,99,0.5)]" />
                        {t("darkAge")}
                      </h3>
                      <div className="grid gap-4">
                        {selectedBuildOrder.steps.darkAge.map((step, idx) => (
                          <div key={idx} className="flex items-center gap-6 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-500/10 text-xl font-black text-gray-400 border border-gray-500/20 group-hover:scale-110 transition-transform">
                              {step.villagerCount}
                            </div>
                            <div>
                              <p className="text-lg font-bold text-white">{step.task}</p>
                              {step.details && <p className="mt-1 text-sm text-muted-foreground italic">"{step.details}"</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Feudal Age Steps */}
                    {selectedBuildOrder.steps.feudalAge && (
                      <div>
                        <h3 className="mb-6 flex items-center gap-3 text-xl font-black uppercase tracking-wider text-emerald-500">
                          <div className="h-4 w-4 rounded-full bg-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                          {t("feudalAge")}
                        </h3>
                        <div className="grid gap-4">
                          {selectedBuildOrder.steps.feudalAge.map((step, idx) => (
                            <div key={idx} className="flex items-center gap-6 p-5 rounded-2xl bg-emerald-500/[0.02] border border-emerald-500/10 hover:bg-emerald-500/[0.04] transition-colors group">
                              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-xl font-black text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                                {step.villagerCount}
                              </div>
                              <div>
                                <p className="text-lg font-bold text-white">{step.task}</p>
                                {step.details && <p className="mt-1 text-sm text-muted-foreground italic">"{step.details}"</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tips Section */}
                    <div className="pt-8 border-t border-white/5">
                      <h3 className="mb-6 flex items-center gap-3 text-xl font-black uppercase tracking-wider text-yellow-500">
                        <Sparkles className="h-6 w-6" />
                        {t("tips")}
                      </h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {(language === "es" ? selectedBuildOrder.tipsEs : selectedBuildOrder.tips).map((tip, idx) => (
                          <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl bg-yellow-500/[0.03] border border-yellow-500/10">
                            <Star className="mt-1 h-5 w-5 shrink-0 text-yellow-500 fill-yellow-500/20" />
                            <span className="text-sm text-gray-300 font-medium leading-relaxed">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {buildOrders.length > 0 ? (
                  buildOrders.map((bo) => (
                    <Card
                      key={bo.id}
                      className="group cursor-pointer border-white/5 bg-[#121214] hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl rounded-3xl overflow-hidden"
                      onClick={() => setSelectedBuildOrder(bo)}
                    >
                      <CardHeader className="p-8">
                        <div className="flex items-start justify-between mb-4">
                          <Badge className="bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px]">{bo.type}</Badge>
                          <Badge variant="outline" className="border-white/10 text-muted-foreground">{bo.difficulty}</Badge>
                        </div>
                        <CardTitle className="text-2xl font-black text-white group-hover:text-primary transition-colors">{language === "es" ? bo.nameEs : bo.name}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground font-medium mt-2 line-clamp-2">
                          {language === "es" ? bo.descriptionEs : bo.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="px-8 pb-8 pt-0">
                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                          <div className="flex items-center gap-2 text-primary font-bold">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">{bo.popCount} POP</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs font-bold text-muted-foreground group-hover:text-white transition-colors">
                            VIEW ORDER <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center bg-[#121214] rounded-3xl border border-white/5 border-dashed">
                    <BookOpen className="mx-auto mb-6 h-16 w-16 text-muted-foreground/20" />
                    <p className="text-xl font-bold text-white/60">{t("noSpecificBuildOrders")}</p>
                    <p className="mt-2 text-muted-foreground">{t("tryGeneralBuildOrders")}</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-10 animate-in fade-in duration-500">
            {stats ? (
              <div className="grid gap-10 md:grid-cols-2">
                {/* Win Rate by Map - PREMIUM BARS */}
                <Card className="border-white/5 bg-[#121214] rounded-3xl overflow-hidden p-8">
                  <CardHeader className="p-0 mb-8">
                    <CardTitle className="flex items-center gap-3 text-2xl font-black">
                      <Map className="h-6 w-6 text-primary" />
                      {t("winRateByMap")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 space-y-8">
                    {Object.entries(stats.winRateByMap).map(([map, rate]) => (
                      <PremiumStatBar 
                        key={map} 
                        label={map.replace(/([A-Z])/g, " $1").trim()} 
                        value={rate} 
                      />
                    ))}
                  </CardContent>
                </Card>

                {/* Win Rate by ELO - PREMIUM BARS */}
                <Card className="border-white/5 bg-[#121214] rounded-3xl overflow-hidden p-8">
                  <CardHeader className="p-0 mb-8">
                    <CardTitle className="flex items-center gap-3 text-2xl font-black">
                      <BarChart3 className="h-6 w-6 text-yellow-500" />
                      {t("winRateByElo")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 space-y-8">
                    {Object.entries(stats.winRateByElo).map(([elo, rate]) => (
                      <PremiumStatBar 
                        key={elo} 
                        label={elo.replace("below", "< ").replace("above", "> ").replace("elo", "").replace("to", " - ")} 
                        value={rate} 
                      />
                    ))}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="py-20 text-center bg-[#121214] rounded-3xl border border-white/5">
                <TrendingUp className="mx-auto mb-6 h-16 w-16 text-muted-foreground/20" />
                <p className="text-xl font-bold text-white/60">{t("detailedStatsNotAvailable")}</p>
              </div>
            )}
          </TabsContent>

          {/* Synergies Tab - GAUGES INTEGRATION */}
          <TabsContent value="synergies" className="space-y-10 animate-in fade-in duration-500">
            <Card className="border-white/5 bg-[#121214] rounded-3xl overflow-hidden">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="flex items-center gap-3 text-2xl font-black text-primary">
                  <Sparkles className="h-6 w-6" />
                  {t("bestTeamPartners")}
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  {t("workBestWith")} {civ.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-4">
                {/* Visual Synergies Layout */}
                <div className="flex flex-wrap justify-center md:justify-start gap-10 py-6">
                  {synergyPartners.map((partner) => {
                    // Simulate a synergy score for visual impact
                    const simulatedScore = Math.floor(Math.random() * 30) + 70;
                    return (
                      <Link key={partner!.id} href={`/civilizations/${partner!.id}`} className="group">
                        <div className="flex flex-col items-center gap-4 transition-all hover:-translate-y-2">
                          <div className="relative">
                             <div className="h-24 w-24 rounded-2xl border-2 border-white/10 bg-[#1a1a1c] overflow-hidden p-2 group-hover:border-primary transition-colors shadow-xl">
                                <Image src={partner!.icon || "/placeholder.svg"} alt={partner!.name} fill className="object-contain p-2" unoptimized />
                             </div>
                             <div className="absolute -top-3 -right-3">
                                <MagicalSynergyGaugeSmall score={simulatedScore} label="" />
                             </div>
                          </div>
                          <div className="text-center">
                            <p className="font-black text-white group-hover:text-primary transition-colors">{partner!.name}</p>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{partner!.specialty.split(" ")[0]}</p>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Best Positions */}
            <Card className="border-white/5 bg-[#121214] rounded-3xl overflow-hidden">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="flex items-center gap-3 text-2xl font-black">
                  <Target className="h-6 w-6 text-primary" />
                  {t("bestPositionInTG")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-4">
                <div className="flex flex-wrap gap-4 mb-6">
                  {civ.bestPositions.map((pos) => (
                    <Badge
                      key={pos}
                      className={cn(
                        "px-6 py-2 text-sm font-black uppercase tracking-[0.2em] rounded-xl shadow-lg",
                        pos === "flank"
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                      )}
                    >
                      {pos === "flank" ? t("flank") : t("pocket")}
                    </Badge>
                  ))}
                </div>
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 border-l-4 border-l-primary">
                  <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                    {civ.bestPositions.includes("flank") ? t("flankDesc") : t("pocketDesc")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}