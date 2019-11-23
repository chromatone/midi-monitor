
import {inNote, inCc} from './midi-message.js'

export default {
  components:{
    inNote, inCc
  },
  template:`
  <div v-if="input" class="bar second">
    <in-note :note="inNote"></in-note>
    <in-cc :cc="inCc"></in-cc>
    <div class="status">→</div>
    <div class="bar">
      <div :class="{selected:checkLink(input.id,output.id)}"
            v-for="output in outputs"
            v-if="input.name!=output.name"
            @click="toggleLink(input.id,output.id)"
            :key="output.id"
            class="status">
        {{output.name}}
      </div>
    </div>
  </div>
  `,
  props:['input'],
  data() {
    return {
      midiAccess:{},
      inNote:null,
      inCc:null,
      inputs:[],
      outputs:[],
      links: {
        '11055499': {
          ids:['64108181', '10003316']
        },
        '-2018769937': {
          ids: ['971782585']
        },
        '-127761031': {
          ids: ['971782585', '10003316']
        }
      }
    }
  },
  created() {
    navigator.requestMIDIAccess().then(this.onMIDISuccess, this.onMIDIFailure);
  },
  watch: {
    input() {
      this.inNote=null;
      this.inCc=null;
    }
  },
  methods: {
    checkLink(inId,outId) {
      let link = this.links[inId]
      if (link) {
        return link.ids.includes(outId)
      } else {
        return false
      }
    },
    toggleLink(inId,outId) {
      if (!this.links[inId]) {this.$set(this.links, inId ,{ids:[]})};
      let link = this.links[inId];
      if (!link.ids.includes(outId)) {
        link.ids.push(outId)
      } else {
        link.ids.splice(link.ids.indexOf(outId),1);
      }
      this.buildLinks();
    },
    getLinks(id) {
      return this.links.filter(link => link.input==this.device.id)
    },
    changeState(ev) {
      this.buildLinks()
    },
    buildLinks() {
      this.outputs={};
      this.midiAccess.outputs.forEach((output,id) => {
        this.outputs[id]=output;
      });

      this.midiAccess.inputs.forEach((input,id) => {
        let link = this.links[id];
        if (link) {
          this.$set(link,'outputs', []);
          link.ids.forEach((outId) => {
            let output = this.midiAccess.outputs.get(outId);
            if (output) {
              link.outputs.push(output);
            }
          })
          input.onmidimessage = (event) => {
            if (event.data!=248&&this.input&&event.target.id==this.input.id) {
              let message = event.data[0] & 0xf0;
          		let channel = (event.data[0] & 0x0f)+1;
              if (message==0x90) {
                this.inNote={
                  channel,
                  number:event.data[1]
                }
              } else if(message==0xB0) {
                this.inCc={
                  channel,
                  number:event.data[1],
                  value:event.data[2]
                }
              }
            }
            link.outputs.forEach(output => output.send(event.data, event.timestamp))
          }
        }
      });
    },
    onMIDISuccess(midiAccess) {
      this.midiAccess=midiAccess;
      this.buildLinks()
      midiAccess.onstatechange = this.changeState
    },
    onMIDIFailure(msg) {
      console.log( "Failed to get MIDI access - " + msg );
    }


  }
}
