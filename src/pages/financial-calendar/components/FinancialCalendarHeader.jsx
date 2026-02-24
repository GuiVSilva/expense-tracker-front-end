import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react'

export const FinancialCalendarHeader = ({ monthLabel, onPrevMonth, onNextMonth }) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Calendario Financeiro</h1>
        <p className="text-sm text-muted-foreground">
          Visualize vencimentos, entradas e movimentos de metas em um unico calendario.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={onPrevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex min-w-52 items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium capitalize">
          <CalendarDays className="h-4 w-4 text-primary" />
          {monthLabel}
        </div>
        <Button variant="outline" size="icon" onClick={onNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
