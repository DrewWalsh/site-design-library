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
    .filter((k) => k.startsWith('design-library:32:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const kits = ['Paper Playground', 'Print Party', 'Tiny Sculpture Club'];
const chosen = ref('Paper Playground'),
  extra = ref('Sticker sheet');
const incompatible = computed(
  () => chosen.value === 'Tiny Sculpture Club' && extra.value === 'Watercolour refill',
);
</script>
<template>
  <div class="specimen" :class="{ entry: state === 'start' }">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>odd objects<br /><span>CLUB ✷</span></strong>
      <nav>
        <a href="#kits">This month’s kits</a><button @click="go('gallery')">Made by members</button
        ><button @click="go('bundle')">Build a bundle ↗</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><h1 class="sr">Odd Objects Club: choose a creative kit</h1>
        <span class="club-stamp" aria-hidden="true">ODD<br />IS GOOD ✷</span>
        <section id="kits" class="kits">
          <h2 class="sr">This month’s three kits</h2>
          <div>
            <article v-for="(kit, i) in kits" :key="kit" :class="'kit k' + i">
              <div :class="'collection-shape shape-' + i" aria-hidden="true">
                <i></i><b></b><em></em>
              </div>
              <span>0{{ i + 1 }} / SMALL EXPERIMENTS</span>
              <h3>{{ kit }}</h3>
              <p>
                {{
                  [
                    'Fold it. Cut it. Give it a different shape.',
                    'Make a mark, make another, see what happens.',
                    'A handful of clay. A world of possibilities.',
                  ][i]
                }}
              </p>
              <ul>
                <li>
                  {{
                    [
                      'Coloured papers & folding guide',
                      'Print blocks & water-based ink',
                      'Air-dry clay & shaping tools',
                    ][i]
                  }}
                </li>
                <li>Three activities to get you going</li>
                <li>Room to make it your own</li>
              </ul>
              <button
                @click="
                  chosen = kit;
                  go('bundle');
                "
              >
                Choose this kit ↗
              </button>
            </article>
          </div>
        </section>
        <section class="clubnote">
          <span>✷</span>
          <h2>Good ideas don’t<br />arrive fully formed.</h2>
          <p>
            They start with a scrap, a colour, a question. We supply the materials. You supply the
            what-if.
          </p>
        </section></template
      >
      <section v-else-if="state === 'bundle'" class="builder">
        <span class="tag">YOUR NEXT CREATIVE AFTERNOON</span>
        <h1>A box of<br />possibilities.</h1>
        <div>
          <form
            @submit.prevent="
              message = incompatible
                ? 'Choose a compatible extra.'
                : 'Sample bundle complete. No order or payment was made.'
            "
          >
            <label
              >Your kit<select v-model="chosen">
                <option v-for="kit in kits">{{ kit }}</option>
              </select></label
            ><label
              >Add a little extra<select v-model="extra">
                <option>Sticker sheet</option>
                <option>Watercolour refill</option>
                <option>Extra paper pack</option>
              </select></label
            >
            <p v-if="incompatible" role="alert">
              Watercolour refill doesn’t work with the clay kit. Try stickers or extra paper.
            </p>
            <button :disabled="incompatible">Make my sample bundle →</button>
          </form>
          <aside>
            <p class="eyebrow">THE LINE-UP</p>
            <h2>{{ chosen }}</h2>
            <p>+ {{ extra }}</p>
            <p>Sample total: £28<br />Materials, activities, and a little room to improvise.</p>
            <p v-if="message" role="status">{{ message }}</p>
          </aside>
        </div>
      </section>
      <section v-else class="member-gallery">
        <span class="tag">LOOK WHAT HAPPENED.</span>
        <h1>Made up.<br />Made by you.</h1>
        <div class="memberworks">
          <article
            v-for="(label, i) in [
              'Folded neighbourhood',
              'A very loud print',
              'Small peculiar creatures',
            ]"
            :key="label"
          >
            <div :class="'work work' + i">
              <i v-for="n in 5" :key="n" :style="{ transform: 'rotate(' + n * 18 + 'deg)' }"></i>
            </div>
            <h2>{{ label }}</h2>
            <p>Fictional member study / {{ kits[i] }}</p>
          </article>
        </div>
        <button @click="go('bundle')">Try a kit yourself →</button>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Odd Objects Club · Fictional sample content · Design reference 32</span
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
  background: #332a44;
  color: #fff0dd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 5%;
  gap: 25px;
}
header strong {
  font: 24px/1 'Space Grotesk';
  font-weight: 700;
}
header strong span {
  font-size: 14px;
  letter-spacing: 0.14em;
}
nav {
  display: flex;
  align-items: center;
  gap: 30px;
  font-size: 11px;
}
nav button {
  color: #fff0dd;
  background: none;
  border: 0;
  font-size: 11px;
}
main {
  max-width: 1500px;
  margin: auto;
  padding: 0 5%;
}
.hello {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 60px;
  padding: 65px 0;
  min-height: 650px;
}
.tag {
  font-size: 10px;
  border: 2px solid;
  padding: 8px 12px;
  display: inline-block;
  background: #c7dfcd;
  transform: rotate(-2deg);
}
.headline h1 {
  font-size: 77px;
  line-height: 1.04;
  letter-spacing: -0.05em;
  margin: 30px 0;
}
.headline em {
  font-style: normal;
  background: #efb7a0;
  display: inline-block;
  transform: rotate(-3deg);
  padding: 0 8px;
}
.headline p {
  font-size: 14px;
}
.headline button,
.builder button,
.member-gallery > button {
  border: 2px solid #332a44;
  box-shadow: 4px 4px #332a44;
  padding: 15px 25px;
  background: #c6b9e3;
  font-size: 12px;
  margin-top: 20px;
}
.kit-art {
  position: relative;
  overflow: hidden;
  min-height: 480px;
  background: radial-gradient(#332a44 1px, transparent 1px);
  background-size: 12px 12px;
}
.blob {
  position: absolute;
  width: 250px;
  height: 330px;
  border-radius: 50% 50% 15% 50%;
  background: #bcdcc6;
  right: -10px;
  top: 100px;
  transform: rotate(25deg);
  border: 2px solid;
}
.paper {
  position: absolute;
  top: 35px;
  left: 15%;
  width: 250px;
  height: 330px;
  background: #cbbbe9;
  border: 3px solid;
  transform: rotate(7deg);
  padding: 30px;
  box-shadow: 8px 8px #332a44;
}
.paper b {
  font: 65px/0.95 'Space Grotesk';
  font-weight: 700;
  letter-spacing: -0.05em;
}
.paper span {
  font-size: 8px;
  display: block;
  margin-top: 35px;
}
.sticker {
  position: absolute;
  bottom: 20px;
  left: 0;
  background: #eeb59e;
  border: 2px solid;
  padding: 25px;
  border-radius: 50%;
  font: 20px/1.15 'Space Grotesk';
  font-weight: 600;
  transform: rotate(-10deg);
}
.squiggle {
  position: absolute;
  right: 0;
  bottom: 10px;
  font-size: 70px;
  transform: rotate(-20deg);
}
.kits {
  padding: 35px 0 60px;
}
.kits > h2 {
  font-size: 38px;
}
.kits > div {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  align-items: start;
}
.kit {
  border: 2px solid;
  padding: 30px;
  background: #e9b7a3;
  box-shadow: 5px 5px #332a44;
}
.kit.k1 {
  background: #c7e0d0;
  margin-top: 45px;
  border-radius: 45px 0 0 0;
}
.kit.k2 {
  background: #cfc2e8;
  margin-top: 15px;
  border-radius: 0 0 45px 0;
}
.kit > span {
  font-size: 8px;
  letter-spacing: 0.1em;
}
.kit h3 {
  font: 32px/1.1 'Space Grotesk';
}
.kit p,
.kit li {
  font-size: 12px;
  line-height: 1.9;
}
.kit ul {
  padding-left: 18px;
}
.kit button {
  font-size: 11px;
  border: 2px solid;
  background: #fff3e4;
  margin-top: 20px;
}
.clubnote {
  text-align: center;
  padding: 50px 0 75px;
}
.clubnote > span {
  font-size: 65px;
}
.clubnote h2 {
  font-size: 42px;
  line-height: 1.2;
}
.clubnote p {
  margin: auto;
  font-size: 14px;
  max-width: 500px;
}
.builder,
.member-gallery {
  padding: 65px 0 100px;
}
.builder h1,
.member-gallery h1 {
  font-size: 75px;
}
.builder > div {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
}
.builder form {
  display: grid;
  gap: 25px;
}
.builder label {
  font-size: 13px;
}
.builder select {
  border: 2px solid;
  background: #fff9ef;
}
.builder aside {
  padding: 35px;
  background: #c7dfcd;
  border: 2px solid;
  transform: rotate(1deg);
}
.builder aside h2 {
  font-size: 35px;
}
.builder aside p {
  font-size: 14px;
}
.memberworks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}
.memberworks h2 {
  font-size: 24px;
}
.memberworks p {
  font-size: 11px;
}
.work {
  height: 250px;
  background: #c6dec9;
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.work i {
  display: block;
  width: 50px;
  height: 140px;
  background: #e9b7a3;
  border: 2px solid;
  margin: -10px;
}
.work1 {
  background: #d3c1ed;
}
.work1 i {
  background: #332a44;
  border-radius: 50%;
}
.work2 {
  background: #efbda7;
}
.work2 i {
  background: #c7dfcd;
  border-radius: 35px 35px 0 0;
}
@media (max-width: 650px) {
  header {
    padding: 20px;
  }
  header strong {
    font-size: 20px;
  }
  nav {
    gap: 12px;
    flex-wrap: wrap;
    justify-content: end;
  }
  nav a,
  nav button {
    font-size: 9px;
  }
  .hello {
    grid-template-columns: 1fr;
    gap: 35px;
    padding: 40px 0;
  }
  .headline h1 {
    font-size: 57px;
  }
  .kit-art {
    min-height: 400px;
    max-width: 360px;
    width: 100%;
    margin: auto;
  }
  .paper {
    width: 220px;
    height: 290px;
    left: 15%;
    padding: 25px;
  }
  .paper b {
    font-size: 55px;
  }
  .blob {
    width: 200px;
    height: 270px;
    right: 0;
  }
  .sticker {
    font-size: 17px;
    padding: 20px;
  }
  .kits > div {
    display: block;
  }
  .kit,
  .kit.k1,
  .kit.k2 {
    margin: 25px 0;
    padding: 27px;
  }
  .kits > h2,
  .clubnote h2 {
    font-size: 32px;
  }
  .builder h1,
  .member-gallery h1 {
    font-size: 55px;
  }
  .builder > div,
  .memberworks {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .builder aside {
    transform: none;
  }
}

.kits > div {
  grid-template-columns: 1.05fr 1fr;
  gap: 35px;
  align-items: stretch;
}
.kit {
  position: relative;
  border: 0;
  box-shadow: none;
  background: #eebaa5;
  padding: 35px;
  overflow: hidden;
}
.kit.k0 {
  grid-row: span 2;
  border-radius: 160px 160px 12px 12px;
  padding-top: 55px;
}
.kit.k1 {
  margin-top: 0;
  border-radius: 0 90px 0 0;
  background: #c5dfcd;
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 0 25px;
  padding-top: 30px;
}
.kit.k2 {
  margin-top: 0;
  border-radius: 0 0 90px 0;
  background: #d1c2e7;
  display: grid;
  grid-template-columns: 1fr 120px;
  gap: 0 25px;
}
.kit.k1 > .collection-shape {
  grid-row: span 5;
}
.kit.k2 > .collection-shape {
  grid-column: 2;
  grid-row: span 5;
}
.kit.k1 > span,
.kit.k1 > h3,
.kit.k1 > p,
.kit.k1 > ul,
.kit.k1 > button {
  grid-column: 2;
}
.kit.k2 > span,
.kit.k2 > h3,
.kit.k2 > p,
.kit.k2 > ul,
.kit.k2 > button {
  grid-column: 1;
}
.kit h3 {
  font-size: 34px;
  margin: 15px 0;
}
.kit p,
.kit li {
  font-size: 13px;
}
.kit ul {
  padding-left: 20px;
}
.kit button {
  border: 1px solid #332a44;
  box-shadow: none;
  background: #fff7e9;
  padding: 12px 18px;
  font-size: 12px;
  justify-self: start;
}
.collection-shape {
  position: relative;
  height: 160px;
  margin-bottom: 20px;
}
.shape-0 {
  height: 240px;
  margin: 15px 0 30px;
  background: repeating-linear-gradient(45deg, transparent 0 15px, #332a4412 15px 19px);
  border-radius: 50%;
}
.shape-0 i {
  position: absolute;
  width: 120px;
  height: 120px;
  left: 20%;
  top: 30px;
  background: #c3d9ca;
  transform: rotate(25deg);
  border: 2px solid #332a44;
}
.shape-0 b {
  position: absolute;
  width: 100px;
  height: 150px;
  right: 20%;
  top: 65px;
  border-radius: 50% 50% 0 0;
  background: #c9b4e1;
  border: 2px solid #332a44;
  transform: rotate(-20deg);
}
.shape-0 em {
  position: absolute;
  width: 90px;
  height: 90px;
  left: 25%;
  top: 125px;
  border-radius: 50%;
  background: #f5d76a;
  border: 2px solid #332a44;
}
.shape-1 {
  height: 100%;
  min-height: 210px;
  background: radial-gradient(#332a44 2px, transparent 2px);
  background-size: 14px 14px;
}
.shape-1 i {
  position: absolute;
  inset: 25% 10%;
  background: #f6d769;
  border-radius: 70% 30% 50% 30%;
  transform: rotate(15deg);
  border: 2px solid #332a44;
}
.shape-1 b {
  position: absolute;
  left: 25%;
  top: 38%;
  width: 60px;
  height: 60px;
  border: 10px solid #b34a72;
  border-radius: 50%;
}
.shape-2 {
  height: 100%;
  min-height: 210px;
}
.shape-2 i {
  position: absolute;
  left: 15%;
  top: 18%;
  width: 80px;
  height: 150px;
  background: #c8dfcb;
  border-radius: 45% 55% 40% 60%;
  border: 2px solid #332a44;
}
.shape-2 b {
  position: absolute;
  left: 10%;
  top: 42%;
  width: 85px;
  height: 85px;
  background: #efb7a0;
  border-radius: 50%;
  border: 2px solid #332a44;
}
.clubnote {
  border-top: 8px solid transparent;
  border-image: repeating-linear-gradient(
      90deg,
      #332a44 0 14px,
      #eeb59e 14px 28px,
      #c6b9e3 28px 42px
    )
    8;
  padding-top: 55px;
}
.eyebrow {
  font: 600 12px 'Space Grotesk';
  letter-spacing: 0.025em;
  text-transform: none;
}
@media (max-width: 760px) {
  .kits > div {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  .kit.k0 {
    grid-row: auto;
    border-radius: 100px 100px 10px 10px;
    padding: 35px 25px;
  }
  .kit.k1,
  .kit.k2 {
    display: block;
    padding: 30px 25px;
  }
  .shape-0 {
    height: 200px;
  }
  .shape-1,
  .shape-2 {
    height: 180px;
    min-height: 0;
    width: 150px;
    float: right;
    margin: 0 0 15px 15px;
  }
  .kit h3 {
    font-size: 30px;
  }
  .kit button {
    clear: both;
  }
  .kit.k2 {
    border-radius: 0 0 70px 0;
  }
  .shape-2 i {
    height: 120px;
  }
}

/* The entry is the experience itself; supporting routes retain its vocabulary. */

.entry {
  position: relative;
  background: #b4c9ad;
  background-image: radial-gradient(#332a44 1px, transparent 1px);
  background-size: 16px 16px;
}
.entry header {
  max-width: none;
  width: 100%;
  padding: 20px 3%;
  margin: 0;
  border: 0;
  background: #332a44;
  color: #fff0dd;
  align-items: center;
}
.entry header strong {
  font-size: 22px;
  line-height: 0.9;
}
.entry header strong span {
  font-size: 13px;
}
.entry header nav {
  font-size: 12px;
}
.entry header button,
.entry header a {
  color: #fff0dd;
}
.entry main {
  max-width: none;
  width: 100%;
  margin: 0;
  padding: 0;
  position: relative;
}
.entry main > h1,
.entry .kits > h2 {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip-path: inset(50%) !important;
  white-space: nowrap !important;
}
.club-stamp {
  position: absolute;
  right: 31%;
  top: 18px;
  z-index: 4;
  width: 130px;
  height: 130px;
  display: grid;
  place-content: center;
  text-align: center;
  font: 25px/0.95 var(--font-heading);
  font-weight: 700;
  background: #ffce44;
  color: #332a44;
  transform: rotate(13deg);
  border: 3px solid;
  clip-path: polygon(
    50% 0,
    60% 8%,
    75% 3%,
    80% 18%,
    96% 22%,
    92% 40%,
    100% 50%,
    90% 62%,
    96% 78%,
    80% 82%,
    75% 98%,
    58% 92%,
    50% 100%,
    39% 91%,
    23% 97%,
    18% 81%,
    4% 77%,
    9% 60%,
    0 50%,
    9% 38%,
    4% 22%,
    20% 18%,
    25% 3%,
    40% 8%
  );
}
.entry .kits {
  padding: 60px 4% 70px;
  margin: 0;
}
.entry .kits > div {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr 1fr;
  align-items: start;
  gap: 4%;
}
.entry .kit {
  grid-column: auto !important;
  grid-row: auto !important;
  padding: 30px;
  min-height: 680px;
  border: 3px solid #332a44;
  box-shadow: 9px 10px 0 #332a44;
}
.entry .k0 {
  border-radius: 45% 45% 3% 3%;
  background: #cbb9e3;
  padding-top: 45px;
  transform: rotate(-4deg);
}
.entry .k1 {
  margin-top: 135px;
  background: #b9e5d6;
  transform: rotate(5deg);
  border-radius: 0;
  min-height: 600px;
}
.entry .k2 {
  margin-top: 25px;
  background: #f4ad88;
  transform: rotate(-2deg);
  border-radius: 0 35% 0 0;
}
.entry .collection-shape {
  height: 250px;
  margin: 0 0 30px;
}
.entry .kit h3 {
  font-size: 42px;
  line-height: 0.95;
  max-width: 7em;
  letter-spacing: -0.06em;
}
.entry .kit p {
  font-size: 16px;
  line-height: 1.5;
}
.entry .kit ul {
  font-size: 12px;
}
.entry .kit > span {
  font-size: 9px;
}
.entry .kit button {
  background: #332a44;
  color: #fff0dd;
  border: 0;
  padding: 14px 18px;
  font-size: 12px;
}
.entry .clubnote {
  margin: 0;
  background: #fff0dd;
  padding: 60px 8%;
  border-block: 4px solid #332a44;
}
@media (max-width: 900px) {
  .entry header {
    padding: 18px 5%;
    gap: 16px;
  }
  .entry header nav {
    font-size: 10px;
    gap: 12px;
  }
  .entry .kits {
    padding: 35px 8% 50px;
  }
  .entry .kits > div {
    display: block;
  }
  .entry .kit {
    min-height: 0;
    margin: 0 0 50px !important;
    padding: 28px;
  }
  .entry .k0 {
    padding-top: 35px;
  }
  .entry .k1 {
    transform: rotate(3deg);
  }
  .entry .k2 {
    transform: rotate(-2deg);
  }
  .entry .collection-shape {
    height: 210px;
    margin-bottom: 20px;
  }
  .entry .kit h3 {
    font-size: 38px;
  }
  .club-stamp {
    width: 95px;
    height: 95px;
    font-size: 18px;
    right: 4%;
    top: 18px;
  }
  .entry .kit p {
    font-size: 15px;
  }
}
</style>
