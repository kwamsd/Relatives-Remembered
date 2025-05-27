import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AboutUs from '../views/AboutUs.vue'
import List from '../views/List.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: AboutUs },
  { path: '/list', component: List },
  { path: '/login', component: Login},
  { path: '/signup', component: Signup}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
