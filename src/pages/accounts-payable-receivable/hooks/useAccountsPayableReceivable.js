import { useMemo, useState } from 'react'
import {
  calculateOpenAmount,
  initialAccounts
  // resolveStatusByPayment
} from '../utils/accountsPayableReceivableUtils'
import { useQuery } from '@tanstack/react-query'
import { categoriesQueryOptions } from '@/queries/categories'

export const useAccountsPayableReceivable = () => {
  const [accounts, setAccounts] = useState(initialAccounts)
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    status: 'all',
    category: 'all'
  })

  const { data: categories } = useQuery(categoriesQueryOptions)
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

  return {
    accounts: filteredAccounts,
    allCount: accounts.length,
    filters,
    setFilter,
    clearFilters,
    categories,
    summary
  }
}
