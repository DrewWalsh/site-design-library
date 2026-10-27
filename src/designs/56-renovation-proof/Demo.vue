<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useSpecimen } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const reveal = ref(50),
  type = ref('Living space'),
  budget = ref('30–60k'),
  timing = ref('Within 6 months'),
  postcode = ref(''),
  name = ref(''),
  email = ref(''),
  brief = ref(''),
  sent = ref(false);
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header class="found-header wrap">
      <a :href="href('start')" class="found-logo">FOUND<span>RENOVATION &amp; JOINERY</span></a>
      <nav class="row">
        <button class="text-link" @click="go('project')">Selected work</button
        ><a :href="href('start') + '#process'">How we build</a
        ><button class="primary" @click="go('estimate')">Talk about your project ↗</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="found-intro wrap">
          <p class="eyebrow">BUILDING ON WHAT’S ALREADY THERE.</p>
          <div class="title-row">
            <h1>Better spaces.<br />Same address.</h1>
            <div>
              <p>
                Thoughtful renovations for homes with another chapter in them. See the decisions,
                the details, and the work along the way.
              </p>
              <button class="text-link" @click="go('project')">
                Explore the Alder room project →
              </button>
            </div>
          </div>
          <figure class="comparison">
            <div class="comparison-images">
              <img
                class="photo"
                src="https://drew-site-design-library.t3.tigrisfiles.io/assets/commercial/a828763f89588db7-renovation-before.webp"
                alt="Illustrative living room before renovation, with worn carpet and dated finishes"
              /><img
                class="photo after"
                src="https://drew-site-design-library.t3.tigrisfiles.io/assets/commercial/48124c8590fce989-renovation-after.webp"
                alt="Same illustrated room after renovation with oak flooring and renewed finishes"
                :style="{ clipPath: 'inset(0 ' + (100 - reveal) + '% 0 0)' }"
              /><span class="image-label left">AFTER</span
              ><span class="image-label right">BEFORE</span>
              <div class="split-line" :style="{ left: reveal + '%' }" aria-hidden="true">
                <span>↔</span>
              </div>
            </div>
            <label class="slider-label"
              >Compare before and after<input
                type="range"
                min="0"
                max="100"
                v-model.number="reveal"
                aria-label="Before and after reveal"
            /></label>
            <figcaption>
              AI-generated renovation illustration · matched camera and room geometry · not a client
              outcome
            </figcaption>
          </figure>
          <div class="project-facts">
            <div><span>PROJECT</span><b>The Alder room</b></div>
            <div><span>SCOPE</span><b>Living space &amp; finishes</b></div>
            <div><span>SAMPLE DURATION</span><b>6 weeks</b></div>
            <div><span>KEY DECISION</span><b>Retain the original layout</b></div>
          </div>
        </section>
        <section id="process" class="wrap section process">
          <div>
            <p class="eyebrow">A PROCESS YOU CAN FOLLOW</p>
            <h2>Less mystery.<br />More milestones.</h2>
          </div>
          <ol>
            <li>
              <b>01</b>
              <div>
                <h3>Understand the space</h3>
                <p>A site conversation, measured constraints, and a realistic brief.</p>
              </div>
            </li>
            <li>
              <b>02</b>
              <div>
                <h3>Agree the work</h3>
                <p>A written scope with materials, allowances, and a programme.</p>
              </div>
            </li>
            <li>
              <b>03</b>
              <div>
                <h3>Build with visibility</h3>
                <p>Progress notes, planned decisions, and changes agreed before work proceeds.</p>
              </div>
            </li>
            <li>
              <b>04</b>
              <div>
                <h3>Hand over properly</h3>
                <p>A final walkthrough, care information, and a clear snagging list.</p>
              </div>
            </li>
          </ol>
        </section>
        <section class="estimate-band">
          <div class="wrap two">
            <h2>What would you<br />like to change?</h2>
            <div>
              <p>
                Tell us the space, the broad budget, and what’s driving the project. A good first
                enquiry helps us have a useful first conversation.
              </p>
              <button class="primary" @click="go('estimate')">
                Prepare a sample project brief →
              </button>
            </div>
          </div>
        </section></template
      >
      <section v-else class="wrap state-page">
        <button class="back text-link" @click="go('start')">← Selected work</button
        ><template v-if="state === 'project'"
          ><p class="eyebrow">PROJECT DOSSIER / 001</p>
          <h1>The Alder room.</h1>
          <img
            class="photo dossier-photo"
            src="https://drew-site-design-library.t3.tigrisfiles.io/assets/commercial/48124c8590fce989-renovation-after.webp"
            alt="AI-generated renovated living room"
          />
          <div class="two section">
            <div>
              <h2>Keep the bones.<br />Change the feeling.</h2>
              <p>
                The illustrative brief retains the window and circulation, replaces worn finishes,
                and uses a consistent timber tone to make the room feel connected.
              </p>
            </div>
            <div>
              <table>
                <caption>
                  Sample project specification
                </caption>
                <tbody>
                  <tr>
                    <th>Floor</th>
                    <td>Engineered oak, matte finish</td>
                  </tr>
                  <tr>
                    <th>Walls</th>
                    <td>Warm mineral paint</td>
                  </tr>
                  <tr>
                    <th>Window treatment</th>
                    <td>Full-height linen curtains</td>
                  </tr>
                  <tr>
                    <th>Works</th>
                    <td>Preparation, finishes, joinery</td>
                  </tr>
                </tbody>
              </table>
              <p class="muted">
                Concept illustration and fictional specification. A real case study should record
                the actual scope, dates, consented photography, and changes.
              </p>
            </div>
          </div>
          <button class="primary" @click="go('estimate')">Plan your own project →</button></template
        ><template v-else
          ><h1>Start with the space.</h1>
          <p class="lead">
            An enquiry is the beginning of a scope, not a fixed quote. Use this form to see how the
            right questions can help.
          </p>
          <div class="state-grid">
            <form class="form" v-if="!sent" @submit.prevent="sent = true">
              <div class="two">
                <label
                  >Project type<select v-model="type">
                    <option>Living space</option>
                    <option>Kitchen renovation</option>
                    <option>Whole-home refresh</option>
                    <option>Built-in joinery</option>
                  </select></label
                ><label
                  >Working budget<select v-model="budget">
                    <option>Under 30k</option>
                    <option>30–60k</option>
                    <option>60–120k</option>
                    <option>Still exploring</option>
                  </select></label
                >
              </div>
              <label
                >Preferred timing<select v-model="timing">
                  <option>Within 6 months</option>
                  <option>6–12 months</option>
                  <option>Just exploring</option>
                </select></label
              ><label>Area or postcode<input required v-model="postcode" /></label
              ><label
                >What needs to work better?<textarea required v-model="brief"></textarea>
              </label>
              <div class="two">
                <label>Name<input required v-model="name" /></label
                ><label>Email<input required type="email" v-model="email" /></label>
              </div>
              <button class="primary">Review project enquiry</button>
            </form>
            <div v-else class="confirmation" role="status">
              <h2>A brief worth discussing.</h2>
              <p>{{ type }} · {{ budget }} · {{ timing }}<br />{{ postcode }}</p>
              <p>{{ brief }}</p>
              <p>
                No enquiry has been sent. A real contractor would review the scope before providing
                an estimate.
              </p>
              <button @click="sent = false">Refine the brief</button>
            </div>
            <aside class="scope-note">
              <p class="eyebrow">WHAT MAKES AN ESTIMATE USEFUL</p>
              <h2>The detail<br />before the number.</h2>
              <ul>
                <li>What stays and what changes</li>
                <li>Access and occupied-home constraints</li>
                <li>Preferred materials and finish</li>
                <li>Allowances and exclusions</li>
                <li>A realistic start window</li>
              </ul>
              <p>
                Photos or measured plans would be collected securely after the initial conversation.
              </p>
            </aside>
          </div></template
        >
      </section>
    </main>
    <footer class="sample-footer">
      <span>FOUND / Renovation · Fictional design reference 56.</span
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

