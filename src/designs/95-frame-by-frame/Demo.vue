<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const frame = ref(25),
  sketch = ref(false),
  playing = ref(false);
let timer: ReturnType<typeof setInterval> | undefined;
const chapter = computed(() => Math.min(5, Math.floor((frame.value - 1) / 12)));
const notes = [
  [
    'A room before anyone arrives',
    'The first twelve frames establish an empty window. The scene needs a stable geometry before a small change can become visible.',
  ],
  [
    'A light across the courtyard',
    'A neighbouring light changes the meaning of the same shapes. Nothing enters the room, but it no longer feels entirely alone.',
  ],
  [
    'The curtain moves',
    'The movement is deliberately slight. A single changed edge can suggest air, weather and an unseen opening beyond the frame.',
  ],
  [
    'A figure passes',
    'The figure is a brief interruption, not a character introduction. Its scale lets the viewer infer the distance across the courtyard.',
  ],
  [
    'The light goes out',
    'The scene returns to darkness with one difference: the viewer now knows what occupied it. An absence can carry information acquired earlier.',
  ],
  [
    'Morning at the sill',
    'The final frames lift the background just enough to reveal the sill. The film ends by making a familiar boundary newly visible.',
  ],
];
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
  if (frame.value === 72) frame.value = 1;
  playing.value = true;
  timer = setInterval(() => {
    if (frame.value >= 72) {
      stop();
      return;
    }
    frame.value++;
  }, 180);
}
function jog(n: number) {
  stop();
  frame.value = Math.max(1, Math.min(72, frame.value + n));
}
onUnmounted(stop);
watch(state, stop);
</script>
<template>
  <div class="specimen" :class="{ entry: state === 'start' }">
    <a class="skip" href="#content">Skip to content</a>

    <header>
      <strong>NIGHT WINDOW</strong><span>A FILM IN 72 FRAMES / ORIGINAL VECTOR STUDY</span
      ><button @click="go('production')">Production notebook ↗</button>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><h1 class="sr">Night Window: read a film one frame at a time</h1>
        <div class="screen" :class="{ sketch }">
          <svg
            viewBox="0 0 1000 440"
            role="img"
            :aria-label="
              'Night window, frame ' + frame + (sketch ? ', storyboard' : ', final drawing')
            "
          >
            <rect
              width="1000"
              height="440"
              :fill="sketch ? '#e6ddc3' : frame > 60 ? '#48535c' : '#24303b'"
            />
            <path
              d="M0 150L190 70 190 440H0M690 0H1000V440H690"
              :fill="sketch ? 'none' : '#161f28'"
              stroke="#6f818c"
            />
            <rect
              x="720"
              y="100"
              width="100"
              height="125"
              :fill="sketch ? 'none' : frame > 12 && frame < 49 ? '#e2c681' : '#34414c'"
              stroke="#83908b"
            />
            <path d="M760 100V225M720 155H820" stroke="#1a242c" stroke-width="9" />
            <rect
              x="245"
              y="30"
              width="410"
              height="385"
              :fill="sketch ? 'none' : '#0d151c'"
              stroke="#8a999b"
              stroke-width="14"
            />
            <path d="M450 30V415M245 225H655" stroke="#8a999b" stroke-width="12" />
            <path
              :d="
                'M255 40Q' +
                (330 + Math.sin(frame / 8) * 30) +
                ' 190 280 405H350Q' +
                (375 + Math.sin(frame / 8) * 40) +
                ' 180 365 40Z'
              "
              :fill="sketch ? 'none' : '#b6b2a0'"
              stroke="#87918c"
            />
            <path
              v-if="frame > 36 && frame < 49"
              :d="'M' + (725 + (frame - 37) * 5) + ' 145v65'"
              stroke="#26303a"
              stroke-width="20"
            />
            <rect x="215" y="410" width="470" height="22" fill="#5b6d75" /></svg
          ><span class="timecode"
            >00:{{ String(Math.floor(frame / 12)).padStart(2, '0') }}:{{
              String(frame % 12).padStart(2, '0')
            }}</span
          ><span class="frame-number">{{ String(frame).padStart(3, '0') }}</span
          ><button @click="go('annotation')">Read this moment ↗</button>
        </div>
        <div class="jog">
          <button @click="jog(-1)" :disabled="frame === 1">← One frame</button
          ><button @click="play">{{ playing ? 'Pause film' : 'Play film' }}</button
          ><label
            >Frame {{ frame }} of 72<input
              type="range"
              min="1"
              max="72"
              v-model.number="frame"
              @input="stop" /></label
          ><button @click="jog(1)" :disabled="frame === 72">One frame →</button
          ><button @click="sketch = !sketch">
            {{ sketch ? 'Show final drawing' : 'Show storyboard' }}
          </button>
        </div>
        <div class="filmstrip" tabindex="0" role="region" aria-label="Six film chapters">
          <button
            v-for="(n, i) in notes"
            :key="n[0]"
            :aria-pressed="chapter === i"
            @click="
              stop();
              frame = i * 12 + 1;
            "
          >
            <span class="mini-frame" :style="{ '--sky': i > 4 ? '#48535c' : '#24303b' }"
              ><i></i><b>{{ String(i * 12 + 1).padStart(3, '0') }}</b></span
            ><strong>{{ n[0] }}</strong
            ><small>FRAMES {{ i * 12 + 1 }}–{{ (i + 1) * 12 }}</small>
          </button>
        </div></template
      >
      <article v-else-if="state === 'annotation'" class="annotation">
        <button @click="go('start')">← Return to this frame</button
        ><span class="big-frame">{{ String(frame).padStart(3, '0') }}</span>
        <h1>{{ notes[chapter][0] }}</h1>
        <p class="lead">{{ notes[chapter][1] }}</p>
        <div class="production-line">
          <span>POSITION / {{ frame }} OF 72</span><span>CHAPTER / {{ chapter + 1 }} OF 6</span
          ><span>METHOD / ORIGINAL SVG</span>
        </div>
        <h2>What changes, what stays</h2>
        <p>
          The window geometry remains fixed. Light, a curtain edge and a passing silhouette carry
          the sequence. The study demonstrates how a small temporal change can reorganise attention
          without a cut.
        </p>
        <button @click="frame = Math.min(72, (chapter + 1) * 12 + 1)">
          Next annotated moment →</button
        ><button @click="go('production')">Read the production notes</button>
      </article>
      <section v-else class="production">
        <h1>A film made<br />from small differences.</h1>
        <p>
          Night Window is an original fictional vector vignette, created for this reference. No
          external video or copyrighted film footage is used.
        </p>
        <ol>
          <li v-for="(n, i) in notes" :key="n[0]">
            <span>0{{ i + 1 }}</span>
            <div>
              <h2>{{ n[0] }}</h2>
              <p>{{ n[1] }}</p>
              <button
                @click="
                  frame = i * 12 + 1;
                  go('annotation');
                "
              >
                Open frame {{ i * 12 + 1 }} ↗
              </button>
            </div>
          </li>
        </ol>
        <button @click="go('start')">Return to the film</button>
      </section>
    </main>
    <footer>
      NIGHT WINDOW / Playback is optional. Every frame and annotation can be reached directly.
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
  padding: 25px 4%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid #5c635f;
}
header strong {
  font: 25px var(--heading);
  letter-spacing: -0.03em;
}
header span {
  font-size: 9px;
}
button {
  background: transparent;
  border: 1px solid #899084;
  padding: 10px 14px;
}
header button {
  font-size: 10px;
}
.film-title {
  padding: 35px 5%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 30px;
}
.film-title h1 {
  font: clamp(40px, 5vw, 70px)/1.05 var(--heading);
  letter-spacing: -0.05em;
  margin: 0;
}
.film-title p {
  font-size: 12px;
  line-height: 1.8;
  margin: 0;
}
.screen {
  margin: 0 5%;
  position: relative;
  border: 1px solid #5c635f;
  background: #24303b;
}
.screen svg {
  display: block;
  width: 100%;
  max-height: 460px;
}
.timecode {
  position: absolute;
  left: 20px;
  bottom: 20px;
  font-size: 11px;
  color: #eee6d3;
  background: #121619cc;
  padding: 6px 10px;
}
.frame-number {
  position: absolute;
  right: 20px;
  top: 20px;
  font: 70px/1 var(--heading);
  color: #eee6d3;
  background: #121619cc;
  padding: 5px 12px;
}
.screen > button {
  position: absolute;
  right: 20px;
  bottom: 20px;
  background: #121619cc;
  font-size: 10px;
  color: #eee6d3;
}
.jog {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 5%;
  flex-wrap: wrap;
  font-size: 10px;
}
.jog label {
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
}
.jog input {
  accent-color: #d5bd72;
  min-width: 120px;
  flex: 1;
}
.filmstrip {
  display: flex;
  gap: 25px;
  overflow-x: auto;
  padding: 25px 5% 45px;
  border-top: 1px solid #5c635f;
  background: repeating-linear-gradient(90deg, #121619 0 15px, #c7c4b8 15px 30px, #121619 30px 45px)
    0 4px/100% 7px no-repeat;
}
.filmstrip > button {
  flex: 0 0 230px;
  min-width: 0;
  text-align: left;
  border: 0;
  padding: 0;
}
.mini-frame {
  display: block;
  position: relative;
  height: 135px;
  background: var(--sky);
  border: 8px solid #080c0e;
}
.mini-frame i {
  position: absolute;
  left: 35%;
  top: 10%;
  height: 85%;
  width: 35%;
  border: 5px solid #839595;
  background: linear-gradient(90deg, #a6aa9a 40%, #15202a 40%);
}
.mini-frame b {
  position: absolute;
  left: 10px;
  bottom: 10px;
  font: 35px var(--heading);
}
.filmstrip strong {
  font: 16px var(--heading);
  display: block;
  margin: 15px 0 8px;
}
.filmstrip small {
  font-size: 8px;
  color: #d5bd72;
}
.filmstrip button[aria-pressed='true'] .mini-frame {
  outline: 2px solid #d5bd72;
}
.annotation,
.production {
  padding: 35px 7% 70px;
}
.big-frame {
  display: block;
  font: clamp(110px, 20vw, 240px)/1 var(--heading);
  color: #d5bd72;
  margin-top: 30px;
  letter-spacing: -0.06em;
}
.annotation h1,
.production h1 {
  font: clamp(45px, 6vw, 85px)/1.05 var(--heading);
  letter-spacing: -0.04em;
  margin: 30px 0;
}
.lead {
  font: clamp(24px, 3vw, 37px)/1.6 var(--heading);
  max-width: 40ch;
}
.production-line {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  padding: 25px 0;
  border-block: 1px solid #5c635f;
  font-size: 10px;
  margin: 40px 0;
}
.annotation h2 {
  font: 25px var(--heading);
}
.annotation > p:not(.lead) {
  font: 17px/1.9 var(--heading);
}
.annotation > button {
  margin: 20px 20px 0 0;
  font-size: 11px;
}
.production > p {
  font: 18px/1.8 var(--heading);
}
.production ol {
  list-style: none;
  padding: 0;
  margin: 40px 0;
}
.production li {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 25px;
  padding: 25px 0;
  border-top: 1px solid #5c635f;
}
.production li > span {
  font: 50px var(--heading);
  color: #d5bd72;
}
.production h2 {
  font: 28px var(--heading);
}
.production li p {
  font: 17px/1.8 var(--heading);
}
.production li button {
  font-size: 10px;
}
footer {
  padding: 22px 4%;
  font-size: 9px;
  border-top: 1px solid #5c635f;
}
@media (max-width: 700px) {
  header {
    flex-wrap: wrap;
  }
  .film-title {
    display: block;
    padding: 30px 5%;
  }
  .film-title h1 {
    font-size: 41px;
  }
  .film-title p {
    margin-top: 20px;
  }
  .screen svg {
    height: 300px;
    object-fit: cover;
  }
  .frame-number {
    font-size: 40px;
    right: 10px;
    top: 10px;
  }
  .timecode {
    font-size: 8px;
    left: 10px;
    bottom: 10px;
  }
  .screen > button {
    font-size: 8px;
    right: 10px;
    bottom: 10px;
    padding: 7px;
  }
  .jog {
    gap: 12px;
  }
  .jog label {
    order: -1;
    width: 100%;
    flex: auto;
  }
  .filmstrip > button {
    flex-basis: 200px;
  }
  .annotation,
  .production {
    padding: 30px 5%;
  }
  .production li {
    grid-template-columns: 45px 1fr;
    gap: 15px;
  }
  .production li > span {
    font-size: 32px;
  }
  .production h2 {
    font-size: 24px;
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
  background: #080c0e;
}
.entry header {
  position: absolute;
  top: 24px;
  left: 3%;
  right: 3%;
  padding: 0;
  border: 0;
  z-index: 4;
}
.entry header strong {
  font-size: 15px;
  letter-spacing: 0.26em;
}
.entry header > span {
  font-size: 8px;
}
.entry header button {
  font-size: 10px;
  background: #080c0e;
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
.entry .screen {
  margin: 0;
  border: 0;
  border-inline: 35px solid #080c0e;
  position: relative;
  height: 80svh;
  min-height: 660px;
  padding: 65px 0 0;
  background: #080c0e;
}
.entry .screen:before,
.entry .screen:after {
  content: '';
  position: absolute;
  top: 10%;
  bottom: 5%;
  width: 12px;
  background: repeating-linear-gradient(0deg, #e4e1cc 0 18px, transparent 18px 32px);
  left: -23px;
}
.entry .screen:after {
  left: auto;
  right: -23px;
}
.entry .screen svg {
  height: 100%;
  width: 100%;
  display: block;
}
.entry .frame-number {
  font-size: clamp(90px, 17vw, 250px);
  line-height: 1;
  right: 3%;
  top: auto;
  bottom: 25px;
  opacity: 0.4;
  letter-spacing: -0.08em;
  pointer-events: none;
}
.entry .screen > button {
  left: 4%;
  right: auto;
  bottom: 35px;
  background: #080c0e;
  font-size: 11px;
}
.entry .timecode {
  top: 90px;
  bottom: auto;
  left: 4%;
}
.entry .jog {
  border: 0;
  padding: 20px 3%;
  gap: 20px;
  background: #080c0e;
}
.entry .jog button {
  font-size: 10px;
}
.entry .filmstrip {
  margin: 0;
  padding: 20px 3%;
  border-block: 1px dashed #738181;
  gap: 12px;
  background: #10181e;
}
.entry .filmstrip button {
  min-width: 160px;
}
.entry .filmstrip .mini {
  height: 100px;
}
@media (max-width: 750px) {
  .entry header {
    top: 20px;
    left: 6%;
    right: 6%;
    gap: 12px;
  }
  .entry header strong {
    font-size: 10px;
    max-width: 120px;
  }
  .entry header > span {
    display: none;
  }
  .entry header button {
    font-size: 9px;
    padding: 8px;
  }
  .entry .screen {
    height: 66svh;
    min-height: 520px;
    border-inline-width: 18px;
    padding-top: 70px;
  }
  .entry .screen:before,
  .entry .screen:after {
    width: 7px;
    left: -12px;
    background-size: auto 30px;
  }
  .entry .screen:after {
    left: auto;
    right: -12px;
  }
  .entry .frame-number {
    font-size: 105px;
    bottom: 70px;
  }
  .entry .screen > button {
    bottom: 25px;
  }
  .entry .timecode {
    top: 100px;
    font-size: 9px;
  }
  .entry .jog {
    padding: 18px 6%;
    gap: 10px;
  }
  .entry .jog label {
    order: -1;
    width: 100%;
  }
  .entry .filmstrip {
    padding: 16px 6%;
  }
  .entry .filmstrip button {
    min-width: 135px;
  }
}
</style>
