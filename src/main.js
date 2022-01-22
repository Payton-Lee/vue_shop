import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 導入字體圖標
import './assets/fonts/iconfont.css'
// 
import ZkTable from 'vue-table-with-tree-grid'
// 引入富文本框编辑器
import VueQuillEditor from 'vue-quill-editor'
// d导入富文本编辑器的样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

import axios from 'axios'
// 配置請求根路徑
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', ZkTable)
// 将富文本编辑器注册为全局可用的组件
Vue.use(VueQuillEditor)
Vue.filter('dateFormat', function(originVal){
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  // padStart：padStart() 方法用另一个字符串填充当前字符串(如果需要的话，会重复多次)，以便产生的字符串达到给定的长度。从当前字符串的左侧开始填充。
  // 语法：str.padStart(targetLength [, padString])
  // targetLength： 当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
  // padString 可选：填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的默认值为 " "（U+0020）。
  // 返回值：在原字符串开头填充指定的填充字符串直到目标长度所形成的新字符串。
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')