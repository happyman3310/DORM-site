import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { lifeAreas } from './lifeAreas';
import {
  createCheckpoint,
  createDirection,
  fetchCheckpoints,
  fetchDirections,
  fetchProfile,
  loginUser,
  updateDirection as updateDirectionRequest,
  type LoginPayload,
} from '../services/waynApi';
import { clearToken, getToken, setToken } from '../services/tokenStorage';

export type LifeAreaId = (typeof lifeAreas)[number]['id'];

export type UserProfile = {
  email: string;
  age?: number;
  status?: string;
  initials?: string;
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

const defaultState: AppState = {
  user: null,
  checkpoints: [],
  directions: [],
  plan: 'Free',
};

type AppDataContextValue = {
  state: AppState;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
  addCheckpoint: (areas: Record<LifeAreaId, CheckpointArea>) => Promise<void>;
  addDirection: (direction: Omit<Direction, 'id' | 'createdAt' | 'reviewAt' | 'status'>) => Promise<void>;
  updateDirection: (id: string, updates: Partial<Direction>) => Promise<void>;
  setPlan: (plan: AppState['plan']) => void;
};

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

export const AppDataProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(defaultState);
  const [tokenValue, setTokenValue] = useState<string | null>(() => getToken());
  const [isLoading, setIsLoading] = useState(true);

  const withInitials = (profile: UserProfile) => {
    if (profile.initials) return profile;
    const initials = profile.email
      .split('@')[0]
      .split(/[^a-zA-Zа-яА-Я0-9]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join('');
    return { ...profile, initials: initials || 'WA' };
  };

  const loadSession = async (token: string | null = tokenValue) => {
    if (!token) {
      setState(defaultState);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const [profile, checkpoints, directions] = await Promise.all([
        fetchProfile(),
        fetchCheckpoints(),
        fetchDirections(),
      ]);
      setState((prev) => ({
        ...prev,
        user: profile ? withInitials(profile) : null,
        checkpoints,
        directions,
      }));
    } catch {
      clearToken();
      setTokenValue(null);
      setState(defaultState);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSession();
  }, [tokenValue]);

  const login = async (payload: LoginPayload) => {
    const response = await loginUser(payload);
    setToken(response.token);
    setTokenValue(response.token);
    setState((prev) => ({
      ...prev,
      user: withInitials(response.user),
      plan: response.plan ?? prev.plan,
    }));
    await loadSession(response.token);
  };

  const logout = () => {
    clearToken();
    setTokenValue(null);
    setState(defaultState);
  };

  const addCheckpoint = async (areas: Record<LifeAreaId, CheckpointArea>) => {
    const checkpoint = await createCheckpoint({ areas });
    setState((prev) => ({
      ...prev,
      checkpoints: [checkpoint, ...prev.checkpoints],
    }));
  };

  const addDirection: AppDataContextValue['addDirection'] = async (direction) => {
    const newDirection = await createDirection(direction);
    setState((prev) => ({
      ...prev,
      directions: [newDirection, ...prev.directions],
    }));
  };

  const updateDirection = async (id: string, updates: Partial<Direction>) => {
    const updated = await updateDirectionRequest(id, updates);
    setState((prev) => ({
      ...prev,
      directions: prev.directions.map((direction) =>
        direction.id === id ? updated : direction,
      ),
    }));
  };

  const setPlan = (plan: AppState['plan']) => {
    setState((prev) => ({ ...prev, plan }));
  };

  const value = useMemo(
    () => ({
      state,
      isAuthenticated: Boolean(tokenValue),
      isLoading,
      login,
      logout,
      addCheckpoint,
      addDirection,
      updateDirection,
      setPlan,
    }),
    [state, tokenValue, isLoading],
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
