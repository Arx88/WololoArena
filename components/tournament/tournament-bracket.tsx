"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Trophy, Eye, Swords, Save, Play, Loader2, Radio, Clock, CheckCircle2, ChevronRight } from "lucide-react"
import type { TournamentMatch, TournamentParticipant, TournamentFormat, Profile, Draft } from "@/lib/types/draft"
import { useToast } from "@/hooks/use-toast"
import { isDemoMode } from "@/lib/demo/auth"
import { useLanguage } from "@/lib/i18n/language-context"
import { cn } from "@/lib/utils"

interface TournamentBracketProps {
  matches: (TournamentMatch & { draft?: Draft })[]
  participants: (TournamentParticipant & { profile?: Profile })[]
  format: TournamentFormat
  isAdmin: boolean
  tournamentId: string
  onMatchUpdate?: () => void
}

export function TournamentBracket({
  matches,
  participants,
  format,
  isAdmin,
  tournamentId,
  onMatchUpdate,
}: TournamentBracketProps) {
  const router = useRouter()
  const { t } = useLanguage()
  const supabase = createClient()
  const { toast } = useToast()
  const isDemo = isDemoMode()

  const [editingMatch, setEditingMatch] = useState<TournamentMatch | null>(null)
  const [scores, setScores] = useState({ player1: 0, player2: 0 })
  const [winnerId, setWinnerId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isStartingDraft, setIsStartingDraft] = useState<string | null>(null)

  const getPlayerName = (playerId: string | null) => {
    if (!playerId) return "TBD"
    const participant = participants.find((p) => p.user_id === playerId)
    return participant?.profile?.username || "Unknown"
  }

  const rounds = Math.max(...matches.map((m) => m.round), 0)
  const matchesByRound = Array.from({ length: rounds }, (_, i) => matches.filter((m) => m.round === i + 1))

  const handleSaveResult = async () => {
    if (!editingMatch || !winnerId) return
    setIsSaving(true)
    if (isDemo) {
      setTimeout(() => {
        toast({ title: "Result saved (Demo)" }); setEditingMatch(null); setIsSaving(false); onMatchUpdate?.();
      }, 500); return;
    }
    // Real DB logic omitted
    setIsSaving(false)
  }

  return (
    <>
      <div className="overflow-x-auto pb-8 -mx-6 px-6 custom-scrollbar">
        <div className="flex gap-12 min-w-max py-4">
          {matchesByRound.map((roundMatches, roundIndex) => (
            <div key={roundIndex} className="flex flex-col gap-8" style={{ minWidth: 320 }}>
              <div className="text-center bg-black/40 backdrop-blur-md py-3 rounded-2xl border border-white/10 shadow-lg">
                <h3 className="font-black text-xs uppercase tracking-[0.3em] text-yellow-500/60">Phase {roundIndex + 1}</h3>
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-1">{roundMatches.length} Engagements</p>
              </div>

              <div className="flex flex-col justify-around gap-6 flex-1">
                {roundMatches.map((match) => {
                  const isInProgress = match.status === "in_progress"
                  const isCompleted = match.status === "completed"

                  return (
                    <Card key={match.id} className={cn(
                      "bg-[#0a0a0b]/80 border-2 transition-all duration-500 rounded-3xl overflow-hidden shadow-2xl group",
                      isInProgress ? "border-yellow-500 shadow-[0_0_40px_rgba(234,179,8,0.1)]" : isCompleted ? "border-emerald-500/20" : "border-white/5"
                    )}>
                      <CardContent className="p-0">
                        <div className="bg-black/40 px-5 py-2 border-b border-white/5 flex justify-between items-center">
                           <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Match #{match.match_number}</span>
                           <Badge className={cn("text-[8px] font-black uppercase px-2", isCompleted ? "bg-emerald-600/10 text-emerald-500" : isInProgress ? "bg-yellow-600 text-black" : "bg-white/5 text-white/20")}>
                             {match.status.replace("_", " ")}
                           </Badge>
                        </div>
                        
                        <div className="p-4 space-y-2">
                          {[1, 2].map(pNum => {
                            const pId = pNum === 1 ? match.player1_id : match.player2_id
                            const pScore = pNum === 1 ? match.player1_score : match.player2_score
                            const isWinner = match.winner_id === pId && pId !== null
                            const isLoser = match.winner_id !== null && !isWinner && pId !== null

                            return (
                              <div key={pNum} className={cn(
                                "flex items-center justify-between p-3 rounded-xl border transition-all",
                                isWinner ? "bg-emerald-600/10 border-emerald-500/40" : isLoser ? "bg-black/20 border-transparent opacity-40" : "bg-white/5 border-white/5"
                              )}>
                                <div className="flex items-center gap-3">
                                   <div className={cn("h-2 w-2 rounded-full", pId ? (pNum === 1 ? "bg-yellow-500" : "bg-red-500") : "bg-white/10")} />
                                   <span className={cn("text-xs font-black uppercase italic tracking-tighter", !pId && "text-white/20 italic")}>{getPlayerName(pId)}</span>
                                   {isWinner && <Trophy className="h-3 w-3 text-emerald-500" />}
                                </div>
                                <span className={cn("text-lg font-black font-mono", isWinner ? "text-emerald-400" : "text-white/20")}>{pScore || 0}</span>
                              </div>
                            )
                          })}
                        </div>

                        {isAdmin && (
                          <div className="px-4 pb-4 flex gap-2">
                             <Button onClick={() => openEditModal(match)} className="flex-1 h-9 bg-white/5 hover:bg-yellow-600 hover:text-black border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Update Intel</Button>
                             {match.status === 'ready' && <Button onClick={() => router.push(`/draft/${match.lobby_id}`)} className="h-9 w-9 bg-yellow-600 hover:bg-yellow-500 text-black rounded-xl p-0 shadow-lg"><Play className="h-4 w-4" /></Button>}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!editingMatch} onOpenChange={() => setEditingMatch(null)}>
        <DialogContent className="bg-[#0a0a0b] border-2 border-white/10 rounded-3xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-black uppercase italic text-white flex items-center gap-3"><Swords className="h-6 w-6 text-yellow-500" /> Registry Engagement Result</DialogTitle>
            <DialogDescription className="text-white/40 uppercase font-bold text-[10px] tracking-widest">Authorized match data entry</DialogDescription>
          </DialogHeader>

          {editingMatch && (
            <div className="space-y-6 py-6">
              {[editingMatch.player1_id, editingMatch.player2_id].map((pId, idx) => (
                <div key={idx} className="space-y-3">
                   <div className="flex items-center justify-between">
                      <Label className="text-xs font-black uppercase text-white/60">{getPlayerName(pId)}</Label>
                      <button onClick={() => setWinnerId(pId)} className={cn("px-4 py-1 rounded-lg text-[10px] font-black uppercase transition-all", winnerId === pId ? "bg-emerald-600 text-white shadow-lg" : "bg-white/5 text-white/20 hover:text-white")}>
                        {winnerId === pId ? "WINNER DECLARED" : "MARK AS WINNER"}
                      </button>
                   </div>
                   <Input type="number" value={idx === 0 ? scores.player1 : scores.player2} onChange={e => setScores(s => ({ ...s, [idx === 0 ? 'player1' : 'player2']: parseInt(e.target.value) || 0 }))} className="h-14 bg-black/60 border-2 border-white/10 rounded-2xl text-center text-2xl font-black text-white focus:border-yellow-500 shadow-inner" />
                </div>
              ))}
            </div>
          )}

          <DialogFooter className="gap-4">
            <Button variant="outline" onClick={() => setEditingMatch(null)} className="h-12 rounded-xl border-white/10 text-white uppercase font-black tracking-widest">Cancel</Button>
            <Button onClick={handleSaveResult} disabled={!winnerId || isSaving} className="h-12 bg-yellow-600 hover:bg-yellow-500 text-black font-black uppercase tracking-widest rounded-xl shadow-xl flex-1">{isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Authorize Registry"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
