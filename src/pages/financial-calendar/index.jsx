import { CalendarSummaryCards } from './components/CalendarSummaryCards'
import { FinancialCalendarGrid } from './components/FinancialCalendarGrid'
import { FinancialCalendarHeader } from './components/FinancialCalendarHeader'
import { UpcomingEventsPanel } from './components/UpcomingEventsPanel'
import { useFinancialCalendar } from './hooks/useFinancialCalendar'

export const FinancialCalendar = () => {
  const {
    monthLabel,
    calendarDays,
    eventsByDate,
    upcomingEvents,
    summary,
    goPrevMonth,
    goNextMonth,
    isToday
  } = useFinancialCalendar()

  return (
    <div className="space-y-8">
      <FinancialCalendarHeader
        monthLabel={monthLabel}
        onPrevMonth={goPrevMonth}
        onNextMonth={goNextMonth}
      />

      <CalendarSummaryCards summary={summary} />

      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-3">
        <div className="2xl:col-span-2">
          <FinancialCalendarGrid
            days={calendarDays}
            eventsByDate={eventsByDate}
            isToday={isToday}
          />
        </div>
        <UpcomingEventsPanel events={upcomingEvents} />
      </div>
    </div>
  )
}
