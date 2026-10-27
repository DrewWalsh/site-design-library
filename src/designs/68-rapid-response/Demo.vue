<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useSpecimen } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const urgency = ref('Urgent'),
  area = ref(''),
  checked = ref(false),
  issue = ref('Locked out'),
  name = ref(''),
  phone = ref(''),
  sent = ref(false);
const covered = computed(() =>
  ['NORTHBANK', 'ALDER', 'NB1', 'NB2', 'AL1'].some((x) =>
    area.value.toUpperCase().trim().startsWith(x),
  ),
);
watch(area, () => {
  checked.value = false;
  sent.value = false;
});
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header class="now-header wrap">
      <a :href="href('start')" class="now-logo">NOW<span>HOME REPAIRS / SAMPLE SERVICE</span></a
      ><a class="phone-small" href="tel:+12025550168">202 555 0168 ↗</a>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="dispatch wrap">
          <div class="dispatch-heading">
            <p class="eyebrow">When it can’t wait until next week.</p>
            <h1>Something needs<br />sorting.<br /><span>Let’s start here.</span></h1>
            <p>
              Lockouts, leaks, and urgent repairs.<br />Clear coverage. A real conversation before a
              call-out.
            </p>
            <div class="dispatch-hours">
              <span class="status-dot"></span>
              <div>
                <strong>Sample dispatch desk</strong>
                <p>Daily · 07:00–23:00<br />Fictional service and availability</p>
              </div>
            </div>
          </div>
          <div class="help-card">
            <p class="eyebrow">What kind of help do you need?</p>
            <button
              class="urgent-choice"
              @click="
                urgency = 'Urgent';
                go('help');
              "
            >
              <span>01</span>
              <div>
                <h2>I need help soon.</h2>
                <p>Something is happening now.</p>
              </div>
              <b>→</b></button
            ><button
              class="routine-choice"
              @click="
                urgency = 'Routine';
                go('help');
              "
            >
              <span>02</span>
              <div>
                <h2>I can plan a visit.</h2>
                <p>A repair for another day.</p>
              </div>
              <b>→</b>
            </button>
            <div class="call-direct">
              <span>Prefer to speak to someone?</span><a href="tel:+12025550168">202 555 0168 ↗</a
              ><small>Fictional demonstration number</small>
            </div>
          </div>
        </section>
        <section class="coverage-board wrap">
          <div>
            <h2>Know the area.<br />Know the next step.</h2>
            <p>Northbank · Alder · NB1 · NB2 · AL1</p>
          </div>
          <div class="three">
            <article>
              <span>01</span>
              <h3>Check coverage</h3>
              <p>We confirm whether the sample team covers your area.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Explain the job</h3>
              <p>Tell the team what needs attention and how to reach you.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Agree the visit</h3>
              <p>
                A live team would confirm availability, call-out fee, and scope before dispatch.
              </p>
            </article>
          </div>
        </section>
        <section class="wrap section urgent-facts">
          <h2>Clear information.<br />Before anyone sets off.</h2>
          <div>
            <dl>
              <div>
                <dt>Sample call-out</dt>
                <dd>From &#36;65, explained before a visit</dd>
              </div>
              <div>
                <dt>Extra work</dt>
                <dd>Quoted and agreed separately</dd>
              </div>
              <div>
                <dt>Arrival time</dt>
                <dd>Confirmed by the dispatch team</dd>
              </div>
            </dl>
            <p>
              This example is for repair requests. It does not provide emergency response or safety
              instructions.
            </p>
          </div>
        </section></template
      >
      <section v-else class="wrap state-page response-page">
        <button class="back text-link" @click="go('start')">← Choose urgent or routine</button
        ><span class="request-kind">{{ urgency }} request</span>
        <h1>{{ state === 'help' ? 'First, where are you?' : 'Tell us the essentials.' }}</h1>
        <div class="response-layout">
          <div>
            <form class="form area-form" @submit.prevent="checked = true">
              <label
                >Area or postcode<input
                  required
                  v-model="area"
                  placeholder="Northbank or NB1" /></label
              ><button class="primary">Check sample coverage</button>
              <p v-if="checked" :role="covered ? 'status' : 'alert'">
                {{
                  covered
                    ? 'This area is covered by the sample team.'
                    : 'This area is outside the sample service area. No request can be made here.'
                }}
              </p>
            </form>
            <button
              v-if="state === 'help' && checked && covered"
              class="primary continue-request"
              @click="go('request')"
            >
              Continue with {{ urgency.toLowerCase() }} request →
            </button>
            <form
              class="form request-form"
              v-if="state === 'request' && checked && covered && !sent"
              @submit.prevent="sent = true"
            >
              <label
                >What needs attention?<select v-model="issue">
                  <option>Locked out</option>
                  <option>Plumbing repair</option>
                  <option>Water damage assessment</option>
                  <option>Routine repair</option>
                </select></label
              ><label>Your name<input required v-model="name" /></label
              ><label
                >Callback number<input
                  required
                  type="tel"
                  v-model="phone"
                  placeholder="Use a fictional number" /></label
              ><button class="primary">Review callback request</button>
            </form>
            <div v-if="sent" class="confirmation request-form" role="status">
              <h2>Request prepared.</h2>
              <p>{{ urgency }} · {{ issue }} · {{ area }}<br />Callback: {{ phone }}</p>
              <p>
                No request was sent and nobody has been dispatched. This is a sample review of the
                information a repair team needs.
              </p>
            </div>
            <p v-if="state === 'request' && !checked" class="muted">
              Check the area above before entering contact details.
            </p>
          </div>
          <aside class="response-rail">
            <h2>Prefer a call?</h2>
            <a href="tel:+12025550168">202 555 0168 ↗</a>
            <p>Fictional number.<br />Sample desk: daily 07:00–23:00.</p>
            <hr />
            <h3>Before a real call-out</h3>
            <ul>
              <li>Confirm the service area.</li>
              <li>Ask for the fee and what it includes.</li>
              <li>Agree the expected arrival window.</li>
            </ul>
          </aside>
        </div>
      </section>
    </main>
    <footer class="sample-footer">
      <span>NOW / Home repairs · Fictional design reference 68.</span
      ><span>Sample data and illustrative images. Interactions stay on this page.</span
      ><a :href="href('start')">Reset sample</a>
    </footer>
  </div>
