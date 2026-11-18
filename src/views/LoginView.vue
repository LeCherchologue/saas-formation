<template>
  <div class="auth-page">
    <div class="container auth-inner">
      <!-- Argumentaire -->
      <aside class="auth-pitch">
        <span class="badge badge-green">Formations 100 % gratuites</span>
        <h1>Votre espace de formation vous attend.</h1>
        <p>Créez votre compte en une minute, suivez les formations étape par étape, puis obtenez votre certificat officiel.</p>
        <ul class="pitch-list">
          <li><span class="pitch-ico"><icon-3d name="notebook" :size="36" /></span>Toutes les formations du catalogue en accès libre</li>
          <li><span class="pitch-ico p-sky"><icon-3d name="target" :size="36" /></span>Un parcours guidé : leçons, quiz et exercices de code</li>
          <li><span class="pitch-ico p-butter"><icon-3d name="medal" :size="36" /></span>Certificat à {{ prixCertif }}, payable par Airtel Money, Moov Money ou Visa</li>
        </ul>
      </aside>

      <!-- Formulaire -->
      <section class="auth-card clay" aria-labelledby="auth-title">
        <div class="tabs" role="tablist">
          <button role="tab" :aria-selected="mode === 'login'" :class="{ active: mode === 'login' }" @click="setMode('login')">Se connecter</button>
          <button role="tab" :aria-selected="mode === 'register'" :class="{ active: mode === 'register' }" @click="setMode('register')">Créer un compte</button>
        </div>

        <h2 id="auth-title">{{ mode === 'login' ? 'Bon retour parmi nous' : 'Créer mon compte apprenant' }}</h2>

        <form @submit.prevent="submit" novalidate>
          <div v-if="mode === 'register'" class="row-2">
            <div class="field">
              <label for="prenom">Prénom</label>
              <input id="prenom" v-model.trim="form.prenom" class="clay-input" autocomplete="given-name" required />
            </div>
            <div class="field">
              <label for="nom">Nom</label>
              <input id="nom" v-model.trim="form.nom" class="clay-input" autocomplete="family-name" required />
            </div>
          </div>

          <div class="field">
            <label for="email">Adresse email</label>
            <input id="email" v-model.trim="form.email" type="email" class="clay-input" autocomplete="email" required />
          </div>

          <div class="field">
            <label for="password">Mot de passe</label>
            <input id="password" v-model="form.password" type="password" class="clay-input"
                   :autocomplete="mode === 'login' ? 'current-password' : 'new-password'" required
                   :aria-describedby="mode === 'register' ? 'pwd-help' : undefined" />
            <small v-if="mode === 'register'" id="pwd-help" class="help">8 caractères minimum.</small>
          </div>

          <p v-if="error" class="form-error" role="alert">{{ error }}</p>

          <button type="submit" class="btn btn-primary btn-block btn-lg" :disabled="loading">
            {{ loading ? 'Patientez…' : (mode === 'login' ? 'Se connecter' : 'Créer mon compte') }}
          </button>
        </form>

        <p class="switch">
          <template v-if="mode === 'login'">Pas encore de compte ? <button class="link" @click="setMode('register')">Inscrivez-vous gratuitement</button></template>
          <template v-else>Déjà inscrit ? <button class="link" @click="setMode('login')">Connectez-vous</button></template>
        </p>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import Icon3d from '../components/ui/Icon3d.vue'
import { formatPrice } from '../utils/format'

