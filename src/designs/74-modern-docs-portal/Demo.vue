<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useSpecimen } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const version = ref('v2'),
  language = ref('JavaScript'),
  query = ref(''),
  copied = ref(false),
  ran = ref(false),
  mobileNav = ref(false);
const pages = [
  { title: 'Overview', key: 'start', section: 'GET STARTED' },
  { title: 'Quickstart', key: 'quickstart', section: 'GET STARTED' },
  { title: 'API reference', key: 'reference', section: 'BUILD WITH VECTOR' },
];
const endpoint = computed(() => '/' + version.value + '/notes');
const snippet = computed(() =>
  language.value === 'JavaScript'
    ? [
        'const response = await fetch("https://api.vector.example' + endpoint.value + '", {',
        '  method: "POST",',
        '  headers: { "Content-Type": "application/json" },',
        '  body: JSON.stringify({ title: "My first note" })',
        '});',
        'const note = await response.json();',
      ].join(String.fromCharCode(10))
    : 'curl -X POST https://api.vector.example' +
      endpoint.value +
      ' -H "Content-Type: application/json" -d ' +
      JSON.stringify(JSON.stringify({ title: 'My first note' })),
);
async function copy() {
  try {
    await navigator.clipboard.writeText(snippet.value);
    copied.value = true;
  } catch {
    copied.value = false;
  }
}
watch(version, () => {
  ran.value = false;
  copied.value = false;
});

