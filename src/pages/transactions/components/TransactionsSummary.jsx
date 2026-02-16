import { Card, CardContent } from '@/components/ui/card'
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays
} from 'lucide-react'

export const TransactionsSummary = ({ summary, formatCurrency }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <Card className="bg-card border-border">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">
              Total Receitas
            </span>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="text-2xl font-bold text-primary">
            {formatCurrency(summary.income)}
          </div>
          <div className="flex items-center gap-1 text-xs text-primary mt-1">
            <ArrowUpRight className="w-3 h-3" />
            {summary.incomeCount} transações
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">
              Total Despesas
            </span>
            <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-destructive" />
            </div>
          </div>
          <div className="text-2xl font-bold text-destructive">
            {formatCurrency(summary.expense)}
          </div>
          <div className="flex items-center gap-1 text-xs text-destructive mt-1">
            <ArrowDownRight className="w-3 h-3" />
            {summary.expenseCount} transações
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Saldo Período</span>
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
              <CalendarDays className="w-4 h-4 text-accent" />
            </div>
          </div>
          <div
            className={`text-2xl font-bold ${summary.balance >= 0 ? 'text-primary' : 'text-destructive'}`}
          >
            {formatCurrency(summary.balance)}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <CalendarDays className="w-3 h-3" />
            Fevereiro 2026
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
