<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useSpecimen } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const layouts = [
  {
    name: 'Banquet',
    capacity: 72,
    desc: 'Round tables, room to circulate, and a shared focal point.',
  },
  {
    name: 'Theatre',
    capacity: 120,
    desc: 'Rows facing the stage for talks, presentations, and performances.',
  },
  {
    name: 'Workshop',
    capacity: 36,
    desc: 'Working tables with space for materials and collaboration.',
  },
];
const layout = ref(0),
  guests = ref(60),
  event = ref('Celebration'),
  date = ref('2026-12-05'),
  name = ref(''),
  email = ref(''),
  sent = ref(false),
  error = ref('');
function submit() {
  if (!Number.isInteger(guests.value) || guests.value < 1) {
    error.value = 'Enter a whole number of guests, starting at 1.';
    return;
  }
  if (guests.value > layouts[layout.value].capacity) {
    error.value =
      'This guest count exceeds the selected layout. Choose another arrangement or reduce the number.';
    return;
  }
  error.value = '';
  sent.value = true;
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header class="assembly-header wrap">
      <a class="assembly-logo" :href="href('start')">The Assembly<br /><em>Rooms</em></a>
      <nav class="row">
        <button class="text-link" @click="go('plan')">Explore the space</button
        ><a :href="href('start') + '#packages'">Event packages</a
        ><button class="primary" @click="go('enquiry')">Plan a gathering</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="assembly-intro wrap">
          <p class="eyebrow">ROOM FOR YOUR KIND OF GATHERING.</p>
          <h1>Bring people together.<br />We’ll make room.</h1>
          <div class="intro-caption">
            <p>
              Weddings, conversations, workshops, and the occasions that deserve a place of their
              own.
            </p>
            <button class="text-link" @click="go('plan')">Start with the floorplan →</button>
          </div>
        </section>
        <section class="venue-stage wrap">
          <figure>
            <img
              class="photo"
              src="https://drew-site-design-library.t3.tigrisfiles.io/assets/commercial/de6e2ac450597dc1-venue.webp"
              alt="Long reception tables arranged inside an event hall"
            />
            <figcaption>
              Illustrative event space · photography demonstrates atmosphere, not an actual venue
            </figcaption>
          </figure>
          <aside>
            <span class="eyebrow">THE MAIN HALL</span>
            <h2>One room.<br />Many possibilities.</h2>
            <dl>
              <div>
                <dt>Floor area</dt>
                <dd>180 m²</dd>
              </div>
              <div>
                <dt>Theatre</dt>
                <dd>Up to 120</dd>
              </div>
              <div>
                <dt>Banquet</dt>
                <dd>Up to 72</dd>
              </div>
              <div>
                <dt>Workshop</dt>
                <dd>Up to 36</dd>
              </div>
            </dl>
            <button class="primary" @click="go('plan')">Arrange the room →</button>
          </aside>
        </section>
        <section class="wrap section">
          <div class="section-heading">
            <h2>The details that<br />make a gathering work.</h2>
            <p>Capacity depends on the layout. Show visitors what changes when the room changes.</p>
          </div>
          <div class="three venue-details">
            <article>
              <span>01</span>
              <h3>Arrival &amp; access</h3>
              <p>
                Ground-level entrance, reception area, and a quiet side room. Describe accessible
                facilities precisely in a live venue.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Food &amp; service</h3>
              <p>
                Space for a catering partner and a separate service route. Agree menus and suppliers
                alongside the room plan.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Sound &amp; light</h3>
              <p>
                Daylight, adjustable lighting, and a presentation screen. Technical requirements are
                confirmed with each event.
              </p>
            </article>
          </div>
        </section>
        <section id="packages" class="package-band">
          <div class="wrap">
            <p class="eyebrow">A STARTING POINT FOR PLANNING</p>
            <h2>Choose the shape of your day.</h2>
            <div class="package-lines">
              <div
                v-for="p in [
                  ['Day gathering', '09:00–17:00', 'From $850'],
                  ['Evening celebration', '17:00–23:00', 'From $1,250'],
                  ['Full day', '09:00–23:00', 'From $1,800'],
                ]"
                :key="p[0]"
              >
                <h3>{{ p[0] }}</h3>
                <p>{{ p[1] }}</p>
                <b>{{ p[2] }}</b
                ><button
                  @click="
                    event = p[0];
                    go('enquiry');
                  "
                  :aria-label="'Enquire about ' + p[0]"
                >
                  Enquire ↗
                </button>
              </div>
            </div>
            <p class="muted">
              Sample room-hire prices only. Catering, staffing, technical support, and tax are
              quoted separately.
            </p>
          </div>
        </section></template
      >
      <section v-else class="wrap state-page">
        <button class="back text-link" @click="go('start')">← The Assembly Rooms</button>
        <h1>
          {{ state === 'plan' ? 'Picture your gathering.' : 'Tell us what you’re imagining.' }}
        </h1>
        <div class="room-planner">
          <div class="floorplan-panel">
            <div class="row layout-options">
              <button
                v-for="(l, i) in layouts"
                :key="l.name"
                :aria-pressed="layout === i"
                @click="
                  layout = i;
                  error = '';
                "
              >
                {{ l.name }}
              </button>
            </div>
            <svg
              viewBox="0 0 600 420"
              role="img"
              :aria-label="
                layouts[layout].name + ' room layout, capacity ' + layouts[layout].capacity
              "
            >
              <rect
                x="25"
                y="25"
                width="550"
                height="370"
                fill="#faf5ec"
                stroke="#764259"
                stroke-width="4"
              />
              <rect x="225" y="26" width="150" height="50" fill="#d3bcc7" stroke="#764259" />
              <text x="300" y="57" text-anchor="middle" fill="#463442" font-size="13">
                STAGE / PRESENTATION
              </text>
              <g v-if="layout === 0" fill="#e3d6bb" stroke="#764259">
                <circle
                  v-for="n in 6"
                  :key="n"
                  :cx="120 + ((n - 1) % 3) * 180"
                  :cy="165 + Math.floor((n - 1) / 3) * 130"
                  r="43"
                />
              </g>
              <g v-else-if="layout === 1" fill="#d8c6d1" stroke="#764259">
                <rect
                  v-for="n in 48"
                  :key="n"
                  :x="90 + ((n - 1) % 8) * 54"
                  :y="115 + Math.floor((n - 1) / 8) * 39"
                  width="25"
                  height="20"
                  rx="3"
                />
              </g>
              <g v-else fill="#e0ccad" stroke="#764259">
                <rect
                  v-for="n in 6"
                  :key="n"
                  :x="85 + ((n - 1) % 3) * 165"
                  :y="130 + Math.floor((n - 1) / 3) * 130"
                  width="105"
                  height="65"
                />
              </g>
              <path d="M25 310V365" stroke="#faf5ec" stroke-width="7" />
              <text x="45" y="345" fill="#463442" font-size="11">ENTRY</text>
              <text x="400" y="382" fill="#463442" font-size="11">SERVICE ACCESS →</text>
            </svg>
            <p class="muted">
              Schematic arrangement · representative furniture, not a scaled seating plan
            </p>
          </div>
          <aside class="layout-facts">
            <p class="eyebrow">{{ layouts[layout].name }} ARRANGEMENT</p>
            <strong>{{ layouts[layout].capacity }}<small>guest capacity</small></strong>
            <p>{{ layouts[layout].desc }}</p>
            <label
              >Expected guests<input type="number" min="1" max="150" v-model.number="guests"
            /></label>
            <p v-if="guests > layouts[layout].capacity" role="alert">
              Your guest count exceeds this layout’s capacity.
            </p>
            <p v-else role="status">
              {{ layouts[layout].capacity - guests }} places within the sample capacity.
            </p>
            <button v-if="state === 'plan'" class="primary" @click="go('enquiry')">
              Enquire with this layout →
            </button>
          </aside>
        </div>
        <form v-if="state === 'enquiry' && !sent" class="form event-form" @submit.prevent="submit">
          <div class="two">
            <label>Event type<input required v-model="event" /></label
            ><label
              >Preferred date<input
                type="date"
                min="2026-11-01"
                max="2027-12-31"
                required
                v-model="date"
            /></label>
          </div>
          <div class="two">
            <label>Your name<input required v-model="name" /></label
            ><label>Email<input required type="email" v-model="email" /></label>
          </div>
          <p v-if="error" role="alert">{{ error }}</p>
          <button class="primary">Review event enquiry</button>
        </form>
        <div v-if="sent" class="confirmation event-form" role="status">
          <h2>A gathering taking shape.</h2>
          <p>{{ event }} · {{ date }} · {{ guests }} guests · {{ layouts[layout].name }}</p>
          <p>
            No event has been reserved. A real venue would confirm date availability, a safe room
            plan, and an itemised quotation.
          </p>
        </div>
      </section>
    </main>
    <footer class="sample-footer">
      <span>The Assembly Rooms · Fictional design reference 63.</span
      ><span>Sample data and illustrative images. Interactions stay on this page.</span
      ><a :href="href('start')">Reset sample</a>
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Libre Baskerville';
  src: url('/fonts/libre-baskerville.woff2') format('woff2');
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

