import Vue from 'vue'
import App from './App.vue'
import router from './router'
import elem from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import request from './request/index'

Vue.use(elem)
Vue.config.productionTip = false
Vue.prototype.$http = request

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
