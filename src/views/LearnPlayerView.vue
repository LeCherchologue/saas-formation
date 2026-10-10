<template>
  <div v-if="course" class="lms-player-layout">
    <!-- Top Player Header -->
    <header class="player-topbar">
      <div class="topbar-left">
        <router-link :to="'/course/' + course.slug" class="back-course-link">
          <app-icon name="arrow-left" :size="14" />
          Sortir du lecteur
        </router-link>
        <div class="divider"></div>
        <h2 class="player-course-title">{{ course.title }}</h2>
      </div>

      <div class="topbar-right">
        <!-- Progress bar -->
        <div class="progress-block">
          <div class="progress-labels">
            <span>Progression du cours</span>
            <strong>{{ progressPercent }}%</strong>
          </div>
          <div class="progress-track">
            <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
          </div>
        </div>

        <!-- Certificate Status / Quick Access -->
        <div v-if="hasCertificate" class="cert-earned-badge">
          <router-link :to="'/verify/' + userCertificateId" class="btn btn-accent btn-sm">
            <app-icon name="trophy" :size="14" />
            Certificat Débloqué (Voir)
          </router-link>
        </div>
      </div>
    </header>

    <!-- Body Layout: Sidebar + Lesson Viewer -->
    <div class="player-body">
      <!-- Left Curriculum Sidebar -->
      <aside class="curriculum-sidebar">
        <div class="sidebar-header">
          <h3>Programme de formation</h3>
          <span class="workload-tag">Volume : {{ userChosenHours }}h certifiées</span>
        </div>

        <div class="sidebar-modules-list">
          <div
            v-for="(mod, modIndex) in course.modules"
            :key="mod.id"
            class="sidebar-module"
          >
            <div class="s-mod-title">
              <span class="s-mod-num">Module {{ modIndex + 1 }}</span>
              <h4>{{ mod.title }}</h4>
            </div>

            <!-- Lessons List -->
            <div class="s-lessons">
              <div
                v-for="lesson in mod.lessons"
                :key="lesson.id"
                class="s-lesson-item"
                :class="{
                  'active': activeLesson && activeLesson.id === lesson.id,
                  'completed': isLessonCompleted(lesson.id)
                }"
                @click="selectLesson(lesson)"
              >
                <button
                  class="checkbox-btn"
                  @click.stop="toggleLesson(lesson.id)"
                  :title="isLessonCompleted(lesson.id) ? 'Marquer non lu' : 'Marquer comme terminé'"
                >
                  <app-icon v-if="isLessonCompleted(lesson.id)" name="check" :size="12" />
                </button>

                <div class="s-lesson-details">
                  <span class="s-lesson-name">{{ lesson.title }}</span>
                  <span class="s-lesson-dur">{{ lesson.duration }}</span>
                </div>
              </div>

              <!-- Module Quiz Action -->
              <div
                class="s-quiz-item"
                :class="{ 'quiz-passed': isQuizPassed(mod.quiz.id) }"
                @click="openQuiz(mod.quiz)"
              >
                <span class="quiz-status-icon">
                  <app-icon :name="isQuizPassed(mod.quiz.id) ? 'trophy' : 'target'" :size="18" />
                </span>
                <div class="quiz-text">
                  <span class="quiz-title">{{ mod.quiz.title }}</span>
                  <span class="quiz-sub">
                    {{ isQuizPassed(mod.quiz.id) ? 'Validé avec succès' : 'Passer le quiz de validation' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Lesson Content Area -->
      <main class="lesson-main-pane">
        <div v-if="activeLesson" class="lesson-content-container animate-fade-in">
          <!-- Video Simulation / Presentation Box -->
          <div class="lesson-video-box">
            <div class="video-mockup">
              <div class="video-overlay">
                <div class="play-circle" @click="toggleVideoPlay">
                  <app-icon :name="isPlaying ? 'pause' : 'play'" :size="26" filled />
                </div>
                <div class="video-meta">
                  <span class="video-badge">Leçon Multimédia</span>
                  <h4>{{ activeLesson.title }}</h4>
                  <span class="video-dur">{{ activeLesson.duration }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Lesson Title & Mark as complete CTA -->
          <div class="lesson-action-header">
            <div>
              <span class="lesson-kind">
                <app-icon :name="activeLesson.type === 'video' ? 'video' : 'file-text'" :size="13" />
                {{ activeLesson.type === 'video' ? 'Vidéo de cours' : 'Guide théorique & cas pratique' }}
              </span>
              <h1 class="active-title">{{ activeLesson.title }}</h1>
            </div>

            <button
              class="btn"
              :class="isLessonCompleted(activeLesson.id) ? 'btn-secondary' : 'btn-primary'"
              @click="toggleLesson(activeLesson.id)"
            >
              <app-icon v-if="isLessonCompleted(activeLesson.id)" name="check" :size="15" />
              {{ isLessonCompleted(activeLesson.id) ? 'Leçon terminée' : 'Marquer comme terminée' }}
            </button>
          </div>

          <!-- Lesson Body Text & Content -->
          <div class="lesson-prose-body">
            <div class="content-text" v-html="formattedLessonContent"></div>

            <!-- Key Takeaways Highlight Box -->
            <div v-if="activeLesson.keyTakeaways && activeLesson.keyTakeaways.length" class="takeaways-box">
              <div class="takeaways-title">
                <app-icon name="lightbulb" :size="18" /> Points clés à retenir
              </div>
              <ul>
                <li v-for="(point, pIdx) in activeLesson.keyTakeaways" :key="pIdx">
                  {{ point }}
                </li>
              </ul>
            </div>

            <!-- Downloadable Resources -->
            <div v-if="activeLesson.resources && activeLesson.resources.length" class="resources-box">
              <h4>Ressources & Supports téléchargeables</h4>
              <div class="resources-list">
                <div v-for="res in activeLesson.resources" :key="res.name" class="resource-card">
                  <span class="res-icon"><app-icon name="folder" :size="20" /></span>
                  <div class="res-info">
                    <span class="res-name">{{ res.name }}</span>
                    <span class="res-meta">{{ res.type }} • {{ res.size }}</span>
                  </div>
                  <button class="btn btn-secondary btn-sm" @click="downloadResource(res.name)">
                    Télécharger
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Lesson Footer Navigation -->
          <div class="lesson-footer-nav">
            <button
              v-if="prevLesson"
              class="btn btn-secondary"
              @click="selectLesson(prevLesson)"
            >
              <app-icon name="arrow-left" :size="15" />
              Leçon précédente
            </button>
            <div class="flex-spacer"></div>
            <button
              v-if="nextLesson"
              class="btn btn-primary"
              @click="selectLesson(nextLesson)"
            >
              Leçon suivante
              <app-icon name="arrow-right" :size="15" />
            </button>
            <button
              v-else
              class="btn btn-accent btn-lg"
              @click="openCurrentQuiz"
            >
              <app-icon name="target" :size="17" />
              Valider le cours & Obtenir mon certificat
            </button>
          </div>
        </div>
      </main>
    </div>

    <!-- Interactive Quiz Modal -->
    <quiz-modal
      v-if="activeQuizModal"
      :course-id="course.id"
      :quiz="activeQuizModal"
      @close="activeQuizModal = null"
    />
  </div>

  <div v-else class="container section text-center">
    <h2>Formation introuvable</h2>
    <router-link to="/courses" class="btn btn-primary">Retour au catalogue</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { getCourseBySlug, Course, Lesson } from '../data/courses'
import QuizModal from '../components/course/QuizModal.vue'
import AppIcon from '../components/layout/AppIcon.vue'

export default defineComponent({
  name: 'LearnPlayerView',
  components: {
    QuizModal,
    AppIcon
  },
  setup() {
    const route = useRoute()
    const store = useStore()

    const course = ref<Course | undefined>(undefined)
    const activeLesson = ref<Lesson | null>(null)
    const activeQuizModal = ref<any>(null)
    const isPlaying = ref(false)

    onMounted(() => {
      const courseId = String(route.params.courseId)
      const found = getCourseBySlug(courseId)
      if (found) {
        course.value = found
        // select first lesson by default
        if (found.modules.length > 0 && found.modules[0].lessons.length > 0) {
          activeLesson.value = found.modules[0].lessons[0]
        }
      }
    })

    const enrollment = computed(() => {
      if (!course.value) return null
      return store.getters.getEnrollment(course.value.id)
    })

    const userChosenHours = computed(() => {
      if (enrollment.value) return enrollment.value.chosenHours
      return course.value ? course.value.defaultHours : 20
    })

    const progressPercent = computed(() => {
      if (!course.value) return 0
      return store.getters.getCourseProgress(course.value.id)
    })

    const hasCertificate = computed(() => {
      return !!(enrollment.value && enrollment.value.certificateId)
    })

    const userCertificateId = computed(() => {
      return enrollment.value ? enrollment.value.certificateId : ''
    })

    const isLessonCompleted = (lessonId: string) => {
      if (!enrollment.value) return false
      return enrollment.value.completedLessonIds.includes(lessonId)
    }

    const isQuizPassed = (quizId: string) => {
      if (!enrollment.value) return false
      return enrollment.value.passedQuizIds.includes(quizId)
    }

    const toggleLesson = (lessonId: string) => {
      if (!course.value) return
      store.dispatch('toggleLesson', {
        courseId: course.value.id,
        lessonId
      })
    }

    const selectLesson = (lesson: Lesson) => {
      activeLesson.value = lesson
      isPlaying.value = false
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const openQuiz = (quiz: any) => {
      activeQuizModal.value = quiz
    }

    const openCurrentQuiz = () => {
      if (!course.value || course.value.modules.length === 0) return
      const lastMod = course.value.modules[course.value.modules.length - 1]
      openQuiz(lastMod.quiz)
    }

    const allLessons = computed(() => {
      if (!course.value) return []
      return course.value.modules.flatMap(m => m.lessons)
    })

    const currentLessonIndex = computed(() => {
      if (!activeLesson.value) return -1
      return allLessons.value.findIndex(l => l.id === activeLesson.value!.id)
    })

    const prevLesson = computed(() => {
      if (currentLessonIndex.value > 0) {
        return allLessons.value[currentLessonIndex.value - 1]
      }
      return null
    })

    const nextLesson = computed(() => {
      if (currentLessonIndex.value >= 0 && currentLessonIndex.value < allLessons.value.length - 1) {
        return allLessons.value[currentLessonIndex.value + 1]
      }
      return null
    })

    const formattedLessonContent = computed(() => {
      if (!activeLesson.value) return ''
      return activeLesson.value.content.replace(/\n\n/g, '<br><br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    })

    const toggleVideoPlay = () => {
      isPlaying.value = !isPlaying.value
    }

    const downloadResource = (name: string) => {
      alert(`Téléchargement de : ${name}`)
    }

    return {
      course,
      activeLesson,
      activeQuizModal,
      isPlaying,
      userChosenHours,
      progressPercent,
      hasCertificate,
      userCertificateId,
      isLessonCompleted,
      isQuizPassed,
      toggleLesson,
      selectLesson,
      openQuiz,
      openCurrentQuiz,
      prevLesson,
      nextLesson,
      formattedLessonContent,
      toggleVideoPlay,
      downloadResource
    }
  }
})
</script>

<style scoped lang="scss">
.lms-player-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--color-bg);
}

/* Topbar */
.player-topbar {
  background-color: var(--color-surface);
  color: var(--color-text);
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 1.25rem;

  .back-course-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--color-text-secondary);
    font-size: 0.88rem;
    font-weight: 600;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-primary);
    }
  }

  .divider {
    width: 1px;
    height: 20px;
    background-color: var(--color-border-medium);
  }

  .player-course-title {
    font-size: 1.1rem;
    color: var(--color-text);
    font-weight: 700;
  }
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.progress-block {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 200px;

  .progress-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: var(--color-text-secondary);
  }

  .progress-track {
    width: 100%;
    height: 6px;
    background-color: var(--color-surface-3);
    border-radius: var(--radius-full);
    overflow: hidden;

    .progress-fill {
      height: 100%;
      background-color: var(--color-primary);
      transition: width 0.3s ease;
    }
  }
}

.cert-earned-badge {
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }
}

