<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useSpecimen } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const day = ref('Monday'),
  selected = ref('Strength foundations'),
  plan = ref('8 sessions / month'),
  name = ref(''),
  email = ref(''),
  sent = ref(false);
const schedule: Record<string, { time: string; title: string; coach: string; spaces: number }[]> = {
  Monday: [
    { time: '07:00', title: 'Strength foundations', coach: 'Jo', spaces: 4 },
    { time: '12:30', title: 'Mobility reset', coach: 'Sam', spaces: 6 },
    { time: '18:00', title: 'Lift together', coach: 'Jo', spaces: 0 },
  ],
  Wednesday: [
    { time: '07:00', title: 'Lift together', coach: 'Jo', spaces: 3 },
    { time: '12:30', title: 'Strength foundations', coach: 'Sam', spaces: 5 },
    { time: '18:00', title: 'Mobility reset', coach: 'Sam', spaces: 2 },
  ],
  Saturday: [
    { time: '09:00', title: 'Strength foundations', coach: 'Jo', spaces: 6 },
    { time: '10:30', title: 'Weekend circuit', coach: 'Sam', spaces: 4 },
  ],
};
const slot = ref('Monday · 07:00');
function choose(title: string, time: string) {
  selected.value = title;
  slot.value = day.value + ' · ' + time;
  sent.value = false;
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header class="form-header wrap">
      <a :href="href('start')" class="form-logo">FORM<span>MOVEMENT CLUB</span></a>
      <nav class="row">
        <button class="text-link" @click="go('schedule')">The timetable</button
        ><button class="text-link" @click="go('join')">Memberships</button
        ><button class="primary" @click="go('schedule')">Find your first session ↗</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="training-hero wrap">
          <div class="training-title">
            <p class="eyebrow">SHOW UP AS YOU ARE.</p>
            <h1>GET STRONG.<br />STAY HUMAN.</h1>
            <p>
              Small groups. Coaches who know your name.<br />A place to build a habit, not perform
              one.
            </p>
            <button class="primary" @click="go('schedule')">Find a class that fits →</button>
          </div>
          <div class="training-image">
            <img
              class="photo"
              src="https://drew-site-design-library.t3.tigrisfiles.io/assets/commercial/cc924c50318565e3-gym.webp"
              alt="Trainer supporting a person during a gym-floor exercise"
            /><span class="floor-stamp">ON THE<br />FLOOR,<br />TOGETHER.</span>
            <p>Illustrative gym photography · fictional club</p>
          </div>
        </section>
        <section class="wrap section timetable-preview">
          <div class="section-heading">
            <h2>MAKE ROOM<br />IN YOUR WEEK.</h2>
            <p>
              Start with the session. Our sample timetable shows intensity, coaching, and spaces
              before asking you to join.
            </p>
          </div>
          <div class="day-switch row">
            <button
              v-for="d in Object.keys(schedule)"
              :key="d"
              :aria-pressed="day === d"
              @click="day = d"
            >
              {{ d }}
            </button>
          </div>
          <article class="class-row" v-for="c in schedule[day]" :key="c.time">
            <time>{{ c.time }}</time>
            <div>
              <h3>{{ c.title }}</h3>
              <p>50 minutes · Coach {{ c.coach }} · All levels</p>
            </div>
            <span>{{ c.spaces ? c.spaces + ' spaces' : 'Class full' }}</span
            ><button
              :disabled="!c.spaces"
              @click="
                choose(c.title, c.time);
                go('schedule');
              "
            >
              {{ c.spaces ? 'Choose session ↗' : 'Full' }}
            </button>
          </article>
        </section>
        <section class="coaching">
          <div class="wrap two">
            <div>
              <p class="eyebrow">COACHING, NOT JUST COUNTING.</p>
              <h2>GOOD PEOPLE.<br />CLEAR DIRECTION.</h2>
            </div>
            <div>
              <article>
                <span class="coach-number">01</span>
                <div>
                  <h3>JO / STRENGTH</h3>
                  <p>Builds confidence through simple, repeatable movement and useful feedback.</p>
                </div>
              </article>
              <article>
                <span class="coach-number">02</span>
                <div>
                  <h3>SAM / MOVEMENT</h3>
                  <p>
                    Makes room for different starting points, with options explained before a
                    session begins.
                  </p>
                </div>
              </article>
              <p class="muted">
                Fictional trainer profiles. Real qualifications and professional scope should be
                verifiable.
              </p>
            </div>
          </div>
        </section>
        <section class="wrap section training-close">
          <h2>A PLAN THAT<br />FITS YOUR LIFE.</h2>
          <div>
            <p>
              Drop in, come twice a week, or make it a regular part of your day. Compare the sample
              plans without a hidden joining fee.
            </p>
            <button class="primary" @click="go('join')">Compare memberships →</button>
          </div>
        </section></template
      >
      <section v-else class="wrap state-page">
        <button class="back text-link" @click="go('start')">← Back to the floor</button>
        <h1>{{ state === 'join' ? 'YOUR PACE. YOUR PLAN.' : 'PUT IT IN YOUR WEEK.' }}</h1>
        <template v-if="state === 'join'"
          ><div class="membership-grid">
            <button
              v-for="p in [
                ['Drop-in', '18', 'One session / no commitment'],
                ['8 sessions / month', '96', 'Two visits a week, your way'],
                ['Unlimited', '140', 'Build a regular routine'],
              ]"
              :key="p[0]"
              :aria-pressed="plan === p[0]"
              @click="plan = p[0]"
            >
              <h2>{{ p[0] }}</h2>
              <strong>&#36;{{ p[1] }}</strong>
              <p>{{ p[2] }}</p>
              <span>{{ plan === p[0] ? 'Selected ✓' : 'Choose this plan →' }}</span>
            </button>
          </div>
          <p class="muted">
            Illustrative prices. Monthly plans renew monthly; cancellation and pause rules belong
            beside the price in a live offer.
          </p></template
        ><template v-else
          ><div class="day-switch row">
            <button
              v-for="d in Object.keys(schedule)"
              :key="d"
              :aria-pressed="day === d"
              @click="day = d"
            >
              {{ d }}
            </button>
          </div>
          <article class="class-row" v-for="c in schedule[day]" :key="c.time">
            <time>{{ c.time }}</time>
            <div>
              <h2>{{ c.title }}</h2>
              <p>Coach {{ c.coach }} · {{ c.spaces }} spaces</p>
            </div>
            <button
              :aria-pressed="slot === day + ' · ' + c.time"
              :disabled="!c.spaces"
              @click="choose(c.title, c.time)"
            >
              {{ slot === day + ' · ' + c.time ? 'Selected ✓' : c.spaces ? 'Choose' : 'Full' }}
            </button>
          </article></template
        >
        <div class="booking-form section two">
          <div>
            <p class="eyebrow">YOUR SAMPLE SELECTION</p>
            <h2>{{ state === 'join' ? plan : selected }}</h2>
            <p>{{ state === 'join' ? 'Membership interest / no payment' : 'Session: ' + slot }}</p>
            <p>
              Use fictional details. This demonstration does not reserve a place or start a
              membership.
            </p>
          </div>
          <form v-if="!sent" class="form" @submit.prevent="sent = true">
            <label>Your name<input required v-model="name" /></label
            ><label>Email<input required type="email" v-model="email" /></label
            ><button class="primary">
              {{ state === 'join' ? 'Review membership interest' : 'Review session booking' }}
            </button>
          </form>
          <div v-else class="confirmation" role="status">
            <h3>GOOD TO SEE YOU, {{ name.toUpperCase() }}.</h3>
            <p>{{ state === 'join' ? plan : selected + ' · ' + slot }}</p>
            <p>Your sample selection is ready. No booking or payment was made.</p>
          </div>
        </div>
      </section>
    </main>
    <footer class="sample-footer">
      <span>FORM / Movement club · Fictional design reference 62.</span
      ><span>Sample data and illustrative images. Interactions stay on this page.</span
      ><a :href="href('start')">Reset sample</a>
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Bebas Neue';
  src: url('/fonts/bebas-neue.woff2') format('woff2');
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

