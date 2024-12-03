<script>
import Vue from 'vue/dist/vue.esm.js';
const instances = {};
export default {
  template: '<slot />',
  props: {
    enable: {
      type: Boolean,
      default: true,
    },
  },
  beforeDestroy() {
    if (this.enable) {
      const instance = instances[this._uid];
      if (instance) {
        instance.$destroy();
        document.body.removeChild(instance.$el);
        delete instances[this._uid];
      }
    }
  },
  render(h) {
    if (this.enable) {
      const instance = instances[this._uid] || (index => {
        const Constructor = Vue.extend({
          template: `<div><slot /></div>`,
        })

        const instance = new Constructor({
          el: document.createElement('div'),
        })
        document.body.appendChild(instance.$el);
        instances[index] = instance
        return instance
      })(this._uid);
      instance.$slots.default = this.$slots.default;
      instance.$mount();

    } else {
      return h('div', this.$slots.default);
    }
  },
}
</script>