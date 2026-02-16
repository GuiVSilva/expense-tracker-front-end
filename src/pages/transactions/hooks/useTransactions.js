import { useState, useMemo } from 'react'

const ITEMS_PER_PAGE = 8

export const useTransactions = initialTransactions => {
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    category: 'all',
    sortBy: 'date-desc'
  })
  const [currentPage, setCurrentPage] = useState(1)

  const filteredTransactions = useMemo(() => {
    let results = [...initialTransactions]

    if (filters.search) {
      const query = filters.search.toLowerCase()
      results = results.filter(
        t =>
          t.description.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query) ||
          t.method.toLowerCase().includes(query)
      )
    }

    if (filters.type !== 'all') {
      results = results.filter(t => t.type === filters.type)
    }

    if (filters.category !== 'all') {
      results = results.filter(t => t.category === filters.category)
    }

    results.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date-desc':
          return new Date(b.date) - new Date(a.date)
        case 'date-asc':
          return new Date(a.date) - new Date(b.date)
        case 'amount-desc':
          return b.amount - a.amount
        case 'amount-asc':
          return a.amount - b.amount
        case 'name-asc':
          return a.description.localeCompare(b.description)
        default:
          return 0
      }
    })

    return results
  }, [initialTransactions, filters])

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE)
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const summary = useMemo(() => {
    const income = initialTransactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0)
    const expense = initialTransactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0)
    const incomeCount = initialTransactions.filter(
      t => t.type === 'income'
    ).length
    const expenseCount = initialTransactions.filter(
      t => t.type === 'expense'
    ).length

    return {
      income,
      expense,
      balance: income - expense,
      incomeCount,
      expenseCount
    }
  }, [initialTransactions])

  const uniqueCategories = [
    ...new Set(initialTransactions.map(t => t.category))
  ]

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      type: 'all',
      category: 'all',
      sortBy: 'date-desc'
    })
    setCurrentPage(1)
  }

  return {
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
  }
}
