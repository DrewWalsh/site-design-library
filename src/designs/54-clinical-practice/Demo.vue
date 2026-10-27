<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useSpecimen } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const name = ref(''),
  email = ref(''),
  visit = ref('New-patient visit'),
  preference = ref('Morning'),
  sent = ref(false);
const treatments = [
  [
    '01',
    'Everyday dental care',
    'Examinations, hygiene appointments, and a plan you can understand.',
  ],
  [
    '02',
    'Restorative appointments',
    'Time to discuss the options for a tooth that needs attention.',
  ],
  ['03', 'A first visit', 'A conversation, an examination, and space for your questions.'],
];
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <div class="clinic-top wrap">
      Accepting sample new-patient requests <span>Northbank · Monday–Friday, 8:30–17:30</span>
    </div>
    <header class="clinic-header wrap">
      <a :href="href('start')" class="clinic-brand"
        ><span aria-hidden="true">✳</span> fern<span>dental practice</span></a
      >
      <nav class="row">
        <a :href="href('start') + '#care'">Your care</a
        ><button class="text-link" @click="go('visit')">Your first visit</button
        ><button class="primary" @click="go('request')">Request an appointment</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="clinic-hero wrap">
          <div>
            <p class="eyebrow">A little clarity goes a long way.</p>
            <h1>Care that starts<br />with a conversation.</h1>
            <p class="lead">
              A calm place to ask questions, understand your options, and take the next step at your
              own pace.
            </p>
            <button class="primary" @click="go('request')">I’m new to the practice →</button>
            <p class="muted">A fictional practice demonstrating a patient-centred website.</p>
          </div>
          <figure>
            <img
              class="photo"
              src="https://drew-site-design-library.t3.tigrisfiles.io/assets/commercial/8a257af47105f49c-clinic.webp"
              alt="Bright, uncluttered clinical room with treatment equipment"
            />
            <figcaption>Clear, welcoming spaces · illustrative clinical interior</figcaption>
          </figure>
        </section>
        <section id="care" class="care-index wrap section">
          <div class="section-heading">
            <h2>Start with what<br />you need.</h2>
            <p>
              Clear descriptions before decisions. Explore the appointment, then ask the team about
              your individual needs.
            </p>
          </div>
          <button
            class="treatment"
            v-for="item in treatments"
            :key="item[0]"
            @click="
              visit =
                item[1] === 'A first visit' ? 'New-patient visit' : 'Discuss treatment options';
              go('visit');
            "
          >
            <span>{{ item[0] }}</span>
            <h3>{{ item[1] }}</h3>
            <p>{{ item[2] }}</p>
            <b aria-hidden="true">↗</b>
          </button>
        </section>
        <section class="people-band">
          <div class="wrap two">
            <div>
              <p class="eyebrow">People before procedures</p>
              <h2>Know who<br />you’re meeting.</h2>
              <p class="lead">
                Our sample practitioner profiles show roles and approach without filling the page
                with unexplained credentials.
              </p>
            </div>
            <div class="practitioner">
              <figure class="practitioner-photo">
                <img
                  src="https://drew-site-design-library.t3.tigrisfiles.io/assets/commercial/956c19d81638505f-practitioner.webp"
                  alt="AI-generated portrait of a fictional dental practitioner"
                />
                <figcaption>Fictional portrait illustration</figcaption>
              </figure>
              <div>
                <h3>Dr Alex Lee</h3>
                <p>General dentist · fictional profile</p>
                <p>
                  “I start by finding out what would make your appointment easier, then explain what
                  we’re going to do.”
                </p>
                <button class="text-link" @click="go('visit')">
                  What happens at a first visit →
                </button>
              </div>
            </div>
          </div>
        </section>
        <section class="wrap section two">
          <div>
            <h2>A few things<br />you might ask.</h2>
            <p>Tell the reception team about access needs or questions when requesting a time.</p>
          </div>
          <div>
            <details open>
              <summary>Can I ask for a longer first appointment?</summary>
              <p>
                The sample request includes an option to discuss appointment arrangements. In a real
                practice, the team would confirm what is possible before booking.
              </p>
            </details>
            <details>
              <summary>Where is the practice?</summary>
              <p>
                8 Fern Walk, Northbank. Ground-floor entrance, nearby bus stop, and space to leave a
                bicycle.
              </p>
            </details>
            <details>
              <summary>How are fees explained?</summary>
              <p>
                An appointment confirmation should explain the visit fee. Any further treatment
                would be discussed and quoted separately.
              </p>
            </details>
          </div>
        </section></template
      >
      <section v-else class="wrap state-page">
        <button class="back text-link" @click="go('start')">← About the practice</button
        ><template v-if="state === 'visit'"
          ><p class="eyebrow">Your first visit</p>
          <h1>A clear idea<br />of what to expect.</h1>
          <div class="visit-steps">
            <article
              v-for="(item, i) in [
                [
                  'Before you arrive',
                  'The team confirms your time, access arrangements, and what to bring.',
                ],
                [
                  'A conversation first',
                  'There is time to explain what brought you in and what you would like to understand.',
                ],
                [
                  'An agreed next step',
                  'You leave with an explanation of any proposed care and the opportunity to ask questions.',
                ],
              ]"
              :key="item[0]"
            >
              <span>0{{ i + 1 }}</span>
              <h2>{{ item[0] }}</h2>
              <p>{{ item[1] }}</p>
            </article>
          </div>
          <button class="primary" @click="go('request')">
            Request a first appointment →
          </button></template
        ><template v-else
          ><h1>Let’s find a time.</h1>
          <p class="lead">
            Send a sample appointment preference. Please use fictional contact details in this
            demonstration.
          </p>
          <div class="state-grid">
            <form v-if="!sent" class="form" @submit.prevent="sent = true">
              <label>Your name<input required v-model="name" autocomplete="name" /></label
              ><label
                >Email<input type="email" required v-model="email" autocomplete="email" /></label
              ><label
                >Appointment<select v-model="visit">
                  <option>New-patient visit</option>
                  <option>Routine appointment</option>
                  <option>Discuss treatment options</option>
                </select></label
              ><label
                >Preferred time<select v-model="preference">
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Either works</option>
                </select></label
              ><label class="checkline"
                ><input type="checkbox" />I’d like to discuss access or appointment
                arrangements</label
              ><button class="primary">Review appointment request</button>
              <p class="muted">No medical history is needed for this sample.</p>
            </form>
            <div v-else class="confirmation" role="status">
              <h2>Request prepared.</h2>
              <p>{{ name }} · {{ visit }} · {{ preference }}</p>
              <p>
                No request has been sent. In a real practice, reception would contact you to confirm
                a suitable appointment.
              </p>
              <button @click="sent = false">Edit request</button>
            </div>
            <aside class="request-note">
              <h2>A request,<br />then a conversation.</h2>
              <p>
                This is a preference, rather than a confirmed appointment. Your practice should tell
                you what happens next and how to reach the team.
              </p>
              <p>
                Sample reception<br /><strong>202 555 0154</strong><br />Monday–Friday, 8:30–17:30
              </p>
            </aside>
          </div></template
        >
      </section>
    </main>
    <footer class="sample-footer">
      <span>Fern Dental · Fictional design reference 54.</span
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

