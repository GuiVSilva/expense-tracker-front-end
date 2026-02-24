import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '../utils/categoryDetailsUtils'

export const CategoryTrendChart = ({ trend }) => {
  const recentTrend = trend.slice(-8)
  const maxAmount = Math.max(...recentTrend.map(item => item.amount), 1)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tendencia de gastos mensais</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTrend.map(item => (
            <div key={item.month} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium text-foreground">
                  {formatCurrency(item.amount)}
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(item.amount / maxAmount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
