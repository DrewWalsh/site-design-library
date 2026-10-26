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
    .filter((k) => k.startsWith('design-library:22:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const glaze = ref('Chalk'),
  bag = useStored('22:bag', 0);
function add() {
  bag.value++;
  message.value = 'Vessel 03 added to your sample bag.';
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <a class="logo" :href="href('start')" @click.prevent="go('start')">FORM<br />NUMBER</a>
      <nav>
        <a :href="href('start')" @click.prevent="go('start')">Objects</a
        ><a :href="href('detail')" @click.prevent="go('detail')">Materials</a
        ><button @click="go('bag')">Bag ({{ bag }})</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><div class="intro">
          <p>Considered objects.<br />For everyday rituals.</p>
          <span class="eyebrow">Collection 01 — Earth & table</span>
        </div>
        <section class="object">
          <figure>
            <img
              class=""
              src="/art/ceramics.webp"
              alt="Two speckled ceramic bowls resting together on a neutral surface"
              width="1200"
              height="900"
              loading="lazy"
            />
            <figcaption>PLATE 03 &nbsp; Stoneware study, natural light</figcaption>
          </figure>
          <div class="object-info">
            <span class="eyebrow">Object no. 003</span>
            <h1>A small<br />daily ritual.</h1>
            <p>
              A pair of hand-finished bowls. An open form, a soft rim, and just enough weight to
              feel at home in your hands.
            </p>
            <div class="specs">
              <p><span>Material</span><b>Speckled stoneware</b></p>
              <p><span>Dimensions</span><b>Ø 14 × H 7 cm</b></p>
              <p><span>Made in</span><b>Northbank studio</b></p>
            </div>
            <a :href="href('detail')" @click.prevent="go('detail')">Study the object ↗</a>
          </div>
        </section>
        <section class="collection">
          <div>
            <p class="eyebrow">The collection</p>
            <h2>Less, but<br />well considered.</h2>
            <p>
              Three forms in a shared material language. Small variations in glaze and texture are
              part of each object.
            </p>
          </div>
          <ol>
            <li v-for="(v, i) in ['The pouring jug', 'The low dish', 'The everyday bowl']" :key="v">
              <button
                @click="
                  selected = i;
                  go('detail');
                "
              >
                <small>00{{ i + 1 }}</small>
                <h3>{{ v }}</h3>
                <span>Stoneware · from £{{ [48, 36, 32][i] }} →</span>
              </button>
            </li>
          </ol>
        </section></template
      ><template v-else-if="state === 'detail'"
        ><div class="object detail">
          <figure>
            <img
              class=""
              src="/art/ceramics.webp"
              alt="Close view of the bowls showing speckled glaze and rounded rims"
              width="1200"
              height="900"
              loading="lazy"
            />
            <figcaption>Material study / {{ glaze }} glaze</figcaption>
          </figure>
          <article>
            <button @click="go('start')">← Object index</button>
            <p class="eyebrow">Object 003</p>
            <h1>The everyday bowl</h1>
            <p>£32 / one bowl · Sample price</p>
            <p>
              A softly curved bowl for breakfast, a handful of fruit, or the small things you like
              to keep nearby.
            </p>
            <label
              >Glaze<select v-model="glaze">
                <option>Chalk</option>
                <option>Iron</option>
                <option>Fern — sold out</option>
              </select></label
            >
            <p v-if="glaze.startsWith('Fern')">
              Fern is unavailable. Choose Chalk or Iron for this sample.
            </p>
            <button class="primary" :disabled="glaze.startsWith('Fern')" @click="add">
              Add to sample bag
            </button>
            <p v-if="message" role="status">
              {{ message }} <button @click="go('bag')">View bag →</button>
            </p>
            <details open>
              <summary>Material & care</summary>
              <p>
                Speckled stoneware with a food-safe glaze. Hand washing is recommended in this
                fictional product specification. The image illustrates material character, not an
                actual product for sale.
              </p>
            </details>
            <details>
              <summary>Dimensions & delivery</summary>
              <p>14 cm diameter, 7 cm high. This demo creates no purchase or delivery.</p>
            </details>
          </article>
        </div></template
      >
      <section v-else class="bag">
        <p class="eyebrow">Your selection</p>
        <h1>The bag</h1>
        <div v-if="bag">
          <h2>003 · Everyday bowl</h2>
          <label>Quantity<input type="number" min="0" max="12" v-model.number="bag" /></label>
          <p>Sample subtotal: £{{ bag * 32 }}</p>
          <button @click="bag = 0">Remove</button>
          <p>No checkout or payment is part of this reference.</p>
        </div>
        <p v-else>Your bag is empty. Find an object to spend time with.</p>
        <button @click="go('start')">Return to objects →</button>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Form Number · Fictional sample content · Design reference 22</span
      ><button @click="reset">Reset demo</button>
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Libre Baskerville';
  src: url('/fonts/libre-baskerville.woff2') format('woff2');
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
  margin: 0 5%;
  padding: 30px 0;
  border-bottom: 1px solid;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.logo {
  font: 20px/1.05 'DM Sans';
  font-weight: 700;
  letter-spacing: -0.07em;
  text-decoration: none;
}
nav {
  display: flex;
  align-items: center;
  gap: 40px;
  font-size: 12px;
}
nav button {
  border: none;
  background: transparent;
}
main {
  padding: 0 5%;
  max-width: 1600px;
  margin: auto;
}
.intro {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0 35px;
  font-size: 14px;
}
.object {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 8%;
  align-items: center;
}
.object img {
  width: 100%;
  height: 600px;
}
.object-info {
  padding-right: 8%;
}
.object h1 {
  font-weight: 400;
  font-size: 58px;
  line-height: 1.2;
  margin: 25px 0;
}
.object p {
  font-size: 14px;
}
.specs {
  margin: 35px 0;
}
.specs p {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  border-bottom: 1px solid var(--line);
  padding: 13px 0;
  font-size: 12px;
}
.specs b {
  font-weight: 400;
}
.object-info > a {
  font-size: 13px;
}
.collection {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 15%;
  padding: 90px 0;
  border-top: 1px solid var(--line);
  margin-top: 70px;
}
.collection h2 {
  font-weight: 400;
  line-height: 1.4;
}
.collection p {
  font-size: 14px;
}
.collection ol {
  padding: 0;
  list-style: none;
}
.collection li {
  border-top: 1px solid var(--line);
}
.collection button {
  width: 100%;
  display: block;
  background: transparent;
  border: none;
  text-align: left;
  padding: 25px 0;
}
.collection small {
  float: right;
}
.collection h3 {
  font-weight: 400;
}
.collection span {
  font-size: 12px;
}
.detail {
  padding: 60px 0;
}
.detail h1 {
  font-size: 46px;
}
.detail label {
  margin: 25px 0;
}
.detail .primary {
  width: 100%;
  margin-bottom: 25px;
}
.bag {
  padding: 60px 0 180px;
}
.bag label {
  width: 160px;
}
@media (max-width: 650px) {
  nav {
    gap: 16px;
  }
  .intro {
    display: block;
  }
  .intro .eyebrow {
    font-size: 10px;
  }
  .object {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .object img {
    height: 390px;
  }
  .object h1 {
    font-size: 45px;
  }
  .object-info {
    padding: 0;
  }
  .collection {
    grid-template-columns: 1fr;
    gap: 15px;
    padding: 40px 0;
  }
  .detail {
    padding: 30px 0;
  }
}
</style>
