// Client HTTP de l'API FastAPI (api-saas-formation).
// L'adresse vient de VUE_APP_API_URL (voir .env.development).

const BASE_URL = (process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api').replace(/\/$/, '')
const TOKEN_KEY = 'debugger_token'

export class ApiError extends Error {
  status: number
  constructor (status: number, message: string) {
    super(message)
    this.status = status
  }
}

export function getToken (): string | null {
  try { return localStorage.getItem(TOKEN_KEY) } catch (e) { return null }
}

export function setToken (token: string | null): void {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch (e) { /* stockage indisponible : la session ne survivra pas au rechargement */ }
}

// Appelé quand l'API répond 401 (jeton expiré) : le store se déconnecte.
let onUnauthorized: (() => void) | null = null
export function setUnauthorizedHandler (fn: () => void): void { onUnauthorized = fn }

interface RequestOptions {
  method?: string
  json?: unknown
  form?: FormData | URLSearchParams
  auth?: boolean
}

function messageErreur (data: any, status: number): string {
  const detail = data && data.detail
  if (typeof detail === 'string') return detail
  if (Array.isArray(detail) && detail.length) {
    // erreurs de validation FastAPI
    return detail.map((d: any) => d.msg).join(' · ')
  }
  if (status === 0) return 'Serveur injoignable. Vérifiez que l\'API est démarrée.'
  return `Erreur ${status}`
}

export async function api<T = any> (path: string, opts: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {}
  const token = getToken()
  if (token && opts.auth !== false) headers.Authorization = `Bearer ${token}`

  let body: BodyInit | undefined
  if (opts.json !== undefined) {
    headers['Content-Type'] = 'application/json'
    body = JSON.stringify(opts.json)
  } else if (opts.form) {
    body = opts.form
  }

  let res: Response
  try {
    res = await fetch(`${BASE_URL}${path}`, { method: opts.method || (body ? 'POST' : 'GET'), headers, body })
  } catch (e) {
    throw new ApiError(0, messageErreur(null, 0))
  }

  const isJson = (res.headers.get('content-type') || '').includes('application/json')
  const data = isJson ? await res.json().catch(() => null) : null

  if (!res.ok) {
    if (res.status === 401 && token && onUnauthorized) onUnauthorized()
    throw new ApiError(res.status, messageErreur(data, res.status))
  }
  return data as T
}

// Téléchargement de fichier protégé (ex. dépôt de code côté admin)
export async function downloadFile (path: string, filename: string): Promise<void> {
  const token = getToken()
  const res = await fetch(`${BASE_URL}${path}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
  if (!res.ok) throw new ApiError(res.status, `Téléchargement impossible (${res.status})`)
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
