<template>
  <div v-if="course" class="course-detail-page">
    <!-- Top Hero Banner -->
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
            <div class="rating-badge">
              <app-icon name="star" :size="14" filled class="star" />
              <strong>{{ course.rating }}</strong>
              <span>({{ course.reviewsCount }} avis vérifiés)</span>
            </div>
            <div class="meta-item">
              <app-icon name="users" :size="14" />
              <strong>{{ course.enrolledCount.toLocaleString() }}</strong> apprenants inscrits
            </div>
            <div class="meta-item">
              <app-icon name="bar-chart" :size="14" />
              Niveau : <strong>{{ course.level }}</strong>
            </div>
          </div>

          <div class="instructor-preview">
            <img :src="course.instructor.avatar" :alt="course.instructor.name" class="inst-avatar" />
            <div class="inst-text">
              <span class="inst-name">Formateur : {{ course.instructor.name }}</span>
              <span class="inst-role">{{ course.instructor.title }} • {{ course.instructor.company }}</span>
            </div>
          </div>
        </div>

        <!-- Floating Sticky Enrollment Card -->
        <div class="hero-right-card">
          <div class="pricing-floating-card">
            <img :src="course.thumbnail" :alt="course.title" class="card-thumb" />

            <div class="card-p-body">
              <div class="price-header">
                <span class="free-label">Accès libre & Flexible</span>
                <span class="price-main">0 € <small>en formule de base</small></span>
              </div>

              <div class="features-checklist">
                <div class="f-item"><app-icon name="check" :size="16" class="ico-yes" /> Accès immédiat aux modules</div>
                <div class="f-item"><app-icon name="check" :size="16" class="ico-yes" /> Rythme personnalisé ({{ chosenHours }}h)</div>
                <div class="f-item"><app-icon name="check" :size="16" class="ico-yes" /> Certificat officiel avec QR code</div>
                <div class="f-item"><app-icon name="check" :size="16" class="ico-yes" /> Support pédagogique & quiz interactifs</div>
              </div>

              <button class="btn btn-accent btn-lg btn-block" @click="enrollAndStart">
                <app-icon name="rocket" :size="18" />
                Commencer la formation maintenant
              </button>

              <div class="guarantee-note">
                <app-icon name="lock" :size="14" />
                Certificat officiel d'heures vérifiable auprès des recruteurs
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content Section -->
    <div class="container content-grid-layout">
      <div class="main-column">
        <!-- Interactive Duration Customizer -->
        <section class="content-block">
          <duration-slider
            v-model="chosenHours"
            :min-hours="course.minHours"
            :max-hours="course.maxHours"
          />
        </section>

        <!-- Course Description & Outcomes -->
        <section class="content-block">
          <h2 class="block-title">À propos de cette formation</h2>
          <p class="full-desc">{{ course.description }}</p>

          <div class="skills-acquired-box">
            <h3>Compétences que vous allez valider</h3>
            <div class="skills-chips">
              <span v-for="skill in course.skills" :key="skill" class="skill-bubble">
                <app-icon name="check" :size="12" />
                {{ skill }}
              </span>
            </div>
          </div>
        </section>

        <!-- Syllabus & Modules -->
        <section class="content-block syllabus-block">
          <div class="syllabus-header">
            <div>
              <h2 class="block-title">Programme & Modules de la formation</h2>
              <p class="sub">
                Affichage adapté à votre volume horaire sélectionné (<strong>{{ chosenHours }} heures</strong>).
              </p>
            </div>
            <div class="modules-count-tag">
              {{ course.modules.length }} modules • {{ totalLessonsCount }} leçons
            </div>
          </div>

          <div class="modules-accordion">
            <div
              v-for="(mod, index) in course.modules"
              :key="mod.id"
              class="module-card"
            >
              <div class="mod-header" @click="toggleModule(mod.id)">
                <div class="mod-title-left">
                  <span class="mod-badge">Module {{ index + 1 }}</span>
                  <h4>{{ mod.title }}</h4>
                </div>
                <div class="mod-meta-right">
                  <span class="mod-duration">
                    <app-icon name="clock" :size="13" />
                    ~{{ mod.durationHours }}h de pratique
                  </span>
                  <app-icon
                    name="chevron-down"
                    :size="14"
                    class="chevron"
                    :class="{ 'chevron-open': openModuleId === mod.id }"
                  />
                </div>
              </div>

              <div v-show="openModuleId === mod.id" class="mod-lessons-list animate-fade-in">
                <div v-for="lesson in mod.lessons" :key="lesson.id" class="lesson-row">
                  <div class="lesson-info">
                    <span class="lesson-type-icon">
                      <app-icon
                        :name="lesson.type === 'video' ? 'video' : lesson.type === 'exercise' ? 'code' : 'file-text'"
                        :size="15"
                      />
                    </span>
                    <span class="lesson-name">{{ lesson.title }}</span>
                  </div>
                  <span class="lesson-time">{{ lesson.duration }}</span>
                </div>

                <div class="quiz-info-row">
                  <span class="quiz-ico"><app-icon name="target" :size="16" /></span>
                  <span class="quiz-title">{{ mod.quiz.title }}</span>
                  <span class="quiz-pass-badge">Obligatoire pour certificat</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Instructor Bio -->
        <section class="content-block instructor-full-block">
          <h2 class="block-title">Votre Formatrice / Formateur</h2>
          <div class="instructor-card-full">
            <img :src="course.instructor.avatar" :alt="course.instructor.name" class="inst-full-avatar" />
            <div class="inst-full-info">
              <h3>{{ course.instructor.name }}</h3>
              <p class="inst-title">{{ course.instructor.title }} • {{ course.instructor.company }}</p>
              <p class="inst-bio">
                Professionnel(le) chevronné(e) du secteur, passionné(e) par la transmission de compétences concrètes et immédiatement applicables dans les environnements de travail les plus exigeants.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>

  <div v-else class="course-not-found container section text-center">
    <h2>Formation introuvable</h2>
    <p>Le cours demandé n'existe pas ou a été déplacé.</p>
    <router-link to="/courses" class="btn btn-primary">Retour au catalogue</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getCourseBySlug, Course } from '../data/courses'
