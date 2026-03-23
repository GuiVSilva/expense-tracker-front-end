import { api } from './api'

export class TransactionsService {
  async createTransaction({
    description,
    category,
    amount,
    type,
    date,
    method
  }) {
    const response = await api.post('/transactions/', {
      description,
      category,
      amount,
      type,
      date,
      method
    })
    return response.data
  }

  async getTransactions({
    page,
    limit,
    search,
    type,
    category,
    sortBy,
    dateFrom,
    dateTo
  }) {
    const response = await api.get('/transactions/', {
      params: {
        page,
        limit,
        search,
        type,
        category,
        sortBy,
        dateFrom,
        dateTo
      }
    })
    return response.data
  }

  async deleteTransaction({ id }) {
    const response = await api.put('/transactions/delete', {
      id
    })
    return response.data
  }
}

export const transactionsService = new TransactionsService()
