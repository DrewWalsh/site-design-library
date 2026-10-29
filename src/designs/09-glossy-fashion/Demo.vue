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
    .filter((k) => k.startsWith('design-library:09:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const captions = ref(false);
</script>
<template>
  <div class="specimen" :class="{ entry: state === 'start' }">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <a :href="href('start')" @click.prevent="go('start')">CONTOUR</a>
      <nav><span>QUARTERLY / NO. 12</span><button @click="go('archive')">Archive</button></nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="cover">
          <div class="cover-type">
            <p class="eyebrow">Autumn 2026 / the in-between issue</p>
            <h1>The quiet<br /><em>edge.</em></h1>
            <p>On dressing for the space<br />between one thing and another.</p>
            <button @click="go('story')">ENTER THE COVER STORY ↗</button
            ><span class="vertical">STYLE IS A WAY OF PAYING ATTENTION.</span>
          </div>
          <figure>
            <img
              class=""
              src="/art/fashion.webp"
              alt="Portrait of a woman wearing a burgundy coat in a wooded setting"
              width="1200"
              height="900"
              loading="lazy"
            />
            <figcaption>PORTRAIT / AN ILLUSTRATIVE EDITORIAL STUDY</figcaption>
          </figure>
        </section>
        <section class="contents">
          <p class="eyebrow">Inside no. 12</p>
          <div class="row">
            <h2>People.<br />Places.<br />Ways of seeing.</h2>
            <ol>
              <li>
                <button @click="go('story')">
                  <small>01 / STYLE</small>
                  <h3>The quiet edge</h3>
                  <span>A conversation in layers.</span>
                </button>
              </li>
              <li>
                <button @click="go('story')">
                  <small>02 / OBJECTS</small>
                  <h3>A form of feeling</h3>
                  <span>Material, memory, and the things we keep.</span>
                </button>
              </li>
              <li>
                <button @click="go('story')">
                  <small>03 / PLACES</small>
                  <h3>Between walls</h3>
                  <span>Where the outside comes in.</span>
                </button>
              </li>
            </ol>
          </div>
        </section></template
      ><template v-else-if="state === 'story'"
        ><section class="story">
          <div>
            <p class="eyebrow">No. 12 / cover story</p>
            <h1>The quiet edge.</h1>
            <p>
              Clothes for the in-between. A fictional conversation about texture, season, and the
              comfort of a familiar shape.
            </p>
            <button @click="captions = !captions">
              {{ captions ? 'Hide' : 'Show' }} photograph credits
            </button>
            <p v-if="captions" class="credit">
              Licensed illustrative photograph. Exact photographer and source are recorded in
              docs/ASSETS.md. The model does not represent the fictional publication.
            </p>
            <h2>“A good coat holds a little of the day.”</h2>
            <p>
              There is a particular quality to autumn light: it makes surfaces visible. Wool,
              polished wood, the grain of a page. This issue follows that attention through clothes,
              objects, and spaces.
            </p>
          </div>
          <img
            class=""
            src="/art/fashion.webp"
            alt="Portrait study in burgundy and autumn green"
            width="1200"
            height="900"
            loading="lazy"
          />
        </section>
        <section class="interview">
          <p class="eyebrow">The conversation</p>
          <h2>What do you return to?</h2>
          <p>
            The things that make the day easier. A familiar silhouette. Pockets where you expect
            them. Something that feels considered without asking to be admired.
          </p>
          <h2>And what changes?</h2>
          <p>
            The context. The light. Who we are with. A simple object can hold all of that without
            changing its shape.
          </p>
          <button @click="go('archive')">Explore other issues →</button>
        </section></template
      >
      <section v-else class="archive">
        <p class="eyebrow">The collection</p>
        <h1>Another way<br />to look.</h1>
        <div>
          <button
            v-for="(title, i) in [
              'The in-between issue',
              'A sense of place',
              'Soft structures',
              'Everyday theatre',
            ]"
            :key="title"
            @click="go('story')"
          >
            <small>NO. {{ 12 - i }}</small>
            <h2>{{ title }}</h2>
            <span>OPEN ISSUE ↗</span>
          </button>
        </div>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Contour Quarterly · Fictional sample content · Design reference 09</span
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
  color: #191b18;
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
  padding: 28px 4%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid;
}
header > a {
  font: 38px 'Libre Baskerville';
  letter-spacing: -0.05em;
  text-decoration: none;
}
nav {
  display: flex;
  gap: 30px;
  align-items: center;
  font-size: 10px;
}
nav button {
  font-size: 12px;
  background: none;
  border: 0;
}
.cover {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  min-height: 730px;
}
.cover-type {
  padding: 55px 6% 45px 9%;
  position: relative;
}
.cover h1 {
  font-size: clamp(75px, 8vw, 120px);
  font-weight: 400;
  line-height: 1.05;
  margin: 65px 0 30px;
  letter-spacing: -0.06em;
}
.cover em {
  font-weight: 400;
}
.cover-type > p:not(.eyebrow) {
  font: 15px/1.8 'DM Sans';
}
.cover button {
  background: var(--accent);
  border: 0;
  padding: 18px 25px;
  font: 11px 'DM Sans';
  margin-top: 25px;
}
.cover figure {
  position: relative;
  background: #ccc;
}
.cover img {
  height: 730px;
  width: 100%;
  object-position: 48% 30%;
}
.cover figcaption {
  position: absolute;
  bottom: 18px;
  right: 18px;
  background: #f3f2eb;
  padding: 8px 12px;
  font: 8px 'DM Sans';
  letter-spacing: 0.08em;
}
.vertical {
  position: absolute;
  right: 15px;
  top: 80px;
  writing-mode: vertical-rl;
  font: 8px 'DM Sans';
  letter-spacing: 0.15em;
}
.contents {
  padding: 70px 7%;
  background: #d8e34a;
}
.contents > .row {
  align-items: start;
  justify-content: space-between;
  gap: 60px;
}
.contents h2 {
  font-size: 54px;
  line-height: 1.2;
  font-weight: 400;
}
.contents ol {
  padding: 0;
  list-style: none;
  flex: 1;
  max-width: 650px;
}
.contents li {
  border-top: 1px solid;
  padding: 18px 0;
}
.contents button {
  background: none;
  border: 0;
  padding: 0;
  text-align: left;
  width: 100%;
}
.contents small {
  font-size: 10px;
}
.contents h3 {
  font-size: 27px;
  font-weight: 400;
  margin: 12px 0;
}
.contents span {
  font-size: 12px;
}
.story {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 7%;
  padding: 60px 6%;
}
.story h1 {
  font-size: 72px;
  font-weight: 400;
}
.story h2 {
  font-weight: 400;
  font-size: 33px;
  line-height: 1.5;
  margin-top: 55px;
}
.story p {
  font-size: 15px;
  line-height: 1.9;
}
.story img {
  width: 100%;
  height: 850px;
}
.story button {
  font: 11px 'DM Sans';
  background: transparent;
}
.credit {
  font-size: 11px !important;
}
.interview {
  max-width: 780px;
  padding: 30px 30px 90px;
  margin: auto;
}
.interview h2 {
  font-weight: 400;
}
.interview p {
  font-size: 16px;
  line-height: 1.9;
}
.archive {
  padding: 60px 7% 100px;
}
.archive h1 {
  font-weight: 400;
}
.archive > div {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}
.archive button {
  background: #d8e34a;
  text-align: left;
  padding: 35px;
  border: 0;
  min-height: 280px;
}
.archive button:nth-child(even) {
  background: #d9cec3;
}
.archive h2 {
  font-weight: 400;
  font-size: 40px;
}
.archive small,
.archive span {
  font: 11px 'DM Sans';
}
@media (max-width: 650px) {
  header {
    padding: 23px 5%;
  }
  header > a {
    font-size: 27px;
  }
  nav > span {
    display: none;
  }
  .cover {
    display: flex;
    flex-direction: column-reverse;
  }
  .cover img {
    height: 450px;
  }
  .cover-type {
    padding: 30px 7% 50px;
  }
  .cover h1 {
    font-size: 72px;
    margin: 25px 0;
  }
  .vertical {
    display: none;
  }
  .contents {
    padding: 40px 7%;
  }
  .contents > .row {
    display: block;
  }
  .contents h2 {
    font-size: 42px;
  }
  .story {
    grid-template-columns: 1fr;
    padding: 40px 7%;
  }
  .story h1 {
    font-size: 52px;
  }
  .story img {
    height: 550px;
  }
  .archive > div {
    grid-template-columns: 1fr;
  }
  .archive h2 {
    font-size: 34px;
  }
}
.eyebrow {
  font: 500 11px/1.5 'DM Sans';
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

/* The entry is the experience itself; supporting routes retain its vocabulary. */

.entry {
  position: relative;
  background: #181b18;
}
.entry header {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 3;
  max-width: none;
  width: 100%;
  margin: 0;
  padding: 20px 4% 80px;
  border: 0;
  display: block;
  background: linear-gradient(#101510aa, transparent);
  color: #fff4df;
}
.entry header > a {
  display: block;
  font:
    clamp(70px, 14vw, 210px)/1 'Libre Baskerville',
    serif;
  letter-spacing: -0.095em;
  color: #fff4df;
  text-align: center;
}
.entry header nav {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  font-size: 10px;
  letter-spacing: 0.15em;
}
.entry header button {
  color: #fff4df;
  font-size: 11px;
  border: 0;
  background: none;
}
.entry main {
  max-width: none;
  width: 100%;
  padding: 0;
  margin: 0;
}
.entry .cover {
  height: 100svh;
  min-height: 850px;
  position: relative;
  display: block;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
.entry .cover figure {
  position: absolute;
  inset: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
.entry .cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 35%;
}
.entry .cover figure::after {
  content: '';
  position: absolute;
  inset: 40% 0 0;
  background: linear-gradient(transparent, #111b16d9);
}
.entry .cover figcaption {
  position: absolute;
  right: 4%;
  bottom: 25px;
  color: #fff4df;
  z-index: 2;
  font-size: 8px;
  background: none;
}
.entry .cover-type {
  position: absolute;
  z-index: 2;
  left: 5%;
  right: 5%;
  bottom: 70px;
  padding: 0;
  background: none;
  color: #fff4df;
}
.entry .cover-type .eyebrow {
  font-size: 10px;
  letter-spacing: 0.2em;
}
.entry .cover-type h1 {
  font-size: clamp(65px, 7.5vw, 115px);
  line-height: 0.95;
  font-weight: 400;
  margin: 25px 0;
  max-width: 6em;
  letter-spacing: -0.05em;
}
.entry .cover-type > p:not(.eyebrow) {
  font-size: 14px;
  line-height: 1.8;
}
.entry .cover-type button {
  background: #d8e34a;
  color: #191b18;
  border: 0;
  padding: 15px 22px;
  font-size: 11px;
}
.entry .vertical {
  right: 0;
  left: auto;
  font-size: 9px;
}
.entry .contents {
  padding: 65px 7%;
  background: #d8e34a;
  color: #191b18;
}
.story {
  grid-template-columns: 1fr 1.3fr;
}
.story > img {
  height: 850px;
  object-fit: cover;
}
.story > div {
  padding-top: 45px;
}
@media (max-width: 750px) {
  .entry header {
    padding: 25px 5% 65px;
  }
  .entry header > a {
    font-size: 13vw;
    letter-spacing: -0.08em;
  }
  .entry header nav {
    font-size: 8px;
  }
  .entry header button {
    font-size: 10px;
  }
  .entry .cover {
    min-height: 760px;
    height: 100svh;
  }
  .entry .cover img {
    object-position: 62% 35%;
  }
  .entry .cover-type {
    bottom: 65px;
    left: 7%;
    right: 7%;
  }
  .entry .cover-type h1 {
    font-size: 63px;
    margin: 20px 0;
  }
  .entry .cover-type .eyebrow {
    font-size: 8px;
  }
  .entry .cover-type > p:not(.eyebrow) {
    font-size: 12px;
  }
  .entry .cover-type button {
    font-size: 9px;
    padding: 14px 17px;
  }
  .entry .vertical {
    display: none;
  }
  .entry .cover figcaption {
    font-size: 7px;
    left: 7%;
    right: auto;
  }
  .story {
    display: flex;
    flex-direction: column-reverse;
  }
  .story > img {
    height: 500px;
    width: 100%;
  }
  .story > div {
    padding-top: 15px;
  }
}
</style>
