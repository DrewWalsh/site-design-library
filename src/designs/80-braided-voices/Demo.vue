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
  <div class="specimen">
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
        ><div class="opening">
          <span>ONE DAY / FOUR LIVES</span>
          <h1>We were there<br />at the same time.</h1>
          <p>
            Choose a voice. Follow its thread. At a crossing, listen to what someone else remembers.
          </p>
        </div>
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
</style>
