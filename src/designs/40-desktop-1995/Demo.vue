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
    .filter((k) => k.startsWith('design-library:40:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const minimized = ref(false),
  maximized = ref(false),
  project = ref('Northbank identity'),
  sent = ref(false),
  email = ref('');
function open(app: string) {
  minimized.value = false;
  go(app);
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <div class="osbar">
      <strong>▣ Parcel OS</strong><span>Portfolio desktop · Build 1.0</span
      ><span class="grow"></span><span>14:32</span>
    </div>
    <div class="desktop">
      <nav class="icons" aria-label="Applications">
        <button @click="open('start')"><span>▰</span>Projects</button
        ><button @click="open('contact')"><span>✉</span>Contact</button
        ><button @click="open('help')"><span>?</span>Help</button>
      </nav>
      <main id="content" :class="['window', { maximized }]" v-if="!minimized">
        <header class="titlebar">
          <strong
            >{{ state === 'contact' ? 'Contact' : state === 'help' ? 'Help' : 'Projects' }} —
            Parcel</strong
          >
          <div>
            <button aria-label="Minimise window" @click="minimized = true">_</button
            ><button
              :aria-label="maximized ? 'Restore window' : 'Maximise window'"
              @click="maximized = !maximized"
            >
              □</button
            ><button aria-label="Close window" @click="minimized = true">×</button>
          </div>
        </header>
        <div class="menubar">
          <button @click="open('start')">Projects</button
          ><button @click="open('contact')">Contact</button
          ><button @click="open('help')">Help</button>
        </div>
        <div class="windowcontent">
          <template v-if="state === 'start'"
            ><div class="intro">
              <p class="eyebrow">Hello, I’m Sam.</p>
              <h1>Good work.<br />Neatly filed.</h1>
              <p>A small collection of identities, websites, and things made to be used.</p>
            </div>
            <div class="explorer">
              <aside>
                <strong>Folders</strong
                ><button
                  v-for="p in ['Northbank identity', 'Field guide', 'Common Room website']"
                  :key="p"
                  :aria-pressed="project === p"
                  @click="project = p"
                >
                  ▰ {{ p }}
                </button>
              </aside>
              <article>
                <div class="project-art">
                  <span>{{
                    project === 'Northbank identity'
                      ? 'N/'
                      : project === 'Field guide'
                        ? 'FIELD'
                        : 'COMMON ROOM'
                  }}</span
                  ><small>SELECTED WORK / 2026</small>
                </div>
                <h2>{{ project }}</h2>
                <p>
                  A fictional project balancing direct communication with a memorable visual
                  language. From first sketches to a practical set of everyday tools.
                </p>
                <dl>
                  <dt>Role</dt>
                  <dd>Design & development</dd>
                  <dt>Deliverables</dt>
                  <dd>Identity, print, digital</dd>
                </dl>
                <button @click="open('contact')">Enquire about a similar project →</button>
              </article>
            </div></template
          ><template v-else-if="state === 'contact'"
            ><h1>Send a hello.</h1>
            <p>Interested in {{ project.toLowerCase() }}? Leave a sample note below.</p>
            <form v-if="!sent" @submit.prevent="sent = true">
              <label
                >Your email<input
                  type="email"
                  required
                  v-model="email"
                  autocomplete="email" /></label
              ><label
                >Message<textarea
                  required
                  :placeholder="'I’d like to talk about ' + project.toLowerCase()"
                ></textarea></label
              ><button class="primary">Save sample enquiry</button>
              <p>Local demonstration. No email will be sent.</p>
            </form>
            <div v-else role="status">
              <h2>Message saved in this demo.</h2>
              <p>Reply address: {{ email }}. Nothing was sent.</p>
              <button @click="sent = false">Write another</button>
            </div></template
          ><template v-else
            ><h1>A very small desktop.</h1>
            <p>Three applications. No hidden gestures.</p>
            <h2>Getting around</h2>
            <ul>
              <li>Open Projects to browse three sample projects.</li>
              <li>Use Contact to try the local enquiry form.</li>
              <li>Minimise or close a window, then reopen it from the task strip.</li>
              <li>Maximise gives the current tool more room.</li>
            </ul>
            <p>
              Use Tab to move through controls and Enter to activate them. On phones, one
              application fills the available width.
            </p>
            <button @click="open('start')">Open Projects →</button></template
          >
        </div>
        <div class="statusbar">
          {{ state === 'start' ? '3 objects · 1 selected' : 'Ready'
          }}<span>Local demonstration</span>
        </div>
      </main>
      <div class="welcome" v-else id="content">
        <h1>Everything has a place.</h1>
        <p>Open an application from the desktop or the task strip.</p>
        <button @click="open('start')">Open Projects</button>
      </div>
    </div>
    <nav class="taskbar" aria-label="Application switcher">
      <button @click="open('start')"><b>▣ Start</b></button
      ><button @click="open('start')">▰ Projects</button
      ><button @click="open('contact')">✉ Contact</button
      ><button @click="open('help')">? Help</button>
    </nav>
    <footer class="specimen-note">
      <span>Parcel OS · Fictional sample content · Design reference 40</span
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
.osbar {
  display: flex;
  gap: 25px;
  padding: 10px 20px;
  background: #e5e5df;
  border-bottom: 2px solid #777;
  font-size: 12px;
}
.desktop {
  min-height: 850px;
  padding: 40px 5% 60px;
  display: flex;
  gap: 55px;
}
.icons {
  width: 100px;
  flex-shrink: 0;
}
.icons button {
  display: grid;
  justify-items: center;
  width: 100%;
  margin-bottom: 30px;
  background: none;
  border: 0;
  color: white;
  font-size: 13px;
}
.icons span {
  font-size: 40px;
  line-height: 1.3;
  text-shadow: 2px 2px #273c4e;
}
.window {
  background: #e5e5df;
  border: 3px solid;
  border-color: #fff #445653 #445653 #fff;
  box-shadow: 5px 7px 0 #305b5a;
  max-width: 1040px;
  flex: 1;
  align-self: start;
}
.window.maximized {
  max-width: none;
}
.titlebar {
  background: #253b80;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 8px;
  font-size: 13px;
}
.titlebar div {
  display: flex;
  gap: 3px;
}
.titlebar button {
  padding: 0;
  width: 26px;
  min-height: 24px;
  height: 24px;
  border: 2px outset white;
  line-height: 1;
}
.menubar {
  padding: 2px 12px;
  border-bottom: 1px solid #aaa;
  display: flex;
  gap: 20px;
}
.menubar button {
  background: none;
  border: 0;
  padding: 7px 0;
  font-size: 12px;
}
.windowcontent {
  padding: 30px;
}
.intro h1 {
  font-size: 50px;
  margin: 10px 0 20px;
  letter-spacing: -0.045em;
}
.intro p {
  font-size: 14px;
}
.explorer {
  margin-top: 30px;
  border: 2px inset #fff;
  display: grid;
  grid-template-columns: 180px 1fr;
  background: white;
}
.explorer aside {
  background: #f2f2ec;
  padding: 15px;
  font-size: 12px;
  border-right: 1px solid #bbb;
}
.explorer aside button {
  display: block;
  text-align: left;
  font-size: 12px;
  border: 0;
  padding: 10px 0;
  background: none;
}
.explorer article {
  padding: 25px;
}
.project-art {
  height: 180px;
  background: #d8e2b8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  overflow: hidden;
}
.project-art span {
  font-size: 70px;
  line-height: 1;
  font-weight: 900;
  letter-spacing: -0.07em;
}
.project-art small {
  font-size: 9px;
  letter-spacing: 0.1em;
}
.explorer h2 {
  font-size: 27px;
}
.explorer p {
  font-size: 13px;
}
.explorer dl {
  display: grid;
  grid-template-columns: 90px 1fr;
  font-size: 12px;
}
.explorer dd {
  margin: 0;
}
button {
  border: 2px outset #fff;
  border-radius: 0;
}
button:active {
  border-style: inset;
}
.explorer article button {
  font-size: 12px;
}
.statusbar {
  display: flex;
  justify-content: space-between;
  border: 2px inset #fff;
  margin: 4px;
  padding: 4px 8px;
  font-size: 11px;
}
.taskbar {
  background: #e5e5df;
  border-top: 3px outset white;
  padding: 8px;
  display: flex;
  gap: 8px;
}
.taskbar button {
  font-size: 12px;
  min-width: 110px;
}
.welcome {
  color: white;
  margin: 70px 0;
}
.welcome h1 {
  font-size: 45px;
}
.window form {
  max-width: 600px;
  display: grid;
  gap: 20px;
}
.window h1 {
  font-size: 50px;
}
.specimen-note {
  background: #e5e5df;
}
@media (max-width: 800px) {
  .desktop {
    gap: 20px;
    padding: 25px 20px;
  }
  .icons {
    width: 75px;
  }
  .explorer {
    grid-template-columns: 130px 1fr;
  }
  .windowcontent {
    padding: 22px;
  }
}
@media (max-width: 600px) {
  .osbar > span:not(.grow) {
    display: none;
  }
  .desktop {
    display: block;
    padding: 14px;
    min-height: 750px;
  }
  .icons {
    display: flex;
    width: auto;
    gap: 12px;
  }
  .icons button {
    margin-bottom: 10px;
    display: flex;
    gap: 6px;
    justify-content: center;
    font-size: 11px;
  }
  .icons span {
    font-size: 22px;
  }
  .explorer {
    display: block;
  }
  .explorer aside {
    border-right: 0;
    border-bottom: 1px solid #aaa;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .explorer aside strong {
    width: 100%;
  }
  .windowcontent {
    padding: 17px;
  }
  .window h1 {
    font-size: 38px;
  }
  .explorer article {
    padding: 16px;
  }
  .taskbar {
    flex-wrap: wrap;
  }
  .taskbar button {
    min-width: 70px;
    flex: 1;
    font-size: 11px;
  }
  .statusbar {
    font-size: 9px;
    gap: 10px;
  }
}
</style>
