import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
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
import { Download } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { toast } from 'sonner'
import { transactionsService } from '@/services/transactions'
import { exportToExcel } from '@/lib/export-to-excel'

const exportTransactionsSchema = z
  .object({
    category: z.string(),
    dateFrom: z.string().min(1, 'Selecione a data inicial'),
    dateTo: z.string().min(1, 'Selecione a data final')
  })
  .refine(data => new Date(data.dateTo) >= new Date(data.dateFrom), {
    message: 'A data final deve ser maior ou igual a data inicial',
    path: ['dateTo']
  })

const initialFilters = {
  category: 'all',
  dateFrom: '',
  dateTo: ''
}

export const ExportTransactionsModal = ({ open, onClose, categories }) => {
  const [isLoading, setIsloading] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(exportTransactionsSchema),
    defaultValues: initialFilters
  })

  if (!open) return null

  const onSubmit = async data => {
    setIsloading(true)
    toast.warning('Exportando transações. Isso pode levar alguns segundos...')
    try {
      const response = await transactionsService.exportTransactions(data)

      console.log('data', response)
      exportToExcel(response, 'transacoes.xlsx')
      toast.success('Transações exportadas com sucesso!')
    } catch (error) {
      toast.error('Erro inesperado. Tente mais tarde.')
      console.log(error)
    } finally {
      setIsloading(false)
    }
  }

  const handleClose = () => {
    reset(initialFilters)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-sm bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Exportar transações
          </DialogTitle>
          <DialogDescription>
            Filtre por período e categoria para exportar apenas os dados que
            deseja.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="bg-secondary border-border w-full">
                      <SelectValue placeholder="Todas categorias" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas categorias</SelectItem>
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="export-date-from">Data inicial</Label>
                <Input
                  id="export-date-from"
                  type="date"
                  className="bg-secondary border-border"
                  {...register('dateFrom')}
                />
                {errors.dateFrom ? (
                  <p className="text-xs text-destructive">
                    {errors.dateFrom.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="export-date-to">Data final</Label>
                <Input
                  id="export-date-to"
                  type="date"
                  className="bg-secondary border-border"
                  {...register('dateTo')}
                />
                {errors.dateTo ? (
                  <p className="text-xs text-destructive">
                    {errors.dateTo.message}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="bg-transparent"
              loading={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="default" loading={isLoading}>
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
