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
    .filter((k) => k.startsWith('design-library:39:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const entries = [
  'A visitor at the kitchen window',
  'Notes from the back step',
  'The porch light, switched off',
];
const guest = ref(''),
  comment = ref(''),
  messages = useStored<{ name: string; text: string }[]>('39:guestbook', []);
function sign() {
  if (!guest.value.trim() || !comment.value.trim()) return;
  messages.value.push({ name: guest.value.trim(), text: comment.value.trim() });
  guest.value = '';
  comment.value = '';
  message.value = 'Added to this browser’s local guestbook.';
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <div class="page">
      <header>
        <span class="stars">✶ ✦ ✶</span>
        <h1>Moth Observatory</h1>
        <p>
          Robin’s small corner of the internet.<br />Night things, garden notes, and whatever else
          turns up.
        </p>
        <div class="welcome">WELCOME, FELLOW NIGHT PERSON.</div>
      </header>
      <div class="site">
        <aside>
          <h2>Where to?</h2>
          <a :href="href('start')" @click.prevent="go('start')">⌂ Home sweet home</a
          ><a :href="href('journal')" @click.prevent="go('journal')">The moth journal</a
          ><a :href="href('guestbook')" @click.prevent="go('guestbook')">Sign the guestbook</a
          ><a href="#links">Links I like</a>
          <hr />
          <p>Currently noticing:</p>
          <b>The way the garden<br />sounds after rain.</b>
          <div class="badge">HAND MADE<br />SMALL WEB</div>
          <div class="badge second">BEST VIEWED<br />WITH CURIOSITY</div>
          <small>No visitor counter.<br />You being here is enough.</small>
        </aside>
        <main id="content">
          <template v-if="state === 'start'"
            ><section class="hello">
              <h2>Hello from the back step.</h2>
              <svg
                viewBox="0 0 300 200"
                role="img"
                aria-label="Original illustration of a moth with patterned wings"
              >
                <path
                  d="M148 110Q20 0 25 90Q15 160 140 135Q75 200 130 190L150 140L170 190Q225 200 160 135Q285 160 275 90Q280 0 152 110"
                  fill="#aa9679"
                  stroke="#57536a"
                  stroke-width="3"
                />
                <ellipse cx="150" cy="120" rx="10" ry="40" fill="#57536a" />
                <path d="M145 85L132 60M155 85L168 60" stroke="#57536a" stroke-width="3" />
                <g fill="#dfd4a9" stroke="#57536a" stroke-width="3">
                  <circle cx="80" cy="95" r="22" />
                  <circle cx="220" cy="95" r="22" />
                </g>
              </svg>
              <p>
                I’m Robin. I keep a notebook by the kitchen door and forget where I put my torch.
                This is a fictional little website about paying attention to the things that arrive
                after dark.
              </p>
              <p>
                There’s no grand plan here. Just some observations, a few drawings, and links to
                places I like.
              </p>
            </section>
            <section class="updates">
              <h2>✎ Recently added</h2>
              <article v-for="(entry, i) in entries" :key="entry">
                <small>{{ ['26 OCT 2026', '19 OCT 2026', '11 OCT 2026'][i] }}</small>
                <h3>
                  <a
                    :href="href('journal')"
                    @click.prevent="
                      selected = i;
                      go('journal');
                    "
                    >{{ entry }}</a
                  >
                </h3>
                <p>
                  {{
                    [
                      'A small, patterned visitor waited out the rain on the glass.',
                      'An evening spent noticing rather than naming.',
                      'Sometimes the best way to see the night is to let it be dark.',
                    ][i]
                  }}
                </p>
              </article>
            </section></template
          >
          <article v-else-if="state === 'journal'" class="journal">
            <p class="date">THE MOTH JOURNAL / ENTRY 0{{ selected + 1 }}</p>
            <h2>{{ entries[selected] }}</h2>
            <p>
              The rain stopped just after nine. I went to the back step with a mug of tea and no
              particular expectation of seeing anything.
            </p>
            <p>
              There was a moth at the kitchen window, resting where the frame met the glass. Its
              wings looked plain until I moved closer, and then the pattern arrived all at once: a
              few dark lines, a pale edge, a shape like a folded leaf.
            </p>
            <p>
              I did not identify it. I drew it badly in the notebook and wrote “small visitor, after
              rain”. That felt like enough for one evening.
            </p>
            <p>
              <em
                >This journal is original fictional writing. The illustration is not an
                identification guide.</em
              >
            </p>
            <div class="row">
              <button @click="selected = (selected + 2) % 3">← Older entry</button
              ><button @click="selected = (selected + 1) % 3">Newer entry →</button>
            </div>
            <p><a :href="href('start')" @click.prevent="go('start')">Back to the homepage</a></p>
          </article>
          <section v-else class="guestbook">
            <h2>Leave a little hello.</h2>
            <p>
              This guestbook belongs only to your browser. Nothing is published or sent to a server.
            </p>
            <form @submit.prevent="sign">
              <label>Your name<input v-model="guest" required maxlength="40" /></label
              ><label
                >Your message<textarea v-model="comment" required maxlength="500"></textarea></label
              ><button>Sign the local guestbook</button>
            </form>
            <p v-if="message" role="status">{{ message }}</p>
            <article v-for="(m, i) in messages" :key="i">
              <h3>{{ m.name }}</h3>
              <p>{{ m.text }}</p>
            </article>
            <p v-if="!messages.length">No messages in this browser yet.</p>
          </section>
          <section id="links" class="links">
            <h2>A few places to wander.</h2>
            <a href="https://www.nhm.ac.uk/" target="_blank" rel="noopener"
              >Natural History Museum ↗</a
            >
            <p>A real place to explore the natural world.</p>
            <a href="https://butterfly-conservation.org/" target="_blank" rel="noopener"
              >Butterfly Conservation ↗</a
            >
            <p>A real organisation for butterfly and moth conservation.</p>
          </section>
        </main>
      </div>
      <div class="page-end">
        Made with care, tea, and ordinary HTML ideas. ✶ Last tended: October 2026
      </div>
    </div>
    <footer class="specimen-note">
      <span>Moth Observatory · Fictional sample content · Design reference 39</span
      ><button @click="reset">Reset demo</button>
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Libre Baskerville';
  src: url('/fonts/libre-baskerville.woff2') format('woff2');
  font-display: swap;
  font-weight: 100 900;
}
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
.specimen {
  background-color: #dfe2cf;
  background-image: radial-gradient(#a4af9a 1px, transparent 1px);
  background-size: 14px 14px;
  padding-top: 30px;
  font-family: Georgia, serif;
}
.page {
  max-width: 960px;
  margin: 0 auto 30px;
  background: #fffceb;
  border: 2px solid #69728a;
  box-shadow: 5px 5px #a6af9f;
}
header {
  text-align: center;
  padding: 30px 25px 0;
  background: #f1eddd;
}
.stars {
  font-size: 27px;
  letter-spacing: 25px;
  color: #6c6788;
}
header h1 {
  font: 45px/1.2 Georgia;
  letter-spacing: -0.03em;
  margin: 15px 0;
}
header p {
  font: 13px/1.8 Georgia;
  margin: 0 auto 25px;
}
.welcome {
  background: #47557d;
  color: #fffceb;
  padding: 10px;
  font: 10px 'DM Sans';
  letter-spacing: 0.1em;
  margin: 0 -25px;
}
.site {
  display: grid;
  grid-template-columns: 200px 1fr;
}
.site aside {
  padding: 25px 20px;
  border-right: 1px solid #a3a98f;
  background: #e9ead7;
  font-size: 12px;
}
.site aside h2 {
  font: 21px Georgia;
}
.site aside a {
  display: block;
  color: #324791;
  margin: 18px 0;
  font-size: 12px;
}
.site aside hr {
  border: 0;
  border-top: 1px solid #a3a98f;
  margin: 30px 0;
}
.site aside p {
  font-size: 11px;
}
.site aside b {
  font-weight: 400;
  line-height: 1.8;
}
.badge {
  border: 2px solid #756b87;
  background: #d6d2e1;
  text-align: center;
  font: bold 9px/1.5 monospace;
  padding: 8px;
  margin-top: 25px;
}
.badge.second {
  background: #d8dfc2;
  border-color: #6f7c50;
  margin-top: 12px;
}
.site aside small {
  display: block;
  font-size: 10px;
  line-height: 1.8;
  margin-top: 25px;
}
main {
  padding: 30px 35px 45px;
}
.hello h2 {
  font: 28px Georgia;
}
.hello svg {
  float: right;
  width: 230px;
  margin: 10px 0 20px 25px;
}
.hello p,
.journal p {
  font: 15px/1.9 Georgia;
}
.updates {
  border-top: 1px dashed #90977d;
  padding-top: 25px;
  margin-top: 30px;
  clear: both;
}
.updates h2,
.links h2 {
  font: 24px Georgia;
}
.updates article {
  padding: 18px 0;
  border-bottom: 1px dotted #a2a991;
}
.updates small {
  font: 9px monospace;
  color: #60694e;
}
.updates h3 {
  font: 19px/1.5 Georgia;
  margin: 12px 0;
}
.updates a,
.links a {
  color: #324791;
}
.updates p,
.links p {
  font: 13px/1.8 Georgia;
}
.links {
  border: 1px solid #b8b798;
  padding: 20px;
  background: #f5efd7;
  margin-top: 35px;
}
.links a {
  font: 13px Georgia;
}
.links p {
  font-size: 11px;
  margin: 8px 0 18px;
}
.page-end {
  text-align: center;
  border-top: 1px solid #a3a98f;
  background: #e9ead7;
  padding: 15px;
  font: 10px Georgia;
}
.journal h2 {
  font: 32px/1.3 Georgia;
}
.date {
  font: 9px monospace !important;
}
.journal button,
.guestbook button {
  font: 12px Georgia;
  border: 2px outset #e2dfc4;
  background: #e9ead7;
}
.guestbook h2 {
  font: 30px Georgia;
}
.guestbook p {
  font: 14px/1.8 Georgia;
}
.guestbook form {
  display: grid;
  gap: 20px;
}
.guestbook label {
  font: 12px Georgia;
}
.guestbook input,
.guestbook textarea {
  background: #fffef7;
  border-color: #a2a991;
  font: 14px Georgia;
}
.guestbook article {
  border-top: 1px dotted #a2a991;
  margin-top: 25px;
}
.guestbook h3 {
  font: 19px Georgia;
}
.specimen-note {
  background: #dfe2cf;
  font-family: Georgia;
  max-width: 960px;
  margin: auto;
  border-top: 0;
}
@media (max-width: 650px) {
  .specimen {
    padding: 15px 12px 0;
  }
  .page {
    box-shadow: 3px 3px #a6af9f;
  }
  .site {
    display: block;
  }
  .site aside {
    border-right: 0;
    border-bottom: 1px solid #a3a98f;
    padding: 18px;
  }
  .site aside h2 {
    font-size: 18px;
  }
  .site aside a {
    display: inline-block;
    margin: 5px 15px 10px 0;
    font-size: 11px;
  }
  .site aside hr,
  .site aside p,
  .site aside b,
  .site aside .badge,
  .site aside small {
    display: none;
  }
  header {
    padding: 22px 20px 0;
  }
  header h1 {
    font-size: 33px;
  }
  .welcome {
    margin: 0 -20px;
    font-size: 8px;
  }
  .stars {
    font-size: 22px;
  }
  main {
    padding: 25px 22px;
  }
  .hello h2 {
    font-size: 25px;
  }
  .hello svg {
    float: none;
    width: 100%;
    height: 170px;
    margin: 0 0 15px;
  }
  .hello p,
  .journal p {
    font-size: 14px;
  }
  .journal h2 {
    font-size: 27px;
  }
  .page-end {
    font-size: 9px;
    line-height: 1.7;
  }
  .specimen-note {
    padding: 15px 0;
  }
}
</style>
