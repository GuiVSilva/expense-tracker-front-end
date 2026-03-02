import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Trash2 } from 'lucide-react'

export const DeleteTransactionModal = ({ deleteConfirm, setDeleteConfirm }) => {
  return (
    <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
      {deleteConfirm && (
        <DialogContent className="sm:max-w-sm bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir a transação{' '}
              <span className="font-semibold text-foreground">
                {deleteConfirm.description}
              </span>
              ? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteConfirm(null)}
              className="bg-transparent"
            >
              Cancelar
            </Button>
            <Button
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              onClick={() => setDeleteConfirm(null)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  )
}
