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
}

export const transactionsService = new TransactionsService()
