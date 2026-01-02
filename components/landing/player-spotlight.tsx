"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Trophy, Globe, Activity, ChevronRight, X, Loader2, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/i18n/language-context"
import Image from "next/image"

export function PlayerSpotlight() {
  const { t } = useLanguage()
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(false)
  const [selectedPlayer, setSelectedPlayer] = React.useState<any | null>(null)

  // Debounce search
  React.useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/aoe2/search?name=${encodeURIComponent(query)}`)
        if (res.ok) {
          const data = await res.json()
          setResults(data)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [query])

  const handleSelect = (player: any) => {
    setSelectedPlayer(player)
    setOpen(false)
  }

  return (
    <section className="relative z-20 px-4 -mt-12 mb-24">
      <div className="max-w-4xl mx-auto">
        {/* Main Search Container - Glassmorphism */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={cn(
            "relative rounded-2xl overflow-hidden transition-all duration-500",
            open ? "shadow-[0_0_50px_rgba(234,179,8,0.3)] ring-2 ring-yellow-500/50" : "shadow-2xl ring-1 ring-white/10 hover:ring-white/20"
          )}
        >
          <div className="absolute inset-0 bg-[#0a0a0b]/90 backdrop-blur-xl" />
          
          <div className="relative">
            <Command shouldFilter={false} className="bg-transparent border-none">
              <div className="flex items-center px-4 border-b border-white/5">
                <Search className={cn("h-6 w-6 transition-colors", open ? "text-yellow-500" : "text-white/40")} />
                <CommandInput 
                  placeholder="Search Champion (e.g. TheViper, Hera)..." 
                  value={query}
                  onValueChange={setQuery}
                  onFocus={() => setOpen(true)}
                  onBlur={() => setTimeout(() => setOpen(false), 200)}
                  className="h-16 text-lg md:text-xl font-medium text-white placeholder:text-white/20 border-none focus:ring-0 bg-transparent"
                />
                {loading && <Loader2 className="h-5 w-5 animate-spin text-yellow-500" />}
              </div>

              <AnimatePresence>
                {open && results.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/5 bg-black/50"
                  >
                    <CommandList className="max-h-[400px] overflow-y-auto custom-scrollbar p-2">
                      <CommandEmpty className="py-6 text-center text-white/40 text-sm">No warriors found.</CommandEmpty>
                      <CommandGroup heading="Global Database">
                        {results.map((player) => (
                          <CommandItem 
                            key={player.profileId} 
                            value={player.name}
                            onSelect={() => handleSelect(player)}
                            className="cursor-pointer rounded-xl p-3 aria-selected:bg-yellow-500/20 aria-selected:text-white transition-colors mb-1"
                          >
                            <div className="flex items-center gap-4 w-full">
                               <div className="h-10 w-10 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center shrink-0 text-white/40 font-bold text-xs">
                                  {player.rank > 0 ? `#${player.rank}` : "UNR"}
                               </div>
                               <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                     <span className="font-bold text-white text-base truncate">{player.name}</span>
                                     {player.country && <span className="text-[10px] text-white/40 uppercase tracking-wider">{player.country}</span>}
                                  </div>
                                  <div className="flex items-center gap-3 text-xs text-white/40 font-mono mt-0.5">
                                     <span className="text-yellow-500/80">ELO: {player.rating}</span>
                                     <span>•</span>
                                     <span>Games: {player.games}</span>
                                  </div>
                               </div>
                               <ChevronRight className="h-4 w-4 text-white/20" />
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </motion.div>
                )}
              </AnimatePresence>
            </Command>
          </div>
        </motion.div>

        {/* Selected Player Card - Holographic Display */}
        <AnimatePresence>
          {selectedPlayer && (
            <motion.div
               initial={{ opacity: 0, y: 20, scale: 0.95 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, y: 10, scale: 0.95 }}
               className="mt-6 relative"
            >
               <div className="relative bg-[#121214] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                  {/* Decorator */}
                  <div className="absolute top-0 right-0 p-20 bg-yellow-500/5 blur-[100px] rounded-full" />
                  <div className="absolute -left-10 bottom-0 p-20 bg-blue-500/5 blur-[100px] rounded-full" />
                  
                  <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-8 p-8 md:p-10">
                     <div className="space-y-6">
                        <div className="flex items-start justify-between">
                           <div className="space-y-2">
                              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 uppercase tracking-widest text-[10px] px-3">
                                 Verified Profile
                              </Badge>
                              <h3 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter">
                                 {selectedPlayer.name}
                              </h3>
                              <div className="flex items-center gap-2 text-white/40 text-sm font-mono">
                                 <Globe className="h-4 w-4" />
                                 <span>{selectedPlayer.country || "Unknown Region"}</span>
                                 <span className="mx-2">|</span>
                                 <span>ID: {selectedPlayer.profileId}</span>
                              </div>
                           </div>
                           <button onClick={() => setSelectedPlayer(null)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                              <X className="h-6 w-6 text-white/40 hover:text-white" />
                           </button>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                           <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                              <p className="text-[10px] text-white/30 uppercase font-black tracking-widest mb-1">Rank</p>
                              <p className="text-2xl font-black text-white italic">#{selectedPlayer.rank || "N/A"}</p>
                           </div>
                           <div className="p-4 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
                              <div className="absolute inset-0 bg-yellow-500/5" />
                              <p className="text-[10px] text-yellow-500/60 uppercase font-black tracking-widest mb-1">Rating</p>
                              <p className="text-2xl font-black text-yellow-500 italic">{selectedPlayer.rating}</p>
                           </div>
                           <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                              <p className="text-[10px] text-white/30 uppercase font-black tracking-widest mb-1">Win Rate</p>
                              <p className="text-2xl font-black text-white italic">
                                 {selectedPlayer.games > 0 ? Math.round((selectedPlayer.wins / selectedPlayer.games) * 100) : 0}%
                              </p>
                           </div>
                        </div>
                        
                        <div className="pt-6 border-t border-white/5 flex gap-6">
                           <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                 <Shield className="h-5 w-5 text-emerald-500" />
                              </div>
                              <div>
                                 <p className="text-[10px] uppercase font-bold text-white/40">Wins</p>
                                 <p className="text-lg font-bold text-white">{selectedPlayer.wins}</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                                 <Activity className="h-5 w-5 text-red-500" />
                              </div>
                              <div>
                                 <p className="text-[10px] uppercase font-bold text-white/40">Losses</p>
                                 <p className="text-lg font-bold text-white">{selectedPlayer.losses}</p>
                              </div>
                           </div>
                        </div>
                     </div>
                     
                     <div className="hidden md:flex flex-col justify-center items-center w-48 border-l border-white/5 pl-8">
                        <div className="relative h-32 w-32 mb-4">
                           <div className="absolute inset-0 rounded-full border-4 border-white/5 border-t-yellow-500 animate-spin-slow" />
                           <div className="absolute inset-4 rounded-full bg-white/5 flex items-center justify-center overflow-hidden">
                              <Trophy className="h-12 w-12 text-yellow-500" />
                           </div>
                        </div>
                        <p className="text-center text-xs text-white/30 italic">Live Data from<br/>Official Ladder</p>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
