import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  getEventTypeMeta,
  getWeekDays,
  formatCurrency
} from '../utils/financialCalendarUtils'

export const FinancialCalendarGrid = ({ days, eventsByDate, isToday }) => {
  const weekDays = getWeekDays()

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Agenda mensal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-muted-foreground">
          {weekDays.map(weekDay => (
            <div key={weekDay} className="py-1">
              {weekDay}
            </div>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-2">
          {days.map(day => {
            const dayKey = day.key
            const dayEvents = eventsByDate[dayKey] || []

            return (
              <div
                key={dayKey}
                className={`min-h-28 rounded-lg border p-2 ${
                  day.inCurrentMonth
                    ? 'border-border bg-card'
                    : 'border-border/50 bg-muted/25'
                }`}
              >
                <div
                  className={`mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                    isToday(day.date)
                      ? 'bg-primary text-primary-foreground'
                      : day.inCurrentMonth
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                  }`}
                >
                  {day.day}
                </div>

                <div className="space-y-1.5">
                  {dayEvents.slice(0, 2).map(event => {
                    const eventMeta = getEventTypeMeta(event.type)

                    return (
                      <div
                        key={event.id}
                        className={`truncate rounded-md px-2 py-1 text-[11px] ${eventMeta.colorClass}`}
                        title={`${event.title} - ${formatCurrency(event.amount)}`}
                      >
                        {event.title}
                      </div>
                    )
                  })}
                  {dayEvents.length > 2 && (
                    <div className="text-[11px] font-medium text-muted-foreground">
                      +{dayEvents.length - 2} eventos
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
