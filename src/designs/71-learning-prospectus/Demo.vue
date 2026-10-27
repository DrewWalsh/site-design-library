<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useSpecimen } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const programmes = [
  {
    name: 'Digital design foundations',
    area: 'Design',
    weeks: 8,
    fee: 420,
    day: 'Tuesday evenings',
    prereq: 'No previous design training',
    outcome: 'A small, coherent digital project',
  },
  {
    name: 'Practical data skills',
    area: 'Technology',
    weeks: 6,
    fee: 360,
    day: 'Thursday evenings',
    prereq: 'Comfortable using a spreadsheet',
    outcome: 'A clear analysis with reproducible steps',
  },
  {
    name: 'Writing for public life',
    area: 'Communication',
    weeks: 10,
    fee: 480,
    day: 'Saturday mornings',
    prereq: 'A short writing sample',
    outcome: 'A portfolio of three revised pieces',
  },
];
const area = ref('All areas'),
  selected = ref(0),
  compare = ref<number[]>([0, 1]),
  name = ref(''),
  email = ref(''),
  ready = ref(false),
  sent = ref(false),
  lesson = ref(''),
  lessonDone = ref(false);
const course = computed(() => programmes[selected.value]);
function choose(i: number) {
  selected.value = i;
  sent.value = false;
  go('programme');
}
function toggle(i: number) {
  compare.value = compare.value.includes(i)
    ? compare.value.filter((x) => x !== i)
    : compare.value.length < 2
      ? [...compare.value, i]
      : [compare.value[1], i];
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header class="college-header wrap">
      <a :href="href('start')" class="college-logo">NORTHBANK<span>CONTINUING STUDIES</span></a>
      <nav class="row">
        <a :href="href('start') + '#programmes'">Find a programme</a
        ><button class="text-link" @click="go('programme')">Try a lesson</button
        ><button class="primary" @click="go('enrol')">Your next step →</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="prospectus-hero wrap">
          <div class="prospectus-label">
            <span>PROSPECTUS</span><strong>26<br />/27</strong
            ><small>A fictional learning institution</small>
          </div>
          <div>
            <p class="eyebrow">Learning that fits a working life.</p>
            <h1>Make room<br />for what’s next.</h1>
            <p class="lead">
              Part-time programmes with a clear commitment: what you’ll learn, what you’ll need, and
              the work you’ll leave with.
            </p>
            <a class="primary" href="#programmes">Explore the programmes ↓</a>
            <div class="term-line">
              <span>Next sample intake</span><b>January 2027</b><span>Evenings &amp; weekends</span>
            </div>
          </div>
        </section>
        <section id="programmes" class="wrap section programme-index">
          <div class="section-heading">
            <h2>Find the right<br />starting point.</h2>
            <label
              >Subject area<select v-model="area">
                <option>All areas</option>
                <option>Design</option>
                <option>Technology</option>
                <option>Communication</option>
              </select></label
            >
          </div>
          <article
            v-for="p in programmes.filter((p) => area === 'All areas' || p.area === area)"
            :key="p.name"
            class="programme-row"
          >
            <span class="programme-area">{{ p.area }}</span>
            <div>
              <h3>{{ p.name }}</h3>
              <p>{{ p.weeks }} weeks · {{ p.day }}</p>
            </div>
            <strong>&#36;{{ p.fee }}</strong
            ><label class="checkline"
              ><input
                type="checkbox"
                :checked="compare.includes(programmes.indexOf(p))"
                @change="toggle(programmes.indexOf(p))"
                :aria-label="'Compare ' + p.name"
              />Compare</label
            ><button @click="choose(programmes.indexOf(p))" :aria-label="'Explore ' + p.name">
              Explore ↗
            </button>
          </article>
        </section>
        <section class="comparison-band">
          <div class="wrap">
            <p class="eyebrow">Know the commitment</p>
            <h2>Compare before you commit.</h2>
            <div v-if="compare.length" class="wide-table">
              <table>
                <caption>
                  {{
                    compare.length
                  }}
                  selected programmes · select up to two above
                </caption>
                <thead>
                  <tr>
                    <th>Consideration</th>
                    <th v-for="i in compare" :key="i">{{ programmes[i].name }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Length</th>
                    <td v-for="i in compare" :key="i">{{ programmes[i].weeks }} weeks</td>
                  </tr>
                  <tr>
                    <th>Time</th>
                    <td v-for="i in compare" :key="i">{{ programmes[i].day }}</td>
                  </tr>
                  <tr>
                    <th>Before you start</th>
                    <td v-for="i in compare" :key="i">{{ programmes[i].prereq }}</td>
                  </tr>
                  <tr>
                    <th>You’ll work towards</th>
                    <td v-for="i in compare" :key="i">{{ programmes[i].outcome }}</td>
                  </tr>
                  <tr>
                    <th>Sample fee</th>
                    <td v-for="i in compare" :key="i">&#36;{{ programmes[i].fee }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p v-else class="notice">Choose a programme in the index to start a comparison.</p>
          </div>
        </section>
        <section class="wrap section study-support">
          <h2>A clear path<br />into the classroom.</h2>
          <div>
            <p>
              Ask about access, materials, the weekly workload, and how feedback works. A useful
              prospectus makes the practical questions as visible as the possibilities.
            </p>
            <button class="primary" @click="go('programme')">See a sample lesson →</button>
          </div>
        </section></template
      >
      <section v-else class="wrap state-page">
        <button class="back text-link" @click="go('start')">← Programme index</button>
        <p class="eyebrow">{{ course.area }} / JANUARY 2027</p>
        <h1>{{ state === 'programme' ? course.name : 'A place to begin.' }}</h1>
        <div class="course-layout">
          <div v-if="state === 'programme'">
            <p class="lead">
              {{ course.outcome }}. Build your understanding through short exercises, practical
              feedback, and a project you can explain.
            </p>
            <section class="course-section">
              <h2>What you’ll work on</h2>
              <ol>
                <li>Understand the basic principles and vocabulary.</li>
                <li>Use them in a small, focused exercise.</li>
                <li>Get feedback and revise the work.</li>
                <li>Present a finished piece with a clear rationale.</li>
              </ol>
            </section>
            <section class="sample-lesson">
              <p class="eyebrow">Try a short sample lesson</p>
              <h2>Explain one decision.</h2>
              <p>
                Choose a piece of everyday communication: a sign, a chart, or a paragraph. Describe
                who it helps, what it asks them to do, and one change that could make it clearer.
              </p>
              <form class="form" @submit.prevent="lessonDone = true">
                <label>Your sample reflection<textarea required v-model="lesson"></textarea></label
                ><button>Save reflection on this page</button>
              </form>
              <p v-if="lessonDone" class="notice" role="status">
                Reflection saved locally for this page. In the programme, a tutor would discuss the
                reasoning and offer feedback.
              </p>
            </section>
          </div>
          <form v-else-if="!sent" class="form" @submit.prevent="sent = true">
            <label
              >Programme<select v-model.number="selected">
                <option v-for="(p, i) in programmes" :key="p.name" :value="i">{{ p.name }}</option>
              </select></label
            ><label>Your name<input required v-model="name" /></label
            ><label>Email<input required type="email" v-model="email" /></label
            ><label class="checkline"
              ><input type="checkbox" required v-model="ready" />I have reviewed the prerequisites
              and weekly commitment.</label
            ><button class="primary">Review enrolment interest</button>
            <p class="muted">
              No payment, admission decision, or qualification is offered by this sample.
            </p>
          </form>
          <div v-else class="confirmation" role="status">
            <h2>Your next step is clear.</h2>
            <p>{{ name }} · {{ course.name }}<br />{{ course.day }} · {{ course.weeks }} weeks</p>
            <p>
              No enrolment was submitted. A real institution would explain admissions, payment,
              cancellation, and support next.
            </p>
          </div>
          <aside class="course-facts">
            <span class="eyebrow">At a glance</span>
            <dl>
              <dt>Duration</dt>
              <dd>{{ course.weeks }} weeks</dd>
              <dt>Schedule</dt>
              <dd>{{ course.day }}</dd>
              <dt>Prerequisite</dt>
              <dd>{{ course.prereq }}</dd>
              <dt>Sample fee</dt>
              <dd>&#36;{{ course.fee }}</dd>
            </dl>
            <button v-if="state === 'programme'" class="primary" @click="go('enrol')">
              Enrolment information →
            </button>
            <p>
              Illustrative curriculum. Verify actual accreditation, fees, delivery arrangements, and
              learning outcomes in the destination site.
            </p>
          </aside>
        </div>
      </section>
    </main>
    <footer class="sample-footer">
      <span>Northbank / Continuing studies · Fictional design reference 71.</span
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

.college-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  padding-top: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid var(--line);
}
.college-logo {
  font: 700 25px/1 var(--body);
  letter-spacing: -0.03em;
  text-decoration: none;
}
.college-logo span {
  display: block;
  font: 9px/1.5 var(--body);
  letter-spacing: 0.15em;
  margin-top: 10px;
}
.college-header nav {
  font-size: 13px;
}
.prospectus-hero {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 70px;
  padding-top: 55px;
  padding-bottom: 55px;
}
.prospectus-label {
  background: #454e92;
  color: white;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.prospectus-label > span {
  font-size: 11px;
  letter-spacing: 0.15em;
}
.prospectus-label strong {
  font: 400 95px/0.9 var(--body);
  letter-spacing: -0.075em;
  margin: 35px 0;
}
.prospectus-label small {
  font-size: 10px;
}
.prospectus-hero h1 {
  font-weight: 500;
  font-size: clamp(3.1rem, 5vw, 5rem);
  margin: 20px 0 25px;
}
.prospectus-hero .primary {
  margin: 30px 0;
}
.term-line {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  border-top: 1px solid var(--line);
  padding-top: 20px;
  font-size: 12px;
}
.programme-index {
  border-top: 1px solid var(--ink);
}
.section-heading > label {
  display: grid;
  gap: 8px;
  font-size: 12px;
}
.programme-row {
  display: grid;
  grid-template-columns: 105px 1fr 70px 95px 95px;
  gap: 20px;
  align-items: center;
  padding: 25px 0;
  border-bottom: 1px solid var(--line);
}
.programme-area {
  font-size: 11px;
  color: #454e92;
}
.programme-row h3 {
  font-size: 24px;
  font-weight: 500;
}
.programme-row p {
  font-size: 13px;
  margin-top: 10px;
}
.programme-row > strong {
  font-size: 19px;
}
.programme-row label,
.programme-row button {
  font-size: 12px;
}
.programme-row input {
  accent-color: var(--accent);
}
.comparison-band {
  padding: 55px 0;
  background: #e4e5ef;
}
.comparison-band h2 {
  font-weight: 500;
  margin: 20px 0 30px;
}
.comparison-band table {
  font-size: 14px;
}
.comparison-band caption {
  text-align: left;
  font-size: 12px;
  margin-bottom: 15px;
}
.comparison-band th {
  font-weight: 600;
}
.comparison-band td,
.comparison-band th {
  padding: 18px 20px;
}
.study-support {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
}
.study-support h2 {
  font-weight: 500;
}
.study-support button {
  margin-top: 25px;
}
.course-layout {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 65px;
  margin-top: 35px;
}
.course-section {
  padding: 35px 0;
}
.course-section h2 {
  font-size: 28px;
  font-weight: 500;
}
.course-section li {
  padding: 9px 0;
}
.sample-lesson {
  background: #e4e5ef;
  padding: 30px;
  border-top: 3px solid var(--accent);
}
.sample-lesson h2 {
  font-size: 27px;
  margin: 18px 0 20px;
  font-weight: 500;
}
.sample-lesson form {
  margin-top: 25px;
}
.course-facts {
  border: 1px solid #aeb2c9;
  padding: 30px;
  align-self: start;
}
.course-facts dt {
  margin-top: 23px;
}
.course-facts dd {
  font-size: 17px;
  margin-top: 7px;
}
.course-facts .primary {
  margin-top: 30px;
  width: 100%;
}
.course-facts > p {
  font-size: 12px;
  margin-top: 25px;
}
@media (max-width: 760px) {
  .college-header nav > a,
  .college-header .text-link {
    display: none;
  }
  .college-header .primary {
    font-size: 11px;
    padding: 9px;
  }
  .college-logo {
    font-size: 19px;
  }
  .college-logo span {
    font-size: 8px;
  }
  .prospectus-hero {
    grid-template-columns: 1fr;
    gap: 25px;
    padding-top: 30px;
  }
  .prospectus-label {
    flex-direction: row;
    align-items: center;
    padding: 18px 20px;
    gap: 20px;
  }
  .prospectus-label strong {
    font-size: 30px;
    margin: 0;
  }
  .prospectus-label strong br {
    display: none;
  }
  .prospectus-label small {
    font-size: 9px;
    max-width: 80px;
  }
  .prospectus-hero h1 {
    font-size: 3.2rem;
  }
  .programme-row {
    grid-template-columns: 1fr auto;
    gap: 14px;
  }
  .programme-area {
    grid-column: 1/-1;
  }
  .programme-row h3 {
    font-size: 22px;
  }
  .programme-row > div {
    grid-column: 1;
  }
  .programme-row > label {
    grid-column: 1;
  }
  .programme-row button {
    grid-column: 2;
  }
  .programme-row > strong {
    grid-row: 2;
    grid-column: 2;
  }
  .study-support,
  .course-layout {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .sample-lesson {
    padding: 23px;
  }
}

.eyebrow {
  font: 500 13px/1.5 var(--body);
  letter-spacing: 0;
  text-transform: none;
}
</style>
