export default {
  methods: {
    triggerEvent(name, detail, options) {
      this.$emit(name, detail, options)
    }
  }
}