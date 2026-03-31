import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { financialAccountsService } from '@/services/financialAccounts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const AccountDeleteModal = ({ open, onClose, account }) => {
  const queryClient = useQueryClient()

  const { mutate: deleteAccount, isPending: isLoading } = useMutation({
    mutationFn: () =>
      financialAccountsService.deleteTransaction({ id: account.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financial-accounts'] })
      toast.success('Conta excluida com sucesso!')
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
          <DialogTitle>Confirmar exclusão</DialogTitle>
          <DialogDescription>
            Deseja realmente excluir essa conta? Essa ação não pode ser
            desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-transparent"
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={() => deleteAccount()}
            loading={isLoading}
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
