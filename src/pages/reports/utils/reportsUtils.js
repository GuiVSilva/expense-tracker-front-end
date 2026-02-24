export const periodOptions = [
  { value: 'month', label: 'Mes' },
  { value: 'quarter', label: 'Trimestre' },
  { value: 'semester', label: 'Semestre' },
  { value: 'year', label: 'Ano' }
]

export const exportTypeOptions = [
  { value: 'summary', label: 'Resumo consolidado' },
  { value: 'income-expense', label: 'Receitas vs despesas' },
  { value: 'categories', label: 'Distribuicao por categoria' },
  { value: 'evolution', label: 'Evolucao mensal' },
  { value: 'insights', label: 'Insights automaticos' }
]

export const periodSizeMap = {
  month: 1,
  quarter: 3,
  semester: 6,
  year: 12
}

export const monthlyData = [
  {
    month: '2025-03',
    label: 'Mar/25',
    income: 7800,
    expense: 4520,
    categories: { Alimentacao: 980, Moradia: 1600, Transporte: 620, Lazer: 540, Saude: 420, Outros: 360 }
  },
  {
    month: '2025-04',
    label: 'Abr/25',
    income: 7950,
    expense: 4680,
    categories: { Alimentacao: 1030, Moradia: 1600, Transporte: 640, Lazer: 560, Saude: 470, Outros: 380 }
  },
  {
    month: '2025-05',
    label: 'Mai/25',
    income: 8100,
    expense: 4810,
    categories: { Alimentacao: 1090, Moradia: 1620, Transporte: 650, Lazer: 590, Saude: 460, Outros: 400 }
  },
  {
    month: '2025-06',
    label: 'Jun/25',
    income: 8250,
    expense: 4950,
    categories: { Alimentacao: 1120, Moradia: 1650, Transporte: 670, Lazer: 620, Saude: 480, Outros: 410 }
  },
  {
    month: '2025-07',
    label: 'Jul/25',
    income: 8500,
    expense: 5220,
    categories: { Alimentacao: 1180, Moradia: 1680, Transporte: 720, Lazer: 680, Saude: 500, Outros: 460 }
  },
  {
    month: '2025-08',
    label: 'Ago/25',
    income: 8450,
    expense: 5340,
    categories: { Alimentacao: 1210, Moradia: 1700, Transporte: 740, Lazer: 700, Saude: 510, Outros: 480 }
  },
  {
    month: '2025-09',
    label: 'Set/25',
    income: 8620,
    expense: 5480,
    categories: { Alimentacao: 1250, Moradia: 1710, Transporte: 760, Lazer: 730, Saude: 520, Outros: 510 }
  },
  {
    month: '2025-10',
    label: 'Out/25',
    income: 8790,
    expense: 5630,
    categories: { Alimentacao: 1320, Moradia: 1740, Transporte: 780, Lazer: 760, Saude: 530, Outros: 500 }
  },
  {
    month: '2025-11',
    label: 'Nov/25',
    income: 8980,
    expense: 5790,
    categories: { Alimentacao: 1390, Moradia: 1760, Transporte: 800, Lazer: 780, Saude: 540, Outros: 520 }
  },
  {
    month: '2025-12',
    label: 'Dez/25',
    income: 9210,
    expense: 6130,
    categories: { Alimentacao: 1520, Moradia: 1800, Transporte: 840, Lazer: 900, Saude: 560, Outros: 510 }
  },
  {
    month: '2026-01',
    label: 'Jan/26',
    income: 9360,
    expense: 5950,
    categories: { Alimentacao: 1360, Moradia: 1820, Transporte: 790, Lazer: 860, Saude: 590, Outros: 530 }
  },
  {
    month: '2026-02',
    label: 'Fev/26',
    income: 9550,
    expense: 6080,
    categories: { Alimentacao: 1630, Moradia: 1830, Transporte: 820, Lazer: 710, Saude: 600, Outros: 490 }
  }
]

export const donutColors = ['#22c55e', '#f59e0b', '#38bdf8', '#f97316', '#ef4444', '#a78bfa']

export const formatCurrency = value =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value || 0)

export const formatPercent = value => `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`

export const percentageDelta = (current, previous) => {
  if (!previous) return 0
  return ((current - previous) / previous) * 100
}

export const getDaysFromMonthKey = monthKey => {
  const [year, month] = monthKey.split('-').map(Number)
  return new Date(year, month, 0).getDate()
}

const escapeCsv = value => {
  const stringValue = String(value ?? '')
  if (/[",;\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }
  return stringValue
}

const toCsv = (headers, rows) => {
  const headerLine = headers.map(escapeCsv).join(';')
  const lines = rows.map(row => headers.map(header => escapeCsv(row[header])).join(';'))
  return [headerLine, ...lines].join('\n')
}

const getTodayStamp = () => {
  const date = new Date()
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}

export const buildReportExportFile = ({
  type,
  periodLabel,
  summary,
  barChartData,
  categoryDistribution,
  monthlyEvolution,
  insights
}) => {
  const todayStamp = getTodayStamp()

  if (type === 'summary') {
    const headers = ['periodo', 'total_receitas', 'total_despesas', 'saldo', 'media_diaria_gastos']
    const rows = [
      {
        periodo: periodLabel,
        total_receitas: summary.totalIncome,
        total_despesas: summary.totalExpense,
        saldo: summary.balance,
        media_diaria_gastos: summary.dailyAverageExpense.toFixed(2)
      }
    ]

    return {
      filename: `relatorio-resumo-${todayStamp}.csv`,
      csv: toCsv(headers, rows)
    }
  }

  if (type === 'income-expense') {
    const headers = ['mes', 'receita', 'despesa', 'saldo']
    const rows = barChartData.map(item => ({
      mes: item.label,
      receita: item.income,
      despesa: item.expense,
      saldo: item.income - item.expense
    }))

    return {
      filename: `relatorio-receitas-despesas-${todayStamp}.csv`,
      csv: toCsv(headers, rows)
    }
  }

  if (type === 'categories') {
    const headers = ['categoria', 'valor', 'percentual']
    const rows = categoryDistribution.map(item => ({
      categoria: item.name,
      valor: item.amount,
      percentual: `${item.percent.toFixed(2)}%`
    }))

    return {
      filename: `relatorio-categorias-${todayStamp}.csv`,
      csv: toCsv(headers, rows)
    }
  }

  if (type === 'insights') {
    const headers = ['titulo', 'descricao']
    const rows = insights.map(item => ({
      titulo: item.title,
      descricao: item.description
    }))

    return {
      filename: `relatorio-insights-${todayStamp}.csv`,
      csv: toCsv(headers, rows)
    }
  }

  const headers = [
    'mes',
    'receita',
    'despesa',
    'saldo',
    'variacao_receita',
    'variacao_despesa',
    'variacao_saldo'
  ]
  const rows = monthlyEvolution.map(item => ({
    mes: item.label,
    receita: item.income,
    despesa: item.expense,
    saldo: item.balance,
    variacao_receita: `${item.incomeDelta.toFixed(2)}%`,
    variacao_despesa: `${item.expenseDelta.toFixed(2)}%`,
    variacao_saldo: `${item.balanceDelta.toFixed(2)}%`
  }))

  return {
    filename: `relatorio-evolucao-${todayStamp}.csv`,
    csv: toCsv(headers, rows)
  }
}
