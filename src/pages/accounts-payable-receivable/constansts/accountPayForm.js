export const getInitialAccountPayForm = (openAmount = 0) => ({
  amount: openAmount > 0 ? String(openAmount) : '',
  method: '',
  date: new Date().toISOString().split('T')[0]
})
