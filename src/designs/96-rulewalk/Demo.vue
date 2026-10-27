<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const position = ref(4),
  rule = ref('edge'),
  route = ref([4]);
const works = [
  [
    'A narrow permission',
    'A doorway made slightly narrower changes the way a visitor carries a bag. The work treats a small constraint as a visible instruction.',
  ],
  [
    'The second route',
    'Two paths reach the same room. One is shorter, the other lets the visitor see where they have been. Efficiency is only one way to judge a route.',
  ],
  [
    'A shared boundary',
    'Two colours meet without a dividing line. The boundary belongs to neither surface, yet it determines the shape of both.',
  ],
  [
    'An interrupted row',
    'One object is missing from an otherwise regular sequence. Its absence makes the organising rule visible for the first time.',
  ],
  [
    'The starting place',
    'A starting point is a curatorial decision disguised as convenience. Begin elsewhere and the same objects will support a different account.',
  ],
  [
    'A useful detour',
    'The route bends around an empty space. The detour gives the empty space a role that placing an object there would have removed.',
  ],
  [
    'One exception',
    'A single element is allowed to break the rule. The exception helps a visitor distinguish a chosen constraint from an unavoidable limitation.',
  ],
  [
    'The adjacent work',
    'Meaning arrives from a neighbour. Move this work one position and its apparent subject changes, even though nothing inside it has been altered.',
  ],
  [
    'A place to stop',
    'An exhibition needs a place where leaving feels like a complete action. The final work makes no request except that the visitor notice the route already taken.',
  ],
];
function allowed(i: number) {
  const dx = Math.abs((i % 3) - (position.value % 3)),
    dy = Math.abs(Math.floor(i / 3) - Math.floor(position.value / 3));
  return rule.value === 'edge' ? dx + dy === 1 : dx === 1 && dy === 1;
}
function move(i: number) {
  if (!allowed(i)) return;
  position.value = i;
  route.value.push(i);
}
function inspect(i: number) {
  position.value = i;
  go('work');
}
function reset() {
  position.value = 4;
  route.value = [4];
  rule.value = 'edge';
  go('start');
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>

    <header>
      <strong>RULEWALK</strong><span>NINE WORKS / TWO WAYS THROUGH</span
      ><button @click="go('route')">Your route ({{ route.length }} stops)</button>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><div class="rule-banner">
          <h1>Follow a rule.<br />Find a different exhibition.</h1>
          <label
            >The current rule<select v-model="rule">
              <option value="edge">Move across a shared edge</option>
              <option value="diagonal">Move across a shared corner</option>
            </select></label
          >
        </div>
        <div class="board-area">
          <div class="board">
            <button
              v-for="(w, i) in works"
              :key="w[0]"
              :class="{ current: position === i, visited: route.includes(i) }"
              :disabled="i !== position && !allowed(i)"
              :aria-label="
                (position === i ? 'Read current work: ' : 'Move to ') + (i + 1) + ' ' + w[0]
              "
              @click="i === position ? go('work') : move(i)"
            >
              <span>{{ String(i + 1).padStart(2, '0') }}</span
              ><strong>{{ w[0] }}</strong
              ><b aria-hidden="true">{{
                position === i ? 'YOU ARE HERE ↗' : allowed(i) ? '→' : route.includes(i) ? '✓' : '·'
              }}</b>
            </button>
          </div>
          <aside>
            <span>THE NEXT MOVE</span>
            <p>
              {{
                rule === 'edge'
                  ? 'Choose a stone that shares an edge with your current position.'
                  : 'Choose a stone diagonally across a corner from your current position.'
              }}
            </p>
            <h2>{{ works[position][0] }}</h2>
            <p>{{ works[position][1] }}</p>
            <button @click="go('work')">Enter this work ↗</button
            ><button @click="rule = rule === 'edge' ? 'diagonal' : 'edge'">Change the rule</button
            ><small>No score. No wrong turn. The constraint changes what comes next.</small>
          </aside>
        </div></template
      >
      <article v-else-if="state === 'work'" class="work">
        <button @click="go('start')">← Back to the board</button
        ><span class="number">{{ String(position + 1).padStart(2, '0') }}</span>
        <h1>{{ works[position][0] }}</h1>
        <p class="lead">{{ works[position][1] }}</p>
        <div class="rule-drawing" aria-hidden="true">
          <i v-for="i in 9" :key="i" :class="{ marked: i - 1 === position }"></i>
        </div>
        <h2>A question to carry forward</h2>
        <p>
          What changed because this work followed the previous one? Compare the route you took with
          the full index, then try a different constraint.
        </p>
        <button @click="go('start')">Make the next move</button
        ><button @click="go('route')">Read your route</button>
      </article>
      <section v-else class="route">
        <h1>The exhibition<br />you walked.</h1>
        <p>
          {{ new Set(route).size }} of nine works encountered. Repeated stops remain in the route
          because order matters.
        </p>
        <ol>
          <li v-for="(i, j) in route" :key="j">
            <span>{{ j + 1 }} → {{ i + 1 }}</span
            ><button @click="inspect(i)">{{ works[i][0] }}</button>
          </li>
        </ol>
        <button @click="go('start')">Continue this route</button
        ><button @click="reset">Begin again at the centre</button>
        <h2>The complete index</h2>
        <div class="index">
          <button v-for="(w, i) in works" :key="w[0]" @click="inspect(i)">
            {{ i + 1 }} / {{ w[0] }} {{ route.includes(i) ? '✓' : '' }}
          </button>
        </div>
      </section>
    </main>
    <footer>
      RULEWALK / Original fictional exhibition / Constraints for looking, not for winning.
    </footer>
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
  padding: 25px 4%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  border-bottom: 2px solid;
}
header strong {
  font: 28px var(--heading);
}
header span {
  font-size: 10px;
}
button {
  background: transparent;
  border: 1px solid;
  padding: 10px 15px;
}
header button {
  font-size: 11px;
}
.rule-banner {
  display: flex;
  justify-content: space-between;
  gap: 35px;
  align-items: end;
  padding: 35px 5%;
}
.rule-banner h1 {
  font: clamp(35px, 4.5vw, 60px)/1.05 var(--heading);
  letter-spacing: -0.045em;
  max-width: 750px;
  margin: 0;
}
.rule-banner label {
  font-size: 11px;
  min-width: 230px;
}
.rule-banner select {
  display: block;
  background: transparent;
  color: inherit;
  border: 1px solid;
  padding: 10px;
  margin-top: 10px;
  width: 100%;
  font-size: 12px;
}
.board-area {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  padding: 15px 5% 55px;
}
.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.board > button {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: space-between;
  background: #f4f0d9;
  border: 2px solid;
  border-radius: 45% 45% 12% 12%;
  padding: 25px;
}
.board > button:nth-child(2n) {
  border-radius: 12% 12% 45% 45%;
  background: #d29fc3;
}
.board > button:disabled {
  opacity: 1;
  background: #dcdf69;
  color: #555735;
  border-style: dashed;
}
.board > button.current {
  background: #5844a3;
  color: #fff4d6;
  border-color: #24273d;
}
.board > button > span {
  font: 50px/1 var(--heading);
}
.board strong {
  font: 13px/1.4 var(--body);
  margin: 12px 0;
}
.board b {
  font-size: 9px;
}
.board-area aside {
  padding: 25px 0;
  align-self: center;
}
.board-area aside > span {
  font-size: 10px;
  letter-spacing: 0.1em;
}
.board-area aside > p:first-of-type {
  font: 25px/1.5 var(--body);
  margin: 20px 0 40px;
}
.board-area aside h2 {
  font: 26px var(--heading);
}
.board-area aside p {
  font-size: 16px;
  line-height: 1.8;
}
.board-area aside button {
  display: block;
  margin-top: 15px;
  font-size: 12px;
}
.board-area aside small {
  display: block;
  margin-top: 30px;
  font-size: 11px;
  max-width: 250px;
}
.work,
.route {
  padding: 35px 7% 70px;
}
.number {
  display: block;
  font: 170px/1 var(--heading);
  color: #5844a3;
  margin-top: 30px;
}
.work h1,
.route h1 {
  font: clamp(45px, 6vw, 85px)/1.05 var(--heading);
  letter-spacing: -0.04em;
  margin: 25px 0;
}
.lead {
  font: clamp(24px, 3vw, 37px)/1.7 var(--body);
  max-width: 36ch;
}
.rule-drawing {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 250px;
  margin: 35px 0;
}
.rule-drawing i {
  aspect-ratio: 1;
  border: 2px solid;
  border-radius: 50%;
}
.rule-drawing .marked {
  background: #5844a3;
}
.work h2 {
  font: 23px var(--heading);
}
.work > p:not(.lead) {
  font-size: 18px;
  line-height: 1.8;
}
.work > button,
.route > button {
  margin: 20px 20px 0 0;
}
.route ol {
  list-style: none;
  padding: 0;
  margin: 40px 0;
}
.route li {
  padding: 20px 0;
  border-top: 1px solid;
  display: flex;
  align-items: center;
  gap: 25px;
}
.route li span {
  font-size: 13px;
}
.route li button {
  font: 23px var(--body);
  border: 0;
  text-align: left;
}
.route h2 {
  margin-top: 50px;
  font: 25px var(--heading);
}
.index {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 12px;
}
footer {
  padding: 22px 4%;
  font-size: 10px;
  border-top: 2px solid;
}
@media (max-width: 750px) {
  header {
    flex-wrap: wrap;
  }
  .rule-banner {
    display: block;
    padding: 30px 5%;
  }
  .rule-banner h1 {
    font-size: 36px;
  }
  .rule-banner label {
    display: block;
    margin-top: 25px;
  }
  .board-area {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .board {
    gap: 7px;
  }
  .board > button {
    padding: 15px 9px;
    min-height: 150px;
  }
  .board > button > span {
    font-size: 34px;
  }
  .board strong {
    font-size: 10px;
  }
  .board b {
    font-size: 7px;
  }
  .board-area aside {
    padding: 10px 0;
  }
  .board-area aside > p:first-of-type {
    font-size: 22px;
    margin-bottom: 25px;
  }
  .work,
  .route {
    padding: 30px 5%;
  }
  .route li {
    gap: 15px;
  }
  .route li button {
    font-size: 20px;
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
</style>
