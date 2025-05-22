<template>
  <header class="app-header">
    <div class="header-content">
      <nav class="navbar left">
        <router-link to="/lorem" class="nav-btn">Lorem 1</router-link>
        <router-link to="/ipsum" class="nav-btn">Ipsum 2</router-link>
      </nav>
      <router-link to="/" class="site-logo-link">
        <img :src="logo" alt="Site logo" class="site-logo" />
      </router-link>
      <nav class="navbar right">
        <router-link to="/list" class="nav-btn">List</router-link>
        <router-link to="/about" class="nav-btn">About Us</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import logo from '../assets/logo.png'
import '../assets/Header.css'
import { RouterLink } from 'vue-router'
</script>
