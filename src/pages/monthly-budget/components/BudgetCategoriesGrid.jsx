import { BudgetCategoryCard } from './BudgetCategoryCard'

export const BudgetCategoriesGrid = ({ categories, onConfigure, onDetails }) => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
      {categories.map(category => (
        <BudgetCategoryCard
          key={category.id}
          category={category}
          onConfigure={onConfigure}
          onDetails={onDetails}
        />
      ))}
    </div>
  )
}
