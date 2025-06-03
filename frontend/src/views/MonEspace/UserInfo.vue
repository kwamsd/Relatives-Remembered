<script setup>
import { computed } from 'vue'
import { authService } from '../../services/authService.js'

const user = computed(() => authService.state.user)
</script>

<template>
  <div v-if="user" class="user-card">
    <h2>Mes informations</h2>
    <ul>
      <li><strong>Name & Firstname :</strong> {{ user.lastname }} {{ user.firstname }}</li>
      <li><strong>Email :</strong> {{ user.mail }}</li>
      <li><strong>Phone number :</strong> {{ user.mobilephone }}</li>
      <li><strong>Username :</strong> {{ user.username }}</li>
    </ul>
  </div>
  <p v-else>Loading…</p>
</template>

<style scoped>
.user-card { background: #f5f5f5; padding: 1.5rem; border-radius: 8px; }
.user-card ul { margin: 0; padding: 0; list-style: none; line-height: 1.8; }
</style>
