import { apiClient } from './client';
import type { Plan, ProfileResponse, UserProfile } from './types';

export const getProfile = async () => apiClient.get<ProfileResponse>('/profile');

export const updateProfile = async (profile: Partial<UserProfile>) =>
  apiClient.patch<ProfileResponse>('/profile', profile);

export const updatePlan = async (plan: Plan) =>
  apiClient.patch<ProfileResponse>('/profile/plan', { plan });
