<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useSpecimen } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const material = ref('Aluminium 6061'),
  process = ref('CNC milling'),
  quantity = ref(25),
  tolerance = ref('Standard ±0.10 mm'),
  name = ref(''),
  email = ref(''),
  part = ref(''),
  notes = ref(''),
  sent = ref(false);
const capabilities = [
  ['CNC milling', '3-axis / 600 × 400 × 350 mm', 'Aluminium, brass, engineering plastics'],
  ['CNC turning', 'Ø 250 mm / 500 mm length', 'Round stock and repeat components'],
  [
    'Finishing',
    'Deburr, bead blast, anodise coordination',
    'Finish requirements agreed in the RFQ',
  ],
];
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header class="axis-header wrap">
      <a :href="href('start')" class="axis-logo">AXIS<span>PRECISION WORKS</span></a>
      <nav class="row">
        <a :href="href('start') + '#capabilities'">Capabilities</a
        ><button class="text-link" @click="go('process')">Process</button
        ><button class="primary" @click="go('rfq')">BUILD AN RFQ ↗</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="axis-hero wrap">
          <div>
            <p class="eyebrow">TECHNICAL FIT BEFORE THE QUOTE.</p>
            <h1>From drawing<br />to repeatable<br /><em>part.</em></h1>
            <p>
              Low-volume machining for teams that need the specification understood before a tool
              touches material.
            </p>
            <button class="primary" @click="go('rfq')">Start a sample RFQ →</button>
            <div class="axis-data">
              <span>01 / MACHINING</span><span>02 / INSPECTION</span><span>03 / DOCUMENTATION</span>
            </div>
          </div>
          <figure class="drawing">
            <svg
              viewBox="0 0 430 430"
              role="img"
              aria-label="Technical illustration of a machined mounting plate with hole centres and dimension lines"
            >
              <defs>
                <pattern id="ax-grid" width="25" height="25" patternUnits="userSpaceOnUse">
                  <path d="M25 0H0V25" fill="none" stroke="#52625b" stroke-width=".5" />
                </pattern>
              </defs>
              <rect width="430" height="430" fill="url(#ax-grid)" />
              <path
                d="M105 115 275 65 340 130 170 180Z M105 115V285L170 350V180 M170 350 340 300V130"
                fill="#2f3e3c"
                stroke="#cfec91"
                stroke-width="2"
              />
              <g fill="none" stroke="#cfec91" stroke-width="2">
                <ellipse cx="210" cy="125" rx="30" ry="14" />
                <ellipse cx="245" cy="255" rx="25" ry="35" />
                <path
                  d="M65 110V300 M55 115H85 M55 285H85 M175 385 345 335 M170 373 179 397 M340 325 350 348"
                />
              </g>
              <g fill="#cfec91" font-size="12">
                <text x="30" y="210" transform="rotate(-90 30 210)">120.00 ±0.10</text>
                <text x="225" y="383">80.00 ±0.05</text>
                <text x="20" y="30">DWG AX-204 / REV C</text>
                <text x="20" y="410">ILLUSTRATIVE GEOMETRY · NOT FOR MANUFACTURE</text>
              </g>
            </svg>
            <figcaption>Datum-led communication · sample technical diagram</figcaption>
          </figure>
        </section>
        <section id="capabilities" class="wrap section capability-section">
          <div class="section-heading">
            <h2>Know the envelope.</h2>
            <p>
              Illustrative capabilities for a fictional workshop. Actual limits depend on material,
              geometry, setup, and inspection requirements.
            </p>
          </div>
          <div class="capability-row" v-for="(row, i) in capabilities" :key="row[0]">
            <span>0{{ i + 1 }}</span>
            <h3>{{ row[0] }}</h3>
            <p>{{ row[1] }}</p>
            <p>{{ row[2] }}</p>
          </div>
          <div class="spec-notes">
            <div>
              <span>STANDARD TOLERANCE</span><strong>±0.10 mm</strong>
              <p>Unless otherwise agreed on drawing</p>
            </div>
            <div>
              <span>TYPICAL ORDER</span><strong>1–500 parts</strong>
              <p>Prototype through small-batch production</p>
            </div>
            <div>
              <span>INSPECTION</span><strong>To requirement</strong>
              <p>Critical dimensions identified at quotation</p>
            </div>
          </div>
        </section>
        <section class="axis-process wrap section">
          <p class="eyebrow">A CONTROLLED SEQUENCE</p>
          <div class="process-track">
            <div
              v-for="(item, i) in [
                'Review the drawing',
                'Agree the process',
                'Machine & inspect',
                'Document & dispatch',
              ]"
              :key="item"
            >
              <span>0{{ i + 1 }}</span>
              <h3>{{ item }}</h3>
            </div>
          </div>
          <button class="text-link" @click="go('process')">What each stage should record →</button>
        </section>
        <section class="rfq-strip">
          <div class="wrap row spread">
            <h2>A useful quote starts<br />with a useful specification.</h2>
            <button class="primary" @click="go('rfq')">Build an RFQ →</button>
          </div>
        </section></template
      >
      <section v-else class="wrap state-page">
        <button class="back text-link" @click="go('start')">← Capabilities index</button
        ><template v-if="state === 'process'"
          ><p class="eyebrow">PROCESS CONTROL / SAMPLE</p>
          <h1>Clear inputs.<br />Traceable decisions.</h1>
          <div
            class="process-record"
            v-for="(item, i) in [
              [
                'Drawing review',
                'Confirm revision, material, critical features, surface finish, and quantities. Record unresolved questions before quotation.',
              ],
              [
                'Manufacturing plan',
                'Agree setups, tooling, outsourced finishes, and any first-article approval. Identify what evidence is needed at handover.',
              ],
              [
                'Inspection & release',
                'Check the agreed characteristics, record exceptions, and link the inspection record to the part and drawing revision.',
              ],
            ]"
            :key="item[0]"
          >
            <span>0{{ i + 1 }}</span>
            <h2>{{ item[0] }}</h2>
            <p>{{ item[1] }}</p>
          </div>
          <button class="primary" @click="go('rfq')">
            Prepare your sample requirement →
          </button></template
        ><template v-else
          ><p class="eyebrow">REQUEST FOR QUOTATION / LOCAL DEMONSTRATION</p>
          <h1>Define the part.</h1>
          <div class="state-grid">
            <form class="form" v-if="!sent" @submit.prevent="sent = true">
              <label
                >Part name or reference<input
                  required
                  v-model="part"
                  placeholder="Mounting plate / AX-204"
              /></label>
              <div class="two">
                <label
                  >Process<select v-model="process">
                    <option>CNC milling</option>
                    <option>CNC turning</option>
                    <option>Advice needed</option>
                  </select></label
                ><label
                  >Material<select v-model="material">
                    <option>Aluminium 6061</option>
                    <option>Brass</option>
                    <option>Acetal</option>
                    <option>Material to confirm</option>
                  </select></label
                >
              </div>
              <div class="two">
                <label
                  >Quantity<input
                    type="number"
                    min="1"
                    max="10000"
                    required
                    v-model.number="quantity" /></label
                ><label
                  >Tolerance requirement<select v-model="tolerance">
                    <option>Standard ±0.10 mm</option>
                    <option>Critical dimensions on drawing</option>
                    <option>Discuss requirements</option>
                  </select></label
                >
              </div>
              <label
                >Critical details<textarea
                  required
                  v-model="notes"
                  placeholder="Finish, drawing revision, critical features, target date…"
                ></textarea>
              </label>
              <div class="two">
                <label>Contact name<input required v-model="name" /></label
                ><label>Business email<input required type="email" v-model="email" /></label>
              </div>
              <button class="primary">Review RFQ summary</button>
              <p class="muted">
                This sample does not upload drawings or send proprietary information.
              </p>
            </form>
            <div v-else class="confirmation" role="status">
              <h2>RFQ ready to review.</h2>
              <p>{{ part }} · {{ quantity }} pieces<br />{{ material }} · {{ process }}</p>
              <p>{{ notes }}</p>
              <p>No quotation request has been sent.</p>
              <button @click="sent = false">Edit requirements</button>
            </div>
            <aside class="rfq-summary">
              <p class="eyebrow">LIVE REQUIREMENT SUMMARY</p>
              <dl>
                <dt>Process</dt>
                <dd>{{ process }}</dd>
                <dt>Material</dt>
                <dd>{{ material }}</dd>
                <dt>Quantity</dt>
                <dd>{{ quantity }} pieces</dd>
                <dt>Inspection</dt>
                <dd>{{ tolerance }}</dd>
              </dl>
              <p>
                In a live system, drawings should travel through an authenticated upload with
                explicit revision control and access rules.
              </p>
              <span class="datum">⊕ AXIS / RFQ</span>
            </aside>
          </div></template
        >
      </section>
    </main>
    <footer class="sample-footer">
      <span>AXIS / Precision Works · Fictional design reference 60.</span
      ><span>Sample data and illustrative images. Interactions stay on this page.</span
      ><a :href="href('start')">Reset sample</a>
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'IBM Plex Mono';
  src: url('/fonts/ibm-plex-mono.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}
@font-face {
  font-family: 'DM Sans';
  src: url('/fonts/dm-sans.woff2') format('woff2');
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

.specimen {
  --surface: #293637;
  --line: #62706a;
}
button,
input,
select,
textarea {
  background: #293637;
  color: #eef3e8;
}
.primary {
  background: #cfec91;
  color: #202a2b;
  border-color: #cfec91;
}
.axis-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  padding-top: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid var(--line);
}
.axis-logo {
  font:
    700 40px/0.9 'DM Sans',
    sans-serif;
  letter-spacing: -0.08em;
  text-decoration: none;
  color: #cfec91;
}
.axis-logo span {
  display: block;
  font: 9px/1.6 'IBM Plex Mono';
  letter-spacing: 0.13em;
  margin-top: 8px;
}
.axis-header nav {
  font-size: 12px;
}
.axis-hero {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 55px;
  padding-top: 60px;
  padding-bottom: 65px;
}
.axis-hero h1 {
  font: 500 clamp(3rem, 5vw, 5rem)/1.03 'DM Sans';
  letter-spacing: -0.04em;
  margin: 25px 0;
}
.axis-hero h1 em {
  color: #cfec91;
  font-style: normal;
}
.axis-hero > div > p:not(.eyebrow) {
  max-width: 43ch;
  font-size: 15px;
}
.axis-hero .primary {
  margin-top: 30px;
}
.axis-data {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  margin-top: 45px;
  font-size: 10px;
  color: #c3cfbc;
}
.drawing {
  align-self: center;
  border: 1px solid var(--line);
  padding: 15px;
}
.drawing figcaption {
  font-size: 10px;
}
.capability-section {
  border-top: 1px solid var(--line);
}
.capability-section h2 {
  font: 40px 'DM Sans';
  letter-spacing: -0.03em;
}
.section-heading p {
  font-size: 13px;
}
.capability-row {
  display: grid;
  grid-template-columns: 35px 1fr 1.3fr 1.2fr;
  align-items: center;
  gap: 25px;
  padding: 24px 0;
  border-top: 1px solid var(--line);
}
.capability-row > span {
  font-size: 11px;
  color: #cfec91;
}
.capability-row h3 {
  font: 22px 'DM Sans';
}
.capability-row p {
  font-size: 12px;
  margin: 0;
}
.spec-notes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 35px;
  border: 1px solid var(--line);
  padding: 25px;
}
.spec-notes span {
  font-size: 10px;
  color: #cfec91;
}
.spec-notes strong {
  display: block;
  font: 26px 'DM Sans';
  margin: 14px 0;
}
.spec-notes p {
  font-size: 11px;
}
.axis-process {
  border-top: 1px solid var(--line);
}
.process-track {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 30px 0;
}
.process-track > div {
  border-top: 2px solid #cfec91;
  padding: 25px 25px 10px 0;
  position: relative;
}
.process-track > div:before {
  content: '';
  width: 8px;
  height: 8px;
  position: absolute;
  top: -5px;
  left: 0;
  background: #cfec91;
}
.process-track span {
  font-size: 11px;
  color: #cfec91;
}
.process-track h3 {
  font: 22px/1.4 'DM Sans';
  margin-top: 15px;
  max-width: 15ch;
}
.rfq-strip {
  background: #303e37;
  padding: 45px 0;
  border-top: 1px solid #cfec91;
}
.rfq-strip h2 {
  font: 35px/1.2 'DM Sans';
}
.rfq-summary {
  border: 1px solid #cfec91;
  padding: 30px;
}
.rfq-summary dt {
  color: #c4cfc1;
  margin-top: 25px;
}
.rfq-summary dd {
  font-size: 17px;
  margin-top: 6px;
}
.rfq-summary > p:last-of-type {
  font-size: 12px;
  margin-top: 30px;
}
.datum {
  display: block;
  margin-top: 35px;
  color: #cfec91;
  font-size: 18px;
}
.process-record {
  display: grid;
  grid-template-columns: 50px 1fr 1.3fr;
  gap: 40px;
  border-top: 1px solid var(--line);
  padding: 30px 0;
}
.process-record h2 {
  font: 28px 'DM Sans';
}
.process-record p {
  font-size: 14px;
}
.process-record span {
  color: #cfec91;
}
.confirmation {
  background: #293637;
}
.state-page > h1 {
  font-family: 'DM Sans';
  font-weight: 500;
}
@media (max-width: 760px) {
  .axis-header nav > a,
  .axis-header .text-link {
    display: none;
  }
  .axis-header .primary {
    font-size: 10px;
    padding: 10px;
  }
  .axis-logo {
    font-size: 32px;
  }
  .axis-hero {
    grid-template-columns: 1fr;
    gap: 30px;
    padding-top: 35px;
  }
  .axis-hero h1 {
    font-size: 3.3rem;
  }
  .axis-data {
    gap: 12px;
  }
  .capability-row {
    grid-template-columns: 25px 1fr;
    gap: 12px;
  }
  .capability-row p {
    grid-column: 2;
  }
  .spec-notes {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .spec-notes > div + div {
    border-top: 1px solid var(--line);
    padding-top: 20px;
  }
  .process-track {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .process-record {
    grid-template-columns: 30px 1fr;
    gap: 15px;
  }
  .process-record p {
    grid-column: 2;
  }
  .rfq-strip h2 {
    font-size: 27px;
  }
}
</style>
