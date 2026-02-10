import { api } from './api'

export class AuthService {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  }
}

export const authService = new AuthService()
