<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useSpecimen } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const services = [
  { name: 'Oil & filter service', price: 89, time: '60 min', code: 'SV-01' },
  { name: 'Brake inspection', price: 45, time: '45 min', code: 'BR-02' },
  { name: 'Tyre rotation', price: 35, time: '30 min', code: 'TY-03' },
];
const chosen = ref(0),
  vehicle = ref('Hatchback / sedan'),
  year = ref('2020'),
  make = ref(''),
  name = ref(''),
  email = ref(''),
  date = ref('Thursday 12 Nov · 09:00'),
  sent = ref(false);
const total = computed(
  () => services[chosen.value].price + (vehicle.value === 'SUV / van' ? 20 : 0),
);
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header class="bay-header">
      <div class="wrap row spread">
        <a :href="href('start')" class="bay-logo">BAY<span>04</span></a
        ><span class="eyebrow">INDEPENDENT AUTO WORKSHOP<br />NORTHBANK / MON–FRI 8–6</span
        ><button class="primary" @click="go('booking')">Open a job ticket ↗</button>
      </div>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="bay-hero">
          <figure>
            <img
              class="photo"
              src="https://drew-site-design-library.t3.tigrisfiles.io/assets/commercial/ee185b3bd9e9c829-mechanic.webp"
              alt="Mechanic working beneath a raised car in an equipped service bay"
            />
            <figcaption>Real work and equipment · illustrative workshop photograph</figcaption>
          </figure>
          <div class="hero-ticket">
            <p class="eyebrow">WORKSHOP NOTE / 001</p>
            <h1>Know what’s<br />going on<br />underneath.</h1>
            <p>Clear checks. An explained estimate. Your approval before extra work.</p>
            <button class="primary" @click="go('booking')">Tell us about your vehicle →</button>
            <div class="ticket-bottom">
              <b>NO MYSTERY WORK.</b><span>Sample workshop / fictional prices</span>
            </div>
          </div>
        </section>
        <section class="wrap section">
          <div class="section-heading">
            <div>
              <p class="eyebrow">COMMON JOBS / STARTING PRICES</p>
              <h2>Choose the work.<br />See the starting point.</h2>
            </div>
            <p>
              Prices below are sample estimates for a standard car. Parts, vehicle details, and
              further findings are confirmed before work starts.
            </p>
          </div>
          <div class="job-list">
            <article v-for="(job, i) in services" :key="job.code">
              <span class="job-code">{{ job.code }}</span>
              <div>
                <h3>{{ job.name }}</h3>
                <p>{{ job.time }} · standard passenger car</p>
              </div>
              <b>from &#36;{{ job.price }}</b
              ><button
                @click="
                  chosen = i;
                  go('estimate');
                "
                :aria-label="'Estimate ' + job.name"
              >
                See job details ↗
              </button>
            </article>
          </div>
        </section>
        <section class="approval-strip">
          <div class="wrap three">
            <div>
              <span>01 / CHECK</span>
              <h3>Understand the issue.</h3>
              <p>We record what you’ve noticed and the work you requested.</p>
            </div>
            <div>
              <span>02 / EXPLAIN</span>
              <h3>Agree before we start.</h3>
              <p>You see the scope, the estimate, and any decisions needed.</p>
            </div>
            <div>
              <span>03 / RECORD</span>
              <h3>Leave with the detail.</h3>
              <p>A clear record of completed work and anything to keep an eye on.</p>
            </div>
          </div>
        </section>
        <section class="wrap section workshop-details">
          <h2>A workshop<br />with the door open.</h2>
          <div>
            <p>Unit 4, Foundry Road · Northbank<br />Drop-off Monday–Friday, 08:00–09:30</p>
            <p>
              Tell us if you need to wait with the vehicle. The sample schedule shows capacity
              rather than a promise of same-day repair.
            </p>
            <button class="primary" @click="go('booking')">Prepare a sample job ticket →</button>
          </div>
        </section></template
      >
      <section v-else class="wrap state-page">
        <button class="back text-link" @click="go('start')">← Workshop services</button>
        <p class="eyebrow">JOB TICKET / SAMPLE 0048</p>
        <h1>{{ state === 'estimate' ? 'The work, explained.' : 'Let’s get the details.' }}</h1>
        <div class="job-intake">
          <form v-if="!sent" class="form" @submit.prevent="sent = true">
            <label
              >Requested service<select v-model.number="chosen">
                <option v-for="(job, i) in services" :key="job.code" :value="i">
                  {{ job.name }}
                </option>
              </select></label
            >
            <div class="two">
              <label
                >Vehicle type<select v-model="vehicle">
                  <option>Hatchback / sedan</option>
                  <option>SUV / van</option>
                </select></label
              ><label
                >Model year<input type="number" min="1980" max="2027" required v-model="year"
              /></label>
            </div>
            <label
              >Make and model<input
                required
                v-model="make"
                placeholder="For example: 2020 Civic" /></label
            ><label
              >Preferred drop-off<select v-model="date">
                <option>Thursday 12 Nov · 09:00</option>
                <option>Friday 13 Nov · 08:30</option>
                <option>Monday 16 Nov · 09:00</option>
              </select></label
            >
            <div class="two">
              <label>Your name<input required v-model="name" /></label
              ><label>Email<input type="email" required v-model="email" /></label>
            </div>
            <button class="primary">Review sample intake</button>
          </form>
          <div v-else role="status" class="confirmation">
            <h2>Ticket prepared.</h2>
            <p>{{ name }} · {{ year }} {{ make }}<br />{{ services[chosen].name }} · {{ date }}</p>
            <p>
              Sample estimate &#36;{{ total }}. No appointment has been reserved and no work has
              been authorised.
            </p>
            <button @click="sent = false">Edit vehicle details</button>
          </div>
          <aside class="estimate-ticket">
            <div class="row spread">
              <b>BAY 04</b><span>{{ services[chosen].code }}</span>
            </div>
            <h2>{{ services[chosen].name }}</h2>
            <dl>
              <div>
                <dt>Base service</dt>
                <dd>&#36;{{ services[chosen].price }}</dd>
              </div>
              <div>
                <dt>Vehicle allowance</dt>
                <dd>&#36;{{ total - services[chosen].price }}</dd>
              </div>
              <div class="total">
                <dt>Sample estimate</dt>
                <dd>&#36;{{ total }}</dd>
              </div>
            </dl>
            <p>
              Includes the listed service only. Additional repairs or parts are quoted separately.
              Sample prices exclude applicable tax.
            </p>
            <span class="stamp">APPROVAL<br />BEFORE EXTRA WORK</span>
          </aside>
        </div>
      </section>
    </main>
    <footer class="sample-footer">
      <span>BAY 04 / Auto workshop · Fictional design reference 58.</span
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

