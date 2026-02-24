import { Car, PiggyBank, Plane, Shield, Target } from 'lucide-react'

export const iconOptions = {
  target: Target,
  shield: Shield,
  plane: Plane,
  car: Car,
  piggy: PiggyBank
}

export const colorOptions = {
  emerald: {
    name: 'Verde',
    card: 'border-emerald-500/40',
    iconBox: 'bg-emerald-500/15 text-emerald-500',
    progress: 'bg-emerald-500'
  },
  amber: {
    name: 'Amarelo',
    card: 'border-amber-500/40',
    iconBox: 'bg-amber-500/15 text-amber-500',
    progress: 'bg-amber-500'
  },
  sky: {
    name: 'Azul',
    card: 'border-sky-500/40',
    iconBox: 'bg-sky-500/15 text-sky-500',
    progress: 'bg-sky-500'
  },
  rose: {
    name: 'Rosa',
    card: 'border-rose-500/40',
    iconBox: 'bg-rose-500/15 text-rose-500',
    progress: 'bg-rose-500'
  }
}

export const initialGoals = [
  {
    id: 1,
    name: 'Reserva de emergencia',
    target: 18000,
    deadline: '2026-08-15',
    description: 'Cobrir 6 meses de custos fixos.',
    iconKey: 'shield',
    colorKey: 'emerald',
    deposits: [
      { id: 101, date: '2026-01-10', amount: 1500 },
      { id: 102, date: '2026-02-10', amount: 1700 },
      { id: 103, date: '2026-02-22', amount: 500 }
    ]
  },
  {
    id: 2,
    name: 'Viagem internacional',
    target: 12000,
    deadline: '2026-06-25',
    description: 'Pacote completo + reserva para gastos locais.',
    iconKey: 'plane',
    colorKey: 'sky',
    deposits: [
      { id: 201, date: '2025-12-05', amount: 1200 },
      { id: 202, date: '2026-01-18', amount: 900 },
      { id: 203, date: '2026-02-18', amount: 600 }
    ]
  },
  {
    id: 3,
    name: 'Entrada do carro',
    target: 25000,
    deadline: '2026-12-10',
    description: 'Dar entrada de 30% no financiamento.',
    iconKey: 'car',
    colorKey: 'amber',
    deposits: [
      { id: 301, date: '2026-01-12', amount: 2200 },
      { id: 302, date: '2026-02-12', amount: 2100 },
      { id: 303, date: '2026-02-20', amount: 650 }
    ]
  }
]

export const createEmptyGoalForm = () => ({
  name: '',
  target: '',
  deadline: '',
  iconKey: 'target',
  colorKey: 'emerald',
  description: ''
})

export const formatCurrency = value =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value)

export const formatDate = value =>
  new Date(value).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

export const getCurrentAmount = goal =>
  goal.deposits.reduce((total, deposit) => total + deposit.amount, 0)

export const getAverageMonthlyDeposits = goal => {
  if (!goal.deposits.length) return 0

  const groupedByMonth = goal.deposits.reduce((acc, deposit) => {
    const monthKey = deposit.date.slice(0, 7)
    acc[monthKey] = (acc[monthKey] || 0) + deposit.amount
    return acc
  }, {})

  const totals = Object.values(groupedByMonth)
  const monthlyTotal = totals.reduce((acc, monthAmount) => acc + monthAmount, 0)
  return monthlyTotal / totals.length
}

export const getProjectedDate = goal => {
  const currentAmount = getCurrentAmount(goal)
  if (currentAmount >= goal.target) return new Date()

  const averageMonthly = getAverageMonthlyDeposits(goal)
  if (!averageMonthly) return null

  const remainingAmount = goal.target - currentAmount
  const monthsUntilTarget = Math.ceil(remainingAmount / averageMonthly)

  const projectedDate = new Date()
  projectedDate.setMonth(projectedDate.getMonth() + monthsUntilTarget)
  return projectedDate
}

export const getGoalStatus = goal => {
  const currentAmount = getCurrentAmount(goal)

  if (currentAmount >= goal.target) {
    return {
      label: 'Concluida',
      className: 'bg-primary text-primary-foreground border border-primary/40 shadow-sm'
    }
  }

  const projectedDate = getProjectedDate(goal)
  const deadline = new Date(goal.deadline)

  if (!projectedDate || projectedDate > deadline) {
    return {
      label: 'Atrasada',
      className: 'bg-amber-500 text-black'
    }
  }

  return {
    label: 'No prazo',
    className: 'bg-emerald-500 text-black'
  }
}

export const getHistoryChartData = goal => {
  if (!goal.deposits.length) return []

  const sorted = [...goal.deposits].sort((a, b) => a.date.localeCompare(b.date))

  let runningTotal = 0
  return sorted.map(deposit => {
    runningTotal += deposit.amount
    return {
      label: new Date(deposit.date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short'
      }),
      percent: Math.min((runningTotal / goal.target) * 100, 100)
    }
  })
}
