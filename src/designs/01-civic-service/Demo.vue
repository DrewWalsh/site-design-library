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
    .filter((k) => k.startsWith('design-library:01:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const address = ref(''),
  slot = ref('Tuesday 3 November'),
  error = ref('');
function book() {
  if (!address.value.trim()) {
    error.value = 'Enter your Northbank address.';
    return;
  }
  if (address.value.toLowerCase().includes('outside')) {
    error.value = 'This address is outside Northbank. Contact your local council.';
    return;
  }
  go('confirmation');
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header class="council">
      <strong>▦ Northbank Council</strong
      ><a :href="href('start')" @click.prevent="go('start')">Services & information</a>
    </header>
    <main id="content">
      <nav class="crumb">
        <a :href="href('start')" @click.prevent="go('start')">Home</a> / Environment / Bulky waste
      </nav>
      <template v-if="state === 'start'"
        ><div class="service">
          <article>
            <p class="eyebrow">Bins, recycling and waste</p>
            <h1>Book a bulky waste collection</h1>
            <p class="lead">We can collect large household items that don’t fit in your bin.</p>
            <p>
              A collection costs <strong>£28 for up to 3 items</strong>. We collect from outside
              your home on Tuesdays and Thursdays.
            </p>
            <h2>Before you start</h2>
            <ul>
              <li>Check that your address is in Northbank.</li>
              <li>Make a list of the items you want collected.</li>
              <li>Choose a day you can leave your items outside by 7am.</li>
            </ul>
            <button class="primary" @click="go('book')">Start your booking →</button>
            <p class="small">
              Takes about 3 minutes. This is a demonstration; no payment is taken.
            </p>
          </article>
          <aside>
            <h3>On this page</h3>
            <a href="#accepted">What we collect</a><a href="#collection">On collection day</a
            ><a href="#help">Get help</a>
            <hr />
            <p>Next sample collection</p>
            <strong>Tuesday, 3 November</strong>
          </aside>
        </div>
        <section id="accepted">
          <h2>What we collect</h2>
          <div class="twocol">
            <div>
              <h3>We can take</h3>
              <ul>
                <li>Sofas, armchairs and mattresses</li>
                <li>Tables, chairs and wardrobes</li>
                <li>Fridges, washing machines and cookers</li>
              </ul>
            </div>
            <div>
              <h3>We cannot take</h3>
              <ul>
                <li>Building waste or rubble</li>
                <li>Paint, chemicals or gas cylinders</li>
                <li>Commercial or trade waste</li>
              </ul>
            </div>
          </div>
        </section>
        <section id="collection">
          <h2>On collection day</h2>
          <p>
            Place your items at the front boundary of your property by 7am. Keep pavements, doors
            and shared paths clear. We cannot enter your home.
          </p>
        </section>
        <section id="help">
          <h2>Need help with your booking?</h2>
          <p>
            If you cannot move items yourself, use the assisted collection option when choosing your
            slot.
          </p>
          <details>
            <summary>Can I change my collection?</summary>
            <p>
              In this sample service, changes can be made up to two working days before collection.
              Reset the demo to try another booking.
            </p>
          </details>
        </section></template
      ><template v-else-if="state === 'book'"
        ><a :href="href('start')" @click.prevent="go('start')">← Back to service</a>
        <h1>Choose your collection</h1>
        <form @submit.prevent="book">
          <label
            >Your address<input
              v-model="address"
              autocomplete="street-address"
              aria-describedby="address-help error"
          /></label>
          <p id="address-help">
            Use any sample Northbank address. Enter “outside” to see an unavailable address.
          </p>
          <p v-if="error" id="error" role="alert">{{ error }}</p>
          <label
            >Collection date<select v-model="slot">
              <option>Tuesday 3 November</option>
              <option>Thursday 5 November</option>
            </select></label
          ><label
            >Items for collection<textarea
              placeholder="For example: one sofa and two chairs"
            ></textarea></label
          ><button class="primary">Confirm sample collection</button>
        </form></template
      ><template v-else
        ><div class="confirmation">
          <span>✓</span>
          <h1>Collection booked</h1>
          <p>Sample reference: NB-2048</p>
        </div>
        <h2>What happens next</h2>
        <p>
          Your collection is on <strong>{{ slot }}</strong> at
          {{ address || '14 Alder Lane, Northbank' }}. Put your items outside by 7am.
        </p>
        <p>This is a sample booking. No collection or payment has been arranged.</p>
        <button @click="go('start')">Return to the service</button></template
      >
    </main>
    <footer class="specimen-note">
      <span>Northbank Council · Fictional sample content · Design reference 01</span
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
.council {
  background: #152e3e;
  color: white;
  padding: 24px max(24px, calc((100% - 1160px) / 2));
  display: flex;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}
.council strong {
  font-size: 25px;
}
main {
  max-width: 1160px;
  margin: auto;
  padding: 24px;
}
.crumb {
  font-size: 14px;
  padding: 8px 0 35px;
}
.service {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 100px;
}
h1 {
  font-size: 52px;
  margin: 16px 0 24px;
  max-width: 650px;
}
.lead {
  font-size: 24px;
}
.service aside {
  border-top: 5px solid var(--accent);
  margin-top: 42px;
}
aside a {
  display: block;
  margin: 14px 0;
}
li {
  margin: 10px 0;
}
.primary {
  font-size: 19px;
  padding: 16px 24px;
  margin: 16px 0;
}
.small {
  font-size: 14px;
}
section {
  border-top: 1px solid var(--line);
  padding: 35px 0;
  max-width: 850px;
  margin-top: 30px;
}
.twocol {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}
form {
  max-width: 650px;
  display: grid;
  gap: 20px;
}
.confirmation {
  background: #166347;
  color: white;
  text-align: center;
  padding: 40px;
  max-width: 760px;
}
.confirmation h1 {
  margin: auto;
}
.confirmation span {
  font-size: 56px;
}
@media (max-width: 700px) {
  .service,
  .twocol {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  h1 {
    font-size: 38px;
  }
  .service aside {
    margin-top: 0;
  }
  .council {
    padding: 20px;
  }
  .council a {
    font-size: 14px;
  }
}
.eyebrow {
  font: 600 13px/1.5 'DM Sans';
  letter-spacing: 0;
  text-transform: none;
}
</style>
