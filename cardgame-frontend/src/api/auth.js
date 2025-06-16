import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // ajuste conforme necessário
});

export async function login(email, senha) {
  const response = await API.post('/auth/login', { email, senha });
  return response.data;
}
