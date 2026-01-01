"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Crown, Trophy, Swords, Calendar, MapPin, User, Settings, Medal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"
import { cn } from "@/lib/utils"

export function ProfileHeader({ profile, isOwn }: { profile: any, isOwn: boolean }) {
  const { t } = useLanguage()

  return (
    <Card className="bg-[#0a0a0b]/80 border-2 border-yellow-500/20 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] relative">
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 pointer-events-none" />
      <div className="h-32 w-full bg-gradient-to-r from-yellow-600/20 via-yellow-900/40 to-black/20" />
      
      <CardContent className="px-10 pb-10 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row items-end gap-8">
          <Avatar className="h-32 w-32 border-4 border-[#020202] shadow-2xl rounded-3xl">
            <AvatarImage src={profile?.avatar_url} />
            <AvatarFallback className="bg-yellow-600 text-black text-4xl font-black italic">
              {profile?.username?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 pb-2">
            <div className="flex items-center gap-4 mb-2">
               <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white drop-shadow-xl">{profile?.username || "Commander"}</h1>
               <Badge className="bg-yellow-600 text-black font-black uppercase italic text-[10px] tracking-widest">OFFICIAL RANKED</Badge>
            </div>
            <div className="flex flex-wrap gap-6 text-white/40 uppercase font-bold text-[10px] tracking-widest">
               <div className="flex items-center gap-2"><MapPin className="h-3 w-3 text-yellow-500" /> Regional Sector: Global</div>
               <div className="flex items-center gap-2"><Calendar className="h-3 w-3 text-yellow-500" /> Joined: DEC 2025</div>
            </div>
          </div>

          <div className="flex gap-4">
             {isOwn && (
               <Button className="h-12 bg-yellow-600 hover:bg-yellow-500 text-black font-black uppercase italic tracking-widest rounded-xl px-8 shadow-lg">
                  <Settings className="h-4 w-4 mr-2" /> Adjust Protocol
               </Button>
             )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-10 border-t border-white/5">
           {[
             { label: "Engagements Won", val: profile?.tournaments_won || 0, icon: Trophy, color: "text-yellow-500" },
             { label: "Total Skirmishes", val: profile?.tournaments_played || 0, icon: Swords, color: "text-white/40" },
             { label: "Arena Prestige", val: "Elite", icon: Medal, color: "text-emerald-400" },
             { label: "Honor Score", val: "98%", icon: Crown, color: "text-yellow-500" },
           ].map((stat, i) => (
             <div key={i} className="flex flex-col items-center p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                <stat.icon className={cn("h-5 w-5 mb-2", stat.color)} />
                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">{stat.label}</span>
                <span className="text-xl font-black text-white italic tracking-tighter">{stat.val}</span>
             </div>
           ))}
        </div>
      </CardContent>
    </Card>
  )
}