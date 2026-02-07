import { apiClient } from './client';
import type { CreateDirectionPayload, Direction, UpdateDirectionPayload } from './types';

export const listDirections = async () => apiClient.get<Direction[]>('/directions');

export const getDirection = async (id: string) => apiClient.get<Direction>(`/directions/${id}`);

export const createDirection = async (payload: CreateDirectionPayload) =>
  apiClient.post<Direction>('/directions', payload);

export const updateDirection = async (id: string, payload: UpdateDirectionPayload) =>
  apiClient.patch<Direction>(`/directions/${id}`, payload);
