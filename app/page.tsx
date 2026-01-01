import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/landing/hero-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { CivilizationsShowcase } from "@/components/landing/civilizations-showcase"
import { UniqueUnitsPromo } from "@/components/landing/unique-units-promo"
import { TournamentsHubSection } from "@/components/landing/tournaments-hub-section"
import { LeaderboardCompactSection } from "@/components/landing/leaderboard-compact-section"
import { TeamGameSection } from "@/components/landing/team-game-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { CTASection } from "@/components/landing/cta-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        {/* 1. Hero - Logo + CTAs principales */}
        <HeroSection />

        {/* 2. How It Works - Usuario entiende inmediatamente qué es */}
        <HowItWorksSection />

        {/* 3. Civilizations - Visual atractivo después del concepto */}
        <CivilizationsShowcase />

        {/* 4. Unique Units Promo - Enciclopedia táctica */}
        <UniqueUnitsPromo />

        {/* 5. Tournaments Hub - Consolidado: Hot + Live + All */}
        <TournamentsHubSection />

        {/* 5. Leaderboard - Junto al contenido competitivo */}
        <LeaderboardCompactSection />

        {/* 6. Team Game Section - TG Builder + Sinergias consolidado */}
        <TeamGameSection />

        {/* 7. Features - Para usuarios que quieren detalles */}
        <FeaturesSection />

        {/* 8. CTA Final - Registro */}
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
