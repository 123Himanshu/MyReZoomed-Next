import { HeroSection } from "@/components/landing/HeroSection"
import { FeaturesSection } from "@/components/landing/FeaturesSection"
import { HowItWorksSection } from "@/components/landing/HowItWorksSection"
import { StatsSection } from "@/components/landing/StatsSection"
import { TestimonialsSection } from "@/components/landing/TestimonialsSection"
import { PricingSection } from "@/components/landing/PricingSection"
import { CTASection } from "@/components/landing/CTASection"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ParticleBackground } from "@/components/ui/particle-background"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