.clinic-top {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 12px;
  border-bottom: 1px solid var(--line);
}
.clinic-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
  padding-top: 27px;
  padding-bottom: 27px;
}
.clinic-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font:
    45px/1 Georgia,
    serif;
  text-decoration: none;
  letter-spacing: -0.05em;
}
.clinic-brand > span:first-child {
  font-size: 40px;
  color: var(--accent);
}
.clinic-brand > span:last-child {
  font: 11px/1.4 var(--body);
  width: 50px;
  letter-spacing: 0;
}
.clinic-header nav {
  font-size: 13px;
}
.clinic-header .text-link {
  font-weight: 400;
}
.clinic-hero {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 65px;
  padding-top: 50px;
  padding-bottom: 65px;
}
.clinic-hero h1 {
  font-weight: 500;
  font-size: clamp(3rem, 4.6vw, 4.7rem);
  margin: 22px 0 27px;
}
.clinic-hero .primary {
  margin: 30px 0 20px;
}
.clinic-hero img {
  height: 435px;
  border-radius: 120px 120px 4px 4px;
}
.care-index {
  border-top: 1px solid var(--line);
}
.treatment {
  display: grid;
  grid-template-columns: 45px 1.1fr 1fr 25px;
  gap: 30px;
  align-items: center;
  width: 100%;
  padding: 26px 0;
  border: 0;
  border-bottom: 1px solid var(--line);
  text-align: left;
  background: transparent;
}
.treatment > span {
  font: 12px 'IBM Plex Mono';
}
.treatment h3 {
  font-size: 26px;
  font-weight: 500;
}
.treatment p {
  font-size: 14px;
  font-weight: 400;
}
.treatment b {
  font-size: 25px;
}
.people-band {
  background: #e1e9da;
  padding: 60px 0;
}
.people-band h2 {
  margin: 18px 0 25px;
  font-weight: 500;
}
.practitioner {
  display: flex;
  align-items: start;
  gap: 25px;
}
.initials {
  flex: 0 0 95px;
  height: 120px;
  border-radius: 50px 50px 0 0;
  background: #bacdb9;
  display: grid;
  place-items: center;
  font: 35px Georgia;
}
.practitioner p {
  font-size: 14px;
  margin-top: 12px;
}
.practitioner button {
  margin-top: 18px;
}
.visit-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 35px;
  padding: 40px 0;
}
.visit-steps article {
  border-top: 1px solid var(--accent);
  padding-top: 25px;
}
.visit-steps span {
  font: 40px Georgia;
  color: var(--accent);
}
.visit-steps h2 {
  font-size: 24px;
  margin: 18px 0;
}
.request-note {
  border-top: 3px solid var(--accent);
  padding: 30px;
  background: #e1e9da;
}
.request-note h2 {
  font-size: 30px;
  margin-bottom: 25px;
}
@media (max-width: 760px) {
  .clinic-top > span {
    display: none;
  }
  .clinic-header {
    align-items: start;
  }
  .clinic-header nav > a,
  .clinic-header .text-link {
    display: none;
  }
  .clinic-header .primary {
    font-size: 12px;
    padding: 9px;
  }
  .clinic-brand {
    font-size: 35px;
  }
  .clinic-brand > span:last-child {
    display: none;
  }
  .clinic-hero {
    grid-template-columns: 1fr;
    gap: 30px;
    padding-top: 25px;
  }
  .clinic-hero h1 {
    font-size: 2.7rem;
  }
  .clinic-hero img {
    height: 300px;
    border-radius: 80px 80px 0 0;
  }
  .treatment {
    grid-template-columns: 25px 1fr 20px;
    gap: 15px;
  }
  .treatment h3 {
    font-size: 23px;
  }
  .treatment p {
    grid-column: 2;
  }
  .treatment b {
    grid-column: 3;
    grid-row: 1;
  }
  .visit-steps {
    grid-template-columns: 1fr;
  }
  .practitioner {
    gap: 18px;
  }
  .initials {
    flex-basis: 65px;
    height: 90px;
    font-size: 25px;
  }
}

.eyebrow {
  font: 500 13px/1.5 var(--body);
  letter-spacing: 0;
  text-transform: none;
}
.practitioner-photo {
  flex: 0 0 110px;
}
.practitioner-photo img {
  display: block;
  width: 110px;
  height: 145px;
  object-fit: cover;
  border-radius: 55px 55px 0 0;
}
.practitioner-photo figcaption {
  font-size: 9px;
  max-width: 110px;
}
@media (max-width: 760px) {
  .practitioner-photo {
    flex-basis: 75px;
  }
  .practitioner-photo img {
    width: 75px;
    height: 100px;
  }
}
</style>
