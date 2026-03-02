import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { ArrowUpRight, ArrowDownRight, Trash2 } from 'lucide-react'

export const TransactionDetailModal = ({
  detailTransaction,
  setDetailTransaction,
  setDeleteConfirm,
  formatCurrency,
  formatDate
}) => {
  return (
    <Dialog open={!!detailTransaction} onOpenChange={() => setDetailTransaction(null)}>
      {detailTransaction && (
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Detalhes da Transação</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-2">
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
                  value: detailTransaction.type === 'income' ? 'Receita' : 'Despesa'
                },
                { label: 'Categoria', value: detailTransaction.category },
                { label: 'Data', value: formatDate(detailTransaction.date) },
                { label: 'Método', value: detailTransaction.method }
              ].map(item => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium text-foreground">{item.value}</span>
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
  )
}
