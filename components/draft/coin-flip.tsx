"use client"

import { useState, useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Crown, Swords, User, ShieldCheck, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/language-context"
import { useSoundEffects } from "@/hooks/use-sound-effects"

interface CoinFlipProps {
  hostName: string
  guestName: string
  hostId: string
  guestId: string
  winnerId: string | null
  isHost: boolean
  onCoinFlipComplete: (winnerId: string) => void
}

export function CoinFlip({
  hostName,
  guestName,
  hostId,
  guestId,
  winnerId,
  onCoinFlipComplete,
}: CoinFlipProps) {
  const { t } = useLanguage()
  const { playSound } = useSoundEffects()
  const [isFlipping, setIsFlipping] = useState(false)
  const [result, setResult] = useState<"host" | "guest" | null>(null)
  const [showResult, setShowResult] = useState(false)
  
  const hasStarted = useRef(false)

  useEffect(() => {
    if (winnerId && !hasStarted.current) {
      hasStarted.current = true
      setIsFlipping(true)
      
      // Sequence: Flip (3s) -> Land (0.5s) -> Show Result (4s) -> Complete
      setTimeout(() => {
        setResult(winnerId === hostId ? "host" : "guest")
        setTimeout(() => {
          setIsFlipping(false)
          setShowResult(true)
          playSound("coin_land") // Metallic clink on landing
          setTimeout(() => {
            onCoinFlipComplete(winnerId)
          }, 4000)
        }, 500)
      }, 3000)
    }
  }, [winnerId, hostId, onCoinFlipComplete])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full max-w-4xl mx-auto animate-fade-in relative overflow-hidden rounded-xl bg-black/40 border border-white/5 backdrop-blur-sm">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] opacity-50" />
      {showResult && result === "guest" && (
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15)_0%,transparent_70%)] transition-colors duration-1000" />
      )}

      <div className="relative z-10 w-full p-8 flex flex-col items-center">
        
        {/* Title */}
        <div className="text-center mb-12">
           <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 block mb-2">Pre-Match Protocol</span>
           <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white drop-shadow-lg">
              Coin Toss
           </h2>
        </div>

        <div className="flex items-center justify-between w-full max-w-2xl gap-12">
          
          {/* HOST SIDE (BLUE) */}
          <div className={cn(
            "flex-1 flex flex-col items-center p-6 rounded-xl border transition-all duration-700 relative",
            result === "host" && showResult 
               ? "bg-blue-900/20 border-blue-500 shadow-[0_0_50px_-10px_rgba(59,130,246,0.5)] scale-110 z-10" 
               : "bg-transparent border-white/5 opacity-50 grayscale"
          )}>
            <div className={cn(
               "w-20 h-20 rounded-full border-2 p-1 mb-4 transition-colors",
               result === "host" && showResult ? "border-blue-400" : "border-white/10"
            )}>
               <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <User className="h-8 w-8 text-blue-400" />
               </div>
            </div>
            <h3 className="text-xl font-bold text-blue-100 mb-1">{hostName}</h3>
            <span className="text-[10px] uppercase tracking-widest text-blue-400/60 font-bold">Heads</span>
            
            {result === "host" && showResult && (
               <div className="absolute -top-4 -right-4">
                  <Badge className="bg-blue-500 text-white border-none shadow-lg px-3 py-1">FIRST PICK</Badge>
               </div>
            )}
          </div>

          {/* THE COIN */}
          <div className="relative w-40 h-40 perspective-[1000px]">
             <div className={cn(
                "w-full h-full relative preserve-3d transition-transform duration-300",
                isFlipping && "animate-toss-3d",
                !isFlipping && showResult && (result === "host" ? "rotate-y-0" : "rotate-y-180")
             )}>
                {/* HEADS (HOST/BLUE) */}
                <div className="absolute inset-0 backface-hidden rounded-full border-[6px] border-[#d4af37] bg-gradient-to-br from-blue-900 to-black shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] flex items-center justify-center">
                   <div className="absolute inset-0 rounded-full border border-white/20" />
                   <Crown className="h-16 w-16 text-[#ffd700] drop-shadow-md" />
                </div>

                {/* TAILS (GUEST/RED) */}
                <div className="absolute inset-0 backface-hidden rounded-full border-[6px] border-[#c0c0c0] bg-gradient-to-br from-red-900 to-black shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] flex items-center justify-center rotate-y-180">
                   <div className="absolute inset-0 rounded-full border border-white/20" />
                   <Swords className="h-16 w-16 text-[#e5e5e5] drop-shadow-md" />
                </div>
             </div>
             
             {/* Shadow underneath */}
             <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/50 blur-xl rounded-[100%] animate-pulse" />
          </div>

          {/* GUEST SIDE (RED) */}
          <div className={cn(
            "flex-1 flex flex-col items-center p-6 rounded-xl border transition-all duration-700 relative",
            result === "guest" && showResult 
               ? "bg-red-900/20 border-red-500 shadow-[0_0_50px_-10px_rgba(239,68,68,0.5)] scale-110 z-10" 
               : "bg-transparent border-white/5 opacity-50 grayscale"
          )}>
            <div className={cn(
               "w-20 h-20 rounded-full border-2 p-1 mb-4 transition-colors",
               result === "guest" && showResult ? "border-red-400" : "border-white/10"
            )}>
               <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <User className="h-8 w-8 text-red-400" />
               </div>
            </div>
            <h3 className="text-xl font-bold text-red-100 mb-1">{guestName}</h3>
            <span className="text-[10px] uppercase tracking-widest text-red-400/60 font-bold">Tails</span>

            {result === "guest" && showResult && (
               <div className="absolute -top-4 -right-4">
                  <Badge className="bg-red-500 text-white border-none shadow-lg px-3 py-1">FIRST PICK</Badge>
               </div>
            )}
          </div>

        </div>

        {/* Status Text */}
        <div className="mt-12 min-h-[60px] flex items-center justify-center">
            {isFlipping ? (
               <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                  <Loader2 className="h-4 w-4 animate-spin text-white/60" />
                  <span className="text-xs font-mono text-white/60 uppercase tracking-widest">Coin is in the air...</span>
               </div>
            ) : showResult ? (
               <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="text-2xl font-black italic uppercase text-white mb-1">
                     {result === "host" ? hostName : guestName} Starts First
                  </h3>
                  <p className="text-xs text-white/50 uppercase tracking-widest">Initiating Draft Phase...</p>
               </div>
            ) : null}
        </div>

      </div>

      <style jsx global>{`
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-0 { transform: rotateY(0deg); }
        .rotate-y-180 { transform: rotateY(180deg); }
        
        @keyframes toss-3d {
          0% { transform: translateY(0) rotateY(0); }
          50% { transform: translateY(-200px) rotateY(900deg) scale(1.5); }
          100% { transform: translateY(0) rotateY(1800deg) scale(1); } /* Ends on Heads/0deg logically, specific result set by class */
        }
        .animate-toss-3d { animation: toss-3d 3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}</style>
    </div>
  )
}