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
    .filter((k) => k.startsWith('design-library:04:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const project = ref('A room to return to'),
  sent = ref(false);
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <a :href="href('start')" @click.prevent="go('start')">alder<span>STUDIO</span></a>
      <nav>
        <a href="#work">Selected work</a><button @click="go('enquiry')">Enquiries ↗</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="intro">
          <div>
            <p class="eyebrow">INTERIORS / OBJECTS / EVERYDAY LIFE</p>
            <h1>Space to<br />feel at home.</h1>
            <p>
              We make quiet interiors and useful objects. Thoughtful about material, generous in the
              way they are lived with.
            </p>
            <a href="#work">Selected work, 2024–26 ↓</a>
          </div>
          <figure>
            <img
              class=""
              src="/art/interior.webp"
              alt="A warm room with a mustard armchair, wooden floor, and natural light"
              width="1200"
              height="900"
              loading="lazy"
            />
            <figcaption>01 &nbsp; A room to return to · Residential, 2026</figcaption>
          </figure>
        </section>
        <section id="work" class="projects">
          <figure>
            <button
              @click="
                project = 'A room to return to';
                go('project');
              "
            >
              <img
                class=""
                src="/art/architecture.webp"
                alt="Concrete architectural forms framing open sky"
                width="1200"
                height="900"
                loading="lazy"
              />
            </button>
            <figcaption>02 &nbsp; A considered threshold · Architecture, 2025</figcaption>
          </figure>
          <div>
            <p class="eyebrow">A PRACTICE OF ATTENTION</p>
            <h2>Less noise.<br />More belonging.</h2>
            <p>
              Good spaces leave room for people. We begin with the rhythms of a day: where you sit,
              what you reach for, how the light moves.
            </p>
            <button @click="go('project')">Inside a recent project ↗</button>
            <figure>
              <img
                class=""
                src="/art/ceramics.webp"
                alt="Speckled bowls with a quiet neutral glaze"
                width="1200"
                height="900"
                loading="lazy"
              />
              <figcaption>03 &nbsp; Objects for the table · Material study</figcaption>
            </figure>
          </div>
        </section></template
      ><template v-else-if="state === 'project'"
        ><p class="eyebrow">SELECTED WORK / 01</p>
        <h1>A room to return to.</h1>
        <div class="project-lead">
          <img
            class=""
            src="/art/interior.webp"
            alt="Warm interior study showing material relationships"
            width="1200"
            height="900"
            loading="lazy"
          />
          <div>
            <p>A modest room, made more generous through the things we chose to keep.</p>
            <dl>
              <dt>Location</dt>
              <dd>Northbank, fictional</dd>
              <dt>Year</dt>
              <dd>2026</dd>
              <dt>Scope</dt>
              <dd>Interior & furniture</dd>
            </dl>
            <p>
              Oak, wool, and soft morning light. The room’s character comes from a few durable
              materials and an uncomplicated plan.
            </p>
            <button @click="go('enquiry')">Enquire about a similar project ↗</button>
          </div>
        </div>
        <h2>A useful kind of quiet.</h2>
        <p>
          Furniture sits away from the walls to create a more natural route through the room.
          Captions and images remain paired as the case study unfolds.
        </p></template
      >
      <section v-else class="enquiry">
        <p class="eyebrow">LET’S BEGIN</p>
        <h1>Tell us about<br />your space.</h1>
        <form v-if="!sent" @submit.prevent="sent = true">
          <label>Project<input v-model="project" /></label
          ><label>Email<input type="email" required autocomplete="email" /></label
          ><label>A little about your plans<textarea required></textarea></label
          ><button class="primary">Save sample enquiry →</button
          ><small>No message will be sent.</small>
        </form>
        <p v-else role="status">
          Your sample enquiry for {{ project }} is complete. Thank you for trying the form.
        </p>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Alder Studio · Fictional sample content · Design reference 04</span
      ><button @click="reset">Reset demo</button>
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Libre Baskerville';
  src: url('/fonts/libre-baskerville.woff2') format('woff2');
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
  padding: 35px 6%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
header > a {
  text-decoration: none;
  font: 38px 'Libre Baskerville';
  letter-spacing: -0.07em;
}
header > a span {
  font: 8px 'DM Sans';
  letter-spacing: 0.25em;
  display: block;
  margin: 5px 0 0 5px;
}
nav {
  display: flex;
  gap: 35px;
  align-items: center;
  font-size: 12px;
}
nav button {
  background: none;
  border: 0;
  padding: 0;
}
main {
  padding: 30px 8% 100px;
  max-width: 1500px;
  margin: auto;
}
.intro {
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: 14%;
  align-items: center;
}
.intro h1 {
  font-size: 66px;
  font-weight: 400;
  line-height: 1.2;
  margin: 30px 0;
}
.intro p {
  font-size: 14px;
  line-height: 1.9;
  max-width: 380px;
}
.intro a {
  display: inline-block;
  font-size: 12px;
  margin-top: 30px;
}
.intro img {
  height: 580px;
  width: 100%;
}
figcaption {
  font-size: 10px;
  color: #736859;
  padding-top: 8px;
}
.projects {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 14%;
  padding-top: 100px;
  align-items: start;
}
.projects > figure {
  padding-top: 70px;
}
.projects > figure img {
  width: 100%;
  height: 590px;
}
.projects button {
  padding: 0;
  border: 0;
  background: transparent;
}
.projects h2 {
  font-weight: 400;
  font-size: 42px;
  line-height: 1.4;
}
.projects p {
  font-size: 14px;
  line-height: 1.9;
}
.projects > div > button {
  font-size: 12px;
  text-decoration: underline;
}
.projects > div figure {
  margin-top: 60px;
}
.projects > div img {
  height: 310px;
  width: 100%;
}
.project-lead {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 70px;
  align-items: center;
  margin-bottom: 70px;
}
.project-lead img {
  height: 600px;
  width: 100%;
}
.project-lead p {
  font-size: 16px;
}
.project-lead dl {
  font-size: 12px;
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 15px;
}
.project-lead dd {
  margin: 0;
}
.enquiry {
  max-width: 700px;
}
.enquiry form {
  display: grid;
  gap: 25px;
}
.enquiry small {
  font-size: 12px;
}
main > h1,
.enquiry h1 {
  font-weight: 400;
  font-size: 60px;
}
@media (max-width: 650px) {
  header {
    padding: 25px 6%;
  }
  header > a {
    font-size: 30px;
  }
  nav {
    gap: 15px;
    font-size: 10px;
  }
  .intro,
  .projects,
  .project-lead {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .intro h1 {
    font-size: 48px;
  }
  .intro img {
    height: 400px;
  }
  .projects {
    padding-top: 45px;
  }
  .projects > figure {
    padding-top: 0;
  }
  .projects > figure img {
    height: 420px;
  }
  .projects > div figure {
    margin-top: 30px;
  }
  .project-lead img {
    height: 400px;
  }
  main {
    padding-top: 15px;
  }
  .enquiry h1,
  main > h1 {
    font-size: 42px;
  }
}
</style>
