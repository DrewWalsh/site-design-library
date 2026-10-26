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
    .filter((k) => k.startsWith('design-library:50:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const studies = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  title:
    [
      'A fold in the afternoon',
      'Circles in conversation',
      'The weight of a line',
      'Between two colours',
      'A quiet interval',
      'The same, differently',
    ][i % 6] +
    ' / ' +
    String(i + 1).padStart(2, '0'),
  medium: ['Print', 'Drawing', 'Collage'][i % 3],
  year: i % 2 ? '2025' : '2026',
}));
const density = ref('Overview'),
  page = ref(1);
const results = computed(() =>
  studies.filter(
    (s) =>
      (tab.value === 'All' || s.medium === tab.value) &&
      (s.title + ' ' + s.medium).toLowerCase().includes(q.value.toLowerCase()),
  ),
);
const pages = computed(() => Math.max(1, Math.ceil(results.value.length / 12)));
const visible = computed(() => results.value.slice((page.value - 1) * 12, page.value * 12));
watch([q, tab], () => (page.value = 1));
const backY = ref(0);
function open(i: number) {
  selected.value = i;
  backY.value = scrollY;
  go('detail');
}
async function back() {
  await go('start');
  scrollTo(0, backY.value);
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>THE REFERENCE ROOM</strong><span>A FINITE INDEX OF GRAPHIC STUDIES.</span
      ><button @click="go(state === 'list' ? 'start' : 'list')">
        {{ state === 'list' ? 'Image view' : 'Text list' }}
      </button>
    </header>
    <main id="content">
      <template v-if="state !== 'detail'"
        ><section class="index-heading">
          <div>
            <p class="eyebrow">COLLECTION 01 / 24 ORIGINAL STUDIES</p>
            <h1>Look closer.<br />Or step back.</h1>
          </div>
          <p>Composition at different scales.<br />Find the relationship that catches your eye.</p>
        </section>
        <div class="control-strip">
          <label
            ><input
              v-model="q"
              aria-label="Search graphic studies"
              placeholder="Search the index…" /></label
          ><label
            >Medium<select v-model="tab">
              <option>All</option>
              <option>Print</option>
              <option>Drawing</option>
              <option>Collage</option>
            </select></label
          >
          <div class="density">
            <button
              v-for="d in ['Overview', 'Medium', 'Detail']"
              :key="d"
              :aria-pressed="density === d"
              @click="density = d"
            >
              {{ d }}
            </button>
          </div>
          <span>{{ results.length }} studies</span>
        </div>
        <div v-if="state === 'start'" :class="['index-grid', density.toLowerCase()]">
          <button v-for="s in visible" :key="s.id" @click="open(s.id - 1)">
            <div
              :class="['graphic', 'g' + (s.id % 6)]"
              role="img"
              :aria-label="'Original ' + s.medium.toLowerCase() + ' composition, study ' + s.id"
            >
              <span class="shape-one"></span><span class="shape-two"></span
              ><b>{{ String(s.id).padStart(2, '0') }}</b
              ><small>{{ s.medium.toUpperCase() }}<br />FORM / INTERVAL</small>
            </div>
            <div class="caption">
              <span>{{ String(s.id).padStart(2, '0') }}</span>
              <h2>{{ s.title.split(' / ')[0] }}</h2>
              <span>{{ s.medium }}</span>
            </div>
          </button>
        </div>
        <div v-else class="text-list">
          <button v-for="s in visible" :key="s.id" @click="open(s.id - 1)">
            <span>STUDY {{ String(s.id).padStart(2, '0') }}</span>
            <h2>{{ s.title }}</h2>
            <span>{{ s.medium }} / {{ s.year }}</span
            ><b>↗</b>
          </button>
        </div>
        <section v-if="!results.length" class="empty">
          <h2>No studies match this view.</h2>
          <p>Try another medium, or clear the search.</p>
          <button
            @click="
              q = '';
              tab = 'All';
            "
          >
            Reset the index
          </button>
        </section>
        <nav class="pagination" aria-label="Result pages">
          <button
            :disabled="page === 1"
            @click="
              page--;
              go(state);
            "
          >
            ← Previous</button
          ><span>PAGE {{ page }} OF {{ pages }} / {{ results.length }} STUDIES</span
          ><button
            :disabled="page === pages"
            @click="
              page++;
              go(state);
            "
          >
            Next →
          </button>
        </nav>
        <section class="index-note">
          <h2>A collection you can get your bearings in.</h2>
          <p>
            Twenty-four original CSS compositions. Change the density to see more relationships at
            once, or switch to a text list. The collection has an end; there is no infinite loading.
          </p>
        </section></template
      >
      <section v-else class="study-detail">
        <button class="back" @click="back">← Return to the same results</button>
        <div class="detail-layout">
          <div
            :class="['graphic', 'g' + (studies[selected].id % 6)]"
            role="img"
            :aria-label="'Enlarged original graphic study ' + studies[selected].id"
          >
            <span class="shape-one"></span><span class="shape-two"></span
            ><b>{{ String(studies[selected].id).padStart(2, '0') }}</b
            ><small>{{ studies[selected].medium.toUpperCase() }}<br />FORM / INTERVAL</small>
          </div>
          <article>
            <p class="eyebrow">
              STUDY {{ String(studies[selected].id).padStart(2, '0') }} /
              {{ studies[selected].year }}
            </p>
            <h1>{{ studies[selected].title.split(' / ')[0] }}</h1>
            <p>
              An original CSS composition exploring the relationship between a repeated form, a
              contrasting plane, and the space between them.
            </p>
            <dl>
              <dt>Medium</dt>
              <dd>{{ studies[selected].medium }} / digital study</dd>
              <dt>Collection</dt>
              <dd>Form & interval</dd>
              <dt>Source</dt>
              <dd>Original work in this specimen</dd>
            </dl>
            <button @click="selected = (selected + 1) % 24">Next study →</button>
          </article>
        </div>
      </section>
    </main>
    <footer class="specimen-note">
      <span>The Reference Room · Fictional sample content · Design reference 50</span
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
  padding: 23px 3%;
  border-bottom: 1px solid #b7c1ae;
}
header strong {
  font-size: 16px;
  letter-spacing: -0.03em;
}
header > span {
  font-size: 8px;
  letter-spacing: 0.1em;
  color: #4f6346;
}
header button {
  margin-left: auto;
  font-size: 10px;
  border: 0;
  background: none;
}
main {
  padding: 30px 3% 60px;
  max-width: 1800px;
  margin: auto;
}
.index-heading {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: end;
  padding: 5px 0 25px;
}
.index-heading h1 {
  font-size: 46px;
  line-height: 1.06;
  font-weight: 500;
  margin: 15px 0;
}
.index-heading > p {
  font-size: 12px;
  line-height: 1.8;
  color: #4d6245;
}
.control-strip {
  display: flex;
  gap: 25px;
  align-items: center;
  padding: 18px 0;
  border-top: 1px solid #b7c1ae;
  border-bottom: 1px solid #b7c1ae;
  margin-bottom: 25px;
  background: #eeeee8;
  position: sticky;
  top: 0;
  z-index: 5;
}
.control-strip > label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 10px;
}
.control-strip > label:first-child {
  flex: 1;
}
.control-strip input {
  width: 100%;
  font-size: 11px;
  background: #fafbf4;
  min-width: 130px;
}
.control-strip select {
  font-size: 11px;
  background: none;
}
.density {
  display: flex;
  gap: 5px;
}
.density button {
  font-size: 10px;
  background: none;
  padding: 9px 12px;
  border: 1px solid transparent;
  min-height: 32px;
}
.density button[aria-pressed='true'] {
  background: #dce4d4;
  border-color: #aebfa0;
}
.control-strip > span {
  font-size: 10px;
  white-space: nowrap;
}
.index-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 22px 15px;
}
.index-grid.medium {
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
}
.index-grid.detail {
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}
.index-grid > button {
  background: none;
  border: 0;
  padding: 0;
  text-align: left;
  border-radius: 0;
  min-width: 0;
}
.graphic {
  aspect-ratio: 4/5;
  background: #d8d2b6;
  position: relative;
  overflow: hidden;
  color: #273c36;
}
.graphic .shape-one {
  position: absolute;
  width: 70%;
  height: 60%;
  border-radius: 50%;
  background: #a65c46;
  top: 12%;
  left: -10%;
}
.graphic .shape-two {
  position: absolute;
  width: 45%;
  height: 65%;
  border: 1px solid #273c36;
  right: 10%;
  top: 20%;
  transform: rotate(20deg);
}
.graphic b {
  position: absolute;
  top: 8%;
  left: 10%;
  font-size: clamp(28px, 4vw, 65px);
  letter-spacing: -0.06em;
  font-weight: 500;
  z-index: 1;
}
.graphic small {
  position: absolute;
  bottom: 8%;
  left: 10%;
  font-size: 7px;
  line-height: 1.6;
  letter-spacing: 0.1em;
}
.g1 {
  background: #c1d1d6;
}
.g1 .shape-one {
  background: #466288;
  border-radius: 0;
  left: 20%;
  top: 35%;
  height: 35%;
  width: 80%;
  transform: rotate(-18deg);
}
.g1 .shape-two {
  border: 10px solid #ece2c3;
  border-radius: 50%;
  height: 60%;
  width: 75%;
  top: 10%;
  right: -25%;
}
.g2 {
  background: #d5a286;
}
.g2 .shape-one {
  background: #e8ddbd;
  width: 90%;
  height: 90%;
  top: 30%;
  left: 5%;
}
.g2 .shape-two {
  border: 0;
  background: #5b6c5a;
  width: 20%;
  height: 100%;
  top: 0;
  right: 30%;
  transform: rotate(30deg);
}
.g3 {
  background: #c1c6a2;
}
.g3 .shape-one {
  border-radius: 0;
  background: repeating-linear-gradient(90deg, #354b41 0 5px, transparent 5px 14px);
  width: 110%;
  height: 90%;
  left: -5%;
  top: 10%;
  transform: rotate(25deg);
}
.g3 .shape-two {
  background: #c1c6a2;
  border: 0;
  transform: none;
  top: 50%;
  right: 0;
  width: 70%;
}
.g4 {
  background: #aba4b9;
}
.g4 .shape-one {
  background: #e1d0a0;
  border-radius: 50%;
  width: 60%;
  height: 45%;
  left: 20%;
  top: 30%;
}
.g4 .shape-two {
  border: 15px solid #665a76;
  border-radius: 50%;
  width: 70%;
  height: 60%;
  right: 15%;
  top: 15%;
  transform: none;
}
.g5 {
  background: #dcdbce;
}
.g5 .shape-one {
  background: #2f4547;
  border-radius: 0;
  width: 100%;
  height: 30%;
  left: 0;
  top: 45%;
}
.g5 .shape-two {
  border: 0;
  background: #b96044;
  border-radius: 50%;
  width: 60%;
  height: 45%;
  right: 10%;
  top: 35%;
  mix-blend-mode: multiply;
}
.caption {
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: 6px;
  margin-top: 10px;
  font-size: 8px;
}
.caption h2 {
  font-size: 11px;
  line-height: 1.4;
  font-weight: 500;
  margin: 0;
  letter-spacing: 0;
}
.caption > span:last-child {
  grid-column: 2;
  color: #4f6446;
  font-size: 8px;
}
.pagination {
  display: flex;
  justify-content: space-between;
  gap: 25px;
  align-items: center;
  margin: 35px 0;
  border-top: 1px solid #b7c1ae;
  padding-top: 20px;
}
.pagination button {
  font-size: 11px;
  background: none;
  border: 0;
  padding: 0;
}
.pagination button:disabled {
  color: #8e9a87;
}
.pagination > span {
  font-size: 9px;
  letter-spacing: 0.05em;
}
.index-note {
  padding: 30px 0;
  border-top: 1px solid #b7c1ae;
}
.index-note h2 {
  font-size: 27px;
}
.index-note p {
  font-size: 13px;
  line-height: 1.9;
}
.text-list > button {
  display: flex;
  gap: 30px;
  align-items: center;
  text-align: left;
  width: 100%;
  background: none;
  border: 0;
  border-bottom: 1px solid #b7c1ae;
  padding: 22px 0;
  font-size: 10px;
}
.text-list h2 {
  flex: 1;
  font-size: 21px;
  margin: 0;
}
.text-list b {
  font-size: 20px;
}
.study-detail {
  padding: 15px 0 90px;
}
.back {
  background: none;
  border: 0;
  font-size: 11px;
  padding: 0;
  margin-bottom: 35px;
}
.detail-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  max-width: 1200px;
  margin: auto;
  align-items: center;
}
.detail-layout > .graphic {
  max-height: 700px;
}
.detail-layout > .graphic b {
  font-size: 100px;
}
.detail-layout > .graphic small {
  font-size: 13px;
}
.detail-layout h1 {
  font-size: 56px;
  font-weight: 500;
  line-height: 1.12;
}
.detail-layout p {
  font-size: 15px;
  line-height: 1.9;
}
.detail-layout dl {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 18px;
  font-size: 12px;
  margin: 35px 0;
}
.detail-layout dd {
  margin: 0;
}
.detail-layout button {
  font-size: 12px;
  background: none;
}
@media (max-width: 1000px) {
  .index-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  .index-grid.medium {
    grid-template-columns: repeat(3, 1fr);
  }
  .index-grid.detail {
    grid-template-columns: repeat(2, 1fr);
  }
  .control-strip {
    gap: 15px;
  }
  .density button {
    padding: 7px;
    font-size: 9px;
  }
  .detail-layout {
    gap: 40px;
  }
  .detail-layout h1 {
    font-size: 44px;
  }
}
@media (max-width: 600px) {
  header {
    padding: 23px;
    gap: 15px;
  }
  header strong {
    font-size: 14px;
  }
  header > span {
    display: none;
  }
  main {
    padding: 25px 5% 50px;
  }
  .index-heading {
    display: block;
  }
  .index-heading h1 {
    font-size: 37px;
  }
  .index-heading > p {
    font-size: 11px;
  }
  .control-strip {
    flex-wrap: wrap;
    gap: 12px;
    padding: 14px 0;
  }
  .control-strip > label:first-child {
    min-width: 55%;
  }
  .control-strip > label {
    font-size: 9px;
  }
  .control-strip select {
    padding: 8px;
    font-size: 10px;
  }
  .control-strip input {
    min-width: 0;
    font-size: 10px;
  }
  .control-strip > span {
    margin-left: auto;
    font-size: 9px;
  }
  .index-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px 10px;
  }
  .index-grid.medium {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px 15px;
  }
  .index-grid.detail {
    grid-template-columns: 1fr;
  }
  .caption {
    grid-template-columns: 15px 1fr;
    gap: 3px;
  }
  .caption h2 {
    font-size: 9px;
  }
  .caption > span {
    font-size: 7px;
  }
  .graphic small {
    font-size: 5px;
  }
  .graphic b {
    font-size: 30px;
  }
  .detail .graphic b {
    font-size: 75px;
  }
  .detail .graphic small {
    font-size: 10px;
  }
  .pagination {
    gap: 10px;
  }
  .pagination > span {
    font-size: 7px;
  }
  .pagination button {
    font-size: 10px;
  }
  .text-list > button {
    gap: 12px;
    flex-wrap: wrap;
  }
  .text-list h2 {
    font-size: 17px;
    min-width: 65%;
  }
  .text-list > button > span {
    font-size: 8px;
  }
  .detail-layout {
    grid-template-columns: 1fr;
    gap: 35px;
  }
  .detail-layout h1 {
    font-size: 38px;
  }
  .detail-layout > .graphic b {
    font-size: 70px;
  }
  .detail-layout > .graphic small {
    font-size: 10px;
  }
  .index-note h2 {
    font-size: 24px;
  }
  .index-note p {
    font-size: 12px;
  }
}
</style>
