<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useSpecimen } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const staff = [
  {
    name: 'Jules',
    role: 'Short cuts & texture',
    photo:
      'https://drew-site-design-library.t3.tigrisfiles.io/assets/commercial/7083be1d5d4da811-barber-portrait-1.webp',
    days: ['10:00', '11:30', '15:00'],
  },
  {
    name: 'Robin',
    role: 'Classic cuts & beards',
    photo:
      'https://drew-site-design-library.t3.tigrisfiles.io/assets/commercial/8d71f69f35a14a65-barber-portrait-2.webp',
    days: ['09:30', '13:00', '16:30'],
  },
];
const stylist = ref(0),
  service = ref('Cut & finish'),
  day = ref('Thursday 12 Nov'),
  slot = ref(''),
  name = ref(''),
  email = ref(''),
  error = ref('');
const prices: Record<string, number> = { 'Cut & finish': 38, 'Clipper cut': 24, 'Cut & beard': 52 };
watch([stylist, day], () => {
  slot.value = '';
  error.value = '';
});
function book() {
  if (!slot.value) {
    error.value = 'Choose an available time before continuing.';
    return;
  }
  go('confirmation');
}
async function startBooking(i: number, time: string) {
  stylist.value = i;
  await nextTick();
  slot.value = time;
  go('book');
}
</script>
<template>
  <div class="specimen" :class="{ entry: state === 'start' }">
    <a class="skip" href="#content">Skip to content</a>
    <header class="studio-header wrap">
      <a :href="href('start')" class="studio-logo">COMMON<span>BARBER STUDIO / NORTHBANK</span></a>
      <nav class="row">
        <a :href="href('start') + '#people'">Our people</a
        ><a :href="href('start') + '#menu'">The menu</a
        ><button @click="go('book')">Find your time ↗</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section id="people" class="people wrap section">
          <div class="section-heading">
            <h1>Choose your barber.</h1>
            <p>
              Thursday 12 November · Sample appointments. Choose a person and an available time.
              Portraits are AI-generated illustrations of fictional staff.
            </p>
          </div>
          <div class="two">
            <article v-for="(person, i) in staff" :key="person.name">
              <img
                class="photo"
                :src="person.photo"
                alt="AI-generated portrait of a fictional barber"
              />
              <div class="person-info">
                <div>
                  <h3>{{ person.name }}</h3>
                  <p>{{ person.role }}</p>
                </div>
                <button
                  @click="
                    stylist = i;
                    go('book');
                  "
                >
                  Book with {{ person.name }} ↗
                </button>
              </div>
              <div class="first-times">
                <span>Thursday 12 Nov</span
                ><button
                  v-for="time in person.days"
                  :key="time"
                  :aria-label="'Book ' + person.name + ' at ' + time"
                  @click="startBooking(i, time)"
                >
                  {{ time }} ↗
                </button>
              </div>
            </article>
          </div>
        </section>
        <section id="menu" class="menu-band">
          <div class="wrap menu-grid">
            <div>
              <p class="eyebrow">The menu</p>
              <h2>Good work.<br />Straight prices.</h2>
              <p>Every appointment starts with a conversation. No surprise extras.</p>
            </div>
            <div>
              <div class="service-line" v-for="(price, title, i) in prices" :key="title">
                <span>0{{ Number(i) + 1 }}</span>
                <div>
                  <h3>{{ title }}</h3>
                  <p>
                    {{ title === 'Clipper cut' ? '30 minutes' : '45–60 minutes' }} · consultation
                    included
                  </p>
                </div>
                <b>&#36;{{ price }}</b>
              </div>
              <p class="muted">Sample pricing. Please arrive five minutes before your time.</p>
            </div>
          </div>
        </section>
        <section class="wrap section studio-details">
          <figure>
            <img
              class="photo"
              src="https://drew-site-design-library.t3.tigrisfiles.io/assets/commercial/7ed7f8b3e71dc836-barber-work.webp"
              alt="Barber working carefully on a haircut in a studio"
            />
            <figcaption>
              Technique, texture, and a considered finish · illustrative studio photograph
            </figcaption>
          </figure>
          <h2>A regular place<br />for a new look.</h2>
          <div>
            <p>22 Foundry Lane, Northbank<br />Tuesday–Friday 9–7 · Saturday 9–4</p>
            <p>
              Quiet appointments available on request.<br />Step-free entrance. Everyone welcome.
            </p>
            <button class="text-link" @click="go('book')">Find a chair →</button>
          </div>
        </section></template
      >
      <section v-else class="wrap state-page">
        <button class="back text-link" @click="go('start')">← Back to the studio</button>
        <h1>{{ state === 'book' ? 'Find your time.' : 'A time to look forward to.' }}</h1>
        <div class="booking-layout">
          <aside class="booking-person">
            <img :src="staff[stylist].photo" class="photo" alt="Illustrative barber portrait" />
            <p class="eyebrow">Your barber</p>
            <h2>{{ staff[stylist].name }}</h2>
            <p>{{ staff[stylist].role }}</p>
            <p class="muted">Sample availability / November 2026</p>
          </aside>
          <form v-if="state === 'book'" class="form" @submit.prevent="book">
            <fieldset>
              <legend>01 / Choose your barber</legend>
              <label v-for="(person, i) in staff" :key="person.name"
                ><input type="radio" v-model="stylist" :value="i" />{{ person.name }} ·
                {{ person.role }}</label
              >
            </fieldset>
            <label
              >02 / Your service<select v-model="service">
                <option v-for="(price, title) in prices" :key="title">{{ title }}</option>
              </select></label
            ><label
              >03 / Day<select v-model="day">
                <option>Thursday 12 Nov</option>
                <option>Friday 13 Nov</option>
              </select></label
            >
            <fieldset class="time-slots">
              <legend>Available times</legend>
              <label v-for="time in staff[stylist].days" :key="time"
                ><input type="radio" v-model="slot" :value="time" />{{ time }}</label
              ><span class="unavailable">12:00 · booked</span>
            </fieldset>
            <p v-if="error" role="alert">{{ error }}</p>
            <div class="two">
              <label>Your name<input required v-model="name" /></label
              ><label>Email<input type="email" required v-model="email" /></label>
            </div>
            <button class="primary">Review sample booking · &#36;{{ prices[service] }}</button>
          </form>
          <div v-else class="confirmation" role="status">
            <p class="eyebrow">Sample booking / c-1204</p>
            <h2>{{ service }} with {{ staff[stylist].name }}</h2>
            <p>{{ day }} · {{ slot || '10:00' }} · &#36;{{ prices[service] }}</p>
            <p>
              {{ name || 'Your name' }}, this local demonstration has not reserved an appointment. A
              real booking would be confirmed by the studio.
            </p>
            <button @click="go('book')">Change the details</button>
          </div>
        </div>
      </section>
    </main>
    <footer class="sample-footer">
      <span>COMMON / Barber studio · Fictional design reference 53.</span
      ><span>Sample data and illustrative images. Interactions stay on this page.</span
      ><a :href="href('start')">Reset sample</a>
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/space-grotesk.woff2') format('woff2');
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

