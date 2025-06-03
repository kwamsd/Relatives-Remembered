// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { authService } from './services/authService'
// await authService.fetchMe()

const app = createApp(App)
app.config.globalProperties.$auth = authService  // injection
app.use(router).mount('#app')

// Charger l’état de connexion au démarrage
authService.fetchMe()
