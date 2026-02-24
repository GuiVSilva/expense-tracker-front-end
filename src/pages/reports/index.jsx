import { CategoryDonutChart } from './components/CategoryDonutChart'
import { IncomeExpenseBarChart } from './components/IncomeExpenseBarChart'
import { InsightsCards } from './components/InsightsCards'
import { MonthlyEvolutionTable } from './components/MonthlyEvolutionTable'
import { ReportsHeader } from './components/ReportsHeader'
import { ReportsSummaryCards } from './components/ReportsSummaryCards'
import { useReports } from './hooks/useReports'

export const Reports = () => {
  const {
    period,
    setPeriod,
    summary,
    barChartData,
    categoryDistribution,
    monthlyEvolution,
    insights
  } = useReports()

  return (
    <div className="space-y-8">
      <ReportsHeader period={period} setPeriod={setPeriod} />

      <ReportsSummaryCards summary={summary} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <IncomeExpenseBarChart data={barChartData} />
        </div>
        <CategoryDonutChart data={categoryDistribution} />
      </div>

      <MonthlyEvolutionTable data={monthlyEvolution} />

      <InsightsCards insights={insights} />
    </div>
  )
}
