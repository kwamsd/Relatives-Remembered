<template>
  <div class="card">
    <div class="card-photo">
      <img v-if="photo" :src="photo" alt="Photo of deceased" />
      <div v-else class="card-photo-placeholder">No Photo</div>
    </div>
    <div class="card-info">
      <h3>{{ name }}</h3>
      <p class="card-dates">{{ birth }} – {{ death }}</p>
      <p class="card-description">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  birth: String,
  death: String,
  description: String,
  photo: String
})
</script>
