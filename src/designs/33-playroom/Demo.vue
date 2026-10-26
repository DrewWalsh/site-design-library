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
    .filter((k) => k.startsWith('design-library:33:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const parts = ['Power', 'Switch', 'Lamp'];
const slots = ref<string[]>(['', '', '']),
  activeSlot = ref(0),
  saved = useStored<string[]>('33:machine', []),
  running = ref(false);
function place(part: string) {
  slots.value[activeSlot.value] = part;
  running.value = false;
  message.value = 'Placed ' + part + ' in slot ' + (activeSlot.value + 1);
}
function run() {
  running.value = slots.value.join(',') === 'Power,Switch,Lamp';
  message.value = running.value
    ? 'It lights up! Power flows through the switch to the lamp.'
    : 'Not quite. Place Power, Switch, and Lamp in that order, then try again.';
}
function restore() {
  slots.value = [...saved.value];
  go('start');
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>little machine<br /><span>LAB.</span></strong>
      <nav>
        <button @click="go('start')">The workbench</button
        ><button @click="go('library')">Parts library</button
        ><button @click="go('saved')">Saved build</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><div class="intro">
          <p class="eyebrow">EXPERIMENT 01 / FOLLOW THE ENERGY</p>
          <h1>Make something<br />happen.</h1>
          <p>Three parts. Three slots. One little light.</p>
        </div>
        <div class="instructions">
          <b>1. Choose a slot.</b><span>2. Add a part below.</span><span>3. Run your machine.</span>
        </div>
        <section class="tabletop">
          <div class="machine">
            <button
              v-for="(slot, i) in slots"
              :key="i"
              :class="['slot', { active: activeSlot === i, lit: running && i === 2 }]"
              @click="activeSlot = i"
            >
              <small>SLOT 0{{ i + 1 }}</small
              ><span class="object">{{
                slot === 'Power' ? '▥' : slot === 'Switch' ? '⊖' : slot === 'Lamp' ? '☼' : '+'
              }}</span
              ><strong>{{ slot || 'Add a part' }}</strong>
            </button>
          </div>
          <div class="wire" aria-hidden="true"></div>
          <div class="result" role="status">
            <span :class="{ on: running }"></span
            >{{ message || 'Your machine is waiting for its first part.' }}
          </div>
        </section>
        <section class="tool-shelf">
          <div>
            <p class="eyebrow">PARTS SHELF</p>
            <h2>Choose a part<br />for slot {{ activeSlot + 1 }}.</h2>
          </div>
          <button v-for="part in parts" :key="part" @click="place(part)">
            <span>{{ part === 'Power' ? '▥' : part === 'Switch' ? '⊖' : '☼' }}</span
            >{{ part }} +
          </button>
        </section>
        <div class="actions">
          <button class="primary" @click="run">▶ Run the machine</button
          ><button
            @click="
              saved = [...slots];
              message = 'Construction saved in this browser.';
            "
          >
            Save construction</button
          ><button
            @click="
              slots = ['', '', ''];
              running = false;
              message = '';
            "
          >
            Clear the table
          </button>
        </div>
        <section class="explain">
          <h2>A small cause. A visible effect.</h2>
          <p>
            The power source supplies energy. The switch completes the path. The lamp turns that
            energy into light. This fixed demonstration is a visual learning model, not an
            electrical wiring guide.
          </p>
        </section></template
      >
      <section v-else-if="state === 'library'" class="library">
        <p class="eyebrow">MEET THE PARTS</p>
        <h1>Every piece<br />has a job.</h1>
        <article v-for="(part, i) in parts" :key="part">
          <span>{{ ['▥', '⊖', '☼'][i] }}</span>
          <div>
            <h2>{{ part }}</h2>
            <p>
              {{
                [
                  'The starting point. It gives the machine something to work with.',
                  'The decision point. It completes the path between power and light.',
                  'The result. It lets you see that the machine has a complete path.',
                ][i]
              }}
            </p>
          </div>
          <button
            @click="
              go('start');
              place(part);
            "
          >
            Use this part
          </button>
        </article>
      </section>
      <section v-else class="saved">
        <p class="eyebrow">YOUR WORK, KEPT</p>
        <h1>A little invention.</h1>
        <p v-if="!saved.length">
          No construction saved yet. Make something on the workbench, then save it.
        </p>
        <div v-else>
          <div class="saved-parts">
            <span v-for="(part, i) in saved" :key="i">{{ part || 'Empty slot' }}</span>
          </div>
          <p>
            {{
              saved.every(Boolean)
                ? 'All three slots have a part.'
                : 'This machine is incomplete. Open it to keep building.'
            }}
          </p>
          <button class="primary" @click="restore">Open this construction →</button>
        </div>
        <button @click="go('start')">Back to the workbench</button>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Little Machine Lab · Fictional sample content · Design reference 33</span
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
  justify-content: space-between;
  align-items: center;
  padding: 25px 5%;
  gap: 25px;
}
header strong {
  font: 22px/1 'Space Grotesk';
  font-weight: 700;
}
header strong span {
  font-size: 29px;
}
nav {
  display: flex;
  gap: 25px;
}
nav button {
  font-size: 11px;
  background: none;
  border: 0;
}
main {
  max-width: 1300px;
  margin: auto;
  padding: 30px 5% 80px;
}
.intro {
  text-align: center;
}
.intro h1 {
  font-size: 64px;
  line-height: 1.08;
  margin: 22px 0;
}
.intro > p:last-child {
  margin: 0 auto;
  font-size: 16px;
}
.instructions {
  display: flex;
  justify-content: center;
  gap: 35px;
  margin: 35px 0 25px;
  font-size: 12px;
}
.tabletop {
  background: #e1d2b1;
  border: 2px solid #b3a17e;
  border-radius: 24px;
  padding: 45px 50px 25px;
  box-shadow: 0 8px 0 #b9a989;
  position: relative;
}
.machine {
  display: flex;
  justify-content: space-between;
  gap: 70px;
  position: relative;
  z-index: 1;
}
.slot {
  flex: 1;
  display: grid;
  justify-items: center;
  gap: 15px;
  background: #f8edd6;
  border: 3px solid #b0a180;
  border-radius: 18px;
  box-shadow: inset 0 4px 0 #c9b996;
  min-height: 220px;
  padding: 20px;
}
.slot small {
  font-size: 9px;
  letter-spacing: 0.13em;
  color: #595b47;
}
.slot .object {
  font-size: 70px;
  line-height: 1;
  color: #6d876f;
}
.slot strong {
  font: 19px 'Space Grotesk';
}
.slot.active {
  outline: 3px solid #467592;
  outline-offset: 5px;
}
.slot.lit {
  background: #f3da8c;
}
.slot.lit .object {
  color: #9c5c11;
}
.wire {
  height: 6px;
  background: #8e8065;
  position: absolute;
  left: 15%;
  right: 15%;
  top: 155px;
}
.result {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 30px;
  font-size: 12px;
  min-height: 35px;
}
.result > span {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #9c967c;
  flex-shrink: 0;
}
.result > span.on {
  background: #466d38;
}
.tool-shelf {
  display: flex;
  align-items: center;
  gap: 25px;
  padding: 45px 0 30px;
}
.tool-shelf > div {
  flex: 1;
}
.tool-shelf h2 {
  font-size: 24px;
  line-height: 1.25;
  margin: 0;
}
.tool-shelf button {
  font-size: 12px;
  min-width: 140px;
  padding: 15px;
  background: #dbe6de;
  border: 2px solid #9cae9b;
  box-shadow: 0 4px #9cae9b;
}
.tool-shelf button:nth-of-type(2) {
  background: #d5e2ec;
  border-color: #8da9b7;
  box-shadow: 0 4px #8da9b7;
}
.tool-shelf button:nth-of-type(3) {
  background: #f0dca6;
  border-color: #baa16a;
  box-shadow: 0 4px #baa16a;
}
.tool-shelf button > span {
  font-size: 34px;
  display: block;
  margin-bottom: 8px;
}
.actions {
  display: flex;
  gap: 18px;
  justify-content: center;
  padding: 20px 0;
}
.actions button {
  font-size: 12px;
  padding: 14px 23px;
}
.explain {
  border-top: 1px solid var(--line);
  padding-top: 30px;
  margin-top: 40px;
}
.explain h2 {
  font-size: 30px;
}
.explain p {
  font-size: 14px;
}
.library,
.saved {
  padding: 25px 0 150px;
}
.library h1,
.saved h1 {
  font-size: 64px;
}
.library article {
  display: flex;
  gap: 40px;
  align-items: center;
  border-top: 1px solid var(--line);
  padding: 30px 0;
}
.library article > span {
  font-size: 70px;
  color: #5b7665;
}
.library article > div {
  flex: 1;
}
.library article h2 {
  font-size: 30px;
}
.library article p {
  font-size: 14px;
}
.library article button {
  font-size: 12px;
}
.saved-parts {
  display: flex;
  gap: 20px;
  margin: 35px 0;
}
.saved-parts span {
  background: #e2d6b9;
  padding: 35px;
  border-radius: 15px;
}
.saved button {
  margin: 15px 20px 15px 0;
}
@media (max-width: 650px) {
  header {
    display: block;
    padding: 22px;
  }
  nav {
    gap: 12px;
    margin-top: 20px;
  }
  nav button {
    font-size: 10px;
  }
  .intro h1 {
    font-size: 46px;
  }
  .instructions {
    display: block;
    font-size: 11px;
    line-height: 2;
  }
  .instructions > * {
    display: block;
  }
  .tabletop {
    padding: 25px 20px 20px;
    border-radius: 18px;
  }
  .machine {
    flex-direction: column;
    gap: 20px;
  }
  .slot {
    display: flex;
    justify-content: space-between;
    min-height: 95px;
    padding: 20px;
    gap: 15px;
  }
  .slot small {
    font-size: 8px;
  }
  .slot .object {
    font-size: 40px;
  }
  .slot strong {
    font-size: 16px;
    min-width: 90px;
  }
  .wire {
    display: none;
  }
  .result {
    font-size: 11px;
  }
  .tool-shelf {
    flex-wrap: wrap;
    gap: 12px;
  }
  .tool-shelf > div {
    min-width: 100%;
  }
  .tool-shelf button {
    min-width: 0;
    flex: 1;
    padding: 12px;
    font-size: 10px;
  }
  .actions {
    flex-wrap: wrap;
    gap: 12px;
  }
  .actions .primary {
    width: 100%;
  }
  .actions button {
    padding: 12px;
    font-size: 10px;
  }
  .library h1,
  .saved h1 {
    font-size: 46px;
  }
  .library article {
    flex-wrap: wrap;
    gap: 20px;
  }
  .library article > span {
    font-size: 50px;
  }
  .library article > div {
    min-width: 65%;
  }
  .saved-parts {
    flex-wrap: wrap;
  }
  .saved-parts span {
    padding: 20px;
  }
}
</style>
