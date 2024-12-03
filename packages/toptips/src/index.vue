<template>
  <root-portal :enable="rootPortal" v-if="wrapperShow">
    <div aria-role="alert" class="weui-toptips" :class="[{
      'weui-animate-fade-in': innerShow,
      'weui-animate-fade-out': !innerShow,
      [`weui-toptips_${type}`]: true
    }, extClass] | parseClassName">
      <slot>{{ msg }}</slot>
    </div>
  </root-portal>
</template>
<script>
import rootPortal from '../../root-portal'
export default {
  components: {
    rootPortal
  },
  props: {
    type: {
      type: String,
      default: "error",
    },
    show: {
      type: Boolean,
      default: !1,
    },
    msg: {
      type: String,
      default: ""
    },
    delay: {
      type: Number,
      default: 2e3
    },
    extClass: {
      type: String,
      default: ""
    },
    rootPortal: {
      type: Boolean,
      default: !0
    }
  },
  data() {
    return {
      wrapperShow: !1,
      innerShow: !1
    }
  },
  watch: {
    show: {
      handler(value) {
        value ? this.showToptips() : this.hideToptips()
      },
      immediate: !0
    }
  },
  methods: {
    showToptips() {
      if (this.delay) {
        setTimeout((() => {
          this.hideToptips()
          this.$emit('update:show', !1)
          this.triggerEvent("hide", {}, {})
        }), this.delay)
      }
      this.setData({
        wrapperShow: !0,
        innerShow: !0
      })
    },
    hideToptips() {
      if (this.innerShow) {
        this.setData({
          innerShow: !1
        })
        setTimeout((() => this.setData({
          wrapperShow: !1
        })), 300)
      }
    }
  }
}
</script>
<style scoped>
.weui-toptips {
  display: flex;
}

.weui-toptips_success {
  background-color: var(--weui-BRAND);
}

.weui-toptips_error {
  background-color: var(--weui-RED);
}

.weui-toptips_info {
  background-color: var(--weui-BLUE);
}
</style>