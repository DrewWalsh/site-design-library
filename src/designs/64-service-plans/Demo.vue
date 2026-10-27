<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useSpecimen } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const frequency = ref('Fortnightly'),
  home = ref('2 bedrooms'),
  plan = ref(1),
  postcode = ref(''),
  checked = ref(false),
  name = ref(''),
  email = ref(''),
  day = ref('Tuesday morning'),
  sent = ref(false);
const plans = [
  {
    name: 'Essential',
    base: 65,
    desc: 'A reliable reset for the everyday.',
    items: ['Kitchen surfaces & sink', 'Bathrooms refreshed', 'Floors vacuumed & mopped'],
  },
  {
    name: 'Complete',
    base: 95,
    desc: 'More time for the places that need it.',
    items: [
      'Everything in Essential',
      'Dusting & detailed surfaces',
      'Bed linen changed if provided',
    ],
  },
  {
    name: 'Deep reset',
    base: 160,
    desc: 'An occasional, more thorough visit.',
    items: ['Everything in Complete', 'Inside empty cupboards', 'Detail work agreed in advance'],
  },
];
const price = computed(
  () =>
    Math.round(plans[plan.value].base + (home.value === '3+ bedrooms' ? 25 : 0)) *
    (frequency.value === 'Weekly' ? 0.9 : 1),
);
const covered = computed(() =>
  /^(NB1|NB2|AL1)/.test(postcode.value.toUpperCase().replaceAll(' ', '')),
);
watch(postcode, () => {
  checked.value = false;
  sent.value = false;
});
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header class="tidy-header wrap">
      <a :href="href('start')" class="tidy-logo">tidy<span>home care, on a rhythm.</span></a>
      <nav class="row">
        <a :href="href('start') + '#plans'">Plans &amp; prices</a
        ><button class="text-link" @click="go('plan')">Check your area</button
        ><button class="primary" @click="go('booking')">Find your routine</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="tidy-intro wrap">
          <span class="tidy-mark" aria-hidden="true">✳</span>
          <p class="eyebrow">Less on your list.</p>
          <h1>A little help.<br />A better rhythm.</h1>
          <p class="lead">
            Clear plans for the work that keeps coming around. Choose what you need, how often, and
            the day that fits your home.
          </p>
        </section>
        <section id="plans" class="wrap plan-board">
          <div class="frequency">
            <span>How often?</span
            ><button
              v-for="f in ['Weekly', 'Fortnightly', 'One-off']"
              :key="f"
              :aria-pressed="frequency === f"
              @click="frequency = f"
            >
              {{ f }}</button
            ><label
              >Home size<select v-model="home">
                <option>2 bedrooms</option>
                <option>3+ bedrooms</option>
              </select></label
            >
          </div>
          <div class="plans">
            <article v-for="(p, i) in plans" :key="p.name" :class="{ recommended: i === 1 }">
              <span class="plan-label">{{
                i === 1 ? 'A LITTLE MORE TAKEN CARE OF' : 'YOUR CHOICE / 0' + (i + 1)
              }}</span>
              <h2>{{ p.name }}</h2>
              <p>{{ p.desc }}</p>
              <strong
                >&#36;{{
                  (
                    (p.base + (home === '3+ bedrooms' ? 25 : 0)) *
                    (frequency === 'Weekly' ? 0.9 : 1)
                  ).toFixed(2)
                }}<small>per visit</small></strong
              >
              <ul>
                <li v-for="item in p.items" :key="item">✓ {{ item }}</li>
              </ul>
              <button
                :class="{ primary: i === 1 }"
                @click="
                  plan = i;
                  go('plan');
                "
              >
                Choose {{ p.name }} →
              </button>
            </article>
          </div>
          <p class="price-note">
            Sample pricing for comparison. Weekly visits show a 10% sample discount. Supplies
            included; taxes excluded. Scope is confirmed before a real booking.
          </p>
        </section>
        <section class="wrap section tidy-how">
          <h2>A straightforward<br />way to get started.</h2>
          <div>
            <article
              v-for="(item, i) in [
                ['Check your area', 'Our sample routes serve NB1, NB2, and AL1.'],
                ['Agree the useful detail', 'Choose a plan, frequency, and preferred window.'],
                [
                  'Keep the rhythm flexible',
                  'A real provider should explain rescheduling, access, and cancellation clearly.',
                ],
              ]"
              :key="item[0]"
            >
              <span>0{{ i + 1 }}</span>
              <div>
                <h3>{{ item[0] }}</h3>
                <p>{{ item[1] }}</p>
              </div>
            </article>
          </div>
        </section>
        <section class="coverage-band">
          <div class="wrap two">
            <h2>Good service<br />starts locally.</h2>
            <div>
              <p>
                Routes stay close to home so the schedule can stay sensible. Check a sample postcode
                to see how coverage should be explained.
              </p>
              <button class="primary" @click="go('plan')">Check coverage →</button>
            </div>
          </div>
        </section></template
      >
      <section v-else class="wrap state-page">
        <button class="back text-link" @click="go('start')">← Compare the plans</button>
        <h1>{{ state === 'plan' ? 'Let’s check your area.' : 'Make it a regular thing.' }}</h1>
        <div class="state-grid">
          <div>
            <form class="coverage-check form" @submit.prevent="checked = true">
              <label
                >Postcode<input
                  required
                  v-model="postcode"
                  placeholder="Try NB1 2AB"
                  autocomplete="postal-code" /></label
              ><button class="primary">Check sample coverage</button>
              <p v-if="checked" :role="covered ? 'status' : 'alert'">
                {{
                  covered
                    ? 'You’re in the sample service area. Choose your preferred routine below.'
                    : 'This postcode is outside the sample area. Try NB1, NB2, or AL1; no booking can be made here.'
                }}
              </p>
            </form>
            <form
              v-if="checked && covered && !sent"
              class="form booking-fields"
              @submit.prevent="sent = true"
            >
              <div class="two">
                <label
                  >Plan<select v-model.number="plan">
                    <option v-for="(p, i) in plans" :key="p.name" :value="i">{{ p.name }}</option>
                  </select></label
                ><label
                  >Frequency<select v-model="frequency">
                    <option>Weekly</option>
                    <option>Fortnightly</option>
                    <option>One-off</option>
                  </select></label
                >
              </div>
              <label
                >Preferred window<select v-model="day">
                  <option>Tuesday morning</option>
                  <option>Thursday afternoon</option>
                  <option>Friday morning</option>
                </select></label
              >
              <div class="two">
                <label>Name<input required v-model="name" /></label
                ><label>Email<input required type="email" v-model="email" /></label>
              </div>
              <button class="primary">Review sample recurring booking</button>
            </form>
            <div v-if="sent" class="confirmation booking-fields" role="status">
              <h2>A routine taking shape.</h2>
              <p>
                {{ plans[plan].name }} · {{ frequency }} · {{ day }}<br />&#36;{{
                  price.toFixed(2)
                }}
                per visit · {{ postcode.toUpperCase() }}
              </p>
              <p>
                No visit has been scheduled. A real service would confirm access, scope, dates, and
                payment terms.
              </p>
            </div>
          </div>
          <aside class="tidy-summary">
            <span class="eyebrow">Your routine</span>
            <h2>{{ plans[plan].name }}</h2>
            <p>{{ home }} · {{ frequency }}</p>
            <strong>&#36;{{ price.toFixed(2) }}<small>per sample visit</small></strong>
            <ul>
              <li v-for="item in plans[plan].items" :key="item">{{ item }}</li>
            </ul>
            <p>
              Not included: specialist cleaning, exterior windows, or work at height. Agree any
              extra tasks before a visit.
            </p>
          </aside>
        </div>
      </section>
    </main>
    <footer class="sample-footer">
      <span>Tidy / Home care · Fictional design reference 64.</span
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

