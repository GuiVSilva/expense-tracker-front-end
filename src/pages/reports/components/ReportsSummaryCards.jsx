import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '../utils/reportsUtils'

export const ReportsSummaryCards = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Card>
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground">Total receitas</p>
          <p className="text-2xl font-bold text-primary mt-1">
            {formatCurrency(summary.totalIncome)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground">Total despesas</p>
          <p className="text-2xl font-bold text-destructive mt-1">
            {formatCurrency(summary.totalExpense)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground">Saldo</p>
          <p
            className={`text-2xl font-bold mt-1 ${summary.balance >= 0 ? 'text-primary' : 'text-destructive'}`}
          >
            {formatCurrency(summary.balance)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground">Media diaria de gastos</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {formatCurrency(summary.dailyAverageExpense)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
