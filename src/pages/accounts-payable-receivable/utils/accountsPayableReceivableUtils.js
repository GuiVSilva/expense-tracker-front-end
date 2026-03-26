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
