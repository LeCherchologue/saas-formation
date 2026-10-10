import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import CoursesView from '../views/CoursesView.vue'
import CourseDetailView from '../views/CourseDetailView.vue'
import LearnPlayerView from '../views/LearnPlayerView.vue'
import CertificateView from '../views/CertificateView.vue'
import DashboardView from '../views/DashboardView.vue'
import PlansView from '../views/PlansView.vue'
import BusinessView from '../views/BusinessView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/courses',
    name: 'courses',
    component: CoursesView
  },
  {
    path: '/course/:slug',
    name: 'course-detail',
    component: CourseDetailView
  },
  {
    path: '/learn/:courseId',
    name: 'learn-player',
    component: LearnPlayerView
  },
  {
    path: '/verify',
    name: 'verify',
    component: CertificateView
  },
  {
    path: '/verify/:id',
    name: 'verify-detail',
    component: CertificateView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/plans',
    name: 'plans',
    component: PlansView
  },
  {
    path: '/businesses',
    name: 'businesses',
    component: BusinessView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
