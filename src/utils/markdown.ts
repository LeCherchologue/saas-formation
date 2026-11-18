// Rendu "markdown léger" du contenu des leçons.
// Le texte est d'abord échappé : aucun HTML venant de l'API n'est interprété.

function escapeHtml (s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function inline (s: string): string {
  return s
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}

export function renderMarkdown (text: string | undefined | null): string {
  if (!text) return ''
  const blocks = escapeHtml(text).split(/\n{2,}/)
  return blocks.map((block) => {
    const lines = block.split('\n').filter(l => l.trim() !== '')
    if (lines.length && lines.every(l => /^\s*-\s+/.test(l))) {
      return '<ul>' + lines.map(l => `<li>${inline(l.replace(/^\s*-\s+/, ''))}</li>`).join('') + '</ul>'
    }
    if (lines.length && lines.every(l => /^\s*\d+\.\s+/.test(l))) {
      return '<ol>' + lines.map(l => `<li>${inline(l.replace(/^\s*\d+\.\s+/, ''))}</li>`).join('') + '</ol>'
    }
    return `<p>${inline(lines.join('<br>'))}</p>`
  }).join('')
}
