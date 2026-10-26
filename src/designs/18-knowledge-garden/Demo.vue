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
    .filter((k) => k.startsWith('design-library:18:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const notes = [
  {
    title: 'Small systems',
    summary:
      'A collection of notes about the things that make everyday life a little more coherent.',
  },
  {
    title: 'Useful friction',
    summary:
      'Not every obstacle is a mistake. Some pauses help us understand what we are about to do.',
  },
  {
    title: 'Places to return to',
    summary: 'A familiar place can hold context that would otherwise have to be explained again.',
  },
  {
    title: 'Maintenance as design',
    summary: 'A design continues through the work of keeping it useful.',
  },
];
function open(i: number) {
  selected.value = i;
  go('note');
}
const matches = computed(() =>
  notes.filter((n) => (n.title + ' ' + n.summary).toLowerCase().includes(q.value.toLowerCase())),
);
function search() {
  if (state.value !== 'search') {
    history.replaceState({}, '', href('search'));
    state.value = 'search';
  }
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>❋ small systems</strong><span>A garden of connected notes.</span
      ><label
        ><input
          v-model="q"
          @input="search"
          aria-label="Search notes"
          placeholder="Search the garden…"
      /></label>
    </header>
    <main id="content">
      <aside class="tree">
        <p class="eyebrow">THE GARDEN</p>
        <a
          :href="href('start')"
          @click.prevent="
            selected = 0;
            go('start');
          "
          >⌂ Start here</a
        >
        <details open>
          <summary>Everyday design</summary>
          <button
            v-for="(note, i) in notes"
            :key="note.title"
            :aria-pressed="selected === i"
            @click="open(i)"
          >
            {{ note.title }}
          </button>
        </details>
        <div class="garden-status">
          <span>◌</span>
          <p>Always in progress.</p>
          <small>These notes are connected, not complete.</small>
        </div>
      </aside>
      <article>
        <nav class="trail">
          <button
            @click="
              selected = 0;
              go('start');
            "
          >
            Garden
          </button>
          / {{ state === 'search' ? 'Search' : notes[selected].title }}
        </nav>
        <template v-if="state !== 'search'"
          ><p class="eyebrow">A GROWING NOTE / 00{{ selected + 1 }}</p>
          <h1>{{ notes[selected].title }}</h1>
          <p class="summary">{{ notes[selected].summary }}</p>
          <div class="note-meta">Planted October 2026 · 4 minute read · Fictional notebook</div>
          <h2>Begin with what is close.</h2>
          <p>
            A system does not have to be large to be worth understanding. A shared calendar, a shelf
            of tools, a weekly conversation: each shapes what becomes easy and what becomes
            possible.
          </p>
          <p>
            The useful question is often not “How can this do more?” but “What does this help us
            notice?” That question leads to
            <button class="inline" @click="open(1)">useful friction</button>, and to the value of
            <button class="inline" @click="open(2)">places to return to</button>.
          </p>
          <blockquote>
            Good systems make room for the people who use them to understand them.
          </blockquote>
          <h2>Keep the connections visible.</h2>
          <p>
            A note can be small and still point somewhere interesting. Contextual links carry a
            thought forward; backlinks show where it has already mattered.
          </p>
          <h3>Questions to keep open</h3>
          <ul>
            <li>What does this arrangement make easier?</li>
            <li>Who is expected to do the work of maintaining it?</li>
            <li>What happens when the circumstances change?</li>
          </ul>
          <p>
            Continue into <button class="inline" @click="open(3)">maintenance as design</button>.
          </p></template
        ><template v-else
          ><h1>Search the garden</h1>
          <p>{{ matches.length }} matching notes.</p>
          <button
            class="search-result"
            v-for="n in matches"
            :key="n.title"
            @click="open(notes.indexOf(n))"
          >
            <h2>{{ n.title }}</h2>
            <p>{{ n.summary }}</p>
          </button>
          <p v-if="!matches.length">No notes match yet. Try “design” or “place”.</p></template
        >
      </article>
      <aside class="connections">
        <p class="eyebrow">CONNECTED TO THIS NOTE</p>
        <h3>Backlinks</h3>
        <button
          v-for="(n, i) in notes.filter((n) => n !== notes[selected]).slice(0, 2)"
          :key="n.title"
          @click="open(notes.indexOf(n))"
        >
          <b>{{ n.title }} ↗</b>
          <p>{{ n.summary }}</p>
        </button>
        <h3>In this part of the garden</h3>
        <p>Everyday design<br />Shared places<br />Care & maintenance</p>
      </aside>
    </main>
    <footer class="specimen-note">
      <span>The Small Systems Garden · Fictional sample content · Design reference 18</span
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
  gap: 35px;
  align-items: center;
}
header strong {
  font: 23px 'Libre Baskerville';
}
header > span {
  font-size: 11px;
  color: #5b6b54;
}
header label {
  margin-left: auto;
}
header input {
  font-size: 11px;
  background: #fbfcf6;
  min-width: 230px;
}
main {
  display: grid;
  grid-template-columns: 190px minmax(0, 680px) 210px;
  gap: 50px;
  padding: 40px 4% 90px;
  max-width: 1420px;
  margin: auto;
}
.tree {
  font-size: 12px;
  padding-top: 18px;
}
.tree > a {
  display: block;
  margin: 20px 0;
}
.tree details {
  margin-top: 25px;
}
.tree summary {
  font-size: 12px;
}
.tree button {
  background: none;
  border: 0;
  text-align: left;
  display: block;
  width: 100%;
  font-size: 11px;
  margin-top: 8px;
  padding: 9px 0 9px 12px;
}
.tree button[aria-pressed='true'] {
  background: #e3e9dc;
  box-shadow: inset 2px 0 #637d57;
}
.garden-status {
  border-top: 1px solid var(--line);
  margin-top: 65px;
  padding-top: 25px;
}
.garden-status > span {
  font-size: 35px;
  color: #829975;
}
.garden-status p {
  margin: 10px 0;
  font-size: 12px;
}
.garden-status small {
  font-size: 10px;
  line-height: 1.9;
  color: #526948;
}
.trail {
  font-size: 10px;
  margin-bottom: 40px;
  color: #5c6b51;
}
.trail button {
  background: none;
  border: 0;
  font-size: 10px;
  min-height: 25px;
  padding: 0;
  margin-right: 10px;
}
article h1 {
  font-size: 45px;
  font-weight: 400;
  line-height: 1.25;
}
.summary {
  font: 17px/1.8 'Libre Baskerville';
}
.note-meta {
  font-size: 9px;
  line-height: 1.8;
  color: #5c6b51;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 15px 0;
  margin: 28px 0 40px;
}
article h2 {
  font: 27px 'Libre Baskerville';
  margin-top: 35px;
}
article p,
article li {
  font-size: 14px;
  line-height: 1.95;
}
article h3 {
  font-size: 20px;
  font-weight: 400;
}
.inline {
  display: inline;
  border: 0;
  background: #e7edde;
  padding: 0 4px;
  min-height: 24px;
  font-size: inherit;
  text-decoration: underline;
  color: #3b613b;
}
blockquote {
  margin: 35px 0;
  padding: 20px 25px;
  background: #e8edde;
  border-left: 2px solid #69835a;
  font: 17px/1.8 'Libre Baskerville';
}
.connections {
  padding-top: 90px;
}
.connections h3 {
  font: 13px 'DM Sans';
  margin: 25px 0 15px;
}
.connections button {
  display: block;
  text-align: left;
  background: none;
  border: 0;
  border-top: 1px solid var(--line);
  padding: 18px 0;
  font-size: 11px;
}
.connections p {
  font-size: 11px;
  line-height: 1.8;
  color: #55664a;
}
.search-result {
  display: block;
  width: 100%;
  background: none;
  border: 0;
  border-top: 1px solid var(--line);
  text-align: left;
  padding: 15px 0;
}
.search-result h2 {
  font-size: 24px;
  margin: 10px 0;
}
.search-result p {
  font-size: 13px;
}
@media (max-width: 1100px) {
  main {
    grid-template-columns: 160px minmax(0, 1fr);
    gap: 35px;
  }
  .connections {
    grid-column: 2;
    padding-top: 0;
  }
  .connections button {
    display: inline-block;
    width: 48%;
    vertical-align: top;
    padding: 20px;
  }
  .connections > p {
    max-width: none;
  }
}
@media (max-width: 600px) {
  header {
    display: block;
    padding: 22px;
  }
  header > span {
    display: none;
  }
  header input {
    margin-top: 18px;
    width: 100%;
    min-width: 0;
  }
  main {
    display: block;
    padding: 20px 22px 60px;
  }
  .tree {
    padding: 0;
  }
  .tree > .eyebrow,
  .tree > a,
  .garden-status {
    display: none;
  }
  .tree details {
    margin: 0 0 25px;
  }
  .tree button {
    font-size: 11px;
  }
  .trail {
    margin: 20px 0;
  }
  .summary {
    font-size: 15px;
  }
  article h1 {
    font-size: 35px;
  }
  article h2 {
    font-size: 24px;
  }
  .connections {
    margin-top: 40px;
  }
  .connections button {
    width: 100%;
    padding: 15px 0;
  }
}
</style>
