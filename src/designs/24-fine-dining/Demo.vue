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
    .filter((k) => k.startsWith('design-library:24:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const vegetarian = ref(false),
  date = ref('2026-11-07'),
  party = ref('2'),
  time = ref('19:00'),
  confirmed = ref(false);
const menu = [
  {
    course: 'TO BEGIN',
    name: 'Roast squash, cultured cream',
    desc: 'Toasted seeds, sage, a little sharp apple.',
    price: 12,
    veg: true,
  },
  {
    course: 'FROM THE HEARTH',
    name: 'Market fish, brown butter',
    desc: 'New potatoes, sea vegetables, preserved lemon.',
    price: 28,
    veg: false,
  },
  {
    course: 'FROM THE GARDEN',
    name: 'Mushrooms on the ember',
    desc: 'Barley, smoked onion, winter leaves.',
    price: 24,
    veg: true,
  },
  {
    course: 'SOMETHING SWEET',
    name: 'Orchard apple tart',
    desc: 'Warm spice, oat crumble, vanilla cream.',
    price: 10,
    veg: true,
  },
];
</script>
<template>
  <div class="specimen" :class="{ entry: state === 'start' }">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <a :href="href('start')" @click.prevent="go('start')">Ember <i>&</i> Orchard</a>
      <nav>
        <button @click="go('start')">The menu</button><button @click="go('visit')">Visit us</button
        ><button @click="go('reserve')">Reservations</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><aside class="service-rail">
          <p class="eyebrow">NORTHBANK / ORCHARD LANE</p>
          <svg viewBox="0 0 120 190" aria-hidden="true">
            <path d="M55 180Q50 95 82 15" stroke="currentColor" stroke-width="2" fill="none" />
            <g fill="none" stroke="currentColor" stroke-width="1.5">
              <path
                d="M60 145Q8 135 18 110Q50 112 60 145ZM60 135Q108 120 104 95Q72 98 60 135ZM65 108Q20 95 28 72Q58 77 65 108ZM70 85Q112 70 105 50Q80 55 70 85ZM76 59Q40 45 49 28Q73 33 76 59Z"
              />
            </g>
          </svg>
          <p>Wednesday–Saturday<br />17:30–22:00<br /><br />Sunday lunch<br />12:00–16:00</p>
          <button @click="go('reserve')">Reserve a table ↗</button
          ><button @click="go('visit')">Directions &amp; private dining</button>
        </aside>
        <section class="menu">
          <div class="menu-title">
            <p class="eyebrow">November 2026 / seasonal menu</p>
            <h1>The autumn table</h1>
            <p>A short menu, following the season.</p>
            <label><input type="checkbox" v-model="vegetarian" />Show vegetarian dishes</label>
          </div>
          <article v-for="dish in menu.filter((d) => !vegetarian || d.veg)" :key="dish.name">
            <small>{{ dish.course }}</small>
            <div>
              <h3>{{ dish.name }}</h3>
              <span>£{{ dish.price }}</span>
            </div>
            <p>{{ dish.desc }} <em v-if="dish.veg">Vegetarian</em></p>
          </article>
          <p class="menu-note">
            Please tell us about dietary requirements when making a sample reservation. All dishes,
            prices, and availability are fictional.
          </p>
        </section>
        <section class="plate-interlude">
          <figure>
            <img
              class=""
              src="/art/food.webp"
              alt="A carefully plated seafood dish with herbs and sauce"
              width="1200"
              height="900"
              loading="lazy"
            />
            <figcaption>A seasonal plate / illustrative food study</figcaption>
          </figure>
        </section>
        <section class="closing">
          <h2>Visit the restaurant</h2>
          <p>
            Wednesday–Saturday, 17:30–22:00<br />Sunday lunch, 12:00–16:00<br />14 Orchard Lane,
            fictional Northbank
          </p>
          <button @click="go('reserve')">Reserve a sample table →</button>
        </section></template
      >
      <section v-else-if="state === 'reserve'" class="reservation">
        <p class="eyebrow">Your table</p>
        <h1>Reserve a table</h1>
        <form v-if="!confirmed" @submit.prevent="confirmed = true">
          <label>Date<input type="date" v-model="date" min="2026-11-01" required /></label
          ><label
            >Party size<select v-model="party">
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>6</option>
            </select></label
          ><label
            >Time<select v-model="time">
              <option>17:30</option>
              <option>19:00</option>
              <option>20:30</option>
            </select></label
          >
          <p v-if="time === '19:00'" class="notice">
            19:00 is full in this sample. Try 17:30 or 20:30.
          </p>
          <button class="primary" :disabled="time === '19:00'">Confirm sample reservation</button
          ><small>No real table is reserved.</small>
        </form>
        <div v-else role="status">
          <h2>A table for {{ party }}.</h2>
          <p>
            Sample confirmation: {{ date }} at {{ time }}.<br />Reference EO-014. No booking has
            been sent.
          </p>
          <button @click="confirmed = false">Choose another time</button>
        </div>
      </section>
      <section v-else class="visit">
        <p class="eyebrow">Stay a little longer</p>
        <h1>Visit &amp; private dining</h1>
        <h2>Private dining</h2>
        <p>
          The orchard room seats up to twelve around one long table. A seasonal menu arrives in
          courses, leaving space for conversation.
        </p>
        <h2>Finding us</h2>
        <p>
          14 Orchard Lane, fictional Northbank. Step-free entry from the courtyard. The nearest bus
          stop is a two-minute walk away in this sample setting.
        </p>
        <button @click="go('reserve')">Try the reservation flow →</button>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Ember & Orchard · Fictional sample content · Design reference 24</span
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
  color: #321d23;
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
  padding: 32px 6%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  border-bottom: 1px solid #816267;
}
header > a {
  font: 24px 'Libre Baskerville';
  text-decoration: none;
}
header i {
  color: #dec192;
}
nav {
  display: flex;
  gap: 30px;
}
nav button {
  border: 0;
  background: none;
  color: #f4ebdc;
  font-size: 11px;
}
main {
  max-width: 1400px;
  margin: auto;
  padding: 0 7%;
}
.opening {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 80px;
  padding: 70px 0;
  align-items: center;
}
.opening h1 {
  font-size: 58px;
  line-height: 1.25;
  font-weight: 400;
  margin: 30px 0;
}
.opening p {
  font-size: 15px;
  line-height: 1.9;
}
.opening .eyebrow {
  font-size: 10px;
  color: #dec192;
}
.opening button {
  background: none;
  border: 0;
  border-bottom: 1px solid #dec192;
  color: #dec192;
  border-radius: 0;
  padding: 12px 0;
  font-size: 12px;
  margin-top: 20px;
}
.opening img {
  height: 480px;
  width: 100%;
  filter: brightness(0.9);
}
figcaption {
  font-size: 9px;
  color: #c3aaa5;
}
.menu {
  max-width: 780px;
  margin: 20px auto 60px;
}
.menu-title {
  text-align: center;
  border-top: 1px solid #816267;
  padding: 45px 0;
}
.menu-title h2 {
  font-weight: 400;
  font-size: 40px;
}
.menu-title p {
  font-size: 13px;
}
.menu-title label {
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  margin-top: 25px;
}
.menu-title input {
  accent-color: #dec192;
}
.menu article {
  padding: 35px 0;
  border-bottom: 1px solid #816267;
}
.menu article > small {
  font-size: 9px;
  letter-spacing: 0.14em;
  color: #dec192;
}
.menu article > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  margin-top: 18px;
}
.menu h3 {
  font: 23px/1.5 'Libre Baskerville';
  margin: 0;
}
.menu article span {
  font-size: 14px;
}
.menu article p {
  font-size: 12px;
  color: #d1beba;
  margin: 12px 0 0;
}
.menu em {
  display: inline-block;
  font-style: normal;
  color: #dec192;
  margin-left: 10px;
  font-size: 10px;
}
.menu-note {
  font-size: 10px;
  color: #cbb5b1;
  margin-top: 30px;
}
.closing {
  text-align: center;
  border-top: 1px solid #816267;
  padding: 55px 0 80px;
}
.closing h2 {
  font-weight: 400;
  font-size: 37px;
}
.closing p {
  font-size: 13px;
  line-height: 2.2;
  margin: auto auto 25px;
}
.closing button {
  background: none;
  color: #f4ebdc;
  border-color: #94767a;
  font-size: 12px;
}
.reservation,
.visit {
  max-width: 850px;
  padding: 65px 0 120px;
}
.reservation h1,
.visit h1 {
  font-weight: 400;
  font-size: 57px;
  line-height: 1.3;
}
.reservation form {
  display: grid;
  gap: 22px;
  max-width: 550px;
}
.reservation label {
  font-size: 12px;
}
.reservation input,
.reservation select {
  border-color: #94767a;
  color-scheme: dark;
}
.reservation small {
  font-size: 10px;
}
.visit h2 {
  font-weight: 400;
  font-size: 29px;
  margin-top: 40px;
}
.visit p {
  font-size: 15px;
  line-height: 1.9;
}
.specimen-note {
  border-color: #816267;
}
.specimen-note button {
  border-color: #94767a;
  color: #f4ebdc;
}
@media (max-width: 650px) {
  header {
    display: block;
    padding: 25px 7%;
  }
  header > a {
    font-size: 23px;
  }
  nav {
    margin-top: 20px;
    gap: 25px;
  }
  nav button {
    padding: 0;
    font-size: 11px;
  }
  .opening {
    grid-template-columns: 1fr;
    gap: 35px;
    padding: 40px 0;
  }
  .opening h1 {
    font-size: 43px;
  }
  .opening img {
    height: 350px;
  }
  .menu h3 {
    font-size: 19px;
  }
  .menu article > div {
    align-items: start;
  }
  .menu-title h2 {
    font-size: 32px;
  }
  .reservation h1,
  .visit h1 {
    font-size: 40px;
  }
  .closing h2 {
    font-size: 30px;
  }
}
.eyebrow {
  font:
    italic 13px/1.7 'Libre Baskerville',
    Georgia,
    serif;
  letter-spacing: 0.02em;
  text-transform: none;
}

