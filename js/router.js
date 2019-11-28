import WebMidi from "./webmidi.js"
import {inNote, inCc} from './midi-message.js'

export default {
  components:{
    inNote, inCc
  },
  template:`
  <div v-if="input && input!='APP'" class="bar second">
    <in-note :note="inNote"></in-note>
    <in-cc :cc="inCc"></in-cc>
    <div class="bar-text">OUT</div>
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
      inNote:null,
      inCc:null,
      inputs:WebMidi.inputs,
      outputs:WebMidi.outputs,
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

  },
  watch: {
    inputs(inputs) {
      this.buildLinks()
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

    buildLinks() {
      WebMidi.removeListener();
      this.inputs.forEach((input) => {
        input.on('noteon','all',(event) => {
          this.inNote = {
            channel: event.channel,
            name: event.note.name,
            octave: event.note.octave
          }
        })
        input.on('controlchange','all', (event) => {
          this.inCc={
            channel: event.channel,
            number:event.controller.number,
            value:event.value
          }
        })

        let link = this.links[input.id];
        if (link) {
          this.$set(link,'outputs', []);
          link.ids.forEach((outId) => {
            let output = WebMidi.getOutputById(outId);
            if (output) {
              link.outputs.push(output);
            }
          })

          input.on('midimessage','all', (event) => {
            if(event.data!=248) {
              link.outputs.forEach(output => {
                output._midiOutput.send(event.data,event.timestamp)
              })
            }

          })




        }
      });
    }
  }
}