.form-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  padding-top: 25px;
  padding-bottom: 25px;
  border-bottom: 2px solid var(--ink);
}
.form-logo {
  font: 56px/0.8 var(--heading);
  letter-spacing: -0.03em;
  text-decoration: none;
}
.form-logo span {
  font: 9px/1.6 var(--body);
  letter-spacing: 0.18em;
  display: block;
  margin-top: 10px;
}
.form-header nav {
  font-size: 13px;
}
.training-hero {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 35px;
  padding-top: 45px;
  padding-bottom: 45px;
}
.training-title h1 {
  font-size: clamp(5rem, 8.6vw, 8.9rem);
  line-height: 0.9;
  letter-spacing: -0.025em;
  margin: 30px 0;
}
.training-title > p:not(.eyebrow) {
  font-size: 18px;
}
.training-title .primary {
  margin-top: 30px;
}
.training-image {
  position: relative;
  align-self: stretch;
}
.training-image img {
  height: 100%;
  min-height: 460px;
  object-position: 60% center;
}
.training-image > p {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #222c35;
  color: #fff;
  padding: 8px 15px;
  font-size: 10px;
}
.floor-stamp {
  position: absolute;
  right: -12px;
  top: 20px;
  background: #254ec7;
  color: white;
  transform: rotate(7deg);
  padding: 17px 24px;
  font: 35px/0.9 var(--heading);
  border-radius: 50%;
}
.timetable-preview {
  border-top: 2px solid var(--ink);
}
h2 {
  font-size: clamp(2.8rem, 4vw, 4.4rem);
  letter-spacing: -0.015em;
}
.day-switch {
  margin: 25px 0;
}
.day-switch button {
  background: transparent;
  font-size: 14px;
}
.day-switch button[aria-pressed='true'] {
  background: #254ec7;
  color: white;
  outline: 0;
}
.class-row {
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 24px 0;
  border-bottom: 1px solid var(--ink);
}
.class-row time {
  font: 38px var(--heading);
  width: 90px;
}
.class-row > div {
  flex: 1;
}
.class-row h3,
.class-row h2 {
  font: 30px var(--heading);
  letter-spacing: 0.01em;
}
.class-row p {
  font-size: 13px;
  margin-top: 6px;
}
.class-row > span {
  font-size: 12px;
}
.class-row button {
  font-size: 12px;
}
.coaching {
  background: #254ec7;
  color: white;
  padding: 60px 0;
}
.coaching .eyebrow {
  margin-bottom: 20px;
}
.coaching article {
  display: flex;
  gap: 25px;
  border-top: 1px solid #a9baf0;
  padding: 25px 0;
}
.coach-number {
  font: 40px var(--heading);
  opacity: 0.9;
}
.coaching h3 {
  font: 29px var(--heading);
  letter-spacing: 0.02em;
}
.coaching p {
  font-size: 14px;
}
.coaching .muted {
  font-size: 11px;
}
.training-close {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
}
.training-close button {
  margin-top: 25px;
}
.membership-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 35px 0;
}
.membership-grid button {
  padding: 30px;
  text-align: left;
  border: 2px solid var(--ink);
  background: transparent;
}
.membership-grid h2 {
  font-size: 31px;
}
.membership-grid strong {
  display: block;
  font: 65px var(--heading);
  margin: 20px 0;
}
.membership-grid p {
  font-weight: 400;
  font-size: 14px;
  min-height: 45px;
}
.membership-grid span {
  display: block;
  border-top: 1px solid var(--ink);
  padding-top: 20px;
  margin-top: 25px;
  font-size: 12px;
}
.membership-grid button[aria-pressed='true'] {
  background: #254ec7;
  color: white;
  outline: 0;
  border-color: #254ec7;
}
.membership-grid button[aria-pressed='true'] span {
  border-color: white;
}
.booking-form h2 {
  margin: 15px 0 25px;
}
@media (max-width: 760px) {
  .form-header .text-link {
    display: none;
  }
  .form-header .primary {
    font-size: 11px;
    padding: 9px;
  }
  .form-logo {
    font-size: 46px;
  }
  .training-hero {
    grid-template-columns: 1fr;
    padding-top: 30px;
  }
  .training-title h1 {
    font-size: clamp(4.8rem, 21vw, 7rem);
  }
  .training-image img {
    height: 320px;
    min-height: 0;
  }
  .floor-stamp {
    right: 0;
    font-size: 29px;
  }
  .class-row {
    gap: 15px;
    flex-wrap: wrap;
  }
  .class-row time {
    width: 62px;
    font-size: 31px;
  }
  .class-row h3,
  .class-row h2 {
    font-size: 25px;
  }
  .class-row > span {
    margin-left: 77px;
  }
  .class-row button {
    margin-left: auto;
  }
  .training-close,
  .membership-grid {
    grid-template-columns: 1fr;
  }
  .membership-grid strong {
    font-size: 55px;
    margin: 10px 0;
  }
  .membership-grid p {
    min-height: 0;
  }
  .membership-grid span {
    margin-top: 20px;
  }
}
</style>
