"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { History } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { cn } from "@/lib/utils"

function SkeletonRow() {
    return (
        <div className="flex items-center justify-between p-4 rounded-2xl border-2 border-white/5 bg-white/5 animate-pulse">
            <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-white/10" />
                <div className="space-y-2">
                    <div className="h-4 w-32 bg-white/10 rounded" />
                    <div className="h-3 w-20 bg-white/10 rounded" />
                </div>
            </div>
            <div className="h-5 w-12 bg-white/10 rounded-full" />
        </div>
    )
}

export function MatchHistoryList({ matches, userId, isLoading = false }: { matches: any[], userId: string, isLoading?: boolean }) {
  const { t } = useLanguage()

  return (
    <Card className="bg-[#0a0a0b]/60 border-2 border-white/5 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
      <CardHeader className="p-8 border-b border-white/5 bg-gradient-to-b from-yellow-500/5 to-transparent">
        <div className="flex items-center gap-4">
           <div className="h-12 w-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/30 shadow-inner">
              <History className="h-6 w-6 text-yellow-500" />
           </div>
           <div>
              <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-white">Combat Archives</CardTitle>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Historical Engagement Records</p>
           </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        {isLoading ? (
            <div className="space-y-3">
                {[...Array(5)].map((_, i) => <SkeletonRow key={i} />)}
            </div>
        ) : matches.length === 0 ? (
          <div className="py-12 text-center border-2 border-dashed border-white/5 rounded-2xl opacity-20 italic text-sm">
            No historical data found in the cloud.
          </div>
        ) : (
          <div className="space-y-3">
            {matches.map((match) => {
              const isWinner = match.winner_id === userId
              return (
                <div key={match.id} className={cn(
                  "flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300",
                  isWinner ? "bg-emerald-600/5 border-emerald-500/30" : "bg-red-600/5 border-red-500/30"
                )}>
                  <div className="flex items-center gap-4">
                     <div className={cn(
                       "h-10 w-10 rounded-xl flex items-center justify-center font-black",
                       isWinner ? "bg-emerald-500 text-black shadow-lg" : "bg-red-500 text-white shadow-lg"
                     )}>
                       {isWinner ? "W" : "L"}
                     </div>
                     <div>
                        <p className="font-black uppercase italic text-white tracking-tighter">Engagement ID_{match.id.slice(0,4)}</p>
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                          {new Date(match.created_at).toLocaleDateString()}
                        </span>
                     </div>
                  </div>
                  <Badge variant="outline" className="border-white/10 text-white/40 uppercase text-[8px] font-black">
                    Ranked
                  </Badge>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
