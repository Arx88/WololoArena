import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const supabase = await createClient()

  if (!supabase) {
    redirect("/auth/login")
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Verificar si es admin
  const { data: adminUser } = await supabase.from("admin_users").select("id").eq("id", user.id).single()

  if (!adminUser) {
    redirect("/")
  }

  // Cargar datos de configuración
  const [civsRes, mapsRes, modesRes] = await Promise.all([
    supabase.from("civilizations").select("*").order("name"),
    supabase.from("maps").select("*").order("name"),
    supabase.from("game_modes").select("*").order("name"),
  ])

  return (
    <div className="flex min-h-screen flex-col bg-[#020202] text-white">
      <Navbar />
      <main className="flex-1">
        {/* Cinematic Header */}
        <section className="relative h-[45vh] flex items-center justify-center overflow-hidden border-b border-yellow-500/20 pt-20">
          <div className="absolute inset-0 z-0">
            <Image src="/images/Hero.png" alt="Admin" fill className="object-cover opacity-40 grayscale-[0.5] brightness-110" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.15)_0%,#020202_100%)]" />
          </div>
          <div className="relative z-10 text-center px-6 max-w-4xl mt-10">
            <Badge variant="outline" className="mb-6 border-yellow-500/30 bg-yellow-500/5 text-yellow-500 px-6 py-2 uppercase tracking-[0.3em] text-[10px] font-black">System Authority</Badge>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,1)] leading-tight mb-4">
              Control <span className="gold-text-gradient pr-6 -mr-6">Center</span>
            </h1>
            <p className="text-yellow-100/40 font-medium uppercase tracking-[0.3em] text-sm md:text-lg italic max-w-2xl mx-auto">Manage the arena database. Regulate civilizations and maps.</p>
          </div>
        </section>

        <div className="container mx-auto py-12 px-4">
          <AdminDashboard
            initialCivs={civsRes.data || []}
            initialMaps={mapsRes.data || []}
            initialModes={modesRes.data || []}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
