import { apiClient, setToken } from './client';
import type { AuthPayload, AuthResponse } from './types';

export const login = async (payload: AuthPayload) => {
  const response = await apiClient.post<AuthResponse>('/auth/login', payload, { withAuth: false });
  setToken(response.token);
  return response;
};

export const logout = async () => {
  await apiClient.post('/auth/logout', null);
  setToken(null);
};
