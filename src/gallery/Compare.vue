<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { designs, thumbnail } from './data';
const route = useRoute(),
  router = useRouter(),
  viewport = ref('desktop');
const ids = computed(() =>
  String(route.query.ids || '01,27')
    .split(',')
    .slice(0, 2),
);
const pair = computed(() =>
  ids.value.map((id) => designs.find((d) => d.id === id)).filter((d) => !!d),
);
function change(index: number, id: string) {
  const next = [...ids.value];
  next[index] = id;
  router.replace({ query: { ids: next.join(',') } });
}
</script>
<template>
  <main id="main" class="g-inspector">
    <RouterLink to="/" class="g-back">← Back to the collection</RouterLink>
    <div class="g-detail-heading">
      <div>
        <p class="g-kicker">SIDE BY SIDE</p>
        <h1>Two ways to approach it.</h1>
        <p>Compare the principles. Choose what fits your project.</p>
      </div>
      <div class="g-toggle">
        <button :aria-pressed="viewport === 'desktop'" @click="viewport = 'desktop'">Desktop</button
        ><button :aria-pressed="viewport === 'phone'" @click="viewport = 'phone'">Phone</button>
      </div>
    </div>
    <div class="g-comparison">
      <article v-for="(d, i) in pair" :key="i">
        <label :for="'design-' + i"
          >Reference {{ i + 1
          }}<select
            :id="'design-' + i"
            :value="d.id"
            @change="change(i, ($event.target as HTMLSelectElement).value)"
          >
            <option v-for="opt in designs" :key="opt.id" :value="opt.id">
              {{ opt.id }} {{ opt.name }}
            </option>
          </select></label
        >
        <div class="g-compare-image" :class="{ phone: viewport === 'phone' }">
          <img
            v-if="d.referenceImages.length"
            :src="
              viewport === 'desktop'
                ? thumbnail(d)
                : d.referenceImages.find((r: any) => r.viewport.width === 390)?.url
            "
            :alt="d.name + ' ' + viewport + ' capture'"
          />
          <p v-else>Reference capture pending.</p>
        </div>
        <h2>
          <span>{{ d.id }}</span> {{ d.name }}
        </h2>
        <p>{{ d.thesis }}</p>
        <dl>
          <template
            v-for="key in ['composition', 'navigation', 'density', 'motion'] as const"
            :key="key"
            ><dt>{{ key }}</dt>
            <dd>{{ d.traits[key] }}</dd></template
          >
        </dl>
        <h3>Defining principles</h3>
        <ul>
          <li v-for="feature in d.definingFeatures" :key="feature">{{ feature }}</li>
        </ul>
        <RouterLink class="g-button" :to="'/designs/' + d.id + '-' + d.slug"
          >Inspect {{ d.name }} →</RouterLink
        >
      </article>
    </div>
    <div v-if="pair.length < 2" class="g-empty">
      <p>Select two valid design IDs to compare.</p>
      <RouterLink to="/compare?ids=01,27">Compare Civic Service and Blueprint Studio</RouterLink>
    </div>
  </main>
</template>
