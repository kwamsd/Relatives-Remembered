// src/router/index.js
import { createRouter, createWebHistory, RouterLink } from 'vue-router'
import { watch } from 'vue'
import { authService } from '../services/authService'

/* --------- views --------- */
import Home           from '../views/Home.vue'
import AboutGeneral   from '../views/About/AboutGeneral.vue'
import Contact        from '../views/About/Contacting.vue'
import WhoWeAre       from '../views/About/WhoWeAre.vue'
import Founder        from '../views/About/Founder.vue'
import List           from '../views/List.vue'
import Login          from '../views/Login.vue'
import Signup         from '../views/Signup.vue'
import Dead           from '../views/Dead-People.vue'
import Survey         from '../views/Survey.vue'
import Donation       from '../views/Donation.vue'
import MonEspace      from '../views/MonEspace/MonEspace.vue'
import UserInfo       from '../views/MonEspace/UserInfo.vue'
import MesDefunts     from '../views/MonEspace/MesDefunts.vue'
import NotFound       from '../views/NotFound.vue'

const routes = [
  { path: '/', component: Home, meta:{title:'Home | Relatives Remembered'} },

  /* -------- ABOUT -------- */
  { path: '/about', component: AboutGeneral, meta:{title:'About Us | Relatives Remembered'} },
  { path: '/about/contact', component: Contact, meta:{title:'Contact | Relatives Remembered'} },
  { path: '/about/who-we-are', component: WhoWeAre, meta:{title:'Who We Are | Relatives Remembered'} },
  { path: '/about/founder', component: Founder, meta:{title:'Our Founder | Relatives Remembered'} },

  /* -------- AUTRES PAGES -------- */
  { path: '/list',     component: List,   meta:{title:'List | Relatives Remembered'} },
  { path: '/login',    component: Login,  meta:{title:'Log In | Relatives Remembered'} },
  { path: '/signup',   component: Signup, meta:{title:'Sign Up | Relatives Remembered'} },
  { path: '/template', component: Dead,   meta:{title:'Tribute Template | Relatives Remembered'} },
  { path: '/template/:id', component: Dead, meta:{title:'Tribute | Relatives Remembered'} },
  { path: '/survey',   component: Survey, meta:{title:'Survey | Relatives Remembered', requiresAuth: true} },
  { path: '/donation', component: Donation, meta:{title:'Donation | Relatives Remembered'} },

  /* -------- MON ESPACE -------- */
  {
    path:'/my-space',
    component:MonEspace,
    meta:{title:'My Space | Relatives Remembered', requiresAuth:true},
    children:[
      { path:'infos',         component:UserInfo,   meta:{title:'My Info | Relatives Remembered'} },
      { path:'pages-created', component:MesDefunts, meta:{title:'My Memorials | Relatives Remembered'} }
    ]
  },

  /* -------- ÉDITION -------- */
  {
    path: '/edit-page/:id',
    component: () => import('../views/EditPage.vue'),
    meta:{title:'Modifier la page | Relatives Remembered', requiresAuth:true}
  },

  /* -------- CATCH-ALL 404 -------- */
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { title: 'Page introuvable | Relatives Remembered' }
  }
]

const router = createRouter({ history:createWebHistory(), routes })

/* ----- GUARD d’authentification ----- */
router.beforeEach(async (to, from, next) => {
  // attendre la fin d’un éventuel fetchMe au refresh
  if (authService.state.loading) {
    await new Promise(res => {
      const stop = watch(() => authService.state.loading, l => {
        if (!l) { stop(); res(); }
      })
    })
  }

  if (to.meta.requiresAuth && !authService.state.user) {
    next({ path:'/login', query:{ redirect: to.fullPath } })
  } else {
    next()
  }
})

/* ----- Mise à jour du <title> ----- */
router.afterEach(to => {
  const nearest = to.matched.slice().reverse().find(r => r.meta && r.meta.title)
  document.title = nearest ? nearest.meta.title : 'Relatives Remembered'
})

export default router
