<template>
  <div class="dashboard-page">
    <!-- Top Welcome Banner -->
    <div class="dash-hero">
      <div class="container dash-hero-inner">
        <div class="user-profile-summary">
          <img :src="user.avatar" :alt="user.name" class="user-big-avatar" />
          <div class="user-info">
            <span class="badge badge-yellow">Compte Apprenant Actif</span>
            <h1>Bonjour, {{ user.name }}</h1>
            <p>{{ user.email }} • Plan : <strong>Pro Certification Pass</strong></p>
          </div>
        </div>

        <!-- Quick Summary Metrics -->
        <div class="dash-metrics-grid">
          <div class="metric-card">
            <span class="m-num">{{ enrolledCoursesList.length }}</span>
            <span class="m-label">Formation(s) en cours</span>
          </div>
          <div class="metric-card">
            <span class="m-num">{{ certificatesList.length }}</span>
            <span class="m-label">Certificat(s) officiel(s)</span>
          </div>
          <div class="metric-card">
            <span class="m-num">{{ totalHoursAccumulated }}h</span>
            <span class="m-label">Volume certifié total</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Dashboard Content -->
    <div class="container dash-main-content">
      <!-- Section 1: Active Courses -->
      <section class="dash-section">
        <div class="dash-section-header">
          <div>
            <h2>Mes formations en cours</h2>
            <p>Reprenez votre progression là où vous l'avez laissée.</p>
          </div>
          <router-link to="/courses" class="btn btn-secondary btn-sm">
            + Ajouter une formation
          </router-link>
        </div>

        <div v-if="enrolledCoursesList.length > 0" class="enrolled-courses-grid">
          <div
            v-for="item in enrolledCoursesList"
            :key="item.course.id"
            class="enrolled-card"
          >
            <div class="card-top">
              <img :src="item.course.thumbnail" :alt="item.course.title" class="enrolled-thumb" />
              <div class="enrolled-title-block">
                <span class="enrolled-cat">{{ item.course.categoryLabel }}</span>
                <h3>
                  <router-link :to="'/learn/' + item.course.id">
                    {{ item.course.title }}
                  </router-link>
                </h3>
                <span class="hours-tag">
                  <app-icon name="zap" :size="13" />
                  {{ item.enrollment.chosenHours }}h certifiées prévues
                </span>
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="enrolled-progress">
              <div class="p-labels">
                <span>Progression globale</span>
                <strong>{{ getProgress(item.course.id) }}%</strong>
              </div>
              <div class="track">
                <div class="fill" :style="{ width: getProgress(item.course.id) + '%' }"></div>
              </div>
            </div>

            <!-- Action buttons -->
            <div class="card-actions">
              <router-link :to="'/learn/' + item.course.id" class="btn btn-primary btn-sm">
                Continuer les leçons
                <app-icon name="arrow-right" :size="14" />
              </router-link>
              <router-link
                v-if="item.enrollment.certificateId"
                :to="'/verify/' + item.enrollment.certificateId"
                class="btn btn-secondary btn-sm"
              >
                <app-icon name="award" :size="14" />
                Voir mon certificat
              </router-link>
            </div>
          </div>
        </div>

        <div v-else class="empty-enrolled-box">
          <p>Vous n'êtes pas encore inscrit à une formation.</p>
          <router-link to="/courses" class="btn btn-primary">Explorer le catalogue</router-link>
        </div>
      </section>

      <!-- Section 2: Earned Certificates -->
      <section class="dash-section">
        <div class="dash-section-header">
          <div>
            <h2>Mes Certificats de Réussite</h2>
            <p>Documents officiels vérifiables auprès des recruteurs et employeurs.</p>
          </div>
        </div>

        <div v-if="certificatesList.length > 0" class="certs-table-card">
          <div class="certs-list">
            <div
              v-for="cert in certificatesList"
              :key="cert.id"
              class="cert-item-row"
            >
              <div class="cert-left">
                <span class="cert-icon"><app-icon name="award" :size="24" /></span>
                <div class="cert-meta">
                  <h4>{{ cert.courseTitle }}</h4>
                  <div class="cert-sub">
                    <span>ID : <strong class="cert-id-code">{{ cert.id }}</strong></span>
                    <span>•</span>
                    <span>Volume certifié : <strong>{{ cert.completedHours }} heures</strong></span>
                    <span>•</span>
                    <span>Délivré le : {{ cert.issueDate }}</span>
                  </div>
                </div>
              </div>

              <div class="cert-actions">
                <router-link :to="'/verify/' + cert.id" class="btn btn-secondary btn-sm">
                  <app-icon name="eye" :size="14" />
                  Consulter
                </router-link>
                <router-link :to="'/verify/' + cert.id" class="btn btn-primary btn-sm">
                  <app-icon name="printer" :size="14" />
                  PDF / Imprimer
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="empty-certs-box">
          <p>Complétez un module et validez le quiz pour débloquer votre premier certificat officiel !</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { COURSES, Course } from '../data/courses'
import { CertificateRecord } from '../store'
import AppIcon from '../components/layout/AppIcon.vue'

