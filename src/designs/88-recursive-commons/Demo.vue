<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const wing = ref(state.value === 'object' ? 0 : -1),
  selected = ref(0),
  saved = useStored<number[]>('88:cabinet', []);
const wings = [
  { name: 'Things that hold', color: '#edb935', ink: '#233a39', ids: [0, 1] },
  { name: 'Things that measure', color: '#315c71', ink: '#fff3d4', ids: [2, 3] },
  { name: 'Things that connect', color: '#cc7c76', ink: '#142524', ids: [4, 5] },
];
const objects = [
  {
    name: 'The chipped cup',
    room: 'VESSELS',
    text: 'A cup repaired with a dark line of resin. Its capacity has not changed, but the careful drinker now turns it in the hand before taking the first sip.',
    material: 'Glazed clay / household collection',
  },
  {
    name: 'A folded envelope',
    room: 'CONTAINERS',
    text: 'The letter is gone. The envelope retains a crease where it was held open with one hand, and a faint rectangle where a photograph rested inside.',
    material: 'Paper / correspondence collection',
  },
  {
    name: 'The short ruler',
    room: 'MEASURES',
    text: 'The first centimetre has broken away. To measure anything, the owner starts at two and subtracts. A damaged tool has become a small exercise in attention.',
    material: 'Beech / workshop collection',
  },
  {
    name: 'A kitchen timer',
    room: 'INTERVALS',
    text: 'Its bell no longer rings. The rotating hand still describes an interval, leaving the person cooking to decide how often to look.',
    material: 'Steel and enamel / kitchen collection',
  },
  {
    name: 'Two tied keys',
    room: 'JOINTS',
    text: 'A red thread joins keys from two different homes. Neither lock survives, but the thread continues to make an argument about belonging.',
    material: 'Brass and cotton / personal collection',
  },
  {
    name: 'A repaired hinge',
    room: 'MOVEMENTS',
    text: 'One leaf is older than the other. The hinge connects two histories of use and makes them move as though they had always belonged together.',
    material: 'Iron / building collection',
  },
];
function open(i: number) {
  selected.value = i;
  wing.value = Math.floor(i / 2);
  go('object');
}
function keep() {
  if (!saved.value.includes(selected.value)) saved.value.push(selected.value);
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>

    <header>
      <strong>ROOM WITHIN</strong>
      <nav aria-label="Ancestry">
        <button
          @click="
            wing = -1;
            go('start');
          "
        >
          Museum</button
        ><span v-if="wing >= 0">/</span
        ><button v-if="wing >= 0" @click="go('start')">{{ wings[wing].name }}</button
        ><span v-if="state === 'object'">/ {{ objects[selected].name }}</span>
      </nav>
      <button @click="go('collection')">Cabinet ({{ saved.length }})</button>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><div v-if="wing < 0" class="museum">
          <section class="threshold">
            <span>A MUSEUM OF ORDINARY THINGS</span>
            <h1>There is<br />always<br />another<br />room.</h1>
            <p>Enter a surface.<br />Find what it contains.</p>
            <b aria-hidden="true">↘</b>
          </section>
          <div class="wings">
            <button
              v-for="(w, i) in wings"
              :key="w.name"
              :style="{ background: w.color, color: w.ink }"
              @click="wing = i"
            >
              <small>WING 0{{ i + 1 }} / TWO ROOMS</small><span>{{ w.name }}</span>
              <div class="nested" aria-hidden="true">
                <i
                  ><i><i></i></i
                ></i>
              </div>
              <b>Enter ↗</b>
            </button>
          </div>
        </div>
        <div v-else class="wing" :style="{ background: wings[wing].color, color: wings[wing].ink }">
          <div class="wing-title">
            <small>WING 0{{ wing + 1 }}</small>
            <h1>{{ wings[wing].name }}</h1>
            <button @click="wing = -1">↑ One level out</button>
          </div>
          <div class="rooms">
            <button v-for="i in wings[wing].ids" :key="i" @click="open(i)">
              <small>{{ objects[i].room }}</small
              ><span>{{ objects[i].name }}</span>
              <div class="nested" aria-hidden="true">
                <i
                  ><i><i></i></i
                ></i>
              </div>
              <p>{{ objects[i].material }}</p>
              <b>Enter object ↗</b>
            </button>
          </div>
        </div>
        <details class="index">
          <summary>Complete object index</summary>
          <button v-for="(o, i) in objects" :key="o.name" @click="open(i)">
            {{ o.room }} / {{ o.name }}
          </button>
        </details></template
      >
      <article
        v-else-if="state === 'object'"
        class="object-record"
        :style="{
          background: wings[wing < 0 ? 0 : wing].color,
          color: wings[wing < 0 ? 0 : wing].ink,
        }"
      >
        <div class="record-frame">
          <span>OBJECT 0{{ selected + 1 }} / {{ objects[selected].room }}</span>
          <h1>{{ objects[selected].name }}</h1>
          <div class="object-geometry" aria-hidden="true">
            <i
              ><i><i></i></i
            ></i>
          </div>
          <p class="lead">{{ objects[selected].text }}</p>
          <small>{{ objects[selected].material }}</small>
          <p class="note">
            An original fictional object record. The small histories of use are part of the
            collection, not a claim of museum provenance.
          </p>
          <button @click="keep">
            {{
              saved.includes(selected) ? 'Kept in your cabinet ✓' : 'Keep in your cabinet'
            }}</button
          ><button @click="open((selected + 1) % 6)">Next object →</button
          ><button @click="go('start')">↑ Back to the wing</button>
        </div>
      </article>
      <section v-else class="cabinet">
        <h1>Your room<br />within the museum.</h1>
        <p>Objects kept on this browser. Each retains its place in the larger collection.</p>
        <div class="cabinet-objects">
          <button
            v-for="i in saved"
            :key="i"
            @click="open(i)"
            :style="{
              background: wings[Math.floor(i / 2)].color,
              color: wings[Math.floor(i / 2)].ink,
            }"
          >
            {{ objects[i].name }} ↗
          </button>
        </div>
        <p v-if="!saved.length">The cabinet is empty. Enter a wing to find your first object.</p>
        <button
          @click="
            wing = -1;
            go('start');
          "
        >
          Enter the museum</button
        ><button @click="saved = []">Clear cabinet</button>
      </section>
    </main>
    <footer>ROOM WITHIN / SIX ORDINARY OBJECTS / AN IMAGINED MUSEUM</footer>
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
  padding: 18px 3%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background: #f1e8d5;
  color: #233a39;
  font-size: 11px;
}
header strong {
  font: 20px var(--heading);
  letter-spacing: -0.04em;
}
header nav {
  align-items: center;
  gap: 8px;
}
button {
  border: 0;
  background: transparent;
  padding: 10px 12px;
}
header button {
  border-bottom: 1px solid;
}
.museum {
  display: grid;
  grid-template-columns: minmax(0, 43%) minmax(0, 57%);
  min-height: 830px;
}
.threshold {
  background: #233a39;
  color: #f1e8d5;
  padding: 45px 9%;
  position: relative;
}
.threshold > span {
  font-size: 10px;
  letter-spacing: 0.1em;
}
.threshold h1 {
  font: clamp(50px, 7.2vw, 100px)/1.02 var(--heading);
  letter-spacing: -0.065em;
  margin: 40px 0;
}
.threshold p {
  font-size: 18px;
  line-height: 1.8;
}
.threshold > b {
  position: absolute;
  bottom: 30px;
  right: 40px;
  font: 110px var(--heading);
}
.wings {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  grid-template-rows: 1fr 1.1fr;
}
.wings > button {
  text-align: left;
  padding: 35px;
  position: relative;
  overflow: hidden;
}
.wings > button:first-child {
  grid-column: 1/-1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}
