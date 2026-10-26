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
    .filter((k) => k.startsWith('design-library:02:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const requests = ref([
  { name: 'Update the autumn catalogue', client: 'Alder Studio', status: 'In progress' },
  { name: 'New welcome email', client: 'Common Ground', status: 'Needs review' },
  { name: 'Homepage image crops', client: 'Form Number', status: 'New' },
  { name: 'Add the workshop dates', client: 'Form School', status: 'New' },
]);
const visible = computed(() =>
  requests.value.filter((r) => r.name.toLowerCase().includes(q.value.toLowerCase())),
);
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <strong>↗ relaydesk</strong>
      <nav>
        <a href="#how">How it works</a><a href="#plans">Plans</a
        ><button @click="go('inbox')">Try the sample inbox →</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="hero">
          <div>
            <p class="eyebrow">A SMALLER TOOL FOR CLIENT WORK</p>
            <h1>Good work starts<br />with a clear request.</h1>
            <p class="lede">
              Give every request a home. Keep the conversation, the next step, and the person
              responsible in one place.
            </p>
            <button class="primary" @click="go('inbox')">Explore the working demo →</button>
            <p class="fine">No account. No setup. Just a sample workspace.</p>
          </div>
          <div class="inbox-preview">
            <div class="preview-top">▦ Alder workspace <span>Inbox · 4</span></div>
            <h3>Nothing lost in the thread.</h3>
            <button
              v-for="(r, i) in requests"
              :key="r.name"
              @click="
                selected = i;
                go('detail');
              "
            >
              <span class="initial">{{ r.client[0] }}</span>
              <div>
                <strong>{{ r.name }}</strong
                ><small>{{ r.client }}</small>
              </div>
              <span class="pill">{{ r.status }}</span>
            </button>
            <p>+ Every request has a next step.</p>
          </div>
        </section>
        <section id="how" class="how">
          <div>
            <span class="eyebrow">01 / COLLECT</span>
            <h2>One place to ask.<br />One place to answer.</h2>
            <p>
              A clear brief beats a forwarded email. See the work, ask a question, and keep the
              decision next to the request.
            </p>
          </div>
          <ol>
            <li>
              <b>Capture the actual request.</b>
              <p>A title, a useful description, and the files that matter.</p>
            </li>
            <li>
              <b>Make the next step visible.</b>
              <p>New, in progress, or ready for review. No guessing.</p>
            </li>
            <li>
              <b>Finish the conversation.</b>
              <p>Keep the final decision with the work it belongs to.</p>
            </li>
          </ol>
        </section>
        <section id="plans">
          <p class="eyebrow">ROOM TO WORK</p>
          <h2>A plan for your working day.</h2>
          <div class="scroll">
            <table>
              <thead>
                <tr>
                  <th>Fictional plans</th>
                  <th>Solo · £9/mo</th>
                  <th>Studio · £24/mo</th>
                  <th>Team · £49/mo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>People</td>
                  <td>1</td>
                  <td>5</td>
                  <td>15</td>
                </tr>
                <tr>
                  <td>Client spaces</td>
                  <td>3</td>
                  <td>20</td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td>Shared request history</td>
                  <td>Included</td>
                  <td>Included</td>
                  <td>Included</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="fine">
            Illustrative product and pricing. This reference does not sell a subscription.
          </p>
        </section></template
      >
      <section class="workspace" v-else>
        <button @click="go('start')">← Product overview</button
        ><template v-if="state === 'inbox'"
          ><h1>Your inbox, in order.</h1>
          <label>Find a request<input v-model="q" placeholder="Search by title" /></label>
          <div class="inbox-preview">
            <button
              v-for="r in visible"
              :key="r.name"
              @click="
                selected = requests.indexOf(r);
                go('detail');
              "
            >
              <strong>{{ r.name }}</strong
              ><span class="pill">{{ r.status }}</span>
            </button>
            <p v-if="!visible.length">
              No requests match. <button @click="q = ''">Clear search</button>
            </p>
          </div></template
        ><template v-else
          ><p class="eyebrow">{{ requests[selected].client }} / REQUEST</p>
          <h1>{{ requests[selected].name }}</h1>
          <div class="request">
            <h2>The brief</h2>
            <p>
              Please update the opening page with the new collection. Keep the existing structure
              and send a preview before the final files are replaced.
            </p>
            <label
              >Status<select v-model="requests[selected].status">
                <option>New</option>
                <option>In progress</option>
                <option>Needs review</option>
                <option>Done</option>
              </select></label
            >
            <p role="status">Current state: {{ requests[selected].status }}</p>
            <h3>Conversation</h3>
            <p>
              <b>Amelia · Client</b><br />The final copy is ready. The project title should stay on
              two lines.
            </p>
            <label>Your sample reply<textarea v-model="message"></textarea></label
            ><button
              class="primary"
              @click="
                message = message.trim()
                  ? 'Reply saved in this local demo.'
                  : 'Write a reply first.'
              "
            >
              Save local reply
            </button>
            <p>{{ message }}</p>
          </div></template
        >
      </section>
    </main>
    <footer class="specimen-note">
      <span>RelayDesk · Fictional sample content · Design reference 02</span
      ><button @click="reset">Reset demo</button>
    </footer>
  </div>
