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
    .filter((k) => k.startsWith('design-library:48:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const objects = [
  {
    name: 'A chair for waiting',
    year: 'Study 01 / 2026',
    material: 'Timber & woven fibre',
    text: 'An ordinary seat, considered as a place between arriving and leaving.',
  },
  {
    name: 'The listening vessel',
    year: 'Study 02 / 2026',
    material: 'Unglazed ceramic',
    text: 'A hollow form that asks us to notice the space it holds.',
  },
  {
    name: 'A light for one person',
    year: 'Study 03 / 2026',
    material: 'Steel & paper',
    text: 'A small circle of attention, shaped around a single working surface.',
  },
];
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <a :href="href('start')" @click.prevent="go('start')">small museum</a
      ><span>AN EXHIBITION OF ORDINARY THINGS</span
      ><button @click="go('collection')">View as a list ↗</button>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><div class="intro">
          <p class="eyebrow">ROOM 01 / PLACES FOR ATTENTION</p>
          <h1>A few things.<br />A little space.</h1>
          <p>
            Three original object studies, arranged around the ways we pause, listen, and begin.
          </p>
        </div>
        <div class="exhibition">
          <section class="room" aria-label="Exhibition room">
            <svg
              viewBox="0 0 1000 560"
              role="img"
              aria-label="A shallow gallery with a chair to the left, a ceramic vessel in the centre, and a reading lamp to the right"
            >
              <polygon points="0,0 1000,0 1000,560 0,560" fill="#dfddd5" />
              <polygon points="0,0 500,110 500,410 0,560" fill="#e9e7df" />
              <polygon points="500,110 1000,0 1000,560 500,410" fill="#d3d4ce" />
              <polygon points="0,560 500,410 1000,560" fill="#c4c5ba" />
              <path d="M500 110V410" stroke="#b9bcb2" />
              <g fill="#ad9b7c" stroke="#6e7366" stroke-width="3">
                <path
                  d="M160 330V215L265 225V345M160 290L275 305L260 345L145 328ZM155 330V410M260 345V425M180 300V380M275 305V390"
                />
              </g>
              <g>
                <path d="M420 370L510 345L590 370L510 395Z" fill="#e8e5dc" />
                <path d="M420 370V455L510 480V395Z" fill="#d3d0c6" />
                <path d="M510 395V480L590 455V370Z" fill="#bfc1b8" />
                <path
                  d="M475 315Q455 365 510 375Q565 365 545 315L535 280H485Z"
                  fill="#a6a08d"
                  stroke="#6f7768"
                  stroke-width="2"
                />
                <ellipse cx="510" cy="280" rx="25" ry="8" fill="#777e70" />
              </g>
              <g stroke="#657064" stroke-width="5" fill="none">
                <path d="M750 400V235L820 200M720 405H790" />
              </g>
              <path
                d="M785 180L850 185L865 240L770 235Z"
                fill="#efe6c8"
                stroke="#798070"
                stroke-width="2"
              />
              <ellipse cx="750" cy="430" rx="70" ry="14" fill="#b3b8a6" opacity=".5" />
            </svg>
            <div class="exhibit-buttons">
              <button
                v-for="(o, i) in objects"
                :key="o.name"
                :class="'object-button o' + i"
                @click="
                  selected = i;
                  go('object');
                "
              >
                0{{ i + 1 }} <span>{{ o.name }}</span> ↗
              </button>
            </div>
          </section>
          <aside>
            <p class="eyebrow">THE OBJECTS</p>
            <button
              v-for="(o, i) in objects"
              :key="o.name"
              @click="
                selected = i;
                go('object');
              "
            >
              <small>0{{ i + 1 }} / {{ o.material }}</small>
              <h2>{{ o.name }}</h2>
              <p>{{ o.text }}</p>
            </button>
          </aside>
        </div>
        <section class="curator">
          <p class="eyebrow">A CURATORIAL NOTE</p>
          <h2>Ordinary objects hold<br />unordinary relationships.</h2>
          <p>
            The chair, the vessel, and the lamp are grouped by the attention they invite. This
            original SVG room is a navigational enhancement; the collection is complete as a list.
          </p>
        </section></template
      >
      <section v-else-if="state === 'object'" class="object-detail">
        <button @click="go('start')">← Back to the room</button>
        <p class="eyebrow">OBJECT 0{{ selected + 1 }} / {{ objects[selected].year }}</p>
        <h1>{{ objects[selected].name }}</h1>
        <div class="detail-body">
          <div class="object-study" :class="'study-' + selected">
            <svg
              viewBox="0 0 360 360"
              role="img"
              :aria-label="objects[selected].name + ' — original object study'"
            >
              <g v-if="selected === 0" fill="#ad9b7c" stroke="#545e51" stroke-width="3">
                <path
                  d="M100 230V80L250 95V245M100 180L265 200L240 250L85 230ZM95 230V315M240 250V330M125 195V285M265 200V295"
                />
              </g>
              <g v-else-if="selected === 1">
                <path
                  d="M100 140Q60 285 180 300Q300 285 260 140L235 90H125Z"
                  fill="#a6a08d"
                  stroke="#57654f"
                  stroke-width="3"
                />
                <ellipse cx="180" cy="90" rx="55" ry="17" fill="#626d59" />
                <ellipse cx="180" cy="90" rx="44" ry="11" fill="#404d38" />
              </g>
              <g v-else>
                <path
                  d="M165 310V130L245 70M105 315H225"
                  fill="none"
                  stroke="#657064"
                  stroke-width="7"
                />
                <path
                  d="M210 50L285 55L305 135L190 130Z"
                  fill="#efe6c8"
                  stroke="#657064"
                  stroke-width="3"
                />
                <ellipse cx="165" cy="330" rx="85" ry="12" fill="#bcc2b0" />
              </g></svg
            ><small>ORIGINAL FORM STUDY / 0{{ selected + 1 }}</small>
          </div>
          <article>
            <p>{{ objects[selected].text }}</p>
            <h2>Material & intention</h2>
            <p>
              {{ objects[selected].material }}. The fictional object is considered through
              proportion, material, and the small task it supports.
            </p>
            <p>
              Rather than asking the visitor to navigate a three-dimensional world, the exhibition
              keeps every object’s story in an ordinary reading surface.
            </p>
            <button @click="selected = (selected + 1) % 3">
              Related object: {{ objects[(selected + 1) % 3].name }} →
            </button>
          </article>
        </div>
      </section>
      <section v-else class="collection">
        <p class="eyebrow">ROOM 01 / COMPLETE COLLECTION</p>
        <h1>Everything<br />in the room.</h1>
        <article v-for="(o, i) in objects" :key="o.name">
          <span>0{{ i + 1 }}</span>
          <div>
            <h2>{{ o.name }}</h2>
            <p>{{ o.material }} · {{ o.year }}</p>
            <p>{{ o.text }}</p>
          </div>
          <button
            @click="
              selected = i;
              go('object');
            "
          >
            Inspect →
          </button>
        </article>
        <button @click="go('start')">Return to the spatial view</button>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Small Museum · Fictional sample content · Design reference 48</span
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
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 30px 5%;
  border-bottom: 1px solid var(--line);
}
header > a {
  font: 25px 'Libre Baskerville';
  letter-spacing: -0.04em;
  text-decoration: none;
}
header > span {
  font-size: 9px;
  letter-spacing: 0.1em;
  margin-left: auto;
}
header button {
  font-size: 11px;
  background: none;
  border: 0;
}
main {
  padding: 40px 5% 70px;
  max-width: 1500px;
  margin: auto;
}
.intro {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: 20px 45px;
}
.intro .eyebrow {
  width: 100%;
  font-size: 9px;
  margin: 0;
}
.intro h1 {
  font-size: 49px;
  line-height: 1.3;
  font-weight: 400;
  margin: 0 0 35px;
}
.intro > p:last-child {
  font-size: 14px;
  max-width: 360px;
  margin-bottom: 45px;
}
.exhibition {
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 45px;
}
.room {
  position: relative;
  background: #dfddd5;
  min-height: 500px;
  border: 1px solid #c3c8bb;
}
.room svg {
  height: 100%;
  width: 100%;
  display: block;
}
.exhibit-buttons {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  gap: 15px;
}
.object-button {
  background: #f7f7ecdd;
  border: 1px solid #a8b49e;
  font-size: 10px;
  padding: 10px;
  flex: 1;
}
.object-button span {
  display: block;
  font-size: 9px;
  margin: 5px 0;
}
.exhibition aside > .eyebrow {
  font-size: 9px;
}
.exhibition aside > button {
  text-align: left;
  width: 100%;
  padding: 22px 0;
  background: none;
  border: 0;
  border-top: 1px solid var(--line);
}
.exhibition aside small {
  font-size: 8px;
}
.exhibition aside h2 {
  font: 20px/1.4 'Libre Baskerville';
  margin: 14px 0;
}
.exhibition aside p {
  font-size: 11px;
  line-height: 1.8;
  margin: 0;
}
.curator {
  max-width: 900px;
  padding: 50px 0 0;
}
.curator h2 {
  font-size: 34px;
  font-weight: 400;
  line-height: 1.4;
}
.curator p {
  font-size: 14px;
  line-height: 1.9;
}
.object-detail {
  padding: 10px 0 80px;
}
.object-detail > .eyebrow {
  margin-top: 40px;
}
.object-detail > button {
  font-size: 11px;
  background: none;
  border: 0;
  padding: 0;
}
.object-detail h1,
.collection h1 {
  font-size: 58px;
  line-height: 1.3;
  font-weight: 400;
}
.detail-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 75px;
  margin-top: 45px;
  align-items: center;
}
.object-study {
  height: 440px;
  background: #ddd9ca;
  display: grid;
  place-items: center;
  position: relative;
  color: #81745e;
}
.object-study > span {
  font: 250px Georgia;
}
.object-study > small {
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 8px;
}
.study-1 {
  color: #8b8f78;
  background: #e2e1d6;
}
.study-2 {
  color: #727d78;
  background: #d7ddda;
}
.detail-body article p {
  font-size: 15px;
  line-height: 1.9;
}
.detail-body h2 {
  font-size: 29px;
  font-weight: 400;
}
.detail-body button {
  font-size: 12px;
  background: none;
  border: 0;
  border-bottom: 1px solid;
  border-radius: 0;
  padding: 10px 0;
}
.collection {
  padding-bottom: 120px;
}
.collection article {
  display: flex;
  gap: 35px;
  align-items: center;
  border-top: 1px solid var(--line);
  padding: 30px 0;
}
.collection article > span {
  font-size: 11px;
  color: #56694b;
}
.collection article > div {
  flex: 1;
}
.collection h2 {
  font-size: 26px;
  font-weight: 400;
}
.collection p {
  font-size: 13px;
}
.collection button {
  font-size: 11px;
  background: none;
}
@media (max-width: 800px) {
  header > span {
    display: none;
  }
  header button {
    margin-left: auto;
  }
  .exhibition {
    grid-template-columns: 1fr;
  }
  .room {
    min-height: 0;
  }
  .room svg {
    height: auto;
  }
  .exhibition aside {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
  }
  .exhibition aside > .eyebrow {
    grid-column: 1/-1;
    margin: 0;
  }
  .exhibition aside h2 {
    font-size: 17px;
  }
  .detail-body {
    gap: 40px;
  }
}
@media (max-width: 600px) {
  header {
    padding: 22px;
  }
  header > a {
    font-size: 21px;
  }
  header button {
    font-size: 10px;
  }
  .intro {
    display: block;
  }
  .intro h1 {
    font-size: 38px;
    margin: 20px 0;
  }
  .intro > p:last-child {
    font-size: 13px;
    margin-bottom: 30px;
  }
  .exhibit-buttons {
    position: static;
    padding: 15px;
    margin: 0;
    gap: 8px;
  }
  .object-button {
    font-size: 9px;
    padding: 7px;
  }
  .object-button span {
    font-size: 8px;
  }
  .exhibition aside {
    display: block;
  }
  .exhibition aside > button {
    padding: 20px 0;
  }
  .exhibition aside h2 {
    font-size: 22px;
  }
  .curator h2 {
    font-size: 28px;
  }
  .object-detail h1,
  .collection h1 {
    font-size: 40px;
  }
  .detail-body {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .object-study {
    height: 300px;
  }
  .object-study > span {
    font-size: 180px;
  }
  .collection article {
    gap: 20px;
    flex-wrap: wrap;
  }
  .collection h2 {
    font-size: 22px;
  }
  .collection article button {
    margin-left: 35px;
  }
}
.object-study svg {
  width: min(100%, 360px);
  height: 360px;
  display: block;
  margin: auto;
}
</style>