const sampleResponse = computed(() =>
  JSON.stringify(
    {
      id: 'note_001',
      title: 'My first note',
      createdAt: '2026-11-06T09:00:00Z',
      ...(version.value === 'v2' ? { metadata: { source: 'quickstart' } } : {}),
    },
    null,
    2,
  ),
);
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header class="docs-header">
      <a :href="href('start')" class="docs-logo"
        ><span aria-hidden="true">V</span> vector<span>docs</span></a
      ><label class="docs-search"
        >Search documentation<input v-model="query" placeholder="Search the documentation…"
      /></label>
      <div class="docs-tools">
        <label
          >Version<select v-model="version">
            <option>v2</option>
            <option>v1</option>
          </select></label
        ><a href="/designs/74-modern-docs-portal">About this reference ↗</a>
      </div>
      <button class="docs-menu" @click="mobileNav = !mobileNav" :aria-expanded="mobileNav">
        Contents
      </button>
    </header>
    <div v-if="query" class="docs-search-results" role="region" aria-label="Search results">
      <button
        v-for="p in pages.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))"
        :key="p.key"
        @click="
          go(p.key);
          query = '';
        "
      >
        {{ p.title }} →
      </button>
      <p v-if="!pages.some((p) => p.title.toLowerCase().includes(query.toLowerCase()))">
        No pages match. Try “quickstart” or “API”.
      </p>
    </div>
    <main id="content" class="docs-layout">
      <aside :class="['docs-sidebar', { expanded: mobileNav }]">
        <nav aria-label="Documentation">
          <p>Get started</p>
          <button
            v-for="p in pages.slice(0, 2)"
            :key="p.key"
            :class="{ active: state === p.key }"
            @click="
              go(p.key);
              mobileNav = false;
            "
          >
            {{ p.title }}
          </button>
          <p>Build with Vector</p>
          <button
            :class="{ active: state === 'reference' }"
            @click="
              go('reference');
              mobileNav = false;
            "
          >
            API reference</button
          ><a :href="href('reference') + '#errors'">Errors &amp; responses</a
          ><a :href="href('quickstart') + '#next'">Next steps</a>
        </nav>
        <div class="version-note">
          <span>{{ version }} documentation</span>
          <p>
            {{
              version === 'v2'
                ? 'Current sample version.'
                : 'Legacy sample version. The example omits v2 metadata.'
            }}
          </p>
        </div>
      </aside>
      <article class="docs-article">
        <div class="docs-breadcrumb">
          Documentation / {{ version }} /
          {{ pages.find((p) => p.key === state)?.title || 'Overview' }}
        </div>
        <template v-if="state === 'start'"
          ><p class="eyebrow">Get started</p>
          <h1>Build with a clear reference.</h1>
          <p class="docs-lead">
            Vector is a fictional notes API used to demonstrate a conventional documentation portal.
            Start with a small working example, then find the exact details.
          </p>
          <div class="docs-callout">
            <b>A documentation specimen</b>
            <p>
              Examples use the reserved <code>.example</code> domain and do not call a real service.
              The local response preview is a fixture.
            </p>
          </div>
          <section id="overview">
            <h2>From first request to useful detail</h2>
            <div class="docs-entry-links">
              <button @click="go('quickstart')">
                <span>01 / START HERE</span>
                <h3>Make your first note</h3>
                <p>A short example, a readable response, and a clear next step.</p>
                <b>Open the quickstart →</b></button
              ><button @click="go('reference')">
                <span>02 / LOOK IT UP</span>
                <h3>Read the API contract</h3>
                <p>Parameters, response fields, and errors in a consistent structure.</p>
                <b>Browse the reference →</b>
              </button>
            </div>
          </section>
          <section id="concepts">
            <h2>The core concepts</h2>
            <dl class="concept-list">
              <div>
                <dt>Note</dt>
                <dd>A small record with an ID, a title, and optional content.</dd>
              </div>
              <div>
                <dt>Version</dt>
                <dd>A named contract. Examples should match the version you have selected.</dd>
              </div>
              <div>
                <dt>Response</dt>
                <dd>A predictable result with fields and error cases explained alongside it.</dd>
              </div>
            </dl>
          </section>
          <section id="versions">
            <h2>Choose your version</h2>
            <p>
              The selector updates the route shown in examples and the response schema. A real
              portal should publish compatibility and migration details beside each supported
              version.
            </p>
            <button class="text-link" @click="go('reference')">
              Compare the selected contract →
            </button>
          </section></template
        ><template v-else-if="state === 'quickstart'"
          ><p class="eyebrow">GET STARTED / {{ version }}</p>
          <h1>Create your first note.</h1>
          <p class="docs-lead">
            One request, one response, and enough context to understand the shape of the
            integration.
          </p>
          <section id="request">
            <h2>1. Send a request</h2>
            <p>
              Use a JSON body with a title. These examples describe a fictional service; no
              credentials or external calls are needed for the local demonstration.
            </p>
            <div class="code-panel">
              <div class="code-toolbar">
                <label
                  >Example language<select v-model="language">
                    <option>JavaScript</option>
                    <option>cURL</option>
                  </select></label
                ><button @click="copy">{{ copied ? 'Copied ✓' : 'Copy code' }}</button>
              </div>
              <pre
                tabindex="0"
                aria-label="Scrollable code example"
              ><code>{{ snippet }}</code></pre>
            </div>
            <p class="copy-status" role="status">
              {{
                copied
                  ? 'Code copied. The endpoint is fictional.'
                  : 'You can also select and copy the example directly.'
              }}
            </p>
          </section>
          <section id="response">
            <h2>2. Inspect the response</h2>
            <button class="primary" @click="ran = true">Show local sample response</button>
            <pre
              v-if="ran"
              class="response-code"
              role="status"
            ><code>{{ sampleResponse }}</code></pre>
            <p>
              The preview is a fixed local result. A real integration must handle network failures
              and the documented error responses.
            </p>
          </section>
          <section id="next">
            <h2>3. Keep the contract close</h2>
            <p>
              Check field limits, version behaviour, and error handling before extending the
              example.
            </p>
            <button class="text-link" @click="go('reference')">
              Read the note endpoint reference →
            </button>
          </section></template
        ><template v-else
          ><p class="eyebrow">API REFERENCE / {{ version }}</p>
          <h1>Create a note.</h1>
          <div class="endpoint">
            <b>POST</b><code>{{ endpoint }}</code>
          </div>
          <p class="docs-lead">
            Creates a note from a JSON object. This contract is illustrative and belongs to the
            fictional Vector service.
          </p>
          <section id="parameters">
            <h2>Request body</h2>
            <div class="parameter">
              <div><code>title</code><span>string · required</span></div>
              <p>A short label for the note. Between 1 and 120 characters.</p>
            </div>
            <div class="parameter">
              <div><code>content</code><span>string · optional</span></div>
              <p>
                The note’s plain-text content. Maximum 10,000 characters in this sample contract.
              </p>
            </div>
            <div v-if="version === 'v2'" class="parameter">
              <div><code>metadata</code><span>object · optional · v2</span></div>
              <p>
                A small object for application context. Keys and limits should be specified in a
                real API.
              </p>
            </div>
          </section>
          <section id="response">
            <h2>Response fields</h2>
            <table>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>id</code></td>
                  <td>Unique note identifier</td>
                </tr>
                <tr>
                  <td><code>title</code></td>
                  <td>The supplied title</td>
                </tr>
                <tr>
                  <td><code>createdAt</code></td>
                  <td>Creation timestamp in UTC</td>
                </tr>
                <tr v-if="version === 'v2'">
                  <td><code>metadata</code></td>
                  <td>Supplied application context</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section id="errors">
            <h2>Errors &amp; responses</h2>
            <div class="error-response">
              <code>201</code>
              <p>Created. The response body contains the note.</p>
            </div>
            <div class="error-response">
              <code>400</code>
              <p>
                Invalid input. A real response should identify the field and a useful correction.
              </p>
            </div>
            <div class="error-response">
              <code>429</code>
              <p>Too many requests. Respect the service’s documented retry instructions.</p>
            </div>
          </section>
          <button class="text-link" @click="go('quickstart')">
            ← Try the quickstart
          </button></template
        >
        <div class="docs-page-footer">
          <span>Sample documentation · reviewed November 2026</span
          ><button
            @click="
              go(state === 'start' ? 'quickstart' : state === 'quickstart' ? 'reference' : 'start')
            "
          >
            {{
              state === 'start'
                ? 'Next: Quickstart →'
                : state === 'quickstart'
                  ? 'Next: API reference →'
                  : 'Back to overview →'
            }}
          </button>
        </div>
      </article>
      <aside class="on-this-page">
        <p>On this page</p>
        <template v-if="state === 'start'"
          ><a href="#overview">Overview</a><a href="#concepts">Core concepts</a
          ><a href="#versions">Versions</a></template
        ><template v-else-if="state === 'quickstart'"
          ><a href="#request">Send a request</a><a href="#response">Inspect the response</a
          ><a href="#next">Next steps</a></template
        ><template v-else
          ><a href="#parameters">Request body</a><a href="#response">Response fields</a
          ><a href="#errors">Errors &amp; responses</a></template
        >
      </aside>
    </main>
    <footer class="sample-footer">
      <span>Vector / Developer docs · Fictional design reference 74.</span
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

