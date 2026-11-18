<template>
  <img
    class="icon-3d"
    :src="src"
    :width="size"
    :height="size"
    :alt="alt"
    :aria-hidden="alt ? undefined : 'true'"
    loading="lazy"
    decoding="async"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

// Icônes 3D de 3dicons.co (licence CC0), servies depuis public/img/3d/
export const ICONS_3D = [
  'bag', 'bulb', 'calendar', 'chart', 'clock', 'color-palette', 'computer',
  'leaf', 'magic-trick', 'medal', 'megaphone', 'notebook', 'rocket', 'shield', 'star',
  'target', 'trophy'
] as const

export type Icon3dName = typeof ICONS_3D[number]

export default defineComponent({
  name: 'Icon3d',
  props: {
    name: { type: String as () => Icon3dName, required: true },
    size: { type: Number, default: 40 },
    // Vide = décoratif (masqué aux lecteurs d'écran)
    alt: { type: String, default: '' }
  },
  setup(props) {
    const src = computed(() => `${process.env.BASE_URL}img/3d/${props.name}.webp`)
    return { src }
  }
})
</script>
