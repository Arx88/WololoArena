"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { User, LogOut, Trophy, Menu, X, Settings, Swords, Users } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { isDemoMode, getDemoUser, setDemoMode } from "@/lib/demo/auth"
import { useLanguage } from "@/lib/i18n/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
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
          const { data: profile } = await supabase
            .from("profiles")
            .select("username")
            .eq("id", supabaseUser.id)
            .single()

          setUser({
            id: supabaseUser.id,
            email: supabaseUser.email,
            username: profile?.username,
          })

          const { data: adminData } = await supabase.from("admin_users").select("id").eq("id", supabaseUser.id).single()

          setIsAdmin(!!adminData)
        }

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event: string, session: any) => {
          if (session?.user) {
            try {
              const { data: profile } = await supabase
                .from("profiles")
                .select("username")
                .eq("id", session.user.id)
                .single()

              setUser({
                id: session.user.id,
                email: session.user.email,
                username: profile?.username,
              })
            } catch {
              // Ignore profile fetch errors
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
    { href: "/lobby", label: t("draft"), icon: Swords },
    { href: "/tournaments", label: t("tournaments"), icon: Trophy },
    { href: "/team-builder", label: "TG Builder", icon: Users },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo-mini.png" alt="AOE2 Wololo Arena" width={40} height={40} className="h-10 w-auto" />
          <span className="text-xl font-semibold tracking-wide text-primary hidden sm:inline">Wololo Arena</span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />

          {user ? (
            <>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant={pathname === link.href || pathname.startsWith(link.href) ? "secondary" : "ghost"}
                    className="gap-2"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Button>
                </Link>
              ))}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 ml-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-primary/20 text-primary text-xs">
                        {user?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline">
                      {user?.username || user?.email?.split("@")[0]}
                      {user?.isDemo && <span className="ml-1 text-xs text-muted-foreground">(Demo)</span>}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {t("myProfile")}
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        {t("adminPanel")}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("signOut")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/lobby">
                <Button variant="ghost" className="gap-2">
                  <Swords className="h-4 w-4" />
                  {t("draft")}
                </Button>
              </Link>
              <Link href="/tournaments">
                <Button variant="ghost" className="gap-2">
                  <Trophy className="h-4 w-4" />
                  {t("tournaments")}
                </Button>
              </Link>
              <Link href="/team-builder">
                <Button variant="ghost" className="gap-2">
                  <Users className="h-4 w-4" />
                  TG Builder
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="ghost">{t("login")}</Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">{t("signUp")}</Button>
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} data-testid="mobile-menu-toggle">
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md" data-testid="mobile-menu-content">
          <div className="px-4 py-4 space-y-2">
            {user ? (
              <>
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant={pathname === link.href || pathname.startsWith(link.href) ? "secondary" : "ghost"}
                      className="w-full justify-start gap-2"
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </Button>
                  </Link>
                ))}
                <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <User className="h-4 w-4" />
                    {t("myProfile")}
                  </Button>
                </Link>
                {isAdmin && (
                  <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <Settings className="h-4 w-4" />
                      {t("adminPanel")}
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" className="w-full justify-start gap-2 text-destructive" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" />
                  {t("signOut")}
                </Button>
              </>
            ) : (
              <>
                <Link href="/lobby" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <Swords className="h-4 w-4" />
                    {t("draft")}
                  </Button>
                </Link>
                <Link href="/tournaments" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <Trophy className="h-4 w-4" />
                    {t("tournaments")}
                  </Button>
                </Link>
                <Link href="/team-builder" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <Users className="h-4 w-4" />
                    TG Builder
                  </Button>
                </Link>
                <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full">
                    {t("login")}
                  </Button>
                </Link>
                <Link href="/auth/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full">{t("signUp")}</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
