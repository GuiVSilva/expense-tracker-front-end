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

  async getAccounts({ page, limit, search, type, status, category }) {
    const response = await api.get('/financial-accounts/', {
      params: {
        page,
        limit,
        search,
        type,
        status,
        category
      }
    })
    return response.data
  }

  async registerPayment({ id, amount, method, date }) {
    const response = await api.post('/financial-accounts/pay', {
      id,
      amount,
      method,
      date
    })

    return response.data
  }

  async updateAccount({ id, description, category, amount, dueDate }) {
    const response = await api.put('/financial-accounts/', {
      id,
      description,
      category,
      amount,
      dueDate
    })

    return response.data
  }
}

export const financialAccountsService = new FinancialAccountsService()