.wings > button:first-child small {
  grid-column: 1/-1;
}
.wings > button > span {
  font: clamp(30px, 4.2vw, 60px)/1.05 var(--heading);
  letter-spacing: -0.04em;
  display: block;
}
.wings small,
.wing small {
  font-size: 10px;
  display: block;
  margin-bottom: 25px;
}
.wings b {
  display: block;
  font-size: 12px;
  margin-top: 25px;
}
.nested {
  height: 110px;
  display: grid;
  place-items: center;
  margin: 20px 0;
}
.nested i {
  display: block;
  border: 2px solid;
  width: 85%;
  height: 75%;
  padding: 10%;
  transform: rotate(7deg);
}
.nested i i {
  transform: rotate(-18deg);
  width: 100%;
  height: 100%;
  padding: 10%;
}
.nested i i i {
  transform: rotate(24deg);
}
.wing {
  padding: 35px 5%;
  min-height: 830px;
}
.wing-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}
.wing h1 {
  font: clamp(45px, 6vw, 80px)/1 var(--heading);
  max-width: 600px;
}
.wing-title button {
  border-bottom: 1px solid;
}
.rooms {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 25px;
}
.rooms > button {
  border: 3px solid;
  padding: 35px;
  text-align: left;
  min-height: 520px;
}
.rooms > button > span {
  font: clamp(35px, 4vw, 60px)/1.1 var(--heading);
  display: block;
}
.rooms .nested {
  height: 200px;
}
.rooms p {
  font-size: 11px;
}
.rooms b {
  font-size: 12px;
}
.index {
  background: #f1e8d5;
  padding: 25px 3%;
  font-size: 12px;
}
.index button {
  display: block;
  border-bottom: 1px solid;
}
.object-record {
  padding: 40px 5%;
}
.record-frame {
  border: 3px solid;
  padding: 45px;
  min-height: 800px;
  position: relative;
}
.record-frame > span {
  font-size: 11px;
}
.record-frame h1 {
  font: clamp(45px, 6vw, 90px)/1.05 var(--heading);
  margin: 30px 0;
}
.lead {
  font: 27px/1.7 var(--heading);
  max-width: 35ch;
}
.object-geometry {
  float: right;
  width: 35%;
  height: 300px;
  display: grid;
  place-items: center;
}
.object-geometry i {
  display: block;
  border: 4px solid;
  border-radius: 40%;
  width: 85%;
  height: 85%;
  padding: 10%;
  transform: rotate(20deg);
}
.object-geometry i i {
  width: 100%;
  height: 100%;
  transform: rotate(30deg);
}
.note {
  font-size: 12px;
  line-height: 1.8;
  margin-top: 35px;
  max-width: 500px;
}
.record-frame button {
  border: 1px solid;
  margin: 20px 15px 0 0;
}
.cabinet {
  padding: 45px 7%;
  min-height: 80vh;
  background: #f1e8d5;
}
.cabinet h1 {
  font: clamp(45px, 6vw, 85px)/1.05 var(--heading);
}
.cabinet-objects {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin: 35px 0;
}
.cabinet-objects button {
  min-height: 150px;
  flex: 1;
  font: 28px var(--heading);
  min-width: 200px;
}
.cabinet > button {
  border: 1px solid;
  margin-right: 20px;
}
footer {
  background: #233a39;
  color: #f1e8d5;
  padding: 20px 3%;
  font-size: 9px;
}
@media (max-width: 700px) {
  header {
    flex-wrap: wrap;
    gap: 10px;
  }
  header nav {
    order: 3;
    width: 100%;
    font-size: 10px;
  }
  .museum {
    grid-template-columns: 1fr;
    min-height: 0;
  }
  .threshold {
    padding: 30px 6%;
  }
  .threshold h1 {
    font-size: 58px;
    margin: 25px 0;
  }
  .threshold p {
    font-size: 14px;
  }
  .threshold > b {
    font-size: 75px;
  }
  .wings > button {
    padding: 25px 20px;
    min-height: 290px;
  }
  .wings > button > span {
    font-size: 35px;
  }
  .wings > button:first-child {
    min-height: 260px;
  }
  .wings small {
    font-size: 8px;
  }
  .wing {
    min-height: 0;
    padding: 30px 5%;
  }
  .wing-title {
    display: block;
  }
  .rooms {
    grid-template-columns: 1fr;
    margin-top: 25px;
  }
  .rooms > button {
    min-height: 380px;
    padding: 25px;
  }
  .rooms .nested {
    height: 140px;
  }
  .record-frame {
    padding: 25px;
    min-height: 0;
  }
  .object-geometry {
    float: none;
    width: 100%;
    height: 220px;
    margin: 25px 0;
  }
  .lead {
    font-size: 23px;
  }
  .cabinet {
    padding: 30px 5%;
  }
  .cabinet > button {
    margin-bottom: 15px;
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
