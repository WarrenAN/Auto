// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/CSS/global.css'

Vue.prototype.$http = axios
//配置请求的跟路径
axios.defaults.baseURL = '/api'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
