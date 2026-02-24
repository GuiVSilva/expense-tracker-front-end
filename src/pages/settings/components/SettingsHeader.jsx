import { Shield, Sparkles, User } from 'lucide-react'

export const SettingsHeader = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-linear-to-br from-card via-background to-card p-6">
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '42px 42px'
        }}
      />

      <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-20 left-8 h-44 w-44 rounded-full bg-chart-4/10 blur-3xl" />

      <div className="relative z-10">
        <h1 className="text-2xl font-bold text-foreground">Configuracoes</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Personalize seu perfil, preferencia visual, seguranca da conta e notificacoes.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-primary">
            <User className="w-3.5 h-3.5" /> Perfil
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-chart-4/30 bg-chart-4/10 px-2.5 py-1 text-chart-4">
            <Shield className="w-3.5 h-3.5" /> Seguranca
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-accent">
            <Sparkles className="w-3.5 h-3.5" /> Preferencias
          </span>
        </div>
      </div>
    </div>
  )
}
