<script setup>

import MidiMonitor from './MidiMonitor.vue';
import MidiPanel from './MidiPanel.vue';

</script>

<template lang="pug">
.flex.flex-col.h-full
  MidiPanel.absolute.bottom-4.left-4.right-4.rounded-2xl.overflow-hidden
  MidiMonitor
</template>

<style lang="postcss">
#app {
  @apply h-100svh
}

html,
body {
  background-color: #777;
  width: 100%;
  min-width: 320px;
  min-height: 100vh;
  line-height: 1.3;
  font-family: "Commissioner", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-size: 1em;
  font-weight: 400;
  color: var(--c-text);
  direction: ltr;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overscroll-behavior: none;
  overflow: hidden;
}
</style>