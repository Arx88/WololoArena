import { Suspense } from "react"
import { TeamBuilderInterface } from "@/components/team-builder/team-builder-interface"
import { Navbar } from "@/components/navbar"

export const metadata = {
  title: "TG Team Builder - AOE2 Wololo Arena",
  description:
    "Build your perfect Age of Empires II team composition. Analyze civilization synergies and team bonuses for competitive team games.",
}

export default function TeamBuilderPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#020202] text-white">
      <Navbar />
      <main className="flex-1 pt-40 pb-12">
        <TeamBuilderInterface />
      </main>
    </div>
  )
}
