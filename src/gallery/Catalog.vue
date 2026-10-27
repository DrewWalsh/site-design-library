<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { designs, families, thumbnail } from './data';
import { matchesSearch } from './search';
const route = useRoute(),
  router = useRouter(),
  filtersOpen = ref(false),
  view = ref('grid');
const selection = ref<string[]>([]);
const selectionLabel = computed(() =>
  selection.value.map((id) => designs.find((d) => d.id === id)?.name).join(' + '),
);
const get = (key: string) => String(route.query[key] || '');
function set(key: string, value: string) {
  const query = { ...route.query };
  if (value) query[key] = value;
  else delete query[key];
  router.replace({ query });
}
const purpose = computed(() => [...new Set(designs.flatMap((d) => d.suitableFor))].sort());
const businessFacets = [
  {
    key: 'industry',
    label: 'Industry',
    values: [...new Set(designs.flatMap((d) => d.discovery.industries))].sort(),
  },
  {
    key: 'goal',
    label: 'Visitor goal',
    values: [...new Set(designs.flatMap((d) => d.discovery.visitorGoals))].sort(),
  },
  {
    key: 'action',
    label: 'Conversion action',
    values: [...new Set(designs.flatMap((d) => d.discovery.conversionActions))].sort(),
  },
  {
    key: 'size',
    label: 'Site size & structure',
    values: [...new Set(designs.map((d) => d.discovery.siteSize))].sort(),
  },
  {
    key: 'interaction',
    label: 'Interaction type',
    values: [...new Set(designs.flatMap((d) => d.discovery.interactionTypes))].sort(),
  },
];
const active = computed(() => Object.keys(route.query).filter((k) => k !== 'sort').length);
const filtered = computed(() =>
  designs
    .filter((d) => {
      return (
        matchesSearch(d, get('q')) &&
        (!get('industry') || d.discovery.industries.includes(get('industry'))) &&
        (!get('goal') || d.discovery.visitorGoals.includes(get('goal'))) &&
        (!get('action') || d.discovery.conversionActions.includes(get('action'))) &&
        (!get('size') || d.discovery.siteSize === get('size')) &&
        (!get('interaction') || d.discovery.interactionTypes.includes(get('interaction'))) &&
        (!get('family') || d.family === get('family')) &&
        (!get('purpose') || d.suitableFor.includes(get('purpose'))) &&
        (!get('character') || d.character === get('character')) &&
        (!get('density') || d.traits.density === get('density')) &&
        (!get('motion') || d.traits.motion === get('motion')) &&
        (!get('effort') || d.effort === get('effort')) &&
        (!get('status') || d.status === get('status'))
      );
    })
    .sort((a, b) =>
      get('sort') === 'name' ? a.name.localeCompare(b.name) : a.id.localeCompare(b.id),
    ),
);
function toggle(id: string) {
  selection.value = selection.value.includes(id)
    ? selection.value.filter((x) => x !== id)
    : selection.value.length < 2
      ? [...selection.value, id]
      : [selection.value[1], id];
}
</script>
<template>
  <main id="main">
    <section class="g-intro">
      <div>
        <p class="g-kicker"><span></span> A FIELD GUIDE TO THE WEB</p>
        <h1>Different by design.</h1>
        <p>
          {{ designs.length }} directions. Working examples. A better starting point.<br />Find a
          visual language for what you’re making.
        </p>
      </div>
      <div class="g-counter">
        <strong>{{ designs.length.toString().padStart(2, '0') }}</strong
        ><span>DESIGN REFERENCES</span
        ><small>{{ designs.filter((d) => d.status === 'ready').length }} ready to explore</small>
      </div>
    </section>
    <div class="g-library">
      <aside class="g-filters" :class="{ open: filtersOpen }" aria-label="Filter designs">
        <div class="g-filter-heading">
          <h2>Explore the collection</h2>
          <button v-if="active" @click="router.replace({ query: {} })">Reset</button>
        </div>
        <p class="g-label">DESIGN FAMILY</p>
        <button :class="['g-family', { active: !get('family') }]" @click="set('family', '')">
          <span>All directions</span><span>{{ designs.length }}</span></button
        ><button
          v-for="(family, i) in families"
          :key="family"
          :class="['g-family', { active: get('family') === family }]"
          @click="set('family', family)"
        >
          <span><i :class="'dot dot-' + i"></i>{{ family }}</span
          ><span>{{ designs.filter((d) => d.family === family).length }}</span>
        </button>
        <div class="g-facet" v-for="facet in businessFacets" :key="facet.key">
          <label :for="facet.key">{{ facet.label }}</label>
          <select
            :id="facet.key"
            :value="get(facet.key)"
            @change="set(facet.key, ($event.target as HTMLSelectElement).value)"
          >
            <option value="">Any {{ facet.label.toLowerCase() }}</option>
            <option v-for="value in facet.values" :key="value">{{ value }}</option>
          </select>
        </div>
        <details class="g-visual-filters">
          <summary>Visual direction &amp; effort</summary>
          <div class="g-facet">
            <label for="purpose">Purpose</label
            ><select
              id="purpose"
              :value="get('purpose')"
              @change="set('purpose', ($event.target as HTMLSelectElement).value)"
            >
              <option value="">Any purpose</option>
              <option v-for="p in purpose">{{ p }}</option>
            </select>
          </div>
          <div
            class="g-facet"
            v-for="facet in [
              { key: 'character', label: 'Character', values: ['Restrained', 'Expressive'] },
              { key: 'density', label: 'Information density', values: ['Low', 'Medium', 'High'] },
              { key: 'motion', label: 'Motion', values: ['None', 'Minimal', 'Optional'] },
              { key: 'effort', label: 'Implementation effort', values: ['Low', 'Medium', 'High'] },
            ]"
            :key="facet.key"
          >
            <label :for="facet.key">{{ facet.label }}</label
            ><select
              :id="facet.key"
              :value="get(facet.key)"
              @change="set(facet.key, ($event.target as HTMLSelectElement).value)"
            >
              <option value="">Any {{ facet.label.toLowerCase() }}</option>
              <option v-for="v in facet.values">{{ v }}</option>
            </select>
          </div>
        </details>
        <div class="g-sidebar-note">
          <span>↗</span>
          <p>More than a moodboard.</p>
          <small
            >Every reference includes a working page, its design principles, and a prompt to take it
            further.</small
          ><RouterLink to="/guide">Using the library →</RouterLink>
        </div>
      </aside>
      <section class="g-results" aria-label="Design collection">
        <div class="g-toolbar">
          <label class="g-search"
            ><svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
            >
              <circle cx="10" cy="10" r="6.5" />
              <path d="m15 15 5 5" /></svg
            ><input
              aria-label="Search designs"
              :value="get('q')"
              @input="set('q', ($event.target as HTMLInputElement).value)"
              placeholder="Try storage, appointment-based business, or one-page brochure…"
            /><button v-if="get('q')" aria-label="Clear search" @click="set('q', '')">
              ×
            </button></label
          ><button class="g-mobile-filter" @click="filtersOpen = !filtersOpen">
            Filters {{ active ? '(' + active + ')' : '' }}</button
          ><label class="g-sort"
            >Sort by<select
              :value="get('sort')"
              @change="set('sort', ($event.target as HTMLSelectElement).value)"
            >
              <option value="">Number</option>
              <option value="name">Name</option>
            </select></label
          >
        </div>
        <div class="g-result-line">
          <span role="status"
            >{{ filtered.length }} {{ filtered.length === 1 ? 'reference' : 'references'
            }}<template v-if="active"> matching your filters</template></span
          >
          <div>
            <span class="g-compare-hint">Select two to compare</span
            ><button :aria-pressed="view === 'grid'" aria-label="Grid view" @click="view = 'grid'">
              ▦</button
            ><button :aria-pressed="view === 'list'" aria-label="List view" @click="view = 'list'">
              ☰
            </button>
          </div>
        </div>
        <div class="g-grid" :class="{ 'g-list': view === 'list' }">
          <article v-for="d in filtered" :key="d.id" class="g-card">
            <div class="g-card-image">
              <RouterLink :to="'/designs/' + d.id + '-' + d.slug" :aria-label="'Inspect ' + d.name"
                ><img
                  v-if="thumbnail(d)"
                  :src="thumbnail(d)"
                  :alt="d.name + ' desktop specimen'"
                  loading="lazy"
                  width="1440"
                  height="1000"
                />
                <div
                  v-else
                  class="g-pending"
                  :style="{ background: d.palette.page, color: d.palette.ink }"
                >
                  <span>{{ d.id }}</span
                  ><strong>{{ d.name }}</strong
                  ><small>{{ d.status }} · Preview capture in progress</small>
                </div></RouterLink
              ><label class="g-compare-check" :class="{ checked: selection.includes(d.id) }"
                ><input
                  type="checkbox"
                  :checked="selection.includes(d.id)"
                  @change="toggle(d.id)"
                  :aria-label="'Compare ' + d.name"
                /><span>{{ selection.includes(d.id) ? '✓' : '+' }}</span></label
              >
            </div>
            <div class="g-card-copy">
              <div class="g-card-title">
                <span>{{ d.id }}</span
                ><RouterLink :to="'/designs/' + d.id + '-' + d.slug"
                  ><h2>{{ d.name }}</h2></RouterLink
                ><span class="g-arrow">↗</span>
              </div>
              <p>{{ d.thesis }}</p>
              <div class="g-tags">
                <span>{{ d.suitableFor[0] }}</span
                ><span>{{ d.character }}</span
                ><span class="g-status" :class="{ ready: d.status === 'ready' }">{{
                  d.status
                }}</span>
              </div>
            </div>
          </article>
        </div>
        <div v-if="!filtered.length" class="g-empty">
          <span>↳</span>
          <h2>A little too specific?</h2>
          <p>No references match these filters. Try a broader purpose or clear your search.</p>
          <button class="g-button dark" @click="router.replace({ query: {} })">
            Reset all filters
          </button>
        </div>
        <div class="g-endnote">
          <span>YOU’VE REACHED THE END OF THIS SELECTION</span>
          <p>The right reference makes the next decision easier.</p>
        </div>
      </section>
    </div>
    <div class="g-compare-tray" v-if="selection.length">
      <div>
        <b>{{ selection.length }} of 2 selected</b><span>{{ selectionLabel }}</span>
      </div>
      <button @click="selection = []">Clear</button
      ><RouterLink
        class="g-button"
        :aria-disabled="selection.length < 2"
        :to="selection.length === 2 ? '/compare?ids=' + selection.join(',') : '#'"
        >Compare designs →</RouterLink
      >
    </div>
  </main>
</template>
