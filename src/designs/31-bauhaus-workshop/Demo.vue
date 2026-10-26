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
    .filter((k) => k.startsWith('design-library:31:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const workshops = ['Shape & structure', 'Print in three colours', 'Objects from paper'];
const form = ref('Circle'),
  count = ref(3),
  session = ref('7 November / 10:00'),
  registered = ref(false);
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>FORM<br />SCHOOL</strong>
      <nav>
        <a href="#programme">Programme</a><button @click="go('exercise')">Try an exercise</button
        ><span>LEARN BY MAKING / 2026</span>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="composition">
          <div class="type">
            <p class="eyebrow">A SCHOOL FOR CURIOUS HANDS</p>
            <h1>Think.<br />Make.<br />Begin again.</h1>
            <p>Practical workshops in shape, colour, and the useful act of trying something.</p>
          </div>
          <div
            class="geometry"
            aria-label="Original composition of a red circle, blue plane, and yellow square"
            role="img"
          >
            <i class="circle"></i><i class="square"></i><i class="triangle"></i
            ><span>01 / FORM IS A QUESTION.</span>
          </div>
          <div class="small-block">
            <span>OPEN<br />TO EVERYONE.</span>
            <p>No experience required.<br />Just a willingness to begin.</p>
          </div>
        </section>
        <section class="programme" id="programme">
          <div class="sectionlabel">
            <span>01 / PROGRAMME</span>
            <h2>Put an idea<br />in your hands.</h2>
          </div>
          <button
            v-for="(w, i) in workshops"
            :key="w"
            :class="'workshop w' + i"
            @click="
              selected = i;
              go('workshop');
            "
          >
            <div class="symbol">
              <span v-if="i === 0">●</span><span v-else-if="i === 1">■</span><span v-else>▲</span>
            </div>
            <small>0{{ i + 1 }} / {{ ['STRUCTURE', 'COLOUR', 'MATERIAL'][i] }}</small>
            <h3>{{ w }}</h3>
            <p>Saturday studio / 2 hours</p>
            <b>OPEN SYLLABUS ↗</b>
          </button>
        </section></template
      >
      <section v-else-if="state === 'workshop'" class="syllabus">
        <p class="eyebrow">WORKSHOP 0{{ selected + 1 }} / FORM SCHOOL</p>
        <h1>{{ workshops[selected] }}</h1>
        <div class="syllabus-grid">
          <article>
            <h2>From a simple rule<br />to a surprising result.</h2>
            <p>
              Work with a small set of materials. Try a constraint, observe what happens, and make a
              second version with one deliberate change.
            </p>
            <ol>
              <li>Observe: what can the material do?</li>
              <li>Arrange: make three different compositions.</li>
              <li>Discuss: what changed, and why?</li>
            </ol>
            <h3>Your instructor</h3>
            <p>
              Alex Reed, a fictional designer and maker. All materials are included in this sample
              workshop.
            </p>
            <button @click="go('exercise')">Try the shape exercise →</button>
          </article>
          <aside>
            <p class="eyebrow">CHOOSE A SESSION</p>
            <label
              >Saturday studio<select v-model="session">
                <option>7 November / 10:00</option>
                <option>7 November / 14:00 — full</option>
                <option>14 November / 10:00</option>
              </select></label
            >
            <p v-if="session.includes('full')">This session is full. Choose another time.</p>
            <button class="primary" :disabled="session.includes('full')" @click="registered = true">
              Reserve a sample place
            </button>
            <p v-if="registered" role="status">
              Sample place selected for {{ session }}. No registration was sent.
            </p>
            <p>£35 sample price / Materials included</p>
          </aside>
        </div>
      </section>
      <section v-else class="exercise">
        <p class="eyebrow">02 / TRY A RULE</p>
        <h1>One shape.<br />Several possibilities.</h1>
        <div class="shape-stage">
          <div
            v-for="n in count"
            :key="n"
            :class="['shape', form.toLowerCase()]"
            :style="{ background: ['#b93627', '#285c9a', '#e8c344'][n % 3] }"
          ></div>
        </div>
        <div class="row">
          <label
            >Shape<select v-model="form">
              <option>Circle</option>
              <option>Square</option>
              <option>Triangle</option>
            </select></label
          ><label>Repetitions<input type="number" min="1" max="6" v-model.number="count" /></label
          ><button
            @click="
              form = 'Circle';
              count = 3;
            "
          >
            Restore the starting point
          </button>
        </div>
        <p>
          Change one variable. Notice how repetition and spacing alter the composition. Every
          control works with the keyboard.
        </p>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Form School · Fictional sample content · Design reference 31</span
      ><button @click="reset">Reset demo</button>
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/space-grotesk.woff2') format('woff2');
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
  padding: 24px 4%;
  border-bottom: 3px solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}
header strong {
  font: 28px/1 'Space Grotesk';
  font-weight: 700;
  letter-spacing: -0.04em;
}
nav {
  display: flex;
  align-items: center;
  gap: 35px;
  font-size: 12px;
}
nav button {
  border: 0;
  background: none;
  font-size: 12px;
}
nav > span {
  font-size: 9px;
}
main {
  padding: 35px 4% 70px;
  max-width: 1500px;
  margin: auto;
}
.composition {
  display: grid;
  grid-template-columns: 1.2fr 1fr 0.45fr;
  border: 2px solid;
  min-height: 570px;
}
.type {
  padding: 45px;
}
.type h1 {
  font-size: 76px;
  line-height: 1.02;
  font-weight: 600;
  margin: 35px 0;
}
.type p {
  font-size: 14px;
}
.type .eyebrow {
  font-size: 10px;
}
.geometry {
  position: relative;
  border-left: 2px solid;
  border-right: 2px solid;
  overflow: hidden;
  background: #e3dfd2;
}
.geometry i {
  display: block;
  position: absolute;
}
.circle {
  border-radius: 50%;
}
.geometry .circle {
  width: 260px;
  height: 260px;
  background: #b93627;
  top: 30px;
  left: 20px;
}
.geometry .square {
  width: 170px;
  height: 170px;
  background: #e8c344;
  bottom: 35px;
  right: -2px;
  border: 2px solid;
}
.geometry .triangle {
  width: 0;
  height: 0;
  border-left: 140px solid transparent;
  border-right: 140px solid transparent;
  border-bottom: 240px solid #285c9a;
  bottom: 20px;
  left: -65px;
}
.geometry > span {
  position: absolute;
  bottom: 12px;
  left: 15px;
  font-size: 8px;
}
.small-block {
  background: #e8c344;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.small-block > span {
  font: 23px/1.3 'Space Grotesk';
  writing-mode: vertical-rl;
  align-self: start;
}
.small-block p {
  font-size: 11px;
}
.programme {
  display: grid;
  grid-template-columns: 1.1fr repeat(3, 1fr);
  margin-top: 45px;
  border: 2px solid;
}
.sectionlabel {
  padding: 30px;
}
.sectionlabel > span {
  font-size: 9px;
}
.sectionlabel h2 {
  font-size: 30px;
  line-height: 1.2;
}
.workshop {
  padding: 30px;
  text-align: left;
  border: 0;
  border-left: 2px solid;
  border-radius: 0;
  background: none;
  position: relative;
}
.symbol {
  font-size: 55px;
  line-height: 1;
  margin-bottom: 40px;
  color: #b93627;
}
.w1 .symbol {
  color: #285c9a;
}
.w2 .symbol {
  color: #a57e08;
}
.workshop small {
  font-size: 9px;
}
.workshop h3 {
  font-size: 25px;
  line-height: 1.2;
}
.workshop p {
  font-size: 11px;
}
.workshop b {
  font-size: 9px;
}
.syllabus,
.exercise {
  padding: 25px 3% 80px;
}
.syllabus h1,
.exercise h1 {
  font-size: 70px;
  max-width: 900px;
}
.syllabus-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 80px;
}
.syllabus-grid h2 {
  font-size: 35px;
  line-height: 1.3;
}
.syllabus-grid p,
.syllabus-grid li {
  font-size: 15px;
  line-height: 1.9;
}
.syllabus-grid aside {
  background: #e8c344;
  padding: 35px;
  align-self: start;
}
.syllabus-grid aside label {
  font-size: 12px;
}
.syllabus-grid aside select {
  font-size: 12px;
  margin-bottom: 25px;
}
.shape-stage {
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  min-height: 350px;
  background: #e0dccf;
  border: 2px solid;
  padding: 35px;
}
.shape {
  width: 130px;
  height: 130px;
}
.shape.triangle {
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
}
.exercise > .row {
  margin-top: 30px;
}
.exercise label {
  font-size: 11px;
}
.exercise input {
  max-width: 100px;
}
.exercise > p {
  font-size: 14px;
}
@media (max-width: 900px) {
  .composition {
    grid-template-columns: 1fr 1fr;
  }
  .small-block {
    display: none;
  }
  .programme {
    grid-template-columns: 1fr 1fr;
  }
  .workshop {
    border-top: 2px solid;
  }
  .sectionlabel {
    grid-column: 1/-1;
  }
  .type {
    padding: 30px;
  }
  .type h1 {
    font-size: 65px;
  }
}
@media (max-width: 600px) {
  header {
    padding: 20px;
  }
  nav {
    gap: 12px;
    font-size: 10px;
  }
  nav button {
    font-size: 10px;
  }
  nav > span {
    display: none;
  }
  .composition {
    display: block;
  }
  .type h1 {
    font-size: 60px;
  }
  .geometry {
    height: 270px;
    border: 0;
    border-top: 2px solid;
  }
  .geometry .circle {
    height: 200px;
    width: 200px;
  }
  .geometry .triangle {
    left: 80px;
    bottom: -10px;
  }
  .programme {
    display: block;
  }
  .workshop {
    display: block;
    width: 100%;
    border-left: 0;
  }
  .symbol {
    float: right;
    margin-bottom: 0;
  }
  .workshop h3 {
    font-size: 29px;
  }
  .syllabus h1,
  .exercise h1 {
    font-size: 49px;
  }
  .syllabus-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .syllabus-grid aside {
    padding: 25px;
  }
  .shape {
    width: 85px;
    height: 85px;
  }
  .shape-stage {
    gap: 15px;
    min-height: 260px;
  }
}
</style>
