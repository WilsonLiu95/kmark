import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'
import cookie from 'js-cookie'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import routes from './routes'
Vue.use(ElementUI)
Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.config.debug = true

window.util = {
  cookie: cookie
}
const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

axios.defaults.baseURL = (process.env.NODE_ENV !== 'production' ? 'http://dev.wilsonliu.cn:8000/kmark' : 'http://kmark.wilsonliu.cn/kmark/BackEnd/public/index.php/kmark/') // 同时根据不同环境引用不同的ajax请求前缀。
axios.defaults.withCredentials = true // 本地dev开发时，存在跨域。跨域请求时，将不带上cookie。需要设置这个参数为true才会带上cookie。坑了几天。
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

window.util.$http = axios
  /* eslint-disable no-new */
var a = new Vue({
  router,
  ...App
}).$mount('#app')