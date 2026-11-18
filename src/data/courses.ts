// Le contenu des formations vit désormais dans l'API (table formation / module / etape).
// Ce fichier ne garde que les catégories d'affichage (libellés + icônes) et ré-exporte les types.
export * from '../api/types'

export const CATEGORIES = [
  { id: 'all', label: 'Toutes les catégories', icon: 'sparkles', icon3d: 'magic-trick' },
  { id: 'tech', label: 'Tech & Développement', icon: 'bot', icon3d: 'computer' },
  { id: 'business', label: 'Management & Entrepreneuriat', icon: 'briefcase', icon3d: 'bag' },
  { id: 'design', label: 'Design UX/UI & Créativité', icon: 'palette', icon3d: 'color-palette' },
  { id: 'data', label: 'Data & Cybersécurité', icon: 'shield', icon3d: 'shield' },
  { id: 'health', label: 'Santé, Sport & Bien-être', icon: 'leaf', icon3d: 'leaf' },
  { id: 'marketing', label: 'Marketing Digital & Growth', icon: 'trending-up', icon3d: 'megaphone' }
]
