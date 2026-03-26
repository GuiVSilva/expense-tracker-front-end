import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Plus, Trash2 } from 'lucide-react'
import { calculateOpenAmount } from '../utils/accountsPayableReceivableUtils'
import {
  formatPaymentMethod,
  paymentMethodOptions
} from '@/lib/payment-methods'
import { formatCurrency, formatDate } from '@/lib/formatters'
import { accountTypeOptions, statusOptions } from '@/lib/account-meta'

export const AccountsModals = ({
  formOpen,
  editingAccount,
  deleteAccount,
  paymentAccount,
  detailsAccount,
  formData,
  paymentEntries,
  setFormData,
  onCloseForm,
  onSave,
  onCancelDelete,
  onConfirmDelete,
  onClosePayment,
  onAddPaymentRow,
  onUpdatePaymentRow,
  onRemovePaymentRow,
  onRegisterPayments,
  onCloseDetails
}) => {
  const isValid =
    Boolean(formData.description.trim()) &&
    Boolean(formData.category.trim()) &&
    Number(formData.amount) > 0 &&
    Boolean(formData.dueDate)

  const paymentEntriesValid = paymentEntries.some(
    entry => Number(entry.amount) > 0
  )
  const paymentTotal = paymentEntries.reduce(
    (sum, entry) => sum + (Number(entry.amount) > 0 ? Number(entry.amount) : 0),
    0
  )
  const paymentOpenAmount = paymentAccount
    ? calculateOpenAmount(paymentAccount)
    : 0
  const exceedsOpenAmount = paymentTotal > paymentOpenAmount

  return (
    <>
      <Dialog
        open={formOpen}
        onOpenChange={open => {
          if (!open) onCloseForm()
        }}
      >
        <DialogContent className="sm:max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle>
              {editingAccount ? 'Editar conta' : 'Nova conta a receber/pagar'}
            </DialogTitle>
            <DialogDescription>
              {editingAccount
                ? 'Atualize os dados e o valor da conta selecionada.'
                : 'Defina tipo, valor, vencimento e regras de parcelamento.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Descricao</Label>
              <Input
                value={formData.description}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    description: e.target.value
                  }))
                }
                placeholder="Ex: Parcela cliente XPTO"
                className="bg-secondary border-border"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select
                  value={formData.type}
                  onValueChange={value =>
                    setFormData(prev => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger className="w-full bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {accountTypeOptions
                      .filter(item => item.value !== 'all')
                      .map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Categoria</Label>
                <Input
                  value={formData.category}
                  onChange={e =>
                    setFormData(prev => ({ ...prev, category: e.target.value }))
                  }
                  placeholder="Ex: Moradia"
                  className="bg-secondary border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Valor</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={e =>
                    setFormData(prev => ({ ...prev, amount: e.target.value }))
                  }
                  className="bg-secondary border-border"
                />
              </div>

              <div className="space-y-2">
                <Label>Vencimento</Label>
                <Input
                  type="date"
                  value={formData.dueDate}
                  onChange={e =>
                    setFormData(prev => ({ ...prev, dueDate: e.target.value }))
                  }
                  className="bg-secondary border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={value =>
                    setFormData(prev => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger className="w-full bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions
                      .filter(item => item.value !== 'all')
                      .map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {!editingAccount && (
                <div className="space-y-2">
                  <Label>Parcelas</Label>
                  <Input
                    type="number"
                    min={1}
                    max={36}
                    value={formData.installments}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        installments: Math.min(
                          36,
                          Math.max(1, Number(e.target.value) || 1)
                        )
                      }))
                    }
                    className="bg-secondary border-border"
                  />
                </div>
              )}
            </div>

            {!editingAccount && (
              <div className="flex items-start gap-3 rounded-md border border-border/70 bg-secondary/30 p-3">
                <Checkbox
                  id="splitInstallments"
                  checked={formData.splitInstallments}
                  onCheckedChange={value =>
                    setFormData(prev => ({
                      ...prev,
                      splitInstallments: Boolean(value)
                    }))
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="splitInstallments" className="cursor-pointer">
                    Diluir valor entre parcelas
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Marcado: valor informado sera dividido entre as parcelas.
                    Desmarcado: cada parcela tera o valor cheio.
                  </p>
                </div>
              </div>
            )}

            {editingAccount && (
              <p className="text-xs text-muted-foreground">
                Parcelamento so pode ser definido na criacao da conta.
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={onCloseForm}
              className="bg-transparent"
            >
              Cancelar
            </Button>
            <Button onClick={onSave} disabled={!isValid}>
              {editingAccount ? 'Salvar alteracoes' : 'Criar conta'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(paymentAccount)}
        onOpenChange={open => {
          if (!open) onClosePayment()
        }}
      >
        <DialogContent className="sm:max-w-xl bg-card border-border">
          <DialogHeader>
            <DialogTitle>Registrar pagamento</DialogTitle>
            <DialogDescription>
              Informe o valor pago e o metodo. Voce pode registrar mais de uma
              forma no mesmo lancamento.
            </DialogDescription>
          </DialogHeader>

          {paymentAccount && (
            <div className="space-y-4 py-1">
              <div className="rounded-lg border border-border/70 bg-secondary/20 p-3">
                <p className="text-sm font-medium text-foreground">
                  {paymentAccount.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  Em aberto:{' '}
                  {formatCurrency(calculateOpenAmount(paymentAccount))}
                </p>
                <p className="text-xs text-muted-foreground">
                  Total informado: {formatCurrency(paymentTotal)}
                </p>
              </div>

              <div className="space-y-3">
                {paymentEntries.map(entry => (
                  <div key={entry.id} className="grid grid-cols-12 gap-2">
                    <div className="col-span-4">
                      <Input
                        type="number"
                        step="0.01"
                        min={0}
                        placeholder="Valor"
                        value={entry.amount}
                        onChange={e =>
                          onUpdatePaymentRow(entry.id, 'amount', e.target.value)
                        }
                        className="bg-secondary border-border"
                      />
                    </div>
                    <div className="col-span-6">
                      <Select
                        value={entry.method}
                        onValueChange={value =>
                          onUpdatePaymentRow(entry.id, 'method', value)
                        }
                      >
                        <SelectTrigger className="w-full bg-secondary border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentMethodOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2 flex justify-end">
                      <Button
                        variant="outline"
                        size="icon-sm"
                        className="bg-transparent"
                        onClick={() => onRemovePaymentRow(entry.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                onClick={onAddPaymentRow}
                className="bg-transparent"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar forma de pagamento
              </Button>
              {exceedsOpenAmount && (
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  O valor informado ultrapassa o total em aberto. Ajuste os
                  valores.
                </p>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={onClosePayment}
              className="bg-transparent"
            >
              Cancelar
            </Button>
            <Button
              onClick={onRegisterPayments}
              disabled={!paymentEntriesValid || exceedsOpenAmount}
            >
              Registrar pagamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(detailsAccount)}
        onOpenChange={open => {
          if (!open) onCloseDetails()
        }}
      >
        <DialogContent className="sm:max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle>Pagamentos realizados</DialogTitle>
            <DialogDescription>
              Detalhes da conta e historico dos pagamentos.
            </DialogDescription>
          </DialogHeader>

          {detailsAccount && (
            <div className="space-y-4 py-1">
              <div className="rounded-lg border border-border/70 bg-secondary/20 p-3 space-y-1">
                <p className="text-sm font-medium text-foreground">
                  {detailsAccount.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  Valor: {formatCurrency(detailsAccount.amount)} | Em aberto:{' '}
                  {formatCurrency(calculateOpenAmount(detailsAccount))}
                </p>
                <p className="text-xs text-muted-foreground">
                  Total pago: {formatCurrency(detailsAccount.paidAmount || 0)}
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
              onClick={onCloseDetails}
              className="bg-transparent"
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(deleteAccount)}
        onOpenChange={open => {
          if (!open) onCancelDelete()
        }}
      >
        <DialogContent className="sm:max-w-sm bg-card border-border">
          <DialogHeader>
            <DialogTitle>Excluir conta</DialogTitle>
            <DialogDescription>
              Deseja realmente excluir{' '}
              <span className="font-semibold text-foreground">
                {deleteAccount?.description}
              </span>
              ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={onCancelDelete}
              className="bg-transparent"
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={onConfirmDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
