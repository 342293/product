import Vue from 'vue'
import App from './App.vue'
import router from './router'
import elem from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from "axios";

Vue.use(axios)
Vue.use(elem)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
