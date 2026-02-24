import { monthlyData } from '@/pages/reports/utils/reportsUtils'
import { initialBudgetCategories } from '@/pages/monthly-budget/utils/monthlyBudgetUtils'

const mockCategoryTransactions = {
  Alimentacao: [
    { id: 1, description: 'Supermercado Bom Preco', date: '2026-02-18', amount: 340 },
    { id: 2, description: 'Restaurante Sabor da Casa', date: '2026-02-12', amount: 96 },
    { id: 3, description: 'Padaria Central', date: '2026-02-09', amount: 44 },
    { id: 4, description: 'Feira livre', date: '2026-02-02', amount: 118 }
  ],
  Transporte: [
    { id: 5, description: 'Combustivel', date: '2026-02-15', amount: 240 },
    { id: 6, description: 'Uber', date: '2026-02-11', amount: 68 },
    { id: 7, description: 'Estacionamento', date: '2026-02-07', amount: 52 }
  ],
  Moradia: [
    { id: 8, description: 'Aluguel', date: '2026-02-05', amount: 1500 },
    { id: 9, description: 'Condominio', date: '2026-02-06', amount: 330 }
  ],
  Lazer: [
    { id: 10, description: 'Cinema', date: '2026-02-14', amount: 68 },
    { id: 11, description: 'Streaming', date: '2026-02-04', amount: 55 },
    { id: 12, description: 'Show', date: '2026-02-20', amount: 220 }
  ],
  Saude: [
    { id: 13, description: 'Farmacia', date: '2026-02-17', amount: 74 },
    { id: 14, description: 'Consulta', date: '2026-02-10', amount: 180 }
  ],
  Educacao: [
    { id: 15, description: 'Curso online', date: '2026-02-08', amount: 180 },
    { id: 16, description: 'Livros', date: '2026-02-19', amount: 120 }
  ]
}

export const formatCurrency = value =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value || 0)

export const formatDate = value =>
  new Date(value).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

export const formatPercent = value => `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`

export const normalizeCategoryKey = categoryName =>
  decodeURIComponent(categoryName || '')

export const getBudgetCategoryByName = categoryName =>
  initialBudgetCategories.find(item => item.name === categoryName) || null

export const getCategoryTrend = categoryName => {
  return monthlyData.map(month => ({
    month: month.month,
    label: month.label,
    amount: month.categories[categoryName] || 0
  }))
}

export const getCategorySummary = (trend, limit = 0) => {
  const totalSpent = trend.reduce((acc, item) => acc + item.amount, 0)
  const averageSpent = trend.length ? totalSpent / trend.length : 0
  const highestMonth = trend.reduce(
    (max, item) => (item.amount > max.amount ? item : max),
    trend[0] || { label: '-', amount: 0 }
  )

  const last = trend[trend.length - 1]?.amount || 0
  const previous = trend[trend.length - 2]?.amount || 0
  const trendDelta = previous ? ((last - previous) / previous) * 100 : 0

  return {
    totalSpent,
    averageSpent,
    highestMonth,
    trendDelta,
    currentLimit: limit,
    currentUsage: limit ? (last / limit) * 100 : 0
  }
}

export const getCategoryInsights = (categoryName, summary) => {
  const usageText =
    summary.currentUsage > 100
      ? `A categoria ultrapassou o limite em ${formatCurrency((summary.currentUsage / 100 - 1) * summary.currentLimit)}.`
      : `Uso atual em ${summary.currentUsage.toFixed(1)}% do limite definido.`

  return [
    {
      id: 'trend',
      title: 'Variacao mensal',
      description: `O ultimo mes variou ${Math.abs(summary.trendDelta).toFixed(1)}% ${summary.trendDelta >= 0 ? 'acima' : 'abaixo'} do mes anterior em ${categoryName}.`
    },
    {
      id: 'usage',
      title: 'Status do limite',
      description: usageText
    },
    {
      id: 'average',
      title: 'Comportamento medio',
      description: `A media mensal da categoria esta em ${formatCurrency(summary.averageSpent)}.`
    }
  ]
}

export const getCategoryTransactions = categoryName =>
  mockCategoryTransactions[categoryName] || []
