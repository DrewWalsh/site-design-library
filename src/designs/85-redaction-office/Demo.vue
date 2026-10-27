<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const revealed = ref<number[]>([]),
  selected = ref(2);
const ordered = ref(false);
const records = [
  {
    date: '12 March',
    rank: 0,
    label: 'The promise',
    text: 'The garden will remain open while the building work proceeds.',
    note: 'The word “remain” assumes access already existed. The maintenance log records a locked gate that same week.',
    reply:
      'The gate was locked overnight, not during public hours. The distinction was omitted from the later summary.',
  },
  {
    date: '04 June',
    rank: 3,
    label: 'The missing key',
    text: 'No replacement key was issued to the neighbourhood committee.',
    note: 'The committee read this as a withdrawal of permission. There is no accompanying revocation letter.',
    reply:
      'A replacement was requested from the wrong office. Administrative delay became indistinguishable from refusal.',
  },
  {
    date: '28 March',
    rank: 1,
    label: 'The condition',
    text: 'Public access is subject to the availability of a named supervisor.',
    note: 'No budget line was created for the supervisor. A condition without resources can function as a closure.',
    reply:
      'The author expected the existing caretaker to cover the hours. That expectation was never confirmed.',
  },
  {
    date: '19 July',
    rank: 4,
    label: 'The petition',
    text: 'One hundred and twelve residents signed a request to reopen the west gate.',
    note: 'The petition lists access, shade and a place to sit. It does not ask for an event programme.',
    reply:
      'The official response offered three supervised open days. A limited programme answered a different question.',
  },
  {
    date: '17 April',
    rank: 2,
    label: 'The revised plan',
    text: 'The temporary fence now includes the public path within the work zone.',
    note: 'The line moved between drawing revisions. No written explanation accompanies the change.',
    reply:
      'A contractor marked a wider turning area for delivery vehicles. The temporary line outlasted the deliveries.',
  },
  {
    date: '02 September',
    rank: 5,
    label: 'The resolution',
    text: 'The west gate will reopen each morning without an appointment.',
    note: 'The final instruction restores ordinary access rather than announcing a new service.',
    reply:
      'A small operational change resolved what six months of correspondence had made complicated.',
  },
];
function reveal(i: number) {
  revealed.value = revealed.value.includes(i)
    ? revealed.value.filter((n) => n !== i)
    : [...revealed.value, i];
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>

    <header>
      <strong>REDACTION<br />OFFICE</strong>
      <p>DOSSIER 014<br />THE GARDEN THAT CLOSED</p>
      <nav>
        <button @click="go('start')">Correspondence</button
        ><button @click="go('timeline')">Timeline</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><div class="opening">
          <span>RELEASED FOR READING / FICTIONAL MATERIAL</span>
          <h1>What the letter<br />did not say.</h1>
          <p>Six lines of correspondence. Six ways an ordinary gate became a public question.</p>
          <button @click="revealed = [0, 1, 2, 3, 4, 5]">Reveal the complete dossier</button
          ><button @click="revealed = []">Restore redactions</button>
        </div>
        <article v-for="(r, i) in records" :key="r.label" class="document">
          <aside>
            EXHIBIT 0{{ i + 1 }}<br />{{ r.date }}<small>{{ r.label }}</small>
          </aside>
          <div>
            <button class="redaction" :aria-expanded="revealed.includes(i)" @click="reveal(i)">
              <span v-if="revealed.includes(i)">{{ r.text }}</span
              ><span v-else>REVEAL PASSAGE 0{{ i + 1 }} <b aria-hidden="true">↗</b></span>
            </button>
            <div v-if="revealed.includes(i)" class="context">
              <p>{{ r.note }}</p>
              <button
                @click="
                  selected = i;
                  go('annotation');
                "
              >
                Read the disputed annotation ↗
              </button>
            </div>
          </div>
        </article></template
      >
      <article v-else-if="state === 'annotation'" class="annotation">
        <button @click="go('start')">← Return to correspondence</button
        ><span>EXHIBIT 0{{ selected + 1 }} / {{ records[selected].date }}</span>
        <h1>{{ records[selected].label }}</h1>
        <blockquote>{{ records[selected].text }}</blockquote>
        <div class="notes">
          <section>
            <small>ANNOTATION A / THE READER</small>
            <h2>What the line implies</h2>
            <p>{{ records[selected].note }}</p>
          </section>
          <section>
            <small>ANNOTATION B / THE OFFICE</small>
            <h2>What the file omits</h2>
            <p>{{ records[selected].reply }}</p>
          </section>
        </div>
        <p>
          A document can preserve exact wording while losing the circumstances that made it
          consequential. Both annotations are fictional readings of the same evidence.
        </p>
        <button @click="selected = (selected + 1) % 6">Next exhibit →</button
        ><button @click="go('timeline')">Reconstruct the sequence</button>
      </article>
      <section v-else class="timeline">
        <h1>Put the dates<br />back in order.</h1>
        <p>
          The file arrived in correspondence order. Chronology reveals how each small decision
          narrowed access.
        </p>
        <button @click="ordered = !ordered">
          {{ ordered ? 'Return to file order' : 'Arrange chronologically' }}
        </button>
        <ol>
          <li
            v-for="r in ordered ? [...records].sort((a, b) => a.rank - b.rank) : records"
            :key="r.label"
          >
            <time>{{ r.date }}</time>
            <div>
              <h2>{{ r.label }}</h2>
              <p>{{ r.text }}</p>
            </div>
          </li>
        </ol>
        <p v-if="ordered" role="status">
          The promise came first; the condition and revised fence followed. The resolution restores
          access after the petition.
        </p>
        <button @click="go('start')">Read the complete correspondence</button>
      </section>
    </main>
    <footer>REDACTION OFFICE / All correspondence and annotations are original fiction.</footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'IBM Plex Mono';
  src: url('/fonts/ibm-plex-mono.woff2') format('woff2');
  font-weight: 400 700;
  font-display: swap;
}
@font-face {
  font-family: 'DM Sans';
  src: url('/fonts/dm-sans.woff2') format('woff2');
  font-weight: 400 700;
  font-display: swap;
}
.specimen {
  min-height: 100vh;
  background: var(--page);
  color: var(--ink);
  font-family: var(--body);
  line-height: 1.5;
  overflow-wrap: break-word;
}
.skip {
  position: fixed;
  top: -100px;
  left: 12px;
  z-index: 100;
  background: var(--ink);
  color: var(--page);
  padding: 12px;
}
.skip:focus {
  top: 12px;
}
button {
  color: inherit;
}
button:disabled {
  opacity: 0.55;
}
button,
a,
input,
select {
  max-width: 100%;
}
button {
  white-space: normal;
}
h1,
h2,
h3,
p {
  margin-top: 0;
}
p {
  max-width: var(--measure);
}
nav {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

header {
  padding: 26px 5%;
  display: flex;
  justify-content: space-between;
  gap: 25px;
  align-items: center;
  border-bottom: 2px solid;
}
header strong {
  font: 20px/1.2 var(--heading);
}
header p {
  font: 10px/1.8 var(--heading);
  margin: 0;
}
button {
  background: transparent;
  border: 1px solid;
  padding: 10px 15px;
}
nav {
  font-size: 11px;
}
.opening {
  padding: 55px 5% 40px;
}
.opening > span {
  font: 10px var(--heading);
  letter-spacing: 0.1em;
}
h1 {
  font: clamp(45px, 7vw, 93px)/1.08 var(--heading);
  letter-spacing: -0.065em;
  margin: 30px 0;
}
.opening > p {
  font-size: 20px;
  max-width: 500px;
  line-height: 1.7;
}
.opening > button {
  margin: 15px 15px 0 0;
  font-size: 11px;
}
.document {
  padding: 30px 5%;
  display: grid;
  grid-template-columns: 170px 1fr;
  gap: 35px;
  border-top: 1px solid #978b9e;
}
.document aside {
  font: 10px/1.8 var(--heading);
}
.document aside small {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
.redaction {
  background: #19171c;
  color: #f0e9f5;
  width: 100%;
  padding: 24px 28px;
  min-height: 105px;
  text-align: left;
  border: 0;
  font: 13px var(--heading);
  letter-spacing: 0.1em;
}
.redaction b {
  float: right;
  font-size: 35px;
}
.redaction[aria-expanded='true'] {
  font: clamp(23px, 3vw, 39px)/1.5 var(--heading);
  letter-spacing: -0.04em;
  background: transparent;
  color: #19171c;
  border-left: 10px solid;
  padding: 10px 28px;
}
.context {
  padding: 20px 0 0 38px;
  display: flex;
  gap: 30px;
  align-items: start;
}
.context p {
  font-size: 15px;
  line-height: 1.8;
  max-width: 550px;
}
.context button {
  font-size: 10px;
  max-width: 170px;
}
.annotation,
.timeline {
  padding: 40px 7% 70px;
}
.annotation > span {
  display: block;
  font: 11px var(--heading);
  margin-top: 35px;
}
.annotation blockquote {
  background: #19171c;
  color: #f0e9f5;
  padding: 35px;
  font: clamp(24px, 3vw, 38px)/1.6 var(--heading);
  margin: 30px 0;
}
.notes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin: 40px 0;
}
.notes small {
  font: 10px var(--heading);
  color: #633d7c;
}
.notes h2 {
  font: 22px var(--heading);
  margin-top: 20px;
}
.notes p {
  font-size: 19px;
  line-height: 1.8;
}
.annotation > button {
  margin-right: 20px;
}
.timeline ol {
  padding: 0;
  list-style: none;
  margin: 40px 0;
}
.timeline li {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 25px;
  padding: 25px 0;
  border-top: 1px solid;
}
.timeline time {
  font: 20px var(--heading);
  color: #633d7c;
}
.timeline h2 {
  font: 22px var(--heading);
}
.timeline p {
  line-height: 1.8;
}
footer {
  padding: 25px 5%;
  font: 10px var(--heading);
  border-top: 2px solid;
}
@media (max-width: 700px) {
  header {
    flex-wrap: wrap;
  }
  .opening {
    padding: 35px 5%;
  }
  .opening > p {
    font-size: 17px;
  }
  .document {
    grid-template-columns: 1fr;
    gap: 15px;
    padding: 25px 5%;
  }
  .document aside {
    display: flex;
    gap: 20px;
  }
  .document aside small {
    margin: 0;
  }
  .redaction {
    padding: 20px;
    min-height: 85px;
    font-size: 11px;
  }
  .redaction[aria-expanded='true'] {
    padding: 8px 16px;
    font-size: 24px;
    border-left-width: 5px;
  }
  .context {
    padding: 15px 0;
    display: block;
  }
  .context button {
    max-width: 100%;
  }
  .notes {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .annotation,
  .timeline {
    padding: 30px 5%;
  }
  .annotation blockquote {
    padding: 23px;
    font-size: 23px;
  }
  .timeline li {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .annotation > button {
    margin-bottom: 15px;
  }
}
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition: none !important;
    animation: none !important;
    scroll-behavior: auto !important;
  }
}
</style>
