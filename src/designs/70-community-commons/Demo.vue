<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useSpecimen } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const category = ref('All'),
  name = ref(''),
  email = ref(''),
  interest = ref('Community events'),
  sent = ref(false);
const events = [
  {
    day: '07',
    month: 'NOV',
    title: 'Repair morning',
    type: 'Workshop',
    time: '10:00–13:00',
    place: 'The old library',
    note: 'Bring one small household item and a little patience.',
  },
  {
    day: '12',
    month: 'NOV',
    title: 'Neighbourhood meeting',
    type: 'Meeting',
    time: '18:30–20:00',
    place: 'Maple Hall',
    note: 'Path improvements, winter plans, and questions from neighbours.',
  },
  {
    day: '21',
    month: 'NOV',
    title: 'A shared lunch',
    type: 'Social',
    time: '12:00–14:00',
    place: 'Community garden',
    note: 'Bring a dish if you can. Come along either way.',
  },
];
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header class="commons-header wrap">
      <a :href="href('start')" class="commons-logo">Maple Street<br /><b>COMMONS</b></a>
      <nav class="row">
        <button class="text-link" @click="go('events')">What’s happening</button
        ><a :href="href('start') + '#notes'">Notes &amp; resources</a
        ><button class="primary" @click="go('join')">Join the neighbourhood</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="commons-title wrap">
          <p class="eyebrow">A place for the things we share.</p>
          <h1>Hello, neighbour.</h1>
          <p class="lead">
            A noticeboard, a meeting place, and a few good reasons to know the people around you.
          </p>
          <span class="commons-sun" aria-hidden="true">☼</span>
        </section>
        <section class="noticeboard wrap">
          <article class="welcome-note">
            <span class="pin" aria-hidden="true"></span>
            <p class="eyebrow">New around here?</p>
            <h2>There’s room<br />at the table.</h2>
            <p>
              You don’t need a committee role or a big idea. Come to something, ask a question, or
              help with a small task.
            </p>
            <button class="text-link" @click="go('join')">Find your way in →</button>
          </article>
          <article v-for="(e, i) in events" :key="e.title" :class="'event-note note-' + i">
            <span class="notice-date"
              >{{ e.day }}<small>{{ e.month }}</small></span
            >
            <p class="eyebrow">{{ e.type }}</p>
            <h2>{{ e.title }}</h2>
            <p>{{ e.note }}</p>
            <p class="event-where">{{ e.time }}<br />{{ e.place }}</p>
            <button
              class="text-link"
              @click="
                category = e.type;
                go('events');
              "
            >
              See the details →
            </button>
          </article>
        </section>
        <section id="notes" class="wrap section commons-records">
          <div>
            <p class="eyebrow">Keeping the door open</p>
            <h2>What we talked about.<br />What happens next.</h2>
            <p>A community works better when its decisions are easy to find.</p>
          </div>
          <div>
            <details open>
              <summary>October meeting notes · sample record</summary>
              <p>
                <strong>Discussed:</strong> winter opening hours, a shared tool shelf, and access to
                the garden path.
              </p>
              <p>
                <strong>Agreed:</strong> trial a Saturday repair morning and gather feedback on the
                path.
              </p>
              <p>
                <strong>Next:</strong> report back at the November meeting. These are fictional
                meeting notes.
              </p>
            </details>
            <details>
              <summary>Useful local resources</summary>
              <p>
                The sample commons keeps practical information together: room-booking contacts, how
                to borrow tools, accessible meeting arrangements, and a simple code of conduct.
              </p>
              <button class="text-link" @click="go('join')">Ask about getting involved →</button>
            </details>
          </div>
        </section>
        <section class="commons-join">
          <div class="wrap row spread">
            <h2>Small contributions.<br />A place that feels like ours.</h2>
            <button class="primary" @click="go('join')">Become part of the commons →</button>
          </div>
        </section></template
      >
      <section v-else class="wrap state-page">
        <button class="back text-link" @click="go('start')">← Back to the noticeboard</button
        ><template v-if="state === 'events'"
          ><p class="eyebrow">November / sample calendar</p>
          <h1>See you around.</h1>
          <div class="row event-filters">
            <button
              v-for="c in ['All', 'Workshop', 'Meeting', 'Social']"
              :key="c"
              :aria-pressed="category === c"
              @click="category = c"
            >
              {{ c }}
            </button>
          </div>
          <article
            class="calendar-event"
            v-for="e in events.filter((e) => category === 'All' || e.type === category)"
            :key="e.title"
          >
            <span class="notice-date"
              >{{ e.day }}<small>{{ e.month }}</small></span
            >
            <div>
              <span class="pill">{{ e.type }}</span>
              <h2>{{ e.title }}</h2>
              <p>{{ e.note }}</p>
              <p>{{ e.time }} · {{ e.place }}</p>
              <p class="muted">
                Sample event. A real listing should include access details, the organiser, cost, and
                how changes are announced.
              </p>
            </div>
            <button
              class="primary"
              @click="
                interest = e.title;
                go('join');
              "
            >
              I’m interested →
            </button>
          </article></template
        ><template v-else
          ><h1>There’s a place for you.</h1>
          <p class="lead">
            Choose what you’d like to hear about. This sample joining form doesn’t create an account
            or add you to a mailing list.
          </p>
          <div class="state-grid">
            <form class="form" v-if="!sent" @submit.prevent="sent = true">
              <label>Your name<input required v-model="name" /></label
              ><label>Email<input required type="email" v-model="email" /></label
              ><label
                >I’m interested in<select v-model="interest">
                  <option>Community events</option>
                  <option>Helping with practical tasks</option>
                  <option>Neighbourhood meetings</option>
                  <option v-for="e in events" :key="e.title">{{ e.title }}</option>
                </select></label
              ><label class="checkline"
                ><input type="checkbox" required />I understand this is a fictional community
                sample.</label
              ><button class="primary">Review joining interest</button>
            </form>
            <div v-else class="confirmation" role="status">
              <h2>Hello, {{ name }}.</h2>
              <p>Your sample interest: {{ interest }}</p>
              <p>
                No membership or subscription was created. In a live community, this page would
                explain the welcome process and how to manage your preferences.
              </p>
            </div>
            <aside class="membership-note">
              <h2>Good neighbours,<br />in practice.</h2>
              <ul>
                <li>Take part in a way that works for you.</li>
                <li>Make room for different needs and views.</li>
                <li>Keep practical decisions easy to find.</li>
                <li>Ask before sharing someone’s details.</li>
              </ul>
              <p>
                Sample membership: free.<br />A real association should publish its rules,
                responsibilities, and any fees clearly.
              </p>
            </aside>
          </div></template
        >
      </section>
    </main>
    <footer class="sample-footer">
      <span>Maple Street / Commons · Fictional design reference 70.</span
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

