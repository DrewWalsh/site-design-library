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
    .filter((k) => k.startsWith('design-library:36:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const stories = ['After the last train', 'DIY is a verb', 'Rooms that listen'];
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <div class="topline">
        <span>INDEPENDENT NOISE / NORTHBANK</span><span>ISSUE 014 · £0 IN THE DEMO</span>
      </div>
      <a class="mast" :href="href('start')" @click.prevent="go('start')">UNDERPASS<span>↙</span></a>
      <nav>
        <a :href="href('start')" @click.prevent="go('start')">IN THIS ISSUE</a
        ><a :href="href('archive')" @click.prevent="go('archive')">THE ARCHIVE</a
        ><a :href="href('article')" @click.prevent="go('article')">READ SOMETHING</a>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="spread">
          <div class="leadimage">
            <img
              class=""
              src="/art/concert.webp"
              alt="Black and white photograph of a concert crowd with raised hands"
              width="1200"
              height="900"
              loading="lazy"
            /><span class="stamp">STILL<br />HERE.</span
            ><small>THE ROOM, BEFORE THE LIGHTS COME UP.</small>
          </div>
          <article class="feature">
            <span class="tape">FIELD REPORT / 01</span>
            <h1>After<br />the last<br /><em>train.</em></h1>
            <p>
              The tiny venues keeping a town awake. A night spent with the people who sweep the
              floor, run the door, and make the noise.
            </p>
            <a
              :href="href('article')"
              @click.prevent="
                selected = 0;
                go('article');
              "
              >GET INTO IT →</a
            >
          </article>
          <div class="sidepiece">
            <p class="eyebrow">A note from the editors</p>
            <h2>Culture happens<br />in spare rooms.</h2>
            <p>
              It starts with a borrowed amp. A photocopier. Someone who says yes before they know
              how. This issue is for them.
            </p>
          </div>
        </section>
        <section class="lower">
          <div>
            <span class="number">02</span>
            <h2>DIY<br />is a verb.</h2>
            <p>Seven people making things happen with very little.</p>
            <a
              :href="href('article')"
              @click.prevent="
                selected = 1;
                go('article');
              "
              >READ THE CONVERSATION →</a
            >
          </div>
          <div>
            <p class="eyebrow">03 / PHOTO ESSAY</p>
            <h2>Rooms<br />that listen.</h2>
            <p>A dispatch from the other side of the stage.</p>
            <a
              :href="href('article')"
              @click.prevent="
                selected = 2;
                go('article');
              "
              >OPEN THE STORY →</a
            >
          </div>
          <aside>
            <h3>Not a platform.<br />A publication.</h3>
            <p>
              No infinite scroll. No sponsored rankings. Just a finite issue with a beginning and an
              end.
            </p>
            <a :href="href('archive')" @click.prevent="go('archive')">OLDER ISSUES ↗</a>
          </aside>
        </section></template
      >
      <article v-else-if="state === 'article'" class="article">
        <p class="eyebrow">UNDERPASS 014 / FIELD REPORT</p>
        <h1>{{ stories[selected] }}</h1>
        <p class="byline">Words by Kit Vale · Original fictional reporting</p>
        <img
          class=""
          src="/art/concert.webp"
          alt="The crowd at a small concert, pictured in black and white"
          width="1200"
          height="900"
          loading="lazy"
        />
        <div class="prose">
          <p>
            At half past eleven, someone opens the back door. The room breathes out. A few people
            drift into the alley and keep talking as if the music were still playing.
          </p>
          <p>
            There are venues with a business plan, and there are rooms that become venues because
            somebody needs one. The Underpass belongs to the second kind. On a Tuesday afternoon it
            is a repair workshop. On Friday the benches move and a stage appears.
          </p>
          <h2>The people behind the room</h2>
          <p>
            “We wanted somewhere we could hear each other,” says the fictional organiser, Kit. That
            meant keeping the tickets cheap, the door easy to find, and the last bus timetable taped
            to the wall.
          </p>
          <p>
            This sample story demonstrates a complete editorial reading surface: clear paragraphs, a
            photograph with context, a change of pace, and credits that stay with the work.
          </p>
          <h3>Credits</h3>
          <p>
            Fictional words and publication. Photograph: licensed illustrative image; attribution is
            recorded in the repository asset guide.
          </p>
          <a :href="href('start')" @click.prevent="go('start')">BACK TO ISSUE 014 →</a>
        </div>
      </article>
      <section v-else class="archive">
        <h1>The pile.</h1>
        <p>Every issue. In order. No algorithm.</p>
        <button
          v-for="(issue, i) in ['Still here', 'Borrowed space', 'Small hours', 'Make a scene']"
          :key="issue"
          @click="
            selected = 0;
            go('article');
          "
        >
          <span>0{{ 14 - i }}</span>
          <h2>{{ issue }}</h2>
          <b>2026 ↗</b>
        </button>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Underpass · Fictional sample content · Design reference 36</span
      ><button @click="reset">Reset demo</button>
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Archivo Black';
  src: url('/fonts/archivo-black.woff2') format('woff2');
  font-display: swap;
  font-weight: 100 900;
}
@font-face {
  font-family: 'Libre Baskerville';
  src: url('/fonts/libre-baskerville.woff2') format('woff2');
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
  color: #111;
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
.topline {
  display: flex;
  justify-content: space-between;
  font:
    10px 'DM Sans',
    sans-serif;
  letter-spacing: 0.07em;
}
.mast {
  display: block;
  font: clamp(50px, 11.5vw, 170px)/1.2 'Archivo Black';
  letter-spacing: -0.075em;
  text-decoration: none;
  border-bottom: 5px solid;
}
.mast span {
  float: right;
  font-size: 0.65em;
}
nav {
  display: flex;
  gap: 35px;
  border-bottom: 2px solid;
  padding: 14px 0;
  font:
    12px 'DM Sans',
    sans-serif;
  font-weight: 700;
}
main {
  padding: 30px 4% 70px;
}
.spread {
  display: grid;
  grid-template-columns: 1.1fr 1fr 0.55fr;
  gap: 30px;
  align-items: start;
}
.leadimage {
  position: relative;
  padding-top: 20px;
}
.leadimage img {
  width: 100%;
  height: 465px;
  filter: grayscale(1);
  clip-path: polygon(0 2%, 99% 0, 100% 97%, 2% 100%);
}
.leadimage small {
  font:
    10px 'DM Sans',
    sans-serif;
}
.stamp {
  position: absolute;
  bottom: 40px;
  left: -10px;
  background: var(--accent);
  font: 48px/1 'Archivo Black';
  padding: 18px;
  transform: rotate(-7deg);
}
.tape {
  display: inline-block;
  background: #151915;
  color: #e9e7dc;
  padding: 7px 16px;
  transform: rotate(2deg);
  font:
    12px 'DM Sans',
    sans-serif;
}
.feature h1 {
  font-size: clamp(50px, 5.5vw, 88px);
  margin: 22px 0 30px;
  line-height: 1.02;
  letter-spacing: -0.06em;
}
.feature em {
  font-style: normal;
  background: var(--accent);
}
.feature p,
.sidepiece p,
.lower p {
  font-size: 14px;
  line-height: 1.8;
}
.feature > a,
.lower a {
  font:
    12px 'DM Sans',
    sans-serif;
  font-weight: 700;
}
.sidepiece {
  border-left: 1px solid;
  padding-left: 20px;
  margin-top: 100px;
}
.sidepiece h2 {
  font-size: 25px;
}
.lower {
  display: grid;
  grid-template-columns: 1fr 1fr 0.7fr;
  gap: 50px;
  padding-top: 45px;
  margin-top: 35px;
  border-top: 4px solid;
}
.lower > div + div {
  border-left: 1px solid;
  padding-left: 30px;
}
.lower h2 {
  font-size: 48px;
}
.number {
  font: 16px monospace;
  border: 2px solid;
  padding: 7px;
}
.lower aside {
  background: var(--accent);
  padding: 25px;
  transform: rotate(2deg);
  align-self: start;
}
.lower h3 {
  font-size: 23px;
}
.article {
  max-width: 950px;
  margin: 25px auto;
}
.article h1 {
  font-size: 78px;
  max-width: 900px;
}
.article img {
  width: 100%;
  height: 450px;
  filter: grayscale(1);
}
.prose {
  max-width: 650px;
  margin: 45px auto;
  line-height: 1.9;
}
.prose h2 {
  font-size: 35px;
}
.byline {
  font:
    13px 'DM Sans',
    sans-serif;
}
.archive button {
  display: flex;
  width: 100%;
  background: none;
  border: none;
  border-top: 2px solid;
  align-items: center;
  gap: 30px;
  text-align: left;
  padding: 30px 0;
}
.archive button b {
  margin-left: auto;
}
.archive h2 {
  font-size: 45px;
}
@media (max-width: 850px) {
  .spread {
    grid-template-columns: 1fr 1fr;
  }
  .sidepiece {
    grid-column: 1/-1;
    margin: 0;
    padding: 15px 0;
    border-left: 0;
    border-top: 1px solid;
  }
  .lower {
    grid-template-columns: 1fr 1fr;
  }
  .lower aside {
    grid-column: 1/-1;
  }
}
@media (max-width: 540px) {
  .topline {
    font-size: 8px;
  }
  .topline span + span {
    display: none;
  }
  nav {
    gap: 17px;
    font-size: 10px;
  }
  .spread,
  .lower {
    display: block;
  }
  .leadimage img {
    height: 300px;
  }
  .feature {
    margin-top: 35px;
  }
  .feature h1 {
    font-size: 58px;
  }
  .sidepiece {
    margin-top: 30px;
  }
  .lower > div {
    padding: 25px 0;
  }
  .lower > div + div {
    border-left: 0;
    padding-left: 0;
    border-top: 1px solid;
  }
  .lower aside {
    transform: none;
  }
  .article h1 {
    font-size: 49px;
  }
  .article img {
    height: 260px;
  }
  .archive h2 {
    font-size: 27px;
  }
  .archive button {
    gap: 18px;
  }
}
</style>