/* The entry is the experience itself; supporting routes retain its vocabulary. */

.entry header {
  max-width: 1350px;
  width: 100%;
  margin: auto;
  padding: 35px 4%;
}
.entry header > a {
  font-size: 25px;
}
.entry header nav {
  font-size: 12px;
}
.entry main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  column-gap: 65px;
  max-width: 1250px;
  width: 100%;
  padding: 30px 4% 70px;
  margin: auto;
}
.service-rail {
  grid-column: 1;
  grid-row: 1;
  padding: 25px 0;
  text-align: center;
  color: #dec192;
}
.service-rail > .eyebrow {
  font-size: 9px;
}
.service-rail svg {
  height: 175px;
  width: 110px;
  margin: 20px auto;
}
.service-rail p {
  font-size: 13px;
  line-height: 1.9;
}
.service-rail button {
  display: block;
  font-size: 11px;
  background: none;
  color: #f4ebdc;
  border: 0;
  border-bottom: 1px solid #9d866a;
  margin: 20px auto;
  padding: 10px 0;
}
.entry .menu {
  grid-column: 2;
  grid-row: 1/4;
  background: #f4ebdc;
  color: #321d23;
  padding: 45px 9%;
  margin: 0;
  max-width: none;
  border: 7px double #bda581;
}
.entry .menu-title {
  text-align: center;
  padding: 0 0 30px;
}
.entry .menu-title > .eyebrow {
  font-size: 10px;
}
.entry .menu-title h1 {
  font:
    34px/1.2 'Libre Baskerville',
    serif;
  font-weight: 400;
  letter-spacing: -0.04em;
  margin: 20px 0;
}
.entry .menu-title p {
  font-size: 12px;
}
.entry .menu-title label {
  font-size: 10px;
  color: #321d23;
}
.entry .menu article {
  padding: 30px 0;
  border-top: 1px solid #bda581;
}
.entry .menu article small {
  font-size: 9px;
  color: #69533e;
}
.entry .menu article h3 {
  font:
    22px/1.4 'Libre Baskerville',
    serif;
  font-weight: 400;
  letter-spacing: -0.02em;
  max-width: 18em;
}
.entry .menu article > div {
  gap: 25px;
}
.entry .menu article > div > span {
  font-size: 15px;
  white-space: nowrap;
}
.entry .menu article p {
  font-size: 12px;
  color: #61493d;
  line-height: 1.8;
}
.entry .menu article em {
  font-size: 10px;
}
.entry .menu-note {
  font-size: 10px;
  color: #61493d;
  line-height: 1.8;
}
.plate-interlude {
  grid-column: 1;
  grid-row: 2;
  align-self: start;
  margin-top: 25px;
}
.plate-interlude figure {
  margin: 0;
}
.plate-interlude img {
  width: 100%;
  height: 350px;
  object-fit: cover;
}
.plate-interlude figcaption {
  font-size: 8px;
  line-height: 1.6;
  margin-top: 12px;
  color: #dec192;
}
.entry .closing {
  grid-column: 1/3;
  padding: 60px 0 0;
}
.entry .closing h2 {
  font-size: 29px;
}
@media (max-width: 750px) {
  .entry header {
    padding: 25px 6%;
    gap: 20px;
  }
  .entry header > a {
    font-size: 22px;
  }
  .entry header nav {
    font-size: 10px;
    gap: 14px;
  }
  .entry main {
    display: flex;
    flex-direction: column;
    padding: 0 5% 50px;
  }
  .service-rail {
    order: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px 20px;
    text-align: left;
    padding: 15px 3% 25px;
  }
  .service-rail svg,
  .service-rail > .eyebrow {
    display: none;
  }
  .service-rail p {
    font-size: 10px;
    line-height: 1.5;
    margin: 0;
    flex: 1;
  }
  .service-rail button {
    font-size: 10px;
    margin: 0;
  }
  .service-rail button:last-child {
    width: 100%;
    text-align: left;
    border: 0;
  }
  .entry .menu {
    order: 2;
    padding: 30px 8%;
    border-width: 5px;
  }
  .entry .menu-title h1 {
    font-size: 28px;
  }
  .entry .menu-title > .eyebrow {
    font-size: 8px;
  }
  .entry .menu article {
    padding: 25px 0;
  }
  .entry .menu article h3 {
    font-size: 20px;
  }
  .entry .menu article > div {
    gap: 15px;
  }
  .entry .menu article > div > span {
    font-size: 13px;
  }
  .entry .menu article p {
    font-size: 11px;
  }
  .plate-interlude {
    order: 3;
    width: 65%;
    margin: 35px auto 0;
  }
  .plate-interlude img {
    height: 330px;
  }
  .entry .closing {
    order: 4;
    padding: 45px 3% 0;
  }
}
.entry .menu article p em {
  color: #76542f;
}
</style>
