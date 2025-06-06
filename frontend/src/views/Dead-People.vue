<template>
  <main class="dead-main" v-if="profile" :style="backgroundStyle">
    <section class="left-section">
      <div class="photo-frame">
        <img
          v-if="profile.image_url"
          :src="profile.image_url.startsWith('http') ? profile.image_url : apiUrl + profile.image_url"
          :alt="'Portrait of ' + profile.firstname + ' ' + profile.lastname"
        />
        <div v-else class="photo-placeholder">No Photo</div>
      </div>
      <div class="identity-card"
           :style="{ backgroundColor: mainColor38, borderColor: mainColor }">
        <p>
          <span style="font-weight: 300; font-size: 16px;">{{ profile.firstname }}</span>
          <strong>{{ profile.lastname }}</strong>
        </p>
        <p>{{ formatYear(profile.birth) }} — {{ formatYear(profile.death) }}</p>
      </div>
      <div class="details-box">
        <p><strong>Full Name:</strong> {{ profile.firstname }} {{ profile.second_name }} {{ profile.third_name }} {{ profile.lastname }}</p>
        <p v-if="profile.job"><strong>Job:</strong> {{ profile.job }}</p>
        <p v-if="profile.nationality"><strong>Nationality:</strong> {{ profile.nationality }}</p>
        <p v-if="profile.gender"><strong>Gender:</strong> {{ profile.gender }}</p>
      </div>
      <button
        v-if="isOwner"
        class="edit-page-btn"
        @click="router.push(`/edit-page/${profile.id}`)"
      >
        Edit the page
      </button>
    </section>

    <section class="right-section">
      <div class="description-box">
        <p>{{ profile.description }}</p>
      </div>

      <div class="anecdotes-box" :style="{ backgroundColor: mainColor }">
        <h3>Anecdotes</h3>
        <ul v-if="anecdotes.length">
          <li v-for="anecdote in anecdotes" :key="anecdote.id">
            <strong>{{ anecdote.firstname }}:</strong> {{ anecdote.content }}
          </li>
        </ul>
        <div v-else class="no-anecdote">No anecdotes yet.</div>
      </div>

      <div class="submit-anecdote-box" :style="{ background: mainColor }">
        <h4>Share your anecdote</h4>
        <form @submit.prevent="submitAnecdote">
          <input
            v-model="anecdoteFirstname"
            placeholder="Your first name"
            required
            maxlength="50"
          />
          <textarea
            v-model="anecdoteContent"
            placeholder="Your anecdote"
            required
            maxlength="500"
          ></textarea>
          <button type="submit" :disabled="anecdoteLoading">Send</button>
        </form>
        <div v-if="anecdoteSuccess" class="success-msg">{{ anecdoteSuccess }}</div>
        <div v-if="anecdoteError" class="error-msg">{{ anecdoteError }}</div>
      </div>
    </section>
  </main>
  <div v-else class="loading-msg">Loading profile...</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authService as $auth } from '../services/authService.js'
import '../assets/css/dead.css'
import { apiUrl } from '@/config/api'



const route = useRoute()
const router = useRouter()
const profile = ref(null)
const anecdotes = ref([])
const anecdoteFirstname = ref('')
const anecdoteContent = ref('')
const anecdoteSuccess = ref('')
const anecdoteError = ref('')
const anecdoteLoading = ref(false)
const background = ref(null)

 // ---------- COULEURS DYNAMIQUES ----------
const mainColor = computed(() =>
  background.value?.color_main || '#0f3b4b'
)
// 38 % d’opacité : #RRGGBB + 61
const mainColor38 = computed(() =>
  mainColor.value.length === 7 ? `${mainColor.value}61` : mainColor.value
)

const isOwner = computed(() =>
  $auth.state.user && profile.value && $auth.state.user.id === profile.value.id_user
)

function formatYear(dateStr) {
  if (!dateStr) return ''
  return dateStr.length >= 4 ? dateStr.slice(0, 4) : dateStr
}

async function fetchProfile() {
  try {
    const res = await fetch(`${apiUrl}/api/deceased/${route.params.id}`)
    if (!res.ok) throw new Error('Profile not found')
    profile.value = await res.json()
  } catch (e) {
    profile.value = null
  }
}

async function fetchAnecdotes() {
  try {
    const res = await fetch(`${apiUrl}/api/deceased/${route.params.id}/anecdotes`)
    anecdotes.value = res.ok ? await res.json() : []
  } catch (e) {
    anecdotes.value = []
  }
}

async function submitAnecdote() {
  anecdoteError.value = ''
  anecdoteSuccess.value = ''
  anecdoteLoading.value = true
  try {
    const res = await fetch(`${apiUrl}/api/deceased/${route.params.id}/anecdotes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: anecdoteFirstname.value,
        content: anecdoteContent.value
      })
    })
    if (!res.ok) {
      const data = await res.json()
      anecdoteError.value = data.error || 'Error submitting anecdote'
    } else {
      anecdoteSuccess.value = 'Anecdote submitted! (pending approval)'
      anecdoteFirstname.value = ''
      anecdoteContent.value = ''
    }
  } catch (e) {
    anecdoteError.value = 'Network error'
  } finally {
    anecdoteLoading.value = false
  }
}

async function fetchBackground() {
  try {
    const res = await fetch(`${apiUrl}/api/deceased/${route.params.id}/background`)
    if (res.ok) background.value = await res.json()
  } catch (e) {
    background.value = null
  }
}

const backgroundStyle = computed(() => {
  if (!background.value) return {}
  let style = {}
  if (background.value.background_url) {
    const url = background.value.background_url.startsWith('http')
      ? background.value.background_url
      : apiUrl + background.value.background_url
    style.backgroundImage = `url('${url}')`
    style.backgroundSize = 'cover'
    style.backgroundPosition = 'center'
  }
  if (mainColor.value) style.backgroundColor = mainColor.value
  if (background.value.color_overlay) {
    style.boxShadow = `inset 0 0 0 100vw ${background.value.color_overlay}80`
  }
  return style
})

onMounted(() => {
  fetchProfile()
  fetchAnecdotes()
  fetchBackground()
})
</script>
