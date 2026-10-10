<template>
  <div class="plans-page">
    <div class="plans-hero">
      <div class="container">
        <span class="badge badge-yellow">Tarifs Simples & Transparents</span>
        <h1>Comparez nos formules d'apprentissage</h1>
        <p>Commencez gratuitement ou passez à la formule Pro pour débloquer les certificats vérifiables et le volume horaire modulable.</p>
      </div>
    </div>

    <div class="container plans-content-grid">
      <!-- Plan 1: Free -->
      <div class="plan-card">
        <div class="plan-header">
          <span class="plan-name">Formule Découverte</span>
          <div class="price-line">
            <span class="currency">0 €</span>
            <span class="period">/ pour toujours</span>
          </div>
          <p class="plan-pitch">Idéal pour explorer les bases et tester la plateforme sans engagement.</p>
        </div>

        <ul class="plan-features">
          <li><app-icon name="check" :size="16" class="ico-yes" /> Accès aux leçons théoriques fondamentales</li>
          <li><app-icon name="check" :size="16" class="ico-yes" /> Rythme express (jusqu'à 10h)</li>
          <li><app-icon name="check" :size="16" class="ico-yes" /> Auto-évaluations et quiz d'entraînement</li>
          <li><app-icon name="check" :size="16" class="ico-yes" /> Accès communautaire</li>
          <li class="disabled"><app-icon name="x" :size="16" class="ico-no" /> Certificat officiel avec QR code</li>
          <li class="disabled"><app-icon name="x" :size="16" class="ico-no" /> Personnalisation au-delà de 20 heures</li>
          <li class="disabled"><app-icon name="x" :size="16" class="ico-no" /> Ressources & gabarits professionnels téléchargeables</li>
        </ul>

        <router-link to="/courses" class="btn btn-secondary btn-block">
          Commencer sans frais
        </router-link>
      </div>

      <!-- Plan 2: Pro (Featured) -->
      <div class="plan-card featured-pro">
        <div class="popular-ribbon"><app-icon name="star" :size="12" filled /> LE PLUS POPULAIRE</div>
        <div class="plan-header">
          <span class="plan-name">Pro Certification Pass</span>
          <div class="price-line">
            <span class="currency">19 €</span>
            <span class="period">/ mois (ou 149 € à vie)</span>
          </div>
          <p class="plan-pitch">Tout ce dont vous avez besoin pour certifier vos compétences et booster votre CV.</p>
        </div>

        <ul class="plan-features">
          <li><app-icon name="check" :size="16" class="ico-yes" /> <strong>Volume horaire 100% modulable (4h à 120h)</strong></li>
          <li><app-icon name="check" :size="16" class="ico-yes" /> <strong>Certificats officiels illimités</strong> avec ID cryptographique & QR Code</li>
          <li><app-icon name="check" :size="16" class="ico-yes" /> Mention officielle du nombre d'heures réelles</li>
          <li><app-icon name="check" :size="16" class="ico-yes" /> Téléchargement haute résolution PDF & intégration LinkedIn</li>
          <li><app-icon name="check" :size="16" class="ico-yes" /> Accès complet à l'ensemble du catalogue et modules experts</li>
          <li><app-icon name="check" :size="16" class="ico-yes" /> Tous les gabarits, fichiers Figma, cheatsheets & codes sources</li>
        </ul>

        <router-link to="/courses" class="btn btn-accent btn-lg btn-block">
          Débloquer le Pass Pro
          <app-icon name="arrow-right" :size="16" />
        </router-link>
      </div>

      <!-- Plan 3: Enterprise -->
      <div class="plan-card">
        <div class="plan-header">
          <span class="plan-name">Entreprises & Équipes</span>
          <div class="price-line">
            <span class="currency">Sur-mesure</span>
          </div>
          <p class="plan-pitch">Solution complète de montée en compétences pour vos collaborateurs.</p>
        </div>

        <ul class="plan-features">
          <li><app-icon name="check" :size="16" class="ico-yes" /> Tout le contenu du Pass Pro pour toute l'équipe</li>
          <li><app-icon name="check" :size="16" class="ico-yes" /> Tableau de bord RH & analytics de progression</li>
          <li><app-icon name="check" :size="16" class="ico-yes" /> Parcours de formation sur-mesure pour votre entreprise</li>
          <li><app-icon name="check" :size="16" class="ico-yes" /> Intégration SSO & conformité SIRH / LMS</li>
          <li><app-icon name="check" :size="16" class="ico-yes" /> Certificats cobrandés avec le logo de votre société</li>
          <li><app-icon name="check" :size="16" class="ico-yes" /> Account Manager dédié</li>
        </ul>

        <router-link to="/businesses" class="btn btn-primary btn-block">
          Demander une démo entreprise
        </router-link>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="container faq-section">
      <div class="section-header">
        <span class="subtitle">Questions Fréquentes</span>
        <h2>Tout savoir sur les certificats Debugger</h2>
      </div>

      <div class="faq-grid">
        <div class="faq-item">
          <h4>Comment est déterminé le nombre d'heures sur le certificat ?</h4>
          <p>
            Vous choisissez votre volume horaire sur notre réglette interactive (de 4h à 120h). Le programme s'adapte en conséquence et le certificat officiel final atteste du volume exact que vous avez sélectionné et validé.
          </p>
        </div>

        <div class="faq-item">
          <h4>Les certificats Debugger sont-ils reconnus par les recruteurs ?</h4>
          <p>
            Oui. Chaque certificat dispose d'un QR code et d'un lien d'authentification publique infalsifiable (ex: <code>debugger.com/verify/DBG-...</code>) permettant à tout employeur de valider vos acquis en 1 clic.
          </p>
        </div>

        <div class="faq-item">
          <h4>Puis-je suivre plusieurs formations en parallèle ?</h4>
          <p>
            Absolument. Votre espace apprenant vous permet de suivre simultanément autant de formations que vous le désirez et de progresser à votre propre rythme.
          </p>
        </div>

        <div class="faq-item">
          <h4>Existe-t-il une garantie de satisfaction ?</h4>
          <p>
            Toutes nos formations peuvent être essayées gratuitement dès les premiers modules pour vous assurer de la pertinence des enseignements.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppIcon from '../components/layout/AppIcon.vue'

export default defineComponent({
  name: 'PlansView',
  components: { AppIcon }
})
</script>

<style scoped lang="scss">
.plans-page {
  padding-bottom: 5rem;
}

.plans-hero {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 4rem 0;
  text-align: center;

  h1 {
    font-size: 2.8rem;
    color: var(--color-text);
    margin: 0.75rem 0 0.5rem 0;
  }

  p {
    color: var(--color-text-secondary);
    font-size: 1.15rem;
    max-width: 650px;
    margin: 0 auto;
  }
}

.plans-content-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3.5rem;
  align-items: stretch;
}

