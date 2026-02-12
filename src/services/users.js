import { api } from './api'

export class UsersService {
  async signUp(name, email, password) {
    const response = await api.post('/users/sign-up', { name, email, password })
    return response.data
  }

  async sendCodeRecoveryPassword(email) {
    const response = await api.post('/users/password/forgot', { email })
    return response.data
  }
}

export const usersService = new UsersService()
