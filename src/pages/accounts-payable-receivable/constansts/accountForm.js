export const initialValuesForm = {
  description: '',
  type: 'payable',
  category: '',
  amount: '',
  dueDate: new Date().toISOString().split('T')[0],
  status: 'pending',
  installments: 1,
  splitInstallments: true
}
