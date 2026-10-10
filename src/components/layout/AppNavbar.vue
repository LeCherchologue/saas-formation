<template>
  <div class="header-wrapper">
    <!-- Top bar: audience tabs + language -->
    <div class="top-bar">
      <div class="container top-bar-inner">
        <div class="audience-tabs">
          <router-link to="/" class="audience-tab" :class="{ active: !isBiz }">
            <!-- User icon SVG -->
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            Pour particuliers
          </router-link>
          <router-link to="/businesses" class="audience-tab" :class="{ active: isBiz }">
            <!-- Building icon SVG -->
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
            </svg>
            Entreprises
            <span class="b2b-chip">B2B</span>
          </router-link>
        </div>
        <div class="top-bar-right">
          <!-- Globe SVG -->
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          <select :value="selectedLanguage" @change="changeLang($event)" class="lang-select">
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Main Nav -->
    <header class="main-header" :class="{ scrolled: isScrolled }">
      <div class="container nav-inner">
        <!-- Debugger Logo -->
        <router-link to="/" class="brand-logo">
          <!-- The </> logo (dark brackets + mint slash, matching the brand mark) -->
          <div class="logo-icon">
            <svg viewBox="0 0 56 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Left bracket < -->
              <path d="M14 8L4 20L14 32" stroke="#14171a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              <!-- Right bracket > -->
              <path d="M42 8L52 20L42 32" stroke="#14171a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              <!-- Mint slash / -->
              <path d="M32 6L24 34" stroke="#34d399" stroke-width="4" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="logo-text-block">
            <span class="logo-name">Debugger</span>
            <span class="logo-tagline">SaaS de Formation</span>
          </div>
        </router-link>

        <!-- Search -->
        <div class="nav-search" :class="{ focused: searchFocused }">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="search-icon">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Rechercher (IA, Cybersécurité, Growth...)"
            v-model="search"
            @focus="searchFocused = true"
            @blur="searchFocused = false"
            @keyup.enter="handleSearch"
          />
          <button v-if="search" class="clear-search-btn" @click="search = ''">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <!-- Nav Links -->
        <nav class="nav-links" :class="{ open: mobileOpen }">
          <router-link to="/courses" class="nav-link" @click="mobileOpen = false">
            <!-- Book open icon -->
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            Catalogue
          </router-link>
          <router-link to="/plans" class="nav-link" @click="mobileOpen = false">
            <!-- Zap icon -->
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            Tarifs
          </router-link>
          <router-link to="/businesses" class="nav-link" @click="mobileOpen = false">
            <!-- Briefcase icon -->
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            Entreprises
          </router-link>
          <router-link to="/verify" class="nav-link" @click="mobileOpen = false">
            <!-- Shield check icon -->
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
            </svg>
            Vérifier diplôme
          </router-link>

          <div class="mobile-dash-link">
            <router-link to="/dashboard" class="btn btn-primary btn-sm" @click="mobileOpen = false">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              Mon Espace ({{ enrollCount }})
            </router-link>
          </div>
        </nav>

        <!-- Actions -->
        <div class="nav-actions">
          <router-link to="/dashboard" class="btn btn-primary btn-sm desktop-only">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
            Mon Espace ({{ enrollCount }})
          </router-link>
          <button class="mobile-menu-btn" @click="mobileOpen = !mobileOpen" aria-label="Menu">
            <svg v-if="!mobileOpen" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
            <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'AppNavbar',
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const isScrolled = ref(false)
    const mobileOpen = ref(false)
    const search = ref('')
    const searchFocused = ref(false)

    const isBiz = computed(() => route.path.startsWith('/businesses'))
    const selectedLanguage = computed(() => store.state.selectedLanguage)
    const enrollCount = computed(() => Object.keys(store.state.enrollments || {}).length)

    const onScroll = () => { isScrolled.value = window.scrollY > 20 }
    onMounted(() => window.addEventListener('scroll', onScroll))
    onUnmounted(() => window.removeEventListener('scroll', onScroll))

    const changeLang = (e: Event) => {
      store.commit('SET_LANGUAGE', (e.target as HTMLSelectElement).value)
    }
    const handleSearch = () => {
      if (!search.value.trim()) return
      store.commit('SET_SEARCH_QUERY', search.value)
      router.push({ path: '/courses', query: { q: search.value } })
      mobileOpen.value = false
    }

    return { isScrolled, mobileOpen, search, searchFocused, isBiz, selectedLanguage, enrollCount, changeLang, handleSearch }
  }
})
</script>

