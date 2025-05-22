<template>
  <div class="login-page">
    <form class="login-form" @submit.prevent="handleLogin">
      <h2>Connexion</h2>
      <div class="form-group">
        <label for="email">Adresse e-mail</label>
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
        <label for="password">Mot de passe</label>
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
        <button type="submit" class="login-btn">Se connecter</button>
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
import { ref } from 'vue'
import '../assets/css/Login.css'

const email = ref('')
const password = ref('')
const error = ref('')

function handleLogin() {
  error.value = ''
  // Ici tu pourras mettre ton appel API ou logique d'authentification
  if (!email.value || !password.value) {
    error.value = 'Veuillez remplir tous les champs.'
    return
  }
  // Simule une connexion (à remplacer par ta logique)
  if (email.value === 'test@example.com' && password.value === 'password') {
    alert('Connexion réussie !')
    // Redirection ou logique supplémentaire ici
  } else {
    error.value = 'Identifiants incorrects.'
  }
}
</script>
