<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useSpecimen } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const name = ref(''),
  email = ref(''),
  piano = ref('Upright piano'),
  area = ref('Northbank'),
  note = ref('');
function submit() {
  go('thanks');
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <div class="calling-card wrap">
      <header class="card-head">
        <a :href="href('start')" class="wordmark">ER<span>Piano care / Northbank</span></a
        ><span class="eyebrow"
          >Independent craft. Since 2011.<br />Fictional sole-proprietor sample</span
        >
      </header>
      <main id="content">
        <section class="introduction">
          <div class="piano-mark" aria-hidden="true">
            <i v-for="n in 7" :key="n"></i><b></b><b></b><b></b><b></b><b></b>
          </div>
          <p class="eyebrow">TUNING · REPAIRS · A LITTLE GOOD ADVICE</p>
          <h1>A piano worth<br />playing again.</h1>
          <div class="intro-bottom">
            <p class="lead">
              I’m Elias. I care for the pianos in people’s homes, rehearsal rooms, and small venues.
              Careful work, a clear price, and time to listen.
            </p>
            <a class="phone" href="tel:+12025550151"
              >202 555 0151<span>Sample contact number ↗</span></a
            >
          </div>
        </section>
        <section id="services" class="services">
          <h2>The useful details.</h2>
          <dl>
            <div>
              <dt>Standard tuning</dt>
              <dd>$145 <span>Allow 90 minutes</span></dd>
            </div>
            <div>
              <dt>Pitch adjustment</dt>
              <dd>From $65 <span>Quoted before work begins</span></dd>
            </div>
            <div>
              <dt>Where I work</dt>
              <dd>Northbank &amp; Alder <span>Tuesday–Saturday, 9–5</span></dd>
            </div>
          </dl>
        </section>
        <section class="contact" id="contact">
          <div>
            <p class="eyebrow">No obligation. no complicated process.</p>
            <h2>Tell me about<br />your piano.</h2>
            <p>
              Its age, when it was last tuned, and anything that doesn’t feel quite right. I’ll
              explain what the next step could be.
            </p>
            <button v-if="state === 'start'" class="primary" @click="go('enquire')">
              Make a sample enquiry ↗</button
            ><a href="mailto:hello@eliasreed.example">hello@eliasreed.example</a>
          </div>
          <form v-if="state === 'enquire'" class="form" @submit.prevent="submit">
            <label>Your name<input v-model="name" autocomplete="name" required /></label
            ><label
              >Email<input v-model="email" type="email" autocomplete="email" required
            /></label>
            <div class="two">
              <label
                >Piano type<select v-model="piano">
                  <option>Upright piano</option>
                  <option>Grand piano</option>
                  <option>Not sure yet</option>
                </select></label
              ><label
                >Area<select v-model="area">
                  <option>Northbank</option>
                  <option>Alder</option>
                  <option>Ask about another area</option>
                </select></label
              >
            </div>
            <label
              >A few details<textarea
                v-model="note"
                placeholder="For example: an upright that hasn't been tuned for two years."
              ></textarea></label
            ><button class="primary">Review sample enquiry</button>
            <p class="muted">This demonstration does not send email.</p>
          </form>
          <div v-else-if="state === 'thanks'" class="confirmation" role="status">
            <p class="eyebrow">Your sample enquiry</p>
            <h3>That’s enough to begin.</h3>
            <p>{{ name || 'Your name' }} · {{ piano }} · {{ area }}</p>
            <p>{{ note || 'A first conversation about tuning and care.' }}</p>
            <p>
              No message has been sent. In a live business, you would receive a personal reply with
              availability.
            </p>
            <button class="text-link" @click="go('enquire')">Edit the details</button>
          </div>
          <div v-else class="small-note">
            <span>“</span>
            <p>
              A good tuning starts with listening—to the instrument and the person who plays it.
            </p>
            <b>Elias Reed</b><small>A fictional craftsperson’s statement</small>
          </div>
        </section>
      </main>
    </div>
    <footer class="sample-footer">
      <span>Elias Reed / Piano care · Fictional design reference 51.</span
      ><span>Sample data and illustrative images. Interactions stay on this page.</span
      ><a :href="href('start')">Reset sample</a>
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Libre Baskerville';
  src: url('/fonts/libre-baskerville.woff2') format('woff2');
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

.calling-card {
  max-width: 1120px;
}
.card-head {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  padding: 36px 0;
  border-bottom: 1px solid var(--line);
}
.wordmark {
  display: flex;
  align-items: center;
  gap: 18px;
  text-decoration: none;
  font: 40px var(--heading);
}
.wordmark span {
  font: 12px/1.4 var(--body);
  max-width: 110px;
}
.card-head > .eyebrow {
  text-align: right;
}
.introduction {
  padding: 60px 0 48px;
  position: relative;
}
.introduction h1 {
  font-size: clamp(3.6rem, 7vw, 6.7rem);
  margin: 20px 0 35px;
  max-width: 850px;
  font-weight: 400;
}
.intro-bottom {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 70px;
  align-items: end;
}
.phone {
  font: clamp(1.5rem, 3vw, 2.4rem) var(--heading);
  text-decoration: none;
  white-space: nowrap;
}
.phone span {
  display: block;
  font: 12px var(--body);
  margin-top: 12px;
}
.piano-mark {
  width: 110px;
  height: 75px;
  display: flex;
  position: absolute;
  top: 70px;
  right: 0;
  border: 1px solid var(--ink);
}
.piano-mark i {
  flex: 1;
  border-right: 1px solid var(--ink);
}
.piano-mark b {
  position: absolute;
  background: var(--ink);
  width: 9px;
  height: 45px;
  left: 10px;
}
.piano-mark b:nth-of-type(2) {
  left: 26px;
}
.piano-mark b:nth-of-type(3) {
  left: 57px;
}
.piano-mark b:nth-of-type(4) {
  left: 73px;
}
.piano-mark b:nth-of-type(5) {
  left: 89px;
}
.services {
  padding: 30px 0 40px;
  border-top: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
}
.services h2 {
  font: 16px var(--body);
  margin-bottom: 22px;
}
.services dl {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}
.services dd {
  font-size: 1.3rem;
  margin-top: 7px;
}
.services dd span {
  display: block;
  font-size: 12px;
  font-weight: 400;
  margin-top: 6px;
}
.contact {
  padding: 45px 0 65px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 65px;
}
.contact h2 {
  font-weight: 400;
  margin: 15px 0 20px;
}
.contact p {
  max-width: 44ch;
}
.contact .primary {
  margin: 25px 0 15px;
}
.contact a {
  display: block;
  font-size: 14px;
}
.small-note {
  border-left: 1px solid var(--line);
  padding: 0 0 0 42px;
}
.small-note > span {
  font: 70px/1 var(--heading);
}
.small-note p {
  font: 1.4rem/1.6 var(--heading);
  margin-bottom: 20px;
}
.small-note small {
  display: block;
  font-size: 11px;
}
@media (max-width: 760px) {
  .card-head > .eyebrow {
    display: none;
  }
  .introduction {
    padding-top: 35px;
  }
  .piano-mark {
    position: relative;
    top: auto;
    right: auto;
    margin-bottom: 25px;
    width: 100px;
  }
  .introduction h1 {
    font-size: clamp(2.6rem, 12vw, 4.2rem);
  }
  .intro-bottom,
  .contact {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .services dl {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .services dl > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .services dd {
    margin: 0;
  }
  .small-note {
    display: none;
  }
  .phone {
    font-size: 2rem;
  }
}

.eyebrow {
  font: 500 13px/1.5 var(--body);
  letter-spacing: 0;
  text-transform: none;
}
</style>
