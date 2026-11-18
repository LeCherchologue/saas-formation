<template>
  <div class="about-page">
    <!-- Hero -->
    <section class="about-hero">
      <div class="container">
        <span class="badge badge-green">
          <app-icon name="sparkles" :size="12" />
          Notre mission
        </span>
        <h1>La formation professionnelle, pensée comme du code&nbsp;propre.</h1>
        <p class="hero-lead">
          Debugger est né d'un constat simple : les formations en ligne promettent beaucoup et prouvent peu.
          Nous avons construit une plateforme où chaque compétence acquise est mesurable, vérifiable et
          reconnue — avec des certificats que les recruteurs peuvent auditer en un clic.
        </p>
      </div>
    </section>

    <!-- Stats strip -->
    <section class="about-stats">
      <div class="container stats-inner">
        <div class="stat-item" v-for="stat in stats" :key="stat.label">
          <span class="stat-icon"><icon-3d :name="stat.icon3d" :size="44" /></span>
          <div class="stat-text">
            <span class="stat-num">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section values-section">
      <div class="container">
        <div class="section-header">
          <span class="subtitle">
            <app-icon name="target" :size="13" />
            Nos principes
          </span>
          <h2>Quatre engagements qui guident chaque décision produit</h2>
          <div class="section-divider"></div>
          <p>Pas de promesses vagues : chaque fonctionnalité de Debugger découle directement d'un de ces principes.</p>
        </div>

        <div class="values-grid">
          <div v-for="value in values" :key="value.title" class="value-card">
            <div class="value-icon" :style="{ color: value.accent }">
              <icon-3d :name="value.icon3d" :size="46" />
            </div>
            <h3>{{ value.title }}</h3>
            <p>{{ value.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Story timeline -->
    <section class="section story-section">
      <div class="container">
        <div class="section-header">
          <span class="subtitle">
            <app-icon name="rocket" :size="13" />
            Notre parcours
          </span>
          <h2>De l'idée à la plateforme de certification</h2>
          <div class="section-divider"></div>
        </div>

        <div class="timeline">
          <div v-for="(item, i) in timeline" :key="i" class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <span class="timeline-year">{{ item.year }}</span>
              <h4>{{ item.title }}</h4>
              <p>{{ item.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Leadership -->
    <section class="section team-section">
      <div class="container">
        <div class="section-header">
          <span class="subtitle">
            <app-icon name="users" :size="13" />
            L'équipe fondatrice
          </span>
          <h2>Des praticiens, pas seulement des pédagogues</h2>
          <div class="section-divider"></div>
          <p>Chaque parcours Debugger est conçu ou validé par des experts qui exercent encore leur métier.</p>
        </div>

        <div class="team-grid">
          <div v-for="member in team" :key="member.name" class="team-card">
            <img :src="member.avatar" :alt="member.name" class="team-avatar" />
            <h4>{{ member.name }}</h4>
            <span class="team-role">{{ member.role }}</span>
            <p>{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="about-cta-section">
      <div class="container">
        <div class="about-cta-card">
          <div class="about-cta-content">
            <h2>Prêt à transformer vos compétences en preuve concrète ?</h2>
            <p>Rejoignez la communauté Debugger, en tant qu'apprenant ou en tant qu'entreprise.</p>
          </div>
          <div class="about-cta-btns">
            <router-link to="/courses" class="btn btn-accent btn-lg">
              Explorer le catalogue
              <app-icon name="arrow-right" :size="16" />
            </router-link>
            <router-link to="/businesses" class="btn btn-ghost-white btn-lg">
              Solution entreprises
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppIcon from '../components/layout/AppIcon.vue'
import Icon3d from '../components/ui/Icon3d.vue'

export default defineComponent({
  name: 'AboutView',
  components: { AppIcon, Icon3d },
  setup() {
    const stats = [
      { icon: 'users', icon3d: 'rocket', value: '48 200+', label: 'Apprenants actifs' },
      { icon: 'award', icon3d: 'medal', value: '12 400+', label: 'Certificats délivrés' },
      { icon: 'book-open', icon3d: 'notebook', value: '7', label: 'Domaines de compétence' },
      { icon: 'star', icon3d: 'star', value: '4.9 / 5', label: 'Satisfaction moyenne' }
    ]

    const values = [
      {
        icon: 'shield-check',
        icon3d: 'shield',
        accent: '#14b8a6',
        title: 'Preuve vérifiable',
        text: 'Chaque certificat porte un identifiant cryptographique et un QR code audités en temps réel — aucune compétence affichée sans preuve.'
      },
      {
        icon: 'zap',
        icon3d: 'clock',
        accent: '#0e8fa6',
        title: 'Progression guidée',
        text: 'Un parcours progressif : leçons, quiz et exercices de code se débloquent étape par étape, sans raccourci possible.',
      },
      {
        icon: 'code',
        icon3d: 'bulb',
        accent: '#7c5cfc',
        title: 'Contenu de praticiens',
        text: 'Nos formateurs exercent encore leur métier. Les cas pratiques viennent du terrain, pas de slides génériques.'
      },
      {
        icon: 'leaf',
        icon3d: 'leaf',
        accent: '#ea7c1f',
        title: 'Accessibilité réelle',
        text: 'Une formule découverte gratuite et des parcours entreprise adaptables, pour que la montée en compétence ne soit jamais un privilège.'
      }
    ]

    const timeline = [
      { year: '2023', title: 'Le constat', text: 'Trois formateurs indépendants, frustrés par des certificats non vérifiables, posent les bases de Debugger.' },
      { year: '2024', title: 'Premiers parcours certifiants', text: 'Lancement des formations Tech & IA avec certificat à identifiant cryptographique et QR code de vérification.' },
      { year: '2025', title: 'Ouverture aux entreprises', text: 'Debugger Business voit le jour : tableau de bord RH, SSO et certificats cobrandés pour les équipes.' },
      { year: '2026', title: 'Aujourd\'hui', text: 'Sept domaines de compétence, un catalogue en expansion continue et une communauté de dizaines de milliers d\'apprenants.' }
    ]

    const team = [
      {
        name: 'Julien Faucher',
        role: 'Co-fondateur & CEO',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
        bio: 'Ex-ingénieur logiciel, convaincu que la certification doit être aussi rigoureuse qu\'une revue de code.'
      },
      {
        name: 'Dr. Sarah Kerdranvat',
        role: 'Directrice Pédagogique, Tech & IA',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
        bio: 'Ex-DeepMind Fellow, conçoit les parcours d\'intelligence artificielle générative de la plateforme.'
      },
      {
        name: 'Camille Leroy',
        role: 'Responsable Produit & Design',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
        bio: 'Principal Product Designer, garante d\'une expérience d\'apprentissage fluide sur toute la plateforme.'
      }
    ]

    return { stats, values, timeline, team }
  }
})
</script>

<style scoped lang="scss">
.about-page {
  padding-bottom: 5rem;
}

/* Hero */
.about-hero {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 5rem 0 4rem 0;
  text-align: center;

  .badge { margin-bottom: 1.25rem; }

  h1 {
    font-size: 2.75rem;
    max-width: 780px;
    margin: 0 auto 1.25rem auto;
    line-height: 1.2;
  }

  .hero-lead {
    max-width: 640px;
    margin: 0 auto;
    color: var(--color-text-secondary);
    font-size: 1.1rem;
    line-height: 1.7;
  }
}

/* Stats */
.about-stats {
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border-subtle);
  padding: 2.5rem 0;
}

.stats-inner {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex: 1;
  min-width: 180px;

  .stat-icon {
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-primary-light);
    border: var(--border-w) solid var(--color-border-medium);
    border-radius: var(--radius-md);
    color: var(--color-primary-ink);
  }

  .stat-text {
    display: flex;
    flex-direction: column;
  }

  .stat-num {
    font-family: var(--font-heading);
    font-size: 1.4rem;
    font-weight: 800;
    color: var(--color-text);
    line-height: 1.2;
  }

  .stat-label {
    font-size: 0.8rem;
    color: var(--color-text-muted);
  }
}

/* Values */
.values-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.value-card {
  background-color: var(--color-surface-2);
  border: 3px solid rgba(255, 255, 255, 0.95);
  border-radius: var(--radius-lg);
  padding: 2rem 1.5rem;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: var(--color-border-medium);
    transform: translateY(-4px);
  }

  .value-icon {
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-surface-3);
    border-radius: var(--radius-md);
    margin-bottom: 1.25rem;
  }

  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.6rem;
  }

  p {
    font-size: 0.88rem;
    color: var(--color-text-secondary);
    line-height: 1.6;
  }
  box-shadow: var(--shadow-md);
}

