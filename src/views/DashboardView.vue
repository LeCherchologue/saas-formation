<template>
  <div class="dashboard">
    <!-- Bandeau -->
    <section class="dash-hero">
      <div class="container hero-inner">
        <div>
          <span class="badge badge-yellow">Espace apprenant</span>
          <h1>Bonjour {{ user ? user.firstName : '' }} 👋</h1>
          <p class="hero-sub">{{ user ? user.email : '' }} · Formations gratuites, certificat à {{ certifPrice }}</p>
        </div>
        <div class="hero-stats">
          <div class="h-stat"><strong>{{ inProgress.length }}</strong><span>en cours</span></div>
          <div class="h-stat"><strong>{{ finished.length }}</strong><span>terminée(s)</span></div>
          <div class="h-stat"><strong>{{ paidCerts.length }}</strong><span>certificat(s)</span></div>
        </div>
      </div>
    </section>

    <div class="container">
      <p v-if="error" class="form-error" role="alert">{{ error }}</p>

      <!-- Mes formations -->
      <section class="block" aria-labelledby="mes-formations">
        <div class="block-head">
          <h2 id="mes-formations">Mes formations</h2>
          <p>Reprenez là où vous vous êtes arrêté. Chaque étape se débloque après la précédente.</p>
        </div>

        <div v-if="!myCourses.length" class="empty clay">
          <span class="empty-ico"><icon-3d name="rocket" :size="56" /></span>
          <div>
            <h3>Vous n'avez commencé aucune formation</h3>
            <p>Choisissez une formation ci-dessous : elles sont toutes gratuites.</p>
          </div>
        </div>

        <div v-else class="my-grid">
          <article v-for="m in myCourses" :key="m.enrollmentId" class="my-card clay">
            <img :src="m.course.thumbnail" :alt="''" class="my-thumb" loading="lazy" />
            <div class="my-body">
              <span class="my-cat">{{ m.course.categoryLabel }}</span>
              <h3>{{ m.course.title }}</h3>
              <div class="progress-row">
                <div class="progress-track"><div class="progress-fill" :style="{ width: m.progress.percent + '%' }"></div></div>
                <span>{{ m.progress.percent }} %</span>
              </div>
              <p class="my-meta">{{ m.progress.done }} / {{ m.progress.total }} étapes · {{ m.course.hours }} h</p>

              <div class="my-actions">
                <template v-if="m.certification && m.certification.status === 'payee'">
                  <router-link :to="'/certificat/' + m.certification.numero" class="btn btn-primary btn-sm">
                    <app-icon name="award" :size="14" /> Mon certificat
                  </router-link>
                </template>
                <template v-else-if="m.certification && m.certification.status === 'en_attente_paiement'">
                  <button class="btn btn-accent btn-sm" @click="payFor = m.certification">
                    <app-icon name="credit-card" :size="14" /> Payer le certificat ({{ formatPrice(m.certification.price) }})
                  </button>
                </template>
                <router-link v-else :to="'/learn/' + m.course.slug" class="btn btn-primary btn-sm">
                  {{ m.progress.done ? 'Continuer' : 'Commencer' }} <app-icon name="arrow-right" :size="14" />
                </router-link>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Catalogue -->
      <section class="block" aria-labelledby="decouvrir">
        <div class="block-head">
          <h2 id="decouvrir">Toutes les formations</h2>
          <p>Accès libre et gratuit. Seule la certification finale est payante.</p>
        </div>
        <p v-if="catalogueStatus === 'loading'">Chargement du catalogue…</p>
        <p v-else-if="catalogueStatus === 'error'" class="form-error">{{ catalogueError }}</p>
        <div class="cat-grid">
          <article v-for="c in available" :key="c.id" class="cat-card clay">
            <img :src="c.thumbnail" alt="" class="cat-thumb" loading="lazy" />
            <div class="cat-body">
              <span v-if="c.badge" class="badge badge-yellow">{{ c.badge }}</span>
              <h3><router-link :to="'/course/' + c.slug">{{ c.title }}</router-link></h3>
              <p class="cat-meta">{{ c.modulesCount }} modules · {{ c.hours }} h · {{ c.level }}</p>
              <button class="btn btn-secondary btn-sm" :disabled="enrolling === c.slug" @click="start(c.slug)">
                {{ enrolling === c.slug ? 'Inscription…' : 'Commencer gratuitement' }}
              </button>
            </div>
          </article>
        </div>
      </section>

      <!-- Certificats -->
      <section class="block" aria-labelledby="mes-certificats">
        <div class="block-head">
          <h2 id="mes-certificats">Mes certificats</h2>
        </div>
        <p v-if="!certs.length" class="muted">Vos certificats apparaîtront ici à la fin de chaque formation.</p>
        <div v-for="c in certs" :key="c.id" class="cert-row clay">
          <span class="cert-ico"><icon-3d name="medal" :size="40" /></span>
          <div class="cert-meta">
            <h3>{{ c.courseTitle }}</h3>
            <p>N° <code>{{ c.numero }}</code> · {{ c.hours }} h · score {{ c.score }} %</p>
          </div>
          <router-link v-if="c.status === 'payee'" :to="'/certificat/' + c.numero" class="btn btn-primary btn-sm">
            <app-icon name="eye" :size="14" /> Voir
          </router-link>
          <button v-else class="btn btn-accent btn-sm" @click="payFor = c">
            Payer {{ formatPrice(c.price) }}
          </button>
        </div>
      </section>
    </div>

    <payment-modal v-if="payFor" :certification="payFor" @close="payFor = null" @paid="refresh" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import AppIcon from '../components/layout/AppIcon.vue'
