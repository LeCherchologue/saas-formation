import { createStore } from 'vuex'
import { Course, MyCourse, CertificateDetail, User } from '../api/types'
import { authApi, catalogueApi, learningApi } from '../api'
import { getToken, setToken, setUnauthorizedHandler } from '../api/client'

export interface State {
  token: string | null
  user: User | null
  ready: boolean               // session initialisée (jeton vérifié)
  catalogue: Course[]
  catalogueStatus: 'idle' | 'loading' | 'ok' | 'error'
  catalogueError: string
  myCourses: MyCourse[]
  myCertificates: CertificateDetail[]
  currentSearchQuery: string
  selectedLanguage: 'fr' | 'en' | 'es'
}

const LANG_KEY = 'debugger_lang'

function savedLanguage (): 'fr' | 'en' | 'es' {
  try {
    const v = localStorage.getItem(LANG_KEY)
    if (v === 'fr' || v === 'en' || v === 'es') return v
  } catch (e) { /* ignoré */ }
  return 'fr'
}

const store = createStore<State>({
  state: {
    token: getToken(),
    user: null,
    ready: false,
    catalogue: [],
    catalogueStatus: 'idle',
    catalogueError: '',
    myCourses: [],
    myCertificates: [],
    currentSearchQuery: '',
    selectedLanguage: savedLanguage()
  },

  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => !!state.user && state.user.role === 'admin',
    currentUser: (state) => state.user,
    courseBySlug: (state) => (slug: string) => state.catalogue.find(c => c.slug === slug),
    myCourseBySlug: (state) => (slug: string) => state.myCourses.find(m => m.course.slug === slug),
    searchQuery: (state) => state.currentSearchQuery
  },

  mutations: {
    SET_TOKEN (state, token: string | null) {
      state.token = token
      setToken(token)
    },
    SET_USER (state, user: User | null) { state.user = user },
    SET_READY (state) { state.ready = true },
    SET_CATALOGUE (state, list: Course[]) { state.catalogue = list },
    SET_CATALOGUE_STATUS (state, { status, error }: { status: State['catalogueStatus']; error?: string }) {
      state.catalogueStatus = status
      state.catalogueError = error || ''
    },
    SET_MY_COURSES (state, list: MyCourse[]) { state.myCourses = list },
    SET_MY_CERTIFICATES (state, list: CertificateDetail[]) { state.myCertificates = list },
    SET_SEARCH_QUERY (state, query: string) { state.currentSearchQuery = query },
    SET_LANGUAGE (state, lang: 'fr' | 'en' | 'es') {
      state.selectedLanguage = lang
      try { localStorage.setItem(LANG_KEY, lang) } catch (e) { /* ignoré */ }
    },
    RESET_SESSION (state) {
      state.token = null
      state.user = null
      state.myCourses = []
      state.myCertificates = []
      setToken(null)
    }
  },

  actions: {
    // Appelé une fois au démarrage (et par le garde du routeur) : vérifie le jeton enregistré.
    async init ({ state, commit, dispatch }) {
      if (state.ready) return
      if (state.token) {
        try {
          commit('SET_USER', await authApi.me())
          await dispatch('fetchMySpace')
        } catch (e) {
          commit('RESET_SESSION')
        }
      }
      commit('SET_READY')
    },

    async login ({ commit, dispatch }, { email, password }: { email: string; password: string }) {
      const token = await authApi.login(email, password)
      commit('SET_TOKEN', token)
      commit('SET_USER', await authApi.me())
      await dispatch('fetchMySpace')
    },

    async register ({ dispatch }, data: { prenom: string; nom: string; email: string; password: string }) {
      await authApi.register({ prenom: data.prenom, nom: data.nom, email: data.email, mot_de_passe: data.password })
      await dispatch('login', { email: data.email, password: data.password })
    },

    logout ({ commit }) {
      commit('RESET_SESSION')
    },

    async fetchCatalogue ({ state, commit }, force = false) {
      if (state.catalogueStatus === 'ok' && !force) return
      commit('SET_CATALOGUE_STATUS', { status: 'loading' })
      try {
        commit('SET_CATALOGUE', await catalogueApi.list())
        commit('SET_CATALOGUE_STATUS', { status: 'ok' })
      } catch (e: any) {
        commit('SET_CATALOGUE_STATUS', { status: 'error', error: e.message })
      }
    },

    // Formations suivies + certificats de l'utilisateur connecté (admin : pas d'espace apprenant)
    async fetchMySpace ({ state, commit }) {
      if (!state.user) return
      const [courses, certs] = await Promise.all([learningApi.myCourses(), learningApi.myCertificates()])
      commit('SET_MY_COURSES', courses)
      commit('SET_MY_CERTIFICATES', certs)
    },

    async enroll ({ dispatch }, slug: string) {
      await learningApi.enroll(slug)
      await dispatch('fetchMySpace')
    }
  }
})

// Jeton expiré ou révoqué : on ferme la session.
setUnauthorizedHandler(() => store.commit('RESET_SESSION'))

export default store
