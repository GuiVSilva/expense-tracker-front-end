import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatDate } from '../utils/goalUtils'

export const GoalsProjectionCard = ({
  totalTarget,
  totalCurrent,
  overallProgress,
  nextProjectedGoal
}) => {
  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardHeader>
        <CardTitle>Projecao</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3">
        <div>
          <p className="text-sm text-muted-foreground">Valor total das metas</p>
          <p className="text-2xl font-bold text-foreground">{formatCurrency(totalTarget)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Valor acumulado</p>
          <p className="text-2xl font-bold text-primary">{formatCurrency(totalCurrent)}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Progresso geral: {overallProgress.toFixed(1)}%
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Meta mais proxima</p>
          {nextProjectedGoal ? (
            <>
              <p className="text-lg font-semibold text-foreground">{nextProjectedGoal.name}</p>
              <p className="text-xs text-muted-foreground">
                Previsao: {formatDate(nextProjectedGoal.projectedDate)} com media de{' '}
                {formatCurrency(nextProjectedGoal.averageMonthly)}/mes
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Sem dados suficientes para projecao.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
