<template>
  <main class="edit-main" v-if="profile">
    <section class="edit-left-section">
      <div class="edit-photo-frame">
        <img
          v-if="profile.image_url"
          :src="profile.image_url.startsWith('http') ? profile.image_url : apiUrl + profile.image_url"
          :alt="'Portrait de ' + profile.firstname + ' ' + profile.lastname"
        />
        <div v-else class="edit-photo-placeholder">No Photo</div>
        <label class="edit-label">Changer la photo</label>
        <input type="file" @change="onImageChange" accept="image/*" class="edit-input-file" />
      </div>
      <div class="edit-identity-card">
        <input class="edit-name-input" v-model="profile.firstname" placeholder="Prénom" />
        <input class="edit-name-input" v-model="profile.lastname" placeholder="Nom" />
        <p class="edit-dates">{{ formatYear(profile.birth) }} — {{ formatYear(profile.death) }}</p>
      </div>
      <div class="edit-details-box">
        <input v-model="profile.second_name" placeholder="Second prénom" class="edit-detail-input" />
        <input v-model="profile.third_name" placeholder="Troisième prénom" class="edit-detail-input" />
        <input v-model="profile.job" placeholder="Profession" class="edit-detail-input" />
        <input v-model="profile.nationality" placeholder="Nationalité" class="edit-detail-input" />
        <select v-model="profile.gender" class="edit-detail-select">
          <option value="">Genre</option>
          <option value="M">Masculin</option>
          <option value="F">Féminin</option>
          <option value="O">Autre</option>
        </select>
      </div>
    </section>

    <section class="edit-right-section">
      <div class="edit-form-box">
        <form @submit.prevent="submit">
          <label>Date de naissance</label>
          <input type="date" v-model="profile.birth" class="edit-date-input" />

          <label>Date de décès</label>
          <input type="date" v-model="profile.death" class="edit-date-input" />

          <label>Description</label>
          <textarea v-model="profile.description" placeholder="Description" class="edit-desc-textarea"></textarea>

          <h3>Personnalisation du fond</h3>
          <div class="edit-bg-row">
            <label>Couleur principale</label>
            <button
              v-for="color in mainColors"
              :key="color"
              :style="{ backgroundColor: color }"
              class="edit-color-btn"
              :class="{ selected: background.color_main === color }"
              type="button"
              @click="background.color_main = color"
            ></button>
          </div>
          <div class="edit-bg-row">
            <label>Couleur overlay</label>
            <button
              v-for="color in overlayColors"
              :key="color"
              :style="{ backgroundColor: color }"
              class="edit-color-btn"
              :class="{ selected: background.color_overlay === color }"
              type="button"
              @click="background.color_overlay = color"
            ></button>
          </div>
          <label>Image de fond</label>
          <input type="file" @change="onBackgroundImageChange" accept="image/*" class="edit-input-file" />

          <button type="submit" :disabled="loading" class="edit-submit-btn">Enregistrer</button>
          <div v-if="error" class="edit-error-msg">{{ error }}</div>
          <div v-if="success" class="edit-success-msg">{{ success }}</div>
        </form>
      </div>
    </section>
  </main>
  <div v-else>Chargement...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import '../assets/css/edit.css'

const apiUrl = 'https://relatives-remembered.onrender.com'

const route = useRoute()
const router = useRouter()
const profile = ref(null)
const background = ref({
  color_main: '#0f3b4b',
  color_overlay: '#00000080',
  background_url: ''
})
const loading = ref(false)
const error = ref('')
const success = ref('')
let imageFile = null
let bgImageFile = null

const mainColors = [
  '#0f3b4b', '#1a6d8f', '#355c7d', '#6c5b7b', '#355c3b', '#ffd700', '#e74c3c', '#222'
]
const overlayColors = [
  '#00000080', '#ffffff80', '#0f3b4b80', '#ffd70080', '#e74c3c80', '#355c7d80'
]

function formatYear(dateStr) {
  if (!dateStr) return ''
  return dateStr.length >= 4 ? dateStr.slice(0, 4) : dateStr
}

onMounted(async () => {
  try {
    const res = await fetch(`${apiUrl}/api/deceased/${route.params.id}`)
    if (!res.ok) throw new Error('Profil non trouvé')
    profile.value = await res.json()
    const bgRes = await fetch(`${apiUrl}/api/deceased/${route.params.id}/background`)
    if (bgRes.ok) {
      const bgData = await bgRes.json()
      Object.assign(background.value, bgData)
    }
  } catch (e) {
    error.value = e.message
  }
})

function onImageChange(e) {
  const file = e.target.files[0]
  if (file) imageFile = file
}

function onBackgroundImageChange(e) {
  const file = e.target.files[0]
  if (file) bgImageFile = file
}

async function submit() {
  loading.value = true
  error.value = ''
  success.value = ''
  try {
    const formData = new FormData()
    for (const key in profile.value) {
      formData.append(key, profile.value[key] ?? '')
    }
    if (imageFile) formData.append('image', imageFile)
    const res = await fetch(`${apiUrl}/api/deceased/${route.params.id}`, {
      method: 'PUT',
      body: formData
    })
    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || 'Erreur lors de la sauvegarde du profil')
    }
    const bgForm = new FormData()
    bgForm.append('color_main', background.value.color_main)
    bgForm.append('color_overlay', background.value.color_overlay)
    if (bgImageFile) bgForm.append('background', bgImageFile)
    const bgRes = await fetch(`${apiUrl}/api/deceased/${route.params.id}/background`, {
      method: 'PUT',
      body: bgForm
    })
    if (!bgRes.ok) {
      const data = await bgRes.json()
      throw new Error(data.error || 'Erreur lors de la sauvegarde du background')
    }
    success.value = 'Profil et personnalisation mis à jour avec succès !'
    setTimeout(() => router.push(`/template/${route.params.id}`), 1500)
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>
