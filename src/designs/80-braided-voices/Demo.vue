<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const voice = ref(0),
  moment = ref(2);
const names = ['Mara / baker', 'Ivo / porter', 'Nell / gardener', 'Sol / driver'];
const colors = ['#824443', '#365f74', '#4c6345', '#735482'];
const moments = [
  {
    time: '05:10',
    title: 'The first light',
    lines: [
      'I switch on the oven before the streetlamps go out.',
      'The last train leaves a newspaper behind.',
      'I water the seedlings in the kitchen window.',
      'A fox waits at the crossing as if it knows the lights.',
    ],
  },
  {
    time: '07:40',
    title: 'The crossing',
    lines: [
      'Four loaves go to the porter. He always pays tomorrow.',
      'The baker gives me the loaf with the split crust.',
      'Someone has left bread beside the seed box.',
      'I stop long enough for two people to finish a conversation.',
    ],
  },
  {
    time: '12:15',
    title: 'The rain arrives',
    lines: [
      'Everybody comes in at once. Nobody wants anything yet.',
      'I hold the station door. Rain makes strangers patient.',
      'The allotment path becomes a small brown river.',
      'For ten minutes, the windscreen contains the whole world.',
    ],
  },
  {
    time: '15:30',
    title: 'An empty bench',
    lines: [
      'I leave a paper bag where the old clock used to stand.',
      'My father waited on that bench after every shift.',
      'The bench is warm now. The wood keeps the afternoon.',
      'From the road it looks as though somebody has just stood up.',
    ],
  },
  {
    time: '18:05',
    title: 'The long way home',
    lines: [
      'I walk past the station to see which window is still lit.',
      'The gardener shows me a flower that opens in the evening.',
      'There is enough light to plant one more row.',
      'I take the river road even though it adds eleven minutes.',
    ],
  },
  {
    time: '22:20',
    title: 'A window stays lit',
    lines: [
      'Tomorrow’s dough is already rising in the dark.',
      'The station has a silence of its own, full of metal cooling.',
      'I label the seeds by touch. I know which jar is which.',
      'The last passenger says thank you to the empty bus.',
    ],
  },
];
function crossing(i: number) {
  moment.value = i;
  go('crossing');
}
</script>
<template>
  <div class="specimen" :class="{ entry: state === 'start' }">
    <a class="skip" href="#content">Skip to content</a>

    <header>
      <strong>COMMON<br />HOUR</strong>
      <p>An oral history<br />of an imagined street.</p>
      <nav>
        <button @click="go('start')">Follow the threads</button
        ><button @click="go('transcript')">Full transcript</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><h1 class="sr">Common Hour: four lives crossing through one day</h1>
        <div class="voices">
          <button
            v-for="(name, i) in names"
            :key="name"
            :style="{ '--thread': colors[i] }"
            :aria-pressed="voice === i"
            @click="voice = i"
          >
            <span>0{{ i + 1 }}</span
            >{{ name }}
          </button>
        </div>
        <div class="weave">
          <section v-for="(m, j) in moments" :key="m.time">
            <div class="moment">
              <time>{{ m.time }}</time
              ><button @click="crossing(j)">{{ m.title }} ↗</button>
            </div>
            <div class="strands">
              <article
                v-for="(name, i) in names"
                :key="name"
                :class="{ chosen: voice === i }"
                :style="{ '--thread': colors[i], order: (i + j) % 4 }"
              >
                <span class="thread" aria-hidden="true"></span><small>{{ name }}</small>
                <p>“{{ m.lines[i] }}”</p>
                <button
                  @click="
                    voice = i;
                    crossing(j);
                  "
                  :aria-label="'Hear ' + name + ' at ' + m.time"
                >
                  Follow 0{{ i + 1 }} →
                </button>
              </article>
            </div>
          </section>
        </div></template
      >
      <article v-else-if="state === 'crossing'" class="crossing">
        <button @click="go('start')">← Return to the weave</button
        ><time>{{ moments[moment].time }}</time>
        <h1>{{ moments[moment].title }}</h1>
        <div class="voices">
          <button
            v-for="(name, i) in names"
            :key="name"
            :style="{ '--thread': colors[i] }"
            :aria-pressed="voice === i"
            @click="voice = i"
          >
            {{ name }}
          </button>
        </div>
        <blockquote :style="{ '--thread': colors[voice] }">
          “{{ moments[moment].lines[voice] }}”<cite>{{ names[voice] }}</cite>
        </blockquote>
        <p class="reflection">
          No single account contains the whole event. The shared time is a meeting point, not proof
          that everybody experienced the same thing. Read across the voices to see which details
          survive and which disappear.
        </p>
        <h2>The other side of the street</h2>
        <p>{{ moments[moment].lines[(voice + 1) % 4] }}</p>
        <button @click="voice = (voice + 1) % 4">Follow the other voice</button
        ><button @click="moment = (moment + 1) % 6">Next shared moment →</button>
      </article>
      <section v-else class="transcript">
        <h1>All the voices,<br />in their own time.</h1>
        <button @click="go('start')">Return to the weave</button>
        <article v-for="(m, j) in moments" :key="m.time">
          <h2>{{ m.time }} / {{ m.title }}</h2>
          <p v-for="(name, i) in names" :key="name">
            <strong :style="{ color: colors[i] }">{{ name }}</strong
            >{{ m.lines[i] }}
          </p>
          <button @click="crossing(j)">Compare this moment ↗</button>
        </article>
      </section>
    </main>
    <footer>Four fictional neighbours. Six shared moments. / COMMON HOUR, volume 01</footer>
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
  font-family: 'DM Sans';
  src: url('/fonts/dm-sans.woff2') format('woff2');
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
  align-items: center;
  justify-content: space-between;
  padding: 30px 5%;
  border-bottom: 1px solid #b1a69c;
  gap: 20px;
}
header strong {
  font: 25px/1 var(--heading);
  letter-spacing: -0.04em;
}
header p {
  font-size: 12px;
  margin: 0;
}
button {
  background: transparent;
  border: 0;
  border-bottom: 1px solid;
  padding: 10px 8px;
}
nav {
  font-size: 12px;
}
.opening {
  padding: 55px 9% 40px;
}
.opening > span {
  font-size: 10px;
  letter-spacing: 0.15em;
}
h1 {
  font: clamp(42px, 6vw, 80px)/1.16 var(--heading);
  letter-spacing: -0.055em;
  margin: 20px 0 30px;
}
.opening p {
  max-width: 420px;
  line-height: 1.8;
}
.voices {
  display: flex;
  justify-content: space-around;
  gap: 15px;
  padding: 15px 5%;
  flex-wrap: wrap;
}
.voices button {
  border: 1px solid var(--thread);
  color: var(--thread);
  padding: 12px 20px;
}
.voices span {
  margin-right: 12px;
}
.voices button[aria-pressed='true'] {
  background: var(--thread);
  color: #fff;
}
.weave {
  padding: 20px 5% 60px;
}
.weave section {
  position: relative;
}
.moment {
  display: flex;
  align-items: center;
  gap: 20px;
  border-top: 1px solid #c5b6a9;
  padding: 10px 0;
}
.moment time {
  font-size: 12px;
}
.moment button {
  font: 17px var(--heading);
  border: 0;
}
.strands {
  display: flex;
  gap: 5%;
  padding: 10px 0 45px;
}
.strands article {
  width: 21.25%;
  padding: 25px 0 0 20px;
  position: relative;
}
.thread {
  position: absolute;
  left: 0;
  top: 0;
  bottom: -46px;
  width: 4px;
  background: var(--thread);
  transform: skew(-7deg);
}
.strands article:nth-child(even) .thread {
  transform: skew(9deg);
}
.strands small {
  font-size: 10px;
  color: var(--thread);
}
.strands p {
  font: 17px/1.7 var(--heading);
  margin: 18px 0;
}
.strands .chosen p {
  font-weight: 700;
}
.chosen .thread {
  width: 9px;
}
.strands button {
  font-size: 10px;
  color: var(--thread);
}
.crossing,
.transcript {
  padding: 40px 9% 70px;
}
.crossing time {
  display: block;
  font: 80px var(--heading);
  color: #76675e;
  margin: 35px 0 0;
}
.crossing .voices {
  padding: 15px 0;
  justify-content: flex-start;
}
.crossing blockquote {
  border-left: 7px solid var(--thread);
  padding-left: 35px;
  font: clamp(30px, 4vw, 52px)/1.5 var(--heading);
  margin: 40px 0;
  max-width: 950px;
}
.crossing cite {
  display: block;
  font: 12px var(--body);
  margin-top: 25px;
  color: var(--thread);
}
.reflection {
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 40px;
}
.crossing > button {
  margin-right: 20px;
}
.transcript article {
  padding: 35px 0;
  border-top: 1px solid;
  margin-top: 30px;
}
.transcript article p {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 20px;
  max-width: 800px;
  line-height: 1.8;
}
.transcript strong {
  font-size: 12px;
}
footer {
  padding: 25px 5%;
  border-top: 1px solid #b1a69c;
  font-size: 11px;
}
@media (max-width: 750px) {
  header {
    flex-wrap: wrap;
  }
  .opening {
    padding: 35px 5%;
  }
  .voices {
    gap: 8px;
    justify-content: flex-start;
  }
  .voices button {
    font-size: 11px;
    padding: 8px 11px;
  }
  .strands {
    flex-wrap: wrap;
    gap: 18px;
  }
  .strands article {
    width: calc(50% - 9px);
  }
  .strands p {
    font-size: 15px;
  }
  .thread {
    bottom: -15px;
  }
  .crossing,
  .transcript {
    padding: 25px 5%;
  }
  .transcript article p {
    display: block;
  }
  .transcript strong {
    display: block;
  }
  .crossing blockquote {
    padding-left: 20px;
    font-size: 28px;
  }
  .crossing time {
    font-size: 60px;
  }
}
@media (max-width: 350px) {
  .strands article {
    width: 100%;
  }
  .thread {
    transform: none !important;
  }
  .strands {
    padding-left: 10px;
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
  padding-left: 125px;
  background: #fbf8f1;
}
.entry header {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 125px;
  padding: 30px 18px;
  border: 0;
  border-right: 1px solid #d1c4b5;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 45px;
}
.entry header strong {
  font-size: 36px;
  line-height: 0.95;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  height: 220px;
}
.entry header p {
  font-size: 11px;
}
.entry header nav {
  display: grid;
  gap: 15px;
}
.entry header nav button {
  font-size: 11px;
  text-align: left;
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
.entry main > .voices {
  padding: 20px 3%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border-bottom: 1px solid #c5b6a9;
}
.entry main > .voices button {
  padding: 18px 8px;
  font-size: 12px;
  border: 0;
  border-bottom: 7px solid var(--thread);
  background: none;
  color: var(--thread);
}
.entry main > .voices button[aria-pressed='true'] {
  background: color-mix(in srgb, var(--thread) 12%, transparent);
}
.entry .weave {
  padding: 0 3% 80px;
}
.entry .moment {
  position: relative;
  z-index: 2;
  justify-content: center;
  gap: 16px;
  padding: 12px;
  border: 0;
}
.entry .moment time {
  font-size: 45px;
  letter-spacing: -0.06em;
  font-family: var(--heading);
}
.entry .moment button {
  font-size: 13px;
  max-width: 150px;
  line-height: 1.3;
}
.entry .strands {
  padding: 0 0 15px;
  gap: 3%;
  min-height: 340px;
  align-items: center;
}
.entry .strands article {
  width: 22.75%;
  padding: 25px 0 25px 25px;
}
.entry .strands article:nth-child(2) {
  transform: translateY(45px);
}
.entry .strands article:nth-child(4) {
  transform: translateY(-15px);
}
.entry .strands p {
  font-size: clamp(17px, 1.7vw, 26px);
  line-height: 1.4;
}
.entry .thread {
  top: -40px;
  bottom: -70px;
  width: 2px;
  transform: skew(-19deg);
}
.entry .strands article:nth-child(even) .thread {
  transform: skew(22deg);
}
.entry .chosen .thread {
  width: 7px;
}
@media (max-width: 750px) {
  .entry {
    padding-left: 42px;
  }
  .entry header {
    width: 42px;
    padding: 16px 8px;
    gap: 20px;
  }
  .entry header strong {
    font-size: 19px;
    line-height: 1;
    writing-mode: vertical-rl;
    height: 180px;
  }
  .entry header p {
    display: none;
  }
  .entry header nav {
    writing-mode: vertical-rl;
  }
  .entry header nav button {
    font-size: 10px;
    padding: 12px 4px;
  }
  .entry main > .voices {
    grid-template-columns: 1fr 1fr;
    padding: 10px;
    gap: 5px;
  }
  .entry main > .voices button {
    font-size: 10px;
    padding: 10px 4px;
  }
  .entry .moment {
    padding: 18px 0;
  }
  .entry .moment time {
    font-size: 35px;
  }
  .entry .moment button {
    font-size: 12px;
  }
  .entry .strands {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px;
    padding: 8px 12px 45px;
  }
  .entry .strands article {
    width: auto !important;
    padding: 12px 0 12px 12px;
    transform: none !important;
  }
  .entry .strands p {
    font-size: 16px;
    line-height: 1.5;
  }
  .entry .thread {
    top: -12px;
    bottom: -45px;
  }
  .entry .weave {
    padding: 0 10px 60px;
  }
  .entry .strands small {
    font-size: 9px;
  }
}
@media (max-width: 750px) {
  .entry {
    padding-left: 54px;
  }
  .entry header {
    width: 54px;
    z-index: 4;
  }
  .entry header nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    width: 100%;
  }
  .entry .strands {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .entry .strands article {
    min-width: 0;
    overflow-wrap: break-word;
  }
}
@media (max-width: 360px) {
  .entry .strands {
    gap: 12px;
    padding-inline: 8px;
  }
  .entry .strands p {
    font-size: 15px;
  }
}
</style>
