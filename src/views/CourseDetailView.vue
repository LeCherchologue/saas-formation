<template>
  <div v-if="course" class="course-detail-page">
    <!-- Bandeau -->
    <section class="detail-hero">
      <div class="container hero-inner">
        <div class="hero-left-info">
          <div class="breadcrumb-trail">
            <router-link to="/courses">Catalogue</router-link>
            <span>›</span>
            <span>{{ course.categoryLabel }}</span>
          </div>

          <span v-if="course.badge" class="badge badge-yellow">{{ course.badge }}</span>

          <h1 class="detail-title">{{ course.title }}</h1>
          <p class="detail-tagline">{{ course.tagline }}</p>

          <div class="meta-stats-row">
            <div v-if="course.reviewsCount" class="rating-badge">
              <app-icon name="star" :size="14" filled class="star" />
              <strong>{{ course.rating }}</strong>
              <span>({{ course.reviewsCount }} avis)</span>
            </div>
            <div class="meta-item">
              <app-icon name="users" :size="14" />
              <strong>{{ course.enrolledCount.toLocaleString('fr-FR') }}</strong> apprenants inscrits
            </div>
            <div class="meta-item">
              <app-icon name="bar-chart" :size="14" />
              Niveau : <strong>{{ course.level }}</strong>
            </div>
            <div class="meta-item">
              <app-icon name="clock" :size="14" />
              <strong>{{ course.hours }} h</strong> de formation
            </div>
          </div>

          <div class="instructor-preview">
            <img :src="course.instructor.avatar" alt="" class="inst-avatar" />
            <div class="inst-text">
              <span class="inst-name">Formateur : {{ course.instructor.name }}</span>
              <span class="inst-role">{{ instructorRole }}</span>
            </div>
          </div>
        </div>

        <!-- Carte d'inscription -->
        <div class="hero-right-card">
          <div class="pricing-floating-card">
            <img :src="course.thumbnail" alt="" class="card-thumb" />

            <div class="card-p-body">
              <div class="price-header">
                <span class="free-label">Formation gratuite</span>
                <span class="price-main">0 FCFA <small>accès complet</small></span>
              </div>

              <div class="features-checklist">
                <div class="f-item"><app-icon name="check" :size="16" class="ico-yes" /> {{ course.modulesCount }} modules · {{ course.stepsCount }} étapes guidées</div>
                <div class="f-item"><app-icon name="check" :size="16" class="ico-yes" /> Quiz corrigés pour valider chaque module</div>
                <div v-if="course.assignmentsCount" class="f-item"><app-icon name="check" :size="16" class="ico-yes" /> {{ course.assignmentsCount }} dépôts de code, dont le projet final</div>
                <div class="f-item"><app-icon name="check" :size="16" class="ico-yes" /> Certificat officiel : {{ certifPrice }} en fin de parcours</div>
              </div>

              <p v-if="error" class="enroll-error" role="alert">{{ error }}</p>

              <button class="btn btn-accent btn-lg btn-block" :disabled="enrolling" @click="enrollAndStart">
                <app-icon name="rocket" :size="18" />
                {{ ctaLabel }}
              </button>

              <div class="guarantee-note">
                <app-icon name="lock" :size="14" />
                Paiement du certificat par Airtel Money, Moov Money ou Visa
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contenu -->
    <div class="container content-grid-layout">
      <div class="main-column">
        <section class="content-block">
          <h2 class="block-title">À propos de cette formation</h2>
          <p class="full-desc">{{ course.description }}</p>

          <div v-if="course.skills.length" class="skills-acquired-box">
            <h3>Compétences que vous allez valider</h3>
            <div class="skills-chips">
              <span v-for="skill in course.skills" :key="skill" class="skill-bubble">
                <app-icon name="check" :size="12" />
                {{ skill }}
              </span>
            </div>
          </div>
        </section>

        <section class="content-block syllabus-block">
          <div class="syllabus-header">
            <div>
              <h2 class="block-title">Programme de la formation</h2>
              <p class="sub">Un parcours progressif : chaque étape se débloque quand la précédente est validée.</p>
            </div>
            <div class="modules-count-tag">
              {{ course.modulesCount }} modules • {{ course.stepsCount }} étapes
            </div>
          </div>

          <div class="modules-accordion">
            <div v-for="(mod, index) in course.modules || []" :key="mod.id" class="module-card">
              <button class="mod-header" :aria-expanded="openModuleId === mod.id" @click="toggleModule(mod.id)">
                <div class="mod-title-left">
                  <span class="mod-badge">Partie {{ index + 1 }}</span>
                  <h4>{{ mod.title }}</h4>
                </div>
                <div class="mod-meta-right">
                  <span class="mod-duration">
                    <app-icon name="clock" :size="13" />
                    {{ formatMinutes(mod.minutes) }}
                  </span>
                  <app-icon name="chevron-down" :size="14" class="chevron" :class="{ 'chevron-open': openModuleId === mod.id }" />
                </div>
              </button>

              <div v-show="openModuleId === mod.id" class="mod-lessons-list animate-fade-in">
                <div v-for="step in mod.steps" :key="step.id" class="lesson-row">
                  <div class="lesson-info">
                    <span class="lesson-type-icon">
                      <app-icon :name="stepIcon(step.type)" :size="15" />
                    </span>
                    <span class="lesson-name">{{ step.title }}</span>
                  </div>
                  <span class="lesson-time">{{ typeLabel(step.type) }} · {{ formatMinutes(step.minutes) }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="content-block instructor-full-block">
          <h2 class="block-title">Votre formatrice / formateur</h2>
          <div class="instructor-card-full">
            <img :src="course.instructor.avatar" alt="" class="inst-full-avatar" />
            <div class="inst-full-info">
              <h3>{{ course.instructor.name }}</h3>
              <p class="inst-title">{{ instructorRole }}</p>
              <p class="inst-bio">
                Professionnel(le) du secteur, passionné(e) par la transmission de compétences concrètes et immédiatement applicables.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>

  <div v-else-if="loading" class="container section text-center"><p>Chargement de la formation…</p></div>

  <div v-else class="course-not-found container section text-center">
    <h2>Formation introuvable</h2>
    <p>{{ error || "Le cours demandé n'existe pas ou a été déplacé." }}</p>
    <router-link to="/courses" class="btn btn-primary">Retour au catalogue</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import AppIcon from '../components/layout/AppIcon.vue'
import { catalogueApi } from '../api'
import { Course, StepType } from '../api/types'
import { formatMinutes, formatPrice } from '../utils/format'

export default defineComponent({
  name: 'CourseDetailView',
  components: { AppIcon },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const slug = String(route.params.slug)
    const course = ref<Course | null>(null)
    const loading = ref(true)
    const error = ref('')
    const enrolling = ref(false)
    const openModuleId = ref<number | null>(null)

    const enrolled = computed(() => !!store.getters.myCourseBySlug(slug))
    const ctaLabel = computed(() => {
      if (enrolling.value) return 'Inscription…'
      if (!store.getters.isAuthenticated) return 'Créer un compte et commencer'
      return enrolled.value ? 'Reprendre la formation' : 'Commencer gratuitement'
    })
    const certifPrice = computed(() => course.value ? formatPrice(course.value.certificationPrice, course.value.currency) : '')
    const instructorRole = computed(() => course.value ? [course.value.instructor.title, course.value.instructor.company].filter(Boolean).join(' • ') : '')

    onMounted(async () => {
      try {
        course.value = await catalogueApi.detail(slug)
        if (course.value.modules && course.value.modules.length) openModuleId.value = course.value.modules[0].id
      } catch (e: any) {
        error.value = e.status === 404 ? '' : e.message
      } finally {
        loading.value = false
      }
    })

    const toggleModule = (id: number) => {
      openModuleId.value = openModuleId.value === id ? null : id
    }

    const enrollAndStart = async () => {
      if (!store.getters.isAuthenticated) {
        router.push({ name: 'login', query: { mode: 'register', redirect: route.fullPath } })
        return
      }
      enrolling.value = true
      error.value = ''
      try {
        if (!enrolled.value) await store.dispatch('enroll', slug)
        router.push(`/learn/${slug}`)
      } catch (e: any) {
        error.value = e.message
      } finally {
        enrolling.value = false
      }
    }

    const typeLabel = (t: StepType) => ({ lecon: 'Leçon', quiz: 'Quiz', devoir: 'Code à rendre' }[t])
    const stepIcon = (t: StepType) => ({ lecon: 'file-text', quiz: 'target', devoir: 'upload' }[t])

    return {
      course, loading, error, enrolling, openModuleId, ctaLabel, certifPrice, instructorRole,
      toggleModule, enrollAndStart, typeLabel, stepIcon, formatMinutes
    }
  }
})
</script>

