const API_BASE = import.meta.env.VITE_API_URL ?? '/api';
const TOKEN_KEY = 'wayn-token';

const getToken = () => localStorage.getItem(TOKEN_KEY);
const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
const clearToken = () => localStorage.removeItem(TOKEN_KEY);

const request = async <T>(path: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    const message = payload?.message ?? 'Request failed';
    throw new Error(message);
  }
  return (await response.json()) as T;
};

const authRequest = async <T>(path: string, options: RequestInit = {}) => {
  const token = getToken();
  if (!token) {
    throw new Error('Not authenticated');
  }
  return request<T>(path, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.headers ?? {}),
    },
  });
};

export type ApiState = {
  user: {
    id: string;
    email: string;
    age: number | null;
    status: string | null;
    initials: string;
  };
  checkpoints: unknown[];
  directions: unknown[];
  plan: 'Free' | 'Pro';
};

export const api = {
  getToken,
  setToken,
  clearToken,
  async register(payload: { email: string; password: string; age?: number; status?: string }) {
    const data = await request<{ token: string; state: ApiState }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setToken(data.token);
    return data.state;
  },
  async login(payload: { email: string; password: string }) {
    const data = await request<{ token: string; state: ApiState }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setToken(data.token);
    return data.state;
  },
  async fetchState() {
    return authRequest<ApiState>('/state');
  },
  async addCheckpoint(areas: Record<string, { score: number; note: string }>) {
    return authRequest<{ checkpoint: unknown }>('/checkpoints', {
      method: 'POST',
      body: JSON.stringify({ areas }),
    });
  },
  async addDirection(payload: {
    title: string;
    description: string;
    expectedOutcome: string;
    period: string;
    criteria: Record<string, { expected: number; actual?: number }>;
  }) {
    return authRequest<{ direction: unknown }>('/directions', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  async updateDirection(id: string, updates: Record<string, unknown>) {
    return authRequest<{ direction: unknown }>(`/directions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  },
  async setPlan(plan: 'Free' | 'Pro') {
    return authRequest<{ plan: 'Free' | 'Pro' }>('/plan', {
      method: 'PUT',
      body: JSON.stringify({ plan }),
    });
  },
};
