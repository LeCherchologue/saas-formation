<template>
  <div class="courses-page">
    <!-- Header Banner -->
    <div class="courses-hero">
      <div class="container">
        <span class="badge badge-yellow">Catalogue Complet</span>
        <h1>Toutes les formations certifiantes</h1>
        <p>Explorez notre sélection de formations professionnelles gratuites, à suivre étape par étape. Seul le certificat est payant.</p>

        <!-- Search & Filter Controls Bar -->
        <div class="catalog-search-box">
          <app-icon name="search" :size="16" class="search-ico" />
          <input
            type="text"
            placeholder="Rechercher par compétence, mot-clé, métier (ex: Prompting, IA, Growth...)"
            v-model="searchQuery"
          />
          <button v-if="searchQuery" @click="searchQuery = ''" class="clear-search" aria-label="Effacer la recherche">
            <app-icon name="x" :size="14" />
          </button>
        </div>
      </div>
    </div>

    <div class="container main-catalog-container">
      <!-- Filter Controls Row -->
      <div class="filters-row">
        <!-- Category Chips -->
        <div class="cat-chips-scroll">
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="chip-btn"
            :class="{ 'active': activeCategory === cat.id }"
            @click="activeCategory = cat.id"
          >
            <icon-3d :name="cat.icon3d" :size="22" />
            <span>{{ cat.label }}</span>
          </button>
        </div>

        <!-- Level and Sorting Selectors -->
        <div class="extra-filters">
          <div class="select-group">
            <label>Niveau :</label>
            <select v-model="selectedLevel">
              <option value="all">Tous les niveaux</option>
              <option value="Débutant">Débutant</option>
              <option value="Intermédiaire">Intermédiaire</option>
              <option value="Avancé">Avancé</option>
            </select>
          </div>

          <div class="select-group">
            <label>Trier par :</label>
            <select v-model="sortBy">
              <option value="popular">Popularité & Inscrits</option>
              <option value="rating">Meilleure Note</option>
              <option value="hours-asc">Durée (Croissante)</option>
            </select>
          </div>
        </div>
      </div>

      <p v-if="catalogueStatus === 'loading'" class="catalogue-state">Chargement des formations…</p>
      <div v-else-if="catalogueStatus === 'error'" class="catalogue-state error" role="alert">
        {{ catalogueError }}
        <button class="btn btn-secondary btn-sm" @click="reload">Réessayer</button>
      </div>

      <!-- Results Count -->
      <div class="results-meta">
        <span><strong>{{ filteredCourses.length }}</strong> formation(s) trouvée(s)</span>
        <button v-if="hasActiveFilters" class="reset-filters-btn" @click="resetFilters">
          Réinitialiser les filtres
          <app-icon name="x" :size="12" />
        </button>
      </div>

      <!-- Courses Grid -->
      <div v-if="filteredCourses.length > 0" class="courses-grid">
        <course-card
          v-for="course in filteredCourses"
          :key="course.id"
          :course="course"
        />
      </div>

      <!-- Empty State -->
      <div v-else-if="catalogueStatus === 'ok'" class="empty-state">
        <div class="empty-icon">
          <app-icon name="search" :size="32" />
        </div>
        <h3>Aucune formation ne correspond à vos critères</h3>
        <p>Essayez d'élargir votre recherche ou de réinitialiser les filtres.</p>
        <button class="btn btn-primary" @click="resetFilters">
          Afficher toutes les formations
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { CATEGORIES, Course } from '../data/courses'
import CourseCard from '../components/course/CourseCard.vue'
import AppIcon from '../components/layout/AppIcon.vue'
import Icon3d from '../components/ui/Icon3d.vue'

export default defineComponent({
  name: 'CoursesView',
  components: {
    CourseCard,
    AppIcon,
    Icon3d
  },
  setup() {
    const route = useRoute()
    const store = useStore()

    const searchQuery = ref('')
    const activeCategory = ref('all')
    const selectedLevel = ref('all')
    const sortBy = ref('popular')

    const categories = CATEGORIES

    onMounted(() => {
      if (route.query.q) {
        searchQuery.value = String(route.query.q)
      } else if (store.state.currentSearchQuery) {
        searchQuery.value = store.state.currentSearchQuery
      }

      if (route.query.cat) {
        activeCategory.value = String(route.query.cat)
      }
    })

    watch(() => route.query, (newQ) => {
      if (newQ.q) searchQuery.value = String(newQ.q)
      if (newQ.cat) activeCategory.value = String(newQ.cat)
    })

    const hasActiveFilters = computed(() => {
      return searchQuery.value !== '' || activeCategory.value !== 'all' || selectedLevel.value !== 'all'
    })

    const resetFilters = () => {
      searchQuery.value = ''
      activeCategory.value = 'all'
      selectedLevel.value = 'all'
      store.commit('SET_SEARCH_QUERY', '')
    }

    const filteredCourses = computed(() => {
      let list: Course[] = [...store.state.catalogue]

      // Search
      if (searchQuery.value.trim() !== '') {
        const q = searchQuery.value.toLowerCase().trim()
        list = list.filter(c =>
          c.title.toLowerCase().includes(q) ||
          c.tagline.toLowerCase().includes(q) ||
          c.skills.some(s => s.toLowerCase().includes(q))
        )
      }

      // Category
      if (activeCategory.value !== 'all') {
        list = list.filter(c => c.category === activeCategory.value)
      }

      // Level
      if (selectedLevel.value !== 'all') {
        list = list.filter(c => c.level === selectedLevel.value)
      }

      // Sorting
      if (sortBy.value === 'rating') {
        list.sort((a, b) => b.rating - a.rating)
      } else if (sortBy.value === 'hours-asc') {
        list.sort((a, b) => a.hours - b.hours)
      } else {
        list.sort((a, b) => b.enrolledCount - a.enrolledCount)
      }

      return list
    })

    const catalogueStatus = computed(() => store.state.catalogueStatus)
    const catalogueError = computed(() => store.state.catalogueError)
    const reload = () => store.dispatch('fetchCatalogue', true)

    return {
      catalogueStatus,
      catalogueError,
      reload,
      searchQuery,
      activeCategory,
      selectedLevel,
      sortBy,
      categories,
      filteredCourses,
      hasActiveFilters,
      resetFilters
    }
  }
})
</script>

