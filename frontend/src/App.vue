<!-- frontend/src/App.vue -->
<script setup>
import './assets/css/style.css'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { onMounted } from 'vue'
import { authService } from './services/authService.js'

onMounted(() => {
  // Si un cookie "token" existe, fetchMe() le décodera et remplira state.user
  authService.fetchMe()
})
</script>

<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>
