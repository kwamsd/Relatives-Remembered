<template>
  <header class="app-header">
    <div class="header-content">
      <nav class="navbar left">
        <router-link to="/" class="nav-btn">HOME</router-link>
        <router-link to="/about" class="nav-btn">ABOUT US</router-link>
      </nav>

      <router-link to="/" class="site-logo-link">
        <img :src="logo" alt="Site logo" class="site-logo" />
      </router-link>

      <nav class="navbar right">
        <router-link to="/list" class="nav-btn">LIST</router-link>
        <router-link to="#" class="nav-btn">DONATION</router-link>

        <div class="user-area">
          <!-- Si connecté : point vert + bouton déconnexion -->
          <span v-if="user" class="online-dot"></span>
          <button
            v-if="user"
            @click="logout"
            class="nav-btn logout-btn"
          >
            Déconnexion
          </button>

          <!-- Sinon : lien de connexion unique -->
          <router-link
            v-else
            to="/login"
            class="nav-btn user-btn"
          >
            Se connecter
          </router-link>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import logo from '../assets/images/logo.png'
import '../assets/css/components/Header.css'
import { authService } from '../services/authService'

const user = computed(() => authService.state.user)
const router = useRouter()

async function logout() {
  await authService.logout()
  router.push('/login')
}
</script>