/* Player Body Layout */
.player-body {
  display: flex;
  flex: 1;
}

/* Sidebar */
.curriculum-sidebar {
  width: 380px;
  background-color: var(--color-surface);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  position: sticky;
  top: 64px;
  overflow-y: auto;

  .sidebar-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--color-border);

    h3 {
      font-size: 1.15rem;
      color: var(--color-text);
      margin-bottom: 0.35rem;
    }

    .workload-tag {
      font-size: 0.75rem;
      color: var(--color-primary);
      background-color: var(--color-primary-light);
      padding: 0.2rem 0.6rem;
      border-radius: var(--radius-full);
      font-weight: 700;
    }
  }
}

.sidebar-modules-list {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-module {
  .s-mod-title {
    margin-bottom: 0.75rem;

    .s-mod-num {
      font-size: 0.7rem;
      font-weight: 700;
      color: var(--color-text-muted);
      text-transform: uppercase;
    }

    h4 {
      font-size: 0.92rem;
      color: var(--color-text);
      line-height: 1.3;
    }
  }
}

.s-lessons {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.s-lesson-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.85rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  background-color: var(--color-surface-2);
  border: 1px solid var(--color-border);
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--color-primary);
    background-color: var(--color-surface-hover);
  }

  &.active {
    border-color: var(--color-primary);
    background-color: var(--color-primary-light);

    .s-lesson-name {
      color: var(--color-primary);
      font-weight: 700;
    }
  }

  &.completed {
    .checkbox-btn {
      background-color: var(--color-primary);
      border-color: var(--color-primary);
      color: #0a1f16;
    }
  }

  .checkbox-btn {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1.5px solid var(--color-border-medium);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 800;
    flex-shrink: 0;
  }

  .s-lesson-details {
    flex: 1;
    display: flex;
    flex-direction: column;

    .s-lesson-name {
      font-size: 0.85rem;
      color: var(--color-text);
      line-height: 1.3;
    }

    .s-lesson-dur {
      font-size: 0.72rem;
      color: var(--color-text-muted);
    }
  }
}

