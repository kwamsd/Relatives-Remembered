// frontend/src/services/authService.js
import { reactive } from 'vue'

const state = reactive({
  user: null,
  error: null,
  loading: false
})

const API = `${import.meta.env.VITE_API_URL}/auth`

async function fetchMe () {
  state.loading = true
  try {
    const res = await fetch(`${API}/me`, { credentials: 'include' })
    console.log('[fetchMe] status', res.status)           // <- ajoutez
    if (!res.ok) {
      state.user = null
    } else {
      state.user = await res.json()
      console.log('[fetchMe] user', state.user)           // <- ajoutez
    }
  } catch (e) {
    state.user = null
    console.error(e)
  } finally {
    state.loading = false
  }
}

async function login(email, password) {
  state.error = null
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mail: email, password })
  })
  if (!res.ok) {
    const { error } = await res.json()
    state.error = error || 'Erreur de connexion'
    throw new Error(state.error)
  }
  await fetchMe()
}

async function logout() {
  await fetch(`${API}/logout`, {
    method: 'POST',
    credentials: 'include'
  })
  state.user = null
}

async function register(user) {
  state.error = null
  const res = await fetch(`${API}/register`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
  if (!res.ok) {
    const payload = await res.json()
    state.error = payload.error || (payload.errors && payload.errors[0].msg) || 'Erreur'
    throw new Error(state.error)
  }
}

export const authService = {
  state,
  fetchMe,
  login,
  logout,
  register
}