</template>
<style scoped>
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

.now-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  padding-top: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid var(--ink);
}
.now-logo {
  font: 800 45px/0.8 var(--body);
  letter-spacing: -0.07em;
  text-decoration: none;
}
.now-logo span {
  display: block;
  font: 8px/1.5 var(--body);
  letter-spacing: 0.07em;
  margin-top: 12px;
}
.phone-small {
  font-size: 17px;
  font-weight: 700;
  text-decoration: none;
}
.dispatch {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 65px;
  padding-top: 60px;
  padding-bottom: 60px;
}
.dispatch-heading h1 {
  font-size: clamp(3rem, 5vw, 5rem);
  margin: 23px 0 30px;
  line-height: 1.07;
}
.dispatch-heading h1 span {
  font-weight: 400;
}
.dispatch-heading > p:not(.eyebrow) {
  font-size: 18px;
}
.dispatch-hours {
  display: flex;
  gap: 13px;
  margin-top: 35px;
  font-size: 13px;
}
.dispatch-hours p {
  font-size: 12px;
  margin-top: 5px;
}
.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #437b47;
  margin-top: 7px;
}
.help-card {
  background: #233448;
  color: #fff;
  padding: 30px;
  align-self: start;
}
.help-card > .eyebrow {
  margin-bottom: 20px;
}
.help-card > button {
  display: flex;
  align-items: center;
  gap: 18px;
  text-align: left;
  width: 100%;
  padding: 25px 20px;
  margin-bottom: 15px;
}
.help-card .urgent-choice {
  background: #ffcf58;
  color: #233448;
  border: 0;
}
.routine-choice {
  background: #34485e;
  color: #fff;
  border: 1px solid #8493a3;
}
.help-card > button > span {
  font-size: 12px;
}
.help-card > button > div {
  flex: 1;
}
.help-card h2 {
  font: 700 25px/1.2 var(--body);
  letter-spacing: -0.03em;
}
.help-card button p {
  font-size: 13px;
  font-weight: 400;
  margin-top: 9px;
}
.help-card button b {
  font-size: 25px;
}
.call-direct {
  border-top: 1px solid #778493;
  margin-top: 25px;
  padding-top: 22px;
}
.call-direct > span {
  font-size: 12px;
}
.call-direct a {
  display: block;
  font-size: 29px;
  font-weight: 700;
  text-decoration: none;
  margin-top: 10px;
}
.call-direct small {
  font-size: 10px;
}
.coverage-board {
  border-top: 3px solid var(--ink);
  border-bottom: 1px solid var(--ink);
  padding-top: 35px;
  padding-bottom: 35px;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 60px;
}
.coverage-board h2 {
  font-size: 28px;
}
.coverage-board > div > p {
  font-size: 13px;
  margin-top: 20px;
}
.coverage-board .three {
  gap: 25px;
}
.coverage-board article > span {
  font-size: 12px;
}
.coverage-board h3 {
  font-size: 18px;
  margin: 15px 0;
}
.coverage-board article p {
  font-size: 12px;
}
.urgent-facts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 65px;
}
.urgent-facts h2 {
  font-size: 33px;
}
.urgent-facts dl > div {
  padding: 15px 0;
  border-bottom: 1px solid var(--line);
}
.urgent-facts dd {
  font-size: 14px;
  margin-top: 5px;
}
.urgent-facts > div > p {
  font-size: 12px;
  margin-top: 25px;
}
.request-kind {
  display: inline-block;
  background: #ffcf58;
  padding: 5px 12px;
  font-size: 12px;
  margin-bottom: 20px;
}
.response-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 65px;
  margin-top: 35px;
}
.response-rail {
  background: #233448;
  color: white;
  padding: 30px;
}
.response-rail h2 {
  font-size: 28px;
}
.response-rail > a {
  display: block;
  font-size: 26px;
  text-decoration: none;
  font-weight: 700;
  margin: 22px 0;
}
.response-rail p,
.response-rail li {
  font-size: 13px;
}
.response-rail hr {
  margin: 30px 0;
  border: 0;
  border-top: 1px solid #8999a8;
}
.response-rail h3 {
  font-size: 19px;
}
.response-rail li {
  padding: 7px 0;
}
.primary {
  background: #233448;
  color: #fff;
  border-color: #233448;
}
.continue-request,
.request-form {
  margin-top: 30px;
}
@media (max-width: 760px) {
  .now-header {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .now-logo {
    font-size: 35px;
  }
  .now-logo span {
    font-size: 7px;
    max-width: 140px;
  }
  .phone-small {
    font-size: 14px;
  }
  .dispatch {
    grid-template-columns: 1fr;
    gap: 25px;
    padding-top: 30px;
  }
  .dispatch-heading h1 {
    font-size: 2.8rem;
    margin: 18px 0 20px;
  }
  .dispatch-heading > p:not(.eyebrow) {
    font-size: 16px;
  }
  .dispatch-hours {
    margin-top: 23px;
  }
  .help-card {
    padding: 22px;
  }
  .help-card > button {
    padding: 23px 15px;
    gap: 12px;
  }
  .help-card h2 {
    font-size: 22px;
  }
  .call-direct a {
    font-size: 27px;
  }
  .coverage-board,
  .urgent-facts,
  .response-layout {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .coverage-board .three {
    grid-template-columns: 1fr;
  }
  .coverage-board article {
    border-top: 1px solid var(--line);
    padding-top: 15px;
  }
  .coverage-board article h3 {
    display: inline-block;
    margin: 0 0 8px 15px;
  }
  .coverage-board article p {
    font-size: 14px;
  }
  .response-rail > a {
    font-size: 25px;
  }
}

.eyebrow {
  font: 500 13px/1.5 var(--body);
  letter-spacing: 0;
  text-transform: none;
}
</style>