import Icon3d from '../components/ui/Icon3d.vue'
import PaymentModal from '../components/payment/PaymentModal.vue'
import { Certification, Course, MyCourse, CertificateDetail } from '../api/types'
import { formatPrice } from '../utils/format'

export default defineComponent({
  name: 'DashboardView',
  components: { AppIcon, Icon3d, PaymentModal },
  setup () {
    const store = useStore()
    const router = useRouter()
    const error = ref('')
    const enrolling = ref('')
    const payFor = ref<Certification | null>(null)

    const user = computed(() => store.state.user)
    const myCourses = computed<MyCourse[]>(() => store.state.myCourses)
    const certs = computed<CertificateDetail[]>(() => store.state.myCertificates)
    const catalogueStatus = computed(() => store.state.catalogueStatus)
    const catalogueError = computed(() => store.state.catalogueError)
    const inProgress = computed(() => myCourses.value.filter(m => m.status !== 'terminee'))
    const finished = computed(() => myCourses.value.filter(m => m.status === 'terminee'))
    const paidCerts = computed(() => certs.value.filter(c => c.status === 'payee'))
    const available = computed<Course[]>(() => {
      const mine = new Set(myCourses.value.map(m => m.course.slug))
      return store.state.catalogue.filter((c: Course) => !mine.has(c.slug))
    })
    const certifPrice = computed(() => formatPrice(store.state.catalogue[0] ? store.state.catalogue[0].certificationPrice : 5100))

    const refresh = async () => {
      try { await store.dispatch('fetchMySpace') } catch (e: any) { error.value = e.message }
    }

    const start = async (slug: string) => {
      enrolling.value = slug
      error.value = ''
      try {
        await store.dispatch('enroll', slug)
        router.push('/learn/' + slug)
      } catch (e: any) {
        error.value = e.message
      } finally {
        enrolling.value = ''
      }
    }

    onMounted(() => {
      refresh()
      store.dispatch('fetchCatalogue')
    })

    return {
      user, myCourses, certs, inProgress, finished, paidCerts, available, catalogueStatus, catalogueError,
      certifPrice, error, enrolling, payFor, start, refresh, formatPrice
    }
  }
})
</script>

<style scoped lang="scss">
.dashboard { padding-bottom: 4rem; }

