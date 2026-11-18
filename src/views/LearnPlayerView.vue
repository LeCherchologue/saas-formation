<template>
  <div class="player">
    <!-- Barre du haut -->
    <header class="player-topbar">
      <router-link to="/espace" class="exit-link"><app-icon name="arrow-left" :size="16" /> Mon espace</router-link>
      <h1 class="topbar-title">{{ parcours ? parcours.course.title : 'Chargement…' }}</h1>
      <div v-if="parcours" class="topbar-progress" :aria-label="`Progression : ${parcours.progress.percent} %`">
        <span>{{ parcours.progress.done }} / {{ parcours.progress.total }} étapes</span>
        <div class="progress-track"><div class="progress-fill" :style="{ width: parcours.progress.percent + '%' }"></div></div>
        <strong>{{ parcours.progress.percent }} %</strong>
      </div>
    </header>

    <div v-if="loadError" class="state-box clay">
      <p role="alert">{{ loadError }}</p>
      <router-link :to="'/course/' + slug" class="btn btn-primary">Voir la fiche de la formation</router-link>
    </div>

    <div v-else-if="parcours" class="player-body">
      <!-- Programme -->
      <aside class="sidebar" aria-label="Programme de la formation">
        <p class="sidebar-hint"><app-icon name="lock" :size="13" /> Les étapes se débloquent dans l'ordre.</p>
        <section v-for="(mod, mi) in parcours.modules" :key="mod.id" class="side-module">
          <h2 class="side-module-title">
            <span class="mod-num" :class="{ done: mod.done }">{{ mod.done ? '✓' : mi + 1 }}</span>
            {{ mod.title }}
          </h2>
          <ol class="side-steps">
            <li v-for="step in mod.steps" :key="step.id">
              <button class="side-step" :class="[step.status, { active: current && current.id === step.id }]"
                      :aria-current="current && current.id === step.id ? 'step' : undefined"
                      @click="select(step)">
                <span class="step-ico" aria-hidden="true">
                  <app-icon v-if="step.status === 'terminee'" name="check" :size="14" />
                  <app-icon v-else-if="step.status === 'verrouillee'" name="lock" :size="13" />
                  <app-icon v-else :name="iconFor(step.type)" :size="14" />
                </span>
                <span class="step-text">
                  <span class="step-title">{{ step.title }}</span>
                  <span class="step-meta">{{ typeLabel(step.type) }} · {{ formatMinutes(step.minutes) }}</span>
                </span>
                <span class="sr-only">{{ statusLabel(step.status) }}</span>
              </button>
            </li>
          </ol>
        </section>
        <button class="side-step final" :class="{ active: showFinal, done: isComplete }" @click="openFinal">
          <span class="step-ico" aria-hidden="true"><app-icon :name="isComplete ? 'trophy' : 'lock'" :size="14" /></span>
          <span class="step-text"><span class="step-title">Certification</span><span class="step-meta">{{ certifLabel }}</span></span>
        </button>
      </aside>

      <!-- Contenu -->
      <main class="content" tabindex="-1" ref="contentEl">
        <!-- Fin de parcours -->
        <section v-if="showFinal" class="panel clay final-panel">
          <template v-if="!isComplete">
            <span class="big-ico"><icon-3d name="target" :size="64" /></span>
            <h2>Encore {{ parcours.progress.total - parcours.progress.done }} étape(s)</h2>
            <p>La certification se débloque quand toute la formation est terminée.</p>
            <button class="btn btn-primary" @click="goNext">Reprendre où j'en étais</button>
          </template>
          <template v-else-if="cert && cert.status === 'payee'">
            <span class="big-ico"><icon-3d name="trophy" :size="72" /></span>
            <h2>Félicitations, vous êtes certifié !</h2>
            <p>Certificat n° <strong>{{ cert.numero }}</strong> · score moyen {{ cert.score }} %</p>
            <router-link :to="'/certificat/' + cert.numero" class="btn btn-primary btn-lg">Voir mon certificat</router-link>
          </template>
          <template v-else-if="cert">
            <span class="big-ico"><icon-3d name="medal" :size="72" /></span>
            <h2>Formation terminée !</h2>
            <p>Votre certificat est prêt. Réglez la certification pour y accéder.</p>
            <div class="price-tag">{{ formatPrice(cert.price, cert.currency) }}</div>
            <p class="pay-methods">Airtel Money · Moov Money · Visa</p>
            <button class="btn btn-accent btn-lg" @click="showPayment = true">
              <app-icon name="credit-card" :size="18" /> Payer et obtenir mon certificat
            </button>
          </template>
        </section>

        <!-- Étape verrouillée -->
        <section v-else-if="current && current.status === 'verrouillee'" class="panel clay locked-panel">
          <span class="big-ico"><app-icon name="lock" :size="40" /></span>
          <h2>Étape verrouillée</h2>
          <p>Terminez d'abord <strong>{{ nextAvailable ? nextAvailable.title : 'les étapes précédentes' }}</strong> pour débloquer « {{ current.title }} ».</p>
          <button class="btn btn-primary" @click="goNext">Aller à l'étape en cours</button>
        </section>

        <!-- Leçon -->
        <article v-else-if="current && current.type === 'lecon'" class="panel clay">
          <span class="step-kind"><app-icon name="book-open" :size="14" /> Leçon · {{ formatMinutes(current.minutes) }}</span>
          <h2 class="panel-title">{{ current.title }}</h2>
          <div class="prose" v-html="render(current.content)"></div>
          <div v-if="current.keyPoints && current.keyPoints.length" class="takeaways">
            <h3><app-icon name="lightbulb" :size="16" /> Points clés à retenir</h3>
            <ul><li v-for="(p, i) in current.keyPoints" :key="i">{{ p }}</li></ul>
          </div>
          <div class="panel-actions">
            <button v-if="current.status === 'disponible'" class="btn btn-primary btn-lg" :disabled="busy" @click="completeLesson">
              {{ busy ? 'Enregistrement…' : 'J\'ai terminé cette leçon' }} <app-icon name="arrow-right" :size="16" />
            </button>
            <template v-else>
              <span class="done-chip"><app-icon name="check" :size="14" /> Leçon terminée</span>
              <button class="btn btn-secondary" @click="goNext">Étape suivante <app-icon name="arrow-right" :size="16" /></button>
            </template>
          </div>
        </article>

        <!-- Quiz -->
        <section v-else-if="current && current.type === 'quiz'" class="panel clay">
          <span class="step-kind"><app-icon name="target" :size="14" /> Quiz de validation · {{ threshold }} % requis</span>
          <h2 class="panel-title">{{ current.title }}</h2>

          <div v-if="current.status === 'terminee' && !quizResult" class="quiz-done">
            <span class="done-chip"><app-icon name="check" :size="14" /> Quiz validé avec {{ current.score }} %</span>
            <button class="btn btn-secondary" @click="goNext">Étape suivante <app-icon name="arrow-right" :size="16" /></button>
          </div>

          <form v-else @submit.prevent="submitQuiz">
            <fieldset v-for="(q, qi) in current.questions" :key="q.id" class="question" :class="questionClass(q.id)">
              <legend><span class="q-num">{{ qi + 1 }}</span> {{ q.question }}</legend>
              <label v-for="(opt, oi) in q.options" :key="oi" class="option"
                     :class="{ selected: answers[q.id] === oi, right: correction(q.id) && correction(q.id).answer === oi }">
                <input type="radio" :name="'q' + q.id" :value="oi" v-model="answers[q.id]" :disabled="quizResult && quizResult.passed" />
                <span>{{ opt }}</span>
              </label>
              <p v-if="correction(q.id) && correction(q.id).explanation" class="explanation">{{ correction(q.id).explanation }}</p>
            </fieldset>

            <div v-if="quizResult" class="quiz-result" :class="quizResult.passed ? 'ok' : 'ko'" role="status">
              <strong>Score : {{ quizResult.score }} %</strong>
              <span v-if="quizResult.passed">Quiz validé, l'étape suivante est débloquée.</span>
              <span v-else>Il faut au moins {{ quizResult.threshold }} %. Les questions en rouge sont à revoir.</span>
            </div>

            <div class="panel-actions">
              <button v-if="!quizResult || !quizResult.passed" type="submit" class="btn btn-primary btn-lg" :disabled="busy || !allAnswered">
                {{ busy ? 'Correction…' : (quizResult ? 'Réessayer' : 'Valider mes réponses') }}
              </button>
              <button v-else type="button" class="btn btn-primary btn-lg" @click="goNext">Continuer <app-icon name="arrow-right" :size="16" /></button>
            </div>
          </form>
        </section>

        <!-- Dépôt de code -->
        <section v-else-if="current && current.type === 'devoir'" class="panel clay">
          <span class="step-kind"><app-icon name="code" :size="14" /> Exercice à rendre</span>
          <h2 class="panel-title">{{ current.title }}</h2>
          <div class="prose consigne" v-html="render(current.instructions)"></div>

          <div v-if="current.submission" class="submission" :class="current.submission.status">
            <app-icon :name="current.submission.status === 'refuse' ? 'alert-triangle' : 'check-circle'" :size="18" />
            <div>
              <strong>{{ current.submission.fileName }}</strong> · {{ formatSize(current.submission.size) }}
              <span class="sub-status">{{ submissionLabel(current.submission.status) }}</span>
              <p v-if="current.submission.comment" class="sub-comment">Commentaire : {{ current.submission.comment }}</p>
            </div>
          </div>

          <div v-if="current.status === 'disponible'" class="dropzone" :class="{ over: dragOver }"
               @dragover.prevent="dragOver = true" @dragleave="dragOver = false" @drop.prevent="onDrop">
            <span class="big-ico small"><app-icon name="upload" :size="26" /></span>
            <p><strong>Déposez votre fichier ici</strong> ou</p>
            <label class="btn btn-secondary">
              Choisir un fichier
              <input type="file" class="sr-only" :accept="(current.extensions || []).join(',')" @change="onPick" />
            </label>
            <p class="dz-hint">Formats acceptés : {{ (current.extensions || []).join(', ') }} · {{ current.maxSizeMb }} Mo maximum</p>
            <p v-if="file" class="dz-file">{{ file.name }} · {{ formatSize(file.size) }}</p>
            <button class="btn btn-primary btn-lg" :disabled="!file || busy" @click="upload">
              {{ busy ? 'Envoi en cours…' : 'Envoyer mon code' }}
            </button>
          </div>
          <div v-else class="panel-actions">
            <button class="btn btn-secondary" @click="goNext">Étape suivante <app-icon name="arrow-right" :size="16" /></button>
          </div>
        </section>

        <p v-if="actionError" class="form-error" role="alert">{{ actionError }}</p>
      </main>
    </div>

    <div v-else class="state-box"><p>Chargement de votre parcours…</p></div>

    <payment-modal v-if="showPayment && cert" :certification="cert" @close="showPayment = false" @paid="onPaid" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, reactive, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import AppIcon from '../components/layout/AppIcon.vue'
