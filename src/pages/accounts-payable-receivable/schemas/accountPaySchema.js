import z from 'zod'
import { paymentMethodOptions } from '@/lib/payment-methods'

const paymentMethodValues = paymentMethodOptions.map(option => option.value)

export const getAccountPaySchema = openAmount =>
  z.object({
    amount: z
      .string()
      .trim()
      .min(1, 'Informe o valor do pagamento')
      .refine(value => Number(value) > 0, 'Informe um valor maior que zero')
      .refine(
        value => Number(value) <= openAmount,
        'O valor informado ultrapassa o total em aberto'
      ),
    method: z
      .string()
      .trim()
      .min(1, 'Selecione o metodo de pagamento')
      .refine(
        value => paymentMethodValues.includes(value),
        'Selecione um metodo valido'
      ),
    date: z.string().trim().min(1, 'Informe a data do pagamento')
  })
