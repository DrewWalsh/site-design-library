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
    .filter((k) => k.startsWith('design-library:21:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const parts = [
  { code: 'BS-D18', name: '18V drill driver', platform: '18V', stock: 12, price: 89 },
  { code: 'BS-I18', name: '18V impact driver', platform: '18V', stock: 8, price: 104 },
  { code: 'BS-B18', name: '18V battery / 4Ah', platform: '18V', stock: 18, price: 48 },
  { code: 'BS-C18', name: '18V rapid charger', platform: '18V', stock: 0, price: 35 },
  { code: 'BS-S12', name: '12V compact sander', platform: '12V', stock: 6, price: 72 },
  { code: 'BS-B12', name: '12V battery / 2Ah', platform: '12V', stock: 9, price: 29 },
];
const qty = ref([1, 1, 1, 1, 1, 1]),
  basket = useStored<Record<string, number>>('21:basket', {});
const total = computed(() => parts.reduce((n, p) => n + (basket.value[p.code] || 0) * p.price, 0));
function add(i: number) {
  const p = parts[i];
  const n = Number(qty.value[i]);
  if (!Number.isInteger(n) || n < 1 || n + (basket.value[p.code] || 0) > p.stock) {
    message.value = 'Choose a quantity within available stock.';
    return;
  }
  basket.value[p.code] = (basket.value[p.code] || 0) + n;
  message.value = p.code + ' added to the sample basket.';
}
function bulk() {
  const codes = q.value.toUpperCase().split(/[, ]+/).filter(Boolean);
  const invalid = codes.filter((c) => !parts.some((p) => p.code === c && p.stock > 0));
  if (invalid.length) {
    message.value = 'Unavailable or unknown codes: ' + invalid.join(', ');
    return;
  }
  for (const c of codes) {
    const i = parts.findIndex((p) => p.code === c);
    add(i);
  }
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>BENCH<span>SUPPLY</span></strong
      ><span>TOOLS / PARTS / PRACTICAL THINGS</span
      ><button @click="go('basket')">Basket · £{{ total }}</button>
    </header>
    <main id="content">
      <nav class="breadcrumbs">
        <button @click="go('start')">All departments</button> / Power tools / Cordless systems
      </nav>
      <template v-if="state === 'start'"
        ><div class="intro">
          <div>
            <p class="eyebrow">THE RIGHT TOOL. THE RIGHT BATTERY.</p>
            <h1>Build your cordless kit.</h1>
            <p>Compare compatible tools, check stock, and add exactly what you need.</p>
          </div>
          <div class="help">
            <b>Already know your part codes?</b>
            <form @submit.prevent="bulk">
              <label class="sr">Part codes<input v-model="q" placeholder="BS-D18, BS-B18" /></label
              ><button>Quick add</button>
            </form>
          </div>
        </div>
        <div class="store">
          <aside>
            <h2>Departments</h2>
            <button @click="tab = 'All'">All cordless tools</button
            ><button @click="tab = '18V'">18V platform</button
            ><button @click="tab = '12V'">12V platform</button
            ><button @click="go('compatibility')">Compatibility guide ↗</button>
            <p>Sample stock and prices.<br />No real orders are placed.</p>
          </aside>
          <section>
            <div class="row">
              <h2>CORDLESS SYSTEMS</h2>
              <span class="grow"></span
              ><label
                >Platform<select v-model="tab">
                  <option>All</option>
                  <option>18V</option>
                  <option>12V</option>
                </select></label
              >
            </div>
            <p v-if="message" class="notice" role="status">{{ message }}</p>
            <div class="scroll">
              <table>
                <thead>
                  <tr>
                    <th>Part / description</th>
                    <th>Platform</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Add</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="p in parts.filter((p) => tab === 'All' || p.platform === tab)"
                    :key="p.code"
                  >
                    <td>
                      <small>{{ p.code }}</small
                      ><b>{{ p.name }}</b>
                    </td>
                    <td>{{ p.platform }}</td>
                    <td :class="{ unavailable: !p.stock }">
                      {{ p.stock ? p.stock + ' in stock' : 'Unavailable' }}
                    </td>
                    <td>£{{ p.price }}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        :max="p.stock"
                        v-model.number="qty[parts.indexOf(p)]"
                        :aria-label="'Quantity for ' + p.name"
                        :disabled="!p.stock"
                      />
                    </td>
                    <td>
                      <button class="primary" :disabled="!p.stock" @click="add(parts.indexOf(p))">
                        Add +
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <section class="guide">
              <h2>ONE PLATFORM, MORE POSSIBILITIES.</h2>
              <p>
                An 18V battery fits the 18V tools in this fictional range. The 12V system uses a
                different connector. Check the platform column before combining parts.
              </p>
              <button @click="go('compatibility')">Read the compatibility guide →</button>
            </section>
          </section>
        </div></template
      >
      <section v-else-if="state === 'basket'" class="basket">
        <h1>Your working kit.</h1>
        <p v-if="!total">Your sample basket is empty.</p>
        <div v-for="p in parts.filter((p) => basket[p.code])" :key="p.code" class="basket-row">
          <div>
            <small>{{ p.code }}</small>
            <h2>{{ p.name }}</h2>
          </div>
          <label
            >Quantity<input
              type="number"
              min="1"
              :max="p.stock"
              v-model.number="basket[p.code]" /></label
          ><b>£{{ p.price * (basket[p.code] || 0) }}</b
          ><button @click="delete basket[p.code]">Remove</button>
        </div>
        <h2>Sample total: £{{ total }}</h2>
        <p>No checkout, shipping, or payment is performed.</p>
        <button @click="go('start')">Continue building your kit →</button>
      </section>
      <section v-else class="compat">
        <p class="eyebrow">BUYING GUIDE / 01</p>
        <h1>Match the platform.</h1>
        <h2>18V tools + 18V batteries.</h2>
        <p>
          The voltage label and connector family must match in this fictional product system.
          Batteries from another brand or platform are not assumed compatible.
        </p>
        <table>
          <thead>
            <tr>
              <th>Tool</th>
              <th>Compatible battery</th>
              <th>Charger</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BS-D18 / BS-I18</td>
              <td>BS-B18</td>
              <td>BS-C18 (unavailable)</td>
            </tr>
            <tr>
              <td>BS-S12</td>
              <td>BS-B12</td>
              <td>12V charger, sold separately</td>
            </tr>
          </tbody>
        </table>
        <button @click="go('start')">Return to the matrix →</button>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Bench Supply · Fictional sample content · Design reference 21</span
      ><button @click="reset">Reset demo</button>
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Bebas Neue';
  src: url('/fonts/bebas-neue.woff2') format('woff2');
  font-display: swap;
  font-weight: 100 900;
}
@font-face {
  font-family: 'DM Sans';
  src: url('/fonts/dm-sans.woff2') format('woff2');
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
  color: #fff;
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
  background: #26333d;
  color: white;
  padding: 22px 4%;
  display: flex;
  gap: 40px;
  align-items: center;
}
header strong {
  font: 31px/1 'Bebas Neue';
  letter-spacing: 0.03em;
}
header strong span {
  color: #ecc46b;
  margin-left: 5px;
}
header > span {
  font-size: 10px;
  letter-spacing: 0.1em;
}
header button {
  margin-left: auto;
  font-size: 12px;
}
main {
  padding: 25px 4% 80px;
  max-width: 1500px;
  margin: auto;
}
.breadcrumbs {
  font-size: 11px;
  margin-bottom: 25px;
}
.breadcrumbs button {
  border: 0;
  background: none;
  padding: 0;
  font-size: 11px;
  text-decoration: underline;
}
.intro {
  display: flex;
  gap: 60px;
  align-items: center;
  justify-content: space-between;
  margin: 25px 0 40px;
}
.intro h1 {
  font-size: 62px;
  letter-spacing: 0;
  margin: 15px 0;
}
.intro p {
  font-size: 14px;
}
.help {
  background: #e7eced;
  padding: 20px;
  min-width: 310px;
}
.help b {
  font-size: 12px;
}
.help form {
  display: flex;
  gap: 8px;
  margin-top: 15px;
  align-items: end;
}
.help label {
  font-size: 9px;
}
.help input {
  font-size: 11px;
  width: 170px;
}
.help button {
  font-size: 11px;
}
.store {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 40px;
}
.store aside h2 {
  font-size: 23px;
  letter-spacing: 0.01em;
}
.store aside button {
  display: block;
  background: none;
  border: 0;
  padding: 12px 0;
  text-align: left;
  font-size: 12px;
}
.store aside p {
  font-size: 10px;
  color: #546571;
  margin-top: 45px;
}
.store section > .row h2 {
  font-size: 27px;
  letter-spacing: 0.02em;
}
.store section > .row label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
}
.store select {
  font-size: 12px;
}
.store table {
  background: white;
}
.store th {
  font-size: 9px;
}
.store td {
  font-size: 11px;
}
.store td:first-child {
  min-width: 240px;
}
.store td small {
  font: 10px monospace;
  color: #516977;
  display: block;
  margin-bottom: 8px;
}
.store td b {
  font-size: 13px;
  display: block;
}
.store td input {
  width: 65px;
  padding: 8px;
  font-size: 12px;
}
.store td button {
  font-size: 11px;
  white-space: nowrap;
}
.unavailable {
  color: #84600c;
}
.store td button:disabled {
  background: #dde2e3;
  color: #69747b;
  border-color: #ccd3d4;
}
.guide {
  margin-top: 40px;
  border-top: 3px solid;
  padding-top: 25px;
}
.guide h2 {
  font-size: 31px;
  letter-spacing: 0.01em;
}
.guide p {
  font-size: 14px;
}
.guide button {
  font-size: 12px;
}
.basket-row {
  display: flex;
  gap: 30px;
  align-items: center;
  border-bottom: 1px solid var(--line);
  padding: 20px 0;
}
.basket-row > div {
  flex: 1;
}
.basket-row h2 {
  font-size: 27px;
}
.basket-row label {
  font-size: 10px;
  width: 80px;
}
.basket-row small {
  font: 11px monospace;
}
.basket {
  min-height: 650px;
}
.compat {
  max-width: 900px;
  padding: 30px 0 130px;
}
.compat h1 {
  font-size: 67px;
  letter-spacing: 0;
}
.compat table {
  margin: 30px 0;
}
.compat p {
  font-size: 16px;
}
@media (max-width: 900px) {
  .intro {
    display: block;
  }
  .help {
    max-width: 420px;
    margin-top: 25px;
  }
}
@media (max-width: 600px) {
  header {
    padding: 20px;
    gap: 15px;
  }
  header > span {
    display: none;
  }
  header strong {
    font-size: 28px;
  }
  .intro h1 {
    font-size: 47px;
  }
  .help {
    min-width: 0;
  }
  .store {
    display: block;
  }
  .store aside {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    margin-bottom: 25px;
  }
  .store aside h2,
  .store aside p {
    display: none;
  }
  .store aside button {
    font-size: 10px;
  }
  thead {
    display: none;
  }
  .store tr {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    padding: 20px;
    border-bottom: 1px solid var(--line);
  }
  .store td {
    border: 0;
    padding: 5px 0;
  }
  .store td:first-child {
    grid-column: 1/-1;
    min-width: 0;
  }
  .store td:nth-child(4)::before {
    content: 'Price: ';
  }
  .store td:nth-child(5) {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .store td:nth-child(5)::before {
    content: 'Qty';
  }
  .store .scroll {
    overflow: visible;
  }
  .basket-row {
    flex-wrap: wrap;
    gap: 15px;
  }
  .basket-row > div {
    min-width: 100%;
  }
  .compat h1 {
    font-size: 48px;
  }
  .compat td,
  .compat th {
    font-size: 11px;
  }
}
</style>
