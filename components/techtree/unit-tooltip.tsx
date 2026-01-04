"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Shield, Sword, Target, Move, Heart, Eye, Clock, Hammer, BookOpen, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { getEntityStats } from "@/lib/data/aoe2-data-provider"
import { UNIT_DATABASE } from "./unit-database"

export function UnitTooltip({ unitId, civName }: { unitId: string, civName: string }) {
  const stats = getEntityStats(unitId);
  const extraData = UNIT_DATABASE[unitId];

  if (!stats && !extraData) return null;

  const cost = stats?.Cost || extraData?.cost || {};
  const name = extraData?.name || stats?.internal_name || "Unknown Entity";
  const description = extraData?.description || `Estadísticas para ${name}.`;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="w-[450px] bg-zinc-950/98 backdrop-blur-3xl border-2 border-white/10 rounded-[2.5rem] shadow-[0_40px_120px_rgba(0,0,0,1)] overflow-hidden z-[300] pointer-events-none ring-1 ring-white/10"
    >
      {/* HEADER: NAME & COST */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-black p-8 border-b border-white/5">
        <div className="flex justify-between items-start mb-6">
            <h3 className="text-3xl font-black uppercase tracking-tighter text-yellow-500 drop-shadow-xl leading-none">
              {name}
            </h3>
            <div className="text-[10px] font-mono text-zinc-600 bg-black/50 px-2.5 py-1.5 rounded-xl border border-white/5 uppercase tracking-tighter">ID: {unitId}</div>
        </div>
        
        {/* Cost Bar */}
        <div className="flex flex-wrap gap-3">
            {cost.Food > 0 && <ResourcePill type="food" value={cost.Food} />}
            {cost.Wood > 0 && <ResourcePill type="wood" value={cost.Wood} />}
            {cost.Gold > 0 && <ResourcePill type="gold" value={cost.Gold} />}
            {cost.Stone > 0 && <ResourcePill type="stone" value={cost.Stone} />}
        </div>
      </div>

      {/* BODY: INFO & STATS */}
      <div className="p-8 space-y-8">
        
        {/* Description */}
        <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 shadow-inner">
            <p className="text-[15px] font-bold text-zinc-200 leading-relaxed italic">
                {description}
            </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
            {stats?.HP !== undefined && <StatCompact icon={<Heart size={18} className="text-emerald-500" />} label="Vida" value={stats.HP} />}
            {stats?.Attack !== undefined && <StatCompact icon={<Sword size={18} className="text-red-500" />} label="Ataque" value={stats.Attack} />}
            {(stats?.MeleeArmor !== undefined || stats?.PierceArmor !== undefined) && 
                <StatCompact icon={<Shield size={18} className="text-blue-500" />} label="Armor" value={`${stats.MeleeArmor || 0}/${stats.PierceArmor || 0}`} />
            }
            {stats?.Range !== undefined && stats.Range > 0 && <StatCompact icon={<Target size={18} className="text-orange-500" />} label="Alcance" value={stats.Range} />}
            {stats?.Speed !== undefined && <StatCompact icon={<Move size={18} className="text-cyan-500" />} label="Vel." value={stats.Speed} />}
            {stats?.LineOfSight !== undefined && <StatCompact icon={<Eye size={18} className="text-purple-500" />} label="Visión" value={stats.LineOfSight} />}
        </div>

        {/* ADVANCED STATS: BONUSES */}
        {extraData?.advancedAttacks?.length > 0 && (
            <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-500/60 px-1">Bonificaciones de Daño</p>
                <div className="grid grid-cols-2 gap-2">
                    {extraData.advancedAttacks.map((atk: any, i: number) => (
                        <div key={i} className="flex justify-between items-center bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                            <span className="text-[11px] font-bold text-zinc-400">{atk.class}</span>
                            <span className="text-xs font-black text-yellow-500">+{atk.amount}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* ADVANCED STATS: ARMORS */}
        {extraData?.advancedArmors?.length > 0 && (
            <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500/60 px-1">Clases de Armadura</p>
                <div className="grid grid-cols-2 gap-2">
                    {extraData.advancedArmors.map((arm: any, i: number) => (
                        <div key={i} className="flex justify-between items-center bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                            <span className="text-[11px] font-bold text-zinc-400">{arm.class}</span>
                            <span className="text-xs font-black text-blue-400">{arm.amount}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Technical Info */}
        <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-x-10 gap-y-3">
            {stats?.TrainTime && <TechStat label="Tiempo Creación" value={`${stats.TrainTime}s`} />}
            {stats?.ReloadTime && <TechStat label="Vel. Ataque" value={`${stats.ReloadTime}s`} />}
            {stats?.AccuracyPercent && <TechStat label="Precisión" value={`${stats.AccuracyPercent}%`} />}
        </div>
      </div>
    </motion.div>
  )
}

function TechStat({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex justify-between items-center border-b border-white/[0.03] pb-1">
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-tight">{label}</span>
            <span className="text-xs font-black text-zinc-300">{value}</span>
        </div>
    )
}

function ResourcePill({ type, value }: { type: 'food' | 'wood' | 'gold' | 'stone', value: number }) {
    const colors = {
        food: "bg-orange-500/10 text-orange-200 border-orange-500/20 shadow-[0_4px_12px_rgba(249,115,22,0.1)]",
        wood: "bg-emerald-500/10 text-emerald-200 border-emerald-500/20 shadow-[0_4px_12px_rgba(16,185,129,0.1)]",
        gold: "bg-yellow-500/10 text-yellow-200 border-yellow-500/20 shadow-[0_4px_12px_rgba(234,179,8,0.1)]",
        stone: "bg-zinc-500/10 text-zinc-200 border-zinc-500/20 shadow-[0_4px_12px_rgba(113,113,122,0.1)]"
    };

    return (
        <div className={cn("flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[12px] font-black tracking-tight", colors[type])}>
            <img src={`/images/techtree/RECURSOS/${type}.png`} className="w-4 h-4 object-contain" alt={type} />
            {value}
        </div>
    )
}

function StatCompact({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
    return (
        <div className="bg-white/5 rounded-[1.5rem] p-3 flex flex-col items-center justify-center gap-1.5 border border-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-2 opacity-60">
                {icon}
                <span className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">{label}</span>
            </div>
            <span className="text-xl font-black text-white italic leading-none">{value}</span>
        </div>
    )
}
