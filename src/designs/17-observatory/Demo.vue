<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();
const q = ref(''),
  message = ref(''),
  selected = ref(0),
  tab = ref('All');
function reset() {
  Object.keys(localStorage)
    .filter((k) => k.startsWith('design-library:17:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const station = ref('Alder upstream'),
  interval = ref('7 days');
const readings = [2.1, 2.4, 2.3, 2.8, 3.2, 2.9, 2.6, 2.5, 2.8, 3.4, 3.1, 2.7, 2.4, 2.3];
const values = computed(() => (interval.value === '7 days' ? readings.slice(7) : readings));
const points = computed(() =>
  values.value
    .map((v, i) => 50 + i * (800 / (values.value.length - 1)) + ',' + (300 - v * 65))
    .join(' '),
);
watch(interval, () => {
  selected.value = 0;
});
</script>
<template>
  <div class="specimen" :class="{ entry: state === 'start' }">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>◉ WATERSHED</strong><span>OBSERVATORY / NORTHBANK BASIN</span
      ><span class="grow"></span><span class="fixture">SYNTHETIC DATASET</span>
    </header>
    <main id="content">
      <div class="title">
        <div>
          <p class="eyebrow">RIVER CONDITIONS / STUDY 004</p>
          <h1>River conditions</h1>
          <p>Northbank basin / synthetic observations</p>
        </div>
        <div class="controls">
          <label
            >Station<select v-model="station">
              <option>Alder upstream</option>
              <option>Northbank bridge</option>
            </select></label
          ><label
            >Interval<select v-model="interval">
              <option>7 days</option>
              <option>14 days</option>
            </select></label
          >
        </div>
      </div>
      <nav class="views">
        <button @click="go('start')" :aria-pressed="state === 'start'">Plots</button
        ><button @click="go('table')" :aria-pressed="state === 'table'">Data table</button
        ><button @click="go('missing')" :aria-pressed="state === 'missing'">
          Missing-data example
        </button>
      </nav>
      <div class="readouts">
        <div>
          <small>WATER LEVEL</small
          ><strong
            >{{
              (values[values.length - 1] + (station === 'Alder upstream' ? 0 : -0.3)).toFixed(1)
            }}
            <span>m</span></strong
          >
          <p>Relative to station datum</p>
        </div>
        <div>
          <small>FLOW RATE</small><strong>18.4 <span>m³/s</span></strong>
          <p>Synthetic interval mean</p>
        </div>
        <div>
          <small>OBSERVATIONS</small
          ><strong>{{
            state === 'missing'
              ? values.length - 2 + ' / ' + values.length
              : values.length.toString().padStart(2, '0')
          }}</strong>
          <p>
            {{ state === 'missing' ? 'Two readings unavailable' : 'All expected readings present' }}
          </p>
        </div>
        <div class="interpretation">
          <small>INTERPRETATION</small>
          <p>
            A brief rise midweek, followed by a return toward the start of the interval. Sample
            values are not live monitoring.
          </p>
        </div>
      </div>
      <section class="plot" v-if="state !== 'table'">
        <div class="row">
          <h2>{{ station }} / water level</h2>
          <span class="grow"></span><span class="key">— Station A &nbsp; ··· Station B</span>
        </div>
        <p v-if="state === 'missing'" class="notice">
          Two measurements are missing during a fictional sensor maintenance period. The line
          breaks; missing values are not plotted as zero.
        </p>
        <svg
          viewBox="0 0 900 350"
          role="img"
          aria-label="Synthetic water level in metres over the selected interval. Values are available in the data table."
        >
          <g stroke="#33444e" stroke-width="1">
            <path d="M50 40H850M50 105H850M50 170H850M50 235H850M50 300H850" />
          </g>
          <g fill="#9ab4bf" font-size="12" font-family="monospace">
            <text x="5" y="44">4 m</text>
            <text x="5" y="109">3 m</text>
            <text x="5" y="174">2 m</text>
            <text x="5" y="239">1 m</text>
            <text x="5" y="304">0 m</text>
            <text x="50" y="335">{{ interval === '7 days' ? '20 OCT' : '13 OCT' }}</text>
            <text x="430" y="335">{{ interval === '7 days' ? '23 OCT' : '20 OCT' }}</text>
            <text x="800" y="335">26 OCT</text>
          </g>
          <polyline
            v-if="state !== 'missing'"
            :points="points"
            fill="none"
            stroke="#6ad0ce"
            stroke-width="3"
          />
          <path
            v-else
            :d="
              values
                .map((v, i) =>
                  i === 3 || i === 4
                    ? ''
                    : (i === 0 || i === 5 ? 'M' : 'L') +
                      (50 + (i * 800) / (values.length - 1)) +
                      ' ' +
                      (300 - v * 65),
                )
                .join(' ')
            "
            fill="none"
            stroke="#6ad0ce"
            stroke-width="3"
          />
          <polyline
            :points="
              values
                .map((v, i) => 50 + (i * 800) / (values.length - 1) + ',' + (300 - (v - 0.3) * 65))
                .join(' ')
            "
            fill="none"
            stroke="#c7a666"
            stroke-width="2"
            stroke-dasharray="5 7"
          />
          <circle
            v-for="(v, i) in values"
            :key="i"
            v-show="state !== 'missing' || (i !== 3 && i !== 4)"
            :cx="50 + i * (800 / (values.length - 1))"
            :cy="300 - v * 65"
            r="4"
            fill="#6ad0ce"
          />
        </svg>
        <div class="reading-controls">
          <label
            >Inspect a reading<select v-model.number="selected">
              <option v-for="(v, i) in values" :key="i" :value="i">
                Reading {{ i + 1 }} /
                {{ state === 'missing' && (i === 3 || i === 4) ? 'Unavailable' : v + ' m' }}
              </option>
            </select></label
          >
          <p>
            Selected:
            <b>{{
              state === 'missing' && (selected === 3 || selected === 4)
                ? 'No measurement'
                : values[selected] + ' m'
            }}</b
            ><br /><small>Station A · Synthetic observation</small>
          </p>
        </div>
      </section>
      <section class="data" v-else>
        <h2>Measurements with their units.</h2>
        <div class="scroll">
          <table>
            <thead>
              <tr>
                <th>Reading</th>
                <th>Station A / m</th>
                <th>Station B / m</th>
                <th>Quality</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(v, i) in values" :key="i">
                <td>{{ i + 1 }}</td>
                <td>{{ v.toFixed(1) }}</td>
                <td>{{ (v - 0.3).toFixed(1) }}</td>
                <td>Synthetic fixture</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="method">
        <h2>Reading the instrument</h2>
        <p>
          Levels are relative to a local datum. Compare patterns within the same interval; a change
          in level is not by itself a measure of risk. This fictional dataset exists solely to
          demonstrate the interface.
        </p>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Watershed Observatory · Fictional sample content · Design reference 17</span
      ><button @click="reset">Reset demo</button>
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/space-grotesk.woff2') format('woff2');
  font-display: swap;
  font-weight: 100 900;
}
@font-face {
  font-family: 'IBM Plex Mono';
  src: url('/fonts/ibm-plex-mono.woff2') format('woff2');
  font-display: swap;
  font-weight: 100 900;
}
.specimen {
  min-height: 100vh;
  background: var(--page);
  color: var(--ink);
  font: 16px/1.6 var(--font-body);
  overflow-wrap: anywhere;
}
h1,
h2,
h3 {
  font-family: var(--font-heading);
  line-height: 1.1;
}
h1 {
  font-size: clamp(38px, 5.5vw, 80px);
  letter-spacing: -0.045em;
}
h2 {
  font-size: clamp(27px, 3vw, 42px);
  letter-spacing: -0.025em;
}
h3 {
  font-size: 22px;
}
p {
  max-width: var(--measure);
}
button,
input,
select,
textarea {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--ink);
  padding: 10px 15px;
}
button:hover {
  border-color: var(--accent);
}
button.primary {
  background: var(--accent);
  color: #11282b;
  border-color: var(--accent);
}
button[aria-pressed='true'] {
  box-shadow: inset 0 -3px 0 var(--accent);
}
a {
  text-underline-offset: 4px;
}
.eyebrow {
  font:
    12px/1.5 'IBM Plex Mono',
    monospace;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.grow {
  flex: 1;
}
.rule {
  border-top: 1px solid var(--line);
}
.notice {
  padding: 18px;
  border-left: 3px solid var(--accent);
  background: var(--surface);
}
.skip {
  position: absolute;
  top: -100px;
  background: var(--ink);
  color: var(--page);
  padding: 12px;
  z-index: 100;
}
.skip:focus {
  top: 8px;
}
.specimen-note {
  padding: 24px 5%;
  border-top: 1px solid var(--line);
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}
.specimen-note button {
  font-size: 12px;
  background: transparent;
  padding: 4px 10px;
}
.empty {
  padding: 40px 0;
}
.message {
  font-weight: 600;
  color: var(--accent);
}
figure {
  margin: 0;
}
figcaption {
  font-size: 13px;
  margin-top: 10px;
}
img {
  display: block;
  object-fit: cover;
}
label {
  display: grid;
  gap: 6px;
}
input[type='checkbox'],
input[type='radio'] {
  min-height: 20px;
  width: 20px;
}
table {
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}
td,
th {
  padding: 12px 10px;
  border-bottom: 1px solid var(--line);
}
th {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.scroll {
  overflow: auto;
  max-width: 100%;
}
details {
  border-top: 1px solid var(--line);
  padding: 16px 0;
}
summary {
  font-weight: 600;
  min-height: 32px;
}
textarea {
  width: 100%;
  min-height: 100px;
}
fieldset {
  border: 1px solid var(--line);
  margin: 0;
  padding: 20px;
}
input,
select {
  max-width: 100%;
  min-width: 0;
}
section,
main,
aside,
article,
nav {
  min-width: 0;
}
button {
  line-height: 1.3;
}
a,
button {
  word-break: normal;
}
@media (max-width: 600px) {
  h1 {
    font-size: clamp(36px, 11vw, 64px);
  }
  .specimen-note {
    padding: 20px;
  }
  .row {
    gap: 10px;
  }
  td,
  th {
    padding: 10px 8px;
  }
}
header {
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 22px 4%;
  border-bottom: 1px solid #344752;
  font-size: 9px;
}
header strong {
  font: 18px 'Space Grotesk';
  letter-spacing: 0.04em;
}
.fixture {
  border: 1px solid #45616b;
  padding: 7px 10px;
  color: #a9c2cb;
}
main {
  max-width: 1500px;
  margin: auto;
  padding: 40px 4% 70px;
}
.title {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
}
.title h1 {
  font-size: 51px;
  margin: 15px 0;
}
.title p {
  font-size: 12px;
  color: #a7bdc7;
}
.controls {
  display: flex;
  gap: 18px;
}
.controls label {
  font-size: 9px;
  color: #b3c6cd;
}
.controls select {
  font-size: 11px;
  border-color: #47616c;
}
.views {
  display: flex;
  gap: 12px;
  margin: 25px 0;
}
.views button {
  font-size: 10px;
  background: none;
  border-color: #405862;
}
.views button[aria-pressed='true'] {
  background: #244048;
}
.readouts {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1.3fr;
  border: 1px solid #3a505c;
  margin: 35px 0;
}
.readouts > div {
  padding: 25px;
  border-right: 1px solid #3a505c;
}
.readouts small {
  font-size: 9px;
  letter-spacing: 0.06em;
  color: #9fbbc6;
}
.readouts strong {
  font: 42px 'Space Grotesk';
  display: block;
  margin: 15px 0;
}
.readouts strong span {
  font-size: 18px;
  color: #8caab7;
}
.readouts p {
  font-size: 9px;
  color: #a7bdc7;
  margin: 0;
  line-height: 1.9;
}
.readouts .interpretation {
  border-right: 0;
}
.interpretation p {
  font-size: 11px;
  margin-top: 15px;
}
.plot {
  border: 1px solid #3a505c;
  padding: 25px;
  background: #14232c;
}
.plot h2 {
  font: 18px 'Space Grotesk';
  margin: 0;
}
.plot .key {
  font-size: 10px;
  color: #acc8cf;
}
.plot svg {
  width: 100%;
  margin-top: 35px;
  max-height: 400px;
}
.reading-controls {
  display: flex;
  align-items: center;
  gap: 40px;
  border-top: 1px solid #344752;
  padding-top: 25px;
  font-size: 11px;
}
.reading-controls label {
  font-size: 10px;
  min-width: 210px;
}
.reading-controls select {
  border-color: #47616c;
  font-size: 11px;
}
.reading-controls p {
  font-size: 12px;
}
.reading-controls small {
  font-size: 9px;
  color: #a6c0c9;
}
.method {
  padding-top: 40px;
}
.method h2 {
  font: 23px 'Space Grotesk';
}
.method p {
  font-size: 12px;
  line-height: 1.9;
  color: #abc0c9;
}
.data {
  padding: 25px;
  background: #172a33;
}
.data h2 {
  font-size: 25px;
}
.data td,
.data th {
  font-size: 12px;
  border-color: #46606b;
}
.notice {
  font-size: 11px;
  color: #d9c490;
}
.specimen-note {
  border-color: #3a505c;
}
.specimen-note button {
  border-color: #65828f;
}
@media (max-width: 900px) {
  .title {
    display: block;
  }
  .controls {
    margin-top: 25px;
  }
  .readouts {
    grid-template-columns: 1fr 1fr;
  }
  .readouts > div {
    border-bottom: 1px solid #3a505c;
  }
}
@media (max-width: 600px) {
  header {
    padding: 20px;
    gap: 10px;
  }
  header > span:not(.fixture):not(.grow) {
    display: none;
  }
  header strong {
    font-size: 15px;
  }
  .fixture {
    font-size: 7px;
    padding: 5px;
  }
  .title h1 {
    font-size: 43px;
  }
  .title p {
    font-size: 10px;
  }
  .controls {
    gap: 12px;
  }
  .controls label {
    min-width: 0;
    flex: 1;
  }
  .controls select {
    width: 100%;
    font-size: 9px;
  }
  .views {
    gap: 7px;
    flex-wrap: wrap;
  }
  .views button {
    font-size: 9px;
    padding: 8px;
  }
  .readouts > div {
    padding: 18px;
  }
  .readouts strong {
    font-size: 33px;
  }
  .readouts small {
    font-size: 8px;
  }
  .plot {
    padding: 15px;
  }
  .plot h2 {
    font-size: 15px;
  }
  .plot .key {
    font-size: 8px;
  }
  .reading-controls {
    display: block;
  }
  .reading-controls label {
    min-width: 0;
  }
  .data td,
  .data th {
    font-size: 9px;
  }
}

/* The entry is the experience itself; supporting routes retain its vocabulary. */

main {
  display: flex;
  flex-direction: column;
}
.title {
  order: 0;
  padding: 0 0 20px;
  align-items: center;
}
.title h1 {
  font-size: 25px;
  margin: 8px 0;
  letter-spacing: -0.035em;
}
.title .eyebrow {
  font-size: 9px;
}
.title p {
  font-size: 10px;
}
.views {
  order: 1;
}
.plot,
.data {
  order: 2;
}
.readouts {
  order: 3;
}
.method {
  order: 4;
}
.entry main {
  max-width: 1500px;
  width: 100%;
  padding: 25px 3%;
}
.entry .readouts {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1.3fr;
  gap: 25px;
  border-block: 1px solid #3a505a;
  margin-top: 25px;
}
.entry .readouts > div {
  background: none;
  border: 0;
  padding: 20px 0;
}
.entry .readouts strong {
  font-size: 31px;
  margin: 8px 0;
}
.entry .readouts small {
  font-size: 9px;
}
.entry .readouts p {
  font-size: 10px;
}
.entry .plot {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #3a505a;
}
.entry .plot svg {
  width: 100%;
  max-height: 560px;
}
.entry .plot h2 {
  font-size: 18px;
}
.entry .reading-controls {
  padding: 15px 0 0;
}
.entry .reading-controls label,
.entry .reading-controls p {
  font-size: 10px;
}
.entry .controls {
  gap: 15px;
}
.entry .controls label {
  font-size: 10px;
}
@media (max-width: 750px) {
  .title {
    display: block;
    padding-bottom: 15px;
  }
  .title h1 {
    font-size: 23px;
  }
  .title > div > p {
    font-size: 9px;
  }
  .title > .controls {
    margin-top: 18px;
    display: flex;
    gap: 12px;
  }
  .controls label {
    flex: 1;
    font-size: 9px;
  }
  .controls select {
    font-size: 11px;
  }
  .entry main {
    padding: 20px 5%;
  }
  .entry .plot {
    padding: 14px 10px;
    margin-top: 15px;
  }
  .entry .plot h2 {
    font-size: 15px;
  }
  .entry .plot .key {
    font-size: 8px;
  }
  .entry .plot svg {
    min-height: 190px;
  }
  .entry .readouts {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
  }
  .entry .readouts strong {
    font-size: 25px;
  }
  .entry .readouts strong span {
    font-size: 10px;
  }
  .entry .readouts small {
    font-size: 8px;
  }
  .entry .readouts p {
    font-size: 9px;
  }
  .entry .readouts .interpretation {
    grid-column: 1/4;
    padding-top: 0;
  }
  .entry .readouts > div {
    padding-bottom: 0;
  }
}

@media (max-width: 750px) {
  .entry .plot svg text {
    font-size: 24px;
  }
}
</style>
