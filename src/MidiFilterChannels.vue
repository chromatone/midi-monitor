<script setup>
import { midi, midiRelease } from 'use-chromatone'

function filterAll() {
  let state = midi.filter[1]

  for (let i = 1; i <= 16; i++) {
    midi.filter[i] = !state
  }
  if (state) midiRelease()
}

</script>

<template lang="pug">
.flex.is-group.p-2.items-center.flex-wrap.justify-between
  .flex.flex-col.gap-1
    .font-bold.mr-2 Channel filter
    .channel.filtered.flex.items-center.justify-center(
      @click="filterAll()"
      ) TOGGLE ALL


  .grid.grid-cols-8
    .channel(
      v-for="ch in 16" :key="ch"
      :class="{ filtered: !midi.filter[ch], active: midi.note.channel == ch }"
      @click="midi.filter[ch] = !midi.filter[ch]"
    ) {{ ch }}


</template>

<style lang="postcss" scoped>
.channel {
  @apply transition-all duration-100 select-none px-2px py-5px m-2px min-w-22px text-0.75rem text-center cursor-pointer border-1 rounded-lg line-through;
  flex: 1 1 10%;
}

.channel.filtered {
  @apply bg-light-900 dark-bg-dark-100 no-underline;
}

.channel.active {
  @apply border-current filter dark-brightness-300;
}
</style>