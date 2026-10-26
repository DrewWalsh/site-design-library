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
    .filter((k) => k.startsWith('design-library:12:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const notes = useStored('12:notes', [
  {
    title: 'A place to pause',
    text: 'People linger near the sunny steps. Seating could make that pause more comfortable.',
    group: 'Observations',
    x: 8,
    y: 12,
  },
  {
    title: 'The route everyone takes',
    text: 'The informal path crosses the lawn. Watch how people move before drawing a new route.',
    group: 'Observations',
    x: 40,
    y: 25,
  },
  {
    title: 'Try a shared table',
    text: 'A movable table could support lunch, repair sessions, and small conversations.',
    group: 'Possibilities',
    x: 70,
    y: 12,
  },
  {
    title: 'What makes it welcoming?',
    text: 'Ask visitors what would make them stay five minutes longer.',
    group: 'Questions',
    x: 15,
    y: 57,
  },
]);
const compact = ref(innerWidth < 650);
const active = computed(() => notes.value[selected.value] || notes.value[0]);
function add() {
  if (notes.value.length >= 6) {
    message.value = 'This bounded board holds six notes. Edit an existing note.';
    return;
  }
  notes.value.push({
    title: 'New source note',
    text: 'Add a useful observation.',
    group: 'Questions',
    x: 45,
    y: 60,
  });
  selected.value = notes.value.length - 1;
  go('detail');
}
function move(dx: number, dy: number) {
  active.value.x = Math.max(2, Math.min(75, active.value.x + dx));
  active.value.y = Math.max(8, Math.min(65, active.value.y + dy));
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>◉ Common Ground</strong><span>Research / The shared courtyard</span
      ><button @click="add">+ Source note</button>
    </header>
    <div class="boardbar">
      <div>
        <h1>The shared courtyard</h1>
        <p>A small field study in making room for people.</p>
      </div>
      <div class="row">
        <button
          :aria-pressed="state !== 'outline' && !compact"
          @click="
            compact = false;
            go('start');
          "
        >
          Canvas</button
        ><button :aria-pressed="state === 'outline' || compact" @click="go('outline')">
          Outline
        </button>
      </div>
    </div>
    <main id="content">
      <p v-if="message" class="notice" role="status">{{ message }}</p>
      <div class="board-layout">
        <section class="canvas" v-if="state !== 'outline' && !compact" aria-label="Research canvas">
          <span class="group-label g1">01 OBSERVATIONS</span
          ><span class="group-label g2">02 POSSIBILITIES</span
          ><span class="group-label g3">03 QUESTIONS</span
          ><svg class="connections" viewBox="0 0 1000 650" aria-hidden="true">
            <path
              d="M180 170Q400 90 760 170M460 260Q300 350 250 460"
              fill="none"
              stroke="#c1bda9"
              stroke-dasharray="7 7"
              stroke-width="2"
            /></svg
          ><button
            v-for="(n, i) in notes"
            :key="i"
            :class="['note', { chosen: selected === i }]"
            :style="{
              left: n.x + '%',
              top: n.y + '%',
              background:
                n.group === 'Questions'
                  ? '#dce8e3'
                  : n.group === 'Possibilities'
                    ? '#e5def0'
                    : '#f2e5b9',
            }"
            @click="
              selected = i;
              go('detail');
            "
          >
            <small>{{ n.group }}</small>
            <h2>{{ n.title }}</h2>
            <p>{{ n.text }}</p>
            <span>↗</span></button
          ><small class="canvas-help"
            >A bounded board. Select a note to edit or reposition it.</small
          >
        </section>
        <section class="outline" v-else>
          <div v-for="group in ['Observations', 'Possibilities', 'Questions']" :key="group">
            <h2>{{ group }}</h2>
            <button
              v-for="n in notes.filter((n) => n.group === group)"
              :key="n.title"
              @click="
                selected = notes.indexOf(n);
                go('detail');
              "
            >
              <h3>{{ n.title }}</h3>
              <p>{{ n.text }}</p>
              <span>Edit note →</span>
            </button>
          </div>
        </section>
        <aside v-if="state === 'detail'">
          <p class="eyebrow">NOTE INSPECTOR</p>
          <label>Title<input v-model="active.title" /></label
          ><label>Observation<textarea v-model="active.text"></textarea></label
          ><label
            >Group<select v-model="active.group">
              <option>Observations</option>
              <option>Possibilities</option>
              <option>Questions</option>
            </select></label
          >
          <fieldset>
            <legend>Move on canvas</legend>
            <div class="row">
              <button @click="move(-5, 0)" aria-label="Move left">←</button
              ><button @click="move(0, -5)" aria-label="Move up">↑</button
              ><button @click="move(0, 5)" aria-label="Move down">↓</button
              ><button @click="move(5, 0)" aria-label="Move right">→</button>
            </div>
          </fieldset>
          <p>Saved in this browser. Position: {{ active.x }}, {{ active.y }}.</p>
          <button @click="go(compact ? 'outline' : 'start')">Close inspector</button>
        </aside>
      </div>
      <section class="context">
        <p class="eyebrow">ABOUT THIS BOARD</p>
        <h2>Observe first. Arrange second.</h2>
        <p>
          The notes describe a fictional shared courtyard. Their position groups related ideas; the
          outline contains the same information in reading order. No drag gesture is required.
        </p>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Common Ground · Fictional sample content · Design reference 12</span
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
  padding: 20px 30px;
  display: flex;
  align-items: center;
  gap: 35px;
  background: white;
  border-bottom: 1px solid var(--line);
  font-size: 12px;
}
header strong {
  font-size: 21px;
}
header button {
  margin-left: auto;
  font-size: 12px;
}
.boardbar {
  padding: 28px 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}
