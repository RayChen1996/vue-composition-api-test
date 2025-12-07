import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthApi } from './useAuthApi'
import { useAuthStore } from '@/stores/auth'

type Mode = 'login' | 'register'

interface LoginForm {
  email: string
  password: string
}

interface RegisterForm extends LoginForm {
  nickname: string
  confirmPassword: string
}

type FormState = LoginForm & Partial<RegisterForm>

interface SubmitResult {
  success: boolean
  message: string
}

const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/

export function useAuthForm(mode: Mode) {
  const router = useRouter()
  const api = useAuthApi()
  const authStore = useAuthStore()

  const form = reactive<FormState>({
    email: '',
    password: '',
    nickname: '',
    confirmPassword: '',
  })

  const errors = reactive<Record<string, string>>({})
  const isSubmitting = ref(false)
  const serverMessage = ref<SubmitResult | null>(null)

  const isLogin = computed(() => mode === 'login')

  const validate = () => {
    errors.email = ''
    errors.password = ''
    errors.nickname = ''
    errors.confirmPassword = ''

    if (!form.email) {
      errors.email = '請輸入 Email'
    } else if (!emailPattern.test(form.email)) {
      errors.email = 'Email 格式不正確'
    }

    if (!form.password || form.password.length < 8) {
      errors.password = '密碼至少需要 8 碼'
    }

    if (!isLogin.value) {
      if (!form.nickname) {
        errors.nickname = '請輸入暱稱'
      }
      if (form.confirmPassword !== form.password) {
        errors.confirmPassword = '兩次密碼不一致'
      }
    }

    return !errors.email && !errors.password && !errors.nickname && !errors.confirmPassword
  }

  const handleLogin = async () => {
    const response = await api.signIn({
      email: form.email,
      password: form.password,
    })

    authStore.setToken(response.token)
    serverMessage.value = { success: true, message: response.message || '登入成功' }
    await router.push('/auth/login')
  }

  const handleRegister = async () => {
    await api.signUp({
      email: form.email,
      password: form.password,
      nickname: form.nickname || '',
    })

    const loginResult = await api.signIn({ email: form.email, password: form.password })
    authStore.setToken(loginResult.token)
    serverMessage.value = { success: true, message: '註冊並登入成功' }
    await router.push('/auth/login')
  }

  const submit = async () => {
    serverMessage.value = null
    if (!validate()) return

    isSubmitting.value = true
    try {
      if (isLogin.value) {
        await handleLogin()
      } else {
        await handleRegister()
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : '發生未知錯誤'
      serverMessage.value = { success: false, message }
    } finally {
      isSubmitting.value = false
    }
  }

  return { form, errors, isSubmitting, serverMessage, isLogin, submit }
}
