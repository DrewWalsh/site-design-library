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
    .filter((k) => k.startsWith('design-library:03:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const saved = useStored<string[]>('03:saved', []);
const talks = [
  {
    time: '09:30',
    title: 'The shape of public life',
    name: 'Maya Torres',
    day: 'Friday',
    room: 'Main hall',
  },
  {
    time: '11:00',
    title: 'Designing for the everyday',
    name: 'Eli Park',
    day: 'Friday',
    room: 'Studio 02',
  },
  {
    time: '14:00',
    title: 'Systems worth keeping',
    name: 'Ada Finch',
    day: 'Saturday',
    room: 'Main hall',
  },
  {
    time: '16:00',
    title: 'A more useful future',
    name: 'Noah Grey',
    day: 'Saturday',
    room: 'Studio 02',
  },
];
const list = computed(() =>
  talks.filter(
    (t) =>
      (tab.value === 'All' || t.day === tab.value) &&
      (state.value !== 'saved' || saved.value.includes(t.title)),
  ),
);
function save() {
  const t = talks[selected.value].title;
  saved.value = saved.value.includes(t) ? saved.value.filter((x) => x !== t) : [...saved.value, t];
}
</script>
<template>
  <div class="specimen" :class="{ entry: state === 'start' }">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>FORM®</strong><span>CONFERENCE<br />NORTHBANK, 2026</span>
      <nav>
        <a href="#programme">01 Programme</a
        ><button @click="go('saved')">02 My sessions ({{ saved.length }})</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start' || state === 'saved'"
        ><section class="title">
          <div>
            <p>DESIGN / CULTURE / WHAT COMES NEXT</p>
            <h1>{{ state === 'saved' ? 'Your programme.' : 'FORM / 26' }}</h1>
          </div>
          <aside>
            <strong>06—07<br />NOV</strong>
            <p>Two days.<br />Four conversations.<br />One shared question.</p>
          </aside>
        </section>
        <div class="statement">
          <span>01 / THE PROGRAMME</span>
          <p>
            How do we make things that deserve to exist? A meeting of people working at the edges of
            design and everyday life.
          </p>
        </div>
        <section id="programme">
          <div class="row days">
            <button
              v-for="day in ['All', 'Friday', 'Saturday']"
              :key="day"
              :aria-pressed="tab === day"
              @click="tab = day"
            >
              {{ day }}</button
            ><button v-if="state === 'saved'" @click="go('start')">All sessions →</button>
          </div>
          <button
            class="session"
            v-for="talk in list"
            :key="talk.title"
            @click="
              selected = talks.indexOf(talk);
              go('speaker');
            "
          >
            <span>{{ talk.day }}<br />{{ talk.time }}</span>
            <h2>{{ talk.title }}</h2>
            <div>
              {{ talk.name }}<br /><small>{{ talk.room }}</small>
            </div>
            <b>↗</b>
          </button>
          <p v-if="!list.length" class="empty">
            No saved sessions yet. Open a session in the full programme to save it.
          </p>
        </section>
        <section class="visit">
          <span>02 / BE THERE</span>
          <h2>A place for<br />different perspectives.</h2>
          <p>
            Northbank Assembly Hall<br />18 Foundry Street<br />Step-free access via the east
            entrance.
          </p>
        </section></template
      >
      <section v-else class="speaker">
        <button @click="go('start')">← Programme</button>
        <p class="eyebrow">
          {{ talks[selected].day }} / {{ talks[selected].time }} / {{ talks[selected].room }}
        </p>
        <h1>{{ talks[selected].title }}</h1>
        <div class="speaker-info">
          <h2>{{ talks[selected].name }}</h2>
          <div>
            <p>
              A conversation about making public work useful, legible, and open to change. This
              fictional session brings practical examples into a wider discussion about design’s
              responsibilities.
            </p>
            <p>
              45 minute talk + 15 minute discussion. Captions and step-free access available in this
              sample programme.
            </p>
            <button class="primary" @click="save">
              {{
                saved.includes(talks[selected].title)
                  ? 'Remove from my programme'
                  : 'Save this session'
              }}
              →
            </button>
            <p role="status">{{ saved.length }} saved sessions in this browser.</p>
          </div>
        </div>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Form Conference · Fictional sample content · Design reference 03</span
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
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  padding: 25px 5%;
  border-bottom: 2px solid;
  align-items: center;
  gap: 25px;
}
header strong {
  font-size: 40px;
  letter-spacing: -0.06em;
}
header span {
  font-size: 11px;
  line-height: 1.3;
}
nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 35px;
  font-size: 12px;
}
nav button {
  border: none;
  background: none;
  padding: 0;
}
main {
  padding: 0 5%;
  max-width: 1500px;
  margin: auto;
}
.title {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 70px;
  padding: 40px 0 60px;
}
.title p {
  font-size: 12px;
}
.title h1 {
  font-size: clamp(65px, 8.8vw, 132px);
  max-width: 950px;
  margin: 28px 0 0;
  font-weight: 500;
  line-height: 1.01;
}
.title aside {
  border-top: 8px solid var(--accent);
  margin-top: 62px;
  padding-top: 20px;
}
.title aside strong {
  font-size: 50px;
  line-height: 1.1;
  color: #c7331e;
}
.title aside p {
  font-size: 16px;
  margin-top: 35px;
}
.statement {
  display: grid;
  grid-template-columns: 1fr 2fr;
  border-top: 2px solid;
  padding: 30px 0 45px;
  gap: 60px;
}
.statement span,
.visit > span {
  font-size: 11px;
}
.statement p {
  font-size: 23px;
  line-height: 1.5;
  max-width: 650px;
}
.days {
  padding-bottom: 20px;
}
.days button {
  border: 0;
  background: none;
  border-bottom: 2px solid transparent;
  border-radius: 0;
  padding: 10px 0;
  margin-right: 20px;
  font-size: 13px;
}
.session {
  display: grid;
  grid-template-columns: 1fr 2.5fr 1fr 30px;
  width: 100%;
  gap: 30px;
  padding: 25px 0;
  border: 0;
  border-top: 1px solid;
  background: none;
  text-align: left;
  align-items: center;
}
.session > span {
  font-size: 12px;
  line-height: 1.5;
}
.session h2 {
  font-size: 32px;
  margin: 0;
  font-weight: 500;
}
.session > div {
  font-size: 13px;
  line-height: 1.6;
}
.session small {
  font-size: 10px;
}
.session b {
  color: var(--accent);
  font-size: 28px;
}
.visit {
  border-top: 2px solid;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 30px;
  padding: 60px 0;
  margin-top: 50px;
}
.visit h2 {
  font-size: 40px;
}
.visit p {
  font-size: 13px;
}
.speaker {
  padding: 50px 0 100px;
}
.speaker > p {
  margin-top: 35px;
}
.speaker h1 {
  font-size: 80px;
  max-width: 1000px;
}
.speaker-info {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 70px;
  border-top: 2px solid;
  padding-top: 35px;
}
@media (max-width: 600px) {
  header {
    grid-template-columns: 1fr 1fr;
    padding: 20px;
  }
  nav {
    grid-column: 1/-1;
    justify-content: flex-start;
  }
  .title {
    grid-template-columns: 1fr;
    gap: 25px;
    padding: 30px 0;
  }
  .title h1 {
    font-size: clamp(37px, 13vw, 55px);
  }
  .title aside {
    margin: 0;
    padding-top: 15px;
    display: flex;
    justify-content: space-between;
    gap: 30px;
  }
  .title aside strong {
    font-size: 35px;
  }
  .title aside p {
    margin: 0;
    font-size: 12px;
  }
  .statement {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  .statement p {
    font-size: 19px;
  }
  .session {
    grid-template-columns: 65px 1fr 20px;
    gap: 15px;
  }
  .session h2 {
    font-size: 23px;
  }
  .session > div {
    grid-column: 2;
    font-size: 11px;
  }
  .session > b {
    grid-column: 3;
    grid-row: 1;
  }
  .visit,
  .speaker-info {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .speaker h1 {
    font-size: 48px;
  }
}

/* The entry is the experience itself; supporting routes retain its vocabulary. */

.entry header {
  padding: 22px 4%;
  max-width: none;
  width: 100%;
  margin: 0;
  border: 0;
}
.entry header strong {
  font-size: 21px;
}
.entry header > span {
  font-size: 10px;
}
.entry header nav {
  font-size: 11px;
}
.entry main {
  max-width: none;
  width: 100%;
  margin: 0;
  padding: 0 4% 70px;
  display: grid;
  grid-template-columns: 46% minmax(0, 1fr);
  column-gap: 5%;
}
.entry .title {
  grid-column: 1;
  grid-row: 1;
  background: #c6321e;
  color: #fff6e4;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 0;
  min-height: 780px;
  margin: 0;
}
.entry .title h1 {
  font-size: clamp(95px, 11.5vw, 180px);
  letter-spacing: -0.085em;
  line-height: 0.83;
  max-width: 3.6em;
  margin: 45px 0;
  overflow-wrap: normal;
}
.entry .title > div > p {
  font-size: 10px;
  letter-spacing: 0.13em;
}
.entry .title aside {
  display: flex;
  gap: 35px;
  align-items: end;
  padding: 0;
  border: 0;
}
.entry .title aside strong {
  font-size: 54px;
  line-height: 0.9;
  color: inherit;
}
.entry .title aside p {
  font-size: 12px;
  margin: 0;
}
.entry #programme {
  grid-column: 2;
  grid-row: 1/3;
  align-self: start;
  padding: 0;
  border-top: 3px solid;
}
.entry .days {
  padding: 20px 0;
  border-bottom: 1px solid;
  gap: 10px;
}
.entry .days button {
  font-size: 12px;
}
.entry .session {
  display: grid;
  grid-template-columns: 75px minmax(0, 1fr) 20px;
  gap: 15px;
  padding: 27px 0;
}
.entry .session h2 {
  font-size: 35px;
  line-height: 1.05;
  margin: 0;
  letter-spacing: -0.055em;
}
.entry .session > span {
  font-size: 11px;
}
.entry .session > div {
  grid-column: 2;
  grid-row: 2;
  font-size: 12px;
}
.entry .session > b {
  grid-column: 3;
  grid-row: 1;
}
.entry .statement {
  grid-column: 1;
  grid-row: 2;
  display: block;
  padding: 30px 0;
  border: 0;
}
.entry .statement span {
  font-size: 10px;
}
.entry .statement p {
  font-size: 15px;
  line-height: 1.8;
  max-width: 48ch;
}
.entry .visit {
  grid-column: 1/3;
  margin-top: 40px;
}
@media (max-width: 750px) {
  .entry header {
    gap: 15px;
    padding: 20px 5%;
  }
  .entry header > span {
    display: none;
  }
  .entry header nav {
    font-size: 9px;
    gap: 15px;
  }
  .entry main {
    display: flex;
    flex-direction: column;
    padding: 0 5% 50px;
  }
  .entry .title {
    order: 1;
    min-height: 550px;
    padding: 28px;
  }
  .entry .title h1 {
    font-size: 105px;
    margin: 35px 0;
    max-width: 3em;
  }
  .entry .title aside {
    gap: 20px;
  }
  .entry .title aside strong {
    font-size: 43px;
  }
  .entry .title aside p {
    font-size: 10px;
  }
  .entry #programme {
    order: 2;
    margin-top: 30px;
    width: 100%;
  }
  .entry .session {
    grid-template-columns: 55px minmax(0, 1fr) 15px;
    gap: 12px;
  }
  .entry .session h2 {
    font-size: 28px;
  }
  .entry .session > span {
    font-size: 10px;
  }
  .entry .statement {
    order: 3;
  }
  .entry .visit {
    order: 4;
  }
}
</style>
