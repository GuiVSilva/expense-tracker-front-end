import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'

export const NotificationsTab = ({ notifications, setNotifications }) => {
  const options = [
    {
      key: 'spendingLimitAlerts',
      label: 'Alertas de limite de gastos',
      description: 'Aviso quando os gastos ficarem proximos do limite mensal.'
    },
    {
      key: 'goalsAchieved',
      label: 'Metas atingidas',
      description: 'Notificacao quando uma meta financeira for concluida.'
    },
    {
      key: 'upcomingPayments',
      label: 'Pagamentos proximos',
      description: 'Lembretes de vencimentos e boletos da semana.'
    },
    {
      key: 'weeklySummary',
      label: 'Resumo semanal',
      description: 'Resumo automatico com saldo e principais variacoes.'
    }
  ]

  return (
    <Card className="border-border bg-card/80">
      <CardHeader>
        <CardTitle>Notificacoes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {options.map(option => (
          <label
            key={option.key}
            htmlFor={option.key}
            className="flex items-start gap-3 rounded-xl border border-border bg-card p-3 hover:bg-secondary/30 transition-colors"
          >
            <Checkbox
              id={option.key}
              checked={notifications[option.key]}
              onCheckedChange={checked =>
                setNotifications({
                  ...notifications,
                  [option.key]: Boolean(checked)
                })
              }
              className="mt-0.5"
            />
            <div>
              <p className="text-sm font-medium text-foreground">{option.label}</p>
              <p className="text-xs text-muted-foreground">{option.description}</p>
            </div>
          </label>
        ))}
      </CardContent>
    </Card>
  )
}
