<template>
  <section class="auth-layout">
    <div>
      <p class="badge">待辦清單 / Auth</p>
      <h1 class="hero-title">登入與註冊</h1>
      <p class="hero-subtitle">
        使用 HexSchool 提供的 todolist API 完成待辦清單服務。請先註冊或登入以取得 token，後續即可串接
        todos 相關功能。
      </p>
      <div style="display: flex; gap: 0.5rem; margin-top: 1.25rem">
        <RouterLink class="btn btn-outline" to="/auth/login">登入</RouterLink>
        <RouterLink class="btn btn-primary" to="/auth/register">建立帳號</RouterLink>
      </div>
    </div>

    <div class="surface-card card card-shadow">
      <div class="tabs" style="margin-bottom: 1rem">
        <RouterLink
          to="/auth/login"
          class="tab"
          :class="{ 'tab-active': $route.name === 'login' }"
        >
          登入
        </RouterLink>
        <RouterLink
          to="/auth/register"
          class="tab"
          :class="{ 'tab-active': $route.name === 'register' }"
        >
          註冊
        </RouterLink>
      </div>
      <RouterView />
    </div>
  </section>
</template>