import DurationSlider from '../components/course/DurationSlider.vue'
import AppIcon from '../components/layout/AppIcon.vue'

export default defineComponent({
  name: 'CourseDetailView',
  components: {
    DurationSlider,
    AppIcon
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const course = ref<Course | undefined>(undefined)
    const chosenHours = ref(25)
    const openModuleId = ref<string>('m1')

    onMounted(() => {
      const slug = String(route.params.slug)
      const found = getCourseBySlug(slug)
      if (found) {
        course.value = found
        chosenHours.value = found.defaultHours
        if (found.modules.length > 0) {
          openModuleId.value = found.modules[0].id
        }
      }
    })

    const totalLessonsCount = computed(() => {
      if (!course.value) return 0
      return course.value.modules.reduce((acc, m) => acc + m.lessons.length, 0)
    })

    const toggleModule = (id: string) => {
      openModuleId.value = openModuleId.value === id ? '' : id
    }

    const enrollAndStart = () => {
      if (!course.value) return
      store.dispatch('enroll', {
        courseId: course.value.id,
        chosenHours: chosenHours.value
      })
      router.push(`/learn/${course.value.id}`)
    }

    return {
      course,
      chosenHours,
      openModuleId,
      totalLessonsCount,
      toggleModule,
      enrollAndStart
    }
  }
})
</script>

<style scoped lang="scss">
.detail-hero {
  background: linear-gradient(135deg, var(--color-primary-dark) 0%, #0f2f1c 100%);
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
  border: 1px solid var(--color-border);
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
    color: var(--color-primary);
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
      color: var(--color-primary);
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
  border: 1px solid var(--color-border);
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
      color: var(--color-primary);
      font-weight: 600;
      font-size: 0.85rem;
      padding: 0.35rem 0.85rem;
      border-radius: var(--radius-full);
    }
  }
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
    border: 1px solid var(--color-border);
    padding: 0.35rem 0.85rem;
    border-radius: var(--radius-sm);
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-primary);
  }
}

.modules-accordion {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.module-card {
  background-color: var(--color-surface-2);
  border: 1px solid var(--color-border);
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
      color: var(--color-primary);
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
        color: var(--color-primary);
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
      color: var(--color-primary);
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
    color: var(--color-primary);
  }

  .quiz-title {
    font-size: 0.92rem;
    font-weight: 700;
    color: var(--color-text);
  }

  .quiz-pass-badge {
    margin-left: auto;
    font-size: 0.72rem;
    color: var(--color-primary);
    font-weight: 700;
    background-color: var(--color-primary-light);
    padding: 0.2rem 0.6rem;
    border-radius: var(--radius-full);
  }
}

/* Instructor Full Card */
.instructor-card-full {
  background-color: var(--color-surface-2);
  border: 1px solid var(--color-border);
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
      color: var(--color-primary);
      font-weight: 600;
      margin-bottom: 0.75rem;
    }

    .inst-bio {
      font-size: 0.92rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
    }
  }
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
