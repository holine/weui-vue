export default {
  methods: {
    setData(value) {
      Object.entries(value).map(([key, value]) => {
        this[key] = value
      })
    }
  }
}