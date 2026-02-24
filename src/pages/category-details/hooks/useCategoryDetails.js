import { useMemo } from 'react'
import { useParams } from 'react-router'
import {
  getBudgetCategoryByName,
  getCategoryInsights,
  getCategorySummary,
  getCategoryTransactions,
  getCategoryTrend,
  normalizeCategoryKey
} from '../utils/categoryDetailsUtils'

export const useCategoryDetails = () => {
  const { categoryName } = useParams()
  const normalizedCategory = normalizeCategoryKey(categoryName)

  const budgetCategory = useMemo(
    () => getBudgetCategoryByName(normalizedCategory),
    [normalizedCategory]
  )

  const trend = useMemo(
    () => getCategoryTrend(normalizedCategory),
    [normalizedCategory]
  )

  const summary = useMemo(
    () => getCategorySummary(trend, budgetCategory?.limit || 0),
    [trend, budgetCategory?.limit]
  )

  const insights = useMemo(
    () => getCategoryInsights(normalizedCategory, summary),
    [normalizedCategory, summary]
  )

  const transactions = useMemo(
    () => getCategoryTransactions(normalizedCategory),
    [normalizedCategory]
  )

  return {
    normalizedCategory,
    budgetCategory,
    trend,
    summary,
    insights,
    transactions,
    notFound: !budgetCategory
  }
}
