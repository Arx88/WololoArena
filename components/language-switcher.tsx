"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border/50 p-0.5">
      <Button
        variant={language === "en" ? "secondary" : "ghost"}
        size="sm"
        className="h-7 px-2 text-xs font-medium"
        onClick={() => setLanguage("en")}
      >
        EN
      </Button>
      <Button
        variant={language === "es" ? "secondary" : "ghost"}
        size="sm"
        className="h-7 px-2 text-xs font-medium"
        onClick={() => setLanguage("es")}
      >
        ES
      </Button>
    </div>
  )
}
