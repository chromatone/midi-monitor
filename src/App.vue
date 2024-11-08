<script setup>

import { ref } from 'vue';
import MidiMonitor from './MidiMonitor.vue';
import MidiPanel from './MidiPanel.vue';
import MidiLog from './MidiLog.vue';

const panelOpen = ref(false)
const logOpen = ref(false)

</script>

<template lang="pug">
.flex.flex-col.h-full
  MidiPanel.absolute.bottom-4.left-4.right-4.rounded-2xl.overflow-hidden(v-show="panelOpen")
  MidiLog.z-100.max-h-90svh.absolute.bottom-4.left-4.right-4.rounded-2xl.overflow-hidden.bg-light-800.dark-bg-dark-500.bg-op-50.backdrop-blur(v-show="logOpen")
  button.op-50.hover-op-100.transition.z-100.fixed.bottom-4.left-4.p-4.bg-light-600.hover-bg-light-200.rounded-full.shadow-lg(@click="logOpen = !logOpen")
    .i-la-list(v-if="!logOpen")
    .i-la-times(v-else)
  button.op-50.hover-op-100.transition.z-100.fixed.bottom-4.right-4.p-4.bg-light-600.hover-bg-light-200.rounded-full.shadow-lg(@click="panelOpen = !panelOpen")
    .i-la-cog(v-if="!panelOpen")
    .i-la-times(v-else)
  MidiMonitor.flex-1.p-2
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