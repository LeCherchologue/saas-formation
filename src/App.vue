<template>
  <div id="app" class="app-root">
    <app-navbar v-if="!isLearnRoute" />
    <main class="main-body" :class="{ 'lms-mode': isLearnRoute }">
      <router-view />
    </main>
    <app-footer v-if="!isLearnRoute" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import AppNavbar from './components/layout/AppNavbar.vue'
import AppFooter from './components/layout/AppFooter.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppNavbar,
    AppFooter
  },
  setup() {
    const route = useRoute()

    const isLearnRoute = computed(() => {
      return route.path.startsWith('/learn/')
    })

    return {
      isLearnRoute
    }
  }
})
</script>

<style lang="scss">
@import './assets/styles/main.scss';

.app-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-body {
  flex: 1;

  &.lms-mode {
    display: flex;
    flex-direction: column;
  }
}
</style>
