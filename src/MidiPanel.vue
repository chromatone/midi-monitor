<script setup>
import { useMidi, noteColor, useTempo, synthEnabled } from "use-chromatone";
import MidiFilterChannels from "./MidiFilterChannels.vue";

const tempo = useTempo()

const { midi, stopAll, midiAttack, midiRelease, outputs, available } = useMidi()

</script>

<template lang="pug">
.z-40.flex.flex-col.bg-light-400.dark-bg-dark-400.bg-op-60.dark-bg-op-40.backdrop-blur-lg
  .flex.flex-col.gap-2(v-if="!midi.enabled")
    .p-2.border.border-red-500.flex.flex-wrap.gap-2.w-full.op-60 MIDI is not available.
      a.font-normal.underline(href="https://caniuse.com/?search=midi" target="_blank") Use compatible browser
      span on desktop. 
      a.font-normal.underline(href="https://apps.apple.com/ru/app/web-midi-browser/id953846217" target="_blank") Use  Web MIDI Browser 
      span on iOS
      .font-normal.text-dark-200.dark-text-light-100 or just use your PC keyboard
    img(src="/pc-keyboard-3.svg")

  .flex.flex-col.gap-1.justify-center.flex-wrap(v-else)
    .flex.is-group
      .flex.m-2
        a.font-normal.p-2.border.border-green-500.text-green-500.select-none.rounded-lg(href="/practice/midi/monitor/") 
          span(v-if="available") MIDI 
          span(v-else) Plug in your MIDI device
      .flex
        .is-group.flex
          button.play.text-button(@click="midi.playing = !midi.playing")
            .i-la-play(v-if="!midi.playing")
            .i-la-pause(v-else)
          button.text-button.border(@click="stopAll()")
            .i-la-stop
        .text-button.items-center.flex.w-4em.transition-all.duration-50.cursor-pointer.flex(
          @mousedown="midiAttack(midi.note)"
          @mouseup="midiRelease(midi.note)"
          v-if="midi.note?._name"
          :style="{ borderColor: noteColor(midi.note.pitch, midi.note.octA), color: noteColor(midi.note.pitch, midi.note.octA) }"
          ) 
          .w-2em {{ midi.note._name }} 
          .flex-1 {{ midi.note._accidental }}
    .is-group.flex.flex-wrap
      button.text-button.border(v-for="output in outputs")  
        span {{ output.name }}
    .flex.flex-wrap.is-group
      button.flex-button.border.opacity-30(
        @click="midi.keyboard = !midi.keyboard" 
        aria-label="Play MIDI with PC keyboard"
        :class="{ active: midi.keyboard }"
        v-tooltip.bottom="'Play MIDI with PC keyboard'"
        )
        .i-tabler-keyboard
        .m-0 PC keyboard
      button.flex-button.opacity-30(
        @click="midi.out = !midi.out",
        :class="{ active: midi.out }"
        v-tooltip.bottom="'Output MIDI to external devices'"
        ) 
        .i-fad-midiplug
        .m-0 MIDI OUT
      button.flex-button.opacity-30(
        @click="tempo.midiClock = !tempo.midiClock",
        :class="{ active: tempo.midiClock }"
        v-tooltip.bottom="'Output MIDI CLOCK to external devices'"
        ) 
        .i-la-clock
        .m-0 CLOCK OUT
      button.flex-button.opacity-30(
        @click="tempo.tabSync = !tempo.tabSync",
        :class="{ active: tempo.tabSync }"
        v-tooltip.bottom="'Sync multiple tabs transpost'"
        ) 
        .i-la-sync
        .m-0 SYNC TABS
      button.flex-button.border.opacity-30(
        @click="synthEnabled = !synthEnabled" 
        :class="{ active: synthEnabled }"
        v-tooltip.bottom="'Play synth on MIDI input'"
        )
        .i-bi-volume-up(v-if="synthEnabled")
        .i-bi-volume-off(v-else)
        .m-0 MIDI Synth
      button.flex-button(
        v-tooltip.bottom="'Output MIDI channel'"
        )
        span OUT CH
        select.bg-transparent.text-xl.font-bold(v-model="midi.channel")
          option(v-for="n in 16" :key="n" :value="n") {{ n }}

      midi-filter-channels(style="flex: 1 1 100px")

    slot.is-group.mx-1.p-1
</template>

<style lang="postcss" scoped>
.layer {
  @apply rounded-xl;
  backdrop-filter: blur(30px);
}

input.ch {
  @apply pl-2 w-2.5em bg-transparent;
}

button {
  @apply p-2 m-2 border flex items-center rounded cursor-pointer select-none;
}

button.active {
  @apply opacity-100;
}
</style>
