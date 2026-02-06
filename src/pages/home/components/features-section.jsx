import {
  BarChart3,
  Bell,
  CreditCard,
  Lock,
  Smartphone,
  Zap
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const features = [
  {
    icon: BarChart3,
    title: 'Relatórios Visuais',
    description:
      'Gráficos intuitivos que mostram para onde seu dinheiro está indo.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'hover:border-primary/50'
  },
  {
    icon: CreditCard,
    title: 'Controle de Despesas',
    description:
      'Categorize e acompanhe cada centavo gasto de forma organizada.',
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    borderColor: 'hover:border-destructive/50'
  },
  {
    icon: Bell,
    title: 'Alertas Inteligentes',
    description:
      'Receba notificações quando estiver próximo do seu limite de gastos.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    borderColor: 'hover:border-accent/50'
  },
  {
    icon: Lock,
    title: 'Segurança Total',
    description: 'Seus dados financeiros protegidos com criptografia de ponta.',
    color: 'text-chart-4',
    bgColor: 'bg-chart-4/10',
    borderColor: 'hover:border-chart-4/50'
  },
  {
    icon: Smartphone,
    title: 'Acesso em Qualquer Lugar',
    description:
      'Interface responsiva que funciona perfeitamente em todos os dispositivos.',
    color: 'text-chart-5',
    bgColor: 'bg-chart-5/10',
    borderColor: 'hover:border-chart-5/50'
  },
  {
    icon: Zap,
    title: 'Rápido e Eficiente',
    description:
      'Adicione transações em segundos com uma interface simplificada.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'hover:border-primary/50'
  }
]

export function FeaturesSection() {
  const [visibleItems, setVisibleItems] = useState([])
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setVisibleItems(prev => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    )

    const items = document.querySelectorAll('[data-feature-item]')
    items.forEach(item => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full border border-border bg-secondary/50 text-sm text-muted-foreground mb-6">
            Funcionalidades
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Tudo que você precisa para
            <br />
            <span className="text-primary">controlar suas finanças</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Ferramentas poderosas e fáceis de usar para você alcançar seus
            objetivos financeiros.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              data-feature-item
              data-index={index}
              className={`group relative p-8 rounded-2xl bg-card/30 border border-border backdrop-blur-sm transition-all duration-500 ${feature.borderColor} hover:bg-card/60 ${
                visibleItems.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Glow Effect */}
              <div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${feature.bgColor} blur-xl -z-10`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
