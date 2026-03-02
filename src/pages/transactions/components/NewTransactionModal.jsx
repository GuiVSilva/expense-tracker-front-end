import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { TrendingUp, TrendingDown, Plus } from 'lucide-react'
import { getInitialTransactionForm } from '../constants/transactionForm'
import { transactionSchema } from '../schemas/transactionSchema'

export const NewTransactionModal = ({ open, onOpenChange, categories }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: getInitialTransactionForm()
  })

  const transactionType = watch('type')
  if (!open) return null

  const handleClose = nextOpen => {
    onOpenChange(nextOpen)
    if (!nextOpen) {
      reset(getInitialTransactionForm())
    }
  }

  const handleNewTransaction = data => {
    console.log('data', data)
    onOpenChange(false)
    reset(getInitialTransactionForm())
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Nova Transação</DialogTitle>
          <DialogDescription>
            Adicione uma nova movimentação financeira
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleNewTransaction)}>
          <div className="space-y-5 py-2">
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <div className="flex items-center bg-secondary rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => field.onChange('expense')}
                    className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      transactionType === 'expense'
                        ? 'bg-destructive/15 text-destructive shadow-sm'
                        : 'text-muted-foreground'
                    }`}
                  >
                    <TrendingDown className="w-4 h-4 inline mr-2" />
                    Despesa
                  </button>
                  <button
                    type="button"
                    onClick={() => field.onChange('income')}
                    className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      transactionType === 'income'
                        ? 'bg-primary/15 text-primary shadow-sm'
                        : 'text-muted-foreground'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4 inline mr-2" />
                    Receita
                  </button>
                </div>
              )}
            />

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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Valor (R$)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
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
                <Label htmlFor="date">Data</Label>
                <Input
                  id="date"
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

            <div className="grid grid-cols-2 gap-4">
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
              <div className="space-y-2">
                <Label>Método</Label>
                <Controller
                  control={control}
                  name="method"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="bg-secondary border-border w-full">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PIX">PIX</SelectItem>
                        <SelectItem value="Cartao Credito">
                          Cartão Crédito
                        </SelectItem>
                        <SelectItem value="Cartao Debito">
                          Cartão Débito
                        </SelectItem>
                        <SelectItem value="Transferencia">
                          Transferência
                        </SelectItem>
                        <SelectItem value="Boleto">Boleto</SelectItem>
                        <SelectItem value="Dinheiro">Dinheiro</SelectItem>
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
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              className="bg-transparent"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className={
                transactionType === 'income'
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  : 'bg-destructive hover:bg-destructive/90 text-destructive-foreground'
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
