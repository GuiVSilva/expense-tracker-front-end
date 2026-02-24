import { CategoryDetailsHeader } from './components/CategoryDetailsHeader'
import { CategoryInsights } from './components/CategoryInsights'
import { CategoryNotFound } from './components/CategoryNotFound'
import { CategorySummaryCards } from './components/CategorySummaryCards'
import { CategoryTransactionsTable } from './components/CategoryTransactionsTable'
import { CategoryTrendChart } from './components/CategoryTrendChart'
import { useCategoryDetails } from './hooks/useCategoryDetails'

export const CategoryDetails = () => {
  const {
    normalizedCategory,
    trend,
    summary,
    insights,
    transactions,
    notFound
  } = useCategoryDetails()

  if (notFound) {
    return <CategoryNotFound />
  }

  return (
    <div className="space-y-8">
      <CategoryDetailsHeader categoryName={normalizedCategory} />

      <CategorySummaryCards summary={summary} />

      <CategoryTrendChart trend={trend} />

      <CategoryInsights insights={insights} />

      <CategoryTransactionsTable transactions={transactions} />
    </div>
  )
}
