<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useSpecimen } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const parent = ref(''),
  email = ref(''),
  age = ref('3–4 years'),
  day = ref('Tuesday · 10:00'),
  sent = ref(false);
const rhythm = [
  ['08:00', 'A gentle arrival', 'Books, breakfast, and time to settle.', '◒'],
  ['09:30', 'Outside together', 'Garden discoveries and room to move.', '☼'],
  ['11:30', 'Lunch & a rest', 'A shared meal, quiet stories, and a pause.', '◠'],
  ['14:00', 'Make & explore', 'Paint, build, investigate, and try again.', '✳'],
];
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header class="orchard-header wrap">
      <a :href="href('start')" class="orchard-logo"
        ><svg viewBox="0 0 45 60" aria-hidden="true">
          <path d="M23 55V25M23 40 8 29" stroke="currentColor" stroke-width="3" fill="none" />
          <circle cx="22" cy="18" r="15" fill="#c58759" />
          <circle cx="9" cy="30" r="9" fill="#aab17c" /></svg
        ><span>Little<br />Orchard<small>EARLY YEARS / NORTHBANK</small></span></a
      >
      <nav class="row">
        <button class="text-link" @click="go('day')">A day with us</button
        ><a :href="href('start') + '#parents'">For parents</a
        ><button class="primary" @click="go('tour')">Come for a visit</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="orchard-hero wrap">
          <div>
            <p class="eyebrow">Room to grow, at their own pace.</p>
            <h1>Little discoveries.<br />A lovely ordinary day.</h1>
            <p class="lead">
              A small early-years setting where familiar faces, everyday routines, and curious play
              help children find their feet.
            </p>
            <button class="primary" @click="go('tour')">See what a day feels like →</button>
            <p class="muted">Fictional nursery · sample information for families</p>
          </div>
          <figure>
            <img
              class="photo"
              src="https://drew-site-design-library.t3.tigrisfiles.io/assets/commercial/e51fa9354e54bac0-classroom.webp"
              alt="Illustrated preschool room with low wooden tables, books, and daylight"
            />
            <figcaption>AI-generated classroom illustration</figcaption>
          </figure>
        </section>
        <section class="rhythm-section">
          <div class="wrap">
            <div class="section-heading">
              <div>
                <p class="eyebrow">A rhythm, not a rush</p>
                <h2>Small moments.<br />A whole day.</h2>
              </div>
              <button class="text-link" @click="go('day')">Walk through the day →</button>
            </div>
            <div class="daily-rhythm">
              <article v-for="moment in rhythm" :key="moment[0]">
                <span class="day-symbol" aria-hidden="true">{{ moment[3] }}</span
                ><time>{{ moment[0] }}</time>
                <h3>{{ moment[1] }}</h3>
                <p>{{ moment[2] }}</p>
              </article>
            </div>
          </div>
        </section>
        <section class="wrap section teacher-section">
          <figure>
            <img
              class="photo"
              src="https://drew-site-design-library.t3.tigrisfiles.io/assets/commercial/60950a3efffa5c14-teacher.webp"
              alt="AI-generated portrait of a fictional early-years educator"
            />
            <figcaption>Illustrative fictional staff portrait</figcaption>
          </figure>
          <div>
            <p class="eyebrow">The people who know their name</p>
            <h2>A familiar face<br />at the door.</h2>
            <p class="lead">
              “Getting to know a child means getting to know their everyday joys, their pauses, and
              what helps them feel at home.”
            </p>
            <p><strong>Maya Green</strong><br />Sample early-years lead · fictional profile</p>
            <p>
              In a live nursery, this is where families should find verified staff qualifications,
              safeguarding information, inspection records, and how to raise a concern.
            </p>
          </div>
        </section>
        <section id="parents" class="parent-info">
          <div class="wrap two">
            <div>
              <p class="eyebrow">The practical part</p>
              <h2>Clear information<br />for your family.</h2>
              <p>Sample hours: Monday–Friday, 08:00–17:30.<br />Age groups: 2–3 and 3–4 years.</p>
              <button class="primary" @click="go('tour')">Arrange a sample tour →</button>
            </div>
            <div>
              <table>
                <caption>
                  Illustrative weekly fees
                </caption>
                <thead>
                  <tr>
                    <th>Attendance</th>
                    <th>Includes</th>
                    <th>Weekly</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>3 full days</th>
                    <td>Meals &amp; materials</td>
                    <td>&#36;225</td>
                  </tr>
                  <tr>
                    <th>5 full days</th>
                    <td>Meals &amp; materials</td>
                    <td>&#36;360</td>
                  </tr>
                </tbody>
              </table>
              <details>
                <summary>How does settling in work?</summary>
                <p>
                  A real setting would agree a settling-in plan with each family. This sample shows
                  a first visit, a shorter stay, and a review conversation.
                </p>
              </details>
              <details>
                <summary>What about food and access needs?</summary>
                <p>
                  Speak with the setting before booking. The live site should explain its policies,
                  facilities, and how individual arrangements are discussed.
                </p>
              </details>
            </div>
          </div>
        </section></template
      >
      <section v-else class="wrap state-page">
        <button class="back text-link" @click="go('start')">← Little Orchard</button
        ><template v-if="state === 'day'"
          ><p class="eyebrow">Come through the gate</p>
          <h1>An ordinary day,<br />full of little things.</h1>
          <div class="day-detail">
            <article v-for="moment in rhythm" :key="moment[0]">
              <span class="day-symbol" aria-hidden="true">{{ moment[3] }}</span
              ><time>{{ moment[0] }}</time>
              <div>
                <h2>{{ moment[1] }}</h2>
                <p>
                  {{ moment[2] }} The sample routine leaves space for children’s interests and the
                  changing needs of the group.
                </p>
              </div>
            </article>
          </div>
          <button class="primary" @click="go('tour')">
            Come and ask your questions →
          </button></template
        ><template v-else
          ><h1>Come for a little look.</h1>
          <p class="lead">
            Meet a familiar face, see the rooms, and ask the questions that matter to your family.
          </p>
          <div class="state-grid">
            <form class="form" v-if="!sent" @submit.prevent="sent = true">
              <label>Parent or carer name<input required v-model="parent" /></label
              ><label>Email<input required type="email" v-model="email" /></label
              ><label
                >Age group you’re exploring<select v-model="age">
                  <option>2–3 years</option>
                  <option>3–4 years</option>
                </select></label
              ><label
                >Preferred tour<select v-model="day">
                  <option>Tuesday · 10:00</option>
                  <option>Thursday · 14:30</option>
                </select></label
              ><button class="primary">Prepare tour request</button>
              <p class="muted">
                Use fictional details. We don’t need a child’s name or date of birth for this
                sample.
              </p>
            </form>
            <div v-else class="confirmation" role="status">
              <h2>A first visit to imagine.</h2>
              <p>{{ parent }} · {{ age }} · {{ day }}</p>
              <p>
                No tour request has been sent. A real setting would confirm the time and what to
                expect.
              </p>
            </div>
            <aside class="visit-basket">
              <h2>Bring your<br />questions.</h2>
              <ul>
                <li>How the day is organised</li>
                <li>Who would know your child best</li>
                <li>Communication with families</li>
                <li>Fees, availability, and settling in</li>
              </ul>
              <p>Little Orchard<br />16 Garden Lane, Northbank<br />Fictional setting</p>
            </aside>
          </div></template
        >
      </section>
    </main>
    <footer class="sample-footer">
      <span>Little Orchard · Fictional design reference 61.</span
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

