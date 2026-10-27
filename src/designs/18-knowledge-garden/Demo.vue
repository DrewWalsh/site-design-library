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
        <p class="eyebrow">Workspace</p>
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
          ><div class="note-toolbar">
            <span class="note-state">◐ Developing</span
            ><span>Note 00{{ selected + 1 }} · Everyday design</span><span>Updated 6 Nov 2026</span>
          </div>
          <h1>{{ notes[selected].title }}</h1>
          <p class="summary">{{ notes[selected].summary }}</p>
          <div class="note-meta">
            <span>Planted<br /><b>October 2026</b></span
            ><span>Reading time<br /><b>4 minutes</b></span
            ><span>Connections<br /><b>3 linked notes</b></span>
          </div>
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
        <p class="eyebrow">Connections</p>
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
  padding: 19px 30px;
  background: #2f493d;
  color: #f6f8ef;
  display: flex;
  gap: 25px;
  align-items: center;
  border-bottom: 1px solid #213b2f;
}
header strong {
  font: 600 20px 'DM Sans';
  letter-spacing: -0.02em;
}
header > span {
  font-size: 11px;
  color: #dce7d7;
}
header label {
  margin-left: auto;
}
header input {
  font-size: 12px;
  background: #f6f8f0;
  min-width: 220px;
  border-radius: 5px;
  color: #344237;
}
main {
  display: grid;
  grid-template-columns: 190px minmax(0, 720px) 230px;
  gap: 25px;
  padding: 30px 30px 70px;
  max-width: 1450px;
  margin: auto;
}
.eyebrow {
  font: 600 11px/1.5 'DM Sans';
  text-transform: none;
  letter-spacing: 0;
}
.tree {
  font-size: 12px;
  padding: 20px 15px 25px 0;
  border-right: 1px solid #cad7c6;
}
.tree > a {
  display: block;
  margin: 20px 0;
  text-decoration: none;
  font-weight: 600;
}
.tree details {
  margin-top: 20px;
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
  padding: 10px 12px;
  border-radius: 4px;
}
.tree button[aria-pressed='true'] {
  background: #dce8d7;
  box-shadow: inset 3px 0 #49704d;
}
.garden-status {
  margin-top: 40px;
  background: #e3ebdc;
  padding: 18px;
  border-radius: 6px;
}
.garden-status > span {
  font-size: 28px;
  color: #537249;
}
.garden-status p {
  font-size: 12px;
  font-weight: 600;
}
.garden-status small {
  font-size: 10px;
  line-height: 1.8;
  color: #415a39;
}
.trail {
  font-size: 11px;
  margin-bottom: 25px;
  color: #52644d;
}
.trail button {
  background: none;
  border: 0;
  font-size: 11px;
  padding: 0 8px 0 0;
  min-height: 30px;
}
.note-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 10px;
  color: #52644d;
  border-bottom: 1px solid #d3ddce;
  padding-bottom: 20px;
  margin-bottom: 25px;
}
.note-state {
  background: #dce9ce;
  border: 1px solid #9bb789;
  color: #35532c;
  padding: 3px 8px;
  border-radius: 20px;
}
.note-toolbar > span:last-child {
  margin-left: auto;
}
main > article {
  background: #fffef8;
  border: 1px solid #d4ddcd;
  border-radius: 7px;
  padding: 28px 32px;
  box-shadow: 0 4px 15px #36553505;
}
article h1 {
  font: 600 32px/1.2 'DM Sans';
  letter-spacing: -0.025em;
  margin: 0 0 20px;
}
.summary {
  font: 16px/1.7 'DM Sans';
  color: #4a5d43;
}
.note-meta {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  font-size: 10px;
  line-height: 1.8;
  color: #52644d;
  background: #f0f4e9;
  padding: 16px 18px;
  margin: 25px 0 30px;
  border-radius: 5px;
}
.note-meta b {
  font-size: 11px;
  font-weight: 500;
  color: #344237;
}
article h2 {
  font: 600 23px/1.3 'DM Sans';
  margin-top: 30px;
  letter-spacing: -0.02em;
}
article p,
article li {
  font-size: 14px;
  line-height: 1.9;
}
article h3 {
  font: 600 18px 'DM Sans';
  margin-top: 25px;
}
.inline {
  display: inline;
  border: 0;
  background: #e5eedc;
  padding: 1px 5px;
  min-height: 26px;
  font-size: inherit;
  text-decoration: underline;
  color: #345832;
  border-radius: 3px;
}
blockquote {
  margin: 30px 0;
  padding: 20px 23px;
  background: #eff4e8;
  border-left: 3px solid #7e9b6b;
  font: 16px/1.7 'DM Sans';
}
.connections {
  padding: 20px 0;
}
.connections h3 {
  font: 600 13px 'DM Sans';
  margin: 25px 0 15px;
}
.connections button {
  display: block;
  width: 100%;
  text-align: left;
  background: #e5eddd;
  border: 1px solid #c4d4b8;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 13px;
}
.connections button b {
  font-size: 12px;
  font-weight: 600;
}
.connections button p {
  font-size: 11px;
  line-height: 1.7;
  margin: 10px 0 0;
}
.connections > p:last-child {
  font-size: 12px;
  line-height: 1.9;
}
.search-result {
  display: block;
  width: 100%;
  text-align: left;
  background: #f2f6ea;
  border: 1px solid #c9d6bf;
  border-radius: 5px;
  padding: 20px;
  margin: 15px 0;
}
.search-result h2 {
  font-size: 20px;
  margin-top: 0;
}
.search-result p {
  font-size: 13px;
  margin-bottom: 0;
}
@media (max-width: 1150px) {
  main {
    grid-template-columns: 170px minmax(0, 1fr);
  }
  .connections {
    grid-column: 2;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
  .connections > .eyebrow,
  .connections > h3,
  .connections > p {
    grid-column: 1/-1;
  }
  .connections h3 {
    margin: 10px 0 0;
  }
}
@media (max-width: 700px) {
  header {
    padding: 18px 20px;
    flex-wrap: wrap;
    gap: 15px;
  }
  header > span {
    display: none;
  }
  header label {
    width: 100%;
    margin: 0;
  }
  header input {
    width: 100%;
    min-width: 0;
  }
  main {
    display: block;
    padding: 20px 18px 45px;
  }
  .tree {
    border: 0;
    padding: 0 0 20px;
  }
  .tree > .eyebrow,
  .tree > a,
  .garden-status {
    display: none;
  }
  .tree details {
    margin: 0;
    padding: 0;
    border: 0;
  }
  .tree details button {
    display: inline-block;
    width: auto;
    max-width: 100%;
    margin-right: 7px;
  }
  .tree summary {
    margin-bottom: 8px;
  }
  main > article {
    padding: 23px 20px;
  }
  .note-toolbar {
    gap: 8px;
  }
  .note-toolbar > span:last-child {
    margin: 0;
  }
  .note-meta {
    gap: 12px;
    padding: 14px 12px;
    grid-template-columns: 1fr 1fr;
  }
  .note-meta > span:last-child {
    grid-column: 1/-1;
  }
  article h1 {
    font-size: 28px;
  }
  .connections {
    display: block;
    padding-top: 25px;
  }
  .connections h3 {
    margin: 20px 0 15px;
  }
  .connections button {
    margin-top: 12px;
  }
}
</style>
