<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// redirige vers /mon-espace/infos la 1ʳᵉ fois
onMounted(() => {
  if (router.currentRoute.value.path === '/mon-espace') {
    router.replace('/mon-espace/infos')
  }
})
</script>

<template>
  <div class="mon-espace">
    <h1>My Space</h1>

    <!-- sous-navigation locale -->
    <nav class="espace-subnav">
      <router-link to="/my-space/infos" active-class="active">My informations</router-link>
      <router-link to="/my-space/pages-created" active-class="active">My Pages</router-link>
    </nav>

    <router-view />
  </div>
</template>

<style scoped>
.mon-espace { max-width: 960px; margin-inline: auto; padding: 2rem 1rem; }
.espace-subnav { display: flex; gap: 1.5rem; margin: 1.5rem 0; }
.espace-subnav a { font-weight: 600; }
.espace-subnav a.active { color: #798F8F; border-bottom: 2px solid #798F8F; }
</style>
