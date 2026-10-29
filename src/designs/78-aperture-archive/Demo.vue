<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const selected = ref(2);
const favourites = useStored<number[]>('78:favourites', []);
const shots = [
  [
    'Last train',
    '00:18',
    'The platform clock lit a patch of empty concrete. Beyond it, the rails disappeared before they had a chance to converge.',
  ],
  [
    'Service stair',
    '01:06',
    'A single landing lamp made every step above it seem deeper. The building was most legible at the point where its light stopped.',
  ],
  [
    'Water tower',
    '02:14',
    'The tank held a pale reflection of the sky. From the street, its legs looked less like supports than lines erased from the dark.',
  ],
  [
    'Corner window',
    '03:02',
    'The bakery had not opened, but a rectangle of warm light had already placed it on the map.',
  ],
  [
    'Freight gate',
    '04:11',
    'A chain hung between two posts. Behind it the city became a collection of surfaces without names.',
  ],
  [
    'First ferry',
    '05:36',
    'A light moved slowly enough to be mistaken for a star. Then the river began to acquire edges.',
  ],
];
function step(n: number) {
  selected.value = (selected.value + n + 6) % 6;
}
function open(i: number) {
  selected.value = i;
  go('exposure');
}
function save() {
  if (!favourites.value.includes(selected.value)) favourites.value.push(selected.value);
}
</script>
<template>
  <div class="specimen" :class="{ entry: state === 'start' }">
    <a class="skip" href="#content">Skip to content</a>

    <header>
      <strong>AFTER<span>THE CITY / WHEN IT STOPS PERFORMING</span></strong
      ><button @click="go('collection')">Expose the collection ↗</button>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><div class="scene">
          <h1 class="sr">After: a night archive seen through an aperture</h1>
          <svg
            viewBox="0 0 1200 650"
            role="img"
            :aria-label="'Night-city drawing, aperture over ' + shots[selected][0]"
          >
            <defs>
              <mask id="aperture78">
                <rect width="1200" height="650" fill="#222" />
                <circle :cx="190 + selected * 155" cy="350" r="180" fill="white" />
              </mask>
              <pattern id="windows78" width="32" height="43" patternUnits="userSpaceOnUse">
                <rect width="9" height="16" fill="#c6ca99" opacity=".7" />
              </pattern>
            </defs>
            <g mask="url(#aperture78)">
              <rect width="1200" height="650" fill="#263643" />
              <circle cx="930" cy="120" r="55" fill="#d6ddc9" />
              <path
                d="M0 560L0 290 180 290 180 170 340 170 340 430 460 430 460 270 610 270 610 90 770 90 770 400 940 400 940 220 1100 220 1100 370 1200 370V650H0"
                fill="#77867d"
              />
              <path
                d="M0 560L0 290 180 290 180 170 340 170 340 430 460 430 460 270 610 270 610 90 770 90 770 400 940 400 940 220 1100 220 1100 370 1200 370V650H0"
                fill="url(#windows78)"
              />
              <path d="M0 530H1200V650H0Z" fill="#121f29" />
              <path d="M0 590L1200 550M0 630L1200 570" stroke="#bdd4c5" stroke-width="3" />
              <path
                d="M530 290V540M590 290V540M520 240H600V290H520Z"
                fill="#131e22"
                stroke="#c5d7c8"
                stroke-width="4"
              />
            </g>
            <circle
              :cx="190 + selected * 155"
              cy="350"
              r="180"
              fill="none"
              stroke="#dded83"
              stroke-width="1"
            />
            <path
              :d="'M' + (190 + selected * 155) + ' 155v25M' + (190 + selected * 155) + ' 520v25'"
              stroke="#dded83"
            /></svg
          ><span class="coordinate">FRAME 0{{ selected + 1 }} / {{ shots[selected][1] }}</span>
          <div class="aperture-note">
            <span>01—06 / NIGHT STUDIES</span>
            <h2>{{ shots[selected][0] }}</h2>
            <button @click="open(selected)">Enter exposure ↗</button>
          </div>
        </div>
        <div class="controls">
          <button @click="step(-1)">← Previous exposure</button
          ><label
            >Aperture position<input
              type="range"
              min="0"
              max="5"
              v-model.number="selected" /></label
          ><button @click="step(1)">Next exposure →</button>
        </div>
        <p class="intro">
          Six fragments of a city after its public face has gone to sleep. An original vector field
          study about light, attention and what a frame leaves out.
        </p></template
      >
      <article v-else-if="state === 'exposure'" class="exposure">
        <button @click="go('start')">← Return to aperture</button>
        <p>EXPOSURE 0{{ selected + 1 }} / {{ shots[selected][1] }} / FICTIONAL FIELD STUDY</p>
        <h1>{{ shots[selected][0] }}</h1>
        <div class="light-box">
          <span>{{ shots[selected][1] }}</span
          ><i
            v-for="i in 12"
            :key="i"
            :style="{ height: 20 + ((i * 17 + selected * 9) % 70) + '%' }"
          ></i>
        </div>
        <p class="field-note">{{ shots[selected][2] }}</p>
        <dl>
          <div>
            <dt>Method</dt>
            <dd>Stillness before composition</dd>
          </div>
          <div>
            <dt>Light</dt>
            <dd>Existing street illumination</dd>
          </div>
          <div>
            <dt>Archive</dt>
            <dd>Original illustrated scene, not documentary photography</dd>
          </div>
        </dl>
        <button @click="save">
          {{
            favourites.includes(selected) ? 'Saved to contact sheet ✓' : 'Keep this exposure'
          }}</button
        ><button @click="open((selected + 1) % 6)">Next exposure →</button>
      </article>
      <section v-else class="collection">
        <h1>Everything<br />the dark held.</h1>
        <p>The complete index. {{ favourites.length }} exposures kept on this browser.</p>
        <button @click="go('start')">Return to aperture</button>
        <div class="contact-strip">
          <button v-for="(shot, i) in shots" :key="shot[0]" @click="open(i)">
            <span class="contact-art" :style="{ '--shift': i * 23 + 'deg' }"
              ><b>0{{ i + 1 }}</b></span
            ><strong>{{ shot[0] }}</strong
            ><small>{{ shot[1] }} {{ favourites.includes(i) ? ' / KEPT' : '' }}</small>
          </button>
        </div>
        <button @click="favourites = []">Clear kept exposures</button>
      </section>
    </main>
    <footer>AFTER / An illustrated night archive · Six scenes, no tracking.</footer>
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
  padding: 28px 4%;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid #57616a;
}
header strong {
  font: 40px/1 var(--heading);
  letter-spacing: 0.2em;
}
header span {
  font: 9px var(--body);
  display: block;
  letter-spacing: 0.1em;
  margin-top: 10px;
}
button {
  background: transparent;
  border: 1px solid #8c969d;
  padding: 10px 17px;
}
header button {
  color: var(--accent);
}
.scene {
  position: relative;
  min-height: 650px;
}
.scene svg {
  display: block;
  width: 100%;
  height: 650px;
  object-fit: cover;
}
.scene h1 {
  position: absolute;
  z-index: 1;
  left: 4%;
  top: 40px;
  font: clamp(45px, 6vw, 85px)/1 var(--heading);
  letter-spacing: -0.06em;
}
.coordinate {
  position: absolute;
  left: 4%;
  bottom: 30px;
  font-size: 11px;
  color: var(--accent);
}
.aperture-note {
  position: absolute;
  right: 5%;
  bottom: 30px;
  text-align: right;
}
.aperture-note h2 {
  font: 40px var(--heading);
  margin: 10px 0;
}
.aperture-note span {
  font-size: 9px;
}
.controls {
  padding: 20px 4%;
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: space-between;
  border-block: 1px solid #57616a;
}
.controls label {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 11px;
}
.controls input {
  accent-color: var(--accent);
  width: 200px;
}
.intro {
  padding: 35px 4%;
  max-width: 750px;
  line-height: 1.9;
}
.exposure,
.collection {
  padding: 35px 5% 70px;
}
.exposure > p:first-of-type {
  margin-top: 30px;
  font-size: 10px;
  color: var(--accent);
}
.exposure h1,
.collection h1 {
  font: clamp(46px, 7vw, 95px)/1 var(--heading);
  letter-spacing: -0.05em;
}
.light-box {
  height: 330px;
  display: flex;
  align-items: flex-end;
  gap: 3%;
  position: relative;
  background: #2c3b45;
  padding: 25px 5%;
  overflow: hidden;
}
.light-box i {
  background: repeating-linear-gradient(0deg, #263139 0 22px, #c7cda8 22px 27px);
  width: 7%;
}
.light-box > span {
  position: absolute;
  right: 4%;
  top: 15px;
  font: 100px var(--heading);
  opacity: 0.55;
}
.field-note {
  font: 25px/1.6 var(--heading);
  margin: 35px 0;
  max-width: 700px;
}
dl {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  font-size: 12px;
  margin-bottom: 35px;
}
dt {
  color: var(--accent);
  margin-bottom: 8px;
}
dd {
  margin: 0;
  max-width: 250px;
}
.exposure > button {
  margin-right: 15px;
}
.contact-strip {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  margin: 35px 0;
}
.contact-strip button {
  padding: 0;
  border: 0;
  text-align: left;
}
.contact-art {
  display: grid;
  place-items: center;
  aspect-ratio: 1.6;
  background: linear-gradient(var(--shift), #738d89, #0f1b26 60%);
  border: 16px solid #1c2128;
  outline: 1px dashed #7b827d;
}
.contact-art b {
  font: 70px var(--heading);
  color: #d7e4b7;
}
.contact-strip strong,
.contact-strip small {
  display: block;
  margin-top: 14px;
}
footer {
  padding: 24px 4%;
  font-size: 10px;
  border-top: 1px solid #57616a;
}
@media (max-width: 700px) {
  header {
    flex-direction: column;
  }
  header button {
    align-self: flex-start;
  }
  .scene,
  .scene svg {
    min-height: 480px;
    height: 480px;
  }
  .scene h1 {
    top: 30px;
    font-size: 45px;
  }
  .aperture-note h2 {
    font-size: 27px;
  }
  .aperture-note {
    bottom: 45px;
  }
  .coordinate {
    bottom: 13px;
    font-size: 9px;
  }
  .controls {
    gap: 12px;
    flex-wrap: wrap;
  }
  .controls label {
    order: -1;
    width: 100%;
    justify-content: space-between;
  }
  .controls button {
    font-size: 10px;
  }
  .intro {
    font-size: 12px;
    padding: 25px 5%;
  }
  .contact-strip {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .contact-art {
    border-width: 8px;
  }
  .contact-art b {
    font-size: 45px;
  }
  .contact-strip strong {
    font-size: 12px;
  }
  .contact-strip small {
    font-size: 9px;
  }
  .light-box {
    height: 240px;
  }
  .light-box > span {
    font-size: 60px;
  }
  .exposure > button {
    margin-bottom: 12px;
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
  background: #05090e;
}
.entry header {
  position: absolute;
  z-index: 3;
  inset: 0 auto auto 0;
  width: 100%;
  height: 100svh;
  pointer-events: none;
  border: 0;
  padding: 0;
}
.entry header strong {
  position: absolute;
  left: 25px;
  top: 25px;
  font-size: 23px;
  letter-spacing: 0.5em;
  writing-mode: vertical-rl;
}
.entry header span {
  font-size: 8px;
  letter-spacing: 0.14em;
  line-height: 2;
  margin-top: 20px;
}
.entry header button {
  pointer-events: auto;
  position: absolute;
  right: 26px;
  top: 24px;
  background: #0b1118;
}
.entry .scene {
  min-height: 100svh;
  height: 100svh;
  overflow: hidden;
}
.entry .scene svg {
  width: 100%;
  height: 100%;
}
.entry .scene h1 {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip-path: inset(50%) !important;
  white-space: nowrap !important;
}
.entry .aperture-note {
  bottom: 15%;
  right: 5%;
  text-align: left;
  padding-left: 20px;
  border-left: 1px solid var(--accent);
}
.entry .aperture-note h2 {
  font-size: clamp(34px, 4vw, 68px);
  max-width: 6em;
  line-height: 1;
}
.entry .coordinate {
  bottom: 16%;
  left: 5%;
}
.entry .controls {
  position: absolute;
  z-index: 4;
  top: calc(100svh - 105px);
  left: 5%;
  right: 5%;
  border: 0;
  padding: 12px 0;
  background: transparent;
}
.entry .controls button {
  border: 0;
  border-bottom: 1px solid #66736d;
}
.entry .controls input {
  width: min(22vw, 250px);
}
.entry .intro {
  max-width: 680px;
  margin: 0 auto;
  padding: 45px 5%;
}
@media (max-width: 700px) {
  .entry header {
    height: 100svh;
  }
  .entry header strong {
    font-size: 17px;
    left: 16px;
    top: 20px;
  }
  .entry header span {
    display: none;
  }
  .entry header button {
    right: 16px;
    top: 18px;
    font-size: 10px;
    padding: 10px;
  }
  .entry .scene,
  .entry .scene svg {
    min-height: 720px;
    height: 100svh;
  }
  .entry .aperture-note {
    right: 6%;
    bottom: 21%;
  }
  .entry .aperture-note h2 {
    font-size: 37px;
  }
  .entry .coordinate {
    bottom: 33%;
    font-size: 9px;
  }
  .entry .controls {
    top: auto;
    bottom: auto;
    position: relative;
    margin-top: -125px;
    left: auto;
    right: auto;
    margin-inline: 6%;
    padding-bottom: 35px;
    gap: 12px;
  }
  .entry .controls label {
    font-size: 10px;
  }
  .entry .controls input {
    width: 45%;
  }
  .entry .intro {
    margin-top: 15px;
  }
}
</style>
