import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Swords, Globe, Lock, Map } from "lucide-react"
import Link from "next/link"
import { SpectatorCounter } from "./spectator-counter"
import { NotificationSettings, type NotificationSettingsState } from "./notification-settings"
import { MAPS } from "@/lib/data/maps"
import { useLanguage } from "@/lib/i18n/language-context"
import { cn } from "@/lib/utils"

interface DraftHeaderProps {
  phase: string
  subtitle: string
  isMyTurn: boolean
  currentTurnName?: string
  draftId?: string
  visibility?: "public" | "private"
  finalMapId?: string | null
  onNotificationSettingsChange?: (settings: NotificationSettingsState) => void
  notificationPermissionGranted?: boolean
  onRequestNotificationPermission?: () => Promise<boolean>
}

export function DraftHeader({
  phase,
  subtitle,
  isMyTurn,
  currentTurnName,
  draftId,
  visibility = "private",
  finalMapId,
  onNotificationSettingsChange,
  notificationPermissionGranted = false,
  onRequestNotificationPermission,
}: DraftHeaderProps) {
  const { t } = useLanguage()
  const foundMap = finalMapId ? MAPS.find((m) => m.id === finalMapId) : null;
  const foundMapName = foundMap?.name;

  return (
    <div className="relative z-50 border-b border-white/10 bg-black/80 backdrop-blur-2xl shadow-2xl">
      <div className="mx-auto flex h-24 w-full items-center justify-between px-12">
        
        {/* Left: Draft Metadata */}
        <div className="flex items-center gap-8">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] leading-none">Session ID</span>
            <span className="text-sm font-mono font-bold text-white/80 tracking-widest leading-none uppercase">
              {draftId?.substring(0, 8) || "LOCAL-SIM"}
            </span>
          </div>
        </div>

        {/* Center: Instruction / Phase */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none w-full max-w-2xl">
          <h1 className="text-4xl font-black uppercase italic tracking-[0.15em] text-white font-cinzel leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            {phase}
          </h1>
          <p className={cn(
            "text-xs font-bold uppercase tracking-[0.5em] mt-3 transition-colors duration-300",
            isMyTurn ? "text-yellow-500 animate-pulse" : "text-white/40"
          )}>
            {isMyTurn ? "Action Required" : "Awaiting Strategy"}
          </p>
        </div>

        {/* Right: User Status & Tools */}
        <div className="flex items-center gap-8">
          {draftId && visibility === "public" && (
            <div className="flex items-center gap-3 px-4 py-2 bg-white/[0.03] border border-white/10 rounded-xl hover:bg-white/[0.05] transition-colors">
               <SpectatorCounter draftId={draftId} visibility={visibility} />
            </div>
          )}

          <div className="flex items-center gap-6">
            {onNotificationSettingsChange && onRequestNotificationPermission && (
              <NotificationSettings
                onSettingsChange={onNotificationSettingsChange}
                permissionGranted={notificationPermissionGranted}
                onRequestPermission={onRequestNotificationPermission}
              />
            )}
          </div>
        </div>

      </div>
    </div>
  )
}