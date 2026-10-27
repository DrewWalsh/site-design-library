<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useSpecimen } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const jobs = [
  {
    title: 'Product designer',
    team: 'Design',
    location: 'Hybrid · Northbank',
    salary: '$78,000–$96,000',
    type: 'Full time',
  },
  {
    title: 'Customer success specialist',
    team: 'Customer',
    location: 'Remote · Canada',
    salary: '$58,000–$70,000',
    type: 'Full time',
  },
  {
    title: 'Frontend developer',
    team: 'Engineering',
    location: 'Hybrid · Northbank',
    salary: '$88,000–$112,000',
    type: 'Full time',
  },
];
const team = ref('All teams'),
  query = ref(''),
  selected = ref(0),
  name = ref(''),
  email = ref(''),
  link = ref(''),
  answer = ref(''),
  sent = ref(false),
  role = computed(() => jobs[selected.value]);
const filtered = computed(() =>
  jobs.filter(
    (j) =>
      (team.value === 'All teams' || j.team === team.value) &&
      (j.title + ' ' + j.location).toLowerCase().includes(query.value.toLowerCase()),
  ),
);
function open(i: number) {
  selected.value = i;
  sent.value = false;
  go('role');
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header class="careers-header wrap">
      <a :href="href('start')" class="fieldwork-logo"
        >FIELDWORK<span>PEOPLE MAKE THE WORK.</span></a
      >
      <nav class="row">
        <a :href="href('start') + '#people'">Life here</a
        ><a :href="href('start') + '#roles'">Open roles</a
        ><button class="primary" @click="go('role')">Find your next role →</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="careers-hero wrap">
          <p class="eyebrow">Come as a person. do work that matters.</p>
          <h1>Good work is<br />a team sport.</h1>
          <div class="hero-bottom">
            <p class="lead">
              We make practical tools for people doing useful things. We’re looking for curious
              colleagues who care about the work—and how it gets done.
            </p>
            <a class="roles-count" href="#roles"
              ><strong>03</strong><span>sample open roles<br />Find your place ↙</span></a
            >
          </div>
        </section>
        <section id="people" class="staff-stories wrap">
          <article class="staff-quote">
            <div class="story-initial" aria-hidden="true">JL</div>
            <p>
              “The best part of a project is the conversation where we finally understand the
              problem together.”
            </p>
            <footer>
              Jamie Lin · Sample product designer<br /><small>Fictional staff story</small>
            </footer>
          </article>
          <div class="work-practices">
            <p class="eyebrow">What the everyday looks like</p>
            <div>
              <h2>Clear expectations.</h2>
              <p>
                Written priorities, time for focused work, and feedback while there is still room to
                use it.
              </p>
            </div>
            <div>
              <h2>Room for a life.</h2>
              <p>
                Explain actual working hours, flexibility, leave, and location requirements plainly.
              </p>
            </div>
            <div>
              <h2>A fair process.</h2>
              <p>Publish the stages, the compensation range, and what candidates should prepare.</p>
            </div>
          </div>
        </section>
        <section id="roles" class="wrap section role-index">
          <div class="section-heading">
            <h2>Find your place<br />in the work.</h2>
            <p>
              Transparent sample roles. The details should help a candidate decide before they
              invest in an application.
            </p>
          </div>
          <div class="role-filters">
            <label>Search roles<input v-model="query" placeholder="Title or location" /></label
            ><label
              >Team<select v-model="team">
                <option>All teams</option>
                <option>Design</option>
                <option>Customer</option>
                <option>Engineering</option>
              </select></label
            >
          </div>
          <p class="muted" role="status">{{ filtered.length }} open sample roles</p>
          <button
            class="role-row"
            v-for="j in filtered"
            :key="j.title"
            @click="open(jobs.indexOf(j))"
          >
            <span>{{ j.team }}</span>
            <div>
              <h3>{{ j.title }}</h3>
              <p>{{ j.location }} · {{ j.type }}</p>
            </div>
            <strong>{{ j.salary }}</strong
            ><b aria-hidden="true">↗</b>
          </button>
          <p class="notice" v-if="!filtered.length">
            No sample roles match. Clear the title or choose another team.
          </p>
        </section>
        <section class="hiring-process">
          <div class="wrap">
            <p class="eyebrow">No guessing what happens next.</p>
            <div class="three">
              <article
                v-for="(p, i) in [
                  [
                    'A first conversation',
                    'Discuss the work, your experience, and what you’re looking for.',
                  ],
                  [
                    'A focused work discussion',
                    'Explore a relevant example. Scope and time expectations are explained in advance.',
                  ],
                  [
                    'A mutual decision',
                    'Meet the people, ask the practical questions, and hear the next steps.',
                  ],
                ]"
                :key="p[0]"
              >
                <span>0{{ i + 1 }}</span>
                <h2>{{ p[0] }}</h2>
                <p>{{ p[1] }}</p>
              </article>
            </div>
          </div>
        </section></template
      >
      <section v-else class="wrap state-page">
        <button class="back text-link" @click="go('start')">← All roles</button>
        <p class="eyebrow">{{ role.team }} / {{ role.location }}</p>
        <h1>{{ state === 'role' ? role.title : 'Tell us about your work.' }}</h1>
        <div class="job-detail">
          <article v-if="state === 'role'">
            <p class="lead">
              Join a small team making everyday work easier to understand. This fictional role shows
              the useful information a candidate should find before applying.
            </p>
            <h2>The work</h2>
            <ul>
              <li>Understand a practical user problem with the team.</li>
              <li>Develop a clear approach and explain the tradeoffs.</li>
              <li>Work with colleagues to deliver and improve the result.</li>
            </ul>
            <h2>What you’ll bring</h2>
            <ul>
              <li>Relevant experience demonstrated through work examples.</li>
              <li>Clear communication and a willingness to ask useful questions.</li>
              <li>Care for usability, reliability, and the people doing the work.</li>
            </ul>
            <h2>The first few months</h2>
            <p>
              Learn the product, contribute to a scoped project, and agree your goals with the team.
              A real vacancy should make role-specific responsibilities and essential requirements
              concrete.
            </p>
            <button class="primary" @click="go('apply')">Start a sample application →</button>
          </article>
          <form v-else-if="!sent" class="form" @submit.prevent="sent = true">
            <label>Name<input required v-model="name" /></label
            ><label>Email<input required type="email" v-model="email" /></label
            ><label
              >Work example URL (optional)<input
                type="url"
                v-model="link"
                placeholder="https://example.com/work" /></label
            ><label
              >Tell us about a relevant piece of work<textarea required v-model="answer"></textarea>
            </label>
            <p class="muted">
              Use fictional details. This sample does not upload a CV or send an application.
            </p>
            <button class="primary">Review application</button>
          </form>
          <div v-else class="confirmation" role="status">
            <h2>Your application summary.</h2>
            <p>{{ name }} · {{ role.title }}</p>
            <p>{{ answer }}</p>
            <p>
              No application was submitted. A real employer would provide a receipt, privacy
              information, and an expected response process.
            </p>
          </div>
          <aside class="role-facts">
            <p class="eyebrow">The important details</p>
            <h2>{{ role.title }}</h2>
            <dl>
              <dt>Compensation</dt>
              <dd>{{ role.salary }} CAD / year</dd>
              <dt>Location</dt>
              <dd>{{ role.location }}</dd>
              <dt>Commitment</dt>
              <dd>{{ role.type }}</dd>
              <dt>Hiring stages</dt>
              <dd>Conversation → work discussion → team meeting</dd>
            </dl>
            <p>
              Fictional employer and salary range. Requests for access arrangements should have a
              clear human contact in a live hiring process.
            </p>
          </aside>
        </div>
      </section>
    </main>
    <footer class="sample-footer">
      <span>FIELDWORK / Careers · Fictional design reference 72.</span
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

