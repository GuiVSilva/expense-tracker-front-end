import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { formatCurrency } from '@/lib/formatters'
import { paymentMethodOptions } from '@/lib/payment-methods'
import { financialAccountsService } from '@/services/financialAccounts'
import { CalendarDays, CircleDollarSign, Wallet } from 'lucide-react'
import { toast } from 'sonner'
import { getInitialAccountPayForm } from '../constansts/accountPayForm'
import { getAccountPaySchema } from '../schemas/accountPaySchema'
import { calculateOpenAmount } from '../utils/accountsPayableReceivableUtils'

export const AccountPayModal = ({ open, onClose, account }) => {
  const queryClient = useQueryClient()
  const openAmount = account ? calculateOpenAmount(account) : 0

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isValid }
  } = useForm({
    resolver: zodResolver(getAccountPaySchema(openAmount)),
    defaultValues: getInitialAccountPayForm(),
    mode: 'onChange'
  })

  const paymentAmount = Number(watch('amount')) || 0

  const { mutate: registerPayment, isPending: isLoading } = useMutation({
    mutationFn: data =>
      financialAccountsService.registerPayment({
        id: account.id,
        amount: Number(data.amount),
        method: data.method,
        date: data.date
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financial-accounts'] })
      toast.success('Pagamento registrado com sucesso!')
      reset(getInitialAccountPayForm())
      onClose()
    },
    onError: error => {
      toast.error(error?.response?.data?.message || 'Erro inesperado')
    }
  })

  const handleClose = () => {
    reset(getInitialAccountPayForm())
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl bg-card border-border">
        <DialogHeader>
          <DialogTitle>Registrar pagamento</DialogTitle>
          <DialogDescription>
            Preencha apenas o valor, o metodo e a data para registrar este
            pagamento.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(registerPayment)}>
          <div className="space-y-5 py-1">
            <div className="rounded-xl border border-border/70 bg-secondary/25 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    {account.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Lance um unico pagamento para esta conta.
                  </p>
                </div>
                <Badge className="bg-primary/10 text-primary">
                  Em aberto: {formatCurrency(openAmount)}
                </Badge>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
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
                    <span className="text-xs">Ja pago</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {formatCurrency(account.amountPaid || 0)}
                  </p>
                </div>

                <div className="rounded-lg border border-border/60 bg-card p-3">
                  <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    <span className="text-xs">Pagamento atual</span>
                  </div>
                  <p className="text-sm font-semibold text-primary">
                    {formatCurrency(paymentAmount)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border/70 bg-card p-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="payment-amount">Valor do pagamento</Label>
                  <Input
                    id="payment-amount"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0,00"
                    className="bg-secondary border-border"
                    {...register('amount')}
                  />
                  {errors.amount ? (
                    <p className="text-xs text-destructive">
                      {errors.amount.message}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Informe quanto foi pago nesta movimentacao.
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Metodo de pagamento</Label>
                  <Controller
                    control={control}
                    name="method"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full bg-secondary border-border">
                          <SelectValue placeholder="Selecione o metodo" />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentMethodOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.method ? (
                    <p className="text-xs text-destructive">
                      {errors.method.message}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Label htmlFor="payment-date">Data do pagamento</Label>
                <Input
                  id="payment-date"
                  type="date"
                  className="bg-secondary border-border"
                  {...register('date')}
                />
                {errors.date ? (
                  <p className="text-xs text-destructive">
                    {errors.date.message}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <DialogFooter className="mt-5">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="bg-transparent"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={!isValid} loading={isLoading}>
              Registrar pagamento
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
