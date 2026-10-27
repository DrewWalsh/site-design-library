<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useSpecimen } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const menu = [
  {
    name: 'The Margherita',
    category: 'Pizza',
    price: 14,
    detail: 'Tomato, mozzarella, basil',
    tag: 'Vegetarian',
  },
  {
    name: 'Hot honey pepperoni',
    category: 'Pizza',
    price: 18,
    detail: 'Pepperoni, mozzarella, chilli honey',
    tag: 'A little heat',
  },
  {
    name: 'Mushroom & thyme',
    category: 'Pizza',
    price: 17,
    detail: 'Roasted mushrooms, cream, fresh thyme',
    tag: 'Vegetarian',
  },
  {
    name: 'Chopped house salad',
    category: 'Sides',
    price: 8,
    detail: 'Crunchy leaves, cucumber, lemon dressing',
    tag: 'Plant-based',
  },
  {
    name: 'Garlic knots',
    category: 'Sides',
    price: 6,
    detail: 'Six knots, garlic butter, parsley',
    tag: 'Vegetarian',
  },
  {
    name: 'House lemonade',
    category: 'Drinks',
    price: 4,
    detail: 'Lemon, a little sugar, plenty of ice',
    tag: '330 ml',
  },
];
const category = ref('All'),
  basket = ref<number[]>([0, 0, 0, 0, 0, 0]),
  total = computed(() => basket.value.reduce((sum, q, i) => sum + q * menu[i].price, 0)),
  count = computed(() => basket.value.reduce((a, b) => a + b, 0));
const time = ref('18:00–18:15'),
  name = ref(''),
  email = ref(''),
  sent = ref(false);