.assembly-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding-top: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid var(--line);
}
.assembly-logo {
  font: 22px/1.1 var(--heading);
  text-decoration: none;
  letter-spacing: -0.03em;
}
.assembly-logo em {
  font-size: 30px;
}
.assembly-header nav {
  font-size: 13px;
}
.assembly-intro {
  padding-top: 55px;
  padding-bottom: 40px;
  text-align: center;
}
.assembly-intro h1 {
  font-size: clamp(2.7rem, 4.7vw, 4.6rem);
  font-weight: 400;
  line-height: 1.2;
  margin: 20px 0 25px;
}
.intro-caption {
  display: flex;
  justify-content: center;
  gap: 45px;
  align-items: center;
}
.intro-caption p {
  max-width: 40ch;
  font-size: 15px;
  text-align: left;
}
.venue-stage {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 35px;
}
.venue-stage img {
  height: 440px;
}
.venue-stage aside {
  padding: 30px;
  border: 1px solid #bba5ae;
  background: #ece0e2;
}
.venue-stage h2 {
  font-size: 31px;
  font-weight: 400;
  margin: 20px 0;
}
.venue-stage dl {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 25px 0;
}
.venue-stage .primary {
  width: 100%;
}
.venue-details article {
  border-top: 1px solid var(--accent);
  padding-top: 25px;
}
.venue-details span {
  font: 30px var(--heading);
  color: var(--accent);
}
.venue-details h3 {
  margin: 18px 0;
  font-weight: 400;
}
.venue-details p {
  font-size: 14px;
}
.package-band {
  background: #463442;
  color: #faf3e6;
  padding: 55px 0;
}
.package-band h2 {
  font-weight: 400;
  margin: 20px 0 35px;
}
.package-lines > div {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr auto;
  gap: 25px;
  align-items: center;
  padding: 22px 0;
  border-top: 1px solid #9b8793;
}
.package-lines h3 {
  font-size: 20px;
  font-weight: 400;
}
.package-lines p {
  font-size: 13px;
}
.package-lines button {
  background: transparent;
  border-color: #bba5ae;
  color: inherit;
  font-size: 12px;
}
.package-band .muted {
  font-size: 12px;
  margin-top: 25px;
}
.room-planner {
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  gap: 45px;
  margin: 35px 0;
}
.floorplan-panel {
  background: #ede2db;
  padding: 25px;
  border: 1px solid #bba5ae;
}
.layout-options {
  margin-bottom: 20px;
}
.layout-options button {
  font-size: 13px;
  background: transparent;
}
.layout-options button[aria-pressed='true'] {
  background: var(--accent);
  color: white;
  outline: 0;
}
.floorplan-panel svg {
  width: 100%;
  height: auto;
}
.layout-facts {
  padding: 25px 0;
}
.layout-facts > strong {
  display: block;
  font: 80px/1.1 var(--heading);
  margin: 20px 0;
}
.layout-facts small {
  display: block;
  font: 13px var(--body);
  margin-top: 10px;
}
.layout-facts > label {
  display: grid;
  gap: 10px;
  margin: 25px 0;
  font-size: 13px;
}
.layout-facts input {
  width: 130px;
}
.layout-facts .primary {
  margin-top: 25px;
}
.event-form {
  max-width: 760px;
  margin: 45px auto 0;
}
.event-form.confirmation h2 {
  font-size: 28px;
}
@media (max-width: 760px) {
  .assembly-header nav > a,
  .assembly-header .text-link {
    display: none;
  }
  .assembly-header .primary {
    font-size: 11px;
    padding: 9px;
  }
  .assembly-logo {
    font-size: 17px;
  }
  .assembly-logo em {
    font-size: 24px;
  }
  .assembly-intro {
    padding-top: 35px;
    text-align: left;
  }
  .assembly-intro h1 {
    font-size: 2.8rem;
  }
  .intro-caption {
    display: block;
  }
  .intro-caption button {
    margin-top: 20px;
  }
  .venue-stage,
  .room-planner {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  .venue-stage img {
    height: 300px;
  }
  .package-lines > div {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .package-lines h3 {
    grid-column: 1/-1;
  }
  .package-lines button {
    grid-column: 1/-1;
  }
  .floorplan-panel {
    padding: 14px;
  }
  .layout-options {
    gap: 8px;
  }
  .layout-options button {
    font-size: 11px;
    padding: 8px;
  }
  .layout-facts {
    padding-top: 0;
  }
  .layout-facts > strong {
    font-size: 60px;
  }
}

.eyebrow {
  font:
    italic 13px/1.6 Georgia,
    serif;
  letter-spacing: 0.025em;
  text-transform: none;
}
</style>