<style scoped lang="scss">
.enroll-error { background: #fee2e2; color: #991b1b; border-radius: var(--radius-sm); padding: 0.6rem 0.9rem; font-weight: 600; margin-bottom: 0.75rem; font-size: 0.9rem; }
button.mod-header { width: 100%; text-align: left; font: inherit; color: inherit; border: none; }
.detail-hero {
  background: linear-gradient(135deg, var(--color-primary-dark) 0%, #042f2e 100%);
  color: #ffffff;
  padding: 3.5rem 0 4rem 0;
  position: relative;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1.3fr 0.8fr;
  gap: 3.5rem;
  align-items: start;
}

.breadcrumb-trail {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 1rem;

  a {
    color: rgba(255, 255, 255, 0.8);
    &:hover {
      color: #ffffff;
    }
  }
}

.detail-title {
  font-size: 2.6rem;
  color: #ffffff;
  margin: 1rem 0 0.85rem 0;
  line-height: 1.2;
}

.detail-tagline {
  font-size: 1.15rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  margin-bottom: 1.75rem;
}

.meta-stats-row {
  display: flex;
  align-items: center;
  gap: 1.75rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  font-size: 0.95rem;

  .meta-item {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: rgba(255, 255, 255, 0.85);
  }

  .rating-badge {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 0.35rem 0.75rem;
    border-radius: var(--radius-full);

    .star {
      color: var(--color-accent-yellow);
    }
  }
}

.instructor-preview {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  .inst-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--color-primary);
  }

  .inst-text {
    display: flex;
    flex-direction: column;

    .inst-name {
      font-weight: 700;
      color: #ffffff;
      font-size: 0.95rem;
    }

    .inst-role {
      font-size: 0.82rem;
      color: rgba(255, 255, 255, 0.6);
    }
  }
}