.docs-header {
  display: flex;
  align-items: center;
  gap: 35px;
  padding: 20px 35px;
  background: #fff;
  border-bottom: 1px solid #d8dfeb;
}
.docs-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 23px;
  letter-spacing: -0.04em;
  text-decoration: none;
  white-space: nowrap;
}
.docs-logo > span:first-child {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  background: #444f9d;
  color: #fff;
  border-radius: 7px;
  font-size: 20px;
}
.docs-logo > span:last-child {
  font-weight: 400;
  font-size: 14px;
  color: #687386;
  margin-left: 8px;
}
.docs-search {
  font-size: 0;
  max-width: 400px;
  flex: 1;
  margin-left: 70px;
}
.docs-search input {
  font-size: 12px;
  width: 100%;
  background: #f3f5f9;
  border-color: #d8dfeb;
  border-radius: 6px;
  min-height: 38px;
}
.docs-tools {
  display: flex;
  gap: 25px;
  align-items: center;
  margin-left: auto;
  font-size: 11px;
}
.docs-tools label {
  display: flex;
  gap: 8px;
  align-items: center;
}
.docs-tools select {
  font-size: 11px;
  min-height: 35px;
  padding: 6px 10px;
  border-radius: 5px;
}
.docs-menu {
  display: none;
}
.docs-layout {
  display: grid;
  grid-template-columns: 210px minmax(0, 750px) 155px;
  gap: 50px;
  max-width: 1400px;
  margin: auto;
  padding: 35px;
}
.docs-sidebar nav {
  display: grid;
  gap: 6px;
}
.docs-sidebar nav > p {
  font-size: 11px;
  font-weight: 600;
  margin: 25px 0 10px;
}
.docs-sidebar nav > p:first-child {
  margin-top: 0;
}
.docs-sidebar nav > button,
.docs-sidebar nav > a {
  text-align: left;
  background: transparent;
  border: 0;
  padding: 8px 12px;
  font-weight: 400;
  font-size: 12px;
  border-radius: 5px;
  text-decoration: none;
  min-height: 35px;
}
.docs-sidebar nav > button.active {
  background: #e8eaf8;
  color: #3d478e;
  font-weight: 600;
}
.version-note {
  border-top: 1px solid #d8dfeb;
  margin-top: 35px;
  padding-top: 20px;
  font-size: 11px;
  color: #5d697e;
}
.version-note > span {
  font-weight: 600;
}
.version-note p {
  margin-top: 10px;
}
.docs-breadcrumb {
  font-size: 10px;
  color: #657087;
  margin-bottom: 30px;
}
.docs-article > .eyebrow {
  font-size: 10px;
  color: #444f9d;
}
.docs-article h1 {
  font-size: 42px;
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 1.13;
  margin: 15px 0 25px;
}
.docs-lead {
  font-size: 17px;
  line-height: 1.7;
  color: #4e5b70;
}
.docs-article section {
  padding-top: 40px;
  scroll-margin-top: 20px;
}
.docs-article section > h2 {
  font-size: 25px;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin-bottom: 20px;
}
.docs-article p {
  font-size: 14px;
  line-height: 1.8;
}
.docs-callout {
  background: #eef0fa;
  border-left: 3px solid #5862ac;
  padding: 20px;
  margin: 30px 0 0;
  font-size: 13px;
}
.docs-callout p {
  font-size: 13px;
  margin-top: 8px;
}
.docs-entry-links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.docs-entry-links button {
  padding: 22px;
  text-align: left;
  border: 1px solid #cdd5e3;
  border-radius: 7px;
  background: white;
}
.docs-entry-links span {
  font-size: 9px;
  color: #59699c;
}
.docs-entry-links h3 {
  font-size: 19px;
  margin: 15px 0;
}
.docs-entry-links p {
  font-weight: 400;
  font-size: 12px;
}
.docs-entry-links b {
  font-size: 11px;
  display: block;
  margin-top: 20px;
  color: #444f9d;
}
.concept-list > div {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 25px;
  padding: 18px 0;
  border-bottom: 1px solid #d8dfeb;
}
.concept-list dt {
  font-size: 13px;
  font-weight: 600;
}
.concept-list dd {
  font-size: 13px;
  font-weight: 400;
}
.on-this-page {
  border-left: 1px solid #d8dfeb;
  padding-left: 20px;
  font-size: 11px;
  height: max-content;
}
.on-this-page p {
  font-weight: 600;
  margin-bottom: 20px;
}
.on-this-page a {
  display: block;
  margin: 15px 0;
  text-decoration: none;
  color: #5d697e;
}
.docs-page-footer {
  border-top: 1px solid #d8dfeb;
  margin-top: 45px;
  padding: 25px 0;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  font-size: 10px;
  color: #5d697e;
}
.docs-page-footer button {
  border: 0;
  background: transparent;
  color: #444f9d;
  padding: 0;
  font-size: 11px;
}
.docs-search-results {
  padding: 20px 35px;
  background: #e8eaf8;
  border-bottom: 1px solid #cdd5e3;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  font-size: 13px;
}
.docs-search-results button {
  font-size: 13px;
  background: white;
  border-radius: 5px;
}
.code-panel {
  border: 1px solid #cbd4e2;
  border-radius: 7px;
  margin-top: 20px;
  overflow: hidden;
}
.code-toolbar {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  background: #edf1f6;
  padding: 9px 13px;
  font-size: 10px;
}
.code-toolbar label {
  display: flex;
  gap: 9px;
  align-items: center;
}
.code-toolbar select,
.code-toolbar button {
  min-height: 30px;
  font-size: 10px;
  padding: 5px 8px;
  border-radius: 4px;
}
pre {
  max-width: 100%;
  overflow: auto;
  background: #263247;
  color: #eff3f9;
  padding: 23px;
  font:
    12px/1.8 'IBM Plex Mono',
    monospace;
  margin: 0;
  tab-size: 2;
}
code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.88em;
}
.response-code {
  margin: 20px 0;
  border-radius: 6px;
}
.copy-status {
  font-size: 10px !important;
  color: #5d697e;
  margin-top: 9px;
}
.docs-article .primary {
  font-size: 12px;
  border-radius: 5px;
}
.docs-article .text-link {
  font-size: 13px;
  color: #444f9d;
}
.endpoint {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 18px;
  border: 1px solid #ccd5e2;
  border-radius: 6px;
  margin-bottom: 25px;
  background: #f0f3f8;
}
.endpoint > b {
  font-size: 10px;
  border-radius: 4px;
  padding: 5px 8px;
  background: #d6e5d9;
  color: #285436;
}
.endpoint code {
  font-size: 14px;
}
.parameter {
  padding: 20px 0;
  border-bottom: 1px solid #d8dfeb;
}
.parameter > div {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 10px;
}
.parameter code {
  font-size: 14px;
  font-weight: 600;
}
.parameter span {
  font-size: 10px;
  color: #5d697e;
}
.parameter p {
  font-size: 13px;
}
.docs-article table {
  font-size: 13px;
}
.error-response {
  display: flex;
  gap: 20px;
  align-items: start;
  padding: 15px 0;
  border-bottom: 1px solid #d8dfeb;
}
.error-response code {
  background: #e6ebf4;
  padding: 4px 8px;
  font-size: 12px;
}
.error-response p {
  font-size: 13px;
}
.docs-article > section:last-of-type {
  margin-bottom: 25px;
}
@media (max-width: 1100px) {
  .docs-layout {
    grid-template-columns: 180px minmax(0, 1fr);
    gap: 35px;
  }
  .on-this-page {
    display: none;
  }
  .docs-search {
    margin-left: 20px;
  }
  .docs-tools > a {
    display: none;
  }
}
@media (max-width: 760px) {
  .docs-header {
    padding: 18px 20px;
    gap: 15px;
    flex-wrap: wrap;
  }
  .docs-logo {
    font-size: 20px;
  }
  .docs-tools {
    margin-left: auto;
  }
  .docs-search {
    order: 4;
    flex-basis: 100%;
    max-width: none;
    margin: 0;
  }
  .docs-menu {
    display: block;
    font-size: 11px;
    padding: 6px 10px;
    min-height: 35px;
    border-radius: 5px;
  }
  .docs-tools label {
    font-size: 0;
  }
  .docs-tools select {
    font-size: 11px;
  }
  .docs-layout {
    display: block;
    padding: 25px 22px;
  }
  .docs-sidebar {
    display: none;
  }
  .docs-sidebar.expanded {
    display: block;
    padding-bottom: 25px;
    margin-bottom: 25px;
    border-bottom: 1px solid #cbd4e2;
  }
  .docs-breadcrumb {
    font-size: 9px;
    margin-bottom: 25px;
  }
  .docs-article h1 {
    font-size: 32px;
  }
  .docs-entry-links {
    grid-template-columns: 1fr;
  }
  .concept-list > div {
    grid-template-columns: 80px 1fr;
    gap: 15px;
  }
  .docs-page-footer {
    display: grid;
    gap: 12px;
  }
  .docs-page-footer button {
    text-align: left;
  }
  .code-toolbar {
    gap: 10px;
    padding: 8px;
  }
  .code-toolbar label {
    font-size: 0;
    gap: 0;
  }
  pre {
    font-size: 10px;
    padding: 18px;
  }
  .parameter > div {
    flex-wrap: wrap;
    gap: 8px;
  }
  .docs-search-results {
    padding: 15px 22px;
  }
}

.eyebrow {
  font: 500 13px/1.5 var(--body);
  letter-spacing: 0;
  text-transform: none;
}
</style>
