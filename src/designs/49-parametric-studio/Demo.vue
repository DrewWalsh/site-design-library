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
    .filter((k) => k.startsWith('design-library:49:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
function numberParam(key: string, fallback: number, min: number, max: number) {
  const n = Number(new URLSearchParams(location.search).get(key) ?? fallback);
  return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : fallback;
}
const spacing = ref(numberParam('spacing', 28, 12, 64)),
  angle = ref(numberParam('angle', 30, -60, 60));
const presets = [
  { name: 'Open rhythm', s: 36, a: 0 },
  { name: 'Diagonal field', s: 28, a: 30 },
  { name: 'Close weave', s: 16, a: -35 },
];
const lines = computed(() => Math.ceil(1200 / Math.max(12, spacing.value)));
function preset(i: number) {
  spacing.value = presets[i].s;
  angle.value = presets[i].a;
  selected.value = i;
}
function defaults() {
  spacing.value = 28;
  angle.value = 30;
  selected.value = 1;
  go('defaults');
}
watch([spacing, angle], () => {
  const url = new URL(location.href);
  url.searchParams.set('spacing', String(spacing.value));
  url.searchParams.set('angle', String(angle.value));
  history.replaceState({}, '', url);
});
async function share() {
  try {
    await navigator.clipboard.writeText(location.href);
    message.value = 'Configuration URL copied.';
  } catch {
    message.value = location.href;
  }
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>PATTERN<br />WORKS</strong><span>MODULAR SCREEN STUDIES / 001</span>
      <nav>
        <button @click="go('start')">The studio</button
        ><button @click="go('compare')">Compare presets</button>
      </nav>
    </header>
    <main id="content">
      <div class="heading">
        <div>
          <p class="eyebrow">A RULE, MADE VISIBLE</p>
          <h1>Change the rule.<br />Watch the relationship.</h1>
        </div>
        <p>Spacing and angle.<br />Two small decisions,<br />a different kind of screen.</p>
      </div>
      <template v-if="state !== 'compare'"
        ><div class="studio">
          <section class="stage">
            <div class="stage-label">
              <span>SCREEN STUDY / LIVE SVG</span><span>600 × 440 UNITS</span>
            </div>
            <svg
              viewBox="0 0 600 440"
              role="img"
              :aria-label="
                'Modular screen with ' + spacing + ' unit spacing and ' + angle + ' degree rotation'
              "
            >
              <defs>
                <clipPath id="screen"><rect x="50" y="35" width="500" height="350" /></clipPath>
              </defs>
              <rect width="600" height="440" fill="#d9ded2" />
              <g clip-path="url(#screen)">
                <rect x="50" y="35" width="500" height="350" fill="#b9cbb4" />
                <g :transform="'translate(300 220) rotate(' + angle + ')'">
                  <rect
                    v-for="n in lines"
                    :key="n"
                    :x="-600 + n * spacing"
                    y="-600"
                    width="6"
                    height="1200"
                    fill="#365e51"
                  />
                  <path d="M-600 -100H600M-600 100H600" stroke="#8ca282" stroke-width="8" />
                </g>
              </g>
              <rect
                x="50"
                y="35"
                width="500"
                height="350"
                fill="none"
                stroke="#293b39"
                stroke-width="3"
              />
              <path d="M50 410H550M50 400V420M550 400V420" stroke="#7e8f78" />
              <text
                x="300"
                y="429"
                text-anchor="middle"
                font-size="10"
                font-family="monospace"
                fill="#42583f"
              >
                500 / MODULAR SCREEN
              </text>
            </svg>
            <div class="stage-foot">
              <span>SPACING {{ spacing }} U</span><span>ANGLE {{ angle }}°</span
              ><span>STATIC GEOMETRY</span>
            </div>
          </section>
          <aside>
            <p class="eyebrow">PARAMETERS</p>
            <label
              >Spacing <span>12–64 units</span
              ><input type="range" min="12" max="64" v-model.number="spacing" /><input
                type="number"
                min="12"
                max="64"
                v-model.number="spacing"
                aria-label="Spacing in units"
                @change="spacing = Math.max(12, Math.min(64, spacing || 28))"
            /></label>
            <p>More space lets more of the background through.</p>
            <label
              >Angle <span>−60° to 60°</span
              ><input type="range" min="-60" max="60" v-model.number="angle" /><input
                type="number"
                min="-60"
                max="60"
                v-model.number="angle"
                aria-label="Angle in degrees"
                @change="angle = Math.max(-60, Math.min(60, angle || 0))"
            /></label>
            <p>Rotate the repeated elements without changing their spacing.</p>
            <button @click="defaults">Restore defaults</button
            ><button class="primary" @click="share">Copy configuration link ↗</button>
            <p v-if="message" role="status">{{ message }}</p>
          </aside>
        </div>
        <section class="presets">
          <p class="eyebrow">START WITH A PRESET</p>
          <div>
            <button
              v-for="(p, i) in presets"
              :key="p.name"
              :aria-pressed="spacing === p.s && angle === p.a"
              @click="preset(i)"
            >
              <span>0{{ i + 1 }}</span>
              <h2>{{ p.name }}</h2>
              <small>{{ p.s }} U / {{ p.a }}°</small>
            </button>
          </div>
        </section>
        <section class="principle">
          <h2>Variation with a reason.</h2>
          <p>
            The screen’s openness and direction come from two explicit parameters. This original
            geometric study demonstrates a relationship, not a random decorative generator. Values
            can be shared in the URL.
          </p>
        </section></template
      >
      <section v-else class="comparison">
        <h2>Same system. Different choices.</h2>
        <div>
          <article v-for="(p, i) in presets.slice(0, 2)" :key="p.name">
            <svg
              viewBox="0 0 400 300"
              role="img"
              :aria-label="p.name + ' at ' + p.s + ' units and ' + p.a + ' degrees'"
            >
              <defs>
                <clipPath :id="'preset' + i">
                  <rect x="20" y="20" width="360" height="260" />
                </clipPath>
              </defs>
              <rect width="400" height="300" fill="#d9ded2" />
              <g :clip-path="'url(#preset' + i + ')'">
                <g :transform="'translate(200 150) rotate(' + p.a + ')'">
                  <rect
                    v-for="n in 40"
                    :key="n"
                    :x="-700 + n * p.s"
                    y="-500"
                    width="6"
                    height="1000"
                    fill="#365e51"
                  />
                </g>
              </g>
              <rect
                x="20"
                y="20"
                width="360"
                height="260"
                fill="none"
                stroke="#293b39"
                stroke-width="2"
              />
            </svg>
            <h2>{{ p.name }}</h2>
            <p>Spacing {{ p.s }} units / Angle {{ p.a }}°</p>
            <button
              @click="
                preset(i);
                go('start');
              "
            >
              Explore this configuration →
            </button>
          </article>
        </div>
        <p>
          Compare the openness and directional emphasis at the same viewport. Neither setting is
          inherently better; the intended use determines the fit.
        </p>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Pattern Works · Fictional sample content · Design reference 49</span
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
  gap: 50px;
  padding: 25px 5%;
  border-bottom: 1px solid #aab5a4;
}
header strong {
  font: 23px/1 'Space Grotesk';
  font-weight: 600;
  letter-spacing: -0.03em;
}
header > span {
  font-size: 9px;
  color: #4c6456;
}
nav {
  margin-left: auto;
  display: flex;
  gap: 25px;
}
nav button {
  font-size: 10px;
  border: 0;
  background: none;
}
main {
  max-width: 1450px;
  margin: auto;
  padding: 45px 5% 80px;
}
.heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 50px;
  margin-bottom: 40px;
}
.heading h1 {
  font-size: 52px;
  font-weight: 500;
  line-height: 1.1;
  margin: 20px 0 0;
}
.heading > p {
  font-size: 11px;
  line-height: 1.9;
  color: #4d6255;
}
.studio {
  display: grid;
  grid-template-columns: 1fr 280px;
  border: 1px solid #9aaa98;
}
.stage {
  background: #d9ded2;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.stage-label,
.stage-foot {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  font-size: 8px;
  padding: 17px 20px;
  border-bottom: 1px solid #aab5a4;
}
.stage-foot {
  border: 0;
  border-top: 1px solid #aab5a4;
}
.stage svg {
  width: 100%;
  max-height: 530px;
  display: block;
}
.studio aside {
  padding: 25px;
  border-left: 1px solid #9aaa98;
  background: #f4f5ec;
}
.studio aside > .eyebrow {
  font-size: 9px;
  margin-bottom: 25px;
}
.studio label {
  font-size: 12px;
  margin-top: 25px;
}
.studio label > span {
  font-size: 9px;
  color: #506653;
  margin-top: 3px;
}
.studio input[type='range'] {
  padding: 0;
  width: 100%;
  accent-color: #3f756a;
  background: none;
  border: 0;
}
.studio input[type='number'] {
  font-size: 12px;
  max-width: 110px;
  background: #fffef5;
}
.studio aside p {
  font-size: 9px;
  line-height: 1.9;
  color: #5d7465;
  overflow-wrap: anywhere;
}
.studio aside > button {
  display: block;
  width: 100%;
  font-size: 10px;
  margin-top: 18px;
  padding: 12px;
}
.presets {
  padding: 35px 0;
}
.presets > .eyebrow {
  font-size: 9px;
}
.presets > div {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.presets button {
  background: none;
  border: 1px solid #aab5a4;
  text-align: left;
  padding: 20px;
}
.presets span {
  font-size: 9px;
}
.presets h2 {
  font: 23px 'Space Grotesk';
  margin: 18px 0 10px;
}
.presets small {
  font-size: 9px;
}
.principle {
  padding-top: 25px;
  border-top: 1px solid #aab5a4;
}
.principle h2 {
  font-size: 31px;
}
.principle p {
  font-size: 12px;
  line-height: 1.9;
  max-width: 80ch;
}
.comparison {
  padding: 20px 0 100px;
}
.comparison > h2 {
  font: 34px 'Space Grotesk';
}
.comparison > div {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 35px;
  margin: 35px 0;
}
.comparison svg {
  width: 100%;
  display: block;
}
.comparison h2 {
  font-size: 27px;
}
.comparison p {
  font-size: 12px;
  line-height: 1.9;
}
.comparison button {
  font-size: 10px;
  background: none;
}
@media (max-width: 800px) {
  header > span {
    display: none;
  }
  .heading h1 {
    font-size: 44px;
  }
  .studio {
    grid-template-columns: 1fr 230px;
  }
  .studio aside {
    padding: 20px;
  }
  .stage-foot {
    font-size: 7px;
  }
}
@media (max-width: 600px) {
  header {
    padding: 23px;
    gap: 20px;
  }
  header strong {
    font-size: 20px;
  }
  nav {
    gap: 13px;
  }
  nav button {
    font-size: 9px;
  }
  .heading {
    display: block;
  }
  .heading h1 {
    font-size: 37px;
  }
  .heading > p {
    margin-top: 25px;
  }
  .studio {
    grid-template-columns: 1fr;
  }
  .studio aside {
    border-left: 0;
    border-top: 1px solid #9aaa98;
  }
  .studio aside label {
    margin-top: 20px;
  }
  .stage-label,
  .stage-foot {
    font-size: 7px;
    padding: 13px;
  }
  .presets > div {
    grid-template-columns: 1fr;
  }
  .presets button {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .presets h2 {
    font-size: 21px;
    margin: 0;
    flex: 1;
  }
  .presets small {
    font-size: 8px;
  }
  .comparison > div {
    grid-template-columns: 1fr;
  }
  .comparison > h2 {
    font-size: 29px;
  }
}
</style>
