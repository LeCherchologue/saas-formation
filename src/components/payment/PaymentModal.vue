<template>
  <div class="modal-backdrop" @click.self="close" @keydown.esc="close">
    <div ref="dialog" class="modal clay animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="pay-title" tabindex="-1">
      <button class="close-btn" aria-label="Fermer" @click="close"><app-icon name="x" :size="18" /></button>

      <!-- Paiement réussi -->
      <div v-if="paidNumero" class="success">
        <span class="success-ico"><icon-3d name="trophy" :size="72" /></span>
        <h2 id="pay-title">Paiement confirmé</h2>
        <p>Votre certificat <strong>{{ paidNumero }}</strong> est disponible.</p>
        <p class="ref" v-if="reference">Référence de transaction : <code>{{ reference }}</code></p>
        <router-link :to="'/certificat/' + paidNumero" class="btn btn-primary btn-lg btn-block" @click="close">
          Voir mon certificat
        </router-link>
      </div>

      <!-- Choix du moyen de paiement -->
      <form v-else @submit.prevent="pay">
        <span class="badge badge-yellow">Certification</span>
        <h2 id="pay-title">Obtenir mon certificat</h2>
        <p class="lead">Vous avez terminé toute la formation. Réglez la certification pour accéder à votre certificat officiel.</p>

        <div class="amount">
          <span>Montant</span>
          <strong>{{ priceLabel }}</strong>
        </div>

        <fieldset class="methods">
          <legend>Moyen de paiement</legend>
          <label v-for="m in methods" :key="m.id" class="method" :class="[m.id, { selected: method === m.id }]">
            <input type="radio" name="methode" :value="m.id" v-model="method" />
            <span class="method-logo" aria-hidden="true">{{ m.short }}</span>
            <span class="method-text">
              <strong>{{ m.label }}</strong>
              <small>{{ m.hint }}</small>
            </span>
          </label>
        </fieldset>

        <div v-if="isMobileMoney" class="field">
          <label for="tel">Numéro {{ methodLabel }}</label>
          <input id="tel" v-model.trim="phone" type="tel" inputmode="tel" autocomplete="tel" class="clay-input"
                 placeholder="Ex : 074 12 34 56" aria-describedby="tel-help" />
          <small id="tel-help">Vous recevrez une demande de confirmation sur ce numéro.</small>
        </div>
        <p v-else class="visa-note">
          <app-icon name="lock" :size="14" />
          Vous serez redirigé vers la page sécurisée de la banque. Aucune donnée de carte n'est saisie sur Debugger.
        </p>

        <p class="simulation">Mode démonstration : aucun opérateur n'est encore branché, le paiement est simulé.</p>

        <p v-if="error" class="form-error" role="alert">{{ error }}</p>

        <button type="submit" class="btn btn-accent btn-lg btn-block" :disabled="loading">
          {{ loading ? 'Paiement en cours…' : `Payer ${priceLabel}` }}
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, PropType } from 'vue'
import AppIcon from '../layout/AppIcon.vue'
import Icon3d from '../ui/Icon3d.vue'
import { paymentApi } from '../../api'
import { Certification, PaymentMethod } from '../../api/types'
import { formatPrice } from '../../utils/format'

const METHODS: { id: PaymentMethod; label: string; short: string; hint: string }[] = [
  { id: 'airtel_money', label: 'Airtel Money', short: 'A', hint: 'Paiement mobile' },
  { id: 'moov_money', label: 'Moov Money', short: 'M', hint: 'Paiement mobile' },
  { id: 'visa', label: 'Carte Visa', short: 'VISA', hint: 'Carte bancaire' }
]