import Icon3d from '../components/ui/Icon3d.vue'
import PaymentModal from '../components/payment/PaymentModal.vue'
import { learningApi } from '../api'
import { Parcours, Step, StepType, StepStatus, QuizResult } from '../api/types'
import { renderMarkdown } from '../utils/markdown'
import { formatMinutes, formatPrice, formatSize } from '../utils/format'

export default defineComponent({
  name: 'LearnPlayerView',
  components: { AppIcon, Icon3d, PaymentModal },
  setup () {
    const route = useRoute()
    const store = useStore()
    const slug = String(route.params.slug)

    const parcours = ref<Parcours | null>(null)
    const loadError = ref('')
    const currentId = ref<number | null>(null)
    const showFinal = ref(false)
    const busy = ref(false)
    const actionError = ref('')
    const answers = reactive<Record<number, number>>({})
    const quizResult = ref<QuizResult | null>(null)
    const file = ref<File | null>(null)
    const dragOver = ref(false)
    const showPayment = ref(false)
    const contentEl = ref<HTMLElement | null>(null)

    const allSteps = computed<Step[]>(() => parcours.value ? parcours.value.modules.flatMap(m => m.steps) : [])
    const current = computed(() => allSteps.value.find(s => s.id === currentId.value) || null)
    const nextAvailable = computed(() => allSteps.value.find(s => s.status === 'disponible') || null)
    const isComplete = computed(() => !!parcours.value && parcours.value.progress.done === parcours.value.progress.total)
    const cert = computed(() => parcours.value ? parcours.value.certification : null)
    const threshold = 70
    const allAnswered = computed(() => !!current.value && (current.value.questions || []).every(q => answers[q.id] !== undefined))
    const certifLabel = computed(() => {
      if (!cert.value) return 'Après la dernière étape'
      return cert.value.status === 'payee' ? 'Obtenue' : 'À régler'
    })

    const resetStepState = () => {
      actionError.value = ''
      quizResult.value = null
      file.value = null
      Object.keys(answers).forEach(k => delete answers[Number(k)])
    }

    const focusContent = () => nextTick(() => { if (contentEl.value) contentEl.value.focus({ preventScroll: true }); window.scrollTo({ top: 0 }) })

    const goNext = () => {
      resetStepState()
      if (nextAvailable.value) {
        showFinal.value = false
        currentId.value = nextAvailable.value.id
      } else {
        showFinal.value = true
      }
      focusContent()
    }

    const load = async (advance = false) => {
      try {
        parcours.value = await learningApi.parcours(slug)
        loadError.value = ''
        if (advance || currentId.value === null) goNext()
      } catch (e: any) {
        loadError.value = e.status === 403 ? 'Vous n\'êtes pas encore inscrit à cette formation.' : e.message
      }
    }

    const select = (step: Step) => {
      resetStepState()
      showFinal.value = false
      currentId.value = step.id
      focusContent()
    }
    const openFinal = () => { resetStepState(); showFinal.value = true; focusContent() }

    const run = async (fn: () => Promise<void>) => {
      busy.value = true
      actionError.value = ''
      try { await fn() } catch (e: any) { actionError.value = e.message } finally { busy.value = false }
    }

    const completeLesson = () => run(async () => {
      if (!current.value) return
      await learningApi.completeLesson(current.value.id)
      await load(true)
    })

    const submitQuiz = () => run(async () => {
      if (!current.value) return
      const payload: Record<string, number> = {}
      Object.entries(answers).forEach(([k, v]) => { payload[k] = v })
      const result = await learningApi.submitQuiz(current.value.id, payload)
      quizResult.value = result
      if (result.passed) {
        const keep = result
        parcours.value = await learningApi.parcours(slug)
        quizResult.value = keep // on garde l'affichage des corrections jusqu'au clic sur « Continuer »
      }
    })

    const correction = (qid: number) => quizResult.value ? quizResult.value.corrections.find(c => c.questionId === qid) : undefined
    const questionClass = (qid: number) => {
      const c = correction(qid)
      return c ? (c.correct ? 'is-right' : 'is-wrong') : ''
    }

    const pickFile = (f: File | undefined | null) => {
      actionError.value = ''
      if (!f || !current.value) return
      const ext = '.' + (f.name.split('.').pop() || '').toLowerCase()
      if (current.value.extensions && !current.value.extensions.includes(ext)) {
        actionError.value = `Format refusé. Formats acceptés : ${current.value.extensions.join(', ')}`
        return
      }
      if (current.value.maxSizeMb && f.size > current.value.maxSizeMb * 1024 * 1024) {
        actionError.value = `Fichier trop lourd (maximum ${current.value.maxSizeMb} Mo).`
        return
      }
      file.value = f
    }
    const onPick = (e: Event) => pickFile((e.target as HTMLInputElement).files?.[0])
    const onDrop = (e: DragEvent) => { dragOver.value = false; pickFile(e.dataTransfer?.files?.[0]) }

    const upload = () => run(async () => {
      if (!current.value || !file.value) return
      await learningApi.uploadCode(current.value.id, file.value)
      await load(true)
    })

    const onPaid = async () => {
      await load()
      store.dispatch('fetchMySpace')
    }

    const iconFor = (t: StepType) => ({ lecon: 'book-open', quiz: 'target', devoir: 'code' }[t])
    const typeLabel = (t: StepType) => ({ lecon: 'Leçon', quiz: 'Quiz', devoir: 'Dépôt de code' }[t])
    const statusLabel = (s: StepStatus) => ({ terminee: 'terminée', disponible: 'à faire maintenant', verrouillee: 'verrouillée' }[s])
    const submissionLabel = (s: string) => ({ soumis: 'Envoyé', valide: 'Validé par le formateur', refuse: 'Refusé : renvoyez une nouvelle version' }[s] || s)

    onMounted(() => load())

    return {
      slug, parcours, loadError, current, nextAvailable, showFinal, busy, actionError, answers, quizResult,
      file, dragOver, showPayment, contentEl, isComplete, cert, threshold, allAnswered, certifLabel,
      select, openFinal, goNext, completeLesson, submitQuiz, correction, questionClass, onPick, onDrop, upload, onPaid,
      iconFor, typeLabel, statusLabel, submissionLabel, render: renderMarkdown, formatMinutes, formatPrice, formatSize
    }
  }
})
</script>

