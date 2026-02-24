import { Card, CardContent } from '@/components/ui/card'
import { CalendarClock, CircleAlert, HandCoins, Landmark } from 'lucide-react'
import { formatCurrency } from '../utils/accountsPayableReceivableUtils'

export const AccountsSummaryCards = ({ summary }) => {
  const cards = [
    {
      id: 'receivable',
      label: 'A receber',
      value: formatCurrency(summary.receivable),
      icon: Landmark,
      iconWrap: 'bg-primary/10',
      iconClass: 'text-primary',
      valueClass: 'text-primary',
      helper: 'Total em aberto'
    },
    {
      id: 'payable',
      label: 'A pagar',
      value: formatCurrency(summary.payable),
      icon: HandCoins,
      iconWrap: 'bg-destructive/10',
      iconClass: 'text-destructive',
      valueClass: 'text-destructive',
      helper: 'Total em aberto'
    },
    {
      id: 'today',
      label: 'Vencendo hoje',
      value: String(summary.todayDue),
      icon: CalendarClock,
      iconWrap: 'bg-chart-4/10',
      iconClass: 'text-chart-4',
      valueClass: 'text-foreground',
      helper: 'Titulos para hoje'
    },
    {
      id: 'overdue',
      label: 'Atrasadas',
      value: String(summary.overdue),
      icon: CircleAlert,
      iconWrap: 'bg-amber-500/15',
      iconClass: 'text-amber-700 dark:text-amber-300',
      valueClass: 'text-foreground',
      helper: 'Exigem atencao'
    }
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map(card => {
        const Icon = card.icon

        return (
          <Card key={card.id} className="bg-card border-border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{card.label}</span>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.iconWrap}`}>
                  <Icon className={`w-4 h-4 ${card.iconClass}`} />
                </div>
              </div>
              <div className={`text-2xl font-bold ${card.valueClass}`}>{card.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{card.helper}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
