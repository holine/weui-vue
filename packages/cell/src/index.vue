<template>
  <div @click="navigateTo" class="weui-cell" :class="[extClass, outerClass, {
    'weui-cell_access': link,
    'weui-cell-inform': inForm,
    'weui-cell_label-block': !inline,
  }] | parseClassName" :hover-class="hover ? 'weui-hover-active' : extHoverClass" :aria-role="ariaRole">
    <div v-if="hasHeader" class="weui-cell__hd" :class="iconClass | parseClassName">
      <template v-if="icon">
        <weui-image :src="icon" class="weui-cell__icon" mode="aspectFit" />
      </template>
      <template v-else>
        <slot name="icon" />
      </template>
      <template v-if="inForm">
        <template v-if="title">
          <div class="weui-label">{{ title }}</div>
        </template>
        <template v-else>
          <slot name="title" />
        </template>
      </template>
      <template v-else>
        <template v-if="title">{{ title }}</template>
        <template v-else>
          <slot name="title" />
        </template>
      </template>
    </div>
    <div v-if="hasBody" class="weui-cell__bd">
      <template v-if="value">{{ value }}</template>
      <template v-else>
        <slot />
      </template>
    </div>
    <div v-if="hasFooter" class="weui-cell__ft weui-cell__ft_in-access" :class="footerClass | parseClassName">
      <template v-if="footer">{{ footer }}</template>
      <template v-else>
        <slot name="footer" />
      </template>
      <weui-icon v-if="showError && error" type="warn" size="23" color="#E64340" />
    </div>
  </div>

</template>

<script>
import WeuiIcon from "../../icon";
import WeuiImage from "../../image";

export default {
  components: {
    WeuiIcon, WeuiImage
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    hover: {
      type: Boolean,
      default: !1
    },
    link: {
      type: Boolean,
      default: !1
    },
    extClass: {
      type: String,
      default: ""
    },
    iconClass: {
      type: String,
      default: ""
    },
    bodyClass: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    default: {
      type: String,
      default: ""
    },
    showError: {
      type: Boolean,
      default: !1
    },
    prop: {
      type: String,
      default: ""
    },
    url: {
      type: String,
      default: ""
    },
    footerClass: {
      type: String,
      default: ""
    },
    footer: {
      type: String,
      default: ""
    },
    inline: {
      type: Boolean,
      default: !0
    },
    hasHeader: {
      type: Boolean,
      default: !0
    },
    hasFooter: {
      type: Boolean,
      default: !0
    },
    hasBody: {
      type: Boolean,
      default: !0
    },
    extHoverClass: {
      type: String,
      default: ""
    },
    ariaRole: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      inForm: !1,
      outerClass: '',
    }
  },
  methods: {
    setError: function (e) {
      this.setData({
        error: e || !1
      })
    },
    setInForm: function () {
      this.setData({
        inForm: !0
      })
    },
    setOuterClass: function (e) {
      this.setData({
        outerClass: e
      })
    },
    navigateTo(event) {
      this.$emit('click', event)
      if (this.url && this.link) {
        this.$router.push(this.url).then(() => {
          this.triggerEvent("navigatesuccess", {}, {})
        }).catch(e => {
          this.triggerEvent("navigateerror", e, {})
        })
      }
    }
  }
}
</script>
<style scoped>
.weui-cell_wxss.weui-cell_wxss::before {
  display: flex;
}

.weui-cell_access .weui-cell__ft::after {
  background-color: var(--weui-FG-2);
}
</style>