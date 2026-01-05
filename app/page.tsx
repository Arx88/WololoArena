import { HeroSection } from "@/components/landing/hero-section"
import { CivilizationsShowcase } from "@/components/landing/civilizations-showcase"
import { UniqueUnitsPromo } from "@/components/landing/unique-units-promo"
import { AcademyPromo } from "@/components/landing/academy-promo"
import { TournamentsHubSection } from "@/components/landing/tournaments-hub-section"
import { LeaderboardCompactSection } from "@/components/landing/leaderboard-compact-section"
import { TeamGameSection } from "@/components/landing/team-game-section"
import { CTASection } from "@/components/landing/cta-section"
import { PlayerSearchWidget } from "@/components/player-search-widget"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pt-16">
        {/* 1. Hero - Logo + CTAs principales */}
        <HeroSection />

        {/* 3. Civilizations - Visual atractivo después del concepto */}
        <CivilizationsShowcase />

        {/* 4. Unique Units Promo - Enciclopedia táctica */}
        <UniqueUnitsPromo />

        {/* 4.5 Academy Promo - New University feature */}
        <AcademyPromo />

        {/* 5. Tournaments Hub - Consolidado: Hot + Live + All */}
        <TournamentsHubSection />

        {/* 5. Leaderboard - Junto al contenido competitivo */}
        <LeaderboardCompactSection />

        {/* 6. Team Game Section - TG Builder + Sinergias consolidado */}
        <TeamGameSection />

        {/* 8. CTA Final - Registro */}
        <CTASection />
      </main>

      {/* FLOATING PLAYER SEARCH */}
      <PlayerSearchWidget />
    </div>
  )
}