export default defineComponent({
  name: 'LoginView',
  components: { Icon3d },
  setup () {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const mode = ref<'login' | 'register'>(route.query.mode === 'register' ? 'register' : 'login')
    const form = reactive({ prenom: '', nom: '', email: '', password: '' })
    const error = ref('')
    const loading = ref(false)

    const prixCertif = computed(() => {
      const c = store.state.catalogue[0]
      return formatPrice(c ? c.certificationPrice : 5100)
    })

    const setMode = (m: 'login' | 'register') => { mode.value = m; error.value = '' }

    const validate = (): string => {
      if (mode.value === 'register' && (!form.prenom || !form.nom)) return 'Indiquez votre prénom et votre nom.'
      if (!/^\S+@\S+\.\S+$/.test(form.email)) return 'Adresse email invalide.'
      if (mode.value === 'register' && form.password.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères.'
      if (!form.password) return 'Saisissez votre mot de passe.'
      return ''
    }

    const submit = async () => {
      error.value = validate()
      if (error.value) return
      loading.value = true
      try {
        if (mode.value === 'login') {
          await store.dispatch('login', { email: form.email, password: form.password })
        } else {
          await store.dispatch('register', { ...form })
        }
        const redirect = typeof route.query.redirect === 'string' && route.query.redirect.startsWith('/') ? route.query.redirect : ''
        router.replace(redirect || (store.getters.isAdmin ? '/admin' : '/espace'))
      } catch (e: any) {
        error.value = e.message
      } finally {
        loading.value = false
      }
    }

    return { mode, form, error, loading, submit, setMode, prixCertif }
  }
})
</script>

<style scoped lang="scss">
.auth-page { padding: 3rem 0 5rem; }
.auth-inner {
  display: grid;
  grid-template-columns: 1fr 460px;
  gap: 4rem;
  align-items: center;
}

.auth-pitch {
  h1 { font-size: clamp(2rem, 4vw, 3rem); margin: 1rem 0; text-wrap: balance; }
  p { color: var(--color-text-secondary); font-size: 1.1rem; max-width: 520px; }
}
.pitch-list {
  list-style: none;
  margin-top: 2rem;
  display: grid;
  gap: 1rem;
  li { display: flex; align-items: center; gap: 1rem; font-weight: 600; }
}
.pitch-ico {
  width: 56px; height: 56px; border-radius: 18px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: var(--pastel-mint); box-shadow: var(--clay-inner), 3px 4px 10px rgba(19, 78, 74, 0.08);
  &.p-sky { background: var(--pastel-sky); }
  &.p-butter { background: var(--pastel-butter); }
}

.auth-card {
  padding: 2rem;
  border-width: 4px;
  box-shadow: var(--shadow-xl);
  h2 { font-size: 1.4rem; margin: 1.5rem 0 1.25rem; }
}
.tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  padding: 6px;
  background: var(--color-surface-3);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-pressed);
  button {
    min-height: 44px;
    border-radius: 12px;
    font-family: var(--font-heading);
    font-weight: 800;
    color: var(--color-text-secondary);
    transition: background-color 0.2s ease, color 0.2s ease;
    &.active { background: var(--color-surface); color: var(--color-primary-ink); box-shadow: var(--shadow-sm); }
  }
}
form { display: grid; gap: 1rem; }
.row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.field {
  display: grid;
  gap: 0.35rem;
  label { font-weight: 700; font-size: 0.9rem; }
  input { min-height: 48px; padding: 0 1rem; font-size: 1rem; }
}
.help { color: var(--color-text-muted); font-size: 0.82rem; }
.form-error {
  background: #fee2e2;
  color: #991b1b;
  border-radius: var(--radius-sm);
  padding: 0.6rem 0.9rem;
  font-weight: 600;
  font-size: 0.9rem;
}
.switch {
  margin-top: 1.25rem;
  text-align: center;
  color: var(--color-text-secondary);
  font-size: 0.92rem;
}
.link { color: var(--color-primary-ink); font-weight: 700; text-decoration: underline; text-underline-offset: 3px; }

@media (max-width: 900px) {
  .auth-inner { grid-template-columns: 1fr; gap: 2rem; }
  .auth-pitch { order: 2; }
}
@media (max-width: 480px) {
  .row-2 { grid-template-columns: 1fr; }
  .auth-card { padding: 1.5rem; }
}
</style>
