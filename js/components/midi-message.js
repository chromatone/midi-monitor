export const inNote = {
  template:`
    <div v-if="note"
      class="status note selected"
      :style="{backgroundColor:color}"
      >{{note.channel+note.name+note.octave}}</div>
  `,
  props:['note'],
  computed: {
    color() {

      return 'hsla('+(this.note.number+3)%12*30+','+this.note.velocity*100+'%,50%,1)'
    }
  },
}

export const inCc = {
  template:`
  <div class="status cc" v-if="cc">
    <div class="cc-fill" :style="{width: cc.value/127*100+'%'}"></div>
    {{cc.channel}}CC{{cc.number}}
  </div>
  `,
  props:['cc']

}
