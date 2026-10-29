<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useSpecimen } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const amount = ref(50),
  project = ref('Riverbank planting'),
  kind = ref('Contribution'),
  name = ref(''),
  email = ref(''),
  sent = ref(false);
const allocations = computed(() => [
  { name: 'Project work', percent: 60, value: amount.value * 0.6 },
  { name: 'Tools & training', percent: 25, value: amount.value * 0.25 },
  { name: 'Reporting & coordination', percent: 15, value: amount.value * 0.15 },
]);
</script>
<template>
  <div class="specimen" :class="{ entry: state === 'start' }">
    <a class="skip" href="#content">Skip to content</a>
    <header class="ground-header wrap">
      <a :href="href('start')" class="ground-logo"
        >Common<br /><em>Ground</em><span>RIVER TRUST</span></a
      >
      <nav class="row">
        <button class="text-link" @click="go('impact')">The work &amp; results</button
        ><a :href="href('start') + '#projects'">Our projects</a
        ><button class="primary" @click="go('contribute')">Be part of it →</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="project-opening wrap">
          <div class="project-measure">
            <p class="eyebrow">01 / Riverbank planting / planned work</p>
            <h1>120<span>metres</span></h1>
            <p class="measure-caption">A patchy riverbank. A specific place to begin.</p>
            <div class="transect" aria-hidden="true">
              <i v-for="n in 24" :key="n" :style="{ height: 20 + ((n * 17) % 70) + '%' }"></i>
            </div>
            <div class="measure-scale"><span>0 m</span><span>60 m</span><span>120 m</span></div>
            <p>
              Planned restoration with locally appropriate plants.<br />Fictional project target; no
              completed impact is claimed.
            </p>
            <button class="text-link" @click="go('impact')">Read the project record →</button>
          </div>
          <aside class="allocation-entry">
            <h2>Where a contribution goes</h2>
            <div class="row">
              <button
                v-for="a in [25, 50, 100]"
                :key="a"
                :aria-pressed="amount === a"
                @click="amount = a"
              >
                $ {{ a }}
              </button>
            </div>
            <dl aria-live="polite">
              <div v-for="a in allocations" :key="a.name">
                <dt>
                  {{ a.name }}<small>{{ a.percent }}%</small>
                </dt>
                <dd>$ {{ a.value.toFixed(2) }}</dd>
              </div>
            </dl>
            <p>Illustrative allocation. No payment is collected.</p>
            <button class="primary" @click="go('contribute')">Explore a contribution →</button>
          </aside>
        </section>
        <section id="projects" class="wrap section projects">
          <div class="section-heading">
            <h2>See where<br />the work happens.</h2>
            <p>Each project has a practical goal, a method, and a way to show what changed.</p>
          </div>
          <article
            class="project-row"
            v-for="(p, i) in [
              [
                'Riverbank planting',
                'Restore a 120-metre stretch with locally appropriate plants.',
                'Planting days / seasonal care',
              ],
              [
                'Water watch',
                'Build a consistent record of conditions at three sample points.',
                'Training / monthly observations',
              ],
              [
                'Paths to the water',
                'Make the riverside easier to understand and care for.',
                'Wayfinding / community walks',
              ],
            ]"
            :key="p[0]"
          >
            <span>0{{ i + 1 }}</span>
            <h3>{{ p[0] }}</h3>
            <div>
              <p>{{ p[1] }}</p>
              <small>{{ p[2] }}</small>
            </div>
            <button
              @click="
                project = p[0];
                go('impact');
              "
              :aria-label="'Explore ' + p[0]"
            >
              Explore ↗
            </button>
          </article>
        </section>
        <section class="wrap river-context">
          <figure class="river-illustration">
            <svg
              viewBox="0 0 500 500"
              role="img"
              aria-label="Illustrated river landscape with planted banks, footpath, and three project markers"
            >
              <rect width="500" height="500" fill="#dce2b9" />
              <path
                d="M335-40C70 75 480 190 245 300S160 440 330 540"
                fill="none"
                stroke="#80aca5"
                stroke-width="85"
              />
              <path
                d="M240-20C-25 125 375 190 150 320S55 450 220 530"
                fill="none"
                stroke="#faf2d3"
                stroke-width="15"
              />
              <g fill="#7b9860">
                <circle cx="70" cy="80" r="42" />
                <circle cx="410" cy="340" r="65" />
                <circle cx="90" cy="400" r="45" />
                <circle cx="390" cy="110" r="34" />
              </g>
              <g fill="#2b4336" stroke="#f0f0dc" stroke-width="4">
                <circle cx="235" cy="92" r="23" />
                <circle cx="322" cy="250" r="23" />
                <circle cx="200" cy="390" r="23" />
              </g>
              <g fill="#fff" font-family="sans-serif" font-size="15" text-anchor="middle">
                <text x="235" y="98">01</text>
                <text x="322" y="256">02</text>
                <text x="200" y="396">03</text>
              </g>
            </svg>
            <figcaption>Three sample projects along one fictional river</figcaption>
          </figure>
          <div>
            <h2>One river, three places to work.</h2>
            <p>
              Planting, observation and access form a connected programme. Each project has its own
              record, methods and reporting limits.
            </p>
          </div>
        </section>
        <section class="impact-band">
          <div class="wrap two">
            <div>
              <p class="eyebrow">ACCOUNTABILITY IS PART OF THE WORK.</p>
              <h2>Show the progress.<br />Explain the limits.</h2>
              <p>
                Useful reporting names the period, the method, and what the numbers can’t tell us
                yet.
              </p>
            </div>
            <div class="impact-ledger">
              <div><strong>120 m</strong><span>sample planting area planned</span></div>
              <div><strong>3</strong><span>sample observation points</span></div>
              <div><strong>1 year</strong><span>illustrative reporting cycle</span></div>
              <button class="text-link" @click="go('impact')">Read the project record →</button>
            </div>
          </div>
        </section>
        <section class="wrap section volunteer">
          <h2>Give a little time.<br />Make a local difference.</h2>
          <div>
            <p>
              Not every contribution is financial. A sample volunteer day might include planting,
              recording observations, or helping a community walk run smoothly.
            </p>
            <button
              class="primary"
              @click="
                kind = 'Volunteering';
                go('contribute');
              "
            >
              Explore volunteering →
            </button>
          </div>
        </section></template
      >
      <section v-else class="wrap state-page">
        <button class="back text-link" @click="go('start')">← Common Ground</button
        ><template v-if="state === 'impact'"
          ><p class="eyebrow">PROJECT RECORD / ILLUSTRATIVE EVIDENCE</p>
          <h1>{{ project }}</h1>
          <div class="two section">
            <div>
              <h2>What we’re trying<br />to change.</h2>
              <p>
                {{
                  project === 'Riverbank planting'
                    ? 'A patchy bank with limited plant cover becomes a site for careful planting and repeat observation.'
                    : project === 'Water watch'
                      ? 'A consistent observation record makes changes easier to discuss and follow up.'
                      : 'A clearer connection between the neighbourhood and the river supports shared care.'
                }}
              </p>
              <h3 class="record-heading">What gets recorded</h3>
              <ul>
                <li>Location and reporting period</li>
                <li>Work completed and who participated</li>
                <li>Method, source material, and limitations</li>
                <li>What remains to be done</li>
              </ul>
            </div>
            <div class="evidence-note">
              <p class="eyebrow">SAMPLE REPORTING NOTE / 2026</p>
              <h2>Progress has context.</h2>
              <p>
                These numbers are fixtures, not environmental evidence. A real project should link
                to its dated observations, methodology, financial records, and independent review
                where appropriate.
              </p>
              <p>
                Reporting status: demonstration<br />Source: fictional project record<br />Next
                step: establish a real baseline
              </p>
            </div>
          </div>
          <button class="primary" @click="go('contribute')">
            Support this kind of work →
          </button></template
        ><template v-else
          ><h1>Choose your part.</h1>
          <div class="contribution-layout">
            <form class="form" v-if="!sent" @submit.prevent="sent = true">
              <fieldset>
                <legend>How would you like to help?</legend>
                <label v-for="k in ['Contribution', 'Volunteering']" :key="k"
                  ><input type="radio" v-model="kind" :value="k" />{{ k }}</label
                >
              </fieldset>
              <label
                >Project<select v-model="project">
                  <option>Riverbank planting</option>
                  <option>Water watch</option>
                  <option>Paths to the water</option>
                </select></label
              >
              <fieldset v-if="kind === 'Contribution'">
                <legend>Sample amount</legend>
                <label v-for="a in [25, 50, 100]" :key="a"
                  ><input type="radio" v-model="amount" :value="a" />&#36;{{ a }}</label
                >
              </fieldset>
              <div v-else class="notice">
                Sample volunteer session: Saturday 14 November, 10:00–13:00. A real organiser would
                confirm access, equipment, and supervision before a session.
              </div>
              <label>Name<input required v-model="name" /></label
              ><label>Email<input required type="email" v-model="email" /></label
              ><button class="primary">
                {{
                  kind === 'Contribution'
                    ? 'Review contribution choice'
                    : 'Review volunteer interest'
                }}
              </button>
              <p class="muted">This sample never requests payment details.</p>
            </form>
            <div v-else class="confirmation" role="status">
              <h2>A part worth playing.</h2>
              <p>
                {{ kind }} · {{ project }}<br />{{
                  kind === 'Contribution'
                    ? 'Sample amount: $' + amount
                    : 'Volunteer interest prepared'
                }}
              </p>
              <p>No donation, registration, or message was submitted.</p>
            </div>
            <aside class="allocation">
              <p class="eyebrow">HOW A SAMPLE CONTRIBUTION IS USED</p>
              <h2>&#36;{{ amount }}<span>with a clear purpose.</span></h2>
              <div class="allocation-bar" aria-hidden="true">
                <span
                  v-for="(a, i) in allocations"
                  :key="a.name"
                  :class="'allocation-' + i"
                  :style="{ width: a.percent + '%' }"
                ></span>
              </div>
              <dl>
                <div v-for="a in allocations" :key="a.name">
                  <dt>{{ a.name }} · {{ a.percent }}%</dt>
                  <dd>&#36;{{ a.value.toFixed(2) }}</dd>
                </div>
              </dl>
              <p>
                Illustrative allocation only. Actual project restrictions, overheads, and use of
                funds should be explained accurately before accepting support.
              </p>
            </aside>
          </div></template
        >
      </section>
    </main>
    <footer class="sample-footer">
      <span>Common Ground / River trust · Fictional design reference 69.</span
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

