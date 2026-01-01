"use client"

import { useEffect, useRef, useCallback, useState } from "react"

interface UseDraftNotificationsProps {
  isMyTurn: boolean
  enabled?: boolean
  soundEnabled?: boolean
  vibrationEnabled?: boolean
}

interface NotificationPermission {
  granted: boolean
  denied: boolean
  default: boolean
}

export function useDraftNotifications({
  isMyTurn,
  enabled = true,
  soundEnabled = true,
  vibrationEnabled = true,
}: UseDraftNotificationsProps) {
  const previousIsMyTurn = useRef(isMyTurn)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [permission, setPermission] = useState<NotificationPermission>({
    granted: false,
    denied: false,
    default: true,
  })

  // Initialize audio
  useEffect(() => {
    if (typeof window !== "undefined" && soundEnabled) {
      audioRef.current = new Audio("/sounds/turn-notification.mp3")
      audioRef.current.volume = 0.5
    }
    return () => {
      if (audioRef.current) {
        audioRef.current = null
      }
    }
  }, [soundEnabled])

  // Check notification permission on mount
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      const perm = Notification.permission
      setPermission({
        granted: perm === "granted",
        denied: perm === "denied",
        default: perm === "default",
      })
    }
  }, [])

  const requestPermission = useCallback(async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return false
    }

    try {
      const result = await Notification.requestPermission()
      setPermission({
        granted: result === "granted",
        denied: result === "denied",
        default: result === "default",
      })
      return result === "granted"
    } catch {
      return false
    }
  }, [])

  const playSound = useCallback(() => {
    if (audioRef.current && soundEnabled) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {
        // Audio play failed, likely due to autoplay policy
      })
    }
  }, [soundEnabled])

  const vibrate = useCallback(() => {
    if (vibrationEnabled && typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate([200, 100, 200])
    }
  }, [vibrationEnabled])

  const showBrowserNotification = useCallback(
    (title: string, body: string) => {
      if (
        typeof window === "undefined" ||
        !("Notification" in window) ||
        Notification.permission !== "granted" ||
        !enabled
      ) {
        return
      }

      // Only show if page is not visible
      if (document.visibilityState === "hidden") {
        const notification = new Notification(t("turnNotification"), {
          body: t("itsYourTurn"),
          icon: "/images/logo-mini.png",
          badge: "/images/logo-mini.png",
        });

        notification.onclick = () => {
          window.focus()
          notification.close()
        }

        // Auto close after 5 seconds
        setTimeout(() => notification.close(), 5000)
      }
    },
    [enabled],
  )

  // Detect turn change and trigger notifications
  useEffect(() => {
    if (!enabled) return

    // Turn changed from not-my-turn to my-turn
    if (isMyTurn && !previousIsMyTurn.current) {
      playSound()
      vibrate()
      showBrowserNotification("¡Es tu turno!", "Tu oponente ha terminado. Es tu momento de elegir.")
    }

    previousIsMyTurn.current = isMyTurn
  }, [isMyTurn, enabled, playSound, vibrate, showBrowserNotification])

  return {
    permission,
    requestPermission,
    playSound,
    vibrate,
    showBrowserNotification,
  }
}
