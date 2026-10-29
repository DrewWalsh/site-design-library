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
    .filter((k) => k.startsWith('design-library:34:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const labels = ref(true),
  answer = ref('');
</script>
<template>
  <div class="specimen" :class="{ entry: state === 'start' }">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>explain it<br /><span>slowly.</span></strong>
      <nav>
        <button @click="go('index')">The lessons</button
        ><button @click="go('start')">This lesson</button><span>A SMALL IDEA, CLEARLY DRAWN.</span>
      </nav>
    </header>
    <main id="content">
      <aside>
        <p class="eyebrow">Lesson 01 / a little lever</p>
        <button @click="go('start')"><b>01</b> Look at the parts</button
        ><button @click="labels = !labels"><b>02</b> Follow the forces</button
        ><button @click="go('practice')"><b>03</b> Make a prediction</button>
        <p class="handwritten">One thing at a time.↗</p>
      </aside>
      <section v-if="state !== 'index'" class="lesson">
        <p class="eyebrow">Simple machines / 6 minutes</p>
        <h1>
          {{ state === 'practice' ? 'What happens next?' : 'Notebook 01 / A little lever' }}
        </h1>
        <p>
          A lever changes what a force can do. Let’s look at the relationship between the load, the
          pivot, and where you push.
        </p>
        <figure class="drawing">
          <svg
            viewBox="0 0 800 400"
            role="img"
            aria-label="A lever rests on a triangular pivot. A load is on the left. A downward force is applied on the longer right arm."
          >
            <path d="M60 325Q300 330 740 323" fill="none" stroke="#697784" stroke-width="2" />
            <path d="M280 320L340 205L405 320Z" fill="#d7d7c8" stroke="#37414a" stroke-width="3" />
            <path
              d="M100 205Q400 195 700 205L700 222Q400 210 100 221Z"
              fill="#e3c18a"
              stroke="#37414a"
              stroke-width="3"
            />
            <rect
              x="125"
              y="140"
              width="75"
              height="62"
              rx="4"
              fill="#aec6d8"
              stroke="#37414a"
              stroke-width="3"
            />
            <path
              d="M650 75L650 175M635 155L650 175L668 157"
              fill="none"
              stroke="#b65043"
              stroke-width="5"
              stroke-linecap="round"
            />
            <g v-if="labels" font-family="Caveat, cursive" font-size="25" fill="#315b9a">
              <text x="70" y="55" fill="#aa443b">more force?</text>
              <path d="M65 46L205 65" stroke="#aa443b" stroke-width="2" />
              <text x="220" y="56">try more distance ↘</text>
              <text x="60" y="105">01 / THE LOAD</text>
              <path d="M160 115L160 133" stroke="#315b9a" stroke-width="2" />
              <text x="310" y="365">02 / THE PIVOT</text>
              <text x="470" y="50">03 / YOUR PUSH</text>
            </g>
          </svg>
          <figcaption>
            A rigid bar turns around a fixed point. This original diagram is a conceptual teaching
            model.
          </figcaption>
          <span class="margin-note">The longer arm<br />does more with less.</span>
        </figure>
        <button class="labels" :aria-pressed="labels" @click="labels = !labels">
          {{ labels ? 'Hide' : 'Show' }} diagram labels</button
        ><template v-if="state === 'start'"
          ><div class="steps">
            <article>
              <span>01</span>
              <h2>Find the pivot.</h2>
              <p>
                The triangular support is the point the bar turns around. It stays in place while
                the ends move.
              </p>
            </article>
            <article>
              <span>02</span>
              <h2>Compare the arms.</h2>
              <p>
                Your push acts farther from the pivot than the load does. That distance changes the
                turning effect.
              </p>
            </article>
          </div>
          <button class="primary" @click="go('practice')">Try a prediction →</button></template
        ><template v-else
          ><h2>If you push the right end down…</h2>
          <div class="answers">
            <button
              v-for="a in ['The load rises', 'The load falls', 'Nothing moves']"
              :key="a"
              @click="answer = a"
            >
              {{ a }}
            </button>
          </div>
          <div v-if="answer" class="feedback" role="status">
            <h3>
              {{ answer === 'The load rises' ? 'That’s the idea.' : 'Let’s follow the movement.' }}
            </h3>
            <p>
              The bar turns around the pivot. As the right end moves down, the left end moves up,
              lifting the load. A longer arm increases the turning effect for a given force.
            </p>
            <button @click="answer = ''">Try again</button>
          </div></template
        >
      </section>
      <section v-else class="index">
        <p class="eyebrow">The lesson shelf</p>
        <h1>Small mechanisms.<br />Big questions.</h1>
        <button
          v-for="(l, i) in [
            'A little lever',
            'The path of a force',
            'What changes when you move the pivot?',
          ]"
          :key="l"
          @click="go(i === 0 ? 'start' : 'practice')"
        >
          <span>0{{ i + 1 }}</span>
          <h2>{{ l }}</h2>
          <b>→</b>
        </button>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Explain It Slowly · Fictional sample content · Design reference 34</span
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
@font-face {
  font-family: 'Caveat';
  src: url('/fonts/caveat.woff2') format('woff2');
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
  gap: 25px;
  padding: 25px 5%;
  border-bottom: 1px solid #bdc2b7;
}
header strong {
  font: 22px/1 'Space Grotesk';
  font-weight: 600;
}
header strong span {
  font: 31px 'Caveat';
  color: #315b9a;
}
nav {
  display: flex;
  align-items: center;
  gap: 30px;
  font-size: 10px;
}
nav button {
  background: none;
  border: 0;
  font-size: 11px;
}
main {
  display: grid;
  grid-template-columns: 210px 1fr;
  gap: 70px;
  max-width: 1350px;
  margin: auto;
  padding: 45px 5% 90px;
}
aside {
  padding-top: 20px;
}
aside .eyebrow {
  font-size: 9px;
}
aside > button {
  display: flex;
  gap: 15px;
  align-items: center;
  width: 100%;
  background: none;
  border: 0;
  border-top: 1px solid #bdc2b7;
  padding: 20px 0;
  text-align: left;
  font-size: 11px;
}
aside b {
  color: #315b9a;
  font-size: 15px;
}
.handwritten {
  font: 25px 'Caveat';
  color: #315b9a;
  transform: rotate(-5deg);
  margin-top: 60px;
}
.lesson h1 {
  font-size: 55px;
  line-height: 1.1;
  white-space: pre-line;
  font-weight: 500;
}
.lesson > p {
  font-size: 15px;
  line-height: 1.9;
}
.drawing {
  position: relative;
  margin: 35px 0 10px;
  background: repeating-linear-gradient(0deg, transparent 0 31px, #d8dbcc 31px 32px);
  border: 1px solid #bdc2b7;
  padding: 20px 15px;
}
.drawing svg {
  width: 100%;
  display: block;
}
.drawing figcaption {
  font-size: 10px;
  padding: 5px 15px;
}
.margin-note {
  position: absolute;
  bottom: 65px;
  right: 20px;
  font: 23px/1 'Caveat';
  color: #315b9a;
  transform: rotate(-6deg);
}
.labels {
  background: none;
  border: 0;
  padding: 10px 0;
  font-size: 11px;
  color: #315b9a;
  text-decoration: underline;
}
.steps {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 45px;
  margin: 35px 0;
}
.steps article > span {
  font: 25px 'Caveat';
  color: #315b9a;
}
.steps h2 {
  font-size: 25px;
}
.steps p {
  font-size: 13px;
  line-height: 1.9;
}
.lesson > .primary {
  font-size: 12px;
  padding: 15px 25px;
}
.answers {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin: 25px 0;
}
.answers button {
  font-size: 12px;
  background: #f6f7eb;
  border: 2px solid #7e97aa;
  padding: 15px 20px;
}
.feedback {
  padding: 25px;
  border: 2px solid #779570;
  background: #e7edda;
}
.feedback h3 {
  font-size: 24px;
}
.feedback p {
  font-size: 14px;
}
.feedback button {
  font-size: 11px;
}
.index h1 {
  font-size: 55px;
}
.index > button {
  display: flex;
  align-items: center;
  gap: 30px;
  background: none;
  border: 0;
  border-top: 1px solid #bdc2b7;
  width: 100%;
  text-align: left;
  padding: 25px 0;
}
.index h2 {
  font-size: 29px;
  flex: 1;
}
.index > button > span {
  font: 25px 'Caveat';
  color: #315b9a;
}
@media (max-width: 700px) {
  nav > span {
    display: none;
  }
  main {
    grid-template-columns: 150px 1fr;
    gap: 30px;
  }
  .lesson h1 {
    font-size: 43px;
  }
  .margin-note {
    display: none;
  }
}
@media (max-width: 600px) {
  header {
    padding: 20px;
  }
  nav {
    gap: 15px;
  }
  main {
    display: block;
    padding: 25px 6% 60px;
  }
  aside {
    padding: 0;
    margin-bottom: 25px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  aside .eyebrow {
    width: 100%;
    margin: 0;
  }
  aside > button {
    width: auto;
    flex: 1;
    font-size: 9px;
    gap: 7px;
    line-height: 1.5;
  }
  aside b {
    font-size: 12px;
  }
  .handwritten {
    display: none;
  }
  .lesson h1 {
    font-size: 37px;
  }
  .lesson > p {
    font-size: 13px;
  }
  .drawing {
    padding: 12px 5px;
  }
  .drawing figcaption {
    font-size: 9px;
  }
  .steps {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  .steps h2 {
    font-size: 23px;
  }
  .index h1 {
    font-size: 38px;
  }
  .index h2 {
    font-size: 23px;
  }
  .index > button {
    gap: 18px;
  }
}
.eyebrow {
  font:
    500 20px/1.4 'Caveat',
    cursive;
  letter-spacing: 0;
  text-transform: none;
}

/* The entry is the experience itself; supporting routes retain its vocabulary. */

.entry {
  background: #d6d3c5;
  padding: 25px 4%;
  position: relative;
}
.entry header {
  padding: 0 0 20px;
  border: 0;
  max-width: none;
  width: 100%;
  margin: 0;
  align-items: center;
}
.entry header strong {
  font:
    28px/1 'Caveat',
    cursive;
  transform: rotate(-5deg);
}
.entry header strong span {
  font-size: 35px;
}
.entry header nav {
  font-size: 11px;
}
.entry header nav > span {
  display: none;
}
.entry main {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 30px 5% 60px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 155px;
  gap: 30px;
  background: #f7f0de;
  background-image: linear-gradient(#315b9a0d 1px, transparent 1px);
  background-size: 100% 32px;
  box-shadow: 8px 10px 0 #b8b4a4;
}
.entry main > aside {
  grid-column: 2;
  grid-row: 1;
  padding: 0;
  border: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
}
.entry main > aside > p:first-child {
  display: none;
}
.entry main > aside button {
  width: 100%;
  padding: 15px 12px;
  white-space: normal;
  display: block;
  text-align: left;
  line-height: 1.5;
  font-size: 12px;
  min-width: 0;
  background: #e4d6b3;
  border: 0;
  border-radius: 0 12px 12px 0;
  transform: rotate(2deg);
}
.entry main > aside button:nth-of-type(2) {
  background: #c9dbe0;
  transform: rotate(-3deg);
}
.entry main > aside button:nth-of-type(3) {
  background: #e2bbab;
}
.entry main > aside button b {
  font-size: 24px;
  display: block;
  margin-bottom: 10px;
}
.entry .handwritten {
  font:
    25px/1.1 'Caveat',
    cursive;
}
.entry .lesson {
  grid-column: 1;
  grid-row: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.entry .lesson > .eyebrow {
  order: 0;
  font-size: 10px;
}
.entry .lesson h1 {
  order: 1;
  font:
    42px/1.1 'Caveat',
    cursive;
  letter-spacing: 0;
  margin: 0 0 15px;
  max-width: none;
}
.entry .drawing {
  order: 2;
  margin: 0;
  position: relative;
}
.entry .drawing svg {
  height: 450px;
  width: 100%;
}
.entry .drawing figcaption {
  font-size: 11px;
  max-width: 55ch;
}
.entry .margin-note {
  font:
    28px/1.1 'Caveat',
    cursive;
  right: 3%;
  bottom: 80px;
  transform: rotate(-8deg);
}
.entry .lesson > .labels {
  order: 3;
  align-self: flex-start;
  font-size: 11px;
  margin: 20px 0;
}
.entry .lesson > p:not(.eyebrow) {
  order: 4;
  font-size: 16px;
  max-width: 58ch;
  line-height: 1.9;
}
.entry .steps {
  order: 5;
}
.entry .lesson > .primary {
  order: 6;
  align-self: flex-start;
  background: #315b9a;
  color: white;
  border-radius: 0;
  transform: rotate(-2deg);
  padding: 16px 30px;
}
@media (max-width: 750px) {
  .entry {
    padding: 20px 4%;
  }
  .entry header {
    gap: 18px;
  }
  .entry header nav {
    font-size: 10px;
    gap: 12px;
  }
  .entry main {
    display: flex;
    flex-direction: column;
    padding: 25px 7%;
    gap: 20px;
  }
  .entry main > aside {
    order: 2;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
  }
  .entry main > aside button {
    flex: 1 1 110px;
    width: auto;
    min-width: 100px;
    font-size: 11px;
    padding: 12px;
  }
  .entry main > aside button b {
    font-size: 20px;
    margin-bottom: 5px;
  }
  .entry main > aside .handwritten {
    width: 100%;
    font-size: 25px;
  }
  .entry .lesson {
    order: 1;
  }
  .entry .lesson h1 {
    font-size: 34px;
  }
  .entry .drawing svg {
    height: 280px;
  }
  .entry .margin-note {
    font-size: 21px;
    position: static;
    display: block;
    text-align: right;
    margin: 12px 0;
  }
  .entry .drawing figcaption {
    font-size: 10px;
  }
  .entry .lesson > p:not(.eyebrow) {
    font-size: 14px;
  }
  .entry .steps {
    display: block;
  }
  .entry .steps article {
    margin: 20px 0;
  }
}
@media (max-width: 750px) {
  main > aside button {
    min-width: 100px;
    flex: 1 1 110px;
    width: auto;
    white-space: normal;
  }
  main > aside {
    flex-wrap: wrap;
    gap: 10px;
  }
}
</style>
