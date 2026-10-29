<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const selected = ref(2),
  collected = useStored<number[]>('82:section', []);
const strata = [
  {
    name: 'The surface keeps moving',
    depth: '0.0',
    era: 'PRESENT',
    object: 'A brass key',
    color: '#eee0bf',
    ink: '#34251f',
    shape: '○',
    text: 'The newest layer is a thin agreement: paving, weeds and the route people choose across the square. A small key lies beside a drain. Its lock is no longer part of the place.',
  },
  {
    name: 'Under the pavement',
    depth: '0.8',
    era: 'LATE TWENTIETH CENTURY',
    object: 'A blue tile',
    color: '#c7b28c',
    ink: '#34251f',
    shape: '◇',
    text: 'Beneath the square is the floor of a waiting room. A line of blue tiles marks where a wall stood. The room has disappeared, but its edge continues to divide the ground.',
  },
  {
    name: 'The working ground',
    depth: '2.4',
    era: 'RAILWAY YEARS',
    object: 'A signal weight',
    color: '#9b5030',
    ink: '#fff2d6',
    shape: '⬡',
    text: 'Cinders, iron fragments and compacted gravel hold the pressure of repeated work. This counterweight once made a signal return to its safest position when the cable loosened.',
  },
  {
    name: 'Before the yard',
    depth: '4.1',
    era: 'MARKET GARDENS',
    object: 'A clay rim',
    color: '#773e30',
    ink: '#fff2d6',
    shape: '◒',
    text: 'Dark soil interrupts the industrial layers. A broken pot rim appears beside seeds and root channels. The ground fed people before it carried machinery.',
  },
  {
    name: 'The river’s old bed',
    depth: '7.6',
    era: 'ALLUVIAL DEPOSIT',
    object: 'A water-worn stone',
    color: '#4f5146',
    ink: '#fff2d6',
    shape: '●',
    text: 'Rounded stones record movement without a timetable. The river changed course gradually enough to leave no single moment of departure, only a different grain in the soil.',
  },
  {
    name: 'What we cannot date',
    depth: '12.0',
    era: 'BEDROCK',
    object: 'A seam of quartz',
    color: '#252f37',
    ink: '#fff2d6',
    shape: '╱',
    text: 'The archive ends where the language of human use becomes too small. A pale seam crosses the rock. It continues beyond the edge of the section and beyond our account.',
  },
];
function open(i: number) {
  selected.value = i;
  go('artefact');
}
function collect() {
  if (!collected.value.includes(selected.value)) collected.value.push(selected.value);
}
</script>
<template>
  <div class="specimen" :class="{ entry: state === 'start' }">
    <a class="skip" href="#content">Skip to content</a>

    <header>
      <strong>BELOW</strong><span>A FICTIONAL SECTION / 12 METRES OF MEMORY</span
      ><button @click="go('section')">My cross-section ({{ collected.length }})</button>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><div class="surface">
          <h1>BELOW<span>12 metres of memory</span></h1>
          <svg viewBox="0 0 1400 170" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 80Q120 140 260 80T510 90T800 80T1100 100T1400 70V170H0Z" fill="#34251f" />
            <g stroke="#eee0bf" fill="none" stroke-width="2">
              <path
                d="M130 110l40 45 25-25M430 100l-20 50 25 20M730 90l35 65 40-25M1100 100l-30 60 40-15"
              />
              <path d="M0 155Q150 120 300 150T600 145T900 150T1200 140T1400 150" />
            </g>
          </svg>
          <nav aria-label="Jump to depth">
            <a v-for="(s, i) in strata" :key="s.depth" :href="'#layer-' + i">{{ s.depth }} m ↓</a>
          </nav>
        </div>
        <section
          v-for="(s, i) in strata"
          :id="'layer-' + i"
          :key="s.depth"
          class="stratum"
          :style="{ background: s.color, color: s.ink, '--grain': i * 12 + 'deg' }"
        >
          <aside>
            <span>{{ s.depth }}</span
            >METRES<br /><b>0{{ i + 1 }}</b>
          </aside>
          <div class="buried">
            <small>{{ s.era }}</small>
            <h2>{{ s.name }}</h2>
            <p>{{ s.text }}</p>
            <button @click="open(i)">
              <span class="object" aria-hidden="true">{{ s.shape }}</span
              ><span>EXCAVATE / {{ s.object }} ↗</span>
            </button>
          </div>
        </section></template
      >
      <article
        v-else-if="state === 'artefact'"
        class="artefact"
        :style="{ background: strata[selected].color, color: strata[selected].ink }"
      >
        <button @click="go('start')">↑ Back to the surface</button>
        <p>FOUND AT {{ strata[selected].depth }} METRES / {{ strata[selected].era }}</p>
        <h1>{{ strata[selected].object }}</h1>
        <div class="specimen-mark" aria-hidden="true">{{ strata[selected].shape }}</div>
        <p class="description">{{ strata[selected].text }}</p>
        <dl>
          <div>
            <dt>Context</dt>
            <dd>In situ, fictional railway district</dd>
          </div>
          <div>
            <dt>Record</dt>
            <dd>Section B / Find 0{{ selected + 1 }}</dd>
          </div>
          <div>
            <dt>Interpretation</dt>
            <dd>A trace of use, not a complete history</dd>
          </div>
        </dl>
        <button @click="collect">
          {{
            collected.includes(selected) ? 'In your cross-section ✓' : 'Keep this finding'
          }}</button
        ><button @click="open((selected + 1) % 6)">Descend to the next layer ↓</button>
      </article>
      <section v-else class="collection">
        <h1>A section<br />of your own.</h1>
        <p>These findings are saved locally. Select a layer to return to its context.</p>
        <p v-if="!collected.length">
          No findings yet. Begin at the surface and excavate an object.
        </p>
        <article
          v-for="i in [...collected].sort((a, b) => a - b)"
          :key="i"
          :style="{ background: strata[i].color, color: strata[i].ink }"
        >
          <span>{{ strata[i].depth }} m</span
          ><button @click="open(i)">{{ strata[i].object }}</button
          ><button @click="collected = collected.filter((n) => n !== i)">Remove</button>
        </article>
        <button @click="go('start')">Return to the surface ↑</button
        ><button @click="collected = []">Clear findings</button>
      </section>
    </main>
    <footer>
      BELOW / Original fictional findings. Depths are narrative devices, not geological claims.
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
  font-family: 'Libre Baskerville';
  src: url('/fonts/libre-baskerville.woff2') format('woff2');
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
  display: flex;
  gap: 25px;
  justify-content: space-between;
  align-items: center;
  padding: 25px 5%;
  border-bottom: 1px solid;
}
header strong {
  font: 30px var(--heading);
}
header span {
  font: 10px sans-serif;
}
button {
  border: 1px solid;
  background: transparent;
  padding: 12px 18px;
  font: 12px/1.5 sans-serif;
}
.surface {
  padding: 55px 8% 70px;
}
.surface h1 {
  font: clamp(55px, 8vw, 110px)/1 var(--heading);
  letter-spacing: -0.05em;
}
.surface p {
  font: 22px/1.7 var(--body);
  max-width: 550px;
}
.surface nav {
  margin-top: 35px;
  gap: 25px;
  font: 13px sans-serif;
}
.stratum {
  position: relative;
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 6%;
  padding: 60px 8%;
  min-height: 550px;
  background-image: repeating-linear-gradient(
    var(--grain),
    transparent 0 35px,
    #0000000a 35px 37px
  ) !important;
  clip-path: polygon(0 0, 20% 8px, 60% 0, 100% 12px, 100% 100%, 0 100%);
  margin-top: -12px;
}
.stratum aside {
  border-right: 1px dashed;
  padding-right: 20px;
  font: 10px sans-serif;
}
.stratum aside > span {
  display: block;
  font: 40px var(--heading);
  white-space: nowrap;
}
.stratum aside b {
  display: block;
  font: 70px var(--heading);
  white-space: nowrap;
  opacity: 0.45;
  margin-top: 150px;
}
.buried small {
  font: 10px sans-serif;
  letter-spacing: 0.1em;
}
.buried h2 {
  font: clamp(32px, 4vw, 55px)/1.1 var(--heading);
  margin-top: 20px;
  max-width: 650px;
}
.buried p {
  font: 18px/1.8 var(--body);
  max-width: 620px;
}
.buried button {
  display: flex;
  align-items: center;
  gap: 40px;
  border: 0;
  border-bottom: 1px solid;
  padding: 0 0 10px;
}
.object {
  font: 90px/1 sans-serif;
  min-width: 80px;
}
.buried button > span:last-child {
  font-size: 10px;
  letter-spacing: 0.1em;
}
.artefact {
  padding: 40px 8% 70px;
  min-height: 90vh;
}
.artefact > p:first-of-type {
  font: 11px sans-serif;
  margin: 30px 0;
}
.artefact h1,
.collection h1 {
  font: clamp(45px, 6vw, 85px)/1.1 var(--heading);
}
.specimen-mark {
  font: 230px/1.1 sans-serif;
  text-align: center;
  border-block: 1px dashed;
  margin: 30px 0;
  max-width: 850px;
}
.description {
  font: 24px/1.8 var(--body);
}
dl {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  font: 12px/1.5 sans-serif;
  margin: 35px 0;
}
dd {
  margin: 10px 0;
  max-width: 220px;
}
.artefact > button {
  margin-right: 15px;
  margin-bottom: 15px;
}
.collection {
  padding: 50px 8%;
  min-height: 80vh;
}
.collection article {
  display: flex;
  gap: 25px;
  align-items: center;
  padding: 30px;
  margin: 10px 0;
}
.collection article span {
  font: 30px var(--heading);
}
.collection > button {
  margin: 25px 15px 0 0;
}
footer {
  background: #252f37;
  color: #fff2d6;
  padding: 25px 5%;
  font: 10px/1.8 sans-serif;
}
@media (max-width: 700px) {
  header {
    flex-wrap: wrap;
  }
  .surface {
    padding: 40px 5%;
  }
  .surface h1 {
    font-size: 55px;
  }
  .surface p {
    font-size: 18px;
  }
  .stratum {
    padding: 40px 5%;
    grid-template-columns: 62px 1fr;
    gap: 20px;
    min-height: 520px;
  }
  .stratum aside > span {
    font-size: 24px;
    white-space: nowrap;
  }
  .stratum aside b {
    font-size: 48px;
  }
  .buried h2 {
    font-size: 32px;
  }
  .buried p {
    font-size: 16px;
  }
  .buried button {
    gap: 10px;
    flex-direction: column;
    align-items: flex-start;
  }
  .object {
    font-size: 70px;
  }
  .artefact,
  .collection {
    padding: 30px 5%;
  }
  .description {
    font-size: 19px;
  }
  .collection article {
    padding: 20px;
    flex-wrap: wrap;
  }
  .specimen-mark {
    font-size: 170px;
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
  right: 3%;
  top: 24px;
  width: auto;
  z-index: 3;
  padding: 0;
  border: 0;
  display: block;
}
.entry header strong {
  display: none;
}
.entry header > span {
  display: none;
}
.entry header button {
  background: #eee0bf;
}
.entry .surface {
  position: relative;
  padding: 100px 0 0;
  overflow: hidden;
}
.entry .surface h1 {
  padding: 0 3%;
  font-size: clamp(100px, 22vw, 330px);
  line-height: 0.8;
  letter-spacing: -0.08em;
  margin: 0;
}
.entry .surface h1 span {
  display: block;
  font: 12px var(--body);
  letter-spacing: 0.08em;
  margin: 25px 0 0 5%;
}
.entry .surface svg {
  display: block;
  width: 100%;
  height: 140px;
  margin-top: -30px;
}
.entry .surface nav {
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 22px 4%;
  margin: 0;
  background: #34251f;
  color: #eee0bf;
}
.entry .surface nav a {
  font: 12px var(--body);
  padding: 5px;
}
.entry .stratum {
  border: 0;
  position: relative;
  padding: 70px 8% 100px;
  min-height: 650px;
  grid-template-columns: 100px 1fr;
  gap: 8%;
  background-image: repeating-linear-gradient(
    var(--grain),
    transparent 0 30px,
    #34251f09 31px 32px
  ) !important;
}
.entry .stratum:before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: -20px;
  height: 45px;
  background: inherit;
  clip-path: polygon(
    0 50%,
    9% 70%,
    20% 20%,
    34% 65%,
    50% 10%,
    65% 70%,
    80% 30%,
    100% 65%,
    100% 100%,
    0 100%
  );
}
.entry .stratum:nth-of-type(2n) .buried {
  padding-left: 25%;
}
.entry .stratum aside {
  border-left: 1px dashed currentColor;
  padding-left: 18px;
}
.entry .stratum aside > span {
  font: 44px var(--heading);
}
.entry .buried h2 {
  max-width: 10em;
  font-size: clamp(34px, 4vw, 62px);
}
.entry .buried button {
  display: flex;
  gap: 30px;
  align-items: center;
  text-align: left;
  border: 0;
  border-bottom: 1px dashed;
  padding: 30px 0;
}
.entry .object {
  font-size: 110px;
  min-width: 120px;
}
@media (max-width: 700px) {
  .entry .surface {
    padding-top: 100px;
  }
  .entry .surface h1 {
    font-size: 25vw;
  }
  .entry .surface h1 span {
    font-size: 10px;
    margin-top: 18px;
  }
  .entry .surface svg {
    height: 110px;
    margin-top: 0;
  }
  .entry .surface nav {
    gap: 10px;
    justify-content: flex-start;
  }
  .entry .stratum {
    padding: 40px 6% 70px;
    grid-template-columns: 40px minmax(0, 1fr);
    gap: 18px;
    min-height: 520px;
  }
  .entry .stratum aside {
    padding-left: 7px;
    font-size: 8px;
  }
  .entry .stratum aside > span {
    font-size: 24px;
  }
  .entry .stratum:nth-of-type(2n) .buried {
    padding-left: 0;
  }
  .entry .buried h2 {
    font-size: 30px;
  }
  .entry .buried button {
    display: block;
    font-size: 12px;
  }
  .entry .object {
    display: block;
    font-size: 90px;
    min-width: 0;
  }
}

@media (max-width: 700px) {
  .entry .stratum aside {
    padding-right: 3px;
    font-size: 6px;
    letter-spacing: -0.03em;
  }
  .entry .stratum aside b {
    font-size: 26px;
    margin-top: 100px;
  }
  .entry .stratum aside > span {
    font-size: 20px;
  }
}
</style>
