"use client"

import { useState, useCallback, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coins, Swords, User, ShieldCheck, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/language-context"

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
  const [isFlipping, setIsFlipping] = useState(false)
  const [result, setResult] = useState<"host" | "guest" | null>(null)
  const [showResult, setShowResult] = useState(false)

  // Automatic Flip Logic
  useEffect(() => {
    if (winnerId && !isFlipping && !result) {
      setIsFlipping(true)

      // Animation sequence: 3s toss + 0.5s settle + 4s result
      const timer = setTimeout(() => {
        const flipResult = winnerId === hostId ? "host" : "guest"
        setResult(flipResult)

        setTimeout(() => {
          setIsFlipping(false)
          setShowResult(true)

          // Auto-advance after showing result for 4 seconds
          setTimeout(() => {
            onCoinFlipComplete(winnerId)
          }, 4000)
        }, 500)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [winnerId, hostId, onCoinFlipComplete, isFlipping, result])

  return (
    <div className="flex flex-col items-center justify-center py-12 w-full max-w-2xl mx-auto animate-fade-in">
      <Card className="w-full border-primary/40 bg-card/90 backdrop-blur-md shadow-2xl shadow-primary/10 overflow-hidden stone-texture">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        
        <CardContent className="p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-primary uppercase mb-2">{t("pickPriority")}</h2>
            <p className="text-muted-foreground">{t("determiningOrder")}</p>
          </div>

          <div className="relative flex items-center justify-between gap-8 mb-12">
            {/* Host Side */}
            <div
              className={cn(
                "flex-1 flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-500 relative",
                result === "host" && showResult
                  ? "border-primary bg-primary/10 scale-105 shadow-lg shadow-primary/20"
                  : result === "guest" && showResult
                    ? "border-transparent opacity-40 scale-95 grayscale"
                    : "border-border/40 bg-background/40",
              )}
            >
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors",
                result === "host" && showResult ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
              )}>
                <User className="h-8 w-8" />
              </div>
              <span className="font-bold text-lg text-center">{hostName}</span>
              {result === "host" && showResult && (
                <Badge className="mt-3 bg-primary text-primary-foreground animate-bounce uppercase">
                  {t("picksFirst")}
                </Badge>
              )}
            </div>

            {/* The Coin */}
            <div className="relative z-10 w-32 h-32 flex items-center justify-center">
              <div
                className={cn(
                  "w-24 h-24 rounded-full border-4 border-primary bg-gradient-to-b from-yellow-400 to-primary shadow-xl flex items-center justify-center transition-all duration-300",
                  isFlipping && "animate-toss",
                  showResult && "ring-4 ring-primary ring-offset-4 ring-offset-background"
                )}
              >
                <div className="relative w-full h-full flex items-center justify-center text-primary-foreground">
                  {!isFlipping && !showResult && <Coins className="h-12 w-12 drop-shadow-md" />}
                  {isFlipping && <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />}
                  {showResult && (
                    <div className="flex flex-col items-center animate-scale-in">
                      {result === "host" ? <ShieldCheck className="h-12 w-12" /> : <Swords className="h-12 w-12" />}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Glow effect */}
              {isFlipping && (
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
              )}
            </div>

            {/* Guest Side */}
            <div
              className={cn(
                "flex-1 flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-500 relative",
                result === "guest" && showResult
                  ? "border-primary bg-primary/10 scale-105 shadow-lg shadow-primary/20"
                  : result === "host" && showResult
                    ? "border-transparent opacity-40 scale-95 grayscale"
                    : "border-border/40 bg-background/40",
              )}
            >
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors",
                result === "guest" && showResult ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
              )}>
                <User className="h-8 w-8" />
              </div>
              <span className="font-bold text-lg text-center">{guestName}</span>
              {result === "guest" && showResult && (
                <Badge className="mt-3 bg-primary text-primary-foreground animate-bounce uppercase">
                  {t("picksFirst")}
                </Badge>
              )}
            </div>
          </div>

          {/* Action Area */}
          <div className="min-h-[80px] flex flex-col items-center justify-center">
            {isFlipping ? (
              <div className="text-center animate-pulse">
                <p className="text-2xl font-bold text-primary tracking-widest uppercase mb-2">{t("tossingCoin")}</p>
                <div className="flex justify-center">
                   <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              </div>
            ) : showResult ? (
              <div className="text-center animate-fade-in">
                <p className="text-2xl font-bold text-primary">
                  {result === "host" ? hostName : guestName} {t("picksFirst")}
                </p>
                <p className="text-sm text-muted-foreground mt-2 italic">{t("startingDraftShort")}</p>
              </div>
            ) : (
              <p className="text-muted-foreground italic">{t("waitingHostFlip")}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <style jsx global>{`
        @keyframes toss {
          0% { transform: translateY(0) rotateX(0); }
          50% { transform: translateY(-120px) rotateX(1080deg); scale: 1.2; }
          100% { transform: translateY(0) rotateX(2160deg); scale: 1; }
        }
        .animate-toss {
          animation: toss 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  )
}