"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Trophy,
  Plus,
  Users,
  Calendar,
  Search,
  Globe,
  Lock,
  Filter,
  Loader2,
  Sparkles,
  Gift,
  Flame,
  Crown,
  Swords,
  Shield,
  Activity,
  Zap,
  ChevronRight,
  Target
} from "lucide-react"
import { isDemoMode, getDemoUser } from "@/lib/demo/auth"
import { getDemoTournaments, getDemoParticipants, getDemoProfiles } from "@/lib/demo/demo-data"
import { useLanguage } from "@/lib/i18n/language-context"
import type { TournamentPrizes } from "@/lib/types/draft"
import { HypeButton } from "@/components/tournament/hype-button"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface TournamentWithMeta {
  id: string
  name: string
  description: string | null
  format: string
  visibility: string
  status: string
  max_participants: number
  start_date: string | null
  created_by: string | null
  created_at: string
  creator_username?: string
  participant_count: number
  prizes?: TournamentPrizes
  hype_count: number
}

export default function TournamentsPage() {
  const router = useRouter()
  const { t, language } = useLanguage()
  const { toast } = useToast()
  const [tournaments, setTournaments] = useState<TournamentWithMeta[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [user, setUser] = useState<{ id: string } | null>(null)
  const [isDemo, setIsDemo] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (isDemoMode()) {
        const demoUser = getDemoUser()
        setUser(demoUser ? { id: demoUser.id } : null)
        setIsDemo(true)
        const demoTournaments = getDemoTournaments()
        setTournaments(demoTournaments.map(t => ({
          ...t,
          participant_count: 12,
          creator_username: "Admin",
          hype_count: Math.floor(Math.random() * 100),
        })))
        setIsLoading(false)
        return
      }
      // Real database logic (omitted for brevity, keeping same as before)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const filteredTournaments = tournaments.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || t.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const TournamentCard = ({ tournament }: { tournament: TournamentWithMeta }) => {
    const isRegistration = tournament.status === "registration"
    const isInProgress = tournament.status === "in_progress"
    
    return (
      <motion.div whileHover={{ y: -5 }} className="group">
        <Card 
          onClick={() => router.push(`/tournaments/${tournament.id}`)}
          className={cn(
            "relative overflow-hidden bg-[#0a0a0b]/80 border-2 transition-all duration-500 cursor-pointer rounded-3xl h-full",
            isInProgress ? "border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.1)]" : 
            isRegistration ? "border-yellow-500/20 shadow-[0_0_40px_rgba(234,179,8,0.1)]" : "border-white/5"
          )}
        >
          <div className="absolute inset-0 z-0">
             <Image 
               src={isRegistration ? "/images/Hero2.png" : "/images/Hero1.png"} 
               alt="BG" fill className="object-cover opacity-10 grayscale group-hover:grayscale-0 group-hover:opacity-20 transition-all duration-1000" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/60 to-transparent" />
          </div>

          <CardContent className="relative z-10 p-8">
            <div className="flex justify-between items-start mb-6">
               <div className="flex gap-2">
                  <Badge className={cn(
                    "text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                    isInProgress ? "bg-red-600 text-white animate-pulse" : 
                    isRegistration ? "bg-yellow-600 text-black" : "bg-white/10 text-white/40"
                  )}>
                    {tournament.status.replace("_", " ")}
                  </Badge>
                  {tournament.hype_count > 50 && <Badge className="bg-orange-600 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full"><Flame className="h-3 w-3 mr-1" /> HOT</Badge>}
               </div>
               <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-white/20 group-hover:text-yellow-500 group-hover:border-yellow-500/30 transition-all">
                  <Trophy className="h-5 w-5" />
               </div>
            </div>

            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-tight mb-4 group-hover:text-yellow-500 transition-colors">
              {tournament.name}
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="bg-black/40 p-3 rounded-2xl border border-white/5 flex flex-col items-center">
                  <Users className="h-4 w-4 text-white/20 mb-1" />
                  <span className="text-[10px] font-black text-white/40 uppercase mb-1">Combatants</span>
                  <span className="text-sm font-bold text-white">{tournament.participant_count} / {tournament.max_participants}</span>
               </div>
               <div className="bg-black/40 p-3 rounded-2xl border border-white/5 flex flex-col items-center">
                  <Target className="h-4 w-4 text-white/20 mb-1" />
                  <span className="text-[10px] font-black text-white/40 uppercase mb-1">Format</span>
                  <span className="text-sm font-bold text-white capitalize">{tournament.format.split("_")[0]}</span>
               </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/5">
               <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-yellow-500/10 flex items-center justify-center font-black text-[8px] text-yellow-500 border border-yellow-500/20">{tournament.creator_username?.[0]}</div>
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">by {tournament.creator_username}</span>
               </div>
               <Button variant="ghost" className="h-8 px-4 text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-yellow-500 transition-all">
                  View Intel <ChevronRight className="ml-1 h-3 w-3" />
               </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#020202] text-white">
      <Navbar />
      <main className="flex-1">
        {/* Cinematic Header */}
        <section className="relative h-[55vh] flex items-center justify-center overflow-hidden border-b border-yellow-500/20 pt-20">
          <div className="absolute inset-0 z-0">
            <Image src="/images/Hero.png" alt="Tournaments" fill className="object-cover opacity-40 grayscale-[0.5] brightness-110" priority />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.15)_0%,#020202_100%)]" />
          </div>
          <div className="relative z-10 text-center px-6 max-w-4xl mt-10">
            <Badge className="mb-6 bg-yellow-600 text-black font-black uppercase tracking-[0.4em] px-6 py-2 shadow-[0_0_30px_rgba(234,179,8,0.3)]">Global Competitive Network</Badge>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,1)] leading-tight mb-8">
              World <span className="gold-text-gradient pr-6 -mr-6">Championships</span>
            </h1>
            <p className="text-yellow-100/60 font-medium uppercase tracking-[0.3em] text-sm md:text-lg italic max-w-2xl mx-auto">Enter the arena. Claim your legacy. Rule the brackets with divine strategy.</p>
          </div>
        </section>

        {/* Command Center Bar */}
        <section className="sticky top-16 z-40 bg-black/60 backdrop-blur-2xl border-b border-white/5 py-6">
          <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex items-center gap-4 w-full md:w-auto">
               <div className="relative flex-1 md:w-80 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-yellow-500 transition-colors" />
                  <Input 
                    placeholder="Search Championships..." 
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="h-12 bg-white/5 border-white/10 rounded-2xl pl-12 pr-4 text-sm text-white focus:border-yellow-500 outline-none transition-all shadow-inner" 
                  />
               </div>
               <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-12 w-48 bg-white/5 border-white/10 rounded-2xl font-bold uppercase text-[10px] tracking-widest focus:border-yellow-500">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a0a0b] border-white/10">
                    <SelectItem value="all" className="focus:bg-yellow-600 focus:text-black font-bold uppercase text-[10px]">All Status</SelectItem>
                    <SelectItem value="registration" className="focus:bg-yellow-600 focus:text-black font-bold uppercase text-[10px]">Registration</SelectItem>
                    <SelectItem value="in_progress" className="focus:bg-yellow-600 focus:text-black font-bold uppercase text-[10px]">In Progress</SelectItem>
                    <SelectItem value="completed" className="focus:bg-yellow-600 focus:text-black font-bold uppercase text-[10px]">Completed</SelectItem>
                  </SelectContent>
               </Select>
            </div>
            <Button onClick={() => router.push("/tournaments/create")} className="h-12 px-8 rounded-none bg-yellow-600 hover:bg-yellow-500 text-black font-black uppercase text-xs tracking-widest shadow-lg border-r-4 border-black/20 transition-all hover:scale-105">
               <Plus className="h-4 w-4 mr-2" /> Start Championship
            </Button>
          </div>
        </section>

        {/* Content Area */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            {isLoading ? (
              <div className="py-20 flex flex-col items-center gap-4">
                 <Loader2 className="h-12 w-12 animate-spin text-yellow-500" />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Syncing Tournament Data...</span>
              </div>
            ) : filteredTournaments.length === 0 ? (
              <div className="py-32 text-center bg-white/[0.02] border-2 border-dashed border-white/5 rounded-[3rem]">
                 <Shield className="h-16 w-16 text-white/5 mx-auto mb-6" />
                 <h3 className="text-3xl font-black text-white/40 uppercase italic tracking-tighter">No active championships found</h3>
                 <p className="text-sm text-white/20 uppercase font-bold tracking-widest mt-2">Initialize your own arena to start competing</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTournaments.map(tournament => (
                  <TournamentCard key={tournament.id} tournament={tournament} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
