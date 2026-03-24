import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate } from '@/lib/formatters'
import { Plus } from 'lucide-react'
import { useTransactions } from './hooks/useTransactions'
import { TransactionsFilters } from './components/TransactionsFilters'
import { TransactionsSummary } from './components/TransactionsSummary'
import { TransactionsList } from './components/TransactionsList'
import { NewTransactionModal } from './components/NewTransactionModal'
import { DeleteTransactionModal } from './components/DeleteTransactionModal'
import { ExportTransactionsModal } from './components/ExportTransactionsModal'

export const Transactions = () => {
  const {
    filters,
    currentPage,
    setCurrentPage,
    transactions,
    totalItems,
    summary,
    totalPages,
    updateFilter,
    clearFilters,
    categoriesData,
    isLoading,
    refetchTransactions
  } = useTransactions()

  const [openDialogTransaction, setOpenDialogTransaction] = useState(false)
  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const [openDialogExport, setOpenDialogExport] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const handleOpenDialogNewTrasaction = () => setOpenDialogTransaction(true)

  const handleCloseDialogNewTransaction = () => {
    setOpenDialogTransaction(false)
  }

  const handleOpenDialogDelete = transactions => {
    setDeleteConfirm(transactions)
    setOpenDialogDelete(true)
  }

  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false)
    refetchTransactions()
  }

  const handleOpenDialogExport = () => setOpenDialogExport(true)

  const handleCloseDialogExport = () => setOpenDialogExport(false)

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Transações</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie todas as suas movimentações financeiras
          </p>
        </div>

        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={() => handleOpenDialogNewTrasaction()}
        >
          <Plus className="w-5 h-5 mr-2" />
          <span className="hidden sm:inline">Nova Transação</span>
        </Button>
      </div>

      <TransactionsSummary
        summary={summary}
        formatCurrency={formatCurrency}
        isLoading={isLoading}
      />

      <TransactionsFilters
        filters={filters}
        categories={categoriesData}
        onFilterChange={updateFilter}
        onClearFilters={clearFilters}
        handleOpenDialogExport={handleOpenDialogExport}
      />

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {totalItems} transação
          {totalItems !== 1 ? 'es' : ''} encontrada
          {totalItems !== 1 ? 's' : ''}
        </p>
      </div>

      <TransactionsList
        transactions={transactions}
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isLoading}
        formatCurrency={formatCurrency}
        formatDateShort={formatDate}
        handleOpenDialogDelete={handleOpenDialogDelete}
        onPageChange={setCurrentPage}
        onClearFilters={clearFilters}
      />

      <NewTransactionModal
        open={openDialogTransaction}
        onClose={handleCloseDialogNewTransaction}
        categories={categoriesData}
      />

      <DeleteTransactionModal
        open={openDialogDelete}
        onClose={handleCloseDialogDelete}
        line={deleteConfirm}
      />

      <ExportTransactionsModal
        open={openDialogExport}
        onClose={handleCloseDialogExport}
        categories={categoriesData}
      />
    </>
  )
}
