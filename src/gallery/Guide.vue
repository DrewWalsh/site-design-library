<script setup lang="ts">
import { repository } from './data';
</script>
<template>
  <main id="main" class="g-guide">
    <p class="g-kicker">A REFERENCE, NOT A RESTRICTION</p>
    <h1>Start with a direction.<br />Make it your own.</h1>
    <p class="g-guide-lead">
      This library gives you and your coding model something concrete to point to: a page, a set of
      principles, and the code behind them.
    </p>
    <section
      v-for="(step, i) in [
        {
          title: 'Choose for the task.',
          body: 'Start with what your visitor needs to do. A service, a publication, and an operations tool need different kinds of clarity. Search by industry, visitor goal, or the action you need people to take. Filter by site structure and interaction, then compare the visual directions.',
        },
        {
          title: 'Read it. Run it. Compare it.',
          body: 'Open the reference on desktop and phone. Read its defining features. Try the local interaction and compare a nearby direction to see which composition fits your content.',
        },
        {
          title: 'Take a useful prompt with you.',
          body: 'Use the reference prompt to point your coding model at the brief, tokens, screenshots, and source. Name the part of your project you want to change.',
        },
        {
          title: 'Adapt the principles.',
          body: 'Keep your real content, routes, and framework. Preserve what makes the reference distinctive. Begin with one representative page before extending it across your project.',
        },
      ]"
      :key="step.title"
    >
      <span>0{{ i + 1 }}</span>
      <div>
        <h2>{{ step.title }}</h2>
        <p>{{ step.body }}</p>
      </div>
    </section>
    <div class="g-guide-note">
      <h2>About the examples</h2>
      <p>
        These are fictional brands with sample content and local interactions. They are expansive
        design references, not production businesses. No bookings, messages, payments, or orders are
        sent.
      </p>
      <p>
        Each source package includes a written brief, role-based CSS tokens, a readable Vue
        component, licensed asset records, and captures tied to a source hash. Readiness means the
        reference package has been checked; it is not a formal accessibility certification.
      </p>
      <a :href="repository">Open the repository ↗</a
      ><a href="/catalogue.json" target="_blank">Machine-readable catalogue ↗</a>
    </div>
    <RouterLink class="g-button dark" to="/">Explore the collection →</RouterLink>
  </main>
</template>
