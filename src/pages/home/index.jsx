import { CTASection } from './components/cta-section'
import { FeaturesSection } from './components/features-section'
import { Footer } from './components/footer'
import { Header } from './components/header'
import { HeroSection } from './components/hero-section'

export const Home = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  )
}
