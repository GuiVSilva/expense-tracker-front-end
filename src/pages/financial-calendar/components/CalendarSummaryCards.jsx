import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarClock,
  Target
} from 'lucide-react'
import { formatCurrency } from '../utils/financialCalendarUtils'

export const CalendarSummaryCards = ({ summary }) => {
  const summaryMeta = {
    income: {
      icon: ArrowUpRight,
      iconBoxClass: 'bg-primary/10',
      iconClass: 'text-primary',
      valueClass: 'text-primary',
      helperClass: 'text-primary',
      helperText: 'Entradas previstas no mes'
    },
    outflow: {
      icon: ArrowDownRight,
      iconBoxClass: 'bg-destructive/10',
      iconClass: 'text-destructive',
      valueClass: 'text-destructive',
      helperClass: 'text-destructive',
      helperText: 'Saidas previstas no mes'
    },
    bills: {
      icon: CalendarClock,
      iconBoxClass: 'bg-chart-4/10',
      iconClass: 'text-chart-4',
      valueClass: 'text-foreground',
      helperClass: 'text-muted-foreground',
      helperText: 'Contas com vencimento'
    },
    goals: {
      icon: Target,
      iconBoxClass: 'bg-accent/10',
      iconClass: 'text-accent',
      valueClass: 'text-foreground',
      helperClass: 'text-muted-foreground',
      helperText: 'Movimentos programados'
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {summary.map(item => (
        <Card key={item.id} className="bg-card border-border">
          <CardContent className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${summaryMeta[item.id].iconBoxClass}`}
              >
                {(() => {
                  const Icon = summaryMeta[item.id].icon
                  return <Icon className={`h-4 w-4 ${summaryMeta[item.id].iconClass}`} />
                })()}
              </div>
            </div>

            <div className={`text-2xl font-bold ${summaryMeta[item.id].valueClass}`}>
              {item.id === 'bills' || item.id === 'goals'
                ? `${item.value}`
                : formatCurrency(item.value)}
            </div>

            <div className={`mt-1 text-xs ${summaryMeta[item.id].helperClass}`}>
              {summaryMeta[item.id].helperText}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
