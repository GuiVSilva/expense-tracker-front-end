import { Plus } from 'lucide-react'
import { AccountsFilters } from './components/AccountsFilters'
import { AccountsModals } from './components/AccountsModals'
import { AccountsSummaryCards } from './components/AccountsSummaryCards'
import { AccountsTable } from './components/AccountsTable'
import { useAccountsPayableReceivable } from './hooks/useAccountsPayableReceivable'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { AccountsRegisterModal } from './components/AccountsRegisterModal'

export const AccountsPayableReceivable = () => {
  const {
    accounts,
    allCount,
    filters,
    setFilter,
    clearFilters,
    categories,
    summary
  } = useAccountsPayableReceivable()
  const [openModalRegisterAccount, setOpenModalRegisterAccount] =
    useState(false)

  const handleOpenModalRegisterAccount = () => setOpenModalRegisterAccount(true)

  const handleCloseModalRegisterAccount = () =>
    setOpenModalRegisterAccount(false)
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Contas a Receber/Pagar
          </h1>
          <p className="text-sm text-muted-foreground">
            Controle vencimentos, pagamentos e recebimentos em uma unica tela.
          </p>
        </div>

        <Button onClick={handleOpenModalRegisterAccount}>
          <Plus className="w-4 h-4 mr-2" />
          Nova conta
        </Button>
      </div>

      <AccountsSummaryCards summary={summary} />

      <AccountsFilters
        filters={filters}
        categories={categories}
        onFilterChange={setFilter}
        onClearFilters={clearFilters}
      />

      <div className="text-sm text-muted-foreground">
        {accounts.length} de {allCount} contas exibidas
      </div>

      <AccountsTable
        accounts={accounts}
        // onPay={openPaymentModal}
        // onViewDetails={openDetailsModal}
        // onEdit={openEditModal}
        // onDelete={setDeleteAccount}
      />

      <AccountsRegisterModal
        open={openModalRegisterAccount}
        onClose={handleCloseModalRegisterAccount}
        categories={categories}
      />
    </div>
  )
}
