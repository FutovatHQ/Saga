import { login } from "../api/AuthApi";

export async function loginUser(email: string, password: string) {
  const response = await login(email, password);

  localStorage.setItem("token", response.token);

  return response;
}
