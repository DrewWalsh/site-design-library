<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useSpecimen } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const listings = [
  {
    name: 'Alder House',
    place: 'Old Northbank',
    price: 645000,
    beds: 3,
    size: 142,
    photo:
      'https://drew-site-design-library.t3.tigrisfiles.io/assets/commercial/783cc79482c58908-property-exterior.webp',
  },
  {
    name: 'The Lantern apartment',
    place: 'Riverside',
    price: 395000,
    beds: 2,
    size: 86,
    photo:
      'https://drew-site-design-library.t3.tigrisfiles.io/assets/commercial/242f3c97c9c3a29c-property-interior.webp',
  },
  {
    name: 'Maple Mews',
    place: 'Old Northbank',
    price: 510000,
    beds: 2,
    size: 108,
    photo:
      'https://drew-site-design-library.t3.tigrisfiles.io/assets/commercial/783cc79482c58908-property-exterior.webp',
  },
];
const area = ref('All neighbourhoods'),
  beds = ref('Any'),
  chosen = ref(0),
  name = ref(''),
  email = ref(''),
  time = ref('Saturday · 10:00'),
  sent = ref(false);
const results = computed(() =>
    listings.filter(
      (l) =>
        (area.value === 'All neighbourhoods' || l.place === area.value) &&
        (beds.value === 'Any' || l.beds >= Number(beds.value)),
    ),
  ),
  home = computed(() => listings[chosen.value]);