export default defineComponent({
  name: 'PaymentModal',
  components: { AppIcon, Icon3d },
  props: {
    certification: { type: Object as PropType<Certification>, required: true }
  },
  emits: ['close', 'paid'],
  setup (props, { emit }) {
    const dialog = ref<HTMLElement | null>(null)
    const method = ref<PaymentMethod>('airtel_money')
    const phone = ref('')
    const loading = ref(false)
    const error = ref('')
    const paidNumero = ref('')
    const reference = ref('')

    const isMobileMoney = computed(() => method.value !== 'visa')
    const methodLabel = computed(() => (METHODS.find(m => m.id === method.value) || METHODS[0]).label)
    const priceLabel = computed(() => formatPrice(props.certification.price, props.certification.currency))

    onMounted(() => { if (dialog.value) dialog.value.focus() })

    const close = () => emit('close')

    const pay = async () => {
      error.value = ''
      if (isMobileMoney.value && !/^\+?[0-9]{8,15}$/.test(phone.value.replace(/\s/g, ''))) {
        error.value = 'Saisissez un numéro de téléphone valide (8 à 15 chiffres).'
        return
      }
      loading.value = true
      try {
        const p = await paymentApi.pay(props.certification.id, method.value, isMobileMoney.value ? phone.value : undefined)
        reference.value = p.reference_transaction
        paidNumero.value = props.certification.numero
        emit('paid', props.certification.numero)
      } catch (e: any) {
        error.value = e.message
      } finally {
        loading.value = false
      }
    }

    return { dialog, methods: METHODS, method, phone, loading, error, paidNumero, reference, isMobileMoney, methodLabel, priceLabel, close, pay }
  }
})
</script>

<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(4, 47, 46, 0.45);
  backdrop-filter: blur(4px);
}
.modal {
  position: relative;
  width: 100%;
  max-width: 480px;
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  padding: 2rem;
  border-width: 4px;
  box-shadow: var(--shadow-xl);
  &:focus { outline: none; }
  h2 { font-size: 1.5rem; margin: 0.75rem 0 0.5rem; }
}
.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface-3);
  box-shadow: var(--shadow-sm);
}
.lead { color: var(--color-text-secondary); }
.amount {
  margin: 1.25rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  border-radius: var(--radius-md);
  background: var(--pastel-butter);
  box-shadow: var(--clay-inner);
  strong { font-family: var(--font-heading); font-weight: 900; font-size: 1.6rem; }
}
.methods {
  border: none;
  display: grid;
  gap: 0.6rem;
  legend { font-weight: 800; margin-bottom: 0.5rem; }
}
.method {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  min-height: 60px;
  padding: 0.6rem 1rem;
  border-radius: var(--radius-md);
  border: 3px solid transparent;
  background: var(--color-surface-3);
  box-shadow: var(--shadow-pressed);
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s var(--ease-bounce);
  input { position: absolute; opacity: 0; pointer-events: none; }
  &:focus-within { outline: 3px solid var(--color-primary-ink); outline-offset: 2px; }
  &.selected { background: var(--color-surface); border-color: var(--color-primary); box-shadow: var(--shadow-sm); transform: translateY(-1px); }
  .method-text { display: grid; small { color: var(--color-text-muted); } }
}
.method-logo {
  min-width: 52px;
  height: 36px;
  padding: 0 0.5rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 900;
  color: #fff;
  box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.15), inset 0 2px 0 rgba(255, 255, 255, 0.25);
}
.airtel_money .method-logo { background: #dc2626; }
.moov_money .method-logo { background: #1d4ed8; }
.visa .method-logo { background: #1a1f71; font-style: italic; font-size: 0.85rem; }

.field {
  margin-top: 1rem;
  display: grid;
  gap: 0.35rem;
  label { font-weight: 700; }
  input { min-height: 48px; padding: 0 1rem; font-size: 1rem; }
  small { color: var(--color-text-muted); }
}
.visa-note {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}
.simulation {
  margin: 1rem 0;
  font-size: 0.82rem;
  color: #854d0e;
  background: var(--pastel-butter);
  border-radius: var(--radius-sm);
  padding: 0.5rem 0.75rem;
}
.form-error {
  background: #fee2e2;
  color: #991b1b;
  border-radius: var(--radius-sm);
  padding: 0.6rem 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
.success {
  text-align: center;
  p { color: var(--color-text-secondary); margin-bottom: 0.5rem; }
  .ref { font-size: 0.85rem; margin-bottom: 1.5rem; }
}
.success-ico {
  display: inline-flex;
  width: 104px;
  height: 104px;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  background: var(--pastel-butter);
  box-shadow: var(--clay-inner), var(--shadow-md);
}
</style>
