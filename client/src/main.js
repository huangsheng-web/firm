import Vue from 'vue'
import App from './App.vue'
import router from './rouer/index.js'
import Element from 'element-ui'
import axios from 'axios'
axios.withCredentials = true;
Vue.prototype.axios = axios;
import 'element-ui/lib/theme-chalk/index.css'; // 2.0

Vue.use(Element)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
