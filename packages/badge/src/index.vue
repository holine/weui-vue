<template>
  <div class="weui-badge" :class="[extClass, {
    'weui-badge_dot': !content
  }] | parseClassName" :aria-label="ariaLabel">{{ content }}
  </div>
</template>
<script>
export default {
  props: {
    extClass: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    ariaLabel: {
      type: String,
      default: ""
    }
  }
}
</script>