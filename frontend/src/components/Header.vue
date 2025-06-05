<template>
  <header class="app-header">
    <div class="header-content">
      <router-link to="/" class="site-logo-link">
        <img :src="logo" alt="Site logo" class="site-logo" />
      </router-link>
      <nav class="navbar">
        <router-link to="/" class="nav-btn">HOME</router-link>
        <div class="dropdown">
          <button class="nav-btn">ABOUT&nbsp;US</button>
          <div class="dropdown-content">
            <router-link to="/about">Overview</router-link>
            <router-link to="/about/who-we-are">Who&nbsp;We&nbsp;Are</router-link>
            <router-link to="/about/contact">Contact</router-link>
            <router-link to="/about/founder">Founder</router-link>
          </div>
        </div>
        <router-link to="/list" class="nav-btn">LIST</router-link>
        <router-link to="/donation" class="nav-btn">DONATION</router-link>

        <!-- Mon espace (visible seulement si connecté) -->
        <div v-if="isLogged" class="dropdown">
          <button class="nav-btn">MY SPACE</button>
          <div class="dropdown-content">
            <router-link to="/my-space/infos">My Informations</router-link>
            <router-link to="/my-space/pages-created">My Pages</router-link>
          </div>
        </div>
      </nav>

      <!-- zone utilisateur -->
      <div class="user-area" v-if="isLogged">
        <span>You are connected</span><span class="online-dot" aria-label="En ligne" />
        <button class="logout-btn" @click="handleLogout">
          <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>

      <!-- si non connecté -->
      <router-link v-else class="user-btn" to="/login">Login</router-link>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import logo from '../assets/images/LOGO.png'
import '../assets/css/components/Header.css'
import { authService } from '../services/authService'

const router = useRouter()
const { state } = authService

// déclenche la déconnexion
async function handleLogout() {
  await authService.logout()
  router.push('/')
}

// affichage conditionnel
const isLogged = computed(() => !!state.user)
</script>

<style scoped>
/* Ajout du dropdown */
.dropdown {
  position: relative;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 160px;
  background: #798F8F;
  border-radius: 6px;
  padding: .5rem 0;
  display: none;
  flex-direction: column;
  z-index: 10;
}

.dropdown:hover .dropdown-content {
  display: flex;
}

.dropdown-content a {
  color: white;
  padding: .5rem 1rem;
  text-align: left;
}

.dropdown-content a:hover {
  background: rgba(255, 255, 255, .1);
}
</style>
