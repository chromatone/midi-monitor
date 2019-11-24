export const inNote = {
  template:`
    <div v-if="note" class="status note">{{note.channel+note.name+note.octave}}</div>
  `,
  props:['note'],
  computed: {

  }

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
