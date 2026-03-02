import { NewTransactionModal } from './NewTransactionModal'
import { TransactionDetailModal } from './TransactionDetailModal'
import { DeleteTransactionModal } from './DeleteTransactionModal'

export const TransactionModals = ({
  newTransactionOpen,
  setNewTransactionOpen,
  detailTransaction,
  setDetailTransaction,
  deleteConfirm,
  setDeleteConfirm,
  categories,
  formatCurrency,
  formatDate
}) => {
  return (
    <>
      <NewTransactionModal
        open={newTransactionOpen}
        onOpenChange={setNewTransactionOpen}
        categories={categories}
      />
      <TransactionDetailModal
        detailTransaction={detailTransaction}
        setDetailTransaction={setDetailTransaction}
        setDeleteConfirm={setDeleteConfirm}
        formatCurrency={formatCurrency}
        formatDate={formatDate}
      />
      <DeleteTransactionModal
        deleteConfirm={deleteConfirm}
        setDeleteConfirm={setDeleteConfirm}
      />
    </>
  )
}
