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
    .filter((k) => k.startsWith('design-library:35:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const recipes = [
  {
    name: 'An apple cake for keeping',
    drawer: 'Baking',
    year: 'c. 1924',
    ingredient: 'Apple, flour, butter',
    source: 'Family notebook / fictional',
    id: 'B-014',
  },
  {
    name: 'A soup for the cold months',
    drawer: 'Kitchen',
    year: 'c. 1936',
    ingredient: 'Barley, onion, herbs',
    source: 'Community collection / fictional',
    id: 'K-008',
  },
  {
    name: 'Summer cordial',
    drawer: 'Preserving',
    year: 'c. 1912',
    ingredient: 'Berries, sugar, lemon',
    source: 'Provenance incomplete',
    id: 'P-021',
  },
  {
    name: 'A plain oat biscuit',
    drawer: 'Baking',
    year: 'c. 1940',
    ingredient: 'Oats, flour, butter',
    source: 'Loose recipe sheet / fictional',
    id: 'B-027',
  },
];
const saved = useStored<string[]>('35:saved', []),
  notes = useStored<Record<string, string>>('35:notes', {});
const filtered = computed(() =>
  recipes.filter(
    (r) =>
      (tab.value === 'All' || r.drawer === tab.value) &&
      JSON.stringify(r).toLowerCase().includes(q.value.toLowerCase()) &&
      (state.value !== 'saved' || saved.value.includes(r.id)),
  ),
);
function save() {
  const id = recipes[selected.value].id;
  saved.value = saved.value.includes(id)
    ? saved.value.filter((x) => x !== id)
    : [...saved.value, id];
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>The Commonplace<br />Cabinet</strong>
      <div>
        <span>A COLLECTION OF KITCHEN MEMORIES</span
        ><button @click="go('saved')">Saved selections ({{ saved.length }})</button>
      </div>
    </header>
    <main id="content">
      <template v-if="state !== 'record'"
        ><div class="intro">
          <p class="eyebrow">CATALOGUE / DRAWER 01–03</p>
          <h1>{{ state === 'saved' ? 'Kept for later.' : 'A place for things worth keeping.' }}</h1>
          <p>Recipes, records, and the stories that travel with them.</p>
        </div>
        <nav class="drawers">
          <button
            v-for="drawer in ['All', 'Baking', 'Kitchen', 'Preserving']"
            :key="drawer"
            :aria-pressed="tab === drawer"
            @click="
              tab = drawer;
              go('start');
            "
          >
            {{ drawer === 'All' ? 'All drawers' : drawer }}
          </button>
        </nav>
        <div class="drawer-body">
          <div class="row">
            <label
              >Search ingredient or period<input
                v-model="q"
                placeholder="Try apple, barley, or 1924" /></label
            ><span class="grow"></span><small>{{ filtered.length }} RECORDS</small>
          </div>
          <div class="cards">
            <button
              v-for="r in filtered"
              :key="r.id"
              @click="
                selected = recipes.indexOf(r);
                go('record');
              "
            >
              <div class="accession">
                <span>{{ r.id }}</span
                ><span>{{ r.year }}</span>
              </div>
              <h2>{{ r.name }}</h2>
              <p>{{ r.ingredient }}</p>
              <dl>
                <dt>DRAWER</dt>
                <dd>{{ r.drawer }}</dd>
                <dt>SOURCE</dt>
                <dd>{{ r.source }}</dd>
              </dl>
              <span class="open">OPEN RECORD →</span>
            </button>
          </div>
          <div v-if="!filtered.length" class="empty">
            <h2>The drawer is empty.</h2>
            <p>Try another search, or save a record from the full collection.</p>
            <button
              @click="
                q = '';
                tab = 'All';
                go('start');
              "
            >
              Open all drawers
            </button>
          </div>
        </div>
        <section class="collection-note">
          <h2>Keep the context with the recipe.</h2>
          <p>
            Every record names its source, its approximate date, and what is still unknown. These
            are fictional archival records, written to demonstrate a collection.
          </p>
        </section></template
      >
      <article v-else class="record">
        <button class="back" @click="go('start')">← Back to the drawer</button>
        <div class="accession">
          <span>ACCESSION {{ recipes[selected].id }}</span
          ><span>{{ recipes[selected].year }}</span>
        </div>
        <h1>{{ recipes[selected].name }}</h1>
        <p class="provenance">{{ recipes[selected].source }}</p>
        <p v-if="recipes[selected].source.includes('incomplete')" class="notice">
          The original author and place of origin are unknown in this fixture. The gap is retained
          rather than filled with a guess.
        </p>
        <div class="record-columns">
          <section>
            <h2>The record</h2>
            <p>
              A simple household recipe, copied into a notebook and used often enough to leave a
              trace. This sample preserves the rhythm of an archival description without pretending
              to be a historical source.
            </p>
            <h3>Listed ingredients</h3>
            <p>{{ recipes[selected].ingredient }}</p>
            <h3>Editorial note</h3>
            <p>
              This is a design specimen, not a complete tested cooking recipe. The metadata, source
              note, and annotation field are the important parts of the reference.
            </p>
            <button @click="save">
              {{ saved.includes(recipes[selected].id) ? 'Remove from saved' : 'Keep this record' }}
            </button>
          </section>
          <aside>
            <h3>Your margin note</h3>
            <label
              >Private note<textarea
                v-model="notes[recipes[selected].id]"
                placeholder="Something to remember…"
              ></textarea>
            </label>
            <p>Saved locally in this browser. Not published or sent anywhere.</p>
          </aside>
        </div>
      </article>
    </main>
    <footer class="specimen-note">
      <span>The Commonplace Cabinet · Fictional sample content · Design reference 35</span
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
  font-family: 'IBM Plex Mono';
  src: url('/fonts/ibm-plex-mono.woff2') format('woff2');
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
  padding: 30px 6%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #b7a98b;
  gap: 30px;
}
header strong {
  font: 24px/1.35 'Libre Baskerville';
  font-weight: 400;
}
header > div {
  text-align: right;
  font-size: 9px;
}
header button {
  display: block;
  margin: 10px 0 0 auto;
  background: none;
  border: 0;
  font-size: 10px;
}
main {
  max-width: 1250px;
  margin: auto;
  padding: 45px 6% 80px;
}
.intro h1 {
  font: 46px/1.35 'Libre Baskerville';
  white-space: pre-line;
  letter-spacing: -0.04em;
}
.intro > p:last-child {
  font:
    13px 'DM Sans',
    sans-serif;
  margin: 25px 0 35px;
}
.drawers {
  display: flex;
  gap: 8px;
  position: relative;
  z-index: 1;
}
.drawers button {
  background: #c7c3a3;
  border: 1px solid #a49b7e;
  border-bottom: 0;
  padding: 14px 25px;
  border-radius: 9px 9px 0 0;
  font-size: 11px;
}
.drawers button[aria-pressed='true'] {
  background: #f2ead7;
  box-shadow: none;
  position: relative;
  bottom: -1px;
}
.drawer-body {
  border: 1px solid #a49b7e;
  background: #f2ead7;
  padding: 30px;
}
.drawer-body > .row {
  padding-bottom: 25px;
  border-bottom: 1px solid #c9bea4;
  margin-bottom: 25px;
}
.drawer-body label {
  font-size: 9px;
  min-width: 300px;
}
.drawer-body input {
  font-size: 11px;
  background: #faf6e9;
  border-color: #c9bea4;
}
.drawer-body small {
  font-size: 9px;
}
.cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}
.cards > button {
  background: #fbf5e5;
  border: 1px solid #c5b995;
  text-align: left;
  padding: 25px;
  box-shadow: 2px 3px 0 #d4c9ad;
}
.accession {
  display: flex;
  justify-content: space-between;
  font: 9px 'IBM Plex Mono';
  color: #685c45;
  border-bottom: 1px solid #cbbfa5;
  padding-bottom: 13px;
}
.cards h2 {
  font: 23px/1.4 'Libre Baskerville';
  margin: 22px 0;
}
.cards p {
  font-size: 11px;
  line-height: 1.8;
}
.cards dl {
  display: grid;
  grid-template-columns: 70px 1fr;
  gap: 10px;
  font-size: 9px;
  line-height: 1.7;
  margin: 25px 0;
}
.cards dt {
  color: #6c5d45;
}
.cards dd {
  margin: 0;
}
.open {
  font-size: 9px;
}
.collection-note {
  padding: 35px 0 0;
}
.collection-note h2 {
  font-size: 26px;
  font-weight: 400;
}
.collection-note p {
  font:
    14px/1.9 'DM Sans',
    sans-serif;
}
.record {
  background: #fbf5e5;
  padding: 40px;
  border: 1px solid #b7a98b;
  box-shadow: 4px 4px #cfc3a6;
}
.back {
  font-size: 10px;
  background: none;
  border: 0;
  padding: 0;
  margin-bottom: 30px;
}
.record h1 {
  font-size: 43px;
  line-height: 1.4;
  font-weight: 400;
}
.provenance {
  font-size: 10px;
}
.record-columns {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 45px;
  margin-top: 40px;
}
.record h2 {
  font-size: 27px;
  font-weight: 400;
}
.record h3 {
  font-size: 20px;
  font-weight: 400;
}
.record p {
  font:
    14px/1.9 'DM Sans',
    sans-serif;
}
.record button {
  font-size: 11px;
}
.record aside {
  border-left: 1px solid #c9bea4;
  padding-left: 25px;
}
.record aside label {
  font-size: 10px;
}
.record aside textarea {
  background: #f3ecd9;
  border-color: #c9bea4;
  font:
    14px/1.7 'DM Sans',
    sans-serif;
  min-height: 180px;
}
.record aside p {
  font-size: 10px;
}
.notice {
  background: #efe4c6;
  font-size: 12px !important;
}
@media (max-width: 600px) {
  header {
    padding: 23px;
    align-items: start;
  }
  header strong {
    font-size: 18px;
  }
  header > div > span {
    display: none;
  }
  header button {
    font-size: 9px;
    margin: 0;
  }
  main {
    padding: 30px 5% 60px;
  }
  .intro h1 {
    font-size: 35px;
  }
  .drawers {
    gap: 4px;
  }
  .drawers button {
    padding: 12px 10px;
    font-size: 9px;
    flex: 1;
  }
  .drawer-body {
    padding: 20px;
  }
  .drawer-body label {
    min-width: 0;
    width: 100%;
  }
  .cards {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .cards > button {
    padding: 22px;
  }
  .record {
    padding: 24px;
  }
  .record h1 {
    font-size: 31px;
  }
  .record-columns {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  .record aside {
    padding-left: 0;
    border-left: 0;
    border-top: 1px solid #c9bea4;
    padding-top: 20px;
  }
  .collection-note h2 {
    font-size: 23px;
  }
}
</style>
