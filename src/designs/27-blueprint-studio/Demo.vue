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
    .filter((k) => k.startsWith('design-library:27:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const view = ref('Plan'),
  compare = ref(false);
const projects = ['The courtyard room', 'A small observatory', 'House at the threshold'];
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>SECTION<br />WORKS</strong><span>ARCHITECTURE / MATERIAL / ASSEMBLY</span
      ><button @click="go('index')">Project index ↗</button>
    </header>
    <main id="content">
      <aside class="rail">
        <p>PROJECTS</p>
        <button
          v-for="(p, i) in projects"
          :key="p"
          :aria-pressed="selected === i"
          @click="
            selected = i;
            go('start');
          "
        >
          <span>0{{ i + 1 }}</span
          >{{ p }}
        </button>
        <div>
          DRAWING SET<br />ISSUED 26.10.26<br /><br />FICTIONAL PROJECTS<br />NOT FOR CONSTRUCTION
        </div>
      </aside>
      <section class="sheet" v-if="state === 'start'">
        <div class="title">
          <p class="eyebrow">PROJECT 0{{ selected + 1 }} / NORTHBANK</p>
          <h1>{{ projects[selected] }}</h1>
          <p>A modest structure. A precise relationship with light.</p>
        </div>
        <div class="viewbar">
          <div class="row">
            <button
              v-for="v in ['Plan', 'Section', 'Built result']"
              :key="v"
              :aria-pressed="view === v"
              @click="view = v"
            >
              {{ v }}
            </button>
          </div>
          <button :aria-pressed="compare" @click="compare = !compare">
            {{ compare ? 'Single view' : 'Compare views' }}
          </button>
        </div>
        <div class="plates" :class="{ compare }">
          <figure class="drawing" v-if="view !== 'Built result' || compare">
            <svg
              viewBox="0 0 850 520"
              role="img"
              :aria-label="
                view === 'Section'
                  ? 'Building section showing roof, glazed wall, and courtyard'
                  : 'Floor plan showing a central courtyard, workspace, and entrance'
              "
            >
              <defs>
                <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse">
                  <path d="M25 0H0V25" fill="none" stroke="#335270" stroke-width=".5" />
                </pattern>
              </defs>
              <rect width="850" height="520" fill="url(#grid)" />
              <g fill="none" stroke="#d5e7ec" stroke-width="3" v-if="view !== 'Section'">
                <path
                  d="M150 100H700V420H150Z M170 120H680V400H170Z M300 120V280H520V120M300 300V400M520 300V400M170 280H280M540 280H680"
                />
                <path d="M300 280V300M520 280V300" stroke="#89d6de" />
                <rect
                  x="325"
                  y="145"
                  width="170"
                  height="110"
                  stroke="#89d6de"
                  stroke-dasharray="7 5"
                />
                <rect x="195" y="315" width="75" height="45" />
                <rect x="550" y="315" width="90" height="45" />
                <path d="M385 400V350A50 50 0 0 1 435 400" stroke-width="1" />
                <path
                  d="M145 70H705M150 55V85M700 55V85M115 100V420M100 100H130M100 420H130"
                  stroke-width="1"
                />
              </g>
              <g v-else fill="none" stroke="#d5e7ec" stroke-width="3">
                <path
                  d="M100 400H750M150 400V210L410 120L700 210V400M150 230H700M300 230V400M520 230V400M280 210V170M540 210V165"
                />
                <path
                  d="M325 240V390M350 240V390M375 240V390M400 240V390M425 240V390M450 240V390M475 240V390"
                  stroke="#89d6de"
                  stroke-width="1"
                />
              </g>
              <g fill="#91d4df" font-family="monospace" font-size="14">
                <text x="380" y="60">11 000</text>
                <text x="350" y="210">COURTYARD</text>
                <text x="210" y="380">WORKSPACE</text>
                <text x="560" y="380">STUDIO</text>
                <text x="150" y="470">
                  A—A / {{ view === 'Section' ? 'SECTION' : 'GROUND FLOOR PLAN' }}
                </text>
                <text x="650" y="470">1:100*</text>
              </g>
            </svg>
            <figcaption>
              PLATE 0{{ selected + 1 }}.A / {{ view === 'Section' ? 'SECTION' : 'PLAN' }} ·
              Diagrammatic, not measured construction information.
            </figcaption>
          </figure>
          <figure v-if="view === 'Built result' || compare" class="built">
            <img
              class=""
              src="/art/architecture.webp"
              alt="Concrete architectural volumes and a precise opening to the sky"
              width="1200"
              height="900"
              loading="lazy"
            />
            <figcaption>
              PLATE 0{{ selected + 1 }}.B / MATERIAL & LIGHT STUDY · Illustrative photograph.
            </figcaption>
          </figure>
        </div>
        <div class="titleblock">
          <div><small>CLIENT</small><span>Private / fictional</span></div>
          <div><small>AREA</small><span>84 m² / sample</span></div>
          <div><small>STRUCTURE</small><span>Timber & masonry</span></div>
          <div><small>STATUS</small><span>Concept study</span></div>
        </div>
        <section class="project-note">
          <h2>Light is part of<br />the structure.</h2>
          <div>
            <p>
              A courtyard holds the centre open. Workspaces sit at its edges, borrowing light
              without surrendering their sense of enclosure.
            </p>
            <button @click="go('material')">Open construction note 01 →</button>
          </div>
        </section>
      </section>
      <section v-else-if="state === 'material'" class="sheet material">
        <p class="eyebrow">CONSTRUCTION NOTE / 01</p>
        <h1>The meeting<br />of two materials.</h1>
        <div class="detail-diagram">
          <span>01 / TIMBER</span><i></i><span>02 / MASONRY</span><b></b>
        </div>
        <h2>A clear joint, a legible edge.</h2>
        <p>
          The fictional detail separates timber from masonry with a visible shadow gap. The drawing
          explains a visual principle; it is not engineering guidance.
        </p>
        <p>
          Keep annotations aligned outside the plate. Let each material retain its own character,
          and make the relationship between them explicit.
        </p>
        <button @click="go('start')">Return to drawing sheet →</button>
      </section>
      <section v-else class="sheet index">
        <p class="eyebrow">SELECTED WORK / 2024–2026</p>
        <h1>Drawing<br />the ordinary.</h1>
        <button
          v-for="(p, i) in projects"
          :key="p"
          @click="
            selected = i;
            go('start');
          "
        >
          <span>0{{ i + 1 }}</span>
          <h2>{{ p }}</h2>
          <small>OPEN SHEET ↗</small>
        </button>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Section Works · Fictional sample content · Design reference 27</span
      ><button @click="reset">Reset demo</button>
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/space-grotesk.woff2') format('woff2');
  font-display: swap;
  font-weight: 100 900;
}
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
  color: #152f4b;
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
  display: flex;
  gap: 60px;
  align-items: center;
  border-bottom: 1px solid #678198;
  font-size: 10px;
}
header strong {
  font: 24px/1 'Space Grotesk';
  letter-spacing: 0.02em;
}
header button {
  margin-left: auto;
  background: none;
  border: 0;
  color: #e2edf1;
  font-size: 10px;
}
main {
  display: grid;
  grid-template-columns: 210px 1fr;
  max-width: 1600px;
  margin: auto;
  min-height: 1000px;
}
.rail {
  border-right: 1px solid #678198;
  padding: 35px 23px;
  font-size: 10px;
}
.rail > p {
  letter-spacing: 0.12em;
  margin-bottom: 30px;
}
.rail button {
  display: block;
  background: none;
  border: 0;
  color: #d7e9ed;
  text-align: left;
  font-size: 11px;
  width: 100%;
  padding: 16px 0;
  line-height: 1.8;
}
.rail button span {
  display: block;
  font-size: 9px;
  color: #8ebcc9;
}
.rail button[aria-pressed='true'] {
  box-shadow: inset -3px 0 #8fd4de;
}
.rail > div {
  font-size: 8px;
  line-height: 1.9;
  color: #a5bfcd;
  margin-top: 100px;
}
.sheet {
  padding: 40px;
}
.title h1 {
  font-size: 48px;
  margin: 20px 0;
  font-weight: 500;
}
.title > p:last-child {
  font-size: 12px;
  color: #b0c9d3;
}
.viewbar {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid #678198;
}
.viewbar button {
  font-size: 10px;
  color: #d7e9ed;
  background: none;
  border-color: #678198;
  min-height: 32px;
  padding: 8px 13px;
}
.viewbar button[aria-pressed='true'] {
  background: #294f6b;
}
.plates {
  margin-top: 25px;
}
.plates.compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.drawing svg {
  width: 100%;
  max-height: 550px;
  display: block;
  border: 1px solid #678198;
}
.drawing figcaption,
.built figcaption {
  font-size: 8px;
  line-height: 1.8;
  color: #abc6d0;
}
.built img {
  width: 100%;
  height: 520px;
}
.compare .built img {
  height: 320px;
}
.titleblock {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid #678198;
  margin-top: 25px;
}
.titleblock > div {
  padding: 17px;
  border-right: 1px solid #678198;
}
.titleblock small {
  font-size: 8px;
  color: #a3bfcd;
  display: block;
  margin-bottom: 10px;
}
.titleblock span {
  font-size: 10px;
}
.project-note {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 50px;
  margin-top: 50px;
  padding-bottom: 30px;
}
.project-note h2 {
  font-size: 34px;
  font-weight: 400;
}
.project-note p {
  font-size: 12px;
  line-height: 2;
}
.project-note button {
  font-size: 10px;
  background: none;
  border: 0;
  color: #8fd4de;
  padding: 0;
}
.material h1,
.index h1 {
  font-size: 60px;
  font-weight: 400;
}
.material p {
  font-size: 14px;
  line-height: 2;
}
.material h2 {
  font-size: 32px;
}
.detail-diagram {
  height: 300px;
  border: 1px solid #678198;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
  margin: 40px 0;
}
.detail-diagram i {
  height: 180px;
  width: 80px;
  background: repeating-linear-gradient(90deg, #c0af8f 0 5px, #b5a282 5px 6px);
}
.detail-diagram b {
  height: 140px;
  width: 160px;
  background: repeating-linear-gradient(0deg, #8ea2aa 0 27px, #496579 27px 30px);
}
.detail-diagram span {
  font-size: 9px;
}
.index > button {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 30px;
  background: none;
  color: #e2edf1;
  border: 0;
  border-top: 1px solid #678198;
  text-align: left;
  padding: 25px 0;
}
.index h2 {
  font-size: 31px;
  flex: 1;
}
.index small {
  font-size: 9px;
}
.specimen-note {
  border-color: #678198;
}
.specimen-note button {
  border-color: #678198;
  color: #e2edf1;
}
@media (max-width: 900px) {
  main {
    grid-template-columns: 160px 1fr;
  }
  .sheet {
    padding: 25px;
  }
  .titleblock {
    grid-template-columns: 1fr 1fr;
  }
  .titleblock > div {
    border-bottom: 1px solid #678198;
  }
  .plates.compare {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 600px) {
  header {
    padding: 22px;
    gap: 20px;
  }
  header > span {
    display: none;
  }
  main {
    display: block;
  }
  .rail {
    border-right: 0;
    border-bottom: 1px solid #678198;
    display: flex;
    gap: 12px;
    padding: 15px 20px;
  }
  .rail > p,
  .rail > div {
    display: none;
  }
  .rail button {
    font-size: 9px;
    padding: 5px;
    line-height: 1.5;
  }
  .sheet {
    padding: 30px 20px;
  }
  .title h1 {
    font-size: 35px;
  }
  .viewbar {
    gap: 10px;
    flex-wrap: wrap;
  }
  .viewbar .row {
    gap: 6px;
  }
  .viewbar button {
    font-size: 9px;
  }
  .drawing figcaption {
    font-size: 8px;
  }
  .project-note {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  .project-note h2 {
    font-size: 30px;
  }
  .built img {
    height: 380px;
  }
  .material h1,
  .index h1 {
    font-size: 43px;
  }
  .detail-diagram {
    gap: 14px;
    padding: 15px;
  }
  .detail-diagram span {
    font-size: 8px;
  }
  .detail-diagram i {
    width: 55px;
  }
  .detail-diagram b {
    width: 90px;
  }
  .index h2 {
    font-size: 24px;
  }
  .index small {
    display: none;
  }
}
</style>
