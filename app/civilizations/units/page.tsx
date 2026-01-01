import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { UnitShowcase } from "@/components/civilizations/unit-showcase"

export default function UnitsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <UnitShowcase />
      </main>
      <Footer />
    </div>
  )
}
