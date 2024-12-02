export default {
  filters: {
    parseClassName(value) {
      return Array.isArray(value) ? value : [value].map(item => typeof (item) === 'string' ? item.replaceAll(/\s+/g, ' ').trim().split(' ').reduce((acc, cur) => ({
        ...acc,
        [cur]: true
      }), {}) : item).reduce((acc, cur) => ({ ...acc, ...cur }), {})
    }
  }
}