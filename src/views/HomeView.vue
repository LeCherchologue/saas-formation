<template>
  <div class="home-page">

    <!-- ======== HERO ======== -->
    <section class="hero-section">
      <div class="container hero-inner">
        <div class="hero-left">
          <div class="hero-pill">
            <span class="pulse-ring"></span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            Plateforme SaaS de Formation Certifiante
          </div>

          <h1 class="hero-title">
            Montez en compétences.<br />
            <span class="hero-title-green">Débuggez votre carrière.</span>
          </h1>

          <p class="hero-desc">
            Des formations professionnelles modulables créées par des experts.
            Choisissez votre volume de <span class="code-inline">&lt;4h /&gt;</span> à <span class="code-inline">&lt;120h /&gt;</span>,
            validez vos acquis et obtenez un certificat officiel reconnu.
          </p>

          <div class="hero-ctas">
            <router-link to="/courses" class="btn btn-accent btn-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              Explorer les formations
            </router-link>
            <router-link to="/plans" class="btn btn-secondary btn-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              Voir les formules
            </router-link>
          </div>

          <div class="hero-social-proof">
            <div class="avatars-row">
              <img v-for="(src, i) in avatarUrls" :key="i" :src="src" alt="Apprenant" />
            </div>
            <div class="proof-text">
              <div class="stars-row">
                <svg v-for="i in 5" :key="i" width="14" height="14" viewBox="0 0 24 24" fill="#facc15"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <strong>4.9 / 5.0</strong>
              </div>
              <span>+250 000 professionnels formés</span>
            </div>
          </div>
        </div>

        <!-- Hero right: floating card with live hours customizer -->
        <div class="hero-right">
          <div class="hero-card">
            <div class="hero-card-top-badge">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              Accès Immédiat · 0€ de base
            </div>

            <div class="card-course-pick" @click="$router.push('/course/intelligence-artificielle-generative-prompting')">
              <div class="pick-icon-wrap">
                <!-- AI circuit icon -->
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="1.5">
                  <circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/><path d="M5.64 5.64l2.12 2.12m8.49 8.49l2.12 2.12M5.64 18.36l2.12-2.12m8.49-8.49l2.12-2.12"/>
                </svg>
              </div>
              <div class="pick-text">
                <span class="pick-cat">IA Générative &amp; Prompt Engineering</span>
                <span class="pick-meta">4.94 ★ · 25h recommandées</span>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </div>

            <div class="card-hour-widget">
              <div class="widget-header">
                <span>Volume horaire</span>
                <span class="hours-tag">{{ heroHours }}h</span>
              </div>
              <input type="range" min="4" max="120" step="4" v-model.number="heroHours" class="debug-range" />
              <div class="widget-result">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span>Certificat : <strong>{{ getLevel(heroHours) }}</strong></span>
              </div>
            </div>

            <router-link to="/course/intelligence-artificielle-generative-prompting" class="btn btn-primary btn-block">
              Démarrer en {{ heroHours }}h →
            </router-link>

            <div class="card-security-note">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Certificat officiel QR code inclus
            </div>
          </div>
        </div>
      </div>

      <!-- Code terminal decoration -->
      <div class="terminal-deco" aria-hidden="true">
        <div class="term-bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></div>
        <code class="term-code">
          <span class="c-gray">// Debugger Formation — Lancez votre progression</span><br />
          <span class="c-green">const</span> <span class="c-blue">formation</span> = <span class="c-green">new</span> <span class="c-text">Formation</span>(<span class="c-yellow">'{{ activeCourseName }}'</span>);<br />
          <span class="c-blue">formation</span>.<span class="c-text">setHours</span>(<span class="c-yellow">{{ heroHours }}</span>).<span class="c-text">getCertified</span>();
        </code>
      </div>
    </section>

    <!-- ======== STATS STRIP ======== -->
    <section class="stats-strip">
      <div class="container stats-inner">
        <div class="stat-item" v-for="stat in stats" :key="stat.label">
          <span class="stat-icon">
            <svg :viewBox="stat.icon.viewBox" width="20" height="20" fill="none" stroke="#34d399" stroke-width="1.5" v-html="stat.icon.path"></svg>
          </span>
          <div class="stat-text">
            <span class="stat-num">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ======== WHY DEBUGGER (3 big feature cards) ======== -->
    <section class="section why-section">
      <div class="container">
        <div class="section-header">
          <span class="subtitle">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            Pourquoi Debugger ?
          </span>
          <h2>Une méthode d'apprentissage taillée pour l'impact</h2>
          <div class="section-divider"></div>
          <p>Dépassez les formations figées grâce à une flexibilité totale et une reconnaissance immédiate de vos compétences.</p>
        </div>

        <div class="why-cards">
          <div v-for="card in whyCards" :key="card.title" class="why-card" :style="{ '--card-accent': card.accent }">
            <div class="why-card-header">
              <div class="why-icon" :style="{ color: card.accent }">
                <svg :viewBox="card.icon.viewBox" width="28" height="28" fill="none" :stroke="card.accent" stroke-width="1.5" v-html="card.icon.path"></svg>
              </div>
              <span class="why-num">0{{ card.num }}</span>
            </div>
            <h3>{{ card.title }}</h3>
            <p>{{ card.text }}</p>
            <router-link :to="card.link" class="why-link">
              {{ card.cta }}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- ======== INTERACTIVE DURATION SIMULATOR ======== -->
    <section class="section simulator-section">
      <div class="container sim-wrapper">
        <div class="section-header">
          <span class="subtitle">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Flexibilité Signature Debugger
          </span>
          <h2>Simulateur de charge &amp; certification</h2>
          <div class="section-divider"></div>
          <p>Glissez le curseur pour visualiser comment votre programme et votre certificat s'ajustent en temps réel.</p>
        </div>
        <duration-slider v-model="simHours" :min-hours="4" :max-hours="120" />
        <div class="sim-cta">
          <router-link :to="'/courses?hours=' + simHours" class="btn btn-accent btn-lg">
            Trouver ma formation en {{ simHours }}h →
          </router-link>
        </div>
      </div>
    </section>

    <!-- ======== COURSES CATALOGUE ======== -->
    <section class="section catalogue-section">
      <div class="container">
        <div class="section-header">
          <span class="subtitle">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            Catalogue Debugger
          </span>
          <h2>Formations plébiscitées par la communauté</h2>
          <div class="section-divider"></div>
          <p>Des compétences actionnables pour évoluer dans votre poste ou vous reconvertir.</p>
        </div>

        <!-- Category chips -->
        <div class="cat-chips">
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="cat-chip"
            :class="{ active: activeCat === cat.id }"
            @click="activeCat = cat.id"
          >
            <svg :viewBox="cat.icon.viewBox" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" v-html="cat.icon.path"></svg>
            {{ cat.label }}
          </button>
        </div>

        <div class="courses-grid">
          <course-card v-for="c in visibleCourses" :key="c.id" :course="c" />
        </div>

        <div class="catalogue-see-all">
          <router-link to="/courses" class="btn btn-secondary btn-lg">
            Voir toutes les formations ({{ totalCount }})
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ======== HOW IT WORKS ======== -->
    <section class="section how-section">
      <div class="container">
        <div class="section-header">
          <span class="subtitle">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            Fonctionnement
          </span>
          <h2>De l'inscription au diplôme en 4 étapes</h2>
          <div class="section-divider"></div>
        </div>

        <div class="steps-grid">
          <div v-for="(step, i) in steps" :key="i" class="step-card">
            <div class="step-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="step-icon-box">
              <svg :viewBox="step.icon.viewBox" width="24" height="24" fill="none" stroke="#34d399" stroke-width="1.5" v-html="step.icon.path"></svg>
            </div>
            <h4>{{ step.title }}</h4>
            <p>{{ step.text }}</p>
            <div class="step-connector" v-if="i < steps.length - 1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ======== B2B CTA BANNER ======== -->
    <section class="b2b-banner-section">
      <div class="container">
        <div class="b2b-card">
          <div class="b2b-content">
            <span class="badge badge-yellow">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              Solution Entreprises
            </span>
            <h2>Former vos équipes avec Debugger Business</h2>
            <p>Catalogue illimité, tableau de bord RH, certifications cobrandées et account manager dédié pour des équipes de 5 à 5 000 personnes.</p>
            <div class="b2b-btns">
              <router-link to="/businesses" class="btn btn-accent btn-lg">Découvrir l'offre B2B →</router-link>
              <router-link to="/plans" class="btn btn-secondary btn-lg">Voir les tarifs équipes</router-link>
            </div>
          </div>
          <div class="b2b-visual" aria-hidden="true">
            <!-- Decorative code terminal mockup -->
            <div class="mini-terminal">
              <div class="mt-bar"><span></span><span></span><span></span></div>
              <pre class="mt-code"><span style="color:#5a7085">// Team analytics</span>
