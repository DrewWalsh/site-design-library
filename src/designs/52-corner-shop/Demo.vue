<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useSpecimen } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const products = [
  {
    name: 'A very good notebook',
    price: 12,
    kind: 'Paper goods',
    detail: 'Dot grid · recycled stock',
  },
  { name: 'The Saturday mug', price: 24, kind: 'For the home', detail: 'Hand-finished stoneware' },
  { name: 'Alder blossom soap', price: 8, kind: 'Small gifts', detail: 'Made in small batches' },
];
const basket = ref([0, 0, 0]),
  total = computed(() => basket.value.reduce((s, q, i) => s + q * products[i].price, 0)),
  count = computed(() => basket.value.reduce((a, b) => a + b, 0));
const customer = ref(''),
  email = ref(''),
  pickup = ref('Saturday · 11:00–13:00'),
  placed = ref(false);
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <div class="shop-top">
      OPEN TODAY 10–6 <span>14 Maple Street, Northbank</span
      ><button @click="go('pickup')">Your collection ({{ count }}) ↗</button>
    </div>
    <header class="shop-header wrap">
      <a :href="href('start')">Good<br /><em>Neighbour.</em></a>
      <nav class="row">
        <a :href="href('start') + '#shelf'">On the shelf</a
        ><a :href="href('start') + '#visit'">Come by</a
        ><button class="primary" @click="go('pickup')">Collect something good</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="shop-window wrap">
          <div class="window-copy">
            <p class="eyebrow">Small things. close to home.</p>
            <h1>Your around-<br />the-corner<br /><em>kind of shop.</em></h1>
            <p class="lead">
              Useful things, thoughtful gifts, and a reason to take the long way home.
            </p>
            <a href="#shelf" class="primary">A look at the shelf ↓</a>
            <div class="hand-note">New this week<br /><b>Paper goods from Field Press</b></div>
          </div>
          <figure>
            <img
              class="photo"
              src="https://drew-site-design-library.t3.tigrisfiles.io/assets/commercial/cd2404dc655f9c6f-shop.webp"
              alt="Independent shop filled with carefully arranged gifts and homeware"
            />
            <figcaption>A neighbourhood shop-window reference · illustrative photograph</figcaption>
          </figure>
        </section>
        <section id="shelf" class="shelf wrap section">
          <div class="section-heading">
            <div>
              <p class="eyebrow">A few good finds / sample stock</p>
              <h2>Worth popping in for.</h2>
            </div>
            <p>
              Reserve here, pay at the counter. We’ll put your chosen pieces aside for your
              collection window.
            </p>
          </div>
          <div class="three">
            <article v-for="(p, i) in products" :key="p.name">
              <div :class="'product-art product-' + i" aria-hidden="true">
                <div v-if="i === 0" class="notebook">a good<br />little note.</div>
                <div v-if="i === 1" class="mug"></div>
                <div v-if="i === 2" class="soap">ALDER<br /><small>BLOSSOM</small></div>
              </div>
              <p class="eyebrow">{{ p.kind }}</p>
              <div class="row spread">
                <h3>{{ p.name }}</h3>
                <b>&#36;{{ p.price }}</b>
              </div>
              <p>{{ p.detail }}</p>
              <button @click="basket[i]++" :aria-label="'Reserve ' + p.name">
                Add for collection {{ basket[i] ? '(' + basket[i] + ')' : '+' }}
              </button>
            </article>
          </div>
          <p class="basket-status" role="status">
            {{
              count
                ? count + ' items set aside in your sample basket · $' + total
                : 'No items selected yet. Find something you like.'
            }}
          </p>
        </section>
        <section id="visit" class="visit">
          <div class="wrap visit-grid">
            <div>
              <p class="eyebrow">The local noticeboard</p>
              <h2>A shop is also<br />a place to meet.</h2>
              <p>
                Saturday 7 November · 11–2<br />Meet the maker: paper, prints, and a fresh pot of
                tea.
              </p>
            </div>
            <div class="hours">
              <h3>Find our front door.</h3>
              <p>14 Maple Street · Northbank</p>
              <dl>
                <div>
                  <dt>Tuesday–Friday</dt>
                  <dd>10:00–18:00</dd>
                </div>
                <div>
                  <dt>Saturday</dt>
                  <dd>10:00–17:00</dd>
                </div>
                <div>
                  <dt>Sunday &amp; Monday</dt>
                  <dd>Taking a little rest</dd>
                </div>
              </dl>
              <p class="muted">Step-free entrance. Bike stand outside. Dogs welcome.</p>
            </div>
          </div>
        </section></template
      >
      <section v-else class="wrap state-page">
        <button class="back text-link" @click="go('start')">← Back to the shop</button>
        <h1>{{ state === 'pickup' ? 'A few good things.' : 'Make it a collection.' }}</h1>
        <div class="state-grid">
          <div v-if="state === 'pickup'" class="stack">
            <article class="basket-line" v-for="(p, i) in products" :key="p.name">
              <div>
                <h3>{{ p.name }}</h3>
                <span>&#36;{{ p.price }} each</span>
              </div>
              <label
                >Quantity<input
                  type="number"
                  min="0"
                  max="6"
                  v-model.number="basket[i]"
                  :aria-label="p.name + ' quantity'"
              /></label>
            </article>
            <p>
              Total at collection: <strong>&#36;{{ total }}</strong>
            </p>
            <button
              class="primary"
              :disabled="!count || basket.some((q) => !Number.isInteger(q) || q < 0 || q > 6)"
              @click="go('order')"
            >
              Choose a collection time →
            </button>
          </div>
          <form v-else-if="!placed" class="form" @submit.prevent="placed = true">
            <label>Name<input required v-model="customer" /></label
            ><label>Email<input type="email" required v-model="email" /></label
            ><label
              >Collection window<select v-model="pickup">
                <option>Saturday · 11:00–13:00</option>
                <option>Saturday · 14:00–16:00</option>
                <option>Tuesday · 12:00–14:00</option>
              </select></label
            ><button class="primary" :disabled="!count">Reserve sample collection</button>
            <p v-if="!count">
              Your basket is empty.
              <button class="text-link" type="button" @click="go('pickup')">
                Choose a few things first</button
              >.
            </p>
          </form>
          <div v-else class="confirmation" role="status">
            <h2>All set, {{ customer }}.</h2>
            <p>{{ count }} items · &#36;{{ total }} · {{ pickup }}</p>
            <p>This is a sample reservation. No stock was held and no payment was taken.</p>
          </div>
          <aside class="collection-note">
            <span>↗</span>
            <h2>See you<br />on Maple Street.</h2>
            <p>
              Orders are held until the end of your chosen collection window. Need a different day?
              A real shop would confirm this with you directly.
            </p>
            <p>No postage. No checkout maze. Just a trip to your local.</p>
          </aside>
        </div>
      </section>
    </main>
    <footer class="sample-footer">
      <span>Good Neighbour · Fictional design reference 52.</span
      ><span>Sample data and illustrative images. Interactions stay on this page.</span
      ><a :href="href('start')">Reset sample</a>
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'DM Sans';
  src: url('/fonts/dm-sans.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}
@font-face {
  font-family: 'IBM Plex Mono';
  src: url('/fonts/ibm-plex-mono.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}

.specimen {
  min-height: 100vh;
  background: var(--page);
  color: var(--ink);
  font: 16px/1.6 var(--body);
  overflow-wrap: break-word;
}
.specimen * {
  min-width: 0;
}
h1,
h2,
h3,
p,
figure {
  margin: 0;
}
h1,
h2,
h3 {
  font-family: var(--heading);
  line-height: 1.12;
}
h1 {
  font-size: clamp(2.5rem, 5.3vw, 5.5rem);
  letter-spacing: -0.045em;
}
h2 {
  font-size: clamp(1.8rem, 3vw, 3rem);
  letter-spacing: -0.03em;
}
h3 {
  font-size: 1.25rem;
}
p + p {
  margin-top: 1rem;
}
button,
input,
select,
textarea {
  border: 1px solid var(--line);
  padding: 10px 15px;
  border-radius: 0;
  background: var(--surface);
  color: var(--ink);
}
button {
  font-weight: 600;
}
button:disabled {
  opacity: 0.55;
}
button[aria-pressed='true'] {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
button:hover:not(:disabled) {
  filter: brightness(0.94);
}
a {
  text-underline-offset: 4px;
}
.primary {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: 44px;
  padding: 12px 20px;
  background: var(--accent);
  color: #fff;
  border: 1px solid var(--accent);
  text-decoration: none;
  font-weight: 700;
}
.eyebrow {
  font:
    12px/1.5 'IBM Plex Mono',
    monospace;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}
.lead {
  font-size: 1.15rem;
  max-width: 52ch;
}
.wrap {
  max-width: var(--content);
  margin: auto;
  padding: 0 40px;
}
.row {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}
.stack {
  display: grid;
  gap: 20px;
}
.spread {
  justify-content: space-between;
}
.muted {
  font-size: 0.875rem;
}
.rule {
  border-top: 1px solid var(--line);
}
.skip {
  position: absolute;
  top: -100px;
  left: 12px;
  z-index: 99;
  background: var(--ink);
  color: var(--page);
  padding: 12px;
}
.skip:focus {
  top: 10px;
}
.sample-footer {
  padding: 26px 40px;
  border-top: 1px solid var(--line);
  display: flex;
  gap: 12px 24px;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 12px;
}
.photo {
  display: block;
  width: 100%;
  object-fit: cover;
}
figcaption {
  font-size: 12px;
  padding: 8px 0;
}
.form {
  display: grid;
  gap: 20px;
  max-width: 700px;
}
.form label {
  display: grid;
  gap: 6px;
  font-size: 0.9rem;
}
.form input,
.form select,
.form textarea {
  width: 100%;
  max-width: 100%;
}
.form textarea {
  min-height: 110px;
}
.form fieldset {
  border: 1px solid var(--line);
  padding: 20px;
  display: grid;
  gap: 12px;
}
.form fieldset label {
  display: flex;
  align-items: center;
  gap: 10px;
}
.form input[type='radio'],
.form input[type='checkbox'] {
  width: 20px;
  height: 20px;
  min-height: 20px;
  flex: 0 0 20px;
}
.notice {
  padding: 20px;
  border-left: 4px solid var(--accent);
  background: var(--surface);
}
[role='alert'] {
  color: #912f24;
  background: #fff3ec;
  padding: 14px;
}
table {
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}
th,
td {
  border-bottom: 1px solid var(--line);
  padding: 15px 10px;
}
dl {
  margin: 0;
}
dt {
  font-size: 0.8rem;
}
dd {
  margin: 0;
  font-weight: 600;
}
details {
  border-bottom: 1px solid var(--line);
  padding: 18px 0;
}
summary {
  font-weight: 600;
}
details p {
  padding-top: 12px;
  max-width: 65ch;
}
.back {
  display: inline-block;
  margin-bottom: 32px;
}
.state-page {
  padding-top: 50px;
  padding-bottom: 70px;
}
.state-page > h1 {
  margin-bottom: 25px;
}
.state-page > .lead {
  margin-bottom: 35px;
}
.state-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 60px;
}
.state-grid aside {
  align-self: start;
}
.confirmation {
  padding: 28px;
  border: 1px solid var(--line);
  background: var(--surface);
}
.confirmation h2 {
  margin-bottom: 18px;
}
.checkline {
  display: flex;
  align-items: center;
  gap: 10px;
}
.checkline input {
  width: 20px;
  min-height: 20px;
}
.text-link {
  border: 0;
  padding: 0;
  background: transparent;
  text-decoration: underline;
  min-height: 40px;
}
.two {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
}
.three {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}
.section {
  padding: 65px 0;
}
.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 28px;
  margin-bottom: 28px;
}
.section-heading p {
  max-width: 44ch;
}
.money {
  font-variant-numeric: tabular-nums;
}
.pill {
  display: inline-block;
  border: 1px solid var(--line);
  padding: 4px 10px;
  font-size: 12px;
}
.wide-table {
  overflow: auto;
}
.wide-table table {
  min-width: 550px;
}
@media (max-width: 760px) {
  .wrap {
    padding-left: 22px;
    padding-right: 22px;
  }
  .two,
  .three,
  .state-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .section {
    padding: 42px 0;
  }
  .section-heading {
    display: block;
  }
  .section-heading p {
    margin-top: 14px;
  }
  .sample-footer {
    padding: 24px 22px;
    display: grid;
  }
  .state-page {
    padding-top: 30px;
    padding-bottom: 45px;
  }
  .lead {
    font-size: 1.05rem;
  }
  h1 {
    font-size: clamp(2.2rem, 10vw, 4rem);
  }
  nav {
    flex-wrap: wrap;
  }
  th,
  td {
    padding: 12px 8px;
  }
}

.shop-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 9px 40px;
  background: #4e5427;
  color: #fff;
  font-size: 12px;
  letter-spacing: 0.05em;
}
.shop-top button {
  background: transparent;
  color: inherit;
  border: 0;
  padding: 4px;
}
.shop-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 35px;
  padding-top: 30px;
  padding-bottom: 30px;
}
.shop-header > a {
  font: bold 32px/1.05 var(--body);
  letter-spacing: -0.05em;
  text-decoration: none;
}
.shop-header em {
  font-weight: 400;
}
.shop-header nav {
  font-size: 14px;
}
.shop-window {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 35px;
  padding-bottom: 45px;
}
.window-copy {
  padding: 35px 0;
  position: relative;
}
.window-copy h1 {
  margin: 22px 0;
  font-size: clamp(3rem, 5vw, 5rem);
}
.window-copy h1 em {
  font-family: Georgia, serif;
  font-weight: 400;
}
.window-copy .primary {
  margin-top: 28px;
}
.shop-window figure {
  transform: rotate(2deg);
  padding: 14px;
  background: #f0cd60;
  align-self: start;
}
.shop-window img {
  height: 490px;
}
.hand-note {
  font-size: 12px;
  border: 1px dashed var(--ink);
  display: table;
  padding: 13px 20px;
  transform: rotate(-3deg);
  margin-top: 35px;
  background: #fff6ce;
}
.shelf {
  border-top: 2px solid var(--ink);
}
.shelf article > p {
  font-size: 13px;
  margin: 12px 0;
}
.shelf h3 {
  font-size: 18px;
}
.shelf article > button {
  margin-top: 16px;
  width: 100%;
  background: transparent;
}
.product-art {
  height: 230px;
  background: #eae7d0;
  display: grid;
  place-items: center;
  margin-bottom: 22px;
}
.product-1 {
  background: #e6c6ae;
}
.product-2 {
  background: #d4dec5;
}
.notebook {
  width: 115px;
  height: 165px;
  background: #d8643e;
  color: #241c16;
  transform: rotate(-9deg);
  padding: 20px 12px;
  border-left: 7px solid #994b31;
  font-size: 20px;
  line-height: 1.1;
}
.mug {
  position: relative;
  background: #f8f1df;
  border-radius: 4px 4px 35% 35%;
  width: 105px;
  height: 100px;
  border-top: 7px solid #d9d0b8;
  transform: rotate(8deg);
}
.mug:after {
  content: '';
  position: absolute;
  left: 90px;
  top: 10px;
  width: 35px;
  height: 55px;
  border: 12px solid #f8f1df;
  border-radius: 50%;
}
.soap {
  width: 125px;
  height: 85px;
  border-radius: 16px;
  background: #b7bf8e;
  box-shadow: inset 0 0 0 10px #d1d7b9;
  display: grid;
  align-content: center;
  text-align: center;
  font:
    18px Georgia,
    serif;
  transform: rotate(-7deg);
}
.soap small {
  font: 10px var(--body);
}
.basket-status {
  margin-top: 25px;
  font-size: 14px;
}
.visit {
  background: #e9ce7b;
  border-top: 2px solid var(--ink);
  padding: 55px 0;
}
.visit-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
}
.visit h2 {
  margin: 18px 0 25px;
}
.hours {
  border-left: 1px solid var(--ink);
  padding-left: 55px;
}
.hours dl {
  margin: 25px 0;
}
.hours dl > div {
  display: flex;
  justify-content: space-between;
  gap: 25px;
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
}
.basket-line {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid var(--line);
}
.basket-line label {
  display: grid;
  font-size: 12px;
  gap: 5px;
}
.basket-line input {
  width: 80px;
}
.collection-note {
  background: #f0cd60;
  padding: 35px;
  transform: rotate(1deg);
}
.collection-note > span {
  font-size: 50px;
}
.collection-note h2 {
  margin: 15px 0 25px;
}
@media (max-width: 760px) {
  .shop-top {
    padding: 8px 22px;
  }
  .shop-top > span {
    display: none;
  }
  .shop-header {
    align-items: start;
  }
  .shop-header nav {
    justify-content: end;
    gap: 8px;
  }
  .shop-header nav > a {
    display: none;
  }
  .shop-header .primary {
    font-size: 12px;
    padding: 8px;
  }
  .shop-window,
  .visit-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .shop-window img {
    height: 300px;
  }
  .shop-window figure {
    margin: 0 5px;
  }
  .hours {
    border-left: 0;
    border-top: 1px solid var(--ink);
    padding: 30px 0 0;
  }
  .window-copy {
    padding: 20px 0;
  }
  .window-copy h1 {
    font-size: 3.4rem;
  }
  .product-art {
    height: 230px;
  }
}

.eyebrow {
  font: 500 13px/1.5 var(--body);
  letter-spacing: 0;
  text-transform: none;
}
</style>
