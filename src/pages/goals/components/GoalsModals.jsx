import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Pencil, Trash2, Wallet } from 'lucide-react'
import { GoalFormFields } from './GoalFormFields'
import {
  formatCurrency,
  formatDate,
  getAverageMonthlyDeposits,
  getHistoryChartData,
  getProjectedDate
} from '../utils/goalUtils'

export const GoalsModals = ({
  createOpen,
  setCreateOpen,
  selectedGoal,
  setDetailsGoalId,
  depositGoal,
  setDepositGoalId,
  editGoal,
  setEditGoalId,
  deleteGoal,
  setDeleteGoalId,
  createForm,
  setCreateForm,
  editForm,
  setEditForm,
  depositValue,
  setDepositValue,
  openEditModal,
  handleCreateGoal,
  handleDeposit,
  handleSaveEdit,
  handleDeleteGoal
}) => {
  return (
    <>
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Criar nova meta</DialogTitle>
            <DialogDescription>
              Defina nome, alvo, prazo, icone, cor e descricao da meta.
            </DialogDescription>
          </DialogHeader>

          <GoalFormFields form={createForm} setForm={setCreateForm} />

          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateGoal}>Criar meta</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedGoal} onOpenChange={() => setDetailsGoalId(null)}>
        {selectedGoal && (
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedGoal.name}</DialogTitle>
              <DialogDescription>
                Historico de depositos, projecao de conclusao e grafico de progresso.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Historico de depositos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 max-h-64 overflow-auto">
                  {selectedGoal.deposits.length ? (
                    [...selectedGoal.deposits]
                      .sort((a, b) => b.date.localeCompare(a.date))
                      .map(deposit => (
                        <div
                          key={deposit.id}
                          className="flex items-center justify-between rounded-md border border-border p-3"
                        >
                          <span className="text-sm text-muted-foreground">{formatDate(deposit.date)}</span>
                          <span className="font-semibold text-primary">{formatCurrency(deposit.amount)}</span>
                        </div>
                      ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Nenhum deposito realizado.</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Projecao de conclusao</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {(() => {
                    const projected = getProjectedDate(selectedGoal)
                    const average = getAverageMonthlyDeposits(selectedGoal)

                    if (!projected) {
                      return (
                        <p className="text-sm text-muted-foreground">
                          Sem media de depositos suficiente para projetar conclusao.
                        </p>
                      )
                    }

                    return (
                      <>
                        <p className="text-sm text-muted-foreground">Data estimada</p>
                        <p className="text-xl font-bold text-foreground">{formatDate(projected)}</p>
                        <p className="text-sm text-muted-foreground">
                          Media mensal de depositos: {formatCurrency(average)}/mes
                        </p>
                      </>
                    )
                  })()}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Grafico de progresso</CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const chartData = getHistoryChartData(selectedGoal)

                  if (!chartData.length) {
                    return (
                      <p className="text-sm text-muted-foreground">
                        Sem dados para exibir o grafico de progresso.
                      </p>
                    )
                  }

                  return (
                    <div className="flex items-end gap-2 h-40">
                      {chartData.map(point => (
                        <div key={point.label} className="flex-1 min-w-0 h-full">
                          <div className="h-[calc(100%-2.25rem)] w-full flex items-end">
                            <div
                              className="w-full bg-primary/20 rounded-md"
                              style={{ height: `${Math.max(point.percent, 6)}%` }}
                            />
                          </div>
                          <p className="mt-2 text-[11px] text-muted-foreground truncate text-center">
                            {point.label}
                          </p>
                          <p className="text-[11px] font-medium text-foreground text-center">
                            {point.percent.toFixed(0)}%
                          </p>
                        </div>
                      ))}
                    </div>
                  )
                })()}
              </CardContent>
            </Card>

            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => {
                  setDetailsGoalId(null)
                  setDepositGoalId(selectedGoal.id)
                }}
              >
                <Wallet className="w-4 h-4 mr-2" />
                Depositar
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setDetailsGoalId(null)
                  openEditModal(selectedGoal)
                }}
              >
                <Pencil className="w-4 h-4 mr-2" />
                Editar
              </Button>
              <Button
                variant="outline"
                className="text-destructive border-destructive/40 hover:bg-destructive/10"
                onClick={() => {
                  setDetailsGoalId(null)
                  setDeleteGoalId(selectedGoal.id)
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      <Dialog open={!!depositGoal} onOpenChange={() => setDepositGoalId(null)}>
        {depositGoal && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Depositar valor</DialogTitle>
              <DialogDescription>
                Adicione um novo deposito para a meta {depositGoal.name}.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2 py-2">
              <Label htmlFor="deposit-value">Valor do deposito</Label>
              <Input
                id="deposit-value"
                type="number"
                min="1"
                value={depositValue}
                onChange={event => setDepositValue(event.target.value)}
                placeholder="500"
              />
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDepositGoalId(null)}>
                Cancelar
              </Button>
              <Button onClick={handleDeposit} disabled={!Number(depositValue)}>
                Confirmar deposito
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      <Dialog open={!!editGoal} onOpenChange={() => setEditGoalId(null)}>
        {editGoal && (
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Editar meta</DialogTitle>
              <DialogDescription>
                Atualize os dados principais da meta selecionada.
              </DialogDescription>
            </DialogHeader>

            <GoalFormFields form={editForm} setForm={setEditForm} />

            <DialogFooter>
              <Button variant="outline" onClick={() => setEditGoalId(null)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveEdit}>Salvar alteracoes</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      <Dialog open={!!deleteGoal} onOpenChange={() => setDeleteGoalId(null)}>
        {deleteGoal && (
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Excluir meta</DialogTitle>
              <DialogDescription>
                Esta acao remove a meta {deleteGoal.name} e todo historico de depositos.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteGoalId(null)}>
                Cancelar
              </Button>
              <Button
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                onClick={handleDeleteGoal}
              >
                Excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
