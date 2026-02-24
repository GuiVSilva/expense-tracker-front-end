import { useMemo, useState } from 'react'
import {
  getDaysFromMonthKey,
  monthlyData,
  percentageDelta,
  periodSizeMap
} from '../utils/reportsUtils'

export const useReports = () => {
  const [period, setPeriod] = useState('semester')

  const filteredMonths = useMemo(() => {
    const size = periodSizeMap[period] || 6
    return monthlyData.slice(-size)
  }, [period])

  const barChartData = useMemo(() => filteredMonths.slice(-6), [filteredMonths])

  const summary = useMemo(() => {
    const totalIncome = filteredMonths.reduce((acc, month) => acc + month.income, 0)
    const totalExpense = filteredMonths.reduce((acc, month) => acc + month.expense, 0)
    const totalDays = filteredMonths.reduce(
      (acc, month) => acc + getDaysFromMonthKey(month.month),
      0
    )

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      dailyAverageExpense: totalDays ? totalExpense / totalDays : 0
    }
  }, [filteredMonths])

  const categoryDistribution = useMemo(() => {
    const categoryTotals = filteredMonths.reduce((acc, month) => {
      Object.entries(month.categories).forEach(([category, value]) => {
        acc[category] = (acc[category] || 0) + value
      })
      return acc
    }, {})

    const total = Object.values(categoryTotals).reduce((acc, value) => acc + value, 0)

    return Object.entries(categoryTotals)
      .map(([name, amount]) => ({
        name,
        amount,
        percent: total ? (amount / total) * 100 : 0
      }))
      .sort((a, b) => b.amount - a.amount)
  }, [filteredMonths])

  const monthlyEvolution = useMemo(() => {
    return filteredMonths.map((month, index) => {
      const previous = filteredMonths[index - 1]
      const balance = month.income - month.expense

      return {
        label: month.label,
        income: month.income,
        expense: month.expense,
        balance,
        incomeDelta: previous ? percentageDelta(month.income, previous.income) : 0,
        expenseDelta: previous
          ? percentageDelta(month.expense, previous.expense)
          : 0,
        balanceDelta: previous
          ? percentageDelta(balance, previous.income - previous.expense)
          : 0
      }
    })
  }, [filteredMonths])

  const insights = useMemo(() => {
    const last = filteredMonths[filteredMonths.length - 1]
    const previous = filteredMonths[filteredMonths.length - 2]

    if (!last || !previous) {
      return []
    }

    const foodDelta = percentageDelta(
      last.categories.Alimentacao,
      previous.categories.Alimentacao
    )

    const savingRate = ((last.income - last.expense) / last.income) * 100
    const previousSavingRate =
      ((previous.income - previous.expense) / previous.income) * 100

    const expenseDelta = percentageDelta(last.expense, previous.expense)

    return [
      {
        id: 'food-trend',
        title: 'Alimentacao',
        description: `Voce gastou ${Math.abs(foodDelta).toFixed(1)}% ${foodDelta >= 0 ? 'a mais' : 'a menos'} em Alimentacao no ultimo mes.`
      },
      {
        id: 'saving-rate',
        title: 'Taxa de economia',
        description: `Sua taxa de economia ficou em ${savingRate.toFixed(1)}%, variando ${Math.abs(savingRate - previousSavingRate).toFixed(1)} p.p. no periodo.`
      },
      {
        id: 'expense-trend',
        title: 'Controle de despesas',
        description: `As despesas ${expenseDelta >= 0 ? 'subiram' : 'cairam'} ${Math.abs(expenseDelta).toFixed(1)}% comparado ao mes anterior.`
      }
    ]
  }, [filteredMonths])

  return {
    period,
    setPeriod,
    summary,
    barChartData,
    categoryDistribution,
    monthlyEvolution,
    insights
  }
}
