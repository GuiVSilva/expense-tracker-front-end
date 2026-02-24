import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowDownRight,
  ArrowUpRight,
  PiggyBank,
  Target,
  TrendingDown,
  Wallet
} from 'lucide-react'
import { formatCurrency } from '../utils/monthlyBudgetUtils'

export const BudgetSummary = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Card className="bg-card border-border">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Total orcado</span>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="text-2xl font-bold text-primary">
            {formatCurrency(summary.totalBudgeted)}
          </div>
          <div className="flex items-center gap-1 text-xs text-primary mt-1">
            <ArrowUpRight className="w-3 h-3" />
            Limites configurados
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Total gasto</span>
            <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-destructive" />
            </div>
          </div>
          <div className="text-2xl font-bold text-destructive">
            {formatCurrency(summary.totalSpent)}
          </div>
          <div className="flex items-center gap-1 text-xs text-destructive mt-1">
            <ArrowDownRight className="w-3 h-3" />
            Soma dos gastos do periodo
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Quanto sobra</span>
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-accent" />
            </div>
          </div>
          <div
            className={`text-2xl font-bold ${summary.remaining >= 0 ? 'text-primary' : 'text-destructive'}`}
          >
            {formatCurrency(summary.remaining)}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <PiggyBank className="w-3 h-3" />
            Saldo entre orcado e gasto
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Uso medio</span>
            <div className="w-9 h-9 rounded-lg bg-chart-4/10 flex items-center justify-center">
              <Target className="w-4 h-4 text-chart-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {summary.averageUsage.toFixed(1)}%
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <Target className="w-3 h-3" />
            Media de consumo das categorias
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