.found-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  padding-top: 30px;
  padding-bottom: 30px;
}
.found-logo {
  font: 700 43px/0.9 var(--heading);
  letter-spacing: -0.06em;
  text-decoration: none;
}
.found-logo span {
  display: block;
  font: 9px var(--body);
  letter-spacing: 0.17em;
  margin-top: 12px;
}
.found-header nav {
  font-size: 13px;
}
.found-intro {
  padding-top: 40px;
}
.title-row {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 80px;
  align-items: end;
  margin: 20px 0 38px;
}
.title-row h1 {
  font-size: clamp(3.4rem, 6vw, 5.8rem);
}
.title-row > div {
  max-width: 42ch;
}
.title-row button {
  margin-top: 15px;
}
.comparison-images {
  position: relative;
  height: 480px;
  overflow: hidden;
}
.comparison-images > .photo {
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.comparison-images > .after {
  position: absolute;
  inset: 0;
}
.image-label {
  position: absolute;
  bottom: 22px;
  padding: 8px 13px;
  background: #fffaf0;
  color: #30352f;
  font: 11px 'IBM Plex Mono';
}
.image-label.left {
  left: 22px;
}
.image-label.right {
  right: 22px;
}
.split-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: white;
  pointer-events: none;
}
.split-line span {
  position: absolute;
  top: 45%;
  left: -20px;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  background: white;
  display: grid;
  place-items: center;
  color: #30352f;
}
.slider-label {
  display: flex;
  gap: 30px;
  align-items: center;
  font-size: 13px;
  padding-top: 18px;
}
.slider-label input {
  flex: 1;
  accent-color: var(--accent);
  padding: 0;
}
.project-facts {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
  margin-top: 25px;
  padding: 22px 0;
  gap: 20px;
}
.project-facts span {
  display: block;
  font: 10px 'IBM Plex Mono';
  margin-bottom: 10px;
}
.project-facts b {
  font-size: 14px;
}
.process {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 80px;
}
.process h2 {
  margin-top: 22px;
}
.process ol {
  list-style: none;
  margin: 0;
  padding: 0;
}
.process li {
  display: flex;
  gap: 30px;
  border-bottom: 1px solid var(--line);
  padding: 22px 0;
}
.process li:first-child {
  padding-top: 0;
}
.process li > b {
  font: 13px 'IBM Plex Mono';
}
.process p {
  font-size: 14px;
  margin-top: 10px;
}
.estimate-band {
  background: #d9bc76;
  padding: 55px 0;
}
.estimate-band button {
  margin-top: 25px;
}
.dossier-photo {
  height: 440px;
  object-position: center;
}
.scope-note {
  background: #e1decf;
  padding: 35px;
}
.scope-note h2 {
  margin: 20px 0 25px;
}
.scope-note li {
  margin: 12px 0;
}
.scope-note p:last-child {
  font-size: 13px;
}
.state-page .muted {
  margin-top: 20px;
}
@media (max-width: 760px) {
  .found-header nav > a,
  .found-header nav > .text-link {
    display: none;
  }
  .found-header .primary {
    font-size: 11px;
    padding: 9px;
  }
  .found-logo {
    font-size: 35px;
  }
  .title-row,
  .process {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  .title-row h1 {
    font-size: 3.4rem;
  }
  .found-intro {
    padding-top: 25px;
  }
  .comparison-images {
    height: 300px;
  }
  .slider-label {
    display: grid;
    gap: 0;
  }
  .project-facts {
    grid-template-columns: 1fr 1fr;
  }
  .dossier-photo {
    height: 290px;
  }
}
</style>
