<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useSpecimen } from '../../shared/useSpecimen';
import './tokens.css';
const { state, go, href } = useSpecimen();

const categories = ['All discussions', 'Making & repair', 'Questions', 'Community news'];
const threads = [
  {
    title: 'A workbench that fits a small room',
    category: 'Making & repair',
    author: 'Mira',
    replies: 12,
    last: '14 minutes ago',
    tag: 'Project log',
    closed: false,
  },
  {
    title: 'Which finish for a well-used tabletop?',
    category: 'Questions',
    author: 'Theo',
    replies: 8,
    last: '1 hour ago',
    tag: 'Answered',
    closed: false,
  },
  {
    title: 'November workshop guidelines',
    category: 'Community news',
    author: 'Ari',
    replies: 3,
    last: 'Yesterday',
    tag: 'Pinned · closed',
    closed: true,
  },
];
const category = ref('All discussions'),
  query = ref(''),
  selected = ref(0),
  reply = ref(''),
  posted = ref<string[]>([]),
  liked = ref(false),
  report = ref(''),
  thread = computed(() => threads[selected.value]);
const filtered = computed(() =>
  threads.filter(
    (t) =>
      (category.value === 'All discussions' || t.category === category.value) &&
      (t.title + ' ' + t.tag).toLowerCase().includes(query.value.toLowerCase()),
  ),
);
function open(i: number) {
  selected.value = i;
  posted.value = [];
  report.value = '';
  go('thread');
}
function search() {
  if (state.value === 'start') return;
  history.replaceState({}, '', href('start'));
  state.value = 'start';
}
function addReply() {
  if (!reply.value.trim()) return;
  posted.value.push(reply.value.trim());
  reply.value = '';
}
</script>
<template>
  <div class="specimen">
    <a class="skip" href="#content">Skip to content</a>
    <header class="forum-header">
      <div class="forum-width row spread">
        <a :href="href('start')" class="forum-logo"
          ><span aria-hidden="true">≋</span> The Workbench</a
        ><label class="forum-search"
          >Search discussions<input
            v-model="query"
            @input="search"
            placeholder="A question, project, or topic" /></label
        ><button @click="go('profile')" class="member-button"><span>MC</span>Member profile</button>
      </div>
    </header>
    <main id="content" class="forum-width forum-layout">
      <aside class="category-rail">
        <p class="rail-label">Your community</p>
        <nav aria-label="Discussion categories">
          <button
            v-for="(c, i) in categories"
            :key="c"
            :class="{ active: category === c }"
            @click="
              category = c;
              go('start');
            "
          >
            <i :class="'category-dot dot-' + i"></i>{{ c }}<span>{{ i === 0 ? 3 : 1 }}</span>
          </button>
        </nav>
        <div class="community-note">
          <h2>A useful place<br />to ask and share.</h2>
          <p>Keep projects findable, replies considerate, and personal information private.</p>
          <button class="text-link" @click="open(2)">Read the guidelines →</button>
        </div>
        <p class="sample-context">
          Fictional community. Replies and reactions are local demonstrations.
        </p>
      </aside>
      <section class="discussion-content">
        <template v-if="state === 'start'"
          ><div class="forum-welcome">
            <p class="eyebrow">Make something. learn something.</p>
            <h1>Good conversations<br />leave something behind.</h1>
            <p>A community for the things we make, mend, and figure out together.</p>
          </div>
          <div class="thread-toolbar">
            <h2>{{ category }}</h2>
            <span role="status">{{ filtered.length }} discussions</span>
          </div>
          <article v-for="t in filtered" :key="t.title" class="thread-row">
            <div class="avatar" :class="'avatar-' + threads.indexOf(t)">
              {{ t.author.slice(0, 1) }}
            </div>
            <div>
              <button class="thread-title" @click="open(threads.indexOf(t))">{{ t.title }}</button>
              <p>
                <span class="thread-tag">{{ t.tag }}</span
                ><span>{{ t.category }}</span>
              </p>
              <small>{{ t.author }} · {{ t.last }}</small>
            </div>
            <div class="reply-count">
              <strong>{{ t.replies }}</strong
              ><span>replies</span>
            </div>
          </article>
          <p v-if="!filtered.length" class="notice">
            No discussions match. Try a broader search or another category.
          </p>
          <section class="community-digest">
            <h2>From the workshop</h2>
            <div class="two">
              <article>
                <span class="eyebrow">A good question</span>
                <h3>Show what you’ve tried.</h3>
                <p>
                  A photo, a constraint, and a clear question make a useful thread easier to answer.
                </p>
              </article>
              <article>
                <span class="eyebrow">A good reply</span>
                <h3>Leave context for the next person.</h3>
                <p>
                  Explain the reasoning, link the source, and mark what you’re still unsure about.
                </p>
              </article>
            </div>
          </section></template
        ><template v-else-if="state === 'thread'"
          ><button class="back text-link" @click="go('start')">← Discussions</button>
          <p class="eyebrow">{{ thread.category }} / {{ thread.tag }}</p>
          <h1 class="thread-heading">{{ thread.title }}</h1>
          <div v-if="thread.closed" class="closed-banner" role="status">
            This guideline thread is closed. Existing replies remain readable; new replies are
            disabled.
          </div>
          <article class="forum-post">
            <div class="post-meta">
              <button
                class="avatar avatar-0"
                @click="go('profile')"
                aria-label="View Mira’s sample profile"
              >
                M
              </button>
              <div>
                <b>{{ thread.author }}</b
                ><small>Original poster · 6 November 2026</small>
              </div>
              <span>#1</span>
            </div>
            <template v-if="thread.closed"
              ><p>
                Keep discussion useful and welcoming. Explain your context, credit other people’s
                work, and avoid posting private contact information.
              </p>
              <p>
                Moderation notices remain visible so readers can understand why a discussion
                changed.
              </p></template
            ><template v-else
              ><p>
                I’m working with a small space and trying to make a practical decision. I’d like to
                keep the setup simple enough to maintain and flexible enough to change.
              </p>
              <p>
                The current idea is a compact surface, storage underneath, and a clear place for the
                tools I use most. What would you consider before committing to the layout?
              </p></template
            >
            <div class="post-actions">
              <button :aria-pressed="liked" @click="liked = !liked">
                {{ liked ? 'Helpful ✓' : 'Helpful' }} · {{ liked ? 7 : 6 }}</button
              ><button
                @click="
                  report = 'Flag recorded locally for this sample. No moderation report was sent.'
                "
              >
                Flag for review
              </button>
            </div>
            <p v-if="report" role="status" class="moderation-note">{{ report }}</p>
          </article>
          <article class="forum-post reply-post">
            <div class="post-meta">
              <div class="avatar avatar-1">T</div>
              <div>
                <b>Theo</b><small>Replying to {{ thread.author }} · 40 minutes later</small>
              </div>
              <span>#2</span>
            </div>
            <blockquote>“Simple enough to maintain”</blockquote>
            <p>
              That feels like the useful constraint. I’d start by listing the things that need to
              stay within reach, then test a temporary arrangement before building the final
              version.
            </p>
            <div class="nested-reply">
              <div class="post-meta">
                <div class="avatar avatar-0">M</div>
                <b>{{ thread.author }}</b
                ><small>Reply to Theo</small>
              </div>
              <p>
                A temporary setup is a good next step. I’ll try that and add the measurements to
                this thread.
              </p>
            </div>
          </article>
          <details class="moderation-state">
            <summary>One reply removed by a moderator</summary>
            <p>
              The sample reply contained private contact information. The notice preserves the
              thread’s context without reproducing the removed content.
            </p>
          </details>
          <article v-for="(text, i) in posted" :key="i" class="forum-post new-reply">
            <div class="post-meta">
              <div class="avatar">JT</div>
              <b>You · local sample</b><small>Just now</small>
            </div>
            <p>{{ text }}</p>
          </article>
          <form class="reply-composer" @submit.prevent="addReply">
            <label for="forum-reply">{{
              thread.closed ? 'Replies are closed' : 'Add to the conversation'
            }}</label
            ><textarea
              id="forum-reply"
              v-model="reply"
              :disabled="thread.closed"
              required
              placeholder="A useful answer, a question, or a little more context…"
            ></textarea>
            <div class="row spread">
              <span>{{
                thread.closed ? 'This thread is read-only.' : 'Your reply stays on this page.'
              }}</span
              ><button class="primary" :disabled="thread.closed || !reply.trim()">
                Post sample reply
              </button>
            </div>
          </form></template
        ><template v-else
          ><button class="back text-link" @click="go('start')">← Community</button>
          <div class="profile-header">
            <div class="avatar large-avatar">M</div>
            <div>
              <p class="eyebrow">Member profile / fictional</p>
              <h1>Mira</h1>
              <p>Making small spaces work better.</p>
            </div>
          </div>
          <div class="profile-stats">
            <div><b>8</b><span>sample discussions</span></div>
            <div><b>42</b><span>sample replies</span></div>
            <div><b>2025</b><span>joined the sample</span></div>
          </div>
          <h2>Recent contributions</h2>
          <button class="profile-thread" @click="open(0)">
            <span>A workbench that fits a small room</span><small>Project log · 12 replies →</small>
          </button>
          <div class="notice">
            Profiles show public contributions and community context. Private contact details do not
            belong in this view.
          </div></template
        >
      </section>
      <aside class="forum-aside">
        <h2>Community rhythm</h2>
        <div>
          <span>Today’s sample</span><strong>3</strong>
          <p>active discussions</p>
        </div>
        <h3>Start here</h3>
        <button class="text-link" @click="open(2)">Guidelines &amp; moderation</button
        ><button class="text-link" @click="go('profile')">Meet a member</button>
        <p>Keep the thread useful for the person who finds it next month.</p>
      </aside>
    </main>
    <footer class="sample-footer">
      <span>The Workbench / Community · Fictional design reference 73.</span
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

