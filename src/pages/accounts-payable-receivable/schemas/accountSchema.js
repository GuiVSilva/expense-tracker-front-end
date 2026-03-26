import z from 'zod'

export const validationSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, 'Informe a descricao')
    .max(120, 'A descricao deve ter no maximo 120 caracteres'),
  type: z.enum(['payable', 'receivable'], {
    message: 'Selecione o tipo'
  }),
  category: z.string().trim().min(1, 'Selecione a categoria'),
  amount: z
    .string()
    .trim()
    .min(1, 'Informe o valor')
    .refine(value => Number(value) > 0, 'Informe um valor maior que zero'),
  dueDate: z.string().trim().min(1, 'Informe o vencimento'),
  status: z.enum(['pending', 'paid', 'overdue', 'partial'], {
    message: 'Selecione o status'
  }),
  installments: z.number().optional(),
  splitInstallments: z.boolean().default(true)
})
