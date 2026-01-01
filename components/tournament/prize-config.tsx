"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trophy, Medal, Award, Gift, DollarSign } from "lucide-react"
import type { TournamentPrizes, Currency } from "@/lib/types/draft"
import { useLanguage } from "@/lib/i18n/language-context"
import { cn } from "@/lib/utils"

interface PrizeConfigProps {
  prizes: TournamentPrizes
  onChange: (prizes: TournamentPrizes) => void
}

export function PrizeConfig({ prizes, onChange }: PrizeConfigProps) {
  const { t } = useLanguage()

  const CURRENCIES: { value: Currency; label: string; symbol: string }[] = [
    { value: "USD", label: "US Dollar", symbol: "$" },
    { value: "EUR", label: "Euro", symbol: "€" },
    { value: "GBP", label: "British Pound", symbol: "£" },
    { value: "ARS", label: "Peso Argentino", symbol: "$" },
    { value: "BRL", label: "Real Brasileño", symbol: "R$" },
    { value: "MXN", label: "Peso Mexicano", symbol: "$" },
    { value: "CLP", label: "Peso Chileno", symbol: "$" },
    { value: "COP", label: "Peso Colombiano", symbol: "$" },
    { value: "PEN", label: "Sol Peruano", symbol: "S/" },
  ]

  const PLACE_LABELS: Record<number, string> = {
    1: "🥇 FIRST PLACE",
    2: "🥈 SECOND PLACE",
    3: "🥉 THIRD PLACE",
  }

  const handlePrizeChange = (index: number, field: string, value: any) => {
    const newPrizes = [...prizes.prizes]
    newPrizes[index] = { ...newPrizes[index], [field]: value }
    onChange({ ...prizes, prizes: newPrizes })
  }

  const handleCountChange = (count: number) => {
    let newPrizes = [...prizes.prizes]
    if (count > newPrizes.length) {
      for (let i = newPrizes.length + 1; i <= count; i++) {
        newPrizes.push({ place: i as 1 | 2 | 3, type: "money", currency: "USD", amount: 0 })
      }
    } else {
      newPrizes = newPrizes.slice(0, count)
    }
    onChange({ ...prizes, prize_count: count, prizes: newPrizes })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-500/60 ml-1">Prize Distribution</Label>
        <Select value={prizes.prize_count.toString()} onValueChange={(v) => handleCountChange(parseInt(v))}>
          <SelectTrigger className="h-14 bg-black/60 border-2 border-white/10 rounded-2xl px-6 text-base font-bold text-white focus:border-yellow-500 transition-all shadow-inner">
            <SelectValue placeholder="Select Number of Prizes" />
          </SelectTrigger>
          <SelectContent className="bg-[#0a0a0b] border-white/10">
            {[1, 2, 3].map((n) => (
              <SelectItem key={n} value={n.toString()} className="h-12 focus:bg-yellow-600 focus:text-black font-bold uppercase text-xs">
                {n} {n === 1 ? "AWARD WINNER" : "TOP WINNERS"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {prizes.prizes.map((prize, idx) => (
          <Card key={idx} className="relative bg-black/40 border-2 border-white/5 rounded-2xl overflow-hidden group hover:border-yellow-500/30 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 text-yellow-500 font-black italic">
                    #{prize.place}
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-white/80 italic">{PLACE_LABELS[prize.place] || `${prize.place}º PLACE`}</span>
                </div>
                <div className="flex bg-black/60 p-1 rounded-xl border border-white/10">
                   <button type="button" onClick={() => handlePrizeChange(idx, "type", "money")} className={cn("px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", prize.type === 'money' ? "bg-yellow-600 text-black" : "text-white/40")}>Cash</button>
                   <button type="button" onClick={() => handlePrizeChange(idx, "type", "other")} className={cn("px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", prize.type === 'other' ? "bg-yellow-600 text-black" : "text-white/40")}>Other</button>
                </div>
              </div>

              <div className="space-y-4">
                {prize.type === "money" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1">Currency</Label>
                      <Select value={prize.currency || "USD"} onValueChange={(v) => handlePrizeChange(idx, "currency", v)}>
                        <SelectTrigger className="h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm font-bold text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0a0a0b] border-white/10">
                          {CURRENCIES.map((c) => (
                            <SelectItem key={c.value} value={c.value} className="text-xs font-bold uppercase">{c.label} ({c.symbol})</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1">Amount</Label>
                      <div className="relative group">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-yellow-500/40 group-focus-within:text-yellow-500" />
                        <Input
                          type="number"
                          min={0}
                          value={prize.amount || ""}
                          onChange={(e) => handlePrizeChange(idx, "amount", parseInt(e.target.value) || 0)}
                          placeholder="0.00"
                          className="h-12 bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 text-base font-bold text-white focus:border-yellow-500 transition-all shadow-inner"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1">Prize Specification</Label>
                    <Input
                      value={prize.description || ""}
                      onChange={(e) => handlePrizeChange(idx, "description", e.target.value)}
                      placeholder="e.g. Steam Gift Card, Custom Trophy..."
                      className="h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm font-bold text-white focus:border-yellow-500 transition-all shadow-inner"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
