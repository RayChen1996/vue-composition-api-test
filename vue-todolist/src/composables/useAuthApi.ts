import { useAuthStore } from '@/stores/auth'

const API_BASE = 'https://todolist-api.hexschool.io'

interface SignUpPayload {
  email: string
  password: string
  nickname: string
}

interface SignInPayload {
  email: string
  password: string
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const { state } = useAuthStore()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(state.token ? { Authorization: state.token } : {}),
    ...(options.headers || {}),
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  })

  const data = await response.json()

  if (!response.ok || data?.status === false) {
    throw new Error(data?.message || '請稍後再試')
  }

  return data as T
}

export function useAuthApi() {
  const signUp = (payload: SignUpPayload) =>
    request<{ status: boolean; uid?: string; message?: string }>(`/users/sign_up`, {
      method: 'POST',
      body: JSON.stringify(payload),
    })

  const signIn = (payload: SignInPayload) =>
    request<{ status: boolean; token: string; message?: string }>(`/users/sign_in`, {
      method: 'POST',
      body: JSON.stringify(payload),
    })

  const signOut = () =>
    request<{ status: boolean; message?: string }>(`/users/sign_out`, {
      method: 'POST',
    })

  const checkout = () =>
    request<{ status: boolean; uid: string; email?: string; nickname?: string }>(`/users/checkout`, {
      method: 'GET',
    })

  return { signUp, signIn, signOut, checkout }
}
