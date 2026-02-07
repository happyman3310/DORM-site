import { apiClient } from './client';
import type { Recommendation } from './types';

export const getRecommendations = async () =>
  apiClient.get<Recommendation[]>('/recommendations');
