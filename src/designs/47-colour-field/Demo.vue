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
    .filter((k) => k.startsWith('design-library:47:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const exhibitions = [
  'Between one thing and another',
  'The shape of a pause',
  'A colour held in place',
];
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <a :href="href('start')" @click.prevent="go('start')">intervals</a>
      <nav>
        <a href="#programme">Programme</a><a href="#visit">Visit</a
        ><button @click="go('membership')">Membership</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="fields">
          <div class="rail">01 / A SPACE BETWEEN</div>
          <div class="large-field">
            <p class="eyebrow">EXHIBITIONS / CONVERSATIONS / ORDINARY DISCOVERIES</p>
            <h1>Something<br />happens<br />in between.</h1>
            <p>A place for looking longer.<br />A little room for another point of view.</p>
            <a href="#programme">Explore the programme ↓</a>
          </div>
          <div class="side-field">
            <span class="ring" aria-hidden="true"></span>
            <p>NOW SHOWING</p>
            <h2>Between one<br />thing and<br />another.</h2>
            <span>06 NOV — 14 DEC 2026</span>
          </div>
        </section>
        <section id="programme" class="programme">
          <div class="rail">02 / WHAT’S ON</div>
          <div>
            <p class="eyebrow">THE CURRENT SEASON</p>
            <h2>Look. Stay.<br />Look again.</h2>
            <button
              v-for="(e, i) in exhibitions"
              :key="e"
              @click="
                selected = i;
                go('exhibition');
              "
            >
              <span>0{{ i + 1 }}</span>
              <h3>{{ e }}</h3>
              <b>↗</b>
            </button>
          </div>
        </section>
        <section id="visit" class="visit">
          <div class="rail">03 / COME IN</div>
          <div>
            <h2>A good place<br />to spend an hour.</h2>
            <p>
              Wednesday–Sunday / 11:00–18:00<br />12 Foundry Lane, fictional Northbank<br />Free
              entry to the sample programme
            </p>
          </div>
          <aside>
            <p>Step-free access.<br />Seating in every room.<br />No expertise required.</p>
            <button @click="go('membership')">Stay connected →</button>
          </aside>
        </section></template
      >
      <section v-else-if="state === 'exhibition'" class="exhibition">
        <div class="rail">EXHIBITION / 0{{ selected + 1 }}</div>
        <article>
          <p class="eyebrow">06 NOVEMBER — 14 DECEMBER 2026</p>
          <h1>{{ exhibitions[selected] }}</h1>
          <p>
            Three fictional artists consider the spaces between objects, gestures, and moments. The
            exhibition asks what changes when we pay attention to the interval.
          </p>
          <div
            class="artwork"
            role="img"
            aria-label="Original geometric study of a blue square and pale circle on a coral field"
          >
            <span></span><i></i>
          </div>
          <h2>A note on the work</h2>
          <p>
            The original geometric composition is a visual fixture. It demonstrates how a large
            colour field can hold space for both an artwork and its explanation.
          </p>
          <button @click="go('start')">Back to the programme →</button>
        </article>
      </section>
      <section v-else class="membership">
        <div class="rail">MEMBERSHIP / A CONTINUING CONVERSATION</div>
        <article>
          <p class="eyebrow">A LITTLE CLOSER TO THE PROGRAMME</p>
          <h1>Keep a place<br />in your week.</h1>
          <div class="tiers">
            <section v-for="(tier, i) in ['Visitor', 'Friend', 'Supporter']" :key="tier">
              <span>0{{ i + 1 }}</span>
              <h2>{{ tier }}</h2>
              <strong>{{ ['Free', '£30 / year', '£60 / year'][i] }}</strong>
              <p>
                {{
                  [
                    'Open access to exhibitions and public notes.',
                    'The programme, plus invitations to small conversations.',
                    'Everything in Friend, plus an annual studio visit.',
                  ][i]
                }}
              </p>
              <button
                @click="
                  message = tier + ' selected in this sample. No membership or payment was created.'
                "
              >
                Choose {{ tier }} →
              </button>
            </section>
          </div>
          <p v-if="message" role="status">{{ message }}</p>
          <p class="small">Fictional membership options. No account or payment is required.</p>
        </article>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Intervals · Fictional sample content · Design reference 47</span
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 5%;
  gap: 30px;
  background: #eee6d7;
}
header > a {
  font: 34px 'Space Grotesk';
  letter-spacing: -0.06em;
  text-decoration: none;
  font-weight: 500;
}
nav {
  display: flex;
  align-items: center;
  gap: 35px;
  font-size: 11px;
}
nav button {
  background: none;
  border: 0;
  font-size: 11px;
}
.fields {
  display: grid;
  grid-template-columns: 70px 2.1fr 1fr;
  min-height: 650px;
}
.rail {
  writing-mode: vertical-rl;
  font: 9px 'DM Sans';
  letter-spacing: 0.13em;
  padding: 35px 25px;
  border-right: 1px solid #2c303133;
}
.large-field {
  background: #c6cddd;
  padding: 50px 8% 60px;
}
.large-field .eyebrow {
  font-size: 9px;
}
.large-field h1 {
  font-size: 84px;
  line-height: 1.02;
  font-weight: 500;
  letter-spacing: -0.055em;
  margin: 40px 0 30px;
}
.large-field p {
  font-size: 16px;
  line-height: 1.8;
}
.large-field a {
  font-size: 11px;
  display: inline-block;
  margin-top: 25px;
}
.side-field {
  background: #c9876b;
  padding: 55px 12%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: start;
}
.ring {
  width: 100px;
  height: 100px;
  border: 1px solid #2c3031;
  border-radius: 50%;
  margin-bottom: auto;
}
.side-field > p {
  font-size: 9px;
  letter-spacing: 0.12em;
}
.side-field h2 {
  font-size: 33px;
  line-height: 1.2;
  font-weight: 500;
}
.side-field > span:last-child {
  font-size: 9px;
  letter-spacing: 0.08em;
}
.programme {
  display: grid;
  grid-template-columns: 70px 1fr;
  background: #dfd99b;
}
.programme > div:last-child {
  padding: 60px 8% 75px;
}
.programme h2 {
  font-size: 62px;
  line-height: 1.08;
  font-weight: 500;
}
.programme button {
  display: flex;
  align-items: center;
  gap: 35px;
  background: none;
  border: 0;
  border-top: 1px solid #747147;
  text-align: left;
  width: 100%;
  padding: 25px 0;
}
.programme button > span {
  font-size: 11px;
}
.programme h3 {
  font-size: 27px;
  font-weight: 400;
  margin: 0;
  flex: 1;
}
.programme b {
  font-size: 24px;
  font-weight: 400;
}
.visit {
  display: grid;
  grid-template-columns: 70px 1.6fr 1fr;
  background: #aab6a0;
}
.visit > div:nth-child(2) {
  padding: 60px 12%;
}
.visit h2 {
  font-size: 48px;
  line-height: 1.2;
  font-weight: 500;
}
.visit p {
  font-size: 14px;
  line-height: 2;
}
.visit aside {
  padding: 70px 12% 60px 0;
  align-self: end;
}
.visit button {
  font-size: 12px;
  background: none;
  border: 0;
  border-bottom: 1px solid;
  border-radius: 0;
  padding: 12px 0;
}
.exhibition,
.membership {
  display: grid;
  grid-template-columns: 70px 1fr;
  background: #c6cddd;
}
.exhibition article,
.membership article {
  padding: 55px 8% 100px;
  max-width: 1350px;
}
.exhibition h1,
.membership h1 {
  font-size: 73px;
  font-weight: 500;
  max-width: 900px;
}
.exhibition p {
  font-size: 17px;
  line-height: 1.9;
}
.artwork {
  position: relative;
  height: 420px;
  background: #c9876b;
  margin: 45px 0;
}
.artwork span {
  position: absolute;
  width: 220px;
  height: 220px;
  background: #4a60a2;
  left: 20%;
  top: 80px;
}
.artwork i {
  position: absolute;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: #e4dfb2;
  left: 45%;
  top: 120px;
}
.exhibition h2 {
  font-size: 34px;
}
.exhibition button {
  font-size: 12px;
  background: none;
  border: 0;
  padding: 0;
  text-decoration: underline;
}
.membership {
  background: #aab6a0;
}
.tiers {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
  margin: 45px 0;
}
.tiers section {
  border-top: 1px solid;
  padding-top: 25px;
}
.tiers span {
  font-size: 10px;
}
.tiers h2 {
  font-size: 31px;
  font-weight: 400;
}
.tiers strong {
  font-size: 16px;
  font-weight: 400;
}
.tiers p {
  font-size: 14px;
  line-height: 1.9;
  min-height: 100px;
}
.tiers button {
  font-size: 11px;
  background: none;
  border: 0;
  border-bottom: 1px solid;
  border-radius: 0;
  padding: 10px 0;
}
.small {
  font-size: 11px;
}
@media (max-width: 700px) {
  .fields {
    grid-template-columns: 45px 1.6fr 1fr;
  }
  .rail {
    padding: 25px 15px;
  }
  .large-field h1 {
    font-size: 60px;
  }
  .side-field h2 {
    font-size: 26px;
  }
  .programme,
  .exhibition,
  .membership {
    grid-template-columns: 45px 1fr;
  }
  .visit {
    grid-template-columns: 45px 1.6fr 1fr;
  }
  .visit h2 {
    font-size: 37px;
  }
  .visit p {
    font-size: 12px;
  }
}
@media (max-width: 600px) {
  header {
    padding: 23px;
  }
  header > a {
    font-size: 28px;
  }
  nav {
    gap: 15px;
    font-size: 10px;
  }
  nav button {
    font-size: 10px;
  }
  .fields {
    display: block;
  }
  .rail {
    writing-mode: horizontal-tb;
    border-right: 0;
    border-bottom: 1px solid #2c303133;
    padding: 17px 6%;
    font-size: 8px;
  }
  .large-field {
    padding: 35px 7% 45px;
  }
  .large-field h1 {
    font-size: 59px;
    margin: 30px 0;
  }
  .side-field {
    padding: 30px 7%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
  .ring {
    width: 70px;
    height: 70px;
    grid-row: span 3;
    margin: 15px 0;
  }
  .side-field h2 {
    font-size: 26px;
    margin: 0;
  }
  .side-field p {
    margin: 0;
  }
  .programme,
  .visit,
  .exhibition,
  .membership {
    display: block;
  }
  .programme > div:last-child {
    padding: 40px 7%;
  }
  .programme h2 {
    font-size: 46px;
  }
  .programme h3 {
    font-size: 22px;
  }
  .programme button {
    gap: 18px;
  }
  .visit > div:nth-child(2) {
    padding: 40px 7% 20px;
  }
  .visit aside {
    padding: 0 7% 40px;
  }
  .exhibition article,
  .membership article {
    padding: 40px 7% 70px;
  }
  .exhibition h1,
  .membership h1 {
    font-size: 48px;
  }
  .exhibition p {
    font-size: 15px;
  }
  .artwork {
    height: 290px;
  }
  .artwork span {
    width: 150px;
    height: 150px;
    left: 10%;
    top: 60px;
  }
  .artwork i {
    width: 120px;
    height: 120px;
    left: 45%;
    top: 100px;
  }
  .tiers {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .tiers p {
    min-height: 0;
  }
}
</style>
