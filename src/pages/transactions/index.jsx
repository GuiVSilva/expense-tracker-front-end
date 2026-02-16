import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useTransactions } from './hooks/useTransactions'
import { TransactionsFilters } from './components/TransactionsFilters'
import { TransactionsSummary } from './components/TransactionsSummary'
import { TransactionsList } from './components/TransactionsList'
import { TransactionsPagination } from './components/TransactionsPagination'
import { TransactionModals } from './components/TransactionModals'

const allTransactions = [
  {
    id: 1,
    description: 'Salario',
    category: 'Renda',
    amount: 5500.0,
    type: 'income',
    date: '2026-02-01',
    method: 'Transferencia'
  },
  {
    id: 2,
    description: 'Supermercado Extra',
    category: 'Alimentacao',
    amount: 450.0,
    type: 'expense',
    date: '2026-02-02',
    method: 'Cartao Credito'
  }
]

export const Transactions = () => {
  const [newTransactionOpen, setNewTransactionOpen] = useState(false)
  const [detailTransaction, setDetailTransaction] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const {
    filters,
    currentPage,
    setCurrentPage,
    filteredTransactions,
    paginatedTransactions,
    summary,
    uniqueCategories,
    totalPages,
    updateFilter,
    clearFilters
  } = useTransactions(allTransactions)

  const formatCurrency = value =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)

  const formatDateShort = dateString =>
    new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short'
    })

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
          onClick={() => setNewTransactionOpen(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          <span className="hidden sm:inline">Nova Transação</span>
        </Button>
      </div>

      <TransactionsSummary summary={summary} formatCurrency={formatCurrency} />

      <TransactionsFilters
        filters={filters}
        uniqueCategories={uniqueCategories}
        onFilterChange={updateFilter}
        onClearFilters={clearFilters}
      />

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {filteredTransactions.length} transação
          {filteredTransactions.length !== 1 ? 'es' : ''} encontrada
          {filteredTransactions.length !== 1 ? 's' : ''}
        </p>
      </div>

      <TransactionsList
        transactions={paginatedTransactions}
        formatCurrency={formatCurrency}
        formatDateShort={formatDateShort}
        onViewDetails={setDetailTransaction}
        onDelete={setDeleteConfirm}
        onClearFilters={clearFilters}
      />

      <TransactionsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <TransactionModals
        newTransactionOpen={newTransactionOpen}
        setNewTransactionOpen={setNewTransactionOpen}
        detailTransaction={detailTransaction}
        setDetailTransaction={setDetailTransaction}
        deleteConfirm={deleteConfirm}
        setDeleteConfirm={setDeleteConfirm}
        uniqueCategories={uniqueCategories}
        formatCurrency={formatCurrency}
        formatDate={formatDateShort}
      />
    </>
  )
}