</template>
<style scoped>
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
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
  padding: 25px 6%;
  border-bottom: 1px solid var(--line);
  background: white;
}
header strong {
  font-size: 25px;
  letter-spacing: -0.04em;
}
nav {
  display: flex;
  gap: 30px;
  align-items: center;
  font-size: 13px;
}
nav button {
  font-size: 12px;
}
main {
  max-width: 1400px;
  margin: auto;
  padding: 0 6%;
}
.hero {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 70px;
  padding: 90px 0;
  align-items: center;
}
.hero h1 {
  font-size: 62px;
  margin: 22px 0;
}
.lede {
  font-size: 18px;
  color: #59667a;
}
.fine {
  font-size: 12px;
  color: #617089;
  margin-top: 18px;
}
.hero .primary {
  padding: 15px 22px;
}
.inbox-preview {
  background: white;
  box-shadow: 0 14px 40px #243e5810;
  border: 1px solid #dce3ec;
  border-radius: 10px;
  overflow: hidden;
}
.preview-top {
  padding: 16px;
  background: #f1f4f9;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}
.inbox-preview h3 {
  font-size: 20px;
  padding: 12px 22px;
}
.inbox-preview button {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  text-align: left;
  background: none;
  border: 0;
  border-radius: 0;
  border-top: 1px solid #e6eaf1;
  padding: 20px 16px;
  font-size: 12px;
}
.inbox-preview button > div {
  flex: 1;
}
.inbox-preview small {
  display: block;
  color: #647087;
  margin-top: 5px;
}
.initial {
  border-radius: 6px;
  background: #edf1fb;
  color: #305ed6;
  padding: 10px;
}
.pill {
  background: #edf2fc;
  color: #38598e;
  font-size: 9px;
  padding: 5px 7px;
  border-radius: 4px;
  margin-left: auto;
}
.inbox-preview > p {
  padding: 12px 20px;
  font-size: 11px;
  color: #62738e;
}
.how {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 100px;
  border-top: 1px solid var(--line);
  padding: 65px 0;
}
.how h2 {
  font-size: 40px;
}
.how ol {
  padding-left: 25px;
}
.how li {
  padding: 12px 0 22px 12px;
}
.how li p {
  font-size: 14px;
  color: #59667a;
}
#plans {
  padding: 50px 0 80px;
  border-top: 1px solid var(--line);
}
.workspace {
  padding: 50px 0 100px;
}
.workspace h1 {
  font-size: 48px;
}
.workspace label {
  max-width: 600px;
  margin: 25px 0;
}
.workspace .inbox-preview {
  max-width: 850px;
}
.request {
  background: white;
  max-width: 850px;
  padding: 35px;
  border: 1px solid var(--line);
  border-radius: 10px;
}
@media (max-width: 800px) {
  .hero {
    gap: 30px;
  }
  .hero h1 {
    font-size: 45px;
  }
  nav a {
    display: none;
  }
}
@media (max-width: 600px) {
  header {
    padding: 20px;
  }
  header strong {
    font-size: 21px;
  }
  .hero,
  .how {
    grid-template-columns: 1fr;
    gap: 35px;
    padding: 45px 0;
  }
  .hero h1 {
    font-size: 43px;
  }
  .how h2 {
    font-size: 33px;
  }
  .workspace h1 {
    font-size: 38px;
  }
  .request {
    padding: 22px;
  }
}
</style>
