<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useSpecimen } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const branches = [
  {
    name: 'Maple Street',
    area: 'Town centre',
    address: '12 Maple Street',
    hours: 'Mon–Sat · 08:00–18:00',
    services: ['Everyday service', 'E-bike check'],
    next: 'Thursday · 10:00',
    x: 30,
    y: 36,
  },
  {
    name: 'Riverside',
    area: 'East bank',
    address: '4 Towpath Yard',
    hours: 'Tue–Sat · 09:00–17:00',
    services: ['Everyday service', 'Cargo bikes'],
    next: 'Friday · 11:30',
    x: 71,
    y: 62,
  },
  {
    name: 'Station Yard',
    area: 'North quarter',
    address: '8 Station Yard',
    hours: 'Mon–Fri · 07:30–18:30',
    services: ['Everyday service', 'E-bike check', 'Cargo bikes'],
    next: 'Wednesday · 08:30',
    x: 56,
    y: 22,
  },
];
const service = ref('Any service'),
  selected = ref(0),
  name = ref(''),
  email = ref(''),
  work = ref('Everyday service'),
  sent = ref(false);
const filtered = computed(() =>
    branches.filter((b) => service.value === 'Any service' || b.services.includes(service.value)),
  ),
  branch = computed(() => branches[selected.value]);
