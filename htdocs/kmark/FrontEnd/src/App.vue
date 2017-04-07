<template>
  <div id="app">
    <el-menu default-active="index"
             mode="horizontal"
             class="nav-menu"
             :router="true"
             @select="handleSelect">
      <li class='kmark-logo-wrapper'>
        <img :src="kmark"
             class="kmark-logo"
             alt="kmark-logo">
      </li>
  
      <el-menu-item index="about"
                    class="menu-about iconfont icon-about">
        关于</el-menu-item>
      <el-menu-item index="static"
                    class="menu-static iconfont icon-static">统计</el-menu-item>
  
      <el-menu-item index="home"
                    class="menu-index iconfont icon-home">首页</el-menu-item>
    </el-menu>
  
    <el-card class="box-card main-body">
      <div slot="header"
           class="clearfix breadcrumb-header">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item class="iconfont icon-home breadcrumb-kmark">Kmark</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.matched[0]? $route.matched[0].meta: ''}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <router-view class="main-content">
  
      </router-view>
    </el-card>
  
  </div>
</template>

<script>
import Vue from 'vue'
import { Card, Menu, MenuItem, Breadcrumb, BreadcrumbItem } from 'element-ui'
Vue.use(Menu)
Vue.use(Card)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(MenuItem)
export default {
  name: 'app',
  data() {
    return {
      kmark: require('assets/kmark.png')
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}


/*面包屑的背景色*/

.main-body>.el-card__header {
  background-color: #E3E2E2;
}

.nav-menu .el-menu-item.is-active {
  color: #D7000E;
}


/*红色当前页*/

#app .el-breadcrumb__item:last-child span {
  color: #CF1F16;
}
</style>
<style scoped>
@import 'assets/fonts/iconfont.css';




/*logo设置*/

.kmark-logo-wrapper {
  float: left;
}

.kmark-logo {
  margin: -10px 0 0 156px;
  width: 130px;
  height: 100px;
}





/*导航栏设置*/

.el-menu {
  height: 28px;
  background-color: #E6E6E6;
  padding: 28px 0 16px 0;
}

#app .el-menu-item {
  margin-top: -20px;
  font-size: 18px;
  float: right;
}





/*menu hover后的颜色*/

.el-menu--horizontal .el-menu-item:hover {
  background-color: #E6E6E6;
  color: #CF1F16;
}

#app .menu-about {
  margin-right: 100px;
}





/* 面包屑 */

.main-body .breadcrumb-header span {
  font-size: 20px;
}

.breadcrumb-header .breadcrumb-kmark {
  margin-left: 179px;
}



/*主体部分*/

.main-body {
  margin: 66px 0 0 0;
}

.main-content {
  min-height: 600px;
  background-color: #F4F4F4;
}
</style>
