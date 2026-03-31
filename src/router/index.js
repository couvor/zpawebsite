import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Members from '../pages/Members.vue'
import Activities from '../pages/Activities.vue'
import Contact from '../pages/Contact.vue'
import Partners from '../pages/Partners.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },
    { path: '/members', name: 'members', component: Members },
    { path: '/activities', name: 'activities', component: Activities },
    { path: '/partners', name: 'partners', component: Partners },
    { path: '/contact', name: 'contact', component: Contact }
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

export default router
