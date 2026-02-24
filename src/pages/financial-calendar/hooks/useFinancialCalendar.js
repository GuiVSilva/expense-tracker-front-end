import { useMemo, useState } from 'react'
import {
  buildMonthGrid,
  getFinancialEvents,
  getMonthLabel,
  isSameDay
} from '../utils/financialCalendarUtils'

export const useFinancialCalendar = () => {
  const today = new Date()
  const todayStartTimestamp = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  ).getTime()
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())

  const events = useMemo(() => getFinancialEvents(), [])

  const monthLabel = useMemo(
    () => getMonthLabel(currentYear, currentMonth),
    [currentYear, currentMonth]
  )

  const calendarDays = useMemo(
    () => buildMonthGrid(currentYear, currentMonth),
    [currentYear, currentMonth]
  )

  const monthEvents = useMemo(
    () =>
      events.filter(event => {
        const eventDate = new Date(event.date)
        return (
          eventDate.getFullYear() === currentYear &&
          eventDate.getMonth() === currentMonth
        )
      }),
    [events, currentYear, currentMonth]
  )

  const eventsByDate = useMemo(() => {
    return monthEvents.reduce((acc, event) => {
      if (!acc[event.date]) {
        acc[event.date] = []
      }

      acc[event.date].push(event)
      return acc
    }, {})
  }, [monthEvents])

  const upcomingEvents = useMemo(() => {
    return [...events]
      .filter(event => new Date(event.date).getTime() >= todayStartTimestamp)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 8)
  }, [events, todayStartTimestamp])

  const summary = useMemo(() => {
    const totals = monthEvents.reduce(
      (acc, event) => {
        if (event.type === 'income') acc.income += event.amount
        if (event.type === 'expense' || event.type === 'bill') acc.outflow += event.amount
        if (event.type === 'bill') acc.bills += 1
        if (event.type === 'goal') acc.goals += 1
        return acc
      },
      { income: 0, outflow: 0, bills: 0, goals: 0 }
    )

    return [
      { id: 'income', label: 'Entradas previstas', value: totals.income, tone: 'text-emerald-600' },
      { id: 'outflow', label: 'Saidas previstas', value: totals.outflow, tone: 'text-rose-600' },
      { id: 'bills', label: 'Vencimentos', value: totals.bills, tone: 'text-amber-600' },
      { id: 'goals', label: 'Movimentos de metas', value: totals.goals, tone: 'text-blue-600' }
    ]
  }, [monthEvents])

  const goPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(prev => prev - 1)
      return
    }

    setCurrentMonth(prev => prev - 1)
  }

  const goNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(prev => prev + 1)
      return
    }

    setCurrentMonth(prev => prev + 1)
  }

  const isToday = date => isSameDay(date, new Date())

  return {
    monthLabel,
    calendarDays,
    eventsByDate,
    upcomingEvents,
    summary,
    goPrevMonth,
    goNextMonth,
    isToday
  }
}
