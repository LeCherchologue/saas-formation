// Appels à l'API, regroupés par domaine.
import { api, downloadFile } from './client'
import * as map from './mappers'
import { PaymentMethod } from './types'

export const authApi = {
  async login (email: string, password: string): Promise<string> {
    const form = new URLSearchParams({ username: email, password })
    const r = await api<{ access_token: string }>('/auth/login', { form, auth: false })
    return r.access_token
  },
  register (data: { prenom: string; nom: string; email: string; mot_de_passe: string }) {
    return api('/auth/register', { json: data, auth: false })
  },
  async me () {
    return map.toUser(await api('/auth/me'))
  }
}

export const catalogueApi = {
  async list () {
    return (await api<any[]>('/catalogue', { auth: false })).map(map.toCourse)
  },
  async detail (slug: string) {
    return map.toCourse(await api(`/catalogue/${encodeURIComponent(slug)}`, { auth: false }))
  }
}

export const learningApi = {
  enroll (slug: string) {
    return api('/apprentissage/inscrire', { json: { slug } })
  },
  async myCourses () {
    return (await api<any[]>('/apprentissage/mes-formations')).map(map.toMyCourse)
  },
  async parcours (slug: string) {
    return map.toParcours(await api(`/apprentissage/parcours/${encodeURIComponent(slug)}`))
  },
  completeLesson (stepId: number) {
    return api(`/apprentissage/etapes/${stepId}/terminer`, { method: 'POST' })
  },
  async submitQuiz (stepId: number, answers: Record<string, number>) {
    return map.toQuizResult(await api(`/apprentissage/etapes/${stepId}/quiz`, { json: { reponses: answers } }))
  },
  async uploadCode (stepId: number, file: File) {
    const form = new FormData()
    form.append('fichier', file)
    return map.toSubmission(await api(`/apprentissage/etapes/${stepId}/depot`, { form }))
  },
  async myCertificates () {
    return (await api<any[]>('/apprentissage/mes-certifications')).map(map.toCertificateDetail)
  },
  async certificate (numero: string) {
    return map.toCertificateDetail(await api(`/apprentissage/certificat/${encodeURIComponent(numero)}`))
  }
}

export const paymentApi = {
  // Paiement simulé côté API : initier puis confirmer.
  async pay (certificationId: number, method: PaymentMethod, phone?: string) {
    const p = await api<{ id: number }>('/paiement/initier', {
      json: { certification_id: certificationId, methode: method, telephone: phone || null }
    })
    return api<{ id: number; statut: string; reference_transaction: string }>(`/paiement/${p.id}/confirmer`, { method: 'POST' })
  }
}

export const adminApi = {
  async verify (numero: string) {
    return map.toCertificateDetail(await api(`/admin/certifications/${encodeURIComponent(numero.trim())}`))
  },
  async certificates () {
    return (await api<any[]>('/admin/certifications')).map(map.toCertificateDetail)
  },
  async submissions (status?: string) {
    const q = status ? `?statut=${encodeURIComponent(status)}` : ''
    return (await api<any[]>(`/admin/soumissions${q}`)).map(map.toAdminSubmission)
  },
  review (id: number, statut: 'valide' | 'refuse', commentaire?: string) {
    return api(`/admin/soumissions/${id}`, { method: 'PUT', json: { statut, commentaire: commentaire || null } })
  },
  download (id: number, filename: string) {
    return downloadFile(`/admin/soumissions/${id}/fichier`, filename)
  }
}
