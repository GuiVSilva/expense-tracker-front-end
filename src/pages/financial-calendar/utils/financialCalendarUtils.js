const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']

const eventTypeMap = {
  income: {
    label: 'Receita',
    colorClass: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
  },
  expense: {
    label: 'Despesa',
    colorClass: 'bg-rose-500/15 text-rose-700 dark:text-rose-300'
  },
  bill: {
    label: 'Vencimento',
    colorClass: 'bg-amber-500/15 text-amber-700 dark:text-amber-300'
  },
  goal: {
    label: 'Meta',
    colorClass: 'bg-blue-500/15 text-blue-700 dark:text-blue-300'
  }
}

const today = new Date()
const currentYear = today.getFullYear()
const currentMonth = today.getMonth()

const toDateKey = date => date.toISOString().split('T')[0]

const createDate = (dayOffset, monthOffset = 0) => {
  const date = new Date(currentYear, currentMonth + monthOffset, today.getDate() + dayOffset)
  return toDateKey(date)
}

const mockEvents = [
  {
    id: 'ev-1',
    title: 'Salario',
    type: 'income',
    amount: 7200,
    date: createDate(-3)
  },
  {
    id: 'ev-2',
    title: 'Aluguel',
    type: 'bill',
    amount: 1850,
    date: createDate(2)
  },
  {
    id: 'ev-3',
    title: 'Meta: Viagem',
    type: 'goal',
    amount: 400,
    date: createDate(4)
  },
  {
    id: 'ev-4',
    title: 'Cartao Nubank',
    type: 'bill',
    amount: 980,
    date: createDate(6)
  },
  {
    id: 'ev-5',
    title: 'Freela UX',
    type: 'income',
    amount: 1300,
    date: createDate(8)
  },
  {
    id: 'ev-6',
    title: 'Seguro do carro',
    type: 'expense',
    amount: 320,
    date: createDate(11)
  },
  {
    id: 'ev-7',
    title: 'Internet',
    type: 'bill',
    amount: 129,
    date: createDate(14)
  },
  {
    id: 'ev-8',
    title: 'Meta: Reserva',
    type: 'goal',
    amount: 500,
    date: createDate(17)
  },
  {
    id: 'ev-9',
    title: 'Condominio',
    type: 'bill',
    amount: 430,
    date: createDate(22)
  },
  {
    id: 'ev-10',
    title: 'Assinaturas',
    type: 'expense',
    amount: 144,
    date: createDate(28)
  },
  {
    id: 'ev-11',
    title: 'Bonus trimestral',
    type: 'income',
    amount: 2000,
    date: createDate(34, 1)
  },
  {
    id: 'ev-12',
    title: 'IPTU',
    type: 'bill',
    amount: 560,
    date: createDate(40, 1)
  }
]

export const formatCurrency = value =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value || 0)

export const formatLongDate = dateString =>
  new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

export const getMonthLabel = (year, month) =>
  new Date(year, month, 1).toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric'
  })

export const getFinancialEvents = () => mockEvents

export const getEventTypeMeta = type => eventTypeMap[type] || eventTypeMap.expense

export const getWeekDays = () => weekDays

export const isSameDay = (leftDate, rightDate) =>
  leftDate.getFullYear() === rightDate.getFullYear() &&
  leftDate.getMonth() === rightDate.getMonth() &&
  leftDate.getDate() === rightDate.getDate()

export const buildMonthGrid = (year, month) => {
  const firstDayOfMonth = new Date(year, month, 1)
  const firstWeekday = (firstDayOfMonth.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()
  const totalCells = 42
  const cells = []

  for (let i = 0; i < totalCells; i += 1) {
    const dayNumber = i - firstWeekday + 1
    const inCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth

    let date
    if (inCurrentMonth) {
      date = new Date(year, month, dayNumber)
    } else if (dayNumber <= 0) {
      date = new Date(year, month - 1, daysInPrevMonth + dayNumber)
    } else {
      date = new Date(year, month + 1, dayNumber - daysInMonth)
    }

    cells.push({
      key: toDateKey(date),
      date,
      day: date.getDate(),
      inCurrentMonth
    })
  }

  return cells
}
