<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const light = ref(1),
  selected = ref(0);
const directions = ['North', 'East', 'South', 'West'];
const angles = [0, 45, 180, -45];
const objects = [
  {
    name: 'The tall vessel',
    shape: 'vessel',
    text: 'A narrow vessel becomes a broad presence when its shadow falls sideways. The projection makes capacity feel less important than reach.',
  },
  {
    name: 'An open ring',
    shape: 'ring',
    text: 'The ring’s empty centre survives in some projections and disappears in others. What seems essential to an object can depend on the conditions under which it is seen.',
  },
  {
    name: 'A folded plane',
    shape: 'fold',
    text: 'The fold gives a flat sheet a second direction. Its shadow describes the height more clearly than the visible surface does.',
  },
  {
    name: 'Three rods',
    shape: 'rods',
    text: 'Three separate rods can project as one shape. The shadow gathers what the object keeps apart, producing a temporary agreement.',
  },
  {
    name: 'The shallow bowl',
    shape: 'bowl',
    text: 'The bowl’s edge casts a line that is longer than the object. A small change in light makes the distinction between inside and outside uncertain.',
  },
  {
    name: 'A cut block',
    shape: 'block',
    text: 'The missing corner is legible only from certain directions. The archive records those conditions as part of the object’s account.',
  },
];
function open(i: number) {
  selected.value = i;
  go('object');
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>

    <header>
      <strong>CAST</strong><span>A SHADOW ARCHIVE / SIX OBJECTS</span
      ><button @click="go('index')">Complete index ↗</button>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><div class="opening">
          <h1>The object is small.<br />Its consequence is not.</h1>
          <div class="light-controls">
            <span>LIGHT FROM</span
            ><button
              v-for="(d, i) in directions"
              :key="d"
              :aria-pressed="light === i"
              @click="light = i"
            >
              {{ d }} {{ ['↓', '←', '↑', '→'][i] }}
            </button>
          </div>
        </div>
        <div class="shadow-fields">
          <article v-for="(o, i) in objects" :key="o.name" :class="'field f' + i">
            <div
              class="shadow"
              :class="o.shape"
              :style="{ transform: 'rotate(' + angles[light] + 'deg) scale(2.5,1.7)' }"
              aria-hidden="true"
            ></div>
            <div class="small-object" :class="o.shape" aria-hidden="true"></div>
            <button @click="open(i)">
              <span>0{{ i + 1 }} / {{ directions[light].toUpperCase() }} LIGHT</span
              ><strong>{{ o.name }}</strong
              ><small>Enter the shadow ↗</small>
            </button>
          </article>
        </div>
        <p class="reading-note">
          A projection is an account made under particular conditions. Move the light, then read the
          same object again.
        </p></template
      >
      <article v-else-if="state === 'object'" class="object-record">
        <button @click="go('start')">← Return to the field</button>
        <div class="projection">
          <div
            class="shadow"
            :class="objects[selected].shape"
            :style="{ transform: 'rotate(' + angles[light] + 'deg) scale(3,2)' }"
            aria-hidden="true"
          ></div>
          <div class="small-object" :class="objects[selected].shape" aria-hidden="true"></div>
          <h1>{{ objects[selected].name }}</h1>
          <span
            >PROJECTION 0{{ selected + 1 }} / LIGHT FROM {{ directions[light].toUpperCase() }}</span
          >
        </div>
        <p class="lead">{{ objects[selected].text }}</p>
        <div class="light-controls">
          <span>COMPARE ANOTHER PROJECTION</span
          ><button
            v-for="(d, i) in directions"
            :key="d"
            :aria-pressed="light === i"
            @click="light = i"
          >
            {{ d }}
          </button>
        </div>
        <p class="method">
          The original CSS silhouettes are schematic, not a physically accurate light simulation.
          Each projection demonstrates how orientation can change visual emphasis while the
          underlying object remains the same.
        </p>
        <button @click="open((selected + 1) % 6)">Next object →</button>
      </article>
      <section v-else class="index">
        <h1>Every object.<br />Every direction.</h1>
        <p>Six original studies, each available under four labelled light directions.</p>
        <ol>
          <li v-for="(o, i) in objects" :key="o.name">
            <span>0{{ i + 1 }}</span>
            <div>
              <h2>{{ o.name }}</h2>
              <p>{{ o.text }}</p>
              <button @click="open(i)">Open the projection ↗</button>
            </div>
          </li>
        </ol>
        <button @click="go('start')">Return to the shadow field</button>
      </section>
    </main>
    <footer>CAST / Original geometric studies / Light as a reading condition.</footer>
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
  padding: 25px 4%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid #877746;
}
header strong {
  font: 45px var(--heading);
  letter-spacing: -0.07em;
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
header button {
  font-size: 11px;
}
.opening {
  padding: 40px 5%;
}
.opening h1 {
  font: clamp(40px, 5.7vw, 78px)/1.1 var(--heading);
  letter-spacing: -0.055em;
  max-width: 1000px;
  margin: 0 0 30px;
}
.light-controls {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 18px;
  font-size: 11px;
}
.light-controls > span {
  font-size: 9px;
  letter-spacing: 0.1em;
  margin-right: 15px;
}
.light-controls button {
  border: 1px solid;
  padding: 8px 15px;
}
.light-controls button[aria-pressed='true'] {
  background: #2d3035;
  color: #f0d48b;
}
.shadow-fields {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid #877746;
}
.field {
  position: relative;
  min-height: 430px;
  overflow: hidden;
  border-right: 1px solid #877746;
  border-bottom: 1px solid #877746;
}
.field:nth-child(2n) {
  background: #e6ca83;
}
.small-object,
.shadow {
  position: absolute;
  width: 75px;
  height: 100px;
  left: 30%;
  top: 22%;
  transform-origin: 50% 80%;
}
.small-object {
  background: #efe9d5;
  box-shadow: 8px 8px 0 #b7a477;
  z-index: 1;
}
.shadow {
  background: #51466c;
  opacity: 0.7;
  transition: transform 0.6s;
}
.vessel {
  border-radius: 15% 15% 40% 40%;
  clip-path: polygon(25% 0, 75% 0, 100% 85%, 85% 100%, 15% 100%, 0 85%);
}
.ring {
  border-radius: 50%;
  background: transparent !important;
  border: 18px solid #efe9d5;
  box-shadow: none;
}
.shadow.ring {
  border-color: #51466c;
}
.fold {
  clip-path: polygon(0 100%, 40% 0, 100% 80%, 40% 60%);
}
.rods {
  clip-path: polygon(
    0 0,
    20% 0,
    20% 80%,
    40% 80%,
    40% 0,
    60% 0,
    60% 80%,
    80% 80%,
    80% 0,
    100% 0,
    100% 100%,
    0 100%
  );
}
.bowl {
  border-radius: 5% 5% 50% 50%;
  height: 65px;
  top: 30%;
}
.block {
  clip-path: polygon(0 0, 65% 0, 65% 35%, 100% 35%, 100% 100%, 0 100%);
}
.field > button {
  position: absolute;
  z-index: 2;
  bottom: 25px;
  left: 25px;
  right: 25px;
  text-align: left;
  border: 0;
  background: #f0d48be8;
  padding: 18px;
}
.field button > span {
  font-size: 9px;
  display: block;
}
.field strong {
  font: 28px/1.2 var(--heading);
  display: block;
  margin: 10px 0;
}
.field small {
  font-size: 10px;
}
.reading-note {
  padding: 35px 5%;
  font: 22px/1.7 var(--heading);
  max-width: 850px;
  margin: 0;
}
.object-record {
  padding: 35px 5% 70px;
}
.projection {
  position: relative;
  height: 500px;
  border: 1px solid #877746;
  margin: 30px 0;
  overflow: hidden;
}
.projection .small-object,
.projection .shadow {
  left: 65%;
  top: 27%;
  width: 100px;
  height: 150px;
}
.projection h1 {
  position: absolute;
  left: 5%;
  bottom: 70px;
  font: clamp(45px, 6vw, 80px)/1.05 var(--heading);
  letter-spacing: -0.05em;
  max-width: 65%;
  z-index: 2;
  background: #f0d48bd9;
  padding: 10px;
}
.projection > span {
  position: absolute;
  left: 6%;
  bottom: 35px;
  font-size: 10px;
  z-index: 2;
}
.lead {
  font: clamp(24px, 3vw, 37px)/1.7 var(--heading);
  max-width: 38ch;
}
.method {
  font-size: 12px;
  line-height: 1.9;
  margin: 35px 0;
}
.index {
  padding: 40px 7% 70px;
}
.index h1 {
  font: clamp(45px, 6vw, 85px)/1.1 var(--heading);
  letter-spacing: -0.05em;
}
.index > p {
  font-size: 13px;
  line-height: 1.8;
}
.index ol {
  list-style: none;
  padding: 0;
  margin: 40px 0;
}
.index li {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 30px;
  padding: 30px 0;
  border-top: 1px solid #877746;
}
.index li > span {
  font: 60px var(--heading);
  color: #51466c;
}
.index h2 {
  font: 32px var(--heading);
}
.index li p {
  font: 21px/1.8 var(--heading);
}
.index li button {
  font-size: 11px;
}
footer {
  padding: 22px 4%;
  font-size: 9px;
  border-top: 1px solid #877746;
}
@media (max-width: 700px) {
  header {
    flex-wrap: wrap;
  }
  .opening {
    padding: 30px 5%;
  }
  .opening h1 {
    font-size: 42px;
  }
  .light-controls {
    gap: 10px;
  }
  .light-controls > span {
    width: 100%;
    margin-bottom: 5px;
  }
  .shadow-fields {
    grid-template-columns: 1fr 1fr;
  }
  .field {
    min-height: 350px;
  }
  .small-object,
  .shadow {
    left: 25%;
    width: 50px;
    height: 75px;
    top: 20%;
  }
  .ring {
    border-width: 12px;
  }
  .field > button {
    left: 10px;
    right: 10px;
    bottom: 15px;
    padding: 12px;
  }
  .field strong {
    font-size: 23px;
  }
  .field button > span {
    font-size: 8px;
  }
  .field small {
    font-size: 9px;
  }
  .reading-note {
    font-size: 19px;
  }
  .projection {
    height: 420px;
  }
  .projection h1 {
    font-size: 42px;
    max-width: 85%;
    bottom: 60px;
  }
  .projection > span {
    font-size: 8px;
  }
  .projection .small-object,
  .projection .shadow {
    left: 60%;
    top: 18%;
    width: 65px;
    height: 100px;
  }
  .index {
    padding: 30px 5%;
  }
  .index li {
    grid-template-columns: 45px 1fr;
    gap: 15px;
  }
  .index li > span {
    font-size: 35px;
  }
  .index h2 {
    font-size: 27px;
  }
  .index li p {
    font-size: 18px;
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
