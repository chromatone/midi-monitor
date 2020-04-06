export default {
  template: `
    <div @mousedown="play(note)"
          @mouseup="stop(note)"
          @mouseleave="stop(note,true)"
          @touchstart.prevent="play(note)"
          @touchend="stop(note)"
          @mousemove="change(note)"
          @touchmove="change(note)"
          :style="{backgroundColor:color,order:127-note.number}"   
          class="midi-notes">
      {{note.name}}{{note.octave}}({{note.number}})
    </div>
  `,
  props: ['note','active'],
  data() {
    return {
      pressed:false
    }
  },
  computed: {
    color() {
      return 'hsla('+this.note.digit*30+','+this.note.velocity*100+'%,50%,1)'
    }
  },
  methods: {
    play(note) {
      this.pressed=true;
      note.velocity=100;
      this.$emit('update:active', true)
      WebMidi.outputs.forEach(output => {
        output.playNote(note.nameOct,note.channel)
      })
    },
    stop(note,off) {
      if (this.pressed) {
        this.pressed=false;
        note.velocity=0;
        if (!off)  this.$emit('update:active', false)
        WebMidi.outputs.forEach(output => {
          output.stopNote(note.nameOct,note.channel)
        })
      }
    },
    change(note) {
      if(this.active && !this.pressed) {
        this.pressed=true;
        note.velocity=100;
        this.$emit('update:active', true)
        WebMidi.outputs.forEach(output => {
          output.playNote(note.nameOct,note.channel)
        })
      }
    }
  },
}
