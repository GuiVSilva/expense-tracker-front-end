import { z } from 'zod'

export const transactionSchema = z.object({
  description: z
    .string()
    .trim()
    .min(3, 'Descrição deve ter pelo menos 3 caracteres'),
  amount: z.coerce
    .number({
      invalid_type_error: 'Informe um valor válido'
    })
    .positive('Valor deve ser maior que zero'),
  type: z.enum(['expense', 'income']),
  category: z.string().min(1, 'Selecione uma categoria'),
  method: z.string().min(1, 'Selecione um método'),
  date: z
    .string()
    .min(1, 'Selecione uma data')
    .refine(value => !Number.isNaN(new Date(value).getTime()), 'Data inválida')
})
