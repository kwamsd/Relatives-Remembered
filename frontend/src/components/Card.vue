<template>
  <div class="card">
    <!-- Photo --------------------------------------------------- -->
    <div class="card-photo">
      <img
        v-if="photoSrc"
        :src="photoSrc"
        :alt="`Portrait de ${firstname} ${lastname || ''}`"
      />
      <div v-else class="card-photo-placeholder">
        <span>Pas de photo</span>
      </div>
    </div>

    <!-- Informations ------------------------------------------- -->
    <div class="card-info">
      <h3 class="card-name">
        {{ firstname }}
        <span v-if="lastname">{{ lastname }}</span>
      </h3>

      <p class="card-dates">
        <span v-if="birthYear">{{ birthYear }}</span>
        <span v-if="deathYear"> – {{ deathYear }}</span>
      </p>

      <p v-if="profession" class="card-profession">
        <strong>Job :</strong> {{ profession }}
      </p>
      <p v-if="birthplace" class="card-birthplace">
        <strong>Nationality :</strong> {{ birthplace }}
      </p>
      <p v-if="known_for" class="card-knownfor">
        <strong>Known for :</strong> {{ known_for }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

/* ---------- props ---------- */
const props = defineProps({
  firstname:  String,
  lastname:   String,
  birth:      String,
  death:      String,
  profession: String,
  birthplace: String,
  photo:      String,
})

/* ---------- Années ---------- */
const birthYear = computed(() =>
  props.birth ? new Date(props.birth).getUTCFullYear() : null
)
const deathYear = computed(() =>
  props.death ? new Date(props.death).getUTCFullYear() : null
)

/* ---------- Photo : chemin absolu ---------- */
const apiUrl = 'https://relatives-remembered.onrender.com'   
const photoSrc = computed(() =>
  props.photo
    ? props.photo.startsWith('http')
      ? props.photo
      : apiUrl + props.photo         
    : ''
)
</script>
