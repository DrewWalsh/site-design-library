<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const exploded = ref(true),
  part = ref(2),
  step = ref(0),
  complete = ref(false);
const parts = [
  {
    name: 'Top plate',
    role: 'The hand’s first contact',
    text: 'The top plate gathers the controls into one familiar surface. A shallow recess guides the thumb toward the winding lever. Wear makes an invisible instruction visible.',
    repair:
      'Inspect the top plate for loose external fittings. Do not remove screws in a real camera without a model-specific service guide.',
  },
  {
    name: 'Viewfinder',
    role: 'A frame before the frame',
    text: 'The viewfinder offers a small, provisional version of the world. It does not record anything. Its job is to help a person decide what deserves a boundary.',
    repair:
      'Check the finder against a bright, indirect surface. This sample records an observation; it does not diagnose optical alignment.',
  },
  {
    name: 'Lens barrel',
    role: 'A controlled passage for light',
    text: 'The barrel holds moving elements at deliberate distances. Its engraved scale translates a continuous adjustment into a repeatable decision: how much of the scene should remain legible?',
    repair:
      'Turn the external focus ring gently through its normal range. Stop if resistance changes unexpectedly; never force a mechanism.',
  },
  {
    name: 'Shutter',
    role: 'The interval that makes an image',
    text: 'The shutter turns duration into a material decision. Two curtains define an interval so brief that the resulting image can make movement appear to have stopped.',
    repair:
      'Observe the shutter without touching its curtains. Real testing requires suitable tools and safe handling instructions.',
  },
  {
    name: 'Film chamber',
    role: 'Darkness held in reserve',
    text: 'The chamber protects what has not yet become an image. Felt seals and a simple latch do a quiet but essential job: keeping accidental light from becoming part of the picture.',
    repair:
      'Inspect the illustrated seal path. Opening a loaded real camera would expose the film; confirm it is empty before any inspection.',
  },
  {
    name: 'Winding spool',
    role: 'One frame after another',
    text: 'The spool gives the camera a memory of progress. Each turn moves an unexposed section into place and carries the previous decision away from the lens.',
    repair:
      'Record the simulated transport as checked. No actual camera mechanism is controlled by this page.',
  },
];
function open(i: number) {
  part.value = i;
  go('component');
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>

    <header>
      <strong>OBJECT<span>THE MECHANICAL CAMERA / ISSUE 07</span></strong>
      <nav>
        <button @click="go('start')">Inside the object</button
        ><button @click="go('repair')">Inspection sequence</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><div class="object-title">
          <h1>Everything<br />has an inside.</h1>
          <p>Six parts. One deliberate exposure.<br />Choose a component to enter its story.</p>
        </div>
        <div class="camera" :class="{ assembled: !exploded }">
          <svg viewBox="0 0 1200 500" aria-hidden="true">
            <defs>
              <pattern id="hatch87" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M0 8L8 0" stroke="#91a49a" stroke-width="1" />
              </pattern>
            </defs>
            <path d="M90 260H1120" stroke="#8e9b95" stroke-dasharray="5 8" />
            <g class="body">
              <path
                d="M380 200L720 160 790 230 790 390 450 440 380 370Z"
                fill="#5f7168"
                stroke="#263732"
                stroke-width="3"
              />
              <path d="M450 270L790 230M450 270V440" fill="none" stroke="#b2bcb5" />
              <rect
                x="480"
                y="285"
                width="260"
                height="110"
                fill="url(#hatch87)"
                transform="skewY(-7)"
              />
              <circle cx="560" cy="315" r="70" fill="#263732" stroke="#c3cac4" stroke-width="6" />
            </g>
            <g class="top">
              <path
                d="M355 105L695 65 780 130 440 177Z"
                fill="#cbd1c9"
                stroke="#263732"
                stroke-width="2"
              />
              <ellipse cx="650" cy="100" rx="30" ry="12" fill="#6b7d72" />
              <path d="M650 100L720 80" stroke="#263732" stroke-width="8" />
            </g>
            <g class="finder">
              <path
                d="M420 25L495 18 525 55 450 64Z"
                fill="#7d9184"
                stroke="#263732"
                stroke-width="2"
              />
              <rect x="440" y="35" width="45" height="35" fill="#243d39" />
            </g>
            <g class="lens">
              <path
                d="M200 290L350 270 370 390 220 410Z"
                fill="#6f8176"
                stroke="#263732"
                stroke-width="3"
              />
              <ellipse
                cx="210"
                cy="350"
                rx="55"
                ry="70"
                fill="#263732"
                stroke="#a9b6ab"
                stroke-width="12"
              />
              <ellipse cx="210" cy="350" rx="28" ry="40" fill="#88aaa3" />
              <path d="M270 280L285 400M300 275L315 398" stroke="#263732" stroke-width="4" />
            </g>
            <g class="back">
              <path
                d="M880 210L1040 190 1060 370 900 400Z"
                fill="url(#hatch87)"
                stroke="#263732"
                stroke-width="3"
              />
            </g>
            <g class="spool">
              <rect x="1110" y="245" width="35" height="130" rx="10" fill="#263732" />
              <path d="M1098 250H1158M1098 370H1158" stroke="#677d70" stroke-width="12" />
            </g></svg
          ><button class="part p0" @click="open(0)">01 / Top plate</button
          ><button class="part p1" @click="open(1)">02 / Viewfinder</button
          ><button class="part p2" @click="open(2)">03 / Lens barrel</button
          ><button class="part p3" @click="open(3)">04 / Shutter</button
          ><button class="part p4" @click="open(4)">05 / Film chamber</button
          ><button class="part p5" @click="open(5)">06 / Winding spool</button>
        </div>
        <div class="object-controls">
          <button @click="exploded = !exploded">
            {{ exploded ? 'Assemble the camera' : 'Separate the components' }}</button
          ><span>Schematic illustration / not a service drawing</span>
        </div>
        <ol class="component-index">
          <li v-for="(p, i) in parts" :key="p.name">
            <button @click="open(i)">
              0{{ i + 1 }} {{ p.name }}<span>{{ p.role }}</span>
            </button>
          </li>
        </ol></template
      >
      <article v-else-if="state === 'component'" class="component">
        <button @click="go('start')">← Return to the object</button
        ><span class="part-number">0{{ part + 1 }}</span>
        <h1>{{ parts[part].name }}</h1>
        <h2>{{ parts[part].role }}</h2>
        <p class="lead">{{ parts[part].text }}</p>
        <div class="component-diagram" aria-hidden="true">
          <i
            v-for="i in 5"
            :key="i"
            :style="{
              transform: 'translateX(' + (i - 3) * 22 + 'px) rotate(' + part * 15 + 'deg)',
            }"
          ></i>
        </div>
        <p>
          Scale, material and mechanical tolerances are simplified. The object serves as a navigable
          story about attention and making.
        </p>
        <button @click="open((part + 1) % 6)">Next component →</button
        ><button
          @click="
            step = part;
            go('repair');
          "
        >
          Inspect this part
        </button>
      </article>
      <section v-else class="repair">
        <h1>{{ complete ? 'Inspection recorded.' : 'One part at a time.' }}</h1>
        <p>A fictional guided observation, not repair instructions for a real camera.</p>
        <ol>
          <li v-for="(p, i) in parts" :key="p.name" :class="{ current: step === i }">
            <button
              @click="
                step = i;
                complete = false;
              "
            >
              0{{ i + 1 }} {{ p.name }}
            </button>
          </li>
        </ol>
        <article v-if="!complete">
          <small>STEP {{ step + 1 }} OF 6</small>
          <h2>{{ parts[step].name }}</h2>
          <p>{{ parts[step].repair }}</p>
          <button @click="step < 5 ? step++ : (complete = true)">
            {{ step < 5 ? 'Record observation and continue' : 'Finish sample inspection' }}
          </button>
        </article>
        <p v-else role="status">
          All six component observations completed in this visit. No real service record was
          created.
        </p>
        <button @click="go('start')">Return to the assembled story</button>
      </section>
    </main>
    <footer>OBJECT / A simplified original camera model, imagined for this publication.</footer>
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
  padding: 28px 4%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid #98a59e;
}
header strong {
  font: 40px var(--heading);
  letter-spacing: -0.06em;
}
header span {
  display: block;
  font: 9px var(--body);
  letter-spacing: 0.1em;
  margin-top: 3px;
}
button {
  background: transparent;
  border: 1px solid #82938a;
  padding: 10px 15px;
}
nav {
  font-size: 11px;
}
.object-title {
  padding: 40px 5% 0;
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: end;
}
.object-title h1 {
  font: clamp(45px, 5.8vw, 80px)/1.03 var(--heading);
  letter-spacing: -0.06em;
  margin: 0;
}
.object-title p {
  font-size: 12px;
  line-height: 1.9;
  max-width: 300px;
}
.camera {
  position: relative;
  margin: 20px 3% 0;
  height: 480px;
}
.camera svg {
  width: 100%;
  height: 100%;
}
.camera g {
  transition: transform 0.7s;
}
.assembled .top {
  transform: translate(20px, 65px);
}
.assembled .finder {
  transform: translate(10px, 120px);
}
.assembled .lens {
  transform: translate(340px, -30px);
}
.assembled .back {
  transform: translate(-110px, 0);
}
.assembled .spool {
  transform: translate(-370px, -10px);
}
.part {
  position: absolute;
  font-size: 10px;
  border: 0;
  border-bottom: 1px solid;
  background: #f2f3eeeb;
  min-height: 40px;
}
.p0 {
  left: 53%;
  top: 4%;
}
.p1 {
  left: 25%;
  top: 2%;
}
.p2 {
  left: 5%;
  top: 51%;
}
.p3 {
  left: 43%;
  bottom: 0;
}
.p4 {
  right: 9%;
  bottom: 5%;
}
.p5 {
  right: 1%;
  top: 22%;
}
.object-controls {
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 20px 5%;
  border-block: 1px solid #98a59e;
}
.object-controls span {
  font-size: 10px;
}
.object-controls button {
  font-size: 11px;
}
.component-index {
  padding: 20px 5% 40px;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.component-index button {
  text-align: left;
  width: 100%;
  border: 0;
  border-bottom: 1px solid;
  font-size: 12px;
}
.component-index span {
  display: block;
  font-size: 10px;
  margin-top: 12px;
  color: #49675b;
}
.component,
.repair {
  padding: 40px 7% 70px;
}
.part-number {
  display: block;
  font: 140px/1 var(--heading);
  color: #49675b;
  margin-top: 40px;
}
.component h1,
.repair h1 {
  font: clamp(45px, 6vw, 85px)/1.05 var(--heading);
  letter-spacing: -0.045em;
  margin: 25px 0;
}
.component h2 {
  font-size: 18px;
}
.lead {
  font: clamp(23px, 3vw, 35px)/1.7 var(--heading);
  max-width: 40ch;
}
.component-diagram {
  height: 250px;
  position: relative;
  max-width: 700px;
  display: grid;
  place-items: center;
  border-block: 1px solid #98a59e;
  margin: 35px 0;
}
.component-diagram i {
  position: absolute;
  width: 160px;
  height: 160px;
  border: 2px solid #49675b;
  border-radius: 45%;
}
.component > p:not(.lead) {
  font-size: 12px;
  line-height: 1.9;
}
.component > button {
  margin: 15px 20px 0 0;
}
.repair ol {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 30px 0;
}
.repair li button {
  font-size: 11px;
}
.repair .current {
  background: #263732;
  color: #fff;
}
.repair article {
  padding: 40px;
  border: 1px solid;
  max-width: 800px;
  margin: 30px 0;
}
.repair article h2 {
  font: 35px var(--heading);
  margin-top: 15px;
}
.repair article p {
  font: 23px/1.8 var(--heading);
}
footer {
  padding: 24px 4%;
  font-size: 10px;
  border-top: 1px solid #98a59e;
}
@media (max-width: 700px) {
  header {
    flex-wrap: wrap;
  }
  .object-title {
    display: block;
    padding: 30px 5% 0;
  }
  .object-title h1 {
    font-size: 45px;
  }
  .object-title p {
    margin-top: 25px;
  }
  .camera {
    height: 280px;
    margin: 0;
  }
  .part {
    font-size: 8px;
    padding: 4px;
  }
  .p0 {
    top: 10%;
    left: 52%;
  }
  .p1 {
    left: 15%;
    top: 0;
  }
  .p2 {
    left: 2%;
    top: 58%;
  }
  .p3 {
    left: 30%;
    bottom: 0;
  }
  .p4 {
    right: 1%;
    bottom: 2%;
  }
  .p5 {
    right: 0;
    top: 33%;
  }
  .object-controls {
    flex-wrap: wrap;
    gap: 10px;
  }
  .component-index {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .component-index button {
    font-size: 11px;
  }
  .component,
  .repair {
    padding: 30px 5%;
  }
  .repair article {
    padding: 25px;
  }
  .repair article p {
    font-size: 19px;
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
