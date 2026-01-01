import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Swords, Globe, Lock, Map } from "lucide-react"
import Link from "next/link"
import { SpectatorCounter } from "./spectator-counter"
import { NotificationSettings, type NotificationSettingsState } from "./notification-settings"
import { MAPS } from "@/lib/data/maps"
import { useLanguage } from "@/lib/i18n/language-context"

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
    <header className="relative z-50 border-b border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo-mini.png" alt="AOE2 Wololo Arena" width={32} height={32} className="h-8 w-auto" />
          <span className="font-semibold text-primary">AOE2 Wololo Arena</span>
        </Link>

        <div className="flex flex-col items-center">
          <h1 className="text-lg font-bold">{phase}</h1>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          {onNotificationSettingsChange && onRequestNotificationPermission && (
            <NotificationSettings
              onSettingsChange={onNotificationSettingsChange}
              permissionGranted={notificationPermissionGranted}
              onRequestPermission={onRequestNotificationPermission}
            />
          )}
          <Badge variant="outline" className="gap-1.5 hidden sm:flex">
            {visibility === "public" ? (
              <>
                <Globe className="h-3 w-3" />
                <span>{t("public")}</span>
              </>
            ) : (
              <>
                <Lock className="h-3 w-3" />
                <span>{t("private")}</span>
              </>
            )}
          </Badge>
          {draftId && visibility === "public" && <SpectatorCounter draftId={draftId} visibility={visibility} />}
          {isMyTurn ? (
            <Badge className="animate-pulse-gold gap-1 bg-primary text-primary-foreground">
              <Swords className="h-3 w-3" />
              {t("yourTurnBadge")}
            </Badge>
          ) : (
            <Badge variant="secondary" className="gap-1">
              <Swords className="h-3 w-3" />
              {t("turnOfBadge", { name: currentTurnName || t("opponent") })}
            </Badge>
          )}
        </div>
      </div>
    </header>
  )
}