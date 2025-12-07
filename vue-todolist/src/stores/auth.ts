import { computed, reactive, watch } from 'vue'

interface AuthUser {
  email: string
  nickname?: string
  uid?: string
}

const TOKEN_KEY = 'todolist-token'

export function useAuthStore() {
  const state = reactive({
    token: localStorage.getItem(TOKEN_KEY) || '',
    user: null as AuthUser | null,
  })

  const isAuthenticated = computed(() => Boolean(state.token))

  watch(
    () => state.token,
    (value) => {
      if (value) {
        localStorage.setItem(TOKEN_KEY, value)
      } else {
        localStorage.removeItem(TOKEN_KEY)
      }
    },
    { immediate: true }
  )

  const setToken = (token: string) => {
    state.token = token
  }

  const setUser = (user: AuthUser | null) => {
    state.user = user
  }

  const clear = () => {
    state.token = ''
    state.user = null
  }

  return { state, isAuthenticated, setToken, setUser, clear }
}
