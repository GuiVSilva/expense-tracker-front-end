export const accountTypeOptions = [
  { value: 'all', label: 'Todos os tipos' },
  { value: 'receivable', label: 'A receber' },
  { value: 'payable', label: 'A pagar' }
]

export const statusOptions = [
  { value: 'all', label: 'Todos os status' },
  { value: 'pending', label: 'Pendente' },
  { value: 'paid', label: 'Pago' },
  { value: 'overdue', label: 'Atrasado' },
  { value: 'partial', label: 'Parcial' }
]

export const getTypeMeta = type =>
  type === 'RECEIVABLE'
    ? { label: 'A receber', className: 'bg-primary/10 text-primary' }
    : { label: 'A pagar', className: 'bg-destructive/10 text-destructive' }

export const statusMetaMap = {
  pending: {
    label: 'Pendente',
    className: 'bg-amber-500/15 text-amber-700 dark:text-amber-300'
  },
  paid: {
    label: 'Pago',
    className: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
  },
  overdue: {
    label: 'Atrasado',
    className: 'bg-destructive/15 text-destructive'
  },
  partial: {
    label: 'Parcial',
    className: 'bg-blue-500/15 text-blue-700 dark:text-blue-300'
  }
}

export const getStatusMeta = status => {
  const normalizedStatus = String(status || '').toLowerCase()
  return statusMetaMap[normalizedStatus] || statusMetaMap.pending
}
