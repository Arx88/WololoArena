"use client"

import React, { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TournamentBracket } from "@/components/tournament/tournament-bracket"
import { TournamentParticipants } from "@/components/tournament/tournament-participants"
import { TournamentCasters } from "@/components/tournament/tournament-casters"
import { PrizeDisplay } from "@/components/tournament/prize-display"
import { HypeButton } from "@/components/tournament/hype-button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Trophy,
  ArrowLeft,
  Globe,
  Lock,
  Users,
  Settings,
  Play,
  Calendar,
  Loader2,
  AlertCircle,
  Swords,
  Pencil,
  Check,
  X,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Flame,
  Zap,
  Target,
  Shield,
  Activity
} from "lucide-react"
import type { Tournament, TournamentMatch, TournamentParticipant, TournamentCaster, Profile } from "@/lib/types/draft"
import { useToast } from "@/hooks/use-toast"
import { isDemoMode, getDemoUser } from "@/lib/demo/auth"
import {
  getDemoTournament,
  getDemoParticipants,
  getDemoProfiles,
  getDemoMatches,
  updateDemoTournament,
  setDemoMatches,
  getDemoHypeCount,
} from "@/lib/demo/demo-data"
import { useLanguage } from "@/lib/i18n/language-context"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface TournamentPageProps {
  params: Promise<{ id: string }>
}

function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}

function isDemoTournamentId(id: string): boolean {
  return id.startsWith("demo-tournament-") || id.startsWith("demo-")
}

