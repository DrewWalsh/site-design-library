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
    .filter((k) => k.startsWith('design-library:08:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const chapters = [
  'The river before us',
  'A system beneath the streets',
  'The work of keeping water moving',
  'What was left behind',
  'A different kind of future',
];
const captions = ref(false);
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>FIELD DOCUMENTS / 004</strong>
      <nav>
        <button @click="go('chapters')">Chapters</button
        ><button @click="go('reading')">Plain reading</button
        ><button @click="go('start')">The story</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="cover">
          <img
            class=""
            src="/art/lake.webp"
            alt="A still lake ringed by wooded slopes"
            width="1200"
            height="900"
            loading="lazy"
          />
          <div>
            <p class="eyebrow">A NORTHBANK STORY IN FIVE CHAPTERS</p>
            <h1>The river<br />remembers.</h1>
            <p>Following the water through a town<br />that learned to live around it.</p>
            <a href="#chapter-one">Begin the story ↓</a>
          </div>
          <span>Illustrative landscape / fictional account</span>
        </section>
        <section class="chapter" id="chapter-one">
          <aside>01 / BEFORE US</aside>
          <article>
            <h2>A line through<br />the landscape.</h2>
            <p>
              Before the roads, there was the river. It set the shape of the valley and the pace of
              the work. The town arrived later, building its routes around a movement it could never
              entirely control.
            </p>
            <p>
              This is a fictional account of an ordinary water system: the intake, the settling
              tank, the valve house, and the people who maintained them.
            </p>
          </article>
        </section>
        <section class="mechanism">
          <div>
            <p class="eyebrow">02 / BENEATH THE STREETS</p>
            <h2>A simple system.<br />A complicated history.</h2>
            <p>Gravity did most of the work. Three places made that work useful.</p>
            <button @click="captions = !captions">
              {{ captions ? 'Hide' : 'Show' }} evidence captions
            </button>
          </div>
          <figure>
            <svg
              viewBox="0 0 620 280"
              role="img"
              aria-label="Water flows from the river intake through a settling tank to the town"
            >
              <path d="M20 60H170V160H390V230H590" fill="none" stroke="#729594" stroke-width="14" />
              <rect
                x="120"
                y="35"
                width="100"
                height="75"
                fill="#d6c7a3"
                stroke="#233b3a"
                stroke-width="2"
              />
              <rect
                x="295"
                y="120"
                width="150"
                height="90"
                fill="#d6c7a3"
                stroke="#233b3a"
                stroke-width="2"
              />
              <path
                d="M490 230V150L540 110L590 150V230"
                fill="#d6c7a3"
                stroke="#233b3a"
                stroke-width="2"
              />
              <g fill="#233b3a" font-family="sans-serif" font-size="16">
                <text x="115" y="24">01 INTAKE</text>
                <text x="293" y="108">02 SETTLING TANK</text>
                <text x="490" y="265">03 TOWN</text>
              </g>
            </svg>
            <figcaption>Water travels downhill through three controlled stages.</figcaption>
            <p v-if="captions">
              Original explanatory diagram. Fictional system, not an engineering specification. The
              tank slows the flow before water enters the town supply.
            </p>
          </figure>
        </section>
        <section class="chapter">
          <aside>03–05 / AFTERLIVES</aside>
          <article>
            <h2>What do we keep<br />when the work is done?</h2>
            <p>
              The empty valve house became a marker on the walking route. People who had never seen
              it working still used it to describe where they were.
            </p>
            <button @click="go('reading')">Read the complete account →</button>
          </article>
        </section></template
      >
      <section v-else-if="state === 'chapters'" class="chapter-index">
        <p class="eyebrow">THE RIVER WORKS</p>
        <h1>Five ways<br />to follow the water.</h1>
        <button
          v-for="(chapter, i) in chapters"
          :key="chapter"
          @click="
            selected = i;
            go('reading');
          "
        >
          <span>0{{ i + 1 }}</span>
          <h2>{{ chapter }}</h2>
          <b>→</b>
        </button>
      </section>
      <article v-else class="continuous">
        <p class="eyebrow">CONTINUOUS READING / FICTIONAL DOCUMENTARY</p>
        <h1>The River Works</h1>
        <section v-for="(chapter, i) in chapters" :key="chapter">
          <p class="eyebrow">CHAPTER 0{{ i + 1 }}</p>
          <h2>{{ chapter }}</h2>
          <p>
            {{
              [
                'The river shaped the town before the town had a name. Its curves determined where people crossed, gathered, and built.',
                'Below the streets, a simple system carried water from the intake to a settling tank. Gravity connected places that seemed unrelated above ground.',
                'Keeping the system working was a daily practice of inspection and repair. Small signs mattered: a change in sound, a damp patch, a valve that resisted.',
                'When the system closed, its buildings remained. They became landmarks, storage rooms, and questions about what a town owes its past.',
                'The old route now offers a way to understand the landscape. A useful future can begin with paying attention to what is already here.',
              ][i]
            }}
          </p>
          <p>
            All people, infrastructure, and events in this account are invented for the design
            specimen. The narrative demonstrates pacing and evidence without presenting fictional
            research as fact.
          </p>
        </section>
        <button @click="go('start')">Return to visual story →</button>
      </article>
    </main>
    <footer class="specimen-note">
      <span>The River Works · Fictional sample content · Design reference 08</span
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
@font-face {
  font-family: 'Libre Baskerville';
  src: url('/fonts/libre-baskerville.woff2') format('woff2');
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
  color: #151e1d;
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
  gap: 25px;
  padding: 20px 5%;
  background: #1e2b2a;
  color: #efede4;
  font-family: 'DM Sans';
  font-size: 11px;
}
nav {
  display: flex;
  gap: 25px;
}
nav button {
  border: 0;
  background: none;
  color: inherit;
  padding: 0;
  font: 11px 'DM Sans';
  min-height: 25px;
}
.cover {
  height: 720px;
  position: relative;
  color: white;
  background: #1e2b2a;
}
.cover > img {
  width: 100%;
  height: 100%;
  filter: brightness(0.36);
}
.cover > div {
  position: absolute;
  top: 70px;
  left: 9%;
}
.cover h1 {
  font-family: 'DM Sans';
  font-size: 110px;
  line-height: 1.02;
  max-width: 760px;
  font-weight: 500;
  margin: 25px 0;
}
.cover p:not(.eyebrow) {
  font: 18px/1.8 'Libre Baskerville';
}
.cover a {
  display: inline-block;
  font: 12px 'DM Sans';
  margin-top: 25px;
}
.cover > span {
  position: absolute;
  bottom: 25px;
  left: 9%;
  font: 10px 'DM Sans';
  color: #d6d7ce;
}
.chapter {
  max-width: 1150px;
  margin: auto;
  padding: 85px 5%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 70px;
}
.chapter aside {
  font: 11px 'DM Sans';
  padding-top: 10px;
}
.chapter h2 {
  font-family: 'DM Sans';
  font-size: 48px;
  line-height: 1.15;
}
.chapter p {
  font: 16px/1.95 'Libre Baskerville';
}
.chapter button {
  font-family: 'DM Sans';
  font-size: 13px;
  margin-top: 15px;
}
.mechanism {
  padding: 65px 8%;
  background: #dce1d7;
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 65px;
  align-items: center;
}
.mechanism h2 {
  font-size: 38px;
}
.mechanism p {
  font-size: 14px;
}
.mechanism button {
  font: 12px 'DM Sans';
  background: transparent;
}
.mechanism figcaption {
  font: 12px 'DM Sans';
}
.chapter-index {
  max-width: 1200px;
  padding: 60px 5% 100px;
  margin: auto;
}
.chapter-index button {
  background: none;
  border: 0;
  border-top: 1px solid;
  display: flex;
  align-items: center;
  gap: 35px;
  width: 100%;
  padding: 25px 0;
  text-align: left;
  font-family: 'DM Sans';
}
.chapter-index button h2 {
  font-size: 32px;
  flex: 1;
}
.continuous {
  max-width: 760px;
  margin: auto;
  padding: 60px 30px 100px;
}
.continuous > h1 {
  font-size: 62px;
}
.continuous section {
  margin: 60px 0;
  font-size: 16px;
  line-height: 2;
}
.continuous section h2 {
  font: 31px 'DM Sans';
}
.continuous button {
  font-family: 'DM Sans';
}
@media (max-width: 600px) {
  header {
    display: block;
  }
  nav {
    margin-top: 18px;
    gap: 20px;
  }
  .cover {
    height: 650px;
  }
  .cover > div {
    left: 7%;
    top: 65px;
  }
  .cover h1 {
    font-size: 67px;
  }
  .cover p:not(.eyebrow) {
    font-size: 15px;
  }
  .chapter {
    display: block;
    padding: 45px 7%;
  }
  .chapter h2 {
    font-size: 36px;
  }
  .chapter p {
    font-size: 14px;
  }
  .mechanism {
    grid-template-columns: 1fr;
    gap: 25px;
    padding: 40px 7%;
  }
  .mechanism h2 {
    font-size: 31px;
  }
  .chapter-index button {
    gap: 18px;
  }
  .chapter-index button h2 {
    font-size: 24px;
  }
  .continuous > h1 {
    font-size: 45px;
  }
}
</style>
