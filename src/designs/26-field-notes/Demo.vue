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
    .filter((k) => k.startsWith('design-library:26:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const routes = [
  { name: 'The upper lake circuit', terrain: 'Woodland', distance: '7.2 km', time: '2½ hours' },
  { name: 'Across the open ridge', terrain: 'Hill', distance: '5.8 km', time: '2 hours' },
  { name: 'The river meadows', terrain: 'Level', distance: '3.4 km', time: '1 hour' },
];
const saved = useStored<string[]>('26:saved', []),
  packed = useStored<string[]>('26:packed', []);
function save() {
  const n = routes[selected.value].name;
  saved.value = saved.value.includes(n) ? saved.value.filter((x) => x !== n) : [...saved.value, n];
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>RIDGE<br /><span>JOURNAL</span></strong>
      <nav>
        <button @click="go('start')">Field reports</button
        ><button @click="go('saved')">Saved routes ({{ saved.length }})</button>
      </nav>
      <span>OUTSIDE, WITH ATTENTION.</span>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><div class="title">
          <p class="eyebrow">FIELD SEASON / AUTUMN 2026</p>
          <h1>Take the long<br />way round.</h1>
          <p>Routes, observations, and the things worth noticing along the way.</p>
        </div>
        <section class="featured">
          <figure>
            <img
              class=""
              src="/art/lake.webp"
              alt="Wooded slopes reflected in a still alpine lake"
              width="1200"
              height="900"
              loading="lazy"
            />
            <figcaption>FIG. 01 · Woodland and water, illustrative field study.</figcaption>
            <span class="annotation">01 / STILL WATER<br />Look for reflected light.</span>
          </figure>
          <article>
            <p class="eyebrow">REPORT 014 / WOODLAND</p>
            <h2>The upper<br />lake circuit.</h2>
            <p>
              A morning route through sheltering trees and open water. Best taken slowly, with time
              to stop.
            </p>
            <dl>
              <dt>Distance</dt>
              <dd>7.2 km</dd>
              <dt>Time</dt>
              <dd>2½ hours</dd>
              <dt>Conditions</dt>
              <dd>Mixed paths / sample data</dd>
            </dl>
            <button
              @click="
                selected = 0;
                go('report');
              "
            >
              Read the field report ↗
            </button>
          </article>
        </section>
        <section class="routes">
          <div class="row">
            <h2>From the notebook.</h2>
            <span class="grow"></span
            ><label
              >Terrain<select v-model="tab">
                <option>All</option>
                <option>Woodland</option>
                <option>Hill</option>
                <option>Level</option>
              </select></label
            >
          </div>
          <button
            v-for="(r, i) in routes.filter((r) => tab === 'All' || r.terrain === tab)"
            :key="r.name"
            @click="
              selected = routes.indexOf(r);
              go('report');
            "
          >
            <small>0{{ routes.indexOf(r) + 1 }} / {{ r.terrain }}</small>
            <h3>{{ r.name }}</h3>
            <span>{{ r.distance }} / {{ r.time }} →</span>
          </button>
        </section></template
      >
      <article v-else-if="state === 'report'" class="report">
        <p class="eyebrow">FIELD REPORT / {{ routes[selected].terrain }}</p>
        <h1>{{ routes[selected].name }}</h1>
        <div class="report-grid">
          <div>
            <img
              class=""
              src="/art/lake.webp"
              alt="A quiet lake and forest landscape"
              width="1200"
              height="900"
              loading="lazy"
            />
            <h2>Before the first bend.</h2>
            <p>
              The path begins beneath the trees, where the air feels cooler and footsteps are
              softened by leaves. After the first bend, the lake appears between the trunks.
            </p>
            <p>
              This fictional route demonstrates a field report: practical information first, then
              observations that give the place character. It is not a real route description.
            </p>
            <h3>Observed along the way</h3>
            <ol>
              <li>Reflections are clearest in the sheltered inlet.</li>
              <li>The path narrows beside the old wall.</li>
              <li>A bench marks the return toward the starting point.</li>
            </ol>
          </div>
          <aside>
            <h3>Route notes</h3>
            <p>
              {{ routes[selected].distance }} · {{ routes[selected].time }}<br />{{
                routes[selected].terrain
              }}
              / Sample distances
            </p>
            <button @click="save">
              {{ saved.includes(routes[selected].name) ? 'Remove saved route' : 'Save route' }}
            </button>
            <h3>Pack for the day</h3>
            <label
              v-for="item in ['Water', 'Weather layer', 'Snack', 'Notebook', 'Offline route notes']"
              :key="item"
              ><input type="checkbox" :value="item" v-model="packed" />{{ item }}</label
            >
            <p>{{ packed.length }} of 5 packed locally.</p>
          </aside>
        </div>
      </article>
      <section v-else class="saved">
        <h1>Kept for another day.</h1>
        <p v-if="!saved.length">No saved routes yet. Open a field report to keep it here.</p>
        <button
          v-for="name in saved"
          :key="name"
          @click="
            selected = routes.findIndex((r) => r.name === name);
            go('report');
          "
        >
          {{ name }} →</button
        ><button @click="go('start')">Return to the notebook</button>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Ridge Journal · Fictional sample content · Design reference 26</span
      ><button @click="reset">Reset demo</button>
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Libre Baskerville';
  src: url('/fonts/libre-baskerville.woff2') format('woff2');
  font-display: swap;
  font-weight: 100 900;
}
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
  padding: 25px 5%;
  display: flex;
  align-items: center;
  gap: 45px;
  border-bottom: 1px solid var(--line);
}
header strong {
  font: 24px/1 'Libre Baskerville';
  letter-spacing: 0.05em;
}
header strong span {
  font: 11px 'DM Sans';
  letter-spacing: 0.22em;
}
nav {
  display: flex;
  gap: 25px;
}
nav button {
  font-size: 11px;
  border: 0;
  background: none;
}
header > span {
  margin-left: auto;
  font-size: 9px;
  letter-spacing: 0.08em;
}
main {
  max-width: 1400px;
  margin: auto;
  padding: 45px 5% 80px;
}
.title {
  position: relative;
  padding: 5px 0 35px;
}
.title h1 {
  font-size: 60px;
  line-height: 1.2;
  font-weight: 400;
  margin: 20px 0;
}
.title > p:last-child {
  font-size: 14px;
  max-width: 380px;
  position: absolute;
  bottom: 45px;
  right: 0;
}
.featured {
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  gap: 60px;
  align-items: center;
}
.featured figure {
  position: relative;
}
.featured img {
  width: 100%;
  height: 430px;
}
.featured figcaption {
  font-size: 9px;
}
.annotation {
  position: absolute;
  bottom: 55px;
  left: 25px;
  background: #eeeadd;
  padding: 12px 18px;
  font: 9px/1.7 'DM Sans';
  border-left: 2px solid;
}
.featured h2 {
  font-size: 41px;
  font-weight: 400;
  line-height: 1.3;
}
.featured p {
  font-size: 14px;
}
.featured dl {
  display: grid;
  grid-template-columns: 85px 1fr;
  gap: 14px;
  font-size: 11px;
  margin: 30px 0;
}
.featured dd {
  margin: 0;
}
.featured button {
  font-size: 12px;
  background: none;
  border: 0;
  border-bottom: 1px solid;
  padding: 10px 0;
  border-radius: 0;
}
.routes {
  padding: 50px 0 0;
  margin-top: 50px;
  border-top: 2px solid;
}
.routes h2 {
  font-weight: 400;
  font-size: 31px;
}
.routes label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
}
.routes select {
  font-size: 11px;
  background: none;
}
.routes > button {
  display: flex;
  align-items: center;
  gap: 35px;
  width: 100%;
  border: 0;
  border-top: 1px solid var(--line);
  background: none;
  padding: 25px 0;
  text-align: left;
}
.routes small {
  font-size: 9px;
  width: 130px;
}
.routes h3 {
  flex: 1;
  font-weight: 400;
  font-size: 22px;
  margin: 0;
}
.routes > button > span {
  font-size: 11px;
}
.report h1 {
  font-weight: 400;
  font-size: 55px;
  line-height: 1.3;
}
.report-grid {
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 60px;
}
.report img {
  width: 100%;
  height: 400px;
}
.report h2 {
  font-size: 30px;
  font-weight: 400;
  margin-top: 40px;
}
.report p,
.report li {
  font-size: 14px;
  line-height: 1.9;
}
.report aside {
  border-top: 3px solid;
  padding-top: 25px;
}
.report aside h3 {
  font-size: 19px;
  font-weight: 400;
}
.report aside p {
  font-size: 11px;
}
.report aside button {
  font-size: 11px;
  background: none;
  margin-bottom: 30px;
}
.report aside label {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 15px 0;
  font-size: 12px;
}
.report input {
  accent-color: #5b6f43;
}
.saved {
  min-height: 700px;
}
.saved h1 {
  font-size: 48px;
  font-weight: 400;
}
.saved button {
  display: block;
  background: none;
  border: 0;
  border-top: 1px solid;
  padding: 25px 0;
  text-align: left;
  width: 100%;
}
@media (max-width: 700px) {
  header > a {
    flex-shrink: 0;
  }
  header nav {
    flex-wrap: wrap;
    gap: 12px;
  }
  header > span {
    display: none;
  }
  .title > p:last-child {
    position: static;
  }
  .title h1 {
    font-size: 46px;
  }
  .featured {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .featured img {
    height: 300px;
  }
  .featured h2 {
    font-size: 35px;
  }
  .routes > button {
    flex-wrap: wrap;
    gap: 12px;
  }
  .routes small {
    width: 100%;
  }
  .routes h3 {
    font-size: 20px;
  }
  .routes > button > span {
    width: 100%;
  }
  .report-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .report h1 {
    font-size: 39px;
  }
  .report img {
    height: 260px;
  }
  .report aside {
    padding-bottom: 20px;
  }
  .saved h1 {
    font-size: 37px;
  }
}
@media (max-width: 600px) {
  header {
    flex-wrap: wrap;
    gap: 16px;
  }
  header > strong {
    white-space: nowrap;
    word-break: normal;
    overflow-wrap: normal;
    flex-shrink: 0;
    font-size: 30px;
  }
  header nav {
    flex-basis: 100%;
    justify-content: space-between;
    margin-left: 0;
    gap: 12px;
  }
}
</style>
