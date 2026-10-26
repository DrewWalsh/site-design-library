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
    .filter((k) => k.startsWith('design-library:23:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const date = ref('7 November');
const stalls = [
  {
    name: 'Morning Loaf',
    type: 'THE BAKERS',
    desc: 'Long-fermented, early-rising, worth the crumbs.',
    color: '#b94a2d',
    items: ['Country sourdough', 'Olive focaccia', 'Cinnamon knot'],
    prices: [6, 5, 3],
  },
  {
    name: 'Earth & Hand',
    type: 'THE POTTERS',
    desc: 'Small-batch stoneware for everyday rituals.',
    color: '#315e9a',
    items: ['Breakfast bowl', 'Coffee cup', 'Little dish'],
    prices: [24, 18, 14],
  },
  {
    name: 'Green Corner',
    type: 'THE GROWERS',
    desc: 'Picked nearby. Brought here by the people who grew it.',
    color: '#4a7049',
    items: ['Autumn greens', 'Garden herbs', 'Seasonal squash'],
    prices: [4, 3, 5],
  },
];
const bag = useStored<Record<string, number>>('23:bag', {});
function add(name: string) {
  bag.value[name] = (bag.value[name] || 0) + 1;
  message.value = name + ' added for local collection.';
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>Saturday<br /><span>MARKET ☼</span></strong>
      <nav>
        <a href="#stalls">The stalls</a
        ><button @click="go('basket')">
          Your basket ({{ Object.values(bag).reduce((a, b) => a + b, 0) }})
        </button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="welcome">
          <p class="eyebrow">NORTHBANK SQUARE / MADE AROUND HERE</p>
          <h1>A good morning.<br />A very good market.</h1>
          <div class="row">
            <p>Meet the makers. Fill a bag.<br />Stay for another conversation.</p>
            <span class="grow"></span
            ><label
              >Market date<select v-model="date">
                <option>7 November</option>
                <option>14 November — no market</option>
                <option>21 November</option>
              </select></label
            >
          </div>
        </section>
        <p v-if="date.includes('no market')" class="notice">
          No market on 14 November. The stalls return on 21 November.
        </p>
        <div v-else id="stalls">
          <p v-if="message" role="status" class="message">{{ message }}</p>
          <section
            v-for="(stall, i) in stalls"
            :key="stall.name"
            class="stall"
            :style="{ '--stall': stall.color }"
          >
            <div class="sign">
              <p class="eyebrow">0{{ i + 1 }} / {{ stall.type }}</p>
              <h2>{{ stall.name }}</h2>
              <p>{{ stall.desc }}</p>
              <button
                @click="
                  selected = i;
                  go('vendor');
                "
              >
                Meet the maker ↗
              </button>
            </div>
            <div class="shelf">
              <article v-for="(item, j) in stall.items" :key="item">
                <div :class="['product-art', 'kind-' + i]">
                  <svg
                    viewBox="0 0 180 130"
                    role="img"
                    :aria-label="'Original illustration of ' + item"
                  >
                    <template v-if="i === 0">
                      <ellipse cx="90" cy="80" :rx="52 - j * 8" ry="30" fill="#b77a3b" />
                      <path
                        d="M65 62L80 80M85 56L100 76M105 61L120 81"
                        stroke="#f1c57b"
                        stroke-width="6"
                        stroke-linecap="round"
                      />
                    </template>
                    <template v-else-if="i === 1">
                      <ellipse cx="90" cy="58" rx="48" ry="15" fill="#c2baa0" />
                      <path
                        d="M42 58Q45 110 90 110Q135 110 138 58"
                        fill="#d1cbb8"
                        stroke="#8e8c7a"
                        stroke-width="2"
                      />
                      <ellipse cx="90" cy="58" rx="48" ry="15" fill="#b9b5a1" />
                    </template>
                    <template v-else>
                      <path
                        d="M90 110Q20 80 55 35Q90 35 90 90Q95 20 135 35Q150 75 90 110"
                        fill="#708950"
                      />
                      <path d="M90 110L65 55M90 110L125 50" stroke="#d4dca5" stroke-width="3" />
                    </template>
                  </svg>
                </div>
                <h3>{{ item }}</h3>
                <div class="row">
                  <span>£{{ stall.prices[j] }}</span
                  ><button @click="add(item)" :aria-label="'Add ' + item">Add +</button>
                </div>
              </article>
            </div>
          </section>
        </div>
        <section class="visit">
          <h2>See you in the square.</h2>
          <p>
            Saturdays, 09:00–14:00 · Northbank Square<br />Step-free paths · Bring a bag · Fictional
            market, sample prices
          </p>
        </section></template
      >
      <section v-else-if="state === 'vendor'" class="vendor">
        <p class="eyebrow">STALL 0{{ selected + 1 }} / {{ stalls[selected].type }}</p>
        <h1>{{ stalls[selected].name }}</h1>
        <p>{{ stalls[selected].desc }}</p>
        <h2>Made with a little patience.</h2>
        <p>
          We’re a small fictional team who care about the things people use every day. Our stall
          changes with the season, but the conversation is always part of it.
        </p>
        <p>
          Collect from stall 0{{ selected + 1 }} between 09:00 and 14:00 on your chosen market date.
        </p>
        <button @click="go('start')">Back to the stalls →</button>
      </section>
      <section v-else class="basket">
        <h1>Your market morning.</h1>
        <p>Sample collection: {{ date }}</p>
        <section v-for="stall in stalls" :key="stall.name">
          <h2>{{ stall.name }}</h2>
          <div
            v-for="item in stall.items.filter((item) => bag[item])"
            :key="item"
            class="basketline"
          >
            <b>{{ item }}</b
            ><span>{{ bag[item] }} selected</span><button @click="delete bag[item]">Remove</button>
          </div>
          <p v-if="!stall.items.some((item) => bag[item])">Nothing from this stall yet.</p>
        </section>
        <p>All selections stay in your browser. No order is sent.</p>
        <button @click="go('start')">Continue browsing →</button>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Saturday Market · Fictional sample content · Design reference 23</span
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 5%;
  border-bottom: 2px solid;
  gap: 25px;
}
header strong {
  font: 22px/1.1 'Space Grotesk';
  letter-spacing: -0.05em;
}
header strong span {
  font-size: 30px;
  letter-spacing: -0.03em;
}
nav {
  display: flex;
  gap: 30px;
  align-items: center;
  font-size: 12px;
}
nav button {
  background: none;
  border: 0;
  font-size: 12px;
}
main {
  padding: 0 5% 60px;
  max-width: 1500px;
  margin: auto;
}
.welcome {
  padding: 50px 0 45px;
}
.welcome h1 {
  font-size: 68px;
  line-height: 1.05;
  font-weight: 600;
  margin: 25px 0;
}
.welcome p {
  font-size: 15px;
}
.welcome label {
  font-size: 11px;
}
.welcome select {
  background: transparent;
  font-size: 13px;
}
.stall {
  display: grid;
  grid-template-columns: 290px 1fr;
  border: 2px solid var(--stall);
  margin-bottom: 35px;
}
.sign {
  background: var(--stall);
  color: #fff9e9;
  padding: 30px;
}
.sign h2 {
  font-size: 39px;
  line-height: 1.1;
  margin: 30px 0 20px;
}
.sign p {
  font-size: 13px;
}
.sign .eyebrow {
  font-size: 10px;
}
.sign button {
  border: 1px solid #fff8;
  background: transparent;
  color: inherit;
  font-size: 11px;
  margin-top: 25px;
}
.shelf {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 25px;
}
.product-art {
  background: #f1e4c8;
  height: 170px;
  display: grid;
  place-items: center;
}
.product-art svg {
  width: 90%;
  height: 100%;
}
.kind-1 {
  background: #e7e8df;
}
.kind-2 {
  background: #e4e8cf;
}
.shelf h3 {
  font: 17px 'Space Grotesk';
  margin: 18px 0;
}
.shelf .row {
  justify-content: space-between;
  font-size: 13px;
}
.shelf button {
  background: none;
  border: 1px solid var(--stall);
  font-size: 11px;
  padding: 7px 12px;
}
.visit {
  padding: 35px 0;
  border-top: 2px solid;
}
.visit h2 {
  font-size: 40px;
}
.visit p {
  font-size: 14px;
}
.vendor,
.basket {
  padding: 60px 0 130px;
  max-width: 1000px;
}
.vendor > p {
  font-size: 18px;
  line-height: 1.8;
}
.basket > section {
  padding: 25px 0;
  border-top: 1px solid var(--line);
}
.basket h2 {
  font-size: 28px;
}
.basketline {
  display: flex;
  gap: 20px;
  align-items: center;
  font-size: 13px;
  margin: 12px 0;
}
.basketline b {
  flex: 1;
}
.basketline button {
  font-size: 11px;
}
.basket p {
  font-size: 13px;
}
@media (max-width: 950px) {
  .stall {
    grid-template-columns: 220px 1fr;
  }
  .sign {
    padding: 25px;
  }
  .sign h2 {
    font-size: 31px;
  }
  .shelf {
    gap: 12px;
    padding: 20px;
  }
  .product-art {
    height: 140px;
  }
  .shelf h3 {
    font-size: 15px;
  }
}
@media (max-width: 600px) {
  header {
    padding: 20px;
  }
  header strong {
    font-size: 17px;
  }
  header strong span {
    font-size: 23px;
  }
  nav {
    gap: 12px;
    font-size: 10px;
  }
  nav button {
    font-size: 10px;
  }
  .welcome {
    padding: 35px 0;
  }
  .welcome h1 {
    font-size: 45px;
  }
  .welcome > .row {
    display: block;
  }
  .welcome label {
    margin-top: 25px;
  }
  .stall {
    display: block;
  }
  .sign {
    padding: 25px;
  }
  .sign h2 {
    margin: 18px 0;
    font-size: 35px;
  }
  .sign button {
    margin-top: 10px;
  }
  .shelf {
    gap: 12px;
    grid-template-columns: 1fr;
  }
  .shelf article {
    display: grid;
    grid-template-columns: 105px 1fr;
    gap: 5px 20px;
    align-items: center;
  }
  .product-art {
    height: 100px;
    grid-row: span 2;
  }
  .shelf h3 {
    margin: 5px 0;
    font-size: 18px;
  }
  .shelf .row {
    justify-content: space-between;
  }
  .visit h2 {
    font-size: 32px;
  }
}
</style>
