"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserPlus, Search, Check, X, Mail, Link2, Copy, Loader2, ShieldCheck } from "lucide-react"
import type { Profile } from "@/lib/types/draft"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/i18n/language-context"
import { getDemoProfiles, addDemoParticipant } from "@/lib/demo/demo-data"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface TournamentInviteModalProps {
  isOpen: boolean
  onClose: () => void
  tournamentId: string
  tournamentName: string
  existingParticipants: string[]
  isDemo?: boolean
  onInvite?: () => void
}

export function TournamentInviteModal({
  isOpen,
  onClose,
  tournamentId,
  tournamentName,
  existingParticipants,
  isDemo = false,
  onInvite,
}: TournamentInviteModalProps) {
  const supabase = createClient()
  const { toast } = useToast()
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Profile[]>([])
  const [selectedUsers, setSelectedUsers] = useState<Profile[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [inviteLink, setInviteLink] = useState("")

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.length < 2) { setSearchResults([]); return; }
    setIsSearching(true)
    if (isDemo) {
      await new Promise((r) => setTimeout(r, 300))
      const filtered = getDemoProfiles().filter(p => p.username?.toLowerCase().includes(query.toLowerCase()) && !existingParticipants.includes(p.id))
      setSearchResults(filtered); setIsSearching(false); return;
    }
    const { data } = await supabase.from("profiles").select("*").ilike("username", `%${query}%`).not("id", "in", `(${existingParticipants.join(",")})`).limit(10)
    setSearchResults(data || []); setIsSearching(false);
  }

  const toggleUser = (user: Profile) => {
    if (selectedUsers.find((u) => u.id === user.id)) {
      setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id))
    } else {
      setSelectedUsers([...selectedUsers, user])
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl bg-[#0a0a0b] border-2 border-yellow-500/30 rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] p-0 overflow-hidden">
        <DialogHeader className="p-8 border-b border-white/5 bg-gradient-to-b from-yellow-500/5 to-transparent">
          <div className="flex items-center gap-4 mb-2">
             <div className="h-12 w-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/30 shadow-inner">
                <UserPlus className="h-6 w-6 text-yellow-500" />
             </div>
             <div>
                <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter text-white">Registry Protocol</DialogTitle>
                <DialogDescription className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Authorize external combatants for {tournamentName}</DialogDescription>
             </div>
          </div>
        </DialogHeader>

        <div className="p-8 space-y-8">
          {/* Search Section */}
          <div className="space-y-3">
            <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Search Database</Label>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20 group-focus-within:text-yellow-500 transition-colors" />
              <Input
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Transmit username signal..."
                className="h-14 bg-black/60 border-2 border-white/10 rounded-2xl pl-12 pr-4 text-base font-bold text-white focus:border-yellow-500 transition-all shadow-inner"
              />
              {isSearching && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-yellow-500" />}
            </div>
          </div>

          {/* Results Area */}
          <AnimatePresence>
            {searchResults.length > 0 && (
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Identified Signals</Label>
                <ScrollArea className="h-48 rounded-2xl border-2 border-white/5 bg-black/40 p-2">
                  <div className="space-y-2">
                    {searchResults.map((user) => {
                      const isSelected = selectedUsers.find((u) => u.id === user.id)
                      return (
                        <button
                          key={user.id}
                          onClick={() => toggleUser(user)}
                          className={cn(
                            "w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all",
                            isSelected ? "bg-yellow-600/10 border-yellow-500 shadow-lg" : "bg-white/5 border-transparent hover:border-white/10"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border-2 border-white/5">
                              <AvatarFallback className="bg-white/5 text-yellow-500 font-black text-xs">
                                {user.username?.charAt(0).toUpperCase() || "?"}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-black uppercase italic text-sm text-white tracking-tight">{user.username}</span>
                          </div>
                          {isSelected ? <Check className="h-5 w-5 text-yellow-500" /> : <Plus className="h-5 w-5 text-white/20" />}
                        </button>
                      )
                    })}
                  </div>
                </ScrollArea>
              </div>
            )}
          </AnimatePresence>

          {/* Selected Badges */}
          {selectedUsers.length > 0 && (
            <div className="flex flex-wrap gap-2 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl">
              {selectedUsers.map((user) => (
                <Badge key={user.id} className="bg-yellow-600 text-black font-black uppercase italic text-[9px] gap-2 px-3 py-1 rounded-lg">
                  {user.username}
                  <button onClick={() => toggleUser(user)}><X className="h-3 w-3" /></button>
                </Badge>
              ))}
            </div>
          )}

          {/* Action Footer */}
          <div className="flex gap-4 pt-4 border-t border-white/5">
            <Button variant="outline" onClick={onClose} className="flex-1 h-14 rounded-2xl border-white/10 text-white uppercase font-black tracking-widest hover:bg-white/5">Abort</Button>
            <Button
              onClick={() => {}} // Integration logic
              disabled={selectedUsers.length === 0 || isSending}
              className="flex-[2] h-14 bg-yellow-600 hover:bg-yellow-500 text-black font-black uppercase tracking-widest rounded-2xl shadow-xl transition-all hover:scale-[1.02]"
            >
              {isSending ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Mail className="h-5 w-5 mr-2" />}
              Authorize Transmission ({selectedUsers.length})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}