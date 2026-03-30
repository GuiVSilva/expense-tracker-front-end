export const calculateOpenAmount = account => {
  if (account.status === 'paid') return 0
  return Math.max(Number(account.amount) - Number(account.paidAmount || 0), 0)
}
