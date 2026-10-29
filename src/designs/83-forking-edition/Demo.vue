<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const trail = useStored<number[]>('83:path', state.value === 'passage' ? [0, 1] : [0]);
const node = computed(() => trail.value.at(-1) ?? 0);
const passages = [
  {
    title: 'The room that remembers',
    text: 'On the last evening before the house was emptied, you found a room that was not on the plan. Inside it there was',
    choices: [
      ['a window facing yesterday', 1],
      ['a table set for somebody else', 2],
      ['a door with no handle', 3],
    ],
  },
  {
    title: 'The window',
    text: 'Outside, the garden was still in the summer you remembered. A person stood by the pear tree, too far away to recognise. You could',
    choices: [
      ['call their name', 4],
      ['leave the window open', 5],
    ],
  },
  {
    title: 'The table',
    text: 'One plate was warm. Beneath it lay a letter in your own handwriting, dated tomorrow. It began with the words: do not be afraid to',
    choices: [
      ['stay a little longer', 4],
      ['leave something unfinished', 5],
    ],
  },
  {
    title: 'The door',
    text: 'Without a handle, the door was almost a wall. But from the other side came the sound of a pencil. You decided to',
    choices: [
      ['knock in the rhythm of your name', 4],
      ['slide a blank page underneath', 5],
    ],
  },
  {
    title: 'An answer',
    text: 'The house answered with an ordinary noise: a pipe cooling, a stair settling, a spoon touching a cup. Nothing returned except the possibility of listening. You chose to',
    choices: [
      ['keep the room', 6],
      ['carry only the sound', 7],
    ],
  },
  {
    title: 'An interval',
    text: 'For once, you did not need to know what happened next. The room grew larger around the space you had left in the sentence. At the threshold, you',
    choices: [
      ['closed the book', 8],
      ['carried only the sound', 7],
    ],
  },
  {
    title: 'A room kept open',
    text: 'You left the house with one room unmeasured. Years later, when someone asked where you had lived, you described the place by what it had allowed you not to know. The room remained open in the telling.',
    choices: [],
  },
  {
    title: 'What can be carried',
    text: 'You took no object from the house. But on quiet evenings a small sound returned: not a memory of what had happened, but a reminder that somebody had once made room for you to listen. It was enough.',
    choices: [],
  },
  {
    title: 'The unfinished sentence',
    text: 'You closed the book before its final word. The house was emptied the next morning. Somewhere, in a room that never appeared on a plan, a blank page waited without impatience. The story belonged to whoever opened it next.',
    choices: [],
  },
];
function choose(i: number) {
  trail.value.push(i);
  go('passage');
}
function undo() {
  if (trail.value.length > 1) trail.value.pop();
  go('passage');
}
function reset() {
  trail.value = [0];
  go('start');
}
</script>
<template>
  <div class="specimen" :class="{ entry: state === 'start' }">
    <a class="skip" href="#content">Skip to content</a>

    <header>
      <span>FORKING EDITION / 01</span><button @click="go('path')">The path so far ↗</button>
    </header>
    <main id="content">
      <article v-if="state !== 'path'" class="novella">
        <span class="chapter">{{
          node === 0
            ? 'A SHORT STORY IN SEVERAL POSSIBLE FORMS'
            : 'PASSAGE ' + String(node).padStart(2, '0')
        }}</span>
        <h1>{{ passages[node].title }}</h1>
        <p class="prose">
          {{ passages[node].text
          }}<template v-if="passages[node].choices.length"
            ><span v-for="(choice, i) in passages[node].choices" :key="String(choice[1])"
              ><span v-if="i > 0">{{ i === passages[node].choices.length - 1 ? ' or ' : ' ' }}</span
              ><button
                class="phrase"
                :aria-label="String(choice[0])"
                @click="choose(Number(choice[1]))"
              >
                {{ choice[0]
                }}<span aria-hidden="true">{{
                  i === passages[node].choices.length - 1
                    ? '.'
                    : i < passages[node].choices.length - 2
                      ? ','
                      : ''
                }}</span>
              </button></span
            ></template
          >
        </p>
        <p v-if="!passages[node].choices.length" class="ending">
          END {{ node - 5 }} OF 3 / THE READING IS YOURS
        </p>
        <div class="reader-controls">
          <button v-if="trail.length > 1" @click="undo">← Revisit the last choice</button
          ><button v-if="node > 5" @click="go('path')">See how you arrived here</button
          ><button v-if="node === 0" @click="go('path')">How this edition works</button>
        </div>
        <div class="running">
          <span v-for="(n, i) in trail" :key="i"
            >{{ i ? '— ' : '' }}{{ String(n).padStart(2, '0') }}</span
          >
        </div>
        <p class="edition-note">
          An original miniature novella. Read by choosing the underlined phrases. There is no
          correct path, and every choice can be revisited.
        </p>
      </article>
      <section v-else class="path">
        <h1>The shape<br />of your reading.</h1>
        <p>
          Each choice opens a different passage. Your place is saved on this browser. Select an
          earlier passage to return to that fork.
        </p>
        <ol>
          <li v-for="(n, i) in trail" :key="i">
            <span>0{{ i + 1 }}</span
            ><button
              @click="
                trail = trail.slice(0, i + 1);
                go('passage');
              "
            >
              {{ passages[n].title }}
            </button>
          </li>
        </ol>
        <button @click="go('passage')">Continue reading →</button
        ><button @click="reset">Begin a new reading</button>
        <details>
          <summary>See every passage and ending</summary>
          <ul>
            <li v-for="(p, i) in passages" :key="p.title">
              <button
                @click="
                  trail = i === 0 ? [0] : [0, i];
                  go('passage');
                "
              >
                {{ i > 5 ? 'Ending ' + (i - 5) + ': ' : '' }}{{ p.title }}
              </button>
            </li>
          </ul>
        </details>
      </section>
    </main>
    <footer>
      Words & structure: an original library specimen. / About a seven-minute reading.
    </footer>
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
  padding: 30px 6%;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  font: 10px var(--body);
  letter-spacing: 0.12em;
}
button {
  border: 0;
  background: transparent;
  border-bottom: 1px solid;
  padding: 8px 0;
}
header button {
  font-size: 11px;
  letter-spacing: 0;
}
.novella {
  padding: 80px max(7%, calc((100vw - 900px) / 2)) 75px;
  min-height: 85vh;
}
.chapter {
  font: 10px var(--body);
  letter-spacing: 0.18em;
  color: #446c56;
}
h1 {
  font: clamp(40px, 5vw, 66px)/1.22 var(--heading);
  letter-spacing: -0.045em;
  margin: 30px 0 65px;
  max-width: 700px;
}
.prose {
  font: clamp(23px, 2.8vw, 36px)/1.9 var(--heading);
  max-width: 30ch;
  margin: 0;
}
.phrase {
  font: inherit;
  line-height: inherit;
  display: inline;
  text-align: left;
  color: #446c56;
  border: 0;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 7px;
  padding: 0;
  min-height: 0;
}
.phrase:hover {
  background: #dde5d8;
}
.reader-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  margin-top: 50px;
  font: 12px var(--body);
}
.running {
  font: 12px var(--body);
  letter-spacing: 0.2em;
  color: #446c56;
  margin: 60px 0 25px;
}
.edition-note {
  font: 12px/1.8 var(--body);
  max-width: 450px;
  color: #576059;
}
.ending {
  font: 11px var(--body);
  letter-spacing: 0.15em;
  color: #446c56;
  margin-top: 40px;
}
.path {
  padding: 50px max(7%, calc((100vw - 900px) / 2));
  min-height: 85vh;
}
.path h1 {
  margin-bottom: 35px;
}
.path > p {
  font: 18px/1.8 var(--heading);
}
.path ol {
  list-style: none;
  padding: 0;
  margin: 40px 0;
}
.path li {
  padding: 20px 0;
  border-bottom: 1px solid #c9d0c4;
  display: flex;
  gap: 25px;
  align-items: baseline;
}
.path li span {
  font: 11px var(--body);
  color: #446c56;
}
.path li button {
  font: 22px var(--heading);
  border: 0;
  text-align: left;
}
.path > button {
  margin: 10px 25px 25px 0;
  font: 12px var(--body);
}
details {
  margin-top: 45px;
  font: 13px var(--body);
}
details ul {
  padding: 0;
}
details li button {
  font: 15px var(--body);
}
footer {
  padding: 25px 6%;
  font: 10px var(--body);
  border-top: 1px solid #c9d0c4;
}
@media (max-width: 600px) {
  header {
    padding: 22px 5%;
    align-items: center;
    letter-spacing: 0;
  }
  .novella {
    padding: 50px 7%;
  }
  h1 {
    font-size: 39px;
    margin-bottom: 40px;
  }
  .prose {
    font-size: 24px;
    line-height: 1.85;
  }
  .path {
    padding: 40px 7%;
  }
  .path li button {
    font-size: 19px;
  }
  .chapter {
    font-size: 9px;
    letter-spacing: 0.08em;
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

/* The entry is the experience itself; supporting routes retain its vocabulary. */

.entry header {
  border: 0;
  padding: 25px 5%;
  font-size: 10px;
}
.entry .novella {
  max-width: 1100px;
  padding: 70px 8% 100px;
  margin: auto;
  position: relative;
}
.entry .chapter {
  font-size: 9px;
  letter-spacing: 0.15em;
}
.entry .novella h1 {
  font: 14px/1.4 var(--body);
  letter-spacing: 0;
  margin: 12px 0 55px;
  color: #446c56;
}
.entry .prose {
  font: clamp(30px, 3.5vw, 54px)/1.6 var(--heading);
  max-width: 23ch;
  letter-spacing: -0.04em;
}
.entry .prose:first-letter {
  float: left;
  font-size: 3.6em;
  line-height: 0.87;
  padding-right: 15px;
}
.entry .phrase {
  display: inline;
  font: inherit;
  color: #446c56;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 8px;
  padding: 0;
  border: 0;
}
.entry .running {
  position: absolute;
  right: 3%;
  top: 100px;
  writing-mode: vertical-rl;
  font-size: 14px;
  letter-spacing: 0.2em;
}
.entry .edition-note {
  max-width: 42ch;
  font-size: 11px;
  margin-left: 20%;
  margin-top: 65px;
}
@media (max-width: 700px) {
  .entry header {
    padding: 18px 7%;
  }
  .entry .novella {
    padding: 25px 8% 60px;
  }
  .entry .novella h1 {
    margin-bottom: 35px;
  }
  .entry .prose {
    font-size: 30px;
    line-height: 1.6;
  }
  .entry .running {
    position: static;
    writing-mode: horizontal-tb;
    margin-top: 30px;
  }
  .entry .edition-note {
    margin-left: 0;
  }
}
</style>
