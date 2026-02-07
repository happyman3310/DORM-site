export class ApiError extends Error {
  status: number;
  payload?: unknown;

  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}

const TOKEN_KEY = 'wayn-auth-token';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token?: string | null) => {
  if (!token) {
    localStorage.removeItem(TOKEN_KEY);
    return;
  }
  localStorage.setItem(TOKEN_KEY, token);
};

const parseResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return response.json();
  }
  const text = await response.text();
  return text ? { message: text } : null;
};

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: Record<string, unknown> | FormData | null;
  withAuth?: boolean;
};

const request = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const url = `${API_BASE_URL}${path}`;
  const headers = new Headers(options.headers);
  const withAuth = options.withAuth ?? true;
  const token = getToken();

  if (withAuth && token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let body = options.body;
  if (body && !(body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
    body = JSON.stringify(body);
  }

  const response = await fetch(url, {
    ...options,
    headers,
    body: body ?? undefined,
  });

  const payload = await parseResponse(response);

  if (!response.ok) {
    const message =
      (payload as { message?: string } | null)?.message ||
      `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status, payload);
  }

  return payload as T;
};

export const apiClient = {
  request,
  get: <T>(path: string, options?: RequestOptions) => request<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: RequestOptions['body'], options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'POST', body }),
  put: <T>(path: string, body?: RequestOptions['body'], options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'PUT', body }),
  patch: <T>(path: string, body?: RequestOptions['body'], options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'PATCH', body }),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'DELETE' }),
};
