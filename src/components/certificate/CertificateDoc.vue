<template>
  <div class="certificate-container">
    <!-- Top toolbar for actions -->
    <div class="cert-toolbar no-print">
      <div class="verification-pill">
        <span class="status-dot"></span>
        <span>Certificat Authentifié & Valide (ID: {{ certificate.id }})</span>
      </div>

      <div class="toolbar-actions">
        <button class="btn btn-secondary btn-sm" @click="copyLink">
          <app-icon name="link" :size="14" />
          {{ copied ? 'Numéro copié !' : 'Copier le numéro' }}
        </button>
        <button class="btn btn-primary btn-sm" @click="printCertificate">
          <app-icon name="printer" :size="14" />
          Télécharger en PDF / Imprimer
        </button>
      </div>
    </div>

    <!-- Official Certificate Sheet -->
    <div class="printable-certificate" id="certificate-sheet">
      <!-- Decorative Outer Border -->
      <div class="cert-outer-border">
        <div class="cert-inner-border">
          <!-- Corner Ornaments -->
          <div class="corner-ornament top-left"></div>
          <div class="corner-ornament top-right"></div>
          <div class="corner-ornament bottom-left"></div>
          <div class="corner-ornament bottom-right"></div>

          <!-- Header -->
          <div class="cert-header">
            <div class="cert-brand">
              <svg width="46" height="34" viewBox="0 0 56 40" fill="none">
                <path d="M14 8L4 20L14 32" stroke="#0a1038" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M42 8L52 20L42 32" stroke="#0a1038" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M32 6L24 34" stroke="#14b8a6" stroke-width="4" stroke-linecap="round"/>
              </svg>
              <div class="brand-titles">
                <span class="cert-org-name">DEBUGGER GLOBAL LEARNING</span>
                <span class="cert-board">ACADEMIC & PROFESSIONAL CREDENTIALING BOARD</span>
              </div>
            </div>

            <div class="cert-seal">
              <div class="seal-ring">
                <app-icon name="star" :size="11" filled class="seal-star" />
                <span class="seal-text">VERIFIED</span>
                <app-icon name="star" :size="11" filled class="seal-star" />
              </div>
            </div>
          </div>

          <!-- Certificate Title -->
          <div class="cert-main-title">
            <h1>CERTIFICAT DE RÉUSSITE</h1>
            <p class="cert-subtitle">LE PRÉSENT DOCUMENT EST DÉCERNÉ OFFICIELLEMENT À</p>
          </div>

          <!-- Recipient Name -->
          <div class="recipient-section">
            <div class="recipient-name">{{ certificate.studentName }}</div>
            <div class="recipient-underline"></div>
          </div>

          <!-- Body Text -->
          <div class="cert-body-statement">
            <p>
              Pour avoir complété avec succès l’ensemble des modules théoriques, ateliers pratiques et évaluations de compétences du programme :
            </p>
            <h2 class="certified-course-title">« {{ certificate.courseTitle }} »</h2>
            <div class="hours-certification-badge">
              <span>Volume horaire certifié : <strong>{{ certificate.completedHours }} Heures de Formation</strong></span>
              <span class="badge-separator">•</span>
              <span>Score de validation : <strong>{{ certificate.scorePercent }}%</strong></span>
            </div>
          </div>

          <!-- Signatures & Verification Footer -->
          <div class="cert-footer">
            <div class="signature-block">
              <div class="signature-line">
                <span class="signature-cursive">{{ certificate.instructorName }}</span>
              </div>
              <div class="signatory-name">{{ certificate.instructorName }}</div>
              <div class="signatory-title">{{ certificate.instructorRole }}</div>
            </div>

            <div class="qr-block">
              <img :src="certificate.qrUrl" alt="QR Code de vérification" class="cert-qr-img" />
              <span class="qr-caption">Scanner pour vérifier</span>
            </div>

            <div class="signature-block">
              <div class="signature-line">
                <span class="signature-cursive director">Dr. M. Laurent</span>
              </div>
              <div class="signatory-name">Dr. Marc Laurent</div>
              <div class="signatory-title">Directeur des Certifications Debugger</div>
            </div>
          </div>

          <!-- Bottom Meta Bar -->
          <div class="cert-meta-bar">
            <span>Délivré le : <strong>{{ certificate.issueDate }}</strong></span>
            <span>Identifiant Unique : <strong class="cert-id">{{ certificate.id }}</strong></span>
            <span>Vérification : <strong>service des certifications Debugger</strong></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { CertificateRecord } from '../../api/types'
import AppIcon from '../layout/AppIcon.vue'

export default defineComponent({
  name: 'CertificateDoc',
  components: { AppIcon },
  props: {
    certificate: {
      type: Object as PropType<CertificateRecord>,
      required: true
    }
  },
  setup(props) {
    const copied = ref(false)

    const copyLink = () => {
      navigator.clipboard.writeText(props.certificate.id)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2500)
    }

    const printCertificate = () => {
      window.print()
    }

    return {
      copied,
      copyLink,
      printCertificate
    }
  }
})
</script>

<style scoped lang="scss">
.certificate-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  width: 100%;
}

