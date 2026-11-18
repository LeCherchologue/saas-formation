<template>
  <div class="course-card" :class="{ 'featured': isFeatured }">
    <!-- Card Media -->
    <div class="card-media">
      <img :src="course.thumbnail" :alt="course.title" loading="lazy" class="media-img" />
      <div class="media-overlay"></div>

      <div class="badges-top">
        <span class="category-chip">{{ course.categoryLabel }}</span>
        <span v-if="course.badge" class="highlight-chip">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          {{ course.badge }}
        </span>
      </div>

      <div class="duration-badge">
        <!-- Clock icon SVG -->
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
        {{ course.hours }} h · Gratuit
      </div>
    </div>

    <!-- Card Body -->
    <div class="card-body">
      <div class="rating-row">
        <div v-if="course.reviewsCount" class="stars">
          <!-- Star SVG -->
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#facc15">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span class="rating-score">{{ course.rating.toFixed(2) }}</span>
          <span class="reviews-count">({{ course.reviewsCount }})</span>
        </div>
        <span v-else class="new-chip">Nouvelle formation</span>
        <span class="students-count">
          <!-- Users SVG -->
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          {{ formatStudents(course.enrolledCount) }}
        </span>
      </div>

      <h3 class="course-title">
        <router-link :to="'/course/' + course.slug">{{ course.title }}</router-link>
      </h3>

      <p class="course-tagline">{{ course.tagline }}</p>

      <div class="skills-row">
        <span v-for="skill in course.skills.slice(0, 3)" :key="skill" class="skill-tag">
          {{ skill }}
        </span>
      </div>
    </div>

    <!-- Card Footer -->
    <div class="card-footer">
      <div class="instructor-mini">
        <img :src="course.instructor.avatar" :alt="course.instructor.name" class="avatar-mini" />
        <div class="instructor-info">
          <span class="instructor-name">{{ course.instructor.name }}</span>
          <span class="instructor-role">{{ course.instructor.company }}</span>
        </div>
      </div>

      <router-link :to="'/course/' + course.slug" class="btn btn-primary btn-sm">
        Voir →
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Course } from '../../data/courses'

export default defineComponent({
  name: 'CourseCard',
  props: {
    course: { type: Object as PropType<Course>, required: true },
    isFeatured: { type: Boolean, default: false }
  },
  setup() {
    const formatStudents = (num: number) => {
      if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
      return num.toString()
    }
    return { formatStudents }
  }
})
</script>

<style scoped lang="scss">
.new-chip { font-size: 0.78rem; font-weight: 800; color: var(--color-primary-ink); }
.course-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: var(--border-w) solid var(--color-border);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg), var(--shadow-green);
    border-color: var(--color-border-medium);

    .media-img { transform: scale(1.05); }
  }

  &.featured {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-green);
  }
}

.card-media {
  position: relative;
  height: 200px;
  overflow: hidden;
  background-color: var(--color-surface-2);

  .media-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .media-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(4, 47, 46, 0.3) 0%, rgba(4, 47, 46, 0.72) 100%);
  }
}

.badges-top {
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  display: flex;
  gap: 0.4rem;
  z-index: 2;
}

.category-chip {
  background-color: rgba(19, 78, 74, 0.82);
  color: #f0fdfa;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(4px);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.highlight-chip {
  background-color: rgba(20, 184, 166, 0.22);
  color: #5eead4;
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(20, 184, 166, 0.45);
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  backdrop-filter: blur(4px);
  svg { stroke: currentColor; }
}

.duration-badge {
  position: absolute;
  bottom: 0.85rem;
  right: 0.85rem;
  background-color: rgba(19, 78, 74, 0.78);
  backdrop-filter: blur(8px);
  color: #5eead4;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.3rem 0.65rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(20, 184, 166, 0.3);
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  svg { stroke: currentColor; }
}

.card-body {
  padding: 1.4rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.rating-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.85rem;
}

.stars {
  display: flex;
  align-items: center;
  gap: 0.3rem;

  .rating-score {
    font-weight: 700;
    font-size: 0.85rem;
    color: var(--color-text);
  }

  .reviews-count {
    color: var(--color-text-muted);
    font-size: 0.78rem;
  }
}

.students-count {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--color-text-muted);
  font-size: 0.78rem;
  svg { stroke: currentColor; }
}

.course-title {
  font-size: 1.1rem;
  margin-bottom: 0.55rem;
  line-height: 1.35;

  a {
    color: var(--color-text);
    transition: color 0.2s ease;
    &:hover { color: var(--color-primary-ink); }
  }
}

.course-tagline {
  color: var(--color-text-secondary);
  font-size: 0.87rem;
  line-height: 1.5;
  margin-bottom: 1.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.skills-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: auto;
}

.skill-tag {
  background-color: var(--color-surface-2);
  border: var(--border-w) solid var(--color-border);
  color: var(--color-text-muted);
  font-size: 0.72rem;
  padding: 0.18rem 0.5rem;
  border-radius: var(--radius-sm);
  font-weight: 500;
  font-family: var(--font-mono);
}

.card-footer {
  padding: 1rem 1.4rem;
  border-top: 1px solid var(--color-border-subtle);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-surface-2);
}

.instructor-mini {
  display: flex;
  align-items: center;
  gap: 0.6rem;

  .avatar-mini {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    border: var(--border-w) solid var(--color-border);
  }

  .instructor-info { display: flex; flex-direction: column; }
  .instructor-name { font-size: 0.78rem; font-weight: 700; color: var(--color-text); line-height: 1.2; }
  .instructor-role { font-size: 0.68rem; color: var(--color-text-muted); }
}
/* =====================================================================
   THÈME CLAY — carte de formation
   ===================================================================== */
.course-card {
  border: 4px solid rgba(255, 255, 255, 0.95);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  transition: transform 0.35s var(--ease-bounce), box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-8px) rotate(-0.4deg);
    box-shadow: var(--shadow-lg);
  }
}
.card-media {
  margin: 8px 8px 0;
  border-radius: calc(var(--radius-xl) - 10px);
  overflow: hidden;
}
.category-chip,
.duration-badge,
.highlight-chip {
  border-radius: var(--radius-full);
  border: 2px solid rgba(255, 255, 255, 0.35);
  font-family: var(--font-heading);
  font-weight: 800;
}
.highlight-chip {
  background-color: var(--color-achievement);
  color: #431407;
  border-color: rgba(255, 255, 255, 0.6);
}
.course-title { font-family: var(--font-heading); font-weight: 800; }
.skill-tag {
  background-color: var(--pastel-mint);
  border: 2px solid rgba(255, 255, 255, 0.95);
  color: var(--color-primary-ink);
  border-radius: var(--radius-full);
  font-weight: 700;
}
.card-footer {
  margin: 0 8px 8px;
  border-top: none;
  border-radius: calc(var(--radius-xl) - 10px);
  background-color: var(--color-surface-3);
  box-shadow: var(--shadow-pressed);
}

</style>
