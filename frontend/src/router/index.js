import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AboutUs from '../views/AboutUs.vue'
import List from '../views/List.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: AboutUs },
  { path: '/list', component: List }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
