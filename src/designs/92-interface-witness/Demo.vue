<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const events = ref<{ kind: number; number: number }[]>([]),
  selected = ref(0),
  counter = ref(0);
const actions = [
  {
    name: 'Begin',
    line: 'A beginning has been requested.',
    essay:
      'A button makes a promise before it does anything. Its label proposes an action and asks the visitor to imagine the result. The first click is a small act of trust in that promise.',
  },
  {
    name: 'Repeat',
    line: 'The same action means something different the second time.',
    essay:
      'Repetition tests whether an interface is consistent. It can also turn an ordinary action into a rhythm. Here the result is deliberately different only in its place in the sequence.',
  },
  {
    name: 'Hesitate',
    line: 'A pause has been deliberately recorded.',
    essay:
      'This page does not measure how long you wait. Choosing “Hesitate” gives a pause a visible place without treating your timing as data about your personality.',
  },
  {
    name: 'Leave a trace',
    line: 'A mark now exists because you chose to leave one.',
    essay:
      'A trace can be useful when its origin and purpose are legible. These marks live only in this open page. They are not sent to a server or compared with another person’s behaviour.',
  },
  {
    name: 'Change direction',
    line: 'The sequence has acquired a turn.',
    essay:
      'An interface usually makes the next action more obvious than the previous one. A visible turn reminds us that continuing is only one possible relation to a sequence.',
  },
  {
    name: 'Conclude',
    line: 'You have supplied an ending.',
    essay:
      'A finite experience can make room for a deliberate ending. Nothing here asks you to keep a streak, protect a score or continue after the work has served its purpose.',
  },
];
function act(kind: number) {
  counter.value++;
  events.value.push({ kind, number: counter.value });
  selected.value = kind;
}
function reset() {
  events.value = [];
  counter.value = 0;
  selected.value = 0;
  go('start');
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>

    <header>
      <strong>WITNESS</strong><span>A LOCAL PERFORMANCE / NOTHING SENT</span
      ><button @click="go('transcript')">Read the trace ({{ events.length }})</button>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><div class="performance">
          <h1>{{ events.length ? 'Something happened.' : 'Nothing has happened yet.' }}</h1>
          <div class="action-space">
            <button class="primary-action" @click="act(events.length ? 1 : 0)">
              <span>{{ events.length ? 'Again.' : 'Begin.' }}</span
              ><small>{{
                events.length ? 'A REPETITION IS ALSO A CHOICE' : 'ONE DELIBERATE ACTION'
              }}</small></button
            ><button
              v-for="(event, i) in events.slice(-4)"
              :key="event.number"
              class="observation"
              :class="'o' + i"
              @click="
                selected = event.kind;
                go('observation');
              "
            >
              <small>OBSERVATION {{ String(event.number).padStart(2, '0') }}</small
              >{{ actions[event.kind].line }}<span>Read ↗</span>
            </button>
          </div>
          <p role="status" class="latest">
            {{
              events.length
                ? actions[events[events.length - 1].kind].line
                : 'The page is waiting for an intentional action.'
            }}
          </p>
          <nav class="actions" aria-label="Performance actions">
            <button v-for="i in [2, 3, 4, 5]" :key="i" @click="act(i)">{{ actions[i].name }}</button
            ><button :disabled="!events.length" @click="events.pop()">Undo last action</button
            ><button @click="reset">Reset the page</button>
          </nav>
        </div>
        <p class="contract">
          Only the labelled actions above are recorded, within this open page. Pointer movements,
          waiting time and personal characteristics are not measured.
        </p></template
      >
      <article v-else-if="state === 'observation'" class="essay">
        <button @click="go('start')">← Return to the performance</button
        ><span class="giant">0{{ selected + 1 }}</span>
        <h1>{{ actions[selected].line }}</h1>
        <p>{{ actions[selected].essay }}</p>
        <h2>The visible rule</h2>
        <p class="rule">
          Pressing “{{ actions[selected].name }}” adds this observation to the local sequence. The
          text is authored in advance; it makes no inference about you.
        </p>
        <button @click="selected = (selected + 1) % 6">Read the next observation →</button>
      </article>
      <section v-else class="transcript">
        <h1>A trace you<br />can account for.</h1>
        <p>{{ events.length }} intentional actions in this open page. Reloading clears them.</p>
        <ol>
          <li v-for="event in events" :key="event.number">
            <span>{{ String(event.number).padStart(2, '0') }}</span
            ><button
              @click="
                selected = event.kind;
                go('observation');
              "
            >
              {{ actions[event.kind].line }}
            </button>
          </li>
        </ol>
        <p v-if="!events.length">No action has been recorded.</p>
        <button @click="go('start')">Return to the performance</button
        ><button @click="reset">Clear the trace</button>
        <details>
          <summary>Read all six authored observations</summary>
          <button
            v-for="(a, i) in actions"
            :key="a.name"
            @click="
              selected = i;
              go('observation');
            "
          >
            {{ a.name }} / {{ a.line }}
          </button>
        </details>
      </section>
    </main>
    <footer>WITNESS / A finite interaction, with its workings left visible.</footer>
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
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  font: 10px var(--body);
}
header strong {
  font: 25px var(--heading);
  letter-spacing: 0.15em;
}
button {
  background: transparent;
  border: 0;
  border-bottom: 1px solid;
  padding: 10px 3px;
}
header button {
  font-size: 10px;
}
.performance {
  text-align: center;
  padding: 35px 4%;
}
.performance h1 {
  font: clamp(22px, 3vw, 40px) var(--heading);
  letter-spacing: -0.03em;
  margin: 0;
}
.action-space {
  position: relative;
  min-height: 560px;
  display: grid;
  place-items: center;
}
.primary-action {
  width: 370px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #433dab;
  color: #faf9f4;
  box-shadow: 0 15px 0 #d7d5e4;
  border: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.15s,
    box-shadow 0.15s;
}
.primary-action:active {
  transform: translateY(10px);
  box-shadow: 0 5px 0 #d7d5e4;
}
.primary-action > span {
  font: 80px var(--heading);
  letter-spacing: -0.06em;
}
.primary-action small {
  font: 9px var(--body);
  letter-spacing: 0.08em;
  margin-top: 20px;
}
.observation {
  position: absolute;
  max-width: 220px;
  text-align: left;
  padding: 20px;
  border-left: 1px solid #433dab;
  border-bottom: 0;
  font: 19px/1.5 var(--heading);
  background: #faf9f4;
}
.observation small {
  font: 9px var(--body);
  display: block;
  color: #433dab;
  margin-bottom: 15px;
}
.observation > span {
  font: 10px var(--body);
  display: block;
  margin-top: 12px;
}
.o0 {
  left: 1%;
  top: 40px;
}
.o1 {
  right: 1%;
  top: 80px;
}
.o2 {
  left: 4%;
  bottom: 30px;
}
.o3 {
  right: 2%;
  bottom: 0;
}
.latest {
  font: 11px var(--body);
  margin: 20px auto 35px;
  min-height: 35px;
}
.actions {
  justify-content: center;
  gap: 25px;
  font: 11px var(--body);
}
.contract {
  max-width: 650px;
  padding: 25px;
  margin: 20px auto 50px;
  font: 11px/1.9 var(--body);
  color: #555563;
  border-top: 1px solid #bbb8ca;
}
.essay,
.transcript {
  padding: 40px max(6%, calc((100vw - 950px) / 2)) 70px;
  min-height: 85vh;
}
.giant {
  font: 180px/0.9 var(--heading);
  color: #433dab;
  display: block;
  margin-top: 50px;
}
.essay h1,
.transcript h1 {
  font: clamp(42px, 6vw, 78px)/1.08 var(--heading);
  letter-spacing: -0.045em;
  margin: 35px 0;
}
.essay > p {
  font: clamp(23px, 3vw, 34px)/1.7 var(--heading);
  max-width: 35ch;
}
.essay h2 {
  font: 12px var(--body);
  margin-top: 55px;
  color: #433dab;
}
.essay .rule {
  font: 15px/1.8 var(--body);
}
.transcript > p {
  font: 14px/1.9 var(--body);
}
.transcript ol {
  list-style: none;
  padding: 0;
  margin: 40px 0;
}
.transcript li {
  display: flex;
  gap: 30px;
  align-items: baseline;
  padding: 22px 0;
  border-top: 1px solid #bbb8ca;
}
.transcript li span {
  font: 11px var(--body);
  color: #433dab;
}
.transcript li button {
  font: 24px var(--heading);
  border: 0;
  text-align: left;
}
.transcript > button {
  margin-right: 25px;
  font-size: 12px;
}
details {
  margin-top: 50px;
  font: 12px var(--body);
}
details button {
  display: block;
  text-align: left;
  font: 14px var(--heading);
  margin-top: 15px;
}
footer {
  padding: 22px 4%;
  font: 9px var(--body);
  border-top: 1px solid #bbb8ca;
}
@media (max-width: 850px) {
  header {
    flex-wrap: wrap;
  }
  .action-space {
    min-height: 400px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 35px 0;
  }
  .primary-action {
    width: min(300px, 85vw);
    flex-shrink: 0;
  }
  .primary-action > span {
    font-size: 65px;
  }
  .primary-action small {
    font-size: 8px;
  }
  .observation {
    position: static;
    max-width: 400px;
    width: 100%;
    font-size: 20px;
  }
  .actions {
    gap: 15px;
  }
  .performance {
    padding: 25px 5%;
  }
  .performance h1 {
    font-size: 28px;
  }
  .essay,
  .transcript {
    padding: 30px 6%;
  }
  .transcript li button {
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
</style>
