import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { formatCurrency, formatDate } from '@/lib/formatters'
import { formatPaymentMethod } from '@/lib/payment-methods'
import { calculateOpenAmount } from '../utils/accountsPayableReceivableUtils'

export const AccountViewModal = ({ open, onClose, account }) => {
  if (!open) return null

  const detailsAccount = {}

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle>Pagamentos realizados</DialogTitle>
          <DialogDescription>
            Detalhes da conta e historico dos pagamentos.
          </DialogDescription>
        </DialogHeader>

        {account && (
          <div className="space-y-4 py-1">
            <div className="rounded-lg border border-border/70 bg-secondary/20 p-3 space-y-1">
              <p className="text-sm font-medium text-foreground">
                {account.description}
              </p>
              <p className="text-xs text-muted-foreground">
                Valor: {formatCurrency(account.amount)} | Em aberto:{' '}
                {formatCurrency(calculateOpenAmount(account))}
              </p>
              <p className="text-xs text-muted-foreground">
                Total pago: {formatCurrency(account.amountPaid || 0)}
              </p>
            </div>

            <div className="space-y-2">
              {(detailsAccount.payments || []).length ? (
                detailsAccount.payments.map(payment => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between rounded-lg border border-border/70 bg-card p-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {formatCurrency(payment.amount)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(payment.date)}
                      </p>
                    </div>
                    <Badge className="bg-primary/10 text-primary">
                      {formatPaymentMethod(payment.method)}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Nenhum pagamento registrado para esta conta.
                </p>
              )}
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-transparent"
          >
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
