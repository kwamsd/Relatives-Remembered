// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home        from '../views/Home.vue'
import AboutGeneral from '../views/About/AboutGeneral.vue'
import Contact      from '../views/About/Contacting.vue'
import WhoWeAre     from '../views/About/WhoWeAre.vue'
import Founder      from '../views/About/Founder.vue'
import List   from '../views/List.vue'
import Login  from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Dead   from '../views/Dead-People.vue'
import Survey from '../views/Survey.vue'
import Donation from '../views/donation.vue'
import MonEspace   from '../views/MonEspace/MonEspace.vue'
import UserInfo    from '../views/MonEspace/UserInfo.vue'
import MesDefunts  from '../views/MonEspace/MesDefunts.vue'
import { watch } from 'vue'
import { authService } from '../services/authService'

const routes = [
  { path: '/',            component: Home,      meta:{title:'Home | Relatives Remembered'} },

  /* -------- ABOUT & sous-pages -------- */
  { path: '/about', component: AboutGeneral,  meta:{title:'About Us | Relatives Remembered'} },
  { path: '/about/contact', component: Contact, meta:{title:'Contact | Relatives Remembered'} },
  { path: '/about/who-we-are', component: WhoWeAre, meta:{title:'Who We Are | Relatives Remembered'} },
  { path: '/about/founder', component: Founder, meta:{title:'Our Founder | Relatives Remembered'} },

  /* -------- reste inchangé -------- */
  { path: '/list',  component: List,   meta:{title:'List | Relatives Remembered'} },
  { path: '/login', component: Login,  meta:{title:'Log In | Relatives Remembered'} },
  { path: '/signup',component: Signup, meta:{title:'Sign Up | Relatives Remembered'} },
  { path: '/template', component: Dead, meta:{title:'Tribute Template | Relatives Remembered'} },
  { path: '/survey',   component: Survey, meta:{title:'Survey | Relatives Remembered', requiresAuth: true}, },
  { path: '/donation', component: Donation, meta:{title:'Donation | Relatives Remembered'} },
  {
    path:'/my-space', component:MonEspace, meta:{title:'My Space | Relatives Remembered'},
    children:[
      { path:'infos',         component:UserInfo,  meta:{title:'My Info | Relatives Remembered'} },
      { path:'pages-created', component:MesDefunts,meta:{title:'My Memorials | Relatives Remembered'} }
    ]
  }
]

const router = createRouter({ history:createWebHistory(), routes })

router.beforeEach(async (to, from, next) => {
  // 1. on attend que fetchMe ait fini si l’utilisateur a rechargé la page
  if (authService.state.loading) await new Promise(r => {
    const stop = watch(() => authService.state.loading, l => { if (!l){ stop(); r(); }});
  });

  // 2. on vérifie les pages protégées
  if (to.meta.requiresAuth && !authService.state.user) {
    next({ path: '/login', query: { redirect: to.fullPath } }); // redirige vers le login
  } else {
    next(); // autorisé
  }
});


router.afterEach(to=>{
  const nearest = to.matched.slice().reverse().find(r=>r.meta&&r.meta.title)
  document.title = nearest ? nearest.meta.title : 'Relatives Remembered'
})

export default router
