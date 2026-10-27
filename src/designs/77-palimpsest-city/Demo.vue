<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const layers = ref([true, true, true, false]);
const place = ref(2);
const eras = [
  { year: '1890', name: 'Water & fields', color: '#28567a' },
  { year: '1936', name: 'Tracks & work', color: '#8a412b' },
  { year: '1984', name: 'Homes & passage', color: '#354239' },
  { year: '2026', name: 'Common ground', color: '#663269' },
];
const places = [
  {
    name: 'The pump house',
    x: 20,
    y: 28,
    old: 'A brick chamber lifted river water into a header tank.',
    now: 'A tool library occupies the chamber; the old gauge remains above its door.',
  },
  {
    name: 'Workers’ bridge',
    x: 58,
    y: 22,
    old: 'A narrow iron bridge carried night-shift workers over the sidings.',
    now: 'The bridge is a footpath. Its steps still bear a polished hollow at the centre.',
  },
  {
    name: 'Number 18',
    x: 70,
    y: 59,
    old: 'Two upstairs rooms were rented to railway clerks; the ground floor sold lamp oil.',
    now: 'A shared kitchen opens on Thursdays. Three layers of lettering remain on the shopfront.',
  },
  {
    name: 'The turning yard',
    x: 38,
    y: 48,
    old: 'Locomotives turned here beside an ash pit and a weatherboard shelter.',
    now: 'The circular footprint is a garden, kept open to the sky.',
  },
  {
    name: 'River steps',
    x: 18,
    y: 76,
    old: 'Laundry and small cargoes came ashore on six uneven stone steps.',
    now: 'The lowest two steps are submerged; residents gather on the remaining four.',
  },
  {
    name: 'East allotment',
    x: 80,
    y: 82,
    old: 'Railway families grew beans on strips of unused right-of-way.',
    now: 'A seed exchange continues in a converted signal box.',
  },
];
function open(i: number) {
  place.value = i;
  go('address');
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>

    <header>
      <strong>SILT<span>ATLAS / 04</span></strong>
      <p>No city is<br />only one city.</p>
      <nav>
        <button @click="go('start')">The layers</button
        ><button @click="go('accounts')">The voices</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><h1 class="sr">Palimpsest of the railway district</h1>
        <div class="layer-key">
          <label v-for="(era, i) in eras" :key="era.year"
            ><input type="checkbox" v-model="layers[i]" />
            <b :style="{ color: era.color }">{{ era.year }}</b> {{ era.name }}</label
          >
        </div>
        <div class="atlas">
          <svg viewBox="0 0 1000 650" aria-hidden="true">
            <defs>
              <pattern id="grid77" width="25" height="25" patternUnits="userSpaceOnUse">
                <path d="M25 0H0V25" fill="none" stroke="#555" stroke-opacity=".12" />
              </pattern>
            </defs>
            <rect width="1000" height="650" fill="url(#grid77)" />
            <g v-if="layers[0]" stroke="#28567a" fill="none">
              <path d="M-50 0Q300 200 240 360T800 710" stroke-width="65" opacity=".2" />
              <path d="M-50 0Q300 200 240 360T800 710" stroke-width="2" />
              <path
                v-for="i in 8"
                :key="i"
                :d="'M' + i * 130 + ' 0 Q' + i * 110 + ' 270 ' + (i * 120 + 100) + ' 650'"
                stroke-dasharray="4 10"
              />
            </g>
            <g v-if="layers[1]" stroke="#8a412b" fill="none" stroke-width="3">
              <path d="M0 460L950 90M0 480L980 100M0 500L1000 110M0 520L1000 130" />
              <circle cx="385" cy="340" r="100" />
              <path d="M385 240V440M285 340H485" />
              <rect x="670" y="200" width="180" height="85" transform="rotate(-20 670 200)" />
            </g>
            <g v-if="layers[2]" stroke="#354239" fill="#e9e2cf" fill-opacity=".38" stroke-width="2">
              <path d="M50 180L900 580M70 120L920 520" />
              <rect
                v-for="i in 12"
                :key="i"
                :x="440 + (i % 4) * 90"
                :y="300 + Math.floor(i / 4) * 75"
                width="58"
                height="45"
              />
              <path d="M50 600L930 150" stroke-width="12" opacity=".25" />
            </g>
            <g
              v-if="layers[3]"
              stroke="#663269"
              fill="none"
              stroke-width="4"
              stroke-dasharray="8 5"
            >
              <circle cx="385" cy="340" r="115" />
              <path d="M150 500Q500 580 850 400" />
              <rect x="700" y="430" width="170" height="130" />
            </g>
            <text x="720" y="70" fill="#28567a" font-size="22" font-style="italic">
              the river remembers
            </text>
            <text x="50" y="620" font-size="12">
              SILT DISTRICT / COMPOSITE PLAN / NOT TO SCALE
            </text></svg
          ><button
            v-for="(p, i) in places"
            :key="p.name"
            class="pin"
            :style="{ left: p.x + '%', top: p.y + '%' }"
            @click="open(i)"
            :aria-label="'Explore ' + p.name"
          >
            0{{ i + 1 }}
          </button>
          <div class="map-note">
            Four maps.<br />One stubborn place.<br /><small
              >Toggle a date to peel back a layer.</small
            >
          </div>
        </div>
        <ol class="addresses">
          <li v-for="(p, i) in places" :key="p.name">
            <button @click="open(i)">0{{ i + 1 }} / {{ p.name }} ↗</button>
          </li>
        </ol></template
      >
      <article v-else-if="state === 'address'" class="address">
        <button @click="go('start')">← Back to the plan</button>
        <p>COORDINATE 0{{ place + 1 }} / AN ADDRESS IN TWO VOICES</p>
        <h1>{{ places[place].name }}</h1>
        <div class="then">
          <span>1936</span>
          <h2>What was here</h2>
          <p>{{ places[place].old }}</p>
          <small>Reconstructed from a fictional survey ledger.</small>
        </div>
        <div class="now">
          <span>2026</span>
          <h2>What remains</h2>
          <p>{{ places[place].now }}</p>
          <small>Imagined present-day field observation.</small>
        </div>
        <blockquote>
          “We used the old names long after the signs had changed. The map caught up with us
          eventually.”<cite> — A resident’s account</cite>
        </blockquote>
        <button @click="open((place + 1) % 6)">Follow the next address →</button>
      </article>
      <section v-else class="accounts">
        <h1>A map cannot<br />tell you this.</h1>
        <article
          v-for="(voice, i) in ['The night porter', 'The seed keeper', 'The bridge walker']"
          :key="voice"
        >
          <span>VOICE 0{{ i + 1 }}</span>
          <h2>{{ voice }}</h2>
          <p>
            {{
              [
                'At four in the morning the yard sounded like a held breath. We learned to tell which train was coming by the way the windows shook. Nobody wrote that on a plan.',
                'The allotments were never quite legal and never quite forbidden. My mother carried seed in the lining of her coat. The beans outlasted the company that owned the ground.',
                'I still count the steps. Thirty-two on the way up, thirty-one coming down, because one has almost disappeared into the pavement. A repair can also be a kind of forgetting.',
              ][i]
            }}
          </p>
        </article>
        <p>All accounts are original fictional writing, used to demonstrate layered evidence.</p>
        <button @click="go('start')">Return to the composite map</button>
      </section>
    </main>
    <footer>SILT / Fieldwork in an imagined district · Edition 04</footer>
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
  padding: 30px 4%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid;
  gap: 20px;
}
header strong {
  font: 60px/0.9 var(--heading);
  letter-spacing: -0.08em;
}
header span {
  display: block;
  font: 10px var(--body);
  letter-spacing: 0.1em;
  margin-top: 12px;
}
header p {
  font: 24px/1.2 var(--heading);
  margin: 0;
}
button {
  background: transparent;
  border: 1px solid;
  padding: 8px 14px;
}
header button {
  border: 0;
  border-bottom: 1px solid;
}
.layer-key {
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
  padding: 20px 4%;
  font-size: 12px;
}
.layer-key label {
  display: flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
}
.atlas {
  position: relative;
  margin: 0 4%;
  border: 1px solid #776d59;
}
.atlas svg {
  width: 100%;
  display: block;
}
.pin {
  position: absolute;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  width: 45px;
  height: 45px;
  padding: 0;
  background: #282a29;
  color: #fff;
  box-shadow: 0 0 0 5px #e9e2cfb3;
}
.map-note {
  position: absolute;
  left: 6%;
  top: 7%;
  font: 28px/1.2 var(--heading);
  max-width: 240px;
}
.map-note small {
  font: 11px/1.4 var(--body);
  display: block;
  margin-top: 18px;
  max-width: 150px;
}
.addresses {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 24px 4%;
  gap: 12px;
  list-style: none;
}
.addresses button {
  width: 100%;
  text-align: left;
  border: 0;
  border-bottom: 1px solid;
}
.address,
.accounts {
  padding: 45px 8%;
}
.address > p {
  margin-top: 30px;
  font-size: 11px;
}
.address h1,
.accounts h1 {
  font: clamp(40px, 7vw, 90px)/1.05 var(--heading);
  letter-spacing: -0.04em;
}
.then,
.now {
  padding: 30px;
  max-width: 750px;
  position: relative;
  border: 1px solid;
  background: #f4efdc;
}
.then {
  transform: rotate(-2deg);
  color: #743b2b;
}
.now {
  margin: -15px 0 0 20%;
  transform: rotate(1deg);
  color: #244962;
  background: #e5e7de;
}
.then span,
.now span {
  float: right;
  font-size: 40px;
  opacity: 0.7;
}
.then p,
.now p {
  font: 22px/1.6 var(--heading);
}
blockquote {
  font: 24px/1.7 var(--heading);
  max-width: 800px;
  margin: 65px auto;
}
cite {
  display: block;
  font: 12px var(--body);
  margin-top: 15px;
}
.accounts article {
  border-top: 1px solid;
  padding: 30px 0;
  display: grid;
  grid-template-columns: 120px 1fr 1.5fr;
  gap: 30px;
}
.accounts article p {
  font: 20px/1.7 var(--heading);
}
footer {
  padding: 25px 4%;
  font-size: 11px;
  border-top: 1px solid;
}
@media (max-width: 700px) {
  header {
    flex-wrap: wrap;
  }
  header strong {
    font-size: 44px;
  }
  header p {
    font-size: 18px;
  }
  .layer-key {
    gap: 10px;
  }
  .atlas {
    aspect-ratio: 1;
  }
  .atlas svg {
    height: 100%;
    object-fit: cover;
  }
  .map-note {
    top: 4%;
    font-size: 18px;
    max-width: 140px;
  }
  .map-note small {
    display: none;
  }
  .pin {
    width: 40px;
    height: 40px;
    font-size: 11px;
  }
  .addresses {
    grid-template-columns: 1fr 1fr;
    font-size: 11px;
    gap: 5px;
  }
  .address,
  .accounts {
    padding: 30px 5%;
  }
  .then,
  .now {
    margin: 15px 0;
    padding: 20px;
    transform: none;
  }
  .then span,
  .now span {
    font-size: 28px;
  }
  .accounts article {
    display: block;
  }
  .accounts article h2 {
    margin-top: 12px;
  }
  blockquote {
    margin: 30px 0;
    font-size: 21px;
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
