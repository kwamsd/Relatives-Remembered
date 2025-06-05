<template>
  <div id="list-page">
    <!-- -------------------- Barre de recherche + filtres -------------------- -->
    <div class="controls">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="🔍 Search for a name..."
        class="search-input"
      />

      <select v-model="selectedBirth" class="filter-select">
        <option value="">All birth years</option>
        <option v-for="year in birthYears" :key="year" :value="year">{{ year }}</option>
      </select>

      <select v-model="selectedProfession" class="filter-select">
        <option value="">All occupations</option>
        <option v-for="profession in professions" :key="profession" :value="profession">
          {{ profession }}
        </option>
      </select>

      <select v-model="selectedBirthplace" class="filter-select">
        <option value="">Nationality</option>
        <option v-for="place in birthplaces" :key="place" :value="place">
          {{ place }}
        </option>
      </select>
    </div>

    <!-- -------------------- Grille des cartes -------------------- -->
    <div class="list-container">
      <router-link
        v-for="person in paginatedList"
        :key="person.id"
        :to="`/template/${person.id}`"
        class="card-link"
      >
        <Card
          :firstname="person.firstname"
          :lastname="person.lastname"
          :birth="person.birth"
          :death="person.death"
          :profession="person.job"
          :birthplace="person.nationality"
          :photo="person.image_url"
        />
      </router-link>
    </div>

    <!-- -------------------- Pagination -------------------- -->
    <div v-if="totalPages > 1" class="pagination">
      <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">Previous</button>

      <button
        v-for="page in totalPages"
        :key="page"
        class="page-btn"
        :class="{ active: page === currentPage }"
        @click="currentPage = page"
      >
        {{ page }}
      </button>

      <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage++">Next</button>
    </div>

    <div v-if="loading" class="loading-msg">Loading…</div>
    <div v-if="error" class="error-msg">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Card from '../components/Card.vue'
import '../assets/css/List.css'

/* ---------- États ---------- */
const deceasedList        = ref([])
const loading             = ref(false)
const error               = ref('')

const searchTerm          = ref('')
const selectedBirth       = ref(null)
const selectedProfession  = ref('')
const selectedBirthplace  = ref('')

const itemsPerPage = 20
const currentPage  = ref(1)

/* ---------- Route & init recherche ---------- */
const route = useRoute()

function initFromQuery () {
  const first = route.query.first || ''
  const last  = route.query.last  || ''
  if (first || last) searchTerm.value = `${first} ${last}`.trim()
}
onMounted(initFromQuery)
watch(() => route.query, initFromQuery)

/* ---------- API ---------- */
async function fetchDeceased () {
  loading.value = true
  error.value   = ''
  try {
    const res = await fetch('https://relatives-remembered.onrender.com/api/deceased')
    if (!res.ok) throw new Error('Bad response')
    deceasedList.value = await res.json()
  } catch (err) {
    console.error(err)
    error.value = 'Error while loading'
  } finally {
    loading.value = false
  }
}
onMounted(fetchDeceased)

/* ---------- Listes uniques ---------- */
const birthYears = computed(() => {
  const years = deceasedList.value
    .filter(p => p.birth)
    .map(p => new Date(p.birth).getUTCFullYear())
  return [...new Set(years)].sort((a, b) => b - a)
})

const professions = computed(() =>
  [...new Set(
    deceasedList.value.map(p => p.job).filter(j => j && j.trim())
  )].sort()
)

const birthplaces = computed(() =>
  [...new Set(
    deceasedList.value.map(p => p.nationality).filter(n => n && n.trim())
  )].sort()
)

/* ---------- Filtrage + pagination ---------- */
const filteredList = computed(() => {
  const term = searchTerm.value.toLowerCase()
  return deceasedList.value.filter(person => {
    const nameMatch  = `${person.firstname} ${person.lastname}`.toLowerCase().includes(term)
    const birthYear  = person.birth ? new Date(person.birth).getUTCFullYear() : null
    const birthMatch = selectedBirth.value ? birthYear === selectedBirth.value : true
    const profMatch  = selectedProfession.value ? person.job === selectedProfession.value : true
    const placeMatch = selectedBirthplace.value ? person.nationality === selectedBirthplace.value : true
    return nameMatch && birthMatch && profMatch && placeMatch
  })
})

const totalPages = computed(() => Math.ceil(filteredList.value.length / itemsPerPage) || 1)

const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredList.value.slice(start, start + itemsPerPage)
})

/* Quand un filtre change → page 1 */
watch(
  [searchTerm, selectedBirth, selectedProfession, selectedBirthplace],
  () => { currentPage.value = 1 }
)
</script>
