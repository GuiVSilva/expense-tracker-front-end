import { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { categoriesQueryOptions } from '@/queries/categories'
import { useDebounce } from '@/hooks/useDebounce'
import { financialAccountsService } from '@/services/financialAccounts'

const ITEMS_PER_PAGE = 5
const TRANSACTIONS_STALE_TIME = 1000 * 60
const TRANSACTIONS_GC_TIME = 1000 * 60 * 10

export const useAccountsPayableReceivable = () => {
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    status: 'all',
    category: 'all'
  })
  const [currentPage, setCurrentPage] = useState(1)
  const debouncedSearch = useDebounce(filters.search)

  const { data: categories } = useQuery(categoriesQueryOptions)

  const {
    data: accountsData,
    refech: refechAccounts,
    isLoading
  } = useQuery({
    queryKey: [
      'financial-accounts',
      currentPage,
      debouncedSearch,
      filters.type,
      filters.status,
      filters.category
    ],
    queryFn: () =>
      financialAccountsService.getAccounts({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        search: debouncedSearch,
        type: filters.type,
        status: filters.status,
        category: filters.category
      }),
    staleTime: TRANSACTIONS_STALE_TIME,
    gcTime: TRANSACTIONS_GC_TIME,
    placeholderData: keepPreviousData
  })

  const accounts = accountsData?.accounts || []
  const totalItems = accountsData?.total || 0
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / ITEMS_PER_PAGE) : 1

  const summary = {
    receivable: 0,
    payable: 0,
    todayDue: 0,
    overdue: 0
  }

  const setFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      type: 'all',
      status: 'all',
      category: 'all'
    })
    setCurrentPage(1)
  }

  return {
    accounts,
    filters,
    setFilter,
    clearFilters,
    totalItems,
    totalPages,
    currentPage,
    setCurrentPage,
    isLoading,
    refechAccounts,
    categories,
    summary
  }
}
