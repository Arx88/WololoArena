"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { User, LogOut, Trophy, Menu, X, Settings, Swords, Users, Shield, GraduationCap } from "lucide-react"
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
      setScrolled(window.scrollY > 20)
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
    { href: "/civilizations/units", label: "Unique Units", icon: Shield },
    { href: "/university", label: "Wololo University", icon: GraduationCap },
  ]

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col font-sans">
      
      {/* Main Navbar - REDESIGNED */}
      <nav 
        className={cn(
          "relative z-20 border-b border-yellow-900/50 transition-all duration-300",
          "bg-[url('/images/noise.png')] bg-zinc-950/95 backdrop-blur-md shadow-2xl shadow-black/80"
        )}
      >
        {/* Top Decorative Line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
        
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-8 px-6 relative">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-4 group relative py-2 shrink-0">
            <div className="absolute -inset-4 bg-yellow-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
            <div className="relative shrink-0 w-12 h-12">
               <Image 
                 src="/images/logo-mini.png" 
                 alt="AOE2 Wololo Arena" 
                 fill
                 className="object-contain drop-shadow-[0_2px_10px_rgba(234,179,8,0.4)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" 
               />
            </div>
            <div className="flex flex-col shrink-0">
              <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-600 font-cinzel drop-shadow-sm group-hover:to-yellow-400 transition-all">
                WOLOLO
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-yellow-500/60 uppercase leading-none -mt-1 ml-0.5 group-hover:text-yellow-500/90 transition-colors">
                ARENA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center h-full">
            
            {/* Nav Links Container */}
            <div className="flex items-center px-6 h-12 bg-black/40 border border-white/5 rounded-full backdrop-blur-sm mr-6 relative overflow-hidden group/nav">
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover/nav:translate-x-[100%] transition-transform duration-1000" />
               
               {user ? navLinks.map((link) => {
                  const isActive = pathname === link.href || pathname.startsWith(link.href)
                  return (
                    <Link key={link.href} href={link.href}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "relative h-8 px-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white/5 rounded-full mx-1",
                          isActive ? "text-yellow-400 bg-yellow-950/30 border border-yellow-500/20 shadow-[0_0_15px_-5px_#ca8a04]" : "text-zinc-400 hover:text-white"
                        )}
                      >
                        {isActive && <div className="absolute inset-0 bg-yellow-500/5 animate-pulse rounded-full" />}
                        <span className="relative z-10 flex items-center gap-2">
                           <link.icon className={cn("h-3.5 w-3.5", isActive && "text-yellow-500")} />
                           {link.label}
                        </span>
                      </Button>
                    </Link>
                  )
               }) : (
                 // Guest Links
                  <>
                    <Link href="/tournaments">
                      <Button variant="ghost" className="h-8 px-4 text-xs font-bold tracking-wider uppercase text-zinc-400 hover:text-yellow-400 hover:bg-white/5 rounded-full mx-1">
                        <Trophy className="h-3.5 w-3.5 mr-2" />
                        {t("tournaments")}
                      </Button>
                    </Link>
                    <Link href="/lobby">
                      <Button variant="ghost" className="h-8 px-4 text-xs font-bold tracking-wider uppercase text-zinc-400 hover:text-yellow-400 hover:bg-white/5 rounded-full mx-1">
                        <Swords className="h-3.5 w-3.5 mr-2" />
                        {t("draft")}
                      </Button>
                    </Link>
                  </>
               )}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-4 pl-6 border-l border-white/10 h-10">
              <LanguageSwitcher />

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 pl-2 pr-4 bg-gradient-to-b from-zinc-800 to-zinc-900 border border-white/10 hover:border-yellow-500/50 rounded-lg group transition-all overflow-hidden">
                      <div className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/10 transition-colors" />
                      <Avatar className="h-6 w-6 mr-2 ring-1 ring-white/10 group-hover:ring-yellow-500/50 transition-all">
                        <AvatarFallback className="bg-zinc-950 text-yellow-500 text-[10px] font-bold">
                          {user?.username?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start">
                        <span className="text-[10px] font-bold text-zinc-300 uppercase leading-none mb-0.5 group-hover:text-white transition-colors">
                          {user?.username || "Commander"}
                        </span>
                        <span className="text-[8px] text-yellow-600 font-bold uppercase tracking-wider leading-none">
                          {user?.isDemo ? "Demo Access" : "Online"}
                        </span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-zinc-950 border border-yellow-500/20 text-zinc-300 shadow-[0_10px_40px_-10px_rgba(0,0,0,1)] rounded-xl p-2">
                      <DropdownMenuItem asChild className="focus:bg-yellow-950/30 focus:text-yellow-400 rounded-lg cursor-pointer my-1">
                        <Link href="/profile" className="flex items-center gap-3 py-2">
                          <User className="h-4 w-4" />
                          <div className="flex flex-col">
                             <span className="font-bold text-xs uppercase tracking-wide">{t("myProfile")}</span>
                             <span className="text-[9px] text-zinc-500">View stats & settings</span>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      {isAdmin && (
                        <DropdownMenuItem asChild className="focus:bg-yellow-950/30 focus:text-yellow-400 rounded-lg cursor-pointer my-1">
                          <Link href="/admin" className="flex items-center gap-3 py-2">
                            <Settings className="h-4 w-4" />
                            <div className="flex flex-col">
                               <span className="font-bold text-xs uppercase tracking-wide">{t("adminPanel")}</span>
                               <span className="text-[9px] text-zinc-500">System configuration</span>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator className="bg-white/5 my-1" />
                      <DropdownMenuItem onClick={handleSignOut} className="text-red-400 focus:text-red-300 focus:bg-red-500/10 rounded-lg cursor-pointer py-2">
                        <LogOut className="h-4 w-4 mr-2" />
                        <span className="font-bold text-xs uppercase tracking-wide">{t("signOut")}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/auth/login">
                    <Button variant="ghost" className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-white/5">{t("login")}</Button>
                  </Link>
                  <Link href="/auth/sign-up">
                    <Button className="h-9 px-6 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-black text-xs uppercase tracking-widest shadow-[0_0_20px_-5px_rgba(234,179,8,0.5)] border border-yellow-400/50 rounded-sm clip-path-slant">
                      {t("signUp")}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <LanguageSwitcher />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400 border border-yellow-500/20"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* News Ticker - REPOSITIONED BELOW */}
      <div className="relative z-10">
         <NewsTicker isAdmin={isAdmin} />
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bottom-0 bg-black/95 backdrop-blur-xl z-30 overflow-y-auto animate-in fade-in slide-in-from-top-5 border-t border-white/10">
            <div className="p-6 space-y-4">
              {user ? (
                <>
                  <div className="flex items-center gap-4 mb-6 p-4 bg-white/5 rounded-xl border border-white/5">
                     <Avatar className="h-12 w-12 border-2 border-yellow-500/30">
                        <AvatarFallback className="bg-zinc-900 text-yellow-500 font-bold text-lg">
                           {user.username?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                     </Avatar>
                     <div>
                        <div className="text-white font-bold text-lg">{user.username}</div>
                        <div className="text-xs text-zinc-500">{user.email}</div>
                     </div>
                  </div>

                  <div className="grid gap-2">
                    {navLinks.map((link) => (
                      <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                        <Button
                          variant={pathname === link.href ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start gap-4 h-14 text-sm font-bold uppercase tracking-wider border border-transparent",
                            pathname === link.href 
                              ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" 
                              : "text-zinc-400 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          <link.icon className="h-5 w-5" />
                          {link.label}
                        </Button>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="h-px bg-white/10 my-4" />
                  
                  <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-4 h-12 text-zinc-400 hover:text-white">
                      <User className="h-5 w-5" />
                      {t("myProfile")}
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start gap-4 h-12 text-red-500 hover:bg-red-500/10" onClick={handleSignOut}>
                    <LogOut className="h-5 w-5" />
                    {t("signOut")}
                  </Button>
                </>
              ) : (
                <div className="space-y-4 pt-4">
                   <div className="grid gap-2">
                     <Link href="/lobby" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start gap-4 h-14 text-sm font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-white/5">
                          <Swords className="h-5 w-5" />
                          {t("draft")}
                        </Button>
                     </Link>
                     <Link href="/tournaments" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start gap-4 h-14 text-sm font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-white/5">
                          <Trophy className="h-5 w-5" />
                          {t("tournaments")}
                        </Button>
                     </Link>
                   </div>
                   <div className="grid grid-cols-2 gap-4 mt-8">
                      <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full h-12 border-white/10 bg-transparent text-white hover:bg-white/5 uppercase font-bold tracking-wider">{t("login")}</Button>
                      </Link>
                      <Link href="/auth/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full h-12 bg-yellow-600 hover:bg-yellow-500 text-black font-black uppercase tracking-wider">{t("signUp")}</Button>
                      </Link>
                   </div>
                </div>
              )}
            </div>
        </div>
      )}
    </div>
  )
}