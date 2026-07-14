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
  }
}

const toDateKey = date => date.toISOString().split('T')[0]

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

export const transformBackendDataToEvent = item => {
  const typeMap = {
    PAYABLE: item.status === 'PAID' ? 'expense' : 'bill',
    RECEIVABLE: 'income'
  }

  return {
    id: item.id,
    title: item.description,
    type: typeMap[item.type] || 'expense',
    amount: parseFloat(item.amount),
    date: toDateKey(new Date(item.dueDate))
  }
}

export const getEventTypeMeta = type =>
  eventTypeMap[type] || eventTypeMap.expense

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
