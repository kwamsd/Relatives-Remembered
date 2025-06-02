import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AboutUs from '../views/AboutUs.vue'
import List from '../views/List.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Dead from '../views/Dead-People.vue'
import Survey from '../views/Survey.vue'
import Donation from '../views/donation.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: AboutUs },
  { path: '/list', component: List },
  { path: '/login', component: Login},
  { path: '/signup', component: Signup},
  { path: '/dead-people', component: Dead},
  { path: '/survey', component: Survey},
  { path: '/donation', component: Donation}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
