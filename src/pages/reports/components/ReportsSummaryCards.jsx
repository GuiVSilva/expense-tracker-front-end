import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  PiggyBank,
  TrendingDown,
  TrendingUp
} from 'lucide-react'
import { formatCurrency } from '../utils/reportsUtils'

export const ReportsSummaryCards = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Card className="bg-card border-border">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Total receitas</span>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="text-2xl font-bold text-primary">
            {formatCurrency(summary.totalIncome)}
          </div>
          <div className="flex items-center gap-1 text-xs text-primary mt-1">
            <ArrowUpRight className="w-3 h-3" />
            Entradas consolidadas no periodo
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Total despesas</span>
            <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-destructive" />
            </div>
          </div>
          <div className="text-2xl font-bold text-destructive">
            {formatCurrency(summary.totalExpense)}
          </div>
          <div className="flex items-center gap-1 text-xs text-destructive mt-1">
            <ArrowDownRight className="w-3 h-3" />
            Saidas consolidadas no periodo
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Saldo</span>
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
              <PiggyBank className="w-4 h-4 text-accent" />
            </div>
          </div>
          <div
            className={`text-2xl font-bold ${summary.balance >= 0 ? 'text-primary' : 'text-destructive'}`}
          >
            {formatCurrency(summary.balance)}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <PiggyBank className="w-3 h-3" />
            Resultado liquido do periodo
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Media diaria de gastos</span>
            <div className="w-9 h-9 rounded-lg bg-chart-4/10 flex items-center justify-center">
              <CalendarDays className="w-4 h-4 text-chart-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {formatCurrency(summary.dailyAverageExpense)}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <CalendarDays className="w-3 h-3" />
            Baseado nos dias do periodo
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
