<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const cyan = ref(true),
  magenta = ref(true),
  offset = ref(18),
  note = ref(0),
  issued = ref(false);
const notes = [
  [
    'The second impression',
    'A second pass never lands on exactly the same paper. Moisture, pressure and the hand at the feed all make small decisions. Registration is the negotiation between those decisions and an intended image.',
  ],
  [
    'A colour between colours',
    'The third colour is not in a tin. It appears where two transparent inks meet. We can specify the plates, but the overlap is a relationship rather than an independent object.',
  ],
  [
    'The useful error',
    'A displaced edge can tell us more about the process than a perfect edge. The question is whether the error helps the image speak, or merely asks to be noticed.',
  ],
  [
    'Paper has a direction',
    'The sheet bends more willingly one way than the other. Before printing, fold a corner in each direction. The material has already begun to answer the design.',
  ],
  [
    'One hundred variations',
    'An edition is a family, not a set of identical twins. Look for the common structure, then attend to the differences that make one impression particular.',
  ],
  [
    'After the press stops',
    'The final print is also an instruction to the next reader: hold here, turn this way, notice this interval. The process continues in the way the sheet is handled.',
  ],
];
function printEdition() {
  window.print();
}
</script>
<template>
  <div class="specimen" :class="{ entry: state === 'start' }">
    <a class="skip" href="#content">Skip to content</a>

    <header>
      <strong>OFF REGISTER</strong><span>A TWO-INK EXHIBITION / 06 STUDIES</span
      ><button @click="go('edition')">Prepare an edition ↗</button>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><div class="print-sheet">
          <div class="crop tl" aria-hidden="true">+</div>
          <div class="crop tr" aria-hidden="true">+</div>
          <div class="crop bl" aria-hidden="true">+</div>
          <div class="crop br" aria-hidden="true">+</div>
          <h1 class="sr">Off Register — an exhibition in two inks</h1>
          <div class="plate" aria-hidden="true">
            <span v-if="cyan" class="ink cyan">OFF<br />REGIS<br />TER</span
            ><span
              v-if="magenta"
              class="ink magenta"
              :style="{ transform: 'translate(' + offset + 'px,' + offset / 2 + 'px)' }"
              >OFF<br />REGIS<br />TER</span
            >
          </div>
          <div class="target" aria-hidden="true">
            <i></i><i :style="{ transform: 'translateX(' + offset + 'px)' }"></i>
          </div>
          <p class="sheet-note">
            THE IMAGE IS<br />BETWEEN THE LAYERS.<br /><small
              >Align the plates. Read the process.</small
            >
          </p>
          <span class="sheet-number">86 / 100</span>
        </div>
        <div class="press-controls">
          <label><input type="checkbox" v-model="cyan" /> Cyan plate</label
          ><label><input type="checkbox" v-model="magenta" /> Magenta plate</label
          ><label
            >Offset {{ offset }} mm<input
              type="range"
              min="-25"
              max="25"
              v-model.number="offset" /></label
          ><button
            @click="
              offset = 0;
              cyan = true;
              magenta = true;
            "
          >
            Snap registration</button
          ><button @click="go('essay')">Read the exhibition →</button>
        </div>
        <p class="registration" role="status">
          {{
            offset === 0 && cyan && magenta
              ? 'Registered: both impressions share an edge.'
              : 'A displaced edge reveals how the image is made.'
          }}
        </p>
        <div class="note-index">
          <button
            v-for="(n, i) in notes"
            :key="n[0]"
            @click="
              note = i;
              go('essay');
            "
          >
            <span>0{{ i + 1 }}</span
            >{{ n[0] }} ↗
          </button>
        </div></template
      >
      <article v-else-if="state === 'essay'" class="essay">
        <button @click="go('start')">← Back to the press</button
        ><span class="essay-number">0{{ note + 1 }}</span>
        <h1>{{ notes[note][0] }}</h1>
        <p class="lead">{{ notes[note][1] }}</p>
        <h2>A small exercise</h2>
        <p>
          Print one simple shape twice, moving the second impression by the width of a pencil line.
          Compare the edges. Which version gives you a stronger sense of the material, and why?
        </p>
        <p>
          Original exhibition writing for an imagined workshop. The screen simulates transparent
          inks; a real press introduces material variation beyond this model.
        </p>
        <button @click="note = (note + 1) % 6">Next workshop note →</button
        ><button @click="go('edition')">Make a sample edition</button>
      </article>
      <section v-else class="edition">
        <h1>Impression<br />number one.</h1>
        <div class="proof" :style="{ '--offset': offset + 'px' }">
          <span v-if="cyan" class="proof-cyan">&</span
          ><span v-if="magenta" class="proof-magenta">&</span>
        </div>
        <p>
          Cyan {{ cyan ? 'on' : 'off' }} / Magenta {{ magenta ? 'on' : 'off' }} / Offset
          {{ offset }} mm
        </p>
        <p>
          A local proof of your two-ink composition. Use the browser print dialog to save a PDF or
          print the sheet.
        </p>
        <button
          @click="
            issued = true;
            printEdition();
          "
        >
          Print this edition</button
        ><button @click="go('start')">Adjust the plates</button>
        <p v-if="issued" role="status">Print dialog requested. Your composition remains here.</p>
      </section>
    </main>
    <footer>OFF REGISTER / ORIGINAL SCREEN PRINT STUDIES / NO INK WASTED</footer>
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
  padding: 25px 4%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  border-bottom: 2px solid;
}
header strong {
  font: 25px var(--heading);
}
header span {
  font-size: 10px;
}
button {
  background: transparent;
  border: 1px solid;
  padding: 10px 16px;
}
header button {
  font-size: 11px;
}
.print-sheet {
  margin: 25px 4%;
  height: 620px;
  position: relative;
  border: 1px solid #aaa18a;
  overflow: hidden;
}
.crop {
  position: absolute;
  font: 45px/1 sans-serif;
  z-index: 2;
}
.tl {
  left: 8px;
  top: 8px;
}
.tr {
  right: 8px;
  top: 8px;
}
.bl {
  left: 8px;
  bottom: 8px;
}
.br {
  right: 8px;
  bottom: 8px;
}
.plate {
  position: absolute;
  left: 5%;
  top: 5%;
  width: 70%;
  height: 90%;
}
.ink {
  position: absolute;
  inset: 0;
  font: clamp(95px, 12vw, 175px)/0.95 var(--heading);
  letter-spacing: -0.08em;
  mix-blend-mode: multiply;
}
.cyan {
  color: #008eb5;
}
.magenta {
  color: #cf326f;
}
.target {
  position: absolute;
  right: 8%;
  top: 12%;
  width: 160px;
  height: 160px;
}
.target i {
  position: absolute;
  inset: 0;
  border: 20px solid #008eb5;
  border-radius: 50%;
  mix-blend-mode: multiply;
}
.target i:nth-child(2) {
  border-color: #cf326f;
}
.sheet-note {
  position: absolute;
  right: 5%;
  bottom: 9%;
  font: 21px/1.35 var(--heading);
  max-width: 290px;
}
.sheet-note small {
  display: block;
  font: 11px/1.8 var(--body);
  margin-top: 20px;
}
.sheet-number {
  position: absolute;
  right: 6%;
  top: 50%;
  font-size: 11px;
  writing-mode: vertical-rl;
}
.press-controls {
  display: flex;
  gap: 25px;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 4%;
  border-block: 1px solid;
  font-size: 11px;
}
.press-controls label {
  display: flex;
  align-items: center;
  gap: 8px;
}
.press-controls input {
  accent-color: #be175a;
}
.press-controls input[type='range'] {
  width: 120px;
}
.registration {
  padding: 22px 4%;
  font-size: 11px;
  margin: 0;
}
.note-index {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  margin: 0 4% 50px;
  border-top: 1px solid;
}
.note-index button {
  text-align: left;
  border: 0;
  border-bottom: 1px solid;
  padding: 20px 10px;
  font-size: 12px;
}
.note-index span {
  color: #a51a50;
  display: block;
  font: 28px var(--heading);
  margin-bottom: 12px;
}
.essay,
.edition {
  padding: 35px 8% 70px;
}
.essay-number {
  display: block;
  font: 130px/0.9 var(--heading);
  color: #a51a50;
  margin-top: 40px;
}
.essay h1,
.edition h1 {
  font: clamp(42px, 6vw, 85px)/1 var(--heading);
  max-width: 900px;
  margin: 30px 0;
}
.lead {
  font:
    clamp(23px, 3vw, 35px)/1.6 'DM Sans',
    sans-serif;
  max-width: 37ch;
}
.essay h2 {
  margin-top: 45px;
  font-size: 19px;
}
.essay > p:not(.lead) {
  font-size: 13px;
  line-height: 1.9;
}
.essay > button,
.edition > button {
  margin: 20px 20px 0 0;
}
.proof {
  height: 350px;
  position: relative;
  max-width: 600px;
  border: 1px solid;
  margin: 30px 0;
}
.proof span {
  position: absolute;
  inset: 0;
  text-align: center;
  font: 320px/1 var(--heading);
  mix-blend-mode: multiply;
}
.proof-cyan {
  color: #008eb5;
}
.proof-magenta {
  color: #cf326f;
  transform: translateX(var(--offset));
}
footer {
  padding: 22px 4%;
  font-size: 10px;
  border-top: 2px solid;
}
@media (max-width: 700px) {
  header {
    flex-wrap: wrap;
  }
  .print-sheet {
    height: 480px;
    margin: 20px 4%;
  }
  .plate {
    top: 10%;
    left: 8%;
    width: 90%;
  }
  .ink {
    font-size: clamp(76px, 20vw, 130px);
  }
  .target {
    width: 80px;
    height: 80px;
    right: 10%;
    top: auto;
    bottom: 9%;
  }
  .target i {
    border-width: 10px;
  }
  .sheet-note {
    left: 8%;
    right: auto;
    bottom: 8%;
    font-size: 15px;
    max-width: 180px;
  }
  .sheet-note small {
    font-size: 9px;
    max-width: 120px;
  }
  .sheet-number {
    display: none;
  }
  .crop {
    font-size: 30px;
  }
  .press-controls {
    gap: 15px;
  }
  .press-controls label:nth-of-type(3) {
    width: 100%;
  }
  .note-index {
    grid-template-columns: 1fr 1fr;
  }
  .essay,
  .edition {
    padding: 25px 5%;
  }
  .proof {
    height: 270px;
  }
  .proof span {
    font-size: 245px;
  }
}
@media print {
  header,
  footer,
  button {
    display: none;
  }
  .edition {
    padding: 0;
  }
  .specimen {
    background: white;
  }
  .proof {
    break-inside: avoid;
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
  background: #fff8e1;
}
.entry header {
  position: absolute;
  right: 28px;
  bottom: auto;
  top: 30px;
  width: 220px;
  z-index: 4;
  display: block;
  padding: 0;
  border: 0;
}
.entry header strong {
  display: none;
}
.entry header > span {
  display: block;
  font-size: 10px;
  line-height: 1.7;
  margin-bottom: 20px;
  max-width: 120px;
}
.entry header button {
  font-size: 11px;
  background: #fff8e1;
}
.entry .print-sheet {
  margin: 0;
  width: 100%;
  height: 100svh;
  min-height: 800px;
  border: 0;
  overflow: hidden;
  background: repeating-linear-gradient(0deg, transparent 0 29px, #182d3306 30px 31px);
}
.entry .plate {
  position: absolute;
  left: 3%;
  top: 4%;
  width: 74%;
  height: 90%;
}
.entry .plate .ink {
  font-size: clamp(100px, 23vw, 340px);
  line-height: 0.76;
  letter-spacing: -0.1em;
}
.entry .target {
  right: 5%;
  top: 36%;
  width: 230px;
  height: 230px;
}
.entry .target i {
  border-width: 20px;
}
.entry .sheet-note {
  right: 5%;
  bottom: 18%;
  max-width: 180px;
  font-size: 14px;
}
.entry .sheet-note small {
  font-size: 10px;
}
.entry .sheet-number {
  right: 28px;
  bottom: 25px;
}
.entry .press-controls {
  position: relative;
  z-index: 5;
  margin: -90px 5% 0;
  padding: 20px;
  border: 2px solid;
  background: #fff8e1;
  box-shadow: 6px 6px 0 #182d33;
}
.entry .registration {
  margin-top: 35px;
}
.entry .note-index {
  margin: 30px 5% 60px;
}
@media (max-width: 750px) {
  .entry header {
    top: 18px;
    right: 16px;
    width: 135px;
  }
  .entry header > span {
    font-size: 8px;
    max-width: 120px;
    margin-bottom: 8px;
  }
  .entry header button {
    font-size: 9px;
    padding: 8px;
  }
  .entry .print-sheet {
    height: 670px;
    min-height: 670px;
  }
  .entry .plate {
    top: 140px;
    left: 4%;
    width: 92%;
    height: 460px;
  }
  .entry .plate .ink {
    font-size: 30vw;
    line-height: 0.86;
  }
  .entry .target {
    right: 5%;
    top: 440px;
    width: 105px;
    height: 105px;
  }
  .entry .target i {
    border-width: 10px;
  }
  .entry .sheet-note {
    bottom: 35px;
    left: 6%;
    right: auto;
    font-size: 11px;
    max-width: 150px;
  }
  .entry .sheet-note small {
    font-size: 9px;
  }
  .entry .press-controls {
    margin: 0 5%;
    padding: 18px;
    gap: 15px;
  }
  .entry .registration {
    padding: 0 5%;
  }
}
</style>
