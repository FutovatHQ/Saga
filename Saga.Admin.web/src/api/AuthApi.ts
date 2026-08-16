import api from "./Api";

export async function login(email: string, password: string) {
  const response = await api.post("/Auth/login", {
    email,

    password,
  });

  return response.data;
}
