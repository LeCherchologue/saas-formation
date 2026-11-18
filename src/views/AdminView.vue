<template>
  <div class="admin-page">
    <div class="container">
      <header class="admin-head">
        <span class="badge badge-pink">Administration</span>
        <h1>Vérification des diplômes</h1>
        <p>Contrôlez l'authenticité d'un certificat Debugger et suivez les codes envoyés par les apprenants.</p>
      </header>

      <!-- Vérification -->
      <section class="clay verify-card" aria-labelledby="verif-title">
        <h2 id="verif-title" class="sr-only">Vérifier un certificat</h2>
        <form class="verify-form" @submit.prevent="verify">
          <label for="numero" class="sr-only">Numéro du certificat</label>
          <input id="numero" v-model.trim="numero" class="clay-input" placeholder="Numéro du certificat, ex. DBG-2026-A1B2C3"
                 autocomplete="off" spellcheck="false" />
          <button class="btn btn-primary" :disabled="!numero || verifying">{{ verifying ? 'Vérification…' : 'Vérifier' }}</button>
        </form>

        <p v-if="verifyError" class="result ko" role="alert"><app-icon name="alert-triangle" :size="18" /> {{ verifyError }}</p>

        <div v-else-if="found" class="result-box" :class="found.authentic ? 'ok' : 'warn'" role="status">
          <div class="result-head">
            <app-icon :name="found.authentic ? 'shield-check' : 'alert-triangle'" :size="22" />
            <strong>{{ found.authentic ? 'Certificat authentique et délivré' : statusText(found.status) }}</strong>
          </div>
          <dl class="facts">
            <div><dt>Titulaire</dt><dd>{{ found.student }} <small>({{ found.email }})</small></dd></div>
            <div><dt>Formation</dt><dd>{{ found.courseTitle }}</dd></div>
            <div><dt>Volume / score</dt><dd>{{ found.hours }} h · {{ found.score }} %</dd></div>
            <div><dt>Obtenu le</dt><dd>{{ formatDate(found.obtainedAt) }}</dd></div>
            <div><dt>Délivré le</dt><dd>{{ formatDate(found.deliveredAt) }}</dd></div>
            <div v-if="found.payment"><dt>Paiement</dt><dd>{{ paymentLabel(found.payment.method) }} · {{ formatPrice(found.payment.amount, found.payment.currency) }} · réf. {{ found.payment.reference }}</dd></div>
          </dl>
          <button v-if="found.authentic" class="btn btn-secondary btn-sm" @click="showDoc = !showDoc">
            <app-icon name="eye" :size="14" /> {{ showDoc ? 'Masquer' : 'Afficher' }} le certificat
          </button>
        </div>
        <div v-if="found && found.authentic && showDoc" class="doc-wrap">
          <certificate-doc :certificate="record(found)" />
        </div>
      </section>

      <!-- Dépôts de code -->
      <section class="block" aria-labelledby="depots-title">
        <div class="block-head">
          <h2 id="depots-title">Codes envoyés par les apprenants</h2>
          <div class="filters" role="group" aria-label="Filtrer les dépôts">
            <button v-for="f in filters" :key="f.id" class="chip" :class="{ active: filter === f.id }" @click="setFilter(f.id)">{{ f.label }}</button>
          </div>
        </div>
        <p v-if="subError" class="result ko">{{ subError }}</p>
        <p v-else-if="!submissions.length" class="muted">Aucun dépôt pour le moment.</p>
        <div v-else class="table-wrap clay">
          <table>
            <thead><tr><th>Apprenant</th><th>Formation / étape</th><th>Fichier</th><th>Statut</th><th><span class="sr-only">Actions</span></th></tr></thead>
            <tbody>
              <tr v-for="s in submissions" :key="s.id">
                <td><strong>{{ s.student }}</strong><br><small>{{ s.email }}</small></td>
                <td>{{ s.course }}<br><small>{{ s.step }}</small></td>
                <td>
                  <button class="link" @click="download(s)"><app-icon name="download" :size="14" /> {{ s.fileName }}</button>
                  <br><small>{{ formatSize(s.size) }} · {{ formatDate(s.date) }}</small>
                </td>
                <td><span class="status" :class="s.status">{{ subLabel(s.status) }}</span></td>
                <td class="actions">
                  <button class="btn btn-sm btn-outline-green" :disabled="s.status === 'valide'" @click="review(s, 'valide')">Valider</button>
                  <button class="btn btn-sm btn-secondary" :disabled="s.status === 'refuse'" @click="review(s, 'refuse')">Refuser</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppIcon from '../components/layout/AppIcon.vue'
import CertificateDoc from '../components/certificate/CertificateDoc.vue'
import { adminApi } from '../api'
import { toCertificateRecord } from '../api/mappers'
import { AdminSubmission, CertificateDetail } from '../api/types'
import { formatDate, formatPrice, formatSize, PAYMENT_LABELS } from '../utils/format'

