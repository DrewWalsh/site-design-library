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
    .filter((k) => k.startsWith('design-library:28:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const arrival = ref('2026-11-06'),
  departure = ref('2026-11-08'),
  guests = ref('2');
const rooms = [
  {
    name: 'The garden room',
    price: 145,
    size: '24 m²',
    desc: 'Ground floor, quiet terrace, and a view into the orchard.',
  },
  {
    name: 'The lake room',
    price: 185,
    size: '32 m²',
    desc: 'An upper-floor room with a long view across the water.',
  },
  {
    name: 'The studio',
    price: 210,
    size: '40 m²',
    desc: 'A little more room to settle in, with a separate sitting area.',
  },
];
const unavailable = computed(
  () => arrival.value >= departure.value || arrival.value === '2026-11-14',
);
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <a :href="href('start')" @click.prevent="go('start')">ALDER HOUSE</a>
      <nav>
        <a href="#staying">Staying</a><a href="#exploring">Exploring</a
        ><button @click="go('rooms')">Plan your stay</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="arrival">
          <img
            class=""
            src="/art/lake.webp"
            alt="A calm lake surrounded by wooded hills"
            width="1200"
            height="900"
            loading="lazy"
          />
          <div>
            <p class="eyebrow">AT THE EDGE OF THE WATER</p>
            <h1>Somewhere<br />to arrive.</h1>
            <p>A small house. A long view.<br />A little time that belongs to you.</p>
          </div>
        </section>
        <form class="booking" @submit.prevent="go('rooms')">
          <label>Arrival<input type="date" v-model="arrival" required /></label
          ><label>Departure<input type="date" v-model="departure" required /></label
          ><label
            >Guests<select v-model="guests">
              <option>1</option>
              <option>2</option>
            </select></label
          ><button class="primary">Find a sample room →</button>
        </form>
        <section id="staying" class="staying">
          <div>
            <p class="eyebrow">A HOUSE, NOT A HURRY</p>
            <h2>Unpack.<br />Make yourself<br />comfortable.</h2>
            <p>
              Three kinds of room, each with a good bed, somewhere to sit, and a view worth looking
              up for.
            </p>
            <button @click="go('rooms')">Explore the rooms ↗</button>
          </div>
          <figure>
            <img
              class=""
              src="/art/interior.webp"
              alt="A warmly lit room with a mustard armchair and a wooden floor"
              width="1200"
              height="900"
              loading="lazy"
            />
            <figcaption>Illustrative interior study. Alder House is a fictional hotel.</figcaption>
          </figure>
        </section>
        <section id="exploring" class="exploring">
          <p class="eyebrow">BEYOND THE FRONT DOOR</p>
          <h2>Follow the shore.<br />See where the day goes.</h2>
          <p>
            Walk the fictional lake path, find a quiet place to read, or return in time for an early
            supper. There is no itinerary to complete.
          </p>
          <div class="row">
            <span>01 / Lake walks</span><span>02 / The orchard</span
            ><span>03 / A table together</span>
          </div>
        </section></template
      >
      <section v-else-if="state === 'rooms'" class="rooms">
        <p class="eyebrow">PLAN YOUR STAY / SAMPLE AVAILABILITY</p>
        <h1>Room to settle in.</h1>
        <form
          class="booking"
          @submit.prevent="message = 'Availability updated for the sample dates.'"
        >
          <label>Arrival<input type="date" v-model="arrival" required /></label
          ><label>Departure<input type="date" v-model="departure" required /></label
          ><button>Update dates</button>
        </form>
        <p v-if="message" role="status">{{ message }}</p>
        <div v-if="unavailable" class="notice">
          <h2>No rooms for these dates.</h2>
          <p>
            {{
              arrival >= departure
                ? 'Departure must be after arrival.'
                : '14 November is full in this fictional fixture. Try 6–8 November.'
            }}
          </p>
        </div>
        <article v-else v-for="(room, i) in rooms" :key="room.name">
          <div>
            <h2>{{ room.name }}</h2>
            <p>{{ room.desc }}</p>
            <small>{{ room.size }} · Sleeps 2 · Breakfast included</small>
          </div>
          <div>
            <strong>£{{ room.price }}</strong
            ><span>per night / sample</span
            ><button
              @click="
                selected = i;
                go('summary');
              "
            >
              Choose this room →
            </button>
          </div>
        </article>
        <p class="fine">
          Fictional rooms, prices, and policies. Cancellations would be free up to 48 hours before
          arrival in this sample offer.
        </p>
      </section>
      <section v-else class="summary">
        <p class="eyebrow">YOUR SAMPLE STAY</p>
        <h1>{{ rooms[selected].name }}</h1>
        <p>
          {{ arrival }} → {{ departure }}<br />{{ guests }} guests · £{{ rooms[selected].price }}
          per night
        </p>
        <h2>A few useful details.</h2>
        <p>
          Check-in from 15:00. Breakfast 07:30–10:00. Please mention any access needs before a real
          booking.
        </p>
        <p class="notice">
          This is a booking summary demonstration. No reservation, payment, or confirmation email
          has been created.
        </p>
        <button @click="go('rooms')">Choose another room</button>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Alder House · Fictional sample content · Design reference 28</span
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 6%;
  gap: 30px;
}
header > a {
  font: 22px 'Libre Baskerville';
  letter-spacing: 0.07em;
  text-decoration: none;
}
nav {
  display: flex;
  gap: 35px;
  align-items: center;
  font-size: 11px;
}
nav button {
  background: none;
  border: 0;
  font-size: 11px;
}
.arrival {
  height: 620px;
  position: relative;
  color: white;
  background: #304535;
}
.arrival > img {
  width: 100%;
  height: 100%;
  filter: brightness(0.53);
  object-position: center 55%;
}
.arrival > div {
  position: absolute;
  top: 90px;
  left: 9%;
}
.arrival h1 {
  font-size: 86px;
  line-height: 1.16;
  font-weight: 400;
  margin: 30px 0;
}
.arrival p:not(.eyebrow) {
  font-size: 17px;
  line-height: 1.8;
}
.booking {
  display: flex;
  gap: 25px;
  align-items: end;
  background: #e7e8db;
  padding: 30px 8%;
  justify-content: center;
}
.booking label {
  font-size: 10px;
  flex: 1;
}
.booking input,
.booking select {
  background: #f8f7ee;
  border-color: #bfc7b1;
  font-size: 12px;
}
.booking button {
  font-size: 12px;
  padding: 14px 22px;
  white-space: nowrap;
}
.staying {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 100px;
  max-width: 1300px;
  margin: auto;
  padding: 90px 7%;
  align-items: center;
}
.staying h2 {
  font-size: 44px;
  line-height: 1.4;
  font-weight: 400;
}
.staying p {
  font-size: 14px;
  line-height: 1.9;
}
.staying button {
  font-size: 12px;
  background: none;
  border: 0;
  padding: 10px 0;
  border-bottom: 1px solid;
  border-radius: 0;
}
.staying img {
  height: 520px;
  width: 100%;
}
.staying figcaption {
  font-size: 9px;
}
.exploring {
  background: #dfe4d5;
  padding: 65px 10% 80px;
}
.exploring h2 {
  font-size: 43px;
  font-weight: 400;
  line-height: 1.4;
}
.exploring p {
  font-size: 15px;
  line-height: 1.9;
}
.exploring .row {
  margin-top: 35px;
  gap: 50px;
  font-size: 11px;
}
.rooms,
.summary {
  max-width: 1150px;
  margin: auto;
  padding: 60px 6% 120px;
}
.rooms h1,
.summary h1 {
  font-size: 60px;
  font-weight: 400;
}
.rooms .booking {
  padding: 25px;
  margin: 35px 0;
}
.rooms article {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  border-top: 1px solid var(--line);
  padding: 35px 0;
}
.rooms article h2 {
  font-size: 30px;
  font-weight: 400;
}
.rooms article p {
  font-size: 14px;
}
.rooms article small {
  font-size: 10px;
}
.rooms article > div:last-child {
  text-align: right;
}
.rooms article strong {
  font: 30px 'Libre Baskerville';
  display: block;
}
.rooms article span {
  font-size: 10px;
  display: block;
  margin: 10px 0;
}
.rooms article button {
  font-size: 11px;
  background: none;
  margin-top: 15px;
}
.fine {
  font-size: 10px;
  color: #63715d;
}
.summary > p {
  font-size: 18px;
  line-height: 2;
}
.summary h2 {
  font-weight: 400;
  margin-top: 50px;
}
.summary .notice {
  font-size: 13px;
}
@media (max-width: 700px) {
  header {
    padding: 25px 5%;
  }
  header > a {
    font-size: 17px;
    flex-shrink: 0;
  }
  nav {
    gap: 15px;
    font-size: 10px;
    flex-wrap: wrap;
    justify-content: end;
  }
  nav button {
    font-size: 10px;
  }
  .arrival {
    height: 570px;
  }
  .arrival > div {
    top: 75px;
    left: 7%;
  }
  .arrival h1 {
    font-size: clamp(35px, 10.5vw, 48px);
  }
  .arrival p:not(.eyebrow) {
    font-size: 15px;
  }
  .booking {
    flex-wrap: wrap;
    gap: 15px;
    padding: 25px 6%;
  }
  .booking label {
    min-width: 40%;
  }
  .booking button {
    width: 100%;
  }
  .staying {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 50px 7%;
  }
  .staying h2 {
    font-size: 38px;
  }
  .staying img {
    height: 400px;
  }
  .exploring {
    padding: 45px 7%;
  }
  .exploring h2 {
    font-size: 34px;
  }
  .exploring .row {
    gap: 20px;
    font-size: 10px;
  }
  .rooms h1,
  .summary h1 {
    font-size: 42px;
  }
  .rooms article {
    display: block;
  }
  .rooms article > div:last-child {
    text-align: left;
    margin-top: 25px;
  }
  .rooms article h2 {
    font-size: 28px;
  }
}
</style>
