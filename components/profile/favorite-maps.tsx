"use client"

import { useState } from "react"
import Image from "next/image"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MAPS } from "@/lib/data/maps"
import { Map, Edit2, Save, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import type { Profile } from "@/lib/types/draft"
import { useLanguage } from "@/lib/i18n/language-context"
import { updateDemoProfile } from "@/lib/demo/demo-data"

interface FavoriteMapsProps {
  userId: string
  profile: Profile | null
  onProfileUpdate: (profile: Profile) => void
  isDemo?: boolean
}

export function FavoriteMaps({ userId, profile, onProfileUpdate, isDemo = false }: FavoriteMapsProps) {
  const { toast } = useToast()
  const { t } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [selected, setSelected] = useState<string[]>(profile?.favorite_maps || [])
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = (mapId: string) => {
    if (selected.includes(mapId)) {
      setSelected(selected.filter((id) => id !== mapId))
    } else if (selected.length < 5) {
      setSelected([...selected, mapId])
    }
  }

  const handleSave = async () => {
    setIsLoading(true)

    if (isDemo) {
      await new Promise((r) => setTimeout(r, 300))
      const updated = updateDemoProfile(userId, { favorite_maps: selected })
      if (updated) {
        onProfileUpdate(updated)
        setIsEditing(false)
        toast({
          title: t("saved"),
          description: t("favoriteMapsUpdated"),
        })
      }
      setIsLoading(false)
      return
    }

    try {
      const supabase = getSupabaseClient()
      if (!supabase) {
        toast({
          title: t("connectionError"),
          description: t("databaseConnectionError"),
          variant: "destructive",
        })
        return
      }

      const { data, error } = await supabase
        .from("profiles")
        .update({ favorite_maps: selected, updated_at: new Date().toISOString() })
        .eq("id", userId)
        .select()
        .single()

      if (error) throw error

      onProfileUpdate(data)
      setIsEditing(false)
      toast({
        title: t("saved"),
        description: t("favoriteMapsUpdated"),
      })
    } catch (err) {
      console.error("Failed to save favorites:", err)
      toast({
        title: t("saveError"),
        description: t("couldNotSaveChanges"),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setSelected(profile?.favorite_maps || [])
    setIsEditing(false)
  }

  const favoriteMapsData = (profile?.favorite_maps || []).map((id) => MAPS.find((m) => m.id === id)).filter(Boolean)

  return (
    <Card className="bg-[#0a0a0b]/80 border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Map className="h-5 w-5 text-primary" />
          {t("favoriteMaps")}
        </CardTitle>
        {!isEditing ? (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-1 bg-transparent">
            <Edit2 className="h-4 w-4" />
            {t("edit")}
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleSave}
              className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {t("save")}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              className="gap-1 bg-transparent"
              disabled={isLoading}
            >
              <X className="h-4 w-4" />
              {t("cancel")}
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t("selectUpTo5Maps", { current: selected.length })}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {MAPS.map((map) => {
                const isSelected = selected.includes(map.id)
                return (
                  <button
                    key={map.id}
                    onClick={() => handleToggle(map.id)}
                    className={cn(
                      "group relative rounded-lg border-2 overflow-hidden transition-all",
                      isSelected ? "border-primary ring-2 ring-primary/30" : "border-border/50",
                      !isSelected && selected.length >= 5 ? "cursor-not-allowed opacity-50" : "cursor-pointer",
                      !isSelected && selected.length < 5 && "hover:border-primary/50",
                    )}
                    disabled={!isSelected && selected.length >= 5}
                  >
                    <div className="aspect-video relative">
                      <Image
                        src={map.image || "/placeholder.svg"}
                        alt={map.name}
                        fill
                        className={cn("object-cover transition-transform group-hover:scale-105")}
                      />
                      {isSelected && (
                        <div className="absolute inset-0 flex items-center justify-center bg-primary/30">
                          <Map className="h-8 w-8 text-white drop-shadow-lg" />
                        </div>
                      )}
                    </div>
                    <div className="p-2 bg-card/80 backdrop-blur-sm text-left">
                      <p className="text-xs font-medium truncate">{map.name}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ) : favoriteMapsData.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {favoriteMapsData.map((map) => (
              <div key={map!.id} className="group relative rounded-lg border border-primary/30 overflow-hidden">
                <div className="aspect-video relative">
                  <Image src={map!.image || "/placeholder.svg"} alt={map!.name} fill className="object-cover" />
                </div>
                <div className="p-2 bg-primary/5 backdrop-blur-sm">
                  <p className="text-xs font-medium truncate">{map!.name}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            {t("noFavoriteMapsSelected")}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
