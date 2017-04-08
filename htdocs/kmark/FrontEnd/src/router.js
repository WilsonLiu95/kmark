export default {
  routes: [
    {
      path: '/',
      meta: '首页',
      redirect: '/home'
    },
    {
      name: 'home',
      meta: '首页',
      path: '/home',
      component: resolve => {
        require.ensure([], (require) => {
          resolve(require('./views/home.vue'))
        })
      }
    },
    {
      name: 'static',
      meta: '统计',
      path: '/static',
      component: resolve => {
        require.ensure([], (require) => {
          resolve(require('./views/static.vue'))
        })
      }
    },
    {
      name: 'about',
      meta: '关于',
      path: '/about',
      component: resolve => {
        require.ensure([], (require) => {
          resolve(require('./views/about.vue'))
        })
      }
    },
    {
      path: '*',
      meta: '404',
      component: resolve => {
        require.ensure([], (require) => {
          resolve(require('./views/404.vue'))
        })
      }
    }
  ]
}