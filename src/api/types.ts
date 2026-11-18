// Types utilisés par les vues (format front), construits à partir des réponses de l'API.

export interface Instructor {
  name: string
  title: string
  company: string
  avatar: string
}

export type StepType = 'lecon' | 'quiz' | 'devoir'
export type StepStatus = 'terminee' | 'disponible' | 'verrouillee'

export interface StepSummary {
  id: number
  title: string
  type: StepType
  minutes: number
}

export interface ModuleSummary {
  id: number
  title: string
  description: string
  order: number
  minutes: number
  steps: StepSummary[]
}

export interface Course {
  id: number
  slug: string
  title: string
  tagline: string
  description: string
  category: string
  categoryLabel: string
  badge: string | null
  level: string
  rating: number
  reviewsCount: number
  enrolledCount: number
  hours: number
  accentColor: string
  thumbnail: string
  instructor: Instructor
  skills: string[]
  benefits: string[]
  modulesCount: number
  stepsCount: number
  assignmentsCount: number
  price: number
  certificationPrice: number
  currency: string
  modules?: ModuleSummary[]
}

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
}

export interface Submission {
  id: number
  fileName: string
  size: number
  status: 'soumis' | 'valide' | 'refuse'
  comment: string | null
  date: string | null
}

export interface Step {
  id: number
  order: number
  type: StepType
  title: string
  minutes: number
  status: StepStatus
  score?: number | null
  content?: string
  keyPoints?: string[]
  questions?: QuizQuestion[]
  instructions?: string
  extensions?: string[]
  maxSizeMb?: number
  submission?: Submission
}

export interface PlayerModule {
  id: number
  title: string
  description: string
  order: number
  done: boolean
  steps: Step[]
}

export type CertificationStatus = 'en_attente_paiement' | 'payee' | 'annulee'

export interface Certification {
  id: number
  numero: string
  status: CertificationStatus
  price: number
  currency: string
  score: number | null
  hours: number | null
  obtainedAt: string | null
  deliveredAt: string | null
}

export interface Progress {
  done: number
  total: number
  percent: number
}

export interface Parcours {
  course: Course
  enrollment: { id: number; status: string; date: string }
  progress: Progress
  modules: PlayerModule[]
  certification: Certification | null
}

export interface MyCourse {
  enrollmentId: number
  status: string
  enrolledAt: string
  course: Course
  progress: Progress
  certification: Certification | null
}

export interface CertificateDetail extends Certification {
  student: string
  courseTitle: string
  courseSlug: string
  instructor: { name: string; title: string | null; company: string | null } | null
  email?: string
  authentic?: boolean
  payment?: { reference: string; method: string; amount: number; currency: string; date: string | null } | null
}

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: 'etudiant' | 'formateur' | 'admin'
}

export interface QuizResult {
  score: number
  threshold: number
  passed: boolean
  corrections: { questionId: number; correct: boolean; answer?: number; explanation?: string | null }[]
}

export type PaymentMethod = 'airtel_money' | 'moov_money' | 'visa'

export interface AdminSubmission extends Submission {
  student: string
  email: string
  course: string
  step: string
}

// Format attendu par le composant d'affichage CertificateDoc
export interface CertificateRecord {
  id: string
  courseTitle: string
  studentName: string
  completedHours: number
  issueDate: string
  scorePercent: number
  instructorName: string
  instructorRole: string
  qrUrl: string
}
