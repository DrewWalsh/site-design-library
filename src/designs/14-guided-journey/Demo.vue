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
    .filter((k) => k.startsWith('design-library:14:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const step = ref(0),
  answers = ref(['', '', '']);
const questions = [
  'What would you like to explore?',
  'When do you have time?',
  'How do you like to learn?',
];
const options = [
  ['Working with wood', 'Drawing & print', 'Clay & ceramics'],
  ['Weekday evenings', 'Saturday', 'Sunday'],
  ['Small group', 'One to one', 'Self-guided'],
];
const error = ref(state.value === 'incomplete' ? 'Choose an interest to continue.' : '');
function next() {
  if (!answers.value[step.value]) {
    error.value = 'Choose an option before continuing.';
    return;
  }
  error.value = '';
  if (step.value < 2) step.value++;
  else go('review');
}
function revise(i: number) {
  step.value = i;
  go('start');
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header><strong>✳ Workshop Finder</strong><span>A little time for something new.</span></header>
    <main id="content">
      <aside>
        <p class="eyebrow">FIND YOUR NEXT WORKSHOP</p>
        <h2>Make room<br />for making.</h2>
        <p>Three small choices.<br />A few good possibilities.</p>
        <ol>
          <li
            v-for="(q, i) in ['Your interest', 'Your time', 'Your format']"
            :key="q"
            :class="{ active: step === i }"
          >
            <button @click="revise(i)">
              <span>0{{ i + 1 }}</span>
              <div>
                {{ q }}<small>{{ answers[i] || 'Not chosen yet' }}</small>
              </div>
            </button>
          </li>
        </ol>
        <small>All workshops and dates are fictional examples.</small>
      </aside>
      <section class="question">
        <template v-if="state !== 'review'"
          ><p class="eyebrow">STEP {{ step + 1 }} OF 3</p>
          <div class="progress"><span :style="{ width: ((step + 1) / 3) * 100 + '%' }"></span></div>
          <h1>{{ questions[step] }}</h1>
          <p>
            {{
              [
                'Follow your curiosity. You don’t need any previous experience.',
                'Choose a time that fits your week. You can change this later.',
                'Pick the setting where you feel most comfortable trying something new.',
              ][step]
            }}
          </p>
          <fieldset>
            <legend class="eyebrow">CHOOSE ONE OPTION</legend>
            <label
              v-for="(option, i) in options[step]"
              :key="option"
              :class="{ chosen: answers[step] === option }"
              ><input
                type="radio"
                :name="'step-' + step"
                :value="option"
                v-model="answers[step]"
              /><span
                >{{ option
                }}<small>{{
                  [
                    ['Build something useful', 'Find your own mark', 'Work with your hands'],
                    ['After the working day', 'A little weekend space', 'A slower end to the week'],
                    [
                      'Learn alongside others',
                      'Focused individual guidance',
                      'Work at your own pace',
                    ],
                  ][step][i]
                }}</small></span
              ><b>↗</b></label
            >
          </fieldset>
          <p v-if="error" role="alert" class="error">{{ error }}</p>
          <div class="row actions">
            <button
              v-if="step > 0"
              @click="
                step--;
                error = '';
              "
            >
              ← Back</button
            ><button class="primary" @click="next">
              {{ step === 2 ? 'Review my choices' : 'Continue' }} →
            </button>
          </div></template
        ><template v-else
          ><p class="eyebrow">YOUR STARTING POINT</p>
          <h1>A good fit<br />for your week.</h1>
          <p>Review your choices, then explore a sample recommendation.</p>
          <div class="answer" v-for="(answer, i) in answers" :key="i">
            <div>
              <small>{{ ['INTEREST', 'TIME', 'FORMAT'][i] }}</small>
              <p>{{ answer || ['Clay & ceramics', 'Saturday', 'Small group'][i] }}</p>
            </div>
            <button @click="revise(i)">Change</button>
          </div>
          <div class="recommendation">
            <p class="eyebrow">SUGGESTED WORKSHOP / SAMPLE</p>
            <h2>A first afternoon<br />in the studio.</h2>
            <p>
              A two-hour introduction with materials provided. Six places, a patient instructor, and
              room to experiment.
            </p>
            <p>
              <b>Saturday, 7 November · 14:00</b><br />Form School, Northbank · £35 sample price
            </p>
            <button
              @click="message = 'Workshop saved for this demonstration. No registration was made.'"
            >
              Save this possibility
            </button>
            <p v-if="message" role="status">{{ message }}</p>
          </div></template
        >
      </section>
    </main>
    <footer class="specimen-note">
      <span>Workshop Finder · Fictional sample content · Design reference 14</span
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
  padding: 25px 6%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--line);
  gap: 20px;
}
header strong {
  font-size: 21px;
}
header span {
  font-size: 12px;
  color: #74667c;
}
main {
  max-width: 1150px;
  margin: auto;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 90px;
  padding: 65px 35px 100px;
}
aside h2 {
  font-size: 41px;
  font-weight: 500;
  line-height: 1.25;
}
aside > p {
  font-size: 15px;
  color: #75637d;
}
aside ol {
  padding: 0;
  list-style: none;
  margin: 45px 0;
}
aside li {
  border-top: 1px solid var(--line);
}
aside button {
  display: flex;
  gap: 18px;
  text-align: left;
  width: 100%;
  border: 0;
  background: none;
  padding: 20px 0;
  font-size: 13px;
}
aside button > span {
  color: #6c5679;
  font-size: 11px;
}
aside small {
  font-size: 10px;
  color: #67566f;
  line-height: 1.8;
}
aside button small {
  display: block;
  margin-top: 5px;
}
aside li.active button {
  font-weight: 700;
}
.question h1 {
  font-size: 47px;
  line-height: 1.15;
  margin: 35px 0 20px;
}
.question > p:not(.eyebrow) {
  font-size: 15px;
  color: #62506c;
}
.progress {
  height: 4px;
  background: #e2d9e7;
}
.progress span {
  display: block;
  height: 100%;
  background: #8868a3;
}
fieldset {
  border: 0;
  padding: 20px 0;
  margin: 0;
}
fieldset legend {
  padding-top: 20px;
  font-size: 9px;
}
fieldset label {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 20px;
  margin: 13px 0;
  background: #fffefa;
  border: 1px solid #d3c7da;
  border-radius: 8px;
}
fieldset label.chosen {
  border: 2px solid #7c5e94;
  background: #ede6f3;
  padding: 19px;
}
fieldset input {
  accent-color: #6d4d8c;
}
fieldset label > span {
  flex: 1;
  font-size: 16px;
}
fieldset small {
  display: block;
  font-size: 11px;
  margin-top: 7px;
  color: #77647f;
}
fieldset b {
  font-weight: 400;
  font-size: 20px;
}
.actions {
  justify-content: flex-end;
  margin-top: 25px;
}
.actions .primary {
  padding: 15px 28px;
}
.error {
  border-left: 3px solid #a54543;
  padding: 12px;
  background: #f4e6e0;
  color: #8b3530;
}
.answer {
  padding: 20px 0;
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.answer small {
  font-size: 9px;
  letter-spacing: 0.1em;
}
.answer p {
  margin: 10px 0 0;
}
.answer button {
  font-size: 11px;
  background: none;
  border: 0;
  text-decoration: underline;
}
.recommendation {
  padding: 30px;
  margin-top: 35px;
  background: #e8dfed;
  border-radius: 8px;
}
.recommendation h2 {
  font-size: 30px;
}
.recommendation p {
  font-size: 13px;
}
@media (max-width: 750px) {
  main {
    grid-template-columns: 220px 1fr;
    gap: 35px;
  }
  .question h1 {
    font-size: 38px;
  }
  aside h2 {
    font-size: 33px;
  }
}
@media (max-width: 600px) {
  header {
    padding: 22px;
  }
  header span {
    display: none;
  }
  main {
    display: block;
    padding: 25px 22px 60px;
  }
  aside h2,
  aside > p,
  aside > small {
    display: none;
  }
  aside ol {
    display: flex;
    gap: 15px;
    margin: 0 0 25px;
  }
  aside li {
    flex: 1;
  }
  aside button {
    gap: 6px;
    font-size: 10px;
    padding: 10px 0;
  }
  aside button small {
    display: none;
  }
  .question h1 {
    font-size: 36px;
  }
  .question .eyebrow {
    font-size: 10px;
  }
  fieldset label {
    padding: 17px;
  }
  fieldset label.chosen {
    padding: 16px;
  }
  .recommendation {
    padding: 23px;
  }
}
</style>
