import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store'

// meta.auth  : connexion obligatoire
// meta.admin : réservé à l'administrateur
// meta.guest : page de connexion (inutile si déjà connecté)
const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue') },
  { path: '/courses', name: 'courses', component: () => import(/* webpackChunkName: "courses" */ '../views/CoursesView.vue') },
  { path: '/course/:slug', name: 'course-detail', component: () => import(/* webpackChunkName: "coursedetail" */ '../views/CourseDetailView.vue') },
  { path: '/plans', name: 'plans', component: () => import(/* webpackChunkName: "plans" */ '../views/PlansView.vue') },
  { path: '/businesses', name: 'businesses', component: () => import(/* webpackChunkName: "business" */ '../views/BusinessView.vue') },

  { path: '/connexion', name: 'login', meta: { guest: true }, component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue') },

  { path: '/espace', name: 'dashboard', meta: { auth: true }, component: () => import(/* webpackChunkName: "dashboard" */ '../views/DashboardView.vue') },
  { path: '/dashboard', redirect: '/espace' },
  { path: '/learn/:slug', name: 'learn-player', meta: { auth: true }, component: () => import(/* webpackChunkName: "learnplayer" */ '../views/LearnPlayerView.vue') },
  { path: '/certificat/:numero', name: 'certificate', meta: { auth: true }, component: () => import(/* webpackChunkName: "certificate" */ '../views/CertificateView.vue') },

  { path: '/admin', name: 'admin', meta: { auth: true, admin: true }, component: () => import(/* webpackChunkName: "admin" */ '../views/AdminView.vue') },
  // l'ancienne page publique de vérification est désormais réservée à l'admin
  { path: '/verify', redirect: '/admin' },
  { path: '/verify/:id', redirect: (to: any) => ({ path: '/admin', query: { numero: String(to.params.id) } }) },

  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior () {
    return { top: 0 }
  }
})

// vue-router 4.6 publie ses types en .d.mts, que TypeScript 4.5 ne sait pas lire :
// on type le garde à la main en attendant une mise à jour de TypeScript.
type RouteGuardTarget = { fullPath: string; meta: Record<string, unknown> }
;(router as any).beforeEach(async (to: RouteGuardTarget) => {
  await store.dispatch('init')
  const loggedIn = store.getters.isAuthenticated
  if (to.meta.auth && !loggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.meta.admin && !store.getters.isAdmin) {
    return { name: 'dashboard' }
  }
  if (to.meta.guest && loggedIn) {
    return store.getters.isAdmin ? { name: 'admin' } : { name: 'dashboard' }
  }
  return true
})

export default router
