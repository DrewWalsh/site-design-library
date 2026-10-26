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
    .filter((k) => k.startsWith('design-library:45:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const sent = ref(false);
const events = ['A room for unfinished work', 'The useful disagreement', 'An open table'];
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <a :href="href('start')" @click.prevent="go('start')">COMMON ROOM</a>
      <nav>
        <a :href="href('programme')" @click.prevent="go('programme')">Programme</a
        ><a href="#archive">Archive</a
        ><a :href="href('contact')" @click.prevent="go('contact')">Contact</a>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><h1 class="manifesto">A room is<br />only a room.<br />Until we<br />use it.</h1>
        <section class="statement">
          <span>01 / WHY WE’RE HERE</span>
          <div>
            <p>Common Room is a fictional artist-run space for work that needs other people.</p>
            <p>
              We make time for unfinished ideas, difficult conversations, and things that don’t yet
              have a name.
            </p>
            <a :href="href('programme')" @click.prevent="go('programme')">See what’s happening →</a>
          </div>
        </section>
        <section class="current">
          <p>02 / COMING UP</p>
          <button
            v-for="(e, i) in events"
            :key="e"
            @click="
              selected = i;
              go('programme');
            "
          >
            <span>{{ ['06 NOV', '13 NOV', '20 NOV'][i] }}</span>
            <h2>{{ e }}</h2>
            <b>→</b>
          </button>
        </section>
        <section id="archive" class="archive">
          <p>03 / PREVIOUSLY</p>
          <div>
            <p>October 2026 — A place to begin.</p>
            <p>September 2026 — Things we keep using.</p>
            <p>August 2026 — The doors were open.</p>
          </div>
        </section></template
      >
      <section v-else-if="state === 'programme'" class="event">
        <p>THE CURRENT PROGRAMME / 0{{ selected + 1 }}</p>
        <h1>{{ events[selected] }}</h1>
        <div class="event-info">
          <p>
            {{ ['Friday 6', 'Friday 13', 'Friday 20'][selected] }} November 2026<br />18:00–20:00<br />Common
            Room, Northbank
          </p>
          <div>
            <h2>Bring something you haven’t finished.</h2>
            <p>
              A drawing. A question. A piece of writing. Something that is easier to think about
              with other people in the room.
            </p>
            <p>
              This fictional event has no application process or ticket sale. It demonstrates how a
              plain page can make practical details easy to find.
            </p>
            <p>Step-free entrance. Seating available. A quieter room next door.</p>
            <a :href="href('contact')" @click.prevent="go('contact')">Ask about the programme →</a>
          </div>
        </div>
        <button @click="selected = (selected + 1) % 3">
          Next event: {{ events[(selected + 1) % 3] }} →
        </button>
      </section>
      <section v-else class="contact">
        <p>CONTACT / SAY WHAT YOU MEAN</p>
        <h1>Start a<br />conversation.</h1>
        <form v-if="!sent" @submit.prevent="sent = true">
          <label>Your email<input type="email" autocomplete="email" required /></label
          ><label>Your message<textarea required></textarea></label
          ><button>Save sample message →</button>
          <p>No message will be sent. This form is a local demonstration.</p>
        </form>
        <div v-else role="status">
          <h2>The sample is complete.</h2>
          <p>Your message was not sent or stored.</p>
          <button @click="sent = false">Try another</button>
        </div>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Common Room · Fictional sample content · Design reference 45</span
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
.specimen {
  font-family: Arial, sans-serif;
}
header {
  display: flex;
  justify-content: space-between;
  gap: 35px;
  padding: 28px 4%;
  border-bottom: 2px solid;
}
header > a {
  font-size: 18px;
  font-weight: 700;
}
nav {
  display: flex;
  gap: 35px;
  font-size: 14px;
}
a {
  color: #1643b8;
}
main {
  padding: 35px 4% 80px;
  max-width: 1600px;
  margin: auto;
}
.manifesto {
  font-family: Arial, sans-serif;
  font-size: clamp(70px, 10vw, 145px);
  font-weight: 400;
  line-height: 0.98;
  letter-spacing: -0.065em;
  margin: 20px 0 70px;
}
.statement {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
  border-top: 2px solid;
  padding: 35px 0 60px;
}
.statement > span {
  font-size: 11px;
}
.statement p {
  font-size: 29px;
  line-height: 1.4;
  max-width: 800px;
  letter-spacing: -0.02em;
}
.statement a {
  font-size: 16px;
}
.current {
  border-top: 2px solid;
  padding-top: 25px;
}
.current > p,
.archive > p {
  font-size: 11px;
}
.current button {
  display: flex;
  align-items: center;
  gap: 50px;
  background: none;
  border: 0;
  border-top: 1px solid;
  width: 100%;
  padding: 30px 0;
  text-align: left;
}
.current button > span {
  font-size: 13px;
  min-width: 80px;
}
.current h2 {
  font-family: Arial, sans-serif;
  font-size: 40px;
  font-weight: 400;
  margin: 0;
  flex: 1;
  line-height: 1.15;
}
.current b {
  font-size: 35px;
  font-weight: 400;
}
.archive {
  border-top: 2px solid;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
  margin-top: 55px;
  padding-top: 30px;
}
.archive > div p {
  font-size: 18px;
}
.event,
.contact {
  padding: 30px 0 120px;
}
.event > p,
.contact > p {
  font-size: 11px;
}
.event h1,
.contact h1 {
  font-family: Arial, sans-serif;
  font-size: 93px;
  font-weight: 400;
  max-width: 1100px;
}
.event-info {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
  border-top: 2px solid;
  padding-top: 35px;
  margin-bottom: 40px;
}
.event-info > p {
  font-size: 15px;
  line-height: 1.9;
}
.event-info h2 {
  font-family: Arial, sans-serif;
  font-size: 34px;
  font-weight: 400;
}
.event-info p {
  font-size: 17px;
  line-height: 1.8;
}
.event > button,
.contact button {
  background: none;
  border: 1px solid;
  border-radius: 0;
  padding: 15px 20px;
  font-size: 14px;
}
.contact form {
  max-width: 700px;
  display: grid;
  gap: 25px;
}
.contact label {
  font-size: 14px;
}
.contact input,
.contact textarea {
  border: 1px solid;
  border-radius: 0;
  padding: 14px;
}
.contact textarea {
  min-height: 170px;
}
.contact form p {
  font-size: 12px;
}
.specimen-note {
  font-family: Arial, sans-serif;
}
.specimen-note button {
  border: 1px solid;
  border-radius: 0;
}
@media (max-width: 600px) {
  header {
    padding: 23px;
    display: block;
  }
  nav {
    margin-top: 23px;
    gap: 30px;
    font-size: 12px;
  }
  .manifesto {
    font-size: 63px;
    margin: 15px 0 40px;
  }
  .statement,
  .archive,
  .event-info {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .statement p {
    font-size: 22px;
  }
  .current button {
    gap: 18px;
    padding: 25px 0;
  }
  .current button > span {
    min-width: 55px;
    font-size: 10px;
  }
  .current h2 {
    font-size: 27px;
  }
  .current b {
    font-size: 24px;
  }
  .event h1,
  .contact h1 {
    font-size: 52px;
  }
  .event-info h2 {
    font-size: 29px;
  }
  .event-info p {
    font-size: 15px;
  }
  .archive > div p {
    font-size: 16px;
  }
}
</style>
