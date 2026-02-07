import { apiClient } from './client';
import type { HistoryResponse } from './types';

export const getHistory = async () => apiClient.get<HistoryResponse>('/history');
