<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { designs, makePrompt, repository, thumbnail } from './data';
import PreviewFrame from './PreviewFrame.vue';
const route = useRoute(),
  tab = ref('Overview'),
  scope = ref('the public pages of this project'),
  secondary = ref(''),
  copied = ref(false);
const d = computed(() => designs.find((x) => x.id + '-' + x.slug === route.params.slug));
const prompt = computed(() => (d.value ? makePrompt(d.value, scope.value, secondary.value) : ''));
const previewRoute = ref('');
watch(
  d,
  () => {
    tab.value = 'Overview';
    previewRoute.value = d.value?.entryRoute || '';
  },
  { immediate: true },
);
const sections = computed(
  () =>
    d.value?.brief.split(/\n\s*\n/).map((p) => {
      const match = p.match(/^\*\*([^*]+)\*\*\s*([\s\S]*)/);
      return { title: match?.[1] || '', text: (match?.[2] || p).replaceAll('*', '') };
    }) || [],
);
async function copy() {
  try {
    await navigator.clipboard.writeText(prompt.value);
    copied.value = true;
  } catch {
    copied.value = false;
    document.querySelector<HTMLTextAreaElement>('#prompt')?.select();
  }
}
</script>
<template>
  <main id="main" class="g-inspector" v-if="d">
    <RouterLink to="/" class="g-back">← Back to the collection</RouterLink>
    <div class="g-detail-heading">
      <div>
        <p class="g-kicker">REFERENCE {{ d.id }} / {{ d.family.toUpperCase() }}</p>
        <h1>{{ d.name }}</h1>
        <p>{{ d.thesis }}</p>
      </div>
      <a class="g-button dark" :href="d.entryRoute" target="_blank" rel="noopener"
        >Open live specimen ↗</a
      >
    </div>
    <div class="g-detail-meta">
      <span>{{ d.character }}</span
      ><span>{{ d.traits.density }} density</span><span>{{ d.traits.motion }} motion</span
      ><span>{{ d.effort }} effort</span
      ><span class="g-status" :class="{ ready: d.status === 'ready' }">{{ d.status }}</span>
    </div>
    <nav class="g-tabs" aria-label="Reference sections">
      <button
        v-for="t in ['Overview', 'Live preview', 'Use this design']"
        :key="t"
        :aria-pressed="tab === t"
        @click="tab = t"
      >
        {{ t }}
      </button>
    </nav>
    <template v-if="tab === 'Overview'"
      ><div class="g-overview">
        <div>
          <img
            v-if="thumbnail(d)"
            class="g-hero-capture"
            :src="thumbnail(d)"
            :alt="d.name + ' desktop reference'"
            width="1440"
            height="1000"
          />
          <div v-else class="g-empty">
            <p>Working specimen available. Reference capture pending.</p>
            <button class="g-button" @click="tab = 'Live preview'">Explore the specimen</button>
          </div>
          <section class="g-brief-section" v-for="section in sections" :key="section.title">
            <h2>{{ section.title }}</h2>
            <p>{{ section.text }}</p>
          </section>
          <div class="g-reference-strip">
            <a
              v-for="image in d.referenceImages.slice(1)"
              :key="image.url"
              :href="image.url"
              target="_blank"
              rel="noopener"
              ><img
                :src="image.url"
                :alt="d.name + ' ' + image.state + ' at ' + image.viewport.width + ' pixels'"
                loading="lazy"
              /><span
                >{{ image.viewport.width }} × {{ image.viewport.height }} /
                {{ image.fullPage ? 'Full page' : image.state }} ↗</span
              ></a
            >
          </div>
        </div>
        <aside class="g-design-rules">
          <p class="g-label">KEEP WHAT MAKES IT DISTINCT</p>
          <ol>
            <li v-for="feature in d.definingFeatures" :key="feature">{{ feature }}</li>
          </ol>
          <hr />
          <p class="g-label">SUITABLE FOR</p>
          <p>{{ d.suitableFor.join(' · ') }}</p>
          <hr />
          <p class="g-label">TYPE & PALETTE</p>
          <p>{{ d.fonts.join(' + ') }}</p>
          <div class="g-swatches">
            <span
              v-for="(color, key) in d.palette"
              :key="key"
              :title="key + ': ' + color"
              :style="{ background: color }"
            ></span>
          </div>
          <hr />
          <p class="g-label">SOURCE PACKAGE</p>
          <a
            :href="'/references/' + d.id + '-' + d.slug + '/DESIGN.md'"
            target="_blank"
            rel="noopener"
            >Read the design brief ↗</a
          ><a
            :href="'/references/' + d.id + '-' + d.slug + '/Demo.vue'"
            target="_blank"
            rel="noopener"
            >Read the Vue source ↗</a
          ><a
            :href="'/references/' + d.id + '-' + d.slug + '/tokens.css'"
            target="_blank"
            rel="noopener"
            >Read the design tokens ↗</a
          ><a :href="'/previews/' + d.id + '/capture.json'" target="_blank" rel="noopener"
            >Capture provenance ↗</a
          ><button class="g-button" @click="tab = 'Use this design'">
            Get the reference prompt →</button
          ><template v-if="d.neighbours.length"
            ><hr />
            <p class="g-label">USEFUL NEIGHBOURS</p>
            <RouterLink
              v-for="id in d.neighbours"
              :key="id"
              :to="'/designs/' + id + '-' + designs.find((x) => x.id === id)?.slug"
              >{{ id }} {{ designs.find((x) => x.id === id)?.name }} →</RouterLink
            ><RouterLink :to="'/compare?ids=' + d.id + ',' + d.neighbours[0]"
              >Compare with {{ d.neighbours[0] }} ↗</RouterLink
            ></template
          >
        </aside>
      </div></template
    ><template v-else-if="tab === 'Live preview'"
      ><div class="g-state-chooser">
        <label
          >Sample state<select v-model="previewRoute">
            <option :value="d.entryRoute">Entry page</option>
            <option v-for="s in d.states" :key="s.key" :value="s.route">{{ s.label }}</option>
          </select></label
        >
        <p>Use the page normally. Its styles and interactions run in an isolated document.</p>
      </div>
      <PreviewFrame :url="previewRoute" :name="d.name"
    /></template>
    <section v-else class="g-prompt-section">
      <div>
        <p class="g-kicker">FROM REFERENCE TO PROJECT</p>
        <h2>Give your coding model<br />a useful starting point.</h2>
        <p>
          The prompt points to the actual brief, tokens, source, and reference images. Adapt the
          principles to your project’s content and framework.
        </p>
        <label
          >What should use this design?<input
            v-model="scope"
            placeholder="For example: the public portfolio pages" /></label
        ><label
          >Optional secondary influence<select v-model="secondary">
            <option value="">Keep one clear direction</option>
            <option
              v-for="other in designs.filter((x) => x.id !== d?.id)"
              :key="other.id"
              :value="other.id + ' ' + other.name"
            >
              {{ other.id }} {{ other.name }}
            </option>
          </select></label
        >
      </div>
      <div>
        <label for="prompt">Your reference prompt</label
        ><textarea id="prompt" :value="prompt" readonly></textarea
        ><button class="g-button dark" @click="copy">
          {{ copied ? 'Copied ✓' : 'Copy reference prompt' }}
        </button>
        <p class="g-small" role="status">
          {{
            copied
              ? 'Ready to paste into your project.'
              : 'You can also select and copy the text directly.'
          }}
        </p>
      </div>
    </section>
  </main>
  <main v-else id="main" class="g-empty">
    <h1>Reference not found</h1>
    <RouterLink to="/">Browse the collection →</RouterLink>
  </main>
</template>
