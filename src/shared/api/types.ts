import type { lifeAreas } from '../constants/lifeAreas';

export type LifeAreaId = (typeof lifeAreas)[number]['id'];

export type Plan = 'Free' | 'Pro';

export type UserProfile = {
  email: string;
  age?: number;
  status?: string;
  initials: string;
};

export type CheckpointArea = {
  score: number;
  note: string;
};

export type Checkpoint = {
  id: string;
  createdAt: string;
  areas: Record<LifeAreaId, CheckpointArea>;
};

export type DirectionCriterion = {
  expected: number;
  actual?: number;
};

export type Direction = {
  id: string;
  title: string;
  description: string;
  expectedOutcome: string;
  period: string;
  createdAt: string;
  reviewAt: string;
  status: 'В процессе' | 'Ожидает проверки' | 'Завершено';
  criteria: Record<string, DirectionCriterion>;
};

export type AuthPayload = {
  email: string;
  password: string;
  age?: number;
  status?: string;
};

export type AuthResponse = {
  token: string;
  profile: UserProfile;
  plan: Plan;
};

export type ProfileResponse = {
  profile: UserProfile;
  plan: Plan;
};

export type CreateCheckpointPayload = {
  areas: Record<LifeAreaId, CheckpointArea>;
};

export type CreateDirectionPayload = Omit<Direction, 'id' | 'createdAt' | 'reviewAt' | 'status'>;

export type UpdateDirectionPayload = Partial<Direction>;

export type HistoryResponse = {
  checkpoints: Checkpoint[];
  directions: Direction[];
};

export type Recommendation = {
  id: string;
  title: string;
  summary: string;
  createdAt: string;
};
