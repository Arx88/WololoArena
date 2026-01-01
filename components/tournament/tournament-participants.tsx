"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
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
  Users,
  UserPlus,
  Check,
  X,
  Crown,
  MoreVertical,
  ArrowUp,
  ArrowDown,
  Trash2,
  ExternalLink,
  Shield,
  Trophy,
  Ban,
  Undo2,
  ChevronRight
} from "lucide-react"
import type { TournamentParticipant, TournamentStatus, Profile } from "@/lib/types/draft"
import { TournamentInviteModal } from "./tournament-invite-modal"
import { useToast } from "@/hooks/use-toast"
import { updateDemoParticipant, removeDemoParticipant } from "@/lib/demo/demo-data"
import { useLanguage } from "@/lib/i18n/language-context"
import { cn } from "@/lib/utils"

interface TournamentParticipantsProps {
  participants: (TournamentParticipant & { profile?: Profile })[]
  maxParticipants: number
  isAdmin: boolean
  tournamentId: string
  tournamentName?: string
  tournamentStatus: TournamentStatus
  onParticipantsChange?: () => void
  isDemo?: boolean
}

export function TournamentParticipants({
  participants,
  maxParticipants,
  isAdmin,
  tournamentId,
  tournamentName = "Tournament",
  tournamentStatus,
  onParticipantsChange,
  isDemo = false,
}: TournamentParticipantsProps) {
  const router = useRouter()
  const supabase = createClient()
  const { toast } = useToast()
  const { t } = useLanguage()
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [loadingAction, setLoadingAction] = useState<string | null>(null)
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
  const [disqualifyDialog, setDisqualifyDialog] = useState<{
    open: boolean
    participant: TournamentParticipant | null
  }>({
    open: false,
    participant: null,
  })

  const confirmedCount = participants.filter((p) => p.status === "confirmed").length
  const pendingCount = participants.filter((p) => p.status === "pending").length

  const sortedParticipants = [...participants].sort((a, b) => {
    if (a.status === "winner") return -1;
    if (b.status === "winner") return 1;
    return (a.seed || 999) - (b.seed || 999);
  });

  return (
    <>
      <Card className="bg-[#0a0a0b]/60 border-2 border-white/5 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
        <CardHeader className="p-8 border-b border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-4">
               <div className="h-12 w-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/30">
                  <Users className="h-6 w-6 text-yellow-500" />
               </div>
               <div>
                  <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-white">Registry Database</CardTitle>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Authenticated Combatants Only</p>
               </div>
            </div>
            
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="outline" className="h-8 border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-widest px-4">
                {confirmedCount} / {maxParticipants} SLOTS FILLED
              </Badge>
              {isAdmin && tournamentStatus === "registration" && (
                <Button onClick={() => setIsInviteModalOpen(true)} className="h-10 bg-yellow-600 hover:bg-yellow-500 text-black font-black uppercase tracking-widest rounded-xl px-6 shadow-lg transition-all active:scale-95">
                  <UserPlus className="h-4 w-4 mr-2" /> Invite Player
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8 space-y-4">
          {sortedParticipants.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center bg-black/40 border border-dashed border-white/5 rounded-2xl">
               <Shield className="h-12 w-12 text-white/5 mb-4" />
               <p className="text-sm font-black text-white/20 uppercase tracking-[0.2em]">No active signatures detected</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {sortedParticipants.map((participant, index) => {
                const isWinner = participant.status === "winner"
                const isPending = participant.status === "pending"
                const isDisqualified = participant.status === "disqualified"

                return (
                  <div key={participant.id} className={cn(
                    "group flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300",
                    isWinner ? "bg-yellow-600/10 border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.1)]" : 
                    isPending ? "bg-black/40 border-white/5 opacity-60" : "bg-black/60 border-white/5 hover:border-yellow-500/30"
                  )}>
                    <div className="flex items-center gap-4">
                       <div className={cn(
                         "h-10 w-10 rounded-xl flex items-center justify-center font-black text-xs",
                         isWinner ? "bg-yellow-500 text-black" : "bg-white/5 text-white/20"
                       )}>
                         {isWinner ? <Trophy className="h-5 w-5" /> : (participant.seed || index + 1)}
                       </div>
                       
                       <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 border-2 border-white/5">
                             <AvatarFallback className="bg-white/5 text-yellow-500 font-black">
                               {participant.profile?.username?.[0] || "?"}
                             </AvatarFallback>
                          </Avatar>
                          <div>
                             <p className={cn("text-base font-black uppercase italic tracking-tighter text-white leading-none mb-1", isDisqualified && "line-through opacity-40")}>
                               {participant.profile?.username || "Unknown"}
                               {isWinner && <Crown className="inline ml-2 h-4 w-4 text-yellow-500" />}
                             </p>
                             <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest leading-none">
                               {isPending ? "Pending Authorization" : isDisqualified ? "Archived/Banned" : `Verified Combatant - ID_${participant.id.slice(0,4)}`}
                             </span>
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center gap-4">
                       {!isWinner && !isDisqualified && !isPending && (
                         <Badge className="bg-emerald-600/10 text-emerald-500 border border-emerald-500/30 text-[8px] font-black tracking-widest px-3">READY</Badge>
                       )}
                       {isAdmin && (
                         <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                             <Button variant="ghost" size="icon" className="h-10 w-10 text-white/20 hover:text-yellow-500 hover:bg-yellow-500/10 rounded-xl transition-all">
                                <MoreVertical className="h-5 w-5" />
                             </Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent align="end" className="bg-[#0a0a0b] border-white/10 rounded-xl p-2 w-48 shadow-2xl">
                              <DropdownMenuItem className="h-10 rounded-lg focus:bg-yellow-600 focus:text-black font-bold uppercase text-[10px] cursor-pointer"><ArrowUp className="h-3.5 w-3.5 mr-2" /> Increase Seed</DropdownMenuItem>
                              <DropdownMenuItem className="h-10 rounded-lg focus:bg-yellow-600 focus:text-black font-bold uppercase text-[10px] cursor-pointer"><ArrowDown className="h-3.5 w-3.5 mr-2" /> Decrease Seed</DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-white/5" />
                              <DropdownMenuItem className="h-10 rounded-lg focus:bg-red-600 focus:text-white font-bold uppercase text-[10px] cursor-pointer"><Ban className="h-3.5 w-3.5 mr-2" /> Disqualify</DropdownMenuItem>
                           </DropdownMenuContent>
                         </DropdownMenu>
                       )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <TournamentInviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        tournamentId={tournamentId}
        tournamentName={tournamentName}
        existingParticipants={participants.map((p) => p.user_id)}
        isDemo={isDemo}
        onInvite={onParticipantsChange}
      />
    </>
  )
}