.careers-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  padding-top: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid var(--line);
}
.fieldwork-logo {
  font: 700 27px/1 var(--heading);
  letter-spacing: -0.04em;
  text-decoration: none;
}
.fieldwork-logo span {
  display: block;
  font: 8px/1.5 var(--body);
  letter-spacing: 0.13em;
  margin-top: 10px;
}
.careers-header nav {
  font-size: 13px;
}
.careers-hero {
  padding-top: 55px;
  padding-bottom: 50px;
}
.careers-hero h1 {
  font-size: clamp(4rem, 7vw, 7rem);
  line-height: 1.02;
  margin: 25px 0 30px;
  font-weight: 500;
}
.hero-bottom {
  display: flex;
  justify-content: space-between;
  gap: 50px;
  align-items: end;
}
.roles-count {
  display: flex;
  align-items: center;
  gap: 22px;
  text-decoration: none;
  background: #e3b1a3;
  padding: 20px 30px;
  transform: rotate(3deg);
}
.roles-count strong {
  font: 65px/1 var(--heading);
  letter-spacing: -0.08em;
}
.roles-count span {
  font-size: 12px;
}
.staff-stories {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 50px;
  padding-bottom: 55px;
}
.staff-quote {
  background: #d5d0b9;
  padding: 35px;
  border-radius: 90px 0 0 0;
}
.story-initial {
  font: 55px var(--heading);
  color: #5d5944;
}
.staff-quote > p {
  font:
    26px/1.5 Georgia,
    serif;
  margin: 25px 0;
}
.staff-quote footer {
  font-size: 13px;
}
.staff-quote small {
  font-size: 10px;
}
.work-practices > div {
  padding: 20px 0;
  border-bottom: 1px solid var(--line);
}
.work-practices h2 {
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 13px;
}
.work-practices p {
  font-size: 14px;
}
.role-index {
  border-top: 1px solid var(--ink);
}
.role-filters {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 25px;
  margin-bottom: 20px;
}
.role-filters label {
  display: grid;
  gap: 8px;
  font-size: 12px;
}
.role-row {
  display: grid;
  grid-template-columns: 105px 1fr 180px 20px;
  align-items: center;
  gap: 25px;
  padding: 25px 0;
  width: 100%;
  border: 0;
  border-bottom: 1px solid var(--ink);
  background: transparent;
  text-align: left;
}
.role-row > span {
  font-size: 12px;
  font-weight: 400;
}
.role-row h3 {
  font-size: 25px;
  font-weight: 500;
}
.role-row p {
  font-size: 12px;
  font-weight: 400;
  margin-top: 10px;
}
.role-row > strong {
  font-size: 16px;
}
.role-row > b {
  font-size: 25px;
}
.hiring-process {
  background: #e6b7aa;
  padding: 55px 0;
}
.hiring-process .three {
  margin-top: 30px;
}
.hiring-process article > span {
  font: 30px var(--heading);
}
.hiring-process h2 {
  font-size: 26px;
  margin: 20px 0;
}
.hiring-process p {
  font-size: 14px;
}
.job-detail {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 65px;
  margin-top: 35px;
}
.job-detail article h2 {
  font-size: 29px;
  font-weight: 500;
  margin: 35px 0 20px;
}
.job-detail li {
  margin: 12px 0;
}
.job-detail article > .primary {
  margin-top: 30px;
}
.role-facts {
  background: #e4c7bb;
  padding: 30px;
  align-self: start;
}
.role-facts h2 {
  font-size: 30px;
  margin: 20px 0;
}
.role-facts dt {
  margin-top: 22px;
}
.role-facts dd {
  font-size: 16px;
  margin-top: 7px;
}
.role-facts > p:last-child {
  font-size: 12px;
  margin-top: 30px;
}
@media (max-width: 760px) {
  .careers-header nav > a {
    display: none;
  }
  .careers-header .primary {
    font-size: 11px;
    padding: 9px;
  }
  .fieldwork-logo {
    font-size: 21px;
  }
  .fieldwork-logo span {
    font-size: 7px;
    max-width: 140px;
  }
  .careers-hero {
    padding-top: 35px;
  }
  .careers-hero h1 {
    font-size: 3.8rem;
  }
  .hero-bottom {
    display: block;
  }
  .roles-count {
    margin-top: 25px;
    display: inline-flex;
    padding: 15px 25px;
  }
  .roles-count strong {
    font-size: 50px;
  }
  .staff-stories,
  .job-detail {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .staff-quote {
    padding: 30px;
  }
  .staff-quote > p {
    font-size: 24px;
  }
  .role-filters {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  .role-row {
    grid-template-columns: 1fr 20px;
    gap: 12px;
  }
  .role-row > span {
    grid-column: 1;
  }
  .role-row > div {
    grid-column: 1;
  }
  .role-row > b {
    grid-column: 2;
    grid-row: 2;
  }
  .role-row > strong {
    grid-column: 1;
    font-size: 15px;
  }
  .role-row h3 {
    font-size: 23px;
  }
}

.eyebrow {
  font: 500 13px/1.5 var(--body);
  letter-spacing: 0;
  text-transform: none;
}
</style>
