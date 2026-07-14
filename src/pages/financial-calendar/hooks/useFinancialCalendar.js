import { useMemo, useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import {
  buildMonthGrid,
  getMonthLabel,
  isSameDay,
  transformBackendDataToEvent
} from '../utils/financialCalendarUtils'
import { financialAccountsService } from '@/services/financialAccounts'

const CALENDAR_STALE_TIME = 1000 * 60 * 5 
const CALENDAR_GC_TIME = 1000 * 60 * 30 

export const useFinancialCalendar = () => {
  const today = new Date()

  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())

  const { data: accountsData } = useQuery({
    queryKey: ['financial-accounts-by-month', currentYear, currentMonth],
    queryFn: () =>
      financialAccountsService.getAccountsByMonth({
        year: currentYear,
        month: currentMonth + 1
      }),
    staleTime: CALENDAR_STALE_TIME,
    gcTime: CALENDAR_GC_TIME,
    placeholderData: keepPreviousData
  })

  const events = useMemo(() => {
    if (!accountsData) return []
    return accountsData.map(transformBackendDataToEvent)
  }, [accountsData])

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
    goPrevMonth,
    goNextMonth,
    isToday,
    accountsData
  }
}
