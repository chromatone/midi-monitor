import WebMidi from "./webmidi.js"



export default {
  template: `
    <div
      @mousedown.stop.prevent= "playNote(note"
      @mouseup.stop.prevent= "stopNote(note)"
      @mouseout.stop.prevent= "stopNote(note)"
      @touchstart.stop.prevent="playNote(note"
      @touchend.stop.prevent="stopNote(note)"
      @touchcancel.stop.prevent="stopNote(note)"
       :style="{backgroundColor:color,order:127-note.number}"   class="midi-notes">
      {{note.name}}{{note.octave}}
    </div>
  `,
  props: ['note'],
  computed: {
    color() {
      return 'hsla('+this.note.digit*30+','+this.note.velocity*100+'%,50%,1)'
    }
  },
  methods: {
    playNote(note) {
      note.velocity=0.75
      WebMidi.outputs.forEach(output => {
        output.playNote(note.nameOct,note.channel)
      })
    },
    stopNote(note) {
      note.velocity=0
      WebMidi.outputs.forEach(output => {
        output.stopNote(note.nameOct,note.channel)
      })
    }
  },
}