/* Story timeline */
.story-section { background-color: var(--color-surface); }

.timeline {
  max-width: 760px;
  margin: 0 auto;
  position: relative;
  padding-left: 2rem;
  border-left: 2px solid var(--color-border);
}

.timeline-item {
  position: relative;
  padding-bottom: 2.5rem;

  &:last-child { padding-bottom: 0; }

  .timeline-dot {
    position: absolute;
    left: -2.4rem;
    top: 0.25rem;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--color-primary);
    box-shadow: 0 0 0 4px var(--color-primary-light);
  }

  .timeline-year {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--color-primary-ink);
    letter-spacing: 0.08em;
    margin-bottom: 0.35rem;
  }

  h4 {
    font-size: 1.15rem;
    margin-bottom: 0.4rem;
  }

  p {
    color: var(--color-text-secondary);
    font-size: 0.92rem;
    line-height: 1.6;
  }
}

/* Team */
.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.team-card {
  background-color: var(--color-surface-2);
  border: 3px solid rgba(255, 255, 255, 0.95);
  border-radius: var(--radius-lg);
  padding: 2rem;
  text-align: center;

  .team-avatar {
    width: 84px;
    height: 84px;
    border-radius: 50%;
    object-fit: cover;
    margin: 0 auto 1.1rem auto;
    border: 2px solid var(--color-border-medium);
  }

  h4 {
    font-size: 1.05rem;
    margin-bottom: 0.25rem;
  }

  .team-role {
    display: block;
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--color-primary-ink);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 0.85rem;
  }

  p {
    font-size: 0.87rem;
    color: var(--color-text-secondary);
    line-height: 1.6;
  }
  box-shadow: var(--shadow-md);
}

