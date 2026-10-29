<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const open = ref(state.value === 'performance'),
  act = ref(0),
  name = ref(''),
  reserved = ref(false),
  error = ref('');
const acts = [
  {
    title: 'The visitor',
    line: 'A person arrives carrying an empty frame. They place it on the floor and wait for the room to decide what belongs inside.',
    note: 'The frame is made from four strips of card. Its shadow is deliberately larger than the object, allowing the stage to suggest a room without building one.',
    cast: 'The visitor / performed by a paper silhouette',
  },
  {
    title: 'The room answers',
    line: 'A second figure moves the frame by the width of a hand. The first figure sits down. A boundary has become an invitation.',
    note: 'The movement is a single discrete change of position. The audience can advance at its own pace; the meaning comes from the relation between two states.',
    cast: 'The room keeper / performed by a folded shape',
  },
  {
    title: 'An open ending',
    line: 'Both figures leave the frame where it is. The light remains. The next person to arrive will find a space already made for them.',
    note: 'The final scene keeps the stage illuminated. An ending does not have to erase the place where the story happened; it can make that place available.',
    cast: 'The light / performed by an ordinary circle',
  },
];
function reserve() {
  if (!name.value.trim()) {
    error.value = 'Enter a name for the sample programme.';
    return;
  }
  error.value = '';
  reserved.value = true;
}
</script>
<template>
  <div class="specimen" :class="{ entry: state === 'start' || state === 'performance' }">
    <a class="skip" href="#content">Skip to content</a>

    <header>
      <strong>THE SMALL THEATRE</strong><span>A PERFORMANCE FOR THE BROWSER</span
      ><button @click="go('programme')">The programme ↗</button>
    </header>
    <main id="content">
      <template v-if="state === 'start' || state === 'performance'"
        ><div class="proscenium">
          <div class="marquee" :class="{ quiet: open }">
            <span>TONIGHT, AT YOUR OWN PACE</span>
            <h1><span>A room</span><em>for the</em><span>next person.</span></h1>
          </div>
          <div class="stage">
            <div class="spotlight" aria-hidden="true"></div>
            <div class="set" aria-hidden="true">
              <div
                class="frame"
                :style="{ transform: 'translateX(' + (act === 1 ? 35 : 0) + 'px)' }"
              ></div>
              <i v-if="act < 2" class="visitor"></i><i v-if="act === 1" class="keeper"></i>
              <div class="floor"></div>
            </div>
            <div class="curtain left" :class="{ opened: open }" aria-hidden="true"></div>
            <div class="curtain right" :class="{ opened: open }" aria-hidden="true"></div>
            <div class="stage-copy" v-if="open">
              <span>ACT {{ act + 1 }} OF THREE</span>
              <h2>{{ acts[act].title }}</h2>
              <p>{{ acts[act].line }}</p>
            </div>
            <button class="curtain-control" @click="open = !open">
              {{ open ? 'Close the curtain' : 'Open the curtain' }}
            </button>
          </div>
          <div class="footlights" aria-hidden="true"><i v-for="i in 11" :key="i"></i></div>
        </div>
        <nav class="act-controls" aria-label="Acts">
          <button
            v-for="(a, i) in acts"
            :key="a.title"
            :aria-pressed="act === i && open"
            @click="
              act = i;
              open = true;
            "
          >
            0{{ i + 1 }} / {{ a.title }}</button
          ><button @click="go('backstage')">Through the stage door →</button>
        </nav>
        <p class="invitation">
          Three acts, no running time. Open a curtain, enter a scene, and look at how it was made.
        </p></template
      >
      <article v-else-if="state === 'backstage'" class="backstage">
        <button @click="go('start')">← Back through the stage door</button
        ><span>BEHIND ACT 0{{ act + 1 }}</span>
        <h1>The work<br />behind the light.</h1>
        <div class="backstage-note">
          <h2>{{ acts[act].title }}</h2>
          <p>{{ acts[act].note }}</p>
          <dl>
            <dt>Cast</dt>
            <dd>{{ acts[act].cast }}</dd>
            <dt>Materials</dt>
            <dd>Original CSS scenery, paper-like silhouettes, authored text</dd>
            <dt>Timing</dt>
            <dd>Controlled entirely by the reader</dd>
          </dl>
        </div>
        <nav>
          <button v-for="(a, i) in acts" :key="a.title" @click="act = i">
            Notes for act {{ i + 1 }}
          </button>
        </nav>
        <button @click="go('programme')">Keep a sample programme</button>
      </article>
      <section v-else class="programme">
        <h1>{{ reserved ? 'A place in the programme.' : 'An evening, folded to keep.' }}</h1>
        <div class="programme-sheet">
          <span>THE SMALL THEATRE / PROGRAMME 001</span>
          <h2>A room for<br />the next person.</h2>
          <ol>
            <li v-for="(a, i) in acts" :key="a.title">
              <button
                @click="
                  act = i;
                  open = true;
                  go('start');
                "
              >
                Act {{ i + 1 }} / {{ a.title }}
              </button>
              <p>{{ a.cast }}</p>
            </li>
          </ol>
          <form v-if="!reserved" @submit.prevent="reserve">
            <label
              >Name on your sample programme<input v-model="name" autocomplete="off" maxlength="80"
            /></label>
            <p v-if="error" role="alert">{{ error }}</p>
            <button type="submit">Reserve sample programme</button
            ><small>A local demonstration. No ticket, payment or message is sent.</small>
          </form>
          <div v-else role="status">
            <h3>Reserved for {{ name }}</h3>
            <p>
              Your fictional programme is ready in this open page. Admission is an act of attention.
            </p>
            <button @click="reserved = false">Change the name</button>
          </div>
        </div>
        <button @click="go('start')">Return to the theatre</button>
      </section>
    </main>
    <footer>
      THE SMALL THEATRE / Original fiction and scenery / The audience controls the pace.
    </footer>
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
  padding: 24px 4%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid #edb39b;
}
header strong {
  font: 22px var(--heading);
  letter-spacing: -0.04em;
}
header span {
  font-size: 9px;
}
button {
  background: transparent;
  border: 1px solid;
  padding: 10px 16px;
}
header button {
  font-size: 11px;
}
.proscenium {
  margin: 25px 4% 0;
  border: 2px solid #e9bd65;
  padding: 15px 18px 0;
  background: #86261f;
  box-shadow: inset 0 0 0 5px #bf3327;
}
.marquee {
  text-align: center;
  padding: 20px 10px 25px;
  background: #9c2e24;
}
.marquee > span {
  font-size: 9px;
  letter-spacing: 0.2em;
}
.marquee h1 {
  font: clamp(35px, 4.7vw, 64px)/1.15 var(--heading);
  letter-spacing: -0.05em;
  margin: 17px 0 0;
}
.stage {
  height: 470px;
  background: #141b1b;
  position: relative;
  overflow: hidden;
}
.spotlight {
  position: absolute;
  left: 30%;
  top: -30%;
  width: 65%;
  height: 150%;
  border-radius: 50%;
  background: radial-gradient(ellipse, #d6bb6d55, transparent 65%);
  transform: rotate(25deg);
}
.set {
  position: absolute;
  left: 8%;
  right: 8%;
  top: 0;
  bottom: 0;
}
.floor {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 75px;
  background: repeating-linear-gradient(90deg, #a87c47 0 1px, #4d3b2c 1px 70px);
  transform: perspective(250px) rotateX(35deg);
  transform-origin: bottom;
}
.frame {
  position: absolute;
  left: 47%;
  bottom: 70px;
  width: 175px;
  height: 195px;
  border: 12px solid #d9b471;
  box-shadow: 20px 15px 0 #0005;
  transition: transform 0.5s;
}
.visitor {
  position: absolute;
  left: 30%;
  bottom: 65px;
  width: 65px;
  height: 170px;
  background: #cf9eb4;
  border-radius: 50% 50% 10% 10%;
  transform: rotate(-5deg);
}
.visitor:before,
.keeper:before {
  content: '';
  position: absolute;
  left: 10px;
  top: -35px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: inherit;
}
.keeper {
  position: absolute;
  left: 72%;
  bottom: 65px;
  width: 65px;
  height: 150px;
  background: #84a99d;
  border-radius: 50% 50% 5% 5%;
  transform: rotate(7deg);
}
.curtain {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 51%;
  background: repeating-linear-gradient(90deg, #97261e 0 20px, #ca4633 30px, #a12d24 50px);
  z-index: 2;
  transition: transform 0.8s;
  box-shadow: 10px 0 25px #0008;
}
.curtain.left {
  left: 0;
}
.curtain.right {
  right: 0;
  box-shadow: -10px 0 25px #0008;
}
.curtain.left.opened {
  transform: translateX(-88%);
}
.curtain.right.opened {
  transform: translateX(88%);
}
.curtain-control {
  position: absolute;
  z-index: 3;
  left: 50%;
  bottom: 18px;
  transform: translateX(-50%);
  background: #f1dfba;
  color: #4f251e;
  border-color: #d4b169;
  white-space: nowrap;
  font-size: 11px;
}
.stage-copy {
  position: absolute;
  left: 8%;
  top: 25px;
  max-width: 330px;
  z-index: 1;
  background: #141b1beb;
  padding: 15px 20px;
  color: #fff0d2;
}
.stage-copy > span {
  font-size: 9px;
  color: #e9bd65;
}
.stage-copy h2 {
  font: 25px var(--heading);
  margin: 10px 0;
}
.stage-copy p {
  font-size: 13px;
  line-height: 1.8;
  margin: 0;
}
.footlights {
  display: flex;
  justify-content: space-around;
  padding: 16px;
}
.footlights i {
  width: 9px;
  height: 9px;
  background: #e9bd65;
  border-radius: 50%;
}
.act-controls {
  padding: 25px 4%;
  gap: 15px;
  justify-content: center;
  font-size: 11px;
}
.act-controls button[aria-pressed='true'] {
  background: #fff0d2;
  color: #86261f;
}
.invitation {
  margin: 0 auto;
  padding: 10px 5% 35px;
  text-align: center;
  font-size: 13px;
  line-height: 1.8;
}
.backstage {
  background: #242e2c;
  color: #f3e5ca;
  padding: 40px 7% 70px;
  min-height: 85vh;
}
.backstage > span {
  display: block;
  color: #e9bd65;
  font-size: 10px;
  margin-top: 35px;
}
.backstage h1,
.programme h1 {
  font: clamp(42px, 6vw, 80px)/1.12 var(--heading);
  letter-spacing: -0.05em;
  margin: 25px 0;
}
.backstage-note {
  max-width: 850px;
  border: 1px dashed #9caa9d;
  padding: 35px;
  margin: 35px 0;
}
.backstage-note h2 {
  font: 30px var(--heading);
}
.backstage-note > p {
  font: 25px/1.8 var(--heading);
}
dl {
  font-size: 12px;
  line-height: 1.8;
}
dt {
  color: #e9bd65;
  margin-top: 20px;
}
dd {
  margin: 5px 0;
}
.backstage nav {
  margin: 30px 0;
  font-size: 11px;
}
.programme {
  padding: 40px 7% 70px;
}
.programme-sheet {
  background: #f1dfba;
  color: #4f251e;
  padding: 40px;
  max-width: 800px;
  margin: 40px auto;
  transform: rotate(-1deg);
}
.programme-sheet > span {
  font-size: 10px;
}
.programme-sheet h2 {
  font: 44px/1.1 var(--heading);
  margin: 30px 0;
}
.programme-sheet ol {
  padding-left: 20px;
}
.programme-sheet li {
  padding: 15px 0;
}
.programme-sheet li p {
  font-size: 12px;
  margin: 12px 0;
}
.programme-sheet li button {
  text-align: left;
  border: 0;
  border-bottom: 1px solid;
  padding-left: 0;
}
.programme form {
  border-top: 1px solid;
  margin-top: 30px;
  padding-top: 25px;
}
.programme label {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 12px;
}
.programme input {
  background: transparent;
  border: 1px solid;
  padding: 10px;
}
.programme form button {
  margin-top: 20px;
}
.programme form small {
  display: block;
  font-size: 10px;
  margin-top: 20px;
}
footer {
  padding: 22px 4%;
  font-size: 9px;
  border-top: 1px solid #edb39b;
}
@media (max-width: 700px) {
  header {
    flex-wrap: wrap;
  }
  .proscenium {
    padding: 8px 8px 0;
    margin: 20px 3% 0;
  }
  .marquee {
    padding: 18px 10px;
  }
  .marquee h1 {
    font-size: 36px;
  }
  .marquee > span {
    font-size: 8px;
  }
  .stage {
    height: 480px;
  }
  .stage-copy {
    left: 9%;
    right: 9%;
    top: 12px;
    padding: 12px;
    max-width: none;
  }
  .stage-copy h2 {
    font-size: 23px;
  }
  .stage-copy p {
    font-size: 12px;
  }
  .frame {
    left: 40%;
    width: 110px;
    height: 130px;
    bottom: 80px;
    border-width: 8px;
  }
  .visitor {
    left: 20%;
    height: 120px;
    width: 45px;
    bottom: 75px;
  }
  .keeper {
    left: 78%;
    height: 100px;
    width: 40px;
    bottom: 75px;
  }
  .visitor:before,
  .keeper:before {
    width: 30px;
    height: 30px;
    left: 7px;
    top: -22px;
  }
  .act-controls {
    justify-content: flex-start;
    gap: 10px;
  }
  .act-controls button {
    font-size: 10px;
    padding: 9px;
  }
  .backstage,
  .programme {
    padding: 30px 5%;
  }
  .backstage-note {
    padding: 23px;
  }
  .backstage-note > p {
    font-size: 21px;
  }
  .programme-sheet {
    padding: 25px;
    transform: none;
  }
  .programme-sheet h2 {
    font-size: 35px;
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
  background: #4d120f;
}
.entry header {
  position: absolute;
  z-index: 5;
  left: 25px;
  right: 25px;
  top: 24px;
  padding: 0;
  border: 0;
  align-items: flex-start;
}
.entry header strong {
  font-size: 12px;
  letter-spacing: 0.12em;
  max-width: 110px;
  line-height: 1.4;
}
.entry header > span {
  display: none;
}
.entry header button {
  background: #f1dfba;
  color: #4f251e;
  border: 0;
  padding: 15px 20px;
  transform: rotate(7deg);
  font-size: 11px;
}
.entry .proscenium {
  position: relative;
  margin: 0;
  border: 0;
  padding: 0;
  background: #4d120f;
}
.entry .stage {
  height: calc(100svh - 35px);
  min-height: 780px;
  margin: 0;
  overflow: hidden;
  border: 0;
}
.entry .marquee {
  position: absolute;
  inset: 16% 12% auto;
  z-index: 3;
  pointer-events: none;
  background: transparent;
  padding: 0;
  text-align: center;
}
.entry .marquee > span {
  font-size: 10px;
  letter-spacing: 0.3em;
}
.entry .marquee h1 {
  font-size: clamp(60px, 9.5vw, 145px);
  line-height: 1.02;
  letter-spacing: -0.06em;
  margin: 40px 0 0;
}
.entry .marquee h1 span,
.entry .marquee h1 em {
  display: block;
}
.entry .marquee h1 em {
  font-size: 0.42em;
  font-weight: 400;
  line-height: 1.6;
}
.entry .marquee.quiet {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip-path: inset(50%) !important;
  white-space: nowrap !important;
}
.entry .curtain {
  background: repeating-linear-gradient(90deg, #5c1715 0 25px, #be3c2e 42px, #8c241c 70px);
}
.entry .curtain-control {
  left: auto;
  right: 5%;
  bottom: 10%;
  transform: rotate(-8deg);
  width: 110px;
  height: 110px;
  white-space: normal;
  border: 5px double #8e6b3e;
  border-radius: 50%;
  font-size: 14px;
  font-family: var(--heading);
}
.entry .curtain-control:before {
  content: '';
  position: absolute;
  bottom: 100%;
  height: 60svh;
  width: 2px;
  left: 50%;
  background: #e9bd65;
}
.entry .stage-copy {
  top: 15%;
  left: 13%;
  max-width: 430px;
  padding: 30px;
}
.entry .stage-copy h2 {
  font-size: 45px;
}
.entry .stage-copy p {
  font-size: 17px;
}
.entry .set .frame {
  width: 240px;
  height: 320px;
  bottom: 100px;
}
.entry .visitor {
  height: 230px;
  bottom: 95px;
}
.entry .keeper {
  height: 210px;
  bottom: 95px;
}
.entry .floor {
  height: 110px;
}
.entry .footlights {
  height: 35px;
  padding: 12px 8%;
  background: #4d120f;
}
.entry .act-controls {
  background: #4d120f;
  padding: 25px 5%;
}
.entry .invitation {
  background: #4d120f;
}
.entry footer {
  background: #4d120f;
}
@media (max-width: 750px) {
  .entry header {
    left: 20px;
    right: 20px;
    top: 22px;
  }
  .entry header strong {
    font-size: 9px;
    max-width: 95px;
  }
  .entry header button {
    font-size: 9px;
    padding: 12px;
  }
  .entry .stage {
    min-height: 720px;
    height: calc(100svh - 35px);
  }
  .entry .marquee {
    inset: 20% 7% auto;
  }
  .entry .marquee > span {
    font-size: 8px;
    letter-spacing: 0.15em;
  }
  .entry .marquee h1 {
    font-size: 15vw;
    line-height: 1.1;
    margin-top: 35px;
  }
  .entry .curtain-control {
    width: 90px;
    height: 90px;
    bottom: 8%;
    right: 8%;
    font-size: 12px;
  }
  .entry .curtain-control:before {
    height: 70px;
  }
  .entry .stage-copy {
    top: 18%;
    left: 10%;
    right: 10%;
    max-width: none;
    padding: 20px;
  }
  .entry .stage-copy h2 {
    font-size: 30px;
  }
  .entry .stage-copy p {
    font-size: 14px;
  }
  .entry .set .frame {
    left: 42%;
    width: 140px;
    height: 230px;
  }
  .entry .visitor {
    left: 20%;
    height: 170px;
  }
  .entry .keeper {
    left: 73%;
    height: 150px;
  }
  .entry .act-controls {
    gap: 10px;
    font-size: 10px;
  }
}
</style>
