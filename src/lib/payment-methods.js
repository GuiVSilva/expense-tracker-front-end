export const paymentMethodOptions = [
  { value: 'pix', label: 'PIX' },
  { value: 'credit_card', label: 'Cartão de Crédito' },
  { value: 'debit_card', label: 'Cartão de Débito' },
  { value: 'transfer', label: 'Transferência' },
  { value: 'ticket', label: 'Boleto' },
  { value: 'money', label: 'Dinheiro' }
]

export const formatPaymentMethod = value => {
  const normalizedValue = String(value || '').toLowerCase()
  const method = paymentMethodOptions.find(item => item.value === normalizedValue)
  return method?.label || value
}
