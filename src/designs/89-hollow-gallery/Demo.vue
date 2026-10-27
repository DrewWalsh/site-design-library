<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useSpecimen, useStored } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const inverted = ref(false),
  selected = ref(0),
  show = useStored<number[]>('89:show', []),
  message = ref('');
const works = [
  [
    'A room removed',
    'The outline began as a solid block. Removing a room from its centre made the remaining mass feel like an inhabited wall. The work asks whether an interior can be recognised without a building.',
  ],
  [
    'Between two hands',
    'Two curved edges nearly meet. The interval is small enough to imply contact and large enough to prevent it. Attention settles on the space that neither hand owns.',
  ],
  [
    'The absent column',
    'A vertical void interrupts a heavy horizontal form. The missing support becomes the most visible part of the structure, giving absence a surprising weight.',
  ],
  [
    'Window without a wall',
    'A rounded opening is surrounded by an irregular edge. It reads as a window until the eye notices that there is almost no wall left to hold it.',
  ],
  [
    'A pause in the line',
    'A continuous band is cut once, then twice. The interruptions make the line easier to follow by giving it a rhythm that the unbroken surface lacked.',
  ],
  [
    'Where the water was',
    'The contour of an imagined pool survives as a dry opening. The shape suggests a level surface, even though it is made entirely from the edge around it.',
  ],
];
function open(i: number) {
  selected.value = i;
  go('work');
}
function keep() {
  if (show.value.includes(selected.value)) {
    message.value = 'This work is already in your exhibition.';
    return;
  }
  if (show.value.length >= 3) {
    message.value = 'Your three spaces are full. Remove a work from the exhibition first.';
    return;
  }
  show.value.push(selected.value);
  message.value = 'Work added to your exhibition.';
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>

    <header>
      <strong>HOLLOW</strong><span>AN EXHIBITION OF WHAT IS MISSING</span>
      <nav>
        <button @click="inverted = !inverted">Reverse figure / ground</button
        ><button @click="go('show')">Your exhibition ({{ show.length }}/3)</button>
      </nav>
    </header>
    <main id="content" :class="{ inverted }">
      <template v-if="state === 'start'"
        ><div class="exhibition-title">
          <h1>Enter<br />the absence.</h1>
          <p>Six works. The way in<br />is the part left out.</p>
        </div>
        <div class="hollows">
          <article v-for="(w, i) in works" :key="w[0]" :class="'hollow h' + i">
            <div class="void">
              <span>WORK 0{{ i + 1 }}</span>
              <h2>{{ w[0] }}</h2>
              <button @click="open(i)">Enter the work ↗</button>
            </div>
            <small class="edge-label">SOLID / {{ i % 2 ? '17' : '23' }}% REMOVED</small>
          </article>
        </div></template
      >
      <article v-else-if="state === 'work'" class="work">
        <button @click="go('start')">← All six absences</button>
        <div class="work-form" :class="'h' + selected">
          <div class="void">
            <span>WORK 0{{ selected + 1 }}</span>
            <h1>{{ works[selected][0] }}</h1>
          </div>
        </div>
        <p class="lead">{{ works[selected][1] }}</p>
        <div class="process">
          <h2>Three decisions</h2>
          <ol>
            <li>Begin with a continuous, heavy silhouette.</li>
            <li>Remove one shape that suggests an ordinary human action.</li>
            <li>
              Keep the entrance in the removed area; let the surrounding mass carry the tension.
            </li>
          </ol>
        </div>
        <button @click="keep">Add to your three-work show</button
        ><button @click="open((selected + 1) % 6)">Next absence →</button>
        <p role="status">{{ message }}</p>
      </article>
      <section v-else class="show">
        <h1>Three spaces.<br />Your exhibition.</h1>
        <p>Select up to three works. The arrangement is saved on this browser.</p>
        <div class="show-wall">
          <article v-for="i in show" :key="i">
            <span>0{{ i + 1 }}</span>
            <h2>{{ works[i][0] }}</h2>
            <button @click="open(i)">Enter</button
            ><button @click="show = show.filter((n) => n !== i)">Remove</button>
          </article>
        </div>
        <p v-if="!show.length">The wall is empty. Choose a work to begin.</p>
        <button @click="go('start')">Choose from all six works</button
        ><button @click="show = []">Clear exhibition</button>
      </section>
    </main>
    <footer>HOLLOW / ORIGINAL SILHOUETTE STUDIES / ALL EMPTINESS ACCOUNTED FOR</footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Archivo Black';
  src: url('/fonts/archivo-black.woff2') format('woff2');
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
  color: #0c100e;
  background: #cb5c44;
  padding: 25px 4%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
header strong {
  font: 35px var(--heading);
  letter-spacing: -0.05em;
}
header > span {
  font-size: 9px;
  max-width: 160px;
}
button {
  border: 0;
  border-bottom: 1px solid;
  background: transparent;
  padding: 9px 4px;
}
header nav {
  font-size: 11px;
}
.exhibition-title {
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 40px 5%;
  gap: 30px;
}
.exhibition-title h1 {
  font: clamp(50px, 7vw, 100px)/0.98 var(--heading);
  letter-spacing: -0.05em;
  margin: 0;
}
.exhibition-title p {
  font-size: 18px;
  line-height: 1.8;
  margin: 0;
}
.hollows {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 0;
  background: #cb5c44;
  padding: 2%;
}
.hollow {
  position: relative;
  background: #161b18;
  min-height: 470px;
  padding: 55px 15%;
  display: grid;
  place-items: center;
  margin: 2%;
  border-radius: 2px;
}
.void {
  background: #e7e6df;
  color: #161b18;
  text-align: center;
  padding: 35px 22px;
  width: 100%;
  position: relative;
}
.void > span {
  font-size: 9px;
  letter-spacing: 0.15em;
}
.void h2 {
  font: clamp(23px, 2.9vw, 40px)/1.1 var(--heading);
  letter-spacing: -0.04em;
  margin: 22px 0;
}
.void button {
  font-size: 11px;
}
.h0 {
  border-radius: 18% 0 0 0;
}
.h0 .void {
  min-height: 280px;
  border-radius: 50% 50% 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.h1 {
  border-radius: 45% 45% 4% 4%;
}
.h1 .void {
  border-radius: 45%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.h2 .void {
  width: 80%;
  min-height: 320px;
  border-radius: 2px;
}
.h3 {
  border-radius: 40% 3% 35% 4%;
}
.h3 .void {
  border-radius: 45% 45% 35% 35%;
  min-height: 270px;
  display: grid;
  align-content: center;
}
.h4 {
  border-radius: 2% 20% 2% 20%;
}
.h4 .void {
  border-radius: 0;
  transform: rotate(-5deg);
  min-height: 240px;
}
.h5 {
  border-radius: 35% 10% 20% 30%;
}
.h5 .void {
  border-radius: 40% 20% 35% 30%;
  min-height: 280px;
  display: grid;
  align-content: center;
}
.edge-label {
  position: absolute;
  bottom: 20px;
  left: 25px;
  color: #e7e6df;
  font-size: 8px;
  letter-spacing: 0.12em;
}
.inverted .hollow,
.inverted .work-form {
  background: #e7e6df;
}
.inverted .void {
  background: #161b18;
  color: #e7e6df;
}
.inverted .edge-label {
  color: #161b18;
}
.work,
.show {
  padding: 35px 5% 70px;
}
.work-form {
  background: #161b18;
  max-width: 950px;
  padding: 50px 18%;
  margin: 30px auto;
}
.work-form .void {
  min-height: 330px;
  padding: 40px 25px;
}
.work h1 {
  font: clamp(30px, 4vw, 55px)/1.1 var(--heading);
  letter-spacing: -0.04em;
  margin: 20px 0;
}
.lead {
  font: clamp(24px, 3vw, 35px)/1.7 var(--body);
  max-width: 39ch;
  margin: 45px auto;
}
.process {
  max-width: 700px;
  margin: 40px auto;
  padding-top: 25px;
  border-top: 1px solid;
}
.process h2 {
  font: 25px var(--heading);
}
.process li {
  padding: 10px 0;
}
.work > button {
  margin-right: 25px;
}
.show h1 {
  font: clamp(45px, 6vw, 85px)/1.05 var(--heading);
}
.show-wall {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  margin: 40px 0;
}
.show-wall article {
  background: #161b18;
  color: #e7e6df;
  padding: 35px 25px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.show-wall h2 {
  font: 30px/1.1 var(--heading);
  margin: 25px 0;
}
.show-wall span {
  font-size: 10px;
}
.show > button {
  margin: 20px 25px 0 0;
}
footer {
  color: #0c100e;
  background: #cb5c44;
  padding: 22px 4%;
  font-size: 9px;
}
@media (max-width: 700px) {
  header {
    flex-wrap: wrap;
  }
  .exhibition-title {
    display: block;
    padding: 35px 5%;
  }
  .exhibition-title h1 {
    font-size: 53px;
  }
  .exhibition-title p {
    margin-top: 25px;
    font-size: 15px;
  }
  .hollows {
    grid-template-columns: 1fr;
  }
  .hollow {
    min-height: 400px;
    padding: 45px 15%;
  }
  .void h2 {
    font-size: 30px;
  }
  .work-form {
    padding: 35px 12%;
  }
  .work-form .void {
    min-height: 270px;
    padding: 25px 15px;
  }
  .lead {
    font-size: 23px;
  }
  .show-wall {
    grid-template-columns: 1fr;
  }
  .work > button {
    margin-bottom: 15px;
  }
  .show-wall article {
    min-height: 220px;
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