.commons-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
  padding-top: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--line);
}
.commons-logo {
  font: 15px/1.3 var(--body);
  text-decoration: none;
}
.commons-logo b {
  font-size: 26px;
  letter-spacing: -0.04em;
}
.commons-header nav {
  font-size: 13px;
}
.commons-header .primary {
  border-radius: 5px;
}
.commons-title {
  position: relative;
  padding-top: 45px;
  padding-bottom: 45px;
}
.commons-title h1 {
  font-weight: 500;
  font-size: clamp(3.5rem, 6vw, 6rem);
  margin: 20px 0 25px;
}
.commons-title .lead {
  max-width: 50ch;
}
.commons-sun {
  position: absolute;
  right: 80px;
  top: 50px;
  font: 130px/1 Georgia;
  color: #9a6c32;
}
.noticeboard {
  display: grid;
  grid-template-columns: 1.15fr 1fr 1fr;
  gap: 25px;
  padding-bottom: 55px;
}
.noticeboard article {
  padding: 30px;
  box-shadow: 0 3px 0 #3c413515;
  position: relative;
}
.welcome-note {
  grid-row: span 2;
  background: #d5dfc2;
  transform: rotate(-1deg);
  padding-top: 50px !important;
}
.welcome-note h2 {
  font:
    37px/1.15 Georgia,
    serif;
  margin: 25px 0;
}
.welcome-note p {
  font-size: 15px;
}
.welcome-note button {
  margin-top: 25px;
}
.pin {
  position: absolute;
  top: 15px;
  left: 50%;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #6e473c;
  box-shadow: 2px 2px 1px #302b2720;
}
.event-note {
  background: #ead9ac;
}
.event-note h2 {
  font-size: 27px;
  font-weight: 500;
  margin: 18px 0;
}
.event-note > p {
  font-size: 13px;
}
.note-0 {
  transform: rotate(1.5deg);
}
.note-1 {
  background: #e8c6b5;
  transform: rotate(-1deg);
}
.note-2 {
  grid-column: 2/4;
  background: #d8dfdf;
  display: grid;
  grid-template-columns: 60px 1fr auto;
  gap: 10px 25px;
  align-items: center;
  transform: rotate(0.5deg);
}
.note-2 .notice-date {
  grid-row: span 3;
}
.note-2 h2 {
  margin: 0;
}
.note-2 .event-where {
  grid-column: 3;
  grid-row: 1/4;
}
.note-2 button {
  grid-column: 2;
  justify-self: start;
}
.notice-date {
  font: 45px/1 var(--body);
  display: block;
  letter-spacing: -0.07em;
}
.notice-date small {
  display: block;
  font-size: 10px;
  letter-spacing: 0.15em;
  margin: 8px 0 18px;
}
.event-note > .eyebrow {
  font-size: 10px;
}
.event-where {
  font-size: 11px !important;
  border-top: 1px solid var(--line);
  padding-top: 15px;
  margin-top: 20px;
}
.event-note button {
  font-size: 12px;
  margin-top: 15px;
}
.commons-records {
  border-top: 1px solid var(--ink);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
}
.commons-records h2 {
  font-weight: 500;
  margin: 20px 0 25px;
}
.commons-records p {
  font-size: 14px;
}
.commons-join {
  background: #d7dec8;
  padding: 45px 0;
}
.commons-join h2 {
  font-weight: 500;
  font-size: 32px;
}
.event-filters {
  margin: 30px 0;
}
.event-filters button {
  background: transparent;
  border-radius: 25px;
  font-size: 13px;
}
.event-filters button[aria-pressed='true'] {
  background: var(--accent);
  color: white;
  outline: 0;
}
.calendar-event {
  display: grid;
  grid-template-columns: 75px 1fr auto;
  gap: 30px;
  align-items: start;
  padding: 30px 0;
  border-top: 1px solid var(--line);
}
.calendar-event h2 {
  font-weight: 500;
  font-size: 31px;
  margin: 15px 0;
}
.calendar-event .primary {
  font-size: 12px;
}
.calendar-event .muted {
  max-width: 60ch;
  font-size: 12px;
}
.membership-note {
  background: #ead9ac;
  padding: 35px;
  transform: rotate(1deg);
}
.membership-note h2 {
  font:
    30px/1.2 Georgia,
    serif;
}
.membership-note ul {
  padding-left: 20px;
}
.membership-note li {
  padding: 10px 0;
}
.membership-note p {
  font-size: 12px;
}
@media (max-width: 760px) {
  .commons-header nav > a,
  .commons-header .text-link {
    display: none;
  }
  .commons-header .primary {
    font-size: 11px;
    padding: 9px;
  }
  .commons-logo b {
    font-size: 22px;
  }
  .commons-title h1 {
    font-size: 3.5rem;
  }
  .commons-sun {
    display: none;
  }
  .noticeboard {
    grid-template-columns: 1fr;
    gap: 25px;
    padding-left: 27px;
    padding-right: 27px;
  }
  .welcome-note {
    grid-row: auto;
    padding-top: 40px !important;
  }
  .note-2 {
    grid-column: auto;
    display: block;
  }
  .event-note h2 {
    font-size: 29px;
  }
  .commons-records {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  .commons-join h2 {
    font-size: 29px;
  }
  .calendar-event {
    grid-template-columns: 55px 1fr;
    gap: 20px;
  }
  .calendar-event .primary {
    grid-column: 2;
    justify-self: start;
  }
  .calendar-event h2 {
    font-size: 27px;
  }
  .notice-date {
    font-size: 38px;
  }
}

.eyebrow {
  font: 500 13px/1.5 var(--body);
  letter-spacing: 0;
  text-transform: none;
}
</style>
