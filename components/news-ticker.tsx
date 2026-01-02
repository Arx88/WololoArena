"use client"

import { useState } from "react"
import { Plus, Trash2, Edit2, EyeOff, ExternalLink, Radio, ChevronDown, Megaphone, Settings2, Save, History, Bell, AlertCircle, GripVertical } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence, Reorder } from "framer-motion"
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
  const { news, addNews, removeNews, updateNews, toggleActive, setNews } = useNews()
  
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newMsg, setNewMsg] = useState("")
  const [newLink, setNewLink] = useState("")
  const [newDesc, setNewDesc] = useState("")
  const [newImg, setNewImg] = useState("")
  
  const [hoveredNews, setHoveredNews] = useState<NewsItem | null>(null)
  const [isTickerHovered, setIsTickerHovered] = useState(false)

  const activeNews = news.filter((n) => n.active)

  const handleAddOrUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMsg.trim()) return

    if (editingId) {
      updateNews(editingId, {
        message: newMsg,
        link: newLink,
        description: newDesc,
        imageUrl: newImg,
      })
      setEditingId(null)
    } else {
      addNews(newMsg, newLink, newDesc, newImg)
    }
    resetForm()
  }

  const startEditing = (item: NewsItem) => {
    setEditingId(item.id)
    setNewMsg(item.message)
    setNewLink(item.link || "")
    setNewDesc(item.description || "")
    setNewImg(item.imageUrl || "")
  }

  const resetForm = () => {
    setEditingId(null)
    setNewMsg("")
    setNewLink("")
    setNewDesc("")
    setNewImg("")
  }

  if (activeNews.length === 0 && !isAdmin) return null

  const marqueeItems = activeNews.length > 0 
    ? [...activeNews, ...activeNews].slice(0, 20)
    : []

  return (
    <div 
      className="relative z-[100] w-full"
      onMouseLeave={() => {
        setIsTickerHovered(false)
        setHoveredNews(null)
      }}
    >
      <div 
        className="relative bg-[#050505] border-b border-white/10 h-10 overflow-hidden"
        onMouseEnter={() => setIsTickerHovered(true)}
      >
        <div className="max-w-[1920px] mx-auto flex items-center h-full px-4">
          
          <div className="relative z-30 flex items-center gap-2 pr-6 bg-[#050505] h-full shrink-0 border-r border-white/10">
            <div className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/90">
              Noticias
            </span>
          </div>

          <div className="flex-1 overflow-hidden relative h-full flex items-center">
             {activeNews.length > 0 ? (
               <div 
                className={cn("flex animate-marquee items-center whitespace-nowrap", isTickerHovered && "paused")}
                style={{ willChange: "transform" }}
               >
                 {marqueeItems.map((item, i) => (
                   <div key={`${item.id}-${i}`} onMouseEnter={() => setHoveredNews(item)} className="flex items-center gap-6 px-12 h-10 cursor-default">
                     <span className="text-[10px] font-black text-white/40 uppercase tracking-widest transition-colors hover:text-white">
                       {item.message}
                     </span>
                     <div className="w-1 h-3 bg-primary/20" />
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
            <div className="relative z-30 pl-4 bg-[#050505] h-full flex items-center border-l border-white/10">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-white/20 hover:text-primary hover:bg-white/5 rounded-full transition-all">
                    <Settings2 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[1400px] sm:max-w-[1400px] w-[95vw] bg-[#0a0a0b] border-white/10 text-white p-0 overflow-hidden shadow-2xl">
                  <div className="flex flex-col h-[85vh]">
                    <div className="p-8 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                          <Megaphone className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <DialogTitle className="text-xl font-black uppercase tracking-widest text-white/90">
                            Administración
                          </DialogTitle>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-primary/30 text-primary font-mono px-4 py-1.5 uppercase">Manual</Badge>
                    </div>
                    
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-0 overflow-hidden">
                      <div className="lg:col-span-2 p-10 border-r border-white/5 overflow-y-auto custom-scrollbar bg-black/40">
                        <div className="flex items-center justify-between mb-10">
                          <h4 className="text-sm font-black uppercase text-primary tracking-[0.2em] flex items-center gap-3">
                            {editingId ? <Edit2 className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                            {editingId ? "Update News Item" : "Create New Item"}
                          </h4>
                          {editingId && (
                            <Button variant="ghost" size="sm" onClick={resetForm} className="text-[10px] uppercase font-black text-white/40 hover:text-white">
                              Cancel
                            </Button>
                          )}
                        </div>
                        
                        <form onSubmit={handleAddOrUpdate} className="space-y-8">
                          <div className="space-y-3">
                            <Label className="text-[11px] uppercase text-white/40 font-black tracking-widest ml-1">Main Headline</Label>
                            <Input 
                              placeholder="Title of the news..." 
                              value={newMsg}
                              onChange={(e) => setNewMsg(e.target.value)}
                              className="bg-white/[0.03] border-white/10 h-14 text-base focus:border-primary/50 rounded-2xl px-6"
                            />
                          </div>

                          <div className="space-y-3">
                            <Label className="text-[11px] uppercase text-white/40 font-black tracking-widest ml-1">Full Intelligence Briefing</Label>
                            <Textarea 
                              placeholder="Detailed information for expanded view..." 
                              value={newDesc}
                              onChange={(e) => setNewDesc(e.target.value)}
                              className="bg-white/[0.03] border-white/10 min-h-[200px] text-sm focus:border-primary/50 rounded-2xl resize-none p-6 leading-relaxed"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-3">
                              <Label className="text-[11px] uppercase text-white/40 font-black tracking-widest ml-1">Asset URL (IMG)</Label>
                              <Input 
                                placeholder="https://..." 
                                value={newImg}
                                onChange={(e) => setNewImg(e.target.value)}
                                className="bg-white/[0.03] border-white/10 h-12 text-xs font-mono rounded-xl px-4"
                              />
                            </div>
                            <div className="space-y-3">
                              <Label className="text-[11px] uppercase text-white/40 font-black tracking-widest ml-1">Action Link</Label>
                              <Input 
                                placeholder="/page or URL" 
                                value={newLink}
                                onChange={(e) => setNewLink(e.target.value)}
                                className="bg-white/[0.03] border-white/10 h-12 text-xs rounded-xl px-4"
                              />
                            </div>
                          </div>

                          <Button type="submit" className="w-full bg-primary text-black font-black uppercase text-xs tracking-[0.3em] h-16 hover:bg-white transition-all rounded-2xl shadow-xl shadow-primary/10">
                            {editingId ? <Save className="mr-3 h-5 w-5" /> : <Radio className="mr-3 h-5 w-5" />}
                            {editingId ? "Update Database" : "Initialize Broadcast"}
                          </Button>
                        </form>
                      </div>

                      <div className="lg:col-span-3 p-10 overflow-hidden flex flex-col bg-black/20">
                        <div className="flex items-center justify-between mb-10">
                          <h4 className="text-sm font-black uppercase text-white/40 tracking-[0.2em] flex items-center gap-3">
                            <History className="h-4 w-4" />
                            Orden
                          </h4>
                          <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Arrastra para reordenar</span>
                        </div>
                        
                        <Reorder.Group 
                          axis="y" 
                          values={news} 
                          onReorder={setNews}
                          className="flex-1 space-y-4 overflow-y-auto pr-4 custom-scrollbar"
                        >
                          {news.map((item) => (
                            <Reorder.Item 
                              key={item.id} 
                              value={item}
                              className={cn(
                                "group relative flex items-center gap-6 p-6 rounded-3xl border transition-all duration-500 cursor-grab active:cursor-grabbing",
                                editingId === item.id ? "bg-primary/5 border-primary/40 shadow-[0_0_30px_rgba(var(--primary),0.1)]" : "bg-white/[0.01] border-white/5 hover:border-white/20"
                              )}
                            >
                              <div className="text-white/10 group-hover:text-primary/40 transition-colors">
                                <GripVertical className="h-6 w-6" />
                              </div>

                              <Button
                                variant="ghost" size="icon"
                                className={cn("h-14 w-14 shrink-0 rounded-2xl transition-all border", item.active ? "text-green-400 bg-green-400/5 border-green-400/20" : "text-white/10 bg-white/5 border-transparent")}
                                onClick={(e) => { e.stopPropagation(); toggleActive(item.id); }}
                              >
                                {item.active ? <Bell className="h-7 w-7" /> : <EyeOff className="h-7 w-7" />}
                              </Button>
                              
                              <div className="flex-1 min-w-0">
                                <p className={cn("text-lg font-black truncate leading-none mb-2", !item.active && "opacity-20 line-through")}>{item.message}</p>
                                <div className="flex items-center gap-4">
                                  <span className="text-[9px] text-white/20 font-mono tracking-tighter uppercase">ID: {item.id.slice(-8)}</span>
                                  {item.description && <span className="text-[10px] text-primary/40 font-black uppercase tracking-tighter">• Content</span>}
                                </div>
                              </div>

                              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                <Button 
                                  variant="ghost" size="icon" 
                                  onClick={(e) => { e.stopPropagation(); startEditing(item); }} 
                                  className="h-11 w-11 text-white/40 hover:text-primary bg-white/5 rounded-xl border border-transparent hover:border-primary/30"
                                >
                                  <Edit2 className="h-5 w-5" />
                                </Button>
                                <Button 
                                  variant="ghost" size="icon" 
                                  onClick={(e) => { e.stopPropagation(); removeNews(item.id); }} 
                                  className="h-11 w-11 text-white/10 hover:text-red-400 bg-white/5 rounded-xl border border-transparent hover:border-red-400/30"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </Button>
                              </div>
                            </Reorder.Item>
                          ))}
                          
                          {news.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.01]">
                               <AlertCircle className="h-16 w-16 text-white/5 mb-6" />
                               <p className="text-xs font-black text-white/20 uppercase tracking-[0.4em]">No transmissions in registry</p>
                            </div>
                          )}
                        </Reorder.Group>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isTickerHovered && hoveredNews && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 450, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-10 left-0 right-0 overflow-hidden bg-[#020202] border-b border-primary/30 shadow-2xl"
          >
            <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-0 relative h-[450px]">
              <div className="md:col-span-5 lg:col-span-4 relative h-full overflow-hidden border-r border-white/5 bg-zinc-900">
                {hoveredNews.imageUrl ? (
                  <>
                    <Image src={hoveredNews.imageUrl} alt={hoveredNews.message} fill className="object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#020202]" />
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-white/5"><Megaphone className="h-24 w-24 opacity-10" /></div>
                )}
              </div>

              <div className="md:col-span-7 lg:col-span-8 p-10 md:p-16 relative flex flex-col justify-center h-full overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-[100px] font-black text-white/5 italic select-none pointer-events-none uppercase">News</div>

                <div className="flex items-center gap-4 mb-4 text-primary/60 font-bold text-[10px] uppercase tracking-[0.4em]">
                  <span>Wololo Arena</span>
                  <div className="h-px flex-1 bg-white/5" />
                </div>

                <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase italic leading-[0.9] mb-6 max-w-3xl font-cinzel">
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
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(var(--primary), 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(var(--primary), 0.4); }
      `}</style>
    </div>
  )
}