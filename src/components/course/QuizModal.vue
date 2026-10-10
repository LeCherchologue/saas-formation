<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-card animate-fade-in">
      <button class="close-modal-btn" @click="$emit('close')" aria-label="Fermer">
        <app-icon name="x" :size="16" />
      </button>

      <!-- Quiz In Progress -->
      <div v-if="!submitted">
        <div class="modal-header">
          <span class="badge badge-blue">Validation des compétences</span>
          <h3>{{ quiz.title }}</h3>
          <p class="subtitle">Répondez correctement aux questions pour valider ce module et débloquer votre certificat officiel.</p>
        </div>

        <div class="quiz-body">
          <div v-for="(q, qIndex) in quiz.questions" :key="q.id" class="question-block">
            <div class="q-title">
              <span class="q-number">Q{{ qIndex + 1 }}</span>
              <p>{{ q.question }}</p>
            </div>

            <div class="options-list">
              <label
                v-for="(option, optIndex) in q.options"
                :key="optIndex"
                class="option-item"
                :class="{ 'selected': selectedAnswers[q.id] === optIndex }"
              >
                <input
                  type="radio"
                  :name="'q_' + q.id"
                  :value="optIndex"
                  v-model="selectedAnswers[q.id]"
                />
                <span class="option-text">{{ option }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="$emit('close')">Annuler</button>
          <button
            class="btn btn-primary"
            :disabled="!isAllAnswered"
            @click="submitQuiz"
          >
            Valider mes réponses
            <app-icon name="arrow-right" :size="14" />
          </button>
        </div>
      </div>

      <!-- Quiz Results / Certificate Unlocked -->
      <div v-else class="results-view animate-fade-in">
        <div class="results-icon">
          <app-icon name="check-circle" :size="40" />
        </div>
        <span class="badge badge-green">Validation Réussie</span>
        <h2>Félicitations, module validé avec succès !</h2>
        <p class="score-p">
          Score obtenu : <strong class="score-highlight">{{ calculatedScore }}%</strong> de bonnes réponses.
        </p>

        <div class="cert-unlocked-box">
          <div class="cert-icon">
            <app-icon name="award" :size="28" />
          </div>
          <div class="cert-details">
            <h4>Votre Certificat Officiel Debugger est disponible !</h4>
            <p>Il atteste de vos compétences acquises et porte l'identifiant vérifiable unique.</p>
          </div>
        </div>

        <div class="results-actions">
          <router-link :to="'/verify/' + generatedCertId" class="btn btn-accent btn-lg" @click="$emit('close')">
            Consulter & Télécharger mon Certificat
            <app-icon name="arrow-right" :size="16" />
          </router-link>
          <button class="btn btn-secondary" @click="$emit('close')">
            Continuer la formation
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue'
import { useStore } from 'vuex'
import AppIcon from '../layout/AppIcon.vue'

export default defineComponent({
  name: 'QuizModal',
  components: {
    AppIcon
  },
  props: {
    courseId: {
      type: String,
      required: true
    },
    quiz: {
      type: Object as PropType<any>,
      required: true
    }
  },
  emits: ['close'],
  setup(props) {
    const store = useStore()
    const selectedAnswers = ref<Record<string, number>>({})
    const submitted = ref(false)
    const generatedCertId = ref('')

    const isAllAnswered = computed(() => {
      return props.quiz.questions.every((q: any) => selectedAnswers.value[q.id] !== undefined)
    })

    const calculatedScore = computed(() => {
      let correct = 0
      props.quiz.questions.forEach((q: any) => {
        if (selectedAnswers.value[q.id] === q.correctAnswer) {
          correct++
        }
      })
      return Math.round((correct / props.quiz.questions.length) * 100)
    })

    const submitQuiz = () => {
      submitted.value = true
      store.dispatch('passQuiz', {
        courseId: props.courseId,
        quizId: props.quiz.id,
        scorePercent: calculatedScore.value
      })

      const enrollment = store.getters.getEnrollment(props.courseId)
      if (enrollment && enrollment.certificateId) {
        generatedCertId.value = enrollment.certificateId
      }
    }

    return {
      selectedAnswers,
      submitted,
      generatedCertId,
      isAllAnswered,
      calculatedScore,
      submitQuiz
    }
  }
})
</script>

<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1.5rem;
}

.modal-card {
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  max-width: 680px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2.5rem;
  position: relative;
  box-shadow: var(--shadow-xl);
}

.close-modal-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  color: var(--color-text-muted);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(248, 113, 113, 0.12);
    border-color: rgba(248, 113, 113, 0.3);
    color: var(--color-error);
  }
}

.modal-header {
  margin-bottom: 2rem;

  h3 {
    font-size: 1.6rem;
    color: var(--color-text);
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: var(--color-text-secondary);
    font-size: 0.95rem;
  }
}

.question-block {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.q-title {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1.25rem;

  .q-number {
    background-color: var(--color-primary);
    color: #0a1f16;
    font-weight: 700;
    font-size: 0.8rem;
    padding: 0.2rem 0.6rem;
    border-radius: var(--radius-sm);
  }

  p {
    font-weight: 700;
    color: var(--color-text);
    font-size: 1.05rem;
  }
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.option-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0.85rem 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease;

  input[type="radio"] {
    accent-color: var(--color-primary);
    width: 18px;
    height: 18px;
  }

  .option-text {
    font-size: 0.95rem;
    color: var(--color-text);
  }

  &:hover {
    border-color: var(--color-border-medium);
    background-color: var(--color-surface-hover);
  }

  &.selected {
    border-color: var(--color-primary);
    background-color: var(--color-primary-light);
  }
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.results-view {
  text-align: center;
  padding: 2rem 0;

  .results-icon {
    width: 76px;
    height: 76px;
    margin: 0 auto 1.25rem auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-primary-light);
    border: 1px solid var(--color-border-medium);
    border-radius: 50%;
    color: var(--color-primary);
  }

  h2 {
    font-size: 2rem;
    color: var(--color-text);
    margin: 1rem 0 0.5rem 0;
  }

  .score-p {
    font-size: 1.2rem;
    color: var(--color-text-secondary);
    margin-bottom: 2rem;

    .score-highlight {
      color: var(--color-primary);
      font-weight: 800;
      font-size: 1.4rem;
    }
  }
}

.cert-unlocked-box {
  background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-surface) 100%);
  border: 2px dashed var(--color-primary);
  border-radius: var(--radius-lg);
  padding: 1.75rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  text-align: left;
  margin-bottom: 2.5rem;

  .cert-icon {
    width: 60px;
    height: 60px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-surface-2);
    border: 1px solid var(--color-border-medium);
    border-radius: var(--radius-md);
    color: var(--color-primary);
  }

  h4 {
    color: var(--color-primary);
    font-size: 1.2rem;
    margin-bottom: 0.25rem;
  }

  p {
    color: var(--color-text-secondary);
    font-size: 0.9rem;
  }
}

.results-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}
</style>
