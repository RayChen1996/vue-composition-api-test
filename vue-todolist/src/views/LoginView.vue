<script setup lang="ts">
import { useAuthForm } from '@/composables/useAuthForm'

const { form, errors, isSubmitting, serverMessage, submit } = useAuthForm('login')
</script>

<template>
  <div class="card">
    <h2 class="card-title">登入帳號</h2>
    <p class="card-subtitle">輸入註冊時使用的 Email 與密碼以取得 token。</p>

    <div v-if="serverMessage" class="alert" :class="serverMessage.success ? 'alert-success' : 'alert-error'">
      {{ serverMessage.message }}
    </div>

    <form class="form-control" @submit.prevent="submit" style="gap: 0.9rem">
      <label class="label">
        <span>Email</span>
        <span class="helper-text">測試 API，需為真實格式</span>
      </label>
      <input v-model.trim="form.email" class="input" type="email" placeholder="example@mail.com" />
      <span v-if="errors.email" class="error-text">{{ errors.email }}</span>

      <label class="label" style="margin-top: 0.5rem">密碼</label>
      <input v-model="form.password" class="input" type="password" placeholder="請輸入至少 8 碼" />
      <span v-if="errors.password" class="error-text">{{ errors.password }}</span>

      <button class="btn btn-primary" type="submit" :disabled="isSubmitting" style="margin-top: 0.5rem">
        {{ isSubmitting ? '登入中...' : '登入' }}
      </button>
    </form>
  </div>
</template>
