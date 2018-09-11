import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/fonts/iconfont.css'
// 这个是全局css 放在最下面 其他css均放在它上面
import './assets/css/global.css'
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import treeTable from 'vue-table-with-tree-grid'

import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
Vue.use(ElementUI)

Vue.component('tree-table', treeTable)

Vue.config.productionTip = false
Vue.prototype.$http = axios

// 只要使用axios 发起了ajax请求 必然先调用 通过拦截器指定的回调函数
// 注册拦截器 一般在created 中只注册一次就可以了 以后只要发起请求就触发了
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 展示进度条
  NProgress.start()
  // 一定要return
  return config
})

axios.interceptors.response.use(config => {
  // 隐藏进度条
  NProgress.done()
  return config
})

axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
Vue.filter('dateFormat', function(original) {
  const date = new Date(original)
  const y = date.getFullYear()
  const m = (date.getMonth() + 1 + '').padStart(2, 0)
  const d = (date.getDate() + '').padStart(2, 0)
  const hh = (date.getHours() + '').padStart(2, 0)
  const mm = (date.getMinutes() + '').padStart(2, 0)
  const ss = (date.getSeconds() + '').padStart(2, 0)
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
