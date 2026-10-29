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
    .filter((k) => k.startsWith('design-library:16:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const trails = [
  { name: 'Riverside loop', surface: 'Paved', distance: '2.4 km', time: '40 min', x: 290, y: 340 },
  { name: 'Orchard rise', surface: 'Gravel', distance: '3.1 km', time: '55 min', x: 590, y: 180 },
  { name: 'The old towpath', surface: 'Paved', distance: '1.8 km', time: '30 min', x: 450, y: 450 },
];
const filtered = computed(() =>
  trails.filter(
    (t) =>
      (tab.value === 'All' || t.surface === tab.value) &&
      t.name.toLowerCase().includes(q.value.toLowerCase()),
  ),
);
</script>
<template>
  <div class="specimen" :class="{ entry: state === 'start' }">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>↟ Northbank Footpaths</strong><span>A field atlas of a fictional district.</span>
      <nav>
        <button @click="go('start')">Map & places</button
        ><button @click="go('list')">List view</button>
      </nav>
    </header>
    <main id="content">
      <h1 class="sr">Northbank Footpaths — map and trail atlas</h1>
      <div class="filters">
        <label>Find a trail<input v-model="q" placeholder="Search by name" /></label
        ><label
          >Surface<select v-model="tab">
            <option>All</option>
            <option>Paved</option>
            <option>Gravel</option>
          </select></label
        ><span>{{ filtered.length }} trails</span>
      </div>
      <div class="atlas">
        <section class="places">
          <button
            v-for="t in filtered"
            :key="t.name"
            :aria-pressed="selected === trails.indexOf(t)"
            @click="
              selected = trails.indexOf(t);
              go('detail');
            "
          >
            <span class="route-number">0{{ trails.indexOf(t) + 1 }}</span>
            <div>
              <h2>{{ t.name }}</h2>
              <p>{{ t.distance }} / {{ t.time }}</p>
              <small>{{ t.surface }} · View access notes →</small>
            </div>
          </button>
          <div v-if="!filtered.length" class="empty">
            <p>No routes match this search.</p>
            <button
              @click="
                q = '';
                tab = 'All';
              "
            >
              Reset filters
            </button>
          </div>
          <article v-if="state === 'detail'">
            <p class="eyebrow">SELECTED ROUTE / 0{{ selected + 1 }}</p>
            <h2>{{ trails[selected].name }}</h2>
            <p>
              Begin at the old station, follow the riverside, and return through the community
              orchard.
            </p>
            <h3>Before you set out</h3>
            <p>
              {{
                trails[selected].surface === 'Paved'
                  ? 'A mostly level, paved route with benches along the river.'
                  : 'A gravel climb with uneven sections. The orchard gate is narrow.'
              }}
              Distances and access details are sample data.
            </p>
            <ol>
              <li>Old station square</li>
              <li>Riverside lookout</li>
              <li>The orchard gate</li>
            </ol>
          </article>
        </section>
        <figure class="map" v-if="state !== 'list'">
          <svg
            preserveAspectRatio="none"
            viewBox="0 0 820 620"
            role="img"
            aria-labelledby="map-title"
          >
            <title id="map-title">
              Fictional Northbank district: a river, woodland, orchard, and three selectable routes.
              The adjacent list provides every destination.
            </title>
            <rect width="820" height="620" fill="#e5e7d5" />
            <path
              d="M570-50C300 140 620 250 350 400S140 530 200 680"
              stroke="#a9c7c5"
              fill="none"
              stroke-width="80"
            />
            <g fill="#c9d6bb">
              <path d="M0 0H320L290 180L130 240L0 190Z" />
              <path d="M600 20L820 0V300L720 270L580 160Z" />
              <path d="M30 480L210 410L260 620H0Z" />
            </g>
            <g fill="#d8ccaf" stroke="#f0f0e4" stroke-width="7">
              <path d="M75 280H230V350H75Z" />
              <path d="M550 340H750V430H550Z" />
              <path d="M570 460H800V550H570Z" />
            </g>
            <g stroke="#f9f7ed" stroke-width="15" fill="none">
              <path d="M0 390L230 380L420 290L820 320" />
              <path d="M300 0L270 220L230 380L350 620" />
            </g>
            <g stroke="#5b7a56" stroke-width="4" fill="none" stroke-dasharray="8 6">
              <path d="M275 380Q230 260 360 200T450 330Q420 400 275 380Z" />
              <path d="M450 290L610 180L700 110" />
              <path d="M275 380L350 470L440 500" />
            </g>
            <g font-family="sans-serif" fill="#496047" font-size="15">
              <text x="80" y="120">NORTH WOOD</text>
              <text x="580" y="80">THE ORCHARD</text>
              <text x="590" y="395">NORTHBANK</text>
              <text x="80" y="430">OLD STATION</text>
              <text x="450" y="565">RIVER ALDER</text>
              <text x="745" y="570">N ↑</text>
            </g>
          </svg>
          <div class="map-actions">
            <button
              v-for="t in filtered"
              :key="t.name"
              :style="{ left: (t.x / 820) * 100 + '%', top: (t.y / 620) * 100 + '%' }"
              :aria-pressed="selected === trails.indexOf(t)"
              @click="
                selected = trails.indexOf(t);
                go('detail');
              "
            >
              0{{ trails.indexOf(t) + 1 }}<span class="sr"> {{ t.name }}</span>
            </button>
          </div>
          <figcaption>
            Original SVG map. Illustrative geography; not for real-world navigation.
          </figcaption>
        </figure>
      </div>
      <section class="atlas-note">
        <h2>Know the place before you go.</h2>
        <p>
          The map shows relationships; the route notes explain the ground, the stops, and the
          choices along the way. Use the list view for a complete text alternative.
        </p>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Northbank Footpaths · Fictional sample content · Design reference 16</span
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
  align-items: center;
  gap: 30px;
  padding: 23px 4%;
  border-bottom: 1px solid var(--line);
  font-size: 11px;
}
header strong {
  font-size: 22px;
}
nav {
  margin-left: auto;
  display: flex;
  gap: 18px;
}
nav button {
  background: none;
  border: 0;
  font-size: 11px;
}
main {
  padding: 35px 4% 60px;
  max-width: 1500px;
  margin: auto;
}
.atlas-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 35px;
}
.atlas-head h1 {
  font-size: 48px;
  line-height: 1.12;
  margin: 16px 0 30px;
}
.atlas-head > p {
  font-size: 13px;
  padding-bottom: 25px;
}
.filters {
  display: flex;
  align-items: end;
  gap: 20px;
  padding: 20px 0;
  border-top: 1px solid var(--line);
}
.filters label {
  font-size: 10px;
}
.filters input {
  min-width: 260px;
  background: #fbfbf2;
}
.filters select {
  min-width: 160px;
  background: #fbfbf2;
}
.filters > span {
  margin-left: auto;
  font-size: 11px;
  padding: 10px;
}
.atlas {
  display: grid;
  grid-template-columns: 330px 1fr;
  border: 1px solid #b9c8b3;
}
.places {
  background: #f9f9ef;
}
.places > button {
  display: flex;
  gap: 15px;
  border: 0;
  border-bottom: 1px solid var(--line);
  width: 100%;
  background: none;
  text-align: left;
  padding: 25px 20px;
}
.places > button[aria-pressed='true'] {
  background: #e1e8d8;
  box-shadow: inset 4px 0 #35694c;
}
.route-number {
  font-size: 11px;
  padding-top: 5px;
}
.places h2 {
  font-size: 21px;
  margin: 0 0 10px;
}
.places p {
  font-size: 12px;
  margin: 5px 0;
}
.places small {
  font-size: 10px;
}
.places article {
  padding: 25px;
  border-top: 3px solid;
}
.places article h3 {
  font-size: 15px;
}
.places article p,
.places li {
  font-size: 12px;
}
.map {
  background: #e5e7d5;
  align-self: start;
}
.map svg {
  width: 100%;
  display: block;
}
.map-actions {
  display: flex;
  gap: 5px;
  padding: 15px;
  flex-wrap: wrap;
}
.map-actions button {
  font-size: 10px;
  padding: 7px;
  background: #f4f5e9;
}
.map figcaption {
  font-size: 9px;
  padding: 0 15px 15px;
}
.atlas-note {
  padding: 40px 0 0;
}
.atlas-note h2 {
  font-size: 29px;
}
.atlas-note p {
  font-size: 14px;
}
@media (max-width: 850px) {
  header > span {
    display: none;
  }
  .atlas {
    grid-template-columns: 270px 1fr;
  }
  .atlas-head h1 {
    font-size: 40px;
  }
}
@media (max-width: 600px) {
  header {
    padding: 20px;
    flex-wrap: wrap;
    gap: 12px;
  }
  header strong {
    font-size: 19px;
  }
  nav {
    margin: 0;
  }
  .atlas-head {
    display: block;
  }
  .atlas-head h1 {
    font-size: 37px;
  }
  .atlas-head > p {
    padding: 0;
  }
  .filters {
    flex-wrap: wrap;
    gap: 12px;
  }
  .filters label:first-child {
    flex: 1;
  }
  .filters input {
    min-width: 0;
    width: 100%;
  }
  .filters select {
    min-width: 100px;
  }
  .filters > span {
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .atlas {
    display: flex;
    flex-direction: column-reverse;
  }
  .map-actions {
    gap: 8px;
  }
  .map-actions button {
    font-size: 9px;
    flex: 1;
  }
  .places > button {
    padding: 20px;
  }
}

/* The entry is the experience itself; supporting routes retain its vocabulary. */

h1.sr,
.map-actions .sr {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip-path: inset(50%) !important;
  white-space: nowrap !important;
}
.entry header {
  max-width: none;
  width: 100%;
  padding: 20px 25px;
  margin: 0;
  border: 0;
  background: #2b4439;
  color: #f5f2df;
  position: relative;
  z-index: 5;
}
.entry header strong {
  font-size: 17px;
}
.entry header > span {
  font-size: 10px;
}
.entry header button {
  font-size: 11px;
  color: #f5f2df;
}
.entry main {
  max-width: none;
  width: 100%;
  margin: 0;
  padding: 0;
  position: relative;
}
.entry .filters {
  position: absolute;
  left: 25px;
  top: 25px;
  z-index: 4;
  background: #f5f2df;
  padding: 18px;
  width: 310px;
  display: grid;
  grid-template-columns: 1fr 95px;
  gap: 12px;
  box-shadow: 3px 4px 0 #83957f77;
  border: 1px solid #8e9e87;
}
.entry .filters label {
  font-size: 9px;
}
.entry .filters input,
.entry .filters select {
  font-size: 11px;
  width: 100%;
  min-width: 0;
  max-width: none;
  padding: 10px 8px;
}
.entry .filters > span {
  grid-column: 1/3;
  font-size: 10px;
}
.entry .atlas {
  display: block;
  position: relative;
}
.entry .places {
  position: absolute;
  left: 25px;
  top: 180px;
  z-index: 3;
  background: #f5f2df;
  width: 310px;
  padding: 10px 18px;
  box-shadow: 3px 4px 0 #83957f77;
  border: 1px solid #8e9e87;
}
.entry .places > button {
  padding: 18px 0;
  gap: 12px;
  border-bottom: 1px solid #aeb9a0;
}
.entry .places h2 {
  font-size: 18px;
  margin: 0 0 7px;
}
.entry .places p {
  font-size: 11px;
}
.entry .places small {
  font-size: 9px;
}
.entry .route-number {
  font-size: 11px;
}
.entry .map {
  height: calc(100svh - 80px);
  min-height: 750px;
  margin: 0;
  border: 0;
  position: relative;
}
.entry .map svg {
  height: 100%;
  width: 100%;
}
.entry .map figcaption {
  position: absolute;
  bottom: 12px;
  right: 20px;
  font-size: 9px;
  background: #f5f2df;
  padding: 8px 12px;
  max-width: 300px;
}
.map-actions {
  position: absolute;
  inset: 0;
  pointer-events: none;
  display: block;
  padding: 0;
  margin: 0;
}
.map-actions button {
  position: absolute;
  pointer-events: auto;
  width: 44px;
  height: 44px;
  border: 2px solid #305e46;
  border-radius: 50%;
  background: #fffdf0;
  color: #305e46;
  font-size: 13px;
  padding: 0;
  transform: translate(-50%, -50%);
  box-shadow: 0 3px 0 #657c5d66;
}
.map-actions button[aria-pressed='true'] {
  background: #305e46;
  color: white;
}
.map {
  position: relative;
}
.entry .atlas-note {
  padding: 55px 7%;
  background: #f0f0e4;
}
@media (max-width: 750px) {
  .entry header {
    padding: 18px 5%;
    gap: 15px;
  }
  .entry header strong {
    font-size: 13px;
  }
  .entry header > span {
    display: none;
  }
  .entry header nav {
    gap: 12px;
  }
  .entry header button {
    font-size: 9px;
  }
  .entry .filters {
    position: relative;
    left: auto;
    top: auto;
    width: auto;
    margin: 0;
    padding: 18px 5%;
    box-shadow: none;
    border: 0;
    grid-template-columns: minmax(0, 1fr) 95px 45px;
    gap: 10px;
  }
  .entry .filters > span {
    grid-column: 3;
    align-self: end;
    font-size: 9px;
    padding-bottom: 12px;
  }
  .entry .atlas {
    display: flex;
    flex-direction: column;
  }
  .entry .map {
    order: 1;
    min-height: 0;
    height: 460px;
    width: 100%;
  }
  .entry .map figcaption {
    font-size: 7px;
    right: 10px;
    bottom: 10px;
    max-width: 180px;
  }
  .entry .places {
    order: 2;
    position: static;
    width: auto;
    margin: 0;
    padding: 20px 6%;
    box-shadow: none;
    border: 0;
  }
  .entry .places h2 {
    font-size: 21px;
  }
  .entry .places small {
    font-size: 10px;
  }
  .entry .places > button {
    padding: 20px 0;
  }
  .entry .atlas-note {
    padding: 35px 6%;
  }
}
</style>
