import { apiClient } from './client';
import type { Checkpoint, CreateCheckpointPayload } from './types';

export const listCheckpoints = async () => apiClient.get<Checkpoint[]>('/checkpoints');

export const createCheckpoint = async (payload: CreateCheckpointPayload) =>
  apiClient.post<Checkpoint>('/checkpoints', payload);
