"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Bell, BellOff, Volume2, VolumeX, Vibrate } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

interface NotificationSettingsProps {
  onSettingsChange: (settings: NotificationSettingsState) => void
  permissionGranted: boolean
  onRequestPermission: () => Promise<boolean>
}

export interface NotificationSettingsState {
  enabled: boolean
  soundEnabled: boolean
  vibrationEnabled: boolean
}

export function NotificationSettings({
  onSettingsChange,
  permissionGranted,
  onRequestPermission,
}: NotificationSettingsProps) {
  const { t } = useLanguage()
  const [settings, setSettings] = useState<NotificationSettingsState>({
    enabled: true,
    soundEnabled: true,
    vibrationEnabled: true,
  })
  const [isOpen, setIsOpen] = useState(false)

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("draft-notification-settings")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setSettings(parsed)
        onSettingsChange(parsed)
      } catch {
        // Invalid JSON, use defaults
      }
    }
  }, [onSettingsChange])

  const updateSettings = (key: keyof NotificationSettingsState, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    localStorage.setItem("draft-notification-settings", JSON.stringify(newSettings))
    onSettingsChange(newSettings)
  }

  const handleRequestPermission = async () => {
    const granted = await onRequestPermission()
    if (granted) {
      updateSettings("enabled", true)
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative bg-transparent">
          {settings.enabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4 text-muted-foreground" />}
          {settings.enabled && <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end">
        <div className="space-y-4">
          <div className="space-y-1">
            <h4 className="font-medium">{t("notificationSettings")}</h4>
            <p className="text-xs text-muted-foreground">{t("notificationSettingsDesc")}</p>
          </div>

          {!permissionGranted && (
            <div className="rounded-lg border border-amber-500/50 bg-amber-500/10 p-3">
              <p className="text-xs text-amber-500 mb-2">{t("notificationPermissionRequired")}</p>
              <Button size="sm" variant="outline" onClick={handleRequestPermission} className="w-full bg-transparent">
                <Bell className="mr-2 h-3 w-3" />
                {t("enableNotifications")}
              </Button>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="notifications" className="text-sm">
                  {t("browserNotifications")}
                </Label>
              </div>
              <Switch
                id="notifications"
                checked={settings.enabled && permissionGranted}
                onCheckedChange={(checked) => updateSettings("enabled", checked)}
                disabled={!permissionGranted}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {settings.soundEnabled ? (
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <VolumeX className="h-4 w-4 text-muted-foreground" />
                )}
                <Label htmlFor="sound" className="text-sm">
                  {t("soundAlerts")}
                </Label>
              </div>
              <Switch
                id="sound"
                checked={settings.soundEnabled}
                onCheckedChange={(checked) => updateSettings("soundEnabled", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Vibrate className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="vibration" className="text-sm">
                  {t("vibration")}
                </Label>
              </div>
              <Switch
                id="vibration"
                checked={settings.vibrationEnabled}
                onCheckedChange={(checked) => updateSettings("vibrationEnabled", checked)}
              />
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center">{t("notificationsOnlyWhenHidden")}</p>
        </div>
      </PopoverContent>
    </Popover>
  )
}
