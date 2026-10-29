<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const sky = ref(1),
  figure = ref(0),
  ground = ref(2),
  contributor = ref(0);
const edition = useStored<{ sky: number; figure: number; ground: number } | null>(
  '99:edition',
  null,
);
const skyNames = ['A pale eclipse', 'The apricot moon', 'Weather arriving'];
const figureNames = ['The walking arch', 'A keeper of circles', 'The long ladder'];
const groundNames = ['Water in rows', 'A terraced field', 'The folded road'];
const people = [
  {
    name: 'Mara / the sky',
    text: 'I began with a horizon that could belong to any of the other drawings. The moon is deliberately too large: it gives the upper band a weight that a realistic sky would not have.',
    rule: 'Keep the horizon level. Let the weather change the mood, not the geometry.',
  },
  {
    name: 'Ivo / the figure',
    text: 'The figures are part person, part structure. Each touches the bottom edge at two points, so that an unexpected ground can still feel like somewhere to stand.',
    rule: 'Two points of contact. One shape that can be read in more than one way.',
  },
  {
    name: 'Nell / the ground',
    text: 'A ground is a promise about what can happen next. Water suggests reflection, terraces suggest work, and the folded road makes distance feel negotiable.',
    rule: 'Begin with the same horizon. Give the lower edge a direction of its own.',
  },
];
const number = computed(() => sky.value * 9 + figure.value * 3 + ground.value + 1);
function keep() {
  edition.value = { sky: sky.value, figure: figure.value, ground: ground.value };
  go('edition');
}
</script>
<template>
  <div class="specimen" :class="{ entry: state === 'start' }">
    <a class="skip" href="#content">Skip to content</a>

    <header>
      <strong>THREE HORIZONS</strong><span>A LANDSCAPE WITH THREE AUTHORS</span
      ><button @click="go('edition')">Your edition ↗</button>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><h1 class="sr">Three Horizons: compose a landscape with three authors</h1>
        <span class="composition-number">EDITION {{ String(number).padStart(2, '0') }} / 27</span>
        <div class="assembly">
          <section class="band sky">
            <svg viewBox="0 0 1200 230" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="1200" height="230" :fill="['#bdc7c5', '#e9ae8f', '#7f94a6'][sky]" />
              <circle
                :cx="[800, 350, 900][sky]"
                cy="100"
                :r="[90, 120, 65][sky]"
                :fill="['#e9e0bf', '#d7674b', '#e9d7a3'][sky]"
              />
              <path
                v-if="sky === 0"
                d="M800 10A90 90 0 0 0 800 190A65 90 0 0 1 800 10"
                fill="#6d7f87"
              />
              <path
                v-if="sky === 2"
                d="M0 50Q150 -10 300 70T600 80T900 60T1200 50V140Q900 70 650 150T0 120Z"
                fill="#d2d4c9"
              />
              <path d="M0 220L220 170 420 215 650 180 870 225 1200 190V230H0Z" fill="#6f7183" />
            </svg>
            <div class="band-label">
              <span>SKY / {{ skyNames[sky] }}</span
              ><button
                @click="
                  contributor = 0;
                  go('contributor');
                "
              >
                Mara’s notes ↗
              </button>
            </div>
            <div class="band-controls">
              <button aria-label="Previous sky" @click="sky = (sky + 2) % 3">←</button
              ><span>{{ sky + 1 }} / 3</span
              ><button aria-label="Next sky" @click="sky = (sky + 1) % 3">→</button>
            </div>
          </section>
          <section class="band figure">
            <svg viewBox="0 0 1200 270" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="1200" height="270" fill="#b4ad98" />
              <path d="M0 0H1200V50L900 35 600 70 300 40 0 65Z" fill="#6f7183" />
              <g v-if="figure === 0" fill="#d7b863">
                <path d="M460 270V125A140 140 0 0 1 740 125V270H670V130A70 70 0 0 0 530 130V270Z" />
                <circle cx="600" cy="45" r="32" fill="#544e64" />
              </g>
              <g v-if="figure === 1">
                <path d="M590 270L560 110H670L640 270" fill="#65746b" />
                <circle cx="615" cy="70" r="42" fill="#d6a087" />
                <circle cx="480" cy="150" r="65" fill="none" stroke="#dfc780" stroke-width="18" />
                <circle cx="760" cy="150" r="65" fill="none" stroke="#dfc780" stroke-width="18" />
                <path d="M550 130L480 150M670 130L760 150" stroke="#65746b" stroke-width="20" />
              </g>
              <g v-if="figure === 2" stroke="#755b7f" stroke-width="18">
                <path d="M520 270L570 20M680 270L630 20" />
                <path
                  v-for="i in 5"
                  :key="i"
                  :d="'M' + (570 - i * 8) + ' ' + i * 45 + 'H' + (630 + i * 8)"
                />
              </g>
              <path d="M0 250Q300 220 450 260T900 245T1200 255V270H0Z" fill="#9b946f" />
            </svg>
            <div class="band-label">
              <span>FIGURE / {{ figureNames[figure] }}</span
              ><button
                @click="
                  contributor = 1;
                  go('contributor');
                "
              >
                Ivo’s notes ↗
              </button>
            </div>
            <div class="band-controls">
              <button aria-label="Previous figure" @click="figure = (figure + 2) % 3">←</button
              ><span>{{ figure + 1 }} / 3</span
              ><button aria-label="Next figure" @click="figure = (figure + 1) % 3">→</button>
            </div>
          </section>
          <section class="band ground">
            <svg viewBox="0 0 1200 230" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="1200" height="230" :fill="['#6c9191', '#9b946f', '#c3a37f'][ground]" />
              <g v-if="ground === 0" stroke="#c1d0b8" fill="none" stroke-width="4">
                <path
                  v-for="i in 8"
                  :key="i"
                  :d="
                    'M0 ' + i * 30 + 'Q300 ' + (i * 30 - 30) + ' 600 ' + i * 30 + 'T1200 ' + i * 30
                  "
                />
              </g>
              <g v-if="ground === 1" fill="none" stroke="#535c45" stroke-width="14">
                <path
                  v-for="i in 6"
                  :key="i"
                  :d="'M0 ' + i * 40 + 'Q500 ' + (i * 50 - 100) + ' 1200 ' + i * 35"
                />
              </g>
              <path
                v-if="ground === 2"
                d="M500 0L800 70 420 145 720 230H940L620 145 990 70 650 0Z"
                fill="#e5d3a9"
              />
              <path d="M0 0H1200V14L800 5 400 18 0 8Z" fill="#9b946f" />
            </svg>
            <div class="band-label">
              <span>GROUND / {{ groundNames[ground] }}</span
              ><button
                @click="
                  contributor = 2;
                  go('contributor');
                "
              >
                Nell’s notes ↗
              </button>
            </div>
            <div class="band-controls">
              <button aria-label="Previous ground" @click="ground = (ground + 2) % 3">←</button
              ><span>{{ ground + 1 }} / 3</span
              ><button aria-label="Next ground" @click="ground = (ground + 1) % 3">→</button>
            </div>
          </section>
        </div>
        <div class="assembly-end">
          <p>
            The seams remain visible. Each drawing keeps its author, even when the landscape becomes
            something none of them anticipated.
          </p>
          <button @click="keep">Keep composition {{ String(number).padStart(2, '0') }} ↗</button>
        </div></template
      >
      <article v-else-if="state === 'contributor'" class="contributor">
        <button @click="go('start')">← Back to the assembly</button
        ><span>CONTRIBUTOR 0{{ contributor + 1 }}</span>
        <h1>{{ people[contributor].name }}</h1>
        <p class="lead">{{ people[contributor].text }}</p>
        <blockquote>{{ people[contributor].rule }}</blockquote>
        <h2>A shared constraint</h2>
        <p>
          All three contributors work to the same width and two common seam colours. Within that
          agreement, each can make an independent composition. The result is a conversation between
          drawings.
        </p>
        <button @click="contributor = (contributor + 1) % 3">Meet the next contributor →</button>
      </article>
      <section v-else class="edition">
        <h1>{{ edition ? 'An edition of one.' : 'Your landscape is waiting.' }}</h1>
        <template v-if="edition"
          ><div class="edition-number">
            {{ String(edition.sky * 9 + edition.figure * 3 + edition.ground + 1).padStart(2, '0') }}
          </div>
          <dl>
            <div>
              <dt>Sky / Mara</dt>
              <dd>{{ skyNames[edition.sky] }}</dd>
            </div>
            <div>
              <dt>Figure / Ivo</dt>
              <dd>{{ figureNames[edition.figure] }}</dd>
            </div>
            <div>
              <dt>Ground / Nell</dt>
              <dd>{{ groundNames[edition.ground] }}</dd>
            </div>
          </dl>
          <p>
            This composition is saved on this browser. All artwork and contributor stories are
            original fictional material.
          </p>
          <button
            @click="
              sky = edition.sky;
              figure = edition.figure;
              ground = edition.ground;
              go('start');
            "
          >
            Open this composition</button
          ><button @click="edition = null">Clear saved edition</button></template
        ><template v-else
          ><p>Choose a sky, a figure and a ground, then keep the composition.</p>
          <button @click="go('start')">Begin assembling</button></template
        >
      </section>
    </main>
    <footer>
      THREE HORIZONS / Original SVG collage / Twenty-seven compositions, three visible authors.
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/space-grotesk.woff2') format('woff2');
  font-weight: 400 700;
  font-display: swap;
}
@font-face {
  font-family: 'DM Sans';
  src: url('/fonts/dm-sans.woff2') format('woff2');
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
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid #aaa28d;
}
header strong {
  font: 25px var(--heading);
  letter-spacing: -0.04em;
}
header span {
  font-size: 9px;
}
button {
  background: transparent;
  border: 1px solid;
  padding: 10px 15px;
}
header button {
  font-size: 11px;
}
.edition-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  padding: 30px 5%;
}
.edition-title h1 {
  font: clamp(40px, 5.5vw, 73px)/1.02 var(--heading);
  letter-spacing: -0.06em;
  margin: 0;
}
.edition-title p {
  font-size: 14px;
  line-height: 1.8;
  margin: 0;
}
.edition-title > span {
  font-size: 9px;
  text-align: right;
}
.edition-title b {
  display: block;
  font: 80px/1.1 var(--heading);
  color: #6c5b8a;
}
.band {
  position: relative;
  overflow: hidden;
  border-top: 1px solid #34332f66;
}
.band svg {
  display: block;
  width: 100%;
  height: 230px;
}
.band.figure svg {
  height: 270px;
}
.band-label {
  position: absolute;
  left: 4%;
  top: 20px;
  background: #e8e0cde8;
  padding: 13px 16px;
  max-width: 230px;
}
.band-label > span {
  font-size: 9px;
  display: block;
}
.band-label button {
  font-size: 10px;
  padding: 7px 0 0;
  border: 0;
  border-bottom: 1px solid;
}
.band-controls {
  position: absolute;
  right: 4%;
  bottom: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  background: #e8e0cdf0;
  padding: 5px;
}
.band-controls button {
  border: 0;
  font-size: 25px;
  padding: 0 12px;
}
.band-controls span {
  font-size: 11px;
}
.assembly-end {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding: 30px 5%;
}
.assembly-end p {
  font-size: 14px;
  line-height: 1.8;
  max-width: 650px;
  margin: 0;
}
.assembly-end button {
  font-size: 12px;
  flex-shrink: 0;
}
.contributor,
.edition {
  padding: 40px 7% 70px;
  min-height: 85vh;
}
.contributor > span {
  display: block;
  font-size: 10px;
  margin-top: 35px;
  color: #6c5b8a;
}
.contributor h1,
.edition h1 {
  font: clamp(45px, 6vw, 85px)/1.1 var(--heading);
  letter-spacing: -0.05em;
  margin: 25px 0;
}
.lead {
  font: clamp(24px, 3vw, 38px)/1.7 var(--heading);
  max-width: 36ch;
}
.contributor blockquote {
  font: 35px/1.5 var(--heading);
  border-block: 1px solid #aaa28d;
  padding: 35px 0;
  margin: 40px 0;
  max-width: 850px;
  color: #6c5b8a;
}
.contributor h2 {
  font: 25px var(--heading);
}
.contributor > p:not(.lead) {
  font-size: 18px;
  line-height: 1.8;
}
.contributor > button {
  margin-top: 20px;
}
.edition-number {
  font: 250px/0.95 var(--heading);
  letter-spacing: -0.08em;
  color: #6c5b8a;
  margin: 40px 0;
}
.edition dl {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  border-block: 1px solid #aaa28d;
  padding: 30px 0;
}
.edition dt {
  font-size: 11px;
}
.edition dd {
  font: 25px var(--heading);
  margin: 15px 0;
}
.edition > p {
  font-size: 15px;
  line-height: 1.8;
}
.edition > button {
  margin: 20px 20px 0 0;
}
footer {
  padding: 22px 4%;
  font-size: 9px;
  border-top: 1px solid #aaa28d;
}
@media (max-width: 700px) {
  header {
    flex-wrap: wrap;
  }
  .edition-title {
    flex-wrap: wrap;
    padding: 25px 5%;
    gap: 20px;
  }
  .edition-title h1 {
    font-size: 43px;
  }
  .edition-title > p {
    order: 3;
    width: 100%;
    font-size: 12px;
  }
  .edition-title b {
    font-size: 60px;
  }
  .band svg {
    height: 230px;
  }
  .band.figure svg {
    height: 270px;
  }
  .band-label {
    left: 12px;
    top: 12px;
    padding: 10px;
    max-width: 180px;
  }
  .band-label > span {
    font-size: 8px;
  }
  .band-controls {
    right: 12px;
    bottom: 12px;
    gap: 10px;
  }
  .assembly-end {
    display: block;
  }
  .assembly-end button {
    margin-top: 20px;
  }
  .contributor,
  .edition {
    padding: 30px 5%;
  }
  .contributor blockquote {
    font-size: 28px;
  }
  .edition-number {
    font-size: 180px;
  }
  .edition dl {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  .edition dd {
    font-size: 23px;
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

/* The entry is the experience itself; supporting routes retain its vocabulary. */

.entry {
  position: relative;
}
.entry header {
  position: absolute;
  z-index: 4;
  left: 4%;
  bottom: auto;
  top: calc(100svh - 105px);
  width: 340px;
  max-width: 92%;
  display: flex;
  gap: 18px;
  align-items: center;
  padding: 18px;
  border: 0;
  background: #f3eddadf;
  box-shadow: 4px 4px 0 #34332f;
  transform: rotate(-3deg);
}
.entry header strong {
  font-size: 13px;
  max-width: 100px;
  line-height: 1.2;
}
.entry header > span {
  display: none;
}
.entry header button {
  font-size: 10px;
  margin-left: auto;
}
.entry main > h1 {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip-path: inset(50%) !important;
  white-space: nowrap !important;
}
.entry .composition-number {
  position: absolute;
  right: 25px;
  top: 20px;
  z-index: 3;
  font: 11px var(--body);
  background: #f3eddadc;
  padding: 8px 12px;
}
.entry .band {
  height: 33.333svh;
  min-height: 240px;
  border: 0;
  overflow: hidden;
}
.entry .band svg,
.entry .band.figure svg {
  height: 100%;
  width: 100%;
}
.entry .band-label {
  left: 25px;
  top: 25px;
  padding: 12px;
  background: #f3eddae8;
  border: 0;
  max-width: 170px;
}
.entry .band-label > span {
  font-size: 9px;
}
.entry .band-label button {
  font-size: 10px;
}
.entry .band-controls {
  right: 25px;
  bottom: 25px;
  background: #f3eddade;
  border-radius: 50px;
  padding: 5px 10px;
}
.entry .band-controls button {
  font-size: 24px;
  width: 45px;
  height: 45px;
  padding: 0;
}
.entry .band-controls span {
  font-size: 11px;
}
.entry .assembly-end {
  padding: 40px 5%;
}
@media (max-width: 750px) {
  .entry header {
    top: calc(100svh - 100px);
    left: 5%;
    padding: 13px;
    width: 240px;
    gap: 10px;
  }
  .entry header strong {
    font-size: 10px;
    max-width: 85px;
  }
  .entry header button {
    font-size: 9px;
  }
  .entry .composition-number {
    right: 15px;
    top: 15px;
    font-size: 8px;
    padding: 7px;
  }
  .entry .band {
    height: 33.333svh;
    min-height: 230px;
  }
  .entry .band-label {
    left: 15px;
    top: 20px;
    max-width: 130px;
    padding: 10px;
  }
  .entry .band.sky .band-label {
    top: 55px;
  }
  .entry .band-label > span {
    font-size: 8px;
  }
  .entry .band-label button {
    font-size: 9px;
  }
  .entry .band-controls {
    right: 15px;
    bottom: 18px;
  }
  .entry .band-controls button {
    width: 35px;
    height: 35px;
    font-size: 21px;
  }
  .entry .band-controls span {
    font-size: 9px;
  }
}
</style>