.forum-width {
  max-width: 1400px;
  margin: auto;
  padding: 0 35px;
}
.forum-header {
  background: #fff;
  border-bottom: 1px solid #cad3df;
  padding: 18px 0;
}
.forum-logo {
  font-weight: 700;
  font-size: 22px;
  letter-spacing: -0.04em;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
}
.forum-logo > span {
  background: #385da0;
  color: white;
  border-radius: 8px;
  padding: 0 8px;
  font-size: 26px;
}
.forum-search {
  font-size: 0;
  flex: 1;
  max-width: 430px;
}
.forum-search input {
  font-size: 13px;
  width: 100%;
  border-radius: 7px;
  background: #f0f3f8;
}
.member-button {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 0;
  font-size: 12px;
}
.member-button > span {
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #d5dfef;
  width: 33px;
  height: 33px;
}
.forum-layout {
  display: grid;
  grid-template-columns: 210px minmax(0, 1fr) 170px;
  gap: 30px;
  padding-top: 35px;
  padding-bottom: 60px;
}
.category-rail {
  font-size: 13px;
}
.rail-label {
  font-size: 11px;
  color: #52627c;
  margin-bottom: 18px;
}
.category-rail nav {
  display: grid;
  gap: 6px;
}
.category-rail nav button {
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: left;
  border: 0;
  background: transparent;
  padding: 10px 9px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 5px;
}
.category-rail nav button.active {
  background: #dbe4f4;
  color: #294b83;
}
.category-rail nav button > span {
  margin-left: auto;
  font-size: 10px;
}
.category-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #53759d;
}
.dot-1 {
  background: #8a6f41;
}
.dot-2 {
  background: #4f846a;
}
.dot-3 {
  background: #885a86;
}
.community-note {
  margin-top: 35px;
  border-top: 1px solid #cad3df;
  padding-top: 25px;
}
.community-note h2 {
  font-size: 19px;
  font-weight: 600;
  letter-spacing: -0.02em;
}
.community-note p,
.community-note button {
  font-size: 12px;
  margin-top: 15px;
}
.sample-context {
  font-size: 10px;
  margin-top: 30px;
  color: #556477;
}
.forum-welcome {
  background: #e0e7f4;
  padding: 28px;
  border-radius: 8px;
}
.forum-welcome h1 {
  font-size: 32px;
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin: 15px 0;
}
.forum-welcome p:last-child {
  font-size: 13px;
}
.forum-welcome .eyebrow {
  font-size: 9px;
}
.thread-toolbar {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  padding: 30px 0 15px;
  border-bottom: 1px solid #b8c5d7;
}
.thread-toolbar h2 {
  font-size: 19px;
}
.thread-toolbar > span {
  font-size: 11px;
}
.thread-row {
  display: flex;
  align-items: start;
  gap: 15px;
  padding: 23px 0;
  border-bottom: 1px solid #cad3df;
}
.avatar {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  border-radius: 50%;
  background: #d6e2f4;
  color: #2f4d74;
  font-size: 12px;
  font-weight: 600;
  padding: 0;
  min-height: 36px;
  border: 0;
}
.avatar-0 {
  background: #dce7cc;
  color: #405532;
}
.avatar-1 {
  background: #eed8c6;
  color: #6d4830;
}
.avatar-2 {
  background: #e2d6e9;
  color: #594467;
}
.thread-row > div:nth-child(2) {
  flex: 1;
}
.thread-title {
  background: transparent;
  border: 0;
  padding: 0;
  text-align: left;
  font-size: 18px;
  line-height: 1.35;
  min-height: 28px;
}
.thread-row p {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  font-size: 10px;
  margin: 10px 0;
}
.thread-tag {
  padding: 2px 6px;
  border-radius: 4px;
  background: #e3e8ef;
  font-size: 10px;
}
.thread-row small {
  font-size: 10px;
  color: #556477;
}
.reply-count {
  text-align: center;
  min-width: 35px;
}
.reply-count strong {
  display: block;
  font-size: 17px;
}
.reply-count > span {
  font-size: 9px;
}
.community-digest {
  margin-top: 35px;
  background: #fff;
  border: 1px solid #cad3df;
  border-radius: 7px;
  padding: 25px;
}
.community-digest > h2 {
  font-size: 21px;
  margin-bottom: 25px;
}
.community-digest .eyebrow {
  font-size: 9px;
}
.community-digest h3 {
  font-size: 17px;
  margin: 12px 0;
}
.community-digest p {
  font-size: 12px;
}
.forum-aside {
  border-left: 1px solid #cad3df;
  padding-left: 25px;
  font-size: 12px;
}
.forum-aside h2 {
  font-size: 15px;
  line-height: 1.4;
}
.forum-aside > div {
  padding: 25px 0;
}
.forum-aside > div > span {
  font-size: 10px;
}
.forum-aside strong {
  display: block;
  font-size: 42px;
  font-weight: 500;
}
.forum-aside h3 {
  font-size: 14px;
  margin: 15px 0;
}
.forum-aside button {
  display: block;
  text-align: left;
  font-size: 11px;
  margin: 10px 0;
}
.forum-aside > p {
  margin-top: 25px;
  color: #556477;
}
.thread-heading {
  font-size: 33px;
  line-height: 1.2;
  letter-spacing: -0.025em;
  margin: 15px 0 25px;
}
.forum-post {
  background: white;
  border: 1px solid #cad3df;
  border-radius: 7px;
  padding: 25px;
  margin-bottom: 18px;
}
.post-meta {
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 12px;
  margin-bottom: 20px;
}
.post-meta small {
  display: block;
  font-size: 10px;
  font-weight: 400;
  color: #556477;
}
.post-meta > span:last-child {
  margin-left: auto;
  font-size: 10px;
}
.forum-post > p {
  font-size: 14px;
  line-height: 1.75;
}
.post-actions {
  display: flex;
  gap: 10px;
  margin-top: 22px;
}
.post-actions button {
  font-size: 11px;
  background: #f4f6fa;
  border: 1px solid #cad3df;
  border-radius: 5px;
  padding: 8px 10px;
  min-height: 35px;
}
.post-actions button[aria-pressed='true'] {
  outline: 0;
  background: #dbe7da;
}
.moderation-note {
  font-size: 12px !important;
  margin-top: 15px;
  padding: 12px;
  background: #edf1f6;
}
.forum-post blockquote {
  border-left: 3px solid #9bacc3;
  padding: 12px 15px;
  margin: 0 0 20px;
  background: #f0f3f8;
  font-size: 13px;
}
.nested-reply {
  border-left: 3px solid #b8c8df;
  margin: 25px 0 0 15px;
  padding: 20px 0 0 20px;
}
.nested-reply p {
  font-size: 13px;
}
.moderation-state {
  padding: 15px 20px;
  font-size: 12px;
  border: 1px dashed #a8b5c8;
  margin-bottom: 20px;
}
.reply-composer {
  border: 1px solid #b7c6da;
  background: white;
  padding: 23px;
  border-radius: 7px;
  margin-top: 25px;
}
.reply-composer > label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 13px;
}
.reply-composer textarea {
  width: 100%;
  height: 130px;
  resize: vertical;
  font-size: 14px;
  border-radius: 5px;
}
.reply-composer .row {
  margin-top: 15px;
}
.reply-composer span {
  font-size: 10px;
}
.reply-composer .primary {
  font-size: 12px;
  border-radius: 5px;
}
.closed-banner {
  background: #eee5c9;
  color: #5e512c;
  padding: 15px;
  font-size: 13px;
  margin-bottom: 20px;
}
.profile-header {
  display: flex;
  align-items: center;
  gap: 25px;
  margin-bottom: 30px;
}
.large-avatar {
  width: 90px;
  height: 90px;
  flex-basis: 90px;
  font-size: 35px;
  background: #dce7cc;
}
.profile-header h1 {
  font-size: 37px;
  margin: 12px 0;
}
.profile-header p {
  font-size: 14px;
}
.profile-stats {
  display: flex;
  gap: 30px;
  border-top: 1px solid #cad3df;
  border-bottom: 1px solid #cad3df;
  padding: 25px 0;
  margin-bottom: 35px;
}
.profile-stats b {
  display: block;
  font-size: 27px;
}
.profile-stats span {
  font-size: 11px;
}
.discussion-content > h2 {
  font-size: 24px;
}
.profile-thread {
  display: grid;
  gap: 10px;
  width: 100%;
  text-align: left;
  padding: 25px 0;
  border: 0;
  border-bottom: 1px solid #cad3df;
  background: transparent;
  margin-bottom: 25px;
}
.profile-thread small {
  font-size: 11px;
  font-weight: 400;
}
@media (max-width: 1100px) {
  .forum-layout {
    grid-template-columns: 190px minmax(0, 1fr);
  }
  .forum-aside {
    display: none;
  }
}
@media (max-width: 760px) {
  .forum-width {
    padding-left: 20px;
    padding-right: 20px;
  }
  .forum-header .row {
    gap: 15px;
  }
  .forum-logo {
    font-size: 20px;
  }
  .forum-search {
    order: 3;
    flex-basis: 100%;
    max-width: none;
  }
  .member-button {
    font-size: 0;
    padding: 0;
  }
  .member-button > span {
    font-size: 11px;
  }
  .forum-layout {
    grid-template-columns: 1fr;
    gap: 20px;
    padding-top: 20px;
  }
  .category-rail nav {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
  .category-rail nav button {
    font-size: 10px;
    min-height: 34px;
    padding: 7px;
  }
  .category-rail nav button > span,
  .rail-label,
  .community-note,
  .sample-context {
    display: none;
  }
  .forum-welcome {
    padding: 23px;
  }
  .forum-welcome h1 {
    font-size: 28px;
  }
  .thread-title {
    font-size: 17px;
  }
  .thread-row {
    gap: 11px;
  }
  .thread-row .avatar {
    width: 30px;
    height: 30px;
    flex-basis: 30px;
    min-height: 30px;
  }
  .thread-toolbar h2 {
    font-size: 17px;
  }
  .thread-toolbar > span {
    font-size: 10px;
  }
  .thread-heading {
    font-size: 29px;
  }
  .forum-post {
    padding: 20px;
  }
  .nested-reply {
    margin-left: 0;
    padding-left: 15px;
  }
  .post-meta {
    gap: 9px;
    flex-wrap: wrap;
  }
  .reply-composer {
    padding: 18px;
  }
  .profile-header {
    gap: 18px;
  }
  .large-avatar {
    width: 65px;
    height: 65px;
    flex-basis: 65px;
    font-size: 27px;
  }
  .profile-stats {
    gap: 20px;
  }
  .profile-stats span {
    font-size: 10px;
  }
}

.eyebrow {
  font: 500 13px/1.5 var(--body);
  letter-spacing: 0;
  text-transform: none;
}
</style>
