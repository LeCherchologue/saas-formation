// Formatage partagé (montants en FCFA, dates en français).

export function formatPrice (amount: number, currency = 'XOF'): string {
  const n = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(amount)
  return currency === 'XOF' ? `${n} FCFA` : `${n} ${currency}`
}

export function formatDate (iso: string | null | undefined): string {
  if (!iso) return '—'
  const d = new Date(iso)
  if (isNaN(d.getTime())) return '—'
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(d)
}

export function formatMinutes (minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m ? `${h} h ${m}` : `${h} h`
}

export function formatSize (bytes: number): string {
  if (bytes < 1024) return `${bytes} o`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} Ko`
  return `${(bytes / 1024 / 1024).toFixed(1)} Mo`
}

export const PAYMENT_LABELS: Record<string, string> = {
  airtel_money: 'Airtel Money',
  moov_money: 'Moov Money',
  visa: 'Visa'
}
