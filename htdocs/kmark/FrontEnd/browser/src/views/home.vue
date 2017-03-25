<template>
  <el-card class="home-page box-card">
    <el-row :gutter="24">
      <el-col :span="5">
        <el-card class="left-nav box-card">
          <el-input placeholder="请输入"
                    class="search"
                    icon="search"
                    v-model="search"
                    :on-icon-click="handleSearch">
          </el-input>
          <!--书籍列表-->
          <el-button-group class='book-btn-group'>
  
            <el-button v-for="(book, key) in showBookObj"
                       @click="changeBook(key)"
                       type='text'
                       :key='key'
                       :class='["book-item-btn",currentBook == key?"focus-book" : ""]'
                       :label="key">{{key}}</el-button>
          </el-button-group>
        </el-card>
      </el-col>
      <el-col :span="19">
        <el-card class="home-body box-card">
          <div slot="header"
               style="height:22px;font-size:18px;text-align:center;"
               class="clearfix box-card-header">
            <span style="float:left">
                            <a style="text-decoration:none;color:#000" href="https://jq.qq.com/?_wv=1027&amp;k=45bhlfa">Kmark</a>
                          </span>
            <span v-if="currentBook"
                  style="font-size:20px;">{{currentBook}}</span>
            <span v-if="showBookObj[currentBook]"
                  style="font-size:12px;">{{showBookObj[currentBook]["0"].author}}</span>
            <el-tooltip content="一键复制标记内容"
                        placement="top">
              <el-button class="clipboard-btn el-icon-document"
                         type="danger"
                         size="large"
                         data-clipboard-target=".book-frag-list">复制</el-button>
  
            </el-tooltip>
          </div>
  
          <el-upload drag
                     v-if="!notes.length"
                     class="upload-file"
                     :action="prefix+ 'home/upload'"
                     :headers="{'X-XSRF-TOKEN':token}"
                     name='mycliping'
                     :before-upload="init"
                     accept='.txt'>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              <span>请将本地 Mycliping.txt 拖到此处，或<em>点击上传</em></span>
              <!--<br>-->
              <span style="display:block;margin-top:50px">注:请将Kindle通过USB线与电脑相连，在kindle中找到 Mycliping.txt 文件</span>
            </div>
          </el-upload>
  
          <div class="book-frag-list">
            <ul v-if="showBookObj[currentBook]">
              <li v-for='(mark, index) in showBookObj[currentBook]'>
                {{mark.content}}
              </li>
            </ul>
  
          </div>
        </el-card>
  
      </el-col>
  
    </el-row>
  </el-card>
</template>

<script>
import Clipboard from 'clipboard'
export default {
  name: 'home',
  data() {
    return {
      token: window.util.cookie.get('XSRF-TOKEN'),
      prefix: '', // 请求前缀
      currentBook: '', // 当前是哪本书
      search: '',
      notes: [] // 所有标记
    }
  },
  created() {
    this.prefix = this.$http.defaults.baseURL
    this.$http.get('home/test')
    this.clipboard()
  },
  computed: {
    afterSearch() {
      if (this.search === '') {
        return this.notes // 如果没有搜索，则直接返回
      }
      var cache = []
      this.notes.forEach((item, index) => { // 根据搜索的关键词进行遍历
        JSON.stringify(item).indexOf(this.search) === -1 ? null : cache.push(item)
      })
      return cache
    },
    showBookObj() {
      var cache = {}
      this.afterSearch.forEach((item, index) => {
        if (index === 0) {
          this.currentBook = item.title
        }
        if (!cache[item.title]) {
          cache[item.title] = [] // 初始化为数组
        }
        cache[item.title].push(item)
      })
      return cache
    }
  },
  methods: {
    init(file) {
      var reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        if (reader.result) {
          this.notes = this.cliping(reader.result)
        } else {
          this.$message({
            showClose: true,
            type: 'error',
            message: '读取文件为空，请重新尝试'
          })
        }
      }
      reader.onerror = () => {
        this.$message({
          showClose: true,
          type: 'error',
          message: '读取文件失败，当前浏览器或不支持文件读取功能，请尝试使用Chrome，QQ浏览器。'
        })
      }
    },
    clipboard() {
      var clipboard = new Clipboard('.clipboard-btn')
      clipboard.on('success', (e) => {
        this.$message({
          showClose: true,
          type: 'success',
          message: '复制成功'
        })
        e.clearSelection()
      })
      clipboard.on('error', (e) => {
        this.$message({
          showClose: true,
          type: 'error',
          message: '复制失败，请手动复制'
        })
      })
    },
    changeBook(currentBook) {
      this.currentBook = currentBook
    },
    cliping(txt) { // 文本解析处理
      var noteArray = txt.split(/==========/g).slice(1, -1) // 根据mycliping的格式先划分成一条条记录，最后一条为空
      // debugger
      return noteArray.map((item, index) => {
        // 将每一块细分为书名，作者，起始位置，标记时间，内容 5部分
        const cache = item.match(/^(.*) \((.*)\).*(?:\s+).*#(.*)-(?:.*)添加于(?:\s+)(.*)(?:\s+)(.*)/m) // ?: 为 消除对应缓存 \s+则为换行
        // 正则出的日期格式为 2016年2月10日星期三 上午8:59:58 需要进行加工
        var dateArr = cache[4].match(/^(\d{4})年(\d{1,2})月(\d{1,2})日(?:.*)上午(.*)$/)
        var markTime = dateArr.slice(1, 4).join('-') + ' ' + dateArr[4]
        return {
          title: cache[1],
          author: cache[2],
          start_postion: Math.floor(cache[3] / 100) * 100, // 默认一个标记单位为100相同则为同一条标记
          mark_time: markTime, // 标记本段内容的时间
          content: cache[5]
        }
      })
    },
    handleSearch() {

    }
  }
}

</script>

<style>
.left-nav {
  min-height: 500px;
}

.home-body {
  min-height: 500px;
}


.upload-file .el-upload {
  width: 100%;
}

.upload-file .el-upload .el-upload-dragger {
  width: 100%;
  padding: 80px 0 0 0;
  min-height: 400px;
}

.book-btn-group {
  width: 100%;
  margin: 10px 0 0 0;
  border-radius: 7px;
  border: 1px solid #EAEAEA;
}

.book-item-btn {
  display: block;
  color: #1F1E1E;
  background-color: #EAEAEA;
  width: 100%;
}

.focus-book {
  color: #D7000E
}

.el-button:focus,
.el-button:hover {
  color: #D7000E
}































/*.search {
  display: block;
  margin: 10px auto;
  width: 200px;
}*/

.clipboard-btn {
  background-color: #D7000E;
  float: right;
  margin: -6px 30px 0 0;
}
</style>
