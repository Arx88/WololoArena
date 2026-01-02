"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Trophy, Globe, Activity, ChevronRight, X, Loader2, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/i18n/language-context"
import Image from "next/image"

interface PlayerSpotlightProps {
  className?: string
}

export function PlayerSpotlight({ className }: PlayerSpotlightProps) {
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
    <section className={cn("relative z-20 py-16 bg-[#080808] border-y border-white/5", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(234,179,8,0.05),transparent_50%)]" />
      
      <div className="w-full max-w-4xl mx-auto px-6 relative">
        <div className="text-center mb-8">
           <Badge variant="outline" className="border-yellow-500/20 text-yellow-500 mb-3 uppercase tracking-widest text-[10px] px-3 py-1">
              Global Database
           </Badge>
           <h3 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter">
              Find Your <span className="text-yellow-500">Champion</span>
           </h3>
        </div>

        {/* Main Search Container - Glassmorphism */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn(
            "relative rounded-xl overflow-hidden transition-all duration-500 bg-[#0a0a0b]",
            open ? "shadow-[0_0_50px_rgba(234,179,8,0.15)] ring-1 ring-yellow-500/50" : "shadow-2xl ring-1 ring-white/10 hover:ring-white/20"
          )}
        >
            <Command shouldFilter={false} className="bg-transparent border-none">
              <div className="flex items-center px-4 border-b border-white/5">
                <Search className={cn("h-5 w-5 transition-colors", open ? "text-yellow-500" : "text-white/40")} />
                <CommandInput 
                  placeholder="Search Champion (e.g. TheViper)..." 
                  value={query}
                  onValueChange={setQuery}
                  onFocus={() => setOpen(true)}
                  onBlur={() => setTimeout(() => setOpen(false), 200)}
                  className="h-14 text-base font-medium text-white placeholder:text-white/20 border-none focus:ring-0 bg-transparent"
                />
                {loading && <Loader2 className="h-4 w-4 animate-spin text-yellow-500" />}
              </div>

              <AnimatePresence>
                {open && results.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/5 bg-black/50"
                  >
                    <CommandList className="max-h-[300px] overflow-y-auto custom-scrollbar p-2">
                      <CommandEmpty className="py-4 text-center text-white/40 text-xs">No warriors found.</CommandEmpty>
                      <CommandGroup heading="Global Database">
                        {results.map((player) => (
                          <CommandItem 
                            key={player.profileId} 
                            value={player.name}
                            onSelect={() => handleSelect(player)}
                            className="cursor-pointer rounded-lg p-2 aria-selected:bg-yellow-500/20 aria-selected:text-white transition-colors mb-1"
                          >
                            <div className="flex items-center gap-3 w-full">
                               <div className="h-8 w-8 rounded-md bg-black/40 border border-white/10 flex items-center justify-center shrink-0 text-white/40 font-bold text-[10px]">
                                  {player.rank > 0 ? `#${player.rank}` : "-"}
                               </div>
                               <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                     <span className="font-bold text-white text-sm truncate">{player.name}</span>
                                     {player.country && <span className="text-[9px] text-white/40 uppercase tracking-wider">{player.country}</span>}
                                  </div>
                               </div>
                               <div className="text-[10px] font-mono text-yellow-500/80">
                                  {player.rating}
                               </div>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </motion.div>
                )}
              </AnimatePresence>
            </Command>
        </motion.div>

        {/* Selected Player Card - Holographic Display */}
        <AnimatePresence>
          {selectedPlayer && (
            <motion.div
               initial={{ opacity: 0, y: 10, scale: 0.98 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, y: 10, scale: 0.98 }}
               className="mt-4 relative"
            >
               <div className="relative bg-[#121214] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6">
                  {/* Decorator */}
                  <div className="absolute top-0 right-0 p-16 bg-yellow-500/5 blur-[60px] rounded-full" />
                  
                  <div className="relative z-10 flex flex-col gap-4">
                        <div className="flex items-start justify-between">
                           <div>
                              <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter leading-none">
                                 {selectedPlayer.name}
                              </h3>
                              <p className="text-xs text-white/40 font-mono mt-1">ID: {selectedPlayer.profileId}</p>
                           </div>
                           <button onClick={() => setSelectedPlayer(null)} className="p-1 rounded-full hover:bg-white/10 transition-colors">
                              <X className="h-4 w-4 text-white/40 hover:text-white" />
                           </button>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                           <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                              <p className="text-[9px] text-white/30 uppercase font-black tracking-widest mb-1">Rank</p>
                              <p className="text-lg font-black text-white italic">#{selectedPlayer.rank || "-"}</p>
                           </div>
                           <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center relative overflow-hidden">
                              <div className="absolute inset-0 bg-yellow-500/5" />
                              <p className="text-[9px] text-yellow-500/60 uppercase font-black tracking-widest mb-1">Rating</p>
                              <p className="text-lg font-black text-yellow-500 italic">{selectedPlayer.rating}</p>
                           </div>
                           <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                              <p className="text-[9px] text-white/30 uppercase font-black tracking-widest mb-1">Win Rate</p>
                              <p className="text-lg font-black text-white italic">
                                 {selectedPlayer.games > 0 ? Math.round((selectedPlayer.wins / selectedPlayer.games) * 100) : 0}%
                              </p>
                           </div>
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
