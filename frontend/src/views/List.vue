<template>
  <div id="list-page">
    <!-- Barre de recherche & filtres -->
    <div class="controls">
      <!-- Recherche par nom complet -->
      <input type="text" v-model="searchTerm" placeholder="🔍 Rechercher un nom..." class="search-input" />

      <!-- Filtre par année de naissance -->
      <select v-model="selectedBirth" class="filter-select">
        <option value="">Toutes années de naissance</option>
        <option v-for="year in birthYears" :key="year" :value="year">
          {{ year }}
        </option>
      </select>

      <!-- Filtre par profession -->
      <select v-model="selectedProfession" class="filter-select">
        <option value="">Toutes professions</option>
        <option v-for="profession in professions" :key="profession" :value="profession">
          {{ profession }}
        </option>
      </select>

      <!-- Filtre par lieu de naissance -->
      <select v-model="selectedBirthplace" class="filter-select">
        <option value="">Tous lieux de naissance</option>
        <option v-for="place in birthplaces" :key="place" :value="place">
          {{ place }}
        </option>
      </select>
    </div>

    <!-- Conteneur en grille -->
    <div class="list-container">
    <router-link
      v-for="person in paginatedList"
      :key="person.id"
      :to="`/dead-people/${person.id}`"
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


    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination">
      <button :disabled="currentPage === 1" @click="currentPage--" class="page-btn">
        Précédent
      </button>

      <!-- Boutons numérotés de page -->
      <button v-for="page in totalPages" :key="page" @click="currentPage = page"
        :class="['page-btn', { active: page === currentPage }]">
        {{ page }}
      </button>

      <button :disabled="currentPage === totalPages" @click="currentPage++" class="page-btn">
        Suivant
      </button>
    </div>
    <div v-if="loading" class="loading-msg">Chargement...</div>
    <div v-if="error" class="error-msg">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import Card from '../components/Card.vue'
import '../assets/css/List.css'

/* ---------------------------- */
/*  ÉTATS                       */
/* ---------------------------- */
const deceasedList        = ref([])
const loading             = ref(false)
const error               = ref('')

const searchTerm          = ref('')
const selectedBirth       = ref('')
const selectedProfession  = ref('')
const selectedBirthplace  = ref('')

const itemsPerPage = 20
const currentPage  = ref(1)

/* ---------------------------- */
/*  FETCH API                   */
/* ---------------------------- */
async function fetchDeceased () {
  loading.value = true
  error.value   = ''

  try {
    const res = await fetch('http://localhost:3000/api/deceased')
    if (!res.ok) throw new Error('Bad response')
    deceasedList.value = await res.json()
  } catch (err) {
    console.error(err)
    error.value = 'Erreur lors du chargement'
  } finally {
    loading.value = false
  }
}
onMounted(fetchDeceased)

/* ---------------------------- */
/*  LISTES UNIQUES POUR FILTRES */
/* ---------------------------- */
const birthYears = computed(() =>
  [...new Set(deceasedList.value.map(p => p.birth))].sort((a, b) => a - b)
)

const professions = computed(() =>
  [...new Set(
    deceasedList.value
      .map(p => p.profession)
      .filter(p => p && p.trim())
  )].sort()
)

const birthplaces = computed(() =>
  [...new Set(
    deceasedList.value
      .map(p => p.birthplace)
      .filter(p => p && p.trim())
  )].sort()
)

/* ---------------------------- */
/*  FILTRAGE + PAGINATION       */
/* ---------------------------- */
const filteredList = computed(() =>
  deceasedList.value.filter(person => {
    const nameMatch  = `${person.firstname} ${person.lastname}`.toLowerCase()
                       .includes(searchTerm.value.toLowerCase())
    const birthMatch = selectedBirth.value
                         ? person.birth === selectedBirth.value
                         : true
    const profMatch  = selectedProfession.value
                         ? person.profession === selectedProfession.value
                         : true
    const placeMatch = selectedBirthplace.value
                         ? person.birthplace === selectedBirthplace.value
                         : true
    return nameMatch && birthMatch && profMatch && placeMatch
  })
)

const totalPages = computed(() =>
  Math.ceil(filteredList.value.length / itemsPerPage) || 1
)

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
