<template>
  <div class="duration-slider-card">
    <div class="slider-header">
      <div class="header-left">
        <span class="badge badge-green">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          Personnalisation Signature Debugger
        </span>
        <h3 class="slider-title">Choisissez votre volume horaire d'apprentissage</h3>
      </div>
      <div class="hours-display-pill">
        <span class="hours-number">{{ currentHours }}</span>
        <span class="hours-unit">heures certifiées</span>
      </div>
    </div>

    <p class="slider-intro">
      Sur Debugger, c'est vous qui déterminez l'intensité et le volume de votre formation.
      Votre certificat officiel portera précisément la mention de ce volume d'heures.
    </p>

    <!-- Range Input -->
    <div class="range-container">
      <input
        type="range"
        :min="minHours"
        :max="maxHours"
        step="5"
        :value="currentHours"
        @input="onInput"
        class="custom-range"
      />
      <div class="range-labels">
        <span @click="setHours(minHours)" class="label-step" :class="{ active: currentHours <= 10 }">
          <strong>{{ minHours }}h</strong> Express
        </span>
        <span @click="setHours(25)" class="label-step" :class="{ active: currentHours > 10 && currentHours <= 40 }">
          <strong>25h</strong> Standard
        </span>
        <span @click="setHours(60)" class="label-step" :class="{ active: currentHours > 40 && currentHours <= 80 }">
          <strong>60h</strong> Approfondi
        </span>
        <span @click="setHours(maxHours)" class="label-step" :class="{ active: currentHours > 80 }">
          <strong>{{ maxHours }}h</strong> Expertise
        </span>
      </div>
    </div>

    <!-- Live Impact Cards -->
    <div class="impact-grid">
      <div class="impact-item">
        <div class="impact-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <polyline points="9 12 11 14 15 10"/>
          </svg>
        </div>
        <div class="impact-info">
          <span class="impact-label">Mention sur le certificat</span>
          <strong class="impact-val">{{ certificateLevelTitle }} ({{ currentHours }}h)</strong>
        </div>
      </div>

      <div class="impact-item">
        <div class="impact-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0e8fa6" stroke-width="1.5">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
        </div>
        <div class="impact-info">
          <span class="impact-label">Modules &amp; Ateliers inclus</span>
          <strong class="impact-val">{{ unlockedModulesText }}</strong>
        </div>
      </div>

      <div class="impact-item">
        <div class="impact-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c5cfc" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
        <div class="impact-info">
          <span class="impact-label">Rythme recommandé</span>
          <strong class="impact-val">{{ recommendedPace }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'DurationSlider',
  props: {
    modelValue: { type: Number, default: 25 },
    minHours: { type: Number, default: 4 },
    maxHours: { type: Number, default: 120 }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const currentHours = computed(() => props.modelValue)

    const onInput = (event: Event) => {
      const val = parseInt((event.target as HTMLInputElement).value, 10)
      emit('update:modelValue', val)
    }

    const setHours = (hrs: number) => emit('update:modelValue', hrs)

    const certificateLevelTitle = computed(() => {
      if (currentHours.value <= 10) return 'Certificat Fondamentaux Express'
      if (currentHours.value <= 40) return 'Certificat Professionnel Pratique'
      if (currentHours.value <= 80) return 'Certificat Spécialisation Avancée'
      return "Certificat d'Excellence & Maîtrise"
    })

    const unlockedModulesText = computed(() => {
      if (currentHours.value <= 10) return 'Modules essentiels + Quiz de validation'
      if (currentHours.value <= 40) return "Modules 1 à 2 + Cas d'application réels"
      if (currentHours.value <= 80) return 'Modules 1 à 3 + Pipeline RAG / Projets'
      return 'Tous les modules (1 à 4) + Projet final audité'
    })

    const recommendedPace = computed(() => {
      if (currentHours.value <= 10) return '30 min / jour sur 1 à 2 semaines'
      if (currentHours.value <= 40) return '45 min / jour sur 3 à 4 semaines'
      if (currentHours.value <= 80) return '1h / jour sur 6 à 8 semaines'
      return '1h30 / jour sur 10 à 12 semaines'
    })

    return { currentHours, onInput, setHours, certificateLevelTitle, unlockedModulesText, recommendedPace }
  }
})
</script>

<style scoped lang="scss">
.duration-slider-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-medium);
  border-radius: var(--radius-xl);
  padding: 2.5rem;
  box-shadow: var(--shadow-green);
  margin: 2rem 0;
}

.slider-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.slider-title {
  font-size: 1.5rem;
  color: var(--color-text);
  margin-top: 0.6rem;
}

.hours-display-pill {
  background-color: var(--color-primary-light);
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-full);
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  flex-shrink: 0;
  box-shadow: 0 0 20px rgba(52, 211, 153, 0.18);

  .hours-number {
    font-size: 1.8rem;
    font-weight: 800;
    line-height: 1;
    font-family: var(--font-mono);
  }

  .hours-unit {
    font-size: 0.82rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
}

.slider-intro {
  color: var(--color-text-secondary);
  font-size: 0.97rem;
  margin-bottom: 2rem;
  line-height: 1.65;
}

.range-container {
  margin-bottom: 2rem;
}

.custom-range {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  border-radius: var(--radius-full);
  background: linear-gradient(90deg, #34d399 0%, #0e8fa6 50%, #7c5cfc 100%);
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--color-text);
    border: 3px solid var(--color-primary);
    box-shadow: 0 0 12px rgba(52, 211, 153, 0.45);
    cursor: pointer;
    transition: transform 0.15s ease;

    &:hover { transform: scale(1.2); }
  }
}

.range-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  font-size: 0.83rem;
  color: var(--color-text-muted);

  .label-step {
    cursor: pointer;
    padding: 0.3rem 0.6rem;
    border-radius: var(--radius-sm);
    border: 1px solid transparent;
    transition: all 0.2s ease;
    text-align: center;

    &:hover {
      background-color: var(--color-surface-2);
      color: var(--color-primary);
      border-color: var(--color-border);
    }

    &.active {
      color: var(--color-primary);
      background-color: var(--color-primary-light);
      border-color: rgba(52, 211, 153, 0.3);
      font-weight: 600;
    }
  }
}

.impact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border-subtle);
}

.impact-item {
  background-color: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--color-border-medium);
    transform: translateY(-2px);
  }

  .impact-icon {
    width: 44px;
    height: 44px;
    background-color: var(--color-surface-3);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 1px solid var(--color-border);
  }

  .impact-info { display: flex; flex-direction: column; }

  .impact-label {
    font-size: 0.72rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.06em;
    margin-bottom: 0.25rem;
  }

  .impact-val {
    font-size: 0.88rem;
    color: var(--color-text);
    line-height: 1.3;
  }
}

@media (max-width: 768px) {
  .impact-grid { grid-template-columns: 1fr; }
  .range-labels { flex-direction: column; gap: 0.5rem; }
  .duration-slider-card { padding: 1.75rem; }
}
</style>
