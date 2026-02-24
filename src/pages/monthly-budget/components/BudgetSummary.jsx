import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '../utils/monthlyBudgetUtils'

export const BudgetSummary = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Card>
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground mb-1">Total orcado</p>
          <p className="text-2xl font-bold text-foreground">
            {formatCurrency(summary.totalBudgeted)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground mb-1">Total gasto</p>
          <p className="text-2xl font-bold text-destructive">
            {formatCurrency(summary.totalSpent)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground mb-1">Quanto sobra</p>
          <p
            className={`text-2xl font-bold ${summary.remaining >= 0 ? 'text-primary' : 'text-destructive'}`}
          >
            {formatCurrency(summary.remaining)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground mb-1">Uso medio</p>
          <p className="text-2xl font-bold text-foreground">
            {summary.averageUsage.toFixed(1)}%
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
