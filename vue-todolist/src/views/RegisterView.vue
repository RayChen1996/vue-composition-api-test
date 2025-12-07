<script setup lang="ts">
import { useAuthForm } from '@/composables/useAuthForm'

const { form, errors, isSubmitting, serverMessage, submit } = useAuthForm('register')
</script>

<template>
  <div class="card">
    <h2 class="card-title">建立新帳號</h2>
    <p class="card-subtitle">填寫 Email、暱稱與密碼。註冊成功後會自動幫您登入。</p>

    <div v-if="serverMessage" class="alert" :class="serverMessage.success ? 'alert-success' : 'alert-error'">
      {{ serverMessage.message }}
    </div>

    <form class="form-control" @submit.prevent="submit" style="gap: 0.85rem">
      <label class="label">
        <span>Email</span>
        <span class="helper-text">請使用有效 Email 以便登入</span>
      </label>
      <input v-model.trim="form.email" class="input" type="email" placeholder="example@mail.com" />
      <span v-if="errors.email" class="error-text">{{ errors.email }}</span>

      <label class="label" style="margin-top: 0.35rem">暱稱</label>
      <input v-model.trim="form.nickname" class="input" type="text" placeholder="輸入暱稱" />
      <span v-if="errors.nickname" class="error-text">{{ errors.nickname }}</span>

      <label class="label" style="margin-top: 0.35rem">密碼</label>
      <input v-model="form.password" class="input" type="password" placeholder="請輸入至少 8 碼" />
      <span v-if="errors.password" class="error-text">{{ errors.password }}</span>

      <label class="label" style="margin-top: 0.35rem">確認密碼</label>
      <input v-model="form.confirmPassword" class="input" type="password" placeholder="再次輸入密碼" />
      <span v-if="errors.confirmPassword" class="error-text">{{ errors.confirmPassword }}</span>

      <button class="btn btn-primary" type="submit" :disabled="isSubmitting" style="margin-top: 0.35rem">
        {{ isSubmitting ? '送出中...' : '建立帳號' }}
      </button>
    </form>
  </div>
</template>
