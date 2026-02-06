import { Button } from '@/components/ui/button'
import { ArrowRight, TrendingUp, Wallet, PieChart } from 'lucide-react'
import { useEffect, useState } from 'react'

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setMounted(true)
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]" />

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[100px] animate-pulse"
        style={{ animationDelay: '1s' }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-destructive/10 rounded-full blur-[80px] animate-pulse"
        style={{ animationDelay: '2s' }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <div
          className={`flex flex-col items-center text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Controle financeiro inteligente
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance">
            Suas Finanças
            <br />
            <span className="text-primary">Sob Controle</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 text-pretty">
            Acompanhe suas receitas e despesas de forma simples e visual. Tome
            decisões financeiras mais inteligentes com insights em tempo real.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button size="lg" className="group px-8 h-14 text-base font-medium">
              Comece Agora
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 h-14 text-base font-medium bg-transparent"
            >
              Ver Demonstração
            </Button>
          </div>

          {/* Stats Cards */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="group relative p-6 rounded-2xl bg-card/50 border border-border backdrop-blur-sm hover:bg-card/80 transition-all hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,200,100,0.1)]">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">R$ 0,00</p>
              <p className="text-sm text-muted-foreground">Saldo Inicial</p>
            </div>

            <div className="group relative p-6 rounded-2xl bg-card/50 border border-border backdrop-blur-sm hover:bg-card/80 transition-all hover:border-accent/50 hover:shadow-[0_0_30px_rgba(255,150,0,0.1)]">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">100%</p>
              <p className="text-sm text-muted-foreground">Gratuito</p>
            </div>

            <div className="group relative p-6 rounded-2xl bg-card/50 border border-border backdrop-blur-sm hover:bg-card/80 transition-all hover:border-chart-4/50 hover:shadow-[0_0_30px_rgba(100,100,255,0.1)]">
              <div className="w-12 h-12 rounded-xl bg-chart-4/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <PieChart className="w-6 h-6 text-chart-4" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">
                Ilimitado
              </p>
              <p className="text-sm text-muted-foreground">Transações</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">
          Role para ver mais
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" />
        </div>
      </div>
    </section>
  )
}
