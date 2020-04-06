export default {
  name: 'cc-bar',
  props:['cc','cckey','channel','disabled'],
  data() {
    return {
      active:false,
      initial: {x:0, y:0},
      value:0,
      diff: {x:0, y:0}
    }
  },
  template: `
  <div class="cc-bar"
    @mousedown.prevent="activateMouse"
    @touchstart.prevent="activateTouch"
    :style="{order:cckey+300}">

    <div class="cc-key">
      {{cckey}}
    </div>

    <div class="value" :style="{width: cc/127*100+'%'}">
    </div>

  </div>
  `,
  watch: {
    cc(val) {
      this.value=val
    }
  },
  methods: {
    dragHandler(e) {
      if (!this.active) return;

      let currentX, currentY;

      if (this.active == 'mouse') {
        currentX = e.pageX
        currentY = e.pageY
      } else {
        currentX = e.changedTouches[0].pageX;
        currentY = e.changedTouches[0].pageY;
      }

      let diff = currentX - this.initial.x;
      this.value += diff;
      this.initial.x = currentX;
      if (this.value>127) {
        this.value = 127;
      }
      if (this.value<0) {
        this.value=0;
      }
      this.$emit('input',this.value)

      if (diff) {
        WebMidi.outputs.forEach(output => {
          output.sendControlChange(
            Number(this.cckey),
            this.value,
            this.channel
          )
        })
      }
    },
    activateMouse(event) {
      this.initial.x = event.pageX
      this.initial.y = event.pageY
      this.active = 'mouse';
      document.addEventListener("mouseup", this.deactivateMouse);
      document.addEventListener("mousemove", this.dragHandler);
    },
    activateTouch(event) {
      this.initial.x = event.changedTouches[0].pageX;
      this.initial.y = event.changedTouches[0].pageY;
      this.active = 'touch';
      document.addEventListener("touchend", this.deactivateTouch);
      document.addEventListener("touchmove", this.dragHandler);
    },
    deactivateMouse() {
      document.removeEventListener("mousemove", this.dragHandler);
      document.removeEventListener("mouseup", this.deactivate);
      this.active = false;
    },
    deactivateTouch() {
      document.removeEventListener("touchmove", this.dragHandler);
      document.removeEventListener("touchend", this.deactivate);
      this.active = false;
    },
  },
}
