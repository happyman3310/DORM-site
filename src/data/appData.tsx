import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { lifeAreas } from './lifeAreas';

export type LifeAreaId = (typeof lifeAreas)[number]['id'];

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

export type AppState = {
  user: UserProfile | null;
  checkpoints: Checkpoint[];
  directions: Direction[];
  plan: 'Free' | 'Pro';
};

const STORAGE_KEY = 'wayn-app-state';

const defaultState: AppState = {
  user: null,
  checkpoints: [],
  directions: [],
  plan: 'Free',
};

const safeParseState = (raw: string | null): AppState => {
  if (!raw) return defaultState;
  try {
    const parsed = JSON.parse(raw) as AppState;
    return {
      user: parsed.user ?? null,
      checkpoints: parsed.checkpoints ?? [],
      directions: parsed.directions ?? [],
      plan: parsed.plan ?? 'Free',
    };
  } catch {
    return defaultState;
  }
};

const addPeriod = (date: Date, period: string) => {
  const result = new Date(date);
  if (period.includes('нед')) {
    const weeks = Number.parseInt(period, 10) || 2;
    result.setDate(result.getDate() + weeks * 7);
  } else if (period.includes('месяц')) {
    const months = Number.parseInt(period, 10) || 1;
    result.setMonth(result.getMonth() + months);
  } else {
    result.setDate(result.getDate() + 14);
  }
  return result;
};

type AppDataContextValue = {
  state: AppState;
  login: (profile: UserProfile) => void;
  logout: () => void;
  addCheckpoint: (areas: Record<LifeAreaId, CheckpointArea>) => void;
  addDirection: (direction: Omit<Direction, 'id' | 'createdAt' | 'reviewAt' | 'status'>) => void;
  updateDirection: (id: string, updates: Partial<Direction>) => void;
  setPlan: (plan: AppState['plan']) => void;
};

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

export const AppDataProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(() => safeParseState(localStorage.getItem(STORAGE_KEY)));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const login = (profile: UserProfile) => {
    setState((prev) => ({ ...prev, user: profile }));
  };

  const logout = () => {
    setState((prev) => ({ ...prev, user: null }));
  };

  const addCheckpoint = (areas: Record<LifeAreaId, CheckpointArea>) => {
    const checkpoint: Checkpoint = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      areas,
    };
    setState((prev) => ({
      ...prev,
      checkpoints: [checkpoint, ...prev.checkpoints],
    }));
  };

  const addDirection: AppDataContextValue['addDirection'] = (direction) => {
    const createdAt = new Date();
    const reviewAt = addPeriod(createdAt, direction.period).toISOString();
    const newDirection: Direction = {
      ...direction,
      id: crypto.randomUUID(),
      createdAt: createdAt.toISOString(),
      reviewAt,
      status: 'В процессе',
    };
    setState((prev) => ({
      ...prev,
      directions: [newDirection, ...prev.directions],
    }));
  };

  const updateDirection = (id: string, updates: Partial<Direction>) => {
    setState((prev) => ({
      ...prev,
      directions: prev.directions.map((direction) =>
        direction.id === id ? { ...direction, ...updates } : direction,
      ),
    }));
  };

  const setPlan = (plan: AppState['plan']) => {
    setState((prev) => ({ ...prev, plan }));
  };

  const value = useMemo(
    () => ({
      state,
      login,
      logout,
      addCheckpoint,
      addDirection,
      updateDirection,
      setPlan,
    }),
    [state],
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within AppDataProvider');
  }
  return context;
};

export const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'short',
  });

export const calculateAreaSummary = (checkpoint: Checkpoint | null) => {
  if (!checkpoint) return null;
  const entries = Object.entries(checkpoint.areas).map(([id, area]) => ({
    id,
    score: area.score,
  }));
  const sorted = [...entries].sort((a, b) => b.score - a.score);
  const strong = sorted.slice(0, 2).map((item) => item.id);
  const weak = sorted.slice(-2).map((item) => item.id);
  return { strong, weak };
};

export const formatAreaLabels = (ids: string[]) =>
  ids
    .map((id) => lifeAreas.find((area) => area.id === id)?.label ?? id)
    .join(', ');