<style scoped lang="scss">
.player { min-height: 100vh; display: flex; flex-direction: column; }

.player-topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(14px);
  box-shadow: 0 6px 20px rgba(19, 78, 74, 0.08);
}
.exit-link {
  display: inline-flex; align-items: center; gap: 0.4rem; min-height: 40px; padding: 0 0.9rem;
  border-radius: 12px; font-weight: 800; font-family: var(--font-heading);
  background: var(--color-surface-3); box-shadow: var(--shadow-sm); white-space: nowrap;
}
.topbar-title { flex: 1; font-size: 1.05rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.topbar-progress {
  display: flex; align-items: center; gap: 0.75rem; font-size: 0.85rem; color: var(--color-text-secondary);
  strong { color: var(--color-text); font-family: var(--font-heading); }
}
.progress-track {
  width: 160px; height: 12px; border-radius: var(--radius-full);
  background: var(--color-surface-3); box-shadow: var(--shadow-pressed); overflow: hidden;
}
.progress-fill {
  height: 100%; border-radius: var(--radius-full); background: var(--color-primary);
  box-shadow: inset 0 -2px 0 rgba(4, 47, 46, 0.15), inset 0 2px 0 rgba(255, 255, 255, 0.4);
  transition: width 0.5s var(--ease-out);
}

.player-body {
  flex: 1;
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 1.5rem;
  padding: 1.5rem;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
}

/* Programme */
.sidebar {
  align-self: start;
  position: sticky;
  top: 84px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  padding: 1rem;
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.75);
  border: 3px solid rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow-md);
}
.sidebar-hint { display: flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; color: var(--color-text-muted); margin-bottom: 0.75rem; }
.side-module { margin-bottom: 1rem; }
.side-module-title { display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.95rem; margin-bottom: 0.5rem; }
.mod-num {
  flex-shrink: 0; width: 28px; height: 28px; border-radius: 10px; display: flex; align-items: center; justify-content: center;
  background: var(--pastel-mint); color: var(--color-primary-ink); font-weight: 900; box-shadow: var(--clay-inner);
  &.done { background: var(--color-primary); color: var(--color-on-primary); }
}
.side-steps { list-style: none; display: grid; gap: 0.35rem; }
.side-step {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  min-height: 52px;
  padding: 0.5rem 0.7rem;
  border-radius: 14px;
  text-align: left;
  border: 2px solid transparent;
  transition: background-color 0.2s ease, transform 0.2s var(--ease-bounce);
  &:hover { background: var(--color-surface-3); }
  &.active { background: var(--color-surface); border-color: var(--color-primary); box-shadow: var(--shadow-sm); }
  &.verrouillee { opacity: 0.6; }
  &.final { margin-top: 0.5rem; background: var(--pastel-butter); }
}
.step-ico {
  flex-shrink: 0; width: 30px; height: 30px; border-radius: 10px; display: flex; align-items: center; justify-content: center;
  background: var(--color-surface-3); color: var(--color-text-secondary);
  .terminee & { background: var(--color-primary); color: var(--color-on-primary); }
  .disponible & { background: var(--pastel-butter); color: #854d0e; }
}
.step-text { display: grid; min-width: 0; }
.step-title { font-size: 0.86rem; font-weight: 700; line-height: 1.3; }
.step-meta { font-size: 0.75rem; color: var(--color-text-muted); }

/* Contenu */
.content { min-width: 0; outline: none; }
.panel { padding: 2.25rem; border-width: 4px; }
.step-kind {
  display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.3rem 0.8rem; border-radius: var(--radius-full);
  background: var(--pastel-mint); color: var(--color-primary-ink); font-weight: 800; font-size: 0.8rem; font-family: var(--font-heading);
}
.panel-title { font-size: clamp(1.5rem, 2.6vw, 2rem); margin: 0.9rem 0 1.25rem; text-wrap: balance; }
.prose {
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--color-text-secondary);
  max-width: 72ch;
  :deep(p), :deep(ul), :deep(ol) { margin-bottom: 1rem; }
  :deep(ul), :deep(ol) { padding-left: 1.4rem; }
  :deep(li) { margin-bottom: 0.4rem; }
  :deep(strong) { color: var(--color-text); }
  :deep(code) {
    font-family: var(--font-mono); font-size: 0.88em; padding: 0.1rem 0.4rem; border-radius: 6px;
    background: var(--pastel-mint); color: var(--color-primary-ink);
  }
}
.takeaways {
  margin-top: 1.5rem; padding: 1.25rem 1.5rem; border-radius: var(--radius-lg);
  background: var(--pastel-butter); box-shadow: var(--clay-inner);
  h3 { display: flex; align-items: center; gap: 0.5rem; font-size: 1rem; color: #854d0e; margin-bottom: 0.6rem; }
  ul { padding-left: 1.2rem; display: grid; gap: 0.35rem; }
}
.panel-actions { margin-top: 2rem; display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; }
.done-chip {
  display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.5rem 1rem; border-radius: var(--radius-full);
  background: var(--pastel-mint); color: var(--color-primary-ink); font-weight: 800;
}
.quiz-done { display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; }

/* Quiz */
.question {
  border: none;
  padding: 1.25rem;
  margin-bottom: 1rem;
  border-radius: var(--radius-lg);
  background: var(--color-surface-3);
  box-shadow: var(--shadow-pressed);
  legend { font-weight: 800; font-family: var(--font-heading); font-size: 1.02rem; margin-bottom: 0.75rem; display: flex; gap: 0.6rem; float: left; width: 100%; }
  &.is-wrong { box-shadow: inset 0 0 0 3px #fca5a5, var(--shadow-pressed); }
  &.is-right { box-shadow: inset 0 0 0 3px var(--color-border-medium), var(--shadow-pressed); }
}
.q-num {
  flex-shrink: 0; width: 26px; height: 26px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center;
  background: var(--color-surface); font-size: 0.85rem; box-shadow: var(--shadow-sm);
}
.option {
  clear: both;
  display: flex; align-items: center; gap: 0.75rem; min-height: 48px; padding: 0.5rem 0.9rem; margin-top: 0.4rem;
  border-radius: 12px; background: var(--color-surface); border: 2px solid transparent; cursor: pointer;
  transition: border-color 0.2s ease;
  input { accent-color: var(--color-primary-dark); width: 18px; height: 18px; }
  &.selected { border-color: var(--color-primary); }
  &.right { border-color: var(--color-primary-dark); background: var(--pastel-mint); }
}
.explanation { margin-top: 0.75rem; font-size: 0.9rem; color: var(--color-text-secondary); }
.quiz-result {
  display: grid; gap: 0.2rem; padding: 1rem 1.25rem; border-radius: var(--radius-md); margin-top: 0.5rem;
  &.ok { background: var(--pastel-mint); color: var(--color-primary-ink); }
  &.ko { background: #fee2e2; color: #991b1b; }
}

/* Dépôt */
.consigne { background: var(--color-surface-3); border-radius: var(--radius-lg); padding: 1.25rem 1.5rem; box-shadow: var(--shadow-pressed); }
.submission {
  margin-top: 1.25rem; display: flex; gap: 0.75rem; align-items: flex-start; padding: 1rem 1.25rem;
  border-radius: var(--radius-md); background: var(--pastel-mint); color: var(--color-primary-ink);
  &.refuse { background: #fee2e2; color: #991b1b; }
  .sub-status { display: block; font-size: 0.85rem; font-weight: 700; }
  .sub-comment { margin-top: 0.3rem; font-size: 0.9rem; }
}
.dropzone {
  margin-top: 1.5rem; padding: 2rem; border-radius: var(--radius-lg); text-align: center;
  border: 3px dashed var(--color-border-medium); background: rgba(204, 251, 241, 0.35);
  display: grid; justify-items: center; gap: 0.6rem;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  &.over { background: var(--pastel-mint); border-color: var(--color-primary); }
}
.dz-hint { font-size: 0.85rem; color: var(--color-text-muted); }
.dz-file { font-weight: 700; }

/* Panneaux d'état */
.final-panel, .locked-panel { text-align: center; display: grid; justify-items: center; gap: 0.75rem; padding: 3rem 2rem; }
.big-ico {
  width: 104px; height: 104px; border-radius: 30px; display: flex; align-items: center; justify-content: center;
  background: var(--pastel-butter); box-shadow: var(--clay-inner), var(--shadow-md); color: var(--color-text-secondary);
  &.small { width: 64px; height: 64px; border-radius: 20px; background: var(--color-surface); }
}
.price-tag { font-family: var(--font-heading); font-weight: 900; font-size: 2.4rem; }
.pay-methods { color: var(--color-text-muted); font-weight: 700; }
.state-box { margin: 3rem auto; max-width: 520px; padding: 2rem; text-align: center; display: grid; gap: 1rem; justify-items: center; }
.form-error { margin-top: 1rem; background: #fee2e2; color: #991b1b; border-radius: var(--radius-sm); padding: 0.75rem 1rem; font-weight: 600; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

@media (max-width: 960px) {
  .player-body { grid-template-columns: 1fr; padding: 1rem; }
  .sidebar { position: static; max-height: none; }
  .topbar-progress .progress-track { width: 90px; }
  .topbar-title { display: none; }
  .panel { padding: 1.5rem; }
}
</style>
