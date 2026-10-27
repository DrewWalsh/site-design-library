<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useSpecimen } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const name = ref(''),
  email = ref(''),
  business = ref(''),
  area = ref('Year-end accounts'),
  stage = ref('Established business'),
  notes = ref(''),
  sent = ref(false);
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header class="case-header wrap">
      <a class="case-brand" :href="href('start')"
        >BELL &amp; ROWE<span>CHARTERED ACCOUNTANTS / FICTIONAL PRACTICE</span></a
      >
      <nav class="row">
        <a :href="href('start') + '#practice'">Practice areas</a
        ><button class="text-link" @click="go('case')">The casebook</button
        ><button class="primary" @click="go('consultation')">Arrange a conversation</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="authority-hero wrap">
          <aside>
            <p class="eyebrow">PRACTICE NOTE<br />NO. 001 / NOVEMBER 2026</p>
            <div class="seal" aria-hidden="true">B<span>&amp;</span>R</div>
            <p>Independent advice.<br />An organised view.<br />A human conversation.</p>
          </aside>
          <div>
            <p class="eyebrow">FOR THE PEOPLE BEHIND THE BUSINESS</p>
            <h1>Clarity for the<br />decisions ahead.</h1>
            <p class="lead">
              Accounting that connects the numbers to your next decision. We help owner-managed
              businesses understand where they stand—and what needs attention.
            </p>
            <button class="primary" @click="go('consultation')">
              Tell us about your business →
            </button>
            <div class="credentials">
              <span>Sample professional profile</span>
              <p>
                Qualifications, professional registration and practice details belong here, with
                verifiable links in a real implementation.
              </p>
            </div>
          </div>
        </section>
        <section id="practice" class="wrap practice section">
          <div class="margin-heading">
            <p class="eyebrow">01 / OUR PRACTICE</p>
            <h2>Considered work.<br />Clearly defined.</h2>
          </div>
          <div class="practice-list">
            <article
              v-for="(p, i) in [
                [
                  'Year-end accounts',
                  'A dependable record of the year, with a plain-language discussion of what it means.',
                ],
                [
                  'Business planning',
                  'Forecasts and scenarios that connect assumptions to practical choices.',
                ],
                [
                  'Tax administration',
                  'An organised calendar, clear responsibilities, and questions addressed early.',
                ],
              ]"
              :key="p[0]"
            >
              <span>0{{ i + 1 }}</span>
              <div>
                <h3>{{ p[0] }}</h3>
                <p>{{ p[1] }}</p>
              </div>
              <button
                :aria-label="'Discuss ' + p[0]"
                @click="
                  area = p[0];
                  go('consultation');
                "
              >
                ↗
              </button>
            </article>
          </div>
        </section>
        <section class="case-strip">
          <div class="wrap case-grid">
            <div>
              <p class="eyebrow">02 / FROM THE CASEBOOK</p>
              <h2>Behind every set<br />of accounts,<br />a working business.</h2>
            </div>
            <article>
              <p class="eyebrow">CASE 04 · INDEPENDENT MAKER</p>
              <h3>Making room for<br />a second workshop.</h3>
              <p>
                A fictional case showing how a cash-flow forecast can make the assumptions behind an
                expansion visible.
              </p>
              <dl>
                <div>
                  <dt>Situation</dt>
                  <dd>New premises</dd>
                </div>
                <div>
                  <dt>Work</dt>
                  <dd>Scenario planning</dd>
                </div>
                <div>
                  <dt>Outcome</dt>
                  <dd>A clearer decision</dd>
                </div>
              </dl>
              <button class="text-link" @click="go('case')">Read the case summary →</button>
            </article>
          </div>
        </section>
        <section class="wrap section authority-close">
          <h2>A useful first conversation.</h2>
          <div>
            <p>
              Bring your questions, a short description of your business, and the decision you’re
              facing. We’ll explain whether the practice is a good fit.
            </p>
            <button class="primary" @click="go('consultation')">
              Arrange a sample consultation →
            </button>
            <p class="muted">No advice is provided by this fictional reference.</p>
          </div>
        </section></template
      >
      <section v-else class="wrap state-page">
        <button class="back text-link" @click="go('start')">← Back to the practice</button
        ><template v-if="state === 'case'"
          ><p class="eyebrow">THE CASEBOOK / 04 / ILLUSTRATIVE SCENARIO</p>
          <h1>A second workshop.<br />A considered decision.</h1>
          <div class="case-article">
            <aside>
              <dl>
                <dt>Client type</dt>
                <dd>Independent maker</dd>
                <dt>Practice area</dt>
                <dd>Business planning</dd>
                <dt>Material</dt>
                <dd>Fictional case study</dd>
              </dl>
            </aside>
            <div>
              <h2>The question</h2>
              <p>
                A small furniture maker was considering a second workspace. A busy order book made
                the move feel possible, but the timing of deposits, materials, and rent was unclear.
              </p>
              <h2>The work</h2>
              <p>
                The example separates committed orders from enquiries, models a slower first
                quarter, and makes equipment and moving costs visible. Three scenarios share the
                same assumptions table.
              </p>
              <div class="case-callout">
                The useful output was a set of questions and thresholds—not a promise about future
                performance.
              </div>
              <h2>The decision</h2>
              <p>
                The maker could compare lease dates, understand the cash buffer each scenario
                required, and identify which assumptions needed evidence before committing.
              </p>
              <button class="primary" @click="go('consultation')">
                Discuss a similar question →
              </button>
            </div>
          </div></template
        ><template v-else
          ><p class="eyebrow">INITIAL CONSULTATION / CONFIDENTIAL IN A REAL PRACTICE</p>
          <h1>Start with the question.</h1>
          <p class="lead">
            Use fictional details to explore this sample intake. Documents and financial records are
            not needed.
          </p>
          <div class="state-grid">
            <form class="form" v-if="!sent" @submit.prevent="sent = true">
              <div class="two">
                <label>Your name<input required v-model="name" /></label
                ><label>Email<input required type="email" v-model="email" /></label>
              </div>
              <label>Business name<input required v-model="business" /></label
              ><label
                >Practice area<select v-model="area">
                  <option>Year-end accounts</option>
                  <option>Business planning</option>
                  <option>Tax administration</option>
                  <option>I’d like some guidance</option>
                </select></label
              >
              <fieldset>
                <legend>Business stage</legend>
                <label
                  v-for="item in ['Starting out', 'Established business', 'Planning a change']"
                  :key="item"
                  ><input type="radio" v-model="stage" :value="item" />{{ item }}</label
                >
              </fieldset>
              <label
                >What would you like to understand?<textarea
                  required
                  v-model="notes"
                ></textarea></label
              ><button class="primary">Review consultation request</button>
            </form>
            <div v-else role="status" class="confirmation">
              <h2>A clear starting point.</h2>
              <p>{{ business }} · {{ stage }}<br />{{ area }}</p>
              <p>{{ notes }}</p>
              <p>This summary stays in your browser. No consultation has been arranged.</p>
              <button @click="sent = false">Edit the request</button>
            </div>
            <aside class="intake-note">
              <p class="eyebrow">WHAT HAPPENS NEXT</p>
              <ol>
                <li>Check that the practice is the right fit.</li>
                <li>Agree a time and the questions to cover.</li>
                <li>Confirm scope, responsibilities, and fees before any work begins.</li>
              </ol>
              <p>
                In a live practice, this section should also explain privacy, conflicts checks, and
                how professional credentials can be verified.
              </p>
            </aside>
          </div></template
        >
      </section>
    </main>
    <footer class="sample-footer">
      <span>BELL & ROWE / Accountants · Fictional design reference 55.</span
      ><span>Sample data and illustrative images. Interactions stay on this page.</span
      ><a :href="href('start')">Reset sample</a>
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Libre Baskerville';
  src: url('/fonts/libre-baskerville.woff2') format('woff2');
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

