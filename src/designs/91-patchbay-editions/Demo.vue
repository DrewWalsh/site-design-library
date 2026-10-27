<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const subject = ref(0),
  method = ref(1);
const subjects = ['Water', 'Work', 'Memory'],
  methods = ['Measure', 'Listen', 'Repair'];
const saved = useStored<number[]>('91:patches', []);
const index = computed(() => subject.value * 3 + method.value);
const essays = [
  [
    'A river in units',
    'Measuring water turns a continuous movement into a sequence of observations. The useful question is not only how much passes, but what the chosen interval makes invisible.',
  ],
  [
    'Listening below the bridge',
    'The river sounds different beneath each arch. Stone, clearance and traffic change the same flow into separate acoustic rooms. Listening offers a map that a survey cannot draw.',
  ],
  [
    'Repairing a bank',
    'A riverbank is not a fixed edge. Repair begins by deciding which movements to allow and which to resist, making maintenance a negotiation with the water rather than a victory over it.',
  ],
  [
    'The length of a shift',
    'A timesheet records duration, but not the uneven effort inside it. Measuring work responsibly means asking whose pauses count and whose attention remains unrecorded.',
  ],
  [
    'The room after work',
    'When the machinery stops, other sounds become available: a drawer closing, a conversation resumed, a chair returned to its place. The end of work has a composition of its own.',
  ],
  [
    'A tool returned to use',
    'Repair changes the relation between a worker and an object. The new handle does not erase the old wear; it lets the tool carry its history into another day.',
  ],
  [
    'A memory with dimensions',
    'A remembered room often has the wrong proportions. Measuring it again can reveal which distances mattered emotionally and which were merely architectural.',
  ],
  [
    'The voice in the recording',
    'A recording keeps the words and also the hesitation before them. Listening to memory means hearing both, without treating the pause as an error to remove.',
  ],
  [
    'Mending an account',
    'A family story can be repaired without making it seamless. Contradictions may be the joints that show where different lives have been asked to carry the same narrative.',
  ],
];
function keep() {
  if (!saved.value.includes(index.value)) saved.value.push(index.value);
}
function restore(i: number) {
  subject.value = Math.floor(i / 3);
  method.value = i % 3;
  go('essay');
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>

    <header>
      <strong>CROSSWIRE<span>EDITION 003 / NINE POSSIBLE CONNECTIONS</span></strong
      ><button @click="go('patches')">Patch sheet ({{ saved.length }})</button>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><div class="instruction">
          <h1>Connect a subject<br />to a way of seeing.</h1>
          <p>
            01 Choose a left socket.<br />02 Choose a right socket.<br />03 Follow the connection.
          </p>
        </div>
        <div class="patchbay">
          <svg class="cables" viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden="true">
            <path
              :d="'M100 ' + (105 + subject * 145) + ' C400 490 600 20 900 ' + (105 + method * 145)"
              fill="none"
              stroke="#111b17"
              stroke-width="16"
            />
            <path
              :d="'M100 ' + (100 + subject * 145) + ' C400 485 600 15 900 ' + (100 + method * 145)"
              fill="none"
              stroke="#edbd64"
              stroke-width="8"
            />
          </svg>
          <div class="sockets left">
            <span>SUBJECT</span
            ><button
              v-for="(s, i) in subjects"
              :key="s"
              :aria-pressed="subject === i"
              @click="subject = i"
            >
              <i aria-hidden="true"></i>{{ s }}
            </button>
          </div>
          <article class="connection">
            <span
              >PATCH {{ subject + 1 }}:{{ method + 1 }} / {{ subjects[subject] }} ×
              {{ methods[method] }}</span
            >
            <h2>{{ essays[index][0] }}</h2>
            <p>{{ essays[index][1] }}</p>
            <button @click="go('essay')">Enter this connection ↗</button>
          </article>
          <div class="sockets right">
            <span>METHOD</span
            ><button
              v-for="(m, i) in methods"
              :key="m"
              :aria-pressed="method === i"
              @click="method = i"
            >
              {{ m }}<i aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <div class="legend">
          <span>● ACTIVE CIRCUIT</span>
          <p>
            Nine authored connections. Every pairing opens an essay; nothing is generated or sent
            elsewhere.
          </p>
          <button @click="keep">
            {{ saved.includes(index) ? 'Patch saved ✓' : 'Save this patch' }}
          </button>
        </div></template
      >
      <article v-else-if="state === 'essay'" class="essay">
        <button @click="go('start')">← Back to the patchbay</button>
        <div class="patch-label">{{ subjects[subject] }}<span>↝</span>{{ methods[method] }}</div>
        <h1>{{ essays[index][0] }}</h1>
        <p class="lead">{{ essays[index][1] }}</p>
        <section>
          <h2>Why this connection?</h2>
          <p>
            The subject is {{ subjects[subject].toLowerCase() }}. The method is to
            {{ methods[method].toLowerCase() }}. Holding one fixed while changing the other makes
            the editorial choice visible: the same material can support a different question.
          </p>
          <h2>Try the neighbouring socket</h2>
          <p>
            Keep the subject, change the method, then compare what the two readings make available.
            A connection is useful when it changes attention, not just terminology.
          </p>
        </section>
        <button @click="keep">
          {{ saved.includes(index) ? 'Saved to patch sheet ✓' : 'Keep this connection' }}</button
        ><button @click="method = (method + 1) % 3">Change the method →</button>
      </article>
      <section v-else class="patches">
        <h1>Your patch sheet.</h1>
        <p>A local record of the connections you kept.</p>
        <ol>
          <li v-for="i in saved" :key="i">
            <span>{{ subjects[Math.floor(i / 3)] }} ↝ {{ methods[i % 3] }}</span
            ><button @click="restore(i)">{{ essays[i][0] }}</button
            ><button @click="saved = saved.filter((n) => n !== i)">Remove</button>
          </li>
        </ol>
        <p v-if="!saved.length">No cables kept yet. Make your first connection at the panel.</p>
        <button @click="go('start')">Return to the patchbay</button>
        <details>
          <summary>All nine connections</summary>
          <button v-for="(e, i) in essays" :key="e[0]" @click="restore(i)">{{ e[0] }}</button>
        </details>
      </section>
    </main>
    <footer>CROSSWIRE / Original essays in a small, explicit connection system.</footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'IBM Plex Mono';
  src: url('/fonts/ibm-plex-mono.woff2') format('woff2');
  font-weight: 400 700;
  font-display: swap;
}
@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/space-grotesk.woff2') format('woff2');
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
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  border-bottom: 1px solid #819387;
}
header strong {
  font: 35px var(--body);
  letter-spacing: -0.04em;
}
header span {
  font: 9px var(--heading);
  display: block;
  margin-top: 7px;
  letter-spacing: 0.1em;
}
button {
  background: transparent;
  border: 1px solid #9aaa9c;
  padding: 11px 16px;
}
header button {
  font-size: 11px;
}
.instruction {
  display: flex;
  align-items: end;
  justify-content: space-between;
  padding: 35px 5%;
  gap: 30px;
}
.instruction h1 {
  font: clamp(35px, 4.6vw, 65px)/1.1 var(--body);
  letter-spacing: -0.04em;
  margin: 0;
}
.instruction p {
  font: 11px/2 var(--heading);
  color: #edbd64;
  margin: 0;
}
.patchbay {
  position: relative;
  display: grid;
  grid-template-columns: 170px 1fr 170px;
  gap: 40px;
  min-height: 500px;
  padding: 20px 5% 35px;
  background: radial-gradient(#617266 1px, transparent 1px);
  background-size: 15px 15px;
}
.cables {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.sockets {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
}
.sockets > span {
  font: 9px var(--heading);
  letter-spacing: 0.2em;
}
.sockets button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  border: 0;
  background: #26332f;
  padding: 15px 5px;
  font: 17px var(--body);
}
.sockets i {
  width: 40px;
  height: 40px;
  border: 8px solid #8c9c8c;
  border-radius: 50%;
  background: #101c15;
  flex-shrink: 0;
}
.sockets button[aria-pressed='true'] i {
  background: #edbd64;
  border-color: #c69d55;
  box-shadow: 0 0 0 3px #101c15;
}
.connection {
  align-self: center;
  background: #26332ff2;
  position: relative;
  border: 1px solid #819387;
  padding: 35px;
  max-width: 650px;
  z-index: 1;
}
.connection > span {
  font: 9px var(--heading);
  color: #edbd64;
}
.connection h2 {
  font: clamp(30px, 3.6vw, 48px)/1.1 var(--body);
  letter-spacing: -0.03em;
  margin: 25px 0;
}
.connection p {
  font: 16px/1.8 var(--body);
}
.connection button {
  font-size: 11px;
  color: #edbd64;
  border: 0;
  border-bottom: 1px solid;
  padding-left: 0;
}
.legend {
  padding: 25px 5%;
  display: flex;
  align-items: center;
  gap: 35px;
  border-block: 1px solid #819387;
  font-size: 11px;
}
.legend > span {
  color: #edbd64;
  white-space: nowrap;
}
.legend p {
  max-width: 500px;
  margin: 0;
  line-height: 1.8;
}
.legend button {
  margin-left: auto;
}
.essay,
.patches {
  padding: 40px 7% 70px;
}
.patch-label {
  display: flex;
  gap: 35px;
  align-items: center;
  font: 30px var(--body);
  color: #edbd64;
  margin: 40px 0;
}
.patch-label span {
  font-size: 80px;
}
.essay h1,
.patches h1 {
  font: clamp(45px, 6vw, 85px)/1.1 var(--body);
  letter-spacing: -0.04em;
  max-width: 900px;
}
.lead {
  font: clamp(25px, 3vw, 38px)/1.6 var(--body);
  max-width: 38ch;
}
.essay section {
  max-width: 750px;
  border-top: 1px solid #819387;
  padding-top: 30px;
  margin-top: 40px;
}
.essay section p {
  font: 18px/1.8 var(--body);
}
.essay section h2 {
  font: 14px var(--heading);
  color: #edbd64;
}
.essay > button {
  margin: 25px 20px 0 0;
}
.patches ol {
  list-style: none;
  padding: 0;
  margin: 40px 0;
}
.patches li {
  display: flex;
  gap: 25px;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #819387;
}
.patches li > span {
  font: 12px var(--heading);
  color: #edbd64;
}
.patches li > button {
  font: 20px var(--body);
  text-align: left;
}
.patches li > button:last-child {
  font: 11px var(--heading);
}
details {
  margin-top: 45px;
  font-size: 12px;
}
details button {
  display: block;
  margin-top: 15px;
}
footer {
  padding: 24px 4%;
  font: 9px var(--heading);
}
@media (max-width: 750px) {
  header {
    flex-wrap: wrap;
  }
  .instruction {
    display: block;
  }
  .instruction h1 {
    font-size: 38px;
  }
  .instruction p {
    margin-top: 25px;
  }
  .patchbay {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px 5%;
  }
  .sockets {
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
  .sockets > span {
    writing-mode: vertical-rl;
    font-size: 8px;
  }
  .sockets button {
    font-size: 12px;
    flex-direction: column;
    gap: 6px;
    padding: 5px;
  }
  .sockets i {
    width: 32px;
    height: 32px;
    border-width: 6px;
  }
  .right button {
    flex-direction: column-reverse;
  }
  .cables {
    opacity: 0.25;
  }
  .connection {
    padding: 25px;
  }
  .connection h2 {
    font-size: 34px;
  }
  .legend {
    flex-wrap: wrap;
    gap: 20px;
  }
  .legend button {
    margin: 0;
  }
  .essay,
  .patches {
    padding: 30px 5%;
  }
  .patches li {
    flex-wrap: wrap;
  }
  .patch-label {
    font-size: 25px;
    gap: 20px;
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
