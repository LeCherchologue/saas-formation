<template>
  <div class="cert-page">
    <div class="container">
      <router-link to="/espace" class="back-link no-print"><app-icon name="arrow-left" :size="16" /> Mon espace</router-link>

      <p v-if="loading" class="state">Chargement du certificat…</p>

      <div v-else-if="needsPayment" class="state-card clay">
        <span class="state-ico"><icon-3d name="medal" :size="60" /></span>
        <h1>Certificat en attente de paiement</h1>
        <p>Réglez la certification depuis votre espace pour accéder à ce certificat.</p>
        <router-link to="/espace" class="btn btn-accent">Payer ma certification</router-link>
      </div>

      <div v-else-if="error" class="state-card clay">
        <span class="state-ico"><app-icon name="alert-triangle" :size="36" /></span>
        <h1>Certificat introuvable</h1>
        <p role="alert">{{ error }}</p>
      </div>

      <div v-else-if="record" class="doc-wrap animate-fade-in">
        <certificate-doc :certificate="record" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CertificateDoc from '../components/certificate/CertificateDoc.vue'
import AppIcon from '../components/layout/AppIcon.vue'
import Icon3d from '../components/ui/Icon3d.vue'
import { learningApi } from '../api'
import { toCertificateRecord } from '../api/mappers'
import { CertificateRecord } from '../api/types'

export default defineComponent({
  name: 'CertificateView',
  components: { CertificateDoc, AppIcon, Icon3d },
  setup () {
    const route = useRoute()
    const record = ref<CertificateRecord | null>(null)
    const loading = ref(true)
    const error = ref('')
    const needsPayment = ref(false)

    onMounted(async () => {
      try {
        record.value = toCertificateRecord(await learningApi.certificate(String(route.params.numero)))
      } catch (e: any) {
        if (e.status === 402) needsPayment.value = true
        else error.value = e.message
      } finally {
        loading.value = false
      }
    })

    return { record, loading, error, needsPayment }
  }
})
</script>

<style scoped lang="scss">
.cert-page { padding: 2rem 0 5rem; }
.back-link {
  display: inline-flex; align-items: center; gap: 0.4rem; min-height: 40px; padding: 0 0.9rem; margin-bottom: 1.5rem;
  border-radius: 12px; font-weight: 800; font-family: var(--font-heading); background: var(--color-surface); box-shadow: var(--shadow-sm);
}
.state { text-align: center; color: var(--color-text-muted); }
.state-card {
  max-width: 560px; margin: 2rem auto; padding: 2.5rem; text-align: center; display: grid; justify-items: center; gap: 0.75rem;
  h1 { font-size: 1.5rem; }
  p { color: var(--color-text-secondary); }
}
.state-ico {
  width: 92px; height: 92px; border-radius: 28px; display: flex; align-items: center; justify-content: center;
  background: var(--pastel-butter); box-shadow: var(--clay-inner), var(--shadow-md);
}
.doc-wrap { max-width: 960px; margin: 0 auto; }
</style>
