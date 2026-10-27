<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useSpecimen } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const woods = [
  { name: 'Pale oak', colour: '#c5aa7b', price: 1800 },
  { name: 'Smoked ash', colour: '#8c7358', price: 1950 },
  { name: 'Walnut', colour: '#654736', price: 2300 },
];
const wood = ref(0),
  length = ref(180),
  finish = ref('Natural oil'),
  name = ref(''),
  email = ref(''),
  use = ref(''),
  sent = ref(false),
  estimate = computed(() => woods[wood.value].price + Math.max(0, length.value - 160) * 7);
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header class="still-header wrap">
      <a :href="href('start')" class="still-logo">still.<span>FURNITURE, MADE FOR LIVING.</span></a>
      <nav class="row">
        <a :href="href('start') + '#materials'">Material library</a
        ><a :href="href('start') + '#making'">The making</a
        ><button class="text-link" @click="go('configure')">Begin a commission ↗</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="still-opening wrap">
          <div class="still-title">
            <p class="eyebrow">SOME THINGS ARE WORTH MAKING SLOWLY.</p>
            <h1>Made to fit.<br />Made to stay.</h1>
            <p>
              A table for the life around it.<br />A material you’ll get to know.<br />A piece that
              belongs.
            </p>
          </div>
          <figure class="workbench-image">
            <img
              class="photo"
              src="https://drew-site-design-library.t3.tigrisfiles.io/assets/commercial/21fc8030ed7ed3ba-craft.webp"
              alt="Craftsperson working with wood at a workshop bench"
            />
            <figcaption>
              Material, tools, and the work of making · illustrative workshop photograph
            </figcaption>
          </figure>
          <div class="project-tag">
            <span>COMMISSION 012</span>
            <h2>The gathering table</h2>
            <p>Oak / soft edge / room for six</p>
            <button class="text-link" @click="go('configure')">Explore your own version →</button>
          </div>
        </section>
        <section id="materials" class="wrap section materials">
          <div class="section-heading">
            <h2>Start with<br />what it’s made of.</h2>
            <p>
              Colour is only part of the decision. Grain, texture, use, and care belong in the
              conversation too.
            </p>
          </div>
          <div class="material-shelf">
            <button
              v-for="(w, i) in woods"
              :key="w.name"
              :aria-pressed="wood === i"
              @click="wood = i"
            >
              <span
                class="wood-swatch"
                :style="{ backgroundColor: w.colour }"
                aria-hidden="true"
              ></span>
              <h3>{{ w.name }}</h3>
              <p>
                {{
                  [
                    'Open grain, warm and light.',
                    'A quieter tone, with a visible grain.',
                    'Deep colour and a strong character.',
                  ][i]
                }}
              </p>
              <b>{{ wood === i ? 'Selected for your sample ✓' : 'Choose this material →' }}</b>
            </button>
          </div>
          <p class="muted">
            Digital swatches are illustrative. A real commission begins with physical samples.
          </p>
        </section>
        <section id="making" class="making-band">
          <div class="wrap">
            <p class="eyebrow">FROM FIRST SKETCH TO EVERYDAY LIFE</p>
            <h2>A considered process.</h2>
            <div class="making-steps">
              <article
                v-for="(step, i) in [
                  ['A conversation', 'How will the piece be used, and where will it live?'],
                  [
                    'A material & a drawing',
                    'Agree proportions, finish, and the details that matter.',
                  ],
                  [
                    'Time in the workshop',
                    'The piece takes shape, with agreed updates along the way.',
                  ],
                  ['A careful handover', 'Delivery, placement, and clear instructions for care.'],
                ]"
                :key="step[0]"
              >
                <span>0{{ i + 1 }}</span>
                <h3>{{ step[0] }}</h3>
                <p>{{ step[1] }}</p>
              </article>
            </div>
          </div>
        </section>
        <section class="wrap section commission-close">
          <h2>Something in mind?</h2>
          <p>
            Begin with a table configuration. The result is a brief for a conversation, not an item
            added to a cart.
          </p>
          <button class="primary" @click="go('configure')">Shape a sample commission →</button>
        </section></template
      >
      <section v-else class="wrap state-page">
        <button class="back text-link" @click="go('start')">← The workshop</button>
        <h1>
          {{ state === 'configure' ? 'A table for your room.' : 'The beginning of a piece.' }}
        </h1>
        <div class="commission-config">
          <figure class="table-preview">
            <svg
              viewBox="0 0 600 400"
              role="img"
              :aria-label="woods[wood].name + ' table, ' + length + ' centimetres long'"
            >
              <ellipse cx="300" cy="325" rx="220" ry="35" fill="#d0c7b8" />
              <g :fill="woods[wood].colour" stroke="#514137" stroke-width="2">
                <path d="M120 180 220 130 500 200 400 250Z" />
                <path d="M120 180V198L400 268V250 M400 250 500 200V218L400 268" />
                <path
                  d="M145 200V320L165 325V205 M385 260V350L405 345V260 M470 225V310L485 305V220"
                />
              </g>
              <path
                d="M190 180 420 235 M210 165 450 225 M180 192 390 247"
                stroke="#514137"
                stroke-width="1"
                opacity=".4"
              />
              <text x="300" y="370" text-anchor="middle" font-size="15" fill="#443a2f">
                {{ length }} cm · {{ woods[wood].name }} · {{ finish }}
              </text>
            </svg>
            <figcaption>Illustrative form and finish, not a production drawing</figcaption>
          </figure>
          <div class="configuration-controls">
            <fieldset>
              <legend>01 / Timber</legend>
              <label v-for="(w, i) in woods" :key="w.name"
                ><input type="radio" v-model="wood" :value="i" /><i
                  :style="{ background: w.colour }"
                  aria-hidden="true"
                ></i
                >{{ w.name }}</label
              >
            </fieldset>
            <label
              >02 / Length in centimetres<input
                type="range"
                min="160"
                max="240"
                step="10"
                v-model.number="length"
              /><span
                >{{ length }} cm · {{ length < 200 ? '4–6' : '6–8' }} people, depending on
                chairs</span
              ></label
            ><label
              >03 / Finish<select v-model="finish">
                <option>Natural oil</option>
                <option>Matte protective finish</option>
              </select></label
            >
            <p class="estimate">
              Sample starting point <strong>&#36;{{ estimate.toLocaleString() }}</strong
              ><small>For discussion. Delivery, tax, and custom details are separate.</small>
            </p>
            <button v-if="state === 'configure'" class="primary" @click="go('enquiry')">
              Continue with this direction →
            </button>
          </div>
        </div>
        <section v-if="state === 'enquiry'" class="two enquiry-section">
          <div>
            <h2>Tell us about<br />the life around it.</h2>
            <p>
              Room dimensions, everyday uses, and a few references help a maker understand what
              matters. A real commission would proceed through a drawing and agreed quotation.
            </p>
          </div>
          <form v-if="!sent" class="form" @submit.prevent="sent = true">
            <label>Your name<input required v-model="name" /></label
            ><label>Email<input required type="email" v-model="email" /></label
            ><label>How will you use the piece?<textarea required v-model="use"></textarea></label
            ><button class="primary">Review commission brief</button>
          </form>
          <div v-else class="confirmation" role="status">
            <h2>A direction to discuss.</h2>
            <p>{{ woods[wood].name }} · {{ length }} cm · {{ finish }}</p>
            <p>{{ use }}</p>
            <p>No commission has been placed. This sample brief remains in the page.</p>
          </div>
        </section>
      </section>
    </main>
    <footer class="sample-footer">
      <span>Still / Furniture workshop · Fictional design reference 66.</span
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

