import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  formatCurrency,
  formatLongDate,
  getEventTypeMeta
} from '../utils/financialCalendarUtils'

export const UpcomingEventsPanel = ({ events }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Proximos eventos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {events.map(event => {
          const eventMeta = getEventTypeMeta(event.type)

          return (
            <div
              key={event.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-border/70 bg-card p-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {event.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatLongDate(event.date)}
                </p>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className={`rounded-md px-2 py-0.5 text-[11px] ${eventMeta.colorClass}`}>
                  {eventMeta.label}
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {formatCurrency(event.amount)}
                </span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
