<script setup lang="ts">
import { repository } from './data';
</script>
<template>
  <a class="g-skip" href="#main">Skip to content</a>
  <header class="g-header">
    <RouterLink to="/" class="g-brand"
      ><span class="g-mark"><i></i><i></i><i></i></span>Design Library<span class="g-edition"
        >VOL. 01</span
      ></RouterLink
    >
    <nav aria-label="Library">
      <RouterLink to="/">Collection</RouterLink><RouterLink to="/guide">How to use</RouterLink
      ><a :href="repository" target="_blank" rel="noopener">Repository ↗</a>
    </nav>
  </header>
  <RouterView />
  <footer class="g-footer">
    <span>Design Library <b>·</b> A collection of possibilities.</span
    ><span>50 directions. One useful starting point.</span><a :href="repository">View source ↗</a>
  </footer>
</template>
