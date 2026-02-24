import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '../utils/reportsUtils'

export const IncomeExpenseBarChart = ({ data }) => {
  const maxValue = Math.max(...data.map(item => Math.max(item.income, item.expense)), 1)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Receitas vs Despesas (ultimos 6 meses)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map(item => (
            <div key={item.month} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="text-muted-foreground">
                  {formatCurrency(item.income)} / {formatCurrency(item.expense)}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-14 text-xs text-muted-foreground">Receita</span>
                  <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${(item.income / maxValue) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-14 text-xs text-muted-foreground">Despesa</span>
                  <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-destructive"
                      style={{ width: `${(item.expense / maxValue) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
