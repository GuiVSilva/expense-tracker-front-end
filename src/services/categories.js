import { api } from './api'

export class CategoriesService {
  async getCategories() {
    const response = await api.get('/categories/')
    return response.data
  }
}

export const categoriesService = new CategoriesService()
