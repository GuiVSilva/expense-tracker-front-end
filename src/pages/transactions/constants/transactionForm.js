export const getInitialTransactionForm = () => ({
  description: '',
  amount: '',
  type: 'expense',
  category: '',
  method: '',
  date: new Date().toISOString().split('T')[0]
})
