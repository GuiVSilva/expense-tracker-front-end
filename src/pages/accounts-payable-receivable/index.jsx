import { AccountsFilters } from './components/AccountsFilters'
import { AccountsHeader } from './components/AccountsHeader'
import { AccountsModals } from './components/AccountsModals'
import { AccountsSummaryCards } from './components/AccountsSummaryCards'
import { AccountsTable } from './components/AccountsTable'
import { useAccountsPayableReceivable } from './hooks/useAccountsPayableReceivable'

export const AccountsPayableReceivable = () => {
  const {
    accounts,
    allCount,
    filters,
    categories,
    summary,
    formOpen,
    editingAccount,
    deleteAccount,
    paymentAccount,
    detailsAccount,
    formData,
    paymentEntries,
    setFormData,
    setDeleteAccount,
    setFilter,
    clearFilters,
    openCreateModal,
    openEditModal,
    closeFormModal,
    saveAccount,
    openPaymentModal,
    closePaymentModal,
    addPaymentEntryRow,
    updatePaymentEntry,
    removePaymentEntry,
    registerPayments,
    openDetailsModal,
    closeDetailsModal,
    confirmDelete
  } = useAccountsPayableReceivable()

  return (
    <div className="space-y-8">
      <AccountsHeader onNew={openCreateModal} />

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
        onPay={openPaymentModal}
        onViewDetails={openDetailsModal}
        onEdit={openEditModal}
        onDelete={setDeleteAccount}
      />

      <AccountsModals
        formOpen={formOpen}
        editingAccount={editingAccount}
        deleteAccount={deleteAccount}
        paymentAccount={paymentAccount}
        detailsAccount={detailsAccount}
        formData={formData}
        paymentEntries={paymentEntries}
        setFormData={setFormData}
        onCloseForm={closeFormModal}
        onSave={saveAccount}
        onClosePayment={closePaymentModal}
        onAddPaymentRow={addPaymentEntryRow}
        onUpdatePaymentRow={updatePaymentEntry}
        onRemovePaymentRow={removePaymentEntry}
        onRegisterPayments={registerPayments}
        onCloseDetails={closeDetailsModal}
        onCancelDelete={() => setDeleteAccount(null)}
        onConfirmDelete={confirmDelete}
      />
    </div>
  )
}
