"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Megaphone, X, Plus, Trash2, Edit2, Eye, EyeOff, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useNews } from "@/lib/news-context"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface NewsTickerProps {
  isAdmin: boolean
}

export function NewsTicker({ isAdmin }: NewsTickerProps) {
  const { news, addNews, removeNews, toggleActive } = useNews()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [newMsg, setNewMsg] = useState("")
  const [newLink, setNewLink] = useState("")

  // Filter only active news for display
  const activeNews = news.filter((n) => n.active)

  useEffect(() => {
    if (activeNews.length <= 1 || isHovered) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeNews.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [activeNews.length, isHovered])

  // Reset index if out of bounds (e.g. after deletion)
  useEffect(() => {
    if (currentIndex >= activeNews.length && activeNews.length > 0) {
      setCurrentIndex(0)
    }
  }, [activeNews.length, currentIndex])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMsg.trim()) return
    addNews(newMsg, newLink)
    setNewMsg("")
    setNewLink("")
  }

  if (activeNews.length === 0 && !isAdmin) return null

  return (
    <div className="bg-black/90 text-white text-xs md:text-sm border-b border-yellow-500/20 relative z-[51]">
      <div className="mx-auto max-w-7xl flex items-center h-9 px-4">
        
        {/* Label */}
        <div className="flex items-center gap-2 mr-4 text-yellow-500 font-bold uppercase tracking-wider shrink-0">
          <Megaphone className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Updates</span>
        </div>

        {/* Ticker Content */}
        <div 
          className="flex-1 overflow-hidden relative h-full flex items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait">
            {activeNews.length > 0 ? (
              <motion.div
                key={activeNews[currentIndex]?.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute w-full truncate"
              >
                <div className="flex items-center gap-2">
                  <span>{activeNews[currentIndex]?.message}</span>
                  {activeNews[currentIndex]?.link && (
                    <Link href={activeNews[currentIndex].link!} className="text-yellow-400 hover:text-yellow-300 inline-flex items-center gap-1 underline decoration-yellow-500/30 underline-offset-2">
                       <ExternalLink className="h-3 w-3" />
                       <span className="hidden sm:inline">Read more</span>
                    </Link>
                  )}
                </div>
              </motion.div>
            ) : (
              <span className="text-muted-foreground italic">No active news.</span>
            )}
          </AnimatePresence>
        </div>

        {/* Admin Controls */}
        {isAdmin && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 ml-2 text-muted-foreground hover:text-yellow-500">
                <Edit2 className="h-3.5 w-3.5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-zinc-950 border-yellow-500/20 text-white">
              <DialogHeader>
                <DialogTitle className="text-yellow-500">Manage News Ticker</DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleAdd} className="flex gap-2 mb-6 p-4 bg-zinc-900/50 rounded-lg border border-white/5">
                <div className="flex-1 space-y-2">
                   <Input 
                      placeholder="New announcement message..." 
                      value={newMsg}
                      onChange={(e) => setNewMsg(e.target.value)}
                      className="bg-black/50 border-white/10 text-white placeholder:text-white/20"
                   />
                   <Input 
                      placeholder="Optional Link (e.g., /tournaments)" 
                      value={newLink}
                      onChange={(e) => setNewLink(e.target.value)}
                      className="bg-black/50 border-white/10 text-white placeholder:text-white/20 h-8 text-xs"
                   />
                </div>
                <Button type="submit" size="sm" className="bg-yellow-600 hover:bg-yellow-500 text-black font-bold h-auto">
                  <Plus className="h-4 w-4" />
                </Button>
              </form>

              <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-2">
                {news.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 rounded bg-zinc-900 border border-white/5 group hover:border-white/10 transition-colors">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn("h-8 w-8", item.active ? "text-green-500" : "text-muted-foreground")}
                      onClick={() => toggleActive(item.id)}
                    >
                      {item.active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                    
                    <div className="flex-1 text-sm">
                      <p className={cn(!item.active && "opacity-50 line-through")}>{item.message}</p>
                      {item.link && <p className="text-xs text-yellow-500/70">{item.link}</p>}
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500/50 hover:text-red-500 hover:bg-red-500/10"
                      onClick={() => removeNews(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
