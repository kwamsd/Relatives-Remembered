<template>
  <div class="card">
    <!-- Partie photo -->
    <div class="card-photo">
      <img v-if="photo" :src="photo" :alt="'Portrait de ' + firstname + ' ' + lastname" />
      <div v-else class="card-photo-placeholder">
        <span>Pas de photo</span>
      </div>
    </div>

    <!-- Partie informations -->
    <div class="card-info">
      <h3 class="card-name">
        {{ firstname }} <span v-if="lastname">{{ lastname }}</span>
      </h3>
      <p class="card-dates">
        <span v-if="birthYear">{{ birthYear }}</span>
        <span v-if="deathYear"> – {{ deathYear }}</span>
      </p>
      <p v-if="profession" class="card-profession">
        <strong>Profession :</strong> {{ profession }}
      </p>
      <p v-if="birthplace" class="card-birthplace">
        <strong>Naissance :</strong> {{ birthplace }}
      </p>
      <p v-if="known_for" class="card-knownfor">
        <strong>Connu pour :</strong> {{ known_for }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import '../assets/css/Card.css'

const props = defineProps({
  firstname: String,
  lastname: String,
  birth: String,
  death: String,
  profession: String,
  birthplace: String,
  photo: String,
})

/* Utilise getUTCFullYear() pour éviter les décalages liés au fuseau */
const birthYear = computed(() =>
  props.birth ? new Date(props.birth).getUTCFullYear() : null
)

const deathYear = computed(() =>
  props.death ? new Date(props.death).getUTCFullYear() : null
)
</script>