.s-quiz-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0.85rem;
  background-color: var(--color-primary-light);
  border: 1px dashed var(--color-primary);
  border-radius: var(--radius-md);
  margin-top: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-surface-hover);
  }

  &.quiz-passed {
    background-color: var(--color-primary-light);
    border-color: var(--color-primary);
    border-style: solid;
  }

  .quiz-status-icon {
    display: inline-flex;
    color: var(--color-primary);
  }

  .quiz-text {
    display: flex;
    flex-direction: column;

    .quiz-title {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--color-text);
    }

    .quiz-sub {
      font-size: 0.72rem;
      color: var(--color-text-secondary);
    }
  }
}

/* Lesson Main Pane */
.lesson-main-pane {
  flex: 1;
  padding: 2.5rem 4rem;
  max-width: 960px;
}

.lesson-video-box {
  margin-bottom: 2.5rem;

  .video-mockup {
    width: 100%;
    height: 400px;
    background: linear-gradient(135deg, #0b1238 0%, #1a2cdb 100%);
    border-radius: var(--radius-xl);
    position: relative;
    overflow: hidden;
    box-shadow: var(--shadow-lg);

    .video-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle, transparent 40%, rgba(0, 0, 0, 0.5) 100%);
    }

    .play-circle {
      width: 72px;
      height: 72px;
      background-color: var(--color-primary);
      color: #0a1f16;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(52, 211, 153, 0.45);
      transition: transform 0.2s ease;

      &:hover {
        transform: scale(1.1);
      }
    }

    .video-meta {
      position: absolute;
      bottom: 1.5rem;
      left: 2rem;
      color: #ffffff;

      .video-badge {
        font-size: 0.75rem;
        background-color: rgba(255, 255, 255, 0.2);
        padding: 0.2rem 0.6rem;
        border-radius: var(--radius-full);
      }

      h4 {
        font-size: 1.25rem;
        color: #ffffff;
        margin-top: 0.35rem;
      }

      .video-dur {
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.75);
      }
    }
  }
}

