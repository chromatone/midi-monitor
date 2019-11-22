export const midiMonitor = {
  template: `
  <div class="midi-monitor">
    <div v-for="(channel,ch) in channels" class="midi-channel">
      <div class="midi-notes channel-name">
        {{ch}}
      </div>
      <div @mousedown="playNote(note)" @mouseout="stopNote(note)" @mouseup="stopNote(note)" :style="{backgroundColor:getHsla(note.digit,note.velocity),order:127-note.number}"  v-for="(note, key) in channel.notes" class="midi-notes">
        {{key}}
      </div>
      <div :style="{order:256-cckey}"  v-for="(cc,cckey) in channel.cc" class="midi-cc">

        <div class="cc-bar" :style="{width: cc/127*100+'%'}">
            {{cckey}}
        </div>
      </div>
    </div>
  </div>
  `,
  props: ['channels'],
  data() {
    return {

    }
  },
  methods: {
    playNote(note) {
      note.velocity=0.75;
      this.$midiBus.$emit('noteouton',note)
    },
    stopNote(note) {
      note.velocity=0.0;
    this.$midiBus.$emit('noteoutoff',note)
    },
    getHsla(digit, velocity=0.8) {
      return 'hsla('+digit*30+','+velocity*100+'%,50%,1)'
    }
  }
}
