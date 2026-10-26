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
    .filter((k) => k.startsWith('design-library:43:'))
    .forEach((k) => localStorage.removeItem(k));
  location.href = href('start');
}
const release = ref(0),
  track = ref(0);
const albums = [
  {
    name: 'Soft Circuit',
    artist: 'Lumen Array',
    year: '2026',
    tracks: ['First light', 'Residual motion', 'Soft circuit', 'The space after'],
  },
  {
    name: 'Night Geometry',
    artist: 'Phase Index',
    year: '2026',
    tracks: ['Glass corridor', 'Night geometry', 'Slow frequency', 'Return signal'],
  },
  {
    name: 'Liquid Memory',
    artist: 'Echo Unit',
    year: '2025',
    tracks: ['Surface tension', 'Liquid memory', 'A held note', 'Almost home'],
  },
];
function selectRelease(i: number) {
  release.value = i;
  track.value = 0;
  message.value = '';
}
function play() {
  message.value = 'No audio file is supplied for this fictional release. Playback remains paused.';
  go('player');
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header>
      <a :href="href('start')" @click.prevent="go('start')">SIGNAL<br /><span>MESH_</span></a>
      <nav>
        <button @click="go('start')">RELEASES</button
        ><button @click="go('credits')">THE ARTISTS</button
        ><span>INDEPENDENT ELECTRONIC MUSIC</span>
      </nav>
    </header>
    <main id="content">
      <template v-if="state !== 'credits'"
        ><div class="equipment">
          <aside class="release-strip">
            <p class="eyebrow">THE CATALOGUE</p>
            <button
              v-for="(album, i) in albums"
              :key="album.name"
              :aria-pressed="release === i"
              @click="selectRelease(i)"
            >
              <span>SM / 00{{ i + 1 }}</span
              ><b>{{ album.name }}</b
              ><small>{{ album.artist }} · {{ album.year }}</small>
            </button>
            <div class="vertical-label">TRANSMISSIONS FROM THE IN-BETWEEN.</div>
          </aside>
          <section class="media">
            <div class="device-top">
              <span>SIGNAL MESH / AUDIO ARCHIVE</span><span>MODE: LOCAL</span>
            </div>
            <div class="release-stage">
              <div class="disc-art" :class="'disc-' + release">
                <div class="orbit o1"></div>
                <div class="orbit o2"></div>
                <div class="orbit o3"></div>
                <span>{{ albums[release].name }}</span
                ><small>{{ albums[release].artist }}</small>
              </div>
              <div class="album-meta">
                <p class="eyebrow">RELEASE 00{{ release + 1 }} / {{ albums[release].year }}</p>
                <h1>{{ albums[release].name }}</h1>
                <p>{{ albums[release].artist }}</p>
                <p class="description">
                  Four pieces about the spaces between movement and stillness. A fictional release
                  from an imagined label.
                </p>
                <button @click="go('credits')">Artist & credits ↗</button>
              </div>
            </div>
            <div class="tracks">
              <button
                v-for="(name, i) in albums[release].tracks"
                :key="name"
                :aria-pressed="track === i"
                @click="
                  track = i;
                  message = '';
                "
              >
                <span>0{{ i + 1 }}</span
                ><b>{{ name }}</b
                ><span>{{ ['04:12', '05:38', '03:46', '06:08'][i] }}</span
                ><span>{{ track === i ? 'SELECTED' : '+' }}</span>
              </button>
            </div>
            <div class="player">
              <button class="play" @click="play" aria-label="Try the selected audio preview">
                ▶
              </button>
              <div>
                <small>SELECTED TRACK / PREVIEW</small
                ><strong>{{ albums[release].tracks[track] }}</strong
                ><span>{{
                  message ? 'Unavailable · paused' : 'Paused · audio preview not supplied'
                }}</span>
              </div>
              <div class="level" aria-hidden="true"><i v-for="n in 12" :key="n"></i></div>
            </div>
            <p v-if="message" class="playback-message" role="status">{{ message }}</p>
          </section>
        </div>
        <section class="label-note">
          <p class="eyebrow">ABOUT THE LABEL</p>
          <h2>Music as a place<br />to spend time.</h2>
          <p>
            Signal Mesh is a fictional independent label. The artwork is original CSS, the titles
            are invented, and the player demonstrates an honest unavailable-media state. Nothing
            plays automatically.
          </p>
        </section></template
      >
      <section v-else class="credits">
        <p class="eyebrow">THE PEOPLE BEHIND THE SIGNAL / FICTIONAL CREDITS</p>
        <h1>{{ albums[release].artist }}</h1>
        <p>
          A fictional artist working with texture, repetition, and the feeling of a room after
          everyone has left.
        </p>
        <dl>
          <dt>Release</dt>
          <dd>{{ albums[release].name }}</dd>
          <dt>Written & produced</dt>
          <dd>{{ albums[release].artist }}</dd>
          <dt>Artwork</dt>
          <dd>Original geometric CSS study</dd>
          <dt>Audio</dt>
          <dd>No audio asset supplied</dd>
          <dt>Catalogue</dt>
          <dd>SM / 00{{ release + 1 }}</dd>
        </dl>
        <button @click="go('start')">Return to the release →</button>
      </section>
    </main>
    <footer class="specimen-note">
      <span>Signal Mesh · Fictional sample content · Design reference 43</span
      ><button @click="reset">Reset demo</button>
    </footer>
  </div>
</template>
<style scoped>
@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/space-grotesk.woff2') format('woff2');
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
  background: linear-gradient(135deg, #e1e5e9, #bdc8d6 55%, #dde6e9);
}
header {
  padding: 28px 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  border-bottom: 1px solid #8b9cb2;
}
header > a {
  font: 29px/0.95 'Space Grotesk';
  font-weight: 700;
  font-style: italic;
  letter-spacing: -0.06em;
  text-decoration: none;
}
header > a span {
  letter-spacing: 0.08em;
}
nav {
  display: flex;
  align-items: center;
  gap: 30px;
  font-size: 9px;
}
nav button {
  background: none;
  border: 0;
  font-size: 10px;
}
main {
  max-width: 1450px;
  margin: auto;
  padding: 45px 5% 80px;
}
.equipment {
  display: grid;
  grid-template-columns: 210px 1fr;
  gap: 22px;
}
.release-strip {
  background: linear-gradient(90deg, #bdc8d5, #e8edf2, #b3c1ce);
  padding: 25px 20px;
  border: 1px solid #8c9fb4;
  border-radius: 55px 8px 8px 20px;
  box-shadow: inset 2px 2px 0 #f9fcff;
}
.release-strip > .eyebrow {
  font-size: 9px;
  margin: 12px 0 25px;
}
.release-strip > button {
  display: grid;
  gap: 10px;
  width: 100%;
  text-align: left;
  padding: 18px 14px;
  background: #d1dde5;
  border: 1px solid #8a9fb4;
  border-radius: 4px 20px 20px 4px;
  margin: 16px 0;
  box-shadow: inset 1px 1px #f4fbff;
}
.release-strip > button[aria-pressed='true'] {
  background: #21394e;
  color: #d8f3f9;
  box-shadow: inset 3px 0 #66c5e0;
}
.release-strip > button span {
  font-size: 8px;
}
.release-strip b {
  font: 17px 'Space Grotesk';
  font-weight: 600;
}
.release-strip small {
  font-size: 9px;
}
.vertical-label {
  font-size: 9px;
  writing-mode: vertical-rl;
  letter-spacing: 0.1em;
  margin: 45px auto 0;
}
.media {
  background: #e6edf1;
  border: 1px solid #7d94aa;
  border-radius: 10px 55px 20px 10px;
  overflow: hidden;
  box-shadow:
    inset 2px 2px white,
    5px 8px 0 #8799ae55;
}
.device-top {
  display: flex;
  justify-content: space-between;
  font-size: 8px;
  padding: 20px 30px;
  background: linear-gradient(#fbfdfe, #bdcbd9, #e9eff4);
  border-bottom: 1px solid #8c9fb4;
}
.release-stage {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 35px;
  padding: 35px;
}
.disc-art {
  height: 300px;
  background: #193e59;
  border: 1px solid #738fa9;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 22px;
  color: #d5f3f4;
}
.disc-art > span {
  font: 30px 'Space Grotesk';
  font-weight: 600;
  letter-spacing: -0.03em;
  z-index: 1;
}
.disc-art > small {
  font-size: 10px;
  z-index: 1;
  margin-top: 8px;
}
.orbit {
  position: absolute;
  top: 30px;
  left: 18%;
  width: 210px;
  height: 150px;
  border: 17px solid #a6c4ce;
  border-radius: 50%;
  transform: rotate(-25deg);
  box-shadow:
    inset 3px 4px 5px #e0f5f9,
    4px 4px 5px #102840;
}
.o2 {
  transform: rotate(40deg);
  width: 180px;
  height: 140px;
  left: 22%;
  border-color: #6d9cac;
}
.o3 {
  transform: rotate(85deg);
  width: 180px;
  height: 140px;
  left: 22%;
  border-width: 8px;
  border-color: #c1d6df;
}
.disc-1 {
  background: #3c3459;
}
.disc-2 {
  background: #235a55;
}
.album-meta h1 {
  font-size: 40px;
  line-height: 1.1;
  margin: 20px 0;
}
.album-meta > .eyebrow {
  font-size: 8px;
}
.album-meta p {
  font-size: 14px;
}
.album-meta .description {
  font-size: 12px;
  line-height: 1.8;
  margin: 25px 0;
}
.album-meta button {
  font-size: 10px;
  border: 1px solid #8ca6b9;
  background: none;
  border-radius: 20px;
}
.tracks {
  padding: 0 35px 25px;
}
.tracks > button {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 15px 0;
  background: none;
  border: 0;
  border-bottom: 1px solid #bac7d1;
  border-radius: 0;
  text-align: left;
  font-size: 11px;
}
.tracks > button b {
  flex: 1;
  font-weight: 500;
}
.tracks > button > span:last-child {
  font-size: 8px;
  width: 55px;
  text-align: right;
}
.tracks > button[aria-pressed='true'] {
  box-shadow: inset 0 -2px #417a92;
  color: #175a72;
}
.player {
  display: flex;
  align-items: center;
  gap: 25px;
  padding: 25px 35px;
  background: linear-gradient(#eaf2f7, #b3c5d5);
  border-top: 1px solid #8ba0b4;
}
.play {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(#fff, #b3c6d5);
  border: 1px solid #7894aa;
  box-shadow: 2px 3px #738fa955;
}
.player > div:nth-child(2) {
  display: grid;
  gap: 7px;
  flex: 1;
}
.player small {
  font-size: 8px;
}
.player strong {
  font-size: 14px;
}
.player span {
  font-size: 9px;
}
.level {
  display: flex;
  gap: 3px;
  height: 30px;
  align-items: end;
}
.level i {
  height: 8px;
  width: 5px;
  background: #7897a5;
}
.playback-message {
  font-size: 11px;
  padding: 0 30px 20px;
}
.label-note {
  padding: 50px 0 0;
  max-width: 820px;
}
.label-note h2 {
  font-size: 39px;
  line-height: 1.2;
}
.label-note p {
  font-size: 14px;
}
.credits {
  max-width: 900px;
  padding: 25px 0 150px;
}
.credits h1 {
  font-size: 65px;
}
.credits > p {
  font-size: 17px;
}
.credits dl {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 25px;
  padding: 35px;
  border: 1px solid #8ba0b4;
  background: #e5edf1;
  font-size: 14px;
  margin: 40px 0;
}
.credits dd {
  margin: 0;
}
.credits button {
  font-size: 12px;
}
@media (max-width: 800px) {
  .equipment {
    grid-template-columns: 160px 1fr;
  }
  .release-stage {
    grid-template-columns: 1fr;
  }
  .disc-art {
    height: 300px;
  }
  .vertical-label {
    margin-top: 30px;
  }
  .album-meta h1 {
    font-size: 34px;
  }
  nav > span {
    display: none;
  }
}
@media (max-width: 600px) {
  header {
    padding: 23px;
  }
  header > a {
    font-size: 23px;
  }
  nav {
    gap: 12px;
  }
  nav button {
    font-size: 9px;
  }
  main {
    padding: 25px 4% 60px;
  }
  .equipment {
    display: block;
  }
  .release-strip {
    display: flex;
    gap: 10px;
    padding: 15px;
    border-radius: 20px;
    margin-bottom: 20px;
  }
  .release-strip > .eyebrow,
  .vertical-label {
    display: none;
  }
  .release-strip > button {
    padding: 12px 9px;
    margin: 0;
    min-width: 0;
    border-radius: 4px 12px 12px 4px;
  }
  .release-strip b {
    font-size: 13px;
  }
  .release-strip small {
    font-size: 7px;
    line-height: 1.5;
  }
  .release-strip > button span {
    font-size: 6px;
  }
  .media {
    border-radius: 10px 35px 20px 10px;
  }
  .release-stage {
    padding: 23px;
    gap: 25px;
  }
  .device-top {
    padding: 18px 22px;
    font-size: 6px;
  }
  .tracks {
    padding: 0 23px 20px;
  }
  .tracks > button {
    font-size: 10px;
    gap: 12px;
  }
  .tracks > button > span:last-child {
    font-size: 6px;
    width: 45px;
  }
  .player {
    padding: 20px;
    gap: 15px;
  }
  .level {
    display: none;
  }
  .label-note h2 {
    font-size: 32px;
  }
  .credits h1 {
    font-size: 45px;
  }
  .credits dl {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 25px;
  }
  .credits dd {
    margin-bottom: 15px;
  }
}
</style>
