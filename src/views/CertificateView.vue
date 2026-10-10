<template>
  <div class="verify-page">
    <div class="verify-hero no-print">
      <div class="container">
        <span class="badge badge-yellow">Portail de Certification</span>
        <h1>Vérification Officielle de Certificat</h1>
        <p>Vérifiez en temps réel l'authenticité d'un diplôme émis par la plateforme Debugger.</p>

        <!-- Search input for cert ID -->
        <div class="verify-search-box">
          <app-icon name="search" :size="16" class="search-ico" />
          <input
            type="text"
            placeholder="Entrez l'identifiant (ex: DBG-2026-7491-FR)"
            v-model="inputCertId"
            @keyup.enter="lookupCert"
          />
          <button class="btn btn-accent" @click="lookupCert">
            Vérifier le diplôme
          </button>
        </div>

        <div class="sample-pills">
          <span>Certificats exemples :</span>
          <button
            v-for="c in sampleCertIds"
            :key="c"
            class="pill-link"
            @click="loadSample(c)"
          >
            {{ c }}
          </button>
        </div>
      </div>
    </div>

    <div class="container cert-render-area">
      <!-- Certificate Found & Valid -->
      <div v-if="currentCert" class="cert-found-wrapper">
        <certificate-doc :certificate="currentCert" />
      </div>

      <!-- Not Found State -->
      <div v-else-if="searched && !currentCert" class="cert-not-found-card animate-fade-in no-print">
        <div class="not-found-icon"><app-icon name="alert-triangle" :size="32" /></div>
        <h3>Certificat introuvable</h3>
        <p>L'identifiant « <strong>{{ lastSearchedId }}</strong> » ne correspond à aucun certificat émis sur Debugger.</p>
        <button class="btn btn-secondary" @click="loadSample('DBG-2026-7491-FR')">
          Charger le certificat de démonstration
        </button>
      </div>

      <!-- Default Prompt if no search yet -->
      <div v-else-if="!currentCert" class="default-prompt no-print">
        <div class="prompt-card">
          <div class="prompt-icon"><app-icon name="shield-check" :size="30" /></div>
          <h3>Comment fonctionne la vérification Debugger ?</h3>
          <p>
            Chaque formation terminée avec succès génère un diplôme scellé avec un identifiant cryptographique unique.
            Les départements RH, employeurs et universités peuvent s'assurer de la validité des compétences et du volume d'heures réelles effectuées.
          </p>
          <button class="btn btn-primary" @click="loadSample('DBG-2026-7491-FR')">
            Voir un exemple officiel vérifié
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import CertificateDoc from '../components/certificate/CertificateDoc.vue'
import AppIcon from '../components/layout/AppIcon.vue'
import { CertificateRecord } from '../store'

export default defineComponent({
  name: 'CertificateView',
  components: {
    CertificateDoc,
    AppIcon
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const inputCertId = ref('')
    const searched = ref(false)
    const lastSearchedId = ref('')
    const currentCert = ref<CertificateRecord | null>(null)

    const sampleCertIds = computed(() => {
      const list = Object.keys(store.state.certificates || {})
      return list.length ? list : ['DBG-2026-7491-FR']
    })

    const checkId = (id: string) => {
      if (!id) return
      searched.value = true
      lastSearchedId.value = id
      const cert = store.getters.getCertificateById(id)
      if (cert) {
        currentCert.value = cert
      } else {
        // Fallback demo certificate if user types something like DBG-DEMO
        currentCert.value = null
      }
    }

    onMounted(() => {
      const routeId = route.params.id || route.query.id
      if (routeId) {
        inputCertId.value = String(routeId)
        checkId(String(routeId))
      } else {
        // Load default if available
        const defaultId = sampleCertIds.value[0]
        if (defaultId) {
          inputCertId.value = defaultId
          checkId(defaultId)
        }
      }
    })

    watch(() => route.params.id, (newId) => {
      if (newId) {
        inputCertId.value = String(newId)
        checkId(String(newId))
      }
    })

    const lookupCert = () => {
      if (!inputCertId.value.trim()) return
      router.push(`/verify/${inputCertId.value.trim()}`)
      checkId(inputCertId.value.trim())
    }

    const loadSample = (id: string) => {
      inputCertId.value = id
      lookupCert()
    }

    return {
      inputCertId,
      searched,
      lastSearchedId,
      currentCert,
      sampleCertIds,
      lookupCert,
      loadSample
    }
  }
})
</script>

<style scoped lang="scss">
.verify-page {
  padding-bottom: 5rem;
}

.verify-hero {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 3.5rem 0 3rem 0;
  text-align: center;

  h1 {
    font-size: 2.6rem;
    color: var(--color-text);
    margin: 0.75rem 0 0.5rem 0;
  }

  p {
    color: var(--color-text-secondary);
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
}

.verify-search-box {
  max-width: 580px;
  margin: 0 auto 1.5rem auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  padding: 0.35rem 0.35rem 0.35rem 1.5rem;
  box-shadow: var(--shadow-lg);

  .search-ico { color: var(--color-text-muted); flex-shrink: 0; }

  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 1rem;
    color: var(--color-text);

    &::placeholder { color: var(--color-text-muted); }
  }
}

.sample-pills {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: var(--color-text-muted);
  flex-wrap: wrap;

  .pill-link {
    background-color: var(--color-surface-2);
    border: 1px solid var(--color-border);
    color: var(--color-primary);
    padding: 0.2rem 0.65rem;
    border-radius: var(--radius-full);
    font-family: var(--font-mono);
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--color-primary-light);
      border-color: var(--color-primary);
    }
  }
}

.cert-render-area {
  margin-top: 2.5rem;
}

.cert-not-found-card {
  text-align: center;
  background-color: var(--color-surface-2);
  border: 1px solid rgba(248, 113, 113, 0.3);
  border-radius: var(--radius-xl);
  padding: 3.5rem 2rem;
  max-width: 600px;
  margin: 0 auto;

  .not-found-icon {
    color: var(--color-error);
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
  }

  h3 {
    font-size: 1.5rem;
    color: var(--color-error);
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--color-text-secondary);
    margin-bottom: 1.5rem;
  }
}

.default-prompt {
  max-width: 680px;
  margin: 2rem auto;
  text-align: center;

  .prompt-card {
    background-color: var(--color-surface-2);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: 3rem 2rem;

    .prompt-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto 1.25rem auto;
      background-color: var(--color-primary-light);
      border: 1px solid var(--color-border-medium);
      border-radius: var(--radius-md);
      color: var(--color-primary);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h3 {
      font-size: 1.4rem;
      color: var(--color-text);
      margin-bottom: 0.75rem;
    }

    p {
      color: var(--color-text-secondary);
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
  }
}
</style>
