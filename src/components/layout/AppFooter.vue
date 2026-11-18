<template>
  <footer class="main-footer">
    <div class="container">
      <!-- Guarantee strip -->
      <div class="footer-guarantee">
        <div class="guarantee-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <polyline points="9 12 11 14 15 10"/>
          </svg>
        </div>
        <div class="guarantee-text">
          <h4>Formations gratuites, certificats officiels</h4>
          <p>Suivez gratuitement toutes nos formations. À la fin du parcours, obtenez votre certificat pour 5 100 FCFA par Airtel Money, Moov Money ou Visa.</p>
        </div>
        <router-link to="/connexion?mode=register" class="btn btn-outline-green btn-sm">
          Créer mon compte
        </router-link>
      </div>

      <!-- Footer links grid -->
      <div class="footer-grid">
        <!-- Brand column -->
        <div class="footer-col brand-col">
          <div class="footer-logo">
            <svg viewBox="0 0 56 40" width="44" height="32" fill="none">
              <path d="M14 8L4 20L14 32" stroke="#f0fdfa" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M42 8L52 20L42 32" stroke="#f0fdfa" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M32 6L24 34" stroke="#14b8a6" stroke-width="4" stroke-linecap="round"/>
            </svg>
            <div>
              <span class="footer-brand-name">Debugger</span>
              <span class="footer-brand-sub">SaaS de Formation</span>
            </div>
          </div>
          <p class="brand-desc">
            La plateforme de formation technique &amp; professionnelle nouvelle génération. Apprenez ce qui compte, à votre rythme, avec un certificat reconnu.
          </p>
          <div class="social-links">
            <!-- LinkedIn -->
            <a href="#" aria-label="LinkedIn" class="social-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <!-- GitHub -->
            <a href="#" aria-label="GitHub" class="social-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </a>
            <!-- YouTube -->
            <a href="#" aria-label="YouTube" class="social-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#080c10"/>
              </svg>
            </a>
            <!-- Twitter/X -->
            <a href="#" aria-label="Twitter" class="social-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

        <div class="footer-col">
          <h5>Formations</h5>
          <ul>
            <li><router-link to="/courses?cat=tech">IA &amp; Développement</router-link></li>
            <li><router-link to="/courses?cat=marketing">Growth &amp; Marketing</router-link></li>
            <li><router-link to="/courses?cat=design">Product Design UX/UI</router-link></li>
            <li><router-link to="/courses?cat=data">Cybersécurité &amp; Data</router-link></li>
            <li><router-link to="/courses?cat=business">Leadership &amp; Management</router-link></li>
            <li><router-link to="/courses?cat=health">RSE &amp; Développement Durable</router-link></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>Plateforme</h5>
          <ul>
            <li><router-link to="/about">À propos</router-link></li>
            <li><router-link to="/courses">Catalogue complet</router-link></li>
            <li><router-link to="/plans">Tarifs &amp; Formules</router-link></li>
            <li><router-link to="/businesses">Debugger Entreprises</router-link></li>
            <li><router-link to="/espace">Mon espace apprenant</router-link></li>
            <li><router-link to="/connexion">Se connecter</router-link></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>Légal &amp; Confiance</h5>
          <ul>
            <li><a href="#">Normes &amp; Accréditations</a></li>
            <li><a href="#">Politique de confidentialité</a></li>
            <li><a href="#">Conditions générales</a></li>
            <li><a href="#">Sécurité &amp; RGPD</a></li>
            <li><a href="#">Mentions légales</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom -->
      <div class="footer-bottom">
        <span>© 2026 Debugger SaaS. Tous droits réservés.</span>
        <div class="compliance-chips">
          <span class="chip">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            RGPD Conforme
          </span>
          <span class="chip">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Cloud UE Sécurisé
          </span>
          <span class="chip">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            ISO 9001
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'AppFooter' })
</script>

<style scoped lang="scss">
/* Dark footer anchor on an otherwise light page — token overrides scoped to this subtree
   so every existing var(--color-*) rule below reads correctly on the dark background. */
