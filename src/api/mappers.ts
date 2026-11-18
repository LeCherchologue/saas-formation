// Conversion des réponses de l'API (champs en français) vers les types du front.
import {
  Course, ModuleSummary, Step, PlayerModule, Certification, Parcours, MyCourse,
  CertificateDetail, User, Submission, QuizResult, AdminSubmission, CertificateRecord
} from './types'
import { formatDate } from '../utils/format'

const NIVEAUX: Record<string, string> = {
  debutant: 'Débutant',
  intermediaire: 'Intermédiaire',
  avance: 'Avancé'
}

const AVATAR_DEFAUT = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'

export function toCourse (f: any): Course {
  const formateur = f.formateur || {}
  return {
    id: f.id,
    slug: f.slug,
    title: f.titre,
    tagline: f.accroche || '',
    description: f.description || '',
    category: f.categorie || 'tech',
    categoryLabel: f.categorie_label || '',
    badge: f.badge || null,
    level: NIVEAUX[f.niveau] || f.niveau,
    rating: f.note || 0,
    reviewsCount: f.nb_avis || 0,
    enrolledCount: f.nb_inscrits || 0,
    hours: f.duree_heures || 0,
    accentColor: f.couleur || '#14b8a6',
    thumbnail: f.image_url || '',
    instructor: {
      name: formateur.nom || 'Équipe Debugger',
      title: formateur.titre_pro || '',
      company: formateur.entreprise || '',
      avatar: formateur.avatar_url || AVATAR_DEFAUT
    },
    skills: f.competences || [],
    benefits: f.avantages || [],
    modulesCount: f.nb_modules || 0,
    stepsCount: f.nb_etapes || 0,
    assignmentsCount: f.nb_devoirs || 0,
    price: f.prix || 0,
    certificationPrice: f.prix_certification || 0,
    currency: f.devise || 'XOF',
    modules: f.modules ? f.modules.map(toModuleSummary) : undefined
  }
}

function toModuleSummary (m: any): ModuleSummary {
  return {
    id: m.id,
    title: m.titre,
    description: m.description,
    order: m.ordre,
    minutes: m.duree_minutes,
    steps: (m.etapes || []).map((e: any) => ({ id: e.id, title: e.titre, type: e.type, minutes: e.duree_minutes }))
  }
}

export function toSubmission (s: any): Submission {
  return {
    id: s.id,
    fileName: s.nom_fichier,
    size: s.taille,
    status: s.statut,
    comment: s.commentaire,
    date: s.date
  }
}

function toStep (e: any): Step {
  return {
    id: e.id,
    order: e.ordre,
    type: e.type,
    title: e.titre,
    minutes: e.duree_minutes,
    status: e.statut,
    score: e.score,
    content: e.contenu,
    keyPoints: e.points_cles,
    questions: e.questions,
    instructions: e.consigne,
    extensions: e.extensions,
    maxSizeMb: e.taille_max_mo,
    submission: e.soumission ? toSubmission(e.soumission) : undefined
  }
}

export function toCertification (c: any): Certification | null {
  if (!c) return null
  return {
    id: c.id,
    numero: c.numero,
    status: c.statut,
    price: c.prix,
    currency: c.devise || 'XOF',
    score: c.score,
    hours: c.heures,
    obtainedAt: c.date_obtention,
    deliveredAt: c.date_delivrance
  }
}

export function toParcours (p: any): Parcours {
  return {
    course: toCourse(p.formation),
    enrollment: { id: p.inscription.id, status: p.inscription.statut, date: p.inscription.date },
    progress: { done: p.progression.terminees, total: p.progression.total, percent: p.progression.pourcentage },
    modules: p.modules.map((m: any): PlayerModule => ({
      id: m.id,
      title: m.titre,
      description: m.description,
      order: m.ordre,
      done: m.termine,
      steps: m.etapes.map(toStep)
    })),
    certification: toCertification(p.certification)
  }
}

export function toMyCourse (i: any): MyCourse {
  return {
    enrollmentId: i.inscription_id,
    status: i.statut,
    enrolledAt: i.date_inscription,
    course: toCourse(i.formation),
    progress: { done: i.progression.terminees, total: i.progression.total, percent: i.progression.pourcentage },
    certification: toCertification(i.certification)
  }
}

export function toCertificateDetail (c: any): CertificateDetail {
  const base = toCertification(c) as Certification
  return {
    ...base,
    student: c.etudiant,
    courseTitle: c.formation,
    courseSlug: c.formation_slug,
    instructor: c.formateur ? { name: c.formateur.nom, title: c.formateur.titre_pro, company: c.formateur.entreprise } : null,
    email: c.email,
    authentic: c.authentique,
    payment: c.paiement
      ? { reference: c.paiement.reference, method: c.paiement.methode, amount: c.paiement.montant, currency: c.paiement.devise, date: c.paiement.date }
      : c.paiement
  }
}

export function toUser (u: any): User {
  return { id: u.id, firstName: u.prenom, lastName: u.nom, email: u.email, role: u.role }
}

export function toQuizResult (r: any): QuizResult {
  return {
    score: r.score,
    threshold: r.seuil,
    passed: r.reussi,
    corrections: r.corrections.map((c: any) => ({
      questionId: c.question_id, correct: c.correct, answer: c.bonne_reponse, explanation: c.explication
    }))
  }
}

export function toAdminSubmission (s: any): AdminSubmission {
  return { ...toSubmission(s), student: s.etudiant, email: s.email, course: s.formation, step: s.etape }
}

// Le QR code renvoie vers la page de vérification (réservée à l'administrateur).
export function toCertificateRecord (c: CertificateDetail): CertificateRecord {
  const verifyUrl = `${window.location.origin}/admin?numero=${encodeURIComponent(c.numero)}`
  const role = c.instructor ? [c.instructor.title, c.instructor.company].filter(Boolean).join(', ') : ''
  return {
    id: c.numero,
    courseTitle: c.courseTitle,
    studentName: c.student,
    completedHours: c.hours || 0,
    issueDate: formatDate(c.deliveredAt || c.obtainedAt),
    scorePercent: c.score || 0,
    instructorName: c.instructor ? c.instructor.name : 'Équipe Debugger',
    instructorRole: role,
    qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(verifyUrl)}`
  }
}
