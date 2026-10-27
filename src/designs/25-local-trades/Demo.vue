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
    .filter((k) => k.startsWith('design-library:25:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const service = ref('Appliance repair'),
  sent = ref(false),
  name = ref(''),
  email = ref('');
const services = [
  {
    name: 'Appliance repair',
    price: 'from £65',
    desc: 'Fault-finding for everyday household appliances.',
  },
  {
    name: 'Small electrical jobs',
    price: 'from £45',
    desc: 'Fixtures, switches, and straightforward replacements.',
  },
  {
    name: 'Furniture repairs',
    price: 'from £40',
    desc: 'Loose joints, damaged fittings, and things worth keeping.',
  },
];
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>NORTHLINE<span>REPAIRS & MAINTENANCE</span></strong>
      <nav>
        <a href="#services">Our services</a><button @click="go('area')">Where we work</button
        ><button class="primary" @click="go('quote')">Get a sample quote →</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="service-heading">
          <div>
            <p class="eyebrow">Your local repair desk</p>
            <h1>What needs<br />a little attention?</h1>
          </div>
          <div class="contact-sign">
            <b>Northbank &amp; nearby</b>
            <p>Monday–Friday<br />08:00–17:30</p>
            <button @click="go('area')">Check your area →</button>
          </div>
        </section>
        <section id="services">
          <div class="board-title">
            <p class="eyebrow">Choose the work</p>
            <p>Sample starting prices · scope agreed before a visit</p>
          </div>
          <article v-for="(s, i) in services" :key="s.name">
            <span>0{{ i + 1 }}</span>
            <div>
              <h3>{{ s.name }}</h3>
              <p>{{ s.desc }}</p>
            </div>
            <strong>{{ s.price }}</strong
            ><button
              @click="
                service = s.name;
                go('quote');
              "
            >
              Ask about this →
            </button>
          </article>
          <small
            >Illustrative call-out prices. Parts and additional work would be quoted separately in a
            real service.</small
          >
        </section>
        <section class="repair-evidence">
          <div class="repair-drawing">
            <svg
              viewBox="0 0 400 260"
              role="img"
              aria-label="Illustrated chair repair showing a loose joint and a repaired joint"
            >
              <g fill="none" stroke="#394d4b" stroke-width="5">
                <path
                  d="M65 65V150H155V65M65 110H155M70 150 60 235M150 150 160 235M240 65V150H330V65M240 110H330M245 150 235 235M325 150 335 235"
                />
              </g>
              <g fill="none" stroke="#b45127" stroke-width="3">
                <circle cx="66" cy="150" r="22" stroke-dasharray="5 4" />
                <path d="m228 151 10 10 24-26" />
              </g>
              <g fill="#24374b" font-family="sans-serif" font-size="12">
                <text x="55" y="32">BEFORE / LOOSE JOINT</text>
                <text x="235" y="32">AFTER / RE-FIXED</text>
              </g>
            </svg>
            <p>Illustrative repair detail · no client outcome claimed</p>
          </div>
          <div>
            <p class="eyebrow">A small job, properly explained</p>
            <h2>A chair with another<br />few years in it.</h2>
            <p>
              A fictional repair example: inspect the movement, explain the loose joint, agree the
              repair, then show what changed. Useful evidence is specific, even when the job is
              small.
            </p>
            <button
              @click="
                service = 'Furniture repairs';
                go('quote');
              "
            >
              Ask about a furniture repair →
            </button>
          </div>
        </section>
        <section class="process">
          <div>
            <p class="eyebrow">HOW IT WORKS</p>
            <h2>No mystery.<br />Just a clear next step.</h2>
          </div>
          <ol>
            <li>
              <b>Tell us what’s wrong.</b>
              <p>A short description helps us understand the job.</p>
            </li>
            <li>
              <b>Agree the visit and scope.</b>
              <p>Know what to expect before anyone arrives.</p>
            </li>
            <li>
              <b>Repair, explain, tidy up.</b>
              <p>Understand what was done and what to watch for.</p>
            </li>
          </ol>
        </section></template
      >
      <section v-else-if="state === 'quote'" class="quote">
        <p class="eyebrow">A CLEAR FIRST STEP</p>
        <h1>What needs attention?</h1>
        <form v-if="!sent" @submit.prevent="sent = true">
          <label
            >Type of job<select v-model="service">
              <option v-for="s in services">{{ s.name }}</option>
            </select></label
          ><label>Your name<input v-model="name" autocomplete="name" required /></label
          ><label
            >Email address<input
              type="email"
              v-model="email"
              autocomplete="email"
              required /></label
          ><label
            >Tell us what’s happening<textarea
              required
              placeholder="Include the item, the problem, and when it started."
            ></textarea></label
          ><label>Area<input required placeholder="For example: Northbank Old Town" /></label
          ><button class="primary">Save sample request</button>
          <p>No message is sent. Use sample information.</p>
        </form>
        <div v-else role="status">
          <h2>Your sample request is ready, {{ name }}.</h2>
          <p>Job: {{ service }}<br />Reply address: {{ email }}</p>
          <p>
            In a real service, the next step would be to agree the scope and a visit. This
            demonstration has sent nothing.
          </p>
          <button @click="sent = false">Edit another request</button>
        </div>
      </section>
      <section v-else class="area">
        <p class="eyebrow">WHERE WE WORK</p>
        <h1>Local means nearby.</h1>
        <h2>Northbank and the surrounding 10 km.</h2>
        <p>
          Our fictional service area includes Old Town, Riverside, Eastmere, and the Foundry
          Quarter.
        </p>
        <details open>
          <summary>Outside the area?</summary>
          <p>
            We would discuss travel before agreeing any work. The sample form lets you include your
            location.
          </p>
        </details>
        <details>
          <summary>Urgent or unsafe faults</summary>
          <p>
            This fictional service is not an emergency response provider. The reference demonstrates
            ordinary scheduled enquiries.
          </p>
        </details>
        <button class="primary" @click="go('quote')">Start a sample enquiry →</button>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Northline Repairs · Fictional sample content · Design reference 25</span
      ><button @click="reset">Reset demo</button>
    </footer>
  </div>
</template>
<style scoped>
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
  background: white;
  border-bottom: 1px solid var(--line);
  gap: 25px;
}
header strong {
  font-size: 25px;
  letter-spacing: -0.05em;
  line-height: 1.1;
}
header strong span {
  display: block;
  font-size: 8px;
  letter-spacing: 0.14em;
  margin-top: 8px;
}
nav {
  display: flex;
  align-items: center;
  gap: 25px;
  font-size: 12px;
}
nav button {
  font-size: 12px;
  background: none;
  border: 0;
}
nav button.primary {
  background: #be491b;
  color: white;
  padding: 14px 20px;
}
main {
  max-width: 1350px;
  margin: auto;
  padding: 0 5%;
}
.hero {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 100px;
  padding: 65px 0;
}
.hero h1 {
  font-size: 68px;
  line-height: 1.05;
  margin: 25px 0;
}
.hero > div > p {
  max-width: 560px;
  font-size: 16px;
}
.hero .primary {
  padding: 16px 25px;
  margin-top: 20px;
}
.hero .demo {
  font-size: 10px;
  color: #546675;
  margin-top: 20px;
}
.hero aside {
  background: #e5eaf0;
  padding: 35px;
  border-top: 5px solid #be491b;
  align-self: center;
}
.hero aside h2 {
  font-size: 31px;
  line-height: 1.2;
}
.hero aside dl {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 18px;
  font-size: 12px;
}
.hero aside dt {
  color: #495d70;
}
.hero aside dd {
  margin: 0;
}
.hero aside button {
  background: none;
  border: 0;
  font-size: 11px;
  padding: 0;
  margin-top: 20px;
}
#services {
  border-top: 1px solid var(--line);
  padding: 45px 0;
}
#services h2 {
  font-size: 40px;
}
#services article {
  display: flex;
  align-items: center;
  gap: 35px;
  border-top: 1px solid var(--line);
  padding: 25px 0;
}
#services article > span {
  font: 11px monospace;
  color: #586e82;
}
#services article > div {
  flex: 1;
}
#services h3 {
  font-size: 23px;
  margin: 0 0 10px;
}
#services p {
  font-size: 13px;
  margin: 0;
}
#services strong {
  font-size: 18px;
  white-space: nowrap;
}
#services button {
  font-size: 11px;
  background: none;
}
#services > small {
  font-size: 10px;
  color: #546675;
}
.process {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 100px;
  padding: 50px 0 80px;
  border-top: 1px solid var(--line);
}
.process h2 {
  font-size: 40px;
  line-height: 1.2;
}
.process li {
  padding: 10px 0 18px 10px;
  font-size: 15px;
}
.process li p {
  font-size: 13px;
}
.quote,
.area {
  max-width: 850px;
  padding: 60px 0 100px;
}
.quote h1,
.area h1 {
  font-size: 52px;
}
.quote form {
  display: grid;
  gap: 22px;
  max-width: 650px;
}
.quote label {
  font-size: 12px;
}
.quote form p {
  font-size: 11px;
}
.area h2 {
  font-size: 28px;
  line-height: 1.4;
}
.area > button {
  margin-top: 30px;
}
@media (max-width: 650px) {
  header {
    display: block;
    padding: 22px;
  }
  nav {
    margin-top: 22px;
    gap: 15px;
    font-size: 10px;
  }
  nav button {
    font-size: 10px;
  }
  nav button.primary {
    padding: 10px;
  }
  .hero,
  .process {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 40px 0;
  }
  .hero h1 {
    font-size: 49px;
  }
  .hero aside {
    padding: 25px;
  }
  .hero > div > p {
    font-size: 14px;
  }
  #services h2,
  .process h2 {
    font-size: 32px;
  }
  #services article {
    flex-wrap: wrap;
    gap: 15px;
  }
  #services article > div {
    min-width: 75%;
  }
  #services h3 {
    font-size: 21px;
  }
  #services strong {
    margin-left: 28px;
  }
  .quote h1,
  .area h1 {
    font-size: 39px;
  }
}

