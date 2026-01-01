"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import {
  Flame,
  Users,
  Trophy,
  Radio,
  Plus,
  ArrowRight,
  ShieldCheck,
  Signal,
  Activity,
  ChevronRight,
  Zap,
  Globe,
  Star
} from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { isDemoMode } from "@/lib/demo/auth"
import { getDemoTournaments } from "@/lib/demo/demo-data"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import Image from "next/image"
import type { TournamentPrizes, Currency } from "@/lib/types/draft"

interface HypedTournament {
  id: string
  name: string
  description?: string
  format: string
  status: string
  max_participants: number
  start_date?: string
  hype_count: number
  participant_count: number
  prizes?: TournamentPrizes
  visibility?: string
}

const CURRENCIES: Record<Currency, string> = {
  USD: "$", EUR: "€", GBP: "£", ARS: "$", BRL: "R$", MXN: "$", CLP: "$", COP: "$", PEN: "S/"
}

export function TournamentsHubSection() {
  const router = useRouter()
  const { t, language } = useLanguage()
  const { toast } = useToast()
  const [tournaments, setTournaments] = useState<HypedTournament[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadTournaments = async () => {
      if (isDemoMode()) {
        setTournaments(getDemoTournaments().slice(0, 4).map(t => ({
          ...t, hype_count: Math.floor(Math.random() * 100) + 50, participant_count: 12
        })))
        setIsLoading(false)
        return
      }

      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("tournaments")
          .select("*, tournament_hype(count), tournament_participants(count)")
          .eq("visibility", "public")
          .order("created_at", { ascending: false })
          .limit(4)

        if (error) throw error

        if (data) {
          const mappedTournaments = data.map((t: any) => ({
            ...t,
            hype_count: t.tournament_hype?.[0]?.count || 0,
            participant_count: t.tournament_participants?.[0]?.count || 0,
            prizes: t.settings?.prizes,
          }))
          setTournaments(mappedTournaments)
        }
      } catch (error) {
        console.error("Error loading tournaments:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTournaments()
  }, [])

  const handleTournamentClick = (id: string) => {
    if (id.startsWith("demo-")) {
      toast({ title: t("demoTournamentTitle"), description: t("demoTournamentDesc") })
    }
    router.push(`/tournaments/${id}`)
  }

  const featured = tournaments[0]
  const list = tournaments.slice(1)

  if (isLoading) return <div className="py-24 flex justify-center"><Activity className="animate-spin text-yellow-500" /></div>

  return (
    <section className="py-32 bg-[#020202] relative overflow-hidden border-t border-white/5">
      {/* Background Watermark */}
      <div className="absolute top-0 right-0 p-10 opacity-[0.03] text-[12vw] font-black italic select-none pointer-events-none tracking-tighter">
        CHAMPIONS_ARENA
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Modern Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20 border-b border-white/10 pb-12">
           <div className="flex flex-col items-start max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-yellow-500" />
                <span className="text-[10px] font-black text-yellow-500 tracking-[0.5em] uppercase">Competitive Hub</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic leading-[0.8] mb-6 overflow-visible">
                GLOBAL <span className="gold-text-gradient block mt-2">CHAMPIONSHIPS</span>
              </h2>
              <p className="text-xl text-white/40 font-light italic leading-relaxed">
                The ultimate proving ground. Join official circuits, manage brackets, and claim glory in the world's most prestigious Age of Empires II events.
              </p>
           </div>
           <div className="flex gap-16 text-right pb-2">
              <div className="hidden md:block">
                 <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-2">Live Intel</p>
                 <div className="flex items-center gap-3 text-red-500 font-black italic uppercase text-lg">
                    <div className="relative flex h-3 w-3">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                    </div>
                    Active Broadcasts
                 </div>
              </div>
              <div>
                 <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-2">Registry</p>
                 <p className="text-white font-black italic uppercase text-lg leading-none">{tournaments.length} ACTIVE EVENTS</p>
              </div>
           </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          {/* Main Featured Tournament - The "Invitation" style */}
          <div className="lg:col-span-8 relative group" onClick={() => handleTournamentClick(featured?.id)}>
             <motion.div 
               whileHover={{ scale: 1.01 }}
               className="relative bg-[#0a0a0b] border-2 border-yellow-500/20 rounded-3xl overflow-hidden cursor-pointer h-full shadow-[0_0_50px_rgba(0,0,0,0.5)] group-hover:border-yellow-500 transition-all duration-700"
             >
                <div className="absolute inset-0 z-0">
                   <Image src="/images/Hero2.png" alt="Tournament" fill className="object-cover opacity-40 grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-1000" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>
                
                <CardContent className="relative z-10 p-8 sm:p-12 h-full flex flex-col justify-between min-h-[500px]">
                   <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-2">
                         <Badge className="bg-yellow-600 text-black font-black text-[10px] rounded-lg px-4 py-1.5 italic tracking-widest shadow-lg">PREMIUM CIRCUIT</Badge>
                         <div className="flex items-center gap-2 mt-2">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                         </div>
                      </div>
                      <div className="text-right bg-black/60 backdrop-blur-md p-5 rounded-2xl border border-yellow-500/20 shadow-2xl">
                         <p className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-1 leading-none">Guaranteed Prize</p>
                         <p className="text-4xl font-black text-white italic tracking-tighter">$10,000 USD</p>
                      </div>
                   </div>

                   <div className="max-w-3xl">
                      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
                        <h3 className="text-5xl md:text-8xl font-black text-white uppercase italic leading-[0.8] mb-8 tracking-tighter group-hover:translate-x-2 transition-transform duration-500">
                          {featured?.name || "Cargando..." }
                        </h3>
                      </motion.div>
                      
                      <div className="flex flex-wrap gap-10 border-t border-white/10 pt-10 mt-4">
                         <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/30">
                               <Users className="h-6 w-6 text-yellow-500" />
                            </div>
                            <div className="flex flex-col">
                               <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Combatants</span>
                               <span className="text-base font-bold text-white uppercase tracking-wider">{featured?.participant_count} / {featured?.max_participants}</span>
                            </div>
                         </div>
                         <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
                               <ShieldCheck className="h-6 w-6 text-emerald-500" />
                            </div>
                            <div className="flex flex-col">
                               <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Security</span>
                               <span className="text-base font-bold text-white uppercase tracking-wider italic">Verified Anticheat</span>
                            </div>
                         </div>
                         <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/30">
                               <Activity className="h-6 w-6 text-red-500" />
                            </div>
                            <div className="flex flex-col">
                               <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Status</span>
                               <span className="text-base font-bold text-white uppercase tracking-wider animate-pulse text-red-400">Battle in Progress</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </CardContent>
             </motion.div>
          </div>

          {/* Right Sidebar - Secondary Tournaments & Create */}
          <div className="lg:col-span-4 flex flex-col gap-6">
             {/* Secondary Tournament Cards */}
             {list.map((t, i) => (
               <motion.div 
                 key={t.id} 
                 whileHover={{ x: 10 }}
                 className="group cursor-pointer" 
                 onClick={() => handleTournamentClick(t.id)}
               >
                  <Card className="bg-[#0a0a0b] border-2 border-white/5 rounded-3xl p-6 group-hover:border-yellow-500/40 transition-all duration-500 shadow-xl">
                     <div className="flex justify-between items-start mb-6">
                        <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-yellow-500/10 group-hover:border-yellow-500/30 transition-all">
                           <Trophy className="h-5 w-5 text-white/20 group-hover:text-yellow-500" />
                        </div>
                        <Badge variant="outline" className="text-[8px] font-black border-white/10 text-white/30 group-hover:text-yellow-500/60 uppercase tracking-widest">
                          ID: {t.id.substring(0,6).toUpperCase()}
                        </Badge>
                     </div>
                     <h4 className="text-xl font-black text-white uppercase italic mb-6 leading-tight group-hover:text-yellow-500 transition-colors">{t.name}</h4>
                     
                     <div className="flex items-center justify-between border-t border-white/5 pt-4">
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/40 italic">
                           <div className="flex items-center gap-1.5"><Flame className="h-3.5 w-3.5 text-yellow-500" /> {t.hype_count}</div>
                           <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-white/20" /> {t.participant_count}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-white/10 group-hover:text-yellow-500 transition-all" />
                     </div>
                  </Card>
               </motion.div>
             ))}

             {/* Create Your Own Block */}
             <motion.div 
               whileHover={{ scale: 1.02 }}
               className="flex-1 min-h-[180px] rounded-3xl border-2 border-dashed border-white/10 p-8 flex flex-col items-center justify-center text-center cursor-pointer group hover:border-yellow-500/40 hover:bg-yellow-500/[0.02] transition-all duration-500" 
               onClick={() => router.push("/tournaments/create")}
             >
                <div className="h-14 w-14 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-yellow-500 group-hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all mb-4">
                   <Plus className="h-7 w-7 text-white/20 group-hover:text-black transition-all" />
                </div>
                <h5 className="text-sm font-black text-white/40 group-hover:text-white uppercase tracking-[0.2em]">Launch Tournament</h5>
                <p className="text-[10px] text-white/20 uppercase font-bold mt-1 group-hover:text-yellow-500/60">Organize your own arena</p>
             </motion.div>
          </div>
        </div>

        {/* Tactical Footer CTA */}
        <div className="mt-24 flex flex-col md:flex-row justify-between items-center gap-12 border-t border-white/5 pt-16">
           <div className="max-w-md text-center md:text-left">
              <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                 <Globe className="h-4 w-4 text-yellow-500" />
                 <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Global Synchronization Active</span>
              </div>
              <p className="text-sm text-white/30 font-light italic leading-relaxed">
                Connect your account to the official competitive network. Access real-time results, manage your roster, and climb the global leaderboard.
              </p>
           </div>
           <div className="flex gap-6">
              <Button onClick={() => router.push("/tournaments")} className="h-16 px-12 rounded-none bg-white text-black font-black uppercase text-xs tracking-[0.2em] hover:bg-yellow-500 transition-all border-r-8 border-black/20 hover:scale-105 shadow-xl">
                 Explorar Torneos
              </Button>
              <Button variant="outline" onClick={() => router.push("/tournaments/create")} className="h-16 px-12 rounded-none border-2 border-white/10 text-white font-black uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-all hover:border-white">
                 Organizar Evento
              </Button>
           </div>
        </div>
      </div>
    </section>
  )
}
