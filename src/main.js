import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/fonts/iconfont.css'
// 这个是全局css 放在最下面 其他css均放在它上面
import './assets/css/global.css'
import axios from 'axios'
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
Vue.filter('dateFormat', function(original) {
  const date = new Date(original)
  const y = date.getFullYear()
  const m = (date.getMonth + 1 + '').padStart(2, 0)
  const d = (date.getDate() + '').padStart(2, 0)
  return `${y}-${m}-${d}`
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
