import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
import { financialAccountsService } from '@/services/financialAccounts'
import { toast } from 'sonner'
import { getInitialAccountEditForm } from '../constansts/accountEditForm'
import { accountEditSchema } from '../schemas/accountEditSchema'

export const AccountEditModal = ({ open, onClose, account, categories }) => {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid }
  } = useForm({
    resolver: zodResolver(accountEditSchema),
    defaultValues: getInitialAccountEditForm(),
    mode: 'onChange'
  })

  useEffect(() => {
    if (!open || !account) return

    reset(getInitialAccountEditForm(account))
  }, [open, account, reset])

  const { mutate: updateAccount, isPending: isLoading } = useMutation({
    mutationFn: data =>
      financialAccountsService.updateAccount({
        id: account.id,
        description: data.description,
        category: data.category,
        amount: data.amount,
        dueDate: data.dueDate
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financial-accounts'] })
      toast.success('Conta atualizada com sucesso!')
      reset(getInitialAccountEditForm())
      onClose()
    },
    onError: error => {
      toast.error(error?.response?.data?.message || 'Erro inesperado')
    }
  })

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <form onSubmit={handleSubmit(updateAccount)}>
          <DialogHeader>
            <DialogTitle>Editar conta</DialogTitle>
            <DialogDescription>
              Atualize descricao, categoria, vencimento, valor e status da conta
              selecionada.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-description">Descrição</Label>
              <Input
                id="edit-description"
                placeholder="Ex: Parcela cliente XPTO"
                className="bg-secondary border-border"
                {...register('description')}
              />
              {errors.description ? (
                <p className="text-xs text-destructive">
                  {errors.description.message}
                </p>
              ) : null}
            </div>

            <div className="grid grid-cols-1 gap-4">
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
                        {(categories || []).map(category => (
                          <SelectItem
                            key={category.id}
                            value={String(category.id)}
                          >
                            {category.name}
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

              {/* <div className="space-y-2">
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
              </div> */}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="edit-amount">Valor (R$)</Label>
                <Input
                  id="edit-amount"
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
                <Label htmlFor="edit-due-date">Vencimento</Label>
                <Input
                  id="edit-due-date"
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
            <Button type="submit" disabled={!isValid} loading={isLoading}>
              Salvar alteracoes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
