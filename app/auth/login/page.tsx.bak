"use client"

import type React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { Loader2, Mail, Lock, LogIn, User } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { validateDemoCredentials, setDemoMode } from "@/lib/demo/auth"
import { useLanguage } from "@/lib/i18n/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDemoLogin, setIsDemoLogin] = useState(true)
  const { toast } = useToast()
  const { t } = useLanguage()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (isDemoLogin) {
      if (validateDemoCredentials(email, password)) {
        setDemoMode(true)
        toast({
          title: t("demoModeActivated"),
          description: t("welcomeDemo"),
        })
        window.location.href = "/tournaments"
      } else {
        setError(t("wrongDemoCredentials"))
        setIsLoading(false)
      }
      return
    }

    // Real Supabase login
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setError(t("wrongCredentials"))
        } else if (error.message.includes("Email not confirmed")) {
          setError(t("confirmEmail"))
        } else {
          setError(error.message)
        }
        return
      }

      toast({
        title: t("welcomeBack"),
        description: t("loggedInSuccess"),
      })
      window.location.href = "/tournaments"
    } catch (err) {
      console.error("Login error:", err)
      setError(t("loginError"))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-[#020202]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.05)_0%,#020202_100%)] pointer-events-none" />

      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-sm relative z-10">
        <div className="mb-8 flex flex-col items-center">
          <Link href="/" className="mb-4 transition-transform hover:scale-110">
            <Image
              src="/images/logo-full.png"
              alt="AOE2 Wololo Arena"
              width={128}
              height={128}
              className="h-24 w-auto drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]"
            />
          </Link>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white drop-shadow-lg">Wololo Arena</h1>
        </div>

        <Card className="border-white/10 bg-[#0a0a0b]/60 backdrop-blur-md shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-white font-bold">{t("loginTitle")}</CardTitle>
            <CardDescription className="text-white/40">{isDemoLogin ? t("demoCredentials") : t("enterEmailPassword")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-6">
              <Button
                type="button"
                variant="outline"
                className={`flex-1 border-white/5 transition-all ${isDemoLogin ? "bg-yellow-600 text-black font-bold hover:bg-yellow-500 border-yellow-500" : "bg-white/5 text-white hover:bg-white/10"}`}
                onClick={() => {
                  setIsDemoLogin(true)
                  setEmail("")
                  setPassword("")
                  setError(null)
                }}
              >
                <User className="h-4 w-4 mr-2" />
                {t("demo")}
              </Button>
              <Button
                type="button"
                variant="outline"
                className={`flex-1 border-white/5 transition-all ${!isDemoLogin ? "bg-yellow-600 text-black font-bold hover:bg-yellow-500 border-yellow-500" : "bg-white/5 text-white hover:bg-white/10"}`}
                onClick={() => {
                  setIsDemoLogin(false)
                  setEmail("")
                  setPassword("")
                  setError(null)
                }}
              >
                <Mail className="h-4 w-4 mr-2" />
                {t("email")}
              </Button>
            </div>

            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="flex items-center gap-2 text-white/80">
                    {isDemoLogin ? <User className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                    {isDemoLogin ? t("username") : t("email")}
                  </Label>
                  <Input
                    id="email"
                    type={isDemoLogin ? "text" : "email"}
                    placeholder={isDemoLogin ? "admin" : "you@email.com"}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-black/40 border-white/10 text-white focus-visible:ring-yellow-500"
                    autoComplete={isDemoLogin ? "username" : "email"}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="flex items-center gap-2 text-white/80">
                    <Lock className="h-4 w-4" />
                    {t("password")}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={isDemoLogin ? "admin" : "••••••••"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-black/40 border-white/10 text-white focus-visible:ring-yellow-500"
                    autoComplete="current-password"
                  />
                </div>

                {error && (
                  <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                {isDemoLogin && (
                  <div className="rounded-lg bg-yellow-500/5 border border-yellow-500/20 p-3">
                    <p className="text-sm text-yellow-500/80">
                      {t("testCredentials")} <strong className="text-white">admin</strong> / <strong className="text-white">admin</strong>
                    </p>
                  </div>
                )}

                <Button type="submit" className="w-full gap-2 h-12 bg-yellow-600 hover:bg-yellow-500 text-black font-black uppercase tracking-widest shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t("loggingIn")}
                    </>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4" />
                      {isDemoLogin ? t("enterDemoMode") : t("loginTitle")}
                    </>
                  )}
                </Button>
              </div>

              {!isDemoLogin && (
                <div className="mt-6 text-center text-sm">
                  <span className="text-white/40">{t("noAccount")} </span>
                  <Link href="/auth/sign-up" className="text-yellow-500 hover:text-yellow-400 font-bold transition-colors">
                    {t("signUp")}
                  </Link>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
