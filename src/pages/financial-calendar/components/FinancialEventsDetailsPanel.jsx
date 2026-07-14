import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, Search, Filter } from 'lucide-react'
import { useState, useMemo } from 'react'
import { formatCurrency, formatLongDate } from '../utils/financialCalendarUtils'

const statusColorMap = {
  PAID: {
    label: 'Pago',
    colorClass: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
  },
  PENDING: {
    label: 'Pendente',
    colorClass: 'bg-amber-500/15 text-amber-700 dark:text-amber-300'
  },
  PARTIAL: {
    label: 'Parcial',
    colorClass: 'bg-blue-500/15 text-blue-700 dark:text-blue-300'
  },
  OVERDUE: {
    label: 'Vencido',
    colorClass: 'bg-rose-500/15 text-rose-700 dark:text-rose-300'
  }
}

const typeColorMap = {
  PAYABLE: {
    label: 'A pagar',
    colorClass: 'bg-destructive/10 text-destructive'
  },
  RECEIVABLE: {
    label: 'A receber',
    colorClass: 'bg-green-500/15 text-green-700 dark:text-green-300'
  }
}

const getStatusMeta = status => statusColorMap[status] || statusColorMap.PENDING
const getTypeMeta = type => typeColorMap[type] || typeColorMap.PAYABLE

const EventItem = ({ event }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const statusMeta = getStatusMeta(event.status)
  const typeMeta = getTypeMeta(event.type)

  return (
    <div
      key={event.id}
      className="border border-border/70 rounded-lg overflow-hidden"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between gap-3 bg-card hover:bg-muted/50 p-3 transition-colors"
      >
        <div className="min-w-0 text-left flex-1">
          <p className="truncate text-sm font-medium text-foreground">
            {event.description}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatLongDate(event.dueDate)}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-sm font-semibold text-foreground min-w-fit">
            {formatCurrency(event.amount)}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="bg-muted/30 p-3 space-y-3 border-t border-border/50">
          <div className="flex gap-2 flex-wrap">
            <Badge className={`${statusMeta.colorClass} border-0`}>
              {statusMeta.label}
            </Badge>
            <Badge className={`${typeMeta.colorClass} border-0`}>
              {typeMeta.label}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-muted-foreground mb-1">Valor Pago</p>
              <p className="font-semibold text-foreground">
                {formatCurrency(event.amountPaid)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Parcela</p>
              <p className="font-semibold text-foreground">
                {event.installmentNumber}/{event.installmentTotal}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Criado em</p>
              <p className="font-semibold text-foreground">
                {formatLongDate(event.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Atualizado em</p>
              <p className="font-semibold text-foreground">
                {formatLongDate(event.updatedAt)}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-border/50">
            <p className="text-muted-foreground text-[10px] mb-1">Categoria</p>
            <p className="text-xs text-foreground">{event.category.name}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export const FinancialEventsDetailsPanel = ({ events = [] }) => {
  const ITEMS_PER_PAGE = 7

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [typeFilter, setTypeFilter] = useState('ALL')
  const [sortBy, setSortBy] = useState('date')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredAndSortedEvents = useMemo(() => {
    if (!events || events.length === 0) return []

    let filtered = events.filter(event => {
      const matchSearch = event.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchStatus =
        statusFilter === 'ALL' || event.status === statusFilter
      const matchType = typeFilter === 'ALL' || event.type === typeFilter

      return matchSearch && matchStatus && matchType
    })

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.dueDate) - new Date(b.dueDate)
        case 'date-desc':
          return new Date(b.dueDate) - new Date(a.dueDate)
        case 'value':
          return parseFloat(a.amount) - parseFloat(b.amount)
        case 'value-desc':
          return parseFloat(b.amount) - parseFloat(a.amount)
        case 'status':
          return a.status.localeCompare(b.status)
        default:
          return 0
      }
    })
  }, [events, searchTerm, statusFilter, typeFilter, sortBy])

  const totalPages = Math.ceil(filteredAndSortedEvents.length / ITEMS_PER_PAGE)
  const paginatedEvents = useMemo(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredAndSortedEvents.slice(startIdx, startIdx + ITEMS_PER_PAGE)
  }, [filteredAndSortedEvents, currentPage])

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1))
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Detalhes dos eventos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por descrição..."
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Select
              value={statusFilter}
              onValueChange={val => {
                setStatusFilter(val)
                setCurrentPage(1)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos os status</SelectItem>
                <SelectItem value="PAID">Pago</SelectItem>
                <SelectItem value="PENDING">Pendente</SelectItem>
                <SelectItem value="PARTIAL">Parcial</SelectItem>
                <SelectItem value="OVERDUE">Vencido</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={typeFilter}
              onValueChange={val => {
                setTypeFilter(val)
                setCurrentPage(1)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos os tipos</SelectItem>
                <SelectItem value="PAYABLE">Pagável</SelectItem>
                <SelectItem value="RECEIVABLE">Recebível</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Data (mais antigo)</SelectItem>
              <SelectItem value="date-desc">Data (mais recente)</SelectItem>
              <SelectItem value="value">Valor (menor)</SelectItem>
              <SelectItem value="value-desc">Valor (maior)</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-muted/50 rounded-lg p-3 text-sm">
          <p className="text-muted-foreground">
            Mostrando{' '}
            <span className="font-semibold text-foreground">
              {paginatedEvents.length}
            </span>{' '}
            de{' '}
            <span className="font-semibold text-foreground">
              {filteredAndSortedEvents.length}
            </span>{' '}
            eventos
            {filteredAndSortedEvents.length > 0 &&
              ` • Página ${currentPage} de ${totalPages}`}
          </p>
        </div>

        {paginatedEvents && paginatedEvents.length > 0 ? (
          <div className="space-y-2">
            {paginatedEvents.map(event => (
              <EventItem key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            {events && events.length > 0
              ? 'Nenhum evento encontrado com os filtros selecionados'
              : 'Nenhum evento disponível'}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <span className="text-xs text-muted-foreground">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Próxima
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
