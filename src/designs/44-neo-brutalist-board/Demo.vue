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
    .filter((k) => k.startsWith('design-library:44:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const workshops = [
  { name: 'Build a better stool.', type: 'Wood', date: 'SAT 07 NOV', places: 6 },
  { name: 'Print something loud.', type: 'Print', date: 'SUN 08 NOV', places: 4 },
  { name: 'Fix the thing.', type: 'Repair', date: 'SAT 14 NOV', places: 0 },
  { name: 'Make a useful pot.', type: 'Clay', date: 'SUN 15 NOV', places: 8 },
];
const booked = ref(false);
</script>
<template>
  <div class="specimen" :class="{ entry: state === 'start' }">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>OPEN<br />BENCH↗</strong>
      <nav>
        <a :href="href('start') + '#board'">The workshop board</a
        ><a :href="href('start') + '#space'">About the space</a><span>MAKE / SHARE / REPEAT</span>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><h1 class="sr">Open Bench workshop noticeboard</h1>
        <section id="board" class="board">
          <div class="board-head">
            <h2>NOVEMBER<br />ON THE BENCH.</h2>
            <p>Tools, materials &amp; good company.<br />Beginners welcome.</p>
            <div class="row">
              <button
                v-for="type in ['All', 'Wood', 'Print', 'Repair', 'Clay']"
                :key="type"
                :aria-pressed="tab === type"
                @click="tab = type"
              >
                {{ type }}
              </button>
            </div>
          </div>
          <div class="notices">
            <button
              v-for="w in workshops.filter((w) => tab === 'All' || w.type === tab)"
              :key="w.name"
              :class="'notice-card n' + workshops.indexOf(w)"
              @click="
                selected = workshops.indexOf(w);
                booked = false;
                go(w.places ? 'workshop' : 'full');
              "
            >
              <div class="row">
                <span>{{ w.type.toUpperCase() }}</span
                ><span class="grow"></span><span>{{ w.date }}</span>
              </div>
              <span class="date-stamp"
                ><b>{{ w.date.split(' ')[1] }}</b
                >NOV</span
              >
              <h3>{{ w.name }}</h3>
              <div class="row">
                <p>{{ w.places ? w.places + ' sample places' : 'FULL / SEE ALTERNATIVES' }}</p>
                <b>↗</b>
              </div>
            </button>
          </div>
        </section>
        <section id="space" class="how">
          <h2>NO SECRET<br />HANDSHAKE.</h2>
          <div>
            <p>
              Choose a session. Turn up curious. We’ll provide the fictional tools, materials, and
              patient explanations.
            </p>
            <p>
              Northbank Foundry, Bay 04<br />Step-free entry / Shared tools / No experience required
            </p>
          </div>
        </section></template
      >
      <section v-else class="sheet">
        <span class="label"
          >{{ workshops[selected].type.toUpperCase() }} / {{ workshops[selected].date }}</span
        >
        <h1>{{ workshops[selected].name }}</h1>
        <div class="sheet-body">
          <article>
            <h2>LEARN SOMETHING<br />YOU CAN KEEP USING.</h2>
            <p>
              A practical two-hour session with a small group. Begin with the basics, make one
              complete object or repair, and leave knowing what to try next.
            </p>
            <h3>WHAT’S INCLUDED</h3>
            <ul>
              <li>Tools and materials for the sample activity</li>
              <li>A clear introduction and time to practise</li>
              <li>Help from a fictional workshop host</li>
            </ul>
            <p>All sessions, prices, and availability are fictional.</p>
          </article>
          <aside>
            <h2>{{ state === 'full' ? 'THIS ONE’S FULL.' : 'A PLACE AT THE BENCH.' }}</h2>
            <template v-if="state === 'full'"
              ><p>No spaces left on this sample date. Try the next session.</p>
              <button
                @click="
                  go('workshop');
                  message = 'Alternative date: 21 November, 10:00.';
                "
              >
                Try 21 November →
              </button></template
            ><template v-else
              ><p>{{ message || '10:00–12:00 / Main workshop' }}<br />£25 sample price</p>
              <button @click="booked = true">BOOK A SAMPLE PLACE →</button>
              <p v-if="booked" role="status">
                Sample place selected. No booking or payment was made.
              </p></template
            >
          </aside>
        </div>
        <button @click="go('start')">← BACK TO THE BOARD</button>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Open Bench · Fictional sample content · Design reference 44</span
      ><button @click="reset">Reset demo</button>
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/space-grotesk.woff2') format('woff2');
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
  color: #222921;
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
  justify-content: space-between;
  align-items: center;
  padding: 25px 5%;
  border-bottom: 3px solid;
  gap: 30px;
}
header strong {
  font: 30px/0.95 'Space Grotesk';
  font-weight: 700;
  letter-spacing: -0.05em;
}
nav {
  display: flex;
  gap: 30px;
  align-items: center;
  font-size: 11px;
}
nav button {
  font-size: 11px;
  background: none;
  border: 0;
}
nav > span {
  font-size: 9px;
  font-weight: 600;
}
main {
  max-width: 1450px;
  margin: auto;
  padding: 45px 5% 80px;
}
.announcement {
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  gap: 70px;
  align-items: center;
  padding-bottom: 50px;
}
.label {
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  border: 2px solid;
  padding: 8px 12px;
  background: #fffde9;
}
.announcement h1 {
  font-size: 75px;
  line-height: 1.04;
  font-weight: 700;
  letter-spacing: -0.05em;
  margin: 30px 0;
}
.announcement p {
  font-size: 15px;
}
.announcement .notice {
  background: #c4d7ee;
  border: 3px solid;
  box-shadow: 8px 8px #222921;
  padding: 35px;
  transform: rotate(3deg);
}
.announcement .notice > span {
  font: 39px/1.1 'Space Grotesk';
  font-weight: 700;
  letter-spacing: -0.04em;
}
.announcement .notice b {
  display: block;
  margin-top: 30px;
  font-size: 11px;
}
.board {
  border-top: 3px solid;
  padding-top: 35px;
}
.board-head {
  display: flex;
  justify-content: space-between;
  gap: 25px;
  align-items: center;
  margin-bottom: 30px;
}
.board h2 {
  font-size: 27px;
  font-weight: 700;
  margin: 0;
}
.board-head button {
  padding: 10px 15px;
  background: #fffde9;
  border: 2px solid;
  font-size: 11px;
  box-shadow: 3px 3px #222921;
}
.board-head button[aria-pressed='true'] {
  background: #c5e14e;
  box-shadow: 1px 1px #222921;
}
.notices {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}
.notice-card {
  text-align: left;
  padding: 30px;
  border: 3px solid;
  background: #f7d4bf;
  box-shadow: 6px 6px #222921;
}
.notice-card.n1 {
  background: #c6d9ec;
}
.notice-card.n2 {
  background: #e1d0eb;
}
.notice-card.n3 {
  background: #cbe4ae;
}
.notice-card .row > span {
  font-size: 10px;
}
.notice-card h3 {
  font-size: 43px;
  line-height: 1.15;
  margin: 35px 0;
}
.notice-card .row > p {
  font-size: 11px;
  margin: 0;
  flex: 1;
}
.notice-card .row > b {
  font-size: 30px;
}
.how {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  padding: 65px 0 0;
  margin-top: 50px;
  border-top: 3px solid;
}
.how h2 {
  font-size: 45px;
  font-weight: 700;
  line-height: 1.1;
}
.how p {
  font-size: 15px;
  line-height: 1.9;
}
.sheet {
  padding: 15px 0 90px;
}
.sheet h1 {
  font-size: 77px;
  font-weight: 700;
}
.sheet-body {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 70px;
  margin-bottom: 40px;
}
.sheet h2 {
  font-size: 32px;
  line-height: 1.2;
  font-weight: 700;
}
.sheet p,
.sheet li {
  font-size: 14px;
  line-height: 1.9;
}
.sheet aside {
  background: #c5e14e;
  border: 3px solid;
  box-shadow: 6px 6px #222921;
  padding: 30px;
  align-self: start;
}
.sheet button {
  border: 2px solid;
  background: #fffde9;
  font-size: 11px;
  padding: 14px;
  box-shadow: 3px 3px #222921;
}
@media (max-width: 800px) {
  .announcement {
    gap: 35px;
  }
  .announcement h1 {
    font-size: 62px;
  }
  .announcement .notice {
    padding: 25px;
  }
  .announcement .notice > span {
    font-size: 29px;
  }
  .board-head {
    display: block;
  }
  .board-head > .row {
    margin-top: 25px;
  }
  nav > span {
    display: none;
  }
}
@media (max-width: 600px) {
  header {
    padding: 22px;
  }
  header strong {
    font-size: 24px;
  }
  nav {
    display: block;
    font-size: 10px;
  }
  nav button {
    display: block;
    padding: 10px 0 0;
    font-size: 10px;
  }
  .announcement {
    display: block;
  }
  .announcement h1 {
    font-size: 48px;
  }
  .announcement p {
    font-size: 13px;
  }
  .announcement .notice {
    transform: none;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .announcement .notice > span {
    font-size: 25px;
  }
  .announcement .notice b {
    margin: 0;
  }
  .notices {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  .notice-card {
    padding: 25px;
  }
  .notice-card h3 {
    font-size: 37px;
  }
  .board h2 {
    font-size: 23px;
  }
  .board-head button {
    padding: 9px 12px;
    font-size: 10px;
  }
  .how,
  .sheet-body {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .how h2 {
    font-size: 36px;
  }
  .sheet h1 {
    font-size: 52px;
  }
  .sheet h2 {
    font-size: 28px;
  }
}
header nav a {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
}

/* The entry is the experience itself; supporting routes retain its vocabulary. */

.entry {
  background: #ecec79;
  position: relative;
}
.entry header {
  max-width: none;
  width: 100%;
  margin: 0;
  padding: 20px 3%;
  border-bottom: 6px solid #222921;
  align-items: center;
}
.entry header strong {
  font-size: 25px;
  line-height: 0.85;
}
.entry header nav {
  font-size: 12px;
  gap: 30px;
}
.entry header nav > span {
  font-size: 10px;
}
.entry main {
  max-width: none;
  width: 100%;
  padding: 0;
  margin: 0;
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
.entry .board {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 0;
  border: 0;
  padding: 0;
  margin: 0;
}
.entry .board-head {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 35px 25px;
  border-right: 6px solid #222921;
  gap: 20px;
}
.entry .board-head h2 {
  font-size: 31px;
  line-height: 1;
  letter-spacing: -0.05em;
}
.entry .board-head p {
  font-size: 12px;
}
.entry .board-head .row {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  gap: 10px;
}
.entry .board-head button {
  padding: 12px 18px;
  font-size: 13px;
  border: 3px solid #222921;
  box-shadow: 5px 5px 0 #222921;
  text-align: left;
}
.entry .board-head button[aria-pressed='true'] {
  background: #222921;
  color: #ecec79;
  box-shadow: 5px 5px 0 #969d38;
}
.entry .notices {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.entry .notice-card {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  grid-template-rows: auto 1fr auto;
  column-gap: 30px;
  position: relative;
  padding: 25px 35px;
  border: 0;
  border-bottom: 6px solid #222921;
  box-shadow: none;
  transform: none;
  min-height: 235px;
}
.entry .notice-card > .row:first-child {
  grid-column: 2;
  grid-row: 1;
  font-size: 10px;
}
.entry .notice-card > .row:first-child > span:last-child {
  display: none;
}
.entry .date-stamp {
  grid-column: 1;
  grid-row: 1/4;
  align-self: center;
  font-weight: 700;
  text-align: center;
  font-size: 19px;
  line-height: 1;
  letter-spacing: 0.15em;
}
.entry .date-stamp b {
  display: block;
  font-size: 100px;
  line-height: 0.9;
  letter-spacing: -0.08em;
  margin-bottom: 8px;
}
.entry .notice-card h3 {
  grid-column: 2;
  grid-row: 2;
  font-size: clamp(30px, 4vw, 60px);
  line-height: 1;
  margin: 16px 0;
}
.entry .notice-card > .row:last-child {
  grid-column: 2;
  grid-row: 3;
  font-size: 12px;
}
.entry .notice-card .row p {
  font-size: 12px;
  margin: 0;
}
.entry .n0 {
  background: #ead5bc;
}
.entry .n1 {
  background: #8dbac9;
}
.entry .n2 {
  background: #c7b4de;
}
.entry .n3 {
  background: #bdd594;
}
.entry .how {
  padding: 60px 7%;
  border: 0;
}
@media (max-width: 750px) {
  .entry header {
    padding: 20px 5%;
    border-width: 4px;
    gap: 15px;
  }
  .entry header strong {
    font-size: 22px;
  }
  .entry header nav {
    font-size: 10px;
    gap: 12px;
  }
  .entry header nav > span {
    display: none;
  }
  .entry .board {
    display: block;
  }
  .entry .board-head {
    border-right: 0;
    border-bottom: 4px solid;
    padding: 25px 6%;
    gap: 12px;
  }
  .entry .board-head h2 {
    font-size: 25px;
    margin: 0;
  }
  .entry .board-head h2 br {
    display: none;
  }
  .entry .board-head p {
    font-size: 11px;
    margin: 0;
  }
  .entry .board-head .row {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
  }
  .entry .board-head button {
    font-size: 10px;
    padding: 10px 12px;
    border-width: 2px;
    box-shadow: 3px 3px 0;
  }
  .entry .notice-card {
    grid-template-columns: 65px minmax(0, 1fr);
    gap: 0 18px;
    padding: 22px 6%;
    min-height: 210px;
    border-width: 4px;
  }
  .entry .date-stamp {
    font-size: 12px;
  }
  .entry .date-stamp b {
    font-size: 58px;
  }
  .entry .notice-card h3 {
    font-size: 31px;
  }
  .entry .notice-card > .row:first-child {
    font-size: 9px;
  }
  .entry .notice-card .row p {
    font-size: 10px;
  }
}

.entry .date-stamp b {
  white-space: nowrap;
}
@media (max-width: 750px) {
  .entry .date-stamp b {
    font-size: 48px;
  }
}
</style>
