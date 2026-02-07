import { apiClient } from './apiClient';
import type { Checkpoint, Direction, UserProfile } from '../data/appData';

export type LoginPayload = {
  email: string;
  password: string;
  age?: number;
  status?: string;
};

export type LoginResponse = {
  token: string;
  user: UserProfile;
  plan?: 'Free' | 'Pro';
};

export const loginUser = async (payload: LoginPayload) => {
  const { data } = await apiClient.post<LoginResponse>('/auth/login', payload);
  return data;
};

export const fetchProfile = async () => {
  const { data } = await apiClient.get<UserProfile | null>('/auth/me');
  return data;
};

export const fetchCheckpoints = async () => {
  const { data } = await apiClient.get<Checkpoint[]>('/checkpoints');
  return data;
};

export const createCheckpoint = async (payload: { areas: Record<string, { score: number; note: string }> }) => {
  const { data } = await apiClient.post<Checkpoint>('/checkpoints', payload);
  return data;
};

export const fetchDirections = async () => {
  const { data } = await apiClient.get<Direction[]>('/directions');
  return data;
};

export const createDirection = async (
  payload: Omit<Direction, 'id' | 'createdAt' | 'reviewAt' | 'status'>,
) => {
  const { data } = await apiClient.post<Direction>('/directions', payload);
  return data;
};

export const updateDirection = async (id: string, updates: Partial<Direction>) => {
  const { data } = await apiClient.patch<Direction>(`/directions/${id}`, updates);
  return data;
};
