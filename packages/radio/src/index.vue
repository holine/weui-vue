<template>
  <div class="weui-cell weui-cell_active weui-check__label" style="display: inline-block;" @click="$emit('update:value', !value)">
    <input type="checkbox" class="weui-check" :checked="checked">
    <i class="weui-icon-checked" />
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    checked: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#09BB07'
    }
  }
}
</script>