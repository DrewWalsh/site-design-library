<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const opened = ref([0, 1]);
const selected = ref(1);
const saved = useStored<number[]>('76:itinerary', []);
const pieces = [
  {
    title: 'A page is a place',
    by: 'Mara Venn',
    time: '10:00 / Reading room',
    text: 'A page does not have to be a rectangle we pass through. It can be a place we remain in, folding one sentence toward another until an unexpected neighbour appears.',
  },
  {
    title: 'Instructions for getting lost',
    by: 'Eli Moss',
    time: '11:30 / North table',
    text: 'Begin with a street you know. At the first familiar corner, turn the map upside down. This small exercise in disorientation asks what a publication can do when it stops explaining the quickest route.',
  },
  {
    title: 'The useful blank',
    by: 'Ada Field',
    time: '13:00 / Paper workshop',
    text: 'The unprinted part of a sheet is not a remainder. It is where a thumb rests, a note begins and a reader’s version of the book takes shape. We will bind a booklet around those intervals.',
  },
  {
    title: 'Six hands, one sentence',
    by: 'Noor Park',
    time: '14:30 / Long table',
    text: 'Each contributor receives the last five words of the previous person’s text. The resulting sentence is a shared structure: nobody owns the complete view, but everyone makes a consequential decision.',
  },
  {
    title: 'Margins in common',
    by: 'Kit Vale',
    time: '16:00 / Reading room',
    text: 'Bring a book that carries another reader’s marks. We will read the marginal conversation aloud, leaving the central text silent. The exercise gives ordinary acts of attention a public voice.',
  },
  {
    title: 'Carry this home',
    by: 'Assembly editors',
    time: '17:00 / Closing fold',
    text: 'The day ends with a portable edition. Select the pieces you want to remember, arrange their sequence and take the itinerary with you. A publication can be an instruction for something that happens later.',
  },
];
function fold(i: number) {
  opened.value = opened.value.includes(i)
    ? opened.value.filter((n) => n !== i)
    : [...opened.value, i];
}
function read(i: number) {
  selected.value = i;
  go('spread');
}
function save() {
  if (!saved.value.includes(selected.value)) saved.value.push(selected.value);
}
</script>
<template>
  <div class="specimen" :class="{ entry: state === 'start' }">
    <a class="skip" href="#content">Skip to content</a>

    <header>
      <strong>UNFOLD ↗</strong><span>A SMALL PRESS ASSEMBLY<br />14 NOVEMBER / EDITION 006</span>
      <nav>
        <button
          @click="
            opened = [0, 1, 2, 3, 4, 5];
            go('start');
          "
        >
          Unfold all</button
        ><button @click="go('itinerary')">My itinerary ({{ saved.length }})</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><h1 class="sr">Unfold: six contributions on one sheet</h1>
        <div class="sheet">
          <section v-for="(p, i) in pieces" :key="p.title" :class="{ closed: !opened.includes(i) }">
            <button class="crease" :aria-expanded="opened.includes(i)" @click="fold(i)">
              <span>FOLD 0{{ i + 1 }}</span
              ><span>{{ opened.includes(i) ? '−' : '↗' }}</span>
            </button>
            <span class="fold-number" aria-hidden="true">0{{ i + 1 }}</span>
            <h2>{{ p.title }}</h2>
            <template v-if="opened.includes(i)"
              ><p>{{ p.text }}</p>
              <small>{{ p.by }} · {{ p.time }}</small
              ><button class="read" @click="read(i)">Open the spread ↗</button></template
            ><span v-else class="fold-corner" aria-hidden="true"></span>
          </section>
        </div>
        <p class="caption">One sheet. Six contributions. Start at any fold.</p></template
      >
      <article v-else-if="state === 'spread'" class="spread">
        <button @click="go('start')">↖ Refold the sheet</button>
        <p>CONTRIBUTION 0{{ selected + 1 }} / {{ pieces[selected].by }}</p>
        <h1>{{ pieces[selected].title }}</h1>
        <p class="lead">{{ pieces[selected].text }}</p>
        <div class="instructions">
          <h2>Try this at the table</h2>
          <ol>
            <li>Read the opening twice, once silently and once to someone else.</li>
            <li>Choose one instruction and alter its smallest possible detail.</li>
            <li>Write what changed in the margin. Leave room for another reader.</li>
          </ol>
          <p>
            {{ pieces[selected].time }}. Materials supplied; every contribution is a fictional
            programme fixture.
          </p>
        </div>
        <button @click="save">
          {{ saved.includes(selected) ? 'Added to itinerary ✓' : 'Add this reading' }}</button
        ><button @click="read((selected + 1) % 6)">Next fold →</button>
      </article>
      <section v-else class="itinerary">
        <h1>Your day,<br />unfolded.</h1>
        <p>Select a reading from the sheet to build your own sequence. Saved on this browser.</p>
        <ol>
          <li v-for="i in saved" :key="i">
            <button @click="read(i)">{{ pieces[i].title }}</button><span>{{ pieces[i].time }}</span
            ><button @click="saved = saved.filter((n) => n !== i)">Remove</button>
          </li>
        </ol>
        <p v-if="!saved.length">The sheet is still blank. Start with one contribution.</p>
        <button @click="go('start')">Choose readings ↗</button
        ><button @click="saved = []">Clear itinerary</button>
      </section>
    </main>
    <footer>Independent words, shared surfaces. / A fictional publishing programme.</footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Archivo Black';
  src: url('/fonts/archivo-black.woff2') format('woff2');
  font-weight: 400 700;
  font-display: swap;
}
@font-face {
  font-family: 'DM Sans';
  src: url('/fonts/dm-sans.woff2') format('woff2');
  font-weight: 400 700;
  font-display: swap;
}
.specimen {
  min-height: 100vh;
  background: var(--page);
  color: var(--ink);
  font-family: var(--body);
  line-height: 1.5;
  overflow-wrap: break-word;
}
.skip {
  position: fixed;
  top: -100px;
  left: 12px;
  z-index: 100;
  background: var(--ink);
  color: var(--page);
  padding: 12px;
}
.skip:focus {
  top: 12px;
}
button {
  color: inherit;
}
button:disabled {
  opacity: 0.55;
}
button,
a,
input,
select {
  max-width: 100%;
}
button {
  white-space: normal;
}
h1,
h2,
h3,
p {
  margin-top: 0;
}
p {
  max-width: var(--measure);
}
nav {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

header {
  padding: 30px 4%;
  display: flex;
  justify-content: space-between;
  gap: 24px;
  border-bottom: 2px solid;
}
header strong {
  font: 28px var(--heading);
}
header span {
  font-size: 11px;
}
button {
  background: transparent;
  border: 1px solid;
  padding: 10px 16px;
}
h1 {
  font: clamp(48px, 8.8vw, 130px)/0.98 var(--heading);
  letter-spacing: -0.055em;
  padding: 52px 4%;
  margin: 0;
}
.sheet {
  display: grid;
  grid-template-columns: 1.15fr 1fr 1fr;
  perspective: 1400px;
}
.sheet section {
  position: relative;
  border: 1px solid #30331b;
  padding: 24px 30px 35px;
  min-height: 390px;
  background: linear-gradient(100deg, #00000009, transparent 40%, #ffffff22);
}
.sheet section:nth-child(2n) {
  background: linear-gradient(95deg, #00000018, transparent 25%);
}
.sheet h2 {
  font: clamp(26px, 3.5vw, 48px)/1.1 var(--heading);
  letter-spacing: -0.04em;
}
.crease {
  border: 0;
  border-bottom: 1px dashed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 28px;
  padding: 0 0 12px;
  font-size: 11px;
  letter-spacing: 0.12em;
}
.read {
  display: block;
  margin-top: 20px;
}
.closed {
  overflow: hidden;
}
.closed h2 {
  max-width: 80%;
}
.fold-corner {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 180px;
  height: 180px;
  background: #b1bd24;
  clip-path: polygon(100% 0, 0 100%, 100% 100%);
  filter: drop-shadow(-10px -10px 4px #0003);
}
.caption,
footer {
  padding: 24px 4%;
  font-size: 12px;
}
footer {
  border-top: 1px solid;
}
.spread,
.itinerary {
  padding: 40px 4% 90px;
}
.spread h1,
.itinerary h1 {
  padding: 35px 0;
  max-width: 1100px;
}
.lead {
  font-size: clamp(24px, 3vw, 42px);
  max-width: 34ch;
}
.instructions {
  border-top: 1px dashed;
  padding: 24px 0;
  max-width: 700px;
}
.spread > button {
  margin-right: 12px;
}
.itinerary li {
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  border-bottom: 1px solid;
}
.itinerary ol {
  padding: 0;
  max-width: 900px;
}
.itinerary span {
  flex: 1;
}
@media (max-width: 750px) {
  header {
    flex-wrap: wrap;
  }
  .sheet {
    grid-template-columns: 1fr;
  }
  .sheet section {
    min-height: 0;
  }
  .sheet h2 {
    font-size: 38px;
  }
  .closed {
    min-height: 225px !important;
  }
  h1 {
    padding: 40px 5%;
  }
  .sheet section {
    padding: 24px 5%;
  }
  .spread,
  .itinerary {
    padding: 25px 5%;
  }
  .itinerary li {
    display: block;
  }
  .itinerary span {
    display: block;
    margin: 12px 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition: none !important;
    animation: none !important;
    scroll-behavior: auto !important;
  }
}

/* The entry is the experience itself; supporting routes retain its vocabulary. */

.entry {
  background: #272a24;
  color: #e7f44b;
  position: relative;
}
.entry header {
  position: relative;
  min-height: 150px;
  border: 0;
  padding: 24px 4%;
  align-items: center;
}
.entry header strong {
  font-size: clamp(60px, 9vw, 130px);
  letter-spacing: -0.08em;
  line-height: 1;
  transform: rotate(-5deg);
}
.entry header > span {
  max-width: 150px;
  margin-left: auto;
}
.entry header nav {
  max-width: 230px;
  justify-content: flex-end;
}
.entry main > h1 {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip-path: inset(50%) !important;
  white-space: nowrap !important;
}
.entry .sheet {
  width: 94%;
  margin: 10px auto 90px;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: auto auto;
  transform: rotate(-1deg);
}
.entry .sheet section {
  color: #171810;
  background: #e7f44b;
  min-height: 280px;
  padding: 22px;
  border: 1px dashed #343723;
  overflow: visible;
  box-shadow: 10px 10px 0 #141710;
}
.entry .sheet section:nth-child(1) {
  grid-column: 1/5;
  grid-row: 1;
  transform: translateY(35px);
}
.entry .sheet section:nth-child(2) {
  grid-column: 5/10;
  grid-row: 1;
  background: #f4ff92;
}
.entry .sheet section:nth-child(3) {
  grid-column: 10/13;
  grid-row: 1;
  transform: perspective(1000px) rotateY(-15deg);
  transform-origin: left;
}
.entry .sheet section:nth-child(4) {
  grid-column: 2/6;
  grid-row: 2;
  background: #bdcb36;
  margin-top: 35px;
}
.entry .sheet section:nth-child(5) {
  grid-column: 6/10;
  grid-row: 2;
}
.entry .sheet section:nth-child(6) {
  grid-column: 10/13;
  grid-row: 2;
  transform: translateY(-18px);
  background: #d5df49;
}
.fold-number {
  font: clamp(60px, 8vw, 110px)/0.85 var(--heading);
  display: block;
  letter-spacing: -0.08em;
  margin: 18px 0;
}
.entry .sheet h2 {
  font-size: clamp(22px, 2.6vw, 38px);
  max-width: 100%;
}
.entry .sheet p {
  font-size: 14px;
  line-height: 1.6;
}
.entry .crease {
  margin: 0 0 12px;
}
.entry .sheet .closed {
  min-height: 300px;
}
.entry .sheet section:nth-child(2) .fold-number {
  float: right;
  font-size: 160px;
  line-height: 0.8;
  opacity: 0.15;
  margin: 0;
}
.entry .fold-corner {
  width: 90px;
  height: 90px;
}
.entry .caption {
  padding: 0 4%;
  font-family: var(--heading);
  font-size: 22px;
}
.entry footer {
  border-color: #707663;
}
@media (max-width: 750px) {
  .entry header {
    min-height: 160px;
    flex-wrap: wrap;
    gap: 12px;
    padding: 20px 6%;
  }
  .entry header strong {
    font-size: 67px;
  }
  .entry header > span {
    font-size: 9px;
    max-width: 105px;
  }
  .entry header nav {
    max-width: none;
    justify-content: flex-start;
    gap: 8px;
  }
  .entry .sheet {
    display: block;
    width: 86%;
    transform: none;
    margin-bottom: 40px;
  }
  .entry .sheet section:nth-child(n) {
    transform: none;
    margin: 0;
    min-height: 180px;
    padding: 22px;
  }
  .entry .sheet section:nth-child(2n) {
    transform: translateX(14px);
  }
  .entry .fold-number {
    float: right;
    font-size: 80px;
    margin: 12px 0 16px 12px;
  }
  .entry .sheet section:nth-child(2) .fold-number {
    font-size: 80px;
    opacity: 1;
  }
  .entry .sheet h2 {
    font-size: 28px;
    padding-top: 12px;
  }
  .entry .sheet p {
    clear: both;
  }
  .entry .sheet .closed {
    min-height: 200px;
  }
}
</style>
