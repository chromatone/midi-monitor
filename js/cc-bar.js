import WebMidi from './webmidi.js'

export default {
  template: `
  <div class="cc-bar"
    @mousedown.prevent="activate"
    @mouseup="deactivate"
    @touchstart.prevent="activate"
    @touchend="deactivate"
    @touchmove="drag"
    @mousemove="drag"
  :style="{order:cckey+300}">
      {{cckey}} {{value}}
      <div class="value" :style="{width: cc/127*100+'%'}">

      </div>

  </div>
  `,
  props:['cc','cckey','channel'],
  data() {
    return {
      active:false,
      initial: {x:0, y:0},
      value:this.cc,
      diff: {x:0, y:0}
    }
  },
  watch: {
    cc(val) {
      this.value=val
    }
  },
  methods: {
    activate(ev) {
      this.active=true;
      this.initial.x = ev.pageX || ev.changedTouches[0].pageX;
      this.initial.y = ev.pageY || ev.changedTouches[0].pageY;
    },
    deactivate(ev) {
      this.active=false;
    },
    drag(ev) {
      if(this.active) {

        let x = ev.pageX || ev.changedTouches[0].pageX;
        let y = ev.pageY || ev.changedTouches[0].pageY;
        this.diff.x = x - this.initial.x;
        this.diff.y = this.initial.y - y;
        let change = this.diff.x + this.diff.y
        this.value = this.value + Math.round(this.diff.x/100);
        if (this.value>127) {
          this.value = 127;
          this.initial.x=x;
        }
        if (this.value<0) {
          this.value=0;
          this.initial.x=x;
        }
        this.$emit('input',this.value)
        WebMidi.outputs.forEach(output => {
          output.sendControlChange(Number(this.cckey),this.value,this.channel)
        })
      }

    }
  }
}