function add(i: number) {
  basket.value[i] = Math.min(9, basket.value[i] + 1);
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <div class="eatery-strip">
      TUES–SUN / 12–9 <span>32 MAPLE STREET / NORTHBANK</span
      ><button @click="go('order')">YOUR ORDER ({{ count }}) ↗</button>
    </div>
    <header class="eatery-header wrap">
      <a :href="href('start')" class="eatery-logo"
        >SIDE STREET<span>PIZZA &amp; GOOD COMPANY</span></a
      >
      <nav class="row">
        <button class="text-link" @click="go('menu')">The menu</button
        ><button class="primary" @click="go('menu')">Order for collection</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="eatery-hero wrap">
          <h1>GOOD FOOD.<br />NO BIG OCCASION<br />REQUIRED.</h1>
          <div class="food-hero">
            <img
              class="photo"
              src="https://drew-site-design-library.t3.tigrisfiles.io/assets/commercial/a805aa6d55fe493b-eatery.webp"
              alt="Freshly baked tomato and basil pizza on a wooden table"
            />
            <div class="hours-badge">
              HOT FROM<br />THE OVEN.<br /><span>Collect from 12:00</span>
            </div>
          </div>
          <div class="food-caption">
            <p>
              A neighbourhood pizza place for the midweek catch-up, the too-tired-to-cook night, and
              the extra slice on the way home.
            </p>
            <button class="primary" @click="go('menu')">See what’s cooking →</button>
          </div>
          <p class="muted">Illustrative food photography · fictional restaurant</p>
        </section>
        <section class="wrap section menu-preview">
          <div class="section-heading">
            <h2>THE REGULARS.</h2>
            <button class="text-link" @click="go('menu')">The whole menu →</button>
          </div>
          <article v-for="(item, i) in menu.slice(0, 3)" :key="item.name" class="menu-line">
            <span class="menu-no">0{{ i + 1 }}</span>
            <div>
              <h3>{{ item.name }}</h3>
              <p>{{ item.detail }}</p>
            </div>
            <b>&#36;{{ item.price }}</b
            ><button @click="add(i)" :aria-label="'Add ' + item.name">+ Add</button>
          </article>
          <p role="status" class="basket-summary">
            {{
              count
                ? count + ' items in your sample order · $' + total
                : 'Pick a favourite. Your sample order starts here.'
            }}
          </p>
        </section>
        <section class="eatery-visit">
          <div class="wrap two">
            <div>
              <p class="eyebrow">SAME CORNER. GOOD HABIT.</p>
              <h2>COME HUNGRY.<br />LEAVE HAPPY.</h2>
            </div>
            <div>
              <h3>32 Maple Street, Northbank</h3>
              <p>Tuesday–Sunday, 12:00–21:00<br />Monday: dough takes a day off.</p>
              <p>
                Eat in when there’s a seat. Collect when there isn’t time. Ask the restaurant
                directly about allergens and dietary needs before a real order.
              </p>
              <button class="primary" @click="go('menu')">Build a collection order →</button>
            </div>
          </div>
        </section></template
      >
      <section v-else class="wrap state-page">
        <button class="back text-link" @click="go('start')">← Back to Side Street</button>
        <h1>{{ state === 'menu' ? 'WHAT ARE YOU HAVING?' : 'LET’S MAKE IT DINNER.' }}</h1>
        <div class="order-layout">
          <div>
            <template v-if="state === 'menu'"
              ><div class="menu-categories row">
                <button
                  v-for="c in ['All', 'Pizza', 'Sides', 'Drinks']"
                  :key="c"
                  :aria-pressed="category === c"
                  @click="category = c"
                >
                  {{ c }}
                </button>
              </div>
              <article
                class="menu-line"
                v-for="item in menu.filter((m) => category === 'All' || m.category === category)"
                :key="item.name"
              >
                <div>
                  <span class="food-tag">{{ item.tag }}</span>
                  <h2>{{ item.name }}</h2>
                  <p>{{ item.detail }}</p>
                </div>
                <b>&#36;{{ item.price }}</b
                ><button @click="add(menu.indexOf(item))" :aria-label="'Add ' + item.name">
                  +
                </button>
              </article></template
            >
            <form v-else-if="!sent" class="form" @submit.prevent="sent = true">
              <label>Name for collection<input required v-model="name" /></label
              ><label>Email<input required type="email" v-model="email" /></label
              ><label
                >Sample collection window<select v-model="time">
                  <option>18:00–18:15</option>
                  <option>18:30–18:45</option>
                  <option>19:00–19:15</option>
                </select></label
              >
              <p class="notice">
                Collection from 32 Maple Street. Sample prices include food only; no payment is
                collected here.
              </p>
              <button class="primary" :disabled="!count">Review sample order</button>
              <p v-if="!count">
                Your order is empty.
                <button type="button" class="text-link" @click="go('menu')">
                  Choose something from the menu</button
                >.
              </p>
            </form>
            <div v-else class="confirmation" role="status">
              <h2>ORDER UP, {{ name.toUpperCase() }}.</h2>
              <p>Sample collection · {{ time }}<br />{{ count }} items · &#36;{{ total }}</p>
              <p>
                No food has been ordered and no payment was taken. This is the confirmation state
                for the reference.
              </p>
            </div>
          </div>
          <aside class="order-basket">
            <p class="eyebrow">YOUR COLLECTION ORDER</p>
            <h2>A GOOD<br />CHOICE.</h2>
            <div v-if="!count" class="empty-basket">
              Nothing in the bag yet. Start with a pizza or a side.
            </div>
            <div v-for="(q, i) in basket" :key="i">
              <div v-if="q" class="basket-item">
                <strong>{{ menu[i].name }}</strong>
                <div class="row spread">
                  <div class="quantity-controls">
                    <button
                      @click="basket[i] = Math.max(0, basket[i] - 1)"
                      :aria-label="'Remove one ' + menu[i].name"
                    >
                      −</button
                    ><span>{{ q }}</span
                    ><button @click="add(i)" :aria-label="'Add one ' + menu[i].name">+</button>
                  </div>
                  <b>&#36;{{ q * menu[i].price }}</b>
                </div>
              </div>
            </div>
            <div class="basket-total" role="status">
              <span>Total</span><b>&#36;{{ total }}</b>
            </div>
            <button v-if="state === 'menu'" class="primary" :disabled="!count" @click="go('order')">
              Choose collection time →
            </button>
            <p>
              Sample menu. Check allergens directly with the restaurant when adapting this
              reference.
            </p>
          </aside>
        </div>
      </section>
    </main>
    <footer class="sample-footer">
      <span>SIDE STREET / Pizza & plates · Fictional design reference 67.</span
      ><span>Sample data and illustrative images. Interactions stay on this page.</span
      ><a :href="href('start')">Reset sample</a>
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Archivo Black';
  src: url('/fonts/archivo-black.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}
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

.eatery-strip {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  background: #9c3029;
  color: #fff4d7;
  padding: 10px 40px;
  font-size: 11px;
}
.eatery-strip button {
  background: transparent;
  color: inherit;
  border: 0;
  font-size: 11px;
  padding: 0;
}
.eatery-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
  padding-top: 30px;
  padding-bottom: 30px;
}
.eatery-logo {
  font: 25px/0.9 var(--heading);
  letter-spacing: -0.04em;
  text-decoration: none;
}
.eatery-logo span {
  display: block;
  font: 9px/1.5 var(--body);
  letter-spacing: 0.14em;
  margin-top: 10px;
}
.eatery-header nav {
  font-size: 13px;
}
.eatery-hero {
  position: relative;
  padding-top: 25px;
  padding-bottom: 45px;
}
.eatery-hero h1 {
  position: relative;
  z-index: 1;
  font-size: clamp(2.5rem, 5.3vw, 5.2rem);
  line-height: 1.04;
  max-width: 750px;
  margin-bottom: -45px;
  text-shadow: 3px 3px var(--page);
}
.food-hero {
  margin-left: 26%;
  position: relative;
}
.food-hero img {
  height: 430px;
  object-position: center;
}
.hours-badge {
  position: absolute;
  right: -12px;
  top: -35px;
  border-radius: 50%;
  background: #9c3029;
  color: #fff4d7;
  border: 2px dashed #fff4d7;
  outline: 6px solid #9c3029;
  width: 145px;
  height: 145px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font: 17px/1.1 var(--heading);
  transform: rotate(8deg);
}
.hours-badge span {
  font: 11px var(--body);
  margin-top: 12px;
}
.food-caption {
  display: flex;
  justify-content: space-between;
  gap: 50px;
  align-items: center;
  margin: 25px 0 15px;
}
.food-caption p {
  max-width: 55ch;
  font-size: 15px;
}
.eatery-hero > .muted {
  font-size: 10px;
}
.menu-preview {
  border-top: 3px solid var(--accent);
}
h2 {
  font-size: clamp(1.9rem, 3.3vw, 3.2rem);
}
.menu-line {
  display: flex;
  align-items: center;
  gap: 28px;
  border-bottom: 1px solid var(--line);
  padding: 23px 0;
}
.menu-line > div {
  flex: 1;
}
.menu-line h3,
.menu-line h2 {
  font: 22px var(--body);
  font-weight: 700;
  letter-spacing: -0.02em;
}
.menu-line p {
  font-size: 13px;
  margin-top: 8px;
}
.menu-line > b {
  font-size: 24px;
}
.menu-line button {
  border-radius: 50%;
  width: 55px;
  height: 55px;
  padding: 0;
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
}
.menu-no {
  font: 13px var(--body);
}
.basket-summary {
  font-size: 13px;
  margin-top: 22px;
}
.eatery-visit {
  background: #e9c65b;
  padding: 55px 0;
  border-top: 3px solid var(--accent);
}
.eatery-visit h2 {
  margin-top: 20px;
}
.eatery-visit h3 {
  font: 25px var(--body);
  font-weight: 700;
  margin-bottom: 20px;
}
.eatery-visit button {
  margin-top: 25px;
}
.order-layout {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 60px;
  margin-top: 35px;
}
.menu-categories {
  margin-bottom: 15px;
}
.menu-categories button {
  border-radius: 25px;
  background: transparent;
  font-size: 13px;
}
.menu-categories button[aria-pressed='true'] {
  background: var(--accent);
  color: #fff4d7;
  outline: 0;
}
.food-tag {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: block;
  margin-bottom: 9px;
}
.order-basket {
  background: #eecb68;
  padding: 30px;
  position: sticky;
  top: 20px;
  align-self: start;
}
.order-basket h2 {
  margin: 20px 0 25px;
  font-size: 31px;
}
.empty-basket {
  font-size: 14px;
  border: 1px dashed var(--ink);
  padding: 20px;
}
.basket-item {
  border-bottom: 1px solid var(--line);
  padding: 18px 0;
}
.basket-item > strong {
  font-size: 14px;
}
.basket-item .row {
  margin-top: 12px;
}
.quantity-controls {
  display: flex;
  gap: 15px;
  align-items: center;
}
.quantity-controls button {
  width: 35px;
  min-height: 35px;
  padding: 0;
  background: transparent;
}
.basket-total {
  display: flex;
  justify-content: space-between;
  font-size: 25px;
  padding: 25px 0;
}
.order-basket > .primary {
  width: 100%;
  font-size: 12px;
}
.order-basket > p:last-child {
  font-size: 11px;
  margin-top: 20px;
}
@media (max-width: 760px) {
  .eatery-strip {
    padding: 8px 22px;
    font-size: 10px;
  }
  .eatery-strip > span {
    display: none;
  }
  .eatery-header .text-link {
    display: none;
  }
  .eatery-header .primary {
    font-size: 11px;
    padding: 9px;
  }
  .eatery-logo {
    font-size: 19px;
  }
  .eatery-logo span {
    font-size: 7px;
  }
  .eatery-hero h1 {
    font-size: clamp(2.1rem, 9vw, 3.3rem);
    margin-bottom: 25px;
  }
  .food-hero {
    margin-left: 0;
  }
  .food-hero img {
    height: 290px;
  }
  .hours-badge {
    width: 105px;
    height: 105px;
    font-size: 13px;
    right: 0;
    top: -12px;
  }
  .hours-badge span {
    font-size: 8px;
  }
  .food-caption {
    display: block;
  }
  .food-caption .primary {
    margin-top: 23px;
  }
  .menu-line {
    gap: 15px;
  }
  .menu-line h3,
  .menu-line h2 {
    font-size: 20px;
  }
  .menu-no {
    display: none;
  }
  .menu-line > b {
    font-size: 21px;
  }
  .menu-line button {
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    font-size: 12px;
  }
  .order-layout {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .order-basket {
    position: static;
  }
  .order-layout .menu-line p {
    font-size: 12px;
  }
}
</style>