export default function TournamentPage({ params }: TournamentPageProps) {
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;

  const router = useRouter()
  const supabase = createClient()
  const { toast } = useToast()
  const { t } = useLanguage()

  const [tournament, setTournament] = useState<Tournament | null>(null)
  const [participants, setParticipants] = useState<(TournamentParticipant & { profile?: Profile })[]>([])
  const [matches, setMatches] = useState<TournamentMatch[]>([])
  const [casters, setCasters] = useState<TournamentCaster[]>([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isStarting, setIsStarting] = useState(false)
  const [isDemo, setIsDemo] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isEditingName, setIsEditingName] = useState(false)
  const [editedName, setEditedName] = useState("")
  const [isSavingName, setIsSavingName] = useState(false)
  const [statusChangeDialog, setStatusChangeDialog] = useState<{
    open: boolean
    type: "complete" | "cancel" | null
  }>({ open: false, type: null })
  const [isChangingStatus, setIsChangingStatus] = useState(false)
  const [hypeCount, setHypeCount] = useState(0)

  const fetchTournamentData = useCallback(
    async (currentId: string) => {
      const demoMode = isDemoMode()
      const isDemoId = isDemoTournamentId(currentId)

      if (demoMode || isDemoId) {
        setIsDemo(true)
        const demoUser = getDemoUser()
        setUserId(demoUser?.id || null)
        const demoTournament = getDemoTournament(currentId)
        if (!demoTournament) { setError(t("tournamentNotFound")); setIsLoading(false); return; }
        setTournament(demoTournament)
        setIsAdmin(demoTournament.created_by === demoUser?.id)
        const demoParticipants = getDemoParticipants(currentId)
        const demoProfiles = getDemoProfiles()
        const profilesMap = new Map(demoProfiles.map((p) => [p.id, p]))
        setParticipants(demoParticipants.map((p) => ({ ...p, profile: profilesMap.get(p.user_id) || undefined })))
        setMatches(getDemoMatches(currentId))
        setCasters([])
        setHypeCount(getDemoHypeCount(currentId))
        setIsLoading(false)
        return
      }

      if (!isValidUUID(currentId)) { setError(t("tournamentNotFound")); setIsLoading(false); return; }

      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUserId(user?.id || null)
        const { data: tournamentData, error: tournamentError } = await supabase.from("tournaments").select("*").eq("id", currentId).single()
        if (tournamentError || !tournamentData) { setError(t("tournamentNotFound")); setIsLoading(false); return; }
        setTournament(tournamentData)
        if (user) {
          const { data: adminData } = await supabase.from("tournament_admins").select("*").eq("tournament_id", currentId).eq("user_id", user.id).single()
          setIsAdmin(!!adminData || tournamentData.created_by === user.id)
        }
        const { data: participantsData } = await supabase.from("tournament_participants").select("*").eq("tournament_id", currentId).order("seed", { ascending: true })
        if (participantsData && participantsData.length > 0) {
          const userIds = participantsData.map((p) => p.user_id).filter(Boolean)
          const { data: profilesData } = await supabase.from("profiles").select("*").in("id", userIds)
          const profilesMap = new Map(profilesData?.map((p) => [p.id, p]) || [])
          setParticipants(participantsData.map((p) => ({ ...p, profile: profilesMap.get(p.user_id) || undefined })))
        }
        const { data: matchesData } = await supabase.from("tournament_matches").select("*").eq("tournament_id", currentId).order("round", { ascending: true })
        if (matchesData) setMatches(matchesData)
        const { data: castersData } = await supabase.from("tournament_casters").select("*").eq("tournament_id", currentId)
        if (castersData) setCasters(castersData)
        const { count } = await supabase.from("tournament_hype").select("*", { count: "exact", head: true }).eq("tournament_id", currentId)
        setHypeCount(count || 0)
        setIsLoading(false)
      } catch (err) { setError(t("errorLoadingTournament")); setIsLoading(false); }
    },
    [supabase, t],
  )

  useEffect(() => { fetchTournamentData(id) }, [id, fetchTournamentData])

  const handleSaveName = async () => {
    if (!tournament || !editedName.trim()) return
    setIsSavingName(true)
    if (isDemo) {
      updateDemoTournament(tournament.id, { name: editedName.trim() })
      setTournament({ ...tournament, name: editedName.trim() }); setIsEditingName(false); setIsSavingName(false); return;
    }
    try {
      await supabase.from("tournaments").update({ name: editedName.trim() }).eq("id", tournament.id)
      setTournament({ ...tournament, name: editedName.trim() }); setIsEditingName(false);
    } finally { setIsSavingName(false); }
  }

  const handleChangeTournamentStatus = async (newStatus: "completed" | "cancelled") => {
    if (!tournament) return
    setIsChangingStatus(true)
    if (isDemo) {
      updateDemoTournament(tournament.id, { status: newStatus })
      setTournament({ ...tournament, status: newStatus }); setIsChangingStatus(false); setStatusChangeDialog({ open: false, type: null }); return;
    }
    try {
      const updateData: { status: string; end_date?: string } = { status: newStatus }
      if (newStatus === "completed") updateData.end_date = new Date().toISOString()
      await supabase.from("tournaments").update(updateData).eq("id", tournament.id)
      setTournament({ ...tournament, status: newStatus, end_date: updateData.end_date || tournament.end_date })
    } finally { setIsChangingStatus(false); setStatusChangeDialog({ open: false, type: null }); }
  }

  const handleDeleteTournament = async () => {
    if (!tournament) return
    setIsChangingStatus(true)
    if (isDemo) {
      toast({ title: "Demo Mode", description: "Tournament deletion is simulated." })
      router.push("/tournaments")
      return
    }
    try {
      const { error: delError } = await supabase.from("tournaments").delete().eq("id", tournament.id)
      if (delError) throw delError
      toast({ title: "Arena Collapsed", description: "The tournament has been permanently removed." })
      router.push("/tournaments")
    } catch (err) {
      toast({ title: "Error", description: "Insufficient clearance or network error.", variant: "destructive" })
    } finally {
      setIsChangingStatus(false)
    }
  }

  if (isLoading) return <div className="flex min-h-screen items-center justify-center bg-[#020202]"><Loader2 className="h-12 w-12 animate-spin text-yellow-500" /></div>

  if (error || !tournament) return (
    <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center p-6 text-center">
      <AlertCircle className="h-16 w-16 text-yellow-500 mb-6 opacity-20" />
      <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Event Protocol Failed</h2>
      <p className="text-white/40 uppercase font-bold tracking-widest mt-2">{error || "The requested arena is no longer active."}</p>
      <Button onClick={() => router.push("/tournaments")} className="mt-8 bg-yellow-600 hover:bg-yellow-500 text-black font-black uppercase tracking-widest px-10 h-14 rounded-xl shadow-xl">Return to Hub</Button>
    </div>
  )

  const confirmedCount = participants.filter((p) => p.status === "confirmed").length
  const isInProgress = tournament.status === "in_progress"
  const isRegistration = tournament.status === "registration"

  return (
    <div className="flex min-h-screen flex-col bg-[#020202] text-white">
      <Navbar />
      
      <main className="flex-1">
        {/* Cinematic Header - FIXED CENTERING */}
        <section className="relative h-[55vh] flex items-center justify-center overflow-hidden border-b border-yellow-500/20 pt-20">
          <div className="absolute inset-0 z-0">
            <Image src={tournament.banner_image || "/images/Hero.png"} alt="Tournament Header" fill className="object-cover opacity-40 grayscale-[0.5] brightness-110 transition-all duration-1000" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.15)_0%,#020202_100%)]" />
          </div>

          <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center text-center mt-10">
             <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" onClick={() => router.push("/tournaments")} className="h-10 w-10 rounded-full border border-white/10 bg-black/40 text-white/40 hover:text-yellow-500 hover:border-yellow-500/50">
                   <ArrowLeft className="h-5 w-5" />
                </Button>
                <Badge className={cn("px-4 py-1 uppercase tracking-[0.3em] font-black text-[10px]", isRegistration ? "bg-yellow-600 text-black" : isInProgress ? "bg-red-600 text-white animate-pulse" : "bg-white/10 text-white/40")}>
                   {tournament.status.replace("_", " ")} PHASE
                </Badge>
             </div>

             {isEditingName ? (
               <div className="flex items-center gap-4 max-w-2xl w-full">
                 <Input value={editedName} onChange={(e) => setEditedName(e.target.value)} className="h-16 text-4xl font-black bg-black/60 border-2 border-yellow-500 text-white text-center rounded-2xl uppercase italic tracking-tighter" autoFocus />
                 <Button size="icon" onClick={handleSaveName} disabled={isSavingName} className="h-16 w-16 bg-yellow-600 hover:bg-yellow-500 text-black shrink-0 rounded-2xl shadow-xl">{isSavingName ? <Loader2 className="h-6 w-6 animate-spin" /> : <Check className="h-8 w-8" />}</Button>
               </div>
             ) : (
               <div className="group relative">
                 <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white drop-shadow-2xl leading-tight mb-2">
                   {tournament.name.split(" ").map((word, i) => (
                     <span key={i} className={cn(i === tournament.name.split(" ").length - 1 && "gold-text-gradient pr-6 -mr-6")}>{word}{" "}</span>
                   ))}
                 </h1>
                 {isAdmin && <Button variant="ghost" size="icon" onClick={() => { setEditedName(tournament.name); setIsEditingName(true); }} className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all text-yellow-500"><Pencil className="h-6 w-6" /></Button>}
               </div>
             )}
             <p className="text-yellow-100/40 font-medium uppercase tracking-[0.4em] text-xs md:text-sm italic mt-4 max-w-2xl">{tournament.description || "The battle for supremacy begins here."}</p>
          </div>
        </section>

        {/* Tactical Info Bar */}
        <section className="bg-black/40 border-b border-white/5 backdrop-blur-3xl py-8 relative z-20 shadow-2xl">
           <div className="mx-auto max-w-7xl px-6 flex flex-wrap justify-center gap-12 lg:gap-20">
              <div className="flex items-center gap-4">
                 <div className="h-12 w-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/30 shadow-inner"><Trophy className="h-6 w-6 text-yellow-500" /></div>
                 <div><span className="block text-[10px] font-black text-white/30 uppercase tracking-widest">Grand Prize</span><span className="text-xl font-black text-white italic tracking-tighter">$10,000 USD</span></div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner"><Users className="h-6 w-6 text-white/40" /></div>
                 <div><span className="block text-[10px] font-black text-white/30 uppercase tracking-widest">Enrolled</span><span className="text-xl font-black text-white italic tracking-tighter">{confirmedCount} / {tournament.max_participants}</span></div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner"><Target className="h-6 w-6 text-white/40" /></div>
                 <div><span className="block text-[10px] font-black text-white/30 uppercase tracking-widest">Format</span><span className="text-xl font-black text-white italic tracking-tighter capitalize">{tournament.format.replace("_", " ")}</span></div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner"><Calendar className="h-6 w-6 text-white/40" /></div>
                 <div><span className="block text-[10px] font-black text-white/30 uppercase tracking-widest">Deployment</span><span className="text-xl font-black text-white italic tracking-tighter">{tournament.start_date ? new Date(tournament.start_date).toLocaleDateString() : "TBD"}</span></div>
              </div>
           </div>
        </section>

        {/* Content Tabs Area */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <Tabs defaultValue="bracket" className="space-y-12">
              <TabsList className="flex items-center justify-center bg-black/60 p-1 rounded-2xl border border-white/10 max-w-xl mx-auto backdrop-blur-xl">
                <TabsTrigger value="bracket" className="flex-1 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-yellow-600 data-[state=active]:text-black"><Swords className="h-4 w-4 mr-2" /> Brackets</TabsTrigger>
                <TabsTrigger value="participants" className="flex-1 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-yellow-600 data-[state=active]:text-black"><Users className="h-4 w-4 mr-2" /> Participants</TabsTrigger>
                <TabsTrigger value="casters" className="flex-1 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-yellow-600 data-[state=active]:text-black"><Activity className="h-4 w-4 mr-2" /> Intel</TabsTrigger>
              </TabsList>

              <TabsContent value="bracket" className="mt-0">
                <TournamentBracket matches={matches} participants={participants} format={tournament.format} isAdmin={isAdmin} tournamentId={tournament.id} onMatchUpdate={() => fetchTournamentData(id)} isDemo={isDemo} />
              </TabsContent>

              <TabsContent value="participants" className="mt-0">
                <TournamentParticipants participants={participants} maxParticipants={tournament.max_participants} isAdmin={isAdmin} tournamentId={tournament.id} tournamentName={tournament.name} tournamentStatus={tournament.status} onParticipantsChange={() => fetchTournamentData(id)} isDemo={isDemo} />
              </TabsContent>

              <TabsContent value="casters" className="mt-0">
                <TournamentCasters casters={casters} isAdmin={isAdmin} tournamentId={tournament.id} onCastersChange={() => fetchTournamentData(id)} isDemo={isDemo} />
              </TabsContent>
            </Tabs>

            {/* Admin Quick Control Panel */}
            {isAdmin && (
              <div className="mt-20 border-t border-white/10 pt-16 flex flex-col items-center">
                 <Badge className="mb-6 bg-yellow-600/10 text-yellow-500 border border-yellow-500/30 px-4 py-1 uppercase tracking-[0.3em] text-[10px] font-black">Authorized Personnel Only</Badge>
                 <div className="flex gap-6 w-full max-w-2xl">
                    {isRegistration && (
                      <Button onClick={handleStartTournament} disabled={isStarting || confirmedCount < 2} className="flex-1 h-20 bg-yellow-600 hover:bg-yellow-500 text-black font-black uppercase italic tracking-[0.2em] rounded-2xl shadow-[0_0_40px_rgba(234,179,8,0.2)] border-r-8 border-black/20">
                        {isStarting ? <Loader2 className="h-8 w-8 animate-spin" /> : <><Play className="h-6 w-6 mr-3" /> Initialize Brackets</>}
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className={cn("h-20 border-2 border-yellow-600 bg-black hover:bg-yellow-600 text-yellow-500 hover:text-black transition-all px-10 rounded-2xl font-black uppercase tracking-widest", !isRegistration && "flex-1")}>
                          <Settings className="h-6 w-6 mr-3" /> EVENT CONFIGURATION
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#0a0a0b] border-2 border-yellow-500/30 p-2 w-64 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                        {isInProgress && (
                          <DropdownMenuItem onClick={() => setStatusChangeDialog({ open: true, type: "complete" })} className="h-12 rounded-xl focus:bg-emerald-600 focus:text-black font-bold uppercase text-[10px] cursor-pointer text-emerald-500">
                            <CheckCircle2 className="h-4 w-4 mr-2" /> Mark as Finalized
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator className="bg-white/5" />
                        <DropdownMenuItem onClick={() => setStatusChangeDialog({ open: true, type: "cancel" })} className="h-12 rounded-xl focus:bg-red-600 focus:text-white font-bold uppercase text-[10px] cursor-pointer text-red-500">
                          <XCircle className="h-4 w-4 mr-2" /> Terminate Arena
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { if(confirm("PERMANENTLY DELETE THIS ARENA?")) handleDeleteTournament() }} className="h-12 rounded-xl focus:bg-red-900 focus:text-white font-black uppercase text-[10px] cursor-pointer text-red-700">
                          <X className="h-4 w-4 mr-2" /> DELETE TOURNAMENT
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                 </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Modern Status Dialog */}
      <AlertDialog open={statusChangeDialog.open} onOpenChange={(open) => setStatusChangeDialog({ open, type: open ? statusChangeDialog.type : null })}>
        <AlertDialogContent className="bg-[#0a0a0b] border-2 border-white/10 rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)]">
          <AlertDialogHeader>
            <AlertDialogTitle className={cn("text-2xl font-black italic uppercase tracking-tighter", statusChangeDialog.type === "cancel" ? "text-red-500" : "text-emerald-500")}>
              {statusChangeDialog.type === "complete" ? "Confirm Finalization" : "Emergency Termination"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/40 uppercase font-bold text-[10px] tracking-widest mt-2 leading-relaxed">
              This action will permanently alter the status of the current arena. Once confirmed, tournament data will be archived and brackets will be locked.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-8 gap-4">
            <AlertDialogCancel className="h-14 rounded-2xl border-white/10 bg-white/5 text-white uppercase font-black tracking-widest hover:bg-white/10">Abort</AlertDialogCancel>
            <AlertDialogAction className={cn("h-14 rounded-2xl font-black uppercase tracking-widest", statusChangeDialog.type === "cancel" ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700")} onClick={() => handleChangeTournamentStatus(statusChangeDialog.type === "complete" ? "completed" : "cancelled")}>
              {isChangingStatus ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Authorize Action"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  )
}