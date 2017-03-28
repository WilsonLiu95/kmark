// export default [
//   {
//     path: '/',
//     name: 'landing-page',
//     component: require('components/LandingPageView')
//   },
//   {
//     path: '*',
//     redirect: '/'
//   }
// ]
export default [
  // ========================================PC管理系统========================================
  { path: '/', redirect: '/home' },
  { name: 'home', meta: '首页', path: '/home', component: require('./views/home.vue') },
  { name: 'static', meta: '统计', path: '/static', component: require('./views/static.vue') },
  { name: 'about', meta: '关于', path: '/about', component: require('./views/about.vue') }
]
