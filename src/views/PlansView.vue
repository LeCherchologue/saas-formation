<template>
  <div class="plans-page">
    <div class="plans-hero">
      <div class="container">
        <span class="badge badge-yellow">Tarifs simples & transparents</span>
        <h1>Apprenez gratuitement, payez seulement le certificat</h1>
        <p>Toutes les formations sont en accès libre. À la fin du parcours, obtenez votre certificat officiel pour 5 100 FCFA.</p>
      </div>
    </div>

    <div class="container plans-content-grid">
      <!-- Formations -->
      <div class="plan-card">
        <div class="plan-header">
          <span class="plan-name">Formations</span>
          <div class="price-line">
            <span class="currency">0 FCFA</span>
            <span class="period">/ pour toujours</span>
          </div>
          <p class="plan-pitch">Créez votre compte et accédez à toutes les formations du catalogue.</p>
        </div>

        <ul class="plan-features">
          <li><app-icon name="check" :size="16" class="ico-yes" /> Accès à toutes les formations</li>
          <li><app-icon name="check" :size="16" class="ico-yes" /> Leçons, quiz corrigés et exercices de code</li>
          <li><app-icon name="check" :size="16" class="ico-yes" /> Parcours guidé, étape par étape</li>
          <li><app-icon name="check" :size="16" class="ico-yes" /> Suivi de progression dans votre espace</li>
          <li class="disabled"><app-icon name="x" :size="16" class="ico-no" /> Certificat officiel</li>
        </ul>

        <router-link to="/connexion?mode=register" class="btn btn-secondary btn-block">
          Créer mon compte gratuit
        </router-link>
      </div>

      <!-- Certificat (mis en avant) -->
      <div class="plan-card featured-pro">
        <div class="popular-ribbon"><app-icon name="star" :size="12" filled /> EN FIN DE PARCOURS</div>
        <div class="plan-header">
          <span class="plan-name">Certificat officiel</span>
          <div class="price-line">
            <span class="currency">5 100 FCFA</span>
            <span class="period">/ par formation terminée</span>
          </div>
          <p class="plan-pitch">Payable une seule fois, quand toute la formation est validée.</p>
        </div>

        <ul class="plan-features">
          <li><app-icon name="check" :size="16" class="ico-yes" /> <strong>Certificat officiel</strong> avec numéro unique et QR code</li>
          <li><app-icon name="check" :size="16" class="ico-yes" /> Mention du volume horaire et du score obtenu</li>
          <li><app-icon name="check" :size="16" class="ico-yes" /> Vérification par l'équipe Debugger</li>
          <li><app-icon name="check" :size="16" class="ico-yes" /> Téléchargement PDF / impression</li>
          <li><app-icon name="check" :size="16" class="ico-yes" /> Paiement par <strong>Airtel Money</strong>, <strong>Moov Money</strong> ou <strong>Visa</strong></li>
        </ul>

        <router-link to="/courses" class="btn btn-accent btn-lg btn-block">
          Choisir une formation
          <app-icon name="arrow-right" :size="16" />
        </router-link>
      </div>

      <!-- Entreprises -->
      <div class="plan-card">
        <div class="plan-header">
          <span class="plan-name">Entreprises & équipes</span>
          <div class="price-line">
            <span class="currency">Sur devis</span>
          </div>
          <p class="plan-pitch">Formez vos collaborateurs et suivez leur progression.</p>
        </div>

        <ul class="plan-features">
          <li><app-icon name="check" :size="16" class="ico-yes" /> Toutes les formations pour votre équipe</li>
          <li><app-icon name="check" :size="16" class="ico-yes" /> Certificats groupés à tarif négocié</li>
          <li><app-icon name="check" :size="16" class="ico-yes" /> Parcours sur mesure pour votre entreprise</li>
          <li><app-icon name="check" :size="16" class="ico-yes" /> Interlocuteur dédié</li>
        </ul>

        <router-link to="/businesses" class="btn btn-primary btn-block">
          Demander un devis
        </router-link>
      </div>
    </div>

    <!-- FAQ -->
    <div class="container faq-section">
      <div class="section-header">
        <span class="subtitle">Questions fréquentes</span>
        <h2>Tout savoir sur les certificats Debugger</h2>
      </div>

      <div class="faq-grid">
        <div class="faq-item">
          <h4>Quand puis-je obtenir mon certificat ?</h4>
          <p>
            Quand toute la formation est terminée : toutes les leçons lues, tous les quiz réussis (70 % minimum) et, selon la formation, tous les exercices de code et le projet final déposés. Les étapes se suivent dans l'ordre : on ne peut pas en sauter.
          </p>
        </div>

        <div class="faq-item">
          <h4>Comment payer les 5 100 FCFA ?</h4>
          <p>
            Depuis votre espace ou à la fin de la formation, choisissez Airtel Money, Moov Money (avec votre numéro de téléphone) ou une carte Visa. Le certificat est disponible dès la confirmation du paiement.
          </p>
        </div>

        <div class="faq-item">
          <h4>Puis-je suivre plusieurs formations en parallèle ?</h4>
          <p>
            Oui. Votre espace apprenant vous permet de suivre autant de formations que vous le souhaitez, chacune à votre rythme.
          </p>
        </div>

        <div class="faq-item">
          <h4>Comment un employeur vérifie-t-il mon certificat ?</h4>
          <p>
            Chaque certificat porte un numéro unique (ex. <code>DBG-2026-…</code>). L'équipe Debugger vérifie son authenticité sur demande, à partir de ce numéro ou du QR code.
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
  border: 3px solid rgba(255, 255, 255, 0.95);
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
      color: #042f2e;
      font-size: 0.72rem;
      font-weight: 800;
      padding: 0.35rem 1rem;
      border-radius: var(--radius-full);
      box-shadow: 0 4px 12px rgba(20, 184, 166, 0.4);
      white-space: nowrap;
    }
  }
}

.plan-header {
  margin-bottom: 2rem;

  .plan-name {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-primary-ink);
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

    .ico-yes { color: var(--color-primary-ink); margin-top: 0.15rem; }
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
  border: 3px solid rgba(255, 255, 255, 0.95);
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
      color: var(--color-primary-ink);
      font-size: 0.85rem;
      border: var(--border-w) solid var(--color-border);
    }
  }
  box-shadow: var(--shadow-md);
}

/* =====================================================================
   THÈME CLAY — surcharges de la page
   ===================================================================== */
.plans-hero {
  background-color: transparent;
  background-image: none;
  border-bottom: none;
}

/* Liste des avantages : icône en colonne fixe, le texte (même avec <strong>) reste d'un bloc */
.plan-features li {
  display: block;
  position: relative;
  padding-left: 1.65rem;
  .ico-yes, .ico-no { position: absolute; left: 0; top: 0.1rem; }
}
.faq-item h3, .faq-item h4 { font-family: var(--font-heading); font-weight: 800; }

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
