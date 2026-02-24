import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Eye, Pencil, Target, Trash2, Wallet } from 'lucide-react'
import {
  colorOptions,
  formatCurrency,
  formatDate,
  getCurrentAmount,
  getGoalStatus,
  iconOptions
} from '../utils/goalUtils'

export const GoalCard = ({
  goal,
  onDetails,
  onDeposit,
  onEdit,
  onDelete
}) => {
  const currentAmount = getCurrentAmount(goal)
  const progress = Math.min((currentAmount / goal.target) * 100, 100)
  const status = getGoalStatus(goal)
  const Icon = iconOptions[goal.iconKey] || Target
  const color = colorOptions[goal.colorKey] || colorOptions.emerald

  return (
    <Card className={color.card}>
      <CardHeader className="gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color.iconBox}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-base">{goal.name}</CardTitle>
              <p className="text-xs text-muted-foreground">Prazo: {formatDate(goal.deadline)}</p>
            </div>
          </div>
          <Badge className={status.className}>{status.label}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {formatCurrency(currentAmount)} / {formatCurrency(goal.target)}
            </span>
            <span className="font-semibold text-foreground">{progress.toFixed(1)}%</span>
          </div>
          <div className="relative">
            <Progress value={progress} className="bg-secondary" />
            <div
              className={`absolute left-0 top-0 h-2 rounded-full ${color.progress}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="text-sm text-muted-foreground min-h-10">{goal.description}</p>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" size="sm" onClick={onDetails}>
            <Eye className="w-4 h-4 mr-2" />
            Detalhes
          </Button>
          <Button variant="secondary" size="sm" onClick={onDeposit}>
            <Wallet className="w-4 h-4 mr-2" />
            Depositar
          </Button>
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Pencil className="w-4 h-4 mr-2" />
            Editar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive border-destructive/40 hover:bg-destructive/10"
            onClick={onDelete}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Excluir
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
