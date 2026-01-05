import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Cinzel } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/components/providers"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-cinzel" })

export const metadata: Metadata = {
  title: "AOE2 Wololo Arena - Professional Civilization & Map Drafts",
  description:
    "Professional draft tool and tournament platform for Age of Empires II competitive matches. Ban and pick civilizations and maps in real-time.",
  generator: "v0.app",
  icons: {
    icon: "/favicon-w.svg",
    apple: "/favicon-w.svg",
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
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
