<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const station = ref(1),
  back = ref(false);
const seams = [
  {
    name: 'The departure',
    time: '06:40',
    front:
      'The city began with a door closing behind me. For a few steps, the sound travelled along the street faster than I did.',
    back: 'Door louder than expected. Forgot gloves. First sentence too grand? Keep the ordinary sound.',
  },
  {
    name: 'Under the viaduct',
    time: '07:15',
    front:
      'Beneath the arches, the river borrowed the city’s geometry. Light arrived in separate rooms, each briefly connected by the water.',
    back: 'Counted seven arches, then eight on return. Photograph does not show the echo. “Borrowed” better than “obeyed”.',
  },
  {
    name: 'The empty landing',
    time: '08:05',
    front:
      'A rope lay on the landing with the shape of a boat still in it. Nothing moved except the idea of departure.',
    back: 'Rope probably just coiled. Avoid inventing a dramatic absence. Describe the wet mark where it touched stone.',
  },
  {
    name: 'A shared bench',
    time: '09:20',
    front:
      'The stranger moved a bag without looking up. That small adjustment made a public place out of two private mornings.',
    back: 'No conversation. Important. The invitation was practical: enough room to sit, nothing expected in exchange.',
  },
  {
    name: 'Beyond the wall',
    time: '10:10',
    front:
      'The path narrowed until the river seemed to be walking beside me. The city’s last wall ended without ceremony.',
    back: 'Path muddy. Wall actually continues behind brambles. Do not pretend the boundary is cleaner than it is.',
  },
  {
    name: 'The return',
    time: '12:00',
    front:
      'Coming back, I recognised the places by what I had written about them. The walk had made a second route through the same ground.',
    back: 'Return faster. Notes changed what I noticed. Keep this as ending; it admits the writing is another layer, not the place itself.',
  },
];
function step(n: number) {
  station.value = (station.value + n + 6) % 6;
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>

    <header>
      <strong>BOTH SIDES</strong><span>A WALKING EDITION / SIX SEAMS</span>
      <nav>
        <button @click="go('start')">Follow the ribbon</button
        ><button @click="go('index')">Finite index</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><div class="opening">
          <h1>A story has<br />another side.</h1>
          <p>A river walk, and the notes<br />that would not fit inside it.</p>
        </div>
        <div class="ribbon" :class="{ reverse: back }">
          <div class="ribbon-edge" aria-hidden="true">
            {{ back ? 'DRAFT / FIELD / DRAFT / FIELD' : 'READ / WALK / READ / WALK' }}
          </div>
          <article>
            <span
              >SEAM 0{{ station + 1 }} / {{ seams[station].time }} /
              {{ back ? 'REVERSE' : 'FACE' }}</span
            >
            <h2>{{ seams[station].name }}</h2>
            <p>{{ back ? seams[station].back : seams[station].front }}</p>
            <button @click="go('station')">Read both versions ↗</button>
          </article>
          <div class="fold-end" aria-hidden="true">0{{ station + 1 }}</div>
        </div>
        <div class="seam-controls">
          <button @click="step(-1)">← Previous seam</button
          ><button class="flip" @click="back = !back">
            ↻ {{ back ? 'Turn to the finished account' : 'Turn to the field notes' }}</button
          ><button @click="step(1)">Next seam →</button>
        </div>
        <nav class="seam-index" aria-label="Choose a seam">
          <button
            v-for="(s, i) in seams"
            :key="s.name"
            :aria-current="station === i ? 'step' : undefined"
            @click="station = i"
          >
            0{{ i + 1 }}<span>{{ s.name }}</span>
          </button>
        </nav>
        <p class="edition-note">
          The ribbon returns to its beginning after six stops. Its two faces are different accounts
          of the same imagined walk, not an endless feed.
        </p></template
      >
      <article v-else-if="state === 'station'" class="station">
        <button @click="go('start')">← Return to the ribbon</button>
        <h1>{{ seams[station].name }}</h1>
        <section class="front">
          <span>THE ACCOUNT / {{ seams[station].time }}</span>
          <p>{{ seams[station].front }}</p>
        </section>
        <section class="back">
          <span>THE NOTE LEFT OUT</span>
          <p>{{ seams[station].back }}</p>
        </section>
        <p class="editorial">
          The draft is not a less important version. It records the hesitation that the final
          sentence has learned to conceal.
        </p>
        <button @click="step(1)">Next paired station →</button>
      </article>
      <section v-else class="index">
        <h1>Six seams.<br />No hidden end.</h1>
        <ol>
          <li v-for="(s, i) in seams" :key="s.name">
            <span>{{ s.time }}</span
            ><button
              @click="
                station = i;
                go('station');
              "
            >
              {{ s.name }} ↗
            </button>
            <p>{{ s.front }}</p>
          </li>
        </ol>
        <button @click="go('start')">Return to the ribbon</button>
      </section>
    </main>
    <footer>BOTH SIDES / An original fictional walk, with its revisions left visible.</footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Libre Baskerville';
  src: url('/fonts/libre-baskerville.woff2') format('woff2');
  font-weight: 400 700;
  font-display: swap;
}
@font-face {
  font-family: 'IBM Plex Mono';
  src: url('/fonts/ibm-plex-mono.woff2') format('woff2');
  font-weight: 400 700;
  font-display: swap;
}
.specimen {
  min-height: 100vh;
  background: var(--page);
  color: var(--ink);
  font-family: var(--body);
  line-height: 1.5;
  overflow-wrap: break-word;
}
.skip {
  position: fixed;
  top: -100px;
  left: 12px;
  z-index: 100;
  background: var(--ink);
  color: var(--page);
  padding: 12px;
}
.skip:focus {
  top: 12px;
}
button {
  color: inherit;
}
button:disabled {
  opacity: 0.55;
}
button,
a,
input,
select {
  max-width: 100%;
}
button {
  white-space: normal;
}
h1,
h2,
h3,
p {
  margin-top: 0;
}
p {
  max-width: var(--measure);
}
nav {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

header {
  padding: 25px 4%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid;
}
header strong {
  font: 26px var(--heading);
  letter-spacing: -0.06em;
}
header span {
  font-size: 9px;
}
button {
  background: transparent;
  border: 0;
  border-bottom: 1px solid;
  padding: 10px 5px;
}
nav {
  font-size: 11px;
}
.opening {
  padding: 45px 6%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 30px;
}
.opening h1 {
  font: clamp(45px, 6vw, 80px)/1.12 var(--heading);
  letter-spacing: -0.055em;
  margin: 0;
}
.opening p {
  font-size: 12px;
  line-height: 1.8;
  margin: 0;
}
.ribbon {
  margin: 20px 0 45px;
  display: grid;
  grid-template-columns: 8% 1fr 17%;
  background: #1b3c89;
  color: #e8e6da;
  min-height: 430px;
  transform: skewY(-3deg);
  position: relative;
}
.ribbon-edge {
  writing-mode: vertical-rl;
  text-align: center;
  padding: 30px;
  font-size: 10px;
  letter-spacing: 0.2em;
  border-right: 1px dashed #e8e6da8c;
}
.ribbon article {
  padding: 45px 7%;
  transform: skewY(3deg);
}
.ribbon article > span {
  font-size: 10px;
}
.ribbon h2 {
  font: 28px var(--heading);
  margin: 22px 0;
}
.ribbon article p {
  font: clamp(25px, 3vw, 42px)/1.6 var(--heading);
  max-width: 33ch;
}
.ribbon button {
  font-size: 11px;
}
.fold-end {
  background: #142b61;
  clip-path: polygon(0 0, 100% 16%, 100% 100%, 0 85%);
  font: 130px var(--heading);
  display: grid;
  place-items: center;
  writing-mode: vertical-rl;
}
.reverse {
  background: #d5cfb9;
  color: #1b3c89;
}
.reverse .fold-end {
  background: #b9b39f;
}
.reverse .ribbon-edge {
  border-color: #1b3c89;
}
.reverse article p {
  font-family: var(--body);
  font-size: clamp(21px, 2.5vw, 32px);
  line-height: 1.9;
}
.seam-controls {
  display: flex;
  justify-content: space-between;
  gap: 25px;
  padding: 20px 6%;
  font-size: 11px;
}
.flip {
  border: 1px solid;
  padding: 12px 20px;
}
.seam-index {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0;
  margin: 30px 6%;
  border-top: 1px solid;
}
.seam-index button {
  text-align: left;
  padding: 20px 10px;
  font: 28px var(--heading);
}
.seam-index button[aria-current='step'] {
  background: #1b3c89;
  color: #e8e6da;
}
.seam-index span {
  display: block;
  font: 10px/1.6 var(--body);
  margin-top: 15px;
}
.edition-note {
  font-size: 11px;
  line-height: 1.9;
  padding: 20px 6%;
  max-width: 750px;
}
.station,
.index {
  padding: 35px 7% 70px;
}
.station h1,
.index h1 {
  font: clamp(45px, 6vw, 85px)/1.1 var(--heading);
  margin: 35px 0;
}
.station section {
  padding: 40px 6%;
  max-width: 1000px;
}
.front {
  background: #1b3c89;
  color: #e8e6da;
  transform: rotate(-1deg);
}
.back {
  border: 1px solid;
  margin-left: 7%;
  transform: rotate(1deg);
}
.station section span {
  font-size: 10px;
}
.station section p {
  font: clamp(25px, 3vw, 37px)/1.7 var(--heading);
  margin: 20px 0;
}
.station .back p {
  font-family: var(--body);
  font-size: 23px;
}
.editorial {
  font-size: 13px;
  line-height: 1.8;
  margin-top: 40px;
}
.index ol {
  list-style: none;
  padding: 0;
}
.index li {
  display: grid;
  grid-template-columns: 100px 1fr 1.2fr;
  gap: 25px;
  align-items: baseline;
  border-top: 1px solid;
  padding: 30px 0;
}
.index li span {
  font-size: 12px;
}
.index li button {
  font: 24px var(--heading);
  text-align: left;
  border: 0;
}
.index li p {
  font: 16px/1.8 var(--heading);
}
footer {
  padding: 22px 4%;
  border-top: 1px solid;
  font-size: 9px;
}
@media (max-width: 700px) {
  header {
    flex-wrap: wrap;
  }
  .opening {
    display: block;
    padding: 35px 5%;
  }
  .opening h1 {
    font-size: 46px;
  }
  .opening p {
    margin-top: 25px;
  }
  .ribbon {
    grid-template-columns: 8% 1fr 10%;
    min-height: 450px;
  }
  .ribbon-edge {
    padding: 12px 5px;
    font-size: 8px;
  }
  .ribbon article {
    padding: 35px 8%;
  }
  .ribbon article p {
    font-size: 26px;
  }
  .ribbon h2 {
    font-size: 22px;
  }
  .fold-end {
    font-size: 50px;
  }
  .ribbon article > span {
    font-size: 8px;
  }
  .seam-controls {
    flex-wrap: wrap;
    gap: 15px;
  }
  .flip {
    order: -1;
    width: 100%;
  }
  .seam-index {
    grid-template-columns: repeat(3, 1fr);
  }
  .station,
  .index {
    padding: 30px 5%;
  }
  .station section {
    padding: 25px 7%;
  }
  .station .back p {
    font-size: 19px;
  }
  .station section p {
    font-size: 25px;
  }
  .index li {
    grid-template-columns: 70px 1fr;
    gap: 12px;
  }
  .index li p {
    grid-column: 1/-1;
  }
  .index li button {
    font-size: 20px;
  }
}
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition: none !important;
    animation: none !important;
    scroll-behavior: auto !important;
  }
}
</style>
