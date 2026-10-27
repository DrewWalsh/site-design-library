<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const balance = ref(50),
  selected = ref(1);
const pairs = [
  {
    title: 'The brief',
    a: 'They asked for a monument. I heard an invitation to make something that could change.',
    b: 'They asked for a place to gather. I heard a need for something that would stay.',
  },
  {
    title: 'The material',
    a: 'Clay keeps the record of a hand. Its irregularities are the evidence of somebody having been here.',
    b: 'Stone has a longer memory than a hand. The work should be able to survive its first interpretation.',
  },
  {
    title: 'The public',
    a: 'I wanted people to add to it. A finished object would have put the public outside the conversation.',
    b: 'I wanted people to rest beside it. Participation should not become another task we assign to strangers.',
  },
  {
    title: 'The weather',
    a: 'Rain would soften the edges. The commission needed to include that uncertainty.',
    b: 'Rain would expose a poor joint. Care for a public work includes the unromantic business of maintenance.',
  },
  {
    title: 'The opening',
    a: 'The first visitor rearranged the pieces. That was when the work began.',
    b: 'The first visitor sat down without looking at the inscription. That was when the work became useful.',
  },
  {
    title: 'What remains',
    a: 'I remember the shapes that disappeared. The archive cannot contain the whole work.',
    b: 'I remember the seat that is still there. Continuity can be a quiet kind of generosity.',
  },
];
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>

    <header>
      <strong>COUNTERPOINT</strong><span>ONE COMMISSION / TWO ACCOUNTS</span>
      <nav>
        <button @click="go('start')">Read together</button
        ><button @click="go('sources')">Shared sources</button>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><div class="balance">
          <label>The seam<input type="range" min="35" max="65" v-model.number="balance" /></label
          ><button @click="balance = 35">More of B</button
          ><button @click="balance = 50">Equal space</button
          ><button @click="balance = 65">More of A</button>
        </div>
        <div class="duet" :style="{ '--split': balance + '%' }">
          <section class="voice-a">
            <small>ACCOUNT A / LENA ROOK</small>
            <h1>Let it<br />change.</h1>
            <p>An artist’s account of making a public work that would never be finished.</p>
          </section>
          <section class="voice-b">
            <small>ACCOUNT B / THEO MARCH</small>
            <h2>Let it<br />remain.</h2>
            <p>An architect’s account of making a public place that could be relied upon.</p>
          </section>
        </div>
        <div
          v-for="(pair, i) in pairs"
          :key="pair.title"
          class="duet pair"
          :style="{ '--split': balance + '%' }"
        >
          <article class="voice-a">
            <small>0{{ i + 1 }} / {{ pair.title }}</small>
            <p>{{ pair.a }}</p>
            <button
              @click="
                selected = i;
                go('passage');
              "
            >
              Read this exchange ↗
            </button>
          </article>
          <article class="voice-b">
            <small>0{{ i + 1 }} / {{ pair.title }}</small>
            <p>{{ pair.b }}</p>
            <button
              @click="
                selected = i;
                go('passage');
              "
            >
              Read this exchange ↗
            </button>
          </article>
        </div></template
      >
      <template v-else-if="state === 'passage'"
        ><div class="passage-head">
          <button @click="go('start')">← Both accounts</button>
          <h1>{{ pairs[selected].title }}</h1>
          <p>PASSAGE 0{{ selected + 1 }} / THE SAME EVENT, DIFFERENT OBLIGATIONS</p>
        </div>
        <div class="duet">
          <article class="voice-a">
            <small>LENA ROOK / ARTIST</small>
            <blockquote>{{ pairs[selected].a }}</blockquote>
            <p>
              “I was interested in what could happen after I left. A commission gives you a
              temporary authority; the interesting question is how you give it away.”
            </p>
          </article>
          <article class="voice-b">
            <small>THEO MARCH / ARCHITECT</small>
            <blockquote>{{ pairs[selected].b }}</blockquote>
            <p>
              “Somebody has to answer the call when a joint fails. My account starts with that
              person, and with the ordinary day after the opening.”
            </p>
          </article>
        </div>
        <div class="passage-head">
          <button @click="selected = (selected + 1) % 6">Next paired passage →</button
          ><button @click="go('sources')">Read the shared evidence</button>
        </div></template
      >
      <section v-else class="sources">
        <h1>The ground<br />they shared.</h1>
        <p>
          These fictional source notes establish common facts without deciding which interpretation
          is correct.
        </p>
        <ol>
          <li>
            <h2>Commission letter / 12 February</h2>
            <p>
              A public seating work for the former goods yard, with an expected life of fifteen
              years and provision for community use.
            </p>
          </li>
          <li>
            <h2>Material trial / 28 April</h2>
            <p>
              Three clay surfaces and two stone joints were exposed to water. Both teams agreed to
              retain the marks of testing.
            </p>
          </li>
          <li>
            <h2>Opening record / 9 September</h2>
            <p>
              Forty-two visitors used the site in its first hour. Some rearranged the movable
              elements; others used the fixed bench.
            </p>
          </li>
        </ol>
        <button @click="go('start')">Return to the disagreement</button>
      </section>
    </main>
    <footer>COUNTERPOINT / An original fictional commission, told twice.</footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Libre Baskerville';
  src: url('/fonts/libre-baskerville.woff2') format('woff2');
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
  background: #f1e9da;
  padding: 22px 4%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  color: #241d2b;
}
header strong {
  font-size: 19px;
  letter-spacing: 0.12em;
}
header span {
  font-size: 9px;
}
button {
  background: transparent;
  border: 0;
  border-bottom: 1px solid;
  padding: 9px 3px;
}
nav {
  font-size: 12px;
}
.balance {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  padding: 18px;
  background: #f1e9da;
  color: #241d2b;
  font-size: 11px;
}
.balance label {
  display: flex;
  gap: 15px;
  align-items: center;
}
.balance input {
  width: 160px;
  accent-color: #35265a;
}
.duet {
  display: grid;
  grid-template-columns: var(--split, 50%) 1fr;
}
.voice-a {
  background: #ed623f;
  color: #241d2b;
}
.voice-b {
  background: #35265a;
  color: #f1e9da;
}
.duet > section {
  padding: 45px 9% 60px;
}
.duet h1,
.duet h2 {
  font: clamp(55px, 7.8vw, 115px)/1.05 var(--heading);
  letter-spacing: -0.055em;
  margin: 45px 0 35px;
}
.duet small {
  font-size: 10px;
  letter-spacing: 0.1em;
}
.duet > section p {
  font-size: 17px;
  line-height: 1.8;
  max-width: 350px;
}
.pair article {
  padding: 35px 9% 50px;
  border-top: 1px solid #0004;
}
.pair p {
  font: clamp(21px, 2.2vw, 32px)/1.65 var(--heading);
  margin: 25px 0 30px;
}
.pair button {
  font-size: 11px;
}
.passage-head {
  background: #f1e9da;
  color: #241d2b;
  padding: 30px 5%;
}
.passage-head h1 {
  font: clamp(45px, 7vw, 90px) var(--heading);
  margin: 20px 0;
}
.passage-head p {
  font-size: 10px;
}
.passage-head button {
  margin-right: 30px;
}
.duet > article {
  padding: 40px 9%;
}
.duet blockquote {
  font: clamp(27px, 3vw, 40px)/1.5 var(--heading);
  margin: 35px 0;
}
.sources {
  background: #f1e9da;
  min-height: 80vh;
  padding: 50px 10%;
  color: #241d2b;
}
.sources h1 {
  font: clamp(42px, 6vw, 80px)/1.1 var(--heading);
}
.sources ol {
  max-width: 800px;
  padding-left: 25px;
}
.sources li {
  padding: 30px 0;
  border-bottom: 1px solid;
}
.sources p {
  line-height: 1.9;
}
.sources h2 {
  font: 22px var(--heading);
}
footer {
  background: #f1e9da;
  color: #241d2b;
  padding: 22px 4%;
  font-size: 10px;
  border-top: 1px solid;
}
@media (max-width: 700px) {
  header {
    flex-wrap: wrap;
  }
  .balance {
    flex-wrap: wrap;
    gap: 12px;
  }
  .balance label {
    width: 100%;
    justify-content: center;
  }
  .duet {
    grid-template-columns: 1fr;
  }
  .duet > section {
    padding: 28px 6%;
  }
  .duet h1,
  .duet h2 {
    font-size: 65px;
    margin: 25px 0;
  }
  .duet > section p {
    font-size: 15px;
  }
  .pair article {
    padding: 28px 6%;
  }
  .pair p {
    font-size: 24px;
  }
  .sources {
    padding: 35px 6%;
  }
  .duet > article {
    padding: 30px 6%;
  }
  .duet blockquote {
    font-size: 27px;
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
