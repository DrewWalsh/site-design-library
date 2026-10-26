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
    .filter((k) => k.startsWith('design-library:46:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const motion = ref(!matchMedia('(prefers-reduced-motion: reduce)').matches);
const sessions = [
  { time: '18:00', title: 'A voice in the room', person: 'Mara Bell' },
  { time: '19:15', title: 'The shape of a sentence', person: 'Eli Moss' },
  { time: '20:30', title: 'Many voices, one evening', person: 'The Assembly' },
];
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>VA / 26</strong>
      <nav>
        <button @click="go('schedule')">Programme</button
        ><button
          @click="
            motion = false;
            go('reading');
          "
        >
          Static reading</button
        ><button :aria-pressed="motion" @click="motion = !motion">
          Motion {{ motion ? 'on' : 'off' }}
        </button>
      </nav>
    </header>
    <main id="content" :class="{ moving: motion && state === 'start' }">
      <template v-if="state === 'start'"
        ><section class="type-stage">
          <div class="issue"><span>SPOKEN WORD / NORTHBANK</span><span>14 NOVEMBER 2026</span></div>
          <h1><span>GIVE</span><span class="voice">IT A</span><span>VOICE.</span></h1>
          <div class="under-title">
            <p>One room. Many ways<br />of saying what matters.</p>
            <a href="#programme">THE ASSEMBLY BEGINS BELOW ↓</a>
          </div>
        </section>
        <section class="words">
          <p class="eyebrow">WORDS ARE MEANT TO TRAVEL.</p>
          <h2>FROM THE PAGE.<br />INTO THE ROOM.<br />BETWEEN US.</h2>
          <p>
            A fictional evening of poems, stories, and conversations. Voice Assembly makes space for
            the rhythm of language and the people who give it shape.
          </p>
        </section>
        <section id="programme" class="programme">
          <p class="eyebrow">THE EVENING / 14 NOVEMBER</p>
          <h2>THREE WAYS IN.</h2>
          <button
            v-for="(s, i) in sessions"
            :key="s.title"
            @click="
              selected = i;
              go('schedule');
            "
          >
            <span>{{ s.time }}</span>
            <h3>{{ s.title }}</h3>
            <span>{{ s.person }}</span
            ><b>↗</b>
          </button>
        </section></template
      >
      <section v-else-if="state === 'schedule'" class="schedule">
        <p class="eyebrow">14 NOVEMBER 2026 / ASSEMBLY HALL</p>
        <h1>THE EVENING,<br />IN ORDER.</h1>
        <article v-for="(s, i) in sessions" :key="s.title" :class="{ selected: selected === i }">
          <p>{{ s.time }} / {{ s.person }}</p>
          <h2>{{ s.title }}</h2>
          <p>
            {{
              [
                'A reading about the places where we learn to speak.',
                'A conversation on pacing, silence, and the work a line can do.',
                'An open closing session for the fictional festival community.',
              ][i]
            }}
          </p>
          <p>45 minutes · Captioned · Seated audience · Sample programme</p>
        </article>
        <button @click="go('reading')">Read the complete static introduction →</button>
      </section>
      <article v-else class="reading">
        <p class="eyebrow">COMPLETE STATIC READING MODE</p>
        <h1>GIVE IT<br />A VOICE.</h1>
        <p>One room. Many ways of saying what matters.</p>
        <h2>From the page. Into the room. Between us.</h2>
        <p>
          A fictional evening of poems, stories, and conversations. Voice Assembly makes space for
          the rhythm of language and the people who give it shape.
        </p>
        <h2>The programme</h2>
        <div v-for="s in sessions" :key="s.title">
          <h3>{{ s.time }} / {{ s.title }}</h3>
          <p>{{ s.person }} · 45 minutes · Captioned · Seated audience</p>
        </div>
        <h2>Visiting</h2>
        <p>
          14 November 2026, Assembly Hall, fictional Northbank. Doors open at 17:30. Step-free
          access and a quiet room are part of the sample event information.
        </p>
        <button
          @click="
            motion = false;
            go('start');
          "
        >
          See the composition without motion →
        </button>
      </article>
    </main>
    <footer class="specimen-note">
      <span>Voice Assembly · Fictional sample content · Design reference 46</span
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
  color: #24232a;
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
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding: 25px 5%;
  border-bottom: 1px solid #68656f;
}
header strong {
  font: 32px 'Bebas Neue';
}
nav {
  display: flex;
  gap: 25px;
}
nav button {
  font-size: 11px;
  background: none;
  color: #f1eee3;
  border: 0;
}
nav button:last-child {
  border: 1px solid #8d8a92;
  padding: 8px 12px;
  border-radius: 0;
}
main {
  max-width: 1600px;
  margin: auto;
}
.type-stage {
  padding: 35px 6% 50px;
}
.issue {
  display: flex;
  justify-content: space-between;
  gap: 25px;
  font-size: 10px;
  letter-spacing: 0.12em;
}
.type-stage h1 {
  font: clamp(115px, 15vw, 220px)/0.79 'Bebas Neue';
  letter-spacing: -0.02em;
  margin: 55px 0 50px;
}
.type-stage h1 > span {
  display: block;
}
.type-stage .voice {
  margin-left: 25%;
  color: #dce57b;
}
.under-title {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 30px;
  border-top: 1px solid #68656f;
  padding-top: 25px;
}
.under-title p {
  font-size: 16px;
  line-height: 1.7;
  margin: 0;
}
.under-title a {
  font-size: 10px;
}
.words {
  background: #dce57b;
  color: #24232a;
  padding: 60px 10%;
}
.words h2 {
  font: 75px/0.95 'Bebas Neue';
  letter-spacing: 0;
  margin: 35px 0;
}
.words > p:last-child {
  font-size: 16px;
  max-width: 650px;
}
.programme {
  padding: 60px 6% 90px;
}
.programme h2 {
  font: 55px 'Bebas Neue';
  letter-spacing: 0;
}
.programme > button {
  display: grid;
  grid-template-columns: 85px 1fr 150px 30px;
  align-items: center;
  gap: 35px;
  background: none;
  color: #f1eee3;
  width: 100%;
  border: 0;
  border-top: 1px solid #68656f;
  padding: 27px 0;
  text-align: left;
}
.programme > button > span {
  font-size: 12px;
}
.programme h3 {
  font: 37px 'Bebas Neue';
  letter-spacing: 0;
  margin: 0;
}
.programme b {
  font-size: 28px;
  font-weight: 400;
}
.schedule,
.reading {
  max-width: 1100px;
  margin: auto;
  padding: 55px 7% 110px;
}
.schedule h1,
.reading h1 {
  font: 100px/1 'Bebas Neue';
  letter-spacing: 0;
}
.schedule article {
  border-top: 1px solid #68656f;
  padding: 30px 0;
}
.schedule article.selected {
  border-top: 4px solid #dce57b;
}
.schedule h2 {
  font: 45px 'Bebas Neue';
  letter-spacing: 0;
  color: #dce57b;
}
.schedule p,
.reading p {
  font-size: 15px;
  line-height: 1.9;
}
.schedule button,
.reading button {
  color: #f1eee3;
  border: 1px solid #8d8a92;
  font-size: 12px;
  background: none;
  margin-top: 25px;
}
.reading h2 {
  font: 36px 'Bebas Neue';
  letter-spacing: 0;
  color: #dce57b;
  margin-top: 40px;
}
.reading h3 {
  font: 27px 'Bebas Neue';
  letter-spacing: 0;
}
.moving .voice {
  animation: voice-shift 4s ease-in-out infinite alternate;
}
@keyframes voice-shift {
  from {
    transform: translateX(-2%);
    letter-spacing: -0.035em;
  }
  to {
    transform: translateX(2%);
    letter-spacing: 0.015em;
  }
}
.specimen-note {
  border-color: #68656f;
}
.specimen-note button {
  color: #f1eee3;
  border-color: #8d8a92;
}
@media (max-width: 600px) {
  header {
    padding: 22px;
    gap: 15px;
  }
  header strong {
    font-size: 25px;
  }
  nav {
    gap: 9px;
    flex-wrap: wrap;
  }
  nav button {
    font-size: 9px;
    padding: 4px;
  }
  nav button:last-child {
    padding: 7px;
  }
  .issue {
    font-size: 8px;
  }
  .type-stage {
    padding: 30px 6% 35px;
  }
  .type-stage h1 {
    font-size: 118px;
    margin: 50px 0 40px;
    line-height: 0.85;
  }
  .type-stage .voice {
    margin-left: 15%;
  }
  .under-title {
    display: block;
  }
  .under-title p {
    font-size: 14px;
  }
  .under-title a {
    display: block;
    margin-top: 25px;
    font-size: 8px;
  }
  .words {
    padding: 40px 7%;
  }
  .words h2 {
    font-size: 49px;
  }
  .words > p:last-child {
    font-size: 14px;
  }
  .programme h2 {
    font-size: 42px;
  }
  .programme > button {
    grid-template-columns: 55px 1fr 20px;
    gap: 15px;
  }
  .programme h3 {
    font-size: 29px;
  }
  .programme > button > span:nth-of-type(2) {
    grid-column: 2;
    font-size: 10px;
  }
  .programme > button > b {
    grid-column: 3;
    grid-row: 1;
  }
  .schedule h1,
  .reading h1 {
    font-size: 68px;
  }
  .schedule h2 {
    font-size: 36px;
  }
}
</style>
