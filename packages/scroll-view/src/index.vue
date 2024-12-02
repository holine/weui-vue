<template>
  <div ref="scrollview" style="overflow-y: scroll; overflow-x: hidden;-webkit-overflow-scrolling: touch;"
    @scroll="$emit('scroll', $event)">
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    scrollTop: {
      type: Number,
      default: 0
    }
  },
  watch: {
    scrollTop(val) {
      this.$refs.scrollview.scrollTop = val;
    }
  }
}
</script>
<style scoped>
div::-webkit-scrollbar {
  display: none;
}
</style>