import WebMidi from './webmidi.js'

export default {
  template: `
  <div class="cc-bar"
    @mousedown.prevent="activate"
    @touchstart.prevent="activate"
  :style="{order:cckey+300}">
    <div class="cc-key">
      {{cckey}}
    </div>
      <div class="value" :style="{width: cc/127*100+'%'}">

      </div>

  </div>
  `,
  props:['cc','cckey','channel','disabled'],
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
    activate(event) {
        this.initial.x = event.pageX || event.changedTouches[0].pageX;
        this.initial.y = event.pageY || event.changedTouches[0].pageY;
        this.active = true;
        document.addEventListener("mouseup", this.deactivate);
        document.addEventListener("touchend", this.deactivate);
        document.addEventListener("mousemove", this.dragHandler);
        document.addEventListener("touchmove", this.dragHandler);
      },
      dragHandler(e) {
        let xLocation = e.pageX || e.changedTouches[0].pageX;
        let yLocation = e.pageY || e.changedTouches[0].pageY;

        let diff = xLocation - this.initial.x;
        this.value += diff;
        this.initial.x=xLocation;
        if (this.value>127) {
          this.value = 127;
        }
        if (this.value<0) {
          this.value=0;
        }
        this.$emit('input',this.value)
        if (diff) {
          WebMidi.outputs.forEach(output => {
            output.sendControlChange(Number(this.cckey),this.value,this.channel)
          })
          console.log(diff)
        }

      },
      deactivate() {
        document.removeEventListener("mousemove", this.dragHandler);
        document.removeEventListener("mouseup", this.deactivate);
        document.removeEventListener("touchmove", this.dragHandler);
        document.removeEventListener("touchend", this.deactivate);
        this.active = false;
      },
  }
}
