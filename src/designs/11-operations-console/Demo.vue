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
    .filter((k) => k.startsWith('design-library:11:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const rows = useStored('11:shipments', [
  {
    id: 'SHP-2048',
    to: 'Alder Studio',
    city: 'Northbank',
    items: 4,
    status: 'Delayed',
    date: '03 Nov',
    carrier: 'North Freight',
  },
  {
    id: 'SHP-2047',
    to: 'Common Ground',
    city: 'Westhaven',
    items: 12,
    status: 'Ready',
    date: '03 Nov',
    carrier: 'Parcel Co.',
  },
  {
    id: 'SHP-2046',
    to: 'Form School',
    city: 'Eastmere',
    items: 8,
    status: 'In transit',
    date: '02 Nov',
    carrier: 'North Freight',
  },
  {
    id: 'SHP-2045',
    to: 'Ridge Journal',
    city: 'Northbank',
    items: 2,
    status: 'Delayed',
    date: '02 Nov',
    carrier: 'Parcel Co.',
  },
  {
    id: 'SHP-2044',
    to: 'Ember & Orchard',
    city: 'Westhaven',
    items: 6,
    status: 'Ready',
    date: '04 Nov',
    carrier: 'Local run',
  },
  {
    id: 'SHP-2043',
    to: 'Section Works',
    city: 'Eastmere',
    items: 3,
    status: 'In transit',
    date: '02 Nov',
    carrier: 'North Freight',
  },
  {
    id: 'SHP-2042',
    to: 'Evening Room',
    city: 'Northbank',
    items: 5,
    status: 'Delivered',
    date: '01 Nov',
    carrier: 'Parcel Co.',
  },
]);
const checked = ref<string[]>([]);
const filtered = computed(() =>
  state.value === 'empty'
    ? []
    : rows.value.filter(
        (r) =>
          (tab.value === 'All' || r.status === tab.value) &&
          JSON.stringify(r).toLowerCase().includes(q.value.toLowerCase()),
      ),
);
function update() {
  for (const r of rows.value) if (checked.value.includes(r.id)) r.status = 'Ready';
  message.value = checked.value.length + ' shipments marked ready locally.';
  checked.value = [];
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header class="appbar">
      <strong>▥ Dispatch</strong><span>Northbank workspace</span><span class="grow"></span
      ><small>Demo data · 3 November 2026</small><b class="avatar">NB</b>
    </header>
    <div class="appbody">
      <aside>
        <p class="eyebrow">Workspace</p>
        <button :aria-pressed="state === 'start'" @click="go('start')">
          ▤ &nbsp; Shipments <b>7</b></button
        ><button
          @click="
            tab = 'Delayed';
            go('start');
          "
        >
          ⚑ &nbsp; Exceptions <b>{{ rows.filter((r) => r.status === 'Delayed').length }}</b></button
        ><button @click="go('empty')">▧ &nbsp; Returns <b>0</b></button>
        <div class="sidebar-note">
          Outbound operations<br /><small>All changes stay in this browser.</small>
        </div>
      </aside>
      <main id="content">
        <template v-if="state !== 'detail'"
          ><div class="row">
            <div class="grow">
              <p class="eyebrow">Operations / Outbound</p>
              <h1>Shipments</h1>
              <p>Keep the day moving. Resolve exceptions before collection.</p>
            </div>
            <button
              @click="
                tab = 'Delayed';
                go('start');
              "
            >
              Review exceptions →
            </button>
          </div>
          <div class="metrics">
            <div><small>SHIPMENTS</small><strong>07</strong></div>
            <div>
              <small>NEED ATTENTION</small
              ><strong>{{
                rows
                  .filter((r) => r.status === 'Delayed')
                  .length.toString()
                  .padStart(2, '0')
              }}</strong>
            </div>
            <div>
              <small>READY TO COLLECT</small
              ><strong>{{
                rows
                  .filter((r) => r.status === 'Ready')
                  .length.toString()
                  .padStart(2, '0')
              }}</strong>
            </div>
            <p>Next collection<br /><b>Today, 16:30</b></p>
          </div>
          <section class="tablebox">
            <div class="toolbar">
              <div class="row">
                <button
                  v-for="s in ['All', 'Delayed', 'Ready', 'In transit']"
                  :key="s"
                  :aria-pressed="tab === s"
                  @click="
                    tab = s;
                    go('start');
                  "
                >
                  {{ s }}
                </button>
              </div>
              <label class="search"
                >Search shipments<input v-model="q" placeholder="Recipient or shipment ID"
              /></label>
            </div>
            <div class="batch" v-if="checked.length">
              <span>{{ checked.length }} selected</span
              ><button class="primary" @click="update">Mark ready</button
              ><button @click="checked = []">Clear selection</button>
            </div>
            <p v-if="message" role="status" class="message">{{ message }}</p>
            <div class="scroll">
              <table>
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Shipment</th>
                    <th>Recipient</th>
                    <th>Status</th>
                    <th>Items</th>
                    <th>Collection</th>
                    <th>Carrier</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="r in filtered" :key="r.id">
                    <td>
                      <input
                        type="checkbox"
                        :aria-label="'Select ' + r.id"
                        :value="r.id"
                        v-model="checked"
                      />
                    </td>
                    <td>
                      <button
                        class="link"
                        @click="
                          selected = rows.indexOf(r);
                          go('detail');
                        "
                      >
                        {{ r.id }}
                      </button>
                    </td>
                    <td>
                      <strong>{{ r.to }}</strong
                      ><small>{{ r.city }}</small>
                    </td>
                    <td>
                      <span :class="['status', r.status.toLowerCase().replace(' ', '-')]">{{
                        r.status
                      }}</span>
                    </td>
                    <td>{{ r.items }}</td>
                    <td>{{ r.date }}</td>
                    <td>{{ r.carrier }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="!filtered.length" class="empty">
              <h2>No shipments here</h2>
              <p>Try another recipient, or clear the filters.</p>
              <button
                @click="
                  q = '';
                  tab = 'All';
                  go('start');
                "
              >
                Reset filters
              </button>
            </div>
            <div class="tablefooter">
              {{ filtered.length }} of {{ rows.length }} shipments <span>Page 1 of 1</span>
            </div>
          </section>
          <section class="handover">
            <h2>Shift handover</h2>
            <p>
              North Freight collects from loading bay 2. Check the recipient address on delayed
              shipments before releasing them.
            </p>
            <p><strong>Last local update</strong> · Morning shift, 08:45</p>
          </section></template
        ><template v-else
          ><button @click="go('start')">← All shipments</button>
          <h1>{{ rows[selected].id }}</h1>
          <div class="detailgrid">
            <section class="tablebox">
              <h2>{{ rows[selected].to }}</h2>
              <p>{{ rows[selected].city }} · {{ rows[selected].items }} items</p>
              <h3>Handling note</h3>
              <p>
                The address needs a unit number before the carrier can collect this shipment.
                Confirm the label, then release it to the ready queue.
              </p>
              <label
                >Handling status<select v-model="rows[selected].status">
                  <option>Delayed</option>
                  <option>Ready</option>
                  <option>In transit</option>
                  <option>Delivered</option>
                </select></label
              >
              <p class="message" role="status">Saved locally: {{ rows[selected].status }}</p>
            </section>
            <section>
              <h3>Activity</h3>
              <p>08:45 — Address check requested</p>
              <p>08:20 — Packed at station 02</p>
              <p>08:05 — Order received</p>
              <p class="notice">Synthetic shipment. No real dispatch occurs.</p>
            </section>
          </div></template
        >
      </main>
    </div>
    <footer class="specimen-note">
      <span>Dispatch Board · Fictional sample content · Design reference 11</span
      ><button @click="reset">Reset demo</button>
    </footer>
  </div>
</template>
<style scoped>
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
.appbar {
  height: 70px;
  display: flex;
  align-items: center;
  gap: 30px;
  background: white;
  border-bottom: 1px solid var(--line);
  padding: 0 28px;
}
.appbar strong {
  font-size: 24px;
}
.appbar > span {
  font-size: 13px;
}
.avatar {
  background: #e4eee8;
  border-radius: 50%;
  padding: 9px;
  font-size: 12px;
}
.appbody {
  display: grid;
  grid-template-columns: 210px 1fr;
  min-height: 950px;
}
aside {
  background: #fff;
  border-right: 1px solid var(--line);
  padding: 28px 18px;
  position: relative;
}
aside button {
  width: 100%;
  display: flex;
  justify-content: space-between;
  text-align: left;
  margin-bottom: 8px;
  background: transparent;
  border: none;
  font-size: 14px;
}
.sidebar-note {
  margin-top: 120px;
  font-size: 13px;
}
.sidebar-note small {
  color: #536170;
}
main {
  padding: 40px;
  max-width: 1450px;
  width: 100%;
  margin: auto;
}
h1 {
  font-size: 34px;
  margin: 4px 0;
}
.row p {
  margin: 8px 0;
  font-size: 14px;
}
.metrics {
  display: flex;
  gap: 55px;
  align-items: center;
  padding: 28px 0 35px;
}
.metrics small {
  font-size: 10px;
  letter-spacing: 0.08em;
}
.metrics strong {
  font-size: 32px;
  display: block;
}
.metrics p {
  margin-left: auto;
  font-size: 12px;
}
.tablebox {
  background: white;
  border: 1px solid #dfe3e7;
  border-radius: 8px;
  overflow: hidden;
}
.toolbar {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
}
.toolbar button {
  border: none;
  background: #f2f4f5;
  font-size: 12px;
  padding: 9px;
}
.search {
  font-size: 11px;
  min-width: 210px;
}
.search input {
  font-size: 13px;
}
.link {
  background: none;
  border: none;
  color: #245b9d;
  padding: 0;
  font-size: 12px;
  text-decoration: underline;
}
td {
  font-size: 13px;
}
td small {
  display: block;
  color: #65717c;
  font-size: 11px;
}
.status {
  font-size: 11px;
  white-space: nowrap;
  padding: 5px 8px;
  background: #e7edf6;
  border-radius: 4px;
}
.delayed {
  background: #fff0ce;
  color: #80520b;
}
.ready,
.delivered {
  background: #e4f1e9;
  color: #236044;
}
.tablefooter {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding: 18px;
  color: #536170;
}
.batch {
  display: flex;
  padding: 15px;
  gap: 20px;
  align-items: center;
}
.message {
  padding: 0 16px;
}
.empty {
  padding: 30px;
}
.handover {
  padding: 30px 0;
}
.handover h2 {
  font-size: 20px;
}
.handover p {
  font-size: 14px;
}
.detailgrid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 30px;
  margin: 35px 0;
}
.detailgrid .tablebox {
  padding: 30px;
}
@media (max-width: 950px) {
  .appbody {
    grid-template-columns: 150px 1fr;
  }
  main {
    padding: 25px;
  }
  .toolbar {
    display: block;
  }
  .search {
    margin-top: 15px;
  }
  .metrics {
    gap: 25px;
  }
}
@media (max-width: 600px) {
  .appbar {
    padding: 16px;
    height: auto;
    gap: 12px;
  }
  .appbar > span:not(.grow),
  .appbar small {
    display: none;
  }
  .appbody {
    display: block;
  }
  aside {
    padding: 10px;
    display: flex;
    gap: 3px;
    border-bottom: 1px solid var(--line);
  }
  aside p,
  .sidebar-note {
    display: none;
  }
  aside button {
    font-size: 11px;
    padding: 8px;
    justify-content: center;
    gap: 5px;
    margin: 0;
  }
  main {
    padding: 20px;
  }
  main > .row > .grow {
    flex-basis: 100%;
  }
  .metrics {
    gap: 20px;
  }
  .metrics p {
    display: none;
  }
  .metrics small {
    font-size: 8px;
  }
  .metrics strong {
    font-size: 26px;
  }
  .detailgrid {
    grid-template-columns: 1fr;
  }
  thead {
    display: none;
  }
  tr {
    display: grid;
    grid-template-columns: 30px 1fr 1fr;
    padding: 12px;
    border-bottom: 1px solid var(--line);
  }
  td {
    border: none;
    padding: 4px;
  }
  td:nth-child(4) {
    grid-column: 2;
  }
  td:nth-child(5)::after {
    content: ' items';
  }
  td:nth-child(6) {
    grid-column: 2;
  }
  td:first-child {
    grid-row: 1/4;
  }
  .tablebox .scroll {
    overflow: visible;
  }
}
</style>
