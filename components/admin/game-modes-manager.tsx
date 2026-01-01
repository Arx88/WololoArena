"use client"

import { useState } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { GameModeConfig } from "@/lib/types/admin"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/language-context"

interface GameModesManagerProps {
  modes: GameModeConfig[]
  onUpdate: (modes: GameModeConfig[]) => void
}

export function GameModesManager({ modes, onUpdate }: GameModesManagerProps) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [search, setSearch] = useState("")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingMode, setEditingMode] = useState<GameModeConfig | null>(null)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    icon: "/placeholder.svg?height=48&width=48",
  })
  const [isLoading, setIsLoading] = useState(false)

  const filteredModes = modes.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      description: "",
      icon: "/placeholder.svg?height=48&width=48",
    })
  }

  const handleAdd = async () => {
    if (!formData.id || !formData.name) return
    setIsLoading(true)

    const supabase = getSupabaseClient()
    if (!supabase) {
      toast({ title: t("connectionError"), variant: "destructive" })
      setIsLoading(false)
      return
    }

    const { data, error } = await supabase
      .from("game_modes")
      .insert({
        id: formData.id.toLowerCase().replace(/\s+/g, "_"),
        name: formData.name,
        description: formData.description || null,
        icon: formData.icon,
        is_active: true,
      })
      .select()
      .single()

    if (error) {
      toast({ title: t("saveError"), description: error.message, variant: "destructive" })
    } else if (data) {
      onUpdate([...modes, data])
      resetForm()
      setIsAddOpen(false)
      toast({ title: t("modeAdded") })
    }
    setIsLoading(false)
  }

  const handleUpdate = async () => {
    if (!editingMode) return
    setIsLoading(true)

    const supabase = getSupabaseClient()
    if (!supabase) {
      toast({ title: t("connectionError"), variant: "destructive" })
      setIsLoading(false)
      return
    }

    const { data, error } = await supabase
      .from("game_modes")
      .update({
        name: formData.name,
        description: formData.description || null,
        icon: formData.icon,
      })
      .eq("id", editingMode.id)
      .select()
      .single()

    if (error) {
      toast({ title: t("saveError"), description: error.message, variant: "destructive" })
    } else if (data) {
      onUpdate(modes.map((m) => (m.id === editingMode.id ? data : m)))
      setEditingMode(null)
      resetForm()
      toast({ title: t("modeUpdated") })
    }
    setIsLoading(false)
  }

  const handleToggleActive = async (mode: GameModeConfig) => {
    const supabase = getSupabaseClient()
    if (!supabase) return

    const { error } = await supabase.from("game_modes").update({ is_active: !mode.is_active }).eq("id", mode.id)

    if (!error) {
      onUpdate(modes.map((m) => (m.id === mode.id ? { ...m, is_active: !m.is_active } : m)))
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm(t("deleteConfirm"))) return

    const supabase = getSupabaseClient()
    if (!supabase) return

    const { error } = await supabase.from("game_modes").delete().eq("id", id)

    if (!error) {
      onUpdate(modes.filter((m) => m.id !== id))
      toast({ title: t("modeDeleted") })
    } else {
      toast({ title: t("saveError"), variant: "destructive" })
    }
  }

  const openEdit = (mode: GameModeConfig) => {
    setEditingMode(mode)
    setFormData({
      id: mode.id,
      name: mode.name,
      description: mode.description || "",
      icon: mode.icon,
    })
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t("gameModes")}</CardTitle>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                {t("add")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("addGameMode")}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>{t("idUnique")}</Label>
                  <Input
                    value={formData.id}
                    onChange={(e) => setFormData((f) => ({ ...f, id: e.target.value }))}
                    placeholder="ej: random_map"
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t("name")}</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                    placeholder="ej: Random Map"
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t("description")}</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData((f) => ({ ...f, description: e.target.value }))}
                    placeholder="Descripcion del modo..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t("iconUrl")}</Label>
                  <Input value={formData.icon} onChange={(e) => setFormData((f) => ({ ...f, icon: e.target.value }))} />
                </div>
                <Button onClick={handleAdd} disabled={isLoading} className="w-full">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  {isLoading ? t("saving") : t("save")}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t("searchGameMode")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">{t("icon")}</TableHead>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("description")}</TableHead>
                <TableHead className="w-20">{t("active")}</TableHead>
                <TableHead className="w-24">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredModes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    {t("noGameModesFound")}
                  </TableCell>
                </TableRow>
              ) : (
                filteredModes.map((mode) => (
                  <TableRow key={mode.id} className={!mode.is_active ? "opacity-50" : ""}>
                    <TableCell>
                      <Image
                        src={mode.icon || "/placeholder.svg"}
                        alt={mode.name}
                        width={32}
                        height={32}
                        className="rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{mode.name}</TableCell>
                    <TableCell className="text-muted-foreground max-w-[300px] truncate">
                      {mode.description || "-"}
                    </TableCell>
                    <TableCell>
                      <Switch checked={mode.is_active} onCheckedChange={() => handleToggleActive(mode)} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(mode)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(mode.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Edit Dialog */}
        <Dialog open={!!editingMode} onOpenChange={(open) => !open && setEditingMode(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("editGameMode")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>{t("name")}</Label>
                <Input value={formData.name} onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>{t("description")}</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData((f) => ({ ...f, description: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("iconUrl")}</Label>
                <Input value={formData.icon} onChange={(e) => setFormData((f) => ({ ...f, icon: e.target.value }))} />
              </div>
              <Button onClick={handleUpdate} disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {isLoading ? t("saving") : t("saveChanges")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}