.main-footer {
  --color-text: #f0fdfa;
  --color-text-secondary: #c3c9c6;
  --color-text-muted: #9aa39f;
  --color-text-light: #6b7370;
  --color-surface-2: #1c2023;
  --color-border: rgba(255, 255, 255, 0.10);
  --color-border-subtle: rgba(255, 255, 255, 0.06);
  --color-border-medium: rgba(20, 184, 166, 0.32);
  --color-primary-light: rgba(20, 184, 166, 0.14);

  background-color: #134e4a;
  color: var(--color-text-secondary);
  padding: 4rem 0 2rem 0;
  border-top: 1px solid var(--color-border);
}

.footer-guarantee {
  background: linear-gradient(135deg, rgba(20, 184, 166, 0.10) 0%, rgba(14, 143, 166, 0.06) 100%);
  border: var(--border-w) solid var(--color-border-medium);
  border-radius: var(--radius-lg);
  padding: 1.75rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3.5rem;

  .guarantee-icon {
    width: 52px;
    height: 52px;
    background-color: var(--color-primary-light);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--color-primary);
    border: var(--border-w) solid var(--color-border-medium);
  }

  .guarantee-text {
    flex: 1;

    h4 { color: var(--color-text); font-size: 1rem; margin-bottom: 0.3rem; }
    p { font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.5; }
  }
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid var(--color-border-subtle);
}

.brand-col {
  .footer-logo {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 1.2rem;
  }

  .footer-brand-name {
    display: block;
    font-family: var(--font-heading);
    font-size: 1.35rem;
    font-weight: 800;
    color: var(--color-text);
  }

  .footer-brand-sub {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--color-primary);
  }

  .brand-desc {
    font-size: 0.88rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    max-width: 340px;
  }
}

.social-links { display: flex; gap: 0.6rem; }

.social-btn {
  width: 36px;
  height: 36px;
  background-color: var(--color-surface-2);
  border: var(--border-w) solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-primary-light);
    border-color: var(--color-primary);
    color: var(--color-primary);
    transform: translateY(-2px);
  }
}

.footer-col {
  h5 {
    color: var(--color-text);
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 1rem;
    letter-spacing: 0.04em;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.65rem;

    a {
      font-size: 0.875rem;
      color: var(--color-text-muted);
      transition: color 0.2s ease;

      &:hover { color: var(--color-primary); }
    }
  }
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 2rem;
  font-size: 0.8rem;
  color: var(--color-text-light);
  flex-wrap: wrap;
  gap: 1rem;
}

.compliance-chips { display: flex; gap: 0.75rem; flex-wrap: wrap; }

.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background-color: var(--color-surface-2);
  border: var(--border-w) solid var(--color-border);
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-sm);
  font-size: 0.72rem;
  color: var(--color-text-muted);
  svg { stroke: var(--color-primary); }
}

/* =====================================================================
   THÈME CLAY — pied de page sarcelle foncé arrondi
   ===================================================================== */
.main-footer {
  --color-primary: #5eead4;
  --color-primary-ink: #5eead4;
  --color-surface-2: #1a5c57;
  --color-text-secondary: #cde7e3;
  --color-text-muted: #a9cbc6;
  margin: 2rem 0.75rem 0.75rem;
  border-radius: 40px;
  border: 4px solid rgba(255, 255, 255, 0.6);
  border-top: 4px solid rgba(255, 255, 255, 0.6);
  box-shadow: var(--shadow-xl), inset 0 4px 0 rgba(255, 255, 255, 0.08);
}
.footer-guarantee {
  background: rgba(255, 255, 255, 0.06);
  border: 2px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-lg);
  box-shadow: inset 0 3px 0 rgba(255, 255, 255, 0.06);
}
.footer-brand-name { font-family: var(--font-heading); font-weight: 900; }
.social-btn, .chip {
  border-radius: 14px;
  border: 2px solid rgba(255, 255, 255, 0.12);
  box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.06);
}

@media (max-width: 900px) {
  .footer-grid { grid-template-columns: 1fr 1fr; }
  .footer-guarantee { flex-direction: column; align-items: flex-start; }
}

@media (max-width: 560px) {
  .footer-grid { grid-template-columns: 1fr; }
  .footer-bottom { flex-direction: column; align-items: flex-start; }
}
</style>
