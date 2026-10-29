<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const measure = ref(1),
  voice = ref(0),
  playing = ref(false),
  sound = ref(false),
  arrangement = useStored<number[]>('94:arrangement', []);
let timer: ReturnType<typeof setInterval> | undefined;
let audio: AudioContext | undefined;
const voices = ['The room', 'The street', 'The body', 'The pause'];
const titles = ['Arrival', 'An opening', 'Crossing', 'Held breath', 'A return', 'Afterwards'];
const lines = [
  [
    'A chair is moved.',
    'The window admits a square of morning.',
    'Two sounds occupy the same corner.',
    'The ceiling seems to wait.',
    'A familiar object has changed position.',
    'The room remains after the reading.',
  ],
  [
    'A gate closes somewhere outside.',
    'Footsteps become a passing sentence.',
    'A bicycle bell enters, then leaves.',
    'The traffic holds at a red light.',
    'A bus repeats the first low note.',
    'The street continues without a final chord.',
  ],
  [
    'A hand finds the edge of the page.',
    'Breathing settles into a longer interval.',
    'The eyes move ahead of the voice.',
    'A held breath makes the silence audible.',
    'The hand returns to the first mark.',
    'The reader carries the rhythm away.',
  ],
  [
    'Leave room before the first word.',
    'Do not fill every available interval.',
    'Let two voices disagree about the pace.',
    'This measure contains no instruction.',
    'Return without trying to repeat exactly.',
    'End before the silence becomes an effect.',
  ],
];
function tone() {
  if (!sound.value) return;
  audio ??= new AudioContext();
  void audio.resume();
  const osc = audio.createOscillator(),
    gain = audio.createGain();
  osc.frequency.value = [220, 247, 262, 294, 330, 349][measure.value];
  gain.gain.setValueAtTime(0.025, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.4);
  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start();
  osc.stop(audio.currentTime + 0.4);
}
function stop() {
  playing.value = false;
  if (timer) clearInterval(timer);
  timer = undefined;
}
function play() {
  if (playing.value) {
    stop();
    return;
  }
  playing.value = true;
  tone();
  timer = setInterval(() => {
    if (measure.value >= 5) {
      stop();
      return;
    }
    measure.value++;
    tone();
  }, 2500);
}
function select(i: number) {
  measure.value = i;
  tone();
}
function keep() {
  if (!arrangement.value.includes(measure.value)) arrangement.value.push(measure.value);
}
onUnmounted(() => {
  stop();
  void audio?.close();
});
watch(state, () => stop());
</script>
<template>
  <div class="specimen" :class="{ entry: state === 'start' }">
    <a class="skip" href="#content">Skip to content</a>

    <header>
      <strong>INTERVAL<span>A PUBLICATION IN MEASURES</span></strong>
      <nav>
        <button @click="go('start')">The score</button
        ><button @click="go('arrangement')">Your arrangement ({{ arrangement.length }})</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><h1 class="sr">Interval: a publication in six measures and four voices</h1>
        <div class="transport">
          <button @click="play">{{ playing ? 'Pause reading' : 'Perform the sequence' }}</button
          ><button
            @click="
              stop();
              measure = 0;
            "
          >
            Return to measure 1</button
          ><label><input type="checkbox" v-model="sound" /> Optional quiet tones</label
          ><span>ONE MEASURE / 2.5 SECONDS</span>
        </div>
        <div
          class="score-scroll"
          tabindex="0"
          role="region"
          aria-label="Musical reading score, horizontally scrollable"
        >
          <div class="score">
            <div class="measure-head">
              <span>VOICES ↓</span
              ><button
                v-for="(title, i) in titles"
                :key="title"
                :aria-pressed="measure === i"
                @click="select(i)"
              >
                <b>{{ i + 1 }}</b
                >{{ title }}
              </button>
            </div>
            <div v-for="(v, j) in voices" :key="v" class="staff" :class="{ chosen: voice === j }">
              <button class="voice-name" @click="voice = j" :aria-pressed="voice === j">
                0{{ j + 1 }}<strong>{{ v }}</strong></button
              ><button
                v-for="(line, i) in lines[j]"
                :key="line"
                class="note"
                :class="{ active: measure === i && voice === j }"
                @click="
                  measure = i;
                  voice = j;
                  go('movement');
                "
              >
                <span :style="{ marginTop: ((i + j) % 3) * 12 + 'px' }">{{ line }}</span
                ><small>Read ↗</small>
              </button>
            </div>
          </div>
        </div>
        <div class="current">
          <span>MEASURE {{ measure + 1 }} / {{ voices[voice] }}</span>
          <p>{{ lines[voice][measure] }}</p>
          <button @click="go('movement')">Open the movement</button
          ><button @click="keep">
            {{ arrangement.includes(measure) ? 'In your arrangement ✓' : 'Add this measure' }}
          </button>
        </div></template
      >
      <article v-else-if="state === 'movement'" class="movement">
        <button @click="go('start')">← Return to the score</button
        ><span class="number">{{ measure + 1 }}</span>
        <h1>{{ titles[measure] }}</h1>
        <div class="voice-lines">
          <section v-for="(v, i) in voices" :key="v">
            <small>{{ v }}</small>
            <p>{{ lines[i][measure] }}</p>
          </section>
        </div>
        <p class="note-text">
          Read the four lines separately, then imagine them occurring together. The score offers a
          structure for attention; it does not prescribe a correct emotional response.
        </p>
        <button @click="keep">
          {{
            arrangement.includes(measure)
              ? 'Added to your score ✓'
              : 'Add this measure to your score'
          }}</button
        ><button @click="measure = (measure + 1) % 6">Next movement →</button>
      </article>
      <section v-else class="arrangement">
        <h1>A score<br />in your order.</h1>
        <p>
          Measures stay in the order you add them. Remove one and add it again to change its
          position.
        </p>
        <ol>
          <li v-for="(i, j) in arrangement" :key="i">
            <span>{{ j + 1 }}</span
            ><button
              @click="
                measure = i;
                go('movement');
              "
            >
              {{ titles[i] }}</button
            ><button @click="arrangement = arrangement.filter((n) => n !== i)">Remove</button>
          </li>
        </ol>
        <p v-if="!arrangement.length">No measures selected yet.</p>
        <button @click="go('start')">Choose a measure</button
        ><button @click="arrangement = []">Clear score</button>
      </section>
    </main>
    <footer>
      INTERVAL / Original score and text. Audio is optional; reading is complete in silence.
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 25px 4%;
  border-bottom: 1px solid #b3a8bb;
}
header strong {
  font: 31px var(--heading);
  letter-spacing: -0.05em;
}
header span {
  display: block;
  font: 9px var(--body);
  letter-spacing: 0.1em;
  margin-top: 8px;
}
button {
  border: 0;
  background: transparent;
  border-bottom: 1px solid;
  padding: 10px 5px;
}
nav {
  font-size: 11px;
}
.opening {
  padding: 40px 5%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 30px;
}
.opening h1 {
  font: clamp(40px, 5.5vw, 75px)/1.15 var(--heading);
  letter-spacing: -0.05em;
  margin: 0;
}
.opening p {
  font-size: 12px;
  line-height: 1.9;
}
.transport {
  display: flex;
  gap: 25px;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 5%;
  border-block: 1px solid #b3a8bb;
  font-size: 11px;
}
.transport label {
  display: flex;
  gap: 8px;
  align-items: center;
}
.transport input {
  accent-color: #6c418b;
}
.transport > span {
  margin-left: auto;
  font-size: 9px;
}
.score-scroll {
  overflow-x: auto;
  padding: 25px 0;
}
.score {
  min-width: 1000px;
}
.measure-head,
.staff {
  display: grid;
  grid-template-columns: 150px repeat(6, 1fr);
}
.measure-head > span {
  align-self: end;
  padding: 20px;
  font-size: 9px;
}
.measure-head button {
  font: 10px var(--body);
  text-align: left;
  border: 0;
  border-left: 1px solid #b3a8bb;
  padding: 12px;
}
.measure-head b {
  font: 60px/1 var(--heading);
  display: block;
  margin-bottom: 12px;
}
.measure-head button[aria-pressed='true'] {
  background: #dfd2e9;
}
.staff {
  background: repeating-linear-gradient(0deg, transparent 0 19px, #b3a8bb 19px 20px);
  min-height: 140px;
  margin-top: 15px;
}
.voice-name {
  background: #f2eddf;
  text-align: left;
  padding: 20px;
  font: 10px var(--body);
  border: 0;
}
.voice-name strong {
  display: block;
  font: 18px/1.4 var(--heading);
  margin-top: 12px;
}
.chosen .voice-name {
  color: #6c418b;
}
.note {
  padding: 15px 10px;
  border: 0;
  border-left: 1px solid #b3a8bb;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
.note > span {
  background: #eee4d0;
  border-left: 5px solid #6c418b;
  padding: 7px;
  font: 12px/1.5 var(--heading);
  max-width: 100%;
}
.note:nth-child(3n) > span {
  background: #dce3da;
}
.note small {
  font-size: 8px;
  background: #f2eddf;
  padding: 3px;
}
.note.active {
  background: #d6c4e4;
}
.current {
  padding: 35px 5%;
  border-top: 1px solid #b3a8bb;
}
.current > span {
  font-size: 10px;
  color: #6c418b;
}
.current p {
  font: 30px var(--heading);
  margin: 20px 0;
}
.current button {
  margin-right: 25px;
  font-size: 11px;
}
.movement,
.arrangement {
  padding: 35px 7% 70px;
}
.number {
  display: block;
  font: 180px/1 var(--heading);
  color: #6c418b;
  margin-top: 25px;
}
.movement h1,
.arrangement h1 {
  font: clamp(45px, 6vw, 85px)/1.1 var(--heading);
  letter-spacing: -0.05em;
  margin: 25px 0;
}
.voice-lines section {
  padding: 25px 0;
  border-top: 1px solid #b3a8bb;
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 30px;
}
.voice-lines small {
  font-size: 10px;
  color: #6c418b;
}
.voice-lines p {
  font: 30px/1.6 var(--heading);
  margin: 0;
}
.note-text {
  font-size: 12px;
  line-height: 1.9;
  margin: 35px 0;
}
.movement > button {
  margin: 10px 20px 0 0;
  font-size: 11px;
}
.arrangement > p {
  font-size: 13px;
  line-height: 1.9;
}
.arrangement ol {
  list-style: none;
  padding: 0;
}
.arrangement li {
  display: flex;
  gap: 30px;
  align-items: center;
  border-top: 1px solid #b3a8bb;
  padding: 25px 0;
}
.arrangement li span {
  font: 45px var(--heading);
  color: #6c418b;
}
.arrangement li button {
  font: 25px var(--heading);
}
.arrangement li button:last-child {
  font: 11px var(--body);
  margin-left: auto;
}
.arrangement > button {
  margin-right: 25px;
}
footer {
  padding: 22px 4%;
  border-top: 1px solid #b3a8bb;
  font-size: 9px;
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
    font-size: 41px;
  }
  .opening p {
    margin-top: 25px;
  }
  .transport {
    gap: 15px;
  }
  .transport > span {
    margin: 0;
  }
  .current p {
    font-size: 25px;
  }
  .current button {
    margin-bottom: 15px;
  }
  .movement,
  .arrangement {
    padding: 30px 5%;
  }
  .voice-lines section {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .voice-lines p {
    font-size: 25px;
  }
  .arrangement li {
    gap: 15px;
  }
  .arrangement li button {
    font-size: 21px;
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
  padding-left: 80px;
}
.entry header {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 80px;
  padding: 25px 12px;
  background: #28223c;
  color: #f2eddf;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 35px;
  border: 0;
}
.entry header strong {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 43px;
  line-height: 1;
  letter-spacing: 0.1em;
}
.entry header strong span {
  font: 8px var(--body);
  letter-spacing: 0.15em;
}
.entry header nav {
  writing-mode: vertical-rl;
  gap: 20px;
}
.entry header nav button {
  font-size: 10px;
  border: 0;
  border-left: 1px solid;
  padding: 12px 8px;
}
.entry main > h1 {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip-path: inset(50%) !important;
  white-space: nowrap !important;
}
.entry .transport {
  padding: 20px 3%;
  border: 0;
  border-bottom: 1px solid #b3a8bb;
  background: #e7ddc7;
  gap: 22px;
}
.entry .transport > span {
  font-size: 8px;
}
.entry .score-scroll {
  padding: 0 0 30px;
}
.entry .score {
  min-width: 1250px;
}
.entry .measure-head,
.entry .staff {
  grid-template-columns: 140px repeat(6, minmax(0, 1fr));
}
.entry .measure-head b {
  font-size: 130px;
  line-height: 1;
  margin: 0 0 15px;
}
.entry .measure-head button {
  padding: 20px 12px;
  font-size: 11px;
}
.entry .measure-head > span {
  writing-mode: vertical-rl;
  font-size: 10px;
  letter-spacing: 0.2em;
}
.entry .staff {
  min-height: 180px;
  margin-top: 0;
  background: repeating-linear-gradient(0deg, transparent 0 29px, #b3a8bb 29px 30px);
}
.entry .note {
  padding: 20px 10px;
}
.entry .note > span {
  font-size: 15px;
  line-height: 1.5;
  border-left: 3px solid;
  padding: 10px;
}
.entry .note small {
  font-size: 9px;
}
.entry .voice-name {
  padding: 18px;
  font-size: 11px;
}
.entry .voice-name strong {
  font-size: 22px;
}
.entry .current {
  background: #28223c;
  color: #f2eddf;
  border: 0;
  padding: 30px 4%;
}
.entry .current > span {
  color: #d9b9ec;
}
.entry .current button {
  color: inherit;
}
@media (max-width: 750px) {
  .entry {
    padding-left: 38px;
  }
  .entry header {
    width: 38px;
    padding: 18px 7px;
    gap: 30px;
  }
  .entry header strong {
    font-size: 23px;
  }
  .entry header strong span {
    display: none;
  }
  .entry header nav {
    gap: 15px;
  }
  .entry header nav button {
    font-size: 9px;
    padding: 10px 3px;
  }
  .entry .transport {
    padding: 16px 6%;
    gap: 13px;
    font-size: 10px;
  }
  .entry .transport > span {
    display: none;
  }
  .entry .score {
    min-width: 1100px;
  }
  .entry .measure-head,
  .entry .staff {
    grid-template-columns: 100px repeat(6, minmax(0, 1fr));
  }
  .entry .measure-head b {
    font-size: 100px;
  }
  .entry .staff {
    min-height: 170px;
  }
  .entry .voice-name strong {
    font-size: 18px;
  }
  .entry .current {
    padding: 25px 7%;
  }
  .entry .current p {
    font-size: 25px;
  }
}
</style>