.case-header {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
  padding-top: 34px;
  padding-bottom: 34px;
  border-bottom: 3px double var(--ink);
}
.case-brand {
  font: 24px var(--heading);
  text-decoration: none;
  letter-spacing: 0.025em;
}
.case-brand span {
  display: block;
  font: 9px/1.7 var(--body);
  letter-spacing: 0.12em;
  margin-top: 9px;
}
.case-header nav {
  font-size: 12px;
}
.authority-hero {
  display: grid;
  grid-template-columns: 230px 1fr;
  gap: 70px;
  padding-top: 65px;
  padding-bottom: 65px;
}
.authority-hero > aside {
  border-right: 1px solid var(--line);
  padding-right: 35px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 13px;
}
.authority-hero h1 {
  font-weight: 400;
  font-size: clamp(2.6rem, 4.9vw, 4.8rem);
  margin: 25px 0 30px;
}
.authority-hero .primary {
  margin: 30px 0;
}
.seal {
  height: 130px;
  width: 130px;
  border: 1px solid var(--ink);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font: 45px var(--heading);
}
.seal span {
  font-size: 25px;
  padding: 0 4px;
}
.credentials {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 20px;
  border-top: 1px solid var(--line);
  padding-top: 20px;
  font-size: 12px;
}
.credentials > span {
  font-weight: bold;
}
.practice {
  border-top: 1px solid var(--ink);
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 70px;
}
.margin-heading h2 {
  font-weight: 400;
  margin-top: 22px;
}
.practice-list article {
  display: flex;
  gap: 22px;
  align-items: start;
  padding: 25px 0;
  border-bottom: 1px solid var(--line);
}
.practice-list article:first-child {
  padding-top: 0;
}
.practice-list span {
  font: 12px 'IBM Plex Mono';
  padding-top: 8px;
}
.practice-list p {
  font-size: 14px;
  margin-top: 12px;
}
.practice-list button {
  margin-left: auto;
  flex-shrink: 0;
  background: transparent;
}
.case-strip {
  background: #293d54;
  color: #f6f0e4;
  padding: 65px 0;
}
.case-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 90px;
}
.case-grid h2 {
  font-weight: 400;
  margin-top: 25px;
  font-size: 37px;
}
.case-grid article {
  border-left: 1px solid #81909b;
  padding-left: 55px;
}
.case-grid h3 {
  font-size: 30px;
  font-weight: 400;
  margin: 20px 0;
}
.case-grid dl {
  display: flex;
  gap: 30px;
  margin: 30px 0;
}
.case-grid dt {
  color: #d1d7db;
}
.case-grid dd {
  font-size: 13px;
}
.case-grid button {
  color: inherit;
}
.authority-close {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
}
.authority-close h2 {
  font-weight: 400;
}
.authority-close .primary {
  margin: 25px 0 15px;
}
.case-article {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 60px;
  padding-top: 35px;
}
.case-article dt {
  margin-top: 20px;
}
.case-article h2 {
  font-size: 28px;
  font-weight: 400;
  margin: 30px 0 20px;
}
.case-article p {
  max-width: 62ch;
}
.case-callout {
  border-left: 3px solid var(--accent);
  padding: 30px;
  font: 23px/1.6 var(--heading);
  margin-top: 30px;
  background: #e5e3da;
}
.case-article button {
  margin-top: 30px;
}
.intake-note {
  border-top: 3px double var(--ink);
  padding-top: 25px;
}
.intake-note li {
  margin: 20px 0;
}
.intake-note p:last-child {
  font-size: 13px;
}
@media (max-width: 760px) {
  .case-header {
    align-items: start;
  }
  .case-brand {
    font-size: 18px;
  }
  .case-brand span {
    font-size: 8px;
    max-width: 155px;
  }
  .case-header nav > a,
  .case-header .text-link {
    display: none;
  }
  .case-header .primary {
    font-size: 11px;
    padding: 9px;
  }
  .authority-hero,
  .practice,
  .case-grid,
  .authority-close,
  .case-article {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .authority-hero {
    padding-top: 35px;
  }
  .authority-hero > aside {
    border: 0;
    padding: 0;
    display: block;
  }
  .authority-hero > aside .seal,
  .authority-hero > aside > p:last-child {
    display: none;
  }
  .credentials {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  .case-grid article {
    border-left: 0;
    border-top: 1px solid #81909b;
    padding: 30px 0 0;
  }
  .case-grid dl {
    flex-wrap: wrap;
  }
  .case-article aside dl {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .case-article dt {
    margin: 0;
  }
  .case-article dd {
    font-size: 12px;
  }
  .case-callout {
    font-size: 20px;
    padding: 20px;
  }
}

.eyebrow {
  font:
    italic 13px/1.6 Georgia,
    serif;
  letter-spacing: 0.025em;
  text-transform: none;
}
</style>
