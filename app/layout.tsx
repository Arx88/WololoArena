import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Cinzel } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { NewsProvider } from "@/lib/news-context"
import { GlobalCursorLoader } from "@/components/global-cursor-loader"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-cinzel" })

export const metadata: Metadata = {
  title: "AOE2 Wololo Arena - Professional Civilization & Map Drafts",
  description:
    "Professional draft tool and tournament platform for Age of Empires II competitive matches. Ban and pick civilizations and maps in real-time.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${_geist.className} ${_cinzel.variable} font-sans antialiased min-h-screen bg-background text-foreground`}>
        <LanguageProvider>
          <NewsProvider>
            <GlobalCursorLoader />
            {children}
          </NewsProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
