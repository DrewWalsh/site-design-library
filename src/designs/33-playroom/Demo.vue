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
  <div class="specimen" :class="{ entry: state === 'start' }">
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
        ><h1 class="sr">Little Machine Lab: build a working light circuit</h1>
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
              ><svg class="part-picture" viewBox="0 0 120 110" aria-hidden="true">
                <g v-if="slot === 'Power'">
                  <rect x="38" y="5" width="44" height="12" rx="4" fill="#3b3e37" />
                  <rect
                    x="22"
                    y="15"
                    width="76"
                    height="90"
                    rx="12"
                    fill="#d95239"
                    stroke="#3b3e37"
                    stroke-width="4"
                  />
                  <path d="M22 60H98" stroke="#3b3e37" stroke-width="4" />
                  <path d="M50 37H70M60 27V47" stroke="#fff3cf" stroke-width="5" />
                  <path d="M50 82H70" stroke="#fff3cf" stroke-width="5" />
                </g>
                <g v-else-if="slot === 'Switch'">
                  <rect
                    x="10"
                    y="22"
                    width="100"
                    height="72"
                    rx="18"
                    fill="#7fa3c4"
                    stroke="#3b3e37"
                    stroke-width="4"
                  />
                  <circle cx="60" cy="58" r="23" fill="#f4ead2" stroke="#3b3e37" stroke-width="4" />
                  <path
                    d="M60 60L82 20"
                    stroke="#3b3e37"
                    stroke-width="12"
                    stroke-linecap="round"
                  />
                </g>
                <g v-else-if="slot === 'Lamp'">
                  <path
                    d="M36 76C36 62 17 54 24 31C32 3 88 3 96 31C103 54 84 62 84 76Z"
                    fill="#f3ce5b"
                    stroke="#3b3e37"
                    stroke-width="4"
                  />
                  <path d="M42 80H78M42 90H78M49 100H71" stroke="#3b3e37" stroke-width="6" />
                  <path
                    d="M50 75L43 40 60 50 77 40 70 75"
                    fill="none"
                    stroke="#a4712a"
                    stroke-width="3"
                  />
                </g>
                <g v-else fill="none" stroke="#777d72" stroke-width="3">
                  <circle cx="60" cy="56" r="38" stroke-dasharray="5 7" />
                  <path d="M40 56H80M60 36V76" />
                </g></svg
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
            <h2>Add to slot {{ activeSlot + 1 }}</h2>
          </div>
          <button v-for="part in parts" :key="part" @click="place(part)">
            <svg class="part-picture" viewBox="0 0 120 110" aria-hidden="true">
              <g v-if="part === 'Power'">
                <rect x="38" y="5" width="44" height="12" rx="4" fill="#3b3e37" />
                <rect
                  x="22"
                  y="15"
                  width="76"
                  height="90"
                  rx="12"
                  fill="#d95239"
                  stroke="#3b3e37"
                  stroke-width="4"
                />
                <path d="M22 60H98" stroke="#3b3e37" stroke-width="4" />
                <path d="M50 37H70M60 27V47" stroke="#fff3cf" stroke-width="5" />
                <path d="M50 82H70" stroke="#fff3cf" stroke-width="5" />
              </g>
              <g v-else-if="part === 'Switch'">
                <rect
                  x="10"
                  y="22"
                  width="100"
                  height="72"
                  rx="18"
                  fill="#7fa3c4"
                  stroke="#3b3e37"
                  stroke-width="4"
                />
                <circle cx="60" cy="58" r="23" fill="#f4ead2" stroke="#3b3e37" stroke-width="4" />
                <path d="M60 60L82 20" stroke="#3b3e37" stroke-width="12" stroke-linecap="round" />
              </g>
              <g v-else-if="part === 'Lamp'">
                <path
                  d="M36 76C36 62 17 54 24 31C32 3 88 3 96 31C103 54 84 62 84 76Z"
                  fill="#f3ce5b"
                  stroke="#3b3e37"
                  stroke-width="4"
                />
                <path d="M42 80H78M42 90H78M49 100H71" stroke="#3b3e37" stroke-width="6" />
                <path
                  d="M50 75L43 40 60 50 77 40 70 75"
                  fill="none"
                  stroke="#a4712a"
                  stroke-width="3"
                />
              </g>
              <g v-else fill="none" stroke="#777d72" stroke-width="3">
                <circle cx="60" cy="56" r="38" stroke-dasharray="5 7" />
                <path d="M40 56H80M60 36V76" />
              </g></svg
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

/* The entry is the experience itself; supporting routes retain its vocabulary. */

