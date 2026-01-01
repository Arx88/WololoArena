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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { MapConfig } from "@/lib/types/admin"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/language-context"

interface MapsManagerProps {
  maps: MapConfig[]
  onUpdate: (maps: MapConfig[]) => void
}

export function MapsManager({ maps, onUpdate }: MapsManagerProps) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [search, setSearch] = useState("")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingMap, setEditingMap] = useState<MapConfig | null>(null)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "land" as const,
    description: "",
    image: "/placeholder.svg?height=120&width=200",
  })
  const [isLoading, setIsLoading] = useState(false)

  const CATEGORIES = [
    { value: "land", label: t("land"), color: "bg-green-500/20 text-green-500" },
    { value: "water", label: t("water"), color: "bg-blue-500/20 text-blue-500" },
    { value: "hybrid", label: t("hybrid"), color: "bg-purple-500/20 text-purple-500" },
    { value: "special", label: t("special"), color: "bg-orange-500/20 text-orange-500" },
  ]

  const filteredMaps = maps.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase()),
  )

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      category: "land",
      description: "",
      image: "/placeholder.svg?height=120&width=200",
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
      .from("maps")
      .insert({
        id: formData.id.toLowerCase().replace(/\s+/g, "_"),
        name: formData.name,
        category: formData.category,
        description: formData.description || null,
        image: formData.image,
        is_active: true,
      })
      .select()
      .single()

    if (error) {
      toast({ title: t("saveError"), description: error.message, variant: "destructive" })
    } else if (data) {
      onUpdate([...maps, data])
      resetForm()
      setIsAddOpen(false)
      toast({ title: t("mapAdded") })
    }
    setIsLoading(false)
  }

  const handleUpdate = async () => {
    if (!editingMap) return
    setIsLoading(true)

    const supabase = getSupabaseClient()
    if (!supabase) {
      toast({ title: t("connectionError"), variant: "destructive" })
      setIsLoading(false)
      return
    }

    const { data, error } = await supabase
      .from("maps")
      .update({
        name: formData.name,
        category: formData.category,
        description: formData.description || null,
        image: formData.image,
      })
      .eq("id", editingMap.id)
      .select()
      .single()

    if (error) {
      toast({ title: t("saveError"), description: error.message, variant: "destructive" })
    } else if (data) {
      onUpdate(maps.map((m) => (m.id === editingMap.id ? data : m)))
      setEditingMap(null)
      resetForm()
      toast({ title: t("mapUpdated") })
    }
    setIsLoading(false)
  }

  const handleToggleActive = async (map: MapConfig) => {
    const supabase = getSupabaseClient()
    if (!supabase) return

    const { error } = await supabase.from("maps").update({ is_active: !map.is_active }).eq("id", map.id)

    if (!error) {
      onUpdate(maps.map((m) => (m.id === map.id ? { ...m, is_active: !m.is_active } : m)))
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm(t("deleteConfirm"))) return

    const supabase = getSupabaseClient()
    if (!supabase) return

    const { error } = await supabase.from("maps").delete().eq("id", id)

    if (!error) {
      onUpdate(maps.filter((m) => m.id !== id))
      toast({ title: t("mapDeleted") })
    } else {
      toast({ title: t("saveError"), variant: "destructive" })
    }
  }

  const openEdit = (map: MapConfig) => {
    setEditingMap(map)
    setFormData({
      id: map.id,
      name: map.name,
      category: map.category,
      description: map.description || "",
      image: map.image,
    })
  }

  const getCategoryBadge = (category: string) => {
    const cat = CATEGORIES.find((c) => c.value === category)
    return cat ? (
      <Badge variant="secondary" className={cat.color}>
        {cat.label}
      </Badge>
    ) : (
      category
    )
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t("maps")}</CardTitle>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                {t("add")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("addMap")}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>{t("idUnique")}</Label>
                  <Input
                    value={formData.id}
                    onChange={(e) => setFormData((f) => ({ ...f, id: e.target.value }))}
                    placeholder={t("idExample")}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t("name")}</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                    placeholder={t("nameExample")}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t("category")}</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(v: "land" | "water" | "hybrid" | "special") =>
                      setFormData((f) => ({ ...f, category: v }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t("description")}</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData((f) => ({ ...f, description: e.target.value }))}
                    placeholder={t("descriptionExample")}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t("imageUrl")}</Label>
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData((f) => ({ ...f, image: e.target.value }))}
                  />
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
            placeholder={t("searchMap")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">{t("image")}</TableHead>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("category")}</TableHead>
                <TableHead>{t("description")}</TableHead>
                <TableHead className="w-20">{t("active")}</TableHead>
                <TableHead className="w-24">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMaps.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    {t("noMapsFound")}
                  </TableCell>
                </TableRow>
              ) : (
                filteredMaps.map((map) => (
                  <TableRow key={map.id} className={!map.is_active ? "opacity-50" : ""}>
                    <TableCell>
                      <Image
                        src={map.image || "/placeholder.svg"}
                        alt={map.name}
                        width={48}
                        height={32}
                        className="rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{map.name}</TableCell>
                    <TableCell>{getCategoryBadge(map.category)}</TableCell>
                    <TableCell className="text-muted-foreground max-w-[200px] truncate">
                      {map.description || "-"}
                    </TableCell>
                    <TableCell>
                      <Switch checked={map.is_active} onCheckedChange={() => handleToggleActive(map)} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(map)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(map.id)}>
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
        <Dialog open={!!editingMap} onOpenChange={(open) => !open && setEditingMap(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("editMap")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>{t("name")}</Label>
                <Input value={formData.name} onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>{t("category")}</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v: "land" | "water" | "hybrid" | "special") =>
                    setFormData((f) => ({ ...f, category: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t("description")}</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData((f) => ({ ...f, description: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("imageUrl")}</Label>
                <Input value={formData.image} onChange={(e) => setFormData((f) => ({ ...f, image: e.target.value }))} />
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
