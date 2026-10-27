<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const arrivals = ref(80),
  sorters = ref(2),
  routes = ref(3);
const saved = ref<{ a: number; s: number; r: number; delivered: number; waiting: number }[]>([]);
const sorted = computed(() => Math.min(arrivals.value, sorters.value * 30));
const delivered = computed(() => Math.min(sorted.value, routes.value * 20));
const waiting = computed(() => arrivals.value - delivered.value);
const bottleneck = computed(() =>
  sorters.value * 30 < routes.value * 20
    ? 'sorting table'
    : routes.value * 20 < sorters.value * 30
      ? 'delivery routes'
      : 'both stages equally',
);
function snapshot() {
  saved.value = [
    ...saved.value.slice(-1),
    {
      a: arrivals.value,
      s: sorters.value,
      r: routes.value,
      delivered: delivered.value,
      waiting: waiting.value,
    },
  ];
  go('compare');
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>

    <header>
      <strong>A PARCEL’S<br />PROGRESS</strong>
      <p>A SMALL THEATRE<br />OF CAUSE & CONSEQUENCE</p>
      <nav>
        <button @click="go('start')">The machine</button
        ><button @click="go('explanation')">How it works</button
        ><button @click="go('compare')">Compare runs</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><div class="title">
          <span>ACT I / THE DAY BEGINS</span>
          <h1>Where does<br />the waiting go?</h1>
          <p>
            More parcels do not always need more vans. Change one condition and follow its
            consequence.
          </p>
        </div>
        <div class="stage">
          <section class="incoming">
            <span>01 / ARRIVAL</span>
            <div class="parcels" aria-hidden="true"><i v-for="i in 9" :key="i"></i></div>
            <strong>{{ arrivals }}</strong>
            <p>parcels arrive</p>
          </section>
          <b class="arrow" aria-hidden="true">→</b>
          <section class="sorting">
            <span>02 / SORTING</span>
            <div class="machine" aria-hidden="true"><i></i><i></i><i></i></div>
            <strong>{{ sorted }}</strong>
            <p>sorted this hour<br />{{ arrivals - sorted }} still at intake</p>
          </section>
          <b class="arrow" aria-hidden="true">→</b>
          <section class="dispatch">
            <span>03 / DELIVERY</span>
            <div class="van" aria-hidden="true"><i></i></div>
            <strong>{{ delivered }}</strong>
            <p>leave the depot<br />{{ sorted - delivered }} wait for a route</p>
          </section>
        </div>
        <div class="levers">
          <label
            >Incoming parcels / hour<input
              type="number"
              min="20"
              max="180"
              step="10"
              v-model.number="arrivals"
              @change="arrivals = Math.max(20, Math.min(180, Number(arrivals) || 20))" /></label
          ><label
            >Sorting staff<input type="range" min="1" max="5" v-model.number="sorters" /><span
              >{{ sorters }} people × 30 parcels</span
            ></label
          ><label
            >Delivery routes<input type="range" min="1" max="6" v-model.number="routes" /><span
              >{{ routes }} routes × 20 parcels</span
            ></label
          >
        </div>
        <div class="verdict" role="status">
          <strong>{{ waiting }} waiting.</strong>
          <p>
            {{
              waiting === 0
                ? 'The system clears this hour’s arrivals. There is spare capacity somewhere.'
                : 'The limiting capacity is at ' +
                  bottleneck +
                  '. Follow the queue before adding resources.'
            }}
          </p>
          <button @click="go('explanation')">Show the reasoning ↗</button
          ><button @click="snapshot">Keep this run</button>
        </div></template
      >
      <article v-else-if="state === 'explanation'" class="explanation">
        <button @click="go('start')">← Back to the machine</button>
        <h1>A queue is<br />a consequence.</h1>
        <ol>
          <li>
            <b>01</b>
            <h2>Count what arrives</h2>
            <p>
              {{ arrivals }} parcels enter. Each sorter handles 30 in one modelled hour, so sorting
              capacity is {{ sorters * 30 }}.
            </p>
          </li>
          <li>
            <b>02</b>
            <h2>Follow what can move</h2>
            <p>
              The smaller of arrivals and sorting capacity advances: {{ sorted }} parcels. A route
              carries 20; {{ routes }} routes can move {{ routes * 20 }}.
            </p>
          </li>
          <li>
            <b>03</b>
            <h2>Look at the remainder</h2>
            <p>
              {{ delivered }} leave; {{ waiting }} remain. Adding capacity after the bottleneck
              cannot remove a queue before it.
            </p>
          </li>
        </ol>
        <h2>What this model leaves out</h2>
        <p>
          Travel time, variable parcel sizes, worker breaks, missed addresses and costs are
          excluded. This is a deterministic teaching model for one hour, not a logistics forecast.
        </p>
        <button @click="snapshot">Keep this outcome for comparison</button>
      </article>
      <section v-else class="comparison">
        <h1>Change one thing.<br />Read the difference.</h1>
        <p>Keep two runs from the machine. The latest two are compared within this visit.</p>
        <div class="runs">
          <article v-for="(run, i) in saved" :key="i">
            <span>RUN {{ i + 1 }}</span
            ><strong>{{ run.delivered }}</strong>
            <h2>parcels delivered</h2>
            <p>{{ run.a }} arriving · {{ run.s }} sorters · {{ run.r }} routes</p>
            <p>{{ run.waiting }} remain in the depot.</p>
          </article>
        </div>
        <p v-if="saved.length === 2" class="difference">
          The second run delivers {{ saved[1].delivered - saved[0].delivered }} more parcels and
          changes the queue by {{ saved[1].waiting - saved[0].waiting }}.
        </p>
        <p v-if="!saved.length">
          No runs kept yet. Start with the default machine, then change one lever.
        </p>
        <button @click="go('start')">Return to the levers</button
        ><button @click="saved = []">Clear comparison</button>
      </section>
    </main>
    <footer>
      A PARCEL’S PROGRESS / Original fictional system / One hour, clearly stated assumptions.
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
  padding: 25px 4%;
  display: flex;
  gap: 25px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid;
}
header strong {
  font: 22px/1.1 var(--heading);
}
header p {
  font-size: 9px;
  letter-spacing: 0.1em;
  margin: 0;
}
button {
  background: transparent;
  border: 1px solid;
  padding: 10px 16px;
}
nav {
  font-size: 11px;
}
.title {
  padding: 40px 5% 20px;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 0 30px;
}
.title > span {
  grid-column: 1/-1;
  font-size: 10px;
}
.title h1 {
  font: clamp(45px, 5.8vw, 80px)/1.02 var(--heading);
  letter-spacing: -0.05em;
  margin: 20px 0;
}
.title > p {
  align-self: end;
  max-width: 350px;
  font-size: 18px;
  line-height: 1.8;
}
.stage {
  display: grid;
  grid-template-columns: 1fr 60px 1fr 60px 1fr;
  align-items: center;
  gap: 20px;
  padding: 35px 6%;
  border-bottom: 8px solid #525c64;
}
.stage section {
  text-align: center;
  position: relative;
}
.stage section > span {
  display: block;
  font-size: 10px;
  letter-spacing: 0.1em;
  margin-bottom: 20px;
}
.stage strong {
  font: 68px/1 var(--heading);
}
.stage p {
  font-size: 13px;
  margin: 8px 0;
}
.arrow {
  font: 50px var(--heading);
}
.parcels {
  height: 170px;
  display: grid;
  grid-template-columns: repeat(3, 45px);
  gap: 8px;
  justify-content: center;
  align-content: end;
  margin-bottom: 20px;
}
.parcels i {
  height: 40px;
  background: #bd693c;
  border: 2px solid #292c34;
  transform: rotate(-5deg);
  position: relative;
}
.parcels i:after {
  content: '';
  display: block;
  width: 8px;
  background: #dfbb70;
  height: 100%;
  margin: auto;
}
.machine {
  height: 170px;
  width: 180px;
  background: #739689;
  border: 3px solid;
  position: relative;
  margin: 0 auto 20px;
  clip-path: polygon(10% 0, 90% 0, 100% 100%, 0 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.machine i {
  width: 35px;
  height: 35px;
  border: 8px solid;
  border-radius: 50%;
  background: #e7c677;
}
.van {
  height: 110px;
  width: 220px;
  max-width: 100%;
  background: #d793a8;
  border: 3px solid;
  border-radius: 3px 35px 0 0;
  margin: 60px auto 20px;
  position: relative;
}
.van:before,
.van:after {
  content: '';
  position: absolute;
  width: 35px;
  height: 35px;
  background: #292c34;
  border: 7px solid #eadfcc;
  border-radius: 50%;
  bottom: -15px;
  left: 20px;
}
.van:after {
  left: auto;
  right: 20px;
}
.van i {
  display: block;
  width: 45px;
  height: 40px;
  background: #d8e4df;
  position: absolute;
  right: 10px;
  top: 8px;
  border: 2px solid;
}
.levers {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 35px;
  padding: 30px 5%;
  background: #f3ebdc;
}
.levers label {
  font-size: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.levers input {
  width: 100%;
  accent-color: #b94737;
  background: transparent;
  padding: 7px;
  border: 1px solid;
}
.levers span {
  font-size: 10px;
}
.verdict {
  padding: 35px 5%;
  display: flex;
  gap: 25px;
  align-items: center;
  flex-wrap: wrap;
  background: #e0b86c;
}
.verdict > strong {
  font: 40px var(--heading);
}
.verdict p {
  max-width: 360px;
  margin: 0;
}
.verdict button {
  font-size: 11px;
}
.explanation,
.comparison {
  padding: 45px 7%;
  min-height: 80vh;
}
.explanation h1,
.comparison h1 {
  font: clamp(45px, 6vw, 80px)/1.05 var(--heading);
  margin-top: 30px;
}
.explanation ol {
  padding: 0;
  list-style: none;
  max-width: 850px;
}
.explanation li {
  padding: 30px 0 30px 100px;
  position: relative;
  border-bottom: 1px solid;
}
.explanation li b {
  position: absolute;
  left: 0;
  font: 60px var(--heading);
  color: #b94737;
}
.explanation li p {
  font-size: 20px;
  line-height: 1.7;
}
.explanation > h2 {
  margin-top: 40px;
}
.runs {
  display: flex;
  gap: 30px;
  margin: 30px 0;
}
.runs article {
  background: #f3ebdc;
  padding: 30px;
  flex: 1;
}
.runs strong {
  display: block;
  font: 100px var(--heading);
}
.runs span {
  font-size: 10px;
}
.comparison > button {
  margin: 15px 20px 0 0;
}
.difference {
  font-size: 24px;
}
footer {
  padding: 25px 5%;
  font-size: 10px;
  border-top: 1px solid;
}
@media (max-width: 900px) {
  header {
    flex-wrap: wrap;
  }
  .title {
    display: block;
    padding: 30px 5%;
  }
  .title h1 {
    font-size: 49px;
  }
  .title > p {
    font-size: 15px;
  }
  .stage {
    grid-template-columns: 1fr;
    padding: 25px 5%;
    gap: 25px;
  }
  .stage section {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 0 20px;
    text-align: left;
  }
  .stage section > span {
    grid-column: 1/-1;
  }
  .stage strong {
    font-size: 55px;
  }
  .stage p {
    grid-column: 2;
  }
  .parcels,
  .machine,
  .van {
    grid-row: 2/4;
    grid-column: 1;
    margin: 0 !important;
    width: 120px !important;
    height: 110px !important;
  }
  .parcels {
    grid-template-columns: repeat(3, 28px);
    gap: 5px;
  }
  .parcels i {
    height: 28px;
  }
  .machine i {
    width: 20px;
    height: 20px;
    border-width: 4px;
  }
  .van i {
    width: 35px;
  }
  .arrow {
    transform: rotate(90deg);
    justify-self: center;
    font-size: 35px;
  }
  .levers {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .verdict {
    gap: 20px;
  }
  .verdict p {
    font-size: 14px;
  }
  .explanation,
  .comparison {
    padding: 30px 5%;
  }
  .explanation li {
    padding-left: 55px;
  }
  .explanation li b {
    font-size: 35px;
  }
  .explanation li p {
    font-size: 17px;
  }
  .runs {
    flex-direction: column;
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
