const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

interface ApiOptions {
  method?: string;
  body?: Record<string, unknown>;
  token?: string;
}

async function apiRequest<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, token } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data as T;
}

// ─── Auth API ─────────────────────────────────────────────

export interface LoginResponse {
  accessToken?: string;
  user?: {
    id: string;
    name: string | null;
    email: string | null;
    role: string;
    isTwoFactorEnabled: boolean;
    image: string | null;
  };
  twoFactor?: boolean;
  success?: string;
}

export interface AuthResponse {
  success?: string;
  error?: string;
}

export const authApi = {
  register: (data: { email: string; name: string; password: string; role?: string }) =>
    apiRequest<AuthResponse>('/auth/register', { method: 'POST', body: data }),

  login: (data: { email: string; password: string; code?: string }) =>
    apiRequest<LoginResponse>('/auth/login', { method: 'POST', body: data }),

  googleLogin: (data: { email: string; name: string; image?: string; providerAccountId: string; role?: string }) =>
    apiRequest<LoginResponse>('/auth/google', { method: 'POST', body: data }),

  verifyEmail: (token: string) =>
    apiRequest<AuthResponse>('/auth/verify-email', {
      method: 'POST',
      body: { token },
    }),

  resetPassword: (email: string) =>
    apiRequest<AuthResponse>('/auth/reset-password', {
      method: 'POST',
      body: { email },
    }),

  newPassword: (password: string, token: string) =>
    apiRequest<AuthResponse>('/auth/new-password', {
      method: 'POST',
      body: { password, token },
    }),

  getMe: (accessToken: string) =>
    apiRequest<{
      id: string;
      name: string | null;
      email: string | null;
      role: string;
      isTwoFactorEnabled: boolean;
      image: string | null;
    }>('/auth/me', { token: accessToken }),

  updateSettings: (accessToken: string, data: { name?: string }) =>
    apiRequest<AuthResponse>('/auth/settings', {
      method: 'PATCH',
      body: data,
      token: accessToken,
    }),
};

// ─── Host Profile API ────────────────────────────────────────

export const hostProfileApi = {
  getProfile: (accessToken: string) =>
    apiRequest<Record<string, unknown>>('/host-profile', { token: accessToken }),

  updateProfile: (accessToken: string, data: Record<string, unknown>) =>
    apiRequest<Record<string, unknown>>('/host-profile', {
      method: 'POST',
      body: data,
      token: accessToken,
    }),
};