export default defineComponent({
  name: 'AdminView',
  components: { AppIcon, CertificateDoc },
  setup () {
    const route = useRoute()
    const numero = ref(typeof route.query.numero === 'string' ? route.query.numero : '')
    const verifying = ref(false)
    const verifyError = ref('')
    const found = ref<CertificateDetail | null>(null)
    const showDoc = ref(false)

    const submissions = ref<AdminSubmission[]>([])
    const subError = ref('')
    const filter = ref('soumis')
    const filters = [
      { id: 'soumis', label: 'À examiner' },
      { id: 'valide', label: 'Validés' },
      { id: 'refuse', label: 'Refusés' },
      { id: '', label: 'Tous' }
    ]

    const verify = async () => {
      verifying.value = true
      verifyError.value = ''
      found.value = null
      showDoc.value = false
      try {
        found.value = await adminApi.verify(numero.value)
      } catch (e: any) {
        verifyError.value = e.status === 404 ? 'Aucun certificat ne porte ce numéro : ce diplôme n\'a pas été délivré par Debugger.' : e.message
      } finally {
        verifying.value = false
      }
    }

    const loadSubmissions = async () => {
      subError.value = ''
      try { submissions.value = await adminApi.submissions(filter.value || undefined) } catch (e: any) { subError.value = e.message }
    }
    const setFilter = (f: string) => { filter.value = f; loadSubmissions() }

    const review = async (s: AdminSubmission, statut: 'valide' | 'refuse') => {
      let comment: string | undefined
      if (statut === 'refuse') {
        const c = window.prompt('Motif du refus (visible par l\'apprenant) :')
        if (c === null) return
        comment = c
      }
      try {
        await adminApi.review(s.id, statut, comment)
        await loadSubmissions()
      } catch (e: any) { subError.value = e.message }
    }

    const download = async (s: AdminSubmission) => {
      try { await adminApi.download(s.id, s.fileName) } catch (e: any) { subError.value = e.message }
    }

    const statusText = (st: string) => st === 'en_attente_paiement' ? 'Formation terminée, certificat non payé : pas encore délivré' : 'Certificat annulé'
    const subLabel = (st: string) => ({ soumis: 'À examiner', valide: 'Validé', refuse: 'Refusé' }[st] || st)
    const paymentLabel = (m: string) => PAYMENT_LABELS[m] || m

    onMounted(() => {
      if (numero.value) verify()
      loadSubmissions()
    })

    return {
      numero, verifying, verifyError, found, showDoc, verify, record: toCertificateRecord,
      submissions, subError, filter, filters, setFilter, review, download,
      statusText, subLabel, paymentLabel, formatDate, formatPrice, formatSize
    }
  }
})
</script>

<style scoped lang="scss">
.admin-page { padding: 2.5rem 0 5rem; }
.admin-head {
  margin-bottom: 1.5rem;
  h1 { font-size: clamp(1.9rem, 3.5vw, 2.6rem); margin: 0.75rem 0 0.4rem; }
  p { color: var(--color-text-secondary); }
}
.verify-card { padding: 1.75rem; margin-bottom: 3rem; border-width: 4px; }
.verify-form {
  display: flex; gap: 0.75rem;
  input { flex: 1; min-height: 52px; padding: 0 1.1rem; font-size: 1rem; font-family: var(--font-mono); }
}
.result { margin-top: 1rem; display: flex; gap: 0.5rem; align-items: center; font-weight: 700; &.ko { color: #991b1b; } }
.result-box {
  margin-top: 1.25rem; padding: 1.25rem 1.5rem; border-radius: var(--radius-lg); box-shadow: var(--clay-inner);
  &.ok { background: var(--pastel-mint); }
  &.warn { background: var(--pastel-butter); }
}
.result-head { display: flex; align-items: center; gap: 0.6rem; font-size: 1.1rem; margin-bottom: 1rem; color: var(--color-text); }
.facts {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.75rem 1.5rem; margin-bottom: 1rem;
  dt { font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); }
  dd { font-weight: 600; }
}
.doc-wrap { margin-top: 1.5rem; }

.block-head { display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem; h2 { font-size: 1.5rem; } }
.filters { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.chip {
  min-height: 40px; padding: 0 1rem; border-radius: var(--radius-full); font-weight: 800; font-family: var(--font-heading);
  background: var(--color-surface); box-shadow: var(--shadow-sm);
  &.active { background: var(--color-primary); color: var(--color-on-primary); }
}
.table-wrap { overflow-x: auto; padding: 0.5rem; }
table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
th { text-align: left; padding: 0.75rem; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); }
td { padding: 0.75rem; border-top: 2px solid var(--color-border-subtle); vertical-align: top; small { color: var(--color-text-muted); } }
.actions { white-space: nowrap; display: flex; gap: 0.4rem; }
.link { display: inline-flex; align-items: center; gap: 0.3rem; color: var(--color-primary-ink); font-weight: 700; text-decoration: underline; }
.status {
  display: inline-block; padding: 0.2rem 0.7rem; border-radius: var(--radius-full); font-weight: 800; font-size: 0.8rem;
  &.soumis { background: var(--pastel-butter); color: #854d0e; }
  &.valide { background: var(--pastel-mint); color: var(--color-primary-ink); }
  &.refuse { background: #fee2e2; color: #991b1b; }
}
.muted { color: var(--color-text-muted); }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

@media (max-width: 600px) {
  .verify-form { flex-direction: column; }
}
</style>