<style scoped lang="scss">
.header-wrapper {
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
}

/* Top bar */
.top-bar {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  height: 36px;
  display: flex;
  align-items: center;
}

.top-bar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.audience-tabs {
  display: flex;
  height: 36px;
}

.audience-tab {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  height: 100%;
  padding: 0 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-muted);
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  svg { stroke: currentColor; }

  &:hover { color: var(--color-text-secondary); }

  &.active {
    color: var(--color-primary);
    border-bottom-color: var(--color-primary);
  }
}

.b2b-chip {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  font-size: 0.6rem;
  font-weight: 800;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  letter-spacing: 0.06em;
}

.top-bar-right {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-text-muted);

  .lang-select {
    background: transparent;
    border: none;
    color: var(--color-text-secondary);
    font-size: 0.78rem;
    cursor: pointer;
    outline: none;

    option { background: var(--color-surface); color: var(--color-text); }
  }
}

/* Main header */
.main-header {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  transition: all 0.25s ease;

  &.scrolled {
    background-color: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(20px);
    border-bottom-color: var(--color-border-medium);
    box-shadow: var(--shadow-md);
  }
}

.nav-inner {
  display: flex;
  align-items: center;
  height: 68px;
  gap: 1.5rem;
}

/* Brand logo */
.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-shrink: 0;
}

.logo-icon {
  width: 44px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text-block {
  display: flex;
  flex-direction: column;
  line-height: 1.1;

  .logo-name {
    font-family: var(--font-heading);
    font-size: 1.35rem;
    font-weight: 800;
    color: var(--color-text);
    letter-spacing: -0.02em;
  }

  .logo-tagline {
    font-size: 0.62rem;
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--color-primary);
    font-weight: 600;
  }
}

/* Search bar */
.nav-search {
  flex: 1;
  max-width: 380px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  padding: 0.4rem 1rem;
  transition: all 0.2s ease;

  &.focused {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-glow);
  }

  .search-icon { color: var(--color-text-muted); flex-shrink: 0; }

  input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-size: 0.88rem;
    color: var(--color-text);

    &::placeholder { color: var(--color-text-muted); }
  }

  .clear-search-btn {
    color: var(--color-text-muted);
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover { color: var(--color-text); }
  }
}

/* Nav links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.85rem;
  border-radius: var(--radius-md);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  transition: all 0.2s ease;
  svg { stroke: currentColor; }

  &:hover {
    background-color: var(--color-surface-2);
    color: var(--color-text);
  }

  &.router-link-active {
    color: var(--color-primary);
    background-color: var(--color-primary-light);
  }
}

/* Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.mobile-dash-link {
  display: none;
}

.mobile-menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  background-color: var(--color-surface-2);
  border: 1px solid var(--color-border);
}

@media (max-width: 1020px) {
  .nav-search { max-width: 240px; }
}

@media (max-width: 820px) {
  .desktop-only { display: none; }
  .mobile-menu-btn { display: flex; }
  .nav-search { display: none; }

  .nav-links {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: fixed;
    top: 104px;
    left: 0;
    width: 100%;
    background-color: var(--color-surface);
    border-top: 1px solid var(--color-border);
    padding: 1.5rem;
    gap: 0.75rem;
    transform: translateX(-100%);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
    box-shadow: var(--shadow-lg);

    &.open {
      transform: translateX(0);
      opacity: 1;
      pointer-events: auto;
    }
  }

  .nav-link {
    font-size: 1rem;
    width: 100%;
    padding: 0.75rem 1rem;
  }

  .mobile-dash-link {
    display: block;
    width: 100%;
    margin-top: 0.5rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--color-border);
  }
}
</style>
