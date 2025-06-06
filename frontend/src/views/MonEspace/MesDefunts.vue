<script setup>
import { ref, onMounted } from 'vue'

const defunts = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch(`${apiUrl}/api/deceased/mine`, {
      credentials: 'include'
    })
    if (!res.ok) throw new Error('Data retrieval error')
    defunts.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <h2>My pages</h2>

    <p v-if="loading">Chargement…</p>
    <p v-else-if="error">{{ error }}</p>

    <div v-else-if="defunts.length === 0">No page has been created.</div>

    <ul v-else class="defunts-list">
      <li v-for="d in defunts" :key="d.id">
        <router-link :to="`/template/${d.id}`">{{ d.firstname }} {{ d.lastname }}</router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.defunts-list { list-style: none; padding: 0; margin-top: 1rem; }
.defunts-list li { padding: .6rem 0; border-bottom: 1px solid #e4e4e4; }
</style>