.plan-card {
  background-color: var(--color-surface-2);
  border-radius: var(--radius-xl);
  padding: 2.5rem;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  position: relative;

  &.featured-pro {
    border: 2px solid var(--color-primary);
    box-shadow: var(--shadow-green-lg), var(--shadow-xl);
    transform: translateY(-8px);

    .popular-ribbon {
      position: absolute;
      top: -14px;
      left: 50%;
      transform: translateX(-50%);
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      background-color: var(--color-primary);
      color: #0a1f16;
      font-size: 0.72rem;
      font-weight: 800;
      padding: 0.35rem 1rem;
      border-radius: var(--radius-full);
      box-shadow: 0 4px 12px rgba(52, 211, 153, 0.4);
      white-space: nowrap;
    }
  }
}

.plan-header {
  margin-bottom: 2rem;

  .plan-name {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-primary);
    text-transform: uppercase;
    display: block;
    margin-bottom: 0.5rem;
  }

  .price-line {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    margin-bottom: 0.75rem;

    .currency {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-text);
    }

    .period {
      font-size: 0.85rem;
      color: var(--color-text-muted);
    }
  }

  .plan-pitch {
    font-size: 0.92rem;
    color: var(--color-text-secondary);
    line-height: 1.5;
  }
}

.plan-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
  flex: 1;

  li {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    font-size: 0.92rem;
    color: var(--color-text);
    line-height: 1.4;

    .ico-yes { color: var(--color-primary); margin-top: 0.15rem; }
    .ico-no { color: var(--color-text-light); margin-top: 0.15rem; }

    &.disabled {
      color: var(--color-text-muted);
      text-decoration: line-through;
    }
  }
}

.faq-section {
  margin-top: 6rem;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
}

.faq-item {
  background-color: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2rem;

  h4 {
    font-size: 1.15rem;
    color: var(--color-text);
    margin-bottom: 0.75rem;
  }

  p {
    color: var(--color-text-secondary);
    font-size: 0.95rem;
    line-height: 1.6;

    code {
      background-color: var(--color-bg);
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      color: var(--color-primary);
      font-size: 0.85rem;
      border: 1px solid var(--color-border);
    }
  }
}

@media (max-width: 1024px) {
  .plans-content-grid {
    grid-template-columns: 1fr;
    margin-top: 2rem;
  }

  .plan-card.featured-pro {
    transform: none;
  }

  .faq-grid {
    grid-template-columns: 1fr;
  }
}
</style>
