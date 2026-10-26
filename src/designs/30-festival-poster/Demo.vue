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
    .filter((k) => k.startsWith('design-library:30:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const events = [
  {
    name: 'Sound after dark',
    day: 'Friday',
    venue: 'Assembly Hall',
    time: '19:00',
    kind: 'LIVE PERFORMANCE',
  },
  {
    name: 'The moving image',
    day: 'Friday',
    venue: 'Old Cinema',
    time: '19:00',
    kind: 'SCREENING',
  },
  {
    name: 'Words in the room',
    day: 'Saturday',
    venue: 'Assembly Hall',
    time: '16:00',
    kind: 'SPOKEN WORD',
  },
  {
    name: 'Late light / closing set',
    day: 'Saturday',
    venue: 'Old Cinema',
    time: '21:00',
    kind: 'MUSIC',
  },
];
const venue = ref('All'),
  saved = useStored<string[]>('30:saved', []);
const filtered = computed(() =>
  events.filter(
    (e) =>
      (tab.value === 'All' || e.day === tab.value) &&
      (venue.value === 'All' || e.venue === venue.value) &&
      (state.value !== 'itinerary' || saved.value.includes(e.name)),
  ),
);
function save() {
  const e = events[selected.value];
  if (saved.value.includes(e.name)) {
    saved.value = saved.value.filter((x) => x !== e.name);
    return;
  }
  const conflict = events.find(
    (x) => saved.value.includes(x.name) && x.day === e.day && x.time === e.time,
  );
  if (conflict) {
    message.value = 'This overlaps ' + conflict.name + '. Choose which event to keep.';
    return;
  }
  saved.value.push(e.name);
  message.value = 'Saved to your local itinerary.';
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>NS/26</strong>
      <nav>
        <a href="#programme">Programme</a
        ><button @click="go('itinerary')">My weekend ({{ saved.length }})</button
        ><span>NORTHBANK / 06–07 NOV</span>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start' || state === 'itinerary'"
        ><section class="poster" v-if="state === 'start'">
          <div>
            <p>ART / SOUND / WORDS / AFTER HOURS</p>
            <h1>NIGHT<br /><span>SIGNAL</span></h1>
          </div>
          <aside>
            <strong>06<br />—07</strong><span>NOVEMBER<br />2026</span>
            <p>Two nights.<br />Make some room.</p>
            <a href="#programme">FIND YOUR SIGNAL ↓</a>
          </aside>
          <span class="poster-stamp">COME<br />TOGETHER.</span>
        </section>
        <section class="programme" id="programme">
          <div class="row">
            <h1 v-if="state === 'itinerary'">YOUR WEEKEND.</h1>
            <h2 v-else>THE PROGRAMME.</h2>
            <span class="grow"></span>
            <div class="row">
              <label
                >Day<select v-model="tab">
                  <option>All</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                </select></label
              ><label
                >Venue<select v-model="venue">
                  <option>All</option>
                  <option>Assembly Hall</option>
                  <option>Old Cinema</option>
                </select></label
              >
            </div>
          </div>
          <button
            v-for="e in filtered"
            :key="e.name"
            class="event-row"
            @click="
              selected = events.indexOf(e);
              go('event');
            "
          >
            <span
              >{{ e.day }}<b>{{ e.time }}</b></span
            >
            <div>
              <small>{{ e.kind }}</small>
              <h3>{{ e.name }}</h3>
            </div>
            <span>{{ e.venue }}</span
            ><strong>↗</strong>
          </button>
          <div v-if="!filtered.length" class="empty">
            <h2>NOTHING HERE YET.</h2>
            <p>Open the full programme and save an event.</p>
            <button
              @click="
                tab = 'All';
                venue = 'All';
                go('start');
              "
            >
              Full programme →
            </button>
          </div>
        </section>
        <section class="venues">
          <div>
            <p class="eyebrow">TWO PLACES. ONE WEEKEND.</p>
            <h2>SEE YOU<br />AFTER DARK.</h2>
          </div>
          <article>
            <h3>Assembly Hall</h3>
            <p>18 Foundry Street<br />Step-free entry. Quiet room available.</p>
            <h3>Old Cinema</h3>
            <p>4 Market Lane<br />Street-level auditorium. Captioned screening.</p>
          </article>
        </section></template
      >
      <section v-else class="event-detail">
        <p class="eyebrow">{{ events[selected].kind }} / NIGHT SIGNAL 2026</p>
        <h1>{{ events[selected].name }}</h1>
        <div class="event-info">
          <div>
            <h2>{{ events[selected].day }} / {{ events[selected].time }}</h2>
            <p>{{ events[selected].venue }} · 60 minutes</p>
            <p>
              A fictional gathering of artists and curious people. The sample programme combines a
              clear timetable with the energy of a public poster.
            </p>
            <button class="primary" @click="save">
              {{
                saved.includes(events[selected].name)
                  ? 'Remove from itinerary'
                  : 'Save to my weekend'
              }}
              →
            </button>
            <p v-if="message" role="status" class="notice">{{ message }}</p>
          </div>
          <aside>
            <p class="eyebrow">SAMPLE TICKET</p>
            <h2>ADMIT<br />ONE.</h2>
            <p>£12 / illustrative price<br />No ticket is issued or payment taken.</p>
            <button @click="message = 'This is a sample ticket panel. No purchase has been made.'">
              Inspect sample ticket
            </button>
          </aside>
        </div>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Night Signal · Fictional sample content · Design reference 30</span
      ><button @click="reset">Reset demo</button>
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Bebas Neue';
  src: url('/fonts/bebas-neue.woff2') format('woff2');
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
  color: #161e46;
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
  padding: 22px 4%;
  border-bottom: 2px solid;
  gap: 20px;
}
header strong {
  font: 31px 'Bebas Neue';
}
nav {
  display: flex;
  gap: 35px;
  align-items: center;
  font-size: 11px;
}
nav button {
  background: none;
  border: 0;
  font-size: 11px;
}
.poster {
  background: #233aa1;
  color: #f3efdf;
  position: relative;
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 35px 6% 45px;
  gap: 55px;
  overflow: hidden;
}
.poster > div > p {
  font-size: 11px;
  letter-spacing: 0.14em;
}
.poster h1 {
  font: clamp(120px, 17vw, 245px)/0.85 'Bebas Neue';
  letter-spacing: -0.025em;
  margin: 35px 0 5px;
}
.poster h1 span {
  color: #ff7866;
}
.poster aside {
  border-left: 1px solid #b3b9e7;
  padding-left: 35px;
  margin-top: 65px;
}
.poster aside strong {
  font: 95px/0.85 'Bebas Neue';
  display: block;
}
.poster aside > span {
  font-size: 14px;
  display: block;
  line-height: 1.4;
  margin-top: 20px;
}
.poster aside p {
  font-size: 14px;
  margin-top: 30px;
}
.poster aside a {
  font-size: 10px;
  display: block;
  margin-top: 35px;
}
.poster-stamp {
  position: absolute;
  right: 29%;
  bottom: 50px;
  transform: rotate(-8deg);
  background: #ee5c49;
  color: #111e50;
  font: 31px/1 'Bebas Neue';
  padding: 18px 25px;
  border: 2px solid #111e50;
}
.programme {
  padding: 50px 5%;
  max-width: 1500px;
  margin: auto;
}
.programme > .row {
  margin-bottom: 30px;
}
.programme h2 {
  font: 43px 'Bebas Neue';
  letter-spacing: 0.01em;
  margin: 0;
}
.programme label {
  font-size: 9px;
  min-width: 120px;
}
.programme select {
  font-size: 11px;
  background: none;
}
.event-row {
  display: grid;
  grid-template-columns: 110px 1fr 160px 30px;
  gap: 30px;
  text-align: left;
  align-items: center;
  width: 100%;
  background: none;
  border: 0;
  border-top: 2px solid #283b7c;
  padding: 28px 0;
}
.event-row > span {
  font-size: 12px;
}
.event-row b {
  display: block;
  font-size: 20px;
  margin-top: 8px;
}
.event-row small {
  font-size: 9px;
  letter-spacing: 0.09em;
}
.event-row h3 {
  font: 34px 'Bebas Neue';
  margin: 10px 0 0;
  letter-spacing: 0.01em;
}
.event-row > strong {
  font-size: 32px;
}
.venues {
  background: #ee5c49;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 70px;
  padding: 60px 8%;
}
.venues h2 {
  font: 75px/1 'Bebas Neue';
  margin: 20px 0;
}
.venues h3 {
  font: 27px 'Bebas Neue';
  margin-bottom: 10px;
}
.venues p {
  font-size: 13px;
  line-height: 1.8;
}
.event-detail {
  padding: 60px 7% 100px;
  max-width: 1300px;
  margin: auto;
}
.event-detail h1 {
  font: 100px/1 'Bebas Neue';
  letter-spacing: 0;
}
.event-info {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 70px;
}
.event-info h2 {
  font: 40px 'Bebas Neue';
}
.event-info p {
  font-size: 15px;
}
.event-info aside {
  background: #f6e8b5;
  padding: 35px;
  border: 2px solid #111e50;
}
.event-info aside h2 {
  font: 65px/1 'Bebas Neue';
}
.event-info button {
  font-size: 12px;
}
.event-info .notice {
  font-size: 12px;
}
@media (max-width: 600px) {
  header {
    padding: 20px;
  }
  nav {
    gap: 20px;
    font-size: 10px;
  }
  nav > span {
    display: none;
  }
  .poster {
    padding: 30px 5%;
    gap: 20px;
    grid-template-columns: 1fr 85px;
  }
  .poster h1 {
    font-size: 110px;
  }
  .poster > div > p {
    font-size: 8px;
    max-width: 170px;
  }
  .poster aside {
    padding-left: 15px;
    margin-top: 45px;
  }
  .poster aside strong {
    font-size: 49px;
  }
  .poster aside > span {
    font-size: 10px;
  }
  .poster aside p {
    font-size: 10px;
    margin-top: 22px;
  }
  .poster aside a {
    font-size: 8px;
  }
  .poster-stamp {
    right: 27%;
    bottom: 35px;
    font-size: 20px;
    padding: 10px;
  }
  .programme {
    padding: 35px 5%;
  }
  .programme h2 {
    font-size: 36px;
  }
  .programme > .row {
    display: block;
  }
  .programme > .row > .row {
    margin-top: 20px;
  }
  .event-row {
    grid-template-columns: 65px 1fr 20px;
    gap: 12px;
  }
  .event-row h3 {
    font-size: 28px;
  }
  .event-row > span:nth-child(3) {
    grid-column: 2;
    font-size: 10px;
  }
  .event-row > strong {
    grid-column: 3;
    grid-row: 1;
    font-size: 24px;
  }
  .venues {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 40px 7%;
  }
  .venues h2 {
    font-size: 57px;
  }
  .event-detail h1 {
    font-size: 67px;
  }
  .event-info {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>
