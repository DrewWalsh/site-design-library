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
    .filter((k) => k.startsWith('design-library:05:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const note = ref(1);
const notes = [
  'The word “common” is used here to mean shared rather than ordinary.',
  'This passage recalls the fictional town square described in the opening chapter.',
  'An editorial observation, not a documented historical claim.',
];
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>THE COMMONPLACE EDITION</strong><span>Essays with their margins intact.</span>
      <nav>
        <button @click="go('start')">Text & notes</button
        ><button @click="go('reading')">Reading mode</button
        ><button @click="go('sources')">Sources</button>
      </nav>
    </header>
    <main id="content" :class="{ reading: state === 'reading' }">
      <aside class="chapters">
        <p class="eyebrow">Contents</p>
        <a href="#opening">I. On common ground</a><a href="#making">II. The work of making</a
        ><a href="#keeping">III. What we keep</a
        ><button @click="go('sources')">Bibliography →</button
        ><small>Edition 01<br />October 2026<br />Original sample essay</small>
      </aside>
      <article v-if="state !== 'sources'">
        <p class="edition">A COMMONPLACE ESSAY · NO. 01</p>
        <h1>On the things<br />we hold in common</h1>
        <p class="subtitle">
          An inquiry into shared places, useful objects,<br />and the habits that give them meaning.
        </p>
        <p class="author">By Clara Vale · With editorial annotations</p>
        <hr />
        <section id="opening">
          <h2>I. On common ground</h2>
          <p>
            <span class="para">1</span>At the centre of the town is a table. It is not a monument,
            nor does it bear an inscription. People sit there to wait, to eat, and occasionally to
            make a decision together.
            <button class="noteref" @click="note = 1" aria-label="Read annotation 1">[1]</button>
          </p>
          <p>
            <span class="para">2</span>The table makes a small proposition: that a place can belong
            to nobody in particular and still matter to everyone who uses it. Its meaning is renewed
            by use, rather than secured by a name.
          </p>
          <p>
            <span class="para">3</span>We call such places common. The word describes a relationship
            before it describes a piece of land. It asks who may arrive, what they may do, and how
            their presence changes the place.
            <button class="noteref" @click="note = 2" aria-label="Read annotation 2">[2]</button>
          </p>
        </section>
        <section id="making">
          <h2>II. The work of making</h2>
          <p>
            <span class="para">4</span>Useful objects are rarely finished in the way a picture is
            finished. A handle wears smooth. A path becomes clearer. A repair makes the history of
            an object visible without making it less useful.
          </p>
          <blockquote>To care for a thing is to allow it a future.</blockquote>
          <p>
            <span class="para">5</span>This is the quieter work of making: adjusting, maintaining,
            and leaving room for uses we did not predict.
            <button class="noteref" @click="note = 3" aria-label="Read annotation 3">[3]</button>
          </p>
        </section>
        <section id="keeping">
          <h2>III. What we keep</h2>
          <p>
            The question is not only what deserves to be made. It is what deserves to remain
            available, and to whom. A shared table is one possible answer.
          </p>
          <button @click="go('sources')">Consult the sources →</button>
        </section>
      </article>
      <article v-else>
        <p class="edition">REFERENCE APPARATUS</p>
        <h1>Bibliography</h1>
        <p>
          This essay and its citations are fictional fixtures. No fabricated source is offered as
          evidence.
        </p>
        <ol class="sources">
          <li>
            <b>Vale, Clara. <em>On common ground.</em></b>
            <p>Original sample essay, 2026. Primary text in this demonstration.</p>
          </li>
          <li>
            <b>Editorial notebook, entry 04.</b>
            <p>
              Fictional commentary on shared furniture and public space. Included to show citation
              structure.
            </p>
          </li>
          <li>
            <b>The Northbank Table.</b>
            <p>Invented object study. Source not externally published.</p>
          </li>
        </ol>
        <button @click="go('start')">Return to annotated text</button>
      </article>
      <aside class="notes" v-if="state === 'start'">
        <p class="eyebrow">In the margin</p>
        <div v-for="(n, i) in notes" :key="n" :class="{ active: note === i + 1 }">
          <button @click="note = i + 1">0{{ i + 1 }}</button>
          <p>{{ n }}</p>
        </div>
        <small>Choose a numbered marker to bring its note into focus.</small>
      </aside>
    </main>
    <footer class="specimen-note">
      <span>The Commonplace Edition · Fictional sample content · Design reference 05</span
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
  padding: 25px 4%;
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  gap: 30px;
  font-size: 11px;
}
header strong {
  letter-spacing: 0.08em;
}
header > span {
  color: #6b6053;
}
nav {
  margin-left: auto;
  display: flex;
  gap: 18px;
}
nav button {
  padding: 0;
  background: none;
  border: 0;
  font-size: 11px;
}
main {
  display: grid;
  grid-template-columns: 170px minmax(0, 660px) 210px;
  gap: 55px;
  max-width: 1390px;
  margin: auto;
  padding: 60px 4% 100px;
}
.chapters {
  padding-top: 20px;
  font-size: 12px;
}
.chapters a {
  display: block;
  margin: 16px 0;
}
.chapters button {
  background: none;
  border: 0;
  padding: 0;
  font-size: 11px;
}
.chapters small {
  display: block;
  line-height: 1.9;
  margin-top: 70px;
  font-size: 10px;
  color: #6b6053;
}
.edition {
  font-size: 9px;
  letter-spacing: 0.14em;
  text-align: center;
}
article h1 {
  font: 40px/1.4 'Libre Baskerville';
  text-align: center;
  letter-spacing: -0.035em;
  margin: 35px 0;
}
.subtitle {
  font: 14px/1.9 'Libre Baskerville';
  text-align: center;
}
.author {
  font-size: 10px;
  text-align: center;
  margin: 25px 0 40px;
}
hr {
  border: 0;
  border-top: 1px solid var(--line);
  margin: 35px 0;
}
article section {
  font: 15px/2 'Libre Baskerville';
  margin: 45px 0;
}
article h2 {
  font-size: 21px;
  font-weight: 400;
  margin-bottom: 25px;
}
.para {
  font: 10px monospace;
  float: left;
  margin: 8px 16px 0 -25px;
  color: #897c69;
}
.noteref {
  padding: 0 3px;
  border: 0;
  background: none;
  color: var(--accent);
  font-size: 12px;
  min-height: 24px;
}
blockquote {
  margin: 35px 0;
  padding-left: 25px;
  border-left: 2px solid var(--accent);
  font-style: italic;
}
.notes {
  padding-top: 175px;
  font-size: 11px;
}
.notes > div {
  padding: 18px 0 18px 12px;
  border-left: 2px solid transparent;
}
.notes > div.active {
  border-color: var(--accent);
  background: #eee8dc;
}
.notes button {
  border: 0;
  background: none;
  padding: 0;
  color: var(--accent);
  font-size: 12px;
  min-height: 26px;
}
.notes p {
  margin: 5px 0;
  line-height: 1.8;
}
.notes small {
  display: block;
  margin-top: 25px;
  font-size: 10px;
  color: #766a5c;
}
.reading {
  grid-template-columns: 150px minmax(0, 680px);
  justify-content: center;
}
.reading .noteref {
  display: none;
}
.sources {
  padding-left: 20px;
}
.sources li {
  margin: 30px 0;
  line-height: 1.7;
  font-size: 14px;
}
@media (max-width: 1000px) {
  main {
    grid-template-columns: 125px minmax(0, 1fr);
    gap: 35px;
  }
  .notes {
    grid-column: 2;
    padding-top: 0;
    display: block;
  }
  .notes > div {
    display: none;
  }
  .notes > div.active {
    display: block;
  }
  header > span {
    display: none;
  }
}
@media (max-width: 600px) {
  header {
    display: block;
  }
  nav {
    margin-top: 15px;
    flex-wrap: wrap;
  }
  main,
  .reading {
    display: block;
    padding: 25px 7%;
  }
  .chapters {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    border-bottom: 1px solid var(--line);
    padding: 0 0 20px;
    margin-bottom: 30px;
  }
  .chapters p,
  .chapters small {
    display: none;
  }
  .chapters a {
    margin: 0;
    font-size: 10px;
  }
  .chapters button {
    font-size: 10px;
  }
  .notes {
    padding: 0 0 30px;
  }
  article h1 {
    font-size: 31px;
  }
  .subtitle {
    font-size: 12px;
  }
  .para {
    margin-left: -16px;
    margin-right: 6px;
  }
  article section {
    font-size: 14px;
    line-height: 1.95;
  }
}
.eyebrow {
  font:
    italic 13px/1.6 'Libre Baskerville',
    Georgia,
    serif;
  letter-spacing: 0;
  text-transform: none;
}
</style>