export default defineComponent({
  name: 'DashboardView',
  components: { AppIcon },
  setup() {
    const store = useStore()

    const user = computed(() => store.state.user)
    const certificatesList = computed<CertificateRecord[]>(() => store.getters.certificatesList)

    const enrolledCoursesList = computed(() => {
      const enrollments = store.state.enrollments || {}
      return Object.keys(enrollments).map(id => {
        const course = COURSES.find(c => c.id === id)
        return {
          course: course || {
            id,
            title: 'Formation Debugger',
            slug: id,
            categoryLabel: 'Formation',
            thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80'
          } as Course,
          enrollment: enrollments[id]
        }
      })
    })

    const getProgress = (courseId: string) => {
      return store.getters.getCourseProgress(courseId)
    }

    const totalHoursAccumulated = computed(() => {
      return certificatesList.value.reduce((acc, c) => acc + (c.completedHours || 0), 0)
    })

    return {
      user,
      certificatesList,
      enrolledCoursesList,
      getProgress,
      totalHoursAccumulated
    }
  }
})
</script>

<style scoped lang="scss">
.dashboard-page {
  padding-bottom: 5rem;
}

.dash-hero {
  background: linear-gradient(135deg, var(--color-primary-dark) 0%, #0f2f1c 100%);
  color: #ffffff;
  padding: 3.5rem 0;
  border-bottom: 1px solid var(--color-border);
}

.dash-hero-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.user-profile-summary {
  display: flex;
  align-items: center;
  gap: 1.5rem;

  .user-big-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--color-primary);
  }

  .user-info {
    h1 {
      font-size: 2.2rem;
      color: #ffffff;
      margin: 0.35rem 0 0.25rem 0;
    }

    p {
      color: rgba(255, 255, 255, 0.75);
      font-size: 0.95rem;

      strong {
        color: var(--color-primary);
      }
    }
  }
}

.dash-metrics-grid {
  display: flex;
  gap: 1rem;

  .metric-card {
    background-color: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: var(--radius-lg);
    padding: 1.25rem 1.75rem;
    text-align: center;
    backdrop-filter: blur(8px);

    .m-num {
      display: block;
      font-family: var(--font-heading);
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--color-primary);
    }

    .m-label {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.75);
      text-transform: uppercase;
      font-weight: 600;
    }
  }
}

.dash-main-content {
  margin-top: 3.5rem;
}

.dash-section {
  margin-bottom: 4rem;
}

.dash-section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1.75rem;

  h2 {
    font-size: 1.75rem;
    color: var(--color-text);
    margin-bottom: 0.25rem;
  }

  p {
    color: var(--color-text-secondary);
    font-size: 0.95rem;
  }
}

.enrolled-courses-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.enrolled-card {
  background-color: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 1.75rem;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: var(--color-border-medium);
  }

  .card-top {
    display: flex;
    gap: 1.25rem;

    .enrolled-thumb {
      width: 90px;
      height: 90px;
      border-radius: var(--radius-md);
      object-fit: cover;
      flex-shrink: 0;
    }

    .enrolled-title-block {
      display: flex;
      flex-direction: column;

      .enrolled-cat {
        font-size: 0.75rem;
        font-weight: 700;
        color: var(--color-primary);
        text-transform: uppercase;
      }

      h3 {
        font-size: 1.15rem;
        margin: 0.25rem 0 0.5rem 0;
        line-height: 1.3;

        a {
          color: var(--color-text);
          &:hover {
            color: var(--color-primary);
          }
        }
      }

      .hours-tag {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        font-size: 0.8rem;
        color: var(--color-text-muted);
        font-weight: 600;
      }
    }
  }
}

.enrolled-progress {
  .p-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: var(--color-text-secondary);
    margin-bottom: 0.4rem;
  }

  .track {
    width: 100%;
    height: 8px;
    background-color: var(--color-bg);
    border-radius: var(--radius-full);
    overflow: hidden;

    .fill {
      height: 100%;
      background-color: var(--color-primary);
      transition: width 0.3s ease;
    }
  }
}

.card-actions {
  display: flex;
  gap: 0.75rem;
  padding-top: 0.5rem;

  .btn { display: inline-flex; align-items: center; gap: 0.4rem; }
}

/* Certs list card */
.certs-table-card {
  background-color: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.cert-item-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--color-border-subtle);
  gap: 1.5rem;

  &:last-child {
    border-bottom: none;
  }

  .cert-left {
    display: flex;
    align-items: center;
    gap: 1.25rem;

    .cert-icon {
      width: 52px;
      height: 52px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-primary-light);
      border: 1px solid var(--color-border-medium);
      border-radius: var(--radius-md);
      color: var(--color-primary);
    }

    .cert-meta {
      h4 {
        font-size: 1.1rem;
        color: var(--color-text);
        margin-bottom: 0.25rem;
      }

      .cert-sub {
        display: flex;
        gap: 0.6rem;
        font-size: 0.82rem;
        color: var(--color-text-muted);
        flex-wrap: wrap;

        .cert-id-code {
          color: var(--color-primary);
          font-family: var(--font-mono);
        }
      }
    }
  }

  .cert-actions {
    display: flex;
    gap: 0.75rem;
    flex-shrink: 0;

    .btn { display: inline-flex; align-items: center; gap: 0.4rem; }
  }
}

.empty-enrolled-box, .empty-certs-box {
  background-color: var(--color-surface-2);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-xl);
  padding: 3rem;
  text-align: center;
  color: var(--color-text-muted);
}

@media (max-width: 900px) {
  .enrolled-courses-grid {
    grid-template-columns: 1fr;
  }

  .cert-item-row {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