.lesson-action-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
  gap: 1.5rem;

  .lesson-kind {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--color-primary);
  }

  .active-title {
    font-size: 1.8rem;
    color: var(--color-text);
    margin-top: 0.25rem;
  }
}

.lesson-prose-body {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
  margin-bottom: 3rem;

  .content-text {
    margin-bottom: 2.5rem;
  }
}

.takeaways-box {
  background-color: rgba(202, 138, 4, 0.08);
  border: 1px solid rgba(202, 138, 4, 0.28);
  border-radius: var(--radius-lg);
  padding: 1.75rem;
  margin-bottom: 2.5rem;

  .takeaways-title {
    font-weight: 700;
    color: var(--color-accent-yellow);
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  ul {
    padding-left: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    li {
      color: var(--color-text-secondary);
    }
  }
}

.resources-box {
  background-color: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.75rem;

  h4 {
    font-size: 1.1rem;
    color: var(--color-text);
    margin-bottom: 1rem;
  }

  .resources-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .resource-card {
    background-color: var(--color-surface-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 0.85rem 1.25rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    .res-icon {
      display: inline-flex;
      color: var(--color-primary);
    }

    .res-info {
      flex: 1;
      display: flex;
      flex-direction: column;

      .res-name {
        font-weight: 600;
        font-size: 0.92rem;
        color: var(--color-text);
      }

      .res-meta {
        font-size: 0.75rem;
        color: var(--color-text-muted);
      }
    }
  }
}

.lesson-footer-nav {
  display: flex;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .flex-spacer {
    flex: 1;
  }
}

@media (max-width: 960px) {
  .player-body {
    flex-direction: column;
  }

  .curriculum-sidebar {
    width: 100%;
    height: auto;
    position: static;
  }

  .lesson-main-pane {
    padding: 1.5rem;
  }

  .lesson-video-box .video-mockup {
    height: 240px;
  }
}
</style>
