<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const scale = ref(0);
const scales = [
  {
    name: 'Fibre',
    unit: '0.1 mm',
    title: 'A twist holds it together.',
    text: 'At this scale, strength is a relation between many small strands. None runs the whole distance alone. A slight twist turns their separate lengths into something that can be handled as one.',
    question: 'What makes a material hold?',
  },
  {
    name: 'Cloth',
    unit: '10 cm',
    title: 'A crossing becomes a surface.',
    text: 'Warp and weft alternate which passes above the other. The repeated crossing distributes tension and makes a flexible surface from lines. A pattern is also a way of sharing force.',
    question: 'How do small decisions become a structure?',
  },
  {
    name: 'Garment',
    unit: '1 m',
    title: 'The surface meets a body.',
    text: 'Cutting interrupts the weave to make room for movement. Seams reconnect the pieces around shoulders, elbows and the ordinary gestures of a day. The material acquires a human scale.',
    question: 'Whose movements shape the object?',
  },
  {
    name: 'Workshop',
    unit: '10 m',
    title: 'Making is a shared room.',
    text: 'The garment belongs to a sequence of work: cutting, sewing, pressing, checking. Tables, light and the distances between people shape the process as surely as the pattern does.',
    question: 'What conditions make the work possible?',
  },
  {
    name: 'Town',
    unit: '1 km',
    title: 'One thread enters a place.',
    text: 'The workshop is part of a town of homes, suppliers, repair shops and routes to work. At this scale, the material is also a relationship between people who may never meet.',
    question: 'Where does responsibility extend?',
  },
];
function zoom(n: number) {
  scale.value = Math.max(0, Math.min(4, scale.value + n));
}
</script>
<template>
  <div class="specimen" :class="{ entry: state === 'start' }">
    <a class="skip" href="#content">Skip to content</a>

    <header>
      <strong>ONE THREAD</strong><span>FIVE SCALES OF A SHARED MATERIAL</span
      ><button @click="go('journey')">The whole journey ↗</button>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><div class="scale-scene" :class="'scale-' + scale">
          <svg
            viewBox="0 0 1200 700"
            preserveAspectRatio="xMidYMid slice"
            role="img"
            :aria-label="
              'Original illustration at the ' + scales[scale].name.toLowerCase() + ' scale'
            "
          >
            <rect
              width="1200"
              height="700"
              :fill="['#d6c7a7', '#c6b597', '#ddcfb2', '#b7c1b2', '#c2cbb4'][scale]"
            />
            <g v-if="scale === 0" fill="none" stroke-linecap="round">
              <path
                v-for="i in 28"
                :key="i"
                :d="
                  'M-100 ' +
                  (i * 21 - 50) +
                  'C280 ' +
                  (i * 15 + 300) +
                  ' 700 ' +
                  (i * 18 - 150) +
                  ' 1300 ' +
                  (i * 20 + 200)
                "
                :stroke="i % 3 === 0 ? '#9c5f43' : i % 3 === 1 ? '#c79f70' : '#eee0bd'"
                stroke-width="12"
              />
              <path
                v-for="i in 10"
                :key="'fine' + i"
                :d="'M-100 ' + i * 60 + 'Q500 ' + (i * 30 + 400) + ' 1300 ' + (i * 65 - 180)"
                stroke="#614c3e"
                stroke-width="1"
                opacity=".5"
              />
            </g>
            <g v-if="scale === 1">
              <path
                v-for="i in 32"
                :key="i"
                :d="'M' + i * 40 + ' 0V700'"
                :stroke="i % 3 === 0 ? '#9c5f43' : '#dcccaa'"
                stroke-width="25"
              />
              <path
                v-for="i in 20"
                :key="'weft' + i"
                :d="'M0 ' + i * 38 + 'H1200'"
                :stroke="i % 3 === 0 ? '#586b5b' : '#e7d8b9'"
                stroke-width="20"
                opacity=".8"
              />
            </g>
            <g v-if="scale === 2" transform="translate(390 50)">
              <path
                d="M70 40L160 0H260L350 40 440 190 350 240 310 170V570H110V170L70 240-20 190Z"
                fill="#9c5f43"
                stroke="#5c4639"
                stroke-width="4"
              />
              <path
                d="M160 0Q210 110 260 0M210 70V570M110 370H310"
                fill="none"
                stroke="#d8b688"
                stroke-width="3"
              />
              <path
                d="M130 190H190V275H130ZM230 190H290V275H230Z"
                fill="none"
                stroke="#d8b688"
                stroke-width="3"
              />
              <circle v-for="i in 7" :key="i" cx="210" :cy="100 + i * 55" r="4" fill="#e0c59c" />
            </g>
            <g v-if="scale === 3">
              <path
                d="M100 500L600 180 1100 450 600 700Z"
                fill="#8d9e8d"
                stroke="#354a42"
                stroke-width="2"
              />
              <path
                d="M100 500V120L600 -20V180M1100 450V70L600 -20"
                fill="#d5d7c5"
                stroke="#354a42"
                stroke-width="3"
              />
              <path
                d="M160 150L480 55V230L160 400Z"
                fill="#a5bac0"
                stroke="#354a42"
                stroke-width="5"
              />
              <g
                v-for="i in 3"
                :key="i"
                :transform="'translate(' + (180 + i * 180) + ' ' + (340 + i * 15) + ')'"
              >
                <path
                  d="M0 0L150-70 260-10 110 60Z"
                  fill="#c5a271"
                  stroke="#354a42"
                  stroke-width="3"
                />
                <path d="M0 0V100M110 60V160M260-10V90" stroke="#354a42" stroke-width="8" />
                <path d="M80-20H140V-65H180V0H80Z" fill="#3d5048" />
              </g>
            </g>
            <g v-if="scale === 4">
              <path
                d="M-50 550Q300 250 550 480T1250 230"
                fill="none"
                stroke="#7c9eaa"
                stroke-width="80"
              />
              <path
                d="M0 180L1200 550M100 0L900 700M0 380L1200 100"
                stroke="#e9dfc5"
                stroke-width="35"
              />
              <g
                v-for="i in 42"
                :key="i"
                :transform="
                  'translate(' +
                  ((i % 7) * 170 + 45) +
                  ' ' +
                  (Math.floor(i / 7) * 115 + 30) +
                  ') rotate(-12)'
                "
              >
                <rect
                  width="75"
                  height="50"
                  :fill="i === 18 ? '#9c5f43' : '#8d9e80'"
                  stroke="#536450"
                  stroke-width="2"
                />
                <path d="M0 0L37-20 75 0" :fill="i === 18 ? '#6e4635' : '#6b805f'" />
              </g>
              <circle cx="725" cy="300" r="50" fill="none" stroke="#9c5f43" stroke-width="4" />
            </g>
          </svg>
          <div class="scene-caption">
            <span>SCALE 0{{ scale + 1 }} / {{ scales[scale].name.toUpperCase() }}</span>
            <h1>{{ scales[scale].title }}</h1>
            <button @click="go('story')">Read at this scale ↗</button>
          </div>
          <div class="ruler"><i></i>{{ scales[scale].unit }}<span>ILLUSTRATIVE SCALE</span></div>
          <div class="zoom-controls">
            <button @click="zoom(-1)" :disabled="scale === 0" aria-label="Zoom in one scale">
              +</button
            ><button @click="zoom(1)" :disabled="scale === 4" aria-label="Zoom out one scale">
              −
            </button>
          </div>
        </div>
        <nav class="scale-index" aria-label="Scale">
          <button
            v-for="(s, i) in scales"
            :key="s.name"
            :aria-pressed="scale === i"
            @click="scale = i"
          >
            <span>0{{ i + 1 }}</span
            >{{ s.name }}<small>{{ s.unit }}</small>
          </button>
        </nav>
        <div class="scale-question">
          <span>AT THIS SCALE, ASK</span>
          <p>{{ scales[scale].question }}</p>
          <button @click="go('journey')">Follow the material from end to end →</button>
        </div></template
      >
      <article v-else-if="state === 'story'" class="story">
        <button @click="go('start')">← Return to this scale</button
        ><span class="scale-unit">{{ scales[scale].unit }}</span>
        <h1>{{ scales[scale].title }}</h1>
        <p class="lead">{{ scales[scale].text }}</p>
        <h2>{{ scales[scale].question }}</h2>
        <p>
          The same material supports a different account at each level. No single scale is the
          complete explanation; the useful view depends on the decision being made.
        </p>
        <div class="story-scales">
          <button v-if="scale > 0" @click="zoom(-1)">← Closer: {{ scales[scale - 1].name }}</button
          ><button v-if="scale < 4" @click="zoom(1)">Wider: {{ scales[scale + 1].name }} →</button>
        </div>
      </article>
      <section v-else class="journey">
        <h1>From a fibre<br />to a place.</h1>
        <p>
          Five scales, one continuous material. This original fictional account illustrates semantic
          zoom, not a verified supply chain.
        </p>
        <ol>
          <li v-for="(s, i) in scales" :key="s.name">
            <span>{{ s.unit }}</span>
            <div>
              <h2>{{ s.name }} / {{ s.title }}</h2>
              <p>{{ s.text }}</p>
              <button
                @click="
                  scale = i;
                  go('start');
                "
              >
                Enter this scale ↗
              </button>
            </div>
          </li>
        </ol>
        <button
          @click="
            scale = 0;
            go('start');
          "
        >
          Begin again with one thread
        </button>
      </section>
    </main>
    <footer>
      ONE THREAD / Original vector illustrations / A change of scale is a change of question.
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/space-grotesk.woff2') format('woff2');
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
  padding: 24px 4%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid #8d907b;
}
header strong {
  font: 28px var(--heading);
  letter-spacing: -0.05em;
}
header span {
  font-size: 9px;
}
button {
  border: 1px solid;
  background: transparent;
  padding: 10px 15px;
}
header button {
  font-size: 11px;
}
.scale-scene {
  height: 700px;
  position: relative;
  overflow: hidden;
}
.scale-scene > svg {
  width: 100%;
  height: 100%;
  display: block;
}
.scene-caption {
  position: absolute;
  left: 5%;
  bottom: 45px;
  max-width: 650px;
  background: #e4d9c0ed;
  padding: 25px 30px;
}
.scene-caption > span {
  font-size: 10px;
  letter-spacing: 0.1em;
}
.scene-caption h1 {
  font: clamp(40px, 5.4vw, 74px)/1.05 var(--heading);
  letter-spacing: -0.055em;
  margin: 18px 0 25px;
}
.scene-caption button {
  font-size: 11px;
  border: 0;
  border-bottom: 1px solid;
  padding: 8px 0;
}
.ruler {
  position: absolute;
  right: 5%;
  top: 35px;
  font-size: 13px;
  background: #e4d9c0ed;
  padding: 18px;
  width: 160px;
}
.ruler i {
  display: block;
  height: 12px;
  border: 1px solid;
  border-top: 0;
  margin-bottom: 10px;
}
.ruler > span {
  display: block;
  font-size: 7px;
  letter-spacing: 0.1em;
  margin-top: 8px;
}
.zoom-controls {
  position: absolute;
  right: 5%;
  bottom: 45px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.zoom-controls button {
  width: 55px;
  height: 55px;
  font: 30px var(--heading);
  background: #e4d9c0;
}
.zoom-controls button:disabled {
  opacity: 0.7;
  background: #c8c0ac;
}
.scale-index {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
  border-block: 1px solid #8d907b;
  padding: 0 5%;
}
.scale-index button {
  text-align: left;
  border: 0;
  border-right: 1px solid #8d907b;
  padding: 22px;
  font: 24px var(--heading);
}
.scale-index button:first-child {
  border-left: 1px solid #8d907b;
}
.scale-index button[aria-pressed='true'] {
  background: #354a42;
  color: #e4d9c0;
}
.scale-index span {
  font: 9px var(--body);
  display: block;
  margin-bottom: 10px;
}
.scale-index small {
  font: 10px var(--body);
  display: block;
  margin-top: 10px;
}
.scale-question {
  padding: 35px 5%;
}
.scale-question > span {
  font-size: 9px;
  color: #73503a;
}
.scale-question p {
  font: 30px var(--heading);
  margin: 15px 0 25px;
}
.scale-question button {
  font-size: 11px;
}
.story,
.journey {
  padding: 35px 7% 70px;
}
.scale-unit {
  display: block;
  font: clamp(90px, 17vw, 210px)/1.1 var(--heading);
  letter-spacing: -0.07em;
  color: #945b43;
  margin-top: 35px;
}
.story h1,
.journey h1 {
  font: clamp(45px, 6vw, 85px)/1.05 var(--heading);
  letter-spacing: -0.055em;
  margin: 30px 0;
  max-width: 1000px;
}
.lead {
  font: clamp(24px, 3vw, 38px)/1.7 var(--heading);
  max-width: 38ch;
}
.story h2 {
  font: 30px var(--heading);
  border-top: 1px solid #8d907b;
  padding-top: 30px;
  margin-top: 40px;
}
.story > p:not(.lead) {
  font: 18px/1.8 var(--heading);
}
.story-scales {
  display: flex;
  justify-content: space-between;
  gap: 25px;
  margin-top: 40px;
  font-size: 12px;
}
.journey > p {
  font: 19px/1.8 var(--heading);
}
.journey ol {
  list-style: none;
  padding: 0;
  margin: 40px 0;
}
.journey li {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 35px;
  padding: 35px 0;
  border-top: 1px solid #8d907b;
}
.journey li > span {
  font: 35px var(--heading);
  color: #945b43;
}
.journey h2 {
  font: 29px var(--heading);
}
.journey li p {
  font: 20px/1.8 var(--heading);
}
.journey li button {
  font-size: 11px;
}
footer {
  padding: 22px 4%;
  font-size: 9px;
  border-top: 1px solid #8d907b;
}
@media (max-width: 700px) {
  header {
    flex-wrap: wrap;
  }
  .scale-scene {
    height: 650px;
  }
  .scene-caption {
    left: 5%;
    right: 5%;
    bottom: 25px;
    padding: 22px;
    max-width: none;
  }
  .scene-caption h1 {
    font-size: 43px;
  }
  .ruler {
    right: 5%;
    top: 25px;
    width: 130px;
    font-size: 11px;
  }
  .zoom-controls {
    bottom: auto;
    top: 145px;
    right: 5%;
  }
  .zoom-controls button {
    width: 45px;
    height: 45px;
  }
  .scale-index {
    padding: 0;
    grid-template-columns: repeat(5, 1fr);
  }
  .scale-index button {
    padding: 15px 6px;
    font-size: 15px;
  }
  .scale-index span {
    font-size: 8px;
  }
  .scale-index small {
    font-size: 8px;
  }
  .scale-question p {
    font-size: 25px;
  }
  .story,
  .journey {
    padding: 30px 5%;
  }
  .journey li {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  .journey li > span {
    font-size: 30px;
  }
  .journey h2 {
    font-size: 26px;
  }
  .journey li p {
    font-size: 18px;
  }
  .story-scales {
    flex-wrap: wrap;
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

/* The entry is the experience itself; supporting routes retain its vocabulary. */

.entry {
  position: relative;
}
.entry header {
  position: absolute;
  z-index: 4;
  left: 3%;
  right: 3%;
  top: 25px;
  padding: 0;
  border: 0;
  align-items: flex-start;
}
.entry header strong {
  font-size: 14px;
  letter-spacing: 0.2em;
  background: #eee6d1d9;
  padding: 12px;
}
.entry header > span {
  display: none;
}
.entry header button {
  background: #eee6d1e8;
  font-size: 10px;
  padding: 12px;
}
.entry .scale-scene {
  height: 100svh;
  min-height: 800px;
  overflow: hidden;
}
.entry .scale-scene > svg {
  height: 100%;
  width: 100%;
}
.entry .scene-caption {
  left: auto;
  right: 5%;
  bottom: 8%;
  max-width: 340px;
  background: #eee6d1ee;
  padding: 22px;
  box-shadow: 6px 6px 0 #354a4230;
}
.entry .scene-caption h1 {
  font-size: 27px;
  line-height: 1.2;
  margin: 15px 0;
}
.entry .scene-caption > span {
  font-size: 9px;
}
.entry .scene-caption button {
  font-size: 10px;
}
.entry .ruler {
  top: 110px;
  right: 5%;
  background: #eee6d1d9;
  padding: 18px;
}
.entry .zoom-controls {
  right: 5%;
  top: 45%;
  bottom: auto;
  display: flex;
  gap: 10px;
}
.entry .zoom-controls button {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  font-size: 30px;
  background: #eee6d1e8;
}
.entry .scale-index {
  position: absolute;
  left: 3%;
  top: 20%;
  width: 150px;
  display: grid;
  grid-template-columns: 1fr;
  border: 0;
  margin: 0;
  background: #eee6d1e8;
}
.entry .scale-index button {
  border: 0;
  border-left: 3px solid #354a4250;
  padding: 14px 18px;
  font-size: 16px;
}
.entry .scale-index button:first-child {
  border-left: 3px solid #354a4250;
}
.entry .scale-index span {
  font-size: 8px;
}
.entry .scale-index small {
  font-size: 8px;
}
.entry .scale-index button[aria-pressed='true'] {
  border-left: 9px solid #9c5f43;
}
.entry .scale-question {
  padding: 40px 5%;
}
@media (max-width: 750px) {
  .entry header {
    top: 18px;
    left: 5%;
    right: 5%;
    gap: 15px;
  }
  .entry header strong {
    font-size: 10px;
    padding: 9px;
  }
  .entry header button {
    font-size: 9px;
    padding: 9px;
  }
  .entry .scale-scene {
    min-height: 760px;
    height: 100svh;
  }
  .entry .scale-index {
    left: 5%;
    top: 100px;
    width: 110px;
  }
  .entry .scale-index button {
    font-size: 12px;
    padding: 10px 12px;
  }
  .entry .scale-index small {
    font-size: 8px;
  }
  .entry .ruler {
    top: 100px;
    right: 5%;
    padding: 12px;
    max-width: 135px;
  }
  .entry .ruler i {
    width: 100px;
  }
  .entry .zoom-controls {
    top: 45%;
    right: 5%;
    flex-direction: column;
  }
  .entry .zoom-controls button {
    width: 45px;
    height: 45px;
    font-size: 27px;
  }
  .entry .scene-caption {
    left: 5%;
    right: 5%;
    bottom: 5%;
    max-width: none;
    padding: 22px;
  }
  .entry .scene-caption h1 {
    font-size: 27px;
  }
}
</style>
