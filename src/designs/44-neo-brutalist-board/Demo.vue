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
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>OPEN<br />BENCH↗</strong>
      <nav>
        <a :href="href('start') + '#board'">The workshop board</a
        ><button @click="go('start')">About the space</button><span>MAKE / SHARE / REPEAT</span>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="announcement">
          <div>
            <span class="label">YOUR HANDS HAVE IDEAS.</span>
            <h1>COME IN.<br />MAKE A THING.</h1>
            <p>
              A shared workshop for useful skills, good company,<br />and projects that don’t fit on
              your kitchen table.
            </p>
          </div>
          <div class="notice">
            <span>OPEN<br />TO<br />BEGINNERS.</span><b>YES, YOU. →</b>
          </div>
        </section>
        <section id="board" class="board">
          <div class="board-head">
            <h2>WHAT’S ON THE BENCH?</h2>
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
              <h3>{{ w.name }}</h3>
              <div class="row">
                <p>{{ w.places ? w.places + ' sample places' : 'FULL / SEE ALTERNATIVES' }}</p>
                <b>↗</b>
              </div>
            </button>
          </div>
        </section>
        <section class="how">
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
</style>
