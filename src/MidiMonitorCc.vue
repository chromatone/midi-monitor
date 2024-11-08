<script setup>
import { useGesture } from '@vueuse/gesture';
import { ref } from 'vue';

const props = defineProps({
  cc: { type: Object, default: () => { } }
});

const emit = defineEmits(['update'])

const bar = ref()

let prev = 0

function drag({ movement: [x], dragging }) {
  let diff = x / 2 - prev
  prev = x / 2
  if (!dragging) prev = 0
  let val = Math.round(props.cc.raw + diff)
  if (val > 127) val = 127
  if (val < 0) val = 0
  emit('update', val)
}

useGesture({
  onDrag(ev) {
    ev?.event?.preventDefault()
    drag(ev)
  },
  onWheel(ev) {
    ev?.event?.preventDefault()
    drag(ev)
  }
}, {
  domTarget: bar,
  eventOptions: { passive: false }
})
</script>

<template lang="pug">
.cc(
  ref="bar"
  )
  .px-1.text-center.flex-1 {{ cc?.number }}
  .absolute.h-full.z-10.bg-dark-500.top-0.bg-opacity-40.self-start(
    :style="{ width: cc?.value * 100 + '%' }"
  )
</template>

<style lang="postcss" scoped>
.cc {
  @apply relative flex-1 flex items-center m-1px transition-all duration-200 cursor-pointer select-none;
}
</style>