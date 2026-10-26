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
    .filter((k) => k.startsWith('design-library:07:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const large = ref(false),
  spacious = ref(false);
const pieces = [
  'The art of staying',
  'A room with no purpose',
  'In praise of the unfinished',
  'Notes from a slow train',
];
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <a class="mast" :href="href('start')" @click.prevent="go('start')"
        >The Long Afternoon<span>A journal of ordinary attention</span></a
      >
      <nav>
        <a :href="href('start')" @click.prevent="go('start')">The current issue</a
        ><a :href="href('author')" @click.prevent="go('author')">Contributors</a>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><div class="issue">
          <span>ISSUE NO. 08</span><span>AUTUMN 2026</span><span>ON REMAINING</span>
        </div>
        <section class="lead">
          <p class="eyebrow">An essay by Nora Bell</p>
          <h1>The art<br />of staying.</h1>
          <p class="dek">What happens when we stop looking for somewhere else to be?</p>
          <a class="read" :href="href('essay')" @click.prevent="go('essay')"
            >Read the essay <span>↗</span></a
          >
          <div
            class="still-life"
            aria-label="Original illustration of an afternoon sun beside a window"
            role="img"
          >
            <i></i><b></b>
          </div>
        </section>
        <section class="contents">
          <div>
            <p class="eyebrow">In this issue</p>
            <h2>Small things,<br />given their due.</h2>
            <p>Four essays on the places, habits, and unfinished thoughts we choose to keep.</p>
          </div>
          <ol>
            <li v-for="(piece, i) in pieces" :key="piece">
              <a
                :href="href('essay')"
                @click.prevent="
                  selected = i;
                  go('essay');
                "
                ><small>0{{ i + 1 }} / ESSAY</small>
                <h3>{{ piece }}</h3>
                <span
                  >{{ ['Nora Bell', 'Elias Moss', 'Ada Wren', 'June Lee'][i] }} ·
                  {{ [9, 6, 11, 7][i] }} min read →</span
                ></a
              >
            </li>
          </ol>
        </section></template
      ><template v-else-if="state === 'essay'"
        ><div class="reader" :class="{ large, spacious }">
          <p class="eyebrow">Issue 08 / Essay 0{{ selected + 1 }}</p>
          <h1>{{ pieces[selected] }}</h1>
          <p class="byline">
            By <a :href="href('author')" @click.prevent="go('author')">Nora Bell</a> · An original
            fictional essay
          </p>
          <details>
            <summary>Reading preferences</summary>
            <div class="row">
              <button :aria-pressed="large" @click="large = !large">Larger text</button
              ><button :aria-pressed="spacious" @click="spacious = !spacious">
                More line spacing
              </button>
            </div>
          </details>
          <div class="prose">
            <p class="drop">
              There is a chair in the corner of the kitchen that nobody bought. It arrived with the
              house, or so we say. In the afternoon, the light falls across its seat and makes a
              small, unremarkable invitation.
            </p>
            <p>
              I used to think of staying as the thing that happened when leaving was impossible. A
              compromise with circumstance. But the longer I have lived here, the less useful that
              distinction seems. There are ways to stay that require as much attention as any
              journey.
            </p>
            <h2>The shape of an ordinary day</h2>
            <p>
              At eleven the post arrives. At two a shadow touches the windowsill. The neighbour’s
              door has a particular sound in winter. None of this is a revelation. It is only what
              becomes visible when we stop asking the day to prove itself.
            </p>
            <p>
              Attention is not an achievement. Some days it is simply a willingness to leave the
              phone in another room, to let the kettle take its time, to notice that the chair has a
              new mark on its leg.
            </p>
            <blockquote>
              Perhaps a place becomes ours through the things we stop trying to improve.
            </blockquote>
            <p>
              By evening the light is gone. The chair is a chair again. I move it back under the
              table and find that I have, for once, no wish to be anywhere else.
            </p>
          </div>
          <div class="next">
            <small>CONTINUE THE ISSUE</small
            ><button
              @click="
                selected = (selected + 1) % 4;
                go('essay');
              "
            >
              {{ pieces[(selected + 1) % 4] }} →
            </button>
          </div>
        </div></template
      >
      <section v-else class="author">
        <p class="eyebrow">Contributors / 01</p>
        <h1>Nora Bell</h1>
        <p class="dek">
          Nora writes about domestic spaces, ordinary rituals, and the uses of attention.
        </p>
        <p>
          A fictional contributor to The Long Afternoon. This sample biography demonstrates a quiet
          author page without distracting from the writing.
        </p>
        <h2>In this issue</h2>
        <a :href="href('essay')" @click.prevent="go('essay')">The art of staying →</a>
      </section>
    </main>
    <footer class="specimen-note">
      <span>The Long Afternoon · Fictional sample content · Design reference 07</span
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
  padding: 30px 6%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--line);
  gap: 25px;
}
.mast {
  font: 26px 'Libre Baskerville';
  text-decoration: none;
}
.mast span {
  display: block;
  font: 11px 'DM Sans';
  letter-spacing: 0.14em;
  margin-top: 10px;
}
nav {
  display: flex;
  gap: 30px;
  font-size: 13px;
}
main {
  max-width: 1300px;
  margin: auto;
  padding: 0 6%;
}
.issue {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  letter-spacing: 0.14em;
  padding: 22px 0;
  border-bottom: 1px solid var(--line);
}
.lead {
  padding: 65px 0 80px;
  position: relative;
  min-height: 540px;
}
.lead h1 {
  font-size: clamp(70px, 8vw, 116px);
  font-weight: 400;
  line-height: 1.08;
  margin: 20px 0 30px;
  max-width: 660px;
}
.dek {
  font: 20px/1.7 'Libre Baskerville';
  max-width: 520px;
}
.read {
  display: block;
  margin-top: 28px;
  width: 240px;
  border-bottom: 1px solid;
  padding-bottom: 12px;
  font-size: 14px;
}
.read span {
  float: right;
}
.still-life {
  position: absolute;
  right: 1%;
  top: 90px;
  width: 28%;
  height: 340px;
  background: #e8e1ce;
  overflow: hidden;
}
.still-life i {
  position: absolute;
  width: 190px;
  height: 190px;
  background: #c6a77a;
  border-radius: 50%;
  top: 45px;
  right: -30px;
}
.still-life b {
  position: absolute;
  left: 24px;
  top: 0;
  width: 48%;
  height: 100%;
  border: 14px solid #7a856c;
  transform: skewY(-8deg);
}
.contents {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 80px;
  border-top: 1px solid;
  padding: 50px 0 80px;
}
.contents h2 {
  font-weight: 400;
  line-height: 1.4;
}
.contents ol {
  padding: 0;
  list-style: none;
  margin: 0;
}
.contents li {
  border-bottom: 1px solid var(--line);
  padding: 25px 0;
}
.contents li:first-child {
  padding-top: 0;
}
.contents a {
  text-decoration: none;
}
.contents h3 {
  font-weight: 400;
  margin: 12px 0;
}
.contents small,
.contents span {
  font-size: 12px;
}
.reader {
  max-width: 720px;
  margin: 65px auto;
}
.reader h1 {
  font-weight: 400;
  font-size: 58px;
  line-height: 1.2;
}
.byline {
  font-size: 13px;
}
.prose {
  font: 18px/1.9 'Libre Baskerville';
  margin-top: 30px;
}
.large .prose {
  font-size: 22px;
}
.spacious .prose {
  line-height: 2.2;
}
.drop:first-letter {
  float: left;
  font-size: 70px;
  line-height: 1;
  margin: 10px 12px 0 0;
}
blockquote {
  font-style: italic;
  border-left: 2px solid;
  padding-left: 25px;
  margin: 45px 0;
}
.next {
  border-top: 1px solid;
  padding: 30px 0;
  display: grid;
  gap: 15px;
}
.next button {
  text-align: left;
  background: none;
}
.author {
  padding: 70px 0 150px;
}
@media (max-width: 700px) {
  header {
    display: block;
  }
  .mast {
    font-size: 21px;
  }
  nav {
    margin-top: 24px;
  }
  .issue {
    font-size: 9px;
  }
  .lead {
    padding: 40px 0;
  }
  .lead h1 {
    font-size: 64px;
  }
  .still-life {
    position: relative;
    width: 100%;
    height: 170px;
    top: auto;
    right: auto;
    margin-top: 35px;
  }
  .still-life b {
    left: 45%;
    width: 20%;
  }
  .contents {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  .reader {
    margin: 35px auto;
  }
  .reader h1 {
    font-size: 42px;
  }
  .prose {
    font-size: 17px;
  }
}
</style>