/* Floating Pricing Card */
.pricing-floating-card {
  background-color: var(--color-surface-2);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  border: 3px solid rgba(255, 255, 255, 0.95);
  position: sticky;
  top: 100px;

  .card-thumb {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .card-p-body {
    padding: 2rem;
  }
}

.price-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;

  .free-label {
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--color-primary-ink);
    text-transform: uppercase;
  }

  .price-main {
    font-size: 2.2rem;
    font-weight: 800;
    color: var(--color-text);

    small {
      font-size: 0.9rem;
      color: var(--color-text-muted);
      font-weight: 500;
    }
  }
}

.features-checklist {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.75rem;

  .f-item {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    font-size: 0.92rem;
    color: var(--color-text-secondary);
    font-weight: 500;

    .ico-yes {
      color: var(--color-primary-ink);
      flex-shrink: 0;
    }
  }
}

.guarantee-note {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  text-align: center;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

/* Content Blocks */
.content-grid-layout {
  padding: 3rem 1.5rem;
}

.main-column {
  max-width: 800px;
}

.content-block {
  margin-bottom: 3.5rem;

  .block-title {
    font-size: 1.8rem;
    color: var(--color-text);
    margin-bottom: 1rem;
  }

  .full-desc {
    font-size: 1.05rem;
    line-height: 1.7;
    color: var(--color-text-secondary);
    margin-bottom: 2rem;
  }
}

.skills-acquired-box {
  background-color: var(--color-surface-2);
  border: 3px solid rgba(255, 255, 255, 0.95);
  border-radius: var(--radius-lg);
  padding: 1.75rem;

  h3 {
    font-size: 1.15rem;
    color: var(--color-text);
    margin-bottom: 1rem;
  }

  .skills-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;

    .skill-bubble {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background-color: var(--color-primary-light);
      color: var(--color-primary-ink);
      font-weight: 600;
      font-size: 0.85rem;
      padding: 0.35rem 0.85rem;
      border-radius: var(--radius-full);
    }
  }
  box-shadow: var(--shadow-md);
}

/* Syllabus Accordion */
.syllabus-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;

  .sub {
    color: var(--color-text-secondary);
    font-size: 0.95rem;
  }

  .modules-count-tag {
    background-color: var(--color-surface-2);
    border: var(--border-w) solid var(--color-border);
    padding: 0.35rem 0.85rem;
    border-radius: var(--radius-sm);
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-primary-ink);
  }
}