.orchard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  padding-top: 28px;
  padding-bottom: 28px;
}
.orchard-logo {
  display: flex;
  gap: 12px;
  font: 700 25px/1 var(--body);
  text-decoration: none;
  letter-spacing: -0.05em;
}
.orchard-logo svg {
  width: 45px;
  height: 60px;
}
.orchard-logo small {
  display: block;
  font: 8px/1.7 var(--body);
  letter-spacing: 0.08em;
  margin-top: 8px;
}
.orchard-header nav {
  font-size: 13px;
}
.orchard-header .primary {
  border-radius: 50px;
}
.orchard-hero {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 55px;
  padding-top: 45px;
  padding-bottom: 60px;
}
.orchard-hero h1 {
  font-weight: 500;
  font-size: clamp(3rem, 4.8vw, 4.8rem);
  margin: 22px 0 28px;
  line-height: 1.08;
}
.orchard-hero .primary {
  border-radius: 35px;
  margin: 30px 0 18px;
}
.orchard-hero img {
  height: 440px;
  border-radius: 48% 48% 8px 8px;
  object-position: center;
}
.rhythm-section {
  background: #efe3cd;
  padding: 55px 0;
}
.daily-rhythm {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}
.daily-rhythm article {
  border-top: 2px dotted #ac8d68;
  padding-top: 25px;
}
.day-symbol {
  display: grid;
  place-items: center;
  width: 65px;
  height: 65px;
  border-radius: 45% 55% 50% 40%;
  background: #dfba8d;
  color: #644228;
  font-size: 44px;
  line-height: 1;
}
.daily-rhythm article:nth-child(2n) .day-symbol {
  background: #c7d2aa;
  color: #52613a;
}
.daily-rhythm time {
  display: block;
  font-size: 12px;
  margin: 20px 0 12px;
}
.daily-rhythm h3 {
  font-size: 22px;
  font-weight: 500;
}
.daily-rhythm p {
  font-size: 14px;
  margin-top: 13px;
}
.teacher-section {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 75px;
  align-items: center;
}
.teacher-section img {
  height: 390px;
  object-position: 50% 30%;
  border-radius: 8px 80px 8px 8px;
}
.teacher-section h2 {
  font-weight: 500;
  margin: 20px 0 25px;
}
.teacher-section .lead {
  font-family: Georgia, serif;
  font-style: italic;
  font-size: 24px;
}
.teacher-section p:last-child {
  font-size: 13px;
  margin-top: 20px;
}
.parent-info {
  background: #e5e7ce;
  padding: 55px 0;
}
.parent-info h2 {
  font-weight: 500;
  margin: 18px 0 25px;
}
.parent-info button {
  margin-top: 25px;
  border-radius: 30px;
}
.parent-info table {
  font-size: 14px;
}
.parent-info caption {
  text-align: left;
  font-size: 12px;
  margin-bottom: 15px;
}
.day-detail {
  margin: 35px 0;
}
.day-detail article {
  display: grid;
  grid-template-columns: 65px 70px 1fr;
  align-items: start;
  gap: 30px;
  border-bottom: 1px dotted #aa8e73;
  padding: 25px 0;
}
.day-detail h2 {
  font-size: 27px;
  margin-bottom: 15px;
}
.day-detail time {
  font-size: 14px;
  padding-top: 20px;
}
.visit-basket {
  background: #efe3cd;
  padding: 35px;
  border-radius: 60px 8px 8px 8px;
}
.visit-basket h2 {
  font-weight: 500;
  margin-bottom: 25px;
}
.visit-basket ul {
  padding-left: 20px;
}
.visit-basket li {
  padding: 8px 0;
}
.visit-basket > p {
  font-size: 13px;
  margin-top: 25px;
}
@media (max-width: 760px) {
  .orchard-header nav > a,
  .orchard-header .text-link {
    display: none;
  }
  .orchard-header .primary {
    font-size: 11px;
    padding: 10px 14px;
  }
  .orchard-logo {
    font-size: 22px;
  }
  .orchard-logo svg {
    width: 32px;
  }
  .orchard-hero,
  .teacher-section {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .orchard-hero {
    padding-top: 25px;
  }
  .orchard-hero h1 {
    font-size: 3rem;
  }
  .orchard-hero img {
    height: 310px;
  }
  .daily-rhythm {
    grid-template-columns: 1fr 1fr;
    gap: 25px;
  }
  .daily-rhythm h3 {
    font-size: 20px;
  }
  .teacher-section img {
    height: 350px;
  }
  .day-detail article {
    grid-template-columns: 50px 1fr;
    gap: 15px;
  }
  .day-detail article > div {
    grid-column: 2;
  }
  .day-detail time {
    padding-top: 10px;
  }
  .day-symbol {
    width: 50px;
    height: 50px;
    font-size: 33px;
  }
}

.eyebrow {
  font: 500 13px/1.5 var(--body);
  letter-spacing: 0;
  text-transform: none;
}
</style>