.still-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding-top: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid var(--line);
}
.still-logo {
  font:
    45px/0.8 Georgia,
    serif;
  letter-spacing: -0.05em;
  text-decoration: none;
}
.still-logo span {
  display: block;
  font: 8px/1.5 var(--body);
  letter-spacing: 0.13em;
  margin-top: 13px;
}
.still-header nav {
  font-size: 13px;
}
.still-opening {
  position: relative;
  padding-top: 40px;
  padding-bottom: 40px;
}
.still-title {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 20px 60px;
  align-items: end;
  margin-bottom: 35px;
}
.still-title .eyebrow {
  grid-column: 1/-1;
}
.still-title h1 {
  font-weight: 400;
  font-size: clamp(3rem, 4.9vw, 4.9rem);
  line-height: 1.15;
}
.still-title > p:last-child {
  justify-self: end;
  font-size: 16px;
  margin-bottom: 10px;
}
.workbench-image img {
  height: 450px;
  object-position: center 45%;
}
.project-tag {
  display: grid;
  grid-template-columns: 130px 1fr 1fr auto;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
}
.project-tag span {
  font-size: 10px;
}
.project-tag h2 {
  font-size: 21px;
  font-weight: 400;
}
.project-tag p {
  font-size: 12px;
}
.project-tag button {
  font-size: 12px;
}
.materials {
  border-top: 1px solid var(--ink);
}
.materials h2 {
  font-weight: 400;
}
.material-shelf {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 35px;
  margin-bottom: 25px;
}
.material-shelf button {
  background: transparent;
  border: 0;
  padding: 0;
  text-align: left;
  font-weight: 400;
}
.material-shelf button[aria-pressed='true'] {
  outline: 0;
}
.wood-swatch {
  display: block;
  height: 220px;
  border-radius: 50% 50% 4px 4px;
  background-image: repeating-linear-gradient(
    84deg,
    transparent 0 12px,
    #34211218 13px 15px,
    transparent 17px 34px
  );
  box-shadow: inset 0 0 20px #41271725;
}
.material-shelf h3 {
  font-weight: 400;
  font-size: 24px;
  margin: 20px 0 14px;
}
.material-shelf p {
  font-size: 14px;
  min-height: 50px;
}
.material-shelf b {
  display: block;
  font: 12px var(--body);
  margin-top: 15px;
  border-top: 1px solid var(--line);
  padding-top: 15px;
}
.material-shelf button[aria-pressed='true'] b {
  border-top: 3px solid var(--accent);
}
.making-band {
  padding: 55px 0;
  background: #ded6c8;
}
.making-band h2 {
  font-weight: 400;
  margin: 20px 0 40px;
}
.making-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}
.making-steps article {
  border-top: 1px solid #887660;
  padding-top: 20px;
}
.making-steps span {
  font: 24px Georgia;
}
.making-steps h3 {
  font-size: 19px;
  font-weight: 400;
  margin: 20px 0 15px;
}
.making-steps p {
  font-size: 13px;
}
.commission-close {
  text-align: center;
}
.commission-close h2 {
  font-weight: 400;
}
.commission-close p {
  max-width: 50ch;
  margin: 25px auto;
}
.commission-config {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 55px;
  margin-top: 40px;
}
.table-preview {
  background: #e2d9ca;
  align-self: start;
  padding: 25px;
}
.configuration-controls {
  display: grid;
  gap: 25px;
}
.configuration-controls fieldset {
  border: 0;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 13px;
}
.configuration-controls legend {
  font-size: 12px;
  margin-bottom: 18px;
}
.configuration-controls fieldset label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}
.configuration-controls i {
  width: 25px;
  height: 25px;
  border-radius: 50%;
}
.configuration-controls > label {
  display: grid;
  gap: 12px;
  font-size: 12px;
}
.configuration-controls input[type='range'] {
  padding: 0;
  accent-color: var(--accent);
}
.configuration-controls input[type='radio'] {
  min-height: 20px;
  width: 18px;
}
.estimate {
  border-top: 1px solid var(--ink);
  padding-top: 20px;
  font-size: 12px;
}
.estimate strong {
  display: block;
  font: 32px var(--heading);
  margin: 12px 0;
}
.estimate small {
  font-size: 11px;
}
.enquiry-section {
  margin-top: 60px;
  border-top: 1px solid var(--line);
  padding-top: 40px;
}
.enquiry-section h2 {
  font-weight: 400;
  margin-bottom: 25px;
}
@media (max-width: 760px) {
  .still-header nav > a {
    display: none;
  }
  .still-header .text-link {
    font-size: 12px;
  }
  .still-logo {
    font-size: 38px;
  }
  .still-logo span {
    font-size: 7px;
    max-width: 150px;
  }
  .still-title {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .still-title h1 {
    font-size: 3.1rem;
  }
  .still-title > p:last-child {
    justify-self: start;
  }
  .workbench-image img {
    height: 300px;
  }
  .project-tag {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .project-tag h2 {
    grid-column: 1/-1;
  }
  .project-tag > button {
    grid-column: 1/-1;
    justify-self: start;
  }
  .material-shelf {
    gap: 13px;
  }
  .wood-swatch {
    height: 140px;
  }
  .material-shelf h3 {
    font-size: 17px;
  }
  .material-shelf p {
    font-size: 12px;
    min-height: 75px;
  }
  .material-shelf b {
    font-size: 10px;
  }
  .making-steps {
    grid-template-columns: 1fr 1fr;
    gap: 25px;
  }
  .commission-config {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .table-preview {
    padding: 10px;
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
