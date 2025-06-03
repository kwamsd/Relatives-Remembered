<template>
  <div id="list-page">
    <div class="list-container">
      <router-link
        v-for="person in deceasedList"
        :key="person.id"
        :to="`/dead-people/${person.id}`"
        style="text-decoration: none; color: inherit;"
      >
        <Card
        v-for="person in deceasedList"
        :key="person.id"
        :name="person.firstname + ' ' + person.lastname"
        :birth="person.Birth"
        :death="person.death"
        :description="person.description"
        :photo="person.image_url"
      />
      </router-link>
    </div>
    <div v-if="loading" class="loading-msg">Chargement...</div>
    <div v-if="error" class="error-msg">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Card from '../components/Card.vue'
import '../assets/css/Card.css'
import '../assets/css/List.css'

const deceasedList = ref([])
const loading = ref(false)
const error = ref('')

async function fetchDeceased() {
  loading.value = true
  error.value = ''
  try {
    const res = await fetch('http://localhost:3000/api/deceased')
    if (!res.ok) {
      error.value = 'Erreur lors du chargement'
      return
    }
    deceasedList.value = await res.json()
  } catch (e) {
    error.value = 'Erreur réseau'
  } finally {
    loading.value = false
  }
}

onMounted(fetchDeceased)
</script>
