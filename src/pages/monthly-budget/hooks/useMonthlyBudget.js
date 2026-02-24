import { useMemo, useState } from 'react'
import {
  getUsagePercent,
  initialBudgetCategories
} from '../utils/monthlyBudgetUtils'

export const useMonthlyBudget = () => {
  const [categories, setCategories] = useState(initialBudgetCategories)
  const [configOpen, setConfigOpen] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    initialBudgetCategories[0]?.id || null
  )
  const [limitValue, setLimitValue] = useState(
    String(initialBudgetCategories[0]?.limit || '')
  )

  const selectedCategory = useMemo(
    () => categories.find(category => category.id === selectedCategoryId) || null,
    [categories, selectedCategoryId]
  )

  const summary = useMemo(() => {
    const totalBudgeted = categories.reduce(
      (acc, category) => acc + category.limit,
      0
    )
    const totalSpent = categories.reduce((acc, category) => acc + category.spent, 0)

    return {
      totalBudgeted,
      totalSpent,
      remaining: totalBudgeted - totalSpent,
      averageUsage:
        categories.reduce((acc, category) => acc + getUsagePercent(category), 0) /
        categories.length
    }
  }, [categories])

  const openConfigModal = categoryId => {
    const category = categories.find(item => item.id === categoryId) || categories[0]
    if (!category) return

    setSelectedCategoryId(category.id)
    setLimitValue(String(category.limit))
    setConfigOpen(true)
  }

  const handleCategoryChange = value => {
    const categoryId = Number(value)
    const category = categories.find(item => item.id === categoryId)
    if (!category) return

    setSelectedCategoryId(categoryId)
    setLimitValue(String(category.limit))
  }

  const saveLimit = () => {
    const parsedLimit = Number(limitValue)
    if (!selectedCategoryId || !parsedLimit) return

    setCategories(prev =>
      prev.map(category =>
        category.id === selectedCategoryId
          ? {
              ...category,
              limit: parsedLimit
            }
          : category
      )
    )
    setConfigOpen(false)
  }

  return {
    categories,
    summary,
    configOpen,
    setConfigOpen,
    selectedCategory,
    selectedCategoryId,
    limitValue,
    setLimitValue,
    openConfigModal,
    handleCategoryChange,
    saveLimit
  }
}