.cert-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 960px;
  margin-bottom: 1.5rem;
  background-color: var(--color-surface-2);
  padding: 1rem 1.5rem;
  border-radius: var(--radius-lg);
  border: var(--border-w) solid var(--color-border);
  box-shadow: var(--shadow-sm);
  flex-wrap: wrap;
  gap: 1rem;
}

.verification-pill {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-primary-ink);

  .status-dot {
    width: 10px;
    height: 10px;
    background-color: var(--color-primary);
    border-radius: 50%;
    box-shadow: 0 0 0 3px var(--color-primary-glow);
  }
}

.toolbar-actions {
  display: flex;
  gap: 0.75rem;
}

/* Printable Certificate Sheet — kept as light "paper" for a realistic, printable diploma look */
.printable-certificate {
  width: 100%;
  max-width: 960px;
  background: #ffffff;
  box-shadow: var(--shadow-xl);
  border-radius: 8px;
  padding: 2.5rem;
  box-sizing: border-box;
}

.cert-outer-border {
  border: 4px solid #0f766e;
  padding: 12px;
  background: #ffffff;
  position: relative;
}

.cert-inner-border {
  border: 1.5px solid #d4a700;
  padding: 2.5rem;
  position: relative;
  background: radial-gradient(circle at center, #ffffff 60%, #f6fbf7 100%);
}

.corner-ornament {
  position: absolute;
  width: 24px;
  height: 24px;
  border: 3px solid #d4a700;

  &.top-left {
    top: 6px;
    left: 6px;
    border-right: none;
    border-bottom: none;
  }

  &.top-right {
    top: 6px;
    right: 6px;
    border-left: none;
    border-bottom: none;
  }

  &.bottom-left {
    bottom: 6px;
    left: 6px;
    border-right: none;
    border-top: none;
  }

  &.bottom-right {
    bottom: 6px;
    right: 6px;
    border-left: none;
    border-top: none;
  }
}

.cert-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.cert-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.brand-titles {
  display: flex;
  flex-direction: column;

  .cert-org-name {
    font-family: var(--font-heading);
    font-size: 1.3rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    color: #0a1038;
  }

  .cert-board {
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    color: #64748b;
    font-weight: 700;
  }
}

.cert-seal {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fec901 0%, #d4a700 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(212, 167, 0, 0.35);

  .seal-ring {
    width: 52px;
    height: 52px;
    border: 1px dashed #ffffff;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-weight: 800;
    font-size: 0.6rem;
    letter-spacing: 0.08em;
    gap: 0.1rem;

    .seal-star { color: #ffffff; }
  }
}

.cert-main-title {
  text-align: center;
  margin-bottom: 1.5rem;

  h1 {
    font-family: var(--font-heading);
    font-size: 2.3rem;
    letter-spacing: 0.1em;
    color: #0a1038;
    margin-bottom: 0.4rem;
  }

  .cert-subtitle {
    font-size: 0.8rem;
    letter-spacing: 0.2em;
    color: #64748b;
    font-weight: 600;
  }
}

.recipient-section {
  text-align: center;
  margin-bottom: 2rem;

  .recipient-name {
    font-family: 'Playfair Display', serif, Georgia;
    font-size: 2.6rem;
    color: #0f766e;
    font-weight: 700;
    font-style: italic;
    margin-bottom: 0.5rem;
  }

  .recipient-underline {
    width: 280px;
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, #0f766e 50%, transparent 100%);
    margin: 0 auto;
  }
}

.cert-body-statement {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 2.5rem auto;

  p {
    color: #475569;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 0.75rem;
  }

  .certified-course-title {
    font-size: 1.6rem;
    color: #0a1038;
    font-weight: 800;
    margin-bottom: 1rem;
  }
}

.hours-certification-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #eefbf1;
  border: 1px solid #bbf0c9;
  color: #14532d;
  padding: 0.45rem 1.25rem;
  border-radius: var(--radius-full);
  font-size: 0.85rem;

  .badge-separator {
    color: #86d89c;
  }
}

.cert-footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.signature-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 220px;

  .signature-line {
    width: 100%;
    border-bottom: 1.5px solid #64748b;
    padding-bottom: 0.25rem;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  .signature-cursive {
    font-family: 'Brush Script MT', 'Dancing Script', cursive;
    font-size: 1.6rem;
    color: #1e293b;

    &.director {
      color: #0f766e;
    }
  }

  .signatory-name {
    font-weight: 700;
    font-size: 0.85rem;
    color: #0f172a;
  }

  .signatory-title {
    font-size: 0.7rem;
    color: #64748b;
    text-align: center;
  }
}

.qr-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;

  .cert-qr-img {
    width: 72px;
    height: 72px;
    border: 1px solid #cbd5e1;
    padding: 3px;
    background: #ffffff;
    border-radius: 4px;
  }

  .qr-caption {
    font-size: 0.65rem;
    color: #64748b;
    text-transform: uppercase;
    font-weight: 600;
  }
}

.cert-meta-bar {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px dashed #cbd5e1;
  font-size: 0.72rem;
  color: #64748b;

  .cert-id {
    color: #0f766e;
    font-family: monospace;
    font-size: 0.8rem;
  }
}

@media (max-width: 768px) {
  .printable-certificate {
    padding: 1rem;
  }

  .cert-inner-border {
    padding: 1rem;
  }

  .cert-footer {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .cert-meta-bar {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>
