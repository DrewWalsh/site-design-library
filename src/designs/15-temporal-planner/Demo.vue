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
    .filter((k) => k.startsWith('design-library:15:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const events = useStored('15:events', [
  { name: 'Open studio', day: 0, hour: 9, duration: 2, category: 'Making' },
  { name: 'Printmaking basics', day: 1, hour: 11, duration: 2, category: 'Workshop' },
  { name: 'Ceramics lab', day: 2, hour: 10, duration: 3, category: 'Making' },
  { name: 'Portfolio circle', day: 3, hour: 14, duration: 2, category: 'Community' },
  { name: 'Repair afternoon', day: 4, hour: 13, duration: 3, category: 'Community' },
]);
const days = ['Mon 2', 'Tue 3', 'Wed 4', 'Thu 5', 'Fri 6'];
const day = ref(0),
  hour = ref(9);
function edit(i: number) {
  selected.value = i;
  day.value = events.value[i].day;
  hour.value = events.value[i].hour;
  message.value = '';
  go('edit');
}
function move() {
  const e = events.value[selected.value];
  if (
    events.value.some(
      (x, i) =>
        i !== selected.value &&
        x.day === day.value &&
        hour.value < x.hour + x.duration &&
        hour.value + e.duration > x.hour,
    )
  ) {
    message.value = 'That time overlaps another session. Choose a different day or start time.';
    return;
  }
  e.day = day.value;
  e.hour = hour.value;
  message.value = 'Session moved locally.';
  go('agenda');
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>▥ weekcraft</strong><span>Northbank studio</span><span class="grow"></span
      ><button @click="go('start')">Week view</button><button @click="go('agenda')">Agenda</button>
    </header>
    <main id="content">
      <div class="heading">
        <div>
          <p class="eyebrow">A LITTLE STRUCTURE FOR THE WEEK</p>
          <h1>2–6 November, 2026</h1>
          <p>Making, learning, and the time in between.</p>
        </div>
        <span class="sample">SAMPLE WEEK</span>
      </div>
      <template v-if="state === 'start'"
        ><div class="planner">
          <aside>
            <h2>This week</h2>
            <p>5 sessions<br />12 hours together</p>
            <div v-for="(e, i) in events" :key="e.name">
              <small>{{ days[e.day] }} / {{ e.hour }}:00</small
              ><button @click="edit(i)">{{ e.name }}</button>
            </div>
          </aside>
          <section class="calendar" aria-label="Week calendar">
            <div class="days">
              <span></span><b v-for="d in days">{{ d }}</b>
            </div>
            <div class="hours">
              <div v-for="h in 9" :key="h" class="hour">
                <span>{{ h + 8 }}:00</span><i v-for="d in 5" :key="d"></i>
              </div>
              <button
                v-for="(e, i) in events"
                :key="e.name"
                :class="['event', 'cat-' + e.category]"
                :style="{
                  left: 'calc(48px + (100% - 48px) * ' + e.day + '/5 + 4px)',
                  width: 'calc((100% - 48px)/5 - 8px)',
                  top: (e.hour - 9) * 64 + 3 + 'px',
                  height: e.duration * 64 - 7 + 'px',
                }"
                @click="edit(i)"
              >
                <small>{{ e.hour }}:00 – {{ e.hour + e.duration }}:00</small
                ><strong>{{ e.name }}</strong
                ><span>{{ e.category }}</span>
              </button>
            </div>
          </section>
        </div>
        <section class="mobile-agenda">
          <h2>The week at a glance</h2>
          <button v-for="(e, i) in events" :key="e.name" @click="edit(i)">
            {{ days[e.day] }} · {{ e.hour }}:00<br /><strong>{{ e.name }}</strong> →
          </button>
        </section>
        <section class="legend">
          <span>■ Making</span><span>■ Workshop</span><span>■ Community</span>
          <p>
            Select a session to move it using the date-and-time form. All times are local sample
            times.
          </p>
        </section></template
      >
      <section v-else-if="state === 'edit'" class="edit">
        <button @click="go('start')">← Back to the week</button>
        <h2>{{ events[selected].name }}</h2>
        <p>{{ events[selected].duration }} hours · {{ events[selected].category }}</p>
        <form @submit.prevent="move">
          <label
            >Day<select v-model.number="day">
              <option v-for="(d, i) in days" :key="d" :value="i">{{ d }} November</option>
            </select></label
          ><label
            >Start hour<input
              type="number"
              v-model.number="hour"
              min="9"
              :max="18 - events[selected].duration"
              required
          /></label>
          <p v-if="message" role="alert" class="notice">{{ message }}</p>
          <button class="primary">Move session</button>
        </form>
        <p>Conflicting times are rejected. No external calendar is changed.</p>
      </section>
      <section v-else class="agenda">
        <p v-if="message" role="status">{{ message }}</p>
        <article v-for="(e, i) in events" :key="e.name">
          <div>
            <small>{{ days[e.day] }} NOVEMBER</small>
            <h2>{{ e.hour }}:00</h2>
          </div>
          <div>
            <p class="eyebrow">{{ e.category }}</p>
            <h2>{{ e.name }}</h2>
            <p>{{ e.duration }} hours · Main studio</p>
          </div>
          <button @click="edit(i)">Move session →</button>
        </article>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Weekcraft · Fictional sample content · Design reference 15</span
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
  padding: 22px 4%;
  display: flex;
  gap: 30px;
  align-items: center;
  background: white;
  border-bottom: 1px solid var(--line);
  font-size: 12px;
}
header strong {
  font-size: 23px;
}
header button {
  font-size: 11px;
  background: none;
  border: 0;
  padding: 0;
}
main {
  padding: 40px 4% 80px;
  max-width: 1500px;
  margin: auto;
}
.heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.heading h1 {
  font-size: 36px;
  margin: 10px 0;
}
.heading p {
  font-size: 13px;
  color: #53667c;
}
.sample {
  font-size: 9px;
  padding: 7px 10px;
  border: 1px solid #cbd6df;
  border-radius: 4px;
}
.planner {
  display: grid;
  grid-template-columns: 210px 1fr;
  gap: 35px;
  margin-top: 30px;
}
aside {
  padding-top: 10px;
}
aside h2 {
  font-size: 21px;
}
aside p {
  font-size: 13px;
  color: #566879;
}
aside > div {
  padding: 18px 0;
  border-top: 1px solid var(--line);
}
aside small {
  font-size: 9px;
}
aside button {
  font-size: 12px;
  background: none;
  border: 0;
  padding: 7px 0;
  text-align: left;
  display: block;
}
.calendar {
  border: 1px solid #dce2e8;
  background: #fff;
  overflow: hidden;
  border-radius: 8px;
}
.days {
  display: grid;
  grid-template-columns: 48px repeat(5, 1fr);
  font-size: 11px;
  text-align: center;
  border-bottom: 1px solid #dce2e8;
  padding: 18px 0;
}
.hours {
  position: relative;
}
.hour {
  display: grid;
  grid-template-columns: 48px repeat(5, 1fr);
  height: 64px;
}
.hour span {
  font-size: 9px;
  color: #5a6b7e;
  text-align: center;
  padding-top: 8px;
}
.hour i {
  border-left: 1px solid #e5eaf0;
  border-bottom: 1px solid #e5eaf0;
}
.event {
  position: absolute;
  text-align: left;
  padding: 12px;
  border: 1px solid #c3d2ce;
  background: #e3eee7;
  font-size: 11px;
  overflow: hidden;
}
.event small {
  font-size: 9px;
  display: block;
}
.event strong {
  font-size: 13px;
  display: block;
  margin-top: 12px;
  line-height: 1.5;
}
.event > span {
  font-size: 9px;
  display: block;
  margin-top: 10px;
}
.cat-Workshop {
  background: #e3e9f5;
  border-color: #bccbe3;
}
.cat-Community {
  background: #f2e8d6;
  border-color: #daceb3;
}
.legend {
  font-size: 10px;
  display: flex;
  gap: 25px;
  padding: 25px 0;
  flex-wrap: wrap;
}
.legend p {
  width: 100%;
  font-size: 12px;
  color: #526777;
}
.mobile-agenda {
  display: none;
}
.edit {
  max-width: 650px;
  padding: 30px 0 120px;
}
.edit h2 {
  margin-top: 35px;
}
.edit form {
  display: grid;
  gap: 25px;
}
.edit p {
  font-size: 13px;
}
.agenda {
  margin-top: 45px;
}
.agenda article {
  display: flex;
  align-items: center;
  gap: 45px;
  padding: 30px 0;
  border-top: 1px solid var(--line);
}
.agenda article > div:first-child {
  width: 140px;
}
.agenda article > div:nth-child(2) {
  flex: 1;
}
.agenda small {
  font-size: 10px;
}
.agenda h2 {
  font-size: 25px;
  margin: 10px 0;
}
.agenda p {
  font-size: 13px;
}
.agenda button {
  font-size: 12px;
}
@media (max-width: 900px) {
  .planner {
    grid-template-columns: 1fr;
  }
  .planner aside {
    display: none;
  }
  .event {
    padding: 7px;
  }
  .event strong {
    font-size: 11px;
  }
}
@media (max-width: 600px) {
  header {
    padding: 20px;
    gap: 18px;
  }
  header > span:not(.grow) {
    display: none;
  }
  header strong {
    font-size: 19px;
  }
  .heading {
    display: block;
  }
  .heading h1 {
    font-size: 29px;
  }
  .sample {
    display: inline-block;
    margin-top: 10px;
  }
  .planner {
    display: none;
  }
  .mobile-agenda {
    display: block;
    margin-top: 30px;
  }
  .mobile-agenda h2 {
    font-size: 22px;
  }
  .mobile-agenda button {
    display: block;
    width: 100%;
    text-align: left;
    background: #fff;
    padding: 20px;
    margin: 12px 0;
    font-size: 12px;
  }
  .mobile-agenda strong {
    font-size: 18px;
    display: inline-block;
    margin-top: 10px;
  }
  .agenda article {
    flex-wrap: wrap;
    gap: 15px;
  }
  .agenda article > div:first-child {
    width: 85px;
  }
  .agenda article button {
    margin-left: 100px;
  }
  .agenda h2 {
    font-size: 21px;
  }
}
</style>
