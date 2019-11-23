export default {
  template: `
    <div @mousedown="playNote(note)" @mouseout="stopNote(note)" @mouseup="stopNote(note)" :style="{backgroundColor:color,order:127-note.number}"   class="midi-notes">
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
      note.velocity=0.75;
      this.$midiBus.$emit('noteouton',note)
    },
    stopNote(note) {
      note.velocity=0.1;
      this.$midiBus.$emit('noteoutoff',note)
    }
  },
}
