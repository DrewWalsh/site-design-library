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
    .filter((k) => k.startsWith('design-library:29:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const activity = ref('Notice the room'),
  duration = ref('No timer'),
  simple = ref(false);
const activities = ['Notice the room', 'Write one sentence', 'Put the day down'];
const note = ref('');
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <button @click="go('start')">evening room</button
      ><button @click="simple = !simple">{{ simple ? 'Show guidance' : 'Less guidance' }}</button>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><div class="quiet-mark" aria-hidden="true"><span></span></div>
        <p class="eyebrow">A little space at the end of the day</p>
        <h1>Nothing to catch up on.<br />Just a place to pause.</h1>
        <p class="intro" v-if="!simple">
          Choose something small. Take as much or as little time as you want.
        </p>
        <div class="activities">
          <button
            v-for="(a, i) in activities"
            :key="a"
            @click="
              activity = a;
              go('practice');
            "
          >
            <span>0{{ i + 1 }}</span>
            <div>
              {{ a
              }}<small>{{
                [
                  'Look at what is already around you.',
                  'A thought, without needing to finish it.',
                  'Leave a small note for tomorrow.',
                ][i]
              }}</small>
            </div>
            <b>→</b>
          </button>
        </div>
        <p class="permission">
          You can also simply close this page.<br />There is nothing to complete.
        </p></template
      ><template v-else-if="state === 'practice'"
        ><button class="back" @click="go('start')">← Back to the room</button>
        <div class="quiet-mark small" aria-hidden="true"><span></span></div>
        <p class="eyebrow">At your own pace</p>
        <h1>{{ activity }}</h1>
        <template v-if="activity === 'Notice the room'"
          ><p class="practice-copy">
            Find one shape.<br />Then a colour.<br />Then something you hadn’t noticed.
          </p>
          <p v-if="!simple">
            There is no right answer. Let your attention settle wherever it wants to go.
          </p></template
        ><template v-else
          ><p>
            {{
              activity === 'Write one sentence'
                ? 'Write a sentence that doesn’t need to become anything else.'
                : 'What would you like to leave here until tomorrow?'
            }}
          </p>
          <label
            >Your private note<textarea
              v-model="note"
              placeholder="Begin anywhere."
            ></textarea></label
          ><small>This note lives only on this page and is not sent or saved.</small></template
        >
        <div class="practice-end">
          <button class="primary" @click="go('finished')">That’s enough for now</button
          ><button @click="go('start')">Choose something else</button>
        </div></template
      ><template v-else
        ><div class="quiet-mark" aria-hidden="true"><span></span></div>
        <p class="eyebrow">When you’re ready</p>
        <h1>You can leave<br />it there.</h1>
        <p>No score. No streak.<br />The rest of the evening is yours.</p>
        <button class="primary" @click="go('start')">Return to the room</button>
        <p class="permission">
          A fictional reflective tool.<br />No therapeutic outcomes are promised.
        </p></template
      >
    </main>
    <footer class="specimen-note">
      <span>Evening Room · Fictional sample content · Design reference 29</span
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
  display: flex;
  justify-content: space-between;
  padding: 30px 5%;
  align-items: center;
}
header button {
  border: 0;
  background: none;
  padding: 0;
  font-size: 12px;
  letter-spacing: 0.02em;
}
header button:first-child {
  font-size: 18px;
  letter-spacing: -0.04em;
}
header button:last-child {
  font-size: 10px;
  color: #6e6571;
}
main {
  max-width: 700px;
  margin: auto;
  padding: 35px 35px 100px;
  text-align: center;
  min-height: 950px;
}
.quiet-mark {
  width: 150px;
  height: 120px;
  margin: 10px auto 55px;
  position: relative;
  overflow: hidden;
}
.quiet-mark:before {
  content: '';
  position: absolute;
  background: #c4c8b5;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  top: 25px;
  left: 10px;
}
.quiet-mark > span {
  position: absolute;
  top: 75px;
  left: 0;
  right: 0;
  border-top: 1px solid #747f62;
  z-index: 1;
}
.quiet-mark.small {
  margin: 30px auto;
  width: 100px;
  height: 85px;
}
.quiet-mark.small:before {
  width: 90px;
  height: 90px;
}
.eyebrow {
  font-size: 9px;
  color: #565d4b;
}
h1 {
  font-size: 39px;
  line-height: 1.4;
  font-weight: 400;
  letter-spacing: -0.035em;
  margin: 24px 0;
}
main > p {
  font-size: 15px;
  line-height: 1.9;
  max-width: 490px;
  margin: 20px auto;
}
.intro {
  color: #5d5460;
}
.activities {
  margin: 45px auto 30px;
  max-width: 500px;
  text-align: left;
}
.activities > button {
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 22px 0;
  border: 0;
  border-top: 1px solid #c7c8bb;
  border-radius: 0;
  background: transparent;
  width: 100%;
  text-align: left;
}
.activities > button > span {
  font-size: 10px;
  color: #59624c;
}
.activities > button > div {
  flex: 1;
  font-size: 17px;
}
.activities small {
  display: block;
  font-size: 11px;
  color: #60595e;
  margin-top: 8px;
}
.activities b {
  font-size: 19px;
  font-weight: 400;
  color: #747e68;
}
.permission {
  font-size: 11px !important;
  color: #5e5b52;
  line-height: 1.9 !important;
  margin-top: 45px !important;
}
.back {
  display: block;
  background: none;
  border: 0;
  padding: 0;
  font-size: 11px;
}
.practice-copy {
  font-size: 24px !important;
  line-height: 2 !important;
  margin: 35px auto !important;
}
.practice-end {
  display: grid;
  gap: 15px;
  max-width: 310px;
  margin: 45px auto;
}
.primary {
  padding: 15px 28px;
  font-size: 13px;
  border-radius: 25px;
}
.practice-end button:not(.primary) {
  font-size: 11px;
  background: none;
  border: 0;
}
main label {
  text-align: left;
  font-size: 11px;
  gap: 12px;
  margin: 35px 0 15px;
}
textarea {
  border-radius: 10px;
  background: #f5f3e9;
  min-height: 160px;
}
main > small {
  font-size: 10px;
  color: #77746d;
}
.specimen-note {
  font-size: 9px;
  border-color: #c7c8bb;
}
.specimen-note button {
  font-size: 9px;
  border-radius: 4px;
}
@media (max-width: 600px) {
  header {
    padding: 25px 23px;
  }
  main {
    padding: 20px 23px 80px;
    min-height: 850px;
  }
  .quiet-mark {
    margin-bottom: 35px;
    width: 125px;
    height: 110px;
  }
  h1 {
    font-size: 29px;
    line-height: 1.45;
  }
  main > p {
    font-size: 13px;
  }
  .activities > button {
    gap: 14px;
  }
  .activities > button > div {
    font-size: 16px;
  }
  .activities small {
    font-size: 10px;
  }
  .eyebrow {
    font-size: 8px;
  }
  .practice-copy {
    font-size: 21px !important;
  }
}
.eyebrow {
  font: 400 13px/1.7 'DM Sans';
  letter-spacing: 0.03em;
  text-transform: none;
}
</style>
