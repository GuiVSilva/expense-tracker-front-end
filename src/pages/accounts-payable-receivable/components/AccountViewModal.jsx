import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { createElement } from 'react'
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
import {
  getResolvedAccountStatus,
  getStatusMeta,
  getTypeMeta
} from '@/lib/account-meta'
import { getCategoryColor, getCategoryIcon } from '@/lib/category-meta'
import {
  CalendarDays,
  CircleDollarSign,
  CreditCard,
  ReceiptText,
  Wallet
} from 'lucide-react'
import { calculateOpenAmount } from '../utils/accountsPayableReceivableUtils'

export const AccountViewModal = ({ open, onClose, account }) => {
  if (!open) return null

  const payments = account?.financialAccountPayments ?? []
  const openAmount = account ? calculateOpenAmount(account) : 0
  const typeMeta = getTypeMeta(account?.type)
  const resolvedStatus = getResolvedAccountStatus(
    account?.status,
    account?.dueDate
  )
  const statusMeta = getStatusMeta(account?.status, account?.dueDate)
  const categoryName = account?.category?.name
  const categoryIcon = getCategoryIcon(categoryName)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle>Pagamentos realizados</DialogTitle>
          <DialogDescription>
            Detalhes da conta e historico dos pagamentos.
          </DialogDescription>
        </DialogHeader>

        {account && (
          <div className="space-y-5 py-1">
            <div className="rounded-xl border border-border/70 bg-secondary/20 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <p className="text-base font-semibold text-foreground">
                    {account.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={typeMeta.className}>
                      {typeMeta.label}
                    </Badge>
                    <Badge className={statusMeta.className}>
                      {statusMeta.label}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`font-normal ${getCategoryColor(categoryName)}`}
                    >
                      {createElement(categoryIcon, {
                        className: 'mr-1 h-3 w-3'
                      })}
                      {categoryName}
                    </Badge>
                  </div>
                </div>

                <div className="rounded-lg border border-border/60 bg-card px-3 py-2 text-right">
                  <p className="text-xs text-muted-foreground">
                    Total de pagamentos
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {payments.length}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
                <div className="rounded-lg border border-border/60 bg-card p-3">
                  <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                    <CircleDollarSign className="h-4 w-4" />
                    <span className="text-xs">Valor total</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {formatCurrency(account.amount)}
                  </p>
                </div>

                <div className="rounded-lg border border-border/60 bg-card p-3">
                  <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                    <Wallet className="h-4 w-4" />
                    <span className="text-xs">Total pago</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {formatCurrency(account.amountPaid || 0)}
                  </p>
                </div>

                <div className="rounded-lg border border-border/60 bg-card p-3">
                  <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                    <ReceiptText className="h-4 w-4" />
                    <span className="text-xs">Em aberto</span>
                  </div>
                  <p className="text-sm font-semibold text-primary">
                    {formatCurrency(openAmount)}
                  </p>
                </div>

                <div className="rounded-lg border border-border/60 bg-card p-3">
                  <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    <span className="text-xs">Vencimento</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {formatDate(account.dueDate)}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                  Historico de pagamentos
                </h3>
                {resolvedStatus === 'overdue' ? (
                  <span className="text-xs text-muted-foreground">
                    Status visual: atrasado
                  </span>
                ) : null}
              </div>

              {payments.length ? (
                <div className="space-y-3">
                  {payments.map(payment => (
                    <div
                      key={payment.id}
                      className="rounded-xl border border-border/70 bg-card p-4"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-foreground">
                            {formatCurrency(payment.amount)}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3 text-sm text-muted-foreground sm:text-right">
                          <div className="flex items-center gap-2 sm:justify-end">
                            <CalendarDays className="h-4 w-4" />
                            <span>
                              Pago em {formatDate(payment.paymentDate)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 sm:justify-end">
                            <CreditCard className="h-4 w-4" />
                            <span>{formatPaymentMethod(payment.method)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-border/80 bg-secondary/10 p-6 text-center">
                  <p className="text-sm font-medium text-foreground">
                    Nenhum pagamento registrado
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Esta conta ainda nao possui lancamentos em
                    `financialAccountPayments`.
                  </p>
                </div>
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
