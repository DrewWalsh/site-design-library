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
  <div class="specimen">
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
        ><section class="hello">
          <div class="headline">
            <span class="tag">SERIOUS ABOUT PLAYING.</span>
            <h1>Make a little<br /><em>beautiful</em><br />mess.</h1>
            <p>
              Creative kits for people who like trying things.<br />No special talent required.
              Curiosity helps.
            </p>
            <button @click="go('bundle')">Find your next thing →</button>
          </div>
          <div class="kit-art">
            <div class="blob"></div>
            <div class="paper">
              <b>THE<br />ODD<br />BOX.</b><span>OPEN / TRY / REPEAT</span>
            </div>
            <span class="sticker">A NEW<br />WAY TO<br />WEEKEND.</span>
            <div class="squiggle">〰〰〰</div>
          </div>
        </section>
        <section id="kits" class="kits">
          <h2>Pick a starting point.</h2>
          <div>
            <article v-for="(kit, i) in kits" :key="kit" :class="'kit k' + i">
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
</style>
