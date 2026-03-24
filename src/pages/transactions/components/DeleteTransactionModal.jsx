import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { transactionsService } from '@/services/transactions'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export const DeleteTransactionModal = ({ open, onClose, line }) => {
  const queryClient = useQueryClient()

  const { mutate: deleteTransaction, isPending: isLoading } = useMutation({
    mutationFn: () => transactionsService.deleteTransaction({ id: line.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      toast.success('Transação excluida com sucesso!')
      onClose()
    },
    onError: error => {
      toast.error(error?.response?.data?.message || 'Erro inesperado')
    }
  })

  if (!open) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Confirmar exclusão
          </DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir esta transação? Esta ação não pode
            ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-transparent"
            loading={isLoading}
          >
            Cancelar
          </Button>
          <Button
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            onClick={() => deleteTransaction()}
            loading={isLoading}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