.bay-header {
  background: #282d2c;
  color: #f3f0e6;
  padding: 20px 0;
}
.bay-logo {
  font: 700 42px/1 var(--heading);
  text-decoration: none;
  letter-spacing: -0.06em;
}
.bay-logo span {
  border: 1px solid #d6a889;
  padding: 1px 9px;
  margin-left: 9px;
  color: #efae7d;
}
.bay-header .primary {
  background: #e5a16b;
  color: #282d2c;
  border-color: #e5a16b;
  font-size: 13px;
}
.bay-hero {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  max-width: 1440px;
  margin: auto;
}
.bay-hero figure {
  position: relative;
}
.bay-hero img {
  height: 580px;
  object-position: 45% center;
}
.bay-hero figcaption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #282d2c;
  color: #fff;
  padding: 8px 20px;
  font-size: 11px;
}
.hero-ticket {
  padding: 45px;
  background: #e7b185;
}
.hero-ticket h1 {
  font-size: clamp(3.2rem, 4.6vw, 4.8rem);
  margin: 25px 0;
}
.hero-ticket > p:not(.eyebrow) {
  max-width: 34ch;
  font-size: 18px;
}
.hero-ticket .primary {
  margin: 30px 0;
}
.ticket-bottom {
  display: grid;
  gap: 8px;
  border-top: 1px dashed var(--ink);
  padding-top: 20px;
  font-size: 12px;
}
.job-list {
  border-top: 2px solid var(--ink);
}
.job-list article {
  display: grid;
  grid-template-columns: 80px 1fr 120px 165px;
  gap: 25px;
  align-items: center;
  padding: 25px 0;
  border-bottom: 1px solid var(--line);
}
.job-code {
  font: 13px 'IBM Plex Mono';
  border: 1px solid var(--line);
  padding: 10px;
  text-align: center;
}
.job-list h3 {
  font-size: 24px;
}
.job-list p {
  font-size: 13px;
  margin-top: 7px;
}
.job-list b {
  font: 18px 'IBM Plex Mono';
}
.job-list button {
  font-size: 12px;
  background: transparent;
}
.approval-strip {
  background: #dcded5;
  padding: 45px 0;
  border-top: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
}
.approval-strip span {
  font: 11px 'IBM Plex Mono';
}
.approval-strip h3 {
  margin: 20px 0 15px;
}
.approval-strip p {
  font-size: 14px;
}
.workshop-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
}
.workshop-details button {
  margin-top: 25px;
}
.job-intake {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 70px;
}
.estimate-ticket {
  background: #fbf6e7;
  padding: 30px;
  border: 1px solid var(--ink);
  border-top: 8px solid var(--accent);
}
.estimate-ticket h2 {
  font-size: 30px;
  margin: 25px 0;
}
.estimate-ticket dl > div {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px dashed var(--ink);
}
.estimate-ticket .total {
  border-top: 2px solid var(--ink);
  margin-top: 15px;
  font: 24px 'IBM Plex Mono';
}
.estimate-ticket > p {
  font-size: 13px;
  margin-top: 25px;
}
.stamp {
  display: inline-block;
  transform: rotate(-7deg);
  border: 2px solid var(--accent);
  padding: 12px 20px;
  color: var(--accent);
  font: 13px/1.3 'IBM Plex Mono';
  margin-top: 35px;
}
@media (max-width: 760px) {
  .bay-header .eyebrow {
    display: none;
  }
  .bay-header .primary {
    font-size: 11px;
    padding: 10px;
  }
  .bay-logo {
    font-size: 34px;
  }
  .bay-hero {
    grid-template-columns: 1fr;
  }
  .bay-hero figure {
    order: 2;
  }
  .bay-hero img {
    height: 300px;
  }
  .hero-ticket {
    padding: 32px 22px;
  }
  .hero-ticket h1 {
    font-size: 3.6rem;
  }
  .job-list article {
    grid-template-columns: 55px 1fr;
    gap: 15px;
  }
  .job-list h3 {
    font-size: 21px;
  }
  .job-list b {
    grid-column: 2;
    font-size: 16px;
  }
  .job-list button {
    grid-column: 1/-1;
  }
  .job-code {
    padding: 7px;
    font-size: 10px;
  }
  .workshop-details,
  .job-intake {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>
