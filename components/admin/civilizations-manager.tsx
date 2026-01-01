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
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { CivilizationConfig } from "@/lib/types/admin"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/language-context"

interface CivilizationsManagerProps {
  civs: CivilizationConfig[]
  onUpdate: (civs: CivilizationConfig[]) => void
}

export function CivilizationsManager({ civs, onUpdate }: CivilizationsManagerProps) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [search, setSearch] = useState("")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingCiv, setEditingCiv] = useState<CivilizationConfig | null>(null)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    specialty: "",
    description: "",
    icon: "/placeholder.svg?height=48&width=48",
  })
  const [isLoading, setIsLoading] = useState(false)

  const filteredCivs = civs.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) || c.specialty.toLowerCase().includes(search.toLowerCase()),
  )

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      specialty: "",
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
      .from("civilizations")
      .insert({
        id: formData.id.toLowerCase().replace(/\s+/g, "_"),
        name: formData.name,
        specialty: formData.specialty,
        description: formData.description || null,
        icon: formData.icon,
        is_active: true,
      })
      .select()
      .single()

    if (error) {
      toast({ title: t("saveError"), description: error.message, variant: "destructive" })
    } else if (data) {
      onUpdate([...civs, data])
      resetForm()
      setIsAddOpen(false)
      toast({ title: t("civAdded") })
    }
    setIsLoading(false)
  }

  const handleUpdate = async () => {
    if (!editingCiv) return
    setIsLoading(true)

    const supabase = getSupabaseClient()
    if (!supabase) {
      toast({ title: t("connectionError"), variant: "destructive" })
      setIsLoading(false)
      return
    }

    const { data, error } = await supabase
      .from("civilizations")
      .update({
        name: formData.name,
        specialty: formData.specialty,
        description: formData.description || null,
        icon: formData.icon,
      })
      .eq("id", editingCiv.id)
      .select()
      .single()

    if (error) {
      toast({ title: t("saveError"), description: error.message, variant: "destructive" })
    } else if (data) {
      onUpdate(civs.map((c) => (c.id === editingCiv.id ? data : c)))
      setEditingCiv(null)
      resetForm()
      toast({ title: t("civUpdated") })
    }
    setIsLoading(false)
  }

  const handleToggleActive = async (civ: CivilizationConfig) => {
    const supabase = getSupabaseClient()
    if (!supabase) return

    const { error } = await supabase.from("civilizations").update({ is_active: !civ.is_active }).eq("id", civ.id)

    if (!error) {
      onUpdate(civs.map((c) => (c.id === civ.id ? { ...c, is_active: !c.is_active } : c)))
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm(t("deleteConfirm"))) return

    const supabase = getSupabaseClient()
    if (!supabase) return

    const { error } = await supabase.from("civilizations").delete().eq("id", id)

    if (!error) {
      onUpdate(civs.filter((c) => c.id !== id))
      toast({ title: t("civDeleted") })
    } else {
      toast({ title: t("saveError"), variant: "destructive" })
    }
  }

  const openEdit = (civ: CivilizationConfig) => {
    setEditingCiv(civ)
    setFormData({
      id: civ.id,
      name: civ.name,
      specialty: civ.specialty,
      description: civ.description || "",
      icon: civ.icon,
    })
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t("civilizations")}</CardTitle>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                {t("add")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("addCivilization")}</DialogTitle>
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
                  <Label>{t("specialty")}</Label>
                  <Input
                    value={formData.specialty}
                    onChange={(e) => setFormData((f) => ({ ...f, specialty: e.target.value }))}
                    placeholder={t("specialtyExample")}
                  />
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
            placeholder={t("searchCivilization")}
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
                <TableHead>{t("specialty")}</TableHead>
                <TableHead className="w-20">{t("active")}</TableHead>
                <TableHead className="w-24">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCivs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    {t("noCivilizationsFound")}
                  </TableCell>
                </TableRow>
              ) : (
                filteredCivs.map((civ) => (
                  <TableRow key={civ.id} className={!civ.is_active ? "opacity-50" : ""}>
                    <TableCell>
                      <Image
                        src={civ.icon || "/placeholder.svg"}
                        alt={civ.name}
                        width={32}
                        height={32}
                        className="rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{civ.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{civ.specialty}</Badge>
                    </TableCell>
                    <TableCell>
                      <Switch checked={civ.is_active} onCheckedChange={() => handleToggleActive(civ)} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(civ)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(civ.id)}>
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
        <Dialog open={!!editingCiv} onOpenChange={(open) => !open && setEditingCiv(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("editCivilization")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>{t("name")}</Label>
                <Input value={formData.name} onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>{t("specialty")}</Label>
                <Input
                  value={formData.specialty}
                  onChange={(e) => setFormData((f) => ({ ...f, specialty: e.target.value }))}
                />
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
