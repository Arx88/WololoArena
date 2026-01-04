"use client"

import { LanguageProvider } from "@/lib/i18n/language-context"
import { NewsProvider } from "@/lib/news-context"
import { GlobalCursorLoader } from "@/components/global-cursor-loader"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <NewsProvider>
        <GlobalCursorLoader />
        {children}
      </NewsProvider>
    </LanguageProvider>
  )
}
