<template>
  <main class="main-form">
    <h1 class="form-h1">Create a page in memory</h1>
    <form class="form-page" @submit.prevent="handleSubmit" enctype="multipart/form-data">
      <div>
        <label class="form-label" for="firstname">Firstname</label>
        <input class="form-input" type="text" id="firstname" v-model="firstname" required>
      </div>
      <div>
        <label class="form-label" for="lastname">Name</label>
        <input class="form-input" type="text" id="lastname" v-model="lastname" required>
      </div>
      <div>
        <label class="form-label" for="second_name">Second Name</label>
        <input class="form-input" type="text" id="second_name" v-model="second_name">
      </div>
      <div>
        <label class="form-label" for="third_name">Third Name</label>
        <input class="form-input" type="text" id="third_name" v-model="third_name">
      </div>
      <div>
        <label class="form-label" for="birth">Birth Date</label>
        <input class="form-input" type="date" id="birth" v-model="birth">
      </div>
      <div>
        <label class="form-label" for="death">Death Date</label>
        <input class="form-input" type="date" id="death" v-model="death">
      </div>
      <div>
        <label class="form-label" for="job">Job</label>
        <input class="form-input" type="text" id="job" v-model="job">
      </div>
      <div>
        <label class="form-label" for="nationality">Nationality</label>
        <input class="form-input" type="text" id="nationality" v-model="nationality">
      </div>
      <div>
        <label class="form-label" for="gender">Gender</label>
        <select class="form-select" id="gender" v-model="gender">
          <option value="">Select</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
        </select>
      </div>
      <div class="full-width">
        <label class="form-label" for="description">Biography / Tribute</label>
        <textarea class="form-textarea" id="description" v-model="description" rows="5"></textarea>
      </div>
      <div>
        <label class="form-label" for="photo">Upload a photo</label>
        <input class="form-input" type="file" id="photo" @change="handleFile" accept="image/*">
      </div>
      <button class="form-button" type="submit" :disabled="loading">Create tribute page</button>
      <div v-if="success" class="success-msg">{{ success }}</div>
      <div v-if="error" class="error-msg">{{ error }}</div>
    </form>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService as $auth } from '../services/authService.js'
import '../assets/css/form.css'

const firstname = ref('')
const lastname = ref('')
const second_name = ref('')
const third_name = ref('')
const birth = ref('')
const death = ref('')
const job = ref('')
const nationality = ref('')
const gender = ref('')
const description = ref('')
const file = ref(null)
const loading = ref(false)
const success = ref('')
const error = ref('')
const router = useRouter()

function handleFile(e) {
  file.value = e.target.files[0]
}

async function handleSubmit() {
  error.value = ''
  success.value = ''
  loading.value = true

  if (!$auth.state.user) {
    error.value = 'Vous devez être connecté pour créer une page.'
    loading.value = false
    return
  }

  try {
    const formData = new FormData()
    formData.append('firstname', firstname.value)
    formData.append('lastname', lastname.value)
    formData.append('second_name', second_name.value)
    formData.append('third_name', third_name.value)
    formData.append('birth', birth.value)
    formData.append('death', death.value)
    formData.append('job', job.value)
    formData.append('nationality', nationality.value)
    formData.append('gender', gender.value)
    formData.append('description', description.value)
    if (file.value) {
      formData.append('photo', file.value)
    }

    const res = await fetch('http://localhost:3000/api/deceased', {
      method: 'POST',
      credentials: 'include',
      body: formData
    })

    if (!res.ok) {
      const data = await res.json()
      error.value = data.error || 'Erreur lors de la création'
    } else {
      const created = await res.json()
      success.value = 'Page créée avec succès !'
      router.push(`/dead-people/${created.id}`)
    }
  } catch (e) {
    error.value = 'Erreur réseau'
  } finally {
    loading.value = false
  }
}
</script>
