export const initialBudgetCategories = [
  { id: 1, name: 'Alimentacao', spent: 960, limit: 1400, icon: 'FOOD' },
  { id: 2, name: 'Transporte', spent: 740, limit: 800, icon: 'CAR' },
  { id: 3, name: 'Moradia', spent: 1550, limit: 1600, icon: 'HOME' },
  { id: 4, name: 'Lazer', spent: 620, limit: 700, icon: 'FUN' },
  { id: 5, name: 'Saude', spent: 220, limit: 500, icon: 'HEALTH' },
  { id: 6, name: 'Educacao', spent: 480, limit: 450, icon: 'STUDY' }
]

export const formatCurrency = value =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value || 0)

export const getUsagePercent = category => {
  if (!category.limit) return 0
  return Math.max((category.spent / category.limit) * 100, 0)
}

export const getUsageStatus = category => {
  const percent = getUsagePercent(category)

  if (percent < 70) {
    return {
      label: 'Controlado',
      badgeClass: 'bg-emerald-500 text-black',
      barClass: 'bg-emerald-500',
      valueClass: 'text-emerald-500'
    }
  }

  if (percent <= 90) {
    return {
      label: 'Atencao',
      badgeClass: 'bg-amber-500 text-black',
      barClass: 'bg-amber-500',
      valueClass: 'text-amber-500'
    }
  }

  return {
    label: 'Critico',
    badgeClass: 'bg-destructive text-destructive-foreground',
    barClass: 'bg-destructive',
    valueClass: 'text-destructive'
  }
}

export const getAlertText = category => {
  const percent = getUsagePercent(category)

  if (percent > 100) {
    return `Limite ultrapassado em ${formatCurrency(category.spent - category.limit)}.`
  }

  if (percent > 90) {
    return 'Voce esta muito proximo de ultrapassar o limite.'
  }

  if (percent >= 70) {
    return 'A categoria entrou em faixa de atencao.'
  }

  return 'Gasto dentro de uma faixa saudavel.'
}
