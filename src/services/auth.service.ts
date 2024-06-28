import { http } from './http.sevrice';

export async function login(email: string, password: string) {
  return await http.post('/v1/auth/login', {
    email: email,
    password: password,
  });
}

export function logout() {
  localStorage.removeItem('token');
}

export async function getProfile() {
  const token = JSON.parse(localStorage.getItem('token')!);
  return await http.get('/v1/auth/profile', {
    headers: { Authorization: 'Bearer ' + token.access_token },
  });
}
export function isTokenExpired(token: any): boolean {
  const currentTime = Math.floor(Date.now() / 1000);
  return token.expired_id < currentTime;
}
