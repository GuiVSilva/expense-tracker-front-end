import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { initialValuesForm } from '../constansts/accountForm'
import { validationSchema } from '../schemas/accountSchema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { financialAccountsService } from '@/services/financialAccounts'
import { toast } from 'sonner'
import { accountTypeOptions, statusOptions } from '@/lib/account-meta'

export const AccountsRegisterModal = ({ open, onClose, categories }) => {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValuesForm
  })

  const { mutate: createAccount, isPending: isLoading } = useMutation({
    mutationFn: data => financialAccountsService.createAccount(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financial-accounts'] })
      toast.success('Conta criada com sucesso!')
      reset(initialValuesForm)
      onClose()
    },
    onError: error => {
      toast.error(error.response?.data?.message || 'Erro inesperado')
    }
  })

  if (!open) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <form onSubmit={handleSubmit(createAccount)}>
          <DialogHeader>
            <DialogTitle>Nova conta a receber/pagar</DialogTitle>
            <DialogDescription>
              Defina tipo, valor, vencimento e regras de parcelamento.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="desc">Descrição</Label>
              <Input
                id="desc"
                placeholder="Ex: Supermercado"
                className="bg-secondary border-border"
                {...register('description')}
              />
              {errors.description ? (
                <p className="text-xs text-destructive">
                  {errors.description.message}
                </p>
              ) : null}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full bg-secondary border-border">
                        <SelectValue placeholder="Selecione o tipo" />
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
                  )}
                />
                {errors.type ? (
                  <p className="text-xs text-destructive">
                    {errors.type.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label>Categoria</Label>
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="bg-secondary border-border w-full">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {(categories || []).map(cat => (
                          <SelectItem key={cat.id} value={String(cat.id)}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category ? (
                  <p className="text-xs text-destructive">
                    {errors.category.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="amount">Valor (R$)</Label>
                <Input
                  id="amount"
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
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Vencimento</Label>
                <Input
                  id="dueDate"
                  type="date"
                  className="bg-secondary border-border"
                  {...register('dueDate')}
                />
                {errors.dueDate ? (
                  <p className="text-xs text-destructive">
                    {errors.dueDate.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Status</Label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full bg-secondary border-border">
                        <SelectValue placeholder="Selecione o status" />
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
                  )}
                />
                {errors.status ? (
                  <p className="text-xs text-destructive">
                    {errors.status.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="installments">Parcelas</Label>
                <Controller
                  control={control}
                  name="installments"
                  render={({ field }) => (
                    <Input
                      id="installments"
                      type="number"
                      min={1}
                      max={36}
                      className="bg-secondary border-border"
                      value={field.value}
                      onChange={e =>
                        field.onChange(
                          Math.min(36, Math.max(1, Number(e.target.value) || 1))
                        )
                      }
                    />
                  )}
                />
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-md border border-border/70 bg-secondary/30 p-3">
              <Controller
                control={control}
                name="splitInstallments"
                render={({ field }) => (
                  <>
                    <Checkbox
                      id="splitInstallments"
                      checked={field.value}
                      onCheckedChange={value => field.onChange(Boolean(value))}
                    />
                    <div className="space-y-1">
                      <Label
                        htmlFor="splitInstallments"
                        className="cursor-pointer"
                      >
                        Diluir valor entre parcelas
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Marcado: valor informado sera dividido entre as
                        parcelas. Desmarcado: cada parcela tera o valor cheio.
                      </p>
                    </div>
                  </>
                )}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-transparent"
            >
              Cancelar
            </Button>
            <Button type="submit" loading={isLoading}>
              Criar conta
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
