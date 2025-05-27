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
import { ref } from 'vue'
import '../assets/css/Signup.css'

const lastname = ref('')
const firstname = ref('')
const mail = ref('')
const mobilephone = ref('')
const username = ref('')
const password = ref('')
const error = ref('')
const success = ref('')

function handleSignup() {
  error.value = ''
  success.value = ''
  // Validation simple côté client
  if (
    !lastname.value ||
    !firstname.value ||
    !mail.value ||
    !mobilephone.value ||
    !username.value ||
    !password.value
  ) {
    error.value = 'Please fill in all fields.'
    return
  }
  // Ici tu pourras mettre ton appel API ou logique d'inscription
  // Pour le moment, on simule une réussite
  success.value = 'Account created! (simulation)'
  // Réinitialise les champs si besoin
  // lastname.value = firstname.value = mail.value = mobilephone.value = username.value = password.value = ''
}
</script>
