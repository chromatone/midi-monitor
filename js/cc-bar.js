export default {
  template: `
  <div class="cc-bar" :style="{width: cc/127*100+'%',order:cckey+300}">
        {{cckey}}
  </div>
  `,
  props:['cc','cckey']
}
