<!-- frontend/src/views/Signup.vue -->
<template>
  <div class="signup-page">
    <div id="signup-form">
      <h1>Create an Account</h1>
      <form @submit.prevent="handleSignup">
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          v-model="lastname"
          required
        />
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          v-model="firstname"
          required
        />
        <input
          type="email"
          name="mail"
          placeholder="Email"
          v-model="mail"
          required
        />
        <input
          type="text"
          name="mobilephone"
          placeholder="Mobile Phone"
          v-model="mobilephone"
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          v-model="username"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          v-model="password"
          required
        />
        <input type="submit" value="Sign Up" class="signup-btn" />
      </form>
      <p class="login-link">
        Already have an account?
        <router-link to="/login">Log in</router-link>
      </p>
      <div v-if="error" class="form-error">{{ error }}</div>
      <div v-if="success" class="form-success">{{ success }}</div>
    </div>
  </div>
</template>

<script setup>
import '../assets/css/account/Signup.css'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService as $auth } from '../services/authService.js'

const lastname = ref('')
const firstname = ref('')
const mail = ref('')
const mobilephone = ref('')
const username = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const router = useRouter()

async function handleSignup() {
  error.value = ''
  success.value = ''
  try {
    await $auth.register({
      lastname: lastname.value,
      firstname: firstname.value,
      mail: mail.value,
      mobilephone: mobilephone.value,
      username: username.value,
      password: password.value
    })
    success.value = 'Compte créé ! Vous pouvez vous connecter.'
    setTimeout(() => router.push('/login'), 1500)
  } catch {
    error.value = $auth.state.error
  }
}
</script>