.dash-hero {
  --color-primary: #5eead4;
  --color-primary-ink: #5eead4;
  margin: 0 0.75rem 2.5rem;
  padding: 2.5rem 0;
  border-radius: 40px;
  background: linear-gradient(135deg, #0f766e 0%, #042f2e 100%);
  border: 4px solid rgba(255, 255, 255, 0.6);
  box-shadow: var(--shadow-xl), inset 0 4px 0 rgba(255, 255, 255, 0.08);
  color: #ffffff;
  h1 { color: #ffffff; font-size: clamp(1.8rem, 3.5vw, 2.6rem); margin: 0.75rem 0 0.4rem; }
}
.hero-inner { display: flex; justify-content: space-between; align-items: center; gap: 2rem; flex-wrap: wrap; }
.hero-sub { color: #cde7e3; }
.hero-stats { display: flex; gap: 1rem; flex-wrap: wrap; }
.h-stat {
  min-width: 120px; padding: 1rem 1.25rem; border-radius: var(--radius-lg); text-align: center;
  background: rgba(255, 255, 255, 0.08); border: 2px solid rgba(255, 255, 255, 0.14);
  box-shadow: inset 0 3px 0 rgba(255, 255, 255, 0.08);
  strong { display: block; font-family: var(--font-heading); font-weight: 900; font-size: 2rem; color: #5eead4; }
  span { font-size: 0.85rem; color: #cde7e3; }
}

.block { margin-bottom: 3rem; }
.block-head {
  margin-bottom: 1.25rem;
  h2 { font-size: 1.7rem; }
  p { color: var(--color-text-secondary); }
}
.muted { color: var(--color-text-muted); }

.empty { display: flex; align-items: center; gap: 1.25rem; padding: 1.5rem; }
.empty-ico, .cert-ico {
  flex-shrink: 0; width: 80px; height: 80px; border-radius: 24px; display: flex; align-items: center; justify-content: center;
  background: var(--pastel-lilac); box-shadow: var(--clay-inner);
}
.cert-ico { width: 60px; height: 60px; border-radius: 18px; background: var(--pastel-butter); }

.my-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }
.my-card { display: flex; gap: 1rem; padding: 1rem; }
.my-thumb { width: 96px; height: 96px; object-fit: cover; border-radius: 18px; flex-shrink: 0; }
.my-body { min-width: 0; flex: 1; h3 { font-size: 1.05rem; margin: 0.2rem 0 0.6rem; } }
.my-cat { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-primary-ink); }
.progress-row { display: flex; align-items: center; gap: 0.6rem; font-weight: 800; font-size: 0.85rem; }
.progress-track { flex: 1; height: 10px; border-radius: var(--radius-full); background: var(--color-surface-3); box-shadow: var(--shadow-pressed); overflow: hidden; }
.progress-fill { height: 100%; border-radius: var(--radius-full); background: var(--color-primary); }
.my-meta { font-size: 0.8rem; color: var(--color-text-muted); margin: 0.35rem 0 0.75rem; }
.my-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }

.cat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.25rem; }
.cat-card { overflow: hidden; display: flex; flex-direction: column; }
.cat-thumb { height: 130px; object-fit: cover; margin: 8px 8px 0; border-radius: 18px; background: var(--color-surface-3); }
.cat-body {
  padding: 1rem 1.25rem 1.25rem; display: grid; gap: 0.5rem; justify-items: start; flex: 1;
  h3 { font-size: 1rem; line-height: 1.35; }
  .btn { margin-top: auto; }
}
.cat-meta { font-size: 0.82rem; color: var(--color-text-muted); }

.cert-row { display: flex; align-items: center; gap: 1rem; padding: 1rem 1.25rem; margin-bottom: 0.75rem; flex-wrap: wrap; }
.cert-meta { flex: 1; min-width: 200px; h3 { font-size: 1.02rem; } p { font-size: 0.85rem; color: var(--color-text-muted); } }

.form-error { background: #fee2e2; color: #991b1b; border-radius: var(--radius-sm); padding: 0.75rem 1rem; font-weight: 600; margin-bottom: 1.5rem; }

@media (max-width: 560px) {
  .my-card { flex-direction: column; }
  .my-thumb { width: 100%; height: 140px; }
}
</style>
