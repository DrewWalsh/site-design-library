<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const form = ref(0),
  selected = ref(0),
  drawing = ref(false),
  points = ref<{ x: number; y: number }[]>([]),
  saved = useStored<number[]>('93:constellation', []),
  status = ref('Choose a form or draw one continuous stroke.');
const forms = ['Arch', 'Zigzag', 'Loop', 'Branch'];
const paths = [
  'M50 170Q160 -10 270 170',
  'M40 160L90 50 145 170 200 45 270 160',
  'M155 45C20 15 25 220 160 185S285 30 155 45',
  'M160 195V100M160 100L65 35M160 100L255 35',
];
const objects = [
  {
    name: 'A bridge in profile',
    shape: 0,
    source: 'Imagined river crossing / structural study',
    text: 'The arch carries the eye across an interval before it carries an imagined load. Its continuous curve makes two separate banks appear to belong to one gesture.',
  },
  {
    name: 'The bent reed',
    shape: 0,
    source: 'Original botanical line study',
    text: 'A reed bends without forming a joint. The curve records flexibility: a temporary shape held by wind, rather than a permanent decision in the material.',
  },
  {
    name: 'A folded path',
    shape: 1,
    source: 'Imagined hillside route / plan study',
    text: 'The path turns to make a steep distance manageable. Its zigzag is a record of negotiation between a destination and the effort of reaching it.',
  },
  {
    name: 'The open loop',
    shape: 2,
    source: 'Original wire object / contour study',
    text: 'A loop almost closes around an empty centre. The small gap keeps the line from becoming a boundary, giving the shape a direction as well as an inside.',
  },
  {
    name: 'A meeting of streams',
    shape: 3,
    source: 'Imagined watershed / branching study',
    text: 'Three channels meet at a common point. Seen one way they gather; seen another they divide. The same form can describe opposite movements.',
  },
  {
    name: 'A forked tool',
    shape: 3,
    source: 'Original workshop object / silhouette study',
    text: 'The handle divides to hold two points at a fixed distance. Branching turns one action of the hand into two coordinated contacts.',
  },
];
const matches = computed(() =>
  objects.map((o, i) => ({ ...o, i })).filter((o) => o.shape === form.value),
);
const stroke = computed(() =>
  points.value.map((p, i) => (i ? 'L' : 'M') + p.x + ' ' + p.y).join(' '),
);
function point(e: PointerEvent) {
  const svg = e.currentTarget as SVGSVGElement;
  const local = new DOMPoint(e.clientX, e.clientY).matrixTransform(svg.getScreenCTM()!.inverse());
  return { x: Math.max(0, Math.min(900, local.x)), y: Math.max(0, Math.min(340, local.y)) };
}
function down(e: PointerEvent) {
  (e.currentTarget as SVGSVGElement).setPointerCapture(e.pointerId);
  drawing.value = true;
  points.value = [point(e)];
}
function move(e: PointerEvent) {
  if (drawing.value) points.value.push(point(e));
}
function up() {
  if (!drawing.value) return;
  drawing.value = false;
  const p = points.value;
  if (p.length < 5) {
    status.value = 'Use a longer stroke, or choose a labelled form.';
    return;
  }
  const a = p[0],
    b = p[p.length - 1];
  let turns = 0,
    last = 0;
  for (let i = 2; i < p.length; i++) {
    const dy = p[i].y - p[i - 2].y;
    if (Math.abs(dy) > 7) {
      const sign = Math.sign(dy);
      if (last && sign !== last) turns++;
      last = sign;
    }
  }
  const close = Math.hypot(a.x - b.x, a.y - b.y) < 80;
  form.value = close ? 2 : turns >= 3 ? 1 : 0;
  status.value =
    'Closest simple form: ' +
    forms[form.value] +
    '. This fixture matcher uses closure and direction changes; choose Branch for a multi-stroke shape.';
}
function choose(i: number) {
  form.value = i;
  points.value = [];
  status.value = 'Showing ' + forms[i].toLowerCase() + ' forms.';
}
function open(i: number) {
  selected.value = i;
  go('object');
}
function keep() {
  if (!saved.value.includes(selected.value)) saved.value.push(selected.value);
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>

    <header>
      <strong>LINEAGE</strong><span>AN ARCHIVE FOUND BY FORM</span
      ><button @click="go('constellation')">Your constellation ({{ saved.length }})</button>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><div class="opening">
          <h1>What does<br />your line remember?</h1>
          <p>Draw a shape, or choose one below.<br />Follow its resemblance into the archive.</p>
        </div>
        <div class="drawing-pad">
          <svg
            viewBox="0 0 900 340"
            role="img"
            aria-label="Drawing surface. Shape buttons below provide the same searches."
            @pointerdown="down"
            @pointermove="move"
            @pointerup="up"
            @pointercancel="drawing = false"
          >
            <defs>
              <pattern id="dots93" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="1" fill="#b5b5ab" />
              </pattern>
            </defs>
            <rect width="900" height="340" fill="url(#dots93)" />
            <path
              v-if="!points.length"
              :d="paths[form]"
              transform="translate(210 25) scale(1.6)"
              fill="none"
              stroke="#343632"
              stroke-width="5"
              stroke-linecap="round"
            />
            <path
              v-else
              :d="stroke"
              fill="none"
              stroke="#343632"
              stroke-width="6"
              stroke-linecap="round"
              stroke-linejoin="round"
            /></svg
          ><span>ONE CONTINUOUS STROKE / OR A FORM BELOW</span>
        </div>
        <nav class="forms" aria-label="Choose a form">
          <button
            v-for="(name, i) in forms"
            :key="name"
            :aria-pressed="form === i"
            @click="choose(i)"
          >
            <svg viewBox="0 0 320 220" aria-hidden="true">
              <path :d="paths[i]" fill="none" stroke="currentColor" stroke-width="10" /></svg
            >{{ name }}</button
          ><button
            @click="
              points = [];
              status = 'Drawing cleared. Choose or draw a form.';
            "
          >
            Clear drawing
          </button>
        </nav>
        <p class="match-status" role="status">{{ status }}</p>
        <div class="matches">
          <span>{{ matches.length }} RESONANCES / {{ forms[form].toUpperCase() }}</span
          ><button v-for="o in matches" :key="o.name" @click="open(o.i)">
            <b>0{{ o.i + 1 }}</b
            ><strong>{{ o.name }}</strong
            ><small>{{ o.source }}</small
            ><span>Follow the line ↗</span>
          </button>
        </div></template
      >
      <article v-else-if="state === 'object'" class="object">
        <button @click="go('start')">← Return to the drawing</button
        ><span>OBJECT 0{{ selected + 1 }} / {{ forms[objects[selected].shape] }}</span>
        <h1>{{ objects[selected].name }}</h1>
        <svg viewBox="0 0 320 220" aria-hidden="true">
          <path
            :d="paths[objects[selected].shape]"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
          />
        </svg>
        <p class="lead">{{ objects[selected].text }}</p>
        <dl>
          <dt>Provenance</dt>
          <dd>{{ objects[selected].source }}</dd>
          <dt>Retrieval reason</dt>
          <dd>
            A shared {{ forms[objects[selected].shape].toLowerCase() }} structure, not a claim that
            the objects share a history.
          </dd>
        </dl>
        <button @click="keep">
          {{ saved.includes(selected) ? 'In your constellation ✓' : 'Keep this form' }}</button
        ><button @click="open((selected + 1) % 6)">Next archive object →</button>
      </article>
      <section v-else class="constellation">
        <h1>Resemblances<br />you chose to keep.</h1>
        <p>
          Saved locally. The connections are yours; the objects retain their individual source
          notes.
        </p>
        <div class="kept">
          <button v-for="i in saved" :key="i" @click="open(i)">
            <svg viewBox="0 0 320 220" aria-hidden="true">
              <path
                :d="paths[objects[i].shape]"
                fill="none"
                stroke="currentColor"
                stroke-width="5"
              /></svg
            >{{ objects[i].name }}
          </button>
        </div>
        <p v-if="!saved.length">No forms kept yet.</p>
        <button @click="go('start')">Draw another connection</button
        ><button @click="saved = []">Clear constellation</button>
        <details>
          <summary>All six archive objects</summary>
          <button v-for="(o, i) in objects" :key="o.name" @click="open(i)">{{ o.name }}</button>
        </details>
      </section>
    </main>
    <footer>
      LINEAGE / Original form studies / Deterministic local retrieval, no image uploads.
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Libre Baskerville';
  src: url('/fonts/libre-baskerville.woff2') format('woff2');
  font-weight: 400 700;
  font-display: swap;
}
@font-face {
  font-family: 'IBM Plex Mono';
  src: url('/fonts/ibm-plex-mono.woff2') format('woff2');
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
  padding: 25px 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid #a5a69c;
}
header strong {
  font: 30px var(--heading);
  letter-spacing: -0.06em;
}
header span {
  font-size: 9px;
}
button {
  border: 0;
  border-bottom: 1px solid;
  background: transparent;
  padding: 10px 5px;
}
header button {
  font-size: 10px;
}
.opening {
  padding: 40px 6% 25px;
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 30px;
}
.opening h1 {
  font: clamp(40px, 5vw, 68px)/1.17 var(--heading);
  letter-spacing: -0.05em;
  margin: 0;
}
.opening p {
  font-size: 11px;
  line-height: 1.9;
  margin: 0;
}
.drawing-pad {
  margin: 15px 6% 0;
  border: 1px solid #a5a69c;
  position: relative;
  background: #f8f7f1;
}
.drawing-pad svg {
  display: block;
  width: 100%;
  height: 340px;
  touch-action: none;
  cursor: crosshair;
}
.drawing-pad > span {
  position: absolute;
  bottom: 12px;
  left: 18px;
  font-size: 8px;
  color: #5c6057;
  pointer-events: none;
}
.forms {
  padding: 20px 6%;
  gap: 20px;
  align-items: center;
}
.forms button {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 11px;
  padding: 10px 20px;
  border: 1px solid #a5a69c;
}
.forms button[aria-pressed='true'] {
  background: #343632;
  color: #efeee8;
}
.forms svg {
  width: 45px;
  height: 35px;
}
.forms button:last-child {
  margin-left: auto;
  border: 0;
}
.match-status {
  padding: 0 6%;
  font-size: 10px;
  line-height: 1.9;
  max-width: 1000px;
}
.matches {
  padding: 25px 6% 50px;
  display: flex;
  gap: 30px;
  align-items: stretch;
  border-top: 1px solid #a5a69c;
}
.matches > span {
  font-size: 9px;
  writing-mode: vertical-rl;
}
.matches > button {
  text-align: left;
  flex: 1;
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 12px;
  align-content: start;
  border: 0;
}
.matches b {
  white-space: nowrap;
  font-size: 42px;
  font: 42px var(--heading);
  color: #6b4c35;
  grid-row: 1/4;
}
.matches strong {
  font: 25px var(--heading);
  letter-spacing: -0.04em;
}
.matches small {
  font-size: 9px;
}
.matches button > span {
  font-size: 10px;
  margin-top: 15px;
}
.object,
.constellation {
  padding: 35px 7% 70px;
}
.object > span {
  display: block;
  margin-top: 35px;
  font-size: 10px;
}
.object h1,
.constellation h1 {
  font: clamp(42px, 5.5vw, 75px)/1.15 var(--heading);
  letter-spacing: -0.05em;
  margin: 25px 0;
}
.object > svg {
  width: 100%;
  height: 300px;
  border-block: 1px solid #a5a69c;
  margin: 20px 0;
}
.lead {
  font: 27px/1.8 var(--heading);
  max-width: 38ch;
}
dl {
  font-size: 12px;
  line-height: 1.8;
  margin: 35px 0;
}
dt {
  color: #6b4c35;
  margin-top: 20px;
}
dd {
  margin: 8px 0;
  max-width: 600px;
}
.object > button,
.constellation > button {
  margin: 20px 25px 0 0;
  font-size: 12px;
}
.kept {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin: 40px 0;
}
.kept button {
  width: 250px;
  font: 22px var(--heading);
  border: 1px solid;
  padding: 20px;
}
.kept svg {
  height: 150px;
  display: block;
  width: 100%;
}
details {
  margin-top: 40px;
  font-size: 12px;
}
details button {
  display: block;
}
footer {
  padding: 22px 5%;
  font-size: 9px;
  border-top: 1px solid #a5a69c;
}
@media (max-width: 700px) {
  header {
    flex-wrap: wrap;
  }
  .opening {
    display: block;
    padding: 30px 5%;
  }
  .opening h1 {
    font-size: 40px;
  }
  .opening p {
    margin-top: 25px;
  }
  .drawing-pad {
    margin: 0 5%;
  }
  .drawing-pad svg {
    height: 260px;
  }
  .forms {
    gap: 10px;
    padding: 20px 5%;
  }
  .forms button {
    padding: 8px 12px;
    gap: 7px;
  }
  .forms svg {
    width: 30px;
  }
  .forms button:last-child {
    margin-left: 0;
  }
  .matches {
    flex-direction: column;
    gap: 25px;
    padding: 25px 5%;
  }
  .matches > span {
    writing-mode: initial;
  }
  .matches > button {
    padding: 15px 0;
    border-bottom: 1px solid #a5a69c;
  }
  .matches strong {
    font-size: 23px;
  }
  .object,
  .constellation {
    padding: 30px 5%;
  }
  .lead {
    font-size: 23px;
  }
  .object > svg {
    height: 230px;
  }
  .kept button {
    width: 100%;
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
