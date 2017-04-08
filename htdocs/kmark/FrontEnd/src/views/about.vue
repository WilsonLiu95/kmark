<template>
  <div class="about-page">
    <el-card class='card-section'>
      <div slot="header"
           style="text-align:center;font-size:22px"
           class="clearfix">
        <span style="line-height: 36px;">产品介绍</span>
      </div>
  
      <el-row>
        <el-col :span="12"
                :offset="1">
          <p>使用kindle的过程中，我们常常会看到一些好的句子。总想把他们收集起来，以后时常回顾。</p>
          <p>我也曾一条条的复制粘贴复制粘贴。直到，我开始coding，我开始思考我的技术可以做些什么有意思的事情。</p>
          <p>于是，kmark应运而生，这是我的第一个产品。第一版花了3-4天就草草结束了。</p>
          <p>本以为无人问津的一个小工具，但是知乎上的朋友的称赞，让我感受到了强烈的成就感。</p>
          <p>因此，我就想进行这次改版，给大家更好的体验。</p>
          <p>于是，我找了个设计师朋友，帮我设计了页面。(很不幸，我还是选择性的偷懒，页面并没有完全按照设计稿啦。羞愧)</p>
          <p>这一次，将会持续进行迭代，改版，也希望您能够提出更多好的意见。</p>
          <p>欢迎加入我们的 <a href="https://jq.qq.com/?_wv=1027&k=46gDuzG">Kmark 用户群:614462732</a>，给我更多的建议。</p>
        </el-col>
        <el-col :span="8"
                :offset="2">
          <el-card>
            <div>
              <img :src="assets.wilsonliu">
              <span>开发:WilsonLiu95</span>
            </div>
            <div>
              <img :src="assets.xinyao"
                   width="200px"
                   height="200px">
              <span>致谢设计师 | 王欣瑶</span>
            </div>
          </el-card>
        </el-col>
  
      </el-row>
  
    </el-card>
  
  </div>
</template>

<script>
import wilsonliu from 'assets/WilsonLiu95.jpeg'
import Vue from 'vue'
import { Row, Col } from 'element-ui'
Vue.use(Row)
Vue.use(Col)
export default {
  name: 'about',
  data() {
    return {
      assets: {
        wilsonliu: wilsonliu,
        xinyao: require('assets/xinyao.jpeg')
      }
    }
  },
  methods: {

  }
}

</script>

<style scoped>

</style>
