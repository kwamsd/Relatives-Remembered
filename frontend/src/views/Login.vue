<!-- frontend/src/components/Login.vue -->
<template>
  <div class="login-page">
    <form class="login-form" @submit.prevent="handleLogin">
      <h2>Login Space</h2>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          v-model="email"
          required
          autocomplete="username"
          placeholder="votre@email.com"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          v-model="password"
          required
          autocomplete="current-password"
          placeholder="Votre mot de passe"
        />
      </div>
      <div class="form-actions">
        <button type="submit" class="login-btn">Login</button>
      </div>
      <div v-if="error" class="form-error">{{ error }}</div>
      <p class="signup-link">
        Don't have an account?
        <router-link to="/signup">Sign up</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import '../assets/css/account/login.css'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService as $auth } from '../services/authService.js'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function handleLogin() {
  error.value = ''
  try {
    await $auth.login(email.value, password.value)
    router.push('/')   // redirige vers la page principale si ok
  } catch (e) {
    error.value = $auth.state.error
  }
}
</script>
