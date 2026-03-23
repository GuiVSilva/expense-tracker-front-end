import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, TrendingDown, CalendarDays } from 'lucide-react'
import { TransactionsSummarySkeleton } from './TransactionsLoading'

export const TransactionsSummary = ({ summary, formatCurrency, isLoading }) => {
  if (isLoading) {
    return <TransactionsSummarySkeleton />
  }

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
        </CardContent>
      </Card>
    </div>
  )
}
