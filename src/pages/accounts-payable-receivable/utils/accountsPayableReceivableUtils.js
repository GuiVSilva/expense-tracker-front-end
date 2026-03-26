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

export const paymentMethodOptions = [
  { value: 'pix', label: 'PIX' },
  { value: 'cash', label: 'Dinheiro' },
  { value: 'debit_card', label: 'Cartao de debito' },
  { value: 'credit_card', label: 'Cartao de credito' },
  { value: 'transfer', label: 'Transferencia' },
  { value: 'boleto', label: 'Boleto' }
]

export const initialAccounts = [
  {
    id: 1,
    description: 'Aluguel apartamento',
    type: 'payable',
    category: 'Moradia',
    amount: 1850,
    paidAmount: 0,
    dueDate: '2026-02-10',
    status: 'paid',
    installmentIndex: 1,
    installmentTotal: 1,
    payments: [
      { id: 'p-1', amount: 1850, method: 'transfer', date: '2026-02-10' }
    ]
  },
  {
    id: 2,
    description: 'Freela dashboard',
    type: 'receivable',
    category: 'Renda extra',
    amount: 2200,
    paidAmount: 0,
    dueDate: '2026-02-28',
    status: 'pending',
    installmentIndex: 1,
    installmentTotal: 1,
    payments: []
  },
  {
    id: 3,
    description: 'Fatura cartao',
    type: 'payable',
    category: 'Cartao',
    amount: 980,
    paidAmount: 0,
    dueDate: '2026-02-20',
    status: 'overdue',
    installmentIndex: 1,
    installmentTotal: 1,
    payments: []
  },
  {
    id: 4,
    description: 'Consultoria UX',
    type: 'receivable',
    category: 'Servicos',
    amount: 1600,
    paidAmount: 700,
    dueDate: '2026-02-22',
    status: 'partial',
    installmentIndex: 1,
    installmentTotal: 1,
    payments: [{ id: 'p-2', amount: 700, method: 'pix', date: '2026-02-19' }]
  },
  {
    id: 5,
    description: 'Internet fibra',
    type: 'payable',
    category: 'Utilidades',
    amount: 129,
    paidAmount: 0,
    dueDate: '2026-03-05',
    status: 'pending',
    installmentIndex: 1,
    installmentTotal: 1,
    payments: []
  },
  {
    id: 6,
    description: 'Venda notebook antigo',
    type: 'receivable',
    category: 'Venda',
    amount: 2500,
    paidAmount: 2500,
    dueDate: '2026-02-15',
    status: 'paid',
    installmentIndex: 1,
    installmentTotal: 1,
    payments: [{ id: 'p-3', amount: 2500, method: 'cash', date: '2026-02-15' }]
  }
]

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

export const formatMethod = value => {
  const found = paymentMethodOptions.find(item => item.value === value)
  return found?.label || value
}

export const getTypeMeta = type =>
  type === 'receivable'
    ? { label: 'A receber', className: 'bg-primary/10 text-primary' }
    : { label: 'A pagar', className: 'bg-destructive/10 text-destructive' }

export const getStatusMeta = status => {
  const map = {
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

  return map[status] || map.pending
}

export const calculateOpenAmount = account => {
  if (account.status === 'paid') return 0
  return Math.max(Number(account.amount) - Number(account.paidAmount || 0), 0)
}

export const sumPayments = account =>
  (account.payments || []).reduce(
    (total, payment) => total + Number(payment.amount || 0),
    0
  )

export const resolveStatusByPayment = (dueDate, paidAmount, totalAmount) => {
  if (paidAmount >= totalAmount) return 'paid'
  if (paidAmount > 0) return 'partial'

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(dueDate)
  due.setHours(0, 0, 0, 0)
  return due < today ? 'overdue' : 'pending'
}
