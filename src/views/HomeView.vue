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
            Des formations professionnelles <strong>100 % gratuites</strong>, créées par des experts.
            Progressez étape par étape — leçons, quiz et exercices de code — puis obtenez
            votre certificat officiel pour <span class="code-inline">5 100 FCFA</span>.
          </p>

          <div class="hero-ctas">
            <router-link to="/courses" class="btn btn-accent btn-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              Explorer les formations
            </router-link>
            <router-link :to="$store.getters.isAuthenticated ? '/espace' : '/connexion?mode=register'" class="btn btn-secondary btn-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              {{ $store.getters.isAuthenticated ? 'Mon espace' : 'Créer mon compte gratuit' }}
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
          <span class="hero-float f-1" aria-hidden="true"><icon-3d name="trophy" :size="72" /></span>
          <span class="hero-float f-2" aria-hidden="true"><icon-3d name="rocket" :size="64" /></span>
            <div class="hero-card-top-badge">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              Formation gratuite · Nouveau
            </div>

            <div class="card-course-pick" @click="$router.push('/course/developpement-application-web')">
              <div class="pick-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f766e" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </div>
              <div class="pick-text">
                <span class="pick-cat">Développement d'Application Web</span>
                <span class="pick-meta">HTML · CSS · JavaScript · 24 h</span>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0f766e" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </div>

            <div class="card-hour-widget">
              <div class="widget-header">
                <span>Votre parcours</span>
                <span class="hours-tag">4 étapes</span>
              </div>
              <ol class="mini-steps">
                <li v-for="(p, i) in heroSteps" :key="p" :class="{ first: i === 0 }">
                  <span class="ms-dot">{{ i + 1 }}</span>{{ p }}
                </li>
              </ol>
            </div>

            <router-link to="/course/developpement-application-web" class="btn btn-primary btn-block">
              Commencer gratuitement →
            </router-link>

            <div class="card-security-note">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Certificat officiel 5 100 FCFA · Airtel Money, Moov Money, Visa
            </div>
          </div>
        </div>
      </div>

      <!-- Code terminal decoration -->
      <div class="terminal-deco" aria-hidden="true">
        <div class="term-bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></div>
        <code class="term-code">
          <span class="c-gray">// Debugger Formation — Lancez votre progression</span><br />
          <span class="c-green">const</span> <span class="c-blue">formation</span> = <span class="c-green">new</span> <span class="c-text">Formation</span>(<span class="c-yellow">'Développement Web'</span>);<br />
          <span class="c-blue">formation</span>.<span class="c-text">suivreEtapes</span>().<span class="c-text">deposerProjet</span>().<span class="c-text">getCertified</span>();
        </code>
      </div>
    </section>

    <!-- ======== STATS STRIP ======== -->
    <section class="stats-strip">
      <div class="container stats-inner">
        <div class="stat-item" v-for="stat in stats" :key="stat.label">
          <span class="stat-icon">
            <icon-3d :name="stat.icon3d" :size="32" />
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
                <icon-3d :name="card.icon3d" :size="44" />
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
            <icon-3d :name="cat.icon3d" :size="22" />
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
              <icon-3d :name="step.icon3d" :size="40" />
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
<span style="color:#14b8a6">const</span> <span style="color:#22d3ee">team</span> = <span style="color:#a78bfa">await</span> debugger.<span style="color:#e8edf2">getTeam</span>();
<span style="color:#e8edf2">team</span>.<span style="color:#14b8a6">forEach</span>(user => {
  <span style="color:#e8edf2">console</span>.<span style="color:#facc15">log</span>(<span style="color:#14b8a6">`</span><span style="color:#facc15">${user.name}</span><span style="color:#14b8a6"> ✓ certified`</span>);
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
import { useStore } from 'vuex'
import { Course } from '../data/courses'
import CourseCard from '../components/course/CourseCard.vue'
import Icon3d from '../components/ui/Icon3d.vue'

export default defineComponent({
  name: 'HomeView',
  components: { CourseCard, Icon3d },
  setup() {
    const store = useStore()
    const activeCat = ref('all')
    const heroSteps = ['HTML5 avancé', 'Les outils CSS', 'JavaScript', 'Projet final']

    const avatarUrls = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80'
    ]

    const stats = [
      {
        value: '25 000+',
        label: 'Formations créées', icon3d: 'notebook'
      },
      {
        value: '+100 pays',
        label: 'Certificats reconnus', icon3d: 'medal'
      },
      {
        value: '250 000+',
        label: 'Professionnels certifiés', icon3d: 'rocket'
      },
      {
        value: '4.9 / 5.0',
        label: 'Satisfaction moyenne', icon3d: 'star'
      }
    ]

    const whyCards = [
      {
        num: 1,
        title: 'Contenu expert sélectionné par des praticiens', icon3d: 'bulb',
        text: 'Des formations conçues par des leaders en poste (Ex-DeepMind, Qonto, GAFAM). Des cas pratiques réels, un contenu constamment actualisé.',
        accent: '#14b8a6',
        link: '/courses',
        cta: 'Explorer le catalogue'
      },
      {
        num: 2,
        title: 'Un parcours progressif, étape par étape', icon3d: 'clock',
        text: 'Leçons, quiz corrigés et exercices de code : chaque étape se débloque quand la précédente est validée.',
        accent: '#0e8fa6',
        link: '/courses',
        cta: 'Voir les formations'
      },
      {
        num: 3,
        title: 'Formations gratuites, certificat à 5 100 FCFA', icon3d: 'shield',
        text: 'Chaque diplôme porte un numéro unique vérifié par Debugger. Paiement par Airtel Money, Moov Money ou Visa.',
        accent: '#7c5cfc',
        link: '/plans',
        cta: 'Voir les tarifs'
      }
    ]

    const svgCats = [
      { id: 'all', icon3d: 'magic-trick', label: 'Toutes' },
      { id: 'tech', icon3d: 'computer', label: 'Tech & Dev' },
      { id: 'business', icon3d: 'bag', label: 'Management' },
      { id: 'design', icon3d: 'color-palette', label: 'Design' },
      { id: 'data', icon3d: 'shield', label: 'Cybersécurité' },
      { id: 'marketing', icon3d: 'megaphone', label: 'Growth' }
    ]

    const steps = [
      {
        title: 'Créez votre compte', icon3d: 'target',
        text: 'Inscription gratuite en une minute, puis accès libre à toutes les formations.'
      },
      {
        title: 'Suivez le parcours', icon3d: 'calendar',
        text: 'Leçons et quiz dans l\'ordre : chaque étape validée débloque la suivante.'
      },
      {
        title: 'Déposez votre code', icon3d: 'computer',
        text: 'Envoyez le code source de chaque exercice, puis votre projet final.'
      },
      {
        title: 'Obtenez votre certificat', icon3d: 'trophy',
        text: 'Réglez 5 100 FCFA par Airtel Money, Moov Money ou Visa et accédez à votre diplôme.'
      }
    ]

    const catalogue = computed<Course[]>(() => store.state.catalogue)
    const totalCount = computed(() => catalogue.value.length)
    const categories = svgCats

    const visibleCourses = computed(() => {
      const list = activeCat.value === 'all' ? catalogue.value : catalogue.value.filter(c => c.category === activeCat.value)
      return list.slice(0, 6)
    })

    return {
      activeCat, heroSteps,
      avatarUrls,
      stats, whyCards, categories, steps,
      totalCount, visibleCourses
    }
  }
})
</script>

<style scoped lang="scss">
.mini-steps {
  list-style: none;
  display: grid;
  gap: 0.45rem;
  margin-top: 0.25rem;
  li { display: flex; align-items: center; gap: 0.6rem; font-weight: 700; font-size: 0.9rem; color: var(--color-text-secondary); }
  li.first { color: var(--color-text); }
}
.ms-dot {
  width: 24px; height: 24px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center;
  font-size: 0.75rem; font-weight: 900; background: var(--color-surface); box-shadow: var(--shadow-sm);
  .first & { background: var(--color-primary); color: var(--color-on-primary); }
}
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
  border: var(--border-w) solid var(--color-border-medium);
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
    color: var(--color-primary-ink);
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
    color: var(--color-primary-ink);
    padding: 0.1rem 0.4rem;
    border-radius: 4px;
    font-size: 0.95em;
    border: var(--border-w) solid var(--color-border);
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
  border: var(--border-w) solid var(--color-border-medium);
  border-radius: var(--radius-xl);
  padding: 2rem;
  box-shadow: var(--shadow-green-lg), var(--shadow-xl);
  position: relative;

  .hero-card-top-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background-color: rgba(20, 184, 166, 0.12);
    border: 1px solid rgba(20, 184, 166, 0.25);
    color: var(--color-primary-ink);
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
  border: var(--border-w) solid var(--color-border);
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
    background-color: rgba(20, 184, 166, 0.1);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(20, 184, 166, 0.2);
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
  border: var(--border-w) solid var(--color-border);

  .widget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.82rem;
    color: var(--color-text-secondary);
    margin-bottom: 0.75rem;

    .hours-tag {
      background-color: var(--color-primary-light);
      color: var(--color-primary-ink);
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
    background: linear-gradient(90deg, var(--color-primary) 0%, rgba(20, 184, 166, 0.25) 100%);
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
      box-shadow: 0 0 10px rgba(20, 184, 166, 0.35);
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
    strong { color: var(--color-primary-ink); }
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
  background-color: #0b3b38;
  border: var(--border-w) solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);

  .term-bar {
    display: flex;
    gap: 0.4rem;
    padding: 0.6rem 0.85rem;
    background-color: #134e4a;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      &.r { background: #f87171; }
      &.y { background: #facc15; }
      &.g { background: #14b8a6; }
    }
  }

  .term-code {
    display: block;
    padding: 1rem 1.25rem;
    font-family: var(--font-mono);
    font-size: 0.82rem;
    line-height: 1.8;
    .c-gray { color: #56716e; }
    .c-green { color: #14b8a6; }
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
    border: 1px solid rgba(20, 184, 166, 0.2);
  }

  .stat-text {
    display: flex;
    flex-direction: column;
    .stat-num { font-weight: 800; font-size: 1.3rem; color: var(--color-primary-ink); }
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
  border: var(--border-w) solid var(--color-border);
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
    background: linear-gradient(90deg, transparent, var(--card-accent, #14b8a6), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    border-color: var(--card-accent, #14b8a6);
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg), 0 0 0 1px rgba(20, 184, 166, 0.12);

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
    border: var(--border-w) solid var(--color-border);
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
    color: var(--color-primary-ink);
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
  border: var(--border-w) solid var(--color-border);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  svg { stroke: currentColor; }

  &:hover {
    border-color: var(--color-border-medium);
    color: var(--color-primary-ink);
    background-color: var(--color-surface-2);
  }

  &.active {
    background-color: var(--color-primary-light);
    border-color: var(--color-primary);
    color: var(--color-primary-ink);
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
  border: var(--border-w) solid var(--color-border);
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
    border: 1px solid rgba(20, 184, 166, 0.2);
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
  border: var(--border-w) solid var(--color-border-medium);
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
    background: radial-gradient(circle, rgba(20, 184, 166, 0.08) 0%, transparent 70%);
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
  background-color: #0b3b38;
  border: var(--border-w) solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  font-family: var(--font-mono);

  .mt-bar {
    display: flex;
    gap: 0.35rem;
    padding: 0.5rem 0.75rem;
    background-color: #134e4a;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    span {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      &:nth-child(1) { background: #f87171; }
      &:nth-child(2) { background: #facc15; }
      &:nth-child(3) { background: #14b8a6; }
    }
  }

  .mt-code {
    display: block;
    padding: 1.25rem;
    font-size: 0.78rem;
    line-height: 1.8;
    color: #56716e;
    white-space: pre;
  }
}

/* =====================================================================
   THÈME CLAY — surcharges de l'accueil
   ===================================================================== */
.hero-section,
.why-section,
.catalogue-section { background-color: transparent; }

.simulator-section,
.how-section {
  background-color: transparent;
  background-image: linear-gradient(180deg, transparent 0, rgba(255, 255, 255, 0.6) 12%, rgba(255, 255, 255, 0.6) 88%, transparent 100%);
}

.hero-title {
  font-size: clamp(2.4rem, 4.4vw, 3.5rem);
  line-height: 1.05;
  text-wrap: balance;
}

.hero-pill {
  border: 2px solid rgba(255, 255, 255, 0.9);
  box-shadow: 2px 3px 8px rgba(19, 78, 74, 0.08), inset 0 2px 0 rgba(255, 255, 255, 0.6);
}

/* Carte de droite du hero : bloc clay flottant + icônes 3D décoratives */
.hero-card {
  border: 4px solid rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow-xl);
  transform: rotate(1deg);
  transition: transform 0.4s var(--ease-bounce);
  &:hover { transform: rotate(0deg) translateY(-4px); }
}
.hero-float {
  position: absolute;
  z-index: 3;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  border-radius: 28px;
  background-color: var(--pastel-butter);
  border: 4px solid rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow-lg);
  animation: float 5s ease-in-out infinite;
  &.f-1 { top: -40px; right: -28px; transform: rotate(8deg); }
  &.f-2 { bottom: -34px; left: -36px; background-color: var(--pastel-lilac); animation-delay: -2.5s; }
}
.card-course-pick,
.card-hour-widget {
  background-color: var(--color-surface-3);
  border: none;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-pressed);
}
.card-course-pick:hover { background-color: var(--color-surface-hover); }
.card-course-pick .pick-icon-wrap {
  background-color: var(--color-surface);
  border: none;
  box-shadow: var(--shadow-sm);
}

.terminal-deco,
.mini-terminal {
  border: 4px solid rgba(255, 255, 255, 0.95);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

/* Chiffres clés : 4 pastilles clay */
.stats-strip {
  background-color: transparent;
  border: none;
  padding: 1rem 0 2rem;
}
.stats-inner { gap: 1.25rem; }
.stat-item {
  background-color: var(--color-surface);
  border: 3px solid rgba(255, 255, 255, 0.95);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 1rem 1.25rem;
  &:last-child { border-right: 3px solid rgba(255, 255, 255, 0.95); }
  .stat-icon {
    width: 56px;
    height: 56px;
    border: none;
    border-radius: var(--radius-md);
    box-shadow: var(--clay-inner);
  }
  &:nth-child(2) .stat-icon { background-color: var(--pastel-butter); }
  &:nth-child(3) .stat-icon { background-color: var(--pastel-lilac); }
  &:nth-child(4) .stat-icon { background-color: var(--pastel-peach); }
  .stat-num { font-family: var(--font-heading); font-weight: 900; }
}

/* Cartes "Pourquoi" et étapes */
.why-card,
.step-card {
  background-color: var(--color-surface);
  border: 3px solid rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow-md);
  transition: transform 0.35s var(--ease-bounce), box-shadow 0.3s ease;
  &::before { display: none; }
  &:hover {
    border-color: rgba(255, 255, 255, 0.95);
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
  }
}
.why-card .why-icon,
.step-card .step-icon-box {
  width: 72px;
  height: 72px;
  border: none;
  border-radius: 22px;
  background-color: var(--pastel-mint);
  box-shadow: 4px 6px 12px rgba(19, 78, 74, 0.10), var(--clay-inner);
}
.why-card:nth-child(2) .why-icon, .step-card:nth-child(2) .step-icon-box { background-color: var(--pastel-sky); }
.why-card:nth-child(3) .why-icon, .step-card:nth-child(3) .step-icon-box { background-color: var(--pastel-lilac); }
.step-card:nth-child(4) .step-icon-box { background-color: var(--pastel-butter); }
.why-card .why-num {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 2.4rem;
  color: var(--color-surface-3);
}
.step-card .step-num {
  display: inline-block;
  font-family: var(--font-heading);
  font-weight: 900;
  color: var(--color-primary-ink);
  background-color: var(--pastel-mint);
  padding: 0.1rem 0.6rem;
  border-radius: var(--radius-full);
}

/* Puces de catégories */
.cat-chip {
  min-height: 44px;
  padding: 0.35rem 1.1rem 0.35rem 0.5rem;
  border: 2px solid rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow-sm);
  font-family: var(--font-heading);
  font-weight: 800;
  transition: transform 0.25s var(--ease-bounce), box-shadow 0.2s ease, background-color 0.2s ease;
  &:hover { transform: translateY(-2px); border-color: rgba(255, 255, 255, 0.95); background-color: var(--color-surface); }
  &.active {
    background-color: var(--color-primary);
    border-color: rgba(255, 255, 255, 0.6);
    color: var(--color-on-primary);
    box-shadow: var(--shadow-green);
  }
}

/* Bannière B2B */
.b2b-card {
  background: linear-gradient(135deg, var(--pastel-lilac) 0%, var(--pastel-sky) 55%, var(--pastel-mint) 100%);
  border: 4px solid rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow-xl);
  &::before { display: none; }
}

@media (max-width: 640px) {
  .hero-float { display: none; }
  .hero-card { transform: none; }
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