.boardbar h1 {
  font-size: 29px;
  margin: 0 0 8px;
}
.boardbar p {
  font-size: 13px;
  margin: 0;
}
.boardbar button {
  font-size: 12px;
}
.board-layout {
  display: flex;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.canvas {
  flex: 1;
  position: relative;
  height: 670px;
  background-image: radial-gradient(#c8cebf 1px, transparent 1px);
  background-size: 20px 20px;
  overflow: hidden;
  min-width: 600px;
}
.connections {
  position: absolute;
  width: 100%;
  height: 100%;
}
.group-label {
  position: absolute;
  font-size: 10px;
  letter-spacing: 0.12em;
  color: #68745c;
}
.g1 {
  left: 8%;
  top: 5%;
}
.g2 {
  left: 70%;
  top: 5%;
}
.g3 {
  left: 10%;
  top: 50%;
}
.note {
  position: absolute;
  width: 22%;
  padding: 22px;
  text-align: left;
  box-shadow: 1px 5px 10px #303a2412;
  border: 1px solid #bac1ad;
  border-radius: 2px;
}
.note small {
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.note h2 {
  font-size: 22px;
  line-height: 1.2;
  margin: 14px 0;
}
.note p {
  font-size: 12px;
  line-height: 1.8;
}
.note span {
  display: block;
  text-align: right;
}
.note.chosen {
  outline: 2px solid #66785c;
  outline-offset: 3px;
}
.canvas-help {
  position: absolute;
  bottom: 22px;
  left: 25px;
  font-size: 10px;
  background: #f5f4ee;
  padding: 7px;
}
.board-layout > aside {
  width: 290px;
  padding: 25px;
  background: white;
  flex-shrink: 0;
  border-left: 1px solid var(--line);
  font-size: 12px;
}
.board-layout > aside label {
  margin: 20px 0;
}
.board-layout > aside input,
.board-layout > aside textarea {
  font-size: 12px;
}
.board-layout > aside fieldset {
  padding: 10px;
}
.board-layout > aside button {
  font-size: 12px;
}
.board-layout > aside p {
  font-size: 11px;
}
.context {
  padding: 45px 6%;
  max-width: 1000px;
}
.context h2 {
  font-size: 30px;
}
.context p {
  font-size: 14px;
}
.outline {
  padding: 35px;
  flex: 1;
}
.outline h2 {
  font-size: 24px;
}
.outline button {
  display: block;
  width: 100%;
  text-align: left;
  margin: 15px 0;
  background: #fffdf4;
  padding: 25px;
}
.outline h3 {
  font-size: 20px;
}
.outline p {
  font-size: 13px;
}
.outline span {
  font-size: 11px;
}
@media (max-width: 1000px) {
  .canvas {
    min-width: 0;
  }
  .note {
    width: 25%;
    padding: 15px;
  }
  .note h2 {
    font-size: 18px;
  }
  .note p {
    font-size: 11px;
  }
  .board-layout > aside {
    width: 240px;
  }
  .board-layout:has(aside) {
    display: block;
  }
  .board-layout > aside {
    width: 100%;
  }
}
@media (max-width: 650px) {
  header {
    padding: 18px;
    gap: 10px;
  }
  header strong {
    font-size: 17px;
  }
  header > span {
    display: none;
  }
  header button {
    font-size: 10px;
  }
  .boardbar {
    display: block;
    padding: 25px 20px;
  }
  .boardbar h1 {
    font-size: 27px;
  }
  .boardbar .row {
    margin-top: 18px;
  }
  .outline {
    padding: 20px;
  }
  .context {
    padding: 35px 20px;
  }
  .canvas {
    height: 820px;
  }
  .note {
    width: 40%;
    padding: 12px;
  }
  .note:nth-of-type(3) {
    left: 55% !important;
    top: 48% !important;
  }
  .note p {
    font-size: 10px;
  }
}
</style>