<span style="color:#34d399">const</span> <span style="color:#22d3ee">team</span> = <span style="color:#a78bfa">await</span> debugger.<span style="color:#e8edf2">getTeam</span>();
<span style="color:#e8edf2">team</span>.<span style="color:#34d399">forEach</span>(user => {
  <span style="color:#e8edf2">console</span>.<span style="color:#facc15">log</span>(<span style="color:#34d399">`</span><span style="color:#facc15">${user.name}</span><span style="color:#34d399"> ✓ certified`</span>);
});</pre>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { COURSES, CATEGORIES, Course } from '../data/courses'
import CourseCard from '../components/course/CourseCard.vue'
import DurationSlider from '../components/course/DurationSlider.vue'

export default defineComponent({
  name: 'HomeView',
  components: { CourseCard, DurationSlider },
  setup() {
    const heroHours = ref(25)
    const simHours = ref(30)
    const activeCat = ref('all')

    const avatarUrls = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80'
    ]

    const activeCourseName = computed(() => {
      if (heroHours.value <= 10) return 'IA Express Fondamentaux'
      if (heroHours.value <= 40) return 'IA Générative — Parcours Pro'
      return 'IA Générative Expert Complet'
    })

    const getLevel = (h: number) => {
      if (h <= 10) return 'Fondamentaux Express'
      if (h <= 40) return 'Pratique Professionnelle'
      if (h <= 80) return 'Spécialisation Avancée'
      return 'Excellence & Maîtrise'
    }

    const stats = [
      {
        value: '25 000+',
        label: 'Formations créées',
        icon: { viewBox: '0 0 24 24', path: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>' }
      },
      {
        value: '+100 pays',
        label: 'Certificats reconnus',
        icon: { viewBox: '0 0 24 24', path: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>' }
      },
      {
        value: '250 000+',
        label: 'Professionnels certifiés',
        icon: { viewBox: '0 0 24 24', path: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' }
      },
      {
        value: '4.9 / 5.0',
        label: 'Satisfaction moyenne',
        icon: { viewBox: '0 0 24 24', path: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>' }
      }
    ]

    const whyCards = [
      {
        num: 1,
        title: 'Contenu expert sélectionné par des praticiens',
        text: 'Des formations conçues par des leaders en poste (Ex-DeepMind, Qonto, GAFAM). Des cas pratiques réels, un contenu constamment actualisé.',
        accent: '#34d399',
        link: '/courses',
        cta: 'Explorer le catalogue',
        icon: { viewBox: '0 0 24 24', path: '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>' }
      },
      {
        num: 2,
        title: 'Rythme 100% personnalisable de 4h à 120h',
        text: 'Votre emploi du temps, vos règles. Réglez le curseur d\'heures et le programme adapte son contenu — et le certificat suit.',
        accent: '#0e8fa6',
        link: '/courses',
        cta: 'Voir les formations',
        icon: { viewBox: '0 0 24 24', path: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>' }
      },
      {
        num: 3,
        title: 'Certificats officiels vérifiables avec QR code',
        text: 'Chaque diplôme porte un ID cryptographique unique vérifié instantanément par les recruteurs. Conforme aux standards européens.',
        accent: '#7c5cfc',
        link: '/verify',
        cta: 'Consulter un certificat',
        icon: { viewBox: '0 0 24 24', path: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>' }
      }
    ]

    const svgCats = [
      { id: 'all', label: 'Toutes', icon: { viewBox: '0 0 24 24', path: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>' } },
      { id: 'tech', label: 'Tech & IA', icon: { viewBox: '0 0 24 24', path: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/>' } },
      { id: 'business', label: 'Management', icon: { viewBox: '0 0 24 24', path: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>' } },
      { id: 'design', label: 'Design', icon: { viewBox: '0 0 24 24', path: '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>' } },
      { id: 'data', label: 'Cybersécurité', icon: { viewBox: '0 0 24 24', path: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' } },
      { id: 'marketing', label: 'Growth', icon: { viewBox: '0 0 24 24', path: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>' } }
    ]

    const steps = [
      {
        title: 'Choisissez votre formation',
        text: 'Explorez notre catalogue par domaine et filtrez par niveau ou durée.',
        icon: { viewBox: '0 0 24 24', path: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>' }
      },
      {
        title: 'Définissez votre volume',
        text: 'Réglez le curseur d\'heures (4h à 120h). Le programme et le certificat s\'adaptent.',
        icon: { viewBox: '0 0 24 24', path: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>' }
      },
      {
        title: 'Apprenez dans le lecteur LMS',
        text: 'Vidéos, guides pratiques, quiz interactifs — à votre rythme sur tous vos appareils.',
        icon: { viewBox: '0 0 24 24', path: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>' }
      },
      {
        title: 'Obtenez votre certificat',
        text: 'Validez le quiz final et téléchargez votre diplôme officiel avec QR code vérifiable.',
        icon: { viewBox: '0 0 24 24', path: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>' }
      }
    ]

    const totalCount = computed(() => COURSES.length)
    const categories = svgCats

    const visibleCourses = computed(() => {
      if (activeCat.value === 'all') return COURSES
      return COURSES.filter(c => c.category === activeCat.value)
    })

    return {
      heroHours, simHours, activeCat,
      avatarUrls, activeCourseName, getLevel,
      stats, whyCards, categories, steps,
      totalCount, visibleCourses
    }
  }
})
</script>

<style scoped lang="scss">
/* ===== HERO ===== */
.hero-section {
  background-color: var(--color-bg);
  padding: 5rem 0 3rem;
  position: relative;
  overflow: hidden;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;
}

.hero-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--color-primary-light);
  border: 1px solid var(--color-border-medium);
  color: var(--color-primary-dark);
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius-full);
  margin-bottom: 1.5rem;
  position: relative;

  .pulse-ring {
    width: 8px;
    height: 8px;
    background-color: var(--color-primary);
    border-radius: 50%;
    animation: pulseGlow 2s infinite;
  }
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 1.08;
  color: var(--color-text);
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;

  .hero-title-green {
    color: var(--color-primary);
  }
}

.hero-desc {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 560px;

  .code-inline {
    font-family: var(--font-mono);
    background-color: var(--color-surface-2);
    color: var(--color-primary);
    padding: 0.1rem 0.4rem;
    border-radius: 4px;
    font-size: 0.95em;
    border: 1px solid var(--color-border);
  }
}

.hero-ctas {
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.hero-social-proof {
  display: flex;
  align-items: center;
  gap: 1rem;

  .avatars-row {
    display: flex;

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid var(--color-surface);
      margin-left: -10px;
      object-fit: cover;
      &:first-child { margin-left: 0; }
    }
  }

  .proof-text {
    display: flex;
    flex-direction: column;
    font-size: 0.82rem;
    color: var(--color-text-muted);

    .stars-row {
      display: flex;
      align-items: center;
      gap: 0.2rem;
      margin-bottom: 0.1rem;

      strong {
        color: var(--color-text);
        font-size: 0.88rem;
        margin-left: 0.25rem;
      }
    }
  }
}

/* Hero floating card */
.hero-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-medium);
  border-radius: var(--radius-xl);
  padding: 2rem;
  box-shadow: var(--shadow-green-lg), var(--shadow-xl);
  position: relative;

  .hero-card-top-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background-color: rgba(52, 211, 153, 0.12);
    border: 1px solid rgba(52, 211, 153, 0.25);
    color: var(--color-primary);
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 0.25rem 0.65rem;
    border-radius: var(--radius-full);
    margin-bottom: 1.25rem;
  }
}

.card-course-pick {
  background-color: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1.5rem;

  &:hover {
    border-color: var(--color-primary);
    background-color: var(--color-surface-3);
  }

  .pick-icon-wrap {
    width: 40px;
    height: 40px;
    background-color: rgba(52, 211, 153, 0.1);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(52, 211, 153, 0.2);
    flex-shrink: 0;
  }

  .pick-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    .pick-cat { font-weight: 700; font-size: 0.85rem; color: var(--color-text); }
    .pick-meta { font-size: 0.72rem; color: var(--color-text-muted); }
  }
}

.card-hour-widget {
  background-color: var(--color-surface-2);
  border-radius: var(--radius-md);
  padding: 1rem;
  margin-bottom: 1.25rem;
  border: 1px solid var(--color-border);

  .widget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.82rem;
    color: var(--color-text-secondary);
    margin-bottom: 0.75rem;

    .hours-tag {
      background-color: var(--color-primary-light);
      color: var(--color-primary);
      font-weight: 800;
      font-size: 0.85rem;
      padding: 0.2rem 0.6rem;
      border-radius: var(--radius-sm);
      font-family: var(--font-mono);
    }
  }

  .debug-range {
    -webkit-appearance: none;
    width: 100%;
    height: 6px;
    border-radius: var(--radius-full);
    background: linear-gradient(90deg, var(--color-primary) 0%, rgba(52,211,153,0.25) 100%);
    outline: none;
    cursor: pointer;
    margin-bottom: 0.75rem;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--color-text);
      border: 3px solid var(--color-primary);
      box-shadow: 0 0 10px rgba(52,211,153,0.35);
      cursor: pointer;
    }
  }

  .widget-result {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.82rem;
    color: var(--color-text-secondary);

    svg { stroke: var(--color-primary); }
    strong { color: var(--color-primary); }
  }
}

.card-security-note {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.73rem;
  color: var(--color-text-muted);
  margin-top: 1rem;
  text-align: center;
  justify-content: center;
}

/* Terminal decoration */
.terminal-deco {
  position: relative;
  z-index: 2;
  max-width: 680px;
  margin: 3.5rem auto 0 auto;
  background-color: #050709;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);

  .term-bar {
    display: flex;
    gap: 0.4rem;
    padding: 0.6rem 0.85rem;
    background-color: #14171a;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      &.r { background: #f87171; }
      &.y { background: #facc15; }
      &.g { background: #34d399; }
    }
  }

  .term-code {
    display: block;
    padding: 1rem 1.25rem;
    font-family: var(--font-mono);
    font-size: 0.82rem;
    line-height: 1.8;
    .c-gray { color: #7a8280; }
    .c-green { color: #34d399; }
    .c-blue { color: #22d3ee; }
    .c-yellow { color: #facc15; }
    .c-text { color: #e8edf2; }
  }
}

/* ===== STATS STRIP ===== */
.stats-strip {
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: 2rem 0;
}

.stats-inner {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  border-right: 1px solid var(--color-border-subtle);

  &:last-child { border-right: none; }

  .stat-icon {
    width: 40px;
    height: 40px;
    background-color: var(--color-primary-light);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 1px solid rgba(52,211,153,0.2);
  }

  .stat-text {
    display: flex;
    flex-direction: column;
    .stat-num { font-weight: 800; font-size: 1.3rem; color: var(--color-primary); }
    .stat-label { font-size: 0.78rem; color: var(--color-text-muted); }
  }
}

/* ===== WHY CARDS ===== */
.why-section { background-color: var(--color-bg); }

.why-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.why-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 2.5rem 2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--card-accent, #34d399), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    border-color: var(--card-accent, #34d399);
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg), 0 0 0 1px rgba(52,211,153,0.12);

    &::before { opacity: 1; }
  }

  .why-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  .why-icon {
    width: 52px;
    height: 52px;
    background-color: var(--color-surface-2);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--color-border);
  }

  .why-num {
    font-family: var(--font-mono);
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--color-surface-3);
  }

  h3 {
    font-size: 1.25rem;
    color: var(--color-text);
    margin-bottom: 0.85rem;
    line-height: 1.3;
  }

  p {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
    line-height: 1.65;
    margin-bottom: 1.5rem;
  }

  .why-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--color-primary);
    transition: gap 0.2s ease;

    svg { stroke: currentColor; }

    &:hover { gap: 0.7rem; }
  }
}

/* ===== SIMULATOR ===== */
.simulator-section { background-color: var(--color-surface); }
.sim-wrapper { max-width: 900px; margin: 0 auto; }
.sim-cta { text-align: center; margin-top: 2rem; }

/* ===== CATALOGUE ===== */
.catalogue-section { background-color: var(--color-bg); }

.cat-chips {
  display: flex;
  gap: 0.6rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  margin-bottom: 2.5rem;
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}

.cat-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  svg { stroke: currentColor; }

  &:hover {
    border-color: var(--color-border-medium);
    color: var(--color-primary);
    background-color: var(--color-surface-2);
  }

  &.active {
    background-color: var(--color-primary-light);
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
  margin-bottom: 3rem;
}

.catalogue-see-all { text-align: center; }

/* ===== HOW IT WORKS ===== */
.how-section { background-color: var(--color-surface); }

.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  position: relative;
}

.step-card {
  background-color: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2rem 1.5rem;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--color-border-medium);
    transform: translateY(-4px);
    box-shadow: var(--shadow-green);
  }

  .step-num {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--color-text-muted);
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .step-icon-box {
    width: 48px;
    height: 48px;
    background-color: var(--color-primary-light);
    border: 1px solid rgba(52,211,153,0.2);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.25rem;
  }

  h4 {
    font-size: 1rem;
    color: var(--color-text);
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.85rem;
    color: var(--color-text-secondary);
    line-height: 1.55;
  }

  .step-connector {
    position: absolute;
    right: -18px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-text-muted);
    z-index: 1;
    display: none;
  }
}

/* ===== B2B BANNER ===== */
.b2b-banner-section { padding: 0 0 5rem 0; }

.b2b-card {
  background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-2) 100%);
  border: 1px solid var(--color-border-medium);
  border-radius: var(--radius-xl);
  padding: 4rem;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 3rem;
  align-items: center;
  box-shadow: var(--shadow-green-lg);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -80px;
    right: -80px;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%);
  }

  .b2b-content {
    h2 {
      font-size: 2.2rem;
      color: var(--color-text);
      margin: 1rem 0 0.75rem 0;
    }
    p {
      color: var(--color-text-secondary);
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 2rem;
    }
  }

  .b2b-btns {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
}

.mini-terminal {
  background-color: #050709;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  font-family: var(--font-mono);

  .mt-bar {
    display: flex;
    gap: 0.35rem;
    padding: 0.5rem 0.75rem;
    background-color: #14171a;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    span {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      &:nth-child(1) { background: #f87171; }
      &:nth-child(2) { background: #facc15; }
      &:nth-child(3) { background: #34d399; }
    }
  }

  .mt-code {
    display: block;
    padding: 1.25rem;
    font-size: 0.78rem;
    line-height: 1.8;
    color: #7a8280;
    white-space: pre;
  }
}

@media (max-width: 1100px) {
  .hero-inner { grid-template-columns: 1fr; }
  .stats-inner { grid-template-columns: repeat(2, 1fr); }
  .why-cards { grid-template-columns: 1fr; }
  .courses-grid { grid-template-columns: repeat(2, 1fr); }
  .steps-grid { grid-template-columns: repeat(2, 1fr); }
  .b2b-card { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .hero-title { font-size: 2.4rem; }
  .courses-grid { grid-template-columns: 1fr; }
  .steps-grid { grid-template-columns: 1fr; }
  .stats-inner { grid-template-columns: 1fr; }
  .b2b-card { padding: 2rem 1.5rem; }
}
</style>