.eyebrow {
  font: 600 13px/1.5 'DM Sans';
  letter-spacing: 0;
  text-transform: none;
}
.service-heading {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 70px;
  align-items: end;
  padding: 45px 0 35px;
}
.service-heading h1 {
  font-size: clamp(40px, 5.3vw, 70px);
  line-height: 1.07;
  margin: 18px 0 0;
  letter-spacing: -0.035em;
}
.contact-sign {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  border-left: 4px solid #be491b;
  padding: 20px 25px;
  background: #ecebdc;
}
.contact-sign > b {
  grid-column: 1/-1;
  font-size: 19px;
}
.contact-sign p {
  font-size: 13px;
  margin: 0;
}
.contact-sign button {
  font-size: 12px;
  background: transparent;
  align-self: end;
}
#services {
  padding: 0 28px 25px;
  border: 2px solid #304638;
  background: #f0f1e3;
  box-shadow: 7px 7px #dddccc;
}
.board-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
  padding: 18px 0;
  border-bottom: 2px solid #304638;
}
.board-title > p:last-child {
  font-size: 11px;
  margin: 0;
}
#services article {
  grid-template-columns: 45px 1fr 110px 160px;
  gap: 20px;
  padding: 25px 0;
  border-bottom: 1px solid #a2afa1;
}
#services article > span {
  font: 24px 'DM Sans';
  font-weight: 500;
  color: #486249;
}
#services h3 {
  font-size: 24px;
}
#services article p {
  font-size: 13px;
}
#services strong {
  font-size: 20px;
}
#services article button {
  background: #fffdf1;
  border: 1px solid #899b88;
  font-size: 12px;
}
#services > small {
  display: block;
  font-size: 10px;
  padding-top: 20px;
}
.repair-evidence {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 55px;
  align-items: center;
  margin: 65px 0;
}
.repair-drawing {
  background: #e5eadc;
  padding: 25px;
}
.repair-drawing p {
  font-size: 10px;
  margin: 10px 0 0;
}
.repair-evidence h2 {
  font-size: 32px;
  margin: 15px 0 22px;
}
.repair-evidence > div > p:not(.eyebrow) {
  font-size: 14px;
}
.repair-evidence button {
  font-size: 12px;
  margin-top: 18px;
  background: transparent;
}
.process {
  border-top: 1px solid var(--line);
  padding-top: 35px;
}
@media (max-width: 760px) {
  .service-heading {
    grid-template-columns: 1fr;
    gap: 25px;
    padding-top: 30px;
  }
  .service-heading h1 {
    font-size: 43px;
  }
  .contact-sign {
    padding: 20px;
  }
  .contact-sign > b {
    font-size: 18px;
  }
  #services {
    padding: 0 20px 22px;
    box-shadow: 4px 4px #dddccc;
  }
  .board-title {
    display: block;
  }
  .board-title > .eyebrow {
    margin-bottom: 8px;
  }
  #services article {
    grid-template-columns: 30px 1fr;
    gap: 12px;
  }
  #services article > div {
    grid-column: 2;
  }
  #services h3 {
    font-size: 22px;
  }
  #services article > strong {
    grid-column: 2;
    font-size: 19px;
  }
  #services article > button {
    grid-column: 2;
    justify-self: start;
  }
  #services article > span {
    font-size: 20px;
  }
  .repair-evidence {
    grid-template-columns: 1fr;
    gap: 25px;
    margin: 45px 0;
  }
  .repair-evidence h2 {
    font-size: 29px;
  }
  .repair-drawing {
    padding: 20px;
  }
}
</style>
