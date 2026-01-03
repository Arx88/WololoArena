"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Shield, Sword, Target, Move, Heart, Eye, Clock, Hammer } from "lucide-react"
import { cn } from "@/lib/utils"
import { getEntityStats } from "@/lib/data/aoe2-data-provider"

export function UnitTooltip({ unitId, civName }: { unitId: string, civName: string }) {
  const data = getEntityStats(unitId);

  if (!data) return null;

  const cost = data.Cost || {};

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="w-[320px] bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[300] pointer-events-none ring-1 ring-black/50"
    >
      {/* HEADER: NAME & COST */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-900/50 p-4 border-b border-white/5">
        <h3 className="text-sm font-black uppercase tracking-widest text-yellow-500 mb-2 drop-shadow-sm">
          {data.internal_name}
        </h3>
        
        {/* Cost Bar */}
        <div className="flex flex-wrap gap-2">
            {cost.Food !== undefined && <ResourcePill type="food" value={cost.Food} />}
            {cost.Wood !== undefined && <ResourcePill type="wood" value={cost.Wood} />}
            {cost.Gold !== undefined && <ResourcePill type="gold" value={cost.Gold} />}
            {cost.Stone !== undefined && <ResourcePill type="stone" value={cost.Stone} />}
        </div>
      </div>

      {/* BODY: STATS */}
      <div className="p-4 space-y-4">
        
        {/* Main Stats Grid */}
        <div className="grid grid-cols-3 gap-2">
            {data.HP !== undefined && <StatCompact icon={<Heart size={14} className="text-emerald-500" />} label="Hitpoints" value={data.HP} />}
            {data.Attack !== undefined && <StatCompact icon={<Sword size={14} className="text-red-500" />} label="Attack" value={data.Attack} />}
            {(data.MeleeArmor !== undefined || data.PierceArmor !== undefined) && 
                <StatCompact icon={<Shield size={14} className="text-blue-500" />} label="Armor" value={`${data.MeleeArmor || 0} / ${data.PierceArmor || 0}`} />
            }
            {data.Range !== undefined && <StatCompact icon={<Target size={14} className="text-orange-500" />} label="Range" value={data.Range} />}
            {data.Speed !== undefined && <StatCompact icon={<Move size={14} className="text-cyan-500" />} label="Speed" value={data.Speed} />}
            {data.LineOfSight !== undefined && <StatCompact icon={<Eye size={14} className="text-purple-500" />} label="LOS" value={data.LineOfSight} />}
        </div>

        {/* Secondary Info */}
        <div className="pt-3 border-t border-white/5 grid grid-cols-2 gap-y-1 gap-x-4">
            {data.TrainTime && (
                <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span className="flex items-center gap-1.5"><Clock size={12} /> Train Time</span>
                    <span className="font-mono text-zinc-200">{data.TrainTime}s</span>
                </div>
            )}
            {data.ReloadTime && (
                <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span className="flex items-center gap-1.5"><Hammer size={12} /> Reload</span>
                    <span className="font-mono text-zinc-200">{data.ReloadTime}s</span>
                </div>
            )}
        </div>
        
        {/* ID Debug (Optional, subtle) */}
        <div className="text-[9px] text-zinc-700 text-right font-mono mt-1">ID: {data.ID}</div>
      </div>
    </motion.div>
  )
}

function ResourcePill({ type, value }: { type: 'food' | 'wood' | 'gold' | 'stone', value: number }) {
    const colors = {
        food: "bg-orange-500/10 text-orange-200 border-orange-500/20",
        wood: "bg-emerald-500/10 text-emerald-200 border-emerald-500/20",
        gold: "bg-yellow-500/10 text-yellow-200 border-yellow-500/20",
        stone: "bg-zinc-500/10 text-zinc-200 border-zinc-500/20"
    };

    return (
        <div className={cn("flex items-center gap-1.5 px-2 py-1 rounded-md border text-[10px] font-bold uppercase", colors[type])}>
            <img src={`/images/techtree/RECURSOS/${type}.png`} className="w-3.5 h-3.5 object-contain" alt={type} />
            {value}
        </div>
    )
}

function StatCompact({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
    return (
        <div className="bg-white/5 rounded-lg p-2 flex flex-col items-center justify-center gap-1 border border-white/5">
            <div className="flex items-center gap-1.5 opacity-80">
                {icon}
                <span className="text-[9px] font-bold uppercase text-zinc-500">{label}</span>
            </div>
            <span className="text-lg font-black text-zinc-100 leading-none">{value}</span>
        </div>
    )
}
