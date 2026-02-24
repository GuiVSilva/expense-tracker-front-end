import { Button } from '@/components/ui/button'
import { Settings2 } from 'lucide-react'

export const MonthlyBudgetHeader = ({ onConfigure }) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Orcamento Mensal</h1>
        <p className="text-sm text-muted-foreground">
          Acompanhe limites por categoria e ajuste seu planejamento mensal.
        </p>
      </div>

      <Button onClick={onConfigure}>
        <Settings2 className="w-4 h-4 mr-2" />
        Configurar Orcamento
      </Button>
    </div>
  )
}
