import { categoriesService } from '@/services/categories'
import { transactionsService } from '@/services/transactions'
import { useDebounce } from '@/hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const ITEMS_PER_PAGE = 8

export const useTransactions = () => {
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    category: 'all',
    sortBy: 'desc',
    dateFrom: '',
    dateTo: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const debouncedSearch = useDebounce(filters.search)

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesService.getCategories()
  })

  const {
    data: transactionsData,
    isLoading,
    refetch: refetchTransactions
  } = useQuery({
    queryKey: [
      'transactions',
      currentPage,
      debouncedSearch,
      filters.type,
      filters.category,
      filters.sortBy,
      filters.dateFrom,
      filters.dateTo
    ],
    queryFn: () =>
      transactionsService.getTransactions({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        search: debouncedSearch,
        type: filters.type,
        category: filters.category,
        sortBy: filters.sortBy,
        dateFrom: filters.dateFrom,
        dateTo: filters.dateTo
      })
  })

  const transactions = transactionsData?.transactions || []
  const totalItems = transactionsData?.total || 0
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / ITEMS_PER_PAGE) : 1

  const summary = transactionsData?.summary || {
    income: 0,
    expense: 0,
    balance: 0
  }

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      type: 'all',
      category: 'all',
      sortBy: 'desc',
      dateFrom: '',
      dateTo: ''
    })
    setCurrentPage(1)
  }

  return {
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
    transactionsData,
    isLoading,
    refetchTransactions
  }
}
