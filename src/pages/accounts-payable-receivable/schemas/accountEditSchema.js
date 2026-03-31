import z from 'zod'

export const accountEditSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, 'Informe a descricao')
    .max(120, 'A descricao deve ter no maximo 120 caracteres'),
  category: z.string().trim().min(1, 'Selecione a categoria'),
  amount: z
    .string()
    .trim()
    .min(1, 'Informe o valor')
    .refine(value => Number(value) > 0, 'Informe um valor maior que zero'),
  dueDate: z.string().trim().min(1, 'Informe o vencimento'),
  status: z.enum(['pending', 'paid', 'overdue', 'partial'], {
    message: 'Selecione o status'
  })
})
