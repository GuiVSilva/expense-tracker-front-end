import { api } from "./api";

export class AuthService {
  async login(email, password) {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  }

  async signUp(name, email, password) {
    const response = await api.post("/auth/sign-up", { name, email, password });
    return response.data;
  }
}

export const authService = new AuthService();
