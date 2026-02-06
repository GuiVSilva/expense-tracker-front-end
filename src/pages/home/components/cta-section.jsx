import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

export function CTASection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="relative max-w-4xl mx-auto text-center">
          {/* Background Glow */}
          <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-primary/10 via-accent/10 to-chart-4/10 blur-3xl -z-10" />

          {/* Content Card */}
          <div className="relative rounded-3xl bg-card/50 border border-border backdrop-blur-sm p-12 lg:p-16">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-8">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Pronto para transformar suas{' '}
              <span className="text-primary">finanças</span>?
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
              Comece agora mesmo a ter controle total sobre seu dinheiro. É
              gratuito, sem cartão de crédito e leva menos de 1 minuto.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="group px-8 h-14 text-base font-medium w-full sm:w-auto"
              >
                Criar Conta Gratuita
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 h-14 text-base font-medium w-full sm:w-auto bg-transparent"
              >
                Fale Conosco
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Dados criptografados</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>100% gratuito</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
