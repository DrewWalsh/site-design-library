<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useSpecimen } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const units = [
  {
    name: 'Locker',
    area: 10,
    label: '2 × 5 ft',
    capacity: 1.8,
    price: 35,
    available: 4,
    fit: 'Boxes, seasonal gear, and a bicycle',
  },
  {
    name: 'Small',
    area: 25,
    label: '5 × 5 ft',
    capacity: 4.5,
    price: 65,
    available: 3,
    fit: 'A few pieces of furniture or a studio clear-out',
  },
  {
    name: 'Medium',
    area: 50,
    label: '5 × 10 ft',
    capacity: 9,
    price: 105,
    available: 0,
    fit: 'The contents of a small one-bedroom home',
  },
  {
    name: 'Large',
    area: 100,
    label: '10 × 10 ft',
    capacity: 18,
    price: 175,
    available: 2,
    fit: 'Furniture and boxes from a two-bedroom home',
  },
];
const items = [
  { name: 'Moving boxes', volume: 0.12 },
  { name: 'Armchairs', volume: 0.8 },
  { name: 'Sofas', volume: 2 },
  { name: 'Beds & mattresses', volume: 1.5 },
  { name: 'Bicycles', volume: 0.6 },
];
const quantities = ref([12, 1, 0, 0, 0]),
  validInventory = computed(() =>
    quantities.value.every((q) => Number.isInteger(q) && q >= 0 && q <= 100),
  ),
  volume = computed(() =>
    quantities.value.reduce((s, q, i) => s + Math.max(0, Number(q) || 0) * items[i].volume, 0),
  ),
  recommendation = computed(() => units.findIndex((u) => u.capacity >= volume.value * 1.25));
const chosen = ref(1),
  name = ref(''),
  email = ref(''),
  start = ref('2026-11-16'),
  sent = ref(false),
  unit = computed(() => units[chosen.value]);
