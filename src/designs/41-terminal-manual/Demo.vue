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
    .filter((k) => k.startsWith('design-library:41:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const commands = ['sync', 'status', 'ignore', 'restore'];
const dry = ref(true),
  verbose = ref(false);
const example = computed(
  () =>
    'relay sync ./notes ./archive' +
    (dry.value ? ' --dry-run' : '') +
    (verbose.value ? ' --verbose' : ''),
);
async function copy() {
  try {
    await navigator.clipboard.writeText(example.value);
    message.value = 'Command copied. Nothing was executed.';
  } catch {
    message.value = 'Select the command text below to copy it.';
  }
}
const matches = computed(() => commands.filter((c) => c.includes(q.value.toLowerCase())));
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
      <strong>relay<span>_</span></strong
      ><span>A SMALL UTILITY. A READABLE MANUAL.</span><span class="grow"></span
      ><b>v0.8 / FICTIONAL</b>
    </header>
    <main id="content">
      <aside>
        <p>MANUAL INDEX</p>
        <label>Find a command<input v-model="q" placeholder="Search…" @input="search" /></label
        ><button
          v-for="(cmd, i) in commands"
          :key="cmd"
          :aria-pressed="selected === i"
          @click="
            selected = i;
            go('start');
          "
        >
          {{ cmd }} <span>0{{ i + 1 }}</span>
        </button>
        <hr />
        <button @click="go('examples')">examples ↗</button
        ><small>Text first.<br />Everything inspectable.<br />Nothing runs here.</small>
      </aside>
      <article>
        <template v-if="state !== 'search'"
          ><p class="eyebrow">REFERENCE / {{ commands[selected].toUpperCase() }}</p>
          <h1>{{ commands[selected] }}<span>(1)</span></h1>
          <p class="intro">
            {{
              [
                'Keep two folders in agreement, with the changes visible before you commit to them.',
                'Inspect the difference between a source and destination without changing either.',
                'Declare the files that should stay outside the synchronisation set.',
                'Inspect a saved revision before restoring selected files.',
              ][selected]
            }}
          </p>
          <div class="synopsis">
            <span>SYNOPSIS</span>
            <pre><code>relay {{commands[selected]}} &lt;source&gt; &lt;destination&gt; [options]</code></pre>
          </div>
          <section>
            <h2>01 / Description</h2>
            <p>
              Relay is a fictional command-line utility used to demonstrate a documentation
              interface. The examples are selectable text; this page never invokes a shell or
              modifies your files.
            </p>
            <p>
              Start with an inspection, understand the proposed changes, and make the operation
              explicit.
            </p>
          </section>
          <section>
            <h2>02 / Options</h2>
            <dl>
              <dt>--dry-run</dt>
              <dd>Describe the changes without applying them.</dd>
              <dt>--verbose</dt>
              <dd>Include each considered path in the output.</dd>
              <dt>--exclude &lt;pattern&gt;</dt>
              <dd>Skip paths matching a named pattern.</dd>
            </dl>
          </section>
          <section class="example">
            <div class="row">
              <h2>03 / Build an example</h2>
              <button @click="copy">COPY</button>
            </div>
            <div class="row">
              <label><input type="checkbox" v-model="dry" />--dry-run</label
              ><label><input type="checkbox" v-model="verbose" />--verbose</label>
            </div>
            <pre tabindex="0"><code>$ {{example}}</code></pre>
            <p v-if="message" role="status">{{ message }}</p>
            <p>
              Use this text as a documentation example only. Relay CLI does not exist as a shipped
              program.
            </p>
          </section>
          <section v-if="state === 'examples'">
            <h2>04 / Worked examples</h2>
            <pre tabindex="0"><code>relay status ./notes ./archive
relay sync ./notes ./archive --dry-run --verbose</code></pre>
            <p>
              The first example inspects differences. The second describes a proposed sync. Neither
              executes in this specimen.
            </p>
          </section>
          <button v-else @click="go('examples')">Expand worked examples →</button></template
        ><template v-else
          ><p class="eyebrow">MANUAL / SEARCH</p>
          <h1>find<span>(1)</span></h1>
          <p>{{ matches.length }} matching commands.</p>
          <button
            class="result"
            v-for="cmd in matches"
            :key="cmd"
            @click="
              selected = commands.indexOf(cmd);
              go('start');
            "
          >
            relay {{ cmd }} →
          </button>
          <div v-if="!matches.length">
            <h2>No command by that name.</h2>
            <p>Try sync, status, ignore, or restore.</p>
            <button @click="q = ''">Clear search</button>
          </div></template
        >
      </article>
    </main>
    <footer class="specimen-note">
      <span>Relay CLI · Fictional sample content · Design reference 41</span
      ><button @click="reset">Reset demo</button>
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'IBM Plex Mono';
  src: url('/fonts/ibm-plex-mono.woff2') format('woff2');
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
  color: #18201e;
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
  border-bottom: 1px solid #5a6d5c;
  display: flex;
  align-items: center;
  gap: 40px;
  font-size: 9px;
}
header strong {
  font-size: 26px;
  letter-spacing: -0.05em;
}
header strong span {
  color: #a9c39c;
}
header b {
  font-size: 9px;
  color: #a9c39c;
  font-weight: 400;
}
main {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 60px;
  max-width: 1300px;
  margin: auto;
  padding: 45px 4% 90px;
}
aside {
  border-right: 1px solid #4a5a4e;
  padding-right: 25px;
  font-size: 10px;
}
aside > p {
  color: #9aaf98;
  font-size: 9px;
  letter-spacing: 0.1em;
}
aside label {
  font-size: 9px;
  margin: 25px 0;
}
aside input {
  font-size: 11px;
  background: #202a23;
  border-color: #5a6d5c;
}
aside button {
  display: flex;
  justify-content: space-between;
  background: none;
  border: 0;
  color: #dbdfcf;
  font-size: 12px;
  width: 100%;
  padding: 13px 0;
  text-align: left;
}
aside button[aria-pressed='true'] {
  color: #bcd5aa;
  box-shadow: none;
}
aside span {
  color: #7c917c;
  font-size: 9px;
}
aside hr {
  border: 0;
  border-top: 1px solid #4a5a4e;
  margin: 25px 0;
}
aside small {
  display: block;
  color: #91a08b;
  font-size: 9px;
  line-height: 2;
  margin-top: 50px;
}
article {
  max-width: 850px;
}
.eyebrow {
  font-size: 9px;
  color: #a1b497;
}
article h1 {
  font: 57px/1.2 'IBM Plex Mono';
  letter-spacing: -0.04em;
  margin: 22px 0;
}
article h1 span {
  font-size: 0.55em;
  color: #91a08b;
}
.intro {
  font-size: 15px;
  line-height: 1.9;
  color: #ccd5c3;
  max-width: 70ch;
}
.synopsis {
  border: 1px solid #536852;
  padding: 20px;
  margin: 35px 0;
}
.synopsis > span {
  font-size: 9px;
  color: #a9c39c;
}
pre {
  font: 13px/1.9 'IBM Plex Mono';
  overflow: auto;
  max-width: 100%;
  padding-bottom: 4px;
}
article section {
  margin: 35px 0;
}
article h2 {
  font: 18px 'IBM Plex Mono';
  letter-spacing: -0.03em;
  color: #bad1a9;
}
article p {
  font-size: 12px;
  line-height: 1.95;
}
article dl {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 18px;
  font-size: 12px;
  line-height: 1.7;
}
article dt {
  color: #d4bd7a;
}
article dd {
  margin: 0;
  color: #bac8b2;
}
.example {
  background: #222e25;
  padding: 25px;
  border: 1px solid #536852;
}
.example .row {
  justify-content: space-between;
}
.example h2 {
  margin: 0;
}
.example button {
  font-size: 9px;
  background: none;
  color: #dce4cf;
  border-color: #6b8468;
  padding: 8px 12px;
  min-height: 32px;
}
.example label {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 11px;
  margin: 20px 0 0;
}
.example input {
  accent-color: #a9c39c;
}
.example pre {
  color: #d5c184;
}
.example p {
  font-size: 10px;
  color: #a8b8a0;
}
article > button {
  background: none;
  border-color: #6b8468;
  color: #dce4cf;
  font-size: 11px;
}
.result {
  display: block;
  width: 100%;
  text-align: left;
  padding: 20px 0 !important;
  border: 0 !important;
  border-top: 1px solid #536852 !important;
  font-size: 17px !important;
}
.specimen-note {
  border-color: #536852;
}
.specimen-note button {
  border-color: #6b8468;
  color: #dce4cf;
}
@media (max-width: 700px) {
  header > span:not(.grow) {
    display: none;
  }
  main {
    grid-template-columns: 160px 1fr;
    gap: 30px;
  }
  article dl {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  article dd {
    margin-bottom: 12px;
  }
}
@media (max-width: 600px) {
  header {
    padding: 23px;
    gap: 15px;
  }
  header b {
    font-size: 8px;
  }
  main {
    display: block;
    padding: 25px 22px 60px;
  }
  aside {
    border-right: 0;
    border-bottom: 1px solid #536852;
    padding: 0 0 20px;
    margin-bottom: 30px;
  }
  aside > p,
  aside > small,
  aside > hr {
    display: none;
  }
  aside label {
    margin: 0 0 15px;
  }
  aside button {
    display: inline-flex;
    width: auto;
    margin-right: 20px;
    gap: 12px;
    font-size: 11px;
  }
  article h1 {
    font-size: 43px;
  }
  .intro {
    font-size: 13px;
  }
  .synopsis {
    padding: 17px;
  }
  pre {
    font-size: 11px;
  }
  .example {
    padding: 18px;
  }
  article h2 {
    font-size: 16px;
  }
}
</style>
