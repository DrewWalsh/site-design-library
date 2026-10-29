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
    .filter((k) => k.startsWith('design-library:10:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const records = [
  {
    id: 'PW-021',
    claim: 'Riverside path resurfacing',
    org: 'Northbank Council',
    value: '£84,200',
    status: 'Documented',
    date: '14 Oct 2026',
  },
  {
    id: 'PW-020',
    claim: 'Library access improvements',
    org: 'Civic Property Unit',
    value: '£126,000',
    status: 'Conflicting',
    date: '09 Oct 2026',
  },
  {
    id: 'PW-019',
    claim: 'West bridge inspection',
    org: 'Northbank Council',
    value: '£18,500',
    status: 'Documented',
    date: '06 Oct 2026',
  },
  {
    id: 'PW-018',
    claim: 'Market hall roof repairs',
    org: 'Market Trust',
    value: '£62,400',
    status: 'Source unavailable',
    date: '01 Oct 2026',
  },
  {
    id: 'PW-017',
    claim: 'Bus shelter replacement',
    org: 'Transport Office',
    value: '£34,800',
    status: 'Documented',
    date: '28 Sep 2026',
  },
];
const filtered = computed(() =>
  records.filter(
    (r) =>
      (tab.value === 'All' || r.status === tab.value) &&
      JSON.stringify(r).toLowerCase().includes(q.value.toLowerCase()),
  ),
);
</script>
<template>
  <div class="specimen" :class="{ entry: state === 'start' }">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>▤ PUBLIC WORKS LEDGER</strong
      ><span>A sample record of decisions and their evidence.</span
      ><button @click="go('start')">Record index</button>
    </header>
    <main id="content">
      <div class="warning">
        FICTIONAL DATASET · These records demonstrate an evidence interface. They are not real
        contracts.
      </div>
      <template v-if="state === 'start'"
        ><div class="records-heading">
          <h1>Public records</h1>
          <span>5 records · Updated 26 Oct 2026</span>
        </div>
        <div class="ledger">
          <aside>
            <p class="eyebrow">EVIDENCE STATUS</p>
            <button
              v-for="s in ['All', 'Documented', 'Conflicting', 'Source unavailable']"
              :key="s"
              :aria-pressed="tab === s"
              @click="tab = s"
            >
              {{ s }}
            </button>
            <h3>About this ledger</h3>
            <p>
              Every record identifies what is stated, where it appears, and what remains uncertain.
            </p>
            <p>Amounts, organisations, and source documents are invented.</p>
          </aside>
          <section>
            <label class="search"
              >Search the records<input
                v-model="q"
                placeholder="Contract, organisation, or record ID"
            /></label>
            <p class="count">{{ filtered.length }} records / Newest first</p>
            <div class="scroll">
              <table>
                <thead>
                  <tr>
                    <th>Record / Claim</th>
                    <th>Organisation</th>
                    <th>Value</th>
                    <th>Evidence</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="r in filtered" :key="r.id">
                    <td>
                      <small>{{ r.id }} · {{ r.date }}</small
                      ><button
                        @click="
                          selected = records.indexOf(r);
                          go(r.status === 'Source unavailable' ? 'unavailable' : 'record');
                        "
                      >
                        {{ r.claim }} ↗
                      </button>
                    </td>
                    <td>{{ r.org }}</td>
                    <td>{{ r.value }}</td>
                    <td>
                      <span :class="{ conflict: r.status === 'Conflicting' }">{{ r.status }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="empty" v-if="!filtered.length">
              <h2>No matching records</h2>
              <button
                @click="
                  q = '';
                  tab = 'All';
                "
              >
                Reset search and status
              </button>
            </div>
            <section class="method">
              <h2>How to read a record</h2>
              <div>
                <p><b>01 / Statement</b><br />What the record claims, with dates and scope.</p>
                <p><b>02 / Source</b><br />The relevant excerpt, kept beside the claim.</p>
                <p><b>03 / Interpretation</b><br />What can and cannot be concluded from it.</p>
              </div>
            </section>
          </section>
        </div></template
      ><template v-else
        ><button @click="go('start')">← All records</button>
        <p class="eyebrow recordid">{{ records[selected].id }} / {{ records[selected].date }}</p>
        <h1>{{ records[selected].claim }}</h1>
        <div class="evidence">
          <article>
            <p class="eyebrow">THE ASSERTION</p>
            <h2>Award recorded at {{ records[selected].value }}.</h2>
            <p>
              The fixture says {{ records[selected].org }} recorded an award for the stated works on
              {{ records[selected].date }}.
            </p>
            <dl>
              <dt>Applicable date</dt>
              <dd>{{ records[selected].date }}</dd>
              <dt>Evidence status</dt>
              <dd>
                {{ state === 'unavailable' ? 'Source unavailable' : records[selected].status }}
              </dd>
            </dl>
            <h3>Interpretation</h3>
            <p>
              An award value is not proof of final expenditure. The source does not establish
              whether all work was completed.
            </p>
          </article>
          <article class="source">
            <p class="eyebrow">SOURCE EXCERPT / FIXTURE DOCUMENT</p>
            <template v-if="state !== 'unavailable'"
              ><h2>Committee record 14/26</h2>
              <blockquote>
                “The committee approved the proposed works at the stated contract value, subject to
                the scope described in appendix B.”
              </blockquote>
              <p>Fictional document · Section 4.2 · Page 7</p>
              <p v-if="records[selected].status === 'Conflicting'" class="notice">
                Conflicting fixture: the appendix lists £118,000, while the summary lists £126,000.
                The discrepancy remains unresolved.
              </p>
              <button @click="go('unavailable')">
                Inspect unavailable-source example →
              </button></template
            ><template v-else
              ><h2>The source cannot be opened.</h2>
              <p>
                The fixture document is missing from this sample record. The claim remains visible,
                but cannot be verified from the supplied material.
              </p>
              <p>No confidence score has been substituted for missing evidence.</p>
              <button @click="go('record')">Return to available example</button></template
            >
          </article>
        </div></template
      >
    </main>
    <footer class="specimen-note">
      <span>Public Works Ledger · Fictional sample content · Design reference 10</span
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
header {
  padding: 24px 4%;
  display: flex;
  gap: 30px;
  align-items: center;
  border-bottom: 1px solid var(--line);
  background: white;
  font-size: 12px;
}
header strong {
  letter-spacing: 0.04em;
}
header span {
  color: #677684;
  font-size: 11px;
}
header button {
  margin-left: auto;
  background: none;
  border: 0;
  font-size: 11px;
}
main {
  padding: 25px 4% 90px;
  max-width: 1500px;
  margin: auto;
}
.warning {
  padding: 10px 15px;
  background: #eee8d6;
  color: #62501f;
  font-size: 10px;
  letter-spacing: 0.03em;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  padding: 40px 0 30px;
}
.title h1 {
  font-size: 48px;
  margin: 15px 0;
}
.title > span {
  font-size: 11px;
  line-height: 1.9;
  color: #586678;
}
.title p {
  font-size: 14px;
}
.ledger {
  display: grid;
  grid-template-columns: 205px 1fr;
  gap: 40px;
}
.ledger aside {
  border-top: 3px solid;
  padding-top: 22px;
}
.ledger aside button {
  display: block;
  text-align: left;
  width: 100%;
  font-size: 12px;
  padding: 12px;
  border: none;
  background: none;
}
.ledger aside button[aria-pressed='true'] {
  background: #e6ebed;
}
.ledger aside h3 {
  font-size: 15px;
  margin-top: 45px;
}
.ledger aside p:not(.eyebrow) {
  font-size: 12px;
  color: #617282;
}
.search {
  font-size: 11px;
}
.search input {
  padding: 12px;
  background: #fff;
}
.count {
  font-size: 10px;
  color: #617282;
  margin: 20px 0;
}
table {
  background: white;
}
th {
  font-size: 9px;
}
td {
  font-size: 12px;
  min-width: 120px;
}
td small {
  font-size: 9px;
  display: block;
  color: #697889;
  margin-bottom: 9px;
}
td button {
  font-size: 13px;
  font-weight: 600;
  padding: 0;
  text-align: left;
  background: none;
  border: 0;
}
td:first-child {
  min-width: 260px;
}
td span {
  font-size: 10px;
  border: 1px solid #ccd6d9;
  padding: 5px;
  white-space: nowrap;
}
.conflict {
  background: #f4e9d1;
}
.method {
  border-top: 2px solid;
  margin-top: 50px;
  padding-top: 25px;
}
.method h2 {
  font-size: 23px;
}
.method > div {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}
.method p {
  font-size: 12px;
  line-height: 1.8;
}
.method b {
  display: inline-block;
  margin-bottom: 10px;
}
.recordid {
  margin-top: 35px;
}
main > h1 {
  font-size: 52px;
  max-width: 900px;
}
.evidence {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-top: 45px;
}
.evidence article {
  padding: 30px;
  border-top: 4px solid;
}
.evidence h2 {
  font-size: 29px;
  line-height: 1.3;
}
.evidence p {
  font-size: 14px;
}
.source {
  background: #e9eceb;
}
.source blockquote {
  margin: 30px 0;
  border-left: 3px solid #a88b3e;
  padding-left: 20px;
  font: 20px/1.8 Georgia;
}
.evidence dl {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 15px;
  font-size: 12px;
}
.evidence dd {
  margin: 0;
}
@media (max-width: 800px) {
  header span {
    display: none;
  }
  .ledger {
    grid-template-columns: 160px 1fr;
    gap: 20px;
  }
}
@media (max-width: 600px) {
  header {
    padding: 20px;
  }
  header strong {
    font-size: 11px;
  }
  .title {
    display: block;
  }
  .title h1 {
    font-size: 38px;
  }
  .ledger {
    display: block;
  }
  .ledger aside {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 25px;
  }
  .ledger aside .eyebrow {
    width: 100%;
  }
  .ledger aside button {
    width: auto;
    font-size: 10px;
  }
  .ledger aside h3,
  .ledger aside p:not(.eyebrow) {
    display: none;
  }
  .method > div,
  .evidence {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  main > h1 {
    font-size: 38px;
  }
  .evidence article {
    padding: 22px;
  }
  .warning {
    font-size: 9px;
  }
  thead {
    display: none;
  }
  tr {
    display: block;
    padding: 15px;
    border-bottom: 1px solid var(--line);
  }
  td {
    display: block;
    border: 0;
    padding: 6px 0;
    min-width: 0 !important;
  }
  td:nth-child(2)::before {
    content: 'Organisation: ';
  }
  td:nth-child(3)::before {
    content: 'Award: ';
  }
  .ledger .scroll {
    overflow: visible;
  }
}

/* The entry is the experience itself; supporting routes retain its vocabulary. */

.entry header {
  padding: 22px 3%;
}
.entry main {
  max-width: 1500px;
  width: 100%;
  padding: 25px 3%;
  margin: auto;
}
.entry .warning {
  font-size: 10px;
  padding: 12px;
  margin-bottom: 20px;
}
.records-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}
.records-heading h1 {
  font-size: 25px;
  letter-spacing: -0.03em;
  margin: 0;
}
.records-heading span {
  font-size: 11px;
}
.entry .ledger {
  grid-template-columns: 210px minmax(0, 1fr);
  gap: 30px;
}
.entry .ledger aside {
  padding-top: 10px;
}
.entry .ledger aside button {
  font-size: 12px;
  padding: 12px 0;
}
.entry .search {
  font-size: 10px;
}
.entry .search input {
  font-size: 13px;
  padding: 14px;
}
.entry .count {
  font-size: 11px;
}
.entry th {
  font-size: 11px;
}
.entry td {
  padding: 24px 12px;
  font-size: 13px;
}
.entry td small {
  font-size: 10px;
}
.entry td button {
  font-size: 16px;
}
.entry .method {
  margin-top: 40px;
}
@media (max-width: 750px) {
  .records-heading {
    display: block;
    margin-bottom: 20px;
  }
  .records-heading h1 {
    font-size: 24px;
    margin-bottom: 7px;
  }
  .records-heading span {
    font-size: 10px;
  }
  .entry main {
    padding: 20px 5%;
  }
  .entry .ledger {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .entry .ledger > aside {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 0;
  }
  .entry .ledger aside > .eyebrow {
    width: 100%;
    margin: 0;
    font-size: 9px;
  }
  .entry .ledger aside button {
    padding: 8px 10px;
    border: 1px solid #b3bebf;
    font-size: 10px;
  }
  .entry .ledger aside h3,
  .entry .ledger aside p:not(.eyebrow) {
    display: none;
  }
  .entry td {
    padding: 14px 10px;
  }
  .entry td button {
    font-size: 15px;
  }
}
</style>
