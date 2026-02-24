import { useMemo, useState } from 'react'
import {
  buildInstallmentAccounts,
  calculateOpenAmount,
  canEditAmount,
  defaultForm,
  initialAccounts,
  resolveStatusByPayment
} from '../utils/accountsPayableReceivableUtils'

export const useAccountsPayableReceivable = () => {
  const [accounts, setAccounts] = useState(initialAccounts)
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    status: 'all',
    category: 'all'
  })

  const [formOpen, setFormOpen] = useState(false)
  const [editingAccount, setEditingAccount] = useState(null)
  const [deleteAccount, setDeleteAccount] = useState(null)
  const [formData, setFormData] = useState({ ...defaultForm })
  const [paymentAccount, setPaymentAccount] = useState(null)
  const [detailsAccount, setDetailsAccount] = useState(null)
  const [paymentEntries, setPaymentEntries] = useState([
    { id: 1, amount: '', method: 'pix' }
  ])

  const categories = useMemo(() => {
    return Array.from(new Set(accounts.map(item => item.category))).sort()
  }, [accounts])

  const filteredAccounts = useMemo(() => {
    return accounts.filter(item => {
      if (
        filters.search &&
        !item.description.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false
      }

      if (filters.type !== 'all' && item.type !== filters.type) return false
      if (filters.status !== 'all' && item.status !== filters.status)
        return false
      if (filters.category !== 'all' && item.category !== filters.category)
        return false

      return true
    })
  }, [accounts, filters])

  const summary = useMemo(() => {
    const base = {
      receivable: 0,
      payable: 0,
      todayDue: 0,
      overdue: 0
    }

    const todayKey = new Date().toISOString().split('T')[0]

    accounts.forEach(item => {
      const openAmount = calculateOpenAmount(item)
      if (item.type === 'receivable') base.receivable += openAmount
      if (item.type === 'payable') base.payable += openAmount
      if (item.dueDate === todayKey && item.status !== 'paid')
        base.todayDue += 1
      if (item.status === 'overdue') base.overdue += 1
    })

    return base
  }, [accounts])

  const setFilter = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      type: 'all',
      status: 'all',
      category: 'all'
    })
  }

  const openCreateModal = () => {
    setEditingAccount(null)
    setFormData({ ...defaultForm })
    setFormOpen(true)
  }

  const openEditModal = account => {
    if (!canEditAmount(account.status)) return

    setEditingAccount(account)
    setFormData({
      description: account.description,
      type: account.type,
      category: account.category,
      amount: String(account.amount),
      dueDate: account.dueDate,
      status: account.status,
      installments: 1,
      splitInstallments: true
    })
    setFormOpen(true)
  }

  const closeFormModal = () => {
    setFormOpen(false)
    setEditingAccount(null)
    setFormData({ ...defaultForm })
  }

  const saveAccount = () => {
    if (editingAccount) {
      if (!canEditAmount(editingAccount.status)) {
        closeFormModal()
        return
      }

      const nextAmount = Number(formData.amount)
      setAccounts(prev =>
        prev.map(item =>
          item.id === editingAccount.id
            ? {
                ...item,
                description: formData.description.trim(),
                type: formData.type,
                category: formData.category.trim(),
                amount: nextAmount,
                paidAmount:
                  formData.status === 'partial'
                    ? Math.min(item.paidAmount || 0, nextAmount)
                    : formData.status === 'paid'
                      ? nextAmount
                      : 0,
                dueDate: formData.dueDate,
                status: formData.status
              }
            : item
        )
      )
      closeFormModal()
      return
    }

    const createdAccounts = buildInstallmentAccounts(formData)
    setAccounts(prev => [...createdAccounts, ...prev])
    closeFormModal()
  }

  const openPaymentModal = account => {
    if (account.status === 'paid') return
    setPaymentAccount(account)
    setPaymentEntries([{ id: 1, amount: '', method: 'pix' }])
  }

  const closePaymentModal = () => {
    setPaymentAccount(null)
    setPaymentEntries([{ id: 1, amount: '', method: 'pix' }])
  }

  const addPaymentEntryRow = () => {
    setPaymentEntries(prev => [
      ...prev,
      { id: Date.now(), amount: '', method: 'pix' }
    ])
  }

  const updatePaymentEntry = (entryId, field, value) => {
    setPaymentEntries(prev =>
      prev.map(item =>
        item.id === entryId ? { ...item, [field]: value } : item
      )
    )
  }

  const removePaymentEntry = entryId => {
    setPaymentEntries(prev => {
      if (prev.length === 1) return prev
      return prev.filter(item => item.id !== entryId)
    })
  }

  const registerPayments = () => {
    if (!paymentAccount) return

    const normalizedEntries = paymentEntries
      .map(item => ({
        ...item,
        amount: Number(item.amount)
      }))
      .filter(item => item.amount > 0)

    if (!normalizedEntries.length) return

    const today = new Date().toISOString().split('T')[0]

    setAccounts(prev =>
      prev.map(item => {
        if (item.id !== paymentAccount.id) return item

        let remaining = Math.max(
          Number(item.amount) - Number(item.paidAmount || 0),
          0
        )
        const cappedPayments = []

        normalizedEntries.forEach((entry, index) => {
          if (remaining <= 0) return
          const appliedAmount = Math.min(entry.amount, remaining)
          if (appliedAmount <= 0) return

          cappedPayments.push({
            id: `p-${Date.now()}-${index}`,
            amount: Number(appliedAmount.toFixed(2)),
            method: entry.method,
            date: today
          })
          remaining -= appliedAmount
        })

        if (!cappedPayments.length) return item

        const nextPaidAmount = Math.min(
          Number(item.amount),
          Number(item.paidAmount || 0) +
            cappedPayments.reduce(
              (sum, payment) => sum + Number(payment.amount),
              0
            )
        )

        return {
          ...item,
          payments: [...(item.payments || []), ...cappedPayments],
          paidAmount: nextPaidAmount,
          status: resolveStatusByPayment(
            item.dueDate,
            nextPaidAmount,
            Number(item.amount)
          )
        }
      })
    )

    closePaymentModal()
  }

  const openDetailsModal = account => {
    setDetailsAccount(account)
  }

  const closeDetailsModal = () => {
    setDetailsAccount(null)
  }

  const confirmDelete = () => {
    if (!deleteAccount) return
    setAccounts(prev => prev.filter(item => item.id !== deleteAccount.id))
    setDeleteAccount(null)
  }

  return {
    accounts: filteredAccounts,
    allCount: accounts.length,
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
  }
}
