import { useState } from 'react'
import { CategoryDonutChart } from './components/CategoryDonutChart'
import { IncomeExpenseBarChart } from './components/IncomeExpenseBarChart'
import { InsightsCards } from './components/InsightsCards'
import { MonthlyEvolutionTable } from './components/MonthlyEvolutionTable'
import { ReportsExportModal } from './components/ReportsExportModal'
import { ReportsHeader } from './components/ReportsHeader'
import { ReportsSummaryCards } from './components/ReportsSummaryCards'
import { useReports } from './hooks/useReports'
import { buildReportExportFile } from './utils/reportsUtils'

export const Reports = () => {
  const [exportOpen, setExportOpen] = useState(false)
  const [exportType, setExportType] = useState('summary')

  const {
    period,
    periodLabel,
    setPeriod,
    summary,
    barChartData,
    categoryDistribution,
    monthlyEvolution,
    insights
  } = useReports()

  const handleExportCsv = () => {
    const { filename, csv } = buildReportExportFile({
      type: exportType,
      periodLabel,
      summary,
      barChartData,
      categoryDistribution,
      monthlyEvolution,
      insights
    })

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
    setExportOpen(false)
  }

  return (
    <div className="space-y-8">
      <ReportsHeader
        period={period}
        setPeriod={setPeriod}
        onOpenExport={() => setExportOpen(true)}
      />

      <ReportsSummaryCards summary={summary} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <IncomeExpenseBarChart data={barChartData} />
        </div>
        <CategoryDonutChart data={categoryDistribution} />
      </div>

      <MonthlyEvolutionTable data={monthlyEvolution} />

      <InsightsCards insights={insights} />

      <ReportsExportModal
        open={exportOpen}
        setOpen={setExportOpen}
        exportType={exportType}
        setExportType={setExportType}
        periodLabel={periodLabel}
        onExport={handleExportCsv}
      />
    </div>
  )
}
