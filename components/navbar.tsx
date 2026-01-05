"use client"

import Link from "next/link"
import NextImage from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { User, LogOut, Trophy, Menu, X, Settings, Swords, Users, Shield, GraduationCap, LayoutGrid } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { isDemoMode, getDemoUser, setDemoMode } from "@/lib/demo/auth"
import { useLanguage } from "@/lib/i18n/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { NewsTicker } from "@/components/news-ticker"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface AuthUser {
  id: string
  email?: string
  username?: string
  isDemo?: boolean
}

export function Navbar() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(prev => {
        if (prev !== isScrolled) return isScrolled
        return prev
      })
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const initAuth = async () => {
      if (isDemoMode()) {
        const demoUser = getDemoUser()
        if (demoUser) {
          setUser({
            id: demoUser.id,
            email: demoUser.email,
            username: demoUser.username,
            isDemo: true,
          })
          setIsAdmin(true)
          setIsLoading(false)
          return
        }
      }

      try {
        const supabase = createClient()

        if (!supabase) {
          setIsLoading(false)
          return
        }

        const {
          data: { user: supabaseUser },
        } = await supabase.auth.getUser()

        if (supabaseUser) {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("username")
            .eq("id", supabaseUser.id)
            .single()

          setUser({
            id: supabaseUser.id,
            email: supabaseUser.email,
            username: profileData?.username,
          })

          // OPTIMIZATION: Check admin status only once
          if (!isAdmin) {
            const { data: adminData } = await supabase.from("admin_users").select("id").eq("id", supabaseUser.id).single()
            setIsAdmin(!!adminData)
          }
        }

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event: string, session: any) => {
          if (session?.user) {
            try {
              const { data: profileData } = await supabase
                .from("profiles")
                .select("username")
                .eq("id", session.user.id)
                .single()

              setUser({
                id: session.user.id,
                email: session.user.email,
                username: profileData?.username,
              })
            } catch {
              setUser({
                id: session.user.id,
                email: session.user.email,
              })
            }
          } else if (!isDemoMode()) {
            setUser(null)
            setIsAdmin(false)
          }
        })

        setIsLoading(false)
        return () => subscription?.unsubscribe()
      } catch (error) {
        console.warn("Supabase unavailable, continuing without auth")
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const handleSignOut = async () => {
    if (user?.isDemo) {
      setDemoMode(false)
      setUser(null)
      setIsAdmin(false)
      window.location.href = "/"
      return
    }

    const supabase = createClient()
    if (supabase) {
      await supabase.auth.signOut()
    }
    setUser(null)
    window.location.href = "/"
  }

  const isAuthPage = pathname.startsWith("/auth")

  if (isAuthPage) return null

  const navLinks = [
    { href: "/tournaments", label: t("tournaments"), icon: Trophy },
    { href: "/lobby", label: t("draft"), icon: Swords },
    { href: "/team-builder", label: t("tgBuilder"), icon: Users },
    { href: "/techtree", label: t("techTree"), icon: LayoutGrid },
    { href: "/civilizations/units", label: t("uniqueUnits"), icon: Shield },
    { href: "/university", label: t("wololoUniversity"), icon: GraduationCap },
  ]

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col font-sans">
      <nav className={cn("relative z-20 border-b border-yellow-900/50 bg-[#050505] shadow-2xl")}>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-8 px-6 relative">
          <Link href="/" className="flex items-center gap-4 group shrink-0">
            <div className="relative shrink-0 w-12 h-12">
               <NextImage src="/images/logo-mini.png" alt="AOE2 Wololo Arena" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-600 font-cinzel">WOLOLO</span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-yellow-500/60 uppercase -mt-1 ml-0.5">ARENA</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center h-full">
            <div className="flex items-center px-6 h-12 bg-black/40 border border-white/5 rounded-full mr-6 relative overflow-hidden">
               {navLinks.map((link) => {
                  const isActive = pathname === link.href || pathname.startsWith(link.href)
                  return (
                    <Link key={link.href} href={link.href}>
                      <Button variant="ghost" className={cn("h-8 px-4 text-xs font-bold tracking-widest uppercase transition-all rounded-full mx-1", isActive ? "text-yellow-400 bg-yellow-950/30 border border-yellow-500/20" : "text-zinc-400 hover:text-white")}>
                        <span className="relative z-10 flex items-center gap-2">
                           <link.icon className={cn("h-3.5 w-3.5", isActive && "text-yellow-500")} />
                           {link.label}
                        </span>
                      </Button>
                    </Link>
                  )
               })}
            </div>

            <div className="flex items-center gap-4 pl-6 border-l border-white/10 h-10">
              <LanguageSwitcher />
              {user ? (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 pl-2 pr-4 bg-zinc-900 border border-white/10 hover:border-yellow-500/50 rounded-lg group transition-all">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarFallback className="bg-zinc-950 text-yellow-500 text-[10px] font-bold">
                          {user?.username?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start text-left">
                        <span className="text-[10px] font-bold text-zinc-300 uppercase leading-none">{user?.username || t("commander")}</span>
                        <span className="text-[8px] text-yellow-600 font-bold uppercase">{user?.isDemo ? t("demo") : t("online")}</span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-zinc-950 border border-yellow-500/20 text-zinc-300 rounded-xl p-2" collisionPadding={10}>
                      <DropdownMenuItem asChild className="focus:bg-yellow-950/30 focus:text-yellow-400 rounded-lg cursor-pointer">
                        <Link href="/profile" className="flex items-center gap-3 py-2" prefetch={false}>
                          <User className="h-4 w-4" />
                          <span className="font-bold text-xs uppercase">{t("myProfile")}</span>
                        </Link>
                      </DropdownMenuItem>
                      {isAdmin && (
                        <DropdownMenuItem asChild className="focus:bg-yellow-950/30 focus:text-yellow-400 rounded-lg cursor-pointer">
                          <Link href="/admin" className="flex items-center gap-3 py-2" prefetch={false}>
                            <Settings className="h-4 w-4" />
                            <span className="font-bold text-xs uppercase">{t("adminPanel")}</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator className="bg-white/5" />
                      <DropdownMenuItem onClick={handleSignOut} className="text-red-400 focus:text-red-300 focus:bg-red-500/10 rounded-lg cursor-pointer py-2">
                        <LogOut className="h-4 w-4 mr-2" />
                        <span className="font-bold text-xs uppercase">{t("signOut")}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/auth/login">
                  <Button className="h-9 px-6 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-black text-xs uppercase tracking-widest border border-yellow-400/50 rounded-sm">{t("login")}</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <NewsTicker isAdmin={isAdmin} />
    </div>
  )
}
