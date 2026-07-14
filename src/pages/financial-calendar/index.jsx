import { FinancialCalendarGrid } from './components/FinancialCalendarGrid'
import { FinancialCalendarHeader } from './components/FinancialCalendarHeader'
import { FinancialEventsDetailsPanel } from './components/FinancialEventsDetailsPanel'
import { useFinancialCalendar } from './hooks/useFinancialCalendar'

export const FinancialCalendar = () => {
  const {
    monthLabel,
    calendarDays,
    eventsByDate,
    goPrevMonth,
    goNextMonth,
    isToday,
    accountsData
  } = useFinancialCalendar()
  return (
    <div className="space-y-8">
      <FinancialCalendarHeader
        monthLabel={monthLabel}
        onPrevMonth={goPrevMonth}
        onNextMonth={goNextMonth}
      />

      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-3">
        <div className="2xl:col-span-2">
          <FinancialCalendarGrid
            days={calendarDays}
            eventsByDate={eventsByDate}
            isToday={isToday}
          />
        </div>
        <FinancialEventsDetailsPanel events={accountsData} />
      </div>
    </div>
  )
}
