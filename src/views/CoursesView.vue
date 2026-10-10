<template>
  <div class="courses-page">
    <!-- Header Banner -->
    <div class="courses-hero">
      <div class="container">
        <span class="badge badge-yellow">Catalogue Complet</span>
        <h1>Toutes les formations certifiantes</h1>
        <p>Explorez notre sélection de formations professionnelles auto-rythmées avec volume d'heures adaptable.</p>

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
            <app-icon :name="cat.icon" :size="14" />
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
              <option value="Tous niveaux">Tous niveaux</option>
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
      <div v-else class="empty-state">
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
import { COURSES, CATEGORIES, Course } from '../data/courses'
import CourseCard from '../components/course/CourseCard.vue'
import AppIcon from '../components/layout/AppIcon.vue'

export default defineComponent({
  name: 'CoursesView',
  components: {
    CourseCard,
    AppIcon
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
      let list = [...COURSES]

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
        list.sort((a, b) => a.defaultHours - b.defaultHours)
      } else {
        list.sort((a, b) => b.enrolledCount - a.enrolledCount)
      }

      return list
    })

    return {
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
  border: 1px solid var(--color-border);
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
    border: 1px solid var(--color-border);
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
      color: #0a1f16;
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
      border: 1px solid var(--color-border);
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
    color: var(--color-primary);
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
  border: 1px solid var(--color-border);

  .empty-icon {
    width: 72px;
    height: 72px;
    margin: 0 auto 1.25rem auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-primary-light);
    border: 1px solid var(--color-border-medium);
    border-radius: 50%;
    color: var(--color-primary);
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
}

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
