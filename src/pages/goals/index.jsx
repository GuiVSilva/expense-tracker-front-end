import { GoalsGrid } from './components/GoalsGrid'
import { GoalsHeader } from './components/GoalsHeader'
import { GoalsModals } from './components/GoalsModals'
import { GoalsProjectionCard } from './components/GoalsProjectionCard'
import { useGoals } from './hooks/useGoals'

export const Goals = () => {
  const {
    goals,
    selectedGoal,
    editGoal,
    deleteGoal,
    depositGoal,
    createOpen,
    setCreateOpen,
    setDetailsGoalId,
    setEditGoalId,
    setDeleteGoalId,
    setDepositGoalId,
    createForm,
    setCreateForm,
    editForm,
    setEditForm,
    depositValue,
    setDepositValue,
    totalTarget,
    totalCurrent,
    overallProgress,
    nextProjectedGoal,
    openEditModal,
    handleCreateGoal,
    handleSaveEdit,
    handleDeposit,
    handleDeleteGoal
  } = useGoals()

  return (
    <div className="space-y-8">
      <GoalsHeader onCreate={() => setCreateOpen(true)} />

      <GoalsProjectionCard
        totalTarget={totalTarget}
        totalCurrent={totalCurrent}
        overallProgress={overallProgress}
        nextProjectedGoal={nextProjectedGoal}
      />

      <GoalsGrid
        goals={goals}
        onDetails={setDetailsGoalId}
        onDeposit={setDepositGoalId}
        onEdit={openEditModal}
        onDelete={setDeleteGoalId}
      />

      <GoalsModals
        createOpen={createOpen}
        setCreateOpen={setCreateOpen}
        selectedGoal={selectedGoal}
        setDetailsGoalId={setDetailsGoalId}
        depositGoal={depositGoal}
        setDepositGoalId={setDepositGoalId}
        editGoal={editGoal}
        setEditGoalId={setEditGoalId}
        deleteGoal={deleteGoal}
        setDeleteGoalId={setDeleteGoalId}
        createForm={createForm}
        setCreateForm={setCreateForm}
        editForm={editForm}
        setEditForm={setEditForm}
        depositValue={depositValue}
        setDepositValue={setDepositValue}
        openEditModal={openEditModal}
        handleCreateGoal={handleCreateGoal}
        handleDeposit={handleDeposit}
        handleSaveEdit={handleSaveEdit}
        handleDeleteGoal={handleDeleteGoal}
      />
    </div>
  )
}