<style scoped lang="scss">
.catalogue-state { padding: 1rem 0; color: var(--color-text-muted); display: flex; gap: 1rem; align-items: center; &.error { color: #991b1b; font-weight: 600; } }
.courses-page {
  padding-bottom: 5rem;
}

.courses-hero {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 4rem 0 3rem 0;
  text-align: center;

  h1 {
    font-size: 2.8rem;
    color: var(--color-text);
    margin: 0.75rem 0 0.5rem 0;
  }

  p {
    color: var(--color-text-secondary);
    font-size: 1.15rem;
    max-width: 680px;
    margin: 0 auto 2rem auto;
  }
}

.catalog-search-box {
  max-width: 640px;
  margin: 0 auto;
  background-color: var(--color-surface-2);
  border: var(--border-w) solid var(--color-border);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  padding: 0.5rem 1.25rem;
  box-shadow: var(--shadow-lg);

  .search-ico {
    color: var(--color-text-muted);
    margin-right: 0.75rem;
    flex-shrink: 0;
  }

  input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1rem;
    color: var(--color-text);

    &::placeholder { color: var(--color-text-muted); }
  }

  .clear-search {
    display: flex;
    align-items: center;
    color: var(--color-text-muted);
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover { color: var(--color-text); }
  }
}

.main-catalog-container {
  margin-top: 3rem;
}

.filters-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.cat-chips-scroll {
  display: flex;
  gap: 0.6rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;

  .chip-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-full);
    background-color: var(--color-surface-2);
    border: var(--border-w) solid var(--color-border);
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--color-text);
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--color-surface-hover);
      border-color: var(--color-primary);
    }

    &.active {
      background-color: var(--color-primary);
      border-color: var(--color-primary);
      color: #042f2e;
    }
  }
}

.extra-filters {
  display: flex;
  gap: 1rem;

  .select-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: var(--color-text-secondary);

    select {
      background-color: var(--color-surface-2);
      border: var(--border-w) solid var(--color-border);
      padding: 0.45rem 0.85rem;
      border-radius: var(--radius-sm);
      font-size: 0.85rem;
      color: var(--color-text);
      cursor: pointer;
      outline: none;

      option {
        background-color: var(--color-surface-2);
        color: var(--color-text);
      }

      &:focus {
        border-color: var(--color-primary);
      }
    }
  }
}

.results-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  color: var(--color-text-secondary);

  .reset-filters-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    color: var(--color-primary-ink);
    font-weight: 600;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 1rem;
  background-color: var(--color-surface-2);
  border-radius: var(--radius-xl);
  border: 3px solid rgba(255, 255, 255, 0.95);

  .empty-icon {
    width: 72px;
    height: 72px;
    margin: 0 auto 1.25rem auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-primary-light);
    border: var(--border-w) solid var(--color-border-medium);
    border-radius: 50%;
    color: var(--color-primary-ink);
  }

  h3 {
    font-size: 1.5rem;
    color: var(--color-text);
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--color-text-secondary);
    margin-bottom: 1.5rem;
  }
  box-shadow: var(--shadow-md);
}

/* =====================================================================
   THÈME CLAY — surcharges de la page
   ===================================================================== */
.courses-hero {
  background-color: transparent;
  background-image: none;
  border-bottom: none;
}

.catalog-search-box {
  min-height: 56px;
  background-color: var(--color-surface);
  border: 3px solid rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow-md);
}
.cat-chips-scroll .chip-btn {
  min-height: 44px;
  padding-left: 0.5rem;
  border: 2px solid rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow-sm);
  font-family: var(--font-heading);
  font-weight: 800;
  transition: transform 0.25s var(--ease-bounce), box-shadow 0.2s ease, background-color 0.2s ease;
  &:hover { transform: translateY(-2px); border-color: rgba(255, 255, 255, 0.95); }
  &.active { border-color: rgba(255, 255, 255, 0.6); box-shadow: var(--shadow-green); }
}
.extra-filters .select-group select {
  min-height: 44px;
  border-radius: 14px;
  border: 2px solid rgba(255, 255, 255, 0.95);
  background-color: var(--color-surface);
  box-shadow: var(--shadow-sm);
  font-weight: 600;
}
.empty-state .empty-icon { border: none; box-shadow: var(--clay-inner); }

@media (max-width: 1024px) {
  .courses-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .courses-grid {
    grid-template-columns: 1fr;
  }

  .filters-row {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
