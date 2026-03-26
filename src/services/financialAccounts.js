import { api } from './api'

export class FinancialAccountsService {
  async createAccount({
    description,
    type,
    category,
    amount,
    dueDate,
    status,
    installments,
    splitInstallments
  }) {
    const response = await api.post('/financial-accounts/', {
      description,
      type,
      category,
      amount,
      dueDate,
      status,
      installments,
      splitInstallments
    })

    return response.data
  }
}

export const financialAccountsService = new FinancialAccountsService()