.modules-accordion {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.module-card {
  background-color: var(--color-surface-2);
  border: 3px solid rgba(255, 255, 255, 0.95);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.mod-header {
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: var(--color-surface-2);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-surface-hover);
  }

  .mod-title-left {
    display: flex;
    align-items: center;
    gap: 1rem;

    .mod-badge {
      background-color: var(--color-primary-light);
      color: var(--color-primary-ink);
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.6rem;
      border-radius: var(--radius-sm);
    }

    h4 {
      font-size: 1.05rem;
      color: var(--color-text);
    }
  }

  .mod-meta-right {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 0.85rem;
    color: var(--color-text-muted);

    .mod-duration {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
    }

    .chevron {
      color: var(--color-text-muted);
      transition: transform 0.2s ease;

      &.chevron-open {
        transform: rotate(180deg);
        color: var(--color-primary-ink);
      }
    }
  }
}

.mod-lessons-list {
  padding: 0.5rem 1.5rem 1.25rem 1.5rem;
  border-top: 1px solid var(--color-border-subtle);
  background-color: var(--color-surface);
}

.lesson-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-border-subtle);

  .lesson-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .lesson-type-icon {
      display: inline-flex;
      color: var(--color-primary-ink);
    }

    .lesson-name {
      font-size: 0.92rem;
      color: var(--color-text);
      font-weight: 500;
    }
  }

  .lesson-time {
    font-size: 0.8rem;
    color: var(--color-text-muted);
  }
}

.quiz-info-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 0 0.25rem 0;

  .quiz-ico {
    display: inline-flex;
    color: var(--color-primary-ink);
  }

  .quiz-title {
    font-size: 0.92rem;
    font-weight: 700;
    color: var(--color-text);
  }

  .quiz-pass-badge {
    margin-left: auto;
    font-size: 0.72rem;
    color: var(--color-primary-ink);
    font-weight: 700;
    background-color: var(--color-primary-light);
    padding: 0.2rem 0.6rem;
    border-radius: var(--radius-full);
  }
}

/* Instructor Full Card */
.instructor-card-full {
  background-color: var(--color-surface-2);
  border: 3px solid rgba(255, 255, 255, 0.95);
  border-radius: var(--radius-lg);
  padding: 2rem;
  display: flex;
  gap: 1.5rem;

  .inst-full-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
    border: 3px solid var(--color-primary);
  }

  .inst-full-info {
    h3 {
      font-size: 1.25rem;
      color: var(--color-text);
      margin-bottom: 0.25rem;
    }

    .inst-title {
      font-size: 0.85rem;
      color: var(--color-primary-ink);
      font-weight: 600;
      margin-bottom: 0.75rem;
    }

    .inst-bio {
      font-size: 0.92rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
    }
  }
  box-shadow: var(--shadow-md);
}

/* =====================================================================
   THÈME CLAY — surcharges de la page
   ===================================================================== */
.detail-hero {
  --color-primary: #5eead4;
  --color-primary-ink: #5eead4;
  --color-primary-light: rgba(94, 234, 212, 0.16);
  margin: 0 0.75rem;
  border-radius: 40px;
  border: 4px solid rgba(255, 255, 255, 0.6);
  border-bottom: 4px solid rgba(255, 255, 255, 0.6);
  box-shadow: var(--shadow-xl), inset 0 4px 0 rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.detail-hero .rating-badge {
  border: 2px solid rgba(255, 255, 255, 0.15);
  box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.08);
}
.pricing-floating-card {
  /* carte claire dans le bandeau sombre : on rétablit les couleurs du thème clair */
  --color-primary: #14b8a6;
  --color-primary-ink: #0f766e;
  --color-primary-light: #ccfbf1;
  border: 4px solid rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow-xl);
  .card-thumb { margin: 8px 8px 0; border-radius: 26px; overflow: hidden; }
}
.skills-acquired-box .skills-chips span {
  border: 2px solid rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow-sm);
  font-weight: 700;
}
.modules-count-tag {
  border: 2px solid rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow-sm);
  font-weight: 700;
}
.module-card { overflow: hidden; }
.mod-header {
  background-color: transparent;
  .mod-title-left .mod-badge {
    white-space: nowrap;
    font-family: var(--font-heading);
    font-weight: 900;
    box-shadow: var(--clay-inner);
  }
}
.mod-lessons-list {
  margin: 0 10px 10px;
  border-top: none;
  border-radius: 18px;
  background-color: var(--color-surface-3);
  box-shadow: var(--shadow-pressed);
}

@media (max-width: 1024px) {
  .hero-inner {
    grid-template-columns: 1fr;
  }

  .pricing-floating-card {
    position: static;
  }
}
</style>
