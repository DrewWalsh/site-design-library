<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useSpecimen } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const year = ref('2026'),
  chapter = ref('Access'),
  mode = ref('Income');
const income = [
    { name: 'Community grants', value: 420000 },
    { name: 'Local funding', value: 280000 },
    { name: 'Earned income', value: 100000 },
  ],
  spending = [
    { name: 'People & programmes', value: 450000 },
    { name: 'Buildings & operations', value: 210000 },
    { name: 'Collections & resources', value: 100000 },
  ];
const rows = computed(() => (mode.value === 'Income' ? income : spending)),
  sum = computed(() => rows.value.reduce((a, r) => a + r.value, 0));
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header class="report-header wrap">
      <a :href="href('start')" class="report-logo">Northbank<br /><span>Public Library</span></a>
      <nav class="row">
        <button class="text-link" @click="go('results')">The year in review</button
        ><button class="text-link" @click="go('finances')">Financial statements</button
        ><a :href="href('finances') + '#sources'">Sources &amp; notes ↗</a>
      </nav>
    </header>
    <main id="content">
      <template v-if="state === 'start'"
        ><section class="report-cover wrap">
          <div class="cover-side">
            <span>ANNUAL REPORT</span>
            <p>A fictional public institution.<br />An illustrative year of work.</p>
            <div class="report-chapter-line">01 — 05<br />STORY / RESULTS / ACCOUNTS</div>
          </div>
          <div class="cover-main">
            <p class="eyebrow">A YEAR OF OPEN DOORS.</p>
            <h1>More than<br />a place for books.</h1>
            <div class="giant-year" aria-label="2026">20<span>26</span></div>
            <div class="cover-bottom">
              <p>The everyday work of keeping knowledge, company, and possibility within reach.</p>
              <button class="primary" @click="go('results')">Read the year in review →</button>
            </div>
          </div>
        </section>
        <section class="report-letter wrap section">
          <span class="chapter-no">01</span>
          <div>
            <p class="eyebrow">A NOTE TO OUR COMMUNITY</p>
            <h2>The value of a place<br />you can simply walk into.</h2>
            <p class="letter-lead">
              A library is measured in many ways. Some are easy to count. Others live in the quiet
              confidence of finding the right book, asking a question, or having somewhere to be.
            </p>
            <p>
              This sample report pairs a narrative with the figures and source notes that support
              it. It shows how a public organisation can explain a year of work without turning
              every achievement into a dashboard.
            </p>
            <p class="letter-signature">
              The Northbank Library team<br /><small
                >Fictional annual report / illustrative statement</small
              >
            </p>
          </div>
        </section>
        <section class="report-results">
          <div class="wrap">
            <div class="section-heading">
              <div>
                <p class="eyebrow">02 / THE YEAR, IN A FEW FIGURES</p>
                <h2>Useful measures.<br />A wider story.</h2>
              </div>
              <button class="text-link" @click="go('results')">Read the context →</button>
            </div>
            <div class="report-metrics">
              <article>
                <strong>84,200</strong>
                <h3>sample visits</h3>
                <p>Recorded entries across two fictional branches.</p>
              </article>
              <article>
                <strong>216</strong>
                <h3>sample sessions</h3>
                <p>Workshops, reading groups, and community events.</p>
              </article>
              <article>
                <strong>3,400</strong>
                <h3>new sample members</h3>
                <p>Illustrative registrations during the reporting year.</p>
              </article>
            </div>
            <p class="muted">
              All figures are fictional fixtures. See methodology and limits in the source notes.
            </p>
          </div>
        </section>
        <section class="wrap section report-contents">
          <h2>Read the full picture.</h2>
          <div>
            <button @click="go('results')">
              <span>03</span>
              <h3>Projects &amp; outcomes</h3>
              <b>→</b></button
            ><button @click="go('finances')">
              <span>04</span>
              <h3>Income &amp; spending</h3>
              <b>→</b></button
            ><a :href="href('finances') + '#sources'"
              ><span>05</span>
              <h3>Sources &amp; methodology</h3>
              <b>→</b></a
            >
          </div>
        </section></template
      >
      <section v-else class="wrap state-page">
        <button class="back text-link" @click="go('start')">← Report contents</button
        ><template v-if="state === 'results'"
          ><p class="eyebrow">03 / PROJECTS &amp; OUTCOMES / 2026</p>
          <h1>What changed,<br />and what we learned.</h1>
          <nav class="chapter-tabs row" aria-label="Outcome themes">
            <button
              v-for="c in ['Access', 'Learning', 'Shared spaces']"
              :key="c"
              :aria-pressed="chapter === c"
              @click="chapter = c"
            >
              {{ c }}
            </button>
          </nav>
          <div class="outcome-chapter">
            <aside>
              <span class="chapter-no">{{
                chapter === 'Access' ? '01' : chapter === 'Learning' ? '02' : '03'
              }}</span>
              <h2>{{ chapter }}</h2>
              <p>Reporting period<br />1 January–31 December 2026</p>
            </aside>
            <article>
              <h2>
                {{
                  chapter === 'Access'
                    ? 'Making the first visit easier.'
                    : chapter === 'Learning'
                      ? 'A programme built around useful questions.'
                      : 'Space for a wider range of days.'
                }}
              </h2>
              <p>
                {{
                  chapter === 'Access'
                    ? 'The illustrative access project reviewed signage, welcome information, and the steps involved in becoming a member.'
                    : chapter === 'Learning'
                      ? 'The sample learning programme paired introductory sessions with follow-up resources and opportunities to practise.'
                      : 'The fictional space project created quieter reading areas and more clearly identified group-work tables.'
                }}
              </p>
              <div class="outcome-record">
                <div>
                  <h3>The work</h3>
                  <p>
                    A bounded project with a named purpose, practical changes, and a record of
                    decisions.
                  </p>
                </div>
                <div>
                  <h3>The evidence</h3>
                  <p>
                    Attendance records, feedback themes, and observations, interpreted with their
                    limitations.
                  </p>
                </div>
                <div>
                  <h3>The next step</h3>
                  <p>
                    Review who was not reached, test the remaining assumptions, and explain what
                    changes next year.
                  </p>
                </div>
              </div>
              <p class="source-note">
                Source note 03: fictional project narrative. No causal impact or independently
                audited outcome is claimed.
              </p>
              <button class="text-link" @click="go('finances')">How the year was funded →</button>
            </article>
          </div></template
        ><template v-else
          ><p class="eyebrow">04 / FINANCIAL STATEMENTS / ILLUSTRATIVE</p>
          <h1>The resources<br />behind the work.</h1>
          <p class="lead">
            A readable account of income, spending, and the balance carried forward. All amounts are
            sample CAD figures.
          </p>
          <div class="financial-summary">
            <div><span>Income</span><strong>&#36;800,000</strong></div>
            <div><span>Spending</span><strong>&#36;760,000</strong></div>
            <div><span>Sample surplus</span><strong>&#36;40,000</strong></div>
          </div>
          <div class="financial-detail">
            <div>
              <div class="row finance-switch">
                <button
                  v-for="m in ['Income', 'Spending']"
                  :key="m"
                  :aria-pressed="mode === m"
                  @click="mode = m"
                >
                  {{ m }}
                </button>
              </div>
              <table>
                <caption>
                  2026
                  {{
                    mode.toLowerCase()
                  }}
                  · CAD · fictional figures
                </caption>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Share</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="r in rows" :key="r.name">
                    <th>{{ r.name }}</th>
                    <td>&#36;{{ r.value.toLocaleString() }}</td>
                    <td>{{ ((r.value / sum) * 100).toFixed(1) }}%</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>Total {{ mode.toLowerCase() }}</th>
                    <td>&#36;{{ sum.toLocaleString() }}</td>
                    <td>100%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <figure class="finance-bars">
              <div v-for="r in rows" :key="r.name">
                <span>{{ r.name }}</span>
                <div class="bar-track"><i :style="{ width: (r.value / sum) * 100 + '%' }"></i></div>
                <b>{{ ((r.value / sum) * 100).toFixed(1) }}%</b>
              </div>
              <figcaption>
                Same figures as the table, shown as a share of the selected total.
              </figcaption>
            </figure>
          </div>
          <section id="sources" class="source-material">
            <p class="eyebrow">05 / SOURCES &amp; METHODOLOGY</p>
            <h2>A report should show its workings.</h2>
            <details open>
              <summary>Financial basis</summary>
              <p>
                These are fictional cash-flow categories for a design specimen. Income totals
                $800,000; spending totals $760,000; the difference is $40,000. They are not audited
                accounts and do not imply compliance with an accounting standard.
              </p>
            </details>
            <details>
              <summary>Visits, sessions, and membership</summary>
              <p>
                Example definitions: visits count entries, sessions count organised events, and new
                members count registrations. A real report should state duplicates, missing data,
                reporting dates, and collection methods.
              </p>
            </details>
            <details>
              <summary>Project narratives</summary>
              <p>
                Project stories are illustrative. Replace them with dated records, consented
                accounts, source documents, and clear distinctions between activity, outcomes, and
                attributed impact.
              </p>
            </details>
          </section></template
        >
      </section>
    </main>
    <footer class="sample-footer">
      <span>Northbank / Public library · Fictional design reference 75.</span
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