.entry {
  background: #7ca9a6;
  padding: 25px;
}
.entry header {
  max-width: none;
  width: 100%;
  margin: 0;
  padding: 0 15px 25px;
  border: 0;
  align-items: center;
}
.entry header strong {
  font-size: 18px;
  line-height: 1;
}
.entry header strong span {
  font-size: 38px;
}
.entry header nav {
  font-size: 12px;
  gap: 15px;
}
.entry main {
  max-width: none;
  margin: 0;
  width: 100%;
  padding: 25px;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 25px;
  background: #d8b681;
  border: 7px solid #715b41;
  border-radius: 35px;
  box-shadow: 0 15px 0 #4b4436;
}
.entry main > h1 {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip-path: inset(50%) !important;
  white-space: nowrap !important;
}
.entry .instructions {
  grid-column: 1/3;
  padding: 12px 20px;
  background: #594b3c;
  color: #fff3d7;
  border-radius: 12px;
  display: flex;
  justify-content: space-around;
  gap: 20px;
  font-size: 12px;
  margin: 0;
}
.entry .tabletop {
  grid-column: 2;
  grid-row: 2;
  padding: 35px 25px;
  background: #bfd2c0;
  border: 5px solid #728a7c;
  border-radius: 25px;
  margin: 0;
  box-shadow: inset 0 7px 0 #6e847930;
}
.entry .machine {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 25px;
  position: relative;
  z-index: 1;
}
.entry .slot {
  min-height: 260px;
  background: #e7ead7;
  border: 3px solid #657063;
  border-radius: 15px;
  padding: 22px 12px;
  box-shadow: inset 0 7px 0 #99a694;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.entry .slot.active {
  outline: 5px solid #a83d2a;
  outline-offset: 6px;
}
.entry .slot small {
  font-size: 10px;
}
.entry .slot strong {
  font-size: 14px;
}
.part-picture {
  display: block;
  width: 115px;
  max-width: 100%;
  height: 130px;
}
.entry .wire {
  margin: 15px 8%;
  height: 30px;
  border: 5px solid #ac4232;
  border-top: 0;
  border-radius: 0 0 18px 18px;
}
.entry .result {
  font-size: 13px;
  min-height: 65px;
  padding: 20px 0 0;
}
.entry .tool-shelf {
  grid-column: 1;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  background: #f4ddaf;
  padding: 20px;
  border: 3px solid #715b41;
  border-radius: 20px;
  margin: 0;
  gap: 12px;
  box-shadow: inset 0 7px 0 #c1a472;
}
.entry .tool-shelf > div {
  width: 100%;
}
.entry .tool-shelf h2 {
  font-size: 21px;
  margin: 7px 0;
}
.entry .tool-shelf .eyebrow {
  font-size: 9px;
  margin: 0;
}
.entry .tool-shelf button {
  background: #f7ecd4;
  border: 2px solid #715b41;
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  width: 100%;
  font-size: 14px;
  box-shadow: 0 4px 0 #92754c;
}
.entry .tool-shelf .part-picture {
  height: 75px;
  width: 70px;
}
.entry .actions {
  grid-column: 1/3;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 0;
  padding: 0;
}
.entry .actions button {
  background: #f7ecd4;
  border: 2px solid #715b41;
  box-shadow: 0 5px 0 #715b41;
  border-radius: 35px;
  padding: 17px 25px;
  font-size: 13px;
}
.entry .actions .primary {
  background: #a83d2a;
  color: #fff3d7;
}
.entry .explain {
  grid-column: 1/3;
  padding: 20px 4%;
  border: 0;
  max-width: 850px;
  margin: auto;
}
.entry .explain h2 {
  font-size: 23px;
}
.entry .explain p {
  font-size: 15px;
}
@media (max-width: 800px) {
  .entry {
    padding: 12px;
  }
  .entry header {
    padding: 12px 5px 20px;
    gap: 12px;
  }
  .entry header strong {
    font-size: 12px;
  }
  .entry header strong span {
    font-size: 26px;
  }
  .entry header nav {
    gap: 10px;
    font-size: 10px;
  }
  .entry main {
    display: flex;
    flex-direction: column;
    padding: 16px 12px;
    gap: 18px;
    border-width: 4px;
    border-radius: 22px;
  }
  .entry .instructions {
    order: 1;
    font-size: 10px;
    padding: 12px;
    gap: 10px;
    flex-wrap: wrap;
  }
  .entry .tool-shelf {
    order: 2;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding: 12px;
    gap: 10px;
  }
  .entry .tool-shelf > div {
    grid-column: 1/4;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .entry .tool-shelf h2 {
    font-size: 16px;
  }
  .entry .tool-shelf button {
    padding: 8px 4px;
    display: flex;
    flex-direction: column;
    font-size: 10px;
    gap: 5px;
  }
  .entry .tool-shelf .part-picture {
    width: 55px;
    height: 65px;
  }
  .entry .tabletop {
    order: 3;
    padding: 22px 12px;
    border-width: 3px;
  }
  .entry .machine {
    gap: 12px;
  }
  .entry .slot {
    min-height: 150px;
    padding: 12px 5px;
    border-width: 2px;
  }
  .entry .slot.active {
    outline-width: 3px;
    outline-offset: 3px;
  }
  .entry .slot small {
    font-size: 8px;
  }
  .entry .slot strong {
    font-size: 10px;
  }
  .entry .slot .part-picture {
    height: 75px;
  }
  .entry .wire {
    height: 20px;
    margin: 10px 8%;
    border-width: 3px;
  }
  .entry .result {
    font-size: 11px;
    min-height: 50px;
    padding-top: 10px;
  }
  .entry .actions {
    order: 4;
    gap: 10px;
    flex-wrap: wrap;
  }
  .entry .actions button {
    font-size: 10px;
    padding: 12px;
  }
  .entry .explain {
    order: 5;
    padding: 20px 4%;
  }
}
.entry header,
.entry header button,
.entry footer,
.entry footer button {
  color: #29362f;
}
</style>
