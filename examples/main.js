import Vue from 'vue'
import App from './App.vue'
import 'weui'
import Weui from '../packages/index'
Vue.use(Weui)
Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