.report-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding-top: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--ink);
}
.report-logo {
  font: 22px/1.2 var(--heading);
  text-decoration: none;
}
.report-logo span {
  font: 12px var(--body);
}
.report-header nav {
  font-size: 12px;
}
.report-cover {
  display: grid;
  grid-template-columns: 170px 1fr;
  gap: 60px;
  padding-top: 45px;
  padding-bottom: 50px;
}
.cover-side {
  border-right: 1px solid var(--line);
  padding-right: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 11px;
}
.cover-side > span {
  font-size: 10px;
  letter-spacing: 0.16em;
}
.report-chapter-line {
  line-height: 2;
  font-size: 9px;
}
.cover-main {
  position: relative;
}
.cover-main h1 {
  font-size: clamp(3rem, 5vw, 5rem);
  font-weight: 400;
  line-height: 1.16;
  margin: 20px 0 25px;
  position: relative;
  z-index: 1;
  max-width: 650px;
}
.giant-year {
  font: 250px/0.75 var(--heading);
  letter-spacing: -0.12em;
  color: #9b6d75;
  display: flex;
  gap: 15px;
  justify-content: end;
  border-bottom: 2px solid var(--ink);
  padding: 20px 25px 40px 0;
}
.giant-year span {
  font-style: italic;
}
.cover-bottom {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  align-items: center;
  margin-top: 25px;
}
.cover-bottom p {
  font-size: 14px;
  max-width: 35ch;
}
.cover-bottom button {
  font-size: 12px;
}
.report-letter {
  display: grid;
  grid-template-columns: 170px 1fr;
  gap: 60px;
  border-top: 1px solid var(--ink);
}
.chapter-no {
  font: 65px/1 var(--heading);
  color: #8b5e6a;
}
.report-letter h2 {
  font-weight: 400;
  margin: 20px 0 30px;
  font-size: 38px;
}
.letter-lead {
  font: 24px/1.7 var(--heading);
  max-width: 48ch;
}
.report-letter p:not(.eyebrow):not(.letter-lead) {
  max-width: 68ch;
  margin-top: 25px;
}
.letter-signature {
  font-style: italic;
}
.letter-signature small {
  font: 10px var(--body);
}
.report-results {
  background: #e5d3cc;
  padding: 55px 0;
}
.report-results h2 {
  font-weight: 400;
  margin-top: 20px;
}
.report-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 35px;
  margin: 35px 0 25px;
}
.report-metrics article {
  border-top: 1px solid var(--ink);
  padding-top: 25px;
}
.report-metrics strong {
  font: 48px var(--heading);
  letter-spacing: -0.06em;
}
.report-metrics h3 {
  font: 15px var(--body);
  margin: 15px 0;
}
.report-metrics p {
  font-size: 13px;
}
.report-results .muted {
  font-size: 11px;
}
.report-contents {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 65px;
}
.report-contents h2 {
  font-weight: 400;
}
.report-contents button,
.report-contents a {
  display: flex;
  align-items: center;
  gap: 25px;
  width: 100%;
  padding: 23px 0;
  border: 0;
  border-bottom: 1px solid var(--ink);
  background: transparent;
  text-align: left;
  text-decoration: none;
}
.report-contents span {
  font-size: 12px;
}
.report-contents h3 {
  font-weight: 400;
  font-size: 24px;
  flex: 1;
}
.report-contents b {
  font-size: 23px;
}
.chapter-tabs {
  margin: 35px 0;
}
.chapter-tabs button {
  background: transparent;
  font-size: 13px;
  border: 0;
  border-bottom: 2px solid transparent;
}
.chapter-tabs button[aria-pressed='true'] {
  outline: 0;
  border-bottom-color: var(--accent);
}
.outcome-chapter {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 65px;
  border-top: 1px solid var(--ink);
  padding-top: 35px;
}
.outcome-chapter aside h2 {
  font-size: 27px;
  margin: 20px 0;
}
.outcome-chapter aside p {
  font-size: 12px;
}
.outcome-chapter article > h2 {
  font-size: 34px;
  font-weight: 400;
  margin-bottom: 25px;
}
.outcome-record {
  margin: 35px 0;
}
.outcome-record > div {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 30px;
  border-top: 1px solid var(--line);
  padding: 22px 0;
}
.outcome-record h3 {
  font-size: 18px;
  font-weight: 400;
}
.outcome-record p {
  font-size: 14px;
}
.source-note {
  font-size: 11px;
  margin-bottom: 20px;
}
.financial-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  background: #e6d7d0;
  padding: 30px;
  margin: 35px 0;
}
.financial-summary span {
  font-size: 12px;
}
.financial-summary strong {
  display: block;
  font: 32px var(--heading);
  margin-top: 15px;
  letter-spacing: -0.05em;
}
.financial-detail {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 50px;
  align-items: start;
}
.finance-switch {
  margin-bottom: 20px;
}
.finance-switch button {
  font-size: 12px;
  background: transparent;
}
.finance-switch button[aria-pressed='true'] {
  outline: 0;
  background: var(--accent);
  color: white;
}
.financial-detail table {
  font-size: 13px;
}
.financial-detail caption {
  text-align: left;
  font-size: 11px;
  margin-bottom: 15px;
}
.financial-detail tfoot {
  border-top: 2px solid var(--ink);
  font-weight: 700;
}
.finance-bars {
  margin-top: 65px;
  padding: 25px;
  background: #e8ded6;
}
.finance-bars > div {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  margin-bottom: 22px;
}
.finance-bars span {
  font-size: 12px;
  grid-column: 1/-1;
}
.bar-track {
  height: 20px;
  background: #d0b9ba;
}
.bar-track i {
  height: 100%;
  display: block;
  background: #79364e;
}
.finance-bars b {
  font-size: 11px;
}
.finance-bars figcaption {
  font-size: 10px;
}
.source-material {
  margin-top: 55px;
  border-top: 1px solid var(--ink);
  padding-top: 35px;
  scroll-margin-top: 20px;
}
.source-material h2 {
  font-weight: 400;
  font-size: 31px;
  margin: 20px 0 30px;
}
.source-material details {
  font-size: 14px;
}
.state-page > h1 {
  font-weight: 400;
}
@media (max-width: 760px) {
  .report-header {
    align-items: start;
  }
  .report-header nav {
    max-width: 165px;
    gap: 4px;
    justify-content: end;
  }
  .report-header button,
  .report-header nav > a {
    font-size: 10px;
    min-height: 30px;
  }
  .report-logo {
    font-size: 18px;
  }
  .report-logo span {
    font-size: 10px;
  }
  .report-cover {
    grid-template-columns: 1fr;
    gap: 25px;
    padding-top: 30px;
  }
  .cover-side {
    border: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
  .cover-side > p {
    font-size: 9px;
    max-width: 140px;
  }
  .report-chapter-line {
    display: none;
  }
  .cover-main h1 {
    font-size: 3rem;
  }
  .giant-year {
    font-size: clamp(90px, 28vw, 140px);
    gap: 10px;
    padding-right: 10px;
  }
  .cover-bottom {
    display: block;
  }
  .cover-bottom button {
    margin-top: 25px;
  }
  .report-letter,
  .report-contents,
  .outcome-chapter,
  .financial-detail {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  .report-letter h2 {
    font-size: 30px;
  }
  .letter-lead {
    font-size: 21px;
  }
  .chapter-no {
    font-size: 45px;
  }
  .report-metrics {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  .report-metrics strong {
    font-size: 42px;
  }
  .report-metrics h3 {
    display: inline-block;
    margin-left: 15px;
  }
  .report-contents h3 {
    font-size: 21px;
  }
  .outcome-record > div {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .outcome-chapter aside {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }
  .outcome-chapter aside p {
    font-size: 10px;
  }
  .financial-summary {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 25px;
  }
  .financial-summary > div {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
  }
  .financial-summary strong {
    font-size: 25px;
    margin: 0;
  }
  .financial-summary span {
    font-size: 11px;
  }
  .financial-detail table {
    font-size: 11px;
  }
  .finance-bars {
    margin-top: 0;
  }
  .source-material h2 {
    font-size: 27px;
  }
}

.eyebrow {
  font:
    italic 13px/1.6 Georgia,
    serif;
  letter-spacing: 0.025em;
  text-transform: none;
}
</style>
