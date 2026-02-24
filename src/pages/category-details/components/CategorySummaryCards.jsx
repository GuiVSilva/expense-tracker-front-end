import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarRange,
  TrendingDown,
  TrendingUp
} from 'lucide-react'
import { formatCurrency, formatPercent } from '../utils/categoryDetailsUtils'

export const CategorySummaryCards = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Card className="bg-card border-border">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Gasto total (12 meses)</span>
            <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-destructive" />
            </div>
          </div>
          <div className="text-2xl font-bold text-destructive">
            {formatCurrency(summary.totalSpent)}
          </div>
          <div className="flex items-center gap-1 text-xs text-destructive mt-1">
            <ArrowDownRight className="w-3 h-3" />
            Acumulado do periodo
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Media mensal</span>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="text-2xl font-bold text-primary">
            {formatCurrency(summary.averageSpent)}
          </div>
          <div className="flex items-center gap-1 text-xs text-primary mt-1">
            <ArrowUpRight className="w-3 h-3" />
            Referencia para planejamento
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Maior mes</span>
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
              <CalendarRange className="w-4 h-4 text-accent" />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {summary.highestMonth.label}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <CalendarRange className="w-3 h-3" />
            {formatCurrency(summary.highestMonth.amount)}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Variacao no ultimo mes</span>
            <div className="w-9 h-9 rounded-lg bg-chart-5/10 flex items-center justify-center">
              {summary.trendDelta >= 0 ? (
                <TrendingUp className="w-4 h-4 text-destructive" />
              ) : (
                <TrendingDown className="w-4 h-4 text-primary" />
              )}
            </div>
          </div>
          <div className={`text-2xl font-bold ${summary.trendDelta >= 0 ? 'text-destructive' : 'text-primary'}`}>
            {formatPercent(summary.trendDelta)}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            {summary.trendDelta >= 0 ? (
              <ArrowUpRight className="w-3 h-3 text-destructive" />
            ) : (
              <ArrowDownRight className="w-3 h-3 text-primary" />
            )}
            Comparacao com o mes anterior
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