function open(i: number) {
  selected.value = i;
  work.value = branches[i].services.includes(service.value) ? service.value : 'Everyday service';
  sent.value = false;
  go('location');
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header class="local-header wrap">
      <a :href="href('start')" class="local-logo"
        >LOCAL<span>CYCLE CARE / THREE NEIGHBOURHOODS</span></a
      >
      <nav class="row">
        <a :href="href('start') + '#finder'">Find a branch</a
        ><button class="text-link" @click="go('location')">Your branch</button
        ><button class="primary" @click="go('booking')">Book a service ↗</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="local-intro wrap">
          <div>
            <p class="eyebrow">Good care, close to your route.</p>
            <h1>Your bike.<br />Your neighbourhood.</h1>
          </div>
          <p class="lead">
            Three local workshops, each with its own rhythm. Find the one with the services and
            hours that fit your day.
          </p>
        </section>
        <section id="finder" class="branch-finder wrap">
          <div class="branch-list">
            <label class="service-filter"
              >What does your bike need?<select v-model="service">
                <option>Any service</option>
                <option>Everyday service</option>
                <option>E-bike check</option>
                <option>Cargo bikes</option>
              </select></label
            >
            <p class="muted" role="status">{{ filtered.length }} branches offer this service</p>
            <button
              class="branch-card"
              v-for="b in filtered"
              :key="b.name"
              @click="open(branches.indexOf(b))"
            >
              <div class="row spread">
                <span class="branch-number">0{{ branches.indexOf(b) + 1 }}</span
                ><span>{{ b.area }}</span>
              </div>
              <h2>{{ b.name }} ↗</h2>
              <p>{{ b.address }}<br />{{ b.hours }}</p>
              <span class="next-slot">Next sample slot: {{ b.next }}</span>
            </button>
          </div>
          <div class="branch-map">
            <svg
              viewBox="0 0 600 620"
              role="img"
              aria-label="Illustrative map showing three Northbank cycle workshops"
            >
              <rect width="600" height="620" fill="#e0e7d7" />
              <path
                d="M420-10C220 120 550 210 345 340S320 530 460 650"
                fill="none"
                stroke="#a6cad0"
                stroke-width="65"
              />
              <g stroke="#faf8ed" stroke-width="24" fill="none">
                <path d="M-20 210 620 350M120-10 225 650M480-10 55 650M-10 480 610 120" />
              </g>
              <g fill="#ced8bf">
                <rect x="30" y="30" width="100" height="100" rx="20" />
                <rect x="365" y="455" width="150" height="90" rx="25" />
              </g>
              <g fill="#4a6659" font-family="sans-serif" font-size="14">
                <text x="35" y="90">COMMON</text>
                <text x="380" y="505">RIVER PARK</text>
                <text x="260" y="580">NORTHBANK</text>
              </g></svg
            ><button
              v-for="(b, i) in branches"
              :key="b.name"
              class="map-pin"
              :style="{ left: b.x + '%', top: b.y + '%' }"
              @click="open(i)"
              :aria-label="'Open ' + b.name + ' branch'"
            >
              0{{ i + 1 }}</button
            ><span class="map-note">Schematic location guide · not for navigation</span>
          </div>
        </section>
        <section class="wrap section branch-principles">
          <div>
            <p class="eyebrow">One approach. local knowledge.</p>
            <h2>The right workshop<br />for the right job.</h2>
          </div>
          <div>
            <p>
              Each branch page carries its own hours, equipment, service list, and sample
              availability. Choosing a location should change the useful details—not just the
              address at the bottom.
            </p>
            <dl>
              <div>
                <dt>Everyday service</dt>
                <dd>All three branches</dd>
              </div>
              <div>
                <dt>E-bike checks</dt>
                <dd>Maple Street &amp; Station Yard</dd>
              </div>
              <div>
                <dt>Cargo bikes</dt>
                <dd>Riverside &amp; Station Yard</dd>
              </div>
            </dl>
          </div>
        </section></template
      >
      <section v-else class="wrap state-page">
        <button class="back text-link" @click="go('start')">← All three branches</button>
        <p class="eyebrow">LOCAL / {{ branch.area }}</p>
        <h1>{{ state === 'location' ? branch.name : 'Book at ' + branch.name }}</h1>
        <div class="branch-detail">
          <aside class="branch-facts">
            <span class="big-branch">0{{ selected + 1 }}</span>
            <h2>{{ branch.name }}</h2>
            <p>{{ branch.address }}, Northbank<br />{{ branch.hours }}</p>
            <dl>
              <dt>Services here</dt>
              <dd>{{ branch.services.join(' · ') }}</dd>
              <dt>Next sample appointment</dt>
              <dd>{{ branch.next }}</dd>
              <dt>Sample contact</dt>
              <dd>202 555 0165</dd>
            </dl>
            <button v-if="state === 'location'" class="primary" @click="go('booking')">
              Book at this branch →
            </button>
          </aside>
          <div v-if="state === 'location'" class="branch-story">
            <h2>Part of your<br />everyday route.</h2>
            <p>
              {{
                selected === 0
                  ? 'A town-centre workshop for the bikes that make everyday trips. Drop off on your way to Maple Street and collect after the shops.'
                  : selected === 1
                    ? 'A riverside workshop with room for cargo bikes and a practical approach to family transport.'
                    : 'An early-opening workshop beside the station, with appointments that fit around the commute.'
              }}
            </p>
            <div class="branch-service" v-for="s in branch.services" :key="s">
              <h3>{{ s }}</h3>
              <button
                @click="
                  work = s;
                  go('booking');
                "
                :aria-label="'Book ' + s + ' at ' + branch.name"
              >
                Choose service ↗
              </button>
            </div>
            <p class="muted">
              All branch details are fictional. A real locator should verify opening exceptions,
              accessibility, and service capability.
            </p>
          </div>
          <form v-else-if="!sent" class="form" @submit.prevent="sent = true">
            <label
              >Service<select v-model="work">
                <option v-for="s in branch.services" :key="s">{{ s }}</option>
              </select></label
            >
            <div class="notice">
              At {{ branch.name }} · {{ branch.next }}<br />This sample uses the branch’s next
              available slot.
            </div>
            <label>Your name<input required v-model="name" /></label
            ><label>Email<input required type="email" v-model="email" /></label
            ><button class="primary">Review branch booking</button>
          </form>
          <div v-else class="confirmation" role="status">
            <h2>The right place, clearly shown.</h2>
            <p>{{ work }} · {{ branch.name }}<br />{{ branch.address }} · {{ branch.next }}</p>
            <p>
              No service has been booked. A live confirmation should repeat the chosen branch and
              its specific arrival instructions.
            </p>
          </div>
        </div>
      </section>
    </main>
    <footer class="sample-footer">
      <span>LOCAL / Cycle care · Fictional design reference 65.</span
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

.local-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
  padding-top: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid var(--line);
}
.local-logo {
  font: 700 39px/0.9 var(--heading);
  letter-spacing: -0.055em;
  text-decoration: none;
}
.local-logo span {
  font: 8px/1.5 var(--body);
  letter-spacing: 0.08em;
  display: block;
  margin-top: 10px;
}
.local-header nav {
  font-size: 13px;
}
.local-intro {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 70px;
  align-items: end;
  padding-top: 45px;
  padding-bottom: 40px;
}
.local-intro h1 {
  font-size: clamp(3rem, 5vw, 5rem);
  margin-top: 20px;
}
.branch-finder {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: 35px;
  padding-bottom: 60px;
}
.service-filter {
  display: grid;
  gap: 9px;
  font-size: 13px;
  margin-bottom: 15px;
}
.branch-card {
  display: block;
  width: 100%;
  text-align: left;
  background: transparent;
  padding: 23px 0;
  border: 0;
  border-bottom: 1px solid var(--ink);
}
.branch-card .row > span:last-child {
  font-size: 11px;
  font-weight: 400;
}
.branch-number {
  font: 12px 'IBM Plex Mono';
  border: 1px solid var(--ink);
  padding: 3px 7px;
}
.branch-card h2 {
  font-size: 28px;
  margin: 12px 0;
}
.branch-card p {
  font-size: 13px;
  font-weight: 400;
}
.next-slot {
  display: block;
  font-size: 11px;
  color: #275742;
  margin-top: 14px;
}
.branch-map {
  position: relative;
  align-self: start;
  border: 1px solid #afc0af;
  overflow: hidden;
}
.branch-map svg {
  display: block;
  width: 100%;
  height: auto;
}
.map-pin {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #273e3c;
  color: #fff;
  border: 4px solid #f0f5ed;
  font: 17px var(--heading);
  padding: 0;
  box-shadow: 0 3px 12px #23352c35;
}
.map-note {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: #f0f5ed;
  color: #273e3c;
  padding: 6px 10px;
  font-size: 10px;
}
.branch-principles {
  border-top: 1px solid var(--ink);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
}
.branch-principles h2 {
  margin-top: 22px;
}
.branch-principles dl {
  margin-top: 25px;
}
.branch-principles dl > div {
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
}
.branch-principles dd {
  margin-top: 7px;
}
.branch-detail {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 65px;
  margin-top: 35px;
}
.branch-facts {
  background: #dce7d8;
  padding: 30px;
}
.big-branch {
  font: 70px var(--heading);
  color: #35645b;
}
.branch-facts h2 {
  font-size: 32px;
  margin: 10px 0 20px;
}
.branch-facts dl {
  margin: 25px 0;
}
.branch-facts dt {
  margin-top: 20px;
}
.branch-facts dd {
  font-size: 14px;
  margin-top: 6px;
}
.branch-story h2 {
  margin: 20px 0 25px;
}
.branch-service {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid var(--line);
}
.branch-service h3 {
  font-size: 21px;
}
.branch-service button {
  font-size: 12px;
}
.branch-story > .muted {
  margin-top: 25px;
}
@media (max-width: 760px) {
  .local-header nav > a,
  .local-header .text-link {
    display: none;
  }
  .local-header .primary {
    font-size: 11px;
    padding: 9px;
  }
  .local-logo {
    font-size: 32px;
  }
  .local-logo span {
    max-width: 140px;
    font-size: 7px;
  }
  .local-intro,
  .branch-finder,
  .branch-principles,
  .branch-detail {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  .local-intro h1 {
    font-size: clamp(2rem, 10vw, 3.2rem);
  }
  .branch-map {
    grid-row: 1;
    max-height: 350px;
  }
  .branch-map svg {
    height: 350px;
    object-fit: cover;
  }
  .map-pin {
    width: 40px;
    height: 40px;
    font-size: 14px;
  }
  .branch-story h2 {
    font-size: 32px;
  }
}

.eyebrow {
  font: 500 13px/1.5 var(--body);
  letter-spacing: 0;
  text-transform: none;
}
</style>
