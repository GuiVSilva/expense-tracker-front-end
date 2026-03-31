export const getInitialAccountEditForm = account => ({
  description: account?.description || '',
  category: String(account?.category?.id || ''),
  amount: account?.amount ? String(account.amount) : '',
  dueDate: account?.dueDate ? String(account.dueDate).split('T')[0] : '',
  status: String(account?.status || 'pending').toLowerCase()
})
