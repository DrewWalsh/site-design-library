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
    .filter((k) => k.startsWith('design-library:42:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const pageNumber = ref('100'),
  saved = useStored<string[]>('42:pages', []);
const events = [
  {
    page: '201',
    title: 'Repair café returns',
    time: 'SAT 07 NOV / 10:00',
    place: 'Community Hall',
  },
  { page: '202', title: 'Autumn book exchange', time: 'SAT 07 NOV / 12:00', place: 'Old Library' },
  {
    page: '203',
    title: 'A walk by the water',
    time: 'SUN 08 NOV / 09:30',
    place: 'Riverside Gate',
  },
];
function openPage() {
  const i = events.findIndex((e) => e.page === pageNumber.value);
  if (i >= 0) {
    selected.value = i;
    go('event');
    message.value = '';
  } else if (pageNumber.value === '100') {
    go('start');
    message.value = '';
  } else if (pageNumber.value === '400') {
    go('saved');
    message.value = '';
  } else message.value = 'Page unavailable. Try 100, 201–203, or 400.';
}
function save() {
  const p = events[selected.value].page;
  saved.value = saved.value.includes(p) ? saved.value.filter((x) => x !== p) : [...saved.value, p];
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <div class="broadcast">
      <header>
        <span
          >P{{
            state === 'event' ? events[selected].page : state === 'saved' ? '400' : '100'
          }}</span
        ><strong>TOWNTEXT</strong><span>26 OCT 2026</span><b>12:00</b>
      </header>
      <div class="titleband"><span>YOUR TOWN. IN A FEW PAGES.</span><span>NORTHBANK</span></div>
      <main id="content">
        <template v-if="state === 'start'"
          ><h1>GOOD AFTERNOON,<br />NORTHBANK.</h1>
          <p class="strap">
            Community notices, useful dates, and things<br />worth knowing before you head out.
          </p>
          <section class="bulletins">
            <div>
              <h2>WHAT’S ON <span>200</span></h2>
              <button
                v-for="(e, i) in events"
                :key="e.page"
                @click="
                  selected = i;
                  go('event');
                "
              >
                <b>{{ e.page }}</b
                ><span>{{ e.title }}</span
                ><i>→</i>
              </button>
              <h2>AROUND TOWN <span>300</span></h2>
              <p><b>BUS NOTE</b> Evening service adds a final sample departure at 22:15.</p>
              <p><b>LIBRARY</b> Reading room open until 19:00 on Thursdays in this fixture.</p>
            </div>
            <aside>
              <h2>THE WEEK AHEAD</h2>
              <p><strong>FRI</strong> A late opening<br />at the small museum.</p>
              <p><strong>SAT</strong> Market morning<br />in the square.</p>
              <p><strong>SUN</strong> A riverside walk<br />and a quiet afternoon.</p>
              <div class="sample">ALL DATES AND NOTICES<br />ARE SAMPLE CONTENT.</div>
            </aside>
          </section>
          <section class="notice-strip">
            <h2>NOTHING FLASHES. EVERYTHING IS A LINK.</h2>
            <p>
              Use the visible links or enter a page number below. This is a finite, edited bulletin.
            </p>
          </section></template
        ><template v-else-if="state === 'event'"
          ><p class="section">WHAT’S ON / PAGE {{ events[selected].page }}</p>
          <h1>{{ events[selected].title }}</h1>
          <div class="eventlines">
            <p><b>WHEN</b>{{ events[selected].time }}</p>
            <p><b>WHERE</b>{{ events[selected].place }}</p>
            <p><b>COST</b>FREE / SAMPLE EVENT</p>
            <p><b>ACCESS</b>STEP-FREE ENTRY</p>
          </div>
          <h2>BRING SOMETHING. LEAVE WITH A STORY.</h2>
          <p>
            A fictional community event with time for practical help and a conversation. All ages
            are welcome in this sample notice.
          </p>
          <p>
            No external booking is required by this demonstration. In a real notice, the organiser’s
            confirmed booking details would appear here.
          </p>
          <button class="save" @click="save">
            {{ saved.includes(events[selected].page) ? 'REMOVE FROM SAVED' : 'SAVE THIS PAGE' }} →
            400
          </button></template
        ><template v-else
          ><p class="section">PERSONAL INDEX / PAGE 400</p>
          <h1>SAVED PAGES.</h1>
          <p v-if="!saved.length">
            NO PAGES SAVED YET.<br />Open an event and choose SAVE THIS PAGE.
          </p>
          <button
            class="savedrow"
            v-for="e in events.filter((e) => saved.includes(e.page))"
            :key="e.page"
            @click="
              selected = events.indexOf(e);
              go('event');
            "
          >
            {{ e.page }} {{ e.title }} →
          </button></template
        >
      </main>
      <form class="page-entry" @submit.prevent="openPage">
        <label
          >GO TO PAGE<input
            v-model="pageNumber"
            inputmode="numeric"
            maxlength="3"
            aria-label="Page number" /></label
        ><button>GO →</button>
        <p v-if="message" role="status">{{ message }}</p>
      </form>
      <nav class="sections">
        <button @click="go('start')">100 HOME</button
        ><button
          @click="
            selected = 0;
            go('event');
          "
        >
          201 WHAT’S ON</button
        ><button @click="go('saved')">400 SAVED</button>
      </nav>
      <footer class="broadcast-footer">END / LOCAL SAMPLE BULLETIN / 01 OF 01</footer>
    </div>
    <footer class="specimen-note">
      <span>TownText · Fictional sample content · Design reference 42</span
      ><button @click="reset">Reset demo</button>
    </footer>
  </div>
</template>
<style scoped>
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
  color: #101514;
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
.broadcast {
  max-width: 1100px;
  margin: auto;
  padding: 35px 40px 45px;
  font-family: 'IBM Plex Mono';
}
header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  background: #1d4386;
  color: #fff;
  padding: 13px 20px;
  font-size: 13px;
}
header strong {
  font-size: 25px;
  letter-spacing: 0.04em;
}
header b {
  font-size: 13px;
  font-weight: 400;
}
.titleband {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  background: #ece8cc;
  color: #101514;
  padding: 10px 20px;
  font-size: 11px;
}
main {
  padding: 35px 20px 20px;
}
h1 {
  font: 45px/1.2 'IBM Plex Mono';
  letter-spacing: -0.04em;
  color: #f1d95e;
  margin: 20px 0;
}
.strap {
  font-size: 16px;
  line-height: 1.8;
  color: #d9e4df;
}
.bulletins {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 35px;
  margin-top: 35px;
}
h2 {
  font: 15px/1.6 'IBM Plex Mono';
  letter-spacing: 0;
  color: #77d7d1;
  border-bottom: 2px solid #77d7d1;
  padding-bottom: 8px;
}
.bulletins h2 span {
  float: right;
  color: #f1d95e;
}
.bulletins button {
  display: flex;
  gap: 18px;
  align-items: start;
  background: none;
  border: 0;
  border-radius: 0;
  color: #f1f0dc;
  padding: 15px 0;
  border-bottom: 1px solid #2f4945;
  text-align: left;
  font-size: 14px;
  width: 100%;
}
.bulletins button b {
  font-size: 14px;
  color: #f1d95e;
}
.bulletins button span {
  flex: 1;
}
.bulletins i {
  font-style: normal;
}
.bulletins p {
  font-size: 13px;
  line-height: 1.8;
}
.bulletins p b {
  color: #f1d95e;
  margin-right: 12px;
}
.bulletins h2:not(:first-child) {
  margin-top: 35px;
}
.bulletins aside {
  background: #1c302e;
  padding: 20px;
}
.bulletins aside h2 {
  font-size: 13px;
  border: 0;
  margin: 0 0 25px;
}
.bulletins aside strong {
  color: #f1d95e;
  font-size: 17px;
}
.sample {
  background: #e5d45e;
  color: #101514;
  padding: 15px;
  font-size: 10px;
  margin-top: 30px;
}
.notice-strip {
  margin-top: 40px;
  border-top: 2px solid #6b8372;
  padding: 25px 0;
}
.notice-strip h2 {
  border: 0;
  color: #f1d95e;
  font-size: 13px;
}
.notice-strip p {
  font-size: 12px;
}
.page-entry {
  display: flex;
  align-items: end;
  gap: 15px;
  padding: 20px;
  background: #1c302e;
  flex-wrap: wrap;
}
.page-entry label {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 12px;
}
.page-entry input {
  width: 85px;
  background: #101514;
  color: #f1d95e;
  border: 1px solid #7f967a;
  border-radius: 0;
  text-align: center;
  padding: 8px;
}
.page-entry button {
  background: #e5d45e;
  color: #101514;
  font-size: 12px;
  border: 0;
  border-radius: 0;
  padding: 10px 20px;
}
.page-entry p {
  font-size: 11px;
  margin: 0;
}
.sections {
  display: flex;
  gap: 5px;
  margin-top: 15px;
}
.sections button {
  flex: 1;
  border: 0;
  border-radius: 0;
  background: #7c2b36;
  color: white;
  padding: 12px;
  font-size: 11px;
}
.sections button:nth-child(2) {
  background: #2a6654;
}
.sections button:nth-child(3) {
  background: #1d4386;
}
.broadcast-footer {
  text-align: right;
  font-size: 10px;
  color: #95ad99;
  margin-top: 20px;
}
.section {
  color: #77d7d1;
  font-size: 12px;
}
.eventlines {
  margin: 40px 0;
  border-top: 1px solid #6b8372;
}
.eventlines p {
  display: flex;
  gap: 30px;
  border-bottom: 1px solid #334c43;
  padding: 15px 0;
  margin: 0;
  font-size: 13px;
}
.eventlines b {
  width: 80px;
  color: #f1d95e;
  font-weight: 400;
}
.save {
  border: 0;
  border-radius: 0;
  background: #e5d45e;
  color: #101514;
  font-size: 12px;
  margin: 25px 0;
  padding: 15px;
}
.savedrow {
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: 0;
  border-top: 1px solid #6b8372;
  padding: 20px 0;
  color: #f1d95e;
}
.specimen-note {
  border-color: #6b8372;
}
.specimen-note button {
  color: #f1f0dc;
  border-color: #6b8372;
}
@media (max-width: 650px) {
  .broadcast {
    padding: 20px 12px;
  }
  header {
    padding: 12px;
    gap: 10px;
    font-size: 9px;
  }
  header strong {
    font-size: 19px;
  }
  header > span:nth-of-type(2) {
    display: none;
  }
  header b {
    font-size: 9px;
  }
  .titleband {
    font-size: 8px;
    padding: 10px 12px;
  }
  .titleband > span + span {
    display: none;
  }
  main {
    padding: 25px 12px;
  }
  h1 {
    font-size: 31px;
    line-height: 1.3;
  }
  .strap {
    font-size: 12px;
  }
  .strap br {
    display: none;
  }
  .bulletins {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  .bulletins button {
    font-size: 12px;
  }
  .bulletins p {
    font-size: 12px;
  }
  .sections button {
    padding: 10px 6px;
    font-size: 8px;
  }
  .page-entry {
    padding: 15px;
  }
  .page-entry label {
    font-size: 10px;
    gap: 10px;
  }
  .eventlines p {
    font-size: 11px;
    gap: 15px;
  }
  .eventlines b {
    width: 60px;
    flex-shrink: 0;
  }
  main > p {
    font-size: 13px;
  }
}
</style>
