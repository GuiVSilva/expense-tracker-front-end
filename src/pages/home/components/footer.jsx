import { Wallet } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/30">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold text-foreground">
                ExpenseTracker
              </span>
            </div>
          </div>

          <div className="flex-1 lg:text-right">
            <p className="text-sm text-muted-foreground">
              © 2026 ExpenseTracker. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}