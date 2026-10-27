<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const station = ref(2);
const sequence = useStored<number[]>('79:sequence', []);
const programmes = [
  {
    name: 'Rooms without clocks',
    hz: '88.2',
    host: 'Mika Row',
    note: 'A conversation about spaces that change our sense of time.',
    text: 'The waiting room has no clock, but everyone knows how long they have been there. A chair remembers the weight of anticipation. Tonight we listen to the small noises that make an empty room inhabited.',
  },
  {
    name: 'The overnight line',
    hz: '91.4',
    host: 'Sol Fen',
    note: 'Letters from people working while the city sleeps.',
    text: 'A baker writes that the first loaf is always for the person who opens the shutters. A cleaner measures a building by the number of lights that need not be on. The city has another set of hours, rarely printed.',
  },
  {
    name: 'Weather in the wires',
    hz: '94.6',
    host: 'Nell Ash',
    note: 'An imaginary field recording of weather crossing an empty station.',
    text: 'At 02:14 the rain changes direction. We hear it first in the gutter, then against the waiting-room window. The loudspeaker clicks but says nothing. For a moment, the weather has the entire frequency.',
  },
  {
    name: 'Small hours kitchen',
    hz: '97.8',
    host: 'Ivo Lake',
    note: 'Recipes remembered as stories, rather than instructions.',
    text: 'There is a soup that cannot be made for one person. Not because of the quantities, but because somebody must stand nearby and disagree about the salt. This is a programme about recipes that require company.',
  },
  {
    name: 'Distant machinery',
    hz: '101.0',
    host: 'Ada North',
    note: 'Rhythms assembled from imagined industrial sound.',
    text: 'The press closes. The belt advances. Between the two motions a worker hums half a tune. We slow the sequence until the machine sounds uncertain, and the human interruption becomes its most reliable beat.',
  },
  {
    name: 'Before the birds',
    hz: '104.2',
    host: 'Kit Moss',
    note: 'A quiet closing transmission for the edge of morning.',
    text: 'We leave a little silence at the end of the programme. Somewhere a kettle has begun to boil. Somewhere the first person through the door will think the room was empty all night.',
  },
];
function step(n: number) {
  station.value = (station.value + n + 6) % 6;
}
function add() {
  if (!sequence.value.includes(station.value)) sequence.value.push(station.value);
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>

    <header>
      <span>INDEPENDENT TRANSMISSIONS / NO. 09</span><strong>FREQUENCY HOUSE</strong
      ><button @click="go('sequence')">Your sequence ({{ sequence.length }})</button>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><div class="instrument">
          <div class="dial">
            <div class="ticks" aria-hidden="true"></div>
            <div
              class="needle"
              :style="{ transform: 'rotate(' + (-110 + station * 44) + 'deg)' }"
              aria-hidden="true"
            ></div>
            <button
              v-for="(p, i) in programmes"
              :key="p.hz"
              class="station"
              :style="{
                left: 50 + 41 * Math.sin(((-110 + i * 44) * Math.PI) / 180) + '%',
                top: 50 - 41 * Math.cos(((-110 + i * 44) * Math.PI) / 180) + '%',
              }"
              :aria-pressed="station === i"
              @click="station = i"
            >
              {{ p.hz }}
            </button>
            <div class="dial-centre">
              <span>NOW TUNED TO</span>
              <h1>{{ programmes[station].name }}</h1>
              <p>{{ programmes[station].hz }}<small> MHz</small></p>
              <button @click="go('programme')">Enter the transmission →</button>
            </div>
          </div>
          <span class="serial">FH—009 / STEREO IMAGINATION</span>
        </div>
        <div class="tuner">
          <button @click="step(-1)">− Previous</button
          ><label
            >Tune the dial<input type="range" min="0" max="5" v-model.number="station" /></label
          ><button @click="step(1)">Next +</button>
        </div>
        <p class="intro">
          For people still awake. Six programmes about the things a city says when nobody is asking.
          This edition is read in silence; every transmission has a full transcript.
        </p></template
      >
      <article v-else-if="state === 'programme'" class="programme">
        <button @click="go('start')">← Return to the dial</button
        ><span class="frequency">{{ programmes[station].hz }}</span>
        <p>TRANSMISSION 0{{ station + 1 }} / PRESENTED BY {{ programmes[station].host }}</p>
        <h1>{{ programmes[station].name }}</h1>
        <p class="deck">{{ programmes[station].note }}</p>
        <div class="transcript">
          <small>00:00 / OPENING TRANSCRIPT</small>
          <p>{{ programmes[station].text }}</p>
          <small>03:20 / LINER NOTE</small>
          <p>
            Recorded in an imagined room, with the window left open. The pauses belong to the
            listener. This is original sample writing, with no live audio connection.
          </p>
        </div>
        <button @click="add">
          {{
            sequence.includes(station) ? 'In your sequence ✓' : 'Add to listening sequence'
          }}</button
        ><button @click="step(1)">Tune the next programme →</button>
      </article>
      <section v-else class="sequence">
        <h1>A night<br />of your own.</h1>
        <p>Choose programmes at the dial. Your sequence stays on this browser.</p>
        <ol>
          <li v-for="i in sequence" :key="i">
            <span>{{ programmes[i].hz }}</span
            ><button
              @click="
                station = i;
                go('programme');
              "
            >
              {{ programmes[i].name }}</button
            ><button @click="sequence = sequence.filter((n) => n !== i)">Remove</button>
          </li>
        </ol>
        <p v-if="!sequence.length">No transmissions selected yet.</p>
        <button @click="go('start')">Tune a programme</button>
        <h2>All transmissions</h2>
        <div class="all">
          <button
            v-for="(p, i) in programmes"
            :key="p.hz"
            @click="
              station = i;
              go('programme');
            "
          >
            {{ p.hz }} / {{ p.name }}
          </button>
        </div>
        <button @click="sequence = []">Clear sequence</button>
      </section>
    </main>
    <footer>FICTIONAL RADIO / REAL ATTENTION · SIX TRANSMISSIONS, ALWAYS AVAILABLE</footer>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 24px 4%;
  border-bottom: 1px solid #686c61;
}
header span {
  font-size: 9px;
  max-width: 160px;
}
header strong {
  font: 24px var(--heading);
  letter-spacing: 0.1em;
}
button {
  background: transparent;
  border: 1px solid #8e9383;
  padding: 10px 17px;
}
header button {
  font-size: 11px;
}
.instrument {
  position: relative;
  padding: 25px 0 5px;
  background: radial-gradient(ellipse at center, #394039, transparent 65%);
}
.dial {
  width: min(680px, 95vw);
  aspect-ratio: 1;
  margin: auto;
  border-radius: 50%;
  position: relative;
  border: 1px solid #a3a18e;
}
.ticks {
  position: absolute;
  inset: 5%;
  border-radius: 50%;
  background: repeating-conic-gradient(from -1deg, #b8a98a 0 1deg, transparent 1deg 5deg);
  mask: radial-gradient(transparent 65%, #000 65% 68%, transparent 68%);
}
.needle {
  position: absolute;
  left: calc(50% - 1px);
  top: 10%;
  height: 40%;
  width: 2px;
  background: var(--accent);
  transform-origin: bottom;
  transition: transform 0.5s ease;
}
.station {
  position: absolute;
  transform: translate(-50%, -50%);
  border: 0;
  padding: 4px;
  font-size: 12px;
  background: #202322;
  border-radius: 50%;
  min-width: 48px;
}
.station[aria-pressed='true'] {
  background: var(--accent);
  color: #202322;
}
.dial-centre {
  position: absolute;
  inset: 27% 20%;
  text-align: center;
}
.dial-centre > span {
  font-size: 9px;
  letter-spacing: 0.2em;
  color: var(--accent);
}
.dial h1 {
  font: clamp(28px, 4vw, 55px)/1.08 var(--heading);
  margin: 15px 0;
  letter-spacing: -0.04em;
}
.dial-centre p {
  font: 40px var(--body);
  margin: 8px 0;
}
.dial-centre small {
  font-size: 12px;
}
.dial-centre button {
  border: 0;
  border-bottom: 1px solid;
  font-size: 11px;
  padding: 7px 0;
}
.serial {
  position: absolute;
  left: 4%;
  bottom: 25px;
  writing-mode: vertical-rl;
  font-size: 10px;
  color: #d4c4a9;
}
.tuner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
  padding: 20px;
  border-block: 1px solid #686c61;
}
.tuner label {
  font-size: 10px;
  display: flex;
  align-items: center;
  gap: 20px;
}
.tuner input {
  accent-color: var(--accent);
  width: 200px;
}
.intro {
  margin: 30px auto;
  padding: 0 20px;
  font: 17px/1.8 var(--heading);
  text-align: center;
  max-width: 650px;
}
.programme,
.sequence {
  padding: 40px 7% 80px;
}
.frequency {
  display: block;
  font: clamp(90px, 20vw, 240px)/1 var(--heading);
  color: var(--accent);
  letter-spacing: -0.08em;
  border-bottom: 1px solid;
  margin: 25px 0;
}
.programme > p:first-of-type {
  font-size: 11px;
}
.programme h1,
.sequence h1 {
  font: clamp(40px, 6vw, 80px)/1.1 var(--heading);
  max-width: 850px;
}
.deck {
  font: 23px/1.6 var(--heading);
}
.transcript {
  margin: 45px 0;
  max-width: 750px;
  border-left: 1px solid var(--accent);
  padding-left: 25px;
}
.transcript p {
  font: 21px/1.8 var(--heading);
  margin: 16px 0 35px;
}
.transcript small {
  color: var(--accent);
}
.programme > button {
  margin: 0 12px 10px 0;
}
.sequence li {
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid;
}
.sequence ol {
  padding: 0;
  list-style: none;
}
.sequence li > span {
  font-size: 35px;
  color: var(--accent);
}
.sequence h2 {
  margin-top: 55px;
}
.all {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin: 20px 0;
}
footer {
  padding: 20px 4%;
  font-size: 9px;
  border-top: 1px solid #686c61;
}
@media (max-width: 700px) {
  header {
    flex-wrap: wrap;
  }
  header strong {
    order: -1;
    width: 100%;
    font-size: 20px;
  }
  .dial-centre {
    inset: 27% 19%;
  }
  .dial h1 {
    font-size: 29px;
  }
  .dial-centre p {
    font-size: 28px;
    margin: 3px 0;
  }
  .dial-centre button {
    font-size: 9px;
  }
  .station {
    font-size: 10px;
  }
  .serial {
    display: none;
  }
  .tuner {
    gap: 10px;
    flex-wrap: wrap;
  }
  .tuner label {
    order: -1;
    width: 100%;
    justify-content: center;
  }
  .tuner button {
    font-size: 11px;
  }
  .sequence li {
    flex-wrap: wrap;
  }
  .sequence li > span {
    font-size: 24px;
  }
  .programme,
  .sequence {
    padding: 25px 5%;
  }
  .transcript p {
    font-size: 18px;
  }
  .instrument {
    padding: 35px 0;
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
