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
    .filter((k) => k.startsWith('design-library:38:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const events = [
  {
    name: 'CO-OP NIGHT',
    genre: 'Co-op',
    date: '06 NOV',
    time: '18:00',
    desc: 'Bring a friend or find a teammate. A relaxed evening of shared screens.',
  },
  {
    name: 'SCORE ATTACK',
    genre: 'Arcade',
    date: '07 NOV',
    time: '15:00',
    desc: 'Three classic-style challenges. One friendly afternoon.',
  },
  {
    name: 'INDIE SHOWCASE',
    genre: 'Indie',
    date: '08 NOV',
    time: '14:00',
    desc: 'Small games, big ideas. Meet the fictional local creators.',
  },
];
const name = ref('');
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>QUARTER<br />CLUB<span>▮</span></strong>
      <nav>
        <button @click="go('start')">SELECT EVENT</button><span>NORTHBANK GAMES COLLECTIVE</span>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><div class="screen-top">
          <span>PLAYER 01 / WELCOME</span><span>NO COINS REQUIRED</span>
        </div>
        <section class="cabinet">
          <div class="selector">
            <p class="eyebrow">CHOOSE YOUR NEXT NIGHT OUT</p>
            <h1>PRESS<br />START<br />TOGETHER.</h1>
            <label
              >Event type<select v-model="tab">
                <option>All</option>
                <option>Co-op</option>
                <option>Arcade</option>
                <option>Indie</option>
              </select></label
            ><button
              v-for="(e, i) in events.filter((e) => tab === 'All' || e.genre === tab)"
              :key="e.name"
              :aria-pressed="selected === events.indexOf(e)"
              @click="selected = events.indexOf(e)"
            >
              <span>▶</span>{{ e.name }}<small>{{ e.date }}</small>
            </button>
          </div>
          <article class="preview">
            <div
              class="pixel-scene"
              role="img"
              aria-label="Original pixel illustration of an arcade landscape"
            >
              <div class="pixel-sun"></div>
              <div class="mountains"></div>
              <div class="floor"></div>
              <span class="ship">▟▙</span><span class="score">READY / 01</span>
            </div>
            <div class="event-copy">
              <p class="eyebrow">
                {{ events[selected].date }} / {{ events[selected].time }} /
                {{ events[selected].genre }}
              </p>
              <h2>{{ events[selected].name }}</h2>
              <p>{{ events[selected].desc }}</p>
              <button class="primary" @click="go('event')">OPEN EVENT →</button>
            </div>
          </article>
        </section>
        <div class="status-strip">
          <span>3 EVENTS AVAILABLE</span><span>KEYBOARD FRIENDLY</span
          ><span>SOUND OFF BY DEFAULT</span>
        </div>
        <section class="club">
          <h2>A GOOD PLACE<br />TO PLAY BADLY.</h2>
          <p>
            Everyone starts somewhere. Our fictional club is about sharing games, meeting people,
            and making space for curiosity. No rankings required.
          </p>
          <p>Northbank Community Hall · Step-free access · Quiet corner available</p>
        </section></template
      >
      <section v-else-if="state === 'event'" class="details">
        <p class="eyebrow">{{ events[selected].genre }} / QUARTER CLUB</p>
        <h1>{{ events[selected].name }}</h1>
        <p>{{ events[selected].desc }}</p>
        <div class="event-facts">
          <p><b>WHEN</b><br />{{ events[selected].date }} 2026 / {{ events[selected].time }}</p>
          <p><b>WHERE</b><br />Northbank Community Hall</p>
          <p><b>BRING</b><br />Yourself. Controllers provided.</p>
        </div>
        <form @submit.prevent="go('reserved')">
          <label
            >Sample player name<input
              v-model="name"
              required
              maxlength="30"
              placeholder="Player 01" /></label
          ><button class="primary">RESERVE A SAMPLE PLACE →</button
          ><small>Local demo only. No attendance slot is actually booked.</small>
        </form>
        <button @click="go('start')">← BACK TO SELECT</button>
      </section>
      <section v-else class="confirmation">
        <p class="eyebrow">LOCAL DEMONSTRATION</p>
        <h1>YOU’RE<br />ON THE LIST.</h1>
        <p>
          {{ name || 'Player 01' }} / {{ events[selected].name }}<br />{{ events[selected].date }} /
          {{ events[selected].time }}
        </p>
        <p>Sample reservation QC-2048.<br />No real booking has been made.</p>
        <button class="primary" @click="go('start')">BACK TO THE CLUB →</button>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Quarter Club · Fictional sample content · Design reference 38</span
      ><button @click="reset">Reset demo</button>
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Press Start 2P';
  src: url('/fonts/press-start-2p.woff2') format('woff2');
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
  color: #171b30;
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
  padding: 30px 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  border-bottom: 3px solid #4b567a;
}
header strong {
  font: 18px/1.5 'Press Start 2P';
  color: #f1c568;
}
header strong span {
  color: #e17a91;
  margin-left: 10px;
}
nav {
  display: grid;
  gap: 14px;
  text-align: right;
}
nav button {
  font: 9px 'Press Start 2P';
  color: #dce4ed;
  background: none;
  border: 0;
}
nav > span {
  font-size: 9px;
  color: #a6b4cf;
  letter-spacing: 0.09em;
}
main {
  max-width: 1400px;
  margin: auto;
  padding: 35px 5% 80px;
}
.screen-top {
  display: flex;
  justify-content: space-between;
  font: 8px/1.8 'Press Start 2P';
  color: #99c6b2;
  padding: 15px 20px;
  background: #232c43;
  border: 3px solid #536183;
  border-bottom: 0;
}
.cabinet {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  border: 3px solid #536183;
  box-shadow: 6px 6px #0c1021;
}
.selector {
  padding: 35px;
  background: #1c233a;
  border-right: 3px solid #536183;
}
.selector .eyebrow {
  font: 9px/1.8 'DM Sans';
  color: #a9b6d3;
}
.selector h1 {
  font: 34px/1.7 'Press Start 2P';
  letter-spacing: -0.06em;
  color: #e9e8d1;
  margin: 25px 0;
}
.selector label {
  font-size: 10px;
  margin: 25px 0;
}
.selector select {
  font-size: 11px;
  background: #28314b;
  border-color: #536183;
}
.selector > button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  padding: 16px 10px;
  border: 2px solid #536183;
  margin: 10px 0;
  font: 9px/1.7 'Press Start 2P';
  background: #2a334e;
}
.selector > button span {
  color: #f1c568;
}
.selector > button small {
  margin-left: auto;
  font: 8px 'DM Sans';
  white-space: nowrap;
}
.selector > button[aria-pressed='true'] {
  background: #3d4b6c;
  border-color: #f1c568;
  box-shadow: inset 3px 0 #f1c568;
}
.pixel-scene {
  height: 315px;
  background: #3b426c;
  position: relative;
  overflow: hidden;
}
.pixel-sun {
  width: 95px;
  height: 95px;
  background: #edb96d;
  position: absolute;
  top: 40px;
  right: 50px;
  clip-path: polygon(
    20% 0,
    80% 0,
    80% 10%,
    90% 10%,
    90% 20%,
    100% 20%,
    100% 80%,
    90% 80%,
    90% 90%,
    80% 90%,
    80% 100%,
    20% 100%,
    20% 90%,
    10% 90%,
    10% 80%,
    0 80%,
    0 20%,
    10% 20%,
    10% 10%,
    20% 10%
  );
}
.mountains {
  position: absolute;
  bottom: 45px;
  left: 0;
  width: 100%;
  height: 160px;
  background: #667f85;
  clip-path: polygon(
    0 100%,
    0 50%,
    10% 50%,
    10% 30%,
    20% 30%,
    20% 10%,
    30% 10%,
    30% 30%,
    40% 30%,
    40% 60%,
    55% 60%,
    55% 35%,
    65% 35%,
    65% 15%,
    80% 15%,
    80% 35%,
    90% 35%,
    90% 60%,
    100% 60%,
    100% 100%
  );
}
.floor {
  height: 50px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: repeating-linear-gradient(90deg, #485c58 0 28px, #253d3e 28px 32px);
  border-top: 7px solid #92b59a;
}
.ship {
  position: absolute;
  bottom: 49px;
  left: 25%;
  font-size: 55px;
  color: #f0c879;
  line-height: 1;
}
.score {
  position: absolute;
  top: 20px;
  left: 20px;
  font: 8px 'Press Start 2P';
}
.event-copy {
  padding: 30px;
}
.event-copy h2 {
  font: 17px/1.8 'Press Start 2P';
  letter-spacing: 0;
}
.event-copy .eyebrow {
  font: 9px 'DM Sans';
  color: #a9b6d3;
}
.event-copy p {
  font-size: 14px;
}
.event-copy button {
  font: 9px/1.8 'Press Start 2P';
  padding: 15px;
  border: 3px outset #ffe1a3;
  border-radius: 0;
  margin-top: 15px;
}
.status-strip {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 22px 0;
  font: 7px/1.8 'Press Start 2P';
  color: #a4b4ce;
}
.club {
  padding: 35px 0;
  border-top: 2px solid #536183;
}
.club h2 {
  font: 21px/1.7 'Press Start 2P';
  color: #f1c568;
}
.club p {
  font-size: 14px;
  color: #bac7da;
}
.details,
.confirmation {
  padding: 40px 0 120px;
}
.details h1,
.confirmation h1 {
  font: 40px/1.6 'Press Start 2P';
  letter-spacing: -0.05em;
}
.details > p,
.confirmation > p {
  font-size: 17px;
  line-height: 1.9;
}
.event-facts {
  display: flex;
  gap: 70px;
  margin: 45px 0;
  padding: 30px;
  border: 2px solid #536183;
}
.event-facts p {
  font-size: 12px;
  line-height: 2;
}
.event-facts b {
  font: 9px 'Press Start 2P';
  color: #f1c568;
}
.details form {
  max-width: 550px;
  display: grid;
  gap: 20px;
  margin-bottom: 30px;
}
.details label {
  font-size: 12px;
}
.details input {
  border-color: #6c7e9d;
}
.details small {
  font-size: 10px;
}
.details button,
.confirmation button {
  font: 9px/1.7 'Press Start 2P';
  padding: 15px;
  border-color: #536183;
}
.specimen-note {
  border-color: #536183;
}
.specimen-note button {
  border-color: #7c8dae;
  color: #dce4ed;
}
@media (max-width: 700px) {
  header {
    padding: 25px;
    gap: 20px;
  }
  header strong {
    font-size: 14px;
  }
  nav > span {
    display: none;
  }
  .screen-top {
    font-size: 6px;
    padding: 13px;
  }
  .screen-top > span + span {
    display: none;
  }
  .cabinet {
    grid-template-columns: 1fr;
  }
  .selector {
    padding: 25px;
    border-right: 0;
    border-bottom: 3px solid #536183;
  }
  .selector h1 {
    font-size: 27px;
    line-height: 1.6;
  }
  .selector > button {
    font-size: 8px;
    padding: 14px;
  }
  .pixel-scene {
    height: 260px;
  }
  .event-copy {
    padding: 25px;
  }
  .event-copy h2 {
    font-size: 14px;
  }
  .status-strip {
    font-size: 6px;
    flex-wrap: wrap;
  }
  .club h2 {
    font-size: 17px;
  }
  .details h1,
  .confirmation h1 {
    font-size: 27px;
  }
  .event-facts {
    display: block;
    padding: 20px;
  }
  .details > p,
  .confirmation > p {
    font-size: 15px;
  }
  .details button {
    font-size: 8px;
  }
}
</style>
