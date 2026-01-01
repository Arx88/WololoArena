"use client"

import { useState } from "react"
import { UNIQUE_UNITS } from "@/lib/data/unique-units"
import { CIVILIZATIONS } from "@/lib/data/civilizations"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Star, Trophy, Users, Shield } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/language-context"
import { cn } from "@/lib/utils"

export function FavoriteCivs({ profile, isOwn }: { profile: any, isOwn: boolean }) {
  const { t } = useLanguage()
  const favs = profile?.favorite_civs || []

  return (
    <Card className="bg-[#0a0a0b]/60 border-2 border-white/5 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
      <CardHeader className="p-8 border-b border-white/5 bg-gradient-to-b from-yellow-500/5 to-transparent">
        <div className="flex items-center gap-4">
           <div className="h-12 w-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/30 shadow-inner">
              <Shield className="h-6 w-6 text-yellow-500" />
           </div>
           <div>
              <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-white">Preferred Civilizations</CardTitle>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Mastery Level & Specializations</p>
           </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        {favs.length === 0 ? (
          <div className="py-12 text-center border-2 border-dashed border-white/5 rounded-2xl opacity-20 italic text-sm">
            No data recorded in the tactical database.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {favs.map((civId: string) => {
              const civ = CIVILIZATIONS.find(c => c.id === civId)
              if (!civ) return null
              return (
                <div key={civId} className="flex items-center gap-4 p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-yellow-500/30 transition-all group">
                   <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-white/10 group-hover:border-yellow-500/50 transition-all">
                      <Image src={civ.icon || "/placeholder.svg"} alt={civ.name} fill className="object-cover" />
                   </div>
                   <div>
                      <p className="font-black uppercase italic text-white tracking-tight">{civ.name}</p>
                      <Badge className="bg-yellow-600/10 text-yellow-500 text-[8px] font-black tracking-widest px-2 py-0">ELITE MASTERY</Badge>
                   </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}