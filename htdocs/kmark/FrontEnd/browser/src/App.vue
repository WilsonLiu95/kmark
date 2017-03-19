<template>
  <div id="app">
    <el-menu default-active="index"
             class="el-menu-demo"
             mode="horizontal"
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
    <div class='main-body'>
      <el-breadcrumb class='breadcrumb'
                     separator="<">
        <el-breadcrumb-item class="iconfont icon-home breadcrumb-kmark"> Kmark</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.matched[0].meta}}</el-breadcrumb-item>
      </el-breadcrumb>
      <router-view class="main-content">
  
      </router-view>
    </div>
  
  </div>
</template>

<script>
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
  text-align: center;
  color: #2c3e50;
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
  width: 150px;
  height: 120px;
}

/*导航栏设置*/

.el-menu {
  height: 28px;
  background-color: #E6E6E6;
  padding: 38px 0 26px 0;
}

#app .el-menu-item {
  margin-top: -20px;
  font-size: 28px;
  float: right;
}

#app .menu-about  {
  margin-right: 100px;
}

/*主体部分*/

.main-body {
  margin: 66px 0 0 0;
  min-height: 500px;
}

.main-body .breadcrumb {
  background-color: #E3E2E2;
  height: 59px;
  font-size: 24px;
  border-radius: 10px;
  margin-bottom: 2px;
}

.main-body .breadcrumb span {
  margin-top: 16px;
}

.breadcrumb .breadcrumb-kmark {
  margin-left: 179px;
  font-size: 24px;
}
.el-menu--horizontal .el-menu-item:hover{
  background-color: #E6E6E6;
}
.main-content {
  height: 600px;
  min-height: 500px;
  background-color: #F4F4F4;
}
</style>
