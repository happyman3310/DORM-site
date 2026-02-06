import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { lifeAreas } from './lifeAreas';
import { api, type ApiState } from '../api/appApi';

export type LifeAreaId = (typeof lifeAreas)[number]['id'];

export type UserProfile = ApiState['user'];

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
  loading: boolean;
  error: string | null;
  login: (payload: { email: string; password: string }) => Promise<void>;
  register: (payload: { email: string; password: string; age?: number; status?: string }) => Promise<void>;
  logout: () => void;
  addCheckpoint: (areas: Record<LifeAreaId, CheckpointArea>) => Promise<void>;
  addDirection: (direction: Omit<Direction, 'id' | 'createdAt' | 'reviewAt' | 'status'>) => Promise<void>;
  updateDirection: (id: string, updates: Partial<Direction>) => Promise<void>;
  setPlan: (plan: AppState['plan']) => Promise<void>;
};

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

export const AppDataProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(defaultState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const bootstrap = async () => {
      if (!api.getToken()) {
        setLoading(false);
        return;
      }
      try {
        const nextState = await api.fetchState();
        setState({
          user: nextState.user,
          checkpoints: nextState.checkpoints as Checkpoint[],
          directions: nextState.directions as Direction[],
          plan: nextState.plan,
        });
      } catch (err) {
        api.clearToken();
        setState(defaultState);
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, []);

  const login: AppDataContextValue['login'] = async (payload) => {
    setError(null);
    const nextState = await api.login(payload);
    setState({
      user: nextState.user,
      checkpoints: nextState.checkpoints as Checkpoint[],
      directions: nextState.directions as Direction[],
      plan: nextState.plan,
    });
  };

  const register: AppDataContextValue['register'] = async (payload) => {
    setError(null);
    const nextState = await api.register(payload);
    setState({
      user: nextState.user,
      checkpoints: nextState.checkpoints as Checkpoint[],
      directions: nextState.directions as Direction[],
      plan: nextState.plan,
    });
  };

  const logout = () => {
    api.clearToken();
    setState(defaultState);
  };

  const addCheckpoint = async (areas: Record<LifeAreaId, CheckpointArea>) => {
    setError(null);
    const { checkpoint } = await api.addCheckpoint(areas);
    setState((prev) => ({
      ...prev,
      checkpoints: [checkpoint as Checkpoint, ...prev.checkpoints],
    }));
  };

  const addDirection: AppDataContextValue['addDirection'] = async (direction) => {
    setError(null);
    const { direction: created } = await api.addDirection(direction);
    setState((prev) => ({
      ...prev,
      directions: [created as Direction, ...prev.directions],
    }));
  };

  const updateDirection = async (id: string, updates: Partial<Direction>) => {
    setError(null);
    const { direction } = await api.updateDirection(id, updates);
    setState((prev) => ({
      ...prev,
      directions: prev.directions.map((item) =>
        item.id === id ? (direction as Direction) : item,
      ),
    }));
  };

  const setPlan = async (plan: AppState['plan']) => {
    setError(null);
    const { plan: nextPlan } = await api.setPlan(plan);
    setState((prev) => ({ ...prev, plan: nextPlan }));
  };

  const value = useMemo(
    () => ({
      state,
      loading,
      error,
      login,
      register,
      logout,
      addCheckpoint,
      addDirection,
      updateDirection,
      setPlan,
    }),
    [state, loading, error],
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
