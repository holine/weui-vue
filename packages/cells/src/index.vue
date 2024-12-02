<template>
  <div class="weui-cells__group" :class="[extClass, outerClass, childClass] | parseClassName" :aria-role="ariaRole">
    <div v-if="title" class="weui-cells__title">{{ title }}</div>
    <div class="weui-cells weui-cells_after-title" :class="{
      'weui-cells_checkbox': checkboxCount > 0 && checkboxIsMulti
    }">
      <slot />
    </div>
    <div v-if="footer" class="weui-cells__tips">{{ footer }}</div>
    <slot name="footer" v-else />
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    extClass: {
      type: String,
      default: ""
    },
    footer: {
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
      firstItem: null,
      checkboxCount: 0,
      checkboxIsMulti: !1,
      outerClass: "",
      childClass: ""
    }
  },
  relations: {
    "../cell/cell": {
      type: "descendant",
      linked: function (t) {
        this.data.firstItem || (this.data.firstItem = t), t !== this.data.firstItem && t.setOuterClass("weui-cell_wxss")
      }
    },
    "../form-page/form-page": {
      type: "ancestor"
    },
    "../checkbox-group/checkbox-group": {
      type: "descendant",
      linked: function (t) {
        this.setData({
          checkboxCount: this.data.checkboxCount + 1,
          checkboxIsMulti: t.data.multi
        })
      },
      unlinked: function (t) {
        this.setData({
          checkboxCount: this.data.checkboxCount - 1,
          checkboxIsMulti: t.data.multi
        })
      }
    }
  },
  methods: {
    setCellMulti: function (t) {
      this.setData({
        checkboxIsMulti: t
      })
    },
    setCellsClass: function (t) {
      this.setData({
        childClass: t
      })
    },
    setOuterClass: function (t) {
      this.setData({
        outerClass: t
      })
    }
  }
}
</script>
<style scoped>
.weui-cells__group_wxss.weui-cells__group_wxss .weui-cells__title {
  margin-top: 24px;
}

.weui-cells__group_form .weui-cells__tips {
  margin-top: 8px;
  padding: 0 32px;
  color: var(--weui-FG-1);
}
</style>