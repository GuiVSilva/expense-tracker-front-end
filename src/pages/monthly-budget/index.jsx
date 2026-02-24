import { useNavigate } from 'react-router'
import { BudgetCategoriesGrid } from './components/BudgetCategoriesGrid'
import { BudgetConfigModal } from './components/BudgetConfigModal'
import { BudgetSummary } from './components/BudgetSummary'
import { MonthlyBudgetHeader } from './components/MonthlyBudgetHeader'
import { useMonthlyBudget } from './hooks/useMonthlyBudget'

export const MonthlyBudget = () => {
  const navigate = useNavigate()

  const {
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
  } = useMonthlyBudget()

  const handleOpenDetails = categoryName => {
    navigate(`/categories/${encodeURIComponent(categoryName)}`)
  }

  return (
    <div className="space-y-8">
      <MonthlyBudgetHeader onConfigure={() => openConfigModal(categories[0]?.id)} />

      <BudgetSummary summary={summary} />

      <BudgetCategoriesGrid
        categories={categories}
        onConfigure={openConfigModal}
        onDetails={handleOpenDetails}
      />

      <BudgetConfigModal
        open={configOpen}
        setOpen={setConfigOpen}
        categories={categories}
        selectedCategory={selectedCategory}
        selectedCategoryId={selectedCategoryId}
        limitValue={limitValue}
        setLimitValue={setLimitValue}
        onCategoryChange={handleCategoryChange}
        onSave={saveLimit}
      />
    </div>
  )
}
