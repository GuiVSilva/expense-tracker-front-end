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
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export const DeleteTransactionModal = ({ open, onClose, line }) => {
  const [isLoading, setIsloading] = useState(false)
  if (!open) return null

  const handleSubmit = async () => {
    setIsloading(true)
    try {
      await transactionsService.deleteTransaction({ id: line.id })
      toast.success('Transação excluída com sucesso!')
      onClose()
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Erro inesperado')
    } finally {
      setIsloading(false)
    }
  }

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
            onClick={handleSubmit}
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
