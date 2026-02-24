import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { AlertTriangle, Pencil } from 'lucide-react'
import {
  formatCurrency,
  getAlertText,
  getUsagePercent,
  getUsageStatus
} from '../utils/monthlyBudgetUtils'

export const BudgetCategoryCard = ({ category, onConfigure }) => {
  const percent = getUsagePercent(category)
  const status = getUsageStatus(category)
  const alertText = getAlertText(category)

  return (
    <Card>
      <CardContent className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">{category.icon} Categoria</p>
            <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
          </div>
          <Badge className={status.badgeClass}>{status.label}</Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {formatCurrency(category.spent)} / {formatCurrency(category.limit)}
            </span>
            <span className={`font-semibold ${status.valueClass}`}>
              {percent.toFixed(1)}%
            </span>
          </div>

          <div className="relative">
            <Progress value={Math.min(percent, 100)} className="bg-secondary" />
            <div
              className={`absolute left-0 top-0 h-2 rounded-full ${status.barClass}`}
              style={{ width: `${Math.min(percent, 100)}%` }}
            />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-secondary/30 p-3">
          <div className="flex items-start gap-2">
            <AlertTriangle
              className={`w-4 h-4 mt-0.5 ${percent > 90 ? 'text-destructive' : percent >= 70 ? 'text-amber-500' : 'text-primary'}`}
            />
            <p className="text-sm text-muted-foreground">{alertText}</p>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => onConfigure(category.id)}
        >
          <Pencil className="w-4 h-4 mr-2" />
          Configurar limite
        </Button>
      </CardContent>
    </Card>
  )
}
