"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Trophy,
  ArrowLeft,
  Globe,
  Lock,
  Users,
  Calendar,
  Loader2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Target,
  Shield,
  Zap,
  Medal,
  Clock,
  Info
} from "lucide-react"
import type { TournamentFormat, Visibility, TournamentPrizes } from "@/lib/types/draft"
import { useToast } from "@/hooks/use-toast"
import { isDemoMode, getDemoUser, setDemoMode } from "@/lib/demo/auth"
import { createDemoTournament } from "@/lib/demo/demo-data"
import { useLanguage } from "@/lib/i18n/language-context"
import { PrizeConfig } from "@/components/tournament/prize-config"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function CreateTournamentPage() {
  const router = useRouter()
  const supabase = createClient()
  const { toast } = useToast()
  const { t } = useLanguage()

  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [isDemo, setIsDemo] = useState(false)

  // Form State
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [format, setFormat] = useState<TournamentFormat>("single_elimination")
  const [visibility, setVisibility] = useState<Visibility>("public")
  const [maxParticipants, setMaxParticipants] = useState(8)
  const [startDate, setStartDate] = useState("")
  const [isPremium, setIsPremium] = useState(false)
  const [bannerImage, setBannerImage] = useState("/images/Hero1.png")
  const [prizes, setPrizes] = useState<TournamentPrizes>({
    enabled: false,
    prize_count: 1,
    prizes: [],
  })

  const BANNER_OPTIONS = [
    { id: "/images/Hero1.png", label: "Battlefield Alpha" },
    { id: "/images/Hero2.png", label: "Siege of Kings" },
    { id: "/images/Hero3.png", label: "Ancient Ruins" },
  ]

  useEffect(() => {
    const checkAuth = async () => {
      if (isDemoMode()) {
        const demoUser = getDemoUser()
        if (demoUser) { setUserId(demoUser.id); setIsDemo(true); setIsCheckingAuth(false); return; }
      }
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) { setUserId(user.id); } 
        else { setDemoMode(true); const demoUser = getDemoUser(); if (demoUser) { setUserId(demoUser.id); setIsDemo(true); } }
      } catch (err) { setDemoMode(true); } 
      finally { setIsCheckingAuth(false); }
    }
    checkAuth()
  }, [supabase])

  const nextStep = useCallback(() => setStep(s => Math.min(s + 1, 4)), [])
  const prevStep = useCallback(() => setStep(s => Math.max(s - 1, 1)), [])

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 4) { nextStep(); return; }
    
    setIsLoading(true)
    setError(null)

    if (!name.trim()) { setError(t("tournamentNameRequired")); setIsLoading(false); return; }

    if (isDemo || isDemoMode()) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      try {
        const newTournament = createDemoTournament({
          name: name.trim(), description: description.trim() || undefined, format, visibility,
          max_participants: maxParticipants, created_by: userId || "demo-user-001",
          start_date: startDate ? new Date(startDate).toISOString() : undefined,
          prizes: prizes.enabled ? prizes : undefined,
          banner_image: isPremium ? bannerImage : undefined,
          settings: { ban_time: 30, pick_time: 45, civ_bans: 3, civ_picks: 1, enable_civ_bans: true, enable_civ_picks: true, enable_game_mode_roll: true },
        })
        toast({ title: t("tournamentCreated"), description: t("tournamentCreatedDesc") })
        router.push(`/tournaments/${newTournament.id}`)
      } catch (err) { setError(t("errorCreatingTournament")); } 
      finally { setIsLoading(false); }
      return
    }

    try {
      const { data: tournament, error: createError } = await supabase.from("tournaments").insert({
        name: name.trim(), description: description.trim() || null, format, visibility, status: "registration",
        max_participants: maxParticipants, created_by: userId, start_date: startDate ? new Date(startDate).toISOString() : null,
        banner_image: isPremium ? bannerImage : null,
        settings: { ban_time: 30, pick_time: 45, civ_bans: 3, civ_picks: 1, enable_civ_bans: true, enable_civ_picks: true, enable_game_mode_roll: true, prizes: prizes.enabled ? prizes : null },
      }).select().single()
      if (createError) throw createError
      await supabase.from("tournament_admins").insert({ tournament_id: tournament.id, user_id: userId, role: "owner" })
      toast({ title: t("tournamentCreated"), description: t("tournamentCreatedDesc") })
      router.push(`/tournaments/${tournament.id}`)
    } catch (err: any) { setError(err?.message || t("errorCreatingTournament")); } 
    finally { setIsLoading(false); }
  }

  const formatOptions = [
    { value: "single_elimination", label: t("singleElimination"), icon: <Trophy className="h-5 w-5" /> },
    { value: "double_elimination", label: t("doubleElimination"), icon: <Zap className="h-5 w-5" /> },
    { value: "round_robin", icon: <Clock className="h-5 w-5" />, label: t("roundRobin") },
    { value: "swiss", icon: <Globe className="h-5 w-5" />, label: t("swissSystem") },
  ]

  if (isCheckingAuth) return <div className="flex min-h-screen items-center justify-center bg-[#020202]"><Loader2 className="h-12 w-12 animate-spin text-yellow-500" /></div>

  return (
    <div className="h-screen w-full bg-[#020202] text-white overflow-hidden flex flex-col relative">
      <Navbar />
      <main className="flex-1 relative z-10 w-full flex items-center justify-center px-6 pt-32 pb-10">
        <div className="w-full max-w-3xl">
          <Card className="border-white/10 bg-[#0a0a0b]/80 backdrop-blur-xl shadow-2xl overflow-hidden rounded-3xl">
            <div className="h-1.5 w-full bg-white/5 flex">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`h-full flex-1 transition-all duration-500 ${step >= i ? "bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]" : "bg-transparent"}`} />
              ))}
            </div>

            <CardHeader className="p-8 pb-4">
              <div className="flex justify-between items-center mb-4">
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-yellow-500/60">Phase 0{step} / 04</span>
                 <Badge variant="outline" className="border-white/10 text-[10px] uppercase font-bold text-white/40 tracking-widest px-3">
                   {step === 1 ? "Protocol" : step === 2 ? "Logistics" : step === 3 ? "Rewards" : "Deployment"}
                 </Badge>
              </div>
              <CardTitle className="text-2xl text-white font-black italic uppercase tracking-tight flex items-center gap-3 leading-none">
                {step === 1 && <Shield className="h-6 w-6 text-yellow-500" />}
                {step === 2 && <Zap className="h-6 w-6 text-yellow-500" />}
                {step === 3 && <Medal className="h-6 w-6 text-yellow-500" />}
                {step === 4 && <Globe className="h-6 w-6 text-yellow-500" />}
                <span className="mt-1">{step === 1 ? "Tournament Identity" : step === 2 ? "Format & Capacity" : step === 3 ? "Prize Pool" : "Launch Sequence"}</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="px-8 pb-10 pt-6 min-h-[450px] flex flex-col">
              <form onSubmit={handleFinalSubmit} className="flex-1 flex flex-col">
                <div className="flex-1 space-y-8">
                  
                  {step === 1 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Event Designation</Label>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. King of the Desert VI"
                          className="h-14 bg-black/60 border-2 border-white/10 rounded-2xl px-6 text-base font-bold text-white focus:border-yellow-500 outline-none transition-all shadow-inner"
                          required
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Briefing (Description)</Label>
                        <Textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Describe the tournament rules and goals..."
                          className="bg-black/60 border-2 border-white/10 rounded-2xl p-6 text-sm text-white/80 focus:border-yellow-500 min-h-[150px] resize-none transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Combat Format</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {formatOptions.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => setFormat(opt.value as any)}
                              className={cn(
                                "flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left",
                                format === opt.value ? "border-yellow-500 bg-yellow-500/5 shadow-[0_0_20px_rgba(234,179,8,0.1)]" : "border-white/5 bg-black/40 hover:border-white/10"
                              )}
                            >
                              <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center border", format === opt.value ? "bg-yellow-500 text-black border-yellow-400" : "bg-white/5 text-white/20 border-white/10")}>
                                {opt.icon}
                              </div>
                              <span className={cn("font-black uppercase italic tracking-tight", format === opt.value ? "text-white" : "text-white/40")}>{opt.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Max Combatants</Label>
                        <Select value={maxParticipants.toString()} onValueChange={v => setMaxParticipants(parseInt(v))}>
                          <SelectTrigger className="h-14 bg-black/60 border-2 border-white/10 rounded-2xl px-6 text-base font-bold text-white focus:border-yellow-500 transition-all">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0a0a0b] border-white/10">
                            {[4, 8, 16, 32, 64].map(n => <SelectItem key={n} value={n.toString()} className="h-12 focus:bg-yellow-600 focus:text-black font-bold">{n} Players</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                       <PrizeConfig prizes={prizes} onChange={setPrizes} />
                       <div className="p-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 flex items-center gap-4">
                          <Info className="h-6 w-6 text-yellow-500 shrink-0" />
                          <p className="text-xs text-yellow-200/60 leading-relaxed font-medium italic">
                            Prizes will be displayed on the tournament page to attract high-tier competitors. Ensure clarity in currency and distribution.
                          </p>
                       </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Deployment Date</Label>
                        <div className="relative group">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20 group-focus-within:text-yellow-500" />
                          <Input
                            type="datetime-local"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="h-14 bg-black/60 border-2 border-white/10 rounded-2xl pl-12 pr-6 text-base font-bold text-white focus:border-yellow-500 transition-all shadow-inner [color-scheme:dark]"
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Visibility Level</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <button type="button" onClick={() => setVisibility("public")} className={cn("group flex flex-col gap-1 p-6 rounded-2xl border-2 transition-all text-left", visibility === 'public' ? "border-yellow-500 bg-yellow-500/5 shadow-[0_0_20px_rgba(234,179,8,0.1)]" : "border-white/5 bg-black/40")}>
                            <div className="flex items-center gap-2 mb-1"><Globe className={cn("h-4 w-4", visibility === 'public' ? "text-yellow-500" : "text-white/20")} /><span className="text-sm font-black uppercase italic text-white">Public</span></div>
                            <span className="text-[10px] text-white/30 uppercase font-bold">Visible to everyone</span>
                          </button>
                          <button type="button" onClick={() => setVisibility("private")} className={cn("group flex flex-col gap-1 p-6 rounded-2xl border-2 transition-all text-left", visibility === 'private' ? "border-yellow-500 bg-yellow-500/5 shadow-[0_0_20px_rgba(234,179,8,0.1)]" : "border-white/5 bg-black/40")}>
                            <div className="flex items-center gap-2 mb-1"><Lock className={cn("h-4 w-4", visibility === 'private' ? "text-yellow-500" : "text-white/20")} /><span className="text-sm font-black uppercase italic text-white">Private</span></div>
                            <span className="text-[10px] text-white/30 uppercase font-bold">Access via invitation</span>
                          </button>
                        </div>
                      </div>

                      {/* Premium Circuit Option for Admins */}
                      <div className="p-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-black text-white uppercase italic tracking-tight">Premium Circuit Status</p>
                            <p className="text-[10px] text-yellow-500/60 uppercase font-bold">Unlock custom banners and global promotion</p>
                          </div>
                          <Switch checked={isPremium} onCheckedChange={setIsPremium} className="data-[state=checked]:bg-yellow-600" />
                        </div>
                        
                        {isPremium && (
                          <div className="space-y-4 pt-4 border-t border-yellow-500/10 animate-in slide-in-from-top-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Visual Identity (Banner)</Label>
                            <div className="grid grid-cols-3 gap-3">
                              {BANNER_OPTIONS.map(opt => (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() => setBannerImage(opt.id)}
                                  className={cn(
                                    "relative aspect-video rounded-xl overflow-hidden border-2 transition-all",
                                    bannerImage === opt.id ? "border-yellow-500 scale-105 shadow-lg" : "border-white/10 opacity-40 hover:opacity-100"
                                  )}
                                >
                                  <Image src={opt.id} alt={opt.label} fill className="object-cover" />
                                  {bannerImage === opt.id && <div className="absolute inset-0 bg-yellow-500/20 flex items-center justify-center"><CheckCircle2 className="h-6 w-6 text-yellow-500" /></div>}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-12 mt-auto flex gap-4">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep} className="flex-1 border-white/10 text-white hover:bg-white/5 h-16 rounded-2xl uppercase font-black tracking-widest">
                      <ChevronLeft className="mr-2 h-5 w-5" /> Back
                    </Button>
                  )}
                  <Button 
                    type={step === 4 ? "submit" : "button"} 
                    disabled={isLoading}
                    onClick={(e) => {
                      if (step < 4) {
                        e.preventDefault();
                        nextStep();
                      }
                    }}
                    className="flex-[2] bg-yellow-600 hover:bg-yellow-500 text-black font-black italic uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(234,179,8,0.3)] h-16 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>INITIALIZING...</span>
                      </div>
                    ) : (
                      <>
                        {step === 4 ? "PUBLISH TO ARENA" : "NEXT PHASE"}
                        {step < 4 && <ChevronRight className="ml-2 h-5 w-5" />}
                      </>
                    )}
                  </Button>
                </div>
                {error && <p className="text-[10px] font-black text-red-500 text-center mt-4 uppercase tracking-[0.3em] animate-pulse">{error}</p>}
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
