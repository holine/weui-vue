<template>
  <img :src="src" :style="{
    objectFit: mode
  }" />
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      default: ""
    },
    mode: {
      type: String,
      default: "scaleToFill"
    },
  }
}
</script>