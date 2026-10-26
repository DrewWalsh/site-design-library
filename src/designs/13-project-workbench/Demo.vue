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
    .filter((k) => k.startsWith('design-library:13:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const scenes = useStored('13:scenes', [
  {
    name: 'The arrival',
    tag: 'Exterior',
    description: 'A quiet platform at the edge of the town. The last train has just left.',
  },
  {
    name: 'The workshop',
    tag: 'Interior',
    description: 'Afternoon light falls across a workbench. A radio plays in the next room.',
  },
  {
    name: 'River crossing',
    tag: 'Exterior',
    description: 'A small footbridge connects two parts of a familiar landscape.',
  },
]);
const draft = ref({ ...scenes.value[0] });
watch(selected, () => (draft.value = { ...scenes.value[selected.value] }));
const dirty = computed(
  () => JSON.stringify(draft.value) !== JSON.stringify(scenes.value[selected.value]),
);
if (state.value === 'edit') draft.value.description += ' A lantern has been left on the bench.';
function save() {
  scenes.value[selected.value] = { ...draft.value };
  message.value = 'Scene saved locally.';
}
const filtered = computed(() =>
  scenes.value.filter((s) => s.name.toLowerCase().includes(q.value.toLowerCase())),
);
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>▧ Scene Workshop</strong><span>Northbank / A small world</span
      ><span class="grow"></span><span v-if="dirty" class="unsaved">● Unsaved changes</span
      ><button class="primary" @click="save">Save scene</button>
    </header>
    <main id="content">
      <aside class="tree">
        <p class="eyebrow">PROJECT EXPLORER</p>
        <label>Find a scene<input v-model="q" placeholder="Search scenes…" /></label>
        <p class="folder">▾ A small world</p>
        <button
          v-for="s in filtered"
          :key="s.name"
          :aria-pressed="selected === scenes.indexOf(s)"
          @click="
            selected = scenes.indexOf(s);
            go('start');
          "
        >
          <span>▧</span> {{ s.name }}
        </button>
        <p v-if="!filtered.length">No matching scene.</p>
        <div class="tree-bottom">3 scenes / local project<br />All content is fictional.</div>
      </aside>
      <section class="stage">
        <div class="row">
          <span class="eyebrow">SCENES / 0{{ selected + 1 }}</span
          ><span class="grow"></span
          ><button @click="go(state === 'preview' ? 'start' : 'preview')">
            {{ state === 'preview' ? 'Edit scene' : 'Preview card' }}
          </button>
        </div>
        <h1>{{ draft.name }}</h1>
        <div class="scene-image" :class="'scene-' + selected">
          <div class="moon"></div>
          <div class="mountain m1"></div>
          <div class="mountain m2"></div>
          <div class="platform"></div>
          <div class="shelter"></div>
          <span>ORIGINAL SCENE STUDY / {{ draft.tag.toUpperCase() }}</span>
        </div>
        <div class="scene-copy">
          <p class="eyebrow">SCENE DESCRIPTION</p>
          <p>{{ draft.description }}</p>
          <div class="row">
            <span>SCN-00{{ selected + 1 }}</span
            ><span>{{ draft.tag }}</span
            ><span>Draft sequence</span>
          </div>
        </div>
        <section class="notes">
          <h2>Direction notes</h2>
          <p>
            Keep the scale intimate. The environment should tell a story before a character enters
            it. This specimen edits descriptive metadata, not game logic.
          </p>
          <p v-if="message" role="status" class="message">{{ message }}</p>
        </section>
      </section>
      <aside class="inspector" v-if="state !== 'preview'">
        <p class="eyebrow">SCENE PROPERTIES</p>
        <label>Scene name<input v-model="draft.name" /></label
        ><label
          >Location type<select v-model="draft.tag">
            <option>Exterior</option>
            <option>Interior</option>
          </select></label
        ><label>Description<textarea v-model="draft.description"></textarea></label
        ><button class="primary" @click="save">Save changes</button
        ><button v-if="dirty" @click="draft = { ...scenes[selected] }">Discard changes</button>
        <hr />
        <h3>Object information</h3>
        <p>Type: Scene<br />Sequence: {{ selected + 1 }} of 3<br />Storage: This browser</p>
      </aside>
    </main>
    <footer class="specimen-note">
      <span>Scene Workshop · Fictional sample content · Design reference 13</span
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
  color: #172a25;
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
  gap: 30px;
  align-items: center;
  padding: 18px 25px;
  border-bottom: 1px solid #46525b;
  font-size: 12px;
}
header strong {
  font-size: 19px;
}
.unsaved {
  color: #e3bd75;
  font-size: 11px;
}
header button {
  font-size: 12px;
}
main {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr) 270px;
  min-height: 900px;
}
.tree {
  padding: 28px 18px;
  border-right: 1px solid #46525b;
  background: #252c32;
  font-size: 12px;
}
.tree label {
  font-size: 10px;
}
.tree input {
  font-size: 11px;
  background: #1c2228;
  padding: 10px;
}
.folder {
  margin-top: 30px;
  color: #bac8c7;
}
.tree button {
  border: 0;
  background: none;
  display: block;
  text-align: left;
  width: 100%;
  font-size: 12px;
  padding: 14px 10px;
}
.tree button[aria-pressed='true'] {
  background: #344c47;
  color: #a9dfcc;
  box-shadow: none;
}
.tree button span {
  margin-right: 8px;
}
.tree-bottom {
  margin-top: 110px;
  font-size: 10px;
  line-height: 1.9;
  color: #9cacb2;
}
.stage {
  padding: 30px;
}
.stage > .row button {
  font-size: 11px;
  padding: 8px 12px;
  min-height: 32px;
}
.stage h1 {
  font-size: 35px;
  margin: 25px 0;
}
.scene-image {
  height: 340px;
  position: relative;
  background: #7d9698;
  overflow: hidden;
}
.moon {
  width: 70px;
  height: 70px;
  position: absolute;
  top: 30px;
  right: 60px;
  border-radius: 50%;
  background: #e3d7ae;
}
.mountain {
  position: absolute;
  width: 350px;
  height: 350px;
  transform: rotate(45deg);
  background: #4a6769;
  bottom: -200px;
  left: -40px;
}
.m2 {
  left: auto;
  right: -100px;
  bottom: -170px;
  background: #3e5659;
}
.platform {
  height: 45px;
  background: #b5a48b;
  bottom: 40px;
  position: absolute;
  width: 100%;
}
.shelter {
  width: 130px;
  height: 100px;
  position: absolute;
  border: 7px solid #293f40;
  border-bottom: 0;
  bottom: 85px;
  left: 25%;
  background: #d2c3a199;
}
.scene-image > span {
  position: absolute;
  bottom: 12px;
  left: 16px;
  color: #172e2f;
  font-size: 9px;
  letter-spacing: 0.09em;
}
.scene-1 {
  background: #aa947b;
}
.scene-2 {
  background: #778997;
}
.scene-copy {
  background: #293239;
  padding: 25px;
  border: 1px solid #46525b;
  border-top: 0;
}
.scene-copy p {
  font-size: 14px;
}
.scene-copy .row {
  font: 10px monospace;
  color: #c0d0d0;
}
.notes {
  padding: 25px 0;
}
.notes h2 {
  font-size: 21px;
}
.notes p {
  font-size: 13px;
  color: #b8c5c9;
}
.inspector {
  padding: 30px 23px;
  border-left: 1px solid #46525b;
  background: #252c32;
}
.inspector label {
  font-size: 11px;
  margin: 25px 0;
}
.inspector input,
.inspector select,
.inspector textarea {
  font-size: 12px;
  background: #1c2228;
  border-color: #536069;
}
.inspector textarea {
  height: 180px;
}
.inspector button {
  width: 100%;
  margin-bottom: 12px;
  font-size: 12px;
}
.inspector hr {
  border: 0;
  border-top: 1px solid #46525b;
  margin: 30px 0;
}
.inspector h3 {
  font-size: 14px;
}
.inspector p {
  font-size: 11px;
  line-height: 2;
}
.specimen-note {
  border-color: #46525b;
}
.specimen-note button {
  border-color: #687881;
}
@media (max-width: 1000px) {
  main {
    grid-template-columns: 170px 1fr;
  }
  .inspector {
    grid-column: 2;
    border-top: 1px solid #46525b;
  }
  .tree {
    grid-row: span 2;
  }
  .stage {
    padding: 25px;
  }
}
@media (max-width: 600px) {
  header {
    padding: 15px;
    gap: 10px;
  }
  header strong {
    font-size: 16px;
  }
  header > span:not(.grow) {
    display: none;
  }
  main {
    display: block;
  }
  .tree {
    padding: 20px;
  }
  .tree .eyebrow,
  .folder,
  .tree-bottom {
    display: none;
  }
  .tree button {
    display: inline-block;
    width: auto;
    padding: 12px;
    font-size: 11px;
  }
  .tree label {
    margin-bottom: 12px;
  }
  .stage {
    padding: 20px;
  }
  .stage h1 {
    font-size: 31px;
  }
  .scene-image {
    height: 280px;
  }
  .inspector {
    padding: 25px;
  }
  .inspector textarea {
    height: 110px;
  }
}
.scene-image > span {
  background: #213b3d;
  color: #fff;
  padding: 5px 8px;
}
</style>
