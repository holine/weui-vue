<template>
  <div ref="self" class="weui-vtabs-content__item" :id="`weui-vtabs-content__${tabIndex}`">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    tabIndex: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.$parent.$parent.linked(this.tabIndex, this.$refs.self.getBoundingClientRect().height);
  },
  beforeDestroy() {
    this.$parent.$parent.unlinked(this.tabIndex);
  }
}
</script>
<style scoped>
.weui-tabs-content__item {
  width: 100%;
  height: 100%
}
</style>