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
    .filter((k) => k.startsWith('design-library:37:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const chapter = ref(1);
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>NEIGHBOURHOOD<br />MYTHOLOGIES</strong>
      <nav>
        <button @click="go('chapters')">Chapters</button
        ><button @click="go('transcript')">Text transcript</button>
      </nav>
      <span>SMALL STORIES / SHARED PLACES</span>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><div class="story-heading">
          <span class="chapter">CHAPTER 0{{ chapter }}</span>
          <h1>
            {{ chapter === 1 ? 'The bench that knew everyone.' : 'The clock that took its time.' }}
          </h1>
          <p>An original fictional story from a town that could be anywhere.</p>
        </div>
        <section class="panels">
          <figure class="panel establish">
            <svg
              viewBox="0 0 600 320"
              role="img"
              aria-label="A quiet neighbourhood square with a clock tower"
            >
              <rect width="600" height="320" fill="#d9e6d8" />
              <circle cx="480" cy="60" r="35" fill="#f6e6a0" />
              <path
                d="M0 210L70 170L140 200L200 150L290 190L370 170L480 200L600 150V320H0Z"
                fill="#7d9984"
              />
              <g stroke="#293d3b" stroke-width="4">
                <path
                  d="M40 260V110H145V260M175 260V145H280V260M470 260V120H575V260"
                  fill="#c8b494"
                />
                <path d="M300 260V70H390V260" fill="#efe4c5" />
                <circle cx="345" cy="110" r="24" fill="#fff6db" />
                <path d="M345 93V110L357 118" fill="none" />
                <path d="M0 265H600" />
                <path
                  d="M165 230H280M180 230V260M267 230V260M165 220H280"
                  fill="none"
                  stroke-width="7"
                />
                <circle cx="410" cy="203" r="16" fill="#e2b6a0" />
                <path d="M410 222V260" stroke-width="20" />
              </g>
            </svg>
            <figcaption>
              Every town has a place where nothing seems to happen.<br />Until you sit there long
              enough.
            </figcaption>
            <span class="caption-label">NORTHBANK / JUST AFTER FOUR</span>
          </figure>
          <figure class="panel close">
            <svg viewBox="0 0 600 320" role="img" aria-label="A figure beside an old public bench">
              <rect width="600" height="320" fill="#edcf9d" />
              <circle cx="480" cy="60" r="35" fill="#f6e6a0" />
              <path
                d="M0 210L70 170L140 200L200 150L290 190L370 170L480 200L600 150V320H0Z"
                fill="#7d9984"
              />
              <g stroke="#293d3b" stroke-width="4">
                <path
                  d="M40 260V110H145V260M175 260V145H280V260M470 260V120H575V260"
                  fill="#c8b494"
                />
                <path d="M300 260V70H390V260" fill="#efe4c5" />
                <circle cx="345" cy="110" r="24" fill="#fff6db" />
                <path d="M345 93V110L357 118" fill="none" />
                <path d="M0 265H600" />
                <path
                  d="M165 230H280M180 230V260M267 230V260M165 220H280"
                  fill="none"
                  stroke-width="7"
                />
                <circle cx="340" cy="203" r="16" fill="#e2b6a0" />
                <path d="M340 222V260" stroke-width="20" />
              </g>
            </svg>
            <div class="speech">“Someone always gets here before me.”</div>
            <figcaption>Mara had been saying this for twenty years.</figcaption>
          </figure>
          <figure class="panel pause">
            <svg viewBox="0 0 600 320" role="img" aria-label="The bench under a wide evening sky">
              <rect width="600" height="320" fill="#eab598" />
              <circle cx="480" cy="60" r="35" fill="#f6e6a0" />
              <path
                d="M0 210L70 170L140 200L200 150L290 190L370 170L480 200L600 150V320H0Z"
                fill="#7d9984"
              />
              <g stroke="#293d3b" stroke-width="4">
                <path
                  d="M40 260V110H145V260M175 260V145H280V260M470 260V120H575V260"
                  fill="#c8b494"
                />
                <path d="M300 260V70H390V260" fill="#efe4c5" />
                <circle cx="345" cy="110" r="24" fill="#fff6db" />
                <path d="M345 93V110L357 118" fill="none" />
                <path d="M0 265H600" />
                <path
                  d="M165 230H280M180 230V260M267 230V260M165 220H280"
                  fill="none"
                  stroke-width="7"
                />
                <circle cx="410" cy="203" r="16" fill="#e2b6a0" />
                <path d="M410 222V260" stroke-width="20" />
              </g>
            </svg>
            <figcaption>The bench had heard it before.<br />It was good at listening.</figcaption>
          </figure>
          <figure class="panel wide">
            <svg viewBox="0 0 600 320" role="img" aria-label="Two neighbours talking in the square">
              <rect width="600" height="320" fill="#d5dfeb" />
              <circle cx="480" cy="60" r="35" fill="#f6e6a0" />
              <path
                d="M0 210L70 170L140 200L200 150L290 190L370 170L480 200L600 150V320H0Z"
                fill="#7d9984"
              />
              <g stroke="#293d3b" stroke-width="4">
                <path
                  d="M40 260V110H145V260M175 260V145H280V260M470 260V120H575V260"
                  fill="#c8b494"
                />
                <path d="M300 260V70H390V260" fill="#efe4c5" />
                <circle cx="345" cy="110" r="24" fill="#fff6db" />
                <path d="M345 93V110L357 118" fill="none" />
                <path d="M0 265H600" />
                <path
                  d="M165 230H280M180 230V260M267 230V260M165 220H280"
                  fill="none"
                  stroke-width="7"
                />
                <circle cx="340" cy="203" r="16" fill="#e2b6a0" />
                <path d="M340 222V260" stroke-width="20" />
                <circle cx="365" cy="203" r="16" fill="#d7b190" />
                <path d="M365 222V260" stroke-width="20" />
              </g>
            </svg>
            <div class="speech">“You’re not late.<br />We just started early.”</div>
            <figcaption>
              And that, more or less, was how a neighbourhood kept its stories.
            </figcaption>
          </figure>
        </section>
        <section class="end">
          <p class="eyebrow">END OF CHAPTER 0{{ chapter }}</p>
          <h2>Some places are made<br />of conversations.</h2>
          <button
            class="primary"
            @click="
              chapter = chapter === 1 ? 2 : 1;
              go('start');
            "
          >
            Read chapter 0{{ chapter === 1 ? 2 : 1 }} →</button
          ><button @click="go('transcript')">Read the full text transcript</button>
        </section></template
      >
      <article v-else-if="state === 'transcript'" class="transcript">
        <p class="eyebrow">CHAPTER 01 / COMPLETE TEXT & IMAGE DESCRIPTIONS</p>
        <h1>The bench that knew everyone.</h1>
        <section
          v-for="(caption, i) in [
            'Every town has a place where nothing seems to happen. Until you sit there long enough.',
            '“Someone always gets here before me.” Mara had been saying this for twenty years.',
            'The bench had heard it before. It was good at listening.',
            '“You’re not late. We just started early.” And that, more or less, was how a neighbourhood kept its stories.',
          ]"
          :key="i"
        >
          <h2>Panel 0{{ i + 1 }}</h2>
          <p class="description">
            {{
              [
                'Establishing illustration: a quiet square, small buildings, a clock tower, and an empty bench.',
                'A figure stands near the bench. A speech balloon contains Mara’s remark.',
                'A wider view of the bench beneath an evening sky creates a pause in the story.',
                'Two neighbours stand together in the square. The reply appears in a speech balloon.',
              ][i]
            }}
          </p>
          <p>{{ caption }}</p>
        </section>
        <button @click="go('start')">Return to the illustrated chapter</button>
      </article>
      <section v-else class="chapter-index">
        <p class="eyebrow">THE STORIES SO FAR</p>
        <h1>A town, told<br />one piece at a time.</h1>
        <button
          v-for="(title, i) in ['The bench that knew everyone', 'The clock that took its time']"
          :key="title"
          @click="
            chapter = i + 1;
            go('start');
          "
        >
          <span>0{{ i + 1 }}</span>
          <h2>{{ title }}</h2>
          <b>READ →</b>
        </button>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Neighbourhood Mythologies · Fictional sample content · Design reference 37</span
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
  padding: 25px 5%;
  display: flex;
  align-items: center;
  gap: 35px;
  border-bottom: 3px solid;
}
header strong {
  font: 21px/1.05 'Space Grotesk';
  font-weight: 700;
  letter-spacing: -0.04em;
}
nav {
  display: flex;
  gap: 20px;
}
nav button {
  font-size: 11px;
  background: none;
  border: 0;
}
header > span {
  font-size: 9px;
  margin-left: auto;
  letter-spacing: 0.08em;
}
main {
  max-width: 1350px;
  margin: auto;
  padding: 45px 5% 80px;
}
.story-heading {
  text-align: center;
  padding-bottom: 35px;
}
.chapter {
  font-size: 10px;
  border: 2px solid;
  padding: 8px 13px;
  background: #edca8f;
}
.story-heading h1 {
  font: 55px/1.1 'Space Grotesk';
  font-weight: 700;
  white-space: pre-line;
  letter-spacing: -0.04em;
  margin: 30px 0 20px;
}
.story-heading p {
  font-size: 13px;
  margin: auto;
}
.panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}
.panel {
  border: 3px solid #293d3b;
  background: #fff4df;
  position: relative;
  overflow: hidden;
}
.panel svg {
  width: 100%;
  display: block;
}
.panel figcaption {
  margin: 0;
  padding: 20px;
  font-size: 14px;
  line-height: 1.7;
  border-top: 2px solid;
}
.establish {
  grid-column: 1/-1;
}
.establish svg {
  max-height: 370px;
  object-fit: cover;
}
.caption-label {
  position: absolute;
  top: 15px;
  left: 15px;
  background: #f5e5ba;
  border: 2px solid;
  padding: 8px 12px;
  font-size: 9px;
}
.speech {
  position: absolute;
  top: 20px;
  left: 20px;
  border: 2px solid;
  border-radius: 40% 45% 30% 0;
  background: #fff9e9;
  padding: 18px 23px;
  font: 18px/1.35 'Space Grotesk';
  max-width: 270px;
}
.pause svg {
  filter: saturate(0.6);
}
.wide {
  grid-column: 1/-1;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
}
.wide figcaption {
  display: flex;
  align-items: center;
  border-top: 0;
  border-left: 2px solid;
  font-size: 21px;
  line-height: 1.6;
  padding: 35px;
}
.wide .speech {
  font-size: 16px;
  top: 20px;
  left: 35px;
}
.end {
  text-align: center;
  padding: 50px 0 10px;
}
.end h2 {
  font-size: 34px;
  line-height: 1.3;
}
.end button {
  font-size: 11px;
  margin: 10px;
  padding: 15px 20px;
  border: 2px solid;
}
.transcript {
  max-width: 780px;
  margin: auto;
}
.transcript h1 {
  font-size: 50px;
}
.transcript section {
  border-top: 2px solid;
  padding: 25px 0;
}
.transcript h2 {
  font-size: 25px;
}
.transcript p {
  font-size: 16px;
}
.description {
  font-size: 13px !important;
  color: #4e6052;
}
.chapter-index {
  min-height: 800px;
}
.chapter-index > button {
  background: none;
  border: 0;
  border-top: 2px solid;
  display: flex;
  align-items: center;
  gap: 30px;
  width: 100%;
  text-align: left;
  padding: 30px 0;
}
.chapter-index h2 {
  font-size: 30px;
  flex: 1;
}
.chapter-index b {
  font-size: 11px;
}
@media (max-width: 600px) {
  header {
    padding: 22px;
    gap: 15px;
    flex-wrap: wrap;
  }
  header strong {
    font-size: 18px;
  }
  header > span {
    display: none;
  }
  nav {
    gap: 15px;
  }
  nav button {
    font-size: 10px;
  }
  .story-heading h1 {
    font-size: 39px;
  }
  .panels {
    display: block;
  }
  .panel {
    margin-bottom: 22px;
  }
  .panel figcaption {
    font-size: 12px;
    padding: 17px;
  }
  .speech {
    font-size: 13px;
    padding: 11px 16px;
    max-width: 190px;
    top: 12px;
    left: 12px;
  }
  .caption-label {
    font-size: 7px;
    padding: 5px;
    top: 10px;
    left: 10px;
  }
  .wide {
    display: block;
  }
  .wide figcaption {
    border-left: 0;
    border-top: 2px solid;
  }
  .wide .speech {
    font-size: 12px;
    top: 12px;
    left: 15px;
  }
  .end h2 {
    font-size: 28px;
  }
  .transcript h1 {
    font-size: 37px;
  }
  .chapter-index h2 {
    font-size: 22px;
  }
  .chapter-index > button {
    gap: 15px;
  }
  .chapter-index b {
    display: none;
  }
}
</style>
