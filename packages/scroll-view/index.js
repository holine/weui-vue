import component from './src'
import parseClassname from '../utils/mixins/filters/parseClassName'
import setData from '../utils/mixins/methods/setData'
import triggerEvent from '../utils/mixins/methods/triggerEvent'
component.mixins = (component.mixins || []).concat([parseClassname, setData, triggerEvent])
component.name = 'WeuiScrollView'
component.install = function (Vue) {
  Vue.component(component.name, component)
}
export default component