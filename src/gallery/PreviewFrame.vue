<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
const props = defineProps<{ url: string; name: string }>();
const mode = ref('desktop'),
  container = ref<HTMLElement>(),
  width = ref(1000);
const frameWidth = computed(() =>
  mode.value === 'phone' ? 390 : mode.value === 'responsive' ? width.value : 1440,
);
const frameHeight = computed(() => (mode.value === 'phone' ? 844 : 1000));
const scale = computed(() => Math.min(1, width.value / frameWidth.value));
let observer: ResizeObserver;
onMounted(() => {
  observer = new ResizeObserver((entries) => (width.value = entries[0].contentRect.width));
  if (container.value) observer.observe(container.value);
});
onUnmounted(() => observer?.disconnect());
</script>
<template>
  <div class="g-preview-toolbar">
    <div>
      <button
        v-for="(label, key) in { desktop: 'Desktop', phone: 'Phone', responsive: 'Resizable' }"
        :key="key"
        :aria-pressed="mode === key"
        @click="mode = key"
      >
        {{ label }}
      </button>
    </div>
    <span>{{ Math.round(frameWidth) }} × {{ frameHeight }}</span
    ><a :href="url" target="_blank" rel="noopener">Open full preview ↗</a>
  </div>
  <div class="g-frame-surface">
    <div class="g-frame-resizer" :class="{ resizable: mode === 'responsive' }" ref="container">
      <div
        :style="{
          width: frameWidth * scale + 'px',
          height: frameHeight * scale + 'px',
          margin: 'auto',
          position: 'relative',
        }"
      >
        <iframe
          :key="url"
          :src="url"
          :title="name + ' interactive specimen'"
          :style="{
            width: frameWidth + 'px',
            height: frameHeight + 'px',
            transform: 'scale(' + scale + ')',
            transformOrigin: 'top left',
          }"
        ></iframe>
      </div>
    </div>
  </div>
</template>
