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
    .filter((k) => k.startsWith('design-library:19:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const answers = ref<string[]>([]),
  free = ref('');
const questions = [
  'What brings you in today?',
  'How long would you like to stay?',
  'What kind of space helps you work?',
];
const choices = [
  ['Focused work', 'A team session', 'A change of scenery'],
  ['A few hours', 'The whole day'],
  ['Somewhere quiet', 'A little background energy'],
];
function choose(s: string) {
  answers.value.push(s);
  message.value = '';
  if (answers.value.length === 3) go('summary');
}
function restart() {
  answers.value = [];
  message.value = '';
  go('start');
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>◔ Desk Guide</strong><span>Your next working day, worked out.</span>
      <nav>
        <button @click="go('browse')">Browse spaces</button
        ><button @click="restart">Start again</button>
      </nav>
    </header>
    <main id="content">
      <section class="conversation">
        <p class="eyebrow">COMMON GROUND / FIND YOUR PLACE</p>
        <h1>A good place<br />to get things done.</h1>
        <template v-if="state === 'start'"
          ><div class="exchange">
            <span class="guide-avatar">cg</span>
            <div>
              <p>Hi. Let’s find a workspace that suits your day.</p>
              <p>I’ll ask three short questions. This is a scripted guide using sample spaces.</p>
            </div>
          </div>
          <div v-for="(answer, i) in answers" :key="i" class="answered">
            <p>{{ questions[i] }}</p>
            <div>
              {{ answer }}
              <button @click="answers = answers.slice(0, i)" :aria-label="'Change ' + questions[i]">
                Edit
              </button>
            </div>
          </div>
          <div class="current">
            <span class="guide-avatar">cg</span>
            <h2>{{ questions[Math.min(answers.length, 2)] }}</h2>
          </div>
          <div class="choices">
            <button
              v-for="choice in choices[Math.min(answers.length, 2)]"
              :key="choice"
              @click="choose(choice)"
            >
              {{ choice }} →
            </button>
          </div>
          <details>
            <summary>I have something else in mind</summary>
            <form
              @submit.prevent="
                message =
                  'This guide uses the choices above. For something else, browse the full list of spaces.'
              "
            >
              <label
                >Tell us briefly<input
                  v-model="free"
                  required
                  placeholder="Type a sample response" /></label
              ><button>Try response</button>
            </form>
            <p v-if="message" role="status">{{ message }}</p>
          </details></template
        ><template v-else-if="state === 'summary'"
          ><div class="exchange">
            <span class="guide-avatar">cg</span>
            <p>Based on your answers, the Reading Room could be a good fit.</p>
          </div>
          <div class="recommendation">
            <p class="eyebrow">YOUR SAMPLE RECOMMENDATION</p>
            <h2>The Reading Room</h2>
            <p>A quiet desk, a proper lamp, and a window onto the courtyard.</p>
            <ul>
              <li>Day access: £18 sample price</li>
              <li>Open 08:00–18:00</li>
              <li>Step-free entrance and accessible toilet</li>
            </ul>
            <button
              class="primary"
              @click="
                message = 'Your sample selection is saved for this page. No booking was made.'
              "
            >
              Choose this space
            </button>
            <p v-if="message" role="status">{{ message }}</p>
          </div>
          <button @click="go('browse')">See every workspace →</button></template
        ><template v-else
          ><p>Prefer to choose directly? The same information is here.</p>
          <article
            v-for="(space, i) in ['The Reading Room', 'The Long Table', 'The Workshop']"
            :key="space"
            class="space"
          >
            <p class="eyebrow">0{{ i + 1 }} / {{ ['QUIET', 'SOCIAL', 'COLLABORATIVE'][i] }}</p>
            <h2>{{ space }}</h2>
            <p>
              {{
                [
                  'A quiet desk and courtyard view. Best for focused solo work.',
                  'Shared tables and background conversation. Best for a change of scenery.',
                  'A room for up to six people, with a whiteboard. Best for a team session.',
                ][i]
              }}
            </p>
            <p>08:00–18:00 · Step-free entry · Sample prices from £18</p>
            <button
              @click="
                answers = ['Focused work', 'The whole day', 'Somewhere quiet'];
                go('summary');
              "
            >
              Explore a sample recommendation →
            </button>
          </article></template
        >
      </section>
      <aside>
        <p class="eyebrow">YOUR DAY, SO FAR</p>
        <div v-for="(label, i) in ['Purpose', 'Time', 'Atmosphere']" :key="label">
          <small>0{{ i + 1 }} / {{ label.toUpperCase() }}</small>
          <p>{{ answers[i] || 'Still to decide' }}</p>
          <button
            v-if="answers[i]"
            @click="
              answers = answers.slice(0, i);
              go('start');
            "
          >
            Change
          </button>
        </div>
        <p class="aside-note">
          Nothing is booked until you choose. In this reference, all selections are local
          demonstrations.
        </p>
      </aside>
    </main>
    <footer class="specimen-note">
      <span>Desk Guide · Fictional sample content · Design reference 19</span
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
  align-items: center;
  gap: 30px;
  padding: 25px 6%;
  border-bottom: 1px solid var(--line);
}
header strong {
  font-size: 23px;
}
header > span {
  font-size: 11px;
  color: #546772;
}
nav {
  margin-left: auto;
  display: flex;
  gap: 20px;
}
nav button {
  background: none;
  border: 0;
  font-size: 11px;
}
main {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 100px;
  padding: 55px 5% 100px;
}
.conversation h1 {
  font-size: 48px;
  font-weight: 500;
  line-height: 1.15;
  margin: 20px 0 45px;
}
.exchange {
  display: flex;
  gap: 18px;
  align-items: start;
  margin: 30px 0;
}
.guide-avatar {
  background: #dee9e5;
  color: #466a59;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  font-size: 12px;
}
.exchange p {
  font-size: 14px;
  margin: 0 0 12px;
}
.current {
  display: flex;
  gap: 18px;
  align-items: center;
  margin-top: 40px;
}
.current h2 {
  font-size: 23px;
  font-weight: 500;
  line-height: 1.35;
  margin: 0;
}
.choices {
  display: grid;
  gap: 12px;
  margin: 25px 0 35px 54px;
}
.choices button {
  padding: 18px;
  text-align: left;
  border-color: #bbced8;
  color: #345d73;
  background: #f4f8f9;
  font-size: 14px;
}
.answered {
  margin: 30px 0;
  border-bottom: 1px solid var(--line);
  padding-bottom: 25px;
}
.answered > p {
  font-size: 13px;
}
.answered > div {
  background: #e2ecf3;
  padding: 16px 20px;
  border-radius: 12px 12px 0 12px;
  margin-left: 50px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}
.answered button {
  background: none;
  border: 0;
  padding: 0;
  font-size: 10px;
  min-height: 20px;
}
aside {
  padding-top: 125px;
}
aside > div {
  padding: 22px 0;
  border-bottom: 1px solid var(--line);
}
aside small {
  font-size: 9px;
  color: #576770;
}
aside p {
  font-size: 14px;
  margin: 10px 0;
}
aside button {
  border: 0;
  padding: 0;
  background: none;
  font-size: 10px;
  text-decoration: underline;
  min-height: 25px;
}
.aside-note {
  font-size: 11px;
  line-height: 1.8;
  color: #596973;
  margin-top: 30px;
}
details {
  font-size: 12px;
  margin-left: 54px;
}
form {
  display: grid;
  gap: 15px;
  margin-top: 20px;
}
.recommendation {
  padding: 30px;
  border: 1px solid #c4d3c9;
  background: #edf1e6;
  border-radius: 12px;
  margin: 30px 0;
}
.recommendation h2 {
  font-size: 33px;
}
.recommendation p,
.recommendation li {
  font-size: 14px;
}
.space {
  padding: 30px 0;
  border-top: 1px solid var(--line);
}
.space h2 {
  font-size: 29px;
}
.space p {
  font-size: 14px;
}
.space button {
  font-size: 12px;
}
@media (max-width: 750px) {
  header > span {
    display: none;
  }
  main {
    gap: 40px;
    grid-template-columns: 1fr 180px;
  }
}
@media (max-width: 600px) {
  header {
    padding: 20px;
    flex-wrap: wrap;
    gap: 10px;
  }
  header strong {
    font-size: 21px;
  }
  nav {
    gap: 12px;
  }
  nav button {
    font-size: 10px;
  }
  main {
    display: block;
    padding: 35px 22px 60px;
  }
  .conversation h1 {
    font-size: 37px;
  }
  .current h2 {
    font-size: 20px;
  }
  .choices {
    margin-left: 0;
  }
  .choices button {
    font-size: 13px;
  }
  details {
    margin-left: 0;
  }
  aside {
    padding-top: 40px;
  }
  .recommendation {
    padding: 22px;
  }
}
</style>
