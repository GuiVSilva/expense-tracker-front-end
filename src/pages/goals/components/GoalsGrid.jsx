import { GoalCard } from './GoalCard'

export const GoalsGrid = ({
  goals,
  onDetails,
  onDeposit,
  onEdit,
  onDelete
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
      {goals.map(goal => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onDetails={() => onDetails(goal.id)}
          onDeposit={() => onDeposit(goal.id)}
          onEdit={() => onEdit(goal)}
          onDelete={() => onDelete(goal.id)}
        />
      ))}
    </div>
  )
}
