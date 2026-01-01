"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Flame } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/i18n/language-context"
import { isDemoMode, getDemoUser } from "@/lib/demo/auth"
import { cn } from "@/lib/utils"

interface HypeButtonProps {
  tournamentId: string
  initialHypeCount?: number
  initialUserHyped?: boolean
  size?: "sm" | "default" | "lg"
  showCount?: boolean
  className?: string
  onHypeChange?: (newCount: number, userHyped: boolean) => void
}

const DEMO_HYPE_KEY = "demo_tournament_hype"

// Helper functions for demo mode
function getDemoHype(): Record<string, string[]> {
  if (typeof window === "undefined") return {}
  const stored = localStorage.getItem(DEMO_HYPE_KEY)
  if (!stored) return {}
  try {
    return JSON.parse(stored)
  } catch {
    return {}
  }
}

function setDemoHype(hype: Record<string, string[]>): void {
  if (typeof window === "undefined") return
  localStorage.setItem(DEMO_HYPE_KEY, JSON.stringify(hype))
}

export function HypeButton({
  tournamentId,
  initialHypeCount = 0,
  initialUserHyped = false,
  size = "default",
  showCount = true,
  className,
  onHypeChange,
}: HypeButtonProps) {
  const supabase = createClient()
  const { toast } = useToast()
  const { t } = useLanguage()

  const [hypeCount, setHypeCount] = useState(initialHypeCount)
  const [userHyped, setUserHyped] = useState(initialUserHyped)
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [isDemo, setIsDemo] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      if (isDemoMode()) {
        const demoUser = getDemoUser()
        setUserId(demoUser?.id || null)
        setIsDemo(true)

        // Load demo hype state
        const demoHype = getDemoHype()
        const tournamentHype = demoHype[tournamentId] || []
        setHypeCount(tournamentHype.length)
        if (demoUser) {
          setUserHyped(tournamentHype.includes(demoUser.id))
        }
        return
      }

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUserId(user?.id || null)

        if (user) {
          // Check if user has already hyped
          const { data } = await supabase
            .from("tournament_hype")
            .select("id")
            .eq("tournament_id", tournamentId)
            .eq("user_id", user.id)
            .single()

          setUserHyped(!!data)
        }

        // Get hype count
        const { count } = await supabase
          .from("tournament_hype")
          .select("*", { count: "exact", head: true })
          .eq("tournament_id", tournamentId)

        setHypeCount(count || 0)
      } catch {
        // Ignore errors
      }
    }

    checkUser()
  }, [tournamentId, supabase])

  const handleHype = async (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!userId) {
      toast({
        title: t("loginRequired"),
        description: t("loginToHype"),
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    if (isDemo) {
      await new Promise((resolve) => setTimeout(resolve, 300))

      const demoHype = getDemoHype()
      const tournamentHype = demoHype[tournamentId] || []

      if (userHyped) {
        // Remove hype
        demoHype[tournamentId] = tournamentHype.filter((id) => id !== userId)
        setHypeCount((prev) => prev - 1)
        setUserHyped(false)
        onHypeChange?.(hypeCount - 1, false)
      } else {
        // Add hype
        demoHype[tournamentId] = [...tournamentHype, userId]
        setHypeCount((prev) => prev + 1)
        setUserHyped(true)
        onHypeChange?.(hypeCount + 1, true)
        toast({
          title: "🔥 " + t("hypeAdded"),
          description: t("hypeAddedDesc"),
        })
      }

      setDemoHype(demoHype)
      setIsLoading(false)
      return
    }

    try {
      if (userHyped) {
        // Remove hype
        await supabase.from("tournament_hype").delete().eq("tournament_id", tournamentId).eq("user_id", userId)

        setHypeCount((prev) => prev - 1)
        setUserHyped(false)
        onHypeChange?.(hypeCount - 1, false)
      } else {
        // Add hype
        await supabase.from("tournament_hype").insert({ tournament_id: tournamentId, user_id: userId })

        setHypeCount((prev) => prev + 1)
        setUserHyped(true)
        onHypeChange?.(hypeCount + 1, true)
        toast({
          title: "🔥 " + t("hypeAdded"),
          description: t("hypeAddedDesc"),
        })
      }
    } catch (err) {
      console.error("Error toggling hype:", err)
      toast({
        title: t("error"),
        description: t("errorTogglingHype"),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const sizeClasses = {
    sm: "h-7 px-2 text-xs gap-1",
    default: "h-9 px-3 text-sm gap-1.5",
    lg: "h-11 px-4 text-base gap-2",
  }

  const iconSizes = {
    sm: "h-3 w-3",
    default: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <Button
      variant={userHyped ? "default" : "outline"}
      size="sm"
      onClick={handleHype}
      disabled={isLoading}
      className={cn(
        sizeClasses[size],
        userHyped
          ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0"
          : "hover:border-orange-500/50 hover:text-orange-500",
        "transition-all duration-300",
        isLoading && "opacity-70",
        className,
      )}
    >
      <Flame
        className={cn(
          iconSizes[size],
          userHyped && "fill-current animate-pulse",
          !userHyped && "group-hover:text-orange-500",
        )}
      />
      {showCount && <span className="font-semibold tabular-nums">{hypeCount > 0 ? hypeCount : ""}</span>}
      {!showCount && !userHyped && <span>+1</span>}
    </Button>
  )
}

// Export helper to get hype count for a tournament
export async function getTournamentHypeCount(
  tournamentId: string,
  supabase: ReturnType<typeof createClient>,
): Promise<number> {
  if (isDemoMode()) {
    const demoHype = getDemoHype()
    return (demoHype[tournamentId] || []).length
  }

  try {
    const { count } = await supabase
      .from("tournament_hype")
      .select("*", { count: "exact", head: true })
      .eq("tournament_id", tournamentId)

    return count || 0
  } catch {
    return 0
  }
}