function open(i: number) {
  chosen.value = i;
  go('property');
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header class="property-header wrap">
      <a :href="href('start')" class="north-logo">NORTH<span>RESIDENTIAL</span></a>
      <nav class="row">
        <a :href="href('start') + '#listings'">Find a home</a
        ><a :href="href('start') + '#neighbourhood'">The neighbourhood</a
        ><button class="text-link" @click="go('viewing')">Arrange a viewing ↗</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="property-title wrap">
          <p class="eyebrow">HOMES WITH A SENSE OF PLACE.</p>
          <h1>Somewhere<br />to belong.</h1>
          <p>Considered homes. Local knowledge.<br />A clear view of your next move.</p>
        </section>
        <section class="feature-home">
          <figure>
            <img
              class="photo"
              src="https://drew-site-design-library.t3.tigrisfiles.io/assets/commercial/783cc79482c58908-property-exterior.webp"
              alt="Bungalow with a covered porch and planted path"
            />
            <figcaption>Illustrative property photograph, not an actual listing</figcaption>
          </figure>
          <aside>
            <span class="eyebrow">FEATURED / OLD NORTHBANK</span>
            <h2>Alder House</h2>
            <p>A generous porch, an established garden, and room for everyday life.</p>
            <dl>
              <div>
                <dt>Asking price</dt>
                <dd>&#36;645,000</dd>
              </div>
              <div>
                <dt>Bedrooms</dt>
                <dd>3</dd>
              </div>
              <div>
                <dt>Floor area</dt>
                <dd>142 m²</dd>
              </div>
              <div>
                <dt>Tenure</dt>
                <dd>Freehold</dd>
              </div>
            </dl>
            <button class="primary" @click="open(0)">Explore this home →</button>
          </aside>
        </section>
        <section id="listings" class="wrap section">
          <div class="section-heading">
            <h2>Find your kind<br />of place.</h2>
            <p>
              Use the sample filters to compare a few fictional homes. Prices and availability are
              illustrative.
            </p>
          </div>
          <div class="property-filters">
            <label
              >Neighbourhood<select v-model="area">
                <option>All neighbourhoods</option>
                <option>Old Northbank</option>
                <option>Riverside</option>
              </select></label
            ><label
              >Bedrooms<select v-model="beds">
                <option>Any</option>
                <option value="2">2 or more</option>
                <option value="3">3 or more</option>
              </select></label
            ><span role="status">{{ results.length }} homes</span>
          </div>
          <div class="listing-row" v-for="listing in results" :key="listing.name">
            <img :src="listing.photo" alt="Illustrative stock property image" />
            <div>
              <p class="eyebrow">{{ listing.place }}</p>
              <h3>{{ listing.name }}</h3>
              <p>{{ listing.beds }} beds · {{ listing.size }} m² · Sample listing</p>
            </div>
            <strong>&#36;{{ listing.price.toLocaleString() }}</strong
            ><button @click="open(listings.indexOf(listing))" :aria-label="'View ' + listing.name">
              View home ↗
            </button>
          </div>
          <p class="notice" v-if="!results.length">
            No sample homes match. Try another neighbourhood or fewer bedrooms.
          </p>
        </section>
        <section id="neighbourhood" class="neighbourhood">
          <div class="wrap two">
            <div>
              <p class="eyebrow">BEYOND THE FRONT DOOR</p>
              <h2>Get to know<br />Old Northbank.</h2>
              <p>
                A fictional neighbourhood guide showing the details that make a location useful to
                understand.
              </p>
            </div>
            <dl>
              <div>
                <dt>On foot</dt>
                <dd>Maple Street shops · 8 minutes</dd>
              </div>
              <div>
                <dt>Outdoors</dt>
                <dd>Riverside path · 12 minutes</dd>
              </div>
              <div>
                <dt>Connections</dt>
                <dd>Northbank station · 18 minutes</dd>
              </div>
              <div>
                <dt>The everyday</dt>
                <dd>Library, market, and community garden</dd>
              </div>
            </dl>
          </div>
        </section></template
      >
      <section v-else class="wrap state-page">
        <button class="back text-link" @click="go('start')">← All homes</button>
        <h1>{{ state === 'property' ? home.name : 'See it for yourself.' }}</h1>
        <div class="property-detail">
          <div v-if="state === 'property'">
            <img
              class="photo interior"
              src="https://drew-site-design-library.t3.tigrisfiles.io/assets/commercial/242f3c97c9c3a29c-property-interior.webp"
              alt="Illustrative living-room photograph"
            />
            <p class="muted">
              Exterior and interior are independent stock photographs, used to demonstrate a listing
              layout.
            </p>
            <section class="section">
              <h2>Space to make your own.</h2>
              <p>
                A sample description connects the front living room, kitchen, and garden. A real
                listing should verify room dimensions, condition, title, and all material details.
              </p>
              <svg
                class="floorplan"
                viewBox="0 0 580 300"
                role="img"
                aria-label="Illustrative ground floor plan showing living room, kitchen, hall, and garden access"
              >
                <path
                  d="M25 25H555V275H25Z M250 25V275 M250 160H555 M400 25V160"
                  fill="#ecebe3"
                  stroke="currentColor"
                  stroke-width="5"
                />
                <path d="M250 105v45M250 210v40M400 80v40" stroke="var(--page)" stroke-width="8" />
                <g fill="currentColor" font-size="17" text-anchor="middle">
                  <text x="135" y="130">Living room</text>
                  <text x="135" y="155">5.2 × 4.4 m</text>
                  <text x="325" y="85">Kitchen</text>
                  <text x="475" y="85">Hall</text>
                  <text x="400" y="225">Garden room</text>
                </g>
              </svg>
              <p class="muted">Illustrative plan · not to scale · ground floor only</p>
            </section>
          </div>
          <form v-else-if="!sent" class="form" @submit.prevent="sent = true">
            <label>Your name<input required v-model="name" /></label
            ><label>Email<input required type="email" v-model="email" /></label
            ><label
              >Preferred viewing<select v-model="time">
                <option>Saturday · 10:00</option>
                <option>Saturday · 11:30</option>
                <option>Tuesday · 17:00</option>
              </select></label
            ><button class="primary">Request sample viewing</button>
            <p class="muted">The agent would confirm this time before a real visit.</p>
          </form>
          <div v-else class="confirmation" role="status">
            <h2>Your preference is ready.</h2>
            <p>{{ home.name }} · {{ time }} · {{ name }}</p>
            <p>
              No viewing has been scheduled. This is a local example of the confirmation hierarchy.
            </p>
          </div>
          <aside class="facts-rail">
            <p class="eyebrow">{{ home.place }}</p>
            <h2>{{ home.name }}</h2>
            <strong class="asking">&#36;{{ home.price.toLocaleString() }}</strong>
            <dl>
              <div>
                <dt>Bedrooms</dt>
                <dd>{{ home.beds }}</dd>
              </div>
              <div>
                <dt>Floor area</dt>
                <dd>{{ home.size }} m²</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>Sample available</dd>
              </div>
            </dl>
            <button
              class="primary"
              @click="
                sent = false;
                go('viewing');
              "
            >
              Arrange a viewing →
            </button>
            <p>North Residential<br />Sample office · 202 555 0157</p>
          </aside>
        </div>
      </section>
    </main>
    <footer class="sample-footer">
      <span>NORTH / Residential · Fictional design reference 57.</span
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

.property-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid var(--line);
  gap: 25px;
}
.north-logo {
  font: 500 39px/0.9 var(--heading);
  letter-spacing: 0.15em;
  text-decoration: none;
}
.north-logo span {
  display: block;
  font: 9px/2 var(--body);
  letter-spacing: 0.4em;
  margin-top: 8px;
}
.property-header nav {
  font-size: 13px;
}
.property-title {
  position: relative;
  padding-top: 45px;
  padding-bottom: 40px;
}
.property-title h1 {
  font-weight: 400;
  font-size: clamp(3.8rem, 6vw, 6rem);
  margin-top: 15px;
  line-height: 1.02;
}
.property-title > p:last-child {
  position: absolute;
  right: 40px;
  bottom: 45px;
  max-width: 260px;
}
.feature-home {
  display: grid;
  grid-template-columns: 1.65fr 1fr;
  max-width: 1440px;
  margin: auto;
}
.feature-home figure {
  position: relative;
}
.feature-home img {
  height: 520px;
}
.feature-home figcaption {
  position: absolute;
  bottom: 0;
  left: 0;
  background: #fffdf1;
  color: #253c35;
  padding: 8px 18px;
  font-size: 11px;
}
.feature-home aside {
  background: #2a443b;
  color: #f7f6e9;
  padding: 45px;
}
.feature-home h2 {
  margin: 25px 0 18px;
  font-weight: 400;
  font-size: 37px;
}
.feature-home dl {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 25px 0;
}
.feature-home dt {
  color: #d0dbd2;
}
.feature-home .primary {
  background: #e7edcf;
  border-color: #e7edcf;
  color: #253c35;
  width: 100%;
}
.property-filters {
  display: flex;
  align-items: end;
  gap: 25px;
  padding: 20px 0 25px;
  border-bottom: 1px solid var(--ink);
}
.property-filters label {
  display: grid;
  gap: 8px;
  font-size: 12px;
  flex: 1;
}
.listing-row {
  display: grid;
  grid-template-columns: 180px 1fr auto auto;
  gap: 28px;
  align-items: center;
  padding: 25px 0;
  border-bottom: 1px solid var(--line);
}
.listing-row img {
  width: 180px;
  height: 120px;
  object-fit: cover;
}
.listing-row h3 {
  font-size: 25px;
  font-weight: 500;
  margin: 10px 0;
}
.listing-row p:last-child {
  font-size: 12px;
}
.listing-row > strong {
  font-size: 20px;
}
.listing-row button {
  background: transparent;
}
.neighbourhood {
  padding: 60px 0;
  background: #e3e9dc;
}
.neighbourhood h2 {
  margin: 20px 0 25px;
  font-weight: 400;
}
.neighbourhood dl > div {
  padding: 13px 0;
  border-bottom: 1px solid var(--line);
}
.neighbourhood dd {
  margin-top: 5px;
}
.property-detail {
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) minmax(280px, 1fr);
  gap: 45px;
}
.interior {
  height: 380px;
}
.property-detail .section h2 {
  margin-bottom: 22px;
  font-weight: 400;
}
.floorplan {
  margin-top: 35px;
  width: 100%;
  height: auto;
  background: #fff;
}
.facts-rail {
  position: sticky;
  top: 25px;
  align-self: start;
  border: 1px solid var(--line);
  padding: 30px;
  background: #ecefe3;
}
.facts-rail h2 {
  font-size: 29px;
  font-weight: 400;
  margin: 15px 0;
}
.asking {
  font-size: 26px;
}
.facts-rail dl {
  margin: 25px 0;
}
.facts-rail dl > div {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--line);
  padding: 12px 0;
}
.facts-rail .primary {
  width: 100%;
}
.facts-rail > p:last-child {
  font-size: 13px;
  margin-top: 22px;
}
@media (max-width: 760px) {
  .property-header nav > a {
    display: none;
  }
  .north-logo {
    font-size: 28px;
  }
  .property-header button {
    font-size: 12px;
  }
  .property-title > p:last-child {
    position: static;
    margin-top: 25px;
  }
  .property-title h1 {
    font-size: 3.7rem;
  }
  .feature-home,
  .property-detail {
    grid-template-columns: 1fr;
  }
  .feature-home img {
    height: 300px;
  }
  .feature-home aside {
    padding: 30px 22px;
  }
  .property-filters {
    flex-wrap: wrap;
    gap: 14px;
  }
  .property-filters > span {
    width: 100%;
  }
  .listing-row {
    grid-template-columns: 90px 1fr;
    gap: 15px;
  }
  .listing-row img {
    width: 90px;
    height: 100px;
    grid-row: span 2;
  }
  .listing-row h3 {
    font-size: 21px;
  }
  .listing-row > strong {
    grid-column: 2;
    font-size: 18px;
  }
  .listing-row button {
    grid-column: 1/-1;
  }
  .facts-rail {
    position: static;
  }
  .interior {
    height: 280px;
  }
}
</style>
