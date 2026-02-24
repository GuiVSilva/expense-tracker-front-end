import { useMemo, useState } from 'react'
import {
  createEmptyGoalForm,
  getAverageMonthlyDeposits,
  getCurrentAmount,
  getProjectedDate,
  initialGoals
} from '../utils/goalUtils'

export const useGoals = () => {
  const [goals, setGoals] = useState(initialGoals)

  const [createOpen, setCreateOpen] = useState(false)
  const [detailsGoalId, setDetailsGoalId] = useState(null)
  const [editGoalId, setEditGoalId] = useState(null)
  const [deleteGoalId, setDeleteGoalId] = useState(null)
  const [depositGoalId, setDepositGoalId] = useState(null)

  const [createForm, setCreateForm] = useState(createEmptyGoalForm())
  const [editForm, setEditForm] = useState(createEmptyGoalForm())
  const [depositValue, setDepositValue] = useState('')

  const selectedGoal = useMemo(
    () => goals.find(goal => goal.id === detailsGoalId) || null,
    [goals, detailsGoalId]
  )

  const editGoal = useMemo(
    () => goals.find(goal => goal.id === editGoalId) || null,
    [goals, editGoalId]
  )

  const deleteGoal = useMemo(
    () => goals.find(goal => goal.id === deleteGoalId) || null,
    [goals, deleteGoalId]
  )

  const depositGoal = useMemo(
    () => goals.find(goal => goal.id === depositGoalId) || null,
    [goals, depositGoalId]
  )

  const totalTarget = goals.reduce((acc, goal) => acc + goal.target, 0)
  const totalCurrent = goals.reduce((acc, goal) => acc + getCurrentAmount(goal), 0)
  const overallProgress = totalTarget ? (totalCurrent / totalTarget) * 100 : 0

  const projectionRanking = useMemo(() => {
    return goals
      .map(goal => ({
        ...goal,
        projectedDate: getProjectedDate(goal),
        averageMonthly: getAverageMonthlyDeposits(goal)
      }))
      .sort((a, b) => {
        if (!a.projectedDate && !b.projectedDate) return 0
        if (!a.projectedDate) return 1
        if (!b.projectedDate) return -1
        return a.projectedDate - b.projectedDate
      })
  }, [goals])

  const nextProjectedGoal = projectionRanking.find(item => item.projectedDate)

  const openEditModal = goal => {
    setEditGoalId(goal.id)
    setEditForm({
      name: goal.name,
      target: String(goal.target),
      deadline: goal.deadline,
      iconKey: goal.iconKey,
      colorKey: goal.colorKey,
      description: goal.description
    })
  }

  const handleCreateGoal = () => {
    const parsedTarget = Number(createForm.target)
    if (!createForm.name || !parsedTarget || !createForm.deadline) return

    setGoals(prev => [
      {
        id: Date.now(),
        name: createForm.name,
        target: parsedTarget,
        deadline: createForm.deadline,
        iconKey: createForm.iconKey,
        colorKey: createForm.colorKey,
        description: createForm.description,
        deposits: []
      },
      ...prev
    ])

    setCreateOpen(false)
    setCreateForm(createEmptyGoalForm())
  }

  const handleSaveEdit = () => {
    const parsedTarget = Number(editForm.target)
    if (!editGoalId || !editForm.name || !parsedTarget || !editForm.deadline) return

    setGoals(prev =>
      prev.map(goal =>
        goal.id === editGoalId
          ? {
              ...goal,
              name: editForm.name,
              target: parsedTarget,
              deadline: editForm.deadline,
              iconKey: editForm.iconKey,
              colorKey: editForm.colorKey,
              description: editForm.description
            }
          : goal
      )
    )

    setEditGoalId(null)
  }

  const handleDeposit = () => {
    const amount = Number(depositValue)
    if (!depositGoalId || !amount) return

    setGoals(prev =>
      prev.map(goal =>
        goal.id === depositGoalId
          ? {
              ...goal,
              deposits: [
                ...goal.deposits,
                {
                  id: Date.now(),
                  date: new Date().toISOString().slice(0, 10),
                  amount
                }
              ]
            }
          : goal
      )
    )

    setDepositGoalId(null)
    setDepositValue('')
  }

  const handleDeleteGoal = () => {
    if (!deleteGoalId) return

    setGoals(prev => prev.filter(goal => goal.id !== deleteGoalId))
    if (detailsGoalId === deleteGoalId) {
      setDetailsGoalId(null)
    }
    setDeleteGoalId(null)
  }

  return {
    goals,
    selectedGoal,
    editGoal,
    deleteGoal,
    depositGoal,
    createOpen,
    setCreateOpen,
    detailsGoalId,
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
  }
}