function choose(i: number) {
  chosen.value = i;
  sent.value = false;
  go('reserve');
}
</script>
<template>
  <div class="specimen" :class="{ entry: state === 'start' }">
    <a class="skip" href="#content">Skip to content</a>
    <header class="stack-header wrap">
      <a :href="href('start')" class="stack-logo"
        ><i aria-hidden="true">▱<br />▱</i> STACK<span>SELF STORAGE</span></a
      >
      <nav class="row">
        <a :href="href('start') + '#sizes'">Sizes &amp; prices</a
        ><button class="text-link" @click="go('size')">Find your size</button
        ><button class="primary" @click="go('reserve')">Reserve a unit</button>
      </nav>
    </header>
    <main id="content">
      <section v-if="state !== 'reserve'" class="wrap capacity-entry">
        <div class="capacity-title">
          <h1>What are you storing?</h1>
          <p>
            Count the things. Compare the space.<br />Estimate includes a 25% packing allowance.
          </p>
        </div>
        <div class="calculator">
          <div class="inventory">
            <label v-for="(item, i) in items" :key="item.name"
              ><span
                >{{ item.name }}<small>{{ item.volume }} m³ per item, approximate</small></span
              ><input
                type="number"
                min="0"
                max="100"
                v-model.number="quantities[i]"
                :aria-label="item.name"
            /></label>
          </div>
          <aside class="recommendation" aria-live="polite">
            <p class="eyebrow">YOUR STARTING POINT</p>
            <svg class="capacity-drawing" viewBox="0 0 320 180" aria-hidden="true">
              <path d="M35 85 170 25 285 75 150 140Z" fill="#e4e9f8" stroke="#2145a3" />
              <path
                d="M35 85V125L150 178V140M150 140 285 75V115L150 178"
                fill="#b2c4ed"
                stroke="#2145a3"
              />
              <g fill="#ead4a3" stroke="#6c5126">
                <rect
                  v-for="n in Math.min(12, Math.max(1, Math.ceil(volume * 2)))"
                  :key="n"
                  :x="72 + ((n - 1) % 4) * 38"
                  :y="65 + Math.floor((n - 1) / 4) * 24"
                  width="29"
                  height="22"
                />
              </g>
            </svg>
            <p v-if="!validInventory" role="alert">
              Enter a whole number from 0 to 100 for each item to estimate your space.
            </p>
            <template v-else-if="recommendation >= 0"
              ><h2>{{ units[recommendation].name }}</h2>
              <p class="capacity">
                {{ units[recommendation].label
                }}<span>{{ (volume * 1.25).toFixed(1) }} m³ including allowance</span>
              </p>
              <p>{{ units[recommendation].fit }}.</p>
              <button
                class="primary"
                :disabled="!units[recommendation].available"
                @click="choose(recommendation)"
              >
                {{
                  units[recommendation].available
                    ? 'Reserve this size →'
                    : 'This size is currently full'
                }}</button
              ><button
                class="text-link"
                v-if="!units[recommendation].available && recommendation < 3"
                @click="choose(recommendation + 1)"
              >
                Consider the next available size →
              </button></template
            ><template v-else
              ><h2>Let’s talk it through.</h2>
              <p>
                Your inventory exceeds the sample sizes. A facility could discuss a larger unit or
                split storage.
              </p></template
            >
            <p class="muted">
              An estimate, not a guarantee of fit. Dimensions refer to the approximate floor
              footprint.
            </p>
          </aside>
        </div>
        <a :href="href('start') + '#sizes'" class="all-sizes">Compare all sizes and prices ↓</a>
      </section>
      <template v-if="state === 'start'"
        ><section id="sizes" class="wrap section size-section">
          <div class="section-heading">
            <h2>A space for<br />what comes next.</h2>
            <p>
              Sample monthly prices. Every unit includes standard access; a real quote should
              explain tax, insurance, locks, and any minimum term.
            </p>
          </div>
          <div class="unit-matrix">
            <article v-for="(u, i) in units" :key="u.name">
              <div class="unit-size">
                <svg viewBox="0 0 130 85" role="img" :aria-label="u.label + ' unit footprint'">
                  <path
                    :d="
                      'M15 65V' +
                      (60 - i * 10) +
                      'L75 ' +
                      (10 + i * 3) +
                      ' 115 ' +
                      (30 + i * 5) +
                      'V75L55 82Z'
                    "
                    fill="#dae2f8"
                    stroke="#2145a3"
                    stroke-width="2"
                  />
                  <path
                    d="M15 65 55 82 115 75 M55 82V45"
                    fill="none"
                    stroke="#2145a3"
                    stroke-width="2"
                  /></svg
                ><span>{{ u.area }} ft²</span>
              </div>
              <h3>{{ u.name }}</h3>
              <p>{{ u.label }} · {{ u.fit }}</p>
              <strong>&#36;{{ u.price }}<small> / month</small></strong
              ><span :class="['availability', { full: !u.available }]">{{
                u.available ? u.available + ' sample units available' : 'Currently full'
              }}</span
              ><button :disabled="!u.available" @click="choose(i)">
                {{ u.available ? 'Choose ' + u.name : 'No units available' }}
              </button>
            </article>
          </div>
        </section>
        <section class="storage-guide">
          <div class="wrap three">
            <div>
              <span>01</span>
              <h3>Choose a practical size</h3>
              <p>
                Use the calculator as a starting point. Allow space for access and awkward items.
              </p>
            </div>
            <div>
              <span>02</span>
              <h3>Know the access</h3>
              <p>
                Sample access hours: 06:00–22:00 daily. Staffed reception: weekdays 09:00–17:00.
              </p>
            </div>
            <div>
              <span>03</span>
              <h3>Reserve, then confirm</h3>
              <p>
                A live facility would confirm availability, agreement terms, and your move-in
                details.
              </p>
            </div>
          </div>
        </section></template
      >
      <section v-else-if="state === 'reserve'" class="wrap state-page">
        <button class="back text-link" @click="go('start')">← Compare storage sizes</button>
        <h1>Your space, clearly set out.</h1>
        <div class="state-grid">
          <form class="form" v-if="!sent" @submit.prevent="sent = true">
            <label
              >Unit size<select v-model.number="chosen">
                <option v-for="(u, i) in units" :key="u.name" :value="i" :disabled="!u.available">
                  {{ u.name }} · {{ u.label }} ·
                  {{ u.available ? '$' + u.price + '/month' : 'Full' }}
                </option>
              </select></label
            ><label
              >Preferred move-in date<input
                type="date"
                min="2026-11-01"
                max="2027-01-31"
                required
                v-model="start" /></label
            ><label>Name<input required v-model="name" /></label
            ><label>Email<input required type="email" v-model="email" /></label
            ><label class="checkline"
              ><input type="checkbox" required />I understand this is a sample reservation.</label
            ><button class="primary" :disabled="!unit.available">Review unit reservation</button>
          </form>
          <div v-else class="confirmation" role="status">
            <h2>Reservation prepared.</h2>
            <p>{{ name }} · {{ unit.name }} · {{ start }}<br />&#36;{{ unit.price }} per month</p>
            <p>
              No unit has been held or charged. A real reservation would confirm the exact unit,
              terms, and move-in instructions.
            </p>
          </div>
          <aside class="unit-summary">
            <span class="eyebrow">YOUR SELECTED SPACE</span>
            <h2>{{ unit.name }}</h2>
            <p>{{ unit.label }} · {{ unit.area }} ft²</p>
            <strong>&#36;{{ unit.price }}<small>/month</small></strong>
            <ul>
              <li>Month-to-month sample term</li>
              <li>Ground-level access</li>
              <li>Access 06:00–22:00 daily</li>
              <li>Insurance and tax excluded from sample price</li>
            </ul>
            <button class="text-link" @click="go('size')">Check your size again →</button>
          </aside>
        </div>
      </section>
    </main>
    <footer class="sample-footer">
      <span>STACK / Storage · Fictional design reference 59.</span
      ><span>Sample data and illustrative images. Interactions stay on this page.</span
      ><a :href="href('start')">Reset sample</a>
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/space-grotesk.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}
@font-face {
  font-family: 'DM Sans';
  src: url('/fonts/dm-sans.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}
@font-face {
  font-family: 'IBM Plex Mono';
  src: url('/fonts/ibm-plex-mono.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}

.specimen {
  min-height: 100vh;
  background: var(--page);
  color: var(--ink);
  font: 16px/1.6 var(--body);
  overflow-wrap: break-word;
}
.specimen * {
  min-width: 0;
}
h1,
h2,
h3,
p,
figure {
  margin: 0;
}
h1,
h2,
h3 {
  font-family: var(--heading);
  line-height: 1.12;
}
h1 {
  font-size: clamp(2.5rem, 5.3vw, 5.5rem);
  letter-spacing: -0.045em;
}
h2 {
  font-size: clamp(1.8rem, 3vw, 3rem);
  letter-spacing: -0.03em;
}
h3 {
  font-size: 1.25rem;
}
p + p {
  margin-top: 1rem;
}
button,
input,
select,
textarea {
  border: 1px solid var(--line);
  padding: 10px 15px;
  border-radius: 0;
  background: var(--surface);
  color: var(--ink);
}
button {
  font-weight: 600;
}
button:disabled {
  opacity: 0.55;
}
button[aria-pressed='true'] {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
button:hover:not(:disabled) {
  filter: brightness(0.94);
}
a {
  text-underline-offset: 4px;
}
.primary {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: 44px;
  padding: 12px 20px;
  background: var(--accent);
  color: #fff;
  border: 1px solid var(--accent);
  text-decoration: none;
  font-weight: 700;
}
.eyebrow {
  font:
    12px/1.5 'IBM Plex Mono',
    monospace;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}
.lead {
  font-size: 1.15rem;
  max-width: 52ch;
}
.wrap {
  max-width: var(--content);
  margin: auto;
  padding: 0 40px;
}
.row {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}
.stack {
  display: grid;
  gap: 20px;
}
.spread {
  justify-content: space-between;
}
.muted {
  font-size: 0.875rem;
}
.rule {
  border-top: 1px solid var(--line);
}
.skip {
  position: absolute;
  top: -100px;
  left: 12px;
  z-index: 99;
  background: var(--ink);
  color: var(--page);
  padding: 12px;
}
.skip:focus {
  top: 10px;
}
.sample-footer {
  padding: 26px 40px;
  border-top: 1px solid var(--line);
  display: flex;
  gap: 12px 24px;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 12px;
}
.photo {
  display: block;
  width: 100%;
  object-fit: cover;
}
figcaption {
  font-size: 12px;
  padding: 8px 0;
}
.form {
  display: grid;
  gap: 20px;
  max-width: 700px;
}
.form label {
  display: grid;
  gap: 6px;
  font-size: 0.9rem;
}
.form input,
.form select,
.form textarea {
  width: 100%;
  max-width: 100%;
}
.form textarea {
  min-height: 110px;
}
.form fieldset {
  border: 1px solid var(--line);
  padding: 20px;
  display: grid;
  gap: 12px;
}
.form fieldset label {
  display: flex;
  align-items: center;
  gap: 10px;
}
.form input[type='radio'],
.form input[type='checkbox'] {
  width: 20px;
  height: 20px;
  min-height: 20px;
  flex: 0 0 20px;
}
.notice {
  padding: 20px;
  border-left: 4px solid var(--accent);
  background: var(--surface);
}
[role='alert'] {
  color: #912f24;
  background: #fff3ec;
  padding: 14px;
}
table {
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}
th,
td {
  border-bottom: 1px solid var(--line);
  padding: 15px 10px;
}
dl {
  margin: 0;
}
dt {
  font-size: 0.8rem;
}
dd {
  margin: 0;
  font-weight: 600;
}
details {
  border-bottom: 1px solid var(--line);
  padding: 18px 0;
}
summary {
  font-weight: 600;
}
details p {
  padding-top: 12px;
  max-width: 65ch;
}
.back {
  display: inline-block;
  margin-bottom: 32px;
}
.state-page {
  padding-top: 50px;
  padding-bottom: 70px;
}
.state-page > h1 {
  margin-bottom: 25px;
}
.state-page > .lead {
  margin-bottom: 35px;
}
.state-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 60px;
}
.state-grid aside {
  align-self: start;
}
.confirmation {
  padding: 28px;
  border: 1px solid var(--line);
  background: var(--surface);
}
.confirmation h2 {
  margin-bottom: 18px;
}
.checkline {
  display: flex;
  align-items: center;
  gap: 10px;
}
.checkline input {
  width: 20px;
  min-height: 20px;
}
.text-link {
  border: 0;
  padding: 0;
  background: transparent;
  text-decoration: underline;
  min-height: 40px;
}
.two {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
}
.three {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}
.section {
  padding: 65px 0;
}
.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 28px;
  margin-bottom: 28px;
}
.section-heading p {
  max-width: 44ch;
}
.money {
  font-variant-numeric: tabular-nums;
}
.pill {
  display: inline-block;
  border: 1px solid var(--line);
  padding: 4px 10px;
  font-size: 12px;
}
.wide-table {
  overflow: auto;
}
.wide-table table {
  min-width: 550px;
}
@media (max-width: 760px) {
  .wrap {
    padding-left: 22px;
    padding-right: 22px;
  }
  .two,
  .three,
  .state-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .section {
    padding: 42px 0;
  }
  .section-heading {
    display: block;
  }
  .section-heading p {
    margin-top: 14px;
  }
  .sample-footer {
    padding: 24px 22px;
    display: grid;
  }
  .state-page {
    padding-top: 30px;
    padding-bottom: 45px;
  }
  .lead {
    font-size: 1.05rem;
  }
  h1 {
    font-size: clamp(2.2rem, 10vw, 4rem);
  }
  nav {
    flex-wrap: wrap;
  }
  th,
  td {
    padding: 12px 8px;
  }
}

.stack-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  padding-top: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--line);
}
.stack-logo {
  display: flex;
  gap: 9px;
  align-items: center;
  font: 700 34px/1 var(--heading);
  text-decoration: none;
  letter-spacing: -0.04em;
}
.stack-logo i {
  font: 28px/0.5 var(--heading);
  color: var(--accent);
  margin-right: 5px;
}
.stack-logo > span {
  font: 9px/1.4 var(--body);
  width: 40px;
  letter-spacing: 0.09em;
}
.stack-header nav {
  font-size: 13px;
}
.storage-hero {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 45px;
  padding-top: 65px;
  padding-bottom: 65px;
}
.storage-hero h1 {
  margin: 22px 0 28px;
  font-size: clamp(3rem, 4.7vw, 4.7rem);
}
.storage-hero .primary {
  margin-top: 28px;
}
.storage-points {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  font-size: 11px;
  margin-top: 25px;
}
.storage-points span {
  border-left: 2px solid var(--accent);
  padding-left: 10px;
}
.volume-stage {
  background: #e0e6f4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 25px;
  border-radius: 100px 100px 0 0;
}
.volume-stage p {
  font-size: 13px;
  margin-top: 20px;
  text-align: center;
}
.size-section {
  border-top: 1px solid var(--ink);
}
.unit-matrix {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid var(--line);
}
.unit-matrix article {
  padding: 25px;
  border-right: 1px solid var(--line);
  display: flex;
  flex-direction: column;
}
.unit-matrix article:last-child {
  border-right: 0;
}
.unit-size {
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom: 22px;
}
.unit-size svg {
  height: 90px;
}
.unit-size span {
  font: 12px 'IBM Plex Mono';
  background: #dce4f6;
  padding: 4px 9px;
  margin-top: 8px;
}
.unit-matrix h3 {
  font-size: 27px;
}
.unit-matrix p {
  font-size: 13px;
  margin: 15px 0;
  flex: 1;
}
.unit-matrix strong {
  font-size: 30px;
}
.unit-matrix small {
  font-size: 12px;
  font-weight: 400;
}
.availability {
  font-size: 11px;
  margin: 20px 0;
  color: #235336;
}
.availability.full {
  color: #73532b;
}
.unit-matrix button {
  font-size: 12px;
  border-color: var(--accent);
  background: transparent;
  color: var(--accent);
}
.storage-guide {
  background: #203e8b;
  color: #fff;
  padding: 50px 0;
}
.storage-guide span {
  font: 30px var(--heading);
}
.storage-guide h3 {
  margin: 18px 0 14px;
}
.storage-guide p {
  font-size: 14px;
}
.calculator {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 55px;
}
.inventory > label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 23px 0;
  border-bottom: 1px solid var(--line);
}
.inventory small {
  display: block;
  font-size: 12px;
  margin-top: 7px;
}
.inventory input {
  width: 90px;
}
.recommendation {
  padding: 35px;
  background: #e0e6f4;
  border: 1px solid #b2c2e9;
}
.recommendation h2 {
  font-size: 50px;
  margin: 20px 0;
}
.capacity {
  font-size: 24px;
}
.capacity span {
  display: block;
  font-size: 13px;
  margin-top: 8px;
}
.recommendation button {
  margin-top: 25px;
}
.recommendation .muted {
  margin-top: 20px;
}
.unit-summary {
  padding: 35px;
  background: #e0e6f4;
}
.unit-summary h2 {
  font-size: 40px;
  margin-top: 20px;
}
.unit-summary strong {
  display: block;
  font-size: 42px;
  margin-top: 15px;
}
.unit-summary small {
  font-size: 14px;
}
.unit-summary ul {
  padding-left: 20px;
  font-size: 14px;
}
.unit-summary li {
  padding: 8px 0;
}
@media (max-width: 760px) {
  .stack-header nav > a,
  .stack-header .text-link {
    display: none;
  }
  .stack-header .primary {
    font-size: 11px;
    padding: 9px;
  }
  .stack-logo {
    font-size: 27px;
  }
  .stack-logo > span {
    display: none;
  }
  .storage-hero,
  .calculator {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .storage-hero {
    padding-top: 35px;
  }
  .storage-hero h1 {
    font-size: 3rem;
  }
  .volume-stage {
    max-width: 380px;
    width: 100%;
    justify-self: center;
    border-radius: 70px 70px 0 0;
  }
  .volume-stage svg {
    height: 260px;
  }
  .unit-matrix {
    grid-template-columns: 1fr 1fr;
  }
  .unit-matrix article {
    border-bottom: 1px solid var(--line);
    padding: 20px;
  }
  .unit-matrix article:nth-child(even) {
    border-right: 0;
  }
  .unit-matrix h3 {
    font-size: 23px;
  }
  .unit-matrix p {
    font-size: 12px;
  }
  .unit-matrix button {
    padding: 10px 8px;
  }
  .unit-size svg {
    height: 70px;
  }
  .recommendation {
    padding: 25px;
  }
}

/* The entry is the experience itself; supporting routes retain its vocabulary. */
.capacity-entry {
  padding-top: 24px;
}
.capacity-title {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 18px;
}
.capacity-title h1 {
  font-size: 34px;
  letter-spacing: -0.035em;
}
.capacity-title p {
  font-size: 13px;
}
.capacity-entry .calculator {
  gap: 0;
  border: 2px solid var(--accent);
  margin-top: 0;
  grid-template-columns: 1fr 1fr;
}
.capacity-entry .inventory {
  padding: 24px 36px;
  background: #fff;
}
.capacity-entry .inventory label {
  padding: 12px 0;
}
.capacity-entry .recommendation {
  position: relative;
  padding: 28px 32px;
  background: #e6ecfa;
  border: 0;
}
.capacity-entry .recommendation h2 {
  font-size: 54px;
}
.capacity-drawing {
  float: right;
  width: 42%;
  height: 160px;
}
.all-sizes {
  display: block;
  padding: 15px 0;
}
.entry .size-section {
  padding-top: 25px;
}
.entry .size-section h2 {
  font-size: 28px;
}
@media (max-width: 700px) {
  .capacity-title {
    display: block;
  }
  .capacity-title h1 {
    font-size: 29px;
  }
  .capacity-title p {
    margin-top: 10px;
  }
  .capacity-entry .calculator {
    grid-template-columns: 1fr;
  }
  .capacity-entry .inventory {
    padding: 12px 18px;
  }
  .capacity-entry .inventory label {
    padding: 8px 0;
  }
  .capacity-entry .recommendation {
    padding: 20px;
  }
  .capacity-entry .recommendation h2 {
    font-size: 40px;
  }
  .capacity-drawing {
    height: 115px;
  }
  .capacity-entry {
    padding-top: 12px;
  }
}
</style>
