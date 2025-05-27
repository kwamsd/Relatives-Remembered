<template>
  <header class="app-header">
    <div class="header-content">
      <nav class="navbar left">
        <router-link to="/" class="nav-btn">MAIN</router-link>
        <router-link to="/about" class="nav-btn">ABOUT US</router-link>
      </nav>
      <router-link to="/" class="site-logo-link">
        <img :src="logo" alt="Site logo" class="site-logo" />
      </router-link>
      <nav class="navbar right">
        <router-link to="/list" class="nav-btn">LIST</router-link>
        <router-link to="#" class="nav-btn">CONTACT</router-link>
        <router-link to="/login" class="nav-btn user-btn" aria-label="Se connecter">
          <svg class="user-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#798F8F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="8" r="4"/>
            <path d="M4 20c0-4 8-4 8-4s8 0 8 4"/>
          </svg>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import logo from '../assets/images/logo.png'
import '../assets/css/components/Header.css'
import { RouterLink } from 'vue-router'
</script>
