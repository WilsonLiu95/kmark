// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import axios from 'axios'
import 'element-ui/lib/theme-default/index.css'
import ElementUI, { Message, Loading } from 'element-ui'

import routerConfig from './router'
import config from '../config'
import cookie from 'js-cookie'

Vue.config.productionTip = false

window.util = {
  cookie: cookie
}
var router = new VueRouter(routerConfig)
Vue.use(VueRouter)
Vue.use(ElementUI)

// ======================配置HTTP请求===============================
var loading
  // Add a request interceptor
axios.interceptors.request.use((config) => {
  if (!config.noLoading) {
    loading = Loading.service({
      fullscreen: true,
      text: '请求中...'
    })
  }
  // Do something before request is sent
  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor

axios.interceptors.response.use((response) => {
  // 关闭弹窗
  if (!response.config.noLoading) {
    loading.close()
  }
  if (response.data.msg) {
    Message({
      message: response.data.msg,
      duration: 1500,
      type: 'success'
    })
  }
  return response
}, (error) => {
  if (!error.response.config.noLoading) {
    loading.close()
  }
  var res = error.response
    // 弹出错误提示
  if (res.status === 422) {
    var message = ''
    for (var key in res.data) {
      message += res.data[key]
    }
  } else {
    message = res.data.msg
  }
  if (message) {
    Message({
      message: message,
      duration: 1500,
      type: 'error'
    })
  }

  if (res.status === 301) { // 前端控制跳转
    // 跳转提示
    if (res.data.url) {
      location.href = res.data.url
    } else {
      router.push(res.data.option)
    }
  } else if ([400, 422].indexOf(res.status) !== -1) { // 客户端请求错误，数据校验无问题
    // 前端的数据校验错误
  }
  return Promise.reject(error)
})
axios.defaults.baseURL = (process.env.NODE_ENV !== 'production' ? config.dev.httpUrl : config.build.httpUrl) // 同时根据不同环境引用不同的ajax请求前缀。
axios.defaults.withCredentials = true // 本地dev开发时，存在跨域。跨域请求时，将不带上cookie。需要设置这个参数为true才会带上cookie。坑了几天。
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// phpstorm断点调试 需要此参数
// axios.defaults.params = {
//   XDEBUG_SESSION_START: "PHPSTORM"
// }
window.util.$http = axios
  /* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App }
})