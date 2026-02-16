import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import {
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Trash2
} from 'lucide-react'

export const TransactionModals = ({
  newTransactionOpen,
  setNewTransactionOpen,
  detailTransaction,
  setDetailTransaction,
  deleteConfirm,
  setDeleteConfirm,
  uniqueCategories,
  formatCurrency,
  formatDate
}) => {
  const [newForm, setNewForm] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: '',
    method: '',
    date: new Date().toISOString().split('T')[0]
  })

  const handleNewTransaction = () => {
    setNewTransactionOpen(false)
    setNewForm({
      description: '',
      amount: '',
      type: 'expense',
      category: '',
      method: '',
      date: new Date().toISOString().split('T')[0]
    })
  }

  return (
    <>
      {/* New Transaction Modal */}
      <Dialog open={newTransactionOpen} onOpenChange={setNewTransactionOpen}>
        <DialogContent className="sm:max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              Nova Transação
            </DialogTitle>
            <DialogDescription>
              Adicione uma nova movimentação financeira
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            {/* Type Toggle */}
            <div className="flex items-center bg-secondary rounded-lg p-1">
              <button
                onClick={() => setNewForm({ ...newForm, type: 'expense' })}
                className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  newForm.type === 'expense'
                    ? 'bg-destructive/15 text-destructive shadow-sm'
                    : 'text-muted-foreground'
                }`}
              >
                <TrendingDown className="w-4 h-4 inline mr-2" />
                Despesa
              </button>
              <button
                onClick={() => setNewForm({ ...newForm, type: 'income' })}
                className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  newForm.type === 'income'
                    ? 'bg-primary/15 text-primary shadow-sm'
                    : 'text-muted-foreground'
                }`}
              >
                <TrendingUp className="w-4 h-4 inline mr-2" />
                Receita
              </button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="desc">Descrição</Label>
              <Input
                id="desc"
                placeholder="Ex: Supermercado"
                value={newForm.description}
                onChange={e =>
                  setNewForm({ ...newForm, description: e.target.value })
                }
                className="bg-secondary border-border"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Valor (R$)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={newForm.amount}
                  onChange={e =>
                    setNewForm({ ...newForm, amount: e.target.value })
                  }
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input
                  id="date"
                  type="date"
                  value={newForm.date}
                  onChange={e =>
                    setNewForm({ ...newForm, date: e.target.value })
                  }
                  className="bg-secondary border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select
                  value={newForm.category}
                  onValueChange={v => setNewForm({ ...newForm, category: v })}
                >
                  <SelectTrigger className="bg-secondary border-border w-full">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueCategories.map(cat => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Método</Label>
                <Select
                  value={newForm.method}
                  onValueChange={v => setNewForm({ ...newForm, method: v })}
                >
                  <SelectTrigger className="bg-secondary border-border w-full">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PIX">PIX</SelectItem>
                    <SelectItem value="Cartao Credito">
                      Cartão Crédito
                    </SelectItem>
                    <SelectItem value="Cartao Debito">Cartão Débito</SelectItem>
                    <SelectItem value="Transferencia">Transferência</SelectItem>
                    <SelectItem value="Boleto">Boleto</SelectItem>
                    <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setNewTransactionOpen(false)}
              className="bg-transparent"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleNewTransaction}
              className={
                newForm.type === 'income'
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  : 'bg-destructive hover:bg-destructive/90 text-destructive-foreground'
              }
              disabled={
                !newForm.description ||
                !newForm.amount ||
                !newForm.category ||
                !newForm.method
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transaction Detail Modal */}
      <Dialog
        open={!!detailTransaction}
        onOpenChange={() => setDetailTransaction(null)}
      >
        {detailTransaction && (
          <DialogContent className="sm:max-w-md bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                Detalhes da Transação
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-2">
              {/* Amount highlight */}
              <div className="flex flex-col items-center py-4">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                    detailTransaction.type === 'income'
                      ? 'bg-primary/10'
                      : 'bg-destructive/10'
                  }`}
                >
                  {detailTransaction.type === 'income' ? (
                    <ArrowUpRight className="w-8 h-8 text-primary" />
                  ) : (
                    <ArrowDownRight className="w-8 h-8 text-destructive" />
                  )}
                </div>
                <span
                  className={`text-3xl font-bold ${
                    detailTransaction.type === 'income'
                      ? 'text-primary'
                      : 'text-destructive'
                  }`}
                >
                  {detailTransaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(detailTransaction.amount)}
                </span>
                <span className="text-muted-foreground mt-1">
                  {detailTransaction.description}
                </span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    label: 'Tipo',
                    value:
                      detailTransaction.type === 'income'
                        ? 'Receita'
                        : 'Despesa'
                  },
                  { label: 'Categoria', value: detailTransaction.category },
                  { label: 'Data', value: formatDate(detailTransaction.date) },
                  { label: 'Método', value: detailTransaction.method }
                ].map(item => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <span className="text-sm text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent text-destructive border-destructive/30 hover:bg-destructive/10"
                onClick={() => {
                  setDeleteConfirm(detailTransaction)
                  setDetailTransaction(null)
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={!!deleteConfirm}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        {deleteConfirm && (
          <DialogContent className="sm:max-w-sm bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                Confirmar exclusão
              </DialogTitle>
              <DialogDescription>
                Tem certeza que deseja excluir a transação{' '}
                <span className="font-semibold text-foreground">
                  {deleteConfirm.description}
                </span>
                ? Esta ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteConfirm(null)}
                className="bg-transparent"
              >
                Cancelar
              </Button>
              <Button
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                onClick={() => setDeleteConfirm(null)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
