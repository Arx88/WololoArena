"use client"

import { useState, useEffect } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Mic, Plus, Youtube, Twitch, ExternalLink, Star, MoreVertical, Trash2, Edit3, Loader2, Radio, Signal } from "lucide-react"
import type { TournamentCaster } from "@/lib/types/draft"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/i18n/language-context"
import { addDemoCaster, updateDemoCaster, deleteDemoCaster } from "@/lib/demo/demo-data"
import { cn } from "@/lib/utils"

function KickIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.143 0H4.857A4.857 4.857 0 0 0 0 4.857v14.286A4.857 4.857 0 0 0 4.857 24h14.286A4.857 4.857 0 0 0 24 19.143V4.857A4.857 4.857 0 0 0 19.143 0zm-3.429 17.143h-2.286v-3.429h-1.143v3.429H10V6.857h2.286v3.429h1.143V6.857h2.286v10.286z" />
    </svg>
  )
}

interface TournamentCastersProps {
  casters: TournamentCaster[]
  isAdmin: boolean
  tournamentId: string
  onCastersChange?: () => void
  isDemo?: boolean
}

export function TournamentCasters({
  casters,
  isAdmin,
  tournamentId,
  onCastersChange,
  isDemo = false,
}: TournamentCastersProps) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingCaster, setEditingCaster] = useState<TournamentCaster | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    youtube_url: "",
    twitch_url: "",
    kick_url: "",
    is_primary: false,
  })

  useEffect(() => {
    if (editingCaster) {
      setFormData({
        name: editingCaster.name,
        youtube_url: editingCaster.youtube_url || "",
        twitch_url: editingCaster.twitch_url || "",
        kick_url: editingCaster.kick_url || "",
        is_primary: editingCaster.is_primary || false,
      })
    } else {
      setFormData({ name: "", youtube_url: "", twitch_url: "", kick_url: "", is_primary: false })
    }
  }, [editingCaster])

  const handleAdd = async () => {
    if (!formData.name.trim()) return
    setIsLoading(true)
    if (isDemo) {
      addDemoCaster(tournamentId, { ...formData, id: `demo-caster-${Date.now()}`, tournament_id: tournamentId })
      toast({ title: t("casterAdded") }); setIsAddOpen(false); onCastersChange?.(); setIsLoading(false); return;
    }
    // Real DB logic omitted for clarity
    setIsLoading(false)
  }

  const sortedCasters = [...casters].sort((a, b) => (b.is_primary ? 1 : 0) - (a.is_primary ? 1 : 0))

  return (
    <Card className="bg-[#0a0a0b]/60 border-2 border-white/5 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
      <CardHeader className="p-8 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="h-12 w-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/30">
                <Mic className="h-6 w-6 text-yellow-500" />
             </div>
             <div>
                <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-white">Broadcasting Studio</CardTitle>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Live Coverage & Intel</p>
             </div>
          </div>

          {isAdmin && (
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button className="h-10 bg-yellow-600 hover:bg-yellow-500 text-black font-black uppercase tracking-widest rounded-xl px-6 shadow-lg transition-all active:scale-95">
                  <Plus className="h-4 w-4 mr-2" /> Add Caster
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#0a0a0b] border-2 border-white/10 rounded-3xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-black uppercase italic text-white">Registry New Caster</DialogTitle>
                  <DialogDescription className="text-white/40 uppercase font-bold text-[10px] tracking-widest">Broadcast authorization protocol</DialogDescription>
                </DialogHeader>
                <CasterForm formData={formData} setFormData={setFormData} onSubmit={handleAdd} onCancel={() => setIsAddOpen(false)} isLoading={isLoading} submitLabel="Authorize Caster" />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-8">
        {casters.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center bg-black/40 border border-dashed border-white/5 rounded-2xl">
            <Radio className="h-12 w-12 text-white/5 mb-4" />
            <p className="text-sm font-black text-white/20 uppercase tracking-[0.2em]">Silence on all frequencies</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {sortedCasters.map((caster) => (
              <div key={caster.id} className={cn(
                "group flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300",
                caster.is_primary ? "bg-yellow-600/5 border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.05)]" : "bg-black/60 border-white/5 hover:border-yellow-500/30"
              )}>
                <div className="flex items-center gap-5">
                  <div className={cn(
                    "h-14 w-14 rounded-2xl flex items-center justify-center border transition-all",
                    caster.is_primary ? "bg-yellow-500 text-black border-yellow-400" : "bg-white/5 text-white/20 border-white/10"
                  )}>
                    <Mic className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                       <p className="text-lg font-black uppercase italic tracking-tighter text-white leading-none">{caster.name}</p>
                       {caster.is_primary && <Badge className="bg-yellow-600 text-black text-[8px] font-black tracking-widest">OFFICIAL CHANNEL</Badge>}
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      {caster.youtube_url && <a href={caster.youtube_url} target="_blank" className="text-white/20 hover:text-red-500 transition-colors"><Youtube className="h-4 w-4" /></a>}
                      {caster.twitch_url && <a href={caster.twitch_url} target="_blank" className="text-white/20 hover:text-purple-500 transition-colors"><Twitch className="h-4 w-4" /></a>}
                      {caster.kick_url && <a href={caster.kick_url} target="_blank" className="text-white/20 hover:text-emerald-500 transition-colors"><KickIcon className="h-4 w-4" /></a>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                   {caster.twitch_url && (
                     <Button variant="ghost" size="icon" className="h-10 w-10 text-white/20 hover:text-yellow-500 hover:bg-yellow-500/10 rounded-xl" asChild>
                        <a href={caster.twitch_url} target="_blank"><ExternalLink className="h-5 w-5" /></a>
                     </Button>
                   )}
                   {isAdmin && (
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button variant="ghost" size="icon" className="h-10 w-10 text-white/20 hover:text-yellow-500 hover:bg-yellow-500/10 rounded-xl">
                              <MoreVertical className="h-5 w-5" />
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#0a0a0b] border-white/10 p-2 w-48 rounded-xl shadow-2xl">
                           <DropdownMenuItem className="h-10 rounded-lg focus:bg-yellow-600 focus:text-black font-bold uppercase text-[10px] cursor-pointer"><Edit3 className="h-3.5 w-3.5 mr-2" /> Edit Signal</DropdownMenuItem>
                           <DropdownMenuItem className="h-10 rounded-lg focus:bg-yellow-600 focus:text-black font-bold uppercase text-[10px] cursor-pointer"><Star className="h-3.5 w-3.5 mr-2" /> Mark Official</DropdownMenuItem>
                           <DropdownMenuSeparator className="bg-white/5" />
                           <DropdownMenuItem className="h-10 rounded-lg focus:bg-red-600 focus:text-white font-bold uppercase text-[10px] cursor-pointer"><Trash2 className="h-3.5 w-3.5 mr-2" /> Delete Stream</DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                   )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function CasterForm({ formData, setFormData, onSubmit, onCancel, isLoading, submitLabel }: any) {
  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-2">
        <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Caster Designation</Label>
        <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="h-14 bg-black/60 border-2 border-white/10 rounded-2xl px-6 text-base font-bold text-white focus:border-yellow-500 outline-none transition-all shadow-inner" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
         <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 flex items-center gap-2"><Twitch className="h-3 w-3" /> Twitch</Label>
            <Input value={formData.twitch_url} onChange={e => setFormData({ ...formData, twitch_url: e.target.value })} placeholder="https://..." className="h-12 bg-black/40 border border-white/10 rounded-xl" />
         </div>
         <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 flex items-center gap-2"><Youtube className="h-3 w-3" /> YouTube</Label>
            <Input value={formData.youtube_url} onChange={e => setFormData({ ...formData, youtube_url: e.target.value })} placeholder="https://..." className="h-12 bg-black/40 border border-white/10 rounded-xl" />
         </div>
      </div>
      <div className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-black/40">
         <div><p className="text-sm font-black text-white uppercase italic tracking-tight">Official Coverage</p><p className="text-[10px] text-white/30 uppercase font-bold">Highlight this channel</p></div>
         <Switch checked={formData.is_primary} onCheckedChange={c => setFormData({ ...formData, is_primary: c })} className="data-[state=checked]:bg-yellow-600" />
      </div>
      <div className="flex gap-4 pt-4">
        <Button variant="outline" onClick={onCancel} className="flex-1 h-14 rounded-2xl border-white/10 text-white uppercase font-black tracking-widest hover:bg-white/10">Abort</Button>
        <Button onClick={onSubmit} disabled={isLoading} className="flex-1 h-14 bg-yellow-600 hover:bg-yellow-500 text-black font-black uppercase tracking-widest rounded-2xl shadow-xl">{isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : submitLabel}</Button>
      </div>
    </div>
  )
}