.studio-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  padding-top: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid var(--ink);
}
.studio-logo {
  font: 700 35px/0.9 var(--heading);
  letter-spacing: -0.06em;
  text-decoration: none;
}
.studio-logo span {
  display: block;
  font: 10px/2 var(--body);
  letter-spacing: 0.16em;
  margin-top: 8px;
}
.studio-header nav {
  font-size: 13px;
}
.studio-header button {
  background: transparent;
  border-color: var(--ink);
}
.studio-hero {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 55px;
  padding-top: 55px;
  padding-bottom: 55px;
}
.studio-hero h1 {
  margin: 22px 0 28px;
  font-size: clamp(3.2rem, 5.4vw, 5.3rem);
  line-height: 1.04;
}
.studio-hero h1 em {
  font:
    italic 1em/1.1 Georgia,
    serif;
  font-weight: 400;
}
.studio-hero .primary {
  margin-top: 30px;
}
.studio-hero img {
  height: 515px;
  object-position: center;
}
.people {
  border-top: 1px solid var(--ink);
}
.people article img {
  height: 360px;
  object-position: center 30%;
  filter: saturate(0.6);
}
.person-info {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px 0;
}
.person-info h3 {
  font-size: 32px;
}
.person-info p {
  font-size: 13px;
}
.person-info button {
  align-self: center;
  background: transparent;
}
.menu-band {
  background: #292322;
  color: #f7ebe0;
  padding: 65px 0;
}
.menu-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 90px;
}
.menu-grid h2 {
  margin: 18px 0 25px;
}
.menu-grid > div > p {
  max-width: 35ch;
}
.service-line {
  display: flex;
  align-items: center;
  gap: 25px;
  padding: 22px 0;
  border-bottom: 1px solid #756c65;
}
.service-line > div {
  flex: 1;
}
.service-line > span {
  font: 12px 'IBM Plex Mono';
  color: #e8c1a4;
}
.service-line p {
  font-size: 13px;
  margin-top: 8px;
}
.service-line b {
  font-size: 28px;
}
.menu-grid .muted {
  margin-top: 25px;
}
.studio-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
}
.studio-details button {
  margin-top: 18px;
}
.booking-layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 65px;
}
.booking-person img {
  height: 300px;
  margin-bottom: 25px;
}
.booking-person h2 {
  margin: 12px 0;
}
.time-slots {
  grid-template-columns: repeat(2, 1fr);
}
.unavailable {
  padding: 6px;
  color: #645951;
  text-decoration: line-through;
  font-size: 14px;
}
@media (max-width: 760px) {
  .studio-header {
    align-items: start;
  }
  .studio-header nav > a {
    display: none;
  }
  .studio-header button {
    font-size: 12px;
  }
  .studio-hero,
  .menu-grid,
  .studio-details,
  .booking-layout {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .studio-hero {
    padding-top: 35px;
  }
  .studio-hero img {
    height: 340px;
  }
  .people article img {
    height: 350px;
  }
  .booking-person {
    display: grid;
    grid-template-columns: 95px 1fr;
    gap: 10px 20px;
  }
  .booking-person img {
    grid-row: span 4;
    height: 130px;
    margin: 0;
  }
  .booking-person h2 {
    margin: 0;
  }
  .booking-person p {
    font-size: 12px;
  }
  .person-info {
    flex-wrap: wrap;
  }
}

.eyebrow {
  font: 500 13px/1.5 var(--body);
  letter-spacing: 0;
  text-transform: none;
}

/* The entry is the experience itself; supporting routes retain its vocabulary. */
.entry .people {
  padding-top: 24px;
}
.entry .section-heading {
  align-items: end;
  margin-bottom: 20px;
}
.entry .people h1 {
  font-size: 32px;
  letter-spacing: -0.03em;
}
.entry .people .two {
  gap: 32px;
}
.entry .people article > .photo {
  height: 420px;
  object-position: 50% 32%;
}
.entry .person-info {
  padding: 16px 0;
}
.entry .person-info h3 {
  font-size: 44px;
}
.first-times {
  display: flex;
  align-items: center;
  gap: 8px;
  border-top: 1px solid var(--ink);
  padding: 14px 0;
  flex-wrap: wrap;
}
.first-times > span {
  font: 12px var(--heading);
  margin-right: auto;
}
.first-times button {
  font: 14px var(--heading);
}
.studio-details {
  grid-template-columns: 1fr 1fr 1fr !important;
}
.studio-details figure img {
  height: 280px;
  object-fit: cover;
}
.studio-details figcaption {
  font-size: 11px;
}
@media (max-width: 700px) {
  .entry .people {
    padding-top: 12px;
  }
  .entry .people .two {
    gap: 36px;
  }
  .entry .people article > .photo {
    height: 290px;
  }
  .entry .person-info h3 {
    font-size: 36px;
  }
  .entry .people h1 {
    font-size: 27px;
  }
  .entry .section-heading p {
    font-size: 13px;
  }
  .studio-details {
    grid-template-columns: 1fr !important;
  }
  .first-times > span {
    width: 100%;
  }
}
</style>
