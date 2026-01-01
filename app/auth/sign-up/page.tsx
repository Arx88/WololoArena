"use client"

import type React from "react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2, Mail, Lock, User, UserPlus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden")
      setIsLoading(false)
      return
    }

    if (username.length < 3) {
      setError("El nombre de usuario debe tener al menos 3 caracteres")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      setIsLoading(false)
      return
    }

    try {
      // Check if username is already taken
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username)
        .single()

      if (existingProfile) {
        setError("Este nombre de usuario ya esta en uso")
        setIsLoading(false)
        return
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/tournaments`,
          data: {
            username,
          },
        },
      })

      if (signUpError) {
        if (signUpError.message.includes("already registered")) {
          setError("Este email ya esta registrado")
        } else {
          setError(signUpError.message)
        }
        return
      }

      // If user was created (no email confirmation required), create profile
      if (data.user && !data.user.identities?.length) {
        // User already exists
        setError("Este email ya esta registrado")
        return
      }

      if (data.user) {
        // Create profile immediately
        const { error: profileError } = await supabase.from("profiles").upsert({
          id: data.user.id,
          username,
          favorite_civs: [],
          favorite_maps: [],
        })

        if (profileError) {
          console.error("Error creating profile:", profileError)
        }
      }

      toast({
        title: "Cuenta creada",
        description: "Revisa tu email para confirmar tu cuenta",
      })
      router.push("/auth/sign-up-success")
    } catch (error: unknown) {
      console.error("Signup error:", error)
      setError(error instanceof Error ? error.message : "Error al crear la cuenta")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)]" />
      </div>

      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center">
          <Link href="/" className="mb-4 flex items-center gap-2">
            <Image
              src="/images/wololo-icon.png"
              alt="AOE2 Wololo Arena"
              width={48}
              height={48}
              className="h-12 w-auto"
            />
          </Link>
          <h1 className="text-2xl font-bold text-primary">AOE2 Wololo Arena</h1>
          <p className="text-sm text-muted-foreground mt-1">Unete a la comunidad competitiva</p>
        </div>

        <Card className="bg-[#0a0a0b]/80 border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
            <CardDescription>Registrate para participar en torneos</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp}>
              <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Nombre de Usuario
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="TheViper"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-input"
                    autoComplete="username"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-input"
                    autoComplete="email"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Contraseña
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-input"
                    autoComplete="new-password"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="repeat-password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Confirmar Contraseña
                  </Label>
                  <Input
                    id="repeat-password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    className="bg-input"
                    autoComplete="new-password"
                  />
                </div>

                {error && (
                  <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3">
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                <Button type="submit" className="w-full gap-2 h-11" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creando cuenta...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4" />
                      Crear Cuenta
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Ya tienes una cuenta? </span>
                <Link href="/auth/login" className="text-primary hover:underline underline-offset-4 font-medium">
                  Iniciar Sesion
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

