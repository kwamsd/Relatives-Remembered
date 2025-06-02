<template>
  <main class="main-form">
    <h1>Create a page in memory</h1>
    <form class="form-page" @submit.prevent="handleSubmit" enctype="multipart/form-data">
      <div>
        <label for="prenom">Firstname</label>
        <input type="text" id="prenom" v-model="firstname" required>
      </div>
      <div>
        <label for="nom">Name</label>
        <input type="text" id="nom" v-model="lastname" required>
      </div>
      <div>
        <label for="date_naissance">Birth Date</label>
        <input type="date" id="date_naissance" v-model="birth">
      </div>
      <div>
        <label for="date_deces">Death date</label>
        <input type="date" id="date_deces" v-model="death">
      </div>
      <div class="full-width">
        <label for="biographie">Biography / Tribute</label>
        <textarea id="biographie" v-model="biography" rows="5"></textarea>
      </div>
      <div>
        <label for="photo">Upload your photo</label>
        <input type="file" id="photo" @change="handleFile" accept="image/*">
      </div>
      <div>
        <label for="theme">Page Theme</label>
        <select id="theme" v-model="theme">
          <option value="clair">Light</option>
          <option value="nature">Nature</option>
          <option value="sobre">Simple</option>
        </select>
      </div>
      <button type="submit" :disabled="loading">Create tribute page</button>
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
const birth = ref('')
const death = ref('')
const biography = ref('')
const theme = ref('clair')
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
    formData.append('birth', birth.value)
    formData.append('death', death.value)
    formData.append('biography', biography.value)
    formData.append('theme', theme.value)
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
      success.value = 'Page créée avec succès !'
      // Optionnel : redirige vers la page du profil créé
      // const created = await res.json()
      // router.push(`/dead-people/${created.id}`)
      // Ou reset le formulaire
      firstname.value = lastname.value = birth.value = death.value = biography.value = ''
      file.value = null
    }
  } catch (e) {
    error.value = 'Erreur réseau'
  } finally {
    loading.value = false
  }
}
</script>