/* CTA */
.about-cta-section {
  padding: 5rem 0;
}

.about-cta-card {
  background: linear-gradient(135deg, var(--color-primary-dark) 0%, #0a3a20 100%);
  border-radius: var(--radius-xl);
  padding: 3.5rem 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  box-shadow: var(--shadow-green-lg);

  h2 {
    color: #ffffff;
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
  }

  .about-cta-btns {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;

    .btn { display: inline-flex; align-items: center; gap: 0.5rem; }
  }
}

/* =====================================================================
   THÈME CLAY — surcharges de la page
   ===================================================================== */
.about-hero {
  background-color: transparent;
  background-image: none;
  border-bottom: none;
}

.about-stats {
  background-color: transparent;
  border: none;
}
.about-stats .stat-item {
  background-color: var(--color-surface);
  border: 3px solid rgba(255, 255, 255, 0.95);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 1rem 1.25rem;
  .stat-num { font-family: var(--font-heading); font-weight: 900; }
}
.about-stats .stat-icon,
.value-icon {
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 18px;
  background-color: var(--pastel-mint);
  box-shadow: var(--clay-inner), 3px 4px 10px rgba(19, 78, 74, 0.08);
}
.about-stats .stat-item:nth-child(2) .stat-icon { background-color: var(--pastel-butter); }
.about-stats .stat-item:nth-child(3) .stat-icon { background-color: var(--pastel-sky); }
.about-stats .stat-item:nth-child(4) .stat-icon { background-color: var(--pastel-peach); }
.value-card:nth-child(2) .value-icon { background-color: var(--pastel-sky); }
.value-card:nth-child(3) .value-icon { background-color: var(--pastel-lilac); }
.value-card:nth-child(4) .value-icon { background-color: var(--pastel-butter); }
.about-cta-card {
  --color-primary: #5eead4;
  --color-primary-ink: #5eead4;
  --color-primary-light: rgba(94, 234, 212, 0.16);
  
  border-radius: 40px;
  border: 4px solid rgba(255, 255, 255, 0.6);
  border-bottom: 4px solid rgba(255, 255, 255, 0.6);
  box-shadow: var(--shadow-xl), inset 0 4px 0 rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

@media (max-width: 1024px) {
  .values-grid { grid-template-columns: repeat(2, 1fr); }
  .team-grid { grid-template-columns: 1fr; max-width: 420px; margin: 0 auto; }
}

@media (max-width: 768px) {
  .about-hero h1 { font-size: 2.1rem; }
  .values-grid { grid-template-columns: 1fr; }
  .stats-inner { justify-content: flex-start; }
  .about-cta-card { flex-direction: column; text-align: center; justify-content: center; }
}
</style>
