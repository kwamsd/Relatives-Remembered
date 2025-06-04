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
      
      <!-- ---- Couleurs ---- -->
      <div class="color-field">
        <label class="form-label" for="color_main">
          Main colour&nbsp;(<span>{{ color_main }}</span>)
        </label>
        <input type="color" id="color_main" v-model="color_main" />
        <span class="swatch" :style="{ background: color_main }"></span>
      </div>

      <div class="color-field">
        <label class="form-label" for="color_overlay">
          Overlay colour&nbsp;(<span>{{ color_overlay }}</span>)
        </label>
        <input type="color" id="color_overlay" v-model="color_overlay" />
        <span class="swatch" :style="{ background: color_overlay }"></span>
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

/* ---------- champs existants ---------- */
const firstname = ref(''); const lastname = ref('');
const second_name = ref(''); const third_name = ref('');
const birth = ref(''); const death = ref('');
const job = ref(''); const nationality = ref('');
const gender = ref(''); const description = ref('');
const file = ref(null);

/* ---------- NOUVEAU : couleurs ---------- */
const color_main = ref('#0f3b4b');  // valeur par défaut
const color_overlay = ref('#0f3b4b');

const loading = ref(false)
const success = ref('')
const error = ref('')

const router = useRouter()

function handleFile(e) { file.value = e.target.files[0] }

/* ---------- SUBMIT ---------- */
async function handleSubmit() {
  error.value = ''; success.value = ''; loading.value = true

  if (!$auth.state.user) {
    error.value = 'Vous devez être connecté pour créer une page.'; loading.value = false; return
  }

  try {
    /* 1) Crée le profil ---------------------------- */
    const fd = new FormData()
    fd.append('firstname', firstname.value); fd.append('lastname', lastname.value)
    fd.append('second_name', second_name.value); fd.append('third_name', third_name.value)
    fd.append('birth', birth.value); fd.append('death', death.value)
    fd.append('job', job.value); fd.append('nationality', nationality.value)
    fd.append('gender', gender.value); fd.append('description', description.value)
    if (file.value) fd.append('photo', file.value)

    const res = await fetch('http://localhost:3000/api/deceased', {
      method: 'POST', credentials: 'include', body: fd
    })
    if (!res.ok) {
      const data = await res.json(); error.value = data.error || 'Erreur lors de la création'
      return
    }
    const created = await res.json()

    /* 2) Enregistre les couleurs ------------------- */
    const bgData = new FormData()
    bgData.append('color_main', color_main.value)
    bgData.append('color_overlay', color_overlay.value)

    await fetch(`http://localhost:3000/api/deceased/${created.id}/background`, {
      method: 'PUT',
      credentials: 'include',
      body: bgData         // aucune image ici
    })

    /* 3) OK --------------------------------------- */
    success.value = 'Page créée avec succès !'
    router.push(`/template/${created.id}`)
  } catch (e) {
    console.error(e); error.value = 'Erreur réseau'
  } finally {
    loading.value = false
  }
}
</script>