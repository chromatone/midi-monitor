<script setup>
import { ref, computed } from 'vue';
import { Chord, Midi } from 'tonal';

import MidiMonitorCc from './MidiMonitorCc.vue';
import MidiMonitorNote from './MidiMonitorNote.vue';


import { useMidi, sortNotes } from 'use-chromatone'


const active = ref(false)

const { midi, midiAttack, midiRelease, setCC, channels } = useMidi();

const chords = computed(() => {
  const chords = {}
  for (let channel in channels) {
    const list = Object.keys(channels[channel].activeNotes).map(n => Midi.midiToNoteName(n || 0, { sharps: true }))
    chords[channel] = list.length > 2 ? Chord.detect(list) : []
  }

  return chords
})

</script>

<template lang="pug">
.fullscreen-container.w-full.h-full.flex.flex-col(@mouseleave="active = false") 
  .flex.w-full.flex-1
    .flex.flex-col.flex-1.text-center.relative(
      v-for="(ch, chNum) in channels", 
      :key="ch.num")
      .header.absolute.w-full.text-center {{ chords[chNum]?.[0] || Object.keys(ch.activeNotes).map(n => Midi.midiToNoteName(n, { sharps: true })).join(' ') || ch.num }}
      .p-6 
      MidiMonitorNote(
        v-for="note in sortNotes(ch.notes)", 
        :key="note.number"
        v-model:active="active"
        :note="note"
        @play="midiAttack(note)"
        @stop="midiRelease(note)"
        )
  .flex.w-full
    .flex.flex-col.flex-1.text-center(
      v-for="ch in channels", 
      :key="ch.num") 
      MidiMonitorCc(
        v-for="cc in ch.cc"
        :key="cc"
        :cc="cc"
        @update="setCC(cc, $event)"
        )

</template>

<style lang="postcss" scoped>
.header {
  @apply p-2 m-1px font-bold bg-gray-500 bg-opacity-50;
}
</style>