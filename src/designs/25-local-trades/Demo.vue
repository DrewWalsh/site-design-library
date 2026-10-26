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
        ><section class="hero">
          <div>
            <p class="eyebrow">LOCAL REPAIRS / NORTHBANK & NEARBY</p>
            <h1>Let’s get it<br />working again.</h1>
            <p>
              Practical repairs for the things you use every day. Tell us what needs attention and
              we’ll help you understand the next step.
            </p>
            <button class="primary" @click="go('quote')">Tell us about the job →</button>
            <p class="demo">Fictional business. The enquiry form is a local demonstration.</p>
          </div>
          <aside>
            <p class="eyebrow">THE USEFUL DETAILS</p>
            <h2>Good to know<br />before you call.</h2>
            <dl>
              <dt>Area</dt>
              <dd>Northbank & 10 km around</dd>
              <dt>Hours</dt>
              <dd>Mon–Fri, 08:00–17:30</dd>
              <dt>Visits</dt>
              <dd>By appointment</dd>
              <dt>Pricing</dt>
              <dd>Agreed before work starts</dd>
            </dl>
            <button @click="go('area')">Check the service area ↗</button>
          </aside>
        </section>
        <section id="services">
          <p class="eyebrow">WHAT WE DO</p>
          <h2>Small jobs. Proper attention.</h2>
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
</style>