.tidy-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  padding-top: 28px;
  padding-bottom: 28px;
}
.tidy-logo {
  font: 700 55px/0.8 var(--body);
  letter-spacing: -0.08em;
  text-decoration: none;
}
.tidy-logo span {
  display: block;
  font: 11px/1.6 var(--body);
  letter-spacing: 0;
  margin-top: 12px;
}
.tidy-header nav {
  font-size: 13px;
}
.tidy-header .primary {
  border-radius: 6px;
}
.tidy-intro {
  text-align: center;
  position: relative;
  padding-top: 45px;
  padding-bottom: 45px;
}
.tidy-intro h1 {
  font-size: clamp(3rem, 5vw, 5rem);
  font-weight: 500;
  line-height: 1.05;
  margin: 20px 0 25px;
}
.tidy-intro .lead {
  margin: auto;
}
.tidy-mark {
  position: absolute;
  left: 90px;
  top: 100px;
  font-size: 90px;
  color: #608b65;
  transform: rotate(-15deg);
}
.plan-board {
  padding-bottom: 45px;
}
.frequency {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 35px;
}
.frequency > span {
  font-size: 13px;
  margin-right: 8px;
}
.frequency button {
  font-size: 13px;
  border-radius: 30px;
  padding: 9px 19px;
  background: transparent;
}
.frequency button[aria-pressed='true'] {
  background: var(--accent);
  color: white;
  outline: 0;
}
.frequency label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  margin-left: 20px;
}
.frequency select {
  font-size: 13px;
}
.plans {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}
.plans article {
  border: 1px solid #a9bfb1;
  border-radius: 10px;
  padding: 30px;
  display: flex;
  flex-direction: column;
}
.plans article.recommended {
  background: #dfeddf;
  border: 2px solid var(--accent);
}
.plan-label {
  font-size: 9px;
  letter-spacing: 0.1em;
  min-height: 27px;
}
.plans h2 {
  font-size: 31px;
  font-weight: 500;
}
.plans p {
  font-size: 14px;
  margin-top: 15px;
}
.plans strong {
  font-size: 43px;
  font-weight: 500;
  margin-top: 25px;
  letter-spacing: -0.04em;
}
.plans small {
  display: block;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
}
.plans ul {
  list-style: none;
  padding: 20px 0;
  margin: 20px 0;
  border-top: 1px solid var(--line);
  flex: 1;
}
.plans li {
  font-size: 13px;
  margin-bottom: 12px;
}
.plans button {
  width: 100%;
  border-radius: 6px;
  font-size: 13px;
}
.price-note {
  font-size: 12px;
  margin: 22px auto 0;
  max-width: 80ch;
  text-align: center;
}
.tidy-how {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 70px;
  border-top: 1px solid var(--line);
}
.tidy-how h2 {
  font-weight: 500;
}
.tidy-how article {
  display: flex;
  gap: 25px;
  padding: 20px 0;
  border-bottom: 1px solid var(--line);
}
.tidy-how article:first-child {
  padding-top: 0;
}
.tidy-how span {
  font-size: 13px;
  background: #d8e6d5;
  border-radius: 50%;
  display: grid;
  place-items: center;
  flex: 0 0 35px;
  height: 35px;
}
.tidy-how p {
  font-size: 14px;
  margin-top: 12px;
}
.coverage-band {
  padding: 55px 0;
  background: #dfe9d9;
}
.coverage-band h2 {
  font-weight: 500;
}
.coverage-band button {
  margin-top: 25px;
}
.tidy-summary {
  padding: 35px;
  border: 1px solid #a9bfb1;
  border-radius: 10px;
  background: #dfeddf;
}
.tidy-summary h2 {
  font-size: 35px;
  margin: 20px 0 10px;
  font-weight: 500;
}
.tidy-summary strong {
  display: block;
  font-size: 43px;
  margin: 25px 0;
}
.tidy-summary small {
  font-size: 12px;
  display: block;
  font-weight: 400;
}
.tidy-summary ul {
  padding-left: 20px;
}
.tidy-summary li {
  margin: 12px 0;
}
.tidy-summary > p:last-child {
  font-size: 12px;
  margin-top: 25px;
}
.booking-fields {
  margin-top: 35px;
  padding-top: 30px;
  border-top: 1px solid var(--line);
}
@media (max-width: 760px) {
  .tidy-header nav > a,
  .tidy-header .text-link {
    display: none;
  }
  .tidy-header .primary {
    font-size: 11px;
    padding: 10px;
  }
  .tidy-logo {
    font-size: 45px;
  }
  .tidy-logo span {
    font-size: 9px;
  }
  .tidy-intro {
    padding-top: 30px;
  }
  .tidy-intro h1 {
    font-size: 3.3rem;
  }
  .tidy-mark {
    display: none;
  }
  .frequency {
    gap: 9px;
  }
  .frequency > span {
    width: 100%;
    text-align: center;
  }
  .frequency label {
    margin: 10px 0 0;
  }
  .plans,
  .tidy-how {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  .plans article {
    padding: 27px;
  }
  .plans strong {
    font-size: 40px;
  }
  .plans ul {
    margin: 20px 0 10px;
  }
  .price-note {
    text-align: left;
  }
}

.eyebrow {
  font: 500 13px/1.5 var(--body);
  letter-spacing: 0;
  text-transform: none;
}
</style>
