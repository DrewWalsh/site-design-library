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
    .filter((k) => k.startsWith('design-library:06:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const saved = useStored<string[]>('06:saved', []);
const stories = [
  'The long way home is open again',
  'A new chapter for the old library',
  'Where the town comes to eat',
  'The small businesses on our high street',
];
const visible = computed(() =>
  stories.filter((s) => s.toLowerCase().includes(q.value.toLowerCase())),
);
function save() {
  const s = stories[selected.value];
  saved.value = saved.value.includes(s) ? saved.value.filter((x) => x !== s) : [...saved.value, s];
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <div class="date">
        <span>MONDAY, 26 OCTOBER 2026</span
        ><span>INDEPENDENT LOCAL JOURNALISM · SAMPLE EDITION</span
        ><button @click="go('saved')">Saved ({{ saved.length }})</button>
      </div>
      <a class="masthead" :href="href('start')" @click.prevent="go('start')"
        >The Northbank Record</a
      >
      <nav>
        <button
          v-for="s in ['Front page', 'City', 'Culture', 'Food & drink', 'Opinion']"
          :key="s"
          :aria-pressed="tab === s"
          @click="
            tab = s;
            go('start');
          "
        >
          {{ s }}</button
        ><label
          ><input v-model="q" aria-label="Search stories" placeholder="Search the Record"
        /></label>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><p class="sectionline">
          {{ tab === 'All' ? 'FRONT PAGE' : tab.toUpperCase() }}
          <span>THE STORIES THAT MAKE A PLACE.</span>
        </p>
        <div class="front" v-if="!q">
          <article class="lead">
            <p class="eyebrow">CITY / PUBLIC SPACE</p>
            <h1>
              <a
                :href="href('article')"
                @click.prevent="
                  selected = 0;
                  go('article');
                "
                >The long way home<br />is open again</a
              >
            </h1>
            <p class="standfirst">
              After two quiet years, the riverside path returns to the people who know it best.
            </p>
            <img
              class=""
              src="/art/lake.webp"
              alt="A wooded landscape reflected in still water"
              width="1200"
              height="900"
              loading="lazy"
            />
            <p>
              For commuters, dog walkers, and people taking the scenic route, a familiar stretch of
              the river has become part of daily life again.
            </p>
            <small>By Lena Marsh · 6 min read</small>
          </article>
          <div class="middle">
            <article>
              <p class="eyebrow">CULTURE</p>
              <h2>
                <a
                  :href="href('article')"
                  @click.prevent="
                    selected = 1;
                    go('article');
                  "
                  >A new chapter for the old library</a
                >
              </h2>
              <img
                class=""
                src="/art/architecture.webp"
                alt="An architectural study in concrete and light"
                width="1200"
                height="900"
                loading="lazy"
              />
              <p>What happens when a place built for books makes room for everything else?</p>
            </article>
            <article>
              <p class="eyebrow">THE WEEKEND TABLE</p>
              <h2>
                <a
                  :href="href('article')"
                  @click.prevent="
                    selected = 2;
                    go('article');
                  "
                  >Where the town comes to eat</a
                >
              </h2>
              <p>A guide to the small kitchens making a big impression.</p>
            </article>
          </div>
          <aside>
            <h3>The brief</h3>
            <div
              v-for="(text, i) in [
                'Evening bus service adds a final departure',
                'Saturday market moves indoors',
                'New repair café opens its doors',
                'The week ahead: four things to see',
              ]"
              :key="text"
            >
              <small>0{{ i + 1 }} / IN BRIEF</small
              ><button
                @click="
                  selected = i;
                  go('article');
                "
              >
                {{ text }}
              </button>
            </div>
            <p class="fiction">This entire newspaper is fictional sample content.</p>
          </aside>
        </div>
        <section v-else>
          <h1>Search results</h1>
          <button
            class="result"
            v-for="s in visible"
            :key="s"
            @click="
              selected = stories.indexOf(s);
              go('article');
            "
          >
            {{ s }} →
          </button>
          <p v-if="!visible.length">
            No stories match. <button @click="q = ''">Clear search</button>
          </p>
        </section>
        <section class="opinion">
          <p class="eyebrow">OPINION / LETTERS FROM NORTHBANK</p>
          <h2>A town is more than the things we build in it.</h2>
          <p>
            It is the routes between them, the places to pause, and the people we meet along the
            way.
          </p>
          <button
            @click="
              selected = 3;
              go('article');
            "
          >
            Read the editor’s note →
          </button>
        </section></template
      >
      <article v-else-if="state === 'article'" class="story">
        <p class="eyebrow">{{ tab === 'All' ? 'CITY' : tab }} / FEATURE</p>
        <h1>{{ stories[selected] }}</h1>
        <p class="standfirst">
          The familiar places that shape a town are changing. We went to see what stays the same.
        </p>
        <p class="byline">Lena Marsh · 26 October 2026 · Fictional reporting</p>
        <img
          class=""
          src="/art/lake.webp"
          alt="The landscape beside a quiet wooded lake"
          width="1200"
          height="900"
          loading="lazy"
        />
        <div class="storytext">
          <p>
            At eight in the morning, the path is already busy. People move at different speeds, but
            for a few hundred metres they share the same direction.
          </p>
          <p>
            The fictional reopening described here offers a complete article context: a headline
            with purpose, a summary, a byline, a strong image, and a sustained reading column.
          </p>
          <h2>A place to pass through, and to stay</h2>
          <p>
            New seating has been placed where the view opens up. The surface is smoother, but the
            route follows the same gentle curve. Small changes can make a familiar place easier to
            use without making it unrecognisable.
          </p>
          <button @click="save">
            {{ saved.includes(stories[selected]) ? 'Remove from saved' : 'Save for later' }}
          </button>
          <h3>Related coverage</h3>
          <button @click="selected = (selected + 1) % 4">
            {{ stories[(selected + 1) % 4] }} →
          </button>
        </div>
      </article>
      <section v-else class="saved">
        <h1>Your reading list</h1>
        <p v-if="!saved.length">Nothing saved yet. Open a story and choose “Save for later”.</p>
        <button
          class="result"
          v-for="s in saved"
          :key="s"
          @click="
            selected = stories.indexOf(s);
            go('article');
          "
        >
          {{ s }} →</button
        ><button @click="go('start')">Back to the front page</button>
      </section>
    </main>
    <footer class="specimen-note">
      <span>The Northbank Record · Fictional sample content · Design reference 06</span
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
  padding: 20px 4% 0;
}
.date {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  align-items: center;
  font-size: 9px;
  border-bottom: 1px solid;
  padding-bottom: 10px;
}
.date button {
  background: none;
  border: 0;
  font-size: 10px;
  padding: 0;
  min-height: 25px;
}
.masthead {
  font: clamp(35px, 5.6vw, 80px)/1.4 'Libre Baskerville';
  font-weight: 700;
  text-align: center;
  display: block;
  text-decoration: none;
  letter-spacing: -0.06em;
  padding: 15px 0;
}
nav {
  display: flex;
  justify-content: space-between;
  border-top: 3px solid;
  border-bottom: 1px solid;
  align-items: center;
  padding: 9px 0;
  gap: 15px;
}
nav button {
  border: 0;
  background: none;
  font-size: 12px;
  padding: 8px;
  min-height: 30px;
}
nav input {
  font-size: 10px;
  padding: 8px;
  background: transparent;
  min-height: 30px;
  max-width: 160px;
}
main {
  padding: 25px 4% 70px;
  max-width: 1600px;
  margin: auto;
}
.sectionline {
  font-size: 10px;
  color: var(--accent);
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
.sectionline span {
  color: #666e63;
  letter-spacing: 0.1em;
  font-weight: 400;
  font-size: 9px;
}
.front {
  display: grid;
  grid-template-columns: 2.3fr 1.2fr 0.8fr;
  gap: 32px;
}
.front a {
  text-decoration: none;
}
.lead h1 {
  font-size: 44px;
  line-height: 1.2;
  margin: 10px 0 20px;
  letter-spacing: -0.04em;
}
.standfirst {
  font: 16px/1.7 'Libre Baskerville';
}
.lead img {
  width: 100%;
  height: 285px;
  margin: 25px 0 18px;
}
.lead > p:not(.standfirst) {
  font-size: 13px;
}
.lead small {
  font-size: 10px;
}
.middle {
  border-left: 1px solid var(--line);
  padding-left: 28px;
}
.middle h2 {
  font: 24px/1.35 'Libre Baskerville';
  font-weight: 700;
}
.middle img {
  height: 170px;
  width: 100%;
}
.middle p {
  font-size: 12px;
}
.middle article + article {
  border-top: 1px solid var(--line);
  padding-top: 25px;
  margin-top: 30px;
}
.front aside {
  border-left: 1px solid var(--line);
  padding-left: 25px;
}
.front aside h3 {
  font-size: 20px;
  margin-top: 0;
}
.front aside > div {
  border-bottom: 1px solid var(--line);
  padding: 20px 0;
}
.front aside small {
  font-size: 9px;
  color: #766f62;
}
.front aside button {
  border: 0;
  background: none;
  padding: 10px 0;
  text-align: left;
  font: 13px/1.7 'Libre Baskerville';
}
.fiction {
  font-size: 10px;
  line-height: 1.7;
  color: #766f62;
  margin-top: 30px;
}
.opinion {
  border-top: 3px solid;
  margin-top: 45px;
  padding-top: 30px;
}
.opinion h2 {
  font: 30px/1.4 'Libre Baskerville';
}
.opinion p {
  font-size: 14px;
}
.opinion button {
  background: none;
  border: 0;
  padding: 0;
  font-size: 12px;
  text-decoration: underline;
}
.story {
  max-width: 900px;
  margin: auto;
}
.story h1 {
  font-size: 58px;
  line-height: 1.3;
}
.story > img {
  height: 450px;
  width: 100%;
  margin: 35px 0;
}
.byline {
  font-size: 11px;
}
.storytext {
  max-width: 650px;
  margin: auto;
  font: 16px/1.9 'Libre Baskerville';
}
.storytext h2 {
  font-size: 28px;
}
.storytext button {
  font: 13px 'DM Sans';
}
.saved {
  min-height: 650px;
}
.result {
  display: block;
  width: 100%;
  text-align: left;
  border: 0;
  border-bottom: 1px solid;
  background: none;
  padding: 25px 0;
  font: 24px 'Libre Baskerville';
}
@media (max-width: 900px) {
  .front {
    grid-template-columns: 2fr 1fr;
  }
  .front aside {
    grid-column: 1/-1;
    border: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .front aside h3,
  .fiction {
    grid-column: 1/-1;
  }
  .date span:nth-child(2) {
    display: none;
  }
}
@media (max-width: 600px) {
  .masthead {
    font-size: 33px;
    padding: 20px 0;
  }
  nav {
    flex-wrap: wrap;
    gap: 5px;
  }
  nav button {
    font-size: 10px;
  }
  nav label {
    width: 100%;
  }
  nav input {
    max-width: none;
    width: 100%;
  }
  .sectionline span {
    display: none;
  }
  .front {
    display: block;
  }
  .lead h1 {
    font-size: 35px;
  }
  .lead img {
    height: 240px;
  }
  .middle {
    padding: 30px 0 0;
    border: 0;
    margin-top: 30px;
    border-top: 1px solid;
  }
  .middle img {
    height: 230px;
  }
  .front aside {
    display: block;
    margin-top: 30px;
  }
  .front aside > div {
    padding: 12px 0;
  }
  .story h1 {
    font-size: 39px;
  }
  .story > img {
    height: 250px;
  }
  .storytext {
    font-size: 15px;
  }
}
</style>
