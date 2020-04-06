
Vue.prototype.$midiBus = new Vue(); // Global event bus

import midiBus from './components/midi-bus.js'
import midiMonitor from './components/midi-monitor.js'

const ct = new Vue({
  el:"#midi-monitor",
  components: {
    midiBus,
    midiMonitor
  },
  data: {
    channels:{},
    cc:12,
    ch:1,
    cckey:10
  }
})
