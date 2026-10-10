<template>
  <div class="business-page">
    <!-- Hero B2B -->
    <div class="biz-hero">
      <div class="container biz-hero-inner">
        <div class="biz-hero-text">
          <span class="badge badge-yellow">Debugger Entreprises & RH</span>
          <h1>Accélérez la montée en compétences de vos équipes</h1>
          <p>
            Offrez à vos collaborateurs des parcours de formation certifiants, auto-rythmés et adaptés aux impératifs opérationnels de votre entreprise.
          </p>
          <div class="biz-hero-btns">
            <a href="#quote-form" class="btn btn-accent btn-lg">
              Demander un devis d'équipe
              <app-icon name="arrow-right" :size="16" />
            </a>
            <router-link to="/courses" class="btn btn-secondary btn-lg">Consulter les programmes</router-link>
          </div>
        </div>

        <div class="biz-hero-visual">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" alt="Équipe en formation" class="biz-hero-img" />
        </div>
      </div>
    </div>

    <!-- Key B2B Benefits -->
    <div class="container section">
      <div class="section-header">
        <span class="subtitle">Avantages Entreprise</span>
        <h2>Pourquoi les leaders choisissent Debugger Business</h2>
        <p>Une solution flexible et sans contrainte logistique pour former de 5 à plus de 5 000 collaborateurs.</p>
      </div>

      <div class="biz-features-grid">
        <div class="biz-feature-card">
          <div class="f-icon"><app-icon name="bar-chart" :size="24" /></div>
          <h3>Tableau de bord RH complet</h3>
          <p>Suivez les heures réelles d'apprentissage, les taux de complétion et les compétences validées par vos équipes en temps réel.</p>
        </div>

        <div class="biz-feature-card">
          <div class="f-icon"><app-icon name="clock" :size="24" /></div>
          <h3>Zéro perturbation de l'activité</h3>
          <p>Vos collaborateurs apprennent de 30 minutes à 2h par semaine selon leurs disponibilités, avec des leçons fragmentées et efficaces.</p>
        </div>

        <div class="biz-feature-card">
          <div class="f-icon"><app-icon name="award" :size="24" /></div>
          <h3>Certifications reconnues & Cobrandées</h3>
          <p>Délivrez des certificats portant le logo officiel de votre société et validés par l'organisme accréditeur Debugger.</p>
        </div>

        <div class="biz-feature-card">
          <div class="f-icon"><app-icon name="briefcase" :size="24" /></div>
          <h3>Formateurs d'élite</h3>
          <p>Des enseignements dispensés par des professionnels en poste dans les plus grandes entreprises innovantes.</p>
        </div>
      </div>
    </div>

    <!-- Form Section -->
    <div id="quote-form" class="container section">
      <div class="quote-card">
        <div class="quote-header">
          <h2>Demande de devis & Démo personnalisée</h2>
          <p>Remplissez ce formulaire et recevez une proposition sur-mesure sous 24h ouvrées.</p>
        </div>

        <form @submit.prevent="submitForm" class="quote-form-grid">
          <div class="form-group">
            <label>Votre Nom & Prénom</label>
            <input type="text" v-model="form.name" required placeholder="Ex: Claire Martin" />
          </div>

          <div class="form-group">
            <label>Email Professionnel</label>
            <input type="email" v-model="form.email" required placeholder="Ex: claire.martin@entreprise.com" />
          </div>

          <div class="form-group">
            <label>Entreprise & Fonction</label>
            <input type="text" v-model="form.company" required placeholder="Ex: TechCorp - DRH" />
          </div>

          <div class="form-group">
            <label>Nombre de collaborateurs à former</label>
            <select v-model="form.teamSize">
              <option value="5-20">5 à 20 personnes</option>
              <option value="20-100">20 à 100 personnes</option>
              <option value="100-500">100 à 500 personnes</option>
              <option value="500+">Plus de 500 personnes</option>
            </select>
          </div>

          <div class="form-group full-width">
            <label>Besoins prioritaires & Thématiques ciblées</label>
            <textarea v-model="form.notes" rows="4" placeholder="Ex: Montée en compétences sur l'IA générative et la cybersécurité..."></textarea>
          </div>

          <div class="full-width text-center">
            <button type="submit" class="btn btn-primary btn-lg" :disabled="sent">
              <app-icon v-if="sent" name="check" :size="16" />
              <span v-if="sent">Demande envoyée avec succès !</span>
              <template v-else>
                Envoyer ma demande de devis
                <app-icon name="arrow-right" :size="16" />
              </template>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AppIcon from '../components/layout/AppIcon.vue'

export default defineComponent({
  name: 'BusinessView',
  components: {
    AppIcon
  },
  setup() {
    const form = ref({
      name: '',
      email: '',
      company: '',
      teamSize: '20-100',
      notes: ''
    })
    const sent = ref(false)

    const submitForm = () => {
      sent.value = true
      setTimeout(() => {
        alert('Merci ! Notre équipe B2B vous contactera sous 24h avec un devis adapté.')
      }, 300)
    }

    return {
      form,
      sent,
      submitForm
    }
  }
})
</script>

<style scoped lang="scss">
.biz-hero {
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
  padding: 4.5rem 0;
}

.biz-hero-inner {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3.5rem;
  align-items: center;
}

.biz-hero-text {
  h1 {
    font-size: 3rem;
    color: var(--color-text);
    margin: 1rem 0 1.25rem 0;
    line-height: 1.15;
  }

  p {
    font-size: 1.15rem;
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin-bottom: 2rem;
  }
}

.biz-hero-btns {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.biz-hero-visual {
  .biz-hero-img {
    width: 100%;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-xl);
    object-fit: cover;
  }
}

.biz-features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.biz-feature-card {
  background-color: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2rem 1.5rem;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md), var(--shadow-green);
    border-color: var(--color-primary);
  }

  .f-icon {
    width: 52px;
    height: 52px;
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-primary-light);
    border: 1px solid var(--color-border-medium);
    border-radius: var(--radius-md);
    color: var(--color-primary);
  }

  h3 {
    font-size: 1.2rem;
    color: var(--color-text);
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.92rem;
    color: var(--color-text-secondary);
    line-height: 1.5;
  }
}

/* Quote Card Form */
.quote-card {
  background: var(--color-surface-2);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-xl);
  padding: 3.5rem;
  max-width: 840px;
  margin: 0 auto;
}

.quote-header {
  text-align: center;
  margin-bottom: 2.5rem;

  h2 {
    font-size: 2rem;
    color: var(--color-text);
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--color-text-secondary);
  }
}

.quote-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  .full-width {
    grid-column: 1 / -1;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--color-text);
    }

    input, select, textarea {
      background-color: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: 0.8rem 1rem;
      font-size: 0.95rem;
      color: var(--color-text);
      outline: none;
      transition: border-color 0.2s ease;

      &::placeholder { color: var(--color-text-muted); }

      &:focus {
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.15);
      }
    }

    select option {
      background-color: var(--color-surface-2);
      color: var(--color-text);
    }
  }
}

.btn.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

@media (max-width: 1024px) {
  .biz-hero-inner {
    grid-template-columns: 1fr;
  }

  .biz-features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .biz-features-grid {
    grid-template-columns: 1fr;
  }

  .quote-form-grid {
    grid-template-columns: 1fr;
  }

  .quote-card {
    padding: 2rem 1.5rem;
  }
}
</style>