.ground-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  padding-top: 30px;
  padding-bottom: 30px;
}
.ground-logo {
  font: 700 25px/0.95 var(--heading);
  letter-spacing: -0.05em;
  text-decoration: none;
}
.ground-logo em {
  font-weight: 400;
  font-style: normal;
}
.ground-logo span {
  display: block;
  font: 8px/1.4 var(--body);
  letter-spacing: 0.16em;
  margin-top: 10px;
}
.ground-header nav {
  font-size: 13px;
}
.river-hero {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 65px;
  padding-top: 40px;
  padding-bottom: 50px;
  align-items: center;
}
.river-hero h1 {
  font-size: clamp(3rem, 4.8vw, 4.8rem);
  line-height: 1.1;
  margin: 25px 0;
}
.river-hero .primary {
  margin: 30px 0 18px;
}
.river-illustration {
  border-radius: 50% 50% 0 0;
  overflow: hidden;
}
.river-illustration figcaption {
  text-align: center;
  font-size: 11px;
}
.river-illustration svg {
  display: block;
  width: 100%;
}
.projects {
  border-top: 1px solid var(--ink);
}
.project-row {
  display: grid;
  grid-template-columns: 45px 1fr 1.25fr auto;
  gap: 30px;
  align-items: center;
  padding: 28px 0;
  border-bottom: 1px solid var(--line);
}
.project-row > span {
  font: 27px var(--heading);
  color: var(--accent);
}
.project-row h3 {
  font-size: 26px;
}
.project-row p {
  font-size: 14px;
}
.project-row small {
  font-size: 11px;
  display: block;
  margin-top: 10px;
}
.project-row button {
  font-size: 12px;
  background: transparent;
}
.impact-band {
  background: #d8e0b6;
  padding: 60px 0;
}
.impact-band h2 {
  margin: 20px 0 25px;
}
.impact-ledger > div {
  display: flex;
  align-items: center;
  gap: 25px;
  padding: 20px 0;
  border-bottom: 1px solid #8e9f76;
}
.impact-ledger strong {
  font: 40px var(--heading);
  min-width: 120px;
}
.impact-ledger span {
  font-size: 13px;
}
.impact-ledger button {
  margin-top: 20px;
}
.volunteer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
}
.volunteer button {
  margin-top: 25px;
}
.contribution-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 65px;
  margin-top: 40px;
}
.allocation {
  background: #dce2b9;
  padding: 35px;
}
.allocation h2 {
  font-size: 65px;
  margin: 20px 0 30px;
}
.allocation h2 > span {
  font: 20px var(--body);
  display: block;
  margin-top: 10px;
  letter-spacing: 0;
}
.allocation-bar {
  display: flex;
  height: 35px;
  margin-bottom: 25px;
}
.allocation-0 {
  background: #3b6a40;
}
.allocation-1 {
  background: #9a7b3d;
}
.allocation-2 {
  background: #466c76;
}
.allocation dl > div {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 15px 0;
  border-bottom: 1px solid #8e9f76;
}
.allocation dt {
  font-size: 13px;
}
.allocation > p:last-child {
  font-size: 12px;
  margin-top: 25px;
}
.evidence-note {
  border-top: 3px solid var(--accent);
  padding: 30px;
  background: #dce2b9;
}
.evidence-note h2 {
  margin: 20px 0 25px;
}
.record-heading {
  margin: 35px 0 20px;
}
@media (max-width: 760px) {
  .ground-header nav > a,
  .ground-header .text-link {
    display: none;
  }
  .ground-header .primary {
    font-size: 11px;
    padding: 9px;
  }
  .ground-logo {
    font-size: 22px;
  }
  .river-hero,
  .volunteer,
  .contribution-layout {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .river-hero {
    padding-top: 25px;
  }
  .river-hero h1 {
    font-size: 3rem;
  }
  .river-illustration {
    max-width: 380px;
    width: 100%;
    margin: auto;
  }
  .project-row {
    grid-template-columns: 30px 1fr;
    gap: 15px;
  }
  .project-row h3 {
    font-size: 24px;
  }
  .project-row > div,
  .project-row button {
    grid-column: 2;
  }
  .project-row button {
    justify-self: start;
  }
  .impact-ledger strong {
    font-size: 35px;
    min-width: 100px;
  }
  .allocation {
    padding: 25px;
  }
}

/* The entry is the experience itself; supporting routes retain its vocabulary. */
.project-opening {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 70px;
  padding: 30px 0 45px;
}
.project-measure h1 {
  font-size: 180px;
  line-height: 0.95;
  letter-spacing: -0.065em;
}
.project-measure h1 span {
  font-size: 30px;
  letter-spacing: 0;
  margin-left: 10px;
}
.measure-caption {
  font-size: 22px;
}
.transect {
  height: 95px;
  display: flex;
  gap: 5px;
  align-items: end;
  border-bottom: 6px solid #80aca5;
  margin-top: 25px;
}
.transect i {
  flex: 1;
  background: #7b9860;
  border-radius: 60% 40% 0 0;
}
.measure-scale {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 18px;
}
.project-measure > p:not(.eyebrow):not(.measure-caption) {
  font-size: 14px;
}
.project-measure button {
  margin-top: 15px;
}
.allocation-entry {
  border: 1px solid var(--ink);
  padding: 28px;
  align-self: center;
  transform: rotate(1deg);
  background: #e6e4c5;
}
.allocation-entry h2 {
  font-size: 27px;
  margin-bottom: 20px;
}
.allocation-entry button[aria-pressed='true'] {
  background: var(--accent);
  color: white;
}
.allocation-entry dl {
  margin: 20px 0;
}
.allocation-entry dl > div {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--line);
  padding: 14px 0;
}
.allocation-entry dt small {
  display: block;
}
.allocation-entry dd {
  font-size: 27px;
  margin: 0;
}
.allocation-entry > p {
  font-size: 12px;
  margin-bottom: 15px;
}
.river-context {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 45px;
  align-items: center;
  padding-bottom: 45px;
}
.river-context svg {
  max-height: 270px;
}
.river-context figcaption {
  font-size: 11px;
}
.river-context h2 {
  font-size: 34px;
}
@media (max-width: 700px) {
  .project-opening {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 20px 0 35px;
  }
  .project-measure h1 {
    font-size: 120px;
  }
  .project-measure h1 span {
    font-size: 23px;
  }
  .measure-caption {
    font-size: 19px;
  }
  .allocation-entry {
    padding: 22px;
    transform: none;
  }
  .river-context {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .river-context svg {
    width: 100%;
  }
}
.project-opening {
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: clamp(25px, 4vw, 70px);
}
.project-measure h1 {
  font-size: clamp(100px, 12.5vw, 180px);
}
@media (max-width: 900px) {
  .project-opening {
    grid-template-columns: 1fr;
  }
  .allocation-entry {
    transform: none;
  }
}
</style>
