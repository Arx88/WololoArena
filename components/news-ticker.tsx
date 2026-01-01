"use client"

import { useState } from "react"
import { Plus, Trash2, Edit2, Eye, EyeOff, ExternalLink, Radio, Info, ChevronDown, Megaphone, Settings2, Save, History, Bell, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useNews, NewsItem } from "@/lib/news-context"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface NewsTickerProps {
  isAdmin: boolean
}

export function NewsTicker({ isAdmin }: NewsTickerProps) {
  const { news, addNews, removeNews, updateNews, toggleActive } = useNews()
  
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newMsg, setNewMsg] = useState("")
  const [newLink, setNewLink] = useState("")
  const [newDesc, setNewDesc] = useState("")
  const [newImg, setNewImg] = useState("")
  const [newPriority, setNewPriority] = useState(0)
  
  const [hoveredNews, setHoveredNews] = useState<NewsItem | null>(null)
  const [isTickerHovered, setIsTickerHovered] = useState(false)

  const activeNews = [...news]
    .filter((n) => n.active)
    .sort((a, b) => (b.priority || 0) - (a.priority || 0))

  const handleAddOrUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMsg.trim()) return

    if (editingId) {
      updateNews(editingId, {
        message: newMsg,
        link: newLink,
        description: newDesc,
        imageUrl: newImg,
        priority: newPriority
      })
      setEditingId(null)
    } else {
      addNews(newMsg, newLink, newDesc, newImg, newPriority)
    }
    resetForm()
  }

  const startEditing = (item: NewsItem) => {
    setEditingId(item.id)
    setNewMsg(item.message)
    setNewLink(item.link || "")
    setNewDesc(item.description || "")
    setNewImg(item.imageUrl || "")
    setNewPriority(item.priority || 0)
  }

  const resetForm = () => {
    setEditingId(null)
    setNewMsg("")
    setNewLink("")
    setNewDesc("")
    setNewImg("")
    setNewPriority(0)
  }

  if (activeNews.length === 0 && !isAdmin) return null

  const marqueeItems = activeNews.length > 0 
    ? [...activeNews, ...activeNews, ...activeNews, ...activeNews].slice(0, 40)
    : []

  return (
    <div 
      className="relative z-[100] w-full"
      onMouseLeave={() => {
        setIsTickerHovered(false)
        setHoveredNews(null)
      }}
    >
      {/* --- Main Ticker Bar --- */}
      <div 
        className="relative bg-black/95 backdrop-blur-xl border-b border-white/10 h-10 overflow-hidden"
        onMouseEnter={() => setIsTickerHovered(true)}
      >
        <div className="max-w-[1920px] mx-auto flex items-center h-full px-4">
          
          <div className="relative z-30 flex items-center gap-2 pr-6 bg-black h-full shrink-0 border-r border-white/10 shadow-[20px_0_30px_-5px_rgba(0,0,0,1)]">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/90">
              Live Feed
            </span>
          </div>

          <div className="flex-1 overflow-hidden relative h-full flex items-center mask-linear-fade">
             {activeNews.length > 0 ? (
               <div className={cn("flex animate-marquee items-center whitespace-nowrap", isTickerHovered && "paused")}>
                 {marqueeItems.map((item, i) => (
                   <div key={`${item.id}-${i}`} onMouseEnter={() => setHoveredNews(item)} className="flex items-center gap-6 px-12 h-10 cursor-default">
                     <span className="text-[11px] font-black text-white/40 group-hover/item:text-white transition-all duration-300 uppercase tracking-widest">
                       {item.message}
                     </span>
                     <div className="flex gap-1.5 opacity-10 mx-2">
                        <div className="w-1 h-3 bg-primary/50" />
                     </div>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="px-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest opacity-40 italic">
                 Wololo Arena // Standing By
               </div>
             )}
          </div>

          {isAdmin && (
            <div className="relative z-30 pl-4 bg-black h-full flex items-center border-l border-white/10">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-white/20 hover:text-primary hover:bg-white/5 rounded-full transition-all">
                    <Settings2 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl bg-[#0a0a0b] border-white/10 text-white p-0 overflow-hidden shadow-2xl">
                  <div className="flex flex-col h-[80vh]">
                    <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Megaphone className="h-5 w-5 text-primary" />
                        <DialogTitle className="text-base font-black uppercase tracking-widest text-white/90">
                          News Management
                        </DialogTitle>
                      </div>
                    </div>
                    
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
                      <div className="p-10 border-r border-white/5 overflow-y-auto custom-scrollbar bg-black/20">
                        <h4 className="text-[11px] font-black uppercase text-primary tracking-widest mb-10">
                          {editingId ? "Edit News Item" : "Create New News Item"}
                        </h4>
                        <form onSubmit={handleAddOrUpdate} className="space-y-8">
                          <div className="space-y-3">
                            <Label className="text-[11px] uppercase text-white/40 font-black tracking-wider">Headline</Label>
                            <Input placeholder="Title..." value={newMsg} onChange={(e) => setNewMsg(e.target.value)} className="bg-white/[0.03] border-white/10 h-14 text-base focus:border-primary/50 rounded-xl" />
                          </div>
                          <div className="space-y-3">
                            <Label className="text-[11px] uppercase text-white/40 font-black tracking-wider">Description</Label>
                            <Textarea placeholder="Full briefing text..." value={newDesc} onChange={(e) => setNewDesc(e.target.value)} className="bg-white/[0.03] border-white/10 min-h-[180px] text-sm focus:border-primary/50 rounded-xl resize-none p-4" />
                          </div>
                          <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-3">
                              <Label className="text-[11px] uppercase text-white/40 font-black tracking-wider">Image URL</Label>
                              <Input placeholder="https://..." value={newImg} onChange={(e) => setNewImg(e.target.value)} className="bg-white/[0.03] border-white/10 h-12 text-xs font-mono rounded-xl" />
                            </div>
                            <div className="space-y-3">
                              <Label className="text-[11px] uppercase text-white/40 font-black tracking-wider">Link</Label>
                              <Input placeholder="/page..." value={newLink} onChange={(e) => setNewLink(e.target.value)} className="bg-white/[0.03] border-white/10 h-12 text-xs rounded-xl" />
                            </div>
                          </div>
                          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div className="flex justify-between items-center mb-4">
                              <Label className="text-[11px] uppercase text-white/40 font-black tracking-wider">Priority (0-100)</Label>
                              <span className="text-sm font-mono text-primary font-bold bg-primary/10 px-3 py-1 rounded-lg">{newPriority}</span>
                            </div>
                            <input type="range" min="0" max="100" value={newPriority} onChange={(e) => setNewPriority(parseInt(e.target.value))} className="w-full accent-primary h-2 bg-white/5 rounded-lg appearance-none" />
                          </div>
                          <div className="flex gap-4 pt-4">
                            <Button type="submit" className="flex-1 bg-primary text-black font-black uppercase text-xs tracking-[0.2em] h-14 hover:bg-white transition-all rounded-xl shadow-lg shadow-primary/10">
                              {editingId ? "Update News" : "Publish News"}
                            </Button>
                            {editingId && <Button type="button" variant="outline" onClick={resetForm} className="border-white/10 text-white h-14 px-8 rounded-xl uppercase text-xs font-bold">Cancel</Button>}
                          </div>
                        </form>
                      </div>
                      <div className="p-10 overflow-hidden flex flex-col">
                        <h4 className="text-[11px] font-black uppercase text-white/40 tracking-widest mb-10">News Registry</h4>
                        <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                          {news.map((item) => (
                            <div key={item.id} className={cn("group relative flex items-center gap-5 p-5 rounded-2xl border transition-all", editingId === item.id ? "bg-primary/5 border-primary/40 shadow-inner" : "bg-white/[0.01] border-white/5 hover:border-white/20")}>
                              <Button variant="ghost" size="icon" className={cn("h-12 w-12 shrink-0 rounded-xl transition-all", item.active ? "text-green-400 bg-green-400/5" : "text-white/10")} onClick={() => toggleActive(item.id)}>{item.active ? <Bell className="h-6 w-6" /> : <EyeOff className="h-6 w-6" />}</Button>
                              <div className="flex-1 min-w-0">
                                <p className={cn("text-base font-bold truncate mb-1", !item.active && "opacity-20 line-through")}>{item.message}</p>
                                <Badge variant="outline" className="text-[9px] font-mono text-white/20 border-white/5">PRIORITY: {item.priority}</Badge>
                              </div>
                              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                <Button variant="ghost" size="icon" onClick={() => startEditing(item)} className="h-10 w-10 text-white/40 hover:text-primary bg-white/5"><Edit2 className="h-4 w-4" /></Button>
                                <Button variant="ghost" size="icon" onClick={() => removeNews(item.id)} className="h-10 w-10 text-white/10 hover:text-red-400 bg-white/5"><Trash2 className="h-4 w-4" /></Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>

      {/* --- Hover Expansion Panel (Fixed 450px | NO SCROLL) --- */}
      <AnimatePresence>
        {isTickerHovered && hoveredNews && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 450, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-10 left-0 right-0 overflow-hidden bg-[#020202]/98 backdrop-blur-3xl border-b border-primary/30 shadow-[0_40px_80px_-12px_rgba(0,0,0,0.9)]"
          >
            <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-0 relative h-[450px]">
              
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-20" />

              {/* Image Section */}
              <div className="md:col-span-5 lg:col-span-4 relative h-full overflow-hidden border-r border-white/5 bg-zinc-900/50">
                {hoveredNews.imageUrl ? (
                  <>
                    <Image src={hoveredNews.imageUrl} alt={hoveredNews.message} fill className="object-cover opacity-80 transition-all duration-1000 scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#020202]" />
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-white/5"><Megaphone className="h-24 w-24 opacity-10" /></div>
                )}
                <div className="absolute bottom-10 left-10"><div className="h-1 w-12 bg-primary animate-pulse" /></div>
              </div>

              {/* Text Content (Optimized to fit without scroll) */}
              <div className="md:col-span-7 lg:col-span-8 p-10 md:p-16 relative flex flex-col justify-center h-full overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-[100px] font-black text-white/5 italic select-none pointer-events-none uppercase">News</div>

                <div className="flex items-center gap-4 mb-4 text-primary/60 font-bold text-[10px] uppercase tracking-[0.4em]">
                  <span>Wololo Arena</span>
                  <div className="h-px flex-1 bg-white/5" />
                </div>

                <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase italic leading-[0.9] mb-6 max-w-3xl">
                  {hoveredNews.message}
                </h3>

                <div className="max-w-2xl space-y-6 border-l-2 border-primary/20 pl-10">
                  <p className="text-base md:text-lg text-white/70 leading-relaxed font-medium italic">
                    {hoveredNews.description || "No further details available for this update."}
                  </p>
                  
                  {hoveredNews.link && (
                    <Button asChild className="bg-primary text-black font-black uppercase text-xs tracking-widest px-12 h-14 hover:bg-white transition-all shadow-lg shadow-primary/5">
                      <Link href={hoveredNews.link} className="flex items-center gap-3">
                        Read Full Article <ExternalLink className="h-5 w-5" />
                      </Link>
                    </Button>
                  )}
                </div>

                <div className="mt-8 flex items-center gap-8 text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
                   <div className="flex flex-col gap-1">
                      <span className="text-[8px] opacity-50 uppercase tracking-tighter">Status</span>
                      <span className="text-green-500 font-bold">Verified</span>
                   </div>
                   <div className="flex flex-col gap-1 border-l border-white/10 pl-8">
                      <span className="text-[8px] opacity-50 uppercase tracking-tighter">Posted</span>
                      <span className="text-white/60 font-bold">{new Date(parseInt(hoveredNews.id)).toLocaleDateString()}</span>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 60s linear infinite; }
        .paused { animation-play-state: paused !important; }
        .mask-linear-fade { mask-image: linear-gradient(to right, transparent, black 100px, black calc(100% - 100px), transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 100px, black calc(100% - 100px), transparent); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(var(--primary), 0.2); border-radius: 10px; }
      `}</style>
    </div>
  )
}