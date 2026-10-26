<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();
const q = ref(''),
  message = ref(''),
  selected = ref(0),
  tab = ref('All');
function reset() {
  Object.keys(localStorage)
    .filter((k) => k.startsWith('design-library:20:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const places = [
  {
    name: 'The Reading Room',
    area: 'Old Town',
    price: 18,
    equipment: 'Quiet desks',
    day: 'Weekdays',
    desc: 'A calm, naturally lit room above the community bookshop.',
  },
  {
    name: 'Common Ground',
    area: 'Riverside',
    price: 22,
    equipment: 'Meeting rooms',
    day: 'Every day',
    desc: 'Flexible tables, a shared kitchen, and room to work together.',
  },
  {
    name: 'Foundry Studio',
    area: 'Foundry Quarter',
    price: 16,
    equipment: 'Workshop tools',
    day: 'Weekdays',
    desc: 'A practical studio for making, prototyping, and repairing.',
  },
  {
    name: 'The Long Table',
    area: 'Market Square',
    price: 14,
    equipment: 'Meeting rooms',
    day: 'Every day',
    desc: 'An informal workspace in the middle of the neighbourhood.',
  },
];
const equipment = ref('All'),
  weekend = ref(false),
  shortlist = ref<string[]>([]);
const results = computed(() =>
  places.filter(
    (p) =>
      (equipment.value === 'All' || p.equipment === equipment.value) &&
      (!weekend.value || p.day === 'Every day') &&
      (p.name + ' ' + p.area).toLowerCase().includes(q.value.toLowerCase()),
  ),
);
function toggle(name: string) {
  shortlist.value = shortlist.value.includes(name)
    ? shortlist.value.filter((n) => n !== name)
    : [...shortlist.value, name].slice(-2);
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>↗ Useful Places</strong><span>Good spaces for getting things done.</span
      ><button @click="go('start')">Explore Northbank</button>
    </header>
    <main id="content">
      <div class="heading">
        <p class="eyebrow">THE WORKSPACE DIRECTORY / NORTHBANK</p>
        <h1>Find your kind of place.</h1>
        <p>Compare the practical details. Make a little room for your working day.</p>
        <label class="search"
          >Search workspaces<input v-model="q" placeholder="A name or a neighbourhood"
        /></label>
      </div>
      <template v-if="state === 'start'"
        ><div class="directory">
          <aside>
            <p class="eyebrow">NARROW IT DOWN</p>
            <fieldset>
              <legend>What do you need?</legend>
              <label
                v-for="item in ['All', 'Quiet desks', 'Meeting rooms', 'Workshop tools']"
                :key="item"
                ><input type="radio" v-model="equipment" :value="item" name="equipment" />{{
                  item
                }}</label
              >
            </fieldset>
            <fieldset>
              <legend>Opening days</legend>
              <label><input type="checkbox" v-model="weekend" />Open on weekends</label>
            </fieldset>
            <button
              @click="
                equipment = 'All';
                weekend = false;
                q = '';
              "
            >
              Clear all filters
            </button>
            <p class="small">All places, prices, and amenities are fictional samples.</p>
          </aside>
          <section>
            <div class="result-count">
              <span>{{ results.length }} workspaces found</span><span>Sorted by name</span>
            </div>
            <article
              v-for="p in [...results].sort((a, b) => a.name.localeCompare(b.name))"
              :key="p.name"
              class="listing"
            >
              <div class="place-symbol">
                {{
                  p.name
                    .split(' ')
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join('')
                }}
              </div>
              <div class="listing-body">
                <p class="eyebrow">{{ p.area }}</p>
                <h2>
                  <button
                    @click="
                      selected = places.indexOf(p);
                      go('detail');
                    "
                  >
                    {{ p.name }} ↗
                  </button>
                </h2>
                <p>{{ p.desc }}</p>
                <div class="attrs">
                  <span>{{ p.equipment }}</span
                  ><span>{{ p.day }}</span
                  ><span>Step-free access</span>
                </div>
              </div>
              <div class="listing-end">
                <b>£{{ p.price }}<small>/ day</small></b
                ><button :aria-pressed="shortlist.includes(p.name)" @click="toggle(p.name)">
                  {{ shortlist.includes(p.name) ? '✓ Selected' : '+ Compare' }}
                </button>
              </div>
            </article>
            <div v-if="!results.length" class="empty">
              <h2>No places match just yet.</h2>
              <p>Try removing the weekend or equipment filter.</p>
              <button
                @click="
                  equipment = 'All';
                  weekend = false;
                  q = '';
                "
              >
                Reset filters
              </button>
            </div>
            <div v-if="shortlist.length" class="compare-bar">
              <span>{{ shortlist.length }} selected · {{ shortlist.join(' + ') }}</span
              ><button @click="go('compare')">Compare →</button>
            </div>
          </section>
        </div>
        <section class="note">
          <h2>Useful details, up front.</h2>
          <p>
            Opening days, equipment, access, and a clear sample price. Everything you need to make a
            shortlist before reading the full description.
          </p>
        </section></template
      >
      <section v-else-if="state === 'detail'" class="detail">
        <button @click="go('start')">← All workspaces</button>
        <p class="eyebrow">{{ places[selected].area }}</p>
        <h2>{{ places[selected].name }}</h2>
        <p>{{ places[selected].desc }}</p>
        <div class="detail-grid">
          <article>
            <h3>A working day here</h3>
            <p>
              Arrive from 08:00, choose a desk, and settle in. Tea, a stable work surface, and
              plenty of natural light are part of the fictional offering.
            </p>
            <h3>Access</h3>
            <p>Step-free entrance, accessible toilet, and a quieter area away from the kitchen.</p>
          </article>
          <aside>
            <b>£{{ places[selected].price }} / day</b>
            <p>{{ places[selected].equipment }}<br />{{ places[selected].day }} · 08:00–18:00</p>
            <button @click="toggle(places[selected].name)">
              {{
                shortlist.includes(places[selected].name)
                  ? 'Remove from comparison'
                  : 'Add to comparison'
              }}
            </button>
            <p>Sample listing; no booking is made.</p>
          </aside>
        </div>
      </section>
      <section v-else class="comparison">
        <h2>Compare the useful details.</h2>
        <p v-if="shortlist.length < 2">
          Choose two workspaces from the directory to compare. Showing two examples below.
        </p>
        <div class="scroll">
          <table>
            <thead>
              <tr>
                <th>Attribute</th>
                <th
                  v-for="p in shortlist.length === 2
                    ? places.filter((p) => shortlist.includes(p.name))
                    : places.slice(0, 2)"
                  :key="p.name"
                >
                  {{ p.name }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="key in ['area', 'equipment', 'day', 'price'] as const" :key="key">
                <th>{{ key }}</th>
                <td
                  v-for="p in shortlist.length === 2
                    ? places.filter((p) => shortlist.includes(p.name))
                    : places.slice(0, 2)"
                  :key="p.name"
                >
                  {{ key === 'price' ? '£' : '' }}{{ p[key] }}{{ key === 'price' ? ' / day' : '' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button @click="go('start')">Return to the directory</button>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Useful Places · Fictional sample content · Design reference 20</span
      ><button @click="reset">Reset demo</button>
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'DM Sans';
  src: url('/fonts/dm-sans.woff2') format('woff2');
  font-display: swap;
  font-weight: 100 900;
}
.specimen {
  min-height: 100vh;
  background: var(--page);
  color: var(--ink);
  font: 16px/1.6 var(--font-body);
  overflow-wrap: anywhere;
}
h1,
h2,
h3 {
  font-family: var(--font-heading);
  line-height: 1.1;
}
h1 {
  font-size: clamp(38px, 5.5vw, 80px);
  letter-spacing: -0.045em;
}
h2 {
  font-size: clamp(27px, 3vw, 42px);
  letter-spacing: -0.025em;
}
h3 {
  font-size: 22px;
}
p {
  max-width: var(--measure);
}
button,
input,
select,
textarea {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--ink);
  padding: 10px 15px;
}
button:hover {
  border-color: var(--accent);
}
button.primary {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}
button[aria-pressed='true'] {
  box-shadow: inset 0 -3px 0 var(--accent);
}
a {
  text-underline-offset: 4px;
}
.eyebrow {
  font:
    12px/1.5 'IBM Plex Mono',
    monospace;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.grow {
  flex: 1;
}
.rule {
  border-top: 1px solid var(--line);
}
.notice {
  padding: 18px;
  border-left: 3px solid var(--accent);
  background: var(--surface);
}
.skip {
  position: absolute;
  top: -100px;
  background: var(--ink);
  color: var(--page);
  padding: 12px;
  z-index: 100;
}
.skip:focus {
  top: 8px;
}
.specimen-note {
  padding: 24px 5%;
  border-top: 1px solid var(--line);
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}
.specimen-note button {
  font-size: 12px;
  background: transparent;
  padding: 4px 10px;
}
.empty {
  padding: 40px 0;
}
.message {
  font-weight: 600;
  color: var(--accent);
}
figure {
  margin: 0;
}
figcaption {
  font-size: 13px;
  margin-top: 10px;
}
img {
  display: block;
  object-fit: cover;
}
label {
  display: grid;
  gap: 6px;
}
input[type='checkbox'],
input[type='radio'] {
  min-height: 20px;
  width: 20px;
}
table {
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}
td,
th {
  padding: 12px 10px;
  border-bottom: 1px solid var(--line);
}
th {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.scroll {
  overflow: auto;
  max-width: 100%;
}
details {
  border-top: 1px solid var(--line);
  padding: 16px 0;
}
summary {
  font-weight: 600;
  min-height: 32px;
}
textarea {
  width: 100%;
  min-height: 100px;
}
fieldset {
  border: 1px solid var(--line);
  margin: 0;
  padding: 20px;
}
input,
select {
  max-width: 100%;
  min-width: 0;
}
section,
main,
aside,
article,
nav {
  min-width: 0;
}
button {
  line-height: 1.3;
}
a,
button {
  word-break: normal;
}
@media (max-width: 600px) {
  h1 {
    font-size: clamp(36px, 11vw, 64px);
  }
  .specimen-note {
    padding: 20px;
  }
  .row {
    gap: 10px;
  }
  td,
  th {
    padding: 10px 8px;
  }
}
header {
  display: flex;
  gap: 30px;
  align-items: center;
  padding: 23px 5%;
  background: #fff;
  border-bottom: 1px solid var(--line);
}
header strong {
  font-size: 24px;
  letter-spacing: -0.05em;
}
header span {
  font-size: 11px;
  color: #4d6b63;
}
header button {
  margin-left: auto;
  background: none;
  border: 0;
  font-size: 11px;
}
main {
  max-width: 1400px;
  margin: auto;
  padding: 45px 5% 80px;
}
.heading h1 {
  font-size: 49px;
  margin: 18px 0;
}
.heading p {
  font-size: 14px;
  color: #46635b;
}
.search {
  display: grid;
  gap: 9px;
  font-size: 10px;
  max-width: 650px;
  margin: 25px 0 45px;
}
.search input {
  padding: 15px;
  font-size: 13px;
}
.directory {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 45px;
}
fieldset {
  border: 0;
  border-top: 1px solid var(--line);
  padding: 20px 0;
  margin: 20px 0;
}
legend {
  font-size: 12px;
  font-weight: 600;
}
fieldset label {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  margin: 15px 0;
}
fieldset input {
  accent-color: #32665c;
}
aside > button {
  font-size: 11px;
  background: none;
}
.small {
  font-size: 10px;
  color: #54695e;
  line-height: 1.8;
  margin-top: 25px;
}
.result-count {
  display: flex;
  justify-content: space-between;
  padding: 0 0 20px;
  border-bottom: 1px solid var(--line);
  font-size: 10px;
  color: #46635b;
}
.listing {
  display: flex;
  gap: 22px;
  padding: 30px 0;
  border-bottom: 1px solid var(--line);
  align-items: center;
}
.place-symbol {
  width: 80px;
  height: 90px;
  display: grid;
  place-items: center;
  background: #e0e7da;
  flex-shrink: 0;
  font: 25px Georgia;
  color: #567258;
}
.listing:nth-of-type(2) .place-symbol {
  background: #e5e1d7;
}
.listing:nth-of-type(3) .place-symbol {
  background: #dae5e8;
}
.listing-body {
  flex: 1;
}
.listing .eyebrow {
  font-size: 9px;
  margin-bottom: 10px;
}
.listing h2 {
  margin: 0;
}
.listing h2 button {
  font-size: 23px;
  font-weight: 600;
  padding: 0;
  background: none;
  border: 0;
  min-height: 25px;
}
.listing-body > p:not(.eyebrow) {
  font-size: 12px;
  margin: 10px 0;
}
.attrs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  font-size: 9px;
  color: #46635b;
}
.attrs span {
  padding: 5px;
  background: #edf1ed;
  border-radius: 3px;
}
.listing-end b {
  display: block;
  font-size: 22px;
  white-space: nowrap;
}
.listing-end small {
  font-size: 10px;
  font-weight: 400;
  color: #51645e;
  margin-left: 4px;
}
.listing-end button {
  font-size: 10px;
  margin-top: 18px;
  background: none;
  white-space: nowrap;
}
.compare-bar {
  padding: 20px;
  background: #dfeadf;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  font-size: 11px;
  margin-top: 25px;
}
.note {
  border-top: 1px solid var(--line);
  margin-top: 60px;
  padding: 35px 0 0;
}
.note h2 {
  font-size: 29px;
}
.note p {
  font-size: 14px;
}
.detail {
  padding: 10px 0 60px;
}
.detail > .eyebrow {
  margin-top: 35px;
}
.detail h2 {
  font-size: 43px;
}
.detail-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 60px;
  margin-top: 35px;
}
.detail-grid p {
  font-size: 14px;
}
.detail-grid aside {
  background: #e7eee5;
  padding: 30px;
}
.detail-grid aside b {
  font-size: 30px;
}
.detail-grid aside button {
  font-size: 12px;
}
.comparison {
  padding: 30px 0 130px;
}
.comparison > button {
  margin-top: 30px;
}
.comparison th,
.comparison td {
  font-size: 12px;
}
@media (max-width: 850px) {
  header span {
    display: none;
  }
  .directory {
    grid-template-columns: 180px 1fr;
    gap: 25px;
  }
  .place-symbol {
    display: none;
  }
  .listing {
    gap: 15px;
  }
  .listing h2 button {
    font-size: 21px;
  }
}
@media (max-width: 600px) {
  header {
    padding: 20px;
  }
  header strong {
    font-size: 20px;
  }
  header button {
    font-size: 10px;
  }
  main {
    padding-top: 30px;
  }
  .heading h1 {
    font-size: 37px;
  }
  .directory {
    display: block;
  }
  .directory > aside {
    padding: 0 0 25px;
  }
  .directory aside fieldset {
    display: inline-block;
    vertical-align: top;
    width: 49%;
    margin: 5px 0;
    padding: 15px 5px;
  }
  .directory aside .eyebrow,
  .small {
    display: none;
  }
  fieldset label {
    font-size: 10px;
    gap: 7px;
  }
  .listing h2 button {
    font-size: 20px;
  }
  .listing-end b {
    font-size: 18px;
  }
  .listing-body > p:not(.eyebrow) {
    font-size: 11px;
  }
  .attrs {
    font-size: 8px;
  }
  .listing-end button {
    padding: 8px;
    font-size: 9px;
  }
  .detail-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  .detail h2 {
    font-size: 34px;
  }
}
</style>
