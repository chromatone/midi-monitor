import noteComp from './note-comp.js'
import ccBar from './cc-bar.js'

export default {
  components:{
    noteComp,
    ccBar
  },
  template: `
  <div class="midi-monitor">
    <div v-for="(channel,ch) in channels" class="midi-channel">
      <div class="midi-notes channel-name">
        {{ch}}
      </div>
      <note-comp @mousedown="noteOn(note)" v-for="(note, key) in channel.notes" :note="note" :key="key"></note-comp>
      <cc-bar v-for="(cc,cckey) in channel.cc" :key="cckey" class="midi-cc" :cc="cc" :cckey="cckey"></cc-bar>
    </div>
  </div>
  `,
  props: ['channels'],
  methods: {
    
  }
}
