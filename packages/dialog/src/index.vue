<template>
  <root-portal :enable="rootPortal" v-if="wrapperShow">
    <div class="weui-dialog" :class="[extClass, {
      'weui-animate-fade-in': innerShow,
      'weui-animate-fade-out': !innerShow
    },] | parseClassName" @click.stop="stopEvent">
      <div class="weui-dialog__hd">
        <div class="weui-dialog__title" tabindex="0">{{ title }}
          <slot name="title" />
        </div>
      </div>
      <div class="weui-dialog__bd">
        <slot />
      </div>
      <div class="weui-dialog__ft">
        <template v-if="buttons && buttons.length">
          <div v-for="(item, index) in Buttons" :key="index" class="weui-dialog__btn"
            :class="[item.className, item.extClass] | parseClassName" hover-class="weui-active" :data-index="index"
            @click="buttonTap" aria-role="button">{{ item.text }}
          </div>
        </template>
        <slot name="footer" v-else />
      </div>
    </div>
    <div v-if="mask" @click="close" class="weui-mask" :class="[maskClass, {
      'weui-animate-fade-in': innerShow,
      'weui-animate-fade-out': !innerShow
    },] | parseClassName" aria-role="button" aria-label="关闭" />
  </root-portal>
</template>
<script>
import rootPortal from "../../root-portal";
export default {
  components: {
    rootPortal
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    extClass: {
      type: String,
      default: ""
    },
    maskClosable: {
      type: Boolean,
      default: !0
    },
    mask: {
      type: Boolean,
      default: !0
    },
    show: {
      type: Boolean,
      default: !1,
    },
    buttons: {
      type: Array,
      default: []
    },
    rootPortal: {
      type: Boolean,
      default: !0
    },
    maskClass: {
      type: String,
      default: ""
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
      handler(t) {
        this.showChange(t)
      },
      immediate: !0
    },
  },
  computed: {
    Buttons() {
      return this.buttons.map((item, index) => ({
        ...item,
        className: 1 === this.buttons.length ? "weui-dialog__btn_primary" : 0 === index ? "weui-dialog__btn_default" : "weui-dialog__btn_primary"
      }))
    }
  },
  methods: {
    showChange(t) {
      var e = this;
      t ? this.setData({
        wrapperShow: !0,
        innerShow: !0
      }) : (this.setData({
        innerShow: !1
      }), setTimeout((function () {
        e.setData({
          wrapperShow: !1
        })
      }), 300))
    },
    buttonTap(t) {
      var e = t.currentTarget.dataset.index;
      this.triggerEvent("buttontap", {
        index: e,
        item: this.buttons[e]
      }, {})
    },
    close() {
      this.maskClosable && (this.$emit("update:show", !1), this.triggerEvent("close", {}, {}))
    },
    stopEvent() { }
  }
}

</script>

<style scoped>
.weui-dialog__root {
  position: relative;
  z-index: 1000;
}

.weui-dialog__title:focus {
  outline: none;
}

.weui-animate-fade-in {
  animation: weuiFadeIn ease 0.3s forwards;
}

@keyframes weuiFadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.weui-animate-fade-out {
  animation: weuiFadeOut ease 0.3s forwards;
}

@keyframes weuiFadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>